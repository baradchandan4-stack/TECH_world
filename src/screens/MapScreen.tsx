import { Suspense } from 'react';
import { WORLDS, pick } from '../content';
import { useGame } from '../state/game';
import { Bar, Card, TopBar } from '../components/UI';
import WorldMapScene from '../three/WorldMap';
import type { Go } from '../navigation';
import { sfx } from '../lib/audio';

export default function MapScreen({ go }: { go: Go }) {
  const { t, tr, lang, p, level, unlockedWorlds } = useGame();

  const open = (id: string) => {
    const world = WORLDS.find((w) => w.id === id);
    if (!world) return;
    if (!unlockedWorlds.includes(id)) {
      sfx.error();
      return;
    }
    sfx.whoosh();
    go('world', id);
  };

  return (
    <>
      <TopBar title={t('exploreWorlds')} subtitle={t('tagline')} onBack={() => go('home')} />
      <div className="screen">
        <Card glow="#8b5cf6" style={{ padding: 10 }}>
          <div className="map-shell">
            <div className="map-hud">
              <span className="map-hud-chip">⭐ {t('level')} {level}</span>
              <span className="map-hud-chip">🌍 {unlockedWorlds.length}/{WORLDS.length}</span>
              <span className="map-hud-chip">🏁 {p.worldsDone.length} {t('complete')}</span>
            </div>
            <div className="map-canvas">
              <Suspense fallback={<div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>…</div>}>
                <WorldMapScene
                  lang={lang}
                  quality={p.settings.quality}
                  unlockedIds={unlockedWorlds}
                  completedIds={p.worldsDone}
                  onSelect={open}
                />
              </Suspense>
            </div>
          </div>
          <p className="tiny" style={{ textAlign: 'center', marginTop: 8 }}>
            {tr({
              en: 'Drag to orbit • pinch or scroll to zoom • tap a glowing island to enter',
              gu: 'ફેરવવા માટે ખેંચો • ઝૂમ માટે પિંચ/સ્ક્રોલ • પ્રવેશ માટે ચમકતા ટાપુ પર ટેપ કરો',
              hi: 'घुमाने के लिए खींचें • ज़ूम के लिए पिंच/स्क्रॉल • प्रवेश के लिए चमकते द्वीप पर टैप करें',
            })}
          </p>
        </Card>

        <div className="world-list">
          {WORLDS.map((w) => {
            const locked = !unlockedWorlds.includes(w.id);
            const done = p.worldsDone.includes(w.id);
            const worldLessons = w.lessonIds.length;
            const doneLessons = w.lessonIds.filter((id) => p.lessonsDone.includes(id)).length;
            const ratio = worldLessons ? doneLessons / worldLessons : 0;
            return (
              <button
                key={w.id}
                type="button"
                className="world-row"
                onClick={() => open(w.id)}
                style={{ opacity: locked ? 0.6 : 1, borderColor: done ? 'rgba(61,220,151,.5)' : undefined }}
              >
                <span className="wr-emoji" style={{ background: `${w.color}33`, border: `1px solid ${w.accent}66` }}>
                  {locked ? '🔒' : w.emoji}
                </span>
                <span className="wr-body">
                  <span className="wr-title">
                    {w.index}. {pick(w.title, lang)} {done ? '✓' : ''}
                  </span>
                  <span className="wr-sub">
                    {locked
                      ? `${t('unlockAtLevel')} ${w.unlockLevel}`
                      : `${doneLessons}/${worldLessons} ${t('lessons')}`}
                  </span>
                  {!locked ? (
                    <span style={{ display: 'block', marginTop: 5 }}>
                      <Bar value={ratio} color={`linear-gradient(90deg, ${w.color}, ${w.accent})`} />
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>

        <Card>
          <div className="section-title">
            <h2>{t('worlds')}</h2>
            <span className="sub">
              {t('level')} {level} • {p.worldsDone.length}/{WORLDS.length} {t('complete')}
            </span>
          </div>
          <p className="tiny" style={{ marginTop: 6 }}>
            {tr({
              en: 'Complete lessons and labs to earn XP. Higher levels unlock new worlds automatically.',
              gu: 'XP કમાવવા લેસન અને લેબ પૂર્ણ કરો. ઊંચા લેવલ નવા વર્લ્ડ આપમેળે ખોલે છે.',
              hi: 'XP कमाने के लिए पाठ और लैब पूरे करें। ऊँचे लेवल नए वर्ल्ड अपने आप खोलते हैं।',
            })}
          </p>
        </Card>
      </div>
    </>
  );
}
