// Landing copy, Uzbek (default) and English. Claims here must stay true:
//  - "40+ learners" comes from README.md / PRODUCT.md (Evidence on Hand).
//  - Evidence numbers come from packages/memory-engine/eval/fit.js on the
//    2026-10-05 export (37,852 replayed predictions, 24 learners, 8 held out,
//    AUC 0.78 vs 0.50). Re-run `npm run fit:memory` and update them together.
//  - Everything on the two boards is labelled sample data in the UI.

export const EVIDENCE = {
  predictions: '37 000',
  learners: 24,
  heldOut: 8,
  auc: 0.78,
  baselineAuc: 0.5,
};

export const WORDS = [
  { id: 'achieve', word: 'achieve', uz: 'erishmoq', stability: 16, elapsed: 1 },
  { id: 'fluent', word: 'fluent', uz: 'ravon', stability: 25, elapsed: 1 },
  { id: 'thorough', word: 'thorough', uz: 'puxta', stability: 10, elapsed: 2 },
  { id: 'consistent', word: 'consistent', uz: 'izchil', stability: 6, elapsed: 2 },
  { id: 'subtle', word: 'subtle', uz: 'nozik', stability: 3.7, elapsed: 2 },
  { id: 'reluctant', word: 'reluctant', uz: "istamaydigan", stability: 2.8, elapsed: 2 },
];

export const GROUP_ROWS = [
  { name: 'Madina', today: '24', status: 'done' },
  { name: 'Jasur', today: '12', status: 'done' },
  { name: 'Sevara', today: '0', status: 'none' },
  { name: 'Bekzod', today: '0', status: 'quiet' },
];

