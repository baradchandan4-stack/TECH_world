import { useMemo, useState } from 'react';
import { useGame } from '../state/game';
import { Btn, Card, TopBar } from '../components/UI';
import { sfx } from '../lib/audio';
import type { Tri } from '../content/types';

type SlotId = 'motherboard' | 'cpu' | 'ram' | 'storage' | 'gpu' | 'psu' | 'cooler';

interface Part {
  id: string;
  slot: SlotId;
  emoji: string;
  name: Tri;
  socket?: 'LGA1700' | 'AM5' | 'LGA1200';
  mem?: 'DDR4' | 'DDR5';
  watts?: number;
  draw?: number;
  coolerFor?: ('LGA1700' | 'AM5')[];
  note: Tri;
}

const S: Record<SlotId, Tri> = {
  motherboard: { en: 'Motherboard', gu: 'મધરબોર્ડ', hi: 'मदरबोर्ड' },
  cpu: { en: 'CPU', gu: 'CPU', hi: 'CPU' },
  ram: { en: 'RAM', gu: 'RAM', hi: 'RAM' },
  storage: { en: 'Storage', gu: 'સ્ટોરેજ', hi: 'स्टोरेज' },
  gpu: { en: 'Graphics Card', gu: 'ગ્રાફિક્સ કાર્ડ', hi: 'ग्राफ़िक्स कार्ड' },
  psu: { en: 'Power Supply (SMPS)', gu: 'પાવર સપ્લાય (SMPS)', hi: 'पावर सप्लाई (SMPS)' },
  cooler: { en: 'CPU Cooler', gu: 'CPU કૂલર', hi: 'CPU कूलर' },
};

const ORDER: SlotId[] = ['motherboard', 'cpu', 'ram', 'storage', 'gpu', 'psu', 'cooler'];

