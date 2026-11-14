import { useMemo, useState } from 'react';
import { REPAIR_CASES, pick } from '../content';
import { useGame } from '../state/game';
import { Btn, Card, TopBar } from '../components/UI';
import { sfx } from '../lib/audio';

export default function RepairCenter({ onBack }: { onBack: () => void }) {
  const { t, tr, lang, p, finishRepair, award, pushToast, level } = useGame();
  const [caseIdx, setCaseIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [cause, setCause] = useState<number | null>(null);
  const [fix, setFix] = useState<number | null>(null);
  const [testsRun, setTestsRun] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState('');

  const c = REPAIR_CASES[caseIdx];
  const solved = p.repairsDone.includes(c.id);

  const verdict = useMemo(() => {
    if (cause === null) return '';
    if (cause === c.correctCause) return tr({ en: 'Correct diagnosis!', gu: 'સાચું નિદાન!', hi: 'सही निदान!' });
    return tr({ en: 'Not the root cause — keep inspecting.', gu: 'મૂળ કારણ નથી — તપાસ ચાલુ રાખો.', hi: 'यह मूल कारण नहीं है — जाँच जारी रखें।' });
  }, [cause, c, tr]);

  const runTest = (i: number) => {
    if (testsRun.includes(i)) return;
    sfx.scan();
    setTestsRun((prev) => [...prev, i]);
  };

  const submitFix = () => {
    if (fix === null) return;
    if (fix === c.correctFix && cause === c.correctCause) {
      sfx.win();
      setDone(true);
      setFeedback(tr({ en: 'Device repaired and tested. Great technician work!', gu: 'ઉપકરણ રિપેર થયું અને ટેસ્ટ પાસ થયું. ઉત્તમ કાર્ય!', hi: 'डिवाइस ठीक हो गया और टेस्ट पास हुआ। बढ़िया काम!' }));
      if (!solved) finishRepair(c.id);
    } else {
      sfx.error();
      setFeedback(
        fix !== c.correctFix
          ? tr({ en: 'That repair will not fix the real fault. Review the diagnosis.', gu: 'આ રિપેરિંગ ખરી ખામી દૂર નહીં કરે. નિદાન ફરી જુઓ.', hi: 'यह रिपेयर असली खराबी नहीं ठीक करेगी। निदान फिर देखें।' })
          : tr({ en: 'Your diagnosis is wrong, so this repair is not the right one.', gu: 'તમારું નિદાન ખોટું છે, તેથી આ રિપેરિંગ યોગ્ય નથી.', hi: 'आपका निदान गलत है, इसलिए यह रिपेयर सही नहीं है।' }),
      );
    }
  };

  const nextCase = () => {
    const next = (caseIdx + 1) % REPAIR_CASES.length;
    setCaseIdx(next);
    setStep(0);
    setCause(null);
    setFix(null);
    setTestsRun([]);
    setDone(false);
    setFeedback('');
    sfx.click();
  };

  const restart = () => {
    setStep(0);
    setCause(null);
    setFix(null);
    setTestsRun([]);
    setDone(false);
    setFeedback('');
  };

  const stepLabels = [
    tr({ en: 'Complaint', gu: 'ફરિયાદ', hi: 'शिकायत' }),
    tr({ en: 'Inspect', gu: 'તપાસ', hi: 'जाँच' }),
    tr({ en: 'Causes', gu: 'કારણો', hi: 'कारण' }),
    tr({ en: 'Test', gu: 'ટેસ્ટ', hi: 'टेस्ट' }),
    tr({ en: 'Repair', gu: 'રિપેર', hi: 'रिपेयर' }),
    tr({ en: 'Result', gu: 'પરિણામ', hi: 'परिणाम' }),
  ];

  return (
    <>
      <TopBar title={t('repairTitle')} subtitle={`${caseIdx + 1} / ${REPAIR_CASES.length}`} onBack={onBack} />
      <div className="screen">
        <div className="step-rail">
          {stepLabels.map((s, i) => (
            <span key={s} className={`step-pill ${i === step ? 'active' : i < step ? 'done' : ''}`}>
              <span className="step-num">{i + 1}</span>
              {s}
            </span>
          ))}
        </div>

        <Card glow="#fbbf24">
          <div className="case-head">
            <div className="case-emoji">{c.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="block-title">{t('customerComplaint')}</div>
              <h2 style={{ fontSize: 17, margin: '2px 0 6px' }}>{pick(c.device, lang)}</h2>
              <p className="lesson-text" style={{ fontSize: 13.5 }}>
                “{pick(c.complaint, lang)}”
              </p>
              <div className="diag-line" style={{ marginTop: 8 }}>
                <span>🔍</span>
                <span>{pick(c.symptom, lang)}</span>
              </div>
            </div>
          </div>
        </Card>

        {step === 0 && (
          <Card>
            <div className="block-title">{t('inspectHint')}</div>
            <p className="lesson-text" style={{ fontSize: 13 }}>
              {tr({
                en: 'Step 1 complete: you received the complaint. Now inspect the virtual device and collect evidence before choosing a cause.',
                gu: 'પગલું 1 પૂર્ણ: ફરિયાદ મળી. હવે વર્ચ્યુઅલ ઉપકરણની તપાસ કરો અને કારણ પસંદ કરતા પહેલાં પુરાવા એકઠા કરો.',
                hi: 'चरण 1 पूरा: शिकायत मिल गई। अब वर्चुअल डिवाइस की जाँच करें और कारण चुनने से पहले सबूत इकट्ठा करें।',
              })}
            </p>
            <div className="warn-box" style={{ marginTop: 10 }}>
              ⚠️ {t('safetyNote')}
            </div>
            <div className="row" style={{ marginTop: 12 }}>
              <Btn variant="primary" onClick={() => setStep(1)}>
                {t('inspectDevice')} →
              </Btn>
            </div>
          </Card>
        )}

        {step === 1 && (
          <Card>
            <div className="block-title">{t('inspectDevice')}</div>
            <div className="option-row" style={{ marginTop: 8 }}>
              {c.tests.map((test, i) => {
                const ran = testsRun.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    className={`quiz-opt ${ran ? 'correct' : ''}`}
                    onClick={() => runTest(i)}
                    disabled={ran}
                  >
                    <span className="opt-key">{ran ? '✓' : i + 1}</span>
                    <span>
                      <strong style={{ fontSize: 12.5 }}>{pick(test.label, lang)}</strong>
                      {ran ? (
                        <span className="tiny" style={{ display: 'block', marginTop: 3, color: '#b6ffdc' }}>
                          → {pick(test.result, lang)}
                        </span>
                      ) : (
                        <span className="tiny" style={{ display: 'block', marginTop: 3 }}>
                          {t('runTest')}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="row" style={{ marginTop: 12 }}>
              <Btn variant="primary" disabled={testsRun.length === 0} onClick={() => setStep(2)}>
                {t('selectCause')} →
              </Btn>
              <span className="tiny">{testsRun.length}/{c.tests.length} {t('evidence')}</span>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <div className="block-title">{t('selectCause')}</div>
            <div className="option-row" style={{ marginTop: 8 }}>
              {c.causes.map((cz, i) => (
                <button
                  key={i}
                  type="button"
                  className={`quiz-opt ${cause === i ? (i === c.correctCause ? 'correct' : 'wrong') : ''}`}
                  onClick={() => {
                    sfx.click();
                    setCause(i);
                  }}
                >
                  <span className="opt-key">{String.fromCharCode(65 + i)}</span>
                  <span>{pick(cz, lang)}</span>
                </button>
              ))}
            </div>
            {cause !== null ? (
              <p className="tiny" style={{ marginTop: 10, color: cause === c.correctCause ? 'var(--green)' : 'var(--gold)' }}>
                {verdict}
              </p>
            ) : null}
            <div className="row" style={{ marginTop: 12 }}>
              <Btn variant="primary" disabled={cause === null} onClick={() => setStep(3)}>
                {t('chooseFix')} →
              </Btn>
              <Btn variant="ghost" size="sm" onClick={() => setStep(1)}>
                ← {t('inspectDevice')}
              </Btn>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <div className="block-title">{t('chooseFix')}</div>
            <p className="tiny" style={{ marginBottom: 8 }}>
              {tr({
                en: 'Choose a safe simulated repair. Never open a power supply or handle live wiring.',
                gu: 'સુરક્ષિત સિમ્યુલેટેડ રિપેરિંગ પસંદ કરો. પાવર સપ્લાય ક્યારેય ખોલશો નહીં અને જીવંત વાયરિંગને સ્પર્શશો નહીં.',
                hi: 'सुरक्षित सिम्युलेटेड रिपेयर चुनें। पावर सप्लाई कभी न खोलें और लाइव वायरिंग को न छुएँ।',
              })}
            </p>
            <div className="option-row">
              {c.fixes.map((f, i) => (
                <button
                  key={i}
                  type="button"
                  className={`quiz-opt ${fix === i && done ? 'correct' : fix === i ? 'wrong' : ''}`}
                  onClick={() => {
                    sfx.click();
                    setFix(i);
                  }}
                >
                  <span className="opt-key">{String.fromCharCode(65 + i)}</span>
                  <span>{pick(f, lang)}</span>
                </button>
              ))}
            </div>
            <div className="row" style={{ marginTop: 12 }}>
              <Btn variant="gold" disabled={fix === null} onClick={submitFix} icon="🛠️">
                {t('testDevice')}
              </Btn>
            </div>
            {feedback ? (
              <div className={`diag-line`} style={{ marginTop: 10, borderLeft: `3px solid ${done ? 'var(--green)' : 'var(--red)'}` }}>
                <span>{done ? '✅' : '❌'}</span>
                <span>{feedback}</span>
              </div>
            ) : null}
            {done ? (
              <div style={{ marginTop: 10 }}>
                <div className="safety">🧪 {pick(c.explain, lang)}</div>
                <div className="row" style={{ marginTop: 10 }}>
                  <Btn variant="primary" onClick={() => setStep(4)}>
                    {t('seeResult')} →
                  </Btn>
                </div>
              </div>
            ) : null}
          </Card>
        )}

        {step === 4 && done && (
          <Card glow="#3ddc97">
            <div className="block-title">{t('caseSolved')}</div>
            <h2 style={{ fontSize: 18, margin: '4px 0 8px' }}>✅ {pick(c.device, lang)}</h2>
            <p className="lesson-text" style={{ fontSize: 13 }}>
              {pick(c.explain, lang)}
            </p>
            <div className="row" style={{ marginTop: 12 }}>
              <Btn variant="primary" onClick={nextCase} icon="➡️">
                {t('nextCase')}
              </Btn>
              <Btn variant="ghost" size="sm" onClick={restart}>
                🔁 {t('retry')}
              </Btn>
            </div>
          </Card>
        )}

        <Card>
          <div className="section-title">
            <h2>{t('repairCenter')}</h2>
            <span className="sub">
              {p.repairsDone.length} / {REPAIR_CASES.length} {t('completed')} • {t('rank')}: {level}
            </span>
          </div>
          <div className="pill-row" style={{ marginTop: 10 }}>
            {REPAIR_CASES.map((rc, i) => (
              <button
                key={rc.id}
                type="button"
                className={`pill ${i === caseIdx ? 'on' : ''}`}
                onClick={() => {
                  sfx.click();
                  setCaseIdx(i);
                  restart();
                }}
                aria-label={pick(rc.device, lang)}
              >
                {rc.emoji} {p.repairsDone.includes(rc.id) ? '✓' : ''}
              </button>
            ))}
          </div>
          <div className="warn-box" style={{ marginTop: 12 }}>
            ⚠️ {tr({
              en: 'All repair tasks here are safe virtual simulations. Real repairs need trained supervision and the device unplugged.',
              gu: 'અહીંના બધા રિપેર કાર્યો સુરક્ષિત વર્ચ્યુઅલ સિમ્યુલેશન છે. વાસ્તવિક રિપેરિંગ તાલીમબદ્ધ દેખરેખ હેઠળ અને ઉપકરણ અનપ્લગ કરીને જ કરવું.',
              hi: 'यहाँ सभी रिपेयर कार्य सुरक्षित वर्चुअल सिमुलेशन हैं। असली रिपेयर प्रशिक्षित निगरानी में और डिवाइस अनप्लग करके ही करें।',
            })}
          </div>
        </Card>
      </div>
    </>
  );
}
