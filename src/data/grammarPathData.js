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
  {
    id: 'sec-plural-nouns',
    order: 3,
    title: "Otlar: ko'plik son",
    titleRu: 'Множественное число существительных',
    icon: '📦',
    lessons: [
      {
        id: 'sec-plural-nouns-l1',
        order: 1,
        title: "Odatiy ko'plik: -s",
        titleRu: 'Обычное множественное число: -s',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: "Ingliz tilida ko'pchilik otlarga ko'plik hosil qilish uchun shunchaki \"-s\" qo'shimchasi qo'shiladi.",
              ruleRu: 'В английском языке для большинства существительных множественное число образуется прибавлением окончания "-s".',
              example: 'cat → cats (mushuk → mushuklar), book → books (kitob → kitoblar)',
              exampleRu: 'cat → cats (кошка → кошки), book → books (книга → книги)',
            },
            exercises: [
              { text: '"book" (kitob) so\'zining ko\'plik shakli qaysi?', options: ['bookes', 'books', 'bookies'], correct: 1, explanation: 'Ko\'pchilik otlarga shunchaki -s qo\'shiladi: books.' },
              { text: '"cat" (mushuk) so\'zini ko\'plikka aylantiring:', options: ['cats', 'cates', 'caties'], correct: 0, explanation: 'cat + s = cats.' },
            ],
          },
          {
            teach: {
              rule: "Ko'plik otlar oldidan \"a / an\" artikli ISHLATILMAYDI.",
              ruleRu: 'Перед существительными во множественном числе артикль "a / an" НЕ используется.',
              example: 'a dog (bitta it) → dogs (itlar), a pen → pens',
              exampleRu: 'a dog (собака) → dogs (собаки), a pen → pens',
            },
            exercises: [
              { text: 'To\'g\'ri birikmani tanlang:', options: ['a dogs', 'dogs', 'an dogs'], correct: 1, explanation: 'Ko\'plikdagi otlar oldidan a/an ishlatilmaydi: dogs.' },
              { text: 'Choose the correct option:', options: ['I have two dogs.', 'I have a two dogs.'], correct: 0, explanation: 'Son va ko\'plik oti kelganda "a" artikli qo\'yilmaydi.' },
            ],
          },
          {
            teach: {
              rule: "Sanoq sonlardan keyin otlar ko'plikda (-s bilan) keladi.",
              ruleRu: 'После числительных больше одного существительные употребляются во множественном числе (-s).',
              example: 'one apple (bitta olma) → three apples (uchta olma)',
              exampleRu: 'one apple → three apples',
            },
            exercises: [
              { text: 'I have two ___ .', options: ['car', 'cars', 'cares'], correct: 1, explanation: 'two (ikkita) dan keyin ko\'plik shakli: cars.' },
              { text: 'There are five ___ in the room.', options: ['chair', 'chairs', 'chaires'], correct: 1, explanation: 'five (beshta) dan keyin ko\'plik shakli: chairs.' },
            ],
          },
          {
            teach: {
              rule: "Ko'plikdagi otlar bilan \"is\" emas, \"are\" fe'li ishlatiladi.",
              ruleRu: 'С существительными во множественном числе используется глагол "are", а не "is".',
              example: 'The book is new. → The books are new. (Kitoblar yangi.)',
              exampleRu: 'The book is new. → The books are new.',
            },
            exercises: [
              { text: 'The cars ___ red.', options: ['is', 'are', 'am'], correct: 1, explanation: '"cars" ko\'plikda bo\'lgani uchun "are" keladi.' },
              { text: 'Choose the correct sentence:', options: ['The pens is on the table.', 'The pens are on the table.'], correct: 1, explanation: 'pens (ko\'plik) + are.' },
            ],
          },
          {
            teach: {
              rule: "Odatiy \"-s\" qo'shimchasi qoidalarini birlashtiramiz.",
              ruleRu: 'Обобщим правила обычного окончания "-s".',
              example: 'I have three books. The books are heavy.',
              exampleRu: 'I have three books. The books are heavy.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I see two cat.', 'I see two cats.'], correct: 1, explanation: 'two + cats (ko\'plik).' },
              { text: 'Choose the correct sentence:', options: ['The dogs are running.', 'The dogs is running.'], correct: 0, explanation: 'dogs (ko\'plik) + are.' },
              { text: 'Select the plural of "bag":', options: ['bags', 'bages', 'bagies'], correct: 0, explanation: 'bag + s = bags.' },
            ],
          },
        ],
      },
      {
        id: 'sec-plural-nouns-l2',
        order: 2,
        title: "-es qo'shimchasi qoidasi",
        titleRu: 'Правило окончания -es',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: "Otlar -s, -ss, -sh, -ch, -x, -z bilan tugasa, ko'plikda \"-es\" qo'shiladi.",
              ruleRu: 'Если существительное оканчивается на -s, -ss, -sh, -ch, -x, -z, добавляется окончание "-es".',
              example: 'bus → buses (avtobuslar), box → boxes (qutilar)',
              exampleRu: 'bus → buses, box → boxes',
            },
            exercises: [
              { text: '"bus" (avtobus) so\'zining ko\'plik shakli qaysi?', options: ['buss', 'buses', 'busis'], correct: 1, explanation: '-s bilan tugagani uchun -es qo\'shiladi: buses.' },
              { text: '"box" (quti) so\'zining ko\'plik shakli qaysi?', options: ['boxs', 'boxes', 'boxies'], correct: 1, explanation: '-x bilan tugagani uchun -es qo\'shiladi: boxes.' },
            ],
          },
          {
            teach: {
              rule: "-sh va -ch bilan tugaydigan otlarga ham \"-es\" qo'shiladi.",
              ruleRu: 'К существительным, оканчивающимся на -sh и -ch, также добавляется "-es".',
              example: 'dish → dishes (idishlar), watch → watches (qo\'l soatlari)',
              exampleRu: 'dish → dishes, watch → watches',
            },
            exercises: [
              { text: '"dish" (idish) so\'zini ko\'plikka aylantiring:', options: ['dishs', 'dishes', 'dishies'], correct: 1, explanation: '-sh bilan tugagani uchun -es qo\'shiladi: dishes.' },
              { text: '"watch" (soat) so\'zining ko\'pligi qaysi?', options: ['watchs', 'watches', 'watchies'], correct: 1, explanation: '-ch bilan tugagani uchun -es qo\'shiladi: watches.' },
            ],
          },
          {
            teach: {
              rule: "Ko'pchilik -o bilan tugaydigan otlarga ham \"-es\" qo'shiladi.",
              ruleRu: 'К большинству существительных на -o также добавляется "-es".',
              example: 'tomato → tomatoes (pomidorlar), potato → potatoes (kartoshkalar)',
              exampleRu: 'tomato → tomatoes, potato → potatoes',
            },
            exercises: [
              { text: '"tomato" so\'zining ko\'plik shaklini toping:', options: ['tomatos', 'tomatoes', 'tomatoies'], correct: 1, explanation: 'tomato + es = tomatoes.' },
              { text: '"potato" so\'zining ko\'plik shakli qaysi?', options: ['potatoes', 'potatos', 'potatose'], correct: 0, explanation: 'potato + es = potatoes.' },
            ],
          },
          {
            teach: {
              rule: "\"-es\" qo'shimchasi so'z oxirida [iz] deb talaffuz qilinadi.",
              ruleRu: 'Окончание "-es" произносится как [iz].',
              example: 'buses [basiz], boxes [boksiz], watches [wochiz]',
              exampleRu: 'buses [басиз], boxes [боксиз]',
            },
            exercises: [
              { text: '"buses" va "boxes" so\'zlarida -es qanday talaffuz qilinadi?', options: ['[s]', '[z]', '[iz]'], correct: 2, explanation: '-es qoidasidagi so\'zlarda -es [iz] tovushini beradi.' },
              { text: 'Choose the correct plural for "glass" (stakan):', options: ['glasss', 'glasses', 'glassies'], correct: 1, explanation: '-ss bilan tugagan: glasses.' },
            ],
          },
          {
            teach: {
              rule: "\"-es\" qoidalarini birlashtiramiz: -s, -ss, -sh, -ch, -x, -o → -es.",
              ruleRu: 'Обобщим правило -es: -s, -ss, -sh, -ch, -x, -o → -es.',
              example: 'She has two watches. The boxes are big.',
              exampleRu: 'She has two watches. The boxes are big.',
            },
            exercises: [
              { text: 'Choose the correct plural of "class":', options: ['classs', 'classes'], correct: 1, explanation: '-ss bilan tugagani uchun: classes.' },
              { text: 'Choose the correct sentence:', options: ['The boxes are on the floor.', 'The boxs are on the floor.'], correct: 0, explanation: 'box + es = boxes.' },
              { text: 'Select the plural of "sandwich":', options: ['sandwichs', 'sandwiches'], correct: 1, explanation: '-ch bilan tugagani uchun: sandwiches.' },
            ],
          },
        ],
      },
      {
        id: 'sec-plural-nouns-l3',
        order: 3,
        title: "-y bilan tugaydigan otlar",
        titleRu: 'Существительные на -y',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: "Agar so'z undosh + y bilan tugasa, \"y\" harfi \"i\" ga o'zgaradi va \"-es\" qo'shiladi (-ies).",
              ruleRu: 'Если перед "y" стоит согласная буква, "y" меняется на "i" и добавляется "-es" (-ies).',
              example: 'baby → babies (chaqaloqlar), city → cities (shaharlar)',
              exampleRu: 'baby → babies, city → cities',
            },
            exercises: [
              { text: '"baby" so\'zining ko\'plik shakli qaysi?', options: ['babys', 'babies', 'babyes'], correct: 1, explanation: 'undosh (b) + y -> y o\'zgarib -ies bo\'ladi: babies.' },
              { text: '"city" (shahar) so\'zini ko\'plikka aylantiring:', options: ['citys', 'cities', 'cityes'], correct: 1, explanation: 'undosh (t) + y -> cities.' },
            ],
          },
          {
            teach: {
              rule: "Agar so'z unli (a, e, o, u) + y bilan tugasa, \"y\" O'ZGARMAYDI, shunchaki \"-s\" qo'shiladi.",
              ruleRu: 'Если перед "y" стоит гласная (a, e, o, u), "y" НЕ меняется, просто добавляется "-s".',
              example: 'boy → boys (bolalar), key → keys (kalitlar), day → days (kunlar)',
              exampleRu: 'boy → boys, key → keys, day → days',
            },
            exercises: [
              { text: '"boy" so\'zining ko\'plik shakli qaysi?', options: ['boies', 'boys', 'boyes'], correct: 1, explanation: 'unli (o) + y bo\'lgani uchun shunchaki -s: boys.' },
              { text: '"key" (kalit) so\'zini ko\'plikka aylantiring:', options: ['keies', 'keys', 'keyes'], correct: 1, explanation: 'unli (e) + y -> keys.' },
            ],
          },
          {
            teach: {
              rule: "Qaysi holda -ies, qaysi holda -ys bo'lishini farqlaymiz: undosh+y = -ies, unli+y = -ys.",
              ruleRu: 'Различаем: согласная+y = -ies, гласная+y = -ys.',
              example: 'party → parties (undosh t+y), toy → toys (unli o+y)',
              exampleRu: 'party → parties, toy → toys',
            },
            exercises: [
              { text: '"party" so\'zining ko\'pligi qaysi?', options: ['partys', 'parties'], correct: 1, explanation: 't + y (undosh+y) -> parties.' },
              { text: '"toy" (o\'yinchoq) so\'zining ko\'pligi qaysi?', options: ['toys', 'toies'], correct: 0, explanation: 'o + y (unli+y) -> toys.' },
            ],
          },
          {
            teach: {
              rule: "Gaplarda ishlatilishi: ko'plik shakli mos ravishda \"are\" bilan keladi.",
              ruleRu: 'Употребление в предложениях с глаголом "are".',
              example: 'The babies are sleeping. The keys are here.',
              exampleRu: 'The babies are sleeping. The keys are here.',
            },
            exercises: [
              { text: 'The ___ are on the table. (key)', options: ['keies', 'keys'], correct: 1, explanation: 'key -> keys.' },
              { text: 'Many ___ live in big cities. (family)', options: ['families', 'familys'], correct: 0, explanation: 'family (undosh l+y) -> families.' },
            ],
          },
          {
            teach: {
              rule: "\"-y\" qoidalarini birlashtiramiz: undosh+y → -ies, unli+y → -ys.",
              ruleRu: 'Обобщим правила для -y: согласная+y → -ies, гласная+y → -ys.',
              example: 'The boys have many toys and two storybooks (stories).',
              exampleRu: 'The boys have many toys and stories.',
            },
            exercises: [
              { text: 'Select the plural of "story":', options: ['storys', 'stories'], correct: 1, explanation: 'r + y -> stories.' },
              { text: 'Select the plural of "day":', options: ['daies', 'days'], correct: 1, explanation: 'a + y -> days.' },
              { text: 'Choose the correct sentence:', options: ['The cities are beautiful.', 'The citys are beautiful.'], correct: 0, explanation: 'city -> cities.' },
            ],
          },
        ],
      },
      {
        id: 'sec-plural-nouns-l4',
        order: 4,
        title: "-f va -fe bilan tugaydigan otlar",
        titleRu: 'Существительные на -f / -fe',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: "Ko'pchilik -f yoki -fe bilan tugaydigan otlarda \"f / fe\" harflari \"-ves\" ga o'zgaradi.",
              ruleRu: 'У большинства существительных на -f или -fe эти буквы меняются на "-ves".',
              example: 'knife → knives (pichoqlar), leaf → leaves (barglar), life → lives (hayotlar)',
              exampleRu: 'knife → knives, leaf → leaves, life → lives',
            },
            exercises: [
              { text: '"knife" (pichoq) so\'zining ko\'plik shakli qaysi?', options: ['knifes', 'knives', 'knifeies'], correct: 1, explanation: '-fe bilan tugagan: knives.' },
              { text: '"leaf" (barg) so\'zini ko\'plikka aylantiring:', options: ['leafs', 'leaves', 'leafes'], correct: 1, explanation: '-f o\'zgarib -ves bo\'ladi: leaves.' },
            ],
          },
          {
            teach: {
              rule: "Yana boshqa mashhur -f / -fe otlar: wife → wives, wolf → wolves, shelf → shelves.",
              ruleRu: 'Другие частые существительные: wife → wives, wolf → wolves, shelf → shelves.',
              example: 'shelf → shelves (tokchalar), wolf → wolves (borilar)',
              exampleRu: 'shelf → shelves, wolf → wolves',
            },
            exercises: [
              { text: '"shelf" (tokcha) so\'zining ko\'plik shakli qaysi?', options: ['shelfs', 'shelves', 'shelfes'], correct: 1, explanation: 'shelf -> shelves.' },
              { text: '"wife" (xotin/ayol) so\'zining ko\'pligi qaysi?', options: ['wifes', 'wives'], correct: 1, explanation: 'wife -> wives.' },
            ],
          },
          {
            teach: {
              rule: "Ba'zi istisnolar ham bor — ularga shunchaki \"-s\" qo'shiladi: roof → roofs, chef → chefs.",
              ruleRu: 'Исключения, к которым просто добавляется "-s": roof → roofs, chef → chefs.',
              example: 'roof → roofs (tomlar), chef → chefs (oshpazlar)',
              exampleRu: 'roof → roofs, chef → chefs',
            },
            exercises: [
              { text: '"roof" (tom) so\'zining ko\'plik shakli qaysi? (istisno)', options: ['rooves', 'roofs'], correct: 1, explanation: 'roof — istisno so\'z, shunchaki -s qo\'shiladi: roofs.' },
              { text: '"chef" (oshpaz) so\'zining ko\'pligi qaysi?', options: ['chefs', 'cheves'], correct: 0, explanation: 'chef — istisno so\'z: chefs.' },
            ],
          },
          {
            teach: {
              rule: "Gaplarda qo'llanilishi: \"-ves\" otlari ko'plikda \"are\" oladi.",
              ruleRu: 'Употребление в предложениях во множественном числе с "are".',
              example: 'The knives are sharp. The leaves are red.',
              exampleRu: 'The knives are sharp. The leaves are red.',
            },
            exercises: [
              { text: 'The ___ are falling from the trees.', options: ['leafs', 'leaves'], correct: 1, explanation: 'leaf -> leaves.' },
              { text: 'The books are on the ___ .', options: ['shelfs', 'shelves'], correct: 1, explanation: 'shelf -> shelves.' },
            ],
          },
          {
            teach: {
              rule: "\"-f / -fe\" qoidalarini birlashtiramiz: aksariyati -ves, istisnolar -s.",
              ruleRu: 'Обобщим правила -f / -fe: большинство -ves, исключения -s.',
              example: 'The wolves are in the forest. The roofs of houses are red.',
              exampleRu: 'The wolves are in the forest. The roofs of houses are red.',
            },
            exercises: [
              { text: 'Select the plural of "wolf":', options: ['wolfs', 'wolves'], correct: 1, explanation: 'wolf -> wolves.' },
              { text: 'Select the plural of "life":', options: ['lifes', 'lives'], correct: 1, explanation: 'life -> lives.' },
              { text: 'Choose the correct sentence:', options: ['The knives are sharp.', 'The knifes are sharp.'], correct: 0, explanation: 'knife -> knives.' },
            ],
          },
        ],
      },
      {
        id: 'sec-plural-nouns-l5',
        order: 5,
        title: "Noto'g'ri ko'plik (Irregular)",
        titleRu: 'Исключения (Неправильные формы)',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: "Ba'zi otlar ko'plikda -s OLMAYDI, balki butunlay shaklini o'zgartiradi!",
              ruleRu: 'Некоторые существительные образуют множественное число НЕ через -s, а полностью меняют форму!',
              example: 'man → men (erkaklar), woman → women (ayollar)',
              exampleRu: 'man → men, woman → women',
            },
            exercises: [
              { text: '"man" (erkak) so\'zining ko\'plik shakli qaysi?', options: ['mans', 'men', 'manes'], correct: 1, explanation: 'man ko\'pligi - s emas, men bo\'ladi.' },
              { text: '"woman" (ayol) so\'zining ko\'plik shakli qaysi?', options: ['womans', 'women', 'womenes'], correct: 1, explanation: 'woman ko\'pligi: women.' },
            ],
          },
          {
            teach: {
              rule: "Bola va odam so'zlarining noto'g'ri ko'pligi: child → children, person → people.",
              ruleRu: 'Формы для ребенок/человек: child → children, person → people.',
              example: 'child → children (bolalar), person → people (odamlar)',
              exampleRu: 'child → children, person → people',
            },
            exercises: [
              { text: '"child" (bitta bola) so\'zining ko\'pligi qaysi?', options: ['childs', 'children', 'childrens'], correct: 1, explanation: 'child -> children.' },
              { text: '"person" (odam) so\'zining ko\'pligi qaysi?', options: ['persons', 'people', 'peoples'], correct: 1, explanation: 'person -> people.' },
            ],
          },
          {
            teach: {
              rule: "Tish va oyoq so'zlarida o'zaksiz unlilar o'zgaradi: tooth → teeth, foot → feet.",
              ruleRu: 'Изменение гласных для зуба и ноги: tooth → teeth, foot → feet.',
              example: 'tooth → teeth (tishlar), foot → feet (oyoqlar)',
              exampleRu: 'tooth → teeth, foot → feet',
            },
            exercises: [
              { text: '"tooth" (tish) so\'zining ko\'pligi qaysi?', options: ['tooths', 'teeth', 'teethes'], correct: 1, explanation: 'tooth -> teeth.' },
              { text: '"foot" (oyoq kafti) so\'zining ko\'pligi qaysi?', options: ['foots', 'feet', 'feets'], correct: 1, explanation: 'foot -> feet.' },
            ],
          },
          {
            teach: {
              rule: "Sichqon va g'oz so'zlarining ko'pligi: mouse → mice, goose → geese.",
              ruleRu: 'Формы для мыши и гуся: mouse → mice, goose → geese.',
              example: 'mouse → mice (sichqonlar), goose → geese (g\'ozlar)',
              exampleRu: 'mouse → mice, goose → geese',
            },
            exercises: [
              { text: '"mouse" (sichqon) so\'zining ko\'pligi qaysi?', options: ['mouses', 'mice', 'mices'], correct: 1, explanation: 'mouse -> mice.' },
              { text: '"goose" (g\'oz) so\'zining ko\'pligi qaysi?', options: ['gooses', 'geese'], correct: 1, explanation: 'goose -> geese.' },
            ],
          },
          {
            teach: {
              rule: "Noto'g'ri ko'plik shakllarini birlashtiramiz va gapda qo'llaymiz.",
              ruleRu: 'Обобщим все неправильные формы и применим в предложениях.',
              example: 'The children are playing. Many people are in the park.',
              exampleRu: 'The children are playing. Many people are in the park.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['The children are happy.', 'The childrens are happy.'], correct: 0, explanation: 'children o\'zi ko\'plik, -s qo\'shilmaydi.' },
              { text: 'Three ___ are sitting on the bench. (man)', options: ['mans', 'men'], correct: 1, explanation: 'man -> men.' },
              { text: 'Wash your ___ before bed. (tooth)', options: ['tooths', 'teeth'], correct: 1, explanation: 'tooth -> teeth.' },
            ],
          },
        ],
      },
      {
        id: 'sec-plural-nouns-l6',
        order: 6,
        title: "O'zgarmaydigan va doimiy ko'plik otlar",
        titleRu: 'Неизменяемые и всегда множественные',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: "Ba'zi hayvon nomlari birlikda ham, ko'plikda ham BIR XIL shaklda qoladi!",
              ruleRu: 'Некоторые названия животных НЕ меняют форму во множественном числе!',
              example: 'one sheep → two sheep (qo\'ylar), one fish → two fish (baliqlar), one deer → two deer (kiyiqlar)',
              exampleRu: 'one sheep → two sheep, one fish → two fish',
            },
            exercises: [
              { text: '"sheep" (qo\'y) so\'zining ko\'plik shakli qaysi?', options: ['sheeps', 'sheep', 'sheepes'], correct: 1, explanation: 'sheep o\'zgarmaydi: one sheep, two sheep.' },
              { text: 'I caught three ___ . (fish)', options: ['fishes', 'fish', 'fishs'], correct: 1, explanation: 'fish ko\'plikda ham fish bo\'lib qoladi.' },
            ],
          },
          {
            teach: {
              rule: "Ba'zi buyumlar (juft narsalar) ingliz tilida DOIM KO'PLIKDA ishlatiladi: glasses (ko'zoynak), trousers/pants (shim), scissors (qaychi).",
              ruleRu: 'Парные предметы ВСЕГДА употребляются во множественном числе: glasses, trousers/pants, scissors.',
              example: 'glasses (ko\'zoynak), trousers (shim), scissors (qaychi)',
              exampleRu: 'glasses, trousers, scissors',
            },
            exercises: [
              { text: 'Qaysi so\'z doim ko\'plikda ishlatiladi?', options: ['book', 'trousers', 'pen'], correct: 1, explanation: 'trousers (shim) — juft narsa, doim ko\'plikda.' },
              { text: '"scissors" (qaychi) so\'zi qaysi fe\'l bilan keladi?', options: ['is', 'are'], correct: 1, explanation: 'Doimiy ko\'plik otlar bilan "are" ishlatiladi.' },
            ],
          },
          {
            teach: {
              rule: "Juft narsalar (glasses, trousers, scissors) bilan doim \"are\" fe'li keladi.",
              ruleRu: 'С парными предметами (glasses, trousers, scissors) всегда используется "are".',
              example: 'My glasses are new. These trousers are blue.',
              exampleRu: 'My glasses are new. These trousers are blue.',
            },
            exercises: [
              { text: 'My glasses ___ on the table.', options: ['is', 'are', 'am'], correct: 1, explanation: 'glasses (doimiy ko\'plik) + are.' },
              { text: 'Choose the correct sentence:', options: ['The scissors are sharp.', 'The scissors is sharp.'], correct: 0, explanation: 'scissors + are.' },
            ],
          },
          {
            teach: {
              rule: "Ularni birlikda sanash uchun \"a pair of...\" (bitta juft...) iborasi ishlatiladi.",
              ruleRu: 'Чтобы посчитать парные предметы, используют выражение "a pair of...".',
              example: 'a pair of glasses (bitta ko\'zoynak), two pairs of trousers (ikkita shim)',
              exampleRu: 'a pair of glasses, two pairs of trousers',
            },
            exercises: [
              { text: 'I need a pair of ___ .', options: ['glass', 'glasses'], correct: 1, explanation: 'a pair of + glasses.' },
              { text: 'He bought two ___ of pants.', options: ['pair', 'pairs'], correct: 1, explanation: 'two + pairs of pants.' },
            ],
          },
          {
            teach: {
              rule: "O'zgarmaydigan va doimiy ko'plik otlarni jamlaymiz.",
              ruleRu: 'Обобщим неизменяемые и всегда множественные существительные.',
              example: 'There are ten sheep in the field. My trousers are clean.',
              exampleRu: 'There are ten sheep in the field. My trousers are clean.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['Look at those sheep!', 'Look at those sheeps!'], correct: 0, explanation: 'sheep ko\'pligi ham sheep.' },
              { text: 'Where ___ my glasses?', options: ['is', 'are'], correct: 1, explanation: 'glasses + are.' },
              { text: 'Select the correct phrase:', options: ['a pair of scissors', 'a scissor'], correct: 0, explanation: 'qaychi uchun: a pair of scissors.' },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Otlar ko'plik soni",
      titleRu: 'Тест раздела: Множественное число существительных',
      exercises: [
        { text: '"book" so\'zining ko\'plik shakli qaysi?', options: ['bookes', 'books', 'bookies'], correct: 1, explanation: 'Odatiy ko\'plik: books.' },
        { text: '"box" so\'zining ko\'plik shakli qaysi?', options: ['boxs', 'boxes'], correct: 1, explanation: '-x bilan tugagan: boxes.' },
        { text: '"watch" so\'zining ko\'plik shakli qaysi?', options: ['watchs', 'watches'], correct: 1, explanation: '-ch bilan tugagan: watches.' },
        { text: '"baby" so\'zining ko\'plik shakli qaysi?', options: ['babys', 'babies'], correct: 1, explanation: 'undosh+y -> babies.' },
        { text: '"boy" so\'zining ko\'plik shakli qaysi?', options: ['boys', 'boies'], correct: 0, explanation: 'unli+y -> boys.' },
        { text: '"knife" (pichoq) so\'zining ko\'pligi qaysi?', options: ['knifes', 'knives'], correct: 1, explanation: '-fe -> knives.' },
        { text: '"roof" (tom) so\'zining ko\'pligi qaysi? (istisno)', options: ['rooves', 'roofs'], correct: 1, explanation: 'roof — istisno: roofs.' },
        { text: '"man" so\'zining ko\'plik shakli qaysi?', options: ['mans', 'men'], correct: 1, explanation: 'man -> men.' },
        { text: '"child" so\'zining ko\'plik shakli qaysi?', options: ['childs', 'children'], correct: 1, explanation: 'child -> children.' },
        { text: '"person" so\'zining ko\'plik shakli qaysi?', options: ['persons', 'people'], correct: 1, explanation: 'person -> people.' },
        { text: '"tooth" so\'zining ko\'plik shakli qaysi?', options: ['tooths', 'teeth'], correct: 1, explanation: 'tooth -> teeth.' },
        { text: '"mouse" so\'zining ko\'plik shakli qaysi?', options: ['mouses', 'mice'], correct: 1, explanation: 'mouse -> mice.' },
        { text: '"sheep" so\'zining ko\'plik shakli qaysi?', options: ['sheeps', 'sheep'], correct: 1, explanation: 'sheep o\'zgarmaydi: sheep.' },
        { text: 'Where ___ my glasses?', options: ['is', 'are'], correct: 1, explanation: 'glasses (doimiy ko\'plik) + are.' },
        { text: 'Choose the correct sentence:', options: ['The children are in the park.', 'The childrens are in the park.'], correct: 0, explanation: 'children o\'zi ko\'plik.' },
      ],
    },
  },
  {
    id: 'sec-articles',
    order: 4,
    title: 'Artikllar: a / an va the',
    titleRu: 'Артикли: a / an и the',
    icon: '🅰️',
    lessons: [
      {
        id: 'sec-articles-l1',
        order: 1,
        title: 'Noaniq artikl "a"',
        titleRu: 'Неопределённый артикль "a"',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: '"a" artikli birlikdagi, sanaladigan otlar oldidan "bitta" yoki "qandaydir bir" ma\'nosida ishlatiladi.',
              ruleRu: 'Артикль "a" используется перед исчисляемыми существительными в единственном числе в значении "один" или "какой-то".',
              example: 'a book (bitta kitob), a car (bitta mashina)',
              exampleRu: 'a book (книга), a car (машина)',
            },
            exercises: [
              { text: '"bitta kitob" birikmasini to\'g\'ri tanlang:', options: ['a book', 'an book', 'the books'], correct: 0, explanation: 'book [b] undosh tovush bilan boshlanadi: a book.' },
              { text: 'I have ___ dog.', options: ['a', 'an', '-'], correct: 0, explanation: 'dog [d] undosh tovush bilan boshlangani uchun "a" qo\'yiladi.' },
            ],
          },
          {
            teach: {
              rule: '"a" artikli faqat undosh TOVUSH bilan boshlanadigan so\'zlar oldidan qo\'yiladi.',
              ruleRu: 'Артикль "a" ставится перед словами, начинающимися с согласного ЗВУКА.',
              example: 'a cat [k], a pen [p], a house [h]',
              exampleRu: 'a cat, a pen, a house',
            },
            exercises: [
              { text: 'Qaysi so\'z oldidan "a" qo\'yiladi?', options: ['apple', 'pen', 'egg'], correct: 1, explanation: 'pen undosh tovush [p] bilan boshlanadi: a pen.' },
              { text: 'She is ___ doctor.', options: ['a', 'an', 'the'], correct: 0, explanation: 'doctor [d] undosh tovush: a doctor.' },
            ],
          },
          {
            teach: {
              rule: "Ot oldida sifat kelsa, artikl sifatning birinchi TOVUSHiga qarab tanlanadi.",
              ruleRu: 'Если перед существительным стоит прилагательное, артикль выбирается по первому ЗВУКУ прилагательного.',
              example: 'a big apple (katta olma), a red car (qizil mashina)',
              exampleRu: 'a big apple, a red car',
            },
            exercises: [
              { text: 'This is ___ big apple.', options: ['a', 'an', 'the'], correct: 0, explanation: 'big [b] undosh tovush bilan boshlangani uchun "a" qo\'yiladi.' },
              { text: 'Choose the correct phrase:', options: ['a new phone', 'an new phone'], correct: 0, explanation: 'new [n] undosh: a new phone.' },
            ],
          },
          {
            teach: {
              rule: '"a" artikli ko\'plikdagi otlar yoki sanalmaydigan otlar oldidan ISHLATILMAYDI.',
              ruleRu: 'Артикль "a" НЕ используется во множественном числе или с неисчисляемыми существительными.',
              example: 'books (kitoblar) — "a books" bo\'lmaydi! water (suv) — "a water" bo\'lmaydi!',
              exampleRu: 'books (не a books), water (не a water)',
            },
            exercises: [
              { text: 'Choose the correct option:', options: ['a books', 'books'], correct: 1, explanation: 'Ko\'plikdagi otlar oldida "a" ishlatilmaydi: books.' },
              { text: 'I drink ___ water.', options: ['a', 'an', '- (no article)'], correct: 2, explanation: 'water sanalmaydi, noaniq artikl qo\'yilmaydi.' },
            ],
          },
          {
            teach: {
              rule: '"a" artikli qoidalarini birlashtiramiz: birlikdagi sanaladigan otlar + undosh tovush.',
              ruleRu: 'Обобщим правила "a": единственное число + согласный звук.',
              example: 'I have a car and a small cat.',
              exampleRu: 'I have a car and a small cat.',
            },
            exercises: [
              { text: 'He is ___ teacher.', options: ['a', 'an', '-'], correct: 0, explanation: 'teacher [t] undosh: a teacher.' },
              { text: 'Select the correct phrase:', options: ['a new car', 'an new car'], correct: 0, explanation: 'new [n] undosh: a new car.' },
              { text: 'Choose the correct option:', options: ['a computers', 'computers'], correct: 1, explanation: 'Ko\'plikda "a" bo\'lmaydi.' },
            ],
          },
        ],
      },
      {
        id: 'sec-articles-l2',
        order: 2,
        title: 'Noaniq artikl "an"',
        titleRu: 'Неопределённый артикль "an"',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: '"an" artikli unli TOVUSH (a, e, i, o, u) bilan boshlanadigan so\'zlar oldidan qo\'yiladi.',
              ruleRu: 'Артикль "an" используется перед словами, начинающимися с гласного ЗВУКА (a, e, i, o, u).',
              example: 'an apple (olma), an egg (tuxum), an orange (apelsin)',
              exampleRu: 'an apple, an egg, an orange',
            },
            exercises: [
              { text: '"an" artikli qaysi so\'z oldidan qo\'yiladi?', options: ['book', 'apple', 'car'], correct: 1, explanation: 'apple [æ] unli tovush bilan boshlanadi: an apple.' },
              { text: 'I eat ___ egg every morning.', options: ['a', 'an', 'the'], correct: 1, explanation: 'egg [e] unli tovush: an egg.' },
            ],
          },
          {
            teach: {
              rule: "Agarda \"h\" harfi o'qilmasa (ovozsiz bo'lsa), so'z unli tovush bilan boshlanadi va \"an\" qo'yiladi.",
              ruleRu: 'Если буква "h" не произносится (немая), слово начинается с гласного звука и ставится "an".',
              example: 'an hour (bitta soat vaqt), an honest man (halol odam)',
              exampleRu: 'an hour, an honest man',
            },
            exercises: [
              { text: 'I will be there in ___ hour.', options: ['a', 'an', '-'], correct: 1, explanation: 'hour so\'zida [h] o\'qilmaydi, unli [auə] eshitiladi: an hour.' },
              { text: 'He is ___ honest boy.', options: ['a', 'an', '-'], correct: 1, explanation: 'honest [onist] unli tovush bilan boshlanadi: an honest boy.' },
            ],
          },
          {
            teach: {
              rule: "Diqqat! Muhimi harf emas, TOVUSH! Masalan \"u\" harfi [yu] (undosh) deb o'qilsa \"a\" qo'yiladi.",
              ruleRu: 'Внимание! Важен ЗВУК, а не буква. Если "u" читается как [yu] (согласный), ставится "a".',
              example: 'a university [yuniversiti], a uniform [yuniform]',
              exampleRu: 'a university, a uniform',
            },
            exercises: [
              { text: 'This is ___ university.', options: ['a', 'an', '-'], correct: 0, explanation: 'university [yu] undosh tovush bilan boshlanadi: a university.' },
              { text: 'He wears ___ uniform.', options: ['a', 'an', 'the'], correct: 0, explanation: 'uniform [yu] undosh tovush: a uniform.' },
            ],
          },
          {
            teach: {
              rule: '"a" va "an" ni taqqoslaymiz: undosh tovush = a, unli tovush = an.',
              ruleRu: 'Сравниваем "a" и "an": согласный звук = a, гласный звук = an.',
              example: 'a pen vs an umbrella; a cat vs an elephant',
              exampleRu: 'a pen vs an umbrella; a cat vs an elephant',
            },
            exercises: [
              { text: 'Choose the correct option:', options: ['an umbrella', 'a umbrella'], correct: 0, explanation: 'umbrella [ʌ] unli tovush: an umbrella.' },
              { text: 'She is ___ actor.', options: ['a', 'an'], correct: 1, explanation: 'actor [æ] unli tovush: an actor.' },
            ],
          },
          {
            teach: {
              rule: '"an" qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим правила "an".',
              example: 'I have an apple, an umbrella, and a book.',
              exampleRu: 'I have an apple, an umbrella, and a book.',
            },
            exercises: [
              { text: 'Choose the correct phrase:', options: ['an interesting book', 'a interesting book'], correct: 0, explanation: 'interesting [i] unli tovush: an interesting book.' },
              { text: 'He left ___ hour ago.', options: ['a', 'an'], correct: 1, explanation: 'an hour.' },
              { text: 'Choose the correct option:', options: ['an actor', 'a actor'], correct: 0, explanation: 'an actor.' },
            ],
          },
        ],
      },
      {
        id: 'sec-articles-l3',
        order: 3,
        title: 'Aniq artikl "the"',
        titleRu: 'Определённый артикль "the"',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: '"the" artikli suhbatdoshga aniq, ma\'lum bo\'lgan narsa/shaxs haqida gapirganda ishlatiladi ("o\'sha / shu").',
              ruleRu: 'Артикль "the" используется, когда речь идет о конкретном, уже известном предмете или человеке.',
              example: 'Open the door. (Eshikni och — aynan shu eshikni)',
              exampleRu: 'Open the door. (Открой дверь — конкретную дверь)',
            },
            exercises: [
              { text: '___ sun is bright today.', options: ['A', 'An', 'The'], correct: 2, explanation: 'sun (quyosh) aniq va yagona: The sun.' },
              { text: 'Please close ___ window.', options: ['a', 'the', 'an'], correct: 1, explanation: 'Xonadagi aniq o\'sha deraza nazarda tutilmoqda: the window.' },
            ],
          },
          {
            teach: {
              rule: "Birinchi marta tilga olinganda \"a/an\", ikkinchi marta qayta aytilganda \"the\" ishlatiladi.",
              ruleRu: 'При первом упоминании используется "a/an", а при повторном — "the".',
              example: 'I bought a book. The book is very interesting.',
              exampleRu: 'I bought a book. The book is very interesting.',
            },
            exercises: [
              { text: 'I saw a dog. ___ dog was black.', options: ['A', 'An', 'The'], correct: 2, explanation: 'Dog ikkinchi marta aytilgani uchun u aniq: The dog.' },
              { text: 'She has a car. ___ car is red.', options: ['A', 'The', 'An'], correct: 1, explanation: 'Qayta tilga olinganda: The car.' },
            ],
          },
          {
            teach: {
              rule: '"the" artikli ham birlik, ham KO\'PLIK otlar bilan ishlatilishi mumkin.',
              ruleRu: 'Артикль "the" может использоваться как в единственном, так и во МНОЖЕСТВЕННОМ числе.',
              example: 'the book (aniq kitob) → the books (aniq kitoblar)',
              exampleRu: 'the book → the books',
            },
            exercises: [
              { text: '___ books on the table are mine.', options: ['A', 'An', 'The'], correct: 2, explanation: 'Ko\'plikdagi aniq kitoblar: The books.' },
              { text: 'Look at ___ children over there!', options: ['a', 'the', 'an'], correct: 1, explanation: 'Aniq ko\'rinib turgan bolalar: the children.' },
            ],
          },
          {
            teach: {
              rule: "Atrofdagi yagona narsalar va muayyan joylar bilan \"the\" keladi.",
              ruleRu: 'С единственными в своем роде предметами и конкретными местами используется "the".',
              example: 'the moon (oy), the sky (osmon), the earth (yer)',
              exampleRu: 'the moon, the sky, the earth',
            },
            exercises: [
              { text: 'Look at ___ sky!', options: ['a', 'an', 'the'], correct: 2, explanation: 'sky yagona: the sky.' },
              { text: '___ moon is white tonight.', options: ['A', 'The', 'An'], correct: 1, explanation: 'moon yagona: The moon.' },
            ],
          },
          {
            teach: {
              rule: '"the" artikli qoidalarini birlashtiramiz: aniq narsalar / ikkinchi marta tilga olingan otlar.',
              ruleRu: 'Обобщим правила "the": конкретные предметы / повторное упоминание.',
              example: 'I have a pen. The pen is blue. Look at the sky.',
              exampleRu: 'I have a pen. The pen is blue. Look at the sky.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I have a cat. The cat is white.', 'I have a cat. A cat is white.'], correct: 0, explanation: 'Qayta aytilganda: The cat.' },
              { text: 'Turn off ___ light, please.', options: ['a', 'the'], correct: 1, explanation: 'Aniq shu xonadagi chiroq: the light.' },
              { text: '___ earth goes around the sun.', options: ['The', 'A'], correct: 0, explanation: 'The earth, the sun.' },
            ],
          },
        ],
      },
      {
        id: 'sec-articles-l4',
        order: 4,
        title: '"the" artiklining maxsus holatlari',
        titleRu: 'Особые случаи употребления "the"',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: "Musiqa asboblarini chalish haqida gapirganda \"the\" ishlatiladi.",
              ruleRu: 'При игре на музыкальных инструментах используется "the".',
              example: 'play the piano (pianino chalmoq), play the guitar (gitara chalmoq)',
              exampleRu: 'play the piano, play the guitar',
            },
            exercises: [
              { text: 'She can play ___ piano.', options: ['a', 'the', '-'], correct: 1, explanation: 'Musiqa asbobi bilan: play the piano.' },
              { text: 'He is learning to play ___ guitar.', options: ['a', 'the', '-'], correct: 1, explanation: 'Musiqa asbobi bilan: play the guitar.' },
            ],
          },
          {
            teach: {
              rule: "Sifatning orttirma (Superlative) darajasi oldidan doim \"the\" qo'yiladi.",
              ruleRu: 'Перед превосходной степенью прилагательных всегда ставится "the".',
              example: 'the best (eng yaxshi), the tallest (eng baland), the most beautiful',
              exampleRu: 'the best, the tallest, the most beautiful',
            },
            exercises: [
              { text: 'He is ___ tallest boy in the class.', options: ['a', 'an', 'the'], correct: 2, explanation: 'Orttirma daraja (tallest) oldidan: the tallest.' },
              { text: 'This is ___ best movie ever!', options: ['a', 'the', '-'], correct: 1, explanation: 'Orttirma daraja: the best.' },
            ],
          },
          {
            teach: {
              rule: "Tartib sonlar (first, second, third...) oldidan doim \"the\" ishlatiladi.",
              ruleRu: 'Перед порядковыми числительными всегда используется "the".',
              example: 'the first lesson (birinchi dars), the second floor (ikkinchi qavat)',
              exampleRu: 'the first lesson, the second floor',
            },
            exercises: [
              { text: 'We live on ___ third floor.', options: ['a', 'the', '-'], correct: 1, explanation: 'Tartib son (third) oldidan: the third.' },
              { text: 'Today is ___ first day of school.', options: ['a', 'the', 'an'], correct: 1, explanation: 'Tartib son: the first.' },
            ],
          },
          {
            teach: {
              rule: "Okean, dengiz, daryo va tog' tizmalari nomlari bilan \"the\" ishlatiladi.",
              ruleRu: 'С названиями океанов, морей, рек и горных цепей используется "the".',
              example: 'the Pacific Ocean, the Nile, the Amazon',
              exampleRu: 'the Pacific Ocean, the Nile',
            },
            exercises: [
              { text: '___ Nile is a long river.', options: ['A', 'The', '-'], correct: 1, explanation: 'Daryo nomlari oldidan: The Nile.' },
              { text: 'They sailed across ___ Atlantic Ocean.', options: ['a', 'the', '-'], correct: 1, explanation: 'Okean nomlari oldidan: the Atlantic Ocean.' },
            ],
          },
          {
            teach: {
              rule: '"the" ning maxsus holatlarini birlashtiramiz: musiqa asboblari / orttirma daraja / tartib sonlar.',
              ruleRu: 'Обобщим особые случаи: музыкальные инструменты / превосходная степень / порядковые числительные.',
              example: 'He is the best player, and he plays the guitar on the first floor.',
              exampleRu: 'He is the best player, and he plays the guitar.',
            },
            exercises: [
              { text: 'She is ___ most talented student.', options: ['a', 'the'], correct: 1, explanation: 'Orttirma daraja: the most.' },
              { text: 'Do you play ___ violin?', options: ['a', 'the'], correct: 1, explanation: 'Musiqa asbobi: the violin.' },
              { text: 'It is ___ second time I call you.', options: ['the', 'a'], correct: 0, explanation: 'Tartib son: the second.' },
            ],
          },
        ],
      },
      {
        id: 'sec-articles-l5',
        order: 5,
        title: 'Artikl ishlatilmaydigan holatlar',
        titleRu: 'Случаи без арктикля (Zero Article)',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: "Kishilarning ismlari, shahar va mamlakat nomlari oldidan artikl ISHLATILMAYDI.",
              ruleRu: 'Перед именами людей, названиями городов и стран артикль НЕ используется.',
              example: 'Tom, Tashkent, Uzbekistan, London, Japan',
              exampleRu: 'Tom, Tashkent, Uzbekistan, London',
            },
            exercises: [
              { text: 'I live in ___ Tashkent.', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Shahar nomlari oldidan artikl qo\'yilmaydi.' },
              { text: '___ Alex is my friend.', options: ['A', 'The', '- (no article)'], correct: 2, explanation: 'Kishi ismlari oldidan artikl ishlatilmaydi.' },
            ],
          },
          {
            teach: {
              rule: "Umumiy ma'noda aytilgan ko'plikdagi otlar va sanalmaydigan otlar oldidan artikl ishlatilmaydi.",
              ruleRu: 'Перед существительными во множественном числе и неисчисляемыми в общем смысле артикль НЕ используется.',
              example: 'I like cats. (Umuman mushuklarni). Water is good for health.',
              exampleRu: 'I like cats. Water is good for health.',
            },
            exercises: [
              { text: 'I like ___ apples. (in general)', options: ['an', 'the', '- (no article)'], correct: 2, explanation: 'Umumiy ma\'nodagi ko\'plik otlar oldida artikl bo\'lmaydi.' },
              { text: '___ milk is good for kids.', options: ['A', 'The', '- (no article)'], correct: 2, explanation: 'Umumiy ma\'nodagi sanalmaydigan ot: milk.' },
            ],
          },
          {
            teach: {
              rule: "Ovqatlanish vaqtlari (breakfast, lunch, dinner) hamda hafta kunlari / oylar oldidan artikl ISHLATILMAYDI.",
              ruleRu: 'Перед приемами пищи (breakfast, lunch, dinner), днями недели и месяцами артикль НЕ используется.',
              example: 'have breakfast, on Monday, in July',
              exampleRu: 'have breakfast, on Monday, in July',
            },
            exercises: [
              { text: 'We have ___ breakfast at 8 AM.', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Ovqat vaqti (breakfast) oldida artikl bo\'lmaydi.' },
              { text: 'See you on ___ Monday!', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Hafta kunlari oldida artikl ishlatilmaydi.' },
            ],
          },
          {
            teach: {
              rule: "Tillar, o'quv fanlari va sport turlari nomlari oldidan artikl ISHLATILMAYDI.",
              ruleRu: 'Перед названиями языков, учебных предметов и видов спорта артикль НЕ используется.',
              example: 'speak English, study Maths, play football',
              exampleRu: 'speak English, study Maths, play football',
            },
            exercises: [
              { text: 'I speak ___ English.', options: ['an', 'the', '- (no article)'], correct: 2, explanation: 'Til nomlari oldidan artikl qo\'yilmaydi.' },
              { text: 'They play ___ football after school.', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Sport turlari oldidan artikl ishlatilmaydi.' },
            ],
          },
          {
            teach: {
              rule: "Artikl ishlatilmaydigan holatlarni birlashtiramiz: ismlar, mamlakatlar, umumlashgan otlar, tillar, sport.",
              ruleRu: 'Обобщим случаи без артикля: имена, страны, общие понятия, языки, спорт.',
              example: 'Tom lives in Tashkent, speaks English, and plays football.',
              exampleRu: 'Tom lives in Tashkent, speaks English, and plays football.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I like football.', 'I like the football.'], correct: 0, explanation: 'Sport nomlarida artikl ishlatilmaydi.' },
              { text: 'She studies ___ history.', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Fan nomida artikl bo\'lmaydi.' },
              { text: 'Choose the correct sentence:', options: ['We live in Uzbekistan.', 'We live in a Uzbekistan.'], correct: 0, explanation: 'Mamlakat nomida artikl bo\'lmaydi.' },
            ],
          },
        ],
      },
      {
        id: 'sec-articles-l6',
        order: 6,
        title: 'Taqqoslash va umumiy amaliyot',
        titleRu: 'Сравнение и общая практика',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: '"a / an" (noaniq, bitta) vs "the" (aniq o\'sha narsa) taqqoslash.',
              ruleRu: 'Сравнение "a / an" (неопределенный) и "the" (конкретный).',
              example: 'I saw a dog (biror it). The dog barked at me (o\'sha it).',
              exampleRu: 'I saw a dog. The dog barked at me.',
            },
            exercises: [
              { text: 'Give me ___ apple from that basket.', options: ['an', 'the'], correct: 0, explanation: 'Istalgan bitta olma: an apple.' },
              { text: '___ apple you gave me was sweet.', options: ['An', 'The'], correct: 1, explanation: 'Aynan sen bergan o\'sha olma: The apple.' },
            ],
          },
          {
            teach: {
              rule: '"the" (aniq) vs "- (artiklsiz)" (umumiy) taqqoslash.',
              ruleRu: 'Сравнение "the" (конкретный) и "- (без артикля)" (в общем).',
              example: 'I like music (umuman musiqa). The music in this room is loud (shudagi musiqa).',
              exampleRu: 'I like music vs The music in this room is loud.',
            },
            exercises: [
              { text: 'I love ___ music.', options: ['the', '- (no article)'], correct: 1, explanation: 'Umuman musiqa haqida: no article.' },
              { text: '___ music of this movie is great.', options: ['The', '- (no article)'], correct: 0, explanation: 'Aynan shu kinoning musiqasi: The music.' },
            ],
          },
          {
            teach: {
              rule: 'To\'rtta variantli umumiy tanlov amaliyoti (a / an / the / -).',
              ruleRu: 'Практика выбора из 4 вариантов (a / an / the / -).',
              example: 'a cat, an egg, the sun, live in Paris',
              exampleRu: 'a cat, an egg, the sun, live in Paris',
            },
            exercises: [
              { text: 'He is ___ honest person.', options: ['a', 'an', 'the', '-'], correct: 1, explanation: 'honest [o] unli tovush: an honest person.' },
              { text: '___ sun rises in the east.', options: ['A', 'An', 'The', '-'], correct: 2, explanation: 'The sun.' },
            ],
          },
          {
            teach: {
              rule: "Murakkabroq gaplarda artikllarni to'g'ri tanlash mashqi.",
              ruleRu: 'Упражнение на выбор артиклей в более сложных предложениях.',
              example: 'She plays the piano and speaks English.',
              exampleRu: 'She plays the piano and speaks English.',
            },
            exercises: [
              { text: 'She plays ___ guitar very well.', options: ['a', 'the', '-'], correct: 1, explanation: 'Musiqa asbobi: the guitar.' },
              { text: 'We had ___ lunch at school.', options: ['a', 'the', '-'], correct: 2, explanation: 'Ovqat vaqti (lunch): no article.' },
            ],
          },
          {
            teach: {
              rule: 'Barcha artikl qoidalarining to\'liq yakuniy sinovi.',
              ruleRu: 'Итоговое обобщение всех правил артиклей.',
              example: 'I have a dog. The dog likes playing football.',
              exampleRu: 'I have a dog. The dog likes playing football.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I have a car. The car is red.', 'I have the car. A car is red.'], correct: 0, explanation: 'Birinchi a car, ikkinchi The car.' },
              { text: 'Choose the correct sentence:', options: ['He is an university student.', 'He is a university student.'], correct: 1, explanation: 'university [yu] undosh: a university.' },
              { text: 'Choose the correct sentence:', options: ['She lives in London.', 'She lives in the London.'], correct: 0, explanation: 'Shahar nomi: no article.' },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Artikllar (a / an / the)",
      titleRu: 'Тест раздела: Артикли (a / an / the)',
      exercises: [
        { text: 'I have ___ book.', options: ['a', 'an', 'the'], correct: 0, explanation: 'book [b] undosh tovush: a book.' },
        { text: 'She ate ___ apple.', options: ['a', 'an', 'the'], correct: 1, explanation: 'apple [æ] unli tovush: an apple.' },
        { text: 'I stayed for ___ hour.', options: ['a', 'an', '-'], correct: 1, explanation: 'hour [auə] unli tovush: an hour.' },
        { text: 'This is ___ university.', options: ['a', 'an', 'the'], correct: 0, explanation: 'university [yu] undosh tovush: a university.' },
        { text: 'I saw a dog. ___ dog was white.', options: ['A', 'An', 'The'], correct: 2, explanation: 'Qayta tilga olinganda: The dog.' },
        { text: 'Look at ___ sun!', options: ['a', 'an', 'the'], correct: 2, explanation: 'Dunyoda yagona: the sun.' },
        { text: 'She plays ___ piano.', options: ['a', 'the', '-'], correct: 1, explanation: 'Musiqa asbobi: the piano.' },
        { text: 'He is ___ best student.', options: ['a', 'the', '-'], correct: 1, explanation: 'Orttirma daraja: the best.' },
        { text: 'We live on ___ second floor.', options: ['a', 'the', '-'], correct: 1, explanation: 'Tartib son: the second.' },
        { text: 'I live in ___ Tashkent.', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Shahar nomida artikl bo\'lmaydi.' },
        { text: 'I like ___ cats. (in general)', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Umumiy ma\'nodagi ko\'plik: no article.' },
        { text: 'We speak ___ English.', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Til nomlarida artikl bo\'lmaydi.' },
        { text: 'They play ___ football.', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Sport nomlarida artikl bo\'lmaydi.' },
        { text: 'We have ___ breakfast at 8 AM.', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Ovqat vaqtida artikl bo\'lmaydi.' },
        { text: 'Choose the correct sentence:', options: ['The earth goes around the sun.', 'An earth goes around a sun.'], correct: 0, explanation: 'The earth, the sun.' },
      ],
    },
  },
  {
    id: 'sec-possessives-demonstratives',
    order: 5,
    title: "Ko'rsatish va Egalik olmoshlari",
    titleRu: 'Указательные и притяжательные местоимения',
    icon: '👉',
    lessons: [
      {
        id: 'sec-possessives-demonstratives-l1',
        order: 1,
        title: 'Birlikdagi ko\'rsatish: "this" va "that"',
        titleRu: 'Указание в ед. числе: "this" и "that"',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: '"this" — yaqinda turgan birlikdagi narsa yoki shaxsni ko\'rsatganda ishlatiladi ("bu").',
              ruleRu: '"this" используется для обозначения БЛИЗКОГО предмета или человека в единственном числе ("этот / эта / это").',
              example: 'This is my book. (Bu mening kitobim.)',
              exampleRu: 'This is my book. (Это моя книга.)',
            },
            exercises: [
              { text: 'Yaqiningizda turgan bitta narsani ko\'rsatsangiz, qaysi so\'zni ishlatasiz?', options: ['this', 'that', 'these'], correct: 0, explanation: 'Yaqindagi birlik narsa uchun: this.' },
              { text: '___ is a new phone. (holding in hand)', options: ['This', 'That', 'Those'], correct: 0, explanation: 'Qo\'lda ushlab turilgan (yaqin) narsa: This.' },
            ],
          },
          {
            teach: {
              rule: '"that" — uzoqda turgan birlikdagi narsa yoki shaxsni ko\'rsatganda ishlatiladi ("ana u / o\'sha").',
              ruleRu: '"that" используется для обозначения ДАЛЕКОГО предмета или человека в единственном числе ("тот / та / то").',
              example: 'That is a car over there. (Ana u mashina.)',
              exampleRu: 'That is a car over there. (Вон та машина.)',
            },
            exercises: [
              { text: 'Uzoqroqda turgan bitta narsani ko\'rsatsangiz, qaysi so\'zni ishlatasiz?', options: ['this', 'that', 'these'], correct: 1, explanation: 'Uzoqdagi birlik narsa uchun: that.' },
              { text: 'Look at ___ star in the sky!', options: ['this', 'that', 'these'], correct: 1, explanation: 'Osmondagi (uzoqdagi) yulduz: that.' },
            ],
          },
          {
            teach: {
              rule: '"this" va "that" doim "is" bilan birga keladi.',
              ruleRu: '"this" и "that" всегда используются с глаголом "is".',
              example: 'This is a pen. That is a house.',
              exampleRu: 'This is a pen. That is a house.',
            },
            exercises: [
              { text: 'This ___ my house.', options: ['am', 'is', 'are'], correct: 1, explanation: 'This + is.' },
              { text: 'That ___ a big tree.', options: ['am', 'is', 'are'], correct: 1, explanation: 'That + is.' },
            ],
          },
          {
            teach: {
              rule: "Savol shakli: Is this ...? / Is that ...?",
              ruleRu: 'Вопросительная форма: Is this ...? / Is that ...?',
              example: 'Is this your pen? Is that your car?',
              exampleRu: 'Is this your pen? Is that your car?',
            },
            exercises: [
              { text: '___ this your bag?', options: ['Am', 'Is', 'Are'], correct: 1, explanation: 'Is this...?' },
              { text: '___ that a new building?', options: ['Am', 'Is', 'Are'], correct: 1, explanation: 'Is that...?' },
            ],
          },
          {
            teach: {
              rule: '"this" (yaqin) va "that" (uzoq) qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим "this" (близко) и "that" (далеко).',
              example: 'This is my pen (here), and that is your pen (there).',
              exampleRu: 'This is my pen, and that is your pen.',
            },
            exercises: [
              { text: 'Choose the correct sentence for something near you:', options: ['This is my computer.', 'That is my computer.'], correct: 0, explanation: 'Yaqindagi narsa uchun: This.' },
              { text: 'Is ___ your jacket over there?', options: ['this', 'that'], correct: 1, explanation: 'over there (uzoqda): that.' },
              { text: 'Select the correct sentence:', options: ['That is a nice car.', 'That are a nice car.'], correct: 0, explanation: 'That + is.' },
            ],
          },
        ],
      },
      {
        id: 'sec-possessives-demonstratives-l2',
        order: 2,
        title: 'Ko\'plikdagi ko\'rsatish: "these" va "those"',
        titleRu: 'Указание во мн. числе: "these" и "those"',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: '"these" — yaqinda turgan KO\'PLIKdagi narsalarni ko\'rsatganda ishlatiladi ("bular").',
              ruleRu: '"these" используется для обозначения БЛИЗКИХ предметов во множественном числе ("эти").',
              example: 'These are my books. (Bular mening kitoblarim.)',
              exampleRu: 'These are my books. (Это мои книги.)',
            },
            exercises: [
              { text: 'Yaqiningizdagi ko\'p narsalarni ko\'rsatish uchun qaysi so\'z ishlatiladi?', options: ['this', 'these', 'those'], correct: 1, explanation: 'Yaqindagi ko\'plik uchun: these.' },
              { text: '___ are my keys. (in my hand)', options: ['This', 'These', 'Those'], correct: 1, explanation: 'Qo\'lda turgan ko\'plik narsalar: These.' },
            ],
          },
          {
            teach: {
              rule: '"those" — uzoqda turgan KO\'PLIKdagi narsalarni ko\'rsatganda ishlatiladi ("ana ular / o\'shalar").',
              ruleRu: '"those" используется для обозначения ДАЛЕКИХ предметов во множественном числе ("те").',
              example: 'Those are birds in the sky. (Ana ular qushlar.)',
              exampleRu: 'Those are birds in the sky. (Вон те птицы.)',
            },
            exercises: [
              { text: 'Uzoqdagi ko\'p narsalarni ko\'rsatish uchun qaysi so\'z ishlatiladi?', options: ['this', 'these', 'those'], correct: 2, explanation: 'Uzoqdagi ko\'plik uchun: those.' },
              { text: 'Look at ___ cars over there!', options: ['these', 'those', 'this'], correct: 1, explanation: 'Uzoqdagi ko\'plik: those.' },
            ],
          },
          {
            teach: {
              rule: '"these" va "those" doim "are" bilan birga keladi.',
              ruleRu: '"these" и "those" всегда используются с глаголом "are".',
              example: 'These are my friends. Those are old houses.',
              exampleRu: 'These are my friends. Those are old houses.',
            },
            exercises: [
              { text: 'These ___ my shoes.', options: ['is', 'are', 'am'], correct: 1, explanation: 'These + are.' },
              { text: 'Those ___ high mountains.', options: ['is', 'are', 'am'], correct: 1, explanation: 'Those + are.' },
            ],
          },
          {
            teach: {
              rule: "Savol shakli: Are these ...? / Are those ...?",
              ruleRu: 'Вопросительная форма: Are these ...? / Are those ...?',
              example: 'Are these your glasses? Are those your books?',
              exampleRu: 'Are these your glasses? Are those your books?',
            },
            exercises: [
              { text: '___ these your keys?', options: ['Is', 'Are', 'Am'], correct: 1, explanation: 'Are these...?' },
              { text: '___ those children playing?', options: ['Is', 'Are', 'Am'], correct: 1, explanation: 'Are those...?' },
            ],
          },
          {
            teach: {
              rule: 'Barcha 4 ta ko\'rsatish olmoshlarini solishtiramiz: this (birlik/yaqin), that (birlik/uzoq), these (ko\'plik/yaqin), those (ko\'plik/uzoq).',
              ruleRu: 'Сравниваем: this (ед./близко), that (ед./далеко), these (мн./близко), those (мн./далеко).',
              example: 'This book, that book, these books, those books.',
              exampleRu: 'This book, that book, these books, those books.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['These are my shoes.', 'This are my shoes.'], correct: 0, explanation: 'shoes ko\'plik: These are.' },
              { text: 'Look at ___ birds over there in the tree.', options: ['these', 'those'], correct: 1, explanation: 'over there (uzoqda): those.' },
              { text: 'Select the correct question:', options: ['Are those your books?', 'Is those your books?'], correct: 0, explanation: 'those + Are.' },
            ],
          },
        ],
      },
      {
        id: 'sec-possessives-demonstratives-l3',
        order: 3,
        title: 'Egalik olmoshlari: "my", "your", "his", "her"',
        titleRu: 'Притяжательные местоимения: "my", "your", "his", "her"',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: '"my" (mening) va "your" (seni/sizning) — biror narsa kimga tegishli ekanini ko\'rsatadi.',
              ruleRu: '"my" (мой/моя) и "your" (твой/ваш) — указывают на принадлежность.',
              example: 'my name (mening ismim), your bag (sizning sumkangiz)',
              exampleRu: 'my name, your bag',
            },
            exercises: [
              { text: '"mening" so\'zini ingliz tilida qanday aytamiz?', options: ['I', 'my', 'me'], correct: 1, explanation: '"mening" = my.' },
              { text: 'What is ___ name? (sizning)', options: ['you', 'your', 'yours'], correct: 1, explanation: '"sizning" = your.' },
            ],
          },
          {
            teach: {
              rule: '"his" (uning — erkak kishi uchun) va "her" (uning — ayol kishi uchun).',
              ruleRu: '"his" (его — для мужчин) и "her" (ее — для женщин).',
              example: 'his car (uning mashinasi - Tom\'s car), her book (uning kitobi - Anna\'s book)',
              exampleRu: 'his car, her book',
            },
            exercises: [
              { text: 'Tom and ___ father. (Tom va uning otasi)', options: ['his', 'her', 'its'], correct: 0, explanation: 'Tom (erkak) -> his.' },
              { text: 'Anna lost ___ phone. (Anna va uning telefoni)', options: ['his', 'her', 'its'], correct: 1, explanation: 'Anna (ayol) -> her.' },
            ],
          },
          {
            teach: {
              rule: "Egalik olmoshlaridan keyin DOIM ot kelishi kerak (yolg'iz ishlatilmaydi).",
              ruleRu: 'После притяжательных местоимений ВСЕГДА должно стоять существительное.',
              example: 'my book (to\'g\'ri), my (xato!)',
              exampleRu: 'my book, your car, his house',
            },
            exercises: [
              { text: 'Choose the correct option:', options: ['This is my bag.', 'This is I bag.'], correct: 0, explanation: 'Egalik uchun "my" ishlatiladi.' },
              { text: 'He likes ___ job.', options: ['he', 'his'], correct: 1, explanation: '"his job" (uning ishi).' },
            ],
          },
          {
            teach: {
              rule: "Egalik olmoshi kelganda ot oldidan \"a / an / the\" qo'yilmaydi!",
              ruleRu: 'С притяжательными местоимениями артикли "a / an / the" НЕ используются!',
              example: 'my book (my a book emas!)',
              exampleRu: 'my book, her car',
            },
            exercises: [
              { text: 'To\'g\'ri birikmani tanlang:', options: ['my car', 'my a car', 'a my car'], correct: 0, explanation: 'Egalik olmoshi yonida artikl ishlatilmaydi.' },
              { text: 'Choose the correct sentence:', options: ['This is her house.', 'This is her a house.'], correct: 0, explanation: 'her house.' },
            ],
          },
          {
            teach: {
              rule: '"my", "your", "his", "her" qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим "my", "your", "his", "her".',
              example: 'My name is Alex. This is my friend, and his name is John.',
              exampleRu: 'My name is Alex. This is my friend, and his name is John.',
            },
            exercises: [
              { text: 'She is driving ___ car.', options: ['his', 'her', 'its'], correct: 1, explanation: 'She (ayol) -> her car.' },
              { text: 'He loves ___ dog.', options: ['his', 'her', 'my'], correct: 0, explanation: 'He (erkak) -> his dog.' },
              { text: 'Select the correct sentence:', options: ['Your room is big.', 'You room is big.'], correct: 0, explanation: 'Your room (sizning xonangiz).' },
            ],
          },
        ],
      },
      {
        id: 'sec-possessives-demonstratives-l4',
        order: 4,
        title: 'Egalik olmoshlari: "its", "our", "their"',
        titleRu: 'Притяжательные местоимения: "its", "our", "their"',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: '"its" — narsa yoki hayvonning egaligini ko\'rsatadi ("uning").',
              ruleRu: '"its" — указывает на принадлежность предмета или животного ("его / ее").',
              example: 'The cat is drinking its milk. (Mushuk uning sütini ichyapti.)',
              exampleRu: 'The cat is drinking its milk.',
            },
            exercises: [
              { text: 'The dog is playing with ___ ball.', options: ['his', 'her', 'its'], correct: 2, explanation: 'dog (hayvon) -> its ball.' },
              { text: 'The city is famous for ___ parks.', options: ['his', 'its', 'their'], correct: 1, explanation: 'city (narsa/shahar) -> its parks.' },
            ],
          },
          {
            teach: {
              rule: 'Diqqat! "its" (egalik - apostrofsiz) va "it\'s" (it is - qisqartma) ni adashtirmang!',
              ruleRu: 'Внимание! Не путайте "its" (притяжательное) и "it\'s" (сокращение от it is)!',
              example: 'Its tail is long (uning dumi). It\'s a cat (u mushuk).',
              exampleRu: 'Its tail is long vs It\'s a cat.',
            },
            exercises: [
              { text: 'The bird is in ___ nest.', options: ['its', "it's"], correct: 0, explanation: 'Egalik uchun apostrofsiz "its" ishlatiladi.' },
              { text: '___ cold today.', options: ['Its', "It's"], correct: 1, explanation: 'It\'s cold (It is cold).' },
            ],
          },
          {
            teach: {
              rule: '"our" (bizning) — o\'zimiz kirgan guruhning egaligini ko\'rsatadi.',
              ruleRu: '"our" (наш/наша/наше/наши) — указывает на принадлежность нашей группы.',
              example: 'our house (bizning uyimiz), our school (bizning maktabimiz)',
              exampleRu: 'our house, our school',
            },
            exercises: [
              { text: 'We love ___ country.', options: ['we', 'our', 'us'], correct: 1, explanation: '"bizning" = our.' },
              { text: 'This is ___ classroom. (We study here)', options: ['our', 'their', 'your'], correct: 0, explanation: 'We study -> our classroom.' },
            ],
          },
          {
            teach: {
              rule: '"their" (ularning) — boshqa bir guruhning egaligini ko\'rsatadi.',
              ruleRu: '"their" (их) — указывает на принадлежность другой группы.',
              example: 'their parents (ularning ota-onasi), their car (ularning mashinasi)',
              exampleRu: 'their parents, their car',
            },
            exercises: [
              { text: 'They are doing ___ homework.', options: ['them', 'their', 'they'], correct: 1, explanation: '"ularning" = their.' },
              { text: 'The students love ___ teacher.', options: ['our', 'their', 'his'], correct: 1, explanation: 'students (they) -> their teacher.' },
            ],
          },
          {
            teach: {
              rule: '"its", "our", "their" qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим "its", "our", "their".',
              example: 'We like our house. They like their house. The cat likes its food.',
              exampleRu: 'We like our house. They like their house.',
            },
            exercises: [
              { text: 'We are clean. ___ hands are clean.', options: ['Our', 'Their'], correct: 0, explanation: 'We -> Our.' },
              { text: 'They are happy. ___ test results are great.', options: ['Our', 'Their'], correct: 1, explanation: 'They -> Their.' },
              { text: 'The tree lost ___ leaves.', options: ['its', "it's"], correct: 0, explanation: 'tree -> its leaves.' },
            ],
          },
        ],
      },
      {
        id: 'sec-possessives-demonstratives-l5',
        order: 5,
        title: 'Barcha egalik olmoshlarini jamlash va so\'rash',
        titleRu: 'Сводка притяжательных местоимений и вопрос "Whose"',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: 'Egalik olmoshlari jadvali: I→my, You→your, He→his, She→her, It→its, We→our, They→their.',
              ruleRu: 'Таблица: I→my, You→your, He→his, She→her, It→its, We→our, They→their.',
              example: 'I have a cat -> my cat; She has a car -> her car.',
              exampleRu: 'I have a cat -> my cat; She has a car -> her car.',
            },
            exercises: [
              { text: 'She has a dog. It is ___ dog.', options: ['she', 'her', 'hers'], correct: 1, explanation: 'She -> her.' },
              { text: 'They have a house. It is ___ house.', options: ['they', 'them', 'their'], correct: 2, explanation: 'They -> their.' },
            ],
          },
          {
            teach: {
              rule: '"Whose ...?" — kimning narsasi ekanligini so\'rash uchun ishlatiladi ("kimning?").',
              ruleRu: '"Whose ...?" — используется для вопроса о принадлежности ("чей / чья / чье / чьи?").',
              example: 'Whose book is this? (Bu kimning kitobi?)',
              exampleRu: 'Whose book is this?',
            },
            exercises: [
              { text: '___ phone is this?', options: ['Who', 'Whose', 'What'], correct: 1, explanation: 'Kimning ekanini so\'rashda: Whose.' },
              { text: '___ glasses are these?', options: ['Who', 'Whose', 'Where'], correct: 1, explanation: 'Kimning ko\'zoynagi: Whose.' },
            ],
          },
          {
            teach: {
              rule: "Javob berishda: It's my book. / They are her keys.",
              ruleRu: 'Ответы: It\'s my book. / They are her keys.',
              example: 'Whose car is this? It\'s his car.',
              exampleRu: 'Whose car is this? It\'s his car.',
            },
            exercises: [
              { text: 'Whose cat is this? It is ___ cat.', options: ['my', 'me', 'I'], correct: 0, explanation: 'my cat.' },
              { text: 'Whose shoes are these? They are ___ shoes.', options: ['he', 'his', 'him'], correct: 1, explanation: 'his shoes.' },
            ],
          },
          {
            teach: {
              rule: 'Ko\'rsatish va egalik olmoshlarini birga qo\'llaymiz: This is my... / Those are their...',
              ruleRu: 'Сочетаем указательные и притяжательные: This is my... / Those are their...',
              example: 'This is my bag. Those are her clothes.',
              exampleRu: 'This is my bag. Those are her clothes.',
            },
            exercises: [
              { text: '___ is my new car.', options: ['This', 'These'], correct: 0, explanation: 'car (birlik) -> This is.' },
              { text: '___ are our bags.', options: ['This', 'These'], correct: 1, explanation: 'bags (ko\'plik) -> These are.' },
            ],
          },
          {
            teach: {
              rule: "Egalik va ko'rsatish olmoshlari bo'yicha bilimlarni birlashtiramiz.",
              ruleRu: 'Обобщим знания об указательных и притяжательных местоимениях.',
              example: 'Whose keys are these? They are my keys.',
              exampleRu: 'Whose keys are these? They are my keys.',
            },
            exercises: [
              { text: 'Whose house is that? It is ___ house.', options: ['our', 'us'], correct: 0, explanation: 'our house.' },
              { text: 'Choose the correct question:', options: ['Whose pen is this?', 'Who pen is this?'], correct: 0, explanation: 'Whose pen...' },
              { text: 'Select the correct sentence:', options: ['Those are their books.', 'That are their books.'], correct: 0, explanation: 'books (ko\'plik) -> Those are.' },
            ],
          },
        ],
      },
      {
        id: 'sec-possessives-demonstratives-l6',
        order: 6,
        title: 'Taqqoslash va xatolarni tuzatish',
        titleRu: 'Сравнение и исправление ошибок',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: 'Shaxs olmoshlari (I, he, she) va Egalik olmoshlari (my, his, her) farqi: Shaxs olmoshi fe\'l oladi (She is), Egalik olmoshi ot oladi (Her bag).',
              ruleRu: 'Различие: Личные местоимения требуют глагол (She is), а Притяжательные требуют существительное (Her bag).',
              example: 'She is a doctor. Her bag is brown.',
              exampleRu: 'She is a doctor. Her bag is brown.',
            },
            exercises: [
              { text: '___ is a good student.', options: ['She', 'Her'], correct: 0, explanation: 'Fe\'l (is) kelmoqda: She is.' },
              { text: '___ book is on the table.', options: ['She', 'Her'], correct: 1, explanation: 'Ot (book) kelmoqda: Her book.' },
            ],
          },
          {
            teach: {
              rule: 'Tez-tez uchraydigan xatolar: "Her is doctor" (xato) ➔ "She is a doctor" (to\'g\'ri). "Him car" (xato) ➔ "His car" (to\'g\'ri).',
              ruleRu: 'Типичные ошибки: не путайте местоимения в роли подлежащего и притяжательные.',
              example: 'His name is Tom (to\'g\'ri). Him name is Tom (xato).',
              exampleRu: 'His name is Tom (правильно).',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['His name is Mark.', 'Him name is Mark.'], correct: 0, explanation: 'His name.' },
              { text: 'Choose the correct sentence:', options: ['Her is a teacher.', 'She is a teacher.'], correct: 1, explanation: 'She is.' },
            ],
          },
          {
            teach: {
              rule: '"this/that/these/those" va "it/they" ni to\'g\'ri ishlatish.',
              ruleRu: 'Правильное использование "this/that/these/those" и "it/they".',
              example: 'What is this? It\'s a pen. What are these? They are pens.',
              exampleRu: 'What is this? It\'s a pen. What are these? They are pens.',
            },
            exercises: [
              { text: 'What is this? ___ is a new laptop.', options: ['It', 'They'], correct: 0, explanation: 'birlik uchun: It is.' },
              { text: 'What are these? ___ are my keys.', options: ['It', 'They'], correct: 1, explanation: 'ko\'plik uchun: They are.' },
            ],
          },
          {
            teach: {
              rule: 'Aralash topshiriqlar bilan mustahkamlaymiz.',
              ruleRu: 'Закрепляем смешанными заданиями.',
              example: 'This is my brother. His name is Alex. Those are his toys.',
              exampleRu: 'This is my brother. His name is Alex.',
            },
            exercises: [
              { text: '___ is my sister. ___ name is Sarah.', options: ['She / Her', 'Her / She'], correct: 0, explanation: 'She is my sister. Her name is Sarah.' },
              { text: 'Look at ___ trees over there.', options: ['these', 'those'], correct: 1, explanation: 'over there (uzoqda): those.' },
            ],
          },
          {
            teach: {
              rule: 'Bo\'lim bo\'yicha barcha olmosh qoidalarining yakuniy sinovi.',
              ruleRu: 'Итоговое обобщение всех правил местоимений.',
              example: 'This is our house, and that is their car.',
              exampleRu: 'This is our house, and that is their car.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['This is my phone.', 'These is my phone.'], correct: 0, explanation: 'phone (birlik) -> This is.' },
              { text: 'Choose the correct sentence:', options: ['They love their school.', 'They love our school.'], correct: 0, explanation: 'They -> their.' },
              { text: 'Choose the correct sentence:', options: ['Whose book is this?', 'Who book is this?'], correct: 0, explanation: 'Whose book...' },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Ko'rsatish va Egalik olmoshlari",
      titleRu: 'Тест раздела: Указательные и притяжательные местоимения',
      exercises: [
        { text: '___ is my book. (in my hand)', options: ['This', 'That', 'Those'], correct: 0, explanation: 'Yaqindagi birlik: This.' },
        { text: 'Look at ___ star in the sky!', options: ['this', 'that', 'these'], correct: 1, explanation: 'Uzoqdagi birlik: that.' },
        { text: '___ are my keys. (holding in hand)', options: ['This', 'These', 'Those'], correct: 1, explanation: 'Yaqindagi ko\'plik: These.' },
        { text: 'Look at ___ cars over there!', options: ['these', 'those'], correct: 1, explanation: 'Uzoqdagi ko\'plik: those.' },
        { text: 'What is ___ name? (sizning)', options: ['you', 'your'], correct: 1, explanation: 'your name.' },
        { text: 'Tom and ___ father.', options: ['his', 'her'], correct: 0, explanation: 'Tom (erkak) -> his.' },
        { text: 'Anna lost ___ keys.', options: ['his', 'her'], correct: 1, explanation: 'Anna (ayol) -> her.' },
        { text: 'The dog is playing with ___ tail.', options: ['his', 'its', "it's"], correct: 1, explanation: 'dog -> its.' },
        { text: 'We love ___ school.', options: ['our', 'their'], correct: 0, explanation: 'We -> our.' },
        { text: 'They are doing ___ homework.', options: ['our', 'their'], correct: 1, explanation: 'They -> their.' },
        { text: '___ phone is this?', options: ['Who', 'Whose'], correct: 1, explanation: 'Kimning narsasi: Whose.' },
        { text: 'Choose the correct sentence:', options: ['This is my bag.', 'This is a my bag.'], correct: 0, explanation: 'Egalik olmoshi yonida artikl bo\'lmaydi.' },
        { text: 'Choose the correct sentence:', options: ['She is a doctor.', 'Her is a doctor.'], correct: 0, explanation: 'She is.' },
        { text: 'Choose the correct sentence:', options: ['Its name is Max.', "It's name is Max."], correct: 0, explanation: 'its name (egalik).' },
        { text: 'Choose the correct question:', options: ['Are those your books?', 'Is those your books?'], correct: 0, explanation: 'Are those.' },
      ],
    },
  },
  {
    id: 'sec-object-pronouns-there-is-are',
    order: 6,
    title: "To'ldiruvchi olmoshlar va There is / There are",
    titleRu: 'Объектные местоимения и конструкция There is / There are',
    icon: '📍',
    lessons: [
      {
        id: 'sec-object-pronouns-there-is-are-l1',
        order: 1,
        title: 'Birlikdagi to\'ldiruvchi olmoshlar: me, him, her, it',
        titleRu: 'Объектные местоимения ед. числа: me, him, her, it',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: 'To\'ldiruvchi olmoshlar fe\'ldan keyin kelib, harakat qaysi kishiga qaratilganini ko\'rsatadi. "me" (meni / menga), "you" (seni / senga).',
              ruleRu: 'Объектные местоимения стоят ПОСЛЕ глагола: "me" (меня / мне), "you" (тебя / вам).',
              example: 'Call me. (Menga qo\'ng\'iroq qil.) I see you. (Men seni ko\'ryapman.)',
              exampleRu: 'Call me. I see you.',
            },
            exercises: [
              { text: 'Can you help ___? (menga)', options: ['I', 'me', 'my'], correct: 1, explanation: 'Fe\'ldan keyin "me" ishlatiladi.' },
              { text: 'I am talking to ___. (senga)', options: ['you', 'your', 'yours'], correct: 0, explanation: 'To\'ldiruvchi olmoshi: you.' },
            ],
          },
          {
            teach: {
              rule: '"him" (uni / unga — erkak kishi uchun) va "her" (uni / unga — ayol kishi uchun).',
              ruleRu: '"him" (его / ему — мужской род) и "her" (ее / ей — женский род).',
              example: 'Look at him. (Unga qara - Tom). Listen to her. (Uni eshit - Anna).',
              exampleRu: 'Look at him. Listen to her.',
            },
            exercises: [
              { text: 'Do you know Tom? I know ___.', options: ['he', 'him', 'his'], correct: 1, explanation: 'Tom (erkak kishi, fe\'ldan keyin): him.' },
              { text: 'I like Sarah. I invited ___.', options: ['she', 'her', 'hers'], correct: 1, explanation: 'Sarah (ayol kishi, fe\'ldan keyin): her.' },
            ],
          },
          {
            teach: {
              rule: '"it" — narsa yoki hayvonga nisbatan to\'ldiruvchi o\'rnida ishlatiladi ("uni / unga").',
              ruleRu: '"it" используется для предметов и животных в роли дополнения ("его / ее").',
              example: 'I bought a new book. I read it every day.',
              exampleRu: 'I bought a new book. I read it every day.',
            },
            exercises: [
              { text: 'Where is your bag? I cannot find ___.', options: ['he', 'her', 'it'], correct: 2, explanation: 'bag (narsa) -> it.' },
              { text: 'The cake is delicious. Try ___!', options: ['it', 'him', 'them'], correct: 0, explanation: 'cake -> it.' },
            ],
          },
          {
            teach: {
              rule: "Fe'l + to'ldiruvchi olmoshi birikmalari: give me, help him, love her, see it.",
              ruleRu: 'Сочетания глагол + объектное местоимение.',
              example: 'Give me the pen. Help him with homework.',
              exampleRu: 'Give me the pen. Help him with homework.',
            },
            exercises: [
              { text: 'Please give ___ a glass of water. (menga)', options: ['I', 'me', 'my'], correct: 1, explanation: 'give me.' },
              { text: 'He needs help. Please help ___. (unga - erkak)', options: ['he', 'him', 'his'], correct: 1, explanation: 'help him.' },
            ],
          },
          {
            teach: {
              rule: 'Birlikdagi to\'ldiruvchi olmoshlarni birlashtiramiz: me, you, him, her, it.',
              ruleRu: 'Обобщим объектные местоимения единственного числа.',
              example: 'I see him, she sees me, and we love it.',
              exampleRu: 'I see him, she sees me, and we love it.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['Call me later.', 'Call I later.'], correct: 0, explanation: 'Call me.' },
              { text: 'Select the correct option:', options: ['Listen to her.', 'Listen to she.'], correct: 0, explanation: 'Listen to her.' },
              { text: 'Where is my pen? Give ___ to me.', options: ['it', 'him'], correct: 0, explanation: 'pen -> it.' },
            ],
          },
        ],
      },
      {
        id: 'sec-object-pronouns-there-is-are-l2',
        order: 2,
        title: 'Ko\'plikdagi to\'ldiruvchi: us, them va Predloglar',
        titleRu: 'Объектные местоимения мн. числа: us, them и предлоги',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: '"us" (bizni / bizga) — so\'zlovchi ham kirgan guruhga nisbatan harakat yo\'naltirilganda.',
              ruleRu: '"us" (нас / нам) — когда действие направлено на нашу группу.',
              example: 'Join us. (Bizga qo\'shiling.) He told us a story.',
              exampleRu: 'Join us. He told us a story.',
            },
            exercises: [
              { text: 'Come with ___! (biz bilan)', options: ['we', 'us', 'our'], correct: 1, explanation: 'with us.' },
              { text: 'They gave ___ some food. (bizga)', options: ['we', 'us', 'our'], correct: 1, explanation: 'gave us.' },
            ],
          },
          {
            teach: {
              rule: '"them" (ularni / ularga) — boshqa bir guruh shaxslar yoki ko\'plikdagi narsalarga nisbatan.',
              ruleRu: '"them" (их / им) — относится к другим людям или предметам во мн. числе.',
              example: 'Look at them. (Ularga qara.) I like these shoes, I want them.',
              exampleRu: 'Look at them. I want them.',
            },
            exercises: [
              { text: 'I have two brothers. I love ___.', options: ['they', 'them', 'their'], correct: 1, explanation: 'brothers -> them.' },
              { text: 'Where are the keys? I can\'t see ___.', options: ['they', 'them', 'it'], correct: 1, explanation: 'keys (ko\'plik) -> them.' },
            ],
          },
          {
            teach: {
              rule: 'Ega olmoshi (I, he, she) fe\'ldan OLDIN, To\'ldiruvchi olmoshi (me, him, her) fe\'ldan KEYIN keladi.',
              ruleRu: 'Именительное местоимение ДО глагола (He loves), объектное ПОСЛЕ глагола (loves her).',
              example: 'He (ega) loves her (to\'ldiruvchi). She (ega) loves him (to\'ldiruvchi).',
              exampleRu: 'He loves her. She loves him.',
            },
            exercises: [
              { text: '___ calls ___ every day. (U (erkak) unga (ayol) qo\'ng\'iroq qiladi)', options: ['He / her', 'Him / she', 'He / she'], correct: 0, explanation: 'Ega: He, To\'ldiruvchi: her.' },
              { text: '___ know ___. (Biz ularni taniymiz)', options: ['We / them', 'Us / them', 'We / they'], correct: 0, explanation: 'Ega: We, To\'ldiruvchi: them.' },
            ],
          },
          {
            teach: {
              rule: 'Predloglardan (with, for, about, to, from) keyin doim to\'ldiruvchi olmoshi keladi!',
              ruleRu: 'После предлогов (with, for, about, to, from) всегда используется объектное местоимение!',
              example: 'with me, for him, about her, to us, from them',
              exampleRu: 'with me, for him, about her, to us, from them',
            },
            exercises: [
              { text: 'This present is for ___. (sen uchun)', options: ['you', 'your'], correct: 0, explanation: 'for you.' },
              { text: 'She is talking about ___. (u haqda - erkak)', options: ['he', 'him'], correct: 1, explanation: 'about him.' },
            ],
          },
          {
            teach: {
              rule: 'Barcha to\'ldiruvchi olmoshlar: me, you, him, her, it, us, them.',
              ruleRu: 'Все объектные местоимения: me, you, him, her, it, us, them.',
              example: 'Look at us. Listen to them. Help me.',
              exampleRu: 'Look at us. Listen to them. Help me.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['She works with us.', 'She works with we.'], correct: 0, explanation: 'with us.' },
              { text: 'I bought chocolates for ___. (ular uchun)', options: ['them', 'they'], correct: 0, explanation: 'for them.' },
              { text: 'Choose the correct option:', options: ['Wait for me!', 'Wait for I!'], correct: 0, explanation: 'for me.' },
            ],
          },
        ],
      },
      {
        id: 'sec-object-pronouns-there-is-are-l3',
        order: 3,
        title: '"There is" — Birlikda joy/mavjudlik bildirish',
        titleRu: 'Конструкция "There is" — наличие в ед. числе',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: '"There is" — biror joyda BIRLIKdagi narsa yoki shaxs borligini bildiradi ("bor / mavjud").',
              ruleRu: '"There is" указывает на наличие ОДНОГО предмета или человека в определенном месте.',
              example: 'There is a book on the table. (Stol ustida kitob bor.)',
              exampleRu: 'There is a book on the table.',
            },
            exercises: [
              { text: 'Stol ustida bitta kompyuter borligini aytish uchun qaysi birini ishlatamiz?', options: ['There is', 'There are', 'It is'], correct: 0, explanation: 'Birlikdagi narsa borligida: There is.' },
              { text: '___ a cat in the garden.', options: ['There is', 'There are'], correct: 0, explanation: 'a cat (birlik) -> There is.' },
            ],
          },
          {
            teach: {
              rule: '"There is a..." / "There is an..." iboralari birlikdagi sanaladigan otlar bilan qo\'llaniladi.',
              ruleRu: '"There is a/an..." используется с исчисляемыми существительными в ед. числе.',
              example: 'There is an apple on the plate. There is a car outside.',
              exampleRu: 'There is an apple on the plate.',
            },
            exercises: [
              { text: 'There is ___ apple in the basket.', options: ['a', 'an', 'the'], correct: 1, explanation: 'apple [æ] unli tovush: an apple.' },
              { text: 'There is ___ phone on the desk.', options: ['a', 'an'], correct: 0, explanation: 'phone [f] undosh tovush: a phone.' },
            ],
          },
          {
            teach: {
              rule: "Sanalmaydigan otlar (water, milk, tea, money, cheese) bilan ham \"There is\" keladi.",
              ruleRu: 'С неисчисляемыми существительными (water, milk, money) также используется "There is".',
              example: 'There is water in the bottle. There is milk in the fridge.',
              exampleRu: 'There is water in the bottle.',
            },
            exercises: [
              { text: '___ water in the glass.', options: ['There is', 'There are'], correct: 0, explanation: 'water sanalmaydi -> There is.' },
              { text: '___ milk in the fridge.', options: ['There is', 'There are'], correct: 0, explanation: 'milk sanalmaydi -> There is.' },
            ],
          },
          {
            teach: {
              rule: "Inkor shakli: \"There is not\" yoki qisqa \"There isn't\" (\"yo'q\").",
              ruleRu: 'Отрицание: "There is not" или сокращенно "There isn\'t" ("нет").',
              example: 'There isn\'t a computer here. There is no water.',
              exampleRu: 'There isn\'t a computer here.',
            },
            exercises: [
              { text: '___ a TV in this room. (Televizor yo\'q)', options: ["There isn't", "There aren't"], correct: 0, explanation: 'birlik inkor: There isn\'t.' },
              { text: 'There ___ any sugar left.', options: ['is not', 'are not'], correct: 0, explanation: 'sugar sanalmaydi -> is not.' },
            ],
          },
          {
            teach: {
              rule: '"There is" va "There isn\'t" qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим "There is" и "There isn\'t".',
              example: 'There is a book on the desk, but there isn\'t a pen.',
              exampleRu: 'There is a book on the desk, but there isn\'t a pen.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['There is a car in front of the house.', 'There are a car in front of the house.'], correct: 0, explanation: 'a car -> There is.' },
              { text: 'There ___ some tea in the cup.', options: ['is', 'are'], correct: 0, explanation: 'tea sanalmaydi -> is.' },
              { text: 'Select the correct negative sentence:', options: ["There isn't a park here.", "There aren't a park here."], correct: 0, explanation: 'a park -> There isn\'t.' },
            ],
          },
        ],
      },
      {
        id: 'sec-object-pronouns-there-is-are-l4',
        order: 4,
        title: '"There are" — Ko\'plikda joy/mavjudlik bildirish',
        titleRu: 'Конструкция "There are" — наличие во мн. числе',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: '"There are" — biror joyda KO\'PLIKdagi narsalar yoki shaxslar borligini bildiradi.',
              ruleRu: '"There are" указывает на наличие НЕСКОЛЬКИХ предметов или людей.',
              example: 'There are three cars in the yard. (Hovlida uchta mashina bor.)',
              exampleRu: 'There are three cars in the yard.',
            },
            exercises: [
              { text: 'Xonada ikkita deraza borligini aytish uchun qaysi birini ishlatamiz?', options: ['There is', 'There are'], correct: 1, explanation: 'Ko\'plikdagi narsalar borligida: There are.' },
              { text: '___ many students in the library.', options: ['There is', 'There are'], correct: 1, explanation: 'many students (ko\'plik) -> There are.' },
            ],
          },
          {
            teach: {
              rule: '"There are" dan keyin keladigan ot doim ko\'plikda bo\'lishi kerak (-s/-es).',
              ruleRu: 'Существительное после "There are" всегда должно быть во множественном числе.',
              example: 'There are two chairs (to\'g\'ri). There are two chair (xato!).',
              exampleRu: 'There are two chairs.',
            },
            exercises: [
              { text: 'There are five ___ in the box.', options: ['apple', 'apples'], correct: 1, explanation: 'There are + ko\'plik: apples.' },
              { text: 'There are two ___ in the kitchen.', options: ['person', 'people'], correct: 1, explanation: 'person ning ko\'pligi: people.' },
            ],
          },
          {
            teach: {
              rule: '"There are some..." (bir qancha bor) iborasi darak gapda ko\'plik bilan keladi.',
              ruleRu: '"There are some..." используется в утвердительных предложениях во мн. числе.',
              example: 'There are some books on the shelf. (Soreda bir nechta kitob bor.)',
              exampleRu: 'There are some books on the shelf.',
            },
            exercises: [
              { text: '___ some apples on the table.', options: ['There is', 'There are'], correct: 1, explanation: 'apples (ko\'plik) -> There are.' },
              { text: 'There are ___ interesting pictures here.', options: ['some', 'a'], correct: 0, explanation: 'pictures ko\'plik -> some.' },
            ],
          },
          {
            teach: {
              rule: "Inkor shakli: \"There are not\" yoki qisqa \"There aren't\" (\"yo'q\").",
              ruleRu: 'Отрицание: "There are not" или сокращенно "There aren\'t" ("нет").',
              example: 'There aren\'t any books here. (Bu yerda hech qanday kitoblar yo\'q.)',
              exampleRu: 'There aren\'t any books here.',
            },
            exercises: [
              { text: '___ any cars in the street.', options: ["There isn't", "There aren't"], correct: 1, explanation: 'cars ko\'plik inkor: There aren\'t.' },
              { text: 'There ___ any shops nearby.', options: ['are not', 'is not'], correct: 0, explanation: 'shops ko\'plik -> are not.' },
            ],
          },
          {
            teach: {
              rule: '"There are" va "There aren\'t" qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим "There are" и "There aren\'t".',
              example: 'There are 20 students in the class, but there aren\'t any teachers.',
              exampleRu: 'There are 20 students in the class, but there aren\'t any teachers.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['There are two cats in the yard.', 'There is two cats in the yard.'], correct: 0, explanation: 'two cats -> There are.' },
              { text: 'There ___ many trees in the park.', options: ['are', 'is'], correct: 0, explanation: 'many trees -> are.' },
              { text: 'Select the correct negative sentence:', options: ["There aren't any chairs.", "There isn't any chairs."], correct: 0, explanation: 'chairs -> There aren\'t.' },
            ],
          },
        ],
      },
      {
        id: 'sec-object-pronouns-there-is-are-l5',
        order: 5,
        title: 'Savol berish: Is there...? / Are there...?',
        titleRu: 'Вопросы: Is there...? / Are there...?',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: '"Is there...?" — birlikdagi narsa bor-yo\'qligini so\'rash uchun fe\'l oldinga o\'tadi.',
              ruleRu: '"Is there...?" — вопрос о наличии ОДНОГО предмета.',
              example: 'Is there a park near here? — Yes, there is. / No, there isn\'t.',
              exampleRu: 'Is there a park near here?',
            },
            exercises: [
              { text: '___ a bank near your house?', options: ['Is there', 'Are there'], correct: 0, explanation: 'a bank (birlik) -> Is there...?' },
              { text: 'Is there a phone on the desk? — Yes, ___ .', options: ['there is', 'there are'], correct: 0, explanation: 'Birlik savolga javob: there is.' },
            ],
          },
          {
            teach: {
              rule: '"Are there any...?" — ko\'plikdagi narsalar bor-yo\'qligini so\'rash uchun.',
              ruleRu: '"Are there any...?" — вопрос о наличии НЕСКОЛЬКИХ предметов.',
              example: 'Are there any apples in the fridge? — Yes, there are. / No, there aren\'t.',
              exampleRu: 'Are there any apples in the fridge?',
            },
            exercises: [
              { text: '___ any shops near here?', options: ['Is there', 'Are there'], correct: 1, explanation: 'shops (ko\'plik) -> Are there...?' },
              { text: 'Are there any chairs? — No, ___ .', options: ["there isn't", "there aren't"], correct: 1, explanation: 'Ko\'plik savolga inkor: there aren\'t.' },
            ],
          },
          {
            teach: {
              rule: 'Joy predloglari (on, in, under, next to, behind) bilan birga qo\'llash.',
              ruleRu: 'Использование с предлогами места (on, in, under, next to, behind).',
              example: 'There is a key under the mat. There are shoes behind the door.',
              exampleRu: 'There is a key under the mat.',
            },
            exercises: [
              { text: 'There is a cat ___ the chair. (stul tagida)', options: ['under', 'on', 'in'], correct: 0, explanation: 'tagida = under.' },
              { text: 'There are books ___ the table. (stol ustida)', options: ['on', 'under', 'behind'], correct: 0, explanation: 'ustida = on.' },
            ],
          },
          {
            teach: {
              rule: '"There is/are" (mavjudlik) va "It is / They are" (tavsif) o\'rtasidagi farq.',
              ruleRu: 'Разница между "There is/are" (наличие) и "It is / They are" (описание).',
              example: 'There is a book on the table. It is very interesting.',
              exampleRu: 'There is a book on the table. It is very interesting.',
            },
            exercises: [
              { text: 'Look! ___ a new restaurant. ___ is very beautiful.', options: ['There is / It', 'It is / There'], correct: 0, explanation: 'Birinchi borligi (There is), ikkinchi sifatlanishi (It is).' },
              { text: '___ two cars in the street. ___ are white.', options: ['There are / They', 'They are / There'], correct: 0, explanation: 'There are (bor) / They (ular).' },
            ],
          },
          {
            teach: {
              rule: 'Savol va javob shakllarini to\'g\'ri tanlash amaliyoti.',
              ruleRu: 'Практика вопросов и ответов с "There is/are".',
              example: 'Is there any milk? Yes, there is. Are there any students? No, there aren\'t.',
              exampleRu: 'Is there any milk? Yes, there is.',
            },
            exercises: [
              { text: 'Choose the correct question:', options: ['Is there a computer in the office?', 'Are there a computer in the office?'], correct: 0, explanation: 'a computer -> Is there...?' },
              { text: 'Choose the correct question:', options: ['Are there any questions?', 'Is there any questions?'], correct: 0, explanation: 'questions -> Are there...?' },
              { text: 'Select the correct answer: Is there a hotel near here?', options: ['Yes, there is.', 'Yes, there are.'], correct: 0, explanation: 'Birlik savolga: Yes, there is.' },
            ],
          },
        ],
      },
      {
        id: 'sec-object-pronouns-there-is-are-l6',
        order: 6,
        title: 'Taqqoslash va umumiy amaliyot',
        titleRu: 'Сравнение и общая практика',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: 'To\'ldiruvchi olmoshlar (me/him/her) va Egalik olmoshlari (my/his/her) farqi: Egalik ot oladi (my book), To\'ldiruvchi fe\'l/predlog oladi (help me, with him).',
              ruleRu: 'Притяжательные берут существительное (my book), объектные берут глагол/предлог (help me, with him).',
              example: 'This is my book (egalik). Give it to me (to\'ldiruvchi).',
              exampleRu: 'This is my book. Give it to me.',
            },
            exercises: [
              { text: 'This is ___ cat. I love ___. (mening / uni)', options: ['my / it', 'me / it', 'my / its'], correct: 0, explanation: 'my cat / love it.' },
              { text: '___ name is Tom. Do you know ___? (uning / uni)', options: ['His / him', 'He / him', 'His / his'], correct: 0, explanation: 'His name / know him.' },
            ],
          },
          {
            teach: {
              rule: '"There is/are" bo\'yicha tez-tez uchraydigan xatolarni tuzatish.',
              ruleRu: 'Исправление частых ошибок в "There is/are".',
              example: 'There is 2 dogs ❌ ➔ There are 2 dogs ✅. There are a car ❌ ➔ There is a car ✅.',
              exampleRu: 'There are 2 dogs. There is a car.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['There are three books on the desk.', 'There is three books on the desk.'], correct: 0, explanation: 'three books -> There are.' },
              { text: 'Choose the correct sentence:', options: ['There is a lot of water in the bottle.', 'There are a lot of water in the bottle.'], correct: 0, explanation: 'water sanalmaydi -> There is.' },
            ],
          },
          {
            teach: {
              rule: 'Olmoshlar va "There is/are" gaplarini aralash qo\'llash.',
              ruleRu: 'Смешанные предложения с местоимениями и "There is/are".',
              example: 'There is a cat in the garden. Look at it!',
              exampleRu: 'There is a cat in the garden. Look at it!',
            },
            exercises: [
              { text: 'There are two boys outside. Do you see ___?', options: ['them', 'they', 'him'], correct: 0, explanation: 'two boys -> them.' },
              { text: 'There is a nice girl here. Ask ___ name.', options: ['her', 'she', 'him'], correct: 0, explanation: 'girl -> her name.' },
            ],
          },
          {
            teach: {
              rule: 'Kichik dialoglarda to\'ldiruvchi olmoshlar va "there is/are" ni to\'g\'ri tanlash.',
              ruleRu: 'Выбор местоимений и "there is/are" в диалогах.',
              example: '— Is there any coffee? — Yes, there is. Drink it!',
              exampleRu: '— Is there any coffee? — Yes, there is. Drink it!',
            },
            exercises: [
              { text: '— Are there any apples? — No, ___ aren\'t. Eat a banana instead.', options: ['there', 'they'], correct: 0, explanation: 'there aren\'t.' },
              { text: '— Where is Alex? — I am waiting for ___ .', options: ['him', 'he'], correct: 0, explanation: 'for him.' },
            ],
          },
          {
            teach: {
              rule: 'Bo\'lim bo\'yicha barcha qoidalarning yakuniy sinovi.',
              ruleRu: 'Итоговое обобщение всех правил раздела.',
              example: 'There is a book on the table. Give it to me.',
              exampleRu: 'There is a book on the table. Give it to me.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['There are many trees in our yard.', 'There is many trees in our yard.'], correct: 0, explanation: 'many trees -> There are.' },
              { text: 'Choose the correct sentence:', options: ['Listen to him.', 'Listen to he.'], correct: 0, explanation: 'Listen to him.' },
              { text: 'Choose the correct sentence:', options: ['Is there a phone on the table?', 'Are there a phone on the table?'], correct: 0, explanation: 'a phone -> Is there...?' },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: To'ldiruvchi olmoshlar va There is / There are",
      titleRu: 'Тест раздела: Объектные местоимения и There is / There are',
      exercises: [
        { text: 'Please call ___. (menga)', options: ['me', 'I', 'my'], correct: 0, explanation: 'Call me.' },
        { text: 'Do you know Tom? I like ___.', options: ['he', 'him', 'his'], correct: 1, explanation: 'Tom -> him.' },
        { text: 'I bought a new book. I read ___ every day.', options: ['it', 'him', 'her'], correct: 0, explanation: 'book -> it.' },
        { text: 'Come with ___! (biz bilan)', options: ['we', 'us', 'our'], correct: 1, explanation: 'with us.' },
        { text: 'Where are the keys? I cannot find ___.', options: ['they', 'them', 'their'], correct: 1, explanation: 'keys -> them.' },
        { text: '___ a cat on the roof.', options: ['There is', 'There are'], correct: 0, explanation: 'a cat -> There is.' },
        { text: '___ three apples in the fridge.', options: ['There is', 'There are'], correct: 1, explanation: 'three apples -> There are.' },
        { text: '___ water in the glass.', options: ['There is', 'There are'], correct: 0, explanation: 'water (sanalmaydi) -> There is.' },
        { text: '___ a computer in the room. (yo\'q)', options: ["There isn't", "There aren't"], correct: 0, explanation: 'a computer -> There isn\'t.' },
        { text: 'There aren\'t ___ chairs in this classroom.', options: ['any', 'a'], correct: 0, explanation: 'ko\'plik inkor: any chairs.' },
        { text: '___ a bank near here?', options: ['Is there', 'Are there'], correct: 0, explanation: 'a bank -> Is there...?' },
        { text: '___ any questions?', options: ['Is there', 'Are there'], correct: 1, explanation: 'questions -> Are there...?' },
        { text: 'This present is for ___. (u uchun - ayol)', options: ['her', 'she'], correct: 0, explanation: 'for her.' },
        { text: 'Choose the correct sentence:', options: ['There are two dogs in the garden.', 'There is two dogs in the garden.'], correct: 0, explanation: 'two dogs -> There are.' },
        { text: 'Choose the correct sentence:', options: ['Look at them!', 'Look at they!'], correct: 0, explanation: 'Look at them.' },
      ],
    },
  },
  {
    id: 'sec-present-simple',
    order: 7,
    title: 'Present Simple Zamoni (Oddiy Hozirgi Zamon)',
    titleRu: 'Настоящее простое время (Present Simple)',
    icon: '⏳',
    lessons: [
      {
        id: 'sec-present-simple-l1',
        order: 1,
        title: 'Present Simple va Darak gaplar (I, you, we, they)',
        titleRu: 'Present Simple и утв. предложения (I, you, we, they)',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: 'Present Simple — doimiy takrorlanadigan ish-harakatlar, odatlar va umumiy haqiqatlar uchun ishlatiladi.',
              ruleRu: 'Present Simple используется для регулярных действий, привычек и общих фактов.',
              formula: 'Subject (I/You/We/They) + Verb (V1) + Complement',
              example: 'I work every day. (Men har kuni ishlayman.) We live in Tashkent.',
              exampleRu: 'I work every day. We live in Tashkent.',
            },
            exercises: [
              { text: '"I, you, we, they" bilan fe\'l qanday ko\'rinishda keladi?', options: ['Bosh shaklida (V1)', '-s qo\'shimchasi bilan', '-ing qo\'shimchasi bilan'], correct: 0, explanation: 'I, you, we, they bilan fe\'l o\'zgarishsiz keladi.' },
              { text: 'I ___ English every evening.', options: ['study', 'studies', 'studying'], correct: 0, explanation: 'I + study (bosh shakl).' },
            ],
          },
          {
            teach: {
              rule: 'Vaqt iboralari: every day (har kuni), every morning, on Mondays, in the evening.',
              ruleRu: 'Указатели времени: every day, every morning, on Mondays.',
              formula: 'Subject (I/We/They) + Verb (V1) + every day / on Sundays',
              example: 'They play football on Sundays. (Ular yakshanba kunlari futbol o\'ynashadi.)',
              exampleRu: 'They play football on Sundays.',
            },
            exercises: [
              { text: 'We ___ coffee every morning.', options: ['drink', 'drinks', 'drinking'], correct: 0, explanation: 'We + drink.' },
              { text: 'They ___ in Tashkent.', options: ['live', 'lives'], correct: 0, explanation: 'They + live.' },
            ],
          },
          {
            teach: {
              rule: 'Kundalik odatlar va sevimli mashg\'ulotlarni aytish.',
              ruleRu: 'Выражение привычек и увлечений.',
              formula: 'I / You + Verb (V1) + Detail',
              example: 'You speak English very well. I get up at 7 AM.',
              exampleRu: 'You speak English very well. I get up at 7 AM.',
            },
            exercises: [
              { text: 'You ___ English very well.', options: ['speak', 'speaks'], correct: 0, explanation: 'You + speak.' },
              { text: 'I ___ up at 7 o\'clock every day.', options: ['get', 'gets'], correct: 0, explanation: 'I + get.' },
            ],
          },
          {
            teach: {
              rule: 'Ega va fe\'l mosligini tekshirish (I/You/We/They + V1).',
              ruleRu: 'Проверка согласования подлежащего и глагола.',
              formula: 'We / They + Verb (V1)',
              example: 'They read books. We go to school.',
              exampleRu: 'They read books. We go to school.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['They like music.', 'They likes music.'], correct: 0, explanation: 'They + like.' },
              { text: 'Choose the correct sentence:', options: ['We go to school by bus.', 'We goes to school by bus.'], correct: 0, explanation: 'We + go.' },
            ],
          },
          {
            teach: {
              rule: 'Darak gaplar qoidalarini birlashtiramiz (I, you, we, they).',
              ruleRu: 'Обобщим утвердительные предложения.',
              formula: 'Subject (I / You / We / They) + Main Verb (V1)',
              example: 'I get up early, we drink tea, and they play football.',
              exampleRu: 'I get up early, we drink tea, and they play football.',
            },
            exercises: [
              { text: 'I ___ in a big company.', options: ['work', 'works'], correct: 0, explanation: 'I work.' },
              { text: 'You ___ fast.', options: ['run', 'runs'], correct: 0, explanation: 'You run.' },
              { text: 'Choose the correct sentence:', options: ['They eat breakfast at 8 AM.', 'They eats breakfast at 8 AM.'], correct: 0, explanation: 'They eat.' },
            ],
          },
        ],
      },
      {
        id: 'sec-present-simple-l2',
        order: 2,
        title: '3-shaxs birlikda -s va -es qoidalari (he, she, it)',
        titleRu: 'Окончания -s и -es для 3-го лица (he, she, it)',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: '3-shaxs birlikda (he, she, it) fe\'lga "-s" qo\'shimchasi qo\'shiladi.',
              ruleRu: 'В 3-ем лице единственного числа (he, she, it) к глаголу добавляется "-s".',
              formula: 'Subject (He / She / It) + Verb (+s/-es) + Complement / Modifier',
              example: 'He works in a bank. She lives in London. It rains a lot.',
              exampleRu: 'He works in a bank. She lives in London.',
            },
            exercises: [
              { text: 'He ___ in a bank.', options: ['work', 'works', 'working'], correct: 1, explanation: 'He (3-shaxs) -> works.' },
              { text: 'She ___ English.', options: ['know', 'knows'], correct: 1, explanation: 'She (3-shaxs) -> knows.' },
            ],
          },
          {
            teach: {
              rule: 'Fe\'l -ch, -sh, -ss, -x, -o bilan tugasa, "-es" qo\'shiladi.',
              ruleRu: 'Если глагол оканчивается на -ch, -sh, -ss, -x, -o, добавляется "-es".',
              formula: 'Subject (He / She / It) + Verb (-ch/-sh/-ss/-x/-o) + -es',
              example: 'watch -> watches, wash -> washes, go -> goes, do -> does',
              exampleRu: 'watch -> watches, go -> goes',
            },
            exercises: [
              { text: 'He ___ TV every evening. (watch)', options: ['watchs', 'watches', 'watch'], correct: 1, explanation: 'watch + -es -> watches.' },
              { text: 'She ___ to school by bus. (go)', options: ['gos', 'goes', 'go'], correct: 1, explanation: 'go + -es -> goes.' },
            ],
          },
          {
            teach: {
              rule: 'Undosh + "y" bilan tugasa, "y -> ies" o\'zgaradi. Unli + "y" bo\'lsa shunchaki "-s" qo\'shiladi.',
              ruleRu: 'Согласная + "y" меняется на "ies" (study -> studies). Гласная + "y" + "-s" (play -> plays).',
              formula: 'Consonant + y ➔ -ies  |  Vowel + y ➔ -ys',
              example: 'study -> studies, fly -> flies; play -> plays, buy -> buys',
              exampleRu: 'study -> studies; play -> plays',
            },
            exercises: [
              { text: 'Tom ___ history at university. (study)', options: ['studys', 'studies', 'study'], correct: 1, explanation: 'study -> studies.' },
              { text: 'He ___ tennis on Saturdays. (play)', options: ['plays', 'plaies', 'play'], correct: 0, explanation: 'play unli+y -> plays.' },
            ],
          },
          {
            teach: {
              rule: '"have" fe\'li 3-shaxsda "has" ga o\'zgaradi.',
              ruleRu: 'Глагол "have" в 3-ем лице меняется на "has".',
              formula: 'Subject (He / She / It) + has + Complement / Modifier',
              example: 'I have a car. -> He has a car. She has a cat.',
              exampleRu: 'He has a car. She has a cat.',
            },
            exercises: [
              { text: 'She ___ a new computer.', options: ['have', 'has', 'haves'], correct: 1, explanation: 'She (3-shaxs) -> has.' },
              { text: 'Tom ___ a big house.', options: ['has', 'have'], correct: 0, explanation: 'Tom -> has.' },
            ],
          },
          {
            teach: {
              rule: '3-shaxs birlik qoidalarini birlashtiramiz (works, goes, studies, has).',
              ruleRu: 'Обобщим правила 3-го лица.',
              formula: 'Subject (He / She / It) + Verb (+s/-es/-ies) + Complement / Modifier',
              example: 'He works hard, she goes to school, and he has a car.',
              exampleRu: 'He works hard, she goes to school, and he has a car.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['She lives in Tashkent.', 'She live in Tashkent.'], correct: 0, explanation: 'She lives.' },
              { text: 'Choose the correct sentence:', options: ['He washes his car.', 'He washs his car.'], correct: 0, explanation: 'wash -> washes.' },
              { text: 'Choose the correct sentence:', options: ['Anna has two brothers.', 'Anna haves two brothers.'], correct: 0, explanation: 'Anna has.' },
            ],
          },
        ],
      },
      {
        id: 'sec-present-simple-l3',
        order: 3,
        title: 'Inkor gaplar: "don\'t" (I, you, we, they)',
        titleRu: 'Отрицание: "don\'t" (I, you, we, they)',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: '"I, you, we, they" bilan inkor gap yasash uchun fe\'ldan oldin "don\'t" (do not) qo\'yiladi.',
              ruleRu: 'Отрицание для I, you, we, they образуется с помощью "don\'t" + глагол.',
              formula: 'Subject (I / You / We / They) + don\'t + Verb (V1) + Complement / Modifier',
              example: 'I don\'t like coffee. (Men kofeni yoqtirmayman.)',
              exampleRu: 'I don\'t like coffee.',
            },
            exercises: [
              { text: 'I ___ eat meat.', options: ["don't", "doesn't", "not"], correct: 0, explanation: 'I + don\'t.' },
              { text: 'We ___ live in London.', options: ["don't", "doesn't"], correct: 0, explanation: 'We + don\'t.' },
            ],
          },
          {
            teach: {
              rule: '"don\'t" dan keyin fe\'l doim o\'zining bosh shaklida keladi.',
              ruleRu: 'После "don\'t" глагол всегда стоит в начальной форме.',
              formula: 'Subject + don\'t + Verb (V1) + Complement / Modifier',
              example: 'They don\'t work on Sundays. You don\'t know him.',
              exampleRu: 'They don\'t work on Sundays.',
            },
            exercises: [
              { text: 'They don\'t ___ football.', options: ['play', 'plays', 'playing'], correct: 0, explanation: 'don\'t + play (bosh shakl).' },
              { text: 'You don\'t ___ early.', options: ['wake up', 'wakes up'], correct: 0, explanation: 'don\'t + wake up.' },
            ],
          },
          {
            teach: {
              rule: 'Kundalik inkor fikrlarni bildirish.',
              ruleRu: 'Выражение повседневных отрицаний.',
              formula: 'Subject + don\'t + Verb (V1) + Complement',
              example: 'I don\'t smoke. We don\'t have a dog.',
              exampleRu: 'I don\'t smoke. We don\'t have a dog.',
            },
            exercises: [
              { text: 'I don\'t ___ a car.', options: ['have', 'has'], correct: 0, explanation: 'don\'t + have.' },
              { text: 'We don\'t ___ TV.', options: ['watch', 'watches'], correct: 0, explanation: 'don\'t + watch.' },
            ],
          },
          {
            teach: {
              rule: 'Darak va inkor gaplarni taqqoslash (I work -> I don\'t work).',
              ruleRu: 'Сравнение утверждений и отрицаний.',
              formula: 'Affirmative: Verb (V1)  |  Negative: don\'t + Verb (V1)',
              example: 'I like tea, but I don\'t like coffee.',
              exampleRu: 'I like tea, but I don\'t like coffee.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I don\'t speak Spanish.', 'I not speak Spanish.'], correct: 0, explanation: 'don\'t speak.' },
              { text: 'Choose the correct sentence:', options: ['They don\'t understand.', 'They doesn\'t understand.'], correct: 0, explanation: 'They don\'t.' },
            ],
          },
          {
            teach: {
              rule: '"don\'t" inkor qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим использование "don\'t".',
              formula: 'Subject (I / You / We / They) + don\'t + Verb (V1)',
              example: 'I don\'t drink coffee, and we don\'t work on weekends.',
              exampleRu: 'I don\'t drink coffee, and we don\'t work on weekends.',
            },
            exercises: [
              { text: 'We ___ know the answer.', options: ["don't", "doesn't"], correct: 0, explanation: 'We don\'t.' },
              { text: 'They ___ like fast food.', options: ["don't", "doesn't"], correct: 0, explanation: 'They don\'t.' },
              { text: 'Select the correct sentence:', options: ['I don\'t have time.', 'I no have time.'], correct: 0, explanation: 'I don\'t have time.' },
            ],
          },
        ],
      },
      {
        id: 'sec-present-simple-l4',
        order: 4,
        title: 'Inkor gaplar: "doesn\'t" (he, she, it)',
        titleRu: 'Отрицание: "doesn\'t" (he, she, it)',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: '"he, she, it" bilan inkor gap yasash uchun fe\'ldan oldin "doesn\'t" (does not) qo\'yiladi.',
              ruleRu: 'Отрицание для he, she, it образуется с помощью "doesn\'t" + глагол.',
              formula: 'Subject (He / She / It) + doesn\'t + Verb (V1) + Complement / Modifier',
              example: 'He doesn\'t work here. (U bu yerda ishlamaydi.)',
              exampleRu: 'He doesn\'t work here.',
            },
            exercises: [
              { text: 'He ___ like milk.', options: ["don't", "doesn't", "not"], correct: 1, explanation: 'He + doesn\'t.' },
              { text: 'She ___ live in Paris.', options: ["don't", "doesn't"], correct: 1, explanation: 'She + doesn\'t.' },
            ],
          },
          {
            teach: {
              rule: 'MUHIM QOIDA! "doesn\'t" kelganda fe\'ldan "-s / -es" qo\'shimchasi TUSHIB QOLADI!',
              ruleRu: 'ВАЖНОЕ ПРАВИЛО! При "doesn\'t" окончание "-s / -es" у глагола ИСЧЕЗАЕТ!',
              formula: 'Subject + doesn\'t + Verb (V1 without -s)',
              example: 'He works -> He doesn\'t work. She goes -> She doesn\'t go.',
              exampleRu: 'He works -> He doesn\'t work.',
            },
            exercises: [
              { text: 'She doesn\'t ___ TV.', options: ['watch', 'watches'], correct: 0, explanation: 'doesn\'t dan keyin fe\'lda -es bo\'lmaydi: watch.' },
              { text: 'He doesn\'t ___ fast.', options: ['run', 'runs'], correct: 0, explanation: 'doesn\'t + run.' },
            ],
          },
          {
            teach: {
              rule: '"has" fe\'li inkor bo\'lganda "doesn\'t have" ga aylanadi (doesn\'t has emas!).',
              ruleRu: 'Форма "has" в отрицании меняется на "doesn\'t have" (НЕ doesn\'t has!).',
              formula: 'Subject (He / She / It) + doesn\'t have + Complement',
              example: 'He has a car. -> He doesn\'t have a car.',
              exampleRu: 'He doesn\'t have a car.',
            },
            exercises: [
              { text: 'Tom doesn\'t ___ a bicycle.', options: ['have', 'has'], correct: 0, explanation: 'doesn\'t + have.' },
              { text: 'She doesn\'t ___ any money.', options: ['have', 'has'], correct: 0, explanation: 'doesn\'t + have.' },
            ],
          },
          {
            teach: {
              rule: '"don\'t" va "doesn\'t" ni taqqoslash (I don\'t vs He doesn\'t).',
              ruleRu: 'Сравнение "don\'t" и "doesn\'t".',
              formula: 'I/You/We/They + don\'t  |  He/She/It + doesn\'t',
              example: 'I don\'t know, but he doesn\'t care.',
              exampleRu: 'I don\'t know, but he doesn\'t care.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['He doesn\'t like tea.', 'He don\'t like tea.'], correct: 0, explanation: 'He doesn\'t.' },
              { text: 'Choose the correct sentence:', options: ['She doesn\'t work on Saturdays.', 'She doesn\'t works on Saturdays.'], correct: 0, explanation: 'doesn\'t work (qo\'shimchasiz).' },
            ],
          },
          {
            teach: {
              rule: '"doesn\'t" inkor qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим использование "doesn\'t".',
              formula: 'Subject (He / She / It) + doesn\'t + Verb (V1)',
              example: 'She doesn\'t speak French, and he doesn\'t have a car.',
              exampleRu: 'She doesn\'t speak French, and he doesn\'t have a car.',
            },
            exercises: [
              { text: 'Sarah ___ drink coffee.', options: ["doesn't", "don't"], correct: 0, explanation: 'Sarah (she) -> doesn\'t.' },
              { text: 'The cat ___ eat cheese.', options: ["doesn't", "don't"], correct: 0, explanation: 'cat (it) -> doesn\'t.' },
              { text: 'Select the correct sentence:', options: ['He doesn\'t study at night.', 'He doesn\'t studies at night.'], correct: 0, explanation: 'doesn\'t study.' },
            ],
          },
        ],
      },
      {
        id: 'sec-present-simple-l5',
        order: 5,
        title: 'Umumiy so\'roq gaplar: "Do ...?" (I, you, we, they)',
        titleRu: 'Общие вопросы: "Do ...?" (I, you, we, they)',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: '"I, you, we, they" bilan savol berish uchun gap boshiga "Do" o\'tadi.',
              ruleRu: 'Вопрос для I, you, we, they начинается с "Do".',
              formula: 'Do + Subject (I / You / We / They) + Verb (V1) + Complement / Modifier ?',
              example: 'Do you speak English? (Inglizcha gapirasizmi?) Do they live here?',
              exampleRu: 'Do you speak English? Do they live here?',
            },
            exercises: [
              { text: '___ you like music?', options: ['Do', 'Does', 'Are'], correct: 0, explanation: 'Do you...?' },
              { text: '___ they work together?', options: ['Do', 'Does'], correct: 0, explanation: 'Do they...?' },
            ],
          },
          {
            teach: {
              rule: 'Qisqa tasdiq va inkor javoblar: Yes, I do. / No, I don\'t.',
              ruleRu: 'Краткие ответы: Yes, I do. / No, I don\'t.',
              formula: 'Yes, I/you/we/they do   |   No, I/you/we/they don\'t',
              example: 'Do you speak English? — Yes, I do. / No, I don\'t.',
              exampleRu: 'Do you speak English? — Yes, I do.',
            },
            exercises: [
              { text: 'Do you like pizza? — Yes, I ___ .', options: ['do', 'does', 'am'], correct: 0, explanation: 'Yes, I do.' },
              { text: 'Do they live in London? — No, they ___ .', options: ["don't", "doesn't"], correct: 0, explanation: 'No, they don\'t.' },
            ],
          },
          {
            teach: {
              rule: 'Kundalik suhbat savollari: Do you know...? / Do you have...?',
              ruleRu: 'Повседневные вопросы: Do you know...? / Do you have...?',
              formula: 'Do you + know / have / like ... ?',
              example: 'Do you know Alex? Do you have a pen?',
              exampleRu: 'Do you know Alex? Do you have a pen?',
            },
            exercises: [
              { text: 'Do you ___ a car?', options: ['have', 'has'], correct: 0, explanation: 'Do you + have.' },
              { text: 'Do we ___ time?', options: ['have', 'has'], correct: 0, explanation: 'Do we + have.' },
            ],
          },
          {
            teach: {
              rule: 'Savol gap tuzilishida so\'z tartibi: Do + Ega + Fe\'l (V1)?',
              ruleRu: 'Порядок слов: Do + Подлежащее + Глагол?',
              formula: 'Do + Subject + Verb (V1) + Object ?',
              example: 'Do you study every day?',
              exampleRu: 'Do you study every day?',
            },
            exercises: [
              { text: 'Choose the correct question:', options: ['Do you play football?', 'You do play football?'], correct: 0, explanation: 'Do + ega + fe\'l.' },
              { text: 'Choose the correct question:', options: ['Do they understand?', 'Does they understand?'], correct: 0, explanation: 'Do they.' },
            ],
          },
          {
            teach: {
              rule: '"Do" so\'roq qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим вопросы с "Do".',
              formula: 'Do + Subject (I / You / We / They) + Verb ?',
              example: 'Do you work here? Yes, I do.',
              exampleRu: 'Do you work here? Yes, I do.',
            },
            exercises: [
              { text: '___ you drink tea in the morning?', options: ['Do', 'Does'], correct: 0, explanation: 'Do you...' },
              { text: 'Do they know the rules? — Yes, they ___ .', options: ['do', 'does'], correct: 0, explanation: 'Yes, they do.' },
              { text: 'Select the correct question:', options: ['Do we need help?', 'Does we need help?'], correct: 0, explanation: 'Do we...' },
            ],
          },
        ],
      },
      {
        id: 'sec-present-simple-l6',
        order: 6,
        title: '3-shaxs so\'roq gaplar: "Does ...?" (he, she, it)',
        titleRu: 'Вопросы 3-го лица: "Does ...?" (he, she, it)',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: '"he, she, it" bilan savol berish uchun gap boshiga "Does" o\'tadi.',
              ruleRu: 'Вопрос для he, she, it начинается с "Does".',
              formula: 'Does + Ega (He / She / It) + Fe\'l (V1 - qo\'shimchasiz) ?',
              example: 'Does he work here? (U bu yerda ishlaydimi?) Does she speak English?',
              exampleRu: 'Does he work here? Does she speak English?',
            },
            exercises: [
              { text: '___ he live in Tashkent?', options: ['Do', 'Does', 'Is'], correct: 1, explanation: 'Does he...?' },
              { text: '___ she like coffee?', options: ['Do', 'Does'], correct: 1, explanation: 'Does she...?' },
            ],
          },
          {
            teach: {
              rule: 'MUHIM QOIDA! "Does" bo\'lganda fe\'ldagi "-s / -es" qo\'shimchasi YO\'QOLADI!',
              ruleRu: 'ВАЖНОЕ ПРАВИЛО! При "Does" окончание "-s / -es" у глагола ИСЧЕЗАЕТ!',
              formula: 'Does + Subject + V1 (V-s emas!)',
              example: 'Does she like...? (Does she likes... emas!) Does he go...? (Does he goes... emas!)',
              exampleRu: 'Does she like...? Does he go...?',
            },
            exercises: [
              { text: 'Does he ___ here?', options: ['work', 'works'], correct: 0, explanation: 'Does dan keyin fe\'lda -s bo\'lmaydi: work.' },
              { text: 'Does she ___ English?', options: ['speak', 'speaks'], correct: 0, explanation: 'Does + speak.' },
            ],
          },
          {
            teach: {
              rule: 'Qisqa javoblar: Yes, he does. / No, he doesn\'t.',
              ruleRu: 'Краткие ответы: Yes, he does. / No, he doesn\'t.',
              example: 'Does Tom play tennis? — Yes, he does. / No, he doesn\'t.',
              exampleRu: 'Does Tom play tennis? — Yes, he does.',
            },
            exercises: [
              { text: 'Does she like music? — Yes, she ___ .', options: ['does', 'do', 'is'], correct: 0, explanation: 'Yes, she does.' },
              { text: 'Does it rain a lot? — No, it ___ .', options: ["doesn't", "don't"], correct: 0, explanation: 'No, it doesn\'t.' },
            ],
          },
          {
            teach: {
              rule: '"Does he have...?" iborasi (Does he has emas!).',
              ruleRu: 'Форма "Does he have...?" (НЕ Does he has!).',
              example: 'Does he have a car? Does she have time?',
              exampleRu: 'Does he have a car?',
            },
            exercises: [
              { text: 'Does Mark ___ a computer?', options: ['have', 'has'], correct: 0, explanation: 'Does + have.' },
              { text: 'Does she ___ any sisters?', options: ['have', 'has'], correct: 0, explanation: 'Does + have.' },
            ],
          },
          {
            teach: {
              rule: '"Does" so\'roq qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим вопросы с "Does".',
              example: 'Does he work hard? Yes, he does. Does she live here? No, she doesn\'t.',
              exampleRu: 'Does he work hard? Yes, he does.',
            },
            exercises: [
              { text: 'Choose the correct question:', options: ['Does she like apples?', 'Does she likes apples?'], correct: 0, explanation: 'Does she like...' },
              { text: 'Choose the correct question:', options: ['Does Tom speak French?', 'Do Tom speak French?'], correct: 0, explanation: 'Tom (he) -> Does.' },
              { text: 'Select the correct answer: Does he live here?', options: ['No, he doesn\'t.', 'No, he don\'t.'], correct: 0, explanation: 'No, he doesn\'t.' },
            ],
          },
        ],
      },
      {
        id: 'sec-present-simple-l7',
        order: 7,
        title: 'Maxsus savollar (Wh-) va Takroriylik ravishlari',
        titleRu: 'Специальные вопросы (Wh-) и наречия частоты',
        icon: '7️⃣',
        units: [
          {
            teach: {
              rule: 'Maxsus so\'roq so\'zlar (What, Where, When, Why, How) Do/Does dan OLDIN keladi.',
              ruleRu: 'Вопросительные слова (What, Where, When) ставятся ПЕРЕД Do/Does.',
              formula: 'Wh- (Where / What) + Do / Does + Ega + Fe\'l (V1) ?',
              example: 'Where do you live? What time does he wake up?',
              exampleRu: 'Where do you live? What time does he wake up?',
            },
            exercises: [
              { text: 'Where ___ you live?', options: ['do', 'does', 'are'], correct: 0, explanation: 'Where do you live?' },
              { text: 'What time ___ she get up?', options: ['does', 'do'], correct: 0, explanation: 'she -> does.' },
            ],
          },
          {
            teach: {
              rule: 'Takroriylik ravishlari (Adverbs of Frequency): always (doim), usually (odatda), often (tez-tez), sometimes (ba\'zan), never (hech qachon).',
              ruleRu: 'Наречия частоты: always, usually, often, sometimes, never.',
              formula: 'Subject + always / usually / never + Verb (V1)',
              example: 'I always wake up at 7 AM. She never drinks coffee.',
              exampleRu: 'I always wake up at 7 AM. She never drinks coffee.',
            },
            exercises: [
              { text: 'Takroriylik ravishlari fe\'ldan qayerda keladi?', options: ['Fe\'ldan OLDIN', 'Fe\'ldan KEYIN', 'Gap oxirida'], correct: 0, explanation: 'Ravishlar asosiy fe\'ldan OLDIN keladi.' },
              { text: 'I ___ drink tea in the morning. (doim)', options: ['always', 'never'], correct: 0, explanation: 'doim = always.' },
            ],
          },
          {
            teach: {
              rule: 'Takroriylik ravishi va 3-shaxs birga kelganda -s saqlanadi!',
              ruleRu: 'При наречиях частоты окончание -s у 3-го лица сохраняется!',
              formula: 'He / She / It + always / usually + Verb + -s',
              example: 'He always arrives on time. She usually reads books.',
              exampleRu: 'He always arrives on time.',
            },
            exercises: [
              { text: 'She usually ___ early. (come)', options: ['comes', 'come'], correct: 0, explanation: 'She + comes.' },
              { text: 'He never ___ fast food. (eat)', options: ['eats', 'eat'], correct: 0, explanation: 'He + eats.' },
            ],
          },
          {
            teach: {
              rule: '"How often do you ...?" — biror ishni qanchalik tez-tez bajarishingizni so\'rash.',
              ruleRu: '"How often do you ...?" — вопрос о частоте действия.',
              formula: 'How often + do / does + Subject + Verb (V1) ?',
              example: 'How often do you play football? — I play every Saturday.',
              exampleRu: 'How often do you play football?',
            },
            exercises: [
              { text: '___ often do you read books?', options: ['How', 'What', 'Where'], correct: 0, explanation: 'How often...?' },
              { text: 'How often ___ she visit her grandma?', options: ['does', 'do'], correct: 0, explanation: 'she -> does.' },
            ],
          },
          {
            teach: {
              rule: 'Maxsus savollar va ravishlar qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим специальны вопросы и наречия частоты.',
              formula: 'Wh- word + Do / Does + Subject + Frequency Adverb + Verb ?',
              example: 'Where do you work? I usually work at home.',
              exampleRu: 'Where do you work? I usually work at home.',
            },
            exercises: [
              { text: 'What ___ you usually eat for breakfast?', options: ['do', 'does'], correct: 0, explanation: 'What do you...' },
              { text: 'Choose the correct sentence:', options: ['He always drinks milk.', 'He drinks always milk.'], correct: 0, explanation: 'He always drinks...' },
              { text: 'Select the correct sentence:', options: ['Where does he live?', 'Where he lives?'], correct: 0, explanation: 'Where does he live?' },
            ],
          },
        ],
      },
      {
        id: 'sec-present-simple-l8',
        order: 8,
        title: 'Present Simple vs To Be va Xatolarni tuzatish',
        titleRu: 'Present Simple vs To Be и исправление ошибок',
        icon: '8️⃣',
        units: [
          {
            teach: {
              rule: 'DIQQAT! "To Be" (am/is/are — sifat/holat) va Present Simple (harakat fe\'li: work, live) ni aralashtirmang!',
              ruleRu: 'Не путайте "To Be" (состояние) и Present Simple (действие).',
              formula: 'To Be: Subject + am/is/are + Sifat   |   PS: Subject + Fe\'l (V1)',
              example: 'I am a doctor (To Be). I work in a hospital (Present Simple).',
              exampleRu: 'I am a doctor vs I work in a hospital.',
            },
            exercises: [
              { text: 'I ___ tired today.', options: ['am', 'do', 'work'], correct: 0, explanation: 'sifat (tired) bilan: am.' },
              { text: 'I ___ in a bank.', options: ['work', 'am', 'is'], correct: 0, explanation: 'harakat fe\'li: work.' },
            ],
          },
          {
            teach: {
              rule: 'Inkor va so\'roqdagi farq: "He isn\'t doctor" (To Be) vs "He doesn\'t work" (Present Simple).',
              ruleRu: 'Разница в отрицаниях: "He isn\'t" (To Be) vs "He doesn\'t work" (Present Simple).',
              formula: 'To Be: Subject + isn\'t / aren\'t   |   PS: Subject + don\'t / doesn\'t + V1',
              example: 'He is not happy. He does not play tennis.',
              exampleRu: 'He is not happy vs He does not play tennis.',
            },
            exercises: [
              { text: 'She ___ a student. She ___ work.', options: ['is / doesn\'t', 'does / isn\'t'], correct: 0, explanation: 'is a student / doesn\'t work.' },
              { text: 'They ___ at home. They ___ go out.', options: ['are / don\'t', 'do / aren\'t'], correct: 0, explanation: 'are at home / don\'t go.' },
            ],
          },
          {
            teach: {
              rule: 'Tez-tez uchraydigan eng katta xatolar:',
              ruleRu: 'Самые частые ошибки в Present Simple:',
              formula: 'He works (He work emas!) | Does she like? (likes emas!)',
              example: 'He work ❌ ➔ He works ✅; Does she likes? ❌ ➔ Does she like? ✅; He doesn\'t has ❌ ➔ He doesn\'t have ✅.',
              exampleRu: 'He works. Does she like? He doesn\'t have.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['Does she have a car?', 'Does she has a car?'], correct: 0, explanation: 'Does + have.' },
              { text: 'Choose the correct sentence:', options: ['He doesn\'t like coffee.', 'He don\'t likes coffee.'], correct: 0, explanation: 'He doesn\'t like.' },
            ],
          },
          {
            teach: {
              rule: 'Real dialog va hikoyalarda Present Simple ni to\'g\'ri qo\'llash.',
              ruleRu: 'Практика Present Simple в реальных диалогах.',
              formula: 'Question + Answer in Present Simple',
              example: '— Where do you live? — I live in Tashkent. My sister lives in Samarkand.',
              exampleRu: '— Where do you live? — I live in Tashkent.',
            },
            exercises: [
              { text: '— ___ your brother speak English? — Yes, he ___ .', options: ['Does / does', 'Do / do'], correct: 0, explanation: 'Does your brother / he does.' },
              { text: '— What do you do? — I ___ at school.', options: ['teach', 'teaches'], correct: 0, explanation: 'I teach.' },
            ],
          },
          {
            teach: {
              rule: 'Present Simple bo\'yicha barcha 8 ta dars qoidalarining yakuniy sinovi.',
              ruleRu: 'Итоговое обобщение всех 8 уроков Present Simple.',
              formula: 'Full Present Simple Tense Master Formula',
              example: 'I work, he works, she doesn\'t like, do you know, does he have?',
              exampleRu: 'I work, he works, she doesn\'t like.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['He plays tennis every Sunday.', 'He play tennis every Sunday.'], correct: 0, explanation: 'He + plays.' },
              { text: 'Choose the correct sentence:', options: ['Where does she work?', 'Where she works?'], correct: 0, explanation: 'Where does she work?' },
              { text: 'Choose the correct sentence:', options: ['They don\'t have a car.', 'They doesn\'t have a car.'], correct: 0, explanation: 'They don\'t.' },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Present Simple Zamoni",
      titleRu: 'Тест раздела: Настоящее простое время (Present Simple)',
      exercises: [
        { text: 'I ___ in Tashkent.', options: ['live', 'lives', 'living'], correct: 0, explanation: 'I + live.' },
        { text: 'He ___ in a big hospital.', options: ['work', 'works', 'working'], correct: 1, explanation: 'He (3-shaxs) -> works.' },
        { text: 'She ___ to school by bus. (go)', options: ['gos', 'goes', 'go'], correct: 1, explanation: 'go -> goes.' },
        { text: 'Tom ___ history at university.', options: ['studys', 'studies'], correct: 1, explanation: 'study -> studies.' },
        { text: 'Sarah ___ a new car.', options: ['have', 'has'], correct: 1, explanation: 'Sarah (she) -> has.' },
        { text: 'I ___ eat fast food.', options: ["don't", "doesn't"], correct: 0, explanation: 'I + don\'t.' },
        { text: 'He ___ like cold weather.', options: ["don't", "doesn't"], correct: 1, explanation: 'He + doesn\'t.' },
        { text: 'She doesn\'t ___ tea.', options: ['drink', 'drinks'], correct: 0, explanation: 'doesn\'t + drink (qo\'shimchasiz).' },
        { text: 'He doesn\'t ___ a bicycle.', options: ['have', 'has'], correct: 0, explanation: 'doesn\'t + have.' },
        { text: '___ you speak English?', options: ['Do', 'Does', 'Are'], correct: 0, explanation: 'Do you...?' },
        { text: '___ she live near here?', options: ['Do', 'Does', 'Is'], correct: 1, explanation: 'Does she...?' },
        { text: 'Does he like tennis? — Yes, he ___ .', options: ['does', 'do', 'is'], correct: 0, explanation: 'Yes, he does.' },
        { text: 'Where ___ you work?', options: ['do', 'does'], correct: 0, explanation: 'Where do you...?' },
        { text: 'He ___ drinks coffee in the evening. (hech qachon)', options: ['never', 'always'], correct: 0, explanation: 'hech qachon = never.' },
        { text: 'Choose the correct sentence:', options: ['Does she have a cat?', 'Does she has a cat?'], correct: 0, explanation: 'Does + have.' },
      ],
    },
  },
];
