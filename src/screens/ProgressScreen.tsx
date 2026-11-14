import { ALL_LESSONS, WORLDS, RANKS, ACHIEVEMENTS, pick } from '../content';
import { useGame } from '../state/game';
import { Bar, Btn, Card, Stat, TopBar } from '../components/UI';
import type { Go } from '../navigation';
import { sfx } from '../lib/audio';

export default function ProgressScreen({ go }: { go: Go }) {
  const { t, tr, lang, p, level, rankName, nextXp, levelProgress, reset, pushToast } = useGame();

  const lessonsPct = p.lessonsDone.length / Math.max(1, ALL_LESSONS.length);
  const worldsPct = p.worldsDone.length / WORLDS.length;
  const quizAvg = (() => {
    const vals = Object.values(p.quizzes);
    if (!vals.length) return 0;
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  })();
  const overall = Math.round(((lessonsPct + worldsPct) / 2) * 100);

  return (
    <>
      <TopBar title={t('myProgress')} subtitle={rankName} onBack={() => go('home')} />
      <div className="screen">
        <Card glow="#25e0f0">
          <div className="profile-head">
            <div className="avatar-badge big">{p.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 className="h2">{p.name || t('guest')}</h2>
              <p className="muted-sm">
                {t('level')} {level} • {rankName}
              </p>
              <Bar value={levelProgress} label={`${nextXp} XP ${t('toNextLevel')}`} />
            </div>
          </div>
          <div className="stat-row" style={{ marginTop: 14 }}>
            <Stat icon="✨" value={p.xp} label={t('xp')} />
            <Stat icon="🪙" value={p.coins} label={t('coins')} />
            <Stat icon="🌟" value={p.stars} label={t('stars')} />
            <Stat icon="🏆" value={p.achievements.length} label={t('achievements')} />
          </div>
        </Card>

        <Card>
          <div className="section-title">
            <h2>{tr({ en: 'Learning Breakdown', gu: 'શિક્ષણ વિગત', hi: 'सीखने का विवरण' })}</h2>
            <span className="sub">{overall}% {t('complete')}</span>
          </div>
          <div className="progress-rows">
            <div>
              <span className="tiny">
                {t('lessons')} — {p.lessonsDone.length}/{ALL_LESSONS.length}
              </span>
              <Bar value={lessonsPct} />
            </div>
            <div>
              <span className="tiny">
                {t('worlds')} — {p.worldsDone.length}/{WORLDS.length}
              </span>
              <Bar value={worldsPct} color="linear-gradient(90deg, var(--purple), var(--cyan))" />
            </div>
            <div>
              <span className="tiny">
                {t('quizScore')} — {quizAvg}%
              </span>
              <Bar value={quizAvg / 100} color="linear-gradient(90deg, var(--gold), var(--green))" />
            </div>
            <div>
              <span className="tiny">
                {t('repairsDone')} — {p.repairsDone.length}
              </span>
              <Bar value={Math.min(1, p.repairsDone.length / 10)} color="var(--green)" />
            </div>
            <div>
              <span className="tiny">
                {t('buildsDone')} — {p.buildsDone} • {t('circuitsDone')} — {p.circuitsDone}
              </span>
              <Bar value={Math.min(1, (p.buildsDone + p.circuitsDone) / 6)} color="var(--gold)" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="section-title">
            <h2>{t('rank')}</h2>
            <span className="sub">
              {level}/10
            </span>
          </div>
          <div className="rank-list">
            {RANKS.map((r) => (
              <div key={r.level} className={`rank-row ${level >= r.level ? 'on' : ''}`}>
                <span className="rank-n">{r.level}</span>
                <span style={{ flex: 1 }}>{pick(r.name, lang)}</span>
                <span className="tiny">{r.xp} XP</span>
                {level >= r.level ? <span className="chip ok">✓</span> : <span className="chip">🔒</span>}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="section-title">
            <h2>{t('certificate')}</h2>
            <span className="sub">{overall}%</span>
          </div>
          <div className={`cert ${overall >= 60 ? 'ready' : ''}`}>
            <div className="cert-brand">{t('brand')}</div>
            <div className="cert-title">{t('appName')}</div>
            <div className="cert-line">
              {tr({ en: 'This certifies that', gu: 'આ પ્રમાણિત કરે છે કે', hi: 'यह प्रमाणित करता है कि' })}
            </div>
            <div className="cert-name">{p.name || t('guest')}</div>
            <div className="cert-line">
              {overall >= 60
                ? tr({
                    en: `has completed ${overall}% of the TECHQUEST WORLD learning journey as ${rankName}.`,
                    gu: `એ ${rankName} તરીકે TECHQUEST WORLD શિક્ષણ યાત્રાના ${overall}% પૂર્ણ કર્યા છે.`,
                    hi: `ने ${rankName} के रूप में TECHQUEST WORLD सीखने की यात्रा का ${overall}% पूरा किया है।`,
                  })
                : tr({
                    en: 'Complete at least 60% of lessons to unlock your certificate.',
                    gu: 'તમારું પ્રમાણપત્ર ખોલવા ઓછામાં ઓછા 60% લેસન પૂર્ણ કરો.',
                    hi: 'अपना प्रमाणपत्र खोलने के लिए कम से कम 60% पाठ पूरे करें।',
                  })}
            </div>
            <div className="cert-foot">
              {t('brand')} • {t('tagline')}
            </div>
          </div>
        </Card>

        <Card>
          <div className="section-title">
            <h2>{t('achievements')}</h2>
            <span className="sub">
              {p.achievements.length}/{ACHIEVEMENTS.length}
            </span>
          </div>
          <div className="pill-row">
            {ACHIEVEMENTS.slice(0, 6).map((a) => (
              <span key={a.id} className={`pill ${p.achievements.includes(a.id) ? 'on' : ''}`}>
                {a.icon} {pick(a.title, lang)}
              </span>
            ))}
          </div>
          <div className="hero-actions" style={{ marginTop: 12 }}>
            <Btn variant="soft" icon="🏆" onClick={() => go('achievements')}>
              {t('achievements')}
            </Btn>
          </div>
        </Card>

        <Card>
          <div className="section-title">
            <h2>{t('learningHistory')}</h2>
          </div>
          <div className="history-list">
            {p.history.length === 0 ? <p className="tiny">{t('noHistory')}</p> : null}
            {p.history.slice(0, 12).map((h, i) => (
              <div key={`${h.t}-${i}`} className="history-row">
                <span className="chip">{h.kind}</span>
                <span style={{ flex: 1 }}>{h.label}</span>
                <span className="chip ok">+{h.xp} XP</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="hero-actions">
            <Btn variant="danger" icon="⚠️" onClick={() => {
              if (window.confirm(t('resetConfirm'))) {
                reset();
                sfx.error();
                pushToast(t('resetDone'), '♻️', 'info');
                go('home');
              }
            }}>
              {t('resetProgress')}
            </Btn>
          </div>
        </Card>
      </div>
    </>
  );
}
