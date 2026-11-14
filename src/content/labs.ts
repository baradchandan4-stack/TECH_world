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

export const PCB_LESSONS: Lesson[] = [
  L(
    'pc-planning',
    'Planning a Build',
    'case',
    '📋',
    [
      'Planning a PC build means choosing parts that fit the purpose, socket, power and budget.',
      'PC બિલ્ડનું પ્લાનિંગ એટલે હેતુ, સોકેટ, પાવર અને બજેટને અનુરૂપ ભાગ પસંદ કરવા.',
      'PC बिल्ड की योजना का अर्थ है उद्देश्य, सॉकेट, पावर और बजट के अनुसार पार्ट चुनना।',
    ],
    [
      'It prevents wasted money and incompatible parts before assembly starts.',
      'તે એસેમ્બલી પહેલાં પૈસાનો બગાડ અને અસંગત ભાગ અટકાવે છે.',
      'यह असेंबली से पहले पैसे की बर्बादी और असंगत पार्ट रोकता है।',
    ],
    [
      'Check CPU socket vs motherboard, RAM generation, GPU length, PSU wattage and case size.',
      'CPU સોકેટ vs મધરબોર્ડ, RAM જનરેશન, GPU લંબાઈ, PSU વોટેજ અને કેસ સાઇઝ તપાસો.',
      'CPU सॉकेट बनाम मदरबोर्ड, RAM जनरेशन, GPU लंबाई, PSU वाटेज और केस आकार जाँचें।',
    ],
    [
      'Used for gaming, office, editing and student builds.',
      'ગેમિંગ, ઓફિસ, એડિટિંગ અને સ્ટુડન્ટ બિલ્ડ માટે વપરાય છે.',
      'गेमिंग, ऑफ़िस, एडिटिंग और स्टूडेंट बिल्ड के लिए उपयोग होती है।',
    ],
    [
      'A ₹45,000 office build vs a ₹1,20,000 gaming build.',
      '₹45,000 નું ઓફિસ બિલ્ડ vs ₹1,20,000 નું ગેમિંગ બિલ્ડ.',
      '₹45,000 का ऑफ़िस बिल्ड बनाम ₹1,20,000 का गेमिंग बिल्ड।',
    ],
    qz(
      ['What should match between CPU and motherboard?', 'CPU અને મધરબોર્ડ વચ્ચે શું મેળ ખાવું જોઈએ?', 'CPU और मदरबोर्ड में क्या मेल खाना चाहिए?'],
      [
        ['The CPU socket', 'CPU સોકેટ', 'CPU सॉकेट'],
        ['The case colour', 'કેસનો રંગ', 'केस का रंग'],
        ['The keyboard layout', 'કીબોર્ડ લેઆઉટ', 'कीबोर्ड लेआउट'],
      ],
      0,
    ),
  ),
  L(
    'install-cpu',
    'Installing the CPU',
    'cpu',
    '🧠',
    [
      'The CPU sits in the motherboard socket and must be aligned before the lever is closed.',
      'CPU મધરબોર્ડ સોકેટમાં બેસે છે અને લીવર બંધ કરતાં પહેલાં યોગ્ય રીતે ગોઠવવો પડે.',
      'CPU मदरबोर्ड सॉकेट में बैठता और लीवर बंद करने से पहले सही तरह से रखना पड़ता है।',
    ],
    [
      'It connects hundreds of pins for power, data and ground to the board.',
      'તે બોર્ડ સાથે પાવર, ડેટા અને ગ્રાઉન્ડ માટે સેંકડો પિન જોડે છે.',
      'यह बोर्ड से पावर, डेटा और ग्राउंड के लिए सैकड़ों पिन जोड़ता है।',
    ],
    [
      'A triangle mark on the CPU corner matches the socket corner; the load plate clamps it flat.',
      'CPU ખૂણાનું ત્રિકોણ નિશાન સોકેટના ખૂણા સાથે મેળ ખાય; લોડ પ્લેટ તેને ચપટું દબાવે.',
      'CPU कोने का त्रिकोण निशान सॉकेट के कोने से मिलता; लोड प्लेट उसे सपाट दबाती है।',
    ],
    [
      'Required in every desktop build; laptop CPUs are usually soldered.',
      'દરેક ડેસ્કટોપ બિલ્ડમાં જરૂરી; લેપટોપ CPU સામાન્ય રીતે સોલ્ડર હોય છે.',
      'हर डेस्कटॉप बिल्ड में ज़रूरी; लैपटॉप CPU आमतौर पर सोल्डर होते हैं।',
    ],
    [
      'An AM5 CPU placed in an AM5 socket with the lever locked down.',
      'AM5 સોકેટમાં AM5 CPU ગોઠવીને લીવર લૉક કરવું.',
      'AM5 सॉकेट में AM5 CPU रखकर लीवर लॉक करना।',
    ],
    qz(
      ['What shows the correct CPU orientation?', 'CPUની સાચી દિશા શું બતાવે છે?', 'CPU की सही दिशा क्या दिखाती है?'],
      [
        ['The triangle mark on a corner', 'ખૂણા પરનું ત્રિકોણ નિશાન', 'कोने पर का त्रिकोण निशान'],
        ['The fan colour', 'ફેનનો રંગ', 'फैन का रंग'],
        ['The cable length', 'કેબલની લંબાઈ', 'केबल की लंबाई'],
      ],
      0,
    ),
  ),
  L(
    'install-ram',
    'Installing RAM',
    'ram',
    '🧩',
    [
      'RAM modules clip into the motherboard DIMM slots in matched pairs.',
      'RAM મોડ્યુલ મધરબોર્ડના DIMM સ્લોટમાં જોડીમાં ક્લિપ થાય છે.',
      'RAM मॉड्यूल मदरबोर्ड के DIMM स्लॉट में जोड़ी में क्लिप होते हैं।',
    ],
    [
      'It gives the CPU fast working memory and enables dual-channel bandwidth.',
      'તે CPU ને ઝડપી વર્કિંગ મેમરી આપે અને ડ્યુઅલ-ચેનલ બેન્ડવિડ્થ ચાલુ કરે.',
      'यह CPU को तेज़ वर्किंग मेमोरी देती और डुअल-चैनल बैंडविड्थ चालू करती है।',
    ],
    [
      'The notch in the module must match the slot key; both clips snap when it is fully seated.',
      'મોડ્યુલનો નોચ સ્લોટની કી સાથે મેળ ખાવો જોઈએ; પૂરો બેસે ત્યારે બંને ક્લિપ ક્લિક થાય.',
      'मॉड्यूल का नॉच स्लॉट की की से मिलना चाहिए; पूरा बैठने पर दोनों क्लिप क्लिक करते हैं।',
    ],
    [
      'Used in every PC; 2×8 GB is faster than 1×16 GB in dual-channel mode.',
      'દરેક PC માં વપરાય છે; ડ્યુઅલ-ચેનલમાં 2×8 GB એ 1×16 GB કરતાં ઝડપી છે.',
      'हर PC में उपयोग होती है; डुअल-चैनल में 2×8 GB, 1×16 GB से तेज़ है।',
    ],
    [
      'Two DDR5 sticks in slots A2 and B2.',
      'A2 અને B2 સ્લોટમાં બે DDR5 સ્ટિક.',
      'A2 और B2 स्लॉट में दो DDR5 स्टिक।',
    ],
    qz(
      ['Why install RAM in matching pairs?', 'RAM જોડીમાં કેમ ગોઠવવી?', 'RAM जोड़ी में क्यों लगानी चाहिए?'],
      [
        ['To enable dual-channel speed', 'ડ્યુઅલ-ચેનલ ઝડપ માટે', 'डुअल-चैनल गति के लिए'],
        ['To make it heavier', 'વજન વધારવા', 'वज़न बढ़ाने के लिए'],
        ['To reduce storage', 'સ્ટોરેજ ઘટાડવા', 'स्टोरेज घटाने के लिए'],
      ],
      0,
    ),
  ),
  L(
    'install-storage',
    'Storage Installation',
    'ssd',
    '💾',
    [
      'Storage drives are installed in M.2 slots or SATA bays and then formatted by the OS.',
      'સ્ટોરેજ ડ્રાઇવ M.2 સ્લોટ કે SATA બેમાં ગોઠવાય છે અને પછી OS દ્વારા ફોર્મેટ થાય છે.',
      'स्टोरेज ड्राइव M.2 स्लॉट या SATA बे में लगती और फिर OS से फ़ॉर्मेट होती है।',
    ],
    [
      'It permanently holds the operating system, programs and user files.',
      'તે ઓપરેટિંગ સિસ્ટમ, પ્રોગ્રામ અને વપરાશકર્તા ફાઇલ કાયમ રાખે છે.',
      'यह ऑपरेटिंग सिस्टम, प्रोग्राम और उपयोगकर्ता फ़ाइलें स्थायी रखती है।',
    ],
    [
      'An M.2 NVMe drive uses PCIe lanes directly; a SATA drive uses the SATA controller at up to 6 Gbps.',
      'M.2 NVMe ડ્રાઇવ સીધા PCIe લેન વાપરે; SATA ડ્રાઇવ SATA કંટ્રોલર 6 Gbps સુધી વાપરે.',
      'M.2 NVMe ड्राइव सीधे PCIe लेन लगाती; SATA ड्राइव SATA कंट्रोलर 6 Gbps तक लगाती है।',
    ],
    [
      'Used as the boot drive and for games, projects and backups.',
      'બૂટ ડ્રાઇવ તરીકે અને ગેમ, પ્રોજેક્ટ તથા બેકઅપ માટે વપરાય છે.',
      'बूट ड्राइव के रूप में और गेम, प्रोजेक्ट व बैकअप के लिए उपयोग होती है।',
    ],
    [
      'A 1 TB NVMe SSD as C: drive plus a 2 TB HDD for backups.',
      '1 TB NVMe SSD C: ડ્રાઇવ તરીકે અને 2 TB HDD બેકઅપ માટે.',
      '1 TB NVMe SSD C: ड्राइव के रूप में और 2 TB HDD बैकअप के लिए।',
    ],
    qz(
      ['Which slot is used by a modern NVMe SSD?', 'આધુનિક NVMe SSD કયો સ્લોટ વાપરે છે?', 'आधुनिक NVMe SSD कौन सा स्लॉट लगाता है?'],
      [
        ['M.2 slot', 'M.2 સ્લોટ', 'M.2 स्लॉट'],
        ['DIMM slot', 'DIMM સ્લોટ', 'DIMM स्लॉट'],
        ['CPU socket', 'CPU સોકેટ', 'CPU सॉकेट'],
      ],
      0,
    ),
  ),
  L(
    'install-gpu-psu',
    'GPU and Power Connectors',
    'gpu',
    '🔌',
    [
      'The graphics card fits in the PCIe x16 slot and is powered by PCIe cables from the PSU.',
      'ગ્રાફિક્સ કાર્ડ PCIe x16 સ્લોટમાં બેસે છે અને PSU ના PCIe કેબલથી પાવર લે છે.',
      'ग्राफ़िक्स कार्ड PCIe x16 स्लॉट में बैठता और PSU के PCIe केबल से पावर लेता है।',
    ],
    [
      'It supplies extra 12 V power for the GPU and the motherboard 24-pin connector.',
      'તે GPU માટે વધારાનો 12 V પાવર અને મધરબોર્ડ 24-pin કનેક્ટર પૂરો પાડે છે.',
      'यह GPU के लिए अतिरिक्त 12 V पावर और मदरबोर्ड 24-pin कनेक्टर देता है।',
    ],
    [
      'Total GPU power must stay below the PSU rating; 6+2 pin plugs key only one way.',
      'કુલ GPU પાવર PSU રેટિંગથી ઓછો રહેવો જોઈએ; 6+2 પિન પ્લગ ફક્ત એક જ રીતે બેસે.',
      'कुल GPU पावर PSU रेटिंग से कम रहनी चाहिए; 6+2 पिन प्लग केवल एक ही तरह से लगता है।',
    ],
    [
      'Used in gaming and editing builds with a discrete graphics card.',
      'અલગ ગ્રાફિક્સ કાર્ડવાળા ગેમિંગ અને એડિટિંગ બિલ્ડમાં વપરાય છે.',
      'अलग ग्राफ़िक्स कार्ड वाले गेमिंग और एडिटिंग बिल्ड में उपयोग होता है।',
    ],
    [
      'An RTX card with an 8-pin PCIe cable from a 650 W PSU.',
      '650 W PSU ના 8-pin PCIe કેબલ સાથે RTX કાર્ડ.',
      '650 W PSU के 8-pin PCIe केबल के साथ RTX कार्ड।',
    ],
    qz(
      ['What must be checked before adding a powerful GPU?', 'શક્તિશાળી GPU ઉમેરતાં પહેલાં શું તપાસવું?', 'शक्तिशाली GPU जोड़ने से पहले क्या जाँचें?'],
      [
        ['PSU wattage and PCIe cables', 'PSU વોટેજ અને PCIe કેબલ', 'PSU वाटेज और PCIe केबल'],
        ['Mouse DPI', 'માઉસ DPI', 'माउस DPI'],
        ['Keyboard colour', 'કીબોર્ડનો રંગ', 'कीबोर्ड का रंग'],
      ],
      0,
    ),
  ),
  L(
    'install-cooling',
    'Cooling and Airflow',
    'heatsink',
    '🌬️',
    [
      'Cooling uses a heatsink, thermal paste and fans to keep the CPU and cabinet temperatures low.',
      'કૂલિંગ હીટસિંક, થર્મલ પેસ્ટ અને ફેનથી CPU અને કેબિનેટનું તાપમાન નીચું રાખે છે.',
      'कूलिंग हीटसिंक, थर्मल पेस्ट और फैन से CPU व केबिनेट का तापमान कम रखती है।',
    ],
    [
      'It prevents thermal throttling, random shutdowns and long-term damage.',
      'તે થર્મલ થ્રોટલિંગ, અચાનક શટડાઉન અને લાંબા ગાળાના નુકસાનને રોકે છે.',
      'यह थर्मल थ्रॉटलिंग, अचानक शटडाउन और दीर्घकालिक नुकसान रोकती है।',
    ],
    [
      'Thermal paste fills microscopic gaps; heat flows into the fins and fans push it out of the case.',
      'થર્મલ પેસ્ટ સૂક્ષ્મ ગેપ ભરે; ગરમી ફિનમાં જાય અને ફેન તેને કેસની બહાર ધકેલે.',
      'थर्मल पेस्ट सूक्ष्म अंतराल भरता; गर्मी फिन में जाती और फैन उसे केस से बाहर धकेलते हैं।',
    ],
    [
      'Required for every CPU; essential in gaming and hot climates.',
      'દરેક CPU માટે જરૂરી; ગેમિંગ અને ગરમ હવામાનમાં અનિવાર્ય.',
      'हर CPU के लिए ज़रूरी; गेमिंग और गर्म मौसम में अनिवार्य।',
    ],
    [
      'A tower air cooler with two 120 mm fans and front intake fans.',
      'બે 120 mm ફેનવાળો ટાવર એર કૂલર અને આગળના ઇનટેક ફેન.',
      'दो 120 mm फैन वाला टावर एयर कूलर और आगे के इनटेक फैन।',
    ],
    qz(
      ['What happens if the CPU cooler is not mounted properly?', 'CPU કૂલર યોગ્ય રીતે ન બેસે તો શું થાય?', 'CPU कूलर ठीक से न लगे तो क्या होता है?'],
      [
        ['The CPU overheats and throttles', 'CPU ગરમ થઈને ધીમું પડે', 'CPU गर्म होकर धीमा पड़ता है'],
        ['The RAM gets faster', 'RAM ઝડપી બને', 'RAM तेज़ होती है'],
        ['The monitor gets brighter', 'મોનિટર તેજસ્વી થાય', 'मॉनिटर चमकीला होता है'],
      ],
      0,
    ),
  ),
];

