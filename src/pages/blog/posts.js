// Built-in posts (shipped with the app). Posts written in the super-admin
// panel live in the database and are merged with these (see useBlogPosts.js).
//
// Shape (same as database posts): { slug, date, cover, minutes, uz, ru?, en }
// where a language block is { title, excerpt, body } and body is the small
// Markdown described in markdown.js. Russian visitors see Uzbek until a ru
// block exists.
//
// Numbers in "taxmin-emas-olchov" come from packages/memory-engine
// (`npm run fit:memory`) on the 2026-10-05 export. Update both together.

export const BUILT_IN_POSTS = [
  {
    slug: 'taxmin-emas-olchov',
    date: '2026-10-05',
    cover: 'compare',
    minutes: 6,
    uz: {
      title: "Modelimiz oddiy o'rtachadan yomon chiqdi. Mana nima qildik",
      excerpt: "VOC'dagi unutish modelini birinchi marta real takrorlarda sinadik. Natija biz kutganday bo'lmadi, lekin undan ko'p narsa o'rgandik.",
      body: `Bir necha oy davomida VOC ichida har bir so'z uchun "bu odam hozir shu so'zni eslay oladimi" degan ehtimolni hisoblab keldik. Formula chiroyli edi: unutish egri chizig'i va har bir so'zning o'z mustahkamlik ko'rsatkichi. Lekin chiroyli formula ishlaydi degani emas. Shuning uchun uni haqiqiy takrorlarda sinab ko'rishga qaror qildik.

## Sinov qanday o'tdi

Bazadan 24 o'quvchining 37 mingdan ortiq takrorini oldik. Ism va email olmadik, faqat javoblar tarixi. Uchdan bir qismini, ya'ni 8 o'quvchini, chetga qo'ydik: model o'qitilayotganda ularni ko'rmaydi.

Keyin oddiy savol berdik: modelimiz "hamma uchun bir xil o'rtacha taxmin"dan yaxshimi? Bu muhim savol, chunki o'quvchilar so'zlarning taxminan 89 foizini to'g'ri javoblayotgan edi. "Doim to'g'ri" deb taxmin qilgan odam ham yomon natija chiqarmaydi.

## Yoqimsiz natija

Ko'rilmagan o'quvchilarda eski modelimiz o'rtacha taxmindan yomonroq ishladi. Qaysi so'z unutilishini ajratishda u 0,53 oldi, tasodif esa 0,50. Deyarli farq yo'q.

:::bars Hamma takrorlar, ko'rilmagan o'quvchilar
note: Qaysi so'z unutilishini ajratish aniqligi (AUC). 0,5 tasodif, 1 mukammal.
Hamma uchun bir xil o'rtacha taxmin | 0.50 | base
Klassik unutish egri chizig'i | 0.53 | mid
VOC yangi modeli | 0.78 | model
:::

Raqamga qarab turib nima noto'g'ri ketganini topa olmadik, shuning uchun ma'lumotning o'ziga tushdik.

## Ma'lumot unutish haqida emas ekan

Takrorlarning 67 foizi bir mashq sessiyasi ichida, oldingi takrordan bir soat ham o'tmay sodir bo'lgan. O'yin yoki test ichida so'z ketma-ket ikki marta chiqsa, unutishga vaqt yo'q. Eslab qolish bir soatdan kam oraliqda 89 foiz, bir-uch kundan keyin 92 foiz, haftalar o'tganda ham 88 atrofida edi. Vaqt deyarli hech narsani o'zgartirmayotgan edi.

:::figure sessions

Yana bir narsa: javoblarning ko'pi "bildim" tugmasi yoki variantlardan tanlash. Variant tanlaganda taxmin ham to'g'ri chiqadi.

> Bu ko'proq mashq sessiyasi ma'lumoti edi, unutish tajribasi emas.

## Nima ishladi

Eng yaxshi signal so'zning aynan shu odamdagi o'z tarixi bo'ldi. Undan keyin oldingi takrordagi ishonch, so'z necha marta ko'rilgani va odamning umumiy aniqligi. Shularni birlashtirib yangi baholash yozdik. U ko'rilmagan o'quvchilarda 0,78 berdi.

:::figure factors

Ehtimollari ham haqiqatga yaqin chiqdi. Model 80 foiz desa, taxminan 80 foiz holatda to'g'ri chiqadi.

## Oraliqli takrorlarda nima bo'ladi

Adolat uchun yana bir narsani tekshirdik. Unutish modeli aslida oraliqli takrorlar uchun yozilgan, shuning uchun faqat oldingi takrordan kamida 6 soat o'tgan takrorlarga qaradik. Bu yerda eski modelimiz o'zini ancha yaxshi ko'rsatdi, ochiq FSRS-6 algoritmi ham xuddi shuncha. Faqat ikkalasi ham o'z ehtimollariga ortiqcha ishonar edi.

:::bars Faqat oraliqli takrorlar
note: Oldingi takrordan kamida 6 soat o'tgan takrorlar, AUC.
Hamma uchun bir xil o'rtacha taxmin | 0.50 | base
Klassik unutish egri chizig'i | 0.69 | mid
FSRS-6 (standart sozlamalar) | 0.69 | mid
VOC yangi modeli | 0.72 | model
:::

Taqqoslashda bitta ogohlantirish bor: bizning yangi modelimiz shu o'quvchilar ma'lumotida o'qitilgan, FSRS esa standart sozlamalarda ishlagan. Shuning uchun "FSRS'dan yaxshimiz" demaymiz. "Shu darajada ishlaydi" deymiz.

## Hali bilmaydiganlarimiz

Atigi 24 o'quvchi bor, sinov qismida 8 tasi. Raqamlar yo'nalishni ko'rsatadi, isbot emas. Haqiqiy oraliqli takrorlar hali kam, shuning uchun takrorlash jadvalimiz, ya'ni so'zni qachon qaytarish, hozircha eski mantiqda qolgan. Ma'lumot ko'paygach qayta o'lchaymiz va natijani shu yerga yozamiz.

Ilovada esa quyidagi o'zgardi: "eslab qolish" foizi va "xavf ostidagi so'zlar" endi o'tgan vaqtga emas, so'zning sizdagi tarixiga qarab chiqadi. Har bir takror uchun sessiya va javob turini ham (yozdingizmi, tanladingizmi) yozib bora boshladik, keyingi o'lchovlar aniqroq bo'lsin.`,
    },
    en: {
      title: 'Our model did worse than a plain average. Here is what we did',
      excerpt: 'We tested the forgetting model inside VOC on real reviews for the first time. The result was not what we hoped for, and we learned a lot from it.',
      body: `For a few months VOC has been computing, for every word, the chance that a person can recall it right now. The formula looked nice: a forgetting curve plus a strength value for each word. But a nice formula does not mean it works, so we decided to test it on real reviews.

## How the test went

We took more than 37,000 reviews from 24 learners. No names, no emails, just answer history. A third of the learners, 8 of them, were set aside: the model never sees them while it is being trained.

Then we asked a plain question: is our model better than "the same average guess for everyone"? That question matters because learners were answering about 89 percent of words correctly. Someone who just guesses "correct" every time does not do badly.

## The unwelcome result

On learners it had not seen, our old model did worse than the plain average. Its score at telling which words you will forget was 0.53, where chance is 0.50. Practically no difference.

:::bars All reviews, unseen learners
note: How well it separates words you will forget from words you will remember (AUC). 0.5 is chance, 1 is perfect.
The same average guess for everyone | 0.50 | base
Classic forgetting curve | 0.53 | mid
New VOC model | 0.78 | model
:::

Staring at the number did not show us what was wrong, so we went into the data itself.

## The data was not about forgetting

67 percent of reviews happened inside one practice session, less than an hour after the previous review of that word. If a word comes up twice in a row in a game or a quiz, there is no time to forget it. Recall was 89 percent under an hour, 92 percent after one to three days, and still about 88 after weeks. Time was barely changing anything.

:::figure sessions

One more thing: most answers were the "I knew it" button or picking from options. When you pick from options, a guess can be right too.

> This was mostly practice-session data, not forgetting data.

## What worked

The best signal turned out to be the word's own record with that particular person. After that came the confidence reported last time, how many times the word had been seen, and the person's overall accuracy. We built a new estimate from those. On unseen learners it scored 0.78.

:::figure factors

Its probabilities came out close to reality too. When the model says 80 percent, it is right about 80 percent of the time.

## What happens with spaced reviews

To be fair, we checked one more thing. A forgetting model is really written for spaced reviews, so we looked only at reviews that came at least 6 hours after the previous one. There our old model did much better, and so did the open FSRS-6 algorithm. Both were overconfident in their own probabilities, though.

:::bars Spaced reviews only
note: Reviews at least 6 hours after the previous one, AUC.
The same average guess for everyone | 0.50 | base
Classic forgetting curve | 0.69 | mid
FSRS-6 (default settings) | 0.69 | mid
New VOC model | 0.72 | model
:::

One warning about that comparison: our new model was trained on these learners' data and FSRS ran on default settings. So we do not say "we beat FSRS". We say "it performs at that level".

## What we still do not know

There are only 24 learners, 8 in the test part. The numbers show a direction, not proof. Genuinely spaced reviews are still scarce, so our review schedule, meaning when a word comes back, still uses the older logic. When there is more data we will measure again and write the result here.

In the app, this changed: the "recall" percentage and "words at risk" now come from the word's history with you, not from elapsed time. We also started logging the session and the answer type (typed or chosen) for every review, so the next measurement is sharper.`,
    },
  },
  {
    slug: 'nega-sozlar-unutiladi',
    date: '2026-10-05',
    cover: 'curve',
    minutes: 4,
    uz: {
      title: "Yangi so'z nega ertasiga yo'qoladi",
      excerpt: "Ertalab o'nta so'z yodlaysiz, kechqurun yarmi qoladi. Bu odatiy hol, va uni sekinlashtirish mumkin.",
      body: `Ertalab o'nta yangi so'z yodlaysiz, kechqurun yarmini eslaysiz, bir haftadan keyin deyarli hech birini. Bu sizning xotirangizda muammo bor degani emas. Odamlar shunday.

## Unutish tez boshlanadi

1885 yilda nemis psixologi Hermann Ebbinghaus o'zida tajriba qilgan: ma'nosiz bo'g'inlar ro'yxatini yodlab, qancha vaqtdan keyin qanchasi esda qolganini sanagan. Eng katta yo'qotish boshida bo'lgan, keyin egri chiziq yotiqlashgan. Keyingi tadqiqotlar ham shu shaklni tasdiqlagan. Aniq tezlik esa so'zga, odamga va o'sha kuni qanchalik charchaganingizga qarab farq qiladi.

## Takrorlash egri chiziqni sekinlashtiradi

Har gal eslaganingizda iz biroz chuqurlashadi va keyingi unutish sekinroq ketadi. Shuning uchun intervallar kengayib boradi: bugun, ertaga, bir haftadan keyin, bir oydan keyin. Asosiy hunar bitta: so'zni unutilib bo'layotganda, lekin hali butunlay yo'qolmaganda qaytarish.

## Nima ko'proq yordam beradi

- Javobni ko'rishdan oldin o'zingiz eslashga urinib ko'ring. Tadqiqotlarda bunga sinov effekti deyiladi: tarjimani shunchaki o'qishdan ko'ra eslashga urinish xotirani kuchliroq mustahkamlaydi.
- So'zni yozib ko'ring yoki ovoz chiqarib ayting. Bu ko'proq mehnat talab qiladi, shuning uchun yaxshiroq qoladi.
- Bir kunda o'n marta emas, kunlarga yoyib takrorlang.
- Takrorlar orasida uxlab oling. Uyqu paytida yangi o'rganilgan narsa mustahkamlanadi.

## Hamma so'z bir xil unutilmaydi

"Table" bir marta ko'rganingizdan keyin qoladi. "Reluctant" esa o'n marta ko'rsangiz ham qochadi. Hamma so'zga bir xil jadval qo'llash shuning uchun samarasiz: oson so'zlarga vaqt ketadi, qiyinlari yetarlicha qaytmaydi.

:::figure factors

VOC har bir so'z uchun alohida baho yuritadi. U so'zning sizdagi natijalarini, javob berishdagi ishonchingizni va javobni yozdingizmi yoki tanladingizmi ham hisobga oladi. Yozib bergan to'g'ri javob tanlab bergan javobdan ko'ra ko'proq hisoblanadi. Qiyin so'zlar tez-tez qaytadi, oson so'zlar kamroq.

Bu baho amalda qanchalik ishlashini real ma'lumotda o'lchaganimiz haqida [alohida maqola yozdik](/blog/taxmin-emas-olchov).`,
    },
    en: {
      title: 'Why a new word disappears by tomorrow',
      excerpt: 'You learn ten words in the morning and by evening half are gone. That is normal, and you can slow it down.',
      body: `You learn ten new words in the morning, recall half of them in the evening, and almost none after a week. That does not mean something is wrong with your memory. People work like that.

## Forgetting starts fast

In 1885 the German psychologist Hermann Ebbinghaus experimented on himself: he memorised lists of nonsense syllables and counted how many he still knew after different delays. The biggest loss came right at the start, then the curve flattened. Later research has backed that shape. The exact speed differs by word, by person and by how tired you were that day.

## Reviewing slows the curve

Each time you recall a word, the trace gets a little deeper and the next stretch of forgetting is slower. That is why the gaps keep growing: today, tomorrow, in a week, in a month. The whole craft comes down to one thing: bring the word back when it is about to slip, but has not vanished yet.

## What helps most

- Try to recall before you look at the answer. In research this is called the testing effect: trying to remember beats just reading the translation.
- Write the word or say it out loud. It takes more effort, so it sticks better.
- Spread reviews over days instead of ten repetitions in one.
- Sleep between reviews. Newly learned material consolidates while you sleep.

## Not every word is forgotten the same way

"Table" stays after one look. "Reluctant" slips away even after ten. Applying one schedule to every word is wasteful for that reason: easy words eat time while hard ones do not come back often enough.

:::figure factors

VOC keeps a separate estimate for each word. It takes into account how the word has gone for you, how confident you were, and whether you typed the answer or chose it. A correct typed answer counts for more than a chosen one. Hard words come back often, easy ones less.

We wrote [a separate post](/blog/taxmin-emas-olchov) about how we measured how well this works on real data.`,
    },
  },
];

export const getBuiltIn = (slug) => BUILT_IN_POSTS.find((p) => p.slug === slug) || null;

/** Language block for a post; falls back uz -> en -> first block that has a title. */
export function pickLang(post, lang) {
  const has = (b) => b && b.title && b.body;
  return (has(post[lang]) && post[lang]) || (has(post.uz) && post.uz) || (has(post.en) && post.en) || (has(post.ru) && post.ru) || { title: '', excerpt: '', body: '' };
}

/** Did the post actually have text in the requested language (vs. a fallback)? */
export const hasLang = (post, lang) => Boolean(post[lang] && post[lang].title && post[lang].body);
