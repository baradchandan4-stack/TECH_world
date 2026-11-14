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

export const COMPUTER_LESSONS: Lesson[] = [
  L(
    'computer-basics',
    'Computer',
    'case',
    '💻',
    [
      'A computer is an electronic machine that accepts data, processes it and gives useful information as output.',
      'કમ્પ્યુટર એ એક ઇલેક્ટ્રોનિક મશીન છે જે ડેટા લે છે, તેને પ્રોસેસ કરે છે અને ઉપયોગી માહિતી આઉટપુટ તરીકે આપે છે.',
      'कंप्यूटर एक इलेक्ट्रॉनिक मशीन है जो डेटा लेती है, उसे प्रोसेस करती है और उपयोगी जानकारी आउटपुट के रूप में देती है।',
    ],
    [
      'It performs input, processing, storage and output with the help of hardware and software.',
      'તે હાર્ડવેર અને સોફ્ટવેરની મદદથી ઇનપુટ, પ્રોસેસિંગ, સ્ટોરેજ અને આઉટપુટ કરે છે.',
      'यह हार्डवेयर और सॉफ़्टवेयर की मदद से इनपुट, प्रोसेसिंग, स्टोरेज और आउटपुट करता है।',
    ],
    [
      'The CPU follows program instructions: data goes in, is processed, and results are displayed or stored.',
      'CPU પ્રોગ્રામની સૂચનાઓ અનુસરે છે: ડેટા અંદર જાય, પ્રોસેસ થાય અને પરિણામ દેખાય કે સંગ્રહિત થાય.',
      'CPU प्रोग्राम के निर्देशों का पालन करता है: डेटा अंदर जाता है, प्रोसेस होता है और परिणाम दिखता या सहेजा जाता है।',
    ],
    [
      'Used in schools, offices, hospitals, design studios, banking and entertainment.',
      'શાળા, ઓફિસ, હોસ્પિટલ, ડિઝાઇન સ્ટુડિયો, બેંકિંગ અને મનોરંજનમાં વપરાય છે.',
      'स्कूल, ऑफ़िस, अस्पताल, डिज़ाइन स्टूडियो, बैंकिंग और मनोरंजन में उपयोग होता है।',
    ],
    [
      'Laptop, desktop PC, tablet and smartphone.',
      'લેપટોપ, ડેસ્કટોપ PC, ટેબ્લેટ અને સ્માર્ટફોન.',
      'लैपटॉप, डेस्कटॉप PC, टैबलेट और स्मार्टफ़ोन।',
    ],
    qz(
      ['Which of these is NOT a basic function of a computer?', 'આમાંથી કયું કમ્પ્યુટરનું મૂળભૂત કાર્ય નથી?', 'इनमें से कौन कंप्यूटर का मूल कार्य नहीं है?'],
      [
        ['Input', 'ઇનપુટ', 'इनपुट'],
        ['Processing', 'પ્રોસેસિંગ', 'प्रोसेसिंग'],
        ['Cooking', 'રસોઈ', 'खाना पकाना'],
      ],
      2,
    ),
  ),
  L(
    'how-computers-work',
    'How Computers Work',
    'motherboard',
    '⚙️',
    [
      'A computer works as a system of input, processing, memory, storage and output units connected by buses.',
      'કમ્પ્યુટર ઇનપુટ, પ્રોસેસિંગ, મેમરી, સ્ટોરેજ અને આઉટપુટ યુનિટનું સિસ્ટમ છે જે બસ દ્વારા જોડાયેલા હોય છે.',
      'कंप्यूटर इनपुट, प्रोसेसिंग, मेमोरी, स्टोरेज और आउटपुट इकाइयों का सिस्टम है जो बस से जुड़ी होती हैं।',
    ],
    [
      'It moves data between components and the CPU at high speed using the system bus.',
      'તે સિસ્ટમ બસ દ્વારા ઘટકો અને CPU વચ્ચે ડેટા ઝડપથી ખસેડે છે.',
      'यह सिस्टम बस से घटकों और CPU के बीच डेटा तेज़ी से ले जाता है।',
    ],
    [
      'The clock synchronises every unit; instructions are fetched from memory, executed, and results stored back.',
      'ક્લોક દરેક યુનિટને સિંક્રનાઇઝ કરે છે; સૂચનાઓ મેમરીમાંથી લેવાય, ચાલે અને પરિણામ પાછું સંગ્રહાય.',
      'क्लॉक हर इकाई को सिंक करता है; निर्देश मेमोरी से लिए जाते, चलाए जाते और परिणाम वापस सहेजे जाते हैं।',
    ],
    [
      'Explains why a slow storage device or full RAM makes any computer feel slow.',
      'ધીમું સ્ટોરેજ કે ભરેલી RAM કેમ કમ્પ્યુટર ધીમું લાગે તે સમજાવે છે.',
      'समझाता है कि धीमा स्टोरेज या भरी RAM कंप्यूटर को धीमा क्यों बनाती है।',
    ],
    [
      'Opening an app: storage → RAM → CPU → display.',
      'એપ ખોલવી: સ્ટોરેજ → RAM → CPU → ડિસ્પ્લે.',
      'ऐप खोलना: स्टोरेज → RAM → CPU → डिस्प्ले।',
    ],
    qz(
      ['Which unit processes the data?', 'કયું યુનિટ ડેટા પ્રોસેસ કરે છે?', 'कौन सी इकाई डेटा प्रोसेस करती है?'],
      [
        ['CPU', 'CPU', 'CPU'],
        ['Monitor', 'મોનિટર', 'मॉनिटर'],
        ['Keyboard', 'કીબોર્ડ', 'कीबोर्ड'],
      ],
      0,
    ),
  ),
  L(
    'input-devices',
    'Input Devices',
    'input',
    '⌨️',
    [
      'Input devices are hardware used to send data and commands into a computer.',
      'ઇનપુટ ડિવાઇસ એ હાર્ડવેર છે જે કમ્પ્યુટરમાં ડેટા અને આદેશ મોકલવા વપરાય છે.',
      'इनपुट डिवाइस वह हार्डवेयर है जो कंप्यूटर में डेटा और कमांड भेजने के लिए उपयोग होता है।',
    ],
    [
      'They convert human actions into electrical signals the computer can understand.',
      'તે માનવ ક્રિયાઓને કમ્પ્યુટર સમજી શકે તેવા ઇલેક્ટ્રિકલ સિગ્નલમાં ફેરવે છે.',
      'ये मानव क्रियाओं को ऐसे इलेक्ट्रिकल सिग्नल में बदलते हैं जिन्हें कंप्यूटर समझता है।',
    ],
    [
      'A key press closes a circuit in a matrix; the controller sends a scan code to the CPU.',
      'કી દબાવવાથી મેટ્રિક્સમાં સર્કિટ બંધ થાય; કંટ્રોલર CPU ને સ્કેન કોડ મોકલે છે.',
      'की दबाने से मैट्रिक्स में सर्किट बंद होता है; कंट्रोलर CPU को स्कैन कोड भेजता है।',
    ],
    [
      'Used for typing, pointing, scanning, recording voice and capturing images.',
      'ટાઇપિંગ, પોઇન્ટિંગ, સ્કેનિંગ, અવાજ રેકોર્ડિંગ અને ચિત્ર લેવામાં વપરાય છે.',
      'टाइपिंग, पॉइंटिंग, स्कैनिंग, आवाज़ रिकॉर्डिंग और तस्वीर लेने में उपयोग होता है।',
    ],
    [
      'Keyboard, mouse, touchscreen, microphone, webcam, scanner.',
      'કીબોર્ડ, માઉસ, ટચસ્ક્રીન, માઇક્રોફોન, વેબકેમ, સ્કેનર.',
      'कीबोर्ड, माउस, टचस्क्रीन, माइक्रोफ़ोन, वेबकैम, स्कैनर।',
    ],
    qz(
      ['Which one is an input device?', 'કયું ઇનપુટ ડિવાઇસ છે?', 'कौन इनपुट डिवाइस है?'],
      [
        ['Printer', 'પ્રિન્ટર', 'प्रिंटर'],
        ['Microphone', 'માઇક્રોફોન', 'माइक्रोफ़ोन'],
        ['Speaker', 'સ્પીકર', 'स्पीकर'],
      ],
      1,
    ),
  ),
  L(
    'output-devices',
    'Output Devices',
    'output',
    '🖥️',
    [
      'Output devices present processed results to the user as pictures, sound or printed pages.',
      'આઉટપુટ ડિવાઇસ પ્રોસેસ થયેલું પરિણામ વપરાશકર્તાને ચિત્ર, અવાજ કે પ્રિન્ટ સ્વરૂપે બતાવે છે.',
      'आउटपुट डिवाइस प्रोसेस किया गया परिणाम उपयोगकर्ता को चित्र, आवाज़ या प्रिंट रूप में दिखाते हैं।',
    ],
    [
      'They convert digital signals back into light, sound or physical print.',
      'તે ડિજિટલ સિગ્નલને પ્રકાશ, અવાજ કે ભૌતિક પ્રિન્ટમાં પાછા ફેરવે છે.',
      'ये डिजिटल सिग्नल को प्रकाश, आवाज़ या भौतिक प्रिंट में बदलते हैं।',
    ],
    [
      'A monitor lights millions of pixels in rows and columns to form the image you see.',
      'મોનિટર લાખો પિક્સેલને પંક્તિ-કોલમમાં પ્રકાશિત કરીને ચિત્ર બનાવે છે.',
      'मॉनिटर लाखों पिक्सेल को पंक्ति-स्तंभ में जलाकर चित्र बनाता है।',
    ],
    [
      'Used for viewing, listening, printing reports and giving visual feedback.',
      'જોવા, સાંભળવા, રિપોર્ટ પ્રિન્ટ કરવા અને વિઝ્યુઅલ ફીડબેક માટે વપરાય છે.',
      'देखने, सुनने, रिपोर्ट प्रिंट करने और विज़ुअल फ़ीडबैक के लिए उपयोग होता है।',
    ],
    [
      'Monitor, speaker, headphone, printer, projector.',
      'મોનિટર, સ્પીકર, હેડફોન, પ્રિન્ટર, પ્રોજેક્ટર.',
      'मॉनिटर, स्पीकर, हेडफ़ोन, प्रिंटर, प्रोजेक्टर।',
    ],
    qz(
      ['Which device shows the picture from the computer?', 'કયું ઉપકરણ કમ્પ્યુટરનું ચિત્ર બતાવે છે?', 'कौन सा उपकरण कंप्यूटर का चित्र दिखाता है?'],
      [
        ['Scanner', 'સ્કેનર', 'स्कैनर'],
        ['Monitor', 'મોનિટર', 'मॉनिटर'],
        ['Mouse', 'માઉસ', 'माउस'],
      ],
      1,
    ),
  ),
  L(
    'cpu',
    'CPU',
    'cpu',
    '🧠',
    [
      'CPU (Central Processing Unit) is the main chip that executes every instruction in a computer.',
      'CPU (Central Processing Unit) એ કમ્પ્યુટરનું મુખ્ય ચિપ છે જે દરેક સૂચનાનું પાલન કરે છે.',
      'CPU (Central Processing Unit) कंप्यूटर की मुख्य चिप है जो हर निर्देश को निष्पादित करती है।',
    ],
    [
      'It fetches instructions, decodes them and performs arithmetic and logic operations.',
      'તે સૂચનાઓ લે છે, ડિકોડ કરે છે અને ગણિત તથા લોજિક ક્રિયાઓ કરે છે.',
      'यह निर्देश लेता है, डिकोड करता है और गणित व लॉजिक क्रियाएँ करता है।',
    ],
    [
      'The CPU repeats a fetch–decode–execute cycle billions of times per second, synchronised by its clock.',
      'CPU દર સેકન્ડે અબજો વખત ફેચ–ડિકોડ–એક્ઝિક્યુટ ચક્ર પુનરાવર્તિત કરે છે, જે તેના ક્લોકથી સિંક થાય છે.',
      'CPU हर सेकंड अरबों बार फ़ेच–डिकोड–एग्ज़ीक्यूट चक्र दोहराता है, जो उसकी क्लॉक से सिंक होता है।',
    ],
    [
      'Used in every computer, phone, smart TV and embedded controller.',
      'દરેક કમ્પ્યુટર, ફોન, સ્માર્ટ TV અને એમ્બેડેડ કંટ્રોલરમાં વપરાય છે.',
      'हर कंप्यूटर, फ़ोन, स्मार्ट TV और एम्बेडेड कंट्रोलर में उपयोग होता है।',
    ],
    [
      'Intel Core i5 and AMD Ryzen 5 processors.',
      'Intel Core i5 અને AMD Ryzen 5 પ્રોસેસર.',
      'Intel Core i5 और AMD Ryzen 5 प्रोसेसर।',
    ],
    qz(
      ['Which part of the CPU performs arithmetic and logic?', 'CPU નો કયો ભાગ ગણિત અને લોજિક કરે છે?', 'CPU का कौन सा भाग गणित और लॉजिक करता है?'],
      [
        ['ALU', 'ALU', 'ALU'],
        ['RAM', 'RAM', 'RAM'],
        ['USB port', 'USB પોર્ટ', 'USB पोर्ट'],
      ],
      0,
    ),
  ),
  L(
    'ram',
    'RAM',
    'ram',
    '🧩',
    [
      'RAM (Random Access Memory) is fast temporary memory that holds programs and data currently in use.',
      'RAM (Random Access Memory) એ ઝડપી કામચલાઉ મેમરી છે જે હાલ વપરાતા પ્રોગ્રામ અને ડેટા રાખે છે.',
      'RAM (Random Access Memory) तेज़ अस्थायी मेमोरी है जो अभी उपयोग हो रहे प्रोग्राम और डेटा रखती है।',
    ],
    [
      'It gives the CPU quick access to working data, so programs open and respond fast.',
      'તે CPU ને કામ કરતો ડેટા ઝડપથી આપે છે, જેથી પ્રોગ્રામ ઝડપથી ખૂલે અને પ્રતિસાદ આપે.',
      'यह CPU को काम का डेटा तेज़ी से देती है, जिससे प्रोग्राम जल्दी खुलते और प्रतिक्रिया देते हैं।',
    ],
    [
      'Each memory cell stores a charge as 0 or 1; power is needed to keep the data, so RAM clears on shutdown.',
      'દરેક સેલ ચાર્જને 0 કે 1 તરીકે રાખે છે; ડેટા માટે પાવર જરૂરી છે, તેથી શટડાઉન પર RAM ખાલી થાય છે.',
      'हर सेल चार्ज को 0 या 1 के रूप में रखता है; डेटा के लिए पावर ज़रूरी है, इसलिए शटडाउन पर RAM खाली हो जाती है।',
    ],
    [
      'Used for multitasking, browsing many tabs, gaming and video editing.',
      'મલ્ટિટાસ્કિંગ, ઘણા ટૅબ, ગેમિંગ અને વિડિયો એડિટિંગમાં વપરાય છે.',
      'मल्टीटास्किंग, कई टैब, गेमिंग और वीडियो एडिटिंग में उपयोग होती है।',
    ],
    [
      '8 GB DDR4 RAM in a laptop, 16 GB DDR5 in a gaming PC.',
      'લેપટોપમાં 8 GB DDR4 RAM, ગેમિંગ PC માં 16 GB DDR5.',
      'लैपटॉप में 8 GB DDR4 RAM, गेमिंग PC में 16 GB DDR5।',
    ],
    qz(
      ['What happens to RAM content when power is switched off?', 'પાવર બંધ કરતાં RAM નું કન્ટેન્ટ શું થાય?', 'पावर बंद करने पर RAM का कंटेंट क्या होता है?'],
      [
        ['It is erased', 'તે ભૂંસાઈ જાય છે', 'वह मिट जाता है'],
        ['It is printed', 'તે પ્રિન્ટ થાય છે', 'वह प्रिंट हो जाता है'],
        ['It becomes ROM', 'તે ROM બની જાય છે', 'वह ROM बन जाता है'],
      ],
      0,
    ),
  ),
  L(
    'rom',
    'ROM',
    'rom',
    '📜',
    [
      'ROM (Read Only Memory) is permanent memory that keeps essential startup instructions even without power.',
      'ROM (Read Only Memory) એ કાયમી મેમરી છે જે પાવર વગર પણ જરૂરી સ્ટાર્ટઅપ સૂચનાઓ રાખે છે.',
      'ROM (Read Only Memory) स्थायी मेमोरी है जो बिना पावर भी ज़रूरी स्टार्टअप निर्देश रखती है।',
    ],
    [
      'It stores firmware such as the BIOS/UEFI that starts the computer and tests hardware.',
      'તે BIOS/UEFI જેવું ફર્મવેર રાખે છે જે કમ્પ્યુટર શરૂ કરે અને હાર્ડવેર ટેસ્ટ કરે.',
      'यह BIOS/UEFI जैसा फ़र्मवेयर रखती है जो कंप्यूटर शुरू करता और हार्डवेयर टेस्ट करता है।',
    ],
    [
      'Data is written once during manufacturing (or by flashing); it is read-only during normal use.',
      'સામાન્ય રીતે ઉત્પાદન વખતે ડેટા લખાય છે; રોજિંદા વપરાશમાં તે ફક્ત વાંચી શકાય છે.',
      'सामान्यतः निर्माण के समय डेटा लिखा जाता है; रोज़मर्रा के उपयोग में यह केवल पढ़ी जा सकती है।',
    ],
    [
      'Used to boot the system, load firmware and store microcode.',
      'સિસ્ટમ બૂટ કરવા, ફર્મવેર લોડ કરવા અને માઇક્રોકોડ રાખવા વપરાય છે.',
      'सिस्टम बूट करने, फ़र्मवेयर लोड करने और माइक्रोकोड रखने में उपयोग होती है।',
    ],
    [
      'BIOS chip on a motherboard, firmware in a printer.',
      'મધરબોર્ડ પરનું BIOS ચિપ, પ્રિન્ટરનું ફર્મવેર.',
      'मदरबोर्ड पर BIOS चिप, प्रिंटर का फ़र्मवेयर।',
    ],
    qz(
      ['Which memory keeps its data after power off?', 'કઈ મેમરી પાવર બંધ થયા પછી ડેટા રાખે છે?', 'कौन सी मेमोरी पावर बंद होने पर डेटा रखती है?'],
      [
        ['RAM', 'RAM', 'RAM'],
        ['ROM', 'ROM', 'ROM'],
        ['Cache', 'કેશ', 'कैश'],
      ],
      1,
    ),
  ),
  L(
    'motherboard',
    'Motherboard',
    'motherboard',
    '🔌',
    [
      'The motherboard is the main circuit board that connects the CPU, RAM, storage and every other component.',
      'મધરબોર્ડ એ મુખ્ય સર્કિટ બોર્ડ છે જે CPU, RAM, સ્ટોરેજ અને અન્ય દરેક ઘટકને જોડે છે.',
      'मदरबोर्ड मुख्य सर्किट बोर्ड है जो CPU, RAM, स्टोरेज और हर अन्य घटक को जोड़ता है।',
    ],
    [
      'It supplies power and data paths so all parts can communicate.',
      'તે પાવર અને ડેટા માર્ગ પૂરા પાડે છે જેથી બધા ભાગ સંપર્ક કરી શકે.',
      'यह पावर और डेटा मार्ग देता है ताकि सभी भाग संवाद कर सकें।',
    ],
    [
      'Copper traces (buses) carry signals between the chipset, slots and ports; the chipset manages high-speed links.',
      'કોપર ટ્રેસ (બસ) ચિપસેટ, સ્લોટ અને પોર્ટ વચ્ચે સિગ્નલ લઈ જાય છે; ચિપસેટ હાઇ-સ્પીડ લિંક સંભાળે છે.',
      'कॉपर ट्रेस (बस) चिपसेट, स्लॉट और पोर्ट के बीच सिग्नल ले जाते हैं; चिपसेट हाई-स्पीड लिंक संभालता है।',
    ],
    [
      'Used as the base of every PC build and laptop design.',
      'દરેક PC બિલ્ડ અને લેપટોપ ડિઝાઇનના આધાર તરીકે વપરાય છે.',
      'हर PC बिल्ड और लैपटॉप डिज़ाइन के आधार के रूप में उपयोग होता है।',
    ],
    [
      'ATX and micro-ATX boards with LGA or AM5 CPU sockets.',
      'LGA કે AM5 CPU સોકેટવાળા ATX અને micro-ATX બોર્ડ.',
      'LGA या AM5 CPU सॉकेट वाले ATX और micro-ATX बोर्ड।',
    ],
    qz(
      ['What must match between a CPU and a motherboard?', 'CPU અને મધરબોર્ડ વચ્ચે શું મેળ ખાવું જોઈએ?', 'CPU और मदरबोर्ड के बीच क्या मेल खाना चाहिए?'],
      [
        ['The socket type', 'સોકેટનો પ્રકાર', 'सॉकेट का प्रकार'],
        ['The monitor size', 'મોનિટરનું સાઇઝ', 'मॉनिटर का आकार'],
        ['The mouse model', 'માઉસનું મોડેલ', 'माउस का मॉडल'],
      ],
      0,
    ),
  ),
  L(
    'hdd',
    'HDD',
    'hdd',
    '💽',
    [
      'HDD (Hard Disk Drive) is magnetic storage that keeps files permanently on spinning disks.',
      'HDD (Hard Disk Drive) એ ચુંબકીય સ્ટોરેજ છે જે ફરતી ડિસ્ક પર ફાઇલો કાયમ રાખે છે.',
      'HDD (Hard Disk Drive) चुंबकीय स्टोरेज है जो घूमती डिस्क पर फ़ाइलें स्थायी रखती है।',
    ],
    [
      'It stores the operating system, software and personal data when the PC is off.',
      'PC બંધ હોય ત્યારે તે ઓપરેટિંગ સિસ્ટમ, સોફ્ટવેર અને પર્સનલ ડેટા સંગ્રહે છે.',
      'PC बंद होने पर यह ऑपरेटिंग सिस्टम, सॉफ़्टवेयर और व्यक्तिगत डेटा संग्रहीत करती है।',
    ],
    [
      'A read/write head floats over a spinning platter and magnetises tiny regions to store bits.',
      'રીડ/રાઇટ હેડ ફરતી પ્લેટર પર તરે છે અને નાના ભાગને ચુંબકિત કરીને બિટ સંગ્રહે છે.',
      'रीड/राइट हेड घूमती प्लेटर पर तैरता है और छोटे भागों को चुंबकित कर बिट सहेजता है।',
    ],
    [
      'Used for large backups, CCTV storage and budget desktop systems.',
      'મોટા બેકઅપ, CCTV સ્ટોરેજ અને બજેટ ડેસ્કટોપ સિસ્ટમમાં વપરાય છે.',
      'बड़े बैकअप, CCTV स्टोरेज और बजट डेस्कटॉप सिस्टम में उपयोग होती है।',
    ],
    [
      'A 2 TB 7200 RPM hard disk in a desktop.',
      'ડેસ્કટોપમાં 2 TB 7200 RPM હાર્ડ ડિસ્ક.',
      'डेस्कटॉप में 2 TB 7200 RPM हार्ड डिस्क।',
    ],
    qz(
      ['HDD stores data using…', 'HDD ડેટા કેવી રીતે સંગ્રહે છે?', 'HDD डेटा कैसे सहेजती है?'],
      [
        ['Magnetic platters', 'ચુંબકીય પ્લેટર', 'चुंबकीय प्लेटर'],
        ['Ink cartridges', 'શાહી કારતૂસ', 'स्याही कारतूस'],
        ['Light bulbs', 'લાઇટ બલ્બ', 'लाइट बल्ब'],
      ],
      0,
    ),
  ),
  L(
    'ssd',
    'SSD',
    'ssd',
    '⚡',
    [
      'SSD (Solid State Drive) is fast storage built from flash memory chips with no moving parts.',
      'SSD (Solid State Drive) એ ફ્લેશ મેમરી ચિપથી બનેલું ઝડપી સ્ટોરેજ છે જેમાં ફરતા ભાગ નથી.',
      'SSD (Solid State Drive) फ़्लैश मेमोरी चिप से बना तेज़ स्टोरेज है जिसमें कोई घूमता भाग नहीं होता।',
    ],
    [
      'It loads the operating system and applications several times faster than an HDD.',
      'તે HDD કરતાં ઘણી ઝડપથી ઓપરેટિંગ સિસ્ટમ અને એપ લોડ કરે છે.',
      'यह HDD से कई गुना तेज़ी से ऑपरेटिंग सिस्टम और ऐप लोड करता है।',
    ],
    [
      'Flash cells trap electrons in a floating gate; the controller reads the charge level as data.',
      'ફ્લેશ સેલ ઇલેક્ટ્રોનને ફ્લોટિંગ ગેટમાં રોકે છે; કંટ્રોલર ચાર્જ સ્તરને ડેટા તરીકે વાંચે છે.',
      'फ़्लैश सेल इलेक्ट्रॉन को फ़्लोटिंग गेट में रोकता है; कंट्रोलर चार्ज स्तर को डेटा के रूप में पढ़ता है।',
    ],
    [
      'Used as a boot drive in laptops, desktops and servers; also in phones as eMMC/UFS.',
      'લેપટોપ, ડેસ્કટોપ અને સર્વરમાં બૂટ ડ્રાઇવ તરીકે; ફોનમાં eMMC/UFS તરીકે વપરાય છે.',
      'लैपटॉप, डेस्कटॉप और सर्वर में बूट ड्राइव के रूप में; फ़ोन में eMMC/UFS के रूप में।',
    ],
    [
      'A 500 GB NVMe SSD that boots Windows in seconds.',
      '500 GB NVMe SSD જે Windows ને સેકન્ડોમાં બૂટ કરે.',
      '500 GB NVMe SSD जो Windows को सेकंडों में बूट करता है।',
    ],
    qz(
      ['Why is an SSD faster than an HDD?', 'SSD, HDD કરતાં કેમ ઝડપી છે?', 'SSD, HDD से तेज़ क्यों है?'],
      [
        ['It has no moving mechanical parts', 'તેમાં ફરતા યાંત્રિક ભાગ નથી', 'इसमें घूमते यांत्रिक भाग नहीं हैं'],
        ['It uses more electricity', 'તે વધુ વીજળી વાપરે છે', 'यह ज़्यादा बिजली लेता है'],
        ['It is always bigger', 'તે હંમેશા મોટું હોય છે', 'यह हमेशा बड़ा होता है'],
      ],
      0,
    ),
  ),
  L(
    'gpu',
    'GPU',
    'gpu',
    '🎮',
    [
      'GPU (Graphics Processing Unit) is a processor with thousands of small cores built for parallel work.',
      'GPU (Graphics Processing Unit) એ હજારો નાના કોરવાળું પ્રોસેસર છે જે સમાંતર કામ માટે બનેલું છે.',
      'GPU (Graphics Processing Unit) हज़ारों छोटे कोर वाला प्रोसेसर है जो समानांतर काम के लिए बना है।',
    ],
    [
      'It renders 3D graphics, video and also speeds up AI and scientific calculations.',
      'તે 3D ગ્રાફિક્સ, વિડિયો અને AI તથા વૈજ્ઞાનિક ગણતરીઓ ઝડપી કરે છે.',
      'यह 3D ग्राफ़िक्स, वीडियो और AI व वैज्ञानिक गणनाएँ तेज़ करता है।',
    ],
    [
      'It runs thousands of threads together, computing pixel colours and geometry in parallel.',
      'તે હજારો થ્રેડ સાથે મળીને પિક્સેલ રંગ અને જ્યોમેટ્રી સમાંતર ગણે છે.',
      'यह हज़ारों थ्रेड साथ में पिक्सेल रंग और ज्यामिति समानांतर गणना करता है।',
    ],
    [
      'Used for gaming, 3D animation, video editing, CAD and machine learning.',
      'ગેમિંગ, 3D એનિમેશન, વિડિયો એડિટિંગ, CAD અને મશીન લર્નિંગમાં વપરાય છે.',
      'गेमिंग, 3D एनिमेशन, वीडियो एडिटिंग, CAD और मशीन लर्निंग में उपयोग होता है।',
    ],
    [
      'NVIDIA GeForce RTX and AMD Radeon cards.',
      'NVIDIA GeForce RTX અને AMD Radeon કાર્ડ.',
      'NVIDIA GeForce RTX और AMD Radeon कार्ड।',
    ],
    qz(
      ['What is the GPU especially good at?', 'GPU ખાસ કરીને શેમાં સારું છે?', 'GPU विशेष रूप से किसमें अच्छा है?'],
      [
        ['Parallel calculations', 'સમાંતર ગણતરીઓ', 'समानांतर गणनाएँ'],
        ['Printing paper', 'કાગળ પ્રિન્ટ કરવી', 'कागज़ प्रिंट करना'],
        ['Cooling the CPU', 'CPU ઠંડું કરવું', 'CPU ठंडा करना'],
      ],
      0,
    ),
  ),
  L(
    'smps',
    'SMPS',
    'psu',
    '🔋',
    [
      'SMPS (Switched Mode Power Supply) converts AC mains power into the stable DC voltages a computer needs.',
      'SMPS (Switched Mode Power Supply) AC મેઇન્સ પાવરને કમ્પ્યુટરને જરૂરી સ્થિર DC વોલ્ટેજમાં ફેરવે છે.',
      'SMPS (Switched Mode Power Supply) AC मेन्स पावर को कंप्यूटर के लिए ज़रूरी स्थिर DC वोल्टेज में बदलता है।',
    ],
    [
      'It supplies +12 V, +5 V and +3.3 V rails to the motherboard, drives and GPU.',
      'તે મધરબોર્ડ, ડ્રાઇવ અને GPU ને +12 V, +5 V અને +3.3 V પૂરા પાડે છે.',
      'यह मदरबोर्ड, ड्राइव और GPU को +12 V, +5 V और +3.3 V देता है।',
    ],
    [
      'It switches the input at very high frequency, transforms it and rectifies it back to smooth DC.',
      'તે ઇનપુટને ખૂબ ઊંચી ફ્રિકવન્સી પર સ્વિચ કરે, ટ્રાન્સફોર્મ કરે અને સ્મૂથ DC બનાવે છે.',
      'यह इनपुट को बहुत ऊँची आवृत्ति पर स्विच करता, ट्रांसफ़ॉर्म करता और स्मूद DC बनाता है।',
    ],
    [
      'Used in every desktop PC, server and appliance power unit.',
      'દરેક ડેસ્કટોપ PC, સર્વર અને ઉપકરણના પાવર યુનિટમાં વપરાય છે.',
      'हर डेस्कटॉप PC, सर्वर और उपकरण की पावर यूनिट में उपयोग होता है।',
    ],
    [
      'A 550 W 80+ Bronze ATX power supply.',
      '550 W 80+ Bronze ATX પાવર સપ્લાય.',
      '550 W 80+ Bronze ATX पावर सप्लाई।',
    ],
    qz(
      ['What does an SMPS do?', 'SMPS શું કરે છે?', 'SMPS क्या करता है?'],
      [
        ['Converts AC to stable DC', 'AC ને સ્થિર DC માં ફેરવે', 'AC को स्थिर DC में बदलता है'],
        ['Stores your photos', 'તમારા ફોટા સંગ્રહે', 'आपकी तस्वीरें सहेजता है'],
        ['Cools the cabinet', 'કેબિનેટ ઠંડું કરે', 'केबिनेट ठंडा करता है'],
      ],
      0,
    ),
  ),
  L(
    'cooling-fan',
    'Cooling Fan',
    'fan',
    '🌀',
    [
      'A cooling fan is a spinning fan that moves air to remove heat from computer parts.',
      'કૂલિંગ ફેન એ ફરતો પંખો છે જે હવા ખસેડીને કમ્પ્યુટર ભાગોમાંથી ગરમી દૂર કરે છે.',
      'कूलिंग फैन एक घूमता पंखा है जो हवा चलाकर कंप्यूटर भागों से गर्मी दूर करता है।',
    ],
    [
      'It keeps the CPU, GPU and cabinet cool so the system runs fast and safe.',
      'તે CPU, GPU અને કેબિનેટને ઠંડા રાખે છે જેથી સિસ્ટમ ઝડપી અને સુરક્ષિત ચાલે.',
      'यह CPU, GPU और केबिनेट को ठंडा रखता है ताकि सिस्टम तेज़ और सुरक्षित चले।',
    ],
    [
      'Blades push air; hot air is replaced by cool air, and dust filters keep fins clean.',
      'બ્લેડ હવા ધકેલે છે; ગરમ હવાને ઠંડી હવા બદલે છે અને ડસ્ટ ફિલ્ટર ફિન સાફ રાખે છે.',
      'ब्लेड हवा धकेलते हैं; गर्म हवा की जगह ठंडी हवा आती है और डस्ट फ़िल्टर फिन साफ़ रखते हैं।',
    ],
    [
      'Used in desktop cabinets, laptops, servers and game consoles.',
      'ડેસ્કટોપ કેબિનેટ, લેપટોપ, સર્વર અને ગેમ કન્સોલમાં વપરાય છે.',
      'डेस्कटॉप केबिनेट, लैपटॉप, सर्वर और गेम कंसोल में उपयोग होता है।',
    ],
    [
      'A 120 mm cabinet fan with RGB lighting.',
      'RGB લાઇટિંગવાળો 120 mm કેબિનેટ ફેન.',
      'RGB लाइटिंग वाला 120 mm केबिनेट फैन।',
    ],
    qz(
      ['What is the main job of a cooling fan?', 'કૂલિંગ ફેનનું મુખ્ય કામ શું છે?', 'कूलिंग फैन का मुख्य काम क्या है?'],
      [
        ['To move heat away from components', 'ઘટકોમાંથી ગરમી દૂર કરવી', 'घटकों से गर्मी दूर करना'],
        ['To store data', 'ડેટા સંગ્રહવો', 'डेटा सहेजना'],
        ['To increase voltage', 'વોલ્ટેજ વધારવો', 'वोल्टेज बढ़ाना'],
      ],
      0,
    ),
  ),
  L(
    'heatsink',
    'Heatsink',
    'heatsink',
    '🌡️',
    [
      'A heatsink is a metal block with fins that absorbs heat from a chip and spreads it into the air.',
      'હીટસિંક એ ફિનવાળો ધાતુનો બ્લોક છે જે ચિપની ગરમી શોષીને હવામાં ફેલાવે છે.',
      'हीटसिंक फिन वाला धातु ब्लॉक है जो चिप की गर्मी सोखकर हवा में फैलाता है।',
    ],
    [
      'It increases the surface area so the CPU or GPU can release heat faster.',
      'તે સપાટીનું ક્ષેત્ર વધારે છે જેથી CPU કે GPU ઝડપથી ગરમી છોડે.',
      'यह सतह का क्षेत्र बढ़ाता है ताकि CPU या GPU जल्दी गर्मी छोड़ सके।',
    ],
    [
      'Metal conducts heat from the chip through thermal paste into the fins, where air carries it away.',
      'ધાતુ થર્મલ પેસ્ટ દ્વારા ચિપની ગરમી ફિન સુધી લઈ જાય છે, જ્યાંથી હવા તેને લઈ જાય છે.',
      'धातु थर्मल पेस्ट से चिप की गर्मी फिन तक ले जाती है, जहाँ से हवा उसे ले जाती है।',
    ],
    [
      'Used on CPUs, GPUs, power transistors and LED lamps.',
      'CPU, GPU, પાવર ટ્રાન્ઝિસ્ટર અને LED લેમ્પમાં વપરાય છે.',
      'CPU, GPU, पावर ट्रांजिस्टर और LED लैंप में उपयोग होता है।',
    ],
    [
      'An aluminium tower cooler with copper heat pipes.',
      'કોપર હીટ પાઇપવાળો એલ્યુમિનિયમ ટાવર કૂલર.',
      'कॉपर हीट पाइप वाला एल्युमिनियम टावर कूलर।',
    ],
    qz(
      ['Why do heatsinks have many fins?', 'હીટસિંકમાં ઘણી ફિન કેમ હોય છે?', 'हीटसिंक में कई फिन क्यों होते हैं?'],
      [
        ['To increase surface area for cooling', 'ઠંડક માટે સપાટી વધારવા', 'ठंडक के लिए सतह बढ़ाने'],
        ['To make them heavier', 'તેમને ભારે બનાવવા', 'उन्हें भारी बनाने'],
        ['To store electricity', 'વીજળી સંગ્રહવા', 'बिजली सहेजने'],
      ],
      0,
    ),
  ),
  L(
    'cabinet',
    'Cabinet',
    'case',
    '🗄️',
    [
      'A cabinet (computer case) is the frame that holds and protects all internal components.',
      'કેબિનેટ (કમ્પ્યુટર કેસ) એ ફ્રેમ છે જે બધા આંતરિક ઘટકો રાખે અને રક્ષણ કરે છે.',
      'केबिनेट (कंप्यूटर केस) वह ढाँचा है जो सभी आंतरिक घटक रखता और सुरक्षित रखता है।',
    ],
    [
      'It holds the motherboard, drives and power supply and guides airflow for cooling.',
      'તે મધરબોર્ડ, ડ્રાઇવ અને પાવર સપ્લાય રાખે છે અને ઠંડક માટે હવાનો પ્રવાહ માર્ગદર્શિત કરે છે.',
      'यह मदरबोर्ड, ड्राइव और पावर सप्लाई रखता है और ठंडक के लिए हवा का प्रवाह मार्गदर्शित करता है।',
    ],
    [
      'Front fans pull cool air in, rear fans push hot air out, creating a steady airflow path.',
      'આગળના ફેન ઠંડી હવા અંદર લે છે, પાછળના ફેન ગરમ હવા બહાર કાઢે છે.',
      'आगे के फैन ठंडी हवा अंदर लेते हैं, पीछे के फैन गर्म हवा बाहर निकालते हैं।',
    ],
    [
      'Used for gaming PCs, office desktops and home servers.',
      'ગેમિંગ PC, ઓફિસ ડેસ્કટોપ અને હોમ સર્વરમાં વપરાય છે.',
      'गेमिंग PC, ऑफ़िस डेस्कटॉप और होम सर्वर में उपयोग होता है।',
    ],
    [
      'A mid-tower ATX case with tempered glass side panel.',
      'ટેમ્પર્ડ ગ્લાસ સાઇડ પેનલવાળું mid-tower ATX કેસ.',
      'टेम्पर्ड ग्लास साइड पैनल वाला mid-tower ATX केस।',
    ],
    qz(
      ['What does a cabinet provide besides protection?', 'કેબિનેટ રક્ષણ સિવાય શું આપે છે?', 'केबिनेट सुरक्षा के अलावा क्या देता है?'],
      [
        ['Airflow for cooling', 'ઠંડક માટે એરફ્લો', 'ठंडक के लिए एयरफ़्लो'],
        ['Internet connection', 'ઇન્ટરનેટ કનેક્શન', 'इंटरनेट कनेक्शन'],
        ['Extra CPU power', 'વધારાની CPU શક્તિ', 'अतिरिक्त CPU शक्ति'],
      ],
      0,
    ),
  ),
  L(
    'keyboard',
    'Keyboard',
    'keyboard',
    '⌨️',
    [
      'A keyboard is an input device with keys used to type text and give commands.',
      'કીબોર્ડ એ ઇનપુટ ડિવાઇસ છે જેની કી દ્વારા લખાણ લખાય અને આદેશ અપાય છે.',
      'कीबोर्ड इनपुट डिवाइस है जिसकी कुंजियों से पाठ लिखा और कमांड दिया जाता है।',
    ],
    [
      'It sends the character or shortcut you press to the computer.',
      'તે તમે દબાવેલું અક્ષર કે શોર્ટકટ કમ્પ્યુટરને મોકલે છે.',
      'यह आपके दबाए अक्षर या शॉर्टकट को कंप्यूटर तक भेजता है।',
    ],
    [
      'Keys sit in a matrix; pressing one completes a circuit and the controller sends a unique scan code.',
      'કી મેટ્રિક્સમાં હોય છે; એક દબાવતાં સર્કિટ પૂર્ણ થાય અને કંટ્રોલર અલગ સ્કેન કોડ મોકલે છે.',
      'कुंजियाँ मैट्रिक्स में होती हैं; एक दबाने पर सर्किट पूरा होता और कंट्रोलर अलग स्कैन कोड भेजता है।',
    ],
    [
      'Used for typing, gaming, shortcuts and data entry.',
      'ટાઇપિંગ, ગેમિંગ, શોર્ટકટ અને ડેટા એન્ટ્રીમાં વપરાય છે.',
      'टाइपिंग, गेमिंग, शॉर्टकट और डेटा एंट्री में उपयोग होता है।',
    ],
    [
      'Membrane office keyboard and mechanical gaming keyboard.',
      'મેમ્બ્રેન ઓફિસ કીબોર્ડ અને મિકેનિકલ ગેમિંગ કીબોર્ડ.',
      'मेम्ब्रेन ऑफ़िस कीबोर्ड और मैकेनिकल गेमिंग कीबोर्ड।',
    ],
    qz(
      ['A keyboard is which type of device?', 'કીબોર્ડ કયા પ્રકારનું ઉપકરણ છે?', 'कीबोर्ड किस प्रकार का उपकरण है?'],
      [
        ['Input', 'ઇનપુટ', 'इनपुट'],
        ['Output', 'આઉટપુટ', 'आउटपुट'],
        ['Storage', 'સ્ટોરેજ', 'स्टोरेज'],
      ],
      0,
    ),
  ),
  L(
    'mouse',
    'Mouse',
    'mouse',
    '🖱️',
    [
      'A mouse is a pointing input device used to move the cursor and click items on screen.',
      'માઉસ એ પોઇન્ટિંગ ઇનપુટ ડિવાઇસ છે જે કર્સર ખસેડવા અને સ્ક્રીન પર ક્લિક કરવા વપરાય છે.',
      'माउस पॉइंटिंग इनपुट डिवाइस है जो कर्सर घुमाने और स्क्रीन पर क्लिक करने के लिए उपयोग होता है।',
    ],
    [
      'It lets you select, drag, scroll and open things precisely.',
      'તે તમને પસંદ કરવા, ડ્રેગ કરવા, સ્ક્રોલ કરવા અને ખોલવા દે છે.',
      'यह आपको चुनने, ड्रैग करने, स्क्रॉल करने और खोलने देता है।',
    ],
    [
      'An optical sensor compares images of the surface hundreds of times a second to calculate movement.',
      'ઓપ્ટિકલ સેન્સર સેકન્ડમાં સેંકડો વખત સપાટીના ચિત્રની તુલના કરીને હલનચલન ગણે છે.',
      'ऑप्टिकल सेंसर सेकंड में सैकड़ों बार सतह की तस्वीरों की तुलना कर हलचल नापता है।',
    ],
    [
      'Used for everyday computer work, design and gaming.',
      'રોજિંદા કમ્પ્યુટર કામ, ડિઝાઇન અને ગેમિંગમાં વપરાય છે.',
      'रोज़मर्रा के कंप्यूटर काम, डिज़ाइन और गेमिंग में उपयोग होता है।',
    ],
    [
      'A wireless optical mouse with scroll wheel.',
      'સ્ક્રોલ વ્હીલવાળું વાયરલેસ ઓપ્ટિકલ માઉસ.',
      'स्क्रॉल व्हील वाला वायरलेस ऑप्टिकल माउस।',
    ],
    qz(
      ['Which sensor does an optical mouse use?', 'ઓપ્ટિકલ માઉસ કયો સેન્સર વાપરે છે?', 'ऑप्टिकल माउस कौन सा सेंसर लगाता है?'],
      [
        ['A light-based movement sensor', 'પ્રકાશ આધારિત હલનચલન સેન્સર', 'प्रकाश आधारित हलचल सेंसर'],
        ['A temperature sensor', 'તાપમાન સેન્સર', 'तापमान सेंसर'],
        ['A gas sensor', 'ગેસ સેન્સર', 'गैस सेंसर'],
      ],
      0,
    ),
  ),
  L(
    'monitor',
    'Monitor',
    'monitor',
    '🖥️',
    [
      'A monitor is an output device that displays text, images and video from the computer.',
      'મોનિટર એ આઉટપુટ ડિવાઇસ છે જે કમ્પ્યુટરનું લખાણ, ચિત્ર અને વિડિયો બતાવે છે.',
      'मॉनिटर आउटपुट डिवाइस है जो कंप्यूटर का पाठ, चित्र और वीडियो दिखाता है।',
    ],
    [
      'It shows the visual result of everything the computer does.',
      'તે કમ્પ્યુટર જે કંઈ કરે તેનું દ્રશ્ય પરિણામ બતાવે છે.',
      'यह कंप्यूटर जो कुछ करता है उसका दृश्य परिणाम दिखाता है।',
    ],
    [
      'An LCD/OLED panel controls the brightness of millions of red, green and blue pixels to form images.',
      'LCD/OLED પેનલ લાખો લાલ, લીલા અને ભૂરા પિક્સેલની તેજસ્વીતા નિયંત્રિત કરીને ચિત્ર બનાવે છે.',
      'LCD/OLED पैनल लाखों लाल, हरे और नीले पिक्सेल की चमक नियंत्रित कर चित्र बनाता है।',
    ],
    [
      'Used for work, study, gaming, design and watching videos.',
      'કામ, અભ્યાસ, ગેમિંગ, ડિઝાઇન અને વિડિયો જોવામાં વપરાય છે.',
      'काम, पढ़ाई, गेमिंग, डिज़ाइन और वीडियो देखने में उपयोग होता है।',
    ],
    [
      'A 24-inch 1080p IPS monitor.',
      '24 ઇંચ 1080p IPS મોનિટર.',
      '24 इंच 1080p IPS मॉनिटर।',
    ],
    qz(
      ['A monitor is a…', 'મોનિટર એ … છે', 'मॉनिटर एक … है'],
      [
        ['Output device', 'આઉટપુટ ડિવાઇસ', 'आउटपुट डिवाइस'],
        ['Input device', 'ઇનપુટ ડિવાઇસ', 'इनपुट डिवाइस'],
        ['Power supply', 'પાવર સપ્લાય', 'पावर सप्लाई'],
      ],
      0,
    ),
  ),
  L(
    'computer-ports',
    'Computer Ports',
    'connector',
    '🔗',
    [
      'Ports are sockets on a computer where cables and devices are connected.',
      'પોર્ટ એ કમ્પ્યુટર પરના સોકેટ છે જ્યાં કેબલ અને ઉપકરણ જોડાય છે.',
      'पोर्ट कंप्यूटर पर बने सॉकेट हैं जहाँ केबल और उपकरण जुड़ते हैं।',
    ],
    [
      'They carry data and power between the computer and external devices.',
      'તે કમ્પ્યુટર અને બાહ્ય ઉપકરણ વચ્ચે ડેટા અને પાવર લઈ જાય છે.',
      'ये कंप्यूटर और बाहरी उपकरण के बीच डेटा और पावर ले जाते हैं।',
    ],
    [
      'Each port follows a standard (USB, HDMI, audio) with fixed pin assignments for signal and power.',
      'દરેક પોર્ટ સિગ્નલ અને પાવર માટે નિશ્ચિત પિન સાથે માનક (USB, HDMI, ઓડિયો) અનુસરે છે.',
      'हर पोर्ट सिग्नल और पावर के लिए तय पिन वाले मानक (USB, HDMI, ऑडियो) का पालन करता है।',
    ],
    [
      'Used to connect monitors, drives, keyboards, network cables and chargers.',
      'મોનિટર, ડ્રાઇવ, કીબોર્ડ, નેટવર્ક કેબલ અને ચાર્જર જોડવા વપરાય છે.',
      'मॉनिटर, ड्राइव, कीबोर्ड, नेटवर्क केबल और चार्जर जोड़ने में उपयोग होते हैं।',
    ],
    [
      'USB-C, USB-A, HDMI, 3.5 mm audio jack, Ethernet RJ45.',
      'USB-C, USB-A, HDMI, 3.5 mm ઓડિયો જેક, ઇથરનેટ RJ45.',
      'USB-C, USB-A, HDMI, 3.5 mm ऑडियो जैक, ईथरनेट RJ45।',
    ],
    qz(
      ['Which port carries both video and audio digitally?', 'કયો પોર્ટ વિડિયો અને ઓડિયો બંને ડિજિટલ લઈ જાય છે?', 'कौन सा पोर्ट वीडियो और ऑडियो दोनों डिजिटल ले जाता है?'],
      [
        ['HDMI', 'HDMI', 'HDMI'],
        ['3.5 mm audio jack', '3.5 mm ઓડિયો જેક', '3.5 mm ऑडियो जैक'],
        ['RJ45', 'RJ45', 'RJ45'],
      ],
      0,
    ),
  ),
  L(
    'usb',
    'USB',
    'usb',
    '🔌',
    [
      'USB (Universal Serial Bus) is the standard port for connecting and powering devices.',
      'USB (Universal Serial Bus) એ ઉપકરણ જોડવા અને પાવર આપવા માટેનું માનક પોર્ટ છે.',
      'USB (Universal Serial Bus) उपकरण जोड़ने और पावर देने का मानक पोर्ट है।',
    ],
    [
      'It transfers data and supplies 5 V power to keyboards, drives, phones and more.',
      'તે ડેટા ટ્રાન્સફર કરે છે અને કીબોર્ડ, ડ્રાઇવ, ફોનને 5 V પાવર આપે છે.',
      'यह डेटा ट्रांसफ़र करता और कीबोर्ड, ड्राइव, फ़ोन को 5 V पावर देता है।',
    ],
    [
      'Devices are detected, identified and configured automatically (plug and play) over four or more wires.',
      'ઉપકરણ ચાર કે વધુ વાયર પર આપમેળે ઓળખાય અને ગોઠવાય છે (પ્લગ એન્ડ પ્લે).',
      'उपकरण चार या अधिक तारों पर स्वतः पहचाने और सेट होते हैं (प्लग एंड प्ले)।',
    ],
    [
      'Used for pendrives, keyboards, phones, printers and external drives.',
      'પેનડ્રાઇવ, કીબોર્ડ, ફોન, પ્રિન્ટર અને એક્સટર્નલ ડ્રાઇવ માટે વપરાય છે.',
      'पेनड्राइव, कीबोर्ड, फ़ोन, प्रिंटर और एक्सटर्नल ड्राइव के लिए उपयोग होता है।',
    ],
    [
      'USB 2.0 (480 Mbps), USB 3.2 (5–20 Gbps) and USB-C.',
      'USB 2.0 (480 Mbps), USB 3.2 (5–20 Gbps) અને USB-C.',
      'USB 2.0 (480 Mbps), USB 3.2 (5–20 Gbps) और USB-C।',
    ],
    qz(
      ['USB can carry…', 'USB કઈ વસ્તુ લઈ જઈ શકે?', 'USB क्या ले जा सकता है?'],
      [
        ['Both data and power', 'ડેટા અને પાવર બંને', 'डेटा और पावर दोनों'],
        ['Only data', 'ફક્ત ડેટા', 'केवल डेटा'],
        ['Only power', 'ફક્ત પાવર', 'केवल पावर'],
      ],
      0,
    ),
  ),
  L(
    'hdmi',
    'HDMI',
    'hdmi',
    '📺',
    [
      'HDMI (High Definition Multimedia Interface) is a digital port for video and audio together.',
      'HDMI (High Definition Multimedia Interface) એ વિડિયો અને ઓડિયો સાથે લઈ જતો ડિજિટલ પોર્ટ છે.',
      'HDMI (High Definition Multimedia Interface) वीडियो और ऑडियो साथ ले जाने वाला डिजिटल पोर्ट है।',
    ],
    [
      'It connects a PC, laptop or console to a monitor, TV or projector with one cable.',
      'તે PC, લેપટોપ કે કન્સોલને એક કેબલથી મોનિટર, TV કે પ્રોજેક્ટર સાથે જોડે છે.',
      'यह PC, लैपटॉप या कंसोल को एक केबल से मॉनिटर, TV या प्रोजेक्टर से जोड़ता है।',
    ],
    [
      'It sends uncompressed digital video and audio over TMDS lanes with EDID handshaking.',
      'તે EDID હેન્ડશેક સાથે TMDS લેન દ્વારા અનકમ્પ્રેસ્ડ ડિજિટલ વિડિયો અને ઓડિયો મોકલે છે.',
      'यह EDID हैंडशेक के साथ TMDS लेन से अनकंप्रेस्ड डिजिटल वीडियो और ऑडियो भेजता है।',
    ],
    [
      'Used for monitors, TVs, projectors and home theatre.',
      'મોનિટર, TV, પ્રોજેક્ટર અને હોમ થિયેટરમાં વપરાય છે.',
      'मॉनिटर, TV, प्रोजेक्टर और होम थिएटर में उपयोग होता है।',
    ],
    [
      'HDMI 2.1 supporting 4K at 120 Hz.',
      '4K 120 Hz સપોર્ટ કરતું HDMI 2.1.',
      '4K 120 Hz सपोर्ट करने वाला HDMI 2.1।',
    ],
    qz(
      ['HDMI carries…', 'HDMI કઈ વસ્તુ લઈ જાય છે?', 'HDMI क्या ले जाता है?'],
      [
        ['Digital video and audio', 'ડિજિટલ વિડિયો અને ઓડિયો', 'डिजिटल वीडियो और ऑडियो'],
        ['Only electricity', 'ફક્ત વીજળી', 'केवल बिजली'],
        ['Only internet', 'ફક્ત ઇન્ટરનેટ', 'केवल इंटरनेट'],
      ],
      0,
    ),
  ),
  L(
    'bios',
    'BIOS',
    'bios',
    '🧾',
    [
      'BIOS (Basic Input Output System) is firmware stored on the motherboard that starts the computer.',
      'BIOS (Basic Input Output System) એ મધરબોર્ડ પરનું ફર્મવેર છે જે કમ્પ્યુટર શરૂ કરે છે.',
      'BIOS (Basic Input Output System) मदरबोर्ड पर का फ़र्मवेयर है जो कंप्यूटर शुरू करता है।',
    ],
    [
      'It runs the POST hardware test and then hands control to the operating system.',
      'તે POST હાર્ડવેર ટેસ્ટ ચલાવે છે અને પછી નિયંત્રણ ઓપરેટિંગ સિસ્ટમને આપે છે.',
      'यह POST हार्डवेयर टेस्ट चलाता और फिर नियंत्रण ऑपरेटिंग सिस्टम को देता है।',
    ],
    [
      'When power comes on, it checks CPU, RAM and drives, then reads the boot sector of the boot device.',
      'પાવર ચાલુ થતાં તે CPU, RAM અને ડ્રાઇવ તપાસે છે, પછી બૂટ ડિવાઇસનો બૂટ સેક્ટર વાંચે છે.',
      'पावर चालू होते ही यह CPU, RAM और ड्राइव जाँचता, फिर बूट डिवाइस का बूट सेक्टर पढ़ता है।',
    ],
    [
      'Used for booting, hardware settings and troubleshooting startup problems.',
      'બૂટિંગ, હાર્ડવેર સેટિંગ અને સ્ટાર્ટઅપ સમસ્યા ઉકેલવામાં વપરાય છે.',
      'बूटिंग, हार्डवेयर सेटिंग और स्टार्टअप समस्या हल करने में उपयोग होता है।',
    ],
    [
      'A BIOS setup screen used to change boot order.',
      'બૂટ ઓર્ડર બદલવા માટેની BIOS સેટઅપ સ્ક્રીન.',
      'बूट ऑर्डर बदलने के लिए BIOS सेटअप स्क्रीन।',
    ],
    qz(
      ['What does BIOS do first when the PC starts?', 'PC શરૂ થતાં BIOS પહેલાં શું કરે છે?', 'PC शुरू होते ही BIOS पहले क्या करता है?'],
      [
        ['Runs the POST hardware test', 'POST હાર્ડવેર ટેસ્ટ ચલાવે', 'POST हार्डवेयर टेस्ट चलाता है'],
        ['Prints a document', 'દસ્તાવેજ પ્રિન્ટ કરે', 'दस्तावेज़ प्रिंट करता है'],
        ['Opens the browser', 'બ્રાઉઝર ખોલે', 'ब्राउज़र खोलता है'],
      ],
      0,
    ),
  ),
  L(
    'uefi',
    'UEFI',
    'bios',
    '🛡️',
    [
      'UEFI (Unified Extensible Firmware Interface) is the modern replacement for BIOS.',
      'UEFI (Unified Extensible Firmware Interface) એ BIOS નું આધુનિક સ્વરૂપ છે.',
      'UEFI (Unified Extensible Firmware Interface) BIOS का आधुनिक रूप है।',
    ],
    [
      'It starts the PC faster, supports large drives and provides Secure Boot protection.',
      'તે PC ઝડપથી શરૂ કરે, મોટી ડ્રાઇવ સપોર્ટ કરે અને સિક્યોર બૂટ સુરક્ષા આપે છે.',
      'यह PC जल्दी शुरू करता, बड़ी ड्राइव सपोर्ट करता और सिक्योर बूट सुरक्षा देता है।',
    ],
    [
      'It loads an EFI bootloader from a GPT disk and verifies signatures before running the OS.',
      'તે GPT ડિસ્કમાંથી EFI બૂટલોડર લોડ કરે છે અને OS ચલાવતા પહેલાં સિગ્નેચર ચકાસે છે.',
      'यह GPT डिस्क से EFI बूटलोडर लोड करता और OS चलाने से पहले हस्ताक्षर जाँचता है।',
    ],
    [
      'Used on all modern motherboards for fast and safer booting.',
      'ઝડપી અને સુરક્ષિત બૂટિંગ માટે તમામ આધુનિક મધરબોર્ડ પર વપરાય છે.',
      'तेज़ और सुरक्षित बूटिंग के लिए सभी आधुनिक मदरबोर्ड पर उपयोग होता है।',
    ],
    [
      'A graphical UEFI setup with mouse support and Secure Boot.',
      'માઉસ સપોર્ટ અને સિક્યોર બૂટવાળું ગ્રાફિકલ UEFI સેટઅપ.',
      'माउस सपोर्ट और सिक्योर बूट वाला ग्राफ़िकल UEFI सेटअप।',
    ],
    qz(
      ['Which is a UEFI feature?', 'UEFI ની લાક્ષણિકતા કઈ છે?', 'UEFI की विशेषता कौन सी है?'],
      [
        ['Secure Boot', 'સિક્યોર બૂટ', 'सिक्योर बूट'],
        ['Cooling fan control only', 'ફક્ત ફેન કંટ્રોલ', 'केवल फैन कंट्रोल'],
        ['Printing support', 'પ્રિન્ટિંગ સપોર્ટ', 'प्रिंटिंग सपोर्ट'],
      ],
      0,
    ),
  ),
  L(
    'operating-system',
    'Operating System',
    'os',
    '🪟',
    [
      'An operating system is the main software that manages hardware, files and applications.',
      'ઓપરેટિંગ સિસ્ટમ એ મુખ્ય સોફ્ટવેર છે જે હાર્ડવેર, ફાઇલ અને એપ્લિકેશન સંભાળે છે.',
      'ऑपरेटिंग सिस्टम मुख्य सॉफ़्टवेयर है जो हार्डवेयर, फ़ाइल और एप्लिकेशन संभालता है।',
    ],
    [
      'It gives apps a safe way to use the CPU, memory, storage and devices.',
      'તે એપને CPU, મેમરી, સ્ટોરેજ અને ઉપકરણ વાપરવાનો સુરક્ષિત માર્ગ આપે છે.',
      'यह ऐप को CPU, मेमोरी, स्टोरेज और उपकरण उपयोग करने का सुरक्षित तरीका देता है।',
    ],
    [
      'A kernel schedules processes and manages memory while drivers translate OS commands for hardware.',
      'કર્નલ પ્રોસેસ શેડ્યુલ કરે અને મેમરી સંભાળે, જ્યારે ડ્રાઇવર હાર્ડવેર માટે આદેશ અનુવાદ કરે.',
      'कर्नेल प्रोसेस शेड्यूल और मेमोरी संभालता, जबकि ड्राइवर हार्डवेयर के लिए कमांड अनुवाद करते हैं।',
    ],
    [
      'Used on every computer, phone, tablet and server.',
      'દરેક કમ્પ્યુટર, ફોન, ટેબ્લેટ અને સર્વર પર વપરાય છે.',
      'हर कंप्यूटर, फ़ोन, टैबलेट और सर्वर पर उपयोग होता है।',
    ],
    [
      'Windows 11, macOS, Ubuntu Linux, Android.',
      'Windows 11, macOS, Ubuntu Linux, Android.',
      'Windows 11, macOS, Ubuntu Linux, Android।',
    ],
    qz(
      ['Which is an operating system?', 'કઈ ઓપરેટિંગ સિસ્ટમ છે?', 'कौन ऑपरेटिंग सिस्टम है?'],
      [
        ['Windows', 'Windows', 'Windows'],
        ['Chrome', 'Chrome', 'Chrome'],
        ['MS Word', 'MS Word', 'MS Word'],
      ],
      0,
    ),
  ),
];
