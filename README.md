# VOC — So'z Boyligi, Grammatika va IELTS Mashqlari Platformasi

VOC — ingliz tilini o'rganuvchilar uchun to'liq huquqli ta'lim platformasi: shaxsiylashtirilgan takrorlash algoritmi asosida so'z boyligini oshirish, grammatikani mashq qilish va IELTS imtihoniga tayyorlanish uchun mo'ljallangan. React + Firebase asosida qurilgan, Progressive Web App sifatida ishlaydi va Android uchun native ilova (Capacitor) ko'rinishida ham mavjud.

**Joriy foydalanish ko'rsatkichlari:** 40+ faol foydalanuvchi, 2 600+ o'rganilgan so'z.

---

## 🧠 Nima uchun VOC boshqacha?

Aksariyat lug'at ilovalari SM-2 kabi qattiq belgilangan intervalli algoritmlardan foydalanadi. VOC o'zining **Individual Memory Dynamics Engine** (`src/utils/memoryEngine.js`) nomli xotira modelidan foydalanadi:

```
P(t) = e^(−t / S)
```

Bu yerda `P(t)` — `t` kun o'tgandan keyin so'zni eslab qolish ehtimoli, `S` esa har bir foydalanuvchi va har bir so'z uchun individual ravishda hisoblanadigan "xotira barqarorligi" (stability). Model quyidagilarni hisobga oladi:

- Javob berish tezligi (tez javob — yuqori ishonch)
- Faol (typing) va passiv (o'zini baholash) takrorlash o'rtasidagi farq — testing effect
- Tungi uyqudan keyingi konsolidatsiya bonusi
- Har bir semantik klaster (so'z guruhi) bo'yicha foydalanuvchiga moslashtirilgan o'z-o'zini kalibrlash

Bu tizim `src/experiment/` papkasidagi **Xotira Laboratoriyasi (Memory Lab)** orqali sinovdan o'tkazilgan va endi butun ilova bo'ylab standart algoritm sifatida ishlatiladi.

---

## ✨ Asosiy imkoniyatlar

### 📚 So'z boyligi
- Shaxsiy so'z to'plamlari (packs) yaratish, tahrirlash va boshqarish
- Marketdan tayyor to'plamlarni (Irregular Verbs, Phrasal Verbs va h.k.) bir bosishda o'rnatish, keyinchalik yangilanishlarini olish
- 7 xil mashq rejimi: Aqlli kartochkalar, Imlo mashqi, Juftlikni topish, Test, Talaffuz (Speech-to-Text), Jumla tuzish, Fe'llar trenajyori
- Xato qilingan so'zlarni avtomatik aniqlash ("qiyin so'zlar" — leech words) va ularga alohida e'tibor berish

### 📖 Grammatika moduli
- 34 ta mavzu (Boshlang'ich: 22, O'rta daraja: 12), har biri nazariy qo'llanma bilan
- Har bir mavzu uchun 6 xil mashq turi: ko'p tanlovli, bo'shliq to'ldirish, gap yig'ish, xato topish, transformatsiya, muloqot
- To'liq IELTS-uslubidagi grammatika testlari, real vaqt taymeri va batafsil natija tahlili bilan

### 🧬 Xotira Laboratoriyasi (tadqiqot moduli)
- Yuqoridagi individual xotira modelini vizual tarzda kuzatish: unutish egri chizig'i, ishonchlilik darajasi, chalkashtiriladigan so'z juftliklari (confusion pairs)
- Levenshtein masofasi asosida matn o'xshashligini hisoblash (`src/experiment/textSimilarity.js`)

### 🏆 Gamifikatsiya va statistika
- Kunlik seriya (streak) kuzatuvi, faollik xaritasi (heatmap)
- So'z, o'zlashtirish va seriya bo'yicha yutuqlar (achievements)
- Batafsil statistika: umumiy/faol/yangi so'zlar, o'rtacha o'zlashtirish darajasi

### 🛠 Boshqa
- Firebase Authentication (email/parol va Google orqali kirish)
- Admin panel (`/admin`) — foydalanuvchilar faolligi va grammatika testlarini qo'lda baholash uchun
- PWA: offline ishlash, "Ilovaga o'rnatish", brauzer orqali kunlik mashq eslatmalari
- Android uchun native ilova (Capacitor orqali)

---

## 🏗 Texnologiyalar

| Qatlam | Texnologiya |
|---|---|
| Frontend | React 19, React Router 7, Vite 8 |
| Stil | Tailwind CSS 4, Framer Motion (animatsiyalar) |
| Backend / Ma'lumotlar bazasi | Firebase (Realtime Database, Auth) |
| Mobil | Capacitor (Android) |
| Test | Vitest |
| Sifat nazorati | ESLint (React Hooks qoidalari bilan) |
| Til | JavaScript (JSX), TypeScript (kirish nuqtalari uchun) |

---

## 📂 Loyiha tuzilishi

```
src/
├── components/       # Qayta ishlatiladigan UI komponentlari (Auth, Practice, Words, Layout ...)
├── contexts/         # Global holat: AuthContext, PacksContext, ThemeContext
├── data/             # Statik ma'lumotlar: grammatika, market to'plamlari, IELTS testlari
├── experiment/        # Xotira Laboratoriyasi — tadqiqot moduli
├── hooks/            # Firebase bilan ishlaydigan custom hook'lar (useWords, usePacks, useStreak ...)
├── pages/            # Yo'nalishlarga bog'langan sahifalar (route-level components)
└── utils/            # Sof mantiq: memoryEngine, spacedRepetition, achievements ...
```

---

## 🚀 Ishga tushirish

```bash
npm install        # bog'liqliklarni o'rnatish
npm run dev         # development serverni ishga tushirish
npm run build       # production uchun build (tsc + vite build)
npm run preview     # build natijasini lokal ko'rish
```

### Test va sifat nazorati

```bash
npm test            # Vitest orqali unit testlarni ishga tushirish
npm run test:watch  # testlarni watch rejimida ishga tushirish
npm run lint        # ESLint orqali kod sifatini tekshirish
```

Sof mantiqqa ega modullar (`src/utils/*`, `src/experiment/textSimilarity.js`) — xotira algoritmi, spaced repetition, market sinxronizatsiyasi, yutuqlar — unit testlar bilan qoplangan.

### Firebase konfiguratsiyasi

Loyiha Firebase Realtime Database va Authentication'dan foydalanadi. `src/firebase.js` faylida o'z Firebase loyihangiz konfiguratsiyasini ko'rsating. Xavfsizlik qoidalari `database.rules.json` va `firestore.rules` fayllarida — har bir foydalanuvchi faqat o'zining ma'lumotlariga kira oladi.

---

## 📱 Deploy

- **Web:** Vercel (`vercel.json` — SPA rewrite va cache sozlamalari tayyor)
- **Ma'lumotlar bazasi:** Firebase Realtime Database (`firebase.json` orqali xavfsizlik qoidalari deploy qilinadi)
- **Android:** `android/` papkasida Capacitor loyihasi — `npx cap sync android` va Android Studio orqali build qilinadi
