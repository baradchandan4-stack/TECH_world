import type { Tri } from './types';

export interface RepairCase {
  id: string;
  emoji: string;
  device: Tri;
  complaint: Tri;
  symptom: Tri;
  causes: Tri[];
  correctCause: number;
  tests: { label: Tri; result: Tri }[];
  fixes: Tri[];
  correctFix: number;
  explain: Tri;
}

const c = (en: string, gu: string, hi: string): Tri => ({ en, gu, hi });

export const REPAIR_CASES: RepairCase[] = [
  {
    id: 'no-power',
    emoji: '🖥️',
    device: c('Desktop PC', 'ડેસ્કટોપ PC', 'डेस्कटॉप PC'),
    complaint: c(
      'My computer does not start at all. No light, no fan, nothing happens.',
      'મારું કમ્પ્યુટર ચાલુ જ થતું નથી. લાઇટ નહીં, ફેન નહીં, કંઈ નહીં.',
      'मेरा कंप्यूटर बिल्कुल शुरू नहीं होता। न लाइट, न फैन, कुछ नहीं।',
    ),
    symptom: c(
      'The cabinet is completely silent when the power button is pressed.',
      'પાવર બટન દબાવતાં કેબિનેટમાંથી કોઈ અવાજ આવતો નથી.',
      'पावर बटन दबाने पर केबिनेट से कोई आवाज़ नहीं आती।',
    ),
    causes: [
      c('PSU switch off or power cable loose', 'PSU સ્વિચ બંધ કે પાવર કેબલ ઢીલું', 'PSU स्विच बंद या पावर केबल ढीली'),
      c('Motherboard 24-pin connector not seated', 'મધરબોર્ડ 24-pin કનેક્ટર બરાબર નથી બેઠું', 'मदरबोर्ड 24-pin कनेक्टर ठीक से नहीं लगा'),
      c('Monitor cable damaged', 'મોનિટર કેબલ નષ્ટ', 'मॉनिटर केबल खराब'),
    ],
    correctCause: 0,
    tests: [
      {
        label: c('Check wall socket and power cable', 'વોલ સોકેટ અને પાવર કેબલ તપાસો', 'दीवार सॉकेट और पावर केबल जाँचें'),
        result: c(
          'Cable is loose at the PSU end; the PSU switch is in position 0 (off).',
          'કેબલ PSU તરફ ઢીલું છે; PSU સ્વિચ 0 (બંધ) પર છે.',
          'केबल PSU की ओर ढीली है; PSU स्विच 0 (बंद) पर है।',
        ),
      },
      {
        label: c('Inspect the motherboard 24-pin', 'મધરબોર્ડ 24-pin તપાસો', 'मदरबोर्ड 24-pin जाँचें'),
        result: c(
          'The 24-pin connector is fully clipped in and the standby LED is on.',
          '24-pin કનેક્ટર પૂરું ક્લિપ થયેલું છે અને સ્ટેન્ડબાય LED ચાલુ છે.',
          '24-pin कनेक्टर पूरा क्लिप है और स्टैंडबाय LED चालू है।',
        ),
      },
    ],
    fixes: [
      c('Reconnect the power cable and switch the PSU to I (on)', 'પાવર કેબલ ફરી જોડો અને PSU ને I (ચાલુ) પર કરો', 'पावर केबल फिर जोड़ें और PSU को I (चालू) करें'),
      c('Replace the motherboard', 'મધરબોર્ડ બદલો', 'मदरबोर्ड बदलें'),
      c('Replace the monitor', 'મોનિટર બદલો', 'मॉनिटर बदलें'),
    ],
    correctFix: 0,
    explain: c(
      'A silent PC with no standby light usually means no AC power is reaching the PSU. Checking the cable and the PSU switch first is free, safe and solves most cases.',
      'સ્ટેન્ડબાય લાઇટ વગરનું સાયલન્ટ PC સામાન્ય રીતે PSU સુધી પાવર ન પહોંચવાનું લક્ષણ છે. પહેલાં કેબલ અને PSU સ્વિચ તપાસવું મફત, સુરક્ષિત અને મોટા ભાગના કેસ ઉકેલે છે.',
      'स्टैंडबाय लाइट बिना शांत PC आमतौर पर PSU तक पावर न पहुँचने का संकेत है। पहले केबल और PSU स्विच जाँचना मुफ़्त, सुरक्षित और ज़्यादातर केस हल करता है।',
    ),
  },
  {
    id: 'no-display',
    emoji: '🖵',
    device: c('Desktop PC', 'ડેસ્કટોપ PC', 'डेस्कटॉप PC'),
    complaint: c(
      'The PC turns on but the monitor says "No Signal".',
      'PC ચાલુ થાય છે પણ મોનિટર "No Signal" કહે છે.',
      'PC चालू होता है पर मॉनिटर "No Signal" कहता है।',
    ),
    symptom: c(
      'Fans spin, power LED is on, but the screen stays black.',
      'ફેન ચાલે છે, પાવર LED ચાલુ છે, પણ સ્ક્રીન કાળી રહે છે.',
      'फैन चलते हैं, पावर LED चालू है, पर स्क्रीन काली रहती है।',
    ),
    causes: [
      c('Loose HDMI cable or wrong monitor input', 'ઢીલું HDMI કેબલ કે ખોટો મોનિટર ઇનપુટ', 'ढीली HDMI केबल या गलत मॉनिटर इनपुट'),
      c('RAM module not fully seated', 'RAM મોડ્યુલ પૂરું બેઠું નથી', 'RAM मॉड्यूल पूरा नहीं लगा'),
      c('Operating system is corrupted', 'ઓપરેટિંગ સિસ્ટમ બગડેલી છે', 'ऑपरेटिंग सिस्टम खराब है'),
    ],
    correctCause: 1,
    tests: [
      {
        label: c('Check cable and input source', 'કેબલ અને ઇનપુટ સોર્સ તપાસો', 'केबल और इनपुट स्रोत जाँचें'),
        result: c(
          'Cable is tight and the monitor input is set to the correct HDMI port.',
          'કેબલ બરાબર જોડાયેલું છે અને મોનિટર ઇનપુટ સાચા HDMI પોર્ટ પર છે.',
          'केबल कसकर लगी है और मॉनिटर इनपुट सही HDMI पोर्ट पर है।',
        ),
      },
      {
        label: c('Reseat RAM and listen for beep codes', 'RAM ફરી બેસાડો અને બીપ કોડ સાંભળો', 'RAM फिर लगाएँ और बीप कोड सुनें'),
        result: c(
          'The board gives a memory beep code; one RAM stick was not clicked in.',
          'બોર્ડ મેમરી બીપ કોડ આપે છે; એક RAM સ્ટિક ક્લિક થઈ નથી.',
          'बोर्ड मेमोरी बीप कोड देता है; एक RAM स्टिक क्लिक नहीं हुई।',
        ),
      },
    ],
    fixes: [
      c('Reseat the RAM until both clips click', 'બંને ક્લિપ ક્લિક થાય ત્યાં સુધી RAM ફરી બેસાડો', 'दोनों क्लिप क्लिक होने तक RAM फिर लगाएँ'),
      c('Reinstall Windows immediately', 'તરત Windows ફરી ઇન્સ્ટોલ કરો', 'तुरंत Windows फिर इंस्टॉल करें'),
      c('Replace the monitor', 'મોનિટર બદલો', 'मॉनिटर बदलें'),
    ],
    correctFix: 0,
    explain: c(
      'A POST failure with a memory beep code means the board cannot detect the RAM. Reseating is the correct first fix, and reinstallation of the OS would destroy data without solving anything.',
      'મેમરી બીપ કોડ સાથે POST ફેલ થવાનો અર્થ બોર્ડ RAM શોધી શકતું નથી. ફરી બેસાડવું સાચો પહેલો ઉપાય છે, અને OS ફરી ઇન્સ્ટોલ કરવાથી ડેટા જાય છે છતાં સમસ્યા ન ઉકેલે.',
      'मेमोरी बीप कोड के साथ POST विफल होने का अर्थ बोर्ड RAM नहीं पहचान पा रहा। फिर लगाना सही पहला उपाय है, और OS दोबारा इंस्टॉल करने से डेटा जाएगा पर समस्या नहीं हल होगी।',
    ),
  },
  {
    id: 'slow-computer',
    emoji: '🐢',
    device: c('Laptop', 'લેપટોપ', 'लैपटॉप'),
    complaint: c(
      'My laptop has become very slow, even opening a folder takes long.',
      'મારું લેપટોપ ખૂબ ધીમું થઈ ગયું છે, ફોલ્ડર ખોલવામાં પણ સમય લાગે છે.',
      'मेरा लैपटॉप बहुत धीमा हो गया है, फ़ोल्डर खोलने में भी समय लगता है।',
    ),
    symptom: c(
      'Startup takes minutes and the disk light stays on constantly.',
      'સ્ટાર્ટઅપમાં મિનિટો લાગે છે અને ડિસ્ક લાઇટ સતત ચાલુ રહે છે.',
      'स्टार्टअप में मिनट लगते हैं और डिस्क लाइट लगातार चालू रहती है।',
    ),
    causes: [
      c('Full HDD with little free space and many startup apps', 'ભરાયેલી HDD, ઓછી જગ્યા અને ઘણી સ્ટાર્ટઅપ એપ', 'भरी HDD, कम जगह और कई स्टार्टअप ऐप'),
      c('Wi-Fi password changed', 'Wi-Fi પાસવર્ડ બદલાયો', 'Wi-Fi पासवर्ड बदला'),
      c('Screen brightness is high', 'સ્ક્રીનની તેજસ્વીતા વધારે છે', 'स्क्रीन की चमक ज़्यादा है'),
    ],
    correctCause: 0,
    tests: [
      {
        label: c('Check disk usage and free space', 'ડિસ્ક વપરાશ અને ખાલી જગ્યા તપાસો', 'डिस्क उपयोग और खाली जगह जाँचें'),
        result: c(
          'The system drive is 97% full and the HDD shows 100% active time.',
          'સિસ્ટમ ડ્રાઇવ 97% ભરેલી છે અને HDD 100% એક્ટિવ ટાઇમ બતાવે છે.',
          'सिस्टम ड्राइव 97% भरी है और HDD 100% एक्टिव टाइम दिखाती है।',
        ),
      },
      {
        label: c('Check startup programs', 'સ્ટાર્ટઅપ પ્રોગ્રામ તપાસો', 'स्टार्टअप प्रोग्राम जाँचें'),
        result: c(
          '18 programs launch at startup, including three updaters.',
          'સ્ટાર્ટઅપમાં 18 પ્રોગ્રામ ખૂલે છે, જેમાં ત્રણ અપડેટર છે.',
          'स्टार्टअप में 18 प्रोग्राम खुलते हैं, जिनमें तीन अपडेटर हैं।',
        ),
      },
    ],
    fixes: [
      c('Free disk space, remove extra startup apps and plan an SSD upgrade', 'ડિસ્ક જગ્યા ખાલી કરો, વધારાની સ્ટાર્ટઅપ એપ કાઢો અને SSD અપગ્રેડનું પ્લાનિંગ કરો', 'डिस्क जगह खाली करें, अतिरिक्त स्टार्टअप ऐप हटाएँ और SSD अपग्रेड की योजना बनाएँ'),
      c('Change the wallpaper', 'વોલપેપર બદલો', 'वॉलपेपर बदलें'),
      c('Reset the router', 'રાઉટર રીસેટ કરો', 'राउटर रीसेट करें'),
    ],
    correctFix: 0,
    explain: c(
      'A nearly full mechanical HDD with heavy startup load is the classic cause of slow systems. Cleaning space and moving to an SSD fixes the real bottleneck; cosmetic changes do not.',
      'લગભગ ભરાયેલી મિકેનિકલ HDD અને ભારે સ્ટાર્ટઅપ લોડ ધીમી સિસ્ટમનું ક્લાસિક કારણ છે. જગ્યા ખાલી કરવી અને SSD પર જવું સાચી અડચણ દૂર કરે; દેખાવનાં ફેરફાર નહીં.',
      'लगभग भरी मैकेनिकल HDD और भारी स्टार्टअप लोड धीमी सिस्टम का क्लासिक कारण है। जगह खाली करना और SSD पर जाना असली रुकावट दूर करता; दिखावटी बदलाव नहीं।',
    ),
  },
  {
    id: 'keyboard-dead',
    emoji: '⌨️',
    device: c('USB Keyboard', 'USB કીબોર્ડ', 'USB कीबोर्ड'),
    complaint: c(
      'Some keys on my keyboard stop working while typing.',
      'ટાઇપ કરતી વખતે મારા કીબોર્ડની કેટલીક કી કામ કરતી નથી.',
      'टाइप करते समय मेरे कीबोर्ड की कुछ कीज़ काम नहीं करतीं।',
    ),
    symptom: c(
      'Typing misses letters and sometimes the whole keyboard stops responding.',
      'ટાઇપિંગમાં અક્ષર છૂટી જાય છે અને ક્યારેક આખું કીબોર્ડ બંધ પડે છે.',
      'टाइपिंग में अक्षर छूट जाते हैं और कभी पूरा कीबोर्ड बंद हो जाता है।',
    ),
    causes: [
      c('Loose or damaged USB connection', 'ઢીલું કે નષ્ટ USB કનેક્શન', 'ढीला या खराब USB कनेक्शन'),
      c('Monitor resolution is wrong', 'મોનિટર રિઝોલ્યુશન ખોટું છે', 'मॉनिटर रिज़ॉल्यूशन गलत है'),
      c('The mouse pad is dirty', 'માઉસ પેડ ગંદું છે', 'माउस पैड गंदा है'),
    ],
    correctCause: 0,
    tests: [
      {
        label: c('Try another USB port', 'બીજો USB પોર્ટ વાપરો', 'दूसरा USB पोर्ट आज़माएँ'),
        result: c(
          'On the rear port the keyboard works normally; the front port is loose.',
          'પાછળના પોર્ટ પર કીબોર્ડ સામાન્ય ચાલે છે; આગળનો પોર્ટ ઢીલો છે.',
          'पिछले पोर्ट पर कीबोर्ड सामान्य चलता है; आगे का पोर्ट ढीला है।',
        ),
      },
      {
        label: c('Check the keyboard cable', 'કીબોર્ડ કેબલ તપાસો', 'कीबोर्ड केबल जाँचें'),
        result: c(
          'The cable shows a sharp bend near the plug with intermittent contact.',
          'કેબલ પ્લગ પાસે તીવ્ર વળાંક ધરાવે છે જેમાં સંપર્ક અટકે છે.',
          'केबल प्लग के पास तेज़ मोड़ है जिसमें संपर्क रुक-रुक कर होता है।',
        ),
      },
    ],
    fixes: [
      c('Use a working port and replace the damaged cable/keyboard', 'કાર્યરત પોર્ટ વાપરો અને નષ્ટ કેબલ/કીબોર્ડ બદલો', 'काम करने वाला पोर्ट लगाएँ और खराब केबल/कीबोर्ड बदलें'),
      c('Reinstall the operating system', 'ઓપરેટિંગ સિસ્ટમ ફરી ઇન્સ્ટોલ કરો', 'ऑपरेटिंग सिस्टम फिर इंस्टॉल करें'),
      c('Replace the monitor', 'મોનિટર બદલો', 'मॉनिटर बदलें'),
    ],
    correctFix: 0,
    explain: c(
      'Intermittent keys that work in another port point to a physical connection problem, not software. Replacing the cable or keyboard and using a stable port is the correct repair.',
      'બીજા પોર્ટમાં ચાલતી અનિયમિત કી ભૌતિક કનેક્શન સમસ્યા દર્શાવે છે, સોફ્ટવેર નહીં. કેબલ કે કીબોર્ડ બદલવું અને સ્થિર પોર્ટ વાપરવો સાચી રિપેર છે.',
      'दूसरे पोर्ट में चलने वाली रुक-रुक कर काम करने वाली की भौतिक कनेक्शन समस्या दिखाती है, सॉफ़्टवेयर नहीं। केबल या कीबोर्ड बदलना और स्थिर पोर्ट लगाना सही रिपेयर है।',
    ),
  },
  {
    id: 'mouse-dead',
    emoji: '🖱️',
    device: c('Wireless Mouse', 'વાયરલેસ માઉસ', 'वायरलेस माउस'),
    complaint: c(
      'My mouse cursor does not move and clicks do nothing.',
      'મારા માઉસનું કર્સર ખસતું નથી અને ક્લિક કામ કરતું નથી.',
      'मेरे माउस का कर्सर नहीं हिलता और क्लिक काम नहीं करता।',
    ),
    symptom: c(
      'The mouse light is dim and it works only sometimes.',
      'માઉસની લાઇટ મંદ છે અને ક્યારેક જ કામ કરે છે.',
      'माउस की लाइट मंद है और कभी-कभी ही काम करता है।',
    ),
    causes: [
      c('Weak or dead battery', 'નબળી કે ખતમ બેટરી', 'कमज़ोर या खत्म बैटरी'),
      c('Wrong keyboard layout', 'ખોટું કીબોર્ડ લેઆઉટ', 'गलत कीबोर्ड लेआउट'),
      c('Disk is full', 'ડિસ્ક ભરેલી છે', 'डिस्क भरी है'),
    ],
    correctCause: 0,
    tests: [
      {
        label: c('Test the battery voltage', 'બેટરી વોલ્ટેજ તપાસો', 'बैटरी वोल्टेज जाँचें'),
        result: c(
          'The AA cell reads 1.05 V instead of about 1.5 V.',
          'AA સેલ 1.5 V ને બદલે 1.05 V બતાવે છે.',
          'AA सेल 1.5 V की जगह 1.05 V दिखाता है।',
        ),
      },
      {
        label: c('Test the mouse on another computer', 'બીજા કમ્પ્યુટર પર માઉસ ટેસ્ટ કરો', 'दूसरे कंप्यूटर पर माउस जाँचें'),
        result: c(
          'With a fresh battery the mouse works on both computers.',
          'નવી બેટરી સાથે માઉસ બંને કમ્પ્યુટર પર ચાલે છે.',
          'नई बैटरी के साथ माउस दोनों कंप्यूटर पर चलता है।',
        ),
      },
    ],
    fixes: [
      c('Replace the battery and clean the sensor', 'બેટરી બદલો અને સેન્સર સાફ કરો', 'बैटरी बदलें और सेंसर साफ़ करें'),
      c('Format the hard disk', 'હાર્ડ ડિસ્ક ફોર્મેટ કરો', 'हार्ड डिस्क फ़ॉर्मेट करें'),
      c('Replace the motherboard', 'મધરબોર્ડ બદલો', 'मदरबोर्ड बदलें'),
    ],
    correctFix: 0,
    explain: c(
      'A dim light and low cell voltage show the mouse is simply out of power. Battery replacement is the correct and cheapest fix.',
      'મંદ લાઇટ અને ઓછું સેલ વોલ્ટેજ દર્શાવે છે કે માઉસમાં પાવર ખતમ છે. બેટરી બદલવી સાચો અને સસ્તો ઉપાય છે.',
      'मंद लाइट और कम सेल वोल्टेज दिखाते हैं कि माउस में पावर खत्म है। बैटरी बदलना सही और सस्ता उपाय है।',
    ),
  },
  {
    id: 'ssd-not-detected',
    emoji: '💾',
    device: c('Desktop PC', 'ડેસ્કટોપ PC', 'डेस्कटॉप PC'),
    complaint: c(
      'I installed a new SSD but BIOS does not show it.',
      'મેં નવી SSD લગાવી પણ BIOS તેને બતાવતું નથી.',
      'मैंने नई SSD लगाई पर BIOS उसे नहीं दिखाता।',
    ),
    symptom: c(
      'The BIOS drive list is empty even though the SSD is physically installed.',
      'SSD ભૌતિક રીતે લગાવેલી હોવા છતાં BIOS ની ડ્રાઇવ યાદી ખાલી છે.',
      'SSD भौतिक रूप से लगी होने पर भी BIOS की ड्राइव सूची खाली है।',
    ),
    causes: [
      c('M.2 module not fully inserted or not screwed down', 'M.2 મોડ્યુલ પૂરું દાખલ નથી કે સ્ક્રૂ થયેલું નથી', 'M.2 मॉड्यूल पूरा नहीं लगा या स्क्रू नहीं हुआ'),
      c('The keyboard is disconnected', 'કીબોર્ડ ડિસકનેક્ટ છે', 'कीबोर्ड डिस्कनेक्ट है'),
      c('The monitor is off', 'મોનિટર બંધ છે', 'मॉनिटर बंद है'),
    ],
    correctCause: 0,
    tests: [
      {
        label: c('Reseat the M.2 drive in the slot', 'M.2 ડ્રાઇવ સ્લોટમાં ફરી બેસાડો', 'M.2 ड्राइव स्लॉट में फिर लगाएँ'),
        result: c(
          'The drive was inserted at an angle; after a proper reseat the BIOS lists it.',
          'ડ્રાઇવ તિરછી રીતે દાખલ થઈ હતી; યોગ્ય રીતે ફરી બેસાડતાં BIOS તેને બતાવે છે.',
          'ड्राइव तिरछी लगी थी; ठीक से फिर लगाने पर BIOS उसे दिखाता है।',
        ),
      },
      {
        label: c('Check BIOS storage mode', 'BIOS સ્ટોરેજ મોડ તપાસો', 'BIOS स्टोरेज मोड जाँचें'),
        result: c(
          'NVMe mode is enabled and the drive appears as a boot option.',
          'NVMe મોડ ચાલુ છે અને ડ્રાઇવ બૂટ વિકલ્પ તરીકે દેખાય છે.',
          'NVMe मोड चालू है और ड्राइव बूट विकल्प के रूप में दिखती है।',
        ),
      },
    ],
    fixes: [
      c('Reseat the M.2 SSD and secure the screw, then check BIOS', 'M.2 SSD ફરી બેસાડો, સ્ક્રૂ કસો અને BIOS તપાસો', 'M.2 SSD फिर लगाएँ, स्क्रू कसें और BIOS जाँचें'),
      c('Replace the CPU', 'CPU બદલો', 'CPU बदलें'),
      c('Reinstall the monitor driver', 'મોનિટર ડ્રાઇવર ફરી ઇન્સ્ટોલ કરો', 'मॉनिटर ड्राइवर फिर इंस्टॉल करें'),
    ],
    correctFix: 0,
    explain: c(
      'M.2 drives must sit fully in the connector and be held flat by the screw. An angled module has no reliable contact, so BIOS cannot detect it.',
      'M.2 ડ્રાઇવ કનેક્ટરમાં પૂરી બેસવી જોઈએ અને સ્ક્રૂથી સપાટ રહેવી જોઈએ. તિરછું મોડ્યુલ વિશ્વસનીય સંપર્ક આપતું નથી, તેથી BIOS શોધી શકતું નથી.',
      'M.2 ड्राइव कनेक्टर में पूरी बैठनी चाहिए और स्क्रू से सपाट रहनी चाहिए। तिरछा मॉड्यूल भरोसेमंद संपर्क नहीं देता, इसलिए BIOS नहीं पहचानता।',
    ),
  },
  {
    id: 'overheating',
    emoji: '🔥',
    device: c('Laptop', 'લેપટોપ', 'लैपटॉप'),
    complaint: c(
      'My laptop becomes very hot and shuts down while gaming.',
      'ગેમ રમતી વખતે મારું લેપટોપ ખૂબ ગરમ થાય અને બંધ થઈ જાય છે.',
      'गेम खेलते समय मेरा लैपटॉप बहुत गर्म होकर बंद हो जाता है।',
    ),
    symptom: c(
      'The fan is loud, the base is hot and the system shuts down after 15 minutes.',
      'ફેન મોટો અવાજ કરે છે, નીચેનો ભાગ ગરમ છે અને 15 મિનિટ પછી સિસ્ટમ બંધ થાય છે.',
      'फैन तेज़ आवाज़ करता, नीचे का हिस्सा गर्म और 15 मिनट बाद सिस्टम बंद हो जाता है।',
    ),
    causes: [
      c('Dust-blocked heatsink and dried thermal paste', 'ધૂળથી ભરાયેલો હીટસિંક અને સૂકાયેલી થર્મલ પેસ્ટ', 'धूल से भरा हीटसिंक और सूखा थर्मल पेस्ट'),
      c('The webcam is disabled', 'વેબકેમ બંધ છે', 'वेबकैम बंद है'),
      c('The mouse is wireless', 'માઉસ વાયરલેસ છે', 'माउस वायरलेस है'),
    ],
    correctCause: 0,
    tests: [
      {
        label: c('Read CPU temperature and fan speed', 'CPU તાપમાન અને ફેન ગતિ વાંચો', 'CPU तापमान और फैन गति पढ़ें'),
        result: c(
          'The CPU reaches 97 °C within minutes and then throttles down.',
          'CPU મિનિટોમાં 97 °C પહોંચે છે અને પછી થ્રોટલ થાય છે.',
          'CPU मिनटों में 97 °C पहुँचता और फिर थ्रॉटल होता है।',
        ),
      },
      {
        label: c('Inspect the heatsink fins and vents', 'હીટસિંક ફિન અને વેન્ટ તપાસો', 'हीटसिंक फिन और वेंट जाँचें'),
        result: c(
          'The exhaust is blocked by dust and the paste has dried to a crust.',
          'એક્ઝોસ્ટ ધૂળથી બ્લોક છે અને પેસ્ટ સૂકાઈને પપડી બની છે.',
          'एग्ज़ॉस्ट धूल से बंद है और पेस्ट सूखकर परत बन गया है।',
        ),
      },
    ],
    fixes: [
      c('Clean the vents, replace thermal paste and use a hard flat surface', 'વેન્ટ સાફ કરો, થર્મલ પેસ્ટ બદલો અને સખત સપાટી પર વાપરો', 'वेंट साफ़ करें, थर्मल पेस्ट बदलें और सख़्त सपाट सतह पर रखें'),
      c('Install a new operating system', 'નવી ઓપરેટિંગ સિસ્ટમ ઇન્સ્ટોલ કરો', 'नया ऑपरेटिंग सिस्टम इंस्टॉल करें'),
      c('Increase the screen brightness', 'સ્ક્રીનની તેજસ્વીતા વધારો', 'स्क्रीन की चमक बढ़ाएँ'),
    ],
    correctFix: 0,
    explain: c(
      'High temperature plus a dusty heatsink proves a cooling problem. Cleaning airflow and renewing thermal paste restores normal temperatures; software changes cannot remove heat.',
      'ઊંચું તાપમાન અને ધૂળવાળો હીટસિંક કૂલિંગ સમસ્યા સાબિત કરે છે. એરફ્લો સફાઈ અને નવી થર્મલ પેસ્ટ સામાન્ય તાપમાન પાછું લાવે; સોફ્ટવેર ફેરફાર ગરમી દૂર ન કરે.',
      'अधिक तापमान और धूल भरा हीटसिंक कूलिंग समस्या साबित करते हैं। एयरफ़्लो सफ़ाई और नया थर्मल पेस्ट सामान्य तापमान लौटाता; सॉफ़्टवेयर बदलाव गर्मी नहीं हटाते।',
    ),
  },
  {
    id: 'no-internet',
    emoji: '📡',
    device: c('Home Network', 'ઘરનું નેટવર્ક', 'घर का नेटवर्क'),
    complaint: c(
      'The internet stopped working on all my devices since morning.',
      'સવારથી મારા બધા ઉપકરણો પર ઇન્ટરનેટ બંધ છે.',
      'सुबह से मेरे सभी उपकरणों पर इंटरनेट बंद है।',
    ),
    symptom: c(
      'Wi-Fi connects but pages do not open; the router WAN LED is red.',
      'Wi-Fi જોડાય છે પણ પેજ ખૂલતાં નથી; રાઉટરની WAN LED લાલ છે.',
      'Wi-Fi जुड़ता है पर पेज नहीं खुलते; राउटर की WAN LED लाल है।',
    ),
    causes: [
      c('ISP link down or loose WAN cable', 'ISP લિંક બંધ કે ઢીલું WAN કેબલ', 'ISP लिंक बंद या ढीली WAN केबल'),
      c('The printer is offline', 'પ્રિન્ટર ઓફલાઇન છે', 'प्रिंटर ऑफ़लाइन है'),
      c('The mouse battery is low', 'માઉસની બેટરી ઓછી છે', 'माउस की बैटरी कम है'),
    ],
    correctCause: 0,
    tests: [
      {
        label: c('Check WAN cable and router status', 'WAN કેબલ અને રાઉટર સ્ટેટસ તપાસો', 'WAN केबल और राउटर स्टेटस जाँचें'),
        result: c(
          'The WAN cable is loose and the router log shows "no link".',
          'WAN કેબલ ઢીલું છે અને રાઉટર લોગ "no link" બતાવે છે.',
          'WAN केबल ढीली है और राउटर लॉग "no link" दिखाता है।',
        ),
      },
      {
        label: c('Ping the router and a public site', 'રાઉટર અને પબ્લિક સાઇટને પિંગ કરો', 'राउटर और पब्लिक साइट को पिंग करें'),
        result: c(
          'The router replies locally but no external address responds.',
          'રાઉટર સ્થાનિક રીતે જવાબ આપે પણ બહારનું સરનામું જવાબ ન આપે.',
          'राउटर स्थानीय रूप से जवाब देता पर बाहरी पता जवाब नहीं देता।',
        ),
      },
    ],
    fixes: [
      c('Secure the WAN cable, restart the router/modem and confirm with the ISP', 'WAN કેબલ કસો, રાઉટર/મોડેમ ફરી ચાલુ કરો અને ISP સાથે ખાતરી કરો', 'WAN केबल कसें, राउटर/मॉडेम फिर चालू करें और ISP से पुष्टि करें'),
      c('Buy a new printer', 'નવું પ્રિન્ટર ખરીદો', 'नया प्रिंटर खरीदें'),
      c('Reinstall Windows on every device', 'દરેક ઉપકરણ પર Windows ફરી ઇન્સ્ટોલ કરો', 'हर उपकरण पर Windows फिर इंस्टॉल करें'),
    ],
    correctFix: 0,
    explain: c(
      'All devices failing at once with a red WAN LED points to the upstream link, not the devices. Restoring the WAN connection and confirming with the ISP is the correct repair.',
      'બધા ઉપકરણ એક સાથે બંધ થવા અને લાલ WAN LED અપસ્ટ્રીમ લિંક તરફ ઈશારો કરે છે, ઉપકરણ તરફ નહીં. WAN કનેક્શન પાછું લાવવું અને ISP સાથે ખાતરી કરવી સાચી રિપેર છે.',
      'सभी उपकरण एक साथ बंद होना और लाल WAN LED अपस्ट्रीम लिंक की ओर इशारा करते हैं, उपकरणों की ओर नहीं। WAN कनेक्शन बहाल करना और ISP से पुष्टि करना सही रिपेयर है।',
    ),
  },
  {
    id: 'led-circuit',
    emoji: '💡',
    device: c('LED Circuit Board', 'LED સર્કિટ બોર્ડ', 'LED सर्किट बोर्ड'),
    complaint: c(
      'My LED circuit on the breadboard does not light up.',
      'બ્રેડબોર્ડ પરનું મારું LED સર્કિટ લાઇટ થતું નથી.',
      'ब्रेडबोर्ड पर मेरा LED सर्किट नहीं जलता।',
    ),
    symptom: c(
      'The battery is new but the LED stays dark.',
      'બેટરી નવી છે પણ LED કાળો જ રહે છે.',
      'बैटरी नई है पर LED काला ही रहता है।',
    ),
    causes: [
      c('LED connected with reversed polarity and no series resistor', 'LED ઊંધી ધ્રુવીયતા સાથે જોડાયું છે અને શ્રેણી રેઝિસ્ટર નથી', 'LED उलटी ध्रुवता से जुड़ा है और श्रेणी रेज़िस्टर नहीं है'),
      c('The battery is in the wrong room', 'બેટરી ખોટા રૂમમાં છે', 'बैटरी गलत कमरे में है'),
      c('The breadboard is the wrong colour', 'બ્રેડબોર્ડનો રંગ ખોટો છે', 'ब्रेडबोर्ड का रंग गलत है'),
    ],
    correctCause: 0,
    tests: [
      {
        label: c('Check LED polarity with a multimeter', 'મલ્ટિમીટરથી LED ધ્રુવીયતા તપાસો', 'मल्टीमीटर से LED ध्रुवता जाँचें'),
        result: c(
          'The anode and cathode are reversed; no resistor is present in the loop.',
          'એનોડ અને કેથોડ ઊંધા છે; લૂપમાં કોઈ રેઝિસ્ટર નથી.',
          'एनोड और कैथोड उलटे हैं; लूप में कोई रेज़िस्टर नहीं है।',
        ),
      },
      {
        label: c('Measure continuity of the wires', 'વાયરની કન્ટિન્યુટી માપો', 'तारों की कंटिन्यूटी मापें'),
        result: c(
          'All jumper wires have continuity and the supply reads 9 V.',
          'બધા જમ્પર વાયરમાં કન્ટિન્યુટી છે અને સપ્લાય 9 V બતાવે છે.',
          'सभी जंपर तारों में कंटिन्यूटी है और सप्लाई 9 V दिखाती है।',
        ),
      },
    ],
    fixes: [
      c('Reverse the LED and add a 330 Ω series resistor', 'LED ઊંધું કરો અને 330 Ω શ્રેણી રેઝિસ્ટર ઉમેરો', 'LED उलटा करें और 330 Ω श्रेणी रेज़िस्टर जोड़ें'),
      c('Use a 12 V car battery', '12 V કાર બેટરી વાપરો', '12 V कार बैटरी लगाएँ'),
      c('Connect the LED directly to mains supply', 'LED સીધું મેઇન્સ સપ્લાય સાથે જોડો', 'LED सीधे मेन्स सप्लाई से जोड़ें'),
    ],
    correctFix: 0,
    explain: c(
      'An LED has polarity and needs a current-limiting resistor. Reversing it lights it and the resistor keeps current safe. Never connect components to mains supply in a learning lab.',
      'LED માં ધ્રુવીયતા હોય છે અને કરંટ મર્યાદિત કરતું રેઝિસ્ટર જરૂરી છે. ઊંધું કરવાથી તે ચાલુ થાય અને રેઝિસ્ટર કરંટ સુરક્ષિત રાખે. લેબમાં ક્યારેય મેઇન્સ સપ્લાય સાથે ઘટક ન જોડો.',
      'LED में ध्रुवता होती है और करंट सीमित करने वाला रेज़िस्टर ज़रूरी है। उलटा करने से वह जलता और रेज़िस्टर करंट सुरक्षित रखता। लैब में कभी मेन्स सप्लाई से घटक न जोड़ें।',
    ),
  },
  {
    id: 'usb-not-recognized',
    emoji: '🔌',
    device: c('External USB Drive', 'એક્સટર્નલ USB ડ્રાઇવ', 'एक्सटर्नल USB ड्राइव'),
    complaint: c(
      'My pen drive is not recognized on this computer.',
      'આ કમ્પ્યુટર પર મારી પેન ડ્રાઇવ ઓળખાતી નથી.',
      'इस कंप्यूटर पर मेरी पेन ड्राइव नहीं पहचानी जाती।',
    ),
    symptom: c(
      'Windows plays the connect sound but no drive letter appears.',
      'Windows કનેક્ટ થવાનો અવાજ કરે છે પણ ડ્રાઇવ લેટર દેખાતું નથી.',
      'Windows कनेक्ट होने की आवाज़ करता है पर ड्राइव लेटर नहीं दिखता।',
    ),
    causes: [
      c('Missing drive letter / driver or faulty USB port', 'ડ્રાઇવ લેટર / ડ્રાઇવર ખૂટે છે કે USB પોર્ટ ખામીયુક્ત છે', 'ड्राइव लेटर / ड्राइवर नहीं है या USB पोर्ट खराब है'),
      c('The monitor is too bright', 'મોનિટર ખૂબ તેજસ્વી છે', 'मॉनिटर बहुत चमकीला है'),
      c('The CPU fan is slow', 'CPU ફેન ધીમો છે', 'CPU फैन धीमा है'),
    ],
    correctCause: 0,
    tests: [
      {
        label: c('Try another port and computer', 'બીજો પોર્ટ અને કમ્પ્યુટર વાપરો', 'दूसरा पोर्ट और कंप्यूटर आज़माएँ'),
        result: c(
          'The drive is detected on another PC, so the drive itself is healthy.',
          'ડ્રાઇવ બીજા PC પર ઓળખાય છે, તેથી ડ્રાઇવ સારી છે.',
          'ड्राइव दूसरे PC पर पहचानी जाती है, इसलिए ड्राइव ठीक है।',
        ),
      },
      {
        label: c('Open Disk Management', 'ડિસ્ક મેનેજમેન્ટ ખોલો', 'डिस्क मैनेजमेंट खोलें'),
        result: c(
          'The volume appears without a drive letter.',
          'વોલ્યુમ ડ્રાઇવ લેટર વગર દેખાય છે.',
          'वॉल्यूम ड्राइव लेटर के बिना दिखता है।',
        ),
      },
    ],
    fixes: [
      c('Assign a drive letter and update the USB driver', 'ડ્રાઇવ લેટર અસાઇન કરો અને USB ડ્રાઇવર અપડેટ કરો', 'ड्राइव लेटर असाइन करें और USB ड्राइवर अपडेट करें'),
      c('Format the drive without backup', 'બેકઅપ વગર ડ્રાઇવ ફોર્મેટ કરો', 'बैकअप के बिना ड्राइव फ़ॉर्मेट करें'),
      c('Replace the CPU', 'CPU બદલો', 'CPU बदलें'),
    ],
    correctFix: 0,
    explain: c(
      'A drive that appears in Disk Management without a letter is a software mapping issue, not a dead drive. Assigning a letter keeps your data; formatting would erase it.',
      'ડિસ્ક મેનેજમેન્ટમાં લેટર વગર દેખાતી ડ્રાઇવ સોફ્ટવેર મેપિંગ સમસ્યા છે, ખરાબ ડ્રાઇવ નહીં. લેટર અસાઇન કરવાથી ડેટા રહે; ફોર્મેટ કરવાથી જાય.',
      'डिस्क मैनेजमेंट में लेटर के बिना दिखने वाली ड्राइव सॉफ़्टवेयर मैपिंग समस्या है, खराब ड्राइव नहीं। लेटर असाइन करने से डेटा रहता; फ़ॉर्मेट करने से चला जाता।',
    ),
  },
];
