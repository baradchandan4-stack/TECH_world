import { ACHIEVEMENTS, pick } from '../content';
import { useGame } from '../state/game';
import { Bar, Card, TopBar } from '../components/UI';
import type { Go } from '../navigation';

export default function Achievements({ go }: { go: Go }) {
  const { t, tr, lang, p } = useGame();
  const unlocked = p.achievements;

  return (
    <>
      <TopBar title={t('achievements')} subtitle={`${unlocked.length}/${ACHIEVEMENTS.length}`} onBack={() => go('home')} />
      <div className="screen">
        <Card glow="#fbbf24">
          <div className="section-title">
            <h2>{tr({ en: 'Badge Collection', gu: 'બેજ સંગ્રહ', hi: 'बैज संग्रह' })}</h2>
            <span className="sub">
              {unlocked.length}/{ACHIEVEMENTS.length}
            </span>
          </div>
          <Bar value={unlocked.length / ACHIEVEMENTS.length} color="linear-gradient(90deg, var(--gold), var(--purple))" label={t('progress')} />
        </Card>

        <div className="grid ach-grid">
          {ACHIEVEMENTS.map((a) => {
            const has = unlocked.includes(a.id);
            return (
              <div key={a.id} className={`ach-card ${has ? 'on' : ''}`}>
                <span className="ach-icon">{has ? a.icon : '🔒'}</span>
                <span className="ach-title">{pick(a.name, lang)}</span>
                <span className="ach-desc">{pick(a.desc, lang)}</span>
                <span className={`chip ${has ? 'ok' : ''}`}>
                  {has ? `✓ ${t('unlocked')}` : `+${a.xp} XP`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
