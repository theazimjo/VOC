// Landing copy, Uzbek (default), Russian and English. Claims here must stay true:
//  - "40+ learners" comes from README.md / PRODUCT.md (Evidence on Hand).
//  - Evidence numbers come from packages/memory-engine/eval/fit.js on the
//    2026-10-05 export (37,852 replayed predictions, 24 learners, 8 held out,
//    AUC 0.78 vs 0.50). Re-run `npm run fit:memory` and update them together
//    with the blog post "measured-not-guessed".
//  - Everything on the two boards is labelled sample data in the UI.

export const EVIDENCE = {
  predictions: '37 000',
  learners: 24,
  heldOut: 8,
  auc: 0.78,
  baselineAuc: 0.5,
};

export const EVIDENCE_POST = '/blog/measured-not-guessed';

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
    decimal: ',',
    nav: { how: 'Qanday ishlaydi', evidence: 'Natijalar', centers: 'Markazlar uchun', faq: 'Savollar', blog: 'Blog', login: 'Kirish', start: 'Boshlash' },
    hero: {
      title: "Har bir so'zning o'z vaqti bor.",
      sub: "VOC har bir so'zni sizning o'zingiz uchun alohida kuzatadi va unutilishiga oz qolganda qaytaradi.",
      primary: 'Bepul boshlash',
      secondary: "O'quv markazlari uchun",
      note: "Beta versiya: hozir 40 dan ortiq o'quvchi foydalanmoqda.",
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
      foot: "Har bir so'z o'z tezligida unutiladi, takrorlash esa buni sekinlashtiradi.",
      aria: "Namuna takrorlash jadvali: so'zlar vaqt o'tishi bilan qanday unutilishi",
    },
    how: {
      title: "Model har bir javobdan o'rganadi.",
      lead: "Hamma so'z uchun bitta jadval o'rniga VOC har bir so'z sizda qanday ketayotganiga qaraydi.",
      steps: [
        { name: 'Javob', body: "Har bir javobda qanchalik tez va ishonch bilan javob berganingiz, yozdingizmi yoki variantdan tanladingiz, hammasi yoziladi." },
        { name: 'Baho', body: "Shundan, so'zning sizdagi oldingi natijalaridan va umumiy aniqligingizdan hozir uni eslay olish ehtimoli chiqariladi." },
        { name: 'Reys', body: "Ehtimoli past so'zlar takrorlash ro'yxatiga tushadi. Qiyinlari tez-tez, osonlari kamroq qaytadi." },
      ],
    },
    evidence: {
      title: 'Ishlashini o\'lchadik.',
      lead: "Modelni haqiqiy takrorlarda, u ko'rmagan o'quvchilarda sinab ko'rdik.",
      baseline: "Hamma uchun bir xil o'rtacha taxmin",
      model: 'VOC modeli',
      axis: "Qaysi so'z unutilishini ajratish aniqligi (AUC): 0,5 tasodif, 1 mukammal.",
      facts: [
        "37 000 dan ortiq real takror tahlil qilindi.",
        "24 o'quvchi ma'lumoti; ulardan 8 tasi model o'qitilganda ko'rsatilmagan.",
      ],
      caveat: "Bu hali boshlang'ich natija. O'quvchilar ko'payganda qayta o'lchab, shu yerda yangilaymiz.",
      more: "Qanday o'lchaganimizni blogda yozdik (inglizcha)",
    },
    centers: {
      title: "Uy vazifasi berdingiz. Kim bajargani darrov ko'rinadi.",
      points: [
        "O'qituvchi guruh yaratadi, talabalar QR yoki 6 xonali kod bilan qo'shiladi.",
        "Markaz egasi qaysi guruh faol, qaysi biri jim qolganini haftada bir qarashda ko'radi.",
        "Talaba o'z shaxsiy hisobi bilan qo'shiladi va kurs tugagach tarixi o'zida qoladi.",
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
    faq: {
      title: "Ko'p so'raladigan savollar",
      items: [
        { q: "Beta versiya nimani anglatadi?", a: "VOC hozir beta versiyada ishlayapti. Asosiy imkoniyatlar ishlaydi va o'quvchilar undan foydalanmoqda, lekin biz uni hali takomillashtiryapmiz, shuning uchun ayrim kamchiliklar uchrashi mumkin." },
        { q: "Boshqa takrorlash ilovalaridan nimasi bilan farq qiladi?", a: "Ko'pchilik ilovalar hamma so'zga bir xil intervallar jadvalini qo'llaydi. VOC har bir so'zga alohida qaraydi: u sizda qanday ketayotganiga qarab qachon qaytarishni hal qiladi." },
        { q: 'Telefonda ishlaydimi?', a: "Ha. Telefon brauzerida ishlaydi, uni bosh ekranga qo'shsangiz ilova kabi ochiladi." },
        { q: "Mening ma'lumotlarim qanday ishlatiladi?", a: "Javoblar tarixi hisobingizda saqlanadi va takrorlash jadvalini hisoblash uchun ishlatiladi. Modelni yaxshilash uchun uni anonim, umumlashtirilgan holda tahlil qilishimiz ham mumkin: ism va email bunga kirmaydi." },
        { q: "O'quv markazi qanday ulanadi?", a: "Hozircha markazlarni jamoamiz qo'lda ulaydi. Keyin o'qituvchi guruh yaratadi, talabalar QR yoki 6 xonali kod bilan qo'shiladi." },
        { q: "Kurs tugagach nima bo'ladi?", a: "Hisobingiz va so'zlar tarixingiz o'zingizda qoladi, shaxsiy rejimda davom etasiz." },
        { q: "Qaysi tilni o'rgatadi?", a: "Ingliz tili lug'ati va grammatikasi. Interfeys o'zbekcha, rus va ingliz tillari ham bor." },
      ],
    },
    close: { title: "Birinchi so'zingizni bugun qo'shing.", cta: 'Bepul boshlash' },
    footer: { login: 'Kirish', start: 'Boshlash', beta: 'Beta versiya' },
  },
  ru: {
    langLabel: 'Язык',
    decimal: ',',
    nav: { how: 'Как это работает', evidence: 'Результаты', centers: 'Для центров', faq: 'Вопросы', blog: 'Блог', login: 'Войти', start: 'Начать' },
    hero: {
      title: 'У каждого слова — своё время.',
      sub: 'VOC следит за каждым словом отдельно, именно для вас, и возвращает его, когда вы вот-вот его забудете.',
      primary: 'Начать бесплатно',
      secondary: 'Для учебных центров',
      note: 'Бета-версия: сегодня ею пользуются более 40 учеников.',
    },
    board: {
      title: 'Повторение на сегодня',
      sample: 'Пример данных',
      day: 'День',
      cols: { word: 'Слово', recall: 'Вспомню', status: 'Статус' },
      status: { good: 'ХОРОШО', soon: 'СКОРО', due: 'ПОВТОРИ' },
      review: 'Повторить',
      advance: '+1 день',
      reset: 'Сначала',
      foot: 'Каждое слово забывается со своей скоростью, а повторение это замедляет.',
      aria: 'Пример доски повторения: как слова забываются со временем',
    },
    how: {
      title: 'Модель учится на каждом ответе.',
      lead: 'Вместо одного расписания для всех слов VOC смотрит, как каждое слово идёт именно у вас.',
      steps: [
        { name: 'Ответ', body: 'В каждом ответе записывается, как быстро и уверенно вы ответили, вводили слово или выбирали вариант.' },
        { name: 'Оценка', body: 'По этому, по прошлым результатам слова у вас и по вашей общей точности считается шанс вспомнить его сейчас.' },
        { name: 'Очередь', body: 'Слова с низким шансом попадают в список повторения. Трудные возвращаются чаще, лёгкие реже.' },
      ],
    },
    evidence: {
      title: 'Мы измерили, как это работает.',
      lead: 'Проверили модель на реальных повторениях, на учениках, которых она не видела.',
      baseline: 'Одинаковый средний прогноз для всех',
      model: 'Модель VOC',
      axis: 'Насколько хорошо отделяются слова, которые вы забудете, от тех, которые запомните (AUC): 0,5 — случайность, 1 — идеал.',
      facts: [
        'Проанализировано более 37 000 реальных повторений.',
        'Данные 24 учеников; 8 из них не использовались при обучении модели.',
      ],
      caveat: 'Пока это предварительный результат. Когда учеников станет больше, пересчитаем и обновим здесь.',
      more: 'Как мы это измеряли, описано в блоге (на английском)',
    },
    centers: {
      title: 'Задание выдали. Кто его сделал, видно сразу.',
      points: [
        'Учитель создаёт группу, ученики подключаются по QR-коду или 6-значному коду.',
        'Владелец центра раз в неделю видит, какие группы активны, а какие затихли.',
        'Ученик подключается со своим личным аккаунтом, и после курса история остаётся у него.',
      ],
      cta: 'Войти',
      ctaContact: 'Связаться как центр',
      note: 'Центры мы пока подключаем вручную.',
      board: {
        title: 'Статус группы',
        cols: { student: 'Ученик', today: 'Сегодня, слов', status: 'Статус' },
        status: { done: 'ЗАНИМАЛСЯ', none: 'СЕГОДНЯ НЕТ', quiet: '3 ДНЯ ТИШИНЫ' },
        aria: 'Пример статуса группы',
      },
    },
    faq: {
      title: 'Вопросы и ответы',
      items: [
        { q: 'Что значит «бета-версия»?', a: 'VOC сейчас работает в бета-версии. Основные возможности работают, ею пользуются ученики, но мы всё ещё её дорабатываем, поэтому возможны недочёты.' },
        { q: 'Чем это отличается от других приложений для повторения?', a: 'Большинство приложений применяет ко всем словам одно расписание интервалов. VOC смотрит на каждое слово отдельно: по тому, как оно идёт у вас, он решает, когда его вернуть.' },
        { q: 'Работает ли на телефоне?', a: 'Да. Работает в браузере телефона, а если добавить на главный экран, открывается как приложение.' },
        { q: 'Как используются мои данные?', a: 'История ответов хранится в вашем аккаунте и нужна для расчёта расписания повторений. Чтобы улучшать модель, мы можем анализировать её и в обезличенном, сводном виде: имена и email в это не входят.' },
        { q: 'Как подключается учебный центр?', a: 'Пока центры подключает наша команда вручную. Дальше учитель создаёт группу, а ученики подключаются по QR-коду или 6-значному коду.' },
        { q: 'Что будет после окончания курса?', a: 'Ваш аккаунт и история слов остаются у вас, дальше вы учитесь в личном режиме.' },
        { q: 'Какой язык он преподаёт?', a: 'Английскую лексику и грамматику. Интерфейс на узбекском, есть также русский и английский.' },
      ],
    },
    close: { title: 'Добавьте первое слово сегодня.', cta: 'Начать бесплатно' },
    footer: { login: 'Войти', start: 'Начать', beta: 'Бета-версия' },
  },
  en: {
    langLabel: 'Language',
    decimal: '.',
    nav: { how: 'How it works', evidence: 'Results', centers: 'For centers', faq: 'FAQ', blog: 'Blog', login: 'Log in', start: 'Get started' },
    hero: {
      title: 'Every word has its own time.',
      sub: 'VOC tracks every word separately, just for you, and brings it back when you are about to forget it.',
      primary: 'Start free',
      secondary: 'For learning centers',
      note: 'Beta version: more than 40 learners use it today.',
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
      foot: 'Each word fades at its own speed, and reviewing slows that down.',
      aria: 'Sample review board showing how words fade over time',
    },
    how: {
      title: 'The model learns from every answer.',
      lead: 'Instead of one schedule for every word, VOC looks at how each word is going for you.',
      steps: [
        { name: 'Answer', body: 'Every answer records how fast and how confidently you replied, and whether you typed it or picked an option.' },
        { name: 'Estimate', body: 'From that, the word’s earlier results with you and your overall accuracy, it works out the chance you can recall the word now.' },
        { name: 'Board', body: 'Words with a low chance go on the review list. Hard ones come back often, easy ones less.' },
      ],
    },
    evidence: {
      title: 'We measured how well it works.',
      lead: 'We tested the model on real review logs, on learners it had never seen.',
      baseline: 'The same average guess for everyone',
      model: 'VOC model',
      axis: 'How well it separates words you will forget from words you will remember (AUC): 0.5 is chance, 1 is perfect.',
      facts: [
        'More than 37,000 real reviews analysed.',
        '24 learners’ data; 8 of them were held out while the model was trained.',
      ],
      caveat: 'This is still an early result. As more learners join we will re-measure and update it here.',
      more: 'How we measured it is written up on the blog',
    },
    centers: {
      title: 'You set homework. You see who did it right away.',
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
    faq: {
      title: 'Questions',
      items: [
        { q: 'What does beta mean?', a: 'VOC is currently running as a beta. The core features work and learners are using it, but we are still improving it, so you may run into rough edges.' },
        { q: 'How is it different from other review apps?', a: 'Most apps apply one interval schedule to every word. VOC looks at each word on its own: from how it is going for you, it decides when to bring it back.' },
        { q: 'Does it work on a phone?', a: 'Yes. It runs in your phone browser, and if you add it to the home screen it opens like an app.' },
        { q: 'How is my data used?', a: 'Your answer history is stored in your account and used to compute your review schedule. To improve the model we may also analyse it in anonymised, aggregate form: names and emails are not part of that.' },
        { q: 'How does a learning center join?', a: 'For now our team onboards centers by hand. Then a teacher creates a group and students join with a QR code or a 6-digit code.' },
        { q: 'What happens when the course ends?', a: 'Your account and your word history stay with you, and you carry on in personal mode.' },
        { q: 'Which language does it teach?', a: 'English vocabulary and grammar. The interface is in Uzbek, with Russian and English also available.' },
      ],
    },
    close: { title: 'Add your first word today.', cta: 'Start free' },
    footer: { login: 'Log in', start: 'Get started', beta: 'Beta' },
  },
};
