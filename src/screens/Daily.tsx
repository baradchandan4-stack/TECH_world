import { useMemo, useState } from 'react';
import { ALL_LESSONS, REPAIR_CASES, WORLDS, pick } from '../content';
import { useGame } from '../state/game';
import { Bar, Btn, Card, TopBar } from '../components/UI';
import type { Go } from '../navigation';
import { sfx } from '../lib/audio';

function seedFrom(date: string): number {
  return date.split('').reduce((a, c) => a * 31 + c.charCodeAt(0), 7) % 100000;
}

export default function Daily({ go }: { go: Go }) {
  const { t, tr, lang, p, today, claimDaily, completeLesson, pushToast } = useGame();
  const claimed = p.dailyDate === today;
  const seed = useMemo(() => seedFrom(today), [today]);

  const lesson = ALL_LESSONS[seed % ALL_LESSONS.length];
  const world = WORLDS.find((w) => w.lessonIds.includes(lesson.id));
  const repair = REPAIR_CASES[seed % REPAIR_CASES.length];
  const quick = ALL_LESSONS[(seed * 7) % ALL_LESSONS.length];

  const [quickPick, setQuickPick] = useState<number | null>(null);
  const quickCorrect = quickPick !== null && quickPick === quick.quiz.correct;
  const lessonDone = p.lessonsDone.includes(lesson.id);

  const tasks = [
    {
      icon: '📘',
      title: tr({ en: 'Study today’s lesson', gu: 'આજનું લેસન ભણો', hi: 'आज का पाठ पढ़ें' }),
      detail: pick(lesson.name, lang),
      done: lessonDone,
      action: () => go('lesson', lesson.id),
      cta: t('openLesson'),
    },
    {
      icon: '🧯',
      title: tr({ en: 'Diagnose one repair case', gu: 'એક રિપેર કેસનું નિદાન કરો', hi: 'एक रिपेयर केस का निदान करें' }),
      detail: pick(repair.complaint, lang),
      done: p.repairsDone.length > 0,
      action: () => go('lab', 'repair'),
      cta: t('repairCenter'),
    },
    {
      icon: '🎯',
      title: tr({ en: 'Play any mini game', gu: 'કોઈ પણ મિની ગેમ રમો', hi: 'कोई भी मिनी गेम खेलें' }),
      detail: `${t('bestScore')}: ${p.bestScore}%`,
      done: p.bestScore > 0,
      action: () => go('games'),
      cta: t('miniGames'),
    },
  ];

  const doneCount = tasks.filter((x) => x.done).length;

  return (
    <>
      <TopBar title={t('dailyChallenges')} subtitle={today} onBack={() => go('home')} />
      <div className="screen">
        <Card glow="#fbbf24">
          <div className="section-title">
            <h2>{tr({ en: 'Today’s Mission Board', gu: 'આજનું મિશન બોર્ડ', hi: 'आज का मिशन बोर्ड' })}</h2>
            <span className="sub">
              {doneCount}/3 {t('complete')}
            </span>
          </div>
          <Bar value={doneCount / 3} color="linear-gradient(90deg, var(--gold), var(--cyan))" label={t('progress')} />
          <div className="task-list" style={{ marginTop: 14 }}>
            {tasks.map((task) => (
              <div key={task.title} className={`task-row ${task.done ? 'done' : ''}`}>
                <span className="task-ico">{task.done ? '✅' : task.icon}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className="task-title">{task.title}</span>
                  <span className="task-detail">{task.detail}</span>
                </span>
                <Btn variant={task.done ? 'soft' : 'primary'} size="sm" onClick={task.action}>
                  {task.done ? t('completed') : task.cta}
                </Btn>
              </div>
            ))}
          </div>
          <div className="hero-actions" style={{ marginTop: 14 }}>
            <Btn
              variant="gold"
              size="lg"
              icon="🎁"
              disabled={claimed || doneCount < 1}
              onClick={() => {
                claimDaily();
                sfx.levelUp();
                pushToast(`+60 XP • +25 🪙`, '🎁', 'good');
              }}
            >
              {claimed ? t('claimedToday') : t('claimDailyReward')}
            </Btn>
          </div>
        </Card>

        <Card>
          <div className="section-title">
            <h2>{t('quickChallenge')}</h2>
            <span className="sub">{pick(world?.title ?? WORLDS[0].title, lang)}</span>
          </div>
          <p className="body-text" style={{ fontWeight: 700 }}>
            {pick(quick.quiz.q, lang)}
          </p>
          <div className="option-list">
            {quick.quiz.options.map((opt, i) => {
              const isPicked = quickPick === i;
              const isCorrect = i === quick.quiz.correct;
              return (
                <button
                  key={i}
                  type="button"
                  className={`option ${isPicked ? (isCorrect ? 'ok' : 'bad') : ''} ${quickPick !== null && isCorrect ? 'ok' : ''}`}
                  onClick={() => {
                    if (quickPick !== null) return;
                    setQuickPick(i);
                    if (isCorrect) {
                      sfx.correct();
                      completeLesson(quick.id, world?.id ?? WORLDS[0].id, 100);
                      pushToast(`+30 XP`, '⚡', 'good');
                    } else {
                      sfx.error();
                    }
                  }}
                >
                  <span className="opt-e">{String.fromCharCode(65 + i)}</span>
                  <span>{pick(opt, lang)}</span>
                </button>
              );
            })}
          </div>
          {quickPick !== null ? (
            <p className={`feedback ${quickCorrect ? 'good' : 'bad'}`}>
              {quickCorrect
                ? tr({ en: 'Correct! Daily XP added.', gu: 'સાચું! દૈનિક XP ઉમેરાયું.', hi: 'सही! दैनिक XP जुड़ा।' })
                : `${tr({ en: 'Correct answer:', gu: 'સાચો જવાબ:', hi: 'सही उत्तर:' })} ${pick(
                    quick.quiz.options[quick.quiz.correct],
                    lang,
                  )}`}
            </p>
          ) : null}
        </Card>
      </div>
    </>
  );
}
