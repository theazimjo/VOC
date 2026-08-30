// "Sitsiliya tili A1" course — a parallel vocabulary + grammar + reading +
// listening curriculum (0 -> A1), built on the same months/units engine as
// Essential 3000 (see essential3000.js and coursesCatalog.js). Each unit's
// `words` are seeded into the learner's real word bank by WordsStage on
// first visit (topic-tagged with the unit title), so the existing SRS/
// mastery/pronunciation system just works — grammar/reading/listening are
// sequential quiz-gated stages (MiniQuiz), unlocking in that order.
//
// Pronunciation throughout uses the Italian TTS voice ('it-IT' on the pack,
// 'it-IT-ElsaNeural' for listening scripts) as the closest available voice —
// see the "sicilian-essentials" market pack for the fuller rationale (no
// browser or Edge neural voice covers Sicilian itself).
//
// Grammar questions reuse the exact same question banks already written and
// verified for the standalone Grammar module (src/data/sicilianGrammarData.js)
// wherever a matching topic exists there, instead of re-deriving the same
// facts a second time — one source of truth per grammar point.

import { sicilianGrammarData } from './sicilianGrammarData';

function grammarQuestionsFor(...topicIds) {
  const allTopics = [...sicilianGrammarData.beginner.topics, ...sicilianGrammarData.intermediate.topics];
  return topicIds.flatMap((id) => allTopics.find((t) => t.id === id)?.questions || []);
}

// ─────────────────────────────────────────────────────────────────────────
// WEEK 1 — Boshlash (salomlashish, olmoshlar)
// ─────────────────────────────────────────────────────────────────────────

const week1Words = [
  { word: 'Bongiornu', translation: 'salom, xayrli kun', definition: "Kun davomida uchrashganda aytiladigan salomlashish so'zi.", example: 'Bongiornu, comu stai?', partOfSpeech: 'interjection' },
  { word: 'Bonasira', translation: 'xayrli kech', definition: 'Kechqurun uchrashganda aytiladigan salomlashish iborasi.', example: 'Bonasira, comu va?', partOfSpeech: 'interjection' },
  { word: 'Bonanotti', translation: 'xayrli tun', definition: "Kechasi xayrlashganda yoki uxlashdan oldin aytiladigan ibora.", example: 'Bonanotti, dormi beni.', partOfSpeech: 'interjection' },
  { word: 'Ciau', translation: 'salom, xayr', definition: "Norasmiy holatda hello va bye ma'nosida ishlatiladigan so'z.", example: 'Ciau, ni videmu dumani.', partOfSpeech: 'interjection' },
  { word: 'Addiu', translation: 'xayr (uzoq muddatga)', definition: "Uzoq vaqt ajralishda aytiladigan xayrlashish so'zi.", example: 'Addiu, amicu miu.', partOfSpeech: 'interjection' },
  { word: 'Grazii', translation: 'rahmat', definition: "Minnatdorchilik bildirish uchun ishlatiladigan so'z.", example: 'Grazii assai pi tuttu.', partOfSpeech: 'interjection' },
  { word: 'Pi favuri', translation: 'iltimos', definition: 'Iltimos qilishda ishlatiladigan ibora.', example: "Datimi n'autra fedda, pi favuri.", partOfSpeech: 'interjection' },
  { word: 'Scusati', translation: 'kechirasiz', definition: "Kechirim so'rash yoki e'tiborni jalb qilish uchun ishlatiladi.", example: 'Scusati, chi ura è?', partOfSpeech: 'interjection' },
  { word: 'Sì', translation: 'ha', definition: "Tasdiqlash uchun ishlatiladigan so'z.", example: 'Sì, vegnu cu tia.', partOfSpeech: 'adverb' },
  { word: 'No', translation: "yo'q", definition: "Inkor qilish uchun ishlatiladigan so'z.", example: "No, nun è veru.", partOfSpeech: 'adverb' },
  { word: 'iu', translation: 'men', definition: 'Gapiruvchi shaxsni bildiruvchi olmosh.', example: 'Iu sugnu sicilianu.', partOfSpeech: 'pronoun' },
  { word: 'tu', translation: 'sen', definition: 'Suhbatdoshni bildiruvchi olmosh.', example: 'Tu si simpaticu.', partOfSpeech: 'pronoun' },
  { word: 'iddu', translation: 'u (erkak)', definition: 'Erkak jinsidagi uchinchi shaxsni bildiruvchi olmosh.', example: 'Iddu è me frati.', partOfSpeech: 'pronoun' },
  { word: 'idda', translation: 'u (ayol)', definition: 'Ayol jinsidagi uchinchi shaxsni bildiruvchi olmosh.', example: 'Idda è me soru.', partOfSpeech: 'pronoun' },
  { word: 'nuautri', translation: 'biz', definition: 'Gapiruvchi va boshqalarni bildiruvchi olmosh.', example: 'Nuautri semu amici.', partOfSpeech: 'pronoun' },
  { word: 'vuautri', translation: 'sizlar', definition: 'Suhbatdoshlar guruhini bildiruvchi olmosh.', example: 'Vuautri siti simpatici.', partOfSpeech: 'pronoun' },
  { word: 'iddi', translation: 'ular', definition: 'Uchinchi shaxslar guruhini bildiruvchi olmosh.', example: 'Iddi sunnu studenti.', partOfSpeech: 'pronoun' },
  { word: 'nomu', translation: 'ism', definition: "Odamning ismini bildiruvchi so'z.", example: 'Chi nomu hai?', partOfSpeech: 'noun' },
  { word: 'paisi', translation: 'mamlakat, yurt', definition: "Kishi tug'ilgan yoki yashaydigan mamlakat/qishloq-shahar.", example: 'Di chi paisi si?', partOfSpeech: 'noun' },
  { word: 'città', translation: 'shahar', definition: "Ko'p odamlar yashaydigan katta aholi punkti.", example: "Palermu è 'na città bedda.", partOfSpeech: 'noun' },
];

const week1Grammar = {
  questions: [
    { id: 1, text: 'Kimdir bilan birinchi marta ertalab/kunduzi uchrashganda nima deyiladi?', options: ['Bonasira', 'Bongiornu', 'Bonanotti', 'Addiu'], correct: 1, explanation: 'Bongiornu — kun davomida ishlatiladigan salomlashish.' },
    { id: 2, text: 'Kechqurun uchrashganda qanday salomlashiladi?', options: ['Bongiornu', 'Bonasira', 'Ciau', 'Grazii'], correct: 1, explanation: 'Bonasira — kechqurungi salomlashish.' },
    { id: 3, text: 'Uxlashdan oldin nima deyiladi?', options: ['Bonanotti', 'Bongiornu', 'Scusati', 'Sì'], correct: 0, explanation: 'Bonanotti — xayrli tun.' },
    { id: 4, text: "Norasmiy holatda ham salom, ham xayr ma'nosida ishlatiladigan so'z?", options: ['Addiu', 'Ciau', 'Grazii', 'No'], correct: 1, explanation: "Ciau ikkala ma'noda ham ishlatiladi." },
    { id: 5, text: 'Minnatdorchilik bildirish uchun ishlatiladigan so\'z?', options: ['Scusati', 'Pi favuri', 'Grazii', 'Sì'], correct: 2, explanation: 'Grazii — rahmat.' },
    { id: 6, text: 'Iltimos qilishda ishlatiladigan ibora?', options: ['Pi favuri', 'Grazii', 'No', 'Sì'], correct: 0, explanation: 'Pi favuri — iltimos.' },
    { id: 7, text: "Kechirim so'rash uchun ishlatiladigan so'z?", options: ['Scusati', 'Ciau', 'Addiu', 'Sì'], correct: 0, explanation: 'Scusati — kechirasiz.' },
    { id: 8, text: "Tasdiqlash uchun ishlatiladigan so'z?", options: ['No', 'Sì', 'Scusati', 'Ciau'], correct: 1, explanation: 'Sì — ha.' },
    { id: 9, text: "Inkor qilish uchun ishlatiladigan so'z?", options: ['Sì', 'No', 'Grazii', 'Pi favuri'], correct: 1, explanation: "No — yo'q." },
    { id: 10, text: "'Men' ma'nosini bildiruvchi olmosh?", options: ['tu', 'iu', 'iddu', 'nuautri'], correct: 1, explanation: 'iu — men.' },
    { id: 11, text: "'Sen' ma'nosini bildiruvchi olmosh?", options: ['iu', 'tu', 'idda', 'iddi'], correct: 1, explanation: 'tu — sen.' },
    { id: 12, text: "'U (erkak)' ma'nosini bildiruvchi olmosh?", options: ['iddu', 'idda', 'tu', 'iu'], correct: 0, explanation: 'iddu — u (erkak).' },
    { id: 13, text: "'U (ayol)' ma'nosini bildiruvchi olmosh?", options: ['iddu', 'idda', 'iu', 'tu'], correct: 1, explanation: 'idda — u (ayol).' },
    { id: 14, text: "'Biz' ma'nosini bildiruvchi olmosh?", options: ['vuautri', 'nuautri', 'iddi', 'tu'], correct: 1, explanation: 'nuautri — biz.' },
    { id: 15, text: "'Sizlar' ma'nosini bildiruvchi olmosh?", options: ['nuautri', 'vuautri', 'iddi', 'iu'], correct: 1, explanation: 'vuautri — sizlar.' },
    { id: 16, text: "'Ular' ma'nosini bildiruvchi olmosh?", options: ['iddi', 'iddu', 'idda', 'tu'], correct: 0, explanation: 'iddi — ular.' },
    { id: 17, text: "'Ism' sitsiliyacha qanday bo'ladi?", options: ['paisi', 'città', 'nomu', 'casa'], correct: 2, explanation: 'nomu — ism.' },
    { id: 18, text: "'Mamlakat/yurt' sitsiliyacha qanday bo'ladi?", options: ['nomu', 'paisi', 'città', 'casa'], correct: 1, explanation: 'paisi — mamlakat/yurt.' },
    { id: 19, text: "'Shahar' sitsiliyacha qanday bo'ladi?", options: ['paisi', 'nomu', 'città', 'casa'], correct: 2, explanation: 'città — shahar.' },
    { id: 20, text: "Sitsiliyachada oddiy gap tuzilishi asosan qanday tartibda bo'ladi?", options: ["Fe'l + Ega + To'ldiruvchi", "Ega + Fe'l + To'ldiruvchi", "To'ldiruvchi + Ega + Fe'l", "Tartib erkin, farqi yo'q"], correct: 1, explanation: "Sitsiliyachada ham, o'zbek va ingliz kabi, asosiy tartib Ega+Fe'l+To'ldiruvchi." },
  ],
};

const week1Reading = {
  title: "Piccolu 'ncontru",
  pages: [
    [
      { type: 'heading', text: "Piccolu 'ncontru" },
      { type: 'p', text: 'Peppi: Bongiornu! Comu ti chiami?' },
      { type: 'p', text: 'Maria: Bongiornu! Iu mi chiamu Maria. E tu?' },
      { type: 'p', text: 'Peppi: Iu mi chiamu Peppi. Piaciri!' },
    ],
    [
      { type: 'p', text: 'Maria: Piaciri! Di unni si, Peppi?' },
      { type: 'p', text: 'Peppi: Iu sugnu di Palermu. E tu, di chi paisi si?' },
      { type: 'p', text: 'Maria: Iu sugnu di Catania.' },
    ],
    [
      { type: 'p', text: 'Peppi: Bedda città, Catania!' },
      { type: 'p', text: 'Maria: Grazii! Bonu, ni videmu dumani. Addiu!' },
      { type: 'p', text: 'Peppi: Addiu, Maria! Bonanotti!' },
    ],
  ],
  questions: [
    { id: 1, text: 'Maria ismini birinchi marta kimga aytadi?', options: ['Peppiga', "O'ziga", 'Hech kimga', 'Onasiga'], correct: 0 },
    { id: 2, text: 'Peppi qaysi shahardan ekanini aytadi?', options: ['Catania', 'Palermu', 'Roma', 'Messina'], correct: 1 },
    { id: 3, text: 'Maria qaysi shahardan?', options: ['Palermu', 'Catania', 'Roma', 'Napoli'], correct: 1 },
    { id: 4, text: 'Suhbat oxirida ular bir-biriga nima deyishadi?', options: ['Bongiornu', 'Addiu', 'Grazii', 'Sì'], correct: 1 },
    { id: 5, text: "'Piaciri' so'zi qachon aytiladi?", options: ['Xayrlashganda', 'Birinchi marta tanishganda', 'Ovqatlanishda', 'Uxlashdan oldin'], correct: 1 },
  ],
};

