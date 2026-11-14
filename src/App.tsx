import { useCallback, useEffect, useState } from 'react';
import { GameProvider, useGame } from './state/game';
import type { Go, View } from './navigation';
import { TechBotPanel, Toasts } from './components/UI';
import LanguageScreen from './screens/Language';
import Home from './screens/Home';
import MapScreen from './screens/MapScreen';
import WorldScreen from './screens/WorldScreen';
import LessonScreen from './screens/LessonScreen';
import LearningCenter from './screens/LearningCenter';
import VirtualLab from './screens/VirtualLab';
import MiniGames from './screens/MiniGames';
import Daily from './screens/Daily';
import ProgressScreen from './screens/ProgressScreen';
import Achievements from './screens/Achievements';
import Settings from './screens/Settings';
import About from './screens/About';
import { sfx, speak } from './lib/audio';

function Shell() {
  const { p, t, tr, lang } = useGame();
  const [view, setView] = useState<View>('home');
  const [arg, setArg] = useState<string | undefined>(undefined);
  const [botOpen, setBotOpen] = useState(false);

  const go = useCallback<Go>((next, nextArg) => {
    setView(next);
    setArg(nextArg);
    setBotOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const tips: Record<View, string> = {
    language: t('chooseLanguageHint'),
    home: t('techbotWelcome'),
    map: tr({
      en: 'Tap a glowing island to enter a world. Worlds unlock as your level rises.',
      gu: 'વર્લ્ડમાં જવા માટે ચમકતા ટાપુ પર ટેપ કરો. લેવલ વધે તેમ વર્લ્ડ ખૂલે છે.',
      hi: 'वर्ल्ड में जाने के लिए चमकते द्वीप पर टैप करें। लेवल बढ़ने पर वर्ल्ड खुलते हैं।',
    }),
    world: tr({
      en: 'Each lesson has 8 steps: explore, identify, learn, watch, practice, challenge, test and reward.',
      gu: 'દરેક પાઠમાં 8 પગલાં છે: શોધો, ઓળખો, શીખો, જુઓ, અભ્યાસ, ચેલેન્જ, ટેસ્ટ અને ઇનામ.',
      hi: 'हर पाठ में 8 चरण हैं: खोजें, पहचानें, सीखें, देखें, अभ्यास, चुनौती, टेस्ट और इनाम।',
    }),
    lesson: tr({
      en: 'Rotate the 3D model with your finger or mouse to see every side.',
      gu: 'દરેક બાજુ જોવા માટે 3D મોડેલને આંગળી કે માઉસથી ફેરવો.',
      hi: 'हर तरफ़ देखने के लिए 3D मॉडल को उँगली या माउस से घुमाएँ।',
    }),
    learning: tr({
      en: 'Search any technology term in three languages and bookmark it for later.',
      gu: 'કોઈ પણ ટેકનોલોજી શબ્દ ત્રણ ભાષામાં શોધો અને પછી માટે બુકમાર્ક કરો.',
      hi: 'कोई भी टेक्नोलॉजी शब्द तीन भाषाओं में खोजें और बाद के लिए बुकमार्क करें।',
    }),
    lab: t('safeLabNote'),
    games: tr({
      en: 'Higher difficulty means less time but more XP. Try to beat your best score.',
      gu: 'વધુ મુશ્કેલી એટલે ઓછો સમય પણ વધુ XP. તમારો શ્રેષ્ઠ સ્કોર તોડવાનો પ્રયાસ કરો.',
      hi: 'अधिक कठिनाई का मतलब कम समय पर अधिक XP। अपना सर्वोत्तम स्कोर तोड़ने की कोशिश करें।',
    }),
    daily: tr({
      en: 'Finish at least one daily task to claim your bonus reward today.',
      gu: 'આજનું બોનસ ઇનામ લેવા ઓછામાં ઓછું એક દૈનિક કાર્ય પૂર્ણ કરો.',
      hi: 'आज का बोनस इनाम पाने के लिए कम से कम एक दैनिक कार्य पूरा करें।',
    }),
    progress: tr({
      en: 'Your certificate unlocks at 60% overall progress. Keep learning!',
      gu: '60% કુલ પ્રગતિ પર તમારું પ્રમાણપત્ર ખૂલે છે. શીખતા રહો!',
      hi: '60% कुल प्रगति पर आपका प्रमाणपत्र खुलता है। सीखते रहें!',
    }),
    achievements: tr({
      en: 'Badges are earned from real learning progress, not random taps.',
      gu: 'બેજ ખરેખરી શિક્ષણ પ્રગતિથી મળે છે, રેન્ડમ ટેપથી નહીં.',
      hi: 'बैज असली सीखने की प्रगति से मिलते हैं, यादृच्छिक टैप से नहीं।',
    }),
    settings: tr({
      en: 'Changing language keeps all your XP, coins and progress.',
      gu: 'ભાષા બદલવાથી તમારા XP, કોઈન અને પ્રગતિ જળવાઈ રહે છે.',
      hi: 'भाषा बदलने से आपके XP, सिक्के और प्रगति सुरक्षित रहते हैं।',
    }),
    about: tr({
      en: 'TECHQUEST WORLD is an educational universe by CS STUDIO.',
      gu: 'TECHQUEST WORLD એ CS STUDIO નું શૈક્ષણિક વિશ્વ છે.',
      hi: 'TECHQUEST WORLD, CS STUDIO का शैक्षिक ब्रह्मांड है।',
    }),
  };

  if (!p.onboarded) {
    return (
      <div className="app-shell">
        <LanguageScreen onDone={() => go('home')} />
        <Toasts />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <main key={view} className="view-wrap">
        {view === 'home' ? <Home go={go} /> : null}
        {view === 'map' ? <MapScreen go={go} /> : null}
        {view === 'world' ? <WorldScreen worldId={arg ?? 'computer-city'} go={go} /> : null}
        {view === 'lesson' ? <LessonScreen lessonId={arg ?? 'what-is-computer'} go={go} /> : null}
        {view === 'learning' ? <LearningCenter go={go} /> : null}
        {view === 'lab' ? <VirtualLab lab={arg} go={go} /> : null}
        {view === 'games' ? <MiniGames go={go} /> : null}
        {view === 'daily' ? <Daily go={go} /> : null}
        {view === 'progress' ? <ProgressScreen go={go} /> : null}
        {view === 'achievements' ? <Achievements go={go} /> : null}
        {view === 'settings' ? <Settings go={go} /> : null}
        {view === 'about' ? <About go={go} /> : null}
        {view === 'language' ? <LanguageScreen onDone={() => go('home')} /> : null}
      </main>

      {botOpen ? (
        <div className="bot-dock">
          <div className="bot-dock-head">
            <b>TECHBOT</b>
            <button type="button" className="bot-close" onClick={() => setBotOpen(false)} aria-label={t('close')}>
              ✕
            </button>
          </div>
          <TechBotPanel
            text={tips[view]}
            mood="happy"
            showAvatar
            compact
            onSpeak={() => speak(tips[view], lang)}
          />
          <div className="bot-dock-actions">
            <button type="button" className="bot-quick" onClick={() => go('learning')}>
              📚 {t('learningCenter')}
            </button>
            <button type="button" className="bot-quick" onClick={() => go('map')}>
              🗺️ {t('exploreWorlds')}
            </button>
            <button type="button" className="bot-quick" onClick={() => go('lab')}>
              🧪 {t('virtualLab')}
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        className={`bot-fab ${botOpen ? 'on' : ''}`}
        aria-label="TECHBOT"
        onClick={() => {
          sfx.click();
          setBotOpen((v) => !v);
        }}
      >
        <span className="bot-fab-ico">🤖</span>
        <span className="bot-fab-txt">TECHBOT</span>
      </button>

      <Toasts />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Shell />
    </GameProvider>
  );
}
