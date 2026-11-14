import { Suspense, useMemo, useState } from 'react';
import { ALL_LESSONS, LESSON_BY_ID, WORLDS, pick } from '../content';
import { useGame } from '../state/game';
import { Bar, Btn, Card, TopBar } from '../components/UI';
import { ComponentModel } from '../three/ComponentModel';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { sfx, speak } from '../lib/audio';
import type { Go } from '../navigation';
import type { Lesson, Tri } from '../content/types';

const STEPS = ['explore', 'identify', 'learn', 'watch', 'practice', 'challenge', 'test', 'reward'] as const;

function seededShuffle<T>(arr: T[], seed: string): T[] {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) % 99991;
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i -= 1) {
    h = (h * 1103515245 + 12345) % 2147483648;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function ModelStage({ lesson, animate }: { lesson: Lesson; animate: boolean }) {
  return (
    <div className="model-stage">
      <Canvas shadows dpr={[1, 1.7]} camera={{ position: [0, 1.6, 4.4], fov: 42 }}>
        <color attach="background" args={['#080e26']} />
        <fog attach="fog" args={['#080e26', 8, 18]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={1.5} castShadow />
        <pointLight position={[-3, 2, -2]} intensity={22} color="#25e0f0" />
        <Suspense fallback={null}>
          <group position={[0, 0, 0]}>
            <ComponentModel kind={lesson.model} spin={animate} bob={animate} scale={1.25} />
          </group>
        </Suspense>
        <OrbitControls enablePan={false} minDistance={2.6} maxDistance={7} autoRotate={animate} autoRotateSpeed={1.1} />
      </Canvas>
    </div>
  );
}

export default function LessonScreen({ lessonId, go }: { lessonId: string; go: Go }) {
  const { t, tr, lang, p, completeLesson, toggleBookmark, pushToast } = useGame();
  const lesson = LESSON_BY_ID[lessonId];
  const world = WORLDS.find((w) => w.lessonIds.includes(lessonId));
  const [step, setStep] = useState(0);
  const [quizPick, setQuizPick] = useState<number | null>(null);
  const [quizRight, setQuizRight] = useState(0);
  const [finished, setFinished] = useState(false);
  const [practicePick, setPracticePick] = useState<number | null>(null);
  const [challengePick, setChallengePick] = useState<number | null>(null);

  const practiceOptions = useMemo(() => {
    if (!lesson) return [];
    const others = ALL_LESSONS.filter((l) => l.id !== lesson.id && l.model !== lesson.model).slice(0, 3);
    return seededShuffle([lesson, ...others], lesson.id);
  }, [lesson]);

  const challengeOptions = useMemo(() => {
    if (!lesson) return [];
    const others = ALL_LESSONS.filter((l) => l.id !== lesson.id && l.func.en !== lesson.func.en).slice(0, 2);
    return seededShuffle([lesson, ...others], `${lesson.id}-f`);
  }, [lesson]);

  if (!lesson) {
    return (
      <>
        <TopBar title={t('lessons')} onBack={() => go('learning')} />
        <div className="screen">
          <Card>{t('notFound')}</Card>
        </div>
      </>
    );
  }

  const stepName = STEPS[step];
  const saved = p.bookmarks.includes(lesson.id);
  const alreadyDone = p.lessonsDone.includes(lesson.id);
  const practiceCorrect = practicePick !== null && practiceOptions[practicePick]?.id === lesson.id;
  const challengeCorrect = challengePick !== null && challengeOptions[challengePick]?.id === lesson.id;

  const STEP_LABELS: Record<string, Tri> = {
    explore: { en: 'Explore', gu: 'શોધો', hi: 'खोजें' },
    identify: { en: 'Identify', gu: 'ઓળખો', hi: 'पहचानें' },
    learn: { en: 'Learn', gu: 'શીખો', hi: 'सीखें' },
    watch: { en: 'Watch', gu: 'જુઓ', hi: 'देखें' },
    practice: { en: 'Practice', gu: 'અભ્યાસ', hi: 'अभ्यास' },
    challenge: { en: 'Challenge', gu: 'ચેલેન્જ', hi: 'चुनौती' },
    test: { en: 'Test', gu: 'ટેસ્ટ', hi: 'परीक्षा' },
    reward: { en: 'Reward', gu: 'ઇનામ', hi: 'इनाम' },
  };

  const stepLabel = (s: string) =>
    tr(STEP_LABELS[s] ?? { en: 'Explore', gu: 'શોધો', hi: 'खोजें' });

  const answerQuiz = (idx: number) => {
    if (quizPick !== null) return;
    setQuizPick(idx);
    if (idx === lesson.quiz.correct) {
      sfx.correct();
      setQuizRight(quizRight + 1);
    } else {
      sfx.error();
    }
  };

  const finish = () => {
    const base = quizPick === lesson.quiz.correct ? 100 : 60;
    completeLesson(lesson.id, world?.id ?? WORLDS[0].id, base);
    setFinished(true);
    sfx.levelUp();
    pushToast(`${pick(lesson.name, lang)} — ${t('lessonComplete')}`, '🎉', 'good');
  };

  return (
    <>
      <TopBar
        title={pick(lesson.name, lang)}
        subtitle={world ? pick(world.title, lang) : ''}
        onBack={() => go('world', world?.id ?? WORLDS[0].id)}
      />
      <div className="screen">
        <div className="step-track">
          {STEPS.map((s, i) => (
            <button
              key={s}
              type="button"
              className={`step-chip ${i === step ? 'on' : ''} ${i < step ? 'done' : ''}`}
              onClick={() => setStep(i)}
            >
              <span className="sc-n">{i + 1}</span>
              <span className="sc-t">{stepLabel(s)}</span>
            </button>
          ))}
        </div>

        {stepName === 'explore' ? (
          <Card glow="#25e0f0">
            <ModelStage lesson={lesson} animate />
            <p className="tiny" style={{ marginTop: 8, textAlign: 'center' }}>
              {tr({
                en: 'Drag to rotate the 3D model • scroll or pinch to zoom',
                gu: '3D મોડેલ ફેરવવા ડ્રેગ કરો • ઝૂમ માટે સ્ક્રોલ/પિંચ',
                hi: '3D मॉडल घुमाने के लिए ड्रैग करें • ज़ूम के लिए स्क्रॉल/पिंच',
              })}
            </p>
            <div className="hero-actions">
              <Btn
                variant="soft"
                icon="🔊"
                onClick={() => speak(`${pick(lesson.name, lang)}. ${pick(lesson.def, lang)}`, lang)}
              >
                {t('listen')}
              </Btn>
              <Btn variant="primary" icon="→" onClick={() => setStep(1)}>
                {t('next')}
              </Btn>
            </div>
          </Card>
        ) : null}

        {stepName === 'identify' ? (
          <Card glow="#8b5cf6">
            <div className="identify-head">
              <span className="identify-emoji">{lesson.emoji}</span>
              <div>
                <h2 className="h2">{pick(lesson.name, lang)}</h2>
                <p className="muted-sm">{pick(lesson.def, lang)}</p>
              </div>
            </div>
            <div className="kv-grid">
              <div className="kv">
                <span className="kv-k">{t('category')}</span>
                <span className="kv-v">{world ? pick(world.title, lang) : '—'}</span>
              </div>
              <div className="kv">
                <span className="kv-k">{t('level')}</span>
                <span className="kv-v">{world?.index ?? 1}</span>
              </div>
              <div className="kv">
                <span className="kv-k">{t('xp')}</span>
                <span className="kv-v">+30 XP</span>
              </div>
            </div>
            <div className="hero-actions">
              <Btn variant="soft" icon="🔖" onClick={() => toggleBookmark(lesson.id)}>
                {saved ? t('bookmarked') : t('bookmark')}
              </Btn>
              <Btn variant="primary" icon="→" onClick={() => setStep(2)}>
                {t('next')}
              </Btn>
            </div>
          </Card>
        ) : null}

        {stepName === 'learn' ? (
          <Card>
            <h3 className="h3">{t('definition')}</h3>
            <p className="body-text">{pick(lesson.def, lang)}</p>
            <h3 className="h3">{t('mainFunction')}</h3>
            <p className="body-text">{pick(lesson.func, lang)}</p>
            <h3 className="h3">{t('workingPrinciple')}</h3>
            <p className="body-text">{pick(lesson.principle, lang)}</p>
            <div className="two-col">
              <div className="info-box">
                <strong>{t('applications')}</strong>
                <p>{pick(lesson.uses, lang)}</p>
              </div>
              <div className="info-box">
                <strong>{t('realExamples')}</strong>
                <p>{pick(lesson.examples, lang)}</p>
              </div>
            </div>
            <div className="hero-actions">
              <Btn variant="soft" icon="🔊" onClick={() => speak(pick(lesson.principle, lang), lang)}>
                {t('listen')}
              </Btn>
              <Btn variant="primary" icon="→" onClick={() => setStep(3)}>
                {t('next')}
              </Btn>
            </div>
          </Card>
        ) : null}

        {stepName === 'watch' ? (
          <Card glow="#25e0f0">
            <ModelStage lesson={lesson} animate />
            <div className="anim-note">
              🎬 {tr({
                en: 'The model is rotating and pulsing to show how the part fits and works in the system.',
                gu: 'મોડેલ ફરે છે અને ચમકે છે જેથી દેખાય કે ભાગ સિસ્ટમમાં કેવી રીતે બેસે છે અને કામ કરે છે.',
                hi: 'मॉडल घूमता और चमकता है जिससे दिखे कि पुर्ज़ा सिस्टम में कैसे बैठता और काम करता है.',
              })}
            </div>
            <div className="hero-actions">
              <Btn variant="primary" icon="→" onClick={() => setStep(4)}>
                {t('next')}
              </Btn>
            </div>
          </Card>
        ) : null}

        {stepName === 'practice' ? (
          <Card glow="#3ddc97">
            <h3 className="h3">
              {tr({ en: 'Which model is this component?', gu: 'આ ઘટક કયું મોડેલ છે?', hi: 'यह घटक कौन-सा मॉडल है?' })}
            </h3>
            <ModelStage lesson={lesson} animate={false} />
            <div className="option-list">
              {practiceOptions.map((opt, i) => {
                const isPicked = practicePick === i;
                const isCorrect = opt.id === lesson.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`option ${isPicked ? (isCorrect ? 'ok' : 'bad') : ''} ${
                      practicePick !== null && isCorrect ? 'ok' : ''
                    }`}
                    onClick={() => {
                      setPracticePick(i);
                      if (isCorrect) sfx.correct();
                      else sfx.error();
                    }}
                  >
                    <span className="opt-e">{opt.emoji}</span>
                    <span>{pick(opt.name, lang)}</span>
                  </button>
                );
              })}
            </div>
            {practicePick !== null ? (
              <p className={`feedback ${practiceCorrect ? 'good' : 'bad'}`}>
                {practiceCorrect
                  ? tr({ en: 'Correct! You identified it.', gu: 'સાચું! તમે ઓળખી લીધું.', hi: 'सही! आपने पहचान लिया.' })
                  : tr({
                      en: `Not this one. The correct answer is ${pick(lesson.name, lang)}.`,
                      gu: `આ નથી. સાચો જવાબ ${pick(lesson.name, lang)} છે.`,
                      hi: `यह नहीं। सही उत्तर ${pick(lesson.name, lang)} है।`,
                    })}
              </p>
            ) : null}
            <div className="hero-actions">
              <Btn variant="primary" icon="→" onClick={() => setStep(5)} disabled={practicePick === null}>
                {t('next')}
              </Btn>
            </div>
          </Card>
        ) : null}

        {stepName === 'challenge' ? (
          <Card glow="#fbbf24">
            <h3 className="h3">
              {tr({
                en: 'What is the main function of this component?',
                gu: 'આ ઘટકનું મુખ્ય કાર્ય શું છે?',
                hi: 'इस घटक का मुख्य कार्य क्या है?',
              })}
            </h3>
            <div className="option-list">
              {challengeOptions.map((opt, i) => {
                const isPicked = challengePick === i;
                const isCorrect = opt.id === lesson.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`option ${isPicked ? (isCorrect ? 'ok' : 'bad') : ''} ${
                      challengePick !== null && isCorrect ? 'ok' : ''
                    }`}
                    onClick={() => {
                      setChallengePick(i);
                      if (isCorrect) sfx.correct();
                      else sfx.error();
                    }}
                  >
                    <span className="opt-e">🧩</span>
                    <span>{pick(opt.func, lang)}</span>
                  </button>
                );
              })}
            </div>
            {challengePick !== null ? (
              <p className={`feedback ${challengeCorrect ? 'good' : 'bad'}`}>
                {challengeCorrect
                  ? tr({ en: 'Exactly right!', gu: 'બરાબર સાચું!', hi: 'बिल्कुल सही!' })
                  : tr({
                      en: 'That describes another part. Read the main function again, then continue.',
                      gu: 'એ બીજા ભાગનું વર્ણન છે. મુખ્ય કાર્ય ફરી વાંચો, પછી આગળ વધો.',
                      hi: 'यह दूसरे पुर्ज़े का वर्णन है। मुख्य कार्य फिर पढ़ें, फिर आगे बढ़ें.',
                    })}
              </p>
            ) : null}
            <div className="hero-actions">
              <Btn variant="primary" icon="→" onClick={() => setStep(6)} disabled={challengePick === null}>
                {t('next')}
              </Btn>
            </div>
          </Card>
        ) : null}

        {stepName === 'test' ? (
          <Card glow="#2f6bff">
            <h3 className="h3">{t('quiz')}</h3>
            <p className="body-text" style={{ fontWeight: 700 }}>
              {pick(lesson.quiz.q, lang)}
            </p>
            <div className="option-list">
              {lesson.quiz.options.map((opt, i) => {
                const picked = quizPick === i;
                const correct = i === lesson.quiz.correct;
                return (
                  <button
                    key={i}
                    type="button"
                    className={`option ${picked ? (correct ? 'ok' : 'bad') : ''} ${
                      quizPick !== null && correct ? 'ok' : ''
                    }`}
                    onClick={() => answerQuiz(i)}
                  >
                    <span className="opt-e">{String.fromCharCode(65 + i)}</span>
                    <span>{pick(opt, lang)}</span>
                  </button>
                );
              })}
            </div>
            {quizPick !== null ? (
              <p className={`feedback ${quizPick === lesson.quiz.correct ? 'good' : 'bad'}`}>
                {quizPick === lesson.quiz.correct
                  ? tr({ en: 'Correct answer!', gu: 'સાચો જવાબ!', hi: 'सही उत्तर!' })
                  : `${tr({ en: 'Correct answer:', gu: 'સાચો જવાબ:', hi: 'सही उत्तर:' })} ${pick(
                      lesson.quiz.options[lesson.quiz.correct],
                      lang,
                    )}`}
              </p>
            ) : null}
            <div className="hero-actions">
              <Btn variant="primary" icon="🎁" onClick={() => setStep(7)} disabled={quizPick === null}>
                {t('next')}
              </Btn>
            </div>
          </Card>
        ) : null}

        {stepName === 'reward' ? (
          <Card glow="#3ddc97">
            <div className="reward-box">
              <div className="reward-emoji">{alreadyDone && finished ? '🔁' : '🏅'}</div>
              <h2 className="h2">{t('lessonComplete')}</h2>
              <p className="muted-sm">{pick(lesson.name, lang)}</p>
              <div className="reward-row">
                <span className="reward-chip">+30 XP</span>
                <span className="reward-chip">+12 🪙</span>
                <span className="reward-chip">
                  {quizPick === lesson.quiz.correct ? '⭐ 1' : '⭐ 0'} {t('stars')}
                </span>
              </div>
              {!finished ? (
                <Btn variant="gold" size="lg" icon="✨" onClick={finish}>
                  {t('claimReward')}
                </Btn>
              ) : (
                <div className="hero-actions" style={{ justifyContent: 'center' }}>
                  <Btn variant="soft" icon="📚" onClick={() => go('world', world?.id ?? WORLDS[0].id)}>
                    {t('backToWorld')}
                  </Btn>
                  <Btn variant="primary" icon="🎯" onClick={() => go('games')}>
                    {t('miniGames')}
                  </Btn>
                </div>
              )}
              <div style={{ marginTop: 12, width: '100%' }}>
                <Bar value={quizPick === lesson.quiz.correct ? 1 : 0.6} label={t('quizScore')} />
              </div>
            </div>
          </Card>
        ) : null}

        <div className="step-nav">
          <Btn variant="ghost" icon="←" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            {t('back')}
          </Btn>
          <span className="tiny">
            {step + 1} / {STEPS.length}
          </span>
          <Btn variant="ghost" icon="→" onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))} disabled={step === STEPS.length - 1}>
            {t('next')}
          </Btn>
        </div>
      </div>
    </>
  );
}
