import { useState } from 'react';
import { useGame } from '../state/game';
import { Btn, Card, TopBar } from '../components/UI';
import type { Go } from '../navigation';

const CONTACT_KEY = 'techquest:contact:v1';

interface Contact {
  email: string;
  phone: string;
  website: string;
}

function loadContact(): Contact {
  try {
    const raw = localStorage.getItem(CONTACT_KEY);
    if (raw) return { ...{ email: '', phone: '', website: '' }, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return { email: '', phone: '', website: '' };
}

export default function About({ go }: { go: Go }) {
  const { t, tr, lang } = useGame();
  const [contact, setContact] = useState<Contact>(loadContact);
  const [editing, setEditing] = useState(false);

  const save = (next: Contact) => {
    setContact(next);
    try {
      localStorage.setItem(CONTACT_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <TopBar title={t('about')} subtitle={t('brand')} onBack={() => go('home')} />
      <div className="screen">
        <Card glow="#7c4dff">
          <div className="studio-hero">
            <div className="studio-logo">
              <span className="logo-cs">CS</span>
              <span className="logo-ring" />
            </div>
            <h1 className="studio-name">{t('brand')}</h1>
            <p className="studio-tag">{t('tagline')}</p>
            <p className="tiny">
              {t('appName')} • {t('version')} 1.0.0
            </p>
          </div>
        </Card>

        <Card>
          <div className="section-title">
            <h2>{tr({ en: 'Introduction', gu: 'પરિચય', hi: 'परिचय' })}</h2>
          </div>
          <p className="body-text">
            {tr({
              en: 'Welcome to CS STUDIO. CS STUDIO is the creative technology identity behind TECHQUEST WORLD. Our vision is to make technology education exciting, accessible and interactive.',
              gu: 'CS STUDIO માં આપનું સ્વાગત છે. CS STUDIO એ TECHQUEST WORLD પાછળની સર્જનાત્મક ટેકનોલોજી ઓળખ છે. અમારો ધ્યેય ટેકનોલોજી શિક્ષણને રોમાંચક, સુલભ અને પરસ્પર ક્રિયાત્મક બનાવવાનો છે.',
              hi: 'CS STUDIO में आपका स्वागत है। CS STUDIO, TECHQUEST WORLD के पीछे की रचनात्मक टेक्नोलॉजी पहचान है। हमारा लक्ष्य तकनीकी शिक्षा को रोमांचक, सुलभ और इंटरैक्टिव बनाना है।',
            })}
          </p>
          <p className="body-text">
            {tr({
              en: 'We believe that learning should be more than reading books. Students and beginners should be able to explore, experiment, build, understand and solve problems.',
              gu: 'અમે માનીએ છીએ કે શીખવું એ ફક્ત પુસ્તકો વાંચવાથી વધુ હોવું જોઈએ. વિદ્યાર્થીઓ અને નવા શીખનારા શોધી શકે, પ્રયોગ કરી શકે, બનાવી શકે, સમજી શકે અને સમસ્યા હલ કરી શકે.',
              hi: 'हम मानते हैं कि सीखना सिर्फ़ किताबें पढ़ने से अधिक होना चाहिए। विद्यार्थी और शुरुआती लोग खोज सकें, प्रयोग कर सकें, बना सकें, समझ सकें और समस्या हल कर सकें।',
            })}
          </p>
        </Card>

        <Card>
          <div className="section-title">
            <h2>{tr({ en: 'Vision', gu: 'દૃષ્ટિ', hi: 'दृष्टि' })}</h2>
          </div>
          <p className="body-text">
            {tr({
              en: 'Through TECHQUEST WORLD, we aim to transform technical education into an interactive gaming experience where every learner becomes a Technology Master.',
              gu: 'TECHQUEST WORLD દ્વારા અમે ટેકનિકલ શિક્ષણને પરસ્પર ક્રિયાત્મક ગેમિંગ અનુભવમાં બદલવાનો લક્ષ્ય રાખીએ છીએ, જ્યાં દરેક શીખનાર ટેકનોલોજી માસ્ટર બને.',
              hi: 'TECHQUEST WORLD के ज़रिए हम तकनीकी शिक्षा को इंटरैक्टिव गेमिंग अनुभव में बदलना चाहते हैं, जहाँ हर सीखने वाला टेक्नोलॉजी मास्टर बने।',
            })}
          </p>
          <div className="section-title" style={{ marginTop: 16 }}>
            <h2>{t('missionText')}</h2>
          </div>
          <p className="body-text">
            {tr({
              en: 'Our mission is to make computer hardware, electronics, repairing and modern technology easier to understand through virtual exploration and educational gaming.',
              gu: 'અમારું મિશન વર્ચ્યુઅલ એક્સપ્લોરેશન અને શૈક્ષણિક ગેમિંગ દ્વારા કમ્પ્યુટર હાર્ડવેર, ઇલેક્ટ્રોનિક્સ, રિપેરિંગ અને આધુનિક ટેકનોલોજીને સમજવા સરળ બનાવવાનું છે.',
              hi: 'हमारा मिशन वर्चुअल अन्वेषण और शैक्षिक गेमिंग के ज़रिए कंप्यूटर हार्डवेयर, इलेक्ट्रॉनिक्स, रिपेयरिंग और आधुनिक टेक्नोलॉजी को समझना आसान बनाना है।',
            })}
          </p>
        </Card>

        <Card>
          <div className="section-title">
            <h2>{t('credits')}</h2>
            <span className="sub">{t('brand')}</span>
          </div>
          <div className="credit-list">
            <div className="credit-row">
              <span>{tr({ en: 'Concept & Design', gu: 'કલ્પના અને ડિઝાઇન', hi: 'कल्पना और डिज़ाइन' })}</span>
              <b>CS STUDIO</b>
            </div>
            <div className="credit-row">
              <span>{tr({ en: '3D World & Simulations', gu: '3D વર્લ્ડ અને સિમ્યુલેશન', hi: '3D वर्ल्ड और सिमुलेशन' })}</span>
              <b>CS STUDIO</b>
            </div>
            <div className="credit-row">
              <span>{tr({ en: 'Educational Content', gu: 'શૈક્ષણિક સામગ્રી', hi: 'शैक्षिक सामग्री' })}</span>
              <b>CS STUDIO</b>
            </div>
            <div className="credit-row">
              <span>{tr({ en: 'Languages', gu: 'ભાષાઓ', hi: 'भाषाएँ' })}</span>
              <b>ગુજરાતી • हिन्दी • English</b>
            </div>
          </div>
        </Card>

        <Card>
          <div className="section-title">
            <h2>{t('contact')}</h2>
            <span className="sub">{editing ? tr({ en: 'Editable placeholders', gu: 'સંપાદનયોગ્ય પ્લેસહોલ્ડર', hi: 'संपादन योग्य प्लेसहोल्डर' }) : ''}</span>
          </div>
          {editing ? (
            <div className="contact-form">
              <label className="field">
                <input
                  placeholder={`${tr({ en: 'Email', gu: 'ઇમેઇલ', hi: 'ईमेल' })}`}
                  value={contact.email}
                  onChange={(e) => save({ ...contact, email: e.target.value })}
                />
              </label>
              <label className="field">
                <input
                  placeholder={`${tr({ en: 'Phone', gu: 'ફોન', hi: 'फ़ोन' })}`}
                  value={contact.phone}
                  onChange={(e) => save({ ...contact, phone: e.target.value })}
                />
              </label>
              <label className="field">
                <input
                  placeholder={`${tr({ en: 'Website', gu: 'વેબસાઇટ', hi: 'वेबसाइट' })}`}
                  value={contact.website}
                  onChange={(e) => save({ ...contact, website: e.target.value })}
                />
              </label>
            </div>
          ) : (
            <div className="contact-list">
              <div className="contact-row">✉️ {contact.email || t('contactPlaceholder')}</div>
              <div className="contact-row">📞 {contact.phone || t('contactPlaceholder')}</div>
              <div className="contact-row">🌐 {contact.website || t('contactPlaceholder')}</div>
            </div>
          )}
          <div className="hero-actions" style={{ marginTop: 12 }}>
            <Btn variant="soft" icon={editing ? '✅' : '✏️'} onClick={() => setEditing((v) => !v)}>
              {editing ? t('save') : t('editProfile')}
            </Btn>
          </div>
        </Card>

        <Card glow="#25e0f0">
          <div className="studio-footer">
            <p className="studio-tag">{t('tagline')}</p>
            <p className="body-text">
              {tr({
                en: 'Explore More. Learn More. Build Your Future.',
                gu: 'વધુ શોધો. વધુ શીખો. તમારું ભવિષ્ય બનાવો.',
                hi: 'और खोजें। और सीखें। अपना भविष्य बनाएँ।',
              })}
            </p>
            <p className="tiny">
              {t('appName')} — {tr({ en: 'A Technology Adventure by CS STUDIO', gu: 'CS STUDIO દ્વારા ટેકનોલોજી સાહસ', hi: 'CS STUDIO द्वारा टेक्नोलॉजी रोमांच' })}
            </p>
            <p className="tiny" style={{ opacity: 0.7 }}>
              {tr({
                en: 'All labs are safe virtual simulations. Never open a real power supply or work with live electricity.',
                gu: 'બધી લેબ સુરક્ષિત વર્ચ્યુઅલ સિમ્યુલેશન છે. ક્યારેય સાચો પાવર સપ્લાય ખોલશો નહીં અથવા જીવંત વીજળી સાથે કામ કરશો નહીં.',
                hi: 'सभी लैब सुरक्षित वर्चुअल सिमुलेशन हैं। कभी भी असली पावर सप्लाई न खोलें या जीवित बिजली के साथ काम न करें।',
              })}
            </p>
            <span className="tiny" style={{ opacity: 0.6 }}>
              {lang === 'en' ? 'Made for learners everywhere' : lang === 'gu' ? 'દરેક શીખનાર માટે' : 'हर सीखने वाले के लिए'}
            </span>
          </div>
        </Card>
      </div>
    </>
  );
}
