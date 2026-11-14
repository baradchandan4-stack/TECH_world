import type { Lesson, ModelKind, Quiz, Tri } from './types';

const t3 = (en: string, gu: string, hi: string): Tri => ({ en, gu, hi });
const qz = (q: [string, string, string], options: [string, string, string][], correct: number): Quiz => ({
  q: t3(...q),
  options: options.map((o) => t3(...o)),
  correct,
});
const L = (
  id: string,
  name: string,
  model: ModelKind,
  emoji: string,
  d: [string, string, string],
  f: [string, string, string],
  p: [string, string, string],
  u: [string, string, string],
  e: [string, string, string],
  quiz: Quiz,
): Lesson => ({
  id,
  name,
  model,
  emoji,
  def: t3(...d),
  func: t3(...f),
  principle: t3(...p),
  uses: t3(...u),
  examples: t3(...e),
  quiz,
});

export const ELECTRONICS_LESSONS: Lesson[] = [
  L(
    'resistor',
    'Resistor',
    'resistor',
    '🟫',
    [
      'A resistor is a component that limits the flow of electric current.',
      'રેઝિસ્ટર એ ઘટક છે જે વિદ્યુત પ્રવાહને મર્યાદિત કરે છે.',
      'रेज़िस्टर एक घटक है जो विद्युत धारा को सीमित करता है।',
    ],
    [
      'It controls current and creates a voltage drop in a circuit.',
      'તે સર્કિટમાં કરંટ નિયંત્રિત કરે છે અને વોલ્ટેજ ડ્રોપ બનાવે છે.',
      'यह सर्किट में करंट नियंत्रित करता और वोल्टेज ड्रॉप बनाता है।',
    ],
    [
      'Its resistance R = V / I in ohms. Colour bands on the body show the value.',
      'તેનો રેઝિસ્ટન્સ R = V / I ઓહ્મમાં. શરીર પરના રંગ પટ્ટા મૂલ્ય બતાવે છે.',
      'इसका प्रतिरोध R = V / I ओम में। शरीर पर के रंग बैंड मान दिखाते हैं।',
    ],
    [
      'Used to protect LEDs, divide voltage and set transistor bias.',
      'LED ને રક્ષણ, વોલ્ટેજ ડિવાઇડ અને ટ્રાન્ઝિસ્ટર બાયસ માટે વપરાય છે.',
      'LED की सुरक्षा, वोल्टेज डिवाइडर और ट्रांजिस्टर बायस के लिए उपयोग होता है।',
    ],
    [
      '220 Ω resistor in series with an LED; 10 kΩ pull-up resistor.',
      'LED સાથે શ્રેણીમાં 220 Ω રેઝિસ્ટર; 10 kΩ પુલ-અપ રેઝિસ્ટર.',
      'LED के साथ श्रेणी में 220 Ω रेज़िस्टर; 10 kΩ पुल-अप रेज़िस्टर।',
    ],
    qz(
      ['What is the unit of resistance?', 'રેઝિસ્ટન્સનું એકમ શું છે?', 'रेज़िस्टेंस की इकाई क्या है?'],
      [
        ['Ohm (Ω)', 'ઓહ્મ (Ω)', 'ओम (Ω)'],
        ['Volt (V)', 'વોલ્ટ (V)', 'वोल्ट (V)'],
        ['Ampere (A)', 'એમ્પિયર (A)', 'एम्पियर (A)'],
      ],
      0,
    ),
  ),
  L(
    'capacitor',
    'Capacitor',
    'capacitor',
    '🔵',
    [
      'A capacitor stores electrical energy in an electric field between two plates.',
      'કેપેસિટર બે પ્લેટ વચ્ચેના ઇલેક્ટ્રિક ફીલ્ડમાં વિદ્યુત ઊર્જા સંગ્રહે છે.',
      'कैपेसिटर दो प्लेटों के बीच विद्युत क्षेत्र में ऊर्जा संग्रहीत करता है।',
    ],
    [
      'It stores and releases charge, filters noise and smooths supply voltage.',
      'તે ચાર્જ સંગ્રહે-છોડે, નોઇઝ ફિલ્ટર કરે અને પાવર સ્મૂથ કરે છે.',
      'यह चार्ज संग्रहीत-छोड़ता, शोर फ़िल्टर करता और पावर स्मूद करता है।',
    ],
    [
      'Charge Q = C × V. It blocks DC and passes changing (AC) signals.',
      'ચાર્જ Q = C × V. તે DC રોકે છે અને બદલાતા (AC) સિગ્નલ પસાર કરે છે.',
      'चार्ज Q = C × V। यह DC रोकता और बदलते (AC) सिग्नल पास करता है।',
    ],
    [
      'Used in power filters, audio circuits, touchscreens and timing circuits.',
      'પાવર ફિલ્ટર, ઓડિયો સર્કિટ, ટચસ્ક્રીન અને ટાઇમિંગ સર્કિટમાં વપરાય છે.',
      'पावर फ़िल्टर, ऑडियो सर्किट, टचस्क्रीन और टाइमिंग सर्किट में उपयोग होता है।',
    ],
    [
      '1000 µF electrolytic filter capacitor on a power board.',
      'પાવર બોર્ડ પર 1000 µF ઇલેક્ટ્રોલિટિક ફિલ્ટર કેપેસિટર.',
      'पावर बोर्ड पर 1000 µF इलेक्ट्रोलिटिक फ़िल्टर कैपेसिटर।',
    ],
    qz(
      ['A capacitor stores energy in a…', 'કેપેસિટર ઊર્જા ક્યાં સંગ્રહે છે?', 'कैपेसिटर ऊर्जा कहाँ संग्रहीत करता है?'],
      [
        ['Electric field', 'ઇલેક્ટ્રિક ફીલ્ડ', 'विद्युत क्षेत्र'],
        ['Magnetic field', 'ચુંબકીય ફીલ્ડ', 'चुंबकीय क्षेत्र'],
        ['Water tank', 'પાણીની ટાંકી', 'पानी की टंकी'],
      ],
      0,
    ),
  ),
  L(
    'diode',
    'Diode',
    'diode',
    '🔺',
    [
      'A diode is a semiconductor component that lets current flow in only one direction.',
      'ડાયોડ એ સેમિકન્ડક્ટર ઘટક છે જે કરંટને ફક્ત એક દિશામાં જ વહેવા દે છે.',
      'डायोड सेमीकंडक्टर घटक है जो करंट को केवल एक दिशा में बहने देता है।',
    ],
    [
      'It converts AC to DC in rectifiers and protects circuits from reverse polarity.',
      'તે રેક્ટિફાયરમાં AC ને DC બનાવે અને ઉલટી પોલેરિટીથી સર્કિટ બચાવે છે.',
      'यह रेक्टिफायर में AC को DC बनाता और उलटी पोलरिटी से सर्किट बचाता है।',
    ],
    [
      'A PN junction conducts when forward biased (about 0.7 V for silicon) and blocks in reverse.',
      'PN જંક્શન ફોરવર્ડ બાયસમાં વહે છે (સિલિકોન માટે લગભગ 0.7 V) અને રિવર્સમાં રોકે છે.',
      'PN जंक्शन फ़ॉरवर्ड बायस में चलता (सिलिकॉन के लिए लगभग 0.7 V) और रिवर्स में रोकता है।',
    ],
    [
      'Used in chargers, adapters, solar panels and protection circuits.',
      'ચાર્જર, એડેપ્ટર, સોલાર પેનલ અને પ્રોટેક્શન સર્કિટમાં વપરાય છે.',
      'चार्जर, अडैप्टर, सोलर पैनल और प्रोटेक्शन सर्किट में उपयोग होता है।',
    ],
    [
      '1N4007 rectifier diode in a phone charger.',
      'ફોન ચાર્જરમાં 1N4007 રેક્ટિફાયર ડાયોડ.',
      'फ़ोन चार्जर में 1N4007 रेक्टिफायर डायोड।',
    ],
    qz(
      ['A diode allows current in…', 'ડાયોડ કરંટને કેટલી દિશામાં વહેવા દે છે?', 'डायोड करंट को कितनी दिशा में बहने देता है?'],
      [
        ['One direction only', 'ફક્ત એક દિશામાં', 'केवल एक दिशा में'],
        ['Both directions', 'બંને દિશામાં', 'दोनों दिशाओं में'],
        ['No direction', 'કોઈ દિશામાં નહીં', 'किसी दिशा में नहीं'],
      ],
      0,
    ),
  ),
  L(
    'led',
    'LED',
    'led',
    '💡',
    [
      'An LED (Light Emitting Diode) is a diode that gives light when current flows through it.',
      'LED (Light Emitting Diode) એ ડાયોડ છે જેમાંથી કરંટ વહે ત્યારે પ્રકાશ આપે છે.',
      'LED (Light Emitting Diode) वह डायोड है जो करंट बहने पर प्रकाश देता है।',
    ],
    [
      'It converts electrical energy directly into light with very little heat.',
      'તે વિદ્યુત ઊર્જાને સીધી પ્રકાશમાં ફેરવે છે, ખૂબ ઓછી ગરમી સાથે.',
      'यह बिजली की ऊर्जा को सीधे प्रकाश में बदलता है, बहुत कम गर्मी के साथ।',
    ],
    [
      'Electrons recombine with holes at the junction and release photons; colour depends on the material.',
      'ઇલેક્ટ્રોન છિદ્ર સાથે જોડાઈને ફોટોન છોડે છે; રંગ સામગ્રી પર આધારિત છે.',
      'इलेक्ट्रॉन होल से मिलकर फ़ोटॉन छोड़ते हैं; रंग सामग्री पर निर्भर करता है।',
    ],
    [
      'Used in lamps, displays, indicators, phone flash and traffic lights.',
      'લેમ્પ, ડિસ્પ્લે, ઇન્ડિકેટર, ફોન ફ્લેશ અને ટ્રાફિક લાઇટમાં વપરાય છે.',
      'लैंप, डिस्प्ले, इंडिकेटर, फ़ोन फ़्लैश और ट्रैफ़िक लाइट में उपयोग होता है।',
    ],
    [
      'A 5 mm red LED with a 220 Ω series resistor.',
      '220 Ω શ્રેણી રેઝિસ્ટર સાથે 5 mm લાલ LED.',
      '220 Ω श्रेणी रेज़िस्टर के साथ 5 mm लाल LED।',
    ],
    qz(
      ['Why does an LED need a series resistor?', 'LED સાથે શ્રેણી રેઝિસ્ટર કેમ જોઈએ?', 'LED के साथ श्रेणी रेज़िस्टर क्यों चाहिए?'],
      [
        ['To limit current and protect it', 'કરંટ મર્યાદિત કરીને બચાવવા', 'करंट सीमित कर उसे बचाने के लिए'],
        ['To make it heavier', 'તેને ભારે બનાવવા', 'उसे भारी बनाने के लिए'],
        ['To change its colour', 'તેનો રંગ બદલવા', 'उसका रंग बदलने के लिए'],
      ],
      0,
    ),
  ),
  L(
    'transistor',
    'Transistor',
    'transistor',
    '🔲',
    [
      'A transistor is a semiconductor switch and amplifier with three terminals: base, collector and emitter.',
      'ટ્રાન્ઝિસ્ટર એ ત્રણ ટર્મિનલ (બેઝ, કલેક્ટર, એમિટર) વાળો સેમિકન્ડક્ટર સ્વિચ અને એમ્પ્લિફાયર છે.',
      'ट्रांजिस्टर तीन टर्मिनल (बेस, कलेक्टर, एमिटर) वाला सेमीकंडक्टर स्विच और एम्प्लिफ़ायर है।',
    ],
    [
      'A small base current controls a much larger collector current.',
      'નાનો બેઝ કરંટ ઘણો મોટો કલેક્ટર કરંટ નિયંત્રિત કરે છે.',
      'छोटा बेस करंट बहुत बड़ा कलेक्टर करंट नियंत्रित करता है।',
    ],
    [
      'It works in cutoff, active and saturation regions; in saturation it acts like a closed switch.',
      'તે કટઓફ, એક્ટિવ અને સેચ્યુરેશન ક્ષેત્રમાં કામ કરે; સેચ્યુરેશનમાં બંધ સ્વિચ જેવું.',
      'यह कटऑफ़, एक्टिव और सैचुरेशन क्षेत्र में काम करता; सैचुरेशन में बंद स्विच जैसा।',
    ],
    [
      'Used in amplifiers, logic gates, motor drivers and power control.',
      'એમ્પ્લિફાયર, લોજિક ગેટ, મોટર ડ્રાઇવર અને પાવર કંટ્રોલમાં વપરાય છે.',
      'एम्प्लिफ़ायर, लॉजिक गेट, मोटर ड्राइवर और पावर कंट्रोल में उपयोग होता है।',
    ],
    [
      'BC547 used to switch a relay, 2N2222 in driver circuits.',
      'રિલે સ્વિચ કરવા BC547, ડ્રાઇવર સર્કિટમાં 2N2222.',
      'रिले स्विच करने के लिए BC547, ड्राइवर सर्किट में 2N2222।',
    ],
    qz(
      ['A transistor can work as a…', 'ટ્રાન્ઝિસ્ટર કેવી રીતે કામ કરી શકે?', 'ट्रांजिस्टर कैसे काम कर सकता है?'],
      [
        ['Switch and amplifier', 'સ્વિચ અને એમ્પ્લિફાયર', 'स्विच और एम्प्लिफ़ायर'],
        ['Battery only', 'ફક્ત બેટરી', 'केवल बैटरी'],
        ['Speaker only', 'ફક્ત સ્પીકર', 'केवल स्पीकर'],
      ],
      0,
    ),
  ),
  L(
    'inductor',
    'Inductor',
    'inductor',
    '🌀',
    [
      'An inductor is a coil of wire that stores energy in a magnetic field.',
      'ઇન્ડક્ટર એ વાયરનો કોઇલ છે જે ચુંબકીય ફીલ્ડમાં ઊર્જા સંગ્રહે છે.',
      'इंडक्टर तार की कुंडली है जो चुंबकीय क्षेत्र में ऊर्जा संग्रहीत करती है।',
    ],
    [
      'It opposes changes in current and is used to filter and transform signals.',
      'તે કરંટમાં ફેરફારનો વિરોધ કરે છે અને સિગ્નલ ફિલ્ટર તથા ટ્રાન્સફોર્મ કરવા વપરાય છે.',
      'यह करंट के बदलाव का विरोध करता और सिग्नल फ़िल्टर व ट्रांसफ़ॉर्म करने में उपयोग होता है।',
    ],
    [
      'A changing current builds a magnetic field; the coil resists sudden current changes (L di/dt).',
      'બદલાતો કરંટ ચુંબકીય ફીલ્ડ બનાવે; કોઇલ અચાનક કરંટ બદલાવનો વિરોધ કરે (L di/dt).',
      'बदलता करंट चुंबकीय क्षेत्र बनाता; कुंडली अचानक करंट बदलाव का विरोध करती है (L di/dt)।',
    ],
    [
      'Used in power supplies, filters, motors and wireless chargers.',
      'પાવર સપ્લાય, ફિલ્ટર, મોટર અને વાયરલેસ ચાર્જરમાં વપરાય છે.',
      'पावर सप्लाई, फ़िल्टर, मोटर और वायरलेस चार्जर में उपयोग होता है।',
    ],
    [
      'A ferrite-core inductor on a motherboard VRM.',
      'મધરબોર્ડ VRM પર ફેરાઇટ-કોર ઇન્ડક્ટર.',
      'मदरबोर्ड VRM पर फेराइट-कोर इंडक्टर।',
    ],
    qz(
      ['An inductor stores energy in a…', 'ઇન્ડક્ટર ઊર્જા ક્યાં સંગ્રહે છે?', 'इंडक्टर ऊर्जा कहाँ संग्रहीत करता है?'],
      [
        ['Magnetic field', 'ચુંબકીય ફીલ્ડ', 'चुंबकीय क्षेत्र'],
        ['Electric field', 'ઇલેક્ટ્રિક ફીલ્ડ', 'विद्युत क्षेत्र'],
        ['Chemical paste', 'રાસાયણિક પેસ્ટ', 'रासायनिक पेस्ट'],
      ],
      0,
    ),
  ),
  L(
    'relay',
    'Relay',
    'relay',
    '🔁',
    [
      'A relay is an electromagnetic switch that controls a high-power circuit using a small signal.',
      'રિલે એ ઇલેક્ટ્રોમેગ્નેટિક સ્વિચ છે જે નાના સિગ્નલથી મોટા પાવર સર્કિટને નિયંત્રિત કરે છે.',
      'रिले एक इलेक्ट्रोमैग्नेटिक स्विच है जो छोटे सिग्नल से बड़े पावर सर्किट को नियंत्रित करता है।',
    ],
    [
      'It isolates the control circuit from the load circuit for safety.',
      'તે સુરક્ષા માટે કંટ્રોલ સર્કિટને લોડ સર્કિટથી અલગ રાખે છે.',
      'यह सुरक्षा के लिए कंट्रोल सर्किट को लोड सर्किट से अलग रखता है।',
    ],
    [
      'Current in the coil creates a magnet that pulls an armature and closes the contacts.',
      'કોઇલમાં કરંટ ચુંબક બનાવે છે જે આર્મેચર ખેંચીને કોન્ટેક્ટ બંધ કરે છે.',
      'कुंडली में करंट चुंबक बनाता है जो आर्मेचर खींचकर कॉन्टैक्ट बंद करता है।',
    ],
    [
      'Used in home automation, motor control and protection panels.',
      'હોમ ઓટોમેશન, મોટર કંટ્રોલ અને પ્રોટેક્શન પેનલમાં વપરાય છે.',
      'होम ऑटोमेशन, मोटर कंट्रोल और प्रोटेक्शन पैनल में उपयोग होता है।',
    ],
    [
      'A 5 V relay module in a smart switch.',
      'સ્માર્ટ સ્વિચમાં 5 V રિલે મોડ્યુલ.',
      'स्मार्ट स्विच में 5 V रिले मॉड्यूल।',
    ],
    qz(
      ['A relay is controlled by…', 'રિલે કેવી રીતે નિયંત્રિત થાય છે?', 'रिले कैसे नियंत्रित होता है?'],
      [
        ['An electromagnet coil', 'ઇલેક્ટ્રોમેગ્નેટ કોઇલ', 'इलेक्ट्रोमैग्नेट कुंडली'],
        ['A water pipe', 'પાણીની પાઇપ', 'पानी की पाइप'],
        ['Sunlight', 'સૂર્યપ્રકાશ', 'सूर्यप्रकाश'],
      ],
      0,
    ),
  ),
  L(
    'fuse',
    'Fuse',
    'fuse',
    '🛑',
    [
      'A fuse is a safety component with a thin wire that melts when current is too high.',
      'ફ્યુઝ એ સુરક્ષા ઘટક છે જેમાં પાતળો વાયર હોય છે જે વધુ કરંટમાં પીગળી જાય છે.',
      'फ़्यूज़ सुरक्षा घटक है जिसमें पतला तार होता है जो ज़्यादा करंट में पिघल जाता है।',
    ],
    [
      'It breaks the circuit during a short circuit or overload, protecting devices.',
      'તે શોર્ટ સર્કિટ કે ઓવરલોડમાં સર્કિટ તોડે છે અને ઉપકરણ બચાવે છે.',
      'यह शॉर्ट सर्किट या ओवरलोड में सर्किट तोड़कर उपकरण बचाता है।',
    ],
    [
      'Excess current heats the element until it melts, permanently opening the circuit.',
      'વધારાનો કરંટ એલિમેન્ટને ગરમ કરે જ્યાં સુધી પીગળે નહીં, સર્કિટ કાયમ ખુલ્લું થાય.',
      'अतिरिक्त करंट एलिमेंट को तब तक गर्म करता जब तक पिघले नहीं, सर्किट स्थायी रूप से खुल जाए।',
    ],
    [
      'Used in plugs, adapters, multimeters and vehicle wiring.',
      'પ્લગ, એડેપ્ટર, મલ્ટિમીટર અને વાહન વાયરિંગમાં વપરાય છે.',
      'प्लग, अडैप्टर, मल्टीमीटर और वाहन वायरिंग में उपयोग होता है।',
    ],
    [
      'A 5 A fuse in a plug top; a 20 mm glass fuse in a multimeter.',
      'પ્લગ ટોપમાં 5 A ફ્યુઝ; મલ્ટિમીટરમાં 20 mm કાચનું ફ્યુઝ.',
      'प्लग टॉप में 5 A फ़्यूज़; मल्टीमीटर में 20 mm काँच का फ़्यूज़।',
    ],
    qz(
      ['A blown fuse means…', 'ફ્યુઝ ઊડી જવાનો અર્થ શું?', 'फ़्यूज़ उड़ने का अर्थ क्या है?'],
      [
        ['The circuit was broken to protect it', 'સુરક્ષા માટે સર્કિટ તૂટી', 'सुरक्षा के लिए सर्किट टूटा'],
        ['The battery is full', 'બેટરી ભરેલી છે', 'बैटरी भरी है'],
        ['The LED is brighter', 'LED વધુ તેજસ્વી છે', 'LED ज़्यादा चमकीला है'],
      ],
      0,
    ),
  ),
  L(
    'switch',
    'Switch',
    'switch',
    '🎚️',
    [
      'A switch is a mechanical component that opens or closes an electrical circuit.',
      'સ્વિચ એ યાંત્રિક ઘટક છે જે વિદ્યુત સર્કિટ ખોલે કે બંધ કરે છે.',
      'स्विच एक यांत्रिक घटक है जो विद्युत सर्किट खोलता या बंद करता है।',
    ],
    [
      'It lets the user control when current flows to a load.',
      'તે વપરાશકર્તાને લોડ સુધી કરંટ ક્યારે વહે તે નિયંત્રિત કરવા દે છે.',
      'यह उपयोगकर्ता को नियंत्रित करने देता है कि लोड तक करंट कब बहे।',
    ],
    [
      'Closing the contacts completes the path; opening them breaks it. Push buttons are momentary, toggles stay.',
      'કોન્ટેક્ટ બંધ કરવાથી માર્ગ પૂર્ણ થાય; ખોલવાથી તૂટે. પુશ બટન ક્ષણિક, ટોગલ કાયમી.',
      'कॉन्टैक्ट बंद करने से मार्ग पूरा होता; खोलने से टूटता। पुश बटन क्षणिक, टॉगल स्थायी।',
    ],
    [
      'Used in every appliance, control panel and keyboard key.',
      'દરેક ઉપકરણ, કંટ્રોલ પેનલ અને કીબોર્ડ કીમાં વપરાય છે.',
      'हर उपकरण, कंट्रोल पैनल और कीबोर्ड कुंजी में उपयोग होता है।',
    ],
    [
      'A wall light switch, a tactile push button on a PCB.',
      'દીવાલનો લાઇટ સ્વિચ, PCB પર ટેક્ટાઇલ પુશ બટન.',
      'दीवार का लाइट स्विच, PCB पर टैक्टाइल पुश बटन।',
    ],
    qz(
      ['An open switch means…', 'ખુલ્લો સ્વિચ એટલે…', 'खुला स्विच का अर्थ है…'],
      [
        ['No current flows', 'કરંટ વહેતો નથી', 'करंट नहीं बहता'],
        ['Maximum current flows', 'મહત્તમ કરંટ વહે છે', 'अधिकतम करंट बहता है'],
        ['The battery charges', 'બેટરી ચાર્જ થાય છે', 'बैटरी चार्ज होती है'],
      ],
      0,
    ),
  ),
  L(
    'battery',
    'Battery',
    'battery',
    '🔋',
    [
      'A battery is a source that stores chemical energy and supplies DC voltage.',
      'બેટરી એ સ્રોત છે જે રાસાયણિક ઊર્જા સંગ્રહીને DC વોલ્ટેજ આપે છે.',
      'बैटरी वह स्रोत है जो रासायनिक ऊर्जा संग्रहीत कर DC वोल्टेज देती है।',
    ],
    [
      'It powers circuits and devices without a mains connection.',
      'તે મેઇન્સ કનેક્શન વગર સર્કિટ અને ઉપકરણને પાવર આપે છે.',
      'यह मेन्स कनेक्शन के बिना सर्किट और उपकरण को पावर देती है।',
    ],
    [
      'Chemical reactions move electrons from the negative terminal to the positive through the external circuit.',
      'રાસાયણિક પ્રક્રિયા બાહ્ય સર્કિટ દ્વારા ઇલેક્ટ્રોનને ઋણ ટર્મિનલથી ધન તરફ ખસેડે છે.',
      'रासायनिक प्रतिक्रिया बाहरी सर्किट से इलेक्ट्रॉन को ऋण टर्मिनल से धन की ओर ले जाती है।',
    ],
    [
      'Used in remote controls, phones, toys and emergency lights.',
      'રિમોટ, ફોન, રમકડાં અને ઇમરજન્સી લાઇટમાં વપરાય છે.',
      'रिमोट, फ़ोन, खिलौने और इमरजेंसी लाइट में उपयोग होती है।',
    ],
    [
      'A 1.5 V AA cell, a 9 V battery, a 3.7 V Li-ion phone cell.',
      '1.5 V AA સેલ, 9 V બેટરી, 3.7 V લિથિયમ-આયન ફોન સેલ.',
      '1.5 V AA सेल, 9 V बैटरी, 3.7 V लिथियम-आयन फ़ोन सेल।',
    ],
    qz(
      ['A battery supplies which type of current?', 'બેટરી કયો કરંટ આપે છે?', 'बैटरी कौन सा करंट देती है?'],
      [
        ['DC (direct current)', 'DC (ડાયરેક્ટ કરંટ)', 'DC (डायरेक्ट करंट)'],
        ['AC (alternating current)', 'AC (એલ્ટરનેટિંગ કરંટ)', 'AC (अल्टरनेटिंग करंट)'],
        ['Only light', 'ફક્ત પ્રકાશ', 'केवल प्रकाश'],
      ],
      0,
    ),
  ),
  L(
    'dc-motor',
    'DC Motor',
    'motor',
    '⚙️',
    [
      'A DC motor is a machine that converts electrical energy into rotating motion.',
      'DC મોટર એ મશીન છે જે વિદ્યુત ઊર્જાને ફરતી ગતિમાં ફેરવે છે.',
      'DC मोटर वह मशीन है जो विद्युत ऊर्जा को घूमती गति में बदलती है।',
    ],
    [
      'It spins wheels, fans, pumps and robot arms.',
      'તે ચક્ર, પંખો, પંપ અને રોબોટ આર્મ ફેરવે છે.',
      'यह पहिए, पंखे, पंप और रोबोट आर्म घुमाती है।',
    ],
    [
      'Current in a coil inside a magnetic field creates force; a commutator keeps the coil turning.',
      'ચુંબકીય ફીલ્ડમાં કોઇલમાં કરંટ બળ પેદા કરે; કોમ્યુટેટર કોઇલ ફેરવતું રાખે.',
      'चुंबकीय क्षेत्र में कुंडली में करंट बल पैदा करता; कम्यूटेटर कुंडली घुमाता रहता है।',
    ],
    [
      'Used in fans, toys, drones, robots and small pumps.',
      'ફેન, રમકડાં, ડ્રોન, રોબોટ અને નાના પંપમાં વપરાય છે.',
      'पंखे, खिलौने, ड्रोन, रोबोट और छोटे पंप में उपयोग होती है।',
    ],
    [
      'A 6 V geared DC motor driving a robot wheel.',
      'રોબોટ ચક્ર ચલાવતી 6 V ગિયર્ડ DC મોટર.',
      'रोबोट पहिया चलाने वाली 6 V गियर वाली DC मोटर।',
    ],
    qz(
      ['A DC motor converts…', 'DC મોટર શું ફેરવે છે?', 'DC मोटर क्या बदलती है?'],
      [
        ['Electrical energy into motion', 'વિદ્યુત ઊર્જાને ગતિમાં', 'विद्युत ऊर्जा को गति में'],
        ['Motion into sound', 'ગતિને અવાજમાં', 'गति को ध्वनि में'],
        ['Light into current', 'પ્રકાશને કરંટમાં', 'प्रकाश को करंट में'],
      ],
      0,
    ),
  ),
  L(
    'ic',
    'Integrated Circuit',
    'ic',
    '🧱',
    [
      'An integrated circuit (IC) is a complete circuit built on a tiny silicon chip.',
      'ઇન્ટિગ્રેટેડ સર્કિટ (IC) એ નાની સિલિકોન ચિપ પર બનેલું સંપૂર્ણ સર્કિટ છે.',
      'इंटीग्रेटेड सर्किट (IC) छोटी सिलिकॉन चिप पर बना पूरा सर्किट है।',
    ],
    [
      'It performs complex functions such as computing, timing and amplification.',
      'તે ગણતરી, ટાઇમિંગ અને એમ્પ્લિફિકેશન જેવા જટિલ કાર્ય કરે છે.',
      'यह गणना, टाइमिंग और एम्प्लिफ़िकेशन जैसे जटिल कार्य करता है।',
    ],
    [
      'Millions of transistors are printed on silicon and connected by metal layers inside the package.',
      'લાખો ટ્રાન્ઝિસ્ટર સિલિકોન પર છપાય છે અને પેકેજમાં ધાતુ સ્તરથી જોડાય છે.',
      'लाखों ट्रांजिस्टर सिलिकॉन पर छपते और पैकेज में धातु परत से जुड़ते हैं।',
    ],
    [
      'Used in processors, memory, timers (555), amplifiers (LM358) and controllers.',
      'પ્રોસેસર, મેમરી, ટાઇમર (555), એમ્પ્લિફાયર (LM358) અને કંટ્રોલરમાં વપરાય છે.',
      'प्रोसेसर, मेमोरी, टाइमर (555), एम्प्लिफ़ायर (LM358) और कंट्रोलर में उपयोग होता है।',
    ],
    [
      'NE555 timer IC, LM7805 voltage regulator.',
      'NE555 ટાઇમર IC, LM7805 વોલ્ટેજ રેગ્યુલેટર.',
      'NE555 टाइमर IC, LM7805 वोल्टेज रेगुलेटर।',
    ],
    qz(
      ['An IC is made mainly of…', 'IC મુખ્યત્વે શેનું બનેલું છે?', 'IC मुख्य रूप से किसका बना है?'],
      [
        ['Silicon', 'સિલિકોન', 'सिलिकॉन'],
        ['Wood', 'લાકડું', 'लकड़ी'],
        ['Copper wire only', 'ફક્ત કોપર વાયર', 'केवल कॉपर तार'],
      ],
      0,
    ),
  ),
  L(
    'breadboard',
    'Breadboard',
    'breadboard',
    '🟨',
    [
      'A breadboard is a reusable board for building circuits without soldering.',
      'બ્રેડબોર્ડ એ સોલ્ડરિંગ વગર સર્કિટ બનાવવા માટેનું ફરી વપરાય તેવું બોર્ડ છે.',
      'ब्रेडबोर्ड सोल्डरिंग के बिना सर्किट बनाने का दोबारा उपयोग होने वाला बोर्ड है।',
    ],
    [
      'It connects component legs through internal metal clips.',
      'તે આંતરિક ધાતુ ક્લિપ દ્વારા ઘટકોના પગ જોડે છે.',
      'यह अंदरूनी धातु क्लिप से घटकों के पैर जोड़ता है।',
    ],
    [
      'Holes in the same row are connected; the two side rails carry power and ground.',
      'એક જ પંક્તિના છિદ્રો જોડાયેલા હોય છે; બે બાજુની રેલ પાવર અને ગ્રાઉન્ડ લઈ જાય છે.',
      'एक ही पंक्ति के छेद जुड़े होते; दोनों ओर की रेल पावर और ग्राउंड ले जाती है।',
    ],
    [
      'Used for learning, prototyping and testing new ideas quickly.',
      'શીખવા, પ્રોટોટાઇપિંગ અને નવા વિચાર ઝડપથી ટેસ્ટ કરવામાં વપરાય છે.',
      'सीखने, प्रोटोटाइपिंग और नए विचार जल्दी टेस्ट करने में उपयोग होता है।',
    ],
    [
      'An 830-point breadboard with two power rails.',
      'બે પાવર રેલવાળું 830-પોઇન્ટ બ્રેડબોર્ડ.',
      'दो पावर रेल वाला 830-पॉइंट ब्रेडबोर्ड।',
    ],
    qz(
      ['A breadboard is used…', 'બ્રેડબોર્ડ કેમ વપરાય છે?', 'ब्रेडबोर्ड क्यों उपयोग होता है?'],
      [
        ['To build circuits without soldering', 'સોલ્ડરિંગ વગર સર્કિટ બનાવવા', 'सोल्डरिंग के बिना सर्किट बनाने'],
        ['To cool the CPU', 'CPU ઠંડું કરવા', 'CPU ठंडा करने'],
        ['To store files', 'ફાઇલ સંગ્રહવા', 'फ़ाइल सहेजने'],
      ],
      0,
    ),
  ),
  L(
    'sensors',
    'Sensors',
    'sensor',
    '📡',
    [
      'A sensor is a component that detects a physical change and converts it into an electrical signal.',
      'સેન્સર એ ઘટક છે જે ભૌતિક ફેરફાર જણાય છે અને તેને વિદ્યુત સિગ્નલમાં ફેરવે છે.',
      'सेंसर वह घटक है जो भौतिक बदलाव पहचानकर उसे विद्युत सिग्नल में बदलता है।',
    ],
    [
      'It gives the controller information about temperature, light, motion and distance.',
      'તે કંટ્રોલરને તાપમાન, પ્રકાશ, ગતિ અને અંતરની માહિતી આપે છે.',
      'यह कंट्रोलर को तापमान, प्रकाश, गति और दूरी की जानकारी देता है।',
    ],
    [
      'Its output voltage or resistance changes with the measured quantity; an ADC converts it to digital data.',
      'તેનું આઉટપુટ વોલ્ટેજ કે રેઝિસ્ટન્સ માપેલા પ્રમાણ સાથે બદલાય; ADC તેને ડિજિટલ બનાવે.',
      'इसका आउटपुट वोल्टेज या प्रतिरोध मापी मात्रा के साथ बदलता; ADC उसे डिजिटल बनाता है।',
    ],
    [
      'Used in phones, cars, robots, home automation and safety systems.',
      'ફોન, કાર, રોબોટ, હોમ ઓટોમેશન અને સુરક્ષા સિસ્ટમમાં વપરાય છે.',
      'फ़ोन, कार, रोबोट, होम ऑटोमेशन और सुरक्षा सिस्टम में उपयोग होता है।',
    ],
    [
      'LDR for light, LM35 for temperature, HC-SR04 for distance.',
      'પ્રકાશ માટે LDR, તાપમાન માટે LM35, અંતર માટે HC-SR04.',
      'प्रकाश के लिए LDR, तापमान के लिए LM35, दूरी के लिए HC-SR04।',
    ],
    qz(
      ['A sensor converts physical changes into…', 'સેન્સર ભૌતિક ફેરફારને શેમાં ફેરવે છે?', 'सेंसर भौतिक बदलाव को किसमें बदलता है?'],
      [
        ['Electrical signals', 'વિદ્યુત સિગ્નલ', 'विद्युत सिग्नल'],
        ['Paper prints', 'કાગળ પ્રિન્ટ', 'कागज़ प्रिंट'],
        ['Mechanical sound only', 'ફક્ત યાંત્રિક અવાજ', 'केवल यांत्रिक ध्वनि'],
      ],
      0,
    ),
  ),
  L(
    'wires',
    'Wires',
    'wire',
    '🧵',
    [
      'Wires are metal conductors that carry current between components.',
      'વાયર એ ધાતુના વાહક છે જે ઘટકો વચ્ચે કરંટ લઈ જાય છે.',
      'तार धातु के चालक हैं जो घटकों के बीच करंट ले जाते हैं।',
    ],
    [
      'They connect power, ground and signals in every circuit.',
      'તે દરેક સર્કિટમાં પાવર, ગ્રાઉન્ડ અને સિગ્નલ જોડે છે.',
      'ये हर सर्किट में पावर, ग्राउंड और सिग्नल जोड़ते हैं।',
    ],
    [
      'Copper conducts because its free electrons move easily; the plastic insulation keeps current on its path.',
      'કોપર વાહક છે કારણ કે તેના મુક્ત ઇલેક્ટ્રોન સરળતાથી ખસે; પ્લાસ્ટિક આવરણ કરંટને માર્ગ પર રાખે.',
      'कॉपर चालक है क्योंकि उसके मुक्त इलेक्ट्रॉन आसानी से चलते; प्लास्टिक आवरण करंट को मार्ग पर रखता है।',
    ],
    [
      'Used in jumper wires, PCB traces and power cables.',
      'જમ્પર વાયર, PCB ટ્રેસ અને પાવર કેબલમાં વપરાય છે.',
      'जंपर तार, PCB ट्रेस और पावर केबल में उपयोग होते हैं।',
    ],
    [
      'Red for +V, black for ground, coloured jumper wires on a breadboard.',
      'લાલ +V માટે, કાળો ગ્રાઉન્ડ માટે, બ્રેડબોર્ડ પર રંગીન જમ્પર વાયર.',
      'लाल +V के लिए, काला ग्राउंड के लिए, ब्रेडबोर्ड पर रंगीन जंपर तार।',
    ],
    qz(
      ['Which colour wire is commonly used for ground?', 'ગ્રાઉન્ડ માટે સામાન્ય રીતે કયો રંગનો વાયર વપરાય?', 'ग्राउंड के लिए आमतौर पर कौन सा रंग का तार उपयोग होता है?'],
      [
        ['Black', 'કાળો', 'काला'],
        ['Red', 'લાલ', 'लाल'],
        ['Yellow', 'પીળો', 'पीला'],
      ],
      0,
    ),
  ),
  L(
    'connectors',
    'Connectors',
    'connector',
    '🔗',
    [
      'Connectors are plugs and sockets that join wires or boards to each other.',
      'કનેક્ટર એ પ્લગ અને સોકેટ છે જે વાયર કે બોર્ડ એકબીજા સાથે જોડે છે.',
      'कनेक्टर प्लग और सॉकेट हैं जो तार या बोर्ड एक-दूसरे से जोड़ते हैं।',
    ],
    [
      'They allow circuits to be assembled, removed and replaced safely.',
      'તે સર્કિટને સુરક્ષિત રીતે જોડવા, ખોલવા અને બદલવા દે છે.',
      'ये सर्किट को सुरक्षित रूप से जोड़ने, खोलने और बदलने देते हैं।',
    ],
    [
      'A metal contact pair pushes together with spring force to make a low-resistance connection.',
      'ધાતુના કોન્ટેક્ટ જોડી સ્પ્રિંગ બળથી જોડાઈને ઓછા રેઝિસ્ટન્સનું જોડાણ બનાવે.',
      'धातु कॉन्टैक्ट जोड़ी स्प्रिंग बल से जुड़कर कम प्रतिरोध का संपर्क बनाती है।',
    ],
    [
      'Used for power (ATX 24-pin), data (SATA) and board-to-board links (JST).',
      'પાવર (ATX 24-pin), ડેટા (SATA) અને બોર્ડ-ટુ-બોર્ડ (JST) માટે વપરાય છે.',
      'पावर (ATX 24-pin), डेटा (SATA) और बोर्ड-टू-बोर्ड (JST) के लिए उपयोग होते हैं।',
    ],
    [
      'ATX 24-pin motherboard connector, SATA data cable, JST XH plug.',
      'ATX 24-pin મધરબોર્ડ કનેક્ટર, SATA ડેટા કેબલ, JST XH પ્લગ.',
      'ATX 24-pin मदरबोर्ड कनेक्टर, SATA डेटा केबल, JST XH प्लग।',
    ],
    qz(
      ['Connectors make it possible to…', 'કનેક્ટર શું શક્ય બનાવે છે?', 'कनेक्टर क्या संभव बनाते हैं?'],
      [
        ['Connect and replace parts safely', 'ભાગ સુરક્ષિત રીતે જોડવા અને બદલવા', 'भाग सुरक्षित जोड़ना और बदलना'],
        ['Store data permanently', 'ડેટા કાયમ સંગ્રહવો', 'डेटा स्थायी सहेजना'],
        ['Cool the circuit', 'સર્કિટ ઠંડું કરવું', 'सर्किट ठंडा करना'],
      ],
      0,
    ),
  ),
];
