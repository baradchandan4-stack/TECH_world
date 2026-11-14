import { useMemo, useState } from 'react';
import { useGame } from '../state/game';
import { Btn, Card, TopBar } from '../components/UI';
import { sfx } from '../lib/audio';

const LEDS = [
  { id: 'red', emoji: '🔴', vf: 2.0, name: 'Red LED' },
  { id: 'green', emoji: '🟢', vf: 2.2, name: 'Green LED' },
  { id: 'blue', emoji: '🔵', vf: 3.2, name: 'Blue LED' },
];

const RESISTORS = [100, 220, 330, 470, 1000];

export default function CircuitLab({ onBack }: { onBack: () => void }) {
  const { t, tr, p, finishCircuit, pushToast } = useGame();
  const [voltage, setVoltage] = useState(5);
  const [resistor, setResistor] = useState(220);
  const [led, setLed] = useState(LEDS[0]);
  const [sw, setSw] = useState(true);
  const [mode, setMode] = useState<'series' | 'parallel'>('series');
  const [led2, setLed2] = useState(false);
  const [tested, setTested] = useState(0);

  const calc = useMemo(() => {
    // Total resistance: series adds a second resistor, parallel halves it.
    const totalR = mode === 'series' ? resistor * (led2 ? 2 : 1) : led2 ? resistor / 2 : resistor;
    const vf = led2 ? led.vf * (mode === 'series' ? 2 : 1) : led.vf;
    const available = voltage - vf;
    const current = sw && available > 0 ? available / totalR : 0;
    const mA = current * 1000;
    const power = current * current * totalR;
    const ledPower = current * vf;
    let state: 'off' | 'dim' | 'good' | 'bright' | 'burnt' = 'off';
    if (!sw) state = 'off';
    else if (available <= 0) state = 'off';
    else if (mA > 30) state = 'burnt';
    else if (mA > 20) state = 'bright';
    else if (mA >= 5) state = 'good';
    else if (mA > 0.5) state = 'dim';
    return { totalR, vf, current, mA, power, ledPower, state, available };
  }, [voltage, resistor, led, sw, mode, led2]);

  const ledLabel =
    calc.state === 'burnt'
      ? tr({ en: 'LED burnt out — current too high', gu: 'LED બળી ગયો — પ્રવાહ વધુ છે', hi: 'LED जल गया — करंट बहुत अधिक' })
      : calc.state === 'bright'
        ? tr({ en: 'Very bright (near the safe limit)', gu: 'ખૂબ તેજસ્વી (મર્યાદાની નજીક)', hi: 'बहुत तेज़ (सीमा के पास)' })
        : calc.state === 'good'
          ? tr({ en: 'Bright and safe', gu: 'તેજસ્વી અને સુરક્ષિત', hi: 'तेज़ और सुरक्षित' })
          : calc.state === 'dim'
            ? tr({ en: 'Dim glow — resistance too high', gu: 'ઝાંખું — રેઝિસ્ટન્સ વધુ છે', hi: 'धुँधला — प्रतिरोध अधिक है' })
            : tr({ en: 'LED off — check switch and voltage', gu: 'LED બંધ — સ્વિચ અને વોલ્ટેજ તપાસો', hi: 'LED बंद — स्विच और वोल्टेज जाँचें' });

  const run = () => {
    sfx.whoosh();
    setTested((n) => n + 1);
    if (calc.state === 'good' || calc.state === 'bright') {
      sfx.levelUp();
      if (p.circuitsDone === 0) pushToast(tr({ en: 'First working circuit!', gu: 'પ્રથમ કાર્યરત સર્કિટ!', hi: 'पहला काम करता सर्किट!' }), '💡', 'good');
      finishCircuit();
    } else if (calc.state === 'burnt') {
      sfx.error();
    }
  };

  const wireLive = sw && calc.current > 0.0005 && calc.state !== 'burnt';

  return (
    <>
      <TopBar title={t('circuitLabTitle')} subtitle={t('safeLabNote')} onBack={onBack} />
      <div className="screen">
        <div className="lab-layout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Card glow="#25e0f0">
              <div className="circuit-stage">
                <div className="battery-row">
                  <div className="node" title="Battery">
                    🔋
                    <span className="node-label">{voltage} V</span>
                  </div>
                  <div className={`wire ${wireLive ? 'live' : ''}`} />
                  <button type="button" className={`node ${sw ? 'live' : ''}`} onClick={() => { setSw((s) => !s); sfx.click(); }} title="Switch">
                    {sw ? '🔛' : '🔘'}
                    <span className="node-label">{sw ? 'ON' : 'OFF'}</span>
                  </button>
                  <div className={`wire ${wireLive ? 'live' : ''}`} />
                  <div className="node" title="Resistor">
                    🧱
                    <span className="node-label">{Math.round(calc.totalR)} Ω</span>
                  </div>
                </div>
                <div className="node-row">
                  <div className={`node ${calc.state === 'burnt' ? 'broken' : wireLive ? 'live' : ''}`} title="LED">
                    {led.emoji}
                    <span className="node-label">{led.name}</span>
                  </div>
                  {led2 ? (
                    <div className={`node ${wireLive ? 'live' : ''}`} title="LED 2">
                      {led.emoji}
                      <span className="node-label">LED 2</span>
                    </div>
                  ) : null}
                </div>
                <div className="node-row">
                  <div className={`wire ${wireLive ? 'live' : ''}`} />
                  <span className="tiny">{mode === 'series' ? 'Series' : 'Parallel'} • {sw ? 'closed' : 'open'}</span>
                  <div className={`wire ${wireLive ? 'live' : ''}`} />
                </div>
              </div>

              <div className="readout" style={{ marginTop: 12 }}>
                <div className="readout-cell">
                  <small>Voltage</small>
                  <strong>{voltage.toFixed(1)} V</strong>
                </div>
                <div className="readout-cell">
                  <small>Current</small>
                  <strong>{(calc.mA || 0).toFixed(1)} mA</strong>
                </div>
                <div className="readout-cell">
                  <small>Resistance</small>
                  <strong>{Math.round(calc.totalR)} Ω</strong>
                </div>
                <div className="readout-cell">
                  <small>Resistor power</small>
                  <strong>{(calc.power * 1000).toFixed(0)} mW</strong>
                </div>
              </div>

              <div className={calc.state === 'burnt' ? 'warn-box' : 'safety'} style={{ marginTop: 10 }}>
                💡 {ledLabel}
              </div>
            </Card>

            <Card>
              <div className="block-title">{t('ohmLaw')}</div>
              <p className="lesson-text" style={{ fontSize: 13, marginTop: 6 }}>
                I = (V − V<sub>LED</sub>) ÷ R → ({voltage} − {calc.vf.toFixed(1)}) ÷ {Math.round(calc.totalR)} ={' '}
                {(calc.current || 0).toFixed(3)} A
              </p>
              <p className="tiny" style={{ marginTop: 6 }}>
                {tr({
                  en: 'A real LED needs a series resistor. Without it, current rises quickly and the LED is destroyed.',
                  gu: 'વાસ્તવિક LED ને શ્રેણીમાં રેઝિસ્ટર જરૂરી છે. તેના વગર પ્રવાહ ઝડપથી વધે છે અને LED બળી જાય છે.',
                  hi: 'असली LED को श्रेणी में रेज़िस्टर ज़रूरी है। इसके बिना करंट तेज़ी से बढ़ता है और LED जल जाता है।',
                })}
              </p>
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Card>
              <div className="block-title">{t('battery')}</div>
              <div className="range-row" style={{ marginTop: 8 }}>
                <span>3 V</span>
                <input
                  type="range"
                  min={3}
                  max={12}
                  step={0.5}
                  value={voltage}
                  onChange={(e) => setVoltage(Number(e.target.value))}
                  aria-label="Voltage"
                />
                <span>12 V</span>
              </div>
              <div className="block-title" style={{ marginTop: 14 }}>{t('resistor')}</div>
              <div className="pill-row" style={{ marginTop: 6 }}>
                {RESISTORS.map((r) => (
                  <button key={r} type="button" className={`pill ${resistor === r ? 'on' : ''}`} onClick={() => { setResistor(r); sfx.click(); }}>
                    {r} Ω
                  </button>
                ))}
              </div>
              <div className="block-title" style={{ marginTop: 14 }}>LED</div>
              <div className="pill-row" style={{ marginTop: 6 }}>
                {LEDS.map((l) => (
                  <button key={l.id} type="button" className={`pill ${led.id === l.id ? 'on' : ''}`} onClick={() => { setLed(l); sfx.click(); }}>
                    {l.emoji} {l.vf} V
                  </button>
                ))}
              </div>
              <div className="block-title" style={{ marginTop: 14 }}>{tr({ en: 'Circuit type', gu: 'સર્કિટ પ્રકાર', hi: 'सर्किट प्रकार' })}</div>
              <div className="pill-row" style={{ marginTop: 6 }}>
                <button type="button" className={`pill ${mode === 'series' ? 'on' : ''}`} onClick={() => setMode('series')}>
                  {tr({ en: 'Series', gu: 'શ્રેણી', hi: 'श्रेणी' })}
                </button>
                <button type="button" className={`pill ${mode === 'parallel' ? 'on' : ''}`} onClick={() => setMode('parallel')}>
                  {tr({ en: 'Parallel', gu: 'સમાંતર', hi: 'समानांतर' })}
                </button>
                <button type="button" className={`pill ${led2 ? 'on' : ''}`} onClick={() => setLed2((v) => !v)}>
                  {tr({ en: '+ 2nd LED', gu: '+ બીજો LED', hi: '+ दूसरा LED' })}
                </button>
              </div>
              <div className="row" style={{ marginTop: 14 }}>
                <Btn variant="gold" onClick={run} icon="⚡" full>
                  {t('runSimulation')}
                </Btn>
              </div>
              <p className="tiny" style={{ marginTop: 8 }}>
                {tested > 0
                  ? tr({ en: `Simulations run: ${tested}`, gu: `સિમ્યુલેશન ચલાવ્યાં: ${tested}`, hi: `सिमुलेशन चलाए: ${tested}` })
                  : tr({ en: 'Goal: light the LED brightly without burning it.', gu: 'લક્ષ્ય: LED ને તેજસ્વી પ્રકાશિત કરો, બાળ્યા વગર.', hi: 'लक्ष्य: LED को तेज़ चमकाएँ, जलाएँ बिना।' })}
              </p>
            </Card>

            <Card>
              <div className="block-title">{t('safeLabNote')}</div>
              <div className="safety" style={{ marginTop: 6 }}>
                🔋 {tr({
                  en: 'This lab uses a virtual low-voltage battery (3–12 V). Never experiment with mains electricity.',
                  gu: 'આ લેબ વર્ચ્યુઅલ લો-વોલ્ટેજ બેટરી (3–12 V) વાપરે છે. મેઇન્સ વીજળી સાથે ક્યારેય પ્રયોગ ન કરો.',
                  hi: 'यह लैब वर्चुअल लो-वोल्टेज बैटरी (3–12 V) उपयोग करती है। मेन्स बिजली से कभी प्रयोग न करें।',
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
