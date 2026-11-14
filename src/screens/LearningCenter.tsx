import { useMemo, useState } from 'react';
import { ALL_LESSONS, WORLDS, pick } from '../content';
import { useGame } from '../state/game';
import { Btn, Card, TopBar } from '../components/UI';
import type { Go } from '../navigation';
import { sfx } from '../lib/audio';

export default function LearningCenter({ go }: { go: Go }) {
  const { t, tr, lang, p, toggleBookmark } = useGame();
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [onlySaved, setOnlySaved] = useState(false);

  const lessonWorld = useMemo(() => {
    const map: Record<string, string> = {};
    WORLDS.forEach((w) => w.lessonIds.forEach((id) => { map[id] = w.id; }));
    return map;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_LESSONS.filter((l) => {
      if (onlySaved && !p.bookmarks.includes(l.id)) return false;
      if (cat !== 'all' && lessonWorld[l.id] !== cat) return false;
      if (!q) return true;
      const hay = [l.name.en, l.name.gu, l.name.hi, l.def.en, l.def.gu, l.def.hi, l.func.en, l.func.gu, l.func.hi]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, cat, onlySaved, p.bookmarks, lessonWorld]);

  return (
    <>
      <TopBar title={t('learningCenter')} subtitle={`${ALL_LESSONS.length} ${t('topics')}`} onBack={() => go('home')} />
      <div className="screen">
        <Card>
          <div className="search-row">
            <span className="search-ico">🔍</span>
            <input
              className="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchTopics')}
              aria-label={t('searchTopics')}
            />
            {query ? (
              <button type="button" className="clear-btn" onClick={() => setQuery('')} aria-label={t('close')}>
                ✕
              </button>
            ) : null}
          </div>
          <div className="pill-row" style={{ marginTop: 12 }}>
            <button
              type="button"
              className={`pill ${cat === 'all' && !onlySaved ? 'on' : ''}`}
              onClick={() => {
                sfx.click();
                setCat('all');
                setOnlySaved(false);
              }}
            >
              🌐 {t('allTopics')}
            </button>
            <button
              type="button"
              className={`pill ${onlySaved ? 'on' : ''}`}
              onClick={() => {
                sfx.click();
                setOnlySaved(!onlySaved);
              }}
            >
              🔖 {t('savedLessons')} ({p.bookmarks.length})
            </button>
            {WORLDS.map((w) => (
              <button
                key={w.id}
                type="button"
                className={`pill ${cat === w.id ? 'on' : ''}`}
                onClick={() => {
                  sfx.click();
                  setCat(w.id);
                  setOnlySaved(false);
                }}
              >
                {w.emoji} {pick(w.title, lang)}
              </button>
            ))}
          </div>
          <p className="tiny" style={{ marginTop: 10 }}>
            {results.length} {t('results')}
          </p>
        </Card>

        <div className="grid lesson-grid">
          {results.map((l) => {
            const world = WORLDS.find((w) => w.id === lessonWorld[l.id]);
            const done = p.lessonsDone.includes(l.id);
            const saved = p.bookmarks.includes(l.id);
            return (
              <div key={l.id} className="lesson-card static">
                <span className="lc-top">
                  <span className="lc-emoji" style={{ background: `${world?.color ?? '#2f6bff'}30` }}>
                    {l.emoji}
                  </span>
                  <span className="lc-idx">{world ? pick(world.title, lang).slice(0, 12) : ''}</span>
                  <button
                    type="button"
                    className="lc-star"
                    aria-label={t('bookmark')}
                    onClick={() => {
                      sfx.click();
                      toggleBookmark(l.id);
                    }}
                  >
                    {saved ? '🔖' : '☆'}
                  </button>
                </span>
                <span className="lc-name">{pick(l.name, lang)}</span>
                <span className="lc-def">{pick(l.def, lang).slice(0, 90)}…</span>
                <span className="lc-foot">
                  <Btn
                    variant={done ? 'soft' : 'primary'}
                    size="sm"
                    icon={done ? '🔁' : '▶'}
                    onClick={() => go('lesson', l.id)}
                  >
                    {done ? t('revisit') : t('openLesson')}
                  </Btn>
                </span>
              </div>
            );
          })}
        </div>

        {results.length === 0 ? (
          <Card>
            <p className="body-text">
              {tr({
                en: 'No topic matched your search. Try CPU, RAM, resistor, Wi-Fi or robot.',
                gu: 'તમારી શોધ સાથે કોઈ વિષય મળ્યો નહીં. CPU, RAM, રેઝિસ્ટર, Wi-Fi અથવા રોબોટ પ્રયત્ન કરો.',
                hi: 'आपकी खोज से कोई विषय नहीं मिला। CPU, RAM, रेज़िस्टर, Wi-Fi या रोबोट आज़माएँ।',
              })}
            </p>
          </Card>
        ) : null}
      </div>
    </>
  );
}
