import { useMemo, useState } from 'react';
import { WORLDS, pick } from '../content';
import { useGame } from '../state/game';
import { Bar, Btn, Card, TopBar } from '../components/UI';
import type { Go } from '../navigation';
import type { Tri } from '../content/types';
import { sfx, speak } from '../lib/audio';
import PCBuildLab from './PCBuildLab';
import CircuitLab from './CircuitLab';
import RepairCenter from './RepairCenter';

type LabId = 'pc' | 'circuit' | 'repair' | 'network' | 'robot' | 'future';

const LABS: { id: LabId; icon: string; name: Tri; desc: Tri; worldId: string; accent: string }[] = [
  {
    id: 'pc',
    icon: '🖥️',
    name: { en: 'PC Building Lab', gu: 'PC બિલ્ડિંગ લેબ', hi: 'PC बिल्डिंग लैब' },
    desc: { en: 'Assemble a virtual computer part by part.', gu: 'ભાગ પ્રમાણે વર્ચ્યુઅલ કમ્પ્યુટર બનાવો.', hi: 'हिस्से-दर-हिस्से वर्चुअल कंप्यूटर बनाएँ।' },
    worldId: 'pc-lab',
    accent: '#2f6bff',
  },
  {
    id: 'circuit',
    icon: '⚡',
    name: { en: 'Circuit Lab', gu: 'સર્કિટ લેબ', hi: 'सर्किट लैब' },
    desc: { en: 'Build a safe low-voltage LED circuit.', gu: 'સુરક્ષિત લો-વોલ્ટેજ LED સર્કિટ બનાવો.', hi: 'सुरक्षित लो-वोल्टेज LED सर्किट बनाएँ।' },
    worldId: 'circuit-lab',
    accent: '#fbbf24',
  },
  {
    id: 'repair',
    icon: '🧯',
    name: { en: 'Repair Center', gu: 'રિપેર સેન્ટર', hi: 'रिपेयर सेंटर' },
    desc: { en: 'Diagnose and fix virtual customer devices.', gu: 'વર્ચ્યુઅલ ગ્રાહકના ઉપકરણોનું નિદાન કરો.', hi: 'वर्चुअल ग्राहक उपकरणों का निदान करें।' },
    worldId: 'repair',
    accent: '#3ddc97',
  },
  {
    id: 'network',
    icon: '🌐',
    name: { en: 'Network Builder', gu: 'નેટવર્ક બિલ્ડર', hi: 'नेटवर्क बिल्डर' },
    desc: { en: 'Connect modem, router and switch in order.', gu: 'મોડેમ, રાઉટર અને સ્વિચ યોગ્ય ક્રમમાં જોડો.', hi: 'मॉडेम, राउटर और स्विच सही क्रम में जोड़ें।' },
    worldId: 'networking',
    accent: '#7c4dff',
  },
  {
    id: 'robot',
    icon: '🤖',
    name: { en: 'Robot Workshop', gu: 'રોબોટ વર્કશોપ', hi: 'रोबोट वर्कशॉप' },
    desc: { en: 'Build a robot and program its movement.', gu: 'રોબોટ બનાવો અને તેની ચાલ પ્રોગ્રામ કરો.', hi: 'रोबोट बनाएँ और उसकी चाल प्रोग्राम करें।' },
    worldId: 'robotics',
    accent: '#25e0f0',
  },
  {
    id: 'future',
    icon: '🚀',
    name: { en: 'Future Tech Lab', gu: 'ફ્યુચર ટેક લેબ', hi: 'फ्यूचर टेक लैब' },
    desc: { en: 'Train AI, wire IoT and test password safety.', gu: 'AI તાલીમ આપો, IoT જોડો અને પાસવર્ડ સુરક્ષા ટેસ્ટ કરો.', hi: 'AI प्रशिक्षित करें, IoT जोड़ें और पासवर्ड सुरक्षा जाँचें।' },
    worldId: 'future',
    accent: '#ff5db1',
  },
];

/* ------------------------------- NETWORK SIM ------------------------------- */
const NET_STEPS = [
  { id: 'modem', icon: '📡', name: { en: 'Modem', gu: 'મોડેમ', hi: 'मॉडेम' } },
  { id: 'router', icon: '🛰️', name: { en: 'Router', gu: 'રાઉટર', hi: 'राउटर' } },
  { id: 'switch', icon: '🔀', name: { en: 'Switch', gu: 'સ્વિચ', hi: 'स्विच' } },
  { id: 'pc', icon: '💻', name: { en: 'PC', gu: 'PC', hi: 'PC' } },
];

