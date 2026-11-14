import { useState } from 'react';
import { LANGS } from '../content/types';
import { useGame } from '../state/game';
import { Btn } from '../components/UI';
import { sfx, speak, startMusic } from '../lib/audio';
import TechBot3D from '../three/TechBot';

export default function LanguageScreen({ onDone }: { onDone: () => void }) {
  const { t, tr, setLang, lang, p, patch } = useGame();
  const [hover, setHover] = useState<string | null>(null);

  const choose = (id: (typeof LANGS)[number]['id']) => {
    setLang(id);
    patch({ lang: id, onboarded: true });
    if (p.settings.music) startMusic();
    sfx.levelUp();
    setTimeout(() => {
      if (p.settings.voice) speak(tr({ en: 'Welcome to TECHQUEST WORLD! Let us begin your technology adventure.', gu: 'TECHQUEST WORLD માં આપનું સ્વાગત છે! ચાલો તમારી ટેકનોલોજી સફર શરૂ કરીએ.', hi: 'TECHQUEST WORLD में आपका स्वागत है! आइए आपकी टेक्नोलॉजी यात्रा शुरू करें।' }), id);
      onDone();
    }, 420);
  };

  return (
    <div className="lang-screen">
      <div className="lang-inner">
        <div className="techbot-avatar" style={{ width: 150 }}>
          <TechBot3D mood="cheer" height={150} />
        </div>
        <h1 className="logo-mark">{t('appName')}</h1>
        <div className="tagline">{t('tagline')}</div>
        <p className="muted" style={{ maxWidth: 560, fontSize: 13 }}>
          {tr({
            en: 'A technology adventure by CS STUDIO. Explore computers, electronics, circuits and repair — in your own language.',
            gu: 'CS STUDIO તરફથી ટેકનોલોજી સફર. કમ્પ્યુટર, ઇલેક્ટ્રોનિક્સ, સર્કિટ અને રિપેરિંગ — તમારી પોતાની ભાષામાં શીખો.',
            hi: 'CS STUDIO की ओर से एक टेक्नोलॉजी यात्रा। कंप्यूटर, इलेक्ट्रॉनिक्स, सर्किट और रिपेयरिंग — अपनी भाषा में सीखें।',
          })}
        </p>
        <h2 style={{ fontSize: 19, marginTop: 4 }}>{t('chooseLanguage')}</h2>
        <div className="lang-grid">
          {LANGS.map((l) => (
            <button
              key={l.id}
              type="button"
              className="lang-card"
              onMouseEnter={() => {
                setHover(l.id);
                sfx.hover();
              }}
              onMouseLeave={() => setHover(null)}
              onClick={() => choose(l.id)}
              style={hover === l.id || lang === l.id ? { borderColor: 'var(--cyan)' } : undefined}
            >
              <span className="flag">{l.flag}</span>
              <span className="native" lang={l.id}>
                {l.native}
              </span>
              <span className="latin">{l.label}</span>
            </button>
          ))}
        </div>
        <Btn variant="primary" size="lg" onClick={() => choose(lang)} icon="🚀">
          {t('startJourney')}
        </Btn>
        <p className="tiny">{t('chooseLanguageHint')}</p>
        <p className="footer-note">{t('brand')} • v1.0.0</p>
      </div>
    </div>
  );
}
