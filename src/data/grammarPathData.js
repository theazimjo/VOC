// Duolingo-style sequential "0 dan" grammar path — proper 3-level hierarchy:
//
//   Bo'lim (Section)  — a broad grammar topic, e.g. "Shaxs olmoshlari"
//     └─ Dars (Lesson) — one small isolated piece of that topic
//          └─ Unit (Step) — ONE tiny rule taught + immediately practiced
//                            (never dumps the whole rule at once — each unit
//                            introduces a sliver, then drills only that sliver)
//     └─ Review          — after ALL lessons in a section are passed, a
//                           mixed review quiz drawing across the whole
//                           section unlocks the next section.
//
// A lesson's units never reference another lesson's grammar point, and a
// unit's exercises never reference another unit's point — strict, gradual,
// one-thing-at-a-time progression, exactly mirroring how Duolingo paces a
// real lesson (short "tip" → 2-3 drills on just that tip → next tip...).

export const grammarPathSections = [
  {
    id: 'sec-pronouns',
    order: 1,
    title: 'Shaxs olmoshlari',
    titleRu: 'Личные местоимения',
    icon: '🙋',
    lessons: [
      {
        id: 'sec-pronouns-l1',
        order: 1,
        title: '"I" — men',
        titleRu: '"I" — я',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: '"I" — bu "men" degan ma\'noni bildiradi. O\'zingiz haqingizda gapirganda ishlatiladi.',
              ruleRu: '"I" означает "я". Используется, когда вы говорите о себе.',
              example: 'I am a student. (Men talabaman.)',
              exampleRu: 'I am a student. (Я студент.)',
            },
            exercises: [
              { text: '"Men" so\'zini ingliz tilida qanday aytamiz?', options: ['I', 'You', 'He', 'It'], correct: 0, explanation: '"Men" = I.' },
              { text: 'Agar o\'zingiz haqingizda gapirsangiz, qaysi olmoshni ishlatasiz?', options: ['I', 'She', 'We', 'They'], correct: 0, explanation: 'O\'zingiz haqingizda gapirganda "I" ishlatiladi.' },
            ],
          },
          {
            teach: {
              rule: '"I" doim "am" bilan birga keladi.',
              ruleRu: '"I" всегда используется с глаголом "am".',
              example: 'I am happy. (Men xursandman.)',
              exampleRu: 'I am happy. (Я счастлив.)',
            },
            exercises: [
              { text: 'I ___ a teacher.', options: ['am', 'is', 'are'], correct: 0, explanation: '"I" faqat "am" bilan keladi.' },
              { text: '___ am ready.', options: ['I', 'He', 'We'], correct: 0, explanation: '"am" faqat "I" bilan ishlatiladi.' },
            ],
          },
          {
            teach: {
              rule: '"I" bilan oddiy fe\'l hech qanday qo\'shimchasiz (-s siz) keladi.',
              ruleRu: 'С местоимением "I" обычный глагол идет без окончания -s.',
              example: 'I like pizza. (Men pitssani yaxshi ko\'raman.)',
              exampleRu: 'I like pizza. (Я люблю пиццу.)',
            },
            exercises: [
              { text: 'I ___ pizza.', options: ['like', 'likes', 'liking'], correct: 0, explanation: '"I" bilan fe\'lga -s qo\'shilmaydi: like.' },
              { text: 'Choose the correct sentence:', options: ['I likes music.', 'I like music.', 'I liking music.'], correct: 1, explanation: '"I" + like (qo\'shimchasiz).' },
            ],
          },
          {
            teach: {
              rule: "Inkorda: I + don't. Savolda: Do I ...?",
              ruleRu: "В отрицании: I + don't. В вопросе: Do I ...?",
              example: "I don't like coffee. Do I know you?",
              exampleRu: "I don't like coffee. Do I know you?",
            },
            exercises: [
              { text: 'I ___ not like coffee.', options: ['am', 'do', 'does'], correct: 1, explanation: '"I" inkorida: do not (don\'t).' },
              { text: '___ I know you?', options: ['Am', 'Do', 'Does'], correct: 1, explanation: '"I" savolida: Do I...?' },
            ],
          },
          {
            teach: {
              rule: "\"I\" haqida bilganlaringizni birlashtiramiz: I + am / fe'l (-s siz) / don't / Do I?",
              ruleRu: 'Обобщим всё о "I": I + am / глагол (без -s) / don\'t / Do I?',
              example: "I am busy, but I don't like waiting.",
              exampleRu: "I am busy, but I don't like waiting.",
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I is a doctor.', 'I am a doctor.', 'I are a doctor.'], correct: 1, explanation: '"I" + am.' },
              { text: 'Choose the correct sentence:', options: ["I doesn't like tea.", "I don't like tea.", 'I not like tea.'], correct: 1, explanation: '"I" inkorida: don\'t.' },
              { text: 'Choose the correct question:', options: ['Do I look tired?', 'Does I look tired?', 'Am I look tired?'], correct: 0, explanation: '"I" savolida: Do I...?' },
            ],
          },
        ],
      },
      {
        id: 'sec-pronouns-l2',
        order: 2,
        title: '"You" — sen / siz',
        titleRu: '"You" — ты / вы',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: '"You" — "sen" yoki "siz" degan ma\'noni bildiradi. Suhbatdoshingizga murojaat qilganda ishlatiladi.',
              ruleRu: '"You" означает "ты" или "вы". Используется при обращении к собеседнику.',
              example: 'You are my friend. (Siz mening do\'stimisiz.)',
              exampleRu: 'You are my friend. (Ты мой друг.)',
            },
            exercises: [
              { text: '"Sen" / "Siz" so\'zini ingliz tilida qanday aytamiz?', options: ['I', 'You', 'He', 'We'], correct: 1, explanation: '"Sen/Siz" = You.' },
              { text: 'Suhbatdoshingizga to\'g\'ridan-to\'g\'ri murojaat qilsangiz, qaysi olmoshni ishlatasiz?', options: ['I', 'You', 'She', 'They'], correct: 1, explanation: 'Suhbatdoshga murojaatda "You" ishlatiladi.' },
            ],
          },
          {
            teach: {
              rule: '"You" doim "are" bilan birga keladi.',
              ruleRu: '"You" всегда используется с глаголом "are".',
              example: 'You are smart. (Siz aqllisiz.)',
              exampleRu: 'You are smart. (Ты умный.)',
            },
            exercises: [
              { text: 'You ___ my best friend.', options: ['am', 'is', 'are'], correct: 2, explanation: '"You" + are.' },
              { text: '___ are late.', options: ['You', 'He', 'I'], correct: 0, explanation: '"are" — "You" bilan mos keladi.' },
            ],
          },
          {
            teach: {
              rule: '"You" bilan oddiy fe\'l -s siz keladi.',
              ruleRu: 'С местоимением "You" обычный глагол идет без окончания -s.',
              example: 'You like pizza. (Siz pitssani yaxshi ko\'rasiz.)',
              exampleRu: 'You like pizza. (Ты любишь пиццу.)',
            },
            exercises: [
              { text: 'You ___ pizza.', options: ['like', 'likes', 'liking'], correct: 0, explanation: '"You" bilan fe\'lga -s qo\'shilmaydi.' },
              { text: 'Choose the correct sentence:', options: ['You likes music.', 'You like music.'], correct: 1, explanation: '"You" + like (qo\'shimchasiz).' },
            ],
          },
          {
            teach: {
              rule: "Inkorda: You + don't. Savolda: Do you ...?",
              ruleRu: "В отрицании: You + don't. В вопросе: Do you ...?",
              example: "You don't like coffee. Do you know me?",
              exampleRu: "You don't like coffee. Do you know me?",
            },
            exercises: [
              { text: 'You ___ not like coffee.', options: ['am', 'do', 'does'], correct: 1, explanation: '"You" inkorida: do not (don\'t).' },
              { text: '___ you know me?', options: ['Am', 'Do', 'Does'], correct: 1, explanation: '"You" savolida: Do you...?' },
            ],
          },
          {
            teach: {
              rule: "\"You\" haqida bilganlaringizni birlashtiramiz: You + are / fe'l (-s siz) / don't / Do you?",
              ruleRu: 'Обобщим всё о "You": You + are / глагол (без -s) / don\'t / Do you?',
              example: "You are kind, but you don't listen.",
              exampleRu: "You are kind, but you don't listen.",
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['You is my friend.', 'You are my friend.'], correct: 1, explanation: '"You" + are.' },
              { text: 'Choose the correct sentence:', options: ["You don't like tea.", "You doesn't like tea."], correct: 0, explanation: '"You" inkorida: don\'t.' },
              { text: 'Choose the correct question:', options: ['Do you look tired?', 'Does you look tired?'], correct: 0, explanation: '"You" savolida: Do you...?' },
            ],
          },
        ],
      },
      {
        id: 'sec-pronouns-l3',
        order: 3,
        title: '"He" — u (erkak)',
        titleRu: '"He" — он (мужчина)',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: '"He" — erkak kishi haqida gapirganda ishlatiladi ("u").',
              ruleRu: '"He" означает "он" (для мужчин и мальчиков).',
              example: 'He is my brother. (U mening akam/ukam.)',
              exampleRu: 'He is my brother. (Он мой брат.)',
            },
            exercises: [
              { text: '"U" (erkak) so\'zini ingliz tilida qanday aytamiz?', options: ['She', 'He', 'It', 'They'], correct: 1, explanation: 'Erkak kishi uchun: He.' },
              { text: 'Tom haqida gapirsangiz (Tom — erkak ism), qaysi olmoshni ishlatasiz?', options: ['She', 'He', 'It'], correct: 1, explanation: 'Tom — erkak ism, shuning uchun He.' },
            ],
          },
          {
            teach: {
              rule: '"He" doim "is" bilan birga keladi.',
              ruleRu: '"He" всегда используется с глаголом "is".',
              example: 'He is tall. (U baland bo\'yli.)',
              exampleRu: 'He is tall. (Он высокий.)',
            },
            exercises: [
              { text: 'He ___ a doctor.', options: ['am', 'is', 'are'], correct: 1, explanation: '"He" + is.' },
              { text: '___ is my father.', options: ['He', 'You', 'We'], correct: 0, explanation: '"is" — "He" bilan mos keladi.' },
            ],
          },
          {
            teach: {
              rule: '"He" bilan fe\'lga -s qo\'shiladi!',
              ruleRu: 'С местоимением "He" к глаголу добавляется окончание -s!',
              example: 'He likes pizza. (U pitssani yaxshi ko\'radi.)',
              exampleRu: 'He likes pizza. (Он любит пиццу.)',
            },
            exercises: [
              { text: 'He ___ pizza.', options: ['like', 'likes', 'liking'], correct: 1, explanation: '"He/She/It" bilan fe\'lga -s qo\'shiladi.' },
              { text: 'Choose the correct sentence:', options: ['He like music.', 'He likes music.'], correct: 1, explanation: '"He" + likes (-s bilan).' },
            ],
          },
          {
            teach: {
              rule: "Inkorda: He + doesn't. Savolda: Does he...? (fe'l -s OLMAYDI!)",
              ruleRu: "В отрицании: He + doesn't. В вопросе: Does he...? (глагол БЕЗ -s!)",
              example: "He doesn't like coffee. Does he know you?",
              exampleRu: "He doesn't like coffee. Does he know you?",
            },
            exercises: [
              { text: 'He ___ not like coffee.', options: ["don't", "doesn't", "isn't"], correct: 1, explanation: '"He" inkorida: doesn\'t.' },
              { text: '___ he know you?', options: ['Do', 'Does', 'Is'], correct: 1, explanation: '"He" savolida: Does he...?' },
              { text: "He doesn't ___ coffee.", options: ['like', 'likes'], correct: 0, explanation: "\"doesn't\" dan keyin fe'l -s olmaydi: like." },
            ],
          },
          {
            teach: {
              rule: "\"He\" haqida bilganlaringizni birlashtiramiz: He + is / fe'l+s / doesn't / Does he?",
              ruleRu: 'Обобщим всё о "He": He + is / глагол+s / doesn\'t / Does he?',
              example: "He is busy, but he doesn't like waiting.",
              exampleRu: "He is busy, but he doesn't like waiting.",
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['He is a teacher.', 'He are a teacher.'], correct: 0, explanation: '"He" + is.' },
              { text: 'Choose the correct sentence:', options: ["He doesn't like tea.", "He don't like tea."], correct: 0, explanation: '"He" inkorida: doesn\'t.' },
              { text: 'Choose the correct question:', options: ['Does he look tired?', 'Do he look tired?'], correct: 0, explanation: '"He" savolida: Does he...?' },
            ],
          },
        ],
      },
      {
        id: 'sec-pronouns-l4',
        order: 4,
        title: '"She" — u (ayol)',
        titleRu: '"She" — она (женщина)',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: '"She" — ayol kishi haqida gapirganda ishlatiladi ("u").',
              ruleRu: '"She" означает "она" (для женщин и девочек).',
              example: 'She is my sister. (U mening opam/singlim.)',
              exampleRu: 'She is my sister. (Она моя сестра.)',
            },
            exercises: [
              { text: '"U" (ayol) so\'zini ingliz tilida qanday aytamiz?', options: ['She', 'He', 'It', 'They'], correct: 0, explanation: 'Ayol kishi uchun: She.' },
              { text: 'Anna haqida gapirsangiz (Anna — ayol ism), qaysi olmoshni ishlatasiz?', options: ['She', 'He', 'It'], correct: 0, explanation: 'Anna — ayol ism, shuning uchun She.' },
            ],
          },
          {
            teach: {
              rule: '"She" doim "is" bilan birga keladi.',
              ruleRu: '"She" всегда используется с глаголом "is".',
              example: 'She is smart. (U aqlli.)',
              exampleRu: 'She is smart. (Она умная.)',
            },
            exercises: [
              { text: 'She ___ a nurse.', options: ['am', 'is', 'are'], correct: 1, explanation: '"She" + is.' },
              { text: '___ is my mother.', options: ['She', 'You', 'We'], correct: 0, explanation: '"is" — "She" bilan mos keladi.' },
            ],
          },
          {
            teach: {
              rule: '"She" bilan fe\'lga -s qo\'shiladi.',
              ruleRu: 'С местоимением "She" к глаголу добавляется окончание -s.',
              example: 'She likes pizza. (U pitssani yaxshi ko\'radi.)',
              exampleRu: 'She likes pizza. (Она любит пиццу.)',
            },
            exercises: [
              { text: 'She ___ pizza.', options: ['like', 'likes', 'liking'], correct: 1, explanation: '"She" bilan fe\'lga -s qo\'shiladi.' },
              { text: 'Choose the correct sentence:', options: ['She like music.', 'She likes music.'], correct: 1, explanation: '"She" + likes (-s bilan).' },
            ],
          },
          {
            teach: {
              rule: "Inkorda: She + doesn't. Savolda: Does she...?",
              ruleRu: "В отрицании: She + doesn't. В вопросе: Does she...?",
              example: "She doesn't like coffee. Does she know you?",
              exampleRu: "She doesn't like coffee. Does she know you?",
            },
            exercises: [
              { text: 'She ___ not like coffee.', options: ["don't", "doesn't", "isn't"], correct: 1, explanation: '"She" inkorida: doesn\'t.' },
              { text: '___ she know you?', options: ['Do', 'Does', 'Is'], correct: 1, explanation: '"She" savolida: Does she...?' },
              { text: "She doesn't ___ coffee.", options: ['like', 'likes'], correct: 0, explanation: "\"doesn't\" dan keyin fe'l -s olmaydi: like." },
            ],
          },
          {
            teach: {
              rule: "\"She\" haqida bilganlaringizni birlashtiramiz: She + is / fe'l+s / doesn't / Does she?",
              ruleRu: 'Обобщим всё о "She": She + is / глагол+s / doesn\'t / Does she?',
              example: "She is busy, but she doesn't like waiting.",
              exampleRu: "She is busy, but she doesn't like waiting.",
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['She is a teacher.', 'She are a teacher.'], correct: 0, explanation: '"She" + is.' },
              { text: 'Choose the correct sentence:', options: ["She doesn't like tea.", "She don't like tea."], correct: 0, explanation: '"She" inkorida: doesn\'t.' },
              { text: 'Choose the correct question:', options: ['Does she look tired?', 'Do she look tired?'], correct: 0, explanation: '"She" savolida: Does she...?' },
            ],
          },
        ],
      },
      {
        id: 'sec-pronouns-l5',
        order: 5,
        title: '"It" — u (narsa/hayvon)',
        titleRu: '"It" — оно (предмет/животное)',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: '"It" — narsa yoki hayvon haqida gapirganda ishlatiladi ("u").',
              ruleRu: '"It" используется для предметов и животных ("оно/он/она").',
              example: 'It is a cat. (Bu mushuk.)',
              exampleRu: 'It is a cat. (Это кошка.)',
            },
            exercises: [
              { text: '"U" (narsa/hayvon) so\'zini ingliz tilida qanday aytamiz?', options: ['She', 'He', 'It', 'They'], correct: 2, explanation: 'Narsa/hayvon uchun: It.' },
              { text: 'Bir kitob haqida gapirsangiz, qaysi olmoshni ishlatasiz?', options: ['She', 'He', 'It'], correct: 2, explanation: 'Kitob — jonsiz narsa, shuning uchun It.' },
            ],
          },
          {
            teach: {
              rule: '"It" doim "is" bilan birga keladi.',
              ruleRu: '"It" всегда используется с глаголом "is".',
              example: 'It is small. (U kichkina.)',
              exampleRu: 'It is small. (Оно маленькое.)',
            },
            exercises: [
              { text: 'It ___ cold today.', options: ['am', 'is', 'are'], correct: 1, explanation: '"It" + is.' },
              { text: '___ is my phone.', options: ['It', 'You', 'We'], correct: 0, explanation: '"is" — "It" bilan mos keladi.' },
            ],
          },
          {
            teach: {
              rule: '"It" bilan fe\'lga -s qo\'shiladi.',
              ruleRu: 'С местоимением "It" к глаголу добавляется окончание -s.',
              example: 'The cat likes milk. = It likes milk.',
              exampleRu: 'The cat likes milk. = It likes milk.',
            },
            exercises: [
              { text: 'It ___ milk. (about a cat)', options: ['like', 'likes', 'liking'], correct: 1, explanation: '"It" bilan fe\'lga -s qo\'shiladi.' },
              { text: 'Choose the correct sentence:', options: ['It bark loudly.', 'It barks loudly.'], correct: 1, explanation: '"It" + barks (-s bilan).' },
            ],
          },
          {
            teach: {
              rule: "Inkorda: It + doesn't. Savolda: Does it...?",
              ruleRu: "В отрицании: It + doesn't. В вопросе: Does it...?",
              example: "It doesn't work. Does it need water?",
              exampleRu: "It doesn't work. Does it need water?",
            },
            exercises: [
              { text: 'It ___ not work.', options: ["don't", "doesn't", "isn't"], correct: 1, explanation: '"It" inkorida: doesn\'t.' },
              { text: '___ it need water?', options: ['Do', 'Does', 'Is'], correct: 1, explanation: '"It" savolida: Does it...?' },
              { text: "It doesn't ___ well.", options: ['work', 'works'], correct: 0, explanation: "\"doesn't\" dan keyin fe'l -s olmaydi: work." },
            ],
          },
          {
            teach: {
              rule: "\"It\" haqida bilganlaringizni birlashtiramiz: It + is / fe'l+s / doesn't / Does it?",
              ruleRu: 'Обобщим всё о "It": It + is / глагол+s / doesn\'t / Does it?',
              example: "It is broken, and it doesn't work.",
              exampleRu: "It is broken, and it doesn't work.",
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['It is my bag.', 'It are my bag.'], correct: 0, explanation: '"It" + is.' },
              { text: 'Choose the correct sentence:', options: ["It doesn't work.", "It don't work."], correct: 0, explanation: '"It" inkorida: doesn\'t.' },
              { text: 'Choose the correct question:', options: ['Does it work?', 'Do it work?'], correct: 0, explanation: '"It" savolida: Does it...?' },
            ],
          },
        ],
      },
      {
        id: 'sec-pronouns-l6',
        order: 6,
        title: '"We" — biz',
        titleRu: '"We" — мы',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: '"We" — o\'zingiz va boshqalar haqida birga gapirganda ishlatiladi ("biz").',
              ruleRu: '"We" означает "мы" (вы и другие люди вместе).',
              example: 'We are friends. (Biz do\'stlarmiz.)',
              exampleRu: 'We are friends. (Мы друзья.)',
            },
            exercises: [
              { text: '"Biz" so\'zini ingliz tilida qanday aytamiz?', options: ['I', 'You', 'We', 'They'], correct: 2, explanation: '"Biz" = We.' },
              { text: 'O\'zingiz va sinfdoshlaringiz haqida gapirsangiz, qaysi olmoshni ishlatasiz?', options: ['I', 'We', 'They'], correct: 1, explanation: 'O\'zingiz shu guruh ichida bo\'lsangiz: We.' },
            ],
          },
          {
            teach: {
              rule: '"We" doim "are" bilan birga keladi.',
              ruleRu: '"We" всегда используется с глаголом "are".',
              example: 'We are ready. (Biz tayyormiz.)',
              exampleRu: 'We are ready. (Мы готовы.)',
            },
            exercises: [
              { text: 'We ___ happy.', options: ['am', 'is', 'are'], correct: 2, explanation: '"We" + are.' },
              { text: '___ are classmates.', options: ['We', 'He', 'I'], correct: 0, explanation: '"are" — "We" bilan mos keladi.' },
            ],
          },
          {
            teach: {
              rule: '"We" bilan oddiy fe\'l -s siz keladi.',
              ruleRu: 'С местоимением "We" обычный глагол идет без окончания -s.',
              example: 'We like pizza. (Biz pitssani yaxshi ko\'ramiz.)',
              exampleRu: 'We like pizza. (Мы любим пиццу.)',
            },
            exercises: [
              { text: 'We ___ pizza.', options: ['like', 'likes', 'liking'], correct: 0, explanation: '"We" bilan fe\'lga -s qo\'shilmaydi.' },
              { text: 'Choose the correct sentence:', options: ['We likes music.', 'We like music.'], correct: 1, explanation: '"We" + like (qo\'shimchasiz).' },
            ],
          },
          {
            teach: {
              rule: "Inkorda: We + don't. Savolda: Do we ...?",
              ruleRu: "В отрицании: We + don't. В вопросе: Do we ...?",
              example: "We don't know. Do we have time?",
              exampleRu: "We don't know. Do we have time?",
            },
            exercises: [
              { text: 'We ___ not know.', options: ['am', 'do', 'does'], correct: 1, explanation: '"We" inkorida: do not (don\'t).' },
              { text: '___ we have time?', options: ['Am', 'Do', 'Does'], correct: 1, explanation: '"We" savolida: Do we...?' },
            ],
          },
          {
            teach: {
              rule: "\"We\" haqida bilganlaringizni birlashtiramiz: We + are / fe'l (-s siz) / don't / Do we?",
              ruleRu: 'Обобщим всё о "We": We + are / глагол (без -s) / don\'t / Do we?',
              example: "We are tired, but we don't want to stop.",
              exampleRu: "We are tired, but we don't want to stop.",
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['We is friends.', 'We are friends.'], correct: 1, explanation: '"We" + are.' },
              { text: 'Choose the correct sentence:', options: ["We don't like tea.", "We doesn't like tea."], correct: 0, explanation: '"We" inkorida: don\'t.' },
              { text: 'Choose the correct question:', options: ['Do we look tired?', 'Does we look tired?'], correct: 0, explanation: '"We" savolida: Do we...?' },
            ],
          },
        ],
      },
      {
        id: 'sec-pronouns-l7',
        order: 7,
        title: '"They" — ular',
        titleRu: '"They" — они',
        icon: '7️⃣',
        units: [
          {
            teach: {
              rule: '"They" — ikkitadan ortiq kishi/narsa haqida (o\'zingiz ular ichida bo\'lmasangiz) gapirganda ishlatiladi ("ular").',
              ruleRu: '"They" означает "они" (для двух и более людей или предметов).',
              example: 'They are students. (Ular talabalar.)',
              exampleRu: 'They are students. (Они студенты.)',
            },
            exercises: [
              { text: '"Ular" so\'zini ingliz tilida qanday aytamiz?', options: ['We', 'You', 'They', 'It'], correct: 2, explanation: '"Ular" = They.' },
              { text: 'Tom va Ali haqida gapirsangiz, qaysi olmoshni ishlatasiz?', options: ['We', 'They', 'It'], correct: 1, explanation: 'Ikkalasi ham siz emassiz: They.' },
            ],
          },
          {
            teach: {
              rule: '"They" doim "are" bilan birga keladi.',
              ruleRu: '"They" всегда используется с глаголом "are".',
              example: 'They are teachers. (Ular o\'qituvchilar.)',
              exampleRu: 'They are teachers. (Они учителя.)',
            },
            exercises: [
              { text: 'They ___ at school.', options: ['am', 'is', 'are'], correct: 2, explanation: '"They" + are.' },
              { text: '___ are my neighbors.', options: ['They', 'He', 'I'], correct: 0, explanation: '"are" — "They" bilan mos keladi.' },
            ],
          },
          {
            teach: {
              rule: '"They" bilan oddiy fe\'l -s siz keladi.',
              ruleRu: 'С местоимением "They" обычный глагол идет без окончания -s.',
              example: 'They like pizza. (Ular pitssani yaxshi ko\'radi.)',
              exampleRu: 'They like pizza. (Они любят пиццу.)',
            },
            exercises: [
              { text: 'They ___ pizza.', options: ['like', 'likes', 'liking'], correct: 0, explanation: '"They" bilan fe\'lga -s qo\'shilmaydi.' },
              { text: 'Choose the correct sentence:', options: ['They likes music.', 'They like music.'], correct: 1, explanation: '"They" + like (qo\'shimchasiz).' },
            ],
          },
          {
            teach: {
              rule: "Inkorda: They + don't. Savolda: Do they ...?",
              ruleRu: "В отрицании: They + don't. В вопросе: Do they ...?",
              example: "They don't live here. Do they know you?",
              exampleRu: "They don't live here. Do they know you?",
            },
            exercises: [
              { text: 'They ___ not live here.', options: ['am', 'do', 'does'], correct: 1, explanation: '"They" inkorida: do not (don\'t).' },
              { text: '___ they know you?', options: ['Am', 'Do', 'Does'], correct: 1, explanation: '"They" savolida: Do they...?' },
            ],
          },
          {
            teach: {
              rule: "\"They\" haqida bilganlaringizni birlashtiramiz: They + are / fe'l (-s siz) / don't / Do they?",
              ruleRu: 'Обобщим всё о "They": They + are / глагол (без -s) / don\'t / Do they?',
              example: "They are busy, but they don't complain.",
              exampleRu: "They are busy, but they don't complain.",
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['They is students.', 'They are students.'], correct: 1, explanation: '"They" + are.' },
              { text: 'Choose the correct sentence:', options: ["They don't like tea.", "They doesn't like tea."], correct: 0, explanation: '"They" inkorida: don\'t.' },
              { text: 'Choose the correct question:', options: ['Do they look tired?', 'Does they look tired?'], correct: 0, explanation: '"They" savolida: Does they...?' },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Shaxs olmoshlari",
      titleRu: "Тест раздела: Личные местоимения",
      exercises: [
        { text: '"U" (erkak) so\'zini ingliz tilida qanday aytamiz?', options: ['She', 'He', 'It'], correct: 1, explanation: 'Erkak kishi uchun: He.' },
        { text: '"U" (ayol) so\'zini ingliz tilida qanday aytamiz?', options: ['She', 'He', 'It'], correct: 0, explanation: 'Ayol kishi uchun: She.' },
        { text: 'I ___ a student.', options: ['am', 'is', 'are'], correct: 0, explanation: '"I" + am.' },
        { text: 'You ___ my friend.', options: ['am', 'is', 'are'], correct: 2, explanation: '"You" + are.' },
        { text: 'He ___ a doctor.', options: ['am', 'is', 'are'], correct: 1, explanation: '"He" + is.' },
        { text: 'We ___ ready.', options: ['am', 'is', 'are'], correct: 2, explanation: '"We" + are.' },
        { text: 'They ___ students.', options: ['am', 'is', 'are'], correct: 2, explanation: '"They" + are.' },
        { text: 'She ___ pizza.', options: ['like', 'likes'], correct: 1, explanation: '"She" bilan fe\'lga -s qo\'shiladi: likes.' },
        { text: 'It ___ milk.', options: ['like', 'likes'], correct: 1, explanation: '"It" bilan fe\'lga -s qo\'shiladi: likes.' },
        { text: 'They ___ pizza.', options: ['like', 'likes'], correct: 0, explanation: '"They" bilan fe\'lga -s qo\'shilmaydi: like.' },
        { text: 'He ___ not like coffee.', options: ["don't", "doesn't"], correct: 1, explanation: '"He" inkorida: doesn\'t.' },
        { text: 'They ___ not like coffee.', options: ["don't", "doesn't"], correct: 0, explanation: '"They" inkorida: don\'t.' },
        { text: '___ she know you?', options: ['Do', 'Does'], correct: 1, explanation: '"She" savolida: Does.' },
        { text: '___ we have time?', options: ['Do', 'Does'], correct: 0, explanation: '"We" savolida: Do.' },
        { text: 'Choose the correct sentence:', options: ["It don't work.", "It doesn't work."], correct: 1, explanation: '"It" inkorida: doesn\'t.' },
      ],
    },
  },
  {
    id: 'sec-tobe',
    order: 2,
    title: "'To be' fe'li",
    titleRu: 'Глагол "to be"',
    icon: '✅',
    lessons: [
      {
        id: 'sec-tobe-l1',
        order: 1,
        title: 'Tasdiq shakllar',
        titleRu: 'Утвердительные формы',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: '"To be" fe\'lining uchta shakli bor: am, is, are. Ular ega (subject)ga qarab tanlanadi.',
              ruleRu: 'У глагола "to be" три формы: am, is, are. Они выбираются в зависимости от подлежащего.',
              example: 'I am, you are, he is. (Men -man, sen -san, u -dir.)',
              exampleRu: 'I am, you are, he is. (Я есть, ты есть, он есть.)',
            },
            exercises: [
              { text: 'I ___ a student.', options: ['am', 'is', 'are'], correct: 0, explanation: '"I" + am.' },
              { text: 'They ___ teachers.', options: ['am', 'is', 'are'], correct: 2, explanation: '"They" + are.' },
            ],
          },
          {
            teach: {
              rule: '"He", "she", "it" — barchasi "is" bilan keladi.',
              ruleRu: '"He", "she", "it" — все используются с "is".',
              example: 'He is tall. She is tall. It is small.',
              exampleRu: 'He is tall. She is tall. It is small.',
            },
            exercises: [
              { text: 'The cat ___ small.', options: ['am', 'is', 'are'], correct: 1, explanation: '"The cat" = it = is.' },
              { text: 'My brother ___ busy.', options: ['am', 'is', 'are'], correct: 1, explanation: '"My brother" = he = is.' },
            ],
          },
          {
            teach: {
              rule: '"You", "we", "they" — barchasi "are" bilan keladi.',
              ruleRu: '"You", "we", "they" — все используются с "are".',
              example: 'You are kind. We are ready. They are here.',
              exampleRu: 'You are kind. We are ready. They are here.',
            },
            exercises: [
              { text: 'My friends ___ here.', options: ['am', 'is', 'are'], correct: 2, explanation: '"My friends" = they = are.' },
              { text: 'You and I ___ classmates.', options: ['am', 'is', 'are'], correct: 2, explanation: '"You and I" = we = are.' },
            ],
          },
          {
            teach: {
              rule: 'Faqat "I" — "am" bilan keladi.',
              ruleRu: 'Только "I" используется с "am".',
              example: 'I am hungry.',
              exampleRu: 'I am hungry.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I are hungry.', 'I is hungry.', 'I am hungry.'], correct: 2, explanation: '"I" faqat "am" bilan keladi.' },
              { text: 'Which subject uses "am"?', options: ['I', 'You', 'We'], correct: 0, explanation: '"am" faqat "I" bilan ishlatiladi.' },
            ],
          },
          {
            teach: {
              rule: "Barcha shakllarni birlashtiramiz: I am / He-She-It is / You-We-They are.",
              ruleRu: 'Обобщим все формы: I am / He-She-It is / You-We-They are.',
              example: 'I am busy. She is busy. We are busy.',
              exampleRu: 'I am busy. She is busy. We are busy.',
            },
            exercises: [
              { text: 'She ___ my teacher.', options: ['am', 'is', 'are'], correct: 1, explanation: '"She" + is.' },
              { text: 'We ___ friends.', options: ['am', 'is', 'are'], correct: 2, explanation: '"We" + are.' },
              { text: 'I ___ ready.', options: ['am', 'is', 'are'], correct: 0, explanation: '"I" + am.' },
            ],
          },
        ],
      },
      {
        id: 'sec-tobe-l2',
        order: 2,
        title: "Qisqartma shakllar",
        titleRu: 'Сокращённые формы',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: '"I am" — qisqartmasi: I\'m.',
              ruleRu: '"I am" сокращается до "I\'m".',
              example: "I'm tired.",
              exampleRu: "I'm tired.",
            },
            exercises: [
              { text: 'Choose the contraction of "I am":', options: ["I'm", "I's", "I'am"], correct: 0, explanation: '"I am" -> I\'m.' },
              { text: 'Choose the correct sentence:', options: ["I'm happy.", 'Im happy.', "I'am happy."], correct: 0, explanation: 'To\'g\'ri qisqartma: I\'m.' },
            ],
          },
          {
            teach: {
              rule: '"You are" = You\'re, "We are" = We\'re, "They are" = They\'re.',
              ruleRu: '"You are" = You\'re, "We are" = We\'re, "They are" = They\'re.',
              example: "You're welcome. We're ready. They're here.",
              exampleRu: "You're welcome. We're ready. They're here.",
            },
            exercises: [
              { text: 'Choose the contraction of "They are":', options: ["They're", "They's", "Theyr'e"], correct: 0, explanation: '"They are" -> They\'re.' },
              { text: 'Choose the contraction of "We are":', options: ["We're", "We's", "Wer'e"], correct: 0, explanation: '"We are" -> We\'re.' },
            ],
          },
          {
            teach: {
              rule: '"He is" = He\'s, "She is" = She\'s, "It is" = It\'s.',
              ruleRu: '"He is" = He\'s, "She is" = She\'s, "It is" = It\'s.',
              example: "He's tall. She's smart. It's cold.",
              exampleRu: "He's tall. She's smart. It's cold.",
            },
            exercises: [
              { text: 'Choose the contraction of "She is":', options: ["She's", "She'is", "Shes'"], correct: 0, explanation: '"She is" -> She\'s.' },
              { text: 'Choose the contraction of "It is":', options: ["It's", "Its'", "I'ts"], correct: 0, explanation: '"It is" -> It\'s.' },
            ],
          },
          {
            teach: {
              rule: "Qisqa javoblarda qisqartma ishlatilmaydi — to'liq shakl kerak.",
              ruleRu: 'В коротких ответах сокращения не используются — нужна полная форма.',
              example: "Yes, I am. (Yes, I'm emas.)",
              exampleRu: "Yes, I am. (Не Yes, I'm.)",
            },
            exercises: [
              { text: 'Choose the correct short answer:', options: ['Yes, I am.', "Yes, I'm."], correct: 0, explanation: 'Qisqa javobda qisqartma ishlatilmaydi: Yes, I am.' },
              { text: 'Choose the correct sentence:', options: ["She's my sister.", "She is' my sister."], correct: 0, explanation: 'Gap ichida qisqartma to\'g\'ri: She\'s my sister.' },
            ],
          },
          {
            teach: {
              rule: "Barcha qisqartmalarni birlashtiramiz: I'm / You're / He's / She's / It's / We're / They're.",
              ruleRu: 'Обобщим все сокращения: I\'m / You\'re / He\'s / She\'s / It\'s / We\'re / They\'re.',
              example: "He's my friend, and they're my classmates.",
              exampleRu: "He's my friend, and they're my classmates.",
            },
            exercises: [
              { text: 'Choose the contraction of "He is":', options: ["He's", "He'is"], correct: 0, explanation: '"He is" -> He\'s.' },
              { text: 'Choose the contraction of "You are":', options: ["You're", "You'is"], correct: 0, explanation: '"You are" -> You\'re.' },
              { text: 'Choose the correct short answer:', options: ['Yes, they are.', "Yes, they're."], correct: 0, explanation: 'Qisqa javobda qisqartma ishlatilmaydi: Yes, they are.' },
            ],
          },
        ],
      },
      {
        id: 'sec-tobe-l3',
        order: 3,
        title: 'Inkor shakllar',
        titleRu: 'Отрицательные формы',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: 'Inkorda "not" qo\'shiladi: is not, are not, am not.',
              ruleRu: 'В отрицании добавляется "not": is not, are not, am not.',
              example: 'He is not ready.',
              exampleRu: 'He is not ready.',
            },
            exercises: [
              { text: 'She ___ not busy.', options: ['am', 'is', 'are'], correct: 1, explanation: '"She" + is not.' },
              { text: 'They ___ not ready.', options: ['am', 'is', 'are'], correct: 2, explanation: '"They" + are not.' },
            ],
          },
          {
            teach: {
              rule: 'Qisqartma inkor: isn\'t, aren\'t.',
              ruleRu: 'Сокращённое отрицание: isn\'t, aren\'t.',
              example: "He isn't here. They aren't ready.",
              exampleRu: "He isn't here. They aren't ready.",
            },
            exercises: [
              { text: 'Choose the contraction of "is not":', options: ["isn't", "is'nt"], correct: 0, explanation: '"is not" -> isn\'t.' },
              { text: 'Choose the contraction of "are not":', options: ["aren't", "are'nt"], correct: 0, explanation: '"are not" -> aren\'t.' },
            ],
          },
          {
            teach: {
              rule: '"am not" ning qisqartmasi yo\'q — faqat "I\'m not" ishlatiladi.',
              ruleRu: 'У "am not" нет сокращения — используется только "I\'m not".',
              example: "I'm not tired.",
              exampleRu: "I'm not tired.",
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ["I amn't tired.", "I'm not tired."], correct: 1, explanation: '"am not" ning qisqartmasi yo\'q: I\'m not.' },
              { text: "I ___ ready yet.", options: ["'m not", "isn't", "aren't"], correct: 0, explanation: '"I" inkorida: \'m not.' },
            ],
          },
          {
            teach: {
              rule: "Turli egalar bilan inkorni mustahkamlaymiz.",
              ruleRu: 'Закрепим отрицание с разными подлежащими.',
              example: "It isn't working. We aren't late.",
              exampleRu: "It isn't working. We aren't late.",
            },
            exercises: [
              { text: 'It ___ working.', options: ["isn't", "aren't", "'m not"], correct: 0, explanation: '"It" inkorida: isn\'t.' },
              { text: 'We ___ late.', options: ["isn't", "aren't", "'m not"], correct: 1, explanation: '"We" inkorida: aren\'t.' },
            ],
          },
          {
            teach: {
              rule: "Barcha inkor shakllarni birlashtiramiz: I'm not / isn't / aren't.",
              ruleRu: 'Обобщим все отрицательные формы: I\'m not / isn\'t / aren\'t.',
              example: "He isn't ready, and I'm not either.",
              exampleRu: "He isn't ready, and I'm not either.",
            },
            exercises: [
              { text: 'He ___ my brother.', options: ["isn't", "aren't"], correct: 0, explanation: '"He" inkorida: isn\'t.' },
              { text: 'You ___ wrong.', options: ["isn't", "aren't"], correct: 1, explanation: '"You" inkorida: aren\'t.' },
              { text: 'Choose the correct sentence:', options: ["She isn't home.", 'She not is home.'], correct: 0, explanation: 'To\'g\'ri inkor: She isn\'t home.' },
            ],
          },
        ],
      },
      {
        id: 'sec-tobe-l4',
        order: 4,
        title: 'Savol shakllari',
        titleRu: 'Вопросительные формы',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: 'Savol yasashda "to be" eganing oldiga chiqadi.',
              ruleRu: 'В вопросе "to be" ставится перед подлежащим.',
              example: 'Is he ready?',
              exampleRu: 'Is he ready?',
            },
            exercises: [
              { text: 'Choose the correct question:', options: ['Is she happy?', 'She is happy?'], correct: 0, explanation: 'Savolda "is" oldinga chiqadi: Is she happy?' },
              { text: '___ you tired?', options: ['Am', 'Is', 'Are'], correct: 2, explanation: '"You" savolida: Are.' },
            ],
          },
          {
            teach: {
              rule: '"Am I ...?" — faqat "I" bilan ishlatiladi.',
              ruleRu: '"Am I ...?" — используется только с "I".',
              example: 'Am I late?',
              exampleRu: 'Am I late?',
            },
            exercises: [
              { text: '___ I right?', options: ['Am', 'Is', 'Are'], correct: 0, explanation: '"I" savolida: Am.' },
              { text: 'Choose the correct question:', options: ['Am I late?', 'I am late?'], correct: 0, explanation: 'Savolda "am" oldinga chiqadi: Am I late?' },
            ],
          },
          {
            teach: {
              rule: '"Is he/she/it ...?"',
              ruleRu: '"Is he/she/it ...?"',
              example: 'Is it cold?',
              exampleRu: 'Is it cold?',
            },
            exercises: [
              { text: '___ it raining?', options: ['Am', 'Is', 'Are'], correct: 1, explanation: '"It" savolida: Is.' },
              { text: '___ she a teacher?', options: ['Am', 'Is', 'Are'], correct: 1, explanation: '"She" savolida: Is.' },
            ],
          },
          {
            teach: {
              rule: '"Are you/we/they ...?"',
              ruleRu: '"Are you/we/they ...?"',
              example: 'Are they ready?',
              exampleRu: 'Are they ready?',
            },
            exercises: [
              { text: '___ we late?', options: ['Am', 'Is', 'Are'], correct: 2, explanation: '"We" savolida: Are.' },
              { text: '___ they students?', options: ['Am', 'Is', 'Are'], correct: 2, explanation: '"They" savolida: Are.' },
            ],
          },
          {
            teach: {
              rule: "Barcha savol shakllarini birlashtiramiz: Am I? / Is he-she-it? / Are you-we-they?",
              ruleRu: 'Обобщим все вопросительные формы: Am I? / Is he-she-it? / Are you-we-they?',
              example: 'Are you okay? Is he your friend?',
              exampleRu: 'Are you okay? Is he your friend?',
            },
            exercises: [
              { text: '___ you okay?', options: ['Am', 'Is', 'Are'], correct: 2, explanation: '"You" savolida: Are.' },
              { text: '___ he your friend?', options: ['Am', 'Is', 'Are'], correct: 1, explanation: '"He" savolida: Is.' },
              { text: '___ I wrong?', options: ['Am', 'Is', 'Are'], correct: 0, explanation: '"I" savolida: Am.' },
            ],
          },
        ],
      },
      {
        id: 'sec-tobe-l5',
        order: 5,
        title: 'Qisqa javoblar',
        titleRu: 'Краткие ответы',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: '"Ha" javobida: Yes, + subject + to be.',
              ruleRu: 'В ответе "да": Yes, + подлежащее + to be.',
              example: 'Are you ready? Yes, I am.',
              exampleRu: 'Are you ready? Yes, I am.',
            },
            exercises: [
              { text: 'Is she a doctor? Yes, ___.', options: ['she is', 'she are', 'she am'], correct: 0, explanation: '"She" + is.' },
              { text: 'Are they students? Yes, ___.', options: ['they are', 'they is'], correct: 0, explanation: '"They" + are.' },
            ],
          },
          {
            teach: {
              rule: '"Yo\'q" javobida: No, + subject + to be + not.',
              ruleRu: 'В ответе "нет": No, + подлежащее + to be + not.',
              example: "Is he here? No, he isn't.",
              exampleRu: "Is he here? No, he isn't.",
            },
            exercises: [
              { text: 'Is it cold? No, ___.', options: ["it isn't", "it aren't"], correct: 0, explanation: '"It" inkorida: isn\'t.' },
              { text: 'Are you tired? No, ___.', options: ["I'm not", 'I not'], correct: 0, explanation: '"I" inkorida: \'m not.' },
            ],
          },
          {
            teach: {
              rule: "Qisqa javobda fe'l/sifat takrorlanmaydi, faqat 'to be' qoladi.",
              ruleRu: 'В коротком ответе глагол/прилагательное не повторяется, остаётся только "to be".',
              example: 'Are you a teacher? Yes, I am.',
              exampleRu: 'Are you a teacher? Yes, I am.',
            },
            exercises: [
              { text: 'Choose the correct short answer:', options: ['Yes, I am.', 'Yes, I am a student.'], correct: 0, explanation: 'Qisqa javob qisqa bo\'ladi: Yes, I am.' },
              { text: 'Am I right? Yes, ___.', options: ['you are', 'you am'], correct: 0, explanation: '"You" + are.' },
            ],
          },
          {
            teach: {
              rule: "Turli egalar bilan qisqa javoblarni mustahkamlaymiz.",
              ruleRu: 'Закрепим короткие ответы с разными подлежащими.',
              example: "Is she happy? No, she isn't.",
              exampleRu: "Is she happy? No, she isn't.",
            },
            exercises: [
              { text: 'Is she happy? No, ___.', options: ["she isn't", "she aren't"], correct: 0, explanation: '"She" inkorida: isn\'t.' },
              { text: 'Are we late? Yes, ___.', options: ['we are', 'we is'], correct: 0, explanation: '"We" + are.' },
            ],
          },
          {
            teach: {
              rule: "Barcha qisqa javob turlarini birlashtiramiz.",
              ruleRu: 'Обобщим все виды коротких ответов.',
              example: "Is it Monday? Yes, it is. Are they here? No, they aren't.",
              exampleRu: "Is it Monday? Yes, it is. Are they here? No, they aren't.",
            },
            exercises: [
              { text: 'Is it Monday? Yes, ___.', options: ['it is', 'it are'], correct: 0, explanation: '"It" + is.' },
              { text: 'Are they here? No, ___.', options: ["they aren't", "they isn't"], correct: 0, explanation: '"They" inkorida: aren\'t.' },
              { text: 'Are you ready? No, ___.', options: ["I'm not", "I isn't"], correct: 0, explanation: '"I" inkorida: \'m not.' },
            ],
          },
        ],
      },
      {
        id: 'sec-tobe-l6',
        order: 6,
        title: "Wh- savollar bilan",
        titleRu: 'С вопросительными словами',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: '"What" + to be + subject?',
              ruleRu: '"What" + to be + подлежащее?',
              example: 'What is your name?',
              exampleRu: 'What is your name?',
            },
            exercises: [
              { text: '___ is your name?', options: ['What', 'Who', 'Where'], correct: 0, explanation: 'Narsa/ism so\'ralganda: What.' },
              { text: 'Choose the correct question:', options: ['What is this?', 'What this is?'], correct: 0, explanation: '"to be" "What" dan keyin darrov keladi: What is this?' },
            ],
          },
          {
            teach: {
              rule: '"Who" + to be + subject? (kim ekanini so\'rash)',
              ruleRu: '"Who" + to be + подлежащее? (спрашиваем, кто это)',
              example: 'Who is she?',
              exampleRu: 'Who is she?',
            },
            exercises: [
              { text: '___ is that man?', options: ['What', 'Who', 'Where'], correct: 1, explanation: 'Kim ekani so\'ralganda: Who.' },
              { text: '___ are they?', options: ['What', 'Who', 'Where'], correct: 1, explanation: 'Kim ekanlari so\'ralganda: Who.' },
            ],
          },
          {
            teach: {
              rule: '"Where" + to be + subject? (qayerdaligini so\'rash)',
              ruleRu: '"Where" + to be + подлежащее? (спрашиваем, где)',
              example: 'Where is the book?',
              exampleRu: 'Where is the book?',
            },
            exercises: [
              { text: '___ is my phone?', options: ['What', 'Who', 'Where'], correct: 2, explanation: 'Joy so\'ralganda: Where.' },
              { text: '___ are you from?', options: ['What', 'Who', 'Where'], correct: 2, explanation: 'Kelib chiqish joyi so\'ralganda: Where.' },
            ],
          },
          {
            teach: {
              rule: '"How" + to be + subject? (holatini so\'rash)',
              ruleRu: '"How" + to be + подлежащее? (спрашиваем о состоянии)',
              example: 'How are you?',
              exampleRu: 'How are you?',
            },
            exercises: [
              { text: '___ are you today?', options: ['What', 'How', 'Where'], correct: 1, explanation: 'Holat so\'ralganda: How.' },
              { text: 'Choose the correct question:', options: ['How is the weather?', 'How weather is?'], correct: 0, explanation: '"to be" "How" dan keyin darrov keladi: How is the weather?' },
            ],
          },
          {
            teach: {
              rule: "Barcha savol so'zlarini birlashtiramiz: What / Who / Where / How.",
              ruleRu: 'Обобщим все вопросительные слова: What / Who / Where / How.',
              example: 'Who is your teacher? Where is the station? How are you?',
              exampleRu: 'Who is your teacher? Where is the station? How are you?',
            },
            exercises: [
              { text: '___ is your teacher?', options: ['Who', 'Where', 'How'], correct: 0, explanation: 'Kim ekani so\'ralganda: Who.' },
              { text: '___ is the station?', options: ['Who', 'Where', 'How'], correct: 1, explanation: 'Joy so\'ralganda: Where.' },
              { text: '___ are you?', options: ['Who', 'Where', 'How'], correct: 2, explanation: 'Holat so\'ralganda: How.' },
            ],
          },
        ],
      },
      {
        id: 'sec-tobe-l7',
        order: 7,
        title: "Ishlatilishi",
        titleRu: 'Употребление',
        icon: '7️⃣',
        units: [
          {
            teach: {
              rule: '"To be" + sifat: holatni tasvirlash uchun.',
              ruleRu: '"To be" + прилагательное: для описания состояния.',
              example: 'She is happy. I am tired.',
              exampleRu: 'She is happy. I am tired.',
            },
            exercises: [
              { text: 'He ___ angry.', options: ['am', 'is', 'are'], correct: 1, explanation: '"He" + is.' },
              { text: 'Choose the correct sentence:', options: ['I am tired.', 'I tired.'], correct: 0, explanation: 'Sifat oldidan "to be" kerak: I am tired.' },
            ],
          },
          {
            teach: {
              rule: '"To be" + kasb: kim ekanini aytish uchun.',
              ruleRu: '"To be" + профессия: чтобы сказать, кто есть кто.',
              example: 'He is a doctor. I am a student.',
              exampleRu: 'He is a doctor. I am a student.',
            },
            exercises: [
              { text: 'She ___ a nurse.', options: ['am', 'is', 'are'], correct: 1, explanation: '"She" + is.' },
              { text: 'They ___ engineers.', options: ['am', 'is', 'are'], correct: 2, explanation: '"They" + are.' },
            ],
          },
          {
            teach: {
              rule: '"To be" + joy: qayerda ekanini aytish uchun.',
              ruleRu: '"To be" + место: чтобы сказать, где находится.',
              example: 'The book is on the table. We are at home.',
              exampleRu: 'The book is on the table. We are at home.',
            },
            exercises: [
              { text: 'The keys ___ in my bag.', options: ['am', 'is', 'are'], correct: 2, explanation: '"The keys" = they = are.' },
              { text: 'My mother ___ at work.', options: ['am', 'is', 'are'], correct: 1, explanation: '"My mother" = she = is.' },
            ],
          },
          {
            teach: {
              rule: '"To be" + yosh: yoshini aytish uchun.',
              ruleRu: '"To be" + возраст: чтобы сказать, сколько лет.',
              example: 'I am 20 years old. She is 15.',
              exampleRu: 'I am 20 years old. She is 15.',
            },
            exercises: [
              { text: 'He ___ 30 years old.', options: ['am', 'is', 'are'], correct: 1, explanation: '"He" + is.' },
              { text: 'My grandparents ___ 70 years old.', options: ['am', 'is', 'are'], correct: 2, explanation: '"My grandparents" = they = are.' },
            ],
          },
          {
            teach: {
              rule: "Barcha ishlatilishlarni birlashtiramiz: sifat, kasb, joy, yosh.",
              ruleRu: 'Обобщим все случаи употребления: прилагательное, профессия, место, возраст.',
              example: 'She is a teacher. She is kind. She is at school. She is 28.',
              exampleRu: 'She is a teacher. She is kind. She is at school. She is 28.',
            },
            exercises: [
              { text: 'She ___ a teacher.', options: ['am', 'is', 'are'], correct: 1, explanation: '"She" + is (kasb).' },
              { text: 'The cat ___ under the table.', options: ['am', 'is', 'are'], correct: 1, explanation: '"The cat" = it = is (joy).' },
              { text: 'We ___ 18 years old.', options: ['am', 'is', 'are'], correct: 2, explanation: '"We" + are (yosh).' },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: 'To be' fe'li",
      titleRu: 'Тест раздела: Глагол "to be"',
      exercises: [
        { text: 'He ___ a doctor.', options: ['am', 'is', 'are'], correct: 1, explanation: '"He" + is.' },
        { text: 'We ___ ready.', options: ['am', 'is', 'are'], correct: 2, explanation: '"We" + are.' },
        { text: 'I ___ tired.', options: ['am', 'is', 'are'], correct: 0, explanation: '"I" + am.' },
        { text: 'Choose the contraction of "They are":', options: ["They're", "They's"], correct: 0, explanation: '"They are" -> They\'re.' },
        { text: 'Choose the contraction of "She is":', options: ["She's", "She'is"], correct: 0, explanation: '"She is" -> She\'s.' },
        { text: 'He ___ not ready.', options: ['am', 'is', 'are'], correct: 1, explanation: '"He" + is not.' },
        { text: 'Choose the contraction of "is not":', options: ["isn't", "is'nt"], correct: 0, explanation: '"is not" -> isn\'t.' },
        { text: '___ you tired?', options: ['Am', 'Is', 'Are'], correct: 2, explanation: '"You" savolida: Are.' },
        { text: '___ I late?', options: ['Am', 'Is', 'Are'], correct: 0, explanation: '"I" savolida: Am.' },
        { text: 'Is she a doctor? Yes, ___.', options: ['she is', 'she are'], correct: 0, explanation: '"She" + is.' },
        { text: 'Are they ready? No, ___.', options: ["they aren't", "they isn't"], correct: 0, explanation: '"They" inkorida: aren\'t.' },
        { text: '___ is your name?', options: ['What', 'Who', 'Where'], correct: 0, explanation: 'Ism so\'ralganda: What.' },
        { text: '___ is the book?', options: ['What', 'Who', 'Where'], correct: 2, explanation: 'Joy so\'ralganda: Where.' },
        { text: '___ are you?', options: ['Who', 'Where', 'How'], correct: 2, explanation: 'Holat so\'ralganda: How.' },
        { text: 'She ___ a teacher.', options: ['am', 'is', 'are'], correct: 1, explanation: '"She" + is (kasb).' },
      ],
    },
  },
];