export const CONTENT = {
  uz: {
    langLabel: 'Til',
    nav: { how: 'Qanday ishlaydi', evidence: 'Natijalar', centers: 'Markazlar uchun', login: 'Kirish', start: 'Boshlash' },
    hero: {
      title: "Har bir so'zning o'z vaqti bor.",
      sub: "VOC har bir o'quvchi uchun har bir so'zni alohida kuzatadi va aynan unutilish arafasidagi so'zlarni takrorlashga qaytaradi.",
      primary: 'Bepul boshlash',
      secondary: "O'quv markazlari uchun",
      note: "Hozir 40 dan ortiq o'quvchi foydalanmoqda.",
    },
    board: {
      title: 'Bugungi takrorlash',
      sample: "Namuna ma'lumot",
      day: 'Kun',
      cols: { word: "So'z", recall: 'Eslab qolish', status: 'Holat' },
      status: { good: 'YAXSHI', soon: 'TEZDA', due: 'TAKRORLANG' },
      review: 'Takrorlash',
      advance: '+1 kun',
      reset: 'Boshidan',
      foot: "Har bir so'z o'z tezligida unutiladi. Takrorlash uni mustahkamlaydi.",
      aria: "Namuna takrorlash jadvali: so'zlar vaqt o'tishi bilan qanday unutilishi",
    },
    how: {
      title: "Model har bir javobdan o'rganadi.",
      lead: "Qat'iy interval jadvali o'rniga VOC har bir so'zning aynan sizdagi tarixiga qaraydi.",
      steps: [
        { name: 'Javob', body: "Qanchalik tez va ishonch bilan javob berdingiz, yozdingizmi yoki variantdan tanladingiz: hammasi hisobga olinadi." },
        { name: 'Baho', body: "So'zning sizdagi natijalari, oldingi ishonchingiz va umumiy aniqligingiz asosida hozir eslab qolish ehtimoli baholanadi." },
        { name: 'Reys', body: "Ehtimoli past so'zlar takrorlash ro'yxatiga chiqadi. Qiyin so'zlar tez-tez, oson so'zlar kamroq qaytadi." },
      ],
    },
    evidence: {
      title: "Taxmin emas, o'lchov.",
      lead: "Modelni o'quvchilarning haqiqiy takrorlari bo'yicha, unga ko'rsatilmagan o'quvchilarda sinab ko'rdik.",
      baseline: "Hamma uchun bir xil o'rtacha taxmin",
      model: 'VOC modeli',
      axis: "Qaysi so'z unutilishini ajratish aniqligi (AUC): 0,5 tasodif, 1 mukammal.",
      facts: [
        "37 000 dan ortiq real takror tahlil qilindi.",
        "24 o'quvchi ma'lumoti; ulardan 8 tasi model o'qitilganda ko'rsatilmagan.",
      ],
      caveat: "Bu dastlabki natija. O'quvchilar soni ortgani sari uni qayta o'lchab, shu yerda yangilab boramiz.",
    },
    centers: {
      title: "Uy vazifasi berildi. Kim mashq qilgani bir qarashda ko'rinadi.",
      points: [
        "O'qituvchi guruh yaratadi, talabalar QR yoki 6 xonali kod bilan qo'shiladi.",
        "Markaz egasi qaysi guruh faol, qaysi biri jim qolganini haftada bir qarashda ko'radi.",
        "Talaba o'z shaxsiy hisobi bilan qo'shiladi, kurs tugagach tarixi o'zida qoladi.",
      ],
      cta: 'Kirish',
      ctaContact: "Markaz sifatida bog'lanish",
      note: "Markazlarni hozircha jamoamiz qo'lda ulaydi.",
      board: {
        title: 'Guruh holati',
        cols: { student: 'Talaba', today: "Bugun, so'z", status: 'Holat' },
        status: { done: 'MASHQ QILDI', none: "BUGUN YO'Q", quiet: '3 KUN JIM' },
        aria: "Namuna guruh holati jadvali",
      },
    },
    close: { title: "Birinchi so'zingizni bugun qo'shing.", cta: 'Bepul boshlash' },
    footer: { login: 'Kirish', start: 'Boshlash' },
  },
  en: {
    langLabel: 'Language',
    nav: { how: 'How it works', evidence: 'Results', centers: 'For centers', login: 'Log in', start: 'Get started' },
    hero: {
      title: 'Every word has its own time.',
      sub: 'VOC tracks every word separately for every learner and brings back exactly the words that are about to be forgotten.',
      primary: 'Start free',
      secondary: 'For learning centers',
      note: 'More than 40 learners use it today.',
    },
    board: {
      title: "Today's review",
      sample: 'Sample data',
      day: 'Day',
      cols: { word: 'Word', recall: 'Recall', status: 'Status' },
      status: { good: 'GOOD', soon: 'SOON', due: 'REVIEW' },
      review: 'Review',
      advance: '+1 day',
      reset: 'Reset',
      foot: 'Each word fades at its own speed. Reviewing it makes the memory stronger.',
      aria: 'Sample review board showing how words fade over time',
    },
    how: {
      title: 'The model learns from every answer.',
      lead: 'Instead of a fixed interval schedule, VOC looks at the history of each word with you specifically.',
      steps: [
        { name: 'Answer', body: 'How fast and how confidently you answered, whether you typed it or picked an option: all of it counts.' },
        { name: 'Estimate', body: 'From the word’s record with you, your earlier confidence and your overall accuracy, it estimates the chance you recall the word now.' },
        { name: 'Board', body: 'Words with a low chance go on the review list. Hard words return often, easy words less often.' },
      ],
    },
    evidence: {
      title: 'Measured, not guessed.',
      lead: 'We tested the model on real review logs, on learners it had never seen.',
      baseline: 'The same average guess for everyone',
      model: 'VOC model',
      axis: 'How well it separates words you will forget from words you will remember (AUC): 0.5 is chance, 1 is perfect.',
      facts: [
        'More than 37,000 real reviews analysed.',
        '24 learners’ data; 8 of them were held out while the model was trained.',
      ],
      caveat: 'This is an early result. As the number of learners grows we re-measure it and update this page.',
    },
    centers: {
      title: 'Homework assigned. See who practised at a glance.',
      points: [
        'A teacher creates a group; students join with a QR code or a 6-digit code.',
        'The center owner sees weekly which groups are active and which went quiet.',
        'Students join with their personal account and keep their history after the course ends.',
      ],
      cta: 'Log in',
      ctaContact: 'Contact us as a center',
      note: 'We currently onboard centers by hand.',
      board: {
        title: 'Group status',
        cols: { student: 'Student', today: 'Today, words', status: 'Status' },
        status: { done: 'PRACTISED', none: 'NOT TODAY', quiet: '3 DAYS QUIET' },
        aria: 'Sample group status board',
      },
    },
    close: { title: 'Add your first word today.', cta: 'Start free' },
    footer: { login: 'Log in', start: 'Get started' },
  },
};
