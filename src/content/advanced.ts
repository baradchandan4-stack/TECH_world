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

export const NETWORK_LESSONS: Lesson[] = [
  L(
    'internet-basics',
    'Internet',
    'cloud',
    '🌐',
    [
      'The Internet is a worldwide network of networks that shares data using the IP protocol.',
      'ઇન્ટરનેટ એ વિશ્વવ્યાપી નેટવર્કનું નેટવર્ક છે જે IP પ્રોટોકોલથી ડેટા શેર કરે છે.',
      'इंटरनेट दुनिया भर का नेटवर्कों का नेटवर्क है जो IP प्रोटोकॉल से डेटा साझा करता है।',
    ],
    [
      'It connects computers, phones and servers so they can exchange information.',
      'તે કમ્પ્યુટર, ફોન અને સર્વર જોડે જેથી તેઓ માહિતી આપ-લે કરી શકે.',
      'यह कंप्यूटर, फ़ोन और सर्वर जोड़ता ताकि वे जानकारी का आदान-प्रदान कर सकें।',
    ],
    [
      'Data is split into packets, routed across many networks, and reassembled at the destination.',
      'ડેટા પેકેટમાં વિભાજિત થાય, ઘણા નેટવર્કમાંથી પસાર થાય અને લક્ષ્ય પર ફરી જોડાય.',
      'डेटा पैकेट में बँटता, कई नेटवर्क से गुज़रता और गंतव्य पर फिर जुड़ता है।',
    ],
    [
      'Used for websites, messaging, video calls, banking and cloud storage.',
      'વેબસાઇટ, મેસેજિંગ, વિડિયો કૉલ, બેંકિંગ અને ક્લાઉડ સ્ટોરેજમાં વપરાય છે.',
      'वेबसाइट, मैसेजिंग, वीडियो कॉल, बैंकिंग और क्लाउड स्टोरेज में उपयोग होता है।',
    ],
    [
      'Opening a website sends a request to a server through your ISP.',
      'વેબસાઇટ ખોલવાથી ISP દ્વારા સર્વરને વિનંતી જાય છે.',
      'वेबसाइट खोलने पर ISP से सर्वर को अनुरोध जाता है।',
    ],
    qz(
      ['Internet data travels in small units called…', 'ઇન્ટરનેટ ડેટા નાના એકમમાં જાય છે જેને કહેવાય…', 'इंटरनेट डेटा छोटी इकाइयों में जाता है जिन्हें कहते हैं…'],
      [
        ['Packets', 'પેકેટ', 'पैकेट'],
        ['Pixels', 'પિક્સેલ', 'पिक्सेल'],
        ['Volts', 'વોલ્ટ', 'वोल्ट'],
      ],
      0,
    ),
  ),
  L(
    'router',
    'Router',
    'router',
    '📶',
    [
      'A router is a device that forwards data between your local network and other networks.',
      'રાઉટર એ ઉપકરણ છે જે તમારા લોકલ નેટવર્ક અને બીજા નેટવર્ક વચ્ચે ડેટા મોકલે છે.',
      'राउटर वह उपकरण है जो आपके लोकल नेटवर्क और अन्य नेटवर्क के बीच डेटा भेजता है।',
    ],
    [
      'It shares one internet connection and gives each device a local IP address.',
      'તે એક ઇન્ટરનેટ કનેક્શન શેર કરે અને દરેક ઉપકરણને લોકલ IP સરનામું આપે.',
      'यह एक इंटरनेट कनेक्शन साझा करता और हर उपकरण को लोकल IP पता देता है।',
    ],
    [
      'It keeps a routing table and uses NAT so many devices share one public IP.',
      'તે રાઉટિંગ ટેબલ રાખે અને NAT વાપરે જેથી ઘણા ઉપકરણ એક પબ્લિક IP શેર કરે.',
      'यह राउटिंग टेबल रखता और NAT लगाता है ताकि कई उपकरण एक पब्लिक IP साझा करें।',
    ],
    [
      'Used in homes, offices, cafés and schools for Wi-Fi and wired sharing.',
      'ઘર, ઓફિસ, કાફે અને શાળામાં Wi-Fi તથા વાયર શેરિંગ માટે વપરાય છે.',
      'घर, ऑफ़िस, कैफ़े और स्कूल में Wi-Fi व वायर शेयरिंग के लिए उपयोग होता है।',
    ],
    [
      'A dual-band Wi-Fi router with 4 LAN ports.',
      '4 LAN પોર્ટવાળું ડ્યુઅલ-બેન્ડ Wi-Fi રાઉટર.',
      '4 LAN पोर्ट वाला डुअल-बैंड Wi-Fi राउटर।',
    ],
    qz(
      ['A router mainly…', 'રાઉટર મુખ્યત્વે…', 'राउटर मुख्य रूप से…'],
      [
        ['Forwards data between networks', 'નેટવર્ક વચ્ચે ડેટા મોકલે', 'नेटवर्क के बीच डेटा भेजता है'],
        ['Stores your photos', 'તમારા ફોટા સંગ્રહે', 'आपकी तस्वीरें सहेजता है'],
        ['Cools the modem', 'મોડેમ ઠંડું કરે', 'मॉडेम ठंडा करता है'],
      ],
      0,
    ),
  ),
  L(
    'modem',
    'Modem',
    'modem',
    '📞',
    [
      'A modem converts the ISP signal into a form your network can use.',
      'મોડેમ ISP સિગ્નલને તમારા નેટવર્ક વાપરી શકે તે સ્વરૂપમાં ફેરવે છે.',
      'मॉडेम ISP सिग्नल को आपके नेटवर्क के उपयोग योग्य रूप में बदलता है।',
    ],
    [
      'It brings the internet connection into the building.',
      'તે ઇન્ટરનેટ કનેક્શનને બિલ્ડિંગમાં લાવે છે.',
      'यह इंटरनेट कनेक्शन को भवन में लाता है।',
    ],
    [
      'It modulates and demodulates signals over fibre, coaxial cable or phone line.',
      'તે ફાઇબર, કોક્સિયલ કેબલ કે ફોન લાઇન પર સિગ્નલ મોડ્યુલેટ-ડિમોડ્યુલેટ કરે છે.',
      'यह फ़ाइबर, कोक्सियल केबल या फ़ोन लाइन पर सिग्नल मॉड्यूलेट-डिमॉड्यूलेट करता है।',
    ],
    [
      'Used for broadband, fibre and cable internet connections.',
      'બ્રોડબેન્ડ, ફાઇબર અને કેબલ ઇન્ટરનેટ કનેક્શનમાં વપરાય છે.',
      'ब्रॉडबैंड, फ़ाइबर और केबल इंटरनेट कनेक्शन में उपयोग होता है।',
    ],
    [
      'A fibre ONT modem provided by the ISP.',
      'ISP દ્વારા આપેલું ફાઇબર ONT મોડેમ.',
      'ISP द्वारा दिया गया फ़ाइबर ONT मॉडेम।',
    ],
    qz(
      ['The modem connects your home to…', 'મોડેમ તમારું ઘર ક્યાં જોડે છે?', 'मॉडेम आपका घर कहाँ जोड़ता है?'],
      [
        ['The ISP network', 'ISP નેટવર્ક', 'ISP नेटवर्क'],
        ['The keyboard', 'કીબોર્ડ', 'कीबोर्ड'],
        ['The printer only', 'ફક્ત પ્રિન્ટર', 'केवल प्रिंटर'],
      ],
      0,
    ),
  ),
  L(
    'ethernet',
    'Ethernet Cable',
    'ethernet',
    '🔗',
    [
      'An Ethernet cable is a twisted-pair cable with RJ45 plugs for wired networking.',
      'ઇથરનેટ કેબલ એ RJ45 પ્લગવાળી ટ્વિસ્ટેડ-પેર કેબલ છે જે વાયર નેટવર્કિંગ માટે છે.',
      'ईथरनेट केबल RJ45 प्लग वाली ट्विस्टेड-पेयर केबल है जो वायर्ड नेटवर्किंग के लिए है।',
    ],
    [
      'It carries data reliably at high speed between a device and a switch or router.',
      'તે ઉપકરણ અને સ્વિચ કે રાઉટર વચ્ચે ઊંચી ઝડપે વિશ્વસનીય ડેટા લઈ જાય છે.',
      'यह उपकरण और स्विच या राउटर के बीच तेज़ गति से भरोसेमंद डेटा ले जाती है।',
    ],
    [
      'Eight wires in four twisted pairs reduce noise; pins 1-2 and 3-6 carry the main signals.',
      'ચાર ટ્વિસ્ટેડ જોડીમાં આઠ વાયર નોઇઝ ઘટાડે; પિન 1-2 અને 3-6 મુખ્ય સિગ્નલ લઈ જાય.',
      'चार ट्विस्टेड जोड़ी में आठ तार शोर घटाते; पिन 1-2 और 3-6 मुख्य सिग्नल ले जाते हैं।',
    ],
    [
      'Used for LAN connections in offices, gaming setups and CCTV.',
      'ઓફિસ, ગેમિંગ સેટઅપ અને CCTV માં LAN કનેક્શન માટે વપરાય છે.',
      'ऑफ़िस, गेमिंग सेटअप और CCTV में LAN कनेक्शन के लिए उपयोग होती है।',
    ],
    [
      'Cat 6 cable supporting 1 Gbps up to 100 m.',
      '100 m સુધી 1 Gbps સપોર્ટ કરતી Cat 6 કેબલ.',
      '100 m तक 1 Gbps सपोर्ट करने वाली Cat 6 केबल।',
    ],
    qz(
      ['Which connector is used on an Ethernet cable?', 'ઇથરનેટ કેબલ પર કયો કનેક્ટર વપરાય છે?', 'ईथरनेट केबल पर कौन कनेक्टर लगता है?'],
      [
        ['RJ45', 'RJ45', 'RJ45'],
        ['HDMI', 'HDMI', 'HDMI'],
        ['USB-C', 'USB-C', 'USB-C'],
      ],
      0,
    ),
  ),
  L(
    'lan-wan',
    'LAN and WAN',
    'lan',
    '🏢',
    [
      'LAN is a small local network; WAN connects networks across cities or countries.',
      'LAN એ નાનું લોકલ નેટવર્ક છે; WAN શહેર કે દેશો વચ્ચેના નેટવર્ક જોડે છે.',
      'LAN छोटा लोकल नेटवर्क है; WAN शहरों या देशों के नेटवर्क जोड़ता है।',
    ],
    [
      'LAN shares files and printers locally; WAN enables long-distance communication.',
      'LAN સ્થાનિક રીતે ફાઇલ અને પ્રિન્ટર શેર કરે; WAN લાંબા અંતરનો સંપર્ક શક્ય બનાવે.',
      'LAN स्थानीय रूप से फ़ाइल और प्रिंटर साझा करता; WAN लंबी दूरी का संवाद संभव बनाता है।',
    ],
    [
      'LAN uses switches and private IPs; WAN uses routers and public IPs over leased lines or the internet.',
      'LAN સ્વિચ અને પ્રાઇવેટ IP વાપરે; WAN રાઉટર અને પબ્લિક IP લીઝ્ડ લાઇન કે ઇન્ટરનેટ પર વાપરે.',
      'LAN स्विच और प्राइवेट IP लगाता; WAN राउटर और पब्लिक IP लीज़्ड लाइन या इंटरनेट पर लगाता है।',
    ],
    [
      'Used in homes, schools, corporate offices and ISP backbones.',
      'ઘર, શાળા, કોર્પોરેટ ઓફિસ અને ISP બેકબોનમાં વપરાય છે.',
      'घर, स्कूल, कॉर्पोरेट ऑफ़िस और ISP बैकबोन में उपयोग होता है।',
    ],
    [
      'A school lab LAN connected to the internet through a WAN link.',
      'ઇન્ટરનેટ સાથે WAN લિંકથી જોડાયેલ શાળાની લેબ LAN.',
      'इंटरनेट से WAN लिंक से जुड़ा स्कूल लैब LAN।',
    ],
    qz(
      ['A network inside one building is a…', 'એક બિલ્ડિંગની અંદરનું નેટવર્ક કયું છે?', 'एक भवन के अंदर का नेटवर्क कौन सा है?'],
      [
        ['LAN', 'LAN', 'LAN'],
        ['WAN', 'WAN', 'WAN'],
        ['GPU', 'GPU', 'GPU'],
      ],
      0,
    ),
  ),
  L(
    'wifi',
    'Wi-Fi',
    'wifi',
    '📡',
    [
      'Wi-Fi is wireless networking that connects devices using radio waves.',
      'Wi-Fi એ વાયરલેસ નેટવર્કિંગ છે જે રેડિયો તરંગોથી ઉપકરણ જોડે છે.',
      'Wi-Fi वायरलेस नेटवर्किंग है जो रेडियो तरंगों से उपकरण जोड़ती है।',
    ],
    [
      'It gives cable-free internet access to phones, laptops and smart devices.',
      'તે ફોન, લેપટોપ અને સ્માર્ટ ઉપકરણને કેબલ વગર ઇન્ટરનેટ આપે છે.',
      'यह फ़ोन, लैपटॉप और स्मार्ट उपकरणों को बिना केबल इंटरनेट देती है।',
    ],
    [
      'A router transmits on 2.4 GHz or 5 GHz channels; WPA2/WPA3 encrypts the traffic.',
      'રાઉટર 2.4 GHz કે 5 GHz ચેનલ પર પ્રસારણ કરે; WPA2/WPA3 ટ્રાફિક એન્ક્રિપ્ટ કરે.',
      'राउटर 2.4 GHz या 5 GHz चैनल पर प्रसारण करता; WPA2/WPA3 ट्रैफ़िक एन्क्रिप्ट करता है।',
    ],
    [
      'Used at home, in offices, cafés and public hotspots.',
      'ઘર, ઓફિસ, કાફે અને પબ્લિક હોટસ્પોટમાં વપરાય છે.',
      'घर, ऑफ़िस, कैफ़े और पब्लिक हॉटस्पॉट में उपयोग होती है।',
    ],
    [
      'Wi-Fi 6 router with WPA3 security.',
      'WPA3 સુરક્ષા સાથે Wi-Fi 6 રાઉટર.',
      'WPA3 सुरक्षा के साथ Wi-Fi 6 राउटर।',
    ],
    qz(
      ['Which Wi-Fi security is the newest of these?', 'આમાંથી કઈ Wi-Fi સુરક્ષા સૌથી નવી છે?', 'इनमें से कौन सी Wi-Fi सुरक्षा सबसे नई है?'],
      [
        ['WPA3', 'WPA3', 'WPA3'],
        ['WEP', 'WEP', 'WEP'],
        ['Open network', 'ખુલ્લું નેટવર્ક', 'खुला नेटवर्क'],
      ],
      0,
    ),
  ),
  L(
    'ip-mac',
    'IP and MAC Addresses',
    'ip',
    '🔢',
    [
      'An IP address identifies a device on a network; a MAC address is its permanent hardware ID.',
      'IP સરનામું નેટવર્ક પર ઉપકરણ ઓળખે છે; MAC સરનામું તેની કાયમી હાર્ડવેર ઓળખ છે.',
      'IP पता नेटवर्क पर उपकरण पहचानता; MAC पता उसकी स्थायी हार्डवेयर पहचान है।',
    ],
    [
      'IP addresses route packets; MAC addresses deliver frames on the local link.',
      'IP સરનામું પેકેટ રૂટ કરે; MAC સરનામું લોકલ લિંક પર ફ્રેમ પહોંચાડે.',
      'IP पता पैकेट रूट करता; MAC पता लोकल लिंक पर फ़्रेम पहुँचाता है।',
    ],
    [
      'IPv4 uses four numbers 0–255; MAC uses six hex pairs burned into the network card.',
      'IPv4 ચાર નંબર 0–255 વાપરે; MAC નેટવર્ક કાર્ડમાં લખેલા છ હેક્સ જોડી વાપરે.',
      'IPv4 चार संख्याएँ 0–255 लगाता; MAC नेटवर्क कार्ड में लिखे छह हेक्स जोड़े लगाता है।',
    ],
    [
      'Used for troubleshooting, printer sharing and network security filters.',
      'ટ્રબલશૂટિંગ, પ્રિન્ટર શેરિંગ અને નેટવર્ક સુરક્ષા ફિલ્ટર માટે વપરાય છે.',
      'ट्रबलशूटिंग, प्रिंटर शेयरिंग और नेटवर्क सुरक्षा फ़िल्टर के लिए उपयोग होते हैं।',
    ],
    [
      '192.168.1.5 (private IP) and 00:1A:2B:3C:4D:5E (MAC).',
      '192.168.1.5 (પ્રાઇવેટ IP) અને 00:1A:2B:3C:4D:5E (MAC).',
      '192.168.1.5 (प्राइवेट IP) और 00:1A:2B:3C:4D:5E (MAC)।',
    ],
    qz(
      ['Which address is permanently fixed in the network card?', 'કયું સરનામું નેટવર્ક કાર્ડમાં કાયમી હોય છે?', 'कौन सा पता नेटवर्क कार्ड में स्थायी होता है?'],
      [
        ['MAC address', 'MAC સરનામું', 'MAC पता'],
        ['IP address', 'IP સરનામું', 'IP पता'],
        ['Wi-Fi name', 'Wi-Fi નામ', 'Wi-Fi नाम'],
      ],
      0,
    ),
  ),
  L(
    'network-topology',
    'Network Topology',
    'netswitch',
    '🕸️',
    [
      'Network topology is the arrangement of devices and links in a network.',
      'નેટવર્ક ટોપોલોજી એ નેટવર્કમાં ઉપકરણ અને લિંકની ગોઠવણ છે.',
      'नेटवर्क टोपोलॉजी नेटवर्क में उपकरण और लिंक की व्यवस्था है।',
    ],
    [
      'It decides cost, reliability and how easily the network can grow.',
      'તે ખર્ચ, વિશ્વસનીયતા અને નેટવર્ક કેટલું સરળતાથી વધે તે નક્કી કરે.',
      'यह लागत, विश्वसनीयता और नेटवर्क कितनी आसानी से बढ़े, तय करती है।',
    ],
    [
      'Star uses a central switch; bus shares one backbone; mesh gives many redundant paths.',
      'સ્ટાર કેન્દ્રીય સ્વિચ વાપરે; બસ એક બેકબોન શેર કરે; મેશ ઘણા વૈકલ્પિક માર્ગ આપે.',
      'स्टार केंद्रीय स्विच लगाता; बस एक बैकबोन साझा करता; मेश कई वैकल्पिक मार्ग देता है।',
    ],
    [
      'Used when designing offices, schools and data centres.',
      'ઓફિસ, શાળા અને ડેટા સેન્ટર ડિઝાઇન કરતી વખતે વપરાય છે.',
      'ऑफ़िस, स्कूल और डेटा सेंटर डिज़ाइन करते समय उपयोग होती है।',
    ],
    [
      'A star topology with one 24-port switch in a computer lab.',
      'કમ્પ્યુટર લેબમાં એક 24-પોર્ટ સ્વિચ સાથેની સ્ટાર ટોપોલોજી.',
      'कंप्यूटर लैब में एक 24-पोर्ट स्विच वाली स्टार टोपोलॉजी।',
    ],
    qz(
      ['Which topology connects every device to one central switch?', 'કઈ ટોપોલોજી દરેક ઉપકરણને એક કેન્દ્રીય સ્વિચ સાથે જોડે?', 'कौन सी टोपोलॉजी हर उपकरण को एक केंद्रीय स्विच से जोड़ती है?'],
      [
        ['Star', 'સ્ટાર', 'स्टार'],
        ['Bus', 'બસ', 'बस'],
        ['Ring', 'રિંગ', 'रिंग'],
      ],
      0,
    ),
  ),
];

