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
];
