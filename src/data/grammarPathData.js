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
              { text: '"Men" so\'zini ingliz tilida qanday aytamiz?', textRu: "Как сказать \"я\" по-английски?", options: ['I', 'You', 'He', 'It'], correct: 0, explanation: '"Men" = I.', explanationRu: "\"Я\" = I." },
              { text: 'Agar o\'zingiz haqingizda gapirsangiz, qaysi olmoshni ishlatasiz?', textRu: "Какое местоимение вы используете, когда говорите о себе?", options: ['I', 'She', 'We', 'They'], correct: 0, explanation: 'O\'zingiz haqingizda gapirganda "I" ishlatiladi.', explanationRu: "Когда вы говорите о себе, используется \"I\"." },
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
              { text: 'I ___ a teacher.', options: ['am', 'is', 'are'], correct: 0, explanation: '"I" faqat "am" bilan keladi.', explanationRu: "\"I\" используется только с \"am\"." },
              { text: '___ am ready.', options: ['I', 'He', 'We'], correct: 0, explanation: '"am" faqat "I" bilan ishlatiladi.', explanationRu: "\"am\" используется только с \"I\"." },
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
              { text: 'I ___ pizza.', options: ['like', 'likes', 'liking'], correct: 0, explanation: '"I" bilan fe\'lga -s qo\'shilmaydi: like.', explanationRu: "С местоимением \"I\" к глаголу не добавляется -s: like." },
              { text: 'Choose the correct sentence:', options: ['I likes music.', 'I like music.', 'I liking music.'], correct: 1, explanation: '"I" + like (qo\'shimchasiz).', explanationRu: "\"I\" + like (без окончания)." },
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
              { text: 'I ___ not like coffee.', options: ['am', 'do', 'does'], correct: 1, explanation: '"I" inkorida: do not (don\'t).', explanationRu: "В отрицании с \"I\": do not (don't)." },
              { text: '___ I know you?', options: ['Am', 'Do', 'Does'], correct: 1, explanation: '"I" savolida: Do I...?', explanationRu: "В вопросе с \"I\": Do I...?" },
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
              { text: 'Choose the correct sentence:', options: ['I is a doctor.', 'I am a doctor.', 'I are a doctor.'], correct: 1, explanation: '"I" + am.', explanationRu: "\"I\" + am." },
              { text: 'Choose the correct sentence:', options: ["I doesn't like tea.", "I don't like tea.", 'I not like tea.'], correct: 1, explanation: '"I" inkorida: don\'t.', explanationRu: "В отрицании с \"I\": don't." },
              { text: 'Choose the correct question:', options: ['Do I look tired?', 'Does I look tired?', 'Am I look tired?'], correct: 0, explanation: '"I" savolida: Do I...?', explanationRu: "В вопросе с \"I\": Do I...?" },
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
              { text: '"Sen" / "Siz" so\'zini ingliz tilida qanday aytamiz?', textRu: "Как сказать \"ты / вы\" по-английски?", options: ['I', 'You', 'He', 'We'], correct: 1, explanation: '"Sen/Siz" = You.', explanationRu: "\"Ты/Вы\" = You." },
              { text: 'Suhbatdoshingizga to\'g\'ridan-to\'g\'ri murojaat qilsangiz, qaysi olmoshni ishlatasiz?', textRu: "Какое местоимение вы используете при прямом обращении к собеседнику?", options: ['I', 'You', 'She', 'They'], correct: 1, explanation: 'Suhbatdoshga murojaatda "You" ishlatiladi.', explanationRu: "При обращении к собеседнику используется \"You\"." },
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
              { text: 'You ___ my best friend.', options: ['am', 'is', 'are'], correct: 2, explanation: '"You" + are.', explanationRu: "\"You\" + are." },
              { text: '___ are late.', options: ['You', 'He', 'I'], correct: 0, explanation: '"are" — "You" bilan mos keladi.', explanationRu: "\"are\" сочетается с \"You\"." },
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
              { text: 'You ___ pizza.', options: ['like', 'likes', 'liking'], correct: 0, explanation: '"You" bilan fe\'lga -s qo\'shilmaydi.', explanationRu: "С местоимением \"You\" к глаголу не добавляется -s." },
              { text: 'Choose the correct sentence:', options: ['You likes music.', 'You like music.'], correct: 1, explanation: '"You" + like (qo\'shimchasiz).', explanationRu: "\"You\" + like (без окончания)." },
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
              { text: 'You ___ not like coffee.', options: ['am', 'do', 'does'], correct: 1, explanation: '"You" inkorida: do not (don\'t).', explanationRu: "В отрицании с \"You\": do not (don't)." },
              { text: '___ you know me?', options: ['Am', 'Do', 'Does'], correct: 1, explanation: '"You" savolida: Do you...?', explanationRu: "В вопросе с \"You\": Do you...?" },
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
              { text: 'Choose the correct sentence:', options: ['You is my friend.', 'You are my friend.'], correct: 1, explanation: '"You" + are.', explanationRu: "\"You\" + are." },
              { text: 'Choose the correct sentence:', options: ["You don't like tea.", "You doesn't like tea."], correct: 0, explanation: '"You" inkorida: don\'t.', explanationRu: "В отрицании с \"You\": don't." },
              { text: 'Choose the correct question:', options: ['Do you look tired?', 'Does you look tired?'], correct: 0, explanation: '"You" savolida: Do you...?', explanationRu: "В вопросе с \"You\": Do you...?" },
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
              { text: '"U" (erkak) so\'zini ingliz tilida qanday aytamiz?', textRu: "Как сказать \"он\" (мужской род) по-английски?", options: ['She', 'He', 'It', 'They'], correct: 1, explanation: 'Erkak kishi uchun: He.', explanationRu: "Для мужчин: He." },
              { text: 'Tom haqida gapirsangiz (Tom — erkak ism), qaysi olmoshni ishlatasiz?', textRu: "Какое местоимение вы используете для Тома (мужское имя)?", options: ['She', 'He', 'It'], correct: 1, explanation: 'Tom — erkak ism, shuning uchun He.', explanationRu: "Том — мужское имя, поэтому He." },
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
              { text: 'He ___ a doctor.', options: ['am', 'is', 'are'], correct: 1, explanation: '"He" + is.', explanationRu: "\"He\" + is." },
              { text: '___ is my father.', options: ['He', 'You', 'We'], correct: 0, explanation: '"is" — "He" bilan mos keladi.', explanationRu: "\"is\" сочетается с \"He\"." },
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
              { text: 'He ___ pizza.', options: ['like', 'likes', 'liking'], correct: 1, explanation: '"He/She/It" bilan fe\'lga -s qo\'shiladi.', explanationRu: "С He/She/It к глаголу добавляется -s." },
              { text: 'Choose the correct sentence:', options: ['He like music.', 'He likes music.'], correct: 1, explanation: '"He" + likes (-s bilan).', explanationRu: "\"He\" + likes (с окончанием -s)." },
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
              { text: 'He ___ not like coffee.', options: ["don't", "doesn't", "isn't"], correct: 1, explanation: '"He" inkorida: doesn\'t.', explanationRu: "В отрицании с \"He\": doesn't." },
              { text: '___ he know you?', options: ['Do', 'Does', 'Is'], correct: 1, explanation: '"He" savolida: Does he...?', explanationRu: "В вопросе с \"He\": Does he...?" },
              { text: "He doesn't ___ coffee.", options: ['like', 'likes'], correct: 0, explanation: "\"doesn't\" dan keyin fe'l -s olmaydi: like.", explanationRu: "После \"doesn't\" глагол идёт без -s: like." },
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
              { text: 'Choose the correct sentence:', options: ['He is a teacher.', 'He are a teacher.'], correct: 0, explanation: '"He" + is.', explanationRu: "\"He\" + is." },
              { text: 'Choose the correct sentence:', options: ["He doesn't like tea.", "He don't like tea."], correct: 0, explanation: '"He" inkorida: doesn\'t.', explanationRu: "В отрицании с \"He\": doesn't." },
              { text: 'Choose the correct question:', options: ['Does he look tired?', 'Do he look tired?'], correct: 0, explanation: '"He" savolida: Does he...?', explanationRu: "В вопросе с \"He\": Does he...?" },
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
              { text: '"U" (ayol) so\'zini ingliz tilida qanday aytamiz?', textRu: "Как сказать \"она\" (женский род) по-английски?", options: ['She', 'He', 'It', 'They'], correct: 0, explanation: 'Ayol kishi uchun: She.', explanationRu: "Для женщин: She." },
              { text: 'Anna haqida gapirsangiz (Anna — ayol ism), qaysi olmoshni ishlatasiz?', textRu: "Какое местоимение вы используете для Анны (женское имя)?", options: ['She', 'He', 'It'], correct: 0, explanation: 'Anna — ayol ism, shuning uchun She.', explanationRu: "Анна — женское имя, поэтому She." },
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
              { text: 'She ___ a nurse.', options: ['am', 'is', 'are'], correct: 1, explanation: '"She" + is.', explanationRu: "\"She\" + is." },
              { text: '___ is my mother.', options: ['She', 'You', 'We'], correct: 0, explanation: '"is" — "She" bilan mos keladi.', explanationRu: "\"is\" сочетается с \"She\"." },
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
              { text: 'She ___ pizza.', options: ['like', 'likes', 'liking'], correct: 1, explanation: '"She" bilan fe\'lga -s qo\'shiladi.', explanationRu: "С местоимением \"She\" к глаголу добавляется -s." },
              { text: 'Choose the correct sentence:', options: ['She like music.', 'She likes music.'], correct: 1, explanation: '"She" + likes (-s bilan).', explanationRu: "\"She\" + likes (с окончанием -s)." },
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
              { text: 'She ___ not like coffee.', options: ["don't", "doesn't", "isn't"], correct: 1, explanation: '"She" inkorida: doesn\'t.', explanationRu: "В отрицании с \"She\": doesn't." },
              { text: '___ she know you?', options: ['Do', 'Does', 'Is'], correct: 1, explanation: '"She" savolida: Does she...?', explanationRu: "В вопросе с \"She\": Does she...?" },
              { text: "She doesn't ___ coffee.", options: ['like', 'likes'], correct: 0, explanation: "\"doesn't\" dan keyin fe'l -s olmaydi: like.", explanationRu: "После \"doesn't\" глагол идёт без -s: like." },
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
              { text: 'Choose the correct sentence:', options: ['She is a teacher.', 'She are a teacher.'], correct: 0, explanation: '"She" + is.', explanationRu: "\"She\" + is." },
              { text: 'Choose the correct sentence:', options: ["She doesn't like tea.", "She don't like tea."], correct: 0, explanation: '"She" inkorida: doesn\'t.', explanationRu: "В отрицании с \"She\": doesn't." },
              { text: 'Choose the correct question:', options: ['Does she look tired?', 'Do she look tired?'], correct: 0, explanation: '"She" savolida: Does she...?', explanationRu: "В вопросе с \"She\": Does she...?" },
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
              { text: '"U" (narsa/hayvon) so\'zini ingliz tilida qanday aytamiz?', textRu: "Как сказать \"оно/он\" (предмет/животное) по-английски?", options: ['She', 'He', 'It', 'They'], correct: 2, explanation: 'Narsa/hayvon uchun: It.', explanationRu: "Для предметов/животных: It." },
              { text: 'Bir kitob haqida gapirsangiz, qaysi olmoshni ishlatasiz?', textRu: "Какое местоимение вы используете для одной книги?", options: ['She', 'He', 'It'], correct: 2, explanation: 'Kitob — jonsiz narsa, shuning uchun It.', explanationRu: "Книга — неодушевлённый предмет, поэтому It." },
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
              { text: 'It ___ cold today.', options: ['am', 'is', 'are'], correct: 1, explanation: '"It" + is.', explanationRu: "\"It\" + is." },
              { text: '___ is my phone.', options: ['It', 'You', 'We'], correct: 0, explanation: '"is" — "It" bilan mos keladi.', explanationRu: "\"is\" сочетается с \"It\"." },
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
              { text: 'It ___ milk. (about a cat)', options: ['like', 'likes', 'liking'], correct: 1, explanation: '"It" bilan fe\'lga -s qo\'shiladi.', explanationRu: "С местоимением \"It\" к глаголу добавляется -s." },
              { text: 'Choose the correct sentence:', options: ['It bark loudly.', 'It barks loudly.'], correct: 1, explanation: '"It" + barks (-s bilan).', explanationRu: "\"It\" + barks (с окончанием -s)." },
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
              { text: 'It ___ not work.', options: ["don't", "doesn't", "isn't"], correct: 1, explanation: '"It" inkorida: doesn\'t.', explanationRu: "В отрицании с \"It\": doesn't." },
              { text: '___ it need water?', options: ['Do', 'Does', 'Is'], correct: 1, explanation: '"It" savolida: Does it...?', explanationRu: "В вопросе с \"It\": Does it...?" },
              { text: "It doesn't ___ well.", options: ['work', 'works'], correct: 0, explanation: "\"doesn't\" dan keyin fe'l -s olmaydi: work.", explanationRu: "После \"doesn't\" глагол идёт без -s: work." },
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
              { text: 'Choose the correct sentence:', options: ['It is my bag.', 'It are my bag.'], correct: 0, explanation: '"It" + is.', explanationRu: "\"It\" + is." },
              { text: 'Choose the correct sentence:', options: ["It doesn't work.", "It don't work."], correct: 0, explanation: '"It" inkorida: doesn\'t.', explanationRu: "В отрицании с \"It\": doesn't." },
              { text: 'Choose the correct question:', options: ['Does it work?', 'Do it work?'], correct: 0, explanation: '"It" savolida: Does it...?', explanationRu: "В вопросе с \"It\": Does it...?" },
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
              { text: '"Biz" so\'zini ingliz tilida qanday aytamiz?', textRu: "Как сказать \"мы\" по-английски?", options: ['I', 'You', 'We', 'They'], correct: 2, explanation: '"Biz" = We.', explanationRu: "\"Мы\" = We." },
              { text: 'O\'zingiz va sinfdoshlaringiz haqida gapirsangiz, qaysi olmoshni ishlatasiz?', textRu: "Какое местоимение вы используете для себя и одноклассников?", options: ['I', 'We', 'They'], correct: 1, explanation: 'O\'zingiz shu guruh ichida bo\'lsangiz: We.', explanationRu: "Если вы сами входите в эту группу: We." },
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
              { text: 'We ___ happy.', options: ['am', 'is', 'are'], correct: 2, explanation: '"We" + are.', explanationRu: "\"We\" + are." },
              { text: '___ are classmates.', options: ['We', 'He', 'I'], correct: 0, explanation: '"are" — "We" bilan mos keladi.', explanationRu: "\"are\" сочетается с \"We\"." },
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
              { text: 'We ___ pizza.', options: ['like', 'likes', 'liking'], correct: 0, explanation: '"We" bilan fe\'lga -s qo\'shilmaydi.', explanationRu: "С местоимением \"We\" к глаголу не добавляется -s." },
              { text: 'Choose the correct sentence:', options: ['We likes music.', 'We like music.'], correct: 1, explanation: '"We" + like (qo\'shimchasiz).', explanationRu: "\"We\" + like (без окончания)." },
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
              { text: 'We ___ not know.', options: ['am', 'do', 'does'], correct: 1, explanation: '"We" inkorida: do not (don\'t).', explanationRu: "В отрицании с \"We\": do not (don't)." },
              { text: '___ we have time?', options: ['Am', 'Do', 'Does'], correct: 1, explanation: '"We" savolida: Do we...?', explanationRu: "В вопросе с \"We\": Do we...?" },
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
              { text: 'Choose the correct sentence:', options: ['We is friends.', 'We are friends.'], correct: 1, explanation: '"We" + are.', explanationRu: "\"We\" + are." },
              { text: 'Choose the correct sentence:', options: ["We don't like tea.", "We doesn't like tea."], correct: 0, explanation: '"We" inkorida: don\'t.', explanationRu: "В отрицании с \"We\": don't." },
              { text: 'Choose the correct question:', options: ['Do we look tired?', 'Does we look tired?'], correct: 0, explanation: '"We" savolida: Do we...?', explanationRu: "В вопросе с \"We\": Do we...?" },
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
              { text: '"Ular" so\'zini ingliz tilida qanday aytamiz?', textRu: "Как сказать \"они\" по-английски?", options: ['We', 'You', 'They', 'It'], correct: 2, explanation: '"Ular" = They.', explanationRu: "\"Они\" = They." },
              { text: 'Tom va Ali haqida gapirsangiz, qaysi olmoshni ishlatasiz?', textRu: "Какое местоимение вы используете для Тома и Али?", options: ['We', 'They', 'It'], correct: 1, explanation: 'Ikkalasi ham siz emassiz: They.', explanationRu: "Оба они не вы: They." },
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
              { text: 'They ___ at school.', options: ['am', 'is', 'are'], correct: 2, explanation: '"They" + are.', explanationRu: "\"They\" + are." },
              { text: '___ are my neighbors.', options: ['They', 'He', 'I'], correct: 0, explanation: '"are" — "They" bilan mos keladi.', explanationRu: "\"are\" сочетается с \"They\"." },
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
              { text: 'They ___ pizza.', options: ['like', 'likes', 'liking'], correct: 0, explanation: '"They" bilan fe\'lga -s qo\'shilmaydi.', explanationRu: "С местоимением \"They\" к глаголу не добавляется -s." },
              { text: 'Choose the correct sentence:', options: ['They likes music.', 'They like music.'], correct: 1, explanation: '"They" + like (qo\'shimchasiz).', explanationRu: "\"They\" + like (без окончания)." },
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
              { text: 'They ___ not live here.', options: ['am', 'do', 'does'], correct: 1, explanation: '"They" inkorida: do not (don\'t).', explanationRu: "В отрицании с \"They\": do not (don't)." },
              { text: '___ they know you?', options: ['Am', 'Do', 'Does'], correct: 1, explanation: '"They" savolida: Do they...?', explanationRu: "В вопросе с \"They\": Do they...?" },
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
              { text: 'Choose the correct sentence:', options: ['They is students.', 'They are students.'], correct: 1, explanation: '"They" + are.', explanationRu: "\"They\" + are." },
              { text: 'Choose the correct sentence:', options: ["They don't like tea.", "They doesn't like tea."], correct: 0, explanation: '"They" inkorida: don\'t.', explanationRu: "В отрицании с \"They\": don't." },
              { text: 'Choose the correct question:', options: ['Do they look tired?', 'Does they look tired?'], correct: 0, explanation: '"They" savolida: Do they...?', explanationRu: "В вопросе с \"They\": Do they...?" },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Shaxs olmoshlari",
      titleRu: "Тест раздела: Личные местоимения",
      exercises: [
        { text: '"U" (erkak) so\'zini ingliz tilida qanday aytamiz?', textRu: "Как сказать \"он\" (мужской род) по-английски?", options: ['She', 'He', 'It'], correct: 1, explanation: 'Erkak kishi uchun: He.', explanationRu: "Для мужчин: He." },
        { text: '"U" (ayol) so\'zini ingliz tilida qanday aytamiz?', textRu: "Как сказать \"она\" (женский род) по-английски?", options: ['She', 'He', 'It'], correct: 0, explanation: 'Ayol kishi uchun: She.', explanationRu: "Для женщин: She." },
        { text: 'I ___ a student.', options: ['am', 'is', 'are'], correct: 0, explanation: '"I" + am.', explanationRu: "\"I\" + am." },
        { text: 'You ___ my friend.', options: ['am', 'is', 'are'], correct: 2, explanation: '"You" + are.', explanationRu: "\"You\" + are." },
        { text: 'He ___ a doctor.', options: ['am', 'is', 'are'], correct: 1, explanation: '"He" + is.', explanationRu: "\"He\" + is." },
        { text: 'We ___ ready.', options: ['am', 'is', 'are'], correct: 2, explanation: '"We" + are.', explanationRu: "\"We\" + are." },
        { text: 'They ___ students.', options: ['am', 'is', 'are'], correct: 2, explanation: '"They" + are.', explanationRu: "\"They\" + are." },
        { text: 'She ___ pizza.', options: ['like', 'likes'], correct: 1, explanation: '"She" bilan fe\'lga -s qo\'shiladi: likes.', explanationRu: "С местоимением \"She\" к глаголу добавляется -s: likes." },
        { text: 'It ___ milk.', options: ['like', 'likes'], correct: 1, explanation: '"It" bilan fe\'lga -s qo\'shiladi: likes.', explanationRu: "С местоимением \"It\" к глаголу добавляется -s: likes." },
        { text: 'They ___ pizza.', options: ['like', 'likes'], correct: 0, explanation: '"They" bilan fe\'lga -s qo\'shilmaydi: like.', explanationRu: "С местоимением \"They\" к глаголу не добавляется -s: like." },
        { text: 'He ___ not like coffee.', options: ["don't", "doesn't"], correct: 1, explanation: '"He" inkorida: doesn\'t.', explanationRu: "В отрицании с \"He\": doesn't." },
        { text: 'They ___ not like coffee.', options: ["don't", "doesn't"], correct: 0, explanation: '"They" inkorida: don\'t.', explanationRu: "В отрицании с \"They\": don't." },
        { text: '___ she know you?', options: ['Do', 'Does'], correct: 1, explanation: '"She" savolida: Does.', explanationRu: "В вопросе с \"She\": Does." },
        { text: '___ we have time?', options: ['Do', 'Does'], correct: 0, explanation: '"We" savolida: Do.', explanationRu: "В вопросе с \"We\": Do." },
        { text: 'Choose the correct sentence:', options: ["It don't work.", "It doesn't work."], correct: 1, explanation: '"It" inkorida: doesn\'t.', explanationRu: "В отрицании с \"It\": doesn't." },
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
              { text: 'I ___ a student.', options: ['am', 'is', 'are'], correct: 0, explanation: '"I" + am.', explanationRu: "\"I\" + am." },
              { text: 'They ___ teachers.', options: ['am', 'is', 'are'], correct: 2, explanation: '"They" + are.', explanationRu: "\"They\" + are." },
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
              { text: 'The cat ___ small.', options: ['am', 'is', 'are'], correct: 1, explanation: '"The cat" = it = is.', explanationRu: "\"The cat\" = it = is." },
              { text: 'My brother ___ busy.', options: ['am', 'is', 'are'], correct: 1, explanation: '"My brother" = he = is.', explanationRu: "\"My brother\" = he = is." },
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
              { text: 'My friends ___ here.', options: ['am', 'is', 'are'], correct: 2, explanation: '"My friends" = they = are.', explanationRu: "\"My friends\" = they = are." },
              { text: 'You and I ___ classmates.', options: ['am', 'is', 'are'], correct: 2, explanation: '"You and I" = we = are.', explanationRu: "\"You and I\" = we = are." },
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
              { text: 'Choose the correct sentence:', options: ['I are ready.', 'I is ready.', 'I am ready.'], correct: 2, explanation: '"I" faqat "am" bilan keladi.', explanationRu: "\"I\" используется только с \"am\"." },
              { text: 'Which subject uses "am"?', options: ['I', 'You', 'We'], correct: 0, explanation: '"am" faqat "I" bilan ishlatiladi.', explanationRu: "\"am\" используется только с \"I\"." },
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
              { text: 'She ___ my teacher.', options: ['am', 'is', 'are'], correct: 1, explanation: '"She" + is.', explanationRu: "\"She\" + is." },
              { text: 'We ___ friends.', options: ['am', 'is', 'are'], correct: 2, explanation: '"We" + are.', explanationRu: "\"We\" + are." },
              { text: 'I ___ ready.', options: ['am', 'is', 'are'], correct: 0, explanation: '"I" + am.', explanationRu: "\"I\" + am." },
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
              { text: 'Choose the contraction of "I am":', options: ["I'm", "I's", "I'am"], correct: 0, explanation: '"I am" -> I\'m.', explanationRu: "\"I am\" -> I'm." },
              { text: 'Choose the correct sentence:', options: ["I'm happy.", 'Im happy.', "I'am happy."], correct: 0, explanation: 'To\'g\'ri qisqartma: I\'m.', explanationRu: "Верное сокращение: I'm." },
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
              { text: 'Choose the contraction of "They are":', options: ["They're", "They's", "Theyr'e"], correct: 0, explanation: '"They are" -> They\'re.', explanationRu: "\"They are\" -> They're." },
              { text: 'Choose the contraction of "We are":', options: ["We're", "We's", "Wer'e"], correct: 0, explanation: '"We are" -> We\'re.', explanationRu: "\"We are\" -> We're." },
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
              { text: 'Choose the contraction of "She is":', options: ["She's", "She'is", "Shes'"], correct: 0, explanation: '"She is" -> She\'s.', explanationRu: "\"She is\" -> She's." },
              { text: 'Choose the contraction of "It is":', options: ["It's", "Its'", "I'ts"], correct: 0, explanation: '"It is" -> It\'s.', explanationRu: "\"It is\" -> It's." },
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
              { text: 'Choose the correct short answer:', options: ['Yes, she is.', "Yes, she's."], correct: 0, explanation: 'Qisqa javobda qisqartma ishlatilmaydi: Yes, she is.', explanationRu: "В коротком ответе сокращение не используется: Yes, she is." },
              { text: 'Choose the correct sentence:', options: ["She's my sister.", "She is' my sister."], correct: 0, explanation: 'Gap ichida qisqartma to\'g\'ri: She\'s my sister.', explanationRu: "Внутри предложения сокращение верно: She's my sister." },
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
              { text: 'Choose the contraction of "He is":', options: ["He's", "He'is"], correct: 0, explanation: '"He is" -> He\'s.', explanationRu: "\"He is\" -> He's." },
              { text: 'Choose the contraction of "You are":', options: ["You're", "You'is"], correct: 0, explanation: '"You are" -> You\'re.', explanationRu: "\"You are\" -> You're." },
              { text: 'Choose the correct short answer:', options: ['Yes, they are.', "Yes, they're."], correct: 0, explanation: 'Qisqa javobda qisqartma ishlatilmaydi: Yes, they are.', explanationRu: "В коротком ответе сокращение не используется: Yes, they are." },
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
              { text: 'She ___ not busy.', options: ['am', 'is', 'are'], correct: 1, explanation: '"She" + is not.', explanationRu: "\"She\" + is not." },
              { text: 'They ___ not ready.', options: ['am', 'is', 'are'], correct: 2, explanation: '"They" + are not.', explanationRu: "\"They\" + are not." },
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
              { text: 'Choose the contraction of "is not":', options: ["isn't", "is'nt"], correct: 0, explanation: '"is not" -> isn\'t.', explanationRu: "\"is not\" -> isn't." },
              { text: 'Choose the contraction of "are not":', options: ["aren't", "are'nt"], correct: 0, explanation: '"are not" -> aren\'t.', explanationRu: "\"are not\" -> aren't." },
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
              { text: 'Choose the correct sentence:', options: ["I amn't busy.", "I'm not busy."], correct: 1, explanation: '"am not" ning qisqartmasi yo\'q: I\'m not.', explanationRu: "У \"am not\" нет сокращения: I'm not." },
              { text: "I ___ ready yet.", options: ["'m not", "isn't", "aren't"], correct: 0, explanation: '"I" inkorida: \'m not.', explanationRu: "В отрицании с \"I\": 'm not." },
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
              { text: 'It ___ working.', options: ["isn't", "aren't", "'m not"], correct: 0, explanation: '"It" inkorida: isn\'t.', explanationRu: "В отрицании с \"It\": isn't." },
              { text: 'We ___ late.', options: ["isn't", "aren't", "'m not"], correct: 1, explanation: '"We" inkorida: aren\'t.', explanationRu: "В отрицании с \"We\": aren't." },
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
              { text: 'He ___ my brother.', options: ["isn't", "aren't"], correct: 0, explanation: '"He" inkorida: isn\'t.', explanationRu: "В отрицании с \"He\": isn't." },
              { text: 'You ___ wrong.', options: ["isn't", "aren't"], correct: 1, explanation: '"You" inkorida: aren\'t.', explanationRu: "В отрицании с \"You\": aren't." },
              { text: 'Choose the correct sentence:', options: ["She isn't home.", 'She not is home.'], correct: 0, explanation: 'To\'g\'ri inkor: She isn\'t home.', explanationRu: "Верное отрицание: She isn't home." },
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
              { text: 'Choose the correct question:', options: ['Is she happy?', 'She is happy?'], correct: 0, explanation: 'Savolda "is" oldinga chiqadi: Is she happy?', explanationRu: "В вопросе \"is\" выносится вперёд: Is she happy?" },
              { text: '___ you tired?', options: ['Am', 'Is', 'Are'], correct: 2, explanation: '"You" savolida: Are.', explanationRu: "В вопросе с \"You\": Are." },
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
              { text: '___ I right?', options: ['Am', 'Is', 'Are'], correct: 0, explanation: '"I" savolida: Am.', explanationRu: "В вопросе с \"I\": Am." },
              { text: 'Choose the correct question:', options: ['Am I next?', 'I am next?'], correct: 0, explanation: 'Savolda "am" oldinga chiqadi: Am I next?', explanationRu: "В вопросе \"am\" выносится вперёд: Am I next?" },
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
              { text: '___ it raining?', options: ['Am', 'Is', 'Are'], correct: 1, explanation: '"It" savolida: Is.', explanationRu: "В вопросе с \"It\": Is." },
              { text: '___ she a teacher?', options: ['Am', 'Is', 'Are'], correct: 1, explanation: '"She" savolida: Is.', explanationRu: "В вопросе с \"She\": Is." },
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
              { text: '___ we late?', options: ['Am', 'Is', 'Are'], correct: 2, explanation: '"We" savolida: Are.', explanationRu: "В вопросе с \"We\": Are." },
              { text: '___ they students?', options: ['Am', 'Is', 'Are'], correct: 2, explanation: '"They" savolida: Are.', explanationRu: "В вопросе с \"They\": Are." },
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
              { text: '___ you okay?', options: ['Am', 'Is', 'Are'], correct: 2, explanation: '"You" savolida: Are.', explanationRu: "В вопросе с \"You\": Are." },
              { text: '___ he your friend?', options: ['Am', 'Is', 'Are'], correct: 1, explanation: '"He" savolida: Is.', explanationRu: "В вопросе с \"He\": Is." },
              { text: '___ I wrong?', options: ['Am', 'Is', 'Are'], correct: 0, explanation: '"I" savolida: Am.', explanationRu: "В вопросе с \"I\": Am." },
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
              { text: 'Is she a doctor? Yes, ___.', options: ['she is', 'she are', 'she am'], correct: 0, explanation: '"She" + is.', explanationRu: "\"She\" + is." },
              { text: 'Are they students? Yes, ___.', options: ['they are', 'they is'], correct: 0, explanation: '"They" + are.', explanationRu: "\"They\" + are." },
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
              { text: 'Is it cold? No, ___.', options: ["it isn't", "it aren't"], correct: 0, explanation: '"It" inkorida: isn\'t.', explanationRu: "В отрицании с \"It\": isn't." },
              { text: 'Are you tired? No, ___.', options: ["I'm not", 'I not'], correct: 0, explanation: '"I" inkorida: \'m not.', explanationRu: "В отрицании с \"I\": 'm not." },
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
              { text: 'Choose the correct short answer:', options: ['Yes, she is.', 'Yes, she is a nurse.'], correct: 0, explanation: 'Qisqa javob qisqa bo\'ladi: Yes, she is.', explanationRu: "Короткий ответ короткий: Yes, she is." },
              { text: 'Am I right? Yes, ___.', options: ['you are', 'you am'], correct: 0, explanation: '"You" + are.', explanationRu: "\"You\" + are." },
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
              { text: 'Is she happy? No, ___.', options: ["she isn't", "she aren't"], correct: 0, explanation: '"She" inkorida: isn\'t.', explanationRu: "В отрицании с \"She\": isn't." },
              { text: 'Are we late? Yes, ___.', options: ['we are', 'we is'], correct: 0, explanation: '"We" + are.', explanationRu: "\"We\" + are." },
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
              { text: 'Is it Monday? Yes, ___.', options: ['it is', 'it are'], correct: 0, explanation: '"It" + is.', explanationRu: "\"It\" + is." },
              { text: 'Are they here? No, ___.', options: ["they aren't", "they isn't"], correct: 0, explanation: '"They" inkorida: aren\'t.', explanationRu: "В отрицании с \"They\": aren't." },
              { text: 'Are you ready? No, ___.', options: ["I'm not", "I isn't"], correct: 0, explanation: '"I" inkorida: \'m not.', explanationRu: "В отрицании с \"I\": 'm not." },
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
              { text: '___ is your name?', options: ['What', 'Who', 'Where'], correct: 0, explanation: 'Narsa/ism so\'ralganda: What.', explanationRu: "При вопросе о предмете/имени: What." },
              { text: 'Choose the correct question:', options: ['What is this?', 'What this is?'], correct: 0, explanation: '"to be" "What" dan keyin darrov keladi: What is this?', explanationRu: "\"to be\" идёт сразу после \"What\": What is this?" },
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
              { text: '___ is that man?', options: ['What', 'Who', 'Where'], correct: 1, explanation: 'Kim ekani so\'ralganda: Who.', explanationRu: "При вопросе о том, кто это: Who." },
              { text: '___ are they?', options: ['What', 'Who', 'Where'], correct: 1, explanation: 'Kim ekanlari so\'ralganda: Who.', explanationRu: "При вопросе о том, кто они: Who." },
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
              { text: '___ is my phone?', options: ['What', 'Who', 'Where'], correct: 2, explanation: 'Joy so\'ralganda: Where.', explanationRu: "При вопросе о месте: Where." },
              { text: '___ are you from?', options: ['What', 'Who', 'Where'], correct: 2, explanation: 'Kelib chiqish joyi so\'ralganda: Where.', explanationRu: "При вопросе о месте происхождения: Where." },
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
              { text: '___ are you today?', options: ['What', 'How', 'Where'], correct: 1, explanation: 'Holat so\'ralganda: How.', explanationRu: "При вопросе о состоянии: How." },
              { text: 'Choose the correct question:', options: ['How is the weather?', 'How weather is?'], correct: 0, explanation: '"to be" "How" dan keyin darrov keladi: How is the weather?', explanationRu: "\"to be\" идёт сразу после \"How\": How is the weather?" },
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
              { text: '___ is your teacher?', options: ['Who', 'Where', 'How'], correct: 0, explanation: 'Kim ekani so\'ralganda: Who.', explanationRu: "При вопросе о том, кто это: Who." },
              { text: '___ is the station?', options: ['Who', 'Where', 'How'], correct: 1, explanation: 'Joy so\'ralganda: Where.', explanationRu: "При вопросе о месте: Where." },
              { text: '___ are you?', options: ['Who', 'Where', 'How'], correct: 2, explanation: 'Holat so\'ralganda: How.', explanationRu: "При вопросе о состоянии: How." },
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
              { text: 'He ___ angry.', options: ['am', 'is', 'are'], correct: 1, explanation: '"He" + is.', explanationRu: "\"He\" + is." },
              { text: 'Choose the correct sentence:', options: ['He is sad.', 'He sad.'], correct: 0, explanation: 'Sifat oldidan "to be" kerak: He is sad.', explanationRu: "Перед прилагательным нужен \"to be\": He is sad." },
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
              { text: 'She ___ a nurse.', options: ['am', 'is', 'are'], correct: 1, explanation: '"She" + is.', explanationRu: "\"She\" + is." },
              { text: 'They ___ engineers.', options: ['am', 'is', 'are'], correct: 2, explanation: '"They" + are.', explanationRu: "\"They\" + are." },
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
              { text: 'The keys ___ in my bag.', options: ['am', 'is', 'are'], correct: 2, explanation: '"The keys" = they = are.', explanationRu: "\"The keys\" = they = are." },
              { text: 'My mother ___ at work.', options: ['am', 'is', 'are'], correct: 1, explanation: '"My mother" = she = is.', explanationRu: "\"My mother\" = she = is." },
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
              { text: 'He ___ 30 years old.', options: ['am', 'is', 'are'], correct: 1, explanation: '"He" + is.', explanationRu: "\"He\" + is." },
              { text: 'My grandparents ___ 70 years old.', options: ['am', 'is', 'are'], correct: 2, explanation: '"My grandparents" = they = are.', explanationRu: "\"My grandparents\" = they = are." },
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
              { text: 'She ___ a teacher.', options: ['am', 'is', 'are'], correct: 1, explanation: '"She" + is (kasb).', explanationRu: "\"She\" + is (профессия)." },
              { text: 'The cat ___ under the table.', options: ['am', 'is', 'are'], correct: 1, explanation: '"The cat" = it = is (joy).', explanationRu: "\"The cat\" = it = is (место)." },
              { text: 'We ___ 18 years old.', options: ['am', 'is', 'are'], correct: 2, explanation: '"We" + are (yosh).', explanationRu: "\"We\" + are (возраст)." },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: 'To be' fe'li",
      titleRu: 'Тест раздела: Глагол "to be"',
      exercises: [
        { text: 'He ___ a doctor.', options: ['am', 'is', 'are'], correct: 1, explanation: '"He" + is.', explanationRu: "\"He\" + is." },
        { text: 'We ___ ready.', options: ['am', 'is', 'are'], correct: 2, explanation: '"We" + are.', explanationRu: "\"We\" + are." },
        { text: 'I ___ tired.', options: ['am', 'is', 'are'], correct: 0, explanation: '"I" + am.', explanationRu: "\"I\" + am." },
        { text: 'Choose the contraction of "They are":', options: ["They're", "They's"], correct: 0, explanation: '"They are" -> They\'re.', explanationRu: "\"They are\" -> They're." },
        { text: 'Choose the contraction of "She is":', options: ["She's", "She'is"], correct: 0, explanation: '"She is" -> She\'s.', explanationRu: "\"She is\" -> She's." },
        { text: 'He ___ not ready.', options: ['am', 'is', 'are'], correct: 1, explanation: '"He" + is not.', explanationRu: "\"He\" + is not." },
        { text: 'Choose the contraction of "is not":', options: ["isn't", "is'nt"], correct: 0, explanation: '"is not" -> isn\'t.', explanationRu: "\"is not\" -> isn't." },
        { text: '___ you tired?', options: ['Am', 'Is', 'Are'], correct: 2, explanation: '"You" savolida: Are.', explanationRu: "В вопросе с \"You\": Are." },
        { text: '___ I late?', options: ['Am', 'Is', 'Are'], correct: 0, explanation: '"I" savolida: Am.', explanationRu: "В вопросе с \"I\": Am." },
        { text: 'Is she a doctor? Yes, ___.', options: ['she is', 'she are'], correct: 0, explanation: '"She" + is.', explanationRu: "\"She\" + is." },
        { text: 'Are they ready? No, ___.', options: ["they aren't", "they isn't"], correct: 0, explanation: '"They" inkorida: aren\'t.', explanationRu: "В отрицании с \"They\": aren't." },
        { text: '___ is your name?', options: ['What', 'Who', 'Where'], correct: 0, explanation: 'Ism so\'ralganda: What.', explanationRu: "При вопросе об имени: What." },
        { text: '___ is the book?', options: ['What', 'Who', 'Where'], correct: 2, explanation: 'Joy so\'ralganda: Where.', explanationRu: "При вопросе о месте: Where." },
        { text: '___ are you?', options: ['Who', 'Where', 'How'], correct: 2, explanation: 'Holat so\'ralganda: How.', explanationRu: "При вопросе о состоянии: How." },
        { text: 'She ___ a teacher.', options: ['am', 'is', 'are'], correct: 1, explanation: '"She" + is (kasb).', explanationRu: "\"She\" + is (профессия)." },
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
              { text: '"book" (kitob) so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"book\" (книга)?", options: ['bookes', 'books', 'bookies'], correct: 1, explanation: 'Ko\'pchilik otlarga shunchaki -s qo\'shiladi: books.', explanationRu: "К большинству существительных просто добавляется -s: books." },
              { text: '"cat" (mushuk) so\'zini ko\'plikka aylantiring:', textRu: "Образуйте множественное число слова \"cat\" (кошка):", options: ['cats', 'cates', 'caties'], correct: 0, explanation: 'cat + s = cats.', explanationRu: "cat + s = cats." },
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
              { text: 'To\'g\'ri birikmani tanlang:', textRu: "Выберите правильное сочетание:", options: ['a dogs', 'dogs', 'an dogs'], correct: 1, explanation: 'Ko\'plikdagi otlar oldidan a/an ishlatilmaydi: dogs.', explanationRu: "Перед существительными во множественном числе a/an не используется: dogs." },
              { text: 'Choose the correct option:', options: ['I have two dogs.', 'I have a two dogs.'], correct: 0, explanation: 'Son va ko\'plik oti kelganda "a" artikli qo\'yilmaydi.', explanationRu: "При числительном и существительном во множественном числе артикль \"a\" не ставится." },
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
              { text: 'I have two ___ .', options: ['car', 'cars', 'cares'], correct: 1, explanation: 'two (ikkita) dan keyin ko\'plik shakli: cars.', explanationRu: "После two (два) — форма множественного числа: cars." },
              { text: 'There are five ___ in the room.', options: ['chair', 'chairs', 'chaires'], correct: 1, explanation: 'five (beshta) dan keyin ko\'plik shakli: chairs.', explanationRu: "После five (пять) — форма множественного числа: chairs." },
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
              { text: 'The cars ___ red.', options: ['is', 'are', 'am'], correct: 1, explanation: '"cars" ko\'plikda bo\'lgani uchun "are" keladi.', explanationRu: "Так как \"cars\" во множественном числе, используется \"are\"." },
              { text: 'Choose the correct sentence:', options: ['The pens is on the table.', 'The pens are on the table.'], correct: 1, explanation: 'pens (ko\'plik) + are.', explanationRu: "pens (мн. ч.) + are." },
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
              { text: 'Choose the correct sentence:', options: ['I see two cat.', 'I see two cats.'], correct: 1, explanation: 'two + cats (ko\'plik).', explanationRu: "two + cats (мн. ч.)." },
              { text: 'Choose the correct sentence:', options: ['The dogs are running.', 'The dogs is running.'], correct: 0, explanation: 'dogs (ko\'plik) + are.', explanationRu: "dogs (мн. ч.) + are." },
              { text: 'Select the plural of "bag":', options: ['bags', 'bages', 'bagies'], correct: 0, explanation: 'bag + s = bags.', explanationRu: "bag + s = bags." },
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
              { text: '"bus" (avtobus) so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"bus\" (автобус)?", options: ['buss', 'buses', 'busis'], correct: 1, explanation: '-s bilan tugagani uchun -es qo\'shiladi: buses.', explanationRu: "Так как оканчивается на -s, добавляется -es: buses." },
              { text: '"box" (quti) so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"box\" (коробка)?", options: ['boxs', 'boxes', 'boxies'], correct: 1, explanation: '-x bilan tugagani uchun -es qo\'shiladi: boxes.', explanationRu: "Так как оканчивается на -x, добавляется -es: boxes." },
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
              { text: '"dish" (idish) so\'zini ko\'plikka aylantiring:', textRu: "Образуйте множественное число слова \"dish\" (тарелка):", options: ['dishs', 'dishes', 'dishies'], correct: 1, explanation: '-sh bilan tugagani uchun -es qo\'shiladi: dishes.', explanationRu: "Так как оканчивается на -sh, добавляется -es: dishes." },
              { text: '"watch" (soat) so\'zining ko\'pligi qaysi?', textRu: "Какова форма множественного числа слова \"watch\" (часы)?", options: ['watchs', 'watches', 'watchies'], correct: 1, explanation: '-ch bilan tugagani uchun -es qo\'shiladi: watches.', explanationRu: "Так как оканчивается на -ch, добавляется -es: watches." },
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
              { text: '"tomato" so\'zining ko\'plik shaklini toping:', textRu: "Найдите форму множественного числа слова \"tomato\":", options: ['tomatos', 'tomatoes', 'tomatoies'], correct: 1, explanation: 'tomato + es = tomatoes.', explanationRu: "tomato + es = tomatoes." },
              { text: '"potato" so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"potato\"?", options: ['potatoes', 'potatos', 'potatose'], correct: 0, explanation: 'potato + es = potatoes.', explanationRu: "potato + es = potatoes." },
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
              { text: '"buses" va "boxes" so\'zlarida -es qanday talaffuz qilinadi?', textRu: "Как произносится -es в словах \"buses\" и \"boxes\"?", options: ['[s]', '[z]', '[iz]'], correct: 2, explanation: '-es qoidasidagi so\'zlarda -es [iz] tovushini beradi.', explanationRu: "В словах с окончанием -es оно произносится как [iz]." },
              { text: 'Choose the correct plural for "glass" (stakan):', options: ['glasss', 'glasses', 'glassies'], correct: 1, explanation: '-ss bilan tugagan: glasses.', explanationRu: "Оканчивается на -ss: glasses." },
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
              { text: 'Choose the correct plural of "class":', options: ['classs', 'classes'], correct: 1, explanation: '-ss bilan tugagani uchun: classes.', explanationRu: "Так как оканчивается на -ss: classes." },
              { text: 'Choose the correct sentence:', options: ['The boxes are on the floor.', 'The boxs are on the floor.'], correct: 0, explanation: 'box + es = boxes.', explanationRu: "box + es = boxes." },
              { text: 'Select the plural of "sandwich":', options: ['sandwichs', 'sandwiches'], correct: 1, explanation: '-ch bilan tugagani uchun: sandwiches.', explanationRu: "Так как оканчивается на -ch: sandwiches." },
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
              { text: '"baby" so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"baby\"?", options: ['babys', 'babies', 'babyes'], correct: 1, explanation: 'undosh (b) + y -> y o\'zgarib -ies bo\'ladi: babies.', explanationRu: "Согласная (b) + y -> y меняется на -ies: babies." },
              { text: '"city" (shahar) so\'zini ko\'plikka aylantiring:', textRu: "Образуйте множественное число слова \"city\" (город):", options: ['citys', 'cities', 'cityes'], correct: 1, explanation: 'undosh (t) + y -> cities.', explanationRu: "Согласная (t) + y -> cities." },
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
              { text: '"boy" so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"boy\"?", options: ['boies', 'boys', 'boyes'], correct: 1, explanation: 'unli (o) + y bo\'lgani uchun shunchaki -s: boys.', explanationRu: "Так как гласная (o) + y, просто добавляется -s: boys." },
              { text: '"key" (kalit) so\'zini ko\'plikka aylantiring:', textRu: "Образуйте множественное число слова \"key\" (ключ):", options: ['keies', 'keys', 'keyes'], correct: 1, explanation: 'unli (e) + y -> keys.', explanationRu: "Гласная (e) + y -> keys." },
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
              { text: '"party" so\'zining ko\'pligi qaysi?', textRu: "Какова форма множественного числа слова \"party\"?", options: ['partys', 'parties'], correct: 1, explanation: 't + y (undosh+y) -> parties.', explanationRu: "t + y (согласная+y) -> parties." },
              { text: '"toy" (o\'yinchoq) so\'zining ko\'pligi qaysi?', textRu: "Какова форма множественного числа слова \"toy\" (игрушка)?", options: ['toys', 'toies'], correct: 0, explanation: 'o + y (unli+y) -> toys.', explanationRu: "o + y (гласная+y) -> toys." },
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
              { text: 'The ___ are on the table. (key)', options: ['keies', 'keys'], correct: 1, explanation: 'key -> keys.', explanationRu: "key -> keys." },
              { text: 'Many ___ live in big cities. (family)', options: ['families', 'familys'], correct: 0, explanation: 'family (undosh l+y) -> families.', explanationRu: "family (согласная l+y) -> families." },
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
              { text: 'Select the plural of "story":', options: ['storys', 'stories'], correct: 1, explanation: 'r + y -> stories.', explanationRu: "r + y -> stories." },
              { text: 'Select the plural of "day":', options: ['daies', 'days'], correct: 1, explanation: 'a + y -> days.', explanationRu: "a + y -> days." },
              { text: 'Choose the correct sentence:', options: ['The cities are beautiful.', 'The citys are beautiful.'], correct: 0, explanation: 'city -> cities.', explanationRu: "city -> cities." },
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
              { text: '"knife" (pichoq) so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"knife\" (нож)?", options: ['knifes', 'knives', 'knifeies'], correct: 1, explanation: '-fe bilan tugagan: knives.', explanationRu: "Оканчивается на -fe: knives." },
              { text: '"leaf" (barg) so\'zini ko\'plikka aylantiring:', textRu: "Образуйте множественное число слова \"leaf\" (лист):", options: ['leafs', 'leaves', 'leafes'], correct: 1, explanation: '-f o\'zgarib -ves bo\'ladi: leaves.', explanationRu: "-f меняется на -ves: leaves." },
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
              { text: '"shelf" (tokcha) so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"shelf\" (полка)?", options: ['shelfs', 'shelves', 'shelfes'], correct: 1, explanation: 'shelf -> shelves.', explanationRu: "shelf -> shelves." },
              { text: '"wife" (xotin/ayol) so\'zining ko\'pligi qaysi?', textRu: "Какова форма множественного числа слова \"wife\" (жена)?", options: ['wifes', 'wives'], correct: 1, explanation: 'wife -> wives.', explanationRu: "wife -> wives." },
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
              { text: '"roof" (tom) so\'zining ko\'plik shakli qaysi? (istisno)', textRu: "Какова форма множественного числа слова \"roof\" (крыша)? (исключение)", options: ['rooves', 'roofs'], correct: 1, explanation: 'roof — istisno so\'z, shunchaki -s qo\'shiladi: roofs.', explanationRu: "roof — слово-исключение, просто добавляется -s: roofs." },
              { text: '"chef" (oshpaz) so\'zining ko\'pligi qaysi?', textRu: "Какова форма множественного числа слова \"chef\" (повар)?", options: ['chefs', 'cheves'], correct: 0, explanation: 'chef — istisno so\'z: chefs.', explanationRu: "chef — слово-исключение: chefs." },
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
              { text: 'The ___ are falling from the trees.', options: ['leafs', 'leaves'], correct: 1, explanation: 'leaf -> leaves.', explanationRu: "leaf -> leaves." },
              { text: 'The books are on the ___ .', options: ['shelfs', 'shelves'], correct: 1, explanation: 'shelf -> shelves.', explanationRu: "shelf -> shelves." },
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
              { text: 'Select the plural of "wolf":', options: ['wolfs', 'wolves'], correct: 1, explanation: 'wolf -> wolves.', explanationRu: "wolf -> wolves." },
              { text: 'Select the plural of "life":', options: ['lifes', 'lives'], correct: 1, explanation: 'life -> lives.', explanationRu: "life -> lives." },
              { text: 'Choose the correct sentence:', options: ['The knives are sharp.', 'The knifes are sharp.'], correct: 0, explanation: 'knife -> knives.', explanationRu: "knife -> knives." },
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
              { text: '"man" (erkak) so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"man\" (мужчина)?", options: ['mans', 'men', 'manes'], correct: 1, explanation: 'man ko\'pligi - s emas, men bo\'ladi.', explanationRu: "Множественное число от man — не -s, а men." },
              { text: '"woman" (ayol) so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"woman\" (женщина)?", options: ['womans', 'women', 'womenes'], correct: 1, explanation: 'woman ko\'pligi: women.', explanationRu: "Множественное число от woman: women." },
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
              { text: '"child" (bitta bola) so\'zining ko\'pligi qaysi?', textRu: "Какова форма множественного числа слова \"child\" (ребёнок)?", options: ['childs', 'children', 'childrens'], correct: 1, explanation: 'child -> children.', explanationRu: "child -> children." },
              { text: '"person" (odam) so\'zining ko\'pligi qaysi?', textRu: "Какова форма множественного числа слова \"person\" (человек)?", options: ['persons', 'people', 'peoples'], correct: 1, explanation: 'person -> people.', explanationRu: "person -> people." },
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
              { text: '"tooth" (tish) so\'zining ko\'pligi qaysi?', textRu: "Какова форма множественного числа слова \"tooth\" (зуб)?", options: ['tooths', 'teeth', 'teethes'], correct: 1, explanation: 'tooth -> teeth.', explanationRu: "tooth -> teeth." },
              { text: '"foot" (oyoq kafti) so\'zining ko\'pligi qaysi?', textRu: "Какова форма множественного числа слова \"foot\" (стопа)?", options: ['foots', 'feet', 'feets'], correct: 1, explanation: 'foot -> feet.', explanationRu: "foot -> feet." },
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
              { text: '"mouse" (sichqon) so\'zining ko\'pligi qaysi?', textRu: "Какова форма множественного числа слова \"mouse\" (мышь)?", options: ['mouses', 'mice', 'mices'], correct: 1, explanation: 'mouse -> mice.', explanationRu: "mouse -> mice." },
              { text: '"goose" (g\'oz) so\'zining ko\'pligi qaysi?', textRu: "Какова форма множественного числа слова \"goose\" (гусь)?", options: ['gooses', 'geese'], correct: 1, explanation: 'goose -> geese.', explanationRu: "goose -> geese." },
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
              { text: 'Choose the correct sentence:', options: ['The children are happy.', 'The childrens are happy.'], correct: 0, explanation: 'children o\'zi ko\'plik, -s qo\'shilmaydi.', explanationRu: "children уже во множественном числе, -s не добавляется." },
              { text: 'Three ___ are sitting on the bench. (man)', options: ['mans', 'men'], correct: 1, explanation: 'man -> men.', explanationRu: "man -> men." },
              { text: 'Wash your ___ before bed. (tooth)', options: ['tooths', 'teeth'], correct: 1, explanation: 'tooth -> teeth.', explanationRu: "tooth -> teeth." },
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
              { text: '"sheep" (qo\'y) so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"sheep\" (овца)?", options: ['sheeps', 'sheep', 'sheepes'], correct: 1, explanation: 'sheep o\'zgarmaydi: one sheep, two sheep.', explanationRu: "sheep не меняется: one sheep, two sheep." },
              { text: 'I caught three ___ . (fish)', options: ['fishes', 'fish', 'fishs'], correct: 1, explanation: 'fish ko\'plikda ham fish bo\'lib qoladi.', explanationRu: "fish во множественном числе остаётся fish." },
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
              { text: 'Qaysi so\'z doim ko\'plikda ishlatiladi?', textRu: "Какое слово всегда употребляется во множественном числе?", options: ['book', 'trousers', 'pen'], correct: 1, explanation: 'trousers (shim) — juft narsa, doim ko\'plikda.', explanationRu: "trousers (брюки) — парный предмет, всегда во множественном числе." },
              { text: '"scissors" (qaychi) so\'zi qaysi fe\'l bilan keladi?', textRu: "С каким глаголом употребляется слово \"scissors\" (ножницы)?", options: ['is', 'are'], correct: 1, explanation: 'Doimiy ko\'plik otlar bilan "are" ishlatiladi.', explanationRu: "С существительными, употребляемыми только во множественном числе, используется \"are\"." },
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
              { text: 'My glasses ___ on the table.', options: ['is', 'are', 'am'], correct: 1, explanation: 'glasses (doimiy ko\'plik) + are.', explanationRu: "glasses (всегда мн. ч.) + are." },
              { text: 'Choose the correct sentence:', options: ['The scissors are sharp.', 'The scissors is sharp.'], correct: 0, explanation: 'scissors + are.', explanationRu: "scissors + are." },
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
              { text: 'I need a pair of ___ .', options: ['glass', 'glasses'], correct: 1, explanation: 'a pair of + glasses.', explanationRu: "a pair of + glasses." },
              { text: 'He bought two ___ of pants.', options: ['pair', 'pairs'], correct: 1, explanation: 'two + pairs of pants.', explanationRu: "two + pairs of pants." },
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
              { text: 'Choose the correct sentence:', options: ['Look at those sheep!', 'Look at those sheeps!'], correct: 0, explanation: 'sheep ko\'pligi ham sheep.', explanationRu: "Множественное число от sheep тоже sheep." },
              { text: 'Where ___ my glasses?', options: ['is', 'are'], correct: 1, explanation: 'glasses + are.', explanationRu: "glasses + are." },
              { text: 'Select the correct phrase:', options: ['a pair of scissors', 'a scissor'], correct: 0, explanation: 'qaychi uchun: a pair of scissors.', explanationRu: "для ножниц: a pair of scissors." },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Otlar ko'plik soni",
      titleRu: 'Тест раздела: Множественное число существительных',
      exercises: [
        { text: '"book" so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"book\"?", options: ['bookes', 'books', 'bookies'], correct: 1, explanation: 'Odatiy ko\'plik: books.', explanationRu: "Обычное множественное число: books." },
        { text: '"box" so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"box\"?", options: ['boxs', 'boxes'], correct: 1, explanation: '-x bilan tugagan: boxes.', explanationRu: "Оканчивается на -x: boxes." },
        { text: '"watch" so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"watch\"?", options: ['watchs', 'watches'], correct: 1, explanation: '-ch bilan tugagan: watches.', explanationRu: "Оканчивается на -ch: watches." },
        { text: '"baby" so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"baby\"?", options: ['babys', 'babies'], correct: 1, explanation: 'undosh+y -> babies.', explanationRu: "согласная+y -> babies." },
        { text: '"boy" so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"boy\"?", options: ['boys', 'boies'], correct: 0, explanation: 'unli+y -> boys.', explanationRu: "гласная+y -> boys." },
        { text: '"knife" (pichoq) so\'zining ko\'pligi qaysi?', textRu: "Какова форма множественного числа слова \"knife\" (нож)?", options: ['knifes', 'knives'], correct: 1, explanation: '-fe -> knives.', explanationRu: "-fe -> knives." },
        { text: '"roof" (tom) so\'zining ko\'pligi qaysi? (istisno)', textRu: "Какова форма множественного числа слова \"roof\" (крыша)? (исключение)", options: ['rooves', 'roofs'], correct: 1, explanation: 'roof — istisno: roofs.', explanationRu: "roof — исключение: roofs." },
        { text: '"man" so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"man\"?", options: ['mans', 'men'], correct: 1, explanation: 'man -> men.', explanationRu: "man -> men." },
        { text: '"child" so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"child\"?", options: ['childs', 'children'], correct: 1, explanation: 'child -> children.', explanationRu: "child -> children." },
        { text: '"person" so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"person\"?", options: ['persons', 'people'], correct: 1, explanation: 'person -> people.', explanationRu: "person -> people." },
        { text: '"tooth" so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"tooth\"?", options: ['tooths', 'teeth'], correct: 1, explanation: 'tooth -> teeth.', explanationRu: "tooth -> teeth." },
        { text: '"mouse" so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"mouse\"?", options: ['mouses', 'mice'], correct: 1, explanation: 'mouse -> mice.', explanationRu: "mouse -> mice." },
        { text: '"sheep" so\'zining ko\'plik shakli qaysi?', textRu: "Какова форма множественного числа слова \"sheep\"?", options: ['sheeps', 'sheep'], correct: 1, explanation: 'sheep o\'zgarmaydi: sheep.', explanationRu: "sheep не меняется: sheep." },
        { text: 'Where ___ my glasses?', options: ['is', 'are'], correct: 1, explanation: 'glasses (doimiy ko\'plik) + are.', explanationRu: "glasses (всегда мн. ч.) + are." },
        { text: 'Choose the correct sentence:', options: ['The children are in the park.', 'The childrens are in the park.'], correct: 0, explanation: 'children o\'zi ko\'plik.', explanationRu: "children уже во множественном числе." },
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
              { text: '"bitta kitob" birikmasini to\'g\'ri tanlang:', textRu: "Выберите правильное сочетание для \"одна книга\":", options: ['a book', 'an book', 'the books'], correct: 0, explanation: 'book [b] undosh tovush bilan boshlanadi: a book.', explanationRu: "book начинается с согласного звука [b]: a book." },
              { text: 'I have ___ dog.', options: ['a', 'an', '-'], correct: 0, explanation: 'dog [d] undosh tovush bilan boshlangani uchun "a" qo\'yiladi.', explanationRu: "Так как dog начинается с согласного звука [d], ставится \"a\"." },
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
              { text: 'Qaysi so\'z oldidan "a" qo\'yiladi?', textRu: "Перед каким словом ставится \"a\"?", options: ['apple', 'pen', 'egg'], correct: 1, explanation: 'pen undosh tovush [p] bilan boshlanadi: a pen.', explanationRu: "pen начинается с согласного звука [p]: a pen." },
              { text: 'She is ___ doctor.', options: ['a', 'an', 'the'], correct: 0, explanation: 'doctor [d] undosh tovush: a doctor.', explanationRu: "doctor — согласный звук [d]: a doctor." },
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
              { text: 'This is ___ big apple.', options: ['a', 'an', 'the'], correct: 0, explanation: 'big [b] undosh tovush bilan boshlangani uchun "a" qo\'yiladi.', explanationRu: "Так как big начинается с согласного звука [b], ставится \"a\"." },
              { text: 'Choose the correct phrase:', options: ['a new phone', 'an new phone'], correct: 0, explanation: 'new [n] undosh: a new phone.', explanationRu: "new — согласный звук [n]: a new phone." },
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
              { text: 'Choose the correct option:', options: ['a books', 'books'], correct: 1, explanation: 'Ko\'plikdagi otlar oldida "a" ishlatilmaydi: books.', explanationRu: "Перед существительными во множественном числе \"a\" не используется: books." },
              { text: 'I drink ___ water.', options: ['a', 'an', '- (no article)'], correct: 2, explanation: 'water sanalmaydi, noaniq artikl qo\'yilmaydi.', explanationRu: "water — неисчисляемое существительное, неопределённый артикль не ставится." },
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
              { text: 'He is ___ teacher.', options: ['a', 'an', '-'], correct: 0, explanation: 'teacher [t] undosh: a teacher.', explanationRu: "teacher — согласный звук [t]: a teacher." },
              { text: 'Select the correct phrase:', options: ['a new car', 'an new car'], correct: 0, explanation: 'new [n] undosh: a new car.', explanationRu: "new — согласный звук [n]: a new car." },
              { text: 'Choose the correct option:', options: ['a computers', 'computers'], correct: 1, explanation: 'Ko\'plikda "a" bo\'lmaydi.', explanationRu: "Во множественном числе \"a\" не используется." },
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
              { text: '"an" artikli qaysi so\'z oldidan qo\'yiladi?', textRu: "Перед каким словом ставится артикль \"an\"?", options: ['book', 'apple', 'car'], correct: 1, explanation: 'apple [æ] unli tovush bilan boshlanadi: an apple.', explanationRu: "apple начинается с гласного звука [æ]: an apple." },
              { text: 'I eat ___ egg every morning.', options: ['a', 'an', 'the'], correct: 1, explanation: 'egg [e] unli tovush: an egg.', explanationRu: "egg — гласный звук [e]: an egg." },
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
              { text: 'I will be there in ___ hour.', options: ['a', 'an', '-'], correct: 1, explanation: 'hour so\'zida [h] o\'qilmaydi, unli [auə] eshitiladi: an hour.', explanationRu: "В слове hour буква [h] не читается, слышен гласный звук [auə]: an hour." },
              { text: 'He is ___ honest boy.', options: ['a', 'an', '-'], correct: 1, explanation: 'honest [onist] unli tovush bilan boshlanadi: an honest boy.', explanationRu: "honest [onist] начинается с гласного звука: an honest boy." },
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
              { text: 'This is ___ university.', options: ['a', 'an', '-'], correct: 0, explanation: 'university [yu] undosh tovush bilan boshlanadi: a university.', explanationRu: "university начинается с согласного звука [yu]: a university." },
              { text: 'He wears ___ uniform.', options: ['a', 'an', 'the'], correct: 0, explanation: 'uniform [yu] undosh tovush: a uniform.', explanationRu: "uniform — согласный звук [yu]: a uniform." },
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
              { text: 'Choose the correct option:', options: ['an umbrella', 'a umbrella'], correct: 0, explanation: 'umbrella [ʌ] unli tovush: an umbrella.', explanationRu: "umbrella — гласный звук [ʌ]: an umbrella." },
              { text: 'She is ___ actor.', options: ['a', 'an'], correct: 1, explanation: 'actor [æ] unli tovush: an actor.', explanationRu: "actor — гласный звук [æ]: an actor." },
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
              { text: 'Choose the correct phrase:', options: ['an interesting book', 'a interesting book'], correct: 0, explanation: 'interesting [i] unli tovush: an interesting book.', explanationRu: "interesting — гласный звук [i]: an interesting book." },
              { text: 'He left ___ hour ago.', options: ['a', 'an'], correct: 1, explanation: 'an hour.', explanationRu: "an hour." },
              { text: 'Choose the correct option:', options: ['an actor', 'a actor'], correct: 0, explanation: 'an actor.', explanationRu: "an actor." },
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
              { text: '___ sun is bright today.', options: ['A', 'An', 'The'], correct: 2, explanation: 'sun (quyosh) aniq va yagona: The sun.', explanationRu: "sun (солнце) — конкретный и единственный в своём роде: The sun." },
              { text: 'Please close ___ window.', options: ['a', 'the', 'an'], correct: 1, explanation: 'Xonadagi aniq o\'sha deraza nazarda tutilmoqda: the window.', explanationRu: "Имеется в виду то самое, конкретное окно в комнате: the window." },
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
              { text: 'I saw a dog. ___ dog was black.', options: ['A', 'An', 'The'], correct: 2, explanation: 'Dog ikkinchi marta aytilgani uchun u aniq: The dog.', explanationRu: "Так как dog упоминается второй раз, оно уже конкретно: The dog." },
              { text: 'She has a car. ___ car is red.', options: ['A', 'The', 'An'], correct: 1, explanation: 'Qayta tilga olinganda: The car.', explanationRu: "При повторном упоминании: The car." },
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
              { text: '___ books on the table are mine.', options: ['A', 'An', 'The'], correct: 2, explanation: 'Ko\'plikdagi aniq kitoblar: The books.', explanationRu: "Конкретные книги во множественном числе: The books." },
              { text: 'Look at ___ children over there!', options: ['a', 'the', 'an'], correct: 1, explanation: 'Aniq ko\'rinib turgan bolalar: the children.', explanationRu: "Конкретные, видимые дети: the children." },
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
              { text: 'Look at ___ sky!', options: ['a', 'an', 'the'], correct: 2, explanation: 'sky yagona: the sky.', explanationRu: "sky — единственное в своём роде: the sky." },
              { text: '___ moon is white tonight.', options: ['A', 'The', 'An'], correct: 1, explanation: 'moon yagona: The moon.', explanationRu: "moon — единственная в своём роде: The moon." },
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
              { text: 'Choose the correct sentence:', options: ['I have a cat. The cat is white.', 'I have a cat. A cat is white.'], correct: 0, explanation: 'Qayta aytilganda: The cat.', explanationRu: "При повторном упоминании: The cat." },
              { text: 'Turn off ___ light, please.', options: ['a', 'the'], correct: 1, explanation: 'Aniq shu xonadagi chiroq: the light.', explanationRu: "Конкретная лампа именно в этой комнате: the light." },
              { text: '___ earth goes around the sun.', options: ['The', 'A'], correct: 0, explanation: 'The earth, the sun.', explanationRu: "The earth, the sun." },
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
              { text: 'She can play ___ piano.', options: ['a', 'the', '-'], correct: 1, explanation: 'Musiqa asbobi bilan: play the piano.', explanationRu: "С музыкальным инструментом: play the piano." },
              { text: 'He is learning to play ___ guitar.', options: ['a', 'the', '-'], correct: 1, explanation: 'Musiqa asbobi bilan: play the guitar.', explanationRu: "С музыкальным инструментом: play the guitar." },
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
              { text: 'He is ___ tallest boy in the class.', options: ['a', 'an', 'the'], correct: 2, explanation: 'Orttirma daraja (tallest) oldidan: the tallest.', explanationRu: "Перед превосходной степенью (tallest): the tallest." },
              { text: 'This is ___ best movie ever!', options: ['a', 'the', '-'], correct: 1, explanation: 'Orttirma daraja: the best.', explanationRu: "Превосходная степень: the best." },
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
              { text: 'We live on ___ third floor.', options: ['a', 'the', '-'], correct: 1, explanation: 'Tartib son (third) oldidan: the third.', explanationRu: "Перед порядковым числительным (third): the third." },
              { text: 'Today is ___ first day of school.', options: ['a', 'the', 'an'], correct: 1, explanation: 'Tartib son: the first.', explanationRu: "Порядковое числительное: the first." },
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
              { text: '___ Nile is a long river.', options: ['A', 'The', '-'], correct: 1, explanation: 'Daryo nomlari oldidan: The Nile.', explanationRu: "Перед названиями рек: The Nile." },
              { text: 'They sailed across ___ Atlantic Ocean.', options: ['a', 'the', '-'], correct: 1, explanation: 'Okean nomlari oldidan: the Atlantic Ocean.', explanationRu: "Перед названиями океанов: the Atlantic Ocean." },
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
              { text: 'She is ___ most talented student.', options: ['a', 'the'], correct: 1, explanation: 'Orttirma daraja: the most.', explanationRu: "Превосходная степень: the most." },
              { text: 'Do you play ___ violin?', options: ['a', 'the'], correct: 1, explanation: 'Musiqa asbobi: the violin.', explanationRu: "Музыкальный инструмент: the violin." },
              { text: 'It is ___ second time I call you.', options: ['the', 'a'], correct: 0, explanation: 'Tartib son: the second.', explanationRu: "Порядковое числительное: the second." },
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
              { text: 'I live in ___ Tashkent.', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Shahar nomlari oldidan artikl qo\'yilmaydi.', explanationRu: "Перед названиями городов артикль не ставится." },
              { text: '___ Alex is my friend.', options: ['A', 'The', '- (no article)'], correct: 2, explanation: 'Kishi ismlari oldidan artikl ishlatilmaydi.', explanationRu: "Перед именами людей артикль не используется." },
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
              { text: 'I like ___ apples. (in general)', options: ['an', 'the', '- (no article)'], correct: 2, explanation: 'Umumiy ma\'nodagi ko\'plik otlar oldida artikl bo\'lmaydi.', explanationRu: "Перед существительными во множественном числе в общем значении артикля нет." },
              { text: '___ milk is good for kids.', options: ['A', 'The', '- (no article)'], correct: 2, explanation: 'Umumiy ma\'nodagi sanalmaydigan ot: milk.', explanationRu: "Неисчисляемое существительное в общем значении: milk." },
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
              { text: 'We have ___ breakfast at 8 AM.', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Ovqat vaqti (breakfast) oldida artikl bo\'lmaydi.', explanationRu: "Перед названием приёма пищи (breakfast) артикля нет." },
              { text: 'See you on ___ Monday!', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Hafta kunlari oldida artikl ishlatilmaydi.', explanationRu: "Перед днями недели артикль не используется." },
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
              { text: 'I speak ___ English.', options: ['an', 'the', '- (no article)'], correct: 2, explanation: 'Til nomlari oldidan artikl qo\'yilmaydi.', explanationRu: "Перед названиями языков артикль не ставится." },
              { text: 'They play ___ football after school.', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Sport turlari oldidan artikl ishlatilmaydi.', explanationRu: "Перед видами спорта артикль не используется." },
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
              { text: 'Choose the correct sentence:', options: ['I like football.', 'I like the football.'], correct: 0, explanation: 'Sport nomlarida artikl ishlatilmaydi.', explanationRu: "В названиях видов спорта артикль не используется." },
              { text: 'She studies ___ history.', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Fan nomida artikl bo\'lmaydi.', explanationRu: "В названии учебного предмета артикля нет." },
              { text: 'Choose the correct sentence:', options: ['We live in Uzbekistan.', 'We live in a Uzbekistan.'], correct: 0, explanation: 'Mamlakat nomida artikl bo\'lmaydi.', explanationRu: "В названии страны артикля нет." },
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
              { text: 'Give me ___ apple from that basket.', options: ['an', 'the'], correct: 0, explanation: 'Istalgan bitta olma: an apple.', explanationRu: "Любое одно яблоко: an apple." },
              { text: '___ apple you gave me was sweet.', options: ['An', 'The'], correct: 1, explanation: 'Aynan sen bergan o\'sha olma: The apple.', explanationRu: "Именно то яблоко, которое ты дал: The apple." },
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
              { text: 'I love ___ music.', options: ['the', '- (no article)'], correct: 1, explanation: 'Umuman musiqa haqida: no article.', explanationRu: "О музыке в общем: без артикля." },
              { text: '___ music of this movie is great.', options: ['The', '- (no article)'], correct: 0, explanation: 'Aynan shu kinoning musiqasi: The music.', explanationRu: "Музыка именно этого фильма: The music." },
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
              { text: 'He is ___ honest person.', options: ['a', 'an', 'the', '-'], correct: 1, explanation: 'honest [o] unli tovush: an honest person.', explanationRu: "honest — гласный звук [o]: an honest person." },
              { text: '___ sun rises in the east.', options: ['A', 'An', 'The', '-'], correct: 2, explanation: 'The sun.', explanationRu: "The sun." },
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
              { text: 'She plays ___ guitar very well.', options: ['a', 'the', '-'], correct: 1, explanation: 'Musiqa asbobi: the guitar.', explanationRu: "Музыкальный инструмент: the guitar." },
              { text: 'We had ___ lunch at school.', options: ['a', 'the', '-'], correct: 2, explanation: 'Ovqat vaqti (lunch): no article.', explanationRu: "Приём пищи (lunch): без артикля." },
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
              { text: 'Choose the correct sentence:', options: ['I have a car. The car is red.', 'I have the car. A car is red.'], correct: 0, explanation: 'Birinchi a car, ikkinchi The car.', explanationRu: "Первый раз a car, второй раз The car." },
              { text: 'Choose the correct sentence:', options: ['He is an university student.', 'He is a university student.'], correct: 1, explanation: 'university [yu] undosh: a university.', explanationRu: "university — согласный звук [yu]: a university." },
              { text: 'Choose the correct sentence:', options: ['She lives in London.', 'She lives in the London.'], correct: 0, explanation: 'Shahar nomi: no article.', explanationRu: "Название города: без артикля." },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Artikllar (a / an / the)",
      titleRu: 'Тест раздела: Артикли (a / an / the)',
      exercises: [
        { text: 'I have ___ book.', options: ['a', 'an', 'the'], correct: 0, explanation: 'book [b] undosh tovush: a book.', explanationRu: "book — согласный звук [b]: a book." },
        { text: 'She ate ___ apple.', options: ['a', 'an', 'the'], correct: 1, explanation: 'apple [æ] unli tovush: an apple.', explanationRu: "apple — гласный звук [æ]: an apple." },
        { text: 'I stayed for ___ hour.', options: ['a', 'an', '-'], correct: 1, explanation: 'hour [auə] unli tovush: an hour.', explanationRu: "hour — гласный звук [auə]: an hour." },
        { text: 'This is ___ university.', options: ['a', 'an', 'the'], correct: 0, explanation: 'university [yu] undosh tovush: a university.', explanationRu: "university — согласный звук [yu]: a university." },
        { text: 'I saw a dog. ___ dog was white.', options: ['A', 'An', 'The'], correct: 2, explanation: 'Qayta tilga olinganda: The dog.', explanationRu: "При повторном упоминании: The dog." },
        { text: 'Look at ___ sun!', options: ['a', 'an', 'the'], correct: 2, explanation: 'Dunyoda yagona: the sun.', explanationRu: "Единственное в мире: the sun." },
        { text: 'She plays ___ piano.', options: ['a', 'the', '-'], correct: 1, explanation: 'Musiqa asbobi: the piano.', explanationRu: "Музыкальный инструмент: the piano." },
        { text: 'He is ___ best student.', options: ['a', 'the', '-'], correct: 1, explanation: 'Orttirma daraja: the best.', explanationRu: "Превосходная степень: the best." },
        { text: 'We live on ___ second floor.', options: ['a', 'the', '-'], correct: 1, explanation: 'Tartib son: the second.', explanationRu: "Порядковое числительное: the second." },
        { text: 'I live in ___ Tashkent.', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Shahar nomida artikl bo\'lmaydi.', explanationRu: "В названии города артикля нет." },
        { text: 'I like ___ cats. (in general)', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Umumiy ma\'nodagi ko\'plik: no article.', explanationRu: "Множественное число в общем значении: без артикля." },
        { text: 'We speak ___ English.', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Til nomlarida artikl bo\'lmaydi.', explanationRu: "В названиях языков артикля нет." },
        { text: 'They play ___ football.', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Sport nomlarida artikl bo\'lmaydi.', explanationRu: "В названиях видов спорта артикля нет." },
        { text: 'We have ___ breakfast at 8 AM.', options: ['a', 'the', '- (no article)'], correct: 2, explanation: 'Ovqat vaqtida artikl bo\'lmaydi.', explanationRu: "При названии приёма пищи артикля нет." },
        { text: 'Choose the correct sentence:', options: ['The earth goes around the sun.', 'An earth goes around a sun.'], correct: 0, explanation: 'The earth, the sun.', explanationRu: "The earth, the sun." },
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
              { text: 'Yaqiningizda turgan bitta narsani ko\'rsatsangiz, qaysi so\'zni ishlatasiz?', textRu: "Какое слово использовать, чтобы указать на один близкий предмет?", options: ['this', 'that', 'these'], correct: 0, explanation: 'Yaqindagi birlik narsa uchun: this.', explanationRu: "Для близкого предмета в единственном числе: this." },
              { text: '___ is a new phone. (holding in hand)', options: ['This', 'That', 'Those'], correct: 0, explanation: 'Qo\'lda ushlab turilgan (yaqin) narsa: This.', explanationRu: "Предмет, который держат в руках (близко): This." },
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
              { text: 'Uzoqroqda turgan bitta narsani ko\'rsatsangiz, qaysi so\'zni ishlatasiz?', textRu: "Какое слово использовать, чтобы указать на один далёкий предмет?", options: ['this', 'that', 'these'], correct: 1, explanation: 'Uzoqdagi birlik narsa uchun: that.', explanationRu: "Для далёкого предмета в единственном числе: that." },
              { text: 'Look at ___ star in the sky!', options: ['this', 'that', 'these'], correct: 1, explanation: 'Osmondagi (uzoqdagi) yulduz: that.', explanationRu: "Звезда в небе (далеко): that." },
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
              { text: 'This ___ my house.', options: ['am', 'is', 'are'], correct: 1, explanation: 'This + is.', explanationRu: "This + is." },
              { text: 'That ___ a big tree.', options: ['am', 'is', 'are'], correct: 1, explanation: 'That + is.', explanationRu: "That + is." },
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
              { text: '___ this your bag?', options: ['Am', 'Is', 'Are'], correct: 1, explanation: 'Is this...?', explanationRu: "Is this...?" },
              { text: '___ that a new building?', options: ['Am', 'Is', 'Are'], correct: 1, explanation: 'Is that...?', explanationRu: "Is that...?" },
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
              { text: 'Choose the correct sentence for something near you:', options: ['This is my computer.', 'That is my computer.'], correct: 0, explanation: 'Yaqindagi narsa uchun: This.', explanationRu: "Для близкого предмета: This." },
              { text: 'Is ___ your jacket over there?', options: ['this', 'that'], correct: 1, explanation: 'over there (uzoqda): that.', explanationRu: "over there (далеко): that." },
              { text: 'Select the correct sentence:', options: ['That is a nice car.', 'That are a nice car.'], correct: 0, explanation: 'That + is.', explanationRu: "That + is." },
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
              { text: 'Yaqiningizdagi ko\'p narsalarni ko\'rsatish uchun qaysi so\'z ishlatiladi?', textRu: "Какое слово используется для указания на несколько близких предметов?", options: ['this', 'these', 'those'], correct: 1, explanation: 'Yaqindagi ko\'plik uchun: these.', explanationRu: "Для близких предметов во множественном числе: these." },
              { text: '___ are my keys. (in my hand)', options: ['This', 'These', 'Those'], correct: 1, explanation: 'Qo\'lda turgan ko\'plik narsalar: These.', explanationRu: "Предметы во множественном числе, которые держат в руках: These." },
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
              { text: 'Uzoqdagi ko\'p narsalarni ko\'rsatish uchun qaysi so\'z ishlatiladi?', textRu: "Какое слово используется для указания на несколько далёких предметов?", options: ['this', 'these', 'those'], correct: 2, explanation: 'Uzoqdagi ko\'plik uchun: those.', explanationRu: "Для далёких предметов во множественном числе: those." },
              { text: 'Look at ___ cars over there!', options: ['these', 'those', 'this'], correct: 1, explanation: 'Uzoqdagi ko\'plik: those.', explanationRu: "Далёкие предметы во множественном числе: those." },
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
              { text: 'These ___ my shoes.', options: ['is', 'are', 'am'], correct: 1, explanation: 'These + are.', explanationRu: "These + are." },
              { text: 'Those ___ high mountains.', options: ['is', 'are', 'am'], correct: 1, explanation: 'Those + are.', explanationRu: "Those + are." },
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
              { text: '___ these your keys?', options: ['Is', 'Are', 'Am'], correct: 1, explanation: 'Are these...?', explanationRu: "Are these...?" },
              { text: '___ those children playing?', options: ['Is', 'Are', 'Am'], correct: 1, explanation: 'Are those...?', explanationRu: "Are those...?" },
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
              { text: 'Choose the correct sentence:', options: ['These are my shoes.', 'This are my shoes.'], correct: 0, explanation: 'shoes ko\'plik: These are.', explanationRu: "shoes во множественном числе: These are." },
              { text: 'Look at ___ birds over there in the tree.', options: ['these', 'those'], correct: 1, explanation: 'over there (uzoqda): those.', explanationRu: "over there (далеко): those." },
              { text: 'Select the correct question:', options: ['Are those your books?', 'Is those your books?'], correct: 0, explanation: 'those + Are.', explanationRu: "those + Are." },
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
              { text: '"mening" so\'zini ingliz tilida qanday aytamiz?', textRu: "Как сказать \"мой / моя\" по-английски?", options: ['I', 'my', 'me'], correct: 1, explanation: '"mening" = my.', explanationRu: "\"мой/моя\" = my." },
              { text: 'What is ___ name? (sizning)', options: ['you', 'your', 'yours'], correct: 1, explanation: '"sizning" = your.', explanationRu: "\"твой/ваш\" = your." },
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
              { text: 'Tom and ___ father. (Tom va uning otasi)', options: ['his', 'her', 'its'], correct: 0, explanation: 'Tom (erkak) -> his.', explanationRu: "Tom (мужчина) -> his." },
              { text: 'Anna lost ___ phone. (Anna va uning telefoni)', options: ['his', 'her', 'its'], correct: 1, explanation: 'Anna (ayol) -> her.', explanationRu: "Anna (женщина) -> her." },
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
              { text: 'Choose the correct option:', options: ['This is my bag.', 'This is I bag.'], correct: 0, explanation: 'Egalik uchun "my" ishlatiladi.', explanationRu: "Для принадлежности используется \"my\"." },
              { text: 'He likes ___ job.', options: ['he', 'his'], correct: 1, explanation: '"his job" (uning ishi).', explanationRu: "\"his job\" (его работа)." },
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
              { text: 'To\'g\'ri birikmani tanlang:', textRu: "Выберите правильное сочетание:", options: ['my car', 'my a car', 'a my car'], correct: 0, explanation: 'Egalik olmoshi yonida artikl ishlatilmaydi.', explanationRu: "Рядом с притяжательным местоимением артикль не используется." },
              { text: 'Choose the correct sentence:', options: ['This is her house.', 'This is her a house.'], correct: 0, explanation: 'her house.', explanationRu: "her house." },
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
              { text: 'She is driving ___ car.', options: ['his', 'her', 'its'], correct: 1, explanation: 'She (ayol) -> her car.', explanationRu: "She (женщина) -> her car." },
              { text: 'He loves ___ dog.', options: ['his', 'her', 'my'], correct: 0, explanation: 'He (erkak) -> his dog.', explanationRu: "He (мужчина) -> his dog." },
              { text: 'Select the correct sentence:', options: ['Your room is big.', 'You room is big.'], correct: 0, explanation: 'Your room (sizning xonangiz).', explanationRu: "Your room (ваша комната)." },
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
              { text: 'The dog is playing with ___ ball.', options: ['his', 'her', 'its'], correct: 2, explanation: 'dog (hayvon) -> its ball.', explanationRu: "dog (животное) -> its ball." },
              { text: 'The city is famous for ___ parks.', options: ['his', 'its', 'their'], correct: 1, explanation: 'city (narsa/shahar) -> its parks.', explanationRu: "city (предмет/город) -> its parks." },
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
              { text: 'The bird is in ___ nest.', options: ['its', "it's"], correct: 0, explanation: 'Egalik uchun apostrofsiz "its" ishlatiladi.', explanationRu: "Для принадлежности используется \"its\" без апострофа." },
              { text: '___ cold today.', options: ['Its', "It's"], correct: 1, explanation: 'It\'s cold (It is cold).', explanationRu: "It's cold (It is cold)." },
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
              { text: 'We love ___ country.', options: ['we', 'our', 'us'], correct: 1, explanation: '"bizning" = our.', explanationRu: "\"наш/наша/наше/наши\" = our." },
              { text: 'This is ___ classroom. (We study here)', options: ['our', 'their', 'your'], correct: 0, explanation: 'We study -> our classroom.', explanationRu: "We study -> our classroom." },
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
              { text: 'They are doing ___ homework.', options: ['them', 'their', 'they'], correct: 1, explanation: '"ularning" = their.', explanationRu: "\"их\" = their." },
              { text: 'The students love ___ teacher.', options: ['our', 'their', 'his'], correct: 1, explanation: 'students (they) -> their teacher.', explanationRu: "students (they) -> their teacher." },
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
              { text: 'We are clean. ___ hands are clean.', options: ['Our', 'Their'], correct: 0, explanation: 'We -> Our.', explanationRu: "We -> Our." },
              { text: 'They are happy. ___ test results are great.', options: ['Our', 'Their'], correct: 1, explanation: 'They -> Their.', explanationRu: "They -> Their." },
              { text: 'The tree lost ___ leaves.', options: ['its', "it's"], correct: 0, explanation: 'tree -> its leaves.', explanationRu: "tree -> its leaves." },
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
              { text: 'She has a dog. It is ___ dog.', options: ['she', 'her', 'hers'], correct: 1, explanation: 'She -> her.', explanationRu: "She -> her." },
              { text: 'They have a house. It is ___ house.', options: ['they', 'them', 'their'], correct: 2, explanation: 'They -> their.', explanationRu: "They -> their." },
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
              { text: '___ phone is this?', options: ['Who', 'Whose', 'What'], correct: 1, explanation: 'Kimning ekanini so\'rashda: Whose.', explanationRu: "При вопросе о том, чей это: Whose." },
              { text: '___ glasses are these?', options: ['Who', 'Whose', 'Where'], correct: 1, explanation: 'Kimning ko\'zoynagi: Whose.', explanationRu: "Чьи это очки: Whose." },
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
              { text: 'Whose cat is this? It is ___ cat.', options: ['my', 'me', 'I'], correct: 0, explanation: 'my cat.', explanationRu: "my cat." },
              { text: 'Whose shoes are these? They are ___ shoes.', options: ['he', 'his', 'him'], correct: 1, explanation: 'his shoes.', explanationRu: "his shoes." },
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
              { text: '___ is my new car.', options: ['This', 'These'], correct: 0, explanation: 'car (birlik) -> This is.', explanationRu: "car (ед. ч.) -> This is." },
              { text: '___ are our bags.', options: ['This', 'These'], correct: 1, explanation: 'bags (ko\'plik) -> These are.', explanationRu: "bags (мн. ч.) -> These are." },
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
              { text: 'Whose house is that? It is ___ house.', options: ['our', 'us'], correct: 0, explanation: 'our house.', explanationRu: "our house." },
              { text: 'Choose the correct question:', options: ['Whose pen is this?', 'Who pen is this?'], correct: 0, explanation: 'Whose pen...', explanationRu: "Whose pen..." },
              { text: 'Select the correct sentence:', options: ['Those are their books.', 'That are their books.'], correct: 0, explanation: 'books (ko\'plik) -> Those are.', explanationRu: "books (мн. ч.) -> Those are." },
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
              { text: '___ is a good student.', options: ['She', 'Her'], correct: 0, explanation: 'Fe\'l (is) kelmoqda: She is.', explanationRu: "Идёт глагол (is): She is." },
              { text: '___ book is on the table.', options: ['She', 'Her'], correct: 1, explanation: 'Ot (book) kelmoqda: Her book.', explanationRu: "Идёт существительное (book): Her book." },
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
              { text: 'Choose the correct sentence:', options: ['His name is Mark.', 'Him name is Mark.'], correct: 0, explanation: 'His name.', explanationRu: "His name." },
              { text: 'Choose the correct sentence:', options: ['Her is a teacher.', 'She is a teacher.'], correct: 1, explanation: 'She is.', explanationRu: "She is." },
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
              { text: 'What is this? ___ is a new laptop.', options: ['It', 'They'], correct: 0, explanation: 'birlik uchun: It is.', explanationRu: "для единственного числа: It is." },
              { text: 'What are these? ___ are my keys.', options: ['It', 'They'], correct: 1, explanation: 'ko\'plik uchun: They are.', explanationRu: "для множественного числа: They are." },
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
              { text: '___ is my sister. ___ name is Sarah.', options: ['She / Her', 'Her / She'], correct: 0, explanation: 'She is my sister. Her name is Sarah.', explanationRu: "She is my sister. Her name is Sarah." },
              { text: 'Look at ___ trees over there.', options: ['these', 'those'], correct: 1, explanation: 'over there (uzoqda): those.', explanationRu: "over there (далеко): those." },
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
              { text: 'Choose the correct sentence:', options: ['This is my phone.', 'These is my phone.'], correct: 0, explanation: 'phone (birlik) -> This is.', explanationRu: "phone (ед. ч.) -> This is." },
              { text: 'Choose the correct sentence:', options: ['They love their school.', 'They love our school.'], correct: 0, explanation: 'They -> their.', explanationRu: "They -> their." },
              { text: 'Choose the correct sentence:', options: ['Whose book is this?', 'Who book is this?'], correct: 0, explanation: 'Whose book...', explanationRu: "Whose book..." },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Ko'rsatish va Egalik olmoshlari",
      titleRu: 'Тест раздела: Указательные и притяжательные местоимения',
      exercises: [
        { text: '___ is my book. (in my hand)', options: ['This', 'That', 'Those'], correct: 0, explanation: 'Yaqindagi birlik: This.', explanationRu: "Близкий предмет в ед. числе: This." },
        { text: 'Look at ___ star in the sky!', options: ['this', 'that', 'these'], correct: 1, explanation: 'Uzoqdagi birlik: that.', explanationRu: "Далёкий предмет в ед. числе: that." },
        { text: '___ are my keys. (holding in hand)', options: ['This', 'These', 'Those'], correct: 1, explanation: 'Yaqindagi ko\'plik: These.', explanationRu: "Близкие предметы во мн. числе: These." },
        { text: 'Look at ___ cars over there!', options: ['these', 'those'], correct: 1, explanation: 'Uzoqdagi ko\'plik: those.', explanationRu: "Далёкие предметы во множественном числе: those." },
        { text: 'What is ___ name? (sizning)', options: ['you', 'your'], correct: 1, explanation: 'your name.', explanationRu: "your name." },
        { text: 'Tom and ___ father.', options: ['his', 'her'], correct: 0, explanation: 'Tom (erkak) -> his.', explanationRu: "Tom (мужчина) -> his." },
        { text: 'Anna lost ___ keys.', options: ['his', 'her'], correct: 1, explanation: 'Anna (ayol) -> her.', explanationRu: "Anna (женщина) -> her." },
        { text: 'The dog is playing with ___ tail.', options: ['his', 'its', "it's"], correct: 1, explanation: 'dog -> its.', explanationRu: "dog -> its." },
        { text: 'We love ___ school.', options: ['our', 'their'], correct: 0, explanation: 'We -> our.', explanationRu: "We -> our." },
        { text: 'They are doing ___ homework.', options: ['our', 'their'], correct: 1, explanation: 'They -> their.', explanationRu: "They -> their." },
        { text: '___ phone is this?', options: ['Who', 'Whose'], correct: 1, explanation: 'Kimning narsasi: Whose.', explanationRu: "Чья это вещь: Whose." },
        { text: 'Choose the correct sentence:', options: ['This is my bag.', 'This is a my bag.'], correct: 0, explanation: 'Egalik olmoshi yonida artikl bo\'lmaydi.', explanationRu: "Рядом с притяжательным местоимением артикля нет." },
        { text: 'Choose the correct sentence:', options: ['She is a doctor.', 'Her is a doctor.'], correct: 0, explanation: 'She is.', explanationRu: "She is." },
        { text: 'Choose the correct sentence:', options: ['Its name is Max.', "It's name is Max."], correct: 0, explanation: 'its name (egalik).', explanationRu: "its name (притяжательное)." },
        { text: 'Choose the correct question:', options: ['Are those your books?', 'Is those your books?'], correct: 0, explanation: 'Are those.', explanationRu: "Are those." },
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
              { text: 'Can you help ___? (menga)', options: ['I', 'me', 'my'], correct: 1, explanation: 'Fe\'ldan keyin "me" ishlatiladi.', explanationRu: "После глагола используется \"me\"." },
              { text: 'I am talking to ___. (senga)', options: ['you', 'your', 'yours'], correct: 0, explanation: 'To\'ldiruvchi olmoshi: you.', explanationRu: "Объектное местоимение: you." },
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
              { text: 'Do you know Tom? I know ___.', options: ['he', 'him', 'his'], correct: 1, explanation: 'Tom (erkak kishi, fe\'ldan keyin): him.', explanationRu: "Tom (мужской род, после глагола): him." },
              { text: 'I like Sarah. I invited ___.', options: ['she', 'her', 'hers'], correct: 1, explanation: 'Sarah (ayol kishi, fe\'ldan keyin): her.', explanationRu: "Sarah (женский род, после глагола): her." },
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
              { text: 'Where is your bag? I cannot find ___.', options: ['he', 'her', 'it'], correct: 2, explanation: 'bag (narsa) -> it.', explanationRu: "bag (предмет) -> it." },
              { text: 'The cake is delicious. Try ___!', options: ['it', 'him', 'them'], correct: 0, explanation: 'cake -> it.', explanationRu: "cake -> it." },
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
              { text: 'Please give ___ a glass of water. (menga)', options: ['I', 'me', 'my'], correct: 1, explanation: 'give me.', explanationRu: "give me." },
              { text: 'He needs help. Please help ___. (unga - erkak)', options: ['he', 'him', 'his'], correct: 1, explanation: 'help him.', explanationRu: "help him." },
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
              { text: 'Choose the correct sentence:', options: ['Call me later.', 'Call I later.'], correct: 0, explanation: 'Call me.', explanationRu: "Call me." },
              { text: 'Select the correct option:', options: ['Listen to her.', 'Listen to she.'], correct: 0, explanation: 'Listen to her.', explanationRu: "Listen to her." },
              { text: 'Where is my pen? Give ___ to me.', options: ['it', 'him'], correct: 0, explanation: 'pen -> it.', explanationRu: "pen -> it." },
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
              { text: 'Come with ___! (biz bilan)', options: ['we', 'us', 'our'], correct: 1, explanation: 'with us.', explanationRu: "with us." },
              { text: 'They gave ___ some food. (bizga)', options: ['we', 'us', 'our'], correct: 1, explanation: 'gave us.', explanationRu: "gave us." },
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
              { text: 'I have two brothers. I love ___.', options: ['they', 'them', 'their'], correct: 1, explanation: 'brothers -> them.', explanationRu: "brothers -> them." },
              { text: 'Where are the keys? I can\'t see ___.', options: ['they', 'them', 'it'], correct: 1, explanation: 'keys (ko\'plik) -> them.', explanationRu: "keys (мн. ч.) -> them." },
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
              { text: '___ calls ___ every day. (U (erkak) unga (ayol) qo\'ng\'iroq qiladi)', options: ['He / her', 'Him / she', 'He / she'], correct: 0, explanation: 'Ega: He, To\'ldiruvchi: her.', explanationRu: "Подлежащее: He, дополнение: her." },
              { text: '___ know ___. (Biz ularni taniymiz)', options: ['We / them', 'Us / them', 'We / they'], correct: 0, explanation: 'Ega: We, To\'ldiruvchi: them.', explanationRu: "Подлежащее: We, дополнение: them." },
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
              { text: 'This present is for ___. (sen uchun)', options: ['you', 'your'], correct: 0, explanation: 'for you.', explanationRu: "for you." },
              { text: 'She is talking about ___. (u haqda - erkak)', options: ['he', 'him'], correct: 1, explanation: 'about him.', explanationRu: "about him." },
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
              { text: 'Choose the correct sentence:', options: ['She works with us.', 'She works with we.'], correct: 0, explanation: 'with us.', explanationRu: "with us." },
              { text: 'I bought chocolates for ___. (ular uchun)', options: ['them', 'they'], correct: 0, explanation: 'for them.', explanationRu: "for them." },
              { text: 'Choose the correct option:', options: ['Wait for me!', 'Wait for I!'], correct: 0, explanation: 'for me.', explanationRu: "for me." },
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
              { text: 'Stol ustida bitta kompyuter borligini aytish uchun qaysi birini ishlatamiz?', textRu: "Что использовать, чтобы сказать, что на столе есть один компьютер?", options: ['There is', 'There are', 'It is'], correct: 0, explanation: 'Birlikdagi narsa borligida: There is.', explanationRu: "При наличии одного предмета: There is." },
              { text: '___ a cat in the garden.', options: ['There is', 'There are'], correct: 0, explanation: 'a cat (birlik) -> There is.', explanationRu: "a cat (ед. ч.) -> There is." },
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
              { text: 'There is ___ apple in the basket.', options: ['a', 'an', 'the'], correct: 1, explanation: 'apple [æ] unli tovush: an apple.', explanationRu: "apple — гласный звук [æ]: an apple." },
              { text: 'There is ___ phone on the desk.', options: ['a', 'an'], correct: 0, explanation: 'phone [f] undosh tovush: a phone.', explanationRu: "phone — согласный звук [f]: a phone." },
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
              { text: '___ water in the glass.', options: ['There is', 'There are'], correct: 0, explanation: 'water sanalmaydi -> There is.', explanationRu: "water — неисчисляемое -> There is." },
              { text: '___ milk in the fridge.', options: ['There is', 'There are'], correct: 0, explanation: 'milk sanalmaydi -> There is.', explanationRu: "milk — неисчисляемое -> There is." },
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
              { text: '___ a TV in this room. (Televizor yo\'q)', options: ["There isn't", "There aren't"], correct: 0, explanation: 'birlik inkor: There isn\'t.', explanationRu: "отрицание в ед. числе: There isn't." },
              { text: 'There ___ any sugar left.', options: ['is not', 'are not'], correct: 0, explanation: 'sugar sanalmaydi -> is not.', explanationRu: "sugar — неисчисляемое -> is not." },
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
              { text: 'Choose the correct sentence:', options: ['There is a car in front of the house.', 'There are a car in front of the house.'], correct: 0, explanation: 'a car -> There is.', explanationRu: "a car -> There is." },
              { text: 'There ___ some tea in the cup.', options: ['is', 'are'], correct: 0, explanation: 'tea sanalmaydi -> is.', explanationRu: "tea — неисчисляемое -> is." },
              { text: 'Select the correct negative sentence:', options: ["There isn't a park here.", "There aren't a park here."], correct: 0, explanation: 'a park -> There isn\'t.', explanationRu: "a park -> There isn't." },
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
              { text: 'Xonada ikkita deraza borligini aytish uchun qaysi birini ishlatamiz?', textRu: "Что использовать, чтобы сказать, что в комнате два окна?", options: ['There is', 'There are'], correct: 1, explanation: 'Ko\'plikdagi narsalar borligida: There are.', explanationRu: "При наличии нескольких предметов: There are." },
              { text: '___ many students in the library.', options: ['There is', 'There are'], correct: 1, explanation: 'many students (ko\'plik) -> There are.', explanationRu: "many students (мн. ч.) -> There are." },
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
              { text: 'There are five ___ in the box.', options: ['apple', 'apples'], correct: 1, explanation: 'There are + ko\'plik: apples.', explanationRu: "There are + множественное число: apples." },
              { text: 'There are two ___ in the kitchen.', options: ['person', 'people'], correct: 1, explanation: 'person ning ko\'pligi: people.', explanationRu: "Множественное число от person: people." },
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
              { text: '___ some apples on the table.', options: ['There is', 'There are'], correct: 1, explanation: 'apples (ko\'plik) -> There are.', explanationRu: "apples (мн. ч.) -> There are." },
              { text: 'There are ___ interesting pictures here.', options: ['some', 'a'], correct: 0, explanation: 'pictures ko\'plik -> some.', explanationRu: "pictures во мн. ч. -> some." },
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
              { text: '___ any cars in the street.', options: ["There isn't", "There aren't"], correct: 1, explanation: 'cars ko\'plik inkor: There aren\'t.', explanationRu: "cars — отрицание во мн. ч.: There aren't." },
              { text: 'There ___ any shops nearby.', options: ['are not', 'is not'], correct: 0, explanation: 'shops ko\'plik -> are not.', explanationRu: "shops во мн. ч. -> are not." },
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
              { text: 'Choose the correct sentence:', options: ['There are two cats in the yard.', 'There is two cats in the yard.'], correct: 0, explanation: 'two cats -> There are.', explanationRu: "two cats -> There are." },
              { text: 'There ___ many trees in the park.', options: ['are', 'is'], correct: 0, explanation: 'many trees -> are.', explanationRu: "many trees -> are." },
              { text: 'Select the correct negative sentence:', options: ["There aren't any chairs.", "There isn't any chairs."], correct: 0, explanation: 'chairs -> There aren\'t.', explanationRu: "chairs -> There aren't." },
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
              { text: '___ a bank near your house?', options: ['Is there', 'Are there'], correct: 0, explanation: 'a bank (birlik) -> Is there...?', explanationRu: "a bank (ед. ч.) -> Is there...?" },
              { text: 'Is there a phone on the desk? — Yes, ___ .', options: ['there is', 'there are'], correct: 0, explanation: 'Birlik savolga javob: there is.', explanationRu: "Ответ на вопрос в ед. числе: there is." },
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
              { text: '___ any shops near here?', options: ['Is there', 'Are there'], correct: 1, explanation: 'shops (ko\'plik) -> Are there...?', explanationRu: "shops (мн. ч.) -> Are there...?" },
              { text: 'Are there any chairs? — No, ___ .', options: ["there isn't", "there aren't"], correct: 1, explanation: 'Ko\'plik savolga inkor: there aren\'t.', explanationRu: "Отрицание на вопрос во мн. числе: there aren't." },
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
              { text: 'There is a cat ___ the chair. (stul tagida)', options: ['under', 'on', 'in'], correct: 0, explanation: 'tagida = under.', explanationRu: "tagida (под) = under." },
              { text: 'There are books ___ the table. (stol ustida)', options: ['on', 'under', 'behind'], correct: 0, explanation: 'ustida = on.', explanationRu: "ustida (на) = on." },
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
              { text: 'Look! ___ a new restaurant. ___ is very beautiful.', options: ['There is / It', 'It is / There'], correct: 0, explanation: 'Birinchi borligi (There is), ikkinchi sifatlanishi (It is).', explanationRu: "Сначала наличие (There is), затем описание (It is)." },
              { text: '___ two cars in the street. ___ are white.', options: ['There are / They', 'They are / There'], correct: 0, explanation: 'There are (bor) / They (ular).', explanationRu: "There are (есть) / They (они)." },
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
              { text: 'Choose the correct question:', options: ['Is there a computer in the office?', 'Are there a computer in the office?'], correct: 0, explanation: 'a computer -> Is there...?', explanationRu: "a computer -> Is there...?" },
              { text: 'Choose the correct question:', options: ['Are there any questions?', 'Is there any questions?'], correct: 0, explanation: 'questions -> Are there...?', explanationRu: "questions -> Are there...?" },
              { text: 'Select the correct answer: Is there a hotel near here?', options: ['Yes, there is.', 'Yes, there are.'], correct: 0, explanation: 'Birlik savolga: Yes, there is.', explanationRu: "На вопрос в ед. числе: Yes, there is." },
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
              { text: 'This is ___ cat. I love ___. (mening / uni)', options: ['my / it', 'me / it', 'my / its'], correct: 0, explanation: 'my cat / love it.', explanationRu: "my cat / love it." },
              { text: '___ name is Tom. Do you know ___? (uning / uni)', options: ['His / him', 'He / him', 'His / his'], correct: 0, explanation: 'His name / know him.', explanationRu: "His name / know him." },
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
              { text: 'Choose the correct sentence:', options: ['There are three books on the desk.', 'There is three books on the desk.'], correct: 0, explanation: 'three books -> There are.', explanationRu: "three books -> There are." },
              { text: 'Choose the correct sentence:', options: ['There is a lot of water in the bottle.', 'There are a lot of water in the bottle.'], correct: 0, explanation: 'water sanalmaydi -> There is.', explanationRu: "water — неисчисляемое -> There is." },
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
              { text: 'There are two boys outside. Do you see ___?', options: ['them', 'they', 'him'], correct: 0, explanation: 'two boys -> them.', explanationRu: "two boys -> them." },
              { text: 'There is a nice girl here. Ask ___ name.', options: ['her', 'she', 'him'], correct: 0, explanation: 'girl -> her name.', explanationRu: "girl -> her name." },
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
              { text: '— Are there any apples? — No, ___ aren\'t. Eat a banana instead.', options: ['there', 'they'], correct: 0, explanation: 'there aren\'t.', explanationRu: "there aren't." },
              { text: '— Where is Alex? — I am waiting for ___ .', options: ['him', 'he'], correct: 0, explanation: 'for him.', explanationRu: "for him." },
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
              { text: 'Choose the correct sentence:', options: ['There are many trees in our yard.', 'There is many trees in our yard.'], correct: 0, explanation: 'many trees -> There are.', explanationRu: "many trees -> There are." },
              { text: 'Choose the correct sentence:', options: ['Listen to him.', 'Listen to he.'], correct: 0, explanation: 'Listen to him.', explanationRu: "Listen to him." },
              { text: 'Choose the correct sentence:', options: ['Is there a phone on the table?', 'Are there a phone on the table?'], correct: 0, explanation: 'a phone -> Is there...?', explanationRu: "a phone -> Is there...?" },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: To'ldiruvchi olmoshlar va There is / There are",
      titleRu: 'Тест раздела: Объектные местоимения и There is / There are',
      exercises: [
        { text: 'Please call ___. (menga)', options: ['me', 'I', 'my'], correct: 0, explanation: 'Call me.', explanationRu: "Call me." },
        { text: 'Do you know Tom? I like ___.', options: ['he', 'him', 'his'], correct: 1, explanation: 'Tom -> him.', explanationRu: "Tom -> him." },
        { text: 'I bought a new book. I read ___ every day.', options: ['it', 'him', 'her'], correct: 0, explanation: 'book -> it.', explanationRu: "book -> it." },
        { text: 'Come with ___! (biz bilan)', options: ['we', 'us', 'our'], correct: 1, explanation: 'with us.', explanationRu: "with us." },
        { text: 'Where are the keys? I cannot find ___.', options: ['they', 'them', 'their'], correct: 1, explanation: 'keys -> them.', explanationRu: "keys -> them." },
        { text: '___ a cat on the roof.', options: ['There is', 'There are'], correct: 0, explanation: 'a cat -> There is.', explanationRu: "a cat -> There is." },
        { text: '___ three apples in the fridge.', options: ['There is', 'There are'], correct: 1, explanation: 'three apples -> There are.', explanationRu: "three apples -> There are." },
        { text: '___ water in the glass.', options: ['There is', 'There are'], correct: 0, explanation: 'water (sanalmaydi) -> There is.', explanationRu: "water (неисчисляемое) -> There is." },
        { text: '___ a computer in the room. (yo\'q)', options: ["There isn't", "There aren't"], correct: 0, explanation: 'a computer -> There isn\'t.', explanationRu: "a computer -> There isn't." },
        { text: 'There aren\'t ___ chairs in this classroom.', options: ['any', 'a'], correct: 0, explanation: 'ko\'plik inkor: any chairs.', explanationRu: "отрицание во мн. числе: any chairs." },
        { text: '___ a bank near here?', options: ['Is there', 'Are there'], correct: 0, explanation: 'a bank -> Is there...?', explanationRu: "a bank -> Is there...?" },
        { text: '___ any questions?', options: ['Is there', 'Are there'], correct: 1, explanation: 'questions -> Are there...?', explanationRu: "questions -> Are there...?" },
        { text: 'This present is for ___. (u uchun - ayol)', options: ['her', 'she'], correct: 0, explanation: 'for her.', explanationRu: "for her." },
        { text: 'Choose the correct sentence:', options: ['There are two dogs in the garden.', 'There is two dogs in the garden.'], correct: 0, explanation: 'two dogs -> There are.', explanationRu: "two dogs -> There are." },
        { text: 'Choose the correct sentence:', options: ['Look at them!', 'Look at they!'], correct: 0, explanation: 'Look at them.', explanationRu: "Look at them." },
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
              { text: '"I, you, we, they" bilan fe\'l qanday ko\'rinishda keladi?', textRu: "В какой форме употребляется глагол с \"I, you, we, they\"?", options: ['Bosh shaklida (V1)', '-s qo\'shimchasi bilan', '-ing qo\'shimchasi bilan'], correct: 0, explanation: 'I, you, we, they bilan fe\'l o\'zgarishsiz keladi.', explanationRu: "С I, you, we, they глагол употребляется без изменений." },
              { text: 'I ___ English every evening.', options: ['study', 'studies', 'studying'], correct: 0, explanation: 'I + study (bosh shakl).', explanationRu: "I + study (начальная форма)." },
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
              { text: 'We ___ coffee every morning.', options: ['drink', 'drinks', 'drinking'], correct: 0, explanation: 'We + drink.', explanationRu: "We + drink." },
              { text: 'They ___ in Tashkent.', options: ['live', 'lives'], correct: 0, explanation: 'They + live.', explanationRu: "They + live." },
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
              { text: 'You ___ English very well.', options: ['speak', 'speaks'], correct: 0, explanation: 'You + speak.', explanationRu: "You + speak." },
              { text: 'I ___ up at 7 o\'clock every day.', options: ['get', 'gets'], correct: 0, explanation: 'I + get.', explanationRu: "I + get." },
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
              { text: 'Choose the correct sentence:', options: ['They like music.', 'They likes music.'], correct: 0, explanation: 'They + like.', explanationRu: "They + like." },
              { text: 'Choose the correct sentence:', options: ['We go to school by bus.', 'We goes to school by bus.'], correct: 0, explanation: 'We + go.', explanationRu: "We + go." },
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
              { text: 'I ___ in a big company.', options: ['work', 'works'], correct: 0, explanation: 'I work.', explanationRu: "I work." },
              { text: 'You ___ fast.', options: ['run', 'runs'], correct: 0, explanation: 'You run.', explanationRu: "You run." },
              { text: 'Choose the correct sentence:', options: ['They eat breakfast at 8 AM.', 'They eats breakfast at 8 AM.'], correct: 0, explanation: 'They eat.', explanationRu: "They eat." },
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
              { text: 'He ___ in a bank.', options: ['work', 'works', 'working'], correct: 1, explanation: 'He (3-shaxs) -> works.', explanationRu: "He (3-е лицо) -> works." },
              { text: 'She ___ English.', options: ['know', 'knows'], correct: 1, explanation: 'She (3-shaxs) -> knows.', explanationRu: "She (3-е лицо) -> knows." },
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
              { text: 'He ___ TV every evening. (watch)', options: ['watchs', 'watches', 'watch'], correct: 1, explanation: 'watch + -es -> watches.', explanationRu: "watch + -es -> watches." },
              { text: 'She ___ to school by bus. (go)', options: ['gos', 'goes', 'go'], correct: 1, explanation: 'go + -es -> goes.', explanationRu: "go + -es -> goes." },
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
              { text: 'Tom ___ history at university. (study)', options: ['studys', 'studies', 'study'], correct: 1, explanation: 'study -> studies.', explanationRu: "study -> studies." },
              { text: 'He ___ tennis on Saturdays. (play)', options: ['plays', 'plaies', 'play'], correct: 0, explanation: 'play unli+y -> plays.', explanationRu: "play гласная+y -> plays." },
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
              { text: 'She ___ a new computer.', options: ['have', 'has', 'haves'], correct: 1, explanation: 'She (3-shaxs) -> has.', explanationRu: "She (3-е лицо) -> has." },
              { text: 'Tom ___ a big house.', options: ['has', 'have'], correct: 0, explanation: 'Tom -> has.', explanationRu: "Tom -> has." },
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
              { text: 'Choose the correct sentence:', options: ['She lives in Tashkent.', 'She live in Tashkent.'], correct: 0, explanation: 'She lives.', explanationRu: "She lives." },
              { text: 'Choose the correct sentence:', options: ['He washes his car.', 'He washs his car.'], correct: 0, explanation: 'wash -> washes.', explanationRu: "wash -> washes." },
              { text: 'Choose the correct sentence:', options: ['Anna has two brothers.', 'Anna haves two brothers.'], correct: 0, explanation: 'Anna has.', explanationRu: "Anna has." },
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
              { text: 'I ___ eat meat.', options: ["don't", "doesn't", "not"], correct: 0, explanation: 'I + don\'t.', explanationRu: "I + don't." },
              { text: 'We ___ live in London.', options: ["don't", "doesn't"], correct: 0, explanation: 'We + don\'t.', explanationRu: "We + don't." },
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
              { text: 'They don\'t ___ football.', options: ['play', 'plays', 'playing'], correct: 0, explanation: 'don\'t + play (bosh shakl).', explanationRu: "don't + play (начальная форма)." },
              { text: 'You don\'t ___ early.', options: ['wake up', 'wakes up'], correct: 0, explanation: 'don\'t + wake up.', explanationRu: "don't + wake up." },
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
              { text: 'I don\'t ___ a car.', options: ['have', 'has'], correct: 0, explanation: 'don\'t + have.', explanationRu: "don't + have." },
              { text: 'We don\'t ___ TV.', options: ['watch', 'watches'], correct: 0, explanation: 'don\'t + watch.', explanationRu: "don't + watch." },
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
              { text: 'Choose the correct sentence:', options: ['I don\'t speak Spanish.', 'I not speak Spanish.'], correct: 0, explanation: 'don\'t speak.', explanationRu: "don't speak." },
              { text: 'Choose the correct sentence:', options: ['They don\'t understand.', 'They doesn\'t understand.'], correct: 0, explanation: 'They don\'t.', explanationRu: "They don't." },
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
              { text: 'We ___ know the answer.', options: ["don't", "doesn't"], correct: 0, explanation: 'We don\'t.', explanationRu: "We don't." },
              { text: 'They ___ like fast food.', options: ["don't", "doesn't"], correct: 0, explanation: 'They don\'t.', explanationRu: "They don't." },
              { text: 'Select the correct sentence:', options: ['I don\'t have time.', 'I no have time.'], correct: 0, explanation: 'I don\'t have time.', explanationRu: "I don't have time." },
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
              { text: 'He ___ like milk.', options: ["don't", "doesn't", "not"], correct: 1, explanation: 'He + doesn\'t.', explanationRu: "He + doesn't." },
              { text: 'She ___ live in Paris.', options: ["don't", "doesn't"], correct: 1, explanation: 'She + doesn\'t.', explanationRu: "She + doesn't." },
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
              { text: 'She doesn\'t ___ TV.', options: ['watch', 'watches'], correct: 0, explanation: 'doesn\'t dan keyin fe\'lda -es bo\'lmaydi: watch.', explanationRu: "После doesn't у глагола нет -es: watch." },
              { text: 'He doesn\'t ___ fast.', options: ['run', 'runs'], correct: 0, explanation: 'doesn\'t + run.', explanationRu: "doesn't + run." },
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
              { text: 'Tom doesn\'t ___ a bicycle.', options: ['have', 'has'], correct: 0, explanation: 'doesn\'t + have.', explanationRu: "doesn't + have." },
              { text: 'She doesn\'t ___ any money.', options: ['have', 'has'], correct: 0, explanation: 'doesn\'t + have.', explanationRu: "doesn't + have." },
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
              { text: 'Choose the correct sentence:', options: ['He doesn\'t like tea.', 'He don\'t like tea.'], correct: 0, explanation: 'He doesn\'t.', explanationRu: "He doesn't." },
              { text: 'Choose the correct sentence:', options: ['She doesn\'t work on Saturdays.', 'She doesn\'t works on Saturdays.'], correct: 0, explanation: 'doesn\'t work (qo\'shimchasiz).', explanationRu: "doesn't work (без окончания)." },
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
              { text: 'Sarah ___ drink coffee.', options: ["doesn't", "don't"], correct: 0, explanation: 'Sarah (she) -> doesn\'t.', explanationRu: "Sarah (she) -> doesn't." },
              { text: 'The cat ___ eat cheese.', options: ["doesn't", "don't"], correct: 0, explanation: 'cat (it) -> doesn\'t.', explanationRu: "cat (it) -> doesn't." },
              { text: 'Select the correct sentence:', options: ['He doesn\'t study at night.', 'He doesn\'t studies at night.'], correct: 0, explanation: 'doesn\'t study.', explanationRu: "doesn't study." },
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
              { text: '___ you like music?', options: ['Do', 'Does', 'Are'], correct: 0, explanation: 'Do you...?', explanationRu: "Do you...?" },
              { text: '___ they work together?', options: ['Do', 'Does'], correct: 0, explanation: 'Do they...?', explanationRu: "Do they...?" },
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
              { text: 'Do you like pizza? — Yes, I ___ .', options: ['do', 'does', 'am'], correct: 0, explanation: 'Yes, I do.', explanationRu: "Yes, I do." },
              { text: 'Do they live in London? — No, they ___ .', options: ["don't", "doesn't"], correct: 0, explanation: 'No, they don\'t.', explanationRu: "No, they don't." },
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
              { text: 'Do you ___ a car?', options: ['have', 'has'], correct: 0, explanation: 'Do you + have.', explanationRu: "Do you + have." },
              { text: 'Do we ___ time?', options: ['have', 'has'], correct: 0, explanation: 'Do we + have.', explanationRu: "Do we + have." },
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
              { text: 'Choose the correct question:', options: ['Do you play football?', 'You do play football?'], correct: 0, explanation: 'Do + ega + fe\'l.', explanationRu: "Do + подлежащее + глагол." },
              { text: 'Choose the correct question:', options: ['Do they understand?', 'Does they understand?'], correct: 0, explanation: 'Do they.', explanationRu: "Do they." },
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
              { text: '___ you drink tea in the morning?', options: ['Do', 'Does'], correct: 0, explanation: 'Do you...', explanationRu: "Do you..." },
              { text: 'Do they know the rules? — Yes, they ___ .', options: ['do', 'does'], correct: 0, explanation: 'Yes, they do.', explanationRu: "Yes, they do." },
              { text: 'Select the correct question:', options: ['Do we need help?', 'Does we need help?'], correct: 0, explanation: 'Do we...', explanationRu: "Do we..." },
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
              { text: '___ he live in Tashkent?', options: ['Do', 'Does', 'Is'], correct: 1, explanation: 'Does he...?', explanationRu: "Does he...?" },
              { text: '___ she like coffee?', options: ['Do', 'Does'], correct: 1, explanation: 'Does she...?', explanationRu: "Does she...?" },
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
              { text: 'Does he ___ here?', options: ['work', 'works'], correct: 0, explanation: 'Does dan keyin fe\'lda -s bo\'lmaydi: work.', explanationRu: "После Does у глагола нет -s: work." },
              { text: 'Does she ___ English?', options: ['speak', 'speaks'], correct: 0, explanation: 'Does + speak.', explanationRu: "Does + speak." },
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
              { text: 'Does she like music? — Yes, she ___ .', options: ['does', 'do', 'is'], correct: 0, explanation: 'Yes, she does.', explanationRu: "Yes, she does." },
              { text: 'Does it rain a lot? — No, it ___ .', options: ["doesn't", "don't"], correct: 0, explanation: 'No, it doesn\'t.', explanationRu: "No, it doesn't." },
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
              { text: 'Does Mark ___ a computer?', options: ['have', 'has'], correct: 0, explanation: 'Does + have.', explanationRu: "Does + have." },
              { text: 'Does she ___ any sisters?', options: ['have', 'has'], correct: 0, explanation: 'Does + have.', explanationRu: "Does + have." },
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
              { text: 'Choose the correct question:', options: ['Does she like apples?', 'Does she likes apples?'], correct: 0, explanation: 'Does she like...', explanationRu: "Does she like..." },
              { text: 'Choose the correct question:', options: ['Does Tom speak French?', 'Do Tom speak French?'], correct: 0, explanation: 'Tom (he) -> Does.', explanationRu: "Tom (he) -> Does." },
              { text: 'Select the correct answer: Does he live here?', options: ['No, he doesn\'t.', 'No, he don\'t.'], correct: 0, explanation: 'No, he doesn\'t.', explanationRu: "No, he doesn't." },
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
              { text: 'Where ___ you live?', options: ['do', 'does', 'are'], correct: 0, explanation: 'Where do you live?', explanationRu: "Where do you live?" },
              { text: 'What time ___ she get up?', options: ['does', 'do'], correct: 0, explanation: 'she -> does.', explanationRu: "she -> does." },
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
              { text: 'Takroriylik ravishlari fe\'ldan qayerda keladi?', options: ['Fe\'ldan OLDIN', 'Fe\'ldan KEYIN', 'Gap oxirida'], correct: 0, explanation: 'Ravishlar asosiy fe\'ldan OLDIN keladi.', explanationRu: "Наречия ставятся ПЕРЕД основным глаголом." },
              { text: 'I ___ drink tea in the morning. (doim)', options: ['always', 'never'], correct: 0, explanation: 'doim = always.', explanationRu: "doim (всегда) = always." },
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
              { text: 'She usually ___ early. (come)', options: ['comes', 'come'], correct: 0, explanation: 'She + comes.', explanationRu: "She + comes." },
              { text: 'He never ___ fast food. (eat)', options: ['eats', 'eat'], correct: 0, explanation: 'He + eats.', explanationRu: "He + eats." },
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
              { text: '___ often do you read books?', options: ['How', 'What', 'Where'], correct: 0, explanation: 'How often...?', explanationRu: "How often...?" },
              { text: 'How often ___ she visit her grandma?', options: ['does', 'do'], correct: 0, explanation: 'she -> does.', explanationRu: "she -> does." },
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
              { text: 'What ___ you usually eat for breakfast?', options: ['do', 'does'], correct: 0, explanation: 'What do you...', explanationRu: "What do you..." },
              { text: 'Choose the correct sentence:', options: ['He always drinks milk.', 'He drinks always milk.'], correct: 0, explanation: 'He always drinks...', explanationRu: "He always drinks..." },
              { text: 'Select the correct sentence:', options: ['Where does he live?', 'Where he lives?'], correct: 0, explanation: 'Where does he live?', explanationRu: "Where does he live?" },
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
              { text: 'I ___ tired today.', options: ['am', 'do', 'work'], correct: 0, explanation: 'sifat (tired) bilan: am.', explanationRu: "с прилагательным (tired): am." },
              { text: 'I ___ in a bank.', options: ['work', 'am', 'is'], correct: 0, explanation: 'harakat fe\'li: work.', explanationRu: "глагол действия: work." },
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
              { text: 'She ___ a student. She ___ work.', options: ['is / doesn\'t', 'does / isn\'t'], correct: 0, explanation: 'is a student / doesn\'t work.', explanationRu: "is a student / doesn't work." },
              { text: 'They ___ at home. They ___ go out.', options: ['are / don\'t', 'do / aren\'t'], correct: 0, explanation: 'are at home / don\'t go.', explanationRu: "are at home / don't go." },
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
              { text: 'Choose the correct sentence:', options: ['Does she have a car?', 'Does she has a car?'], correct: 0, explanation: 'Does + have.', explanationRu: "Does + have." },
              { text: 'Choose the correct sentence:', options: ['He doesn\'t like coffee.', 'He don\'t likes coffee.'], correct: 0, explanation: 'He doesn\'t like.', explanationRu: "He doesn't like." },
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
              { text: '— ___ your brother speak English? — Yes, he ___ .', options: ['Does / does', 'Do / do'], correct: 0, explanation: 'Does your brother / he does.', explanationRu: "Does your brother / he does." },
              { text: '— What do you do? — I ___ at school.', options: ['teach', 'teaches'], correct: 0, explanation: 'I teach.', explanationRu: "I teach." },
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
              { text: 'Choose the correct sentence:', options: ['He plays tennis every Sunday.', 'He play tennis every Sunday.'], correct: 0, explanation: 'He + plays.', explanationRu: "He + plays." },
              { text: 'Choose the correct sentence:', options: ['Where does she work?', 'Where she works?'], correct: 0, explanation: 'Where does she work?', explanationRu: "Where does she work?" },
              { text: 'Choose the correct sentence:', options: ['They don\'t have a car.', 'They doesn\'t have a car.'], correct: 0, explanation: 'They don\'t.', explanationRu: "They don't." },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Present Simple Zamoni",
      titleRu: 'Тест раздела: Настоящее простое время (Present Simple)',
      exercises: [
        { text: 'I ___ in Tashkent.', options: ['live', 'lives', 'living'], correct: 0, explanation: 'I + live.', explanationRu: "I + live." },
        { text: 'He ___ in a big hospital.', options: ['work', 'works', 'working'], correct: 1, explanation: 'He (3-shaxs) -> works.', explanationRu: "He (3-е лицо) -> works." },
        { text: 'She ___ to school by bus. (go)', options: ['gos', 'goes', 'go'], correct: 1, explanation: 'go -> goes.', explanationRu: "go -> goes." },
        { text: 'Tom ___ history at university.', options: ['studys', 'studies'], correct: 1, explanation: 'study -> studies.', explanationRu: "study -> studies." },
        { text: 'Sarah ___ a new car.', options: ['have', 'has'], correct: 1, explanation: 'Sarah (she) -> has.', explanationRu: "Sarah (she) -> has." },
        { text: 'I ___ eat fast food.', options: ["don't", "doesn't"], correct: 0, explanation: 'I + don\'t.', explanationRu: "I + don't." },
        { text: 'He ___ like cold weather.', options: ["don't", "doesn't"], correct: 1, explanation: 'He + doesn\'t.', explanationRu: "He + doesn't." },
        { text: 'She doesn\'t ___ tea.', options: ['drink', 'drinks'], correct: 0, explanation: 'doesn\'t + drink (qo\'shimchasiz).', explanationRu: "doesn't + drink (без окончания)." },
        { text: 'He doesn\'t ___ a bicycle.', options: ['have', 'has'], correct: 0, explanation: 'doesn\'t + have.', explanationRu: "doesn't + have." },
        { text: '___ you speak English?', options: ['Do', 'Does', 'Are'], correct: 0, explanation: 'Do you...?', explanationRu: "Do you...?" },
        { text: '___ she live near here?', options: ['Do', 'Does', 'Is'], correct: 1, explanation: 'Does she...?', explanationRu: "Does she...?" },
        { text: 'Does he like tennis? — Yes, he ___ .', options: ['does', 'do', 'is'], correct: 0, explanation: 'Yes, he does.', explanationRu: "Yes, he does." },
        { text: 'Where ___ you work?', options: ['do', 'does'], correct: 0, explanation: 'Where do you...?', explanationRu: "Where do you...?" },
        { text: 'He ___ drinks coffee in the evening. (hech qachon)', options: ['never', 'always'], correct: 0, explanation: 'hech qachon = never.', explanationRu: "никогда = never." },
        { text: 'Choose the correct sentence:', options: ['Does she have a cat?', 'Does she has a cat?'], correct: 0, explanation: 'Does + have.', explanationRu: "Does + have." },
      ],
    },
  },
  {
    id: 'sec-present-continuous',
    order: 8,
    title: "Present Continuous Zamoni (Hozirgi Davomli Zamon)",
    titleRu: 'Настоящее длительное время (Present Continuous)',
    icon: '⚡',
    lessons: [
      {
        id: 'sec-present-continuous-l1',
        order: 1,
        title: "Present Continuous va Darak gaplar (am/is/are + V-ing)",
        titleRu: 'Present Continuous и утверждения (am/is/are + V-ing)',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: "Present Continuous — aynan hozir, ayni daqiqada sodir bo'layotgan ish-harakatlar uchun ishlatiladi.",
              ruleRu: 'Present Continuous используется для действий, происходящих прямо сейчас, в данный момент.',
              formula: 'Subject + am / is / are + Verb-ing + Complement',
              example: 'I am reading a book now. (Men hozir kitob o\'qiyapman.) She is sleeping.',
              exampleRu: 'I am reading a book now. She is sleeping.',
            },
            exercises: [
              { text: 'Present Continuous da fe\'ldan oldin nima keladi?', textRu: "Что стоит перед глаголом в Present Continuous?", options: ['am / is / are', 'do / does', 'have / has'], correct: 0, explanation: 'Present Continuous da to be (am/is/are) yordamchi fe\'li ishlatiladi.', explanationRu: "В Present Continuous используется вспомогательный глагол to be (am/is/are)." },
              { text: 'I ___ reading a book right now.', options: ['am', 'is', 'are'], correct: 0, explanation: 'I bilan "am" ishlatiladi.', explanationRu: "С I используется \"am\"." },
            ],
          },
          {
            teach: {
              rule: 'Ega va yordamchi fe\'l mosligi: I am, He/She/It is, We/You/They are.',
              ruleRu: 'Согласование: I am, He/She/It is, We/You/They are.',
              formula: 'I am | He/She/It is | We/You/They are + V-ing',
              example: 'He is working. They are playing football in the garden.',
              exampleRu: 'He is working. They are playing football.',
            },
            exercises: [
              { text: 'She ___ watching TV at the moment.', options: ['is', 'are', 'am'], correct: 0, explanation: 'She bilan "is" ishlatiladi.', explanationRu: "С She используется \"is\"." },
              { text: 'They ___ playing football in the yard.', options: ['are', 'is', 'am'], correct: 0, explanation: 'They bilan "are" ishlatiladi.', explanationRu: "С They используется \"are\"." },
            ],
          },
          {
            teach: {
              rule: 'Hozirgi vaqt kalit so\'zlari: now (hozir), right now, at the moment (ayni damda), Look!, Listen!.',
              ruleRu: 'Указатели времени: now, right now, at the moment, Look!, Listen!.',
              formula: 'Look! / Listen! + Subject + am/is/are + Verb-ing',
              example: 'Look! The bus is coming. Listen! Someone is singing.',
              exampleRu: 'Look! The bus is coming. Listen! Someone is singing.',
            },
            exercises: [
              { text: 'Look! The train ___ .', options: ['is coming', 'comes', 'come'], correct: 0, explanation: 'Look! -> Hozir sodir bo\'layotgan harakat (is coming).', explanationRu: "Look! -> действие, происходящее сейчас (is coming)." },
              { text: 'Listen! The baby ___ .', options: ['is crying', 'cries', 'cry'], correct: 0, explanation: 'Listen! -> is crying.', explanationRu: "Listen! -> is crying." },
            ],
          },
          {
            teach: {
              rule: 'Qisqartma shakllar: I\'m, He\'s, She\'s, It\'s, We\'re, You\'re, They\'re.',
              ruleRu: 'Сокращенные формы: I\'m, He\'s, She\'s, We\'re, They\'re.',
              formula: 'Subject\'m / \'s / \'re + Verb-ing',
              example: 'I\'m learning English. They\'re coming home.',
              exampleRu: 'I\'m learning English. They\'re coming home.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I\'m writing an email now.', 'I writing an email now.'], correct: 0, explanation: 'I\'m writing (am shart!).', explanationRu: "I'm writing (am обязателен!)." },
              { text: 'Choose the correct sentence:', options: ['They\'re listening to music.', 'They listening to music.'], correct: 0, explanation: 'They\'re listening.', explanationRu: "They're listening." },
            ],
          },
          {
            teach: {
              rule: 'Darak gaplar qoidalarini birlashtiramiz (am/is/are + V-ing).',
              ruleRu: 'Обобщим утвердительные предложения в Present Continuous.',
              formula: 'Subject + am/is/are + Verb-ing + Complement',
              example: 'I am studying, he is eating, and they are dancing.',
              exampleRu: 'I am studying, he is eating, and they are dancing.',
            },
            exercises: [
              { text: 'We ___ for the bus right now.', options: ['are waiting', 'is waiting', 'wait'], correct: 0, explanation: 'We + are waiting.', explanationRu: "We + are waiting." },
              { text: 'Tom ___ his car now.', options: ['is washing', 'are washing', 'washes'], correct: 0, explanation: 'Tom (he) + is washing.', explanationRu: "Tom (he) + is washing." },
              { text: 'Select the correct sentence:', options: ['She is reading a magazine.', 'She reading a magazine.'], correct: 0, explanation: 'She is reading.', explanationRu: "She is reading." },
            ],
          },
        ],
      },
      {
        id: 'sec-present-continuous-l2',
        order: 2,
        title: "Fe'llarga -ing qo'shish qoidalari",
        titleRu: 'Правила добавления окончания -ing к глаголам',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: "Ko'pchilik fe'llarga shunchaki -ing qo'shiladi (work -> working, play -> playing).",
              ruleRu: 'К большинству глаголов просто добавляется -ing (work -> working).',
              formula: 'Verb + -ing (work ➔ working | play ➔ playing)',
              example: 'do -> doing, speak -> speaking, read -> reading',
              exampleRu: 'do -> doing, speak -> speaking',
            },
            exercises: [
              { text: '"read" fe\'liga -ing qo\'shilsa qanday bo\'ladi?', textRu: "Как выглядит глагол \"read\" с окончанием -ing?", options: ['reading', 'readed', 'readings'], correct: 0, explanation: 'read + ing -> reading.', explanationRu: "read + ing -> reading." },
              { text: '"play" fe\'liga -ing qo\'shilishi:', options: ['playing', 'plaing', 'playng'], correct: 0, explanation: 'play + ing -> playing.', explanationRu: "play + ing -> playing." },
            ],
          },
          {
            teach: {
              rule: 'Fe\'l o\'qilmaydigan "-e" bilan tugasa, "-e" tushib qoladi (make -> making, write -> writing).',
              ruleRu: 'Если глагол оканчивается на немую "-e", она опускается (make -> making).',
              formula: 'Verb (-e) ➔ drop "e" + -ing (make ➔ making)',
              example: 'write -> writing, come -> coming, live -> living, take -> taking',
              exampleRu: 'write -> writing, come -> coming',
            },
            exercises: [
              { text: '"write" fe\'liga -ing qo\'shilganda qanday yoziladi?', textRu: "Как пишется глагол \"write\" с окончанием -ing?", options: ['writing', 'writeing', 'writting'], correct: 0, explanation: 'e tushib qoladi: writing.', explanationRu: "гласная e опускается: writing." },
              { text: '"make" fe\'lining -ing shakli:', options: ['making', 'makeing'], correct: 0, explanation: 'make -> making.', explanationRu: "make -> making." },
            ],
          },
          {
            teach: {
              rule: 'Qisqa fe\'l 1 unli + 1 undosh bilan tugasa, oxirgi undosh Ikki baravar ko\'payadi (run -> running, sit -> sitting, swim -> swimming).',
              ruleRu: 'Если короткий глагол оканчивается на 1 гласную + 1 согласную, согласная удваивается (run -> running).',
              formula: 'Short Verb (1 Vowel + 1 Consonant) ➔ Double Consonant + -ing',
              example: 'swim -> swimming, stop -> stopping, get -> getting, run -> running',
              exampleRu: 'swim -> swimming, stop -> stopping',
            },
            exercises: [
              { text: '"run" fe\'liga -ing qo\'shilsa qanday yoziladi?', textRu: "Как пишется глагол \"run\" с окончанием -ing?", options: ['running', 'runing', 'runed'], correct: 0, explanation: 'undosh ikkilanadi: running.', explanationRu: "согласная удваивается: running." },
              { text: '"swim" fe\'lining -ing shakli:', options: ['swimming', 'swiming'], correct: 0, explanation: 'swim -> swimming.', explanationRu: "swim -> swimming." },
            ],
          },
          {
            teach: {
              rule: 'Fe\'l "-ie" bilan tugasa, "-ie" harflari "y" ga aylanadi (die -> dying, lie -> lying).',
              ruleRu: 'Если глагол оканчивается на "-ie", они меняются на "y" (die -> dying).',
              formula: 'Verb (-ie) ➔ -ie changes to "y" + -ing (lie ➔ lying)',
              example: 'die -> dying, lie -> lying, tie -> tying',
              exampleRu: 'die -> dying, lie -> lying',
            },
            exercises: [
              { text: '"lie" fe\'lining -ing shaklini toping:', textRu: "Найдите форму глагола \"lie\" с -ing:", options: ['lying', 'lieing', 'ling'], correct: 0, explanation: 'lie -> lying.', explanationRu: "lie -> lying." },
              { text: '"die" fe\'liga -ing qo\'shilishi:', options: ['dying', 'dieing'], correct: 0, explanation: 'die -> dying.', explanationRu: "die -> dying." },
            ],
          },
          {
            teach: {
              rule: '-ing imlo qoidalarini birlashtiramiz (working, writing, running, lying).',
              ruleRu: 'Обобщим правила правописания -ing.',
              formula: 'Check ending: standard (-ing) | -e (drop e) | 1v+1c (double) | -ie (y+ing)',
              example: 'playing, dancing, swimming, dying',
              exampleRu: 'playing, dancing, swimming, dying',
            },
            exercises: [
              { text: 'Choose the correct form of "dance":', options: ['dancing', 'danceing'], correct: 0, explanation: 'dance -> dancing (-e tushadi).', explanationRu: "dance -> dancing (-e опускается)." },
              { text: 'Choose the correct form of "sit":', options: ['sitting', 'siting'], correct: 0, explanation: 'sit -> sitting (undosh ikkilanadi).', explanationRu: "sit -> sitting (согласная удваивается)." },
              { text: 'Choose the correct sentence:', options: ['He is running in the park.', 'He is runing in the park.'], correct: 0, explanation: 'running.', explanationRu: "running." },
            ],
          },
        ],
      },
      {
        id: 'sec-present-continuous-l3',
        order: 3,
        title: "Inkor gaplar: am not / isn't / aren't + V-ing",
        titleRu: 'Отрицание: am not / isn\'t / aren\'t + V-ing',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: 'Present Continuous inkor shakli yordamchi fe\'ldan keyin "not" qo\'yish bilan yasaladi.',
              ruleRu: 'Отрицание образуется путем добавления "not" после am/is/are.',
              formula: 'Subject + am not / is not / are not + Verb-ing + Complement',
              example: 'I am not working now. (Men hozir ishlamayapman.) She is not reading.',
              exampleRu: 'I am not working now. She is not reading.',
            },
            exercises: [
              { text: 'I ___ working right now.', options: ["am not", "is not", "don't"], correct: 0, explanation: 'I + am not working.', explanationRu: "I + am not working." },
              { text: 'He ___ sleeping at the moment.', options: ["isn't", "aren't", "doesn't"], correct: 0, explanation: 'He + isn\'t sleeping.', explanationRu: "He + isn't sleeping." },
            ],
          },
          {
            teach: {
              rule: 'Qisqartma inkor shakllar: isn\'t (is not), aren\'t (are not). (am not qisqarmaydi: I\'m not).',
              ruleRu: 'Сокращения: isn\'t, aren\'t. Для I: I\'m not.',
              formula: 'I\'m not | He/She/It isn\'t | We/You/They aren\'t + V-ing',
              example: 'We aren\'t playing. He isn\'t listening to music.',
              exampleRu: 'We aren\'t playing. He isn\'t listening.',
            },
            exercises: [
              { text: 'They ___ coming with us today.', options: ["aren't", "isn't", "don't"], correct: 0, explanation: 'They + aren\'t.', explanationRu: "They + aren't." },
              { text: 'She ___ listening to you.', options: ["isn't", "aren't"], correct: 0, explanation: 'She + isn\'t.', explanationRu: "She + isn't." },
            ],
          },
          {
            teach: {
              rule: 'Hozir sodir bo\'lmayotgan harakat haqida gapirish.',
              ruleRu: 'Выражение действий, не происходящих в данный момент.',
              formula: 'Subject + isn\'t / aren\'t + Verb-ing + now',
              example: 'It isn\'t raining now. You aren\'t concentrating.',
              exampleRu: 'It isn\'t raining now. You aren\'t concentrating.',
            },
            exercises: [
              { text: 'It ___ raining right now. The sun is shining.', options: ["isn't", "aren't", "not"], correct: 0, explanation: 'It + isn\'t raining.', explanationRu: "It + isn't raining." },
              { text: 'We ___ watching TV now. We are studying.', options: ["aren't", "isn't"], correct: 0, explanation: 'We + aren\'t watching.', explanationRu: "We + aren't watching." },
            ],
          },
          {
            teach: {
              rule: 'Darak va inkor gaplarni taqqoslash (He is working -> He isn\'t working).',
              ruleRu: 'Сравнение утверждений и отрицаний.',
              formula: 'Affirmative: is/are + V-ing  |  Negative: isn\'t/aren\'t + V-ing',
              example: 'I\'m not eating, I\'m drinking water.',
              exampleRu: 'I\'m not eating, I\'m drinking water.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['She isn\'t working today.', 'She not working today.'], correct: 0, explanation: 'She isn\'t working.', explanationRu: "She isn't working." },
              { text: 'Choose the correct sentence:', options: ['They aren\'t playing football.', 'They don\'t playing football.'], correct: 0, explanation: 'aren\'t playing.', explanationRu: "aren't playing." },
            ],
          },
          {
            teach: {
              rule: 'Inkor qoidalarini birlashtiramiz (I\'m not, isn\'t, aren\'t).',
              ruleRu: 'Обобщим отрицательные предложения в Present Continuous.',
              formula: 'Subject + am not / isn\'t / aren\'t + Verb-ing',
              example: 'I\'m not sleeping, he isn\'t working, and they aren\'t coming.',
              exampleRu: 'I\'m not sleeping, he isn\'t working.',
            },
            exercises: [
              { text: 'Tom ___ driving a car right now.', options: ["isn't", "aren't"], correct: 0, explanation: 'Tom (he) + isn\'t.', explanationRu: "Tom (he) + isn't." },
              { text: 'You ___ listening to the teacher.', options: ["aren't", "isn't"], correct: 0, explanation: 'You + aren\'t.', explanationRu: "You + aren't." },
              { text: 'Select the correct sentence:', options: ['I\'m not crying.', 'I am no crying.'], correct: 0, explanation: 'I\'m not crying.', explanationRu: "I'm not crying." },
            ],
          },
        ],
      },
      {
        id: 'sec-present-continuous-l4',
        order: 4,
        title: "So'roq gaplar: Am / Is / Are ... + V-ing ?",
        titleRu: 'Вопросы: Am / Is / Are ... + V-ing ?',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: 'Present Continuous so\'roq gaplarida am/is/are ega (subject)dan OLDINGA o\'tadi.',
              ruleRu: 'В вопросах am/is/are ставятся ПЕРЕД подлежащим.',
              formula: 'Am / Is / Are + Subject + Verb-ing + Complement ?',
              example: 'Are you reading? (Kitob o\'qiyapsizmi?) Is he sleeping?',
              exampleRu: 'Are you reading? Is he sleeping?',
            },
            exercises: [
              { text: '___ you working right now?', options: ['Are', 'Is', 'Do'], correct: 0, explanation: 'Are you working...?', explanationRu: "Are you working...?" },
              { text: '___ she cooking dinner at the moment?', options: ['Is', 'Are', 'Does'], correct: 0, explanation: 'Is she cooking...?', explanationRu: "Is she cooking...?" },
            ],
          },
          {
            teach: {
              rule: 'Qisqa javoblar: Yes, I am. / No, I\'m not. Yes, he is. / No, he isn\'t.',
              ruleRu: 'Краткие ответы: Yes, I am. / No, I\'m not. Yes, he is. / No, he isn\'t.',
              formula: 'Yes, Subject + am/is/are  |  No, Subject + \'m not/isn\'t/aren\'t',
              example: 'Are you listening? — Yes, I am. / No, I\'m not.',
              exampleRu: 'Are you listening? — Yes, I am.',
            },
            exercises: [
              { text: 'Is Tom sleeping? — Yes, he ___ .', options: ['is', 'does', 'am'], correct: 0, explanation: 'Yes, he is.', explanationRu: "Yes, he is." },
              { text: 'Are they coming? — No, they ___ .', options: ["aren't", "don't"], correct: 0, explanation: 'No, they aren\'t.', explanationRu: "No, they aren't." },
            ],
          },
          {
            teach: {
              rule: 'Maxsus so\'roq gaplar (Wh- questions): What, Where, Why + am/is/are + Ega + V-ing ?.',
              ruleRu: 'Специальные вопросы (Wh-): What/Where/Why + am/is/are + Подлежащее + V-ing ?',
              formula: 'Wh- word + am / is / are + Subject + Verb-ing ?',
              example: 'What are you doing? Where is he going?',
              exampleRu: 'What are you doing? Where is he going?',
            },
            exercises: [
              { text: 'What ___ you doing right now?', options: ['are', 'is', 'do'], correct: 0, explanation: 'What are you doing?', explanationRu: "What are you doing?" },
              { text: 'Where ___ she going at this hour?', options: ['is', 'are', 'does'], correct: 0, explanation: 'Where is she going?', explanationRu: "Where is she going?" },
            ],
          },
          {
            teach: {
              rule: 'So\'roq gap so\'z tartibi: Yordamchi fe\'l + Ega + Asosiy fe\'l-ing.',
              ruleRu: 'Порядок слов: Am/Is/Are + Подлежащее + Глагол-ing.',
              formula: 'Am/Is/Are + Subject + Verb-ing ?',
              example: 'Is it raining outside?',
              exampleRu: 'Is it raining outside?',
            },
            exercises: [
              { text: 'Choose the correct question:', options: ['Are you studying English?', 'You are studying English?'], correct: 0, explanation: 'Are + subject + V-ing.', explanationRu: "Are + подлежащее + глагол-ing." },
              { text: 'Choose the correct question:', options: ['Why is he crying?', 'Why he is crying?'], correct: 0, explanation: 'Why is he crying?', explanationRu: "Why is he crying?" },
            ],
          },
          {
            teach: {
              rule: 'So\'roq qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим вопросительные предложения в Present Continuous.',
              formula: 'Am/Is/Are + Subject + Verb-ing + ?',
              example: 'Are you listening? What are you reading?',
              exampleRu: 'Are you listening? What are you reading?',
            },
            exercises: [
              { text: '___ they playing tennis in the court?', options: ['Are', 'Is'], correct: 0, explanation: 'Are they playing...?', explanationRu: "Are they playing...?" },
              { text: 'Is Anna writing a letter? — No, she ___ .', options: ["isn't", "doesn't"], correct: 0, explanation: 'No, she isn\'t.', explanationRu: "No, she isn't." },
              { text: 'Select the correct question:', options: ['Where are we going?', 'Where we are going?'], correct: 0, explanation: 'Where are we going?', explanationRu: "Where are we going?" },
            ],
          },
        ],
      },
      {
        id: 'sec-present-continuous-l5',
        order: 5,
        title: 'Present Continuous vs Present Simple (Hozir vs Har doim)',
        titleRu: 'Present Continuous vs Present Simple (Сейчас vs Всегда)',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: 'DIQQAT! Present Simple — doimiy odat va rejim (har kuni). Present Continuous — faqat hozir sodir bo\'layotgan harakat.',
              ruleRu: 'Present Simple — обычные регулярные действия. Present Continuous — действия прямо сейчас.',
              formula: 'Present Simple (Every day / Usually)  vs  Present Continuous (Now / Right now)',
              example: 'I drink coffee every day (PS). But now I am drinking tea (PC).',
              exampleRu: 'I drink coffee every day vs I am drinking tea now.',
            },
            exercises: [
              { text: 'I usually ___ tea, but today I ___ coffee.', options: ['drink / am drinking', 'am drinking / drink'], correct: 0, explanation: 'usually drink (PS) / today am drinking (PC).', explanationRu: "usually drink (PS) / today am drinking (PC)." },
              { text: 'He ___ football every Sunday, but now he ___ books.', options: ['plays / is reading', 'is playing / reads'], correct: 0, explanation: 'every Sunday plays / now is reading.', explanationRu: "every Sunday plays / now is reading." },
            ],
          },
          {
            teach: {
              rule: 'Kalit so\'zlarni solishtirish: always, usually, every day (Simple) vs now, at the moment, today (Continuous).',
              ruleRu: 'Сравнение маркеров времени: every day (Simple) vs right now (Continuous).',
              formula: 'Simple: every day | Continuous: right now',
              example: 'She drives to work every day. She is driving now.',
              exampleRu: 'She drives to work every day. She is driving now.',
            },
            exercises: [
              { text: 'Look! The sun ___ . (shine)', options: ['is shining', 'shines'], correct: 0, explanation: 'Look! -> Present Continuous (is shining).', explanationRu: "Look! -> Present Continuous (is shining)." },
              { text: 'The sun ___ in the east. (rise)', options: ['rises', 'is rising'], correct: 0, explanation: 'Umumiy haqiqat -> Present Simple (rises).', explanationRu: "Общий факт -> Present Simple (rises)." },
            ],
          },
          {
            teach: {
              rule: 'Vaqtinchalik holatlar (Temporary Situations): This week, these days -> Present Continuous.',
              ruleRu: 'Временные ситуации (this week, these days) -> Present Continuous.',
              formula: 'Subject + am/is/are + Verb-ing (this week / temporary)',
              example: 'I live in Tashkent (doimiy). I am staying at a hotel this week (vaqtinchalik).',
              exampleRu: 'I live in Tashkent vs I am staying at a hotel this week.',
            },
            exercises: [
              { text: 'I ___ with my friend this week.', options: ['am staying', 'stay'], correct: 0, explanation: 'this week (vaqtinchalik) -> am staying.', explanationRu: "this week (временно) -> am staying." },
              { text: 'She usually ___ in London, but this month she ___ in Paris.', options: ['lives / is living', 'is living / lives'], correct: 0, explanation: 'usually lives / this month is living.', explanationRu: "usually lives / this month is living." },
            ],
          },
          {
            teach: {
              rule: 'Ikkala zamonni bitta gapda ishlatish.',
              ruleRu: 'Использование обоих времен в одном предложении.',
              formula: 'Habit (Present Simple) + but + Current Action (Present Continuous)',
              example: 'He doesn\'t usually wear glasses, but he is wearing them today.',
              exampleRu: 'He doesn\'t usually wear glasses, but he is wearing them today.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['He works every day, but today he is resting.', 'He is working every day, but today he rests.'], correct: 0, explanation: 'works every day / today is resting.', explanationRu: "works every day / today is resting." },
              { text: 'Choose the correct sentence:', options: ['I don\'t usually drink milk, but I\'m drinking it now.', 'I\'m not usually drinking milk, but I drink it now.'], correct: 0, explanation: 'don\'t usually drink / drinking it now.', explanationRu: "don't usually drink / drinking it now." },
            ],
          },
          {
            teach: {
              rule: 'Taqqoslash qoidalarini birlashtiramiz.',
              ruleRu: 'Итоговое сравнение Present Simple и Present Continuous.',
              formula: 'Routine (V1 / V-s)  vs  Right Now (am/is/are + V-ing)',
              example: 'I learn English every day, and I am studying grammar now.',
              exampleRu: 'I learn English every day, and I am studying grammar now.',
            },
            exercises: [
              { text: '— What are you doing? — I ___ an essay.', options: ['am writing', 'write'], correct: 0, explanation: 'Savol "doing?" -> am writing.', explanationRu: "Вопрос \"doing?\" -> am writing." },
              { text: '— What do you do? — I ___ a teacher.', options: ['am', 'am being'], correct: 0, explanation: 'Kasb/Har doim -> am a teacher.', explanationRu: "Профессия/всегда -> am a teacher." },
              { text: 'Select the correct sentence:', options: ['Listen! Somebody is playing the piano.', 'Listen! Somebody plays the piano.'], correct: 0, explanation: 'Listen! -> is playing.', explanationRu: "Listen! -> is playing." },
            ],
          },
        ],
      },
      {
        id: 'sec-present-continuous-l6',
        order: 6,
        title: 'Stative Verbs (Harakat bildirmaydigan fe\'llar)',
        titleRu: 'Глаголы состояния (Stative Verbs)',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: 'MUHIM! Ba\'zi fe\'llar (Stative Verbs) harakat emas, holat bildiradi va Present Continuous (-ing) da ishlatilmaydi! Ularni doim Present Simple da ishlatamiz.',
              ruleRu: 'ВАЖНО! Глаголы состояния (like, know, want) НЕ используются в Present Continuous! Используйте Present Simple.',
              formula: 'Stative Verbs (know, want, like) ➔ Present Simple ONLY! (NO -ing!)',
              example: 'I want ice cream (I am wanting... ❌). I know the answer (I am knowing... ❌).',
              exampleRu: 'I want ice cream. I know the answer.',
            },
            exercises: [
              { text: 'Qaysi fe\'l Present Continuous da ishlatilmaydi?', textRu: "Какой глагол не используется в Present Continuous?", options: ['know (bilmoq)', 'run (yugurmoq)', 'read (o\'qimoq)'], correct: 0, explanation: 'know (holat fe\'li) Continuous bo\'lmaydi.', explanationRu: "know (глагол состояния) не бывает в Continuous." },
              { text: 'I ___ the answer right now.', options: ['know', 'am knowing'], correct: 0, explanation: 'I know (am knowing xato!).', explanationRu: "I know (am knowing — ошибка!)." },
            ],
          },
          {
            teach: {
              rule: 'Eng ko\'p uchraydigan Stative Verbs: know, want, like, love, understand, remember, need, believe, prefer.',
              ruleRu: 'Основные глаголы состояния: know, want, like, love, understand, remember, need.',
              formula: 'Subject + know / want / like / understand (NO -ing)',
              example: 'Do you understand? (Are you understanding...? ❌) She likes chocolate.',
              exampleRu: 'Do you understand? She likes chocolate.',
            },
            exercises: [
              { text: 'She ___ a cup of tea now.', options: ['wants', 'is wanting'], correct: 0, explanation: 'want -> Present Simple (wants).', explanationRu: "want -> Present Simple (wants)." },
              { text: 'Do you ___ me?', options: ['understand', 'understanding'], correct: 0, explanation: 'Do you understand?', explanationRu: "Do you understand?" },
            ],
          },
          {
            teach: {
              rule: 'Hissiyot va fikrlash fe\'llari: love, hate, believe, remember, forget.',
              ruleRu: 'Глаголы чувств и мыслей: love, hate, believe, remember.',
              formula: 'Subject + love / believe / remember + Object',
              example: 'I love this song! (I am loving... ❌) I remember his name.',
              exampleRu: 'I love this song! I remember his name.',
            },
            exercises: [
              { text: 'I ___ this movie!', options: ['love', 'am loving'], correct: 0, explanation: 'I love.', explanationRu: "I love." },
              { text: 'He ___ his phone number.', options: ['remembers', 'is remembering'], correct: 0, explanation: 'He remembers.', explanationRu: "He remembers." },
            ],
          },
          {
            teach: {
              rule: 'Ba\'zi fe\'llar 2 ta ma\'noga ega: think (o\'ylamoq/fikr -> Simple) va think (xayoldan o\'tkazmoq/process -> Continuous).',
              ruleRu: 'Двойное значение: think (считать -> Simple) vs think (обдумывать -> Continuous).',
              formula: 'Opinion: I think he is smart  |  Process: I am thinking about my test',
              example: 'I think it is a good idea (fikrimcha). I am thinking about my holiday (o\'ylayapman).',
              exampleRu: 'I think it is good vs I am thinking about holiday.',
            },
            exercises: [
              { text: 'I ___ he is a great doctor.', options: ['think', 'am thinking'], correct: 0, explanation: 'Fikr bildirish -> think.', explanationRu: "Выражение мнения -> think." },
              { text: 'Be quiet! I ___ about a problem.', options: ['am thinking', 'think'], correct: 0, explanation: 'Hozirgi fikrlash jarayoni -> am thinking.', explanationRu: "Текущий процесс размышления -> am thinking." },
            ],
          },
          {
            teach: {
              rule: 'Stative Verbs qoidalarini va barcha 6 ta darsni yakunlaymiz.',
              ruleRu: 'Обобщим правила глаголов состояния и всего раздела.',
              formula: 'Action Verbs ➔ Continuous (am/is/are + V-ing) | Stative ➔ Simple (V1)',
              example: 'I am eating pizza (Action) and I love it (Stative).',
              exampleRu: 'I am eating pizza and I love it.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I need help right now.', 'I am needing help right now.'], correct: 0, explanation: 'need -> Present Simple (I need).', explanationRu: "need -> Present Simple (I need)." },
              { text: 'Choose the correct sentence:', options: ['She is reading a book and she likes it.', 'She is reading a book and she is liking it.'], correct: 0, explanation: 'likes it.', explanationRu: "likes it." },
              { text: 'Select the correct sentence:', options: ['Do you know the answer?', 'Are you knowing the answer?'], correct: 0, explanation: 'Do you know...?', explanationRu: "Do you know...?" },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Present Continuous Zamoni",
      titleRu: 'Тест раздела: Настоящее длительное время (Present Continuous)',
      exercises: [
        { text: 'I ___ reading a newspaper right now.', options: ['am', 'is', 'are'], correct: 0, explanation: 'I + am.', explanationRu: "I + am." },
        { text: 'She ___ sleeping at the moment.', options: ['is', 'are', 'am'], correct: 0, explanation: 'She + is.', explanationRu: "She + is." },
        { text: 'They ___ playing football in the yard.', options: ['are', 'is', 'am'], correct: 0, explanation: 'They + are.', explanationRu: "They + are." },
        { text: 'Look! The bus ___ .', options: ['is coming', 'comes', 'come'], correct: 0, explanation: 'Look! -> is coming.', explanationRu: "Look! -> is coming." },
        { text: 'Choose the correct -ing form of "write":', options: ['writing', 'writeing'], correct: 0, explanation: 'write -> writing.', explanationRu: "write -> writing." },
        { text: 'Choose the correct -ing form of "run":', options: ['running', 'runing'], correct: 0, explanation: 'run -> running.', explanationRu: "run -> running." },
        { text: 'Choose the correct -ing form of "lie":', options: ['lying', 'lieing'], correct: 0, explanation: 'lie -> lying.', explanationRu: "lie -> lying." },
        { text: 'He ___ working today. He is ill.', options: ["isn't", "aren't", "don't"], correct: 0, explanation: 'He + isn\'t.', explanationRu: "He + isn't." },
        { text: 'We ___ watching TV now.', options: ["aren't", "isn't", "don't"], correct: 0, explanation: 'We + aren\'t.', explanationRu: "We + aren't." },
        { text: '___ you listening to music right now?', options: ['Are', 'Is', 'Do'], correct: 0, explanation: 'Are you listening...?', explanationRu: "Are you listening...?" },
        { text: 'Is Tom playing games? — Yes, he ___ .', options: ['is', 'does', 'am'], correct: 0, explanation: 'Yes, he is.', explanationRu: "Yes, he is." },
        { text: 'What ___ she doing at the moment?', options: ['is', 'are', 'does'], correct: 0, explanation: 'What is she doing?', explanationRu: "What is she doing?" },
        { text: 'I usually ___ coffee, but today I ___ tea.', options: ['drink / am drinking', 'am drinking / drink'], correct: 0, explanation: 'usually drink / today am drinking.', explanationRu: "usually drink / today am drinking." },
        { text: 'I ___ the answer right now.', options: ['know', 'am knowing'], correct: 0, explanation: 'know -> Stative Verb (Present Simple).', explanationRu: "know -> глагол состояния (Present Simple)." },
        { text: 'Choose the correct sentence:', options: ['She is reading and she likes the book.', 'She is reading and she is liking the book.'], correct: 0, explanation: 'likes (Stative verb).', explanationRu: "likes (глагол состояния)." },
      ],
    },
  },
  {
    id: 'sec-simple-vs-continuous',
    order: 9,
    title: "Present Simple vs Present Continuous (Taqqoslash)",
    titleRu: 'Present Simple vs Present Continuous (Сравнение)',
    icon: '⚖️',
    lessons: [
      {
        id: 'sec-simple-vs-continuous-l1',
        order: 1,
        title: "Doimiy odatlar (Habits) vs Hozirgi harakat (Right Now)",
        titleRu: 'Привычки (Habits) vs Действие прямо сейчас (Right Now)',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: "Present Simple — doimiy odatlar va har kuni takrorlanadigan rejimlar uchun (I play football on Sundays). Present Continuous — ayni shu soniyada sodir bo'layotgan harakat uchun (I am playing football now).",
              ruleRu: 'Present Simple — постоянные привычки и режим. Present Continuous — действия прямо сейчас.',
              formula: 'Habit (Every day ➔ Present Simple)  vs  Current Action (Now ➔ Present Continuous)',
              example: 'I drink coffee every morning (Simple). Look! I am drinking tea now (Continuous).',
              exampleRu: 'I drink coffee every morning vs I am drinking tea now.',
            },
            exercises: [
              { text: 'Har kuni takrorlanadigan odat uchun qaysi zamon ishlatiladi?', textRu: "Какое время используется для повторяющихся повседневных действий?", options: ['Present Simple', 'Present Continuous'], correct: 0, explanation: 'Odatlar va kun tartibi -> Present Simple.', explanationRu: "Привычки и распорядок дня -> Present Simple." },
              { text: 'I usually ___ at 7 AM, but today I ___ at 8 AM.', options: ['wake up / am waking up', 'am waking up / wake up'], correct: 0, explanation: 'usually wake up (PS) / today am waking up (PC).', explanationRu: "usually wake up (PS) / today am waking up (PC)." },
            ],
          },
          {
            teach: {
              rule: 'Ega va fe\'l ko\'rinishidagi farq: Present Simple (V1 / V-s) vs Present Continuous (am/is/are + V-ing).',
              ruleRu: 'Разница в форме: Present Simple (V1 / V-s) vs Present Continuous (am/is/are + V-ing).',
              formula: 'Simple: V1 / V-s  |  Continuous: am/is/are + V-ing',
              example: 'He works in a bank (Simple). He is working on a computer now (Continuous).',
              exampleRu: 'He works in a bank vs He is working now.',
            },
            exercises: [
              { text: 'She ___ English books every week.', options: ['reads', 'is reading'], correct: 0, explanation: 'every week (odat) -> reads.', explanationRu: "every week (привычка) -> reads." },
              { text: 'She ___ an English book right now.', options: ['is reading', 'reads'], correct: 0, explanation: 'right now (hozir) -> is reading.', explanationRu: "right now (сейчас) -> is reading." },
            ],
          },
          {
            teach: {
              rule: 'Savol gaplardagi yordamchi fe\'l farqi: Do/Does (Simple) vs Am/Is/Are (Continuous).',
              ruleRu: 'Разница в вопросах: Do/Does (Simple) vs Am/Is/Are (Continuous).',
              formula: 'Simple Question: Do / Does + Subj + V1 ?  |  Continuous Question: Am / Is / Are + Subj + V-ing ?',
              example: 'Do you play tennis? (Umuman o\'ynaysizmi?) vs Are you playing tennis now? (Hozir o\'ynayapsizmi?)',
              exampleRu: 'Do you play tennis? vs Are you playing tennis now?',
            },
            exercises: [
              { text: '— ___ you speak French? — Yes, I do.', options: ['Do', 'Are'], correct: 0, explanation: 'Umumiy savol -> Do you speak...?', explanationRu: "Общий вопрос -> Do you speak...?" },
              { text: '— ___ you speaking French to Alex right now? — Yes, I am.', options: ['Are', 'Do'], correct: 0, explanation: 'right now -> Are you speaking...?', explanationRu: "right now -> Are you speaking...?" },
            ],
          },
          {
            teach: {
              rule: 'Inkor gaplardagi farq: don\'t/doesn\'t + V1 (Simple) vs am not/isn\'t/aren\'t + V-ing (Continuous).',
              ruleRu: 'Разница в отрицаниях: don\'t/doesn\'t (Simple) vs isn\'t/aren\'t (Continuous).',
              formula: 'Simple Negative: don\'t / doesn\'t + V1  |  Continuous Negative: isn\'t / aren\'t + V-ing',
              example: 'I don\'t eat meat (umuman yemayman). I\'m not eating meat today (bugun yemayapman).',
              exampleRu: 'I don\'t eat meat vs I\'m not eating meat today.',
            },
            exercises: [
              { text: 'He ___ watch TV on weekdays.', options: ["doesn't", "isn't"], correct: 0, explanation: 'on weekdays (odat) -> doesn\'t watch.', explanationRu: "on weekdays (привычка) -> doesn't watch." },
              { text: 'He ___ watching TV now. He is asleep.', options: ["isn't", "doesn't"], correct: 0, explanation: 'now (hozir) -> isn\'t watching.', explanationRu: "now (сейчас) -> isn't watching." },
            ],
          },
          {
            teach: {
              rule: 'Darak, inkor va so\'roqdagi asosiy farqlarni birlashtiramiz.',
              ruleRu: 'Обобщим основные различия между Simple и Continuous.',
              formula: 'Routine ➔ Simple (V1 / V-s) | Right Now ➔ Continuous (am/is/are + V-ing)',
              example: 'They live in Tashkent, but they are visiting Samarkand this weekend.',
              exampleRu: 'They live in Tashkent, but they are visiting Samarkand.',
            },
            exercises: [
              { text: 'Tom ___ to school by bus every day.', options: ['goes', 'is going'], correct: 0, explanation: 'every day -> goes.', explanationRu: "every day -> goes." },
              { text: 'Listen! Tom ___ the piano in the room.', options: ['is playing', 'plays'], correct: 0, explanation: 'Listen! -> is playing.', explanationRu: "Listen! -> is playing." },
              { text: 'Choose the correct sentence:', options: ['I work every day, but now I am sleeping.', 'I am working every day, but now I sleep.'], correct: 0, explanation: 'work every day / am sleeping now.', explanationRu: "work every day / am sleeping now." },
            ],
          },
        ],
      },
      {
        id: 'sec-simple-vs-continuous-l2',
        order: 2,
        title: "Doimiy holat (Permanent) vs Vaqtinchalik holat (Temporary)",
        titleRu: 'Постоянные состояния (Permanent) vs Временные (Temporary)',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: "Present Simple — doimiy holat (Permanent situation) uchun ishlatiladi (I live in Uzbekistan). Present Continuous — vaqtinchalik holat (Temporary situation) uchun (I am staying at a hotel this week).",
              ruleRu: 'Present Simple — постоянная ситуация. Present Continuous — временная ситуация.',
              formula: 'Permanent ➔ Present Simple  |  Temporary (this week/month) ➔ Present Continuous',
              example: 'My mother works as a doctor (doimiy). She is working on a new project this month (vaqtinchalik).',
              exampleRu: 'My mother works as a doctor vs She is working on a new project this month.',
            },
            exercises: [
              { text: 'Vaqtinchalik (this week, these days) holatlar uchun qaysi zamon ishlatiladi?', textRu: "Какое время используется для временных ситуаций (this week, these days)?", options: ['Present Continuous', 'Present Simple'], correct: 0, explanation: 'Vaqtinchalik vaziyatlar -> Present Continuous.', explanationRu: "Временные ситуации -> Present Continuous." },
              { text: 'Where do you live? — I ___ in Tashkent.', options: ['live', 'am living'], correct: 0, explanation: 'Doimiy yashash joyi -> live.', explanationRu: "Постоянное место жительства -> live." },
            ],
          },
          {
            teach: {
              rule: 'This week, these days, at present — vaqtinchalik davr ko\'rsatgichlari.',
              ruleRu: 'Маркеры временных ситуаций: this week, these days, at present.',
              formula: 'Subject + am/is/are + Verb-ing (this week / these days)',
              example: 'He is living with his friends this month until he finds a flat.',
              exampleRu: 'He is living with his friends this month.',
            },
            exercises: [
              { text: 'She ___ a French course this month.', options: ['is taking', 'takes'], correct: 0, explanation: 'this month (vaqtinchalik) -> is taking.', explanationRu: "this month (временно) -> is taking." },
              { text: 'My dad ___ a lot of hours this week.', options: ['is working', 'works'], correct: 0, explanation: 'this week -> is working.', explanationRu: "this week -> is working." },
            ],
          },
          {
            teach: {
              rule: 'O\'zgarib borayotgan jarayonlar (Changing / Developing situations) -> Present Continuous.',
              ruleRu: 'Развивающиеся и меняющиеся ситуации -> Present Continuous.',
              formula: 'Subject + am/is/are + getting / becoming / growing + Adjective',
              example: 'The weather is getting colder. Your English is improving.',
              exampleRu: 'The weather is getting colder. Your English is improving.',
            },
            exercises: [
              { text: 'Your English ___ better and better!', options: ['is getting', 'gets'], correct: 0, explanation: 'O\'zgarib borayotgan jarayon -> is getting.', explanationRu: "Меняющийся процесс -> is getting." },
              { text: 'The city ___ very fast.', options: ['is growing', 'grows'], correct: 0, explanation: 'Rivojlanayotgan jarayon -> is growing.', explanationRu: "Развивающийся процесс -> is growing." },
            ],
          },
          {
            teach: {
              rule: 'Doimiy va vaqtinchalik vaziyatlarni bitta gapda taqqoslash.',
              ruleRu: 'Сравнение постоянных и временных ситуаций в одном предложении.',
              formula: 'Permanent Habit (Present Simple) + but + Temporary Action (Present Continuous)',
              example: 'He usually drives a car, but this week he is riding a bike.',
              exampleRu: 'He usually drives a car, but this week he is riding a bike.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I live in Tashkent, but I am staying in Samarkand this week.', 'I am living in Tashkent, but I stay in Samarkand this week.'], correct: 0, explanation: 'live in Tashkent (permanent) / staying this week (temporary).', explanationRu: "live in Tashkent (постоянно) / staying this week (временно)." },
              { text: 'Choose the correct sentence:', options: ['She usually eats at home, but today she is eating at a restaurant.', 'She is usually eating at home, but today she eats at a restaurant.'], correct: 0, explanation: 'usually eats / today is eating.', explanationRu: "usually eats / today is eating." },
            ],
          },
          {
            teach: {
              rule: 'Doimiy va vaqtinchalik vaziyatlar qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим правила постоянных и временных ситуаций.',
              formula: 'Permanent ➔ Simple | Temporary ➔ Continuous',
              example: 'I work at a school, but today I am resting at home.',
              exampleRu: 'I work at a school, but today I am resting at home.',
            },
            exercises: [
              { text: 'The climate ___ warmer every year.', options: ['is becoming', 'becomes'], correct: 0, explanation: 'O\'zgarayotgan jarayon -> is becoming.', explanationRu: "Меняющийся процесс -> is becoming." },
              { text: 'They ___ in London permanently.', options: ['live', 'are living'], correct: 0, explanation: 'Permanently -> live.', explanationRu: "Постоянно -> live." },
              { text: 'Select the correct sentence:', options: ['He is taking driving lessons this month.', 'He takes driving lessons this month.'], correct: 0, explanation: 'this month -> is taking.', explanationRu: "this month -> is taking." },
            ],
          },
        ],
      },
      {
        id: 'sec-simple-vs-continuous-l3',
        order: 3,
        title: "Kalit so'zlar qarama-qarshiligi (Time Markers)",
        titleRu: 'Сравнение маркеров времени (Time Markers)',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: 'Present Simple va Present Continuous kalit so\'zlarini hech qachon aralashtirmang!',
              ruleRu: 'Не путайте указатели времени двух времен!',
              formula: 'Simple: always, usually, often, every day | Continuous: now, right now, Look!, Listen!',
              example: 'I always do homework (Simple). Look! She is doing homework (Continuous).',
              exampleRu: 'I always do homework vs Look! She is doing homework.',
            },
            exercises: [
              { text: '"Look!" kalit so\'zidan so\'ng qaysi zamon keladi?', textRu: "Какое время используется после ключевого слова \"Look!\"?", options: ['Present Continuous', 'Present Simple'], correct: 0, explanation: 'Look! -> Present Continuous.', explanationRu: "Look! -> Present Continuous." },
              { text: '"usually" kalit so\'zi qaysi zamonga xos?', textRu: "Для какого времени характерно ключевое слово \"usually\"?", options: ['Present Simple', 'Present Continuous'], correct: 0, explanation: 'usually -> Present Simple.', explanationRu: "usually -> Present Simple." },
            ],
          },
          {
            teach: {
              rule: 'Present Simple kalit so\'zlari: always (doim), usually (odatda), often (tez-tez), sometimes (ba\'zan), never (hech qachon), every day/week/year, on Mondays.',
              ruleRu: 'Маркеры Present Simple: always, usually, often, sometimes, never, every day.',
              formula: 'Subject + frequency adverb (always/usually) + Verb (V1 / V-s)',
              example: 'He often plays chess on Sundays. We never eat fast food.',
              exampleRu: 'He often plays chess on Sundays. We never eat fast food.',
            },
            exercises: [
              { text: 'She ___ comes late. (hech qachon)', options: ['never', 'now'], correct: 0, explanation: 'never comes.', explanationRu: "never comes." },
              { text: 'We go to the park ___ .', options: ['every weekend', 'right now'], correct: 0, explanation: 'go (Simple) -> every weekend.', explanationRu: "go (Simple) -> every weekend." },
            ],
          },
          {
            teach: {
              rule: 'Present Continuous kalit so\'zlari: now (hozir), right now, at present, at the moment (ayni damda), today, this morning, Look!, Listen!.',
              ruleRu: 'Маркеры Present Continuous: now, right now, at the moment, today, Look!, Listen!.',
              formula: 'Look! / Listen! / Now ➔ am/is/are + Verb-ing',
              example: 'Listen! The phone is ringing. I am working at the moment.',
              exampleRu: 'Listen! The phone is ringing. I am working at the moment.',
            },
            exercises: [
              { text: 'Listen! Someone ___ at the door.', options: ['is knocking', 'knocks'], correct: 0, explanation: 'Listen! -> is knocking.', explanationRu: "Listen! -> is knocking." },
              { text: 'What are you reading ___ ?', options: ['right now', 'every day'], correct: 0, explanation: 'are you reading -> right now.', explanationRu: "are you reading -> right now." },
            ],
          },
          {
            teach: {
              rule: 'Kalit so\'zlarga qarab zamonni to\'g\'ri tanlash amaliyoti.',
              ruleRu: 'Практика выбора времени по маркерам.',
              formula: 'Check time signal ➔ Select Simple or Continuous',
              example: 'I study English every day. I am studying right now.',
              exampleRu: 'I study English every day. I am studying right now.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['He always drinks tea in the morning.', 'He is always drinking tea in the morning.'], correct: 0, explanation: 'always in the morning -> drinks.', explanationRu: "always in the morning -> drinks." },
              { text: 'Choose the correct sentence:', options: ['Look! The cat is jumping on the sofa.', 'Look! The cat jumps on the sofa.'], correct: 0, explanation: 'Look! -> is jumping.', explanationRu: "Look! -> is jumping." },
            ],
          },
          {
            teach: {
              rule: 'Kalit so\'zlar qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим правила применения маркеров времени.',
              formula: 'every day ➔ Simple | right now ➔ Continuous',
              example: 'They usually play football, but today they are playing basketball.',
              exampleRu: 'They usually play football, but today they are playing basketball.',
            },
            exercises: [
              { text: 'Anna ___ her grandma every Sunday.', options: ['visits', 'is visiting'], correct: 0, explanation: 'every Sunday -> visits.', explanationRu: "every Sunday -> visits." },
              { text: 'Anna ___ her grandma at the moment.', options: ['is visiting', 'visits'], correct: 0, explanation: 'at the moment -> is visiting.', explanationRu: "at the moment -> is visiting." },
              { text: 'Select the correct sentence:', options: ['Listen! The teacher is speaking.', 'Listen! The teacher speaks.'], correct: 0, explanation: 'Listen! -> is speaking.', explanationRu: "Listen! -> is speaking." },
            ],
          },
        ],
      },
      {
        id: 'sec-simple-vs-continuous-l4',
        order: 4,
        title: "Stative Verbs istisnolari (Hissiyot va Fikr fe'llari)",
        titleRu: 'Исключения: Глаголы состояния (Stative Verbs)',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: 'QAYTA TAKRORLAYMIZ! Harakat bildirmaydigan fe\'llar (Stative Verbs) sharoit "now / right now" bo\'lsa ham, HECH QACHON Present Continuous (-ing) da ishlatilmaydi! Har doim Present Simple ishlatiladi.',
              ruleRu: 'Глаголы состояния (know, like, want, understand) НЕ используются в Continuous даже со словом "now"!',
              formula: 'Stative Verbs (know, want, like, understand) ➔ Present Simple ONLY! (NO -ing!)',
              example: 'I understand you now (I am understanding... ❌). She wants tea now (She is wanting... ❌).',
              exampleRu: 'I understand you now. She wants tea now.',
            },
            exercises: [
              { text: 'I ___ what you mean right now.', options: ['understand', 'am understanding'], correct: 0, explanation: 'understand -> Stative Verb (Simple).', explanationRu: "understand -> глагол состояния (Simple)." },
              { text: 'She ___ a cup of coffee right now.', options: ['wants', 'is wanting'], correct: 0, explanation: 'want -> Stative Verb (Simple).', explanationRu: "want -> глагол состояния (Simple)." },
            ],
          },
          {
            teach: {
              rule: 'Eng muhim Stative Verbs ro\'yxati: know (bilmoq), want (xohlamoq), like (yoqtirmoq), love (sewmoq), hate (yomon ko\'rmoq), understand (tushunmoq), remember (eslamoq), forget (unutmoq), need (muhtoj bo\'lmoq), prefer (afzal ko\'rmoq), believe (ishonmoq).',
              ruleRu: 'Список глаголов состояния: know, want, like, love, understand, remember, need, believe.',
              formula: 'Subject + Stative Verb (Simple) + Object',
              example: 'Do you believe him? (Are you believing... ❌). I remember your name.',
              exampleRu: 'Do you believe him? I remember your name.',
            },
            exercises: [
              { text: 'Do you ___ him?', options: ['believe', 'believing'], correct: 0, explanation: 'Do you believe?', explanationRu: "Do you believe?" },
              { text: 'He ___ help right now.', options: ['needs', 'is needing'], correct: 0, explanation: 'need -> Present Simple (needs).', explanationRu: "need -> Present Simple (needs)." },
            ],
          },
          {
            teach: {
              rule: 'Sezgi a\'zolari fe\'llari: hear (eshitmoq), see (ko\'rmoq), smell (hid bilmoq), taste (maza bilmoq) -> Present Simple da ishlatiladi.',
              ruleRu: 'Глаголы чувств: hear, see, smell, taste -> Present Simple.',
              formula: 'Subject + hear / see / smell / taste',
              example: 'I hear a strange noise (I am hearing... ❌). This soup tastes delicious.',
              exampleRu: 'I hear a strange noise. This soup tastes delicious.',
            },
            exercises: [
              { text: 'I ___ a noise outside right now.', options: ['hear', 'am hearing'], correct: 0, explanation: 'hear -> Present Simple.', explanationRu: "hear -> Present Simple." },
              { text: 'This coffee ___ great.', options: ['tastes', 'is tasting'], correct: 0, explanation: 'taste -> Present Simple.', explanationRu: "taste -> Present Simple." },
            ],
          },
          {
            teach: {
              rule: 'Harakat va Holat fe\'llarini ajratish mashqi.',
              ruleRu: 'Различение глаголов действия и состояния.',
              formula: 'Action (run, eat, read ➔ Continuous ok) | Stative (know, want, like ➔ Simple only)',
              example: 'I am eating pizza (Action - Continuous ok). I like pizza (Stative - Simple only).',
              exampleRu: 'I am eating pizza vs I like pizza.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I know the answer right now.', 'I am knowing the answer right now.'], correct: 0, explanation: 'know -> Present Simple.', explanationRu: "know -> Present Simple." },
              { text: 'Choose the correct sentence:', options: ['She is drinking water because she likes it.', 'She is drinking water because she is liking it.'], correct: 0, explanation: 'likes it (Stative).', explanationRu: "likes it (глагол состояния)." },
            ],
          },
          {
            teach: {
              rule: 'Stative Verbs istisnolarini birlashtiramiz.',
              ruleRu: 'Обобщим исключения глаголов состояния.',
              formula: 'NO -ing for: know, want, like, love, understand, need, remember!',
              example: 'I am studying now (Action) and I understand everything (Stative).',
              exampleRu: 'I am studying now and I understand everything.',
            },
            exercises: [
              { text: 'I ___ you are right.', options: ['think', 'am thinking'], correct: 0, explanation: 'Fikr -> think.', explanationRu: "Мнение -> think." },
              { text: 'She ___ two sisters.', options: ['has', 'is having'], correct: 0, explanation: 'Egalik -> has.', explanationRu: "Принадлежность -> has." },
              { text: 'Select the correct sentence:', options: ['Do you remember my phone number?', 'Are you remembering my phone number?'], correct: 0, explanation: 'remember -> Simple.', explanationRu: "remember -> Simple." },
            ],
          },
        ],
      },
      {
        id: 'sec-simple-vs-continuous-l5',
        order: 5,
        title: "Ikki ma'noli fe'llar (Dynamic vs Stative Meanings)",
        titleRu: 'Глаголы с двойным значением (think, have, see)',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: 'DIQQAT! Ba\'zi fe\'llar 2 xil ma\'noga ega: Holat bildirganda Present Simple, Harakat/Jarayon bildirganda Present Continuous bo\'ladi!',
              ruleRu: 'Некоторые глаголы имеют 2 значения: состояние (Simple) и процесс (Continuous).',
              formula: 'State (Opinion / Possession ➔ Simple)  vs  Action (Process / Event ➔ Continuous)',
              example: 'I think he is nice (Fikrimcha - Simple) vs I am thinking about the exam (O\'ylayapman - Continuous).',
              exampleRu: 'I think he is nice vs I am thinking about the exam.',
            },
            exercises: [
              { text: 'I ___ he is right. (fikrimcha)', options: ['think', 'am thinking'], correct: 0, explanation: 'Fikr bildirish -> think.', explanationRu: "Выражение мнения -> think." },
              { text: 'Quiet! I ___ about a difficult question.', options: ['am thinking', 'think'], correct: 0, explanation: 'Jarayon/O\'ylash -> am thinking.', explanationRu: "Процесс размышления -> am thinking." },
            ],
          },
          {
            teach: {
              rule: '"have" fe\'li: Egalik ma\'nosida -> Simple (I have a car). Harakat/Iste\'mol ma\'nosida -> Continuous (I am having breakfast).',
              ruleRu: 'Глагол "have": владение (Simple) vs процесс (Continuous: have breakfast/shower).',
              formula: 'Possession: I have a car (Simple)  |  Action: I am having breakfast (Continuous)',
              example: 'She has a big house (Simple). She is having a shower now (Continuous).',
              exampleRu: 'She has a big house vs She is having a shower now.',
            },
            exercises: [
              { text: 'Tom ___ a nice bicycle.', options: ['has', 'is having'], correct: 0, explanation: 'Egalik -> has.', explanationRu: "Принадлежность -> has." },
              { text: 'Look! They ___ lunch in the kitchen.', options: ['are having', 'have'], correct: 0, explanation: 'Tushlik qilish (harakat) -> are having.', explanationRu: "Обед (действие) -> are having." },
            ],
          },
          {
            teach: {
              rule: '"see" fe\'li: Ko\'rmoq/Tushunmoq -> Simple (I see a bird). Uchrashmoq -> Continuous (I am seeing a doctor tomorrow).',
              ruleRu: 'Глагол "see": видеть (Simple) vs встречаться (Continuous).',
              formula: 'Vision: I see a bird (Simple)  |  Meeting: I am seeing my doctor today (Continuous)',
              example: 'I see what you mean (tushunyapman). I am seeing my boss at 3 PM (uchrashyapman).',
              exampleRu: 'I see what you mean vs I am seeing my boss today.',
            },
            exercises: [
              { text: 'I ___ a bird in the tree right now.', options: ['see', 'am seeing'], correct: 0, explanation: 'Ko\'rish sezgisi -> see.', explanationRu: "Зрительное восприятие -> see." },
              { text: 'She ___ her dentist tomorrow afternoon.', options: ['is seeing', 'sees'], correct: 0, explanation: 'Uchrashuv rejasi -> is seeing.', explanationRu: "Планируемая встреча -> is seeing." },
            ],
          },
          {
            teach: {
              rule: '"taste" va "smell": Xususiyat bildirganda -> Simple. Hidlash/Tatib ko\'rish harakati -> Continuous.',
              ruleRu: 'taste / smell: свойство (Simple) vs процесс пробы/нюхания (Continuous).',
              formula: 'Property: The soup tastes good (Simple)  |  Action: The chef is tasting the soup (Continuous)',
              example: 'This flower smells nice (Simple). She is smelling the rose (Continuous).',
              exampleRu: 'This flower smells nice vs She is smelling the rose.',
            },
            exercises: [
              { text: 'This cake ___ delicious!', options: ['tastes', 'is tasting'], correct: 0, explanation: 'Maza xususiyati -> tastes.', explanationRu: "Вкусовое свойство -> tastes." },
              { text: 'Look! The cook ___ the sauce.', options: ['is tasting', 'tastes'], correct: 0, explanation: 'Tatib ko\'rish harakati -> is tasting.', explanationRu: "Процесс пробования на вкус -> is tasting." },
            ],
          },
          {
            teach: {
              rule: 'Ikki ma\'noli fe\'llar qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим правила глаголов с двойным значением.',
              formula: 'State / Opinion ➔ Simple | Process / Action ➔ Continuous',
              example: 'I have a car and I am having a great time.',
              exampleRu: 'I have a car and I am having a great time.',
            },
            exercises: [
              { text: 'I ___ a great time at the party right now!', options: ['am having', 'have'], correct: 0, explanation: 'Vaqt o\'tkazish harakati -> am having.', explanationRu: "Процесс времяпрепровождения -> am having." },
              { text: 'Do you ___ a pen?', options: ['have', 'having'], correct: 0, explanation: 'Egalik -> have.', explanationRu: "Принадлежность -> have." },
              { text: 'Select the correct sentence:', options: ['I think she is friendly.', 'I am thinking she is friendly.'], correct: 0, explanation: 'Fikr -> think.', explanationRu: "Мнение -> think." },
            ],
          },
        ],
      },
      {
        id: 'sec-simple-vs-continuous-l6',
        order: 6,
        title: "Aralash gaplar va Xatolarni tuzatish (Error Correction)",
        titleRu: 'Исправление ошибок и смешанная практика (Error Correction)',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: 'Eng ko\'p uchraydigan 3 ta katta xato: 1) Stative verb ga -ing qo\'shish ❌ 2) Present Continuous da am/is/are ni tushirib qoldirish ❌ 3) Hozirgi harakatga Present Simple ishlatish ❌.',
              ruleRu: '3 главные ошибки: 1) -ing к глаголу состояния 2) пропуск am/is/are 3) Simple вместо Continuous для "сейчас".',
              formula: 'Check 3 Errors: 1. I know (not I am knowing) 2. She is working (not She working) 3. He is playing now (not He plays now)',
              example: 'I am knowing ❌ ➔ I know ✅; She working ❌ ➔ She is working ✅; He plays now ❌ ➔ He is playing now ✅.',
              exampleRu: 'I know. She is working. He is playing now.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I know the answer.', 'I am knowing the answer.'], correct: 0, explanation: 'know -> Present Simple.', explanationRu: "know -> Present Simple." },
              { text: 'Choose the correct sentence:', options: ['Look! He is running fast.', 'Look! He running fast.'], correct: 0, explanation: 'is running (is yordamchi fe\'li shart!).', explanationRu: "is running (вспомогательный is обязателен!)." },
            ],
          },
          {
            teach: {
              rule: 'Real muloqot va dialoglarda Present Simple hamda Present Continuous ni to\'g\'ri qo\'llash.',
              ruleRu: 'Практика диалогов в Present Simple и Continuous.',
              formula: 'Dialogue Context: Routine ➔ Simple | Current Moment ➔ Continuous',
              example: '— What are you doing? — I am reading. — Do you read every day? — Yes, I do.',
              exampleRu: '— What are you doing? — I am reading. — Do you read every day? — Yes, I do.',
            },
            exercises: [
              { text: '— What ___ you doing? — I ___ my homework.', options: ['are / am doing', 'do / do'], correct: 0, explanation: 'Hozirgi mashg\'ulot -> are you doing / am doing.', explanationRu: "Текущее занятие -> are you doing / am doing." },
              { text: '— Where ___ your brother work? — He ___ in a bank.', options: ['does / works', 'is / working'], correct: 0, explanation: 'Doimiy ish joyi -> does / works.', explanationRu: "Постоянное место работы -> does / works." },
            ],
          },
          {
            teach: {
              rule: 'Lug\'at va zamonlar uyg\'unligini sinash mashqi.',
              ruleRu: 'Практика гармонии времен и лексики.',
              formula: 'Check context markers: usually ➔ Simple | right now ➔ Continuous',
              example: 'She usually plays tennis, but today she is playing golf.',
              exampleRu: 'She usually plays tennis, but today she is playing golf.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I don\'t understand this rule.', 'I am not understanding this rule.'], correct: 0, explanation: 'understand -> Present Simple.', explanationRu: "understand -> Present Simple." },
              { text: 'Choose the correct sentence:', options: ['Listen! The birds are singing.', 'Listen! The birds sing.'], correct: 0, explanation: 'Listen! -> are singing.', explanationRu: "Listen! -> are singing." },
            ],
          },
          {
            teach: {
              rule: 'Murakkab matn va hikoyalarda 2 zamonni ajratish.',
              ruleRu: 'Различение двух времен в сложных контекстах.',
              formula: 'Identify Habit vs Current Progress',
              example: 'Mark is an engineer. He designs bridges. Currently, he is building a new tower.',
              exampleRu: 'Mark is an engineer. He designs bridges. Currently, he is building a new tower.',
            },
            exercises: [
              { text: 'Mark is a pilot. He ___ planes, but today he ___ at home.', options: ['flies / is resting', 'is flying / rests'], correct: 0, explanation: 'flies (kasb) / today is resting (hozir).', explanationRu: "flies (профессия) / today is resting (сейчас)." },
              { text: 'Sarah ___ Spanish. She ___ a book right now.', options: ['speaks / is reading', 'is speaking / reads'], correct: 0, explanation: 'speaks (til bilish) / right now is reading.', explanationRu: "speaks (знание языка) / right now is reading." },
            ],
          },
          {
            teach: {
              rule: 'Barcha 9 ta bo\'lim va 2 zamon taqqoslashining yakuniy xulosasi.',
              ruleRu: 'Итоговое обобщение всех правил сравнения времен.',
              formula: 'Master Formula: Habit/State ➔ Simple (V1) | Now/Process ➔ Continuous (be+Ving)',
              example: 'I live in Tashkent, I know English, and right now I am mastering grammar!',
              exampleRu: 'I live in Tashkent, I know English, and right now I am mastering grammar!',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['She is a teacher and she is teaching now.', 'She is a teacher and she teaches now.'], correct: 0, explanation: 'teaches (kasb) / is teaching now.', explanationRu: "teaches (профессия) / is teaching now." },
              { text: 'Choose the correct sentence:', options: ['I understand the lesson now.', 'I am understanding the lesson now.'], correct: 0, explanation: 'understand.', explanationRu: "understand." },
              { text: 'Select the correct sentence:', options: ['They are playing football in the garden at the moment.', 'They play football in the garden at the moment.'], correct: 0, explanation: 'at the moment -> are playing.', explanationRu: "at the moment -> are playing." },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Present Simple vs Present Continuous",
      titleRu: 'Тест раздела: Present Simple vs Present Continuous',
      exercises: [
        { text: 'I usually ___ coffee in the morning.', options: ['drink', 'am drinking'], correct: 0, explanation: 'usually -> drink.', explanationRu: "usually -> drink." },
        { text: 'Look! She ___ a red dress today.', options: ['is wearing', 'wears'], correct: 0, explanation: 'Look! -> is wearing.', explanationRu: "Look! -> is wearing." },
        { text: 'Where ___ you live?', options: ['do', 'are'], correct: 0, explanation: 'Doimiy yashash joyi -> do you live?', explanationRu: "Постоянное место жительства -> do you live?" },
        { text: 'What ___ you doing right now?', options: ['are', 'do'], correct: 0, explanation: 'right now -> are you doing?', explanationRu: "right now -> are you doing?" },
        { text: 'I ___ with my uncle this week.', options: ['am staying', 'stay'], correct: 0, explanation: 'this week (vaqtinchalik) -> am staying.', explanationRu: "this week (временно) -> am staying." },
        { text: 'The weather ___ warmer these days.', options: ['is getting', 'gets'], correct: 0, explanation: 'O\'zgarayotgan jarayon -> is getting.', explanationRu: "Меняющийся процесс -> is getting." },
        { text: 'He ___ drinks alcohol. (hech qachon)', options: ['never', 'now'], correct: 0, explanation: 'never drinks.', explanationRu: "never drinks." },
        { text: 'Listen! Somebody ___ at the door.', options: ['is knocking', 'knocks'], correct: 0, explanation: 'Listen! -> is knocking.', explanationRu: "Listen! -> is knocking." },
        { text: 'I ___ the answer right now.', options: ['know', 'am knowing'], correct: 0, explanation: 'know -> Stative Verb (Present Simple).', explanationRu: "know -> глагол состояния (Present Simple)." },
        { text: 'She ___ a new laptop today.', options: ['needs', 'is needing'], correct: 0, explanation: 'need -> Present Simple (needs).', explanationRu: "need -> Present Simple (needs)." },
        { text: 'I ___ he is a smart guy.', options: ['think', 'am thinking'], correct: 0, explanation: 'Fikr -> think.', explanationRu: "Мнение -> think." },
        { text: 'Look! They ___ lunch in the cafe.', options: ['are having', 'have'], correct: 0, explanation: 'Lanch qilish harakati -> are having.', explanationRu: "Действие обеда -> are having." },
        { text: 'Choose the correct sentence:', options: ['I don\'t understand this question.', 'I am not understanding this question.'], correct: 0, explanation: 'understand.', explanationRu: "understand." },
        { text: 'Choose the correct sentence:', options: ['He works every day, but today he is resting.', 'He is working every day, but today he rests.'], correct: 0, explanation: 'works every day / today is resting.', explanationRu: "works every day / today is resting." },
        { text: 'Select the correct sentence:', options: ['Listen! The telephone is ringing.', 'Listen! The telephone rings.'], correct: 0, explanation: 'Listen! -> is ringing.', explanationRu: "Listen! -> is ringing." },
      ],
    },
  },
  {
    id: 'sec-prepositions',
    order: 10,
    title: 'Joy va vaqt predloglari (in / on / at)',
    titleRu: 'Предлоги места и времени (in / on / at)',
    icon: '📍',
    lessons: [
      {
        id: 'sec-prepositions-l1',
        order: 1,
        title: 'Vaqt predlogi: "at" (Soat, aniq vaqt va bayramlar)',
        titleRu: 'Предлог времени: "at" (Время, часы, праздники)',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: 'Vaqtni ko\'rsatganda "at" predlogi aniq soat vaqtlari bilan ishlatiladi.',
              ruleRu: 'Предлог "at" используется с точным временем на часах.',
              formula: 'at + specific time / clock time (e.g. at 5 o\'clock)',
              example: 'I wake up at 7 o\'clock every morning. (Men har kuni soat 7 da uyg\'onaman.)',
              exampleRu: 'I wake up at 7 o\'clock every morning. (Я просыпаюсь в 7 часов каждое утро.)',
            },
            exercises: [
              { text: 'The lesson starts ___ 9:00 AM.', options: ['at', 'in', 'on'], correct: 0, explanation: 'Aniq soat vaqti bilan "at" ishlatiladi.', explanationRu: "С точным временем на часах используется \"at\"." },
              { text: 'I usually eat lunch ___ 1 o\'clock.', options: ['at', 'on', 'in'], correct: 0, explanation: 'Soat ko\'rsatilganda -> at 1 o\'clock.', explanationRu: "Когда указан час -> at 1 o'clock." },
            ],
          },
          {
            teach: {
              rule: '"at" predlogi kunning muayyan qismlari va iboralar bilan ishlatiladi: at night (tunda), at noon (peshinda), at midnight (yarim tunda), at the moment (ayni damda).',
              ruleRu: 'Предлог "at" используется в выражениях: at night, at noon, at midnight, at the moment.',
              formula: 'at + night / noon / midnight / the moment',
              example: 'Stars shine at night. (Yulduzlar tunda porlaydi.)',
              exampleRu: 'Stars shine at night. (Звёзды светят ночью.)',
            },
            exercises: [
              { text: 'I like to read books ___ night.', options: ['at', 'in', 'on'], correct: 0, explanation: 'at night (tunda).', explanationRu: "at night (ночью)." },
              { text: 'He is busy ___ the moment.', options: ['at', 'in', 'on'], correct: 0, explanation: 'at the moment (ayni damda).', explanationRu: "at the moment (в данный момент)." },
            ],
          },
          {
            teach: {
              rule: '"at" predlogi bayram kunlari va dam olish kunlari davrida ishlatiladi: at the weekend (dam olish kunlarida), at Christmas (Mavlut bayramida).',
              ruleRu: 'Предлог "at" используется с праздниками и выходными: at the weekend, at Christmas.',
              formula: 'at + the weekend / holiday period',
              example: 'We visit our grandparents at the weekend.',
              exampleRu: 'We visit our grandparents at the weekend.',
            },
            exercises: [
              { text: 'What do you usually do ___ the weekend?', options: ['at', 'in', 'to'], correct: 0, explanation: 'at the weekend.', explanationRu: "at the weekend." },
              { text: 'We give presents ___ Christmas.', options: ['at', 'in', 'on'], correct: 0, explanation: 'Bayram davri -> at Christmas.', explanationRu: "Период праздника -> at Christmas." },
            ],
          },
          {
            teach: {
              rule: 'Soat vaqtlari, tunda va dam olish kunlaridagi "at" qoidasini mustahkamlaymiz.',
              ruleRu: 'Закрепим использование "at" с часами, ночью и выходными.',
              formula: 'at + clock time / night / weekend',
              example: 'The train arrives at 6:30 PM. I sleep at night.',
              exampleRu: 'The train arrives at 6:30 PM. I sleep at night.',
            },
            exercises: [
              { text: 'The movie finishes ___ 10 PM.', options: ['at', 'on', 'in'], correct: 0, explanation: 'Soat vaqti -> at 10 PM.', explanationRu: "Время на часах -> at 10 PM." },
              { text: 'Select the correct sentence:', options: ['He goes to bed at midnight.', 'He goes to bed in midnight.'], correct: 0, explanation: 'at midnight (yarim tunda).', explanationRu: "at midnight (в полночь)." },
            ],
          },
          {
            teach: {
              rule: '"at" vaqt predlogining barcha qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим все правила использования "at" для времени.',
              formula: 'at ➔ clock time (at 5:00) | night/noon | at the weekend',
              example: 'We meet at 3 o\'clock at the weekend.',
              exampleRu: 'We meet at 3 o\'clock at the weekend.',
            },
            exercises: [
              { text: 'Choose the correct preposition: ___ 8:00 AM', options: ['at', 'in', 'on'], correct: 0, explanation: 'at 8:00 AM.', explanationRu: "at 8:00 AM." },
              { text: 'Choose the correct preposition: ___ night', options: ['at', 'on', 'in'], correct: 0, explanation: 'at night.', explanationRu: "at night." },
              { text: 'Select the correct sentence:', options: ['See you at 4 o\'clock!', 'See you in 4 o\'clock!'], correct: 0, explanation: 'at 4 o\'clock.', explanationRu: "at 4 o'clock." },
            ],
          },
        ],
      },
      {
        id: 'sec-prepositions-l2',
        order: 2,
        title: 'Vaqt predlogi: "on" (Kunlar, sanalar va haftaning kunlari)',
        titleRu: 'Предлог времени: "on" (Дни, даты, дни недели)',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: 'Haftaning kunlari bilan doim "on" predlogi ishlatiladi: on Monday, on Tuesday, on Friday.',
              ruleRu: 'С днями недели всегда используется предлог "on": on Monday, on Tuesday.',
              formula: 'on + day of the week (e.g. on Monday, on Sunday)',
              example: 'I play football on Sunday. (Men yakshanba kuni futbol o\'ynayman.)',
              exampleRu: 'I play football on Sunday. (Я играю в футбол в воскресенье.)',
            },
            exercises: [
              { text: 'We have an English test ___ Monday.', options: ['on', 'at', 'in'], correct: 0, explanation: 'Hafta kuni bilan "on" keladi.', explanationRu: "С днём недели используется \"on\"." },
              { text: 'They don\'t work ___ Saturdays.', options: ['on', 'in', 'at'], correct: 0, explanation: 'on Saturdays.', explanationRu: "on Saturdays." },
            ],
          },
          {
            teach: {
              rule: 'Aniq sanalar (kalendar kunlari) bilan "on" predlogi ishlatiladi: on 1st January, on 15th May.',
              ruleRu: 'С конкретными датами используется предлог "on": on 1st January.',
              formula: 'on + specific date (e.g. on 25th December)',
              example: 'My birthday is on 12th August. (Mening tug\'ilgan kunim 12-avgustda.)',
              exampleRu: 'My birthday is on 12th August. (Мой день рождения 12 августа.)',
            },
            exercises: [
              { text: 'The party is ___ 25th October.', options: ['on', 'in', 'at'], correct: 0, explanation: 'Aniq sana bilan "on" keladi.', explanationRu: "С точной датой используется \"on\"." },
              { text: 'Uzbekistan Independence Day is ___ 1st September.', options: ['on', 'at', 'in'], correct: 0, explanation: 'on 1st September.', explanationRu: "on 1st September." },
            ],
          },
          {
            teach: {
              rule: 'Maxsus kunlar va kun qismlari bilan "on" predlogi ishlatiladi: on my birthday, on Friday morning, on New Year\'s Day.',
              ruleRu: 'С особыми днями и частями дней: on my birthday, on Friday morning.',
              formula: 'on + special day / specific day + morning/evening',
              example: 'We got presents on New Year\'s Day. We met on Friday morning.',
              exampleRu: 'We got presents on New Year\'s Day. We met on Friday morning.',
            },
            exercises: [
              { text: 'What do you do ___ your birthday?', options: ['on', 'at', 'in'], correct: 0, explanation: 'on your birthday.', explanationRu: "on your birthday." },
              { text: 'I have a meeting ___ Tuesday morning.', options: ['on', 'in', 'at'], correct: 0, explanation: 'on Tuesday morning.', explanationRu: "on Tuesday morning." },
            ],
          },
          {
            teach: {
              rule: '"at" (soat/tunda) va "on" (kunlar/sanalar) farqini taqqoslaymiz.',
              ruleRu: 'Сравним "at" (часы/ночь) и "on" (дни/даты).',
              formula: 'Clock time ➔ at (at 5 PM)  |  Days & Dates ➔ on (on Monday / on 5th May)',
              example: 'The match is at 3 PM on Saturday. (O\'yin shanba kuni soat 3 da.)',
              exampleRu: 'The match is at 3 PM on Saturday.',
            },
            exercises: [
              { text: 'The meeting starts ___ 9 o\'clock ___ Friday.', options: ['at / on', 'on / at', 'in / on'], correct: 0, explanation: 'at 9 o\'clock / on Friday.', explanationRu: "at 9 o'clock / on Friday." },
              { text: 'Choose the correct sentence:', options: ['I will call you on Monday.', 'I will call you at Monday.'], correct: 0, explanation: 'on Monday.', explanationRu: "on Monday." },
            ],
          },
          {
            teach: {
              rule: '"on" vaqt predlogining barcha qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим все правила использования "on" для времени.',
              formula: 'on ➔ Days of week | Specific dates | Special days (on my birthday)',
              example: 'He was born on 10th March on a Tuesday.',
              exampleRu: 'He was born on 10th March on a Tuesday.',
            },
            exercises: [
              { text: 'Choose the correct preposition: ___ 5th July', options: ['on', 'in', 'at'], correct: 0, explanation: 'on 5th July.', explanationRu: "on 5th July." },
              { text: 'Choose the correct preposition: ___ Sunday afternoon', options: ['on', 'at', 'in'], correct: 0, explanation: 'on Sunday afternoon.', explanationRu: "on Sunday afternoon." },
              { text: 'Select the correct sentence:', options: ['School reopens on September 1st.', 'School reopens in September 1st.'], correct: 0, explanation: 'on September 1st.', explanationRu: "on September 1st." },
            ],
          },
        ],
      },
      {
        id: 'sec-prepositions-l3',
        order: 3,
        title: 'Vaqt predlogi: "in" (Oylar, yillar, fasllar va uzoq davrlar)',
        titleRu: 'Предлог времени: "in" (Месяцы, года, времена года, века)',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: 'Oylar va fasllar bilan doim "in" predlogi ishlatiladi: in May, in July, in summer, in winter.',
              ruleRu: 'С месяца и временами года используется "in": in May, in summer.',
              formula: 'in + month / season (e.g. in May, in summer)',
              example: 'It is very hot in summer. My birthday is in April.',
              exampleRu: 'It is very hot in summer. My birthday is in April.',
            },
            exercises: [
              { text: 'We go to the beach ___ summer.', options: ['in', 'on', 'at'], correct: 0, explanation: 'Fasl bilan "in" keladi: in summer.', explanationRu: "С временем года используется \"in\": in summer." },
              { text: 'Flowers bloom ___ spring.', options: ['in', 'on', 'at'], correct: 0, explanation: 'in spring.', explanationRu: "in spring." },
            ],
          },
          {
            teach: {
              rule: 'Yillar, asrlar va uzoq davrlar bilan "in" predlogi ishlatiladi: in 2026, in the 21st century, in the past.',
              ruleRu: 'С годами, веками и эпохами используется "in": in 2026, in the 21st century.',
              formula: 'in + year / century / long period (e.g. in 2026, in the past)',
              example: 'He was born in 2010. Computers developed fast in the 20th century.',
              exampleRu: 'He was born in 2010. Computers developed fast in the 20th century.',
            },
            exercises: [
              { text: 'I started school ___ 2018.', options: ['in', 'on', 'at'], correct: 0, explanation: 'Yil bilan "in" ishlatiladi.', explanationRu: "С годом используется \"in\"." },
              { text: 'People lived differently ___ the past.', options: ['in', 'on', 'at'], correct: 0, explanation: 'in the past (o\'tmishda).', explanationRu: "in the past (в прошлом)." },
            ],
          },
          {
            teach: {
              rule: 'Kunning uchta asosiy qismi bilan "in the" ishlatiladi: in the morning, in the afternoon, in the evening. (ESLAB QOLING: at night!)',
              ruleRu: 'С частями дня: in the morning, in the afternoon, in the evening. (НО: at night!)',
              formula: 'in + the morning / afternoon / evening  (BUT: at night!)',
              example: 'I drink coffee in the morning. (LEKIN: I sleep at night.)',
              exampleRu: 'I drink coffee in the morning. (НО: I sleep at night.)',
            },
            exercises: [
              { text: 'I play video games ___ the evening.', options: ['in', 'at', 'on'], correct: 0, explanation: 'in the evening.', explanationRu: "in the evening." },
              { text: 'She goes running ___ the morning.', options: ['in', 'on', 'at'], correct: 0, explanation: 'in the morning.', explanationRu: "in the morning." },
              { text: 'Choose the correct pair: ___ the morning / ___ night', options: ['in / at', 'at / in', 'on / at'], correct: 0, explanation: 'in the morning / at night.', explanationRu: "in the morning / at night." },
            ],
          },
          {
            teach: {
              rule: '"in" predlogi kelajakdagi muddatni bildiradi: in 5 minutes (5 daqiqadan so\'ng), in two days (ikki kundan so\'ng).',
              ruleRu: 'Предлог "in" обозначает период времени в будущем: in 5 minutes (через 5 минут).',
              formula: 'in + amount of time (e.g. in 10 minutes = 10 daqiqadan so\'ng)',
              example: 'The bus leaves in 5 minutes. (Avtobus 5 daqiqadan so\'ng jo\'naydi.)',
              exampleRu: 'The bus leaves in 5 minutes. (Автобус уезжает через 5 минут.)',
            },
            exercises: [
              { text: 'I will finish my work ___ 10 minutes.', options: ['in', 'on', 'at'], correct: 0, explanation: 'in 10 minutes (10 daqiqadan so\'ng).', explanationRu: "in 10 minutes (через 10 минут)." },
              { text: 'The movie will start ___ a few moments.', options: ['in', 'at', 'on'], correct: 0, explanation: 'in a few moments.', explanationRu: "in a few moments." },
            ],
          },
          {
            teach: {
              rule: 'Vaqt predloglari piramidasi: at (aniq nuqta/soat) ➔ on (kunlar/sanalar) ➔ in (oylar/yillar/davrlar).',
              ruleRu: 'Пирамида времени: at (часы) ➔ on (дни/даты) ➔ in (месяцы/года/века).',
              formula: 'Specific Time (at) ➔ Days & Dates (on) ➔ Months, Years & Seasons (in)',
              example: 'at 5 PM on Monday in May 2026.',
              exampleRu: 'at 5 PM on Monday in May 2026.',
            },
            exercises: [
              { text: 'He was born ___ July, ___ Monday ___ 6:00 AM.', options: ['in / on / at', 'at / on / in', 'on / in / at'], correct: 0, explanation: 'in July / on Monday / at 6:00 AM.', explanationRu: "in July / on Monday / at 6:00 AM." },
              { text: 'Choose the correct sentence:', options: ['We go on vacation in August.', 'We go on vacation at August.'], correct: 0, explanation: 'in August (oy nomi).', explanationRu: "in August (название месяца)." },
            ],
          },
        ],
      },
      {
        id: 'sec-prepositions-l4',
        order: 4,
        title: 'Joy predlogi: "at" (Aniq nuqta, bino va manzil)',
        titleRu: 'Предлог места: "at" (Точка, здание, адрес)',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: 'Joylashuv nuqtasi (exact point) uchun "at" ishlatiladi: at the bus stop, at the door, at the crossroad.',
              ruleRu: 'Для точной точки местоположения используется "at": at the bus stop, at the door.',
              formula: 'at + exact point / location (e.g. at the door, at the bus stop)',
              example: 'Someone is standing at the door. I am waiting at the bus stop.',
              exampleRu: 'Someone is standing at the door. I am waiting at the bus stop.',
            },
            exercises: [
              { text: 'Turn left ___ the traffic lights.', options: ['at', 'in', 'on'], correct: 0, explanation: 'Nuqta ko\'rsatilganda "at" ishlatiladi.', explanationRu: "При указании точки используется \"at\"." },
              { text: 'She is waiting for you ___ the bus stop.', options: ['at', 'in', 'on'], correct: 0, explanation: 'at the bus stop.', explanationRu: "at the bus stop." },
            ],
          },
          {
            teach: {
              rule: 'Muassasalar va tadbirlar bilan "at" ishlatiladi: at home, at work, at school, at university, at a party, at a concert.',
              ruleRu: 'С учреждениями и мероприятиями: at home, at work, at school, at a party.',
              formula: 'at + home / work / school / university / party / concert',
              example: 'My mother is at work. I stay at home on Sundays.',
              exampleRu: 'My mother is at work. I stay at home on Sundays.',
            },
            exercises: [
              { text: 'Is your father ___ home?', options: ['at', 'in', 'on'], correct: 0, explanation: 'at home (uyda).', explanationRu: "at home (дома)." },
              { text: 'We met ___ a concert last night.', options: ['at', 'in', 'on'], correct: 0, explanation: 'at a concert.', explanationRu: "at a concert." },
            ],
          },
          {
            teach: {
              rule: 'Aniq ko\'cha manzillari (uy raqami ko\'rsatilgan) bilan "at" ishlatiladi: at 45 Navoi Street.',
              ruleRu: 'С точным адресом (с номером дома) используется "at": at 45 Navoi Street.',
              formula: 'at + house number + street name (e.g. at 10 Baker Street)',
              example: 'He lives at 12 Pushkin Street. (U Pushkin ko\'chasi 12-uyda yashaydi.)',
              exampleRu: 'He lives at 12 Pushkin Street. (Он живёт на улице Пушкина, дом 12.)',
            },
            exercises: [
              { text: 'She lives ___ 45 Amir Temur Street.', options: ['at', 'on', 'in'], correct: 0, explanation: 'Uy raqami borligi uchun "at" ishlatiladi.', explanationRu: "При наличии номера дома используется \"at\"." },
              { text: 'The office is ___ 100 Broadway.', options: ['at', 'in', 'on'], correct: 0, explanation: 'at 100 Broadway.', explanationRu: "at 100 Broadway." },
            ],
          },
          {
            teach: {
              rule: '"at" bilan keladigan boshqa mashhur iboralar: at the top of (tepasida), at the bottom of (tagida), at the end of (oxirida).',
              ruleRu: 'Популярные выражения с "at": at the top of, at the bottom of, at the end of.',
              formula: 'at the top / bottom / end + of something',
              example: 'Write your name at the top of the page. The shop is at the end of the street.',
              exampleRu: 'Write your name at the top of the page.',
            },
            exercises: [
              { text: 'Write your name ___ the top of the page.', options: ['at', 'in', 'on'], correct: 0, explanation: 'at the top of.', explanationRu: "at the top of." },
              { text: 'There is a café ___ the end of the street.', options: ['at', 'on', 'in'], correct: 0, explanation: 'at the end of.', explanationRu: "at the end of." },
            ],
          },
          {
            teach: {
              rule: '"at" joy predlogining barcha qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим все правила использования "at" для места.',
              formula: 'at ➔ exact point (at the door) | at home/work/school | at 12 Main St',
              example: 'I am at school at 8:00 AM every day.',
              exampleRu: 'I am at school at 8:00 AM every day.',
            },
            exercises: [
              { text: 'Choose the correct preposition: ___ home', options: ['at', 'in', 'on'], correct: 0, explanation: 'at home.', explanationRu: "at home." },
              { text: 'Choose the correct preposition: ___ the entrance', options: ['at', 'in', 'on'], correct: 0, explanation: 'at the entrance.', explanationRu: "at the entrance." },
              { text: 'Select the correct sentence:', options: ['She is at work right now.', 'She is in work right now.'], correct: 0, explanation: 'at work.', explanationRu: "at work." },
            ],
          },
        ],
      },
      {
        id: 'sec-prepositions-l5',
        order: 5,
        title: 'Joy predlogi: "on" (Yuza, sirt, ko\'cha va qavatlar)',
        titleRu: 'Предлог места: "on" (Поверхность, улица, этажи)',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: 'Tekislik va sirtlar ustida bo\'lsa "on" ishlatiladi: on the table, on the wall, on the floor, on the ceiling.',
              ruleRu: 'Для поверхностей используется предлог "on": on the table, on the wall.',
              formula: 'on + surface / flat area (e.g. on the table, on the floor)',
              example: 'The book is on the table. There is a picture on the wall.',
              exampleRu: 'The book is on the table. There is a picture on the wall.',
            },
            exercises: [
              { text: 'Don\'t leave your clothes ___ the floor!', options: ['on', 'in', 'at'], correct: 0, explanation: 'Sirt (poll) bilan "on" ishlatiladi.', explanationRu: "С поверхностью (пол) используется \"on\"." },
              { text: 'There is a beautiful painting ___ the wall.', options: ['on', 'at', 'in'], correct: 0, explanation: 'on the wall.', explanationRu: "on the wall." },
            ],
          },
          {
            teach: {
              rule: 'Ko\'cha va shoh ko\'cha nomlari bilan (uy raqamisiz!) "on" ishlatiladi: on Navoi Street, on Fifth Avenue.',
              ruleRu: 'С названиями улиц (без номера дома) используется "on": on Navoi Street.',
              formula: 'on + street name (without house number, e.g. on Broadway)',
              example: 'Our shop is on Amir Temur Street. (Bizning do\'konimiz Amir Temur ko\'chasida.)',
              exampleRu: 'Our shop is on Amir Temur Street.',
            },
            exercises: [
              { text: 'He lives ___ Broadway.', options: ['on', 'at', 'in'], correct: 0, explanation: 'Faqat ko\'cha nomi bilan "on" ishlatiladi.', explanationRu: "Только с названием улицы используется \"on\"." },
              { text: 'Choose the correct pair: ___ 15 Navoi Street / ___ Navoi Street', options: ['at / on', 'on / at', 'in / on'], correct: 0, explanation: 'at 15 Navoi Street (raqam bor) / on Navoi Street (raqamsiz).', explanationRu: "at 15 Navoi Street (с номером) / on Navoi Street (без номера)." },
            ],
          },
          {
            teach: {
              rule: 'Bino qavatlari va yo\'nalishlar bilan "on" ishlatiladi: on the first floor, on the second floor, on the left, on the right.',
              ruleRu: 'С этажами и сторонами: on the first floor, on the left, on the right.',
              formula: 'on + floor number / side (e.g. on the 3rd floor, on the left)',
              example: 'My apartment is on the second floor. Turn on the left.',
              exampleRu: 'My apartment is on the second floor.',
            },
            exercises: [
              { text: 'Our office is ___ the 4th floor.', options: ['on', 'in', 'at'], correct: 0, explanation: 'Qavat bilan "on" ishlatiladi.', explanationRu: "С этажом используется \"on\"." },
              { text: 'The supermarket is ___ the right.', options: ['on', 'at', 'in'], correct: 0, explanation: 'on the right (o\'ng tomonda).', explanationRu: "on the right (справа)." },
            ],
          },
          {
            teach: {
              rule: 'Jamoat transport vositalarida "on" ishlatiladi: on the bus, on the train, on a plane, on a ship. (LEKIN kichik mashinada: in a car, in a taxi!)',
              ruleRu: 'В общественном транспорте: on the bus, on the train. (НО: in a car, in a taxi!)',
              formula: 'on + public transport (bus/train/plane)  |  BUT: in + car / taxi',
              example: 'I am on the bus right now. (LEKIN: I am in a taxi.)',
              exampleRu: 'I am on the bus right now. (НО: I am in a taxi.)',
            },
            exercises: [
              { text: 'I saw him ___ the train.', options: ['on', 'in', 'at'], correct: 0, explanation: 'Poezdda -> on the train.', explanationRu: "В поезде -> on the train." },
              { text: 'He is traveling ___ a car.', options: ['in', 'on', 'at'], correct: 0, explanation: 'Kichik shaxsiy mashinada -> in a car.', explanationRu: "В личной машине -> in a car." },
              { text: 'Choose the correct pair: ___ the bus / ___ a taxi', options: ['on / in', 'in / on', 'at / in'], correct: 0, explanation: 'on the bus / in a taxi.', explanationRu: "on the bus / in a taxi." },
            ],
          },
          {
            teach: {
              rule: '"on" joy predlogining barcha qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим все правила использования "on" для места.',
              formula: 'on ➔ Surface (table/wall) | Street name | Floor (on 1st floor) | Public transport (bus/train)',
              example: 'I am sitting on the bus on Navoi Street.',
              exampleRu: 'I am sitting on the bus on Navoi Street.',
            },
            exercises: [
              { text: 'Choose the correct preposition: ___ the table', options: ['on', 'in', 'at'], correct: 0, explanation: 'on the table.', explanationRu: "on the table." },
              { text: 'Choose the correct preposition: ___ the second floor', options: ['on', 'in', 'at'], correct: 0, explanation: 'on the second floor.', explanationRu: "on the second floor." },
              { text: 'Select the correct sentence:', options: ['The cup is on the table.', 'The cup is in the table.'], correct: 0, explanation: 'on the table.', explanationRu: "on the table." },
            ],
          },
        ],
      },
      {
        id: 'sec-prepositions-l6',
        order: 6,
        title: 'Joy predlogi: "in" (Yopiq hudud, shahar va mamlakatlar)',
        titleRu: 'Предлог места: "in" (Закрытое пространство, город, страна)',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: 'Yopiq xona, bo\'shliq va idishlar ichida bo\'lsa "in" ishlatiladi: in the room, in the kitchen, in a box, in the garden.',
              ruleRu: 'Внутри закрытых пространств используется "in": in the room, in a box.',
              formula: 'in + enclosed space / room / container / building (e.g. in the kitchen)',
              example: 'She is in the kitchen. The keys are in the box.',
              exampleRu: 'She is in the kitchen. The keys are in the box.',
            },
            exercises: [
              { text: 'Where is Mum? — She is ___ the living room.', options: ['in', 'on', 'at'], correct: 0, explanation: 'Xona ichida -> in the living room.', explanationRu: "Внутри комнаты -> in the living room." },
              { text: 'Put these shoes ___ the box.', options: ['in', 'on', 'at'], correct: 0, explanation: 'in the box.', explanationRu: "in the box." },
            ],
          },
          {
            teach: {
              rule: 'Shaharlar, mamlakatlar, viloyatlar va qit\'alar bilan "in" ishlatiladi: in Tashkent, in Uzbekistan, in London, in Asia.',
              ruleRu: 'С городами, странами и континентами используется "in": in Tashkent, in Uzbekistan.',
              formula: 'in + city / country / region / continent (e.g. in Tashkent, in London)',
              example: 'I live in Tashkent. Tashkent is in Uzbekistan.',
              exampleRu: 'I live in Tashkent. Tashkent is in Uzbekistan.',
            },
            exercises: [
              { text: 'He was born ___ Samarkand.', options: ['in', 'on', 'at'], correct: 0, explanation: 'Shahar nomi bilan "in" keladi.', explanationRu: "С названием города используется \"in\"." },
              { text: 'Paris is ___ France.', options: ['in', 'at', 'on'], correct: 0, explanation: 'Mamlakat bilan "in" keladi.', explanationRu: "С названием страны используется \"in\"." },
            ],
          },
          {
            teach: {
              rule: 'Kitob, rasm, oyna va gazetalar ichida deb aytganda "in" ishlatiladi: in a book, in a picture, in a photo, in the newspaper, in the mirror.',
              ruleRu: 'В книгах, картинах, фото и газетах: in a book, in a picture, in the newspaper.',
              formula: 'in + book / photo / picture / newspaper / mirror',
              example: 'I saw your photo in the newspaper. Look at yourself in the mirror.',
              exampleRu: 'I saw your photo in the newspaper.',
            },
            exercises: [
              { text: 'Who is the man ___ this picture?', options: ['in', 'on', 'at'], correct: 0, explanation: 'Rasm ichida -> in this picture.', explanationRu: "На картинке -> in this picture." },
              { text: 'I read about the news ___ a book.', options: ['in', 'on', 'at'], correct: 0, explanation: 'in a book.', explanationRu: "in a book." },
            ],
          },
          {
            teach: {
              rule: 'Joy predloglari piramidasi: at (nuqta/at home) ➔ on (sirt/ko\'cha/on the table) ➔ in (yopiq joy/shahar/in Tashkent).',
              ruleRu: 'Пирамида места: at (точка) ➔ on (поверхность/улица) ➔ in (закрытое место/город).',
              formula: 'Point (at) ➔ Surface / Line (on) ➔ Enclosed Area / City (in)',
              example: 'at the bus stop on Navoi Street in Tashkent.',
              exampleRu: 'at the bus stop on Navoi Street in Tashkent.',
            },
            exercises: [
              { text: 'We live ___ Tashkent, ___ Pushkin Street.', options: ['in / on', 'at / in', 'on / at'], correct: 0, explanation: 'in Tashkent / on Pushkin Street.', explanationRu: "in Tashkent / on Pushkin Street." },
              { text: 'Choose the correct sentence:', options: ['I am sitting in a coffee shop in London.', 'I am sitting on a coffee shop at London.'], correct: 0, explanation: 'in a coffee shop in London.', explanationRu: "in a coffee shop in London." },
            ],
          },
          {
            teach: {
              rule: '"in" joy predlogining barcha qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим все правила использования "in" для места.',
              formula: 'in ➔ Room / Box | City / Country | Book / Photo | Car / Taxi',
              example: 'He is sitting in his room in Tashkent.',
              exampleRu: 'He is sitting his room in Tashkent.',
            },
            exercises: [
              { text: 'Choose the correct preposition: ___ Uzbekistan', options: ['in', 'on', 'at'], correct: 0, explanation: 'in Uzbekistan.', explanationRu: "in Uzbekistan." },
              { text: 'Choose the correct preposition: ___ the kitchen', options: ['in', 'at', 'on'], correct: 0, explanation: 'in the kitchen.', explanationRu: "in the kitchen." },
              { text: 'Select the correct sentence:', options: ['She is sitting in her car.', 'She is sitting on her car.'], correct: 0, explanation: 'in her car.', explanationRu: "in her car." },
            ],
          },
        ],
      },
      {
        id: 'sec-prepositions-l7',
        order: 7,
        title: 'Aralash amaliyot va Xatolarni tuzatish (at vs on vs in)',
        titleRu: 'Смешанная практика и Исправление ошибок (at vs on vs in)',
        icon: '7️⃣',
        units: [
          {
            teach: {
              rule: 'Eng ko\'p uchraydigan 3 ta xato: 1) in Monday ❌ ➔ on Monday ✅ 2) at morning ❌ ➔ in the morning ✅ 3) in home ❌ ➔ at home ✅.',
              ruleRu: '3 частые ошибки: 1) in Monday ❌ ➔ on Monday ✅ 2) at morning ❌ ➔ in the morning ✅ 3) in home ❌ ➔ at home ✅.',
              formula: 'Check Preposition Errors: 1. on Monday 2. in the morning 3. at home',
              example: 'I stay at home on Monday in the morning. (Manbada barcha 3 ta predlog to\'g\'ri ishlatilgan.)',
              exampleRu: 'I stay at home on Monday in the morning.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I will see you on Monday.', 'I will see you in Monday.'], correct: 0, explanation: 'Hafta kuni bilan "on" ishlatiladi.', explanationRu: "С днём недели используется \"on\"." },
              { text: 'Choose the correct sentence:', options: ['My brother is at home.', 'My brother is in home.'], correct: 0, explanation: 'at home.', explanationRu: "at home." },
            ],
          },
          {
            teach: {
              rule: 'Vaqt predloglari aralash testi: at (soat/tunda) | on (kun/sana) | in (oy/yil/fasl).',
              ruleRu: 'Смешанный тест предлогов времени: at | on | in.',
              formula: 'at 5 PM | on Friday | in July | in 2026',
              example: 'Our party is at 7 PM on Friday in December.',
              exampleRu: 'Our party is at 7 PM on Friday in December.',
            },
            exercises: [
              { text: 'The museum opens ___ 9 o\'clock ___ Tuesday ___ spring.', options: ['at / on / in', 'in / on / at', 'on / at / in'], correct: 0, explanation: 'at 9 o\'clock / on Tuesday / in spring.', explanationRu: "at 9 o'clock / on Tuesday / in spring." },
              { text: 'We go skiing ___ winter.', options: ['in', 'on', 'at'], correct: 0, explanation: 'Fasl -> in winter.', explanationRu: "Время года -> in winter." },
            ],
          },
          {
            teach: {
              rule: 'Joy predloglari aralash testi: at (nuqta/uyda) | on (sirt/ko\'cha/qavat) | in (yopiq joy/shahar).',
              ruleRu: 'Смешанный тест предлогов места: at | on | in.',
              formula: 'at the station | on the table | in Tashkent',
              example: 'I left my bag on the table in my room at home.',
              exampleRu: 'I left my bag on the table in my room at home.',
            },
            exercises: [
              { text: 'He is waiting ___ the entrance ___ the second floor.', options: ['at / on', 'in / at', 'on / in'], correct: 0, explanation: 'at the entrance / on the second floor.', explanationRu: "at the entrance / on the second floor." },
              { text: 'My friend lives ___ London.', options: ['in', 'on', 'at'], correct: 0, explanation: 'Shahar -> in London.', explanationRu: "Город -> in London." },
            ],
          },
          {
            teach: {
              rule: 'Dialog va matnlarda predloglarni to\'g\'ri uyg\'unlashtirish.',
              ruleRu: 'Практика применения предлогов в диалогах и контексте.',
              formula: 'Read context ➔ apply at / on / in correctly',
              example: '— Where are you? — I am on the bus in Tashkent, arriving at 5 PM.',
              exampleRu: '— Where are you? — I am on the bus in Tashkent, arriving at 5 PM.',
            },
            exercises: [
              { text: '— Where is your office? — It is ___ 3rd floor ___ Amir Temur Street.', options: ['on the / on', 'in the / at', 'at the / in'], correct: 0, explanation: 'on the 3rd floor / on Amir Temur Street.', explanationRu: "on the 3rd floor / on Amir Temur Street." },
              { text: '— When is the concert? — It is ___ 8:00 PM ___ Saturday.', options: ['at / on', 'in / at', 'on / in'], correct: 0, explanation: 'at 8:00 PM / on Saturday.', explanationRu: "at 8:00 PM / on Saturday." },
            ],
          },
          {
            teach: {
              rule: 'Bo\'limning barcha predloglar (in / on / at) qoidalarining yakuniy sarhisobi.',
              ruleRu: 'Итоговое обобщение всех правил предлогов места и времени.',
              formula: 'Master Preposition Rule: at (exact time / point) | on (day / date / surface) | in (month / year / enclosed area)',
              example: 'I was born at 3 PM on 10th May in 2005 in Tashkent.',
              exampleRu: 'I was born at 3 PM on 10th May in 2005 in Tashkent.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I will meet you at the station at 6 PM on Friday.', 'I will meet you in the station in 6 PM in Friday.'], correct: 0, explanation: 'at the station / at 6 PM / on Friday.', explanationRu: "at the station / at 6 PM / on Friday." },
              { text: 'Choose the correct sentence:', options: ['She put her phone on the desk in her bedroom.', 'She put her phone at the desk at her bedroom.'], correct: 0, explanation: 'on the desk / in her bedroom.', explanationRu: "on the desk / in her bedroom." },
              { text: 'Select the correct sentence:', options: ['The train leaves at 10:30 in the morning.', 'The train leaves on 10:30 at the morning.'], correct: 0, explanation: 'at 10:30 / in the morning.', explanationRu: "at 10:30 / in the morning." },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Joy va vaqt predloglari (in / on / at)",
      titleRu: 'Тест раздела: Предлоги места и времени (in / on / at)',
      exercises: [
        { text: 'The concert starts ___ 7:30 PM.', options: ['at', 'on', 'in'], correct: 0, explanation: 'Aniq soat vaqti -> at.', explanationRu: "Точное время на часах -> at." },
        { text: 'We don\'t go to school ___ Sundays.', options: ['on', 'in', 'at'], correct: 0, explanation: 'Hafta kuni -> on.', explanationRu: "День недели -> on." },
        { text: 'My birthday is ___ July.', options: ['in', 'on', 'at'], correct: 0, explanation: 'Oy nomi -> in.', explanationRu: "Название месяца -> in." },
        { text: 'He was born ___ 2012.', options: ['in', 'on', 'at'], correct: 0, explanation: 'Yil -> in.', explanationRu: "Год -> in." },
        { text: 'I love watching movies ___ night.', options: ['at', 'in', 'on'], correct: 0, explanation: 'at night.', explanationRu: "at night." },
        { text: 'She is waiting for you ___ the bus stop.', options: ['at', 'in', 'on'], correct: 0, explanation: 'at the bus stop.', explanationRu: "at the bus stop." },
        { text: 'The laptop is ___ the table.', options: ['on', 'in', 'at'], correct: 0, explanation: 'Sirt -> on the table.', explanationRu: "Поверхность -> on the table." },
        { text: 'We live ___ Tashkent.', options: ['in', 'on', 'at'], correct: 0, explanation: 'Shahar -> in Tashkent.', explanationRu: "Город -> in Tashkent." },
        { text: 'Our apartment is ___ the third floor.', options: ['on', 'in', 'at'], correct: 0, explanation: 'Qavat -> on the third floor.', explanationRu: "Этаж -> on the third floor." },
        { text: 'She is traveling ___ the train.', options: ['on', 'in', 'at'], correct: 0, explanation: 'Jamoat transporti -> on the train.', explanationRu: "Общественный транспорт -> on the train." },
        { text: 'Choose the correct sentence:', options: ['He is at home right now.', 'He is in home right now.'], correct: 0, explanation: 'at home.', explanationRu: "at home." },
        { text: 'Choose the correct sentence:', options: ['The meeting is on Friday morning.', 'The meeting is at Friday morning.'], correct: 0, explanation: 'on Friday morning.', explanationRu: "on Friday morning." },
        { text: 'Choose the correct sentence:', options: ['Write your name at the top of the paper.', 'Write your name in the top of the paper.'], correct: 0, explanation: 'at the top of.', explanationRu: "at the top of." },
        { text: 'Select the correct sentence:', options: ['The bus leaves in 10 minutes.', 'The bus leaves at 10 minutes.'], correct: 0, explanation: 'in 10 minutes (10 daqiqadan so\'ng).', explanationRu: "in 10 minutes (через 10 минут)." },
        { text: 'Select the correct sentence:', options: ['They live at 25 Navoi Street in Tashkent.', 'They live in 25 Navoi Street on Tashkent.'], correct: 0, explanation: 'at 25 Navoi Street / in Tashkent.', explanationRu: "at 25 Navoi Street / in Tashkent." },
      ],
    },
  },
  {
    id: 'sec-tobe-past',
    order: 11,
    title: '"To be" — o\'tgan zamon (was / were)',
    titleRu: 'Глагол "to be" в прошедшем времени (was / were)',
    icon: '⏳',
    lessons: [
      {
        id: 'sec-tobe-past-l1',
        order: 1,
        title: 'Tasdiq shakllar: "was" (I / he / she / it)',
        titleRu: 'Утвердительные формы: "was" (I / he / she / it)',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: '"to be" fe\'lining o\'tgan zamon shakllaridan biri "was" hisoblanadi. U birlikdagi shaxslar (I, he, she, it) bilan ishlatiladi.',
              ruleRu: 'В прошедшем времени "am" и "is" превращаются в "was" для местоимений I, he, she, it.',
              formula: 'I / He / She / It + was + Noun / Adjective / Place',
              example: 'I was a student. (Men talaba edim.) He was happy. (U xursand edi.)',
              exampleRu: 'I was a student. (Я был студентом.) He was happy. (Он был счастлив.)',
            },
            exercises: [
              { text: 'I ___ at home yesterday.', options: ['was', 'were', 'am'], correct: 0, explanation: '"I" bilan o\'tgan zamonda "was" ishlatiladi.', explanationRu: "С \"I\" в прошедшем времени используется \"was\"." },
              { text: 'He ___ tired last night.', options: ['was', 'were', 'is'], correct: 0, explanation: '"He" + was.', explanationRu: "\"He\" + was." },
            ],
          },
          {
            teach: {
              rule: '"I was" — "men edim" degan ma\'noni bildiradi. Hozirgi "I am" ning o\'tgan zamoni.',
              ruleRu: '"I was" означает "я был/была". Прошедшая форма от "I am".',
              formula: 'Present: I am  ➔  Past: I was',
              example: 'I am in Tashkent now. I was in Samarkand yesterday.',
              exampleRu: 'I am in Tashkent now. I was in Samarkand yesterday.',
            },
            exercises: [
              { text: 'Yesterday I ___ very busy.', options: ['was', 'were', 'am'], correct: 0, explanation: 'Yesterday (kecha) -> I was.', explanationRu: "Yesterday (вчера) -> I was." },
              { text: 'Select the correct sentence:', options: ['I was at school yesterday.', 'I were at school yesterday.'], correct: 0, explanation: '"I" bilan "was" keladi.', explanationRu: "С \"I\" используется \"was\"." },
            ],
          },
          {
            teach: {
              rule: '"He was", "She was", "It was" — "u edi" degan ma\'noni bildiradi (is ➔ was).',
              ruleRu: '"He was", "She was", "It was" — прошедшие формы от is.',
              formula: 'He / She / It + was + Adjective / Place / Time',
              example: 'She was ill last week. It was cold yesterday.',
              exampleRu: 'She was ill last week. It was cold yesterday.',
            },
            exercises: [
              { text: 'She ___ a teacher 5 years ago.', options: ['was', 'were', 'is'], correct: 0, explanation: '"She" + was.', explanationRu: "\"She\" + was." },
              { text: 'The weather ___ nice yesterday.', options: ['was', 'were', 'are'], correct: 0, explanation: 'The weather (it) -> was.', explanationRu: "The weather (it) -> was." },
            ],
          },
          {
            teach: {
              rule: 'O\'tgan zamon kalit so\'zlari: yesterday (kecha), last night/week/year (o\'tgan tun/hafta/yil), two days ago (ikki kun avval).',
              ruleRu: 'Маркеры прошедшего времени: yesterday, last night, 2 days ago.',
              formula: 'Subject + was + Place/State + yesterday / last week / ago',
              example: 'Tom was in London last month. My dog was sleeping 2 hours ago.',
              exampleRu: 'Tom was in London last month.',
            },
            exercises: [
              { text: 'My father ___ at work yesterday morning.', options: ['was', 'were', 'is'], correct: 0, explanation: 'My father (he) + yesterday -> was.', explanationRu: "My father (he) + yesterday -> was." },
              { text: 'It ___ hot last summer.', options: ['was', 'were', 'are'], correct: 0, explanation: 'last summer -> was.', explanationRu: "last summer -> was." },
            ],
          },
          {
            teach: {
              rule: '"was" shaklining barcha birlik egalari bilan qo\'llanishini birlashtiramiz.',
              ruleRu: 'Обобщим использование "was" с I, he, she, it.',
              formula: 'I / He / She / It ➔ was (Past of am/is)',
              example: 'I was late, but she was on time yesterday.',
              exampleRu: 'I was late, but she was on time yesterday.',
            },
            exercises: [
              { text: 'Choose the correct form: My phone ___ on the table.', options: ['was', 'were'], correct: 0, explanation: 'My phone (it) -> was.', explanationRu: "My phone (it) -> was." },
              { text: 'Choose the correct form: She ___ at the concert last night.', options: ['was', 'were'], correct: 0, explanation: 'She -> was.', explanationRu: "She -> was." },
              { text: 'Select the correct sentence:', options: ['He was my best friend.', 'He were my best friend.'], correct: 0, explanation: 'He + was.', explanationRu: "He + was." },
            ],
          },
        ],
      },
      {
        id: 'sec-tobe-past-l2',
        order: 2,
        title: 'Tasdiq shakllar: "were" (you / we / they)',
        titleRu: 'Утвердительные формы: "were" (you / we / they)',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: '"to be" fe\'lining o\'tgan zamondagi ikkinchi shakli "were" hisoblanadi. U ko\'plik egalari (we, they) va "you" bilan ishlatiladi.',
              ruleRu: 'В прошедшем времени "are" превращается в "were" для местоимений you, we, they.',
              formula: 'You / We / They + were + Noun / Adjective / Place',
              example: 'We were happy. (Biz xursand edik.) They were at home. (Ular uyda edi.)',
              exampleRu: 'We were happy. (Мы были счастливы.) They were at home. (Они были дома.)',
            },
            exercises: [
              { text: 'We ___ in Samarkand last weekend.', options: ['were', 'was', 'are'], correct: 0, explanation: '"We" bilan o\'tgan zamonda "were" ishlatiladi.', explanationRu: "С \"We\" в прошедшем времени используется \"were\"." },
              { text: 'They ___ very tired after work.', options: ['were', 'was', 'is'], correct: 0, explanation: '"They" + were.', explanationRu: "\"They\" + were." },
            ],
          },
          {
            teach: {
              rule: '"You were" — "sen eding / siz edingiz" degan ma\'noni bildiradi (are ➔ were).',
              ruleRu: '"You were" означает "ты был / вы были". Прошедшая форма от "You are".',
              formula: 'Present: You are  ➔  Past: You were',
              example: 'You were late for school yesterday.',
              exampleRu: 'You were late for school yesterday.',
            },
            exercises: [
              { text: 'You ___ right about the movie.', options: ['were', 'was', 'am'], correct: 0, explanation: '"You" bilan doim "were" ishlatiladi.', explanationRu: "С \"You\" всегда используется \"were\"." },
              { text: 'Select the correct sentence:', options: ['You were very helpful yesterday.', 'You was very helpful yesterday.'], correct: 0, explanation: 'You + were.', explanationRu: "You + were." },
            ],
          },
          {
            teach: {
              rule: '"We were" (biz edik) va "They were" (ular edi).',
              ruleRu: '"We were" (мы были) и "They were" (они были).',
              formula: 'We / They + were + Adjective / Location',
              example: 'We were classmates in 2020. They were in the park yesterday.',
              exampleRu: 'We were classmates in 2020. They were in the park yesterday.',
            },
            exercises: [
              { text: 'My friends ___ at my house yesterday.', options: ['were', 'was', 'is'], correct: 0, explanation: 'My friends (they) -> were.', explanationRu: "My friends (they) -> were." },
              { text: 'We ___ in the garden 2 hours ago.', options: ['were', 'was', 'am'], correct: 0, explanation: 'We + were.', explanationRu: "We + were." },
            ],
          },
          {
            teach: {
              rule: '"was" (birlik) va "were" (ko\'plik va you) shakllarini ajratish.',
              ruleRu: 'Различение "was" (единственное число) и "were" (множественное число и you).',
              formula: 'I / He / She / It ➔ WAS  |  You / We / They ➔ WERE',
              example: 'I was at home, but my brothers were at school.',
              exampleRu: 'I was at home, but my brothers were at school.',
            },
            exercises: [
              { text: 'He ___ at home, but we ___ at the cinema.', options: ['was / were', 'were / was', 'was / was'], correct: 0, explanation: 'He was / we were.', explanationRu: "He was / we were." },
              { text: 'Choose the correct pair: She ___ / They ___', options: ['was / were', 'were / was', 'was / was'], correct: 0, explanation: 'She was / They were.', explanationRu: "She was / They were." },
            ],
          },
          {
            teach: {
              rule: '"were" shaklining barcha ko\'plik egalari bilan qo\'llanishini birlashtiramiz.',
              ruleRu: 'Обобщим использование "were" с you, we, they.',
              formula: 'You / We / They ➔ WERE (Past of are)',
              example: 'We were at the stadium and they were there too.',
              exampleRu: 'We were at the stadium and they were there too.',
            },
            exercises: [
              { text: 'Choose the correct form: The children ___ in the yard.', options: ['were', 'was'], correct: 0, explanation: 'The children (they) -> were.', explanationRu: "The children (they) -> were." },
              { text: 'Choose the correct form: You and I ___ in Tashkent.', options: ['were', 'was'], correct: 0, explanation: 'You and I (we) -> were.', explanationRu: "You and I (we) -> were." },
              { text: 'Select the correct sentence:', options: ['They were happy to see us.', 'They was happy to see us.'], correct: 0, explanation: 'They + were.', explanationRu: "They + were." },
            ],
          },
        ],
      },
      {
        id: 'sec-tobe-past-l3',
        order: 3,
        title: 'Inkor shakllar: "wasn\'t" va "weren\'t"',
        titleRu: 'Отрицательные формы: "wasn\'t" и "weren\'t"',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: '"was" ning inkori: was not ➔ wasn\'t (I, he, she, it wasn\'t). "u / men emas edim".',
              ruleRu: 'Отрицание от "was": was not ➔ wasn\'t.',
              formula: 'I / He / She / It + wasn\'t (was not) + State / Place',
              example: 'I wasn\'t at home yesterday. (Men kecha uyda emas edim.)',
              exampleRu: 'I wasn\'t at home yesterday. (Я не был дома вчера.)',
            },
            exercises: [
              { text: 'He ___ at work yesterday.', options: ["wasn't", "weren't", "isn't"], correct: 0, explanation: '"He" inkorida: wasn\'t.', explanationRu: "В отрицании с \"He\": wasn't." },
              { text: 'She ___ hungry last night.', options: ["wasn't", "weren't", "aren't"], correct: 0, explanation: '"She" inkorida: wasn\'t.', explanationRu: "В отрицании с \"She\": wasn't." },
            ],
          },
          {
            teach: {
              rule: '"were" ning inkori: were not ➔ weren\'t (you, we, they weren\'t). "sizlar / bizlar emas edik".',
              ruleRu: 'Отрицание от "were": were not ➔ weren\'t.',
              formula: 'You / We / They + weren\'t (were not) + State / Place',
              example: 'We weren\'t late. They weren\'t ready.',
              exampleRu: 'We weren\'t late. They weren\'t ready.',
            },
            exercises: [
              { text: 'They ___ at the meeting.', options: ["weren't", "wasn't", "isn't"], correct: 0, explanation: '"They" inkorida: weren\'t.', explanationRu: "В отрицании с \"They\": weren't." },
              { text: 'You ___ at school yesterday.', options: ["weren't", "wasn't", "am not"], correct: 0, explanation: '"You" inkorida: weren\'t.', explanationRu: "В отрицании с \"You\": weren't." },
            ],
          },
          {
            teach: {
              rule: 'O\'tgan zamon inkor gaplarini vaqt ko\'rsatkichlari bilan ishlatish mashqlari.',
              ruleRu: 'Отрицательные предложения с маркерами времени.',
              formula: 'Subject + wasn\'t / weren\'t + Place/Adjective + past time marker',
              example: 'It wasn\'t rainy yesterday. We weren\'t tired last night.',
              exampleRu: 'It wasn\'t rainy yesterday. We weren\'t tired last night.',
            },
            exercises: [
              { text: 'The exam ___ difficult last week.', options: ["wasn't", "weren't", "isn't"], correct: 0, explanation: 'The exam (it) -> wasn\'t.', explanationRu: "The exam (it) -> wasn't." },
              { text: 'My parents ___ at home 2 hours ago.', options: ["weren't", "wasn't", "don't"], correct: 0, explanation: 'My parents (they) -> weren\'t.', explanationRu: "My parents (they) -> weren't." },
            ],
          },
          {
            teach: {
              rule: 'Hozirgi zamon inkori (isn\'t / aren\'t) va O\'tgan zamon inkori (wasn\'t / weren\'t) taqqoslamasi.',
              ruleRu: 'Сравнение отрицаний: isn\'t/aren\'t (сейчас) vs wasn\'t/weren\'t (в прошлом).',
              formula: 'Now ➔ isn\'t / aren\'t  |  Past ➔ wasn\'t / weren\'t',
              example: 'He isn\'t at home now. He wasn\'t at home yesterday.',
              exampleRu: 'He isn\'t at home now. He wasn\'t at home yesterday.',
            },
            exercises: [
              { text: 'She ___ here now, but she ___ here yesterday.', options: ["isn't / was", "wasn't / is", "isn't / is"], correct: 0, explanation: 'now -> isn\'t / yesterday -> was.', explanationRu: "now -> isn't / yesterday -> was." },
              { text: 'Choose the correct sentence:', options: ['We weren\'t busy yesterday.', 'We isn\'t busy yesterday.'], correct: 0, explanation: 'yesterday + We -> weren\'t.', explanationRu: "yesterday + We -> weren't." },
            ],
          },
          {
            teach: {
              rule: 'Barcha inkor shakllarini (wasn\'t / weren\'t) birlashtiramiz.',
              ruleRu: 'Обобщим все отрицательные формы (wasn\'t / weren\'t).',
              formula: 'I/He/She/It wasn\'t  |  You/We/They weren\'t',
              example: 'I wasn\'t ready and they weren\'t ready either.',
              exampleRu: 'I wasn\'t ready and they weren\'t ready either.',
            },
            exercises: [
              { text: 'Choose the correct form: It ___ cold yesterday.', options: ["wasn't", "weren't"], correct: 0, explanation: 'It -> wasn\'t.', explanationRu: "It -> wasn't." },
              { text: 'Choose the correct form: You ___ at the party.', options: ["weren't", "wasn't"], correct: 0, explanation: 'You -> weren\'t.', explanationRu: "You -> weren't." },
              { text: 'Select the correct sentence:', options: ['The shops weren\'t open on Sunday.', 'The shops wasn\'t open on Sunday.'], correct: 0, explanation: 'The shops (they) -> weren\'t.', explanationRu: "The shops (they) -> weren't." },
            ],
          },
        ],
      },
      {
        id: 'sec-tobe-past-l4',
        order: 4,
        title: 'Savol shakllari: "Was ...?" va "Were ...?"',
        titleRu: 'Вопросительные формы: "Was ...?" и "Were ...?"',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: 'O\'tgan zamonda savol yasash uchun "Was" (birlik shaxslar uchun) eganing oldiga o\'tadi.',
              ruleRu: 'В вопросах "Was" ставится перед подлежащим (I, he, she, it).',
              formula: 'Was + I / he / she / it + Noun / Adjective / Place ?',
              example: 'Was he at home yesterday? (U kecha uyda edimi?) Was it cold?',
              exampleRu: 'Was he at home yesterday? (Он был дома вчера?) Was it cold?',
            },
            exercises: [
              { text: '___ she at school yesterday?', options: ['Was', 'Were', 'Is'], correct: 0, explanation: '"She" savolida "Was" oldinga chiqadi.', explanationRu: "В вопросе с \"She\" выносится вперёд \"Was\"." },
              { text: '___ the movie interesting?', options: ['Was', 'Were', 'Did'], correct: 0, explanation: 'The movie (it) -> Was.', explanationRu: "The movie (it) -> Was." },
            ],
          },
          {
            teach: {
              rule: 'O\'tgan zamonda savol yasash uchun "Were" (ko\'plik shaxslar va you uchun) eganing oldiga o\'tadi.',
              ruleRu: 'В вопросах "Were" ставится перед подлежащим (you, we, they).',
              formula: 'Were + you / we / they + Noun / Adjective / Place ?',
              example: 'Were you at the party? Were they happy?',
              exampleRu: 'Were you at the party? Were they happy?',
            },
            exercises: [
              { text: '___ you tired last night?', options: ['Were', 'Was', 'Are'], correct: 0, explanation: '"You" savolida "Were" oldinga chiqadi.', explanationRu: "В вопросе с \"You\" выносится вперёд \"Were\"." },
              { text: '___ they at home yesterday?', options: ['Were', 'Was', 'Do'], correct: 0, explanation: '"They" savolida "Were".', explanationRu: "В вопросе с \"They\": Were." },
            ],
          },
          {
            teach: {
              rule: 'Qisqa javoblar: Yes, I was / No, I wasn\'t | Yes, they were / No, they weren\'t.',
              ruleRu: 'Краткие ответы: Yes, I was / No, I wasn\'t | Yes, they were / No, they weren\'t.',
              formula: 'Yes, + Subject + was/were.  |  No, + Subject + wasn\'t/weren\'t.',
              example: '— Were you at school? — Yes, I was. / No, I wasn\'t.',
              exampleRu: '— Were you at school? — Yes, I was. / No, I wasn\'t.',
            },
            exercises: [
              { text: '— Was he at home? — Yes, he ___.', options: ['was', 'were', 'is'], correct: 0, explanation: 'Yes, he was.', explanationRu: "Yes, he was." },
              { text: '— Were they happy? — No, they ___.', options: ["weren't", "wasn't", "don't"], correct: 0, explanation: 'No, they weren\'t.', explanationRu: "No, they weren't." },
            ],
          },
          {
            teach: {
              rule: 'Maxsus savollar (Wh- questions): Where / Why / When / How + was / were + subject?',
              ruleRu: 'Специальные вопросы: Wh- word + Was/Were + Subject?',
              formula: 'Wh- word (Where/Why/When) + Was / Were + Subject ?',
              example: 'Where were you yesterday? Why was he late?',
              exampleRu: 'Where were you yesterday? Why was he late?',
            },
            exercises: [
              { text: 'Where ___ you yesterday afternoon?', options: ['were', 'was', 'are'], correct: 0, explanation: 'Where + were you.', explanationRu: "Where + were you." },
              { text: 'Why ___ she late for school?', options: ['was', 'were', 'is'], correct: 0, explanation: 'Why + was she.', explanationRu: "Why + was she." },
            ],
          },
          {
            teach: {
              rule: '"Was" va "Were" savol shakllarini birlashtiramiz.',
              ruleRu: 'Обобщим все вопросительные формы с Was и Were.',
              formula: 'Was (I/he/she/it) ?  |  Were (you/we/they) ?',
              example: 'Where were you last night and why was Tom with you?',
              exampleRu: 'Where were you last night and why was Tom with you?',
            },
            exercises: [
              { text: 'Choose the correct question: ___ you at home?', options: ['Were', 'Was'], correct: 0, explanation: 'Were you...', explanationRu: "Were you..." },
              { text: 'Choose the correct question: ___ it rainy yesterday?', options: ['Was', 'Were'], correct: 0, explanation: 'Was it...', explanationRu: "Was it..." },
              { text: 'Select the correct question:', options: ['Where was your phone?', 'Where were your phone?'], correct: 0, explanation: 'your phone (it) -> Where was.', explanationRu: "your phone (it) -> Where was." },
            ],
          },
        ],
      },
      {
        id: 'sec-tobe-past-l5',
        order: 5,
        title: 'Present (am/is/are) vs Past (was/were) Taqqoslash',
        titleRu: 'Сравнение Present (am/is/are) и Past (was/were)',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: 'Hozirgi va O\'tgan zamon to be shakllarini har doim vaqt belgilariga qarab ajrating!',
              ruleRu: 'Различайте формы to be по маркерам времени: сейчас vs в прошлом.',
              formula: 'Present: am / is / are (now, today)  |  Past: was / were (yesterday, last week)',
              example: 'I am a doctor now. I was a student 5 years ago.',
              exampleRu: 'I am a doctor now. I was a student 5 years ago.',
            },
            exercises: [
              { text: 'Today I ___ happy, but yesterday I ___ sad.', options: ['am / was', 'was / am', 'am / am'], correct: 0, explanation: 'Today -> am / yesterday -> was.', explanationRu: "Today -> am / yesterday -> was." },
              { text: 'Now they ___ in Tashkent, but last week they ___ in Bukhara.', options: ['are / were', 'were / are', 'are / are'], correct: 0, explanation: 'Now -> are / last week -> were.', explanationRu: "Now -> are / last week -> were." },
            ],
          },
          {
            teach: {
              rule: 'Kalit so\'zlar taqqoslamasi: now, today, at the moment (Present) vs yesterday, last night, in 2015, ago (Past).',
              ruleRu: 'Маркеры времени: now/today (Present) vs yesterday/last year (Past).',
              formula: 'Check time signal ➔ Select am/is/are or was/were',
              example: 'Where are you now? Where were you yesterday?',
              exampleRu: 'Where are you now? Where were you yesterday?',
            },
            exercises: [
              { text: 'The weather ___ very cold yesterday.', options: ['was', 'is', 'are'], correct: 0, explanation: 'yesterday -> was.', explanationRu: "yesterday -> was." },
              { text: 'The weather ___ very nice today.', options: ['is', 'was', 'were'], correct: 0, explanation: 'today -> is.', explanationRu: "today -> is." },
            ],
          },
          {
            teach: {
              rule: '"... before, but now ..." — ilgari qanday edi va hozir qanday iborasi.',
              ruleRu: 'Выражение типа "... раньше, но сейчас ...".',
              formula: 'Past state (was/were) + but now + Present state (am/is/are)',
              example: 'This house was old before, but now it is new and clean.',
              exampleRu: 'This house was old before, but now it is new and clean.',
            },
            exercises: [
              { text: 'I ___ small 10 years ago, but now I ___ tall.', options: ['was / am', 'am / was', 'was / was'], correct: 0, explanation: '10 years ago -> was / now -> am.', explanationRu: "10 years ago -> was / now -> am." },
              { text: 'Choose the correct sentence:', options: ['He was poor before, but now he is rich.', 'He is poor before, but now he was rich.'], correct: 0, explanation: 'before -> was / now -> is.', explanationRu: "before -> was / now -> is." },
            ],
          },
          {
            teach: {
              rule: 'Gap ichida bir nechta zamon shakllarini moslashtirish.',
              ruleRu: 'Согласование форм времени в контексте.',
              formula: 'Match subject & time frame ➔ Correct form',
              example: 'We were at the restaurant last night, and the food was delicious.',
              exampleRu: 'We were at the restaurant last night, and the food was delicious.',
            },
            exercises: [
              { text: 'Where ___ you last night? — I ___ at home.', options: ['were / was', 'was / were', 'are / am'], correct: 0, explanation: 'were you / I was.', explanationRu: "were you / I was." },
              { text: 'Select the correct sentence:', options: ['She is 20 now; last year she was 19.', 'She was 20 now; last year she is 19.'], correct: 0, explanation: 'now -> is / last year -> was.', explanationRu: "now -> is / last year -> was." },
            ],
          },
          {
            teach: {
              rule: 'Present va Past to be taqqoslamasini birlashtiramiz.',
              ruleRu: 'Обобщим сравнение Present и Past to be.',
              formula: 'Now ➔ am / is / are  |  Past ➔ was / were',
              example: 'I am ready today, but I was not ready yesterday.',
              exampleRu: 'I am ready today, but I was not ready yesterday.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['They were in London last month.', 'They are in London last month.'], correct: 0, explanation: 'last month -> were.', explanationRu: "last month -> were." },
              { text: 'Choose the correct sentence:', options: ['I am at work right now.', 'I was at work right now.'], correct: 0, explanation: 'right now -> am.', explanationRu: "right now -> am." },
              { text: 'Select the correct sentence:', options: ['It was sunny yesterday, but it is rainy today.', 'It is sunny yesterday, but it was rainy today.'], correct: 0, explanation: 'yesterday -> was / today -> is.', explanationRu: "yesterday -> was / today -> is." },
            ],
          },
        ],
      },
      {
        id: 'sec-tobe-past-l6',
        order: 6,
        title: 'Aralash amaliyot va Xatolarni tuzatish (was / were)',
        titleRu: 'Смешанная практика и Исправление ошибок (was / were)',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: 'Eng ko\'p uchraydigan 3 ta xato: 1) They was ❌ ➔ They were ✅ 2) I were ❌ ➔ I was ✅ 3) We wasn\'t ❌ ➔ We weren\'t ✅.',
              ruleRu: '3 частые ошибки: 1) They was ❌ ➔ They were ✅ 2) I were ❌ ➔ I was ✅ 3) We wasn\'t ❌ ➔ We weren\'t ✅.',
              formula: 'Check Errors: I/He/She/It ➔ was | You/We/They ➔ were',
              example: 'They were happy. I was tired. We weren\'t late.',
              exampleRu: 'They were happy. I was tired. We weren\'t late.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['They were at the museum.', 'They was at the museum.'], correct: 0, explanation: 'They + were.', explanationRu: "They + were." },
              { text: 'Choose the correct sentence:', options: ['We weren\'t late for class.', 'We wasn\'t late for class.'], correct: 0, explanation: 'We + weren\'t.', explanationRu: "We + weren't." },
            ],
          },
          {
            teach: {
              rule: 'Dialoglarda "was/were" shakllarini ishlatish amaliyoti.',
              ruleRu: 'Практика применения was/were в диалогах.',
              formula: 'Dialogue Context: — Was/Were...? — Yes, ... / No, ...',
              example: '— Was it cold yesterday? — Yes, it was very cold.',
              exampleRu: '— Was it cold yesterday? — Yes, it was very cold.',
            },
            exercises: [
              { text: '— ___ you at the concert? — Yes, I ___ !', options: ['Were / was', 'Was / were', 'Are / am'], correct: 0, explanation: 'Were you / I was.', explanationRu: "Were you / I was." },
              { text: '— ___ he late? — No, he ___ on time.', options: ['Was / was', 'Were / was', 'Was / were'], correct: 0, explanation: 'Was he / he was.', explanationRu: "Was he / he was." },
            ],
          },
          {
            teach: {
              rule: 'Matn va hikoyalarda o\'tgan zamon to be shakllarini to\'g\'ri qo\'llash.',
              ruleRu: 'Применение was/were в контексте коротких историй.',
              formula: 'Story Context: Check subject ➔ apply was / were / wasn\'t / weren\'t',
              example: 'Yesterday was Sunday. The weather was warm. We were at the park.',
              exampleRu: 'Yesterday was Sunday. The weather was warm. We were at the park.',
            },
            exercises: [
              { text: 'Yesterday ___ my birthday. All my friends ___ at my house.', options: ['was / were', 'were / was', 'was / was'], correct: 0, explanation: 'birthday (it) was / friends (they) were.', explanationRu: "birthday (it) was / friends (they) were." },
              { text: 'The movie ___ short, but the songs ___ great.', options: ['was / were', 'were / was', 'was / was'], correct: 0, explanation: 'movie was / songs were.', explanationRu: "movie was / songs were." },
            ],
          },
          {
            teach: {
              rule: 'Barcha shakllarni (darak, inkor, savol) bir joyda takrorlash.',
              ruleRu: 'Повторение всех типов предложений (утверждение, отрицание, вопрос).',
              formula: 'Full Was/Were Integration: Statement | Negative | Question',
              example: 'I was there. I wasn\'t alone. Were you there too?',
              exampleRu: 'I was there. I wasn\'t alone. Were you there too?',
            },
            exercises: [
              { text: 'Select the correct sentence:', options: ['Where were you when the bell rang?', 'Where was you when the bell rang?'], correct: 0, explanation: 'Where were you...', explanationRu: "Where were you..." },
              { text: 'Select the correct sentence:', options: ['She wasn\'t happy because she was tired.', 'She weren\'t happy because she were tired.'], correct: 0, explanation: 'She wasn\'t / she was.', explanationRu: "She wasn't / she was." },
            ],
          },
          {
            teach: {
              rule: 'Section 11 bo\'yicha yakuniy master formula va sarhisob.',
              ruleRu: 'Итоговое главная формула для Was и Were.',
              formula: 'Master Was/Were Rule: I / He / She / It ➔ WAS | You / We / They ➔ WERE',
              example: 'I was, he was, she was, it was. You were, we were, they were.',
              exampleRu: 'I was, he was, she was, it was. You were, we were, they were.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I was at home, and my parents were at work.', 'I were at home, and my parents was at work.'], correct: 0, explanation: 'I was / parents (they) were.', explanationRu: "I was / parents (they) were." },
              { text: 'Choose the correct sentence:', options: ['Why were you absent yesterday?', 'Why was you absent yesterday?'], correct: 0, explanation: 'Why were you...', explanationRu: "Why were you..." },
              { text: 'Select the correct sentence:', options: ['It was a great day, and we were happy.', 'It were a great day, and we was happy.'], correct: 0, explanation: 'It was / we were.', explanationRu: "It was / we were." },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: 'To be' — o'tgan zamon (was / were)",
      titleRu: 'Тест раздела: Глагол "to be" в прошедшем времени (was / were)',
      exercises: [
        { text: 'I ___ at home yesterday evening.', options: ['was', 'were', 'am'], correct: 0, explanation: 'I + was.', explanationRu: "I + was." },
        { text: 'They ___ at the cinema last night.', options: ['were', 'was', 'are'], correct: 0, explanation: 'They + were.', explanationRu: "They + were." },
        { text: 'She ___ very tired after the trip.', options: ['was', 'were', 'is'], correct: 0, explanation: 'She + was.', explanationRu: "She + was." },
        { text: 'We ___ classmates 3 years ago.', options: ['were', 'was', 'am'], correct: 0, explanation: 'We + were.', explanationRu: "We + were." },
        { text: 'He ___ at work yesterday because he was sick.', options: ["wasn't", "weren't", "isn't"], correct: 0, explanation: 'He + wasn\'t.', explanationRu: "He + wasn't." },
        { text: 'The students ___ ready for the test.', options: ["weren't", "wasn't", "don't"], correct: 0, explanation: 'The students (they) + weren\'t.', explanationRu: "The students (they) + weren't." },
        { text: '___ you at school yesterday?', options: ['Were', 'Was', 'Did'], correct: 0, explanation: 'Were you...', explanationRu: "Were you..." },
        { text: '___ it cold last winter?', options: ['Was', 'Were', 'Is'], correct: 0, explanation: 'Was it...', explanationRu: "Was it..." },
        { text: 'Where ___ your brother yesterday?', options: ['was', 'were', 'is'], correct: 0, explanation: 'Where was your brother (he)...', explanationRu: "Where was your brother (he)..." },
        { text: '— Were you happy? — Yes, I ___.', options: ['was', 'were', 'am'], correct: 0, explanation: 'Yes, I was.', explanationRu: "Yes, I was." },
        { text: 'Today is warm, but yesterday ___ very cold.', options: ['was', 'is', 'were'], correct: 0, explanation: 'yesterday -> was.', explanationRu: "yesterday -> was." },
        { text: 'Choose the correct sentence:', options: ['We were in Samarkand last month.', 'We was in Samarkand last month.'], correct: 0, explanation: 'We + were.', explanationRu: "We + were." },
        { text: 'Choose the correct sentence:', options: ['She wasn\'t late for the meeting.', 'She weren\'t late for the meeting.'], correct: 0, explanation: 'She + wasn\'t.', explanationRu: "She + wasn't." },
        { text: 'Select the correct sentence:', options: ['Why was he so angry yesterday?', 'Why were he so angry yesterday?'], correct: 0, explanation: 'Why was he...', explanationRu: "Why was he..." },
        { text: 'Select the correct sentence:', options: ['My sister and I were at home last night.', 'My sister and I was at home last night.'], correct: 0, explanation: 'My sister and I (we) -> were.', explanationRu: "My sister and I (we) -> were." },
      ],
    },
  },
  {
    id: 'sec-past-simple',
    order: 12,
    title: "Past Simple — muntazam (-ed) va noto'g'ri fe'llar",
    titleRu: 'Past Simple — правильные (-ed) и неправильные глаголы',
    icon: '📜',
    lessons: [
      {
        id: 'sec-past-simple-l1',
        order: 1,
        title: "Muntazam fe'llar (-ed qo'shimchasi)",
        titleRu: 'Правильные глаголы (окончание -ed)',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: 'O\'tgan zamonda sodir bo\'lgan va tugagan harakatlar uchun Past Simple ishlatiladi. Muntazam (regular) fe\'llarga "-ed" qo\'shiladi.',
              ruleRu: 'Past Simple используется для действий, завершенных в прошлом. К правильным глаголам добавляется окончание "-ed".',
              formula: 'Subject + Verb + -ed',
              example: 'I worked yesterday. (Men kecha ishladim.) She played tennis. (U tennis o\'ynadi.)',
              exampleRu: 'I worked yesterday. (Я работал вчера.) She played tennis. (Она играла в теннис.)',
            },
            exercises: [
              { text: 'I ___ TV yesterday evening.', options: ['watched', 'watch', 'watching'], correct: 0, explanation: 'Past Simple da muntazam fe\'lga -ed qo\'shiladi: watched.', explanationRu: "В Past Simple к правильным глаголам добавляется -ed: watched." },
              { text: 'They ___ football last Sunday.', options: ['played', 'play', 'plays'], correct: 0, explanation: 'last Sunday -> played.', explanationRu: "last Sunday -> played." },
            ],
          },
          {
            teach: {
              rule: 'Yozilish qoidalari: 1) -e bilan tugasa faqat -d qo\'shiladi (like ➔ liked). 2) Undosh + y ➔ -ied (study ➔ studied). 3) Qisqa unli + undosh ➔ oxirgi harf ikkilanadi (stop ➔ stopped).',
              ruleRu: 'Правила правописания: 1) like ➔ liked, 2) study ➔ studied, 3) stop ➔ stopped.',
              formula: 'like ➔ liked  |  study ➔ studied  |  stop ➔ stopped',
              example: 'He lived in Tashkent. She studied English. The car stopped.',
              exampleRu: 'He lived in Tashkent. She studied English. The car stopped.',
            },
            exercises: [
              { text: 'Past Simple form of "study":', options: ['studied', 'studyed', 'studyd'], correct: 0, explanation: 'study -> studied (y ➔ ied).', explanationRu: "study -> studied (y ➔ ied)." },
              { text: 'Past Simple form of "stop":', options: ['stopped', 'stoped', 'stopping'], correct: 0, explanation: 'stop -> stopped (p ikkilanadi).', explanationRu: "stop -> stopped (p удваивается)." },
            ],
          },
          {
            teach: {
              rule: '"-ed" ning talaffuzi: 1) /t/ (p, k, f, s dan keyin: worked, walked). 2) /d/ (unlilar va b, g, v, m, n, l va h.k. dan keyin: played, lived). 3) /ɪd/ (t, d dan keyin: wanted, needed).',
              ruleRu: 'Произношение -ed: /t/ после глухих, /d/ после звонких/гласных, /ɪd/ после t, d.',
              formula: 'want ➔ wanted (/ɪd/)  |  work ➔ worked (/t/)  |  play ➔ played (/d/)',
              example: 'I wanted ice cream. He walked home. We played games.',
              exampleRu: 'I wanted ice cream. He walked home. We played games.',
            },
            exercises: [
              { text: 'Which word has the /ɪd/ sound for "-ed"?', options: ['wanted', 'worked', 'played'], correct: 0, explanation: 't bilan tugagani uchun wanted /ɪd/ deb o\'qiladi.', explanationRu: "Так как оканчивается на t, wanted произносится как /ɪd/." },
              { text: 'Past Simple form of "live":', options: ['lived', 'livede', 'livet'], correct: 0, explanation: 'live -> lived.', explanationRu: "live -> lived." },
            ],
          },
          {
            teach: {
              rule: 'Past Simple vaqt ko\'rsatkichlari: yesterday (kecha), last night/week/month (o\'tgan tun/hafta/oy), ago (ilgari: 2 days ago), in 2018.',
              ruleRu: 'Маркеры прошедшего времени: yesterday, last week, 3 days ago, in 2015.',
              formula: 'Verb + -ed + yesterday / last week / ... ago',
              example: 'We visited Samarkand last month. He called me 2 hours ago.',
              exampleRu: 'We visited Samarkand last month. He called me 2 hours ago.',
            },
            exercises: [
              { text: 'She ___ her room yesterday.', options: ['cleaned', 'cleans', 'cleaning'], correct: 0, explanation: 'yesterday -> cleaned.', explanationRu: "yesterday -> cleaned." },
              { text: 'We ___ in London in 2020.', options: ['lived', 'live', 'lives'], correct: 0, explanation: 'in 2020 -> lived.', explanationRu: "in 2020 -> lived." },
            ],
          },
          {
            teach: {
              rule: 'Muntazam fe\'llar (-ed) bo\'yicha bilganlarimizni birlashtiramiz.',
              ruleRu: 'Обобщим все знания о правильных глаголах (-ed).',
              formula: 'Subject + Verb-ed + Past time marker',
              example: 'I studied hard and passed the exam yesterday.',
              exampleRu: 'I studied hard and passed the exam yesterday.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['They cooked dinner last night.', 'They cook dinner last night.'], correct: 0, explanation: 'last night -> cooked.', explanationRu: "last night -> cooked." },
              { text: 'Choose the correct sentence:', options: ['He walked to school yesterday.', 'He walk to school yesterday.'], correct: 0, explanation: 'yesterday -> walked.', explanationRu: "yesterday -> walked." },
              { text: 'Select the correct sentence:', options: ['My sister invited me to the party.', 'My sister invite me to the party.'], correct: 0, explanation: 'Past Simple: invited.', explanationRu: "Past Simple: invited." },
            ],
          },
        ],
      },
      {
        id: 'sec-past-simple-l2',
        order: 2,
        title: "Noto'g'ri fe'llar (Irregular Verbs - V2)",
        titleRu: 'Неправильные глаголы (Irregular Verbs - V2)',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: "Noto'g'ri (irregular) fe'llarga '-ed' qo'shilmaydi. Ularning Past Simple (V2) shakli yodlanishi kerak: go ➔ went, see ➔ saw.",
              ruleRu: 'Неправильные глаголы не берут -ed. В Past Simple используется вторая форма (V2): go ➔ went, see ➔ saw.',
              formula: 'Subject + V2 (Irregular Verb)',
              example: 'I went to school yesterday. (Men kecha maktabga bordim.)',
              exampleRu: 'I went to school yesterday. (Я пошел в школу вчера.)',
            },
            exercises: [
              { text: 'Past Simple form of "go":', options: ['went', 'goed', 'goes'], correct: 0, explanation: 'go ning Past Simple shakli: went.', explanationRu: "Форма Past Simple от go: went." },
              { text: 'Yesterday I ___ my friend in the park.', options: ['saw', 'see', 'seed'], correct: 0, explanation: 'see -> saw.', explanationRu: "see -> saw." },
            ],
          },
          {
            teach: {
              rule: "Eng ko'p ishlatiladigan noto'g'ri fe'llar (1-guruh): go ➔ went, do ➔ did, have ➔ had, get ➔ got, take ➔ took.",
              ruleRu: 'Основные неправильные глаголы (1 группа): go➔went, do➔did, have➔had, get➔got, take➔took.',
              formula: 'go➔went | do➔did | have➔had | get➔got | take➔took',
              example: 'We had lunch at 1 PM. He took a taxi yesterday.',
              exampleRu: 'We had lunch at 1 PM. He took a taxi yesterday.',
            },
            exercises: [
              { text: 'Past Simple form of "have":', options: ['had', 'haved', 'has'], correct: 0, explanation: 'have -> had.', explanationRu: "have -> had." },
              { text: 'He ___ his homework last night.', options: ['did', 'doed', 'does'], correct: 0, explanation: 'do -> did.', explanationRu: "do -> did." },
            ],
          },
          {
            teach: {
              rule: "Eng ko'p ishlatiladigan noto'g'ri fe'llar (2-guruh): come ➔ came, make ➔ made, say ➔ said, buy ➔ bought, give ➔ gave.",
              ruleRu: 'Основные неправильные глаголы (2 группа): come➔came, make➔made, say➔said, buy➔bought, give➔gave.',
              formula: 'come➔came | make➔made | say➔said | buy➔bought | give➔gave',
              example: 'She bought a new phone yesterday. My friend came to visit.',
              exampleRu: 'She bought a new phone yesterday. My friend came to visit.',
            },
            exercises: [
              { text: 'Past Simple form of "buy":', options: ['bought', 'buyed', 'buys'], correct: 0, explanation: 'buy -> bought.', explanationRu: "buy -> bought." },
              { text: 'She ___ me a present last week.', options: ['gave', 'gived', 'gives'], correct: 0, explanation: 'give -> gave.', explanationRu: "give -> gave." },
            ],
          },
          {
            teach: {
              rule: "O'zgarmaydigan noto'g'ri fe'llar: cut ➔ cut, put ➔ put, hurt ➔ hurt, cost ➔ cost. (read ➔ read: yozilishi bir xil, lekin /red/ deb talaffuz qilinadi).",
              ruleRu: 'Глаголы, не меняющие форму: cut➔cut, put➔put, hurt➔hurt, cost➔cost. (read читается как /red/).',
              formula: 'cut➔cut | put➔put | read➔read (/red/) | cost➔cost',
              example: 'I read a great book yesterday. He put the key on the table.',
              exampleRu: 'I read a great book yesterday. He put the key on the table.',
            },
            exercises: [
              { text: 'Past Simple form of "put":', options: ['put', 'puted', 'putton'], correct: 0, explanation: 'put ning o\'tgan zamon shakli o\'zgarmaydi: put.', explanationRu: "Форма прошедшего времени от put не меняется: put." },
              { text: 'Yesterday I ___ an interesting news article.', options: ['read', 'readed', 'reading'], correct: 0, explanation: 'read ning Past Simple shakli read yoziladi (/red/ o\'qiladi).', explanationRu: "Форма Past Simple от read пишется read (произносится /red/)." },
            ],
          },
          {
            teach: {
              rule: "Noto'g'ri fe'llar (V2) bo'yicha bilganlarimizni birlashtiramiz.",
              ruleRu: 'Обобщим знания о неправильных глаголах (V2).',
              formula: 'Subject + V2 (went, saw, bought, had...)',
              example: 'I woke up early, had breakfast, and went to work.',
              exampleRu: 'I woke up early, had breakfast, and went to work.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['She wrote a letter yesterday.', 'She writed a letter yesterday.'], correct: 0, explanation: 'write -> wrote.', explanationRu: "write -> wrote." },
              { text: 'Choose the correct sentence:', options: ['We ate pizza last night.', 'We eated pizza last night.'], correct: 0, explanation: 'eat -> ate.', explanationRu: "eat -> ate." },
              { text: 'Select the correct sentence:', options: ['He came home late last night.', 'He comed home late last night.'], correct: 0, explanation: 'come -> came.', explanationRu: "come -> came." },
            ],
          },
        ],
      },
      {
        id: 'sec-past-simple-l3',
        order: 3,
        title: "Inkor shakli: \"didn't + V1\"",
        titleRu: 'Отрицательная форма: "didn\'t + V1"',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: "Past Simple inkorida barcha shaxslar uchun \"didn't\" (did not) ishlatiladi. Muhim: didn't dan keyin fe'l BOSH (V1) shaklga qaytadi!",
              ruleRu: 'Для отрицания используется "didn\'t" (did not) для всех лиц. ВАЖНО: после didn\'t глагол возвращается в начальную форму (V1)!',
              formula: 'Subject + didn\'t + V1 (infinitive without to)',
              example: 'I didn\'t work yesterday. (worked EMAS) She didn\'t go. (went EMAS)',
              exampleRu: 'I didn\'t work yesterday. She didn\'t go.',
            },
            exercises: [
              { text: 'I ___ to school yesterday.', options: ["didn't go", "didn't went", "not go"], correct: 0, explanation: "didn't dan keyin fe'l bosh shaklda: didn't go.", explanationRu: "После didn't глагол в начальной форме: didn't go." },
              { text: 'She ___ TV last night.', options: ["didn't watch", "didn't watched", "not watched"], correct: 0, explanation: "didn't + V1: didn't watch.", explanationRu: "didn't + V1: didn't watch." },
            ],
          },
          {
            teach: {
              rule: "Muntazam fe'llar inkorida -ed DUSHADI: worked ➔ didn't work | played ➔ didn't play.",
              ruleRu: 'В отрицании правильных глаголов окончание -ed ОТПАДАЕТ: worked ➔ didn\'t work.',
              formula: 'Subject + didn\'t + Verb (NO -ed!)',
              example: 'He didn\'t call me yesterday.',
              exampleRu: 'He didn\'t call me yesterday.',
            },
            exercises: [
              { text: 'They ___ football yesterday.', options: ["didn't play", "didn't played", "don't played"], correct: 0, explanation: "didn't + play (-ed siz).", explanationRu: "didn't + play (без -ed)." },
              { text: 'We ___ the car last week.', options: ["didn't clean", "didn't cleaned", "not clean"], correct: 0, explanation: "didn't + clean.", explanationRu: "didn't + clean." },
            ],
          },
          {
            teach: {
              rule: "Noto'g'ri fe'llar inkorida V2 V1 ga qaytadi: went ➔ didn't go | saw ➔ didn't see | bought ➔ didn't buy.",
              ruleRu: 'В отрицании неправильных глаголов V2 меняется обратно на V1: went ➔ didn\'t go.',
              formula: 'went ➔ didn\'t go  |  saw ➔ didn\'t see  |  bought ➔ didn\'t buy',
              example: 'I didn\'t buy the ticket. She didn\'t see the movie.',
              exampleRu: 'I didn\'t buy the ticket. She didn\'t see the movie.',
            },
            exercises: [
              { text: 'I ___ him yesterday.', options: ["didn't see", "didn't saw", "don't saw"], correct: 0, explanation: "didn't + see (V1).", explanationRu: "didn't + see (V1)." },
              { text: 'He ___ breakfast this morning.', options: ["didn't have", "didn't had", "not had"], correct: 0, explanation: "didn't + have (V1).", explanationRu: "didn't + have (V1)." },
            ],
          },
          {
            teach: {
              rule: "Eng ko'p uchraydigan 2 ta xato: 1) didn't went ❌ ➔ didn't go ✅  2) didn't worked ❌ ➔ didn't work ✅.",
              ruleRu: '2 частые ошибки: 1) didn\'t went ❌ ➔ didn\'t go ✅  2) didn\'t worked ❌ ➔ didn\'t work ✅.',
              formula: 'REMEMBER: didn\'t ALWAYS takes V1 (base form)',
              example: 'Correct: I didn\'t know. (NOT: I didn\'t knew.)',
              exampleRu: 'Correct: I didn\'t know.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I didn\'t go to the party.', 'I didn\'t went to the party.'], correct: 0, explanation: "didn't + go.", explanationRu: "didn't + go." },
              { text: 'Choose the correct sentence:', options: ['She didn\'t write the email.', 'She didn\'t wrote the email.'], correct: 0, explanation: "didn't + write.", explanationRu: "didn't + write." },
            ],
          },
          {
            teach: {
              rule: "Past Simple inkor shakllarini birlashtiramiz.",
              ruleRu: 'Обобщим все знания об отрицаниях в Past Simple.',
              formula: 'Subject + didn\'t + V1 (for all pronouns: I/you/he/she/it/we/they)',
              example: 'We didn\'t stay home, but we didn\'t spend much money.',
              exampleRu: 'We didn\'t stay home, but we didn\'t spend much money.',
            },
            exercises: [
              { text: 'Select the correct sentence:', options: ['They didn\'t enjoy the movie.', 'They didn\'t enjoyed the movie.'], correct: 0, explanation: "didn't + enjoy.", explanationRu: "didn't + enjoy." },
              { text: 'Select the correct sentence:', options: ['He didn\'t sleep well last night.', 'He didn\'t slept well last night.'], correct: 0, explanation: "didn't + sleep.", explanationRu: "didn't + sleep." },
              { text: 'Choose the correct form: I ___ my keys yesterday.', options: ["didn't find", "didn't found"], correct: 0, explanation: "didn't + find (V1).", explanationRu: "didn't + find (V1)." },
            ],
          },
        ],
      },
      {
        id: 'sec-past-simple-l4',
        order: 4,
        title: 'Savol shakli: "Did ... + V1?"',
        titleRu: 'Вопросительная форма: "Did ... + V1?"',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: 'Past Simple savollarida "Did" eganing oldiga o\'tadi. Fe\'l esa doim bosh (V1) shaklda bo\'ladi.',
              ruleRu: 'В вопросах "Did" ставится перед подлежащим. Глагол идет в начальной форме (V1).',
              formula: 'Did + Subject + V1 (base verb) ?',
              example: 'Did you work yesterday? (Siz kecha ishladingizmi?) Did he go to school?',
              exampleRu: 'Did you work yesterday? Did he go to school?',
            },
            exercises: [
              { text: '___ you watch the game last night?', options: ['Did', 'Do', 'Does'], correct: 0, explanation: 'O\'tgan zamon savolida "Did" ishlatiladi.', explanationRu: "В вопросе прошедшего времени используется \"Did\"." },
              { text: 'Did she ___ you yesterday?', options: ['call', 'called', 'calling'], correct: 0, explanation: 'Did borligi uchun fe\'l V1 shaklda: call.', explanationRu: "Из-за наличия Did глагол в форме V1: call." },
            ],
          },
          {
            teach: {
              rule: 'Qisqa javoblar: Yes, I did. / No, I didn\'t.',
              ruleRu: 'Краткие ответы: Yes, I did. / No, I didn\'t.',
              formula: 'Yes, + Subject + did.  |  No, + Subject + didn\'t.',
              example: '— Did you sleep well? — Yes, I did. / No, I didn\'t.',
              exampleRu: '— Did you sleep well? — Yes, I did. / No, I didn\'t.',
            },
            exercises: [
              { text: '— Did he pass the exam? — Yes, he ___ .', options: ['did', 'does', 'was'], correct: 0, explanation: 'Yes, he did.', explanationRu: "Yes, he did." },
              { text: '— Did they come on time? — No, they ___ .', options: ["didn't", "don't", "weren't"], correct: 0, explanation: 'No, they didn\'t.', explanationRu: "No, they didn't." },
            ],
          },
          {
            teach: {
              rule: 'Maxsus savollar (Wh- questions): Where / What / When / Why / Who + did + subject + V1?',
              ruleRu: 'Специальные вопросы: Wh- word + did + Subject + V1?',
              formula: 'Wh- word + did + Subject + V1 ?',
              example: 'What did you buy yesterday? Where did they go last week?',
              exampleRu: 'What did you buy yesterday? Where did they go last week?',
            },
            exercises: [
              { text: 'Where ___ you go last weekend?', options: ['did', 'do', 'were'], correct: 0, explanation: 'Where + did + you + go.', explanationRu: "Where + did + you + go." },
              { text: 'What did she ___ yesterday?', options: ['say', 'said', 'says'], correct: 0, explanation: 'did dan keyin fe\'l V1: say.', explanationRu: "После did глагол в V1: say." },
            ],
          },
          {
            teach: {
              rule: 'Ega so\'ralganda "Who / What" dan keyin "did" ishlatilmaydi, fe\'l to\'g\'ridan-to\'g\'ri V2 (-ed) shaklida keladi!',
              ruleRu: 'В вопросах к подлежащему (Who/What) "did" не используется, глагол ставится в V2 (-ed).',
              formula: 'Who + V2 (-ed / irregular) ?',
              example: 'Who broke the window? (Kim derazani sindirdi?) Who came first?',
              exampleRu: 'Who broke the window? Who came first?',
            },
            exercises: [
              { text: 'Who ___ the cake yesterday?', options: ['ate', 'did eat', 'eated'], correct: 0, explanation: 'Ega so\'ralganda: Who + ate (V2).', explanationRu: "При вопросе к подлежащему: Who + ate (V2)." },
              { text: 'Who ___ you yesterday?', options: ['called', 'did call', 'calls'], correct: 0, explanation: 'Who + called.', explanationRu: "Who + called." },
            ],
          },
          {
            teach: {
              rule: 'Past Simple savol shakllarini birlashtiramiz.',
              ruleRu: 'Обобщим все вопросительные формы в Past Simple.',
              formula: 'Did + Subject + V1 ?  |  Wh- + did + Subject + V1 ?',
              example: 'Did you see Tom, and what did he tell you?',
              exampleRu: 'Did you see Tom, and what did he tell you?',
            },
            exercises: [
              { text: 'Choose the correct question:', options: ['Did you like the concert?', 'Did you liked the concert?'], correct: 0, explanation: 'Did + like (V1).', explanationRu: "Did + like (V1)." },
              { text: 'Choose the correct question:', options: ['Where did you buy this shirt?', 'Where did you bought this shirt?'], correct: 0, explanation: 'did + buy (V1).', explanationRu: "did + buy (V1)." },
              { text: 'Select the correct question:', options: ['Why did she leave so early?', 'Why did she left so early?'], correct: 0, explanation: 'did + leave (V1).', explanationRu: "did + leave (V1)." },
            ],
          },
        ],
      },
      {
        id: 'sec-past-simple-l5',
        order: 5,
        title: 'Present Simple vs Past Simple Taqqoslash',
        titleRu: 'Сравнение Present Simple и Past Simple',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: 'Present Simple (odatiy, doimiy harakatlar) va Past Simple (o\'tib ketgan, tugagan harakatlar) ni vaqt ko\'rsatkichlaridan ajratamiz.',
              ruleRu: 'Present Simple (регулярные действия) vs Past Simple (завершенные действия в прошлом).',
              formula: 'Present: every day, usually, often  |  Past: yesterday, last week, ago',
              example: 'I play tennis every Sunday. I played tennis yesterday.',
              exampleRu: 'I play tennis every Sunday. I played tennis yesterday.',
            },
            exercises: [
              { text: 'I usually ___ coffee in the morning, but yesterday I ___ tea.', options: ['drink / drank', 'drank / drink', 'drink / drink'], correct: 0, explanation: 'usually -> drink / yesterday -> drank.', explanationRu: "usually -> drink / yesterday -> drank." },
              { text: 'She ___ to work every day, but last week she ___ at home.', options: ['goes / stayed', 'went / stays', 'goes / stay'], correct: 0, explanation: 'every day -> goes / last week -> stayed.', explanationRu: "every day -> goes / last week -> stayed." },
            ],
          },
          {
            teach: {
              rule: 'Yordamchi fe\'llar taqqoslamasi: Present Simple ➔ don\'t / doesn\'t  |  Past Simple ➔ didn\'t.',
              ruleRu: 'Отрицания: Present Simple ➔ don\'t/doesn\'t  |  Past Simple ➔ didn\'t.',
              formula: 'Present Negative: don\'t / doesn\'t + V1  |  Past Negative: didn\'t + V1',
              example: 'He doesn\'t like milk now. He didn\'t like milk as a child.',
              exampleRu: 'He doesn\'t like milk now. He didn\'t like milk as a child.',
            },
            exercises: [
              { text: 'I ___ like horror movies now, and I ___ like them before either.', options: ["don't / didn't", "didn't / don't", "don't / don't"], correct: 0, explanation: 'now -> don\'t / before -> didn\'t.', explanationRu: "now -> don't / before -> didn't." },
              { text: 'Choose the correct sentence:', options: ['He didn\'t call me yesterday.', 'He doesn\'t called me yesterday.'], correct: 0, explanation: 'yesterday -> didn\'t call.', explanationRu: "yesterday -> didn't call." },
            ],
          },
          {
            teach: {
              rule: 'Savollar taqqoslamasi: Present Simple ➔ Do / Does ... ?  |  Past Simple ➔ Did ... ?',
              ruleRu: 'Вопросы: Present Simple ➔ Do / Does ... ?  |  Past Simple ➔ Did ... ?',
              formula: 'Present Question: Do/Does + Subject + V1 ?  |  Past Question: Did + Subject + V1 ?',
              example: 'Do you live here? Did you live here 5 years ago?',
              exampleRu: 'Do you live here? Did you live here 5 years ago?',
            },
            exercises: [
              { text: '___ you watch TV every evening?', options: ['Do', 'Did', 'Does'], correct: 0, explanation: 'every evening -> Do.', explanationRu: "every evening -> Do." },
              { text: '___ you watch the news yesterday?', options: ['Did', 'Do', 'Does'], correct: 0, explanation: 'yesterday -> Did.', explanationRu: "yesterday -> Did." },
            ],
          },
          {
            teach: {
              rule: 'Hozirgi va o\'tgan zamon gaplarini bir matnda bog\'lash amaliyoti.',
              ruleRu: 'Связывание настоящего и прошедшего времени в контексте.',
              formula: 'Check time adverb ➔ Choose Present (V1/-s, don\'t/does) or Past (V2/-ed, didn\'t)',
              example: 'Last year I worked in a school, but now I work in a bank.',
              exampleRu: 'Last year I worked in a school, but now I work in a bank.',
            },
            exercises: [
              { text: 'In 2019 we ___ in Tashkent, but now we ___ in London.', options: ['lived / live', 'live / lived', 'lived / lived'], correct: 0, explanation: '2019 -> lived / now -> live.', explanationRu: "2019 -> lived / now -> live." },
              { text: 'Select the correct sentence:', options: ['He bought a laptop last week and uses it every day.', 'He buys a laptop last week and used it every day.'], correct: 0, explanation: 'last week -> bought / every day -> uses.', explanationRu: "last week -> bought / every day -> uses." },
            ],
          },
          {
            teach: {
              rule: 'Present vs Past Simple taqqoslamasini birlashtiramiz.',
              ruleRu: 'Обобщим сравнение Present Simple и Past Simple.',
              formula: 'Present (habits, now) vs Past (completed actions)',
              example: 'I always buy bread here, but yesterday I bought fruit.',
              exampleRu: 'I always buy bread here, but yesterday I bought fruit.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['She visited her grandma last Sunday.', 'She visits her grandma last Sunday.'], correct: 0, explanation: 'last Sunday -> visited.', explanationRu: "last Sunday -> visited." },
              { text: 'Choose the correct sentence:', options: ['Do you usually get up early?', 'Did you usually get up early?'], correct: 0, explanation: 'usually -> Do.', explanationRu: "usually -> Do." },
              { text: 'Select the correct sentence:', options: ['I didn\'t go to work yesterday because I was sick.', 'I don\'t go to work yesterday because I was sick.'], correct: 0, explanation: 'yesterday -> didn\'t go.', explanationRu: "yesterday -> didn't go." },
            ],
          },
        ],
      },
      {
        id: 'sec-past-simple-l6',
        order: 6,
        title: 'Aralash amaliyot va Xatolarni tuzatish (Past Simple)',
        titleRu: 'Смешанная практика и Исправление ошибок (Past Simple)',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: 'Eng ko\'p uchraydigan 3 ta xato: 1) I didn\'t went ❌ ➔ I didn\'t go ✅  2) Did you bought ❌ ➔ Did you buy ✅  3) He goed ❌ ➔ He went ✅.',
              ruleRu: '3 частые ошибки: 1) didn\'t went ❌ ➔ didn\'t go ✅  2) Did you bought ❌ ➔ Did you buy ✅  3) He goed ❌ ➔ He went ✅.',
              formula: 'Check list: 1) Statement=V2/-ed | 2) Negative=didn\'t+V1 | 3) Question=Did+V1',
              example: 'I went to school. I didn\'t go to school. Did you go to school?',
              exampleRu: 'I went to school. I didn\'t go to school. Did you go to school?',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['They didn\'t know the answer.', 'They didn\'t knew the answer.'], correct: 0, explanation: "didn't + know (V1).", explanationRu: "didn't + know (V1)." },
              { text: 'Choose the correct sentence:', options: ['Did you lose your keys?', 'Did you lost your keys?'], correct: 0, explanation: 'Did + lose (V1).', explanationRu: "Did + lose (V1)." },
            ],
          },
          {
            teach: {
              rule: 'Hikoya va dialoglarda o\'tgan zamon fe\'llarini qo\'llash.',
              ruleRu: 'Использование Past Simple в историях и диалогах.',
              formula: 'Past Narrative: V2/-ed in statements, didn\'t+V1 in negatives, Did+V1 in questions',
              example: '— What did you do yesterday? — I met my friends and we played football.',
              exampleRu: '— What did you do yesterday? — I met my friends and we played football.',
            },
            exercises: [
              { text: '— Where ___ you yesterday? — I ___ to the zoo.', options: ['were / went', 'was / go', 'did / went'], correct: 0, explanation: 'Where were you / I went.', explanationRu: "Where were you / I went." },
              { text: '— ___ you clean your room? — Yes, I ___ .', options: ['Did / cleaned', 'Did / did', 'Do / did'], correct: 1, explanation: 'Did you / Yes, I did.', explanationRu: "Did you / Yes, I did." },
            ],
          },
          {
            teach: {
              rule: "Muntazam (-ed) va Noto'g'ri (V2) fe'llarni birga ishlatish mashqlari.",
              ruleRu: 'Практика применения правильных (-ed) и неправильных (V2) глаголов вместе.',
              formula: 'Mix: regular (work➔worked) + irregular (see➔saw)',
              example: 'I walked to the station and caught the train.',
              exampleRu: 'I walked to the station and caught the train.',
            },
            exercises: [
              { text: 'She ___ her bag and ___ out of the room.', options: ['took / walked', 'taked / walked', 'took / walk'], correct: 0, explanation: 'take -> took (irregular) / walk -> walked (regular).', explanationRu: "take -> took (неправильный) / walk -> walked (правильный)." },
              { text: 'We ___ the car and ___ home.', options: ['washed / drove', 'wash / drived', 'washed / drive'], correct: 0, explanation: 'wash -> washed / drive -> drove.', explanationRu: "wash -> washed / drive -> drove." },
            ],
          },
          {
            teach: {
              rule: 'Mantiqiy zanjir va voqealar ketma-ketligi (sequence of past events).',
              ruleRu: 'Последовательность событий в прошлом (Sequence of events).',
              formula: 'First event (V2) ➔ then event (V2) ➔ finally event (V2)',
              example: 'First I opened the door, then I saw a cat, and finally I smiled.',
              exampleRu: 'First I opened the door, then I saw a cat, and finally I smiled.',
            },
            exercises: [
              { text: 'He ___ up at 7:00, ___ a cup of coffee, and ___ to work.', options: ['woke / drank / went', 'waked / drinked / goed', 'woke / drink / go'], correct: 0, explanation: 'wake -> woke / drink -> drank / go -> went.', explanationRu: "wake -> woke / drink -> drank / go -> went." },
              { text: 'Select the correct sentence:', options: ['She closed her book, turned off the light, and fell asleep.', 'She closed her book, turn off the light, and fall asleep.'], correct: 0, explanation: 'Barcha fe\'llar o\'tgan zamonda: closed, turned off, fell asleep.', explanationRu: "Все глаголы в прошедшем времени: closed, turned off, fell asleep." },
            ],
          },
          {
            teach: {
              rule: 'Section 12 Past Simple bo\'yicha yakuniy master formula.',
              ruleRu: 'Итоговая главная формула Past Simple.',
              formula: 'Master Past Simple Rule: Statement = V2 / -ed | Negative = didn\'t + V1 | Question = Did + V1 ?',
              example: 'I played. I didn\'t play. Did you play? / I went. I didn\'t go. Did you go?',
              exampleRu: 'I played. I didn\'t play. Did you play? / I went. I didn\'t go. Did you go?',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['Did you understand the lesson?', 'Did you understood the lesson?'], correct: 0, explanation: 'Did + understand (V1).', explanationRu: "Did + understand (V1)." },
              { text: 'Choose the correct sentence:', options: ['I didn\'t forget your birthday.', 'I didn\'t forgot your birthday.'], correct: 0, explanation: "didn't + forget (V1).", explanationRu: "didn't + forget (V1)." },
              { text: 'Select the correct sentence:', options: ['She wrote a book and published it last year.', 'She write a book and publish it last year.'], correct: 0, explanation: 'Past Simple: wrote, published.', explanationRu: "Past Simple: wrote, published." },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Past Simple — muntazam va noto'g'ri fe'llar",
      titleRu: 'Тест раздела: Past Simple — правильные и неправильные глаголы',
      exercises: [
        { text: 'I ___ a great movie yesterday evening.', options: ['watched', 'watch', 'watching'], correct: 0, explanation: 'yesterday -> watched.', explanationRu: "yesterday -> watched." },
        { text: 'Past Simple form of "go":', options: ['went', 'goed', 'goes'], correct: 0, explanation: 'go -> went.', explanationRu: "go -> went." },
        { text: 'Past Simple form of "buy":', options: ['bought', 'buyed', 'buys'], correct: 0, explanation: 'buy -> bought.', explanationRu: "buy -> bought." },
        { text: 'Past Simple form of "study":', options: ['studied', 'studyed', 'studyd'], correct: 0, explanation: 'study -> studied.', explanationRu: "study -> studied." },
        { text: 'We ___ to the cinema last night.', options: ["didn't go", "didn't went", "not go"], correct: 0, explanation: "didn't + go.", explanationRu: "didn't + go." },
        { text: 'She ___ her homework yesterday.', options: ["didn't finish", "didn't finished", "not finish"], correct: 0, explanation: "didn't + finish.", explanationRu: "didn't + finish." },
        { text: '___ you see my phone this morning?', options: ['Did', 'Do', 'Does'], correct: 0, explanation: 'Past question -> Did.', explanationRu: "Вопрос в прошедшем времени -> Did." },
        { text: '— Did they win the game? — Yes, they ___ .', options: ['did', 'do', 'were'], correct: 0, explanation: 'Yes, they did.', explanationRu: "Yes, they did." },
        { text: 'Where ___ you buy this nice bag?', options: ['did', 'do', 'were'], correct: 0, explanation: 'Where + did + buy.', explanationRu: "Where + did + buy." },
        { text: 'Who ___ the window yesterday?', options: ['broke', 'did break', 'breaked'], correct: 0, explanation: 'Who + broke (V2).', explanationRu: "Who + broke (V2)." },
        { text: 'Usually I ___ by bus, but yesterday I ___ by train.', options: ['travel / traveled', 'traveled / travel', 'travel / travel'], correct: 0, explanation: 'Usually -> travel / yesterday -> traveled.', explanationRu: "Usually -> travel / yesterday -> traveled." },
        { text: 'Choose the correct sentence:', options: ['He didn\'t tell me the secret.', 'He didn\'t told me the secret.'], correct: 0, explanation: "didn't + tell.", explanationRu: "didn't + tell." },
        { text: 'Choose the correct sentence:', options: ['They bought a house two years ago.', 'They buyed a house two years ago.'], correct: 0, explanation: 'buy -> bought.', explanationRu: "buy -> bought." },
        { text: 'Select the correct sentence:', options: ['What did you do last weekend?', 'What did you did last weekend?'], correct: 0, explanation: 'did + do (V1).', explanationRu: "did + do (V1)." },
        { text: 'Select the correct sentence:', options: ['I woke up, ate breakfast, and went to work.', 'I waked up, eated breakfast, and goed to work.'], correct: 0, explanation: 'woke, ate, went.', explanationRu: "woke, ate, went." },
      ],
    },
  },
  {
    id: 'sec-past-continuous',
    order: 13,
    title: "Past Continuous — o'tgan davomli zamon",
    titleRu: 'Past Continuous — прошедшее длительное время',
    icon: '⏱️',
    lessons: [
      {
        id: 'sec-past-continuous-l1',
        order: 1,
        title: 'Tasdiq shakllar: "was/were + V-ing"',
        titleRu: 'Утвердительные формы: "was/were + V-ing"',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: "Past Continuous (O'tgan davomli zamon) — o'tmishdagi ma'lum bir vaqtda (masalan, kecha soat 5 da) davom etayotgan harakatlarni ifodalash uchun ishlatiladi.",
              ruleRu: 'Past Continuous используется для действий, происходивших в определенный момент в прошлом.',
              formula: 'Subject + was / were + Verb-ing',
              example: 'I was reading a book at 5 PM yesterday. (Men kecha soat 5 da kitob o\'qiyotgan edim.)',
              exampleRu: 'I was reading a book at 5 PM yesterday. (Я читал книгу вчера в 5 часов.)',
            },
            exercises: [
              { text: 'I ___ a book yesterday at 7 PM.', options: ['was reading', 'were reading', 'readed'], correct: 0, explanation: '"I" bilan "was reading" ishlatiladi.', explanationRu: "С \"I\" используется \"was reading\"." },
              { text: 'They ___ football all afternoon yesterday.', options: ['were playing', 'was playing', 'played'], correct: 0, explanation: '"They" bilan "were playing".', explanationRu: "С \"They\" используется \"were playing\"." },
            ],
          },
          {
            teach: {
              rule: 'Birlik shaxslar bilan "was + V-ing": I was, He was, She was, It was.',
              ruleRu: 'Для единственного числа используется "was + V-ing": I / He / She / It + was + V-ing.',
              formula: 'I / He / She / It + was + Verb-ing',
              example: 'She was sleeping when I came. It was raining at 8 o\'clock.',
              exampleRu: 'She was sleeping when I came. It was raining at 8 o\'clock.',
            },
            exercises: [
              { text: 'He ___ his homework at 9 PM.', options: ['was doing', 'were doing', 'did'], correct: 0, explanation: 'He + was doing.', explanationRu: "He + was doing." },
              { text: 'She ___ TV yesterday evening.', options: ['was watching', 'were watching', 'watches'], correct: 0, explanation: 'She + was watching.', explanationRu: "She + was watching." },
            ],
          },
          {
            teach: {
              rule: 'Ko\'plik shaxslar va "you" bilan "were + V-ing": You were, We were, They were.',
              ruleRu: 'Для множественного числа и "you" используется "were + V-ing": You / We / They + were + V-ing.',
              formula: 'You / We / They + were + Verb-ing',
              example: 'We were cooking dinner at 6 PM. They were dancing at the party.',
              exampleRu: 'We were cooking dinner at 6 PM. They were dancing at the party.',
            },
            exercises: [
              { text: 'We ___ for the bus at 8:00 AM.', options: ['were waiting', 'was waiting', 'waited'], correct: 0, explanation: 'We + were waiting.', explanationRu: "We + were waiting." },
              { text: 'You ___ a movie when I called.', options: ['were watching', 'was watching', 'watched'], correct: 0, explanation: 'You + were watching.', explanationRu: "You + were watching." },
            ],
          },
          {
            teach: {
              rule: '-ing qo\'shish yozilish qoidalari: 1) write ➔ writing (-e tushadi). 2) run ➔ running (oxirgi undosh ikkilanadi). 3) die ➔ dying (-ie ➔ -y).',
              ruleRu: 'Правила добавления -ing: write➔writing, run➔running, die➔dying.',
              formula: 'write ➔ writing  |  run ➔ running  |  swim ➔ swimming',
              example: 'He was writing an email. She was running in the park.',
              exampleRu: 'He was writing an email. She was running in the park.',
            },
            exercises: [
              { text: 'Past Continuous form of "swim" with "I":', options: ['was swimming', 'was swiming', 'were swimming'], correct: 0, explanation: 'swim -> swimming (m ikkilanadi), I -> was swimming.', explanationRu: "swim -> swimming (m удваивается), I -> was swimming." },
              { text: 'Past Continuous form of "write" with "They":', options: ['were writing', 'were writeing', 'was writing'], correct: 0, explanation: 'write -> writing (-e tushadi), They -> were writing.', explanationRu: "write -> writing (-e опускается), They -> were writing." },
            ],
          },
          {
            teach: {
              rule: 'Past Continuous tasdiq shakllarini birlashtiramiz.',
              ruleRu: 'Обобщим все утвердительные формы Past Continuous.',
              formula: 'I/He/She/It WAS + V-ing  |  You/We/They WERE + V-ing',
              example: 'While I was studying, my brother was playing games.',
              exampleRu: 'While I was studying, my brother was playing games.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I was working at 10 AM yesterday.', 'I were working at 10 AM yesterday.'], correct: 0, explanation: 'I + was working.', explanationRu: "I + was working." },
              { text: 'Choose the correct sentence:', options: ['My friends were having lunch when I arrived.', 'My friends was having lunch when I arrived.'], correct: 0, explanation: 'My friends (they) + were having.', explanationRu: "My friends (they) + were having." },
              { text: 'Select the correct sentence:', options: ['The sun was shining all day yesterday.', 'The sun were shining all day yesterday.'], correct: 0, explanation: 'The sun (it) + was shining.', explanationRu: "The sun (it) + was shining." },
            ],
          },
        ],
      },
      {
        id: 'sec-past-continuous-l2',
        order: 2,
        title: 'Inkor shakllar: "wasn\'t / weren\'t + V-ing"',
        titleRu: 'Отрицательные формы: "wasn\'t / weren\'t + V-ing"',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: 'Past Continuous inkor shaklida "was not" ➔ "wasn\'t" va "were not" ➔ "weren\'t" ishlatiladi. Fe\'lga doim "-ing" qo\'shilganicha qoladi!',
              ruleRu: 'Для отрицания используйте "wasn\'t" или "weren\'t". Окончание -ing СОХРАНЯЕТСЯ!',
              formula: 'Subject + wasn\'t / weren\'t + Verb-ing',
              example: 'I wasn\'t sleeping at 11 PM. (Men soat 11 da uxlamayotgan edim.)',
              exampleRu: 'I wasn\'t sleeping at 11 PM. (Я не спал в 11 вечера.)',
            },
            exercises: [
              { text: 'I ___ TV at 8 PM yesterday.', options: ["wasn't watching", "weren't watching", "didn't watching"], correct: 0, explanation: '"I" inkorida: wasn\'t watching.', explanationRu: "В отрицании с \"I\": wasn't watching." },
              { text: 'They ___ football at that time.', options: ["weren't playing", "wasn't playing", "don't playing"], correct: 0, explanation: '"They" inkorida: weren\'t playing.', explanationRu: "В отрицании с \"They\": weren't playing." },
            ],
          },
          {
            teach: {
              rule: 'Birlik shaxslar inkori: I wasn\'t, He wasn\'t, She wasn\'t, It wasn\'t + V-ing.',
              ruleRu: 'Отрицание для единственного числа: I / He / She / It + wasn\'t + V-ing.',
              formula: 'I / He / She / It + wasn\'t + Verb-ing',
              example: 'He wasn\'t driving fast. She wasn\'t listening to music.',
              exampleRu: 'He wasn\'t driving fast. She wasn\'t listening to music.',
            },
            exercises: [
              { text: 'She ___ attention during the lesson.', options: ["wasn't paying", "weren't paying", "not paying"], correct: 0, explanation: 'She + wasn\'t paying.', explanationRu: "She + wasn't paying." },
              { text: 'It ___ at 5 o\'clock yesterday.', options: ["wasn't raining", "weren't raining", "didn't raining"], correct: 0, explanation: 'It + wasn\'t raining.', explanationRu: "It + wasn't raining." },
            ],
          },
          {
            teach: {
              rule: 'Ko\'plik shaxslar inkori: You weren\'t, We weren\'t, They weren\'t + V-ing.',
              ruleRu: 'Отрицание для множественного числа: You / We / They + weren\'t + V-ing.',
              formula: 'You / We / They + weren\'t + Verb-ing',
              example: 'We weren\'t expecting guests. They weren\'t talking loud.',
              exampleRu: 'We weren\'t expecting guests. They weren\'t talking loud.',
            },
            exercises: [
              { text: 'We ___ loud music late at night.', options: ["weren't playing", "wasn't playing", "aren't playing"], correct: 0, explanation: 'We + weren\'t playing.', explanationRu: "We + weren't playing." },
              { text: 'You ___ attention when I spoke.', options: ["weren't paying", "wasn't paying", "don't paying"], correct: 0, explanation: 'You + weren\'t paying.', explanationRu: "You + weren't paying." },
            ],
          },
          {
            teach: {
              rule: 'Eng ko\'p uchraydigan 2 ta xato: 1) wasn\'t sleep ❌ ➔ wasn\'t sleeping ✅  2) didn\'t working ❌ ➔ wasn\'t working ✅.',
              ruleRu: '2 частые ошибки: 1) wasn\'t sleep ❌ ➔ wasn\'t sleeping ✅  2) didn\'t working ❌ ➔ wasn\'t working ✅.',
              formula: 'REMEMBER: wasn\'t / weren\'t + ALWAYS Verb-ing',
              example: 'Correct: He wasn\'t listening. (NOT: He didn\'t listening.)',
              exampleRu: 'Correct: He wasn\'t listening.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I wasn\'t sleeping when you called.', 'I didn\'t sleeping when you called.'], correct: 0, explanation: 'Past Continuous inkorida: wasn\'t sleeping.', explanationRu: "В отрицании Past Continuous: wasn't sleeping." },
              { text: 'Choose the correct sentence:', options: ['They weren\'t working yesterday at 4 PM.', 'They wasn\'t working yesterday at 4 PM.'], correct: 0, explanation: 'They + weren\'t working.', explanationRu: "They + weren't working." },
            ],
          },
          {
            teach: {
              rule: 'Past Continuous inkor shakllarini birlashtiramiz.',
              ruleRu: 'Обобщим все отрицательные формы Past Continuous.',
              formula: 'Subject + wasn\'t / weren\'t + V-ing',
              example: 'It wasn\'t snowing, so we weren\'t wearing heavy coats.',
              exampleRu: 'It wasn\'t snowing, so we weren\'t wearing heavy coats.',
            },
            exercises: [
              { text: 'Select the correct sentence:', options: ['He wasn\'t feeling well yesterday.', 'He weren\'t feeling well yesterday.'], correct: 0, explanation: 'He + wasn\'t feeling.', explanationRu: "He + wasn't feeling." },
              { text: 'Select the correct sentence:', options: ['We weren\'t waiting for you at 5:00.', 'We didn\'t waiting for you at 5:00.'], correct: 0, explanation: 'We + weren\'t waiting.', explanationRu: "We + weren't waiting." },
              { text: 'Choose the correct form: She ___ at that moment.', options: ["wasn't listening", "wasn't listen"], correct: 0, explanation: 'wasn\'t + V-ing: wasn\'t listening.', explanationRu: "wasn't + V-ing: wasn't listening." },
            ],
          },
        ],
      },
      {
        id: 'sec-past-continuous-l3',
        order: 3,
        title: 'Savol shakli: "Was / Were ... + V-ing?"',
        titleRu: 'Вопросительная форма: "Was / Were ... + V-ing?"',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: 'Past Continuous savollarida "Was" yoki "Were" eganing oldiga chiqadi. Fe\'lga "-ing" qo\'shiladi.',
              ruleRu: 'В вопросах "Was" или "Were" ставится перед подлежащим. Глагол идет с -ing.',
              formula: 'Was / Were + Subject + Verb-ing ?',
              example: 'Was he sleeping at 10 PM? (U soat 10 da uxlayotgan edimi?) Were you working?',
              exampleRu: 'Was he sleeping at 10 PM? Were you working?',
            },
            exercises: [
              { text: '___ you sleeping when I called you?', options: ['Were', 'Was', 'Did'], correct: 0, explanation: '"You" savolida "Were" oldinga chiqadi.', explanationRu: "В вопросе с \"You\" выносится вперёд \"Were\"." },
              { text: '___ she reading a book at 5 PM?', options: ['Was', 'Were', 'Did'], correct: 0, explanation: '"She" savolida "Was".', explanationRu: "В вопросе с \"She\": Was." },
            ],
          },
          {
            teach: {
              rule: 'Qisqa javoblar: Yes, I was. / No, I wasn\'t. | Yes, we were. / No, we weren\'t.',
              ruleRu: 'Краткие ответы: Yes, I was / No, I wasn\'t | Yes, we were / No, we weren\'t.',
              formula: 'Yes, + Subject + was/were.  |  No, + Subject + wasn\'t/weren\'t.',
              example: '— Were you studying? — Yes, I was. / No, I wasn\'t.',
              exampleRu: '— Were you studying? — Yes, I was. / No, I wasn\'t.',
            },
            exercises: [
              { text: '— Was it raining yesterday afternoon? — Yes, it ___ .', options: ['was', 'were', 'is'], correct: 0, explanation: 'Yes, it was.', explanationRu: "Yes, it was." },
              { text: '— Were they listening to music? — No, they ___ .', options: ["weren't", "wasn't", "didn't"], correct: 0, explanation: 'No, they weren\'t.', explanationRu: "No, they weren't." },
            ],
          },
          {
            teach: {
              rule: 'Maxsus savollar (Wh- questions): What / Where / Why / Who + Was/Were + Subject + V-ing?',
              ruleRu: 'Специальные вопросы: Wh- word + Was/Were + Subject + V-ing?',
              formula: 'Wh- word + Was / Were + Subject + Verb-ing ?',
              example: 'What were you doing yesterday at 6 PM? Where was he going?',
              exampleRu: 'What were you doing yesterday at 6 PM? Where was he going?',
            },
            exercises: [
              { text: 'What ___ you doing yesterday at this time?', options: ['were', 'was', 'did'], correct: 0, explanation: 'What + were you doing.', explanationRu: "What + were you doing." },
              { text: 'Where ___ she going when you saw her?', options: ['was', 'were', 'did'], correct: 0, explanation: 'Where + was she going.', explanationRu: "Where + was she going." },
            ],
          },
          {
            teach: {
              rule: 'Dialoglarda Past Continuous savollarini qo\'llash amaliyoti.',
              ruleRu: 'Практика использования вопросов Past Continuous в диалогах.',
              formula: 'Dialogue Drill: — What were you doing? — I was V-ing.',
              example: '— What were you doing at 9 PM? — I was doing my homework.',
              exampleRu: '— What were you doing at 9 PM? — I was doing my homework.',
            },
            exercises: [
              { text: '— Why ___ you crying yesterday? — I ___ watching a sad movie.', options: ['were / was', 'was / were', 'did / was'], correct: 0, explanation: 'Why were you / I was watching.', explanationRu: "Why were you / I was watching." },
              { text: '— ___ Tom playing games? — No, he ___ studying.', options: ['Was / was', 'Were / were', 'Did / was'], correct: 0, explanation: 'Was Tom / he was.', explanationRu: "Was Tom / he was." },
            ],
          },
          {
            teach: {
              rule: 'Past Continuous savol shakllarini birlashtiramiz.',
              ruleRu: 'Обобщим все вопросительные формы Past Continuous.',
              formula: 'Was/Were + Subject + V-ing ?  |  Wh- + Was/Were + Subject + V-ing ?',
              example: 'Were you sleeping when the bell rang, and what was your sister doing?',
              exampleRu: 'Were you sleeping when the bell rang, and what was your sister doing?',
            },
            exercises: [
              { text: 'Choose the correct question:', options: ['Were you watching the game at 8:00?', 'Did you watching the game at 8:00?'], correct: 0, explanation: 'Were you watching...', explanationRu: "Were you watching..." },
              { text: 'Choose the correct question:', options: ['What was she doing when you arrived?', 'What did she doing when you arrived?'], correct: 0, explanation: 'What was she doing...', explanationRu: "What was she doing..." },
              { text: 'Select the correct question:', options: ['Why were they driving so fast?', 'Why was they driving so fast?'], correct: 0, explanation: 'Why were they...', explanationRu: "Why were they..." },
            ],
          },
        ],
      },
      {
        id: 'sec-past-continuous-l4',
        order: 4,
        title: '"When" va "While" bilan qo\'llanishi',
        titleRu: 'Использование с "When" и "While"',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: 'O\'tgan zamonda davom etayotgan harakatni (Past Continuous) to\'satdan qisqa harakat (Past Simple) bo\'lganda "WHEN" ishlatiladi.',
              ruleRu: 'Past Continuous + WHEN + Past Simple (длительное действие прерывается кратким).',
              formula: 'Past Continuous + WHEN + Past Simple',
              example: 'I was reading a book when the phone rang. (Telefon chalinganda men kitob o\'qiyotgan edim.)',
              exampleRu: 'I was reading a book when the phone rang.',
            },
            exercises: [
              { text: 'I was sleeping when my friend ___ .', options: ['called', 'was calling', 'calls'], correct: 0, explanation: 'when + Past Simple (called).', explanationRu: "when + Past Simple (called)." },
              { text: 'She was cooking when the lights ___ out.', options: ['went', 'were going', 'go'], correct: 0, explanation: 'when + Past Simple (went).', explanationRu: "when + Past Simple (went)." },
            ],
          },
          {
            teach: {
              rule: '"WHILE" (yo\'l-yo\'lakay / mobaynida) dan keyin ko\'pincha Past Continuous keladi.',
              ruleRu: 'WHILE + Past Continuous, Past Simple (Пока / во время того как...).',
              formula: 'WHILE + Past Continuous , Past Simple',
              example: 'While I was walking in the park, I met my teacher.',
              exampleRu: 'While I was walking in the park, I met my teacher.',
            },
            exercises: [
              { text: 'While we ___ in the garden, it started to rain.', options: ['were working', 'worked', 'are working'], correct: 0, explanation: 'While + Past Continuous (were working).', explanationRu: "While + Past Continuous (were working)." },
              { text: 'While he ___ to school, he saw an accident.', options: ['was walking', 'walked', 'walks'], correct: 0, explanation: 'While + Past Continuous (was walking).', explanationRu: "While + Past Continuous (was walking)." },
            ],
          },
          {
            teach: {
              rule: 'Bir vaqtning o\'zida davom etayotgan ikkita uzun harakat uchun ikkala tomonda ham Past Continuous + WHILE qo\'llanadi.',
              ruleRu: 'Два параллельных длительных действия: Past Continuous + WHILE + Past Continuous.',
              formula: 'Past Continuous + WHILE + Past Continuous',
              example: 'I was studying while my brother was listening to music.',
              exampleRu: 'I was studying while my brother was listening to music.',
            },
            exercises: [
              { text: 'While I was cooking, my sister ___ the table.', options: ['was setting', 'setted', 'set'], correct: 0, explanation: 'Ikki paralel davomli harakat: was setting.', explanationRu: "Два параллельных длительных действия: was setting." },
              { text: 'They were playing games while their parents ___ TV.', options: ['were watching', 'watched', 'watch'], correct: 0, explanation: 'were watching.', explanationRu: "were watching." },
            ],
          },
          {
            teach: {
              rule: '"When" va "While" farqi: WHEN + qisqa harakat (Past Simple) | WHILE + uzun harakat (Past Continuous).',
              ruleRu: 'Различие: WHEN + краткое действие (Past Simple) | WHILE + длительное действие (Past Continuous).',
              formula: 'when + Past Simple (arrived)  |  while + Past Continuous (was studying)',
              example: 'He called me WHEN I was cooking. / WHILE I was cooking, he called me.',
              exampleRu: 'He called me WHEN I was cooking. / WHILE I was cooking, he called me.',
            },
            exercises: [
              { text: '___ I was walking home, it started to snow.', options: ['While', 'When', 'During'], correct: 0, explanation: 'Uzun harakat oldidan: While.', explanationRu: "Перед длительным действием: While." },
              { text: 'She was driving ___ she saw a cat on the road.', options: ['when', 'while', 'for'], correct: 0, explanation: 'Qisqa kutilmagan voqea oldidan: when.', explanationRu: "Перед кратким неожиданным событием: when." },
            ],
          },
          {
            teach: {
              rule: '"When" va "While" qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим правила работы с When и While.',
              formula: 'Past Cont + WHEN + Past Simple  |  WHILE + Past Cont, Past Simple',
              example: 'While we were sleeping, someone knocked when the night was quiet.',
              exampleRu: 'While we were sleeping, someone knocked when the night was quiet.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I was taking a shower when the phone rang.', 'I took a shower while the phone was ringing.'], correct: 0, explanation: 'was taking a shower when the phone rang.', explanationRu: "was taking a shower when the phone rang." },
              { text: 'Choose the correct sentence:', options: ['While she was reading, her dog barked.', 'When she readed, her dog was barking.'], correct: 0, explanation: 'While she was reading...', explanationRu: "While she was reading..." },
              { text: 'Select the correct sentence:', options: ['We were watching a movie when the power went off.', 'We watched a movie while the power went off.'], correct: 0, explanation: 'were watching ... when ... went off.', explanationRu: "were watching ... when ... went off." },
            ],
          },
        ],
      },
      {
        id: 'sec-past-continuous-l5',
        order: 5,
        title: 'Past Simple vs Past Continuous Taqqoslash',
        titleRu: 'Сравнение Past Simple и Past Continuous',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: 'Tugallangan muayyan o\'tgan harakat ➔ Past Simple (I wrote a letter). O\'tmishdagi jarayon/davomiylik ➔ Past Continuous (I was writing a letter).',
              ruleRu: 'Завершенное действие ➔ Past Simple | Процесс в прошлом ➔ Past Continuous.',
              formula: 'Past Simple (Completed) vs Past Continuous (Process/Duration)',
              example: 'Yesterday I painted a wall. (Bo\'yab bo\'ldim.) Yesterday I was painting a wall. (Bo\'yayotgan edim.)',
              exampleRu: 'Yesterday I painted a wall. Yesterday I was painting a wall.',
            },
            exercises: [
              { text: 'At 3 PM yesterday, I ___ in the library.', options: ['was studying', 'studied', 'study'], correct: 0, explanation: 'Muayyan soatda jarayon: was studying.', explanationRu: "Процесс в определённый час: was studying." },
              { text: 'Yesterday I ___ my homework and went to bed.', options: ['finished', 'was finishing', 'finishes'], correct: 0, explanation: 'Tugallangan ketma-ket harakat: finished.', explanationRu: "Завершённое последовательное действие: finished." },
            ],
          },
          {
            teach: {
              rule: 'Vaqt ko\'rsatkichlari: yesterday at 5 PM, all day yesterday, at that moment ➔ Past Continuous | yesterday, 2 days ago, last night ➔ Past Simple.',
              ruleRu: 'Маркеры: yesterday at 5 PM, all evening (Past Continuous) vs yesterday, ago (Past Simple).',
              formula: 'Specific time point / duration ➔ Past Continuous',
              example: 'I was working all day yesterday.',
              exampleRu: 'I was working all day yesterday.',
            },
            exercises: [
              { text: 'What were you doing all evening yesterday? — I ___ TV.', options: ['was watching', 'watched', 'watch'], correct: 0, explanation: 'all evening -> was watching.', explanationRu: "all evening -> was watching." },
              { text: 'I ___ a new bike two days ago.', options: ['bought', 'was buying', 'buys'], correct: 0, explanation: 'two days ago -> bought.', explanationRu: "two days ago -> bought." },
            ],
          },
          {
            teach: {
              rule: 'Holat fe\'llari (Stative verbs: know, love, want, understand, like, remember) odatda davomli (-ing) zamonlarda ishlatilmaydi!',
              ruleRu: 'Глаголы состояния (know, want, like...) OБЫЧНО НЕ используются в -ing!',
              formula: 'Stative Verbs (know, want, like...) ➔ Past Simple ONLY (knew, wanted, liked)',
              example: 'I knew the answer. (I was knowing EMAS!)',
              exampleRu: 'I knew the answer. (НЕ I was knowing!)',
            },
            exercises: [
              { text: 'I ___ the truth yesterday.', options: ['knew', 'was knowing', 'knowed'], correct: 0, explanation: 'know - holat fe\'li, -ing olmaydi: knew.', explanationRu: "know — глагол состояния, не берёт -ing: knew." },
              { text: 'She ___ to go home early.', options: ['wanted', 'was wanting', 'wants'], correct: 0, explanation: 'want - holat fe\'li: wanted.', explanationRu: "want — глагол состояния: wanted." },
            ],
          },
          {
            teach: {
              rule: 'Hikoyalarda zamin (background) yaratish: Past Continuous fon (zamin) uchun, Past Simple esa asosiy tezkor voqealar uchun ishlatiladi.',
              ruleRu: 'В историях: Past Continuous создает фон (background), Past Simple — основные события.',
              formula: 'Background setting (Past Cont) ➔ Main events (Past Simple)',
              example: 'The sun was shining and birds were singing. Suddenly, a man opened the door.',
              exampleRu: 'The sun was shining and birds were singing. Suddenly, a man opened the door.',
            },
            exercises: [
              { text: 'The wind ___ and the rain ___ when we left the house.', options: ['was blowing / was falling', 'blew / fell', 'is blowing / is falling'], correct: 0, explanation: 'Fon (background): was blowing / was falling.', explanationRu: "Фон (background): was blowing / was falling." },
              { text: 'Select the correct sentence:', options: ['While I was walking, I lost my wallet.', 'While I walked, I was losing my wallet.'], correct: 0, explanation: 'Fon: was walking / Asosiy voqea: lost.', explanationRu: "Фон: was walking / Основное событие: lost." },
            ],
          },
          {
            teach: {
              rule: 'Past Simple va Past Continuous farqini birlashtiramiz.',
              ruleRu: 'Обобщим различие между Past Simple и Past Continuous.',
              formula: 'Past Cont (was/were V-ing) = ongoing  |  Past Simple (V2/-ed) = completed',
              example: 'I was sleeping at midnight, but I woke up at 7 AM.',
              exampleRu: 'I was sleeping at midnight, but I woke up at 7 AM.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['He was writing a letter when his laptop died.', 'He wrote a letter when his laptop was dying.'], correct: 0, explanation: 'was writing ... when ... died.', explanationRu: "was writing ... when ... died." },
              { text: 'Choose the correct sentence:', options: ['We didn\'t know about the party.', 'We weren\'t knowing about the party.'], correct: 0, explanation: 'know - holat fe\'li: didn\'t know.', explanationRu: "know — глагол состояния: didn't know." },
              { text: 'Select the correct sentence:', options: ['They were playing chess at 4 PM yesterday.', 'They played chess at 4 PM yesterday.'], correct: 0, explanation: 'at 4 PM yesterday -> were playing.', explanationRu: "at 4 PM yesterday -> were playing." },
            ],
          },
        ],
      },
      {
        id: 'sec-past-continuous-l6',
        order: 6,
        title: 'Aralash amaliyot va Xatolarni tuzatish (Past Continuous)',
        titleRu: 'Смешанная практика и Исправление ошибок (Past Continuous)',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: 'Eng ko\'p uchraydigan 3 ta xato: 1) He was sleep ❌ ➔ He was sleeping ✅  2) While I walked ❌ ➔ While I was walking ✅  3) I was knowing ❌ ➔ I knew ✅.',
              ruleRu: '3 частые ошибки: 1) was sleep ❌ ➔ was sleeping ✅  2) While I walked ❌ ➔ While I was walking ✅  3) was knowing ❌ ➔ knew ✅.',
              formula: 'Check list: 1) was/were + V-ing | 2) while + Past Cont | 3) Stative verb = Past Simple',
              example: 'I was sleeping. While I was walking. I knew the truth.',
              exampleRu: 'I was sleeping. While I was walking. I knew the truth.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I was reading when you called.', 'I was read when you called.'], correct: 0, explanation: 'was + V-ing: was reading.', explanationRu: "was + V-ing: was reading." },
              { text: 'Choose the correct sentence:', options: ['While they were eating, someone knocked.', 'While they ate, someone was knocking.'], correct: 0, explanation: 'While + were eating.', explanationRu: "While + were eating." },
            ],
          },
          {
            teach: {
              rule: 'Past Continuous bilan qisqa hikoyalarni o\'qish va tushunish mashqlari.',
              ruleRu: 'Практика чтения и понимания коротких историй в Past Continuous.',
              formula: 'Narrative context: combine continuous background and simple actions',
              example: 'At 8 PM, Tom was studying, his mother was cooking, and his father was watching TV.',
              exampleRu: 'At 8 PM, Tom was studying, his mother was cooking, and his father was watching TV.',
            },
            exercises: [
              { text: 'Yesterday at 3 PM, my sister ___ music and I ___ a book.', options: ['was listening to / was reading', 'listened to / readed', 'were listening to / were reading'], correct: 0, explanation: 'sister was listening / I was reading.', explanationRu: "sister was listening / I was reading." },
              { text: 'Select the correct sentence:', options: ['What were you doing when the fire started?', 'What did you doing when the fire started?'], correct: 0, explanation: 'What were you doing...', explanationRu: "What were you doing..." },
            ],
          },
          {
            teach: {
              rule: 'Past Simple va Past Continuous shakllarini bitta gapda to\'g\'ri joylashtirish mashqlari.',
              ruleRu: 'Упражнения на правильную расстановку времен в одном предложении.',
              formula: 'Long action = was/were V-ing | Short interrupt = V2/-ed',
              example: 'The snow was falling heavily when we arrived at the chalet.',
              exampleRu: 'The snow was falling heavily when we arrived at the chalet.',
            },
            exercises: [
              { text: 'She ___ her leg while she ___ on ice.', options: ['broke / was skating', 'was breaking / skated', 'broke / skated'], correct: 0, explanation: 'broke (short) / was skating (long).', explanationRu: "broke (краткое) / was skating (длительное)." },
              { text: 'The phone ___ while I ___ a shower.', options: ['rang / was taking', 'was ringing / took', 'rang / took'], correct: 0, explanation: 'rang (short) / was taking (long).', explanationRu: "rang (краткое) / was taking (длительное)." },
            ],
          },
          {
            teach: {
              rule: 'Mantiqiy dialoglar va savol-javob mashqlari.',
              ruleRu: 'Диалоги и построение пар вопрос-ответ.',
              formula: 'Q: What were you V-ing when X happened? ➔ A: I was V-ing.',
              example: '— What were you doing when I saw you? — I was running to catch the bus.',
              exampleRu: '— What were you doing when I saw you? — I was running to catch the bus.',
            },
            exercises: [
              { text: '— Were you sleeping at 11 PM? — No, I ___ a film.', options: ['was watching', 'watched', 'am watching'], correct: 0, explanation: 'I was watching.', explanationRu: "I was watching." },
              { text: '— Why was he running? — Because he ___ late for the flight.', options: ['was running', 'was being', 'was'], correct: 2, explanation: 'be -> was.', explanationRu: "be -> was." },
            ],
          },
          {
            teach: {
              rule: 'Section 13 Past Continuous bo\'yicha yakuniy master formula.',
              ruleRu: 'Итоговая главная формула Past Continuous.',
              formula: 'Master Past Continuous Rule: Subject + was/were + V-ing | Negative: wasn\'t/weren\'t + V-ing | Question: Was/Were + Subject + V-ing ?',
              example: 'I was working. I wasn\'t working. Were you working?',
              exampleRu: 'I was working. I wasn\'t working. Were you working?',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['They were walking home when it started to rain.', 'They were walk home when it started to rain.'], correct: 0, explanation: 'were walking.', explanationRu: "were walking." },
              { text: 'Choose the correct sentence:', options: ['What were you doing yesterday at 5 PM?', 'What was you doing yesterday at 5 PM?'], correct: 0, explanation: 'What were you doing...', explanationRu: "What were you doing..." },
              { text: 'Select the correct sentence:', options: ['She wasn\'t sleeping when I called her.', 'She wasn\'t slept when I called her.'], correct: 0, explanation: 'wasn\'t sleeping.', explanationRu: "wasn't sleeping." },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Past Continuous — o'tgan davomli zamon",
      titleRu: 'Тест раздела: Past Continuous — прошедшее длительное время',
      exercises: [
        { text: 'I ___ a book yesterday at 8 PM.', options: ['was reading', 'were reading', 'readed'], correct: 0, explanation: 'I + was reading.', explanationRu: "I + was reading." },
        { text: 'They ___ football when it started to rain.', options: ['were playing', 'was playing', 'played'], correct: 0, explanation: 'They + were playing.', explanationRu: "They + were playing." },
        { text: 'She ___ TV when I arrived.', options: ["wasn't watching", "weren't watching", "didn't watching"], correct: 0, explanation: 'She + wasn\'t watching.', explanationRu: "She + wasn't watching." },
        { text: 'We ___ for the exam all day yesterday.', options: ['were studying', 'was studying', 'studied'], correct: 0, explanation: 'We + were studying.', explanationRu: "We + were studying." },
        { text: '___ you sleeping when I called?', options: ['Were', 'Was', 'Did'], correct: 0, explanation: 'Were you sleeping...', explanationRu: "Were you sleeping..." },
        { text: '___ it raining at 6 o\'clock this morning?', options: ['Was', 'Were', 'Did'], correct: 0, explanation: 'Was it raining...', explanationRu: "Was it raining..." },
        { text: 'What ___ she doing yesterday afternoon?', options: ['was', 'were', 'did'], correct: 0, explanation: 'What was she doing...', explanationRu: "What was she doing..." },
        { text: 'Where ___ they going when you met them?', options: ['were', 'was', 'did'], correct: 0, explanation: 'Where were they going...', explanationRu: "Where were they going..." },
        { text: 'I was reading a book ___ the phone rang.', options: ['when', 'while', 'during'], correct: 0, explanation: 'when + Past Simple.', explanationRu: "when + Past Simple." },
        { text: '___ I was walking home, I saw a puppy.', options: ['While', 'When', 'Since'], correct: 0, explanation: 'While + Past Continuous.', explanationRu: "While + Past Continuous." },
        { text: 'She was cooking while her husband ___ the room.', options: ['was cleaning', 'cleaned', 'cleans'], correct: 0, explanation: 'was cleaning (parallel action).', explanationRu: "was cleaning (параллельное действие)." },
        { text: 'I ___ the answer to your question yesterday.', options: ['knew', 'was knowing', 'knowed'], correct: 0, explanation: 'know - holat fe\'li: knew.', explanationRu: "know — глагол состояния: knew." },
        { text: 'Choose the correct sentence:', options: ['He wasn\'t driving fast when the accident happened.', 'He didn\'t driving fast when the accident happened.'], correct: 0, explanation: 'wasn\'t driving.', explanationRu: "wasn't driving." },
        { text: 'Choose the correct sentence:', options: ['While we were sleeping, someone knocked on the door.', 'While we slept, someone was knocking on the door.'], correct: 0, explanation: 'While we were sleeping...', explanationRu: "While we were sleeping..." },
        { text: 'Select the correct sentence:', options: ['What were you doing yesterday at 10 PM?', 'What did you doing yesterday at 10 PM?'], correct: 0, explanation: 'What were you doing...', explanationRu: "What were you doing..." },
      ],
    },
  },
  {
    id: 'sec-future-will-goingto',
    order: 14,
    title: 'Future: "going to" va "will"',
    titleRu: 'Будущее время: "going to" и "will"',
    icon: '🚀',
    lessons: [
      {
        id: 'sec-future-will-goingto-l1',
        order: 1,
        title: 'be going to (Rejalar va Alomatlar)',
        titleRu: 'be going to (Планы и Очевидные признаки)',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: '"be going to" iborasi kelajakda bajarish rejalashtirilgan niyatlar va ko\'rinib turgan alomatlar (evidence) uchun ishlatiladi.',
              ruleRu: '"be going to" используется для заранее запланированных намерений и очевидных предсказаний.',
              formula: 'Subject + am / is / are + going to + Verb1',
              example: 'I am going to study English tonight. (Men bugun kechqurun ingliz tilini o\'rganmoqchiman.)',
              exampleRu: 'I am going to study English tonight. (Я собираюсь учить английский сегодня вечером.)',
            },
            exercises: [
              { text: 'I ___ buy a new laptop next month. I saved money for it.', options: ['am going to', 'will', 'go to'], correct: 0, explanation: 'Oldindan o\'ylangan reja: am going to.', explanationRu: "Заранее продуманный план: am going to." },
              { text: 'She ___ visit her grandmother this weekend.', options: ['is going to', 'are going to', 'will to'], correct: 0, explanation: 'She + is going to.', explanationRu: "She + is going to." },
            ],
          },
          {
            teach: {
              rule: 'Gapda hozirgi vaziyatda alomat/isbot (evidence) bo\'lsa "be going to" ishlatiladi.',
              ruleRu: 'Если есть очевидный признак в настоящем — используйте "be going to".',
              formula: 'Look at [Evidence]! ➔ Subject + am/is/are + going to + V1',
              example: 'Look at those dark clouds! It is going to rain. (Qora bulutlarga qara! Yombir yog\'ayotir.)',
              exampleRu: 'Look at those dark clouds! It is going to rain.',
            },
            exercises: [
              { text: 'Look at the sky! It ___ rain.', options: ['is going to', 'will', 'is raining'], correct: 0, explanation: 'Qora bulutlar — alomat: is going to rain.', explanationRu: "Тёмные тучи — признак: is going to rain." },
              { text: 'Be careful! You ___ drop that glass!', options: ['are going to', 'will', 'going to'], correct: 0, explanation: 'Hozirgi xavf/alomat: are going to drop.', explanationRu: "Явный признак сейчас: are going to drop." },
            ],
          },
          {
            teach: {
              rule: 'Inkor shakl: am not / is not (isn\'t) / are not (aren\'t) + going to + V1.',
              ruleRu: 'Отрицание: am/is/are + not + going to + V1.',
              formula: 'Subject + am not / isn\'t / aren\'t + going to + V1',
              example: 'I am not going to buy that coat. He isn\'t going to work tomorrow.',
              exampleRu: 'I am not going to buy that coat. He isn\'t going to work tomorrow.',
            },
            exercises: [
              { text: 'He ___ sell his car. He changed his mind.', options: ["isn't going to", "won't to", "not going to"], correct: 0, explanation: 'He + isn\'t going to.', explanationRu: "He + isn't going to." },
              { text: 'We ___ stay in a hotel. We booked an apartment.', options: ["aren't going to", "isn't going to", "won't going to"], correct: 0, explanation: 'We + aren\'t going to.', explanationRu: "We + aren't going to." },
            ],
          },
          {
            teach: {
              rule: 'Savol shakli: Am / Is / Are + Subject + going to + V1 ?',
              ruleRu: 'Вопрос: Am/Is/Are + Subject + going to + V1 ?',
              formula: 'Am / Is / Are + Subject + going to + V1 ?',
              example: 'Are you going to attend the party? Is she going to move to London?',
              exampleRu: 'Are you going to attend the party? Is she going to move to London?',
            },
            exercises: [
              { text: '___ you going to travel this summer?', options: ['Are', 'Is', 'Will'], correct: 0, explanation: 'You savolida: Are you going to...', explanationRu: "В вопросе с You: Are you going to..." },
              { text: '___ he going to apply for that job?', options: ['Is', 'Are', 'Does'], correct: 0, explanation: 'He savolida: Is he going to...', explanationRu: "В вопросе с He: Is he going to..." },
            ],
          },
          {
            teach: {
              rule: '"be going to" iborasi bo\'yicha bilganlarimizni birlashtiramiz.',
              ruleRu: 'Обобщим все знания о "be going to".',
              formula: 'Plan / Evidence ➔ am/is/are + going to + V1',
              example: 'I am going to cook dinner because I bought all the vegetables.',
              exampleRu: 'I am going to cook dinner because I bought all the vegetables.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['They are going to build a new bridge next year.', 'They will to build a new bridge next year.'], correct: 0, explanation: 'Reja: are going to build.', explanationRu: "План: are going to build." },
              { text: 'Choose the correct sentence:', options: ['Is she going to start her course tomorrow?', 'Does she going to start her course tomorrow?'], correct: 0, explanation: 'Is she going to...', explanationRu: "Is she going to..." },
              { text: 'Select the correct sentence:', options: ['I am not going to waste my time.', 'I not am going to waste my time.'], correct: 0, explanation: 'I am not going to...', explanationRu: "I am not going to..." },
            ],
          },
        ],
      },
      {
        id: 'sec-future-will-goingto-l2',
        order: 2,
        title: 'will (Kutilmagan qarorlar va Va\'dalar)',
        titleRu: 'will (Спонтанные решения и Обещания)',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: '"will" kelasi zamon fe\'li — suhbat paytida qilingan kutilmagan (spontaneous) qarorlar va va\'dalar uchun ishlatiladi. Fe\'l o\'zgarmaydi (V1).',
              ruleRu: '"will" используется для спонтанных решений (принятых в момент речи), обещаний и предложений помощи.',
              formula: 'Subject + will + Verb1',
              example: 'The phone is ringing. — I will answer it! (Telefon chalinyapti. — Men javob beraman!)',
              exampleRu: 'The phone is ringing. — I will answer it!',
            },
            exercises: [
              { text: '— It is cold in here. — I ___ close the window.', options: ['will', 'am going to', 'am closing'], correct: 0, explanation: 'Shu zahoti kutilmagan qaror: I will close.', explanationRu: "Спонтанное решение прямо сейчас: I will close." },
              { text: '— I don\'t have money. — Don\'t worry, I ___ pay for you.', options: ['will', 'am going to', 'going to'], correct: 0, explanation: 'Taklif/yordam: I will pay.', explanationRu: "Предложение помощи: I will pay." },
            ],
          },
          {
            teach: {
              rule: 'Va\'da (promises), takliflar (offers) va iltimoslar uchun "will" ishlatiladi.',
              ruleRu: 'Для обещаний (promises) и предложений (offers) всегда используется "will".',
              formula: 'I promise ➔ I will + V1  |  I offer ➔ I will + V1',
              example: 'I promise I will call you as soon as I arrive.',
              exampleRu: 'I promise I will call you as soon as I arrive.',
            },
            exercises: [
              { text: 'I promise I ___ tell anyone your secret.', options: ["won't", "am not going to", "don't"], correct: 0, explanation: 'Va\'da berish: I won\'t tell (will not).', explanationRu: "Обещание: I won't tell (will not)." },
              { text: 'Don\'t worry, I ___ help you with your homework.', options: ['will', 'am going to', 'going to'], correct: 0, explanation: 'Yordam berish va\'dasi: I will help.', explanationRu: "Обещание помочь: I will help." },
            ],
          },
          {
            teach: {
              rule: 'Fikr, ishonch va shaxsiy tahminlar (I think, I believe, I hope, probably) bilan "will" keladi.',
              ruleRu: 'С глаголами мнения (I think, I hope, probably) используется "will".',
              formula: 'I think / I hope / Probably ➔ Subject + will + V1',
              example: 'I think it will be sunny tomorrow. I hope you will pass the exam.',
              exampleRu: 'I think it will be sunny tomorrow. I hope you will pass the exam.',
            },
            exercises: [
              { text: 'I think our team ___ win the match.', options: ['will', 'is going to', 'is winning'], correct: 0, explanation: 'I think -> will win.', explanationRu: "I think -> will win." },
              { text: 'I hope she ___ feel better soon.', options: ['will', 'is going to', 'goes to'], correct: 0, explanation: 'I hope -> will.', explanationRu: "I hope -> will." },
            ],
          },
          {
            teach: {
              rule: '"will" qisqartmasi: \'ll (I\'ll, you\'ll, he\'ll, she\'ll, we\'ll, they\'ll).',
              ruleRu: 'Сокращение "will": \'ll (I\'ll, you\'ll, he\'ll, she\'ll, we\'ll, they\'ll).',
              formula: 'Subject + \'ll + Verb1',
              example: 'I\'ll see you tomorrow. He\'ll be back soon.',
              exampleRu: 'I\'ll see you tomorrow. He\'ll be back soon.',
            },
            exercises: [
              { text: 'Choose the contraction of "I will":', options: ["I'll", "I'w", "Iw'll"], correct: 0, explanation: 'I will -> I\'ll.', explanationRu: "I will -> I'll." },
              { text: '___ meet you at the cafe at 5:00.', options: ["We'll", "We'going to", "We'will"], correct: 0, explanation: 'We will -> We\'ll.', explanationRu: "We will -> We'll." },
            ],
          },
          {
            teach: {
              rule: '"will" fe\'li bo\'yicha bilganlarimizni birlashtiramiz.',
              ruleRu: 'Обобщим все случаи использования "will".',
              formula: 'Instant decision / Promise / Opinion (think) ➔ will + V1',
              example: 'I\'ll help you carry those bags because they look heavy.',
              exampleRu: 'I\'ll help you carry those bags because they look heavy.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I think he will succeed in business.', 'I think he is going to succeed in business.'], correct: 0, explanation: 'I think + will.', explanationRu: "I think + will." },
              { text: 'Choose the correct sentence:', options: ['I\'ll call you later tonight.', 'I\'ll to call you later tonight.'], correct: 0, explanation: 'I\'ll call (to siz).', explanationRu: "I'll call (без to)." },
              { text: 'Select the correct sentence:', options: ['Wait! I\'ll open the door for you.', 'Wait! I am going to open the door for you.'], correct: 0, explanation: 'Spontan qaror: I\'ll open.', explanationRu: "Спонтанное решение: I'll open." },
            ],
          },
        ],
      },
      {
        id: 'sec-future-will-goingto-l3',
        order: 3,
        title: 'will ning inkor ("won\'t") va savol shakli',
        titleRu: 'Отрицание ("won\'t") и вопрос с "will"',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: '"will not" ning qisqartmasi "won\'t" /woʊnt/. Undan keyin ham fe\'l bosh (V1) shaklda bo\'ladi.',
              ruleRu: 'Сокращение от "will not" — "won\'t". После него глагол идет в форме V1.',
              formula: 'Subject + won\'t (will not) + Verb1',
              example: 'I won\'t tell your secret to anyone. (Men siringni hech kimga aytmayman.)',
              exampleRu: 'I won\'t tell your secret to anyone.',
            },
            exercises: [
              { text: 'He ___ come to the party tonight. He is sick.', options: ["won't", "doesn't going to", "isn't will"], correct: 0, explanation: 'will not -> won\'t.', explanationRu: "will not -> won't." },
              { text: 'I ___ forget your help.', options: ["won't", "not will", "won't to"], correct: 0, explanation: 'won\'t + V1 (forget).', explanationRu: "won't + V1 (forget)." },
            ],
          },
          {
            teach: {
              rule: 'Savol shaklida "Will" eganing oldiga o\'tadi: Will + Subject + V1 ?',
              ruleRu: 'В вопросе "Will" ставится перед подлежащим: Will + Subject + V1 ?',
              formula: 'Will + Subject + Verb1 ?',
              example: 'Will you help me with this box? Will they come tomorrow?',
              exampleRu: 'Will you help me with this box? Will they come tomorrow?',
            },
            exercises: [
              { text: '___ you pass me the salt, please?', options: ['Will', 'Are', 'Do'], correct: 0, explanation: 'Iltimos/so\'rov: Will you pass...', explanationRu: "Просьба: Will you pass..." },
              { text: '___ it rain tomorrow?', options: ['Will', 'Is', 'Does'], correct: 0, explanation: 'Will it rain...', explanationRu: "Will it rain..." },
            ],
          },
          {
            teach: {
              rule: 'Qisqa javoblar: Yes, I will. / No, I won\'t.',
              ruleRu: 'Краткие ответы: Yes, I will. / No, I won\'t.',
              formula: 'Yes, + Subject + will.  |  No, + Subject + won\'t.',
              example: '— Will you come tomorrow? — Yes, I will. / No, I won\'t.',
              exampleRu: '— Will you come tomorrow? — Yes, I will. / No, I won\'t.',
            },
            exercises: [
              { text: '— Will she be at home tonight? — Yes, she ___ .', options: ['will', 'is', 'does'], correct: 0, explanation: 'Yes, she will.', explanationRu: "Yes, she will." },
              { text: '— Will they arrive on time? — No, they ___ .', options: ["won't", "aren't", "don't"], correct: 0, explanation: 'No, they won\'t.', explanationRu: "No, they won't." },
            ],
          },
          {
            teach: {
              rule: 'Maxsus savollar (Wh- questions): Where / What / When / Who / Why + will + subject + V1?',
              ruleRu: 'Специальные вопросы: Wh- word + will + Subject + V1?',
              formula: 'Wh- word + will + Subject + Verb1 ?',
              example: 'Where will you live in the future? What will you do tomorrow?',
              exampleRu: 'Where will you live in the future? What will you do tomorrow?',
            },
            exercises: [
              { text: 'Where ___ you go after school?', options: ['will', 'are', 'do'], correct: 0, explanation: 'Where + will + you + go.', explanationRu: "Where + will + you + go." },
              { text: 'What ___ happen next?', options: ['will', 'is', 'does'], correct: 0, explanation: 'What + will + happen.', explanationRu: "What + will + happen." },
            ],
          },
          {
            teach: {
              rule: '"won\'t" va "Will...?" shakllarini birlashtiramiz.',
              ruleRu: 'Обобщим все формы "won\'t" и вопросы с "will".',
              formula: 'Statement: will V1 | Negative: won\'t V1 | Question: Will S V1?',
              example: 'I won\'t be late, and will you wait for me?',
              exampleRu: 'I won\'t be late, and will you wait for me?',
            },
            exercises: [
              { text: 'Choose the correct question:', options: ['Will you come to my birthday party?', 'Will you to come to my birthday party?'], correct: 0, explanation: 'Will + V1 (to siz).', explanationRu: "Will + V1 (без to)." },
              { text: 'Choose the correct sentence:', options: ['She won\'t agree to this plan.', 'She won\'t agrees to this plan.'], correct: 0, explanation: 'won\'t + V1 (agree).', explanationRu: "won't + V1 (agree)." },
              { text: 'Select the correct sentence:', options: ['When will the movie start?', 'When the movie will start?'], correct: 0, explanation: 'When will the movie start?', explanationRu: "When will the movie start?" },
            ],
          },
        ],
      },
      {
        id: 'sec-future-will-goingto-l4',
        order: 4,
        title: '"be going to" vs "will" Farqi (Taqqoslash)',
        titleRu: 'Различие "be going to" и "will"',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: 'Qaror qabul qilish vaqti: Oldindan o\'ylangan REJA ➔ be going to | Suhbat paytidagi KUTILMAGAN QAROR ➔ will.',
              ruleRu: 'Время принятия решения: Заранее ➔ be going to | В момент речи ➔ will.',
              formula: 'Prior plan = be going to  |  Instant decision = will',
              example: 'I bought flour because I am going to bake a cake. / — There is no milk! — Oh, I will buy some!',
              exampleRu: 'I am going to bake (reja) vs I will buy (kutilmagan).',
            },
            exercises: [
              { text: '— Why did you buy sugar? — Because I ___ make jam.', options: ['am going to', 'will', 'go to'], correct: 0, explanation: 'Oldindan reja: am going to.', explanationRu: "Заранее продуманный план: am going to." },
              { text: '— I can\'t carry this bag. — Don\'t worry, I ___ help you!', options: ['will', 'am going to', 'going to'], correct: 0, explanation: 'Shu zahoti kutilmagan taklif: will help.', explanationRu: "Спонтанное предложение прямо сейчас: will help." },
            ],
          },
          {
            teach: {
              rule: 'Bashorat asosi: Hozirgi ko\'rinib turgan ALOMAT ➔ be going to | Shaxsiy FIKR (I think) ➔ will.',
              ruleRu: 'Основание предсказания: Очевидный факт/признак ➔ be going to | Личное мнение ➔ will.',
              formula: 'Evidence now = be going to  |  Personal opinion (think) = will',
              example: 'Look at the timer! It is going to explode. / I think robots will do everything in 2050.',
              exampleRu: 'Evidence ➔ going to / Opinion ➔ will.',
            },
            exercises: [
              { text: 'Look at that runner! He ___ win the race.', options: ['is going to', 'will', 'wins'], correct: 0, explanation: 'Ko\'rinib turgan alomat (oldinda ketmoqda): is going to.', explanationRu: "Явный видимый признак (идёт впереди): is going to." },
              { text: 'I think people ___ live on Mars one day.', options: ['will', 'are going to', 'going to'], correct: 0, explanation: 'I think -> will.', explanationRu: "I think -> will." },
            ],
          },
          {
            teach: {
              rule: 'Va\'dalar (promises), takliflar (offers), tahdidlar (threats) va so\'rovlar (requests) har doim "WILL" bilan bo\'ladi.',
              ruleRu: 'Обещания, предложения помощи и просьбы ВСЕГДА идут с "WILL".',
              formula: 'Promise / Offer / Request ➔ WILL ONLY',
              example: 'I will help you. / Will you open the door? / I won\'t tell anyone.',
              exampleRu: 'I will help you. / Will you open the door?',
            },
            exercises: [
              { text: 'I promise I ___ be late again.', options: ["won't", "am not going to", "don't"], correct: 0, explanation: 'Va\'da: won\'t.', explanationRu: "Обещание: won't." },
              { text: '___ you please turn off the light?', options: ['Will', 'Are going to', 'Do'], correct: 0, explanation: 'Iltimos/so\'rov: Will you...', explanationRu: "Просьба: Will you..." },
            ],
          },
          {
            teach: {
              rule: 'Dialoglarda "be going to" va "will" ni to\'g\'ri tanlash mashqlari.',
              ruleRu: 'Практика выбора между be going to и will в диалогах.',
              formula: 'Read context ➔ Check: Plan/Evidence (going to) OR Instant/Promise/Opinion (will)',
              example: 'A: Are you going to the party? B: Yes, I am going to wear my new dress. / A: Oh no, I lost my keys! B: I\'ll help you find them.',
              exampleRu: 'Context determines going to vs will.',
            },
            exercises: [
              { text: '— What are your plans for tomorrow? — I ___ visit my dentist.', options: ['am going to', 'will', 'going to'], correct: 0, explanation: 'Reja: am going to.', explanationRu: "План: am going to." },
              { text: '— Someone is at the door. — I ___ see who it is.', options: ['will', 'am going to', 'go to'], correct: 0, explanation: 'Kutilmagan qaror: will see.', explanationRu: "Спонтанное решение: will see." },
            ],
          },
          {
            teach: {
              rule: '"be going to" vs "will" taqqoslamasini birlashtiramiz.',
              ruleRu: 'Обобщим все различия между be going to и will.',
              formula: 'going to (reja, alomat) vs will (tezkor qaror, va\'da, think)',
              example: 'I am going to study medicine (reja), and I think I will be a good doctor (fikr).',
              exampleRu: 'I am going to study medicine, and I think I will be a good doctor.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I am going to buy a car next month because I saved money.', 'I will buy a car next month because I saved money.'], correct: 0, explanation: 'Tayyorgarlik ko\'rilgan reja: am going to.', explanationRu: "Заранее подготовленный план: am going to." },
              { text: 'Choose the correct sentence:', options: ['I think it will rain tomorrow.', 'I think it is going to rain tomorrow.'], correct: 0, explanation: 'I think -> will.', explanationRu: "I think -> will." },
              { text: 'Select the correct sentence:', options: ['Look at the baby! He is going to fall!', 'Look at the baby! He will fall!'], correct: 0, explanation: 'Ko\'rinib turgan alomat: is going to fall!', explanationRu: "Явный признак: is going to fall!" },
            ],
          },
        ],
      },
      {
        id: 'sec-future-will-goingto-l5',
        order: 5,
        title: 'Present Continuous for Future (Aniq Kelasi Uchrashtiruvlar)',
        titleRu: 'Present Continuous для будущего (Запланированные встречи)',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: 'Vaqti va joyi ancha ilgari aniq kelishib qo\'yilgan kelajakdagi tadbirlar (arrangements) uchun Present Continuous (am/is/are + V-ing) ishlatiladi.',
              ruleRu: 'Present Continuous (am/is/are + V-ing) используется для точных договоренностей на будущее (время и место определены).',
              formula: 'Subject + am / is / are + Verb-ing + Future time',
              example: 'I am meeting my boss tomorrow at 10 AM. (Men ertaga soat 10 da boshlig\'im bilan uchrashyapman.)',
              exampleRu: 'I am meeting my boss tomorrow at 10 AM.',
            },
            exercises: [
              { text: 'We ___ to Paris tomorrow. We bought our plane tickets.', options: ['are flying', 'will fly', 'fly'], correct: 0, explanation: 'Chiptalar olingan aniq reja: are flying.', explanationRu: "Точный план — билеты куплены: are flying." },
              { text: 'She ___ the doctor at 3 PM on Monday.', options: ['is seeing', 'will see', 'sees'], correct: 0, explanation: 'Aniq belgilangan uchrashuv: is seeing.', explanationRu: "Точно назначенная встреча: is seeing." },
            ],
          },
          {
            teach: {
              rule: 'Uchta shakl farqi: 1) Present Continuous: aniq vaqti/joyi kelishilgan (arranged). 2) be going to: shunchaki niyat/reja (intended). 3) will: kutilmagan qaror (spontaneous).',
              ruleRu: '3 формы будущего: Present Cont (договоренность) vs be going to (намерение) vs will (спонтанно).',
              formula: 'Arrangement (Present Cont) | Intention (going to) | Spontaneous (will)',
              example: 'I am flying to Rome on Friday (chipta bor) vs I am going to learn Italian (niyat) vs I will help you (taklif).',
              exampleRu: 'Arranged vs Intended vs Spontaneous.',
            },
            exercises: [
              { text: 'I ___ my doctor tomorrow at 9:00. (Appointment is booked)', options: ['am visiting', 'will visit', 'visit'], correct: 0, explanation: 'Aniq uchrashuv belgilangan: am visiting.', explanationRu: "Назначена точная встреча: am visiting." },
              { text: 'They ___ married next month. (Invitations are sent out)', options: ['are getting', 'will get', 'get'], correct: 0, explanation: 'Taklifnomalar tarqatilgan aniq tadbir: are getting.', explanationRu: "Точное мероприятие с разосланными приглашениями: are getting." },
            ],
          },
          {
            teach: {
              rule: 'Kelasi zamon vaqt ko\'rsatkichlari: tomorrow (ertaga), tonight (bugun kechqurun), next week/month/year (kelasi hafta/oy/yil), in two days (ikki kundan keyin).',
              ruleRu: 'Маркеры будущего: tomorrow, tonight, next week, in 2 days.',
              formula: 'Verb form + tomorrow / next week / tonight / in X days',
              example: 'What are you doing tonight? We will finish the project next week.',
              exampleRu: 'What are you doing tonight? We will finish the project next week.',
            },
            exercises: [
              { text: 'What ___ you doing tonight?', options: ['are', 'will', 'do'], correct: 0, explanation: 'What are you doing tonight?', explanationRu: "What are you doing tonight?" },
              { text: 'He will start his new job ___ week.', options: ['next', 'last', 'yesterday'], correct: 0, explanation: 'Kelasi zamon: next week.', explanationRu: "Будущее время: next week." },
            ],
          },
          {
            teach: {
              rule: 'Kundalik suhbat va uchrashuvlar konteksti mashqlari.',
              ruleRu: 'Практика в контексте повседневных встреч и планов.',
              formula: 'Future arrangement context',
              example: '— Are you free on Friday? — No, I am playing tennis with Ali.',
              exampleRu: '— Are you free on Friday? — No, I am playing tennis with Ali.',
            },
            exercises: [
              { text: '— Are you coming to dinner tonight? — Yes, I ___ at 7:00.', options: ['am arriving', 'will arrive', 'arrived'], correct: 0, explanation: 'Aniq belgilangan kelish: am arriving.', explanationRu: "Точно назначенное прибытие: am arriving." },
              { text: 'Select the correct sentence:', options: ['I am leaving for London tomorrow morning.', 'I will to leave for London tomorrow morning.'], correct: 0, explanation: 'am leaving tomorrow morning.', explanationRu: "am leaving tomorrow morning." },
            ],
          },
          {
            teach: {
              rule: 'Kelasi zamon barcha shakllarini (will, going to, Present Continuous) birlashtiramiz.',
              ruleRu: 'Обобщим все формы будущего времени.',
              formula: 'Arrangement (Present Cont) | Intention (going to) | Instant/Promise (will)',
              example: 'I am flying to Madrid tomorrow (arrangement), I am going to buy souvenirs (intention), and I\'ll call you (promise).',
              exampleRu: 'Three future forms combined.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['We are having a party on Saturday; everything is ready.', 'We will have a party on Saturday; everything is ready.'], correct: 0, explanation: 'Tayyorgarlik ko\'rib qo\'yilgan: are having.', explanationRu: "Заранее подготовлено: are having." },
              { text: 'Choose the correct sentence:', options: ['I\'m going to learn Spanish next year.', 'I am will learn Spanish next year.'], correct: 0, explanation: 'Niyat: am going to learn.', explanationRu: "Намерение: am going to learn." },
              { text: 'Select the correct sentence:', options: ['I think you will enjoy the movie.', 'I think you are enjoying the movie.'], correct: 0, explanation: 'I think -> will enjoy.', explanationRu: "I think -> will enjoy." },
            ],
          },
        ],
      },
      {
        id: 'sec-future-will-goingto-l6',
        order: 6,
        title: 'Aralash amaliyot va Xatolarni tuzatish (Future)',
        titleRu: 'Смешанная практика и Исправление ошибок (Future)',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: 'Eng ko\'p uchraydigan 3 ta xato: 1) I will going to ❌ ➔ I am going to ✅  2) I am will ❌ ➔ I will ✅  3) won\'t to go ❌ ➔ won\'t go ✅.',
              ruleRu: '3 частые ошибки: 1) I will going to ❌ ➔ I am going to ✅  2) I am will ❌ ➔ I will ✅  3) won\'t to go ❌ ➔ won\'t go ✅.',
              formula: 'Check list: 1) am/is/are + going to + V1 | 2) will + V1 (NO to) | 3) won\'t + V1 (NO to)',
              example: 'I am going to eat. I will eat. I won\'t eat.',
              exampleRu: 'I am going to eat. I will eat. I won\'t eat.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I am going to study medicine.', 'I will going to study medicine.'], correct: 0, explanation: 'am going to study.', explanationRu: "am going to study." },
              { text: 'Choose the correct sentence:', options: ['She won\'t come to the lesson.', 'She won\'t to come to the lesson.'], correct: 0, explanation: 'won\'t + V1 (to siz).', explanationRu: "won't + V1 (без to)." },
            ],
          },
          {
            teach: {
              rule: 'Real dialoglarda kelasi zamon iboralarini to\'g\'ri moslashtirish.',
              ruleRu: 'Практика подбора форм будущего времени в диалогах.',
              formula: 'Dialogue context ➔ evaluate arrangement vs intention vs instant decision',
              example: '— What would you like to drink? — I\'ll have water, please.',
              exampleRu: '— What would you like to drink? — I\'ll have water, please.',
            },
            exercises: [
              { text: '— Did you phone Peter? — Oh no, I forgot! I ___ him now.', options: ['will call', 'am going to call', 'call'], correct: 0, explanation: 'Shu zahoti kutilmagan qaror: will call.', explanationRu: "Спонтанное решение прямо сейчас: will call." },
              { text: '— Why are you turning on the TV? — I ___ watch the news.', options: ['am going to', 'will', 'am will'], correct: 0, explanation: 'Televizor yoqishdan avvalgi niyat: am going to.', explanationRu: "Намерение перед тем, как включить телевизор: am going to." },
            ],
          },
          {
            teach: {
              rule: 'Shaxsiy rejalar va kelajakdagi niyatlar haqida matn tuzish mashqlari.',
              ruleRu: 'Составление текстов о личных планах и намерениях.',
              formula: 'Future Narrative: express plans (going to) and predictions/hopes (will)',
              example: 'Next year I am going to graduate. I hope I will find a good job.',
              exampleRu: 'Next year I am going to graduate. I hope I will find a good job.',
            },
            exercises: [
              { text: 'Next summer we ___ to Italy. We already saved money.', options: ['are going to travel', 'will travel', 'traveled'], correct: 0, explanation: 'Niyat/tayyorgarlik: are going to travel.', explanationRu: "Намерение/подготовка: are going to travel." },
              { text: 'I hope everything ___ be fine in the end.', options: ['will', 'is going to', 'going to'], correct: 0, explanation: 'I hope -> will.', explanationRu: "I hope -> will." },
            ],
          },
          {
            teach: {
              rule: 'Mantiqiy savol-javob va vaziyatlar zanjiri.',
              ruleRu: 'Построение логических цепочек вопрос-ответ.',
              formula: 'Q: What will you do if...? / What are you going to do when...?',
              example: 'What will you do if it rains tomorrow?',
              exampleRu: 'What will you do if it rains tomorrow?',
            },
            exercises: [
              { text: 'What ___ you do if you pass the test?', options: ['will', 'are going to', 'do'], correct: 0, explanation: 'What will you do...', explanationRu: "What will you do..." },
              { text: 'Select the correct sentence:', options: ['I\'m sure you will do great on the test!', 'I\'m sure you are going to do great on the test!'], correct: 0, explanation: 'I\'m sure -> will.', explanationRu: "I'm sure -> will." },
            ],
          },
          {
            teach: {
              rule: 'Section 14 Future ("going to" & "will") bo\'yicha yakuniy master formula.',
              ruleRu: 'Итоговая главная формула Future (going to & will).',
              formula: 'Master Future Rule: Plan/Evidence = am/is/are going to V1 | Instant/Promise/Think = will V1 | Arrangement = Present Cont',
              example: 'I am going to work. I will work. I am working tomorrow.',
              exampleRu: 'I am going to work. I will work. I am working tomorrow.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I am going to buy a laptop next week.', 'I am will buy a laptop next week.'], correct: 0, explanation: 'am going to buy.', explanationRu: "am going to buy." },
              { text: 'Choose the correct sentence:', options: ['I\'ll help you carry these heavy boxes.', 'I\'m going to help you carry these heavy boxes.'], correct: 0, explanation: 'Kutilmagan yordam: I\'ll help.', explanationRu: "Спонтанная помощь: I'll help." },
              { text: 'Select the correct sentence:', options: ['Look at those clouds! It is going to rain.', 'Look at those clouds! It will rain.'], correct: 0, explanation: 'Alomat: is going to rain.', explanationRu: "Признак: is going to rain." },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Future — \"going to\" va \"will\"",
      titleRu: 'Тест раздела: Будущее время — "going to" и "will"',
      exercises: [
        { text: 'I ___ study English tonight. I planned it yesterday.', options: ['am going to', 'will', 'go to'], correct: 0, explanation: 'Oldindan reja: am going to.', explanationRu: "Заранее продуманный план: am going to." },
        { text: 'Look at the dark clouds! It ___ rain.', options: ['is going to', 'will', 'is raining'], correct: 0, explanation: 'Alomat (evidence): is going to rain.', explanationRu: "Признак (evidence): is going to rain." },
        { text: '— The phone is ringing. — I ___ answer it!', options: ['will', 'am going to', 'going to'], correct: 0, explanation: 'Kutilmagan qaror: will.', explanationRu: "Спонтанное решение: will." },
        { text: 'I promise I ___ tell your secret.', options: ["won't", "am not going to", "don't"], correct: 0, explanation: 'Va\'da: won\'t.', explanationRu: "Обещание: won't." },
        { text: 'I think our team ___ win the match.', options: ['will', 'is going to', 'going to'], correct: 0, explanation: 'I think -> will.', explanationRu: "I think -> will." },
        { text: '___ you help me with this box, please?', options: ['Will', 'Are going to', 'Do'], correct: 0, explanation: 'So\'rov: Will you...', explanationRu: "Просьба: Will you..." },
        { text: 'He ___ come to the party tonight. He feels sick.', options: ["won't", "isn't going to", "doesn't"], correct: 0, explanation: 'won\'t come.', explanationRu: "won't come." },
        { text: 'We ___ to London tomorrow morning. We have tickets.', options: ['are flying', 'will fly', 'fly'], correct: 0, explanation: 'Chiptasi bor aniq uchrashtiruv: are flying.', explanationRu: "Точная договорённость с билетами: are flying." },
        { text: '— Why did you buy flour? — Because I ___ bake a cake.', options: ['am going to', 'will', 'go to'], correct: 0, explanation: 'Niyat: am going to.', explanationRu: "Намерение: am going to." },
        { text: '— I don\'t have money. — Don\'t worry, I ___ lend you some.', options: ['will', 'am going to', 'going to'], correct: 0, explanation: 'Yordam taklifi: will.', explanationRu: "Предложение помощи: will." },
        { text: 'Where ___ you go after school today?', options: ['will', 'are', 'do'], correct: 0, explanation: 'Where + will + you + go.', explanationRu: "Where + will + you + go." },
        { text: 'Choose the correct sentence:', options: ['I hope you will feel better soon.', 'I hope you are going to feel better soon.'], correct: 0, explanation: 'I hope -> will.', explanationRu: "I hope -> will." },
        { text: 'Choose the correct sentence:', options: ['She is not going to buy that expensive dress.', 'She is not will buy that expensive dress.'], correct: 0, explanation: 'is not going to buy.', explanationRu: "is not going to buy." },
        { text: 'Select the correct sentence:', options: ['Wait! I\'ll open the door for you.', 'Wait! I am going to open the door for you.'], correct: 0, explanation: 'Spontan qaror: I\'ll open.', explanationRu: "Спонтанное решение: I'll open." },
        { text: 'Select the correct sentence:', options: ['We are meeting the manager at 2 PM on Tuesday.', 'We will meet the manager at 2 PM on Tuesday.'], correct: 0, explanation: 'Vaqti belgilangan majlis: are meeting.', explanationRu: "Собрание с назначенным временем: are meeting." },
      ],
    },
  },
  {
    id: 'sec-future-continuous',
    order: 15,
    title: "Future Continuous — kelasi davomli zamon",
    titleRu: 'Future Continuous — будущее длительное время',
    icon: '⏳',
    lessons: [
      {
        id: 'sec-future-continuous-l1',
        order: 1,
        title: 'Tasdiq shakllar: "will be + V-ing"',
        titleRu: 'Утвердительные формы: "will be + V-ing"',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: 'Future Continuous — kelajakdagi ma\'lum bir aniq vaqtda (masalan, ertaga soat 5 da) davom etayotgan bo\'ladigan harakatlarni ifodalash uchun ishlatiladi.',
              ruleRu: 'Future Continuous используется для действий, которые будут происходить в определенный момент в будущем.',
              formula: 'Subject + will be + Verb-ing',
              example: 'At 5 PM tomorrow, I will be playing football. (Ertaga soat 5 da men futbol o\'ynayotgan bo\'laman.)',
              exampleRu: 'At 5 PM tomorrow, I will be playing football.',
            },
            exercises: [
              { text: 'At 10:00 tomorrow morning, I ___ an exam.', options: ['will be taking', 'will take', 'am take'], correct: 0, explanation: 'Aniq kelasi vaqtda jarayon: will be taking.', explanationRu: "Процесс в точный момент будущего: will be taking." },
              { text: 'Don\'t call her at 8 PM. She ___ dinner.', options: ['will be having', 'will have', 'is have'], correct: 0, explanation: 'Soat 8 da kechki ovqat tanavvul qilayotgan bo\'ladi: will be having.', explanationRu: "В 8 часов будем ужинать: will be having." },
            ],
          },
          {
            teach: {
              rule: 'Barcha egalar (I, you, he, she, it, we, they) uchun o\'zgarmasdan "will be + V-ing" ishlatiladi.',
              ruleRu: 'Для всех местоимений (I, you, he, she, it, we, they) используется одинаковая форма "will be + V-ing".',
              formula: 'All Subjects + will be + Verb-ing',
              example: 'He will be working. They will be studying. We will be traveling.',
              exampleRu: 'He will be working. They will be studying. We will be traveling.',
            },
            exercises: [
              { text: 'They ___ to Tashkent at this time tomorrow.', options: ['will be flying', 'will flying', 'are fly'], correct: 0, explanation: 'They + will be flying.', explanationRu: "They + will be flying." },
              { text: 'She ___ in the library all afternoon tomorrow.', options: ['will be studying', 'will studying', 'is study'], correct: 0, explanation: 'She + will be studying.', explanationRu: "She + will be studying." },
            ],
          },
          {
            teach: {
              rule: 'Vaqt ko\'rsatkichlari: tomorrow at 5 PM (ertaga soat 5 da), at this time tomorrow (ertaga shu vaqtda), all day tomorrow (ertaga kun bo\'yi).',
              ruleRu: 'Маркеры времени: at this time tomorrow, tomorrow at 5 PM, all day tomorrow.',
              formula: 'will be + V-ing + at this time tomorrow / at 5 PM tomorrow',
              example: 'This time next week, we will be relaxing on the beach.',
              exampleRu: 'This time next week, we will be relaxing on the beach.',
            },
            exercises: [
              { text: 'This time next week, I ___ on the beach.', options: ['will be lying', 'will lie', 'am lie'], correct: 0, explanation: 'This time next week -> will be lying.', explanationRu: "This time next week -> will be lying." },
              { text: 'They will be working on the project ___ tomorrow.', options: ['all day', 'yesterday', 'ago'], correct: 0, explanation: 'all day tomorrow.', explanationRu: "all day tomorrow." },
            ],
          },
          {
            teach: {
              rule: '"will be + V-ing" odatiy xushmuomalalik so\'rovlarida ham qo\'llaniladi (polite questions about someone\'s plans).',
              ruleRu: 'Future Continuous используется для вежливого расспроса о чьих-либо планах.',
              formula: 'Will you be + Verb-ing + time ?',
              example: 'Will you be using your computer later? (Keyinroq kompyuteringizdan foydalanasizmi?)',
              exampleRu: 'Will you be using your computer later?',
            },
            exercises: [
              { text: '___ you be passing the post office today?', options: ['Will', 'Are', 'Do'], correct: 0, explanation: 'Xushmuomalalik so\'rovi: Will you be passing...', explanationRu: "Вежливая просьба: Will you be passing..." },
              { text: 'Will she be ___ the car tonight?', options: ['using', 'use', 'used'], correct: 0, explanation: 'Will she be + V-ing (using).', explanationRu: "Will she be + V-ing (using)." },
            ],
          },
          {
            teach: {
              rule: 'Future Continuous tasdiq shakllarini birlashtiramiz.',
              ruleRu: 'Обобщим все утвердительные формы Future Continuous.',
              formula: 'Subject + will be + Verb-ing + specific future time',
              example: 'Don\'t visit me at 9 PM because I will be sleeping.',
              exampleRu: 'Don\'t visit me at 9 PM because I will be sleeping.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['At 8 PM tonight, I will be watching the football match.', 'At 8 PM tonight, I will watching the football match.'], correct: 0, explanation: 'will be watching (be shart).', explanationRu: "will be watching (be обязательно)." },
              { text: 'Choose the correct sentence:', options: ['She will be working in London next month.', 'She will is working in London next month.'], correct: 0, explanation: 'will be working.', explanationRu: "will be working." },
              { text: 'Select the correct sentence:', options: ['This time tomorrow, we will be swimming in the sea.', 'This time tomorrow, we are swim in the sea.'], correct: 0, explanation: 'will be swimming.', explanationRu: "will be swimming." },
            ],
          },
        ],
      },
      {
        id: 'sec-future-continuous-l2',
        order: 2,
        title: 'Inkor shakli: "won\'t be + V-ing"',
        titleRu: 'Отрицательная форма: "won\'t be + V-ing"',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: 'Future Continuous inkor shakli: "will not be" ➔ "won\'t be + V-ing". Barcha shaxslar uchun bir xil.',
              ruleRu: 'Отрицательная форма: "won\'t be + V-ing" (will not be). Одинакова для всех лиц.',
              formula: 'Subject + won\'t be + Verb-ing',
              example: 'I won\'t be working at 6 PM tomorrow. (Men ertaga soat 6 da ishlamayotgan bo\'laman.)',
              exampleRu: 'I won\'t be working at 6 PM tomorrow.',
            },
            exercises: [
              { text: 'I ___ using the car tomorrow morning, so you can take it.', options: ["won't be", "won't", "not be"], correct: 0, explanation: 'Inkor shakli: won\'t be using.', explanationRu: "Отрицательная форма: won't be using." },
              { text: 'She ___ sleeping at 10 PM. She usually stays up late.', options: ["won't be", "isn't be", "won't"], correct: 0, explanation: 'She + won\'t be sleeping.', explanationRu: "She + won't be sleeping." },
            ],
          },
          {
            teach: {
              rule: 'Eng ko\'p uchraydigan 2 ta xato: 1) won\'t working ❌ ➔ won\'t be working ✅  2) won\'t be work ❌ ➔ won\'t be working ✅.',
              ruleRu: '2 частые ошибки: 1) won\'t working ❌ ➔ won\'t be working ✅  2) won\'t be work ❌ ➔ won\'t be working ✅.',
              formula: 'REMEMBER: won\'t + BE + Verb-ing',
              example: 'Correct: They won\'t be coming tonight. (NOT: They won\'t coming.)',
              exampleRu: 'Correct: They won\'t be coming tonight.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['They won\'t be studying at midnight.', 'They won\'t studying at midnight.'], correct: 0, explanation: 'won\'t be studying.', explanationRu: "won't be studying." },
              { text: 'Choose the correct sentence:', options: ['He won\'t be driving during the snowstorm.', 'He won\'t be drive during the snowstorm.'], correct: 0, explanation: 'won\'t be driving.', explanationRu: "won't be driving." },
            ],
          },
          {
            teach: {
              rule: 'Vaziyatli inkor mashqlari (sabab va imkoniyat berish).',
              ruleRu: 'Ситуационные отрицания (объяснение причины/освобождения).',
              formula: 'Subject + won\'t be + V-ing + so / because...',
              example: 'I won\'t be using my printer tomorrow, so you can borrow it.',
              exampleRu: 'I won\'t be using my printer tomorrow, so you can borrow it.',
            },
            exercises: [
              { text: 'We ___ playing tennis tomorrow because of the rain.', options: ["won't be", "aren't be", "won't"], correct: 0, explanation: 'We + won\'t be playing.', explanationRu: "We + won't be playing." },
              { text: 'Tom ___ attending the meeting tomorrow at 3:00.', options: ["won't be", "doesn't be", "not will be"], correct: 0, explanation: 'Tom + won\'t be attending.', explanationRu: "Tom + won't be attending." },
            ],
          },
          {
            teach: {
              rule: 'Hozirgi inkor (isn\'t/aren\'t V-ing) va Kelasi davomli inkor (won\'t be V-ing) taqqoslamasi.',
              ruleRu: 'Сравнение отрицаний: isn\'t/aren\'t V-ing (сейчас) vs won\'t be V-ing (в будущем).',
              formula: 'Now ➔ isn\'t/aren\'t V-ing  |  Future specific time ➔ won\'t be V-ing',
              example: 'He isn\'t working now. He won\'t be working tomorrow at 5 PM.',
              exampleRu: 'He isn\'t working now. He won\'t be working tomorrow at 5 PM.',
            },
            exercises: [
              { text: 'I am not busy now, and I ___ working tomorrow at 4 PM either.', options: ["won't be", "am not", "don't"], correct: 0, explanation: 'tomorrow at 4 PM -> won\'t be.', explanationRu: "tomorrow at 4 PM -> won't be." },
              { text: 'Select the correct sentence:', options: ['She won\'t be teaching at 2 PM tomorrow.', 'She is not teaching at 2 PM tomorrow.'], correct: 0, explanation: 'won\'t be teaching.', explanationRu: "won't be teaching." },
            ],
          },
          {
            teach: {
              rule: 'Future Continuous inkor shakllarini birlashtiramiz.',
              ruleRu: 'Обобщим все отрицательные формы Future Continuous.',
              formula: 'Subject + won\'t be + Verb-ing',
              example: 'They won\'t be staying at a hotel; they booked an apartment.',
              exampleRu: 'They won\'t be staying at a hotel; they booked an apartment.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I won\'t be using the room tomorrow, feel free to use it.', 'I won\'t use the room tomorrow at 5 PM ongoing.'], correct: 0, explanation: 'won\'t be using.', explanationRu: "won't be using." },
              { text: 'Select the correct sentence:', options: ['He won\'t be wearing a suit to the beach.', 'He won\'t wearing a suit to the beach.'], correct: 0, explanation: 'won\'t be wearing.', explanationRu: "won't be wearing." },
              { text: 'Choose the correct form: We ___ traveling next week.', options: ["won't be", "won't"], correct: 0, explanation: 'won\'t be + V-ing.', explanationRu: "won't be + V-ing." },
            ],
          },
        ],
      },
      {
        id: 'sec-future-continuous-l3',
        order: 3,
        title: 'Savol shakli: "Will ... be + V-ing?"',
        titleRu: 'Вопросительная форма: "Will ... be + V-ing?"',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: 'Future Continuous savollarida "Will" eganing oldiga o\'tadi, "be + V-ing" esa egadan keyin saqlanadi.',
              ruleRu: 'В вопросах "Will" выносится перед подлежащим, а "be + V-ing" остается после подлежащего.',
              formula: 'Will + Subject + be + Verb-ing ?',
              example: 'Will you be working at 8 PM tomorrow? (Ertaga soat 8 da ishlayotgan bo\'lasizmi?)',
              exampleRu: 'Will you be working at 8 PM tomorrow?',
            },
            exercises: [
              { text: '___ you be sleeping when I arrive tonight?', options: ['Will', 'Are', 'Do'], correct: 0, explanation: 'Will + you + be sleeping.', explanationRu: "Will + you + be sleeping." },
              { text: '___ she be using her car tomorrow morning?', options: ['Will', 'Is', 'Does'], correct: 0, explanation: 'Will + she + be using.', explanationRu: "Will + she + be using." },
            ],
          },
          {
            teach: {
              rule: 'Qisqa javoblar: Yes, I will. / No, I won\'t. | Yes, they will. / No, they won\'t.',
              ruleRu: 'Краткие ответы: Yes, I will / No, I won\'t | Yes, they will / No, they won\'t.',
              formula: 'Yes, + Subject + will.  |  No, + Subject + won\'t.',
              example: '— Will you be watching the game at 9 PM? — Yes, I will. / No, I won\'t.',
              exampleRu: '— Will you be watching the game at 9 PM? — Yes, I will. / No, I won\'t.',
            },
            exercises: [
              { text: '— Will he be studying at 10 PM? — Yes, he ___ .', options: ['will', 'be', 'is'], correct: 0, explanation: 'Yes, he will.', explanationRu: "Yes, he will." },
              { text: '— Will they be traveling all day tomorrow? — No, they ___ .', options: ["won't", "aren't", "don't"], correct: 0, explanation: 'No, they won\'t.', explanationRu: "No, they won't." },
            ],
          },
          {
            teach: {
              rule: 'Maxsus savollar (Wh- questions): What / Where / Why + will + subject + be + V-ing?',
              ruleRu: 'Специальные вопросы: Wh- word + will + Subject + be + V-ing?',
              formula: 'Wh- word + will + Subject + be + Verb-ing ?',
              example: 'What will you be doing tomorrow at this time? Where will he be staying in Rome?',
              exampleRu: 'What will you be doing tomorrow at this time?',
            },
            exercises: [
              { text: 'What ___ you be doing at 7 PM tomorrow?', options: ['will', 'are', 'do'], correct: 0, explanation: 'What + will + you + be doing.', explanationRu: "What + will + you + be doing." },
              { text: 'Where ___ she be living next year?', options: ['will', 'is', 'does'], correct: 0, explanation: 'Where + will + she + be living.', explanationRu: "Where + will + she + be living." },
            ],
          },
          {
            teach: {
              rule: 'Xushmuomalalik bilan so\'rash (Polite requests & inquiries) mashqlari.',
              ruleRu: 'Практика вежливых расспросов с помощью Future Continuous.',
              formula: 'Will you be + V-ing + (time/place) ?',
              example: 'Will you be passing by the supermarket? Could you buy some milk?',
              exampleRu: 'Will you be passing by the supermarket? Could you buy some milk?',
            },
            exercises: [
              { text: '___ you be using the printer this afternoon?', options: ['Will', 'Are', 'Do'], correct: 0, explanation: 'Will you be using...', explanationRu: "Will you be using..." },
              { text: '— Will you be staying at home tonight? — Yes, I ___ .', options: ['will', 'am', 'do'], correct: 0, explanation: 'Yes, I will.', explanationRu: "Yes, I will." },
            ],
          },
          {
            teach: {
              rule: 'Future Continuous savol shakllarini birlashtiramiz.',
              ruleRu: 'Обобщим все вопросительные формы Future Continuous.',
              formula: 'Will + Subject + be + V-ing ?  |  Wh- + will + Subject + be + V-ing ?',
              example: 'Where will you be working next year, and will you be living alone?',
              exampleRu: 'Where will you be working next year, and will you be living alone?',
            },
            exercises: [
              { text: 'Choose the correct question:', options: ['Will you be attending the seminar tomorrow at 10 AM?', 'Will you attending the seminar tomorrow at 10 AM?'], correct: 0, explanation: 'Will you be attending...', explanationRu: "Will you be attending..." },
              { text: 'Choose the correct question:', options: ['What will they be doing during the break?', 'What will they doing during the break?'], correct: 0, explanation: 'What will they be doing...', explanationRu: "What will they be doing..." },
              { text: 'Select the correct question:', options: ['Why will he be driving all night?', 'Why he will be driving all night?'], correct: 0, explanation: 'Why will he be driving...', explanationRu: "Why will he be driving..." },
            ],
          },
        ],
      },
      {
        id: 'sec-future-continuous-l4',
        order: 4,
        title: 'Future Simple vs Future Continuous Taqqoslash',
        titleRu: 'Сравнение Future Simple и Future Continuous',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: 'Tugallanadigan kelajak harakat ➔ Future Simple (I will call you tomorrow). Aniq vaqtdagi davomiylik/jarayon ➔ Future Continuous (I will be waiting for you at 5 PM).',
              ruleRu: 'Завершенное действие в будущем ➔ Future Simple | Процесс в определенный момент будущего ➔ Future Continuous.',
              formula: 'Future Simple (will + V1) vs Future Continuous (will be + V-ing)',
              example: 'Tomorrow I will write a report. (Ertaga hisobot yozaman.) / Tomorrow at 3 PM I will be writing a report. (Ertaga soat 3 da hisobot yozayotgan bo\'laman.)',
              exampleRu: 'Future Simple vs Future Continuous.',
            },
            exercises: [
              { text: 'I ___ you tomorrow morning.', options: ['will call', 'will be calling', 'am call'], correct: 0, explanation: 'Oddiy kelajak harakat: will call.', explanationRu: "Простое будущее действие: will call." },
              { text: 'Don\'t phone me at 3 PM. I ___ an exam then.', options: ['will be taking', 'will take', 'am take'], correct: 0, explanation: 'O\'sha soatdagi jarayon: will be taking.', explanationRu: "Процесс в тот час: will be taking." },
            ],
          },
          {
            teach: {
              rule: 'Vaqt ko\'rsatkichlari: tomorrow, next week ➔ Future Simple | tomorrow at 5 PM, this time tomorrow, all day tomorrow ➔ Future Continuous.',
              ruleRu: 'Маркеры: tomorrow (Future Simple) vs tomorrow at 5 PM / at this time tomorrow (Future Continuous).',
              formula: 'Check time precision ➔ General time = will V1 | Specific time point = will be V-ing',
              example: 'We will meet tomorrow. / Tomorrow at 2 PM we will be discussing the project.',
              exampleRu: 'General vs Specific time point.',
            },
            exercises: [
              { text: 'We ___ to Samarkand tomorrow.', options: ['will go', 'will be going', 'go'], correct: 0, explanation: 'Oddiy kelasi reja: will go.', explanationRu: "Простой будущий план: will go." },
              { text: 'At 10:00 AM tomorrow, we ___ on the train.', options: ['will be travelling', 'will travel', 'travel'], correct: 0, explanation: 'Soat 10 da poyezdda ketayotgan bo\'lamiz: will be travelling.', explanationRu: "В 10 часов будем ехать на поезде: will be travelling." },
            ],
          },
          {
            teach: {
              rule: 'Holat fe\'llari (Stative verbs: know, want, love, understand, like) kelasi davomli zamonda ham (-ing) olmasdan Future Simple (will + V1) ishlatiladi.',
              ruleRu: 'Глаголы состояния (know, want, like...) HE используются в Future Continuous — только Future Simple.',
              formula: 'Stative Verbs (know, want...) ➔ will + V1 ONLY (will know, will want)',
              example: 'I will know the test results tomorrow. (I will be knowing EMAS!)',
              exampleRu: 'I will know the test results tomorrow.',
            },
            exercises: [
              { text: 'I ___ the answer tomorrow morning.', options: ['will know', 'will be knowing', 'know'], correct: 0, explanation: 'know - holat fe\'li: will know.', explanationRu: "know — глагол состояния: will know." },
              { text: 'She ___ to join us for dinner.', options: ['will want', 'will be wanting', 'wants'], correct: 0, explanation: 'want - holat fe\'li: will want.', explanationRu: "want — глагол состояния: will want." },
            ],
          },
          {
            teach: {
              rule: 'Yonma-yon taqqoslash mashqlari (bitta gap yoki matn ichida).',
              ruleRu: 'Упражнения на параллельное сравнение времен.',
              formula: 'Contextual choice: will + V1 OR will be + V-ing',
              example: 'He will start work at 9 AM, so at 9:30 AM he will be working.',
              exampleRu: 'He will start work at 9 AM, so at 9:30 AM he will be working.',
            },
            exercises: [
              { text: 'The movie starts at 8 PM, so at 8:30 PM we ___ it.', options: ['will be watching', 'will watch', 'watch'], correct: 0, explanation: '8:30 da ko\'rayotgan bo\'lamiz: will be watching.', explanationRu: "В 8:30 будем смотреть: will be watching." },
              { text: 'Select the correct sentence:', options: ['I will meet you tomorrow at 5 PM, and we will be drinking coffee.', 'I will be meeting you tomorrow at 5 PM, and we will drink coffee.'], correct: 0, explanation: 'will meet / will be drinking.', explanationRu: "will meet / will be drinking." },
            ],
          },
          {
            teach: {
              rule: 'Future Simple va Future Continuous farqini birlashtiramiz.',
              ruleRu: 'Обобщим различие между Future Simple и Future Continuous.',
              formula: 'will V1 = simple action | will be V-ing = action in progress at a moment',
              example: 'I will arrive at 7:00, and at 7:30 I will be having dinner.',
              exampleRu: 'I will arrive at 7:00, and at 7:30 I will be having dinner.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['At 6 PM tomorrow, she will be practicing piano.', 'At 6 PM tomorrow, she will practice piano.'], correct: 0, explanation: 'At 6 PM tomorrow -> will be practicing.', explanationRu: "At 6 PM tomorrow -> will be practicing." },
              { text: 'Choose the correct sentence:', options: ['I will understand the rule after the lesson.', 'I will be understanding the rule after the lesson.'], correct: 0, explanation: 'understand - holat fe\'li: will understand.', explanationRu: "understand — глагол состояния: will understand." },
              { text: 'Select the correct sentence:', options: ['Don\'t call him at 11 PM; he will be sleeping.', 'Don\'t call him at 11 PM; he will sleep.'], correct: 0, explanation: 'will be sleeping.', explanationRu: "will be sleeping." },
            ],
          },
        ],
      },
      {
        id: 'sec-future-continuous-l5',
        order: 5,
        title: 'Parallel Harakatlar va Ketma-ketlik',
        titleRu: 'Параллельные действия и Последовательность',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: 'Kelajakdagi shart/vaqt elanchiklarida (when, while, if) vaqt ergash gapida Present Simple, bosh gapda Future Continuous keladi.',
              ruleRu: 'В придаточных времени (when/while): Present Simple в придаточном, Future Continuous в главном.',
              formula: 'When + Subject + Present Simple (V1/-s) , Subject + will be + V-ing',
              example: 'When you arrive tomorrow, I will be waiting for you. (Sen kelganingda men seni kutayotgan bo\'laman.)',
              exampleRu: 'When you arrive tomorrow, I will be waiting for you.',
            },
            exercises: [
              { text: 'When you ___ home tomorrow, I will be watching TV.', options: ['come', 'will come', 'are coming'], correct: 0, explanation: 'When elanchigidan keyin Present Simple: come.', explanationRu: "После союза when — Present Simple: come." },
              { text: 'If it rains tomorrow, we ___ staying indoors.', options: ['will be', 'are', 'will'], correct: 0, explanation: 'If it rains -> we will be staying.', explanationRu: "If it rains -> we will be staying." },
            ],
          },
          {
            teach: {
              rule: 'Bir vaqtning o\'zida kelajakda davom etadigan ikkita uzluksiz harakat (WHILE bilan).',
              ruleRu: 'Два параллельных длительных действия в будущем с WHILE.',
              formula: 'Future Continuous + WHILE + Present Continuous / Future Continuous',
              example: 'While I am studying tomorrow, my sister will be playing video games.',
              exampleRu: 'While I am studying tomorrow, my sister will be playing video games.',
            },
            exercises: [
              { text: 'While you are working tomorrow, I ___ on the beach.', options: ['will be relaxing', 'will relax', 'relax'], correct: 0, explanation: 'While ... -> I will be relaxing.', explanationRu: "While ... -> I will be relaxing." },
              { text: 'They will be dancing while the band ___ .', options: ['is playing', 'will play', 'played'], correct: 0, explanation: 'while the band is playing (Present Continuous).', explanationRu: "while the band is playing (Present Continuous)." },
            ],
          },
          {
            teach: {
              rule: 'Ertangi kun jadvali va vaqt zanjirini tuzish mashqlari.',
              ruleRu: 'Составление расписания и временных цепочек на завтра.',
              formula: 'Future timeline: At 8:00 I will be V-ing ➔ At 12:00 I will be V-ing',
              example: 'At 8 AM I will be having breakfast, and at 10 AM I will be sitting in a lecture.',
              exampleRu: 'At 8 AM I will be having breakfast, and at 10 AM I will be sitting in a lecture.',
            },
            exercises: [
              { text: 'At 9:00 AM tomorrow I ___ breakfast, and at 11:00 AM I ___ tennis.', options: ['will be having / will be playing', 'will have / will play', 'am having / am playing'], correct: 0, explanation: 'Jadvaldagi davomiy nuqtalar: will be having / will be playing.', explanationRu: "Пункты расписания: will be having / will be playing." },
              { text: 'Select the correct sentence:', options: ['When the train arrives, we will be waiting on the platform.', 'When the train will arrive, we will be waiting on the platform.'], correct: 0, explanation: 'When the train arrives...', explanationRu: "When the train arrives..." },
            ],
          },
          {
            teach: {
              rule: 'Kelajakdagi davomiy harakatlarni dialogik savol-javoblarda qo\'llash.',
              ruleRu: 'Практика диалогов с Future Continuous.',
              formula: 'Dialogue Drill: — What will you be doing when I call? — I will be V-ing.',
              example: '— What will you be doing at 6 PM? — I will be cooking dinner.',
              exampleRu: '— What will you be doing at 6 PM? — I will be cooking dinner.',
            },
            exercises: [
              { text: '— What ___ you be doing at 3 PM tomorrow? — I ___ taking an exam.', options: ['will / will be', 'are / am', 'do / will'], correct: 0, explanation: 'What will you be doing / I will be taking.', explanationRu: "What will you be doing / I will be taking." },
              { text: '— Will he be sleeping at midnight? — Yes, he ___ .', options: ['will', 'will be', 'is'], correct: 0, explanation: 'Yes, he will.', explanationRu: "Yes, he will." },
            ],
          },
          {
            teach: {
              rule: 'Parallel va ketma-ket kelasi zamon qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим правила параллельных действий в будущем.',
              formula: 'When + Present Simple , Subject + will be + V-ing',
              example: 'When the clock strikes midnight, people around the world will be celebrating.',
              exampleRu: 'When the clock strikes midnight, people around the world will be celebrating.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['When you get off the plane, I will be standing near the exit.', 'When you will get off the plane, I will be standing near the exit.'], correct: 0, explanation: 'When you get off...', explanationRu: "When you get off..." },
              { text: 'Choose the correct sentence:', options: ['While the teacher is explaining, the students will be listening carefully.', 'While the teacher will explain, the students will be listening carefully.'], correct: 0, explanation: 'While the teacher is explaining...', explanationRu: "While the teacher is explaining..." },
              { text: 'Select the correct sentence:', options: ['At 7 PM tomorrow, we will be having dinner together.', 'At 7 PM tomorrow, we will have dinner together ongoing.'], correct: 0, explanation: 'will be having dinner.', explanationRu: "will be having dinner." },
            ],
          },
        ],
      },
      {
        id: 'sec-future-continuous-l6',
        order: 6,
        title: 'Aralash amaliyot va Xatolarni tuzatish (Future Continuous)',
        titleRu: 'Смешанная практика и Исправление ошибок (Future Continuous)',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: 'Eng ko\'p uchraydigan 3 ta xato: 1) I will sleeping ❌ ➔ I will be sleeping ✅  2) won\'t be study ❌ ➔ won\'t be studying ✅  3) when you will arrive ❌ ➔ when you arrive ✅.',
              ruleRu: '3 частые ошибки: 1) will sleeping ❌ ➔ will be sleeping ✅  2) won\'t be study ❌ ➔ won\'t be studying ✅  3) when you will arrive ❌ ➔ when you arrive ✅.',
              formula: 'Check list: 1) will + BE + V-ing | 2) won\'t + BE + V-ing | 3) when + Present Simple',
              example: 'I will be sleeping. I won\'t be studying. When you arrive.',
              exampleRu: 'I will be sleeping. I won\'t be studying. When you arrive.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['This time tomorrow I will be flying to Rome.', 'This time tomorrow I will flying to Rome.'], correct: 0, explanation: 'will be flying.', explanationRu: "will be flying." },
              { text: 'Choose the correct sentence:', options: ['When I arrive home, my mom will be cooking.', 'When I will arrive home, my mom will be cooking.'], correct: 0, explanation: 'When I arrive home...', explanationRu: "When I arrive home..." },
            ],
          },
          {
            teach: {
              rule: 'Kunlik reja va vaqt jadvallari bo\'yicha hikoya mashqlari.',
              ruleRu: 'Составление рассказов по временным расписаниям.',
              formula: 'Future timeline narrative using will be + V-ing',
              example: 'Tomorrow is a busy day. At 9 AM I will be sitting in class, at 1 PM I will be having lunch.',
              exampleRu: 'Tomorrow is a busy day. At 9 AM I will be sitting in class.',
            },
            exercises: [
              { text: 'Tomorrow at 10 AM, we ___ an important test.', options: ['will be writing', 'will writeing', 'will be write'], correct: 0, explanation: 'will be writing.', explanationRu: "will be writing." },
              { text: 'Select the correct sentence:', options: ['Don\'t call her at 11 PM; she will be sleeping soundly.', 'Don\'t call her at 11 PM; she will sleeping soundly.'], correct: 0, explanation: 'will be sleeping soundly.', explanationRu: "will be sleeping soundly." },
            ],
          },
          {
            teach: {
              rule: 'Gaplarni tarjima va mantiqan moslashtirish mashqlari.',
              ruleRu: 'Упражнения на перевод и логическое согласование.',
              formula: 'English Future Cont ➔ Uzbek/Russian ongoing future action',
              example: 'At 5 PM tomorrow, I will be repairing my car.',
              exampleRu: 'At 5 PM tomorrow, I will be repairing my car.',
            },
            exercises: [
              { text: 'Ertaga soat 4 da men kitob o\'qiyotgan bo\'laman:', options: ['Tomorrow at 4 o\'clock I will be reading a book.', 'Tomorrow at 4 o\'clock I will read a book.'], correct: 0, explanation: 'Davomli jarayon: will be reading.', explanationRu: "Длительный процесс: will be reading." },
              { text: 'Ertaga bu vaqtda ular suzishayotgan bo\'lishadi:', options: ['At this time tomorrow they will be swimming.', 'At this time tomorrow they swim.'], correct: 0, explanation: 'will be swimming.', explanationRu: "will be swimming." },
            ],
          },
          {
            teach: {
              rule: 'Dialoglar va interfaol savol-javob mashqlari.',
              ruleRu: 'Диалоги и интерактивная практика.',
              formula: 'Q: Will you be V-ing at (time)? ➔ A: Yes, I will. / No, I won\'t.',
              example: '— Will you be using the room at 4:00? — No, I won\'t. You can use it.',
              exampleRu: '— Will you be using the room at 4:00? — No, I won\'t.',
            },
            exercises: [
              { text: '— Will you be staying long at the party? — No, I ___ home early.', options: ['will be going', 'will go', 'go'], correct: 0, explanation: 'will be going.', explanationRu: "will be going." },
              { text: 'Select the correct sentence:', options: ['What will you be doing when the new year starts?', 'What will you doing when the new year starts?'], correct: 0, explanation: 'What will you be doing...', explanationRu: "What will you be doing..." },
            ],
          },
          {
            teach: {
              rule: 'Section 15 Future Continuous bo\'yicha yakuniy master formula.',
              ruleRu: 'Итоговая главная формула Future Continuous.',
              formula: 'Master Future Continuous Rule: Subject + will be + V-ing | Negative: won\'t be + V-ing | Question: Will + Subject + be + V-ing ?',
              example: 'I will be working. I won\'t be working. Will you be working?',
              exampleRu: 'I will be working. I won\'t be working. Will you be working?',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['At 9 PM tomorrow, I will be watching a movie.', 'At 9 PM tomorrow, I will be watch a movie.'], correct: 0, explanation: 'will be watching.', explanationRu: "will be watching." },
              { text: 'Choose the correct sentence:', options: ['She won\'t be using the printer tomorrow, so you can take it.', 'She won\'t using the printer tomorrow, so you can take it.'], correct: 0, explanation: 'won\'t be using.', explanationRu: "won't be using." },
              { text: 'Select the correct sentence:', options: ['When you arrive tomorrow, we will be waiting for you.', 'When you will arrive tomorrow, we will be waiting for you.'], correct: 0, explanation: 'When you arrive tomorrow...', explanationRu: "When you arrive tomorrow..." },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Future Continuous — kelasi davomli zamon",
      titleRu: 'Тест раздела: Future Continuous — будущее длительное время',
      exercises: [
        { text: 'At 10 PM tonight, I ___ sleeping.', options: ['will be', 'will', 'am'], correct: 0, explanation: 'I + will be sleeping.', explanationRu: "I + will be sleeping." },
        { text: 'Don\'t phone me at 3 PM tomorrow. I ___ an exam.', options: ['will be taking', 'will take', 'am take'], correct: 0, explanation: 'will be taking.', explanationRu: "will be taking." },
        { text: 'This time next week, we ___ on the beach.', options: ['will be lying', 'will lie', 'are lie'], correct: 0, explanation: 'will be lying.', explanationRu: "will be lying." },
        { text: 'She ___ using her computer tomorrow morning, so you can borrow it.', options: ["won't be", "won't", "isn't"], correct: 0, explanation: 'won\'t be using.', explanationRu: "won't be using." },
        { text: '___ you be attending the conference tomorrow at 9:00?', options: ['Will', 'Are', 'Do'], correct: 0, explanation: 'Will you be attending...', explanationRu: "Will you be attending..." },
        { text: 'What ___ you be doing tomorrow at this time?', options: ['will', 'are', 'do'], correct: 0, explanation: 'What will you be doing...', explanationRu: "What will you be doing..." },
        { text: 'When you arrive tomorrow, I ___ for you at the station.', options: ['will be waiting', 'will wait', 'am wait'], correct: 0, explanation: 'will be waiting.', explanationRu: "will be waiting." },
        { text: 'I ___ the answer to your question tomorrow.', options: ['will know', 'will be knowing', 'know'], correct: 0, explanation: 'know - holat fe\'li: will know.', explanationRu: "know — глагол состояния: will know." },
        { text: 'Choose the correct sentence:', options: ['They won\'t be studying at midnight.', 'They won\'t studying at midnight.'], correct: 0, explanation: 'won\'t be studying.', explanationRu: "won't be studying." },
        { text: 'Choose the correct sentence:', options: ['Will she be using her car tonight?', 'Will she using her car tonight?'], correct: 0, explanation: 'Will she be using...', explanationRu: "Will she be using..." },
        { text: 'Select the correct sentence:', options: ['When he arrives tomorrow, we will be eating dinner.', 'When he will arrive tomorrow, we will be eating dinner.'], correct: 0, explanation: 'When he arrives...', explanationRu: "When he arrives..." },
        { text: 'Select the correct sentence:', options: ['At 8 AM tomorrow, I will be driving to work.', 'At 8 AM tomorrow, I will drive to work.'], correct: 0, explanation: 'At 8 AM tomorrow -> will be driving.', explanationRu: "At 8 AM tomorrow -> will be driving." },
        { text: 'Choose the correct sentence:', options: ['While you are working tomorrow, I will be relaxing.', 'While you will work tomorrow, I will relax.'], correct: 0, explanation: 'While you are working... I will be relaxing.', explanationRu: "While you are working... I will be relaxing." },
        { text: 'Choose the correct sentence:', options: ['I will be passing by the post office tomorrow. Can I post your letter?', 'I will pass by the post office tomorrow. Can I post your letter?'], correct: 0, explanation: 'Xushmuomalalik so\'rovi: will be passing.', explanationRu: "Вежливая просьба: will be passing." },
        { text: 'Select the correct sentence:', options: ['Don\'t call them at 11 PM; they will be sleeping.', 'Don\'t call them at 11 PM; they will sleep.'], correct: 0, explanation: 'will be sleeping.', explanationRu: "will be sleeping." },
      ],
    },
  },
  {
    id: 'sec-present-perfect-and-continuous',
    order: 16,
    title: 'Present Perfect va Present Perfect Continuous',
    titleRu: 'Present Perfect и Present Perfect Continuous',
    icon: '🎯',
    lessons: [
      {
        id: 'sec-present-perfect-l1',
        order: 1,
        title: 'Present Perfect Simple: Tasdiq, Inkor va Savol',
        titleRu: 'Present Perfect Simple: Утверждение, Отрицание и Вопрос',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: 'Present Perfect (Hozirgi tugallangan zamon) — o\'tmishda sodir bo\'lgan, lekin natijasi ayni damda ko\'rinib turgan harakatlar yoki tajribalar uchun ishlatiladi.',
              ruleRu: 'Present Perfect используется для действий в прошлом, результат которых виден или важен сейчас.',
              formula: 'Subject + have / has + Verb3 (V-ed / Irregular V3)',
              example: 'I have finished my homework. (Men uy vazifamni bajarib bo\'ldim.) She has lost her key.',
              exampleRu: 'I have finished my homework. She has lost her key.',
            },
            exercises: [
              { text: 'I ___ my key. I can\'t open the door.', options: ['have lost', 'losted', 'has lost'], correct: 0, explanation: 'I + have lost.', explanationRu: "I + have lost." },
              { text: 'She ___ her lunch, so she isn\'t hungry.', options: ['has eaten', 'have eaten', 'eated'], correct: 0, explanation: 'She + has eaten.', explanationRu: "She + has eaten." },
            ],
          },
          {
            teach: {
              rule: 'Ega bilan moslashuvi: I / You / We / They ➔ HAVE + V3  |  He / She / It ➔ HAS + V3.',
              ruleRu: 'Согласование: I/You/We/They ➔ HAVE + V3 | He/She/It ➔ HAS + V3.',
              formula: 'I/You/We/They HAVE + V3  |  He/She/It HAS + V3',
              example: 'We have seen this movie. He has bought a car.',
              exampleRu: 'We have seen this movie. He has bought a car.',
            },
            exercises: [
              { text: 'They ___ a new house.', options: ['have bought', 'has bought', 'buys'], correct: 0, explanation: 'They + have bought.', explanationRu: "They + have bought." },
              { text: 'My brother ___ his exam.', options: ['has passed', 'have passed', 'passed'], correct: 0, explanation: 'My brother (he) + has passed.', explanationRu: "My brother (he) + has passed." },
            ],
          },
          {
            teach: {
              rule: 'Inkor: haven\'t / hasn\'t + V3. Savol: Have / Has + Subject + V3 ?',
              ruleRu: 'Отрицание: haven\'t / hasn\'t + V3. Вопрос: Have / Has + Subject + V3 ?',
              formula: 'Negative: haven\'t/hasn\'t + V3  |  Question: Have/Has + S + V3 ?',
              example: 'I haven\'t seen him today. Have you finished yet?',
              exampleRu: 'I haven\'t seen him today. Have you finished yet?',
            },
            exercises: [
              { text: 'I ___ my breakfast yet.', options: ["haven't had", "hasn't had", "don't have"], correct: 0, explanation: 'I + haven\'t had.', explanationRu: "I + haven't had." },
              { text: '___ you ever visited London?', options: ['Have', 'Has', 'Did'], correct: 0, explanation: 'You savolida: Have you ever visited...', explanationRu: "В вопросе с You: Have you ever visited..." },
            ],
          },
          {
            teach: {
              rule: 'Vaqt ko\'rsatkichlari: already (allaqachon), just (xotirgina/hina), yet (hali - inkor/savol), ever (xech), never (hech qachon).',
              ruleRu: 'Маркеры времени: already, just, yet, ever, never.',
              formula: 'have/has + just/already/ever/never + V3  |  ... + yet (end of sentence)',
              example: 'I have just arrived. She has never tried sushi. Have you finished yet?',
              exampleRu: 'I have just arrived. She has never tried sushi.',
            },
            exercises: [
              { text: 'She has ___ finished her report.', options: ['already', 'yet', 'ever'], correct: 0, explanation: 'have/has va V3 orasida: already.', explanationRu: "между have/has и V3: already." },
              { text: 'I haven\'t read this book ___ .', options: ['yet', 'already', 'just'], correct: 0, explanation: 'Inkor gap oxirida: yet.', explanationRu: "В конце отрицательного предложения: yet." },
            ],
          },
          {
            teach: {
              rule: 'Present Perfect Simple tasdiq, inkor va savollarini birlashtiramiz.',
              ruleRu: 'Обобщим все формы Present Perfect Simple.',
              formula: 'have/has + V3  |  haven\'t/hasn\'t + V3  |  Have/Has + S + V3 ?',
              example: 'I have already done my homework, but I haven\'t sent it yet.',
              exampleRu: 'I have already done my homework, but I haven\'t sent it yet.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['Have you ever flown in a helicopter?', 'Has you ever flown in a helicopter?'], correct: 0, explanation: 'Have you ever flown...', explanationRu: "Have you ever flown..." },
              { text: 'Choose the correct sentence:', options: ['He has already cleaned his room.', 'He have already cleaned his room.'], correct: 0, explanation: 'He + has already cleaned.', explanationRu: "He + has already cleaned." },
              { text: 'Select the correct sentence:', options: ['We haven\'t decided what to do yet.', 'We hasn\'t decided what to do yet.'], correct: 0, explanation: 'We + haven\'t decided.', explanationRu: "We + haven't decided." },
            ],
          },
        ],
      },
      {
        id: 'sec-present-perfect-l2',
        order: 2,
        title: 'FOR va SINCE bilan qo\'llanishi',
        titleRu: 'Использование с FOR и SINCE',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: 'FOR — harakat qancha vaqt (davomiylik/davomiylik muddati) davom etganini ko\'rsatadi: for 2 hours, for 5 years, for 3 days, for a long time.',
              ruleRu: 'FOR используется для указания длительности периода времени (for 2 hours, for 5 years).',
              formula: 'FOR + Period of time (duration)',
              example: 'I have lived here for 10 years. (Men bu yerda 10 yildan beri yashayman.)',
              exampleRu: 'I have lived here for 10 years.',
            },
            exercises: [
              { text: 'I have known him ___ 5 years.', options: ['for', 'since', 'during'], correct: 0, explanation: 'Vaqt oralig\'i (5 years) -> for.', explanationRu: "Промежуток времени (5 years) -> for." },
              { text: 'She has been sick ___ three days.', options: ['for', 'since', 'from'], correct: 0, explanation: '3 kun davomida -> for.', explanationRu: "В течение 3 дней -> for." },
            ],
          },
          {
            teach: {
              rule: 'SINCE — harakatning boshlangan anil vaqtini/nuqtasini ko\'rsatadi: since morning, since 2015, since Monday, since I was a child.',
              ruleRu: 'SINCE указывает на начальную точку времени (since 2015, since morning).',
              formula: 'SINCE + Starting point in time',
              example: 'He has worked here since 2018. (U 2018 yildan beri bu yerda ishlaydi.)',
              exampleRu: 'He has worked here since 2018.',
            },
            exercises: [
              { text: 'We have lived in Tashkent ___ 2020.', options: ['since', 'for', 'from'], correct: 0, explanation: 'Boshlanish yili (2020) -> since.', explanationRu: "Год начала (2020) -> since." },
              { text: 'She hasn\'t eaten anything ___ this morning.', options: ['since', 'for', 'ago'], correct: 0, explanation: 'Bugun ertalabdan beri -> since.', explanationRu: "С сегодняшнего утра -> since." },
            ],
          },
          {
            teach: {
              rule: 'FOR vs SINCE taqqoslamasi: FOR + vaqt miqdori (2 hours) | SINCE + soat/sana/boshlanish nuqtasi (2 o\'clock).',
              ruleRu: 'FOR + количество времени | SINCE + точное время начала.',
              formula: 'FOR 2 hours / 3 days / 5 years  |  SINCE 2 o\'clock / Monday / 2015',
              example: 'for 6 months  vs  since June',
              exampleRu: 'for 6 months vs since June',
            },
            exercises: [
              { text: 'Choose the correct preposition: They have been friends ___ a long time.', options: ['for', 'since'], correct: 0, explanation: 'a long time -> for.', explanationRu: "a long time -> for." },
              { text: 'Choose the correct preposition: I haven\'t seen her ___ last week.', options: ['since', 'for'], correct: 0, explanation: 'last week -> since.', explanationRu: "last week -> since." },
            ],
          },
          {
            teach: {
              rule: '"How long have you ...?" — "Qancha vaqtdan beri ... san?" so\'rovi.',
              ruleRu: '"How long have you ...?" — вопрос о продолжительности.',
              formula: 'How long + have/has + Subject + V3 (or been V-ing) ?',
              example: 'How long have you known each other? — We have been friends for 3 years.',
              exampleRu: 'How long have you known each other?',
            },
            exercises: [
              { text: '___ have you worked in this company?', options: ['How long', 'How many', 'How much'], correct: 0, explanation: 'Davomiylik so\'rovi: How long...', explanationRu: "Вопрос о длительности: How long..." },
              { text: '— How long has she lived here? — She has lived here ___ 2010.', options: ['since', 'for', 'from'], correct: 0, explanation: '2010 yildan beri -> since.', explanationRu: "С 2010 года -> since." },
            ],
          },
          {
            teach: {
              rule: 'FOR va SINCE qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим правила использования FOR и SINCE.',
              formula: 'for + duration  |  since + starting point',
              example: 'I have studied English for 3 years, ever since 2021.',
              exampleRu: 'I have studied English for 3 years, ever since 2021.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I have known my best friend for 10 years.', 'I have known my best friend since 10 years.'], correct: 0, explanation: '10 years -> for.', explanationRu: "10 years -> for." },
              { text: 'Choose the correct sentence:', options: ['She has worked here since 2018.', 'She has worked here for 2018.'], correct: 0, explanation: '2018 -> since.', explanationRu: "2018 -> since." },
              { text: 'Select the correct sentence:', options: ['How long have you had this phone?', 'How long do you have this phone?'], correct: 0, explanation: 'How long have you had...', explanationRu: "How long have you had..." },
            ],
          },
        ],
      },
      {
        id: 'sec-present-perfect-l3',
        order: 3,
        title: 'Present Perfect Continuous (have/has been + V-ing)',
        titleRu: 'Present Perfect Continuous (have/has been + V-ing)',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: 'Present Perfect Continuous — o\'tmishda boshlanib, hozir ham davom etayotgan yoki yangigina tugab, izi/natijasi hozir ko\'rinib turgan jarayonlar uchun ishlatiladi.',
              ruleRu: 'Present Perfect Continuous используется для процессов, начавшихся в прошлом и продолжающихся до сих пор или только что закончившихся.',
              formula: 'Subject + have / has been + Verb-ing',
              example: 'I have been waiting for 2 hours. (Men 2 soatdan beri kutayapman.)',
              exampleRu: 'I have been waiting for 2 hours.',
            },
            exercises: [
              { text: 'I ___ English for two years now.', options: ['have been learning', 'has been learning', 'am learning'], correct: 0, explanation: 'I + have been learning.', explanationRu: "I + have been learning." },
              { text: 'It ___ all morning.', options: ['has been raining', 'have been raining', 'is raining'], correct: 0, explanation: 'It + has been raining.', explanationRu: "It + has been raining." },
            ],
          },
          {
            teach: {
              rule: 'Egalar bilan moslashuvi: I/You/We/They ➔ HAVE BEEN + V-ing  |  He/She/It ➔ HAS BEEN + V-ing.',
              ruleRu: 'I/You/We/They ➔ HAVE BEEN + V-ing | He/She/It ➔ HAS BEEN + V-ing.',
              formula: 'I/You/We/They HAVE BEEN + V-ing  |  He/She/It HAS BEEN + V-ing',
              example: 'They have been playing football. She has been cooking for 3 hours.',
              exampleRu: 'They have been playing football. She has been cooking for 3 hours.',
            },
            exercises: [
              { text: 'They ___ tennis since 9 o\'clock.', options: ['have been playing', 'has been playing', 'are playing'], correct: 0, explanation: 'They + have been playing.', explanationRu: "They + have been playing." },
              { text: 'He ___ for the exam all week.', options: ['has been studying', 'have been studying', 'studies'], correct: 0, explanation: 'He + has been studying.', explanationRu: "He + has been studying." },
            ],
          },
          {
            teach: {
              rule: 'Inkor: haven\'t / hasn\'t been + V-ing. Savol: Have / Has + Subject + been + V-ing ?',
              ruleRu: 'Отрицание: haven\'t/hasn\'t been + V-ing. Вопрос: Have/Has + Subject + been + V-ing ?',
              formula: 'haven\'t/hasn\'t been + V-ing  |  Have/Has + S + been + V-ing ?',
              example: 'I haven\'t been sleeping well lately. Have you been waiting long?',
              exampleRu: 'I haven\'t been sleeping well lately. Have you been waiting long?',
            },
            exercises: [
              { text: 'She ___ feeling well recently.', options: ["hasn't been", "haven't been", "isn't been"], correct: 0, explanation: 'She + hasn\'t been feeling.', explanationRu: "She + hasn't been feeling." },
              { text: '___ you been working out?', options: ['Have', 'Has', 'Are'], correct: 0, explanation: 'You savolida: Have you been working...', explanationRu: "В вопросе с You: Have you been working..." },
            ],
          },
          {
            teach: {
              rule: '"How long have you been ...-ing?" — necha vaqtdan beri bu jarayon bajarilayotganini so\'rash.',
              ruleRu: '"How long have you been ...-ing?" — вопрос о продолжительности процесса.',
              formula: 'How long + have/has + Subject + been + Verb-ing ?',
              example: 'How long have you been learning French? — I have been learning it for 6 months.',
              exampleRu: 'How long have you been learning French?',
            },
            exercises: [
              { text: 'How long ___ she been living in London?', options: ['has', 'have', 'is'], correct: 0, explanation: 'She bilan: How long has she been living...', explanationRu: "С She: How long has she been living..." },
              { text: '— How long have you been waiting? — I ___ waiting since 3:00.', options: ['have been', 'has been', 'am'], correct: 0, explanation: 'I have been waiting.', explanationRu: "I have been waiting." },
            ],
          },
          {
            teach: {
              rule: 'Present Perfect Continuous shakllarini birlashtiramiz.',
              ruleRu: 'Обобщим все формы Present Perfect Continuous.',
              formula: 'have/has been + V-ing',
              example: 'Look at his clothes! He has been working in the garden.',
              exampleRu: 'Look at his clothes! He has been working in the garden.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I have been reading this book for two hours.', 'I have reading this book for two hours.'], correct: 0, explanation: 'have been reading (been shart).', explanationRu: "have been reading (been обязательно)." },
              { text: 'Choose the correct sentence:', options: ['Why are your hands dirty? — I have been fixing my bike.', 'Why are your hands dirty? — I have fixing my bike.'], correct: 0, explanation: 'have been fixing.', explanationRu: "have been fixing." },
              { text: 'Select the correct sentence:', options: ['She has been crying because of the sad film.', 'She has crying because of the sad film.'], correct: 0, explanation: 'has been crying.', explanationRu: "has been crying." },
            ],
          },
        ],
      },
      {
        id: 'sec-present-perfect-l4',
        order: 4,
        title: 'Present Perfect Simple vs Present Perfect Continuous (Farqlari)',
        titleRu: 'Различие Present Perfect Simple и Present Perfect Continuous',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: 'Diqqat markazi: NATIJA yoki MIQDOR (nechta/qancha bajarildi) ➔ Simple | JARAYON yoki DAVOMIYLIK (necha vaqt davom etdi) ➔ Continuous.',
              ruleRu: 'Фокус: Результат/Количество ➔ Simple | Процесс/Длительность ➔ Continuous.',
              formula: 'Completed result (How many/much) = Simple  |  Ongoing process (How long) = Continuous',
              example: 'I have painted 3 rooms. (3 ta xonani bo\'yab bo\'ldim - Simple) / I have been painting all morning. (Ertalabdan beri bo\'yayapman - Continuous)',
              exampleRu: 'I have painted 3 rooms vs I have been painting all morning.',
            },
            exercises: [
              { text: 'I ___ 5 letters this morning.', options: ['have written', 'have been writing', 'wrote'], correct: 0, explanation: 'Miqdor (5 letters) -> Present Perfect Simple (have written).', explanationRu: "Количество (5 letters) -> Present Perfect Simple (have written)." },
              { text: 'I ___ letters all morning.', options: ['have been writing', 'have written', 'am writing'], correct: 0, explanation: 'Davomiylik (all morning) -> Present Perfect Continuous.', explanationRu: "Длительность (all morning) -> Present Perfect Continuous." },
            ],
          },
          {
            teach: {
              rule: 'How many / How much / How many times ➔ Simple | How long ➔ Continuous.',
              ruleRu: 'How many/much/times ➔ Simple | How long ➔ Continuous.',
              formula: 'How many times ➔ Present Perfect Simple  |  How long ➔ Present Perfect Continuous',
              example: 'How many cups of coffee have you drunk today? / How long have you been drinking coffee?',
              exampleRu: 'How many times -> Simple / How long -> Continuous.',
            },
            exercises: [
              { text: 'How many times ___ you visited Japan?', options: ['have', 'have been', 'did'], correct: 0, explanation: 'How many times -> have you visited.', explanationRu: "How many times -> have you visited." },
              { text: 'How long ___ you been reading this book?', options: ['have', 'has', 'did'], correct: 0, explanation: 'How long -> have you been reading.', explanationRu: "How long -> have you been reading." },
            ],
          },
          {
            teach: {
              rule: 'Doimiy/Uzun muddatli holat ➔ Simple (I have lived here for 20 years) | Vaqtinchalik holat ➔ Continuous (I have been staying at a hotel for 3 days).',
              ruleRu: 'Постоянное состояние ➔ Simple | Временная ситуация ➔ Continuous.',
              formula: 'Permanent = Simple  |  Temporary = Continuous',
              example: 'My father has worked in a bank all his life. / I have been working here for 2 weeks.',
              exampleRu: 'Permanent vs Temporary.',
            },
            exercises: [
              { text: 'I ___ in Tashkent all my life.', options: ['have lived', 'have been living', 'am living'], correct: 0, explanation: 'Umrbod doimiy holat: have lived.', explanationRu: "Постоянное состояние всю жизнь: have lived." },
              { text: 'I ___ at my friend\'s house for a few days while my flat is decorated.', options: ['have been staying', 'have stayed', 'stayed'], correct: 0, explanation: 'Vaqtinchalik holat: have been staying.', explanationRu: "Временная ситуация: have been staying." },
            ],
          },
          {
            teach: {
              rule: 'Holat fe\'llari (Stative verbs: know, understand, believe, love, like, remember) HECH QACHON davomli (-ing) zamonda ishlatilmaydi ➔ faqat Present Perfect Simple!',
              ruleRu: 'Глаголы состояния (know, like...) НЕ используются в Continuous ➔ только Present Perfect Simple!',
              formula: 'Stative Verbs ➔ Present Perfect Simple ONLY (have known, have liked)',
              example: 'I have known him for 10 years. (I have been knowing EMAS!)',
              exampleRu: 'I have known him for 10 years.',
            },
            exercises: [
              { text: 'I ___ him since childhood.', options: ['have known', 'have been knowing', 'knowed'], correct: 0, explanation: 'know - holat fe\'li: have known.', explanationRu: "know — глагол состояния: have known." },
              { text: 'She ___ this car for 5 years.', options: ['has had', 'has been having', 'had'], correct: 0, explanation: 'have (ega bo\'lmoq) - holat fe\'li: has had.', explanationRu: "have (иметь) — глагол состояния: has had." },
            ],
          },
          {
            teach: {
              rule: 'Simple va Continuous farqini birlashtiramiz.',
              ruleRu: 'Обобщим различие между Present Perfect Simple и Continuous.',
              formula: 'Simple = Result/Count/Stative  |  Continuous = Duration/Process/Temporary',
              example: 'I have been baking cookies all morning, and I have baked 40 cookies so far.',
              exampleRu: 'I have been baking all morning, and I have baked 40 cookies so far.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I have read 50 pages of the book.', 'I have been reading 50 pages of the book.'], correct: 0, explanation: 'Natija/miqdor: have read 50 pages.', explanationRu: "Результат/количество: have read 50 pages." },
              { text: 'Choose the correct sentence:', options: ['My eyes hurt because I have been reading all day.', 'My eyes hurt because I have read all day.'], correct: 0, explanation: 'Jarayon: have been reading all day.', explanationRu: "Процесс: have been reading all day." },
              { text: 'Select the correct sentence:', options: ['We have known each other for 3 years.', 'We have been knowing each other for 3 years.'], correct: 0, explanation: 'know - holat fe\'li: have known.', explanationRu: "know — глагол состояния: have known." },
            ],
          },
        ],
      },
      {
        id: 'sec-present-perfect-l5',
        order: 5,
        title: 'Past Simple vs Present Perfect (Taqqoslash)',
        titleRu: 'Сравнение Past Simple и Present Perfect',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: 'Aniq ko\'rsatilgan o\'tgan vaqt (yesterday, 2 days ago, in 2018) ➔ Past Simple | Aniq bo\'lmagan vaqt / hozirgi alaqadorlik ➔ Present Perfect.',
              ruleRu: 'Точное прошедшее время (yesterday, ago) ➔ Past Simple | Точное время не указано / связь с настоящим ➔ Present Perfect.',
              formula: 'Specified Past Time ➔ Past Simple (V2)  |  Unspecified / Present Result ➔ Present Perfect (have/has V3)',
              example: 'I visited Paris in 2019. (Past Simple) / I have visited Paris twice. (Present Perfect)',
              exampleRu: 'I visited Paris in 2019 vs I have visited Paris.',
            },
            exercises: [
              { text: 'I ___ to London last year.', options: ['went', 'have gone', 'have been'], correct: 0, explanation: 'Aniq o\'tgan vaqt (last year) -> Past Simple (went).', explanationRu: "Точное прошедшее время (last year) -> Past Simple (went)." },
              { text: 'I ___ to London several times.', options: ['have been', 'went', 'go'], correct: 0, explanation: 'Tajriba ( several times) -> Present Perfect (have been).', explanationRu: "Опыт (several times) -> Present Perfect (have been)." },
            ],
          },
          {
            teach: {
              rule: 'Vaqt ko\'rsatkichlari: yesterday, ago, last week, in 2010 ➔ Past Simple | ever, never, just, already, yet, so far, since ➔ Present Perfect.',
              ruleRu: 'Маркеры: yesterday, ago (Past Simple) vs ever, never, just, already, yet (Present Perfect).',
              formula: 'Check time signals ➔ Select Past Simple or Present Perfect',
              example: 'Did you see Tom yesterday? / Have you seen Tom today?',
              exampleRu: 'Did you see Tom yesterday? vs Have you seen Tom today?',
            },
            exercises: [
              { text: '___ you ever eaten Mexican food?', options: ['Have', 'Did', 'Do'], correct: 0, explanation: 'ever -> Present Perfect (Have you ever eaten).', explanationRu: "ever -> Present Perfect (Have you ever eaten)." },
              { text: '___ you eat Mexican food yesterday?', options: ['Did', 'Have', 'Do'], correct: 0, explanation: 'yesterday -> Past Simple (Did you eat).', explanationRu: "yesterday -> Past Simple (Did you eat)." },
            ],
          },
          {
            teach: {
              rule: '"GONE TO" vs "BEEN TO": has gone to (ketgan va hali qaytmagan) vs has been to (borib kelgan/tajriba bor).',
              ruleRu: '"gone to" (ушел и еще там) vs "been to" (побывал и вернулся).',
              formula: 'has GONE to = still there  |  has BEEN to = visited and returned',
              example: 'Tom has gone to Italy. (U hozir Italiyada.) / Tom has been to Italy. (U Italiyada bo\'lgan va qaytgan.)',
              exampleRu: 'gone to (still there) vs been to (returned).',
            },
            exercises: [
              { text: 'Where is Mary? — She has ___ to the supermarket. She will be back in 20 minutes.', options: ['gone', 'been', 'went'], correct: 0, explanation: 'Hali u yerda, qaytmagan: has gone.', explanationRu: "Ещё там, не вернулся: has gone." },
              { text: 'I have ___ to Spain three times in my life.', options: ['been', 'gone', 'went'], correct: 0, explanation: 'Hayotiy tajriba, borib kelgan: have been.', explanationRu: "Жизненный опыт, съездил и вернулся: have been." },
            ],
          },
          {
            teach: {
              rule: 'Past Simple va Present Perfect o\'rtasidagi mantiqiy bog\'liqlik mashqlari.',
              ruleRu: 'Практика логического разграничения Past Simple и Present Perfect.',
              formula: 'Action finished in dead time = Past Simple | Action connected to present = Present Perfect',
              example: 'Shakespeare wrote many plays. (Past Simple - u vafot etgan) / J.K. Rowling has written many books.',
              exampleRu: 'Finished period vs Unfinished/Present connected.',
            },
            exercises: [
              { text: 'Shakespeare ___ Hamlet.', options: ['wrote', 'has written', 'writes'], correct: 0, explanation: 'Tarixiy shaxs, o\'tgan zamon: wrote.', explanationRu: "Историческая личность, прошедшее время: wrote." },
              { text: 'She ___ her leg, so she can\'t play tennis today.', options: ['has broken', 'broke', 'breaks'], correct: 0, explanation: 'Hozirgi natija (o\'ynay olmaydi): has broken.', explanationRu: "Текущий результат (не может играть): has broken." },
            ],
          },
          {
            teach: {
              rule: 'Past Simple va Present Perfect taqqoslamasini birlashtiramiz.',
              ruleRu: 'Обобщим сравнение Past Simple и Present Perfect.',
              formula: 'Past Simple (specific time) vs Present Perfect (result/experience)',
              example: 'I lost my keys yesterday, but I have found them today.',
              exampleRu: 'I lost my keys yesterday, but I have found them today.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I have bought a new car yesterday.', 'I bought a new car yesterday.'], correct: 1, explanation: 'yesterday -> Past Simple (bought).', explanationRu: "yesterday -> Past Simple (bought)." },
              { text: 'Choose the correct sentence:', options: ['Have you ever visited Uzbekistan?', 'Did you ever visit Uzbekistan?'], correct: 0, explanation: 'ever -> Have you ever visited.', explanationRu: "ever -> Have you ever visited." },
              { text: 'Select the correct sentence:', options: ['Where is Tom? — He has gone to the shop.', 'Where is Tom? — He has been to the shop.'], correct: 0, explanation: 'Hozir do\'konda: has gone to.', explanationRu: "Сейчас в магазине: has gone to." },
            ],
          },
        ],
      },
      {
        id: 'sec-present-perfect-l6',
        order: 6,
        title: 'Aralash amaliyot va Xatolarni tuzatish (Present Perfect)',
        titleRu: 'Смешанная практика и Исправление ошибок (Present Perfect)',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: 'Eng ko\'p uchraydigan 3 ta xato: 1) I have saw ❌ ➔ I have seen ✅  2) I am living here since 2020 ❌ ➔ I have been living here since 2020 ✅  3) I have been knowing ❌ ➔ I have known ✅.',
              ruleRu: '3 частые ошибки: 1) have saw ❌ ➔ have seen ✅  2) am living since ❌ ➔ have been living since ✅  3) have been knowing ❌ ➔ have known ✅.',
              formula: 'Check list: 1) have/has + V3 | 2) since/for = Present Perfect | 3) Stative verb = Simple',
              example: 'I have seen it. I have been living here since 2020. I have known her for years.',
              exampleRu: 'I have seen it. I have been living here since 2020. I have known her for years.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I have seen that movie twice.', 'I have saw that movie twice.'], correct: 0, explanation: 'have + V3 (seen).', explanationRu: "have + V3 (seen)." },
              { text: 'Choose the correct sentence:', options: ['She has been working here since Monday.', 'She is working here since Monday.'], correct: 0, explanation: 'since Monday -> has been working.', explanationRu: "since Monday -> has been working." },
            ],
          },
          {
            teach: {
              rule: 'Real dialog va muloqotlarda Present Perfect Simple va Continuous qo\'llash.',
              ruleRu: 'Практика диалогов с Present Perfect Simple и Continuous.',
              formula: 'Dialogue context: Experience/Result vs Ongoing duration',
              example: '— You look tired! — Yes, I have been running. — How far have you run? — 5 kilometers!',
              exampleRu: 'Continuous (duration) vs Simple (result).',
            },
            exercises: [
              { text: '— Why are your clothes dirty? — I ___ the car.', options: ['have been cleaning', 'have cleaned', 'cleaned'], correct: 0, explanation: 'Yangi tugagan va izi bor jarayon: have been cleaning.', explanationRu: "Только что завершившийся процесс со следом: have been cleaning." },
              { text: '— How many pages have you read? — I ___ 30 pages so far.', options: ['have read', 'have been reading', 'readed'], correct: 0, explanation: 'Miqdor (30 pages): have read.', explanationRu: "Количество (30 pages): have read." },
            ],
          },
          {
            teach: {
              rule: 'Hayotiy tajriba va davomiyliklar haqida matn tuzish mashqlari.',
              ruleRu: 'Составление рассказов об опыте и длительности.',
              formula: 'Experience (have V3) + Duration (have been V-ing for/since)',
              example: 'I have lived in London for 3 years. I have met many interesting people.',
              exampleRu: 'I have lived in London for 3 years. I have met many interesting people.',
            },
            exercises: [
              { text: 'I ___ in this company for 5 years, and I ___ three promotions.', options: ['have been working / have received', 'am working / received', 'worked / have received'], correct: 0, explanation: 'have been working / have received.', explanationRu: "have been working / have received." },
              { text: 'Select the correct sentence:', options: ['He has been learning English since last year.', 'He is learning English since last year.'], correct: 0, explanation: 'since last year -> has been learning.', explanationRu: "since last year -> has been learning." },
            ],
          },
          {
            teach: {
              rule: 'Gaplarni to\'g\'ri tarjima va shakllantirish mashqlari.',
              ruleRu: 'Упражнения на перевод и правильно образование форм.',
              formula: 'Match meaning ➔ Select Simple (result/count) or Continuous (duration/process)',
              example: 'Men ko\'pdan beri kutayapman: I have been waiting for a long time.',
              exampleRu: 'I have been waiting for a long time.',
            },
            exercises: [
              { text: 'Men bu kitobni 2 soatdan beri o\'qiyapman:', options: ['I have been reading this book for 2 hours.', 'I am reading this book since 2 hours.'], correct: 0, explanation: 'have been reading ... for 2 hours.', explanationRu: "have been reading ... for 2 hours." },
              { text: 'U allaqachon uy vazifasini bajarib bo\'lgan:', options: ['He has already done his homework.', 'He has already been doing his homework.'], correct: 0, explanation: 'has already done (natija).', explanationRu: "has already done (результат)." },
            ],
          },
          {
            teach: {
              rule: 'Section 16 Present Perfect (Simple & Continuous) bo\'yicha yakuniy master formula.',
              ruleRu: 'Итоговая главная формула Present Perfect.',
              formula: 'Master Present Perfect Rule: Result/Count = have/has V3 | Duration/Process = have/has been V-ing | Specified past time = V2',
              example: 'I have done it. I have been doing it for 2 hours. I did it yesterday.',
              exampleRu: 'I have done it. I have been doing it for 2 hours. I did it yesterday.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['I have been studying for the exam all day.', 'I have studied for the exam all day ongoing.'], correct: 0, explanation: 'have been studying.', explanationRu: "have been studying." },
              { text: 'Choose the correct sentence:', options: ['She has visited 10 countries so far.', 'She has been visiting 10 countries so far.'], correct: 0, explanation: 'Miqdor (10 countries): has visited.', explanationRu: "Количество (10 countries): has visited." },
              { text: 'Select the correct sentence:', options: ['We have lived in this town since 2015.', 'We are living in this town since 2015.'], correct: 0, explanation: 'since 2015 -> have lived.', explanationRu: "since 2015 -> have lived." },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Present Perfect va Present Perfect Continuous",
      titleRu: 'Тест раздела: Present Perfect и Present Perfect Continuous',
      exercises: [
        { text: 'I ___ my homework already.', options: ['have finished', 'finished', 'have been finishing'], correct: 0, explanation: 'already -> have finished.', explanationRu: "already -> have finished." },
        { text: 'She ___ in Tashkent since 2018.', options: ['has lived', 'lives', 'is living'], correct: 0, explanation: 'since 2018 -> has lived.', explanationRu: "since 2018 -> has lived." },
        { text: 'We have been waiting for the bus ___ 40 minutes.', options: ['for', 'since', 'from'], correct: 0, explanation: '40 minutes -> for.', explanationRu: "40 minutes -> for." },
        { text: 'I haven\'t seen my uncle ___ last year.', options: ['since', 'for', 'ago'], correct: 0, explanation: 'last year -> since.', explanationRu: "last year -> since." },
        { text: 'How long ___ you been learning English?', options: ['have', 'has', 'are'], correct: 0, explanation: 'How long have you been...', explanationRu: "How long have you been..." },
        { text: 'Look at her! She is wet because she ___ in the rain.', options: ['has been walking', 'has walked', 'walks'], correct: 0, explanation: 'Izi bor jarayon: has been walking.', explanationRu: "Процесс со следом: has been walking." },
        { text: 'I have ___ 4 cups of coffee today.', options: ['drunk', 'been drinking', 'drinked'], correct: 0, explanation: 'Miqdor (4 cups): have drunk.', explanationRu: "Количество (4 cups): have drunk." },
        { text: 'I ___ him since we were at university.', options: ['have known', 'have been knowing', 'knew'], correct: 0, explanation: 'know - holat fe\'li: have known.', explanationRu: "know — глагол состояния: have known." },
        { text: 'I ___ to London in 2021.', options: ['went', 'have gone', 'have been'], correct: 0, explanation: 'Aniq vaqt (in 2021) -> Past Simple (went).', explanationRu: "Точное время (in 2021) -> Past Simple (went)." },
        { text: 'Where is John? — She has ___ to the bank.', options: ['gone', 'been', 'went'], correct: 0, explanation: 'Hali u yerda: has gone.', explanationRu: "Ещё там: has gone." },
        { text: 'Choose the correct sentence:', options: ['She has lived here for 5 years.', 'She has lived here since 5 years.'], correct: 0, explanation: '5 years -> for.', explanationRu: "5 years -> for." },
        { text: 'Choose the correct sentence:', options: ['Have you ever been to Japan?', 'Did you ever been to Japan?'], correct: 0, explanation: 'Have you ever been...', explanationRu: "Have you ever been..." },
        { text: 'Select the correct sentence:', options: ['My hands are covered in paint because I have been painting the kitchen.', 'My hands are covered in paint because I have painted the kitchen.'], correct: 0, explanation: 'Izi bor jarayon: have been painting.', explanationRu: "Процесс со следом: have been painting." },
        { text: 'Select the correct sentence:', options: ['I bought this car 2 years ago.', 'I have bought this car 2 years ago.'], correct: 0, explanation: '2 years ago -> Past Simple (bought).', explanationRu: "2 years ago -> Past Simple (bought)." },
        { text: 'Select the correct sentence:', options: ['How many times have you seen this movie?', 'How long have you seen this movie?'], correct: 0, explanation: 'How many times have you seen...', explanationRu: "How many times have you seen..." },
      ],
    },
  },
  {
    id: 'sec-adjectives-comparison',
    order: 17,
    title: 'Sifat darajalari — Comparative, Superlative va As...as',
    titleRu: 'Степени сравнения прилагательных — Comparative, Superlative и As...as',
    icon: '📊',
    lessons: [
      {
        id: 'sec-adj-l1',
        order: 1,
        title: 'Oddiy daraja va As...as / Not as...as',
        titleRu: 'Положительная степень и As...as / Not as...as',
        icon: '1️⃣',
        units: [
          {
            teach: {
              rule: 'Oddiy daraja (Positive degree) — sifatning hech qanday qo\'shimchasiz o\'z shakli: tall (baland), fast (tez), expensive (qimmat).',
              ruleRu: 'Положительная степень (Positive degree) — исходная форма прилагательного без добавок: tall, fast, expensive.',
              formula: 'Subject + be + Adjective',
              example: 'This car is fast. (Bu mashina tez.) She is tall. (U baland bo\'yli.)',
              exampleRu: 'This car is fast. She is tall.',
            },
            exercises: [
              { text: 'This house is ___.', options: ['big', 'bigger', 'biggest'], correct: 0, explanation: 'Oddiy sifat shakli: big.', explanationRu: "Простая форма прилагательного: big." },
              { text: 'She is a ___ girl.', options: ['smart', 'smarter', 'smartest'], correct: 0, explanation: 'Oddiy sifat: smart.', explanationRu: "Простая форма прилагательного: smart." },
            ],
          },
          {
            teach: {
              rule: 'Tenglik darajasi: AS + Adjective + AS ("...dek / ... kabi ..."). Ikki narsa yoki shaxs bir xil teng ekanligini ko\'rsatadi.',
              ruleRu: 'Сравнение равенства: AS + Adjective + AS ("такой же ... как"). Показывает равенство признаков.',
              formula: 'Subject + be + AS + Adjective + AS + Object',
              example: 'Tom is as tall as Bob. (Tom Bob kabi baland bo\'yli.)',
              exampleRu: 'Tom is as tall as Bob.',
            },
            exercises: [
              { text: 'He is as ___ as his father.', options: ['tall', 'taller', 'tallest'], correct: 0, explanation: 'as ... as orasida oddiy sifat turadi: tall.', explanationRu: "Между as ... as стоит простая форма прилагательного: tall." },
              { text: 'My phone is ___ expensive as yours.', options: ['as', 'more', 'so'], correct: 0, explanation: 'Tenglik strukturasi: as expensive as.', explanationRu: "Конструкция равенства: as expensive as." },
            ],
          },
          {
            teach: {
              rule: 'Tengsizlik / Inkor: NOT AS + Adjective + AS ("...chalik emas / ...dek emas").',
              ruleRu: 'Отрицательное сравнение: NOT AS + Adjective + AS ("не такой ... как").',
              formula: 'Subject + be NOT + AS + Adjective + AS + Object',
              example: 'This car is not as fast as a train. (Bu mashina poezdchalik tez emas.)',
              exampleRu: 'This car is not as fast as a train.',
            },
            exercises: [
              { text: 'Silver is not ___ expensive as gold.', options: ['as', 'more', 'than'], correct: 0, explanation: 'not as ... as tengsizlik strukturasi.', explanationRu: "Конструкция неравенства not as ... as." },
              { text: 'Choose the correct sentence:', options: ['Today is not as cold as yesterday.', 'Today is not cold than yesterday.'], correct: 0, explanation: 'Inkor tenglikda: not as cold as.', explanationRu: "Отрицательное сравнение: not as cold as." },
            ],
          },
          {
            teach: {
              rule: 'as...as birikmasidan keyin kishilik olmoshining obyekt shakli (me, him, her, us, them) yoki ega + fe\'l (he is, I am) keladi.',
              ruleRu: 'После as...as используется объектное местоимение (me, him) или подлежащее + глагол (he is).',
              formula: 'as ... as + me / him / her  OR  as ... as + he is / I am',
              example: 'She is as old as me. / She is as old as I am.',
              exampleRu: 'She is as old as me. / She is as old as I am.',
            },
            exercises: [
              { text: 'He runs as fast as ___.', options: ['me', 'my', 'mine'], correct: 0, explanation: 'as fast as me (obyekt olmoshi).', explanationRu: "as fast as me (объектное местоимение)." },
              { text: 'She is as smart as ___.', options: ['he is', 'he does', 'his'], correct: 0, explanation: 'as smart as he is.', explanationRu: "as smart as he is." },
            ],
          },
          {
            teach: {
              rule: 'as...as va not as...as qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим правила использования as...as и not as...as.',
              formula: 'as + adjective + as  |  not as + adjective + as',
              example: 'My car is as new as yours, but it is not as fast.',
              exampleRu: 'My car is as new as yours, but it is not as fast.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['English is as easy as German.', 'English is as easier as German.'], correct: 0, explanation: 'as...as orasida oddiy sifat: easy.', explanationRu: "Между as...as простая форма прилагательного: easy." },
              { text: 'Choose the correct sentence:', options: ['He is not as tall as his brother.', 'He is not as taller as his brother.'], correct: 0, explanation: 'not as tall as (oddiy sifat).', explanationRu: "not as tall as (простая форма)." },
              { text: 'Select the correct sentence:', options: ['This test was as hard as the last one.', 'This test was as harder than the last one.'], correct: 0, explanation: 'as hard as.', explanationRu: "as hard as." },
            ],
          },
        ],
      },
      {
        id: 'sec-adj-l2',
        order: 2,
        title: 'Comparative Degree — Qisqa sifatlar (-er + than)',
        titleRu: 'Сравнительная степень — Короткие прилагательные (-er + than)',
        icon: '2️⃣',
        units: [
          {
            teach: {
              rule: 'Qiyosiy daraja (Comparative degree) — ikki narsa/shaxsni taqqoslashda ishlatiladi. Bir bo\'g\'inli qisqa sifatlarga "-er" qo\'shiladi va qiyoslash so\'zi "than" (...dan ko\'ra) ishlatiladi.',
              ruleRu: 'Сравнительная степень для односложных прилагательных образуется с помощью окончания "-er" и слова "than" (чем).',
              formula: 'Short Adjective + -ER + THAN',
              example: 'Tom is taller than Bob. (Tom Bobdan ko\'ra baland bo\'yli.)',
              exampleRu: 'Tom is taller than Bob.',
            },
            exercises: [
              { text: 'A train is ___ than a car.', options: ['faster', 'fast', 'fastest'], correct: 0, explanation: 'Qiyosiy daraja: fast + er ➔ faster.', explanationRu: "Сравнительная степень: fast + er ➔ faster." },
              { text: 'Mount Everest is ___ than K2.', options: ['higher', 'high', 'highest'], correct: 0, explanation: 'high + er ➔ higher.', explanationRu: "high + er ➔ higher." },
            ],
          },
          {
            teach: {
              rule: 'Imlo qoidasi 1: Sifat "-e" bilan tugasa, faqat "-r" qo\'shiladi (nice ➔ nicer, large ➔ larger). Undosh + unli + undosh bilan tugasa, oxirgi undosh ikkilanadi (big ➔ bigger, hot ➔ hotter).',
              ruleRu: 'Правило орфографии 1: если -e, добавляем -r (nicer). Если гласная + согласная, удваиваем (bigger, hotter).',
              formula: 'nice ➔ nicer  |  big ➔ bigger  |  hot ➔ hotter',
              example: 'Russia is bigger than China. Summer is hotter than winter.',
              exampleRu: 'Russia is bigger than China. Summer is hotter than winter.',
            },
            exercises: [
              { text: 'An elephant is ___ than a horse.', options: ['bigger', 'biger', 'more big'], correct: 0, explanation: 'big ➔ bigger (g ikkilanadi).', explanationRu: "big ➔ bigger (g удваивается)." },
              { text: 'Today is ___ than yesterday.', options: ['hotter', 'hoter', 'more hot'], correct: 0, explanation: 'hot ➔ hotter (t ikkilanadi).', explanationRu: "hot ➔ hotter (t удваивается)." },
            ],
          },
          {
            teach: {
              rule: 'Imlo qoidasi 2: Sifat 2 bo\'g\'inli bo\'lib, "-y" bilan tugasa, "-y" tushib qolib, "-ier" qo\'shiladi: happy ➔ happier, easy ➔ easier, heavy ➔ heavier.',
              ruleRu: 'Правило орфографии 2: двусложные на "-y" меняют "-y" на "-ier": happy ➔ happier, easy ➔ easier.',
              formula: 'Adjective ending in -y ➔ -IER + THAN',
              example: 'English is easier than Chinese. She looks happier today.',
              exampleRu: 'English is easier than Chinese.',
            },
            exercises: [
              { text: 'This exam was ___ than the last one.', options: ['easier', 'easyer', 'more easy'], correct: 0, explanation: 'easy ➔ easier (y ➔ ier).', explanationRu: "easy ➔ easier (y ➔ ier)." },
              { text: 'Health is ___ than wealth.', options: ['heavier', 'heavier than', 'more heavy'], correct: 0, explanation: 'heavy ➔ heavier.', explanationRu: "heavy ➔ heavier." },
            ],
          },
          {
            teach: {
              rule: 'Qiyoslashda taqqoslanayotgan ikkinchi obyekt oldidan doim "THAN" ishlatiladi.',
              ruleRu: 'В сравнении перед вторым объектом всегда используется "THAN".',
              formula: 'Comparative Adjective + THAN + Object',
              example: 'He is younger than me. (U mendan yoshroq.)',
              exampleRu: 'He is younger than me.',
            },
            exercises: [
              { text: 'She is older ___ her sister.', options: ['than', 'then', 'that'], correct: 0, explanation: 'Qiyoslashda: than.', explanationRu: "В сравнении: than." },
              { text: 'Choose the correct sentence:', options: ['My room is cleaner than yours.', 'My room is cleaner then yours.'], correct: 0, explanation: 'To\'g\'ri so\'z: than.', explanationRu: "Правильное слово: than." },
            ],
          },
          {
            teach: {
              rule: 'Qisqa sifatlarning qiyosiy darajasini birlashtiramiz.',
              ruleRu: 'Обобщим сравнительную степень коротких прилагательных.',
              formula: 'Adjective + -er/-ier + THAN',
              example: 'A plane is faster, bigger, and higher than a helicopter.',
              exampleRu: 'A plane is faster, bigger, and higher than a helicopter.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['This suitcase is heavier than that one.', 'This suitcase is more heavy than that one.'], correct: 0, explanation: 'heavy ➔ heavier.', explanationRu: "heavy ➔ heavier." },
              { text: 'Choose the correct sentence:', options: ['My brother is taller than me.', 'My brother is more tall than me.'], correct: 0, explanation: 'tall ➔ taller.', explanationRu: "tall ➔ taller." },
              { text: 'Select the correct sentence:', options: ['Yesterday was colder than today.', 'Yesterday was coldier than today.'], correct: 0, explanation: 'cold ➔ colder.', explanationRu: "cold ➔ colder." },
            ],
          },
        ],
      },
      {
        id: 'sec-adj-l3',
        order: 3,
        title: 'Comparative Degree — Uzun sifatlar (more / less + than)',
        titleRu: 'Сравнительная степень — Длинные прилагательные (more / less + than)',
        icon: '3️⃣',
        units: [
          {
            teach: {
              rule: 'Ikki yoki undan ortiq bo\'g\'inli uzun sifatlarda "-er" qo\'shilmaydi. Ularning oldiga "MORE" (ko\'proq) qo\'yiladi: more expensive, more beautiful, more interesting.',
              ruleRu: 'Для многосложных прилагательных используется слово "MORE" (более): more expensive, more beautiful.',
              formula: 'MORE + Long Adjective + THAN',
              example: 'A sports car is more expensive than a regular car.',
              exampleRu: 'A sports car is more expensive than a regular car.',
            },
            exercises: [
              { text: 'This book is ___ than the film.', options: ['more interesting', 'interesting er', 'interestinger'], correct: 0, explanation: 'Uzun sifat: more interesting.', explanationRu: "Длинное прилагательное: more interesting." },
              { text: 'Paris is ___ than my hometown.', options: ['more beautiful', 'beautifuler', 'beautifuler than'], correct: 0, explanation: 'Uzun sifat: more beautiful.', explanationRu: "Длинное прилагательное: more beautiful." },
            ],
          },
          {
            teach: {
              rule: '"Kamroq" ma\'nosida "LESS" so\'zi qo\'llaniladi: less expensive (kamroq qimmat / arzonroq), less difficult (kamroq qiyin).',
              ruleRu: 'В значении "менее" используется слово "LESS": less expensive, less difficult.',
              formula: 'LESS + Adjective + THAN',
              example: 'This test is less difficult than the previous one.',
              exampleRu: 'This test is less difficult than the previous one.',
            },
            exercises: [
              { text: 'Walking is ___ dangerous than riding a motorcycle.', options: ['less', 'least', 'fewer'], correct: 0, explanation: 'Kamroq xavfli: less dangerous.', explanationRu: "Менее опасно: less dangerous." },
              { text: 'Choose the correct sentence:', options: ['This task is less complicated than that one.', 'This task is more less complicated than that one.'], correct: 0, explanation: 'less complicated.', explanationRu: "less complicated." },
            ],
          },
          {
            teach: {
              rule: 'Qiyosiy darajani kuchaytirish uchun oldidan MUCH, A LOT, FAR qo\'yiladi: much bigger (ancha kattaroq), a lot more expensive (juda ko\'p qimmatroq).',
              ruleRu: 'Усиление сравнения: MUCH, A LOT, FAR (намного): much bigger, a lot more expensive.',
              formula: 'MUCH / A LOT / FAR + Comparative Adjective',
              example: 'China is much bigger than Italy. This computer is a lot more expensive.',
              exampleRu: 'China is much bigger than Italy.',
            },
            exercises: [
              { text: 'An airplane is ___ faster than a car.', options: ['much', 'more', 'very'], correct: 0, explanation: 'Qiyosiylikni kuchaytirish: much faster (very faster bo\'lmaydi!).', explanationRu: "Усиление сравнения: much faster (не бывает very faster!)." },
              { text: 'Living in London is ___ more expensive than in my town.', options: ['a lot', 'very', 'many'], correct: 0, explanation: 'a lot more expensive.', explanationRu: "a lot more expensive." },
            ],
          },
          {
            teach: {
              rule: 'Borgan sari oshib borish: "... va ..." (colder and colder, more and more expensive).',
              ruleRu: 'Постепенное изменение: colder and colder, more and more expensive.',
              formula: 'Comparative AND Comparative  |  MORE AND MORE + Adjective',
              example: 'It is getting colder and colder. Life is becoming more and more expensive.',
              exampleRu: 'It is getting colder and colder.',
            },
            exercises: [
              { text: 'The weather is getting ___ and colder.', options: ['colder', 'cold', 'coldest'], correct: 0, explanation: 'colder and colder.', explanationRu: "colder and colder." },
              { text: 'English is becoming ___ popular around the world.', options: ['more and more', 'more and most', 'most and most'], correct: 0, explanation: 'more and more popular.', explanationRu: "more and more popular." },
            ],
          },
          {
            teach: {
              rule: 'Uzun sifatlar qiyosiy darajasini birlashtiramiz.',
              ruleRu: 'Обобщим сравнительную степень длинных прилагательных.',
              formula: 'more / less + Adjective + THAN  |  much / a lot + Comparative',
              example: 'This method is much more effective than the old one.',
              exampleRu: 'This method is much more effective than the old one.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['Health is much more important than money.', 'Health is very more important than money.'], correct: 0, explanation: 'much more important (very qullanilmaydi).', explanationRu: "much more important (very не используется)." },
              { text: 'Choose the correct sentence:', options: ['This apartment is more comfortable than that house.', 'This apartment is comfortabler than that house.'], correct: 0, explanation: 'more comfortable.', explanationRu: "more comfortable." },
              { text: 'Select the correct sentence:', options: ['Computers are getting cheaper and cheaper.', 'Computers are getting more cheap and more cheap.'], correct: 0, explanation: 'cheaper and cheaper.', explanationRu: "cheaper and cheaper." },
            ],
          },
        ],
      },
      {
        id: 'sec-adj-l4',
        order: 4,
        title: 'Superlative Degree — Orttirma daraja (the -est / the most)',
        titleRu: 'Превосходная степень — Superlative (the -est / the most)',
        icon: '4️⃣',
        units: [
          {
            teach: {
              rule: 'Orttirma daraja (Superlative degree) — 3 yoki undan ortiq narsalar ichida eng ustunini ko\'rsatadi. Doim "THE" artikli bilan ishlatiladi! Qisqa sifatlarga "-est" qo\'shiladi: the tallest, the fastest, the happiest.',
              ruleRu: 'Превосходная степень сравнения 3 и более объектов. Всегда с артиклем "THE"! Окончание "-est": the tallest, the biggest.',
              formula: 'THE + Short Adjective + -EST',
              example: 'Mount Everest is the highest mountain in the world.',
              exampleRu: 'Mount Everest is the highest mountain in the world.',
            },
            exercises: [
              { text: 'Cheetah is ___ land animal in the world.', options: ['the fastest', 'fastest', 'faster'], correct: 0, explanation: 'Orttirma darajada artikl shart: the fastest.', explanationRu: "В превосходной степени артикль обязателен: the fastest." },
              { text: 'Jupiter is ___ planet in our solar system.', options: ['the biggest', 'the bigest', 'more big'], correct: 0, explanation: 'the biggest (g ikkilanadi).', explanationRu: "the biggest (g удваивается)." },
            ],
          },
          {
            teach: {
              rule: 'Uzun sifatlarda orttirma daraja: "THE MOST" + sifat: the most beautiful, the most expensive, the most famous.',
              ruleRu: 'Для длинных прилагательных превосходная степень: "THE MOST" + прилагательное: the most expensive.',
              formula: 'THE MOST + Long Adjective',
              example: 'Dubai has some of the most expensive hotels.',
              exampleRu: 'Dubai has some of the most expensive hotels.',
            },
            exercises: [
              { text: 'What is ___ city in the world?', options: ['the most expensive', 'most expensive', 'the expensivest'], correct: 0, explanation: 'the most expensive.', explanationRu: "the most expensive." },
              { text: 'She is ___ student in our class.', options: ['the most intelligent', 'the intelligentest', 'more intelligent'], correct: 0, explanation: 'the most intelligent.', explanationRu: "the most intelligent." },
            ],
          },
          {
            teach: {
              rule: '"Eng kam" ma\'nosida "THE LEAST" so\'zi ishlatiladi: the least expensive (eng kam qimmat / eng arzon).',
              ruleRu: 'В значении "наименее / меньше всего" используется "THE LEAST": the least expensive.',
              formula: 'THE LEAST + Adjective',
              example: 'This is the least difficult exam of all.',
              exampleRu: 'This is the least difficult exam of all.',
            },
            exercises: [
              { text: 'It was ___ interesting movie I have ever watched.', options: ['the least', 'less', 'the most least'], correct: 0, explanation: 'the least interesting.', explanationRu: "the least interesting." },
              { text: 'Choose the correct sentence:', options: ['This option is the least risky.', 'This option is least risky.'], correct: 0, explanation: 'the least risky.', explanationRu: "the least risky." },
            ],
          },
          {
            teach: {
              rule: 'Superlative bilan predloglar: JOY bo\'lsa "IN" (in the world, in the class), GURUH bo\'lsa "OF" (of all, of the three). Shuningdek Present Perfect bilan tez-tez keladi (*the best movie I have ever seen*).',
              ruleRu: 'Предлоги: IN для мест (in the world), OF для групп (of all). Часто с Present Perfect (the best... I have ever seen).',
              formula: 'the -est / the most ... IN + Place  |  OF + Group  |  I have EVER + V3',
              example: 'He is the tallest boy in the class. It is the best food I have ever eaten.',
              exampleRu: 'He is the tallest boy in the class.',
            },
            exercises: [
              { text: 'She is the smartest girl ___ our school.', options: ['in', 'of', 'at'], correct: 0, explanation: 'Joy/muassasa uchun: in our school.', explanationRu: "Для места/учреждения: in our school." },
              { text: 'This is the best book I have ___ read.', options: ['ever', 'never', 'already'], correct: 0, explanation: 'Superlative tajribasida: ever.', explanationRu: "В опыте с превосходной степенью: ever." },
            ],
          },
          {
            teach: {
              rule: 'Orttirma daraja (Superlative) qoidalarini birlashtiramiz.',
              ruleRu: 'Обобщим правила превосходной степени.',
              formula: 'THE + -est  |  THE MOST + Adjective  |  THE LEAST + Adjective',
              example: 'It was the most exciting trip of my life, and the cheapest one in history.',
              exampleRu: 'It was the most exciting trip of my life.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['She is the most popular singer in Uzbekistan.', 'She is most popular singer in Uzbekistan.'], correct: 0, explanation: 'THE most popular.', explanationRu: "THE most popular." },
              { text: 'Choose the correct sentence:', options: ['Who is the oldest person in your family?', 'Who is the older person in your family?'], correct: 0, explanation: 'Orttirma daraja: the oldest.', explanationRu: "Превосходная степень: the oldest." },
              { text: 'Select the correct sentence:', options: ['This is the worst mistake of all.', 'This is the baddest mistake of all.'], correct: 0, explanation: 'bad ➔ worst.', explanationRu: "bad ➔ worst." },
            ],
          },
        ],
      },
      {
        id: 'sec-adj-l5',
        order: 5,
        title: 'Noto\'g\'ri (Irregular) sifatlar va Maxsus tuzilmalar',
        titleRu: 'Исключения (Irregular adjectives) и Особые конструкции',
        icon: '5️⃣',
        units: [
          {
            teach: {
              rule: 'Asosiy noto\'g\'ri sifatlar: GOOD (yaxshi) ➔ BETTER ➔ THE BEST | BAD (yomon) ➔ WORSE ➔ THE WORST.',
              ruleRu: 'Главные исключения: GOOD ➔ BETTER ➔ THE BEST | BAD ➔ WORSE ➔ THE WORST.',
              formula: 'good ➔ better ➔ best  |  bad ➔ worse ➔ worst',
              example: 'My score is better than yours. This is the best pizza ever. Yesterday was bad, but today is worse.',
              exampleRu: 'My score is better than yours.',
            },
            exercises: [
              { text: 'Your English is ___ than last year.', options: ['better', 'gooder', 'more good'], correct: 0, explanation: 'good ➔ better.', explanationRu: "good ➔ better." },
              { text: 'This is ___ film I have ever seen.', options: ['the best', 'the goodest', 'the better'], correct: 0, explanation: 'good ➔ the best.', explanationRu: "good ➔ the best." },
              { text: 'The weather today is ___ than yesterday.', options: ['worse', 'badder', 'more bad'], correct: 0, explanation: 'bad ➔ worse.', explanationRu: "bad ➔ worse." },
            ],
          },
          {
            teach: {
              rule: 'Boshqa noto\'g\'ri sifatlar: FAR (uzoq) ➔ FARTHER/FURTHER ➔ THE FARTHEST/FURTHEST | LITTLE (oz) ➔ LESS ➔ THE LEAST | MANY/MUCH (ko\'p) ➔ MORE ➔ THE MOST.',
              ruleRu: 'Другие исключения: FAR ➔ FURTHER/FARTHER ➔ FURTHEST | LITTLE ➔ LESS ➔ LEAST | MUCH/MANY ➔ MORE ➔ MOST.',
              formula: 'far ➔ further ➔ furthest  |  little ➔ less ➔ least  |  many/much ➔ more ➔ most',
              example: 'I need further information. He has less money than me.',
              exampleRu: 'I need further information.',
            },
            exercises: [
              { text: 'I have ___ free time than you.', options: ['less', 'littler', 'least'], correct: 0, explanation: 'little ➔ less.', explanationRu: "little ➔ less." },
              { text: 'For ___ details, please visit our website.', options: ['further', 'farthest', 'farer'], correct: 0, explanation: 'qo\'shimcha tafsilotlar: further.', explanationRu: "Дополнительные подробности: further." },
            ],
          },
          {
            teach: {
              rule: '"FURTHER" masofadan tashqari "qo\'shimcha / yana" degan ma\'noni ham bildiradi: further notice (keyingi e\'longacha), further questions (qo\'shimcha savollar).',
              ruleRu: '"FURTHER" означает также "дополнительный": further information, further questions.',
              formula: 'FURTHER + Noun = additional noun',
              example: 'Do you have any further questions?',
              exampleRu: 'Do you have any further questions?',
            },
            exercises: [
              { text: 'If you have any ___ questions, let me know.', options: ['further', 'farther', 'farthest'], correct: 0, explanation: 'Qo\'shimcha savollar: further.', explanationRu: "Дополнительные вопросы: further." },
              { text: 'The shop is closed until ___ notice.', options: ['further', 'farther', 'more far'], correct: 0, explanation: 'further notice.', explanationRu: "further notice." },
            ],
          },
          {
            teach: {
              rule: '"THE ... THE ..." iborasi ("Qanchalik ... shanchalik ..."): The more you learn, the smarter you become. The colder it is, the warmer you should dress.',
              ruleRu: 'Конструкция "THE ... THE ..." ("Чем ... тем ..."): The more you study, the better your results.',
              formula: 'THE + Comparative ... THE + Comparative',
              example: 'The sooner, the better. (Qancha erta bo\'lsa, shuncha yaxshi.)',
              exampleRu: 'The sooner, the better.',
            },
            exercises: [
              { text: 'The more you practice, ___ you speak.', options: ['the better', 'the best', 'better'], correct: 0, explanation: 'The ... the ... iborasi: the better.', explanationRu: "Конструкция The ... the ...: the better." },
              { text: 'The higher you climb, ___ cold it gets.', options: ['the more', 'the most', 'more'], correct: 0, explanation: 'the more cold / the colder.', explanationRu: "the more cold / the colder." },
            ],
          },
          {
            teach: {
              rule: 'Noto\'g\'ri sifatlar va maxsus iboralarni birlashtiramiz.',
              ruleRu: 'Обобщим исключения и особые конструкции.',
              formula: 'good/better/best  |  bad/worse/worst  |  the... the...',
              example: 'The earlier we start, the better the result will be.',
              exampleRu: 'The earlier we start, the better the result will be.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['Prevention is better than cure.', 'Prevention is gooder than cure.'], correct: 0, explanation: 'good ➔ better.', explanationRu: "good ➔ better." },
              { text: 'Choose the correct sentence:', options: ['This is the worst day of my life.', 'This is the baddest day of my life.'], correct: 0, explanation: 'bad ➔ worst.', explanationRu: "bad ➔ worst." },
              { text: 'Select the correct sentence:', options: ['The more I know him, the more I like him.', 'The more I know him, more I like him.'], correct: 0, explanation: 'The more ... the more ...', explanationRu: "The more ... the more ..." },
            ],
          },
        ],
      },
      {
        id: 'sec-adj-l6',
        order: 6,
        title: 'Aralash amaliyot va Xatolarni tuzatish (Sifat darajalari)',
        titleRu: 'Смешанная практика и Исправление ошибок (Степени сравнения)',
        icon: '6️⃣',
        units: [
          {
            teach: {
              rule: 'Eng ko\'p uchraydigan 4 ta xato: 1) more taller ❌ ➔ taller ✅  2) the most highest ❌ ➔ the highest ✅  3) more good ❌ ➔ better ✅  4) taller then ❌ ➔ taller than ✅.',
              ruleRu: '4 частые ошибки: 1) more taller ❌ ➔ taller ✅  2) most highest ❌ ➔ highest ✅  3) more good ❌ ➔ better ✅  4) then ❌ ➔ than ✅.',
              formula: 'Never double comparison! (NO more -er / NO most -est)',
              example: 'He is taller than me. (NOT more taller). It is the highest peak (NOT most highest).',
              exampleRu: 'He is taller than me. It is the highest peak.',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['She is smarter than her brother.', 'She is more smarter than her brother.'], correct: 0, explanation: 'Ikkilamchi qiyoslash mumkin emas: smarter than.', explanationRu: "Двойное сравнение недопустимо: smarter than." },
              { text: 'Choose the correct sentence:', options: ['This is the highest building in town.', 'This is the most highest building in town.'], correct: 0, explanation: 'the highest.', explanationRu: "the highest." },
            ],
          },
          {
            teach: {
              rule: 'Mezon tanlash: 2 ta narsa bo\'lsa ➔ Comparative (-er / more) | 3 va undan ortiq narsa bo\'lsa ➔ Superlative (-est / the most).',
              ruleRu: 'Выбор степени: 2 объекта ➔ Comparative | 3 и более объектов ➔ Superlative.',
              formula: '2 Objects ➔ Comparative  |  3+ Objects ➔ Superlative',
              example: 'Of the two brothers, Tom is taller. / Of all the students, Tom is the tallest.',
              exampleRu: 'Of the two brothers, Tom is taller. Of all students, Tom is the tallest.',
            },
            exercises: [
              { text: 'Between football and tennis, I think football is ___ .', options: ['more exciting', 'the most exciting', 'most exciting'], correct: 0, explanation: '2 ta sport turi taqqoslanmoqda: more exciting.', explanationRu: "Сравниваются 2 вида спорта: more exciting." },
              { text: 'Of all sports, football is ___ .', options: ['the most popular', 'more popular', 'popularer'], correct: 0, explanation: 'Barcha sport turlari ichida: the most popular.', explanationRu: "Среди всех видов спорта: the most popular." },
            ],
          },
          {
            teach: {
              rule: 'as...as, comparative va superlative ni aralash kontekstlarda to\'g\'ri qo\'llash.',
              ruleRu: 'Использование as...as, comparative и superlative в смешанных контекстах.',
              formula: 'as...as (equal) vs -er/more (unequal 2) vs the -est/most (top of 3+)',
              example: 'She is as smart as her sister, but her brother is the smartest of all.',
              exampleRu: 'She is as smart as her sister, but her brother is the smartest of all.',
            },
            exercises: [
              { text: 'My laptop is fast, but yours is ___ .', options: ['faster', 'fastest', 'more fast'], correct: 0, explanation: 'Ikki kompyuter taqqoslanmoqda: faster.', explanationRu: "Сравниваются два компьютера: faster." },
              { text: 'My laptop is not as ___ as yours.', options: ['fast', 'faster', 'fastest'], correct: 0, explanation: 'not as ... as orasida: fast.', explanationRu: "Между not as ... as: fast." },
            ],
          },
          {
            teach: {
              rule: 'Real dialog va matnlardagi qiyosiy shakllar.',
              ruleRu: 'Практика диалогов и текстов.',
              formula: 'Context analysis ➔ Choose correct degree of comparison',
              example: '— Which car is better? — The red one is cheaper, but the blue one is safer.',
              exampleRu: 'The red one is cheaper, but the blue one is safer.',
            },
            exercises: [
              { text: '— How was your exam? — It was ___ than I expected!', options: ['easier', 'easyer', 'more easy'], correct: 0, explanation: 'easy ➔ easier.', explanationRu: "easy ➔ easier." },
              { text: '— Is your house far? — Yes, it is ___ away than yours.', options: ['farther', 'farer', 'more far'], correct: 0, explanation: 'far ➔ farther / further.', explanationRu: "far ➔ farther / further." },
            ],
          },
          {
            teach: {
              rule: 'Section 17 (Sifat darajalari) bo\'yicha yakuniy master formula.',
              ruleRu: 'Итоговая главная формула степеней сравнения.',
              formula: 'Equal = as adj as  |  2 objects = adj-er / more adj THAN  |  3+ objects = THE adj-est / THE MOST adj',
              example: 'as fast as / faster than / the fastest',
              exampleRu: 'as fast as / faster than / the fastest',
            },
            exercises: [
              { text: 'Choose the correct sentence:', options: ['This is the best day of my life.', 'This is the most good day of my life.'], correct: 0, explanation: 'good ➔ the best.', explanationRu: "good ➔ the best." },
              { text: 'Choose the correct sentence:', options: ['She is as tall as her mother.', 'She is as taller as her mother.'], correct: 0, explanation: 'as tall as.', explanationRu: "as tall as." },
              { text: 'Select the correct sentence:', options: ['My phone is much more expensive than yours.', 'My phone is very more expensive than yours.'], correct: 0, explanation: 'much more expensive.', explanationRu: "much more expensive." },
            ],
          },
        ],
      },
    ],
    review: {
      title: "Bo'lim testi: Sifat darajalari (Comparative, Superlative, As...as)",
      titleRu: 'Тест раздела: Степени сравнения (Comparative, Superlative, As...as)',
      exercises: [
        { text: 'Tom is as ___ as Bob.', options: ['tall', 'taller', 'tallest'], correct: 0, explanation: 'as...as orasida oddiy sifat: tall.', explanationRu: "Между as...as простая форма прилагательного: tall." },
        { text: 'My phone is not as ___ as yours.', options: ['expensive', 'more expensive', 'most expensive'], correct: 0, explanation: 'not as...as orasida: expensive.', explanationRu: "Между not as...as: expensive." },
        { text: 'A plane is ___ than a train.', options: ['faster', 'fast', 'fastest'], correct: 0, explanation: 'Qisqa sifat + er + than: faster.', explanationRu: "Короткое прилагательное + er + than: faster." },
        { text: 'This exam was ___ than I thought.', options: ['easier', 'easyer', 'more easy'], correct: 0, explanation: 'easy ➔ easier.', explanationRu: "easy ➔ easier." },
        { text: 'London is ___ than my city.', options: ['more expensive', 'expensivest', 'expensiver'], correct: 0, explanation: 'Uzun sifat: more expensive.', explanationRu: "Длинное прилагательное: more expensive." },
        { text: 'Health is ___ important than money.', options: ['more', 'most', 'as'], correct: 0, explanation: 'more important than.', explanationRu: "more important than." },
        { text: 'Mount Everest is ___ mountain in the world.', options: ['the highest', 'highest', 'higher'], correct: 0, explanation: 'the highest.', explanationRu: "the highest." },
        { text: 'What is ___ city in Uzbekistan?', options: ['the largest', 'the larger', 'largest'], correct: 0, explanation: 'the largest.', explanationRu: "the largest." },
        { text: 'This is ___ film I have ever watched.', options: ['the most interesting', 'the interestingest', 'more interesting'], correct: 0, explanation: 'the most interesting.', explanationRu: "the most interesting." },
        { text: 'Your result is ___ than mine.', options: ['better', 'gooder', 'more good'], correct: 0, explanation: 'good ➔ better.', explanationRu: "good ➔ better." },
        { text: 'Yesterday was bad, but today is ___ .', options: ['worse', 'badder', 'more bad'], correct: 0, explanation: 'bad ➔ worse.', explanationRu: "bad ➔ worse." },
        { text: 'Do you have any ___ questions?', options: ['further', 'farther', 'farer'], correct: 0, explanation: 'further questions.', explanationRu: "further questions." },
        { text: 'The sooner, the ___ .', options: ['better', 'best', 'good'], correct: 0, explanation: 'The sooner, the better.', explanationRu: "The sooner, the better." },
        { text: 'Select the correct sentence:', options: ['She is taller than her sister.', 'She is more taller than her sister.'], correct: 0, explanation: 'taller than.', explanationRu: "taller than." },
        { text: 'Select the correct sentence:', options: ['This car is much more expensive than that one.', 'This car is very more expensive than that one.'], correct: 0, explanation: 'much more expensive.', explanationRu: "much more expensive." },
      ],
    },
  },
];

