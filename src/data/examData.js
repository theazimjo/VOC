// ─── FIVE DISTINCT GRAMMAR TESTS DATA ─────────────────────────────────────────
export const EXAMS_LIST = [
  {
    id: 'test_1',
    title: 'Imtihon 1.2 - Variant A',
    description: 'Present Continuous, Articles, Numerals, Adverbs va Sifat darajalari bo\'yicha test to\'plami.',
    sections: [
      {
        id: 'mistakes',
        title: '1. Correct the Mistakes',
        description: 'Gaplardagi grammatik xatolarni toping va ularni to\'g\'rilab yozing.',
        questions: [
          { id: 1, original: 'She is more taller than me.', reference: 'She is taller than me.', topic: 'Degrees of adjectives' },
          { id: 2, original: 'He speak English very good.', reference: 'He speaks English very well.', topic: 'Adverbs / Verb Agreement' },
          { id: 3, original: 'I saw an university yesterday.', reference: 'I saw a university yesterday.', topic: 'Articles' },
          { id: 4, original: 'The children is bored.', reference: 'The children are bored.', topic: 'Subject-Verb Agreement' },
          { id: 5, original: 'This is most interesting book.', reference: 'This is the most interesting book.', topic: 'Degrees of adjectives' },
          { id: 6, original: 'They have three hundreds dollars.', reference: 'They have three hundred dollars.', topic: 'Numerals' },
          { id: 7, original: 'She sings beautiful.', reference: 'She sings beautifully.', topic: 'Adverbs' },
          { id: 8, original: 'He can swims very fast.', reference: 'He can swim very fast.', topic: 'Verb agreement' },
          { id: 9, original: 'Tom is elder than me.', reference: 'Tom is older than me.', topic: 'Irregular adjectives' },
          { id: 10, original: 'We was very excited.', reference: 'We were very excited.', topic: 'Verb agreement' },
        ]
      },
      {
        id: 'gaps',
        title: '2. Fill in the Gaps',
        description: 'Qavs ichidagi so\'zlar yoki to\'g\'ri artikllar yordamida bo\'shliqlarni to\'ldiring.',
        questions: [
          { id: 1, text: 'I bought ___ apple.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'an', topic: 'Articles' },
          { id: 2, text: 'She is ___ engineer.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'an', topic: 'Articles' },
          { id: 3, text: '___ moon is beautiful tonight.', type: 'choice', options: ['A', 'An', 'The', 'no article'], correct: 'The', topic: 'Articles' },
          { id: 4, text: 'We stayed at ___ hotel near the airport.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'the', topic: 'Articles' },
          { id: 5, text: 'He is ___ honest man.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'an', topic: 'Articles' },
          { id: 6, text: 'This book is _______________ (interesting) than that one.', type: 'text', correct: 'more interesting', topic: 'Degrees of adjectives' },
          { id: 7, text: 'She is the _______________ (smart) student in class.', type: 'text', correct: 'smartest', topic: 'Degrees of adjectives' },
          { id: 8, text: 'Today is _______________ (hot) than yesterday.', type: 'text', correct: 'hotter', topic: 'Degrees of adjectives' },
          { id: 9, text: 'Tom is as _______________ (tall) as Bob.', type: 'text', correct: 'tall', topic: 'As ... as comparison' },
          { id: 10, text: 'This is the _______________ (bad) film I\'ve ever seen.', type: 'text', correct: 'worst', topic: 'Irregular adjectives' },
          { id: 11, text: 'She speaks English _______________ (fluent).', type: 'text', correct: 'fluently', topic: 'Adverbs' },
          { id: 12, text: 'They worked _______________ (careful).', type: 'text', correct: 'carefully', topic: 'Adverbs' },
          { id: 13, text: 'He answered the question _______________ (quick).', type: 'text', correct: 'quickly', topic: 'Adverbs' },
          { id: 14, text: 'I am _______________ ready. (near)', type: 'text', correct: 'nearly', topic: 'Adverbs' },
          { id: 15, text: 'The baby slept _______________ (peaceful).', type: 'text', correct: 'peacefully', topic: 'Adverbs' }
        ]
      },
      {
        id: 'translate',
        title: '3. Translate Test',
        description: 'Berilgan o\'zbekcha gaplarni ingliz tiliga tarjima qiling. (LM Studio yoki Self-graded orqali baholanadi)',
        questions: [
          { id: 1, uzbek: 'U mendan balandroq.', reference: 'He is taller than me. / She is taller than me.', topic: 'Degrees of adjectives' },
          { id: 2, uzbek: 'Bu men ko\'rgan eng yaxshi film.', reference: 'This is the best film I\'ve ever seen. / This is the best movie I have ever seen.', topic: 'Irregular adjectives' },
          { id: 3, uzbek: 'Men deyarli tayyorman.', reference: 'I am almost ready. / I\'m nearly ready.', topic: 'Adverbs' },
          { id: 4, uzbek: 'U juda tez yuguradi.', reference: 'He runs very fast. / She runs very fast.', topic: 'Adverbs' },
          { id: 5, uzbek: 'Quyosh sharqdan chiqadi.', reference: 'The sun rises in the east.', topic: 'Articles' },
          { id: 6, uzbek: 'U shifokor.', reference: 'She is a doctor. / He is a doctor.', topic: 'Articles' },
          { id: 7, uzbek: 'Men ikki soat davomida o\'qiyapman.', reference: 'I have been studying for two hours. / I have been learning for two hours.', topic: 'Present Continuous / Perfect Continuous context' },
          { id: 8, uzbek: 'Bu xona menikidan ikki marta katta.', reference: 'This room is twice as big as mine. / This room is two times bigger than mine.', topic: 'As ... as comparison / Numerals' },
          { id: 9, uzbek: 'Men bir juft kitob sotib oldim.', reference: 'I bought a pair of books. / I bought two books.', topic: 'Numerals' },
          { id: 10, uzbek: 'Ular juda ehtiyotkorlik bilan ishlashdi.', reference: 'They worked very carefully. / They worked carefully.', topic: 'Adverbs' }
        ]
      },
      {
        id: 'reorder',
        title: '4. Reorder the Words',
        description: 'Aralashtirib berilgan so\'zlardan to\'g\'ri gap hosil qiling. So\'zlarni tartib bilan bosing.',
        questions: [
          { id: 1, scrambled: ['is', 'book', 'very', 'this', 'interesting'], answer: 'This book is very interesting.', topic: 'Word order / Adjectives' },
          { id: 2, scrambled: ['taller', 'Bob', 'Tom', 'than', 'is'], answer: 'Tom is taller than Bob.', altAnswer: 'Bob is taller than Tom.', topic: 'Degrees of adjectives' },
          { id: 3, scrambled: ['English', 'speaks', 'she', 'fluently'], answer: 'She speaks English fluently.', topic: 'Adverbs' },
          { id: 4, scrambled: ['homework', 'my', 'I', 'finished', 'have'], answer: 'I have finished my homework.', topic: 'Word order' },
          { id: 5, scrambled: ['the', 'smartest', 'is', 'student', 'she'], answer: 'She is the smartest student.', topic: 'Degrees of adjectives' },
          { id: 6, scrambled: ['like', 'coffee', 'do', 'not', 'I'], answer: 'I do not like coffee.', topic: 'Word order' },
          { id: 7, scrambled: ['watching', 'they', 'are', 'TV'], answer: 'They are watching TV.', topic: 'Present Continuous' },
          { id: 8, scrambled: ['is', 'weather', 'colder', 'the', 'getting'], answer: 'The weather is getting colder.', topic: 'Present Continuous / Comparison' }
        ]
      },
      {
        id: 'production',
        title: '5. Open Grammar Production',
        description: 'Berilgan qoliplardan foydalanib o\'zingiz mustaqil ravishda gap yozing. (LM Studio yoki Self-graded orqali baholanadi)',
        questions: [
          { id: 1, prompt: 'Write a sentence using a comparative adjective (e.g., taller than, more expensive than)', referencePattern: 'Comparative adjective comparison (e.g. My car is faster than yours.)', topic: 'Degrees of adjectives' },
          { id: 2, prompt: 'Write a sentence using a superlative adjective (e.g., the best, the most interesting)', referencePattern: 'Superlative adjective (e.g. He is the smartest boy in our school.)', topic: 'Degrees of adjectives' },
          { id: 3, prompt: 'Write a sentence using "as ... as" structure (e.g., as busy as, as fast as)', referencePattern: 'Equality comparison (e.g. She is as beautiful as her mother.)', topic: 'As ... as comparison' },
          { id: 4, prompt: 'Write a sentence using "more and more" or "comparative + and + comparative" (e.g., getting more and more popular, warmer and warmer)', referencePattern: 'Gradual increase structure (e.g. English is getting more and more important.)', topic: 'Degrees of adjectives / Present Continuous' },
          { id: 5, prompt: 'Write a sentence using an adverb of frequency (e.g., always, usually, sometimes, never)', referencePattern: 'Frequency adverb usage (e.g. I always wake up early in the morning.)', topic: 'Adverbs' }
        ]
      },
      {
        id: 'inged',
        title: '6. -ing / -ed Adjectives',
        description: 'Gap mazmuniga ko\'ra eng to\'g\'ri sifat formasini tanlang.',
        questions: [
          { id: 1, text: 'The movie was very _______________.', options: ['boring', 'bored'], correct: 'boring', topic: '-ing / -ed Adjectives' },
          { id: 2, text: 'I was _______________ in the lesson.', options: ['interesting', 'interested'], correct: 'interested', topic: '-ing / -ed Adjectives' },
          { id: 3, text: 'The game is really _______________.', options: ['excited', 'exciting'], correct: 'exciting', topic: '-ing / -ed Adjectives' },
          { id: 4, text: 'She felt _______________ after work.', options: ['tired', 'tiring'], correct: 'tired', topic: '-ing / -ed Adjectives' },
          { id: 5, text: 'The news was _______________.', options: ['shocking', 'shocked'], correct: 'shocking', topic: '-ing / -ed Adjectives' }
        ]
      },
      {
        id: 'reading',
        title: '7. Reading Passage Questions',
        description: 'Matnni o\'qing va savollarga ingliz tilida qisqa javob yozing. (LM Studio yoki Self-graded orqali baholanadi)',
        passage: 'Tom is a friendly student. He studies English very carefully. He is more hardworking than his friends. Yesterday, he finished three difficult exercises. Now he is preparing for his exam. He wants to become an engineer in the future.',
        questions: [
          { id: 1, question: 'What adjective describes Tom?', reference: 'friendly / hardworking', topic: 'Adjectives' },
          { id: 2, question: 'What adverb describes how he studies?', reference: 'carefully / very carefully', topic: 'Adverbs' },
          { id: 3, question: 'Find one comparative adjective.', reference: 'more hardworking', topic: 'Degrees of adjectives' },
          { id: 4, question: 'Which tense is used in: "He is preparing"?', reference: 'Present Continuous / Present Continuous tense', topic: 'Present Continuous' },
          { id: 5, question: 'What job does Tom want?', reference: 'engineer / an engineer', topic: 'Articles / Numerals context' }
        ]
      }
    ]
  },
  {
    id: 'test_2',
    title: 'Imtihon 1.2 - Variant B',
    description: 'Present Continuous, Articles, Numerals, Adverbs va Sifat darajalari bo\'yicha test to\'plami.',
    sections: [
      {
        id: 'mistakes',
        title: '1. Correct the Mistakes',
        description: 'Gaplardagi grammatik xatolarni toping va ularni to\'g\'rilab yozing.',
        questions: [
          { id: 1, original: 'My brother is more older than Bob.', reference: 'My brother is older than Bob.', topic: 'Degrees of adjectives' },
          { id: 2, original: 'She runs very good.', reference: 'She runs very well.', topic: 'Adverbs / Verb Agreement' },
          { id: 3, original: 'We visited a old church yesterday.', reference: 'We visited an old church yesterday.', topic: 'Articles' },
          { id: 4, original: 'The student are studying now.', reference: 'The students are studying now. / The student is studying now.', topic: 'Subject-Verb Agreement' },
          { id: 5, original: 'He is worst singer in the country.', reference: 'He is the worst singer in the country.', topic: 'Degrees of adjectives' },
          { id: 6, original: 'I have two thousands dollars.', reference: 'I have two thousand dollars.', topic: 'Numerals' },
          { id: 7, original: 'They speak loud.', reference: 'They speak loudly.', topic: 'Adverbs' },
          { id: 8, original: 'She can sings beautifully.', reference: 'She can sing beautifully.', topic: 'Verb agreement' },
          { id: 9, original: 'This car is elder than mine.', reference: 'This car is older than mine.', topic: 'Irregular adjectives' },
          { id: 10, original: 'They was playing football.', reference: 'They were playing football.', topic: 'Verb agreement' },
        ]
      },
      {
        id: 'gaps',
        title: '2. Fill in the Gaps',
        description: 'Qavs ichidagi so\'zlar yoki to\'g\'ri artikllar yordamida bo\'shliqlarni to\'ldiring.',
        questions: [
          { id: 1, text: 'I saw ___ elephant at the zoo.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'an', topic: 'Articles' },
          { id: 2, text: 'He is ___ doctor.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'a', topic: 'Articles' },
          { id: 3, text: '___ sun is shining brightly.', type: 'choice', options: ['A', 'An', 'The', 'no article'], correct: 'The', topic: 'Articles' },
          { id: 4, text: 'She lives in ___ house near the park.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'a', topic: 'Articles' },
          { id: 5, text: 'It was ___ unusual day.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'an', topic: 'Articles' },
          { id: 6, text: 'My house is ___________ (big) than yours.', type: 'text', correct: 'bigger', topic: 'Degrees of adjectives' },
          { id: 7, text: 'He is the ___________ (lazy) person I know.', type: 'text', correct: 'laziest', topic: 'Degrees of adjectives' },
          { id: 8, text: 'This test is ___________ (easy) than the last one.', type: 'text', correct: 'easier', topic: 'Degrees of adjectives' },
          { id: 9, text: 'She is as ___________ (smart) as her sister.', type: 'text', correct: 'smart', topic: 'As ... as comparison' },
          { id: 10, text: 'That was the ___________ (good) meal ever.', type: 'text', correct: 'best', topic: 'Irregular adjectives' },
          { id: 11, text: 'He plays the piano ___________ (beautiful).', type: 'text', correct: 'beautifully', topic: 'Adverbs' },
          { id: 12, text: 'They solved it ___________ (easy).', type: 'text', correct: 'easily', topic: 'Adverbs' },
          { id: 13, text: 'She walked ___________ (slow) because of the rain.', type: 'text', correct: 'slowly', topic: 'Adverbs' },
          { id: 14, text: 'We are ___________ finished. (almost)', type: 'text', correct: 'almost', topic: 'Adverbs' },
          { id: 15, text: 'The dog barked ___________ (angry).', type: 'text', correct: 'angrily', topic: 'Adverbs' }
        ]
      },
      {
        id: 'translate',
        title: '3. Translate Test',
        description: 'Berilgan o\'zbekcha gaplarni ingliz tiliga tarjima qiling. (LM Studio yoki Self-graded orqali baholanadi)',
        questions: [
          { id: 1, uzbek: 'U mendan aqlliroq.', reference: 'He is smarter than me. / She is smarter than me.', topic: 'Degrees of adjectives' },
          { id: 2, uzbek: 'Bu dunyodagi eng qimmat mashina.', reference: 'This is the most expensive car in the world.', topic: 'Irregular adjectives' },
          { id: 3, uzbek: 'Men deyarli tugatdim.', reference: 'I am almost finished. / I have nearly finished.', topic: 'Adverbs' },
          { id: 4, uzbek: 'Ular juda sokin gapirishadi.', reference: 'They speak very quietly. / They talk very quietly.', topic: 'Adverbs' },
          { id: 5, uzbek: 'Yer quyosh atrofida aylanadi.', reference: 'The earth goes around the sun. / The earth rotates around the sun.', topic: 'Articles' },
          { id: 6, uzbek: 'U muhandis.', reference: 'He is an engineer. / She is an engineer.', topic: 'Articles' },
          { id: 7, uzbek: 'Mening onam hozir tushlik pishiryapti.', reference: 'My mother is cooking lunch now. / My mom is preparing lunch now.', topic: 'Present Continuous' },
          { id: 8, uzbek: 'Uning sumkasi menikinidan uch marta og\'irroq.', reference: 'Her bag is three times heavier than mine. / His bag is three times heavier than mine.', topic: 'As ... as comparison / Numerals' },
          { id: 9, uzbek: 'Men o\'nta kitob sotib oldim.', reference: 'I bought ten books. / I purchased ten books.', topic: 'Numerals' },
          { id: 10, uzbek: 'Ular ishni tezda bajarishdi.', reference: 'They did the work quickly. / They finished the task quickly.', topic: 'Adverbs' }
        ]
      },
      {
        id: 'reorder',
        title: '4. Reorder the Words',
        description: 'Aralashtirib berilgan so\'zlardan to\'g\'ri gap hosil qiling. So\'zlarni tartib bilan bosing.',
        questions: [
          { id: 1, scrambled: ['very', 'weather', 'is', 'today', 'the', 'hot'], answer: 'The weather is very hot today.', topic: 'Word order / Adjectives' },
          { id: 2, scrambled: ['faster', 'runs', 'cheetah', 'than', 'a', 'lion', 'a'], answer: 'A cheetah runs faster than a lion.', topic: 'Degrees of adjectives' },
          { id: 3, scrambled: ['quietly', 'children', 'playing', 'the', 'are'], answer: 'The children are playing quietly.', topic: 'Adverbs' },
          { id: 4, scrambled: ['written', 'a', 'has', 'letter', 'he'], answer: 'He has written a letter.', topic: 'Word order' },
          { id: 5, scrambled: ['city', 'in', 'is', 'the', 'largest', 'London', 'UK', 'the'], answer: 'London is the largest city in the UK.', topic: 'Degrees of adjectives' },
          { id: 6, scrambled: ['he', 'speak', 'French', 'not', 'does'], answer: 'He does not speak French.', topic: 'Word order' },
          { id: 7, scrambled: ['we', 'learning', 'grammar', 'English', 'are'], answer: 'We are learning English grammar.', topic: 'Present Continuous' },
          { id: 8, scrambled: ['water', 'warmer', 'is', 'getting', 'the'], answer: 'The water is getting warmer.', topic: 'Present Continuous / Comparison' }
        ]
      },
      {
        id: 'production',
        title: '5. Open Grammar Production',
        description: 'Berilgan qoliplardan foydalanib o\'zingiz mustaqil ravishda gap yozing. (LM Studio yoki Self-graded orqali baholanadi)',
        questions: [
          { id: 1, prompt: 'Write a sentence using a comparative adjective (e.g., taller than, more expensive than)', referencePattern: 'Comparative adjective comparison (e.g. My car is faster than yours.)', topic: 'Degrees of adjectives' },
          { id: 2, prompt: 'Write a sentence using a superlative adjective (e.g., the best, the most interesting)', referencePattern: 'Superlative adjective (e.g. He is the smartest boy in our school.)', topic: 'Degrees of adjectives' },
          { id: 3, prompt: 'Write a sentence using "as ... as" structure (e.g., as busy as, as fast as)', referencePattern: 'Equality comparison (e.g. She is as beautiful as her mother.)', topic: 'As ... as comparison' },
          { id: 4, prompt: 'Write a sentence using "more and more" or "comparative + and + comparative" (e.g., getting more and more popular, warmer and warmer)', referencePattern: 'Gradual increase structure (e.g. English is getting more and more important.)', topic: 'Degrees of adjectives / Present Continuous' },
          { id: 5, prompt: 'Write a sentence using an adverb of frequency (e.g., always, usually, sometimes, never)', referencePattern: 'Frequency adverb usage (e.g. I always wake up early in the morning.)', topic: 'Adverbs' }
        ]
      },
      {
        id: 'inged',
        title: '6. -ing / -ed Adjectives',
        description: 'Gap mazmuniga ko\'ra eng to\'g\'ri sifat formasini tanlang.',
        questions: [
          { id: 1, text: 'The book was very _______________.', options: ['interesting', 'interested'], correct: 'interesting', topic: '-ing / -ed Adjectives' },
          { id: 2, text: 'She was _______________ after the trip.', options: ['tiring', 'tired'], correct: 'tired', topic: '-ing / -ed Adjectives' },
          { id: 3, text: 'This puzzle is _______________.', options: ['confused', 'confusing'], correct: 'confusing', topic: '-ing / -ed Adjectives' },
          { id: 4, text: 'He felt _______________ about the mistake.', options: ['embarrassed', 'embarrassing'], correct: 'embarrassed', topic: '-ing / -ed Adjectives' },
          { id: 5, text: 'The results were _______________.', options: ['surprised', 'surprising'], correct: 'surprising', topic: '-ing / -ed Adjectives' }
        ]
      },
      {
        id: 'reading',
        title: '7. Reading Passage Questions',
        description: 'Matnni o\'qing va savollarga ingliz tilida qisqa javob yozing. (LM Studio yoki Self-graded orqali baholanadi)',
        passage: 'Sarah is an active girl. She travels very frequently. She is more adventurous than her sister. Last year, she visited five different countries. Now she is writing a travel blog. She wants to explore the whole world in the future.',
        questions: [
          { id: 1, question: 'What adjective describes Sarah?', reference: 'active / adventurous', topic: 'Adjectives' },
          { id: 2, question: 'What adverb describes how often she travels?', reference: 'frequently / very frequently', topic: 'Adverbs' },
          { id: 3, question: 'Find one comparative adjective.', reference: 'more adventurous', topic: 'Degrees of adjectives' },
          { id: 4, question: 'Which tense is used in: "She is writing"?', reference: 'Present Continuous / Present Continuous tense', topic: 'Present Continuous' },
          { id: 5, question: 'What does Sarah want to explore?', reference: 'the whole world / whole world', topic: 'Articles / Numerals context' }
        ]
      }
    ]
  },
  {
    id: 'test_3',
    title: 'Imtihon 1.2 - Variant C',
    description: 'Present Continuous, Articles, Numerals, Adverbs va Sifat darajalari bo\'yicha test to\'plami.',
    sections: [
      {
        id: 'mistakes',
        title: '1. Correct the Mistakes',
        description: 'Gaplardagi grammatik xatolarni toping va ularni to\'g\'rilab yozing.',
        questions: [
          { id: 1, original: 'My dog is more friendlier than yours.', reference: 'My dog is friendlier than yours.', topic: 'Degrees of adjectives' },
          { id: 2, original: 'He drives the car very safe.', reference: 'He drives the car very safely.', topic: 'Adverbs / Verb Agreement' },
          { id: 3, original: 'She wants to buy a umbrella.', reference: 'She wants to buy an umbrella.', topic: 'Articles' },
          { id: 4, original: 'Many children is playing in the garden.', reference: 'Many children are playing in the garden.', topic: 'Subject-Verb Agreement' },
          { id: 5, original: 'It is the most hot day of summer.', reference: 'It is the hottest day of summer.', topic: 'Degrees of adjectives' },
          { id: 6, original: 'He bought three millions books.', reference: 'He bought three million books.', topic: 'Numerals' },
          { id: 7, original: 'She works hardly.', reference: 'She works hard.', topic: 'Adverbs' },
          { id: 8, original: 'They must to go home now.', reference: 'They must go home now.', topic: 'Verb agreement' },
          { id: 9, original: 'My sister is elder than me.', reference: 'My sister is older than me.', topic: 'Irregular adjectives' },
          { id: 10, original: 'You was very late.', reference: 'You were very late.', topic: 'Verb agreement' },
        ]
      },
      {
        id: 'gaps',
        title: '2. Fill in the Gaps',
        description: 'Qavs ichidagi so\'zlar yoki to\'g\'ri artikllar yordamida bo\'shliqlarni to\'ldiring.',
        questions: [
          { id: 1, text: 'I want ___ orange.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'an', topic: 'Articles' },
          { id: 2, text: 'He works as ___ teacher.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'a', topic: 'Articles' },
          { id: 3, text: '___ sky is blue.', type: 'choice', options: ['A', 'An', 'The', 'no article'], correct: 'The', topic: 'Articles' },
          { id: 4, text: 'We stayed in ___ small hotel.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'a', topic: 'Articles' },
          { id: 5, text: 'She is ___ honest student.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'an', topic: 'Articles' },
          { id: 6, text: 'My brother is ___________ (young) than me.', type: 'text', correct: 'younger', topic: 'Degrees of adjectives' },
          { id: 7, text: 'This is the ___________ (expensive) watch.', type: 'text', correct: 'most expensive', topic: 'Degrees of adjectives' },
          { id: 8, text: 'It is ___________ (cold) today than yesterday.', type: 'text', correct: 'colder', topic: 'Degrees of adjectives' },
          { id: 9, text: 'He is as ___________ (brave) as a lion.', type: 'text', correct: 'brave', topic: 'As ... as comparison' },
          { id: 10, text: 'That was the ___________ (bad) decision.', type: 'text', correct: 'worst', topic: 'Irregular adjectives' },
          { id: 11, text: 'She sings ___________ (sweet).', type: 'text', correct: 'sweetly', topic: 'Adverbs' },
          { id: 12, text: 'They answered ___________ (polite).', type: 'text', correct: 'politely', topic: 'Adverbs' },
          { id: 13, text: 'He walked ___________ (quick) to catch the bus.', type: 'text', correct: 'quickly', topic: 'Adverbs' },
          { id: 14, text: 'It is ___________ dark. (nearly)', type: 'text', correct: 'nearly', topic: 'Adverbs' },
          { id: 15, text: 'The baby cried ___________ (loud).', type: 'text', correct: 'loudly', topic: 'Adverbs' }
        ]
      },
      {
        id: 'translate',
        title: '3. Translate Test',
        description: 'Berilgan o\'zbekcha gaplarni ingliz tiliga tarjima qiling. (LM Studio yoki Self-graded orqali baholanadi)',
        questions: [
          { id: 1, uzbek: 'U mendan chaqqonroq.', reference: 'He is quicker than me. / She is faster than me.', topic: 'Degrees of adjectives' },
          { id: 2, uzbek: 'Bu mening eng sevimli kitobim.', reference: 'This is my favorite book. / This is my favourite book.', topic: 'Irregular adjectives' },
          { id: 3, uzbek: 'Men deyarli tayyorman.', reference: 'I am almost ready. / I\'m nearly ready.', topic: 'Adverbs' },
          { id: 4, uzbek: 'U juda chiroyli kuylaydi.', reference: 'She sings very beautifully. / He sings beautifully.', topic: 'Adverbs' },
          { id: 5, uzbek: 'Oy tunda porlaydi.', reference: 'The moon shines at night. / The moon glows in the night.', topic: 'Articles' },
          { id: 6, uzbek: 'U uchuvchi.', reference: 'He is a pilot. / She is a pilot.', topic: 'Articles' },
          { id: 7, uzbek: 'Ular hozir ingliz tilini o\'rganishyapti.', reference: 'They are learning English now. / They are studying English now.', topic: 'Present Continuous' },
          { id: 8, uzbek: 'Ushbu xona narigi xonadan ikki marta kichikroq.', reference: 'This room is twice as small as the other one. / This room is two times smaller.', topic: 'As ... as comparison / Numerals' },
          { id: 9, uzbek: 'U beshta olma sotib oldim.', reference: 'He bought five apples. / She bought five apples.', topic: 'Numerals' },
          { id: 10, uzbek: 'Ular ehtiyotkorlik bilan yozishdi.', reference: 'They wrote carefully. / They wrote very carefully.', topic: 'Adverbs' }
        ]
      },
      {
        id: 'reorder',
        title: '4. Reorder the Words',
        description: 'Aralashtirib berilgan so\'zlardan to\'g\'ri gap hosil qiling. So\'zlarni tartib bilan bosing.',
        questions: [
          { id: 1, scrambled: ['learning', 'English', 'we', 'are', 'school', 'at'], answer: 'We are learning English at school.', topic: 'Word order / Adjectives' },
          { id: 2, scrambled: ['than', 'she', 'shorter', 'is', 'sister', 'her'], answer: 'She is shorter than her sister.', topic: 'Degrees of adjectives' },
          { id: 3, scrambled: ['well', 'he', 'speaks', 'English', 'very'], answer: 'He speaks English very well.', topic: 'Adverbs' },
          { id: 4, scrambled: ['they', 'match', 'won', 'have', 'the'], answer: 'They have won the match.', topic: 'Word order' },
          { id: 5, scrambled: ['student', 'class', 'in', 'the', 'smartest', 'he', 'is'], answer: 'He is the smartest student in class.', topic: 'Degrees of adjectives' },
          { id: 6, scrambled: ['not', 'they', 'like', 'do', 'tea'], answer: 'They do not like tea.', topic: 'Word order' },
          { id: 7, scrambled: ['she', 'reading', 'is', 'book', 'a'], answer: 'She is reading a book.', topic: 'Present Continuous' },
          { id: 8, scrambled: ['colder', 'getting', 'is', 'day', 'each', 'weather', 'the'], answer: 'The weather is getting colder each day.', topic: 'Present Continuous / Comparison' }
        ]
      },
      {
        id: 'production',
        title: '5. Open Grammar Production',
        description: 'Berilgan qoliplardan foydalanib o\'zingiz mustaqil ravishda gap yozing. (LM Studio yoki Self-graded orqali baholanadi)',
        questions: [
          { id: 1, prompt: 'Write a sentence using a comparative adjective (e.g., taller than, more expensive than)', referencePattern: 'Comparative adjective comparison (e.g. My car is faster than yours.)', topic: 'Degrees of adjectives' },
          { id: 2, prompt: 'Write a sentence using a superlative adjective (e.g., the best, the most interesting)', referencePattern: 'Superlative adjective (e.g. He is the smartest boy in our school.)', topic: 'Degrees of adjectives' },
          { id: 3, prompt: 'Write a sentence using "as ... as" structure (e.g., as busy as, as fast as)', referencePattern: 'Equality comparison (e.g. She is as beautiful as her mother.)', topic: 'As ... as comparison' },
          { id: 4, prompt: 'Write a sentence using "more and more" or "comparative + and + comparative" (e.g., getting more and more popular, warmer and warmer)', referencePattern: 'Gradual increase structure (e.g. English is getting more and more important.)', topic: 'Degrees of adjectives / Present Continuous' },
          { id: 5, prompt: 'Write a sentence using an adverb of frequency (e.g., always, usually, sometimes, never)', referencePattern: 'Frequency adverb usage (e.g. I always wake up early in the morning.)', topic: 'Adverbs' }
        ]
      },
      {
        id: 'inged',
        title: '6. -ing / -ed Adjectives',
        description: 'Gap mazmuniga ko\'ra eng to\'g\'ri sifat formasini tanlang.',
        questions: [
          { id: 1, text: 'The book was so _______________.', options: ['boring', 'bored'], correct: 'boring', topic: '-ing / -ed Adjectives' },
          { id: 2, text: 'She was _______________ about the party.', options: ['exciting', 'excited'], correct: 'excited', topic: '-ing / -ed Adjectives' },
          { id: 3, text: 'The news was _______________.', options: ['shocking', 'shocked'], correct: 'shocking', topic: '-ing / -ed Adjectives' },
          { id: 4, text: 'He felt _______________ after running.', options: ['tired', 'tiring'], correct: 'tired', topic: '-ing / -ed Adjectives' },
          { id: 5, text: 'This math problem is _______________.', options: ['confused', 'confusing'], correct: 'confusing', topic: '-ing / -ed Adjectives' }
        ]
      },
      {
        id: 'reading',
        title: '7. Reading Passage Questions',
        description: 'Matnni o\'qing va savollarga ingliz tilida qisqa javob yozing. (LM Studio yoki Self-graded orqali baholanadi)',
        passage: 'Jane is a quiet student. She listens to her teachers very attentively. She is more disciplined than her classmates. Yesterday, she finished all her homework. Now she is preparing for the science competition. She wants to become a doctor in the future.',
        questions: [
          { id: 1, question: 'What adjective describes Jane?', reference: 'quiet / disciplined', topic: 'Adjectives' },
          { id: 2, question: 'What adverb describes how she listens?', reference: 'attentively / very attentively', topic: 'Adverbs' },
          { id: 3, question: 'Find one comparative adjective.', reference: 'more disciplined', topic: 'Degrees of adjectives' },
          { id: 4, question: 'Which tense is used in: "She is preparing"?', reference: 'Present Continuous / Present Continuous tense', topic: 'Present Continuous' },
          { id: 5, question: 'What job does Jane want?', reference: 'doctor / a doctor', topic: 'Articles / Numerals context' }
        ]
      }
    ]
  },
  {
    id: 'test_4',
    title: 'Imtihon 1.2 - Variant D',
    description: 'Present Continuous, Articles, Numerals, Adverbs va Sifat darajalari bo\'yicha test to\'plami.',
    sections: [
      {
        id: 'mistakes',
        title: '1. Correct the Mistakes',
        description: 'Gaplardagi grammatik xatolarni toping va ularni to\'g\'rilab yozing.',
        questions: [
          { id: 1, original: 'This laptop is more cheaper than that one.', reference: 'This laptop is cheaper than that one.', topic: 'Degrees of adjectives' },
          { id: 2, original: 'She plays tennis very good.', reference: 'She plays tennis very well.', topic: 'Adverbs / Verb Agreement' },
          { id: 3, original: 'I want to eat a apple now.', reference: 'I want to eat an apple now.', topic: 'Articles' },
          { id: 4, original: 'The people is waiting outside.', reference: 'The people are waiting outside.', topic: 'Subject-Verb Agreement' },
          { id: 5, original: 'It was most interesting trip.', reference: 'It was the most interesting trip.', topic: 'Degrees of adjectives' },
          { id: 6, original: 'They have four thousands workers.', reference: 'They have four thousand workers.', topic: 'Numerals' },
          { id: 7, original: 'They walked quiet.', reference: 'They walked quietly.', topic: 'Adverbs' },
          { id: 8, original: 'He should swims every day.', reference: 'He should swim every day.', topic: 'Verb agreement' },
          { id: 9, original: 'My uncle is elder than my father.', reference: 'My uncle is older than my father.', topic: 'Irregular adjectives' },
          { id: 10, original: 'We was studying together.', reference: 'We were studying together.', topic: 'Verb agreement' },
        ]
      },
      {
        id: 'gaps',
        title: '2. Fill in the Gaps',
        description: 'Qavs ichidagi so\'zlar yoki to\'g\'ri artikllar yordamida bo\'shliqlarni to\'ldiring.',
        questions: [
          { id: 1, text: 'She wants to buy ___ car.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'a', topic: 'Articles' },
          { id: 2, text: 'He is ___ architect.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'an', topic: 'Articles' },
          { id: 3, text: '___ wind is blowing hard.', type: 'choice', options: ['A', 'An', 'The', 'no article'], correct: 'The', topic: 'Articles' },
          { id: 4, text: 'I saw ___ interesting film.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'an', topic: 'Articles' },
          { id: 5, text: 'It was ___ beautiful night.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'a', topic: 'Articles' },
          { id: 6, text: 'Gold is ___________ (heavy) than silver.', type: 'text', correct: 'heavier', topic: 'Degrees of adjectives' },
          { id: 7, text: 'She is the ___________ (pretty) girl in class.', type: 'text', correct: 'prettiest', topic: 'Degrees of adjectives' },
          { id: 8, text: 'His room is ___________ (clean) than mine.', type: 'text', correct: 'cleaner', topic: 'Degrees of adjectives' },
          { id: 9, text: 'I am not as ___________ (rich) as him.', type: 'text', correct: 'rich', topic: 'As ... as comparison' },
          { id: 10, text: 'This is the ___________ (bad) storm this year.', type: 'text', correct: 'worst', topic: 'Irregular adjectives' },
          { id: 11, text: 'They ran ___________ (quick).', type: 'text', correct: 'quickly', topic: 'Adverbs' },
          { id: 12, text: 'She answered the call ___________ (immediate).', type: 'text', correct: 'immediately', topic: 'Adverbs' },
          { id: 13, text: 'He spoke ___________ (angry) during the debate.', type: 'text', correct: 'angrily', topic: 'Adverbs' },
          { id: 14, text: 'We are ___________ ready. (nearly)', type: 'text', correct: 'nearly', topic: 'Adverbs' },
          { id: 15, text: 'The children laughed ___________ (happy).', type: 'text', correct: 'happily', topic: 'Adverbs' }
        ]
      },
      {
        id: 'translate',
        title: '3. Translate Test',
        description: 'Berilgan o\'zbekcha gaplarni ingliz tiliga tarjima qiling. (LM Studio yoki Self-graded orqali baholanadi)',
        questions: [
          { id: 1, uzbek: 'Bu mashina menikinidan tezroq.', reference: 'This car is faster than mine.', topic: 'Degrees of adjectives' },
          { id: 2, uzbek: 'Bu biz ko\'rgan eng yomon o\'yin bo\'ldi.', reference: 'This was the worst game we have ever seen.', topic: 'Irregular adjectives' },
          { id: 3, uzbek: 'Men deyarli tugatib qoldim.', reference: 'I have nearly finished. / I am almost done.', topic: 'Adverbs' },
          { id: 4, uzbek: 'Ular juda baland ovozda gaplashishyapti.', reference: 'They are speaking very loudly. / They are talking very loudly.', topic: 'Adverbs' },
          { id: 5, uzbek: 'Er quyosh atrofida aylanadi.', reference: 'The earth goes around the sun.', topic: 'Articles' },
          { id: 6, uzbek: 'U shifokor bo\'lib ishlaydi.', reference: 'She works as a doctor. / He works as a doctor.', topic: 'Articles' },
          { id: 7, uzbek: 'Hozir yomg\'ir yog\'yapti.', reference: 'It is raining now. / It\'s raining right now.', topic: 'Present Continuous' },
          { id: 8, uzbek: 'Mening xonam senikidan ikki marta issiqroq.', reference: 'My room is twice as warm as yours. / My room is two times warmer than yours.', topic: 'As ... as comparison / Numerals' },
          { id: 9, uzbek: 'Men beshta kitob sotib oldim.', reference: 'I bought five books. / I purchased five books.', topic: 'Numerals' },
          { id: 10, uzbek: 'Ular vazifani ehtiyotkorlik bilan bajarishdi.', reference: 'They did the task carefully. / They performed the duty carefully.', topic: 'Adverbs' }
        ]
      },
      {
        id: 'reorder',
        title: '4. Reorder the Words',
        description: 'Aralashtirib berilgan so\'zlardan to\'g\'ri gap hosil qiling. So\'zlarni tartib bilan bosing.',
        questions: [
          { id: 1, scrambled: ['is', 'colder', 'getting', 'water', 'the'], answer: 'The water is getting colder.', topic: 'Word order / Adjectives' },
          { id: 2, scrambled: ['than', 'smarter', 'she', 'brother', 'is', 'her'], answer: 'She is smarter than her brother.', topic: 'Degrees of adjectives' },
          { id: 3, scrambled: ['loudly', 'they', 'speaking', 'are'], answer: 'They are speaking loudly.', topic: 'Adverbs' },
          { id: 4, scrambled: ['the', 'homework', 'done', 'has', 'he'], answer: 'He has done the homework.', topic: 'Word order' },
          { id: 5, scrambled: ['tallest', 'is', 'the', 'boy', 'he', 'school', 'in'], answer: 'He is the tallest boy in school.', topic: 'Degrees of adjectives' },
          { id: 6, scrambled: ['not', 'coffee', 'she', 'does', 'like'], answer: 'She does not like coffee.', topic: 'Word order' },
          { id: 7, scrambled: ['running', 'they', 'park', 'in', 'the', 'are'], answer: 'They are running in the park.', topic: 'Present Continuous' },
          { id: 8, scrambled: ['wind', 'is', 'stronger', 'getting', 'the'], answer: 'The wind is getting stronger.', topic: 'Present Continuous / Comparison' }
        ]
      },
      {
        id: 'production',
        title: '5. Open Grammar Production',
        description: 'Berilgan qoliplardan foydalanib o\'zingiz mustaqil ravishda gap yozing. (LM Studio yoki Self-graded orqali baholanadi)',
        questions: [
          { id: 1, prompt: 'Write a sentence using a comparative adjective (e.g., taller than, more expensive than)', referencePattern: 'Comparative adjective comparison (e.g. My car is faster than yours.)', topic: 'Degrees of adjectives' },
          { id: 2, prompt: 'Write a sentence using a superlative adjective (e.g., the best, the most interesting)', referencePattern: 'Superlative adjective (e.g. He is the smartest boy in our school.)', topic: 'Degrees of adjectives' },
          { id: 3, prompt: 'Write a sentence using "as ... as" structure (e.g., as busy as, as fast as)', referencePattern: 'Equality comparison (e.g. She is as beautiful as her mother.)', topic: 'As ... as comparison' },
          { id: 4, prompt: 'Write a sentence using "more and more" or "comparative + and + comparative" (e.g., getting more and more popular, warmer and warmer)', referencePattern: 'Gradual increase structure (e.g. English is getting more and more important.)', topic: 'Degrees of adjectives / Present Continuous' },
          { id: 5, prompt: 'Write a sentence using an adverb of frequency (e.g., always, usually, sometimes, never)', referencePattern: 'Frequency adverb usage (e.g. I always wake up early in the morning.)', topic: 'Adverbs' }
        ]
      },
      {
        id: 'inged',
        title: '6. -ing / -ed Adjectives',
        description: 'Gap mazmuniga ko\'ra eng to\'g\'ri sifat formasini tanlang.',
        questions: [
          { id: 1, text: 'This book is so _______________.', options: ['boring', 'bored'], correct: 'boring', topic: '-ing / -ed Adjectives' },
          { id: 2, text: 'They were _______________ with the results.', options: ['disappointing', 'disappointed'], correct: 'disappointed', topic: '-ing / -ed Adjectives' },
          { id: 3, text: 'The film was extremely _______________.', options: ['exciting', 'excited'], correct: 'exciting', topic: '-ing / -ed Adjectives' },
          { id: 4, text: 'He felt _______________ after the hard work.', options: ['tired', 'tiring'], correct: 'tired', topic: '-ing / -ed Adjectives' },
          { id: 5, text: 'The news is _______________.', options: ['shocking', 'shocked'], correct: 'shocking', topic: '-ing / -ed Adjectives' }
        ]
      },
      {
        id: 'reading',
        title: '7. Reading Passage Questions',
        description: 'Matnni o\'qing va savollarga ingliz tilida qisqa javob yozing. (LM Studio yoki Self-graded orqali baholanadi)',
        passage: 'Alex is a cheerful boy. He runs in the park very quickly. He is more energetic than his brother. Yesterday, he ran five kilometers. Now he is stretching his muscles. He wants to become an athlete in the future.',
        questions: [
          { id: 1, question: 'What adjective describes Alex?', reference: 'cheerful / energetic', topic: 'Adjectives' },
          { id: 2, question: 'What adverb describes how he runs?', reference: 'quickly / very quickly', topic: 'Adverbs' },
          { id: 3, question: 'Find one comparative adjective.', reference: 'more energetic', topic: 'Degrees of adjectives' },
          { id: 4, question: 'Which tense is used in: "He is stretching"?', reference: 'Present Continuous / Present Continuous tense', topic: 'Present Continuous' },
          { id: 5, question: 'What does Alex want to become?', reference: 'an athlete / athlete', topic: 'Articles / Numerals context' }
        ]
      }
    ]
  },
  {
    id: 'test_5',
    title: 'Imtihon 1.2 - Variant E',
    description: 'Present Continuous, Articles, Numerals, Adverbs va Sifat darajalari bo\'yicha test to\'plami.',
    sections: [
      {
        id: 'mistakes',
        title: '1. Correct the Mistakes',
        description: 'Gaplardagi grammatik xatolarni toping va ularni to\'g\'rilab yozing.',
        questions: [
          { id: 1, original: 'My car is more faster than yours.', reference: 'My car is faster than yours.', topic: 'Degrees of adjectives' },
          { id: 2, original: 'She writes English very bad.', reference: 'She writes English very badly.', topic: 'Adverbs / Verb Agreement' },
          { id: 3, original: 'He wants to buy a interesting book.', reference: 'He wants to buy an interesting book.', topic: 'Articles' },
          { id: 4, original: 'The baby are sleeping now.', reference: 'The baby is sleeping now.', topic: 'Subject-Verb Agreement' },
          { id: 5, original: 'This is most beautiful view.', reference: 'This is the most beautiful view.', topic: 'Degrees of adjectives' },
          { id: 6, original: 'We have five thousands dollars.', reference: 'We have five thousand dollars.', topic: 'Numerals' },
          { id: 7, original: 'They walked quick.', reference: 'They walked quickly.', topic: 'Adverbs' },
          { id: 8, original: 'She can writes very well.', reference: 'She can write very well.', topic: 'Verb agreement' },
          { id: 9, original: 'My grandfather is elder than Bob.', reference: 'My grandfather is older than Bob.', topic: 'Irregular adjectives' },
          { id: 10, original: 'They was learning English.', reference: 'They were learning English.', topic: 'Verb agreement' },
        ]
      },
      {
        id: 'gaps',
        title: '2. Fill in the Gaps',
        description: 'Qavs ichidagi so\'zlar yoki to\'g\'ri artikllar yordamida bo\'shliqlarni to\'ldiring.',
        questions: [
          { id: 1, text: 'I want to eat ___ banana.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'a', topic: 'Articles' },
          { id: 2, text: 'She is ___ actress.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'an', topic: 'Articles' },
          { id: 3, text: '___ stars are shining tonight.', type: 'choice', options: ['A', 'An', 'The', 'no article'], correct: 'The', topic: 'Articles' },
          { id: 4, text: 'We stayed in ___ beautiful house.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'a', topic: 'Articles' },
          { id: 5, text: 'He is ___ honest lawyer.', type: 'choice', options: ['a', 'an', 'the', 'no article'], correct: 'an', topic: 'Articles' },
          { id: 6, text: 'Iron is ___________ (hard) than wood.', type: 'text', correct: 'harder', topic: 'Degrees of adjectives' },
          { id: 7, text: 'This is the ___________ (cold) place on Earth.', type: 'text', correct: 'coldest', topic: 'Degrees of adjectives' },
          { id: 8, text: 'Math is ___________ (easy) than history for me.', type: 'text', correct: 'easier', topic: 'Degrees of adjectives' },
          { id: 9, text: 'He is as ___________ (strong) as his father.', type: 'text', correct: 'strong', topic: 'As ... as comparison' },
          { id: 10, text: 'That was the ___________ (bad) day of my life.', type: 'text', correct: 'worst', topic: 'Irregular adjectives' },
          { id: 11, text: 'She works ___________ (diligent).', type: 'text', correct: 'diligently', topic: 'Adverbs' },
          { id: 12, text: 'They answered ___________ (rude).', type: 'text', correct: 'rudely', topic: 'Adverbs' },
          { id: 13, text: 'He smiled ___________ (happy) at the news.', type: 'text', correct: 'happily', topic: 'Adverbs' },
          { id: 14, text: 'The train is ___________ late. (usually)', type: 'text', correct: 'usually', topic: 'Adverbs' },
          { id: 15, text: 'The baby slept ___________ (peaceful).', type: 'text', correct: 'peacefully', topic: 'Adverbs' }
        ]
      },
      {
        id: 'translate',
        title: '3. Translate Test',
        description: 'Berilgan o\'zbekcha gaplarni ingliz tiliga tarjima qiling. (LM Studio yoki Self-graded orqali baholanadi)',
        questions: [
          { id: 1, uzbek: 'Bu ko\'l ancha chuqurroq.', reference: 'This lake is much deeper.', topic: 'Degrees of adjectives' },
          { id: 2, uzbek: 'Bu men ko\'rgan eng yomon film bo\'ldi.', reference: 'This was the worst movie I have ever seen.', topic: 'Irregular adjectives' },
          { id: 3, uzbek: 'Men deyarli tayyorman.', reference: 'I am almost ready. / I\'m nearly ready.', topic: 'Adverbs' },
          { id: 4, uzbek: 'Ular juda tez yugurishdi.', reference: 'They ran very fast. / They ran quickly.', topic: 'Adverbs' },
          { id: 5, uzbek: 'Dunyo go\'zaldir.', reference: 'The world is beautiful.', topic: 'Articles' },
          { id: 6, uzbek: 'U o\'qituvchi bo\'lib ishlaydi.', reference: 'He works as a teacher. / She works as a teacher.', topic: 'Articles' },
          { id: 7, uzbek: 'Ular televizor tomosha qilishyapti.', reference: 'They are watching TV. / They are watching television.', topic: 'Present Continuous' },
          { id: 8, uzbek: 'Mening mashinam senikidan ikki marta og\'irroq.', reference: 'My car is twice as heavy as yours. / My car is two times heavier than yours.', topic: 'As ... as comparison / Numerals' },
          { id: 9, uzbek: 'Men beshta olma sotib oldim.', reference: 'I bought five apples.', topic: 'Numerals' },
          { id: 10, uzbek: 'Ular vazifani ehtiyotkorlik bilan yozishdi.', reference: 'They wrote the task carefully. / They wrote carefully.', topic: 'Adverbs' }
        ]
      },
      {
        id: 'reorder',
        title: '4. Reorder the Words',
        description: 'Aralashtirib berilgan so\'zlardan to\'g\'ri gap hosil qiling. So\'zlarni tartib bilan bosing.',
        questions: [
          { id: 1, scrambled: ['is', 'getting', 'weather', 'warmer', 'the'], answer: 'The weather is getting warmer.', topic: 'Word order / Adjectives' },
          { id: 2, scrambled: ['than', 'heavier', 'this', 'box', 'that', 'is', 'one'], answer: 'This box is heavier than that one.', topic: 'Degrees of adjectives' },
          { id: 3, scrambled: ['politely', 'they', 'speaking', 'are'], answer: 'They are speaking politely.', topic: 'Adverbs' },
          { id: 4, scrambled: ['the', 'book', 'read', 'has', 'he'], answer: 'He has read the book.', topic: 'Word order' },
          { id: 5, scrambled: ['smartest', 'is', 'the', 'girl', 'she', 'class', 'in'], answer: 'She is the smartest girl in class.', topic: 'Degrees of adjectives' },
          { id: 6, scrambled: ['not', 'coffee', 'I', 'do', 'drink'], answer: 'I do not drink coffee.', topic: 'Word order' },
          { id: 7, scrambled: ['studying', 'they', 'library', 'in', 'the', 'are'], answer: 'They are studying in the library.', topic: 'Present Continuous' },
          { id: 8, scrambled: ['wind', 'colder', 'getting', 'is', 'the'], answer: 'The wind is getting colder.', topic: 'Present Continuous / Comparison' }
        ]
      },
      {
        id: 'production',
        title: '5. Open Grammar Production',
        description: 'Berilgan qoliplardan foydalanib o\'zingiz mustaqil ravishda gap yozing. (LM Studio yoki Self-graded orqali baholanadi)',
        questions: [
          { id: 1, prompt: 'Write a sentence using a comparative adjective (e.g., taller than, more expensive than)', referencePattern: 'Comparative adjective comparison (e.g. My car is faster than yours.)', topic: 'Degrees of adjectives' },
          { id: 2, prompt: 'Write a sentence using a superlative adjective (e.g., the best, the most interesting)', referencePattern: 'Superlative adjective (e.g. He is the smartest boy in our school.)', topic: 'Degrees of adjectives' },
          { id: 3, prompt: 'Write a sentence using "as ... as" structure (e.g., as busy as, as fast as)', referencePattern: 'Equality comparison (e.g. She is as beautiful as her mother.)', topic: 'As ... as comparison' },
          { id: 4, prompt: 'Write a sentence using "more and more" or "comparative + and + comparative" (e.g., getting more and more popular, warmer and warmer)', referencePattern: 'Gradual increase structure (e.g. English is getting more and more important.)', topic: 'Degrees of adjectives / Present Continuous' },
          { id: 5, prompt: 'Write a sentence using an adverb of frequency (e.g., always, usually, sometimes, never)', referencePattern: 'Frequency adverb usage (e.g. I always wake up early in the morning.)', topic: 'Adverbs' }
        ]
      },
      {
        id: 'inged',
        title: '6. -ing / -ed Adjectives',
        description: 'Gap mazmuniga ko\'ra eng to\'g\'ri sifat formasini tanlang.',
        questions: [
          { id: 1, text: 'This puzzle is very _______________.', options: ['confusing', 'confused'], correct: 'confusing', topic: '-ing / -ed Adjectives' },
          { id: 2, text: 'She felt _______________ after the trip.', options: ['tiring', 'tired'], correct: 'tired', topic: '-ing / -ed Adjectives' },
          { id: 3, text: 'The match was really _______________.', options: ['exciting', 'excited'], correct: 'exciting', topic: '-ing / -ed Adjectives' },
          { id: 4, text: 'He was _______________ with the movie.', options: ['boring', 'bored'], correct: 'bored', topic: '-ing / -ed Adjectives' },
          { id: 5, text: 'The news was _______________.', options: ['shocking', 'shocked'], correct: 'shocking', topic: '-ing / -ed Adjectives' }
        ]
      },
      {
        id: 'reading',
        title: '7. Reading Passage Questions',
        description: 'Matnni o\'qing va savollarga ingliz tilida qisqa javob yozing. (LM Studio yoki Self-graded orqali baholanadi)',
        passage: 'Lucy is a quiet girl. She reads books in the library very quietly. She is more thoughtful than her classmates. Yesterday, she read three stories. Now she is writing in her journal. She wants to become a writer in the future.',
        questions: [
          { id: 1, question: 'What adjective describes Lucy?', reference: 'quiet / thoughtful', topic: 'Adjectives' },
          { id: 2, question: 'What adverb describes how she reads?', reference: 'quietly / very quietly', topic: 'Adverbs' },
          { id: 3, question: 'Find one comparative adjective.', reference: 'more thoughtful', topic: 'Degrees of adjectives' },
          { id: 4, question: 'Which tense is used in: "She is writing"?', reference: 'Present Continuous / Present Continuous tense', topic: 'Present Continuous' },
          { id: 5, question: 'What does Lucy want to become?', reference: 'a writer / writer', topic: 'Articles / Numerals context' }
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

