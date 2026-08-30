export const sicilianGrammarData = {
  beginner: {
    label: 'Beginner',
    topics: [
      {
        id: 'scn-zero',
        title: "Nol darajadan boshlash",
        icon: '🎯',
        guide: `## Boshlashdan oldin: grammatika nima uchun kerak?

Har qanday tilda so'zlarni bilish yetarli emas — ularni **to'g'ri tartibda va to'g'ri shaklda** qo'shib, jumla qura olish kerak. Xuddi qurilishda g'ishtlar (so'zlar) bo'lsa-yu, ularni qanday terish kerakligini bilmasangiz, uy qurib bo'lmaydi — grammatika shu "qanday terish" qoidalari.

Bu darsda hech qanday sitsiliyacha qoida yo'q — faqat keyingi barcha darslarda ishlatiladigan **atamalarni** oddiy so'zlar bilan tushuntiramiz. Shundan keyin qolgan darslar ancha oson bo'ladi.

---

## 1. Eng asosiy uchta so'z turi

Har qanday tilda (o'zbek, ingliz, sitsiliya — farqi yo'q) so'zlar turlarga bo'linadi:

• **Ot**: narsa, odam yoki joy nomi — "uy", "it", "Ali". Sitsiliyachada: **casa** (uy).
• **Fe'l**: harakatni yoki holatni bildiradi — "bormoq", "yemoq". Sitsiliyachada: **manciari** (yemoq).
• **Sifat**: otni tasvirlaydi — "katta", "chiroyli". Sitsiliyachada: **beddu** (chiroyli).

Shu uchtasini bilsangiz, allaqachon eng oddiy jumlani tushuna olasiz: ot + fe'l = "kimdir nimadir qiladi".

## 2. "Jins" nima degani?

O'zbek va ingliz tillarida yo'q, lekin sitsiliyacha, rus, ispan, fransuz tillarida **bor** bir tushuncha: har bir OT "erkak" yoki "ayol" toifasiga tegishli deb hisoblanadi — bu jonli yoki jonsiz bo'lishidan qat'iy nazar.

Masalan sitsiliyachada "stol" (jonsiz narsa!) "erkak" toifasiga, "uy" esa "ayol" toifasiga kiradi. Bunga mantiqiy sabab yo'q — shunchaki har bir tilda shunday qabul qilingan. Yaxshi xabar: sitsiliyachada buni ko'pincha so'zning **oxirgi harfidan** taxmin qilish mumkin (buni keyingi darsda ko'rasiz).

## 3. "Artikl" nima degani?

O'zbek tilida yo'q, lekin ingliz tilida bor tushuncha — "the" va "a" so'zlari. Bular otning oldida turadigan juda kichik so'zlar bo'lib, "aniq bir narsa" (the dog — o'sha it) yoki "har qanday bir narsa" (a dog — biror it) ekanini bildiradi.

Sitsiliyachada ham xuddi shunday kichik so'zlar bor, lekin ular otning yuqorida aytilgan **jinsiga** qarab o'zgaradi. Buni aynan keyingi darsda batafsil o'rganamiz.

## 4. "Olmosh" nima degani?

Otning yoki odam ismining o'rniga ishlatiladigan so'z: "men", "sen", "u". Ismni har safar takrorlash o'rniga ishlatiladi — "Ali keldi, Ali charchagan" demay, "Ali keldi, u charchagan" deymiz.

## 5. "Fe'l tuslanishi" nima degani?

Fe'l so'zi gapiruvchiga qarab shaklini o'zgartiradi. Bu o'zbek tilida ham bor: "bor**aman**" (men), "bor**asan**" (sen), "bor**adi**" (u) — fe'lning oxiri har safar o'zgaradi. Sitsiliyachada ham xuddi shunday narsa bo'ladi, faqat qo'shimchalar boshqacha bo'ladi. Buni ham keyingi darslarda ko'ramiz.

---

Endi tayyorsiz! Har bir keyingi darsda yangi atama chiqsa, uni birinchi ishlatishdan oldin yana tushuntirib o'tamiz — hech narsani "bilasiz" deb taxmin qilmaymiz.`,
        questions: [
          { id: 1, text: '"Ot" so\'z turi nimani bildiradi?', options: ['Harakatni', 'Narsa, odam yoki joy nomini', 'Tasvirni', 'Savolni'], correct: 1, explanation: 'Ot — "uy", "it", "Ali" kabi narsa/odam/joy nomi.' },
          { id: 2, text: '"Fe\'l" so\'z turi nimani bildiradi?', options: ['Harakat yoki holatni', 'Faqat rangni', 'Faqat sonni', 'Faqat joyni'], correct: 0, explanation: 'Fe\'l — "bormoq", "yemoq" kabi harakat/holat so\'zi.' },
          { id: 3, text: 'O\'zbek va ingliz tillarida yo\'q, lekin sitsiliyachada bor tushuncha qaysi?', options: ['Ot', 'Fe\'l', 'Otlarning jinsi (erkak/ayol)', 'Sifat'], correct: 2, explanation: 'Otlarning jinsga bo\'linishi o\'zbek va inglizda yo\'q.' },
          { id: 4, text: 'Sitsiliyachada "stol" so\'zining jinsi qanday belgilanadi?', options: ['Jonli bo\'lgani uchun erkak', 'Shunchaki shunday qabul qilingan, mantiqiy sababi yo\'q', 'Har doim ayol', 'Jinsi yo\'q'], correct: 1, explanation: 'Ot jinsi jonlilik bilan bog\'liq emas, til tomonidan belgilangan.' },
          { id: 5, text: '"Artikl" tushunchasiga ingliz tilidan qaysi misol mos keladi?', options: ['go, run', 'the, a', 'big, small', 'he, she'], correct: 1, explanation: '"The" va "a" — artikllar.' },
          { id: 6, text: '"Olmosh" so\'ziga misol?', options: ['Uy', 'Chiroyli', 'U, men, sen', 'Bormoq'], correct: 2, explanation: 'Olmosh — otning o\'rnini bosadigan so\'z.' },
          { id: 7, text: '"Fe\'l tuslanishi" o\'zbek tilida qanday ko\'rinishda bor?', options: ['Umuman yo\'q', '"boraman / borasan / boradi" kabi oxiri o\'zgarishida', 'Faqat kelishiklarda', 'Faqat ko\'plikda'], correct: 1, explanation: 'Fe\'l shaxsga qarab oxiri o\'zgaradi — bu o\'zbek tilida ham bor tushuncha.' },
          { id: 8, text: '"Sifat" so\'z turiga misol?', options: ['Uy', 'Yemoq', 'Chiroyli', 'Men'], correct: 2, explanation: 'Sifat otni tasvirlaydi: "chiroyli", "katta".' }
        ],
        scrambled: [
          { id: 1, words: ['casa', 'è', 'bedda'], answer: 'Casa è bedda.', explanation: '"Uy chiroyli" — casa (ot) + è (fe\'l) + bedda (sifat).' },
          { id: 2, words: ['manciu', 'iu'], answer: 'Iu manciu.', explanation: '"Men yeyman."' },
          { id: 3, words: ['cani', 'beddu', 'un'], answer: 'Un cani beddu.', explanation: '"Chiroyli it."' },
          { id: 4, words: ['casa', 'a'], answer: 'A casa.', explanation: '"Uy" — artikl (a) + ot (casa).' },
          { id: 5, words: ['manciari', 'vogghiu'], answer: 'Vogghiu manciari.', explanation: '"Men yegim kelyapti."' }
        ]
      },
      {
        id: 'scn-articles',
        title: "Artikllar: U, A, I",
        icon: '📌',
        guide: `## Sitsiliya tilida artikllar

*(Oldingi darsda "artikl" nima ekanini umumiy tushuntirgan edik — bu yerda uni sitsiliyacha uchun batafsil ko'ramiz.)*


Sitsiliya tilida ot oldidan qo'yiladigan **aniq artikl** (the) va **noaniq artikl** (a/an) mavjud. Bu artikllar otning jinsi (erkak/ayol) va soniga (birlik/ko'plik) qarab o'zgaradi.

---

## 1. Aniq artikl

| | Birlik | Ko'plik |
|---|---|---|
| Erkak jinsi | **u** | **i** |
| Ayol jinsi | **a** (yoki **la**) | **i** |

Misollar:
  - **u cani** — it (erkak, birlik)
  - **i cani** — itlar (erkak, ko'plik)
  - **a casa** — uy (ayol, birlik)
  - **i casi** — uylar (ayol, ko'plik)

*(💡 Muhim: italyan tilidan farqli o'laroq (u yerda erkak ko'pligi "i", ayol ko'pligi "le"), sitsiliya tilida **ikkala jins uchun ham ko'plikda bitta artikl — "i" — ishlatiladi**. Bu sitsiliyachaning eng xarakterli xususiyatlaridan biri, ingliz tilidagi "the" bilan hech qanday aloqasi yo'q.)*

---

## 2. Noaniq artikl

| | Erkak | Ayol |
|---|---|---|
| Birlik | **un** | **'na** (yoki **na**) |

Misollar:
  - **un cani** — bir it
  - **'na casa** — bir uy

---

## 3. Unli tovush oldida

Unli bilan boshlanadigan so'z oldida "u" va "a" ko'pincha qisqaradi: **l'amicu** (do'st), **l'acqua** (suv).`,
        questions: [
          { id: 1, text: '"Uy" so\'zi oldiga qanday aniq artikl qo\'yiladi (birlikda)?', options: ['u', 'a', 'i', 'un'], correct: 1, explanation: '"Casa" ayol jinsidagi ot, birlikda "a casa" bo\'ladi.' },
          { id: 2, text: '"Itlar" (ko\'plik) so\'zi oldiga qanday artikl qo\'yiladi?', options: ['u', 'i', 'a', 'un'], correct: 1, explanation: 'Ko\'plikda ikkala jins uchun ham "i" ishlatiladi: "i cani".' },
          { id: 3, text: 'Sitsiliya tilida ayol jinsidagi otlarning ko\'plik artikli italyanchadan qanday farq qiladi?', options: ["Xuddi bir xil, 'le'", "Sitsiliyacha 'i', italyancha 'le'", "Sitsiliyacha 'le', italyancha 'i'", 'Farqi yo\'q'], correct: 1, explanation: 'Sitsiliyachada ikkala jins uchun ham ko\'plikda "i" ishlatiladi, italyanchada esa ayol ko\'pligi "le".' },
          { id: 4, text: '"Bir it" (noaniq artikl bilan) qanday bo\'ladi?', options: ["'na cani", 'un cani', 'u cani', 'i cani'], correct: 1, explanation: '"Cani" erkak jinsidagi ot, noaniq artikli "un cani".' },
          { id: 5, text: '"Bir uy" qanday bo\'ladi?', options: ['un casa', "'na casa", 'u casa', 'i casa'], correct: 1, explanation: '"Casa" ayol jinsidagi ot, noaniq artikli "\'na casa".' },
          { id: 6, text: '"U cani" iborasining ma\'nosi nima?', options: ['Bir it', 'It (aniq)', 'Itlar', 'Uy'], correct: 1, explanation: '"U" — erkak jinsidagi aniq artikl, "u cani" = "it".' },
          { id: 7, text: '"I casi" so\'zi nimani anglatadi?', options: ['Uy (birlik)', 'Uylar (ko\'plik)', 'Bir uy', 'It'], correct: 1, explanation: '"I" ko\'plik artikli, "casi" — "casa"ning ko\'plik shakli.' },
          { id: 8, text: 'Ayol jinsidagi otlarning aniq artikli birlikda odatda qanday?', options: ['u', 'i', 'a/la', 'un'], correct: 2, explanation: 'Ayol jinsi birlikda "a" yoki "la" ishlatiladi.' },
          { id: 9, text: 'Unli tovush bilan boshlanuvchi so\'z oldida "u"/"a" nima bo\'ladi?', options: ['O\'zgarmaydi', "Qisqaradi (l')", 'Yo\'qoladi', 'I ga aylanadi'], correct: 1, explanation: 'Masalan "l\'amicu", "l\'acqua".' },
          { id: 10, text: 'Erkak jinsidagi otlarning aniq artikli ko\'plikda qanday?', options: ['u', 'i', 'a', 'un'], correct: 1, explanation: 'Ko\'plikda erkak jinsi ham "i" artiklini oladi.' }
        ],
        scrambled: [
          { id: 1, words: ['cani', 'u', 'è', 'beddu'], answer: 'U cani è beddu.', explanation: '"It chiroyli" — U (artikl) + cani (ot) + è (fe\'l) + beddu (sifat).' },
          { id: 2, words: ['casa', 'è', 'a', 'granni'], answer: 'A casa è granni.', explanation: '"Uy katta" — ayol jinsi artikli "a".' },
          { id: 3, words: ['cani', 'un', 'aju'], answer: 'Aju un cani.', explanation: '"Mening itim bor" — noaniq artikl "un".' },
          { id: 4, words: ["'na", 'havi', 'casa'], answer: "Havi 'na casa.", explanation: '"Uning uyi bor" — noaniq artikl "\'na".' },
          { id: 5, words: ['cani', 'i', 'currunu'], answer: 'I cani currunu.', explanation: '"Itlar yuguradi" — ko\'plik artikli "i".' }
        ]
      },
      {
        id: 'scn-noun-gender-plural',
        title: "Otlarning jinsi va ko'pligi",
        icon: '🏷️',
        guide: `## Otlarning jinsi (erkak/ayol) va ko'plik shakli

Sitsiliya tilida har bir ot ma'lum jinsga ega: **erkak jinsi** yoki **ayol jinsi**. Jinsni ko'pincha so'z oxiridagi harfdan bilib olish mumkin.

---

## 1. Erkak jinsi otlar
Ko'pincha **-u** bilan tugaydi: **cani** (it), **libbru** (kitob), **tavulu** (stol), **gattu** (mushuk).

Ko'plikda **-u → -i**: tavulu → **tavuli**, gattu → **gatti**.

*(💡 Diqqat: ba'zi -u bilan tugagan so'zlar ko'plikda **-a** ga o'zgaradi (masalan **libbru → libbra**) — bu lotincha qadimiy neytral ko'plikdan qolgan iz, sitsiliyachaning o'ziga xos xususiyati.)*

---

## 2. Ayol jinsi otlar
Ko'pincha **-a** bilan tugaydi: **casa** (uy), **famigghia** (oila).

Ko'plikda **-a → -i** (italyanchadagi **-e** emas!): casa → **casi**, famigghia → **famigghi**.

---

## 3. -i bilan tugagan otlar
Ba'zi otlar (ko'pincha qarindoshlik so'zlari) allaqachon **-i** bilan tugaydi va ko'plikda o'zgarmaydi: **matri** (ona), **patri** (ota), **frati** (aka/uka). Faqat artikl o'zgaradi: **u frati** (aka) → **i frati** (akalar).`,
        questions: [
          { id: 1, text: '"Kitob" (libbru) so\'zining ko\'plik shakli qanday?', options: ['libbru', 'libbri', 'libbra', 'libbrii'], correct: 2, explanation: 'Libbru → libbra, lotincha neytral ko\'plik izidan qolgan shakl.' },
          { id: 2, text: 'Sitsiliyachada ayol jinsidagi otlar ko\'plikda qanday tugaydi?', options: ['-e', '-i', '-a', '-o'], correct: 1, explanation: 'Casa → casi, italyanchadagi -e emas, -i bilan.' },
          { id: 3, text: '"Mushuk" (gattu) ko\'plikda qanday bo\'ladi?', options: ['gatti', 'gatta', 'gattu', 'gattie'], correct: 0, explanation: 'Erkak jinsi -u → -i: gattu → gatti.' },
          { id: 4, text: '"Ona" (matri) so\'zi qaysi guruhga kiradi?', options: ['-u bilan tugaydigan erkak ot', '-a bilan tugaydigan ayol ot', "-i bilan tugagan, ko'plikda o'zgarmas ot", 'Noaniq'], correct: 2, explanation: 'Matri, patri, frati kabi qarindoshlik otlari -i bilan tugaydi va ko\'plikda o\'zgarmaydi.' },
          { id: 5, text: '"Uy" (casa) ko\'plikda?', options: ['case', 'casi', 'casa', 'casu'], correct: 1, explanation: 'Casa → casi.' },
          { id: 6, text: '"Oila" (famigghia) ko\'plikda?', options: ['famigghie', 'famigghi', 'famigghia', 'famigghii'], correct: 1, explanation: 'Famigghia → famigghi.' },
          { id: 7, text: 'Erkak jinsidagi otlar odatda qaysi harf bilan tugaydi?', options: ['-a', '-u', '-i', '-o'], correct: 1, explanation: 'Erkak jinsi ko\'pincha -u bilan tugaydi.' },
          { id: 8, text: '"Aka/uka" (frati) so\'zining ko\'plik shakli qanday farqlanadi?', options: ['Faqat artikl o\'zgaradi: u frati → i frati', "So'z 'fratii' bo'ladi", "So'z 'frata' bo'ladi", "Umuman o'zgarmaydi, artikl ham"], correct: 0, explanation: '-i bilan tugagan otlarda faqat artikl o\'zgaradi.' },
          { id: 9, text: 'Quyidagilardan qaysi biri ayol jinsidagi ot?', options: ['libbru', 'cani', 'casa', 'gattu'], correct: 2, explanation: 'Casa -a bilan tugagan, ayol jinsi.' },
          { id: 10, text: '"Tavulu" (stol) so\'zining ko\'plik shakli?', options: ['tavula', 'tavuli', 'tavulu', 'tavule'], correct: 1, explanation: 'Tavulu → tavuli.' }
        ],
        scrambled: [
          { id: 1, words: ['libbra', 'aju', 'dui'], answer: 'Aju dui libbra.', explanation: '"Ikkita kitobim bor."' },
          { id: 2, words: ['casi', 'su', 'belli', 'sti'], answer: 'Sti casi su belli.', explanation: '"Bu uylar chiroyli."' },
          { id: 3, words: ['frati', 'tri', 'aju'], answer: 'Aju tri frati.', explanation: '"Uchta akam/ukam bor."' },
          { id: 4, words: ['gatti', 'jocanu', 'i'], answer: 'I gatti jocanu.', explanation: '"Mushuklar o\'ynayapti."' },
          { id: 5, words: ['granni', 'famigghia', 'è', 'a'], answer: 'A famigghia è granni.', explanation: '"Oila katta."' }
        ]
      },
      {
        id: 'scn-pronouns',
        title: 'Shaxs olmoshlari',
        icon: '🙋',
        guide: `## Shaxs olmoshlari

| Shaxs | Sitsiliyacha | O'zbekcha |
|---|---|---|
| 1-shaxs birlik | **iu** | men |
| 2-shaxs birlik | **tu** | sen |
| 3-shaxs birlik (erkak) | **iddu** | u (erkak) |
| 3-shaxs birlik (ayol) | **idda** | u (ayol) |
| 1-shaxs ko'plik | **nuautri** | biz |
| 2-shaxs ko'plik | **vuautri** | sizlar |
| 3-shaxs ko'plik | **iddi** | ular |

*(💡 Sitsiliyachada, ko'p roman tillari kabi, fe'l shakli shaxsni allaqachon ko'rsatib turadi, shuning uchun olmosh ko'pincha **tushirib qoldiriladi**: "**Sugnu** cuntenti" (Xursandman) — "iu" so'zisiz ham tushunarli. Bu ingliz tilidagi "I am happy" tuzilishidan tubdan farq qiladi — u yerda olmoshni tushirib bo'lmaydi.)*`,
        questions: [
          { id: 1, text: '"Biz" so\'ziga mos olmosh?', options: ['vuautri', 'nuautri', 'iddi', 'iu'], correct: 1, explanation: '"Nuautri" — biz.' },
          { id: 2, text: '"U (ayol)" ma\'nosini bildiruvchi olmosh?', options: ['iddu', 'idda', 'iddi', 'idi'], correct: 1, explanation: '"Idda" — ayol jinsidagi "u".' },
          { id: 3, text: '"Sizlar" olmoshi?', options: ['vuautri', 'nuautri', 'tu', 'iddi'], correct: 0, explanation: '"Vuautri" — sizlar.' },
          { id: 4, text: 'Sitsiliyachada olmosh ko\'pincha nega tushirib qoldiriladi?', options: ['Grammatik xato hisoblanadi', 'Fe\'l shakli shaxsni ko\'rsatadi', 'Faqat yozma tilda ishlatiladi', 'Sabab yo\'q'], correct: 1, explanation: 'Fe\'l tuslanishi shaxsni allaqachon bildiradi.' },
          { id: 5, text: '"Ular" olmoshi?', options: ['iddi', 'idda', 'iddu', 'nuautri'], correct: 0, explanation: '"Iddi" — ular.' },
          { id: 6, text: '"Men" olmoshi?', options: ['tu', 'iu', 'iddu', 'nuautri'], correct: 1, explanation: '"Iu" — men.' },
          { id: 7, text: '"Iddu è me frati" gapida "iddu" nimani bildiradi?', options: ['Men', 'Sen', 'U (erkak)', 'Biz'], correct: 2, explanation: '"Iddu" — u (erkak).' },
          { id: 8, text: '"Nuautri semu amici" gapining ma\'nosi?', options: ['Sizlar do\'stsiz', 'Biz do\'stmiz', 'Ular do\'st', 'Men do\'stman'], correct: 1, explanation: '"Nuautri semu amici" — biz do\'stmiz.' }
        ],
        scrambled: [
          { id: 1, words: ['sugnu', 'iu', 'cuntenti'], answer: 'Iu sugnu cuntenti.', explanation: '"Men xursandman."' },
          { id: 2, words: ['si', 'tu', 'simpaticu'], answer: 'Tu si simpaticu.', explanation: '"Sen yoqimlisan."' },
          { id: 3, words: ['amici', 'semu', 'nuautri'], answer: 'Nuautri semu amici.', explanation: '"Biz do\'stmiz."' },
          { id: 4, words: ['studenti', 'sunnu', 'iddi'], answer: 'Iddi sunnu studenti.', explanation: '"Ular talaba."' },
          { id: 5, words: ['frati', 'è', 'me', 'iddu'], answer: 'Iddu è me frati.', explanation: '"U mening akam."' }
        ]
      },
      {
        id: 'scn-essiri',
        title: '"Essiri" fe\'li (bo\'lmoq)',
        icon: '🔷',
        guide: `## "Essiri" fe'li — bo'lmoq

"Essiri" — sitsiliya tilidagi eng muhim va noto'g'ri (irregular) tuslanadigan fe'llardan biri. U holat, kasb, xususiyatni bildirish uchun ishlatiladi.

| Olmosh | Shakl |
|---|---|
| iu | **sugnu** |
| tu | **si** |
| iddu/idda | **è** |
| nuautri | **semu** |
| vuautri | **siti** |
| iddi | **sunnu** |

Misollar:
  - **Sugnu sicilianu.** — Men sitsiliyalikman.
  - **Semu amici.** — Biz do'stmiz.
  - **Iddi sunnu studenti.** — Ular talaba.

Inkor: fe'ldan oldin **nun** qo'yiladi: **Nun sugnu stancu.** — Men charchagan emasman.

*(💡 Bu shakllar ingliz tilidagi "am/is/are" bilan hech qanday o'xshashlikka ega emas — ularni alohida yodlash kerak.)*`,
        questions: [
          { id: 1, text: '"Men xursandman" — to\'g\'ri tarjima?', options: ['Tu si cuntenti', 'Iu sugnu cuntenti', 'Semu cuntenti', 'Iddu è cuntenti'], correct: 1, explanation: '1-shaxs birlik: sugnu.' },
          { id: 2, text: '"Iddu ___ me frati" bo\'sh joyga mos shakl?', options: ['sugnu', 'si', 'è', 'semu'], correct: 2, explanation: '3-shaxs birlik: è.' },
          { id: 3, text: '"Vuautri" olmoshiga mos "essiri" shakli?', options: ['siti', 'semu', 'sunnu', 'si'], correct: 0, explanation: '2-shaxs ko\'plik: siti.' },
          { id: 4, text: 'Inkor qanday hosil qilinadi?', options: ["Fe'ldan keyin 'no'", "Fe'ldan oldin 'nun'", 'Olmoshni o\'zgartirib', 'Inkor mavjud emas'], correct: 1, explanation: 'Nun fe\'ldan oldin qo\'yiladi.' },
          { id: 5, text: '"Nuautri ___ amici" bo\'sh joyga mos shakl?', options: ['sunnu', 'semu', 'siti', 'è'], correct: 1, explanation: '1-shaxs ko\'plik: semu.' },
          { id: 6, text: '"Iddi sunnu studenti" gapining tarjimasi?', options: ['U talaba', 'Biz talabamiz', 'Ular talaba', 'Sen talabasan'], correct: 2, explanation: 'Iddi = ular, sunnu = 3-shaxs ko\'plik shakli.' },
          { id: 7, text: '"Tu si simpaticu" gapida "si" qaysi olmoshga tegishli?', options: ['iu', 'tu', 'iddu', 'nuautri'], correct: 1, explanation: '"Si" — 2-shaxs birlik.' },
          { id: 8, text: '"Men charchagan emasman" — to\'g\'ri gap?', options: ['Sugnu stancu', 'Nun sugnu stancu', 'Nun si stancu', 'Sugnu nun stancu'], correct: 1, explanation: 'Nun sugnu + sifat.' },
          { id: 9, text: '"Essiri" fe\'li qaysi guruhga kiradi?', options: ['Muntazam -ari fe\'l', 'Muntazam -iri fe\'l', 'Noto\'g\'ri (irregular) fe\'l', 'Modal fe\'l'], correct: 2, explanation: 'Essiri barcha roman tillarida bo\'lgani kabi noto\'g\'ri tuslanadi.' },
          { id: 10, text: '1-shaxs ko\'plik ("biz") uchun to\'g\'ri shakl?', options: ['sugnu', 'semu', 'siti', 'sunnu'], correct: 1, explanation: 'Semu — nuautri uchun.' }
        ],
        scrambled: [
          { id: 1, words: ['sicilianu', 'sugnu', 'iu'], answer: 'Iu sugnu sicilianu.', explanation: '"Men sitsiliyalikman."' },
          { id: 2, words: ['è', 'frati', 'iddu', 'me'], answer: 'Iddu è me frati.', explanation: '"U mening akam."' },
          { id: 3, words: ['siti', 'simpatici', 'vuautri'], answer: 'Vuautri siti simpatici.', explanation: '"Sizlar yoqimlisiz."' },
          { id: 4, words: ['stancu', 'nun', 'sugnu'], answer: 'Nun sugnu stancu.', explanation: '"Men charchagan emasman."' },
          { id: 5, words: ['studenti', 'sunnu', 'iddi'], answer: 'Iddi sunnu studenti.', explanation: '"Ular talaba."' }
        ]
      },
      {
        id: 'scn-aviri',
        title: '"Aviri" fe\'li (ega bo\'lmoq)',
        icon: '🔶',
        guide: `## "Aviri" fe'li — ega bo'lmoq

| Olmosh | Shakl |
|---|---|
| iu | **aju** |
| tu | **hai** |
| iddu/idda | **havi** |
| nuautri | **avemu** |
| vuautri | **aviti** |
| iddi | **hannu** |

Misollar:
  - **Aju dui frati.** — Menda ikkita aka/uka bor.
  - **Havi vinti anni.** — U 20 yoshda.
  - **Hannu 'na casa granni.** — Ularning katta uyi bor.

*(💡 Yosh aytish uchun **aviri** ishlatiladi, essiri emas: so'zma-so'z "20 yilga ega bo'lmoq". Bu ingliz tilidagi "to be ... years old" dan farq qiladi.)*

*(💡 **"Aviri a" + infinitiv** = majburiyat, kerak: **Aju a jiri.** — Men borishim kerak.)*`,
        questions: [
          { id: 1, text: '"Menda ikki akam bor" to\'g\'ri tarjima?', options: ['Aju dui frati', 'Havi dui frati', 'Hai dui frati', 'Avemu dui frati'], correct: 0, explanation: '1-shaxs birlik: aju.' },
          { id: 2, text: '"U 20 yoshda" - sitsiliyachada yosh qanday ifodalanadi?', options: ['essiri fe\'li bilan', 'aviri fe\'li bilan', 'alohida so\'z bilan', 'artikl bilan'], correct: 1, explanation: '"Havi vinti anni" — so\'zma-so\'z "u 20 yilga ega".' },
          { id: 3, text: '"Tu ___ \'na casa bedda" bo\'sh joy?', options: ['aju', 'hai', 'havi', 'avemu'], correct: 1, explanation: '2-shaxs birlik: hai.' },
          { id: 4, text: '"Aviri a" + fe\'l nimani bildiradi?', options: ['Istak', 'Majburiyat (kerak)', "O'tgan zamon", 'Savol'], correct: 1, explanation: '"Aju a jiri" — men borishim kerak.' },
          { id: 5, text: '"Iddi ___ \'na machina nova"', options: ['hannu', 'avemu', 'aviti', 'havi'], correct: 0, explanation: '3-shaxs ko\'plik: hannu.' },
          { id: 6, text: '"Men borishim kerak" - to\'g\'ri gap?', options: ['Sugnu a jiri', 'Aju a jiri', 'Havi a jiri', 'Aju jiri'], correct: 1, explanation: '"Aviri a" + infinitiv = kerak.' },
          { id: 7, text: '"Nuautri" uchun "aviri" shakli?', options: ['avemu', 'aviti', 'hannu', 'aju'], correct: 0, explanation: '1-shaxs ko\'plik: avemu.' },
          { id: 8, text: '"Havi" shakli qaysi shaxsga tegishli?', options: ['iu', 'tu', 'iddu/idda', 'nuautri'], correct: 2, explanation: '"Havi" — 3-shaxs birlik.' },
          { id: 9, text: '"Aviri" fe\'li asosan nimani bildiradi?', options: ['Holat', 'Egalik', 'Harakat', 'Joylashuv'], correct: 1, explanation: 'Aviri — egalik (bor/ega bo\'lmoq) fe\'li.' },
          { id: 10, text: '"Vuautri ___ tempu?"', options: ['aviti', 'avemu', 'hannu', 'hai'], correct: 0, explanation: '2-shaxs ko\'plik: aviti.' }
        ],
        scrambled: [
          { id: 1, words: ['frati', 'aju', 'dui'], answer: 'Aju dui frati.', explanation: '"Ikkita akam bor."' },
          { id: 2, words: ['anni', 'havi', 'vinti'], answer: 'Havi vinti anni.', explanation: '"U 20 yoshda."' },
          { id: 3, words: ['casa', "'na", 'hannu', 'granni'], answer: "Hannu 'na casa granni.", explanation: '"Ularning katta uyi bor."' },
          { id: 4, words: ['jiri', 'aju', 'a'], answer: 'Aju a jiri.', explanation: '"Men borishim kerak."' },
          { id: 5, words: ["'na", 'hai', 'machina', 'nova'], answer: "Hai 'na machina nova.", explanation: '"Sening yangi mashinang bor."' }
        ]
      },
      {
        id: 'scn-ari-verbs',
        title: "-ARI guruh fe'llari",
        icon: '🗣️',
        guide: `## Muntazam -ARI fe'llar

Sitsiliya tilida fe'llarning eng katta guruhi infinitivda **-ari** bilan tugaydi: **parrari** (gapirmoq), **manciari** (yemoq), **travagghiari** (ishlamoq), **accattari** (sotib olmoq).

Hozirgi zamon tuslanishi (masalan **parrari**):

| Olmosh | Shakl |
|---|---|
| iu | parr**u** |
| tu | parr**i** |
| iddu/idda | parr**a** |
| nuautri | parr**amu** |
| vuautri | parr**ati** |
| iddi | parr**anu** |

Misol: **Parru sicilianu.** — Men sitsiliyacha gaplashaman.

*(💡 Diqqat: -ARI fe'llarning tuslanishi ingliz tilidagi "to speak → I speak / you speak" kabi o'zgarmas emas — har bir shaxs uchun **boshqa qo'shimcha** olinadi.)*`,
        questions: [
          { id: 1, text: '"Parrari" fe\'lining infinitiv qo\'shimchasi?', options: ['-iri', '-ari', '-uri', '-eri'], correct: 1, explanation: 'Parrari — -ari guruhi.' },
          { id: 2, text: '"Iu ___ sicilianu" (parrari)', options: ['parru', 'parri', 'parra', 'parramu'], correct: 0, explanation: '1-shaxs birlik: parru.' },
          { id: 3, text: '"Nuautri manci___" to\'g\'ri qo\'shimcha?', options: ['-u', '-i', '-a', '-amu'], correct: 3, explanation: 'Manciamu — biz yeymiz.' },
          { id: 4, text: '"Iddi parr___"', options: ['-anu', '-amu', '-ati', '-u'], correct: 0, explanation: '3-shaxs ko\'plik: parranu.' },
          { id: 5, text: '"Tu accatt___ pani"', options: ['-u', '-i', '-a', '-amu'], correct: 1, explanation: '2-shaxs birlik: accatti.' },
          { id: 6, text: '-ARI fe\'llarga yana qaysi so\'z misol bo\'ladi?', options: ['sèntiri', 'essiri', 'travagghiari', 'aviri'], correct: 2, explanation: 'Travagghiari — -ari guruhi fe\'li.' },
          { id: 7, text: '"Iddu manci___ pasta"', options: ['-u', '-i', '-a', '-anu'], correct: 2, explanation: '3-shaxs birlik: mancia.' },
          { id: 8, text: '"Biz ishlaymiz" — to\'g\'ri tarjima?', options: ['Travagghiu', 'Travagghiamu', 'Travagghiati', 'Travagghianu'], correct: 1, explanation: '1-shaxs ko\'plik: travagghiamu.' },
          { id: 9, text: '"Vuautri" uchun -ari fe\'l qo\'shimchasi?', options: ['-amu', '-ati', '-anu', '-i'], correct: 1, explanation: '2-shaxs ko\'plik: -ati.' },
          { id: 10, text: '"Parru sicilianu" gapining ma\'nosi?', options: ['U sitsiliyacha gapiradi', 'Men sitsiliyacha gaplashaman', 'Biz sitsiliyacha gaplashamiz', 'Sen sitsiliyacha gaplashasan'], correct: 1, explanation: 'Parru — 1-shaxs birlik.' }
        ],
        scrambled: [
          { id: 1, words: ['sicilianu', 'parru', 'iu'], answer: 'Iu parru sicilianu.', explanation: '"Men sitsiliyacha gaplashaman."' },
          { id: 2, words: ['pani', 'manciamu', 'nuautri'], answer: 'Nuautri manciamu pani.', explanation: '"Biz non yeymiz."' },
          { id: 3, words: ['tutti', 'travagghiu', 'i', 'jorna'], answer: 'Travagghiu tutti i jorna.', explanation: '"Men har kuni ishlayman."' },
          { id: 4, words: ['pasta', 'iddu', 'mancia'], answer: 'Iddu mancia pasta.', explanation: '"U pasta yeydi."' },
          { id: 5, words: ['cammisa', 'accatta', "'na", 'idda'], answer: "Idda accatta 'na cammisa.", explanation: '"U (ayol) ko\'ylak sotib oladi."' }
        ]
      },
      {
        id: 'scn-iri-verbs',
        title: "-IRI guruh fe'llari",
        icon: '📣',
        guide: `## Muntazam -IRI fe'llar

Ikkinchi katta guruh infinitivda **-iri** bilan tugaydi: **sèntiri** (his qilmoq/eshitmoq), **durmiri** (uxlamoq), **scriviri** (yozmoq).

Hozirgi zamon (masalan **sèntiri**):

| Olmosh | Shakl |
|---|---|
| iu | sent**u** |
| tu | sent**i** |
| iddu/idda | sent**i** |
| nuautri | sent**emu** |
| vuautri | sent**eti** |
| iddi | sent**unu** |

*(💡 Diqqat: 2- va 3-shaxs birlik, tu/iddu, bir xil shaklga ega — **senti**. Bu -ARI guruhidan farqli tomoni, u yerda parri/parra farqlanadi. Bunga o'xshash hodisa ingliz tilida yo'q.)*`,
        questions: [
          { id: 1, text: '"Sèntiri" fe\'li qaysi guruhga tegishli?', options: ['-ari', '-iri', '-uri', "noto'g'ri"], correct: 1, explanation: 'Sèntiri — -iri guruhi.' },
          { id: 2, text: '"Iu sent___ friddu"', options: ['-u', '-i', '-emu', '-unu'], correct: 0, explanation: '1-shaxs birlik: sentu.' },
          { id: 3, text: '-IRI guruhida tu va iddu shakllari qanday farqlanadi?', options: ["Farq qilmaydi, ikkalasi ham 'senti'", "Tu 'senti', iddu 'sentu'", 'Butunlay boshqa', 'Faqat urg\'uda'], correct: 0, explanation: '2- va 3-shaxs birlik bir xil: senti.' },
          { id: 4, text: '"Nuautri durm___"', options: ['-u', '-emu', '-eti', '-unu'], correct: 1, explanation: '1-shaxs ko\'plik: durmemu.' },
          { id: 5, text: '"Iddi scriv___ \'na littra"', options: ['-unu', '-emu', '-eti', '-u'], correct: 0, explanation: '3-shaxs ko\'plik: scrivunu.' },
          { id: 6, text: 'Yana qanday fe\'llar -IRI guruhiga kiradi?', options: ['parrari, manciari', 'essiri, aviri', 'apriri, durmiri', 'travagghiari, accattari'], correct: 2, explanation: 'Apriri va durmiri -iri guruhiga kiradi.' },
          { id: 7, text: '"Vuautri sent___"', options: ['-eti', '-emu', '-unu', '-i'], correct: 0, explanation: '2-shaxs ko\'plik: senteti.' },
          { id: 8, text: '"Durmiri" fe\'lining ma\'nosi?', options: ['Yozmoq', 'Uxlamoq', 'Ochmoq', 'Eshitmoq'], correct: 1, explanation: 'Durmiri — uxlamoq.' },
          { id: 9, text: '"Sentu friddu" gapining tarjimasi?', options: ['U sovuqni his qiladi', 'Men sovuqni his qilaman', 'Biz sovuqni his qilamiz', 'Sen sovuqni his qilasan'], correct: 1, explanation: 'Sentu — 1-shaxs birlik.' },
          { id: 10, text: '"Iddu senti" — bu qaysi shaxsga tegishli bo\'lishi mumkin?', options: ['Faqat 3-shaxs', '2- yoki 3-shaxs birlik', 'Faqat 2-shaxs', '1-shaxs'], correct: 1, explanation: 'Senti shakli ham "tu", ham "iddu" uchun ishlatiladi, kontekstdan bilinadi.' }
        ],
        scrambled: [
          { id: 1, words: ['friddu', 'sentu', 'iu'], answer: 'Iu sentu friddu.', explanation: '"Men sovuqni his qilyapman."' },
          { id: 2, words: ['prestu', 'durmiri', 'vaju', 'a'], answer: 'Vaju a durmiri prestu.', explanation: '"Men erta uxlagani boraman."' },
          { id: 3, words: ['littra', 'scrivu', "'na"], answer: "Scrivu 'na littra.", explanation: '"Men xat yozyapman."' },
          { id: 4, words: ['porta', 'japri', 'la'], answer: 'Japri la porta.', explanation: '"Eshikni och."' },
          { id: 5, words: ['nuautri', 'durmemu', 'beni'], answer: 'Nuautri durmemu beni.', explanation: '"Biz yaxshi uxlaymiz."' }
        ]
      },
      {
        id: 'scn-adjectives',
        title: 'Sifatlar va kelishuv',
        icon: '🎨',
        guide: `## Sifatlar va otlar bilan moslashuvi

Sitsiliyachada sifat odatda otdan **keyin** keladi va otning jinsi/soniga moslashadi:

| | Erkak birlik | Ayol birlik | Ko'plik |
|---|---|---|---|
| chiroyli | beddu | bedda | beddi |
| katta | grandi | grandi | grandi |
| yangi | novu | nova | novi |

Misollar:
  - **un cani beddu** — chiroyli it
  - **'na casa bedda** — chiroyli uy
  - **cani beddi** — chiroyli itlar

*(💡 Diqqat: **-i** bilan tugaydigan sifatlar, masalan **grandi**, **forti**, **veloci**, erkak va ayol jinsida **bir xil** bo'ladi. Bu ingliz tilidagi sifatlar umuman o'zgarmasligidan farqli — sitsiliyachada sifat otga "kelishishi" shart.)*`,
        questions: [
          { id: 1, text: '"Chiroyli it" (erkak) qanday bo\'ladi?', options: ['un cani bedda', 'un cani beddu', "'na cani beddu", 'un beddu'], correct: 1, explanation: 'Cani erkak jinsi, sifat ham erkak shaklda: beddu.' },
          { id: 2, text: '"Chiroyli uy" (ayol) qanday bo\'ladi?', options: ["'na casa beddu", "'na casa bedda", 'un casa bedda', "'na bedda"], correct: 1, explanation: 'Casa ayol jinsi, sifat ham ayol shaklda: bedda.' },
          { id: 3, text: 'Sifat sitsiliyachada odatda otdan oldin keladimi yoki keyin?', options: ['Oldin', 'Keyin', 'Har doim oldin', "Qoida yo'q"], correct: 1, explanation: 'Sifat odatda otdan keyin keladi.' },
          { id: 4, text: '"Grandi" sifati qaysi xususiyatga ega?', options: ['Faqat erkak jinsida ishlatiladi', 'Erkak va ayolda bir xil shaklda', "Faqat ko'plikda ishlatiladi", "O'zgaruvchan"], correct: 1, explanation: '-i bilan tugagan sifatlar jinsda o\'zgarmaydi.' },
          { id: 5, text: '"Yangi mashina" (machina — ayol jinsi) to\'g\'ri shakli?', options: ['machina novu', 'machina nova', 'machina novi', 'machina nou'], correct: 1, explanation: 'Machina ayol jinsi: machina nova.' },
          { id: 6, text: '"Chiroyli itlar" (ko\'plik) qanday bo\'ladi?', options: ['cani beddu', 'cani bedda', 'cani beddi', 'cani bedd'], correct: 2, explanation: 'Ko\'plikda sifat: beddi.' },
          { id: 7, text: '"Beddu" sifatining ayol shakli?', options: ['beddu', 'bedda', 'beddi', 'beddo'], correct: 1, explanation: 'Beddu → bedda (ayol).' },
          { id: 8, text: 'Sifat otga qanday moslashadi?', options: ['Faqat sonda', 'Faqat jinsda', 'Jins va sonda', 'Umuman moslashmaydi'], correct: 2, explanation: 'Sifat otning ham jinsiga, ham soniga moslashadi.' },
          { id: 9, text: '"Un cani grandi" gapida "grandi" nima uchun o\'zgarmagan?', options: ['Xato qilingan', "-i bilan tugagan sifatlar jinsda o'zgarmaydi", 'Faqat erkak uchun', "Ko'plik shakli"], correct: 1, explanation: '-i bilan tugagan sifatlar universal.' },
          { id: 10, text: '"Novu" so\'zining ma\'nosi?', options: ['Eski', 'Yangi', 'Katta', 'Kichik'], correct: 1, explanation: 'Novu — yangi.' }
        ],
        scrambled: [
          { id: 1, words: ['beddu', 'cani', 'un'], answer: 'Un cani beddu.', explanation: '"Chiroyli it."' },
          { id: 2, words: ['bedda', 'casa', "'na"], answer: "'Na casa bedda.", explanation: '"Chiroyli uy."' },
          { id: 3, words: ['beddi', 'sunnu', 'cani', 'i'], answer: 'I cani sunnu beddi.', explanation: '"Itlar chiroyli."' },
          { id: 4, words: ['nova', 'machina', 'aju', "'na"], answer: "Aju 'na machina nova.", explanation: '"Mening yangi mashinam bor."' },
          { id: 5, words: ['grandi', 'è', 'casa', 'la'], answer: 'La casa è grandi.', explanation: '"Uy katta."' }
        ]
      },
      {
        id: 'scn-negation-questions',
        title: 'Inkor va savol gaplari',
        icon: '❓',
        guide: `## Inkor va savol gaplari

### Inkor
Fe'ldan oldin **nun** qo'yiladi:
  - **Sugnu cuntenti.** → **Nun sugnu cuntenti.** (Men xursand emasman.)
  - **Capisciu.** → **Nun capisciu.** (Tushunmayapman.)

### Savol so'zlari

| So'roq so'zi | Ma'nosi |
|---|---|
| **chi** | nima |
| **cui** | kim |
| **unni** | qayerda |
| **quannu** | qachon |
| **pirchì** | nima uchun |
| **comu** | qanday |
| **quantu** | qancha |

Savol so'zi odatda gap boshida keladi: **Unni sta la stazioni?** (Vokzal qayerda?)

Ha/yo'q savollar esa faqat ohang (intonatsiya) bilan farqlanadi, so'z tartibi o'zgarmaydi: **Havi 'na casa?** (Uyi bormi?) — bu ingliz tilidagi "does he have...?" kabi yordamchi fe'l talab qilmaydi.`,
        questions: [
          { id: 1, text: 'Inkor qanday hosil qilinadi?', options: ["Fe'ldan keyin 'no'", "Fe'ldan oldin 'nun'", "Gap oxirida '?'", "Olmoshni almashtirib"], correct: 1, explanation: 'Nun fe\'ldan oldin qo\'yiladi.' },
          { id: 2, text: '"Tushunmayapman" — to\'g\'ri gap?', options: ['Capisciu nun', 'Nun capisciu', 'Nun sugnu capisciu', 'Capisciu no'], correct: 1, explanation: 'Nun + fe\'l.' },
          { id: 3, text: '"Qayerda" so\'roq so\'zi?', options: ['chi', 'cui', 'unni', 'quannu'], correct: 2, explanation: 'Unni — qayerda.' },
          { id: 4, text: '"Nima uchun" so\'roq so\'zi?', options: ['pirchì', 'comu', 'chi', 'quantu'], correct: 0, explanation: 'Pirchì — nima uchun.' },
          { id: 5, text: '"Chi fai?" gapining ma\'nosi?', options: ['Kim keldi?', 'Nima qilyapsan?', 'Qayerdasan?', 'Qachon kelasan?'], correct: 1, explanation: 'Chi — nima.' },
          { id: 6, text: 'Ha/yo\'q savollarida so\'z tartibi o\'zgaradimi?', options: ["Ha, fe'l boshga chiqadi", 'Yo\'q, faqat ohang o\'zgaradi', "So'roq so'zi qo'shiladi", 'Har doim o\'zgaradi'], correct: 1, explanation: 'Faqat intonatsiya bilan savol yasaladi.' },
          { id: 7, text: '"Kim" so\'roq so\'zi?', options: ['chi', 'cui', 'comu', 'unni'], correct: 1, explanation: 'Cui — kim.' },
          { id: 8, text: '"Quantu costa?" gapining ma\'nosi?', options: ['Qachon keladi?', 'Qancha turadi?', 'Qayerda?', 'Kim bu?'], correct: 1, explanation: 'Quantu — qancha.' },
          { id: 9, text: 'Savol so\'zi odatda gapning qaysi qismida keladi?', options: ['Oxirida', 'O\'rtasida', 'Boshida', 'Istalgan joyda'], correct: 2, explanation: 'Savol so\'zi gap boshida keladi.' },
          { id: 10, text: '"Nun sugnu stancu" gapining ma\'nosi?', options: ['Men charchaganman', 'Men charchagan emasman', 'Sen charchagansan', 'Biz charchaganmiz'], correct: 1, explanation: 'Nun + sugnu stancu = charchagan emasman.' }
        ],
        scrambled: [
          { id: 1, words: ['capisciu', 'nun'], answer: 'Nun capisciu.', explanation: '"Tushunmayapman."' },
          { id: 2, words: ['stazioni', 'sta', 'unni', 'la'], answer: 'Unni sta la stazioni?', explanation: '"Vokzal qayerda?"' },
          { id: 3, words: ['costa', 'chistu', 'quantu'], answer: 'Quantu costa chistu?', explanation: '"Bu qancha turadi?"' },
          { id: 4, words: ['fai', 'chi'], answer: 'Chi fai?', explanation: '"Nima qilyapsan?"' },
          { id: 5, words: ['stancu', 'nun', 'sugnu'], answer: 'Nun sugnu stancu.', explanation: '"Men charchagan emasman."' }
        ]
      }
    ]
  },
  intermediate: {
    label: 'Intermediate',
    topics: [
      {
        id: 'scn-possessives',
        title: 'Egalik olmoshlari',
        icon: '👪',
        guide: `## Egalik olmoshlari

| Shaxs | Birlik ot bilan | Ko'plik ot bilan |
|---|---|---|
| mening | **me** | **mei** |
| sening | **to** | **toi** |
| uning | **so** | **soi** |
| bizning | **nostru/nostra** | **nostri** |
| sizning | **vostru/vostra** | **vostri** |
| ularning | **so** | **soi** |

*(💡 Muhim: qarindoshlik otlari bilan, patri, matri, frati, soru, egalik olmoshi **artiklsiz** ishlatiladi: **me patri** (mening otam), **so soru** (uning opasi). Boshqa otlar bilan odatda artikl saqlanadi: **u me libbru** (mening kitobim).)*

*(💡 "So" bir vaqtning o'zida ham "uning", ham "ularning" degan ma'noni bildirishi mumkin — aniq ma'no kontekstdan bilinadi.)*`,
        questions: [
          { id: 1, text: '"Mening otam" — to\'g\'ri shakli?', options: ['u me patri', 'me patri', 'la me patri', 'me patre'], correct: 1, explanation: 'Qarindoshlik so\'zi bilan artiklsiz: me patri.' },
          { id: 2, text: '"Uning opasi" (idda) — to\'g\'ri shakli?', options: ['so soru', 'u so soru', 'me soru', 'to soru'], correct: 0, explanation: 'So soru — uning opasi.' },
          { id: 3, text: 'Qarindoshlik so\'zlari bilan egalik olmoshi qanday ishlatiladi?', options: ['Artikl bilan', 'Artiklsiz', 'Faqat ko\'plikda', 'Umuman ishlatilmaydi'], correct: 1, explanation: 'Me patri, so soru — artiklsiz.' },
          { id: 4, text: '"Mening kitobim" (libbru, oddiy ot) — to\'g\'ri shakli?', options: ['me libbru', 'u me libbru', 'libbru me', 'u libbru'], correct: 1, explanation: 'Oddiy otlarda artikl saqlanadi: u me libbru.' },
          { id: 5, text: '"Bizning" egalik olmoshi (erkak birlik)?', options: ['nostru', 'nostra', 'vostru', 'so'], correct: 0, explanation: 'Nostru — bizning (erkak).' },
          { id: 6, text: '"Sizlarning uyingiz" (vostru + casa, ayol) — to\'g\'ri shakli?', options: ['vostru casa', 'vostra casa', 'u vostru casa', 'vostri casa'], correct: 1, explanation: 'Casa ayol jinsi: vostra casa.' },
          { id: 7, text: '"So" egalik olmoshi nechta ma\'noni anglatishi mumkin?', options: ["Faqat 'uning'", "'Uning' va 'ularning'", "Faqat 'ularning'", 'Hech biri'], correct: 1, explanation: '"So" ham uning, ham ularning ma\'nosida bo\'lishi mumkin.' },
          { id: 8, text: '"Me frati" iborasining ma\'nosi?', options: ['Mening opam', 'Mening akam/ukam', 'Uning akasi', 'Bizning akamiz'], correct: 1, explanation: 'Me frati — mening akam/ukam.' }
        ],
        scrambled: [
          { id: 1, words: ['patri', 'me', 'travagghia', 'assai'], answer: 'Me patri travagghia assai.', explanation: '"Mening otam ko\'p ishlaydi."' },
          { id: 2, words: ['soru', 'so', 'medicina', 'studia'], answer: 'So soru studia medicina.', explanation: '"Uning opasi tibbiyot o\'qiydi."' },
          { id: 3, words: ['libbru', 'me', 'è', 'novu', 'u'], answer: 'U me libbru è novu.', explanation: '"Mening kitobim yangi."' },
          { id: 4, words: ['casa', 'nostra', 'è', 'granni'], answer: 'Nostra casa è granni.', explanation: '"Bizning uyimiz katta."' },
          { id: 5, words: ['frati', 'to', 'è', 'simpaticu'], answer: 'To frati è simpaticu.', explanation: '"Sening akang yoqimli."' }
        ]
      },
      {
        id: 'scn-present-perfect',
        title: "Passatu Prossimu (o'tgan zamon)",
        icon: '⏳',
        guide: `## Passatu Prossimu — bajarilgan ish

Sitsiliyachada "men qildim / qilganman" kabi ma'nolarni ifodalash uchun eng ko'p ishlatiladigan shakl — **aviri** (yoki harakat fe'llari bilan **essiri**) fe'lining hozirgi zamon shakli + fe'lning **o'tgan zamon sifatdoshi**.

### O'tgan zamon sifatdoshi qanday yasaladi
• **-ARI fe'llar**: manciari → manciatu, parrari → parratu (qo'shimcha **-atu**)
• **-IRI fe'llar**: sèntiri → sentutu, finiri → finutu (qo'shimcha **-utu**)

### Tuslanish (aviri + sifatdosh)
  - **Aju manciatu.** — Men yedim / yeganman.
  - **Hai parratu cu iddu?** — Sen u bilan gaplashdingmi?
  - **Havi già finutu.** — U allaqachon tugatgan.
  - **Avemu travagghiatu tuttu u jornu.** — Biz kun bo'yi ishladik.

*(💡 Harakat/holat fe'llari, **jiri** — bormoq, **viniri** — kelmoq kabi, ko'pincha **essiri** bilan tuziladi: **Sugnu jutu a la scola.** — Men maktabga bordim.)*`,
        questions: [
          { id: 1, text: '"Men yedim" — to\'g\'ri gap?', options: ['Manciu', 'Aju manciatu', 'Sugnu manciatu', 'Manciatu aju'], correct: 1, explanation: 'Aviri hozirgi zamon + sifatdosh.' },
          { id: 2, text: '-ARI fe\'llarning o\'tgan zamon sifatdoshi qanday tugaydi?', options: ['-utu', '-atu', '-itu', '-anu'], correct: 1, explanation: 'Manciari → manciatu.' },
          { id: 3, text: '-IRI fe\'llarning o\'tgan zamon sifatdoshi qanday tugaydi?', options: ['-atu', '-utu', '-anu', '-emu'], correct: 1, explanation: 'Sèntiri → sentutu.' },
          { id: 4, text: '"Sen u bilan gaplashdingmi?" — to\'g\'ri gap?', options: ['Hai parratu cu iddu?', 'Parri cu iddu?', 'Aju parratu cu iddu?', 'Havi parratu cu iddu?'], correct: 0, explanation: 'Tu → hai + parratu.' },
          { id: 5, text: 'Passatu Prossimu qaysi ikki fe\'l yordamida tuziladi?', options: ['essiri va aviri', 'fari va diri', 'putiri va vuliri', 'aviri va vuliri'], correct: 0, explanation: 'Aviri yoki essiri + sifatdosh.' },
          { id: 6, text: 'Harakat fe\'llari (jiri, viniri) odatda qaysi yordamchi fe\'l bilan ishlatiladi?', options: ['aviri', 'essiri', 'fari', 'aviri a'], correct: 1, explanation: 'Sugnu jutu — essiri bilan.' },
          { id: 7, text: '"U allaqachon tugatgan" — to\'g\'ri gap?', options: ['Finisci già', 'Havi già finutu', 'Finutu havi già', 'È già finutu'], correct: 1, explanation: 'Havi (3-shaxs) + finutu.' },
          { id: 8, text: '"Manciatu" so\'zi qaysi fe\'ldan yasalgan?', options: ['manciari', 'manciutu', 'manciri', 'manciu'], correct: 0, explanation: 'Manciari → manciatu.' }
        ],
        scrambled: [
          { id: 1, words: ['manciatu', 'aju'], answer: 'Aju manciatu.', explanation: '"Men yedim."' },
          { id: 2, words: ['iddu', 'cu', 'parratu', 'hai'], answer: 'Hai parratu cu iddu?', explanation: '"Sen u bilan gaplashdingmi?"' },
          { id: 3, words: ['jornu', 'travagghiatu', 'u', 'avemu', 'tuttu'], answer: 'Avemu travagghiatu tuttu u jornu.', explanation: '"Biz kun bo\'yi ishladik."' },
          { id: 4, words: ['scola', 'jutu', 'a', 'la', 'sugnu'], answer: 'Sugnu jutu a la scola.', explanation: '"Men maktabga bordim."' },
          { id: 5, words: ['già', 'finutu', 'havi'], answer: 'Havi già finutu.', explanation: '"U allaqachon tugatgan."' }
        ]
      }
    ]
  }
};