export const ROBOTICS_LESSONS: Lesson[] = [
  L(
    'robotics-basics',
    'Robotics',
    'robot',
    '🤖',
    [
      'Robotics is the science of building machines that sense, decide and act.',
      'રોબોટિક્સ એ એવી મશીન બનાવવાનું વિજ્ઞાન છે જે સંવેદન કરે, નિર્ણય લે અને કાર્ય કરે.',
      'रोबोटिक्स ऐसी मशीन बनाने का विज्ञान है जो संवेदन करे, निर्णय ले और कार्य करे।',
    ],
    [
      'It automates tasks that are repetitive, precise or unsafe for humans.',
      'તે એવા કામ સ્વયંસંચાલિત કરે જે પુનરાવર્તિત, ચોક્કસ કે માણસ માટે જોખમી હોય.',
      'यह ऐसे काम स्वचालित करता जो दोहराव वाले, सटीक या मनुष्य के लिए जोखिम भरे हों।',
    ],
    [
      'A robot loop is: sense → process → act, repeated continuously by a controller.',
      'રોબોટ લૂપ છે: સંવેદન → પ્રોસેસ → ક્રિયા, જે કંટ્રોલર સતત પુનરાવર્તિત કરે.',
      'रोबोट लूप है: संवेदन → प्रोसेस → क्रिया, जिसे कंट्रोलर लगातार दोहराता है।',
    ],
    [
      'Used in factories, hospitals, farming, drones and home cleaning.',
      'ફેક્ટરી, હોસ્પિટલ, ખેતી, ડ્રોન અને ઘરની સફાઈમાં વપરાય છે.',
      'फ़ैक्टरी, अस्पताल, खेती, ड्रोन और घर की सफ़ाई में उपयोग होता है।',
    ],
    [
      'A line-following robot and a robot vacuum cleaner.',
      'લાઇન ફોલો કરતો રોબોટ અને રોબોટ વેક્યુમ ક્લીનર.',
      'लाइन फ़ॉलो करने वाला रोबोट और रोबोट वैक्यूम क्लीनर।',
    ],
    qz(
      ['The basic robot loop is…', 'રોબોટનું મૂળભૂત લૂપ…', 'रोबोट का मूल लूप…'],
      [
        ['Sense → process → act', 'સંવેદન → પ્રોસેસ → ક્રિયા', 'संवेदन → प्रोसेस → क्रिया'],
        ['Print → scan → copy', 'પ્રિન્ટ → સ્કેન → કોપી', 'प्रिंट → स्कैन → कॉपी'],
        ['Charge → cool → sleep', 'ચાર્જ → કૂલ → સ્લીપ', 'चार्ज → कूल → स्लीप'],
      ],
      0,
    ),
  ),
  L(
    'microcontroller',
    'Microcontroller',
    'microcontroller',
    '🧩',
    [
      'A microcontroller is a small computer on one chip with CPU, memory and input/output pins.',
      'માઇક્રોકંટ્રોલર એ એક ચિપ પરનું નાનું કમ્પ્યુટર છે જેમાં CPU, મેમરી અને I/O પિન હોય.',
      'माइक्रोकंट्रोलर एक चिप पर छोटा कंप्यूटर है जिसमें CPU, मेमोरी और I/O पिन होते हैं।',
    ],
    [
      'It runs a stored program to control sensors, motors and displays.',
      'તે સંગ્રહિત પ્રોગ્રામ ચલાવીને સેન્સર, મોટર અને ડિસ્પ્લે નિયંત્રિત કરે છે.',
      'यह सहेजा प्रोग्राम चलाकर सेंसर, मोटर और डिस्प्ले नियंत्रित करता है।',
    ],
    [
      'It reads pins, executes instructions from flash memory and drives output pins many times per second.',
      'તે પિન વાંચે, ફ્લેશ મેમરીમાંથી સૂચના ચલાવે અને સેકન્ડમાં ઘણી વખત આઉટપુટ પિન ચલાવે.',
      'यह पिन पढ़ता, फ़्लैश मेमोरी से निर्देश चलाता और सेकंड में कई बार आउटपुट पिन चलाता है।',
    ],
    [
      'Used in washing machines, toys, robots and smart sensors.',
      'વોશિંગ મશીન, રમકડાં, રોબોટ અને સ્માર્ટ સેન્સરમાં વપરાય છે.',
      'वॉशिंग मशीन, खिलौने, रोबोट और स्मार्ट सेंसर में उपयोग होता है।',
    ],
    [
      'Arduino Uno (ATmega328P), ESP32, Raspberry Pi Pico.',
      'Arduino Uno (ATmega328P), ESP32, Raspberry Pi Pico.',
      'Arduino Uno (ATmega328P), ESP32, Raspberry Pi Pico।',
    ],
    qz(
      ['A microcontroller contains…', 'માઇક્રોકંટ્રોલરમાં શું હોય છે?', 'माइक्रोकंट्रोलर में क्या होता है?'],
      [
        ['CPU, memory and I/O pins', 'CPU, મેમરી અને I/O પિન', 'CPU, मेमोरी और I/O पिन'],
        ['Only a battery', 'ફક્ત બેટરી', 'केवल बैटरी'],
        ['Only a motor', 'ફક્ત મોટર', 'केवल मोटर'],
      ],
      0,
    ),
  ),
  L(
    'servo-motor',
    'Servo Motor',
    'servo',
    '🦾',
    [
      'A servo motor is a motor with position feedback that turns to a precise angle.',
      'સર્વો મોટર એ ફીડબેકવાળી મોટર છે જે ચોક્કસ કોણ સુધી ફરે છે.',
      'सर्वो मोटर फ़ीडबैक वाली मोटर है जो सटीक कोण तक घूमती है।',
    ],
    [
      'It moves robot arms, grippers and steering mechanisms accurately.',
      'તે રોબોટ આર્મ, ગ્રિપર અને સ્ટિયરિંગ મિકેનિઝમ ચોકસાઈથી ખસેડે છે.',
      'यह रोबोट आर्म, ग्रिपर और स्टीयरिंग तंत्र को सटीकता से चलाती है।',
    ],
    [
      'A potentiometer measures the shaft angle and a control circuit adjusts the motor until it matches the PWM command.',
      'પોટેન્શિયોમીટર શાફ્ટ કોણ માપે અને કંટ્રોલ સર્કિટ PWM આદેશ સાથે મેળ થાય ત્યાં સુધી મોટર સમાવે.',
      'पोटेंशियोमीटर शाफ्ट कोण मापता और कंट्रोल सर्किट PWM कमांड से मिलने तक मोटर समायोजित करता है।',
    ],
    [
      'Used in robotic arms, RC cars, camera gimbals and 3D printers.',
      'રોબોટિક આર્મ, RC કાર, કેમેરા ગિમ્બલ અને 3D પ્રિન્ટરમાં વપરાય છે.',
      'रोबोटिक आर्म, RC कार, कैमरा गिम्बल और 3D प्रिंटर में उपयोग होती है।',
    ],
    [
      'An SG90 servo rotating 0–180° with a 50 Hz PWM signal.',
      '50 Hz PWM સિગ્નલથી 0–180° ફરતું SG90 સર્વો.',
      '50 Hz PWM सिग्नल से 0–180° घूमता SG90 सर्वो।',
    ],
    qz(
      ['A servo motor is controlled by…', 'સર્વો મોટર કેવી રીતે નિયંત્રિત થાય?', 'सर्वो मोटर कैसे नियंत्रित होती है?'],
      [
        ['PWM signals', 'PWM સિગ્નલ', 'PWM सिग्नल'],
        ['Sunlight', 'સૂર્યપ્રકાશ', 'सूर्यप्रकाश'],
        ['Water pressure', 'પાણીનું દબાણ', 'पानी का दबाव'],
      ],
      0,
    ),
  ),
  L(
    'robot-programming',
    'Robot Programming',
    'automation',
    '🧑‍💻',
    [
      'Robot programming is writing step-by-step instructions that tell a robot what to do.',
      'રોબોટ પ્રોગ્રામિંગ એ પગલાવાર સૂચનાઓ લખવી છે જે રોબોટને શું કરવું તે કહે.',
      'रोबोट प्रोग्रामिंग चरण-दर-चरण निर्देश लिखना है जो रोबोट को बताते हैं क्या करना है।',
    ],
    [
      'It converts a task into logic: sequences, conditions and loops.',
      'તે કામને લોજિકમાં ફેરવે: ક્રમ, શરત અને લૂપ.',
      'यह काम को लॉजिक में बदलती है: क्रम, शर्त और लूप।',
    ],
    [
      'Programs check sensor values in loops and take decisions with if-else statements.',
      'પ્રોગ્રામ લૂપમાં સેન્સર મૂલ્ય તપાસે અને if-else થી નિર્ણય લે.',
      'प्रोग्राम लूप में सेंसर मान जाँचते और if-else से निर्णय लेते हैं।',
    ],
    [
      'Used for line following, obstacle avoidance and pick-and-place tasks.',
      'લાઇન ફોલો, અવરોધ ટાળવા અને પિક-એન્ડ-પ્લેસ કામમાં વપરાય છે.',
      'लाइन फ़ॉलो, बाधा से बचाव और पिक-एंड-प्लेस काम में उपयोग होती है।',
    ],
    [
      '"If distance < 20 cm then stop and turn" in an Arduino sketch.',
      'Arduino સ્કેચમાં "જો અંતર < 20 cm તો અટકો અને વળો".',
      'Arduino स्केच में "यदि दूरी < 20 cm तो रुको और मुड़ो"।',
    ],
    qz(
      ['Which statement lets a robot make a decision?', 'કયું સ્ટેટમેન્ટ રોબોટને નિર્ણય લેવા દે?', 'कौन सा स्टेटमेंट रोबोट को निर्णय लेने देता है?'],
      [
        ['if-else', 'if-else', 'if-else'],
        ['print', 'print', 'print'],
        ['delay', 'delay', 'delay'],
      ],
      0,
    ),
  ),
  L(
    'automation',
    'Automation',
    'automation',
    '⚙️',
    [
      'Automation means machines performing tasks with little or no human effort.',
      'ઓટોમેશન એટલે મશીન ઓછી કે કોઈ માનવ મહેનત વગર કામ કરે.',
      'ऑटोमेशन का अर्थ मशीन कम या बिना मानव श्रम के काम करे।',
    ],
    [
      'It increases speed, accuracy and safety in repetitive work.',
      'તે પુનરાવર્તિત કામમાં ઝડપ, ચોકસાઈ અને સુરક્ષા વધારે છે.',
      'यह दोहराव वाले काम में गति, सटीकता और सुरक्षा बढ़ाता है।',
    ],
    [
      'Sensors provide feedback and controllers adjust actuators in a closed loop.',
      'સેન્સર ફીડબેક આપે અને કંટ્રોલર ક્લોઝ્ડ લૂપમાં એક્ચ્યુએટર ગોઠવે.',
      'सेंसर फ़ीडबैक देते और कंट्रोलर क्लोज़्ड लूप में एक्चुएटर समायोजित करता है।',
    ],
    [
      'Used in factories, smart homes, farming and traffic systems.',
      'ફેક્ટરી, સ્માર્ટ હોમ, ખેતી અને ટ્રાફિક સિસ્ટમમાં વપરાય છે.',
      'फ़ैक्टरी, स्मार्ट होम, खेती और ट्रैफ़िक सिस्टम में उपयोग होता है।',
    ],
    [
      'An automatic water pump controller with a level sensor.',
      'લેવલ સેન્સર સાથેનું ઓટોમેટિક વોટર પંપ કંટ્રોલર.',
      'लेवल सेंसर वाला ऑटोमैटिक वाटर पंप कंट्रोलर।',
    ],
    qz(
      ['Closed-loop automation uses…', 'ક્લોઝ્ડ-લૂપ ઓટોમેશન શું વાપરે છે?', 'क्लोज़्ड-लूप ऑटोमेशन क्या लगाता है?'],
      [
        ['Sensor feedback', 'સેન્સર ફીડબેક', 'सेंसर फ़ीडबैक'],
        ['Only a timer', 'ફક્ત ટાઇમર', 'केवल टाइमर'],
        ['Only a switch', 'ફક્ત સ્વિચ', 'केवल स्विच'],
      ],
      0,
    ),
  ),
  L(
    'robot-sensors',
    'Robot Sensors',
    'sensor',
    '👁️',
    [
      'Robot sensors are the devices that let a robot understand its surroundings.',
      'રોબોટ સેન્સર એ ઉપકરણ છે જે રોબોટને તેની આસપાસ સમજવા દે છે.',
      'रोबोट सेंसर वे उपकरण हैं जो रोबोट को उसके आसपास समझने देते हैं।',
    ],
    [
      'They detect obstacles, lines, distance, light, sound and temperature.',
      'તે અવરોધ, લાઇન, અંતર, પ્રકાશ, અવાજ અને તાપમાન જોઈ શકે છે.',
      'ये बाधा, लाइन, दूरी, प्रकाश, ध्वनि और तापमान पहचानते हैं।',
    ],
    [
      'An ultrasonic sensor times an echo; an IR sensor detects reflected light from a surface.',
      'અલ્ટ્રાસોનિક સેન્સર ઇકોનો સમય માપે; IR સેન્સર સપાટીથી પરાવર્તિત પ્રકાશ જોઈ શકે.',
      'अल्ट्रासोनिक सेंसर इको का समय मापता; IR सेंसर सतह से परावर्तित प्रकाश पहचानता है।',
    ],
    [
      'Used for obstacle avoidance, line following, distance measurement and security.',
      'અવરોધ ટાળવા, લાઇન ફોલો, અંતર માપન અને સુરક્ષામાં વપરાય છે.',
      'बाधा से बचाव, लाइन फ़ॉलो, दूरी मापन और सुरक्षा में उपयोग होते हैं।',
    ],
    [
      'HC-SR04 ultrasonic sensor and TCRT5000 IR line sensor.',
      'HC-SR04 અલ્ટ્રાસોનિક સેન્સર અને TCRT5000 IR લાઇન સેન્સર.',
      'HC-SR04 अल्ट्रासोनिक सेंसर और TCRT5000 IR लाइन सेंसर।',
    ],
    qz(
      ['Which sensor measures distance with sound?', 'કયો સેન્સર અવાજથી અંતર માપે છે?', 'कौन सा सेंसर ध्वनि से दूरी मापता है?'],
      [
        ['Ultrasonic sensor', 'અલ્ટ્રાસોનિક સેન્સર', 'अल्ट्रासोनिक सेंसर'],
        ['LDR', 'LDR', 'LDR'],
        ['Fuse', 'ફ્યુઝ', 'फ़्यूज़'],
      ],
      0,
    ),
  ),
];

