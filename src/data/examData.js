// ─── IMTIHON 1.2 — FIVE DISTINCT VARIANTS (Beginner → Elementary) ─────────────
// Structure mirrors the printed paper test: 8 parts in a fixed order/format.
// PART 1 Correct the Mistakes (20p) · PART 2 Fill in the Gaps (20p) ·
// PART 3 Reorder the Words (10p) · PART 4 Translation UZ<->EN (20p) ·
// PART 5 Multiple Choice (10p) · PART 6 Mixed Grammar Challenge (10p) ·
// PART 7 Sentence Transformation (5p) · PART 8 Short Writing Task (5p)
export const EXAMS_LIST = [
  {
    id: 'test_1',
    title: 'Imtihon 1.2 - Variant A',
    description: 'Beginner → Elementary. 8 qismli test: xatolarni topish, bo\'shliqlarni to\'ldirish, so\'zlarni tartiblash, tarjima, ko\'p tanlovli va yozma vazifalar.',
    sections: [
      {
        id: 'mistakes',
        title: '1. Correct the Mistakes (20 points)',
        description: 'Some sentences contain MORE than one mistake. Gaplardagi xatolarni toping va to\'g\'ri shaklda qayta yozing.',
        questions: [
          { id: 1, original: "Anvar don't usually drinking coffee in the morning.", reference: 'Anvar doesn\'t usually drink coffee in the morning.', topic: 'Present Simple (verb agreement)' },
          { id: 2, original: 'My sister have already finish her homework.', reference: 'My sister has already finished her homework.', topic: 'Present Perfect' },
          { id: 3, original: "There isn't much informations about this topic.", reference: "There isn't much information about this topic.", topic: 'Quantifiers (much/many)' },
          { id: 4, original: 'I am not understanding this grammar rule.', reference: 'I do not understand this grammar rule.', topic: 'Present Simple (stative verbs)' },
          { id: 5, original: 'We was watching a film when the lights went out.', reference: 'We were watching a film when the lights went out.', topic: 'Past Continuous + Past Simple' },
          { id: 6, original: 'The childs were playing happily in the yard.', reference: 'The children were playing happily in the yard.', topic: 'Irregular plural nouns' },
          { id: 7, original: 'He have never visited such a big city before.', reference: 'He has never visited such a big city before.', topic: 'Present Perfect (never)' },
          { id: 8, original: 'Neither the teacher nor the students knows the answer.', reference: 'Neither the teacher nor the students know the answer.', topic: 'Neither...nor agreement' },
          { id: 9, original: 'She decided go to the market alone.', reference: 'She decided to go to the market alone.', topic: 'Verb patterns (to-infinitive)' },
          { id: 10, original: 'They going to move to a new flat next month.', reference: 'They are going to move to a new flat next month.', topic: 'Going to (future)' }
        ]
      },
      {
        id: 'gaps',
        title: '2. Fill in the Gaps (20 points)',
        description: 'Fill each gap with ONE suitable word or phrase.',
        questions: [
          { id: 1, text: 'Yesterday, my father _______________ (buy) a new bicycle.', type: 'text', correct: 'bought', topic: 'Past Simple (irregular verbs)' },
          { id: 2, text: 'Right now, the children _______________ (play) in the garden.', type: 'text', correct: 'are', topic: 'Present Continuous' },
          { id: 3, text: 'She has lived in this town _______________ 2019.', type: 'text', correct: 'since', topic: 'since / for' },
          { id: 4, text: "There isn't _______________ time to finish the project today.", type: 'text', correct: 'enough', topic: 'Quantifiers (enough)' },
          { id: 5, text: 'I _______________ already finished my lunch.', type: 'text', correct: 'have', topic: 'Present Perfect' },
          { id: 6, text: 'This is _______________ tallest building in our city.', type: 'text', correct: 'the', topic: 'Superlative adjectives' },
          { id: 7, text: 'It was sunny, but _______________ it started snowing.', type: 'text', correct: 'suddenly', topic: 'Adverbs of manner' },
          { id: 8, text: 'We _______________ going to visit our cousins this weekend.', type: 'text', correct: 'are', topic: 'Going to (future)' },
          { id: 9, text: 'You should brush your teeth _______________ day.', type: 'text', correct: 'every', topic: 'Quantifiers (every)' },
          { id: 10, text: 'My brother speaks French very _______________.', type: 'text', correct: 'well', topic: 'Adverbs of manner' }
        ]
      },
      {
        id: 'reorder',
        title: '3. Reorder the Words (10 points)',
        description: 'Make meaningful and grammatically correct sentences.',
        questions: [
          { id: 1, scrambled: ['is', 'very', 'interesting', 'this', 'story'], answer: 'This story is very interesting.', topic: 'Word order (adjectives)' },
          { id: 2, scrambled: ['been', 'have', 'studying', 'we', 'English', 'morning', 'since'], answer: 'We have been studying English since morning.', topic: 'Present Perfect Continuous' },
          { id: 3, scrambled: ['extremely', 'was', 'difficult', 'the', 'exam'], answer: 'The exam was extremely difficult.', topic: 'Word order (intensifying adverb)' },
          { id: 4, scrambled: ['are', 'tomorrow', 'where', 'you', 'going'], answer: 'Where are you going tomorrow?', topic: 'Question word order' }
        ]
      },
      {
        id: 'translate',
        title: '4. Translation (20 points)',
        description: 'Uzbek → English (1-5) va English → Uzbek (6-10) gaplarni tarjima qiling.',
        questions: [
          { id: 1, direction: 'uz-en', uzbek: 'Men har kuni ertalab choy ichaman.', reference: 'I drink tea every morning.', topic: 'Present Simple (habitual)' },
          { id: 2, direction: 'uz-en', uzbek: 'Biz kelganimizda ular ovqatlanishayotgan edi.', reference: 'When we arrived, they were having dinner.', topic: 'Past Continuous' },
          { id: 3, direction: 'uz-en', uzbek: "Men hali bu maqolani o'qib bo'lganim yo'q.", reference: 'I have not read this article yet.', topic: 'Present Perfect (negative)' },
          { id: 4, direction: 'uz-en', uzbek: 'Onam ovqatni juda mazali pishiradi.', reference: 'My mother cooks food very deliciously.', topic: 'Adverbs of manner' },
          { id: 5, direction: 'uz-en', uzbek: 'Ular yozda dengizga borishni rejalashtirishyapti.', reference: 'They are going to go to the sea in summer.', topic: 'Going to (future)' },
          { id: 6, direction: 'en-uz', english: 'She has never eaten Japanese food before.', reference: "U hech qachon yapon taomini yemagan.", topic: 'Present Perfect (experience)' },
          { id: 7, direction: 'en-uz', english: 'I was cleaning the house when my friend called me.', reference: "Do'stim menga qo'ng'iroq qilganda men uyni tozalayotgan edim.", topic: 'Past Continuous + when' },
          { id: 8, direction: 'en-uz', english: 'They are going to build a new school next year.', reference: "Ular kelasi yil yangi maktab qurishmoqchi.", topic: 'Going to (future)' },
          { id: 9, direction: 'en-uz', english: 'This bag is heavier than that one.', reference: "Bu sumka anavinidan og'irroq.", topic: 'Comparative adjectives' },
          { id: 10, direction: 'en-uz', english: 'Nobody in the room knew the correct answer.', reference: "Xonadagi hech kim to'g'ri javobni bilmasdi.", topic: 'Indefinite pronouns' }
        ]
      },
      {
        id: 'multichoice',
        title: '5. Multiple Choice (10 points)',
        description: 'Choose the correct answer.',
        questions: [
          { id: 1, text: 'I usually _______ tea in the evening.', options: ['drink', 'am drinking', 'drank'], correct: 'drink', topic: 'Present Simple vs Continuous' },
          { id: 2, text: 'He _______ TV when the phone rang.', options: ['watches', 'was watching', 'watched'], correct: 'was watching', topic: 'Past Continuous (interrupted action)' },
          { id: 3, text: 'We _______ this movie before.', options: ['see', 'saw', 'have seen'], correct: 'have seen', topic: 'Present Perfect vs Past Simple' },
          { id: 4, text: "There isn't _______ sugar in the jar.", options: ['much', 'many', 'a few'], correct: 'much', topic: 'Quantifiers (much/many/little)' },
          { id: 5, text: 'This road is _______ than the other one.', options: ['more wide', 'wider', 'widest'], correct: 'wider', topic: 'Comparative adjectives' }
        ]
      },
      {
        id: 'mixedgrammar',
        title: '6. Mixed Grammar Challenge (10 points)',
        description: 'Choose the best answer.',
        questions: [
          { id: 1, text: 'If it rains tomorrow, we _______ at home.', options: ['stay', 'will stay', 'stayed'], correct: 'will stay', topic: 'First Conditional' },
          { id: 2, text: 'The children hurt _______ while playing football.', options: ['themselves', 'theirselves', 'them'], correct: 'themselves', topic: 'Reflexive pronouns' },
          { id: 3, text: 'She is _______ honest person I have ever met.', options: ['a', 'an', 'the'], correct: 'an', topic: 'Articles (a/an)' },
          { id: 4, text: 'He _______ in this factory for six years.', options: ['work', 'worked', 'has worked'], correct: 'has worked', topic: 'Present Perfect (duration)' },
          { id: 5, text: 'Which sentence is correct?', options: ['She can to cook very well.', 'She can cooks very well.', 'She can cook very well.'], correct: 'She can cook very well.', topic: 'Modal verbs (can)' }
        ]
      },
      {
        id: 'transformation',
        title: '7. Sentence Transformation (5 points)',
        description: 'Rewrite the sentences without changing the meaning.',
        questions: [
          { id: 1, original: 'I began learning Korean two years ago.', starter: 'I have', reference: 'been learning Korean for 2 years.', topic: 'Simple Past → Present Perfect' },
          { id: 2, original: 'He is stronger than all the boys in the team.', starter: 'He is the', reference: 'strongest boy in the team.', topic: 'Comparative → Superlative' },
          { id: 3, original: 'We are planning to sell our old car.', starter: 'We are', reference: 'going to sell our old car.', topic: 'Present Continuous → Going to' },
          { id: 4, original: 'She was cooking dinner. Then the guests arrived.', starter: 'While she', reference: 'was cooking dinner, the guests arrived.', topic: 'Past Continuous linking' },
          { id: 5, original: 'I do not usually stay up late.', starter: 'I rarely', reference: 'stay up late.', topic: 'Frequency adverbs' }
        ]
      },
      {
        id: 'writing',
        title: '8. Short Writing Task (5 points)',
        description: 'Write 10-12 sentences about ONE of the topics below.',
        topics: [
          { key: 'A', label: 'My Daily Routine' },
          { key: 'B', label: 'My Future Plans' },
          { key: 'C', label: 'My Family and Hobbies' }
        ],
        mustUse: [
          'present simple',
          'present continuous',
          'past simple',
          'future form',
          'at least 3 adjectives',
          'at least 2 adverbs'
        ],
        questions: [
          { id: 1, reference: 'Should be 10-12 sentences, relevant to the chosen topic, correctly using all the required grammar structures (present simple, present continuous, past simple, future form, 3+ adjectives, 2+ adverbs).' }
        ]
      }
    ]
  },
  {
    id: 'test_2',
    title: 'Imtihon 1.2 - Variant B',
    description: 'Beginner → Elementary. 8 qismli test: xatolarni topish, bo\'shliqlarni to\'ldirish, so\'zlarni tartiblash, tarjima, ko\'p tanlovli va yozma vazifalar.',
    sections: [
      {
        id: 'mistakes',
        title: '1. Correct the Mistakes (20 points)',
        description: 'Some sentences contain MORE than one mistake. Gaplardagi xatolarni toping va to\'g\'ri shaklda qayta yozing.',
        questions: [
          { id: 1, original: "Malika don't usually eating breakfast at home.", reference: "Malika doesn't usually eat breakfast at home.", topic: 'Present Simple (verb agreement)' },
          { id: 2, original: 'My uncle have already sold his old car.', reference: 'My uncle has already sold his old car.', topic: 'Present Perfect' },
          { id: 3, original: "He didn't give me much informations about the trip.", reference: "He didn't give me much information about the trip.", topic: 'Quantifiers (much/many)' },
          { id: 4, original: 'I am not knowing the answer to this question.', reference: 'I do not know the answer to this question.', topic: 'Present Simple (stative verbs)' },
          { id: 5, original: 'They was walking home when it started to rain.', reference: 'They were walking home when it started to rain.', topic: 'Past Continuous + Past Simple' },
          { id: 6, original: 'The mans were waiting outside the station.', reference: 'The men were waiting outside the station.', topic: 'Irregular plural nouns' },
          { id: 7, original: 'She have never tasted Italian pizza before.', reference: 'She has never tasted Italian pizza before.', topic: 'Present Perfect (never)' },
          { id: 8, original: 'Neither my parents nor my brother like loud music.', reference: 'Neither my parents nor my brother likes loud music.', topic: 'Neither...nor agreement' },
          { id: 9, original: 'He forgot bring his umbrella today.', reference: 'He forgot to bring his umbrella today.', topic: 'Verb patterns (to-infinitive)' },
          { id: 10, original: 'She going to start a new job next week.', reference: 'She is going to start a new job next week.', topic: 'Going to (future)' }
        ]
      },
      {
        id: 'gaps',
        title: '2. Fill in the Gaps (20 points)',
        description: 'Fill each gap with ONE suitable word or phrase.',
        questions: [
          { id: 1, text: 'Last night, my mother _______________ (make) a delicious soup.', type: 'text', correct: 'made', topic: 'Past Simple (irregular verbs)' },
          { id: 2, text: 'At the moment, my father _______________ (fix) the car.', type: 'text', correct: 'is', topic: 'Present Continuous' },
          { id: 3, text: 'He has worked at this company _______________ five years.', type: 'text', correct: 'for', topic: 'since / for' },
          { id: 4, text: "There aren't _______________ chairs for everyone.", type: 'text', correct: 'enough', topic: 'Quantifiers (enough)' },
          { id: 5, text: 'We _______________ already paid the bill.', type: 'text', correct: 'have', topic: 'Present Perfect' },
          { id: 6, text: 'This is _______________ most beautiful garden in the city.', type: 'text', correct: 'the', topic: 'Superlative adjectives' },
          { id: 7, text: 'Everything was quiet, but _______________ the dog started barking.', type: 'text', correct: 'suddenly', topic: 'Adverbs of manner' },
          { id: 8, text: 'She _______________ going to join a dance class.', type: 'text', correct: 'is', topic: 'Going to (future)' },
          { id: 9, text: 'He goes jogging _______________ morning.', type: 'text', correct: 'every', topic: 'Quantifiers (every)' },
          { id: 10, text: 'The old man walked _______________ (slow) across the street.', type: 'text', correct: 'slowly', topic: 'Adverbs of manner' }
        ]
      },
      {
        id: 'reorder',
        title: '3. Reorder the Words (10 points)',
        description: 'Make meaningful and grammatically correct sentences.',
        questions: [
          { id: 1, scrambled: ['is', 'a', 'beautiful', 'city', 'this'], answer: 'This is a beautiful city.', topic: 'Word order (adjectives)' },
          { id: 2, scrambled: ['been', 'have', 'waiting', 'they', 'here', 'morning', 'since'], answer: 'They have been waiting here since morning.', topic: 'Present Perfect Continuous' },
          { id: 3, scrambled: ['was', 'incredibly', 'the', 'concert', 'exciting'], answer: 'The concert was incredibly exciting.', topic: 'Word order (intensifying adverb)' },
          { id: 4, scrambled: ['is', 'what', 'doing', 'she', 'now'], answer: 'What is she doing now?', topic: 'Question word order' }
        ]
      },
      {
        id: 'translate',
        title: '4. Translation (20 points)',
        description: 'Uzbek → English (1-5) va English → Uzbek (6-10) gaplarni tarjima qiling.',
        questions: [
          { id: 1, direction: 'uz-en', uzbek: "U har kuni kechqurun kitob o'qiydi.", reference: 'He reads a book every evening.', topic: 'Present Simple (habitual)' },
          { id: 2, direction: 'uz-en', uzbek: "Men uyga kelganimda ular televizor ko'rishayotgan edi.", reference: 'When I came home, they were watching TV.', topic: 'Past Continuous' },
          { id: 3, direction: 'uz-en', uzbek: "Biz hali bu masalani hal qilganimiz yo'q.", reference: 'We have not solved this problem yet.', topic: 'Present Perfect (negative)' },
          { id: 4, direction: 'uz-en', uzbek: 'U mashinani juda ehtiyotkorlik bilan haydaydi.', reference: 'He drives the car very carefully.', topic: 'Adverbs of manner' },
          { id: 5, direction: 'uz-en', uzbek: "Men kelasi yil universitetga o'qishga kirmoqchiman.", reference: 'I am going to enter university next year.', topic: 'Going to (future)' },
          { id: 6, direction: 'en-uz', english: 'We have never visited that museum before.', reference: "Biz hech qachon o'sha muzeyga bormaganmiz.", topic: 'Present Perfect (experience)' },
          { id: 7, direction: 'en-uz', english: 'She was reading a book when the power went off.', reference: "Svet o'chganda u kitob o'qiyotgan edi.", topic: 'Past Continuous + when' },
          { id: 8, direction: 'en-uz', english: 'He is going to repair his bicycle tomorrow.', reference: "U ertaga velosipedini ta'mirlamoqchi.", topic: 'Going to (future)' },
          { id: 9, direction: 'en-uz', english: 'Her house is bigger than ours.', reference: 'Uning uyi bizning uyimizdan kattaroq.', topic: 'Comparative adjectives' },
          { id: 10, direction: 'en-uz', english: 'Nobody at the meeting agreed with the plan.', reference: "Yig'ilishda hech kim reja bilan rozi bo'lmadi.", topic: 'Indefinite pronouns' }
        ]
      },
      {
        id: 'multichoice',
        title: '5. Multiple Choice (10 points)',
        description: 'Choose the correct answer.',
        questions: [
          { id: 1, text: 'My grandmother usually _______ coffee.', options: ['drinks', 'is drinking', 'drank'], correct: 'drinks', topic: 'Present Simple vs Continuous' },
          { id: 2, text: 'He _______ dinner when the guests arrived.', options: ['cooks', 'was cooking', 'cooked'], correct: 'was cooking', topic: 'Past Continuous (interrupted action)' },
          { id: 3, text: 'I _______ this film twice already.', options: ['watch', 'watched', 'have watched'], correct: 'have watched', topic: 'Present Perfect vs Past Simple' },
          { id: 4, text: 'There are too _______ cars on this street.', options: ['much', 'many', 'little'], correct: 'many', topic: 'Quantifiers (much/many/little)' },
          { id: 5, text: 'This exercise is _______ than the last one.', options: ['easyer', 'easier', 'easiest'], correct: 'easier', topic: 'Comparative adjectives' }
        ]
      },
      {
        id: 'mixedgrammar',
        title: '6. Mixed Grammar Challenge (10 points)',
        description: 'Choose the best answer.',
        questions: [
          { id: 1, text: 'If she studies hard, she _______ the exam.', options: ['pass', 'will pass', 'passed'], correct: 'will pass', topic: 'First Conditional' },
          { id: 2, text: 'We enjoyed _______ at the party.', options: ['ourselves', 'ourself', 'us'], correct: 'ourselves', topic: 'Reflexive pronouns' },
          { id: 3, text: 'He is _______ university student.', options: ['a', 'an', 'the'], correct: 'a', topic: 'Articles (a/an)' },
          { id: 4, text: 'They _______ in this village for ten years.', options: ['live', 'lived', 'have lived'], correct: 'have lived', topic: 'Present Perfect (duration)' },
          { id: 5, text: 'Which sentence is correct?', options: ['He must to leave now.', 'He must leaves now.', 'He must leave now.'], correct: 'He must leave now.', topic: 'Modal verbs (must)' }
        ]
      },
      {
        id: 'transformation',
        title: '7. Sentence Transformation (5 points)',
        description: 'Rewrite the sentences without changing the meaning.',
        questions: [
          { id: 1, original: 'She started playing the piano five years ago.', starter: 'She has', reference: 'been playing the piano for 5 years.', topic: 'Simple Past → Present Perfect' },
          { id: 2, original: 'This book is more interesting than all the others.', starter: 'This is the', reference: 'most interesting book.', topic: 'Comparative → Superlative' },
          { id: 3, original: 'I am planning to paint my room.', starter: 'I am', reference: 'going to paint my room.', topic: 'Present Continuous → Going to' },
          { id: 4, original: 'He was doing his homework. Then his friend visited him.', starter: 'While he', reference: 'was doing his homework, his friend visited him.', topic: 'Past Continuous linking' },
          { id: 5, original: 'They do not usually arrive early.', starter: 'They rarely', reference: 'arrive early.', topic: 'Frequency adverbs' }
        ]
      },
      {
        id: 'writing',
        title: '8. Short Writing Task (5 points)',
        description: 'Write 10-12 sentences about ONE of the topics below.',
        topics: [
          { key: 'A', label: 'My Weekend Activities' },
          { key: 'B', label: 'My Dream Job' },
          { key: 'C', label: 'My Best Friend' }
        ],
        mustUse: [
          'present simple',
          'present continuous',
          'past simple',
          'future form',
          'at least 3 adjectives',
          'at least 2 adverbs'
        ],
        questions: [
          { id: 1, reference: 'Should be 10-12 sentences, relevant to the chosen topic, correctly using all the required grammar structures (present simple, present continuous, past simple, future form, 3+ adjectives, 2+ adverbs).' }
        ]
      }
    ]
  },
  {
    id: 'test_3',
    title: 'Imtihon 1.2 - Variant C',
    description: 'Beginner → Elementary. 8 qismli test: xatolarni topish, bo\'shliqlarni to\'ldirish, so\'zlarni tartiblash, tarjima, ko\'p tanlovli va yozma vazifalar.',
    sections: [
      {
        id: 'mistakes',
        title: '1. Correct the Mistakes (20 points)',
        description: 'Some sentences contain MORE than one mistake. Gaplardagi xatolarni toping va to\'g\'ri shaklda qayta yozing.',
        questions: [
          { id: 1, original: "Sardor don't usually staying up late.", reference: "Sardor doesn't usually stay up late.", topic: 'Present Simple (verb agreement)' },
          { id: 2, original: 'My grandmother have already cooked dinner.', reference: 'My grandmother has already cooked dinner.', topic: 'Present Perfect' },
          { id: 3, original: "There wasn't much furnitures in the new flat.", reference: "There wasn't much furniture in the new flat.", topic: 'Quantifiers (much/many)' },
          { id: 4, original: 'I am not remembering his name right now.', reference: 'I do not remember his name right now.', topic: 'Present Simple (stative verbs)' },
          { id: 5, original: 'She clean the house when the guests knocked.', reference: 'She was cleaning the house when the guests knocked.', topic: 'Past Continuous + Past Simple' },
          { id: 6, original: 'The womans were talking near the market.', reference: 'The women were talking near the market.', topic: 'Irregular plural nouns' },
          { id: 7, original: 'We have never saw such a bright rainbow.', reference: 'We have never seen such a bright rainbow.', topic: 'Present Perfect (never)' },
          { id: 8, original: 'Neither the boys nor the girl want to leave early.', reference: 'Neither the boys nor the girl wants to leave early.', topic: 'Neither...nor agreement' },
          { id: 9, original: 'They avoid to talk about the problem.', reference: 'They avoid talking about the problem.', topic: 'Verb patterns (gerund)' },
          { id: 10, original: 'We going to paint the fence this weekend.', reference: 'We are going to paint the fence this weekend.', topic: 'Going to (future)' }
        ]
      },
      {
        id: 'gaps',
        title: '2. Fill in the Gaps (20 points)',
        description: 'Fill each gap with ONE suitable word or phrase.',
        questions: [
          { id: 1, text: 'Two days ago, she _______________ (find) her lost keys.', type: 'text', correct: 'found', topic: 'Past Simple (irregular verbs)' },
          { id: 2, text: 'Look! The baby _______________ (sleep) peacefully.', type: 'text', correct: 'is', topic: 'Present Continuous' },
          { id: 3, text: 'He has been a teacher _______________ 2015.', type: 'text', correct: 'since', topic: 'since / for' },
          { id: 4, text: "There isn't _______________ space to park the car.", type: 'text', correct: 'enough', topic: 'Quantifiers (enough)' },
          { id: 5, text: 'I _______________ already sent the email.', type: 'text', correct: 'have', topic: 'Present Perfect' },
          { id: 6, text: 'This is _______________ longest river in the country.', type: 'text', correct: 'the', topic: 'Superlative adjectives' },
          { id: 7, text: 'It was calm outside, but _______________ the wind grew stronger.', type: 'text', correct: 'suddenly', topic: 'Adverbs of manner' },
          { id: 8, text: 'He _______________ going to fix the roof next week.', type: 'text', correct: 'is', topic: 'Going to (future)' },
          { id: 9, text: 'She waters the flowers _______________ day.', type: 'text', correct: 'every', topic: 'Quantifiers (every)' },
          { id: 10, text: 'The students listened _______________ (careful) to the teacher.', type: 'text', correct: 'carefully', topic: 'Adverbs of manner' }
        ]
      },
      {
        id: 'reorder',
        title: '3. Reorder the Words (10 points)',
        description: 'Make meaningful and grammatically correct sentences.',
        questions: [
          { id: 1, scrambled: ['are', 'delicious', 'these', 'apples', 'very'], answer: 'These apples are very delicious.', topic: 'Word order (adjectives)' },
          { id: 2, scrambled: ['been', 'has', 'working', 'he', 'here', 'since', '2020'], answer: 'He has been working here since 2020.', topic: 'Present Perfect Continuous' },
          { id: 3, scrambled: ['remarkably', 'was', 'trip', 'the', 'calm'], answer: 'The trip was remarkably calm.', topic: 'Word order (intensifying adverb)' },
          { id: 4, scrambled: ['when', 'you', 'are', 'leaving'], answer: 'When are you leaving?', topic: 'Question word order' }
        ]
      },
      {
        id: 'translate',
        title: '4. Translation (20 points)',
        description: 'Uzbek → English (1-5) va English → Uzbek (6-10) gaplarni tarjima qiling.',
        questions: [
          { id: 1, direction: 'uz-en', uzbek: "U dam olish kunlari sport bilan shug'ullanadi.", reference: 'He does sports on weekends.', topic: 'Present Simple (habitual)' },
          { id: 2, direction: 'uz-en', uzbek: 'Men keldim, ular hovlida ishlayotgan edi.', reference: 'When I arrived, they were working in the yard.', topic: 'Past Continuous' },
          { id: 3, direction: 'uz-en', uzbek: "Men hali imtihonga tayyorlanib bo'lganim yo'q.", reference: 'I have not prepared for the exam yet.', topic: 'Present Perfect (negative)' },
          { id: 4, direction: 'uz-en', uzbek: 'Bola savolga aniq javob berdi.', reference: 'The child answered the question clearly.', topic: 'Adverbs of manner' },
          { id: 5, direction: 'uz-en', uzbek: "Biz yozda tog'larga sayohat qilishni rejalashtiryapmiz.", reference: 'We are going to travel to the mountains in summer.', topic: 'Going to (future)' },
          { id: 6, direction: 'en-uz', english: 'They have never climbed such a high mountain.', reference: "Ular hech qachon bunchalik baland tog'ga chiqishmagan.", topic: 'Present Perfect (experience)' },
          { id: 7, direction: 'en-uz', english: 'He was driving to work when the accident happened.', reference: "Baxtsiz hodisa sodir bo'lganda u ishga haydab ketayotgan edi.", topic: 'Past Continuous + when' },
          { id: 8, direction: 'en-uz', english: 'She is going to open a small shop next month.', reference: "U keyingi oy kichik do'kon ochmoqchi.", topic: 'Going to (future)' },
          { id: 9, direction: 'en-uz', english: 'This puzzle is more difficult than the previous one.', reference: 'Bu bosh qotirmoq oldingisidan qiyinroq.', topic: 'Comparative adjectives' },
          { id: 10, direction: 'en-uz', english: 'Nobody in the office answered the phone.', reference: "Ofisda hech kim telefonga javob bermadi.", topic: 'Indefinite pronouns' }
        ]
      },
      {
        id: 'multichoice',
        title: '5. Multiple Choice (10 points)',
        description: 'Choose the correct answer.',
        questions: [
          { id: 1, text: 'My father usually _______ the newspaper.', options: ['reads', 'is reading', 'read'], correct: 'reads', topic: 'Present Simple vs Continuous' },
          { id: 2, text: 'She _______ the road when the car appeared.', options: ['crosses', 'was crossing', 'crossed'], correct: 'was crossing', topic: 'Past Continuous (interrupted action)' },
          { id: 3, text: 'We _______ our homework already.', options: ['finish', 'finished', 'have finished'], correct: 'have finished', topic: 'Present Perfect vs Past Simple' },
          { id: 4, text: 'There is too _______ noise in this room.', options: ['much', 'many', 'few'], correct: 'much', topic: 'Quantifiers (much/many/little)' },
          { id: 5, text: 'This box is _______ than that one.', options: ['heavyer', 'heavier', 'heaviest'], correct: 'heavier', topic: 'Comparative adjectives' }
        ]
      },
      {
        id: 'mixedgrammar',
        title: '6. Mixed Grammar Challenge (10 points)',
        description: 'Choose the best answer.',
        questions: [
          { id: 1, text: 'If you call me tonight, I _______ the phone.', options: ['answer', 'will answer', 'answered'], correct: 'will answer', topic: 'First Conditional' },
          { id: 2, text: 'The players hurt _______ during the match.', options: ['themselves', 'theirself', 'them'], correct: 'themselves', topic: 'Reflexive pronouns' },
          { id: 3, text: 'He is _______ engineer at a big company.', options: ['a', 'an', 'the'], correct: 'an', topic: 'Articles (a/an)' },
          { id: 4, text: 'She _______ as a nurse for eight years.', options: ['work', 'worked', 'has worked'], correct: 'has worked', topic: 'Present Perfect (duration)' },
          { id: 5, text: 'Which sentence is correct?', options: ['They must to finish the task.', 'They must finishes the task.', 'They must finish the task.'], correct: 'They must finish the task.', topic: 'Modal verbs (must)' }
        ]
      },
      {
        id: 'transformation',
        title: '7. Sentence Transformation (5 points)',
        description: 'Rewrite the sentences without changing the meaning.',
        questions: [
          { id: 1, original: 'He began driving a taxi four years ago.', starter: 'He has', reference: 'been driving a taxi for 4 years.', topic: 'Simple Past → Present Perfect' },
          { id: 2, original: 'This lake is deeper than all the lakes in the region.', starter: 'This is the', reference: 'deepest lake in the region.', topic: 'Comparative → Superlative' },
          { id: 3, original: 'We are planning to renovate our kitchen.', starter: 'We are', reference: 'going to renovate our kitchen.', topic: 'Present Continuous → Going to' },
          { id: 4, original: 'He was washing his car. Then it began to rain.', starter: 'While he', reference: 'was washing his car, it began to rain.', topic: 'Past Continuous linking' },
          { id: 5, original: 'She does not usually forget her keys.', starter: 'She rarely', reference: 'forgets her keys.', topic: 'Frequency adverbs' }
        ]
      },
      {
        id: 'writing',
        title: '8. Short Writing Task (5 points)',
        description: 'Write 10-12 sentences about ONE of the topics below.',
        topics: [
          { key: 'A', label: 'My School Life' },
          { key: 'B', label: 'My Favorite Season' },
          { key: 'C', label: 'My Hometown' }
        ],
        mustUse: [
          'present simple',
          'present continuous',
          'past simple',
          'future form',
          'at least 3 adjectives',
          'at least 2 adverbs'
        ],
        questions: [
          { id: 1, reference: 'Should be 10-12 sentences, relevant to the chosen topic, correctly using all the required grammar structures (present simple, present continuous, past simple, future form, 3+ adjectives, 2+ adverbs).' }
        ]
      }
    ]
  },
  {
    id: 'test_4',
    title: 'Imtihon 1.2 - Variant D',
    description: 'Beginner → Elementary. 8 qismli test: xatolarni topish, bo\'shliqlarni to\'ldirish, so\'zlarni tartiblash, tarjima, ko\'p tanlovli va yozma vazifalar.',
    sections: [
      {
        id: 'mistakes',
        title: '1. Correct the Mistakes (20 points)',
        description: 'Some sentences contain MORE than one mistake. Gaplardagi xatolarni toping va to\'g\'ri shaklda qayta yozing.',
        questions: [
          { id: 1, original: "Nodira don't usually skipping breakfast.", reference: "Nodira doesn't usually skip breakfast.", topic: 'Present Simple (verb agreement)' },
          { id: 2, original: 'My cousin have already painted his room.', reference: 'My cousin has already painted his room.', topic: 'Present Perfect' },
          { id: 3, original: "There weren't much chairs in the hall.", reference: "There weren't many chairs in the hall.", topic: 'Quantifiers (much/many)' },
          { id: 4, original: 'I am not believing this strange story.', reference: 'I do not believe this strange story.', topic: 'Present Simple (stative verbs)' },
          { id: 5, original: 'He read a magazine when the taxi arrived.', reference: 'He was reading a magazine when the taxi arrived.', topic: 'Past Continuous + Past Simple' },
          { id: 6, original: 'The teeths of the child were very white.', reference: 'The teeth of the child were very white.', topic: 'Irregular plural nouns' },
          { id: 7, original: 'She have never driven such a fast car.', reference: 'She has never driven such a fast car.', topic: 'Present Perfect (never)' },
          { id: 8, original: 'Neither the manager nor the workers agrees with the plan.', reference: 'Neither the manager nor the workers agree with the plan.', topic: 'Neither...nor agreement' },
          { id: 9, original: 'He promised helping me with the project.', reference: 'He promised to help me with the project.', topic: 'Verb patterns (to-infinitive)' },
          { id: 10, original: 'She going to open a new bakery soon.', reference: 'She is going to open a new bakery soon.', topic: 'Going to (future)' }
        ]
      },
      {
        id: 'gaps',
        title: '2. Fill in the Gaps (20 points)',
        description: 'Fill each gap with ONE suitable word or phrase.',
        questions: [
          { id: 1, text: 'Last summer, we _______________ (visit) our grandparents.', type: 'text', correct: 'visited', topic: 'Past Simple (irregular verbs)' },
          { id: 2, text: 'Listen! Someone _______________ (sing) in the next room.', type: 'text', correct: 'is', topic: 'Present Continuous' },
          { id: 3, text: 'I have known her _______________ we were children.', type: 'text', correct: 'since', topic: 'since / for' },
          { id: 4, text: "There isn't _______________ milk left in the fridge.", type: 'text', correct: 'enough', topic: 'Quantifiers (enough)' },
          { id: 5, text: 'She _______________ already cleaned her room.', type: 'text', correct: 'has', topic: 'Present Perfect' },
          { id: 6, text: 'This is _______________ cheapest restaurant in town.', type: 'text', correct: 'the', topic: 'Superlative adjectives' },
          { id: 7, text: 'The sky was clear, but _______________ it began to thunder.', type: 'text', correct: 'suddenly', topic: 'Adverbs of manner' },
          { id: 8, text: 'They _______________ going to sell their old furniture.', type: 'text', correct: 'are', topic: 'Going to (future)' },
          { id: 9, text: 'He checks his email _______________ hour.', type: 'text', correct: 'every', topic: 'Quantifiers (every)' },
          { id: 10, text: 'She answered the question _______________ (confident).', type: 'text', correct: 'confidently', topic: 'Adverbs of manner' }
        ]
      },
      {
        id: 'reorder',
        title: '3. Reorder the Words (10 points)',
        description: 'Make meaningful and grammatically correct sentences.',
        questions: [
          { id: 1, scrambled: ['is', 'song', 'wonderful', 'a', 'this'], answer: 'This is a wonderful song.', topic: 'Word order (adjectives)' },
          { id: 2, scrambled: ['been', 'have', 'living', 'they', 'city', 'since', '2018', 'this'], answer: 'They have been living in this city since 2018.', topic: 'Present Perfect Continuous' },
          { id: 3, scrambled: ['unusually', 'was', 'quiet', 'classroom', 'the'], answer: 'The classroom was unusually quiet.', topic: 'Word order (intensifying adverb)' },
          { id: 4, scrambled: ['is', 'why', 'crying', 'baby', 'the'], answer: 'Why is the baby crying?', topic: 'Question word order' }
        ]
      },
      {
        id: 'translate',
        title: '4. Translation (20 points)',
        description: 'Uzbek → English (1-5) va English → Uzbek (6-10) gaplarni tarjima qiling.',
        questions: [
          { id: 1, direction: 'uz-en', uzbek: "U har hafta oyisiga qo'ng'iroq qiladi.", reference: 'She calls her mother every week.', topic: 'Present Simple (habitual)' },
          { id: 2, direction: 'uz-en', uzbek: "Men chiqqanimda yomg'ir yog'ayotgan edi.", reference: 'When I went out, it was raining.', topic: 'Past Continuous' },
          { id: 3, direction: 'uz-en', uzbek: "Ular hali xonani tozalab bo'lishmagan.", reference: 'They have not cleaned the room yet.', topic: 'Present Perfect (negative)' },
          { id: 4, direction: 'uz-en', uzbek: 'Qiz savolga aqlli javob berdi.', reference: 'The girl answered the question intelligently.', topic: 'Adverbs of manner' },
          { id: 5, direction: 'uz-en', uzbek: "Biz kuz oyida yangi uyga ko'chib o'tishni rejalashtiryapmiz.", reference: 'We are going to move to a new house in autumn.', topic: 'Going to (future)' },
          { id: 6, direction: 'en-uz', english: 'He has never ridden a horse before.', reference: 'U hech qachon otda yurmagan.', topic: 'Present Perfect (experience)' },
          { id: 7, direction: 'en-uz', english: 'They were fishing by the river when it started to rain.', reference: "Yomg'ir yog'a boshlaganda ular daryo bo'yida baliq tutishayotgan edi.", topic: 'Past Continuous + when' },
          { id: 8, direction: 'en-uz', english: 'She is going to learn Spanish next semester.', reference: "U keyingi semestrda ispan tilini o'rganmoqchi.", topic: 'Going to (future)' },
          { id: 9, direction: 'en-uz', english: 'His new phone is more expensive than mine.', reference: 'Uning yangi telefoni menikidan qimmatroq.', topic: 'Comparative adjectives' },
          { id: 10, direction: 'en-uz', english: 'Nobody in the class understood the lecture.', reference: "Sinfda hech kim ma'ruzani tushunmadi.", topic: 'Indefinite pronouns' }
        ]
      },
      {
        id: 'multichoice',
        title: '5. Multiple Choice (10 points)',
        description: 'Choose the correct answer.',
        questions: [
          { id: 1, text: 'My sister usually _______ the piano.', options: ['plays', 'is playing', 'played'], correct: 'plays', topic: 'Present Simple vs Continuous' },
          { id: 2, text: 'He _______ his bike when he fell.', options: ['rides', 'was riding', 'rode'], correct: 'was riding', topic: 'Past Continuous (interrupted action)' },
          { id: 3, text: 'We _______ this restaurant before.', options: ['try', 'tried', 'have tried'], correct: 'have tried', topic: 'Present Perfect vs Past Simple' },
          { id: 4, text: "There isn't _______ information about the event.", options: ['much', 'many', 'few'], correct: 'much', topic: 'Quantifiers (much/many/little)' },
          { id: 5, text: 'Her new dress is _______ than her old one.', options: ['prettyer', 'prettier', 'prettiest'], correct: 'prettier', topic: 'Comparative adjectives' }
        ]
      },
      {
        id: 'mixedgrammar',
        title: '6. Mixed Grammar Challenge (10 points)',
        description: 'Choose the best answer.',
        questions: [
          { id: 1, text: 'If they arrive early, we _______ the meeting sooner.', options: ['start', 'will start', 'started'], correct: 'will start', topic: 'First Conditional' },
          { id: 2, text: 'The kids introduced _______ to the new teacher.', options: ['themselves', 'theirselves', 'them'], correct: 'themselves', topic: 'Reflexive pronouns' },
          { id: 3, text: 'She works as _______ artist in the city.', options: ['a', 'an', 'the'], correct: 'an', topic: 'Articles (a/an)' },
          { id: 4, text: 'He _______ at this hospital since 2016.', options: ['work', 'worked', 'has worked'], correct: 'has worked', topic: 'Present Perfect (duration)' },
          { id: 5, text: 'Which sentence is correct?', options: ['You should to rest more.', 'You should rests more.', 'You should rest more.'], correct: 'You should rest more.', topic: 'Modal verbs (should)' }
        ]
      },
      {
        id: 'transformation',
        title: '7. Sentence Transformation (5 points)',
        description: 'Rewrite the sentences without changing the meaning.',
        questions: [
          { id: 1, original: 'She began teaching at this school two years ago.', starter: 'She has', reference: 'been teaching at this school for 2 years.', topic: 'Simple Past → Present Perfect' },
          { id: 2, original: 'This mountain is higher than all the mountains nearby.', starter: 'This is the', reference: 'highest mountain nearby.', topic: 'Comparative → Superlative' },
          { id: 3, original: 'I am planning to buy new shoes.', starter: 'I am', reference: 'going to buy new shoes.', topic: 'Present Continuous → Going to' },
          { id: 4, original: 'She was writing a letter. Then the phone rang.', starter: 'While she', reference: 'was writing a letter, the phone rang.', topic: 'Past Continuous linking' },
          { id: 5, original: 'He does not usually complain about work.', starter: 'He rarely', reference: 'complains about work.', topic: 'Frequency adverbs' }
        ]
      },
      {
        id: 'writing',
        title: '8. Short Writing Task (5 points)',
        description: 'Write 10-12 sentences about ONE of the topics below.',
        topics: [
          { key: 'A', label: 'My Free Time Habits' },
          { key: 'B', label: 'My Travel Plans' },
          { key: 'C', label: 'My Favorite Food' }
        ],
        mustUse: [
          'present simple',
          'present continuous',
          'past simple',
          'future form',
          'at least 3 adjectives',
          'at least 2 adverbs'
        ],
        questions: [
          { id: 1, reference: 'Should be 10-12 sentences, relevant to the chosen topic, correctly using all the required grammar structures (present simple, present continuous, past simple, future form, 3+ adjectives, 2+ adverbs).' }
        ]
      }
    ]
  },
  {
    id: 'test_5',
    title: 'Imtihon 1.2 - Variant E',
    description: 'Beginner → Elementary. 8 qismli test: xatolarni topish, bo\'shliqlarni to\'ldirish, so\'zlarni tartiblash, tarjima, ko\'p tanlovli va yozma vazifalar.',
    sections: [
      {
        id: 'mistakes',
        title: '1. Correct the Mistakes (20 points)',
        description: 'Some sentences contain MORE than one mistake. Gaplardagi xatolarni toping va to\'g\'ri shaklda qayta yozing.',
        questions: [
          { id: 1, original: "Javlon don't usually missing classes.", reference: "Javlon doesn't usually miss classes.", topic: 'Present Simple (verb agreement)' },
          { id: 2, original: 'My aunt have already booked the tickets.', reference: 'My aunt has already booked the tickets.', topic: 'Present Perfect' },
          { id: 3, original: "There isn't much apples in the basket.", reference: "There aren't many apples in the basket.", topic: 'Quantifiers (much/many)' },
          { id: 4, original: 'I am not liking this cold weather.', reference: 'I do not like this cold weather.', topic: 'Present Simple (stative verbs)' },
          { id: 5, original: 'He watch a match when the power went out.', reference: 'He was watching a match when the power went out.', topic: 'Past Continuous + Past Simple' },
          { id: 6, original: 'The mouses ran across the kitchen floor.', reference: 'The mice ran across the kitchen floor.', topic: 'Irregular plural nouns' },
          { id: 7, original: 'They have never try such spicy soup.', reference: 'They have never tried such spicy soup.', topic: 'Present Perfect (never)' },
          { id: 8, original: 'Neither the players nor the coach seem happy with the result.', reference: 'Neither the players nor the coach seems happy with the result.', topic: 'Neither...nor agreement' },
          { id: 9, original: 'She refused answer the difficult question.', reference: 'She refused to answer the difficult question.', topic: 'Verb patterns (to-infinitive)' },
          { id: 10, original: 'He going to repair the roof next spring.', reference: 'He is going to repair the roof next spring.', topic: 'Going to (future)' }
        ]
      },
      {
        id: 'gaps',
        title: '2. Fill in the Gaps (20 points)',
        description: 'Fill each gap with ONE suitable word or phrase.',
        questions: [
          { id: 1, text: 'Last winter, they _______________ (build) a snowman.', type: 'text', correct: 'built', topic: 'Past Simple (irregular verbs)' },
          { id: 2, text: 'Right now, my brother _______________ (repair) his bicycle.', type: 'text', correct: 'is', topic: 'Present Continuous' },
          { id: 3, text: 'She has taught here _______________ 2017.', type: 'text', correct: 'since', topic: 'since / for' },
          { id: 4, text: "There isn't _______________ light in this room.", type: 'text', correct: 'enough', topic: 'Quantifiers (enough)' },
          { id: 5, text: 'We _______________ already booked our tickets.', type: 'text', correct: 'have', topic: 'Present Perfect' },
          { id: 6, text: 'This is _______________ oldest building in the town.', type: 'text', correct: 'the', topic: 'Superlative adjectives' },
          { id: 7, text: 'The lake was still, but _______________ the wind picked up.', type: 'text', correct: 'suddenly', topic: 'Adverbs of manner' },
          { id: 8, text: 'He _______________ going to join the football club.', type: 'text', correct: 'is', topic: 'Going to (future)' },
          { id: 9, text: 'She feeds the cat _______________ morning.', type: 'text', correct: 'every', topic: 'Quantifiers (every)' },
          { id: 10, text: 'The old woman smiled _______________ (warm) at the children.', type: 'text', correct: 'warmly', topic: 'Adverbs of manner' }
        ]
      },
      {
        id: 'reorder',
        title: '3. Reorder the Words (10 points)',
        description: 'Make meaningful and grammatically correct sentences.',
        questions: [
          { id: 1, scrambled: ['is', 'film', 'exciting', 'an', 'this'], answer: 'This is an exciting film.', topic: 'Word order (adjectives)' },
          { id: 2, scrambled: ['been', 'have', 'training', 'athletes', 'stadium', 'since', 'the', 'morning', 'the'], answer: 'The athletes have been training in the stadium since morning.', topic: 'Present Perfect Continuous' },
          { id: 3, scrambled: ['genuinely', 'was', 'performance', 'impressive', 'the'], answer: 'The performance was genuinely impressive.', topic: 'Word order (intensifying adverb)' },
          { id: 4, scrambled: ['who', 'calling', 'is', 'you'], answer: 'Who is calling you?', topic: 'Question word order' }
        ]
      },
      {
        id: 'translate',
        title: '4. Translation (20 points)',
        description: 'Uzbek → English (1-5) va English → Uzbek (6-10) gaplarni tarjima qiling.',
        questions: [
          { id: 1, direction: 'uz-en', uzbek: 'U dushanba kunlari sport zaliga boradi.', reference: 'He goes to the gym on Mondays.', topic: 'Present Simple (habitual)' },
          { id: 2, direction: 'uz-en', uzbek: "Men uyg'onganimda quyosh charaqlab turgan edi.", reference: 'When I woke up, the sun was shining.', topic: 'Past Continuous' },
          { id: 3, direction: 'uz-en', uzbek: "Men hali kitobni qaytarib bo'lganim yo'q.", reference: 'I have not returned the book yet.', topic: 'Present Perfect (negative)' },
          { id: 4, direction: 'uz-en', uzbek: 'Yigit gapni ravon va tez aytdi.', reference: 'The boy spoke fluently and quickly.', topic: 'Adverbs of manner' },
          { id: 5, direction: 'uz-en', uzbek: "Ular bahorda bog' barpo etishni rejalashtiryapti.", reference: 'They are going to set up a garden in spring.', topic: 'Going to (future)' },
          { id: 6, direction: 'en-uz', english: 'She has never flown in an airplane before.', reference: 'U hech qachon samolyotda uchmagan.', topic: 'Present Perfect (experience)' },
          { id: 7, direction: 'en-uz', english: 'We were sleeping when the storm began.', reference: "Bo'ron boshlanganda biz uxlayotgan edik.", topic: 'Past Continuous + when' },
          { id: 8, direction: 'en-uz', english: 'He is going to start his own business next year.', reference: "U keyingi yil o'z biznesini boshlamoqchi.", topic: 'Going to (future)' },
          { id: 9, direction: 'en-uz', english: 'This chair is more comfortable than that sofa.', reference: "Bu stul o'sha divandan qulayroq.", topic: 'Comparative adjectives' },
          { id: 10, direction: 'en-uz', english: 'Nobody at the party recognized the singer.', reference: "Ziyofatda hech kim qo'shiqchini tanimadi.", topic: 'Indefinite pronouns' }
        ]
      },
      {
        id: 'multichoice',
        title: '5. Multiple Choice (10 points)',
        description: 'Choose the correct answer.',
        questions: [
          { id: 1, text: 'My grandfather usually _______ tea after dinner.', options: ['drinks', 'is drinking', 'drank'], correct: 'drinks', topic: 'Present Simple vs Continuous' },
          { id: 2, text: 'She _______ dinner when the doorbell rang.', options: ['cooks', 'was cooking', 'cooked'], correct: 'was cooking', topic: 'Past Continuous (interrupted action)' },
          { id: 3, text: 'We _______ that documentary twice.', options: ['watch', 'watched', 'have watched'], correct: 'have watched', topic: 'Present Perfect vs Past Simple' },
          { id: 4, text: 'There are too _______ mistakes in this essay.', options: ['much', 'many', 'little'], correct: 'many', topic: 'Quantifiers (much/many/little)' },
          { id: 5, text: 'This road is _______ than the old one.', options: ['saferer', 'safer', 'safest'], correct: 'safer', topic: 'Comparative adjectives' }
        ]
      },
      {
        id: 'mixedgrammar',
        title: '6. Mixed Grammar Challenge (10 points)',
        description: 'Choose the best answer.',
        questions: [
          { id: 1, text: 'If she practices daily, she _______ the competition.', options: ['win', 'will win', 'won'], correct: 'will win', topic: 'First Conditional' },
          { id: 2, text: 'We introduced _______ to the new neighbors.', options: ['ourselves', 'ourself', 'us'], correct: 'ourselves', topic: 'Reflexive pronouns' },
          { id: 3, text: 'He is _______ honest and hardworking student.', options: ['a', 'an', 'the'], correct: 'an', topic: 'Articles (a/an)' },
          { id: 4, text: 'She _______ in this shop for three years.', options: ['work', 'worked', 'has worked'], correct: 'has worked', topic: 'Present Perfect (duration)' },
          { id: 5, text: 'Which sentence is correct?', options: ['We can to help you.', 'We can helps you.', 'We can help you.'], correct: 'We can help you.', topic: 'Modal verbs (can)' }
        ]
      },
      {
        id: 'transformation',
        title: '7. Sentence Transformation (5 points)',
        description: 'Rewrite the sentences without changing the meaning.',
        questions: [
          { id: 1, original: 'He began coaching the team three years ago.', starter: 'He has', reference: 'been coaching the team for 3 years.', topic: 'Simple Past → Present Perfect' },
          { id: 2, original: 'This building is taller than all the buildings downtown.', starter: 'This is the', reference: 'tallest building downtown.', topic: 'Comparative → Superlative' },
          { id: 3, original: 'They are planning to launch a new app.', starter: 'They are', reference: 'going to launch a new app.', topic: 'Present Continuous → Going to' },
          { id: 4, original: 'He was fixing the fence. Then his neighbor stopped by.', starter: 'While he', reference: 'was fixing the fence, his neighbor stopped by.', topic: 'Past Continuous linking' },
          { id: 5, original: 'She does not usually miss deadlines.', starter: 'She rarely', reference: 'misses deadlines.', topic: 'Frequency adverbs' }
        ]
      },
      {
        id: 'writing',
        title: '8. Short Writing Task (5 points)',
        description: 'Write 10-12 sentences about ONE of the topics below.',
        topics: [
          { key: 'A', label: 'My Morning Routine' },
          { key: 'B', label: 'My Future Career' },
          { key: 'C', label: 'My Hobbies and Interests' }
        ],
        mustUse: [
          'present simple',
          'present continuous',
          'past simple',
          'future form',
          'at least 3 adjectives',
          'at least 2 adverbs'
        ],
        questions: [
          { id: 1, reference: 'Should be 10-12 sentences, relevant to the chosen topic, correctly using all the required grammar structures (present simple, present continuous, past simple, future form, 3+ adjectives, 2+ adverbs).' }
        ]
      }
    ]
  }
];

