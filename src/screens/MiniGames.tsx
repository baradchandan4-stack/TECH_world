import { useCallback, useEffect, useMemo, useState } from 'react';
import { ALL_LESSONS, REPAIR_CASES, pick } from '../content';
import { useGame } from '../state/game';
import { Bar, Btn, Card, TopBar } from '../components/UI';
import type { Go } from '../navigation';
import { sfx } from '../lib/audio';
import type { Lesson, Tri } from '../content/types';

type Diff = 'easy' | 'medium' | 'hard' | 'expert';
type GameId = 'identify' | 'fault' | 'cable' | 'memory' | 'quiz' | 'speed';

const DIFFS: { id: Diff; label: Tri; seconds: number; xp: number }[] = [
  { id: 'easy', label: { en: 'Easy', gu: 'સરળ', hi: 'आसान' }, seconds: 25, xp: 1 },
  { id: 'medium', label: { en: 'Medium', gu: 'મધ્યમ', hi: 'मध्यम' }, seconds: 18, xp: 1.5 },
  { id: 'hard', label: { en: 'Hard', gu: 'કઠિન', hi: 'कठिन' }, seconds: 12, xp: 2 },
  { id: 'expert', label: { en: 'Expert', gu: 'નિષ્ણાત', hi: 'विशेषज्ञ' }, seconds: 8, xp: 3 },
];

const CABLES = [
  { emoji: '🔌', a: { en: 'USB-A', gu: 'USB-A', hi: 'USB-A' }, b: { en: 'Keyboard, mouse, pen drive', gu: 'કીબોર્ડ, માઉસ, પેન ડ્રાઇવ', hi: 'कीबोर्ड, माउस, पेन ड्राइव' } },
  { emoji: '📺', a: { en: 'HDMI', gu: 'HDMI', hi: 'HDMI' }, b: { en: 'Monitor with video and audio', gu: 'વિડિયો અને ઓડિયો સાથે મોનિટર', hi: 'वीडियो और ऑडियो के साथ मॉनिटर' } },
  { emoji: '🌐', a: { en: 'Ethernet RJ45', gu: 'ઇથરનેટ RJ45', hi: 'ईथरनेट RJ45' }, b: { en: 'Wired LAN internet', gu: 'વાયર LAN ઇન્ટરનેટ', hi: 'वायर्ड LAN इंटरनेट' } },
  { emoji: '⚡', a: { en: '24-pin ATX', gu: '24-પિન ATX', hi: '24-पिन ATX' }, b: { en: 'Power to the motherboard', gu: 'મધરબોર્ડને પાવર', hi: 'मदरबोर्ड को पावर' } },
  { emoji: '🎧', a: { en: '3.5 mm jack', gu: '3.5 mm જેક', hi: '3.5 mm जैक' }, b: { en: 'Headphones and speakers', gu: 'હેડફોન અને સ્પીકર', hi: 'हेडफ़ोन और स्पीकर' } },
  { emoji: '💾', a: { en: 'SATA', gu: 'SATA', hi: 'SATA' }, b: { en: '2.5 inch SSD or HDD', gu: '2.5 ઇંચ SSD અથવા HDD', hi: '2.5 इंच SSD या HDD' } },
];