const PARTS: Part[] = [
  {
    id: 'b760',
    slot: 'motherboard',
    emoji: '🟩',
    name: { en: 'B760 Board (LGA1700, DDR4)', gu: 'B760 બોર્ડ (LGA1700, DDR4)', hi: 'B760 बोर्ड (LGA1700, DDR4)' },
    socket: 'LGA1700',
    mem: 'DDR4',
    note: { en: 'Intel socket LGA1700 with DDR4 memory slots.', gu: 'Intel સોકેટ LGA1700, DDR4 મેમરી સ્લોટ સાથે.', hi: 'Intel सॉकेट LGA1700, DDR4 मेमोरी स्लॉट के साथ।' },
  },
  {
    id: 'am5',
    slot: 'motherboard',
    emoji: '🟪',
    name: { en: 'AM5 Board (AM5, DDR5)', gu: 'AM5 બોર્ડ (AM5, DDR5)', hi: 'AM5 बोर्ड (AM5, DDR5)' },
    socket: 'AM5',
    mem: 'DDR5',
    note: { en: 'AMD socket AM5 with faster DDR5 memory slots.', gu: 'AMD સોકેટ AM5, ઝડપી DDR5 મેમરી સ્લોટ સાથે.', hi: 'AMD सॉकेट AM5, तेज़ DDR5 मेमोरी स्लॉट के साथ।' },
  },
  {
    id: 'i5',
    slot: 'cpu',
    emoji: '🔲',
    name: { en: 'Core i5 (LGA1700, 125 W)', gu: 'Core i5 (LGA1700, 125 W)', hi: 'Core i5 (LGA1700, 125 W)' },
    socket: 'LGA1700',
    draw: 125,
    note: { en: 'Six-core Intel CPU for socket LGA1700.', gu: 'LGA1700 સોકેટ માટે છ-કોર Intel CPU.', hi: 'LGA1700 सॉकेट के लिए छह-कोर Intel CPU।' },
  },
  {
    id: 'r5',
    slot: 'cpu',
    emoji: '🔳',
    name: { en: 'Ryzen 5 (AM5, 105 W)', gu: 'Ryzen 5 (AM5, 105 W)', hi: 'Ryzen 5 (AM5, 105 W)' },
    socket: 'AM5',
    draw: 105,
    note: { en: 'Six-core AMD CPU for socket AM5.', gu: 'AM5 સોકેટ માટે છ-કોર AMD CPU.', hi: 'AM5 सॉकेट के लिए छह-कोर AMD CPU।' },
  },
  {
    id: 'old-cpu',
    slot: 'cpu',
    emoji: '📛',
    name: { en: 'Old 10th-gen CPU (LGA1200)', gu: 'જૂનું 10મી પેઢી CPU (LGA1200)', hi: 'पुराना 10वीं पीढ़ी CPU (LGA1200)' },
    socket: 'LGA1200',
    draw: 95,
    note: { en: 'LGA1200 chip — a different socket shape.', gu: 'LGA1200 ચિપ — સોકેટનો આકાર અલગ છે.', hi: 'LGA1200 चिप — सॉकेट का आकार अलग है।' },
  },
  {
    id: 'ddr4',
    slot: 'ram',
    emoji: '📏',
    name: { en: 'DDR4 8 GB RAM', gu: 'DDR4 8 GB RAM', hi: 'DDR4 8 GB RAM' },
    mem: 'DDR4',
    note: { en: 'Fits only DDR4 slots (notch position differs).', gu: 'ફક્ત DDR4 સ્લોટમાં બેસે (નોચની જગ્યા અલગ).', hi: 'केवल DDR4 स्लॉट में बैठता है (नॉच अलग जगह है)।' },
  },
  {
    id: 'ddr5',
    slot: 'ram',
    emoji: '📐',
    name: { en: 'DDR5 16 GB RAM', gu: 'DDR5 16 GB RAM', hi: 'DDR5 16 GB RAM' },
    mem: 'DDR5',
    note: { en: 'Fits only DDR5 slots and runs at higher speed.', gu: 'ફક્ત DDR5 સ્લોટમાં બેસે અને વધુ ઝડપે ચાલે.', hi: 'केवल DDR5 स्लॉट में बैठता है और अधिक गति से चलता है।' },
  },
  {
    id: 'nvme',
    slot: 'storage',
    emoji: '💾',
    name: { en: 'NVMe SSD 512 GB', gu: 'NVMe SSD 512 GB', hi: 'NVMe SSD 512 GB' },
    note: { en: 'Fits the M.2 slot; very fast boot times.', gu: 'M.2 સ્લોટમાં બેસે; બૂટ ખૂબ ઝડપી.', hi: 'M.2 स्लॉट में बैठता है; बूट बहुत तेज़।' },
  },
  {
    id: 'hdd',
    slot: 'storage',
    emoji: '🗄️',
    name: { en: 'HDD 1 TB (SATA)', gu: 'HDD 1 TB (SATA)', hi: 'HDD 1 TB (SATA)' },
    note: { en: 'Connects with a SATA cable; cheap bulk storage.', gu: 'SATA કેબલથી જોડાય; સસ્તું મોટું સ્ટોરેજ.', hi: 'SATA केबल से जुड़ता है; सस्ता बड़ा स्टोरेज।' },
  },
  {
    id: 'gpu-mid',
    slot: 'gpu',
    emoji: '🎮',
    name: { en: 'Mid GPU (needs 450 W)', gu: 'મિડ GPU (450 W જરૂરી)', hi: 'मिड GPU (450 W चाहिए)' },
    watts: 450,
    draw: 160,
    note: { en: 'Needs a 450 W power supply and one 8-pin cable.', gu: '450 W પાવર સપ્લાય અને એક 8-pin કેબલ જરૂરી.', hi: '450 W पावर सप्लाई और एक 8-pin केबल चाहिए।' },
  },
  {
    id: 'gpu-big',
    slot: 'gpu',
    emoji: '🚀',
    name: { en: 'Flagship GPU (needs 850 W)', gu: 'ફ્લેગશિપ GPU (850 W જરૂરી)', hi: 'फ्लैगशिप GPU (850 W चाहिए)' },
    watts: 850,
    draw: 400,
    note: { en: 'Very powerful — needs an 850 W supply.', gu: 'ખૂબ શક્તિશાળી — 850 W સપ્લાય જરૂરી.', hi: 'बहुत शक्तिशाली — 850 W सप्लाई चाहिए।' },
  },
  {
    id: 'psu-450',
    slot: 'psu',
    emoji: '🔌',
    name: { en: '450 W Power Supply', gu: '450 W પાવર સપ્લાય', hi: '450 W पावर सप्लाई' },
    watts: 450,
    note: { en: 'Enough for a basic build with a mid GPU.', gu: 'મિડ GPU સાથે સાદા બિલ્ડ માટે પૂરતું.', hi: 'मिड GPU के साथ साधारण बिल्ड के लिए पर्याप्त।' },
  },
  {
    id: 'psu-750',
    slot: 'psu',
    emoji: '⚡',
    name: { en: '750 W Power Supply', gu: '750 W પાવર સપ્લાય', hi: '750 W पावर सप्लाई' },
    watts: 750,
    note: { en: 'Handles strong CPUs and bigger graphics cards.', gu: 'શક્તિશાળી CPU અને મોટા ગ્રાફિક્સ કાર્ડ સંભાળે.', hi: 'शक्तिशाली CPU और बड़े ग्राफ़िक्स कार्ड संभालता है।' },
  },
  {
    id: 'cooler-air',
    slot: 'cooler',
    emoji: '🌀',
    name: { en: 'Universal Air Cooler', gu: 'યુનિવર્સલ એર કૂલર', hi: 'यूनिवर्सल एयर कूलर' },
    coolerFor: ['LGA1700', 'AM5'],
    note: { en: 'Fits both LGA1700 and AM5 brackets.', gu: 'LGA1700 અને AM5 બંને બ્રેકેટમાં બેસે.', hi: 'LGA1700 और AM5 दोनों ब्रैकेट में बैठता है।' },
  },
  {
    id: 'cooler-intel',
    slot: 'cooler',
    emoji: '❄️',
    name: { en: 'Intel-only Cooler', gu: 'ફક્ત Intel કૂલર', hi: 'केवल Intel कूलर' },
    coolerFor: ['LGA1700'],
    note: { en: 'Only has an LGA1700 mounting bracket.', gu: 'ફક્ત LGA1700 માઉન્ટિંગ બ્રેકેટ છે.', hi: 'केवल LGA1700 माउंटिंग ब्रैकेट है।' },
  },
];

