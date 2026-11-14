import { WORLDS, ALL_LESSONS, pick, RANKS } from '../content';
import { useGame } from '../state/game';
import { Bar, Btn, Card, Stat, TechBotPanel } from '../components/UI';
import type { Go } from '../navigation';
import TechBot3D from '../three/TechBot';
import { speak } from '../lib/audio';

export default function Home({ go }: { go: Go }) {
  const { t, tr, lang, p, level, rankName, nextXp, levelProgress, today } = useGame();
  const done = p.lessonsDone.length;
  const pct = done / Math.max(1, ALL_LESSONS.length);
  const dailyClaimed = p.dailyDate === today;

  const tiles: { icon: string; label: string; sub: string; view: Go extends (v: infer V, a?: string) => void ? V : never }[] = [
    { icon: '🎮', label: t('playGame'), sub: tr({ en: 'Continue adventure', gu: 'સફર ચાલુ રાખો', hi: 'यात्रा जारी रखें' }), view: 'map' },
    { icon: '🗺️', label: t('exploreWorlds'), sub: `${WORLDS.length} ${t('worlds')}`, view: 'map' },
    { icon: '📚', label: t('learningCenter'), sub: `${ALL_LESSONS.length} ${t('topics')}`, view: 'learning' },
    { icon: '🧪', label: t('virtualLab'), sub: tr({ en: 'PC + circuits', gu: 'PC + સર્કિટ', hi: 'PC + सर्किट' }), view: 'lab' },
    { icon: '🛠️', label: t('repairCenter'), sub: tr({ en: 'Fix devices', gu: 'ઉપકરણ સુધારો', hi: 'डिवाइस ठीक करें' }), view: 'lab' },
    { icon: '🎯', label: t('miniGames'), sub: tr({ en: '6 games', gu: '6 રમતો', hi: '6 खेल' }), view: 'games' },
    { icon: '📅', label: t('dailyChallenges'), sub: dailyClaimed ? t('claimedToday') : tr({ en: 'Reward ready', gu: 'ઇનામ તૈયાર', hi: 'इनाम तैयार' }), view: 'daily' },
    { icon: '📈', label: t('myProgress'), sub: `${Math.round(pct * 100)}%`, view: 'progress' },
    { icon: '🏆', label: t('achievements'), sub: `${p.achievements.length}`, view: 'achievements' },
    { icon: '⚙️', label: t('settings'), sub: t('language'), view: 'settings' },
    { icon: 'ℹ️', label: t('about'), sub: 'CS STUDIO', view: 'about' },
  ];

  const welcome = tr({
    en: `Welcome, Explorer! I am TECHBOT. You are level ${level} — ${rankName}. Pick a world and let us learn by doing.`,
    gu: `સ્વાગત છે, એક્સપ્લોરર! હું TECHBOT છું. તમે લેવલ ${level} — ${rankName} પર છો. એક વર્લ્ડ પસંદ કરો અને ચાલો કરીને શીખીએ.`,
    hi: `स्वागत है, एक्सप्लोरर! मैं TECHBOT हूँ। आप लेवल ${level} — ${rankName} पर हैं। एक वर्ल्ड चुनें और चलिए करके सीखें।`,
  });

  return (
    <div className="screen">
      <Card glow="#25e0f0">
        <div className="home-hero">
          <div>
            <div className="tagline">{t('tagline')}</div>
            <h1 className="hero-title" style={{ marginTop: 10 }}>
              {t('appName')}
            </h1>
            <p className="hero-sub">
              {t('welcomeExplorer')} • {rankName}
            </p>
            <div className="player-strip" style={{ marginTop: 14 }}>
              <div className="avatar-badge">{p.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{p.name || t('guest')}</div>
                <div className="tiny">
                  {t('level')} {level} • {rankName} • {t('next')} {nextXp} XP
                </div>
                <div style={{ marginTop: 6 }}>
                  <Bar value={levelProgress} label={t('progress')} />
                </div>
              </div>
            </div>
            <div className="hero-actions">
              <Btn variant="primary" size="lg" icon="🚀" onClick={() => go('map')}>
                {t('playGame')}
              </Btn>
              <Btn variant="soft" size="lg" icon="📚" onClick={() => go('learning')}>
                {t('learningCenter')}
              </Btn>
            </div>
          </div>
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <TechBot3D mood="happy" height={210} />
          </div>
        </div>
      </Card>

      <div className="stat-row">
        <Stat icon="⭐" value={level} label={t('level')} />
        <Stat icon="✨" value={p.xp} label={t('xp')} />
        <Stat icon="🪙" value={p.coins} label={t('coins')} />
        <Stat icon="🌟" value={p.stars} label={t('stars')} />
        <Stat icon="📘" value={`${done}/${ALL_LESSONS.length}`} label={t('lessons')} />
      </div>

      <TechBotPanel
        text={welcome}
        mood="happy"
        compact
        onSpeak={() =>
          speak(
            welcome,
            lang,
          )
        }
      />

      <div className="grid nav-grid">
        {tiles.map((tile) => (
          <button key={tile.label} type="button" className="nav-tile" onClick={() => go(tile.view as Parameters<Go>[0])}>
            <span className="nt-icon">{tile.icon}</span>
            <span className="nt-label">{tile.label}</span>
            <span className="nt-sub">{tile.sub}</span>
          </button>
        ))}
      </div>

      <Card>
        <div className="section-title">
          <h2>{tr({ en: 'Your Journey', gu: 'તમારી સફર', hi: 'आपकी यात्रा' })}</h2>
          <span className="sub">
            {done} / {ALL_LESSONS.length} {t('lessonsCompleted')}
          </span>
        </div>
        <div style={{ marginTop: 8 }}>
          <Bar value={pct} color="linear-gradient(90deg, var(--cyan), var(--purple))" label={t('progress')} />
        </div>
        <div className="pill-row" style={{ marginTop: 12 }}>
          {RANKS.map((r) => (
            <span key={r.level} className={`pill ${level >= r.level ? 'on' : ''}`}>
              {r.level} {pick(r.name, lang)}
            </span>
          ))}
        </div>
      </Card>

      <p className="footer-note">
        {t('brand')} • {t('appName')} • v1.0.0 — {t('tagline')}
      </p>
    </div>
  );
}