const week1Listening = {
  title: 'Chi sugnu?',
  voice: 'it-IT-ElsaNeural',
  script: "Bongiornu a tutti! Iu mi chiamu Rosa. Sugnu di Sarausa, 'na bedda città 'n Sicilia. Aju vint'anni e sugnu studentissa. Me matri si chiama Anna, e me patri si chiama Turi. Nuautri stamu 'nsemmula 'nta 'na casa bedda. A tutti vuautri, grazii pi m'aviri ascutatu. Ni videmu prestu! Addiu!",
  questions: [
    { id: 1, text: 'Gapiruvchining ismi nima?', options: ['Maria', 'Rosa', 'Anna', 'Turi'], correct: 1 },
    { id: 2, text: 'U qaysi shahardan?', options: ['Palermu', 'Catania', 'Sarausa', 'Messina'], correct: 2 },
    { id: 3, text: 'Uning onasining ismi nima?', options: ['Rosa', 'Anna', 'Maria', 'Turi'], correct: 1 },
    { id: 4, text: 'Uning otasining ismi nima?', options: ['Peppi', 'Turi', 'Anna', 'Rosa'], correct: 1 },
    { id: 5, text: "U kim bo'lib o'qiydi?", options: ['Shifokor', "O'qituvchi", 'Talaba', 'Oshpaz'], correct: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// WEEK 2 — Essiri (bo'lmoq): kasblar, sifatlar
// ─────────────────────────────────────────────────────────────────────────

const week2Words = [
  { word: 'sicilianu', translation: 'sitsiliyalik', definition: 'Sitsiliyada tug\'ilgan yoki yashovchi kishi.', example: 'Iu sugnu sicilianu.', partOfSpeech: 'noun' },
  { word: 'omu', translation: 'erkak kishi', definition: 'Kattalashgan erkak inson.', example: 'Chiddu omu è riccu.', partOfSpeech: 'noun' },
  { word: 'fimmina', translation: 'ayol kishi', definition: 'Kattalashgan ayol inson.', example: "Idda è 'na bedda fimmina.", partOfSpeech: 'noun' },
  { word: 'dutturi', translation: 'shifokor', definition: 'Bemorlarni davolaydigan mutaxassis.', example: 'U dutturi mi visitau.', partOfSpeech: 'noun' },
  { word: 'prufissuri', translation: "o'qituvchi", definition: 'Bilim beradigan mutaxassis.', example: 'U prufissuri spiega beni.', partOfSpeech: 'noun' },
  { word: 'avvucatu', translation: 'advokat', definition: "Qonuniy ishlar bilan shug'ullanadigan mutaxassis.", example: "Parru cu l'avvucatu.", partOfSpeech: 'noun' },
  { word: 'cuocu', translation: 'oshpaz', definition: 'Ovqat tayyorlaydigan mutaxassis.', example: "U cuocu prepara 'nu piattu spiciali.", partOfSpeech: 'noun' },
  { word: 'pulizziottu', translation: 'politsiyachi', definition: "Tartibni saqlaydigan mutaxassis.", example: 'U pulizziottu ferma la machina.', partOfSpeech: 'noun' },
  { word: 'piscaturi', translation: 'baliqchi', definition: "Baliq tutish bilan shug'ullanadigan kishi.", example: 'U piscaturi nesci a mari matina prestu.', partOfSpeech: 'noun' },
  { word: 'cuntadinu', translation: 'dehqon', definition: 'Yer bilan ishlaydigan kishi.', example: 'U cuntadinu semina u granu.', partOfSpeech: 'noun' },
  { word: 'grandi', translation: 'katta', definition: "O'lchami yoki hajmi kattaligini bildiradi.", example: "Chista è 'na casa grandi.", partOfSpeech: 'adjective' },
  { word: 'nicu', translation: 'kichik', definition: "O'lchami yoki hajmi kichikligini bildiradi.", example: 'U cani è nicu.', partOfSpeech: 'adjective' },
  { word: 'beddu', translation: 'chiroyli', definition: 'Ko\'rinishi yoqimli ekanini bildiradi.', example: 'Chi bedda jurnata!', partOfSpeech: 'adjective' },
  { word: 'bruttu', translation: 'xunuk', definition: "Ko'rinishi yoqimsiz ekanini bildiradi.", example: 'Stu tempu è bruttu.', partOfSpeech: 'adjective' },
  { word: 'bonu', translation: 'yaxshi', definition: "Sifati yoki holati yaxshi ekanini bildiradi.", example: 'Stu pani è bonu.', partOfSpeech: 'adjective' },
  { word: 'malu', translation: 'yomon', definition: "Sifati yoki holati yomon ekanini bildiradi.", example: "Havi 'nu malu jornu.", partOfSpeech: 'adjective' },
  { word: 'novu', translation: 'yangi', definition: "Yaqinda paydo bo'lgan yoki ishlab chiqarilganini bildiradi.", example: "Aju 'na machina nova.", partOfSpeech: 'adjective' },
  { word: 'vecchiu', translation: 'eski', definition: "Ko'p vaqt o'tganini bildiradi.", example: "Chista è 'na casa vecchia.", partOfSpeech: 'adjective' },
  { word: 'longu', translation: 'uzun', definition: 'Uzunligi katta ekanini bildiradi.', example: 'Havi i capiddi longhi.', partOfSpeech: 'adjective' },
  { word: 'curtu', translation: 'qisqa', definition: 'Uzunligi kichik ekanini bildiradi.', example: 'Sti pantaluni su curti.', partOfSpeech: 'adjective' },
];

const week2Grammar = {
  questions: [
    ...grammarQuestionsFor('scn-essiri'),
    { id: 101, text: "'Shifokor' sitsiliyacha so'zi?", options: ['dutturi', 'prufissuri', 'avvucatu', 'cuocu'], correct: 0, explanation: 'dutturi — shifokor.' },
    { id: 102, text: "'O'qituvchi' sitsiliyacha so'zi?", options: ['dutturi', 'prufissuri', 'avvucatu', 'cuocu'], correct: 1, explanation: "prufissuri — o'qituvchi." },
    { id: 103, text: "'Advokat' sitsiliyacha so'zi?", options: ['avvucatu', 'cuocu', 'pulizziottu', 'piscaturi'], correct: 0, explanation: 'avvucatu — advokat.' },
    { id: 104, text: "'Chiroyli' sifatining sitsiliyacha so'zi?", options: ['bruttu', 'beddu', 'malu', 'vecchiu'], correct: 1, explanation: 'beddu — chiroyli.' },
    { id: 105, text: "'Yangi' sifatining sitsiliyacha so'zi?", options: ['vecchiu', 'curtu', 'novu', 'longu'], correct: 2, explanation: 'novu — yangi.' },
  ],
};

const week2Reading = {
  title: 'Cu sugnu?',
  pages: [
    [
      { type: 'heading', text: 'Cu sugnu?' },
      { type: 'p', text: 'Turi: Bongiornu! Iu sugnu Turi. Sugnu sicilianu, di Catania.' },
      { type: 'p', text: 'Turi: Sugnu dutturi. U me travagghiu è bellu.' },
    ],
    [
      { type: 'p', text: 'Anna: Iu sugnu Anna. Sugnu prufissura.' },
      { type: 'p', text: 'Anna: Sugnu nica ma sugnu forti!' },
      { type: 'p', text: 'Turi: Tu si simpatica, Anna!' },
    ],
    [
      { type: 'p', text: 'Anna: Grazii! Tu si simpaticu macari tu, Turi.' },
      { type: 'p', text: 'Turi: Nuautri semu amici ora. Piaciri!' },
    ],
  ],
  questions: [
    { id: 1, text: 'Turi kasbi nima?', options: ['prufissuri', 'dutturi', 'avvucatu', 'cuocu'], correct: 1 },
    { id: 2, text: 'Turi qaysi shahardan?', options: ['Palermu', 'Catania', 'Sarausa', 'Messina'], correct: 1 },
    { id: 3, text: 'Anna kasbi nima?', options: ['dutturi', 'prufissura', 'avvucata', 'cuoca'], correct: 1 },
    { id: 4, text: "Anna o'zini qanday tasvirlaydi?", options: ['Katta va sekin', 'Kichik va kuchli', 'Baland va sekin', 'Kichik va zaif'], correct: 1 },
    { id: 5, text: "Suhbat oxirida ular bir-birini kim deb ataydi?", options: ['Begona', "Amici (do'st)", 'Dushman', "Qo'shni"], correct: 1 },
  ],
};

const week2Listening = {
  title: 'Me famigghia travagghia',
  voice: 'it-IT-ElsaNeural',
  script: "Bongiornu! Iu sugnu Peppi e vogghiu parrari di la me famigghia. Me patri è cuntadinu, travagghia 'nta li campi ogni jornu. Me matri è dutturessa, aiuta assai genti. Me frati è studenti, ma vogghiu diri ca è macari 'nu bonu piscaturi! Tutti nuautri semu sicilianu, e semu cuntenti di la nostra famigghia. Grazii pi m'aviri ascutatu!",
  questions: [
    { id: 1, text: "Peppi'ning otasi kim bo'lib ishlaydi?", options: ['dutturi', 'cuntadinu', 'piscaturi', 'avvucatu'], correct: 1 },
    { id: 2, text: 'Onasi kim?', options: ['prufissura', 'dutturessa', 'cuoca', 'studentissa'], correct: 1 },
    { id: 3, text: 'Ukasi/akasi kim?', options: ['Faqat talaba', 'Talaba va baliqchi', 'Faqat baliqchi', 'Shifokor'], correct: 1 },
    { id: 4, text: 'Ular qanday millat?', options: ['Italianu', 'Sicilianu', 'Spagnolu', 'Francisi'], correct: 1 },
    { id: 5, text: 'Peppi oilasi haqida qanday his qiladi?', options: ["G'amgin", 'Xursand/mamnun', 'Bezovta', "Qo'rqqan"], correct: 1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// WEEK 3 — Aviri (ega bo'lmoq): oila, tana
// ─────────────────────────────────────────────────────────────────────────

const week3Words = [
  { word: 'famigghia', translation: 'oila', definition: "Bir-biriga qarindosh bo'lgan odamlar guruhi.", example: 'La me famigghia è granni.', partOfSpeech: 'noun' },
  { word: 'matri', translation: 'ona', definition: 'Bolaning ayol ota-onasi.', example: 'Me matri cucina beni.', partOfSpeech: 'noun' },
  { word: 'patri', translation: 'ota', definition: 'Bolaning erkak ota-onasi.', example: 'Me patri travagghia assai.', partOfSpeech: 'noun' },
  { word: 'soru', translation: 'opa yoki singil', definition: "Bir xil ota-onadan tug'ilgan ayol farzand.", example: 'Me soru studia medicina.', partOfSpeech: 'noun' },
  { word: 'frati', translation: 'aka yoki uka', definition: "Bir xil ota-onadan tug'ilgan erkak farzand.", example: 'Me frati joca a palluni.', partOfSpeech: 'noun' },
  { word: 'figghia', translation: 'qiz farzand', definition: 'Ota-onaning ayol farzandi.', example: 'Sò figghia va a scola.', partOfSpeech: 'noun' },
  { word: 'figghiu', translation: "o'g'il farzand", definition: 'Ota-onaning erkak farzandi.', example: 'Sò figghiu è ancora nicu.', partOfSpeech: 'noun' },
  { word: 'nanna', translation: 'buvi', definition: 'Ota yoki onaning onasi.', example: 'Me nanna cunta beddi cunti.', partOfSpeech: 'noun' },
  { word: 'nannu', translation: 'bobo', definition: 'Ota yoki onaning otasi.', example: 'Me nannu leggi u giurnali ogni jornu.', partOfSpeech: 'noun' },
  { word: 'testa', translation: 'bosh', definition: 'Tananing eng yuqori qismi.', example: 'Mi doli la testa.', partOfSpeech: 'noun' },
  { word: 'occhiu', translation: "ko'z", definition: 'Ko\'rish uchun xizmat qiladigan tana a\'zosi.', example: "Havi l'occhi virdi.", partOfSpeech: 'noun' },
  { word: 'nasu', translation: 'burun', definition: 'Nafas olish va hid bilish a\'zosi.', example: 'U nasu ci fa mali.', partOfSpeech: 'noun' },
  { word: 'vucca', translation: "og'iz", definition: "Ovqatlanish va gapirish uchun xizmat qiladigan a'zo.", example: 'Japri la vucca.', partOfSpeech: 'noun' },
  { word: 'manu', translation: "qo'l (kaft)", definition: "Bilakning uchidagi ushlash uchun ishlatiladigan qism.", example: 'Lavati li mani.', partOfSpeech: 'noun' },
  { word: 'cori', translation: 'yurak', definition: "Qonni tana bo'ylab haydaydigan a'zo.", example: 'U cori batti forti.', partOfSpeech: 'noun' },
  { word: 'deci', translation: "o'n", definition: "10 sonini bildiruvchi so'z.", example: 'Cuntu finu a deci.', partOfSpeech: 'noun' },
  { word: 'vinti', translation: 'yigirma', definition: "20 sonini bildiruvchi so'z.", example: 'Havi vinti anni.', partOfSpeech: 'noun' },
  { word: 'trenta', translation: "o'ttiz", definition: "30 sonini bildiruvchi so'z.", example: 'Havi trenta anni.', partOfSpeech: 'noun' },
  { word: 'quaranta', translation: 'qirq', definition: "40 sonini bildiruvchi so'z.", example: 'Su quaranta chilometri.', partOfSpeech: 'noun' },
  { word: 'cinquanta', translation: 'ellik', definition: "50 sonini bildiruvchi so'z.", example: 'Costa cinquanta euro.', partOfSpeech: 'noun' },
];

const week3Grammar = {
  questions: [
    ...grammarQuestionsFor('scn-aviri'),
    { id: 101, text: "'Ona' sitsiliyacha so'zi?", options: ['patri', 'matri', 'soru', 'frati'], correct: 1, explanation: 'matri — ona.' },
    { id: 102, text: "'Ota' sitsiliyacha so'zi?", options: ['matri', 'patri', 'soru', 'nannu'], correct: 1, explanation: 'patri — ota.' },
    { id: 103, text: "'Bosh' sitsiliyacha so'zi?", options: ['testa', 'occhiu', 'nasu', 'manu'], correct: 0, explanation: 'testa — bosh.' },
    { id: 104, text: "'Ko'z' sitsiliyacha so'zi?", options: ['testa', 'occhiu', 'vucca', 'cori'], correct: 1, explanation: "occhiu — ko'z." },
    { id: 105, text: "'Yurak' sitsiliyacha so'zi?", options: ['manu', 'cori', 'nasu', 'vucca'], correct: 1, explanation: 'cori — yurak.' },
  ],
};

const week3Reading = {
  title: 'A me famigghia',
  pages: [
    [
      { type: 'heading', text: 'A me famigghia' },
      { type: 'p', text: "Iu aju 'na famigghia granni." },
      { type: 'p', text: 'Aju un patri, \'na matri, e dui frati.' },
    ],
    [
      { type: 'p', text: "Me patri havi cinquanta anni. Me matri havi quaranta 'ottu anni." },
      { type: 'p', text: "Aju macari 'na nanna: idda havi uttanta anni!" },
    ],
    [
      { type: 'p', text: "Nuautri avemu 'na casa bedda cu 'nu giardinu granni." },
      { type: 'p', text: 'Semu cuntenti di la nostra famigghia.' },
    ],
  ],
  questions: [
    { id: 1, text: 'Nechta aka/uka bor?', options: ['unu', 'dui', 'tri', "nudda"], correct: 1 },
    { id: 2, text: 'Otasi necha yoshda?', options: ['quaranta', 'cinquanta', 'sissanta', 'trenta'], correct: 1 },
    { id: 3, text: 'Buvisi necha yoshda (taxminan)?', options: ['settanta', 'uttanta', 'novanta', 'sessanta'], correct: 1 },
    { id: 4, text: 'Uy qanday tasvirlangan?', options: ["Kichik va bog'siz", 'Chiroyli, katta bog\'li', 'Eski va buzuq', 'Shahar markazida'], correct: 1 },
    { id: 5, text: 'Oxirida gapiruvchi qanday his qiladi?', options: ["G'amgin", 'Xursand', 'Charchagan', 'Yolg\'iz'], correct: 1 },
  ],
};

const week3Listening = {
  title: "Aju 'na sorpresa",
  voice: 'it-IT-ElsaNeural',
  script: "Ciau! Iu aju 'na sorpresa pi vuautri! Aju vint'anni ora, è u me cumpliannu oggi! Me matri havi preparatu 'na torta granni, e me patri havi accattatu 'nu rigalu. Me soru havi sedici anni e sona la chitarra pi mia. Nuautri avemu tanti amici a la festa. Semu tutti cuntenti! Grazii pi m'aviri ascutatu!",
  questions: [
    { id: 1, text: 'Gapiruvchi necha yoshga to\'ldi?', options: ['dicianovi', 'vinti', 'vintunu', 'dicessette'], correct: 1 },
    { id: 2, text: 'Bugun nima bayrami?', options: ['Yangi yil', "Tug'ilgan kun", 'Bayram kuni', 'Maktab bayrami'], correct: 1 },
    { id: 3, text: 'Onasi nima tayyorlagan?', options: ['Non', 'Torta (tort)', 'Pizza', "Sho'rva"], correct: 1 },
    { id: 4, text: 'Singlisi necha yoshda va nima qiladi?', options: ['O\'n olti, gitara chaladi', 'O\'n sakkiz, kuylaydi', "O'n to'rt, raqsga tushadi", 'Yigirma, rasm chizadi'], correct: 0 },
    { id: 5, text: 'Umumiy kayfiyat qanday?', options: ["G'amgin", 'Xursand', 'Asabiy', 'Zerikkan'], correct: 1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// WEEK 4 — Ot tizimi: jins, ko'plik, artikllar
// ─────────────────────────────────────────────────────────────────────────

const week4Words = [
  { word: 'tavulu', translation: 'stol', definition: 'Ovqat yeyish yoki ishlash uchun mebel.', example: 'Metti u piattu supra u tavulu.', partOfSpeech: 'noun' },
  { word: 'seggia', translation: 'stul', definition: 'O\'tirish uchun ishlatiladigan mebel.', example: 'Assettati supra la seggia.', partOfSpeech: 'noun' },
  { word: 'liettu', translation: 'karavot', definition: 'Uxlash uchun ishlatiladigan mebel.', example: "Vaju a curcarimi 'nto liettu.", partOfSpeech: 'noun' },
  { word: 'tilivisioni', translation: 'televizor', definition: "Ko'rish va eshitish orqali ma'lumot beradigan qurilma.", example: "La tilivisioni è 'nto salottu.", partOfSpeech: 'noun' },
  { word: 'frigoriferu', translation: 'muzlatgich', definition: 'Ovqatni sovuqda saqlash uchun ishlatiladigan qurilma.', example: "U latti è 'nto frigoriferu.", partOfSpeech: 'noun' },
  { word: 'tilefunu', translation: 'telefon', definition: 'Masofadan gaplashish uchun ishlatiladigan qurilma.', example: 'U me tilefunu è novu.', partOfSpeech: 'noun' },
  { word: 'ralogiu', translation: 'soat', definition: 'Vaqtni ko\'rsatuvchi qurilma.', example: 'U ralogiu signa i deci.', partOfSpeech: 'noun' },
  { word: 'specchiu', translation: 'oyna', definition: "O'z aksini ko'rish uchun ishlatiladigan buyum.", example: "Si talia 'nto specchiu.", partOfSpeech: 'noun' },
  { word: 'lampa', translation: 'lampa', definition: 'Yorug\'lik beruvchi qurilma.', example: 'Addumamu la lampa.', partOfSpeech: 'noun' },
  { word: 'divanu', translation: 'divan', definition: "O'tirish yoki yotish uchun ishlatiladigan yumshoq mebel.", example: 'Ni sedemu supra u divanu.', partOfSpeech: 'noun' },
  { word: 'libbru', translation: 'kitob', definition: "Bosma sahifalardan tashkil topgan o'quv materiali.", example: "Leggiu 'nu libbru novu.", partOfSpeech: 'noun' },
  { word: 'quadernu', translation: 'daftar', definition: "Yozish uchun ishlatiladigan bo'sh varaqlar to'plami.", example: "Scrivu 'nto quadernu.", partOfSpeech: 'noun' },
  { word: 'pinna', translation: 'ruchka', definition: 'Yozish uchun ishlatiladigan asbob.', example: 'Aju pirdutu la pinna.', partOfSpeech: 'noun' },
  { word: 'matita', translation: 'qalam', definition: 'Yozish yoki chizish uchun ishlatiladigan asbob.', example: 'Disegnu cu la matita.', partOfSpeech: 'noun' },
  { word: 'lezziuni', translation: 'dars', definition: "O'qituvchi tomonidan o'tkaziladigan ta'lim mashg'uloti.", example: 'La lezziuni accumincia a li novi.', partOfSpeech: 'noun' },
  { word: 'esami', translation: 'imtihon', definition: "Bilimni tekshirish uchun o'tkaziladigan sinov.", example: 'Aju un esami dumani.', partOfSpeech: 'noun' },
  { word: 'studenti', translation: "talaba yoki o'quvchi", definition: "Ta'lim oluvchi shaxs.", example: 'Sugnu studenti universitariu.', partOfSpeech: 'noun' },
  { word: 'classi', translation: 'sinf', definition: "O'quvchilar dars o'tadigan xona yoki guruh.", example: 'La classi è china di picciriddi.', partOfSpeech: 'noun' },
  { word: 'casa', translation: 'uy', definition: 'Odamlar yashaydigan bino.', example: 'Vaju a la me casa.', partOfSpeech: 'noun' },
  { word: 'scola', translation: 'maktab', definition: 'Bolalar bilim oladigan joy.', example: 'I picciriddi vannu a scola.', partOfSpeech: 'noun' },
];

const week4Grammar = {
  questions: grammarQuestionsFor('scn-articles', 'scn-noun-gender-plural'),
};

const week4Reading = {
  title: 'A me scola',
  pages: [
    [
      { type: 'heading', text: 'A me scola' },
      { type: 'p', text: 'Sta è a me scola. A classi è granni.' },
      { type: 'p', text: 'U tavulu è nìuru, e i seggi sunnu blu.' },
    ],
    [
      { type: 'p', text: "Aju un libbru, 'na pinna, e 'nu quadernu 'nto me zainu." },
      { type: 'p', text: 'A lezziuni accumincia a li novi.' },
    ],
    [
      { type: 'p', text: 'Doppu a scola, vaju a la me casa.' },
      { type: 'p', text: "A casa aju un liettu, 'na tilivisioni, e 'nu frigoriferu 'nta cucina." },
    ],
  ],
  questions: [
    { id: 1, text: 'Sinf xonasi qanday?', options: ['Kichik', 'Katta', "O'rta", "Yo'q"], correct: 1 },
    { id: 2, text: 'Stol qanday rangda?', options: ['Oq', 'Qora', "Ko'k", 'Qizil'], correct: 1 },
    { id: 3, text: 'Ryukzakda nima bor?', options: ['Faqat kitob', 'Kitob, ruchka, daftar', 'Faqat qalam', 'Hech narsa'], correct: 1 },
    { id: 4, text: 'Dars nechida boshlanadi?', options: ['Sakkizda', "To'qqizda", "O'nda", 'Yettida'], correct: 1 },
    { id: 5, text: 'Uyida nima bor deb aytiladi?', options: ['Faqat karavot', 'Karavot, televizor, muzlatgich', 'Faqat muzlatgich', 'Hech narsa aytilmagan'], correct: 1 },
  ],
};

const week4Listening = {
  title: "'Nta la me casa",
  voice: 'it-IT-ElsaNeural',
  script: "Bongiornu! Vi vogghiu mustrari a me casa. Dintra ci sunnu tanti càmmari. 'Nta la cucina c'è un tavulu grandi e quattru seggi. 'Nta la me càmmara aju un liettu, 'na tilivisioni, e 'nu specchiu. Aju macari 'nu studiu cu tanti libbra e 'na lampa pi liggiri la notti. A me casa è nica ma bedda. Grazii pi m'aviri ascutatu!",
  questions: [
    { id: 1, text: 'Oshxonada nechta stul bor?', options: ['dui', 'tri', 'quattru', 'cincu'], correct: 2 },
    { id: 2, text: 'Xonasida televizordan tashqari yana nima bor?', options: ['Faqat karavot', 'Karavot va oyna', 'Faqat oyna', 'Hech narsa'], correct: 1 },
    { id: 3, text: 'Nima uchun lampa kerak?', options: ['Ovqat pishirish', "Kechasi o'qish", 'Kiyim yuvish', 'Uxlash'], correct: 1 },
    { id: 4, text: 'Uy qanday tasvirlangan?', options: ['Katta va xunuk', 'Kichik va chiroyli', 'Katta va chiroyli', 'Kichik va xunuk'], correct: 1 },
    { id: 5, text: 'Nechta xona haqida aniq aytiladi?', options: ['Faqat oshxona', 'Oshxona va yotoqxona/studiya', 'Faqat yotoqxona', 'Beshta xona'], correct: 1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// WEEK 5 — Sifatlar
// ─────────────────────────────────────────────────────────────────────────

const week5Words = [
  { word: 'grandi', translation: 'katta', definition: "O'lchami yoki hajmi kattaligini bildiradi.", example: "Chista è 'na casa grandi.", partOfSpeech: 'adjective' },
  { word: 'nicu', translation: 'kichik', definition: "O'lchami yoki hajmi kichikligini bildiradi.", example: 'U cani è nicu.', partOfSpeech: 'adjective' },
  { word: 'beddu', translation: 'chiroyli', definition: 'Ko\'rinishi yoqimli ekanini bildiradi.', example: 'Chi bedda jurnata!', partOfSpeech: 'adjective' },
  { word: 'bruttu', translation: 'xunuk', definition: "Ko'rinishi yoqimsiz ekanini bildiradi.", example: 'Stu tempu è bruttu.', partOfSpeech: 'adjective' },
  { word: 'bonu', translation: 'yaxshi', definition: "Sifati yoki holati yaxshi ekanini bildiradi.", example: 'Stu pani è bonu.', partOfSpeech: 'adjective' },
  { word: 'malu', translation: 'yomon', definition: "Sifati yoki holati yomon ekanini bildiradi.", example: "Havi 'nu malu jornu.", partOfSpeech: 'adjective' },
  { word: 'novu', translation: 'yangi', definition: "Yaqinda paydo bo'lgan yoki ishlab chiqarilganini bildiradi.", example: "Aju 'na machina nova.", partOfSpeech: 'adjective' },
  { word: 'vecchiu', translation: 'eski', definition: "Ko'p vaqt o'tganini bildiradi.", example: "Chista è 'na casa vecchia.", partOfSpeech: 'adjective' },
  { word: 'longu', translation: 'uzun', definition: 'Uzunligi katta ekanini bildiradi.', example: 'Havi i capiddi longhi.', partOfSpeech: 'adjective' },
  { word: 'curtu', translation: 'qisqa', definition: 'Uzunligi kichik ekanini bildiradi.', example: 'Sti pantaluni su curti.', partOfSpeech: 'adjective' },
  { word: 'veloci', translation: 'tez', definition: "Harakat tezligi katta ekanini bildiradi.", example: 'Sta machina è veloci.', partOfSpeech: 'adjective' },
  { word: 'lentu', translation: 'sekin', definition: "Harakat tezligi kichik ekanini bildiradi.", example: 'U trenu è troppu lentu.', partOfSpeech: 'adjective' },
  { word: 'facili', translation: 'oson', definition: "Qiyinchiliksiz bajarilishini bildiradi.", example: "St'esami è facili.", partOfSpeech: 'adjective' },
  { word: 'difficili', translation: 'qiyin', definition: 'Katta harakat talab qilishini bildiradi.', example: 'Stu travagghiu è difficili.', partOfSpeech: 'adjective' },
  { word: 'riccu', translation: 'boy', definition: "Ko'p mol-mulkka ega ekanini bildiradi.", example: 'Chiddu omu è riccu.', partOfSpeech: 'adjective' },
  { word: 'povuru', translation: 'kambag\'al', definition: "Kam mol-mulkka ega ekanini bildiradi.", example: 'Su povuru ma cuntenti.', partOfSpeech: 'adjective' },
  { word: 'forti', translation: 'kuchli', definition: "Katta kuchga ega ekanini bildiradi.", example: 'U ventu è forti oggi.', partOfSpeech: 'adjective' },
  { word: 'chinu', translation: "to'la", definition: "Ichi to'la ekanini bildiradi.", example: 'U biccheri è chinu.', partOfSpeech: 'adjective' },
  { word: 'vacanti', translation: "bo'sh", definition: "Ichi bo'sh ekanini bildiradi.", example: 'La casa è vacanti.', partOfSpeech: 'adjective' },
  { word: 'pulitu', translation: 'toza', definition: 'Kirsiz ekanini bildiradi.', example: 'La cucina è pulita.', partOfSpeech: 'adjective' },
];

const week5Grammar = {
  questions: [
    ...grammarQuestionsFor('scn-adjectives'),
    { id: 101, text: "'Tez' sitsiliyacha so'zi?", options: ['lentu', 'veloci', 'facili', 'difficili'], correct: 1, explanation: 'veloci — tez.' },
    { id: 102, text: "'Sekin' sitsiliyacha so'zi?", options: ['veloci', 'lentu', 'forti', 'chinu'], correct: 1, explanation: 'lentu — sekin.' },
    { id: 103, text: "'Boy' sitsiliyacha so'zi?", options: ['povuru', 'riccu', 'forti', 'pulitu'], correct: 1, explanation: 'riccu — boy.' },
    { id: 104, text: "'Kambag'al' sitsiliyacha so'zi?", options: ['riccu', 'povuru', 'vacanti', 'chinu'], correct: 1, explanation: "povuru — kambag'al." },
    { id: 105, text: "'Toza' sitsiliyacha so'zi?", options: ['sucidu', 'pulitu', 'chinu', 'vacanti'], correct: 1, explanation: 'pulitu — toza.' },
  ],
};

const week5Reading = {
  title: 'Dui casi',
  pages: [
    [
      { type: 'heading', text: 'Dui casi' },
      { type: 'p', text: 'A casa di Peppi è granni e bedda.' },
      { type: 'p', text: 'È china di libbra, e ci sunnu seggi novi.' },
    ],
    [
      { type: 'p', text: 'A casa di Turi è nica ma pulita.' },
      { type: 'p', text: 'Turi dici: "A me casa è vecchia, ma è comoda."' },
    ],
    [
      { type: 'p', text: 'Peppi dici: "A to casa è nica, ma bedda macari!"' },
      { type: 'p', text: 'Turi ridi: "Grazii, tu si gintili!"' },
    ],
  ],
  questions: [
    { id: 1, text: "Peppining uyi qanday?", options: ['Kichik va eski', 'Katta va chiroyli', 'Kichik va toza', 'Katta va xunuk'], correct: 1 },
    { id: 2, text: "Turining uyi qanday?", options: ['Katta va yangi', 'Kichik va toza', 'Katta va iflos', 'Kichik va iflos'], correct: 1 },
    { id: 3, text: "'Comoda' so'zi qanday ma'noni bildiradi (kontekstdan)?", options: ['Noqulay', 'Qulay', 'Qimmat', 'Arzon'], correct: 1 },
    { id: 4, text: "Peppi Turining uyi haqida nima deydi?", options: ['Xunuk', 'Chiroyli', 'Juda katta', 'Sovuq'], correct: 1 },
    { id: 5, text: "Turi Peppiga nima deb javob beradi?", options: ["G'azablanadi", 'Rahmat aytadi', 'Jim turadi', 'Yig\'laydi'], correct: 1 },
  ],
};

const week5Listening = {
  title: 'Comu è a to casa?',
  voice: 'it-IT-ElsaNeural',
  script: "Ciau! Oggi vogghiu cuntari comu è a me casa nova. È granni e chinu di luci. I càmmari sunnu tutti puliti. U giardinu è beddu, cu tanti ciuri virdi. Prima abitava 'nta 'na casa vecchia e nica, ma ora sugnu cuntenti pirchì a casa nova è cchiù comoda. Vuliti vèniri a la visitari? Grazii pi m'aviri ascutatu!",
  questions: [
    { id: 1, text: 'Yangi uyi qanday?', options: ['Kichik va qorong\'i', "Katta va yorug'", "O'rtacha", 'Eski'], correct: 1 },
    { id: 2, text: 'Xonalar qanday?', options: ['Iflos', 'Toza', "Bo'sh", "To'la"], correct: 1 },
    { id: 3, text: 'Bog\'da nima bor?', options: ["Faqat o't", 'Yashil gullar', 'Hech narsa', 'Toshlar'], correct: 1 },
    { id: 4, text: 'Avval qanday uyda yashagan?', options: ['Katta va yangi', 'Eski va kichik', "O'rta va toza", 'Katta va eski'], correct: 1 },
    { id: 5, text: 'Hozir o\'zini qanday his qiladi?', options: ["G'amgin", 'Xursand', 'Asabiy', 'Charchagan'], correct: 1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// WEEK 6 — Egalik: oila, kiyimlar
// ─────────────────────────────────────────────────────────────────────────

const week6Words = [
  { word: 'maritu', translation: 'er', definition: 'Turmush qurgan ayolning eri.', example: 'Me maritu travagghia a Roma.', partOfSpeech: 'noun' },
  { word: 'mugghieri', translation: 'xotin', definition: 'Turmush qurgan erkakning xotini.', example: 'Me mugghieri è dutturessa.', partOfSpeech: 'noun' },
  { word: 'cuscinu', translation: 'amakivachcha (erkak)', definition: "Amaki yoki xolaning o'g'li.", example: 'Me cuscinu abbita a Catania.', partOfSpeech: 'noun' },
  { word: 'cuscina', translation: 'amakivachcha (ayol)', definition: "Amaki yoki xolaning qizi.", example: 'Me cuscina è avvucata.', partOfSpeech: 'noun' },
  { word: 'picciriddu', translation: 'bola (kichkina)', definition: 'Yosh bola.', example: "U picciriddu joca 'nto giardinu.", partOfSpeech: 'noun' },
  { word: 'cammisa', translation: 'ko\'ylak (erkaklar)', definition: 'Yuqori tanaga kiyiladigan kiyim turi.', example: "Porta 'na cammisa janca.", partOfSpeech: 'noun' },
  { word: 'pantaluni', translation: 'shim', definition: 'Ikki oyoqqa alohida kiyiladigan kiyim.', example: 'Sti pantaluni su troppu longhi.', partOfSpeech: 'noun' },
  { word: 'vistitu', translation: 'ko\'ylak (ayollar)', definition: 'Ayollar kiyadigan uzun kiyim turi.', example: 'Havi un vistitu russu.', partOfSpeech: 'noun' },
  { word: 'gonna', translation: 'yubka', definition: 'Ayollar beliga kiyadigan kiyim.', example: 'La gonna è nova.', partOfSpeech: 'noun' },
  { word: 'giacchetta', translation: 'kurtka', definition: 'Sovuqdan himoya qiladigan tashqi kiyim.', example: 'Metti la giacchetta, fa friddu.', partOfSpeech: 'noun' },
  { word: 'scarpi', translation: 'poyabzal', definition: 'Oyoqqa kiyiladigan kiyim turi.', example: 'Sti scarpi su strittii.', partOfSpeech: 'noun' },
  { word: 'cappeddu', translation: 'shlyapa', definition: 'Boshga kiyiladigan bosh kiyim.', example: "Porta un cappeddu di paglia.", partOfSpeech: 'noun' },
  { word: 'carzetti', translation: 'paypoq', definition: 'Oyoqqa poyabzaldan oldin kiyiladigan mato.', example: "Aju pirdutu 'nu carzettu.", partOfSpeech: 'noun' },
  { word: 'cappottu', translation: 'palto', definition: 'Sovuqda kiyiladigan uzun tashqi kiyim.', example: 'Metti u cappottu, jèsci friddu.', partOfSpeech: 'noun' },
  { word: 'guanti', translation: "qo'lqop", definition: "Qo'lni sovuqdan himoya qiladigan kiyim.", example: 'Metti i guanti, fa friddu.', partOfSpeech: 'noun' },
  { word: 'sciarpa', translation: 'sharf', definition: "Bo'yinga o'raladigan issiq mato.", example: "Porta 'na sciarpa di lana.", partOfSpeech: 'noun' },
  { word: 'cintura', translation: 'kamar', definition: 'Belga bog\'lanadigan kiyim aksessuari.', example: 'La cintura è di peddi.', partOfSpeech: 'noun' },
  { word: 'paracqua', translation: 'soyabon', definition: "Yomg'irdan himoya qiluvchi asbob.", example: 'Pigghia u paracqua, chiovi.', partOfSpeech: 'noun' },
  { word: 'casa', translation: 'uy', definition: 'Odamlar yashaydigan bino.', example: 'Vaju a la me casa.', partOfSpeech: 'noun' },
  { word: 'libbru', translation: 'kitob', definition: "Bosma sahifalardan tashkil topgan o'quv materiali.", example: "Leggiu 'nu libbru novu.", partOfSpeech: 'noun' },
];

const week6Grammar = {
  questions: [
    ...grammarQuestionsFor('scn-possessives'),
    { id: 101, text: "'Ko'ylak (erkak)' sitsiliyacha so'zi?", options: ['cammisa', 'pantaluni', 'gonna', 'scarpi'], correct: 0, explanation: 'cammisa — koʻylak.' },
    { id: 102, text: "'Shim' sitsiliyacha so'zi?", options: ['cammisa', 'pantaluni', 'giacchetta', 'cappottu'], correct: 1, explanation: 'pantaluni — shim.' },
    { id: 103, text: "'Poyabzal' sitsiliyacha so'zi?", options: ['scarpi', 'guanti', 'cappeddu', 'sciarpa'], correct: 0, explanation: 'scarpi — poyabzal.' },
    { id: 104, text: "'Qo'lqop' sitsiliyacha so'zi?", options: ['sciarpa', 'guanti', 'cintura', 'paracqua'], correct: 1, explanation: "guanti — qo'lqop." },
    { id: 105, text: "'Amakivachcha (erkak)' sitsiliyacha so'zi?", options: ['cuscinu', 'cuscina', 'maritu', 'ziu'], correct: 0, explanation: 'cuscinu — amakivachcha (erkak).' },
  ],
};

const week6Reading = {
  title: 'Chi vestiti hai?',
  pages: [
    [
      { type: 'heading', text: 'Chi vestiti hai?' },
      { type: 'p', text: 'Maria: Idda è a me cuscina, Lucia.' },
      { type: 'p', text: "Lucia porta 'na cammisa janca e 'na gonna russa oggi." },
    ],
    [
      { type: 'p', text: 'Maria: Iu portu pantaluni e \'na giacchetta.' },
      { type: 'p', text: "Lucia: E chi hai 'nta manu?" },
      { type: 'p', text: 'Maria: Aju \'nu paracqua, pirchì chiovi!' },
    ],
    [
      { type: 'p', text: 'Lucia: Bonu, jamuninni. Metti macari i to guanti, fa friddu!' },
      { type: 'p', text: 'Maria: Grazii, hai ragiuni!' },
    ],
  ],
  questions: [
    { id: 1, text: 'Lucia kim bilan qarindosh?', options: ['Xolasi', 'Amakivachchasi', 'Onasi', 'Singlisi'], correct: 1 },
    { id: 2, text: 'Lucia nima kiygan?', options: ["Ko'k ko'ylak", "Oq ko'ylak va qizil yubka", 'Kurtka', 'Shim'], correct: 1 },
    { id: 3, text: 'Maria qo\'lida nima ushlab turibdi?', options: ['Kitob', 'Soyabon', 'Sumka', 'Telefon'], correct: 1 },
    { id: 4, text: 'Nima uchun soyabon kerak?', options: ['Quyosh issiq', 'Yomg\'ir yog\'yapti', 'Shamol bor', 'Qor yog\'yapti'], correct: 1 },
    { id: 5, text: 'Lucia Mariyaga yana nima kiyishni maslahat beradi?', options: ['Shlyapa', "Qo'lqop", 'Poyabzal', 'Palto'], correct: 1 },
  ],
};

const week6Listening = {
  title: 'A me famigghia e i so vestiti',
  voice: 'it-IT-ElsaNeural',
  script: "Ciau! Vogghiu parrari di la me famigghia. Me maritu porta sempri 'na cammisa e pantaluni pi travagghiari. Me figghia porta 'na gonna quannu va a la scola. Iu, 'nvernu, portu sempri 'nu cappottu, 'na sciarpa, e guanti pirchì fa assai friddu. Me cuscinu porta sempri 'nu cappeddu, macari d'estati! Grazii pi m'aviri ascutatu!",
  questions: [
    { id: 1, text: 'Eri ishga nima kiyib boradi?', options: ['Kostyum', "Ko'ylak va shim", 'Sport kiyim', 'Palto'], correct: 1 },
    { id: 2, text: 'Qizi maktabga nima kiyadi?', options: ['Shim', 'Yubka', 'Kurtka', 'Palto'], correct: 1 },
    { id: 3, text: 'Qishda gapiruvchi nima kiyadi (uchtasi)?', options: ["Palto, sharf, qo'lqop", "Ko'ylak, shim, shlyapa", 'Yubka, kurtka, paypoq', 'Faqat palto'], correct: 0 },
    { id: 4, text: 'Amakivachchasi doim nima kiyadi?', options: ["Qo'lqop", 'Shlyapa', 'Sharf', 'Palto'], correct: 1 },
    { id: 5, text: 'Amakivachchasi shlyapani qachon ham kiyadi?', options: ['Faqat qishda', 'Yozda ham', 'Faqat kechasi', 'Hech qachon'], correct: 1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// WEEK 7 — Hozirgi zamon fe'llari
// ─────────────────────────────────────────────────────────────────────────

const week7Words = [
  { word: 'fari', translation: 'qilmoq', definition: 'Biror ish yoki harakatni bajarish.', example: 'Chi stai facennu?', partOfSpeech: 'verb' },
  { word: 'diri', translation: 'demoq', definition: "Fikr yoki ma'lumotni og'zaki bildirish.", example: 'Chi mi vosi diri?', partOfSpeech: 'verb' },
  { word: 'jiri', translation: 'bormoq', definition: 'Bir joydan boshqasiga harakatlanish.', example: 'Vaju a la scola.', partOfSpeech: 'verb' },
  { word: 'vidiri', translation: "ko'rmoq", definition: "Ko'zlar orqali idrok qilish.", example: "Vitti 'nu bellissimu tramontu.", partOfSpeech: 'verb' },
  { word: 'sapiri', translation: 'bilmoq', definition: "Ma'lumotga ega bo'lish.", example: 'Nun sacciu unni sta.', partOfSpeech: 'verb' },
  { word: 'vuliri', translation: 'xohlamoq', definition: 'Biror narsani istash.', example: "Vogghiu 'nu cafè.", partOfSpeech: 'verb' },
  { word: 'putiri', translation: '-a olmoq', definition: 'Imkoniyat yoki ruxsatni bildiruvchi fe\'l.', example: 'Pozzu jiri cu tia?', partOfSpeech: 'verb' },
  { word: 'manciari', translation: 'yemoq', definition: "Ovqat iste'mol qilish.", example: "Manciamu 'nsemmula.", partOfSpeech: 'verb' },
  { word: 'viviri', translation: 'ichmoq', definition: "Suyuqlik iste'mol qilish.", example: 'Vogghiu vivi acqua friscu.', partOfSpeech: 'verb' },
  { word: 'parrari', translation: 'gapirmoq', definition: "Og'zaki muloqot qilish.", example: "Parramu sicilianu 'nsemmula.", partOfSpeech: 'verb' },
  { word: 'travagghiari', translation: 'ishlamoq', definition: 'Mehnat qilish.', example: 'Travagghiu tutti i jorna.', partOfSpeech: 'verb' },
  { word: 'durmiri', translation: 'uxlamoq', definition: 'Uyquga ketish.', example: 'Vaju a durmiri prestu.', partOfSpeech: 'verb' },
  { word: 'caminari', translation: 'yurmoq', definition: 'Oyoq bilan harakatlanish.', example: "Ni piaci caminari 'nta chiazza.", partOfSpeech: 'verb' },
  { word: 'scriviri', translation: 'yozmoq', definition: 'Qog\'ozga yoki ekranga harflar yozish.', example: "Scrivu 'na littra.", partOfSpeech: 'verb' },
  { word: 'liggiri', translation: "o'qimoq", definition: "Matnni ko'zdan kechirib ma'nosini tushunish.", example: 'Liggiu un libbru ogni siri.', partOfSpeech: 'verb' },
  { word: 'accattari', translation: 'sotib olmoq', definition: 'Pul evaziga narsa olish.', example: 'Accattu pani frisco.', partOfSpeech: 'verb' },
  { word: 'vinniri', translation: 'sotmoq', definition: 'Pul evaziga narsani berish.', example: 'Vinni la so casa.', partOfSpeech: 'verb' },
  { word: 'apriri', translation: 'ochmoq', definition: 'Yopiq narsani ochish.', example: 'Japri la porta, pi favuri.', partOfSpeech: 'verb' },
  { word: 'chiuiri', translation: 'yopmoq', definition: 'Ochiq narsani yopish.', example: 'Chiudi la finestra.', partOfSpeech: 'verb' },
  { word: 'accuminciari', translation: 'boshlamoq', definition: 'Biror ishni boshlash.', example: 'U film accumincia a li ottu.', partOfSpeech: 'verb' },
];

const week7Grammar = {
  questions: grammarQuestionsFor('scn-ari-verbs', 'scn-iri-verbs'),
};

const week7Reading = {
  title: 'Na jurnata tipica',
  pages: [
    [
      { type: 'heading', text: 'Na jurnata tipica' },
      { type: 'p', text: 'Ogni matina mi susu prestu.' },
      { type: 'p', text: 'Manciu pani e vivu cafè.' },
    ],
    [
      { type: 'p', text: 'Doppu, vaju a travagghiari. Travagghiu tutta a matinata.' },
      { type: 'p', text: 'A menzujornu, manciu cu i me culleghi.' },
    ],
    [
      { type: 'p', text: "A sira, leggiu 'nu libbru o scrivu 'na littra." },
      { type: 'p', text: 'Doppu, vaju a durmiri.' },
    ],
  ],
  questions: [
    { id: 1, text: 'Ertalab birinchi nima qiladi?', options: ['Ovqat yeydi', 'Erta uyg\'onadi', 'Ishga boradi', 'Uxlaydi'], correct: 1 },
    { id: 2, text: 'Nonushtada nima ichadi?', options: ['Choy', 'Kofe', 'Sut', 'Suv'], correct: 1 },
    { id: 3, text: 'Kim bilan tushlik qiladi?', options: ['Oila', 'Hamkasblar', 'Yolg\'iz', 'Do\'stlar'], correct: 1 },
    { id: 4, text: 'Kechqurun nima qiladi (ikkitasidan biri)?', options: ['Televizor ko\'radi yoki uxlaydi', "Kitob o'qiydi yoki xat yozadi", 'Ovqat pishiradi yoki yuvinadi', 'Sport qiladi yoki yuguradi'], correct: 1 },
    { id: 5, text: 'Kun oxirida nima qiladi?', options: ['Ishga boradi', 'Uxlagani boradi', 'Ovqat yeydi', 'Kitob sotib oladi'], correct: 1 },
  ],
};

const week7Listening = {
  title: 'Chi fazzu ogni jornu',
  voice: 'it-IT-ElsaNeural',
  script: "Bongiornu! Vi cuntu chi fazzu ogni jornu. Mi levu a li setti, e doppu manciu qualcosa. Poi vaju a travagghiari 'nta 'nu restoranti, unni sugnu cuocu. Mi piaci assai cucinari! A la sira, quannu turnu, parru cu me mugghieri e jucamu cu i nostri figghi. Prima di durmiri, leggiu sempri qualchi paggina d'un libbru. Grazii pi m'aviri ascutatu!",
  questions: [
    { id: 1, text: 'Soat nechida turadi?', options: ['sei', 'setti', 'ottu', 'novi'], correct: 1 },
    { id: 2, text: 'Qayerda ishlaydi?', options: ['Maktab', 'Restoran', 'Bank', 'Dorixona'], correct: 1 },
    { id: 3, text: 'Kasbi nima?', options: ["O'qituvchi", 'Oshpaz', 'Shifokor', 'Haydovchi'], correct: 1 },
    { id: 4, text: 'Kechqurun xotini bilan yana nima qiladi?', options: ['Faqat gaplashadi', 'Gaplashadi va bolalari bilan o\'ynaydi', 'Televizor ko\'radi', 'Ovqatlanadi'], correct: 1 },
    { id: 5, text: 'Uxlashdan oldin nima qiladi?', options: ['Musiqa tinglaydi', "Kitob o'qiydi", 'Yozadi', 'Yuguradi'], correct: 1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// WEEK 8 — Inkor va savollar
// ─────────────────────────────────────────────────────────────────────────

const week8Words = [
  { word: 'chi', translation: 'nima', definition: "Biror narsani so'rash uchun ishlatiladigan so'roq so'zi.", example: 'Chi fai?', partOfSpeech: 'pronoun' },
  { word: 'cui', translation: 'kim', definition: "Biror kishini so'rash uchun ishlatiladigan so'roq so'zi.", example: 'Cui è chiddu?', partOfSpeech: 'pronoun' },
  { word: 'unni', translation: 'qayerda', definition: "Joyni so'rash uchun ishlatiladigan so'roq so'zi.", example: 'Unni sta la stazioni?', partOfSpeech: 'adverb' },
  { word: 'quannu', translation: 'qachon', definition: "Vaqtni so'rash uchun ishlatiladigan so'roq so'zi.", example: 'Quannu veni?', partOfSpeech: 'adverb' },
  { word: 'pirchì', translation: 'nima uchun', definition: "Sababni so'rash uchun ishlatiladigan so'roq so'zi.", example: 'Pirchì si cuntenti?', partOfSpeech: 'adverb' },
  { word: 'comu', translation: 'qanday', definition: "Usulni so'rash uchun ishlatiladigan so'roq so'zi.", example: 'Comu ti chiami?', partOfSpeech: 'adverb' },
  { word: 'cu', translation: 'bilan', definition: "Birga bo'lishni bildiruvchi predlog.", example: 'Vaju cu tia.', partOfSpeech: 'preposition' },
  { word: 'senza', translation: '-siz', definition: "Biror narsaning yo'qligini bildiruvchi predlog.", example: 'Nun pozzu vivi senza acqua.', partOfSpeech: 'preposition' },
  { word: 'pi', translation: 'uchun', definition: "Maqsad yoki qaratilganlikni bildiruvchi predlog.", example: 'Chistu è pi tia.', partOfSpeech: 'preposition' },
  { word: 'a', translation: '-ga', definition: "Yo'nalish yoki maqsadni bildiruvchi predlog.", example: 'Vaju a Palermu.', partOfSpeech: 'preposition' },
  { word: 'Comu ti chiami?', translation: 'ismingiz nima?', definition: "Suhbatdoshning ismini so'rash uchun ishlatiladigan savol.", example: 'Comu ti chiami? Iu mi chiamu Peppi.', partOfSpeech: 'phrase' },
  { word: 'Mi chiamu...', translation: 'mening ismim...', definition: "O'z ismini aytish uchun ishlatiladigan ibora.", example: 'Mi chiamu Maria.', partOfSpeech: 'phrase' },
  { word: 'Comu stai?', translation: 'qalaysiz?', definition: "Suhbatdoshning holini so'rash uchun ishlatiladigan savol.", example: 'Comu stai oggi?', partOfSpeech: 'phrase' },
  { word: 'Chi ura è?', translation: 'soat necha?', definition: "Vaqtni so'rash uchun ishlatiladigan savol.", example: 'Scusa, chi ura è?', partOfSpeech: 'phrase' },
  { word: 'Va beni', translation: 'bo\'ladi, yaxshi', definition: 'Kelishuv yoki roziligni bildiruvchi ibora.', example: 'Va beni, ni videmu dumani.', partOfSpeech: 'phrase' },
  { word: 'Nun importa', translation: 'muhim emas, hechqisi yo\'q', definition: 'Ahamiyatsizlikni bildiruvchi ibora.', example: 'Nun importa, lassa perdiri.', partOfSpeech: 'phrase' },
  { word: 'Sugnu d\'accordu', translation: 'roziman', definition: 'Kelishuvni bildiruvchi ibora.', example: 'Sugnu d\'accordu cu tia.', partOfSpeech: 'phrase' },
  { word: 'Nun capisciu', translation: 'tushunmayapman', definition: 'Aytilgan gap tushunilmaganda ishlatiladigan ibora.', example: 'Scusa, nun capisciu.', partOfSpeech: 'phrase' },
  { word: 'Poi ripetiri?', translation: 'qaytarib bera olasizmi?', definition: "Gapni qaytarishni so'rash uchun ishlatiladigan savol.", example: 'Poi ripetiri, pi favuri?', partOfSpeech: 'phrase' },
  { word: 'Quantu costa?', translation: 'qancha turadi?', definition: "Narxni so'rash uchun ishlatiladigan savol.", example: 'Quantu costa chistu?', partOfSpeech: 'phrase' },
];

const week8Grammar = {
  questions: [
    ...grammarQuestionsFor('scn-negation-questions'),
    { id: 101, text: "'Soat necha?' sitsiliyacha savoli?", options: ['Comu stai?', 'Chi ura è?', 'Quantu costa?', 'Unni sta?'], correct: 1, explanation: 'Chi ura è? — soat necha?' },
    { id: 102, text: "'Qancha turadi?' sitsiliyacha savoli?", options: ['Quantu costa?', 'Chi ura è?', 'Comu ti chiami?', 'Cui è?'], correct: 0, explanation: 'Quantu costa? — qancha turadi?' },
    { id: 103, text: 'Tushunmaganingizni bildirish uchun nima deysiz?', options: ['Va beni', 'Nun capisciu', "Sugnu d'accordu", 'Grazii'], correct: 1, explanation: 'Nun capisciu — tushunmayapman.' },
    { id: 104, text: 'Rozilik bildirish uchun ibora?', options: ['Nun importa', "Sugnu d'accordu", 'Nun capisciu', 'Scusati'], correct: 1, explanation: "Sugnu d'accordu — roziman." },
    { id: 105, text: "'Hechqisi yo'q' ma'nosidagi ibora?", options: ['Nun importa', 'Va beni', "Sugnu d'accordu", 'Grazii'], correct: 0, explanation: "Nun importa — hechqisi yo'q." },
  ],
};

const week8Reading = {
  title: 'Tanti dumandi',
  pages: [
    [
      { type: 'heading', text: 'Tanti dumandi' },
      { type: 'p', text: 'Turista: Scusati, unni sta u mircatu?' },
      { type: 'p', text: 'Sicilianu: A dritta, doppu a chiazza.' },
    ],
    [
      { type: 'p', text: 'Turista: Grazii! E quantu costa un bigliettu di trenu?' },
      { type: 'p', text: 'Sicilianu: Nun sacciu esattamenti, ma nun è caru.' },
    ],
    [
      { type: 'p', text: 'Turista: Va beni, grazii pi l\'aiutu!' },
      { type: 'p', text: 'Sicilianu: Nun fa nenti, bonu viaggiu!' },
    ],
  ],
  questions: [
    { id: 1, text: 'Turist nimani so\'raydi (birinchi)?', options: ['Mehmonxona qayerda', 'Bozor qayerda', 'Vokzal qayerda', 'Restoran qayerda'], correct: 1 },
    { id: 2, text: 'Bozorga qanday borish kerak?', options: ['Chapga, keyin maydondan o\'tib', "O'ngga, keyin maydondan o'tib", "To'g'riga", 'Orqaga'], correct: 1 },
    { id: 3, text: 'Poyezd chiptasi haqida nima aytiladi?', options: ['Juda qimmat', 'Qimmat emas', 'Bepul', 'Aniq narx aytiladi'], correct: 1 },
    { id: 4, text: 'Sitsiliyalik chipta narxini aniq biladimi?', options: ['Ha, aniq biladi', "Yo'q, aniq bilmaydi", 'Hech qanday javob bermaydi', 'Boshqasidan so\'raydi'], correct: 1 },
    { id: 5, text: 'Suhbat oxirida sitsiliyalik nima tilaydi?', options: ['Yaxshi kun', 'Yaxshi yo\'l', 'Yaxshi ovqat', 'Yaxshi uyqu'], correct: 1 },
  ],
};

const week8Listening = {
  title: 'Spiegami, pi favuri',
  voice: 'it-IT-ElsaNeural',
  script: "Scusati, pozzu spiarvi 'na cosa? Unni sta a stazioni chiù vicina? Quannu parti u prossimu trenu? E quantu costa u bigliettu? Nun capisciu beni u sistema di ccà, sugnu turista. Pi favuri, putiti parrari chianu? Grazii assai pi la vostra pacienza, siti stati gintili.",
  questions: [
    { id: 1, text: 'Gapiruvchi kim?', options: ['Mahalliy aholi', 'Turist', "O'qituvchi", 'Shifokor'], correct: 1 },
    { id: 2, text: 'Nimani so\'raydi (asosiy)?', options: ['Restoran haqida', 'Vokzal va poyezd haqida', 'Mehmonxona haqida', 'Bozor haqida'], correct: 1 },
    { id: 3, text: 'Nima uchun sekinroq gapirishni so\'raydi?', options: ['Eshitmaydi', 'Tizimni tushunmaydi', 'Chala tushunadi', 'Shoshilmoqda'], correct: 2 },
    { id: 4, text: 'Oxirida kimga rahmat aytadi?', options: ["O'ziga", 'Yordam bergan odamga', 'Hech kimga', "Do'stiga"], correct: 1 },
    { id: 5, text: 'Gapiruvchi qanday his qiladi (ohangdan)?', options: ["G'azablangan", 'Minnatdor', 'Xafa', 'Loqayd'], correct: 1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// WEEK 9 — Predloglar va yo'nalishlar
// ─────────────────────────────────────────────────────────────────────────

const week9Words = [
  { word: 'città', translation: 'shahar', definition: "Ko'p odamlar yashaydigan katta aholi punkti.", example: "Palermu è 'na città bedda.", partOfSpeech: 'noun' },
  { word: 'supra', translation: 'ustida', definition: "Biror narsaning yuqorisida joylashganini bildiradi.", example: 'U libbru è supra u tavulu.', partOfSpeech: 'preposition' },
  { word: 'sutta', translation: 'ostida', definition: "Biror narsaning pastida joylashganini bildiradi.", example: 'U cani dormi sutta u tavulu.', partOfSpeech: 'preposition' },
  { word: 'dintra', translation: 'ichida', definition: "Biror narsaning ichki qismida ekanini bildiradi.", example: 'Semu dintra la casa.', partOfSpeech: 'preposition' },
  { word: 'fora', translation: 'tashqarida', definition: "Biror narsaning tashqi qismida ekanini bildiradi.", example: 'I picciriddi jocanu fora.', partOfSpeech: 'adverb' },
  { word: 'vicinu', translation: 'yaqin', definition: "Kam masofada joylashganini bildiradi.", example: 'La scola è vicinu.', partOfSpeech: 'adjective' },
  { word: 'luntanu', translation: 'uzoq', definition: "Katta masofada joylashganini bildiradi.", example: 'Sò casa è luntanu di ccà.', partOfSpeech: 'adjective' },
  { word: 'dritu', translation: "to'g'ri (yo'nalish)", definition: "To'g'ri, egilmasdan davom etuvchi yo'nalishni bildiradi.", example: 'Vai sempri dritu.', partOfSpeech: 'adverb' },
  { word: 'a dritta', translation: "o'ngga", definition: "O'ng tomonga yo'nalishni bildiradi.", example: 'Gira a dritta.', partOfSpeech: 'adverb' },
  { word: 'a manca', translation: 'chapga', definition: "Chap tomonga yo'nalishni bildiradi.", example: 'Gira a manca.', partOfSpeech: 'adverb' },
  { word: 'ccà', translation: 'bu yerda', definition: "Gapiruvchiga yaqin joyni bildiradi.", example: 'Vieni ccà.', partOfSpeech: 'adverb' },
  { word: 'ddà', translation: 'u yerda', definition: "Gapiruvchidan uzoq joyni bildiradi.", example: 'U libbru è ddà.', partOfSpeech: 'adverb' },
  { word: 'machina', translation: 'mashina', definition: 'Motor bilan yuradigan yer transporti.', example: 'Vaju cu la machina.', partOfSpeech: 'noun' },
  { word: 'bicicletta', translation: 'velosiped', definition: "Ikki g'ildirakli, pedal bilan yuradigan transport.", example: 'Vaju a scola cu la bicicletta.', partOfSpeech: 'noun' },
  { word: 'autobus', translation: 'avtobus', definition: "Ko'p yo'lovchi tashiydigan yer transporti.", example: "Pigghiu l'autobus ogni matina.", partOfSpeech: 'noun' },
  { word: 'trenu', translation: 'poyezd', definition: "Temir yo'l orqali yuradigan transport.", example: "U trenu parti a l'ottu.", partOfSpeech: 'noun' },
  { word: 'navi', translation: 'kema', definition: 'Suvda yuradigan katta transport.', example: 'La navi va versu Messina.', partOfSpeech: 'noun' },
  { word: 'aeroplanu', translation: 'samolyot', definition: 'Havoda uchadigan transport.', example: "L'aeroplanu vola atu.", partOfSpeech: 'noun' },
  { word: 'moto', translation: 'mototsikl', definition: "Ikki g'ildirakli motorli transport.", example: "Iddu havi 'na moto nova.", partOfSpeech: 'noun' },
  { word: 'paisi', translation: 'mamlakat, yurt', definition: "Kishi tug'ilgan yoki yashaydigan mamlakat/qishloq-shahar.", example: 'Di chi paisi si?', partOfSpeech: 'noun' },
];

const week9Grammar = {
  questions: [
    { id: 1, text: "'a' predlogi asosan nimani bildiradi?", options: ['Yo\'nalish/joy', 'Egalik', 'Vaqt', 'Sabab'], correct: 0, explanation: "'a' — yo'nalish/joy predlogi." },
    { id: 2, text: "'di' predlogi nimani bildiradi?", options: ['Egalik/kelib chiqish', 'Joy', 'Vaqt', 'Miqdor'], correct: 0, explanation: "'di' — egalik/kelib chiqishni bildiradi." },
    { id: 3, text: "'cu' predlogi nimani bildiradi?", options: ['Bilan', 'Uchun', 'Ichida', 'Ustida'], correct: 0, explanation: "'cu' — bilan." },
    { id: 4, text: "'pi' predlogi nimani bildiradi?", options: ['Ustida', 'Uchun', 'Ostida', 'Bilan'], correct: 1, explanation: "'pi' — uchun." },
    { id: 5, text: "'nta'/'dintra' predlogi nimani bildiradi?", options: ['Tashqarida', 'Ichida', 'Ustida', 'Yonida'], correct: 1, explanation: "'dintra' — ichida." },
    { id: 6, text: "'supra' nimani bildiradi?", options: ['Ostida', 'Ustida', 'Ichida', 'Tashqarida'], correct: 1, explanation: "'supra' — ustida." },
    { id: 7, text: "'sutta' nimani bildiradi?", options: ['Ustida', 'Ostida', 'Yaqin', 'Uzoq'], correct: 1, explanation: "'sutta' — ostida." },
    { id: 8, text: "'vicinu' nimani bildiradi?", options: ['Uzoq', 'Yaqin', 'Ustida', 'Ostida'], correct: 1, explanation: "'vicinu' — yaqin." },
    { id: 9, text: "'luntanu' nimani bildiradi?", options: ['Yaqin', 'Uzoq', 'Ichida', 'Tashqarida'], correct: 1, explanation: "'luntanu' — uzoq." },
    { id: 10, text: "'ccà' nimani bildiradi?", options: ["U yerda", 'Bu yerda', 'Yuqorida', 'Pastda'], correct: 1, explanation: "'ccà' — bu yerda." },
    { id: 11, text: "'ddà' nimani bildiradi?", options: ['Bu yerda', 'U yerda', 'Yaqin', 'Ichida'], correct: 1, explanation: "'ddà' — u yerda." },
    { id: 12, text: 'Mashina sitsiliyacha?', options: ['machina', 'trenu', 'navi', 'moto'], correct: 0, explanation: 'machina — mashina.' },
    { id: 13, text: 'Poyezd sitsiliyacha?', options: ['machina', 'trenu', 'autobus', 'navi'], correct: 1, explanation: 'trenu — poyezd.' },
    { id: 14, text: 'Kema sitsiliyacha?', options: ['navi', 'aeroplanu', 'moto', 'bicicletta'], correct: 0, explanation: 'navi — kema.' },
    { id: 15, text: 'Samolyot sitsiliyacha?', options: ['moto', 'aeroplanu', 'trenu', 'navi'], correct: 1, explanation: 'aeroplanu — samolyot.' },
  ],
};

const week9Reading = {
  title: 'Comu arrivu a la chiazza?',
  pages: [
    [
      { type: 'heading', text: 'Comu arrivu a la chiazza?' },
      { type: 'p', text: 'Peppi: Scusa, comu arrivu a la chiazza di la città?' },
      { type: 'p', text: 'Anna: Vai dritu, poi gira a dritta.' },
    ],
    [
      { type: 'p', text: 'Peppi: È luntanu di ccà?' },
      { type: 'p', text: 'Anna: No, no, è vicinu! Cincu minuti a pedi.' },
    ],
    [
      { type: 'p', text: 'Peppi: Grazii! Vaju cu la machina o a pedi?' },
      { type: 'p', text: "Anna: A pedi è megghiu, pirchì c'è tanticchia di traffico." },
    ],
  ],
  questions: [
    { id: 1, text: 'Peppi qayerni so\'raydi?', options: ['Bozorni', 'Shahar maydonini', 'Vokzalni', 'Bankni'], correct: 1 },
    { id: 2, text: "Qaysi yo'nalishga borish kerak (dastlab)?", options: ['Chapga', "To'g'riga", 'Orqaga', "O'ngga"], correct: 1 },
    { id: 3, text: 'Maydon uzoqmi?', options: ['Ha, juda uzoq', "Yo'q, yaqin", "O'rtacha", "Ma'lum emas"], correct: 1 },
    { id: 4, text: 'Necha daqiqada yetadi (piyoda)?', options: ['Ikki', 'Besh', "O'n", 'Yigirma'], correct: 1 },
    { id: 5, text: 'Anna nima sabab piyoda borishni maslahat beradi?', options: ["Yomg'ir", 'Tirbandlik', "Yoqmaydi", 'Yaqin joy'], correct: 1 },
  ],
};

const week9Listening = {
  title: "Un viaggiu 'n Sicilia",
  voice: 'it-IT-ElsaNeural',
  script: "Ciau! Vogghiu cuntarivi comu haju viaggiatu 'n Sicilia. Prima, sugnu jutu cu l'aeroplanu finu a Palermu. Doppu, haju pigghiatu un trenu pi Catania. A Catania, a me casa è vicinu a lu mari, e u mircatu è dintra la città, nun è luntanu. Pi girari, uso a bicicletta pirchì è cchiù faciule di la machina. Ogni jornu vaju a la spiaggia, ca è vicinissima! Grazii pi m'aviri ascutatu!",
  questions: [
    { id: 1, text: 'Birinchi qanday transportda keldi?', options: ["Poyezd", 'Samolyot', 'Kema', 'Avtobus'], correct: 1 },
    { id: 2, text: "Palermudan Kataniyaga qanday bordi?", options: ['Poyezdda', 'Mashinada', 'Piyoda', 'Velosipedda'], correct: 0 },
    { id: 3, text: 'Bozor shahardan uzoqmi?', options: ['Ha', "Yo'q", 'Juda uzoq', "Ma'lum emas"], correct: 1 },
    { id: 4, text: 'Shahar ichida ko\'proq nimadan foydalanadi?', options: ['Mashina', 'Velosiped', 'Avtobus', 'Piyoda'], correct: 1 },
    { id: 5, text: 'Har kuni qayerga boradi?', options: ['Bozor', 'Plyaj', 'Maktab', 'Bank'], correct: 1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// WEEK 10 — Vaqt va raqamlar
// ─────────────────────────────────────────────────────────────────────────

const week10Words = [
  { word: 'unu', translation: 'bir', definition: "1 sonini bildiruvchi so'z.", example: 'Aju sulu unu.', partOfSpeech: 'noun' },
  { word: 'dui', translation: 'ikki', definition: "2 sonini bildiruvchi so'z.", example: 'Semu dui frati.', partOfSpeech: 'noun' },
  { word: 'tri', translation: 'uch', definition: "3 sonini bildiruvchi so'z.", example: 'Su tri jorna ca travagghiu.', partOfSpeech: 'noun' },
  { word: 'quattru', translation: "to'rt", definition: "4 sonini bildiruvchi so'z.", example: 'Aju quattru libbra.', partOfSpeech: 'noun' },
  { word: 'cincu', translation: 'besh', definition: "5 sonini bildiruvchi so'z.", example: "Semu cincu 'nta famigghia.", partOfSpeech: 'noun' },
  { word: 'sei', translation: 'olti', definition: "6 sonini bildiruvchi so'z.", example: 'U trenu parti a li sei.', partOfSpeech: 'noun' },
  { word: 'setti', translation: 'yetti', definition: "7 sonini bildiruvchi so'z.", example: "'Na simana havi setti jorna.", partOfSpeech: 'noun' },
  { word: 'ottu', translation: 'sakkiz', definition: "8 sonini bildiruvchi so'z.", example: "Su l'ottu di matina.", partOfSpeech: 'noun' },
  { word: 'novi', translation: "to'qqiz", definition: "9 sonini bildiruvchi so'z.", example: 'Havi novi anni.', partOfSpeech: 'noun' },
  { word: 'deci', translation: "o'n", definition: "10 sonini bildiruvchi so'z.", example: 'Cuntu finu a deci.', partOfSpeech: 'noun' },
  { word: 'vinti', translation: 'yigirma', definition: "20 sonini bildiruvchi so'z.", example: 'Havi vinti anni.', partOfSpeech: 'noun' },
  { word: 'centu', translation: 'yuz', definition: "100 sonini bildiruvchi so'z.", example: 'U libbru havi centu paggini.', partOfSpeech: 'noun' },
  { word: 'luni', translation: 'dushanba', definition: 'Haftaning birinchi ish kuni.', example: 'Luni accuminciu a travagghiari.', partOfSpeech: 'noun' },
  { word: 'marti', translation: 'seshanba', definition: 'Haftaning ikkinchi kuni.', example: 'Marti aju lezziuni.', partOfSpeech: 'noun' },
  { word: 'mercuri', translation: 'chorshanba', definition: "Haftaning o'rtasidagi kun.", example: 'Mercuri jamu o mircatu.', partOfSpeech: 'noun' },
  { word: 'jovi', translation: 'payshanba', definition: "Haftaning to'rtinchi kuni.", example: 'Jovi ni videmu.', partOfSpeech: 'noun' },
  { word: 'venniri', translation: 'juma', definition: "Ish haftasining oxirgi kuni.", example: 'Venniri sugnu libbiru.', partOfSpeech: 'noun' },
  { word: 'sabbatu', translation: 'shanba', definition: "Dam olish kunlarining birinchisi.", example: 'Sabbatu pulizziu la casa.', partOfSpeech: 'noun' },
  { word: 'duminica', translation: 'yakshanba', definition: "Haftaning oxirgi dam olish kuni.", example: 'Duminica jamu a la missa.', partOfSpeech: 'noun' },
  { word: 'oggi', translation: 'bugun', definition: 'Hozirgi kunni bildiruvchi so\'z.', example: "Oggi è 'na bedda jurnata.", partOfSpeech: 'adverb' },
];

const week10Grammar = {
  questions: [
    { id: 1, text: "'unu' soni?", options: [1, 2, 3, 10], correct: 0, explanation: 'unu — bir.' },
    { id: 2, text: "'cincu' soni?", options: [4, 5, 6, 50], correct: 1, explanation: 'cincu — besh.' },
    { id: 3, text: "'deci' soni?", options: [10, 100, 20, 1], correct: 0, explanation: "deci — o'n." },
    { id: 4, text: "'centu' soni?", options: [10, 100, 1000, 20], correct: 1, explanation: 'centu — yuz.' },
    { id: 5, text: 'Dushanba sitsiliyacha?', options: ['marti', 'luni', 'mercuri', 'jovi'], correct: 1, explanation: 'luni — dushanba.' },
    { id: 6, text: 'Yakshanba sitsiliyacha?', options: ['sabbatu', 'duminica', 'venniri', 'jovi'], correct: 1, explanation: 'duminica — yakshanba.' },
    { id: 7, text: 'Shanba sitsiliyacha?', options: ['sabbatu', 'duminica', 'mercuri', 'luni'], correct: 0, explanation: 'sabbatu — shanba.' },
    { id: 8, text: 'Payshanba sitsiliyacha?', options: ['jovi', 'marti', 'mercuri', 'venniri'], correct: 0, explanation: 'jovi — payshanba.' },
    { id: 9, text: "'Bugun' sitsiliyacha?", options: ['dumani', 'ajeri', 'oggi', 'ora'], correct: 2, explanation: 'oggi — bugun.' },
    { id: 10, text: "'Ertaga' sitsiliyacha?", options: ['oggi', 'dumani', 'ajeri', 'sempri'], correct: 1, explanation: 'dumani — ertaga.' },
    { id: 11, text: "'Kecha' sitsiliyacha?", options: ['oggi', 'dumani', 'ajeri', 'mai'], correct: 2, explanation: 'ajeri — kecha.' },
    { id: 12, text: "'Doim' sitsiliyacha?", options: ['mai', 'sempri', 'picca', 'tantu'], correct: 1, explanation: 'sempri — doim.' },
    { id: 13, text: "'Hech qachon' sitsiliyacha?", options: ['sempri', 'mai', 'ora', 'già'], correct: 1, explanation: 'mai — hech qachon.' },
    { id: 14, text: "'Ba'zan' sitsiliyacha?", options: ['certi voti', 'sempri', 'mai', 'picca'], correct: 0, explanation: "certi voti — ba'zan." },
    { id: 15, text: "'Hozir' sitsiliyacha?", options: ['dumani', 'ajeri', 'ora', 'già'], correct: 2, explanation: 'ora — hozir.' },
  ],
};

const week10Reading = {
  title: 'A me simana',
  pages: [
    [
      { type: 'heading', text: 'A me simana' },
      { type: 'p', text: 'Luni e marti travagghiu tutta a jurnata.' },
      { type: 'p', text: "Mercuri, aju sempri 'na lezziuni di sicilianu." },
    ],
    [
      { type: 'p', text: "Jovi e venniri, vaju a la palestra doppu u travagghiu." },
      { type: 'p', text: 'Sabbatu, jocu a palluni cu i me amici.' },
    ],
    [
      { type: 'p', text: "Duminica è u me jornu preferitu: nun travagghiu mai, e staju cu la famigghia." },
    ],
  ],
  questions: [
    { id: 1, text: 'Dushanba va seshanba nima qiladi?', options: ['Dam oladi', 'Ishlaydi', "O'qiydi", 'Sayohat qiladi'], correct: 1 },
    { id: 2, text: 'Chorshanba nimasi bor?', options: ['Futbol', 'Sitsiliya tili darsi', 'Sport zali', 'Oilaviy uchrashuv'], correct: 1 },
    { id: 3, text: 'Payshanba va juma nima qiladi ishdan keyin?', options: ["Kitob o'qiydi", 'Sport zaliga boradi', 'Uxlaydi', 'Ovqat pishiradi'], correct: 1 },
    { id: 4, text: 'Shanba kuni nima qiladi?', options: ['Ishlaydi', "Futbol o'ynaydi", "O'qiydi", 'Uxlaydi'], correct: 1 },
    { id: 5, text: 'Eng yoqtirgan kuni qaysi va nega?', options: ['Dushanba, ishlagani uchun', 'Yakshanba, ishlamagani uchun', 'Shanba, sport uchun', 'Chorshanba, dars uchun'], correct: 1 },
  ],
};

const week10Listening = {
  title: "Chi fazzu 'nta la simana",
  voice: 'it-IT-ElsaNeural',
  script: "Bongiornu! Vi cuntu chi fazzu 'nta la simana. Luni, marti, mercuri, e jovi travagghiu 'nta 'nu ufficiu. Venniri sira, sempri vaju o cinema cu i me amici. Sabbatu matina fazzu a spisa, e sabbatu sira staju cu la famigghia. Duminica, mai travagghiu — è u me jornu di riposu. Certi voti, duminica, vaju a la missa a matina prestu. Grazii pi m'aviri ascutatu!",
  questions: [
    { id: 1, text: 'Necha kun ofisda ishlaydi?', options: ['uch', "to'rt", 'besh', 'olti'], correct: 1 },
    { id: 2, text: 'Juma kechqurun nima qiladi?', options: ['Ishlaydi', 'Kinoga boradi', 'Uxlaydi', "O'qiydi"], correct: 1 },
    { id: 3, text: 'Shanba ertalab nima qiladi?', options: ['Bozorga/xarid qilishga boradi', 'Sport qiladi', 'Uxlaydi', 'Ishlaydi'], correct: 0 },
    { id: 4, text: 'Yakshanba kuni ishlaydimi?', options: ['Ha, doim', "Yo'q, hech qachon", "Ba'zan", 'Faqat ertalab'], correct: 1 },
    { id: 5, text: "Ba'zan yakshanba ertalab qayerga boradi?", options: ['Ishga', 'Ibodatga (missa)', 'Bozorga', 'Sport zaliga'], correct: 1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// WEEK 11 — Kundalik hayot: ovqat, xarid, vuliri/putiri
// ─────────────────────────────────────────────────────────────────────────

const week11Words = [
  { word: 'pani', translation: 'non', definition: 'Undan tayyorlangan asosiy oziq-ovqat.', example: 'Manciu pani ogni matina.', partOfSpeech: 'noun' },
  { word: 'acqua', translation: 'suv', definition: "Hayot uchun zarur bo'lgan rangsiz suyuqlik.", example: "Dammi un biccheri d'acqua.", partOfSpeech: 'noun' },
  { word: 'latti', translation: 'sut', definition: 'Sigirdan olinadigan oq suyuqlik.', example: 'Ô picciriddu ci piaci u latti.', partOfSpeech: 'noun' },
  { word: 'cafè', translation: 'qahva', definition: "Qovurilgan donlardan tayyorlanadigan achchiq ichimlik.", example: 'Me patri vivi u cafè ogni matina.', partOfSpeech: 'noun' },
  { word: 'tè', translation: 'choy', definition: "Qaynoq suvda damlanadigan issiq ichimlik.", example: "Vuoi 'na tazza di tè?", partOfSpeech: 'noun' },
  { word: 'carni', translation: "go'sht", definition: "Hayvonlardan olinadigan oziq-ovqat.", example: 'Iddu nun manciu carni.', partOfSpeech: 'noun' },
  { word: 'pumaroru', translation: 'pomidor', definition: 'Salat va souslar uchun ishlatiladigan qizil sabzavot.', example: 'Stu pumaroru è russu e maturu.', partOfSpeech: 'noun' },
  { word: 'cipudda', translation: 'piyoz', definition: "O'tkir hidli sabzavot.", example: "Metti 'na cipudda 'nto sugu.", partOfSpeech: 'noun' },
  { word: 'casu', translation: 'pishloq', definition: "Sut mahsulotidan tayyorlangan ovqat.", example: 'Manciu pani cu casu.', partOfSpeech: 'noun' },
  { word: 'pasta', translation: 'pasta (makaron)', definition: "Undan tayyorlangan italyan taomi.", example: 'Manciamu pasta ogni duminica.', partOfSpeech: 'noun' },
  { word: 'vinu', translation: 'vino', definition: "Uzumdan tayyorlanadigan alkogolli ichimlik.", example: "U nannu vivi 'nu bicchieri di vinu.", partOfSpeech: 'noun' },
  { word: 'gelatu', translation: 'muzqaymoq', definition: 'Sovutilgan shirin desert.', example: "Manciamu 'nu gelatu a mari.", partOfSpeech: 'noun' },
  { word: 'vuliri', translation: 'xohlamoq', definition: 'Biror narsani istash.', example: "Vogghiu 'nu cafè.", partOfSpeech: 'verb' },
  { word: 'putiri', translation: '-a olmoq', definition: "Imkoniyat yoki ruxsatni bildiruvchi fe'l.", example: 'Pozzu jiri cu tia?', partOfSpeech: 'verb' },
  { word: 'dinari', translation: 'pul', definition: "Xarid qilish uchun ishlatiladigan qog'oz yoki tanga.", example: 'Nun aju dinari ora.', partOfSpeech: 'noun' },
  { word: 'prezzu', translation: 'narx', definition: "Biror narsaning qiymati.", example: 'Chi prezzu havi chistu?', partOfSpeech: 'noun' },
  { word: 'caru', translation: 'qimmat', definition: 'Narxi yuqori ekanini bildiradi.', example: 'Chistu è troppu caru.', partOfSpeech: 'adjective' },
  { word: 'mircatu', translation: 'bozor', definition: "Mahsulotlar sotib olinadigan joy.", example: "Accattu ficu 'nto mircatu.", partOfSpeech: 'noun' },
  { word: 'pumu', translation: 'olma', definition: "Daraxtda o'sadigan shirin meva.", example: 'Stu pumu è duci assai.', partOfSpeech: 'noun' },
  { word: 'aranciu', translation: 'apelsin', definition: 'Sitrus mevalarining bir turi.', example: "A Sicilia crìsciunu bboni aranci.", partOfSpeech: 'noun' },
];

const week11Grammar = {
  questions: [
    { id: 1, text: "'Vuliri' fe'li nimani bildiradi?", options: ['Bilmoq', 'Xohlamoq', "Ko'rmoq", 'Sotib olmoq'], correct: 1, explanation: 'vuliri — xohlamoq.' },
    { id: 2, text: "'Putiri' fe'li nimani bildiradi?", options: ['-a olmoq (imkoniyat)', 'Kerak bo\'lmoq', 'Yemoq', 'Ichmoq'], correct: 0, explanation: 'putiri — -a olmoq.' },
    { id: 3, text: "'Aviri a' + fe'l nimani bildiradi (eslatma)?", options: ['Istak', 'Majburiyat', "O'tgan zamon", 'Rad etish'], correct: 1, explanation: "'Aviri a' + infinitiv — kerak/majburiyat." },
    { id: 4, text: "'Pul' sitsiliyacha so'zi?", options: ['prezzu', 'dinari', 'caru', 'mircatu'], correct: 1, explanation: 'dinari — pul.' },
    { id: 5, text: "'Narx' sitsiliyacha so'zi?", options: ['dinari', 'prezzu', 'caru', 'casu'], correct: 1, explanation: 'prezzu — narx.' },
    { id: 6, text: "'Qimmat' sitsiliyacha so'zi?", options: ['caru', 'dinari', 'prezzu', 'pani'], correct: 0, explanation: 'caru — qimmat.' },
    { id: 7, text: "'Pishloq' sitsiliyacha so'zi?", options: ['pasta', 'casu', 'vinu', 'risu'], correct: 1, explanation: 'casu — pishloq.' },
    { id: 8, text: "'Vino' sitsiliyacha so'zi?", options: ['vinu', 'casu', 'gelatu', 'acqua'], correct: 0, explanation: 'vinu — vino.' },
    { id: 9, text: "'Muzqaymoq' sitsiliyacha so'zi?", options: ['gelatu', 'casu', 'pasta', 'vinu'], correct: 0, explanation: 'gelatu — muzqaymoq.' },
    { id: 10, text: "'Pomidor' sitsiliyacha so'zi?", options: ['pumu', 'aranciu', 'pumaroru', 'limuni'], correct: 2, explanation: 'pumaroru — pomidor.' },
    { id: 11, text: "'Piyoz' sitsiliyacha so'zi?", options: ['cipudda', 'pumu', 'aranciu', 'limuni'], correct: 0, explanation: 'cipudda — piyoz.' },
    { id: 12, text: "'Men suzmoq istayman' qanday boshlanadi?", options: ['Pozzu...', 'Vogghiu...', 'Devu...', 'Sugnu...'], correct: 1, explanation: "Vogghiu... — men xohlayman... (vuliri fe'lidan)." },
    { id: 13, text: "'Men bora olamanmi?' qanday boshlanadi?", options: ['Pozzu jiri?', 'Vogghiu jiri?', 'Devu jiri?', 'Sugnu jiri?'], correct: 0, explanation: 'Pozzu jiri? — putiri fe\'lidan.' },
    { id: 14, text: "'Non' sitsiliyacha so'zi?", options: ['pani', 'acqua', 'latti', 'carni'], correct: 0, explanation: 'pani — non.' },
    { id: 15, text: "'Guruch' sitsiliyacha so'zi?", options: ['pasta', 'risu', 'casu', 'pani'], correct: 1, explanation: 'risu — guruch.' },
  ],
};

const week11Reading = {
  title: "'Nto mircatu",
  pages: [
    [
      { type: 'heading', text: "'Nto mircatu" },
      { type: 'p', text: 'Vinnituri: Bongiornu! Chi vuliti accattari?' },
      { type: 'p', text: "Cliente: Vogghiu pumaroru, cipudda, e un pocu di casu." },
    ],
    [
      { type: 'p', text: 'Vinnituri: Certu! Su tri euro pi tuttu.' },
      { type: 'p', text: "Cliente: Va beni, nun è troppu caru." },
    ],
    [
      { type: 'p', text: "Vinnituri: Vuliti macari 'nu gelatu?" },
      { type: 'p', text: 'Cliente: Sì, grazii! Pozzu pagari cu la carta?' },
    ],
  ],
  questions: [
    { id: 1, text: 'Xaridor nima sotib olmoqchi (birinchi ikkitasi)?', options: ['Non va sut', 'Pomidor va piyoz', 'Vino va pishloq', 'Guruch va tuz'], correct: 1 },
    { id: 2, text: 'Umumiy narx qancha?', options: ['Ikki euro', 'Uch euro', "O'n euro", 'Bir euro'], correct: 1 },
    { id: 3, text: 'Xaridor narx haqida nima deydi?', options: ['Juda qimmat', 'Qimmat emas', 'Juda arzon', 'Hech narsa'], correct: 1 },
    { id: 4, text: 'Sotuvchi yana nima taklif qiladi?', options: ['Non', 'Muzqaymoq', 'Vino', 'Pishloq'], correct: 1 },
    { id: 5, text: "Xaridor qanday to'lamoqchi?", options: ['Naqd pul', 'Karta bilan', "To'lamaydi", 'Aniq emas'], correct: 1 },
  ],
};

const week11Listening = {
  title: 'A cucina siciliana',
  voice: 'it-IT-ElsaNeural',
  script: "Ciau a tutti! Oggi vi vogghiu parrari di la cucina siciliana. Nuautri amamu manciari pasta, pisci, e tanti alivi. A la matina, vogghiu sempri un cafè cu un pocu di pani. Pi prànzu, mi piaci a pasta cu pumaroru frisco. E doppu manciari, mi piaci sempri un gelatu — pirchì u gelatu sicilianu è u megghiu di lu munnu! Aju bisognu di pocu dinari pi manciari beni ccà, pirchì tuttu è a bon mircatu. Grazii pi m'aviri ascutatu!",
  questions: [
    { id: 1, text: 'Sitsiliyaliklar nimalarni sevib yeyishadi?', options: ['Faqat non', 'Pasta, baliq, zaytun', 'Faqat guruch', 'Faqat go\'sht'], correct: 1 },
    { id: 2, text: 'Ertalab nima ichadi?', options: ['Choy', 'Kofe', 'Sut', 'Suv'], correct: 1 },
    { id: 3, text: 'Tushlikda nimani yaxshi ko\'radi?', options: ['Guruchli taom', 'Pomidorli pasta', "Go'shtli taom", 'Baliq'], correct: 1 },
    { id: 4, text: 'Ovqatdan keyin doim nima yeydi?', options: ['Meva', 'Muzqaymoq', 'Shokolad', 'Pechenye'], correct: 1 },
    { id: 5, text: 'Sitsiliyada ovqatlanish uchun ko\'p pul kerakmi?', options: ['Ha, juda qimmat', "Yo'q, arzon", "O'rtacha", 'Aytilmagan'], correct: 1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// WEEK 12 — Yakuniy takrorlash (A1 final)
// ─────────────────────────────────────────────────────────────────────────

const week12Words = [
  { word: 'Bongiornu', translation: 'salom, xayrli kun', definition: "Kun davomida uchrashganda aytiladigan salomlashish so'zi.", example: 'Bongiornu, comu stai?', partOfSpeech: 'interjection' },
  { word: 'Grazii', translation: 'rahmat', definition: "Minnatdorchilik bildirish uchun ishlatiladigan so'z.", example: 'Grazii assai pi tuttu.', partOfSpeech: 'interjection' },
  { word: 'Sì', translation: 'ha', definition: "Tasdiqlash uchun ishlatiladigan so'z.", example: 'Sì, vegnu cu tia.', partOfSpeech: 'adverb' },
  { word: 'No', translation: "yo'q", definition: "Inkor qilish uchun ishlatiladigan so'z.", example: "No, nun è veru.", partOfSpeech: 'adverb' },
  { word: 'iu', translation: 'men', definition: 'Gapiruvchi shaxsni bildiruvchi olmosh.', example: 'Iu sugnu sicilianu.', partOfSpeech: 'pronoun' },
  { word: 'tu', translation: 'sen', definition: 'Suhbatdoshni bildiruvchi olmosh.', example: 'Tu si simpaticu.', partOfSpeech: 'pronoun' },
  { word: 'idda', translation: 'u (ayol)', definition: 'Ayol jinsidagi uchinchi shaxsni bildiruvchi olmosh.', example: 'Idda è me soru.', partOfSpeech: 'pronoun' },
  { word: 'città', translation: 'shahar', definition: "Ko'p odamlar yashaydigan katta aholi punkti.", example: "Palermu è 'na città bedda.", partOfSpeech: 'noun' },
  { word: 'casa', translation: 'uy', definition: 'Odamlar yashaydigan bino.', example: 'Vaju a la me casa.', partOfSpeech: 'noun' },
  { word: 'beddu', translation: 'chiroyli', definition: 'Ko\'rinishi yoqimli ekanini bildiradi.', example: 'Chi bedda jurnata!', partOfSpeech: 'adjective' },
  { word: 'me', translation: 'mening', definition: "1-shaxs birlik egalikni bildiruvchi olmosh.", example: 'Chistu è u me libbru.', partOfSpeech: 'pronoun' },
  { word: 'manciari', translation: 'yemoq', definition: "Ovqat iste'mol qilish.", example: "Manciamu 'nsemmula.", partOfSpeech: 'verb' },
  { word: 'parrari', translation: 'gapirmoq', definition: "Og'zaki muloqot qilish.", example: "Parramu sicilianu 'nsemmula.", partOfSpeech: 'verb' },
  { word: 'unni', translation: 'qayerda', definition: "Joyni so'rash uchun ishlatiladigan so'roq so'zi.", example: 'Unni sta la stazioni?', partOfSpeech: 'adverb' },
  { word: 'quantu', translation: 'qancha', definition: "Miqdorni so'rash uchun ishlatiladigan so'roq so'zi.", example: 'Quantu costa chistu?', partOfSpeech: 'adverb' },
  { word: 'cu', translation: 'bilan', definition: "Birga bo'lishni bildiruvchi predlog.", example: 'Vaju cu tia.', partOfSpeech: 'preposition' },
  { word: 'oggi', translation: 'bugun', definition: 'Hozirgi kunni bildiruvchi so\'z.', example: "Oggi è 'na bedda jurnata.", partOfSpeech: 'adverb' },
  { word: 'vuliri', translation: 'xohlamoq', definition: 'Biror narsani istash.', example: "Vogghiu 'nu cafè.", partOfSpeech: 'verb' },
  { word: 'famigghia', translation: 'oila', definition: "Bir-biriga qarindosh bo'lgan odamlar guruhi.", example: 'La me famigghia è granni.', partOfSpeech: 'noun' },
  { word: 'travagghiari', translation: 'ishlamoq', definition: 'Mehnat qilish.', example: 'Travagghiu tutti i jorna.', partOfSpeech: 'verb' },
];

const week12Grammar = {
  questions: [
    { id: 1, text: "Iu ___ cuntenti. (essiri)", options: ['sugnu', 'si', 'è', 'semu'], correct: 0, explanation: '1-shaxs birlik: sugnu.' },
    { id: 2, text: "Iddu ___ 'na machina. (aviri)", options: ['aju', 'hai', 'havi', 'avemu'], correct: 2, explanation: '3-shaxs birlik: havi.' },
    { id: 3, text: 'Ayol jinsidagi otning aniq artikli birlikda?', options: ['u', 'a', 'i', 'un'], correct: 1, explanation: 'Ayol jinsi birlikda: a.' },
    { id: 4, text: "'Biz' olmoshi?", options: ['vuautri', 'nuautri', 'iddi', 'iu'], correct: 1, explanation: 'nuautri — biz.' },
    { id: 5, text: "'Chiroyli' sifati?", options: ['bruttu', 'beddu', 'malu', 'vecchiu'], correct: 1, explanation: 'beddu — chiroyli.' },
    { id: 6, text: "'Yemoq' fe'li infinitivda?", options: ['manciari', 'parrari', 'durmiri', 'sèntiri'], correct: 0, explanation: 'manciari — yemoq.' },
    { id: 7, text: 'Inkor qanday hosil qilinadi?', options: ["Fe'ldan keyin no", "Fe'ldan oldin nun", "O'zgarmaydi", 'Olmosh bilan'], correct: 1, explanation: 'nun fe\'ldan oldin qo\'yiladi.' },
    { id: 8, text: "'Bilan' predlogi?", options: ['pi', 'cu', 'di', 'a'], correct: 1, explanation: 'cu — bilan.' },
    { id: 9, text: "'O'n' soni?", options: ['deci', 'centu', 'vinti', 'unu'], correct: 0, explanation: "deci — o'n." },
    { id: 10, text: "'Xohlamoq' fe'li?", options: ['putiri', 'vuliri', 'duviri', 'sapiri'], correct: 1, explanation: 'vuliri — xohlamoq.' },
    { id: 11, text: "'-a olmoq' (imkoniyat) fe'li?", options: ['vuliri', 'putiri', 'aviri', 'essiri'], correct: 1, explanation: 'putiri — -a olmoq.' },
    { id: 12, text: 'Sitsiliyachada asosiy gap tartibi?', options: ["Fe'l+Ega+To'ldiruvchi", "Ega+Fe'l+To'ldiruvchi", "To'ldiruvchi+Ega+Fe'l", 'Erkin'], correct: 1, explanation: "Ega+Fe'l+To'ldiruvchi." },
    { id: 13, text: "'Qayerda' so'roq so'zi?", options: ['chi', 'cui', 'unni', 'quannu'], correct: 2, explanation: 'unni — qayerda.' },
    { id: 14, text: "'Qachon' so'roq so'zi?", options: ['unni', 'quannu', 'comu', 'pirchì'], correct: 1, explanation: 'quannu — qachon.' },
    { id: 15, text: 'Sifat ot bilan qanday moslashadi?', options: ['Faqat sonda', 'Faqat jinsda', 'Jins va sonda', 'Moslashmaydi'], correct: 2, explanation: 'Sifat jins va sonda moslashadi.' },
    { id: 16, text: "Egalik olmoshi qarindoshlik so'zlari bilan qanday ishlatiladi?", options: ['Artikl bilan', 'Artiklsiz', 'Faqat ko\'plikda', 'Ishlatilmaydi'], correct: 1, explanation: 'me patri, so soru — artiklsiz.' },
    { id: 17, text: "'Uy' sitsiliyacha?", options: ['libbru', 'casa', 'cani', 'mari'], correct: 1, explanation: 'casa — uy.' },
    { id: 18, text: "'Bugun' sitsiliyacha?", options: ['dumani', 'ajeri', 'oggi', 'ora'], correct: 2, explanation: 'oggi — bugun.' },
    { id: 19, text: "'Rahmat' sitsiliyacha?", options: ['Scusati', 'Grazii', 'Sì', 'No'], correct: 1, explanation: 'Grazii — rahmat.' },
    { id: 20, text: "Passatu Prossimu (o'tgan zamon) qanday tuziladi?", options: ["essiri/aviri + sifatdosh", "Faqat fe'l o'zagi", "Olmosh + fe'l", 'Artikl + fe\'l'], correct: 0, explanation: 'Aviri yoki essiri (hozirgi zamon) + o\'tgan zamon sifatdoshi.' },
  ],
};

const week12Reading = {
  title: "Tutti 'nsemmula",
  pages: [
    [
      { type: 'heading', text: "Tutti 'nsemmula" },
      { type: 'p', text: "Oggi, Peppi, Maria, Turi, Anna, e Rosa si 'ncontranu 'nta la chiazza di Palermu." },
      { type: 'p', text: 'Peppi: Ciau a tutti! Comu stati?' },
    ],
    [
      { type: 'p', text: 'Maria: Semu tutti beni, grazii! Rosa, tu si ancora studentissa?' },
      { type: 'p', text: 'Rosa: Sì, studiu medicina. E tu, Turi, ancora dutturi?' },
      { type: 'p', text: 'Turi: Sì! E travagghiu assai.' },
    ],
    [
      { type: 'p', text: "Anna: Vuliti manciari 'nsemmula? Conoscu 'nu ristoranti bonu, nun è caru." },
      { type: 'p', text: 'Tutti: Sì, jamuninni!' },
    ],
    [
      { type: 'p', text: 'Peppi: Chista è \'na bedda jurnata cu tutti i me amici sicilianu.' },
      { type: 'p', text: 'Maria: Grazii a tutti! Ni videmu prestu!' },
    ],
  ],
  questions: [
    { id: 1, text: 'Necha kishi maydonda uchrashadi?', options: ['uch', "to'rt", 'besh', 'olti'], correct: 2 },
    { id: 2, text: 'Rosa nima o\'qiydi?', options: ['Huquq', 'Tibbiyot', "San'at", 'Muhandislik'], correct: 1 },
    { id: 3, text: 'Turi kasbi hali ham qanday?', options: ["O'qituvchi", 'Shifokor', 'Advokat', 'Oshpaz'], correct: 1 },
    { id: 4, text: 'Anna nimani taklif qiladi?', options: ['Kinoga borish', 'Birga ovqatlanish', 'Uyga qaytish', 'Sport qilish'], correct: 1 },
    { id: 5, text: 'Restoran haqida nima aytiladi?', options: ['Juda qimmat', 'Yaxshi va qimmat emas', 'Yopiq', 'Uzoq'], correct: 1 },
    { id: 6, text: 'Hikoya qayerda bo\'lib o\'tadi?', options: ['Catania', 'Palermu', 'Messina', 'Sarausa'], correct: 1 },
  ],
};

const week12Listening = {
  title: 'U me caminu \'n sicilianu',
  voice: 'it-IT-ElsaNeural',
  script: "Ciau a tutti! Haju finutu u primu livellu di sicilianu, e sugnu tantu cuntenti! Prima, nun capisciva nenti, ma ora pozzu parrari di la me famigghia, di lu me travagghiu, e pozzu spiari direzioni 'nta la città. Sacciu i numeri, i jorna di la simana, e macari comu accattari cosi o mircatu. Ancora aju tantu di 'mparari, ma sugnu orgugghiusu di lu me caminu. Grazii a tutti pi m'aviri ascutatu, e ni videmu 'nto prossimu livellu — A2! Addiu, e bonu studiu!",
  questions: [
    { id: 1, text: 'Gapiruvchi qaysi darajani tugatdi?', options: ['A2', 'B1', 'A1', 'B2'], correct: 2 },
    { id: 2, text: 'Boshida nima qila olmasdi?', options: ["Yozib olmasdi", 'Hech narsa tushunmasdi', "Ko'ra olmasdi", "Yura olmasdi"], correct: 1 },
    { id: 3, text: 'Endi nima haqida gapira oladi (uchtasidan biri)?', options: ['Faqat ob-havo', 'Oila, ish, yo\'nalish', 'Faqat sport', 'Faqat siyosat'], correct: 1 },
    { id: 4, text: 'Nimalarni biladi (sanalganlardan)?', options: ['Faqat ranglar', 'Raqamlar, haftaning kunlari, xarid qilish', 'Faqat hayvonlar', 'Faqat kasblar'], correct: 1 },
    { id: 5, text: "O'zini qanday his qiladi?", options: ['Xafa', 'Faxrlanadi', 'Bezovta', 'Loqayd'], correct: 1 },
    { id: 6, text: 'Keyingi daraja qanday nomlanadi?', options: ['A1', 'A2', 'B1', 'C1'], correct: 1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────

export const sicilianA1Months = [
  { id: 'scn-a1-w1', title: '1-hafta — Boshlash', units: [{ id: 'scn-a1-w1-u1', title: 'Salomlashish va olmoshlar', words: week1Words, grammar: week1Grammar, reading: week1Reading, listening: week1Listening }] },
  { id: 'scn-a1-w2', title: "2-hafta — Essiri (bo'lmoq)", units: [{ id: 'scn-a1-w2-u1', title: 'Kasblar va sifatlar', words: week2Words, grammar: week2Grammar, reading: week2Reading, listening: week2Listening }] },
  { id: 'scn-a1-w3', title: "3-hafta — Aviri (ega bo'lmoq)", units: [{ id: 'scn-a1-w3-u1', title: 'Oila va tana qismlari', words: week3Words, grammar: week3Grammar, reading: week3Reading, listening: week3Listening }] },
  { id: 'scn-a1-w4', title: '4-hafta — Ot tizimi', units: [{ id: 'scn-a1-w4-u1', title: "Jins, ko'plik, artikllar", words: week4Words, grammar: week4Grammar, reading: week4Reading, listening: week4Listening }] },
  { id: 'scn-a1-w5', title: '5-hafta — Sifatlar', units: [{ id: 'scn-a1-w5-u1', title: 'Sifatlar va tasvirlash', words: week5Words, grammar: week5Grammar, reading: week5Reading, listening: week5Listening }] },
  { id: 'scn-a1-w6', title: '6-hafta — Egalik', units: [{ id: 'scn-a1-w6-u1', title: 'Egalik olmoshlari', words: week6Words, grammar: week6Grammar, reading: week6Reading, listening: week6Listening }] },
  { id: 'scn-a1-w7', title: '7-hafta — Hozirgi zamon', units: [{ id: 'scn-a1-w7-u1', title: "Fe'llar va kundalik hayot", words: week7Words, grammar: week7Grammar, reading: week7Reading, listening: week7Listening }] },
  { id: 'scn-a1-w8', title: '8-hafta — Inkor va savollar', units: [{ id: 'scn-a1-w8-u1', title: 'Savol so\'zlari va iboralar', words: week8Words, grammar: week8Grammar, reading: week8Reading, listening: week8Listening }] },
  { id: 'scn-a1-w9', title: '9-hafta — Predloglar', units: [{ id: 'scn-a1-w9-u1', title: "Shahar va yo'nalishlar", words: week9Words, grammar: week9Grammar, reading: week9Reading, listening: week9Listening }] },
  { id: 'scn-a1-w10', title: '10-hafta — Vaqt va raqamlar', units: [{ id: 'scn-a1-w10-u1', title: 'Hafta kunlari va sonlar', words: week10Words, grammar: week10Grammar, reading: week10Reading, listening: week10Listening }] },
  { id: 'scn-a1-w11', title: '11-hafta — Kundalik hayot', units: [{ id: 'scn-a1-w11-u1', title: 'Ovqat va xarid qilish', words: week11Words, grammar: week11Grammar, reading: week11Reading, listening: week11Listening }] },
  { id: 'scn-a1-w12', title: '12-hafta — Yakuniy takrorlash', units: [{ id: 'scn-a1-w12-u1', title: 'A1 final boss', words: week12Words, grammar: week12Grammar, reading: week12Reading, listening: week12Listening }] },
];