// ─── THREE IELTS GRAMMAR TESTS DATA ──────────────────────────────────────────
export const IELTS_EXAMS_LIST = [
  {
    id: 'ielts_1',
    title: 'IELTS Academic - Variant A',
    description: 'Academic style, passive voice, complex sentence linking, describing trends and academic summaries.',
    sections: [
      {
        id: 'mistakes',
        title: '1. Correct the Mistakes',
        description: 'Academic gap errors. Find the grammar mistakes in formal/academic sentences and correct them.',
        questions: [
          { id: 1, original: 'Although the population increased, but the resources decreased.', reference: 'Although the population increased, resources decreased. / The population increased, but resources decreased.', topic: 'Conjunctions / Sentence structure' },
          { id: 2, original: 'The chart displays about the export figures of agricultural goods.', reference: 'The chart displays the export figures of agricultural goods. / The chart shows the export figures of agricultural goods.', topic: 'Academic reporting verbs' },
          { id: 3, original: 'It is essential that governments should supports renewable energy.', reference: 'It is essential that governments support renewable energy. / It is essential that governments should support renewable energy.', topic: 'Subjunctives' },
          { id: 4, original: 'The percentage of students who plays sports decreased.', reference: 'The percentage of students who play sports decreased.', topic: 'Subject-verb agreement' },
          { id: 5, original: 'In contrast of the previous year, sales declined in 2020.', reference: 'In contrast to the previous year, sales declined in 2020. / In contrast with the previous year, sales declined in 2020.', topic: 'Prepositions' },
          { id: 6, original: 'The number of people went to university rose.', reference: 'The number of people who went to university rose. / The number of people going to university rose.', topic: 'Relative clauses' },
          { id: 7, original: 'She suggested to implement a new carbon tax policy.', reference: 'She suggested implementing a new carbon tax policy. / She suggested that a new carbon tax policy should be implemented.', topic: 'Gerunds / Infinitives' },
          { id: 8, original: 'This is the most highest figure recorded.', reference: 'This is the highest figure recorded.', topic: 'Superlatives' },
          { id: 9, original: 'Less people attended the lecture than expected.', reference: 'Fewer people attended the lecture than expected.', topic: 'Quantifiers' },
          { id: 10, original: 'The research was did by a team of scientists.', reference: 'The research was conducted by a team of scientists. / The research was done by a team of scientists.', topic: 'Passive voice verbs' }
        ]
      },
      {
        id: 'gaps',
        title: '2. Fill in the Gaps',
        description: 'Complete the sentences using formal IELTS structures (modals, passives, transitions).',
        questions: [
          { id: 1, text: 'Due to the economic recession, the company _______________ (force) to lay off employees last year.', type: 'text', correct: 'was forced', topic: 'Passive voice' },
          { id: 2, text: 'The graph shows the number of cars __________ were manufactured in Europe.', type: 'choice', options: ['who', 'which', 'whose', 'where'], correct: 'which', topic: 'Relative clauses' },
          { id: 3, text: '__________ the high prices, consumers continued to buy organic food.', type: 'choice', options: ['Although', 'Despite', 'In spite', 'However'], correct: 'Despite', topic: 'Contrast linkers' },
          { id: 4, text: 'The data reveals that the rate of recycling has risen _______________ (significance) since 2010.', type: 'text', correct: 'significantly', topic: 'Trend adverbs' },
          { id: 5, text: 'By the end of next decade, scientists _______________ (develop) a cure for the virus.', type: 'text', correct: 'will have developed', topic: 'Future perfect' },
          { id: 6, text: 'It is highly likely __________ the temperature will continue to rise.', type: 'choice', options: ['that', 'which', 'for', 'to'], correct: 'that', topic: 'Reporting clauses' },
          { id: 7, text: 'Not only did the sales decrease, but the production cost _______________ (increase) as well.', type: 'text', correct: 'increased', topic: 'Inversions' },
          { id: 8, text: 'The figures _______________ (analyze) before the final report was published.', type: 'text', correct: 'were analyzed', topic: 'Passive voice' },
          { id: 9, text: 'There was a sharp rise __________ the number of graduates.', type: 'choice', options: ['in', 'of', 'on', 'with'], correct: 'in', topic: 'Prepositions' },
          { id: 10, text: 'The company, __________ CEO recently resigned, is facing bankruptcy.', type: 'choice', options: ['whose', 'which', 'who', 'whom'], correct: 'whose', topic: 'Relative pronouns' }
        ]
      },
      {
        id: 'translate',
        title: '3. Translate Test',
        description: 'Translate formal/academic Uzbek sentences into academic English. (LM Studio baholaydi)',
        questions: [
          { id: 1, uzbek: 'Narxlar oshganiga qaramay, talab yuqoriligicha qoldi.', reference: 'Despite the increase in prices, demand remained high. / Although prices increased, demand remained high.', topic: 'Contrast linkers' },
          { id: 2, uzbek: 'Ushbu hisobotda iqlim o\'zgarishining ta\'siri muhokama qilinadi.', reference: 'This report discusses the effects of climate change. / The impact of climate change is discussed in this report.', topic: 'Academic reporting' },
          { id: 3, uzbek: 'Ushbu ma\'lumotlar shuni ko\'rsatadiki, ishsizlik darajasi keskin pasaygan.', reference: 'This data shows that the unemployment rate has declined sharply. / The data indicates that the unemployment rate decreased dramatically.', topic: 'Describing trends' },
          { id: 4, uzbek: 'Yangi qonun kelgusi yilning yanvar oyidan joriy qilinadi.', reference: 'The new law will be introduced in January next year. / The new regulation will be implemented starting next January.', topic: 'Passive voice / Future' },
          { id: 5, uzbek: 'Qayta tiklanadigan energiya manbalari atrof-muhit ifloslanishini sezilarli darajada kamaytiradi.', reference: 'Renewable energy sources significantly reduce environmental pollution.', topic: 'Academic vocabulary' }
        ]
      },
      {
        id: 'reorder',
        title: '4. Reorder the Words',
        description: 'Formulate grammatically correct complex academic sentences.',
        questions: [
          { id: 1, scrambled: ['the', 'increased', 'sharply', 'number', 'of', 'tourists'], answer: 'The number of tourists increased sharply.', topic: 'Trend syntax' },
          { id: 2, scrambled: ['while', 'increased', 'exports', 'imports', 'declined'], answer: 'While exports increased, imports declined.', topic: 'Comparison linking' },
          { id: 3, scrambled: ['is', 'argued', 'that', 'education', 'should', 'be', 'free', 'it'], answer: 'It is argued that education should be free.', topic: 'Passive reporting clauses' },
          { id: 4, scrambled: ['factors', 'led', 'to', 'this', 'crisis', 'several'], answer: 'Several factors led to this crisis.', topic: 'Cause and effect' },
          { id: 5, scrambled: ['majority', 'a', 'of', 'participants', 'agreed', 'with', 'the', 'decision'], answer: 'A majority of participants agreed with the decision.', topic: 'Formal quantifiers' }
        ]
      },
      {
        id: 'production',
        title: '5. Open Academic Production',
        description: 'Write academic sentences expressing data and arguments.',
        questions: [
          { id: 1, prompt: 'Write a sentence describing a chart trend using a verb + adverb combination (e.g. decreased dramatically, fluctuated wildly)', referencePattern: 'Graph trends description (e.g. Sales fluctuated wildly in the second quarter.)', topic: 'Trend description' },
          { id: 2, prompt: 'Write an academic sentence using "Despite" or "In spite of" followed by a noun phrase.', referencePattern: 'Concession clause (e.g. Despite the lack of funding, the research was completed.)', topic: 'Concession structures' },
          { id: 3, prompt: 'Write a passive sentence using a reporting verb (e.g., "It is widely believed that...")', referencePattern: 'Passive reporting structures (e.g. It is believed that technology enhances learning.)', topic: 'Formal voice' }
        ]
      },
      {
        id: 'inged',
        title: '6. Academic Participles',
        description: 'Choose the appropriate participle forms for academic descriptions.',
        questions: [
          { id: 1, text: 'The graph depicts the _______________ rate of urban growth.', options: ['accelerating', 'accelerated'], correct: 'accelerating', topic: 'Active participle' },
          { id: 2, text: 'Participants _______________ in the study were aged between 18 and 25.', options: ['involving', 'involved'], correct: 'involved', topic: 'Passive participle' },
          { id: 3, text: 'The results, _______________ last week, surprised many researchers.', options: ['publishing', 'published'], correct: 'published', topic: 'Reduced relative clauses' },
          { id: 4, text: 'With rising temperatures _______________ polar ice, sea levels are rising.', options: ['melting', 'melted'], correct: 'melting', topic: 'Active causes' },
          { id: 5, text: 'A _______________ amount of resources was allocated to the project.', options: ['limiting', 'limited'], correct: 'limited', topic: 'Adjectival passive' }
        ]
      },
      {
        id: 'reading',
        title: '7. Reading Summary Completion',
        description: 'Read the short text and answer academic comprehension questions.',
        passage: 'The process of urbanization has accelerated rapidly over the last fifty years. In 1970, only 37% of the global population lived in cities. By 2020, this figure had risen to over 56%, and it is projected to reach 68% by 2050. This shift is primarily driven by industrial development and better job opportunities in urban centers.',
        questions: [
          { id: 1, question: 'What was the urbanization rate in 1970?', reference: '37% / 37 percent', topic: 'Data identification' },
          { id: 2, question: 'What percentage is predicted for 2050?', reference: '68% / 68 percent', topic: 'Projections' },
          { id: 3, question: 'What is the main driver of this urban shift?', reference: 'industrial development and better job opportunities / industrial development', topic: 'Cause extraction' }
        ]
      }
    ]
  },
  {
    id: 'ielts_2',
    title: 'IELTS Academic - Variant B',
    description: 'Academic syntax, passive voices, complex prepositions, describing trends, cause and effect structures.',
    sections: [
      {
        id: 'mistakes',
        title: '1. Correct the Mistakes',
        description: 'Find grammar errors in formal/academic sentences and correct them.',
        questions: [
          { id: 1, original: 'Although the sales rose, however the profits dropped.', reference: 'Although the sales rose, the profits dropped. / Sales rose; however, profits dropped.', topic: 'Contrast links' },
          { id: 2, original: 'The graph gives information about how many energy was consumed.', reference: 'The graph gives information about how much energy was consumed.', topic: 'Quantifiers' },
          { id: 3, original: 'It is crucial that the policy is implemented immediately.', reference: 'It is crucial that the policy be implemented immediately. / It is crucial that the policy is implemented immediately.', topic: 'Subjunctives' },
          { id: 4, original: 'A range of reasons explain this dramatic increase.', reference: 'A range of reasons explains this dramatic increase.', topic: 'Subject-verb agreement' },
          { id: 5, original: 'Prices decreased of 10 percent last year.', reference: 'Prices decreased by 10 percent last year.', topic: 'Prepositions' },
          { id: 6, original: 'The number of student attending school has grown.', reference: 'The number of students attending school has grown.', topic: 'Plurals' },
          { id: 7, original: 'They recommend to invest in solar power.', reference: 'They recommend investing in solar power. / They recommend that we should invest in solar power.', topic: 'Gerunds' },
          { id: 8, original: 'The temperature rose more fast than before.', reference: 'The temperature rose faster than before.', topic: 'Comparatives' },
          { id: 9, original: 'Most of people agree with this viewpoint.', reference: 'Most people agree with this viewpoint. / Most of the people agree with this viewpoint.', topic: 'Quantifiers' },
          { id: 10, original: 'The experiment was carried out by using old equipment.', reference: 'The experiment was carried out using old equipment.', topic: 'Gerund phrase links' }
        ]
      },
      {
        id: 'gaps',
        title: '2. Fill in the Gaps',
        description: 'Complete the sentences using formal IELTS structures.',
        questions: [
          { id: 1, text: 'This phenomenon _______________ (observe) in multiple studies over the past decade.', type: 'text', correct: 'has been observed', topic: 'Present perfect passive' },
          { id: 2, text: 'The region, __________ suffers from frequent droughts, is agricultural.', type: 'choice', options: ['who', 'which', 'where', 'whose'], correct: 'which', topic: 'Relative clauses' },
          { id: 3, text: '__________ the budget cuts, the department succeeded in completing the project.', type: 'choice', options: ['Although', 'In spite', 'Despite', 'Even though'], correct: 'Despite', topic: 'Contrast transitions' },
          { id: 4, text: 'The graph reveals that production has fallen _______________ (dramatic).', type: 'text', correct: 'dramatically', topic: 'Trend adverbs' },
          { id: 5, text: 'By next December, the new highway _______________ (build).', type: 'text', correct: 'will have been built', topic: 'Future perfect passive' },
          { id: 6, text: 'There is no doubt __________ education leads to better employment opportunities.', type: 'choice', options: ['that', 'what', 'if', 'about'], correct: 'that', topic: 'Noun clauses' },
          { id: 7, text: 'No sooner had the policy been introduced __________ public protests began.', type: 'choice', options: ['than', 'then', 'when', 'that'], correct: 'than', topic: 'Inverted structures' },
          { id: 8, text: 'A database _______________ (create) to store patient details next month.', type: 'text', correct: 'will be created', topic: 'Future passive' },
          { id: 9, text: 'There was a substantial drop __________ the inflation rate.', type: 'choice', options: ['in', 'at', 'on', 'of'], correct: 'in', topic: 'Prepositions' },
          { id: 10, text: 'The country __________ economy is heavily dependent on oil is seeking alternatives.', type: 'choice', options: ['whose', 'which', 'its', 'where'], correct: 'whose', topic: 'Relative clauses' }
        ]
      },
      {
        id: 'translate',
        title: '3. Translate Test',
        description: 'Translate formal/academic Uzbek sentences into academic English. (LM Studio baholaydi)',
        questions: [
          { id: 1, uzbek: 'Moliyaviy yordam yo\'qligiga qaramay, tadqiqot yakunlandi.', reference: 'Despite the lack of financial support, the research was completed. / In spite of the absence of funding, the study was finished.', topic: 'Contrast links' },
          { id: 2, uzbek: 'Bu tadqiqot global isishning sabablarini o\'rganishga qaratilgan.', reference: 'This study aims to examine the causes of global warming. / This research is focused on investigating the causes of global warming.', topic: 'Academic reporting' },
          { id: 3, uzbek: 'Ishlab chiqarish hajmi o\'tgan oyda keskin ko\'tarildi.', reference: 'The volume of production rose sharply last month. / Production figures increased dramatically in the previous month.', topic: 'Describing trends' },
          { id: 4, uzbek: 'Yangi texnologiyalar kelajakda atrof-muhitni asrashga yordam beradi deb hisoblanadi.', reference: 'It is believed that new technologies will help to preserve the environment in the future.', topic: 'Passive reporting / Future' },
          { id: 5, uzbek: 'Soliqlarning oshishi iste\'molchilar xarajatlarini sezilarli darajada kamaytirdi.', reference: 'The increase in taxes significantly reduced consumer spending.', topic: 'Academic vocabulary' }
        ]
      },
      {
        id: 'reorder',
        title: '4. Reorder the Words',
        description: 'Formulate grammatically correct complex academic sentences.',
        questions: [
          { id: 1, scrambled: ['dropped', 'significantly', 'number', 'the', 'of', 'unemployed', 'people'], answer: 'The number of unemployed people dropped significantly.', topic: 'Trend syntax' },
          { id: 2, scrambled: ['whereas', 'grew', 'imports', 'fell', 'exports'], answer: 'Whereas imports grew, exports fell.', altAnswer: 'Exports fell whereas imports grew.', topic: 'Comparison linking' },
          { id: 3, scrambled: ['is', 'assumed', 'that', 'warming', 'global', 'human-made', 'is', 'it'], answer: 'It is assumed that global warming is human-made.', topic: 'Passive reporting clauses' },
          { id: 4, scrambled: ['consequences', 'had', 'severe', 'this', 'decision'], answer: 'This decision had severe consequences.', topic: 'Cause and effect' },
          { id: 5, scrambled: ['percentage', 'a', 'small', 'of', 'citizens', 'voted'], answer: 'A small percentage of citizens voted.', topic: 'Formal quantifiers' }
        ]
      },
      {
        id: 'production',
        title: '5. Open Academic Production',
        description: 'Write academic sentences expressing data and arguments.',
        questions: [
          { id: 1, prompt: 'Write a sentence describing a chart trend using a noun + adjective combination (e.g. there was a dramatic decline, a gradual increase)', referencePattern: 'Graph trends description (e.g. There was a gradual increase in oil consumption.)', topic: 'Trend description' },
          { id: 2, prompt: 'Write an academic sentence using "In contrast to" or "Compared with" to compare two figures.', referencePattern: 'Comparison clause (e.g. In contrast to Europe, Asia experienced high growth.)', topic: 'Comparison structures' },
          { id: 3, prompt: 'Write an inverted academic sentence starting with "Not only..."', referencePattern: 'Inverted sentence structure (e.g. Not only did they lose the match, but they also lost their captain.)', topic: 'Advanced syntax' }
        ]
      },
      {
        id: 'inged',
        title: '6. Academic Participles',
        description: 'Choose the appropriate participle forms for academic descriptions.',
        questions: [
          { id: 1, text: 'There is a _______________ demand for renewable energy sources.', options: ['growing', 'grown'], correct: 'growing', topic: 'Active participle' },
          { id: 2, text: 'The data _______________ in the graph covers a ten-year period.', options: ['presenting', 'presented'], correct: 'presented', topic: 'Passive participle' },
          { id: 3, text: 'Scientists, _______________ the sample under a microscope, found bacteria.', options: ['examining', 'examined'], correct: 'examining', topic: 'Active participle clause' },
          { id: 4, text: 'With rising sea levels _______________ coastal areas, residents are moving.', options: ['threatening', 'threatened'], correct: 'threatening', topic: 'Active causes' },
          { id: 5, text: 'A _______________ amount of energy is lost during transmission.', options: ['significant', 'significated'], correct: 'significant', topic: 'Academic adjectives' }
        ]
      },
      {
        id: 'reading',
        title: '7. Reading Summary Completion',
        description: 'Read the short text and answer academic comprehension questions.',
        passage: 'Global energy demand has grown by 85% since 1990, driven by rapid industrialization in developing countries. While fossil fuels remain the dominant source, accounting for 78% of consumption, solar and wind power are expanding at an unprecedented rate, increasing by 20% annually over the last decade.',
        questions: [
          { id: 1, question: 'By how much has global energy demand grown since 1990?', reference: '85% / 85 percent', topic: 'Data identification' },
          { id: 2, question: 'What percentage of energy consumption comes from fossil fuels?', reference: '78% / 78 percent', topic: 'Data identification' },
          { id: 3, question: 'What is the annual growth rate of solar and wind power?', reference: '20% / 20 percent', topic: 'Projections / Trends' }
        ]
      }
    ]
  }
];