function NetworkBuilder() {
  const { t, tr, lang, award, pushToast } = useGame();
  const [chain, setChain] = useState<string[]>([]);
  const [result, setResult] = useState<'ok' | 'bad' | null>(null);

  const add = (id: string) => {
    if (chain.includes(id)) return;
    sfx.click();
    const next = [...chain, id];
    setChain(next);
    setResult(null);
  };

  const test = () => {
    const ok = chain.length === NET_STEPS.length && chain.every((id, i) => id === NET_STEPS[i].id);
    setResult(ok ? 'ok' : 'bad');
    if (ok) {
      sfx.levelup();
      award({ xp: 80, coins: 20, kind: 'network', label: 'Network Builder' });
      pushToast(`+80 XP • ${t('testPassed')}`, '🌐', 'good');
    } else {
      sfx.error();
    }
  };

  return (
    <Card glow="#7c4dff">
      <div className="section-title">
        <h2>{t('networkTitle')}</h2>
        <span className="sub">{chain.length}/4</span>
      </div>
      <p className="muted-sm">
        {tr({
          en: 'Tap the devices in signal order: internet line → modem → router → switch → PC.',
          gu: 'સિગ્નલ ક્રમમાં ઉપકરણો ટેપ કરો: ઇન્ટરનેટ લાઇન → મોડેમ → રાઉટર → સ્વિચ → PC.',
          hi: 'सिग्नल क्रम में डिवाइस टैप करें: इंटरनेट लाइन → मॉडेम → राउटर → स्विच → PC।',
        })}
      </p>
      <div className="device-row">
        {NET_STEPS.map((d) => (
          <button
            key={d.id}
            type="button"
            className={`device ${chain.includes(d.id) ? 'on' : ''}`}
            onClick={() => add(d.id)}
          >
            <span className="device-ico">{d.icon}</span>
            <span className="device-name">{pick(d.name, lang)}</span>
            <span className="tiny">{chain.includes(d.id) ? `#${chain.indexOf(d.id) + 1}` : '+'}</span>
          </button>
        ))}
      </div>
      <div className="cable-line">
        {chain.length === 0 ? <span className="tiny">{tr({ en: 'No cable connected yet', gu: 'હજી કોઈ કેબલ જોડાયું નથી', hi: 'अभी कोई केबल नहीं जुड़ा' })}</span> : null}
        {chain.map((id, i) => (
          <span key={`${id}-${i}`} className="net-node">
            {NET_STEPS.find((d) => d.id === id)?.icon}
            {i < chain.length - 1 ? <span className="wire">—</span> : null}
          </span>
        ))}
      </div>
      <div className="hero-actions">
        <Btn variant="primary" icon="▶" onClick={test} disabled={chain.length < 4}>
          {t('buildAndTest')}
        </Btn>
        <Btn
          variant="soft"
          icon="↺"
          onClick={() => {
            setChain([]);
            setResult(null);
            sfx.click();
          }}
        >
          {t('restart')}
        </Btn>
      </div>
      {result ? (
        <p className={`feedback ${result === 'ok' ? 'good' : 'bad'}`}>
          {result === 'ok'
            ? t('testPassed')
            : tr({
                en: 'Order is wrong. The modem receives the line, the router shares it, the switch extends the LAN, then the PC connects.',
                gu: 'ક્રમ ખોટો છે. મોડેમ લાઇન મેળવે, રાઉટર વહેંચે, સ્વિચ LAN વિસ્તારે, પછી PC જોડાય.',
                hi: 'क्रम गलत है। मॉडेम लाइन लेता है, राउटर बाँटता है, स्विच LAN बढ़ाता है, फिर PC जुड़ता है।',
              })}
        </p>
      ) : null}
      <p className="safety">{tr({ en: 'Virtual simulation only — never rewire a live network cabinet.', gu: 'ફક્ત વર્ચ્યુઅલ સિમ્યુલેશન — જીવંત નેટવર્ક કેબિનેટમાં ક્યારેય વાયરિંગ ન કરો.', hi: 'केवल वर्चुअल सिमुलेशन — जीवित नेटवर्क कैबिनेट में कभी वायरिंग न करें।' })}</p>
    </Card>
  );
}

