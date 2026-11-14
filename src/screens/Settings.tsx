import { useState } from 'react';
import { useGame, AVATARS } from '../state/game';
import { Btn, Card, TopBar } from '../components/UI';
import type { Go } from '../navigation';
import type { Lang } from '../content/types';
import { setMusicEnabled, sfx, stopSpeaking } from '../lib/audio';

const LANGS: { id: Lang; label: string; sub: string }[] = [
  { id: 'gu', label: 'ગુજરાતી', sub: 'Gujarati' },
  { id: 'hi', label: 'हिन्दी', sub: 'Hindi' },
  { id: 'en', label: 'English', sub: 'English' },
];

export default function Settings({ go }: { go: Go }) {
  const { t, tr, lang, p, setLang, patch, reset, pushToast } = useGame();
  const [name, setName] = useState(p.name);
  const s = p.settings;

  const toggle = (key: 'music' | 'sfx' | 'voice') => {
    const next = !s[key];
    patch({ settings: { ...s, [key]: next } });
    if (key === 'music') setMusicEnabled(next);
    if (key === 'sfx' && next) sfx.click();
    if (key === 'voice' && !next) stopSpeaking();
  };

  return (
    <>
      <TopBar title={t('settings')} subtitle={t('language')} onBack={() => go('home')} />
      <div className="screen">
        <Card>
          <div className="section-title">
            <h2>{t('language')}</h2>
            <span className="sub">{tr({ en: 'Progress is kept', gu: 'પ્રગતિ સચવાય છે', hi: 'प्रगति सुरक्षित रहती है' })}</span>
          </div>
          <div className="lang-row">
            {LANGS.map((l) => (
              <button
                key={l.id}
                type="button"
                className={`lang-mini ${lang === l.id ? 'on' : ''}`}
                onClick={() => {
                  setLang(l.id);
                  sfx.click();
                }}
              >
                <span className="lang-label">{l.label}</span>
                <span className="lang-sub">{l.sub}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div className="section-title">
            <h2>{t('editProfile')}</h2>
            <span className="sub">{t('playerName')}</span>
          </div>
          <label className="field">
            <input
              value={name}
              maxLength={18}
              placeholder={t('playerName')}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <p className="tiny" style={{ marginTop: 10 }}>
            {t('chooseAvatar')}
          </p>
          <div className="avatar-row">
            {AVATARS.map((a) => (
              <button
                key={a}
                type="button"
                className={`avatar-pick ${p.avatar === a ? 'on' : ''}`}
                onClick={() => {
                  patch({ avatar: a });
                  sfx.click();
                }}
              >
                {a}
              </button>
            ))}
          </div>
          <div className="hero-actions" style={{ marginTop: 12 }}>
            <Btn
              variant="primary"
              icon="💾"
              onClick={() => {
                patch({ name: name.trim() || t('guest') });
                sfx.correct();
                pushToast(t('saved'), '💾', 'good');
              }}
            >
              {t('save')}
            </Btn>
          </div>
        </Card>

        <Card>
          <div className="section-title">
            <h2>{tr({ en: 'Sound & Graphics', gu: 'ધ્વનિ અને ગ્રાફિક્સ', hi: 'ध्वनि और ग्राफ़िक्स' })}</h2>
          </div>
          <div className="switch-list">
            {(
              [
                ['music', t('music'), '🎵'],
                ['sfx', t('sfx'), '🔊'],
                ['voice', t('voice'), '🗣️'],
              ] as const
            ).map(([key, label, icon]) => (
              <div key={key} className="switch-row">
                <span>
                  {icon} {label}
                </span>
                <button
                  type="button"
                  className={`switch ${s[key] ? 'on' : ''}`}
                  aria-pressed={s[key]}
                  onClick={() => toggle(key)}
                >
                  <span className="knob" />
                  <span className="switch-txt">{s[key] ? t('on') : t('off')}</span>
                </button>
              </div>
            ))}
            <div className="switch-row">
              <span>🖼️ {t('graphics')}</span>
              <div className="pill-row" style={{ margin: 0 }}>
                <button
                  type="button"
                  className={`pill ${s.quality === 'high' ? 'on' : ''}`}
                  onClick={() => {
                    patch({ settings: { ...s, quality: 'high' } });
                    sfx.click();
                  }}
                >
                  {t('high')}
                </button>
                <button
                  type="button"
                  className={`pill ${s.quality === 'low' ? 'on' : ''}`}
                  onClick={() => {
                    patch({ settings: { ...s, quality: 'low' } });
                    sfx.click();
                  }}
                >
                  {t('low')}
                </button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="section-title">
            <h2>{tr({ en: 'Data & Info', gu: 'ડેટા અને માહિતી', hi: 'डेटा और जानकारी' })}</h2>
            <span className="sub">
              {t('version')} 1.0.0
            </span>
          </div>
          <div className="hero-actions">
            <Btn variant="soft" icon="ℹ️" onClick={() => go('about')}>
              {t('about')}
            </Btn>
            <Btn
              variant="danger"
              icon="⚠️"
              onClick={() => {
                if (window.confirm(t('resetConfirm'))) {
                  reset();
                  pushToast(t('resetDone'), '♻️', 'info');
                  go('language');
                }
              }}
            >
              {t('resetProgress')}
            </Btn>
          </div>
        </Card>
      </div>
    </>
  );
}
