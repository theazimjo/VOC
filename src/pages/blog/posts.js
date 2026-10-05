// Blog posts. Add a new post by appending an object to POSTS (newest first).
//
// Each post: { slug, date (YYYY-MM-DD), minutes, tags?, uz: {...}, en: {...} }
// where a language block is { title, excerpt, body: Block[] }. Russian visitors
// see the Uzbek text until a ru block is added.
//
// Block kinds:
//   { type: 'p', text }            paragraph
//   { type: 'h2', text }           section heading
//   { type: 'ul', items: [] }      bullet list
//   { type: 'quote', text }        pull quote
//   { type: 'bars', title, note, rows: [{ label, value, tone? }] }
//       horizontal bars, value in 0..1; tone: 'base' | 'model' | 'mid'
//
// Numbers in the "measured" post come from packages/memory-engine
// (npm run fit:memory) on the 2026-10-05 export. Update both together.

export const POSTS = [
  {
    slug: 'taxmin-emas-olchov',
    date: '2026-10-05',
    minutes: 6,
    uz: {
      title: "Taxmin emas, o'lchov: xotira modelimizni real ma'lumotda sinab ko'rdik",
      excerpt: "Klassik unutish egri chizig'i bizning real takrorlarimizda oddiy o'rtacha taxmindan ham yomon chiqdi. Nima uchun va biz nima qildik.",
      body: [
        { type: 'p', text: "VOC har bir so'z uchun “siz uni hozir eslay olasizmi” degan ehtimolni baholaydi va shunga qarab nimani takrorlashni tanlaydi. Bunday modelni o'ylab topish oson, uning ishlashini isbotlash esa qiyin. Shuning uchun biz uni o'quvchilarning haqiqiy takrorlari bo'yicha, modelga ko'rsatilmagan o'quvchilarda sinab ko'rdik." },
        { type: 'h2', text: "Qanday sinadik" },
        { type: 'ul', items: [
          "24 o'quvchining 37 000 dan ortiq real takrori.",
          "O'quvchilarning uchdan bir qismi (8 tasi) sinov uchun ajratildi: model o'qitilganda ularni ko'rmagan.",
          "Natijani oddiy “hamma uchun bir xil o'rtacha taxmin” bilan solishtirdik. Agar murakkab model shundan yaxshi bo'lmasa, uning foydasi yo'q.",
        ] },
        { type: 'h2', text: "Kutilmagan natija" },
        { type: 'p', text: "Klassik yondashuv eslab qolish ehtimoli vaqt o'tishi bilan pasayadi deb hisoblaydi (Ebbinghaus egri chizig'i). Ko'rilmagan o'quvchilarda bu usul oddiy o'rtacha taxmindan yomonroq chiqdi: qaysi so'z unutilishini ajratish aniqligi (AUC) 0,53 bo'ldi, tasodif esa 0,50." },
        { type: 'bars', title: "Hamma takrorlar, ko'rilmagan o'quvchilar (AUC, yuqori yaxshi)", note: "0,5 tasodif, 1 mukammal.", rows: [
          { label: "Hamma uchun bir xil o'rtacha taxmin", value: 0.5, tone: 'base' },
          { label: "Klassik unutish egri chizig'i", value: 0.53, tone: 'mid' },
          { label: "VOC yangi modeli", value: 0.78, tone: 'model' },
        ] },
        { type: 'h2', text: "Nega shunday bo'ldi" },
        { type: 'p', text: "Ma'lumotga yaqindan qaraganimizda sabab ko'rindi: takrorlarning 67 foizi bir mashq sessiyasi ichida, oldingi takrordan bir soatdan kam vaqt o'tib sodir bo'lgan. Eslab qolish bir soatdan kam oraliqda 89 foiz, bir-uch kunda 92 foiz, 7–30 kunda 88 foiz edi, ya'ni vaqtga deyarli bog'liq emas. Ko'p javoblar passiv (“bildim”) yoki variantlardan tanlash bo'lgani uchun taxmin bilan ham to'g'ri chiqishi mumkin." },
        { type: 'quote', text: "Bu ma'lumot ko'proq “mashq sessiyasi” ma'lumoti edi, unutish tajribasi emas." },
        { type: 'h2', text: "Nima ishladi" },
        { type: 'p', text: "Eslab qolishni eng yaxshi bashorat qilgan narsalar: so'zning aynan shu o'quvchidagi o'z natijalari, oldingi takrordagi ishonch, so'z necha marta takrorlangani va o'quvchining umumiy aniqligi. Shular asosida qurilgan yangi baholash ko'rilmagan o'quvchilarda AUC 0,78 berdi va ehtimollari haqiqiy natijalarga yaxshi mos keldi." },
        { type: 'h2', text: "Oraliqli takrorlar bo'yicha alohida qaradik" },
        { type: 'p', text: "Unutish modeli aslida oraliqli takrorlar uchun mo'ljallangan. Shuning uchun oldingi takrordan kamida 6 soat o'tgan takrorlarni alohida baholadik. Bu yerda klassik model so'zlarni foydali tartiblay oladi, lekin o'z ehtimoliga ortiqcha ishonadi. Ochiq FSRS-6 algoritmi (standart parametrlar bilan) ham xuddi shunday natija berdi." },
        { type: 'bars', title: "Faqat oraliqli takrorlar (AUC)", note: "Oldingi takrordan kamida 6 soat o'tgan takrorlar.", rows: [
          { label: "Hamma uchun bir xil o'rtacha taxmin", value: 0.5, tone: 'base' },
          { label: "Klassik unutish egri chizig'i", value: 0.69, tone: 'mid' },
          { label: "FSRS-6 (standart parametrlar)", value: 0.69, tone: 'mid' },
          { label: "VOC yangi modeli", value: 0.72, tone: 'model' },
        ] },
        { type: 'p', text: "VOC modeli bu yerda o'quvchilarimiz ma'lumotida o'qitilgan, FSRS esa yo'q, shuning uchun bu to'liq teng taqqoslash emas. Biz uni “FSRS'dan yaxshiroqmiz” deb emas, “shu darajada ishlaydi” deb o'qiymiz." },
        { type: 'h2', text: "Cheklovlar" },
        { type: 'ul', items: [
          "Faqat 24 o'quvchi, sinov qismida 8 tasi. Raqamlar yo'nalishni ko'rsatadi, qat'iy isbot emas.",
          "Haqiqiy oraliqli takrorlar hali kam. Shu sababli takrorlash jadvali (qachon qaytarish) hozircha avvalgi mantiqda qolgan.",
          "O'quvchilar ko'payishi bilan natijani qayta o'lchaymiz va shu sahifani yangilaymiz.",
        ] },
        { type: 'h2', text: "Bu sizga nimani o'zgartiradi" },
        { type: 'p', text: "Ilovadagi “eslab qolish” foizi va “xavf ostidagi so'zlar” endi so'zning sizdagi tarixiga qarab hisoblanadi, shunchaki o'tgan vaqtga qarab emas. Shu bilan birga biz yig'ilayotgan ma'lumotga sessiya, javob turi (yozish yoki tanlash) kabi belgilarni qo'shdik, keyingi o'lchovlar aniqroq bo'lishi uchun." },
      ],
    },
    en: {
      title: 'Measured, not guessed: testing our memory model on real data',
      excerpt: 'The classic forgetting curve did worse than a plain average guess on our real reviews. Why that happened and what we did about it.',
      body: [
        { type: 'p', text: 'VOC estimates, for every word, the chance you can recall it right now and uses that to choose what to review. Such a model is easy to invent and hard to prove. So we tested it on real review logs, on learners the model had never seen.' },
        { type: 'h2', text: 'How we tested it' },
        { type: 'ul', items: [
          'More than 37,000 real reviews from 24 learners.',
          'A third of the learners (8) were held out: the model never saw them during training.',
          'We compared against a plain “the same average guess for everyone”. If a complex model cannot beat that, it is worth nothing.',
        ] },
        { type: 'h2', text: 'The surprising result' },
        { type: 'p', text: 'The classic approach assumes recall probability falls as time passes (the Ebbinghaus curve). On unseen learners it did worse than the plain average: its ability to separate words you will forget from words you will remember (AUC) was 0.53, where chance is 0.50.' },
        { type: 'bars', title: 'All reviews, unseen learners (AUC, higher is better)', note: '0.5 is chance, 1 is perfect.', rows: [
          { label: 'The same average guess for everyone', value: 0.5, tone: 'base' },
          { label: 'Classic forgetting curve', value: 0.53, tone: 'mid' },
          { label: 'New VOC model', value: 0.78, tone: 'model' },
        ] },
        { type: 'h2', text: 'Why it happened' },
        { type: 'p', text: 'Looking closer explained it: 67 percent of reviews happened inside a single practice session, less than an hour after the previous review of that word. Recall was 89 percent under an hour, 92 percent at one to three days and 88 percent at 7 to 30 days, so it barely depended on time. Many answers were passive (“I knew it”) or multiple choice, where a guess can be right.' },
        { type: 'quote', text: 'This was mostly practice-session data, not forgetting data.' },
        { type: 'h2', text: 'What worked' },
        { type: 'p', text: 'What predicted recall best: the word’s own record with that learner, the confidence reported last time, how many times the word was reviewed, and the learner’s overall accuracy. A new estimate built on those reached an AUC of 0.78 on unseen learners and its probabilities matched real outcomes well.' },
        { type: 'h2', text: 'We also looked at spaced reviews on their own' },
        { type: 'p', text: 'A forgetting model is really meant for spaced reviews, so we scored reviews at least 6 hours after the previous one separately. There the classic model ranks words usefully but is overconfident in its own probabilities. The open FSRS-6 algorithm (default parameters) scored the same.' },
        { type: 'bars', title: 'Spaced reviews only (AUC)', note: 'Reviews at least 6 hours after the previous one.', rows: [
          { label: 'The same average guess for everyone', value: 0.5, tone: 'base' },
          { label: 'Classic forgetting curve', value: 0.69, tone: 'mid' },
          { label: 'FSRS-6 (default parameters)', value: 0.69, tone: 'mid' },
          { label: 'New VOC model', value: 0.72, tone: 'model' },
        ] },
        { type: 'p', text: 'The VOC model was trained on our learners’ data and FSRS was not, so this is not a perfectly fair comparison. We read it as “performs at that level”, not “beats FSRS”.' },
        { type: 'h2', text: 'Limits' },
        { type: 'ul', items: [
          'Only 24 learners, 8 in the held-out part. The numbers show a direction, not a final proof.',
          'Genuinely spaced reviews are still scarce. That is why the review schedule (when to bring a word back) still uses the earlier logic.',
          'As the number of learners grows we re-measure and update this page.',
        ] },
        { type: 'h2', text: 'What changes for you' },
        { type: 'p', text: 'The “recall” percentage and “words at risk” in the app now come from the word’s history with you, not from elapsed time alone. We also started logging the session and the answer type (typed or chosen) so the next measurements are sharper.' },
      ],
    },
  },
  {
    slug: 'nega-sozlar-unutiladi',
    date: '2026-10-05',
    minutes: 4,
    uz: {
      title: "Nega so'zlar unutiladi va uni qanday sekinlashtirish mumkin",
      excerpt: "Unutish normal. Muhimi, qachon va qanday takrorlash. Qisqa va amaliy tushuntirish.",
      body: [
        { type: 'p', text: "Yangi so'zni o'rganganingizdan keyin uning katta qismi tez unutiladi. Bu sizning yomon xotirangiz emas: bu xotiraning odatiy ishlashi. Yaxshi xabar: unutish tezligini boshqarish mumkin." },
        { type: 'h2', text: "Unutish egri chizig'i" },
        { type: 'p', text: "Nemis olimi Hermann Ebbinghaus 1885 yilda ma'nosiz bo'g'inlarni yodlab, ular qanchalik tez unutilishini o'lchagan. Natija: unutish avval tez, keyin sekinroq bo'ladi. Keyingi tadqiqotlar ham shu manzarani tasdiqlagan, aniq tezlik esa so'zga va odamga qarab farq qiladi." },
        { type: 'h2', text: "Nima yordam beradi" },
        { type: 'ul', items: [
          "Eslashga urinish. So'zning tarjimasini ko'rish o'rniga uni o'zingiz eslashga harakat qilish xotirani kuchliroq mustahkamlaydi. Tadqiqotlarda bu “sinov effekti” deb ataladi.",
          "Vaqtga yoyish. Bir kunda ko'p marta emas, oraliqlar bilan takrorlash yaxshiroq natija beradi.",
          "O'zingiz yozib ko'rish. So'zni yozib yoki ovoz chiqarib aytish uni faqat ko'rib chiqishdan ko'ra ko'proq mehnat talab qiladi, shuning uchun yaxshiroq esda qoladi.",
          "Uyqu. Uyqu paytida yangi o'rganilgan narsalar mustahkamlanadi. Takrorlar orasida kamida bir kecha bo'lgani foydali.",
        ] },
        { type: 'h2', text: "Hamma so'z bir xil unutilmaydi" },
        { type: 'p', text: "Ba'zi so'zlar bir ko'rishda esda qoladi, boshqalari esa o'nlab marta takrorlashni talab qiladi. Shuning uchun hamma so'zga bir xil jadval qo'llash samarasiz: oson so'zlarga vaqt ketadi, qiyinlari esa yetarlicha takrorlanmaydi." },
        { type: 'h2', text: "VOC buni qanday hal qiladi" },
        { type: 'p', text: "VOC har bir so'z uchun alohida baho yuritadi. U so'zning sizdagi natijalarini, javob berishdagi ishonchingizni va javobni yozdingizmi yoki tanladingizmi ham hisobga oladi. Yozib bergan to'g'ri javob tanlab bergan javobdan ko'ra ko'proq hisoblanadi. Qiyin so'zlar tez-tez, oson so'zlar kamroq qaytadi." },
        { type: 'p', text: "Bu usulning qanchalik ishlashini real ma'lumotda qanday o'lchaganimiz haqida keyingi maqolamizda yozdik." },
      ],
    },
    en: {
      title: 'Why words get forgotten and how to slow it down',
      excerpt: 'Forgetting is normal. What matters is when and how you review. A short, practical explanation.',
      body: [
        { type: 'p', text: 'After you learn a new word, a large part of it fades quickly. That is not a bad memory: it is how memory normally works. The good news: you can steer how fast it fades.' },
        { type: 'h2', text: 'The forgetting curve' },
        { type: 'p', text: 'In 1885 the German scientist Hermann Ebbinghaus memorised nonsense syllables and measured how fast they were forgotten. The result: forgetting is fast at first, then slower. Later research has supported that picture, while the exact speed differs by word and by person.' },
        { type: 'h2', text: 'What helps' },
        { type: 'ul', items: [
          'Trying to recall. Making yourself remember a word instead of just looking at its translation strengthens memory more. In research this is called the testing effect.',
          'Spacing it out. Reviewing at intervals beats many repetitions in one day.',
          'Producing it yourself. Writing or saying a word takes more effort than just reading it, so it sticks better.',
          'Sleep. Newly learned material consolidates during sleep, so it helps to have at least one night between reviews.',
        ] },
        { type: 'h2', text: 'Not every word is forgotten the same way' },
        { type: 'p', text: 'Some words stay after one look, others need dozens of repetitions. Applying one schedule to every word is wasteful: easy words eat time while hard ones are not reviewed enough.' },
        { type: 'h2', text: 'How VOC handles it' },
        { type: 'p', text: 'VOC keeps a separate estimate for each word. It takes into account how the word has gone for you, how confident you were, and whether you typed the answer or chose it. A typed correct answer counts for more than a chosen one. Hard words come back often, easy words less often.' },
        { type: 'p', text: 'In our next post we describe how we measured how well this works on real data.' },
      ],
    },
  },
];

export const getPost = (slug) => POSTS.find((p) => p.slug === slug) || null;

/** Language block for a post; Russian (and anything unwritten) falls back to Uzbek. */
export const pickLang = (post, lang) => post[lang] || post.uz;