/* -------------------------------- ROBOT SIM ------------------------------- */
const ROBOT_PARTS = {
  brain: [
    { id: 'mcu', label: { en: 'Microcontroller', gu: 'માઇક્રોકન્ટ્રોલર', hi: 'माइक्रोकंट्रोलर' }, ok: true },
    { id: 'cpu', label: { en: 'Desktop CPU', gu: 'ડેસ્કટોપ CPU', hi: 'डेस्कटॉप CPU' }, ok: false },
  ],
  motor: [
    { id: 'dc', label: { en: 'DC gear motor', gu: 'DC ગિયર મોટર', hi: 'DC गियर मोटर' }, ok: true },
    { id: 'fan', label: { en: 'Case fan', gu: 'કેસ ફેન', hi: 'केस फैन' }, ok: false },
  ],
  sensor: [
    { id: 'ultra', label: { en: 'Ultrasonic sensor', gu: 'અલ્ટ્રાસોનિક સેન્સર', hi: 'अल्ट्रासोनिक सेंसर' }, ok: true },
    { id: 'bulb', label: { en: 'LED bulb', gu: 'LED બલ્બ', hi: 'LED बल्ब' }, ok: false },
  ],
} as const;

type PartKey = keyof typeof ROBOT_PARTS;

function RobotBuilder() {
  const { t, tr, lang, award, pushToast } = useGame();
  const [sel, setSel] = useState<Record<PartKey, string | null>>({ brain: null, motor: null, sensor: null });
  const [program, setProgram] = useState<string[]>([]);
  const [pos, setPos] = useState(0);
  const [ran, setRan] = useState<'ok' | 'bad' | null>(null);

  const target = 4;
  const built = Object.values(sel).every(Boolean);
  const allOk =
    (ROBOT_PARTS.brain.find((x) => x.id === sel.brain)?.ok ?? false) &&
    (ROBOT_PARTS.motor.find((x) => x.id === sel.motor)?.ok ?? false) &&
    (ROBOT_PARTS.sensor.find((x) => x.id === sel.sensor)?.ok ?? false);

  const run = () => {
    if (!built) return;
    let p = 0;
    let blocked = false;
    for (const cmd of program) {
      if (!allOk) {
        blocked = true;
        break;
      }
      if (cmd === 'fwd') p = Math.min(target, p + 1);
      if (cmd === 'back') p = Math.max(0, p - 1);
      if (cmd === 'stop') break;
    }
    setPos(p);
    if (!allOk) {
      setRan('bad');
      sfx.error();
      return;
    }
    if (p === target) {
      setRan('ok');
      sfx.levelup();
      award({ xp: 90, coins: 22, kind: 'robot', label: 'Robot Workshop' });
      pushToast('+90 XP • Robot reached the goal', '🤖', 'good');
    } else {
      setRan('bad');
      sfx.error();
    }
  };

  return (
    <Card glow="#25e0f0">
      <div className="section-title">
        <h2>{t('robotTitle')}</h2>
        <span className="sub">{Object.values(sel).filter(Boolean).length}/3</span>
      </div>
      <p className="muted-sm">
        {tr({
          en: 'Choose a working part for each slot, then program the robot to reach the goal tile.',
          gu: 'દરેક સ્લોટ માટે યોગ્ય ભાગ પસંદ કરો, પછી રોબોટને લક્ષ્ય સુધી પહોંચવા પ્રોગ્રામ કરો.',
          hi: 'हर स्लॉट के लिए सही पुर्ज़ा चुनें, फिर रोबोट को लक्ष्य तक पहुँचाने का प्रोग्राम बनाएँ।',
        })}
      </p>
      {(Object.keys(ROBOT_PARTS) as PartKey[]).map((key) => (
        <div key={key} className="part-block">
          <span className="tiny">
            {key === 'brain'
              ? tr({ en: 'Controller', gu: 'કંટ્રોલર', hi: 'कंट्रोलर' })
              : key === 'motor'
                ? tr({ en: 'Actuator', gu: 'એક્ચ્યુએટર', hi: 'एक्चुएटर' })
                : tr({ en: 'Sensor', gu: 'સેન્સર', hi: 'सेंसर' })}
          </span>
          <div className="pill-row">
            {ROBOT_PARTS[key].map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`pill ${sel[key] === opt.id ? 'on' : ''}`}
                onClick={() => {
                  setSel((s) => ({ ...s, [key]: opt.id }));
                  setRan(null);
                  sfx.click();
                }}
              >
                {pick(opt.label, lang)}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="robot-grid">
        {Array.from({ length: target + 1 }).map((_, i) => (
          <div key={i} className={`tile ${i === target ? 'goal' : ''} ${pos === i ? 'bot' : ''}`}>
            {pos === i ? '🤖' : i === target ? '🏁' : i}
          </div>
        ))}
      </div>

      <div className="pill-row">
        {[
          ['fwd', '⬆️ Forward'],
          ['back', '⬇️ Back'],
          ['stop', '⏹ Stop'],
        ].map(([cmd, label]) => (
          <button
            key={cmd}
            type="button"
            className="pill"
            onClick={() => {
              setProgram((p) => [...p, cmd].slice(0, 8));
              sfx.click();
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="code-line">
        {program.length === 0 ? (
          <span className="tiny">{tr({ en: 'Program is empty', gu: 'પ્રોગ્રામ ખાલી છે', hi: 'प्रोग्राम खाली है' })}</span>
        ) : (
          program.map((c, i) => (
            <span key={i} className="code-token">
              {c}
            </span>
          ))
        )}
      </div>
      <div className="hero-actions">
        <Btn variant="primary" icon="▶" onClick={run} disabled={!built || program.length === 0}>
          {t('buildAndTest')}
        </Btn>
        <Btn
          variant="soft"
          icon="↺"
          onClick={() => {
            setProgram([]);
            setPos(0);
            setRan(null);
          }}
        >
          {t('restart')}
        </Btn>
      </div>
      {ran ? (
        <p className={`feedback ${ran === 'ok' ? 'good' : 'bad'}`}>
          {ran === 'ok'
            ? tr({ en: 'Robot reached the goal! A microcontroller reads sensors and drives motors.', gu: 'રોબોટ લક્ષ્યે પહોંચ્યો! માઇક્રોકન્ટ્રોલર સેન્સર વાંચે અને મોટર ચલાવે.', hi: 'रोबोट लक्ष्य तक पहुँचा! माइक्रोकंट्रोलर सेंसर पढ़ता और मोटर चलाता है।' })
            : !allOk
              ? tr({ en: 'Wrong part chosen — a robot needs a microcontroller, gear motor and sensor.', gu: 'ખોટો ભાગ પસંદ થયો — રોબોટને માઇક્રોકન્ટ્રોલર, ગિયર મોટર અને સેન્સર જોઈએ.', hi: 'गलत पुर्ज़ा चुना — रोबोट को माइक्रोकंट्रोलर, गियर मोटर और सेंसर चाहिए।' })
              : tr({ en: 'The robot did not reach the goal tile. Add forward steps.', gu: 'રોબોટ લક્ષ્ય સુધી પહોંચ્યો નહીં. આગળ વધવાના સ્ટેપ ઉમેરો.', hi: 'रोबोट लक्ष्य तक नहीं पहुँचा। आगे बढ़ने के स्टेप जोड़ें।' })}
        </p>
      ) : null}
    </Card>
  );
}

/* -------------------------------- FUTURE LAB ------------------------------ */
const FEATURES = [
  { id: 'temp', label: { en: 'Temperature high', gu: 'તાપમાન ઊંચું', hi: 'तापमान ऊँचा' }, weight: 2 },
  { id: 'smoke', label: { en: 'Smoke detected', gu: 'ધુમાડો મળ્યો', hi: 'धुआँ मिला' }, weight: 3 },
  { id: 'noise', label: { en: 'Loud noise', gu: 'મોટો અવાજ', hi: 'तेज़ आवाज़' }, weight: 0 },
];

function FutureLab() {
  const { t, tr, lang, award, pushToast } = useGame();
  const [on, setOn] = useState<string[]>(['temp']);
  const [trained, setTrained] = useState(false);
  const [pw, setPw] = useState('');

  const risk = useMemo(() => {
    const score = FEATURES.filter((f) => on.includes(f.id)).reduce((a, f) => a + f.weight, 0);
    return score;
  }, [on]);

  const strength = (() => {
    let s = 0;
    if (pw.length >= 8) s += 1;
    if (/[A-Z]/.test(pw)) s += 1;
    if (/[0-9]/.test(pw)) s += 1;
    if (/[^A-Za-z0-9]/.test(pw)) s += 1;
    return s;
  })();

  return (
    <Card glow="#ff5db1">
      <div className="section-title">
        <h2>{tr({ en: 'AI Fire Alarm Model', gu: 'AI ફાયર એલાર્મ મોડેલ', hi: 'AI फायर अलार्म मॉडल' })}</h2>
        <span className="sub">{trained ? `${tr({ en: 'Risk', gu: 'જોખમ', hi: 'जोखिम' })}: ${risk}` : tr({ en: 'Not trained', gu: 'તાલીમ બાકી', hi: 'प्रशिक्षण बाकी' })}</span>
      </div>
      <p className="muted-sm">
        {tr({
          en: 'Machine learning finds patterns in sensor data. Feed it example sensors, then test the prediction.',
          gu: 'મશીન લર્નિંગ સેન્સર ડેટામાં પેટર્ન શોધે છે. ઉદાહરણ સેન્સર આપો, પછી અનુમાન ટેસ્ટ કરો.',
          hi: 'मशीन लर्निंग सेंसर डेटा में पैटर्न खोजती है। उदाहरण सेंसर दें, फिर अनुमान जाँचें।',
        })}
      </p>
      <div className="pill-row">
        {FEATURES.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`pill ${on.includes(f.id) ? 'on' : ''}`}
            onClick={() => {
              setOn((v) => (v.includes(f.id) ? v.filter((x) => x !== f.id) : [...v, f.id]));
              setTrained(false);
              sfx.click();
            }}
          >
            {pick(f.label, lang)}
          </button>
        ))}
      </div>
      <div className="hero-actions">
        <Btn
          variant="primary"
          icon="🧠"
          onClick={() => {
            setTrained(true);
            sfx.correct();
            award({ xp: 40, coins: 10, kind: 'ai', label: 'AI model trained' });
            pushToast('+40 XP • AI model trained', '🧠', 'good');
          }}
        >
          {tr({ en: 'Train Model', gu: 'મોડેલ તાલીમ આપો', hi: 'मॉडल प्रशिक्षित करें' })}
        </Btn>
      </div>
      {trained ? (
        <div className={`alert-box ${risk >= 3 ? 'danger' : 'safe'}`}>
          {risk >= 3 ? '🚨' : risk >= 2 ? '⚠️' : '✅'}{' '}
          {risk >= 3
            ? tr({ en: 'High risk — the model predicts a fire and triggers the alarm.', gu: 'ઊંચું જોખમ — મોડેલ આગનું અનુમાન કરે છે અને એલાર્મ વગાડે છે.', hi: 'उच्च जोखिम — मॉडल आग का अनुमान लगाता है और अलार्म बजाता है।' })
            : risk >= 2
              ? tr({ en: 'Medium risk — the model asks for a confirmation reading.', gu: 'મધ્યમ જોખમ — મોડેલ પુષ્ટિ માટે બીજું રીડિંગ માંગે છે.', hi: 'मध्यम जोखिम — मॉडल पुष्टि के लिए दूसरा रीडिंग माँगता है।' })
              : tr({ en: 'Low risk — normal conditions, no alarm.', gu: 'ઓછું જોખમ — સામાન્ય સ્થિતિ, એલાર્મ નહીં.', hi: 'कम जोखिम — सामान्य स्थिति, अलार्म नहीं।' })}
        </div>
      ) : null}

      <div className="section-title" style={{ marginTop: 18 }}>
        <h2>{tr({ en: 'Password Safety Check', gu: 'પાસવર્ડ સુરક્ષા ચેક', hi: 'पासवर्ड सुरक्षा जाँच' })}</h2>
        <span className="sub">{strength}/4</span>
      </div>
      <label className="field">
        <input
          value={pw}
          placeholder="TechQuest@2026"
          onChange={(e) => setPw(e.target.value)}
        />
      </label>
      <Bar
        value={strength / 4}
        color={strength >= 3 ? 'var(--green)' : strength >= 2 ? 'var(--gold)' : 'var(--red)'}
        label={
          strength >= 3
            ? tr({ en: 'Strong', gu: 'મજબૂત', hi: 'मज़बूत' })
            : strength >= 2
              ? tr({ en: 'Medium', gu: 'મધ્યમ', hi: 'मध्यम' })
              : tr({ en: 'Weak', gu: 'નબળો', hi: 'कमज़ोर' })
        }
      />
      <p className="safety">
        {tr({
          en: 'Cybersecurity awareness: use long unique passwords and never share them. This check runs only in your browser.',
          gu: 'સાયબર સુરક્ષા: લાંબા અને અલગ પાસવર્ડ વાપરો, ક્યારેય શેર ન કરો. આ ચેક ફક્ત તમારા બ્રાઉઝરમાં ચાલે છે.',
          hi: 'साइबर सुरक्षा: लंबे और अलग पासवर्ड रखें, कभी साझा न करें। यह जाँच केवल आपके ब्राउज़र में चलती है।',
        })}
      </p>
    </Card>
  );
}

/* --------------------------------- HUB ------------------------------------ */
export default function VirtualLab({ lab, go }: { lab?: string; go: Go }) {
  const { t, tr, lang, unlockedWorlds } = useGame();
  const initial = (LABS.find((l) => l.id === lab)?.id ?? null) as LabId | null;
  const [active, setActive] = useState<LabId | null>(initial);

  if (active === 'pc') return <PCBuildLab onBack={() => setActive(null)} />;
  if (active === 'circuit') return <CircuitLab onBack={() => setActive(null)} />;
  if (active === 'repair') return <RepairCenter onBack={() => setActive(null)} />;

  if (active) {
    const meta = LABS.find((l) => l.id === active)!;
    return (
      <>
        <TopBar title={pick(meta.name, lang)} onBack={() => setActive(null)} />
        <div className="screen">
          {active === 'network' ? <NetworkBuilder /> : null}
          {active === 'robot' ? <RobotBuilder /> : null}
          {active === 'future' ? <FutureLab /> : null}
          <Card>
            <div className="section-title">
              <h2>{tr({ en: 'Related World', gu: 'સંબંધિત વર્લ્ડ', hi: 'संबंधित वर्ल्ड' })}</h2>
            </div>
            <div className="hero-actions">
              <Btn
                variant="soft"
                icon="📘"
                onClick={() => go('world', meta.worldId)}
                disabled={!unlockedWorlds.includes(meta.worldId)}
              >
                {unlockedWorlds.includes(meta.worldId)
                  ? pick(WORLDS.find((w) => w.id === meta.worldId)?.title ?? WORLDS[0].title, lang)
                  : t('locked')}
              </Btn>
              <Btn variant="soft" icon="🎓" onClick={() => go('learning')}>
                {t('learningCenter')}
              </Btn>
            </div>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title={t('virtualLab')} subtitle={t('buildAndTest')} onBack={() => go('home')} />
      <div className="screen">
        <Card glow="#2f6bff">
          <div className="section-title">
            <h2>{tr({ en: 'Choose a Laboratory', gu: 'લેબોરેટરી પસંદ કરો', hi: 'प्रयोगशाला चुनें' })}</h2>
            <span className="sub">{LABS.length} {tr({ en: 'labs', gu: 'લેબ', hi: 'लैब' })}</span>
          </div>
          <p className="muted-sm">
            {tr({
              en: 'Every lab is a safe virtual simulation. Explore, connect, test and learn by doing.',
              gu: 'દરેક લેબ સુરક્ષિત વર્ચ્યુઅલ સિમ્યુલેશન છે. શોધો, જોડો, ટેસ્ટ કરો અને કરીને શીખો.',
              hi: 'हर लैब सुरक्षित वर्चुअल सिमुलेशन है। खोजें, जोड़ें, टेस्ट करें और करके सीखें।',
            })}
          </p>
        </Card>
        <div className="grid lab-grid">
          {LABS.map((l) => {
            const locked = !unlockedWorlds.includes(l.worldId);
            return (
              <button
                key={l.id}
                type="button"
                className={`lab-card ${locked ? 'locked' : ''}`}
                style={{ ['--accent' as string]: l.accent }}
                onClick={() => {
                  if (locked) {
                    sfx.error();
                    return;
                  }
                  sfx.whoosh();
                  setActive(l.id);
                }}
              >
                <span className="lab-ico">{l.icon}</span>
                <span className="lab-name">{pick(l.name, lang)}</span>
                <span className="lab-desc">{pick(l.desc, lang)}</span>
                <span className="chip">{locked ? `🔒 ${t('locked')}` : `▶ ${t('buildAndTest')}`}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
