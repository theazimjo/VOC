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
  { word: 'nomu', translation: 'ism', definition: 'Odamning ismini bildiruvchi so\'z.', example: 'Chi nomu hai?', partOfSpeech: 'noun' },
  { word: 'paisi', translation: "mamlakat, yurt", definition: "Kishi tug'ilgan yoki yashaydigan mamlakat/qishloq-shahar.", example: 'Di chi paisi si?', partOfSpeech: 'noun' },
  { word: 'città', translation: 'shahar', definition: "Ko'p odamlar yashaydigan katta aholi punkti.", example: "Palermu è 'na città bedda.", partOfSpeech: 'noun' },
];

const week1Grammar = {
  questions: [
    { id: 1, text: 'Kimdir bilan birinchi marta ertalab/kunduzi uchrashganda nima deyiladi?', options: ['Bonasira', 'Bongiornu', 'Bonanotti', 'Addiu'], correct: 1, explanation: 'Bongiornu — kun davomida ishlatiladigan salomlashish.' },
    { id: 2, text: 'Kechqurun uchrashganda qanday salomlashiladi?', options: ['Bongiornu', 'Bonasira', 'Ciau', 'Grazii'], correct: 1, explanation: 'Bonasira — kechqurungi salomlashish.' },
    { id: 3, text: 'Uxlashdan oldin nima deyiladi?', options: ['Bonanotti', 'Bongiornu', 'Scusati', 'Sì'], correct: 0, explanation: 'Bonanotti — xayrli tun.' },
    { id: 4, text: "Norasmiy holatda ham salom, ham xayr ma'nosida ishlatiladigan so'z?", options: ['Addiu', 'Ciau', 'Grazii', 'No'], correct: 1, explanation: 'Ciau ikkala ma\'noda ham ishlatiladi.' },
    { id: 5, text: "Minnatdorchilik bildirish uchun ishlatiladigan so'z?", options: ['Scusati', 'Pi favuri', 'Grazii', 'Sì'], correct: 2, explanation: 'Grazii — rahmat.' },
    { id: 6, text: 'Iltimos qilishda ishlatiladigan ibora?', options: ['Pi favuri', 'Grazii', 'No', 'Sì'], correct: 0, explanation: 'Pi favuri — iltimos.' },
    { id: 7, text: "Kechirim so'rash uchun ishlatiladigan so'z?", options: ['Scusati', 'Ciau', 'Addiu', 'Sì'], correct: 0, explanation: 'Scusati — kechirasiz.' },
    { id: 8, text: 'Tasdiqlash uchun ishlatiladigan so\'z?', options: ['No', 'Sì', 'Scusati', 'Ciau'], correct: 1, explanation: 'Sì — ha.' },
    { id: 9, text: 'Inkor qilish uchun ishlatiladigan so\'z?', options: ['Sì', 'No', 'Grazii', 'Pi favuri'], correct: 1, explanation: 'No — yo\'q.' },
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
    { id: 20, text: 'Sitsiliyachada oddiy gap tuzilishi asosan qanday tartibda bo\'ladi?', options: ["Fe'l + Ega + To'ldiruvchi", "Ega + Fe'l + To'ldiruvchi", "To'ldiruvchi + Ega + Fe'l", "Tartib erkin, farqi yo'q"], correct: 1, explanation: "Sitsiliyachada ham, o'zbek va ingliz kabi, asosiy tartib Ega+Fe'l+To'ldiruvchi." },
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
    { id: 1, text: "Gapiruvchining ismi nima?", options: ['Maria', 'Rosa', 'Anna', 'Turi'], correct: 1 },
    { id: 2, text: 'U qaysi shahardan?', options: ['Palermu', 'Catania', 'Sarausa', 'Messina'], correct: 2 },
    { id: 3, text: 'Uning onasining ismi nima?', options: ['Rosa', 'Anna', 'Maria', 'Turi'], correct: 1 },
    { id: 4, text: 'Uning otasining ismi nima?', options: ['Peppi', 'Turi', 'Anna', 'Rosa'], correct: 1 },
    { id: 5, text: "U kim bo'lib o'qiydi?", options: ['Shifokor', "O'qituvchi", 'Talaba', 'Oshpaz'], correct: 2 },
  ],
};

export const sicilianA1Months = [
  {
    id: 'scn-a1-w1',
    title: '1-hafta — Boshlash',
    units: [
      {
        id: 'scn-a1-w1-u1',
        title: 'Salomlashish va olmoshlar',
        words: week1Words,
        grammar: week1Grammar,
        reading: week1Reading,
        listening: week1Listening,
      },
    ],
  },
];
