import { WORLDS, LESSON_BY_ID, pick } from '../content';
import { useGame } from '../state/game';
import { Bar, Btn, Card, TopBar } from '../components/UI';
import type { Go } from '../navigation';
import { sfx } from '../lib/audio';

export default function WorldScreen({ worldId, go }: { worldId: string; go: Go }) {
  const { t, tr, lang, p, unlockedWorlds, toggleBookmark } = useGame();
  const world = WORLDS.find((w) => w.id === worldId) ?? WORLDS[0];
  const locked = !unlockedWorlds.includes(world.id);
  const lessons = world.lessonIds.map((id) => LESSON_BY_ID[id]).filter(Boolean);
  const doneCount = lessons.filter((l) => p.lessonsDone.includes(l.id)).length;
  const ratio = lessons.length ? doneCount / lessons.length : 0;

  const labTarget: Record<string, string> = {
    pcbuild: 'pcbuild',
    circuit: 'circuit',
    repair: 'repair',
    network: 'network',
    robot: 'robot',
    future: 'future',
  };

  return (
    <>
      <TopBar title={`${world.index}. ${pick(world.title, lang)}`} subtitle={pick(world.subtitle, lang)} onBack={() => go('map')} />
      <div className="screen">
        <Card glow={world.accent} style={{ borderColor: `${world.accent}55` }}>
          <div className="world-hero">
            <div
              className="world-badge"
              style={{ background: `linear-gradient(135deg, ${world.color}, ${world.accent})` }}
            >
              {locked ? '🔒' : world.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <h2 className="h2">{pick(world.title, lang)}</h2>
              <p className="muted-sm">{pick(world.subtitle, lang)}</p>
              <div className="mission-box">
                <strong>{t('mission')}:</strong> {pick(world.mission, lang)}
              </div>
              <div style={{ marginTop: 10 }}>
                <Bar
                  value={ratio}
                  color={`linear-gradient(90deg, ${world.color}, ${world.accent})`}
                  label={`${doneCount}/${lessons.length} ${t('lessons')}`}
                />
              </div>
            </div>
          </div>

          {locked ? (
            <div className="lock-note">
              🔒 {t('unlockAtLevel')} <strong>{world.unlockLevel}</strong> —{' '}
              {tr({
                en: 'Keep learning in unlocked worlds to level up.',
                gu: 'લેવલ વધારવા ખુલ્લા વર્લ્ડમાં શીખવાનું ચાલુ રાખો.',
                hi: 'लेवल बढ़ाने के लिए खुले वर्ल्ड में सीखते रहें।',
              })}
            </div>
          ) : null}

          {!locked && labTarget[world.kind] ? (
            <div className="hero-actions" style={{ marginTop: 14 }}>
              <Btn
                variant="gold"
                icon="🧪"
                onClick={() => {
                  sfx.click();
                  go('lab', labTarget[world.kind]);
                }}
              >
                {world.kind === 'repair' ? t('repairCenter') : t('virtualLab')}
              </Btn>
              <Btn variant="soft" icon="🎯" onClick={() => go('games')}>
                {t('miniGames')}
              </Btn>
            </div>
          ) : null}
        </Card>

        <div className="section-title">
          <h2>{t('lessons')}</h2>
          <span className="sub">
            {doneCount}/{lessons.length} {t('complete')}
          </span>
        </div>

        <div className="grid lesson-grid">
          {lessons.map((lesson, i) => {
            const done = p.lessonsDone.includes(lesson.id);
            const score = p.quizzes[lesson.id];
            const saved = p.bookmarks.includes(lesson.id);
            return (
              <button
                key={lesson.id}
                type="button"
                className="lesson-card"
                disabled={locked}
                style={{ opacity: locked ? 0.55 : 1, borderColor: done ? 'rgba(61,220,151,.45)' : undefined }}
                onClick={() => {
                  if (locked) return;
                  sfx.click();
                  go('lesson', lesson.id);
                }}
              >
                <span className="lc-top">
                  <span className="lc-emoji" style={{ background: `${world.color}30` }}>
                    {lesson.emoji}
                  </span>
                  <span className="lc-idx">#{i + 1}</span>
                  {saved ? <span className="lc-star">🔖</span> : null}
                </span>
                <span className="lc-name">{pick(lesson.name, lang)}</span>
                <span className="lc-def">{pick(lesson.def, lang).slice(0, 78)}…</span>
                <span className="lc-foot">
                  {done ? (
                    <span className="chip ok">
                      ✓ {t('completed')} {typeof score === 'number' ? `• ${score}%` : ''}
                    </span>
                  ) : (
                    <span className="chip">{t('startLesson')}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <Card>
          <div className="section-title">
            <h2>{t('learned')}</h2>
            <span className="sub">{t('tapToBookmark')}</span>
          </div>
          <div className="pill-row">
            {lessons.map((l) => (
              <button
                key={l.id}
                type="button"
                className={`pill ${p.bookmarks.includes(l.id) ? 'on' : ''}`}
                onClick={() => {
                  sfx.click();
                  toggleBookmark(l.id);
                }}
              >
                {p.bookmarks.includes(l.id) ? '🔖' : '＋'} {pick(l.name, lang)}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
