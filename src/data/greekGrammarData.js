// Standalone Greek grammar curriculum — same content shape as
// src/data/sicilianGrammarData.js (guide markdown text + `questions`
// multiple-choice + `scrambled` sentence-building), reusing
// grammarGuideParser.js/GuideRenderer.jsx and grammarHelpers.js's
// getQuestionsForExercise() directly since those are pure/prop-driven, but
// deliberately isolated from grammarData.js/russianGrammarData.js/
// sicilianGrammarData.js and their shared GrammarPage/GrammarTopic pages —
// see src/pages/greek/GreekGrammar.jsx.
export const greekGrammarData = {
  beginner: {
    label: 'Beginner',
    topics: [
      {
        id: 'grk-zero',
        title: "Nol darajadan boshlash",
        icon: '🎯',
        guide: `## Boshlashdan oldin: grammatika nima uchun kerak?

Har qanday tilda so'zlarni bilish yetarli emas — ularni **to'g'ri tartibda va to'g'ri shaklda** qo'shib, jumla qura olish kerak. Grammatika shu "qanday terish" qoidalari.

## 1. Eng asosiy uchta so'z turi

• **Ot**: narsa, odam yoki joy nomi. Yunonchada: **σπίτι** (uy).
• **Fe'l**: harakatni yoki holatni bildiradi. Yunonchada: **τρώω** (yemoq).
• **Sifat**: otni tasvirlaydi. Yunonchada: **όμορφος** (chiroyli).

## 2. "Jins" nima degani?

O'zbek va ingliz tillarida yo'q, lekin yunon tilida **bor** tushuncha: har bir OT uchta toifadan biriga tegishli — **erkak**, **ayol** yoki **o'rta** jins — jonli yoki jonsiz bo'lishidan qat'iy nazar.

*(Sitsiliya yoki rus tilidan farqli o'laroq, yunon tilida jins UCHTA — erkak, ayol, o'rta — ikkita emas.)*

## 3. "Artikl" nima degani?

Otning oldida turadigan kichik so'z — "the" (aniq) yoki "a" (noaniq) kabi. Yunon tilida bu artikllar otning jinsiga qarab o'zgaradi. Buni keyingi darsda batafsil o'rganamiz.

## 4. "Olmosh" nima degani?

Otning yoki ismning o'rniga ishlatiladigan so'z: "men", "sen", "u".

## 5. "Fe'l tuslanishi" nima degani?

Fe'l so'zi gapiruvchiga qarab shaklini o'zgartiradi — xuddi o'zbekcha "bor**aman**", "bor**asan**", "bor**adi**" kabi. Yunon tilida ham xuddi shunday, faqat qo'shimchalar boshqacha.`,
        questions: [
          { id: 1, text: '"Ot" so\'z turi nimani bildiradi?', options: ['Harakatni', 'Narsa, odam yoki joy nomini', 'Tasvirni', 'Savolni'], correct: 1, explanation: 'Ot — "uy", "odam" kabi narsa/odam/joy nomi.' },
          { id: 2, text: '"Fe\'l" so\'z turi nimani bildiradi?', options: ['Harakat yoki holatni', 'Faqat rangni', 'Faqat sonni', 'Faqat joyni'], correct: 0, explanation: 'Fe\'l — "τρώω" (yemoq) kabi harakat/holat so\'zi.' },
          { id: 3, text: "Yunon tilida otlar nechta jinsga bo'linadi?", options: ['Ikkita', 'Uchta: erkak, ayol, o\'rta', "Jinsi yo'q", 'Beshta'], correct: 1, explanation: "Yunon tilida uchta jins bor: erkak, ayol, o'rta." },
          { id: 4, text: '"Artikl" tushunchasiga ingliz tilidan qaysi misol mos keladi?', options: ['go, run', 'the, a', 'big, small', 'he, she'], correct: 1, explanation: '"The" va "a" — artikllar.' },
          { id: 5, text: 'Yunon tilida artikl nimaga qarab o\'zgaradi?', options: ["Otning uzunligiga", "Otning jinsiga", 'Kunning vaqtiga', 'Gapning davomiga'], correct: 1, explanation: "Artikl otning jinsi (erkak/ayol/o'rta)ga qarab o'zgaradi." },
          { id: 6, text: '"Olmosh" so\'ziga misol?', options: ['Uy', 'Chiroyli', 'U, men, sen', 'Yemoq'], correct: 2, explanation: 'Olmosh — otning o\'rnini bosadigan so\'z.' },
          { id: 7, text: '"Fe\'l tuslanishi" o\'zbek tilida qanday ko\'rinishda bor?', options: ["Umuman yo'q", '"boraman / borasan / boradi" kabi oxiri o\'zgarishida', 'Faqat kelishiklarda', "Faqat ko'plikda"], correct: 1, explanation: "Fe'l shaxsga qarab oxiri o'zgaradi — bu o'zbek tilida ham bor tushuncha." },
          { id: 8, text: '"Sifat" so\'z turiga misol?', options: ['Σπίτι (uy)', 'Τρώω (yemoq)', 'Όμορφος (chiroyli)', 'Εγώ (men)'], correct: 2, explanation: "Sifat otni tasvirlaydi: όμορφος — chiroyli." },
        ],
        scrambled: [
          { answer: 'Το σπίτι είναι όμορφο.', explanation: '"Uy chiroyli." — to (artikl) + spiti (ot) + einai (fe\'l) + omorfo (sifat, o\'rta jins).' },
          { answer: 'Εγώ τρώω.', explanation: '"Men yeyman."' },
          { answer: 'Αυτός είναι καλός.', explanation: '"U (erkak) yaxshi."' },
          { answer: 'Η γυναίκα διαβάζει.', explanation: '"Ayol o\'qiyapti."' },
          { answer: 'Ένα παιδί τρώει.', explanation: '"Bir bola yeyapti."' },
        ],
      },
      {
        id: 'grk-articles',
        title: 'Artikllar: ο, η, το',
        icon: '📌',
        guide: `## Yunon tilida artikllar

Har bir ot ma'lum bir **jinsga** tegishli: erkak, ayol yoki o'rta. Artikl ("the"/"a") shu jinsga qarab o'zgaradi.

### Aniq artikl (the)

| Jins | Artikl | Misol |
| Erkak | ο | ο άνθρωπος (odam) |
| Ayol | η | η γυναίκα (ayol) |
| O'rta | το | το παιδί (bola) |

### Noaniq artikl (a/bir)

| Jins | Artikl | Misol |
| Erkak | ένας | ένας άνθρωπος |
| Ayol | μία | μία γυναίκα |
| O'rta | ένα | ένα παιδί |

• **Qoida**: Otning oxirgi harfidan jinsni ko'pincha taxmin qilish mumkin.
  - -ος bilan tugasa → ko'pincha erkak (άνθρωπος)
  - -α yoki -η bilan tugasa → ko'pincha ayol (γυναίκα)
  - -ο yoki -ι bilan tugasa → ko'pincha o'rta jins (παιδί)

*(Bu qoida ko'p hollarda ishlaydi, lekin istisnolar ham bor — vaqt o'tishi bilan yodlanadi.)*`,
        questions: [
          { id: 1, text: '"Άνθρωπος" so\'zi qanday jinsga tegishli?', options: ['Erkak', 'Ayol', "O'rta", "Jinsi yo'q"], correct: 0, explanation: '-ος bilan tugagani uchun erkak jins.' },
          { id: 2, text: '"Γυναίκα" so\'zining aniq artikli qaysi?', options: ['ο', 'η', 'το', 'οι'], correct: 1, explanation: 'Ayol jinsdagi otlar uchun artikl — η.' },
          { id: 3, text: '"Παιδί" so\'zining aniq artikli qaysi?', options: ['ο', 'η', 'το', 'οι'], correct: 2, explanation: "O'rta jinsdagi otlar uchun artikl — το." },
          { id: 4, text: "Erkak jinsdagi otlar ko'pincha qaysi harf bilan tugaydi?", options: ['-α', '-η', '-ος', '-ο'], correct: 2, explanation: 'Erkak jinsdagi otlar ko\'pincha -ος bilan tugaydi.' },
          { id: 5, text: '"Ένα παιδί" iborasi nimani bildiradi?', options: ['Bola (aniq)', 'Bir bola', 'Bolalar', 'Bolaning'], correct: 1, explanation: 'Ένα — noaniq artikl, "bir" degani.' },
          { id: 6, text: 'Ayol jinsdagi noaniq artikl qaysi?', options: ['ένας', 'μία', 'ένα', 'το'], correct: 1, explanation: 'Ayol jinsi uchun noaniq artikl — μία.' },
          { id: 7, text: '"Το σπίτι" iborasidagi "το" so\'z turi qaysi?', options: ['Ot', "Fe'l", 'Artikl', 'Sifat'], correct: 2, explanation: '"Το" — o\'rta jinsdagi aniq artikl.' },
          { id: 8, text: 'Quyidagilardan qaysi biri to\'g\'ri?', options: ["Yunon tilida faqat 2 jins bor", "Yunon tilida 3 jins bor: erkak, ayol, o'rta", "Yunon tilida jins tushunchasi yo'q", "Jins faqat odamlarga tegishli"], correct: 1, explanation: "Yunon tilida uchta jins bor." },
        ],
        scrambled: [
          { answer: 'Ο άνθρωπος είναι καλός.', explanation: '"Odam yaxshi." — ο (artikl, erkak) + άνθρωπος (ot) + είναι (fe\'l) + καλός (sifat, erkak).' },
          { answer: 'Η γυναίκα είναι καλή.', explanation: '"Ayol yaxshi." — sifat ayol shaklida: καλή.' },
          { answer: 'Το παιδί είναι καλό.', explanation: '"Bola yaxshi." — sifat o\'rta shaklida: καλό.' },
          { answer: 'Ένας άνθρωπος τρώει.', explanation: '"Bir odam yeyapti."' },
          { answer: 'Μία γυναίκα διαβάζει.', explanation: '"Bir ayol o\'qiyapti."' },
        ],
      },
      {
        id: 'grk-pronouns',
        title: 'Shaxs olmoshlari',
        icon: '👤',
        guide: `## Shaxs olmoshlari

| Shaxs | Yunoncha | Ma'nosi |
| 1-shaxs birlik | εγώ | men |
| 2-shaxs birlik | εσύ | sen |
| 3-shaxs birlik (erkak) | αυτός | u (erkak) |
| 3-shaxs birlik (ayol) | αυτή | u (ayol) |
| 3-shaxs birlik (o'rta) | αυτό | u (narsa) |
| 1-shaxs ko'plik | εμείς | biz |
| 2-shaxs ko'plik | εσείς | siz |
| 3-shaxs ko'plik (erkak) | αυτοί | ular (erkak) |
| 3-shaxs ko'plik (ayol) | αυτές | ular (ayol) |
| 3-shaxs ko'plik (o'rta) | αυτά | ular (narsa) |

• **Muhim**: Yunon tilida fe'l shakli kim gapirayotganini ko'rsatadi, shuning uchun olmoshni tez-tez tushirib qoldirish mumkin — "τρώω" so'zining o'zi "men yeyman" degani, "εγώ" qo'shish faqat urg'u berish uchun kerak.

*(εσείς so'zi ham ko'plik "siz" uchun, ham hurmat ko'rsatish uchun birlik "Siz" (rasmiy) uchun ishlatiladi — xuddi ruscha "Вы" kabi.)*`,
        questions: [
          { id: 1, text: '"Εγώ" nimani bildiradi?', options: ['Sen', 'Men', 'U', 'Biz'], correct: 1, explanation: 'Εγώ — "men".' },
          { id: 2, text: '"Εσύ" nimani bildiradi?', options: ['Men', 'Sen', 'Siz', 'U'], correct: 1, explanation: 'Εσύ — "sen".' },
          { id: 3, text: 'Erkak uchun "u" olmoshi qaysi?', options: ['αυτή', 'αυτός', 'αυτό', 'αυτά'], correct: 1, explanation: 'Erkak uchun — αυτός.' },
          { id: 4, text: 'Ayol uchun "u" olmoshi qaysi?', options: ['αυτός', 'αυτή', 'αυτό', 'αυτοί'], correct: 1, explanation: 'Ayol uchun — αυτή.' },
          { id: 5, text: '"Εμείς" nimani bildiradi?', options: ['Siz', 'Ular', 'Biz', 'Sen'], correct: 2, explanation: 'Εμείς — "biz".' },
          { id: 6, text: "Ko'plikda erkaklar uchun \"ular\" qaysi?", options: ['αυτές', 'αυτά', 'αυτοί', 'αυτή'], correct: 2, explanation: 'Erkak ko\'plik — αυτοί.' },
          { id: 7, text: "Nega yunon tilida olmoshni ko'pincha tushirib qoldirsa bo'ladi?", options: ["Chunki olmosh kerak emas", "Chunki fe'l shakli kimligini ko'rsatadi", "Chunki bu qoidaga zid", "Sababi yo'q"], correct: 1, explanation: "Fe'l tuslanishi shaxsni ko'rsatadi." },
          { id: 8, text: '"Εσείς" so\'zi nima uchun ham ishlatiladi?', options: ["Faqat ko'plik uchun", "Faqat birlik uchun", "Ham ko'plik \"siz\", ham rasmiy \"Siz\" uchun", "Faqat savol uchun"], correct: 2, explanation: 'Εσείς ikkala vaziyatda ham ishlatiladi.' },
        ],
        scrambled: [
          { answer: 'Αυτός είναι δάσκαλος.', explanation: '"U (erkak) o\'qituvchi." — δάσκαλος = o\'qituvchi (erkak).' },
          { answer: 'Αυτή είναι δασκάλα.', explanation: '"U (ayol) o\'qituvchi." — δασκάλα = o\'qituvchi (ayol).' },
          { answer: 'Εμείς τρώμε.', explanation: '"Biz yeymiz."' },
          { answer: 'Αυτοί διαβάζουν.', explanation: '"Ular o\'qiydilar."' },
          { answer: 'Εσύ γράφεις καλά.', explanation: '"Sen yaxshi yozasan."' },
        ],
      },
      {
        id: 'grk-eimai',
        title: "\"Bo'lmoq\" fe'li — είμαι",
        icon: '🔑',
        guide: `## "Bo'lmoq" fe'li — είμαι

Yunon tilidagi eng muhim va eng ko'p ishlatiladigan fe'llardan biri — **είμαι** ("bo'lmoq"). U boshqa fe'llardan farqli tuslanadi, shuning uchun alohida yodlash kerak.

| Olmosh | Fe'l shakli |
| εγώ | είμαι |
| εσύ | είσαι |
| αυτός/αυτή/αυτό | είναι |
| εμείς | είμαστε |
| εσείς | είστε |
| αυτοί/αυτές/αυτά | είναι |

• **Diqqat**: Birlikdagi 3-shaxs (είναι) va ko'plikdagi 3-shaxs (είναι ham!) bir xil yoziladi — kontekstdan qaysi biri ekanligini bilib olasiz.
  - Αυτός είναι δάσκαλος. (U o'qituvchi.)
  - Αυτοί είναι δάσκαλοι. (Ular o'qituvchilar.)

*(Rus tilida "быть" fe'li hozirgi zamonda deyarli ishlatilmaydi, lekin yunon tilida είμαι har doim gapda bo'lishi shart.)*`,
        questions: [
          { id: 1, text: '"εγώ" bilan qaysi shakl ishlatiladi?', options: ['είσαι', 'είμαι', 'είναι', 'είστε'], correct: 1, explanation: 'εγώ είμαι.' },
          { id: 2, text: '"εσύ" bilan qaysi shakl ishlatiladi?', options: ['είμαι', 'είσαι', 'είμαστε', 'είναι'], correct: 1, explanation: 'εσύ είσαι.' },
          { id: 3, text: '"εμείς" bilan qaysi shakl ishlatiladi?', options: ['είστε', 'είναι', 'είμαστε', 'είσαι'], correct: 2, explanation: 'εμείς είμαστε.' },
          { id: 4, text: '"εσείς" bilan qaysi shakl ishlatiladi?', options: ['είμαστε', 'είστε', 'είναι', 'είμαι'], correct: 1, explanation: 'εσείς είστε.' },
          { id: 5, text: '"Αυτός είναι καλός" jumlasi nimani bildiradi?', options: ['Men yaxshiman', 'Sen yaxshisan', 'U (erkak) yaxshi', 'Biz yaxshimiz'], correct: 2, explanation: 'Αυτός = u (erkak), είναι = -dir.' },
          { id: 6, text: 'Birlik va ko\'plikdagi 3-shaxs shakli qanday farqlanadi?', options: ['Umuman farq qilmaydi, ikkalasi ham είναι', 'Birlikda -ς qo\'shiladi', 'Ko\'plikda -ν qo\'shiladi', 'Ular butunlay boshqa so\'z'], correct: 0, explanation: 'Ikkalasi ham "είναι" — kontekstdan bilinadi.' },
          { id: 7, text: 'Rus tilidan farqli o\'laroq, yunon tilida "bo\'lmoq" fe\'lini gapda qanday ishlatish kerak?', options: ['Tushirib qoldirsa bo\'ladi', 'Har doim aytish shart', 'Faqat savolda kerak', 'Faqat o\'tgan zamonda kerak'], correct: 1, explanation: 'Yunon tilida είμαι har doim gapda bo\'ladi.' },
          { id: 8, text: '"Εγώ είμαι μαθητής" jumlasidagi "είμαι" qaysi so\'z turi?', options: ['Ot', "Fe'l", 'Sifat', 'Artikl'], correct: 1, explanation: 'είμαι — fe\'l ("bo\'lmoq"ning "men"ga mos shakli).' },
        ],
        scrambled: [
          { answer: 'Εγώ είμαι μαθητής.', explanation: '"Men o\'quvchiman."' },
          { answer: 'Εσύ είσαι όμορφη.', explanation: '"Sen chiroylisan." (ayolga qarata)' },
          { answer: 'Εμείς είμαστε φίλοι.', explanation: '"Biz do\'stmiz."' },
          { answer: 'Αυτοί είναι δάσκαλοι.', explanation: '"Ular o\'qituvchilar."' },
          { answer: 'Εσείς είστε καλοί.', explanation: '"Siz(lar) yaxshisiz."' },
        ],
      },
      {
        id: 'grk-verbs-o',
        title: '"-ω" bilan tugaydigan fe\'llar',
        icon: '✍️',
        guide: `## "-ω" bilan tugaydigan fe'llar

Yunon tilidagi fe'llarning katta qismi lug'atda **-ω** bilan tugaydi ("men qilaman" ma'nosidagi asosiy shakl). Hozirgi zamonda tuslanish uchun oxiri o'zgaradi.

### Misol: γράφω (yozmoq)

| Olmosh | Fe'l shakli |
| εγώ | γράφω |
| εσύ | γράφεις |
| αυτός/αυτή/αυτό | γράφει |
| εμείς | γράφουμε |
| εσείς | γράφετε |
| αυτοί/αυτές/αυτά | γράφουν |

• **Qoida**: Fe'lning "ildizi" (γραφ-) o'zgarmaydi, faqat oxiri (-ω, -εις, -ει...) shaxsga qarab almashadi.
• Xuddi shu qolipda: **διαβάζω** (o'qimoq) ham tuslanadi — διαβάζεις, διαβάζει, διαβάζουμε...

*(Ba'zi -ω fe'llar biroz boshqacha tuslanadi (masalan μιλάω — gapirmoq), ammo asosiy qolip shu.)*`,
        questions: [
          { id: 1, text: '"γράφω" so\'zi nimani bildiradi?', options: ['Sen yozasan', 'Men yozaman', 'U yozadi', "Yozmoq (lug'at shakli)"], correct: 1, explanation: 'γράφω — "men yozaman" (va lug\'at shakli ham shu).' },
          { id: 2, text: '"εσύ" bilan γράφω fe\'li qanday tuslanadi?', options: ['γράφει', 'γράφεις', 'γράφουμε', 'γράφουν'], correct: 1, explanation: 'εσύ γράφεις.' },
          { id: 3, text: '"αυτός" bilan γράφω fe\'li qanday tuslanadi?', options: ['γράφω', 'γράφεις', 'γράφει', 'γράφετε'], correct: 2, explanation: 'αυτός γράφει.' },
          { id: 4, text: '"εμείς" bilan γράφω fe\'li qanday tuslanadi?', options: ['γράφουμε', 'γράφετε', 'γράφουν', 'γράφω'], correct: 0, explanation: 'εμείς γράφουμε.' },
          { id: 5, text: "Fe'lning qaysi qismi o'zgarmaydi?", options: ['Oxiri', 'Ildizi (masalan γραφ-)', 'Hammasi o\'zgaradi', "Hech qaysi qismi aniq emas"], correct: 1, explanation: "Ildiz o'zgarmaydi, faqat oxiri almashadi." },
          { id: 6, text: '"αυτοί γράφουν" nimani bildiradi?', options: ['U yozadi', 'Siz yozasiz', 'Ular yozadilar', 'Biz yozamiz'], correct: 2, explanation: 'αυτοί γράφουν — "ular yozadilar".' },
          { id: 7, text: '"διαβάζω" so\'zi qanday qolipda tuslanadi?', options: ["Butunlay boshqacha", 'γράφω bilan bir xil qolipda', 'Faqat birlikda ishlatiladi', 'Tuslanmaydi'], correct: 1, explanation: "Ikkalasi ham xuddi shu -ω qolipiga kiradi." },
          { id: 8, text: '"-εις" qo\'shimchasi qaysi shaxsga tegishli?', options: ['εγώ', 'εσύ', 'εμείς', 'αυτοί'], correct: 1, explanation: '-εις — "εσύ" (sen) uchun.' },
        ],
        scrambled: [
          { answer: 'Εγώ γράφω ένα γράμμα.', explanation: '"Men xat yozyapman." — γράμμα = xat.' },
          { answer: 'Εσύ διαβάζεις ένα βιβλίο.', explanation: '"Sen kitob o\'qiyapsan." — βιβλίο = kitob.' },
          { answer: 'Αυτή γράφει καλά.', explanation: '"U (ayol) yaxshi yozadi."' },
          { answer: 'Εμείς διαβάζουμε μαζί.', explanation: '"Biz birga o\'qiymiz." — μαζί = birga.' },
          { answer: 'Αυτοί γράφουν γρήγορα.', explanation: '"Ular tez yozadilar." — γρήγορα = tez.' },
        ],
      },
      {
        id: 'grk-adjectives',
        title: 'Sifatlarning otga moslashishi',
        icon: '🎨',
        guide: `## Sifatlarning otga moslashishi

Yunon tilida sifat otning **jinsiga** mos kelishi kerak — sifat ham otga o'xshab erkak/ayol/o'rta shaklga ega bo'ladi.

### Misol: καλός (yaxshi)

| Jins | Shakl | Misol |
| Erkak | καλός | ο άνθρωπος είναι καλός |
| Ayol | καλή | η γυναίκα είναι καλή |
| O'rta | καλό | το παιδί είναι καλό |

• **Qoida**: Ko'pchilik sifatlar xuddi otlar kabi -ος (erkak), -η (ayol), -ο (o'rta) bilan tugaydi.
• Yana bir misol: **όμορφος / όμορφη / όμορφο** (chiroyli)

*(Sifat gapda otdan oldin ham kelishi mumkin: "ένας καλός άνθρωπος" — "yaxshi odam".)*`,
        questions: [
          { id: 1, text: '"καλός" so\'zi qaysi jinsga tegishli shakl?', options: ['Ayol', 'Erkak', "O'rta", 'Barchasiga'], correct: 1, explanation: '-ος — erkak shakl.' },
          { id: 2, text: '"Η γυναίκα είναι ___" jumlasida qaysi shakl to\'g\'ri keladi?', options: ['καλός', 'καλή', 'καλό', 'καλά'], correct: 1, explanation: 'Ayol jinsi — καλή.' },
          { id: 3, text: '"Το παιδί είναι ___" jumlasida qaysi shakl to\'g\'ri?', options: ['καλός', 'καλή', 'καλό', 'καλοί'], correct: 2, explanation: "O'rta jinsi — καλό." },
          { id: 4, text: 'Yunon tilida sifat nimaga mos kelishi kerak?', options: ["Otning uzunligiga", 'Otning jinsiga', 'Gapning davomiga', "Fe'lning zamoniga"], correct: 1, explanation: 'Sifat otning jinsiga moslashadi.' },
          { id: 5, text: '"όμορφη" so\'zi qaysi jinsga tegishli?', options: ['Erkak', 'Ayol', "O'rta", "Aniqlanmagan"], correct: 1, explanation: '-η — ayol shakli.' },
          { id: 6, text: "Sifat otdan oldin kelganda qaysi ibora to'g'ri?", options: ['"άνθρωπος ένας καλός"', '"ένας καλός άνθρωπος"', '"καλός ένας άνθρωπος"', '"άνθρωπος καλός ένας"'], correct: 1, explanation: 'Artikl + sifat + ot tartibi: ένας καλός άνθρωπος.' },
          { id: 7, text: "Ko'pchilik erkak jinsdagi sifatlar qanday tugaydi?", options: ['-η', '-ο', '-ος', '-α'], correct: 2, explanation: 'Erkak sifatlar ko\'pincha -ος bilan tugaydi.' },
          { id: 8, text: '"όμορφο σπίτι" iborasi nimani bildiradi?', options: ["Chiroyli odam", "Chiroyli uy", "Katta uy", "Yangi uy"], correct: 1, explanation: 'σπίτι = uy, όμορφο = chiroyli (o\'rta shakli).' },
        ],
        scrambled: [
          { answer: 'Ο δάσκαλος είναι καλός.', explanation: '"O\'qituvchi (erkak) yaxshi."' },
          { answer: 'Η δασκάλα είναι καλή.', explanation: '"O\'qituvchi (ayol) yaxshi."' },
          { answer: 'Το σπίτι είναι όμορφο.', explanation: '"Uy chiroyli."' },
          { answer: 'Ένας όμορφος άνθρωπος διαβάζει.', explanation: '"Chiroyli odam o\'qiyapti."' },
          { answer: 'Μία καλή γυναίκα γράφει.', explanation: '"Yaxshi ayol yozyapti."' },
        ],
      },
      {
        id: 'grk-negation',
        title: 'Inkor va savol jumlalari',
        icon: '❓',
        guide: `## Inkor jumlalari

Yunon tilida fe'lni inkor qilish uchun **δεν** so'zi fe'ldan oldin qo'yiladi.

• **δεν** + fe'l = inkor
  - Δεν τρώω. (Men yemayman.)
  - Δεν είμαι κουρασμένος. (Men charchamaganman.)

## Savol jumlalari

Yunon tilida ha/yo'q savoli yasash uchun jumla tartibi o'zgarmaydi — faqat ohang ko'tariladi, yozuvda esa oddiy "?" o'rniga **;** (nuqta-vergul) ishlatiladi!

• Τρώεις; (Yeyapsanmi?)
• Είσαι καλά; (Yaxshimisan?)

*(Bu yunon tilining o'ziga xos xususiyati — savol belgisi lotin nuqta-vergul (;) ko'rinishida bo'ladi.)*`,
        questions: [
          { id: 1, text: 'Yunon tilida inkor so\'zi qaysi?', options: ['μη', 'δεν', 'όχι', 'ναι'], correct: 1, explanation: 'δεν — fe\'lni inkor qiluvchi so\'z.' },
          { id: 2, text: '"δεν" qayerga qo\'yiladi?', options: ["Fe'ldan keyin", "Fe'ldan oldin", 'Gap oxirida', 'Gap boshida har doim'], correct: 1, explanation: 'δεν fe\'ldan oldin keladi.' },
          { id: 3, text: '"Δεν τρώω" nimani bildiradi?', options: ['Men yeyman', 'Men yemayman', 'Sen yemaysan', 'U yemaydi'], correct: 1, explanation: 'δεν + τρώω = "men yemayman".' },
          { id: 4, text: 'Yunon tilida savol belgisi sifatida qaysi belgi ishlatiladi?', options: ['?', '!', '; (nuqta-vergul)', ':'], correct: 2, explanation: 'Yunon tilida "?" o\'rniga ";" ishlatiladi.' },
          { id: 5, text: '"Τρώεις;" nimani bildiradi?', options: ['Yeyapman', 'Yeyapsanmi?', 'U yeyapti', 'Yemang!'], correct: 1, explanation: 'Savol shakli: "yeyapsanmi?"' },
          { id: 6, text: "Ha/yo'q savol yasash uchun jumla tartibi o'zgaradimi?", options: ["Ha, fe'l oxiriga o'tadi", "Yo'q, faqat ohang o'zgaradi", "Ha, olmosh tushib qoladi", "Yo'q, so'z tartibi teskari bo'ladi"], correct: 1, explanation: "Jumla tartibi bir xil qoladi, faqat ohang/belgida farq bor." },
          { id: 7, text: '"Δεν είμαι κουρασμένος" nimani bildiradi?', options: ['Men charchaganman', 'Men charchamaganman', 'Sen charchagansan', 'Biz charchamaganmiz'], correct: 1, explanation: 'δεν είμαι κουρασμένος — "men charchamaganman".' },
          { id: 8, text: 'Yunoncha savol belgisi qaysi lotincha belgiga o\'xshaydi?', options: ['Nuqta (.)', 'Vergul (,)', 'Nuqta-vergul (;)', 'Ikki nuqta (:)'], correct: 2, explanation: 'Yunon savol belgisi lotincha ";" ga o\'xshab yoziladi.' },
        ],
        scrambled: [
          { answer: 'Δεν τρώω κρέας.', explanation: '"Men go\'sht yemayman." — κρέας = go\'sht.' },
          { answer: 'Δεν είναι εδώ.', explanation: '"U bu yerda emas." — εδώ = bu yerda.' },
          { answer: 'Αυτή δεν διαβάζει.', explanation: '"U (ayol) o\'qimaydi."' },
          { answer: 'Εσύ δεν γράφεις.', explanation: '"Sen yozmaysan."' },
          { answer: 'Εμείς δεν είμαστε κουρασμένοι.', explanation: '"Biz charchamaganmiz."' },
        ],
      },
    ],
  },
};