interface Q {
  prompt: string;
  emoji: string;
  options: string[];
  correct: number;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function MiniGames({ go }: { go: Go }) {
  const { t, tr, lang, p, saveMinigame, pushToast } = useGame();
  const [game, setGame] = useState<GameId | null>(null);
  const [diff, setDiff] = useState<Diff>('easy');
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [done, setDone] = useState(false);
  const [memoryOpen, setMemoryOpen] = useState<number[]>([]);
  const [memoryDone, setMemoryDone] = useState<number[]>([]);

  const diffDef = DIFFS.find((d) => d.id === diff) ?? DIFFS[0];

  const questions = useMemo<Q[]>(() => {
    const L = (l: Lesson) => pick(l.name, lang);
    if (!game) return [];
    if (game === 'identify' || game === 'quiz') {
      return shuffle(ALL_LESSONS)
        .slice(0, 10)
        .map((l) => {
          const others = shuffle(ALL_LESSONS.filter((o) => o.id !== l.id)).slice(0, 3);
          const opts = shuffle([l, ...others]);
          return {
            prompt: game === 'quiz' ? pick(l.quiz.q, lang) : pick(l.def, lang).slice(0, 96),
            emoji: game === 'quiz' ? l.emoji : '❓',
            options: game === 'quiz' ? l.quiz.options.map((o) => pick(o, lang)) : opts.map(L),
            correct:
              game === 'quiz'
                ? l.quiz.correct
                : opts.findIndex((o) => o.id === l.id),
          };
        });
    }
    if (game === 'speed') {
      return shuffle(ALL_LESSONS)
        .slice(0, 12)
        .map((l) => {
          const others = shuffle(ALL_LESSONS.filter((o) => o.id !== l.id)).slice(0, 2);
          const opts = shuffle([l, ...others]);
          return {
            prompt: pick(l.func, lang),
            emoji: '⚡',
            options: opts.map(L),
            correct: opts.findIndex((o) => o.id === l.id),
          };
        });
    }
    if (game === 'fault') {
      return shuffle(REPAIR_CASES)
        .slice(0, 8)
        .map((c) => ({
          prompt: pick(c.complaint, lang),
          emoji: c.emoji,
          options: c.causes.map((x) => pick(x, lang)),
          correct: c.correctCause,
        }));
    }
    if (game === 'cable') {
      return shuffle(CABLES).map((c) => {
        const others = shuffle(CABLES.filter((o) => o.a.en !== c.a.en)).slice(0, 3);
        const opts = shuffle([c, ...others]);
        return {
          prompt: pick(c.b, lang),
          emoji: c.emoji,
          options: opts.map((o) => pick(o.a, lang)),
          correct: opts.findIndex((o) => o.a.en === c.a.en),
        };
      });
    }
    return [];
  }, [game, lang]);

  const memoryCards = useMemo(() => {
    const picks = shuffle(ALL_LESSONS).slice(0, 6);
    return shuffle(
      picks.flatMap((l) => [
        { key: `${l.id}-a`, label: l.emoji, pair: l.id, kind: 'emoji' },
        { key: `${l.id}-b`, label: pick(l.name, lang), pair: l.id, kind: 'text' },
      ]),
    );
  }, [lang]);

  const reset = useCallback(() => {
    setIdx(0);
    setScore(0);
    setPicked(null);
    setDone(false);
    setTimeLeft(diffDef.seconds);
    setMemoryOpen([]);
    setMemoryDone([]);
  }, [diffDef.seconds]);

  const start = (g: GameId) => {
    sfx.whoosh();
    setGame(g);
    reset();
  };

  useEffect(() => {
    if (!game || done) return;
    if (game === 'memory') return;
    if (picked !== null) return;
    if (timeLeft <= 0) {
      setPicked(-1);
      return;
    }
    const timer = window.setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [game, done, picked, timeLeft]);

  const answer = (choice: number) => {
    if (picked !== null) return;
    setPicked(choice);
    const q = questions[idx];
    if (q && choice === q.correct) {
      sfx.correct();
      setScore((s) => s + 1);
    } else {
      sfx.error();
    }
  };

  const nextQ = () => {
    if (idx + 1 >= questions.length) {
      setDone(true);
      const finalScore = score;
      const pct = Math.round((finalScore / Math.max(1, questions.length)) * 100);
      const gained = Math.round(finalScore * 8 * diffDef.xp);
      saveMinigame(pct, game ?? 'game');
      if (finalScore > 0) pushToast(`+${gained} XP • ${pct}%`, '🎯', 'good');
      sfx.levelup();
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
    setTimeLeft(diffDef.seconds);
  };

  const flip = (i: number) => {
    if (memoryDone.includes(i) || memoryOpen.includes(i)) return;
    sfx.click();
    const nextOpen = [...memoryOpen, i];
    setMemoryOpen(nextOpen);
    if (nextOpen.length === 2) {
      const [a, b] = nextOpen;
      if (memoryCards[a].pair === memoryCards[b].pair) {
        sfx.correct();
        setMemoryDone((d) => [...d, a, b]);
        setScore((s) => s + 1);
        setMemoryOpen([]);
      } else {
        window.setTimeout(() => {
          sfx.error();
          setMemoryOpen([]);
        }, 750);
      }
    }
  };

  const endMemory = () => {
    setDone(true);
    const pct = Math.round((memoryDone.length / 2 / 6) * 100);
    saveMinigame(pct, 'memory');
    pushToast(`+${Math.round(pct * 0.6)} XP • ${pct}%`, '🧠', 'good');
    sfx.levelup();
  };

  const gameList: { id: GameId; icon: string; name: Tri; desc: Tri }[] = [
    {
      id: 'identify',
      icon: '🔍',
      name: { en: 'Identify the Component', gu: 'ઘટક ઓળખો', hi: 'घटक पहचानें' },
      desc: { en: 'Read the description and pick the right part.', gu: 'વર્ણન વાંચો અને સાચો ભાગ પસંદ કરો.', hi: 'विवरण पढ़ें और सही पुर्ज़ा चुनें।' },
    },
    {
      id: 'fault',
      icon: '🧯',
      name: { en: 'Find the Fault', gu: 'ખામી શોધો', hi: 'खराबी खोजें' },
      desc: { en: 'Diagnose the complaint like a technician.', gu: 'ટેકનિશિયનની જેમ ફરિયાદનું નિદાન કરો.', hi: 'टेक्नीशियन की तरह शिकायत का निदान करें।' },
    },
    {
      id: 'cable',
      icon: '🔌',
      name: { en: 'Match the Cable', gu: 'કેબલ મેચ કરો', hi: 'केबल मिलाएँ' },
      desc: { en: 'Connect each cable to its correct use.', gu: 'દરેક કેબલને તેના સાચા ઉપયોગ સાથે જોડો.', hi: 'हर केबल को उसके सही उपयोग से जोड़ें।' },
    },
    {
      id: 'memory',
      icon: '🧠',
      name: { en: 'Component Memory', gu: 'ઘટક મેમરી', hi: 'घटक मेमोरी' },
      desc: { en: 'Match each 3D part with its name.', gu: 'દરેક ભાગને તેના નામ સાથે મેચ કરો.', hi: 'हर पुर्ज़े को उसके नाम से मिलाएँ।' },
    },
    {
      id: 'quiz',
      icon: '❓',
      name: { en: 'Tech Quiz', gu: 'ટેક ક્વિઝ', hi: 'टेक क्विज़' },
      desc: { en: 'Mixed questions from every world.', gu: 'દરેક વર્લ્ડના મિશ્ર પ્રશ્નો.', hi: 'हर वर्ल्ड के मिश्रित प्रश्न।' },
    },
    {
      id: 'speed',
      icon: '⏱️',
      name: { en: 'Speed Technician', gu: 'સ્પીડ ટેકનિશિયન', hi: 'स्पीड टेक्नीशियन' },
      desc: { en: 'Beat the clock and name the function.', gu: 'ઘડિયાળને હરાવો અને કાર્ય જણાવો.', hi: 'घड़ी को हराएँ और कार्य बताएँ।' },
    },
  ];

  if (!game) {
    return (
      <>
        <TopBar title={t('miniGames')} subtitle={t('chooseDifficulty')} onBack={() => go('home')} />
        <div className="screen">
          <Card>
            <div className="section-title">
              <h2>{t('difficulty')}</h2>
              <span className="sub">
                {t('bestScore')}: {p.bestScore}%
              </span>
            </div>
            <div className="pill-row">
              {DIFFS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className={`pill ${diff === d.id ? 'on' : ''}`}
                  onClick={() => {
                    sfx.click();
                    setDiff(d.id);
                  }}
                >
                  {pick(d.label, lang)} • {d.seconds}s
                </button>
              ))}
            </div>
          </Card>
          <div className="grid game-grid">
            {gameList.map((g) => (
              <button key={g.id} type="button" className="game-card" onClick={() => start(g.id)}>
                <span className="gc-icon">{g.icon}</span>
                <span className="gc-name">{pick(g.name, lang)}</span>
                <span className="gc-desc">{pick(g.desc, lang)}</span>
                <span className="chip">▶ {t('play')}</span>
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (game === 'memory') {
    return (
      <>
        <TopBar title={pick(gameList.find((g) => g.id === 'memory')!.name, lang)} onBack={() => setGame(null)} />
        <div className="screen">
          <Card>
            <div className="section-title">
              <h2>{t('pairsFound')}</h2>
              <span className="sub">
                {memoryDone.length / 2} / 6
              </span>
            </div>
            <div className="memory-grid">
              {memoryCards.map((card, i) => {
                const open = memoryOpen.includes(i) || memoryDone.includes(i);
                return (
                  <button
                    key={card.key}
                    type="button"
                    className={`mem-card ${open ? 'open' : ''} ${memoryDone.includes(i) ? 'matched' : ''}`}
                    onClick={() => flip(i)}
                  >
                    {open ? card.label : '❔'}
                  </button>
                );
              })}
            </div>
            <div className="hero-actions">
              <Btn variant="soft" icon="↺" onClick={reset}>
                {t('restart')}
              </Btn>
              <Btn variant="gold" icon="✅" onClick={endMemory} disabled={memoryDone.length < 12}>
                {t('finish')}
              </Btn>
            </div>
          </Card>
        </div>
      </>
    );
  }

  const q = questions[idx];

  if (done) {
    const pct = Math.round((score / Math.max(1, questions.length)) * 100);
    return (
      <>
        <TopBar title={t('result')} onBack={() => setGame(null)} />
        <div className="screen">
          <Card glow="#3ddc97">
            <div className="reward-box">
              <div className="reward-emoji">{pct >= 70 ? '🏆' : '💪'}</div>
              <h2 className="h2">
                {pct >= 70 ? t('greatJob') : t('keepPracticing')}
              </h2>
              <p className="muted-sm">
                {score} / {questions.length} {t('correctAnswers')}
              </p>
              <div style={{ width: '100%', margin: '12px 0' }}>
                <Bar value={score / Math.max(1, questions.length)} label={`${pct}%`} />
              </div>
              <div className="reward-row">
                <span className="reward-chip">+{Math.round(score * 8 * diffDef.xp)} XP</span>
                <span className="reward-chip">+{Math.round(score * 3 * diffDef.xp)} 🪙</span>
              </div>
              <div className="hero-actions" style={{ justifyContent: 'center' }}>
                <Btn variant="soft" icon="↺" onClick={reset}>
                  {t('playAgain')}
                </Btn>
                <Btn variant="primary" icon="🎮" onClick={() => setGame(null)}>
                  {t('allGames')}
                </Btn>
              </div>
            </div>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar
        title={pick(gameList.find((g) => g.id === game)!.name, lang)}
        subtitle={`${idx + 1} / ${questions.length}`}
        onBack={() => setGame(null)}
      />
      <div className="screen">
        <Card glow="#2f6bff">
          <div className="quiz-head">
            <span className="quiz-emoji">{q?.emoji}</span>
            <div style={{ flex: 1 }}>
              <div className="tiny">
                {t('score')}: {score} • {t('time')}: {Math.max(0, timeLeft)}s
              </div>
              <Bar value={timeLeft / diffDef.seconds} color={timeLeft < 5 ? 'var(--red)' : 'var(--cyan)'} />
            </div>
          </div>
          <p className="body-text" style={{ fontWeight: 700, marginTop: 12 }}>
            {q?.prompt}
          </p>
          <div className="option-list">
            {q?.options.map((opt, i) => {
              const isPicked = picked === i;
              const isCorrect = i === q.correct;
              return (
                <button
                  key={i}
                  type="button"
                  className={`option ${isPicked ? (isCorrect ? 'ok' : 'bad') : ''} ${picked !== null && isCorrect ? 'ok' : ''}`}
                  onClick={() => answer(i)}
                >
                  <span className="opt-e">{String.fromCharCode(65 + i)}</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
          {picked !== null ? (
            <div className="hero-actions">
              <span className={`feedback ${picked === q?.correct ? 'good' : 'bad'}`} style={{ margin: 0 }}>
                {picked === q?.correct
                  ? tr({ en: 'Correct!', gu: 'સાચું!', hi: 'सही!' })
                  : picked === -1
                    ? tr({ en: 'Time up!', gu: 'સમય પૂરો!', hi: 'समय समाप्त!' })
                    : `${tr({ en: 'Answer:', gu: 'જવાબ:', hi: 'उत्तर:' })} ${q?.options[q.correct]}`}
              </span>
              <Btn variant="primary" icon="→" onClick={nextQ}>
                {idx + 1 >= questions.length ? t('finish') : t('next')}
              </Btn>
            </div>
          ) : null}
        </Card>
      </div>
    </>
  );
}