export default function PCBuildLab({ onBack }: { onBack: () => void }) {
  const { t, tr, lang, p, finishBuild, pushToast } = useGame();
  const [slots, setSlots] = useState<Partial<Record<SlotId, string>>>({});
  const [sel, setSel] = useState<string | null>(null);
  const [log, setLog] = useState<{ text: string; tone: 'ok' | 'err' | 'info' }[]>([]);
  const [boot, setBoot] = useState<'idle' | 'ok' | 'fail'>('idle');

  const partById = useMemo(() => Object.fromEntries(PARTS.map((x) => [x.id, x])), []);
  const chosen = (slot: SlotId) => (slots[slot] ? partById[slots[slot]!] : undefined);

  const addLog = (text: string, tone: 'ok' | 'err' | 'info' = 'info') =>
    setLog((prev) => [{ text, tone }, ...prev].slice(0, 40));

  const issues = useMemo(() => {
    const out: string[] = [];
    const board = chosen('motherboard');
    const cpu = chosen('cpu');
    const ram = chosen('ram');
    const gpu = chosen('gpu');
    const psu = chosen('psu');
    const cooler = chosen('cooler');

    if (board && cpu && cpu.socket !== board.socket)
      out.push(
        tr({
          en: `${pickName(cpu)} cannot fit the ${pickName(board)}: socket ${cpu.socket} ≠ ${board.socket}. A CPU must match the motherboard socket.`,
          gu: `${pickName(cpu)} ${pickName(board)} માં બેસશે નહીં: સોકેટ ${cpu.socket} ≠ ${board.socket}. CPU એ મધરબોર્ડના સોકેટ સાથે મેળ ખાવો જોઈએ.`,
          hi: `${pickName(cpu)} ${pickName(board)} में नहीं बैठेगा: सॉकेट ${cpu.socket} ≠ ${board.socket}. CPU को मदरबोर्ड सॉकेट से मेल खाना चाहिए।`,
        }),
      );
    if (board && ram && ram.mem !== board.mem)
      out.push(
        tr({
          en: `${ram.mem} RAM does not fit a ${board.mem} board. DDR4 and DDR5 notches are in different places.`,
          gu: `${ram.mem} RAM ${board.mem} બોર્ડમાં બેસશે નહીં. DDR4 અને DDR5 ના નોચ અલગ જગ્યાએ હોય છે.`,
          hi: `${ram.mem} RAM ${board.mem} बोर्ड में नहीं बैठेगा। DDR4 और DDR5 के नॉच अलग जगह होते हैं।`,
        }),
      );
    if (board && cooler && cooler.coolerFor && board.socket && !cooler.coolerFor.includes(board.socket as 'LGA1700' | 'AM5'))
      out.push(
        tr({
          en: `${pickName(cooler)} has no bracket for socket ${board.socket}. Choose a compatible cooler.`,
          gu: `${pickName(cooler)} માં સોકેટ ${board.socket} માટે બ્રેકેટ નથી. અનુકૂળ કૂલર પસંદ કરો.`,
          hi: `${pickName(cooler)} में सॉकेट ${board.socket} के लिए ब्रैकेट नहीं है। अनुकूल कूलर चुनें।`,
        }),
      );
    if (gpu && psu && gpu.watts && psu.watts && gpu.watts > psu.watts)
      out.push(
        tr({
          en: `${pickName(gpu)} needs ${gpu.watts} W but the supply gives ${psu.watts} W. The PC would shut down under load.`,
          gu: `${pickName(gpu)} ને ${gpu.watts} W જોઈએ પણ સપ્લાય ${psu.watts} W આપે છે. લોડમાં PC બંધ થઈ જશે.`,
          hi: `${pickName(gpu)} को ${gpu.watts} W चाहिए पर सप्लाई ${psu.watts} W देती है। लोड में PC बंद हो जाएगा।`,
        }),
      );
    if (board && cpu && psu) {
      const load = (cpu.draw ?? 0) + (gpu?.draw ?? 0) + 90;
      if (psu.watts && load > psu.watts)
        out.push(
          tr({
            en: `Total load ≈ ${load} W is above the ${psu.watts} W supply. Upgrade the power supply.`,
            gu: `કુલ લોડ ≈ ${load} W એ ${psu.watts} W સપ્લાયથી વધુ છે. પાવર સપ્લાય અપગ્રેડ કરો.`,
            hi: `कुल लोड ≈ ${load} W ${psu.watts} W सप्लाई से अधिक है। पावर सप्लाई अपग्रेड करें।`,
          }),
        );
    }
    return out;
  }, [slots, tr]); // eslint-disable-line react-hooks/exhaustive-deps

  function pickName(part?: Part): string {
    return part ? part.name[lang] : '';
  }

  const place = (slot: SlotId) => {
    if (!sel) {
      if (slots[slot]) {
        const removed = slots[slot]!;
        setSlots((prev) => ({ ...prev, [slot]: undefined }));
        addLog(tr({ en: `Removed ${pickName(partById[removed])}.`, gu: `${pickName(partById[removed])} કાઢ્યું.`, hi: `${pickName(partById[removed])} हटाया।` }));
        sfx.click();
      }
      return;
    }
    const part = partById[sel];
    if (part.slot !== slot) {
      sfx.error();
      addLog(
        tr({
          en: `${pickName(part)} belongs in the ${S[part.slot].en} slot, not ${S[slot].en}.`,
          gu: `${pickName(part)} ${S[part.slot].gu} સ્લોટમાં જાય, ${S[slot].gu} માં નહીં.`,
          hi: `${pickName(part)} ${S[part.slot].hi} स्लॉट में जाता है, ${S[slot].hi} में नहीं।`,
        }),
        'err',
      );
      return;
    }
    setSlots((prev) => ({ ...prev, [slot]: part.id }));
    addLog(tr({ en: `Installed ${pickName(part)}.`, gu: `${pickName(part)} ઇન્સ્ટોલ થયું.`, hi: `${pickName(part)} इंस्टॉल हुआ।` }), 'ok');
    sfx.pop();
    setSel(null);
    setBoot('idle');
  };

  const test = () => {
    const missing = ORDER.filter((s) => !slots[s]);
    if (missing.length) {
      sfx.error();
      setBoot('fail');
      addLog(
        tr({
          en: `Cannot boot: missing ${missing.map((m) => S[m].en).join(', ')}.`,
          gu: `બૂટ થશે નહીં: ${missing.map((m) => S[m].gu).join(', ')} બાકી છે.`,
          hi: `बूट नहीं होगा: ${missing.map((m) => S[m].hi).join(', ')} बाकी है।`,
        }),
        'err',
      );
      return;
    }
    if (issues.length) {
      sfx.error();
      setBoot('fail');
      addLog(issues[0], 'err');
      return;
    }
    sfx.win();
    setBoot('ok');
    addLog(
      tr({
        en: 'POST passed, BIOS loaded, operating system started. The computer works!',
        gu: 'POST પાસ, BIOS લોડ, ઓપરેટિંગ સિસ્ટમ શરૂ. કમ્પ્યુટર કામ કરે છે!',
        hi: 'POST पास, BIOS लोड, ऑपरेटिंग सिस्टम शुरू। कंप्यूटर काम कर रहा है!',
      }),
      'ok',
    );
    if (p.buildsDone === 0) pushToast(tr({ en: 'First PC built!', gu: 'પ્રથમ PC બન્યું!', hi: 'पहला PC बना!' }), '🏆', 'good');
    finishBuild();
  };

  const reset = () => {
    setSlots({});
    setSel(null);
    setBoot('idle');
    setLog([]);
    sfx.click();
  };

  return (
    <>
      <TopBar title={t('pcLabTitle')} subtitle={t('pcLabHint')} onBack={onBack} />
      <div className="screen">
        <div className="lab-layout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Card glow="#2f6bff">
              <div className="section-title">
                <h2>{tr({ en: 'Virtual Bench', gu: 'વર્ચ્યુઅલ બેન્ચ', hi: 'वर्चुअल बेंच' })}</h2>
                <span className="sub">
                  {ORDER.filter((s) => slots[s]).length}/{ORDER.length}
                </span>
              </div>
              <div className="slot-grid" style={{ marginTop: 10 }}>
                {ORDER.map((slot) => {
                  const part = chosen(slot);
                  return (
                    <button
                      key={slot}
                      type="button"
                      className={`slot ${part ? 'filled' : ''} ${sel ? 'active' : ''}`}
                      onClick={() => place(slot)}
                      aria-label={S[slot].en}
                    >
                      <span className="slot-emoji">{part ? part.emoji : '➕'}</span>
                      <span className="slot-name">{S[slot][lang]}</span>
                      <span className="slot-hint">{part ? pickName(part) : t('emptySlot')}</span>
                    </button>
                  );
                })}
              </div>
              <div className="row" style={{ marginTop: 12 }}>
                <Btn variant="gold" onClick={test} icon="🔎">
                  {t('testComputer')}
                </Btn>
                <Btn variant="ghost" size="sm" onClick={reset}>
                  ♻️ {t('resetBuild')}
                </Btn>
              </div>
              {boot !== 'idle' ? (
                <div className={boot === 'ok' ? 'safety' : 'warn-box'} style={{ marginTop: 10 }}>
                  {boot === 'ok' ? `✅ ${t('bootOk')}` : `⚠️ ${t('bootFail')}`}
                </div>
              ) : null}
            </Card>

            <Card>
              <div className="block-title">{tr({ en: 'Assembly Log', gu: 'એસેમ્બલી લોગ', hi: 'असेम्बली लॉग' })}</div>
              <div className="lab-log" style={{ marginTop: 8 }}>
                {log.length === 0 ? (
                  <span className="tiny">
                    {tr({
                      en: 'Pick a part from the bin, then tap a slot to install it. Tap a filled slot to remove the part.',
                      gu: 'બિનમાંથી ભાગ પસંદ કરો, પછી સ્લોટ પર ટેપ કરીને ઇન્સ્ટોલ કરો. ભરેલા સ્લોટ પર ટેપ કરીને ભાગ કાઢો.',
                      hi: 'बिन से भाग चुनें, फिर स्लॉट पर टैप करके इंस्टॉल करें। भरे स्लॉट पर टैप करके भाग हटाएँ।',
                    })}
                  </span>
                ) : (
                  log.map((l, i) => (
                    <div key={i} className={`log-line ${l.tone === 'ok' ? 'ok' : l.tone === 'err' ? 'err' : ''}`}>
                      {l.text}
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Card glow="#25e0f0">
              <div className="block-title">{t('partsBin')}</div>
              <div className="part-list" style={{ marginTop: 8 }}>
                {PARTS.map((part) => {
                  const used = Object.values(slots).includes(part.id);
                  return (
                    <button
                      key={part.id}
                      type="button"
                      className={`part-item ${used ? 'used' : ''} ${sel === part.id ? 'selected' : ''}`}
                      onClick={() => {
                        sfx.click();
                        setSel(part.id);
                        addLog(
                          tr({
                            en: `Selected ${pickName(part)} — now tap the ${S[part.slot].en} slot.`,
                            gu: `${pickName(part)} પસંદ કર્યું — હવે ${S[part.slot].gu} સ્લોટ પર ટેપ કરો.`,
                            hi: `${pickName(part)} चुना — अब ${S[part.slot].hi} स्लॉट पर टैप करें।`,
                          }),
                        );
                      }}
                    >
                      <span className="part-emoji">{part.emoji}</span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <strong style={{ fontSize: 12, display: 'block' }}>{pickName(part)}</strong>
                        <span className="tiny">{S[part.slot][lang]}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card>
              <div className="block-title">{t('compatible')} / {t('incompatible')}</div>
              {issues.length === 0 ? (
                <p className="tiny" style={{ marginTop: 6 }}>
                  {tr({
                    en: 'No compatibility problems detected so far.',
                    gu: 'અત્યાર સુધી કોઈ અનુકૂળતાની સમસ્યા મળી નથી.',
                    hi: 'अब तक कोई अनुकूलता समस्या नहीं मिली।',
                  })}
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                  {issues.map((is, i) => (
                    <div key={i} className="log-line err">
                      {is}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