export const FUTURE_LESSONS: Lesson[] = [
  L(
    'artificial-intelligence',
    'Artificial Intelligence',
    'ai',
    '🧠',
    [
      'Artificial Intelligence is the ability of machines to perform tasks that need human-like thinking.',
      'આર્ટિફિશિયલ ઇન્ટેલિજન્સ એ મશીનની ક્ષમતા છે જે માણસ જેવું વિચારવું જરૂરી હોય તેવા કામ કરે.',
      'आर्टिफ़िशियल इंटेलिजेंस मशीनों की क्षमता है जो मनुष्य जैसी सोच वाले काम करें।',
    ],
    [
      'It enables recognition, language, prediction and decision making.',
      'તે ઓળખ, ભાષા, અનુમાન અને નિર્ણય શક્ય બનાવે છે.',
      'यह पहचान, भाषा, अनुमान और निर्णय संभव बनाता है।',
    ],
    [
      'AI learns patterns from data using mathematical models instead of hand-written rules.',
      'AI હાથે લખેલા નિયમોને બદલે ગાણિતિક મોડેલ દ્વારા ડેટામાંથી પેટર્ન શીખે છે.',
      'AI हाथ से लिखे नियमों के बजाय गणितीय मॉडल से डेटा में पैटर्न सीखता है।',
    ],
    [
      'Used in voice assistants, translation, medical imaging and self-driving cars.',
      'વોઇસ અસિસ્ટન્ટ, અનુવાદ, મેડિકલ ઇમેજિંગ અને સેલ્ફ-ડ્રાઇવિંગ કારમાં વપરાય છે.',
      'वॉइस असिस्टेंट, अनुवाद, मेडिकल इमेजिंग और सेल्फ-ड्राइविंग कार में उपयोग होता है।',
    ],
    [
      'Speech recognition in a phone and spam filters in email.',
      'ફોનમાં સ્પીચ રેકગ્નિશન અને ઈમેલમાં સ્પામ ફિલ્ટર.',
      'फ़ोन में स्पीच रिकग्निशन और ईमेल में स्पैम फ़िल्टर।',
    ],
    qz(
      ['AI mainly learns from…', 'AI મુખ્યત્વે શેમાંથી શીખે છે?', 'AI मुख्य रूप से किससे सीखता है?'],
      [
        ['Data and patterns', 'ડેટા અને પેટર્ન', 'डेटा और पैटर्न'],
        ['Paint colours', 'રંગના રંગ', 'रंगों के रंग'],
        ['Water flow', 'પાણીનો પ્રવાહ', 'पानी का प्रवाह'],
      ],
      0,
    ),
  ),
  L(
    'machine-learning',
    'Machine Learning',
    'ai',
    '📈',
    [
      'Machine Learning is a part of AI where programs improve by learning from examples.',
      'મશીન લર્નિંગ એ AI નો ભાગ છે જેમાં પ્રોગ્રામ ઉદાહરણમાંથી શીખીને સુધરે છે.',
      'मशीन लर्निंग AI का भाग है जिसमें प्रोग्राम उदाहरणों से सीखकर बेहतर होता है।',
    ],
    [
      'It finds patterns too complex to program by hand.',
      'તે હાથે પ્રોગ્રામ કરવા મુશ્કેલ એવી પેટર્ન શોધે છે.',
      'यह हाथ से प्रोग्राम करने में कठिन पैटर्न खोजता है।',
    ],
    [
      'Training adjusts model weights to reduce error, then the model predicts on new data.',
      'ટ્રેનિંગ ભૂલ ઘટાડવા મોડેલ વજન ગોઠવે, પછી મોડેલ નવા ડેટા પર અનુમાન કરે.',
      'ट्रेनिंग त्रुटि घटाने के लिए मॉडल भार समायोजित करती, फिर मॉडल नए डेटा पर अनुमान लगाता है।',
    ],
    [
      'Used in recommendations, fraud detection, weather and crop prediction.',
      'ભલામણ, છેતરપિંડી શોધ, હવામાન અને પાક અનુમાનમાં વપરાય છે.',
      'सिफ़ारिश, धोखाधड़ी पहचान, मौसम और फ़सल अनुमान में उपयोग होता है।',
    ],
    [
      'A model that predicts tomorrow’s temperature from past data.',
      'ભૂતકાળના ડેટાથી કાલનું તાપમાન અનુમાન કરતું મોડેલ.',
      'पिछले डेटा से कल का तापमान अनुमान लगाने वाला मॉडल।',
    ],
    qz(
      ['Machine learning improves by…', 'મશીન લર્નિંગ કેવી રીતે સુધરે છે?', 'मशीन लर्निंग कैसे बेहतर होती है?'],
      [
        ['Learning from examples', 'ઉદાહરણમાંથી શીખીને', 'उदाहरणों से सीखकर'],
        ['Getting a bigger screen', 'મોટી સ્ક્રીન મળવાથી', 'बड़ी स्क्रीन मिलने से'],
        ['Using a longer cable', 'લાંબી કેબલ વાપરવાથી', 'लंबी केबल लगाने से'],
      ],
      0,
    ),
  ),
  L(
    'iot',
    'Internet of Things',
    'iot',
    '🏠',
    [
      'IoT means everyday devices connected to the internet to sense and share data.',
      'IoT એટલે રોજિંદા ઉપકરણ ઇન્ટરનેટ સાથે જોડાઈને ડેટા માપે અને શેર કરે.',
      'IoT का अर्थ रोज़मर्रा के उपकरण इंटरनेट से जुड़कर डेटा मापें और साझा करें।',
    ],
    [
      'It allows remote monitoring and control of homes, farms and factories.',
      'તે ઘર, ખેતી અને ફેક્ટરીનું દૂરથી નિરીક્ષણ અને નિયંત્રણ શક્ય બનાવે છે.',
      'यह घर, खेत और फ़ैक्टरी की दूर से निगरानी और नियंत्रण संभव बनाता है।',
    ],
    [
      'Sensors send data to a cloud platform, which analyses it and sends commands back to devices.',
      'સેન્સર ડેટા ક્લાઉડ પ્લેટફોર્મને મોકલે, જે તેનું વિશ્લેષણ કરી ઉપકરણને આદેશ પાછો મોકલે.',
      'सेंसर डेटा क्लाउड प्लेटफ़ॉर्म को भेजते, जो उसका विश्लेषण कर उपकरण को कमांड वापस भेजता है।',
    ],
    [
      'Used in smart homes, smart farming, wearables and smart meters.',
      'સ્માર્ટ હોમ, સ્માર્ટ ખેતી, પહેરવા યોગ્ય ઉપકરણ અને સ્માર્ટ મીટરમાં વપરાય છે.',
      'स्मार्ट होम, स्मार्ट खेती, पहनने योग्य उपकरण और स्मार्ट मीटर में उपयोग होता है।',
    ],
    [
      'A smart bulb controlled from a phone; a soil moisture sensor in a field.',
      'ફોનથી નિયંત્રિત સ્માર્ટ બલ્બ; ખેતરમાં જમીનની ભેજ માપતું સેન્સર.',
      'फ़ोन से नियंत्रित स्मार्ट बल्ब; खेत में मिट्टी की नमी मापने वाला सेंसर।',
    ],
    qz(
      ['IoT devices connect everyday objects to…', 'IoT ઉપકરણ રોજિંદી વસ્તુને શેની સાથે જોડે?', 'IoT उपकरण रोज़मर्रा की वस्तु को किससे जोड़ता है?'],
      [
        ['The internet', 'ઇન્ટરનેટ', 'इंटरनेट'],
        ['The cooling fan', 'કૂલિંગ ફેન', 'कूलिंग फैन'],
        ['The keyboard only', 'ફક્ત કીબોર્ડ', 'केवल कीबोर्ड'],
      ],
      0,
    ),
  ),
  L(
    'smart-devices',
    'Smart Devices',
    'iot',
    '📱',
    [
      'Smart devices are products with sensors, processing and connectivity built in.',
      'સ્માર્ટ ઉપકરણ એ એવા ઉત્પાદન છે જેમાં સેન્સર, પ્રોસેસિંગ અને કનેક્ટિવિટી હોય.',
      'स्मार्ट उपकरण ऐसे उत्पाद हैं जिनमें सेंसर, प्रोसेसिंग और कनेक्टिविटी होती है।',
    ],
    [
      'They automate routines and give useful information to the user.',
      'તે રોજિંદી ક્રિયા સ્વયંસંચાલિત કરે અને ઉપયોગી માહિતી આપે.',
      'ये रोज़मर्रा की क्रियाएँ स्वचालित करते और उपयोगी जानकारी देते हैं।',
    ],
    [
      'A microcontroller reads sensors, runs logic and communicates over Wi-Fi or Bluetooth.',
      'માઇક્રોકંટ્રોલર સેન્સર વાંચે, લોજિક ચલાવે અને Wi-Fi કે બ્લૂટૂથ પર સંપર્ક કરે.',
      'माइक्रोकंट्रोलर सेंसर पढ़ता, लॉजिक चलाता और Wi-Fi या ब्लूटूथ पर संवाद करता है।',
    ],
    [
      'Used in smart watches, smart TVs, smart locks and health bands.',
      'સ્માર્ટ વોચ, સ્માર્ટ TV, સ્માર્ટ લોક અને હેલ્થ બેન્ડમાં વપરાય છે.',
      'स्मार्ट वॉच, स्मार्ट TV, स्मार्ट लॉक और हेल्थ बैंड में उपयोग होते हैं।',
    ],
    [
      'A fitness band counting steps and heart rate.',
      'પગલાં અને હૃદયના ધબકારા ગણતું ફિટનેસ બેન્ડ.',
      'कदम और हृदय गति गिनने वाला फ़िटनेस बैंड।',
    ],
    qz(
      ['Smart devices communicate using…', 'સ્માર્ટ ઉપકરણ કઈ રીતે સંપર્ક કરે છે?', 'स्मार्ट उपकरण कैसे संवाद करते हैं?'],
      [
        ['Wi-Fi or Bluetooth', 'Wi-Fi કે બ્લૂટૂથ', 'Wi-Fi या ब्लूटूथ'],
        ['Paper letters', 'કાગળના પત્ર', 'कागज़ के पत्र'],
        ['Water pipes', 'પાણીની પાઇપ', 'पानी की पाइप'],
      ],
      0,
    ),
  ),
  L(
    'cybersecurity',
    'Cybersecurity',
    'security',
    '🛡️',
    [
      'Cybersecurity is the practice of protecting systems, data and networks from attacks.',
      'સાયબર સિક્યોરિટી એ સિસ્ટમ, ડેટા અને નેટવર્કને હુમલાથી બચાવવાની પ્રથા છે.',
      'साइबर सिक्योरिटी सिस्टम, डेटा और नेटवर्क को हमलों से बचाने का अभ्यास है।',
    ],
    [
      'It keeps personal information private and systems available.',
      'તે અંગત માહિતી ખાનગી અને સિસ્ટમ ઉપલબ્ધ રાખે છે.',
      'यह व्यक्तिगत जानकारी निजी और सिस्टम उपलब्ध रखती है।',
    ],
    [
      'It uses strong passwords, encryption, updates and careful verification to block threats.',
      'તે મજબૂત પાસવર્ડ, એન્ક્રિપ્શન, અપડેટ અને સાવચેત ચકાસણીથી ખતરા રોકે છે.',
      'यह मज़बूत पासवर्ड, एन्क्रिप्शन, अपडेट और सतर्क जाँच से ख़तरे रोकती है।',
    ],
    [
      'Used to protect banking, school records and personal accounts.',
      'બેંકિંગ, શાળાના રેકોર્ડ અને અંગત ખાતા બચાવવા વપરાય છે.',
      'बैंकिंग, स्कूल रिकॉर्ड और व्यक्तिगत खाते बचाने में उपयोग होती है।',
    ],
    [
      'Two-factor authentication and phishing awareness.',
      'ટુ-ફેક્ટર ઓથેન્ટિકેશન અને ફિશિંગ જાગૃતિ.',
      'टू-फ़ैक्टर ऑथेंटिकेशन और फ़िशिंग जागरूकता।',
    ],
    qz(
      ['Which password is the safest?', 'કયો પાસવર્ડ સૌથી સુરક્ષિત છે?', 'कौन सा पासवर्ड सबसे सुरक्षित है?'],
      [
        ['A long mix of letters, numbers and symbols', 'અક્ષર, અંક અને ચિહ્નનું લાંબું મિશ્રણ', 'अक्षर, अंक और चिह्न का लंबा मिश्रण'],
        ['123456', '123456', '123456'],
        ['Your own name', 'તમારું નામ', 'आपका नाम'],
      ],
      0,
    ),
  ),
  L(
    'computer-architecture',
    'Computer Architecture',
    'architecture',
    '🏗️',
    [
      'Computer architecture is the design of a computer’s internal structure and instruction set.',
      'કમ્પ્યુટર આર્કિટેક્ચર એ કમ્પ્યુટરની આંતરિક રચના અને ઇન્સ્ટ્રક્શન સેટની ડિઝાઇન છે.',
      'कंप्यूटर आर्किटेक्चर कंप्यूटर की आंतरिक संरचना और निर्देश सेट का डिज़ाइन है।',
    ],
    [
      'It decides performance, power use and which software can run.',
      'તે પ્રદર્શન, પાવર વપરાશ અને કયું સોફ્ટવેર ચાલી શકે તે નક્કી કરે.',
      'यह प्रदर्शन, बिजली उपयोग और कौन सा सॉफ़्टवेयर चले, तय करता है।',
    ],
    [
      'Modern CPUs use pipelines, cache levels and multiple cores to execute many instructions at once.',
      'આધુનિક CPU પાઇપલાઇન, કેશ સ્તર અને ઘણા કોર વાપરીને એક સાથે ઘણી સૂચના ચલાવે.',
      'आधुनिक CPU पाइपलाइन, कैश स्तर और कई कोर से एक साथ कई निर्देश चलाते हैं।',
    ],
    [
      'Used when comparing processors, servers and embedded systems.',
      'પ્રોસેસર, સર્વર અને એમ્બેડેડ સિસ્ટમની તુલના કરતી વખતે વપરાય છે.',
      'प्रोसेसर, सर्वर और एम्बेडेड सिस्टम की तुलना करते समय उपयोग होता है।',
    ],
    [
      'RISC and CISC designs; ARM chips in phones, x86 chips in PCs.',
      'RISC અને CISC ડિઝાઇન; ફોનમાં ARM ચિપ, PC માં x86 ચિપ.',
      'RISC और CISC डिज़ाइन; फ़ोन में ARM चिप, PC में x86 चिप।',
    ],
    qz(
      ['Which technology lets a CPU start many instructions at once?', 'કઈ ટેકનોલોજી CPU ને એક સાથે ઘણી સૂચના શરૂ કરવા દે?', 'कौन सी तकनीक CPU को एक साथ कई निर्देश शुरू करने देती है?'],
      [
        ['Pipelining', 'પાઇપલાઇનિંગ', 'पाइपलाइनिंग'],
        ['Printing', 'પ્રિન્ટિંગ', 'प्रिंटिंग'],
        ['Defragmenting', 'ડિફ્રેગમેન્ટિંગ', 'डीफ़्रैगमेंटिंग'],
      ],
      0,
    ),
  ),
];