export const CIRCUIT_LESSONS: Lesson[] = [
  L(
    'voltage-current-resistance',
    'Voltage, Current & Resistance',
    'battery',
    '⚡',
    [
      'Voltage is electrical pressure, current is the flow of charge and resistance opposes that flow.',
      'વોલ્ટેજ એ વિદ્યુત દબાણ છે, કરંટ એ ચાર્જનો પ્રવાહ છે અને રેઝિસ્ટન્સ તે પ્રવાહનો વિરોધ કરે છે.',
      'वोल्टेज विद्युत दबाव है, करंट चार्ज का प्रवाह है और प्रतिरोध उस प्रवाह का विरोध करता है।',
    ],
    [
      'These three quantities describe every electrical circuit.',
      'આ ત્રણ રાશિ દરેક વિદ્યુત સર્કિટનું વર્ણન કરે છે.',
      'ये तीन राशियाँ हर विद्युत सर्किट का वर्णन करती हैं।',
    ],
    [
      'A battery provides voltage, wires carry current, and components add resistance.',
      'બેટરી વોલ્ટેજ આપે, વાયર કરંટ લઈ જાય અને ઘટક રેઝિસ્ટન્સ ઉમેરે.',
      'बैटरी वोल्टेज देती, तार करंट ले जाते और घटक प्रतिरोध जोड़ते हैं।',
    ],
    [
      'Used to calculate safe resistor values and diagnose faults.',
      'સુરક્ષિત રેઝિસ્ટર મૂલ્ય ગણવા અને ખામી શોધવામાં વપરાય છે.',
      'सुरक्षित रेज़िस्टर मान निकालने और खराबी खोजने में उपयोग होता है।',
    ],
    [
      'A 9 V battery, a 220 Ω resistor and about 40 mA current.',
      '9 V બેટરી, 220 Ω રેઝિસ્ટર અને લગભગ 40 mA કરંટ.',
      '9 V बैटरी, 220 Ω रेज़िस्टर और लगभग 40 mA करंट।',
    ],
    qz(
      ['What does voltage measure?', 'વોલ્ટેજ શું માપે છે?', 'वोल्टेज क्या मापता है?'],
      [
        ['Electrical pressure (potential difference)', 'વિદ્યુત દબાણ (પોટેન્શિયલ ડિફરન્સ)', 'विद्युत दबाव (विभव अंतर)'],
        ['Number of electrons stored', 'સંગ્રહિત ઇલેક્ટ્રોનની સંખ્યા', 'संग्रहीत इलेक्ट्रॉन की संख्या'],
        ['Colour of the LED', 'LED નો રંગ', 'LED का रंग'],
      ],
      0,
    ),
  ),
  L(
    'ohm-law',
    "Ohm's Law",
    'resistor',
    '📐',
    [
      "Ohm's Law says voltage equals current multiplied by resistance: V = I × R.",
      'ઓહ્મનો નિયમ કહે છે કે વોલ્ટેજ એ કરંટ ગુણ્યા રેઝિસ્ટન્સ છે: V = I × R.',
      'ओम का नियम कहता है कि वोल्टेज, करंट गुणा प्रतिरोध है: V = I × R।',
    ],
    [
      'It lets you calculate the missing value when two are known.',
      'તે બે જાણીતા હોય ત્યારે ત્રીજું મૂલ્ય ગણવા દે છે.',
      'यह दो ज्ञात होने पर तीसरा मान निकालने देता है।',
    ],
    [
      'I = V / R and R = V / I follow directly from the same relationship.',
      'I = V / R અને R = V / I એ જ સંબંધમાંથી સીધા મળે છે.',
      'I = V / R और R = V / I उसी संबंध से सीधे मिलते हैं।',
    ],
    [
      'Used to choose LED resistors and check circuit current.',
      'LED રેઝિસ્ટર પસંદ કરવા અને સર્કિટ કરંટ તપાસવામાં વપરાય છે.',
      'LED रेज़िस्टर चुनने और सर्किट करंट जाँचने में उपयोग होता है।',
    ],
    [
      '9 V across 330 Ω gives about 27 mA.',
      '330 Ω પર 9 V એટલે લગભગ 27 mA.',
      '330 Ω पर 9 V का अर्थ लगभग 27 mA।',
    ],
    qz(
      ['If V = 9 V and R = 300 Ω, the current is…', 'જો V = 9 V અને R = 300 Ω, તો કરંટ કેટલો?', 'यदि V = 9 V और R = 300 Ω, तो करंट कितना?'],
      [
        ['30 mA', '30 mA', '30 mA'],
        ['300 mA', '300 mA', '300 mA'],
        ['3 A', '3 A', '3 A'],
      ],
      0,
    ),
  ),
  L(
    'series-circuit',
    'Series Circuit',
    'wire',
    '➖',
    [
      'In a series circuit components are connected one after another in a single path.',
      'શ્રેણી સર્કિટમાં ઘટકો એક પછી એક એક જ માર્ગમાં જોડાય છે.',
      'श्रेणी सर्किट में घटक एक के बाद एक एक ही मार्ग में जुड़ते हैं।',
    ],
    [
      'The same current flows through every component.',
      'દરેક ઘટકમાંથી સમાન કરંટ વહે છે.',
      'हर घटक से समान करंट बहता है।',
    ],
    [
      'Resistances add up: R total = R1 + R2. One break stops the whole circuit.',
      'રેઝિસ્ટન્સ ઉમેરાય: R કુલ = R1 + R2. એક તૂટ તો આખું સર્કિટ બંધ.',
      'प्रतिरोध जुड़ते हैं: R कुल = R1 + R2। एक टूट तो पूरा सर्किट बंद।',
    ],
    [
      'Used in LED strings and old decorative light series.',
      'LED શ્રેણી અને જૂની સજાવટી લાઇટમાં વપરાય છે.',
      'LED श्रृंखला और पुरानी सजावटी लाइट में उपयोग होता है।',
    ],
    [
      'Two 100 Ω resistors in series give 200 Ω.',
      'શ્રેણીમાં બે 100 Ω રેઝિસ્ટર 200 Ω આપે.',
      'श्रेणी में दो 100 Ω रेज़िस्टर 200 Ω देते हैं।',
    ],
    qz(
      ['In a series circuit the current is…', 'શ્રેણી સર્કિટમાં કરંટ…', 'श्रेणी सर्किट में करंट…'],
      [
        ['The same everywhere', 'દરેક જગ્યાએ સમાન', 'हर जगह समान'],
        ['Zero at the end', 'અંતે શૂન્ય', 'अंत में शून्य'],
        ['Doubled by each part', 'દરેક ભાગથી બમણો', 'हर भाग से दोगुना'],
      ],
      0,
    ),
  ),
  L(
    'parallel-circuit',
    'Parallel Circuit',
    'led',
    '🔀',
    [
      'In a parallel circuit components are connected across the same two points.',
      'સમાંતર સર્કિટમાં ઘટકો એક જ બે બિંદુ વચ્ચે જોડાય છે.',
      'समानांतर सर्किट में घटक एक ही दो बिंदुओं के बीच जुड़ते हैं।',
    ],
    [
      'Each branch gets the full voltage and can work independently.',
      'દરેક શાખાને પૂરો વોલ્ટેજ મળે અને તે સ્વતંત્ર રીતે કામ કરી શકે.',
      'हर शाखा को पूरा वोल्टेज मिलता और वह स्वतंत्र रूप से काम कर सकती है।',
    ],
    [
      'Current divides between branches: 1/R = 1/R1 + 1/R2. One failed branch does not stop others.',
      'કરંટ શાખાઓમાં વિભાજિત થાય: 1/R = 1/R1 + 1/R2. એક શાખા બંધ થાય તો બીજી ચાલે.',
      'करंट शाखाओं में बँटता: 1/R = 1/R1 + 1/R2। एक शाखा बंद हो तो दूसरी चलती है।',
    ],
    [
      'Used in home wiring, where every lamp has its own switch.',
      'ઘરની વાયરિંગમાં વપરાય છે, જ્યાં દરેક લેમ્પનો પોતાનો સ્વિચ હોય.',
      'घर की वायरिंग में उपयोग होता है, जहाँ हर लैंप का अपना स्विच होता है।',
    ],
    [
      'Two 100 Ω resistors in parallel give 50 Ω.',
      'સમાંતરમાં બે 100 Ω રેઝિસ્ટર 50 Ω આપે.',
      'समानांतर में दो 100 Ω रेज़िस्टर 50 Ω देते हैं।',
    ],
    qz(
      ['In a parallel circuit the voltage across each branch is…', 'સમાંતર સર્કિટમાં દરેક શાખા પર વોલ્ટેજ…', 'समानांतर सर्किट में हर शाखा पर वोल्टेज…'],
      [
        ['The same', 'સમાન', 'समान'],
        ['Always zero', 'હંમેશા શૂન્ય', 'हमेशा शून्य'],
        ['Added together', 'ઉમેરાય છે', 'जुड़ जाता है'],
      ],
      0,
    ),
  ),
];
