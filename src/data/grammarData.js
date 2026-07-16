export const grammarData = {
  beginner: {
    label: 'Beginner',
    topics: [
      {
        id: 'sentence-structure',
        title: 'Normal Sentence Structure',
        icon: '📝',
        guide: `## Ingliz tilida oddiy gap tuzilishi

Ingliz tilida asosiy gap tuzilishi: Ega (Subject) + Fe'l (Verb) + To'ldiruvchi (Object) tartibida bo'ladi. Bu tartib o'zbek tilidagidan farq qiladi.

## Asosiy tartib: S + V + O

• She reads books. (U kitob o'qiydi.)
• They play football. (Ular futbol o'ynaydi.)
• He eats an apple. (U olma yeydi.)

## Tasdiqlash gaplari (Affirmative)
Oddiy tasdiqlash gapida: Ega + Fe'l + To'ldiruvchi
Misol: Tom drinks coffee every morning.

## Inkor gaplari (Negative)
Inkor gapida do/does + not ishlatiladi:
• I do not (don't) like fish.
• She does not (doesn't) eat meat.
• They don't watch TV.

## So'roq gaplari (Questions)
So'roq gaplarida fe'l egadan oldin keladi:
• Do you like pizza? (Siz pizza yaxshi ko'rasizmi?)
• Does she speak English? (U ingliz tilida gaplasha oladimi?)
• Are they students? (Ular talabami?)

## Muhim qoidalar
1. Eganing o'rni har doim birinchi bo'ladi
2. Fe'l egaga mos kelishi kerak (u/u/u uchun -s qo'shiladi)
3. To'ldiruvchi fe'ldan keyin keladi
4. Vaqt va joy ifodalari odatda oxirida keladi

## Misollar
• I go to school every day. (Men har kuni maktabga boraman.)
• My sister studies medicine. (Mening singlim tibbiyot o'qiydi.)
• We play tennis on Sundays. (Biz yakshanba kunlari tennis o'ynaymiz.)`,
        questions: [
          { id: 1, text: 'Choose the correct word order:', options: ['Cats milk like.', 'Like cats milk.', 'Cats like milk.', 'Milk cats like.'], correct: 2, explanation: 'English follows Subject-Verb-Object order: Cats (S) like (V) milk (O).' },
          { id: 2, text: 'She ___ to school every day.', options: ['go', 'goes', 'going', 'gone'], correct: 1, explanation: 'Third person singular (she/he/it) takes -s or -es in Simple Present.' },
          { id: 3, text: 'Which sentence is correct?', options: ['Dogs barks at night.', 'The dog bark at night.', 'The dog barks at night.', 'The dog are barking at night.'], correct: 2, explanation: 'Singular subject "the dog" takes "barks" (with -s).' },
          { id: 4, text: 'They ___ football on weekends.', options: ['plays', 'play', 'playing', 'played'], correct: 1, explanation: 'Plural subject "they" does not take -s in Simple Present.' },
          { id: 5, text: 'I ___ not like spicy food.', options: ['am', 'do', 'does', 'is'], correct: 1, explanation: '"Do not" is used with I/you/we/they for negation.' },
          { id: 6, text: 'Choose the correct question:', options: ['Does she likes coffee?', 'Do she like coffee?', 'Does she like coffee?', 'She does like coffee?'], correct: 2, explanation: 'Use "Does" with she/he/it, and the base form of the verb (no -s).' },
          { id: 7, text: 'My father ___ a doctor.', options: ['are', 'am', 'is', 'be'], correct: 2, explanation: '"Is" is used with singular third person subjects.' },
          { id: 8, text: 'Which sentence is in correct word order?', options: ['Every day I to work go.', 'I go to work every day.', 'To work every day I go.', 'Go I to work every day.'], correct: 1, explanation: 'Subject + Verb + Object/Place + Time adverb is the standard order.' },
          { id: 9, text: '___ you speak English?', options: ['Are', 'Is', 'Do', 'Does'], correct: 2, explanation: 'Use "Do" with I/you/we/they in questions.' },
          { id: 10, text: 'She does not ___ TV in the morning.', options: ['watches', 'watching', 'watch', 'watched'], correct: 2, explanation: 'After does not, use the base form of the verb (no -s, no -ing).' },
          { id: 11, text: 'The children ___ in the park.', options: ['plays', 'is playing', 'are playing', 'playing'], correct: 2, explanation: '"Children" is plural, so use "are" + -ing for Present Continuous.' },
          { id: 12, text: 'Which is a correct negative sentence?', options: ['He not work here.', 'He doesn\'t works here.', 'He doesn\'t work here.', 'He no work here.'], correct: 2, explanation: '"Doesn\'t" is used with he/she/it, followed by the base verb (no -s).' },
          { id: 13, text: 'We ___ happy about the news.', options: ['is', 'am', 'are', 'be'], correct: 2, explanation: '"We" (plural) always uses "are".' },
          { id: 14, text: 'My brother and I ___ at home now.', options: ['is', 'am', 'are', 'was'], correct: 2, explanation: '"My brother and I" is a compound subject = plural, use "are".' },
          { id: 15, text: 'The cat ___ on the sofa.', options: ['sleep', 'are sleeping', 'sleeps', 'sleeping'], correct: 2, explanation: 'Singular subject "the cat" takes -s: "sleeps".' },
          { id: 16, text: 'What is wrong with: "He go to the gym every morning"?', options: ['Wrong subject', 'Wrong verb form — should be "goes"', 'Wrong time phrase', 'Nothing is wrong'], correct: 1, explanation: 'He/she/it requires -s/-es: "goes".' },
          { id: 17, text: '___  the students understand the lesson?', options: ['Does', 'Is', 'Do', 'Are'], correct: 2, explanation: '"Students" is plural, so use "Do" in questions.' },
          { id: 18, text: 'I ___ hungry right now.', options: ['are', 'is', 'am', 'be'], correct: 2, explanation: '"I" always uses "am" with the verb to be.' },
          { id: 19, text: 'Choose the correct sentence:', options: ['She don\'t eat vegetables.', 'She doesn\'t eats vegetables.', 'She doesn\'t eat vegetables.', 'She not eat vegetables.'], correct: 2, explanation: '"She" uses "doesn\'t" + base verb.' },
          { id: 20, text: 'My parents ___ in Tashkent.', options: ['lives', 'live', 'is living', 'lives in'], correct: 1, explanation: '"Parents" is plural: "live" (no -s).' },
          { id: 21, text: 'Which sentence has correct word order?', options: ['Quickly runs he.', 'He quickly runs.', 'He runs quickly.', 'Runs quickly he.'], correct: 2, explanation: 'Adverbs of manner usually come after the verb or object.' },
          { id: 22, text: 'Do they ___ a car?', options: ['has', 'have', 'having', 'had'], correct: 1, explanation: 'After "do/does", use the base form: "have".' },
          { id: 23, text: 'It ___ outside today.', options: ['rain', 'raining', 'is raining', 'are raining'], correct: 2, explanation: '"It" is singular, use "is" + verb-ing for Present Continuous.' },
          { id: 24, text: 'Which is NOT correct?', options: ['He reads books.', 'They read books.', 'She read books.', 'I read books.'], correct: 2, explanation: '"She" requires "reads" (with -s) in Simple Present.' },
          { id: 25, text: 'The baby ___ now. Please be quiet.', options: ['sleeps', 'sleep', 'is sleeping', 'are sleeping'], correct: 2, explanation: 'Present Continuous is used for actions happening right now.' },
          { id: 26, text: '___ he work on Saturdays?', options: ['Do', 'Is', 'Are', 'Does'], correct: 3, explanation: '"Does" is used with he/she/it in questions.' },
          { id: 27, text: 'Which sentence is correct?', options: ['We doesn\'t understand.', 'We don\'t understand.', 'We not understand.', 'We do not understands.'], correct: 1, explanation: '"We" uses "don\'t" (do not) for negation.' },
          { id: 28, text: 'My sister and her friend ___ at the library.', options: ['is', 'are', 'am', 'be'], correct: 1, explanation: '"My sister and her friend" = two people = plural = "are".' },
          { id: 29, text: 'What does S-V-O stand for?', options: ['Sound-Voice-Output', 'Subject-Verb-Object', 'Simple-Verbal-Order', 'Sentence-Vocal-Origin'], correct: 1, explanation: 'S-V-O = Subject-Verb-Object — the basic English sentence structure.' },
          { id: 30, text: 'They ___ not at school today.', options: ['is', 'am', 'are', 'do'], correct: 2, explanation: '"They" uses "are" with the verb to be.' },
        ],
        fillBlanks: [
          { id: 1, text: 'She ___ to school every morning.', options: ['go', 'goes', 'going', 'gone'], correct: 1, explanation: 'Third-person singular (she) takes -s/-es: goes.' },
          { id: 2, text: 'I ___ not eat meat. I am vegetarian.', options: ['am', 'do', 'does', 'is'], correct: 1, explanation: '"Do not" is used with I for negation in Simple Present.' },
          { id: 3, text: '___ you like music?', options: ['Are', 'Is', 'Do', 'Does'], correct: 2, explanation: 'Use "Do" with you/I/we/they in questions.' },
          { id: 4, text: 'The baby ___ a lot.', options: ['cry', 'cries', 'crying', 'cried'], correct: 1, explanation: 'Singular subject: baby → cries (consonant + y → ies).' },
          { id: 5, text: 'My parents ___ in Bukhara.', options: ['lives', 'live', 'is living', 'living'], correct: 1, explanation: 'Plural subject: parents → live (no -s).' },
          { id: 6, text: 'He does not ___ coffee.', options: ['drinks', 'drinking', 'drink', 'drank'], correct: 2, explanation: 'After does not, use the base form of the verb.' },
          { id: 7, text: 'We ___ happy today.', options: ['is', 'am', 'are', 'be'], correct: 2, explanation: '"We" always uses "are".' },
          { id: 8, text: 'The dog ___ in the garden every day.', options: ['play', 'plays', 'playing', 'played'], correct: 1, explanation: 'Singular subject: the dog → plays.' },
          { id: 9, text: 'It ___ a beautiful day today.', options: ['am', 'are', 'is', 'be'], correct: 2, explanation: '"It" uses "is".' },
          { id: 10, text: 'They ___ football every weekend.', options: ['plays', 'play', 'playing', 'played'], correct: 1, explanation: 'Plural subject: they → play (no -s).' },
          { id: 11, text: 'My sister and I ___ best friends.', options: ['is', 'am', 'are', 'be'], correct: 2, explanation: '"My sister and I" = two people = plural = are.' },
          { id: 12, text: '___ he speak French?', options: ['Do', 'Is', 'Are', 'Does'], correct: 3, explanation: 'Use "Does" with he/she/it in questions.' },
          { id: 13, text: 'The teacher ___ the lesson carefully.', options: ['explain', 'explains', 'explaining', 'explained'], correct: 1, explanation: 'Singular subject: the teacher → explains.' },
          { id: 14, text: 'We do not ___ TV at night.', options: ['watches', 'watching', 'watch', 'watched'], correct: 2, explanation: 'After do not, use the base form: watch.' },
          { id: 15, text: 'She ___ a new phone last week. Wait — she ___ a new phone every year.', options: ['buys / bought', 'bought / buys', 'buys / buys', 'bought / bought'], correct: 1, explanation: 'Past action: bought. Habit: buys (3rd person singular).' },
          { id: 16, text: 'The students ___ in the classroom right now.', options: ['sits', 'sit', 'are sitting', 'sitting'], correct: 2, explanation: 'Present Continuous: are sitting (action happening now).' },
          { id: 17, text: 'He ___ a doctor.', options: ['are', 'am', 'is', 'be'], correct: 2, explanation: '"He" + singular → is.' },
          { id: 18, text: 'I ___ English every day.', options: ['studies', 'study', 'studying', 'studied'], correct: 1, explanation: 'First-person singular: I → study (no -s).' },
          { id: 19, text: 'Does she ___ in Tashkent?', options: ['lives', 'living', 'live', 'lived'], correct: 2, explanation: 'After does, use the base form: live.' },
          { id: 20, text: 'My brother ___ chess every evening.', options: ['play', 'plays', 'playing', 'played'], correct: 1, explanation: 'Singular subject: my brother → plays.' },
        ],
        scrambled: [
          { id: 1, words: ['school', 'every', 'goes', 'she', 'day'], answer: 'She goes to school every day.', explanation: 'SVO order: Subject + Verb + Object/Place + Time.' },
          { id: 2, words: ['not', 'I', 'like', 'do', 'fish'], answer: 'I do not like fish.', explanation: 'Negative: Subject + do not + base verb + object.' },
          { id: 3, words: ['he', 'does', 'speak', 'English'], answer: 'Does he speak English?', explanation: 'Question: Does + subject + base verb?' },
          { id: 4, words: ['cats', 'like', 'milk'], answer: 'Cats like milk.', explanation: 'Simple SVO sentence: Cats (S) like (V) milk (O).' },
          { id: 5, words: ['the', 'barks', 'dog', 'night', 'at'], answer: 'The dog barks at night.', explanation: 'Singular subject + verb with -s + place + time.' },
          { id: 6, words: ['play', 'we', 'weekends', 'tennis', 'on'], answer: 'We play tennis on weekends.', explanation: 'Subject + verb (no -s) + object + time phrase.' },
          { id: 7, words: ['my', 'work', 'office', 'father', 'does', 'not', 'at'], answer: 'My father does not work at the office.', explanation: 'Negative with does not + base verb.' },
          { id: 8, words: ['are', 'they', 'students'], answer: 'They are students.', explanation: 'Subject + to be + noun.' },
          { id: 9, words: ['morning', 'drinks', 'coffee', 'every', 'she'], answer: 'She drinks coffee every morning.', explanation: 'She (3rd person) + drinks (-s) + object + time.' },
          { id: 10, words: ['am', 'I', 'right', 'now', 'tired'], answer: 'I am tired right now.', explanation: 'I + am + adjective + time phrase.' },
          { id: 11, words: ['the', 'in', 'are', 'children', 'garden'], answer: 'The children are in the garden.', explanation: 'Plural subject + are + place.' },
          { id: 12, words: ['he', 'doctor', 'is', 'a'], answer: 'He is a doctor.', explanation: 'Subject + is + article + noun.' },
          { id: 13, words: ['like', 'do', 'pizza', 'you'], answer: 'Do you like pizza?', explanation: 'Question: Do + subject + base verb + object?' },
          { id: 14, words: ['my', 'medicine', 'studies', 'sister'], answer: 'My sister studies medicine.', explanation: 'Singular subject + studies (-es) + object.' },
          { id: 15, words: ['not', 'does', 'meat', 'eat', 'she'], answer: 'She does not eat meat.', explanation: 'Negative: She + does not + base verb + object.' },
          { id: 16, words: ['the', 'is', 'sofa', 'cat', 'on', 'the', 'sleeping'], answer: 'The cat is sleeping on the sofa.', explanation: 'Present Continuous: Subject + is + verb-ing + place.' },
          { id: 17, words: ['homework', 'every', 'they', 'do', 'evening'], answer: 'They do homework every evening.', explanation: 'Plural subject + verb (no -s) + object + time.' },
          { id: 18, words: ['are', 'and', 'I', 'happy', 'my', 'brother'], answer: 'My brother and I are happy.', explanation: 'Compound subject + are + adjective.' },
          { id: 19, words: ['raining', 'outside', 'is', 'it'], answer: 'It is raining outside.', explanation: 'Weather: It + is + verb-ing + place.' },
          { id: 20, words: ['does', 'the', 'gym', 'to', 'he', 'go'], answer: 'Does he go to the gym?', explanation: 'Question: Does + subject + base verb + place?' },
        ],
        errorCorrection: [
          { id: 1, text: 'She go to school every day.', options: ['She', 'go', 'to school', 'every day'], correct: 1, wrongPart: 'go', correction: 'goes', explanation: '"She" (3rd person singular) requires -s: goes.' },
          { id: 2, text: 'They plays football on weekends.', options: ['They', 'plays', 'football', 'on weekends'], correct: 1, wrongPart: 'plays', correction: 'play', explanation: 'Plural subject "they" → play (no -s).' },
          { id: 3, text: 'He don\'t like spicy food.', options: ['He', 'don\'t like', 'spicy', 'food'], correct: 1, wrongPart: 'don\'t like', correction: 'doesn\'t like', explanation: 'With he/she/it, use "doesn\'t" not "don\'t".' },
          { id: 4, text: 'I am go to the gym every morning.', options: ['I', 'am go', 'to the gym', 'every morning'], correct: 1, wrongPart: 'am go', correction: 'go', explanation: 'Simple Present uses base verb: I go (not I am go).' },
          { id: 5, text: 'My parents lives in Samarkand.', options: ['My parents', 'lives', 'in', 'Samarkand'], correct: 1, wrongPart: 'lives', correction: 'live', explanation: 'Plural subject "parents" → live (no -s).' },
          { id: 6, text: 'Does she likes coffee?', options: ['Does', 'she', 'likes', 'coffee'], correct: 2, wrongPart: 'likes', correction: 'like', explanation: 'After does, use the base form: like (not likes).' },
          { id: 7, text: 'We is happy about the news.', options: ['We', 'is', 'happy', 'about the news'], correct: 1, wrongPart: 'is', correction: 'are', explanation: '"We" uses "are", not "is".' },
          { id: 8, text: 'The dog sleep on the sofa every night.', options: ['The dog', 'sleep', 'on the sofa', 'every night'], correct: 1, wrongPart: 'sleep', correction: 'sleeps', explanation: 'Singular subject "the dog" → sleeps.' },
          { id: 9, text: 'Do he work on Saturdays?', options: ['Do', 'he', 'work', 'on Saturdays'], correct: 0, wrongPart: 'Do', correction: 'Does', explanation: 'Use "Does" with he/she/it.' },
          { id: 10, text: 'She doesn\'t eats breakfast.', options: ['She', 'doesn\'t', 'eats', 'breakfast'], correct: 2, wrongPart: 'eats', correction: 'eat', explanation: 'After doesn\'t, use the base form: eat.' },
          { id: 11, text: 'My brother and I is at home.', options: ['My brother and I', 'is', 'at home', 'No error'], correct: 1, wrongPart: 'is', correction: 'are', explanation: 'Compound subject = plural → are.' },
          { id: 12, text: 'Him is my best friend.', options: ['Him', 'is', 'my best friend', 'No error'], correct: 0, wrongPart: 'Him', correction: 'He', explanation: 'Subject pronoun: He (not Him).' },
          { id: 13, text: 'The children plays in the park.', options: ['The children', 'plays', 'in the park', 'No error'], correct: 1, wrongPart: 'plays', correction: 'play', explanation: '"Children" is plural → play (no -s).' },
          { id: 14, text: 'Does your sister speak French? Yes, she speaks.', options: ['Does your sister', 'speak French', 'she speaks', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — all verb forms are correct here.' },
          { id: 15, text: 'It are cold today.', options: ['It', 'are', 'cold', 'today'], correct: 1, wrongPart: 'are', correction: 'is', explanation: '"It" uses "is".' },
          { id: 16, text: 'I does not understand the question.', options: ['I', 'does not', 'understand', 'the question'], correct: 1, wrongPart: 'does not', correction: 'do not', explanation: '"Do not" is used with I (not "does not").' },
          { id: 17, text: 'She go not to the gym on Mondays.', options: ['She', 'go not', 'to the gym', 'on Mondays'], correct: 1, wrongPart: 'go not', correction: 'does not go', explanation: 'Correct negation: she + does not + base verb.' },
          { id: 18, text: 'We doesn\'t have a car.', options: ['We', 'doesn\'t', 'have', 'a car'], correct: 1, wrongPart: 'doesn\'t', correction: 'don\'t', explanation: '"We" uses "don\'t" (not "doesn\'t").' },
          { id: 19, text: 'The cat are sleeping on the sofa.', options: ['The cat', 'are sleeping', 'on the sofa', 'No error'], correct: 1, wrongPart: 'are sleeping', correction: 'is sleeping', explanation: 'Singular subject "the cat" → is sleeping.' },
          { id: 20, text: 'He go to work by bus every day.', options: ['He', 'go', 'to work by bus', 'every day'], correct: 1, wrongPart: 'go', correction: 'goes', explanation: '"He" (3rd person singular) → goes.' },
        ],
        transform: [
          { id: 1, text: 'Make negative: "She likes coffee."', options: ['She not like coffee.', 'She doesn\'t likes coffee.', 'She doesn\'t like coffee.', 'She isn\'t like coffee.'], correct: 2, explanation: 'She + doesn\'t + base verb (no -s): She doesn\'t like coffee.' },
          { id: 2, text: 'Make a question: "They play football."', options: ['They play football?', 'Does they play football?', 'Do they play football?', 'Are they play football?'], correct: 2, explanation: 'Do + they + base verb: Do they play football?' },
          { id: 3, text: 'Make negative: "He works here."', options: ['He not works here.', 'He doesn\'t work here.', 'He doesn\'t works here.', 'He isn\'t work here.'], correct: 1, explanation: 'He + doesn\'t + base verb: He doesn\'t work here.' },
          { id: 4, text: 'Make a question: "She speaks English."', options: ['She speaks English?', 'Do she speak English?', 'Does she speak English?', 'Is she speak English?'], correct: 2, explanation: 'Does + she + base verb: Does she speak English?' },
          { id: 5, text: 'Make negative: "I like pizza."', options: ['I not like pizza.', 'I don\'t like pizza.', 'I doesn\'t like pizza.', 'I am not like pizza.'], correct: 1, explanation: 'I + don\'t + base verb: I don\'t like pizza.' },
          { id: 6, text: 'Make a question: "He is a teacher."', options: ['Does he a teacher?', 'Is he a teacher?', 'He is a teacher?', 'Do he a teacher?'], correct: 1, explanation: 'With "to be", invert: Is he a teacher?' },
          { id: 7, text: 'Make negative: "We are tired."', options: ['We not are tired.', 'We don\'t tired.', 'We are not tired.', 'We doesn\'t tired.'], correct: 2, explanation: 'With "to be": We are not tired.' },
          { id: 8, text: 'Make a question: "They live in London."', options: ['They live in London?', 'Does they live in London?', 'Are they live in London?', 'Do they live in London?'], correct: 3, explanation: 'Do + they + base verb: Do they live in London?' },
          { id: 9, text: 'Make negative: "She is happy."', options: ['She not happy.', 'She doesn\'t happy.', 'She is not happy.', 'She aren\'t happy.'], correct: 2, explanation: '"To be" negative: She is not happy.' },
          { id: 10, text: 'Make a question: "I study English."', options: ['Study I English?', 'Do I study English?', 'Does I study English?', 'Am I study English?'], correct: 1, explanation: 'Do + I + base verb: Do I study English?' },
          { id: 11, text: 'Make negative: "He drinks tea."', options: ['He don\'t drink tea.', 'He not drink tea.', 'He doesn\'t drink tea.', 'He doesn\'t drinks tea.'], correct: 2, explanation: 'He + doesn\'t + base verb: He doesn\'t drink tea.' },
          { id: 12, text: 'Make a question: "She is at home."', options: ['Does she is at home?', 'Do she at home?', 'Is she at home?', 'She at home?'], correct: 2, explanation: 'With "to be", invert: Is she at home?' },
          { id: 13, text: 'Make negative: "They are students."', options: ['They are not students.', 'They don\'t students.', 'They isn\'t students.', 'They not are students.'], correct: 0, explanation: '"To be" negative: They are not students.' },
          { id: 14, text: 'Make a question: "He plays guitar."', options: ['Do he play guitar?', 'He plays guitar?', 'Does he play guitar?', 'Does he plays guitar?'], correct: 2, explanation: 'Does + he + base verb: Does he play guitar?' },
          { id: 15, text: 'Make negative: "We have a car."', options: ['We haven\'t a car.', 'We don\'t have a car.', 'We doesn\'t have a car.', 'We not have a car.'], correct: 1, explanation: 'We + don\'t + base verb: We don\'t have a car.' },
          { id: 16, text: 'Make a question: "The cat sleeps all day."', options: ['Do the cat sleep all day?', 'Does the cat sleep all day?', 'Does the cat sleeps all day?', 'The cat sleeps all day?'], correct: 1, explanation: 'Does + singular subject + base verb: Does the cat sleep all day?' },
          { id: 17, text: 'Make negative: "You speak Spanish."', options: ['You don\'t speak Spanish.', 'You doesn\'t speak Spanish.', 'You not speak Spanish.', 'You aren\'t speak Spanish.'], correct: 0, explanation: 'You + don\'t + base verb: You don\'t speak Spanish.' },
          { id: 18, text: 'Make a question: "We are ready."', options: ['Do we ready?', 'Does we ready?', 'Are we ready?', 'We are ready?'], correct: 2, explanation: 'With "to be", invert: Are we ready?' },
          { id: 19, text: 'Make negative: "It rains every day."', options: ['It doesn\'t rain every day.', 'It don\'t rain every day.', 'It isn\'t rains every day.', 'It rains not every day.'], correct: 0, explanation: 'It + doesn\'t + base verb: It doesn\'t rain every day.' },
          { id: 20, text: 'Make a question: "My father works on Sundays."', options: ['Do my father work on Sundays?', 'My father works on Sundays?', 'Does my father works on Sundays?', 'Does my father work on Sundays?'], correct: 3, explanation: 'Does + singular subject + base verb: Does my father work on Sundays?' },
        ],
        dialogue: [
          { id: 1, situation: 'You meet a new classmate. They ask about your daily routine.', dialogue: 'A: What time do you usually wake up?\nB: ___', options: ['I usually wake up at 7.', 'He usually wakes up at 7.', 'I am wake up at 7.', 'I waking up at 7.'], correct: 0, explanation: '"I wake up" — first person, base verb, no -s.' },
          { id: 2, situation: 'A friend asks about your sister.', dialogue: 'A: Does your sister study here?\nB: ___', options: ['Yes, she study here.', 'Yes, she studies here.', 'Yes, she studying here.', 'Yes, she is study here.'], correct: 1, explanation: 'She + studies (3rd person singular + -es).' },
          { id: 3, situation: 'You ask your friend about their brother.', dialogue: 'A: ___\nB: No, he works at a hospital.', options: ['Does he work at a school?', 'Do he work at a school?', 'Is he works at a school?', 'He work at a school?'], correct: 0, explanation: 'Does + he + base verb: Does he work...?' },
          { id: 4, situation: 'A teacher asks the class about their homework.', dialogue: 'A: Did you do your homework?\nB: ___', options: ['Yes, I does.', 'Yes, I do.', 'Yes, I did.', 'Yes, I done.'], correct: 2, explanation: 'Past tense question → answer with "did".' },
          { id: 5, situation: 'You describe your friend to someone.', dialogue: 'A: Tell me about your friend Sara.\nB: ___', options: ['She live in London.', 'She living in London.', 'She lives in London.', 'She is live in London.'], correct: 2, explanation: '"She" + lives (3rd person singular).' },
          { id: 6, situation: 'Someone asks if you and your family eat out often.', dialogue: 'A: Do you and your family eat out often?\nB: ___', options: ['No, we doesn\'t eat out often.', 'No, we don\'t eat out often.', 'No, we not eat out.', 'No, we aren\'t eat out.'], correct: 1, explanation: 'We + don\'t + base verb.' },
          { id: 7, situation: 'A classmate asks about your teacher.', dialogue: 'A: Does your teacher speak slowly?\nB: ___', options: ['Yes, she speak slowly.', 'Yes, she speaking slowly.', 'Yes, she speaks slowly.', 'Yes, she do speak slowly.'], correct: 2, explanation: '"She" + speaks (3rd person singular).' },
          { id: 8, situation: 'A friend asks what sport your brother plays.', dialogue: 'A: What sport does your brother play?\nB: ___', options: ['He plays basketball.', 'He play basketball.', 'He playing basketball.', 'He is play basketball.'], correct: 0, explanation: '"He" + plays (3rd person singular).' },
          { id: 9, situation: 'Someone is asking about your working hours.', dialogue: 'A: Do you work on weekends?\nB: ___', options: ['No, I doesn\'t work on weekends.', 'No, I not work on weekends.', 'No, I don\'t work on weekends.', 'No, I working on weekends.'], correct: 2, explanation: 'I + don\'t + base verb.' },
          { id: 10, situation: 'You see your friend\'s cat and say something.', dialogue: 'A: Your cat is so cute! ___ very fluffy.\nB: Thanks! She loves attention.', options: ['They is', 'It are', 'It is', 'He are'], correct: 2, explanation: 'The cat (singular thing) → It is.' },
          { id: 11, situation: 'A new student asks about the schedule.', dialogue: 'A: ___ the class start at 9?\nB: Yes, it does.', options: ['Does', 'Do', 'Is', 'Are'], correct: 0, explanation: '"Does" is used with singular subject "the class".' },
          { id: 12, situation: 'A friend asks about your parents\' job.', dialogue: 'A: What do your parents do?\nB: ___', options: ['They is engineers.', 'They are engineers.', 'They be engineers.', 'Them are engineers.'], correct: 1, explanation: '"They" + are.' },
          { id: 13, situation: 'A coworker asks if your boss is in the office.', dialogue: 'A: Is your boss in the office today?\nB: ___', options: ['No, he don\'t.', 'No, he doesn\'t.', 'No, he isn\'t.', 'No, he aren\'t.'], correct: 2, explanation: 'With "to be": he isn\'t.' },
          { id: 14, situation: 'You tell your friend what time the movie starts.', dialogue: 'A: When does the movie start?\nB: ___', options: ['It start at 8.', 'It starts at 8.', 'It is start at 8.', 'It starting at 8.'], correct: 1, explanation: '"It" + starts (3rd person singular).' },
          { id: 15, situation: 'A friend notices you look tired.', dialogue: 'A: You look tired. ___?\nB: Yes, I am. I stayed up late.', options: ['Are you tired', 'Do you tired', 'Is you tired', 'You are tired'], correct: 0, explanation: 'With "to be": Are you tired?' },
          { id: 16, situation: 'You explain your brother\'s habits.', dialogue: 'A: Does your brother study every day?\nB: ___', options: ['Yes, he study every day.', 'Yes, he does study every day.', 'Yes, he studying every day.', 'Yes, he studies every day.'], correct: 3, explanation: '"He" + studies (3rd person singular).' },
          { id: 17, situation: 'A teacher asks students about their hobbies.', dialogue: 'A: What do you like to do in your free time?\nB: ___', options: ['I likes reading.', 'I like reading.', 'I am like reading.', 'I do reading.'], correct: 1, explanation: '"I" + like (base verb, no -s).' },
          { id: 18, situation: 'You ask your friend about their family.', dialogue: 'A: ___?\nB: They live in Fergana.', options: ['Where does your parents live?', 'Where your parents live?', 'Where do your parents live?', 'Where are your parents live?'], correct: 2, explanation: '"Do" + plural subject + base verb: Where do your parents live?' },
          { id: 19, situation: 'A neighbor sees you exercising and comments.', dialogue: 'A: You exercise every day! ___?\nB: Yes, I run every morning.', options: ['What do you doing', 'What does you do', 'What do you do', 'What you do'], correct: 2, explanation: 'What + do + you + base verb: What do you do?' },
          { id: 20, situation: 'A friend tells you about a problem with the lights.', dialogue: 'A: The lights in the kitchen ___ not working.\nB: Let me check the fuse.', options: ['is', 'am', 'are', 'be'], correct: 2, explanation: '"The lights" is plural → are.' },
        ],
      },
      {
        id: 'pronouns',
        title: 'Pronouns',
        icon: '🔤',
        guide: `## Olmoshlar (Pronouns)

Olmosh — ot o'rnida ishlatiladigan so'z. Ingliz tilida olmoshlarning bir necha turi mavjud.

## Olmosh turlari

1. Shaxs olmoshlari (Personal Pronouns): I, you, he, she, it, we, they
2. Egalik olmoshlari (Possessive Pronouns): mine, yours, his, hers, its, ours, theirs
3. To'ldiruvchi olmoshlar (Object Pronouns): me, you, him, her, it, us, them
4. O'zlik olmoshlari (Reflexive Pronouns): myself, yourself, himself, herself, itself, ourselves, themselves

## Shaxs olmoshlari
• I — birinchi shaxs, birlik (Men)
• You — ikkinchi shaxs, birlik/ko'plik (Sen/Siz)
• He — uchinchi shaxs, birlik, erkak (U - erkak)
• She — uchinchi shaxs, birlik, ayol (U - ayol)
• It — uchinchi shaxs, birlik, narsa/hayvon (U - narsa)
• We — birinchi shaxs, ko'plik (Biz)
• They — uchinchi shaxs, ko'plik (Ular)

## Olmoshlarni to'g'ri ishlatish
Olmosh eganing turi va jinsiga mos kelishi kerak:
• My brother is a doctor. He works at a hospital.
• My sister is a student. She studies English.
• The book is on the table. It is interesting.
• My parents live in Samarkand. They are teachers.

## Qoidalar
1. Olmoshlar takroriy otlarni almashtiradi
2. Jins va songa qarab to'g'ri olmosh tanlanadi
3. Narsa va hayvonlar uchun "it" ishlatiladi (agar jins muhim bo'lmasa)`,
        questions: [
          { id: 1, text: 'My brother is a teacher. ___ works at a school.', options: ['She', 'They', 'He', 'It'], correct: 2, explanation: '"Brother" is male, so use "He".' },
          { id: 2, text: 'The book is interesting. ___ is about history.', options: ['He', 'She', 'They', 'It'], correct: 3, explanation: 'Non-living objects use "It".' },
          { id: 3, text: '___ are students at this university.', options: ['He', 'She', 'They', 'It'], correct: 2, explanation: '"They" refers to multiple people.' },
          { id: 4, text: 'My mother and I went shopping. ___ bought new clothes.', options: ['He', 'She', 'We', 'They'], correct: 2, explanation: '"My mother and I" = We.' },
          { id: 5, text: 'The cat is sleeping. ___ is on the sofa.', options: ['He', 'She', 'They', 'It'], correct: 3, explanation: 'For animals (gender unspecified), use "It".' },
          { id: 6, text: 'Which sentence uses the correct pronoun?', options: ['She and me are friends.', 'Her and I are friends.', 'She and I are friends.', 'Her and me are friends.'], correct: 2, explanation: 'Subject pronouns: "She" and "I" (not "me") for subjects.' },
          { id: 7, text: 'The students passed the exam. ___ were very happy.', options: ['It', 'He', 'She', 'They'], correct: 3, explanation: '"Students" (plural) = "They".' },
          { id: 8, text: '___ is raining outside.', options: ['He', 'She', 'We', 'It'], correct: 3, explanation: 'Weather expressions use the impersonal "It".' },
          { id: 9, text: 'My sister loves cats. ___ has three of them.', options: ['He', 'She', 'They', 'It'], correct: 1, explanation: '"Sister" is female = "She".' },
          { id: 10, text: 'Tom and Jerry are friends. ___ often play together.', options: ['He', 'She', 'It', 'They'], correct: 3, explanation: 'Two people = "They".' },
          { id: 11, text: 'What type of pronoun is "he"?', options: ['Object pronoun', 'Reflexive pronoun', 'Personal pronoun', 'Possessive pronoun'], correct: 2, explanation: '"He" is a personal (subject) pronoun.' },
          { id: 12, text: '___ need to study harder.', options: ['Us', 'Our', 'We', 'Ours'], correct: 2, explanation: '"We" is the subject pronoun; "us" is the object pronoun.' },
          { id: 13, text: 'The children are playing. ___ are in the garden.', options: ['It', 'He', 'She', 'They'], correct: 3, explanation: '"Children" is plural = "They".' },
          { id: 14, text: 'A pronoun replaces a(n) ___', options: ['verb', 'noun', 'adjective', 'adverb'], correct: 1, explanation: 'Pronouns replace nouns to avoid repetition.' },
          { id: 15, text: 'The team won the match. ___ celebrated all night.', options: ['It', 'He', 'They', 'She'], correct: 2, explanation: '"Team" can be treated as plural in British English: "They".' },
          { id: 16, text: 'My grandfather is 80 years old. ___ is still very active.', options: ['She', 'He', 'They', 'It'], correct: 1, explanation: '"Grandfather" is male = "He".' },
          { id: 17, text: 'The sun is shining. ___ is very bright today.', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Non-living things use "It".' },
          { id: 18, text: 'Which is a pronoun?', options: ['beautiful', 'quickly', 'they', 'run'], correct: 2, explanation: '"They" is a personal pronoun.' },
          { id: 19, text: 'My friends and I love music. ___ often go to concerts.', options: ['He', 'She', 'They', 'We'], correct: 3, explanation: '"My friends and I" = "We".' },
          { id: 20, text: 'The flower smells nice. ___ is pink and white.', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Objects and things = "It".' },
          { id: 21, text: 'Sarah is my best friend. ___ lives next door.', options: ['He', 'She', 'It', 'They'], correct: 1, explanation: '"Sarah" is female = "She".' },
          { id: 22, text: 'What is wrong: "Him is my best friend"?', options: ['Wrong verb', 'Wrong pronoun — should be "He"', 'Wrong word order', 'Nothing is wrong'], correct: 1, explanation: '"Him" is an object pronoun; use subject pronoun "He" as the subject.' },
          { id: 23, text: 'The dogs are barking. ___ are very loud.', options: ['It', 'He', 'She', 'They'], correct: 3, explanation: '"Dogs" (plural) = "They".' },
          { id: 24, text: '___ is a beautiful day today.', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Weather/time expressions: "It".' },
          { id: 25, text: 'My parents work hard. ___ are both engineers.', options: ['He', 'She', 'It', 'They'], correct: 3, explanation: '"Parents" = plural = "They".' },
          { id: 26, text: 'Which sentence is correct?', options: ['Me and John went to the park.', 'John and me went to the park.', 'John and I went to the park.', 'John and myself went to the park.'], correct: 2, explanation: 'As a subject, use "I" not "me".' },
          { id: 27, text: 'The hospital is very big. ___ has 500 beds.', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Buildings and institutions = "It".' },
          { id: 28, text: 'My cousins visited us yesterday. ___ stayed for dinner.', options: ['He', 'She', 'It', 'They'], correct: 3, explanation: '"Cousins" (plural) = "They".' },
          { id: 29, text: 'The baby is crying. ___ is hungry.', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'When gender is unknown, use "It" for babies (or "He/She" if known).' },
          { id: 30, text: 'Which type of pronoun is "myself"?', options: ['Personal', 'Possessive', 'Reflexive', 'Object'], correct: 2, explanation: '"Myself" is a reflexive pronoun.' },
        ],
        fillBlanks: [
          { id: 1, text: 'My brother is a doctor. ___ works at a hospital.', options: ['She', 'They', 'He', 'It'], correct: 2, explanation: '"Brother" = male → He.' },
          { id: 2, text: 'The book is on the table. ___ is very interesting.', options: ['He', 'She', 'They', 'It'], correct: 3, explanation: 'Non-living objects use "It".' },
          { id: 3, text: 'My friends and I went to the park. ___ had a great time.', options: ['He', 'She', 'They', 'We'], correct: 3, explanation: '"My friends and I" = We.' },
          { id: 4, text: '___ is raining outside.', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Weather expressions use "It".' },
          { id: 5, text: 'The cat is sleeping. ___ is very lazy today.', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Animal (gender unspecified) → It.' },
          { id: 6, text: 'Tom and Jerry are friends. ___ play together every day.', options: ['He', 'She', 'It', 'They'], correct: 3, explanation: 'Two people = They.' },
          { id: 7, text: 'My grandmother is 75. ___ is very healthy.', options: ['He', 'She', 'It', 'They'], correct: 1, explanation: '"Grandmother" = female → She.' },
          { id: 8, text: '___ need to study for the exam.', options: ['Us', 'Our', 'We', 'Ours'], correct: 2, explanation: '"We" is the subject pronoun.' },
          { id: 9, text: 'The dog is barking. ___ is hungry.', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Animal (gender unknown) → It.' },
          { id: 10, text: 'Sarah passed the exam. ___ is very happy.', options: ['He', 'She', 'It', 'They'], correct: 1, explanation: '"Sarah" = female → She.' },
          { id: 11, text: 'The students are in class. ___ are listening to the teacher.', options: ['It', 'He', 'She', 'They'], correct: 3, explanation: 'Plural noun "students" → They.' },
          { id: 12, text: 'The sun is shining. ___ is very bright.', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Non-living things → It.' },
          { id: 13, text: 'My father is a police officer. ___ is brave.', options: ['She', 'He', 'It', 'They'], correct: 1, explanation: '"Father" = male → He.' },
          { id: 14, text: 'The children are playing in the garden. ___ are very loud.', options: ['It', 'He', 'She', 'They'], correct: 3, explanation: '"Children" = plural → They.' },
          { id: 15, text: '___ is a beautiful day today.', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Time/weather → It.' },
          { id: 16, text: 'My cousins visited us last week. ___ stayed for three days.', options: ['He', 'She', 'It', 'They'], correct: 3, explanation: '"Cousins" = plural → They.' },
          { id: 17, text: 'The hospital is very modern. ___ has 600 beds.', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Buildings → It.' },
          { id: 18, text: 'My sister and her husband moved to London. ___ are happy there.', options: ['He', 'She', 'It', 'They'], correct: 3, explanation: 'Two people = They.' },
          { id: 19, text: 'The flower smells nice. ___ is pink.', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Objects → It.' },
          { id: 20, text: 'Ali is my best friend. ___ lives next door.', options: ['She', 'He', 'It', 'They'], correct: 1, explanation: '"Ali" = male name → He.' },
        ],
        scrambled: [
          { id: 1, words: ['she', 'a', 'teacher', 'is'], answer: 'She is a teacher.', explanation: 'Subject pronoun "she" + is + noun.' },
          { id: 2, words: ['we', 'happy', 'are', 'today'], answer: 'We are happy today.', explanation: '"We" = first person plural + are.' },
          { id: 3, words: ['they', 'students', 'good', 'are'], answer: 'They are good students.', explanation: '"They" = third person plural + are + adjective + noun.' },
          { id: 4, words: ['it', 'very', 'is', 'cold'], answer: 'It is very cold.', explanation: 'Weather/temperature uses "It".' },
          { id: 5, words: ['he', 'my', 'brother', 'is', 'older'], answer: 'He is my older brother.', explanation: '"He" = male subject pronoun.' },
          { id: 6, words: ['they', 'park', 'in', 'playing', 'the', 'are'], answer: 'They are playing in the park.', explanation: '"They" + are + verb-ing (Present Continuous).' },
          { id: 7, words: ['she', 'English', 'speaks', 'well', 'very'], answer: 'She speaks English very well.', explanation: '"She" + speaks (3rd person singular).' },
          { id: 8, words: ['it', 'outside', 'is', 'raining'], answer: 'It is raining outside.', explanation: 'Weather: It + is + verb-ing.' },
          { id: 9, words: ['he', 'to', 'goes', 'gym', 'every', 'day', 'the'], answer: 'He goes to the gym every day.', explanation: '"He" + goes (3rd person singular + -es).' },
          { id: 10, words: ['we', 'same', 'from', 'the', 'are', 'city'], answer: 'We are from the same city.', explanation: '"We" + are + from + place.' },
          { id: 11, words: ['they', 'early', 'arrived'], answer: 'They arrived early.', explanation: '"They" + verb (past) + adverb.' },
          { id: 12, words: ['she', 'not', 'does', 'eat', 'meat'], answer: 'She does not eat meat.', explanation: '"She" + does not + base verb.' },
          { id: 13, words: ['it', 'a', 'beautiful', 'is', 'city'], answer: 'It is a beautiful city.', explanation: 'Places use "It".' },
          { id: 14, words: ['he', 'at', 'the', 'works', 'school'], answer: 'He works at the school.', explanation: '"He" + works (3rd person singular).' },
          { id: 15, words: ['they', 'watch', 'TV', 'do', 'not'], answer: 'They do not watch TV.', explanation: '"They" + do not + base verb.' },
          { id: 16, words: ['we', 'the', 'project', 'finished'], answer: 'We finished the project.', explanation: '"We" + past verb + object.' },
          { id: 17, words: ['she', 'studying', 'is', 'now'], answer: 'She is studying now.', explanation: '"She" + is + verb-ing (Present Continuous).' },
          { id: 18, words: ['it', 'table', 'on', 'is', 'the'], answer: 'It is on the table.', explanation: 'Object → It + is + place.' },
          { id: 19, words: ['they', 'engineers', 'both', 'are'], answer: 'They are both engineers.', explanation: '"They" + are + both + noun.' },
          { id: 20, words: ['he', 'loves', 'cats', 'and', 'dogs'], answer: 'He loves cats and dogs.', explanation: '"He" + loves (3rd person singular) + objects.' },
        ],
        errorCorrection: [
          { id: 1, text: 'My sister is a nurse. He works at a clinic.', options: ['My sister', 'is a nurse', 'He works', 'at a clinic'], correct: 2, wrongPart: 'He works', correction: 'She works', explanation: '"Sister" = female → She.' },
          { id: 2, text: 'The book is interesting. They is about science.', options: ['The book', 'is interesting', 'They is', 'about science'], correct: 2, wrongPart: 'They is', correction: 'It is', explanation: 'Object/book → It is.' },
          { id: 3, text: 'Tom and Lisa are married. He live in London.', options: ['Tom and Lisa', 'are married', 'He live', 'in London'], correct: 2, wrongPart: 'He live', correction: 'They live', explanation: 'Two people = They (not He).' },
          { id: 4, text: 'It is raining. She is very heavy today.', options: ['It is raining', 'She is very heavy', 'today', 'No error'], correct: 1, wrongPart: 'She is very heavy', correction: 'It is very heavy', explanation: 'Rain = weather = It (not She).' },
          { id: 5, text: 'The cats are sleeping. It are on the sofa.', options: ['The cats', 'are sleeping', 'It are', 'on the sofa'], correct: 2, wrongPart: 'It are', correction: 'They are', explanation: 'Plural "cats" = They (not It).' },
          { id: 6, text: 'My father is tall. She has brown hair.', options: ['My father', 'is tall', 'She has', 'brown hair'], correct: 2, wrongPart: 'She has', correction: 'He has', explanation: '"Father" = male → He.' },
          { id: 7, text: 'We are students. We studies every day.', options: ['We are', 'students', 'We studies', 'every day'], correct: 2, wrongPart: 'We studies', correction: 'We study', explanation: '"We" = plural → study (no -s).' },
          { id: 8, text: 'The flowers are beautiful. He smell nice.', options: ['The flowers', 'are beautiful', 'He smell', 'nice'], correct: 2, wrongPart: 'He smell', correction: 'They smell', explanation: '"Flowers" = plural → They.' },
          { id: 9, text: 'My mother is a teacher. He teaches at a school.', options: ['My mother', 'is a teacher', 'He teaches', 'at a school'], correct: 2, wrongPart: 'He teaches', correction: 'She teaches', explanation: '"Mother" = female → She.' },
          { id: 10, text: 'The dog is hungry. They is barking.', options: ['The dog', 'is hungry', 'They is', 'barking'], correct: 2, wrongPart: 'They is', correction: 'It is', explanation: 'One dog = singular → It.' },
          { id: 11, text: 'Sarah and I are sisters. We lives in Tashkent.', options: ['Sarah and I', 'are sisters', 'We lives', 'in Tashkent'], correct: 2, wrongPart: 'We lives', correction: 'We live', explanation: '"We" = plural → live (no -s).' },
          { id: 12, text: 'The moon is bright. She is full tonight.', options: ['The moon', 'is bright', 'She is full', 'tonight'], correct: 2, wrongPart: 'She is full', correction: 'It is full', explanation: 'Non-living objects → It.' },
          { id: 13, text: 'My parents work hard. He are teachers.', options: ['My parents', 'work hard', 'He are', 'teachers'], correct: 2, wrongPart: 'He are', correction: 'They are', explanation: '"Parents" = plural → They.' },
          { id: 14, text: 'The baby is crying. It is hungry.', options: ['The baby', 'is crying', 'It is hungry', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — all pronouns and verbs are correct.' },
          { id: 15, text: 'John is my classmate. Her is very friendly.', options: ['John', 'is my classmate', 'Her is', 'very friendly'], correct: 2, wrongPart: 'Her is', correction: 'He is', explanation: 'Subject pronoun for male = He (not Her).' },
          { id: 16, text: 'The children are playing. They is very loud.', options: ['The children', 'are playing', 'They is', 'very loud'], correct: 2, wrongPart: 'They is', correction: 'They are', explanation: '"They" = plural → are.' },
          { id: 17, text: 'My aunt is a doctor. Him works at a hospital.', options: ['My aunt', 'is a doctor', 'Him works', 'at a hospital'], correct: 2, wrongPart: 'Him works', correction: 'She works', explanation: '"Aunt" = female → She (not Him).' },
          { id: 18, text: 'The birds are singing. She are beautiful.', options: ['The birds', 'are singing', 'She are', 'beautiful'], correct: 2, wrongPart: 'She are', correction: 'They are', explanation: '"Birds" = plural → They.' },
          { id: 19, text: 'The sun is hot. They shines brightly.', options: ['The sun', 'is hot', 'They shines', 'brightly'], correct: 2, wrongPart: 'They shines', correction: 'It shines', explanation: 'The sun = singular object → It.' },
          { id: 20, text: 'A pronoun replaces a noun to avoid repetition.', options: ['A pronoun', 'replaces a noun', 'to avoid repetition', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — the sentence is grammatically correct.' },
        ],
        transform: [
          { id: 1, text: 'Replace the underlined noun with a pronoun: "Tom likes football." (Tom = ?)', options: ['She likes football.', 'They likes football.', 'He likes football.', 'It likes football.'], correct: 2, explanation: '"Tom" = male → He.' },
          { id: 2, text: 'Replace with a pronoun: "The book is heavy." (The book = ?)', options: ['He is heavy.', 'She is heavy.', 'They are heavy.', 'It is heavy.'], correct: 3, explanation: 'An object → It.' },
          { id: 3, text: 'Replace with a pronoun: "Sara and I went to the market." (Sara and I = ?)', options: ['They went to the market.', 'We went to the market.', 'She went to the market.', 'He went to the market.'], correct: 1, explanation: '"Sara and I" = We.' },
          { id: 4, text: 'Replace with a pronoun: "My sisters are happy." (My sisters = ?)', options: ['He is happy.', 'She is happy.', 'They are happy.', 'It is happy.'], correct: 2, explanation: 'Multiple females = They.' },
          { id: 5, text: 'Replace with a pronoun: "My dog is cute." (My dog = ?)', options: ['He is cute.', 'She is cute.', 'It is cute.', 'They are cute.'], correct: 2, explanation: 'Animal (gender unspecified) → It.' },
          { id: 6, text: 'Replace with a pronoun: "My grandfather is 80." (My grandfather = ?)', options: ['She is 80.', 'He is 80.', 'It is 80.', 'They are 80.'], correct: 1, explanation: '"Grandfather" = male → He.' },
          { id: 7, text: 'Replace with a pronoun: "The boys and girls are playing."', options: ['He is playing.', 'She is playing.', 'It is playing.', 'They are playing.'], correct: 3, explanation: 'Multiple people = They.' },
          { id: 8, text: 'Replace with a pronoun: "The computer is broken."', options: ['He is broken.', 'She is broken.', 'It is broken.', 'They are broken.'], correct: 2, explanation: 'Object = It.' },
          { id: 9, text: 'Replace with a pronoun: "Mrs. Smith is our new teacher."', options: ['He is our new teacher.', 'She is our new teacher.', 'It is our new teacher.', 'They are our new teacher.'], correct: 1, explanation: '"Mrs. Smith" = female → She.' },
          { id: 10, text: 'Replace with a pronoun: "My friends and I love music."', options: ['He loves music.', 'She loves music.', 'We love music.', 'They love music.'], correct: 2, explanation: '"My friends and I" = We.' },
          { id: 11, text: 'Replace with a pronoun: "The trees are tall."', options: ['He is tall.', 'She is tall.', 'It is tall.', 'They are tall.'], correct: 3, explanation: 'Multiple objects = They.' },
          { id: 12, text: 'Replace with a pronoun: "Ahmed is a good student."', options: ['She is a good student.', 'He is a good student.', 'It is a good student.', 'They are good students.'], correct: 1, explanation: '"Ahmed" = male → He.' },
          { id: 13, text: 'Replace with a pronoun: "Dilnoza and Zulfiya are sisters."', options: ['He is sisters.', 'She is sisters.', 'It is sisters.', 'They are sisters.'], correct: 3, explanation: 'Two females = They.' },
          { id: 14, text: 'Replace with a pronoun: "The weather is nice today."', options: ['He is nice.', 'She is nice.', 'It is nice.', 'They are nice.'], correct: 2, explanation: 'Weather → It.' },
          { id: 15, text: 'Replace with a pronoun: "My father and mother are at home."', options: ['He is at home.', 'She is at home.', 'We are at home.', 'They are at home.'], correct: 3, explanation: 'Two people = They.' },
          { id: 16, text: 'Replace with a pronoun: "I and you" (speaking together)', options: ['We', 'They', 'He', 'She'], correct: 0, explanation: 'I + you together = We.' },
          { id: 17, text: 'Replace with a pronoun: "The cat and the dog are fighting."', options: ['He is fighting.', 'They are fighting.', 'It is fighting.', 'She is fighting.'], correct: 1, explanation: 'Multiple animals = They.' },
          { id: 18, text: 'Replace with a pronoun: "The school is very old."', options: ['He is very old.', 'She is very old.', 'It is very old.', 'They are very old.'], correct: 2, explanation: 'Buildings → It.' },
          { id: 19, text: 'Replace with a pronoun: "The students passed the exam."', options: ['He passed.', 'She passed.', 'It passed.', 'They passed.'], correct: 3, explanation: 'Multiple people = They.' },
          { id: 20, text: 'Replace with a pronoun: "My baby brother is sleeping."', options: ['She is sleeping.', 'He is sleeping.', 'It is sleeping.', 'They are sleeping.'], correct: 1, explanation: '"Brother" = male → He.' },
        ],
        dialogue: [
          { id: 1, situation: 'You are talking about a mutual male friend.', dialogue: 'A: Where is David today?\nB: ___', options: ['She is at the library.', 'They is at the library.', 'He is at the library.', 'It is at the library.'], correct: 2, explanation: '"David" = male → He is.' },
          { id: 2, situation: 'Someone asks about a book you\'re reading.', dialogue: 'A: Is the book interesting?\nB: Yes, ___ is very exciting!', options: ['he', 'she', 'it', 'they'], correct: 2, explanation: 'A book = object → It.' },
          { id: 3, situation: 'You and your friend discuss a female classmate.', dialogue: 'A: Does Malika speak English well?\nB: Yes, ___ speaks it perfectly!', options: ['he', 'she', 'it', 'they'], correct: 1, explanation: '"Malika" = female → She.' },
          { id: 4, situation: 'Someone asks about your family at dinner.', dialogue: 'A: Are your parents at home?\nB: Yes, ___ are in the kitchen.', options: ['he', 'she', 'it', 'they'], correct: 3, explanation: '"Parents" = plural → They.' },
          { id: 5, situation: 'You point to a dog in the park.', dialogue: 'A: Whose dog is that?\nB: I don\'t know. ___ looks friendly though!', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Unknown dog = It.' },
          { id: 6, situation: 'A classmate asks about your sister\'s job.', dialogue: 'A: What does your sister do?\nB: ___ is a nurse.', options: ['He', 'She', 'It', 'They'], correct: 1, explanation: '"Sister" = female → She.' },
          { id: 7, situation: 'You explain where a male teacher is.', dialogue: 'A: Where is Mr. Brown?\nB: ___ is in his office.', options: ['She', 'He', 'It', 'They'], correct: 1, explanation: '"Mr. Brown" = male → He.' },
          { id: 8, situation: 'You describe the weather to a friend on the phone.', dialogue: 'A: How is the weather there?\nB: ___ is sunny and warm today!', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Weather → It.' },
          { id: 9, situation: 'Talking about a group of friends who went on a trip.', dialogue: 'A: Did your friends enjoy the trip?\nB: Yes, ___ loved it!', options: ['He', 'She', 'It', 'They'], correct: 3, explanation: 'Multiple friends = They.' },
          { id: 10, situation: 'Someone asks about an elderly male neighbor.', dialogue: 'A: How old is your neighbor Mr. Ali?\nB: ___ is 70 years old.', options: ['She', 'He', 'It', 'They'], correct: 1, explanation: '"Mr. Ali" = male → He.' },
          { id: 11, situation: 'You are describing your cat.', dialogue: 'A: What color is your cat?\nB: ___ is orange and white.', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Cat (gender unspecified) = It.' },
          { id: 12, situation: 'A friend asks about your new apartment.', dialogue: 'A: Is your new apartment big?\nB: Yes, ___ is very spacious!', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Apartment = object → It.' },
          { id: 13, situation: 'Someone asks about two children playing outside.', dialogue: 'A: Are those kids yours?\nB: Yes, ___ are playing in the garden.', options: ['he', 'she', 'it', 'they'], correct: 3, explanation: 'Multiple children = They.' },
          { id: 14, situation: 'You talk about a female professor.', dialogue: 'A: Is Professor Lee strict?\nB: Yes, but ___ is also very helpful.', options: ['he', 'she', 'it', 'they'], correct: 1, explanation: 'Female professor = She.' },
          { id: 15, situation: 'Someone notices your phone is new.', dialogue: 'A: Is that a new phone?\nB: Yes, ___ works really fast!', options: ['he', 'she', 'it', 'they'], correct: 2, explanation: 'A phone = object → It.' },
          { id: 16, situation: 'Asking about a group of workers.', dialogue: 'A: Are the workers still here?\nB: Yes, ___ are finishing the last room.', options: ['he', 'she', 'it', 'they'], correct: 3, explanation: 'Multiple workers = They.' },
          { id: 17, situation: 'Describing a male cousin to a friend.', dialogue: 'A: Tell me about your cousin Timur.\nB: ___ is funny and very smart.', options: ['She', 'It', 'He', 'They'], correct: 2, explanation: '"Timur" = male → He.' },
          { id: 18, situation: 'Asking about a shop.', dialogue: 'A: Is the shop open today?\nB: Yes, ___ opens at 9 AM.', options: ['he', 'she', 'it', 'they'], correct: 2, explanation: 'A shop = object → It.' },
          { id: 19, situation: 'A colleague asks where the managers are.', dialogue: 'A: Where are the managers?\nB: ___ are in a meeting.', options: ['He', 'She', 'It', 'They'], correct: 3, explanation: 'Multiple managers = They.' },
          { id: 20, situation: 'You mention that your grandmother is sick.', dialogue: 'A: How is your grandmother?\nB: ___ is not feeling well today.', options: ['He', 'She', 'It', 'They'], correct: 1, explanation: '"Grandmother" = female → She.' },
        ],
      },
      {
        id: 'personal-pronouns',
        title: 'Personal Pronouns',
        icon: '👤',
        guide: `## Shaxs Olmoshlari (Personal Pronouns)

Shaxs olmoshlari ega vazifasida ishlatiladigan olmoshlardir.

## Birlik (Singular)
• I — men (1-shaxs)
• You — sen/siz (2-shaxs)
• He — u (erkak, 3-shaxs)
• She — u (ayol, 3-shaxs)
• It — u (narsa/hayvon, 3-shaxs)

## Ko'plik (Plural)
• We — biz (1-shaxs)
• You — sizlar/senlar (2-shaxs)
• They — ular (3-shaxs)

## Fe'l mosligi
• I am, You are, He/She/It is
• We are, You are, They are
• I go, You go, He/She/It goes, We go, They go

## Muhim qoidalar
1. "I" har doim bosh harf bilan yoziladi
2. "You" birlik va ko'plikda bir xil
3. "He" — erkak, "She" — ayol, "It" — narsa
4. Fe'l uchinchi shaxs birlikda -s/-es qo'shiladi`,
        questions: [
          { id: 1, text: 'Which is a first person singular pronoun?', options: ['We', 'You', 'I', 'They'], correct: 2, explanation: '"I" is the first person singular personal pronoun.' },
          { id: 2, text: '___ am a student.', options: ['He', 'She', 'I', 'They'], correct: 2, explanation: '"Am" is only used with "I".' },
          { id: 3, text: 'How many personal pronouns are there in English?', options: ['5', '6', '7', '8'], correct: 2, explanation: 'There are 7: I, you, he, she, it, we, they.' },
          { id: 4, text: 'Which pronoun replaces a female person?', options: ['He', 'It', 'She', 'They'], correct: 2, explanation: '"She" is used for female persons.' },
          { id: 5, text: '___ is my best friend. (Ali)', options: ['She', 'They', 'It', 'He'], correct: 3, explanation: '"Ali" is a male name, so use "He".' },
          { id: 6, text: '___ are from Uzbekistan. (Kamol and Dilnoza)', options: ['He', 'She', 'It', 'They'], correct: 3, explanation: 'Two people = "They".' },
          { id: 7, text: 'What is the plural form of "I"?', options: ['Me', 'My', 'We', 'Us'], correct: 2, explanation: 'The plural of "I" (subject) is "We".' },
          { id: 8, text: 'Which sentence is correct?', options: ['I is a teacher.', 'I am a teacher.', 'I are a teacher.', 'I be a teacher.'], correct: 1, explanation: '"I" always takes "am".' },
          { id: 9, text: '___ is a beautiful city. (Samarkand)', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Cities and places use "It".' },
          { id: 10, text: 'Which pronoun is used for both singular and plural?', options: ['I', 'He', 'You', 'It'], correct: 2, explanation: '"You" can be singular or plural in English.' },
          { id: 11, text: '___ speaks English very well. (My teacher)', options: ['I', 'We', 'They', 'She'], correct: 3, explanation: 'Assuming female teacher: "She".' },
          { id: 12, text: 'Choose the correct pronoun: "The dog is barking. ___ is hungry."', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'For animals (gender unspecified): "It".' },
          { id: 13, text: 'Which personal pronoun is 3rd person plural?', options: ['You', 'We', 'He', 'They'], correct: 3, explanation: '"They" is 3rd person plural.' },
          { id: 14, text: 'Zulfiya and I ___ friends.', options: ['is', 'am', 'are', 'be'], correct: 2, explanation: '"Zulfiya and I" = We = plural = "are".' },
          { id: 15, text: 'The correct form: "He and she ___ studying."', options: ['is', 'am', 'are', 'be'], correct: 2, explanation: '"He and she" = They (plural) = "are".' },
          { id: 16, text: '"It" is used for:', options: ['Male persons only', 'Female persons only', 'Both males and females', 'Things and animals (when gender is unspecified)'], correct: 3, explanation: '"It" is for non-human things or animals when gender isn\'t specified.' },
          { id: 17, text: '___ are very hungry. (Aziz and his brother)', options: ['He', 'She', 'It', 'They'], correct: 3, explanation: 'Two people = "They".' },
          { id: 18, text: 'My father ___ a doctor. (Use correct pronoun + verb)', options: ['She is', 'They are', 'He is', 'It is'], correct: 2, explanation: '"Father" = male = "He" + "is".' },
          { id: 19, text: 'Which is NOT a personal pronoun?', options: ['I', 'Mine', 'He', 'They'], correct: 1, explanation: '"Mine" is a possessive pronoun, not a personal (subject) pronoun.' },
          { id: 20, text: 'Choose the correct sentence:', options: ['Her is my sister.', 'Hers is my sister.', 'She is my sister.', 'His is my sister.'], correct: 2, explanation: '"She" is the subject pronoun for a female person.' },
          { id: 21, text: 'We ___ from the same city.', options: ['is', 'am', 'are', 'be'], correct: 2, explanation: '"We" always takes "are".' },
          { id: 22, text: 'Which sentence is correct?', options: ['Them are late.', 'Us are late.', 'They are late.', 'Their are late.'], correct: 2, explanation: '"They" is the subject pronoun; "them" is the object form.' },
          { id: 23, text: 'She ___ mathematics at school.', options: ['teach', 'teaches', 'teaching', 'taught'], correct: 1, explanation: '3rd person singular "she" → "teaches" (add -es).' },
          { id: 24, text: 'What is the 2nd person plural pronoun?', options: ['I', 'You', 'We', 'They'], correct: 1, explanation: '"You" serves as both singular and plural 2nd person.' },
          { id: 25, text: 'It ___ very cold in winter here.', options: ['am', 'are', 'is', 'be'], correct: 2, explanation: '"It" takes "is".' },
          { id: 26, text: 'Complete: "___ and ___ are going to the cinema." (I, she)', options: ['Me, her', 'I, her', 'She and I', 'I and she'], correct: 2, explanation: 'Correct: "She and I" (subject pronouns, and "she" comes first as courtesy).' },
          { id: 27, text: 'They ___ at the office right now.', options: ['is', 'am', 'are', 'was'], correct: 2, explanation: '"They" + "are".' },
          { id: 28, text: 'Which pronoun is 1st person plural?', options: ['I', 'You', 'We', 'They'], correct: 2, explanation: '"We" is the 1st person plural pronoun.' },
          { id: 29, text: 'He ___ play basketball. He prefers football.', options: ['don\'t', 'doesn\'t', 'not', 'isn\'t'], correct: 1, explanation: '"Doesn\'t" is used with he/she/it for negation in Simple Present.' },
          { id: 30, text: 'Which pronoun is used for a thing?', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: '"It" is used for things, objects, and places.' },
        ],
        fillBlanks: [
          { id: 1, text: '___ am a student from Uzbekistan.', options: ['He', 'She', 'I', 'They'], correct: 2, explanation: '"Am" is only used with "I".' },
          { id: 2, text: '___ is my best friend. (Ali)', options: ['She', 'They', 'It', 'He'], correct: 3, explanation: '"Ali" = male name → He.' },
          { id: 3, text: '___ are from Samarkand. (Kamol and Dilnoza)', options: ['He', 'She', 'It', 'They'], correct: 3, explanation: 'Two people → They.' },
          { id: 4, text: '___ speaks three languages. (My teacher — female)', options: ['I', 'We', 'They', 'She'], correct: 3, explanation: 'Female teacher → She.' },
          { id: 5, text: '___ is a beautiful city. (Bukhara)', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Cities and places → It.' },
          { id: 6, text: 'Zulfiya and I ___ friends.', options: ['is', 'am', 'are', 'be'], correct: 2, explanation: '"Zulfiya and I" = We = plural → are.' },
          { id: 7, text: '___ is cold outside today.', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Weather expressions → It.' },
          { id: 8, text: '___ teaches maths at our school. (male teacher)', options: ['She', 'He', 'It', 'They'], correct: 1, explanation: 'Male teacher → He.' },
          { id: 9, text: '___ are very hungry. (Aziz and his brother)', options: ['He', 'She', 'It', 'They'], correct: 3, explanation: 'Two people → They.' },
          { id: 10, text: 'My father ___ a doctor.', options: ['She is', 'They are', 'He is', 'It is'], correct: 2, explanation: '"Father" = male → He is.' },
          { id: 11, text: '___ is a good book. (That book)', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'A book = object → It.' },
          { id: 12, text: '___ are at the office right now. (your colleagues)', options: ['He', 'She', 'It', 'They'], correct: 3, explanation: 'Multiple people → They.' },
          { id: 13, text: 'We ___ from the same city.', options: ['is', 'am', 'are', 'be'], correct: 2, explanation: '"We" + are.' },
          { id: 14, text: '___ play chess together every week. (the boys)', options: ['He', 'She', 'It', 'They'], correct: 3, explanation: 'Multiple males = They.' },
          { id: 15, text: 'She ___ mathematics at university.', options: ['teach', 'teaches', 'teaching', 'taught'], correct: 1, explanation: '"She" → teaches (add -es).' },
          { id: 16, text: 'It ___ very cold in winter here.', options: ['am', 'are', 'is', 'be'], correct: 2, explanation: '"It" + is.' },
          { id: 17, text: '___ and ___ are going to the cinema. (I, she)', options: ['Me, her', 'I, her', 'She and I', 'I and she'], correct: 2, explanation: 'Subject pronouns: She and I (not me/her). "She" comes first.' },
          { id: 18, text: 'He ___ play basketball. He prefers football.', options: ['don\'t', 'doesn\'t', 'not', 'isn\'t'], correct: 1, explanation: '"He" → doesn\'t (not don\'t).' },
          { id: 19, text: 'They ___ at the library right now.', options: ['is', 'am', 'are', 'was'], correct: 2, explanation: '"They" → are.' },
          { id: 20, text: 'Which pronoun is used for a thing?', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: '"It" is used for things and objects.' },
        ],
        scrambled: [
          { id: 1, words: ['I', 'a', 'student', 'am'], answer: 'I am a student.', explanation: '"I" + am + noun.' },
          { id: 2, words: ['he', 'is', 'engineer', 'an'], answer: 'He is an engineer.', explanation: 'Male subject → He + is.' },
          { id: 3, words: ['she', 'speaks', 'English', 'fluently'], answer: 'She speaks English fluently.', explanation: '"She" + speaks (3rd person singular).' },
          { id: 4, words: ['they', 'work', 'together', 'office', 'at', 'the'], answer: 'They work together at the office.', explanation: '"They" + base verb + adverb + place.' },
          { id: 5, words: ['it', 'raining', 'is', 'today'], answer: 'It is raining today.', explanation: 'Weather → It + is + verb-ing.' },
          { id: 6, words: ['we', 'studying', 'are', 'English'], answer: 'We are studying English.', explanation: '"We" + are + verb-ing.' },
          { id: 7, words: ['you', 'a', 'good', 'are', 'friend'], answer: 'You are a good friend.', explanation: '"You" + are + adjective + noun.' },
          { id: 8, words: ['she', 'lives', 'near', 'school', 'the'], answer: 'She lives near the school.', explanation: '"She" + lives (3rd person singular) + place.' },
          { id: 9, words: ['he', 'doesn\'t', 'like', 'coffee'], answer: 'He doesn\'t like coffee.', explanation: '"He" + doesn\'t + base verb + object.' },
          { id: 10, words: ['I', 'every', 'read', 'books', 'day'], answer: 'I read books every day.', explanation: '"I" + base verb + object + time.' },
          { id: 11, words: ['they', 'are', 'happy', 'today', 'not'], answer: 'They are not happy today.', explanation: '"They" + are not + adjective.' },
          { id: 12, words: ['she', 'teach', 'does', 'not', 'science'], answer: 'She does not teach science.', explanation: '"She" + does not + base verb.' },
          { id: 13, words: ['it', 'is', 'big', 'city', 'a'], answer: 'It is a big city.', explanation: 'City/place → It + is.' },
          { id: 14, words: ['we', 'are', 'ready', 'exam', 'for', 'the'], answer: 'We are ready for the exam.', explanation: '"We" + are + adjective + for + noun.' },
          { id: 15, words: ['he', 'early', 'comes', 'always', 'to', 'class'], answer: 'He always comes early to class.', explanation: '"He" + adverb of frequency + verb + adverb.' },
          { id: 16, words: ['you', 'do', 'speak', 'French'], answer: 'Do you speak French?', explanation: 'Question: Do + you + base verb?' },
          { id: 17, words: ['she', 'and', 'I', 'gym', 'the', 'to', 'go'], answer: 'She and I go to the gym.', explanation: 'Subject: She and I = We.' },
          { id: 18, words: ['they', 'live', 'Tashkent', 'in'], answer: 'They live in Tashkent.', explanation: '"They" + live + in + city.' },
          { id: 19, words: ['it', 'very', 'cold', 'winter', 'in', 'is'], answer: 'It is very cold in winter.', explanation: 'Weather → It + is + adjective.' },
          { id: 20, words: ['we', 'both', 'engineers', 'are'], answer: 'We are both engineers.', explanation: '"We" + are + both + noun.' },
        ],
        errorCorrection: [
          { id: 1, text: 'I are a student from Tashkent.', options: ['I', 'are', 'a student', 'from Tashkent'], correct: 1, wrongPart: 'are', correction: 'am', explanation: '"I" always uses "am".' },
          { id: 2, text: 'He are my best friend.', options: ['He', 'are', 'my', 'best friend'], correct: 1, wrongPart: 'are', correction: 'is', explanation: '"He" uses "is".' },
          { id: 3, text: 'She speak English and French.', options: ['She', 'speak', 'English', 'and French'], correct: 1, wrongPart: 'speak', correction: 'speaks', explanation: '"She" (3rd person) → speaks (add -s).' },
          { id: 4, text: 'They is at the park.', options: ['They', 'is', 'at the park', 'No error'], correct: 1, wrongPart: 'is', correction: 'are', explanation: '"They" → are.' },
          { id: 5, text: 'It are cold today.', options: ['It', 'are', 'cold', 'today'], correct: 1, wrongPart: 'are', correction: 'is', explanation: '"It" → is.' },
          { id: 6, text: 'We is ready for the test.', options: ['We', 'is', 'ready', 'for the test'], correct: 1, wrongPart: 'is', correction: 'are', explanation: '"We" → are.' },
          { id: 7, text: 'He don\'t eat vegetables.', options: ['He', 'don\'t', 'eat', 'vegetables'], correct: 1, wrongPart: 'don\'t', correction: 'doesn\'t', explanation: '"He" → doesn\'t (not don\'t).' },
          { id: 8, text: 'She and I is classmates.', options: ['She and I', 'is', 'classmates', 'No error'], correct: 1, wrongPart: 'is', correction: 'are', explanation: '"She and I" = We → are.' },
          { id: 9, text: 'You is a very kind person.', options: ['You', 'is', 'a very kind', 'person'], correct: 1, wrongPart: 'is', correction: 'are', explanation: '"You" → are.' },
          { id: 10, text: 'They lives in Fergana.', options: ['They', 'lives', 'in', 'Fergana'], correct: 1, wrongPart: 'lives', correction: 'live', explanation: '"They" = plural → live (no -s).' },
          { id: 11, text: 'She study English every day.', options: ['She', 'study', 'English', 'every day'], correct: 1, wrongPart: 'study', correction: 'studies', explanation: '"She" → studies (consonant + y → ies).' },
          { id: 12, text: 'He and she is brothers.', options: ['He and she', 'is', 'brothers', 'No error'], correct: 1, wrongPart: 'is', correction: 'are', explanation: '"He and she" = plural → are.' },
          { id: 13, text: 'I speaks Uzbek and Russian.', options: ['I', 'speaks', 'Uzbek', 'and Russian'], correct: 1, wrongPart: 'speaks', correction: 'speak', explanation: '"I" → speak (no -s).' },
          { id: 14, text: 'We are ready for the exam.', options: ['We', 'are', 'ready', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — all forms correct.' },
          { id: 15, text: 'He teach at the university.', options: ['He', 'teach', 'at', 'the university'], correct: 1, wrongPart: 'teach', correction: 'teaches', explanation: '"He" → teaches (-es added for -ch).' },
          { id: 16, text: 'They doesn\'t understand the lesson.', options: ['They', 'doesn\'t', 'understand', 'the lesson'], correct: 1, wrongPart: 'doesn\'t', correction: 'don\'t', explanation: '"They" = plural → don\'t.' },
          { id: 17, text: 'She is a good student. She study hard.', options: ['She is', 'a good student', 'She study hard', 'No error'], correct: 2, wrongPart: 'She study hard', correction: 'She studies hard', explanation: '"She" → studies.' },
          { id: 18, text: 'It is a beautiful flower.', options: ['It', 'is', 'a beautiful', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — correctly uses "It is".' },
          { id: 19, text: 'We am from Uzbekistan.', options: ['We', 'am', 'from', 'Uzbekistan'], correct: 1, wrongPart: 'am', correction: 'are', explanation: '"We" → are (not am).' },
          { id: 20, text: 'He goes to school every day.', options: ['He', 'goes', 'to school', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "He goes" is correct (3rd person singular).' },
        ],
        transform: [
          { id: 1, text: 'Change to 3rd person singular: "I speak English."', options: ['She speak English.', 'She speaks English.', 'She is speaking English.', 'She spoken English.'], correct: 1, explanation: '3rd person singular: She + speaks.' },
          { id: 2, text: 'Change to plural: "She is a teacher."', options: ['They is teachers.', 'They are teacher.', 'They are teachers.', 'They am teachers.'], correct: 2, explanation: '"She" → They; "is" → are; noun becomes plural.' },
          { id: 3, text: 'Change to negative: "He is happy."', options: ['He not happy.', 'He isn\'t happy.', 'He doesn\'t happy.', 'He don\'t happy.'], correct: 1, explanation: '"He is" → He isn\'t (is not).' },
          { id: 4, text: 'Change to question: "She is a student."', options: ['Does she student?', 'She is a student?', 'Is she a student?', 'Is her a student?'], correct: 2, explanation: 'Invert "she is" → Is she?' },
          { id: 5, text: 'Change subject: "I go to school." → Use "He"', options: ['He go to school.', 'He goes to school.', 'He is go to school.', 'He going to school.'], correct: 1, explanation: '"He" → goes (3rd person singular).' },
          { id: 6, text: 'Change to plural: "He plays guitar."', options: ['They play guitar.', 'They plays guitar.', 'They is play guitar.', 'Them play guitar.'], correct: 0, explanation: '"He" → They; "plays" → play (no -s for plural).' },
          { id: 7, text: 'Change to negative: "They are students."', options: ['They are not students.', 'They isn\'t students.', 'They don\'t students.', 'They not are students.'], correct: 0, explanation: '"Are" negative: They are not students.' },
          { id: 8, text: 'Change to question: "We are ready."', options: ['Do we ready?', 'We are ready?', 'Are we ready?', 'Is we ready?'], correct: 2, explanation: 'Invert "we are" → Are we?' },
          { id: 9, text: 'Change subject: "She likes tea." → Use "I"', options: ['I likes tea.', 'I like tea.', 'I am like tea.', 'I liking tea.'], correct: 1, explanation: '"I" + like (base verb, no -s).' },
          { id: 10, text: 'Change to plural: "I am a doctor."', options: ['We is doctors.', 'We am doctors.', 'We are doctors.', 'Us are doctors.'], correct: 2, explanation: '"I" → We; "am" → are.' },
          { id: 11, text: 'Change to negative: "You speak French."', options: ['You not speak French.', 'You don\'t speak French.', 'You doesn\'t speak French.', 'You aren\'t speak French.'], correct: 1, explanation: '"You" + don\'t + base verb.' },
          { id: 12, text: 'Change to question: "He works here."', options: ['He works here?', 'Do he work here?', 'Does he work here?', 'Does he works here?'], correct: 2, explanation: 'Does + he + base verb: Does he work here?' },
          { id: 13, text: 'Change subject: "They live in London." → Use "She"', options: ['She live in London.', 'She lives in London.', 'She is live in London.', 'She living in London.'], correct: 1, explanation: '"She" → lives (3rd person singular).' },
          { id: 14, text: 'Change to plural: "It is a nice day."', options: ['They is nice days.', 'They are nice days.', 'It are nice days.', 'Them are nice days.'], correct: 1, explanation: '"It" → They; "is" → are.' },
          { id: 15, text: 'Change to negative: "She teaches here."', options: ['She not teaches here.', 'She don\'t teach here.', 'She doesn\'t teaches here.', 'She doesn\'t teach here.'], correct: 3, explanation: '"She" + doesn\'t + base verb: doesn\'t teach.' },
          { id: 16, text: 'Change to question: "They play football."', options: ['Does they play football?', 'They play football?', 'Do they play football?', 'Are they play football?'], correct: 2, explanation: 'Do + they + base verb.' },
          { id: 17, text: 'Change subject: "We study English." → Use "She"', options: ['She study English.', 'She studies English.', 'She is study English.', 'She studying English.'], correct: 1, explanation: '"She" → studies (consonant + y → ies).' },
          { id: 18, text: 'Change to negative: "I am tired."', options: ['I am not tired.', 'I don\'t tired.', 'I isn\'t tired.', 'I not tired.'], correct: 0, explanation: '"Am" negative: I am not tired.' },
          { id: 19, text: 'Change to question: "She is at home."', options: ['Does she is at home?', 'She is at home?', 'Is she at home?', 'Is her at home?'], correct: 2, explanation: 'Invert to form question: Is she at home?' },
          { id: 20, text: 'Change subject: "He reads books." → Use "They"', options: ['They reads books.', 'They read books.', 'Them read books.', 'They is read books.'], correct: 1, explanation: '"They" + read (no -s for plural).' },
        ],
        dialogue: [
          { id: 1, situation: 'You meet someone new at a party.', dialogue: 'A: Hi! I\'m Sara. Where are you from?\nB: ___', options: ['I am from Uzbekistan.', 'He am from Uzbekistan.', 'I is from Uzbekistan.', 'Me from Uzbekistan.'], correct: 0, explanation: '"I am" = first person singular.' },
          { id: 2, situation: 'A classmate asks about your friend (male).', dialogue: 'A: Is Jasur a good student?\nB: Yes, ___ always does his homework.', options: ['she', 'he', 'it', 'they'], correct: 1, explanation: '"Jasur" = male → He.' },
          { id: 3, situation: 'Your teacher talks about herself.', dialogue: 'A: Tell us about yourself.\nB: ___ have been teaching for 10 years.', options: ['I', 'We', 'They', 'She'], correct: 0, explanation: 'First person: I.' },
          { id: 4, situation: 'A friend asks about your sister (female).', dialogue: 'A: Where does your sister study?\nB: ___ studies at the medical university.', options: ['He', 'She', 'It', 'They'], correct: 1, explanation: '"Sister" = female → She.' },
          { id: 5, situation: 'Two friends discussing the weather.', dialogue: 'A: It\'s so hot today!\nB: I know! ___ is always hot in July.', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'Weather → It.' },
          { id: 6, situation: 'You and a friend are talking about plans.', dialogue: 'A: Are you and Kamol going to the gym?\nB: Yes, ___ go every Monday.', options: ['he', 'she', 'we', 'they'], correct: 2, explanation: '"You and Kamol" = We.' },
          { id: 7, situation: 'Describing your parents\' occupation.', dialogue: 'A: What do your parents do?\nB: ___ are both doctors.', options: ['He', 'She', 'It', 'They'], correct: 3, explanation: 'Both parents = They.' },
          { id: 8, situation: 'A friend asks about a male neighbor.', dialogue: 'A: Is your neighbor kind?\nB: Yes, ___ is very helpful.', options: ['she', 'he', 'it', 'they'], correct: 1, explanation: 'Male neighbor → He.' },
          { id: 9, situation: 'Introducing yourself to a group.', dialogue: 'A: Who are you?\nB: ___ am Aziz, the new student.', options: ['He', 'She', 'I', 'We'], correct: 2, explanation: 'First person: I am.' },
          { id: 10, situation: 'Asking about a city.', dialogue: 'A: Is Samarkand beautiful?\nB: Yes, ___ is a wonderful city!', options: ['he', 'she', 'it', 'they'], correct: 2, explanation: 'A city → It.' },
          { id: 11, situation: 'Talking about a group of students.', dialogue: 'A: Are the students ready?\nB: Yes, ___ are all prepared.', options: ['he', 'she', 'it', 'they'], correct: 3, explanation: 'Multiple students = They.' },
          { id: 12, situation: 'A friend asks about a female teacher.', dialogue: 'A: Is your English teacher nice?\nB: Yes, ___ is very patient.', options: ['he', 'she', 'it', 'they'], correct: 1, explanation: 'Female teacher → She.' },
          { id: 13, situation: 'Your friend asks what nationality you are.', dialogue: 'A: Are you Uzbek?\nB: Yes, ___ am from Namangan.', options: ['he', 'she', 'I', 'they'], correct: 2, explanation: 'First person: I am.' },
          { id: 14, situation: 'Talking about two friends.', dialogue: 'A: Where are Olim and Shohruh?\nB: ___ are at the library.', options: ['He', 'She', 'It', 'They'], correct: 3, explanation: 'Two people = They.' },
          { id: 15, situation: 'Asking about someone\'s father.', dialogue: 'A: What does your father do?\nB: ___ is an engineer.', options: ['She', 'He', 'It', 'They'], correct: 1, explanation: '"Father" = male → He.' },
          { id: 16, situation: 'Talking about your class.', dialogue: 'A: How many students are in your class?\nB: ___ are 25 students.', options: ['He', 'She', 'It', 'There'], correct: 3, explanation: 'Use "There are" to state quantity.' },
          { id: 17, situation: 'Discussing your daily routine with a classmate.', dialogue: 'A: What time do you usually study?\nB: ___ study in the evening.', options: ['He', 'She', 'I', 'They'], correct: 2, explanation: 'First person: I study.' },
          { id: 18, situation: 'A friend calls to ask about a package.', dialogue: 'A: Has the package arrived?\nB: Yes, ___ just came this morning.', options: ['he', 'she', 'it', 'they'], correct: 2, explanation: 'A package = object → It.' },
          { id: 19, situation: 'Asking about your classmates\' homework.', dialogue: 'A: Did the students finish the homework?\nB: Yes, ___ all submitted it.', options: ['he', 'she', 'it', 'they'], correct: 3, explanation: 'Multiple students = They.' },
          { id: 20, situation: 'Talking about your school.', dialogue: 'A: Is your school big?\nB: Yes, ___ has over 1,000 students.', options: ['he', 'she', 'it', 'they'], correct: 2, explanation: 'A school = object/place → It.' },
        ],
      },
      {
        id: 'object-pronouns',
        title: 'Object Pronouns',
        icon: '🎯',
        guide: `## To'ldiruvchi Olmoshlar (Object Pronouns)

To'ldiruvchi olmoshlar fe'ldan keyin, yoki old qo'shimchadan keyin keladi va ish-harakat kimga/nimaga qaratilganini ko'rsatadi.

## Shaxs olmoshi → To'ldiruvchi olmoshi
• I → me (menga, meni)
• You → you (senga, seni)
• He → him (unga, uni - erkak)
• She → her (unga, uni - ayol)
• It → it (unga, uni - narsa)
• We → us (bizga, bizni)
• They → them (ularga, ularni)

## Ishlatilishi
To'ldiruvchi olmoshlar quyidagi joylarda keladi:
1. Fe'ldan keyin: I love HER. She knows THEM.
2. Old qo'shimchadan keyin: Give it to ME. Talk to HIM.

## Misollar
• She loves him. (U uni sevadi.)
• Tell me the truth. (Menga haqiqatni ayting.)
• I called them yesterday. (Men kecha ularni chaqirdim.)
• Give it to us. (Uni bizga bering.)
• He helped her. (U unga yordam berdi.)

## Keng tarqalgan xatolar
✗ She loves I. → ✓ She loves me.
✗ Tell I the truth. → ✓ Tell me the truth.
✗ Give it to they. → ✓ Give it to them.`,
        questions: [
          { id: 1, text: 'She loves ___. (I → ?)', options: ['I', 'me', 'my', 'mine'], correct: 1, explanation: '"I" becomes "me" as an object pronoun.' },
          { id: 2, text: 'I called ___ yesterday. (they → ?)', options: ['they', 'their', 'theirs', 'them'], correct: 3, explanation: '"They" becomes "them" as an object pronoun.' },
          { id: 3, text: 'Give the book to ___. (he → ?)', options: ['he', 'his', 'him', 'himself'], correct: 2, explanation: '"He" becomes "him" after a preposition.' },
          { id: 4, text: 'I can see ___ from here. (she → ?)', options: ['she', 'her', 'hers', 'herself'], correct: 1, explanation: '"She" becomes "her" as an object pronoun.' },
          { id: 5, text: 'Can you help ___? (we → ?)', options: ['we', 'our', 'ours', 'us'], correct: 3, explanation: '"We" becomes "us" as an object pronoun.' },
          { id: 6, text: 'The teacher knows ___. (I → ?)', options: ['I', 'my', 'me', 'mine'], correct: 2, explanation: '"I" becomes "me" as object.' },
          { id: 7, text: 'I met ___ at the party. (he → ?)', options: ['he', 'him', 'his', 'himself'], correct: 1, explanation: '"He" → "him" after a verb.' },
          { id: 8, text: 'Tell ___ the news! (they → ?)', options: ['they', 'their', 'them', 'theirs'], correct: 2, explanation: '"They" → "them" as indirect object.' },
          { id: 9, text: 'Which is correct: "She called I" or "She called me"?', options: ['She called I', 'She called me', 'Both are correct', 'Neither is correct'], correct: 1, explanation: '"I" → "me" as object after a verb.' },
          { id: 10, text: 'He saw ___ at the store. (we → ?)', options: ['we', 'our', 'ours', 'us'], correct: 3, explanation: '"We" → "us" as object.' },
          { id: 11, text: 'Please listen to ___. (I → ?)', options: ['I', 'my', 'me', 'mine'], correct: 2, explanation: '"Me" is used after prepositions like "to".' },
          { id: 12, text: 'What is the object pronoun for "she"?', options: ['her', 'hers', 'herself', 'she'], correct: 0, explanation: '"Her" is the object pronoun for "she".' },
          { id: 13, text: 'I like ___. (he → ?)', options: ['he', 'him', 'his', 'himself'], correct: 1, explanation: '"Him" is the object pronoun for "he".' },
          { id: 14, text: 'Can you take ___ to the airport? (she → ?)', options: ['she', 'her', 'hers', 'herself'], correct: 1, explanation: '"Her" is the object form of "she".' },
          { id: 15, text: 'What is the object pronoun for "they"?', options: ['their', 'theirs', 'themselves', 'them'], correct: 3, explanation: '"Them" is the object pronoun for "they".' },
          { id: 16, text: 'My parents sent ___ a letter. (I → ?)', options: ['I', 'me', 'my', 'mine'], correct: 1, explanation: '"Me" = indirect object.' },
          { id: 17, text: 'I don\'t know ___. (they → ?)', options: ['they', 'their', 'them', 'theirs'], correct: 2, explanation: '"Them" is the object form of "they".' },
          { id: 18, text: 'She told ___ everything. (he → ?)', options: ['he', 'him', 'his', 'himself'], correct: 1, explanation: '"Him" is the indirect object.' },
          { id: 19, text: 'Which sentence is correct?', options: ['Give the book to she.', 'Give the book to her.', 'Give the book to hers.', 'Give the book to herself.'], correct: 1, explanation: 'After prepositions, use object pronouns: "her".' },
          { id: 20, text: 'Can you see ___? (we → ?)', options: ['we', 'us', 'our', 'ours'], correct: 1, explanation: '"Us" is the object form of "we".' },
          { id: 21, text: 'The teacher asked ___. (they → ?)', options: ['they', 'their', 'theirs', 'them'], correct: 3, explanation: '"Them" is the object form.' },
          { id: 22, text: 'Object pronouns come ___ a verb or preposition.', options: ['before', 'after', 'instead of', 'without'], correct: 1, explanation: 'Object pronouns come AFTER the verb or preposition.' },
          { id: 23, text: 'He loves ___. (she → ?)', options: ['she', 'her', 'hers', 'herself'], correct: 1, explanation: '"Her" is the object form of "she".' },
          { id: 24, text: 'What is wrong: "I can see they from here"?', options: ['Wrong verb', 'Wrong preposition', 'Should be "them" not "they"', 'Nothing is wrong'], correct: 2, explanation: '"They" → "them" as object.' },
          { id: 25, text: 'Please call ___. (he → ?)', options: ['he', 'him', 'his', 'himself'], correct: 1, explanation: '"Him" is the object form after a verb.' },
          { id: 26, text: 'I gave ___ a present. (she → ?)', options: ['she', 'her', 'hers', 'herself'], correct: 1, explanation: '"Her" = indirect object.' },
          { id: 27, text: 'The dog followed ___ home. (we → ?)', options: ['we', 'us', 'our', 'ours'], correct: 1, explanation: '"Us" is the object form of "we".' },
          { id: 28, text: 'What is the object pronoun for "you"?', options: ['yours', 'yourself', 'you', 'your'], correct: 2, explanation: '"You" remains the same for both subject and object.' },
          { id: 29, text: 'Choose: "Between you and ___, I think he is wrong."', options: ['I', 'me', 'my', 'mine'], correct: 1, explanation: 'After "between" (preposition), use "me".' },
          { id: 30, text: 'She surprised ___ with a gift. (we → ?)', options: ['we', 'us', 'our', 'ours'], correct: 1, explanation: '"Us" is the object form of "we".' },
        ],
        fillBlanks: [
          { id: 1, text: 'She loves ___. (I → object)', options: ['I', 'me', 'my', 'mine'], correct: 1, explanation: '"I" becomes "me" as an object pronoun.' },
          { id: 2, text: 'I called ___ yesterday. (they → object)', options: ['they', 'their', 'theirs', 'them'], correct: 3, explanation: '"They" becomes "them" as an object pronoun.' },
          { id: 3, text: 'Give the book to ___. (he → object)', options: ['he', 'his', 'him', 'himself'], correct: 2, explanation: '"He" becomes "him" after a preposition.' },
          { id: 4, text: 'I can see ___ from here. (she → object)', options: ['she', 'her', 'hers', 'herself'], correct: 1, explanation: '"She" becomes "her" as an object pronoun.' },
          { id: 5, text: 'Can you help ___? (we → object)', options: ['we', 'our', 'ours', 'us'], correct: 3, explanation: '"We" becomes "us" as an object pronoun.' },
          { id: 6, text: 'The teacher knows ___. (I → object)', options: ['I', 'my', 'me', 'mine'], correct: 2, explanation: '"I" → "me" after a verb.' },
          { id: 7, text: 'He called ___ on the phone. (she → object)', options: ['she', 'her', 'hers', 'herself'], correct: 1, explanation: '"She" → "her" after a verb.' },
          { id: 8, text: 'Please listen to ___. (I → after preposition)', options: ['I', 'my', 'me', 'mine'], correct: 2, explanation: 'After prepositions, use object pronoun: "me".' },
          { id: 9, text: 'He saw ___ at the store. (we → object)', options: ['we', 'our', 'ours', 'us'], correct: 3, explanation: '"We" → "us" as object.' },
          { id: 10, text: 'I met ___ at the party. (he → object)', options: ['he', 'him', 'his', 'himself'], correct: 1, explanation: '"He" → "him" after a verb.' },
          { id: 11, text: 'Tell ___ the news! (they → object)', options: ['they', 'their', 'them', 'theirs'], correct: 2, explanation: '"They" → "them" as indirect object.' },
          { id: 12, text: 'My parents sent ___ a letter. (I → indirect object)', options: ['I', 'me', 'my', 'mine'], correct: 1, explanation: '"Me" = indirect object.' },
          { id: 13, text: 'She told ___ everything. (he → object)', options: ['he', 'him', 'his', 'himself'], correct: 1, explanation: '"Him" is the indirect object.' },
          { id: 14, text: 'The dog followed ___ home. (we → object)', options: ['we', 'us', 'our', 'ours'], correct: 1, explanation: '"Us" is the object form of "we".' },
          { id: 15, text: 'He loves ___. (she → object)', options: ['she', 'her', 'hers', 'herself'], correct: 1, explanation: '"Her" is the object form of "she".' },
          { id: 16, text: 'I gave ___ a present. (she → indirect object)', options: ['she', 'her', 'hers', 'herself'], correct: 1, explanation: '"Her" = indirect object.' },
          { id: 17, text: 'Can you take ___ to the airport? (she → object)', options: ['she', 'her', 'hers', 'herself'], correct: 1, explanation: '"Her" after a verb = object pronoun.' },
          { id: 18, text: 'I don\'t know ___. (they → object)', options: ['they', 'their', 'them', 'theirs'], correct: 2, explanation: '"Them" is the object form of "they".' },
          { id: 19, text: 'She surprised ___ with a gift. (we → object)', options: ['we', 'us', 'our', 'ours'], correct: 1, explanation: '"Us" is the object form of "we".' },
          { id: 20, text: 'Please call ___. (he → object)', options: ['he', 'him', 'his', 'himself'], correct: 1, explanation: '"Him" after a verb = object pronoun.' },
        ],
        scrambled: [
          { id: 1, words: ['loves', 'she', 'him'], answer: 'She loves him.', explanation: 'Subject + verb + object pronoun.' },
          { id: 2, words: ['tell', 'the', 'me', 'truth'], answer: 'Tell me the truth.', explanation: 'Imperative + indirect object + direct object.' },
          { id: 3, words: ['I', 'called', 'yesterday', 'them'], answer: 'I called them yesterday.', explanation: 'Subject + verb + object pronoun + time.' },
          { id: 4, words: ['give', 'it', 'to', 'us'], answer: 'Give it to us.', explanation: 'Imperative + direct object + preposition + object pronoun.' },
          { id: 5, words: ['he', 'helped', 'her'], answer: 'He helped her.', explanation: 'Subject + past verb + object pronoun.' },
          { id: 6, words: ['can', 'you', 'me', 'help'], answer: 'Can you help me?', explanation: 'Modal question + subject + base verb + object pronoun.' },
          { id: 7, words: ['she', 'knows', 'us'], answer: 'She knows us.', explanation: '3rd person singular + verb + object pronoun.' },
          { id: 8, words: ['I', 'saw', 'him', 'library', 'at', 'the'], answer: 'I saw him at the library.', explanation: 'Subject + past verb + object pronoun + place.' },
          { id: 9, words: ['please', 'talk', 'her', 'to'], answer: 'Please talk to her.', explanation: 'Polite imperative + verb + preposition + object pronoun.' },
          { id: 10, words: ['we', 'them', 'met', 'the', 'at', 'party'], answer: 'We met them at the party.', explanation: 'Subject + past verb + object pronoun + place.' },
          { id: 11, words: ['he', 'gave', 'me', 'a', 'gift'], answer: 'He gave me a gift.', explanation: 'Subject + verb + indirect object + direct object.' },
          { id: 12, words: ['can', 'see', 'I', 'her', 'window', 'through', 'the'], answer: 'I can see her through the window.', explanation: 'Subject + modal + base verb + object pronoun + prep phrase.' },
          { id: 13, words: ['don\'t', 'I', 'know', 'him'], answer: 'I don\'t know him.', explanation: 'Subject + don\'t + base verb + object pronoun.' },
          { id: 14, words: ['she', 'sent', 'us', 'message', 'a'], answer: 'She sent us a message.', explanation: 'Subject + verb + indirect object + direct object.' },
          { id: 15, words: ['book', 'to', 'give', 'the', 'him'], answer: 'Give the book to him.', explanation: 'Imperative + object + preposition + object pronoun.' },
          { id: 16, words: ['the', 'asked', 'teacher', 'them', 'question', 'a'], answer: 'The teacher asked them a question.', explanation: 'Subject + verb + indirect object + direct object.' },
          { id: 17, words: ['I', 'like', 'her', 'style'], answer: 'I like her style.', explanation: 'Here "her" is a possessive adjective, not object pronoun — used before a noun.' },
          { id: 18, words: ['my', 'brother', 'helped', 'me'], answer: 'My brother helped me.', explanation: 'Subject + past verb + object pronoun.' },
          { id: 19, words: ['between', 'you', 'me', 'and'], answer: 'Between you and me.', explanation: 'Prepositions take object pronouns: "me" not "I".' },
          { id: 20, words: ['did', 'see', 'you', 'them', 'yesterday'], answer: 'Did you see them yesterday?', explanation: 'Question: Did + subject + base verb + object pronoun?' },
        ],
        errorCorrection: [
          { id: 1, text: 'She loves I.', options: ['She', 'loves', 'I', 'No error'], correct: 2, wrongPart: 'I', correction: 'me', explanation: '"I" → "me" as the object of the verb.' },
          { id: 2, text: 'I called they yesterday.', options: ['I', 'called', 'they', 'yesterday'], correct: 2, wrongPart: 'they', correction: 'them', explanation: '"They" → "them" after a verb.' },
          { id: 3, text: 'Give the book to he.', options: ['Give the book', 'to', 'he', 'No error'], correct: 2, wrongPart: 'he', correction: 'him', explanation: '"He" → "him" after prepositions.' },
          { id: 4, text: 'Can you help we?', options: ['Can you', 'help', 'we', 'No error'], correct: 2, wrongPart: 'we', correction: 'us', explanation: '"We" → "us" after a verb.' },
          { id: 5, text: 'She told he the truth.', options: ['She', 'told', 'he the truth', 'No error'], correct: 2, wrongPart: 'he the truth', correction: 'him the truth', explanation: '"He" → "him" as indirect object.' },
          { id: 6, text: 'Please listen to I.', options: ['Please', 'listen', 'to I', 'No error'], correct: 2, wrongPart: 'to I', correction: 'to me', explanation: 'After prepositions, use object pronoun: "me".' },
          { id: 7, text: 'I like she very much.', options: ['I', 'like', 'she', 'very much'], correct: 2, wrongPart: 'she', correction: 'her', explanation: '"She" → "her" after a verb.' },
          { id: 8, text: 'He saw we at the park.', options: ['He', 'saw', 'we', 'at the park'], correct: 2, wrongPart: 'we', correction: 'us', explanation: '"We" → "us" after a verb.' },
          { id: 9, text: 'My teacher called I to the board.', options: ['My teacher', 'called', 'I', 'to the board'], correct: 2, wrongPart: 'I', correction: 'me', explanation: '"I" → "me" as object after a verb.' },
          { id: 10, text: 'I don\'t know they.', options: ['I', 'don\'t know', 'they', 'No error'], correct: 2, wrongPart: 'they', correction: 'them', explanation: '"They" → "them" as object.' },
          { id: 11, text: 'She surprised we with a gift.', options: ['She', 'surprised', 'we', 'with a gift'], correct: 2, wrongPart: 'we', correction: 'us', explanation: '"We" → "us" after a verb.' },
          { id: 12, text: 'He loves she.', options: ['He', 'loves', 'she', 'No error'], correct: 2, wrongPart: 'she', correction: 'her', explanation: '"She" → "her" as object.' },
          { id: 13, text: 'Give it to they.', options: ['Give it', 'to', 'they', 'No error'], correct: 2, wrongPart: 'they', correction: 'them', explanation: '"They" → "them" after prepositions.' },
          { id: 14, text: 'I met him at the market.', options: ['I', 'met', 'him', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "him" is correctly used as an object pronoun.' },
          { id: 15, text: 'My parents sent I a package.', options: ['My parents', 'sent', 'I', 'a package'], correct: 2, wrongPart: 'I', correction: 'me', explanation: '"I" → "me" as indirect object.' },
          { id: 16, text: 'She called he on the phone.', options: ['She', 'called', 'he', 'on the phone'], correct: 2, wrongPart: 'he', correction: 'him', explanation: '"He" → "him" after a verb.' },
          { id: 17, text: 'The dog followed we home.', options: ['The dog', 'followed', 'we', 'home'], correct: 2, wrongPart: 'we', correction: 'us', explanation: '"We" → "us" after a verb.' },
          { id: 18, text: 'Between you and I, that\'s a bad idea.', options: ['Between', 'you and I', 'that\'s a bad idea', 'No error'], correct: 1, wrongPart: 'you and I', correction: 'you and me', explanation: 'After "between" (preposition), use object pronoun: "me".' },
          { id: 19, text: 'Tell they the news!', options: ['Tell', 'they', 'the news', 'No error'], correct: 1, wrongPart: 'they', correction: 'them', explanation: '"They" → "them" as indirect object.' },
          { id: 20, text: 'She helped him with the project.', options: ['She', 'helped', 'him', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "him" is correctly used as object pronoun.' },
        ],
        transform: [
          { id: 1, text: 'Replace the object with a pronoun: "I love John." (John = male)', options: ['I love he.', 'I love him.', 'I love his.', 'I love himself.'], correct: 1, explanation: '"John" = male object → him.' },
          { id: 2, text: 'Replace the object: "She called my mother." (mother = female)', options: ['She called she.', 'She called her.', 'She called hers.', 'She called herself.'], correct: 1, explanation: 'Female object → her.' },
          { id: 3, text: 'Replace the object: "We met the students." (students = plural)', options: ['We met they.', 'We met their.', 'We met them.', 'We met theirs.'], correct: 2, explanation: 'Plural object → them.' },
          { id: 4, text: 'Replace the object: "She can see my brother and me."', options: ['She can see we.', 'She can see us.', 'She can see our.', 'She can see ours.'], correct: 1, explanation: '"My brother and me" = us (object).' },
          { id: 5, text: 'Replace: "Give the cake to Sara." (Sara = female)', options: ['Give it to she.', 'Give it to her.', 'Give it to hers.', 'Give it to herself.'], correct: 1, explanation: 'After preposition "to", female → her.' },
          { id: 6, text: 'Replace: "I don\'t like that movie."', options: ['I don\'t like it.', 'I don\'t like him.', 'I don\'t like her.', 'I don\'t like them.'], correct: 0, explanation: 'A movie = object → it.' },
          { id: 7, text: 'Replace: "He helped my sister and me."', options: ['He helped we.', 'He helped us.', 'He helped our.', 'He helped ours.'], correct: 1, explanation: '"My sister and me" = us.' },
          { id: 8, text: 'Replace: "Can you call Ali?" (Ali = male)', options: ['Can you call he?', 'Can you call him?', 'Can you call his?', 'Can you call himself?'], correct: 1, explanation: 'Male object after verb → him.' },
          { id: 9, text: 'Replace: "She knows the answer."', options: ['She knows him.', 'She knows her.', 'She knows it.', 'She knows them.'], correct: 2, explanation: 'A thing (answer) → it.' },
          { id: 10, text: 'Replace: "Talk to my teachers." (teachers = plural)', options: ['Talk to they.', 'Talk to their.', 'Talk to them.', 'Talk to theirs.'], correct: 2, explanation: 'Plural object after preposition → them.' },
          { id: 11, text: 'Replace: "I sent my parents a letter."', options: ['I sent they a letter.', 'I sent their a letter.', 'I sent them a letter.', 'I sent theirs a letter.'], correct: 2, explanation: 'Plural indirect object → them.' },
          { id: 12, text: 'Replace: "She likes her teacher." (teacher = male)', options: ['She likes he.', 'She likes him.', 'She likes his.', 'She likes himself.'], correct: 1, explanation: 'Male object after verb → him.' },
          { id: 13, text: 'Replace: "The teacher asked me and my brother."', options: ['The teacher asked we.', 'The teacher asked us.', 'The teacher asked our.', 'The teacher asked ours.'], correct: 1, explanation: '"Me and my brother" = us (plural object).' },
          { id: 14, text: 'Replace: "Did you see Dilnoza?" (Dilnoza = female)', options: ['Did you see she?', 'Did you see her?', 'Did you see hers?', 'Did you see herself?'], correct: 1, explanation: 'Female object → her.' },
          { id: 15, text: 'Replace: "Please tell my friend the news." (friend = male)', options: ['Please tell he the news.', 'Please tell him the news.', 'Please tell his the news.', 'Please tell himself the news.'], correct: 1, explanation: 'Male indirect object → him.' },
          { id: 16, text: 'Replace: "I love Tashkent." (city)', options: ['I love he.', 'I love she.', 'I love it.', 'I love them.'], correct: 2, explanation: 'A city = object → it.' },
          { id: 17, text: 'Replace: "She invited my sister and me."', options: ['She invited we.', 'She invited us.', 'She invited our.', 'She invited ours.'], correct: 1, explanation: '"My sister and me" = us.' },
          { id: 18, text: 'Replace: "He found the keys."', options: ['He found him.', 'He found her.', 'He found it.', 'He found them.'], correct: 2, explanation: 'Keys = objects (could be them if plural, but the sentence uses singular "the keys" → them).' },
          { id: 19, text: 'Replace: "Can you give the book to my mother?" (mother = female)', options: ['Can you give it to she?', 'Can you give it to her?', 'Can you give it to hers?', 'Can you give it to herself?'], correct: 1, explanation: 'After preposition "to", female → her.' },
          { id: 20, text: 'Replace: "She helped the team." (team = plural)', options: ['She helped they.', 'She helped their.', 'She helped them.', 'She helped theirs.'], correct: 2, explanation: 'Plural object → them.' },
        ],
        dialogue: [
          { id: 1, situation: 'A friend asks if you know someone.', dialogue: 'A: Do you know Maria?\nB: Yes, I like ___ a lot.', options: ['she', 'her', 'hers', 'herself'], correct: 1, explanation: 'After a verb (like), use object pronoun: her.' },
          { id: 2, situation: 'You need help from your teacher.', dialogue: 'A: Can you help ___?\nB: Of course!', options: ['I', 'my', 'me', 'mine'], correct: 2, explanation: 'After verb "help", use object pronoun: me.' },
          { id: 3, situation: 'Telling a classmate about a phone call.', dialogue: 'A: Did you call your brother?\nB: Yes, I called ___ this morning.', options: ['he', 'him', 'his', 'himself'], correct: 1, explanation: 'After verb "called", male object: him.' },
          { id: 4, situation: 'A friend asks about your neighbors.', dialogue: 'A: Do you know the new neighbors?\nB: Yes, I see ___ every day.', options: ['they', 'their', 'them', 'theirs'], correct: 2, explanation: 'After verb "see", plural object: them.' },
          { id: 5, situation: 'Talking about a gift you received.', dialogue: 'A: Who gave you that gift?\nB: My grandmother gave ___ it for my birthday.', options: ['I', 'my', 'me', 'mine'], correct: 2, explanation: 'Indirect object: me (I → me).' },
          { id: 6, situation: 'Asking for directions.', dialogue: 'A: Excuse me! Can you help ___?\nB: Sure! Where do you want to go?', options: ['I', 'my', 'me', 'mine'], correct: 2, explanation: 'After verb "help", use object pronoun: me.' },
          { id: 7, situation: 'You see your friend\'s sister for the first time.', dialogue: 'A: Is that your sister?\nB: Yes! I haven\'t seen ___ in months!', options: ['she', 'her', 'hers', 'herself'], correct: 1, explanation: 'After "seen" (verb), female object: her.' },
          { id: 8, situation: 'A teacher gives instructions.', dialogue: 'A: Please give the homework to ___.\nB: OK, I\'ll hand it in now.', options: ['I', 'my', 'me', 'mine'], correct: 2, explanation: 'After preposition "to", use object pronoun: me.' },
          { id: 9, situation: 'Inviting someone to a party.', dialogue: 'A: Are you inviting your cousins?\nB: Yes, I already called ___.', options: ['they', 'their', 'them', 'theirs'], correct: 2, explanation: 'After verb "called", plural object: them.' },
          { id: 10, situation: 'A friend asks if your parents know your teacher.', dialogue: 'A: Do your parents know your teacher?\nB: Yes, they met ___ at the parent meeting.', options: ['she', 'her', 'hers', 'herself'], correct: 1, explanation: 'After "met" (verb), female object: her.' },
          { id: 11, situation: 'Asking someone to deliver a message.', dialogue: 'A: Can you tell ___ that I\'ll be late?\nB: Sure, I\'ll tell him.', options: ['he', 'him', 'his', 'himself'], correct: 1, explanation: 'After verb "tell", male indirect object: him.' },
          { id: 12, situation: 'A classmate offers to wait for you.', dialogue: 'A: Go ahead, don\'t wait for ___.\nB: Are you sure?', options: ['I', 'my', 'me', 'mine'], correct: 2, explanation: 'After preposition "for", use object pronoun: me.' },
          { id: 13, situation: 'A friend asks if you like the new neighbors.', dialogue: 'A: Do you like the new neighbors?\nB: Yes, I think ___ are very friendly.', options: ['he', 'she', 'them', 'they'], correct: 3, explanation: 'Multiple neighbors as subject: they (not object pronoun here).' },
          { id: 14, situation: 'You tell a friend about helping your brother.', dialogue: 'A: Did you help your brother with the homework?\nB: Yes, I helped ___ for two hours.', options: ['he', 'him', 'his', 'himself'], correct: 1, explanation: 'After verb "helped", male object: him.' },
          { id: 15, situation: 'A friend asks you to pass a note.', dialogue: 'A: Can you pass this note to Sara?\nB: Sure! I\'ll give ___ the note now.', options: ['she', 'her', 'hers', 'herself'], correct: 1, explanation: 'Indirect object, female: her.' },
          { id: 16, situation: 'Talking about seeing someone on the bus.', dialogue: 'A: I saw your sister on the bus.\nB: Really? Did you talk to ___?', options: ['she', 'her', 'hers', 'herself'], correct: 1, explanation: 'After preposition "to", female object: her.' },
          { id: 17, situation: 'A parent asks if you called your friends.', dialogue: 'A: Did you call your friends?\nB: Yes, I texted ___ this afternoon.', options: ['they', 'their', 'them', 'theirs'], correct: 2, explanation: 'After verb "texted", plural object: them.' },
          { id: 18, situation: 'A friend introduces someone.', dialogue: 'A: This is my cousin. Do you know ___?\nB: No, I don\'t think I\'ve met him before.', options: ['he', 'him', 'his', 'himself'], correct: 1, explanation: 'After "know" (verb), male object: him.' },
          { id: 19, situation: 'Asking for a favor.', dialogue: 'A: Could you send ___ the file by email?\nB: Of course!', options: ['I', 'my', 'me', 'mine'], correct: 2, explanation: 'Indirect object (the receiver): me.' },
          { id: 20, situation: 'A teacher asks students to work together.', dialogue: 'A: Work with your partner and help ___ if needed.\nB: OK, we will!', options: ['they', 'their', 'them', 'theirs'], correct: 2, explanation: 'After verb "help", plural object: them.' },
        ],
      },
      {
        id: 'possessive-pronouns',
        title: 'Possessive Pronouns',
        icon: '🏷️',
        guide: `## Egalik Olmoshlari (Possessive Pronouns)

Egalik olmoshlari biror narsaning kimga tegishliligini bildiradi va ot o'rnida keladi.

## Egalik olmoshlari jadvali
• I → mine (meniki)
• You → yours (seniki/sizniki)
• He → his (uniki - erkak)
• She → hers (uniki - ayol)
• It → its (uniki - narsa) [kamdan-kam ishlatiladi]
• We → ours (bizniki)
• They → theirs (ularniki)

## Egalik sifatlari (Possessive Adjectives) bilan farqi
Egalik sifatlari ot oldidan keladi:
• This is MY book. (Bu MENING kitobim.) — sifat
• This book is MINE. (Bu kitob MENIKI.) — olmosh

Egalik olmoshlari otdan keyin, mustaqil holda keladi:
• That car is HIS. (O'sha mashina UNIKI.)
• These shoes are HERS. (Bu oyoq kiyimlar UNIKI.)

## Misollar
• Is this your pen? No, it's not mine. It's hers.
• That house is ours.
• Are these keys yours or theirs?
• The red bag is mine, and the blue one is yours.

## Muhim qoid
Egalik olmoshlari hech qachon apostrof bilan ishlatilmaydi!
✗ it's (bu "it is" ning qisqarmasi)
✓ its (bu egalik sifati)`,
        questions: [
          { id: 1, text: 'This is my book. The book is ___.', options: ['my', 'me', 'mine', 'I'], correct: 2, explanation: '"Mine" is the possessive pronoun (replaces "my + noun").' },
          { id: 2, text: 'That is his car. The car is ___.', options: ['he', 'him', 'his', 'himself'], correct: 2, explanation: '"His" is both possessive adjective and pronoun.' },
          { id: 3, text: 'Are these your glasses? Yes, they are ___.', options: ['my', 'me', 'mine', 'myself'], correct: 2, explanation: '"Mine" replaces "my glasses".' },
          { id: 4, text: 'That red bag is ___. (she → ?)', options: ['she', 'her', 'hers', 'herself'], correct: 2, explanation: '"Hers" is the possessive pronoun for "she".' },
          { id: 5, text: 'This house is ___. (we → ?)', options: ['we', 'us', 'our', 'ours'], correct: 3, explanation: '"Ours" is the possessive pronoun for "we".' },
          { id: 6, text: 'The keys on the table are ___. (they → ?)', options: ['they', 'them', 'their', 'theirs'], correct: 3, explanation: '"Theirs" is the possessive pronoun for "they".' },
          { id: 7, text: 'Is this seat ___? (you → ?)', options: ['you', 'your', 'yours', 'yourself'], correct: 2, explanation: '"Yours" = possessive pronoun for "you".' },
          { id: 8, text: 'Which is a possessive pronoun?', options: ['my', 'me', 'mine', 'myself'], correct: 2, explanation: '"Mine" is a possessive pronoun. "My" is a possessive adjective.' },
          { id: 9, text: 'This is ___ pen. (I → possessive adjective)', options: ['me', 'mine', 'my', 'myself'], correct: 2, explanation: '"My" is the possessive adjective used before a noun.' },
          { id: 10, text: 'Whose book is this? It\'s ___.', options: ['her', 'hers', 'she', 'herself'], correct: 1, explanation: '"Hers" is used without a noun after it.' },
          { id: 11, text: 'That laptop is not ___. I lost mine. (we → ?)', options: ['we', 'us', 'our', 'ours'], correct: 3, explanation: '"Ours" is the possessive pronoun for "we".' },
          { id: 12, text: 'The black car is ___ and the white one is ___. (he, she)', options: ['his, her', 'him, her', 'his, hers', 'his, herself'], correct: 2, explanation: '"His" (pronoun) and "hers" (pronoun) — both standalone.' },
          { id: 13, text: 'Is this ___ jacket? (you → adjective)', options: ['you', 'yours', 'your', 'yourself'], correct: 2, explanation: '"Your" is the possessive adjective before "jacket".' },
          { id: 14, text: 'The idea was ___. (they → pronoun)', options: ['they', 'their', 'theirs', 'them'], correct: 2, explanation: '"Theirs" is the possessive pronoun.' },
          { id: 15, text: 'Which sentence uses a possessive pronoun correctly?', options: ['That is my.', 'That is mine.', 'That is myself.', 'That is me.'], correct: 1, explanation: '"Mine" is the correct possessive pronoun.' },
          { id: 16, text: 'This phone isn\'t ___. (I → pronoun)', options: ['I', 'me', 'my', 'mine'], correct: 3, explanation: '"Mine" replaces "my phone".' },
          { id: 17, text: 'Possessive pronouns are used ___ a noun.', options: ['before', 'after or instead of', 'always before', 'never near'], correct: 1, explanation: 'Possessive pronouns replace "possessive adjective + noun".' },
          { id: 18, text: 'Their house is bigger than ___.', options: ['our', 'us', 'we', 'ours'], correct: 3, explanation: '"Ours" = our house (possessive pronoun).' },
          { id: 19, text: 'Is this coat ___? (she → ?)', options: ['her', 'she', 'hers', 'herself'], correct: 2, explanation: '"Hers" is used alone (without noun).' },
          { id: 20, text: 'What is the possessive pronoun for "we"?', options: ['our', 'us', 'ours', 'ourselves'], correct: 2, explanation: '"Ours" is the possessive pronoun for "we".' },
          { id: 21, text: 'That red car is ___, not yours. (he → ?)', options: ['he', 'him', 'his', 'himself'], correct: 2, explanation: '"His" functions as both adjective and pronoun.' },
          { id: 22, text: 'Is this bag ___? Yes, it\'s ___. (you / I)', options: ['yours / mine', 'your / my', 'yours / my', 'your / mine'], correct: 0, explanation: 'Both used as standalone pronouns: "yours" and "mine".' },
          { id: 23, text: 'Which word is a possessive adjective?', options: ['mine', 'ours', 'theirs', 'your'], correct: 3, explanation: '"Your" is a possessive adjective (goes before a noun).' },
          { id: 24, text: 'Those seats are ___. (they → ?)', options: ['they', 'their', 'theirs', 'them'], correct: 2, explanation: '"Theirs" is the possessive pronoun.' },
          { id: 25, text: 'The victory was ___. (we → ?)', options: ['we', 'us', 'our', 'ours'], correct: 3, explanation: '"Ours" stands alone as a pronoun.' },
          { id: 26, text: 'Possessive pronouns do NOT use:', options: ['capital letters', 'apostrophes', 'vowels', 'plural forms'], correct: 1, explanation: 'Possessive pronouns never use apostrophes.' },
          { id: 27, text: 'Is this ___ umbrella? (she → adjective)', options: ['she', 'her', 'hers', 'herself'], correct: 1, explanation: '"Her" is the possessive adjective before "umbrella".' },
          { id: 28, text: 'My score was higher than ___. (he → ?)', options: ['he', 'him', 'his', 'himself'], correct: 2, explanation: '"His" = his score (possessive pronoun).' },
          { id: 29, text: 'This is not ___ problem, it\'s ___. (they / we)', options: ['their / ours', 'theirs / our', 'their / our', 'theirs / ours'], correct: 0, explanation: '"Their" (adjective) + "ours" (pronoun).' },
          { id: 30, text: 'The blue bicycle is ___. (I → ?)', options: ['I', 'me', 'my', 'mine'], correct: 3, explanation: '"Mine" stands alone after "is".' },
        ],
        fillBlanks: [
          { id: 1, text: 'This is my book. The book is ___.', options: ['my', 'me', 'mine', 'I'], correct: 2, explanation: '"Mine" = possessive pronoun (replaces my + noun).' },
          { id: 2, text: 'That red bag is ___. (she → possessive pronoun)', options: ['she', 'her', 'hers', 'herself'], correct: 2, explanation: '"Hers" is the possessive pronoun for "she".' },
          { id: 3, text: 'Are these your glasses? Yes, they are ___.', options: ['my', 'me', 'mine', 'myself'], correct: 2, explanation: '"Mine" replaces "my glasses".' },
          { id: 4, text: 'This house is ___. (we → possessive pronoun)', options: ['we', 'us', 'our', 'ours'], correct: 3, explanation: '"Ours" is the possessive pronoun for "we".' },
          { id: 5, text: 'That car is ___. (he → possessive pronoun)', options: ['he', 'him', 'his', 'himself'], correct: 2, explanation: '"His" functions as both adjective and pronoun.' },
          { id: 6, text: 'The keys on the table are ___. (they → possessive pronoun)', options: ['they', 'them', 'their', 'theirs'], correct: 3, explanation: '"Theirs" is the possessive pronoun for "they".' },
          { id: 7, text: 'Is this seat ___? (you → possessive pronoun)', options: ['you', 'your', 'yours', 'yourself'], correct: 2, explanation: '"Yours" = possessive pronoun for "you".' },
          { id: 8, text: 'This is ___ pen. (I → possessive adjective before a noun)', options: ['me', 'mine', 'my', 'myself'], correct: 2, explanation: '"My" is the possessive adjective used before a noun.' },
          { id: 9, text: 'Whose bag is this? It\'s ___.', options: ['her', 'hers', 'she', 'herself'], correct: 1, explanation: '"Hers" is used without a noun after it.' },
          { id: 10, text: 'That laptop is not ___. I lost mine. (we → possessive pronoun)', options: ['we', 'us', 'our', 'ours'], correct: 3, explanation: '"Ours" is the possessive pronoun for "we".' },
          { id: 11, text: 'The idea was ___. (they → possessive pronoun)', options: ['they', 'their', 'theirs', 'them'], correct: 2, explanation: '"Theirs" is the possessive pronoun.' },
          { id: 12, text: 'This phone isn\'t ___. (I → possessive pronoun)', options: ['I', 'me', 'my', 'mine'], correct: 3, explanation: '"Mine" replaces "my phone".' },
          { id: 13, text: 'Their house is bigger than ___.', options: ['our', 'us', 'we', 'ours'], correct: 3, explanation: '"Ours" = our house (possessive pronoun).' },
          { id: 14, text: 'Is this coat ___? (she → possessive pronoun)', options: ['her', 'she', 'hers', 'herself'], correct: 2, explanation: '"Hers" is used alone (without noun).' },
          { id: 15, text: 'My score was higher than ___. (he → possessive pronoun)', options: ['he', 'him', 'his', 'himself'], correct: 2, explanation: '"His" = his score (possessive pronoun).' },
          { id: 16, text: 'Those seats are ___. (they → possessive pronoun)', options: ['they', 'their', 'theirs', 'them'], correct: 2, explanation: '"Theirs" is the possessive pronoun.' },
          { id: 17, text: 'Is this ___ umbrella? (she → possessive adjective before noun)', options: ['she', 'her', 'hers', 'herself'], correct: 1, explanation: '"Her" is the possessive adjective before "umbrella".' },
          { id: 18, text: 'The blue bicycle is ___. (I → possessive pronoun)', options: ['I', 'me', 'my', 'mine'], correct: 3, explanation: '"Mine" stands alone after "is".' },
          { id: 19, text: 'The victory was ___. (we → possessive pronoun)', options: ['we', 'us', 'our', 'ours'], correct: 3, explanation: '"Ours" stands alone as a pronoun.' },
          { id: 20, text: 'That red car is ___, not yours. (he → possessive pronoun)', options: ['he', 'him', 'his', 'himself'], correct: 2, explanation: '"His" functions as both adjective and pronoun.' },
        ],
        scrambled: [
          { id: 1, words: ['this', 'mine', 'is'], answer: 'This is mine.', explanation: 'Subject + "is" + possessive pronoun.' },
          { id: 2, words: ['that', 'bag', 'hers', 'is'], answer: 'That bag is hers.', explanation: 'Subject + noun + "is" + possessive pronoun.' },
          { id: 3, words: ['the', 'car', 'his', 'is'], answer: 'The car is his.', explanation: '"His" stands alone as possessive pronoun.' },
          { id: 4, words: ['is', 'this', 'house', 'ours'], answer: 'This house is ours.', explanation: '"Ours" = belonging to us.' },
          { id: 5, words: ['those', 'keys', 'theirs', 'are'], answer: 'Those keys are theirs.', explanation: '"Theirs" = belonging to them.' },
          { id: 6, words: ['seat', 'is', 'yours', 'this'], answer: 'This seat is yours.', explanation: '"Yours" = belonging to you.' },
          { id: 7, words: ['not', 'mine', 'is', 'this'], answer: 'This is not mine.', explanation: 'Possessive pronoun in negative sentence.' },
          { id: 8, words: ['the', 'hers', 'red', 'bag', 'is'], answer: 'The red bag is hers.', explanation: 'Adjective before noun + possessive pronoun at end.' },
          { id: 9, words: ['mine', 'is', 'bigger', 'yours', 'than'], answer: 'Mine is bigger than yours.', explanation: 'Comparing with possessive pronouns.' },
          { id: 10, words: ['is', 'this', 'jacket', 'yours'], answer: 'Is this jacket yours?', explanation: 'Question: Is + this + noun + possessive pronoun?' },
          { id: 11, words: ['book', 'this', 'his', 'is', 'not'], answer: 'This book is not his.', explanation: 'Possessive pronoun in negative.' },
          { id: 12, words: ['score', 'was', 'higher', 'mine', 'than', 'his'], answer: 'My score was higher than his.', explanation: 'Comparison using possessive pronoun.' },
          { id: 13, words: ['is', 'that', 'umbrella', 'hers'], answer: 'That umbrella is hers.', explanation: '"Hers" stands alone as possessive pronoun.' },
          { id: 14, words: ['theirs', 'is', 'house', 'bigger', 'the'], answer: 'The house is bigger than theirs.', explanation: 'Comparison using possessive pronoun.' },
          { id: 15, words: ['mine', 'yours', 'which', 'is', 'and', 'which', 'is'], answer: 'Which is mine and which is yours?', explanation: 'Using two possessive pronouns in a question.' },
          { id: 16, words: ['idea', 'was', 'theirs', 'the'], answer: 'The idea was theirs.', explanation: '"Theirs" = belonging to them.' },
          { id: 17, words: ['not', 'mine', 'pen', 'this', 'is'], answer: 'This pen is not mine.', explanation: 'Possessive pronoun used after "is not".' },
          { id: 18, words: ['bike', 'blue', 'is', 'mine', 'the'], answer: 'The blue bike is mine.', explanation: 'Adjective + noun + possessive pronoun.' },
          { id: 19, words: ['ours', 'is', 'victory', 'the'], answer: 'The victory is ours.', explanation: '"Ours" as possessive pronoun.' },
          { id: 20, words: ['that', 'yours', 'or', 'is', 'hers'], answer: 'Is that yours or hers?', explanation: 'Question with two possessive pronouns.' },
        ],
        errorCorrection: [
          { id: 1, text: 'This book is my.', options: ['This book', 'is', 'my', 'No error'], correct: 2, wrongPart: 'my', correction: 'mine', explanation: '"My" is an adjective; use pronoun "mine" alone.' },
          { id: 2, text: 'That car is him.', options: ['That car', 'is', 'him', 'No error'], correct: 2, wrongPart: 'him', correction: 'his', explanation: '"Him" is an object pronoun; possessive = "his".' },
          { id: 3, text: 'Is this your? (referring to a bag)', options: ['Is', 'this', 'your', 'No error'], correct: 2, wrongPart: 'your', correction: 'yours', explanation: '"Your" needs a noun after it; alone = "yours".' },
          { id: 4, text: 'The red bag is her.', options: ['The red bag', 'is', 'her', 'No error'], correct: 2, wrongPart: 'her', correction: 'hers', explanation: '"Her" alone after "is" = "hers".' },
          { id: 5, text: 'This house is our.', options: ['This house', 'is', 'our', 'No error'], correct: 2, wrongPart: 'our', correction: 'ours', explanation: '"Our" needs a noun; alone = "ours".' },
          { id: 6, text: 'Those keys are their.', options: ['Those keys', 'are', 'their', 'No error'], correct: 2, wrongPart: 'their', correction: 'theirs', explanation: '"Their" needs a noun; alone = "theirs".' },
          { id: 7, text: 'Is this seat you?', options: ['Is this seat', 'you', 'No error', 'Is'], correct: 1, wrongPart: 'you', correction: 'yours', explanation: '"You" is a subject pronoun; use "yours" as possessive.' },
          { id: 8, text: 'The bike is mines.', options: ['The bike', 'is', 'mines', 'No error'], correct: 2, wrongPart: 'mines', correction: 'mine', explanation: '"Mines" doesn\'t exist; correct form is "mine".' },
          { id: 9, text: 'This is hers bag.', options: ['This is', 'hers', 'bag', 'No error'], correct: 1, wrongPart: 'hers', correction: 'her', explanation: '"Hers" is used alone; before a noun use "her".' },
          { id: 10, text: 'The idea was theirs.', options: ['The idea', 'was', 'theirs', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "theirs" correctly used as possessive pronoun.' },
          { id: 11, text: 'That laptop is ours.', options: ['That laptop', 'is', 'ours', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "ours" is the correct possessive pronoun.' },
          { id: 12, text: 'My score was higher than him.', options: ['My score', 'was higher', 'than him', 'No error'], correct: 2, wrongPart: 'than him', correction: 'than his', explanation: 'In comparisons, use possessive pronoun: "his score" = his.' },
          { id: 13, text: 'Is this coat hers?', options: ['Is this coat', 'hers', 'No error', 'Is'], correct: 2, wrongPart: '', correction: '', explanation: 'No error — "hers" is correctly used alone as possessive pronoun.' },
          { id: 14, text: 'Their house is bigger than our.', options: ['Their house', 'is bigger', 'than our', 'No error'], correct: 2, wrongPart: 'than our', correction: 'than ours', explanation: '"Our" needs a noun; use "ours" alone in comparisons.' },
          { id: 15, text: 'This pen is not mine.', options: ['This pen', 'is not', 'mine', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "mine" correctly used as possessive pronoun.' },
          { id: 16, text: 'The victory was we.', options: ['The victory', 'was', 'we', 'No error'], correct: 2, wrongPart: 'we', correction: 'ours', explanation: '"We" is a subject pronoun; use possessive pronoun "ours".' },
          { id: 17, text: 'Is that yours or hers?', options: ['Is that', 'yours', 'or hers', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — both possessive pronouns are correctly used.' },
          { id: 18, text: 'That bag is her, not mine.', options: ['That bag', 'is her', 'not mine', 'No error'], correct: 1, wrongPart: 'is her', correction: 'is hers', explanation: '"Her" alone after "is" = "hers".' },
          { id: 19, text: 'The black car is his and the white one is hers.', options: ['The black car is his', 'and', 'the white one is hers', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — both pronouns used correctly.' },
          { id: 20, text: 'This is not our problem, it\'s theirs.', options: ['This is not our problem', 'it\'s theirs', 'No error', 'it\'s'], correct: 2, wrongPart: '', correction: '', explanation: 'No error — "our" (adjective before noun) and "theirs" (alone) both correct.' },
        ],
        transform: [
          { id: 1, text: 'Change possessive adjective to pronoun: "This is my book."', options: ['This is me.', 'This is my.', 'This is mine.', 'This is myself.'], correct: 2, explanation: '"My" + noun → "mine" (pronoun) alone.' },
          { id: 2, text: 'Change possessive adjective to pronoun: "That is his car."', options: ['That is he.', 'That is him.', 'That is his.', 'That is himself.'], correct: 2, explanation: '"His" stays the same as adjective and pronoun.' },
          { id: 3, text: 'Change possessive adjective to pronoun: "These are her glasses."', options: ['These are she.', 'These are her.', 'These are hers.', 'These are herself.'], correct: 2, explanation: '"Her" + noun → "hers" (pronoun) alone.' },
          { id: 4, text: 'Change possessive adjective to pronoun: "This is our house."', options: ['This is us.', 'This is our.', 'This is ours.', 'This is ourselves.'], correct: 2, explanation: '"Our" + noun → "ours" (pronoun) alone.' },
          { id: 5, text: 'Change possessive adjective to pronoun: "That is their bag."', options: ['That is they.', 'That is their.', 'That is theirs.', 'That is themselves.'], correct: 2, explanation: '"Their" + noun → "theirs" (pronoun) alone.' },
          { id: 6, text: 'Change possessive adjective to pronoun: "Is this your seat?"', options: ['Is this you?', 'Is this your?', 'Is this yours?', 'Is this yourself?'], correct: 2, explanation: '"Your" + noun → "yours" (pronoun) alone.' },
          { id: 7, text: 'Replace underlined: "It\'s MY car, not your car." → pronoun form for both', options: ['It\'s me, not you.', 'It\'s mine, not yours.', 'It\'s my, not your.', 'It\'s mine, not your.'], correct: 1, explanation: '"Mine" and "yours" are possessive pronouns used alone.' },
          { id: 8, text: 'Combine using possessive pronoun: "That is his jacket. This is her jacket."', options: ['That is him, this is her.', 'That is his, this is hers.', 'That is his, this is her.', 'That is him, this is hers.'], correct: 1, explanation: 'Both "his" and "hers" are possessive pronouns.' },
          { id: 9, text: 'Change "I have a car" into a possessive pronoun sentence about it.', options: ['The car is me.', 'The car is my.', 'The car is mine.', 'The car is myself.'], correct: 2, explanation: '"Mine" = my car, used alone.' },
          { id: 10, text: 'Change "We have this house" into a possessive pronoun sentence.', options: ['The house is us.', 'The house is our.', 'The house is ours.', 'The house is ourselves.'], correct: 2, explanation: '"Ours" = our house, used alone.' },
          { id: 11, text: 'Turn into a comparison: "I have a big house. You have a small house."', options: ['My house is bigger than you.', 'My house is bigger than your.', 'My house is bigger than yours.', 'Mine house is bigger than yours.'], correct: 2, explanation: '"Yours" replaces "your house" in comparisons.' },
          { id: 12, text: 'Replace: "This is their victory." → possessive pronoun', options: ['The victory is they.', 'The victory is their.', 'The victory is theirs.', 'The victory is them.'], correct: 2, explanation: '"Theirs" replaces "their victory".' },
          { id: 13, text: 'Replace: "These are your shoes." → possessive pronoun', options: ['These shoes are you.', 'These shoes are your.', 'These shoes are yours.', 'These shoes are yourself.'], correct: 2, explanation: '"Yours" replaces "your shoes".' },
          { id: 14, text: 'Choose the correct sentence using a possessive pronoun.', options: ['That laptop is our.', 'That laptop is we.', 'That laptop is ours.', 'That laptop is us.'], correct: 2, explanation: '"Ours" is the correct possessive pronoun for "we".' },
          { id: 15, text: 'Replace: "That is not my problem, it is your problem."', options: ['That is not mine, it is yours.', 'That is not my, it is your.', 'That is not mine, it is your.', 'That is not me, it is you.'], correct: 0, explanation: '"Mine" and "yours" both stand alone.' },
          { id: 16, text: 'Change: "She has a new car." → state ownership using possessive pronoun', options: ['The new car is she.', 'The new car is her.', 'The new car is hers.', 'The new car is herself.'], correct: 2, explanation: '"Hers" = her car, used alone.' },
          { id: 17, text: 'Replace: "His result was better than my result."', options: ['His was better than mine.', 'Him was better than my.', 'His was better than me.', 'Him was better than mine.'], correct: 0, explanation: '"His" (pronoun) + "mine" (pronoun).' },
          { id: 18, text: 'Replace: "They lost their keys." → say the keys belong to them', options: ['The keys are they.', 'The keys are their.', 'The keys are theirs.', 'The keys are them.'], correct: 2, explanation: '"Theirs" = their keys, used alone.' },
          { id: 19, text: 'Replace: "That is not his bag. That is her bag."', options: ['That is not his, that is hers.', 'That is not him, that is hers.', 'That is not his, that is her.', 'That is not his, that is herself.'], correct: 0, explanation: 'Both "his" and "hers" are possessive pronouns.' },
          { id: 20, text: 'Rewrite: "I own that bicycle." using possessive pronoun', options: ['That bicycle is I.', 'That bicycle is me.', 'That bicycle is my.', 'That bicycle is mine.'], correct: 3, explanation: '"Mine" = my bicycle, used alone.' },
        ],
        dialogue: [
          { id: 1, situation: 'Two friends found a bag and are trying to figure out who it belongs to.', dialogue: 'A: Is this bag yours?\nB: No, it\'s not ___. Maybe it\'s Sarah\'s.', options: ['my', 'me', 'mine', 'myself'], correct: 2, explanation: '"Mine" stands alone as possessive pronoun.' },
          { id: 2, situation: 'Someone asks whose car is parked outside.', dialogue: 'A: Whose car is that?\nB: That one? It\'s ___.', options: ['he', 'him', 'his', 'himself'], correct: 2, explanation: '"His" is both possessive adjective and pronoun.' },
          { id: 3, situation: 'You and a friend are comparing phones.', dialogue: 'A: Your phone is newer than mine.\nB: Yes, but ___ has a better camera.', options: ['my', 'me', 'mine', 'myself'], correct: 2, explanation: '"Mine" replaces "my phone".' },
          { id: 4, situation: 'Two students are checking who owns a pencil.', dialogue: 'A: Is this pencil yours or hers?\nB: It\'s ___.', options: ['her', 'she', 'hers', 'herself'], correct: 2, explanation: '"Hers" stands alone as possessive pronoun.' },
          { id: 5, situation: 'A teacher asks students about their notebooks.', dialogue: 'A: Whose notebook is this?\nB: It\'s ___!', options: ['my', 'me', 'mine', 'myself'], correct: 2, explanation: '"Mine" = my notebook, used without a noun.' },
          { id: 6, situation: 'A friend asks about seats at the cinema.', dialogue: 'A: Are these seats ours or theirs?\nB: They\'re ___. I booked them.', options: ['our', 'us', 'ours', 'ourselves'], correct: 2, explanation: '"Ours" stands alone as possessive pronoun.' },
          { id: 7, situation: 'You found a jacket in class and ask the owner.', dialogue: 'A: Is this jacket ___?\nB: Yes, thank you!', options: ['you', 'your', 'yours', 'yourself'], correct: 2, explanation: '"Yours" = belonging to you, used alone.' },
          { id: 8, situation: 'A child is telling his friend what belongs to him.', dialogue: 'A: That blue bicycle is ___.\nB: Really? It\'s beautiful!', options: ['I', 'me', 'my', 'mine'], correct: 3, explanation: '"Mine" = my bicycle, used alone after "is".' },
          { id: 9, situation: 'Comparing results after a test.', dialogue: 'A: My score is 85. What about you?\nB: ___ is 90!', options: ['My', 'Me', 'Mine', 'Myself'], correct: 2, explanation: '"Mine" = my score, used alone.' },
          { id: 10, situation: 'Asking about belongings at a party.', dialogue: 'A: Is this umbrella ___?\nB: No, I think it\'s David\'s.', options: ['you', 'your', 'yours', 'yourself'], correct: 2, explanation: '"Yours" stands alone as possessive pronoun.' },
          { id: 11, situation: 'Talking about a house that belongs to the family.', dialogue: 'A: Is that your family\'s house?\nB: Yes! It\'s ___.', options: ['our', 'us', 'ours', 'ourselves'], correct: 2, explanation: '"Ours" = our house.' },
          { id: 12, situation: 'Two friends discussing who did better on a project.', dialogue: 'A: Your project was great!\nB: Thank you, but ___ was better.', options: ['your', 'you', 'yours', 'yourself'], correct: 2, explanation: '"Yours" = your project, used alone.' },
          { id: 13, situation: 'A colleague claims a parking spot.', dialogue: 'A: Is this parking spot yours?\nB: No, it\'s ___. I always park here.', options: ['he', 'him', 'his', 'himself'], correct: 2, explanation: '"His" as possessive pronoun.' },
          { id: 14, situation: 'Two children argue over a toy.', dialogue: 'A: Give me that! It\'s ___!\nB: No, it\'s mine!', options: ['my', 'me', 'mine', 'myself'], correct: 2, explanation: '"Mine" stands alone.' },
          { id: 15, situation: 'Someone asks about a dog at the park.', dialogue: 'A: Whose dog is that?\nB: It\'s ___. Her name is Luna.', options: ['our', 'us', 'ours', 'ourselves'], correct: 2, explanation: '"Ours" stands alone as possessive pronoun.' },
          { id: 16, situation: 'Talking about who won the game.', dialogue: 'A: Who won?\nB: The victory was ___!', options: ['our', 'us', 'ours', 'ourselves'], correct: 2, explanation: '"Ours" = our victory, used alone.' },
          { id: 17, situation: 'A friend sees your new laptop.', dialogue: 'A: Is that your laptop?\nB: Yes, it\'s ___.', options: ['my', 'me', 'mine', 'myself'], correct: 2, explanation: '"Mine" = my laptop, used alone.' },
          { id: 18, situation: 'Someone asks which bag at the store is yours.', dialogue: 'A: Which bag is yours?\nB: ___ is the red one.', options: ['My', 'Me', 'Mine', 'Myself'], correct: 2, explanation: '"Mine" used as the subject of the sentence.' },
          { id: 19, situation: 'A friend mentions your score vs. theirs.', dialogue: 'A: My score is 75. Yours is higher!\nB: Yes, ___ is 92.', options: ['My', 'Me', 'Mine', 'Myself'], correct: 2, explanation: '"Mine" = my score.' },
          { id: 20, situation: 'Looking at photos at a party.', dialogue: 'A: Is this photo ___?\nB: No, that\'s theirs. Mine is the one with the blue frame.', options: ['you', 'your', 'yours', 'yourself'], correct: 2, explanation: '"Yours" stands alone.' },
        ],
      },
      {
        id: 'reflexive-pronouns',
        title: 'Reflexive Pronouns',
        icon: '🪞',
        guide: `## O'zlik Olmoshlari (Reflexive Pronouns)

O'zlik olmoshlari ish-harakat egaga qaytganda yoki ta'kidlash uchun ishlatiladi.

## O'zlik olmoshlari jadvali
• I → myself (o'zim)
• You → yourself (o'zing/o'zingiz) [birlik]
• He → himself (o'zi - erkak)
• She → herself (o'zi - ayol)
• It → itself (o'zi - narsa)
• We → ourselves (o'zimiz)
• You → yourselves (o'zinglar/o'zingizlar) [ko'plik]
• They → themselves (o'zlari)

## Ishlatilishi

### 1. Ish-harakat egaga qaytganda (Reflexive use)
• She hurt herself. (U o'zini yaraladi.)
• He introduced himself. (U o'zini tanishtirdi.)
• They enjoyed themselves at the party. (Ular ziyofatda yaxshi vaqt o'tkazishdi.)

### 2. Ta'kidlash uchun (Emphatic use)
• I made this cake myself. (Bu tortni o'zim qildim.)
• The president himself came. (Prezidentning o'zi keldi.)

### 3. "By + reflexive" = yolg'iz, o'zi
• She lives by herself. (U yolg'iz yashaydi.)
• I did it all by myself. (Buni hammasi o'zim qildim.)`,
        questions: [
          { id: 1, text: 'She hurt ___. (she → reflexive)', options: ['her', 'hers', 'herself', 'she'], correct: 2, explanation: '"Herself" reflects the action back to "she".' },
          { id: 2, text: 'He introduced ___ to everyone.', options: ['him', 'his', 'himself', 'he'], correct: 2, explanation: '"Himself" — reflexive for "he".' },
          { id: 3, text: 'I made this cake ___.', options: ['me', 'my', 'mine', 'myself'], correct: 3, explanation: '"Myself" for emphasis: I made it alone.' },
          { id: 4, text: 'They enjoyed ___ at the party.', options: ['them', 'their', 'theirs', 'themselves'], correct: 3, explanation: '"Themselves" — reflexive for "they".' },
          { id: 5, text: 'Be careful! Don\'t cut ___. (you → singular)', options: ['you', 'your', 'yours', 'yourself'], correct: 3, explanation: '"Yourself" for singular "you".' },
          { id: 6, text: 'The cat washed ___.', options: ['it', 'its', 'itself', 'itsself'], correct: 2, explanation: '"Itself" — reflexive for "it".' },
          { id: 7, text: 'We made all the preparations ___. (emphasis)', options: ['us', 'our', 'ours', 'ourselves'], correct: 3, explanation: '"Ourselves" for emphasis with "we".' },
          { id: 8, text: '"By myself" means:', options: ['with help', 'alone', 'with myself', 'by my side'], correct: 1, explanation: '"By myself" = alone, without help.' },
          { id: 9, text: 'She looked at ___ in the mirror.', options: ['her', 'hers', 'herself', 'she'], correct: 2, explanation: '"Herself" — looking back at herself.' },
          { id: 10, text: 'Which is the reflexive pronoun for "we"?', options: ['us', 'our', 'ours', 'ourselves'], correct: 3, explanation: '"Ourselves" is the reflexive form of "we".' },
          { id: 11, text: 'The children drew the pictures ___. (emphasis)', options: ['them', 'their', 'theirs', 'themselves'], correct: 3, explanation: '"Themselves" for emphatic use with "they".' },
          { id: 12, text: 'Did you hurt ___? (singular)', options: ['you', 'your', 'yours', 'yourself'], correct: 3, explanation: '"Yourself" — reflexive for singular "you".' },
          { id: 13, text: 'I can do it by ___.', options: ['me', 'my', 'mine', 'myself'], correct: 3, explanation: '"By myself" = alone.' },
          { id: 14, text: 'He taught ___ to play guitar.', options: ['him', 'his', 'himself', 'he'], correct: 2, explanation: '"Himself" — he taught himself.' },
          { id: 15, text: 'Reflexive pronouns end in:', options: ['-self / -selves', '-self only', '-selves only', '-own'], correct: 0, explanation: 'Singular: -self, Plural: -selves.' },
          { id: 16, text: 'Which is wrong?', options: ['myself', 'yourself', 'hisself', 'themselves'], correct: 2, explanation: '"Hisself" is incorrect. The correct form is "himself".' },
          { id: 17, text: 'She lives by ___. (alone)', options: ['her', 'hers', 'herself', 'she'], correct: 2, explanation: '"By herself" = she lives alone.' },
          { id: 18, text: 'Please help ___. (you plural → reflexive)', options: ['you', 'your', 'yourself', 'yourselves'], correct: 3, explanation: '"Yourselves" is the plural reflexive for "you (plural)".' },
          { id: 19, text: 'They built this house ___. (emphasis)', options: ['them', 'their', 'theirs', 'themselves'], correct: 3, explanation: '"Themselves" for emphasis = they did it without help.' },
          { id: 20, text: 'The machine turns ___ off.', options: ['it', 'its', 'itself', 'itsself'], correct: 2, explanation: '"Itself" — the machine reflects action back on itself.' },
          { id: 21, text: 'We should believe in ___. (we → reflexive)', options: ['us', 'our', 'ours', 'ourselves'], correct: 3, explanation: '"In ourselves" = believe in ourselves.' },
          { id: 22, text: 'What is the reflexive pronoun for "I"?', options: ['me', 'my', 'mine', 'myself'], correct: 3, explanation: '"Myself" is the reflexive pronoun for "I".' },
          { id: 23, text: 'He cooked dinner ___. (emphasis)', options: ['him', 'his', 'himself', 'he'], correct: 2, explanation: '"Himself" for emphasis: he did it alone.' },
          { id: 24, text: 'She introduced ___ as the new manager.', options: ['her', 'hers', 'herself', 'she'], correct: 2, explanation: '"Herself" — the action returns to the subject "she".' },
          { id: 25, text: 'Which is correct: "The team enjoyed themselves" or "The team enjoyed itself"?', options: ['themselves', 'itself', 'Both can be correct', 'Neither is correct'], correct: 2, explanation: 'Teams can be treated as plural (themselves) or singular (itself) in English.' },
          { id: 26, text: 'Did you make this ___? (you → emphasis, singular)', options: ['you', 'your', 'yourself', 'yourselves'], correct: 2, explanation: '"Yourself" = emphatic, you made it alone.' },
          { id: 27, text: 'The baby can feed ___ now.', options: ['it', 'its', 'itself', 'itsself'], correct: 2, explanation: '"Itself" — baby is singular and non-gendered here.' },
          { id: 28, text: 'I finished the project by ___. (=alone)', options: ['me', 'my', 'mine', 'myself'], correct: 3, explanation: '"By myself" = alone.' },
          { id: 29, text: 'Which sentence uses a reflexive pronoun correctly?', options: ['He saw herself.', 'She helped himself.', 'They hurt themselves.', 'I did it ourself.'], correct: 2, explanation: '"Themselves" is correct for "they".' },
          { id: 30, text: 'They decorated the hall ___. (emphasis)', options: ['them', 'their', 'theirs', 'themselves'], correct: 3, explanation: '"Themselves" for emphasis.' },
        ],
        fillBlanks: [
          { id: 1, text: 'She hurt ___. (she → reflexive)', options: ['her', 'hers', 'herself', 'she'], correct: 2, explanation: '"Herself" reflects the action back to "she".' },
          { id: 2, text: 'He introduced ___ to everyone.', options: ['him', 'his', 'himself', 'he'], correct: 2, explanation: '"Himself" — reflexive for "he".' },
          { id: 3, text: 'I made this cake ___. (emphasis)', options: ['me', 'my', 'mine', 'myself'], correct: 3, explanation: '"Myself" for emphasis — I did it alone.' },
          { id: 4, text: 'They enjoyed ___ at the party.', options: ['them', 'their', 'theirs', 'themselves'], correct: 3, explanation: '"Themselves" — reflexive for "they".' },
          { id: 5, text: 'Be careful! Don\'t cut ___. (you, singular)', options: ['you', 'your', 'yours', 'yourself'], correct: 3, explanation: '"Yourself" for singular "you".' },
          { id: 6, text: 'The cat washed ___.', options: ['it', 'its', 'itself', 'itsself'], correct: 2, explanation: '"Itself" — reflexive for "it".' },
          { id: 7, text: 'We prepared all the food ___. (emphasis)', options: ['us', 'our', 'ours', 'ourselves'], correct: 3, explanation: '"Ourselves" for emphasis with "we".' },
          { id: 8, text: 'She looked at ___ in the mirror.', options: ['her', 'hers', 'herself', 'she'], correct: 2, explanation: '"Herself" — looking back at herself.' },
          { id: 9, text: 'Did you hurt ___? (singular)', options: ['you', 'your', 'yours', 'yourself'], correct: 3, explanation: '"Yourself" — reflexive for singular "you".' },
          { id: 10, text: 'He taught ___ to play the piano.', options: ['him', 'his', 'himself', 'he'], correct: 2, explanation: '"Himself" — he taught himself.' },
          { id: 11, text: 'The children drew the pictures ___. (emphasis)', options: ['them', 'their', 'theirs', 'themselves'], correct: 3, explanation: '"Themselves" for emphatic use.' },
          { id: 12, text: 'I can do it by ___.', options: ['me', 'my', 'mine', 'myself'], correct: 3, explanation: '"By myself" = alone.' },
          { id: 13, text: 'She lives by ___. (alone)', options: ['her', 'hers', 'herself', 'she'], correct: 2, explanation: '"By herself" = she lives alone.' },
          { id: 14, text: 'Please help ___. (you plural → reflexive)', options: ['you', 'your', 'yourself', 'yourselves'], correct: 3, explanation: '"Yourselves" is the plural reflexive for "you (plural)".' },
          { id: 15, text: 'The machine turns ___ off automatically.', options: ['it', 'its', 'itself', 'itsself'], correct: 2, explanation: '"Itself" — the machine reflects action back on itself.' },
          { id: 16, text: 'We should believe in ___. (we → reflexive)', options: ['us', 'our', 'ours', 'ourselves'], correct: 3, explanation: '"In ourselves" — reflexive after preposition.' },
          { id: 17, text: 'He cooked dinner ___. (emphasis)', options: ['him', 'his', 'himself', 'he'], correct: 2, explanation: '"Himself" for emphasis: he did it alone.' },
          { id: 18, text: 'I finished the project by ___. (= alone)', options: ['me', 'my', 'mine', 'myself'], correct: 3, explanation: '"By myself" = alone.' },
          { id: 19, text: 'They built this house ___. (emphasis)', options: ['them', 'their', 'theirs', 'themselves'], correct: 3, explanation: '"Themselves" for emphasis.' },
          { id: 20, text: 'She introduced ___ as the new manager.', options: ['her', 'hers', 'herself', 'she'], correct: 2, explanation: '"Herself" — action returns to the subject.' },
        ],
        scrambled: [
          { id: 1, words: ['she', 'hurt', 'herself'], answer: 'She hurt herself.', explanation: 'Subject + verb + reflexive pronoun.' },
          { id: 2, words: ['he', 'introduced', 'himself'], answer: 'He introduced himself.', explanation: 'Subject + past verb + reflexive pronoun.' },
          { id: 3, words: ['myself', 'I', 'did', 'it', 'by'], answer: 'I did it by myself.', explanation: '"By myself" = alone.' },
          { id: 4, words: ['they', 'at', 'enjoyed', 'party', 'the', 'themselves'], answer: 'They enjoyed themselves at the party.', explanation: 'Subject + verb + reflexive pronoun + place.' },
          { id: 5, words: ['yourself', 'cut', 'don\'t'], answer: 'Don\'t cut yourself.', explanation: 'Negative imperative + reflexive pronoun.' },
          { id: 6, words: ['the', 'cat', 'washed', 'itself'], answer: 'The cat washed itself.', explanation: 'Subject + past verb + reflexive pronoun (it).' },
          { id: 7, words: ['we', 'it', 'did', 'ourselves', 'by', 'all'], answer: 'We did it all by ourselves.', explanation: '"By ourselves" = we did it alone.' },
          { id: 8, words: ['herself', 'she', 'looked', 'mirror', 'at', 'in', 'the'], answer: 'She looked at herself in the mirror.', explanation: 'Subject + verb + reflexive pronoun + place.' },
          { id: 9, words: ['yourself', 'did', 'you', 'hurt'], answer: 'Did you hurt yourself?', explanation: 'Question: Did + subject + verb + reflexive pronoun?' },
          { id: 10, words: ['himself', 'he', 'taught', 'play', 'to', 'guitar'], answer: 'He taught himself to play guitar.', explanation: 'Subject + past verb + reflexive + infinitive.' },
          { id: 11, words: ['cake', 'made', 'herself', 'she', 'the'], answer: 'She made the cake herself.', explanation: 'Reflexive pronoun at the end for emphasis.' },
          { id: 12, words: ['myself', 'can', 'by', 'it', 'I', 'do'], answer: 'I can do it by myself.', explanation: '"By myself" = alone.' },
          { id: 13, words: ['alone', 'she', 'lives', 'by', 'herself'], answer: 'She lives by herself alone.', explanation: '"By herself" = alone.' },
          { id: 14, words: ['yourselves', 'help', 'please'], answer: 'Please help yourselves.', explanation: 'Polite imperative + plural reflexive.' },
          { id: 15, words: ['machine', 'turns', 'itself', 'off', 'the'], answer: 'The machine turns itself off.', explanation: 'Subject + verb + reflexive (thing) + particle.' },
          { id: 16, words: ['ourselves', 'we', 'believe', 'should', 'in'], answer: 'We should believe in ourselves.', explanation: 'Modal + base verb + preposition + reflexive.' },
          { id: 17, words: ['himself', 'dinner', 'he', 'cooked'], answer: 'He cooked dinner himself.', explanation: 'Reflexive at end = emphasis.' },
          { id: 18, words: ['finished', 'project', 'myself', 'I', 'the', 'by'], answer: 'I finished the project by myself.', explanation: '"By myself" = without help.' },
          { id: 19, words: ['themselves', 'the', 'hall', 'decorated', 'they'], answer: 'They decorated the hall themselves.', explanation: 'Reflexive at end = emphasis.' },
          { id: 20, words: ['herself', 'as', 'manager', 'she', 'introduced', 'new', 'the'], answer: 'She introduced herself as the new manager.', explanation: 'Subject + verb + reflexive + as + role.' },
        ],
        errorCorrection: [
          { id: 1, text: 'She hurt herself.', options: ['She', 'hurt', 'herself', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "herself" is the correct reflexive pronoun for "she".' },
          { id: 2, text: 'He introduced hisself to everyone.', options: ['He', 'introduced', 'hisself', 'to everyone'], correct: 2, wrongPart: 'hisself', correction: 'himself', explanation: '"Hisself" doesn\'t exist. Correct form: "himself".' },
          { id: 3, text: 'I made this cake by me.', options: ['I', 'made this cake', 'by me', 'No error'], correct: 2, wrongPart: 'by me', correction: 'by myself', explanation: '"By myself" = alone (reflexive after "by").' },
          { id: 4, text: 'They enjoyed theirselves at the party.', options: ['They', 'enjoyed', 'theirselves', 'at the party'], correct: 2, wrongPart: 'theirselves', correction: 'themselves', explanation: '"Theirselves" is wrong. Correct: "themselves".' },
          { id: 5, text: 'Don\'t cut yourself on the knife.', options: ['Don\'t cut', 'yourself', 'on the knife', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "yourself" is the correct reflexive for singular "you".' },
          { id: 6, text: 'The cat washed itsself.', options: ['The cat', 'washed', 'itsself', 'No error'], correct: 2, wrongPart: 'itsself', correction: 'itself', explanation: '"Itsself" is wrong. Correct: "itself".' },
          { id: 7, text: 'We prepared the food ourself.', options: ['We', 'prepared the food', 'ourself', 'No error'], correct: 2, wrongPart: 'ourself', correction: 'ourselves', explanation: '"Ourself" is not standard. Correct: "ourselves" for "we".' },
          { id: 8, text: 'She looked at herself in the mirror.', options: ['She', 'looked at', 'herself', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "herself" is correct.' },
          { id: 9, text: 'Did you hurt yourselves? (talking to one person)', options: ['Did you', 'hurt', 'yourselves', 'No error'], correct: 2, wrongPart: 'yourselves', correction: 'yourself', explanation: 'For singular "you", use "yourself", not "yourselves".' },
          { id: 10, text: 'He taught himself to play guitar.', options: ['He', 'taught', 'himself', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "himself" correctly used.' },
          { id: 11, text: 'By herself means with help.', options: ['By herself', 'means', 'with help', 'No error'], correct: 2, wrongPart: 'with help', correction: 'without help / alone', explanation: '"By herself" = alone, NOT with help.' },
          { id: 12, text: 'I can do it by me.', options: ['I', 'can do it', 'by me', 'No error'], correct: 2, wrongPart: 'by me', correction: 'by myself', explanation: 'The reflexive "myself" is used after "by".' },
          { id: 13, text: 'She lives by herself. She is very independent.', options: ['She lives by herself', 'She is', 'very independent', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — all correct.' },
          { id: 14, text: 'Help yourselfs to more food.', options: ['Help', 'yourselfs', 'to more food', 'No error'], correct: 1, wrongPart: 'yourselfs', correction: 'yourselves', explanation: 'Plural reflexive: "yourselves" (not "yourselfs").' },
          { id: 15, text: 'The machine turns itself off.', options: ['The machine', 'turns', 'itself', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "itself" is the correct reflexive for "it".' },
          { id: 16, text: 'We should believe in ourself.', options: ['We', 'should believe', 'in ourself', 'No error'], correct: 2, wrongPart: 'in ourself', correction: 'in ourselves', explanation: '"Ourself" is non-standard. Use "ourselves" for "we".' },
          { id: 17, text: 'He saw herself in the photo.', options: ['He', 'saw', 'herself', 'in the photo'], correct: 2, wrongPart: 'herself', correction: 'himself', explanation: '"He" → "himself" (not "herself").' },
          { id: 18, text: 'They built this house theirself.', options: ['They', 'built this house', 'theirself', 'No error'], correct: 2, wrongPart: 'theirself', correction: 'themselves', explanation: '"Theirself" doesn\'t exist. Use "themselves".' },
          { id: 19, text: 'I finished the project by myself.', options: ['I', 'finished the project', 'by myself', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "by myself" is correct.' },
          { id: 20, text: 'She introduced herself as the new manager.', options: ['She', 'introduced', 'herself', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — all correct.' },
        ],
        transform: [
          { id: 1, text: 'Add a reflexive pronoun for emphasis: "I made this cake."', options: ['I made this cake me.', 'I made this cake myself.', 'I made this cake by me.', 'I made myself this cake.'], correct: 1, explanation: 'Add "myself" at the end for emphasis.' },
          { id: 2, text: 'Change to show the action reflects back: "She looked in the mirror."', options: ['She looked at herself in the mirror.', 'She looked at her in the mirror.', 'She looked at hers in the mirror.', 'She herself looked mirror.'], correct: 0, explanation: 'Add reflexive pronoun: herself.' },
          { id: 3, text: 'Change to "by + reflexive": "He lives alone."', options: ['He lives with himself.', 'He lives by his.', 'He lives by himself.', 'He lives for himself.'], correct: 2, explanation: '"By himself" = alone.' },
          { id: 4, text: 'Make it reflexive: "They hurt the team." (they hurt themselves)', options: ['They hurt them.', 'They hurt their.', 'They hurt themselves.', 'They hurt theirs.'], correct: 2, explanation: 'Reflexive: subject and object are the same = themselves.' },
          { id: 5, text: 'Add reflexive pronoun: "She introduced to everyone."', options: ['She introduced her to everyone.', 'She introduced hers to everyone.', 'She introduced herself to everyone.', 'She introduced she to everyone.'], correct: 2, explanation: 'Reflexive after "introduced": herself.' },
          { id: 6, text: 'Change to reflexive: "We taught us English."', options: ['We taught ourselves English.', 'We taught ourself English.', 'We taught we English.', 'We ourselves English.'], correct: 0, explanation: '"Ourselves" is the correct reflexive for "we".' },
          { id: 7, text: 'Complete: "Don\'t cut ___." (talking to one friend)', options: ['you', 'your', 'yourself', 'yourselves'], correct: 2, explanation: 'Singular "you" → yourself.' },
          { id: 8, text: 'Add emphasis: "The president came to the event."', options: ['The president came himself to the event.', 'The president himself came to the event.', 'The president came to the himself event.', 'Himself president came to the event.'], correct: 1, explanation: 'Emphatic reflexive usually comes right after the noun it emphasizes.' },
          { id: 9, text: 'Complete: "The machine switched ___ off."', options: ['it', 'its', 'itself', 'itsself'], correct: 2, explanation: '"Itself" is the reflexive for "it".' },
          { id: 10, text: 'Make it reflexive: "She helped her." (same person)', options: ['She helped herself.', 'She helped her.', 'She helped hers.', 'She helped she.'], correct: 0, explanation: 'When subject = object → reflexive: herself.' },
          { id: 11, text: 'Change to "by + reflexive": "She lives alone."', options: ['She lives by her.', 'She lives by hers.', 'She lives by herself.', 'She lives for herself.'], correct: 2, explanation: '"By herself" = alone.' },
          { id: 12, text: 'Add reflexive to emphasize: "He finished the project."', options: ['He himself finished the project.', 'He finished the project him.', 'He finished the project his.', 'Him finished the project.'], correct: 0, explanation: '"Himself" for emphasis: He himself (= no one else).' },
          { id: 13, text: 'Complete: "They really enjoyed ___ on the trip."', options: ['them', 'their', 'theirs', 'themselves'], correct: 3, explanation: '"Themselves" — reflexive for "they".' },
          { id: 14, text: 'Complete: "Be careful not to hurt ___." (talking to two friends)', options: ['you', 'yourself', 'yourselves', 'your'], correct: 2, explanation: 'Plural "you" → yourselves.' },
          { id: 15, text: 'Make it reflexive: "I hurt me during exercise."', options: ['I hurt me.', 'I hurt I.', 'I hurt myself.', 'I hurt mine.'], correct: 2, explanation: 'When subject = object: I → myself.' },
          { id: 16, text: 'Complete: "She taught ___ to swim."', options: ['her', 'hers', 'herself', 'she'], correct: 2, explanation: '"Herself" — she taught herself.' },
          { id: 17, text: 'Complete: "I did it all by ___."', options: ['me', 'my', 'mine', 'myself'], correct: 3, explanation: '"By myself" = alone.' },
          { id: 18, text: 'Make it reflexive: "He cut him while shaving." (same person)', options: ['He cut him.', 'He cut his.', 'He cut himself.', 'He cut he.'], correct: 2, explanation: '"Himself" — same subject and object.' },
          { id: 19, text: 'Add reflexive: "We did it without any help."', options: ['We did it by us.', 'We did it by our.', 'We did it by ourselves.', 'We did it by ours.'], correct: 2, explanation: '"By ourselves" = without help.' },
          { id: 20, text: 'Complete: "Make ___ comfortable!" (to one person)', options: ['you', 'yourself', 'yourselves', 'your'], correct: 1, explanation: 'Singular "you" → yourself.' },
        ],
        dialogue: [
          { id: 1, situation: 'A friend asks if you had help with your project.', dialogue: 'A: Did someone help you with the project?\nB: No, I did it by ___.', options: ['me', 'my', 'mine', 'myself'], correct: 3, explanation: '"By myself" = alone, without help.' },
          { id: 2, situation: 'You ask a classmate about a cooking competition.', dialogue: 'A: Did you cook all the food yourself?\nB: Yes! I cooked everything ___.', options: ['me', 'my', 'myself', 'mine'], correct: 2, explanation: '"Myself" for emphasis = I did it alone.' },
          { id: 3, situation: 'A friend asks how someone hurt their leg.', dialogue: 'A: How did she hurt her leg?\nB: She fell and hurt ___ during practice.', options: ['her', 'hers', 'herself', 'she'], correct: 2, explanation: '"Herself" — the action reflects back to "she".' },
          { id: 4, situation: 'You talk about a party where everyone had fun.', dialogue: 'A: Did your friends enjoy the party?\nB: Yes, they really enjoyed ___.', options: ['them', 'their', 'theirs', 'themselves'], correct: 3, explanation: '"Themselves" — reflexive for "they".' },
          { id: 5, situation: 'A parent warns a child to be careful in the kitchen.', dialogue: 'A: Be careful with that knife! Don\'t cut ___!\nB: OK, Mum!', options: ['you', 'your', 'yourself', 'yourselves'], correct: 2, explanation: '"Yourself" — reflexive for singular "you".' },
          { id: 6, situation: 'A friend talks about learning guitar.', dialogue: 'A: Did you take guitar lessons?\nB: No, I taught ___ to play.', options: ['me', 'my', 'mine', 'myself'], correct: 3, explanation: '"Myself" — I taught myself (reflexive).' },
          { id: 7, situation: 'You ask about your colleague\'s living situation.', dialogue: 'A: Does she live with family?\nB: No, she lives by ___.', options: ['her', 'hers', 'herself', 'she'], correct: 2, explanation: '"By herself" = alone.' },
          { id: 8, situation: 'A teacher says the students should check their work alone.', dialogue: 'A: Should we work in pairs?\nB: No, please check your work by ___.', options: ['you', 'your', 'yourself', 'yourselves'], correct: 3, explanation: '"Yourselves" — plural reflexive for a group.' },
          { id: 9, situation: 'Someone asks if the famous singer performed without help.', dialogue: 'A: Did the singer write all the songs?\nB: Yes! She wrote them all by ___.', options: ['her', 'hers', 'herself', 'she'], correct: 2, explanation: '"By herself" = alone/without help.' },
          { id: 10, situation: 'A friend asks about your cat\'s behavior.', dialogue: 'A: Does your cat clean itself?\nB: Yes! It washes ___ every morning.', options: ['it', 'its', 'itself', 'itsself'], correct: 2, explanation: '"Itself" — reflexive for "it".' },
          { id: 11, situation: 'A colleague brags about finishing a big task.', dialogue: 'A: Did you have any help with the report?\nB: Not at all! I wrote it all by ___.', options: ['me', 'my', 'mine', 'myself'], correct: 3, explanation: '"By myself" = without any help.' },
          { id: 12, situation: 'You and a friend discuss building something.', dialogue: 'A: Who built that birdhouse?\nB: We built it ___, without any help!', options: ['us', 'our', 'ours', 'ourselves'], correct: 3, explanation: '"Ourselves" for emphasis = we did it alone.' },
          { id: 13, situation: 'A friend asks what happened to a classmate.', dialogue: 'A: Why is David limping?\nB: He hurt ___ playing football.', options: ['him', 'his', 'himself', 'he'], correct: 2, explanation: '"Himself" — reflexive for "he".' },
          { id: 14, situation: 'A teacher praises a student for independent work.', dialogue: 'A: Did you solve this problem ___?\nB: Yes, I figured it out alone!', options: ['you', 'your', 'yourself', 'yourselves'], correct: 2, explanation: '"Yourself" — emphatic reflexive for singular "you".' },
          { id: 15, situation: 'At a dinner party, the host invites guests to help themselves.', dialogue: 'A: Please, help ___ to more food!\nB: Thank you, everything is delicious!', options: ['you', 'your', 'yourself', 'yourselves'], correct: 3, explanation: '"Yourselves" — plural form for a group of guests.' },
          { id: 16, situation: 'You tell a friend about a famous chef.', dialogue: 'A: Is the restaurant\'s food prepared by professional chefs?\nB: Yes, the head chef cooks everything ___.', options: ['him', 'his', 'himself', 'he'], correct: 2, explanation: '"Himself" for emphasis — he does it himself.' },
          { id: 17, situation: 'A classmate asks about your study habits.', dialogue: 'A: Do you study with a tutor?\nB: No, I study by ___.', options: ['me', 'my', 'mine', 'myself'], correct: 3, explanation: '"By myself" = alone, without a tutor.' },
          { id: 18, situation: 'Two friends discuss a woman who runs her own business.', dialogue: 'A: Does she have any business partners?\nB: No, she runs the business by ___.', options: ['her', 'hers', 'herself', 'she'], correct: 2, explanation: '"By herself" = alone.' },
          { id: 19, situation: 'You describe what happened at the robot competition.', dialogue: 'A: How did the robot stop?\nB: It turned ___ off automatically.', options: ['it', 'its', 'itself', 'itsself'], correct: 2, explanation: '"Itself" — reflexive for "it".' },
          { id: 20, situation: 'A coach encourages the team.', dialogue: 'A: You need to believe in ___!\nB: We will do our best!', options: ['us', 'our', 'ours', 'ourselves'], correct: 3, explanation: '"In ourselves" — reflexive after preposition "in".' },
        ],
      },
      {
        id: 'plurals',
        title: 'Plurals',
        icon: '📚',
        guide: `## Ko'plik shakli (Plurals)

Ko'plik shakli ingliz tilida odatda otga -s yoki -es qo'shish orqali hosil qilinadi.

## Asosiy qoidalar

### 1. Ko'p otlarga -s qo'shiladi
• book → books, cat → cats, dog → dogs

### 2. -s, -ss, -sh, -ch, -x bilan tugagan otlarga -es
• bus → buses, class → classes
• dish → dishes, church → churches
• box → boxes

### 3. Unli + y → -ys
• day → days, key → keys, boy → boys

### 4. Undosh + y → y o'rniga -ies
• city → cities, baby → babies, country → countries

### 5. -f/-fe → -ves
• leaf → leaves, wife → wives, knife → knives
• Istisnolar: roof → roofs, belief → beliefs

### 6. -o bilan tugaganlar
• tomato → tomatoes, potato → potatoes
• photo → photos, piano → pianos

## Noto'g'ri ko'pliklar (Irregular Plurals)
• man → men
• woman → women
• child → children
• foot → feet
• tooth → teeth
• mouse → mice
• goose → geese`,
        questions: [
          { id: 1, text: 'What is the plural of "city"?', options: ['citys', 'cities', 'cityes', 'city'], correct: 1, explanation: 'Consonant + y → ies: city → cities.' },
          { id: 2, text: 'What is the plural of "box"?', options: ['boxs', 'boxes', 'boxxes', 'boxies'], correct: 1, explanation: 'Words ending in -x take -es: box → boxes.' },
          { id: 3, text: 'What is the plural of "child"?', options: ['childs', 'children', 'childes', 'childre'], correct: 1, explanation: '"Child" has an irregular plural: children.' },
          { id: 4, text: 'What is the plural of "knife"?', options: ['knifes', 'knives', 'knifes', 'knife'], correct: 1, explanation: '-fe → -ves: knife → knives.' },
          { id: 5, text: 'What is the plural of "tooth"?', options: ['tooths', 'teeth', 'teeths', 'toothes'], correct: 1, explanation: '"Tooth" has an irregular plural: teeth.' },
          { id: 6, text: 'What is the plural of "photo"?', options: ['photoes', 'photoss', 'photos', 'photies'], correct: 2, explanation: 'Some -o words just add -s: photos.' },
          { id: 7, text: 'What is the plural of "man"?', options: ['mans', 'manes', 'men', 'mene'], correct: 2, explanation: '"Man" has an irregular plural: men.' },
          { id: 8, text: 'What is the plural of "bus"?', options: ['buss', 'buses', 'busies', 'buse'], correct: 1, explanation: 'Words ending in -s/-ss take -es: buses.' },
          { id: 9, text: 'What is the plural of "woman"?', options: ['womans', 'womens', 'women', 'woemn'], correct: 2, explanation: '"Woman" → "women" (irregular plural).' },
          { id: 10, text: 'What is the plural of "leaf"?', options: ['leafs', 'leafes', 'leaves', 'leafe'], correct: 2, explanation: '-f → -ves: leaf → leaves.' },
          { id: 11, text: 'What is the plural of "mouse"?', options: ['mouses', 'mouse', 'mices', 'mice'], correct: 3, explanation: '"Mouse" → "mice" (irregular plural).' },
          { id: 12, text: 'What is the plural of "potato"?', options: ['potatos', 'potatoes', 'potatoies', 'potatoes'], correct: 1, explanation: '-o words (common vegetables): add -es.' },
          { id: 13, text: 'What is the plural of "day"?', options: ['daies', 'days', 'dayss', 'dayse'], correct: 1, explanation: 'Vowel + y → just add -s: days.' },
          { id: 14, text: 'What is the plural of "foot"?', options: ['foots', 'feets', 'feet', 'footies'], correct: 2, explanation: '"Foot" → "feet" (irregular plural).' },
          { id: 15, text: 'What is the plural of "church"?', options: ['churchs', 'churches', 'churchies', 'chruch'], correct: 1, explanation: 'Words ending in -ch take -es: churches.' },
          { id: 16, text: 'What is the plural of "half"?', options: ['halfs', 'halves', 'halfes', 'half'], correct: 1, explanation: '-f → -ves: half → halves.' },
          { id: 17, text: 'Which word has a regular plural?', options: ['man', 'child', 'book', 'tooth'], correct: 2, explanation: '"Book" → "books" (regular, add -s).' },
          { id: 18, text: 'What is the plural of "baby"?', options: ['babys', 'babies', 'babyes', 'baby'], correct: 1, explanation: 'Consonant + y → ies: baby → babies.' },
          { id: 19, text: 'What is the plural of "country"?', options: ['countrys', 'countries', 'countryies', 'country'], correct: 1, explanation: 'Consonant + y → ies: country → countries.' },
          { id: 20, text: 'What is the plural of "goose"?', options: ['gooses', 'geeses', 'goose', 'geese'], correct: 3, explanation: '"Goose" → "geese" (irregular plural).' },
          { id: 21, text: 'What is the plural of "dish"?', options: ['dishs', 'dishes', 'dishies', 'dishe'], correct: 1, explanation: 'Words ending in -sh take -es: dishes.' },
          { id: 22, text: 'What is the plural of "wife"?', options: ['wifes', 'wifes', 'wives', 'wifish'], correct: 2, explanation: '-fe → -ves: wife → wives.' },
          { id: 23, text: 'What is the plural of "piano"?', options: ['pianoes', 'pianies', 'pianos', 'piano'], correct: 2, explanation: 'Musical instruments ending in -o: add -s only.' },
          { id: 24, text: 'Which plural is WRONG?', options: ['cats', 'boxes', 'citys', 'leaves'], correct: 2, explanation: '"Citys" is wrong. Consonant + y → ies: cities.' },
          { id: 25, text: 'What is the plural of "roof"?', options: ['rooves', 'roofs', 'roofes', 'roofen'], correct: 1, explanation: '"Roof" is an exception: roofs (not rooves).' },
          { id: 26, text: 'What is the plural of "tax"?', options: ['taxs', 'tax', 'taxes', 'taxies'], correct: 2, explanation: 'Words ending in -x take -es: taxes.' },
          { id: 27, text: 'What is the plural of "tomato"?', options: ['tomatos', 'tomatoes', 'tomatoes', 'tomatoies'], correct: 1, explanation: 'Vegetables ending in -o: add -es.' },
          { id: 28, text: 'What is the plural of "key"?', options: ['keies', 'keyes', 'keys', 'keyse'], correct: 2, explanation: 'Vowel + y → add -s: keys.' },
          { id: 29, text: 'Which word does NOT change in plural?', options: ['book', 'child', 'sheep', 'city'], correct: 2, explanation: '"Sheep" is the same in singular and plural (zero plural).' },
          { id: 30, text: 'What is the plural of "person"?', options: ['persons', 'peoples', 'people', 'Both persons and people are correct'], correct: 3, explanation: 'Both "persons" (formal) and "people" are acceptable plurals.' },
        ],
        fillBlanks: [
          { id: 1, text: 'What is the plural of "city"?', options: ['citys', 'cities', 'cityes', 'city'], correct: 1, explanation: 'Consonant + y → ies: city → cities.' },
          { id: 2, text: 'What is the plural of "child"?', options: ['childs', 'children', 'childes', 'childre'], correct: 1, explanation: 'Irregular plural: child → children.' },
          { id: 3, text: 'What is the plural of "knife"?', options: ['knifes', 'knifes', 'knives', 'knife'], correct: 2, explanation: '-fe → -ves: knife → knives.' },
          { id: 4, text: 'What is the plural of "tooth"?', options: ['tooths', 'teeth', 'teeths', 'toothes'], correct: 1, explanation: 'Irregular: tooth → teeth.' },
          { id: 5, text: 'What is the plural of "man"?', options: ['mans', 'manes', 'men', 'mene'], correct: 2, explanation: 'Irregular: man → men.' },
          { id: 6, text: 'What is the plural of "bus"?', options: ['buss', 'buses', 'busies', 'buse'], correct: 1, explanation: '-s/-ss → -es: bus → buses.' },
          { id: 7, text: 'What is the plural of "woman"?', options: ['womans', 'womens', 'women', 'woemn'], correct: 2, explanation: 'Irregular: woman → women.' },
          { id: 8, text: 'What is the plural of "leaf"?', options: ['leafs', 'leafes', 'leaves', 'leafe'], correct: 2, explanation: '-f → -ves: leaf → leaves.' },
          { id: 9, text: 'What is the plural of "baby"?', options: ['babys', 'babies', 'babyes', 'baby'], correct: 1, explanation: 'Consonant + y → ies: baby → babies.' },
          { id: 10, text: 'What is the plural of "box"?', options: ['boxs', 'boxes', 'boxxes', 'boxies'], correct: 1, explanation: '-x → -es: box → boxes.' },
          { id: 11, text: 'What is the plural of "foot"?', options: ['foots', 'feets', 'feet', 'footies'], correct: 2, explanation: 'Irregular: foot → feet.' },
          { id: 12, text: 'What is the plural of "mouse"?', options: ['mouses', 'mouse', 'mices', 'mice'], correct: 3, explanation: 'Irregular: mouse → mice.' },
          { id: 13, text: 'What is the plural of "church"?', options: ['churchs', 'churches', 'churchies', 'chruch'], correct: 1, explanation: '-ch → -es: church → churches.' },
          { id: 14, text: 'What is the plural of "photo"?', options: ['photoes', 'photoss', 'photos', 'photies'], correct: 2, explanation: 'photo → photos (just add -s).' },
          { id: 15, text: 'What is the plural of "goose"?', options: ['gooses', 'geeses', 'goose', 'geese'], correct: 3, explanation: 'Irregular: goose → geese.' },
          { id: 16, text: 'What is the plural of "dish"?', options: ['dishs', 'dishes', 'dishies', 'dishe'], correct: 1, explanation: '-sh → -es: dish → dishes.' },
          { id: 17, text: 'What is the plural of "piano"?', options: ['pianoes', 'pianies', 'pianos', 'piano'], correct: 2, explanation: 'Musical instruments -o → just add -s: pianos.' },
          { id: 18, text: 'What is the plural of "country"?', options: ['countrys', 'countries', 'countryies', 'country'], correct: 1, explanation: 'Consonant + y → ies: country → countries.' },
          { id: 19, text: 'What is the plural of "half"?', options: ['halfs', 'halves', 'halfes', 'half'], correct: 1, explanation: '-f → -ves: half → halves.' },
          { id: 20, text: 'What is the plural of "person"?', options: ['persons', 'peoples', 'people', 'Both persons and people are correct'], correct: 3, explanation: 'Both "persons" (formal) and "people" are acceptable.' },
        ],
        scrambled: [
          { id: 1, words: ['three', 'in', 'are', 'there', 'class', 'our', 'cities'], answer: 'There are three cities in our class.', explanation: 'Plural noun + correct verb.' },
          { id: 2, words: ['the', 'children', 'are', 'happy'], answer: 'The children are happy.', explanation: 'Irregular plural: children (not childs).' },
          { id: 3, words: ['knives', 'the', 'are', 'on', 'table', 'the', 'sharp'], answer: 'The knives are sharp on the table.', explanation: 'knife → knives (-fe → -ves).' },
          { id: 4, words: ['teeth', 'her', 'are', 'white', 'very'], answer: 'Her teeth are very white.', explanation: 'Irregular: tooth → teeth.' },
          { id: 5, words: ['men', 'at', 'the', 'are', 'tall', 'gym', 'the'], answer: 'The tall men are at the gym.', explanation: 'Irregular: man → men.' },
          { id: 6, words: ['two', 'there', 'are', 'buses', 'stop', 'at', 'the'], answer: 'There are two buses at the stop.', explanation: 'bus → buses (-es).' },
          { id: 7, words: ['women', 'are', 'the', 'doctors', 'two'], answer: 'The two women are doctors.', explanation: 'Irregular: woman → women.' },
          { id: 8, words: ['leaves', 'falling', 'from', 'are', 'the', 'trees', 'the'], answer: 'The leaves are falling from the trees.', explanation: 'leaf → leaves (-f → -ves).' },
          { id: 9, words: ['three', 'are', 'there', 'babies', 'room', 'in', 'the'], answer: 'There are three babies in the room.', explanation: 'baby → babies (-y → -ies).' },
          { id: 10, words: ['the', 'boxes', 'are', 'very', 'heavy'], answer: 'The boxes are very heavy.', explanation: 'box → boxes (-x → -es).' },
          { id: 11, words: ['feet', 'my', 'after', 'hurt', 'walk', 'the', 'long'], answer: 'My feet hurt after the long walk.', explanation: 'Irregular: foot → feet.' },
          { id: 12, words: ['mice', 'in', 'are', 'there', 'kitchen', 'the'], answer: 'There are mice in the kitchen.', explanation: 'Irregular: mouse → mice.' },
          { id: 13, words: ['the', 'churches', 'city', 'in', 'are', 'beautiful', 'this'], answer: 'The churches in this city are beautiful.', explanation: 'church → churches (-ch + es).' },
          { id: 14, words: ['photos', 'on', 'shared', 'she', 'her', 'phone', 'the'], answer: 'She shared the photos on her phone.', explanation: 'photo → photos (add -s).' },
          { id: 15, words: ['geese', 'are', 'in', 'there', 'pond', 'the'], answer: 'There are geese in the pond.', explanation: 'Irregular: goose → geese.' },
          { id: 16, words: ['dishes', 'to', 'have', 'I', 'do', 'the'], answer: 'I have to do the dishes.', explanation: 'dish → dishes (-sh + es).' },
          { id: 17, words: ['pianos', 'there', 'are', 'two', 'in', 'hall', 'the'], answer: 'There are two pianos in the hall.', explanation: 'piano → pianos (add -s).' },
          { id: 18, words: ['visited', 'we', 'five', 'countries', 'summer', 'last'], answer: 'We visited five countries last summer.', explanation: 'country → countries (-y → -ies).' },
          { id: 19, words: ['halves', 'cut', 'the', 'two', 'into', 'orange', 'the'], answer: 'Cut the orange into two halves.', explanation: 'half → halves (-f → -ves).' },
          { id: 20, words: ['people', 'many', 'are', 'there', 'in', 'park', 'the'], answer: 'There are many people in the park.', explanation: 'person → people (common irregular plural).' },
        ],
        errorCorrection: [
          { id: 1, text: 'The childs are playing in the park.', options: ['The childs', 'are playing', 'in the park', 'No error'], correct: 0, wrongPart: 'The childs', correction: 'The children', explanation: 'Irregular plural: child → children.' },
          { id: 2, text: 'She has two tooths.', options: ['She has', 'two', 'tooths', 'No error'], correct: 2, wrongPart: 'tooths', correction: 'teeth', explanation: 'Irregular plural: tooth → teeth.' },
          { id: 3, text: 'The knifes are on the table.', options: ['The knifes', 'are', 'on the table', 'No error'], correct: 0, wrongPart: 'The knifes', correction: 'The knives', explanation: '-fe → -ves: knife → knives.' },
          { id: 4, text: 'There are three mans in the room.', options: ['There are', 'three mans', 'in the room', 'No error'], correct: 1, wrongPart: 'three mans', correction: 'three men', explanation: 'Irregular plural: man → men.' },
          { id: 5, text: 'I need two boxs for the books.', options: ['I need', 'two boxs', 'for the books', 'No error'], correct: 1, wrongPart: 'two boxs', correction: 'two boxes', explanation: '-x → -es: box → boxes.' },
          { id: 6, text: 'The leafs are falling from the trees.', options: ['The leafs', 'are falling', 'from the trees', 'No error'], correct: 0, wrongPart: 'The leafs', correction: 'The leaves', explanation: '-f → -ves: leaf → leaves.' },
          { id: 7, text: 'She has three babys at home.', options: ['She has', 'three babys', 'at home', 'No error'], correct: 1, wrongPart: 'three babys', correction: 'three babies', explanation: 'Consonant + y → ies: baby → babies.' },
          { id: 8, text: 'The foots are hurting after the race.', options: ['The foots', 'are hurting', 'after the race', 'No error'], correct: 0, wrongPart: 'The foots', correction: 'The feet', explanation: 'Irregular plural: foot → feet.' },
          { id: 9, text: 'There are two womans in the office.', options: ['There are', 'two womans', 'in the office', 'No error'], correct: 1, wrongPart: 'two womans', correction: 'two women', explanation: 'Irregular plural: woman → women.' },
          { id: 10, text: 'The mouses ran into the kitchen.', options: ['The mouses', 'ran', 'into the kitchen', 'No error'], correct: 0, wrongPart: 'The mouses', correction: 'The mice', explanation: 'Irregular plural: mouse → mice.' },
          { id: 11, text: 'We visited three countryes last summer.', options: ['We visited', 'three countryes', 'last summer', 'No error'], correct: 1, wrongPart: 'three countryes', correction: 'three countries', explanation: 'Consonant + y → ies: country → countries.' },
          { id: 12, text: 'The churches are very old.', options: ['The churches', 'are', 'very old', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — church → churches is correct.' },
          { id: 13, text: 'There are five gooses in the pond.', options: ['There are', 'five gooses', 'in the pond', 'No error'], correct: 1, wrongPart: 'five gooses', correction: 'five geese', explanation: 'Irregular plural: goose → geese.' },
          { id: 14, text: 'She has three pianos in her studio.', options: ['She has', 'three pianos', 'in her studio', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — piano → pianos is correct.' },
          { id: 15, text: 'He cut the apple into two halfes.', options: ['He cut', 'the apple', 'two halfes', 'No error'], correct: 2, wrongPart: 'two halfes', correction: 'two halves', explanation: '-f → -ves: half → halves.' },
          { id: 16, text: 'The dishes are on the counter.', options: ['The dishes', 'are', 'on the counter', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — dish → dishes is correct.' },
          { id: 17, text: 'She took beautiful photos at the wedding.', options: ['She took', 'beautiful photos', 'at the wedding', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — photo → photos is correct.' },
          { id: 18, text: 'The wifes are waiting outside.', options: ['The wifes', 'are waiting', 'outside', 'No error'], correct: 0, wrongPart: 'The wifes', correction: 'The wives', explanation: '-fe → -ves: wife → wives.' },
          { id: 19, text: 'There are many peoples in the stadium.', options: ['There are', 'many peoples', 'in the stadium', 'No error'], correct: 1, wrongPart: 'many peoples', correction: 'many people', explanation: '"People" is already plural. "Peoples" is only used for different nations.' },
          { id: 20, text: 'The children played happily in the garden.', options: ['The children', 'played happily', 'in the garden', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "children" is the correct plural of "child".' },
        ],
        transform: [
          { id: 1, text: 'Change to plural: "The child is happy."', options: ['The childs are happy.', 'The childrens are happy.', 'The children are happy.', 'The children is happy.'], correct: 2, explanation: 'Irregular plural: child → children; verb changes: is → are.' },
          { id: 2, text: 'Change to plural: "The tooth is white."', options: ['The tooths are white.', 'The teeth are white.', 'The teeths are white.', 'The teeth is white.'], correct: 1, explanation: 'Irregular plural: tooth → teeth; is → are.' },
          { id: 3, text: 'Change to plural: "The knife is sharp."', options: ['The knifes are sharp.', 'The knives is sharp.', 'The knives are sharp.', 'The knifes is sharp.'], correct: 2, explanation: '-fe → -ves: knife → knives; is → are.' },
          { id: 4, text: 'Change to plural: "A man is waiting."', options: ['A mans are waiting.', 'The mens are waiting.', 'The men are waiting.', 'Men is waiting.'], correct: 2, explanation: 'Irregular: man → men; is → are.' },
          { id: 5, text: 'Change to plural: "The bus is late."', options: ['The buss are late.', 'The busies are late.', 'The buses are late.', 'The buses is late.'], correct: 2, explanation: 'bus → buses; is → are.' },
          { id: 6, text: 'Change to plural: "The leaf is green."', options: ['The leafs are green.', 'The leaves are green.', 'The leafes are green.', 'The leaves is green.'], correct: 1, explanation: 'leaf → leaves; is → are.' },
          { id: 7, text: 'Change to plural: "The baby is crying."', options: ['The babys are crying.', 'The babies is crying.', 'The babies are crying.', 'The babyes are crying.'], correct: 2, explanation: 'baby → babies; is → are.' },
          { id: 8, text: 'Change to plural: "My foot is sore."', options: ['My foots are sore.', 'My feets are sore.', 'My feet is sore.', 'My feet are sore.'], correct: 3, explanation: 'Irregular: foot → feet; is → are.' },
          { id: 9, text: 'Change to plural: "The woman works here."', options: ['The womans work here.', 'The womens work here.', 'The women work here.', 'The woman work here.'], correct: 2, explanation: 'Irregular: woman → women; verb changes.' },
          { id: 10, text: 'Change to plural: "The mouse is small."', options: ['The mouses are small.', 'The mice are small.', 'The mouse are small.', 'The mices are small.'], correct: 1, explanation: 'Irregular: mouse → mice; is → are.' },
          { id: 11, text: 'Change to plural: "The city is beautiful."', options: ['The citys are beautiful.', 'The cityes are beautiful.', 'The cities are beautiful.', 'The cities is beautiful.'], correct: 2, explanation: 'city → cities; is → are.' },
          { id: 12, text: 'Change to plural: "The country has mountains."', options: ['The countrys have mountains.', 'The countries has mountains.', 'The countries have mountains.', 'The countryes have mountains.'], correct: 2, explanation: 'country → countries; has → have.' },
          { id: 13, text: 'Change to plural: "The church is old."', options: ['The churchs are old.', 'The churches is old.', 'The churches are old.', 'The churchies are old.'], correct: 2, explanation: 'church → churches; is → are.' },
          { id: 14, text: 'Change to plural: "The goose is white."', options: ['The gooses are white.', 'The geese are white.', 'The geeses are white.', 'The geese is white.'], correct: 1, explanation: 'Irregular: goose → geese; is → are.' },
          { id: 15, text: 'Change to plural: "The dish is clean."', options: ['The dishs are clean.', 'The dishes are clean.', 'The dishies are clean.', 'The dishes is clean.'], correct: 1, explanation: 'dish → dishes; is → are.' },
          { id: 16, text: 'Change to plural: "The half is big."', options: ['The halfs are big.', 'The halves are big.', 'The halfes are big.', 'The halves is big.'], correct: 1, explanation: 'half → halves; is → are.' },
          { id: 17, text: 'Change to plural: "The photo is beautiful."', options: ['The photoes are beautiful.', 'The photos is beautiful.', 'The photos are beautiful.', 'The photies are beautiful.'], correct: 2, explanation: 'photo → photos; is → are.' },
          { id: 18, text: 'Change to plural: "The piano is expensive."', options: ['The pianoes are expensive.', 'The pianos are expensive.', 'The pianies are expensive.', 'The pianos is expensive.'], correct: 1, explanation: 'piano → pianos; is → are.' },
          { id: 19, text: 'Change to plural: "The person is tall."', options: ['The persons are tall.', 'The peoples are tall.', 'The people are tall.', 'Both A and C are correct'], correct: 3, explanation: 'Both "persons" and "people" are correct plurals of "person".' },
          { id: 20, text: 'Change to plural: "The key is on the table."', options: ['The keies are on the table.', 'The keys is on the table.', 'The keys are on the table.', 'The keyes are on the table.'], correct: 2, explanation: 'Vowel + y: key → keys (just add -s); is → are.' },
        ],
        dialogue: [
          { id: 1, situation: 'A child tells their parent about classmates.', dialogue: 'A: How many children are in your class?\nB: There are 30 ___!', options: ['childs', 'childrens', 'children', 'childes'], correct: 2, explanation: 'Irregular plural: child → children.' },
          { id: 2, situation: 'A dentist asks a patient about their teeth.', dialogue: 'A: How are your ___ feeling today?\nB: A bit sore, actually.', options: ['tooths', 'teeths', 'teeth', 'toothes'], correct: 2, explanation: 'Irregular plural: tooth → teeth.' },
          { id: 3, situation: 'Someone is setting the table for dinner.', dialogue: 'A: Can you pass me the ___?\nB: Sure! Here they are.', options: ['knifes', 'knives', 'knifes', 'knife'], correct: 1, explanation: '-fe → -ves: knife → knives.' },
          { id: 4, situation: 'You see a group of male friends.', dialogue: 'A: Who are those people?\nB: They are the ___ from the football team.', options: ['mans', 'manes', 'men', 'mene'], correct: 2, explanation: 'Irregular plural: man → men.' },
          { id: 5, situation: 'A mechanic is explaining a problem.', dialogue: 'A: Why are you late?\nB: Sorry, both ___ were stuck in traffic!', options: ['buss', 'busies', 'buses', 'buse'], correct: 2, explanation: 'bus → buses (-es added).' },
          { id: 6, situation: 'Someone describes autumn weather.', dialogue: 'A: The ___ look beautiful in autumn.\nB: Yes, they turn orange and red!', options: ['leafs', 'leafes', 'leaves', 'leafe'], correct: 2, explanation: '-f → -ves: leaf → leaves.' },
          { id: 7, situation: 'A nurse talks about new patients.', dialogue: 'A: We have three ___ in the nursery today.\nB: Oh, how lovely!', options: ['babys', 'babyes', 'babies', 'baby'], correct: 2, explanation: 'Consonant + y → ies: baby → babies.' },
          { id: 8, situation: 'Someone complains after a long walk.', dialogue: 'A: My ___ are killing me!\nB: Let\'s sit down and rest.', options: ['foots', 'feets', 'feet', 'footies'], correct: 2, explanation: 'Irregular plural: foot → feet.' },
          { id: 9, situation: 'At a meeting, someone counts attendees.', dialogue: 'A: How many ___ are in the meeting?\nB: There are five women and three men.', options: ['womans', 'womens', 'women', 'woments'], correct: 2, explanation: 'Irregular plural: woman → women.' },
          { id: 10, situation: 'Someone reports a problem in the warehouse.', dialogue: 'A: The ___ got into the food storage!\nB: We need to call an exterminator.', options: ['mouses', 'mouse', 'mices', 'mice'], correct: 3, explanation: 'Irregular plural: mouse → mice.' },
          { id: 11, situation: 'A travel agent talks about tours.', dialogue: 'A: Our package includes visits to five ___!\nB: Wonderful! Which ones?', options: ['countrys', 'countries', 'countryies', 'country'], correct: 1, explanation: 'country → countries (-y → -ies).' },
          { id: 12, situation: 'A tour guide describes the area.', dialogue: 'A: There are three beautiful ___ in this old town.\nB: I\'d love to visit them!', options: ['churchs', 'churches', 'churchies', 'chruchs'], correct: 1, explanation: 'church → churches (-ch + es).' },
          { id: 13, situation: 'A bird watcher talks to a friend.', dialogue: 'A: Look at those ___!\nB: Yes, there must be 20 of them in the pond!', options: ['gooses', 'geeses', 'goose', 'geese'], correct: 3, explanation: 'Irregular plural: goose → geese.' },
          { id: 14, situation: 'Someone describes a music room.', dialogue: 'A: How many ___ are in the music hall?\nB: There are four!', options: ['pianoes', 'pianies', 'pianos', 'piano'], correct: 2, explanation: 'piano → pianos (just -s).' },
          { id: 15, situation: 'A chef explains how to serve the cake.', dialogue: 'A: Cut the cake into two ___!\nB: OK, I\'ll get a knife.', options: ['halfs', 'halves', 'halfes', 'half'], correct: 1, explanation: '-f → -ves: half → halves.' },
          { id: 16, situation: 'A kitchen helper is doing dishes.', dialogue: 'A: Can you wash these ___ please?\nB: Sure, no problem!', options: ['dishs', 'dishe', 'dishes', 'dishies'], correct: 2, explanation: 'dish → dishes (-sh + es).' },
          { id: 17, situation: 'You are looking at someone\'s photo album.', dialogue: 'A: These ___ are amazing!\nB: Thank you! I took them at the festival.', options: ['photoes', 'photoss', 'photos', 'photies'], correct: 2, explanation: 'photo → photos (add -s).' },
          { id: 18, situation: 'A teacher discusses grammar rules.', dialogue: 'A: Some ___ like "box" become "boxes" by adding -es.\nB: I see! So box → boxes.', options: ['word', 'words', 'wordes', 'wordes'], correct: 1, explanation: 'Regular plural: word → words (add -s).' },
          { id: 19, situation: 'A trainer talks about the class participants.', dialogue: 'A: There are ten ___ in the yoga class today.\nB: That\'s a full house!', options: ['persons', 'peoples', 'people', 'Both A and C are correct'], correct: 3, explanation: 'Both "persons" and "people" are acceptable plurals of "person".' },
          { id: 20, situation: 'A journalist covers a story about wolves.', dialogue: 'A: Scientists found ___ near the village.\nB: Are they dangerous?', options: ['wolfs', 'wolfes', 'wolves', 'wolve'], correct: 2, explanation: '-f → -ves: wolf → wolves.' },
        ],
      },
      {
        id: 'always-plurals',
        title: 'Always Plurals',
        icon: '👓',
        guide: `## Doim Ko'plikda Ishlatiladigan Otlar (Always Plural Nouns)

Ba'zi ingliz otlari har doim ko'plik shaklida ishlatiladi, birok ularning yagona ma'nosi bo'ladi.

## Kiyim-kechak (Clothes)
• trousers (shim) — a pair of trousers
• jeans (jinsi shim) — a pair of jeans
• shorts (shortlar)
• tights (kolgotkalar)
• pyjamas (pijama)

## Ko'zgu / asboblar
• glasses/spectacles (ko'zoynaklar)
• binoculars (durbin)
• scissors (qaychi)
• pliers (keski)
• tweezers (qisqich)

## Boshqa otlar
• trousers, jeans, shorts — juftlik
• scales (tarozi) — pairs
• headphones (quloqchinlar)

## Fe'l mosligi
Bu otlar har doim ko'plik fe'l bilan keladi:
• My glasses are on the table. (Ko'zoynaklarim stol ustida.)
• These scissors are very sharp. (Bu qaychi juda o'tkir.)
• Your trousers are dirty. (Shimingiz iflos.)

## "A pair of" ishlatilishi
Bitta ob'ektni aytganda "a pair of" ishlatiladi:
• I need a pair of scissors. (Menga bitta qaychi kerak.)
• She bought a pair of jeans. (U bitta jinsi shim sotib oldi.)`,
        questions: [
          { id: 1, text: 'My glasses ___ on the table.', options: ['is', 'was', 'are', 'has'], correct: 2, explanation: '"Glasses" is always plural → "are".' },
          { id: 2, text: 'These scissors ___ very sharp.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Scissors" is always plural → "are".' },
          { id: 3, text: 'Your jeans ___ in the washing machine.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Jeans" is always plural → "are".' },
          { id: 4, text: 'Which sentence is correct?', options: ['My trousers is dirty.', 'My trouser are dirty.', 'My trousers are dirty.', 'My trousers have dirty.'], correct: 2, explanation: '"Trousers" is always plural → "are".' },
          { id: 5, text: 'The binoculars ___ very powerful.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Binoculars" (durbin) is always plural → "are".' },
          { id: 6, text: 'How do you say "bitta qaychi" in English?', options: ['A scissor', 'A scissors', 'A pair of scissors', 'One scissors'], correct: 2, explanation: '"A pair of scissors" is the correct way to say one scissor.' },
          { id: 7, text: 'Her shorts ___ too big for her.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Shorts" → always plural → "are".' },
          { id: 8, text: 'Which word is NOT always plural?', options: ['scissors', 'trousers', 'glasses', 'shoe'], correct: 3, explanation: '"Shoe" has a regular plural: shoes.' },
          { id: 9, text: 'The police ___ investigating the crime.', options: ['is', 'are', 'was', 'have'], correct: 1, explanation: '"Police" is a collective noun treated as plural.' },
          { id: 10, text: 'His pyjamas ___ on the bed.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Pyjamas" → always plural → "are".' },
          { id: 11, text: 'I need ___ scissors, not two pairs.', options: ['a scissor', 'a pair of', 'one scissor', 'the scissor'], correct: 1, explanation: '"A pair of scissors" means one scissor tool.' },
          { id: 12, text: 'These tights ___ too small.', options: ['is', 'are', 'was', 'does'], correct: 1, explanation: '"Tights" (kolgotkalar) → always plural → "are".' },
          { id: 13, text: 'Always-plural nouns take ___ verb form.', options: ['singular', 'plural', 'either', 'no'], correct: 1, explanation: 'Always-plural nouns always take a plural verb.' },
          { id: 14, text: 'Which sentence is WRONG?', options: ['My glasses are broken.', 'The scissors are dull.', 'The jeans is too tight.', 'Her tights are torn.'], correct: 2, explanation: '"Jeans" is plural: "are", not "is".' },
          { id: 15, text: 'The headphones ___ not working.', options: ['is', 'are', 'was', 'does'], correct: 1, explanation: '"Headphones" → always plural → "are".' },
          { id: 16, text: 'She bought ___ jeans at the mall.', options: ['a jeans', 'a pair of', 'one jean', 'a piece of'], correct: 1, explanation: '"A pair of jeans" = one jeans.' },
          { id: 17, text: 'Your pliers ___ in the toolbox.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Pliers" (keski) → always plural → "are".' },
          { id: 18, text: 'The news ___ surprising. (correct form?)', options: ['are', 'is', 'were', 'have been'], correct: 1, explanation: '"News" looks plural but is singular → "is".' },
          { id: 19, text: 'His glasses ___ very expensive.', options: ['is', 'are', 'was', 'costs'], correct: 1, explanation: '"Glasses" → always plural → "are".' },
          { id: 20, text: 'Which word is always plural?', options: ['fish', 'sheep', 'scissors', 'information'], correct: 2, explanation: '"Scissors" is always used in the plural form.' },
          { id: 21, text: 'The tweezers ___ on the counter.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Tweezers" → always plural → "are".' },
          { id: 22, text: '"Mathematics is a difficult subject." Is this correct?', options: ['No — should be "are"', 'Yes — it is correct', 'No — should be "Mathematics are"', 'It depends on context'], correct: 1, explanation: 'Subjects like "mathematics, economics, physics" use singular verbs.' },
          { id: 23, text: 'My shorts ___ in the laundry.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Shorts" → always plural → "are".' },
          { id: 24, text: 'These ___ are mine. (glasses)', options: ['glasses is', 'glass are', 'glasses are', 'glass is'], correct: 2, explanation: '"Glasses are" — plural noun + plural verb.' },
          { id: 25, text: 'Which always-plural noun has a "pair of" counterpart?', options: ['water', 'music', 'jeans', 'information'], correct: 2, explanation: '"A pair of jeans" — jeans has a pair of equivalent.' },
          { id: 26, text: 'The scissors ___ on the desk.', options: ['is', 'are', 'was', 'belongs'], correct: 1, explanation: '"Scissors" → always plural → "are".' },
          { id: 27, text: 'Can you pass me the ___? (qaychi)', options: ['scissor', 'a scissor', 'scissors', 'scissoring'], correct: 2, explanation: '"Scissors" — no singular form in common use.' },
          { id: 28, text: 'Her new trousers ___ really stylish.', options: ['is', 'are', 'looks', 'was'], correct: 1, explanation: '"Trousers" → always plural → "are".' },
          { id: 29, text: 'I lost my ___. (ko\'zoynaklar)', options: ['glass', 'a glass', 'glasses', 'glasse'], correct: 2, explanation: '"Glasses" — the standard word for eyeglasses (always plural).' },
          { id: 30, text: 'Which of these is a correct sentence?', options: ['Scissors is sharp.', 'A scissors is sharp.', 'The scissors are sharp.', 'The scissor is sharp.'], correct: 2, explanation: '"The scissors are sharp." — correct plural form.' },
        ],
        fillBlanks: [
          { id: 1, text: 'My glasses ___ on the table.', options: ['is', 'was', 'are', 'has'], correct: 2, explanation: '"Glasses" is always plural → are.' },
          { id: 2, text: 'These scissors ___ very sharp.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Scissors" is always plural → are.' },
          { id: 3, text: 'Your jeans ___ in the washing machine.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Jeans" is always plural → are.' },
          { id: 4, text: 'The binoculars ___ very powerful.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Binoculars" is always plural → are.' },
          { id: 5, text: 'Her shorts ___ too big for her.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Shorts" is always plural → are.' },
          { id: 6, text: 'His pyjamas ___ on the bed.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Pyjamas" is always plural → are.' },
          { id: 7, text: 'These tights ___ too small.', options: ['is', 'are', 'was', 'does'], correct: 1, explanation: '"Tights" is always plural → are.' },
          { id: 8, text: 'The headphones ___ not working.', options: ['is', 'are', 'was', 'does'], correct: 1, explanation: '"Headphones" is always plural → are.' },
          { id: 9, text: 'Your pliers ___ in the toolbox.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Pliers" is always plural → are.' },
          { id: 10, text: 'His glasses ___ very expensive.', options: ['is', 'are', 'was', 'costs'], correct: 1, explanation: '"Glasses" is always plural → are.' },
          { id: 11, text: 'The tweezers ___ on the counter.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Tweezers" is always plural → are.' },
          { id: 12, text: 'My shorts ___ in the laundry.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Shorts" is always plural → are.' },
          { id: 13, text: 'She bought ___ jeans at the mall.', options: ['a jeans', 'a pair of', 'one jean', 'a piece of'], correct: 1, explanation: 'Use "a pair of" to refer to one item of always-plural nouns.' },
          { id: 14, text: 'I need ___ scissors, please.', options: ['a scissor', 'a pair of', 'one scissor', 'the scissor'], correct: 1, explanation: '"A pair of scissors" means one scissor tool.' },
          { id: 15, text: 'The scissors ___ on the desk.', options: ['is', 'are', 'was', 'belongs'], correct: 1, explanation: '"Scissors" is always plural → are.' },
          { id: 16, text: 'Her new trousers ___ really stylish.', options: ['is', 'are', 'looks', 'was'], correct: 1, explanation: '"Trousers" is always plural → are.' },
          { id: 17, text: 'I lost my ___. (ko\'zoynaklar)', options: ['glass', 'a glass', 'glasses', 'glasse'], correct: 2, explanation: '"Glasses" = eyeglasses (always plural).' },
          { id: 18, text: 'The police ___ investigating the crime.', options: ['is', 'are', 'was', 'have'], correct: 1, explanation: '"Police" is collective and used as plural.' },
          { id: 19, text: 'Can you pass me the ___? (qaychi)', options: ['scissor', 'a scissor', 'scissors', 'scissoring'], correct: 2, explanation: '"Scissors" has no singular form in common use.' },
          { id: 20, text: 'These ___ are mine. (glasses)', options: ['glasses is', 'glass are', 'glasses are', 'glass is'], correct: 2, explanation: '"Glasses are" — plural noun + plural verb.' },
        ],
        scrambled: [
          { id: 1, words: ['my', 'table', 'on', 'glasses', 'are', 'the'], answer: 'My glasses are on the table.', explanation: '"Glasses" = always plural → are.' },
          { id: 2, words: ['scissors', 'sharp', 'these', 'very', 'are'], answer: 'These scissors are very sharp.', explanation: '"Scissors" = always plural → are.' },
          { id: 3, words: ['jeans', 'your', 'machine', 'washing', 'in', 'are', 'the'], answer: 'Your jeans are in the washing machine.', explanation: '"Jeans" = always plural → are.' },
          { id: 4, words: ['a', 'of', 'scissors', 'pair', 'I', 'need'], answer: 'I need a pair of scissors.', explanation: 'Use "a pair of" with always-plural nouns.' },
          { id: 5, words: ['are', 'trousers', 'my', 'dirty'], answer: 'My trousers are dirty.', explanation: '"Trousers" = always plural → are.' },
          { id: 6, words: ['the', 'binoculars', 'very', 'are', 'powerful'], answer: 'The binoculars are very powerful.', explanation: '"Binoculars" = always plural → are.' },
          { id: 7, words: ['her', 'big', 'shorts', 'too', 'are'], answer: 'Her shorts are too big.', explanation: '"Shorts" = always plural → are.' },
          { id: 8, words: ['working', 'headphones', 'not', 'are', 'the'], answer: 'The headphones are not working.', explanation: '"Headphones" = always plural → are.' },
          { id: 9, words: ['of', 'jeans', 'she', 'a', 'bought', 'pair'], answer: 'She bought a pair of jeans.', explanation: '"A pair of jeans" = one pair.' },
          { id: 10, words: ['glasses', 'his', 'expensive', 'very', 'are'], answer: 'His glasses are very expensive.', explanation: '"Glasses" = always plural → are.' },
          { id: 11, words: ['are', 'tights', 'these', 'small', 'too'], answer: 'These tights are too small.', explanation: '"Tights" = always plural → are.' },
          { id: 12, words: ['on', 'counter', 'the', 'tweezers', 'are', 'the'], answer: 'The tweezers are on the counter.', explanation: '"Tweezers" = always plural → are.' },
          { id: 13, words: ['broken', 'are', 'glasses', 'my'], answer: 'My glasses are broken.', explanation: '"Glasses" = always plural → are.' },
          { id: 14, words: ['stylish', 'trousers', 'very', 'her', 'are', 'new'], answer: 'Her new trousers are very stylish.', explanation: '"Trousers" = always plural.' },
          { id: 15, words: ['pliers', 'toolbox', 'the', 'in', 'are'], answer: 'The pliers are in the toolbox.', explanation: '"Pliers" = always plural → are.' },
          { id: 16, words: ['of', 'trousers', 'I', 'need', 'a', 'pair'], answer: 'I need a pair of trousers.', explanation: 'Use "a pair of" with always-plural nouns.' },
          { id: 17, words: ['are', 'in', 'pyjamas', 'his', 'the', 'wardrobe'], answer: 'His pyjamas are in the wardrobe.', explanation: '"Pyjamas" = always plural → are.' },
          { id: 18, words: ['crime', 'the', 'police', 'investigating', 'are', 'the'], answer: 'The police are investigating the crime.', explanation: '"Police" is treated as plural.' },
          { id: 19, words: ['sharp', 'are', 'scissors', 'the'], answer: 'The scissors are sharp.', explanation: '"Scissors" = always plural → are.' },
          { id: 20, words: ['me', 'can', 'pass', 'you', 'scissors', 'the'], answer: 'Can you pass me the scissors?', explanation: '"Scissors" = always plural, no singular form.' },
        ],
        errorCorrection: [
          { id: 1, text: 'My glasses is on the table.', options: ['My glasses', 'is', 'on the table', 'No error'], correct: 1, wrongPart: 'is', correction: 'are', explanation: '"Glasses" is always plural → are.' },
          { id: 2, text: 'These scissor are very sharp.', options: ['These', 'scissor', 'are very sharp', 'No error'], correct: 1, wrongPart: 'scissor', correction: 'scissors', explanation: '"Scissors" has no singular form; always use "scissors".' },
          { id: 3, text: 'Your jeans is in the washing machine.', options: ['Your jeans', 'is', 'in the washing machine', 'No error'], correct: 1, wrongPart: 'is', correction: 'are', explanation: '"Jeans" is always plural → are.' },
          { id: 4, text: 'My trousers are dirty.', options: ['My trousers', 'are', 'dirty', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "trousers are" is correct.' },
          { id: 5, text: 'The binoculars is very powerful.', options: ['The binoculars', 'is', 'very powerful', 'No error'], correct: 1, wrongPart: 'is', correction: 'are', explanation: '"Binoculars" is always plural → are.' },
          { id: 6, text: 'She bought a scissor.', options: ['She bought', 'a scissor', 'No error', 'She'], correct: 1, wrongPart: 'a scissor', correction: 'a pair of scissors', explanation: 'No singular "scissor"; use "a pair of scissors".' },
          { id: 7, text: 'Her shorts are too big.', options: ['Her shorts', 'are', 'too big', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "shorts are" is correct.' },
          { id: 8, text: 'The headphones is not working.', options: ['The headphones', 'is', 'not working', 'No error'], correct: 1, wrongPart: 'is', correction: 'are', explanation: '"Headphones" is always plural → are.' },
          { id: 9, text: 'I need a pair of scissors.', options: ['I need', 'a pair of', 'scissors', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "a pair of scissors" is the correct form.' },
          { id: 10, text: 'His pyjamas is on the bed.', options: ['His pyjamas', 'is', 'on the bed', 'No error'], correct: 1, wrongPart: 'is', correction: 'are', explanation: '"Pyjamas" is always plural → are.' },
          { id: 11, text: 'The jeans are too tight.', options: ['The jeans', 'are', 'too tight', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "jeans are" is correct.' },
          { id: 12, text: 'These tights is too small.', options: ['These tights', 'is', 'too small', 'No error'], correct: 1, wrongPart: 'is', correction: 'are', explanation: '"Tights" is always plural → are.' },
          { id: 13, text: 'The tweezers are on the counter.', options: ['The tweezers', 'are', 'on the counter', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "tweezers are" is correct.' },
          { id: 14, text: 'She bought a jeans at the mall.', options: ['She bought', 'a jeans', 'at the mall', 'No error'], correct: 1, wrongPart: 'a jeans', correction: 'a pair of jeans', explanation: 'Use "a pair of jeans", not "a jeans".' },
          { id: 15, text: 'My pliers is in the toolbox.', options: ['My pliers', 'is', 'in the toolbox', 'No error'], correct: 1, wrongPart: 'is', correction: 'are', explanation: '"Pliers" is always plural → are.' },
          { id: 16, text: 'The scissors are sharp.', options: ['The scissors', 'are', 'sharp', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "scissors are" is correct.' },
          { id: 17, text: 'His glasses are expensive.', options: ['His glasses', 'are', 'expensive', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "glasses are" is correct.' },
          { id: 18, text: 'I lost my glass. (ko\'zoynaklar)', options: ['I lost', 'my glass', 'No error', 'I'], correct: 1, wrongPart: 'my glass', correction: 'my glasses', explanation: 'Eyeglasses = "glasses" (always plural).' },
          { id: 19, text: 'The police is investigating the crime.', options: ['The police', 'is', 'investigating the crime', 'No error'], correct: 1, wrongPart: 'is', correction: 'are', explanation: '"Police" is treated as plural → are.' },
          { id: 20, text: 'Her new trousers are very stylish.', options: ['Her new trousers', 'are', 'very stylish', 'No error'], correct: 3, wrongPart: '', correction: '', explanation: 'No error — "trousers are" is correct.' },
        ],
        transform: [
          { id: 1, text: 'Correct the error: "My glasses is broken."', options: ['My glasses was broken.', 'My glasses are broken.', 'My glass are broken.', 'My glass is broken.'], correct: 1, explanation: '"Glasses" = always plural → are.' },
          { id: 2, text: 'Express "one" item: How do you say one pair of scissors?', options: ['A scissor', 'One scissors', 'A pair of scissors', 'The scissors'], correct: 2, explanation: 'Use "a pair of scissors" for one item.' },
          { id: 3, text: 'Correct the error: "These jeans is too tight."', options: ['These jeans are too tight.', 'These jean are too tight.', 'This jean are too tight.', 'This jeans is too tight.'], correct: 0, explanation: '"Jeans" = always plural → are.' },
          { id: 4, text: 'Express "one" item: How do you say one pair of trousers?', options: ['A trouser', 'A pair of trousers', 'One trousers', 'The trouser'], correct: 1, explanation: 'Use "a pair of trousers" for one item.' },
          { id: 5, text: 'Correct the error: "The headphones is not working."', options: ['The headphone are not working.', 'The headphones was not working.', 'The headphones are not working.', 'The headphones is not working.'], correct: 2, explanation: '"Headphones" = always plural → are.' },
          { id: 6, text: 'Complete correctly: "She bought ___ jeans."', options: ['a', 'an', 'a pair of', 'one'], correct: 2, explanation: 'Use "a pair of" with always-plural nouns like jeans.' },
          { id: 7, text: 'Correct the error: "Her shorts is too short."', options: ['Her short is too short.', 'Her shorts are too short.', 'Her shorts was too short.', 'Her short are too short.'], correct: 1, explanation: '"Shorts" = always plural → are.' },
          { id: 8, text: 'Express "one" item: How do you say one pair of glasses?', options: ['A glass', 'One glasses', 'A pair of glasses', 'The glass'], correct: 2, explanation: 'Use "a pair of glasses" for one item.' },
          { id: 9, text: 'Correct the error: "The binoculars is very strong."', options: ['The binoculars are very strong.', 'The binocular are very strong.', 'The binoculars was very strong.', 'The binocular is very strong.'], correct: 0, explanation: '"Binoculars" = always plural → are.' },
          { id: 10, text: 'Correct: "Can you pass me a scissor?"', options: ['Can you pass me the scissor?', 'Can you pass me one scissors?', 'Can you pass me a pair of scissors?', 'Can you pass me scissor?'], correct: 2, explanation: 'No singular "scissor"; use "a pair of scissors".' },
          { id: 11, text: 'Correct the error: "The tweezers is on the counter."', options: ['The tweezer are on the counter.', 'The tweezers are on the counter.', 'The tweezers was on the counter.', 'The tweezer is on the counter.'], correct: 1, explanation: '"Tweezers" = always plural → are.' },
          { id: 12, text: 'Correct the error: "His pyjamas is on the bed."', options: ['His pyjama are on the bed.', 'His pyjamas are on the bed.', 'His pyjamas was on the bed.', 'His pyjama is on the bed.'], correct: 1, explanation: '"Pyjamas" = always plural → are.' },
          { id: 13, text: 'Complete: "My ___ are on the table." (ko\'zoynaklar)', options: ['glass', 'glasse', 'glasses', 'a glass'], correct: 2, explanation: '"Glasses" is the correct word for eyeglasses (always plural).' },
          { id: 14, text: 'Correct the error: "I lost a glasses."', options: ['I lost glasses.', 'I lost a pair of glasses.', 'I lost one glass.', 'I lost the glass.'], correct: 1, explanation: 'Use "a pair of glasses" for one item; not "a glasses".' },
          { id: 15, text: 'Correct: "The pliers is in the toolbox."', options: ['The plier are in the toolbox.', 'The pliers are in the toolbox.', 'The pliers was in the toolbox.', 'The plier is in the toolbox.'], correct: 1, explanation: '"Pliers" = always plural → are.' },
          { id: 16, text: 'Correct: "Her trousers is dirty."', options: ['Her trousers was dirty.', 'Her trouser are dirty.', 'Her trousers are dirty.', 'Her trouser is dirty.'], correct: 2, explanation: '"Trousers" = always plural → are.' },
          { id: 17, text: 'Complete: "The ___ are on the desk." (qaychi)', options: ['scissor', 'a scissor', 'scissors', 'scissoring'], correct: 2, explanation: '"Scissors" has no singular form.' },
          { id: 18, text: 'Correct: "These tights is too tight."', options: ['These tight are too tight.', 'These tights are too tight.', 'These tights was too tight.', 'This tights are too tight.'], correct: 1, explanation: '"Tights" = always plural → are.' },
          { id: 19, text: 'Correct: "The police is here."', options: ['The polices are here.', 'The police was here.', 'The police are here.', 'The policeman are here.'], correct: 2, explanation: '"Police" is always plural → are.' },
          { id: 20, text: 'Complete: "She bought ___ trousers." (one item)', options: ['a', 'an', 'a pair of', 'one'], correct: 2, explanation: 'Use "a pair of trousers" for one item.' },
        ],
        dialogue: [
          { id: 1, situation: 'You ask a friend if they have seen your eyeglasses.', dialogue: 'A: Have you seen my ___?\nB: Yes, they\'re on the kitchen table.', options: ['glass', 'a glass', 'glasses', 'glasse'], correct: 2, explanation: '"Glasses" = eyeglasses (always plural).' },
          { id: 2, situation: 'Someone needs to cut something.', dialogue: 'A: Can I borrow your ___?\nB: Sure, they\'re in the drawer.', options: ['scissor', 'a scissor', 'scissors', 'scissoring'], correct: 2, explanation: '"Scissors" = always plural. No singular form.' },
          { id: 3, situation: 'A friend asks about your new pants.', dialogue: 'A: Are those new ___?\nB: Yes! I bought them yesterday.', options: ['jean', 'jeans', 'a jean', 'jeanse'], correct: 1, explanation: '"Jeans" is always plural.' },
          { id: 4, situation: 'You notice a friend\'s clothes are untidy.', dialogue: 'A: Your ___ are very wrinkled today.\nB: I know, I forgot to iron them.', options: ['trouser', 'trousers', 'a trouser', 'trouseres'], correct: 1, explanation: '"Trousers" is always plural.' },
          { id: 5, situation: 'You ask a friend for their binoculars at a football match.', dialogue: 'A: Can I borrow your ___?\nB: Of course! Here they are.', options: ['binocular', 'binoculars', 'a binocular', 'binoculare'], correct: 1, explanation: '"Binoculars" is always plural.' },
          { id: 6, situation: 'A customer at a shop asks for one pair of scissors.', dialogue: 'A: Excuse me, I need ___ scissors.\nB: Sure! Here you go.', options: ['a scissor', 'a pair of', 'one scissor', 'the scissor'], correct: 1, explanation: 'Use "a pair of scissors" for one item.' },
          { id: 7, situation: 'A friend comments on your summer clothes.', dialogue: 'A: Your ___ look great!\nB: Thanks! They\'re new.', options: ['short', 'shorts', 'a short', 'shortes'], correct: 1, explanation: '"Shorts" is always plural.' },
          { id: 8, situation: 'You can\'t find your earphones.', dialogue: 'A: Where are my ___?\nB: Check the bag.', options: ['headphone', 'headphones', 'a headphone', 'headphonese'], correct: 1, explanation: '"Headphones" is always plural.' },
          { id: 9, situation: 'A child asks their parent about pajamas.', dialogue: 'A: Where are my ___?\nB: They\'re under your pillow!', options: ['pyjama', 'pyjamas', 'a pyjama', 'pyjamase'], correct: 1, explanation: '"Pyjamas" is always plural.' },
          { id: 10, situation: 'A friend asks you to describe something.', dialogue: 'A: What are those ___ you\'re wearing?\nB: They\'re swimming tights.', options: ['tight', 'tights', 'a tight', 'tightes'], correct: 1, explanation: '"Tights" is always plural.' },
          { id: 11, situation: 'Someone looks for tools in a workshop.', dialogue: 'A: Have you seen the ___?\nB: Yes, they\'re on the bench.', options: ['plier', 'pliers', 'a plier', 'plier\'s'], correct: 1, explanation: '"Pliers" is always plural.' },
          { id: 12, situation: 'You are packing and can\'t find tweezers.', dialogue: 'A: I can\'t find my ___.\nB: Try the bathroom cabinet!', options: ['tweezer', 'tweezers', 'a tweezer', 'tweezere'], correct: 1, explanation: '"Tweezers" is always plural.' },
          { id: 13, situation: 'A news reporter describes the scene.', dialogue: 'A: The ___ are at the scene.\nB: Let me tune in!', options: ['police officer', 'police', 'policeman', 'polices'], correct: 1, explanation: '"Police" is always treated as plural.' },
          { id: 14, situation: 'Someone notices a broken item.', dialogue: 'A: Your ___ are broken!\nB: Oh no, I need to get new ones.', options: ['glass', 'glasses', 'a glass', 'glasse'], correct: 1, explanation: '"Glasses" is always plural.' },
          { id: 15, situation: 'A friend asks to borrow your jeans.', dialogue: 'A: Can I borrow your ___?\nB: Sure, they\'re in the wardrobe.', options: ['jean', 'jeans', 'a jean', 'jeanse'], correct: 1, explanation: '"Jeans" is always plural.' },
          { id: 16, situation: 'You notice your colleague\'s clothes are muddy.', dialogue: 'A: Your ___ are muddy!\nB: I walked through the garden this morning.', options: ['trouser', 'trousers', 'a trouser', 'trouseres'], correct: 1, explanation: '"Trousers" is always plural.' },
          { id: 17, situation: 'At a museum, a guide describes an old tool.', dialogue: 'A: These old ___ were used for cutting cloth.\nB: Fascinating!', options: ['scissor', 'scissors', 'a scissor', 'scissore'], correct: 1, explanation: '"Scissors" is always plural.' },
          { id: 18, situation: 'A parent packs for a beach trip.', dialogue: 'A: Did you pack your ___?\nB: Yes, they\'re in the bag.', options: ['short', 'shorts', 'a short', 'shortes'], correct: 1, explanation: '"Shorts" is always plural.' },
          { id: 19, situation: 'You ask about someone\'s binoculars at a bird-watching event.', dialogue: 'A: Are those ___ new?\nB: Yes, I just bought them!', options: ['binocular', 'binoculars', 'a binocular', 'binoculare'], correct: 1, explanation: '"Binoculars" is always plural.' },
          { id: 20, situation: 'A student asks a teacher about a grammar rule.', dialogue: 'A: Why do we say "my scissors are" instead of "my scissor is"?\nB: Because ___ is an always-plural noun.', options: ['scissor', 'scissors', 'a scissor', 'scissoring'], correct: 1, explanation: '"Scissors" is always plural; it has no singular form.' },
        ],
      },
      {
        id: 'countable-uncountable',
        title: 'Countable & Uncountable Nouns',
        icon: '⚖️',
        guide: `## Sanaladigan va Sanalmaydigan Otlar

### Sanaladigan otlar (Countable Nouns)
Sanaladigan otlar birlik va ko'plik shaklida keladi va son bilan ishlatiladi:
• one apple, two apples
• a dog, three dogs
• one book, five books

### Sanalmaydigan otlar (Uncountable Nouns)
Sanalmaydigan otlar ko'plik shaklini olmaydi va odatda son bilan ishlatilmaydi:
• water, music, love, advice, information
• bread, milk, coffee, butter, sugar
• furniture, luggage, equipment

## Muhim farqlar
Sanaladigan: a/an + ot, some/any + ko'plik
• a book, some books, any books

Sanalmaydigan: a/an ishlatilmaydi, some/any + birlik
• some water (not "a water"), some advice (not "an advice")

## Miqdor so'zlari
Sanaladigan: many, few, a few, number of
• many books, a few apples

Sanalmaydigan: much, little, a little, amount of
• much water, a little milk

## Umumiy iboralar
• a piece of advice, bread, furniture, information
• a glass of water, a cup of coffee
• a loaf of bread, a slice of cheese`,
        questions: [
          { id: 1, text: 'Which is an uncountable noun?', options: ['apple', 'book', 'water', 'chair'], correct: 2, explanation: '"Water" cannot be counted directly — it is uncountable.' },
          { id: 2, text: 'Which is a countable noun?', options: ['music', 'love', 'chair', 'air'], correct: 2, explanation: '"Chair" can be counted: one chair, two chairs.' },
          { id: 3, text: 'Can I have ___ water, please?', options: ['a', 'an', 'some', 'many'], correct: 2, explanation: '"Some" is used with uncountable nouns: "some water".' },
          { id: 4, text: 'I need ___ advice.', options: ['an', 'a', 'some', 'many'], correct: 2, explanation: '"Advice" is uncountable — use "some advice".' },
          { id: 5, text: 'There are ___ books on the shelf.', options: ['much', 'a few', 'a little', 'less'], correct: 1, explanation: '"A few" is used with countable nouns.' },
          { id: 6, text: 'There isn\'t ___ milk in the fridge.', options: ['many', 'few', 'much', 'a few'], correct: 2, explanation: '"Much" is used with uncountable nouns in negative sentences.' },
          { id: 7, text: 'Which sentence is correct?', options: ['I need an information.', 'I need some informations.', 'I need some information.', 'I need a information.'], correct: 2, explanation: '"Information" is uncountable — use "some information".' },
          { id: 8, text: 'How ___ sugar do you want?', options: ['many', 'few', 'much', 'a few'], correct: 2, explanation: '"Much" is used for uncountable nouns in questions.' },
          { id: 9, text: 'I have ___ apples in my bag.', options: ['much', 'a little', 'three', 'less'], correct: 2, explanation: 'Specific numbers work with countable nouns: "three apples".' },
          { id: 10, text: '"Furniture" is:', options: ['countable', 'uncountable', 'both', 'always plural'], correct: 1, explanation: '"Furniture" is uncountable — you say "a piece of furniture".' },
          { id: 11, text: 'We don\'t have ___ time left.', options: ['many', 'few', 'much', 'a few'], correct: 2, explanation: '"Time" is uncountable → "much time".' },
          { id: 12, text: 'Which phrase is correct?', options: ['a bread', 'many breads', 'a loaf of bread', 'two bread'], correct: 2, explanation: '"Bread" is uncountable — use "a loaf of bread".' },
          { id: 13, text: 'I have very ___ friends. (only a small number)', options: ['little', 'much', 'few', 'less'], correct: 2, explanation: '"Few" = a small number of (countable nouns).' },
          { id: 14, text: 'There is ___ juice in the glass. (small amount)', options: ['a few', 'few', 'much', 'a little'], correct: 3, explanation: '"A little" = a small amount of (uncountable nouns).' },
          { id: 15, text: 'Which is uncountable?', options: ['cat', 'idea', 'luggage', 'error'], correct: 2, explanation: '"Luggage" is uncountable — use "a piece of luggage".' },
          { id: 16, text: 'How ___ people came to the party?', options: ['much', 'many', 'little', 'few'], correct: 1, explanation: '"Many" is used for countable nouns in questions.' },
          { id: 17, text: 'Would you like ___ coffee?', options: ['a', 'many', 'some', 'few'], correct: 2, explanation: '"Some" with uncountable: "some coffee".' },
          { id: 18, text: 'Which is NOT uncountable?', options: ['milk', 'money', 'traffic', 'car'], correct: 3, explanation: '"Car" is countable — you can say "one car, two cars".' },
          { id: 19, text: 'We received ___ good news today!', options: ['a', 'many', 'some', 'few'], correct: 2, explanation: '"News" is uncountable → "some news".' },
          { id: 20, text: 'I don\'t have ___ money. (negative)', options: ['many', 'any', 'a few', 'some'], correct: 1, explanation: '"Any" is used in negative sentences with both countable and uncountable.' },
          { id: 21, text: 'There are ___ students in the classroom.', options: ['much', 'a little', 'a lot of', 'less'], correct: 2, explanation: '"A lot of" works with both countable and uncountable.' },
          { id: 22, text: 'She gave me ___ advice. (some helpful advice)', options: ['an', 'a', 'some', 'many'], correct: 2, explanation: '"Advice" is uncountable → "some advice".' },
          { id: 23, text: 'We have very ___ information about it.', options: ['few', 'many', 'little', 'much'], correct: 2, explanation: '"Little" = small amount of (uncountable).' },
          { id: 24, text: 'Which phrase is wrong?', options: ['a cup of coffee', 'two pieces of advice', 'much books', 'a little sugar'], correct: 2, explanation: '"Much books" is wrong. Use "many books" (countable).' },
          { id: 25, text: '"How much" is used with:', options: ['countable nouns', 'uncountable nouns', 'all nouns', 'plural nouns only'], correct: 1, explanation: '"How much" + uncountable; "how many" + countable.' },
          { id: 26, text: 'I bought ___ furniture yesterday.', options: ['a', 'some', 'many', 'few'], correct: 1, explanation: '"Furniture" is uncountable → "some furniture".' },
          { id: 27, text: 'There was ___ traffic on the road.', options: ['many', 'few', 'a little', 'a lot of'], correct: 3, explanation: '"Traffic" is uncountable → "a lot of traffic".' },
          { id: 28, text: 'Which is correct?', options: ['I have few homeworks.', 'I have a little homework.', 'I have a homework.', 'I have few homework.'], correct: 1, explanation: '"Homework" is uncountable → "a little homework".' },
          { id: 29, text: '"Fewer" is used with ___ nouns.', options: ['uncountable', 'countable', 'abstract', 'all'], correct: 1, explanation: '"Fewer" = fewer books (countable); "less" = less water (uncountable).' },
          { id: 30, text: 'Can you give me ___ paper? (bitta qog\'oz)', options: ['a piece of', 'a paper', 'any paper', 'much paper'], correct: 0, explanation: '"A piece of paper" — paper is uncountable, use piece of.' },
        ],
        fillBlanks: [
          { id: 1, text: 'There is ___ milk in the fridge.', options: ['many', 'a few', 'some', 'few'], correct: 2, explanation: '"Some" is used with uncountable nouns like milk.' },
          { id: 2, text: 'She has ___ friends at school.', options: ['much', 'a little', 'many', 'less'], correct: 2, explanation: '"Many" is used with countable nouns like friends.' },
          { id: 3, text: 'We don\'t have ___ time left.', options: ['many', 'few', 'much', 'a few'], correct: 2, explanation: '"Much" is used with uncountable nouns in negative sentences.' },
          { id: 4, text: 'Can I have ___ sugar in my tea?', options: ['a', 'many', 'a little', 'a few'], correct: 2, explanation: '"A little" = small amount of uncountable noun.' },
          { id: 5, text: 'There are ___ apples on the table.', options: ['much', 'a little', 'a few', 'less'], correct: 2, explanation: '"A few" = small number of countable nouns.' },
          { id: 6, text: 'I need ___ information about the course.', options: ['an', 'many', 'a', 'some'], correct: 3, explanation: '"Information" is uncountable → use "some".' },
          { id: 7, text: 'How ___ water do you drink every day?', options: ['many', 'few', 'much', 'a few'], correct: 2, explanation: '"How much" + uncountable noun.' },
          { id: 8, text: 'How ___ students are in your class?', options: ['much', 'little', 'many', 'a little'], correct: 2, explanation: '"How many" + countable noun.' },
          { id: 9, text: 'I bought ___ furniture for my new apartment.', options: ['a', 'many', 'some', 'few'], correct: 2, explanation: '"Furniture" is uncountable → "some furniture".' },
          { id: 10, text: 'She gave me ___ good advice.', options: ['an', 'a', 'many', 'some'], correct: 3, explanation: '"Advice" is uncountable → "some advice".' },
          { id: 11, text: 'There is very ___ rain in the desert.', options: ['few', 'many', 'little', 'a few'], correct: 2, explanation: '"Little" = very small amount (uncountable).' },
          { id: 12, text: 'I have very ___ books to read.', options: ['little', 'much', 'few', 'less'], correct: 2, explanation: '"Few" = very small number (countable).' },
          { id: 13, text: 'Is there ___ bread left?', options: ['many', 'a', 'some', 'few'], correct: 2, explanation: '"Bread" is uncountable → "some bread".' },
          { id: 14, text: 'I don\'t have ___ money.', options: ['many', 'a few', 'any', 'a little'], correct: 2, explanation: '"Any" is used in negative sentences with uncountable nouns.' },
          { id: 15, text: 'Are there ___ chairs in the room?', options: ['much', 'any', 'a little', 'less'], correct: 1, explanation: '"Any" is used in questions with countable nouns.' },
          { id: 16, text: 'She drinks ___ coffee every morning.', options: ['many', 'few', 'a lot of', 'a few'], correct: 2, explanation: '"A lot of" works with uncountable nouns.' },
          { id: 17, text: 'I have ___ homework tonight. It\'s a lot!', options: ['many', 'a few', 'much', 'a'], correct: 2, explanation: '"Homework" is uncountable → "much homework".' },
          { id: 18, text: 'We need ___ eggs for the cake.', options: ['much', 'a little', 'several', 'less'], correct: 2, explanation: '"Several" = more than two but not very many (countable).' },
          { id: 19, text: 'There is ___ traffic on the road today.', options: ['many', 'few', 'a lot of', 'a few'], correct: 2, explanation: '"Traffic" is uncountable → "a lot of traffic".' },
          { id: 20, text: 'He doesn\'t have ___ experience.', options: ['many', 'a few', 'much', 'a'], correct: 2, explanation: '"Experience" (general) is uncountable → "much experience".' },
        ],
        scrambled: [
          { id: 1, words: ['some', 'water', 'I', 'need'], answer: 'I need some water.', explanation: '"Some" is used with uncountable nouns.' },
          { id: 2, words: ['have', 'many', 'I', 'books'], answer: 'I have many books.', explanation: '"Many" is used with countable nouns.' },
          { id: 3, words: ['much', 'there', 'is', 'sugar', 'not'], answer: 'There is not much sugar.', explanation: '"Not much" + uncountable noun.' },
          { id: 4, words: ['few', 'a', 'there', 'chairs', 'are'], answer: 'There are a few chairs.', explanation: '"A few" + countable noun.' },
          { id: 5, words: ['advice', 'need', 'some', 'I'], answer: 'I need some advice.', explanation: '"Advice" is uncountable → use "some".' },
          { id: 6, words: ['milk', 'any', 'there', 'is', 'no'], answer: 'There is no any milk.', explanation: 'Actually: "There is no milk" or "There isn\'t any milk".' },
          { id: 7, words: ['does', 'have', 'she', 'money', 'much'], answer: 'She does have much money.', explanation: '"Much" is used with uncountable money.' },
          { id: 8, words: ['people', 'many', 'came', 'how', '?'], answer: 'How many people came?', explanation: '"How many" + countable noun "people".' },
          { id: 9, words: ['little', 'a', 'add', 'salt', 'please'], answer: 'Please add a little salt.', explanation: '"A little" = small amount of uncountable salt.' },
          { id: 10, words: ['information', 'some', 'give', 'me', 'please'], answer: 'Please give me some information.', explanation: '"Information" is uncountable → "some information".' },
          { id: 11, words: ['in', 'the', 'traffic', 'lot', 'is', 'of', 'a', 'city'], answer: 'There is a lot of traffic in the city.', explanation: '"Traffic" is uncountable → "a lot of traffic".' },
          { id: 12, words: ['furniture', 'the', 'bought', 'some', 'they'], answer: 'They bought some furniture.', explanation: '"Furniture" is uncountable → "some furniture".' },
          { id: 13, words: ['have', 'friends', 'few', 'I', 'very'], answer: 'I have very few friends.', explanation: '"Few" = very small number of countable nouns.' },
          { id: 14, words: ['experience', 'have', 'she', 'does', 'not', 'much'], answer: 'She does not have much experience.', explanation: '"Experience" is uncountable → "much experience".' },
          { id: 15, words: ['any', 'there', 'is', 'bread', '?'], answer: 'Is there any bread?', explanation: '"Any" in questions with uncountable nouns.' },
          { id: 16, words: ['of', 'coffee', 'cups', 'two', 'drank', 'she'], answer: 'She drank two cups of coffee.', explanation: 'Measure phrase: "cups of coffee".' },
          { id: 17, words: ['homework', 'have', 'tonight', 'much', 'I'], answer: 'I have much homework tonight.', explanation: '"Homework" is uncountable → "much homework".' },
          { id: 18, words: ['water', 'do', 'how', 'drink', 'you', 'much', '?'], answer: 'How much water do you drink?', explanation: '"How much" + uncountable noun.' },
          { id: 19, words: ['some', 'he', 'news', 'good', 'heard'], answer: 'He heard some good news.', explanation: '"News" is uncountable → "some news".' },
          { id: 20, words: ['loaf', 'of', 'a', 'bought', 'bread', 'she'], answer: 'She bought a loaf of bread.', explanation: '"A loaf of bread" — measure phrase for uncountable noun.' },
        ],
        errorCorrection: [
          { id: 1, text: 'I need an information about the train.', options: ['I need', 'an information', 'about', 'the train'], correct: 1, wrongPart: 'an information', correction: 'some information', explanation: '"Information" is uncountable — never use "a/an" with it.' },
          { id: 2, text: 'How many sugar do you want?', options: ['How many', 'sugar', 'do you', 'want'], correct: 0, wrongPart: 'How many', correction: 'How much', explanation: '"Sugar" is uncountable — use "how much".' },
          { id: 3, text: 'She has much friends at school.', options: ['She has', 'much', 'friends', 'at school'], correct: 1, wrongPart: 'much', correction: 'many', explanation: '"Friends" is countable — use "many".' },
          { id: 4, text: 'There are a few milk in the fridge.', options: ['There are', 'a few', 'milk', 'in the fridge'], correct: 1, wrongPart: 'a few', correction: 'a little', explanation: '"Milk" is uncountable — use "a little".' },
          { id: 5, text: 'I don\'t have some money.', options: ['I don\'t have', 'some', 'money', 'at all'], correct: 1, wrongPart: 'some', correction: 'any', explanation: 'In negative sentences use "any", not "some".' },
          { id: 6, text: 'We bought many furnitures for the room.', options: ['We bought', 'many furnitures', 'for', 'the room'], correct: 1, wrongPart: 'many furnitures', correction: 'some furniture', explanation: '"Furniture" is uncountable — no plural, use "some".' },
          { id: 7, text: 'He gave me a good advice.', options: ['He gave', 'me', 'a good advice', 'yesterday'], correct: 2, wrongPart: 'a good advice', correction: 'some good advice', explanation: '"Advice" is uncountable — never use "a" with it.' },
          { id: 8, text: 'There is a few water left.', options: ['There is', 'a few', 'water', 'left'], correct: 1, wrongPart: 'a few', correction: 'a little', explanation: '"Water" is uncountable — use "a little".' },
          { id: 9, text: 'I have very little books to read.', options: ['I have', 'very little', 'books', 'to read'], correct: 1, wrongPart: 'very little', correction: 'very few', explanation: '"Books" is countable — use "few".' },
          { id: 10, text: 'She drinks much coffees every day.', options: ['She drinks', 'much coffees', 'every', 'day'], correct: 1, wrongPart: 'much coffees', correction: 'a lot of coffee', explanation: '"Coffee" is uncountable — no plural.' },
          { id: 11, text: 'How many homeworks do you have?', options: ['How many', 'homeworks', 'do you', 'have'], correct: 1, wrongPart: 'homeworks', correction: 'homework', explanation: '"Homework" is uncountable — no plural form.' },
          { id: 12, text: 'I saw a news on TV today.', options: ['I saw', 'a news', 'on TV', 'today'], correct: 1, wrongPart: 'a news', correction: 'some news', explanation: '"News" is uncountable — never use "a" with it.' },
          { id: 13, text: 'There are much students in this class.', options: ['There are', 'much', 'students', 'in this class'], correct: 1, wrongPart: 'much', correction: 'many', explanation: '"Students" is countable — use "many".' },
          { id: 14, text: 'Can you give me an advice?', options: ['Can you', 'give me', 'an advice', 'please'], correct: 2, wrongPart: 'an advice', correction: 'some advice', explanation: '"Advice" is uncountable — use "some advice".' },
          { id: 15, text: 'We have a little chairs in the room.', options: ['We have', 'a little', 'chairs', 'in the room'], correct: 1, wrongPart: 'a little', correction: 'a few', explanation: '"Chairs" is countable — use "a few".' },
          { id: 16, text: 'I need few information for my report.', options: ['I need', 'few', 'information', 'for my report'], correct: 1, wrongPart: 'few', correction: 'some', explanation: '"Information" is uncountable — use "some", not "few".' },
          { id: 17, text: 'She bought two bread at the bakery.', options: ['She bought', 'two bread', 'at', 'the bakery'], correct: 1, wrongPart: 'two bread', correction: 'two loaves of bread', explanation: '"Bread" is uncountable — use "loaves of bread".' },
          { id: 18, text: 'He doesn\'t have many luggage.', options: ['He doesn\'t have', 'many', 'luggage', 'with him'], correct: 1, wrongPart: 'many', correction: 'much', explanation: '"Luggage" is uncountable — use "much".' },
          { id: 19, text: 'There are much traffic on the road.', options: ['There are', 'much traffic', 'on', 'the road'], correct: 0, wrongPart: 'There are', correction: 'There is', explanation: '"Traffic" is uncountable — use "There is".' },
          { id: 20, text: 'Do you have some problems? (negative context)', options: ['Do you have', 'some', 'problems', 'right now'], correct: 1, wrongPart: 'some', correction: 'any', explanation: '"Any" is used in questions, not "some".' },
        ],
        transform: [
          { id: 1, text: 'Make this a question: "There is some milk."', options: ['Is there some milk?', 'Is there any milk?', 'Are there any milk?', 'Is there a milk?'], correct: 1, explanation: 'In questions, "some" → "any": "Is there any milk?"' },
          { id: 2, text: 'Make this negative: "I have some money."', options: ['I don\'t have some money.', 'I don\'t have any money.', 'I have no any money.', 'I haven\'t some money.'], correct: 1, explanation: 'In negative sentences, "some" → "any".' },
          { id: 3, text: 'Change "much" to the correct word: "I have much books."', options: ['I have many books.', 'I have a lot books.', 'I have more books.', 'I have a few of books.'], correct: 0, explanation: '"Books" is countable → "many books".' },
          { id: 4, text: 'Change "a few" to the correct word: "Add a few salt."', options: ['Add a little salt.', 'Add few salt.', 'Add some salts.', 'Add much salt.'], correct: 0, explanation: '"Salt" is uncountable → "a little salt".' },
          { id: 5, text: 'Rewrite using "a lot of": "She has many friends."', options: ['She has a lot friends.', 'She has a lot of friends.', 'She has lots friends.', 'She has many a lot of friends.'], correct: 1, explanation: '"A lot of" + countable noun: "a lot of friends".' },
          { id: 6, text: 'Make a question: "He has some experience."', options: ['Does he have some experience?', 'Does he have any experience?', 'Has he some experience?', 'Does he have experience any?'], correct: 1, explanation: 'In questions, "some" → "any".' },
          { id: 7, text: 'Use correct determiner: "She has ___ homework."', options: ['a few', 'many', 'much', 'several'], correct: 2, explanation: '"Homework" is uncountable → "much homework".' },
          { id: 8, text: 'Rewrite using measure phrase: "I want bread."', options: ['I want a bread.', 'I want a loaf of bread.', 'I want one bread.', 'I want some breads.'], correct: 1, explanation: '"A loaf of bread" is the correct measure phrase.' },
          { id: 9, text: 'Change to the opposite (positive/negative): "There isn\'t any juice."', options: ['There is some juice.', 'There is any juice.', 'There is a juice.', 'There are some juices.'], correct: 0, explanation: 'Positive form: "some" instead of "not any".' },
          { id: 10, text: 'Which is the correct question form?', options: ['How many water do you drink?', 'How much waters do you drink?', 'How much water do you drink?', 'How many waters do you drink?'], correct: 2, explanation: '"Water" is uncountable → "how much water".' },
          { id: 11, text: 'Rewrite using "fewer": "Less cars are on the road today."', options: ['Fewer cars are on the road today.', 'More fewer cars are on the road.', 'Less fewer cars are on the road.', 'Few cars are on the road today.'], correct: 0, explanation: '"Cars" is countable → use "fewer" not "less".' },
          { id: 12, text: 'Make this negative: "We have some sugar."', options: ['We don\'t have some sugar.', 'We don\'t have any sugar.', 'We have no sugars.', 'We haven\'t some sugar.'], correct: 1, explanation: '"Any" is used in negatives: "We don\'t have any sugar."' },
          { id: 13, text: 'Change to use "a piece of": "She gave me some advice."', options: ['She gave me a piece of advice.', 'She gave me a advice.', 'She gave me piece advice.', 'She gave me an advice piece.'], correct: 0, explanation: '"A piece of advice" — measure phrase for uncountable noun.' },
          { id: 14, text: 'Choose the correct form: "I have ___ homework today." (a large amount)', options: ['a lot of', 'many', 'a few', 'several'], correct: 0, explanation: '"Homework" is uncountable → "a lot of homework".' },
          { id: 15, text: 'Correct the error: "How many information do you need?"', options: ['How much information do you need?', 'How many informations do you need?', 'How many information do you need?', 'How information do you need?'], correct: 0, explanation: '"Information" is uncountable → "how much information".' },
          { id: 16, text: 'Rewrite using "no": "There isn\'t any butter."', options: ['There is no butter.', 'There are no butter.', 'There is not butter.', 'There no is butter.'], correct: 0, explanation: '"There is no butter" = "There isn\'t any butter".' },
          { id: 17, text: 'Choose the correct sentence about money:', options: ['I have many money.', 'I have a few money.', 'I don\'t have much money.', 'I don\'t have few money.'], correct: 2, explanation: '"Money" is uncountable → "not much money".' },
          { id: 18, text: 'Change "several" to fit uncountable noun: "I need several water."', options: ['I need some water.', 'I need several waters.', 'I need a few water.', 'I need little waters.'], correct: 0, explanation: '"Water" is uncountable → use "some".' },
          { id: 19, text: 'Rewrite as a negative: "There are some chairs."', options: ['There aren\'t any chairs.', 'There isn\'t any chairs.', 'There aren\'t some chairs.', 'There not are any chairs.'], correct: 0, explanation: '"Aren\'t any" is the correct negative form for countable plurals.' },
          { id: 20, text: 'Use a measure phrase: "Give me coffee."', options: ['Give me a cup of coffee.', 'Give me a coffee cup.', 'Give me one of coffee.', 'Give me a piece of coffee.'], correct: 0, explanation: '"A cup of coffee" — correct measure phrase.' },
        ],
        dialogue: [
          { id: 1, situation: 'At a café, a customer wants to order.', dialogue: 'Waiter: What would you like?\nCustomer: Can I have ___ coffee, please?', options: ['many', 'a few', 'some', 'few'], correct: 2, explanation: '"Some coffee" — uncountable noun with "some" when ordering.' },
          { id: 2, situation: 'Two friends are planning a party.', dialogue: 'A: Do we have enough food?\nB: We have ___ sandwiches but we need more drinks.', options: ['much', 'a little', 'a few', 'any'], correct: 2, explanation: '"A few sandwiches" — countable noun, small number.' },
          { id: 3, situation: 'A student asks a teacher.', dialogue: 'Student: Can you give me ___ advice about the exam?\nTeacher: Of course!', options: ['an', 'a', 'some', 'many'], correct: 2, explanation: '"Advice" is uncountable — use "some advice".' },
          { id: 4, situation: 'At home, checking the fridge.', dialogue: 'A: Is there ___ milk left?\nB: No, we need to buy some.', options: ['many', 'any', 'a few', 'much'], correct: 1, explanation: '"Any milk" — "any" in questions with uncountable noun.' },
          { id: 5, situation: 'A person is at a supermarket.', dialogue: 'Clerk: How can I help?\nShopper: I\'m looking for ___. Do you have bread?', options: ['a bread', 'some bread', 'many breads', 'few bread'], correct: 1, explanation: '"Bread" is uncountable → "some bread".' },
          { id: 6, situation: 'Talking about weekend plans.', dialogue: 'A: Did you do ___ homework this weekend?\nB: Yes, I finished it all.', options: ['many', 'a few', 'any', 'few'], correct: 2, explanation: '"Any homework" — "any" in questions.' },
          { id: 7, situation: 'In the kitchen before cooking.', dialogue: 'A: How ___ sugar do we need?\nB: Just two teaspoons.', options: ['many', 'few', 'much', 'a few'], correct: 2, explanation: '"How much sugar" — "sugar" is uncountable.' },
          { id: 8, situation: 'A tourist asks for directions.', dialogue: 'Tourist: Is there ___ information about the museum?\nLocal: Yes, at the visitor center.', options: ['an', 'many', 'any', 'few'], correct: 2, explanation: '"Any information" — "any" in questions, "information" is uncountable.' },
          { id: 9, situation: 'Friends discussing who is coming to the party.', dialogue: 'A: How ___ people are coming to the party?\nB: About thirty.', options: ['much', 'many', 'little', 'a little'], correct: 1, explanation: '"How many people" — "people" is countable.' },
          { id: 10, situation: 'At a restaurant, talking about the bill.', dialogue: 'A: Do you have ___ cash?\nB: No, can we pay by card?', options: ['many', 'a few', 'any', 'few'], correct: 2, explanation: '"Any cash" — "any" in questions, "cash" is uncountable.' },
          { id: 11, situation: 'A student talks about studying.', dialogue: 'A: Did you understand the lesson?\nB: I have ___ questions. Can you help?', options: ['much', 'a little', 'a few', 'any'], correct: 2, explanation: '"A few questions" — "questions" is countable, small number.' },
          { id: 12, situation: 'Planning a shopping trip.', dialogue: 'A: We need ___ eggs and ___ flour.\nB: OK, I\'ll add them to the list.', options: ['some / some', 'any / some', 'some / many', 'a few / much'], correct: 0, explanation: '"Some eggs" (countable) and "some flour" (uncountable).' },
          { id: 13, situation: 'Two colleagues talking about a project.', dialogue: 'A: We don\'t have ___ time to finish this.\nB: We need to work faster.', options: ['many', 'few', 'much', 'a few'], correct: 2, explanation: '"Much time" — "time" is uncountable.' },
          { id: 14, situation: 'At a bookshop.', dialogue: 'Customer: Do you have ___ books about cooking?\nShopkeeper: Yes, we have a large collection.', options: ['much', 'any', 'a little', 'less'], correct: 1, explanation: '"Any books" — "any" in questions, "books" is countable.' },
          { id: 15, situation: 'Talking about the weather.', dialogue: 'A: There isn\'t ___ rain in summer here.\nB: Yes, it\'s very dry.', options: ['many', 'a few', 'much', 'a lot'], correct: 2, explanation: '"Not much rain" — "rain" is uncountable.' },
          { id: 16, situation: 'A child asks a parent.', dialogue: 'Child: Can I have ___ biscuits?\nParent: You can have two.', options: ['much', 'some', 'a little', 'any'], correct: 1, explanation: '"Some biscuits" — "biscuits" is countable, offering.' },
          { id: 17, situation: 'Colleagues chatting about work.', dialogue: 'A: There is ___ work to do before the deadline.\nB: We should start immediately.', options: ['many', 'a few', 'a lot of', 'few'], correct: 2, explanation: '"A lot of work" — "work" is uncountable.' },
          { id: 18, situation: 'Two students are talking about homework.', dialogue: 'A: Do you have ___ homework tonight?\nB: Yes, quite a lot.', options: ['many', 'much', 'a few', 'few'], correct: 1, explanation: '"Much homework" — "homework" is uncountable. Used in question here.' },
          { id: 19, situation: 'At the airport, a traveller has a problem.', dialogue: 'Officer: How ___ luggage do you have?\nTraveller: Just this one bag.', options: ['many', 'few', 'much', 'a few'], correct: 2, explanation: '"How much luggage" — "luggage" is uncountable.' },
          { id: 20, situation: 'Two friends after a party.', dialogue: 'A: Was there ___ food at the party?\nB: Yes, there was plenty!', options: ['many', 'a', 'some', 'few'], correct: 2, explanation: '"Some food" — "food" is uncountable.' },
        ],
      },
      {
        id: 'degrees-adjectives',
        title: 'Degrees of Adjectives',
        icon: '📊',
        guide: `## Sifat Darajalari (Degrees of Adjectives)

Ingliz tilida sifatning uch darajasi mavjud:

## 1. Oddiy daraja (Positive)
Sifat o'z holicha: big, small, fast, beautiful

## 2. Qiyosiy daraja (Comparative)
Ikki narsani solishtirish uchun:

### Qisqa sifatlarga -er qo'shiladi (1-2 bo'g'in)
• big → bigger
• small → smaller
• fast → faster
• hot → hotter (ikkilantirish)
• happy → happier (y → ier)

### Uzun sifatlarga "more" qo'shiladi (2+ bo'g'in)
• beautiful → more beautiful
• interesting → more interesting
• expensive → more expensive

## 3. Orttirma daraja (Superlative)
Ko'p narsalar orasida eng yaxshisini ifodalaydi:

### Qisqa sifatlarga the + -est
• big → the biggest
• small → the smallest
• fast → the fastest
• hot → the hottest

### Uzun sifatlarga the most
• beautiful → the most beautiful
• interesting → the most interesting

## Noto'g'ri sifatlar (Irregular)
• good → better → the best
• bad → worse → the worst
• far → farther/further → the farthest/furthest
• little → less → the least
• many/much → more → the most`,
        questions: [
          { id: 1, text: 'What is the comparative form of "big"?', options: ['biger', 'more big', 'biggest', 'bigger'], correct: 3, explanation: '"Big" → double the consonant and add -er: bigger.' },
          { id: 2, text: 'What is the superlative form of "fast"?', options: ['faster', 'more fast', 'the fastest', 'most fast'], correct: 2, explanation: '"Fast" → the fastest (short adjective → -est).' },
          { id: 3, text: 'She is ___ than her sister. (tall)', options: ['tallest', 'more tall', 'taller', 'the taller'], correct: 2, explanation: '"Tall" → comparative: taller.' },
          { id: 4, text: 'This is ___ film I have ever seen. (interesting)', options: ['more interesting', 'the most interesting', 'interestinger', 'most interesting'], correct: 1, explanation: 'Long adjective superlative: "the most interesting".' },
          { id: 5, text: 'What is the comparative form of "beautiful"?', options: ['beautifuler', 'more beautiful', 'beautifuller', 'the most beautiful'], correct: 1, explanation: 'Long adjectives use "more": more beautiful.' },
          { id: 6, text: 'Mount Everest is ___ mountain in the world. (high)', options: ['higher', 'more high', 'the highest', 'most high'], correct: 2, explanation: '"High" → superlative: the highest.' },
          { id: 7, text: 'This exercise is ___ than the previous one. (easy)', options: ['easyer', 'more easy', 'easier', 'the easiest'], correct: 2, explanation: 'Y → ier: easy → easier.' },
          { id: 8, text: 'Which sentence is correct?', options: ['This is the more expensive car.', 'This is expensivest car.', 'This is the most expensive car.', 'This is most expensive car.'], correct: 2, explanation: 'Long adjective superlative with "the most".' },
          { id: 9, text: 'What is the superlative form of "happy"?', options: ['happyer', 'the happiest', 'most happiest', 'happiest'], correct: 1, explanation: 'Y → iest + the: the happiest.' },
          { id: 10, text: 'Today is ___ day of the year. (hot)', options: ['hotter', 'the hottest', 'more hot', 'most hot'], correct: 1, explanation: 'Short adj: double consonant + est → the hottest.' },
          { id: 11, text: 'He runs ___ than anyone in the class. (fast)', options: ['more fast', 'fastest', 'faster', 'the fastest'], correct: 2, explanation: '"Faster" is the comparative form.' },
          { id: 12, text: 'Superlative adjectives always use:', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Superlatives always use "the": the biggest, the most beautiful.' },
          { id: 13, text: 'This room is ___ than that one. (small)', options: ['smallest', 'more small', 'the smallest', 'smaller'], correct: 3, explanation: '"Small" → comparative: smaller.' },
          { id: 14, text: 'Comparative form is used to compare:', options: ['one thing', 'two things', 'three or more things', 'everything'], correct: 1, explanation: 'Comparative = comparing exactly two things.' },
          { id: 15, text: 'What is the comparative of "expensive"?', options: ['expensiver', 'more expensive', 'expensiveer', 'most expensive'], correct: 1, explanation: 'Long adjective → more + adjective: more expensive.' },
          { id: 16, text: 'A whale is ___ than a dolphin. (large)', options: ['larger', 'more large', 'the largest', 'large'], correct: 0, explanation: '"Large" → comparative: larger.' },
          { id: 17, text: 'What is the superlative of "small"?', options: ['smaller', 'more small', 'the smallest', 'most small'], correct: 2, explanation: '"Small" → the smallest.' },
          { id: 18, text: 'Which adjective takes "more" in comparative?', options: ['big', 'fast', 'tall', 'comfortable'], correct: 3, explanation: '"Comfortable" has 4 syllables → more comfortable.' },
          { id: 19, text: 'This is ___ building in the city. (tall)', options: ['taller', 'more tall', 'the tallest', 'tall'], correct: 2, explanation: '"Tall" → superlative: the tallest.' },
          { id: 20, text: 'She is ___ student in the class. (hard-working)', options: ['harder working', 'the most hard-working', 'more hard-working', 'hardest working'], correct: 1, explanation: 'Compound adjective: the most hard-working.' },
          { id: 21, text: 'What is the comparative of "thin"?', options: ['more thin', 'thiner', 'thinner', 'the thinnest'], correct: 2, explanation: 'CVC pattern: double the final consonant → thinner.' },
          { id: 22, text: 'Which is correct?', options: ['The sun is more hot than the moon.', 'The sun is hotter than the moon.', 'The sun is hottest than the moon.', 'The sun is hoter than the moon.'], correct: 1, explanation: '"Hot" → comparative: hotter (double t).' },
          { id: 23, text: 'Her dress is ___ than mine. (pretty)', options: ['more pretty', 'prettyer', 'prettier', 'the prettiest'], correct: 2, explanation: 'Y → ier: pretty → prettier.' },
          { id: 24, text: 'What is the superlative of "beautiful"?', options: ['beautifullest', 'more beautiful', 'the beautifulest', 'the most beautiful'], correct: 3, explanation: 'Long adjective → the most beautiful.' },
          { id: 25, text: 'London is ___ than my hometown. (big)', options: ['bigger', 'more big', 'the biggest', 'biggest'], correct: 0, explanation: '"Big" → comparative: bigger (double g).' },
          { id: 26, text: 'Which adjective doubles its last letter in comparative?', options: ['tall', 'fast', 'hot', 'cool'], correct: 2, explanation: '"Hot" ends in consonant-vowel-consonant → doubles: hotter.' },
          { id: 27, text: 'This is ___ day of my life! (happy)', options: ['happier', 'more happy', 'the happiest', 'most happy'], correct: 2, explanation: '"Happy" → superlative: the happiest.' },
          { id: 28, text: 'He is ___ person I know. (kind)', options: ['kinder', 'more kind', 'the kindest', 'kindest'], correct: 2, explanation: '"Kind" → superlative: the kindest.' },
          { id: 29, text: 'A sports car is ___ than a truck. (fast)', options: ['more fast', 'fastest', 'faster', 'the fastest'], correct: 2, explanation: '"Fast" → comparative: faster.' },
          { id: 30, text: 'Which sentence uses the superlative correctly?', options: ['She is most beautiful.', 'She is the beautifullest.', 'She is the most beautiful.', 'She is more beautiful of all.'], correct: 2, explanation: '"The most beautiful" — correct superlative of a long adjective.' },
        ],
        fillBlanks: [
          { id: 1, text: 'This car is ___ than that one. (expensive)', options: ['expensiver', 'more expensive', 'expensivest', 'most expensive'], correct: 1, explanation: 'Long adjective → comparative: "more expensive".' },
          { id: 2, text: 'She is ___ student in the class. (tall)', options: ['taller', 'more tall', 'the tallest', 'tallest'], correct: 2, explanation: 'Superlative: "the tallest".' },
          { id: 3, text: 'He runs ___ than his brother. (fast)', options: ['more fast', 'fastest', 'faster', 'the fastest'], correct: 2, explanation: '"Fast" → comparative: "faster".' },
          { id: 4, text: 'This is ___ film I have ever seen. (bad)', options: ['worse', 'the worst', 'badder', 'the baddest'], correct: 1, explanation: '"Bad" → superlative: "the worst".' },
          { id: 5, text: 'My room is ___ than yours. (small)', options: ['smallest', 'more small', 'the smallest', 'smaller'], correct: 3, explanation: '"Small" → comparative: "smaller".' },
          { id: 6, text: 'Superlative adjectives are always used with ___', options: ['a', 'an', 'the', 'some'], correct: 2, explanation: 'Superlatives always use "the": the biggest, the most beautiful.' },
          { id: 7, text: 'That is ___ book on the shelf. (interesting)', options: ['interestinger', 'more interesting', 'the most interesting', 'interesting'], correct: 2, explanation: 'Long adjective → superlative: "the most interesting".' },
          { id: 8, text: 'A cat is ___ than an elephant. (light)', options: ['lighter', 'more light', 'the lightest', 'light'], correct: 0, explanation: '"Light" → comparative: "lighter".' },
          { id: 9, text: 'She is ___ dancer in the group. (graceful)', options: ['gracefuler', 'more graceful', 'the gracefullest', 'the most graceful'], correct: 3, explanation: '"Graceful" (3 syllables) → "the most graceful".' },
          { id: 10, text: 'This bag is ___ than mine. (heavy)', options: ['more heavy', 'heavier', 'heaviest', 'the heaviest'], correct: 1, explanation: '"Heavy" → comparative: "heavier" (y → ier).' },
          { id: 11, text: 'Which form is correct for "big"?', options: ['more big', 'biger', 'bigger', 'the bigger'], correct: 2, explanation: '"Big" → double the g: "bigger".' },
          { id: 12, text: 'This pizza is ___ in the city. (good)', options: ['gooder', 'the goodest', 'better', 'the best'], correct: 3, explanation: '"Good" → irregular superlative: "the best".' },
          { id: 13, text: 'My dog is ___ than yours. (friendly)', options: ['friendlier', 'more friendly', 'friendliest', 'friendlyier'], correct: 0, explanation: '"Friendly" (2 syllables) → comparative: "friendlier".' },
          { id: 14, text: 'The Sahara is ___ desert in the world. (hot)', options: ['hotter', 'more hot', 'the hottest', 'most hot'], correct: 2, explanation: '"Hot" → double t: "the hottest".' },
          { id: 15, text: 'This house is ___ than that apartment. (comfortable)', options: ['comfortabler', 'more comfortable', 'comfortablest', 'most comfortable'], correct: 1, explanation: '4 syllables → "more comfortable".' },
          { id: 16, text: 'She finished the test ___ than anyone. (quick)', options: ['more quick', 'quickest', 'quicker', 'the quickest'], correct: 2, explanation: '"Quick" → comparative: "quicker".' },
          { id: 17, text: 'That is ___ building I have ever seen. (tall)', options: ['taller', 'more tall', 'the tallest', 'tallest'], correct: 2, explanation: '"Tall" → superlative: "the tallest".' },
          { id: 18, text: 'The weather today is ___ than yesterday. (cold)', options: ['more cold', 'coldest', 'colder', 'the coldest'], correct: 2, explanation: '"Cold" → comparative: "colder".' },
          { id: 19, text: 'This is ___ route to the city. (short)', options: ['shorter', 'more short', 'the shortest', 'most short'], correct: 2, explanation: '"Short" → superlative: "the shortest".' },
          { id: 20, text: 'She is ___ than her sister. (intelligent)', options: ['intelligenter', 'more intelligent', 'the most intelligent', 'most intelligent'], correct: 1, explanation: '"Intelligent" (4 syllables) → "more intelligent".' },
        ],
        scrambled: [
          { id: 1, words: ['bigger', 'is', 'an', 'elephant', 'than', 'a', 'cat'], answer: 'An elephant is bigger than a cat.', explanation: '"Big" → comparative: "bigger".' },
          { id: 2, words: ['the', 'tallest', 'is', 'she', 'in', 'class', 'the'], answer: 'She is the tallest in the class.', explanation: 'Superlative: "the tallest".' },
          { id: 3, words: ['more', 'this', 'is', 'interesting', 'book', 'that', 'than'], answer: 'This book is more interesting than that.', explanation: 'Long adjective → "more interesting".' },
          { id: 4, words: ['city', 'the', 'building', 'tallest', 'in', 'the', 'is', 'this'], answer: 'This is the tallest building in the city.', explanation: '"Tall" → superlative: "the tallest".' },
          { id: 5, words: ['sister', 'her', 'she', 'taller', 'than', 'is'], answer: 'She is taller than her sister.', explanation: '"Tall" → comparative: "taller".' },
          { id: 6, words: ['world', 'the', 'ocean', 'deepest', 'the', 'Pacific', 'is', 'in', 'the'], answer: 'The Pacific is the deepest ocean in the world.', explanation: '"Deep" → superlative: "the deepest".' },
          { id: 7, words: ['more', 'expensive', 'this', 'restaurant', 'is', 'than', 'that'], answer: 'This restaurant is more expensive than that.', explanation: '"Expensive" → "more expensive".' },
          { id: 8, words: ['runs', 'faster', 'he', 'me', 'than'], answer: 'He runs faster than me.', explanation: '"Fast" → comparative: "faster".' },
          { id: 9, words: ['most', 'the', 'is', 'beautiful', 'flower', 'rose', 'the'], answer: 'The rose is the most beautiful flower.', explanation: '"Beautiful" → "the most beautiful".' },
          { id: 10, words: ['easier', 'is', 'exercise', 'this', 'than', 'that', 'one'], answer: 'This exercise is easier than that one.', explanation: '"Easy" → comparative: "easier" (y → ier).' },
          { id: 11, words: ['hotter', 'is', 'summer', 'winter', 'than'], answer: 'Summer is hotter than winter.', explanation: '"Hot" → comparative: "hotter".' },
          { id: 12, words: ['the', 'shortest', 'in', 'he', 'class', 'is', 'the'], answer: 'He is the shortest in the class.', explanation: '"Short" → superlative: "the shortest".' },
          { id: 13, words: ['bigger', 'is', 'a', 'house', 'than', 'apartment', 'this'], answer: 'This house is bigger than an apartment.', explanation: '"Big" → comparative: "bigger".' },
          { id: 14, words: ['the', 'coldest', 'Antarctica', 'place', 'on', 'is', 'Earth', 'the'], answer: 'Antarctica is the coldest place on Earth.', explanation: '"Cold" → superlative: "the coldest".' },
          { id: 15, words: ['smarter', 'she', 'me', 'than', 'is'], answer: 'She is smarter than me.', explanation: '"Smart" → comparative: "smarter".' },
          { id: 16, words: ['most', 'the', 'is', 'comfortable', 'chair', 'this', 'room', 'in', 'the'], answer: 'This is the most comfortable chair in the room.', explanation: '"Comfortable" → "the most comfortable".' },
          { id: 17, words: ['older', 'is', 'building', 'this', 'than', 'that'], answer: 'This building is older than that.', explanation: '"Old" → comparative: "older".' },
          { id: 18, words: ['the', 'youngest', 'class', 'in', 'am', 'I', 'the'], answer: 'I am the youngest in the class.', explanation: '"Young" → superlative: "the youngest".' },
          { id: 19, words: ['quieter', 'library', 'is', 'the', 'than', 'classroom', 'the'], answer: 'The library is quieter than the classroom.', explanation: '"Quiet" → comparative: "quieter".' },
          { id: 20, words: ['the', 'most', 'she', 'is', 'creative', 'team', 'person', 'in', 'the'], answer: 'She is the most creative person in the team.', explanation: '"Creative" → "the most creative".' },
        ],
        errorCorrection: [
          { id: 1, text: 'She is more tall than her brother.', options: ['She is', 'more tall', 'than', 'her brother'], correct: 1, wrongPart: 'more tall', correction: 'taller', explanation: '"Tall" is short → use "-er": taller.' },
          { id: 2, text: 'This is the most biggest building in the city.', options: ['This is', 'the most biggest', 'building', 'in the city'], correct: 1, wrongPart: 'the most biggest', correction: 'the biggest', explanation: 'Never use "most" and "-est" together.' },
          { id: 3, text: 'He runs more faster than me.', options: ['He runs', 'more faster', 'than', 'me'], correct: 1, wrongPart: 'more faster', correction: 'faster', explanation: 'Never use "more" and "-er" together.' },
          { id: 4, text: 'This is the interestingest film.', options: ['This is', 'the', 'interestingest', 'film'], correct: 2, wrongPart: 'interestingest', correction: 'the most interesting', explanation: 'Long adjectives use "the most", not "-est".' },
          { id: 5, text: 'She is the more beautiful girl in the school.', options: ['She is', 'the more beautiful', 'girl', 'in the school'], correct: 1, wrongPart: 'the more beautiful', correction: 'the most beautiful', explanation: 'Superlative: "the most beautiful", not "the more".' },
          { id: 6, text: 'A tiger is more fast than a rabbit.', options: ['A tiger', 'is more fast', 'than', 'a rabbit'], correct: 1, wrongPart: 'is more fast', correction: 'is faster', explanation: '"Fast" is short → "faster", not "more fast".' },
          { id: 7, text: 'My bag is more heavier than yours.', options: ['My bag', 'is more heavier', 'than', 'yours'], correct: 1, wrongPart: 'is more heavier', correction: 'is heavier', explanation: 'Never use "more" with "-er": just "heavier".' },
          { id: 8, text: 'London is bigger as Paris.', options: ['London is', 'bigger', 'as', 'Paris'], correct: 2, wrongPart: 'as', correction: 'than', explanation: 'Comparative uses "than", not "as".' },
          { id: 9, text: 'This exercise is the more difficult of all.', options: ['This exercise', 'is', 'the more difficult', 'of all'], correct: 2, wrongPart: 'the more difficult', correction: 'the most difficult', explanation: 'Superlative uses "the most", not "the more".' },
          { id: 10, text: 'She is youngest student in the class.', options: ['She is', 'youngest', 'student', 'in the class'], correct: 1, wrongPart: 'youngest', correction: 'the youngest', explanation: 'Superlatives need "the": "the youngest".' },
          { id: 11, text: 'This is a biger house than mine.', options: ['This is', 'a biger', 'house', 'than mine'], correct: 1, wrongPart: 'a biger', correction: 'a bigger', explanation: '"Big" → double the g: "bigger".' },
          { id: 12, text: 'He is smarter of all students.', options: ['He is', 'smarter', 'of all', 'students'], correct: 2, wrongPart: 'of all', correction: 'of all students → use "the smartest"', explanation: 'Superlative: "the smartest of all students".' },
          { id: 13, text: 'This car is the more expensive in the lot.', options: ['This car', 'is', 'the more expensive', 'in the lot'], correct: 2, wrongPart: 'the more expensive', correction: 'the most expensive', explanation: 'Superlative: "the most expensive".' },
          { id: 14, text: 'She dances more beautiful than her sister.', options: ['She dances', 'more beautiful', 'than', 'her sister'], correct: 1, wrongPart: 'more beautiful', correction: 'more beautifully', explanation: 'Adverb form needed: "more beautifully".' },
          { id: 15, text: 'This is the hottest day then last summer.', options: ['This is', 'the hottest', 'day', 'then last summer'], correct: 3, wrongPart: 'then last summer', correction: 'than last summer', explanation: 'Comparative uses "than", not "then".' },
          { id: 16, text: 'He is taller as his father.', options: ['He is', 'taller', 'as', 'his father'], correct: 2, wrongPart: 'as', correction: 'than', explanation: 'Use "than" after comparative adjectives.' },
          { id: 17, text: 'That is the worse decision you could make.', options: ['That is', 'the worse', 'decision', 'you could make'], correct: 1, wrongPart: 'the worse', correction: 'the worst', explanation: '"Bad" → superlative: "the worst".' },
          { id: 18, text: 'She is more happier now.', options: ['She is', 'more happier', 'now', 'than before'], correct: 1, wrongPart: 'more happier', correction: 'happier', explanation: 'Never combine "more" and "-er".' },
          { id: 19, text: 'This is the difficultest test I have taken.', options: ['This is', 'the difficultest', 'test', 'I have taken'], correct: 1, wrongPart: 'the difficultest', correction: 'the most difficult', explanation: '"Difficult" is 3 syllables → "the most difficult".' },
          { id: 20, text: 'My phone is newer then yours.', options: ['My phone', 'is newer', 'then', 'yours'], correct: 2, wrongPart: 'then', correction: 'than', explanation: 'Comparative uses "than", not "then".' },
        ],
        transform: [
          { id: 1, text: 'Make comparative: "This book is interesting."', options: ['This book is interestinger.', 'This book is most interesting.', 'This book is more interesting.', 'This book is the most interesting.'], correct: 2, explanation: 'Long adjective → "more interesting".' },
          { id: 2, text: 'Make superlative: "She is tall."', options: ['She is taller.', 'She is the tallest.', 'She is most tall.', 'She is the taller.'], correct: 1, explanation: '"Tall" → superlative: "the tallest".' },
          { id: 3, text: 'Change to comparative: "This is a big car."', options: ['This car is more big.', 'This car is bigger.', 'This car is the biggest.', 'This car is biggest.'], correct: 1, explanation: '"Big" → comparative: "bigger".' },
          { id: 4, text: 'Use superlative: "The Amazon is a long river."', options: ['The Amazon is longer.', 'The Amazon is the most long river.', 'The Amazon is the longest river.', 'The Amazon is more long river.'], correct: 2, explanation: '"Long" → superlative: "the longest".' },
          { id: 5, text: 'Make comparative: "She is a careful driver."', options: ['She is more careful driver.', 'She is a more careful driver.', 'She is a carefuller driver.', 'She is the most careful driver.'], correct: 1, explanation: '"Careful" → "more careful".' },
          { id: 6, text: 'Change to superlative: "He is old in the group."', options: ['He is older.', 'He is most old.', 'He is the oldest.', 'He is the most old.'], correct: 2, explanation: '"Old" → superlative: "the oldest".' },
          { id: 7, text: 'Make comparative: "This road is narrow."', options: ['This road is narrower.', 'This road is more narrow.', 'This road is the narrowest.', 'Both A and B are acceptable.'], correct: 3, explanation: '"Narrow" (2 syllables) can take "-er" or "more".' },
          { id: 8, text: 'Use superlative: "This is a difficult exam."', options: ['This is the most difficult exam.', 'This is a difficultest exam.', 'This is more difficult exam.', 'This is the difficultest exam.'], correct: 0, explanation: '"Difficult" → "the most difficult".' },
          { id: 9, text: 'Change to comparative: "I am happy."', options: ['I am most happy.', 'I am the happiest.', 'I am happier.', 'I am more happy.'], correct: 2, explanation: '"Happy" → comparative: "happier".' },
          { id: 10, text: 'Make superlative: "She is a beautiful actress."', options: ['She is a more beautiful actress.', 'She is the most beautiful actress.', 'She is the beautifullest actress.', 'She is beautiful of all.'], correct: 1, explanation: '"Beautiful" → "the most beautiful".' },
          { id: 11, text: 'Use comparative: "He is fast." (comparing with Tom)', options: ['He is faster than Tom.', 'He is the fastest.', 'He is more fast than Tom.', 'He is the faster.'], correct: 0, explanation: '"Fast" → comparative: "faster than".' },
          { id: 12, text: 'Change to superlative: "It was a hot day."', options: ['It was the hottest day.', 'It was hoter day.', 'It was the most hot day.', 'It was hotter day.'], correct: 0, explanation: '"Hot" → double t: "the hottest".' },
          { id: 13, text: 'Make comparative: "This coffee is strong."', options: ['This coffee is more strong.', 'This coffee is stronger.', 'This coffee is the strongest.', 'Both A and B are acceptable.'], correct: 3, explanation: '"Strong" can use "-er" or "more".' },
          { id: 14, text: 'Use superlative: "She is a creative artist."', options: ['She is the most creative artist.', 'She is the creativest artist.', 'She is more creative artist.', 'She is a creativeest artist.'], correct: 0, explanation: '"Creative" → "the most creative".' },
          { id: 15, text: 'Change to comparative: "This coat is warm."', options: ['This coat is most warm.', 'This coat is warmer.', 'This coat is the warmest.', 'This coat is more warmer.'], correct: 1, explanation: '"Warm" → comparative: "warmer".' },
          { id: 16, text: 'Make superlative: "He is a young player."', options: ['He is a younger player.', 'He is the youngest player.', 'He is the most young player.', 'He is younger player.'], correct: 1, explanation: '"Young" → superlative: "the youngest".' },
          { id: 17, text: 'Use comparative: "This movie is boring." (compare with last week)', options: ['This movie is more boring than last week.', 'This movie is the most boring.', 'This movie is boringer than last week.', 'This movie is most boring than last week.'], correct: 0, explanation: '"Boring" → "more boring".' },
          { id: 18, text: 'Change to superlative: "He is a clever man."', options: ['He is a cleverer man.', 'He is the cleverest man.', 'He is a more clever man.', 'Both B and "the most clever" are acceptable.'], correct: 3, explanation: '"Clever" can form superlative both ways.' },
          { id: 19, text: 'Make comparative: "This path is long."', options: ['This path is more long.', 'This path is the longest.', 'This path is longer.', 'This path is most long.'], correct: 2, explanation: '"Long" → comparative: "longer".' },
          { id: 20, text: 'Use superlative: "It is an expensive phone."', options: ['It is the most expensive phone.', 'It is more expensive phone.', 'It is the expensivest phone.', 'It is the more expensive phone.'], correct: 0, explanation: '"Expensive" → "the most expensive".' },
        ],
        dialogue: [
          { id: 1, situation: 'Two friends comparing their phones.', dialogue: 'A: My phone has a bigger screen.\nB: But mine is ___ than yours. (fast)', options: ['the fastest', 'more fast', 'faster', 'most fast'], correct: 2, explanation: '"Fast" → comparative: "faster".' },
          { id: 2, situation: 'Students talking about subjects.', dialogue: 'A: Math is difficult, but what do you think?\nB: I think science is ___ than math.', options: ['more difficult', 'the most difficult', 'difficulter', 'most difficult'], correct: 0, explanation: '"Difficult" → comparative: "more difficult".' },
          { id: 3, situation: 'Talking about the weather.', dialogue: 'A: Is it cold outside?\nB: Yes! It\'s ___ day of the year.', options: ['the colder', 'coldest', 'the coldest', 'more cold'], correct: 2, explanation: 'Superlative: "the coldest day".' },
          { id: 4, situation: 'Comparing two movies.', dialogue: 'A: Did you like the first film or the second?\nB: The second was much ___ than the first.', options: ['entertaining', 'the most entertaining', 'more entertaining', 'most entertaining'], correct: 2, explanation: '"Entertaining" → comparative: "more entertaining".' },
          { id: 5, situation: 'At school, comparing test results.', dialogue: 'A: I got 75% on the test.\nB: Really? I got 90%! I got a ___ score than you.', options: ['high', 'the highest', 'more high', 'higher'], correct: 3, explanation: '"High" → comparative: "higher".' },
          { id: 6, situation: 'Two people comparing cities.', dialogue: 'A: Is New York or Los Angeles bigger?\nB: New York is ___ of the two.', options: ['the bigger', 'biggest', 'the biggest', 'more big'], correct: 0, explanation: 'Comparing two → "the bigger" (comparative with "the").' },
          { id: 7, situation: 'Discussing a restaurant.', dialogue: 'A: How was the food?\nB: It was ___ meal I\'ve ever had!', options: ['the tastiest', 'tastier', 'the most tasty', 'most tastiest'], correct: 0, explanation: '"Tasty" → superlative: "the tastiest".' },
          { id: 8, situation: 'Choosing between two houses.', dialogue: 'A: Which house do you prefer?\nB: The second one is ___ and has a garden.', options: ['more spacious', 'the most spacious', 'spaciouser', 'spaciousest'], correct: 0, explanation: '"Spacious" → comparative: "more spacious".' },
          { id: 9, situation: 'Talking about a marathon runner.', dialogue: 'A: Who won the race?\nB: Tom! He is the ___ runner on our team.', options: ['faster', 'most fast', 'more fast', 'fastest'], correct: 3, explanation: '"Fast" → superlative: "the fastest".' },
          { id: 10, situation: 'Shopping for a coat.', dialogue: 'A: This coat or that one?\nB: This one is ___ and also cheaper.', options: ['warm', 'the warmest', 'warmer', 'most warm'], correct: 2, explanation: '"Warm" → comparative: "warmer".' },
          { id: 11, situation: 'Two friends talking about books.', dialogue: 'A: Was the second book good?\nB: Yes! Even ___ than the first one.', options: ['the best', 'most good', 'better', 'the better'], correct: 2, explanation: '"Good" → comparative: "better".' },
          { id: 12, situation: 'Discussing a mountain.', dialogue: 'A: Is Everest the highest mountain?\nB: Yes, it is ___ mountain in the world.', options: ['higher', 'the highest', 'more high', 'the most high'], correct: 1, explanation: '"High" → superlative: "the highest".' },
          { id: 13, situation: 'In a sports class.', dialogue: 'A: Who is the best player here?\nB: Marco! He is ___ player I\'ve ever seen.', options: ['the most good', 'the best', 'better', 'the gooder'], correct: 1, explanation: '"Good" → superlative: "the best".' },
          { id: 14, situation: 'Comparing two routes to school.', dialogue: 'A: Which way is shorter?\nB: The park route is ___ than the main road.', options: ['shortest', 'more short', 'the shortest', 'shorter'], correct: 3, explanation: '"Short" → comparative: "shorter".' },
          { id: 15, situation: 'Talking about a summer vacation.', dialogue: 'A: Was the trip good?\nB: It was ___ vacation I\'ve ever had!', options: ['the most good', 'the goodest', 'the best', 'better'], correct: 2, explanation: '"Good" → superlative: "the best".' },
          { id: 16, situation: 'In a job interview.', dialogue: 'Interviewer: Why should we hire you?\nApplicant: I am ___ qualified than the other candidates.', options: ['most', 'the most', 'more', 'many'], correct: 2, explanation: '"More qualified" — comparative.' },
          { id: 17, situation: 'Comparing two laptops.', dialogue: 'A: Which laptop should I buy?\nB: This one is ___ expensive but much faster.', options: ['less', 'lesser', 'fewest', 'little'], correct: 0, explanation: '"Less expensive" = cheaper.' },
          { id: 18, situation: 'Talking about neighbours.', dialogue: 'A: Is your new neighbour friendly?\nB: Very! She is ___ person I know.', options: ['friendlier', 'the friendliest', 'the most friendly', 'Both B and C are acceptable'], correct: 3, explanation: '"Friendly" → "the friendliest" or "the most friendly".' },
          { id: 19, situation: 'Comparing two cities in summer.', dialogue: 'A: Is Dubai hot in summer?\nB: Yes! It is one of ___ cities in the world.', options: ['hotter', 'the hottest', 'the most hot', 'more hot'], correct: 1, explanation: '"Hot" → superlative: "the hottest".' },
          { id: 20, situation: 'Talking about food.', dialogue: 'A: How was the spicy curry?\nB: It was ___ dish I have ever eaten!', options: ['spicier', 'the most spiciest', 'the spiciest', 'more spicy'], correct: 2, explanation: '"Spicy" → superlative: "the spiciest".' },
        ],
      },
      {
        id: 'irregular-adjectives',
        title: 'Irregular Adjectives',
        icon: '⚡',
        guide: `## Noto'g'ri Sifatlar (Irregular Adjectives)

Ba'zi sifatlar oddiy daraja qoidalariga bo'ysunmaydi. Ularni yodlab olish kerak.

## Asosiy noto'g'ri sifatlar

| Oddiy | Qiyosiy | Orttirma |
|-------|---------|----------|
| good  | better  | the best |
| bad   | worse   | the worst |
| many  | more    | the most |
| much  | more    | the most |
| little (oz) | less | the least |
| far   | farther/further | the farthest/furthest |
| old   | older/elder | the oldest/eldest |

## Misollar
• This pizza is good, but that one is better. The Italian restaurant makes the best pizza.
• Yesterday was bad, but today is worse. Last month was the worst.
• She has more experience than him.
• This road goes the farthest.
• He is my elder brother.

## "Elder" va "older" farqi
• "Elder" faqat oila a'zolari uchun: my elder sister
• "Older" hamma narsa uchun: This building is older than that one.

## "Further" va "farther" farqi
• "Farther" — jismoniy masofa: The store is farther than I thought.
• "Further" — ko'chma ma'no: Let's discuss this further.`,
        questions: [
          { id: 1, text: 'What is the comparative form of "good"?', options: ['gooder', 'more good', 'best', 'better'], correct: 3, explanation: '"Good" is irregular: good → better → the best.' },
          { id: 2, text: 'What is the superlative form of "bad"?', options: ['baddest', 'the worst', 'the baddest', 'more bad'], correct: 1, explanation: '"Bad" is irregular: bad → worse → the worst.' },
          { id: 3, text: 'Today is ___ than yesterday. (bad)', options: ['badder', 'more bad', 'worst', 'worse'], correct: 3, explanation: '"Bad" → comparative: worse.' },
          { id: 4, text: 'This is ___ coffee I\'ve ever tasted! (good)', options: ['gooder', 'the goodest', 'the best', 'better'], correct: 2, explanation: '"Good" → superlative: the best.' },
          { id: 5, text: 'He has ___ money than me. (much → comparative)', options: ['much', 'most', 'more', 'many'], correct: 2, explanation: '"Much" → comparative: more.' },
          { id: 6, text: 'This is ___ film of all time. (good)', options: ['gooder', 'the goodest', 'better', 'the best'], correct: 3, explanation: '"Good" → superlative: the best.' },
          { id: 7, text: 'What is the comparative of "little" (meaning small amount)?', options: ['littler', 'more little', 'least', 'less'], correct: 3, explanation: '"Little" (amount) → less → the least.' },
          { id: 8, text: 'She felt ___ after taking the medicine. (bad)', options: ['badder', 'baddest', 'worse', 'worst'], correct: 2, explanation: '"Bad" → comparative: worse.' },
          { id: 9, text: 'Which is correct?', options: ['He is gooder than Tom.', 'He is more good than Tom.', 'He is better than Tom.', 'He is the best than Tom.'], correct: 2, explanation: '"Better" is the comparative of "good".' },
          { id: 10, text: 'What is the superlative of "many"?', options: ['the maniest', 'the most', 'the much', 'the more'], correct: 1, explanation: '"Many/much" → more → the most.' },
          { id: 11, text: 'I have ___ homework today than yesterday. (little → comparative)', options: ['littler', 'more little', 'less', 'least'], correct: 2, explanation: '"Little" (amount) → less.' },
          { id: 12, text: 'This is ___ pizza in the city! (good)', options: ['gooder', 'better', 'the best', 'the gooder'], correct: 2, explanation: '"Good" → superlative: the best.' },
          { id: 13, text: 'What is the comparative of "far" (distance)?', options: ['more far', 'farer', 'farther', 'the farthest'], correct: 2, explanation: '"Far" (distance) → farther/further.' },
          { id: 14, text: 'Your essay is ___ than mine. (bad)', options: ['badder', 'worser', 'worst', 'worse'], correct: 3, explanation: '"Bad" → comparative: worse.' },
          { id: 15, text: '"Elder" is used for:', options: ['objects', 'animals', 'family members', 'all comparisons'], correct: 2, explanation: '"Elder" is specifically used for family members: elder brother/sister.' },
          { id: 16, text: 'She is the ___ runner on the team. (good)', options: ['gooder', 'goodest', 'better', 'best'], correct: 3, explanation: '"Good" → superlative: best (with "the").' },
          { id: 17, text: 'The weather is getting ___. (bad)', options: ['badder', 'more bad', 'worst', 'worse'], correct: 3, explanation: '"Bad" → comparative: worse.' },
          { id: 18, text: 'Which pair is INCORRECT?', options: ['good / better', 'bad / worse', 'much / more', 'far / farer'], correct: 3, explanation: '"Farer" does not exist. "Far" → farther/further.' },
          { id: 19, text: 'He is my ___ brother. (family, older)', options: ['older', 'elder', 'eldest', 'oldest'], correct: 1, explanation: '"Elder" for family members: my elder brother.' },
          { id: 20, text: 'This hotel is ___ in the country. (bad → superlative)', options: ['the worst', 'the baddest', 'worse', 'the worsted'], correct: 0, explanation: '"Bad" → superlative: the worst.' },
          { id: 21, text: 'I want ___ information. (much → comparative)', options: ['much', 'most', 'more', 'many'], correct: 2, explanation: '"Much" → more.' },
          { id: 22, text: 'Which is the correct comparative of "good"?', options: ['gooder', 'more good', 'better', 'best'], correct: 2, explanation: '"Good" → better (irregular).' },
          { id: 23, text: 'The ___ athlete won the race. (good)', options: ['gooder', 'better', 'best', 'goodest'], correct: 2, explanation: '"Best" (superlative of good) means the top one.' },
          { id: 24, text: 'We need ___ time to finish this. (much → comparative)', options: ['much', 'most', 'more', 'many'], correct: 2, explanation: '"Much" → more (for uncountable time).' },
          { id: 25, text: 'Things went from bad to ___. (idiom: got worse)', options: ['worst', 'badly', 'worse', 'bad'], correct: 2, explanation: 'The phrase "from bad to worse" uses the comparative.' },
          { id: 26, text: '"Further" (not farther) usually means:', options: ['physical distance', 'additional/more', 'the same as farther', 'less distance'], correct: 1, explanation: '"Further" often means additional: further discussion, further details.' },
          { id: 27, text: 'What is the superlative of "little" (small amount)?', options: ['the littlest', 'the least', 'the less', 'the lower'], correct: 1, explanation: '"Little" → less → the least.' },
          { id: 28, text: 'Which sentence is correct?', options: ['He is more good than his brother.', 'He is gooder than his brother.', 'He is better than his brother.', 'He is best than his brother.'], correct: 2, explanation: '"Better" = comparative of "good".' },
          { id: 29, text: 'She did ___ on the test than last time. (bad)', options: ['badder', 'worse', 'worst', 'more bad'], correct: 1, explanation: '"Worse" is the comparative of "bad".' },
          { id: 30, text: 'My eldest son is a doctor. "Eldest" means:', options: ['youngest', 'oldest of all', 'more old', 'very old'], correct: 1, explanation: '"Eldest" = the most old (in family context) — the oldest of all.' },
        ],
        fillBlanks: [
          { id: 1, text: 'This coffee is ___ than the one I had yesterday. (good → comparative)', options: ['gooder', 'best', 'better', 'well'], correct: 2, explanation: '"Good" is irregular → comparative: "better".' },
          { id: 2, text: 'He is the ___ singer I have ever heard. (good → superlative)', options: ['gooder', 'goodest', 'better', 'best'], correct: 3, explanation: '"Good" → superlative: "the best".' },
          { id: 3, text: 'Today\'s weather is ___ than yesterday. (bad → comparative)', options: ['badder', 'more bad', 'worst', 'worse'], correct: 3, explanation: '"Bad" → comparative: "worse".' },
          { id: 4, text: 'That was ___ movie I have ever seen. (bad → superlative)', options: ['the worst', 'the baddest', 'worse', 'the worser'], correct: 0, explanation: '"Bad" → superlative: "the worst".' },
          { id: 5, text: 'She has ___ experience than her colleague. (much → comparative)', options: ['much', 'most', 'more', 'many'], correct: 2, explanation: '"Much" → comparative: "more".' },
          { id: 6, text: 'He has ___ books in the library. (many → superlative)', options: ['the most', 'the many', 'the much', 'the more'], correct: 0, explanation: '"Many" → superlative: "the most".' },
          { id: 7, text: 'We spent ___ money than we planned. (little → comparative)', options: ['littler', 'more little', 'less', 'least'], correct: 2, explanation: '"Little" (amount) → comparative: "less".' },
          { id: 8, text: 'She is my ___ sister. (old, family)', options: ['older', 'eldest', 'elder', 'oldest'], correct: 2, explanation: '"Elder" is used for family members, not "older".' },
          { id: 9, text: 'Of all options, this one costs ___. (little → superlative)', options: ['the less', 'the lesser', 'the least', 'the littlest'], correct: 2, explanation: '"Little" (amount) → superlative: "the least".' },
          { id: 10, text: 'She plays the piano ___ than anyone in the group. (well → comparative)', options: ['more well', 'best', 'better', 'gooder'], correct: 2, explanation: '"Well" → comparative: "better".' },
          { id: 11, text: 'Things went from bad to ___. (got worse)', options: ['worst', 'badly', 'worse', 'bad'], correct: 2, explanation: 'The phrase "from bad to worse" uses the comparative of "bad".' },
          { id: 12, text: 'He is the ___ player on the team. (good → superlative)', options: ['gooder', 'better', 'the best', 'goodest'], correct: 2, explanation: '"Good" → superlative: "the best".' },
          { id: 13, text: 'I feel ___ today than yesterday. (bad → comparative)', options: ['more bad', 'badder', 'worse', 'worst'], correct: 2, explanation: '"Bad" → comparative: "worse".' },
          { id: 14, text: 'The train station is ___ from here. (far → comparative)', options: ['farrer', 'more far', 'further', 'farest'], correct: 2, explanation: '"Far" → comparative: "farther" or "further".' },
          { id: 15, text: 'She is the ___ of all three sisters. (old, family)', options: ['the oldest', 'the elder', 'the eldest', 'the most old'], correct: 2, explanation: '"Eldest" = the oldest in family context.' },
          { id: 16, text: 'He wants ___ information. (much → comparative)', options: ['much', 'most', 'more', 'many'], correct: 2, explanation: '"Much" → comparative: "more".' },
          { id: 17, text: 'This is ___ result we could hope for. (bad → superlative)', options: ['the worse', 'the baddest', 'the worst', 'the most bad'], correct: 2, explanation: '"Bad" → superlative: "the worst".' },
          { id: 18, text: '"Far" used for additional meaning (not distance) becomes:', options: ['farther', 'farer', 'further', 'farthest'], correct: 2, explanation: '"Further" = additional/more (non-physical).' },
          { id: 19, text: 'She got ___ marks than her brother. (many → comparative)', options: ['many', 'more', 'most', 'much'], correct: 1, explanation: '"Many" → comparative: "more".' },
          { id: 20, text: 'This is ___ I have ever eaten. (good → superlative)', options: ['better', 'the best', 'the gooder', 'the goodest'], correct: 1, explanation: '"Good" → superlative: "the best".' },
        ],
        scrambled: [
          { id: 1, words: ['better', 'is', 'health', 'than', 'wealth'], answer: 'Health is better than wealth.', explanation: '"Good" → comparative: "better".' },
          { id: 2, words: ['the', 'best', 'team', 'are', 'we', 'in', 'the', 'city'], answer: 'We are the best team in the city.', explanation: '"Good" → superlative: "the best".' },
          { id: 3, words: ['is', 'worse', 'than', 'today', 'yesterday', 'weather', 'the'], answer: 'The weather today is worse than yesterday.', explanation: '"Bad" → comparative: "worse".' },
          { id: 4, words: ['the', 'was', 'day', 'worst', 'my', 'of', 'it', 'life'], answer: 'It was the worst day of my life.', explanation: '"Bad" → superlative: "the worst".' },
          { id: 5, words: ['more', 'need', 'we', 'time', 'to', 'finish'], answer: 'We need more time to finish.', explanation: '"Much" → comparative: "more".' },
          { id: 6, words: ['the', 'most', 'she', 'has', 'books', 'of', 'all'], answer: 'She has the most books of all.', explanation: '"Many" → superlative: "the most".' },
          { id: 7, words: ['less', 'I', 'sugar', 'want', 'please'], answer: 'I want less sugar please.', explanation: '"Little" → comparative: "less".' },
          { id: 8, words: ['the', 'least', 'this', 'is', 'expensive', 'option'], answer: 'This is the least expensive option.', explanation: '"Little" → superlative: "the least".' },
          { id: 9, words: ['better', 'she', 'piano', 'plays', 'anyone', 'than'], answer: 'She plays piano better than anyone.', explanation: '"Well" → comparative: "better".' },
          { id: 10, words: ['the', 'best', 'I', 'have', 'tasted', 'coffee', 'this', 'is', 'ever'], answer: 'This is the best coffee I have ever tasted.', explanation: '"Good" → superlative: "the best".' },
          { id: 11, words: ['brother', 'elder', 'is', 'my', 'a', 'doctor'], answer: 'My elder brother is a doctor.', explanation: '"Elder" is used for family members.' },
          { id: 12, words: ['went', 'bad', 'to', 'things', 'worse', 'from'], answer: 'Things went from bad to worse.', explanation: 'Idiom using comparative of "bad".' },
          { id: 13, words: ['further', 'discuss', 'this', 'let\'s'], answer: 'Let\'s discuss this further.', explanation: '"Further" = additional/more (non-physical use).' },
          { id: 14, words: ['the', 'farthest', 'he', 'ran', 'of', 'all'], answer: 'He ran the farthest of all.', explanation: '"Far" → superlative: "the farthest".' },
          { id: 15, words: ['worse', 'I', 'feel', 'today', 'than', 'yesterday'], answer: 'I feel worse today than yesterday.', explanation: '"Bad" → comparative: "worse".' },
          { id: 16, words: ['the', 'best', 'this', 'year', 'is', 'result'], answer: 'This is the best result this year.', explanation: '"Good" → superlative: "the best".' },
          { id: 17, words: ['more', 'experience', 'she', 'has', 'than', 'me'], answer: 'She has more experience than me.', explanation: '"Much" → comparative: "more".' },
          { id: 18, words: ['is', 'sister', 'eldest', 'my', 'a', 'nurse', 'the'], answer: 'My eldest sister is a nurse.', explanation: '"Eldest" = the oldest of all (family).' },
          { id: 19, words: ['the', 'of', 'she', 'most', 'all', 'got'], answer: 'She got the most of all.', explanation: '"Many" → superlative: "the most".' },
          { id: 20, words: ['better', 'is', 'practice', 'the', 'key', 'to', 'getting'], answer: 'Practice is the key to getting better.', explanation: '"Good" → comparative: "better".' },
        ],
        errorCorrection: [
          { id: 1, text: 'She is more good at tennis than her sister.', options: ['She is', 'more good', 'at tennis', 'than her sister'], correct: 1, wrongPart: 'more good', correction: 'better', explanation: '"Good" is irregular → comparative: "better".' },
          { id: 2, text: 'That was the baddest movie of the year.', options: ['That was', 'the baddest', 'movie', 'of the year'], correct: 1, wrongPart: 'the baddest', correction: 'the worst', explanation: '"Bad" is irregular → superlative: "the worst".' },
          { id: 3, text: 'I feel worser today than yesterday.', options: ['I feel', 'worser', 'today', 'than yesterday'], correct: 1, wrongPart: 'worser', correction: 'worse', explanation: '"Worse" is already the comparative — no "-r" needed.' },
          { id: 4, text: 'He is gooder than any player on the team.', options: ['He is', 'gooder', 'than any player', 'on the team'], correct: 1, wrongPart: 'gooder', correction: 'better', explanation: '"Good" → comparative: "better".' },
          { id: 5, text: 'This is the most worst result ever.', options: ['This is', 'the most worst', 'result', 'ever'], correct: 1, wrongPart: 'the most worst', correction: 'the worst', explanation: '"Worst" is already the superlative of "bad".' },
          { id: 6, text: 'She has least experience than him.', options: ['She has', 'least', 'experience', 'than him'], correct: 1, wrongPart: 'least', correction: 'less', explanation: 'Comparative: "less experience", not "least".' },
          { id: 7, text: 'He ran the most far of all the runners.', options: ['He ran', 'the most far', 'of all', 'the runners'], correct: 1, wrongPart: 'the most far', correction: 'the farthest / the furthest', explanation: '"Far" → superlative: "the farthest/furthest".' },
          { id: 8, text: 'My older sister lives in London. (family context)', options: ['My', 'older', 'sister', 'lives in London'], correct: 1, wrongPart: 'older', correction: 'elder', explanation: 'For family members, prefer "elder sister".' },
          { id: 9, text: 'Things went from bad to most bad.', options: ['Things went', 'from bad', 'to most bad', 'quickly'], correct: 2, wrongPart: 'to most bad', correction: 'to worse', explanation: 'Idiom: "from bad to worse" (comparative).' },
          { id: 10, text: 'She did more well on the exam this time.', options: ['She did', 'more well', 'on the exam', 'this time'], correct: 1, wrongPart: 'more well', correction: 'better', explanation: '"Well" → comparative: "better".' },
          { id: 11, text: 'He has the most much experience in the team.', options: ['He has', 'the most much', 'experience', 'in the team'], correct: 1, wrongPart: 'the most much', correction: 'the most', explanation: '"Much" → superlative: "the most".' },
          { id: 12, text: 'This is worser news I\'ve heard all week.', options: ['This is', 'worser', 'news', 'I\'ve heard all week'], correct: 1, wrongPart: 'worser', correction: 'the worst', explanation: '"Worst" is the superlative of "bad". "Worser" doesn\'t exist.' },
          { id: 13, text: 'She got the most marks of anyone. She is the better student.', options: ['She got the most marks', 'of anyone', 'She is', 'the better student'], correct: 3, wrongPart: 'the better student', correction: 'the best student', explanation: 'Superlative: "the best student".' },
          { id: 14, text: 'I need less books for this course.', options: ['I need', 'less books', 'for this', 'course'], correct: 1, wrongPart: 'less books', correction: 'fewer books', explanation: '"Books" is countable → "fewer books".' },
          { id: 15, text: 'He is the eldest building in the city.', options: ['He is', 'the eldest', 'building', 'in the city'], correct: 1, wrongPart: 'the eldest', correction: 'the oldest', explanation: '"Eldest" is only for family members. Use "oldest" for buildings.' },
          { id: 16, text: 'She played more good piano today.', options: ['She played', 'more good', 'piano', 'today'], correct: 1, wrongPart: 'more good', correction: 'better', explanation: '"Good" → comparative adverb: "better".' },
          { id: 17, text: 'He needs farther help from the teacher.', options: ['He needs', 'farther', 'help', 'from the teacher'], correct: 1, wrongPart: 'farther', correction: 'further', explanation: '"Further" = additional (non-physical). "Farther" = physical distance.' },
          { id: 18, text: 'The goodest students got an award.', options: ['The goodest', 'students', 'got', 'an award'], correct: 0, wrongPart: 'The goodest', correction: 'The best', explanation: '"Good" → superlative: "the best".' },
          { id: 19, text: 'I would prefer a more better solution.', options: ['I would prefer', 'a more better', 'solution', 'for this'], correct: 1, wrongPart: 'a more better', correction: 'a better', explanation: '"Better" is already comparative — don\'t add "more".' },
          { id: 20, text: 'This situation went from bad to worser.', options: ['This situation', 'went', 'from bad', 'to worser'], correct: 3, wrongPart: 'to worser', correction: 'to worse', explanation: '"Worse" is already comparative — "worser" doesn\'t exist.' },
        ],
        transform: [
          { id: 1, text: 'Make comparative: "She sings well."', options: ['She sings more well.', 'She sings gooder.', 'She sings better.', 'She sings weller.'], correct: 2, explanation: '"Well" → comparative: "better".' },
          { id: 2, text: 'Make superlative: "He plays well."', options: ['He plays the goodest.', 'He plays the best.', 'He plays the most well.', 'He plays the weller.'], correct: 1, explanation: '"Well" → superlative: "the best".' },
          { id: 3, text: 'Use comparative: "The food is bad."', options: ['The food is more bad.', 'The food is badder.', 'The food is worse.', 'The food is worst.'], correct: 2, explanation: '"Bad" → comparative: "worse".' },
          { id: 4, text: 'Make superlative: "This is a bad outcome."', options: ['This is the worse outcome.', 'This is the baddest outcome.', 'This is the most bad outcome.', 'This is the worst outcome.'], correct: 3, explanation: '"Bad" → superlative: "the worst".' },
          { id: 5, text: 'Change to comparative: "I have much homework."', options: ['I have much more homework.', 'I have more homework.', 'I have most homework.', 'I have many homework.'], correct: 1, explanation: '"Much" → comparative: "more".' },
          { id: 6, text: 'Use superlative: "She has many books."', options: ['She has the most books.', 'She has the many books.', 'She has the much books.', 'She has the more books.'], correct: 0, explanation: '"Many" → superlative: "the most".' },
          { id: 7, text: 'Change to comparative (opposite): "We need more money."', options: ['We need less money.', 'We need lesser money.', 'We need fewer money.', 'We need little money.'], correct: 0, explanation: '"More" → opposite comparative: "less".' },
          { id: 8, text: 'Transform: "She is old." (family member, superlative of 3 sisters)', options: ['She is the oldest.', 'She is the elder.', 'She is the eldest.', 'She is elderer.'], correct: 2, explanation: '"Eldest" = superlative for family: "the eldest of 3 sisters".' },
          { id: 9, text: 'Make comparative (opposite): "She has the most experience."', options: ['She has the fewest experience.', 'She has less experience.', 'She has the least experience.', 'She has fewer experience.'], correct: 1, explanation: '"Most" → opposite comparative: "less experience".' },
          { id: 10, text: 'Use superlative (opposite): "This is the most expensive hotel."', options: ['This is the cheapest hotel.', 'This is the least expensive hotel.', 'This is the less expensive hotel.', 'This is the fewer expensive hotel.'], correct: 1, explanation: '"The most expensive" → opposite: "the least expensive".' },
          { id: 11, text: 'Change to comparative: "He is good at chess."', options: ['He is gooder at chess.', 'He is more good at chess.', 'He is better at chess.', 'He is best at chess.'], correct: 2, explanation: '"Good" → comparative: "better".' },
          { id: 12, text: 'Transform: "Today was a bad day." (superlative)', options: ['Today was the worse day.', 'Today was the worst day.', 'Today was the baddest day.', 'Today was the most bad day.'], correct: 1, explanation: '"Bad" → superlative: "the worst".' },
          { id: 13, text: 'Make comparative: "There are many students here."', options: ['There are much students here.', 'There are more students here.', 'There are most students here.', 'There are the most students here.'], correct: 1, explanation: '"Many" → comparative: "more".' },
          { id: 14, text: 'Use correct form: "She ate ___ food than me." (little)', options: ['She ate less food than me.', 'She ate least food than me.', 'She ate little food than me.', 'She ate fewer food than me.'], correct: 0, explanation: '"Little" → comparative: "less".' },
          { id: 15, text: 'Transform: "He walked far." (farther vs further for additional details)', options: ['He needs to walk farther.', 'He needs to walk further.', 'He walks the farthest.', 'He walks more far.'], correct: 1, explanation: '"Further" for non-physical/additional meaning.' },
          { id: 16, text: 'Change to superlative: "He is a good teacher."', options: ['He is a better teacher.', 'He is the goodest teacher.', 'He is the best teacher.', 'He is a most good teacher.'], correct: 2, explanation: '"Good" → superlative: "the best".' },
          { id: 17, text: 'Use comparative: "He did badly on the test."', options: ['He did more badly.', 'He did worse.', 'He did badder.', 'He did worst.'], correct: 1, explanation: '"Badly" → comparative: "worse".' },
          { id: 18, text: 'Make superlative: "She has little patience."', options: ['She has the most little patience.', 'She has the least patience.', 'She has the lessest patience.', 'She has the fewer patience.'], correct: 1, explanation: '"Little" → superlative: "the least".' },
          { id: 19, text: 'Transform: "That idea is good." (into better comparison)', options: ['That idea is more good.', 'That idea is better than this one.', 'That idea is the goodest.', 'That idea is the most good.'], correct: 1, explanation: '"Good" → comparative: "better than".' },
          { id: 20, text: 'Use the correct irregular form: "This is ___ I can do."', options: ['the most good', 'the goodest', 'the best', 'the gooder'], correct: 2, explanation: '"Good" → superlative: "the best".' },
        ],
        dialogue: [
          { id: 1, situation: 'Friends talking about a movie.', dialogue: 'A: Did you like the film?\nB: It was ___ movie I\'ve ever seen!', options: ['the best', 'the goodest', 'gooder', 'better'], correct: 0, explanation: '"Good" → superlative: "the best".' },
          { id: 2, situation: 'A doctor talks to a patient.', dialogue: 'Doctor: How do you feel today?\nPatient: I feel ___ than yesterday.', options: ['badder', 'more bad', 'worser', 'worse'], correct: 3, explanation: '"Bad" → comparative: "worse".' },
          { id: 3, situation: 'Two students comparing their test scores.', dialogue: 'A: I scored 60 on the test.\nB: That\'s ___ than me! I only got 50.', options: ['gooder', 'the goodest', 'better', 'more good'], correct: 2, explanation: '"Good" → comparative: "better".' },
          { id: 4, situation: 'At work, comparing projects.', dialogue: 'Manager: Which option should we choose?\nEmployee: This plan is ___ than the others.', options: ['the best', 'gooder', 'better', 'the most good'], correct: 2, explanation: '"Good" → comparative: "better".' },
          { id: 5, situation: 'Discussing a holiday.', dialogue: 'A: Was your holiday good?\nB: Yes! It was ___ holiday I\'ve ever had!', options: ['the better', 'the goodest', 'the best', 'more good'], correct: 2, explanation: '"Good" → superlative: "the best".' },
          { id: 6, situation: 'Talking about mistakes.', dialogue: 'A: I failed the test again.\nB: Don\'t worry. Last week was ___, but things will get better.', options: ['the worst', 'more bad', 'the baddest', 'worser'], correct: 0, explanation: '"Bad" → superlative: "the worst".' },
          { id: 7, situation: 'Two siblings talking.', dialogue: 'A: Where does your older brother live?\nB: My ___ brother lives in London.', options: ['eldest', 'elder', 'oldest', 'eldering'], correct: 1, explanation: '"Elder" is used for family members.' },
          { id: 8, situation: 'Buying something.', dialogue: 'A: This phone is expensive.\nB: Yes, but it has ___ features than the cheaper ones.', options: ['much', 'most', 'more', 'many'], correct: 2, explanation: '"Many" → comparative: "more features".' },
          { id: 9, situation: 'At a music school.', dialogue: 'Teacher: Who plays piano best in your family?\nStudent: My ___ sister. She has been playing for 10 years.', options: ['elder', 'eldest', 'older', 'oldest'], correct: 1, explanation: '"Eldest" = the oldest of all siblings.' },
          { id: 10, situation: 'Discussing bad news.', dialogue: 'A: I heard about the accident.\nB: Yes, and it got ___ — more people were injured later.', options: ['more bad', 'worst', 'worse', 'the worst'], correct: 2, explanation: '"Bad" → comparative: "worse".' },
          { id: 11, situation: 'At school, comparing performance.', dialogue: 'A: How did you do on the exam?\nB: Much ___ than last time! I studied hard.', options: ['more good', 'gooder', 'better', 'the best'], correct: 2, explanation: '"Good" → comparative: "better".' },
          { id: 12, situation: 'Talking about saving money.', dialogue: 'A: We need to spend ___ money this month.\nB: Agreed. Let\'s cut some expenses.', options: ['few', 'lesser', 'less', 'little'], correct: 2, explanation: '"Much" → comparative: "less money".' },
          { id: 13, situation: 'Meeting a famous musician.', dialogue: 'A: He is an amazing pianist!\nB: Yes, he is ___ in the country.', options: ['better', 'the gooder', 'the best', 'the most good'], correct: 2, explanation: '"Good" → superlative: "the best".' },
          { id: 14, situation: 'Two friends complaining about weather.', dialogue: 'A: It was cold yesterday.\nB: Today is ___. I can\'t believe how cold it is!', options: ['worser', 'more worse', 'worse', 'the worst'], correct: 2, explanation: '"Bad" → comparative: "worse".' },
          { id: 15, situation: 'Talking about a school project.', dialogue: 'A: How is your project going?\nB: Not great. My ___ nightmare was the presentation.', options: ['worse', 'badder', 'worst', 'the worst'], correct: 2, explanation: '"Bad" → superlative: "worst".' },
          { id: 16, situation: 'Planning a route.', dialogue: 'A: Which way should we go?\nB: Let\'s discuss ___ options before deciding.', options: ['farther', 'further', 'farer', 'most far'], correct: 1, explanation: '"Further" = additional (non-physical meaning).' },
          { id: 17, situation: 'Comparing two job candidates.', dialogue: 'A: Who has more experience?\nB: Sarah has ___ experience of all the candidates.', options: ['the most', 'the more', 'most more', 'the many'], correct: 0, explanation: '"Much" → superlative: "the most".' },
          { id: 18, situation: 'After a sports competition.', dialogue: 'A: Who was the best player?\nB: Maria! She played ___ of everyone.', options: ['the goodest', 'the best', 'better', 'the most good'], correct: 1, explanation: '"Well" → superlative: "the best".' },
          { id: 19, situation: 'A sick person recovering.', dialogue: 'A: How do you feel now?\nB: ___ than before, thank you!', options: ['gooder', 'more good', 'the best', 'better'], correct: 3, explanation: '"Good" → comparative: "better".' },
          { id: 20, situation: 'Looking for a cheap hotel.', dialogue: 'A: Which hotel is cheapest?\nB: This one has ___ prices of all.', options: ['the less', 'the fewest', 'the least', 'the lesser'], correct: 2, explanation: '"Little" → superlative: "the least" (used for prices/amounts).' },
        ],
      },
      {
        id: 'degrees-adjectives-2',
        title: 'Degrees of Adjectives (Advanced)',
        icon: '🏆',
        guide: `## Sifat Darajalari (Ilg'or bosqich)

## Qisqartirma qoidalar eslatmasi

### 1. Bir bo'g'inli sifatlar → -er/-est
• tall, short, fast, slow, big, small, clean, dark

### 2. Ikki bo'g'inli sifatlar
-er/-est ishlatishi mumkin: simple, quiet, clever, narrow, gentle
• simpler/the simplest
• quieter/the quietest

yoki more/most: modern, careless, often

### 3. Uch va undan ko'p bo'g'inli sifatlar → more/most
• important → more important → the most important
• comfortable → more comfortable → the most comfortable

## Double comparatives
Ikki jarayon bir vaqtda o'sayotganini ifodalaydi:
• The harder you work, the better the results.
• The more you practice, the more fluent you become.

## "Less" va "the least"
Qiyosiy va orttirma darajaning teskarisi:
• This method is less complicated than the other.
• This is the least expensive option.

## Absolute superlatives
• extremely/very + adjective: She is extremely beautiful.
• Tildagi nisbiy ifoda: one of the most beautiful cities`,
        questions: [
          { id: 1, text: 'The ___ I study, the ___ I learn. (more/more)', options: ['more/more', 'most/most', 'much/much', 'many/many'], correct: 0, explanation: 'Double comparative: The more...the more.' },
          { id: 2, text: 'Which adjective uses -er for comparative?', options: ['comfortable', 'important', 'intelligent', 'simple'], correct: 3, explanation: '"Simple" (2 syllables) → simpler.' },
          { id: 3, text: 'This exercise is ___ than the last one. (less + difficult)', options: ['less difficult', 'the least difficult', 'lesser difficult', 'difficult less'], correct: 0, explanation: '"Less" = opposite of "more" for comparison.' },
          { id: 4, text: 'What is the opposite comparative of "more interesting"?', options: ['lesser interesting', 'fewer interesting', 'less interesting', 'not interesting'], correct: 2, explanation: '"Less interesting" = less than interesting (not as interesting).' },
          { id: 5, text: 'The ___ you eat junk food, the ___ you\'ll be. (less/healthier)', options: ['less/healthier', 'fewer/healthy', 'less/more healthy', 'little/health'], correct: 0, explanation: 'Double comparative: The less...the healthier.' },
          { id: 6, text: 'This is ___ expensive option available. (least)', options: ['the less', 'the fewest', 'the least', 'the lower'], correct: 2, explanation: '"The least expensive" = the cheapest (opposite of most expensive).' },
          { id: 7, text: 'Which uses "more" in comparative (NOT -er)?', options: ['fast', 'tall', 'clever', 'beautiful'], correct: 3, explanation: '"Beautiful" has 3 syllables → more beautiful.' },
          { id: 8, text: '"Quieter" is the comparative of:', options: ['quite', 'quiet', 'quit', 'quickly'], correct: 1, explanation: '"Quiet" (2 syllables) → quieter.' },
          { id: 9, text: 'She is one of ___ students in the class. (smart)', options: ['the smarter', 'the smartest', 'the most smart', 'the most smarter'], correct: 1, explanation: '"One of the smartest" — superlative with "one of".' },
          { id: 10, text: 'The problem is ___ than we thought. (serious)', options: ['seriouser', 'more serious', 'most serious', 'seriousest'], correct: 1, explanation: '"Serious" (3 syllables) → more serious.' },
          { id: 11, text: 'The ___ money you spend, the ___ you have left. (more/less)', options: ['more/fewer', 'more/less', 'much/little', 'many/few'], correct: 1, explanation: 'Double comparative with uncountable money: more/less.' },
          { id: 12, text: 'Is "cleverer" correct?', options: ['No, always "more clever"', 'Yes, it is acceptable', 'No, it is "the cleverest"', 'It depends on context'], correct: 1, explanation: '"Cleverer" is acceptable — 2-syllable adjectives can take -er.' },
          { id: 13, text: 'This is ___ possible solution. (simple + superlative)', options: ['simplest', 'the most simple', 'the simplest', 'more simple'], correct: 2, explanation: '"Simple" → the simplest OR the most simple.' },
          { id: 14, text: '"Less" is used as the opposite of:', options: ['many', 'few', 'more', 'most'], correct: 2, explanation: '"Less" is the comparative opposite of "more".' },
          { id: 15, text: 'The ___ I sleep, the ___ I feel. (less/worse)', options: ['less/worst', 'less/worse', 'few/bad', 'little/badly'], correct: 1, explanation: 'Double comparative: The less...the worse.' },
          { id: 16, text: 'Which sentence uses "least" correctly?', options: ['She is least happy.', 'It is the least interesting book I read.', 'This is least expensive.', 'She is the least happy person.'], correct: 3, explanation: '"The least happy" — correct: "the + least + adjective".' },
          { id: 17, text: 'Three-syllable adjectives always use:', options: ['-er / -est', 'more / the most', 'both work', 'neither'], correct: 1, explanation: '3+ syllable adjectives use "more" and "the most".' },
          { id: 18, text: '"Narrower" is the comparative of:', options: ['narrow', 'narrows', 'narrr', 'narrow (wrong form)'], correct: 0, explanation: '"Narrow" (2 syllables) → narrower.' },
          { id: 19, text: 'The ___ you practice English, the ___ you will become. (more/better)', options: ['many/good', 'more/better', 'most/best', 'much/well'], correct: 1, explanation: 'Double comparative: The more...the better.' },
          { id: 20, text: 'Which is the superlative of "little" (adjective, small size)?', options: ['the least', 'the smallest', 'the littlest', 'the lower'], correct: 2, explanation: '"Little" (size) → littler → the littlest. (NOT the least, which is for amounts).' },
          { id: 21, text: 'I find this method ___ than the previous one. (useful, negative comparison)', options: ['less useful', 'fewer useful', 'not usefuller', 'the least useful'], correct: 0, explanation: '"Less useful" = not as useful.' },
          { id: 22, text: 'Which has -er as comparative?', options: ['difficult', 'important', 'modern', 'simple'], correct: 3, explanation: '"Simple" (2 syllables) → simpler.' },
          { id: 23, text: '"The more expensive, the better" means:', options: ['Price doesn\'t matter', 'Higher price = lower quality', 'Higher price = higher quality (generally)', 'The item is affordable'], correct: 2, explanation: 'This phrase implies higher price generally means better quality.' },
          { id: 24, text: 'What is the comparative of "gentle"?', options: ['gentler', 'more gentle', 'gentlier', 'Both A and B are acceptable'], correct: 3, explanation: '"Gentle" (2 syllables) → gentler OR more gentle, both acceptable.' },
          { id: 25, text: 'This is ___ attractive design of the three. (least)', options: ['less', 'the least', 'fewer', 'not the most'], correct: 1, explanation: '"The least attractive" comparing three options.' },
          { id: 26, text: 'Absolute superlative uses:', options: ['-est only', 'the most only', 'extremely/very + adjective', 'all of the above'], correct: 2, explanation: 'Absolute superlative can use adverbs like "extremely, very" before the adjective.' },
          { id: 27, text: 'The ___ we prepared, the ___ we felt. (more/more confident)', options: ['more/more confident', 'most/most confident', 'much/confident', 'many/confidently'], correct: 0, explanation: 'Double comparative: The more we prepared, the more confident we felt.' },
          { id: 28, text: '"She is the least experienced candidate." This means she has:', options: ['the most experience', 'no experience at all', 'less experience than all others', 'some experience'], correct: 2, explanation: '"The least experienced" = lowest level of experience among all.' },
          { id: 29, text: 'Which adjective has an irregular comparative?', options: ['tall', 'slow', 'far', 'clean'], correct: 2, explanation: '"Far" is irregular: far → farther/further.' },
          { id: 30, text: '"One of the most important" is:', options: ['wrong usage', 'correct — superlative with "one of"', 'should be "one of most important"', 'should be "the importantest"'], correct: 1, explanation: '"One of the most + superlative" is a very common and correct pattern.' },
        ],
        fillBlanks: [
          { id: 1, text: 'The ___ you study, the ___ you will learn.', options: ['more / more', 'most / most', 'much / much', 'many / many'], correct: 0, explanation: 'Double comparative: "The more...the more".' },
          { id: 2, text: 'This exercise is ___ difficult than the last one.', options: ['fewer', 'lesser', 'less', 'little'], correct: 2, explanation: '"Less" is the opposite of "more" in comparisons.' },
          { id: 3, text: 'This is ___ interesting book I have read. (superlative)', options: ['least', 'the least', 'less', 'the less'], correct: 1, explanation: '"The least interesting" = the most boring.' },
          { id: 4, text: 'The problem is ___ serious than we thought.', options: ['more', 'much more', 'the most', 'lesser'], correct: 1, explanation: '"Much more serious" emphasises a larger difference.' },
          { id: 5, text: 'She is one of ___ students in the school.', options: ['the smarter', 'the smartest', 'smart', 'the more smart'], correct: 1, explanation: '"One of the smartest" — superlative in "one of" phrases.' },
          { id: 6, text: 'The ___ money you spend, the ___ you save.', options: ['more / less', 'most / least', 'much / little', 'many / few'], correct: 0, explanation: 'Double comparative: "The more...the less".' },
          { id: 7, text: 'Which adjective uses -er for comparative? (2 syllables)', options: ['comfortable', 'important', 'intelligent', 'simple'], correct: 3, explanation: '"Simple" → simpler (2 syllables, ends in -le).' },
          { id: 8, text: 'This option is ___ expensive. (not as expensive — opposite superlative)', options: ['the least', 'the less', 'the lesser', 'the fewest'], correct: 0, explanation: '"The least expensive" = cheapest among all.' },
          { id: 9, text: 'She worked ___ carefully than before.', options: ['more', 'most', 'much', 'many'], correct: 0, explanation: '"More carefully" — adverb comparative.' },
          { id: 10, text: '"Quieter" is the comparative of:', options: ['quite', 'quiet', 'quit', 'quicken'], correct: 1, explanation: '"Quiet" (2 syllables) → quieter.' },
          { id: 11, text: 'The ___ you sleep, the ___ you feel.', options: ['less / worse', 'fewer / bad', 'little / badly', 'less / worst'], correct: 0, explanation: 'Double comparative: "The less...the worse".' },
          { id: 12, text: 'Which sentence uses "least" correctly?', options: ['She is least happy.', 'This is least expensive.', 'She is the least happy person.', 'He is least clever.'], correct: 2, explanation: '"The least happy" — needs "the": "the least + adjective".' },
          { id: 13, text: 'Three-syllable adjectives always use:', options: ['-er / -est', 'more / the most', 'both work equally', 'neither form'], correct: 1, explanation: '3+ syllable adjectives always use "more" and "the most".' },
          { id: 14, text: '"Less" is used as the opposite of:', options: ['many', 'few', 'more', 'most'], correct: 2, explanation: '"Less" is the comparative opposite of "more".' },
          { id: 15, text: 'She found the second method ___ useful.', options: ['least', 'fewer', 'less', 'little'], correct: 2, explanation: '"Less useful" = not as useful as before.' },
          { id: 16, text: 'This is ___ attractive option of all three.', options: ['less', 'the least', 'fewer', 'the lower'], correct: 1, explanation: '"The least attractive" = the most unattractive of all.' },
          { id: 17, text: 'The ___ we practiced, the ___ we performed.', options: ['more / better', 'most / best', 'much / well', 'many / good'], correct: 0, explanation: 'Double comparative: "The more we practiced, the better we performed".' },
          { id: 18, text: 'Is "cleverer" an acceptable form?', options: ['No, always "more clever"', 'Yes, it is acceptable', 'No, only "the cleverest"', 'Only in writing'], correct: 1, explanation: '"Cleverer" is acceptable — 2-syllable adjectives can take -er.' },
          { id: 19, text: 'She is one of ___ scientists in the country.', options: ['the most talented', 'the more talented', 'most talented', 'talent'], correct: 0, explanation: '"One of the most talented" — superlative after "one of".' },
          { id: 20, text: '"Absolute superlative" means using:', options: ['-est only', 'the most + adjective', 'extremely/very + adjective', '-er + noun'], correct: 2, explanation: 'Absolute superlative: extremely/very beautiful (not a comparison).' },
        ],
        scrambled: [
          { id: 1, words: ['harder', 'you', 'better', 'work', 'the', 'the', 'results', 'the'], answer: 'The harder you work, the better the results.', explanation: 'Double comparative pattern.' },
          { id: 2, words: ['less', 'this', 'is', 'method', 'complicated'], answer: 'This method is less complicated.', explanation: '"Less" = opposite of "more".' },
          { id: 3, words: ['the', 'least', 'option', 'this', 'is', 'expensive'], answer: 'This is the least expensive option.', explanation: '"The least expensive" = cheapest.' },
          { id: 4, words: ['more', 'you', 'practice', 'the', 'fluent', 'become', 'the', 'you', 'more'], answer: 'The more you practice, the more fluent you become.', explanation: 'Double comparative.' },
          { id: 5, words: ['she', 'is', 'scientists', 'most', 'the', 'one', 'of', 'talented'], answer: 'She is one of the most talented scientists.', explanation: '"One of the most + superlative" pattern.' },
          { id: 6, words: ['the', 'less', 'you', 'eat', 'junk', 'food', 'healthier', 'the', 'be', 'will', 'you'], answer: 'The less you eat junk food, the healthier you will be.', explanation: 'Double comparative with "less".' },
          { id: 7, words: ['simpler', 'is', 'this', 'than', 'approach', 'the', 'other', 'one'], answer: 'This approach is simpler than the other one.', explanation: '"Simple" (2 syllables) → "simpler".' },
          { id: 8, words: ['useful', 'less', 'second', 'is', 'method', 'the'], answer: 'The second method is less useful.', explanation: '"Less useful" = not as useful.' },
          { id: 9, words: ['interesting', 'most', 'this', 'is', 'the', 'of', 'course', 'least', 'the', 'four'], answer: 'This is the least interesting of the four courses.', explanation: '"The least interesting" = the most boring.' },
          { id: 10, words: ['more', 'we', 'confident', 'felt', 'the', 'prepared', 'more', 'we', 'the'], answer: 'The more we prepared, the more confident we felt.', explanation: 'Double comparative.' },
          { id: 11, words: ['she', 'is', 'class', 'students', 'one', 'of', 'most', 'the', 'hardworking', 'in', 'the'], answer: 'She is one of the most hardworking students in the class.', explanation: '"One of the most hardworking" — correct pattern.' },
          { id: 12, words: ['the', 'sleep', 'you', 'worse', 'less', 'feel', 'you', 'the'], answer: 'The less you sleep, the worse you feel.', explanation: 'Double comparative: "The less...the worse".' },
          { id: 13, words: ['important', 'most', 'the', 'is', 'one', 'health', 'of', 'things'], answer: 'Health is one of the most important things.', explanation: '"One of the most important" — common superlative pattern.' },
          { id: 14, words: ['this', 'is', 'option', 'least', 'expensive', 'the', 'of', 'all'], answer: 'This is the least expensive option of all.', explanation: '"The least expensive" = cheapest of all.' },
          { id: 15, words: ['quieter', 'room', 'is', 'than', 'the', 'classroom', 'library', 'the'], answer: 'The library is quieter than the classroom.', explanation: '"Quiet" (2 syllables) → "quieter".' },
          { id: 16, words: ['more', 'money', 'you', 'less', 'the', 'spend', 'save', 'the', 'you'], answer: 'The more money you spend, the less you save.', explanation: 'Double comparative: "The more...the less".' },
          { id: 17, words: ['the', 'complicated', 'least', 'is', 'solution', 'this'], answer: 'This solution is the least complicated.', explanation: '"The least complicated" = simplest.' },
          { id: 18, words: ['more', 'she', 'studied', 'performed', 'she', 'better', 'the', 'the'], answer: 'The more she studied, the better she performed.', explanation: 'Double comparative.' },
          { id: 19, words: ['less', 'than', 'this', 'is', 'the', 'method', 'effective', 'other'], answer: 'This method is less effective than the other.', explanation: '"Less effective" = not as effective.' },
          { id: 20, words: ['is', 'important', 'extremely', 'this'], answer: 'This is extremely important.', explanation: '"Extremely + adjective" = absolute superlative form.' },
        ],
        errorCorrection: [
          { id: 1, text: 'The more you study, the most you learn.', options: ['The more', 'you study', 'the most', 'you learn'], correct: 2, wrongPart: 'the most', correction: 'the more', explanation: 'Double comparative: "The more...the more".' },
          { id: 2, text: 'This book is the lesser interesting of all.', options: ['This book is', 'the lesser', 'interesting', 'of all'], correct: 1, wrongPart: 'the lesser', correction: 'the least', explanation: '"The least" is the superlative opposite of "the most".' },
          { id: 3, text: 'She is one of most talented people I know.', options: ['She is', 'one of', 'most talented', 'people I know'], correct: 2, wrongPart: 'most talented', correction: 'the most talented', explanation: '"One of the most + adjective" requires "the".' },
          { id: 4, text: 'This is less important that we thought.', options: ['This is', 'less important', 'that', 'we thought'], correct: 2, wrongPart: 'that', correction: 'than', explanation: '"Less important than", not "that".' },
          { id: 5, text: 'He is the more experienced candidate of all.', options: ['He is', 'the more experienced', 'candidate', 'of all'], correct: 1, wrongPart: 'the more experienced', correction: 'the most experienced', explanation: 'Superlative: "the most experienced".' },
          { id: 6, text: 'The harder you work, the best results you get.', options: ['The harder', 'you work', 'the best', 'results you get'], correct: 2, wrongPart: 'the best', correction: 'the better', explanation: 'Double comparative: "the better results".' },
          { id: 7, text: 'This solution is least complicated than the other.', options: ['This solution is', 'least complicated', 'than', 'the other'], correct: 1, wrongPart: 'least complicated', correction: 'less complicated', explanation: '"Less" for comparative; "least" for superlative.' },
          { id: 8, text: 'She found the method fewer useful.', options: ['She found', 'the method', 'fewer useful', 'for her work'], correct: 2, wrongPart: 'fewer useful', correction: 'less useful', explanation: '"Less" is used with adjectives; "fewer" is for countable nouns.' },
          { id: 9, text: 'The most you read, the more you know.', options: ['The most', 'you read', 'the more', 'you know'], correct: 0, wrongPart: 'The most', correction: 'The more', explanation: 'Double comparative: "The more you read...".' },
          { id: 10, text: 'This is the less expensive option of all.', options: ['This is', 'the less', 'expensive option', 'of all'], correct: 1, wrongPart: 'the less', correction: 'the least', explanation: '"The least expensive" = superlative form.' },
          { id: 11, text: 'She is fewer experienced than her colleague.', options: ['She is', 'fewer experienced', 'than', 'her colleague'], correct: 1, wrongPart: 'fewer experienced', correction: 'less experienced', explanation: '"Less" is used with adjectives, not "fewer".' },
          { id: 12, text: 'This is one of most important discoveries of the century.', options: ['This is', 'one of', 'most important', 'discoveries'], correct: 2, wrongPart: 'most important', correction: 'the most important', explanation: 'Superlative in "one of" phrases needs "the".' },
          { id: 13, text: 'The less sleep you get, the badder you feel.', options: ['The less sleep', 'you get', 'the badder', 'you feel'], correct: 2, wrongPart: 'the badder', correction: 'the worse', explanation: '"Bad" is irregular → comparative: "worse".' },
          { id: 14, text: 'She is the least happiest student.', options: ['She is', 'the least', 'happiest', 'student'], correct: 2, wrongPart: 'happiest', correction: 'happy', explanation: '"The least" already makes it superlative — use base adjective: "the least happy".' },
          { id: 15, text: 'This plan is the more complicated of all three.', options: ['This plan is', 'the more complicated', 'of all', 'three'], correct: 1, wrongPart: 'the more complicated', correction: 'the most complicated', explanation: 'Superlative: "the most complicated".' },
          { id: 16, text: 'The more expensive, the more better.', options: ['The more expensive', 'the more better', 'it usually is', 'in quality'], correct: 1, wrongPart: 'the more better', correction: 'the better', explanation: '"Better" is already comparative — don\'t add "more".' },
          { id: 17, text: 'This is the least most interesting topic.', options: ['This is', 'the least most', 'interesting', 'topic'], correct: 1, wrongPart: 'the least most', correction: 'the least', explanation: '"The least interesting" — don\'t combine "least" and "most".' },
          { id: 18, text: 'She performed the worse of all the students.', options: ['She performed', 'the worse', 'of all', 'the students'], correct: 1, wrongPart: 'the worse', correction: 'the worst', explanation: '"Worse" is comparative; "the worst" is superlative.' },
          { id: 19, text: 'The more money you spend, the fewer you have.', options: ['The more', 'money you spend', 'the fewer', 'you have'], correct: 2, wrongPart: 'the fewer', correction: 'the less', explanation: '"Money" is uncountable → "the less" (not "the fewer").' },
          { id: 20, text: 'She is one of the importantest scientists.', options: ['She is', 'one of', 'the importantest', 'scientists'], correct: 2, wrongPart: 'the importantest', correction: 'the most important', explanation: '"Important" (3 syllables) → "the most important".' },
        ],
        transform: [
          { id: 1, text: 'Change to opposite comparative: "This is more interesting."', options: ['This is the most interesting.', 'This is less interesting.', 'This is the least interesting.', 'This is fewer interesting.'], correct: 1, explanation: 'Opposite of "more interesting" is "less interesting".' },
          { id: 2, text: 'Change to opposite superlative: "She is the most qualified."', options: ['She is less qualified.', 'She is the least qualified.', 'She is the fewer qualified.', 'She is the lesser qualified.'], correct: 1, explanation: 'Opposite of "the most qualified" is "the least qualified".' },
          { id: 3, text: 'Make a double comparative: "You study more → you learn more."', options: ['The more you study, the more you learn.', 'The most you study, the most you learn.', 'The more you study, the most you learn.', 'More you study, more you learn.'], correct: 0, explanation: 'Double comparative: "The more...the more".' },
          { id: 4, text: 'Make "less" comparative: "This exercise is difficult."', options: ['This exercise is least difficult.', 'This exercise is less difficult.', 'This exercise is fewer difficult.', 'This exercise is the less difficult.'], correct: 1, explanation: '"Less difficult" = not as difficult.' },
          { id: 5, text: 'Use superlative: "She is the most important" (opposite form)', options: ['She is the less important.', 'She is the most important.', 'She is the least important.', 'She is least important.'], correct: 2, explanation: '"The least important" = opposite of "the most important".' },
          { id: 6, text: 'Transform: "You work harder → results get better."', options: ['The harder you work, the better the results.', 'The hardest you work, the best the results.', 'The more hard you work, the more better.', 'Hard work makes better results.'], correct: 0, explanation: 'Double comparative structure.' },
          { id: 7, text: 'Change to "less" form: "This method is more complicated."', options: ['This method is the most complicated.', 'This method is the least complicated.', 'This method is less complicated.', 'This method is fewer complicated.'], correct: 2, explanation: 'Opposite comparative: "less complicated".' },
          { id: 8, text: 'Correct the error: "She is one of most talented."', options: ['She is one of the most talented.', 'She is the most talented one.', 'She is one of most the talented.', 'She is one most talented.'], correct: 0, explanation: '"One of the most talented" — always use "the" before superlative.' },
          { id: 9, text: 'Transform to double comparative: "More practice → better result"', options: ['The more practice, the best result.', 'The most practice, the most results.', 'The more you practice, the better the result.', 'Practice more and results better.'], correct: 2, explanation: 'Double comparative: "The more...the better".' },
          { id: 10, text: 'Use "least" correctly: "This is the ___ important option."', options: ['This is the least important option.', 'This is least important option.', 'This is the less important option.', 'This is the fewer important option.'], correct: 0, explanation: '"The least important" — needs "the" before "least".' },
          { id: 11, text: 'Change from "more" to "less": "She is more confident."', options: ['She is less confident.', 'She is the least confident.', 'She is fewer confident.', 'She is little confident.'], correct: 0, explanation: '"Less confident" = not as confident.' },
          { id: 12, text: 'Make a double comparative: "Less sleep → worse mood"', options: ['The less you sleep, the worse your mood.', 'The least you sleep, the worst mood.', 'The fewer sleep, the worse you feel.', 'The less sleep, the more worst mood.'], correct: 0, explanation: '"The less...the worse" — double comparative.' },
          { id: 13, text: 'Transform to superlative opposite: "This is the most boring class."', options: ['This is the less boring class.', 'This is the least boring class.', 'This is fewer boring class.', 'This is the lesser boring class.'], correct: 1, explanation: '"The least boring" = opposite of "the most boring".' },
          { id: 14, text: 'Correct this: "The more you read, the most you know."', options: ['The more you read, the more you know.', 'The most you read, the most you know.', 'The more you read, the much you know.', 'More you read, more you know.'], correct: 0, explanation: 'Double comparative: "The more...the more".' },
          { id: 15, text: 'Use "absolute superlative" form: "She is beautiful."', options: ['She is the most beautiful.', 'She is extremely beautiful.', 'She is beautifulest.', 'She is the most extremely beautiful.'], correct: 1, explanation: 'Absolute superlative: "extremely/very + adjective" — not comparing.' },
          { id: 16, text: 'Change to "fewer" or "less": "She has more homework."', options: ['She has fewer homework.', 'She has less homework.', 'She has the least homework.', 'She has little homework.'], correct: 1, explanation: '"Homework" is uncountable → "less homework".' },
          { id: 17, text: 'Make opposite superlative: "She is the most excited person."', options: ['She is the less excited person.', 'She is the least excited person.', 'She is the fewer excited person.', 'She is the little excited person.'], correct: 1, explanation: '"The least excited" = opposite of "the most excited".' },
          { id: 18, text: 'Fix the double comparative: "The more harder you try, the most better you get."', options: ['The harder you try, the better you get.', 'The more hard you try, the more better.', 'The hardest you try, the best you get.', 'The much harder, the most better.'], correct: 0, explanation: 'Correct double comparative: "The harder...the better".' },
          { id: 19, text: 'Use correct form: "This is ___ the most creative project."', options: ['one of', 'the more than', 'much more than', 'greater than'], correct: 0, explanation: '"One of the most creative" — superlative in "one of" phrases.' },
          { id: 20, text: 'Transform: "She is not very popular." (use least)', options: ['She is the least popular.', 'She is less popular.', 'She is fewer popular.', 'She is not the most popular.'], correct: 0, explanation: '"The least popular" = superlative of unpopularity.' },
        ],
        dialogue: [
          { id: 1, situation: 'Two students comparing assignments.', dialogue: 'A: Is this assignment easier?\nB: Yes, it is ___ difficult than the first one.', options: ['the least', 'fewer', 'less', 'the less'], correct: 2, explanation: '"Less difficult" = not as difficult.' },
          { id: 2, situation: 'A teacher talking to a class.', dialogue: 'Teacher: The ___ you practice, the ___ your English will become.\nStudents: We understand!', options: ['more / better', 'most / best', 'much / good', 'many / well'], correct: 0, explanation: 'Double comparative: "The more...the better".' },
          { id: 3, situation: 'Two colleagues deciding on a plan.', dialogue: 'A: Which option is best?\nB: This one is ___ complicated of all three.', options: ['less', 'the least', 'fewer', 'the lesser'], correct: 1, explanation: '"The least complicated" = simplest of all.' },
          { id: 4, situation: 'Discussing budget.', dialogue: 'A: Which option costs less?\nB: This plan is ___ expensive.', options: ['the most', 'less', 'the least', 'fewer'], correct: 1, explanation: '"Less expensive" = cheaper (comparative).' },
          { id: 5, situation: 'A health coach talking to a client.', dialogue: 'Coach: ___ junk food you eat, ___ you\'ll feel.\nClient: I\'ll try my best!', options: ['Less / better', 'Fewer / good', 'Little / well', 'The less / the better'], correct: 3, explanation: 'Double comparative: "The less...the better".' },
          { id: 6, situation: 'Two friends comparing travel plans.', dialogue: 'A: Which route is longer?\nB: This route is one of ___ scenic in the country.', options: ['the more', 'the most', 'the most more', 'most'], correct: 1, explanation: '"One of the most scenic" — superlative with "one of".' },
          { id: 7, situation: 'Studying for an exam.', dialogue: 'A: The test topics are getting harder.\nB: Yes, ___ harder they get, ___ I need to practice.', options: ['the / the more', 'more / most', 'most / more', 'the most / the best'], correct: 0, explanation: 'Double comparative: "The harder...the more".' },
          { id: 8, situation: 'Comparing two cafés.', dialogue: 'A: Is this café expensive?\nB: It is ___ expensive than the one on Main Street.', options: ['less', 'the least', 'fewer', 'little'], correct: 0, explanation: '"Less expensive" = cheaper.' },
          { id: 9, situation: 'In a meeting about products.', dialogue: 'A: Which product should we launch first?\nB: This one is ___ risky of all the options.', options: ['less', 'fewer', 'the least', 'the less'], correct: 2, explanation: '"The least risky" = the safest.' },
          { id: 10, situation: 'Giving life advice.', dialogue: 'A: How can I be happier?\nB: It\'s simple. ___ you complain, ___ you enjoy life.', options: ['The less / the more', 'Fewer / more', 'Little / more', 'The fewer / the more'], correct: 0, explanation: 'Double comparative: "The less you complain, the more you enjoy life".' },
          { id: 11, situation: 'Discussing a company\'s performance.', dialogue: 'A: How is the company doing?\nB: She is one of ___ successful executives in the firm.', options: ['the more', 'more', 'the most', 'most'], correct: 2, explanation: '"One of the most successful" — superlative pattern.' },
          { id: 12, situation: 'Talking about a diet plan.', dialogue: 'A: Will this diet work?\nB: ___ sugar you eat, ___ you\'ll gain weight.', options: ['The less / the less', 'Fewer / less', 'The less / less', 'Little / fewer'], correct: 0, explanation: 'Double comparative: "The less sugar...the less weight".' },
          { id: 13, situation: 'Choosing between two routes.', dialogue: 'A: Which path is less dangerous?\nB: The mountain road is ___ risky than the highway.', options: ['the least', 'fewer', 'the less', 'less'], correct: 3, explanation: '"Less risky" = not as dangerous (comparative).' },
          { id: 14, situation: 'Discussing a schedule.', dialogue: 'A: How can we finish faster?\nB: ___ time we waste, ___ we can finish.', options: ['Less / sooner', 'The less / the sooner', 'Fewer / faster', 'The fewer / the quicker'], correct: 1, explanation: 'Double comparative: "The less...the sooner".' },
          { id: 15, situation: 'In a science class.', dialogue: 'Teacher: Is this experiment complicated?\nStudent: It is ___ complicated than the last one.', options: ['least', 'the least', 'fewer', 'less'], correct: 3, explanation: '"Less complicated" = not as complicated (comparative).' },
          { id: 16, situation: 'Planning a party.', dialogue: 'A: How much food should we prepare?\nB: ___ guests, ___ food we need.', options: ['The more / the more', 'Most / most', 'More / much', 'The most / the most'], correct: 0, explanation: 'Double comparative: "The more guests, the more food".' },
          { id: 17, situation: 'Comparing two solutions.', dialogue: 'A: Which solution is better for the environment?\nB: This one produces ___ waste of all options.', options: ['less', 'the less', 'fewer', 'the least'], correct: 3, explanation: '"The least waste" = superlative of a small amount.' },
          { id: 18, situation: 'A student asks about revision.', dialogue: 'A: How should I revise?\nB: ___ you revise, ___ you\'ll remember.', options: ['More / more', 'The more / the more', 'Most / most', 'Many / many'], correct: 1, explanation: 'Double comparative: "The more...the more".' },
          { id: 19, situation: 'Deciding which book to read.', dialogue: 'A: Which book is most interesting?\nB: This one. It is one of ___ books I\'ve ever read.', options: ['the interestingest', 'most interesting', 'the most interesting', 'the more interesting'], correct: 2, explanation: '"One of the most interesting" — superlative.' },
          { id: 20, situation: 'Two friends choosing a restaurant.', dialogue: 'A: Is this restaurant expensive?\nB: No! It is ___ expensive restaurant in the area.', options: ['the less', 'the least', 'fewer', 'the lesser'], correct: 1, explanation: '"The least expensive" = the cheapest.' },
        ],
      },
      {
        id: 'as-adjective-as',
        title: 'As...as Comparisons',
        icon: '⚖️',
        guide: `## "As...as" Qiyosi

"As...as" tuzilmasi ikki narsaning tengligini yoki tengsizligini ifodalash uchun ishlatiladi.

## Tenglik: as + sifat + as
Ma'nosi: ...kabi, ...darajada
• She is as tall as her brother. (U akasi kabi baland bo'yli.)
• This book is as interesting as that one. (Bu kitob u kitob kabi qiziqarli.)
• I run as fast as you. (Men siz kabi tez yugurib olaman.)

## Tengsizlik: not as + sifat + as
Ma'nosi: ...kabi emas, ...dan kam
• He is not as tall as his father. (U otasi kabi baland bo'yli emas.)
• This film is not as good as the book. (Bu film kitob kabi yaxshi emas.)

## Miqdor bilan: as much/many...as
• I don't earn as much money as him.
• She has as many friends as I do.

## Foydali iboralar
• as soon as possible (ASAP) — imkon qadar tez
• as quickly as you can — iloji boricha tez
• twice as big as — ikki baravar katta
• half as big as — yarim qadar kichik`,
        questions: [
          { id: 1, text: 'She is ___ tall ___ her mother.', options: ['as/so', 'so/as', 'as/as', 'as/than'], correct: 2, explanation: '"As...as" structure for equality.' },
          { id: 2, text: 'This car is not ___ fast ___ that one.', options: ['so/that', 'as/as', 'more/than', 'as/than'], correct: 1, explanation: '"Not as...as" for inequality.' },
          { id: 3, text: '"As...as" is used to show:', options: ['superiority', 'inferiority', 'equality or similarity', 'none of these'], correct: 2, explanation: '"As...as" shows things are equal or similar.' },
          { id: 4, text: 'John is ___ intelligent as Mary.', options: ['as/than', 'just as', 'as', 'more'], correct: 2, explanation: '"as intelligent as" — equality.' },
          { id: 5, text: 'I can\'t run as ___ as you. (fast)', options: ['fast', 'faster', 'fastest', 'more fast'], correct: 0, explanation: 'In "as...as", the adjective stays in base form.' },
          { id: 6, text: 'My bag is twice ___ heavy ___ yours.', options: ['so/as', 'as/as', 'more/than', 'as/than'], correct: 1, explanation: '"Twice as heavy as" — multiplied equality.' },
          { id: 7, text: 'Which sentence is correct?', options: ['She is as taller as her brother.', 'She is as tall as her brother.', 'She is as tall than her brother.', 'She is tall as her brother.'], correct: 1, explanation: '"As [base adjective] as" — no comparative form.' },
          { id: 8, text: 'The movie wasn\'t ___ exciting ___ the book.', options: ['as/as', 'as/than', 'more/than', 'so/as'], correct: 0, explanation: '"Not as...as" for inequality.' },
          { id: 9, text: '"ASAP" stands for:', options: ['As Soon As Possible', 'As Simple As Planned', 'A Standard Action Plan', 'All Systems Are Perfect'], correct: 0, explanation: 'ASAP = As Soon As Possible — come as quickly as possible.' },
          { id: 10, text: 'This house is ___ expensive as the previous one. (not equal)', options: ['as', 'not as', 'more', 'less'], correct: 1, explanation: '"Not as expensive as" = it\'s cheaper.' },
          { id: 11, text: 'I don\'t have ___ money as you do.', options: ['as many', 'as much', 'so much', 'as much as'], correct: 1, explanation: '"As much money as" — money is uncountable.' },
          { id: 12, text: 'The adjective in "as...as" is always in ___ form.', options: ['comparative', 'superlative', 'base / positive', 'past'], correct: 2, explanation: 'Always use the base adjective between "as...as".' },
          { id: 13, text: 'She works ___ hard as her colleagues.', options: ['as', 'so', 'more', 'much'], correct: 0, explanation: '"As hard as" — equality in effort.' },
          { id: 14, text: 'The new phone is half ___ expensive ___ the old model.', options: ['so/as', 'as/as', 'as/than', 'more/than'], correct: 1, explanation: '"Half as expensive as" — fractions with as...as.' },
          { id: 15, text: 'Which means the same as "not as fast as"?', options: ['faster than', 'slower than', 'as fast as', 'the slowest'], correct: 1, explanation: '"Not as fast as" = slower than.' },
          { id: 16, text: 'He is not ___ clever ___ his sister.', options: ['so/as', 'as/as', 'more/than', 'as/that'], correct: 1, explanation: '"Not as clever as" — inequality.' },
          { id: 17, text: 'Can you finish it ___ quickly ___ possible?', options: ['as/as', 'so/as', 'as/than', 'more/as'], correct: 0, explanation: '"As quickly as possible" — common phrase.' },
          { id: 18, text: 'This cake is just ___ delicious ___ the one I had yesterday.', options: ['so/as', 'as/as', 'as/that', 'more/than'], correct: 1, explanation: '"Just as delicious as" = exactly equal.' },
          { id: 19, text: 'My English is ___ good as yours yet.', options: ['not so', 'not as', 'as', 'Both A and B are acceptable'], correct: 3, explanation: '"Not so good as" and "not as good as" are both acceptable.' },
          { id: 20, text: 'This mountain is three times ___ high ___ that hill.', options: ['so/as', 'as/as', 'more/than', 'as/than'], correct: 1, explanation: '"Three times as high as" — multiplication.' },
          { id: 21, text: 'The test wasn\'t ___ difficult ___ I expected.', options: ['as/as', 'so/so', 'more/than', 'as/than'], correct: 0, explanation: '"Not as...as I expected" or "as difficult as" in affirmative.' },
          { id: 22, text: 'She speaks English ___ fluently ___ a native speaker.', options: ['as/as', 'so/as', 'more/than', 'as/than'], correct: 0, explanation: '"As fluently as" — adverb form in as...as.' },
          { id: 23, text: '"Not as...as" is the same as using ___ in comparison.', options: ['more...than', 'less...than', 'as...as', 'the most'], correct: 1, explanation: '"Not as tall as" = shorter / less tall than.' },
          { id: 24, text: 'I don\'t have ___ friends ___ she does.', options: ['as many/as', 'as much/as', 'so many/that', 'more/than'], correct: 0, explanation: '"As many friends as" — friends is countable.' },
          { id: 25, text: 'Please call me ___ soon ___ you arrive.', options: ['as/as', 'so/as', 'more/than', 'as/than'], correct: 0, explanation: '"As soon as you arrive" — time clause.' },
          { id: 26, text: 'He ran ___ fast ___ the wind.', options: ['as/as', 'so/as', 'faster/than', 'more/than'], correct: 0, explanation: '"As fast as the wind" — simile using as...as.' },
          { id: 27, text: '"She is as beautiful as a rose." This sentence expresses:', options: ['comparison', 'simile/equality', 'superiority', 'inferiority'], correct: 1, explanation: '"As...as" creates a simile, showing equality.' },
          { id: 28, text: 'Which is WRONG?', options: ['as tall as', 'as taller as', 'not as tall as', 'twice as tall as'], correct: 1, explanation: '"As taller as" is wrong — never use comparative in as...as.' },
          { id: 29, text: 'This problem is ___ complicated ___ it looks.', options: ['as/as', 'more/than', 'as/than', 'so/as'], correct: 0, explanation: '"As complicated as it looks" or "not as...as it looks".' },
          { id: 30, text: '"Twice as big as" means:', options: ['50% smaller', 'the same size', '2 times larger', '3 times larger'], correct: 2, explanation: '"Twice as big as" = 2 times the size of something.' },
        ],
        fillBlanks: [
          { id: 1, text: 'She is ___ tall ___ her mother.', options: ['as / so', 'so / as', 'as / as', 'as / than'], correct: 2, explanation: '"As...as" structure for equality.' },
          { id: 2, text: 'This car is not ___ fast ___ that one.', options: ['so / that', 'as / as', 'more / than', 'as / than'], correct: 1, explanation: '"Not as...as" for inequality.' },
          { id: 3, text: 'I can run ___ fast ___ you.', options: ['so / so', 'as / as', 'more / than', 'than / as'], correct: 1, explanation: '"As fast as" = equality in speed.' },
          { id: 4, text: 'He is not ___ clever ___ his sister.', options: ['so / as', 'as / as', 'more / than', 'as / that'], correct: 1, explanation: '"Not as clever as" = she is cleverer.' },
          { id: 5, text: 'My bag is twice ___ heavy ___ yours.', options: ['so / as', 'as / as', 'more / than', 'as / than'], correct: 1, explanation: '"Twice as heavy as" = multiplied equality.' },
          { id: 6, text: 'The adjective in "as...as" is always in ___ form.', options: ['comparative', 'superlative', 'base / positive', 'past'], correct: 2, explanation: 'Always use the base adjective between "as...as".' },
          { id: 7, text: 'Can you finish it ___ quickly ___ possible?', options: ['as / as', 'so / as', 'as / than', 'more / as'], correct: 0, explanation: '"As quickly as possible" — common phrase.' },
          { id: 8, text: 'This house is half ___ expensive ___ the old one.', options: ['so / as', 'as / as', 'as / than', 'more / than'], correct: 1, explanation: '"Half as expensive as" = fraction with as...as.' },
          { id: 9, text: '"Not as fast as" means the same as:', options: ['faster than', 'as fast as', 'slower than', 'the slowest'], correct: 2, explanation: '"Not as fast as" = slower than.' },
          { id: 10, text: 'This problem is ___ difficult ___ it looks.', options: ['as / as', 'more / than', 'as / than', 'so / as'], correct: 0, explanation: '"As difficult as it looks" — equality comparison.' },
          { id: 11, text: 'She works ___ hard ___ her colleagues.', options: ['as / as', 'so / so', 'more / than', 'much / as'], correct: 0, explanation: '"As hard as" — equality in effort.' },
          { id: 12, text: 'I don\'t have ___ money ___ you do.', options: ['as many / as', 'as much / as', 'so much / that', 'more / than'], correct: 1, explanation: '"As much money as" — "money" is uncountable.' },
          { id: 13, text: 'He ran ___ fast ___ the wind. (simile)', options: ['as / as', 'so / as', 'faster / than', 'more / than'], correct: 0, explanation: '"As fast as the wind" — simile using as...as.' },
          { id: 14, text: '"ASAP" stands for "As Soon As ___."', options: ['Planned', 'Perfect', 'Possible', 'Personal'], correct: 2, explanation: 'ASAP = As Soon As Possible.' },
          { id: 15, text: 'This mountain is three times ___ high ___ that hill.', options: ['so / as', 'as / as', 'more / than', 'as / than'], correct: 1, explanation: '"Three times as high as" = multiplication.' },
          { id: 16, text: 'She speaks ___ fluently ___ a native speaker.', options: ['as / as', 'so / as', 'more / than', 'as / than'], correct: 0, explanation: '"As fluently as" — adverb in as...as structure.' },
          { id: 17, text: '"Not as...as" is the same as using ___ in comparison.', options: ['more...than', 'less...than', 'as...as', 'the most'], correct: 1, explanation: '"Not as tall as" = shorter / less tall than.' },
          { id: 18, text: 'I don\'t have ___ friends ___ she does.', options: ['as many / as', 'as much / as', 'so many / that', 'more / than'], correct: 0, explanation: '"As many friends as" — "friends" is countable.' },
          { id: 19, text: 'Just ___ we finished, it started raining.', options: ['as / as', 'as soon', 'soon / as', 'quickly / as'], correct: 1, explanation: '"As soon as" = at the same time as / immediately after.' },
          { id: 20, text: '"As...as" is used to show:', options: ['superiority', 'inferiority', 'equality or similarity', 'none of these'], correct: 2, explanation: '"As...as" shows things are equal or similar.' },
        ],
        scrambled: [
          { id: 1, words: ['tall', 'her', 'she', 'as', 'is', 'brother', 'as'], answer: 'She is as tall as her brother.', explanation: '"As...as" for equality.' },
          { id: 2, words: ['fast', 'car', 'not', 'as', 'that', 'as', 'is', 'this'], answer: 'This car is not as fast as that.', explanation: '"Not as...as" for inequality.' },
          { id: 3, words: ['as', 'run', 'I', 'fast', 'can', 'as', 'you'], answer: 'I can run as fast as you.', explanation: '"As fast as" — equality.' },
          { id: 4, words: ['as', 'possible', 'as', 'soon', 'come', 'please'], answer: 'Please come as soon as possible.', explanation: '"As soon as possible" — common phrase.' },
          { id: 5, words: ['as', 'heavy', 'bag', 'twice', 'as', 'my', 'is', 'yours'], answer: 'My bag is twice as heavy as yours.', explanation: '"Twice as heavy as" — multiplied equality.' },
          { id: 6, words: ['as', 'hard', 'she', 'works', 'as', 'colleagues', 'her'], answer: 'She works as hard as her colleagues.', explanation: '"As hard as" — equality in effort.' },
          { id: 7, words: ['intelligent', 'brother', 'as', 'his', 'as', 'she', 'is', 'not'], answer: 'She is not as intelligent as his brother.', explanation: '"Not as...as" — inequality.' },
          { id: 8, words: ['high', 'as', 'three', 'mountain', 'times', 'that', 'this', 'as', 'hill', 'is'], answer: 'This mountain is three times as high as that hill.', explanation: '"Three times as high as" — multiplication.' },
          { id: 9, words: ['as', 'native', 'speaks', 'fluently', 'she', 'as', 'a', 'speaker'], answer: 'She speaks as fluently as a native speaker.', explanation: '"As fluently as" — adverb form.' },
          { id: 10, words: ['I', 'as', 'friends', 'she', 'have', 'many', 'don\'t', 'does', 'as'], answer: 'I don\'t have as many friends as she does.', explanation: '"As many...as" for countable nouns.' },
          { id: 11, words: ['book', 'this', 'as', 'interesting', 'that', 'one', 'as', 'is'], answer: 'This book is as interesting as that one.', explanation: '"As interesting as" — equality.' },
          { id: 12, words: ['as', 'half', 'phone', 'as', 'this', 'expensive', 'is', 'that'], answer: 'This phone is half as expensive as that.', explanation: '"Half as expensive as" — fraction.' },
          { id: 13, words: ['wind', 'the', 'fast', 'he', 'as', 'ran', 'as'], answer: 'He ran as fast as the wind.', explanation: '"As fast as the wind" — simile.' },
          { id: 14, words: ['as', 'you', 'difficult', 'was', 'expected', 'not', 'the', 'test', 'as'], answer: 'The test was not as difficult as you expected.', explanation: '"Not as difficult as" — inequality.' },
          { id: 15, words: ['you', 'quickly', 'can', 'as', 'do', 'as', 'this', 'please'], answer: 'Please do this as quickly as you can.', explanation: '"As quickly as you can" — equality.' },
          { id: 16, words: ['coffee', 'as', 'he', 'drinks', 'much', 'as', 'I', 'do'], answer: 'He drinks as much coffee as I do.', explanation: '"As much...as" for uncountable nouns.' },
          { id: 17, words: ['my', 'as', 'tall', 'brother', 'is', 'as', 'I'], answer: 'My brother is as tall as I.', explanation: '"As tall as" — equality.' },
          { id: 18, words: ['as', 'rose', 'beautiful', 'a', 'she', 'as', 'is'], answer: 'She is as beautiful as a rose.', explanation: '"As beautiful as" — simile.' },
          { id: 19, words: ['the', 'film', 'book', 'good', 'as', 'not', 'as', 'was', 'the'], answer: 'The film was not as good as the book.', explanation: '"Not as good as" — inequality.' },
          { id: 20, words: ['soon', 'arrive', 'as', 'you', 'call', 'as', 'me', 'please'], answer: 'Please call me as soon as you arrive.', explanation: '"As soon as" — time clause.' },
        ],
        errorCorrection: [
          { id: 1, text: 'She is as taller as her brother.', options: ['She is', 'as taller', 'as', 'her brother'], correct: 1, wrongPart: 'as taller', correction: 'as tall', explanation: 'In "as...as", always use the base form — never comparative.' },
          { id: 2, text: 'He is not so clever than his sister.', options: ['He is not', 'so clever', 'than', 'his sister'], correct: 2, wrongPart: 'than', correction: 'as', explanation: '"Not so clever as" or "not as clever as" — use "as", not "than".' },
          { id: 3, text: 'This bag is as heavier as mine.', options: ['This bag', 'is as heavier', 'as', 'mine'], correct: 1, wrongPart: 'is as heavier', correction: 'is as heavy', explanation: 'In "as...as", use the base adjective "heavy".' },
          { id: 4, text: 'She runs as faster as a cheetah.', options: ['She runs', 'as faster', 'as', 'a cheetah'], correct: 1, wrongPart: 'as faster', correction: 'as fast', explanation: 'In "as...as", always use base form: "as fast as".' },
          { id: 5, text: 'This car is not as expensive that mine.', options: ['This car', 'is not as expensive', 'that', 'mine'], correct: 2, wrongPart: 'that', correction: 'as', explanation: '"Not as expensive as" — second word must also be "as".' },
          { id: 6, text: 'He is twice as taller as his son.', options: ['He is', 'twice as taller', 'as', 'his son'], correct: 1, wrongPart: 'twice as taller', correction: 'twice as tall', explanation: '"Twice as tall as" — base adjective, not comparative.' },
          { id: 7, text: 'The film was not as good than the book.', options: ['The film was', 'not as good', 'than', 'the book'], correct: 2, wrongPart: 'than', correction: 'as', explanation: '"Not as good as" — use "as", not "than".' },
          { id: 8, text: 'I drink as much coffee as she drinks.', options: ['I drink', 'as much coffee', 'as', 'she drinks'], correct: 3, wrongPart: 'No error', correction: 'No error', explanation: 'This sentence is correct! "As much coffee as she drinks".' },
          { id: 9, text: 'She is as beautiful than a rose.', options: ['She is', 'as beautiful', 'than', 'a rose'], correct: 2, wrongPart: 'than', correction: 'as', explanation: '"As beautiful as a rose" — both words must be "as".' },
          { id: 10, text: 'Please call me so soon as you arrive.', options: ['Please call', 'me so soon', 'as you', 'arrive'], correct: 1, wrongPart: 'me so soon', correction: 'me as soon', explanation: '"As soon as you arrive" — use "as soon as".' },
          { id: 11, text: 'My bag is as heavier than yours.', options: ['My bag is', 'as heavier', 'than', 'yours'], correct: 1, wrongPart: 'as heavier', correction: 'as heavy', explanation: 'In "as...as", use base adjective "heavy".' },
          { id: 12, text: 'He doesn\'t earn as much money that she does.', options: ['He doesn\'t earn', 'as much money', 'that', 'she does'], correct: 2, wrongPart: 'that', correction: 'as', explanation: '"As much money as" — use "as" at both positions.' },
          { id: 13, text: 'She is not as cleverer as Tom.', options: ['She is not', 'as cleverer', 'as', 'Tom'], correct: 1, wrongPart: 'as cleverer', correction: 'as clever', explanation: 'In "as...as", always use the base form of adjective.' },
          { id: 14, text: 'This building is three times as taller as that one.', options: ['This building is', 'three times', 'as taller', 'as that one'], correct: 2, wrongPart: 'as taller', correction: 'as tall', explanation: '"Three times as tall as" — base adjective.' },
          { id: 15, text: 'I have as many friends than you.', options: ['I have', 'as many friends', 'than', 'you'], correct: 2, wrongPart: 'than', correction: 'as', explanation: '"As many friends as you" — use "as" not "than".' },
          { id: 16, text: 'It wasn\'t as difficult than we thought.', options: ['It wasn\'t', 'as difficult', 'than', 'we thought'], correct: 2, wrongPart: 'than', correction: 'as', explanation: '"Not as difficult as we thought" — use "as".' },
          { id: 17, text: 'He speaks English as good as a native speaker.', options: ['He speaks', 'English as good', 'as a native', 'speaker'], correct: 1, wrongPart: 'English as good', correction: 'English as well', explanation: '"As well as" — need adverb "well", not adjective "good".' },
          { id: 18, text: 'She is just as beautifully as her sister.', options: ['She is', 'just as beautifully', 'as', 'her sister'], correct: 1, wrongPart: 'just as beautifully', correction: 'just as beautiful', explanation: 'Describing the person (not action) → use adjective "beautiful".' },
          { id: 19, text: 'Come as soon than possible!', options: ['Come', 'as soon', 'than', 'possible'], correct: 2, wrongPart: 'than', correction: 'as', explanation: '"As soon as possible" — both words must be "as".' },
          { id: 20, text: 'This phone is half as expensiver as that one.', options: ['This phone is', 'half as expensiver', 'as', 'that one'], correct: 1, wrongPart: 'half as expensiver', correction: 'half as expensive', explanation: 'In "as...as", use base adjective "expensive".' },
        ],
        transform: [
          { id: 1, text: 'Make equal comparison: "She is tall. Her brother is tall."', options: ['She is taller than her brother.', 'She is as tall as her brother.', 'She is the tallest like her brother.', 'She is so tall than her brother.'], correct: 1, explanation: '"As tall as" shows equality.' },
          { id: 2, text: 'Make inequality: "He is less clever than his sister."', options: ['He is as clever as his sister.', 'He is not as clever as his sister.', 'He is cleverer than his sister.', 'He is the cleverest.'], correct: 1, explanation: '"Not as clever as" = less clever than.' },
          { id: 3, text: 'Express "2 times larger": "This building is big. That is 2x bigger."', options: ['This building is bigger than that.', 'This building is twice bigger.', 'This building is twice as big as that.', 'This building is as bigger as that.'], correct: 2, explanation: '"Twice as big as" for 2x comparison.' },
          { id: 4, text: 'Change to as...as: "He is less experienced than her."', options: ['He is not as experienced as her.', 'He is as experienced as her.', 'He is less as experienced as her.', 'He is not more experienced than her.'], correct: 0, explanation: '"Less than" → "not as...as".' },
          { id: 5, text: 'Make a simile: "She runs fast, like a cheetah."', options: ['She runs faster than a cheetah.', 'She runs as fast as a cheetah.', 'She runs the fastest like a cheetah.', 'She is as fast a cheetah.'], correct: 1, explanation: '"As fast as a cheetah" = simile with as...as.' },
          { id: 6, text: 'Transform to "not as...as": "The test was easier than I expected."', options: ['The test was not as difficult as I expected.', 'The test was as easy as I expected.', 'The test was not as easy as I expected.', 'The test was easier than as I expected.'], correct: 0, explanation: '"Not as difficult as I expected" = easier than expected.' },
          { id: 7, text: 'Express fraction comparison: "This car is 50% cheaper."', options: ['This car is half as expensive as the other.', 'This car is twice as expensive.', 'This car is as half expensive as the other.', 'This car is half expensive than the other.'], correct: 0, explanation: '"Half as expensive as" = 50% of the price.' },
          { id: 8, text: 'Make equal: "She speaks English well. I speak it equally well."', options: ['I speak English as well as she.', 'I speak English better as she.', 'I speak English so well as she.', 'I speak English as good as she.'], correct: 0, explanation: '"As well as" (adverb) = equality in speaking.' },
          { id: 9, text: 'Change: "He has fewer books than me." (use as...as)', options: ['He has as many books as me.', 'He does not have as many books as me.', 'He has not as much books as me.', 'He has so many books as me.'], correct: 1, explanation: '"Not as many books as me" = fewer than me.' },
          { id: 10, text: 'Add urgency: "Call me when you arrive."', options: ['Call me as soon as you arrive.', 'Call me as soon possible.', 'Call me as quickly as possible as you arrive.', 'Call me as you arrive soon.'], correct: 0, explanation: '"As soon as" expresses timing (immediately when).' },
          { id: 11, text: 'Make equal (3 times): "That tree is 3x taller than my house."', options: ['That tree is three times as tall as my house.', 'That tree is three times taller as my house.', 'That tree is as three times tall as my house.', 'That tree is three times the tallest.'], correct: 0, explanation: '"Three times as tall as" = 3x comparison.' },
          { id: 12, text: 'Transform "less...than" to "not as...as": "This film is less interesting than the book."', options: ['This film is not as interesting as the book.', 'This film is as interesting as the book.', 'This film is not more interesting than the book.', 'This film is less as interesting as the book.'], correct: 0, explanation: '"Less interesting than" = "not as interesting as".' },
          { id: 13, text: 'Use "as much as": "I don\'t drink coffee. She drinks a lot."', options: ['I don\'t drink as much coffee as she.', 'I don\'t drink as many coffee as she.', 'I don\'t drink more coffee as she.', 'I don\'t drink coffee as much than she.'], correct: 0, explanation: '"Coffee" is uncountable → "as much coffee as".' },
          { id: 14, text: 'Make a time clause: "After arriving, call me quickly."', options: ['Call me as soon as you arrive.', 'Call me as soon than you arrive.', 'Call me so soon as you arrive.', 'Call me as quickly than you arrive.'], correct: 0, explanation: '"As soon as you arrive" — time clause.' },
          { id: 15, text: 'Transform to positive: "He is not as old as Tom." (who is older?)', options: ['Tom is as old as him.', 'Tom is older than him.', 'He is older than Tom.', 'Tom is not as young as him.'], correct: 1, explanation: 'If "he is not as old as Tom", then "Tom is older than him".' },
          { id: 16, text: 'Use "as well as" to connect ideas: "She sings and dances both well."', options: ['She sings as well as dances.', 'She sings as good as she dances.', 'She sings as well she dances.', 'She sings and as well dances.'], correct: 0, explanation: '"As well as" connects parallel activities.' },
          { id: 17, text: 'Transform to comparative: "She is not as fast as him." (who is faster?)', options: ['She is faster than him.', 'He is faster than her.', 'She is as fast as him.', 'He is not as fast as her.'], correct: 1, explanation: '"Not as fast as him" → "He is faster than her".' },
          { id: 18, text: 'Use "as...as" with multiple: "Many people came. Equally many last time."', options: ['As many people came as last time.', 'As much people came as last time.', 'People came as many as last time.', 'Just as many people came than last time.'], correct: 0, explanation: '"As many people as last time" — countable noun.' },
          { id: 19, text: 'Fix: "She is not so fast than me."', options: ['She is not as fast as me.', 'She is not so fast as me.', 'Both A and B are acceptable.', 'She is not fast so me.'], correct: 2, explanation: '"Not so fast as" and "not as fast as" are both correct.' },
          { id: 20, text: 'Express equality in amount: "He has much experience. I have the same."', options: ['I have as much experience as him.', 'I have as many experience as him.', 'I have so much experience as him.', 'I have the same experience than him.'], correct: 0, explanation: '"As much experience as" — "experience" is uncountable.' },
        ],
        dialogue: [
          { id: 1, situation: 'Two friends comparing heights.', dialogue: 'A: Are you taller than your sister?\nB: No, she is ___ tall ___ me.', options: ['more / than', 'as / as', 'so / as', 'as / than'], correct: 1, explanation: '"As tall as" shows they are the same height.' },
          { id: 2, situation: 'At a café, comparing drinks.', dialogue: 'A: Is this coffee as good as yours?\nB: Not really, it\'s not ___ strong ___ mine.', options: ['as / as', 'so / so', 'more / than', 'as / than'], correct: 0, explanation: '"Not as strong as" — inequality.' },
          { id: 3, situation: 'Two colleagues discussing reports.', dialogue: 'A: Is this report long?\nB: It\'s ___ long ___ the previous one.', options: ['as / as', 'more / than', 'so / as', 'as / than'], correct: 0, explanation: '"As long as the previous one" — equality.' },
          { id: 4, situation: 'A student is worried about time.', dialogue: 'A: We need to finish the project soon!\nB: Let\'s do it ___ soon ___ possible.', options: ['as / as', 'so / as', 'as / than', 'more / as'], correct: 0, explanation: '"As soon as possible" — common urgency phrase.' },
          { id: 5, situation: 'Comparing two movies.', dialogue: 'A: Was the sequel as good as the original?\nB: No, it wasn\'t ___ exciting ___ the first film.', options: ['as / as', 'more / than', 'as / than', 'so / as'], correct: 0, explanation: '"Not as exciting as" — inequality.' },
          { id: 6, situation: 'Talking about a diet.', dialogue: 'A: Is this salad healthy?\nB: Yes, it\'s ___ healthy ___ the other one!', options: ['more / than', 'as / as', 'so / so', 'as / than'], correct: 1, explanation: '"As healthy as" — equality.' },
          { id: 7, situation: 'A tourist asking about distances.', dialogue: 'A: Is the station far?\nB: It\'s about ___ far ___ the hotel, so 10 minutes.', options: ['so / as', 'as / as', 'more / than', 'as / so'], correct: 1, explanation: '"As far as" — equality in distance.' },
          { id: 8, situation: 'Two students comparing exam scores.', dialogue: 'A: Did you do well on the test?\nB: Not really. I didn\'t do ___ well ___ last time.', options: ['as / as', 'more / than', 'so / that', 'good / as'], correct: 0, explanation: '"Not as well as last time" — inequality (adverb "well").' },
          { id: 9, situation: 'Choosing between two computers.', dialogue: 'A: Is this laptop as fast as the other one?\nB: Yes, it\'s ___ fast ___ the expensive one!', options: ['as / as', 'more / than', 'so / as', 'as / than'], correct: 0, explanation: '"As fast as" — equality.' },
          { id: 10, situation: 'In a cooking class.', dialogue: 'A: Does this cake taste as good as yours?\nB: Mine is not ___ sweet ___ yours.', options: ['as / as', 'so / so', 'more / than', 'as / than'], correct: 0, explanation: '"Not as sweet as" — inequality.' },
          { id: 11, situation: 'Talking about salaries.', dialogue: 'A: Do you earn as much as your friend?\nB: No, I don\'t earn ___ money ___ she does.', options: ['as much / as', 'as many / as', 'so much / that', 'more / than'], correct: 0, explanation: '"As much money as" — money is uncountable.' },
          { id: 12, situation: 'Comparing two athletes.', dialogue: 'A: Is Tom as fast as Maria?\nB: No, Tom doesn\'t run ___ fast ___ Maria.', options: ['as / as', 'more / than', 'so / as', 'as / than'], correct: 0, explanation: '"Not as fast as Maria" — inequality.' },
          { id: 13, situation: 'Planning a trip.', dialogue: 'A: Let\'s try to arrive early.\nB: Yes, let\'s get there ___ early ___ we can.', options: ['as / as', 'so / as', 'as / than', 'more / as'], correct: 0, explanation: '"As early as we can" — equality phrase.' },
          { id: 14, situation: 'Two neighbours talking about their houses.', dialogue: 'A: My house is big. Is yours bigger?\nB: Actually, my house is ___ big ___ yours!', options: ['as / as', 'more / than', 'so / as', 'as / than'], correct: 0, explanation: '"As big as yours" — equality.' },
          { id: 15, situation: 'Asking about English skills.', dialogue: 'A: Do you speak English as well as your classmate?\nB: Not quite. She speaks it ___ fluently ___ a native.', options: ['more / than', 'as / as', 'so / that', 'as / than'], correct: 1, explanation: '"As fluently as a native" — equality comparison.' },
          { id: 16, situation: 'A teacher explaining a topic.', dialogue: 'Teacher: "Not as...as" means the same as ___.\nStudent: Less...than?', options: ['yes, that\'s right', 'no, it means more', 'yes, more...than', 'no, it means equal'], correct: 0, explanation: '"Not as...as" = "less...than" in meaning.' },
          { id: 17, situation: 'Two people at a gym.', dialogue: 'A: Can you lift as much as Tom?\nB: Almost! I lift ___ weight ___ he does.', options: ['as much / as', 'as many / as', 'so much / that', 'as heavy / than'], correct: 0, explanation: '"As much weight as he does" — equality.' },
          { id: 18, situation: 'Buying a phone.', dialogue: 'A: This phone is 50% cheaper!\nB: Yes, it\'s ___ expensive ___ the premium model.', options: ['twice as / as', 'half as / as', 'as half / as', 'not twice / than'], correct: 1, explanation: '"Half as expensive as" = 50% the price.' },
          { id: 19, situation: 'Talking about city traffic.', dialogue: 'A: Is traffic bad in the morning?\nB: Yes, it\'s ___ bad in the evening.', options: ['not as bad as', 'as bad as', 'more bad than', 'not so badly as'], correct: 1, explanation: '"As bad as in the evening" — equal comparison.' },
          { id: 20, situation: 'Two students talking after class.', dialogue: 'A: Was the exam difficult?\nB: It wasn\'t ___ hard ___ I expected.', options: ['as / as', 'more / than', 'so / that', 'as / than'], correct: 0, explanation: '"Not as hard as I expected" — inequality.' },
        ],
      },
      {
        id: 'adverbs',
        title: 'Adverbs',
        icon: '🚀',
        guide: `## Ravishlar (Adverbs)

Ravish fe'l, sifat yoki boshqa ravishni tavsiflaydi va odatda qanday, qachon, qayerda, qay darajada degan savollarga javob beradi.

## Ravish turlari

### 1. Tarz ravishi (Manner) — qanday?
Ko'pincha sifatga -ly qo'shib hosil qilinadi:
• quick → quickly (tez)
• careful → carefully (ehtiyotkorlik bilan)
• slow → slowly (sekin)
• happy → happily (baxtli ravishda)

### 2. Vaqt ravishi (Time) — qachon?
• now, then, today, yesterday, soon, already, still, yet

### 3. Joy ravishi (Place) — qayerda?
• here, there, inside, outside, abroad, nearby

### 4. Darajat ravishi (Degree) — qay darajada?
• very, quite, extremely, really, almost, nearly

### 5. Chastota ravishi (Frequency) — qancha tez-tez?
• always, usually, often, sometimes, rarely, never

## Noto'g'ri ravishlar
• good → well (yaxshi)
• fast → fast (tez - o'zgarmaydi)
• hard → hard (qattiq - o'zgarmaydi)
• late → late (kech - o'zgarmaydi)
• early → early (erta - o'zgarmaydi)

## Gap ichidagi o'rni
• Tarz ravishi: odatda fe'ldan keyin
• Chastota ravishi: ko'makchi fe'ldan keyin, asosiy fe'ldan oldin`,
        questions: [
          { id: 1, text: 'What is the adverb form of "quick"?', options: ['quicker', 'quicken', 'quickly', 'quicksome'], correct: 2, explanation: 'quick + -ly = quickly.' },
          { id: 2, text: 'She sings ___. (beautiful → adverb)', options: ['beautiful', 'beautifuler', 'beautifully', 'beautifulls'], correct: 2, explanation: 'beautiful + -ly = beautifully.' },
          { id: 3, text: 'He drives very ___. (careful → adverb)', options: ['careful', 'carefully', 'carefuler', 'carefulment'], correct: 1, explanation: 'careful + -ly = carefully.' },
          { id: 4, text: 'What is the adverb form of "good"?', options: ['goodly', 'more good', 'better', 'well'], correct: 3, explanation: '"Good" → "well" (irregular adverb).' },
          { id: 5, text: 'She speaks English ___. (well)', options: ['good', 'well', 'goodly', 'goodness'], correct: 1, explanation: '"Well" is the adverb of "good".' },
          { id: 6, text: 'He runs very ___. (fast → adverb)', options: ['fastly', 'fast', 'faster', 'fastest'], correct: 1, explanation: '"Fast" is both adjective and adverb (no -ly).' },
          { id: 7, text: 'Adverbs usually modify:', options: ['nouns', 'pronouns', 'verbs/adjectives/other adverbs', 'prepositions'], correct: 2, explanation: 'Adverbs describe verbs, adjectives, or other adverbs.' },
          { id: 8, text: 'She ___ arrives late. (always)', options: ['He never arrives', 'She always arrives late', 'She arrives always late', 'Always she arrives late'], correct: 1, explanation: 'Frequency adverbs come before the main verb.' },
          { id: 9, text: 'Which is an adverb of frequency?', options: ['quickly', 'here', 'never', 'very'], correct: 2, explanation: '"Never" = frequency adverb (how often).' },
          { id: 10, text: 'What is the adverb form of "happy"?', options: ['happlyly', 'happily', 'happyly', 'hapily'], correct: 1, explanation: 'happy → happily (y → ily).' },
          { id: 11, text: 'I ___ watch TV in the evening. (sometimes)', options: ['Sometimes I watch TV', 'I sometimes watch TV', 'I watch sometimes TV', 'I watch TV sometimes always'], correct: 1, explanation: '"Sometimes" goes before the main verb.' },
          { id: 12, text: 'Which is an adverb of manner?', options: ['never', 'here', 'carefully', 'now'], correct: 2, explanation: '"Carefully" describes HOW something is done = manner adverb.' },
          { id: 13, text: 'She is ___ tired. (very)', options: ['very tired', 'tired very', 'very tiredly', 'tired-very'], correct: 0, explanation: '"Very" comes before the adjective it modifies.' },
          { id: 14, text: 'What is the adverb form of "angry"?', options: ['angrily', 'angryly', 'angry', 'angerly'], correct: 0, explanation: 'angry → angrily (y → ily).' },
          { id: 15, text: '"Hard" as an adverb means:', options: ['difficult', 'with difficulty', 'with great effort', 'badly'], correct: 2, explanation: '"Work hard" = work with great effort (hard = adverb).' },
          { id: 16, text: 'He ___ tells lies. (never = he is honest)', options: ['He tells never lies', 'He never tells lies', 'Never he tells lies', 'He tells lies never'], correct: 1, explanation: '"Never" comes before the main verb: "never tells".' },
          { id: 17, text: 'Which is an adverb of time?', options: ['carefully', 'here', 'always', 'yesterday'], correct: 3, explanation: '"Yesterday" = adverb of time (answers "when?").' },
          { id: 18, text: 'She dances ___. (graceful → adverb)', options: ['graceful', 'gracefuler', 'gracefully', 'gracefulness'], correct: 2, explanation: 'graceful + -ly = gracefully.' },
          { id: 19, text: 'Which adverb means "rarely"?', options: ['always', 'usually', 'often', 'seldom'], correct: 3, explanation: '"Seldom" = rarely, not often.' },
          { id: 20, text: 'The word "late" as an adverb means:', options: ['the latest', 'not on time', 'recently', 'very soon'], correct: 1, explanation: '"He arrived late" = not on time.' },
          { id: 21, text: 'Which sentence places the adverb correctly?', options: ['She eats quickly her food.', 'She quickly eats her food.', 'Quickly she eats food.', 'She eats her food quickly.'], correct: 3, explanation: 'Manner adverbs often go at the END of a sentence.' },
          { id: 22, text: 'What type of adverb is "here"?', options: ['manner', 'time', 'place', 'frequency'], correct: 2, explanation: '"Here" tells us WHERE = place adverb.' },
          { id: 23, text: 'He works ___. (hard)', options: ['hardness', 'hardly', 'hard', 'hardfully'], correct: 2, explanation: '"Hard" remains the same as an adverb.' },
          { id: 24, text: 'What does "hardly" mean?', options: ['very hard', 'with difficulty', 'almost not / barely', 'very strongly'], correct: 2, explanation: '"Hardly" ≠ "hard"! Hardly = almost not / barely.' },
          { id: 25, text: 'She ___ forgets her keys. (always)', options: ['She always forgets', 'Always she forgets', 'She forgets always', 'She always is forgetting'], correct: 0, explanation: '"Always" comes before the main verb: "always forgets".' },
          { id: 26, text: 'What is the adverb form of "easy"?', options: ['easyly', 'easily', 'easy', 'easiness'], correct: 1, explanation: 'easy → easily (y → ily).' },
          { id: 27, text: 'The frequency order from most to least frequent:', options: ['Always > usually > sometimes > rarely > never', 'Never > rarely > sometimes > usually > always', 'Sometimes > usually > always > rarely > never', 'Always > rarely > sometimes > usually > never'], correct: 0, explanation: 'always (100%) > usually > often > sometimes > rarely > never (0%).' },
          { id: 28, text: 'Which sentence uses an adverb of degree?', options: ['She ran quickly.', 'He came yesterday.', 'She is extremely intelligent.', 'They live nearby.'], correct: 2, explanation: '"Extremely" = adverb of degree modifying "intelligent".' },
          { id: 29, text: 'He is ___ right. (almost)', options: ['He almost is right', 'He is almost right', 'Almost he is right', 'He is right almost'], correct: 1, explanation: '"Almost" comes before the adjective it modifies.' },
          { id: 30, text: 'What is the negative frequency adverb meaning 0%?', options: ['rarely', 'seldom', 'never', 'hardly'], correct: 2, explanation: '"Never" = 0% frequency.' },
        ],
        fillBlanks: [
          { id: 1, text: 'She speaks English very ___.', options: ['fluent', 'fluently', 'more fluent', 'fluency'], correct: 1, explanation: 'Use an adverb (fluently) to modify the verb (speaks).' },
          { id: 2, text: 'He is ___ late for class.', options: ['always', 'slowly', 'quietly', 'carefully'], correct: 0, explanation: 'Adverbs of frequency describe how often something happens.' },
          { id: 3, text: 'They walked ___ into the library.', options: ['quiet', 'quietly', 'quieter', 'quietness'], correct: 1, explanation: '"Quietly" is the adverb of manner describing how they walked.' },
          { id: 4, text: 'The exam was ___ difficult.', options: ['extreme', 'extremely', 'extremity', 'more extreme'], correct: 1, explanation: '"Extremely" is an adverb of degree modifying the adjective "difficult".' },
          { id: 5, text: 'We arrived ___ at the airport.', options: ['early', 'softly', 'loudly', 'happily'], correct: 0, explanation: '"Early" is an adverb of time/manner.' },
          { id: 6, text: 'I will call you ___.', options: ['yesterday', 'tomorrow', 'last week', 'ago'], correct: 1, explanation: 'Future tense "will call" requires a future adverb like "tomorrow".' },
          { id: 7, text: 'She sings ___ on stage.', options: ['beautiful', 'beautifully', 'beauty', 'more beautiful'], correct: 1, explanation: 'Adverb of manner "beautifully" modifies the verb "sings".' },
          { id: 8, text: 'Please write your name ___ on the form.', options: ['neat', 'neatly', 'neatest', 'neater'], correct: 1, explanation: 'Use the adverb "neatly" to describe how to write.' },
          { id: 9, text: 'He runs very ___ and won the race.', options: ['fastly', 'fast', 'quick', 'slow'], correct: 1, explanation: '"Fast" is both an adjective and an adverb; "fastly" does not exist.' },
          { id: 10, text: 'I ___ drink coffee in the evening. (almost never)', options: ['always', 'usually', 'rarely', 'often'], correct: 2, explanation: '"Rarely" means almost never (low frequency).' },
          { id: 11, text: 'The sun is shining ___ today.', options: ['bright', 'brightly', 'brightness', 'more bright'], correct: 1, explanation: 'Adverb of manner "brightly" modifies the verb phrase "is shining".' },
          { id: 12, text: 'We have ___ finished our homework.', options: ['almost', 'slowly', 'safely', 'loudly'], correct: 0, explanation: '"Almost" is an adverb of degree meaning nearly.' },
          { id: 13, text: 'He answered the question ___.', options: ['correct', 'correctly', 'correctness', 'more correct'], correct: 1, explanation: 'Use the adverb "correctly" to modify "answered".' },
          { id: 14, text: 'Please speak ___ so the baby can sleep.', options: ['softly', 'loudly', 'hardly', 'fast'], correct: 0, explanation: '"Softly" is the appropriate adverb for a quiet environment.' },
          { id: 15, text: 'She looked at him ___ when he broke the vase.', options: ['angry', 'angrily', 'anger', 'more angry'], correct: 1, explanation: '"Angrily" is the adverb describing the action of looking.' },
          { id: 16, text: 'They play tennis ___ on Sundays.', options: ['weekly', 'week', 'weeks', 'monthly'], correct: 0, explanation: '"Weekly" is the frequency adverb corresponding to once a week.' },
          { id: 17, text: 'He drives ___ on wet roads.', options: ['careful', 'carefully', 'carefulness', 'more careful'], correct: 1, explanation: 'Adverb of manner "carefully" modifies the verb "drives".' },
          { id: 18, text: 'The food was ___ delicious.', options: ['well', 'very', 'good', 'slowly'], correct: 1, explanation: '"Very" is an adverb of degree that modifies adjectives.' },
          { id: 19, text: 'She ___ did the work without help.', options: ['easy', 'easily', 'easiness', 'easier'], correct: 1, explanation: '"Easily" is the adverb modifying "did".' },
          { id: 20, text: 'He did ___ on the test.', options: ['well', 'good', 'fine', 'nicely'], correct: 0, explanation: '"Well" is the adverb form of "good", used to modify the verb "did".' }
        ],
        scrambled: [
          { id: 1, words: ['walked', 'slowly', 'he', 'home'], answer: 'he walked slowly home', explanation: 'Adverb of manner typically goes before the adverb of place or after the verb.' },
          { id: 2, words: ['always', 'I', 'breakfast', 'eat'], answer: 'I always eat breakfast', explanation: 'Frequency adverbs go before the main verb.' },
          { id: 3, words: ['English', 'speaks', 'she', 'fluently'], answer: 'she speaks English fluently', explanation: 'Adverbs of manner go after the object.' },
          { id: 4, words: ['late', 'they', 'are', 'often'], answer: 'they are often late', explanation: 'Frequency adverbs go after the verb to be.' },
          { id: 5, words: ['hard', 'studying', 'is', 'he'], answer: 'he is studying hard', explanation: 'Adverbs of manner like hard go after the main verb.' },
          { id: 6, words: ['will', 'we', 'tomorrow', 'meet'], answer: 'we will meet tomorrow', explanation: 'Time adverbs usually go at the end of the sentence.' },
          { id: 7, words: ['plays', 'she', 'well', 'piano', 'the'], answer: 'she plays the piano well', explanation: 'Adverb of manner "well" goes after the object.' },
          { id: 8, words: ['slept', 'baby', 'the', 'peacefully'], answer: 'the baby slept peacefully', explanation: 'Adverb of manner goes after the intransitive verb.' },
          { id: 9, words: ['never', 'he', 'lies', 'tells'], answer: 'he never tells lies', explanation: 'Frequency adverbs go before the main verb.' },
          { id: 10, words: ['outside', 'raining', 'it', 'heavily', 'is'], answer: 'it is raining heavily outside', explanation: 'Adverb of manner (heavily) + place (outside).' },
          { id: 11, words: ['runs', 'very', 'fast', 'she'], answer: 'she runs very fast', explanation: '"Very" modifies the adverb "fast".' },
          { id: 12, words: ['almost', 'we', 'finished', 'have'], answer: 'we have almost finished', explanation: 'Adverb of degree goes between auxiliary and main verb.' },
          { id: 13, words: ['easily', 'solved', 'he', 'problem', 'the'], answer: 'he easily solved the problem', explanation: 'Adverbs of manner can go before the verb.' },
          { id: 14, words: ['sometimes', 'they', 'movies', 'watch'], answer: 'they sometimes watch movies', explanation: 'Frequency adverb before main verb.' },
          { id: 15, words: ['here', 'come', 'please', 'quickly'], answer: 'please come here quickly', explanation: 'Imperative + place + manner.' },
          { id: 16, words: ['suddenly', 'started', 'rain', 'to', 'it'], answer: 'it suddenly started to rain', explanation: 'Adverb "suddenly" placed before the verb.' },
          { id: 17, words: ['angrily', 'the', 'closed', 'door', 'he'], answer: 'he closed the door angrily', explanation: 'Subject + Verb + Object + Adverb.' },
          { id: 18, words: ['already', 'I', 'homework', 'my', 'did'], answer: 'I already did my homework', explanation: 'Already before the past simple verb.' },
          { id: 19, words: ['carefully', 'read', 'instructions', 'the', 'please'], answer: 'please read the instructions carefully', explanation: 'Adverb of manner at the end of the clause.' },
          { id: 20, words: ['loudly', 'they', 'laughed', 'at', 'joke', 'the'], answer: 'they laughed loudly at the joke', explanation: 'Subject + Verb + Adverb + Prepositional phrase.' }
        ],
        errorCorrection: [
          { id: 1, text: 'She sings very good.', options: ['She', 'sings', 'very', 'good'], correct: 3, wrongPart: 'good', correction: 'well', explanation: 'Modify a verb with the adverb "well", not the adjective "good".' },
          { id: 2, text: 'He runs fastly to catch the train.', options: ['runs', 'fastly', 'to catch', 'the train'], correct: 1, wrongPart: 'fastly', correction: 'fast', explanation: '"Fast" is the adverb form; "fastly" is incorrect.' },
          { id: 3, text: 'They always are late for dinner.', options: ['They', 'always are', 'late for', 'dinner'], correct: 1, wrongPart: 'always are', correction: 'are always', explanation: 'Frequency adverbs must go after the verb to be.' },
          { id: 4, text: 'I walked quiet to the door.', options: ['I', 'walked', 'quiet', 'to the door'], correct: 2, wrongPart: 'quiet', correction: 'quietly', explanation: 'Use the adverb "quietly" to modify the verb "walked".' },
          { id: 5, text: 'The teacher spoke clear to us.', options: ['spoke', 'clear', 'to', 'us'], correct: 1, wrongPart: 'clear', correction: 'clearly', explanation: 'Modify "spoke" with the adverb "clearly".' },
          { id: 6, text: 'He rarely does not eat sweets.', options: ['He', 'rarely', 'does not eat', 'sweets'], correct: 2, wrongPart: 'does not eat', correction: 'eats', explanation: 'Avoid double negatives; "rarely" is already negative.' },
          { id: 7, text: 'She speaks English fluent.', options: ['She', 'speaks', 'English', 'fluent'], correct: 3, wrongPart: 'fluent', correction: 'fluently', explanation: 'Use the adverb "fluently" to modify "speaks".' },
          { id: 8, text: 'We yesterday went to the park.', options: ['We', 'yesterday went', 'to the', 'park'], correct: 1, wrongPart: 'yesterday went', correction: 'went yesterday', explanation: 'Put time adverbs at the end of the sentence or at the beginning.' },
          { id: 9, text: 'He drives extreme carefully.', options: ['He', 'drives', 'extreme', 'carefully'], correct: 2, wrongPart: 'extreme', correction: 'extremely', explanation: 'Use the adverb "extremely" to modify the adverb "carefully".' },
          { id: 10, text: 'The cake smells deliciously.', options: ['The cake', 'smells', 'deliciously', 'No error'], correct: 2, wrongPart: 'deliciously', correction: 'delicious', explanation: 'Sense verbs (smell, taste, look) are linking verbs and take adjectives.' },
          { id: 11, text: 'I almost have finished my breakfast.', options: ['I', 'almost have', 'finished', 'my breakfast'], correct: 1, wrongPart: 'almost have', correction: 'have almost', explanation: 'Place adverbs of degree after the auxiliary verb.' },
          { id: 12, text: 'She plays beautiful the guitar.', options: ['She plays', 'beautiful', 'the guitar', 'No error'], correct: 1, wrongPart: 'beautiful', correction: 'the guitar beautifully', explanation: 'Adverbs cannot separate a verb and its direct object; place it at the end.' },
          { id: 13, text: 'They did the work easy.', options: ['They did', 'the work', 'easy', 'No error'], correct: 2, wrongPart: 'easy', correction: 'easily', explanation: 'Use the adverb "easily" to describe the action.' },
          { id: 14, text: 'He never is at home on weekends.', options: ['He', 'never is', 'at home', 'on weekends'], correct: 1, wrongPart: 'never is', correction: 'is never', explanation: 'Adverbs of frequency go after the verb to be.' },
          { id: 15, text: 'Please write your name neat.', options: ['Please', 'write', 'your name', 'neat'], correct: 3, wrongPart: 'neat', correction: 'neatly', explanation: 'Use the adverb "neatly" to describe how to write.' },
          { id: 16, text: 'We reached safely our destination.', options: ['We', 'reached', 'safely', 'our destination'], correct: 2, wrongPart: 'safely', correction: 'reached our destination safely', explanation: 'Do not put an adverb between a verb and its object.' },
          { id: 17, text: 'I am too much tired today.', options: ['I am', 'too much', 'tired', 'today'], correct: 1, wrongPart: 'too much', correction: 'very / too', explanation: 'Use "very" or "too" before adjectives, not "too much".' },
          { id: 18, text: 'She works hardly every day.', options: ['She', 'works', 'hardly', 'every day'], correct: 2, wrongPart: 'hardly', correction: 'hard', explanation: '"Hardly" means almost not; "hard" means with energy/effort.' },
          { id: 19, text: 'The team played bad yesterday.', options: ['The team', 'played', 'bad', 'yesterday'], correct: 2, wrongPart: 'bad', correction: 'badly', explanation: 'Use the adverb "badly" to modify the verb "played".' },
          { id: 20, text: 'He speaks soft to the baby.', options: ['He', 'speaks', 'soft', 'to the baby'], correct: 2, wrongPart: 'soft', correction: 'softly', explanation: 'Use the adverb "softly" to modify "speaks".' }
        ],
        transform: [
          { id: 1, text: 'Change adjective to adverb: "She is a quick runner."', options: ['She runs quick.', 'She runs quickly.', 'She runs with quick.', 'She is running quick.'], correct: 1, explanation: 'Adjective "quick" becomes adverb "quickly".' },
          { id: 2, text: 'Add "always" to: "She is on time."', options: ['She always is on time.', 'She is always on time.', 'Always she is on time.', 'She is on time always.'], correct: 1, explanation: 'Put "always" after the verb "is".' },
          { id: 3, text: 'Change "good" to adverb: "He is a good player."', options: ['He plays good.', 'He plays well.', 'He plays fine.', 'He plays nicely.'], correct: 1, explanation: 'The adverb of "good" is "well".' },
          { id: 4, text: 'Rewrite with "never": "I do not eat meat."', options: ['I never do eat meat.', 'I never eat meat.', 'I eat never meat.', 'Never I eat meat.'], correct: 1, explanation: '"Never" replaces "do not" and goes before the main verb.' },
          { id: 5, text: 'Change adjective to adverb: "It is a fast train."', options: ['The train runs fastly.', 'The train runs fast.', 'The train runs quickly.', 'The train runs fastness.'], correct: 1, explanation: 'Adverb of "fast" is "fast" (not fastly).' },
          { id: 6, text: 'Rewrite putting the adverb of time at the end: "Yesterday I saw him."', options: ['I yesterday saw him.', 'I saw yesterday him.', 'I saw him yesterday.', 'I saw him yesterday time.'], correct: 2, explanation: 'Time adverbs usually go at the very end.' },
          { id: 7, text: 'Add "extremely" to: "The water is cold."', options: ['The extremely water is cold.', 'The water is cold extremely.', 'The water is extremely cold.', 'Extremely the water is cold.'], correct: 2, explanation: '"Extremely" goes before the adjective "cold".' },
          { id: 8, text: 'Rewrite using an adverb: "He gave an angry reply."', options: ['He replied angry.', 'He replied angrily.', 'He replied with angry.', 'He angrily replying.'], correct: 1, explanation: 'Change "angry" to "angrily" and use it after the verb.' },
          { id: 9, text: 'Add "sometimes" to: "They watch TV."', options: ['Sometimes watch they TV.', 'They watch sometimes TV.', 'They sometimes watch TV.', 'They watch TV sometimes.'], correct: 2, explanation: '"Sometimes" goes before the main verb.' },
          { id: 10, text: 'Change adjective to adverb: "She has a beautiful voice."', options: ['She sings beautiful.', 'She sings beautifully.', 'She beautifully singing.', 'She is beautiful singer.'], correct: 1, explanation: 'Adverb "beautifully" describes how she sings.' },
          { id: 11, text: 'Add "seldom" to: "He goes to parties."', options: ['He seldom goes to parties.', 'He goes seldom to parties.', 'Seldom he goes to parties.', 'He goes to parties seldom.'], correct: 0, explanation: 'Frequency adverbs go before the main verb "goes".' },
          { id: 12, text: 'Rewrite using an adverb: "He is a careful writer."', options: ['He writes careful.', 'He writes carefully.', 'He writes in careful.', 'He carefully writing.'], correct: 1, explanation: 'Adverb "carefully" modifies the verb "writes".' },
          { id: 13, text: 'Add "already" to: "I have eaten breakfast."', options: ['I already have eaten breakfast.', 'I have already eaten breakfast.', 'I have eaten already breakfast.', 'Already I have eaten breakfast.'], correct: 1, explanation: 'Put "already" after the auxiliary verb "have".' },
          { id: 14, text: 'Rewrite using an adverb: "She spoke in a loud voice."', options: ['She spoke loud.', 'She spoke loudly.', 'She loudly speaking.', 'She spoke loudness.'], correct: 1, explanation: '"Loudly" is the adverb of manner replacing "in a loud voice".' },
          { id: 15, text: 'Change adjective to adverb: "They are happy workers."', options: ['They work happy.', 'They work happily.', 'They happily working.', 'They work with happy.'], correct: 1, explanation: 'Adjective "happy" becomes adverb "happily".' },
          { id: 16, text: 'Add "often" to: "We visit them."', options: ['Often we visit them.', 'We visit often them.', 'We often visit them.', 'We visit them often.'], correct: 2, explanation: '"Often" goes before the main verb.' },
          { id: 17, text: 'Change adjective to adverb: "The stop was sudden."', options: ['The car stopped suddenly.', 'The car stopped sudden.', 'The car suddenly stopping.', 'The car stopped in sudden.'], correct: 0, explanation: 'Adverb "suddenly" describes the action "stopped".' },
          { id: 18, text: 'Change adjective to adverb: "He is a bad painter."', options: ['He paints bad.', 'He paints badly.', 'He badly painting.', 'He paints badness.'], correct: 1, explanation: 'Adverb of "bad" is "badly".' },
          { id: 19, text: 'Rewrite using "rarely": "She does not visit us often."', options: ['She rarely does not visit us.', 'She rarely visits us.', 'Rarely she visits us.', 'She visits us rarely.'], correct: 1, explanation: '"Rarely" replaces "does not...often" and goes before the verb.' },
          { id: 20, text: 'Change adjective to adverb: "We had a quiet dinner."', options: ['We dined quiet.', 'We dined quietly.', 'We quietly dining.', 'We dined in quiet.'], correct: 1, explanation: 'Adverb "quietly" modifies the verb "dined".' }
        ],
        dialogue: [
          { id: 1, situation: 'Talking about communication.', dialogue: 'A: How does he speak?\nB: He speaks ___ so I cannot hear him.', options: ['softly', 'loudly', 'quickly', 'clearly'], correct: 0, explanation: '"Softly" means quietly, which makes it hard to hear.' },
          { id: 2, situation: 'Planning workout routines.', dialogue: 'A: Do you go to the gym?\nB: Yes, I go there ___. Three times a week.', options: ['rarely', 'regularly', 'never', 'yesterday'], correct: 1, explanation: '"Regularly" fits a set schedule like three times a week.' },
          { id: 3, situation: 'Talking about a child sleeping.', dialogue: 'A: Did the baby sleep well?\nB: Yes, she slept ___ all night.', options: ['peacefully', 'peaceful', 'loudly', 'angry'], correct: 0, explanation: '"Peacefully" is the correct adverb of manner.' },
          { id: 4, situation: 'Talking about a school assignment.', dialogue: 'A: When will you do your project?\nB: I will do it ___ because it is due in one hour.', options: ['immediately', 'yesterday', 'never', 'seldom'], correct: 0, explanation: '"Immediately" means right now, necessary since it is due soon.' },
          { id: 5, situation: 'Checking transport times.', dialogue: 'A: Is the train ever late?\nB: No, it is ___ on time. It is very reliable.', options: ['always', 'seldom', 'rarely', 'never'], correct: 0, explanation: 'Reliable transport is "always" on time.' },
          { id: 6, situation: 'Discussing a maths problem.', dialogue: 'A: How did she solve that hard puzzle?\nB: She did it ___ in just one minute.', options: ['easily', 'difficultly', 'slowly', 'hardly'], correct: 0, explanation: 'Solving a hard puzzle in one minute means it was done "easily".' },
          { id: 7, situation: 'Talking about hot drink habits.', dialogue: 'A: Do you drink coffee?\nB: Yes, but only ___ — maybe once a month.', options: ['rarely', 'often', 'always', 'usually'], correct: 0, explanation: 'Once a month is low frequency, which is "rarely".' },
          { id: 8, situation: 'Carrying fragile items.', dialogue: 'A: Be careful with those glasses!\nB: Don\'t worry, I am holding them ___.', options: ['careless', 'carefully', 'careful', 'hardly'], correct: 1, explanation: '"Carefully" describes how to hold fragile items.' },
          { id: 9, situation: 'Watching a running race.', dialogue: 'A: Look at the leader!\nB: Yes, he runs very ___!', options: ['fastly', 'fast', 'slowly', 'quietly'], correct: 1, explanation: '"Fast" is the correct adverb for high speed.' },
          { id: 10, situation: 'Arriving at a cinema.', dialogue: 'A: Why are you whispering?\nB: The film is starting, so talk ___.', options: ['loudly', 'quietly', 'quiet', 'quick'], correct: 1, explanation: '"Quietly" is the adverb describing how to talk during a film.' },
          { id: 11, situation: 'After a disappointing sports match.', dialogue: 'A: How did the team do?\nB: Unfortunately, they played ___ and lost.', options: ['good', 'badly', 'bad', 'well'], correct: 1, explanation: 'Use the adverb "badly" to describe how they played.' },
          { id: 12, situation: 'Arriving at an exam.', dialogue: 'A: Did you finish the test?\nB: Yes, I ___ finished on time with one minute left.', options: ['almost', 'never', 'always', 'slowly'], correct: 0, explanation: 'Finishing with one minute left means you "almost" ran out of time.' },
          { id: 13, situation: 'Discussing weather conditions.', dialogue: 'A: Why did you close the windows?\nB: It is raining ___ outside.', options: ['heavy', 'heavily', 'softly', 'quietly'], correct: 1, explanation: '"Heavily" is the adverb describing intense rain.' },
          { id: 14, situation: 'Leaving the house.', dialogue: 'A: When are we leaving?\nB: We are leaving ___! Put your shoes on!', options: ['yesterday', 'now', 'tomorrow', 'seldom'], correct: 1, explanation: '"Now" is the adverb of time indicating immediate action.' },
          { id: 15, situation: 'Discussing a strange sound.', dialogue: 'A: What was that noise?\nB: The cat is acting ___ today.', options: ['strangely', 'strange', 'softly', 'loudly'], correct: 0, explanation: 'Adverb "strangely" modifies the verb "acting".' },
          { id: 16, situation: 'Meeting a busy friend.', dialogue: 'A: Do you see John often?\nB: No, we ___ meet because he is so busy.', options: ['always', 'usually', 'seldom', 'frequently'], correct: 2, explanation: '"Seldom" means rarely, appropriate for a busy friend.' },
          { id: 17, situation: 'Visiting an art gallery.', dialogue: 'A: Do you like her paintings?\nB: Yes, she paints ___.', options: ['beautiful', 'beautifully', 'badly', 'ugly'], correct: 1, explanation: '"Beautifully" is the adverb of manner expressing appreciation.' },
          { id: 18, situation: 'Discussing a swimming race.', dialogue: 'A: Can you swim?\nB: Yes, I can swim ___.', options: ['good', 'well', 'beautiful', 'hardly'], correct: 1, explanation: '"Well" is the adverb describing ability to swim.' },
          { id: 19, situation: 'Reviewing a book.', dialogue: 'A: Is the book interesting?\nB: Yes, it is ___ good. I read it in one day.', options: ['very', 'well', 'slowly', 'quickly'], correct: 0, explanation: '"Very" is an adverb of degree modifying the adjective "good".' },
          { id: 20, situation: 'Receiving a text reply.', dialogue: 'A: Did he write back?\nB: Yes, he replied ___ to my message.', options: ['quickly', 'quick', 'slowly', 'hardly'], correct: 0, explanation: '"Quickly" is the adverb describing a fast response.' }
        ],
        fillBlanks: [
          { id: 1, text: 'She speaks English very ___.', options: ['fluent', 'fluently', 'more fluent', 'fluency'], correct: 1, explanation: 'Use an adverb (fluently) to modify the verb (speaks).' },
          { id: 2, text: 'He is ___ late for class.', options: ['always', 'slowly', 'quietly', 'carefully'], correct: 0, explanation: 'Adverbs of frequency describe how often something happens.' },
          { id: 3, text: 'They walked ___ into the library.', options: ['quiet', 'quietly', 'quieter', 'quietness'], correct: 1, explanation: '"Quietly" is the adverb of manner describing how they walked.' },
          { id: 4, text: 'The exam was ___ difficult.', options: ['extreme', 'extremely', 'extremity', 'more extreme'], correct: 1, explanation: '"Extremely" is an adverb of degree modifying the adjective "difficult".' },
          { id: 5, text: 'We arrived ___ at the airport.', options: ['early', 'softly', 'loudly', 'happily'], correct: 0, explanation: '"Early" is an adverb of time/manner.' },
          { id: 6, text: 'I will call you ___.', options: ['yesterday', 'tomorrow', 'last week', 'ago'], correct: 1, explanation: 'Future tense "will call" requires a future adverb like "tomorrow".' },
          { id: 7, text: 'She sings ___ on stage.', options: ['beautiful', 'beautifully', 'beauty', 'more beautiful'], correct: 1, explanation: 'Adverb of manner "beautifully" modifies the verb "sings".' },
          { id: 8, text: 'Please write your name ___ on the form.', options: ['neat', 'neatly', 'neatest', 'neater'], correct: 1, explanation: 'Use the adverb "neatly" to describe how to write.' },
          { id: 9, text: 'He runs very ___ and won the race.', options: ['fastly', 'fast', 'quick', 'slow'], correct: 1, explanation: '"Fast" is both an adjective and an adverb; "fastly" does not exist.' },
          { id: 10, text: 'I ___ drink coffee in the evening. (almost never)', options: ['always', 'usually', 'rarely', 'often'], correct: 2, explanation: '"Rarely" means almost never (low frequency).' },
          { id: 11, text: 'The sun is shining ___ today.', options: ['bright', 'brightly', 'brightness', 'more bright'], correct: 1, explanation: 'Adverb of manner "brightly" modifies the verb phrase "is shining".' },
          { id: 12, text: 'We have ___ finished our homework.', options: ['almost', 'slowly', 'safely', 'loudly'], correct: 0, explanation: '"Almost" is an adverb of degree meaning nearly.' },
          { id: 13, text: 'He answered the question ___.', options: ['correct', 'correctly', 'correctness', 'more correct'], correct: 1, explanation: 'Use the adverb "correctly" to modify "answered".' },
          { id: 14, text: 'Please speak ___ so the baby can sleep.', options: ['softly', 'loudly', 'hardly', 'fast'], correct: 0, explanation: '"Softly" is the appropriate adverb for a quiet environment.' },
          { id: 15, text: 'She looked at him ___ when he broke the vase.', options: ['angry', 'angrily', 'anger', 'more angry'], correct: 1, explanation: '"Angrily" is the adverb describing the action of looking.' },
          { id: 16, text: 'They play tennis ___ on Sundays.', options: ['weekly', 'week', 'weeks', 'monthly'], correct: 0, explanation: '"Weekly" is the frequency adverb corresponding to once a week.' },
          { id: 17, text: 'He drives ___ on wet roads.', options: ['careful', 'carefully', 'carefulness', 'more careful'], correct: 1, explanation: 'Adverb of manner "carefully" modifies the verb "drives".' },
          { id: 18, text: 'The food was ___ delicious.', options: ['well', 'very', 'good', 'slowly'], correct: 1, explanation: '"Very" is an adverb of degree that modifies adjectives.' },
          { id: 19, text: 'She ___ did the work without help.', options: ['easy', 'easily', 'easiness', 'easier'], correct: 1, explanation: '"Easily" is the adverb modifying "did".' },
          { id: 20, text: 'He did ___ on the test.', options: ['well', 'good', 'fine', 'nicely'], correct: 0, explanation: '"Well" is the adverb form of "good", used to modify the verb "did".' }
        ],
        scrambled: [
          { id: 1, words: ['walked', 'slowly', 'he', 'home'], answer: 'he walked slowly home', explanation: 'Adverb of manner typically goes before the adverb of place or after the verb.' },
          { id: 2, words: ['always', 'I', 'breakfast', 'eat'], answer: 'I always eat breakfast', explanation: 'Frequency adverbs go before the main verb.' },
          { id: 3, words: ['English', 'speaks', 'she', 'fluently'], answer: 'she speaks English fluently', explanation: 'Adverbs of manner go after the object.' },
          { id: 4, words: ['late', 'they', 'are', 'often'], answer: 'they are often late', explanation: 'Frequency adverbs go after the verb to be.' },
          { id: 5, words: ['hard', 'studying', 'is', 'he'], answer: 'he is studying hard', explanation: 'Adverbs of manner like hard go after the main verb.' },
          { id: 6, words: ['will', 'we', 'tomorrow', 'meet'], answer: 'we will meet tomorrow', explanation: 'Time adverbs usually go at the end of the sentence.' },
          { id: 7, words: ['plays', 'she', 'well', 'piano', 'the'], answer: 'she plays the piano well', explanation: 'Adverb of manner "well" goes after the object.' },
          { id: 8, words: ['slept', 'baby', 'the', 'peacefully'], answer: 'the baby slept peacefully', explanation: 'Adverb of manner goes after the intransitive verb.' },
          { id: 9, words: ['never', 'he', 'lies', 'tells'], answer: 'he never tells lies', explanation: 'Frequency adverbs go before the main verb.' },
          { id: 10, words: ['outside', 'raining', 'it', 'heavily', 'is'], answer: 'it is raining heavily outside', explanation: 'Adverb of manner (heavily) + place (outside).' },
          { id: 11, words: ['runs', 'very', 'fast', 'she'], answer: 'she runs very fast', explanation: '"Very" modifies the adverb "fast".' },
          { id: 12, words: ['almost', 'we', 'finished', 'have'], answer: 'we have almost finished', explanation: 'Adverb of degree goes between auxiliary and main verb.' },
          { id: 13, words: ['easily', 'solved', 'he', 'problem', 'the'], answer: 'he easily solved the problem', explanation: 'Adverbs of manner can go before the verb.' },
          { id: 14, words: ['sometimes', 'they', 'movies', 'watch'], answer: 'they sometimes watch movies', explanation: 'Frequency adverb before main verb.' },
          { id: 15, words: ['here', 'come', 'please', 'quickly'], answer: 'please come here quickly', explanation: 'Imperative + place + manner.' },
          { id: 16, words: ['suddenly', 'started', 'rain', 'to', 'it'], answer: 'it suddenly started to rain', explanation: 'Adverb "suddenly" placed before the verb.' },
          { id: 17, words: ['angrily', 'the', 'closed', 'door', 'he'], answer: 'he closed the door angrily', explanation: 'Subject + Verb + Object + Adverb.' },
          { id: 18, words: ['already', 'I', 'homework', 'my', 'did'], answer: 'I already did my homework', explanation: 'Already before the past simple verb.' },
          { id: 19, words: ['carefully', 'read', 'instructions', 'the', 'please'], answer: 'please read the instructions carefully', explanation: 'Adverb of manner at the end of the clause.' },
          { id: 20, words: ['loudly', 'they', 'laughed', 'at', 'joke', 'the'], answer: 'they laughed loudly at the joke', explanation: 'Subject + Verb + Adverb + Prepositional phrase.' }
        ],
        errorCorrection: [
          { id: 1, text: 'She sings very good.', options: ['She', 'sings', 'very', 'good'], correct: 3, wrongPart: 'good', correction: 'well', explanation: 'Modify a verb with the adverb "well", not the adjective "good".' },
          { id: 2, text: 'He runs fastly to catch the train.', options: ['runs', 'fastly', 'to catch', 'the train'], correct: 1, wrongPart: 'fastly', correction: 'fast', explanation: '"Fast" is the adverb form; "fastly" is incorrect.' },
          { id: 3, text: 'They always are late for dinner.', options: ['They', 'always are', 'late for', 'dinner'], correct: 1, wrongPart: 'always are', correction: 'are always', explanation: 'Frequency adverbs must go after the verb to be.' },
          { id: 4, text: 'I walked quiet to the door.', options: ['I', 'walked', 'quiet', 'to the door'], correct: 2, wrongPart: 'quiet', correction: 'quietly', explanation: 'Use the adverb "quietly" to modify the verb "walked".' },
          { id: 5, text: 'The teacher spoke clear to us.', options: ['spoke', 'clear', 'to', 'us'], correct: 1, wrongPart: 'clear', correction: 'clearly', explanation: 'Modify "spoke" with the adverb "clearly".' },
          { id: 6, text: 'He rarely does not eat sweets.', options: ['He', 'rarely', 'does not eat', 'sweets'], correct: 2, wrongPart: 'does not eat', correction: 'eats', explanation: 'Avoid double negatives; "rarely" is already negative.' },
          { id: 7, text: 'She speaks English fluent.', options: ['She', 'speaks', 'English', 'fluent'], correct: 3, wrongPart: 'fluent', correction: 'fluently', explanation: 'Use the adverb "fluently" to modify "speaks".' },
          { id: 8, text: 'We yesterday went to the park.', options: ['We', 'yesterday went', 'to the', 'park'], correct: 1, wrongPart: 'yesterday went', correction: 'went yesterday', explanation: 'Put time adverbs at the end of the sentence or at the beginning.' },
          { id: 9, text: 'He drives extreme carefully.', options: ['He', 'drives', 'extreme', 'carefully'], correct: 2, wrongPart: 'extreme', correction: 'extremely', explanation: 'Use the adverb "extremely" to modify the adverb "carefully".' },
          { id: 10, text: 'The cake smells deliciously.', options: ['The cake', 'smells', 'deliciously', 'No error'], correct: 2, wrongPart: 'deliciously', correction: 'delicious', explanation: 'Sense verbs (smell, taste, look) are linking verbs and take adjectives.' },
          { id: 11, text: 'I almost have finished my breakfast.', options: ['I', 'almost have', 'finished', 'my breakfast'], correct: 1, wrongPart: 'almost have', correction: 'have almost', explanation: 'Place adverbs of degree after the auxiliary verb.' },
          { id: 12, text: 'She plays beautiful the guitar.', options: ['She plays', 'beautiful', 'the guitar', 'No error'], correct: 1, wrongPart: 'beautiful', correction: 'the guitar beautifully', explanation: 'Adverbs cannot separate a verb and its direct object; place it at the end.' },
          { id: 13, text: 'They did the work easy.', options: ['They did', 'the work', 'easy', 'No error'], correct: 2, wrongPart: 'easy', correction: 'easily', explanation: 'Use the adverb "easily" to describe the action.' },
          { id: 14, text: 'He never is at home on weekends.', options: ['He', 'never is', 'at home', 'on weekends'], correct: 1, wrongPart: 'never is', correction: 'is never', explanation: 'Adverbs of frequency go after the verb to be.' },
          { id: 15, text: 'Please write your name neat.', options: ['Please', 'write', 'your name', 'neat'], correct: 3, wrongPart: 'neat', correction: 'neatly', explanation: 'Use the adverb "neatly" to describe how to write.' },
          { id: 16, text: 'We reached safely our destination.', options: ['We', 'reached', 'safely', 'our destination'], correct: 2, wrongPart: 'safely', correction: 'reached our destination safely', explanation: 'Do not put an adverb between a verb and its object.' },
          { id: 17, text: 'I am too much tired today.', options: ['I am', 'too much', 'tired', 'today'], correct: 1, wrongPart: 'too much', correction: 'very / too', explanation: 'Use "very" or "too" before adjectives, not "too much".' },
          { id: 18, text: 'She works hardly every day.', options: ['She', 'works', 'hardly', 'every day'], correct: 2, wrongPart: 'hardly', correction: 'hard', explanation: '"Hardly" means almost not; "hard" means with energy/effort.' },
          { id: 19, text: 'The team played bad yesterday.', options: ['The team', 'played', 'bad', 'yesterday'], correct: 2, wrongPart: 'bad', correction: 'badly', explanation: 'Use the adverb "badly" to modify the verb "played".' },
          { id: 20, text: 'He speaks soft to the baby.', options: ['He', 'speaks', 'soft', 'to the baby'], correct: 2, wrongPart: 'soft', correction: 'softly', explanation: 'Use the adverb "softly" to modify "speaks".' }
        ],
        transform: [
          { id: 1, text: 'Change adjective to adverb: "She is a quick runner."', options: ['She runs quick.', 'She runs quickly.', 'She runs with quick.', 'She is running quick.'], correct: 1, explanation: 'Adjective "quick" becomes adverb "quickly".' },
          { id: 2, text: 'Add "always" to: "She is on time."', options: ['She always is on time.', 'She is always on time.', 'Always she is on time.', 'She is on time always.'], correct: 1, explanation: 'Put "always" after the verb "is".' },
          { id: 3, text: 'Change "good" to adverb: "He is a good player."', options: ['He plays good.', 'He plays well.', 'He plays fine.', 'He plays nicely.'], correct: 1, explanation: 'The adverb of "good" is "well".' },
          { id: 4, text: 'Rewrite with "never": "I do not eat meat."', options: ['I never do eat meat.', 'I never eat meat.', 'I eat never meat.', 'Never I eat meat.'], correct: 1, explanation: '"Never" replaces "do not" and goes before the main verb.' },
          { id: 5, text: 'Change adjective to adverb: "It is a fast train."', options: ['The train runs fastly.', 'The train runs fast.', 'The train runs quickly.', 'The train runs fastness.'], correct: 1, explanation: 'Adverb of "fast" is "fast" (not fastly).' },
          { id: 6, text: 'Rewrite putting the adverb of time at the end: "Yesterday I saw him."', options: ['I yesterday saw him.', 'I saw yesterday him.', 'I saw him yesterday.', 'I saw him yesterday time.'], correct: 2, explanation: 'Time adverbs usually go at the very end.' },
          { id: 7, text: 'Add "extremely" to: "The water is cold."', options: ['The extremely water is cold.', 'The water is cold extremely.', 'The water is extremely cold.', 'Extremely the water is cold.'], correct: 2, explanation: '"Extremely" goes before the adjective "cold".' },
          { id: 8, text: 'Rewrite using an adverb: "He gave an angry reply."', options: ['He replied angry.', 'He replied angrily.', 'He replied with angry.', 'He angrily replying.'], correct: 1, explanation: 'Change "angry" to "angrily" and use it after the verb.' },
          { id: 9, text: 'Add "sometimes" to: "They watch TV."', options: ['Sometimes watch they TV.', 'They watch sometimes TV.', 'They sometimes watch TV.', 'They watch TV sometimes.'], correct: 2, explanation: '"Sometimes" goes before the main verb.' },
          { id: 10, text: 'Change adjective to adverb: "She has a beautiful voice."', options: ['She sings beautiful.', 'She sings beautifully.', 'She beautifully singing.', 'She is beautiful singer.'], correct: 1, explanation: 'Adverb "beautifully" describes how she sings.' },
          { id: 11, text: 'Add "seldom" to: "He goes to parties."', options: ['He seldom goes to parties.', 'He goes seldom to parties.', 'Seldom he goes to parties.', 'He goes to parties seldom.'], correct: 0, explanation: 'Frequency adverbs go before the main verb "goes".' },
          { id: 12, text: 'Rewrite using an adverb: "He is a careful writer."', options: ['He writes careful.', 'He writes carefully.', 'He writes in careful.', 'He carefully writing.'], correct: 1, explanation: 'Adverb "carefully" modifies the verb "writes".' },
          { id: 13, text: 'Add "already" to: "I have eaten breakfast."', options: ['I already have eaten breakfast.', 'I have already eaten breakfast.', 'I have eaten already breakfast.', 'Already I have eaten breakfast.'], correct: 1, explanation: 'Put "already" after the auxiliary verb "have".' },
          { id: 14, text: 'Rewrite using an adverb: "She spoke in a loud voice."', options: ['She spoke loud.', 'She spoke loudly.', 'She loudly speaking.', 'She spoke loudness.'], correct: 1, explanation: '"Loudly" is the adverb of manner replacing "in a loud voice".' },
          { id: 15, text: 'Change adjective to adverb: "They are happy workers."', options: ['They work happy.', 'They work happily.', 'They happily working.', 'They work with happy.'], correct: 1, explanation: 'Adjective "happy" becomes adverb "happily".' },
          { id: 16, text: 'Add "often" to: "We visit them."', options: ['Often we visit them.', 'We visit often them.', 'We often visit them.', 'We visit them often.'], correct: 2, explanation: '"Often" goes before the main verb.' },
          { id: 17, text: 'Change adjective to adverb: "The stop was sudden."', options: ['The car stopped suddenly.', 'The car stopped sudden.', 'The car suddenly stopping.', 'The car stopped in sudden.'], correct: 0, explanation: 'Adverb "suddenly" describes the action "stopped".' },
          { id: 18, text: 'Change adjective to adverb: "He is a bad painter."', options: ['He paints bad.', 'He paints badly.', 'He badly painting.', 'He paints badness.'], correct: 1, explanation: 'Adverb of "bad" is "badly".' },
          { id: 19, text: 'Rewrite using "rarely": "She does not visit us often."', options: ['She rarely does not visit us.', 'She rarely visits us.', 'Rarely she visits us.', 'She visits us rarely.'], correct: 1, explanation: '"Rarely" replaces "does not...often" and goes before the verb.' },
          { id: 20, text: 'Change adjective to adverb: "We had a quiet dinner."', options: ['We dined quiet.', 'We dined quietly.', 'We quietly dining.', 'We dined in quiet.'], correct: 1, explanation: 'Adverb "quietly" modifies the verb "dined".' }
        ],
        dialogue: [
          { id: 1, situation: 'Talking about communication.', dialogue: 'A: How does he speak?\nB: He speaks ___ so I cannot hear him.', options: ['softly', 'loudly', 'quickly', 'clearly'], correct: 0, explanation: '"Softly" means quietly, which makes it hard to hear.' },
          { id: 2, situation: 'Planning workout routines.', dialogue: 'A: Do you go to the gym?\nB: Yes, I go there ___. Three times a week.', options: ['rarely', 'regularly', 'never', 'yesterday'], correct: 1, explanation: '"Regularly" fits a set schedule like three times a week.' },
          { id: 3, situation: 'Talking about a child sleeping.', dialogue: 'A: Did the baby sleep well?\nB: Yes, she slept ___ all night.', options: ['peacefully', 'peaceful', 'loudly', 'angry'], correct: 0, explanation: '"Peacefully" is the correct adverb of manner.' },
          { id: 4, situation: 'Talking about a school assignment.', dialogue: 'A: When will you do your project?\nB: I will do it ___ because it is due in one hour.', options: ['immediately', 'yesterday', 'never', 'seldom'], correct: 0, explanation: '"Immediately" means right now, necessary since it is due soon.' },
          { id: 5, situation: 'Checking transport times.', dialogue: 'A: Is the train ever late?\nB: No, it is ___ on time. It is very reliable.', options: ['always', 'seldom', 'rarely', 'never'], correct: 0, explanation: 'Reliable transport is "always" on time.' },
          { id: 6, situation: 'Discussing a maths problem.', dialogue: 'A: How did she solve that hard puzzle?\nB: She did it ___ in just one minute.', options: ['easily', 'difficultly', 'slowly', 'hardly'], correct: 0, explanation: 'Solving a hard puzzle in one minute means it was done "easily".' },
          { id: 7, situation: 'Talking about hot drink habits.', dialogue: 'A: Do you drink coffee?\nB: Yes, but only ___ — maybe once a month.', options: ['rarely', 'often', 'always', 'usually'], correct: 0, explanation: 'Once a month is low frequency, which is "rarely".' },
          { id: 8, situation: 'Carrying fragile items.', dialogue: 'A: Be careful with those glasses!\nB: Don\'t worry, I am holding them ___.', options: ['careless', 'carefully', 'careful', 'hardly'], correct: 1, explanation: '"Carefully" describes how to hold fragile items.' },
          { id: 9, situation: 'Watching a running race.', dialogue: 'A: Look at the leader!\nB: Yes, he runs very ___!', options: ['fastly', 'fast', 'slowly', 'quietly'], correct: 1, explanation: '"Fast" is the correct adverb for high speed.' },
          { id: 10, situation: 'Arriving at a cinema.', dialogue: 'A: Why are you whispering?\nB: The film is starting, so talk ___.', options: ['loudly', 'quietly', 'quiet', 'quick'], correct: 1, explanation: '"Quietly" is the adverb describing how to talk during a film.' },
          { id: 11, situation: 'After a disappointing sports match.', dialogue: 'A: How did the team do?\nB: Unfortunately, they played ___ and lost.', options: ['good', 'badly', 'bad', 'well'], correct: 1, explanation: 'Use the adverb "badly" to describe how they played.' },
          { id: 12, situation: 'Arriving at an exam.', dialogue: 'A: Did you finish the test?\nB: Yes, I ___ finished on time with one minute left.', options: ['almost', 'never', 'always', 'slowly'], correct: 0, explanation: 'Finishing with one minute left means you "almost" ran out of time.' },
          { id: 13, situation: 'Discussing weather conditions.', dialogue: 'A: Why did you close the windows?\nB: It is raining ___ outside.', options: ['heavy', 'heavily', 'softly', 'quietly'], correct: 1, explanation: '"Heavily" is the adverb describing intense rain.' },
          { id: 14, situation: 'Leaving the house.', dialogue: 'A: When are we leaving?\nB: We are leaving ___! Put your shoes on!', options: ['yesterday', 'now', 'tomorrow', 'seldom'], correct: 1, explanation: '"Now" is the adverb of time indicating immediate action.' },
          { id: 15, situation: 'Discussing a strange sound.', dialogue: 'A: What was that noise?\nB: The cat is acting ___ today.', options: ['strangely', 'strange', 'softly', 'loudly'], correct: 0, explanation: 'Adverb "strangely" modifies the verb "acting".' },
          { id: 16, situation: 'Meeting a busy friend.', dialogue: 'A: Do you see John often?\nB: No, we ___ meet because he is so busy.', options: ['always', 'usually', 'seldom', 'frequently'], correct: 2, explanation: '"Seldom" means rarely, appropriate for a busy friend.' },
          { id: 17, situation: 'Visiting an art gallery.', dialogue: 'A: Do you like her paintings?\nB: Yes, she paints ___.', options: ['beautiful', 'beautifully', 'badly', 'ugly'], correct: 1, explanation: '"Beautifully" is the adverb of manner expressing appreciation.' },
          { id: 18, situation: 'Discussing a swimming race.', dialogue: 'A: Can you swim?\nB: Yes, I can swim ___.', options: ['good', 'well', 'beautiful', 'hardly'], correct: 1, explanation: '"Well" is the adverb describing ability to swim.' },
          { id: 19, situation: 'Reviewing a book.', dialogue: 'A: Is the book interesting?\nB: Yes, it is ___ good. I read it in one day.', options: ['very', 'well', 'slowly', 'quickly'], correct: 0, explanation: '"Very" is an adverb of degree modifying the adjective "good".' },
          { id: 20, situation: 'Receiving a text reply.', dialogue: 'A: Did he write back?\nB: Yes, he replied ___ to my message.', options: ['quickly', 'quick', 'slowly', 'hardly'], correct: 0, explanation: '"Quickly" is the adverb describing a fast response.' }
        ]
      },
      {
        id: 'numerals',
        title: 'Numerals',
        icon: '🔢',
        guide: `## Sonlar (Numerals)

Ingliz tilida sonlar bir necha turga bo'linadi.

## 1. Sanoq sonlar (Cardinal Numbers)
Miqdorni bildiradi: one, two, three, four, five...
• 11 — eleven
• 12 — twelve
• 13 — thirteen (va -teen qo'shimchasini oladiganlar)
• 20 — twenty
• 21 — twenty-one (defis bilan)
• 100 — one hundred
• 1,000 — one thousand

## 2. Tartib sonlar (Ordinal Numbers)
Tartibni bildiradi: first, second, third, fourth...
• 1st — first (birinchi)
• 2nd — second (ikkinchi)
• 3rd — third (uchinchi)
• 4th — fourth, 5th — fifth
• 21st — twenty-first

## Muhim qoidalar
• 13 vs 30: thirTEEN (urgʻu oxirida) vs THIRty (urgʻu boshida)
• "And" — inglizda 100 dan keyin ishlatiladi: 101 = one hundred AND one
• Telefon raqamlar: 0 — "oh" yoki "zero"
• Yillar: 1999 = nineteen ninety-nine

## Kasrlar (Fractions)
• 1/2 — one half / a half
• 1/3 — one third
• 1/4 — one quarter / a quarter
• 3/4 — three quarters`,
        questions: [
          { id: 1, text: 'What is 13 in words?', options: ['thirty', 'thirdteen', 'thirteen', 'thirten'], correct: 2, explanation: '13 = thirteen.' },
          { id: 2, text: 'What is the ordinal form of "1"?', options: ['oneth', 'first', 'oned', 'primary'], correct: 1, explanation: '1st = first (irregular ordinal).' },
          { id: 3, text: 'How do you write 21 in words?', options: ['twenty one', 'twenty-one', 'twentyone', 'two-one'], correct: 1, explanation: 'Compound numbers 21-99 use a hyphen: twenty-one.' },
          { id: 4, text: 'What is the ordinal form of "2"?', options: ['twoth', 'twond', 'second', 'secund'], correct: 2, explanation: '2nd = second (irregular ordinal).' },
          { id: 5, text: 'What is the ordinal form of "3"?', options: ['threeth', 'third', 'thrird', 'thirdly'], correct: 1, explanation: '3rd = third (irregular ordinal).' },
          { id: 6, text: 'How do you say 100?', options: ['a hundred', 'hundred', 'one hundred', 'Both A and C'], correct: 3, explanation: 'Both "a hundred" and "one hundred" are correct.' },
          { id: 7, text: 'What is 1/4 in words?', options: ['one fourth', 'one quarter', 'a quarter', 'All of the above'], correct: 3, explanation: '1/4 = one fourth / one quarter / a quarter — all correct.' },
          { id: 8, text: 'How is "1999" read as a year?', options: ['one thousand nine hundred ninety nine', 'nineteen ninety-nine', 'one nine nine nine', 'nineteen hundred ninety-nine'], correct: 1, explanation: 'Years: 1999 = nineteen ninety-nine.' },
          { id: 9, text: 'What is the ordinal form of "12"?', options: ['twelveth', 'twelfth', 'twelve', 'twelth'], correct: 1, explanation: '12th = twelfth (note the spelling change).' },
          { id: 10, text: 'How do you write 101 in words?', options: ['one hundred one', 'one hundred and one', 'hundred and one', 'one hundred or one'], correct: 1, explanation: '101 = one hundred AND one ("and" after hundreds).' },
          { id: 11, text: 'What is the ordinal form of "5"?', options: ['fiveth', 'fifh', 'fifth', 'fivth'], correct: 2, explanation: '5th = fifth (five → fifth, drop the e, add th).' },
          { id: 12, text: 'How do you say "0" in a phone number?', options: ['nil', 'zero or oh', 'nothing', 'none'], correct: 1, explanation: 'In phone numbers, 0 is said as "oh" or "zero".' },
          { id: 13, text: 'What number comes after "nineteen"?', options: ['nineteen-one', 'twenty', 'twenny', 'ninety'], correct: 1, explanation: 'After 19 comes 20 = twenty.' },
          { id: 14, text: 'What is the ordinal of "4"?', options: ['fourt', 'fourch', 'fourth', 'fore'], correct: 2, explanation: '4th = fourth.' },
          { id: 15, text: 'Cardinal numbers express:', options: ['order/position', 'quantity/amount', 'fractions', 'dates only'], correct: 1, explanation: 'Cardinal numbers (one, two, three) express quantity.' },
          { id: 16, text: 'Ordinal numbers are used for:', options: ['counting objects', 'math operations', 'dates, positions, and order', 'phone numbers'], correct: 2, explanation: 'Ordinal numbers (first, second) show position/order.' },
          { id: 17, text: 'What is "30" in words?', options: ['thirteen', 'thirtieth', 'thirty', 'thirthy'], correct: 2, explanation: '30 = thirty.' },
          { id: 18, text: 'How do you write "My birthday is on 3 June" using ordinal?', options: ['My birthday is on three June', 'My birthday is on the third of June', 'My birthday is on 3 June', 'B and C are both common'], correct: 3, explanation: 'Both "the third of June" and "3 June" (read as "the third") are common.' },
          { id: 19, text: 'What is 1/2 in words?', options: ['one second', 'a half', 'one halve', 'the half'], correct: 1, explanation: '1/2 = a half / one half.' },
          { id: 20, text: 'What is "1,000,000" in words?', options: ['a billion', 'a million', 'ten hundred thousand', 'one thousand thousand'], correct: 1, explanation: '1,000,000 = one million.' },
          { id: 21, text: 'Which is the correct ordinal for 21?', options: ['twenty-oneth', 'twenty-first', 'twentyfirst', 'twenty first'], correct: 1, explanation: '21st = twenty-first.' },
          { id: 22, text: '"She finished ___ in the race." (1)', options: ['one', 'first', 'oneth', 'once'], correct: 1, explanation: 'Ordinal "first" for position in a race.' },
          { id: 23, text: 'What does 3/4 mean in words?', options: ['three fours', 'third quarter', 'three quarters', 'triple fourth'], correct: 2, explanation: '3/4 = three quarters.' },
          { id: 24, text: 'How do you say 1,500?', options: ['one thousand five hundred', 'fifteen hundred', 'one five zero zero', 'Both A and B are correct'], correct: 3, explanation: 'Both "one thousand five hundred" and "fifteen hundred" are used.' },
          { id: 25, text: 'Which is correct: "the ninth floor" or "the nineth floor"?', options: ['the nineth floor', 'the ninth floor', 'the nineeth floor', 'the ninteenth floor'], correct: 1, explanation: '9th = ninth (drop the e from nine).' },
          { id: 26, text: '"On the ___ of July" (4) — Independence Day', options: ['four', 'fourth', 'fouth', 'fore'], correct: 1, explanation: '"The fourth of July" — ordinal for dates.' },
          { id: 27, text: 'What is "dozen"?', options: ['10', '11', '12', '20'], correct: 2, explanation: 'A dozen = 12.' },
          { id: 28, text: 'What is "score" as a number (archaic)?', options: ['10', '12', '20', '100'], correct: 2, explanation: 'A score = 20 (e.g., "four score and seven years ago" = 87).' },
          { id: 29, text: 'How do you say the year 2000?', options: ['two thousands', 'twenty hundred', 'the year two thousand', 'two zero zero zero'], correct: 2, explanation: '2000 = "the year two thousand".' },
          { id: 30, text: 'Which ordinal number is spelled differently from its cardinal?', options: ['ten/tenth', 'nine/ninth', 'seven/seventh', 'six/sixth'], correct: 1, explanation: '"Nine" drops the "e": ninth (not nineth).' },
        ],
        fillBlanks: [
          { id: 1, text: 'January is the ___ month of the year.', options: ['one', 'first', 'firstly', 'one\'s'], correct: 1, explanation: 'Use ordinal numbers for position in a sequence.' },
          { id: 2, text: 'I have ___ cats and one dog.', options: ['two', 'second', 'twice', 'secondly'], correct: 0, explanation: 'Use cardinal numbers (two) to count nouns.' },
          { id: 3, text: 'He was born on the ___ of October.', options: ['three', 'third', 'three\'s', 'thirdly'], correct: 1, explanation: 'Dates in English use ordinal numbers: "the third of October".' },
          { id: 4, text: 'This is my ___ time visiting London.', options: ['five', 'fifth', 'fifthly', 'five times'], correct: 1, explanation: 'Ordinal "fifth" denotes sequence.' },
          { id: 5, text: 'My sister is in the ___ grade.', options: ['four', 'fourth', 'fourthly', 'four\'s'], correct: 1, explanation: 'Use ordinal numbers for school grades: "fourth grade".' },
          { id: 6, text: 'There are ___ days in a week.', options: ['seventh', 'seven', 'sevenths', 'seventeen'], correct: 1, explanation: 'Cardinal "seven" counts the days.' },
          { id: 7, text: 'The year 1995 is read as: nineteen ninety-___.', options: ['five', 'fifth', 'fives', 'fifty'], correct: 0, explanation: 'Years are read as two blocks of cardinal numbers.' },
          { id: 8, text: 'I finished the race in ___ place.', options: ['two', 'second', 'twice', 'secondly'], correct: 1, explanation: 'Rankings use ordinal numbers: "second place".' },
          { id: 9, text: 'We need to cut the cake into ___ halves.', options: ['two', 'second', 'twice', 'double'], correct: 0, explanation: 'Cardinal number "two" counts the halves.' },
          { id: 10, text: 'Which is correct for the spelling of 12th?', options: ['twelveth', 'twelfth', 'twelve', 'twelfthly'], correct: 1, explanation: 'The spelling of 12th is "twelfth" (dropping the \'v\' and \'e\').' },
          { id: 11, text: 'She is celebrating her ___ birthday.', options: ['twenty-one', 'twenty-first', 'twenty-one\'s', 'twentieth-one'], correct: 1, explanation: 'Birthdays use ordinal numbers: "twenty-first birthday".' },
          { id: 12, text: 'We have ___ minutes left before the class starts.', options: ['ten', 'tenth', 'ten\'s', 'tenthly'], correct: 0, explanation: 'Cardinal "ten" counts minutes.' },
          { id: 13, text: 'The fraction 1/3 is read as "one-___".', options: ['three', 'third', 'thirds', 'thirdly'], correct: 1, explanation: 'Fractions use a cardinal numerator and ordinal denominator.' },
          { id: 14, text: 'This is the ___ chapter of the book.', options: ['nine', 'ninth', 'nineth', 'ninthly'], correct: 1, explanation: 'Ordinal number "ninth" (note spelling: no \'e\').' },
          { id: 15, text: 'I have ___ dollars left in my wallet.', options: ['fifty', 'fiftieth', 'fifteen\'s', 'fifty\'s'], correct: 0, explanation: 'Cardinal "fifty" counts money.' },
          { id: 16, text: 'He won ___ prize in the competition.', options: ['one', 'first', 'firstly', 'the one'], correct: 1, explanation: '"First prize" uses the ordinal number.' },
          { id: 17, text: 'Our office is on the ___ floor.', options: ['three', 'third', 'thirdly', 'three\'s'], correct: 1, explanation: 'Floors of a building use ordinal numbers.' },
          { id: 18, text: 'There are twelve months in ___ year.', options: ['one', 'first', 'once', 'firstly'], correct: 0, explanation: '"One year" or "a year".' },
          { id: 19, text: 'Today is June ___.', options: ['twenty-two', 'twenty-second', 'twenty-secondly', 'twenty-two\'s'], correct: 1, explanation: 'Dates in speech use ordinal numbers: "June twenty-second".' },
          { id: 20, text: 'Which is the cardinal number for 100?', options: ['hundredth', 'one hundred', 'first hundred', 'hundreds'], correct: 1, explanation: '"One hundred" is the cardinal form.' }
        ],
        scrambled: [
          { id: 1, words: ['is', 'this', 'my', 'first', 'visit'], answer: 'this is my first visit', explanation: 'Ordinal "first" comes before the noun "visit".' },
          { id: 2, words: ['have', 'I', 'cats', 'three'], answer: 'I have three cats', explanation: 'Cardinal "three" precedes the plural noun "cats".' },
          { id: 3, words: ['born', 'was', 'she', 'in', '1990'], answer: 'she was born in 1990', explanation: 'Standard structure for birth year.' },
          { id: 4, words: ['the', 'floor', 'is', 'on', 'second', 'office', 'our'], answer: 'our office is on the second floor', explanation: 'Ordinal modifier: "the second floor".' },
          { id: 5, words: ['grade', 'brother', 'my', 'is', 'in', 'fifth', 'the'], answer: 'my brother is in the fifth grade', explanation: '"the fifth grade" uses ordinal.' },
          { id: 6, words: ['are', 'days', 'there', 'thirty', 'in', 'November'], answer: 'there are thirty days in November', explanation: 'Cardinal "thirty" counts the days.' },
          { id: 7, words: ['won', 'first', 'he', 'competition', 'the', 'prize', 'in'], answer: 'he won first prize in the competition', explanation: 'Subject + Verb + Object (first prize) + Prepositional phrase.' },
          { id: 8, words: ['third', 'cup', 'is', 'of', 'tea', 'my', 'this'], answer: 'this is my third cup of tea', explanation: 'Demonstrative + Verb + Possessive + Ordinal + Noun phrase.' },
          { id: 9, words: ['June', 'today', 'is', 'the', 'first', 'of'], answer: 'today is the first of June', explanation: 'Date format: "the first of June".' },
          { id: 10, words: ['spelt', 'how', 'is', 'twelfth', '?'], answer: 'how is twelfth spelt', explanation: 'Spelling question for 12th.' },
          { id: 11, words: ['she', 'has', 'fifty', 'books', 'nearly'], answer: 'she has nearly fifty books', explanation: '"Nearly" modifies the quantity "fifty".' },
          { id: 12, words: ['on', 'we', 'live', 'tenth', 'the', 'floor'], answer: 'we live on the tenth floor', explanation: 'Subject + Verb + Prepositional phrase with ordinal.' },
          { id: 13, words: ['lesson', 'starts', 'in', 'ten', 'minutes'], answer: 'the lesson starts in ten minutes', explanation: 'Determiner + Noun + Verb + Time phrase.' },
          { id: 14, words: ['this', 'my', 'second', 'time', 'is'], answer: 'this is my second time', explanation: 'Demonstrative + Verb + Ordinal phrase.' },
          { id: 15, words: ['page', 'open', 'book', 'your', 'to', 'twenty'], answer: 'open your book to page twenty', explanation: 'Imperative verb phrase.' },
          { id: 16, words: ['fraction', '1/2', 'read', 'is', 'as', 'half', 'a'], answer: 'the fraction 1/2 is read as a half', explanation: 'Fractions notation explanation.' },
          { id: 17, words: ['twentieth', 'century', 'in', 'the', 'happened', 'it'], answer: 'it happened in the twentieth century', explanation: 'Historical time phrase with ordinal.' },
          { id: 18, words: ['needs', 'recipe', 'the', 'two', 'eggs'], answer: 'the recipe needs two eggs', explanation: 'Subject + Verb + Countable object.' },
          { id: 19, words: ['celebrated', 'they', 'their', 'fiftieth', 'anniversary'], answer: 'they celebrated their fiftieth anniversary', explanation: 'Ordinal used for milestones.' },
          { id: 20, words: ['there', 'are', 'hundred', 'cents', 'in', 'a', 'dollar'], answer: 'there are a hundred cents in a dollar', explanation: '"a hundred" = 100.' }
        ],
        errorCorrection: [
          { id: 1, text: 'He is in the five grade.', options: ['He is', 'in the', 'five', 'grade'], correct: 2, wrongPart: 'five', correction: 'fifth', explanation: 'Use ordinal numbers (fifth) for grades.' },
          { id: 2, text: 'Today is the twelve of May.', options: ['Today', 'is the', 'twelve', 'of May'], correct: 2, wrongPart: 'twelve', correction: 'twelfth', explanation: 'Dates require ordinal numbers (twelfth).' },
          { id: 3, text: 'I bought three book yesterday.', options: ['I bought', 'three', 'book', 'yesterday'], correct: 2, wrongPart: 'book', correction: 'books', explanation: 'Plural nouns must follow numbers greater than one.' },
          { id: 4, text: 'This is my twelveth time playing.', options: ['This is', 'my', 'twelveth', 'time playing'], correct: 2, wrongPart: 'twelveth', correction: 'twelfth', explanation: 'Spelling error: "twelfth" (no \'e\' after \'v\', and \'v\' changes to \'f\').' },
          { id: 5, text: 'She finished in the three place.', options: ['She finished', 'in the', 'three', 'place'], correct: 2, wrongPart: 'three', correction: 'third', explanation: 'Rankings use ordinal numbers (third).' },
          { id: 6, text: 'He has twenty-one years old.', options: ['He', 'has', 'twenty-one', 'years old'], correct: 1, wrongPart: 'has', correction: 'is', explanation: 'In English, age is expressed with the verb "to be" (is twenty-one).' },
          { id: 7, text: 'We live on the nineth floor.', options: ['We live', 'on the', 'nineth', 'floor'], correct: 2, wrongPart: 'nineth', correction: 'ninth', explanation: 'Spelling error: "ninth" (no \'e\').' },
          { id: 8, text: 'I have two hundred of books.', options: ['I have', 'two hundred', 'of', 'books'], correct: 2, wrongPart: 'of', correction: '', explanation: 'Do not use "of" after specific hundreds (two hundred books).' },
          { id: 9, text: 'He was born in the nineteen ninety five.', options: ['He was born', 'in the', 'nineteen ninety five', 'No error'], correct: 2, wrongPart: 'the', correction: '', explanation: 'Do not use definite article before calendar years unless specified.' },
          { id: 10, text: 'She is celebrating her twenty-one birthday.', options: ['She is', 'celebrating', 'twenty-one', 'birthday'], correct: 2, wrongPart: 'twenty-one', correction: 'twenty-first', explanation: 'Milestone birthdays use ordinals (twenty-first).' },
          { id: 11, text: 'Can you give me the first halfs?', options: ['Can you', 'give me', 'the first', 'halfs'], correct: 3, wrongPart: 'halfs', correction: 'half', explanation: 'Plural of half is halves, but singular "the first half" is appropriate here.' },
          { id: 12, text: 'The year 2026 is read as twenty twenty-sixth.', options: ['The year 2026', 'is read', 'as twenty', 'twenty-sixth'], correct: 3, wrongPart: 'twenty-sixth', correction: 'twenty-six', explanation: 'Years are read using cardinal numbers (twenty twenty-six).' },
          { id: 13, text: 'I read the chapter three of the book.', options: ['I read', 'the chapter', 'three', 'of the book'], correct: 1, wrongPart: 'the chapter', correction: 'chapter', explanation: 'Say "chapter three" (no "the") or "the third chapter".' },
          { id: 14, text: 'There are one hundred of cents in a dollar.', options: ['There are', 'one hundred', 'of cents', 'in a dollar'], correct: 2, wrongPart: 'of cents', correction: 'cents', explanation: 'No "of" after cardinal numbers.' },
          { id: 15, text: 'This is the two time I asked.', options: ['This is', 'the two', 'time', 'I asked'], correct: 1, wrongPart: 'the two', correction: 'second', explanation: 'Ordinal "second" is needed before "time".' },
          { id: 16, text: 'I bought dozen eggs at the market.', options: ['I bought', 'dozen', 'eggs', 'at the market'], correct: 1, wrongPart: 'dozen', correction: 'a dozen', explanation: 'Use "a dozen" to mean twelve.' },
          { id: 17, text: 'He is the seventy-three runner.', options: ['He is', 'the', 'seventy-three', 'runner'], correct: 2, wrongPart: 'seventy-three', correction: 'seventy-third', explanation: 'Use ordinals to specify positions.' },
          { id: 18, text: 'They came in the two place.', options: ['They came', 'in the', 'two', 'place'], correct: 2, wrongPart: 'two', correction: 'second', explanation: 'Rankings use ordinals (second).' },
          { id: 19, text: 'Write the number 40 as fourty.', options: ['Write', 'the number 40', 'as', 'fourty'], correct: 3, wrongPart: 'fourty', correction: 'forty', explanation: 'Spelling error: 40 is spelled "forty" (no \'u\').' },
          { id: 20, text: 'There are seven billion of people in the world.', options: ['There are', 'seven billion', 'of people', 'in the world'], correct: 2, wrongPart: 'of people', correction: 'people', explanation: 'Do not use "of" after specific numbers (seven billion people).' }
        ],
        transform: [
          { id: 1, text: 'Change cardinal to ordinal: "The number 3."', options: ['three', 'third', 'thirdly', 'thrice'], correct: 1, explanation: 'Ordinal for three is "third".' },
          { id: 2, text: 'Write 1980 in words:', options: ['nineteen eighty', 'one thousand nine hundred eighty', 'nineteen eighty\'s', 'nineteen eight'], correct: 0, explanation: '1980 is read as "nineteen eighty".' },
          { id: 3, text: 'Convert to date format: "5 October."', options: ['the five October', 'the fifth of October', 'five of October', 'fifth October'], correct: 1, explanation: 'Dates are spoken as "the fifth of October".' },
          { id: 4, text: 'Write 40 in words:', options: ['fourty', 'forty', 'four', 'fourteen'], correct: 1, explanation: 'The spelling is "forty".' },
          { id: 5, text: 'Change "two" to ordinal: "Page two."', options: ['the second page', 'page second', 'secondly page', 'page two\'s'], correct: 0, explanation: '"Page two" becomes "the second page" when using ordinals.' },
          { id: 6, text: 'How do you say 2:30 in time?', options: ['two thirty', 'half past two', 'both A and B', 'two and half'], correct: 2, explanation: 'Both "two thirty" and "half past two" are correct.' },
          { id: 7, text: 'Write 9th in words:', options: ['nineth', 'ninth', 'nine', 'ninthly'], correct: 1, explanation: 'Spelling of 9th is "ninth" (no \'e\').' },
          { id: 8, text: 'Write 1/2 as a word:', options: ['one second', 'a half', 'half of', 'two-one'], correct: 1, explanation: '1/2 is "a half" or "one half".' },
          { id: 9, text: 'Convert to a year block: "2015."', options: ['two thousand fifteen', 'twenty fifteen', 'both A and B', 'two zero one five'], correct: 2, explanation: 'Years in the 2000s can be read both ways.' },
          { id: 10, text: 'Change to ordinal spelling: "20th."', options: ['twentieth', 'twenty', 'twentiethly', 'twentith'], correct: 0, explanation: '20th in words is "twentieth".' },
          { id: 11, text: 'Change to cardinal: "The first book."', options: ['Book one', 'Book first', 'One book', 'Book ones'], correct: 0, explanation: '"The first book" corresponds to "Book one".' },
          { id: 12, text: 'Write 12th in words:', options: ['twelveth', 'twelfth', 'twelve', 'twelfthly'], correct: 1, explanation: 'Spelling is "twelfth".' },
          { id: 13, text: 'How do you write the year 2000?', options: ['twenty hundred', 'two thousand', 'two thousands', 'twenty thousand'], correct: 1, explanation: 'The year 2000 is "two thousand".' },
          { id: 14, text: 'Convert cardinal to ordinal: "The number 8."', options: ['eighth', 'eigth', 'eight', 'eighty'], correct: 0, explanation: 'Ordinal of eight is "eighth" (note the spelling).' },
          { id: 15, text: 'Write 1/4 as a word:', options: ['one four', 'a quarter', 'fourth', 'one-fourthly'], correct: 1, explanation: '1/4 is read as "a quarter" or "one quarter".' },
          { id: 16, text: 'Write 90 in words:', options: ['ninty', 'ninety', 'nine ten', 'nineteen'], correct: 1, explanation: 'Spelling is "ninety" (keeping the \'e\').' },
          { id: 17, text: 'Convert date: "22nd of August."', options: ['twenty-two of August', 'August the twenty-second', 'twenty-second August', 'August twenty-two'], correct: 1, explanation: '"August the twenty-second" is a correct way to say the date.' },
          { id: 18, text: 'Write 15th in words:', options: ['fiveth', 'fifteenth', 'fifteent', 'fiftieth'], correct: 1, explanation: '15th is "fifteenth".' },
          { id: 19, text: 'Write 50th in words:', options: ['fiftieth', 'fifteenth', 'fivetieth', 'fifty'], correct: 0, explanation: '50th is "fiftieth".' },
          { id: 20, text: 'Write 30 in words:', options: ['threety', 'thirty', 'thirteen', 'thirdy'], correct: 1, explanation: 'Spelling is "thirty".' }
        ],
        dialogue: [
          { id: 1, situation: 'Asking for dates.', dialogue: 'A: When is your birthday?\nB: It is on the ___ of May.', options: ['five', 'fifth', 'fiftieth', 'five\'s'], correct: 1, explanation: 'Birthdays use ordinal numbers: "fifth of May".' },
          { id: 2, situation: 'Buying bus tickets.', dialogue: 'A: How many tickets do you need?\nB: ___ tickets, please. One for me and one for my friend.', options: ['Two', 'Second', 'Twice', 'Double'], correct: 0, explanation: 'Count nouns using cardinal "Two".' },
          { id: 3, situation: 'Checking hotel room details.', dialogue: 'A: Which floor is our room on?\nB: It is on the ___ floor. Let\'s use the lift.', options: ['three', 'third', 'thirdly', 'three\'s'], correct: 1, explanation: 'Hotel floors use ordinal numbers (third).' },
          { id: 4, situation: 'Asking for the time.', dialogue: 'A: What time is it?\nB: It is ___ past four.', options: ['quarter', 'fourth', 'fifteen minutes', 'four'], correct: 0, explanation: '"Quarter past four" = 4:15.' },
          { id: 5, situation: 'Talking about a competition.', dialogue: 'A: Did you win the race?\nB: No, I came in ___ place. I got the silver medal.', options: ['one', 'second', 'two', 'twice'], correct: 1, explanation: 'Silver medal corresponds to "second place".' },
          { id: 6, situation: 'Reading phone numbers.', dialogue: 'A: What is your number?\nB: It is ___ (07700...).', options: ['zero seven seven', 'oh double seven', 'both A and B', 'none'], correct: 2, explanation: 'Zero can be read as "zero" or "oh", and repetition can use "double".' },
          { id: 7, situation: 'Talking about school ranking.', dialogue: 'A: Is he a good student?\nB: Yes, he is the ___ in his class.', options: ['one', 'first', 'firstly', 'once'], correct: 1, explanation: 'Rankings use ordinals: "the first".' },
          { id: 8, situation: 'Paying at a supermarket.', dialogue: 'Cashier: That will be ___ dollars, please.\nCustomer: Here is a fifty-dollar note.', options: ['forty', 'fortieth', 'fourty', 'fourteen'], correct: 0, explanation: 'Cardinal "forty" for cost.' },
          { id: 9, situation: 'Asking for the year of an event.', dialogue: 'A: When was the museum built?\nB: In ___ (1998).', options: ['nineteen ninety-eight', 'one thousand nine hundred ninety-eight', 'both A and B', 'nineteen eighty-nine'], correct: 2, explanation: 'Years can be read both ways, though "nineteen ninety-eight" is more common.' },
          { id: 10, situation: 'Ordering food.', dialogue: 'A: I would like a pizza, please.\nB: Regular size, or would you like to ___ the size?', options: ['two', 'double', 'second', 'twice'], correct: 1, explanation: 'To make something twice as big is to "double" it.' },
          { id: 11, situation: 'Asking about family size.', dialogue: 'A: How many brothers do you have?\nB: I have ___ brothers. They are both older than me.', options: ['two', 'second', 'twice', 'secondly'], correct: 0, explanation: 'Use cardinal "two" for quantity.' },
          { id: 12, situation: 'Following a cooking recipe.', dialogue: 'A: How much flour do I add?\nB: Add ___ cup. Not the whole cup.', options: ['one second', 'half a', 'a halfs', 'twice'], correct: 1, explanation: '"Half a cup" is a standard quantity.' },
          { id: 13, situation: 'Checking office numbers.', dialogue: 'A: Where is the meeting room?\nB: It is Room ___ on the next corridor.', options: ['twenty', 'twentieth', 'twentiethly', 'twice'], correct: 0, explanation: 'Room numbers use cardinal numbers (Room twenty).' },
          { id: 14, situation: 'Discussing centuries.', dialogue: 'A: When did Shakespeare live?\nB: In the ___ century.', options: ['sixteen', 'sixteenth', 'sixteenthly', 'sixteen\'s'], correct: 1, explanation: 'Centuries are expressed in ordinal numbers (sixteenth).' },
          { id: 15, situation: 'Asking about sports results.', dialogue: 'A: Did our team win the cup?\nB: Yes, for the ___ time in a row!', options: ['three', 'third', 'thirdly', 'thrice'], correct: 1, explanation: 'Occurrences use ordinals: "third time".' },
          { id: 16, situation: 'Telling someone to wait.', dialogue: 'A: Can we talk now?\nB: Give me ___ minutes, please. I am on the phone.', options: ['five', 'fifth', 'fifthly', 'fives'], correct: 0, explanation: 'Cardinal "five" for duration.' },
          { id: 17, situation: 'Buying a book.', dialogue: 'A: Which edition of the book do you want?\nB: The ___ edition. The newest one.', options: ['two', 'second', 'twice', 'secondly'], correct: 1, explanation: 'Editions use ordinals: "second edition".' },
          { id: 18, situation: 'Taking a bus.', dialogue: 'A: Which bus goes to the station?\nB: The number ___ bus.', options: ['ten', 'tenth', 'tenthly', 'ten\'s'], correct: 0, explanation: 'Bus route numbers are cardinal (number ten bus).' },
          { id: 19, situation: 'Discussing wedding anniversaries.', dialogue: 'A: Today is our ___ anniversary!\nB: Happy anniversary, dear! Fifty years together!', options: ['fifty', 'fiftieth', 'fifteenth', 'five'], correct: 1, explanation: '50 years of marriage is the "fiftieth anniversary".' },
          { id: 20, situation: 'Measuring lengths.', dialogue: 'A: How long is the desk?\nB: It is ___ meters long.', options: ['two', 'second', 'twice', 'secondly'], correct: 0, explanation: 'Measurements use cardinal numbers.' }
        ],
        fillBlanks: [
          { id: 1, text: 'January is the ___ month of the year.', options: ['one', 'first', 'firstly', 'one\'s'], correct: 1, explanation: 'Use ordinal numbers for position in a sequence.' },
          { id: 2, text: 'I have ___ cats and one dog.', options: ['two', 'second', 'twice', 'secondly'], correct: 0, explanation: 'Use cardinal numbers (two) to count nouns.' },
          { id: 3, text: 'He was born on the ___ of October.', options: ['three', 'third', 'three\'s', 'thirdly'], correct: 1, explanation: 'Dates in English use ordinal numbers: "the third of October".' },
          { id: 4, text: 'This is my ___ time visiting London.', options: ['five', 'fifth', 'fifthly', 'five times'], correct: 1, explanation: 'Ordinal "fifth" denotes sequence.' },
          { id: 5, text: 'My sister is in the ___ grade.', options: ['four', 'fourth', 'fourthly', 'four\'s'], correct: 1, explanation: 'Use ordinal numbers for school grades: "fourth grade".' },
          { id: 6, text: 'There are ___ days in a week.', options: ['seventh', 'seven', 'sevenths', 'seventeen'], correct: 1, explanation: 'Cardinal "seven" counts the days.' },
          { id: 7, text: 'The year 1995 is read as: nineteen ninety-___.', options: ['five', 'fifth', 'fives', 'fifty'], correct: 0, explanation: 'Years are read as two blocks of cardinal numbers.' },
          { id: 8, text: 'I finished the race in ___ place.', options: ['two', 'second', 'twice', 'secondly'], correct: 1, explanation: 'Rankings use ordinal numbers: "second place".' },
          { id: 9, text: 'We need to cut the cake into ___ halves.', options: ['two', 'second', 'twice', 'double'], correct: 0, explanation: 'Cardinal number "two" counts the halves.' },
          { id: 10, text: 'Which is correct for the spelling of 12th?', options: ['twelveth', 'twelfth', 'twelve', 'twelfthly'], correct: 1, explanation: 'The spelling of 12th is "twelfth" (dropping the \'v\' and \'e\').' },
          { id: 11, text: 'She is celebrating her ___ birthday.', options: ['twenty-one', 'twenty-first', 'twenty-one\'s', 'twentieth-one'], correct: 1, explanation: 'Birthdays use ordinal numbers: "twenty-first birthday".' },
          { id: 12, text: 'We have ___ minutes left before the class starts.', options: ['ten', 'tenth', 'ten\'s', 'tenthly'], correct: 0, explanation: 'Cardinal "ten" counts minutes.' },
          { id: 13, text: 'The fraction 1/3 is read as "one-___".', options: ['three', 'third', 'thirds', 'thirdly'], correct: 1, explanation: 'Fractions use a cardinal numerator and ordinal denominator.' },
          { id: 14, text: 'This is the ___ chapter of the book.', options: ['nine', 'ninth', 'nineth', 'ninthly'], correct: 1, explanation: 'Ordinal number "ninth" (note spelling: no \'e\').' },
          { id: 15, text: 'I have ___ dollars left in my wallet.', options: ['fifty', 'fiftieth', 'fifteen\'s', 'fifty\'s'], correct: 0, explanation: 'Cardinal "fifty" counts money.' },
          { id: 16, text: 'He won ___ prize in the competition.', options: ['one', 'first', 'firstly', 'the one'], correct: 1, explanation: '"First prize" uses the ordinal number.' },
          { id: 17, text: 'Our office is on the ___ floor.', options: ['three', 'third', 'thirdly', 'three\'s'], correct: 1, explanation: 'Floors of a building use ordinal numbers.' },
          { id: 18, text: 'There are twelve months in ___ year.', options: ['one', 'first', 'once', 'firstly'], correct: 0, explanation: '"One year" or "a year".' },
          { id: 19, text: 'Today is June ___.', options: ['twenty-two', 'twenty-second', 'twenty-secondly', 'twenty-two\'s'], correct: 1, explanation: 'Dates in speech use ordinal numbers: "June twenty-second".' },
          { id: 20, text: 'Which is the cardinal number for 100?', options: ['hundredth', 'one hundred', 'first hundred', 'hundreds'], correct: 1, explanation: '"One hundred" is the cardinal form.' }
        ],
        scrambled: [
          { id: 1, words: ['is', 'this', 'my', 'first', 'visit'], answer: 'this is my first visit', explanation: 'Ordinal "first" comes before the noun "visit".' },
          { id: 2, words: ['have', 'I', 'cats', 'three'], answer: 'I have three cats', explanation: 'Cardinal "three" precedes the plural noun "cats".' },
          { id: 3, words: ['born', 'was', 'she', 'in', '1990'], answer: 'she was born in 1990', explanation: 'Standard structure for birth year.' },
          { id: 4, words: ['the', 'floor', 'is', 'on', 'second', 'office', 'our'], answer: 'our office is on the second floor', explanation: 'Ordinal modifier: "the second floor".' },
          { id: 5, words: ['grade', 'brother', 'my', 'is', 'in', 'fifth', 'the'], answer: 'my brother is in the fifth grade', explanation: '"the fifth grade" uses ordinal.' },
          { id: 6, words: ['are', 'days', 'there', 'thirty', 'in', 'November'], answer: 'there are thirty days in November', explanation: 'Cardinal "thirty" counts the days.' },
          { id: 7, words: ['won', 'first', 'he', 'competition', 'the', 'prize', 'in'], answer: 'he won first prize in the competition', explanation: 'Subject + Verb + Object (first prize) + Prepositional phrase.' },
          { id: 8, words: ['third', 'cup', 'is', 'of', 'tea', 'my', 'this'], answer: 'this is my third cup of tea', explanation: 'Demonstrative + Verb + Possessive + Ordinal + Noun phrase.' },
          { id: 9, words: ['June', 'today', 'is', 'the', 'first', 'of'], answer: 'today is the first of June', explanation: 'Date format: "the first of June".' },
          { id: 10, words: ['spelt', 'how', 'is', 'twelfth', '?'], answer: 'how is twelfth spelt', explanation: 'Spelling question for 12th.' },
          { id: 11, words: ['she', 'has', 'fifty', 'books', 'nearly'], answer: 'she has nearly fifty books', explanation: '"Nearly" modifies the quantity "fifty".' },
          { id: 12, words: ['on', 'we', 'live', 'tenth', 'the', 'floor'], answer: 'we live on the tenth floor', explanation: 'Subject + Verb + Prepositional phrase with ordinal.' },
          { id: 13, words: ['lesson', 'starts', 'in', 'ten', 'minutes'], answer: 'the lesson starts in ten minutes', explanation: 'Determiner + Noun + Verb + Time phrase.' },
          { id: 14, words: ['this', 'my', 'second', 'time', 'is'], answer: 'this is my second time', explanation: 'Demonstrative + Verb + Ordinal phrase.' },
          { id: 15, words: ['page', 'open', 'book', 'your', 'to', 'twenty'], answer: 'open your book to page twenty', explanation: 'Imperative verb phrase.' },
          { id: 16, words: ['fraction', '1/2', 'read', 'is', 'as', 'half', 'a'], answer: 'the fraction 1/2 is read as a half', explanation: 'Fractions notation explanation.' },
          { id: 17, words: ['twentieth', 'century', 'in', 'the', 'happened', 'it'], answer: 'it happened in the twentieth century', explanation: 'Historical time phrase with ordinal.' },
          { id: 18, words: ['needs', 'recipe', 'the', 'two', 'eggs'], answer: 'the recipe needs two eggs', explanation: 'Subject + Verb + Countable object.' },
          { id: 19, words: ['celebrated', 'they', 'their', 'fiftieth', 'anniversary'], answer: 'they celebrated their fiftieth anniversary', explanation: 'Ordinal used for milestones.' },
          { id: 20, words: ['there', 'are', 'hundred', 'cents', 'in', 'a', 'dollar'], answer: 'there are a hundred cents in a dollar', explanation: '"a hundred" = 100.' }
        ],
        errorCorrection: [
          { id: 1, text: 'He is in the five grade.', options: ['He is', 'in the', 'five', 'grade'], correct: 2, wrongPart: 'five', correction: 'fifth', explanation: 'Use ordinal numbers (fifth) for grades.' },
          { id: 2, text: 'Today is the twelve of May.', options: ['Today', 'is the', 'twelve', 'of May'], correct: 2, wrongPart: 'twelve', correction: 'twelfth', explanation: 'Dates require ordinal numbers (twelfth).' },
          { id: 3, text: 'I bought three book yesterday.', options: ['I bought', 'three', 'book', 'yesterday'], correct: 2, wrongPart: 'book', correction: 'books', explanation: 'Plural nouns must follow numbers greater than one.' },
          { id: 4, text: 'This is my twelveth time playing.', options: ['This is', 'my', 'twelveth', 'time playing'], correct: 2, wrongPart: 'twelveth', correction: 'twelfth', explanation: 'Spelling error: "twelfth" (no \'e\' after \'v\', and \'v\' changes to \'f\').' },
          { id: 5, text: 'She finished in the three place.', options: ['She finished', 'in the', 'three', 'place'], correct: 2, wrongPart: 'three', correction: 'third', explanation: 'Rankings use ordinal numbers (third).' },
          { id: 6, text: 'He has twenty-one years old.', options: ['He', 'has', 'twenty-one', 'years old'], correct: 1, wrongPart: 'has', correction: 'is', explanation: 'In English, age is expressed with the verb "to be" (is twenty-one).' },
          { id: 7, text: 'We live on the nineth floor.', options: ['We live', 'on the', 'nineth', 'floor'], correct: 2, wrongPart: 'nineth', correction: 'ninth', explanation: 'Spelling error: "ninth" (no \'e\').' },
          { id: 8, text: 'I have two hundred of books.', options: ['I have', 'two hundred', 'of', 'books'], correct: 2, wrongPart: 'of', correction: '', explanation: 'Do not use "of" after specific hundreds (two hundred books).' },
          { id: 9, text: 'He was born in the nineteen ninety five.', options: ['He was born', 'in the', 'nineteen ninety five', 'No error'], correct: 2, wrongPart: 'the', correction: '', explanation: 'Do not use definite article before calendar years unless specified.' },
          { id: 10, text: 'She is celebrating her twenty-one birthday.', options: ['She is', 'celebrating', 'twenty-one', 'birthday'], correct: 2, wrongPart: 'twenty-one', correction: 'twenty-first', explanation: 'Milestone birthdays use ordinals (twenty-first).' },
          { id: 11, text: 'Can you give me the first halfs?', options: ['Can you', 'give me', 'the first', 'halfs'], correct: 3, wrongPart: 'halfs', correction: 'half', explanation: 'Plural of half is halves, but singular "the first half" is appropriate here.' },
          { id: 12, text: 'The year 2026 is read as twenty twenty-sixth.', options: ['The year 2026', 'is read', 'as twenty', 'twenty-sixth'], correct: 3, wrongPart: 'twenty-sixth', correction: 'twenty-six', explanation: 'Years are read using cardinal numbers (twenty twenty-six).' },
          { id: 13, text: 'I read the chapter three of the book.', options: ['I read', 'the chapter', 'three', 'of the book'], correct: 1, wrongPart: 'the chapter', correction: 'chapter', explanation: 'Say "chapter three" (no "the") or "the third chapter".' },
          { id: 14, text: 'There are one hundred of cents in a dollar.', options: ['There are', 'one hundred', 'of cents', 'in a dollar'], correct: 2, wrongPart: 'of cents', correction: 'cents', explanation: 'No "of" after cardinal numbers.' },
          { id: 15, text: 'This is the two time I asked.', options: ['This is', 'the two', 'time', 'I asked'], correct: 1, wrongPart: 'the two', correction: 'second', explanation: 'Ordinal "second" is needed before "time".' },
          { id: 16, text: 'I bought dozen eggs at the market.', options: ['I bought', 'dozen', 'eggs', 'at the market'], correct: 1, wrongPart: 'dozen', correction: 'a dozen', explanation: 'Use "a dozen" to mean twelve.' },
          { id: 17, text: 'He is the seventy-three runner.', options: ['He is', 'the', 'seventy-three', 'runner'], correct: 2, wrongPart: 'seventy-three', correction: 'seventy-third', explanation: 'Use ordinals to specify positions.' },
          { id: 18, text: 'They came in the two place.', options: ['They came', 'in the', 'two', 'place'], correct: 2, wrongPart: 'two', correction: 'second', explanation: 'Rankings use ordinals (second).' },
          { id: 19, text: 'Write the number 40 as fourty.', options: ['Write', 'the number 40', 'as', 'fourty'], correct: 3, wrongPart: 'fourty', correction: 'forty', explanation: 'Spelling error: 40 is spelled "forty" (no \'u\').' },
          { id: 20, text: 'There are seven billion of people in the world.', options: ['There are', 'seven billion', 'of people', 'in the world'], correct: 2, wrongPart: 'of people', correction: 'people', explanation: 'Do not use "of" after specific numbers (seven billion people).' }
        ],
        transform: [
          { id: 1, text: 'Change cardinal to ordinal: "The number 3."', options: ['three', 'third', 'thirdly', 'thrice'], correct: 1, explanation: 'Ordinal for three is "third".' },
          { id: 2, text: 'Write 1980 in words:', options: ['nineteen eighty', 'one thousand nine hundred eighty', 'nineteen eighty\'s', 'nineteen eight'], correct: 0, explanation: '1980 is read as "nineteen eighty".' },
          { id: 3, text: 'Convert to date format: "5 October."', options: ['the five October', 'the fifth of October', 'five of October', 'fifth October'], correct: 1, explanation: 'Dates are spoken as "the fifth of October".' },
          { id: 4, text: 'Write 40 in words:', options: ['fourty', 'forty', 'four', 'fourteen'], correct: 1, explanation: 'The spelling is "forty".' },
          { id: 5, text: 'Change "two" to ordinal: "Page two."', options: ['the second page', 'page second', 'secondly page', 'page two\'s'], correct: 0, explanation: '"Page two" becomes "the second page" when using ordinals.' },
          { id: 6, text: 'How do you say 2:30 in time?', options: ['two thirty', 'half past two', 'both A and B', 'two and half'], correct: 2, explanation: 'Both "two thirty" and "half past two" are correct.' },
          { id: 7, text: 'Write 9th in words:', options: ['nineth', 'ninth', 'nine', 'ninthly'], correct: 1, explanation: 'Spelling of 9th is "ninth" (no \'e\').' },
          { id: 8, text: 'Write 1/2 as a word:', options: ['one second', 'a half', 'half of', 'two-one'], correct: 1, explanation: '1/2 is "a half" or "one half".' },
          { id: 9, text: 'Convert to a year block: "2015."', options: ['two thousand fifteen', 'twenty fifteen', 'both A and B', 'two zero one five'], correct: 2, explanation: 'Years in the 2000s can be read both ways.' },
          { id: 10, text: 'Change to ordinal spelling: "20th."', options: ['twentieth', 'twenty', 'twentiethly', 'twentith'], correct: 0, explanation: '20th in words is "twentieth".' },
          { id: 11, text: 'Change to cardinal: "The first book."', options: ['Book one', 'Book first', 'One book', 'Book ones'], correct: 0, explanation: '"The first book" corresponds to "Book one".' },
          { id: 12, text: 'Write 12th in words:', options: ['twelveth', 'twelfth', 'twelve', 'twelfthly'], correct: 1, explanation: 'Spelling is "twelfth".' },
          { id: 13, text: 'How do you write the year 2000?', options: ['twenty hundred', 'two thousand', 'two thousands', 'twenty thousand'], correct: 1, explanation: 'The year 2000 is "two thousand".' },
          { id: 14, text: 'Convert cardinal to ordinal: "The number 8."', options: ['eighth', 'eigth', 'eight', 'eighty'], correct: 0, explanation: 'Ordinal of eight is "eighth" (note the spelling).' },
          { id: 15, text: 'Write 1/4 as a word:', options: ['one four', 'a quarter', 'fourth', 'one-fourthly'], correct: 1, explanation: '1/4 is read as "a quarter" or "one quarter".' },
          { id: 16, text: 'Write 90 in words:', options: ['ninty', 'ninety', 'nine ten', 'nineteen'], correct: 1, explanation: 'Spelling is "ninety" (keeping the \'e\').' },
          { id: 17, text: 'Convert date: "22nd of August."', options: ['twenty-two of August', 'August the twenty-second', 'twenty-second August', 'August twenty-two'], correct: 1, explanation: '"August the twenty-second" is a correct way to say the date.' },
          { id: 18, text: 'Write 15th in words:', options: ['fiveth', 'fifteenth', 'fifteent', 'fiftieth'], correct: 1, explanation: '15th is "fifteenth".' },
          { id: 19, text: 'Write 50th in words:', options: ['fiftieth', 'fifteenth', 'fivetieth', 'fifty'], correct: 0, explanation: '50th is "fiftieth".' },
          { id: 20, text: 'Write 30 in words:', options: ['threety', 'thirty', 'thirteen', 'thirdy'], correct: 1, explanation: 'Spelling is "thirty".' }
        ],
        dialogue: [
          { id: 1, situation: 'Asking for dates.', dialogue: 'A: When is your birthday?\nB: It is on the ___ of May.', options: ['five', 'fifth', 'fiftieth', 'five\'s'], correct: 1, explanation: 'Birthdays use ordinal numbers: "fifth of May".' },
          { id: 2, situation: 'Buying bus tickets.', dialogue: 'A: How many tickets do you need?\nB: ___ tickets, please. One for me and one for my friend.', options: ['Two', 'Second', 'Twice', 'Double'], correct: 0, explanation: 'Count nouns using cardinal "Two".' },
          { id: 3, situation: 'Checking hotel room details.', dialogue: 'A: Which floor is our room on?\nB: It is on the ___ floor. Let\'s use the lift.', options: ['three', 'third', 'thirdly', 'three\'s'], correct: 1, explanation: 'Hotel floors use ordinal numbers (third).' },
          { id: 4, situation: 'Asking for the time.', dialogue: 'A: What time is it?\nB: It is ___ past four.', options: ['quarter', 'fourth', 'fifteen minutes', 'four'], correct: 0, explanation: '"Quarter past four" = 4:15.' },
          { id: 5, situation: 'Talking about a competition.', dialogue: 'A: Did you win the race?\nB: No, I came in ___ place. I got the silver medal.', options: ['one', 'second', 'two', 'twice'], correct: 1, explanation: 'Silver medal corresponds to "second place".' },
          { id: 6, situation: 'Reading phone numbers.', dialogue: 'A: What is your number?\nB: It is ___ (07700...).', options: ['zero seven seven', 'oh double seven', 'both A and B', 'none'], correct: 2, explanation: 'Zero can be read as "zero" or "oh", and repetition can use "double".' },
          { id: 7, situation: 'Talking about school ranking.', dialogue: 'A: Is he a good student?\nB: Yes, he is the ___ in his class.', options: ['one', 'first', 'firstly', 'once'], correct: 1, explanation: 'Rankings use ordinals: "the first".' },
          { id: 8, situation: 'Paying at a supermarket.', dialogue: 'Cashier: That will be ___ dollars, please.\nCustomer: Here is a fifty-dollar note.', options: ['forty', 'fortieth', 'fourty', 'fourteen'], correct: 0, explanation: 'Cardinal "forty" for cost.' },
          { id: 9, situation: 'Asking for the year of an event.', dialogue: 'A: When was the museum built?\nB: In ___ (1998).', options: ['nineteen ninety-eight', 'one thousand nine hundred ninety-eight', 'both A and B', 'nineteen eighty-nine'], correct: 2, explanation: 'Years can be read both ways, though "nineteen ninety-eight" is more common.' },
          { id: 10, situation: 'Ordering food.', dialogue: 'A: I would like a pizza, please.\nB: Regular size, or would you like to ___ the size?', options: ['two', 'double', 'second', 'twice'], correct: 1, explanation: 'To make something twice as big is to "double" it.' },
          { id: 11, situation: 'Asking about family size.', dialogue: 'A: How many brothers do you have?\nB: I have ___ brothers. They are both older than me.', options: ['two', 'second', 'twice', 'secondly'], correct: 0, explanation: 'Use cardinal "two" for quantity.' },
          { id: 12, situation: 'Following a cooking recipe.', dialogue: 'A: How much flour do I add?\nB: Add ___ cup. Not the whole cup.', options: ['one second', 'half a', 'a halfs', 'twice'], correct: 1, explanation: '"Half a cup" is a standard quantity.' },
          { id: 13, situation: 'Checking office numbers.', dialogue: 'A: Where is the meeting room?\nB: It is Room ___ on the next corridor.', options: ['twenty', 'twentieth', 'twentiethly', 'twice'], correct: 0, explanation: 'Room numbers use cardinal numbers (Room twenty).' },
          { id: 14, situation: 'Discussing centuries.', dialogue: 'A: When did Shakespeare live?\nB: In the ___ century.', options: ['sixteen', 'sixteenth', 'sixteenthly', 'sixteen\'s'], correct: 1, explanation: 'Centuries are expressed in ordinal numbers (sixteenth).' },
          { id: 15, situation: 'Asking about sports results.', dialogue: 'A: Did our team win the cup?\nB: Yes, for the ___ time in a row!', options: ['three', 'third', 'thirdly', 'thrice'], correct: 1, explanation: 'Occurrences use ordinals: "third time".' },
          { id: 16, situation: 'Telling someone to wait.', dialogue: 'A: Can we talk now?\nB: Give me ___ minutes, please. I am on the phone.', options: ['five', 'fifth', 'fifthly', 'fives'], correct: 0, explanation: 'Cardinal "five" for duration.' },
          { id: 17, situation: 'Buying a book.', dialogue: 'A: Which edition of the book do you want?\nB: The ___ edition. The newest one.', options: ['two', 'second', 'twice', 'secondly'], correct: 1, explanation: 'Editions use ordinals: "second edition".' },
          { id: 18, situation: 'Taking a bus.', dialogue: 'A: Which bus goes to the station?\nB: The number ___ bus.', options: ['ten', 'tenth', 'tenthly', 'ten\'s'], correct: 0, explanation: 'Bus route numbers are cardinal (number ten bus).' },
          { id: 19, situation: 'Discussing wedding anniversaries.', dialogue: 'A: Today is our ___ anniversary!\nB: Happy anniversary, dear! Fifty years together!', options: ['fifty', 'fiftieth', 'fifteenth', 'five'], correct: 1, explanation: '50 years of marriage is the "fiftieth anniversary".' },
          { id: 20, situation: 'Measuring lengths.', dialogue: 'A: How long is the desk?\nB: It is ___ meters long.', options: ['two', 'second', 'twice', 'secondly'], correct: 0, explanation: 'Measurements use cardinal numbers.' }
        ]
      },
      {
        id: 'articles',
        title: 'Articles',
        icon: '📰',
        guide: `## Artiklar (Articles)

Ingliz tilida uch xil artikl mavjud: a, an va the.

## 1. "A" — noaniq artikl (undosh tovushdan oldin)
Ma'nosi: biror, bir
• a book, a car, a university (u- undosh tovushi bilan boshlanadi!)
• Birinchi marta tilga olinganda: I saw a dog.
• Kasb-kor bilan: She is a doctor.

## 2. "An" — noaniq artikl (unli tovushdan oldin)
• an apple, an orange, an umbrella, an hour (h — jim, unli kabi talaffuz!)
• an honest man, an MBA degree

## 3. "The" — aniq artikl
• Ikkinchi marta tilga olinganda: I saw a dog. The dog was big.
• Yagona narsalar: the sun, the moon, the earth
• Geografik nomlar: the Pacific Ocean, the Amazon River, the Alps
• "Of" bilan: the capital of France

## Artikl ishlatilmaydigan hollar
• Ko'plik va umumiy ma'noda: Dogs are friendly. (emas: The dogs are friendly — barcha itlar)
• Ism va familiyalar: Mr. Smith (not the Mr. Smith)
• Mamlakat nomlari: France, England (lekin the UK, the USA)
• Ovqat, til, sport: I like coffee. She speaks English.`,
        questions: [
          { id: 1, text: '___ apple a day keeps the doctor away.', options: ['A', 'An', 'The', 'No article'], correct: 1, explanation: '"An" before vowel sounds: "an apple".' },
          { id: 2, text: 'I saw ___ cat in the garden. ___ cat was orange.', options: ['a / The', 'the / A', 'a / A', 'the / The'], correct: 0, explanation: 'First mention: "a cat". Second mention: "the cat".' },
          { id: 3, text: 'She is ___ engineer.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"Engineer" starts with a vowel sound: "an engineer".' },
          { id: 4, text: '___ sun rises in the east.', options: ['A', 'An', 'The', 'No article'], correct: 2, explanation: '"The sun" — there is only one sun: use "the".' },
          { id: 5, text: 'I play ___ tennis every day.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'Sports do not use articles: "I play tennis".' },
          { id: 6, text: 'She speaks ___ French very well.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'Languages do not use articles: "She speaks French".' },
          { id: 7, text: 'I need ___ umbrella. It\'s raining.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"An" before vowel sounds: "an umbrella".' },
          { id: 8, text: 'He is ___ university student.', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: '"University" starts with a /j/ sound (like "you"): "a university".' },
          { id: 9, text: '___ Nile is ___ longest river in Africa.', options: ['The / the', 'A / a', 'The / a', 'A / the'], correct: 0, explanation: 'Rivers use "the"; superlatives use "the": The Nile, the longest.' },
          { id: 10, text: 'I had ___ egg for breakfast.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"Egg" starts with a vowel sound: "an egg".' },
          { id: 11, text: 'Which sentence is correct?', options: ['She is doctor.', 'She is a doctor.', 'She is the doctor.', 'She is an doctor.'], correct: 1, explanation: '"A" is used with professions when first mentioned.' },
          { id: 12, text: 'The article "the" is used with:', options: ['All nouns', 'Known/specific nouns', 'Unknown nouns only', 'Never with plural nouns'], correct: 1, explanation: '"The" is used for specific, already-known nouns.' },
          { id: 13, text: 'I live in ___ United States.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Countries with "United" or "Kingdom" use "the": the United States, the UK.' },
          { id: 14, text: '___ dogs are loyal animals. (general statement)', options: ['A', 'An', 'The', 'No article'], correct: 3, explanation: 'General statements about all dogs: no article.' },
          { id: 15, text: 'I read ___ interesting book yesterday.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"Interesting" starts with a vowel sound: "an interesting book".' },
          { id: 16, text: 'Close ___ door, please. (there is one door)', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: '"The door" — specific, known door.' },
          { id: 17, text: '"An hour" is correct because:', options: ['"H" is always silent', '"Hour" starts with a vowel sound (/aʊər/)', '"Hour" starts with "o"', '"An" is used before time words'], correct: 1, explanation: 'The "h" in "hour" is silent, so it starts with a vowel sound /aʊər/: "an hour".' },
          { id: 18, text: 'I like ___ coffee. (in general)', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'General preferences: no article with uncountable nouns.' },
          { id: 19, text: 'She is ___ honest person.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"Honest" starts with a vowel sound (h is silent): "an honest person".' },
          { id: 20, text: 'Can you pass me ___ salt?', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: '"The salt" — specific salt on the table.' },
          { id: 21, text: 'Mount Everest is ___ highest mountain in ___ world.', options: ['the / the', 'a / the', 'the / a', 'a / a'], correct: 0, explanation: 'Superlative + "the"; "the world" is specific.' },
          { id: 22, text: 'He is ___ European. (starts with /j/ sound)', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: '"European" starts with the /j/ sound (like "you"): "a European".' },
          { id: 23, text: 'Which does NOT use an article?', options: ['Go to the park.', 'I am a student.', 'She speaks the English.', 'Languages use no article.'], correct: 2, explanation: 'Languages never take "the": "She speaks English" (not "the English").' },
          { id: 24, text: 'I visited ___ France last summer.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'Most country names do not take an article: France, Germany, Japan.' },
          { id: 25, text: 'What is ___ name of your cat?', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: '"The name" — specific name: "What is the name?"' },
          { id: 26, text: 'She plays ___ piano very well.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Musical instruments (when playing): "the piano, the guitar".' },
          { id: 27, text: 'Which is correct?', options: ['An university', 'The university I attend', 'Both', 'A university and The university I attend are both correct in different contexts'], correct: 3, explanation: '"A university" (first mention) and "the university I attend" (specific) are both correct.' },
          { id: 28, text: '___ Pacific Ocean is very deep.', options: ['A', 'An', 'The', 'No article'], correct: 2, explanation: 'Oceans, rivers, and mountain ranges use "the".' },
          { id: 29, text: 'I bought ___ new laptop. ___ laptop is very fast.', options: ['a / The', 'the / A', 'a / A', 'the / The'], correct: 0, explanation: 'First mention: "a new laptop". Second: "The laptop".' },
          { id: 30, text: 'After work, I go to ___ gym. (my regular gym)', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: '"The gym" — a specific, known gym you regularly go to.' },
        ],
        fillBlanks: [
          { id: 1, text: 'I saw ___ elephant at the zoo.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: 'Use "an" before words starting with a vowel sound.' },
          { id: 2, text: '___ sun is shining brightly today.', options: ['A', 'An', 'The', 'No article'], correct: 2, explanation: 'Use "the" for unique celestial bodies (the sun).' },
          { id: 3, text: 'She wants to buy ___ new car.', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: 'Use "a" for singular countable nouns mentioned for the first time.' },
          { id: 4, text: 'He is ___ honest man.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"Honest" starts with a silent "h", producing a vowel sound (an honest).' },
          { id: 5, text: 'Do you like ___ music? (in general)', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'No article before uncountable nouns used in a general sense.' },
          { id: 6, text: 'I go to school by ___ bus.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'No article in the phrase "by bus" (means of transport).' },
          { id: 7, text: 'She plays ___ piano very well.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Use "the" before musical instruments (plays the piano).' },
          { id: 8, text: 'He is ___ university student.', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: '"University" starts with a consonant sound /j/, so use "a".' },
          { id: 9, text: 'We visited ___ UK last year.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Countries with "Kingdom", "States", or plural names take "the" (the UK).' },
          { id: 10, text: '___ water in this bottle is very cold.', options: ['A', 'An', 'The', 'No article'], correct: 2, explanation: 'Use "the" because it is a specific body of water (in this bottle).' },
          { id: 11, text: 'Paris is ___ capital of France.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Paris is the only capital, so it is specific (the capital).' },
          { id: 12, text: 'I had ___ apple and a banana.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"Apple" starts with a vowel sound → "an apple".' },
          { id: 13, text: 'My father is ___ engineer.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: 'Use "a/an" before professions.' },
          { id: 14, text: 'I love eating ___ apples.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'No article before plural countable nouns used in a general sense.' },
          { id: 15, text: '___ Nile is the longest river in the world.', options: ['A', 'An', 'The', 'No article'], correct: 2, explanation: 'Names of rivers always take the definite article "the".' },
          { id: 16, text: 'Would you like ___ cup of tea?', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: '"A cup of tea" — standard singular countable noun.' },
          { id: 17, text: 'He goes to work five days ___ week.', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: 'Use "a/an" to mean "per" (five days a week).' },
          { id: 18, text: 'We had dinner at ___ excellent restaurant.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"Excellent" starts with a vowel sound → "an excellent".' },
          { id: 19, text: 'Could you pass me ___ salt, please?', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Use "the" because both speaker and listener know which salt is meant.' },
          { id: 20, text: 'My brother lives in ___ Tashkent.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'No article before names of cities.' }
        ],
        scrambled: [
          { id: 1, words: ['apple', 'eating', 'I', 'am', 'an'], answer: 'I am eating an apple', explanation: '"An" is used before vowel-initial apple.' },
          { id: 2, words: ['sky', 'the', 'blue', 'is', 'today'], answer: 'the sky is blue today', explanation: 'Unique entities like the sky take the definite article.' },
          { id: 3, words: ['wants', 'a', 'she', 'dog', 'to', 'buy'], answer: 'she wants to buy a dog', explanation: 'First mention of a singular countable noun.' },
          { id: 4, words: ['is', 'he', 'honest', 'an', 'boy'], answer: 'he is an honest boy', explanation: 'Silent "h" in honest needs "an".' },
          { id: 5, words: ['piano', 'she', 'plays', 'the', 'well'], answer: 'she plays the piano well', explanation: 'Musical instruments take the definite article "the".' },
          { id: 6, words: ['love', 'flowers', 'in', 'general', 'I'], answer: 'I love flowers in general', explanation: 'No article before plural nouns in general.' },
          { id: 7, words: ['largest', 'the', 'Pacific', 'is', 'ocean'], answer: 'the Pacific is the largest ocean', explanation: 'Ocean names and superlatives both take "the".' },
          { id: 8, words: ['engineer', 'father', 'an', 'my', 'is'], answer: 'my father is an engineer', explanation: 'Professions are preceded by indefinite articles.' },
          { id: 9, words: ['moon', 'is', 'bright', 'the', 'tonight'], answer: 'the moon is bright tonight', explanation: 'Unique items take "the".' },
          { id: 10, words: ['by', 'car', 'goes', 'to', 'work', 'he'], answer: 'he goes to work by car', explanation: '"by car" (means of transport) takes no article.' },
          { id: 11, words: ['Tashkent', 'in', 'live', 'we'], answer: 'we live in Tashkent', explanation: 'No article before city names.' },
          { id: 12, words: ['useful', 'is', 'book', 'a', 'this'], answer: 'this is a useful book', explanation: '"Useful" starts with consonant /j/ sound, so "a useful".' },
          { id: 13, words: ['tea', 'like', 'would', 'a', 'cup', 'you', 'of', '?'], answer: 'would you like a cup of tea', explanation: 'Standard phrase for offering tea.' },
          { id: 14, words: ['capital', 'London', 'is', 'the', 'of', 'UK', 'the'], answer: 'London is the capital of the UK', explanation: 'London is the specific capital of a specific country.' },
          { id: 15, words: ['water', 'cold', 'bottle', 'in', 'the', 'is'], answer: 'the water in the bottle is cold', explanation: 'Specific water and specific bottle.' },
          { id: 16, words: ['Nile', 'longest', 'the', 'river', 'is', 'the'], answer: 'the Nile is the longest river', explanation: 'River name takes "the".' },
          { id: 17, words: ['five', 'days', 'work', 'a', 'they', 'week'], answer: 'they work five days a week', explanation: '"a week" meaning per week.' },
          { id: 18, words: ['nice', 'restaurant', 'we', 'at', 'ate', 'a'], answer: 'we ate at a nice restaurant', explanation: 'General singular countable noun introduction.' },
          { id: 19, words: ['salt', 'pass', 'please', 'me', 'the'], answer: 'please pass me the salt', explanation: 'Definite article for specific item at table.' },
          { id: 20, words: ['European', 'she', 'country', 'visited', 'a'], answer: 'she visited a European country', explanation: '"European" starts with consonant sound /j/, hence "a".' }
        ],
        errorCorrection: [
          { id: 1, text: 'She is a English teacher.', options: ['She is', 'a', 'English', 'teacher'], correct: 1, wrongPart: 'a', correction: 'an', explanation: '"English" starts with a vowel sound, so use "an".' },
          { id: 2, text: 'I love the music in general.', options: ['I love', 'the', 'music', 'in general'], correct: 1, wrongPart: 'the', correction: '', explanation: 'No article before abstract uncountable nouns in a general sense.' },
          { id: 3, text: 'He is an university student.', options: ['He is', 'an', 'university', 'student'], correct: 1, wrongPart: 'an', correction: 'a', explanation: '"University" starts with a consonant /j/ sound, so use "a".' },
          { id: 4, text: 'He plays a football at school.', options: ['He plays', 'a', 'football', 'at school'], correct: 1, wrongPart: 'a', correction: '', explanation: 'Do not use articles before sports names.' },
          { id: 5, text: 'She plays a piano very well.', options: ['She plays', 'a', 'piano', 'very well'], correct: 1, wrongPart: 'a', correction: 'the', explanation: 'Use the definite article "the" before musical instruments.' },
          { id: 6, text: 'I met an one-eyed man yesterday.', options: ['I met', 'an', 'one-eyed', 'man yesterday'], correct: 1, wrongPart: 'an', correction: 'a', explanation: '"One" starts with a consonant /w/ sound, so use "a".' },
          { id: 7, text: 'They live in the Tashkent.', options: ['They live', 'in', 'the', 'Tashkent'], correct: 2, wrongPart: 'the', correction: '', explanation: 'Do not use articles before names of cities.' },
          { id: 8, text: 'He goes to school by the bus.', options: ['He goes', 'to school', 'by the', 'bus'], correct: 2, wrongPart: 'by the', correction: 'by', explanation: 'Do not use articles with means of transport (by bus).' },
          { id: 9, text: 'A sun is shining today.', options: ['A', 'sun', 'is shining', 'today'], correct: 0, wrongPart: 'A', correction: 'The', explanation: 'Use "the" for unique entities like the sun.' },
          { id: 10, text: 'She wants to buy an new phone.', options: ['She wants', 'to buy', 'an', 'new phone'], correct: 2, wrongPart: 'an', correction: 'a', explanation: '"New" starts with a consonant sound, so use "a".' },
          { id: 11, text: 'My father is doctor.', options: ['My father', 'is', 'doctor', 'No error'], correct: 2, wrongPart: 'doctor', correction: 'a doctor', explanation: 'Use "a/an" before singular countable professions.' },
          { id: 12, text: 'We had the breakfast at 8 AM.', options: ['We had', 'the', 'breakfast', 'at 8 AM'], correct: 1, wrongPart: 'the', correction: '', explanation: 'Do not use articles before names of meals (breakfast, lunch).' },
          { id: 13, text: 'Nile is the longest river in Egypt.', options: ['Nile', 'is', 'the longest', 'river in Egypt'], correct: 0, wrongPart: 'Nile', correction: 'The Nile', explanation: 'Names of rivers take the definite article "the".' },
          { id: 14, text: 'I read an useful book last night.', options: ['I read', 'an', 'useful', 'book last night'], correct: 1, wrongPart: 'an', correction: 'a', explanation: '"Useful" starts with consonant sound /j/, so use "a".' },
          { id: 15, text: 'Do you like the apples? (general)', options: ['Do you', 'like', 'the', 'apples'], correct: 2, wrongPart: 'the', correction: '', explanation: 'Do not use "the" before plural nouns in a general sense.' },
          { id: 16, text: 'She visited UK last summer.', options: ['She visited', 'UK', 'last', 'summer'], correct: 1, wrongPart: 'UK', correction: 'the UK', explanation: 'Countries with "United" in their name take the definite article "the".' },
          { id: 17, text: 'I need a advice from you.', options: ['I need', 'a', 'advice', 'from you'], correct: 1, wrongPart: 'a', correction: 'some', explanation: '"Advice" is uncountable — do not use "a/an" with it.' },
          { id: 18, text: 'Pacific Ocean is the deepest in the world.', options: ['Pacific Ocean', 'is the', 'deepest', 'in the world'], correct: 0, wrongPart: 'Pacific Ocean', correction: 'The Pacific Ocean', explanation: 'Names of oceans take "the".' },
          { id: 19, text: 'He is a honest person.', options: ['He is', 'a', 'honest', 'person'], correct: 1, wrongPart: 'a', correction: 'an', explanation: '"Honest" starts with a vowel sound (silent h), so use "an".' },
          { id: 20, text: 'We go to the church every Sunday.', options: ['We go', 'to', 'the church', 'every Sunday'], correct: 2, wrongPart: 'the church', correction: 'church', explanation: 'When visiting for its primary purpose, do not use "the" with church, school, hospital.' }
        ],
        transform: [
          { id: 1, text: 'Add the correct article: "I bought ___ laptop."', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: 'Indefinite article for a singular countable noun.' },
          { id: 2, text: 'Add the correct article: "___ moon looks beautiful."', options: ['A', 'An', 'The', 'No article'], correct: 2, explanation: 'The moon is a unique celestial body.' },
          { id: 3, text: 'Add the correct article: "She wants to be ___ architect."', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: 'Architect starts with a vowel sound.' },
          { id: 4, text: 'Correct the error: "He plays a football."', options: ['He plays football.', 'He plays the football.', 'He plays an football.', 'He plays some football.'], correct: 0, explanation: 'No article before sports.' },
          { id: 5, text: 'Correct the error: "She has a flu."', options: ['She has flu.', 'She has the flu.', 'She has an flu.', 'She has some flu.'], correct: 1, explanation: 'Typically, "the flu" is used in English.' },
          { id: 6, text: 'Add the correct article: "I am from ___ USA."', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'United States takes "the".' },
          { id: 7, text: 'Correct the error: "I eat a breakfast at 7 AM."', options: ['I eat breakfast at 7 AM.', 'I eat the breakfast at 7 AM.', 'I eat an breakfast.', 'No change needed.'], correct: 0, explanation: 'No article before meals.' },
          { id: 8, text: 'Add correct articles: "I saw ___ movie. ___ movie was sad."', options: ['a / The', 'the / A', 'a / A', 'the / The'], correct: 0, explanation: 'First mention: a. Second mention: the.' },
          { id: 9, text: 'Add the correct article: "___ Nile is in Egypt."', options: ['A', 'An', 'The', 'No article'], correct: 2, explanation: 'Rivers take "the".' },
          { id: 10, text: 'Correct the error: "I need an information."', options: ['I need a information.', 'I need some information.', 'I need the information.', 'I need information\'s.'], correct: 1, explanation: '"Information" is uncountable → "some information".' },
          { id: 11, text: 'Add article: "She is ___ English teacher."', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"English" starts with a vowel sound.' },
          { id: 12, text: 'Correct the error: "We go by a train."', options: ['We go by train.', 'We go by the train.', 'We go in a train.', 'No change.'], correct: 0, explanation: 'No article in "by train".' },
          { id: 13, text: 'Add article: "He goes to ___ bed at 10 PM."', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: '"Go to bed" is a set phrase with no article.' },
          { id: 14, text: 'Correct: "I saw a elephant."', options: ['I saw the elephant.', 'I saw an elephant.', 'I saw elephants.', 'I saw elephant.'], correct: 1, explanation: 'Vowel sound needs "an".' },
          { id: 15, text: 'Add article: "They live in ___ beautiful house."', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: 'A singular countable noun.' },
          { id: 16, text: 'Add article: "She plays ___ violin."', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Musical instruments take "the".' },
          { id: 17, text: 'Add article: "___ cats are animals."', options: ['A', 'An', 'The', 'No article'], correct: 3, explanation: 'Plural nouns in general take no article.' },
          { id: 18, text: 'Correct: "He is a honest man."', options: ['He is an honest man.', 'He is the honest man.', 'He is honest man.', 'No change.'], correct: 0, explanation: 'Silent "h" in honest leads to vowel sound.' },
          { id: 19, text: 'Add article: "___ sugar is sweet."', options: ['A', 'An', 'The', 'No article'], correct: 3, explanation: 'Uncountable nouns in general take no article.' },
          { id: 20, text: 'Add article: "I want to visit ___ London."', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'City names take no article.' }
        ],
        dialogue: [
          { id: 1, situation: 'Talking about pets.', dialogue: 'A: Do you have ___ pet?\nB: Yes, I have a cat.', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: 'A general singular countable noun: "a pet".' },
          { id: 2, situation: 'Discussing the weather.', dialogue: 'A: Look at ___ sky!\nB: Wow, it is full of stars.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'The sky is unique and takes "the".' },
          { id: 3, situation: 'Talking about jobs.', dialogue: 'A: What does your mother do?\nB: She is ___ doctor.', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: 'Use "a/an" before professions.' },
          { id: 4, situation: 'Asking for something at dinner.', dialogue: 'A: Could you pass me ___ pepper?\nB: Yes, here it is.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'The specific pepper on the table.' },
          { id: 5, situation: 'Planning a trip.', dialogue: 'A: Have you ever been to ___ United States?\nB: No, but I want to go.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'USA takes the definite article "the".' },
          { id: 6, situation: 'Asking about language skills.', dialogue: 'A: Can you speak ___ English?\nB: Yes, a little.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'Do not use articles before names of languages.' },
          { id: 7, situation: 'Checking hotel locations.', dialogue: 'A: Where is the hotel?\nB: It is near ___ station.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'The specific station in the town.' },
          { id: 8, situation: 'Talking about a school subject.', dialogue: 'A: Do you like ___ history?\nB: Yes, it is my favourite subject.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'No article before school subjects.' },
          { id: 9, situation: 'Ordering breakfast.', dialogue: 'A: What would you like for breakfast?\nB: I want ___ egg and a toast.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"Egg" starts with a vowel sound, so use "an".' },
          { id: 10, situation: 'Talking about a unique place.', dialogue: 'A: Where does the Queen of England live?\nB: Buckingham Palace in ___ London.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'No article before names of cities.' },
          { id: 11, situation: 'Asking about a specific movie.', dialogue: 'A: Did you like ___ movie we watched yesterday?\nB: Yes, it was great!', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Use "the" because it refers to a specific movie.' },
          { id: 12, situation: 'Ordering drinks.', dialogue: 'A: Would you like ___ glass of water?\nB: Yes, please.', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: '"A glass of water" — standard countable singular noun.' },
          { id: 13, situation: 'Discussing transport.', dialogue: 'A: How did you get here?\nB: By ___ taxi.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'No article after "by" + transport.' },
          { id: 14, situation: 'Looking for a general tool.', dialogue: 'A: Do you have ___ umbrella?\nB: Yes, it is in my bag.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"Umbrella" starts with a vowel sound /ʌ/, so use "an".' },
          { id: 15, situation: 'Talking about a musical instrument.', dialogue: 'A: Can you play ___ guitar?\nB: No, but I play the piano.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Definite article before musical instruments.' },
          { id: 16, situation: 'Discussing a geographical feature.', dialogue: 'A: What is the longest river in the world?\nB: ___ Amazon River.', options: ['A', 'An', 'The', 'No article'], correct: 2, explanation: 'Names of rivers take "the".' },
          { id: 17, situation: 'Talking about daily routine.', dialogue: 'A: When do you have ___ lunch?\nB: At 1 PM.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'No article before meals.' },
          { id: 18, situation: 'Asking about a piece of technology.', dialogue: 'A: I need to buy ___ laptop.\nB: You should get one with a good battery.', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: 'Introduces a general countable noun.' },
          { id: 19, situation: 'Chatting about an interesting fact.', dialogue: 'A: Do you know that ___ cheetah is the fastest animal?\nB: Yes, I knew that.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Singular noun used as a class representation takes "the".' },
          { id: 20, situation: 'Discussing general animal love.', dialogue: 'A: Do you like ___ dogs?\nB: Yes, I love them.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'Plural nouns in general take no article.' }
        ],
        fillBlanks: [
          { id: 1, text: 'I saw ___ elephant at the zoo.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: 'Use "an" before words starting with a vowel sound.' },
          { id: 2, text: '___ sun is shining brightly today.', options: ['A', 'An', 'The', 'No article'], correct: 2, explanation: 'Use "the" for unique celestial bodies (the sun).' },
          { id: 3, text: 'She wants to buy ___ new car.', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: 'Use "a" for singular countable nouns mentioned for the first time.' },
          { id: 4, text: 'He is ___ honest man.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"Honest" starts with a silent "h", producing a vowel sound (an honest).' },
          { id: 5, text: 'Do you like ___ music? (in general)', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'No article before uncountable nouns used in a general sense.' },
          { id: 6, text: 'I go to school by ___ bus.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'No article in the phrase "by bus" (means of transport).' },
          { id: 7, text: 'She plays ___ piano very well.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Use "the" before musical instruments (plays the piano).' },
          { id: 8, text: 'He is ___ university student.', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: '"University" starts with a consonant sound /j/, so use "a".' },
          { id: 9, text: 'We visited ___ UK last year.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Countries with "Kingdom", "States", or plural names take "the" (the UK).' },
          { id: 10, text: '___ water in this bottle is very cold.', options: ['A', 'An', 'The', 'No article'], correct: 2, explanation: 'Use "the" because it is a specific body of water (in this bottle).' },
          { id: 11, text: 'Paris is ___ capital of France.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Paris is the only capital, so it is specific (the capital).' },
          { id: 12, text: 'I had ___ apple and a banana.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"Apple" starts with a vowel sound → "an apple".' },
          { id: 13, text: 'My father is ___ engineer.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: 'Use "a/an" before professions.' },
          { id: 14, text: 'I love eating ___ apples.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'No article before plural countable nouns used in a general sense.' },
          { id: 15, text: '___ Nile is the longest river in the world.', options: ['A', 'An', 'The', 'No article'], correct: 2, explanation: 'Names of rivers always take the definite article "the".' },
          { id: 16, text: 'Would you like ___ cup of tea?', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: '"A cup of tea" — standard singular countable noun.' },
          { id: 17, text: 'He goes to work five days ___ week.', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: 'Use "a/an" to mean "per" (five days a week).' },
          { id: 18, text: 'We had dinner at ___ excellent restaurant.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"Excellent" starts with a vowel sound → "an excellent".' },
          { id: 19, text: 'Could you pass me ___ salt, please?', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Use "the" because both speaker and listener know which salt is meant.' },
          { id: 20, text: 'My brother lives in ___ Tashkent.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'No article before names of cities.' }
        ],
        scrambled: [
          { id: 1, words: ['apple', 'eating', 'I', 'am', 'an'], answer: 'I am eating an apple', explanation: '"An" is used before vowel-initial apple.' },
          { id: 2, words: ['sky', 'the', 'blue', 'is', 'today'], answer: 'the sky is blue today', explanation: 'Unique entities like the sky take the definite article.' },
          { id: 3, words: ['wants', 'a', 'she', 'dog', 'to', 'buy'], answer: 'she wants to buy a dog', explanation: 'First mention of a singular countable noun.' },
          { id: 4, words: ['is', 'he', 'honest', 'an', 'boy'], answer: 'he is an honest boy', explanation: 'Silent "h" in honest needs "an".' },
          { id: 5, words: ['piano', 'she', 'plays', 'the', 'well'], answer: 'she plays the piano well', explanation: 'Musical instruments take the definite article "the".' },
          { id: 6, words: ['love', 'flowers', 'in', 'general', 'I'], answer: 'I love flowers in general', explanation: 'No article before plural nouns in general.' },
          { id: 7, words: ['largest', 'the', 'Pacific', 'is', 'ocean'], answer: 'the Pacific is the largest ocean', explanation: 'Ocean names and superlatives both take "the".' },
          { id: 8, words: ['engineer', 'father', 'an', 'my', 'is'], answer: 'my father is an engineer', explanation: 'Professions are preceded by indefinite articles.' },
          { id: 9, words: ['moon', 'is', 'bright', 'the', 'tonight'], answer: 'the moon is bright tonight', explanation: 'Unique items take "the".' },
          { id: 10, words: ['by', 'car', 'goes', 'to', 'work', 'he'], answer: 'he goes to work by car', explanation: '"by car" (means of transport) takes no article.' },
          { id: 11, words: ['Tashkent', 'in', 'live', 'we'], answer: 'we live in Tashkent', explanation: 'No article before city names.' },
          { id: 12, words: ['useful', 'is', 'book', 'a', 'this'], answer: 'this is a useful book', explanation: '"Useful" starts with consonant /j/ sound, so "a useful".' },
          { id: 13, words: ['tea', 'like', 'would', 'a', 'cup', 'you', 'of', '?'], answer: 'would you like a cup of tea', explanation: 'Standard phrase for offering tea.' },
          { id: 14, words: ['capital', 'London', 'is', 'the', 'of', 'UK', 'the'], answer: 'London is the capital of the UK', explanation: 'London is the specific capital of a specific country.' },
          { id: 15, words: ['water', 'cold', 'bottle', 'in', 'the', 'is'], answer: 'the water in the bottle is cold', explanation: 'Specific water and specific bottle.' },
          { id: 16, words: ['Nile', 'longest', 'the', 'river', 'is', 'the'], answer: 'the Nile is the longest river', explanation: 'River name takes "the".' },
          { id: 17, words: ['five', 'days', 'work', 'a', 'they', 'week'], answer: 'they work five days a week', explanation: '"a week" meaning per week.' },
          { id: 18, words: ['nice', 'restaurant', 'we', 'at', 'ate', 'a'], answer: 'we ate at a nice restaurant', explanation: 'General singular countable noun introduction.' },
          { id: 19, words: ['salt', 'pass', 'please', 'me', 'the'], answer: 'please pass me the salt', explanation: 'Definite article for specific item at table.' },
          { id: 20, words: ['European', 'she', 'country', 'visited', 'a'], answer: 'she visited a European country', explanation: '"European" starts with consonant sound /j/, hence "a".' }
        ],
        errorCorrection: [
          { id: 1, text: 'She is a English teacher.', options: ['She is', 'a', 'English', 'teacher'], correct: 1, wrongPart: 'a', correction: 'an', explanation: '"English" starts with a vowel sound, so use "an".' },
          { id: 2, text: 'I love the music in general.', options: ['I love', 'the', 'music', 'in general'], correct: 1, wrongPart: 'the', correction: '', explanation: 'No article before abstract uncountable nouns in a general sense.' },
          { id: 3, text: 'He is an university student.', options: ['He is', 'an', 'university', 'student'], correct: 1, wrongPart: 'an', correction: 'a', explanation: '"University" starts with a consonant /j/ sound, so use "a".' },
          { id: 4, text: 'He plays a football at school.', options: ['He plays', 'a', 'football', 'at school'], correct: 1, wrongPart: 'a', correction: '', explanation: 'Do not use articles before sports names.' },
          { id: 5, text: 'She plays a piano very well.', options: ['She plays', 'a', 'piano', 'very well'], correct: 1, wrongPart: 'a', correction: 'the', explanation: 'Use the definite article "the" before musical instruments.' },
          { id: 6, text: 'I met an one-eyed man yesterday.', options: ['I met', 'an', 'one-eyed', 'man yesterday'], correct: 1, wrongPart: 'an', correction: 'a', explanation: '"One" starts with a consonant /w/ sound, so use "a".' },
          { id: 7, text: 'They live in the Tashkent.', options: ['They live', 'in', 'the', 'Tashkent'], correct: 2, wrongPart: 'the', correction: '', explanation: 'Do not use articles before names of cities.' },
          { id: 8, text: 'He goes to school by the bus.', options: ['He goes', 'to school', 'by the', 'bus'], correct: 2, wrongPart: 'by the', correction: 'by', explanation: 'Do not use articles with means of transport (by bus).' },
          { id: 9, text: 'A sun is shining today.', options: ['A', 'sun', 'is shining', 'today'], correct: 0, wrongPart: 'A', correction: 'The', explanation: 'Use "the" for unique entities like the sun.' },
          { id: 10, text: 'She wants to buy an new phone.', options: ['She wants', 'to buy', 'an', 'new phone'], correct: 2, wrongPart: 'an', correction: 'a', explanation: '"New" starts with a consonant sound, so use "a".' },
          { id: 11, text: 'My father is doctor.', options: ['My father', 'is', 'doctor', 'No error'], correct: 2, wrongPart: 'doctor', correction: 'a doctor', explanation: 'Use "a/an" before singular countable professions.' },
          { id: 12, text: 'We had the breakfast at 8 AM.', options: ['We had', 'the', 'breakfast', 'at 8 AM'], correct: 1, wrongPart: 'the', correction: '', explanation: 'Do not use articles before names of meals (breakfast, lunch).' },
          { id: 13, text: 'Nile is the longest river in Egypt.', options: ['Nile', 'is', 'the longest', 'river in Egypt'], correct: 0, wrongPart: 'Nile', correction: 'The Nile', explanation: 'Names of rivers take the definite article "the".' },
          { id: 14, text: 'I read an useful book last night.', options: ['I read', 'an', 'useful', 'book last night'], correct: 1, wrongPart: 'an', correction: 'a', explanation: '"Useful" starts with consonant sound /j/, so use "a".' },
          { id: 15, text: 'Do you like the apples? (general)', options: ['Do you', 'like', 'the', 'apples'], correct: 2, wrongPart: 'the', correction: '', explanation: 'Do not use "the" before plural nouns in a general sense.' },
          { id: 16, text: 'She visited UK last summer.', options: ['She visited', 'UK', 'last', 'summer'], correct: 1, wrongPart: 'UK', correction: 'the UK', explanation: 'Countries with "United" in their name take the definite article "the".' },
          { id: 17, text: 'I need a advice from you.', options: ['I need', 'a', 'advice', 'from you'], correct: 1, wrongPart: 'a', correction: 'some', explanation: '"Advice" is uncountable — do not use "a/an" with it.' },
          { id: 18, text: 'Pacific Ocean is the deepest in the world.', options: ['Pacific Ocean', 'is the', 'deepest', 'in the world'], correct: 0, wrongPart: 'Pacific Ocean', correction: 'The Pacific Ocean', explanation: 'Names of oceans take "the".' },
          { id: 19, text: 'He is a honest person.', options: ['He is', 'a', 'honest', 'person'], correct: 1, wrongPart: 'a', correction: 'an', explanation: '"Honest" starts with a vowel sound (silent h), so use "an".' },
          { id: 20, text: 'We go to the church every Sunday.', options: ['We go', 'to', 'the church', 'every Sunday'], correct: 2, wrongPart: 'the church', correction: 'church', explanation: 'When visiting for its primary purpose, do not use "the" with church, school, hospital.' }
        ],
        transform: [
          { id: 1, text: 'Add the correct article: "I bought ___ laptop."', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: 'Indefinite article for a singular countable noun.' },
          { id: 2, text: 'Add the correct article: "___ moon looks beautiful."', options: ['A', 'An', 'The', 'No article'], correct: 2, explanation: 'The moon is a unique celestial body.' },
          { id: 3, text: 'Add the correct article: "She wants to be ___ architect."', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: 'Architect starts with a vowel sound.' },
          { id: 4, text: 'Correct the error: "He plays a football."', options: ['He plays football.', 'He plays the football.', 'He plays an football.', 'He plays some football.'], correct: 0, explanation: 'No article before sports.' },
          { id: 5, text: 'Correct the error: "She has a flu."', options: ['She has flu.', 'She has the flu.', 'She has an flu.', 'She has some flu.'], correct: 1, explanation: 'Typically, "the flu" is used in English.' },
          { id: 6, text: 'Add the correct article: "I am from ___ USA."', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'United States takes "the".' },
          { id: 7, text: 'Correct the error: "I eat a breakfast at 7 AM."', options: ['I eat breakfast at 7 AM.', 'I eat the breakfast at 7 AM.', 'I eat an breakfast.', 'No change needed.'], correct: 0, explanation: 'No article before meals.' },
          { id: 8, text: 'Add correct articles: "I saw ___ movie. ___ movie was sad."', options: ['a / The', 'the / A', 'a / A', 'the / The'], correct: 0, explanation: 'First mention: a. Second mention: the.' },
          { id: 9, text: 'Add the correct article: "___ Nile is in Egypt."', options: ['A', 'An', 'The', 'No article'], correct: 2, explanation: 'Rivers take "the".' },
          { id: 10, text: 'Correct the error: "I need an information."', options: ['I need a information.', 'I need some information.', 'I need the information.', 'I need information\'s.'], correct: 1, explanation: '"Information" is uncountable → "some information".' },
          { id: 11, text: 'Add article: "She is ___ English teacher."', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"English" starts with a vowel sound.' },
          { id: 12, text: 'Correct the error: "We go by a train."', options: ['We go by train.', 'We go by the train.', 'We go in a train.', 'No change.'], correct: 0, explanation: 'No article in "by train".' },
          { id: 13, text: 'Add article: "He goes to ___ bed at 10 PM."', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: '"Go to bed" is a set phrase with no article.' },
          { id: 14, text: 'Correct: "I saw a elephant."', options: ['I saw the elephant.', 'I saw an elephant.', 'I saw elephants.', 'I saw elephant.'], correct: 1, explanation: 'Vowel sound needs "an".' },
          { id: 15, text: 'Add article: "They live in ___ beautiful house."', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: 'A singular countable noun.' },
          { id: 16, text: 'Add article: "She plays ___ violin."', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Musical instruments take "the".' },
          { id: 17, text: 'Add article: "___ cats are animals."', options: ['A', 'An', 'The', 'No article'], correct: 3, explanation: 'Plural nouns in general take no article.' },
          { id: 18, text: 'Correct: "He is a honest man."', options: ['He is an honest man.', 'He is the honest man.', 'He is honest man.', 'No change.'], correct: 0, explanation: 'Silent "h" in honest leads to vowel sound.' },
          { id: 19, text: 'Add article: "___ sugar is sweet."', options: ['A', 'An', 'The', 'No article'], correct: 3, explanation: 'Uncountable nouns in general take no article.' },
          { id: 20, text: 'Add article: "I want to visit ___ London."', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'City names take no article.' }
        ],
        dialogue: [
          { id: 1, situation: 'Talking about pets.', dialogue: 'A: Do you have ___ pet?\nB: Yes, I have a cat.', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: 'A general singular countable noun: "a pet".' },
          { id: 2, situation: 'Discussing the weather.', dialogue: 'A: Look at ___ sky!\nB: Wow, it is full of stars.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'The sky is unique and takes "the".' },
          { id: 3, situation: 'Talking about jobs.', dialogue: 'A: What does your mother do?\nB: She is ___ doctor.', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: 'Use "a/an" before professions.' },
          { id: 4, situation: 'Asking for something at dinner.', dialogue: 'A: Could you pass me ___ pepper?\nB: Yes, here it is.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'The specific pepper on the table.' },
          { id: 5, situation: 'Planning a trip.', dialogue: 'A: Have you ever been to ___ United States?\nB: No, but I want to go.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'USA takes the definite article "the".' },
          { id: 6, situation: 'Asking about language skills.', dialogue: 'A: Can you speak ___ English?\nB: Yes, a little.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'Do not use articles before names of languages.' },
          { id: 7, situation: 'Checking hotel locations.', dialogue: 'A: Where is the hotel?\nB: It is near ___ station.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'The specific station in the town.' },
          { id: 8, situation: 'Talking about a school subject.', dialogue: 'A: Do you like ___ history?\nB: Yes, it is my favourite subject.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'No article before school subjects.' },
          { id: 9, situation: 'Ordering breakfast.', dialogue: 'A: What would you like for breakfast?\nB: I want ___ egg and a toast.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"Egg" starts with a vowel sound, so use "an".' },
          { id: 10, situation: 'Talking about a unique place.', dialogue: 'A: Where does the Queen of England live?\nB: Buckingham Palace in ___ London.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'No article before names of cities.' },
          { id: 11, situation: 'Asking about a specific movie.', dialogue: 'A: Did you like ___ movie we watched yesterday?\nB: Yes, it was great!', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Use "the" because it refers to a specific movie.' },
          { id: 12, situation: 'Ordering drinks.', dialogue: 'A: Would you like ___ glass of water?\nB: Yes, please.', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: '"A glass of water" — standard countable singular noun.' },
          { id: 13, situation: 'Discussing transport.', dialogue: 'A: How did you get here?\nB: By ___ taxi.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'No article after "by" + transport.' },
          { id: 14, situation: 'Looking for a general tool.', dialogue: 'A: Do you have ___ umbrella?\nB: Yes, it is in my bag.', options: ['a', 'an', 'the', 'no article'], correct: 1, explanation: '"Umbrella" starts with a vowel sound /ʌ/, so use "an".' },
          { id: 15, situation: 'Talking about a musical instrument.', dialogue: 'A: Can you play ___ guitar?\nB: No, but I play the piano.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Definite article before musical instruments.' },
          { id: 16, situation: 'Discussing a geographical feature.', dialogue: 'A: What is the longest river in the world?\nB: ___ Amazon River.', options: ['A', 'An', 'The', 'No article'], correct: 2, explanation: 'Names of rivers take "the".' },
          { id: 17, situation: 'Talking about daily routine.', dialogue: 'A: When do you have ___ lunch?\nB: At 1 PM.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'No article before meals.' },
          { id: 18, situation: 'Asking about a piece of technology.', dialogue: 'A: I need to buy ___ laptop.\nB: You should get one with a good battery.', options: ['a', 'an', 'the', 'no article'], correct: 0, explanation: 'Introduces a general countable noun.' },
          { id: 19, situation: 'Chatting about an interesting fact.', dialogue: 'A: Do you know that ___ cheetah is the fastest animal?\nB: Yes, I knew that.', options: ['a', 'an', 'the', 'no article'], correct: 2, explanation: 'Singular noun used as a class representation takes "the".' },
          { id: 20, situation: 'Discussing general animal love.', dialogue: 'A: Do you like ___ dogs?\nB: Yes, I love them.', options: ['a', 'an', 'the', 'no article'], correct: 3, explanation: 'Plural nouns in general take no article.' }
        ]
      },
      {
        id: 'present-continuous',
        title: 'Present Continuous',
        icon: '🏃',
        guide: `## Present Continuous (Hozirgi davomli zamon)

Present Continuous hozirgi vaqtda sodir bo'layotgan yoki vaqtinchalik davom etayotgan ish-harakatlarni ifodalash uchun ishlatiladi.

## 1. Shakllanishi (Form)
Gaplar quyidagicha tuziladi:
• **Positive (+)**: Subject + am / is / are + Verb-ing
  - I **am studying** English.
  - She **is reading** a book.
  - They **are playing** football.
• **Negative (-)**: Subject + am / is / are + not + Verb-ing
  - I **am not watching** TV.
  - He **isn't working** today.
  - We **aren't leaving** yet.
• **Question (?)**: Am / Is / Are + Subject + Verb-ing?
  - **Are you listening** to me?
  - **Is it raining** outside?
  - What **are they doing**?

## 2. Imlo qoidalari (Spelling Rules for -ing)
• Ko'pgina fe'llarga shunchaki **-ing** qo'shiladi:
  - play -> playing, talk -> talking, work -> working
• Agar fe'l **-e** bilan tugasa, **-e** tushib qoladi va **-ing** qo'shiladi:
  - write -> writing, make -> making, take -> taking
• Agar fe'l bitta qisqa unli va bitta undosh bilan tugasa, oxirgi undosh ikkilanadi:
  - run -> running, sit -> sitting, swim -> swimming, get -> getting

## 3. Ishlatilishi (Usage)
1. **Hozirgi daqiqada sodir bo'layotgan ish-harakatlar**:
   - Look! It is raining outside. (Hozir yomg'ir yog'yapti)
   - Shh! The baby is sleeping.
2. **Vaqtinchalik vaziyatlar**:
   - I am staying at a hotel this week. (Faqat shu hafta)
3. **Hozirgi kunlarda bo'layotgan, lekin ayni soniyada shart bo'lmagan jarayonlar**:
   - She is reading a very interesting book. (Hozir kitob o'qiyotgani yo'q, lekin shu kunlarda o'qib tugatyapti)

## 4. Davomli zamonda ishlatilmaydigan fe'llar (Stative Verbs)
His-tuyg'u, fikrlash va egalikni bildiruvchi fe'llar odatda continuous zamonlarda ishlatilmaydi:
• like, love, hate, want, know, understand, remember, believe, have (egalik ma'nosida).
  - I want some water. (emas: I am wanting...)
  - I know him. (emas: I am knowing him...)`,
        questions: [
          { id: 1, text: 'I ___ my homework now.', options: ['am doing', 'is doing', 'are doing', 'do'], correct: 0, explanation: 'Use "am doing" for the first-person singular "I" in Present Continuous.' },
          { id: 2, text: 'Listen! The phone ___.', options: ['rings', 'is ringing', 'are ringing', 'ringing'], correct: 1, explanation: '"Listen!" indicates the action is happening right now, so use "is ringing".' },
          { id: 3, text: 'They ___ tennis at the moment.', options: ['play', 'playing', 'is playing', 'are playing'], correct: 3, explanation: '"At the moment" matches "are playing" for plural subject "they".' },
          { id: 4, text: 'Look! It ___.', options: ['is raining', 'rains', 'are raining', 'is rain'], correct: 0, explanation: '"Look!" indicates an ongoing action happening now: "is raining".' },
          { id: 5, text: 'We ___ a movie right now.', options: ['are watching', 'is watching', 'watch', 'watching'], correct: 0, explanation: '"Right now" requires "are watching" for plural "we".' },
          { id: 6, text: 'She ___ for her exams this week.', options: ['is studying', 'are studying', 'studies', 'study'], correct: 0, explanation: '"This week" indicates a temporary action: "is studying".' },
          { id: 7, text: 'He ___ today because he is sick.', options: ["isn't working", 'not is working', "isn't work", "doesn't work"], correct: 0, explanation: 'Negative form: "isn\'t working".' },
          { id: 8, text: '___ you listening to me?', options: ['Are', 'Is', 'Do', 'Am'], correct: 0, explanation: 'Questions for "you" start with "Are".' },
          { id: 9, text: 'What ___ she cooking?', options: ['is', 'are', 'do', 'does'], correct: 0, explanation: 'Wh-question for singular "she" uses "is".' },
          { id: 10, text: "I can't talk right now. I ___.", options: ['am driving', 'is driving', 'drive', 'driving'], correct: 0, explanation: 'Action happening at the moment of speech: "am driving".' },
          { id: 11, text: 'They ___ a new house this month.', options: ['are building', 'is building', 'build', 'builds'], correct: 0, explanation: 'Temporary or ongoing project this month: "are building".' },
          { id: 12, text: 'Look! The boys ___.', options: ['are running', 'is running', 'run', 'running'], correct: 0, explanation: 'Plural subject "the boys" requires "are running".' },
          { id: 13, text: 'The baby ___ in the bedroom.', options: ['is sleeping', 'are sleeping', 'sleeps', 'sleeping'], correct: 0, explanation: 'Action happening right now: "is sleeping".' },
          { id: 14, text: 'Why ___ you crying?', options: ['are', 'is', 'do', 'am'], correct: 0, explanation: 'Question form with "you": "are you crying".' },
          { id: 15, text: 'She ___ a letter to her friend.', options: ['is writing', 'are writing', 'writes', 'writing'], correct: 0, explanation: 'Write drops the final "e" before adding "-ing": "is writing".' },
          { id: 16, text: 'The birds ___ in the sky now.', options: ['are flying', 'is flying', 'fly', 'flying'], correct: 0, explanation: 'Plural subject "birds" uses "are flying".' },
          { id: 17, text: 'I ___ delicious cake at the moment.', options: ['am eating', 'is eating', 'eat', 'eating'], correct: 0, explanation: 'Present continuous with "I": "am eating".' },
          { id: 18, text: 'He ___ computer games right now.', options: ['is playing', 'are playing', 'plays', 'playing'], correct: 0, explanation: 'Singular subject "he" uses "is playing".' },
          { id: 19, text: 'They ___ to music at the moment.', options: ['are listening', 'is listening', 'listen', 'listening'], correct: 0, explanation: 'Plural subject "they" uses "are listening".' },
          { id: 20, text: '___ it raining outside?', options: ['Is', 'Are', 'Does', 'Do'], correct: 0, explanation: 'Questions for "it" start with "Is".' }
        ],
        fillBlanks: [
          { id: 1, text: 'I am ___ (study) English now.', options: ['studying', 'studing', 'study', 'studies'], correct: 0, explanation: 'Spelling rule: simply add "-ing" to study.' },
          { id: 2, text: 'She ___ not listening to music.', options: ['is', 'are', 'am', 'does'], correct: 0, explanation: 'Singular subject "she" takes "is".' },
          { id: 3, text: 'We are ___ (have) dinner now.', options: ['having', 'haveing', 'have', 'haved'], correct: 0, explanation: 'Spelling rule: drop "e" in have to make "having".' },
          { id: 4, text: 'They ___ sitting in the garden.', options: ['are', 'is', 'am', 'do'], correct: 0, explanation: 'Plural subject "they" takes "are".' },
          { id: 5, text: 'The cat is ___ (run) after the mouse.', options: ['running', 'runing', 'run', 'runs'], correct: 0, explanation: 'Spelling rule: double the consonant in run → "running".' },
          { id: 6, text: 'Why are you ___ (look) at me?', options: ['looking', 'look', 'looks', 'looked'], correct: 0, explanation: 'Form requires the "-ing" verb after "are you".' },
          { id: 7, text: 'He is ___ (write) a book.', options: ['writing', 'writeing', 'write', 'writes'], correct: 0, explanation: 'Spelling rule: drop "e" in write to make "writing".' },
          { id: 8, text: '___ she coming to the party?', options: ['Is', 'Are', 'Am', 'Does'], correct: 0, explanation: 'Singular subject "she" starts questions with "Is".' },
          { id: 9, text: 'We ___ not going to the park today.', options: ['are', 'is', 'am', 'do'], correct: 0, explanation: 'Plural subject "we" takes "are".' },
          { id: 10, text: 'Look! The bus is ___ (come).', options: ['coming', 'comeing', 'come', 'comes'], correct: 0, explanation: 'Spelling rule: drop "e" in come to make "coming".' },
          { id: 11, text: 'I ___ writing an email.', options: ['am', 'is', 'are', 'do'], correct: 0, explanation: 'Subject "I" takes "am".' },
          { id: 12, text: 'They are ___ (make) a cake.', options: ['making', 'makeing', 'make', 'makes'], correct: 0, explanation: 'Spelling rule: drop "e" in make to make "making".' },
          { id: 13, text: 'He ___ not washing his car now.', options: ['is', 'are', 'am', 'does'], correct: 0, explanation: 'Singular subject "he" takes "is".' },
          { id: 14, text: '___ they playing football?', options: ['Are', 'Is', 'Am', 'Do'], correct: 0, explanation: 'Plural subject "they" starts questions with "Are".' },
          { id: 15, text: 'I am ___ (sit) on the chair.', options: ['sitting', 'siting', 'sit', 'sits'], correct: 0, explanation: 'Spelling rule: double the consonant in sit → "sitting".' },
          { id: 16, text: 'The dog is ___ (bark) at the postman.', options: ['barking', 'bark', 'barks', 'barked'], correct: 0, explanation: 'Verb "bark" adds "-ing" to make "barking".' },
          { id: 17, text: 'We ___ learning English grammar now.', options: ['are', 'is', 'am', 'do'], correct: 0, explanation: '"We" takes "are".' },
          { id: 18, text: 'Why is she ___ (cry)?', options: ['crying', 'cry', 'cries', 'cried'], correct: 0, explanation: '"cry" adds "-ing" to make "crying".' },
          { id: 19, text: 'My parents ___ traveling today.', options: ['are', 'is', 'am', 'do'], correct: 0, explanation: 'Plural subject "parents" takes "are".' },
          { id: 20, text: 'I am ___ (wait) for the bus.', options: ['waiting', 'wait', 'waits', 'waited'], correct: 0, explanation: '"wait" adds "-ing" to make "waiting".' }
        ],
        scrambled: [
          { id: 1, words: ['am', 'I', 'studying', 'English', 'now'], answer: 'I am studying English now', explanation: 'Subject + am + verb-ing + object + time.' },
          { id: 2, words: ['is', 'she', 'what', 'doing', '?'], answer: 'what is she doing', explanation: 'Question word + is + subject + verb-ing.' },
          { id: 3, words: ['are', 'they', 'playing', 'not', 'tennis'], answer: 'they are not playing tennis', explanation: 'Subject + are + not + verb-ing + object.' },
          { id: 4, words: ['is', 'raining', 'it', 'now', 'hard'], answer: 'it is raining hard now', explanation: 'Subject + is + verb-ing + adverb + time.' },
          { id: 5, words: ['we', 'are', 'watching', 'movie', 'a'], answer: 'we are watching a movie', explanation: 'Subject + are + verb-ing + object.' },
          { id: 6, words: ['listening', 'are', 'music', 'you', 'to', '?'], answer: 'are you listening to music', explanation: 'Are + subject + verb-ing + preposition + object.' },
          { id: 7, words: ['he', 'is', 'driving', 'a', 'car'], answer: 'he is driving a car', explanation: 'Subject + is + verb-ing + object.' },
          { id: 8, words: ['dinner', 'having', 'are', 'we', 'now'], answer: 'we are having dinner now', explanation: 'Subject + are + having + dinner + now.' },
          { id: 9, words: ['is', 'sleeping', 'the', 'baby', 'bedroom', 'in', 'the'], answer: 'the baby is sleeping in the bedroom', explanation: 'Subject + is + sleeping + prepositional phrase.' },
          { id: 10, words: ['coming', 'are', 'they', 'when', '?'], answer: 'when are they coming', explanation: 'When + are + they + verb-ing.' },
          { id: 11, words: ['is', 'running', 'dog', 'the', 'park', 'in', 'the'], answer: 'the dog is running in the park', explanation: 'Subject + is + running + prepositional phrase.' },
          { id: 12, words: ['am', 'not', 'I', 'working', 'today'], answer: 'I am not working today', explanation: 'Subject + am + not + working + today.' },
          { id: 13, words: ['she', 'is', 'writing', 'letter', 'a'], answer: 'she is writing a letter', explanation: 'Subject + is + writing + object.' },
          { id: 14, words: ['looking', 'why', 'are', 'you', 'at', 'me', '?'], answer: 'why are you looking at me', explanation: 'Why + are + subject + looking + preposition + object.' },
          { id: 15, words: ['making', 'cake', 'they', 'are', 'a'], answer: 'they are making a cake', explanation: 'Subject + are + making + object.' },
          { id: 16, words: ['waiting', 'for', 'who', 'is', 'he', '?'], answer: 'who is he waiting for', explanation: 'Question word + is + subject + waiting + preposition.' },
          { id: 17, words: ['are', 'books', 'reading', 'we', 'library', 'in', 'the'], answer: 'we are reading books in the library', explanation: 'Subject + are + reading + object + prepositional phrase.' },
          { id: 18, words: ['is', 'cooking', 'mother', 'my', 'dinner'], answer: 'my mother is cooking dinner', explanation: 'Subject + is + cooking + object.' },
          { id: 19, words: ['playing', 'the', 'children', 'are', 'outside'], answer: 'the children are playing outside', explanation: 'Subject + are + playing + adverb.' },
          { id: 20, words: ['you', 'where', 'are', 'going', '?'], answer: 'where are you going', explanation: 'Where + are + subject + going.' }
        ],
        errorCorrection: [
          { id: 1, text: 'I am play tennis now.', options: ['I am', 'play', 'tennis', 'now'], correct: 1, wrongPart: 'play', correction: 'playing', explanation: 'Present Continuous requires Verb-ing: "playing".' },
          { id: 2, text: 'She are studying for exams.', options: ['She', 'are', 'studying', 'for exams'], correct: 1, wrongPart: 'are', correction: 'is', explanation: 'Singular subject "she" takes "is".' },
          { id: 3, text: 'They are runing in the park.', options: ['They', 'are', 'runing', 'in the park'], correct: 2, wrongPart: 'runing', correction: 'running', explanation: 'Consonant must double in "running".' },
          { id: 4, text: 'Look! The train is come.', options: ['Look', 'The train', 'is', 'come'], correct: 3, wrongPart: 'come', correction: 'coming', explanation: 'Present Continuous requires Verb-ing: "coming".' },
          { id: 5, text: 'We is having a great time.', options: ['We', 'is', 'having', 'a great time'], correct: 1, wrongPart: 'is', correction: 'are', explanation: 'Plural subject "we" takes "are".' },
          { id: 6, text: 'What does she doing right now?', options: ['What', 'does', 'she doing', 'right now'], correct: 1, wrongPart: 'does', correction: 'is', explanation: 'Present Continuous questions use "is", not "does".' },
          { id: 7, text: 'I not am working today.', options: ['I', 'not am', 'working', 'today'], correct: 1, wrongPart: 'not am', correction: 'am not', explanation: 'Negative structure is "am not", not "not am".' },
          { id: 8, text: 'Are you listen to me?', options: ['Are', 'you', 'listen', 'to me'], correct: 2, wrongPart: 'listen', correction: 'listening', explanation: 'Question form requires Verb-ing: "listening".' },
          { id: 9, text: 'The cat is sleep on the sofa.', options: ['The cat', 'is', 'sleep', 'on the sofa'], correct: 2, wrongPart: 'sleep', correction: 'sleeping', explanation: 'Continuous form needs Verb-ing: "sleeping".' },
          { id: 10, text: 'He is writeing a letter.', options: ['He', 'is', 'writeing', 'a letter'], correct: 2, wrongPart: 'writeing', correction: 'writing', explanation: 'Drop "e" in write before adding "-ing": "writing".' },
          { id: 11, text: 'They are makeing a lot of noise.', options: ['They', 'are', 'makeing', 'a lot of noise'], correct: 2, wrongPart: 'makeing', correction: 'making', explanation: 'Drop "e" in make before adding "-ing": "making".' },
          { id: 12, text: 'I am liking this music.', options: ['I', 'am liking', 'this', 'music'], correct: 1, wrongPart: 'am liking', correction: 'like', explanation: 'Stative verb "like" is not used in continuous form: "I like".' },
          { id: 13, text: 'She is works today.', options: ['She', 'is', 'works', 'today'], correct: 2, wrongPart: 'works', correction: 'working', explanation: 'Form requires Verb-ing: "is working".' },
          { id: 14, text: 'Why they are laughing?', options: ['Why', 'they are', 'laughing', 'No error'], correct: 1, wrongPart: 'they are', correction: 'are they', explanation: 'Question word order: verb before subject -> "are they".' },
          { id: 15, text: 'We are sit in the room.', options: ['We', 'are', 'sit', 'in the room'], correct: 2, wrongPart: 'sit', correction: 'sitting', explanation: 'Double consonant and use "-ing": "sitting".' },
          { id: 16, text: 'The sun is shineing brightly.', options: ['The sun', 'is', 'shineing', 'brightly'], correct: 2, wrongPart: 'shineing', correction: 'shining', explanation: 'Drop "e" in shine before adding "-ing": "shining".' },
          { id: 17, text: 'I am wait for my friend.', options: ['I', 'am', 'wait', 'for my friend'], correct: 2, wrongPart: 'wait', correction: 'waiting', explanation: 'Form requires Verb-ing: "am waiting".' },
          { id: 18, text: 'What are you cook?', options: ['What', 'are', 'you', 'cook'], correct: 3, wrongPart: 'cook', correction: 'cooking', explanation: 'Form requires Verb-ing: "are you cooking".' },
          { id: 19, text: 'He not is sleeping.', options: ['He', 'not is', 'sleeping', 'No error'], correct: 1, wrongPart: 'not is', correction: 'is not', explanation: 'Negative order: "is not sleeping" or "isn\'t sleeping".' },
          { id: 20, text: 'They is driving home now.', options: ['They', 'is', 'driving', 'home now'], correct: 1, wrongPart: 'is', correction: 'are', explanation: 'Plural subject "they" takes "are".' }
        ],
        transform: [
          { id: 1, text: 'Make negative: "I am studying."', options: ['I not am studying.', 'I am not studying.', "I don't studying.", 'I am studying not.'], correct: 1, explanation: 'Add "not" after the auxiliary verb: "I am not studying".' },
          { id: 2, text: 'Make question: "She is working."', options: ['Is she working?', 'Does she working?', 'Is she work?', 'She is working?'], correct: 0, explanation: 'Move the auxiliary verb "is" to the front: "Is she working?".' },
          { id: 3, text: 'Transform to Present Continuous: "He writes a book." (now)', options: ['He writing a book.', 'He is write a book.', 'He is writing a book.', 'He writes a book now.'], correct: 2, explanation: 'Subject + is + verb-ing: "He is writing a book".' },
          { id: 4, text: 'Make negative: "They are playing."', options: ['They are not playing.', "They aren't play.", "They don't playing.", 'They not playing.'], correct: 0, explanation: 'Negative form: "They are not playing".' },
          { id: 5, text: 'Make question: "They are reading."', options: ['Are they reading?', 'Do they reading?', 'They are reading?', 'Are they read?'], correct: 0, explanation: 'Question form: "Are they reading?".' },
          { id: 6, text: 'Transform to Present Continuous: "I do homework." (now)', options: ['I am doing homework.', 'I doing homework.', 'I do homework now.', 'I am do homework.'], correct: 0, explanation: 'Subject + am + verb-ing: "I am doing homework".' },
          { id: 7, text: 'Make negative: "He is driving."', options: ["He doesn't driving.", 'He is driving not.', 'He is not driving.', 'He not driving.'], correct: 2, explanation: 'Add "not" after "is": "He is not driving".' },
          { id: 8, text: 'Make question: "You are listening."', options: ['Are you listening?', 'Do you listening?', 'You are listening?', 'Are you listen?'], correct: 0, explanation: 'Question form: "Are you listening?".' },
          { id: 9, text: 'Transform to Present Continuous: "She eats an apple." (now)', options: ['She is eating an apple.', 'She eating an apple.', 'She eats an apple now.', 'She is eat an apple.'], correct: 0, explanation: 'Present Continuous: "She is eating an apple".' },
          { id: 10, text: 'Make negative: "We are leaving."', options: ["We aren't leave.", "We don't leaving.", 'We not are leaving.', 'We are not leaving.'], correct: 3, explanation: 'Negative form: "We are not leaving".' },
          { id: 11, text: 'Make question: "It is raining."', options: ['Is it raining?', 'Does it raining?', 'It is raining?', 'Is it rain?'], correct: 0, explanation: 'Question form: "Is it raining?".' },
          { id: 12, text: 'Transform to Present Continuous: "They run." (now)', options: ['They are running.', 'They are runing.', 'They running.', 'They run now.'], correct: 0, explanation: 'Double the consonant: "They are running".' },
          { id: 13, text: 'Make negative: "I am driving."', options: ['I am not driving.', "I aren't driving.", "I don't driving.", 'I driving not.'], correct: 0, explanation: 'Negative form: "I am not driving".' },
          { id: 14, text: 'Make question: "She is cooking."', options: ['Is she cooking?', 'Does she cooking?', 'She is cooking?', 'Is she cook?'], correct: 0, explanation: 'Question form: "Is she cooking?".' },
          { id: 15, text: 'Transform to Present Continuous: "We have lunch." (now)', options: ['We having lunch.', 'We are having lunch.', 'We are haveing lunch.', 'We are have lunch.'], correct: 1, explanation: 'Drop "e" in have and use "are": "We are having lunch".' },
          { id: 16, text: 'Make negative: "She is sleeping."', options: ["She isn't sleep.", 'She not is sleeping.', 'She is not sleeping.', "She doesn't sleeping."], correct: 2, explanation: 'Negative form: "She is not sleeping".' },
          { id: 17, text: 'Make question: "They are leaving."', options: ['Are they leaving?', 'Do they leaving?', 'They are leaving?', 'Are they leave?'], correct: 0, explanation: 'Question form: "Are they leaving?".' },
          { id: 18, text: 'Transform to Present Continuous: "I wash my car." (now)', options: ['I am washing my car.', 'I washing my car.', 'I am wash my car.', 'I wash my car now.'], correct: 0, explanation: 'Present Continuous: "I am washing my car".' },
          { id: 19, text: 'Make negative: "It is snowing."', options: ["It isn't snow.", 'It is not snowing.', 'It not is snowing.', "It doesn't snowing."], correct: 1, explanation: 'Negative form: "It is not snowing".' },
          { id: 20, text: 'Make question: "He is speaking."', options: ['Is he speaking?', 'Does he speaking?', 'Is he speak?', 'He is speaking?'], correct: 0, explanation: 'Question form: "Is he speaking?".' }
        ],
        dialogue: [
          { id: 1, situation: 'Talking about pets.', dialogue: 'A: Where is your dog?\nB: Look outside! It ___ after a cat.', options: ['runs', 'running', 'is running', 'run'], correct: 2, explanation: 'Action happening at the moment of speech: "is running".' },
          { id: 2, situation: 'Discussing the weather.', dialogue: 'A: Can we go for a walk?\nB: No, it ___ hard right now.', options: ['rains', 'is raining', 'running', 'are raining'], correct: 1, explanation: '"Right now" requires Present Continuous: "is raining".' },
          { id: 3, situation: 'Talking about jobs.', dialogue: 'A: Is your brother at home?\nB: No, he ___ at the office today.', options: ['works', 'is working', 'working', 'work'], correct: 1, explanation: 'Temporary action today: "is working".' },
          { id: 4, situation: 'Asking for something at dinner.', dialogue: 'A: What are you eating?\nB: I ___ some delicious pasta.', options: ['eat', 'eating', 'am eating', 'is eating'], correct: 2, explanation: 'First-person continuous: "am eating".' },
          { id: 5, situation: 'Planning a trip.', dialogue: 'A: Are they coming with us?\nB: Yes, they ___ their bags right now.', options: ['pack', 'packing', 'is packing', 'are packing'], correct: 3, explanation: 'Plural subject "they" uses "are packing".' },
          { id: 6, situation: 'Asking about language skills.', dialogue: 'A: What language is she studying?\nB: She ___ Spanish this semester.', options: ['learns', 'is learning', 'learning', 'are learning'], correct: 1, explanation: 'Temporary ongoing action: "is learning".' },
          { id: 7, situation: 'Checking locations.', dialogue: 'A: Where is John?\nB: In the kitchen. He ___ coffee.', options: ['makes', 'making', 'is making', 'are making'], correct: 2, explanation: 'Action happening right now: "is making".' },
          { id: 8, situation: 'Talking about a school subject.', dialogue: 'A: Why are you in the library?\nB: Because I ___ for my exam.', options: ['study', 'studying', 'am studying', 'is studying'], correct: 2, explanation: 'First-person continuous: "am studying".' },
          { id: 9, situation: 'Ordering breakfast.', dialogue: 'A: What is that sound?\nB: My father ___ the breakfast.', options: ['prepares', 'is preparing', 'preparing', 'prepare'], correct: 1, explanation: 'Action happening now: "is preparing".' },
          { id: 10, situation: 'Talking about a unique place.', dialogue: 'A: Where are you staying in London?\nB: We ___ at a nice hotel.', options: ['stay', 'staying', 'are staying', 'is staying'], correct: 2, explanation: 'Temporary state: "are staying".' },
          { id: 11, situation: 'Asking about a specific movie.', dialogue: 'A: Why are you quiet?\nB: I ___ to watch this movie.', options: ['try', 'am trying', 'trying', 'tries'], correct: 1, explanation: '"I am trying" for current action.' },
          { id: 12, situation: 'Ordering drinks.', dialogue: 'A: What is she drinking?\nB: She ___ orange juice.', options: ['drinks', 'is drinking', 'drinking', 'drink'], correct: 1, explanation: 'Current action: "is drinking".' },
          { id: 13, situation: 'Discussing transport.', dialogue: 'A: Look! Who is driving that car?\nB: Tom ___ it.', options: ['drives', 'is driving', 'driving', 'drive'], correct: 1, explanation: 'Ongoing action: "is driving".' },
          { id: 14, situation: 'Looking for a general tool.', dialogue: 'A: What are you looking for?\nB: I ___ for my keys.', options: ['look', 'looking', 'am looking', 'is looking'], correct: 2, explanation: 'Current search: "am looking".' },
          { id: 15, situation: 'Talking about a musical instrument.', dialogue: 'A: Is she playing the violin?\nB: No, she ___ the piano.', options: ['plays', 'is playing', 'playing', 'play'], correct: 1, explanation: 'Present Continuous: "is playing".' },
          { id: 16, situation: 'Discussing a geographical feature.', dialogue: 'A: Look at the river!\nB: Yes, the water ___ very fast today.', options: ['flows', 'is flowing', 'flowing', 'flow'], correct: 1, explanation: 'Temporary action today: "is flowing".' },
          { id: 17, situation: 'Talking about daily routine.', dialogue: 'A: Can we play now?\nB: No, I ___ my room.', options: ['clean', 'cleaning', 'am cleaning', 'is cleaning'], correct: 2, explanation: 'First-person continuous: "am cleaning".' },
          { id: 18, situation: 'Asking about a piece of technology.', dialogue: 'A: What are you doing with the laptop?\nB: I ___ an email to my boss.', options: ['send', 'sending', 'am sending', 'is sending'], correct: 2, explanation: 'First-person continuous: "am sending".' },
          { id: 19, situation: 'Chatting about an interesting fact.', dialogue: 'A: Why is he running?\nB: He ___ to catch the train.', options: ['hurries', 'is hurrying', 'hurrying', 'hurry'], correct: 1, explanation: 'Action in progress: "is hurrying".' },
          { id: 20, situation: 'Discussing general animal love.', dialogue: 'A: Look! The birds ___ in our garden.\nB: Oh, they are beautiful!', options: ['sing', 'singing', 'are singing', 'is singing'], correct: 2, explanation: 'Plural subject "birds" uses "are singing".' }
        ]
      },
      {
        id: "present-simple",
        title: "Present Simple",
        icon: "⏰",
        guide: `## Present Simple (Oddiy hozirgi zamon)

Present Simple takrorlanib turadigan doimiy ish-harakatlar, odatlar, faktlar va umumiy haqiqatlarni ifodalash uchun ishlatiladi.

## 1. Shakllanishi (Form)
• **Positive (+)**: Subject + Verb (-s/es)
  - I/You/We/They **play** tennis.
  - He/She/It **plays** tennis. (Uchinchi shaxs birlikda fe'lga **-s** yoki **-es** qo'shiladi)
• **Negative (-)**: Subject + do not (don't) / does not (doesn't) + Verb
  - I **don't like** coffee.
  - She **doesn't watch** TV. (Inkor gapda fe'lning asil shakli ishlatiladi, -s qo'shilmaydi)
• **Question (?)**: Do / Does + Subject + Verb?
  - **Do you speak** English?
  - **Does he live** here?

## 2. Uchinchi shaxs uchun imlo qoidalari (-s / -es / -ies)
• Ko'pgina fe'llarga shunchaki **-s** qo'shiladi:
  - work -> works, live -> lives, read -> reads
• Fe'l **-ch, -sh, -ss, -x, -z, -o** bilan tugasa, **-es** qo'shiladi:
  - watch -> watches, wash -> washes, pass -> passes, go -> goes, do -> does
• Fe'l undosh + **-y** bilan tugasa, **-y** harfi **-i** ga o'zgaradi va **-es** qo'shiladi:
  - study -> studies, fly -> flies, try -> tries
  - *(Lekin unli + y bo'lsa, shunchaki -s qo'shiladi: play -> plays, buy -> buys)*

## 3. Ishlatilishi (Usage)
1. **Kundalik tartib va takrorlanadigan harakatlar (Habits & Routines)**:
   - I get up at 7 o'clock every day. (Men har kuni soat 7 da turaman)
   - They go to the gym on Mondays.
2. **Umumiy faktlar va ilmiy haqiqatlar (Facts & General Truths)**:
   - The sun rises in the east. (Quyosh sharqdan chiqadi)
   - Water boils at 100°C.
3. **Doimiy holatlar (Permanent States)**:
   - He lives in London. (U Londonda yashaydi - bu doimiy holat)

## 4. Signal so'zlar (Time Adverbs)
Bu zamon bilan ko'pincha quyidagi payt ravishlari keladi:
• always (har doim), usually (odatda), often (tez-tez), sometimes (ba'zida), never (hech qachon), every day/week/month (har kuni/hafta/oy).`,
        questions: [
          { id: 1, text: "He ___ to the gym every Monday.", options: ["go", "goes", "going", "went"], correct: 1, explanation: "Third person singular 'he' requires 'goes' in Present Simple." },
          { id: 2, text: "I ___ not like cold weather.", options: ["am", "do", "does", "is"], correct: 1, explanation: "First person pronoun 'I' uses 'do not' (don't) for negation." },
          { id: 3, text: "___ she speak Spanish?", options: ["Do", "Does", "Is", "Are"], correct: 1, explanation: "Questions with singular 'she' start with 'Does'." },
          { id: 4, text: "The sun ___ in the east.", options: ["rises", "rise", "rising", "rose"], correct: 0, explanation: "A scientific fact uses Present Simple singular: 'rises'." },
          { id: 5, text: "They ___ in Tashkent.", options: ["lives", "live", "living", "are live"], correct: 1, explanation: "Plural subject 'they' uses the base form 'live'." },
          { id: 6, text: "My sister ___ English at university.", options: ["studies", "studying", "study", "studyed"], correct: 0, explanation: "Consonant + y changes to -ies: 'studies' for 'my sister'." },
          { id: 7, text: "He ___ watch TV in the morning.", options: ["doesn't", "don't", "isn't", "not"], correct: 0, explanation: "Third person singular negation requires 'doesn't'." },
          { id: 8, text: "Do you ___ near here?", options: ["live", "lives", "living", "lived"], correct: 0, explanation: "After do/does, the base form of the verb is used: 'live'." },
          { id: 9, text: "Water ___ at 100 degrees Celsius.", options: ["boils", "boil", "boiling", "boiled"], correct: 0, explanation: "General truth uses Present Simple singular: 'boils'." },
          { id: 10, text: "My parents ___ in a big house.", options: ["lives", "live", "living", "are living"], correct: 1, explanation: "Plural subject 'parents' takes 'live'." },
          { id: 11, text: "___ they play football on Sundays?", options: ["Do", "Does", "Are", "Is"], correct: 0, explanation: "Plural questions with 'they' start with 'Do'." },
          { id: 12, text: "She always ___ her homework in the evening.", options: ["does", "do", "doing", "did"], correct: 0, explanation: "Third person singular 'she' takes 'does'." },
          { id: 13, text: "We ___ have a car.", options: ["don't", "doesn't", "aren't", "not"], correct: 0, explanation: "Plural negative with 'we' uses 'don't'." },
          { id: 14, text: "He ___ hard every day.", options: ["works", "work", "working", "worked"], correct: 0, explanation: "Singular subject 'he' takes 'works'." },
          { id: 15, text: "What time ___ the train leave?", options: ["does", "do", "is", "are"], correct: 0, explanation: "Singular subject 'the train' takes 'does'." },
          { id: 16, text: "I usually ___ up at 6 AM.", options: ["get", "gets", "getting", "got"], correct: 0, explanation: "First person 'I' takes 'get'." },
          { id: 17, text: "She ___ coffee. She hates it.", options: ["doesn't drink", "don't drink", "isn't drinking", "drinks not"], correct: 0, explanation: "Negative form: 'doesn't drink'." },
          { id: 18, text: "___ it snow here in winter?", options: ["Does", "Do", "Is", "Are"], correct: 0, explanation: "Singular 'it' takes 'Does'." },
          { id: 19, text: "My friend ___ beautiful pictures.", options: ["draws", "draw", "drawing", "drawed"], correct: 0, explanation: "Singular 'my friend' takes 'draws'." },
          { id: 20, text: "They never ___ late for class.", options: ["arrive", "arrives", "arriving", "are arrive"], correct: 0, explanation: "Plural 'they' takes 'arrive'." }
        ],
        fillBlanks: [
          { id: 1, text: "She ___ (like) chocolate very much.", options: ["likes", "like", "liking", "liked"], correct: 0, explanation: "Third person singular adds '-s'." },
          { id: 2, text: "I do not ___ (drink) coffee.", options: ["drink", "drinks", "drinking", "drank"], correct: 0, explanation: "Use base form after do not." },
          { id: 3, text: "___ (do) he live in London?", options: ["Does", "Do", "Is", "Are"], correct: 0, explanation: "Use Does for singular 'he' in questions." },
          { id: 4, text: "They ___ (study) German at school.", options: ["study", "studies", "studying", "studied"], correct: 0, explanation: "Plural subject takes base form." },
          { id: 5, text: "The shop ___ (open) at 9 AM.", options: ["opens", "open", "opening", "opened"], correct: 0, explanation: "Singular subject 'the shop' takes 'opens'." },
          { id: 6, text: "We do not ___ (play) football on weekdays.", options: ["play", "plays", "playing", "played"], correct: 0, explanation: "Base form after do not." },
          { id: 7, text: "___ (do) you want some water?", options: ["Do", "Does", "Are", "Is"], correct: 0, explanation: "Use 'Do' with 'you'." },
          { id: 8, text: "He ___ (wash) his car every weekend.", options: ["washes", "wash", "washs", "washing"], correct: 0, explanation: "Verbs ending in -sh add '-es' for singular." },
          { id: 9, text: "My mother ___ (teach) English.", options: ["teaches", "teach", "teachys", "teaching"], correct: 0, explanation: "Verbs ending in -ch add '-es'." },
          { id: 10, text: "They do not ___ (speak) Russian.", options: ["speak", "speaks", "speaking", "spoke"], correct: 0, explanation: "Base form after do not." },
          { id: 11, text: "___ (do) it rain a lot here?", options: ["Does", "Do", "Is", "Are"], correct: 0, explanation: "Singular 'it' takes 'Does'." },
          { id: 12, text: "My father ___ (work) in a bank.", options: ["works", "work", "working", "worked"], correct: 0, explanation: "Singular 'my father' takes 'works'." },
          { id: 13, text: "Cats ___ (hate) water.", options: ["hate", "hates", "hating", "hated"], correct: 0, explanation: "Plural subject 'cats' takes 'hate'." },
          { id: 14, text: "She ___ (go) to bed late.", options: ["goes", "go", "going", "went"], correct: 0, explanation: "Verbs ending in -o add '-es'." },
          { id: 15, text: "I ___ (have) two brothers.", options: ["have", "has", "having", "had"], correct: 0, explanation: "Subject 'I' takes 'have'." },
          { id: 16, text: "He ___ (has) a nice car.", options: ["has", "have", "haves", "had"], correct: 0, explanation: "'have' changes to 'has' for third person singular." },
          { id: 17, text: "___ (do) the classes start at 8 AM?", options: ["Do", "Does", "Are", "Is"], correct: 0, explanation: "Plural 'classes' takes 'Do'." },
          { id: 18, text: "We ___ (live) in a small town.", options: ["live", "lives", "living", "lived"], correct: 0, explanation: "Subject 'we' takes 'live'." },
          { id: 19, text: "She does not ___ (know) the answer.", options: ["know", "knows", "knowing", "knew"], correct: 0, explanation: "Base form after does not." },
          { id: 20, text: "The earth ___ (go) around the sun.", options: ["goes", "go", "going", "went"], correct: 0, explanation: "General truth: singular subject takes 'goes'." }
        ],
        scrambled: [
          { id: 1, words: ["every", "goes", "he", "gym", "to", "day", "the"], answer: "he goes to the gym every day", explanation: "Subject + verb + place + time expression." },
          { id: 2, words: ["like", "not", "I", "do", "cold", "milk"], answer: "I do not like cold milk", explanation: "Subject + auxiliary + not + verb + object." },
          { id: 3, words: ["she", "where", "does", "live", "?"], answer: "where does she live", explanation: "Question word + auxiliary + subject + verb." },
          { id: 4, words: ["rises", "sun", "the", "in", "east", "the"], answer: "the sun rises in the east", explanation: "Subject + verb + place prepositional phrase." },
          { id: 5, words: ["speak", "do", "English", "they", "?"], answer: "do they speak English", explanation: "Auxiliary + subject + verb + object." },
          { id: 6, words: ["studies", "my", "sister", "a", "lot"], answer: "my sister studies a lot", explanation: "Subject + verb + modifier." },
          { id: 7, words: ["he", "coffee", "drink", "not", "does"], answer: "he does not drink coffee", explanation: "Subject + auxiliary + not + verb + object." },
          { id: 8, words: ["you", "do", "near", "here", "live", "?"], answer: "do you live near here", explanation: "Auxiliary + subject + verb + place." },
          { id: 9, words: ["boils", "water", "100", "at", "degrees"], answer: "water boils at 100 degrees", explanation: "Subject + verb + prepositional phrase." },
          { id: 10, words: ["in", "they", "live", "Tashkent"], answer: "they live in Tashkent", explanation: "Subject + verb + place." },
          { id: 11, words: ["play", "on", "football", "they", "do", "Sundays", "?"], answer: "do they play football on Sundays", explanation: "Auxiliary + subject + verb + object + time." },
          { id: 12, words: ["always", "does", "her", "she", "homework"], answer: "she always does her homework", explanation: "Subject + frequency adverb + verb + object." },
          { id: 13, words: ["a", "have", "we", "car", "not", "do"], answer: "we do not have a car", explanation: "Subject + auxiliary + not + verb + object." },
          { id: 14, words: ["hard", "works", "every", "he", "day"], answer: "he works hard every day", explanation: "Subject + verb + adverb + time." },
          { id: 15, words: ["what", "does", "train", "the", "leave", "time", "?"], answer: "what time does the train leave", explanation: "Question phrase + auxiliary + subject + verb." },
          { id: 16, words: ["get", "up", "usually", "I", "6", "at", "AM"], answer: "I usually get up at 6 AM", explanation: "Subject + frequency adverb + verb + prepositional phrase." },
          { id: 17, words: ["drink", "not", "she", "does", "tea"], answer: "she does not drink tea", explanation: "Subject + auxiliary + not + verb + object." },
          { id: 18, words: ["snow", "does", "it", "here", "?"], answer: "does it snow here", explanation: "Auxiliary + subject + verb + place." },
          { id: 19, words: ["my", "friend", "pictures", "draws", "nice"], answer: "my friend draws nice pictures", explanation: "Subject + verb + adjective-noun object." },
          { id: 20, words: ["never", "they", "late", "arrive"], answer: "they never arrive late", explanation: "Subject + frequency adverb + verb + adverb." }
        ],
        errorCorrection: [
          { id: 1, text: "He work in a bank.", options: ["He", "work", "in a", "bank"], correct: 1, wrongPart: "work", correction: "works", explanation: "Singular subject 'he' requires 'works' (adds -s)." },
          { id: 2, text: "I does not like tea.", options: ["I", "does not", "like", "tea"], correct: 1, wrongPart: "does not", correction: "do not", explanation: "Subject 'I' uses 'do not' (don't)." },
          { id: 3, text: "Does she lives in London?", options: ["Does", "she", "lives", "in London"], correct: 2, wrongPart: "lives", correction: "live", explanation: "After does, use base verb form 'live' without -s." },
          { id: 4, text: "They goes to school by bus.", options: ["They", "goes", "to school", "by bus"], correct: 1, wrongPart: "goes", correction: "go", explanation: "Plural subject 'they' takes base form 'go'." },
          { id: 5, text: "Water boil at 100 degrees.", options: ["Water", "boil", "at 100", "degrees"], correct: 1, wrongPart: "boil", correction: "boils", explanation: "Countable/uncountable facts take singular verb: 'boils'." },
          { id: 6, text: "My sister study history.", options: ["My sister", "study", "history", "No error"], correct: 1, wrongPart: "study", correction: "studies", explanation: "Singular subject takes 'studies' (-y changes to -ies)." },
          { id: 7, text: "We doesn't have a dog.", options: ["We", "doesn't", "have", "a dog"], correct: 1, wrongPart: "doesn't", correction: "don't", explanation: "Plural subject 'we' takes 'don't'." },
          { id: 8, text: "Do he play video games?", options: ["Do", "he", "play", "video games"], correct: 0, wrongPart: "Do", correction: "Does", explanation: "Singular subject 'he' starts question with 'Does'." },
          { id: 9, text: "The sun rise in the east.", options: ["The sun", "rise", "in the", "east"], correct: 1, wrongPart: "rise", correction: "rises", explanation: "Singular subject 'the sun' takes 'rises'." },
          { id: 10, text: "She watch TV every night.", options: ["She", "watch", "TV", "every night"], correct: 1, wrongPart: "watch", correction: "watches", explanation: "Verbs ending in -ch add '-es': 'watches'." },
          { id: 11, text: "They don't likes onions.", options: ["They", "don't", "likes", "onions"], correct: 2, wrongPart: "likes", correction: "like", explanation: "Use base form 'like' after don't." },
          { id: 12, text: "Where do she work?", options: ["Where", "do", "she", "work"], correct: 1, wrongPart: "do", correction: "does", explanation: "Singular subject 'she' takes auxiliary 'does'." },
          { id: 13, text: "I am live in Tashkent.", options: ["I", "am live", "in", "Tashkent"], correct: 1, wrongPart: "am live", correction: "live", explanation: "Do not use 'am' with action verbs in Present Simple: 'I live'." },
          { id: 14, text: "He does his homework always.", options: ["He", "does", "his homework", "always"], correct: 3, wrongPart: "always", correction: "always does", explanation: "Adverbs of frequency go before the main verb." },
          { id: 15, text: "The train leave at 8 AM.", options: ["The train", "leave", "at 8", "AM"], correct: 1, wrongPart: "leave", correction: "leaves", explanation: "Singular 'the train' takes 'leaves'." },
          { id: 16, text: "Do they has any children?", options: ["Do", "they", "has", "any children"], correct: 2, wrongPart: "has", correction: "have", explanation: "Question form uses base verb 'have'." },
          { id: 17, text: "She teachs French.", options: ["She", "teachs", "French", "No error"], correct: 1, wrongPart: "teachs", correction: "teaches", explanation: "Verbs ending in -ch add '-es': 'teaches'." },
          { id: 18, text: "We plays tennis together.", options: ["We", "plays", "tennis", "together"], correct: 1, wrongPart: "plays", correction: "play", explanation: "Plural 'we' takes base form 'play'." },
          { id: 19, text: "He don't know my phone number.", options: ["He", "don't", "know", "my number"], correct: 1, wrongPart: "don't", correction: "doesn't", explanation: "Singular subject 'he' takes 'doesn't'." },
          { id: 20, text: "The earth go around the sun.", options: ["The earth", "go", "around", "the sun"], correct: 1, wrongPart: "go", correction: "goes", explanation: "Singular 'the earth' takes 'goes'." }
        ],
        transform: [
          { id: 1, text: "Make negative: 'He lives in Tashkent.'", options: ["He not lives in Tashkent.", "He doesn't live in Tashkent.", "He doesn't lives in Tashkent.", "He don't live in Tashkent."], correct: 1, explanation: "Use doesn't + base verb: 'He doesn't live in Tashkent'." },
          { id: 2, text: "Make question: 'She works hard.'", options: ["Does she works hard?", "Do she work hard?", "Does she work hard?", "Works she hard?"], correct: 2, explanation: "Use Does + subject + base verb: 'Does she work hard?'." },
          { id: 3, text: "Transform to negative: 'They play football.'", options: ["They don't play football.", "They doesn't play football.", "They don't plays football.", "They not play football."], correct: 0, explanation: "Plural subject uses don't: 'They don't play football'." },
          { id: 4, text: "Make question: 'You speak French.'", options: ["Do you speak French?", "Does you speak French?", "Do you speaks French?", "Speak you French?"], correct: 0, explanation: "Use Do + subject + base verb: 'Do you speak French?'." },
          { id: 5, text: "Transform to negative: 'I drink coffee.'", options: ["I doesn't drink coffee.", "I don't drink coffee.", "I am not drink coffee.", "I not drink coffee."], correct: 1, explanation: "Use don't + base verb: 'I don't drink coffee'." },
          { id: 6, text: "Make question: 'It rains a lot here.'", options: ["Does it rain a lot here?", "Do it rain a lot here?", "Does it rains a lot here?", "Is it rain a lot here?"], correct: 0, explanation: "Use Does + subject + base verb: 'Does it rain a lot here?'." },
          { id: 7, text: "Transform to negative: 'My sister studies law.'", options: ["My sister doesn't study law.", "My sister doesn't studies law.", "My sister don't study law.", "My sister not studies law."], correct: 0, explanation: "Use doesn't + base verb: 'My sister doesn't study law'." },
          { id: 8, text: "Make question: 'They want some tea.'", options: ["Do they want some tea?", "Does they want some tea?", "Do they wants some tea?", "Want they some tea?"], correct: 0, explanation: "Use Do + subject + base verb: 'Do they want some tea?'." },
          { id: 9, text: "Transform to negative: 'We live here.'", options: ["We doesn't live here.", "We don't live here.", "We not live here.", "We don't lives here."], correct: 1, explanation: "Use don't + base verb: 'We don't live here'." },
          { id: 10, text: "Make question: 'He reads books.'", options: ["Does he reads books?", "Does he read books?", "Do he read books?", "Reads he books?"], correct: 1, explanation: "Use Does + subject + base verb: 'Does he read books?'." },
          { id: 11, text: "Transform to negative: 'Water boils at 90 degrees.'", options: ["Water doesn't boil at 90 degrees.", "Water doesn't boils at 90 degrees.", "Water don't boil at 90 degrees.", "Water not boils at 90 degrees."], correct: 0, explanation: "Use doesn't + base verb: 'Water doesn't boil at 90 degrees'." },
          { id: 12, text: "Make question: 'You need a pen.'", options: ["Do you need a pen?", "Does you need a pen?", "Do you needs a pen?", "Need you a pen?"], correct: 0, explanation: "Use Do + subject + base verb: 'Do you need a pen?'." },
          { id: 13, text: "Transform to negative: 'The train leaves at 5.'", options: ["The train doesn't leave at 5.", "The train doesn't leaves at 5.", "The train don't leave at 5.", "The train not leaves at 5."], correct: 0, explanation: "Use doesn't + base verb: 'The train doesn't leave at 5'." },
          { id: 14, text: "Make question: 'She washes her hair every day.'", options: ["Does she wash her hair every day?", "Does she washes her hair every day?", "Do she wash her hair every day?", "Washes she her hair every day?"], correct: 0, explanation: "Use Does + subject + base verb: 'Does she wash her hair every day?'." },
          { id: 15, text: "Transform to negative: 'My parents work in Samarkand.'", options: ["My parents don't work in Samarkand.", "My parents doesn't work in Samarkand.", "My parents don't works in Samarkand.", "My parents not work in Samarkand."], correct: 0, explanation: "Plural subject uses don't: 'My parents don't work in Samarkand'." },
          { id: 16, text: "Make question: 'The shop opens early.'", options: ["Does the shop open early?", "Does the shop opens early?", "Do the shop open early?", "Opens the shop early?"], correct: 0, explanation: "Use Does + subject + base verb: 'Does the shop open early?'." },
          { id: 17, text: "Transform to negative: 'I watch comedies.'", options: ["I don't watch comedies.", "I doesn't watch comedies.", "I am not watch comedies.", "I not watch comedies."], correct: 0, explanation: "Use don't + base verb: 'I don't watch comedies'." },
          { id: 18, text: "Make question: 'They speak German.'", options: ["Do they speak German?", "Does they speak German?", "Do they speaks German?", "Speak they German?"], correct: 0, explanation: "Use Do + subject + base verb: 'Do they speak German?'." },
          { id: 19, text: "Transform to negative: 'It snows in April.'", options: ["It doesn't snow in April.", "It doesn't snows in April.", "It don't snow in April.", "It not snows in April."], correct: 0, explanation: "Use doesn't + base verb: 'It doesn't snow in April'." },
          { id: 20, text: "Make question: 'We have homework.'", options: ["Do we have homework?", "Does we have homework?", "Do we has homework?", "Have we homework?"], correct: 0, explanation: "Use Do + subject + base verb: 'Do we have homework?'." }
        ],
        dialogue: [
          { id: 1, situation: "Talking about daily routines.", dialogue: "A: What time do you wake up?\nB: I usually ___ up at 7 AM.", options: ["get", "gets", "getting", "got"], correct: 0, explanation: "I + get (base form)." },
          { id: 2, situation: "Asking about language skills.", dialogue: "A: Does your brother speak English?\nB: Yes, he ___ English very well.", options: ["speaks", "speak", "speaking", "spoke"], correct: 0, explanation: "He + speaks (adds -s)." },
          { id: 3, situation: "Meeting a new person.", dialogue: "A: Where do you live?\nB: I ___ in Tashkent.", options: ["live", "lives", "living", "lived"], correct: 0, explanation: "I + live (base form)." },
          { id: 4, situation: "Asking about someone's job.", dialogue: "A: What does your mother do?\nB: She ___ in a school.", options: ["works", "work", "working", "worked"], correct: 0, explanation: "She + works (adds -s)." },
          { id: 5, situation: "Discussing transport.", dialogue: "A: How do they go to work?\nB: They usually ___ the subway.", options: ["take", "takes", "taking", "took"], correct: 0, explanation: "They + take (base form)." },
          { id: 6, situation: "Asking about likes and dislikes.", dialogue: "A: Do you like tea?\nB: No, I ___ like tea. I prefer coffee.", options: ["don't", "doesn't", "aren't", "not"], correct: 0, explanation: "I + don't (do not) for negative." },
          { id: 7, situation: "Talking about a sibling.", dialogue: "A: Does he play football?\nB: No, he ___ play football. He plays tennis.", options: ["doesn't", "don't", "isn't", "not"], correct: 0, explanation: "He + doesn't (does not) for negative." },
          { id: 8, situation: "Inquiring about shop hours.", dialogue: "A: When ___ the supermarkets open here?\nB: Usually at 8 AM.", options: ["do", "does", "are", "is"], correct: 0, explanation: "Plural 'supermarkets' takes auxiliary 'do'." },
          { id: 9, situation: "Discussing weekends.", dialogue: "A: What do you do on weekends?\nB: We often ___ a movie together.", options: ["watch", "watches", "watching", "watched"], correct: 0, explanation: "We + watch (base form)." },
          { id: 10, situation: "Asking about the weather.", dialogue: "A: Does it rain much in summer?\nB: No, it rarely ___ in summer.", options: ["rains", "rain", "running", "rained"], correct: 0, explanation: "It + rains (adds -s)." },
          { id: 11, situation: "Asking about a dog.", dialogue: "A: Does your dog bark at guests?\nB: No, it ___ bark at anyone.", options: ["doesn't", "don't", "isn't", "not"], correct: 0, explanation: "It + doesn't." },
          { id: 12, situation: "Talking about study schedules.", dialogue: "A: When do you study?\nB: I always ___ in the afternoon.", options: ["study", "studies", "studying", "studied"], correct: 0, explanation: "I + study." },
          { id: 13, situation: "Discussing parent occupations.", dialogue: "A: Where do your parents work?\nB: They ___ in a hospital.", options: ["work", "works", "working", "worked"], correct: 0, explanation: "They + work." },
          { id: 14, situation: "Asking about a train timetable.", dialogue: "A: What time ___ the last train arrive?\nB: At midnight.", options: ["does", "do", "is", "are"], correct: 0, explanation: "Singular 'train' takes 'does'." },
          { id: 15, situation: "Discussing sports habits.", dialogue: "A: Does your friend play tennis?\nB: Yes, she ___ every Sunday.", options: ["plays", "play", "playing", "played"], correct: 0, explanation: "She + plays." },
          { id: 16, situation: "Talking about a favorite meal.", dialogue: "A: Do you eat breakfast?\nB: Yes, I always ___ eggs.", options: ["eat", "eats", "eating", "ate"], correct: 0, explanation: "I + eat." },
          { id: 17, situation: "Discussing cleaning duties.", dialogue: "A: Who washes the dishes?\nB: My brother always ___ them.", options: ["washes", "wash", "washs", "washing"], correct: 0, explanation: "Singular subject 'my brother' takes 'washes'." },
          { id: 18, situation: "Talking about a cat.", dialogue: "A: Where does your cat sleep?\nB: It usually ___ on my bed.", options: ["sleeps", "sleep", "sleeping", "slept"], correct: 0, explanation: "It + sleeps." },
          { id: 19, situation: "Talking about university study.", dialogue: "A: Does John study history?\nB: No, he ___ computer science.", options: ["studies", "study", "studying", "studyed"], correct: 0, explanation: "He + studies." },
          { id: 20, situation: "Chatting about travel.", dialogue: "A: How often do they travel?\nB: They ___ abroad every year.", options: ["go", "goes", "going", "went"], correct: 0, explanation: "They + go." }
        ]
      },
      {
        id: "past-simple",
        title: "Past Simple",
        icon: "⏳",
        guide: `## Past Simple (Oddiy o'tgan zamon)

Past Simple o'tmishda sodir bo'lgan va to'liq yakunlangan ish-harakatlar hamda holatlarni ifodalash uchun ishlatiladi.

## 1. Shakllanishi (Form)
Past Simple da fe'llar ikki turga bo'linadi: **To'g'ri (Regular)** va **Noto'g'ri (Irregular)** fe'llar.

• **Positive (+)**:
  - To'g'ri fe'llarga **-ed** qo'shimchasi qo'shiladi:
    - I/You/He/She/It/We/They **watched** a movie yesterday.
  - Noto'g'ri fe'llarning o'tgan zamon shakli (V2) ishlatiladi:
    - I/You/He/She/It/We/They **went** to London last year. (go -> went)
• **Negative (-)**: Subject + did not (didn't) + Verb (asosiy shakli)
  - I **didn't watch** the game. (Inkor gapda fe'lning asil shakliga qaytiladi!)
  - He **didn't go** home. (didn't went emas!)
• **Question (?)**: Did + Subject + Verb (asosiy shakli)?
  - **Did you watch** the news?
  - **Did they go** to school?

## 2. To'g'ri fe'llar uchun imlo qoidalari (-ed)
• Ko'pgina fe'llarga shunchaki **-ed** qo'shiladi:
  - work -> worked, play -> played, start -> started
• Fe'l **-e** harfi bilan tugasa, faqat **-d** qo'shiladi:
  - live -> lived, like -> liked, love -> loved
• Fe'l undosh + **-y** bilan tugasa, **-y** harfi **-i** ga o'zgaradi va **-ed** qo'shiladi:
  - study -> studied, try -> tried, cry -> cried
• Fe'l bir bo'g'inli bo'lib, oxiri unli + undosh bilan tugasa, oxirgi undosh ikkilanadi:
  - stop -> stopped, plan -> planned

## 3. Ishlatilishi (Usage)
1. **O'tmishda yakunlangan aniq harakatlar**:
   - I finished my work two hours ago. (Men ishimni ikki soat oldin tugatdim)
2. **O'tmishdagi ketma-ket sodir bo'lgan harakatlar (Stories)**:
   - He woke up, had breakfast, and left the house.
3. **O'tmishdagi doimiy holat yoki odatlar**:
   - When I was a child, we lived in Samarkand.

## 4. Signal so'zlar (Time Expressions)
• yesterday (kecha)
• ago (oldin): two days ago (ikki kun oldin), a year ago (bir yil oldin)
• last (o'tgan): last night (o'tgan kecha), last week (o'tgan hafta), last year (o'tgan yili)
• in + o'tgan yil: in 2020, in 1998.`,
        questions: [
          { id: 1, text: "I ___ a great movie yesterday.", options: ["watch", "watched", "watching", "watches"], correct: 1, explanation: "Time word 'yesterday' requires Past Simple: 'watched'." },
          { id: 2, text: "They ___ to the park last Sunday.", options: ["go", "went", "going", "goes"], correct: 1, explanation: "Past Simple of irregular verb 'go' is 'went'." },
          { id: 3, text: "Did you ___ your homework?", options: ["finish", "finished", "finishing", "finishes"], correct: 0, explanation: "After did/didn't, use the base verb form: 'finish'." },
          { id: 4, text: "She ___ not study for the test.", options: ["do", "does", "did", "is"], correct: 2, explanation: "Past negation uses 'did not' (didn't)." },
          { id: 5, text: "We ___ in London in 2018.", options: ["live", "lived", "living", "lives"], correct: 1, explanation: "Completed action in a past year uses Past Simple: 'lived'." },
          { id: 6, text: "He ___ a new car two days ago.", options: ["buy", "bought", "buyed", "buying"], correct: 1, explanation: "Past Simple of irregular verb 'buy' is 'bought'." },
          { id: 7, text: "___ they arrive on time last night?", options: ["Do", "Does", "Did", "Were"], correct: 2, explanation: "Past simple question starts with auxiliary 'Did'." },
          { id: 8, text: "I didn't ___ him at school yesterday.", options: ["see", "saw", "seeing", "seen"], correct: 0, explanation: "After didn't, use the base verb form: 'see'." },
          { id: 9, text: "The rain ___ an hour ago.", options: ["stop", "stopped", "stopping", "stops"], correct: 1, explanation: "Double consonant for stop: 'stopped'." },
          { id: 10, text: "My mother ___ a delicious cake last night.", options: ["make", "made", "maked", "making"], correct: 1, explanation: "Past Simple of irregular verb 'make' is 'made'." },
          { id: 11, text: "What time ___ you wake up this morning?", options: ["do", "does", "did", "were"], correct: 2, explanation: "Past simple questions use auxiliary 'did'." },
          { id: 12, text: "She ___ to go to the party.", options: ["decide", "decided", "decides", "deciding"], correct: 1, explanation: "Regular past verb 'decided' (ends in -e, add -d)." },
          { id: 13, text: "We ___ very happy to see them.", options: ["are", "was", "were", "been"], correct: 2, explanation: "Past tense of 'be' for 'we' is 'were'." },
          { id: 14, text: "He ___ his keys this morning.", options: ["lose", "lost", "losed", "losing"], correct: 1, explanation: "Past Simple of irregular verb 'lose' is 'lost'." },
          { id: 15, text: "They didn't ___ any pictures.", options: ["take", "took", "taking", "taken"], correct: 0, explanation: "Use base verb after did not: 'take'." },
          { id: 16, text: "I ___ a letter to my granddad last week.", options: ["write", "wrote", "written", "writing"], correct: 1, explanation: "Past Simple of irregular verb 'write' is 'wrote'." },
          { id: 17, text: "___ it snow last winter?", options: ["Did", "Does", "Do", "Was"], correct: 0, explanation: "Question form starts with 'Did' for action verbs." },
          { id: 18, text: "My friend ___ me with my project.", options: ["help", "helped", "helps", "helping"], correct: 1, explanation: "Regular verb past tense: 'helped'." },
          { id: 19, text: "We ___ a nice hotel during our trip.", options: ["find", "found", "finded", "finding"], correct: 1, explanation: "Past Simple of irregular verb 'find' is 'found'." },
          { id: 20, text: "He ___ late for the meeting yesterday.", options: ["is", "was", "were", "be"], correct: 1, explanation: "Past tense of 'be' for singular 'he' is 'was'." }
        ],
        fillBlanks: [
          { id: 1, text: "She ___ (cook) pasta last night.", options: ["cooked", "cook", "cooking", "cooks"], correct: 0, explanation: "Regular verb adds '-ed'." },
          { id: 2, text: "We did not ___ (go) to the beach yesterday.", options: ["go", "went", "going", "goes"], correct: 0, explanation: "Use base form after did not." },
          { id: 3, text: "___ (did) you read the book last week?", options: ["Did", "Do", "Does", "Were"], correct: 0, explanation: "Past simple question starts with Did." },
          { id: 4, text: "He ___ (give) me a present yesterday.", options: ["gave", "give", "given", "gives"], correct: 0, explanation: "Past tense of irregular 'give' is 'gave'." },
          { id: 5, text: "The train ___ (arrive) late last night.", options: ["arrived", "arrive", "arriving", "arrives"], correct: 0, explanation: "Regular verb ending in -e adds '-d'." },
          { id: 6, text: "They did not ___ (eat) anything.", options: ["eat", "ate", "eating", "eats"], correct: 0, explanation: "Use base form after did not." },
          { id: 7, text: "___ (did) she call you this morning?", options: ["Did", "Does", "Do", "Was"], correct: 0, explanation: "Past simple question starts with Did." },
          { id: 8, text: "He ___ (carry) the heavy bag.", options: ["carried", "carry", "carrying", "carries"], correct: 0, explanation: "Consonant + y changes to -ied: 'carried'." },
          { id: 9, text: "We ___ (see) an interesting bird.", options: ["saw", "see", "seen", "seeing"], correct: 0, explanation: "Past simple of irregular 'see' is 'saw'." },
          { id: 10, text: "I did not ___ (know) the answer.", options: ["know", "knew", "knowing", "knows"], correct: 0, explanation: "Base form after did not." },
          { id: 11, text: "___ (did) it rain yesterday?", options: ["Did", "Does", "Do", "Was"], correct: 0, explanation: "Past simple question starts with Did." },
          { id: 12, text: "She ___ (write) a nice poem.", options: ["wrote", "write", "written", "writing"], correct: 0, explanation: "Past simple of irregular 'write' is 'wrote'." },
          { id: 13, text: "We ___ (buy) some fresh fruit.", options: ["bought", "buy", "buying", "buys"], correct: 0, explanation: "Past simple of irregular 'buy' is 'bought'." },
          { id: 14, text: "He ___ (run) very fast in the race.", options: ["ran", "run", "running", "runs"], correct: 0, explanation: "Past simple of irregular 'run' is 'ran'." },
          { id: 15, text: "I ___ (have) a cat when I was young.", options: ["had", "have", "having", "has"], correct: 0, explanation: "Past simple of 'have' is 'had'." },
          { id: 16, text: "The class ___ (begin) at 9 AM yesterday.", options: ["began", "begin", "begun", "begins"], correct: 0, explanation: "Past simple of irregular 'begin' is 'began'." },
          { id: 17, text: "___ (did) they buy a new house last year?", options: ["Did", "Do", "Does", "Were"], correct: 0, explanation: "Past simple question starts with Did." },
          { id: 18, text: "We ___ (leave) the party early.", options: ["left", "leave", "leaving", "leaves"], correct: 0, explanation: "Past simple of irregular 'leave' is 'left'." },
          { id: 19, text: "She did not ___ (understand) the lesson.", options: ["understand", "understood", "understanding", "understands"], correct: 0, explanation: "Base form after did not." },
          { id: 20, text: "The window ___ (break) yesterday.", options: ["broke", "break", "broken", "breaks"], correct: 0, explanation: "Past simple of irregular 'break' is 'broke'." }
        ],
        scrambled: [
          { id: 1, words: ["yesterday", "went", "he", "cinema", "to", "the"], answer: "he went to the cinema yesterday", explanation: "Subject + verb + place + time expression." },
          { id: 2, words: ["like", "not", "I", "did", "the", "soup"], answer: "I did not like the soup", explanation: "Subject + auxiliary + not + verb + object." },
          { id: 3, words: ["she", "where", "did", "go", "?"], answer: "where did she go", explanation: "Question word + auxiliary + subject + verb." },
          { id: 4, words: ["bought", "we", "car", "a", "year", "last"], answer: "we bought a car last year", explanation: "Subject + verb + object + time." },
          { id: 5, words: ["arrive", "did", "they", "time", "on", "?"], answer: "did they arrive on time", explanation: "Auxiliary + subject + verb + prepositional phrase." },
          { id: 6, words: ["studied", "my", "sister", "hard", "yesterday"], answer: "my sister studied hard yesterday", explanation: "Subject + verb + adverb + time." },
          { id: 7, words: ["he", "call", "not", "did", "me"], answer: "he did not call me", explanation: "Subject + auxiliary + not + verb + object." },
          { id: 8, words: ["you", "did", "near", "here", "live", "?"], answer: "did you live near here", explanation: "Auxiliary + subject + verb + place." },
          { id: 9, words: ["stopped", "rain", "the", "hour", "an", "ago"], answer: "the rain stopped an hour ago", explanation: "Subject + verb + time phrase." },
          { id: 10, words: ["last", "they", "saw", "him", "night"], answer: "they saw him last night", explanation: "Subject + verb + object + time." },
          { id: 11, words: ["play", "on", "did", "they", "Sunday", "tennis", "?"], answer: "did they play tennis on Sunday", explanation: "Auxiliary + subject + verb + object + time." },
          { id: 12, words: ["lost", "her", "she", "bag", "yesterday"], answer: "she lost her bag yesterday", explanation: "Subject + verb + object + time." },
          { id: 13, words: ["a", "have", "we", "dog", "not", "did"], answer: "we did not have a dog", explanation: "Subject + auxiliary + not + verb + object." },
          { id: 14, words: ["hard", "worked", "every", "he", "day"], answer: "he worked hard every day", explanation: "Subject + verb + adverb + time." },
          { id: 15, words: ["what", "did", "train", "the", "leave", "time", "?"], answer: "what time did the train leave", explanation: "Question phrase + auxiliary + subject + verb." },
          { id: 16, words: ["got", "up", "early", "I", "yesterday"], answer: "I got up early yesterday", explanation: "Subject + verb + adverb + time." },
          { id: 17, words: ["drink", "not", "she", "did", "coffee"], answer: "she did not drink coffee", explanation: "Subject + auxiliary + not + verb + object." },
          { id: 18, words: ["snow", "did", "it", "yesterday", "?"], answer: "did it snow yesterday", explanation: "Auxiliary + subject + verb + time." },
          { id: 19, words: ["my", "friend", "wrote", "a", "letter", "last", "week"], answer: "my friend wrote a letter last week", explanation: "Subject + verb + object + time." },
          { id: 20, words: ["arrived", "they", "late", "for", "class"], answer: "they arrived late for class", explanation: "Subject + verb + modifier." }
        ],
        errorCorrection: [
          { id: 1, text: "He workt in a bank last year.", options: ["He", "workt", "in a", "bank"], correct: 1, wrongPart: "workt", correction: "worked", explanation: "Spelling of regular past is 'worked' (with -ed)." },
          { id: 2, text: "I does not like the movie yesterday.", options: ["I", "does not", "like", "yesterday"], correct: 1, wrongPart: "does not", correction: "did not", explanation: "Past negation requires 'did not'." },
          { id: 3, text: "Did she went to London last week?", options: ["Did", "she", "went", "last week"], correct: 2, wrongPart: "went", correction: "go", explanation: "After Did, use base form 'go' instead of V2 'went'." },
          { id: 4, text: "They buyed a new car yesterday.", options: ["They", "buyed", "a new", "yesterday"], correct: 1, wrongPart: "buyed", correction: "bought", explanation: "Past of buy is irregular 'bought'." },
          { id: 5, text: "The rain stoped an hour ago.", options: ["The", "stoped", "an hour", "ago"], correct: 1, wrongPart: "stoped", correction: "stopped", explanation: "Oxiri unli+undosh bo'lgani uchun undosh ikkilanadi: 'stopped'." },
          { id: 6, text: "My sister studyed history last year.", options: ["My sister", "studyed", "history", "last year"], correct: 1, wrongPart: "studyed", correction: "studied", explanation: "Consonant + y changes to -ied: 'studied'." },
          { id: 7, text: "We didn't had a dog in 2020.", options: ["We", "didn't", "had", "a dog"], correct: 2, wrongPart: "had", correction: "have", explanation: "After didn't, use base verb form 'have'." },
          { id: 8, text: "Do he play football yesterday?", options: ["Do", "he", "play", "yesterday"], correct: 0, wrongPart: "Do", correction: "Did", explanation: "Past simple question begins with 'Did'." },
          { id: 9, text: "The sun rised early today.", options: ["The sun", "rised", "early", "today"], correct: 1, wrongPart: "rised", correction: "rose", explanation: "Past of rise is irregular 'rose'." },
          { id: 10, text: "She seed me at the market yesterday.", options: ["She", "seed", "me at", "yesterday"], correct: 1, wrongPart: "seed", correction: "saw", explanation: "Past of see is irregular 'saw'." },
          { id: 11, text: "They didn't liked the dinner.", options: ["They", "didn't", "liked", "the dinner"], correct: 2, wrongPart: "liked", correction: "like", explanation: "After didn't, use base verb 'like'." },
          { id: 12, text: "Where did she worked last year?", options: ["Where", "did", "she", "worked"], correct: 3, wrongPart: "worked", correction: "work", explanation: "After did, use base verb 'work'." },
          { id: 13, text: "I were at home yesterday evening.", options: ["I", "were", "at home", "yesterday"], correct: 1, wrongPart: "were", correction: "was", explanation: "Past of 'be' for 'I' is 'was'." },
          { id: 14, text: "He maked a mistake in the test.", options: ["He", "maked", "a mistake", "in the test"], correct: 1, wrongPart: "maked", correction: "made", explanation: "Past of make is irregular 'made'." },
          { id: 15, text: "The train lefted at 8 AM yesterday.", options: ["The train", "lefted", "at 8 AM", "yesterday"], correct: 1, wrongPart: "lefted", correction: "left", explanation: "Past of leave is 'left' (no extra -ed)." },
          { id: 16, text: "Did they had any questions?", options: ["Did", "they", "had", "any questions"], correct: 2, wrongPart: "had", correction: "have", explanation: "Question form uses base verb 'have'." },
          { id: 17, text: "She runned to catch the bus.", options: ["She", "runned", "to catch", "the bus"], correct: 1, wrongPart: "runned", correction: "ran", explanation: "Past of run is irregular 'ran'." },
          { id: 18, text: "We was very tired yesterday.", options: ["We", "was", "very tired", "yesterday"], correct: 1, wrongPart: "was", correction: "were", explanation: "Plural subject 'we' takes 'were'." },
          { id: 19, text: "He didn't knew the way home.", options: ["He", "didn't", "knew", "the way"], correct: 2, wrongPart: "knew", correction: "know", explanation: "After didn't, use base verb 'know'." },
          { id: 20, text: "The glass breaked when it fell.", options: ["The glass", "breaked", "when", "it fell"], correct: 1, wrongPart: "breaked", correction: "broke", explanation: "Past of break is irregular 'broke'." }
        ],
        transform: [
          { id: 1, text: "Make negative: 'He lived in London.'", options: ["He not lived in London.", "He didn't live in London.", "He didn't lived in London.", "He don't live in London."], correct: 1, explanation: "Use didn't + base verb: 'He didn't live in London'." },
          { id: 2, text: "Make question: 'She worked hard.'", options: ["Does she worked hard?", "Did she work hard?", "Did she worked hard?", "Worked she hard?"], correct: 1, explanation: "Use Did + subject + base verb: 'Did she work hard?'." },
          { id: 3, text: "Transform to negative: 'They bought a house.'", options: ["They don't buy a house.", "They didn't buy a house.", "They didn't bought a house.", "They not buy a house."], correct: 1, explanation: "Use didn't + base verb: 'They didn't buy a house'." },
          { id: 4, text: "Make question: 'You spoke to him.'", options: ["Did you speak to him?", "Did you spoke to him?", "Do you speak to him?", "Spoke you to him?"], correct: 0, explanation: "Use Did + subject + base verb: 'Did you speak to him?'." },
          { id: 5, text: "Transform to negative: 'I ran a mile.'", options: ["I didn't ran a mile.", "I didn't run a mile.", "I don't run a mile.", "I not run a mile."], correct: 1, explanation: "Use didn't + base verb: 'I didn't run a mile'." },
          { id: 6, text: "Make question: 'It rained yesterday.'", options: ["Did it rain yesterday?", "Did it rained yesterday?", "Does it rain yesterday?", "Is it rain yesterday?"], correct: 0, explanation: "Use Did + subject + base verb: 'Did it rain yesterday?'." },
          { id: 7, text: "Transform to negative: 'My sister studied law.'", options: ["My sister didn't study law.", "My sister didn't studied law.", "My sister don't study law.", "My sister not studied law."], correct: 0, explanation: "Use didn't + base verb: 'My sister didn't study law'." },
          { id: 8, text: "Make question: 'They wanted some tea.'", options: ["Did they want some tea?", "Did they wanted some tea?", "Do they want some tea?", "Wanted they some tea?"], correct: 0, explanation: "Use Did + subject + base verb: 'Did they want some tea?'." },
          { id: 9, text: "Transform to negative: 'We left early.'", options: ["We don't leave early.", "We didn't leave early.", "We not leave early.", "We didn't left early."], correct: 1, explanation: "Use didn't + base verb: 'We didn't leave early'." },
          { id: 10, text: "Make question: 'He read books.'", options: ["Did he reads books?", "Did he read books?", "Do he read books?", "Read he books?"], correct: 1, explanation: "Use Did + subject + base verb: 'Did he read books?'." },
          { id: 11, text: "Transform to negative: 'Water boiled.'", options: ["Water didn't boil.", "Water didn't boiled.", "Water don't boil.", "Water not boiled."], correct: 0, explanation: "Use didn't + base verb: 'Water didn't boil'." },
          { id: 12, text: "Make question: 'You saw a doctor.'", options: ["Did you see a doctor?", "Did you saw a doctor?", "Do you see a doctor?", "Saw you a doctor?"], correct: 0, explanation: "Use Did + subject + base verb: 'Did you see a doctor?'." },
          { id: 13, text: "Transform to negative: 'The train left at 5.'", options: ["The train didn't leave at 5.", "The train didn't left at 5.", "The train don't leave at 5.", "The train not left at 5."], correct: 0, explanation: "Use didn't + base verb: 'The train didn't leave at 5'." },
          { id: 14, text: "Make question: 'She washed her hair.'", options: ["Did she wash her hair?", "Did she washed her hair?", "Does she wash her hair?", "Washed she her hair?"], correct: 0, explanation: "Use Did + subject + base verb: 'Did she wash her hair?'." },
          { id: 15, text: "Transform to negative: 'My parents worked yesterday.'", options: ["My parents don't work yesterday.", "My parents didn't work yesterday.", "My parents didn't worked yesterday.", "My parents not work yesterday."], correct: 1, explanation: "Use didn't + base verb: 'My parents didn't work yesterday'." },
          { id: 16, text: "Make question: 'The shop opened early.'", options: ["Did the shop open early?", "Did the shop opened early?", "Does the shop open early?", "Opened the shop early?"], correct: 0, explanation: "Use Did + subject + base verb: 'Did the shop open early?'." },
          { id: 17, text: "Transform to negative: 'I watched a show.'", options: ["I didn't watch a show.", "I didn't watched a show.", "I don't watch a show.", "I not watch a show."], correct: 0, explanation: "Use didn't + base verb: 'I didn't watch a show'." },
          { id: 18, text: "Make question: 'They spoke German.'", options: ["Did they speak German?", "Did they spoke German?", "Do they speak German?", "Spoke they German?"], correct: 0, explanation: "Use Did + subject + base verb: 'Did they speak German?'." },
          { id: 19, text: "Transform to negative: 'It snowed in April.'", options: ["It didn't snow in April.", "It didn't snowed in April.", "It don't snow in April.", "It not snowed in April."], correct: 0, explanation: "Use didn't + base verb: 'It didn't snow in April'." },
          { id: 20, text: "Make question: 'We had homework.'", options: ["Did we have homework?", "Did we had homework?", "Do we have homework?", "Had we homework?"], correct: 0, explanation: "Use Did + subject + base verb: 'Did we have homework?'." }
        ],
        dialogue: [
          { id: 1, situation: "Talking about the weekend.", dialogue: "A: What did you do on Saturday?\nB: I ___ tennis with my friend.", options: ["played", "play", "playing", "plays"], correct: 0, explanation: "I + played (past form)." },
          { id: 2, situation: "Asking about someone's trip.", dialogue: "A: Did you enjoy your vacation?\nB: Yes, we ___ a great time.", options: ["had", "have", "having", "has"], correct: 0, explanation: "We + had (past of have)." },
          { id: 3, situation: "Asking about food.", dialogue: "A: Did you eat lunch?\nB: Yes, I ___ a sandwich.", options: ["ate", "eat", "eating", "eats"], correct: 0, explanation: "I + ate (past of eat)." },
          { id: 4, situation: "Asking about an event.", dialogue: "A: What time did the concert start?\nB: It ___ at 8 PM.", options: ["started", "start", "starting", "starts"], correct: 0, explanation: "It + started." },
          { id: 5, situation: "Discussing a book.", dialogue: "A: Did you like the novel?\nB: No, I ___ like it. It was boring.", options: ["didn't", "don't", "haven't", "not"], correct: 0, explanation: "I + didn't (did not) for past negative." },
          { id: 6, situation: "Inquiring about someone's health.", dialogue: "A: Where were you yesterday?\nB: I ___ sick, so I stayed at home.", options: ["was", "were", "am", "be"], correct: 0, explanation: "I + was (past of be)." },
          { id: 7, situation: "Asking about transportation.", dialogue: "A: Did they catch the bus?\nB: No, they ___ it. They took a taxi.", options: ["missed", "miss", "missing", "misses"], correct: 0, explanation: "They + missed." },
          { id: 8, situation: "Asking about a phone call.", dialogue: "A: Did she call you last night?\nB: Yes, she ___ me around 9 PM.", options: ["called", "call", "calling", "calls"], correct: 0, explanation: "She + called." },
          { id: 9, situation: "Discussing shopping.", dialogue: "A: What did you buy at the mall?\nB: I ___ a new jacket.", options: ["bought", "buy", "buying", "buys"], correct: 0, explanation: "I + bought." },
          { id: 10, situation: "Asking about the weather.", dialogue: "A: Did it rain last night?\nB: Yes, it ___ heavily.", options: ["rained", "rain", "running", "rains"], correct: 0, explanation: "It + rained." },
          { id: 11, situation: "Meeting a colleague.", dialogue: "A: Why were you late this morning?\nB: I ___ my alarm clock.", options: ["missed", "miss", "missing", "misses"], correct: 0, explanation: "I + missed." },
          { id: 12, situation: "Talking about university.", dialogue: "A: Did you study French in college?\nB: No, I ___ Spanish.", options: ["studied", "study", "studying", "studies"], correct: 0, explanation: "I + studied." },
          { id: 13, situation: "Asking about parents.", dialogue: "A: Where did your parents meet?\nB: They ___ in Samarkand in 1995.", options: ["met", "meet", "meeting", "meets"], correct: 0, explanation: "They + met." },
          { id: 14, situation: "Inquiring about class end.", dialogue: "A: When did the class finish?\nB: It ___ ten minutes ago.", options: ["finished", "finish", "finishing", "finishes"], correct: 0, explanation: "It + finished." },
          { id: 15, situation: "Discussing a movie.", dialogue: "A: Did you watch the match?\nB: No, I ___ asleep before it started.", options: ["fell", "fall", "falling", "falls"], correct: 0, explanation: "I + fell (past of fall)." },
          { id: 16, situation: "Asking about yesterday.", dialogue: "A: Did you go to work yesterday?\nB: No, it ___ a holiday.", options: ["was", "were", "is", "be"], correct: 0, explanation: "It + was." },
          { id: 17, situation: "Discussing an email.", dialogue: "A: Did you send the report?\nB: Yes, I ___ it this morning.", options: ["sent", "send", "sending", "sends"], correct: 0, explanation: "I + sent (past of send)." },
          { id: 18, situation: "Talking about keys.", dialogue: "A: Where did you leave your keys?\nB: I ___ them on the table.", options: ["left", "leave", "leaving", "leaves"], correct: 0, explanation: "I + left." },
          { id: 19, situation: "Talking about news.", dialogue: "A: Did you hear the news?\nB: Yes, my brother ___ me.", options: ["told", "tell", "telling", "tells"], correct: 0, explanation: "My brother + told (past of tell)." },
          { id: 20, situation: "Chatting about childhood.", dialogue: "A: Did you live in a village?\nB: Yes, we ___ a big farm there.", options: ["had", "have", "having", "has"], correct: 0, explanation: "We + had." }
        ]
      },
      {
        id: 'past-continuous',
        title: 'Past Continuous',
        icon: '🌙',
        guide: `## Past Continuous (O'tgan davomli zamon)

Past Continuous o'tmishdagi muayyan bir vaqtda davom etayotgan harakatni yoki bir harakat davom etayotganda sodir bo'lgan boshqa (qisqa) harakatni ifodalash uchun ishlatiladi.

## 1. Shakllanishi (Form)
Gaplar quyidagicha tuziladi:
• **Positive (+)**: Subject + was / were + Verb-ing
  - I **was watching** TV at 8 PM.
  - They **were playing** football yesterday.
• **Negative (-)**: Subject + was / were + not + Verb-ing
  - She **wasn't listening** to the teacher.
  - We **weren't sleeping** at midnight.
• **Question (?)**: Was / Were + Subject + Verb-ing?
  - **Was he working** at that time?
  - **What were you doing** last night?

I/He/She/It -> **was**; You/We/They -> **were** (Present Continuous dagi am/is/are ning o'tgan zamondagi shakli).

## 2. Ishlatilishi (Usage)
1. **O'tmishdagi muayyan vaqtda davom etayotgan harakat**:
   - At 9 PM yesterday, I was doing my homework.
2. **Uzoq davom etayotgan harakat va uni bo'lib o'tgan qisqa harakat (Past Simple)**:
   - I **was cooking** dinner **when** the phone **rang**. (Uzun harakat: Past Continuous, qisqa harakat: Past Simple)
   - **While** she **was reading**, her brother **came** in.
3. **Bir vaqtning o'zida davom etgan ikkita harakat (parallel actions)**:
   - **While** I **was studying**, my sister **was watching** TV.
4. **Voqea yoki hikoyaning fonini (background) tasvirlash uchun**:
   - The sun was shining and the birds were singing.

## 3. While va When farqi
• **While** + Past Continuous (uzoq davom etgan harakat bilan ishlatiladi):
  - While I was walking home, it started to rain.
• **When** + Past Simple (qisqa, to'satdan sodir bo'lgan harakat bilan ishlatiladi):
  - I was walking home when it started to rain.

## 4. Davomli zamonda ishlatilmaydigan fe'llar (Stative Verbs)
His-tuyg'u, fikrlash va egalikni bildiruvchi fe'llar Past Continuous da emas, Past Simple da ishlatiladi:
• like, love, want, know, believe, have (egalik ma'nosida).
  - I **liked** the movie. (emas: I was liking...)

## 5. Signal so'zlar (Time Expressions)
• while (harakat davom etayotganda)
• when (to'satdan sodir bo'lgan harakat)
• at that moment, at that time
• at 8 o'clock yesterday, all day yesterday, the whole morning`,
        questions: [
          { id: 1, text: 'I ___ TV when you called.', options: ['watch', 'was watching', 'were watching', 'am watching'], correct: 1, explanation: 'Subject "I" takes "was" in Past Continuous: "was watching".' },
          { id: 2, text: 'They ___ football at 5 PM yesterday.', options: ['play', 'was playing', 'were playing', 'plays'], correct: 2, explanation: 'Plural subject "they" takes "were": "were playing".' },
          { id: 3, text: 'She ___ not listening when I spoke.', options: ['was', 'were', 'is', 'does'], correct: 0, explanation: 'Singular subject "she" takes "was".' },
          { id: 4, text: '___ you sleeping at midnight?', options: ['Was', 'Were', 'Did', 'Do'], correct: 1, explanation: 'Subject "you" takes "were" in Past Continuous questions.' },
          { id: 5, text: 'While I ___ dinner, the phone rang.', options: ['cook', 'was cooking', 'were cooking', 'cooked'], correct: 1, explanation: 'The long background action uses Past Continuous: "was cooking".' },
          { id: 6, text: 'It ___ raining when we left the house.', options: ['was', 'were', 'is', 'did'], correct: 0, explanation: 'Subject "it" takes "was".' },
          { id: 7, text: 'We ___ walking in the park at that moment.', options: ['was', 'were', 'are', 'did'], correct: 1, explanation: 'Plural subject "we" takes "were".' },
          { id: 8, text: 'He ___ his homework at 7 PM yesterday.', options: ['do', 'did', 'was doing', 'were doing'], correct: 2, explanation: 'A specific past moment needs Past Continuous: "was doing".' },
          { id: 9, text: '___ they watching a movie last night at nine?', options: ['Was', 'Were', 'Did', 'Do'], correct: 1, explanation: 'Plural subject "they" takes "were" in questions.' },
          { id: 10, text: 'I was reading a book while she ___ cooking.', options: ['was', 'were', 'is', 'did'], correct: 0, explanation: 'Parallel past action, subject "she" takes "was".' },
          { id: 11, text: 'The children ___ playing in the garden all afternoon.', options: ['was', 'were', 'is', 'are'], correct: 1, explanation: 'Plural subject "the children" takes "were".' },
          { id: 12, text: "What ___ you doing at 10 o'clock last night?", options: ['was', 'were', 'did', 'do'], correct: 1, explanation: 'Subject "you" takes "were" in Past Continuous questions.' },
          { id: 13, text: 'She ___ crying when I saw her.', options: ['was', 'were', 'is', 'did'], correct: 0, explanation: 'Singular subject "she" takes "was".' },
          { id: 14, text: 'They ___ not studying, they were sleeping.', options: ['was', 'were', 'are', 'did'], correct: 1, explanation: 'Plural subject "they" takes "were".' },
          { id: 15, text: 'While he was driving, his phone ___.', options: ['rang', 'was ringing', 'ring', 'rings'], correct: 0, explanation: 'The short interrupting action uses Past Simple: "rang".' },
          { id: 16, text: 'I ___ working when the lights went out.', options: ['was', 'were', 'am', 'did'], correct: 0, explanation: 'Subject "I" takes "was".' },
          { id: 17, text: 'My parents ___ having dinner when I arrived.', options: ['was', 'were', 'is', 'are'], correct: 1, explanation: 'Plural subject "my parents" takes "were".' },
          { id: 18, text: 'Was it ___ when you woke up?', options: ['snow', 'snowing', 'snowed', 'snows'], correct: 1, explanation: 'After "was", use Verb-ing: "snowing".' },
          { id: 19, text: 'We were not ___ attention during the lesson.', options: ['pay', 'paying', 'payed', 'pays'], correct: 1, explanation: 'Continuous negative needs Verb-ing: "paying".' },
          { id: 20, text: '___ she talking on the phone when you entered?', options: ['Was', 'Were', 'Did', 'Do'], correct: 0, explanation: 'Singular subject "she" takes "was" in questions.' }
        ],
        fillBlanks: [
          { id: 1, text: 'I was ___ (write) a letter when she came in.', options: ['writing', 'writeing', 'write', 'wrote'], correct: 0, explanation: 'Drop "e" in write before adding "-ing": "writing".' },
          { id: 2, text: 'They were ___ (play) football at 5 PM.', options: ['playing', 'play', 'plaied', 'plays'], correct: 0, explanation: 'Simply add "-ing" to play.' },
          { id: 3, text: '___ (was) he sleeping when you called?', options: ['Was', 'Were', 'Is', 'Did'], correct: 0, explanation: 'Singular subject "he" takes "Was".' },
          { id: 4, text: 'She was not ___ (listen) to music.', options: ['listening', 'listen', 'listenning', 'listens'], correct: 0, explanation: 'Simply add "-ing" to listen.' },
          { id: 5, text: 'We were ___ (sit) in the garden all evening.', options: ['sitting', 'siting', 'sit', 'sits'], correct: 0, explanation: 'Double the consonant: "sitting".' },
          { id: 6, text: 'The baby was ___ (cry) at midnight.', options: ['crying', 'cryed', 'cries', 'cry'], correct: 0, explanation: 'Simply add "-ing" to cry.' },
          { id: 7, text: '___ (were) you waiting for the bus?', options: ['Were', 'Was', 'Did', 'Do'], correct: 0, explanation: 'Subject "you" takes "Were".' },
          { id: 8, text: 'He was ___ (make) dinner when I arrived.', options: ['making', 'makeing', 'make', 'makes'], correct: 0, explanation: 'Drop "e" in make before adding "-ing": "making".' },
          { id: 9, text: 'I was ___ (run) when it started to rain.', options: ['running', 'runing', 'run', 'runs'], correct: 0, explanation: 'Double the consonant: "running".' },
          { id: 10, text: 'They were not ___ (study) at that time.', options: ['studying', 'studing', 'study', 'studies'], correct: 0, explanation: 'Simply add "-ing" to study.' },
          { id: 11, text: 'She was ___ (drive) to work when it happened.', options: ['driving', 'driveing', 'drive', 'drives'], correct: 0, explanation: 'Drop "e" in drive before adding "-ing": "driving".' },
          { id: 12, text: '___ (was) it raining this morning?', options: ['Was', 'Were', 'Is', 'Does'], correct: 0, explanation: 'Subject "it" takes "Was".' },
          { id: 13, text: 'We were ___ (have) lunch at noon.', options: ['having', 'haveing', 'have', 'has'], correct: 0, explanation: 'Drop "e" in have before adding "-ing": "having".' },
          { id: 14, text: 'He was ___ (write) an email when the power went out.', options: ['writing', 'writeing', 'write', 'writes'], correct: 0, explanation: 'Drop "e" in write before adding "-ing": "writing".' },
          { id: 15, text: 'I was not ___ (sleep) when you texted.', options: ['sleeping', 'sleepping', 'sleep', 'sleeps'], correct: 0, explanation: 'Simply add "-ing" to sleep.' },
          { id: 16, text: 'The children were ___ (swim) in the lake.', options: ['swimming', 'swiming', 'swim', 'swims'], correct: 0, explanation: 'Double the consonant: "swimming".' },
          { id: 17, text: '___ (was) she cooking dinner at 6?', options: ['Was', 'Were', 'Is', 'Does'], correct: 0, explanation: 'Singular subject "she" takes "Was".' },
          { id: 18, text: 'They were ___ (watch) TV all night.', options: ['watching', 'watchhing', 'watch', 'watches'], correct: 0, explanation: 'Simply add "-ing" to watch.' },
          { id: 19, text: 'My father was ___ (fix) the car when I got home.', options: ['fixing', 'fixxing', 'fix', 'fixes'], correct: 0, explanation: 'Simply add "-ing" to fix.' },
          { id: 20, text: 'We were ___ (talk) about you yesterday.', options: ['talking', 'talkking', 'talk', 'talks'], correct: 0, explanation: 'Simply add "-ing" to talk.' }
        ],
        scrambled: [
          { id: 1, words: ['was', 'I', 'a', 'book', 'reading'], answer: 'I was reading a book', explanation: 'Subject + was + verb-ing + object.' },
          { id: 2, words: ['were', 'they', 'football', 'playing'], answer: 'they were playing football', explanation: 'Subject + were + verb-ing + object.' },
          { id: 3, words: ['was', 'what', 'doing', 'she', '?'], answer: 'what was she doing', explanation: 'Question word + was + subject + verb-ing.' },
          { id: 4, words: ['were', 'not', 'we', 'sleeping'], answer: 'we were not sleeping', explanation: 'Subject + were + not + verb-ing.' },
          { id: 5, words: ['it', 'raining', 'was', 'hard'], answer: 'it was raining hard', explanation: 'Subject + was + verb-ing + adverb.' },
          { id: 6, words: ['was', 'driving', 'he', 'car', 'a'], answer: 'he was driving a car', explanation: 'Subject + was + verb-ing + object.' },
          { id: 7, words: ['were', 'listening', 'you', 'music', 'to', '?'], answer: 'were you listening to music', explanation: 'Were + subject + verb-ing + preposition + object.' },
          { id: 8, words: ['was', 'not', 'I', 'working', 'yesterday'], answer: 'I was not working yesterday', explanation: 'Subject + was + not + verb-ing + time.' },
          { id: 9, words: ['were', 'having', 'we', 'dinner', 'at', 'seven'], answer: 'we were having dinner at seven', explanation: 'Subject + were + verb-ing + object + time.' },
          { id: 10, words: ['was', 'sleeping', 'baby', 'the', 'bedroom', 'in', 'the'], answer: 'the baby was sleeping in the bedroom', explanation: 'Subject + was + sleeping + prepositional phrase.' },
          { id: 11, words: ['were', 'coming', 'they', 'when', '?'], answer: 'when were they coming', explanation: 'When + were + subject + verb-ing.' },
          { id: 12, words: ['was', 'running', 'dog', 'the', 'park', 'in', 'the'], answer: 'the dog was running in the park', explanation: 'Subject + was + running + prepositional phrase.' },
          { id: 13, words: ['was', 'not', 'she', 'working', 'today'], answer: 'she was not working today', explanation: 'Subject + was + not + working + today.' },
          { id: 14, words: ['was', 'writing', 'he', 'letter', 'a'], answer: 'he was writing a letter', explanation: 'Subject + was + writing + object.' },
          { id: 15, words: ['were', 'you', 'looking', 'why', 'at', 'me', '?'], answer: 'why were you looking at me', explanation: 'Why + were + subject + looking + preposition + object.' },
          { id: 16, words: ['were', 'making', 'they', 'a', 'cake'], answer: 'they were making a cake', explanation: 'Subject + were + making + object.' },
          { id: 17, words: ['was', 'waiting', 'for', 'who', 'she', '?'], answer: 'who was she waiting for', explanation: 'Question word + was + subject + waiting + preposition.' },
          { id: 18, words: ['were', 'reading', 'books', 'we', 'library', 'in', 'the'], answer: 'we were reading books in the library', explanation: 'Subject + were + reading + object + prepositional phrase.' },
          { id: 19, words: ['was', 'cooking', 'mother', 'my', 'dinner'], answer: 'my mother was cooking dinner', explanation: 'Subject + was + cooking + object.' },
          { id: 20, words: ['were', 'playing', 'the', 'children', 'outside'], answer: 'the children were playing outside', explanation: 'Subject + were + playing + adverb.' }
        ],
        errorCorrection: [
          { id: 1, text: 'I were watching TV last night.', options: ['I', 'were', 'watching TV', 'last night'], correct: 1, wrongPart: 'were', correction: 'was', explanation: 'Subject "I" takes "was", not "were".' },
          { id: 2, text: 'She were sleeping when I called.', options: ['She', 'were', 'sleeping', 'when I called'], correct: 1, wrongPart: 'were', correction: 'was', explanation: 'Singular subject "she" takes "was".' },
          { id: 3, text: 'They was playing in the yard.', options: ['They', 'was', 'playing', 'in the yard'], correct: 1, wrongPart: 'was', correction: 'were', explanation: 'Plural subject "they" takes "were".' },
          { id: 4, text: 'We was having dinner at 8.', options: ['We', 'was', 'having dinner', 'at 8'], correct: 1, wrongPart: 'was', correction: 'were', explanation: 'Plural subject "we" takes "were".' },
          { id: 5, text: 'He was writeing a letter.', options: ['He', 'was', 'writeing', 'a letter'], correct: 2, wrongPart: 'writeing', correction: 'writing', explanation: 'Drop "e" in write before adding "-ing": "writing".' },
          { id: 6, text: 'I was runing when it started to rain.', options: ['I', 'was', 'runing', 'when it started to rain'], correct: 2, wrongPart: 'runing', correction: 'running', explanation: 'Double the consonant: "running".' },
          { id: 7, text: 'Was you sleeping at midnight?', options: ['Was', 'you', 'sleeping', 'at midnight'], correct: 0, wrongPart: 'Was', correction: 'Were', explanation: 'Subject "you" takes "were": "Were you sleeping?".' },
          { id: 8, text: 'What did you doing at 9 PM?', options: ['What', 'did you', 'doing', 'at 9 PM'], correct: 1, wrongPart: 'did you', correction: 'were you', explanation: 'Past Continuous questions use "were", not "did": "What were you doing?".' },
          { id: 9, text: 'The children was playing outside.', options: ['The children', 'was', 'playing', 'outside'], correct: 1, wrongPart: 'was', correction: 'were', explanation: 'Plural subject "the children" takes "were".' },
          { id: 10, text: 'She was not listen to music.', options: ['She', 'was not', 'listen', 'to music'], correct: 2, wrongPart: 'listen', correction: 'listening', explanation: 'Continuous form requires Verb-ing: "listening".' },
          { id: 11, text: 'I not was sleeping when you texted.', options: ['I', 'not was', 'sleeping', 'when you texted'], correct: 1, wrongPart: 'not was', correction: 'was not', explanation: 'Negative word order is "was not", not "not was".' },
          { id: 12, text: 'They were makeing a cake.', options: ['They', 'were', 'makeing', 'a cake'], correct: 2, wrongPart: 'makeing', correction: 'making', explanation: 'Drop "e" in make before adding "-ing": "making".' },
          { id: 13, text: 'While I was cook, the phone rang.', options: ['While I was', 'cook', 'the phone', 'rang'], correct: 1, wrongPart: 'cook', correction: 'cooking', explanation: 'Continuous form requires Verb-ing: "cooking".' },
          { id: 14, text: 'We were sit in the room.', options: ['We', 'were', 'sit', 'in the room'], correct: 2, wrongPart: 'sit', correction: 'sitting', explanation: 'Double the consonant and add "-ing": "sitting".' },
          { id: 15, text: 'It were raining all day yesterday.', options: ['It', 'were', 'raining', 'all day yesterday'], correct: 1, wrongPart: 'were', correction: 'was', explanation: 'Subject "it" takes "was".' },
          { id: 16, text: 'He was writting an email.', options: ['He', 'was', 'writting', 'an email'], correct: 2, wrongPart: 'writting', correction: 'writing', explanation: 'Only one "t": "writing", not "writting".' },
          { id: 17, text: 'Were she waiting for the bus?', options: ['Were', 'she', 'waiting', 'for the bus'], correct: 0, wrongPart: 'Were', correction: 'Was', explanation: 'Singular subject "she" takes "was": "Was she waiting?".' },
          { id: 18, text: 'My parents was having lunch.', options: ['My parents', 'was', 'having', 'lunch'], correct: 1, wrongPart: 'was', correction: 'were', explanation: 'Plural subject "my parents" takes "were".' },
          { id: 19, text: 'I was liking the movie.', options: ['I', 'was liking', 'the movie', 'No error'], correct: 1, wrongPart: 'was liking', correction: 'liked', explanation: 'Stative verb "like" is not used in continuous form; use Past Simple: "I liked the movie".' },
          { id: 20, text: 'Did they were sleeping when you arrived?', options: ['Did they were', 'sleeping', 'when', 'you arrived'], correct: 0, wrongPart: 'Did they were', correction: 'Were they', explanation: 'Past Continuous questions start with "Were", not "Did ... were": "Were they sleeping?".' }
        ],
        transform: [
          { id: 1, text: 'Make negative: "I was watching TV."', options: ["I not was watching TV.", "I was not watching TV.", "I don't was watching TV.", "I wasn't watch TV."], correct: 1, explanation: 'Add "not" after "was": "I was not watching TV".' },
          { id: 2, text: 'Make question: "She was working."', options: ['Was she working?', 'Does she working?', 'Was she work?', 'She was working?'], correct: 0, explanation: 'Move "was" to the front: "Was she working?".' },
          { id: 3, text: 'Transform to Past Continuous: "He writes a book." (at 8 PM yesterday)', options: ['He was writing a book.', 'He is writing a book.', 'He wrote a book.', 'He writing a book.'], correct: 0, explanation: 'Subject + was + verb-ing: "He was writing a book".' },
          { id: 4, text: 'Make negative: "They were playing."', options: ['They were not playing.', "They weren't play.", "They don't playing.", 'They not playing.'], correct: 0, explanation: 'Negative form: "They were not playing".' },
          { id: 5, text: 'Make question: "They were reading."', options: ['Were they reading?', 'Did they reading?', 'They were reading?', 'Were they read?'], correct: 0, explanation: 'Question form: "Were they reading?".' },
          { id: 6, text: 'Transform to Past Continuous: "I do homework." (at that moment)', options: ['I was doing homework.', 'I am doing homework.', 'I did homework.', 'I doing homework.'], correct: 0, explanation: 'Subject + was + verb-ing: "I was doing homework".' },
          { id: 7, text: 'Make negative: "He was driving."', options: ["He doesn't driving.", 'He was driving not.', 'He was not driving.', 'He not driving.'], correct: 2, explanation: 'Add "not" after "was": "He was not driving".' },
          { id: 8, text: 'Make question: "You were listening."', options: ['Were you listening?', 'Did you listening?', 'You were listening?', 'Were you listen?'], correct: 0, explanation: 'Question form: "Were you listening?".' },
          { id: 9, text: 'Transform to Past Continuous: "She eats an apple." (at noon yesterday)', options: ['She was eating an apple.', 'She is eating an apple.', 'She ate an apple.', 'She eating an apple.'], correct: 0, explanation: 'Past Continuous: "She was eating an apple".' },
          { id: 10, text: 'Make negative: "We were leaving."', options: ["We weren't leave.", "We didn't leaving.", 'We not were leaving.', 'We were not leaving.'], correct: 3, explanation: 'Negative form: "We were not leaving".' },
          { id: 11, text: 'Make question: "It was raining."', options: ['Was it raining?', 'Did it raining?', 'It was raining?', 'Was it rain?'], correct: 0, explanation: 'Question form: "Was it raining?".' },
          { id: 12, text: 'Transform to Past Continuous: "They run." (at 5 o\'clock)', options: ['They were running.', 'They was running.', 'They were runing.', 'They run.'], correct: 0, explanation: 'Double the consonant: "They were running".' },
          { id: 13, text: 'Make negative: "I was driving."', options: ['I was not driving.', "I weren't driving.", "I don't driving.", 'I driving not.'], correct: 0, explanation: 'Negative form: "I was not driving".' },
          { id: 14, text: 'Make question: "She was cooking."', options: ['Was she cooking?', 'Did she cooking?', 'She was cooking?', 'Was she cook?'], correct: 0, explanation: 'Question form: "Was she cooking?".' },
          { id: 15, text: 'Transform to Past Continuous: "We have lunch." (at 1 PM)', options: ['We were having lunch.', 'We was having lunch.', 'We were haveing lunch.', 'We were have lunch.'], correct: 0, explanation: 'Drop "e" in have and use "were": "We were having lunch".' },
          { id: 16, text: 'Make negative: "She was sleeping."', options: ["She weren't sleep.", 'She not was sleeping.', 'She was not sleeping.', "She doesn't sleeping."], correct: 2, explanation: 'Negative form: "She was not sleeping".' },
          { id: 17, text: 'Make question: "They were leaving."', options: ['Were they leaving?', 'Did they leaving?', 'They were leaving?', 'Were they leave?'], correct: 0, explanation: 'Question form: "Were they leaving?".' },
          { id: 18, text: 'Transform to Past Continuous: "I wash my car." (at 10 AM)', options: ['I was washing my car.', 'I am washing my car.', 'I washed my car.', 'I washing my car.'], correct: 0, explanation: 'Past Continuous: "I was washing my car".' },
          { id: 19, text: 'Make negative: "It was snowing."', options: ["It weren't snow.", 'It was not snowing.', 'It not was snowing.', "It doesn't snowing."], correct: 1, explanation: 'Negative form: "It was not snowing".' },
          { id: 20, text: 'Make question: "He was speaking."', options: ['Was he speaking?', 'Did he speaking?', 'Was he speak?', 'He was speaking?'], correct: 0, explanation: 'Question form: "Was he speaking?".' }
        ],
        dialogue: [
          { id: 1, situation: 'Talking about last night.', dialogue: 'A: What were you doing at 9 PM?\nB: I ___ dinner.', options: ['was cooking', 'is cooking', 'cooking', 'cook'], correct: 0, explanation: 'Subject "I" takes "was cooking".' },
          { id: 2, situation: 'Discussing an interruption.', dialogue: 'A: What happened when the phone rang?\nB: I ___ a shower.', options: ['was taking', 'am taking', 'take', 'took'], correct: 0, explanation: 'Ongoing background action: "was taking".' },
          { id: 3, situation: 'Talking about the weather yesterday.', dialogue: 'A: Why did you stay inside?\nB: Because it ___ heavily.', options: ['was raining', 'rained', 'rains', 'is raining'], correct: 0, explanation: 'Subject "it" takes "was raining".' },
          { id: 4, situation: 'Asking about a call.', dialogue: "A: Why didn't you answer the phone?\nB: I ___ in the shower.", options: ['was', 'were', 'am', 'is'], correct: 0, explanation: 'Subject "I" takes "was".' },
          { id: 5, situation: 'Discussing a walk.', dialogue: 'A: What were you doing at the park?\nB: We ___ our dog.', options: ['were walking', 'was walking', 'walk', 'walked'], correct: 0, explanation: 'Subject "we" takes "were walking".' },
          { id: 6, situation: 'Talking about an accident.', dialogue: 'A: What was he doing when it happened?\nB: He ___ his bike.', options: ['was riding', 'were riding', 'rides', 'rode'], correct: 0, explanation: 'Subject "he" takes "was riding".' },
          { id: 7, situation: 'Asking about studying.', dialogue: 'A: Why were you tired?\nB: I ___ all night for the exam.', options: ['was studying', 'were studying', 'study', 'studied'], correct: 0, explanation: 'Subject "I" takes "was studying".' },
          { id: 8, situation: 'Discussing a noise.', dialogue: 'A: What was that noise?\nB: The children ___ upstairs.', options: ['were playing', 'was playing', 'play', 'played'], correct: 0, explanation: 'Plural subject "the children" takes "were playing".' },
          { id: 9, situation: 'Talking about cooking.', dialogue: 'A: Was dinner ready?\nB: No, my mother ___ it.', options: ['was still making', 'were still making', 'still makes', 'still made'], correct: 0, explanation: 'Subject "my mother" takes "was still making".' },
          { id: 10, situation: 'Discussing an interruption during work.', dialogue: 'A: What were you doing when the boss called?\nB: I ___ a report.', options: ['was writing', 'were writing', 'write', 'wrote'], correct: 0, explanation: 'Subject "I" takes "was writing".' },
          { id: 11, situation: 'Talking about a trip.', dialogue: 'A: What were they doing at the airport?\nB: They ___ for their flight.', options: ['were waiting', 'was waiting', 'wait', 'waited'], correct: 0, explanation: 'Plural subject "they" takes "were waiting".' },
          { id: 12, situation: 'Discussing a game.', dialogue: "A: Why didn't you hear me?\nB: We ___ video games.", options: ['were playing', 'was playing', 'play', 'played'], correct: 0, explanation: 'Subject "we" takes "were playing".' },
          { id: 13, situation: 'Talking about last summer.', dialogue: 'A: What were you doing every morning?\nB: I ___ in the sea.', options: ['was swimming', 'were swimming', 'swim', 'swam'], correct: 0, explanation: 'Subject "I" takes "was swimming".' },
          { id: 14, situation: 'Discussing a class.', dialogue: 'A: Was the teacher talking when you came in?\nB: Yes, she ___ a new topic.', options: ['was explaining', 'were explaining', 'explains', 'explained'], correct: 0, explanation: 'Subject "she" takes "was explaining".' },
          { id: 15, situation: 'Talking about traffic.', dialogue: 'A: Why were you late?\nB: Cars ___ everywhere in traffic.', options: ['were waiting', 'was waiting', 'wait', 'waited'], correct: 0, explanation: 'Plural subject "cars" takes "were waiting".' },
          { id: 16, situation: 'Discussing an event.', dialogue: 'A: What was happening when you arrived?\nB: Everyone ___ and dancing.', options: ['was singing', 'were singing', 'sing', 'sang'], correct: 0, explanation: 'Subject "everyone" takes "was singing".' },
          { id: 17, situation: 'Talking about a storm.', dialogue: 'A: Was it windy last night?\nB: Yes, the trees ___ hard.', options: ['were shaking', 'was shaking', 'shake', 'shook'], correct: 0, explanation: 'Plural subject "the trees" takes "were shaking".' },
          { id: 18, situation: 'Discussing an emergency.', dialogue: 'A: What were the firemen doing?\nB: They ___ the fire.', options: ['were putting out', 'was putting out', 'put out', 'puts out'], correct: 0, explanation: 'Plural subject "they" takes "were putting out".' },
          { id: 19, situation: 'Talking about a picnic.', dialogue: 'A: What was everyone doing at the picnic?\nB: We ___ sandwiches and talking.', options: ['were eating', 'was eating', 'eat', 'ate'], correct: 0, explanation: 'Subject "we" takes "were eating".' },
          { id: 20, situation: 'Discussing homework.', dialogue: 'A: Why was your room so quiet?\nB: I ___ hard for my test.', options: ['was studying', 'were studying', 'study', 'studied'], correct: 0, explanation: 'Subject "I" takes "was studying".' }
        ]
      },
      {
        id: 'future-simple',
        title: 'Future Simple',
        icon: '🔮',
        guide: `## Future Simple (Oddiy kelasi zamon)

Future Simple kelajakda sodir bo'ladigan harakatlar, bashoratlar, spontan qarorlar, va'dalar va takliflarni ifodalash uchun ishlatiladi.

## 1. Shakllanishi (Form)
• **Positive (+)**: Subject + will + Verb (base form)
  - I **will help** you tomorrow.
  - She **will call** you later.
• **Negative (-)**: Subject + will not (won't) + Verb
  - I **won't be** late.
  - They **won't come** to the party.
• **Question (?)**: Will + Subject + Verb?
  - **Will you help** me?
  - **What will** you **do** tomorrow?

*(Barcha shaxslar uchun bir xil shakl ishlatiladi — will hech qachon o'zgarmaydi: I/You/He/She/It/We/They will...)*

## 2. Ishlatilishi (Usage)
1. **Spontan qarorlar (nutq paytida, o'ylab o'tirmasdan qabul qilingan)**:
   - The phone is ringing. I **will answer** it.
2. **Kelajak haqidagi bashoratlar (dalilsiz, shaxsiy fikr asosida)**:
   - I think it **will rain** tomorrow.
   - I'm sure she **will pass** the exam.
3. **Va'dalar, takliflar va tahdidlar (Promises, offers, threats)**:
   - I **will help** you with your homework. (va'da)
   - **Will** you **carry** this bag for me? (taklif)
4. **Kelajak haqidagi faktlar**:
   - She **will be** 20 years old next year.

## 3. Going to bilan qisqacha farqi
• **Will** — spontan qaror yoki dalilsiz bashorat.
• **Going to** — oldindan rejalashtirilgan qaror yoki aniq dalilga asoslangan bashorat.
  - Look at those clouds! It **is going to** rain. (dalil bor — bulutlar)
  - I think it **will** rain later. (shunchaki shaxsiy fikr)

## 4. Signal so'zlar (Time Expressions)
• tomorrow, next week/month/year, soon, in the future
• I think, I'm sure, probably, perhaps
• someday, one day`,
        questions: [
          { id: 1, text: 'I think it ___ rain tomorrow.', options: ['will', 'is', 'was', 'would'], correct: 0, explanation: 'A prediction based on personal opinion uses "will".' },
          { id: 2, text: '___ you help me carry this bag?', options: ['Will', 'Do', 'Are', 'Did'], correct: 0, explanation: 'Offers are often made with "Will you...?".' },
          { id: 3, text: 'She ___ be 18 next month.', options: ['will', 'is', 'was', 'were'], correct: 0, explanation: 'A future fact uses "will be".' },
          { id: 4, text: 'The phone is ringing. I ___ answer it.', options: ['will', 'am', 'was', 'do'], correct: 0, explanation: 'A spontaneous decision made at the moment of speaking uses "will".' },
          { id: 5, text: "They ___ not come to the party tonight.", options: ['will', 'do', 'are', 'did'], correct: 0, explanation: "Future negative uses 'will not' (won't)." },
          { id: 6, text: 'I ___ help you with your homework, I promise.', options: ['will', 'am', 'do', 'did'], correct: 0, explanation: 'A promise is expressed with "will".' },
          { id: 7, text: 'What time ___ the meeting start?', options: ['will', 'does', 'is', 'did'], correct: 0, explanation: 'A future question uses "will".' },
          { id: 8, text: "I'm sure they ___ win the match.", options: ['will', 'are', 'do', 'did'], correct: 0, explanation: 'A confident prediction uses "will".' },
          { id: 9, text: 'We ___ probably arrive late.', options: ['will', 'are', 'do', 'did'], correct: 0, explanation: 'An uncertain future action uses "will".' },
          { id: 10, text: 'He ___ not be at the office tomorrow.', options: ['will', 'does', 'is', 'did'], correct: 0, explanation: 'Future negative statements use "will not".' },
          { id: 11, text: '___ she call you when she arrives?', options: ['Will', 'Does', 'Is', 'Did'], correct: 0, explanation: 'Future questions start with "Will".' },
          { id: 12, text: 'I ___ be 25 years old next year.', options: ['will', 'am', 'was', 'do'], correct: 0, explanation: 'A future fact uses "will be".' },
          { id: 13, text: "Don't worry, I ___ never tell anyone.", options: ['will', 'am', 'do', 'did'], correct: 0, explanation: 'A promise uses "will".' },
          { id: 14, text: 'I think computers ___ be much faster in ten years.', options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'A prediction about the future uses "will".' },
          { id: 15, text: '___ you marry me?', options: ['Will', 'Do', 'Are', 'Did'], correct: 0, explanation: 'A formal proposal is expressed with "Will".' },
          { id: 16, text: "She ___ not pass the exam if she doesn't study.", options: ['will', 'does', 'is', 'did'], correct: 0, explanation: 'A future consequence uses "will not".' },
          { id: 17, text: 'Perhaps it ___ snow this winter.', options: ['will', 'is', 'was', 'does'], correct: 0, explanation: '"Perhaps" pairs with "will" for an uncertain prediction.' },
          { id: 18, text: 'We ___ meet again someday.', options: ['will', 'are', 'do', 'did'], correct: 0, explanation: 'The time expression "someday" pairs with "will".' },
          { id: 19, text: '___ it be cold tomorrow?', options: ['Will', 'Is', 'Does', 'Did'], correct: 0, explanation: 'Future questions start with "Will".' },
          { id: 20, text: "I ___ not forget your birthday.", options: ['will', 'do', 'am', 'did'], correct: 0, explanation: "A promise's negative form uses 'will not' (won't)." }
        ],
        fillBlanks: [
          { id: 1, text: 'I ___ (help) you tomorrow.', options: ['will help', 'help', 'helps', 'helped'], correct: 0, explanation: 'Future Simple: "will" + base verb.' },
          { id: 2, text: 'She ___ (call) you later.', options: ['will call', 'calls', 'call', 'called'], correct: 0, explanation: 'Future Simple: "will" + base verb.' },
          { id: 3, text: '___ (will) it rain tomorrow?', options: ['Will', 'Do', 'Does', 'Is'], correct: 0, explanation: 'Future questions start with "Will".' },
          { id: 4, text: 'They ___ (not / arrive) on time.', options: ['will not arrive', 'will not arrives', 'do not arrive', 'not will arrive'], correct: 0, explanation: 'Future negative: "will not" + base verb.' },
          { id: 5, text: 'We ___ (visit) our grandparents next weekend.', options: ['will visit', 'visits', 'visit', 'visited'], correct: 0, explanation: 'Future Simple: "will" + base verb.' },
          { id: 6, text: 'He ___ (be) a doctor one day.', options: ['will be', 'is', 'was', 'will is'], correct: 0, explanation: 'Future Simple of "be": "will be".' },
          { id: 7, text: 'I promise I ___ (not / forget) your birthday.', options: ['will not forget', 'will not forgets', 'do not forget', 'not will forget'], correct: 0, explanation: 'Future negative: "will not" + base verb.' },
          { id: 8, text: 'What ___ (you / do) after the exam?', options: ['will you do', 'will you does', 'do you will', 'you will do'], correct: 0, explanation: 'Future question order: "will" + subject + base verb.' },
          { id: 9, text: 'The train ___ (leave) at 6 PM.', options: ['will leave', 'leaves', 'leave', 'left'], correct: 0, explanation: 'Future Simple: "will" + base verb.' },
          { id: 10, text: '___ (they / win) the championship?', options: ['Will they win', 'Do they win', 'Will they wins', 'They will win'], correct: 0, explanation: 'Future question order: "Will" + subject + base verb.' },
          { id: 11, text: 'I ___ (not / be) late again.', options: ['will not be', 'will not is', 'do not be', 'not will be'], correct: 0, explanation: 'Future negative of "be": "will not be".' },
          { id: 12, text: 'She ___ (graduate) next summer.', options: ['will graduate', 'graduates', 'graduate', 'graduated'], correct: 0, explanation: 'Future Simple: "will" + base verb.' },
          { id: 13, text: 'I think it ___ (be) sunny tomorrow.', options: ['will be', 'is', 'was', 'will is'], correct: 0, explanation: 'A future prediction uses "will be".' },
          { id: 14, text: 'We ___ (not / have) enough time.', options: ['will not have', 'will not has', 'do not have', 'not will have'], correct: 0, explanation: 'Future negative: "will not" + base verb.' },
          { id: 15, text: '___ (you / marry) him?', options: ['Will you marry', 'Do you marry', 'Will you marries', 'You will marry'], correct: 0, explanation: 'Future question order: "Will" + subject + base verb.' },
          { id: 16, text: 'My father ___ (retire) next year.', options: ['will retire', 'retires', 'retire', 'retired'], correct: 0, explanation: 'Future Simple: "will" + base verb.' },
          { id: 17, text: 'I ___ (call) you as soon as I arrive.', options: ['will call', 'calls', 'call', 'called'], correct: 0, explanation: 'Future Simple: "will" + base verb.' },
          { id: 18, text: 'They ___ (not / forget) this day.', options: ['will not forget', 'will not forgets', 'do not forget', 'not will forget'], correct: 0, explanation: 'Future negative: "will not" + base verb.' },
          { id: 19, text: '___ (the shop / open) on Sunday?', options: ['Will the shop open', 'Does the shop open', 'Will the shop opens', 'The shop will open'], correct: 0, explanation: 'Future question order: "Will" + subject + base verb.' },
          { id: 20, text: 'One day I ___ (be) famous.', options: ['will be', 'am', 'was', 'will is'], correct: 0, explanation: 'A prediction about the future uses "will be".' }
        ],
        scrambled: [
          { id: 1, words: ['will', 'I', 'you', 'help'], answer: 'I will help you', explanation: 'Subject + will + verb + object.' },
          { id: 2, words: ['tomorrow', 'rain', 'will', 'it'], answer: 'it will rain tomorrow', explanation: 'Subject + will + verb + time.' },
          { id: 3, words: ['will', 'she', 'call', 'you', '?'], answer: 'will she call you', explanation: 'Will + subject + verb + object.' },
          { id: 4, words: ['not', 'will', 'they', 'come'], answer: 'they will not come', explanation: 'Subject + will not + verb.' },
          { id: 5, words: ['carry', 'you', 'will', 'this', 'bag', '?'], answer: 'will you carry this bag', explanation: 'Will + subject + verb + object (an offer).' },
          { id: 6, words: ['be', 'I', 'will', '20', 'next', 'year'], answer: 'I will be 20 next year', explanation: 'Subject + will be + complement + time.' },
          { id: 7, words: ['start', 'will', 'when', 'the', 'meeting', '?'], answer: 'when will the meeting start', explanation: 'Question word + will + subject + verb.' },
          { id: 8, words: ['probably', 'we', 'late', 'will', 'arrive'], answer: 'we will probably arrive late', explanation: 'Subject + will + adverb + verb + adjective.' },
          { id: 9, words: ['not', 'be', 'he', 'will', 'here'], answer: 'he will not be here', explanation: 'Subject + will not be + place.' },
          { id: 10, words: ['win', 'sure', "I'm", 'will', 'they'], answer: "I'm sure they will win", explanation: 'Confidence phrase + subject + will + verb.' },
          { id: 11, words: ['snow', 'perhaps', 'will', 'it'], answer: 'perhaps it will snow', explanation: '"Perhaps" + subject + will + verb.' },
          { id: 12, words: ['someday', 'meet', 'we', 'will', 'again'], answer: 'we will meet again someday', explanation: 'Subject + will + verb + adverb + time.' },
          { id: 13, words: ['cold', 'tomorrow', 'will', 'it', 'be', '?'], answer: 'will it be cold tomorrow', explanation: 'Will + subject + be + adjective + time.' },
          { id: 14, words: ['forget', 'birthday', 'not', 'will', 'I', 'your'], answer: 'I will not forget your birthday', explanation: 'Subject + will not + verb + object.' },
          { id: 15, words: ['answer', 'will', 'it', 'I'], answer: 'I will answer it', explanation: 'Subject + will + verb + object (spontaneous decision).' },
          { id: 16, words: ['pass', 'the', 'exam', 'will', 'she'], answer: 'she will pass the exam', explanation: 'Subject + will + verb + object.' },
          { id: 17, words: ['marry', 'will', 'me', 'you', '?'], answer: 'will you marry me', explanation: 'Will + subject + verb + object (a proposal).' },
          { id: 18, words: ['faster', 'be', 'will', 'computers', 'much'], answer: 'computers will be much faster', explanation: 'Subject + will be + adverb + adjective.' },
          { id: 19, words: ['office', 'not', 'be', 'at', 'will', 'the', 'she'], answer: 'she will not be at the office', explanation: 'Subject + will not be + place.' },
          { id: 20, words: ['open', 'the', 'will', 'shop', 'Sunday', 'on', '?'], answer: 'will the shop open on Sunday', explanation: 'Will + subject + verb + time.' }
        ],
        errorCorrection: [
          { id: 1, text: 'She will goes to the party.', options: ['She', 'will goes', 'to the party', 'No error'], correct: 1, wrongPart: 'will goes', correction: 'will go', explanation: 'After "will", use the base form: "will go", not "will goes".' },
          { id: 2, text: 'I will to help you.', options: ['I', 'will to', 'help you', 'No error'], correct: 1, wrongPart: 'will to', correction: 'will', explanation: '"will" is followed directly by the base verb, with no "to": "will help".' },
          { id: 3, text: 'They wills arrive tomorrow.', options: ['They', 'wills', 'arrive tomorrow', 'No error'], correct: 1, wrongPart: 'wills', correction: 'will', explanation: '"will" never takes "-s", regardless of the subject.' },
          { id: 4, text: 'He will not comes to the meeting.', options: ['He', 'will not', 'comes', 'to the meeting'], correct: 2, wrongPart: 'comes', correction: 'come', explanation: 'After "will not", use the base form: "come".' },
          { id: 5, text: 'You will helping me tomorrow.', options: ['You', 'will', 'helping', 'me tomorrow'], correct: 2, wrongPart: 'helping', correction: 'help', explanation: '"will" is followed by the base verb, not the "-ing" form.' },
          { id: 6, text: 'Will she calls you later?', options: ['Will', 'she', 'calls', 'you later'], correct: 2, wrongPart: 'calls', correction: 'call', explanation: 'After "Will + subject", use the base verb: "call".' },
          { id: 7, text: 'I will going to call you tomorrow.', options: ['I', 'will going to', 'call you', 'tomorrow'], correct: 1, wrongPart: 'will going to', correction: 'will', explanation: 'Do not mix "will" and "going to": just use "will call".' },
          { id: 8, text: 'She go will to university next year.', options: ['She', 'go will', 'to university', 'next year'], correct: 1, wrongPart: 'go will', correction: 'will go', explanation: 'Word order is subject + will + base verb: "will go".' },
          { id: 9, text: 'Do you will help me?', options: ['Do you will', 'help', 'me', 'No error'], correct: 0, wrongPart: 'Do you will', correction: 'Will you', explanation: 'Future questions start with "Will you", not "Do you will".' },
          { id: 10, text: "I don't will forget you.", options: ["I don't will", 'forget', 'you', 'No error'], correct: 0, wrongPart: "I don't will", correction: "I won't", explanation: "The correct future negative is 'won't', not 'don't will'." },
          { id: 11, text: 'What will happens tomorrow?', options: ['What', 'will happens', 'tomorrow', 'No error'], correct: 1, wrongPart: 'will happens', correction: 'will happen', explanation: 'After "will", use the base form: "happen".' },
          { id: 12, text: 'They will not to come.', options: ['They', 'will not to', 'come', 'No error'], correct: 1, wrongPart: 'will not to', correction: 'will not', explanation: 'There is no "to" after "will not": "will not come".' },
          { id: 13, text: 'He will be helps you later.', options: ['He', 'will be', 'helps', 'you later'], correct: 2, wrongPart: 'helps', correction: 'help', explanation: 'Future Simple uses "will" + base verb: the correct form is "will help", not "will be helps".' },
          { id: 14, text: 'Will you be able helping me?', options: ['Will you', 'be able', 'helping', 'me'], correct: 2, wrongPart: 'helping', correction: 'to help', explanation: '"be able" is followed by "to + base verb": "be able to help".' },
          { id: 15, text: 'We will meets you at the station.', options: ['We', 'will meets', 'you', 'at the station'], correct: 1, wrongPart: 'will meets', correction: 'will meet', explanation: 'After "will", use the base form: "meet".' },
          { id: 16, text: 'I will not to forget this day.', options: ['I', 'will not to', 'forget', 'this day'], correct: 1, wrongPart: 'will not to', correction: 'will not', explanation: 'There is no "to" after "will not": "will not forget".' },
          { id: 17, text: 'Will they arrives on time?', options: ['Will', 'they', 'arrives', 'on time'], correct: 2, wrongPart: 'arrives', correction: 'arrive', explanation: 'After "Will + subject", use the base verb: "arrive".' },
          { id: 18, text: 'She will graduates next summer.', options: ['She', 'will graduates', 'next summer', 'No error'], correct: 1, wrongPart: 'will graduates', correction: 'will graduate', explanation: 'After "will", use the base form: "graduate".' },
          { id: 19, text: 'Perhaps it will snows tonight.', options: ['Perhaps', 'it', 'will snows', 'tonight'], correct: 2, wrongPart: 'will snows', correction: 'will snow', explanation: 'After "will", use the base form: "snow".' },
          { id: 20, text: 'My father will retires next year.', options: ['My father', 'will retires', 'next year', 'No error'], correct: 1, wrongPart: 'will retires', correction: 'will retire', explanation: 'After "will", use the base form: "retire".' }
        ],
        transform: [
          { id: 1, text: 'Make negative: "I will help you."', options: ['I will not help you.', 'I not will help you.', "I don't will help you.", "I won't helps you."], correct: 0, explanation: 'Add "not" after "will": "I will not help you".' },
          { id: 2, text: 'Make question: "She will call you."', options: ['Will she call you?', 'Does she will call you?', 'Will she calls you?', 'She will call you?'], correct: 0, explanation: 'Move "will" to the front: "Will she call you?".' },
          { id: 3, text: 'Transform to Future Simple: "It rains a lot." (prediction for next week)', options: ['It will rain a lot.', 'It rains a lot.', 'It is raining a lot.', 'It rained a lot.'], correct: 0, explanation: 'Future Simple: "It will rain a lot".' },
          { id: 4, text: 'Make negative: "They will come to the party."', options: ["They won't come to the party.", "They don't will come to the party.", 'They will not comes to the party.', "They won't comes to the party."], correct: 0, explanation: "The short form 'won't' means 'will not'." },
          { id: 5, text: 'Make question: "You will be at home tonight."', options: ['Will you be at home tonight?', 'Do you will be at home tonight?', 'Will you being at home tonight?', 'You will be at home tonight?'], correct: 0, explanation: 'Move "will" to the front: "Will you be at home tonight?".' },
          { id: 6, text: 'Transform to Future Simple: "He works hard." (prediction)', options: ['He will work hard.', 'He works hard.', 'He is working hard.', 'He worked hard.'], correct: 0, explanation: 'Future Simple: "He will work hard".' },
          { id: 7, text: 'Make negative: "We will be late."', options: ["We won't be late.", "We don't will be late.", 'We will not being late.', "We aren't will be late."], correct: 0, explanation: "The negative form is 'will not' (won't) + base verb." },
          { id: 8, text: 'Make question: "It will snow tomorrow."', options: ['Will it snow tomorrow?', 'Does it will snow tomorrow?', 'Will it snows tomorrow?', 'It will snow tomorrow?'], correct: 0, explanation: 'Move "will" to the front: "Will it snow tomorrow?".' },
          { id: 9, text: 'Transform to Future Simple: "I visit my grandmother." (next weekend)', options: ['I will visit my grandmother.', 'I visit my grandmother.', 'I am visiting my grandmother.', 'I visited my grandmother.'], correct: 0, explanation: 'Future Simple: "I will visit my grandmother".' },
          { id: 10, text: 'Make negative: "She will pass the exam."', options: ["She won't pass the exam.", "She doesn't will pass the exam.", 'She will not passes the exam.', "She isn't will pass the exam."], correct: 0, explanation: "Negative form: 'will not' (won't) + base verb." },
          { id: 11, text: 'Make question: "They will win the match."', options: ['Will they win the match?', 'Do they will win the match?', 'Will they wins the match?', 'They will win the match?'], correct: 0, explanation: 'Move "will" to the front: "Will they win the match?".' },
          { id: 12, text: 'Transform to Future Simple: "The train leaves at 6." (prediction / schedule)', options: ['The train will leave at 6.', 'The train leaves at 6.', 'The train is leaving at 6.', 'The train left at 6.'], correct: 0, explanation: 'Future Simple: "The train will leave at 6".' },
          { id: 13, text: 'Make negative: "I will forget this day."', options: ["I won't forget this day.", "I don't will forget this day.", 'I will not forgets this day.', "I amn't will forget this day."], correct: 0, explanation: "Negative form: 'will not' (won't) + base verb." },
          { id: 14, text: 'Make question: "He will be a doctor."', options: ['Will he be a doctor?', 'Does he will be a doctor?', 'Will he is a doctor?', 'He will be a doctor?'], correct: 0, explanation: 'Move "will" to the front: "Will he be a doctor?".' },
          { id: 15, text: 'Transform to Future Simple: "We meet again." (someday)', options: ['We will meet again.', 'We meet again.', 'We are meeting again.', 'We met again.'], correct: 0, explanation: 'Future Simple: "We will meet again".' },
          { id: 16, text: 'Make negative: "You will need a jacket."', options: ["You won't need a jacket.", "You don't will need a jacket.", 'You will not needs a jacket.', "You aren't will need a jacket."], correct: 0, explanation: "Negative form: 'will not' (won't) + base verb." },
          { id: 17, text: 'Make question: "The shop will open on Sunday."', options: ['Will the shop open on Sunday?', 'Does the shop will open on Sunday?', 'Will the shop opens on Sunday?', 'The shop will open on Sunday?'], correct: 0, explanation: 'Move "will" to the front: "Will the shop open on Sunday?".' },
          { id: 18, text: 'Transform to Future Simple: "My father retires." (next year)', options: ['My father will retire.', 'My father retires.', 'My father is retiring.', 'My father retired.'], correct: 0, explanation: 'Future Simple: "My father will retire".' },
          { id: 19, text: 'Make negative: "It will be cold tomorrow."', options: ["It won't be cold tomorrow.", "It doesn't will be cold tomorrow.", 'It will not being cold tomorrow.', "It isn't will be cold tomorrow."], correct: 0, explanation: "Negative form: 'will not' (won't) + base verb." },
          { id: 20, text: 'Make question: "You will marry him."', options: ['Will you marry him?', 'Do you will marry him?', 'Will you marries him?', 'You will marry him?'], correct: 0, explanation: 'Move "will" to the front: "Will you marry him?".' }
        ],
        dialogue: [
          { id: 1, situation: 'Making a spontaneous decision.', dialogue: "A: The phone is ringing.\nB: I ___ answer it.", options: ['will', 'am', 'do', 'was'], correct: 0, explanation: 'A decision made at the moment of speaking uses "will".' },
          { id: 2, situation: "Talking about tomorrow's weather.", dialogue: "A: What's the weather like tomorrow?\nB: I think it ___ rain.", options: ['will', 'is', 'was', 'does'], correct: 0, explanation: 'A prediction based on opinion uses "will".' },
          { id: 3, situation: 'Making a promise.', dialogue: "A: Can I trust you?\nB: Yes, I ___ never lie to you.", options: ['will', 'am', 'do', 'did'], correct: 0, explanation: 'Promises are expressed with "will".' },
          { id: 4, situation: 'Offering help.', dialogue: 'A: This bag is so heavy.\nB: ___ I carry it for you?', options: ['Will', 'Do', 'Am', 'Did'], correct: 0, explanation: 'Offers are made with "Will I...?" or "Will you...?".' },
          { id: 5, situation: 'Discussing future plans.', dialogue: 'A: Where will you be next year?\nB: I ___ be in London.', options: ['will', 'am', 'was', 'do'], correct: 0, explanation: 'Subject "I" takes "will be".' },
          { id: 6, situation: 'Talking about an exam.', dialogue: 'A: Are you nervous about the test?\nB: A little. I hope I ___ pass it.', options: ['will', 'am', 'do', 'did'], correct: 0, explanation: 'A hope about the future uses "will".' },
          { id: 7, situation: "Discussing a friend's career.", dialogue: 'A: What will she do after university?\nB: She ___ become a teacher.', options: ['will', 'is', 'does', 'was'], correct: 0, explanation: 'Subject "she" takes "will become".' },
          { id: 8, situation: 'Talking about the future of technology.', dialogue: 'A: How will technology change?\nB: Computers ___ become much faster.', options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'A prediction about the future uses "will".' },
          { id: 9, situation: 'Making a joking threat.', dialogue: 'A: You ate my sandwich!\nB: I ___ never forgive you!', options: ['will', 'am', 'do', 'did'], correct: 0, explanation: 'Strong statements about the future use "will".' },
          { id: 10, situation: 'Discussing a meeting time.', dialogue: 'A: What time ___ the meeting start?\nB: At 9 AM.', options: ['will', 'does', 'is', 'did'], correct: 0, explanation: 'Future questions use "will".' },
          { id: 11, situation: 'Talking about the train schedule.', dialogue: 'A: When ___ the train leave?\nB: It will leave at 6 PM.', options: ['will', 'does', 'is', 'did'], correct: 0, explanation: 'Future questions use "will".' },
          { id: 12, situation: 'Talking about marriage plans.', dialogue: 'A: Are you two getting married?\nB: Yes, we ___ get married next spring.', options: ['will', 'are', 'do', 'did'], correct: 0, explanation: 'Subject "we" takes "will get".' },
          { id: 13, situation: 'Discussing the future of the planet.', dialogue: 'A: What do scientists think?\nB: They think the climate ___ change a lot.', options: ['will', 'is', 'does', 'was'], correct: 0, explanation: 'A scientific prediction uses "will".' },
          { id: 14, situation: "Talking about a friend's birthday.", dialogue: 'A: Will you remember my birthday?\nB: Of course, I ___ never forget it.', options: ['will', 'am', 'do', 'did'], correct: 0, explanation: 'Subject "I" takes "will never forget".' },
          { id: 15, situation: 'Asking about a delivery.', dialogue: 'A: When will the package arrive?\nB: It ___ arrive tomorrow.', options: ['will', 'is', 'does', 'was'], correct: 0, explanation: 'Subject "it" takes "will arrive".' },
          { id: 16, situation: 'Discussing retirement.', dialogue: 'A: When does your father retire?\nB: He ___ retire next year.', options: ['will', 'is', 'does', 'was'], correct: 0, explanation: 'Subject "he" takes "will retire".' },
          { id: 17, situation: 'Talking about a football match.', dialogue: "A: Who do you think will win?\nB: I'm sure our team ___ win.", options: ['will', 'is', 'does', 'was'], correct: 0, explanation: 'A confident prediction uses "will".' },
          { id: 18, situation: 'Discussing a house purchase.', dialogue: 'A: Will you buy a new house?\nB: Yes, we ___ buy one next year.', options: ['will', 'are', 'do', 'did'], correct: 0, explanation: 'Subject "we" takes "will buy".' },
          { id: 19, situation: 'Talking about graduation.', dialogue: 'A: When does she graduate?\nB: She ___ graduate in June.', options: ['will', 'is', 'does', 'was'], correct: 0, explanation: 'Subject "she" takes "will graduate".' },
          { id: 20, situation: 'Making a farewell promise.', dialogue: 'A: Will you write to me?\nB: Yes, I ___ write every week.', options: ['will', 'am', 'do', 'did'], correct: 0, explanation: 'Subject "I" takes "will write".' }
        ]
      },
      {
        id: 'future-continuous',
        title: 'Future Continuous',
        icon: '🌠',
        guide: `## Future Continuous (Kelasi davomli zamon)

Future Continuous kelajakda muayyan bir vaqtda davom etib turgan harakatni yoki kelajakdagi rejalashtirilgan, davom etadigan jarayonni ifodalash uchun ishlatiladi.

## 1. Shakllanishi (Form)
• **Positive (+)**: Subject + will be + Verb-ing
  - I **will be sleeping** at 11 PM tonight.
  - They **will be traveling** this time next week.
• **Negative (-)**: Subject + will not (won't) be + Verb-ing
  - She **won't be working** tomorrow.
  - We **won't be waiting** for you.
• **Question (?)**: Will + Subject + be + Verb-ing?
  - **Will you be using** the car tonight?
  - **What will** she **be doing** at 9 AM?

*(Barcha shaxslar uchun bir xil shakl: will be + Verb-ing — will hech qachon o'zgarmaydi)*

## 2. Ishlatilishi (Usage)
1. **Kelajakdagi muayyan vaqtda davom etayotgan harakat**:
   - At 10 PM tomorrow, I **will be sleeping**.
2. **Kelajakda bir vaqtning o'zida davom etadigan ikkita harakat (parallel)**:
   - While I **am cooking**, she **will be setting** the table.
3. **Odobli so'rov (kimningdir kelajakdagi rejasi haqida, uni bezovta qilmasdan)**:
   - **Will** you **be using** the printer this afternoon?
4. **Kelajakda rejalashtirilgan, kutilayotgan jarayon (interruptionsiz)**:
   - This time next year, I **will be studying** at university.

## 3. Future Simple bilan farqi
• **Future Simple (will + base)** — bitta aniq, tugallangan kelajak harakati.
  - I **will call** you tomorrow. (bitta qisqa harakat)
• **Future Continuous (will be + Verb-ing)** — kelajakdagi muayyan vaqtda davom etayotgan jarayon.
  - At 5 PM tomorrow, I **will be traveling** to Samarkand. (o'sha payt davomida sayohat qilyapman)

## 4. Signal so'zlar (Time Expressions)
• at this time tomorrow, at 8 o'clock next Monday
• this time next year/week
• while, at that moment (kelajakka nisbatan)`,
        questions: [
          { id: 1, text: 'At 10 PM tonight, I ___ sleeping.', options: ['will be', 'am', 'was', 'will'], correct: 0, explanation: 'Future Continuous: "will be" + Verb-ing.' },
          { id: 2, text: 'This time tomorrow, we ___ flying to Paris.', options: ['will be', 'are', 'were', 'will'], correct: 0, explanation: 'Future Continuous: "will be" + Verb-ing.' },
          { id: 3, text: '___ you be using the car tonight?', options: ['Will', 'Do', 'Are', 'Did'], correct: 0, explanation: 'A polite future question uses "Will you be...?".' },
          { id: 4, text: 'She ___ not be working at 6 PM.', options: ['will', 'is', 'was', 'does'], correct: 0, explanation: 'Future Continuous negative uses "will not be".' },
          { id: 5, text: 'While I am cooking, she ___ be setting the table.', options: ['will', 'is', 'was', 'does'], correct: 0, explanation: 'Parallel future actions use "will be" + Verb-ing.' },
          { id: 6, text: 'At this time next year, I ___ studying at university.', options: ['will be', 'am', 'was', 'will'], correct: 0, explanation: 'Future Continuous: "will be" + Verb-ing.' },
          { id: 7, text: 'What ___ you be doing at 9 AM tomorrow?', options: ['will', 'do', 'are', 'did'], correct: 0, explanation: 'Future Continuous question: "will" + subject + "be" + Verb-ing.' },
          { id: 8, text: 'They ___ be waiting for us at the airport.', options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'Future Continuous: "will be" + Verb-ing.' },
          { id: 9, text: 'He ___ not be sleeping at midnight; he works nights.', options: ['will', 'is', 'was', 'does'], correct: 0, explanation: 'Future Continuous negative: "will not be".' },
          { id: 10, text: '___ she be attending the conference next week?', options: ['Will', 'Does', 'Is', 'Did'], correct: 0, explanation: 'Future Continuous questions begin with "Will".' },
          { id: 11, text: "At 8 o'clock tomorrow morning, we ___ having breakfast.", options: ['will be', 'are', 'were', 'will'], correct: 0, explanation: 'Future Continuous: "will be" + Verb-ing.' },
          { id: 12, text: 'This time next week, I ___ lying on a beach.', options: ['will be', 'am', 'was', 'will'], correct: 0, explanation: 'Future Continuous: "will be" + Verb-ing.' },
          { id: 13, text: 'The children ___ be sleeping when we arrive.', options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'Future Continuous: "will be" + Verb-ing.' },
          { id: 14, text: '___ you be needing this book tomorrow?', options: ['Will', 'Do', 'Are', 'Did'], correct: 0, explanation: 'Polite future question: "Will you be...?".' },
          { id: 15, text: 'I ___ not be using my laptop this evening, you can borrow it.', options: ['will', 'am', 'was', 'do'], correct: 0, explanation: 'Future Continuous negative: "will not be".' },
          { id: 16, text: 'At noon tomorrow, the plane ___ crossing the ocean.', options: ['will be', 'is', 'was', 'will'], correct: 0, explanation: 'Future Continuous: "will be" + Verb-ing.' },
          { id: 17, text: 'We ___ be discussing the budget at 3 PM.', options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'Future Continuous: "will be" + Verb-ing.' },
          { id: 18, text: 'What ___ they be doing this time next month?', options: ['will', 'do', 'are', 'did'], correct: 0, explanation: 'Future Continuous question: "will" + subject + "be" + Verb-ing.' },
          { id: 19, text: 'She ___ be wearing a red dress at the party.', options: ['will', 'is', 'was', 'does'], correct: 0, explanation: 'Future Continuous: "will be" + Verb-ing.' },
          { id: 20, text: 'At 7 AM tomorrow, I ___ not be sleeping anymore.', options: ['will', 'am', 'was', 'do'], correct: 0, explanation: 'Future Continuous negative: "will not be".' }
        ],
        fillBlanks: [
          { id: 1, text: 'I ___ (sleep) at 11 PM tonight.', options: ['will be sleeping', 'will be sleep', 'am sleeping', 'was sleeping'], correct: 0, explanation: 'Future Continuous: "will be" + Verb-ing: "will be sleeping".' },
          { id: 2, text: 'They ___ (travel) this time next week.', options: ['will be traveling', 'will be travel', 'are traveling', 'were traveling'], correct: 0, explanation: 'Future Continuous: "will be traveling".' },
          { id: 3, text: '___ (will) you be using the printer this afternoon?', options: ['Will', 'Do', 'Are', 'Did'], correct: 0, explanation: 'Future Continuous questions start with "Will".' },
          { id: 4, text: 'She ___ (not / work) tomorrow.', options: ['will not be working', 'will not be work', "won't working", 'is not working'], correct: 0, explanation: 'Future Continuous negative: "will not be" + Verb-ing.' },
          { id: 5, text: 'We ___ (set) the table while you cook.', options: ['will be setting', 'will be set', 'are setting', 'were setting'], correct: 0, explanation: 'Future Continuous: "will be setting".' },
          { id: 6, text: 'At 10 PM, I ___ (study) for my exam.', options: ['will be studying', 'will be study', 'am studying', 'was studying'], correct: 0, explanation: 'Future Continuous: "will be studying".' },
          { id: 7, text: 'What ___ (you / do) at 9 AM tomorrow?', options: ['will you be doing', 'will you be do', 'are you doing', 'do you be doing'], correct: 0, explanation: 'Future Continuous question order: "will" + subject + "be" + Verb-ing.' },
          { id: 8, text: 'They ___ (wait) for us at the airport.', options: ['will be waiting', 'will be wait', 'are waiting', 'were waiting'], correct: 0, explanation: 'Future Continuous: "will be waiting".' },
          { id: 9, text: 'He ___ (not / sleep) at midnight.', options: ['will not be sleeping', 'will not be sleep', "won't sleeping", 'is not sleeping'], correct: 0, explanation: 'Future Continuous negative: "will not be" + Verb-ing.' },
          { id: 10, text: '___ (she / attend) the conference next week?', options: ['Will she be attending', 'Does she be attending', 'Will she attending', 'She will be attending'], correct: 0, explanation: 'Future Continuous question order: "Will" + subject + "be" + Verb-ing.' },
          { id: 11, text: 'At 8 AM tomorrow, we ___ (have) breakfast.', options: ['will be having', 'will be have', 'are having', 'were having'], correct: 0, explanation: 'Future Continuous: "will be having".' },
          { id: 12, text: 'This time next week, I ___ (lie) on a beach.', options: ['will be lying', 'will be lieing', 'am lying', 'was lying'], correct: 0, explanation: 'Change "ie" to "y" before "-ing": "lying".' },
          { id: 13, text: 'The children ___ (sleep) when we arrive.', options: ['will be sleeping', 'will be sleep', 'are sleeping', 'were sleeping'], correct: 0, explanation: 'Future Continuous: "will be sleeping".' },
          { id: 14, text: '___ (you / need) this book tomorrow?', options: ['Will you be needing', 'Do you be needing', 'Will you needing', 'You will be needing'], correct: 0, explanation: 'Future Continuous question order: "Will" + subject + "be" + Verb-ing.' },
          { id: 15, text: 'I ___ (not / use) my laptop this evening.', options: ['will not be using', 'will not be use', "won't using", 'am not using'], correct: 0, explanation: 'Future Continuous negative: "will not be" + Verb-ing.' },
          { id: 16, text: 'At noon, the plane ___ (cross) the ocean.', options: ['will be crossing', 'will be cross', 'is crossing', 'was crossing'], correct: 0, explanation: 'Future Continuous: "will be crossing".' },
          { id: 17, text: 'We ___ (discuss) the budget at 3 PM.', options: ['will be discussing', 'will be discuss', 'are discussing', 'were discussing'], correct: 0, explanation: 'Future Continuous: "will be discussing".' },
          { id: 18, text: 'What ___ (they / do) this time next month?', options: ['will they be doing', 'will they be do', 'are they doing', 'do they be doing'], correct: 0, explanation: 'Future Continuous question order: "will" + subject + "be" + Verb-ing.' },
          { id: 19, text: 'She ___ (wear) a red dress at the party.', options: ['will be wearing', 'will be wear', 'is wearing', 'was wearing'], correct: 0, explanation: 'Future Continuous: "will be wearing".' },
          { id: 20, text: 'I ___ (not / sleep) anymore at 7 AM.', options: ['will not be sleeping', 'will not be sleep', "won't sleeping", 'am not sleeping'], correct: 0, explanation: 'Future Continuous negative: "will not be" + Verb-ing.' }
        ],
        scrambled: [
          { id: 1, words: ['be', 'I', 'will', 'sleeping', 'tonight'], answer: 'I will be sleeping tonight', explanation: 'Subject + will be + Verb-ing + time.' },
          { id: 2, words: ['using', 'you', 'will', 'be', 'car', 'the', '?'], answer: 'will you be using the car', explanation: 'Will + subject + be + Verb-ing + object.' },
          { id: 3, words: ['not', 'she', 'will', 'be', 'working'], answer: 'she will not be working', explanation: 'Subject + will not be + Verb-ing.' },
          { id: 4, words: ['traveling', 'we', 'will', 'be', 'tomorrow'], answer: 'we will be traveling tomorrow', explanation: 'Subject + will be + Verb-ing + time.' },
          { id: 5, words: ['doing', 'you', 'will', 'be', 'what', '?'], answer: 'what will you be doing', explanation: 'Question word + will + subject + be + Verb-ing.' },
          { id: 6, words: ['for', 'waiting', 'they', 'be', 'us', 'will'], answer: 'they will be waiting for us', explanation: 'Subject + will be + Verb-ing + object.' },
          { id: 7, words: ['sleeping', 'not', 'he', 'be', 'will', 'midnight', 'at'], answer: 'he will not be sleeping at midnight', explanation: 'Subject + will not be + Verb-ing + time.' },
          { id: 8, words: ['attending', 'she', 'will', 'be', 'the', 'conference', '?'], answer: 'will she be attending the conference', explanation: 'Will + subject + be + Verb-ing + object.' },
          { id: 9, words: ['breakfast', 'having', 'we', 'be', 'will'], answer: 'we will be having breakfast', explanation: 'Subject + will be + Verb-ing + object.' },
          { id: 10, words: ['beach', 'lying', 'be', 'I', 'a', 'on', 'will'], answer: 'I will be lying on a beach', explanation: 'Subject + will be + Verb-ing + place.' },
          { id: 11, words: ['sleeping', 'the', 'be', 'children', 'will'], answer: 'the children will be sleeping', explanation: 'Subject + will be + Verb-ing.' },
          { id: 12, words: ['book', 'you', 'this', 'needing', 'be', 'will', '?'], answer: 'will you be needing this book', explanation: 'Will + subject + be + Verb-ing + object.' },
          { id: 13, words: ['using', 'not', 'I', 'be', 'will', 'laptop', 'my'], answer: 'I will not be using my laptop', explanation: 'Subject + will not be + Verb-ing + object.' },
          { id: 14, words: ['crossing', 'plane', 'the', 'be', 'will', 'ocean', 'the'], answer: 'the plane will be crossing the ocean', explanation: 'Subject + will be + Verb-ing + object.' },
          { id: 15, words: ['budget', 'discussing', 'we', 'be', 'the', 'will'], answer: 'we will be discussing the budget', explanation: 'Subject + will be + Verb-ing + object.' },
          { id: 16, words: ['doing', 'be', 'they', 'what', 'will', '?'], answer: 'what will they be doing', explanation: 'Question word + will + subject + be + Verb-ing.' },
          { id: 17, words: ['dress', 'wearing', 'she', 'a', 'be', 'will', 'red'], answer: 'she will be wearing a red dress', explanation: 'Subject + will be + Verb-ing + object.' },
          { id: 18, words: ['studying', 'at', 'be', 'I', 'will', 'university'], answer: 'I will be studying at university', explanation: 'Subject + will be + Verb-ing + place.' },
          { id: 19, words: ['setting', 'be', 'the', 'she', 'table', 'will'], answer: 'she will be setting the table', explanation: 'Subject + will be + Verb-ing + object.' },
          { id: 20, words: ['sleeping', 'not', 'anymore', 'I', 'be', 'will'], answer: 'I will not be sleeping anymore', explanation: 'Subject + will not be + Verb-ing.' }
        ],
        errorCorrection: [
          { id: 1, text: 'I will sleeping at 11 PM.', options: ['I', 'will sleeping', 'at 11', 'PM'], correct: 1, wrongPart: 'will sleeping', correction: 'will be sleeping', explanation: 'Future Continuous needs "be": "will be sleeping".' },
          { id: 2, text: 'She will be work tomorrow.', options: ['She', 'will be', 'work', 'tomorrow'], correct: 2, wrongPart: 'work', correction: 'working', explanation: 'After "will be", use the "-ing" form: "working".' },
          { id: 3, text: 'They will be travels this time next week.', options: ['They', 'will be', 'travels', 'this time next week'], correct: 2, wrongPart: 'travels', correction: 'traveling', explanation: 'After "will be", use the "-ing" form: "traveling".' },
          { id: 4, text: 'Will be you using the car tonight?', options: ['Will be', 'you', 'using', 'the car tonight'], correct: 0, wrongPart: 'Will be', correction: 'Will', explanation: 'Question order is "Will + subject + be": "Will you be using...?".' },
          { id: 5, text: 'He not will be sleeping at midnight.', options: ['He', 'not will be', 'sleeping', 'at midnight'], correct: 1, wrongPart: 'not will be', correction: 'will not be', explanation: '"not" goes after "will": "will not be".' },
          { id: 6, text: 'We will be setted the table.', options: ['We', 'will be', 'setted', 'the table'], correct: 2, wrongPart: 'setted', correction: 'setting', explanation: 'After "will be", use the "-ing" form: "setting".' },
          { id: 7, text: 'What will you doing at 9 AM?', options: ['What', 'will you', 'doing', 'at 9 AM'], correct: 2, wrongPart: 'doing', correction: 'be doing', explanation: 'Future Continuous needs "be" before the "-ing" form: "be doing".' },
          { id: 8, text: 'I will be studies at university.', options: ['I', 'will be', 'studies', 'at university'], correct: 2, wrongPart: 'studies', correction: 'studying', explanation: 'After "will be", use the "-ing" form: "studying".' },
          { id: 9, text: 'She will attending the conference.', options: ['She', 'will', 'attending', 'the conference'], correct: 1, wrongPart: 'will', correction: 'will be', explanation: 'Future Continuous needs "be" before "attending": "will be attending".' },
          { id: 10, text: 'The plane will be crosses the ocean at noon.', options: ['The plane', 'will be', 'crosses', 'the ocean at noon'], correct: 2, wrongPart: 'crosses', correction: 'crossing', explanation: 'After "will be", use the "-ing" form: "crossing".' },
          { id: 11, text: 'Will they be waits for us?', options: ['Will', 'they be', 'waits', 'for us'], correct: 2, wrongPart: 'waits', correction: 'waiting', explanation: 'After "be", use the "-ing" form: "waiting".' },
          { id: 12, text: 'We will not using my laptop.', options: ['We', 'will not', 'using', 'my laptop'], correct: 2, wrongPart: 'using', correction: 'be using', explanation: 'Future Continuous negative needs "be": "will not be using".' },
          { id: 13, text: 'What time you will be arriving?', options: ['What time', 'you will be', 'arriving', 'No error'], correct: 1, wrongPart: 'you will be', correction: 'will you be', explanation: 'Question order is "will + subject + be": "will you be arriving".' },
          { id: 14, text: 'She will be wear a red dress.', options: ['She', 'will be', 'wear', 'a red dress'], correct: 2, wrongPart: 'wear', correction: 'wearing', explanation: 'After "will be", use the "-ing" form: "wearing".' },
          { id: 15, text: 'They will be discuss the budget at 3 PM.', options: ['They', 'will be', 'discuss', 'the budget at 3 PM'], correct: 2, wrongPart: 'discuss', correction: 'discussing', explanation: 'After "will be", use the "-ing" form: "discussing".' },
          { id: 16, text: 'I be will lying on a beach this time next week.', options: ['I be will', 'lying', 'on a beach', 'this time next week'], correct: 0, wrongPart: 'I be will', correction: 'I will be', explanation: 'Correct word order is "subject + will + be": "I will be".' },
          { id: 17, text: 'The children will sleeping when we arrive.', options: ['The children', 'will', 'sleeping', 'when we arrive'], correct: 1, wrongPart: 'will', correction: 'will be', explanation: 'Future Continuous needs "be": "will be sleeping".' },
          { id: 18, text: 'Will you needing this book tomorrow?', options: ['Will', 'you', 'needing', 'this book tomorrow'], correct: 2, wrongPart: 'needing', correction: 'be needing', explanation: 'Future Continuous needs "be" before the "-ing" form: "be needing".' },
          { id: 19, text: 'At 8 AM, we will be has breakfast.', options: ['At 8 AM', 'we will be', 'has', 'breakfast'], correct: 2, wrongPart: 'has', correction: 'having', explanation: 'After "will be", use the "-ing" form: "having".' },
          { id: 20, text: 'He will not be sleep at midnight.', options: ['He', 'will not be', 'sleep', 'at midnight'], correct: 2, wrongPart: 'sleep', correction: 'sleeping', explanation: 'After "will not be", use the "-ing" form: "sleeping".' }
        ],
        transform: [
          { id: 1, text: 'Make negative: "I will be sleeping at 11 PM."', options: ['I will not be sleeping at 11 PM.', 'I will not sleeping at 11 PM.', "I won't sleeping at 11 PM.", 'I am not being sleeping at 11 PM.'], correct: 0, explanation: 'Add "not" after "will": "will not be sleeping".' },
          { id: 2, text: 'Make question: "You will be using the car tonight."', options: ['Will you be using the car tonight?', 'Do you will be using the car tonight?', 'Will you using the car tonight?', 'You will be using the car tonight?'], correct: 0, explanation: 'Move "will" to the front: "Will you be using...?".' },
          { id: 3, text: 'Transform to Future Continuous: "I sleep." (at 11 PM tonight)', options: ['I will be sleeping.', 'I sleep.', 'I am sleeping.', 'I was sleeping.'], correct: 0, explanation: 'Future Continuous: "I will be sleeping".' },
          { id: 4, text: 'Make negative: "They will be traveling tomorrow."', options: ["They won't be traveling tomorrow.", "They don't will be traveling tomorrow.", "They won't traveling tomorrow.", "They aren't will be traveling tomorrow."], correct: 0, explanation: "The short form 'won't be' means 'will not be'." },
          { id: 5, text: 'Make question: "She will be attending the meeting."', options: ['Will she be attending the meeting?', 'Does she will be attending the meeting?', 'Will she attending the meeting?', 'She will be attending the meeting?'], correct: 0, explanation: 'Move "will" to the front: "Will she be attending...?".' },
          { id: 6, text: 'Transform to Future Continuous: "We have breakfast." (at 8 AM tomorrow)', options: ['We will be having breakfast.', 'We have breakfast.', 'We are having breakfast.', 'We had breakfast.'], correct: 0, explanation: 'Future Continuous: "We will be having breakfast".' },
          { id: 7, text: 'Make negative: "He will be working tomorrow."', options: ["He won't be working tomorrow.", "He don't will be working tomorrow.", "He won't working tomorrow.", "He isn't will be working tomorrow."], correct: 0, explanation: "Negative form: 'will not be' (won't be) + Verb-ing." },
          { id: 8, text: 'Make question: "They will be waiting at the station."', options: ['Will they be waiting at the station?', 'Do they will be waiting at the station?', 'Will they waiting at the station?', 'They will be waiting at the station?'], correct: 0, explanation: 'Move "will" to the front: "Will they be waiting...?".' },
          { id: 9, text: 'Transform to Future Continuous: "I study." (this time next year, at university)', options: ['I will be studying.', 'I study.', 'I am studying.', 'I studied.'], correct: 0, explanation: 'Future Continuous: "I will be studying".' },
          { id: 10, text: 'Make negative: "We will be discussing the budget."', options: ["We won't be discussing the budget.", "We don't will be discussing the budget.", "We won't discussing the budget.", "We aren't will be discussing the budget."], correct: 0, explanation: "Negative form: 'will not be' (won't be) + Verb-ing." },
          { id: 11, text: 'Make question: "The plane will be crossing the ocean."', options: ['Will the plane be crossing the ocean?', 'Does the plane will be crossing the ocean?', 'Will the plane crossing the ocean?', 'The plane will be crossing the ocean?'], correct: 0, explanation: 'Move "will" to the front: "Will the plane be crossing...?".' },
          { id: 12, text: 'Transform to Future Continuous: "She wears a red dress." (at the party tonight)', options: ['She will be wearing a red dress.', 'She wears a red dress.', 'She is wearing a red dress.', 'She wore a red dress.'], correct: 0, explanation: 'Future Continuous: "She will be wearing a red dress".' },
          { id: 13, text: 'Make negative: "I will be using my laptop this evening."', options: ["I won't be using my laptop this evening.", "I don't will be using my laptop this evening.", "I won't using my laptop this evening.", "I amn't will be using my laptop this evening."], correct: 0, explanation: "Negative form: 'will not be' (won't be) + Verb-ing." },
          { id: 14, text: 'Make question: "The children will be sleeping when we arrive."', options: ['Will the children be sleeping when we arrive?', 'Do the children will be sleeping when we arrive?', 'Will the children sleeping when we arrive?', 'The children will be sleeping when we arrive?'], correct: 0, explanation: 'Move "will" to the front: "Will the children be sleeping...?".' },
          { id: 15, text: 'Transform to Future Continuous: "We set the table." (while you cook)', options: ['We will be setting the table.', 'We set the table.', 'We are setting the table.', 'We were setting the table.'], correct: 0, explanation: 'Future Continuous: "We will be setting the table".' },
          { id: 16, text: 'Make negative: "You will be needing this book."', options: ["You won't be needing this book.", "You don't will be needing this book.", "You won't needing this book.", "You aren't will be needing this book."], correct: 0, explanation: "Negative form: 'will not be' (won't be) + Verb-ing." },
          { id: 17, text: 'Make question: "I will be lying on a beach."', options: ['Will I be lying on a beach?', 'Do I will be lying on a beach?', 'Will I lying on a beach?', 'I will be lying on a beach?'], correct: 0, explanation: 'Move "will" to the front: "Will I be lying...?".' },
          { id: 18, text: 'Transform to Future Continuous: "They wait for us." (at the airport at 5 PM)', options: ['They will be waiting for us.', 'They wait for us.', 'They are waiting for us.', 'They waited for us.'], correct: 0, explanation: 'Future Continuous: "They will be waiting for us".' },
          { id: 19, text: 'Make negative: "She will be attending the conference."', options: ["She won't be attending the conference.", "She don't will be attending the conference.", "She won't attending the conference.", "She isn't will be attending the conference."], correct: 0, explanation: "Negative form: 'will not be' (won't be) + Verb-ing." },
          { id: 20, text: 'Make question: "He will be sleeping at midnight."', options: ['Will he be sleeping at midnight?', 'Does he will be sleeping at midnight?', 'Will he sleeping at midnight?', 'He will be sleeping at midnight?'], correct: 0, explanation: 'Move "will" to the front: "Will he be sleeping...?".' }
        ],
        dialogue: [
          { id: 1, situation: 'Planning tonight.', dialogue: 'A: What are you doing at 11 PM?\nB: I ___ sleeping by then.', options: ['will be', 'am', 'was', 'do'], correct: 0, explanation: 'Future Continuous: "will be sleeping".' },
          { id: 2, situation: 'Asking to borrow the car.', dialogue: 'A: Can I borrow your car tonight?\nB: Sorry, I ___ using it myself.', options: ['will be', 'am', 'was', 'do'], correct: 0, explanation: 'Future Continuous: "will be using".' },
          { id: 3, situation: "Discussing tomorrow's schedule.", dialogue: 'A: Where will you be at 3 PM?\nB: I ___ attending a meeting.', options: ['will be', 'am', 'was', 'do'], correct: 0, explanation: 'Future Continuous: "will be attending".' },
          { id: 4, situation: 'Asking about a trip.', dialogue: 'A: What will you be doing this time next week?\nB: We ___ traveling to Japan.', options: ['will be', 'are', 'were', 'do'], correct: 0, explanation: 'Future Continuous: "will be traveling".' },
          { id: 5, situation: 'Talking about dinner plans.', dialogue: 'A: Will you join us for dinner?\nB: Sorry, I ___ working late tonight.', options: ['will be', 'am', 'was', 'do'], correct: 0, explanation: 'Future Continuous: "will be working".' },
          { id: 6, situation: 'Discussing an interruption at work.', dialogue: 'A: Can we talk at 2 PM?\nB: I ___ having a meeting then.', options: ['will be', 'am', 'was', 'do'], correct: 0, explanation: 'Future Continuous: "will be having".' },
          { id: 7, situation: 'Asking about a flight.', dialogue: 'A: What time does your flight land?\nB: At 5 PM. I ___ crossing three time zones.', options: ['will be', 'am', 'was', 'do'], correct: 0, explanation: 'Future Continuous: "will be crossing".' },
          { id: 8, situation: 'Talking about a party outfit.', dialogue: 'A: What will you wear to the party?\nB: I ___ wearing my blue dress.', options: ['will be', 'am', 'was', 'do'], correct: 0, explanation: 'Future Continuous: "will be wearing".' },
          { id: 9, situation: 'Asking about study plans.', dialogue: 'A: Where will you be next semester?\nB: I ___ studying in Germany.', options: ['will be', 'am', 'was', 'do'], correct: 0, explanation: 'Future Continuous: "will be studying".' },
          { id: 10, situation: 'Discussing a beach holiday.', dialogue: 'A: What will you be doing this time next month?\nB: I ___ lying on a beach!', options: ['will be', 'am', 'was', 'do'], correct: 0, explanation: 'Future Continuous: "will be lying".' },
          { id: 11, situation: 'Asking about picking someone up.', dialogue: 'A: Will you be at the station at 6?\nB: Yes, we ___ waiting for you there.', options: ['will be', 'are', 'were', 'do'], correct: 0, explanation: 'Future Continuous: "will be waiting".' },
          { id: 12, situation: 'Talking about a late-night flight.', dialogue: 'A: Should I call you at midnight?\nB: No, I ___ sleeping by then.', options: ['will be', 'am', 'was', 'do'], correct: 0, explanation: 'Future Continuous: "will be sleeping".' },
          { id: 13, situation: 'Discussing a business trip.', dialogue: 'A: When will he be back?\nB: Next week he ___ traveling for work.', options: ['will be', 'is', 'was', 'does'], correct: 0, explanation: 'Future Continuous: "will be traveling".' },
          { id: 14, situation: 'Asking politely about equipment use.', dialogue: 'A: ___ you be needing the projector this afternoon?\nB: No, go ahead and use it.', options: ['Will', 'Do', 'Are', 'Did'], correct: 0, explanation: 'A polite future question uses "Will you be...?".' },
          { id: 15, situation: 'Discussing the school run.', dialogue: 'A: Who will be picking up the kids?\nB: I ___ picking them up at 4 PM.', options: ['will be', 'am', 'was', 'do'], correct: 0, explanation: 'Future Continuous: "will be picking".' },
          { id: 16, situation: 'Talking about the weather forecast.', dialogue: 'A: What will the weather be like tomorrow morning?\nB: It ___ raining, according to the forecast.', options: ['will be', 'is', 'was', 'does'], correct: 0, explanation: 'Future Continuous: "will be raining".' },
          { id: 17, situation: 'Asking about noise at night.', dialogue: 'A: Will the neighbors be loud tonight?\nB: Probably, they ___ having a party.', options: ['will be', 'are', 'were', 'do'], correct: 0, explanation: 'Future Continuous: "will be having".' },
          { id: 18, situation: 'Discussing a work shift.', dialogue: 'A: Are you free this evening?\nB: No, I ___ working until 10 PM.', options: ['will be', 'am', 'was', 'do'], correct: 0, explanation: 'Future Continuous: "will be working".' },
          { id: 19, situation: 'Talking about exam preparation.', dialogue: 'A: What will you be doing all weekend?\nB: I ___ studying for my final exam.', options: ['will be', 'am', 'was', 'do'], correct: 0, explanation: 'Future Continuous: "will be studying".' },
          { id: 20, situation: 'Asking about arrival time.', dialogue: 'A: What time will you get here?\nB: By 9, I ___ waiting outside.', options: ['will be', 'am', 'was', 'do'], correct: 0, explanation: 'Future Continuous: "will be waiting".' }
        ]
      }
    ]
  },
  intermediate: {
    label: 'Intermediate',
    topics: [
      {
        id: 'present-perfect-simple',
        title: 'Present Perfect Simple',
        icon: '✅',
        guide: `## Present Perfect Simple (Hozirgi tugallangan zamon)

Present Perfect Simple o'tmishda sodir bo'lgan, lekin natijasi yoki ta'siri hozirgi paytga bog'liq bo'lgan harakatlarni ifodalash uchun ishlatiladi. Harakatning aniq vaqti odatda muhim emas.

## 1. Shakllanishi (Form)
• **Positive (+)**: Subject + have/has + Past Participle (V3)
  - I/You/We/They **have finished** the report.
  - He/She/It **has finished** the report.
• **Negative (-)**: Subject + have not (haven't) / has not (hasn't) + V3
  - I **haven't seen** that film.
  - She **hasn't called** me yet.
• **Question (?)**: Have/Has + Subject + V3?
  - **Have** you **ever visited** London?
  - **Has** he **finished** his homework?

*(has faqat he/she/it bilan, qolgan barcha shaxslar bilan have ishlatiladi)*

## 2. Ishlatilishi (Usage)
1. **O'tmishda sodir bo'lgan, aniq vaqti muhim bo'lmagan, hozirgi natijasi muhim harakat**:
   - I **have lost** my keys. (hozir kalitim yo'q)
2. **Hayotiy tajriba** (ever/never bilan):
   - She **has visited** Paris twice.
3. **Yaqinda tugagan harakat** (just, already, yet bilan):
   - He **has just finished** his homework.
4. **Hozirgi paytgacha davom etib kelayotgan holat** (for/since bilan):
   - We **have lived** here for five years.

## 3. Present Perfect vs Past Simple
• **Past Simple** — aniq, tugallangan vaqt bilan ishlatiladi (yesterday, last week, in 2020).
  - I **saw** that movie last night.
• **Present Perfect** — aniq vaqt ko'rsatilmaydi, natija yoki tajriba muhim.
  - I **have seen** that movie. (qachonligi muhim emas)

## 4. Signal so'zlar (Time Expressions)
• already, yet, just, ever, never
• for (davomiylik: for five years), since (boshlanish nuqtasi: since 2019)
• so far, recently, this week/month/year (hali tugamagan davr)`,
        questions: [
          { id: 1, text: 'I ___ finished my homework already.', options: ['have', 'am', 'was', 'did'], correct: 0, explanation: 'Present Perfect: I + have + V3 (finished).' },
          { id: 2, text: 'She ___ visited Paris twice.', options: ['has', 'is', 'was', 'did'], correct: 0, explanation: 'Present Perfect: she + has + V3 (visited).' },
          { id: 3, text: '___ you ever visited Japan?', options: ['Have', 'Are', 'Were', 'Did'], correct: 0, explanation: 'Present Perfect question: Have + you + ever + V3?' },
          { id: 4, text: 'He ___ not called me yet.', options: ['has', 'is', 'was', 'did'], correct: 0, explanation: "Present Perfect negative: he + has not (hasn't) + V3." },
          { id: 5, text: 'We ___ lived here for five years.', options: ['have', 'are', 'were', 'did'], correct: 0, explanation: 'Present Perfect with "for": have + V3 (lived) + for + period.' },
          { id: 6, text: 'They ___ just arrived at the airport.', options: ['have', 'are', 'were', 'did'], correct: 0, explanation: 'Present Perfect with "just": have + just + V3.' },
          { id: 7, text: '___ she finished her project yet?', options: ['Has', 'Is', 'Was', 'Did'], correct: 0, explanation: 'Present Perfect question: Has + she + V3 + yet?' },
          { id: 8, text: 'I ___ never been to Japan.', options: ['have', 'am', 'was', 'did'], correct: 0, explanation: 'Present Perfect with "never": have + never + V3 (been).' },
          { id: 9, text: 'He ___ lost his keys again.', options: ['has', 'is', 'was', 'did'], correct: 0, explanation: 'Present Perfect: he + has + V3 (lost).' },
          { id: 10, text: '___ you seen my phone anywhere?', options: ['Have', 'Are', 'Were', 'Did'], correct: 0, explanation: 'Present Perfect question: Have + you + V3?' },
          { id: 11, text: 'We ___ not met before.', options: ['have', 'are', 'were', 'did'], correct: 0, explanation: "Present Perfect negative: we + have not (haven't) + V3." },
          { id: 12, text: 'My parents ___ been married for 20 years.', options: ['have', 'are', 'were', 'did'], correct: 0, explanation: 'Present Perfect with "for": have + V3 (been) + for + period.' },
          { id: 13, text: '___ he ever tried sushi?', options: ['Has', 'Is', 'Was', 'Did'], correct: 0, explanation: 'Present Perfect question: Has + he + ever + V3?' },
          { id: 14, text: 'She ___ already read that book.', options: ['has', 'is', 'was', 'did'], correct: 0, explanation: 'Present Perfect with "already": has + already + V3.' },
          { id: 15, text: 'I ___ not finished my report yet.', options: ['have', 'am', 'was', 'did'], correct: 0, explanation: 'Present Perfect negative with "yet": have not + V3 + yet.' },
          { id: 16, text: 'They ___ known each other since childhood.', options: ['have', 'are', 'were', 'did'], correct: 0, explanation: 'Present Perfect with "since": have + V3 (known) + since + point in time.' },
          { id: 17, text: '___ your sister got her results yet?', options: ['Has', 'Is', 'Was', 'Did'], correct: 0, explanation: 'Present Perfect question: Has + subject + V3 + yet?' },
          { id: 18, text: 'We ___ just moved into our new house.', options: ['have', 'are', 'were', 'did'], correct: 0, explanation: 'Present Perfect with "just": have + just + V3.' },
          { id: 19, text: 'He ___ broken his leg twice.', options: ['has', 'is', 'was', 'did'], correct: 0, explanation: 'Present Perfect: he + has + V3 (broken).' },
          { id: 20, text: 'I ___ not seen that film.', options: ['have', 'am', 'was', 'did'], correct: 0, explanation: "Present Perfect negative: I + have not (haven't) + V3 (seen)." }
        ],
        fillBlanks: [
          { id: 1, text: 'I ___ (finish) my homework already.', options: ['have finished', 'have finish', 'am finishing', 'was finishing'], correct: 0, explanation: 'Present Perfect: have + V3 (finished).' },
          { id: 2, text: 'She ___ (visit) Paris twice.', options: ['has visited', 'has visit', 'is visiting', 'was visiting'], correct: 0, explanation: 'Present Perfect: has + V3 (visited).' },
          { id: 3, text: '___ (you / ever / see) a ghost?', options: ['Have you ever seen', 'Have you ever see', 'Do you ever see', 'Are you ever seeing'], correct: 0, explanation: 'Present Perfect question: Have + subject + ever + V3.' },
          { id: 4, text: 'He ___ (not / call) me yet.', options: ["hasn't called", "haven't called", "didn't call", "isn't calling"], correct: 0, explanation: "Present Perfect negative: hasn't + V3 (called)." },
          { id: 5, text: 'We ___ (live) here for five years.', options: ['have lived', 'have live', 'are living', 'were living'], correct: 0, explanation: 'Present Perfect: have + V3 (lived).' },
          { id: 6, text: 'They ___ (just / arrive) at the airport.', options: ['have just arrived', 'have just arrive', 'are just arriving', 'just arrived'], correct: 0, explanation: 'Present Perfect with "just": have + just + V3.' },
          { id: 7, text: '___ (she / finish) her project yet?', options: ['Has she finished', 'Has she finish', 'Does she finish', 'Is she finishing'], correct: 0, explanation: 'Present Perfect question: Has + subject + V3 + yet?' },
          { id: 8, text: 'I ___ (never / be) to Japan.', options: ['have never been', 'have never be', 'am never being', 'was never'], correct: 0, explanation: 'Present Perfect: have + never + V3 (been).' },
          { id: 9, text: 'He ___ (lose) his keys again.', options: ['has lost', 'has lose', 'is losing', 'was losing'], correct: 0, explanation: 'Present Perfect: has + V3 (lost).' },
          { id: 10, text: '___ (you / see) my phone anywhere?', options: ['Have you seen', 'Have you see', 'Do you see', 'Are you seeing'], correct: 0, explanation: 'Present Perfect question: Have + subject + V3?' },
          { id: 11, text: 'We ___ (not / meet) before.', options: ["haven't met", "hasn't met", "didn't meet", "aren't meeting"], correct: 0, explanation: "Present Perfect negative: haven't + V3 (met)." },
          { id: 12, text: 'My parents ___ (be) married for 20 years.', options: ['have been', 'have be', 'are being', 'were'], correct: 0, explanation: 'Present Perfect: have + V3 (been) + for.' },
          { id: 13, text: '___ (he / ever / try) sushi?', options: ['Has he ever tried', 'Has he ever try', 'Does he ever try', 'Is he ever trying'], correct: 0, explanation: 'Present Perfect question: Has + subject + ever + V3.' },
          { id: 14, text: 'She ___ (already / read) that book.', options: ['has already read', 'has already reads', 'is already reading', 'already read'], correct: 0, explanation: 'Present Perfect: has + already + V3 (read).' },
          { id: 15, text: 'I ___ (not / finish) my report yet.', options: ["haven't finished", "hasn't finished", "didn't finish", "am not finishing"], correct: 0, explanation: "Present Perfect negative: haven't + V3 (finished) + yet." },
          { id: 16, text: 'They ___ (know) each other since childhood.', options: ['have known', 'have know', 'are knowing', 'knew'], correct: 0, explanation: 'Present Perfect: have + V3 (known) + since.' },
          { id: 17, text: '___ (your sister / get) her results yet?', options: ['Has your sister got', 'Has your sister get', 'Does your sister get', 'Is your sister getting'], correct: 0, explanation: 'Present Perfect question: Has + subject + V3 + yet?' },
          { id: 18, text: 'We ___ (just / move) into our new house.', options: ['have just moved', 'have just move', 'are just moving', 'just moved'], correct: 0, explanation: 'Present Perfect with "just": have + just + V3.' },
          { id: 19, text: 'He ___ (break) his leg twice.', options: ['has broken', 'has break', 'is breaking', 'broke'], correct: 0, explanation: 'Present Perfect: has + V3 (broken).' },
          { id: 20, text: 'I ___ (not / see) that film.', options: ["haven't seen", "hasn't seen", "didn't see", "am not seeing"], correct: 0, explanation: "Present Perfect negative: haven't + V3 (seen)." }
        ],
        scrambled: [
          { id: 1, words: ['finished', 'I', 'have', 'my', 'homework', 'already'], answer: 'I have finished my homework already', explanation: 'Subject + have + V3 + object + already.' },
          { id: 2, words: ['visited', 'she', 'has', 'Paris', 'twice'], answer: 'she has visited Paris twice', explanation: 'Subject + has + V3 + object + twice.' },
          { id: 3, words: ['ever', 'you', 'have', 'seen', 'a', 'ghost', '?'], answer: 'have you ever seen a ghost', explanation: 'Have + subject + ever + V3 + object?' },
          { id: 4, words: ['called', 'he', "hasn't", 'me', 'yet'], answer: "he hasn't called me yet", explanation: "Subject + hasn't + V3 + object + yet." },
          { id: 5, words: ['lived', 'we', 'have', 'here', 'for', 'five', 'years'], answer: 'we have lived here for five years', explanation: 'Subject + have + V3 + place + for + period.' },
          { id: 6, words: ['arrived', 'they', 'have', 'just', 'at', 'the', 'airport'], answer: 'they have just arrived at the airport', explanation: 'Subject + have + just + V3 + place.' },
          { id: 7, words: ['finished', 'has', 'she', 'her', 'project', 'yet', '?'], answer: 'has she finished her project yet', explanation: 'Has + subject + V3 + object + yet?' },
          { id: 8, words: ['been', 'I', 'have', 'never', 'to', 'Japan'], answer: 'I have never been to Japan', explanation: 'Subject + have + never + V3 + place.' },
          { id: 9, words: ['lost', 'he', 'has', 'his', 'keys', 'again'], answer: 'he has lost his keys again', explanation: 'Subject + has + V3 + object + again.' },
          { id: 10, words: ['seen', 'have', 'you', 'my', 'phone', 'anywhere', '?'], answer: 'have you seen my phone anywhere', explanation: 'Have + subject + V3 + object?' },
          { id: 11, words: ['met', 'we', "haven't", 'before'], answer: "we haven't met before", explanation: "Subject + haven't + V3 + before." },
          { id: 12, words: ['been', 'my', 'parents', 'have', 'married', 'for', '20', 'years'], answer: 'my parents have been married for 20 years', explanation: 'Subject + have + been + married + for + period.' },
          { id: 13, words: ['tried', 'has', 'he', 'ever', 'sushi', '?'], answer: 'has he ever tried sushi', explanation: 'Has + subject + ever + V3 + object?' },
          { id: 14, words: ['read', 'she', 'has', 'already', 'that', 'book'], answer: 'she has already read that book', explanation: 'Subject + has + already + V3 + object.' },
          { id: 15, words: ['finished', 'I', "haven't", 'my', 'report', 'yet'], answer: "I haven't finished my report yet", explanation: "Subject + haven't + V3 + object + yet." },
          { id: 16, words: ['known', 'they', 'have', 'each', 'other', 'since', 'childhood'], answer: 'they have known each other since childhood', explanation: 'Subject + have + V3 + object + since + point in time.' },
          { id: 17, words: ['got', 'has', 'your', 'sister', 'her', 'results', 'yet', '?'], answer: 'has your sister got her results yet', explanation: 'Has + subject + V3 + object + yet?' },
          { id: 18, words: ['moved', 'we', 'have', 'just', 'into', 'our', 'new', 'house'], answer: 'we have just moved into our new house', explanation: 'Subject + have + just + V3 + place.' },
          { id: 19, words: ['broken', 'he', 'has', 'his', 'leg', 'twice'], answer: 'he has broken his leg twice', explanation: 'Subject + has + V3 + object + twice.' },
          { id: 20, words: ['seen', 'I', "haven't", 'that', 'film'], answer: "I haven't seen that film", explanation: "Subject + haven't + V3 + object." }
        ],
        errorCorrection: [
          { id: 1, text: 'I have saw that movie already.', options: ['I', 'have', 'saw', 'that movie already'], correct: 2, wrongPart: 'saw', correction: 'seen', explanation: 'After "have", use the past participle (V3): "seen", not the past simple "saw".' },
          { id: 2, text: 'She have visited Paris twice.', options: ['She', 'have', 'visited', 'Paris twice'], correct: 1, wrongPart: 'have', correction: 'has', explanation: '"She" is third person singular, so use "has", not "have".' },
          { id: 3, text: 'He has finish his homework.', options: ['He', 'has', 'finish', 'his homework'], correct: 2, wrongPart: 'finish', correction: 'finished', explanation: 'After "has", use the past participle (V3): "finished".' },
          { id: 4, text: 'You have ever been to London?', options: ['You', 'have ever', 'been to', 'London?'], correct: 1, wrongPart: 'have ever', correction: 'Have you ever', explanation: 'Present Perfect questions start with "Have/Has + subject": "Have you ever been...?".' },
          { id: 5, text: "They haven't arrive yet.", options: ['They', "haven't", 'arrive', 'yet'], correct: 2, wrongPart: 'arrive', correction: 'arrived', explanation: "After \"haven't\", use the past participle (V3): \"arrived\"." },
          { id: 6, text: 'We have live here since 2015.', options: ['We', 'have', 'live', 'here since 2015'], correct: 2, wrongPart: 'live', correction: 'lived', explanation: 'After "have", use the past participle (V3): "lived".' },
          { id: 7, text: 'She has never went to Japan.', options: ['She', 'has never', 'went', 'to Japan'], correct: 2, wrongPart: 'went', correction: 'gone', explanation: 'After "has never", use the past participle (V3): "gone", not "went".' },
          { id: 8, text: 'I have losed my keys again.', options: ['I', 'have', 'losed', 'my keys again'], correct: 2, wrongPart: 'losed', correction: 'lost', explanation: '"Lose" is irregular: its past participle is "lost", not "losed".' },
          { id: 9, text: 'Has you finished the report?', options: ['Has', 'you', 'finished', 'the report?'], correct: 0, wrongPart: 'Has', correction: 'Have', explanation: '"You" takes "have", not "has": "Have you finished...?".' },
          { id: 10, text: "He didn't has called me yet.", options: ['He', "didn't has", 'called', 'me yet'], correct: 1, wrongPart: "didn't has", correction: "hasn't", explanation: "Present Perfect negative is \"hasn't\" + V3, not \"didn't has\"." },
          { id: 11, text: 'We have knew each other for years.', options: ['We', 'have', 'knew', 'each other for years'], correct: 2, wrongPart: 'knew', correction: 'known', explanation: 'After "have", use the past participle (V3): "known", not "knew".' },
          { id: 12, text: 'I have lived in Tashkent since five years.', options: ['I', 'have lived', 'in Tashkent', 'since five years'], correct: 3, wrongPart: 'since five years', correction: 'for five years', explanation: 'Use "for" with a period of time and "since" with a starting point: "for five years".' },
          { id: 13, text: 'She has already finished her homework yesterday.', options: ['She', 'has already finished', 'her homework', 'yesterday'], correct: 3, wrongPart: 'yesterday', correction: '', explanation: 'Present Perfect cannot be used with a finished-time expression like "yesterday"; use Past Simple instead, or simply drop it.' },
          { id: 14, text: 'They have broke the window.', options: ['They', 'have', 'broke', 'the window'], correct: 2, wrongPart: 'broke', correction: 'broken', explanation: 'After "have", use the past participle (V3): "broken", not "broke".' },
          { id: 15, text: 'Have she finished the exam?', options: ['Have', 'she', 'finished', 'the exam?'], correct: 0, wrongPart: 'Have', correction: 'Has', explanation: '"She" takes "has", not "have": "Has she finished...?".' },
          { id: 16, text: 'I have never eating sushi before.', options: ['I', 'have never', 'eating', 'sushi before'], correct: 2, wrongPart: 'eating', correction: 'eaten', explanation: 'After "have never", use the past participle (V3): "eaten", not the "-ing" form.' },
          { id: 17, text: 'We has just moved to a new flat.', options: ['We', 'has', 'just moved', 'to a new flat'], correct: 1, wrongPart: 'has', correction: 'have', explanation: '"We" takes "have", not "has".' },
          { id: 18, text: 'He has broken his leg two times ago.', options: ['He has broken', 'his leg', 'two times', 'ago'], correct: 3, wrongPart: 'ago', correction: '', explanation: 'Present Perfect cannot be used with "ago" (a finished-time marker); simply say "twice", without "ago".' },
          { id: 19, text: "I haven't finish my project.", options: ['I', "haven't", 'finish', 'my project'], correct: 2, wrongPart: 'finish', correction: 'finished', explanation: "After \"haven't\", use the past participle (V3): \"finished\"." },
          { id: 20, text: "She hasn't call me yet.", options: ['She', "hasn't", 'call', 'me yet'], correct: 2, wrongPart: 'call', correction: 'called', explanation: "After \"hasn't\", use the past participle (V3): \"called\"." }
        ],
        transform: [
          { id: 1, text: 'Make negative: "I have finished my homework."', options: ["I haven't finished my homework.", "I don't have finished my homework.", "I haven't finish my homework.", "I am not finished my homework."], correct: 0, explanation: "Present Perfect negative: haven't + V3." },
          { id: 2, text: 'Make question: "She has visited Paris."', options: ['Has she visited Paris?', 'Does she has visited Paris?', 'Has she visit Paris?', 'She has visited Paris?'], correct: 0, explanation: 'Move "has" to the front: "Has she visited...?".' },
          { id: 3, text: 'Transform to Present Perfect: "I lose my keys." (result: I can\'t find them now)', options: ['I have lost my keys.', 'I lose my keys.', 'I am losing my keys.', 'I lost my keys.'], correct: 0, explanation: 'Present Perfect: "I have lost my keys" (result matters now).' },
          { id: 4, text: 'Make negative: "They have arrived."', options: ["They haven't arrived.", "They don't have arrived.", "They haven't arrive.", "They aren't arrived."], correct: 0, explanation: "Negative form: 'have not' (haven't) + V3." },
          { id: 5, text: 'Make question: "He has finished the report."', options: ['Has he finished the report?', 'Does he has finished the report?', 'Has he finish the report?', 'He has finished the report?'], correct: 0, explanation: 'Move "has" to the front: "Has he finished...?".' },
          { id: 6, text: 'Transform to Present Perfect: "We live here." (for five years, and still now)', options: ['We have lived here for five years.', 'We live here for five years.', 'We are living here for five years.', 'We lived here for five years.'], correct: 0, explanation: 'Present Perfect with "for": "We have lived here for five years".' },
          { id: 7, text: 'Make negative: "He has called me."', options: ["He hasn't called me.", "He doesn't have called me.", "He hasn't call me.", "He isn't called me."], correct: 0, explanation: "Negative form: 'has not' (hasn't) + V3." },
          { id: 8, text: 'Make question: "They have met before."', options: ['Have they met before?', 'Do they have met before?', 'Have they meet before?', 'They have met before?'], correct: 0, explanation: 'Move "have" to the front: "Have they met...?".' },
          { id: 9, text: 'Transform to Present Perfect: "I try sushi." (at some point in my life, no exact time)', options: ['I have tried sushi.', 'I try sushi.', 'I am trying sushi.', 'I tried sushi.'], correct: 0, explanation: 'Present Perfect: "I have tried sushi" (life experience, no exact time).' },
          { id: 10, text: 'Make negative: "We have finished the project."', options: ["We haven't finished the project.", "We don't have finished the project.", "We haven't finish the project.", "We aren't finished the project."], correct: 0, explanation: "Negative form: 'have not' (haven't) + V3." },
          { id: 11, text: 'Make question: "She has broken her leg."', options: ['Has she broken her leg?', 'Does she has broken her leg?', 'Has she break her leg?', 'She has broken her leg?'], correct: 0, explanation: 'Move "has" to the front: "Has she broken...?".' },
          { id: 12, text: 'Transform to Present Perfect: "They know each other." (since childhood, still true now)', options: ['They have known each other since childhood.', 'They know each other since childhood.', 'They are knowing each other since childhood.', 'They knew each other since childhood.'], correct: 0, explanation: 'Present Perfect with "since": "They have known each other since childhood".' },
          { id: 13, text: 'Make negative: "I have seen that film."', options: ["I haven't seen that film.", "I don't have seen that film.", "I haven't see that film.", "I am not seen that film."], correct: 0, explanation: "Negative form: 'have not' (haven't) + V3." },
          { id: 14, text: 'Make question: "You have finished your homework."', options: ['Have you finished your homework?', 'Do you have finished your homework?', 'Have you finish your homework?', 'You have finished your homework?'], correct: 0, explanation: 'Move "have" to the front: "Have you finished...?".' },
          { id: 15, text: 'Transform to Present Perfect: "We move into a new house." (recently, just now)', options: ['We have just moved into a new house.', 'We move into a new house just now.', 'We are moving into a new house.', 'We moved into a new house just now.'], correct: 0, explanation: 'Present Perfect with "just": "We have just moved into a new house".' },
          { id: 16, text: 'Make negative: "She has read that book."', options: ["She hasn't read that book.", "She doesn't have read that book.", "She hasn't reads that book.", "She isn't read that book."], correct: 0, explanation: "Negative form: 'has not' (hasn't) + V3." },
          { id: 17, text: 'Make question: "Your sister has got her results."', options: ['Has your sister got her results?', 'Does your sister has got her results?', 'Has your sister get her results?', 'Your sister has got her results?'], correct: 0, explanation: 'Move "has" to the front: "Has your sister got...?".' },
          { id: 18, text: 'Transform to Present Perfect: "My parents are married." (for 20 years, still married now)', options: ['My parents have been married for 20 years.', 'My parents are married for 20 years.', 'My parents were married for 20 years.', 'My parents are being married for 20 years.'], correct: 0, explanation: 'Present Perfect with "for": "My parents have been married for 20 years".' },
          { id: 19, text: 'Make negative: "I have finished my report."', options: ["I haven't finished my report.", "I don't have finished my report.", "I haven't finish my report.", "I am not finished my report."], correct: 0, explanation: "Negative form: 'have not' (haven't) + V3." },
          { id: 20, text: 'Make question: "He has broken his leg twice."', options: ['Has he broken his leg twice?', 'Does he has broken his leg twice?', 'Has he break his leg twice?', 'He has broken his leg twice?'], correct: 0, explanation: 'Move "has" to the front: "Has he broken...?".' }
        ],
        dialogue: [
          { id: 1, situation: 'Talking about homework.', dialogue: 'A: Have you finished your homework?\nB: Yes, I ___ finished it already.', options: ['have', 'am', 'was', 'did'], correct: 0, explanation: 'Present Perfect: "have finished".' },
          { id: 2, situation: 'Asking about travel experience.', dialogue: 'A: Has she ever been to Paris?\nB: Yes, she ___ visited it twice.', options: ['has', 'is', 'was', 'did'], correct: 0, explanation: 'Present Perfect: "has visited".' },
          { id: 3, situation: 'Talking about lost items.', dialogue: "A: Where are your keys?\nB: I don't know, I ___ lost them.", options: ['have', 'am', 'was', 'did'], correct: 0, explanation: 'Present Perfect: "have lost" (result matters now).' },
          { id: 4, situation: 'Discussing a phone call.', dialogue: "A: Did John call you back?\nB: No, he ___ called yet.", options: ["hasn't", "isn't", "wasn't", "doesn't"], correct: 0, explanation: 'Present Perfect negative: "hasn\'t called".' },
          { id: 5, situation: 'Talking about how long someone has lived somewhere.', dialogue: 'A: How long have you lived here?\nB: I ___ lived here for five years.', options: ['have', 'am', 'was', 'do'], correct: 0, explanation: 'Present Perfect with "for": "have lived".' },
          { id: 6, situation: 'Waiting at the airport.', dialogue: 'A: Where are the guests?\nB: They ___ just arrived.', options: ['have', 'are', 'were', 'do'], correct: 0, explanation: 'Present Perfect with "just": "have just arrived".' },
          { id: 7, situation: "Checking on a colleague's work.", dialogue: 'A: ___ she finished the project yet?\nB: Almost, just a few more details.', options: ['Has', 'Is', 'Was', 'Does'], correct: 0, explanation: 'Present Perfect question: "Has she finished...?".' },
          { id: 8, situation: 'Talking about travel experience.', dialogue: 'A: Have you ever been to Japan?\nB: No, I ___ never been there.', options: ['have', 'am', 'was', 'did'], correct: 0, explanation: 'Present Perfect: "have never been".' },
          { id: 9, situation: 'Talking about keys again.', dialogue: 'A: Why are you upset?\nB: He ___ lost his keys again.', options: ['has', 'is', 'was', 'did'], correct: 0, explanation: 'Present Perfect: "has lost".' },
          { id: 10, situation: 'Looking for a phone.', dialogue: "A: ___ you seen my phone?\nB: No, sorry, I haven't seen it.", options: ['Have', 'Are', 'Were', 'Did'], correct: 0, explanation: 'Present Perfect question: "Have you seen...?".' },
          { id: 11, situation: 'Introducing new colleagues.', dialogue: 'A: Do you two know each other?\nB: No, we ___ not met before.', options: ['have', 'are', 'were', 'did'], correct: 0, explanation: 'Present Perfect negative: "have not met".' },
          { id: 12, situation: 'Talking about a long marriage.', dialogue: 'A: How long have your parents been married?\nB: They ___ been married for 20 years.', options: ['have', 'are', 'were', 'do'], correct: 0, explanation: 'Present Perfect with "for": "have been".' },
          { id: 13, situation: 'Asking about food experience.', dialogue: 'A: ___ he ever tried sushi?\nB: Yes, he loves it!', options: ['Has', 'Is', 'Was', 'Does'], correct: 0, explanation: 'Present Perfect question: "Has he ever tried...?".' },
          { id: 14, situation: 'Talking about a book.', dialogue: 'A: Do you want to borrow this book?\nB: No thanks, she ___ already read it.', options: ['has', 'is', 'was', 'did'], correct: 0, explanation: 'Present Perfect with "already": "has already read".' },
          { id: 15, situation: 'Checking on a report.', dialogue: 'A: Can you send me the report?\nB: Sorry, I ___ not finished it yet.', options: ['have', 'am', 'was', 'do'], correct: 0, explanation: 'Present Perfect negative: "have not finished".' },
          { id: 16, situation: 'Talking about old friends.', dialogue: 'A: Are they good friends?\nB: Yes, they ___ known each other since childhood.', options: ['have', 'are', 'were', 'do'], correct: 0, explanation: 'Present Perfect with "since": "have known".' },
          { id: 17, situation: 'Asking about exam results.', dialogue: "A: ___ your sister got her results yet?\nB: Not yet, she's still waiting.", options: ['Has', 'Is', 'Was', 'Does'], correct: 0, explanation: 'Present Perfect question: "Has your sister got...?".' },
          { id: 18, situation: 'Talking about moving house.', dialogue: 'A: Are you settled in?\nB: Yes, we ___ just moved in.', options: ['have', 'are', 'were', 'do'], correct: 0, explanation: 'Present Perfect with "just": "have just moved".' },
          { id: 19, situation: 'Talking about an injury.', dialogue: 'A: Is he careful when skiing?\nB: Not really, he ___ broken his leg twice.', options: ['has', 'is', 'was', 'did'], correct: 0, explanation: 'Present Perfect: "has broken".' },
          { id: 20, situation: 'Discussing movies.', dialogue: "A: Do you want to watch this film?\nB: No, I ___ not seen it, but I've heard bad things.", options: ['have', 'am', 'was', 'do'], correct: 0, explanation: 'Present Perfect negative: "have not seen".' }
        ]
      },
      {
        id: 'present-perfect-continuous',
        title: 'Present Perfect Continuous',
        icon: '⏱️',
        guide: `## Present Perfect Continuous (Hozirgi tugallangan davomli zamon)

Present Perfect Continuous o'tmishda boshlangan va hozirgi paytgacha davom etib kelayotgan (yoki yaqindagina tugagan, lekin natijasi hali sezilib turgan) harakatni ta'kidlash uchun ishlatiladi — ko'pincha harakatning davomiyligi yoki uzluksizligi muhim bo'ladi.

## 1. Shakllanishi (Form)
• **Positive (+)**: Subject + have/has + been + Verb-ing
  - I **have been waiting** for an hour.
  - She **has been studying** all day.
• **Negative (-)**: Subject + have not (haven't) / has not (hasn't) + been + Verb-ing
  - We **haven't been sleeping** well lately.
  - He **hasn't been feeling** well.
• **Question (?)**: Have/Has + Subject + been + Verb-ing?
  - **Have** you **been waiting** long?
  - **How long has** she **been learning** English?

*(has faqat he/she/it bilan, qolganlarida have ishlatiladi; been barcha shaxslarda o'zgarmaydi)*

## 2. Ishlatilishi (Usage)
1. **O'tmishda boshlanib, hozirgi paytgacha davom etayotgan harakat, davomiylik muhim**:
   - I **have been learning** English for three years.
2. **Yaqinda tugagan, lekin natijasi hozir ko'rinib turgan harakat**:
   - Her eyes are red — she **has been crying**.
3. **Vaqtincha, uzluksiz takrorlanayotgan harakat**:
   - He **has been working** a lot recently.
4. **"How long...?" savoli bilan davomiylikni so'rash**:
   - **How long have** you **been living** here?

## 3. Present Perfect Simple bilan farqi
• **Present Perfect Simple** — natija yoki tugallanganlik muhim (nechta, nima qildi).
  - I **have painted** the fence. (fence tayyor, ish tugagan)
• **Present Perfect Continuous** — jarayon, davomiylik muhim (qancha vaqt, nima qilyapti/qildi).
  - I **have been painting** the fence. (jarayon davom etyapti yoki hozirgina tugagan, natija ikkinchi darajali)

## 4. Signal so'zlar (Time Expressions)
• for, since, all day/week/morning
• lately, recently
• how long...?`,
        questions: [
          { id: 1, text: 'I ___ been waiting for an hour.', options: ['have', 'am', 'was', 'did'], correct: 0, explanation: 'Present Perfect Continuous: I + have + been + Verb-ing.' },
          { id: 2, text: 'She ___ been studying all day.', options: ['has', 'is', 'was', 'did'], correct: 0, explanation: 'Present Perfect Continuous: she + has + been + Verb-ing.' },
          { id: 3, text: '___ you been waiting long?', options: ['Have', 'Are', 'Were', 'Did'], correct: 0, explanation: 'Present Perfect Continuous question: Have + subject + been + Verb-ing?' },
          { id: 4, text: 'We ___ not been sleeping well lately.', options: ['have', 'are', 'were', 'do'], correct: 0, explanation: 'Present Perfect Continuous negative: have not + been + Verb-ing.' },
          { id: 5, text: 'He ___ been feeling sick since Monday.', options: ['has', 'is', 'was', 'does'], correct: 0, explanation: 'Present Perfect Continuous: has + been + feeling.' },
          { id: 6, text: 'How long ___ you been learning English?', options: ['have', 'are', 'were', 'do'], correct: 0, explanation: '"How long" + have/has + subject + been + Verb-ing.' },
          { id: 7, text: 'Her eyes are red — she ___ been crying.', options: ['has', 'is', 'was', 'does'], correct: 0, explanation: 'Present Perfect Continuous: has + been + crying (recent evidence).' },
          { id: 8, text: 'They ___ been working hard recently.', options: ['have', 'are', 'were', 'do'], correct: 0, explanation: 'Present Perfect Continuous: have + been + working.' },
          { id: 9, text: '___ it been raining all morning?', options: ['Has', 'Is', 'Was', 'Does'], correct: 0, explanation: 'Present Perfect Continuous question: Has + it + been + raining?' },
          { id: 10, text: 'I ___ been running every day this month.', options: ['have', 'am', 'was', 'do'], correct: 0, explanation: 'Present Perfect Continuous: have + been + running.' },
          { id: 11, text: 'She ___ not been reading much lately.', options: ['has', 'is', 'was', 'does'], correct: 0, explanation: 'Present Perfect Continuous negative: has not + been + reading.' },
          { id: 12, text: 'We ___ been playing tennis together for years.', options: ['have', 'are', 'were', 'do'], correct: 0, explanation: 'Present Perfect Continuous: have + been + playing.' },
          { id: 13, text: '___ they been talking about the project all day?', options: ['Have', 'Are', 'Were', 'Do'], correct: 0, explanation: 'Present Perfect Continuous question: Have + they + been + talking?' },
          { id: 14, text: 'I ___ been cooking since noon.', options: ['have', 'am', 'was', 'do'], correct: 0, explanation: 'Present Perfect Continuous: have + been + cooking.' },
          { id: 15, text: 'He ___ been exercising every morning this week.', options: ['has', 'is', 'was', 'does'], correct: 0, explanation: 'Present Perfect Continuous: has + been + exercising.' },
          { id: 16, text: 'You ___ not been watching too much TV, have you?', options: ['have', 'are', 'were', 'do'], correct: 0, explanation: 'Present Perfect Continuous negative: have not + been + watching.' },
          { id: 17, text: 'How long ___ she been texting him?', options: ['has', 'is', 'was', 'does'], correct: 0, explanation: '"How long" + has + subject + been + Verb-ing.' },
          { id: 18, text: 'We ___ been arguing about this all week.', options: ['have', 'are', 'were', 'do'], correct: 0, explanation: 'Present Perfect Continuous: have + been + arguing.' },
          { id: 19, text: '___ he been practicing the piano lately?', options: ['Has', 'Is', 'Was', 'Does'], correct: 0, explanation: 'Present Perfect Continuous question: Has + he + been + practicing?' },
          { id: 20, text: 'I ___ been driving for six hours straight.', options: ['have', 'am', 'was', 'do'], correct: 0, explanation: 'Present Perfect Continuous: have + been + driving.' }
        ],
        fillBlanks: [
          { id: 1, text: 'I ___ (wait) for an hour.', options: ['have been waiting', 'have been wait', 'am waiting', 'was waiting'], correct: 0, explanation: 'Present Perfect Continuous: have + been + Verb-ing.' },
          { id: 2, text: 'She ___ (study) all day.', options: ['has been studying', 'has been study', 'is studying', 'was studying'], correct: 0, explanation: 'Present Perfect Continuous: has + been + studying.' },
          { id: 3, text: '___ (you / wait) long?', options: ['Have you been waiting', 'Have you been wait', 'Are you waiting', 'Were you waiting'], correct: 0, explanation: 'Present Perfect Continuous question: Have + subject + been + Verb-ing.' },
          { id: 4, text: 'We ___ (not / sleep) well lately.', options: ["haven't been sleeping", "haven't been sleep", "aren't sleeping", "weren't sleeping"], correct: 0, explanation: "Present Perfect Continuous negative: haven't + been + Verb-ing." },
          { id: 5, text: 'He ___ (feel) sick since Monday.', options: ['has been feeling', 'has been feel', 'is feeling', 'was feeling'], correct: 0, explanation: 'Present Perfect Continuous: has + been + feeling.' },
          { id: 6, text: 'How long ___ (you / learn) English?', options: ['have you been learning', 'have you been learn', 'are you learning', 'were you learning'], correct: 0, explanation: '"How long" + have + subject + been + Verb-ing.' },
          { id: 7, text: "She ___ (cry) — her eyes are red.", options: ['has been crying', 'has been cry', 'is crying', 'was crying'], correct: 0, explanation: 'Present Perfect Continuous: has + been + crying.' },
          { id: 8, text: 'They ___ (work) hard recently.', options: ['have been working', 'have been work', 'are working', 'were working'], correct: 0, explanation: 'Present Perfect Continuous: have + been + working.' },
          { id: 9, text: '___ (it / rain) all morning?', options: ['Has it been raining', 'Has it been rain', 'Is it raining', 'Was it raining'], correct: 0, explanation: 'Present Perfect Continuous question: Has + it + been + raining.' },
          { id: 10, text: 'I ___ (run) every day this month.', options: ['have been running', 'have been run', 'am running', 'was running'], correct: 0, explanation: 'Present Perfect Continuous: have + been + running.' },
          { id: 11, text: 'She ___ (not / read) much lately.', options: ["hasn't been reading", "hasn't been read", "isn't reading", "wasn't reading"], correct: 0, explanation: "Present Perfect Continuous negative: hasn't + been + Verb-ing." },
          { id: 12, text: 'We ___ (play) tennis together for years.', options: ['have been playing', 'have been play', 'are playing', 'were playing'], correct: 0, explanation: 'Present Perfect Continuous: have + been + playing.' },
          { id: 13, text: '___ (they / talk) about the project all day?', options: ['Have they been talking', 'Have they been talk', 'Are they talking', 'Were they talking'], correct: 0, explanation: 'Present Perfect Continuous question: Have + subject + been + Verb-ing.' },
          { id: 14, text: 'I ___ (cook) since noon.', options: ['have been cooking', 'have been cook', 'am cooking', 'was cooking'], correct: 0, explanation: 'Present Perfect Continuous: have + been + cooking.' },
          { id: 15, text: 'He ___ (exercise) every morning this week.', options: ['has been exercising', 'has been exercise', 'is exercising', 'was exercising'], correct: 0, explanation: 'Present Perfect Continuous: has + been + exercising.' },
          { id: 16, text: "You ___ (not / watch) too much TV, have you?", options: ["haven't been watching", "haven't been watch", "aren't watching", "weren't watching"], correct: 0, explanation: "Present Perfect Continuous negative: haven't + been + Verb-ing." },
          { id: 17, text: 'How long ___ (she / text) him?', options: ['has she been texting', 'has she been text', 'is she texting', 'was she texting'], correct: 0, explanation: '"How long" + has + subject + been + Verb-ing.' },
          { id: 18, text: 'We ___ (argue) about this all week.', options: ['have been arguing', 'have been argue', 'are arguing', 'were arguing'], correct: 0, explanation: 'Present Perfect Continuous: have + been + arguing.' },
          { id: 19, text: '___ (he / practice) the piano lately?', options: ['Has he been practicing', 'Has he been practice', 'Is he practicing', 'Was he practicing'], correct: 0, explanation: 'Present Perfect Continuous question: Has + subject + been + Verb-ing.' },
          { id: 20, text: 'I ___ (drive) for six hours straight.', options: ['have been driving', 'have been drive', 'am driving', 'was driving'], correct: 0, explanation: 'Present Perfect Continuous: have + been + driving.' }
        ],
        scrambled: [
          { id: 1, words: ['waiting', 'I', 'have', 'been', 'for', 'an', 'hour'], answer: 'I have been waiting for an hour', explanation: 'Subject + have + been + Verb-ing + duration.' },
          { id: 2, words: ['studying', 'she', 'has', 'been', 'all', 'day'], answer: 'she has been studying all day', explanation: 'Subject + has + been + Verb-ing + duration.' },
          { id: 3, words: ['waiting', 'have', 'you', 'been', 'long', '?'], answer: 'have you been waiting long', explanation: 'Have + subject + been + Verb-ing?' },
          { id: 4, words: ['sleeping', 'we', "haven't", 'been', 'well', 'lately'], answer: "we haven't been sleeping well lately", explanation: "Subject + haven't + been + Verb-ing + adverb." },
          { id: 5, words: ['feeling', 'he', 'has', 'been', 'sick', 'since', 'Monday'], answer: 'he has been feeling sick since Monday', explanation: 'Subject + has + been + Verb-ing + since + point in time.' },
          { id: 6, words: ['learning', 'you', 'have', 'been', 'how', 'long', 'English', '?'], answer: 'how long have you been learning English', explanation: 'How long + have + subject + been + Verb-ing + object?' },
          { id: 7, words: ['crying', 'she', 'has', 'been'], answer: 'she has been crying', explanation: 'Subject + has + been + Verb-ing.' },
          { id: 8, words: ['working', 'they', 'have', 'been', 'hard', 'recently'], answer: 'they have been working hard recently', explanation: 'Subject + have + been + Verb-ing + adverb.' },
          { id: 9, words: ['raining', 'has', 'it', 'been', 'all', 'morning', '?'], answer: 'has it been raining all morning', explanation: 'Has + it + been + Verb-ing?' },
          { id: 10, words: ['running', 'I', 'have', 'been', 'every', 'day', 'this', 'month'], answer: 'I have been running every day this month', explanation: 'Subject + have + been + Verb-ing + time.' },
          { id: 11, words: ['reading', 'she', "hasn't", 'been', 'much', 'lately'], answer: "she hasn't been reading much lately", explanation: "Subject + hasn't + been + Verb-ing + adverb." },
          { id: 12, words: ['playing', 'we', 'have', 'been', 'tennis', 'together', 'for', 'years'], answer: 'we have been playing tennis together for years', explanation: 'Subject + have + been + Verb-ing + object + duration.' },
          { id: 13, words: ['talking', 'have', 'they', 'been', 'about', 'the', 'project', 'all', 'day', '?'], answer: 'have they been talking about the project all day', explanation: 'Have + subject + been + Verb-ing?' },
          { id: 14, words: ['cooking', 'I', 'have', 'been', 'since', 'noon'], answer: 'I have been cooking since noon', explanation: 'Subject + have + been + Verb-ing + since + point in time.' },
          { id: 15, words: ['exercising', 'he', 'has', 'been', 'every', 'morning', 'this', 'week'], answer: 'he has been exercising every morning this week', explanation: 'Subject + has + been + Verb-ing + time.' },
          { id: 16, words: ['watching', 'you', "haven't", 'been', 'too', 'much', 'TV'], answer: "you haven't been watching too much TV", explanation: "Subject + haven't + been + Verb-ing + object." },
          { id: 17, words: ['texting', 'she', 'has', 'been', 'how', 'long', 'him', '?'], answer: 'how long has she been texting him', explanation: 'How long + has + subject + been + Verb-ing + object?' },
          { id: 18, words: ['arguing', 'we', 'have', 'been', 'about', 'this', 'all', 'week'], answer: 'we have been arguing about this all week', explanation: 'Subject + have + been + Verb-ing + object.' },
          { id: 19, words: ['practicing', 'has', 'he', 'been', 'the', 'piano', 'lately', '?'], answer: 'has he been practicing the piano lately', explanation: 'Has + subject + been + Verb-ing?' },
          { id: 20, words: ['driving', 'I', 'have', 'been', 'for', 'six', 'hours', 'straight'], answer: 'I have been driving for six hours straight', explanation: 'Subject + have + been + Verb-ing + duration.' }
        ],
        errorCorrection: [
          { id: 1, text: 'I have been wait for an hour.', options: ['I', 'have been', 'wait', 'for an hour'], correct: 2, wrongPart: 'wait', correction: 'waiting', explanation: 'After "have been", use the "-ing" form: "waiting".' },
          { id: 2, text: 'She have been studying all day.', options: ['She', 'have', 'been studying', 'all day'], correct: 1, wrongPart: 'have', correction: 'has', explanation: '"She" is third person singular, so use "has", not "have".' },
          { id: 3, text: 'You been waiting long?', options: ['You', 'been', 'waiting', 'long?'], correct: 0, wrongPart: 'You', correction: 'Have you', explanation: 'Present Perfect Continuous questions start with "Have/Has": "Have you been waiting...?".' },
          { id: 4, text: "We haven't sleeping well lately.", options: ['We', "haven't", 'sleeping', 'well lately'], correct: 1, wrongPart: "haven't", correction: "haven't been", explanation: "Present Perfect Continuous negative needs \"been\": \"haven't been sleeping\"." },
          { id: 5, text: 'He has been feels sick since Monday.', options: ['He', 'has been', 'feels', 'sick since Monday'], correct: 2, wrongPart: 'feels', correction: 'feeling', explanation: 'After "has been", use the "-ing" form: "feeling".' },
          { id: 6, text: 'How long you have been learning English?', options: ['How long', 'you have been', 'learning', 'English?'], correct: 1, wrongPart: 'you have been', correction: 'have you been', explanation: 'Question order: "How long" + have + subject + been: "how long have you been".' },
          { id: 7, text: 'She has cried been all morning.', options: ['She', 'has cried been', 'all morning', 'No error'], correct: 1, wrongPart: 'has cried been', correction: 'has been crying', explanation: 'Correct order is "has been" + Verb-ing: "has been crying".' },
          { id: 8, text: 'They has been working hard recently.', options: ['They', 'has been', 'working hard', 'recently'], correct: 1, wrongPart: 'has been', correction: 'have been', explanation: '"They" takes "have", not "has": "have been working".' },
          { id: 9, text: 'Has it been rains all morning?', options: ['Has', 'it been', 'rains', 'all morning?'], correct: 2, wrongPart: 'rains', correction: 'raining', explanation: 'After "been", use the "-ing" form: "raining".' },
          { id: 10, text: 'I have running every day this month.', options: ['I', 'have', 'running', 'every day this month'], correct: 1, wrongPart: 'have', correction: 'have been', explanation: 'Present Perfect Continuous needs "been": "have been running".' },
          { id: 11, text: "She hasn't been read much lately.", options: ['She', "hasn't been", 'read', 'much lately'], correct: 2, wrongPart: 'read', correction: 'reading', explanation: "After \"hasn't been\", use the \"-ing\" form: \"reading\"." },
          { id: 12, text: 'We have been played tennis for years.', options: ['We', 'have been', 'played', 'tennis for years'], correct: 2, wrongPart: 'played', correction: 'playing', explanation: 'After "have been", use the "-ing" form: "playing".' },
          { id: 13, text: 'Have they talking about the project all day?', options: ['Have', 'they', 'talking', 'about the project all day?'], correct: 2, wrongPart: 'talking', correction: 'been talking', explanation: 'Present Perfect Continuous questions need "been": "been talking".' },
          { id: 14, text: 'I have been cook since noon.', options: ['I', 'have been', 'cook', 'since noon'], correct: 2, wrongPart: 'cook', correction: 'cooking', explanation: 'After "have been", use the "-ing" form: "cooking".' },
          { id: 15, text: 'He have been exercising every morning.', options: ['He', 'have been', 'exercising', 'every morning'], correct: 1, wrongPart: 'have been', correction: 'has been', explanation: '"He" is third person singular, so use "has", not "have".' },
          { id: 16, text: "You haven't watching too much TV, have you?", options: ['You', "haven't", 'watching', 'too much TV, have you?'], correct: 1, wrongPart: "haven't", correction: "haven't been", explanation: "Present Perfect Continuous negative needs \"been\": \"haven't been watching\"." },
          { id: 17, text: 'How long has she texting been him?', options: ['How long', 'has she', 'texting been', 'him?'], correct: 2, wrongPart: 'texting been', correction: 'been texting', explanation: 'Correct order is "been" + Verb-ing: "been texting".' },
          { id: 18, text: 'We have been argue about this all week.', options: ['We', 'have been', 'argue', 'about this all week'], correct: 2, wrongPart: 'argue', correction: 'arguing', explanation: 'After "have been", use the "-ing" form: "arguing".' },
          { id: 19, text: 'Has he practicing been the piano lately?', options: ['Has', 'he', 'practicing been', 'the piano lately?'], correct: 2, wrongPart: 'practicing been', correction: 'been practicing', explanation: 'Correct order is "been" + Verb-ing: "been practicing".' },
          { id: 20, text: 'I has been driving for six hours straight.', options: ['I', 'has been', 'driving', 'for six hours straight'], correct: 1, wrongPart: 'has been', correction: 'have been', explanation: '"I" takes "have", not "has": "have been driving".' }
        ],
        transform: [
          { id: 1, text: 'Make negative: "I have been waiting for an hour."', options: ["I haven't been waiting for an hour.", "I don't have been waiting for an hour.", "I haven't been wait for an hour.", "I am not been waiting for an hour."], correct: 0, explanation: "Present Perfect Continuous negative: haven't been + Verb-ing." },
          { id: 2, text: 'Make question: "She has been studying all day."', options: ['Has she been studying all day?', 'Does she has been studying all day?', 'Has she been study all day?', 'She has been studying all day?'], correct: 0, explanation: 'Move "has" to the front: "Has she been studying...?".' },
          { id: 3, text: 'Transform to Present Perfect Continuous: "I learn English." (for three years, still learning)', options: ['I have been learning English for three years.', 'I learn English for three years.', 'I am learning English for three years.', 'I learned English for three years.'], correct: 0, explanation: 'Present Perfect Continuous with "for": "I have been learning English for three years".' },
          { id: 4, text: 'Make negative: "We have been sleeping well."', options: ["We haven't been sleeping well.", "We don't have been sleeping well.", "We haven't been sleep well.", "We aren't been sleeping well."], correct: 0, explanation: "Negative form: 'have not' (haven't) + been + Verb-ing." },
          { id: 5, text: 'Make question: "He has been feeling sick."', options: ['Has he been feeling sick?', 'Does he has been feeling sick?', 'Has he been feel sick?', 'He has been feeling sick?'], correct: 0, explanation: 'Move "has" to the front: "Has he been feeling...?".' },
          { id: 6, text: 'Transform to Present Perfect Continuous: "They work hard." (recently, still ongoing)', options: ['They have been working hard recently.', 'They work hard recently.', 'They are working hard recently.', 'They worked hard recently.'], correct: 0, explanation: 'Present Perfect Continuous: "They have been working hard recently".' },
          { id: 7, text: 'Make negative: "She has been reading much."', options: ["She hasn't been reading much.", "She doesn't have been reading much.", "She hasn't been read much.", "She isn't been reading much."], correct: 0, explanation: "Negative form: 'has not' (hasn't) + been + Verb-ing." },
          { id: 8, text: 'Make question: "It has been raining all morning."', options: ['Has it been raining all morning?', 'Does it has been raining all morning?', 'Has it been rain all morning?', 'It has been raining all morning?'], correct: 0, explanation: 'Move "has" to the front: "Has it been raining...?".' },
          { id: 9, text: 'Transform to Present Perfect Continuous: "I run every day." (this month, still continuing)', options: ['I have been running every day this month.', 'I run every day this month.', 'I am running every day this month.', 'I ran every day this month.'], correct: 0, explanation: 'Present Perfect Continuous: "I have been running every day this month".' },
          { id: 10, text: 'Make negative: "They have been arguing."', options: ["They haven't been arguing.", "They don't have been arguing.", "They haven't been argue.", "They aren't been arguing."], correct: 0, explanation: "Negative form: 'have not' (haven't) + been + Verb-ing." },
          { id: 11, text: 'Make question: "They have been talking about it."', options: ['Have they been talking about it?', 'Do they have been talking about it?', 'Have they been talk about it?', 'They have been talking about it?'], correct: 0, explanation: 'Move "have" to the front: "Have they been talking...?".' },
          { id: 12, text: 'Transform to Present Perfect Continuous: "We play tennis together." (for years, still playing)', options: ['We have been playing tennis together for years.', 'We play tennis together for years.', 'We are playing tennis together for years.', 'We played tennis together for years.'], correct: 0, explanation: 'Present Perfect Continuous with "for": "We have been playing tennis together for years".' },
          { id: 13, text: 'Make negative: "You have been watching too much TV."', options: ["You haven't been watching too much TV.", "You don't have been watching too much TV.", "You haven't been watch too much TV.", "You aren't been watching too much TV."], correct: 0, explanation: "Negative form: 'have not' (haven't) + been + Verb-ing." },
          { id: 14, text: 'Make question: "She has been texting him."', options: ['Has she been texting him?', 'Does she has been texting him?', 'Has she been text him?', 'She has been texting him?'], correct: 0, explanation: 'Move "has" to the front: "Has she been texting...?".' },
          { id: 15, text: 'Transform to Present Perfect Continuous: "He practices the piano." (lately, still ongoing)', options: ['He has been practicing the piano lately.', 'He practices the piano lately.', 'He is practicing the piano lately.', 'He practiced the piano lately.'], correct: 0, explanation: 'Present Perfect Continuous: "He has been practicing the piano lately".' },
          { id: 16, text: 'Make negative: "I have been driving for six hours."', options: ["I haven't been driving for six hours.", "I don't have been driving for six hours.", "I haven't been drive for six hours.", "I am not been driving for six hours."], correct: 0, explanation: "Negative form: 'have not' (haven't) + been + Verb-ing." },
          { id: 17, text: 'Make question: "You have been waiting long."', options: ['Have you been waiting long?', 'Do you have been waiting long?', 'Have you been wait long?', 'You have been waiting long?'], correct: 0, explanation: 'Move "have" to the front: "Have you been waiting...?".' },
          { id: 18, text: 'Transform to Present Perfect Continuous: "We cook." (since noon, still cooking)', options: ['We have been cooking since noon.', 'We cook since noon.', 'We are cooking since noon.', 'We cooked since noon.'], correct: 0, explanation: 'Present Perfect Continuous with "since": "We have been cooking since noon".' },
          { id: 19, text: 'Make negative: "He has been exercising every day."', options: ["He hasn't been exercising every day.", "He doesn't have been exercising every day.", "He hasn't been exercise every day.", "He isn't been exercising every day."], correct: 0, explanation: "Negative form: 'has not' (hasn't) + been + Verb-ing." },
          { id: 20, text: 'Transform to Present Perfect Continuous: "She feels tired." (all week, still feeling tired)', options: ['She has been feeling tired all week.', 'She feels tired all week.', 'She is feeling tired all week.', 'She felt tired all week.'], correct: 0, explanation: 'Present Perfect Continuous: "She has been feeling tired all week".' }
        ],
        dialogue: [
          { id: 1, situation: 'Waiting for a friend.', dialogue: "A: Sorry I'm late!\nB: It's fine, I ___ been waiting for only ten minutes.", options: ['have', 'am', 'was', 'did'], correct: 0, explanation: 'Present Perfect Continuous: "have been waiting".' },
          { id: 2, situation: 'Checking on exam prep.', dialogue: 'A: Is she ready for the exam?\nB: Yes, she ___ been studying all day.', options: ['has', 'is', 'was', 'did'], correct: 0, explanation: 'Present Perfect Continuous: "has been studying".' },
          { id: 3, situation: 'Asking about someone at the bus stop.', dialogue: '___ you been waiting long?\nB: Yes, about half an hour.', options: ['Have', 'Are', 'Were', 'Did'], correct: 0, explanation: 'Present Perfect Continuous question: "Have you been waiting...?".' },
          { id: 4, situation: 'Talking about tiredness.', dialogue: 'A: You look tired.\nB: Yeah, we ___ not been sleeping well lately.', options: ['have', 'are', 'were', 'do'], correct: 0, explanation: 'Present Perfect Continuous negative: "have not been sleeping".' },
          { id: 5, situation: 'Asking about health.', dialogue: 'A: Why is he staying home?\nB: He ___ been feeling sick since Monday.', options: ['has', 'is', 'was', 'does'], correct: 0, explanation: 'Present Perfect Continuous: "has been feeling".' },
          { id: 6, situation: 'Talking about language learning.', dialogue: 'A: Your English is great! How long ___ you been learning it?\nB: For three years.', options: ['have', 'are', 'were', 'do'], correct: 0, explanation: '"How long" + have + subject + been + Verb-ing.' },
          { id: 7, situation: 'Noticing someone upset.', dialogue: "A: What's wrong with her?\nB: She ___ been crying — her eyes are red.", options: ['has', 'is', 'was', 'does'], correct: 0, explanation: 'Present Perfect Continuous: "has been crying".' },
          { id: 8, situation: 'Talking about overtime.', dialogue: 'A: They look exhausted.\nB: Yeah, they ___ been working hard recently.', options: ['have', 'are', 'were', 'do'], correct: 0, explanation: 'Present Perfect Continuous: "have been working".' },
          { id: 9, situation: 'Checking the weather.', dialogue: '___ it been raining all morning?\nB: Yes, non-stop.', options: ['Has', 'Is', 'Was', 'Does'], correct: 0, explanation: 'Present Perfect Continuous question: "Has it been raining...?".' },
          { id: 10, situation: 'Talking about fitness.', dialogue: "A: You're in great shape!\nB: Thanks, I ___ been running every day this month.", options: ['have', 'am', 'was', 'do'], correct: 0, explanation: 'Present Perfect Continuous: "have been running".' },
          { id: 11, situation: 'Talking about hobbies.', dialogue: 'A: Does she still read a lot?\nB: Actually, she ___ not been reading much lately.', options: ['has', 'is', 'was', 'does'], correct: 0, explanation: 'Present Perfect Continuous negative: "has not been reading".' },
          { id: 12, situation: 'Talking about a friendship.', dialogue: 'A: Do you and Tom play sports together?\nB: Yes, we ___ been playing tennis together for years.', options: ['have', 'are', 'were', 'do'], correct: 0, explanation: 'Present Perfect Continuous: "have been playing".' },
          { id: 13, situation: 'Checking on a meeting.', dialogue: "___ they been talking about the project all day?\nB: Yes, they still haven't decided anything.", options: ['Have', 'Are', 'Were', 'Do'], correct: 0, explanation: 'Present Perfect Continuous question: "Have they been talking...?".' },
          { id: 14, situation: 'Talking about smells in the kitchen.', dialogue: 'A: Something smells great!\nB: I ___ been cooking since noon.', options: ['have', 'am', 'was', 'do'], correct: 0, explanation: 'Present Perfect Continuous: "have been cooking".' },
          { id: 15, situation: 'Talking about fitness habits.', dialogue: 'A: He looks so fit lately.\nB: He ___ been exercising every morning this week.', options: ['has', 'is', 'was', 'does'], correct: 0, explanation: 'Present Perfect Continuous: "has been exercising".' },
          { id: 16, situation: 'Worrying about screen time.', dialogue: "A: You ___ not been watching too much TV, have you?\nB: No, don't worry.", options: ['have', 'are', 'were', 'do'], correct: 0, explanation: 'Present Perfect Continuous negative: "have not been watching".' },
          { id: 17, situation: 'Gossiping about a relationship.', dialogue: 'A: How long ___ she been texting him?\nB: For a couple of weeks now.', options: ['has', 'is', 'was', 'does'], correct: 0, explanation: '"How long" + has + subject + been + Verb-ing.' },
          { id: 18, situation: 'Talking about a disagreement.', dialogue: 'A: Are you two okay?\nB: Not really, we ___ been arguing about this all week.', options: ['have', 'are', 'were', 'do'], correct: 0, explanation: 'Present Perfect Continuous: "have been arguing".' },
          { id: 19, situation: 'Talking about music practice.', dialogue: '___ he been practicing the piano lately?\nB: Yes, every single day.', options: ['Has', 'Is', 'Was', 'Does'], correct: 0, explanation: 'Present Perfect Continuous question: "Has he been practicing...?".' },
          { id: 20, situation: 'Talking about a road trip.', dialogue: 'A: You must be exhausted.\nB: Yeah, I ___ been driving for six hours straight.', options: ['have', 'am', 'was', 'do'], correct: 0, explanation: 'Present Perfect Continuous: "have been driving".' }
        ]
      },
      {
        id: 'passive-voice',
        title: 'Passive Voice',
        icon: '🎭',
        guide: `## Passive Voice (Majhul nisbat)

Passive Voice harakatni bajaruvchi shaxs emas, balki harakat ta'sir etuvchi ob'ekt (yoki harakatning o'zi) muhim bo'lganda ishlatiladi. Bu bo'limda Present Simple va Past Simple zamonlaridagi passiv gaplarni o'rganamiz.

## 1. Shakllanishi (Form)
• **Present Simple Passive**: Subject + am/is/are + Past Participle (V3)
  - English **is spoken** all over the world.
  - Cars **are made** in this factory.
• **Past Simple Passive**: Subject + was/were + Past Participle (V3)
  - The letter **was sent** yesterday.
  - These houses **were built** in 1990.
• **Negative**: am/is/are/was/were + not + V3
  - The window **wasn't broken** by me.
• **Question**: Am/Is/Are/Was/Were + Subject + V3?
  - **Is** this book **written** in English?
  - **Were** the windows **cleaned** yesterday?

*(Bajaruvchi shaxs ko'rsatilsa, "by" bilan qo'shiladi: The book was written **by** Shakespeare.)*

## 2. Ishlatilishi (Usage)
1. **Harakatni bajaruvchi shaxs noma'lum yoki muhim emas**:
   - My car **was stolen** last night. (kim o'g'irlaganini bilmaymiz)
2. **Harakat natijasi yoki ob'ekt harakat bajaruvchisidan ko'ra muhimroq**:
   - This bridge **was built** in 1889.
3. **Rasmiy, ilmiy yoki gazeta uslubidagi matnlar**:
   - Mistakes **were made** during the process.
4. **Umumiy haqiqatlar va jarayonlar**:
   - Rice **is grown** in many countries.

## 3. Active vs Passive
• **Active**: Subject (bajaruvchi) + Verb + Object
  - Shakespeare **wrote** this play. (Shakespeare — bajaruvchi, muhim)
• **Passive**: Object (natija) + be + V3 (+ by + bajaruvchi)
  - This play **was written** by Shakespeare. (play — natija, birinchi o'rinda)

## 4. Signal so'zlar / Eslatmalar
• by + bajaruvchi (agar muhim bo'lsa)
• Faqat o'timli fe'llar (transitive verbs) passiv shaklga o'tkaziladi
• Present Simple Passive: umumiy haqiqatlar; Past Simple Passive: o'tmishda tugallangan harakatlar`,
        questions: [
          { id: 1, text: 'English ___ spoken in many countries.', options: ['is', 'are', 'was', 'be'], correct: 0, explanation: 'Present Simple Passive: subject (singular) + is + V3.' },
          { id: 2, text: 'Cars ___ made in this factory.', options: ['are', 'is', 'was', 'be'], correct: 0, explanation: 'Present Simple Passive: subject (plural) + are + V3.' },
          { id: 3, text: 'The letter ___ sent yesterday.', options: ['was', 'is', 'were', 'be'], correct: 0, explanation: 'Past Simple Passive: subject (singular) + was + V3.' },
          { id: 4, text: 'These houses ___ built in 1990.', options: ['were', 'was', 'are', 'be'], correct: 0, explanation: 'Past Simple Passive: subject (plural) + were + V3.' },
          { id: 5, text: '___ this book written in English?', options: ['Is', 'Are', 'Was', 'Does'], correct: 0, explanation: 'Passive question: Is + subject + V3?' },
          { id: 6, text: 'The window ___ not broken by me.', options: ['was', 'is', 'were', 'did'], correct: 0, explanation: 'Passive negative: was + not + V3.' },
          { id: 7, text: '___ the windows cleaned yesterday?', options: ['Were', 'Was', 'Are', 'Did'], correct: 0, explanation: 'Passive question: Were + subject (plural) + V3?' },
          { id: 8, text: 'My car ___ stolen last night.', options: ['was', 'is', 'were', 'did'], correct: 0, explanation: 'Past Simple Passive: subject (singular) + was + V3.' },
          { id: 9, text: 'This bridge ___ built in 1889.', options: ['was', 'is', 'were', 'did'], correct: 0, explanation: 'Past Simple Passive: was + V3.' },
          { id: 10, text: 'Rice ___ grown in many countries.', options: ['is', 'are', 'was', 'be'], correct: 0, explanation: 'Present Simple Passive: is + V3.' },
          { id: 11, text: 'This play ___ written by Shakespeare.', options: ['was', 'is', 'were', 'did'], correct: 0, explanation: 'Past Simple Passive: was + V3 + by + agent.' },
          { id: 12, text: 'These cakes ___ baked fresh every morning.', options: ['are', 'is', 'was', 'be'], correct: 0, explanation: 'Present Simple Passive: are + V3.' },
          { id: 13, text: '___ the report finished on time?', options: ['Was', 'Is', 'Were', 'Did'], correct: 0, explanation: 'Passive question: Was + subject + V3?' },
          { id: 14, text: 'The museum ___ visited by thousands of tourists every year.', options: ['is', 'are', 'was', 'be'], correct: 0, explanation: 'Present Simple Passive: is + V3.' },
          { id: 15, text: 'These photos ___ taken during the war.', options: ['were', 'was', 'are', 'be'], correct: 0, explanation: 'Past Simple Passive: were + V3.' },
          { id: 16, text: 'This song ___ not written by her.', options: ['was', 'is', 'were', 'did'], correct: 0, explanation: 'Passive negative: was + not + V3.' },
          { id: 17, text: 'Coffee ___ exported from Brazil.', options: ['is', 'are', 'was', 'be'], correct: 0, explanation: 'Present Simple Passive: is + V3.' },
          { id: 18, text: '___ the tickets sold already?', options: ['Were', 'Was', 'Are', 'Did'], correct: 0, explanation: 'Passive question: Were + subject (plural) + V3?' },
          { id: 19, text: 'The email ___ delivered this morning.', options: ['was', 'is', 'were', 'did'], correct: 0, explanation: 'Past Simple Passive: was + V3.' },
          { id: 20, text: 'These rules ___ followed by everyone.', options: ['are', 'is', 'was', 'be'], correct: 0, explanation: 'Present Simple Passive: are + V3.' }
        ],
        fillBlanks: [
          { id: 1, text: 'This letter ___ (write) by John.', options: ['was written', 'was write', 'is written', 'wrote'], correct: 0, explanation: 'Past Simple Passive: was + V3 (written).' },
          { id: 2, text: 'English ___ (speak) all over the world.', options: ['is spoken', 'is speak', 'was spoken', 'speaks'], correct: 0, explanation: 'Present Simple Passive: is + V3 (spoken).' },
          { id: 3, text: 'These cars ___ (make) in Germany.', options: ['are made', 'are make', 'were made', 'make'], correct: 0, explanation: 'Present Simple Passive: are + V3 (made).' },
          { id: 4, text: 'The bridge ___ (build) in 1889.', options: ['was built', 'was build', 'is built', 'built'], correct: 0, explanation: 'Past Simple Passive: was + V3 (built).' },
          { id: 5, text: '___ (this book / write) in English?', options: ['Is this book written', 'Is this book write', 'Was this book written', 'Does this book write'], correct: 0, explanation: 'Present Simple Passive question: Is + subject + V3.' },
          { id: 6, text: 'My car ___ (not / steal).', options: ["wasn't stolen", "wasn't steal", "isn't stolen", "didn't steal"], correct: 0, explanation: "Past Simple Passive negative: wasn't + V3 (stolen)." },
          { id: 7, text: 'Rice ___ (grow) in many countries.', options: ['is grown', 'is grow', 'was grown', 'grows'], correct: 0, explanation: 'Present Simple Passive: is + V3 (grown).' },
          { id: 8, text: 'These photos ___ (take) during the war.', options: ['were taken', 'were take', 'are taken', 'took'], correct: 0, explanation: 'Past Simple Passive: were + V3 (taken).' },
          { id: 9, text: '___ (the windows / clean) yesterday?', options: ['Were the windows cleaned', 'Were the windows clean', 'Are the windows cleaned', 'Did the windows clean'], correct: 0, explanation: 'Past Simple Passive question: Were + subject + V3.' },
          { id: 10, text: 'This song ___ (not / write) by her.', options: ["wasn't written", "wasn't write", "isn't written", "didn't write"], correct: 0, explanation: "Past Simple Passive negative: wasn't + V3 (written)." },
          { id: 11, text: 'Coffee ___ (export) from Brazil.', options: ['is exported', 'is export', 'was exported', 'exports'], correct: 0, explanation: 'Present Simple Passive: is + V3 (exported).' },
          { id: 12, text: 'The museum ___ (visit) by thousands of tourists every year.', options: ['is visited', 'is visit', 'was visited', 'visits'], correct: 0, explanation: 'Present Simple Passive: is + V3 (visited).' },
          { id: 13, text: '___ (the report / finish) on time?', options: ['Was the report finished', 'Was the report finish', 'Is the report finished', 'Did the report finish'], correct: 0, explanation: 'Past Simple Passive question: Was + subject + V3.' },
          { id: 14, text: 'These cakes ___ (bake) fresh every morning.', options: ['are baked', 'are bake', 'were baked', 'bakes'], correct: 0, explanation: 'Present Simple Passive: are + V3 (baked).' },
          { id: 15, text: 'The email ___ (deliver) this morning.', options: ['was delivered', 'was deliver', 'is delivered', 'delivered'], correct: 0, explanation: 'Past Simple Passive: was + V3 (delivered).' },
          { id: 16, text: 'These rules ___ (follow) by everyone.', options: ['are followed', 'are follow', 'were followed', 'follows'], correct: 0, explanation: 'Present Simple Passive: are + V3 (followed).' },
          { id: 17, text: '___ (the tickets / sell) already?', options: ['Were the tickets sold', 'Were the tickets sell', 'Are the tickets sold', 'Did the tickets sell'], correct: 0, explanation: 'Past Simple Passive question: Were + subject + V3.' },
          { id: 18, text: 'This castle ___ (destroy) during the war.', options: ['was destroyed', 'was destroy', 'is destroyed', 'destroyed'], correct: 0, explanation: 'Past Simple Passive: was + V3 (destroyed).' },
          { id: 19, text: 'Milk ___ (produce) on this farm.', options: ['is produced', 'is produce', 'was produced', 'produces'], correct: 0, explanation: 'Present Simple Passive: is + V3 (produced).' },
          { id: 20, text: 'The prize ___ (give) to the winner.', options: ['was given', 'was give', 'is given', 'gave'], correct: 0, explanation: 'Past Simple Passive: was + V3 (given).' }
        ],
        scrambled: [
          { id: 1, words: ['written', 'this', 'letter', 'was', 'by', 'John'], answer: 'this letter was written by John', explanation: 'Subject + was + V3 + by + agent.' },
          { id: 2, words: ['spoken', 'English', 'is', 'all', 'over', 'the', 'world'], answer: 'English is spoken all over the world', explanation: 'Subject + is + V3 + place.' },
          { id: 3, words: ['made', 'these', 'cars', 'are', 'in', 'Germany'], answer: 'these cars are made in Germany', explanation: 'Subject + are + V3 + place.' },
          { id: 4, words: ['built', 'the', 'bridge', 'was', 'in', '1889'], answer: 'the bridge was built in 1889', explanation: 'Subject + was + V3 + time.' },
          { id: 5, words: ['written', 'is', 'this', 'book', 'in', 'English', '?'], answer: 'is this book written in English', explanation: 'Is + subject + V3?' },
          { id: 6, words: ['stolen', 'my', 'car', "wasn't", 'last', 'night'], answer: "my car wasn't stolen last night", explanation: "Subject + wasn't + V3 + time." },
          { id: 7, words: ['grown', 'rice', 'is', 'in', 'many', 'countries'], answer: 'rice is grown in many countries', explanation: 'Subject + is + V3 + place.' },
          { id: 8, words: ['taken', 'these', 'photos', 'were', 'during', 'the', 'war'], answer: 'these photos were taken during the war', explanation: 'Subject + were + V3 + time.' },
          { id: 9, words: ['cleaned', 'were', 'the', 'windows', 'yesterday', '?'], answer: 'were the windows cleaned yesterday', explanation: 'Were + subject + V3?' },
          { id: 10, words: ['written', 'this', 'song', "wasn't", 'by', 'her'], answer: "this song wasn't written by her", explanation: "Subject + wasn't + V3 + by + agent." },
          { id: 11, words: ['exported', 'coffee', 'is', 'from', 'Brazil'], answer: 'coffee is exported from Brazil', explanation: 'Subject + is + V3 + place.' },
          { id: 12, words: ['visited', 'the', 'museum', 'is', 'by', 'thousands', 'of', 'tourists'], answer: 'the museum is visited by thousands of tourists', explanation: 'Subject + is + V3 + by + agent.' },
          { id: 13, words: ['finished', 'was', 'the', 'report', 'on', 'time', '?'], answer: 'was the report finished on time', explanation: 'Was + subject + V3?' },
          { id: 14, words: ['baked', 'these', 'cakes', 'are', 'fresh', 'every', 'morning'], answer: 'these cakes are baked fresh every morning', explanation: 'Subject + are + V3 + adverb.' },
          { id: 15, words: ['delivered', 'the', 'email', 'was', 'this', 'morning'], answer: 'the email was delivered this morning', explanation: 'Subject + was + V3 + time.' },
          { id: 16, words: ['followed', 'these', 'rules', 'are', 'by', 'everyone'], answer: 'these rules are followed by everyone', explanation: 'Subject + are + V3 + by + agent.' },
          { id: 17, words: ['sold', 'were', 'the', 'tickets', 'already', '?'], answer: 'were the tickets sold already', explanation: 'Were + subject + V3?' },
          { id: 18, words: ['destroyed', 'the', 'castle', 'was', 'during', 'the', 'war'], answer: 'the castle was destroyed during the war', explanation: 'Subject + was + V3 + time.' },
          { id: 19, words: ['produced', 'milk', 'is', 'on', 'this', 'farm'], answer: 'milk is produced on this farm', explanation: 'Subject + is + V3 + place.' },
          { id: 20, words: ['given', 'the', 'prize', 'was', 'to', 'the', 'winner'], answer: 'the prize was given to the winner', explanation: 'Subject + was + V3 + object.' }
        ],
        errorCorrection: [
          { id: 1, text: 'This letter is wrote by John.', options: ['This letter', 'is', 'wrote', 'by John'], correct: 2, wrongPart: 'wrote', correction: 'written', explanation: 'Passive needs the past participle (V3): "written", not the past simple "wrote".' },
          { id: 2, text: 'English speaks all over the world.', options: ['English', 'speaks', 'all', 'over the world'], correct: 1, wrongPart: 'speaks', correction: 'is spoken', explanation: 'Passive needs "be" + V3: "is spoken".' },
          { id: 3, text: 'These cars is made in Germany.', options: ['These cars', 'is', 'made', 'in Germany'], correct: 1, wrongPart: 'is', correction: 'are', explanation: 'Plural subject needs "are", not "is": "are made".' },
          { id: 4, text: 'The bridge built in 1889.', options: ['The bridge', 'built', 'in', '1889'], correct: 1, wrongPart: 'built', correction: 'was built', explanation: 'Passive needs "was/were" + V3: "was built".' },
          { id: 5, text: 'This book wrote in English?', options: ['This book', 'wrote', 'in', 'English?'], correct: 1, wrongPart: 'wrote', correction: 'Is this book written', explanation: 'Passive question needs "Is/Was" + subject + V3: "Is this book written...?".' },
          { id: 6, text: "My car didn't stolen last night.", options: ['My car', "didn't", 'stolen', 'last night'], correct: 1, wrongPart: "didn't", correction: "wasn't", explanation: "Passive negative needs \"wasn't/weren't\" + V3, not \"didn't\": \"wasn't stolen\"." },
          { id: 7, text: 'Rice grows in many countries by farmers.', options: ['Rice', 'grows', 'in many countries', 'by farmers'], correct: 1, wrongPart: 'grows', correction: 'is grown', explanation: 'When "by" is used, the sentence should be passive: "is grown".' },
          { id: 8, text: 'These photos taken during the war.', options: ['These photos', 'taken', 'during', 'the war'], correct: 1, wrongPart: 'taken', correction: 'were taken', explanation: 'Passive needs "were" + V3: "were taken".' },
          { id: 9, text: 'Did the windows cleaned yesterday?', options: ['Did', 'the windows', 'cleaned', 'yesterday?'], correct: 0, wrongPart: 'Did', correction: 'Were', explanation: 'Passive question needs "Was/Were", not "Did": "Were the windows cleaned...?".' },
          { id: 10, text: "This song weren't written by her.", options: ['This song', "weren't", 'written', 'by her'], correct: 1, wrongPart: "weren't", correction: "wasn't", explanation: 'Singular subject needs "wasn\'t", not "weren\'t".' },
          { id: 11, text: 'Coffee export from Brazil.', options: ['Coffee', 'export', 'from', 'Brazil'], correct: 1, wrongPart: 'export', correction: 'is exported', explanation: 'Passive needs "be" + V3: "is exported".' },
          { id: 12, text: 'The museum visit by thousands of tourists every year.', options: ['The museum', 'visit', 'by thousands of tourists', 'every year'], correct: 1, wrongPart: 'visit', correction: 'is visited', explanation: 'Passive needs "be" + V3: "is visited".' },
          { id: 13, text: 'Was the report finish on time?', options: ['Was', 'the report', 'finish', 'on time?'], correct: 2, wrongPart: 'finish', correction: 'finished', explanation: 'Passive needs the past participle (V3): "finished".' },
          { id: 14, text: 'These cakes bakes fresh every morning.', options: ['These cakes', 'bakes', 'fresh', 'every morning'], correct: 1, wrongPart: 'bakes', correction: 'are baked', explanation: 'Passive needs "be" + V3: "are baked".' },
          { id: 15, text: 'The email delivered this morning.', options: ['The email', 'delivered', 'this', 'morning'], correct: 1, wrongPart: 'delivered', correction: 'was delivered', explanation: 'Passive needs "was" + V3: "was delivered".' },
          { id: 16, text: 'These rules is followed by everyone.', options: ['These rules', 'is', 'followed', 'by everyone'], correct: 1, wrongPart: 'is', correction: 'are', explanation: 'Plural subject needs "are", not "is".' },
          { id: 17, text: 'Did the tickets sold already?', options: ['Did', 'the tickets', 'sold', 'already?'], correct: 0, wrongPart: 'Did', correction: 'Were', explanation: 'Passive question needs "Was/Were", not "Did": "Were the tickets sold...?".' },
          { id: 18, text: 'The castle destroy during the war.', options: ['The castle', 'destroy', 'during', 'the war'], correct: 1, wrongPart: 'destroy', correction: 'was destroyed', explanation: 'Passive needs "was" + V3: "was destroyed".' },
          { id: 19, text: 'Milk produces on this farm.', options: ['Milk', 'produces', 'on', 'this farm'], correct: 1, wrongPart: 'produces', correction: 'is produced', explanation: 'Passive needs "be" + V3: "is produced".' },
          { id: 20, text: 'The prize gave to the winner.', options: ['The prize', 'gave', 'to', 'the winner'], correct: 1, wrongPart: 'gave', correction: 'was given', explanation: 'Passive needs "was" + V3: "was given".' }
        ],
        transform: [
          { id: 1, text: 'Change to Passive: "John wrote this letter."', options: ['This letter was written by John.', 'This letter is written by John.', 'This letter wrote by John.', 'This letter was write by John.'], correct: 0, explanation: 'Active object becomes passive subject: "This letter was written by John".' },
          { id: 2, text: 'Change to Passive: "People speak English all over the world."', options: ['English is spoken all over the world.', 'English was spoken all over the world.', 'English speaks all over the world.', 'English is speak all over the world.'], correct: 0, explanation: 'Present Simple Passive: "English is spoken...".' },
          { id: 3, text: 'Change to Passive: "They make these cars in Germany."', options: ['These cars are made in Germany.', 'These cars were made in Germany.', 'These cars make in Germany.', 'These cars is made in Germany.'], correct: 0, explanation: 'Present Simple Passive: "These cars are made...".' },
          { id: 4, text: 'Change to Passive: "Engineers built the bridge in 1889."', options: ['The bridge was built in 1889.', 'The bridge is built in 1889.', 'The bridge built in 1889.', 'The bridge was build in 1889.'], correct: 0, explanation: 'Past Simple Passive: "The bridge was built...".' },
          { id: 5, text: 'Change to question form (Passive): "Someone wrote this book in English."', options: ['Was this book written in English?', 'Is this book written in English?', 'Did this book written in English?', 'Was this book write in English?'], correct: 0, explanation: 'Past Simple Passive question: "Was this book written...?".' },
          { id: 6, text: 'Change to Passive (negative): "Nobody stole my car."', options: ["My car wasn't stolen.", "My car isn't stolen.", "My car didn't stolen.", "My car wasn't steal."], correct: 0, explanation: "Past Simple Passive negative: \"My car wasn't stolen\"." },
          { id: 7, text: 'Change to Passive: "Farmers grow rice in many countries."', options: ['Rice is grown in many countries.', 'Rice was grown in many countries.', 'Rice grows in many countries.', 'Rice is grow in many countries.'], correct: 0, explanation: 'Present Simple Passive: "Rice is grown...".' },
          { id: 8, text: 'Change to Passive: "Someone took these photos during the war."', options: ['These photos were taken during the war.', 'These photos are taken during the war.', 'These photos took during the war.', 'These photos were take during the war.'], correct: 0, explanation: 'Past Simple Passive: "These photos were taken...".' },
          { id: 9, text: 'Change to question form (Passive): "Someone cleaned the windows yesterday."', options: ['Were the windows cleaned yesterday?', 'Was the windows cleaned yesterday?', 'Did the windows cleaned yesterday?', 'Were the windows clean yesterday?'], correct: 0, explanation: 'Past Simple Passive question: "Were the windows cleaned...?".' },
          { id: 10, text: 'Change to Passive: "Brazil exports coffee."', options: ['Coffee is exported from Brazil.', 'Coffee was exported from Brazil.', 'Coffee exports from Brazil.', 'Coffee is export from Brazil.'], correct: 0, explanation: 'Present Simple Passive: "Coffee is exported...".' },
          { id: 11, text: 'Change to Passive: "Thousands of tourists visit the museum every year."', options: ['The museum is visited by thousands of tourists every year.', 'The museum was visited by thousands of tourists every year.', 'The museum visits by thousands of tourists every year.', 'The museum is visit by thousands of tourists every year.'], correct: 0, explanation: 'Present Simple Passive: "The museum is visited...".' },
          { id: 12, text: 'Change to question form (Passive): "Someone finished the report on time."', options: ['Was the report finished on time?', 'Is the report finished on time?', 'Did the report finished on time?', 'Was the report finish on time?'], correct: 0, explanation: 'Past Simple Passive question: "Was the report finished...?".' },
          { id: 13, text: 'Change to Passive: "The bakery bakes these cakes fresh every morning."', options: ['These cakes are baked fresh every morning.', 'These cakes were baked fresh every morning.', 'These cakes bake fresh every morning.', 'These cakes are bake fresh every morning.'], correct: 0, explanation: 'Present Simple Passive: "These cakes are baked...".' },
          { id: 14, text: 'Change to Passive: "The postman delivered the email this morning."', options: ['The email was delivered this morning.', 'The email is delivered this morning.', 'The email delivered this morning.', 'The email was deliver this morning.'], correct: 0, explanation: 'Past Simple Passive: "The email was delivered...".' },
          { id: 15, text: 'Change to Passive: "Everyone follows these rules."', options: ['These rules are followed by everyone.', 'These rules were followed by everyone.', 'These rules follow by everyone.', 'These rules are follow by everyone.'], correct: 0, explanation: 'Present Simple Passive: "These rules are followed...".' },
          { id: 16, text: 'Change to question form (Passive): "Someone sold the tickets already."', options: ['Were the tickets sold already?', 'Was the tickets sold already?', 'Did the tickets sold already?', 'Were the tickets sell already?'], correct: 0, explanation: 'Past Simple Passive question: "Were the tickets sold...?".' },
          { id: 17, text: 'Change to Passive: "The war destroyed the castle."', options: ['The castle was destroyed during the war.', 'The castle is destroyed during the war.', 'The castle destroyed during the war.', 'The castle was destroy during the war.'], correct: 0, explanation: 'Past Simple Passive: "The castle was destroyed...".' },
          { id: 18, text: 'Change to Passive: "This farm produces milk."', options: ['Milk is produced on this farm.', 'Milk was produced on this farm.', 'Milk produces on this farm.', 'Milk is produce on this farm.'], correct: 0, explanation: 'Present Simple Passive: "Milk is produced...".' },
          { id: 19, text: 'Change to Passive: "The judges gave the prize to the winner."', options: ['The prize was given to the winner.', 'The prize is given to the winner.', 'The prize gave to the winner.', 'The prize was give to the winner.'], correct: 0, explanation: 'Past Simple Passive: "The prize was given...".' },
          { id: 20, text: 'Change to Passive: "Shakespeare wrote this play."', options: ['This play was written by Shakespeare.', 'This play is written by Shakespeare.', 'This play wrote by Shakespeare.', 'This play was write by Shakespeare.'], correct: 0, explanation: 'Past Simple Passive with agent: "This play was written by Shakespeare".' }
        ],
        dialogue: [
          { id: 1, situation: 'Asking about a language.', dialogue: 'A: Is English hard to learn?\nB: Maybe, but it ___ spoken all over the world.', options: ['is', 'are', 'was', 'be'], correct: 0, explanation: 'Present Simple Passive: "is spoken".' },
          { id: 2, situation: 'Talking about car manufacturing.', dialogue: 'A: Where are these cars from?\nB: They ___ made in Germany.', options: ['are', 'is', 'was', 'be'], correct: 0, explanation: 'Present Simple Passive: "are made".' },
          { id: 3, situation: 'Discussing a historic bridge.', dialogue: 'A: How old is this bridge?\nB: It ___ built in 1889.', options: ['was', 'is', 'were', 'did'], correct: 0, explanation: 'Past Simple Passive: "was built".' },
          { id: 4, situation: 'Talking about a stolen car.', dialogue: 'A: What happened to your car?\nB: It ___ stolen last night!', options: ['was', 'is', 'were', 'did'], correct: 0, explanation: 'Past Simple Passive: "was stolen".' },
          { id: 5, situation: 'Asking about a book.', dialogue: "___ this book written in English?\nB: No, it's in French.", options: ['Is', 'Are', 'Was', 'Does'], correct: 0, explanation: 'Present Simple Passive question: "Is this book written...?".' },
          { id: 6, situation: 'Talking about the windows.', dialogue: '___ the windows cleaned yesterday?\nB: Yes, they look spotless.', options: ['Were', 'Was', 'Are', 'Did'], correct: 0, explanation: 'Past Simple Passive question: "Were the windows cleaned...?".' },
          { id: 7, situation: 'Talking about rice production.', dialogue: 'A: Where does rice come from?\nB: It ___ grown in many countries.', options: ['is', 'are', 'was', 'be'], correct: 0, explanation: 'Present Simple Passive: "is grown".' },
          { id: 8, situation: 'Looking at old photos.', dialogue: 'A: When were these taken?\nB: They ___ taken during the war.', options: ['were', 'was', 'are', 'be'], correct: 0, explanation: 'Past Simple Passive: "were taken".' },
          { id: 9, situation: 'Talking about a play.', dialogue: 'A: Who wrote this play?\nB: It ___ written by Shakespeare.', options: ['was', 'is', 'were', 'did'], correct: 0, explanation: 'Past Simple Passive: "was written".' },
          { id: 10, situation: 'Talking about bakery goods.', dialogue: 'A: Are these cakes fresh?\nB: Yes, they ___ baked fresh every morning.', options: ['are', 'is', 'was', 'be'], correct: 0, explanation: 'Present Simple Passive: "are baked".' },
          { id: 11, situation: 'Talking about a work deadline.', dialogue: '___ the report finished on time?\nB: Yes, just in time!', options: ['Was', 'Is', 'Were', 'Did'], correct: 0, explanation: 'Past Simple Passive question: "Was the report finished...?".' },
          { id: 12, situation: 'Discussing tourism.', dialogue: 'A: Is this museum popular?\nB: Very — it ___ visited by thousands of tourists every year.', options: ['is', 'are', 'was', 'be'], correct: 0, explanation: 'Present Simple Passive: "is visited".' },
          { id: 13, situation: 'Talking about a song.', dialogue: 'A: Did she write this song?\nB: No, it ___ not written by her.', options: ['was', 'is', 'were', 'did'], correct: 0, explanation: 'Past Simple Passive negative: "was not written".' },
          { id: 14, situation: 'Talking about coffee.', dialogue: 'A: Where does this coffee come from?\nB: It ___ exported from Brazil.', options: ['is', 'are', 'was', 'be'], correct: 0, explanation: 'Present Simple Passive: "is exported".' },
          { id: 15, situation: 'Waiting for an email.', dialogue: 'A: Did you get my email?\nB: Yes, it ___ delivered this morning.', options: ['was', 'is', 'were', 'did'], correct: 0, explanation: 'Past Simple Passive: "was delivered".' },
          { id: 16, situation: 'Talking about workplace rules.', dialogue: 'A: Do people respect the rules here?\nB: Yes, they ___ followed by everyone.', options: ['are', 'is', 'was', 'be'], correct: 0, explanation: 'Present Simple Passive: "are followed".' },
          { id: 17, situation: 'Talking about a concert.', dialogue: '___ the tickets sold already?\nB: Yes, it sold out in an hour.', options: ['Were', 'Was', 'Are', 'Did'], correct: 0, explanation: 'Past Simple Passive question: "Were the tickets sold...?".' },
          { id: 18, situation: 'Discussing history.', dialogue: 'A: What happened to the old castle?\nB: It ___ destroyed during the war.', options: ['was', 'is', 'were', 'did'], correct: 0, explanation: 'Past Simple Passive: "was destroyed".' },
          { id: 19, situation: 'Talking about dairy products.', dialogue: 'A: Where does this milk come from?\nB: It ___ produced on this farm.', options: ['is', 'are', 'was', 'be'], correct: 0, explanation: 'Present Simple Passive: "is produced".' },
          { id: 20, situation: 'Talking about a competition.', dialogue: 'A: Who won first place?\nB: The prize ___ given to the winner over there.', options: ['was', 'is', 'were', 'did'], correct: 0, explanation: 'Past Simple Passive: "was given".' }
        ]
      },
      {
        id: 'first-conditional',
        title: 'First Conditional',
        icon: '🌦️',
        guide: `## First Conditional (Birinchi shart ergash gap)

First Conditional kelajakda sodir bo'lishi mumkin bo'lgan real, ehtimoli yuqori shart-natija munosabatlarini ifodalash uchun ishlatiladi.

## 1. Shakllanishi (Form)
• **If-band (shart qismi)**: If + Present Simple
• **Main clause (natija qismi)**: will + base verb
  - **If** it **rains**, I **will stay** at home.
  - I **will stay** at home **if** it **rains**. (band tartibi ixtiyoriy, o'rtada vergul yo'q)
• **Negative**: har ikkala qismda ham inkor bo'lishi mumkin
  - If you **don't hurry**, you **will miss** the bus.
  - If it **rains**, we **won't go** to the park.
• **Question**: Will + Subject + base verb, if + Present Simple?
  - **Will** you **come** if I **invite** you?

*(If bandida "will" HECH QACHON ishlatilmaydi — faqat Present Simple)*

## 2. Ishlatilishi (Usage)
1. **Kelajakdagi real, ehtimoli yuqori shart va uning natijasi**:
   - If I **study** hard, I **will pass** the exam.
2. **Ogohlantirish yoki tahdid**:
   - If you **touch** that wire, you **will get** a shock.
3. **Taklif yoki va'da**:
   - If you **need** help, I **will help** you.
4. **Umumiy qoida-natija munosabati (kelajakka nisbatan)**:
   - If the sun **shines**, we **will go** to the beach.

## 3. First Conditional vs Zero Conditional
• **Zero Conditional (If + Present, Present)** — doim to'g'ri bo'lgan umumiy haqiqat.
  - If you **heat** ice, it **melts**. (har doim shunday)
• **First Conditional (If + Present, will + base)** — kelajakdagi bitta aniq, ehtimoliy vaziyat.
  - If you **heat** the ice, it **will melt** in ten minutes. (aniq bir holat)

## 4. Signal so'zlar
• if, unless (= if not)
• Modal "will" natija qismida; ba'zan "can/may/should" ham ishlatilishi mumkin
• If-band har doim Present Simple, hech qachon "will" emas`,
        questions: [
          { id: 1, text: 'If it rains, I ___ stay at home.', options: ['will', 'am', 'was', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 2, text: 'If I ___ hard, I will pass the exam.', options: ['study', 'will study', 'studied', 'am studying'], correct: 0, explanation: 'If-clause uses Present Simple, never "will".' },
          { id: 3, text: "If you don't hurry, you ___ miss the bus.", options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 4, text: 'If you touch that wire, you ___ get a shock.', options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 5, text: 'If you need help, I ___ help you.', options: ['will', 'am', 'was', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 6, text: 'If the sun ___, we will go to the beach.', options: ['shines', 'will shine', 'shone', 'is shining'], correct: 0, explanation: 'If-clause uses Present Simple, never "will".' },
          { id: 7, text: 'I will call you if I ___ work early.', options: ['finish', 'will finish', 'finished', 'am finishing'], correct: 0, explanation: 'If-clause uses Present Simple, never "will".' },
          { id: 8, text: 'If she misses the train, she ___ be late.', options: ['will', 'is', 'was', 'does'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 9, text: 'You will be cold if you ___ not wear a coat.', options: ['do', 'will', 'did', 'are'], correct: 0, explanation: "If-clause negative uses Present Simple (\"don't/doesn't\"): \"do not wear\"." },
          { id: 10, text: 'If he works hard, he ___ get a promotion.', options: ['will', 'is', 'was', 'does'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 11, text: '___ you come if I invite you?', options: ['Will', 'Do', 'Are', 'Did'], correct: 0, explanation: 'First Conditional question: Will + subject + base verb...?' },
          { id: 12, text: "If we don't leave now, we ___ miss the flight.", options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 13, text: 'If you ask nicely, she ___ say yes.', options: ['will', 'is', 'was', 'does'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 14, text: 'If they break the rule, they ___ be punished.', options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 15, text: 'If I ___ enough money, I will buy a car.', options: ['save', 'will save', 'saved', 'am saving'], correct: 0, explanation: 'If-clause uses Present Simple, never "will".' },
          { id: 16, text: "If you don't practice, you ___ fail the test.", options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 17, text: 'The plants ___ grow if you water them.', options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 18, text: 'If we ___ early, we will get good seats.', options: ['arrive', 'will arrive', 'arrived', 'are arriving'], correct: 0, explanation: 'If-clause uses Present Simple, never "will".' },
          { id: 19, text: 'She will stay angry if you ___ not apologize.', options: ['do', 'will', 'did', 'are'], correct: 0, explanation: 'If-clause negative uses Present Simple: "do not apologize".' },
          { id: 20, text: 'If we forget the tickets, we ___ not be able to enter.', options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' }
        ],
        fillBlanks: [
          { id: 1, text: 'If it ___ (rain), I will stay at home.', options: ['rains', 'will rain', 'rained', 'is raining'], correct: 0, explanation: 'If-clause: Present Simple (rains).' },
          { id: 2, text: 'If I study hard, I ___ (pass) the exam.', options: ['will pass', 'pass', 'passed', 'am passing'], correct: 0, explanation: 'Main clause: will + base verb (pass).' },
          { id: 3, text: "If you don't hurry, you ___ (miss) the bus.", options: ['will miss', 'miss', 'missed', 'are missing'], correct: 0, explanation: 'Main clause: will + base verb (miss).' },
          { id: 4, text: 'If you ___ (touch) that wire, you will get a shock.', options: ['touch', 'will touch', 'touched', 'are touching'], correct: 0, explanation: 'If-clause: Present Simple (touch).' },
          { id: 5, text: 'If you need help, I ___ (help) you.', options: ['will help', 'help', 'helped', 'am helping'], correct: 0, explanation: 'Main clause: will + base verb (help).' },
          { id: 6, text: 'If the sun shines, we ___ (go) to the beach.', options: ['will go', 'go', 'went', 'are going'], correct: 0, explanation: 'Main clause: will + base verb (go).' },
          { id: 7, text: 'I will call you if I ___ (finish) work early.', options: ['finish', 'will finish', 'finished', 'am finishing'], correct: 0, explanation: 'If-clause: Present Simple (finish).' },
          { id: 8, text: 'If she ___ (miss) the train, she will be late.', options: ['misses', 'will miss', 'missed', 'is missing'], correct: 0, explanation: 'If-clause: Present Simple (misses).' },
          { id: 9, text: 'You will be cold if you ___ (not / wear) a coat.', options: ["don't wear", "won't wear", "didn't wear", "aren't wearing"], correct: 0, explanation: "If-clause negative: Present Simple (\"don't wear\")." },
          { id: 10, text: 'If he works hard, he ___ (get) a promotion.', options: ['will get', 'get', 'got', 'is getting'], correct: 0, explanation: 'Main clause: will + base verb (get).' },
          { id: 11, text: '___ (you / come) if I invite you?', options: ['Will you come', 'Do you come', 'Are you coming', 'Did you come'], correct: 0, explanation: 'First Conditional question: Will + subject + base verb.' },
          { id: 12, text: "If we don't leave now, we ___ (miss) the flight.", options: ['will miss', 'miss', 'missed', 'are missing'], correct: 0, explanation: 'Main clause: will + base verb (miss).' },
          { id: 13, text: 'If you ask nicely, she ___ (say) yes.', options: ['will say', 'say', 'said', 'is saying'], correct: 0, explanation: 'Main clause: will + base verb (say).' },
          { id: 14, text: 'If they ___ (break) the rule, they will be punished.', options: ['break', 'will break', 'broke', 'are breaking'], correct: 0, explanation: 'If-clause: Present Simple (break).' },
          { id: 15, text: 'If I save enough money, I ___ (buy) a car.', options: ['will buy', 'buy', 'bought', 'am buying'], correct: 0, explanation: 'Main clause: will + base verb (buy).' },
          { id: 16, text: 'If you ___ (not / practice), you will fail the test.', options: ["don't practice", "won't practice", "didn't practice", "aren't practicing"], correct: 0, explanation: "If-clause negative: Present Simple (\"don't practice\")." },
          { id: 17, text: 'The plants will grow if you ___ (water) them.', options: ['water', 'will water', 'watered', 'are watering'], correct: 0, explanation: 'If-clause: Present Simple (water).' },
          { id: 18, text: 'If we arrive early, we ___ (get) good seats.', options: ['will get', 'get', 'got', 'are getting'], correct: 0, explanation: 'Main clause: will + base verb (get).' },
          { id: 19, text: 'She will stay angry if you ___ (not / apologize).', options: ["don't apologize", "won't apologize", "didn't apologize", "aren't apologizing"], correct: 0, explanation: "If-clause negative: Present Simple (\"don't apologize\")." },
          { id: 20, text: 'If we forget the tickets, we ___ (not / be) able to enter.', options: ["won't be", "don't be", "weren't", "aren't being"], correct: 0, explanation: "Main clause negative: will not (won't) + base verb (be)." }
        ],
        scrambled: [
          { id: 1, words: ['rains', 'if', 'it', 'stay', 'I', 'will', 'home', 'at'], answer: 'if it rains I will stay at home', explanation: 'If + Present Simple, subject + will + base verb.' },
          { id: 2, words: ['study', 'if', 'I', 'hard', 'pass', 'I', 'will', 'the', 'exam'], answer: 'if I study hard I will pass the exam', explanation: 'If + Present Simple, subject + will + base verb.' },
          { id: 3, words: ['hurry', "don't", 'if', 'you', 'miss', 'will', 'you', 'the', 'bus'], answer: "if you don't hurry you will miss the bus", explanation: 'If-clause negative + main clause with will.' },
          { id: 4, words: ['touch', 'if', 'you', 'that', 'wire', 'get', 'will', 'you', 'a', 'shock'], answer: 'if you touch that wire you will get a shock', explanation: 'If + Present Simple, subject + will + base verb.' },
          { id: 5, words: ['need', 'if', 'you', 'help', 'help', 'I', 'will', 'you'], answer: 'if you need help I will help you', explanation: 'If + Present Simple, subject + will + base verb.' },
          { id: 6, words: ['shines', 'if', 'the', 'sun', 'go', 'we', 'will', 'to', 'the', 'beach'], answer: 'if the sun shines we will go to the beach', explanation: 'If + Present Simple, subject + will + base verb.' },
          { id: 7, words: ['finish', 'if', 'I', 'work', 'early', 'call', 'I', 'will', 'you'], answer: 'if I finish work early I will call you', explanation: 'If + Present Simple, subject + will + base verb.' },
          { id: 8, words: ['misses', 'if', 'she', 'the', 'train', 'be', 'she', 'will', 'late'], answer: 'if she misses the train she will be late', explanation: 'If + Present Simple, subject + will + base verb.' },
          { id: 9, words: ['wear', "don't", 'if', 'you', 'a', 'coat', 'be', 'you', 'will', 'cold'], answer: "if you don't wear a coat you will be cold", explanation: 'If-clause negative + main clause with will.' },
          { id: 10, words: ['works', 'if', 'he', 'hard', 'get', 'he', 'will', 'a', 'promotion'], answer: 'if he works hard he will get a promotion', explanation: 'If + Present Simple, subject + will + base verb.' },
          { id: 11, words: ['come', 'will', 'you', 'if', 'invite', 'I', 'you', '?'], answer: 'will you come if I invite you', explanation: 'Will + subject + base verb + if + Present Simple?' },
          { id: 12, words: ['leave', "don't", 'if', 'we', 'now', 'miss', 'we', 'will', 'the', 'flight'], answer: "if we don't leave now we will miss the flight", explanation: 'If-clause negative + main clause with will.' },
          { id: 13, words: ['ask', 'if', 'you', 'nicely', 'say', 'she', 'will', 'yes'], answer: 'if you ask nicely she will say yes', explanation: 'If + Present Simple, subject + will + base verb.' },
          { id: 14, words: ['break', 'if', 'they', 'the', 'rule', 'be', 'they', 'will', 'punished'], answer: 'if they break the rule they will be punished', explanation: 'If + Present Simple, subject + will + base verb.' },
          { id: 15, words: ['save', 'if', 'I', 'enough', 'money', 'buy', 'I', 'will', 'a', 'car'], answer: 'if I save enough money I will buy a car', explanation: 'If + Present Simple, subject + will + base verb.' },
          { id: 16, words: ['practice', "don't", 'if', 'you', 'fail', 'you', 'will', 'the', 'test'], answer: "if you don't practice you will fail the test", explanation: 'If-clause negative + main clause with will.' },
          { id: 17, words: ['water', 'if', 'you', 'them', 'grow', 'the', 'plants', 'will'], answer: 'if you water them the plants will grow', explanation: 'If + Present Simple, subject + will + base verb.' },
          { id: 18, words: ['arrive', 'if', 'we', 'early', 'get', 'we', 'will', 'good', 'seats'], answer: 'if we arrive early we will get good seats', explanation: 'If + Present Simple, subject + will + base verb.' },
          { id: 19, words: ['apologize', "don't", 'if', 'you', 'stay', 'she', 'will', 'angry'], answer: "if you don't apologize she will stay angry", explanation: 'If-clause negative + main clause with will.' },
          { id: 20, words: ['forget', 'if', 'we', 'the', 'tickets', 'be', 'able', "won't", 'we', 'to', 'enter'], answer: "if we forget the tickets we won't be able to enter", explanation: "If + Present Simple, subject + won't + base verb." }
        ],
        errorCorrection: [
          { id: 1, text: 'If it will rain, I will stay at home.', options: ['If it', 'will rain', 'I will stay', 'at home'], correct: 1, wrongPart: 'will rain', correction: 'rains', explanation: 'The if-clause never uses "will" — use Present Simple: "rains".' },
          { id: 2, text: 'If I study hard, I pass the exam.', options: ['If I study hard', 'I', 'pass', 'the exam'], correct: 2, wrongPart: 'pass', correction: 'will pass', explanation: 'The main clause needs "will" + base verb: "will pass".' },
          { id: 3, text: "If you don't hurry, you miss the bus.", options: ['If you', "don't hurry", 'you', 'miss the bus'], correct: 3, wrongPart: 'miss the bus', correction: 'will miss the bus', explanation: 'The main clause needs "will" + base verb: "will miss".' },
          { id: 4, text: 'If you will touch that wire, you will get a shock.', options: ['If you', 'will touch', 'that wire', 'you will get a shock'], correct: 1, wrongPart: 'will touch', correction: 'touch', explanation: 'The if-clause never uses "will" — use Present Simple: "touch".' },
          { id: 5, text: 'If you needs help, I will help you.', options: ['If you', 'needs', 'help', 'I will help you'], correct: 1, wrongPart: 'needs', correction: 'need', explanation: 'The if-clause uses Present Simple, but "you" takes "need", not "needs".' },
          { id: 6, text: 'If the sun shines, we go to the beach tomorrow.', options: ['If the sun shines', 'we', 'go', 'to the beach tomorrow'], correct: 2, wrongPart: 'go', correction: 'will go', explanation: 'The main clause needs "will" + base verb: "will go".' },
          { id: 7, text: 'I will call you if I will finish work early.', options: ['I will call you', 'if I', 'will finish', 'work early'], correct: 2, wrongPart: 'will finish', correction: 'finish', explanation: 'The if-clause never uses "will" — use Present Simple: "finish".' },
          { id: 8, text: 'If she miss the train, she will be late.', options: ['If she', 'miss', 'the train', 'she will be late'], correct: 1, wrongPart: 'miss', correction: 'misses', explanation: 'The if-clause uses Present Simple, and "she" takes "misses".' },
          { id: 9, text: 'You will be cold if you not wear a coat.', options: ['You will be cold', 'if you', 'not wear', 'a coat'], correct: 2, wrongPart: 'not wear', correction: "don't wear", explanation: "Present Simple negative needs \"do/does\": \"don't wear\"." },
          { id: 10, text: 'If he works hard, he gets a promotion soon.', options: ['If he works hard', 'he', 'gets', 'a promotion soon'], correct: 2, wrongPart: 'gets', correction: 'will get', explanation: 'The main clause needs "will" + base verb: "will get".' },
          { id: 11, text: 'Do you come if I invite you?', options: ['Do', 'you', 'come', 'if I invite you?'], correct: 0, wrongPart: 'Do', correction: 'Will', explanation: 'First Conditional questions use "Will", not "Do": "Will you come...?".' },
          { id: 12, text: "If we don't leave now, we missing the flight.", options: ['If we', "don't leave now", 'we', 'missing the flight'], correct: 3, wrongPart: 'missing the flight', correction: 'will miss the flight', explanation: 'The main clause needs "will" + base verb: "will miss".' },
          { id: 13, text: 'If you ask nicely, she says yes.', options: ['If you ask nicely', 'she', 'says', 'yes'], correct: 2, wrongPart: 'says', correction: 'will say', explanation: 'The main clause needs "will" + base verb: "will say".' },
          { id: 14, text: 'If they will break the rule, they will be punished.', options: ['If they', 'will break', 'the rule', 'they will be punished'], correct: 1, wrongPart: 'will break', correction: 'break', explanation: 'The if-clause never uses "will" — use Present Simple: "break".' },
          { id: 15, text: 'If I save enough money, I bought a car.', options: ['If I save enough money', 'I', 'bought', 'a car'], correct: 2, wrongPart: 'bought', correction: 'will buy', explanation: 'The main clause needs "will" + base verb: "will buy", not the past tense.' },
          { id: 16, text: "If you don't practices, you will fail the test.", options: ['If you', "don't practices", 'you will fail', 'the test'], correct: 1, wrongPart: "don't practices", correction: "don't practice", explanation: "After \"don't\", use the base form: \"practice\", not \"practices\"." },
          { id: 17, text: 'The plants will grow if you watered them.', options: ['The plants will grow', 'if you', 'watered', 'them'], correct: 2, wrongPart: 'watered', correction: 'water', explanation: 'The if-clause uses Present Simple, not the past tense: "water".' },
          { id: 18, text: 'If we arrive early, we will got good seats.', options: ['If we arrive early', 'we', 'will got', 'good seats'], correct: 2, wrongPart: 'will got', correction: 'will get', explanation: 'After "will", use the base verb: "get", not "got".' },
          { id: 19, text: "She will stay angry if you doesn't apologize.", options: ['She will stay angry', 'if you', "doesn't apologize", 'No error'], correct: 2, wrongPart: "doesn't apologize", correction: "don't apologize", explanation: '"You" takes "don\'t", not "doesn\'t".' },
          { id: 20, text: 'If we forget the tickets, we not will be able to enter.', options: ['If we forget the tickets', 'we', 'not will be', 'able to enter'], correct: 2, wrongPart: 'not will be', correction: 'will not be', explanation: '"Not" goes after "will": "will not be" (won\'t be).' }
        ],
        transform: [
          { id: 1, text: 'Complete the First Conditional: "If it rains, I ___ (stay) at home."', options: ['will stay', 'stay', 'stayed', 'am staying'], correct: 0, explanation: 'Main clause: will + base verb (stay).' },
          { id: 2, text: 'Complete the First Conditional: "If I ___ (study) hard, I will pass the exam."', options: ['study', 'will study', 'studied', 'am studying'], correct: 0, explanation: 'If-clause: Present Simple (study).' },
          { id: 3, text: 'Make negative (main clause): "If you hurry, you will catch the bus." → If you don\'t hurry, you ___ the bus.', options: ['will miss', 'miss', 'missed', 'are missing'], correct: 0, explanation: 'Negated condition leads to a different will + base verb result.' },
          { id: 4, text: 'Combine using First Conditional: "You touch that wire. You get a shock." (as a warning)', options: ['If you touch that wire, you will get a shock.', 'If you touch that wire, you get a shock.', 'If you will touch that wire, you get a shock.', 'If you touched that wire, you would get a shock.'], correct: 0, explanation: 'First Conditional: If + Present Simple, will + base verb.' },
          { id: 5, text: 'Make question: "You will come if I invite you."', options: ['Will you come if I invite you?', 'Do you come if I invite you?', 'Will you come if I will invite you?', 'You will come if I invite you?'], correct: 0, explanation: 'Move "will" to the front of the main clause: "Will you come...?".' },
          { id: 6, text: 'Combine using First Conditional: "The sun shines. We go to the beach."', options: ['If the sun shines, we will go to the beach.', 'If the sun will shine, we go to the beach.', 'If the sun shines, we go to the beach.', 'If the sun shone, we would go to the beach.'], correct: 0, explanation: 'First Conditional: If + Present Simple, will + base verb.' },
          { id: 7, text: 'Complete the First Conditional: "I will call you if I ___ (finish) work early."', options: ['finish', 'will finish', 'finished', 'am finishing'], correct: 0, explanation: 'If-clause: Present Simple (finish).' },
          { id: 8, text: 'Combine using First Conditional: "She misses the train. She is late."', options: ['If she misses the train, she will be late.', 'If she will miss the train, she is late.', 'If she misses the train, she is late.', 'If she missed the train, she would be late.'], correct: 0, explanation: 'First Conditional: If + Present Simple, will + base verb.' },
          { id: 9, text: 'Make negative (if-clause): "If you wear a coat, you will be warm." → If you ___ a coat, you will be cold.', options: ["don't wear", "won't wear", "didn't wear", "aren't wearing"], correct: 0, explanation: "If-clause negative: Present Simple (\"don't wear\")." },
          { id: 10, text: 'Combine using First Conditional: "He works hard. He gets a promotion."', options: ['If he works hard, he will get a promotion.', 'If he will work hard, he gets a promotion.', 'If he works hard, he gets a promotion.', 'If he worked hard, he would get a promotion.'], correct: 0, explanation: 'First Conditional: If + Present Simple, will + base verb.' },
          { id: 11, text: "Combine using First Conditional: \"We don't leave now. We miss the flight.\"", options: ["If we don't leave now, we will miss the flight.", "If we don't leave now, we miss the flight.", 'If we leave now, we will miss the flight.', "If we didn't leave now, we would miss the flight."], correct: 0, explanation: 'First Conditional: If + Present Simple (negative), will + base verb.' },
          { id: 12, text: 'Complete the First Conditional: "If you ask nicely, she ___ (say) yes."', options: ['will say', 'say', 'said', 'is saying'], correct: 0, explanation: 'Main clause: will + base verb (say).' },
          { id: 13, text: 'Combine using First Conditional: "They break the rule. They are punished."', options: ['If they break the rule, they will be punished.', 'If they will break the rule, they are punished.', 'If they break the rule, they are punished.', 'If they broke the rule, they would be punished.'], correct: 0, explanation: 'First Conditional: If + Present Simple, will + base verb.' },
          { id: 14, text: 'Complete the First Conditional: "If I save enough money, I ___ (buy) a car."', options: ['will buy', 'buy', 'bought', 'am buying'], correct: 0, explanation: 'Main clause: will + base verb (buy).' },
          { id: 15, text: 'Make negative (if-clause): "If you practice, you will pass the test." → If you ___, you will fail the test.', options: ["don't practice", "won't practice", "didn't practice", "aren't practicing"], correct: 0, explanation: "If-clause negative: Present Simple (\"don't practice\")." },
          { id: 16, text: 'Combine using First Conditional: "You water the plants. They grow."', options: ['If you water the plants, they will grow.', 'If you will water the plants, they grow.', 'If you water the plants, they grow.', 'If you watered the plants, they would grow.'], correct: 0, explanation: 'First Conditional: If + Present Simple, will + base verb.' },
          { id: 17, text: 'Complete the First Conditional: "If we arrive early, we ___ (get) good seats."', options: ['will get', 'get', 'got', 'are getting'], correct: 0, explanation: 'Main clause: will + base verb (get).' },
          { id: 18, text: 'Make negative (if-clause): "If you apologize, she will forgive you." → If you ___, she will stay angry.', options: ["don't apologize", "won't apologize", "didn't apologize", "aren't apologizing"], correct: 0, explanation: "If-clause negative: Present Simple (\"don't apologize\")." },
          { id: 19, text: 'Make negative (main clause): "If we forget the tickets, we will be able to enter." → If we forget the tickets, we ___ able to enter.', options: ["won't be", "don't be", "aren't being", "weren't"], correct: 0, explanation: "Main clause negative: will not (won't) + base verb (be)." },
          { id: 20, text: 'Combine using First Conditional: "I finish work early. I call you."', options: ['If I finish work early, I will call you.', 'If I will finish work early, I call you.', 'If I finish work early, I call you.', 'If I finished work early, I would call you.'], correct: 0, explanation: 'First Conditional: If + Present Simple, will + base verb.' }
        ],
        dialogue: [
          { id: 1, situation: 'Making weekend plans.', dialogue: "A: What will you do this weekend?\nB: If it rains, I ___ stay at home.", options: ['will', 'am', 'was', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 2, situation: 'Talking about exam prep.', dialogue: 'A: Are you worried about the exam?\nB: A bit, but if I study hard, I ___ pass it.', options: ['will', 'am', 'was', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 3, situation: 'Catching a bus.', dialogue: "A: We should hurry!\nB: You're right, if we don't hurry, we ___ miss the bus.", options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 4, situation: 'Warning a child.', dialogue: 'A: Can I touch that wire?\nB: No! If you touch it, you ___ get a shock.', options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 5, situation: 'Offering help.', dialogue: "A: I'm struggling with this project.\nB: If you need help, I ___ help you.", options: ['will', 'am', 'was', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 6, situation: 'Planning a beach trip.', dialogue: 'A: Should we bring towels?\nB: Yes, if the sun ___, we will go to the beach.', options: ['shines', 'will shine', 'shone', 'is shining'], correct: 0, explanation: 'If-clause uses Present Simple (shines).' },
          { id: 7, situation: 'Making evening plans.', dialogue: 'A: Can you meet me at 6?\nB: I will call you if I ___ work early.', options: ['finish', 'will finish', 'finished', 'am finishing'], correct: 0, explanation: 'If-clause uses Present Simple (finish).' },
          { id: 8, situation: 'Discussing punctuality.', dialogue: 'A: Will she be on time?\nB: If she misses the train, she ___ be late.', options: ['will', 'is', 'was', 'does'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 9, situation: 'Talking about winter weather.', dialogue: 'A: Should I bring a coat?\nB: Yes, you will be cold if you ___ wear one.', options: ["don't", "won't", "didn't", "aren't"], correct: 0, explanation: "If-clause negative: Present Simple (\"don't wear\")." },
          { id: 10, situation: 'Talking about career goals.', dialogue: "A: Do you think he'll get promoted?\nB: If he works hard, he ___ get a promotion.", options: ['will', 'is', 'was', 'does'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 11, situation: 'Inviting a friend.', dialogue: '___ you come if I invite you?\nB: Of course!', options: ['Will', 'Do', 'Are', 'Did'], correct: 0, explanation: 'First Conditional question: Will + subject + base verb.' },
          { id: 12, situation: 'Rushing to the airport.', dialogue: "A: We're running late!\nB: If we don't leave now, we ___ miss the flight.", options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 13, situation: 'Asking for a favor.', dialogue: "A: Do you think she'll agree?\nB: If you ask nicely, she ___ say yes.", options: ['will', 'is', 'was', 'does'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 14, situation: 'Discussing school rules.', dialogue: "A: What happens if you're late?\nB: If we break the rule, we ___ be punished.", options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 15, situation: 'Talking about savings.', dialogue: 'A: Are you saving for anything?\nB: Yes, if I save enough money, I ___ buy a car.', options: ['will', 'am', 'was', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 16, situation: 'Discussing test prep.', dialogue: "A: Are you ready for the test?\nB: Not really, if I don't practice, I ___ fail it.", options: ['will', 'am', 'was', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 17, situation: 'Gardening advice.', dialogue: 'A: How do I keep these plants alive?\nB: They ___ grow if you water them regularly.', options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 18, situation: 'Planning to watch a show.', dialogue: 'A: Should we leave now?\nB: Yes, if we arrive early, we ___ get good seats.', options: ['will', 'are', 'were', 'do'], correct: 0, explanation: 'First Conditional main clause: will + base verb.' },
          { id: 19, situation: 'Resolving an argument.', dialogue: 'A: What if I say sorry?\nB: She will stay angry if you ___ apologize.', options: ["don't", "won't", "didn't", "aren't"], correct: 0, explanation: "If-clause negative: Present Simple (\"don't apologize\")." },
          { id: 20, situation: 'Checking travel documents.', dialogue: 'A: Do we have everything?\nB: If we forget the tickets, we ___ be able to enter.', options: ["won't", "don't", "aren't", "weren't"], correct: 0, explanation: "Main clause negative: will not (won't) + base verb (be)." }
        ]
      },
      {
        id: 'past-perfect-simple',
        title: 'Past Perfect Simple',
        icon: '⏮️',
        guide: `## Past Perfect Simple (O'tgan zamon oldingi tugallangan ish-harakat)

Past Perfect Simple o'tmishdagi ikkita ish-harakatdan **birinchi bo'lib**, ikkinchi o'tmishdagi ish-harakatdan **oldinroq** sodir bo'lganini ko'rsatish uchun ishlatiladi.

## 1. Shakllanishi (Form)
• **Tasdiq**: Subject + had + V3 (Past Participle)
  - I **had finished** my homework before dinner.
• **Inkor**: Subject + had not (hadn't) + V3
  - She **hadn't seen** the movie before.
• **Savol**: Had + Subject + V3?
  - **Had** you **left** when I called?

*(had barcha shaxs/sonlar uchun bir xil — o'zgarmaydi)*

## 2. Ishlatilishi (Usage)
1. **Ikkita o'tmish ish-harakatidan avvalgisi** (Past Simple bilan birga):
   - When I **arrived**, the train **had already left**.
2. **Sabab-natija (o'tmishda avvalroq sodir bo'lgan sabab)**:
   - She was tired because she **had worked** all day.
3. **Reported Speech'da (Past Simple → Past Perfect)**:
   - He said he **had finished** the report.
4. **Third Conditional bilan** (bu yerda alohida o'rganilmaydi, lekin tanish bo'ladi):
   - If I **had known**, I would have helped.

## 3. Past Perfect vs Past Simple
• **Past Simple** — o'tmishdagi bitta aniq voqea yoki ketma-ket voqealar.
  - I **ate** breakfast and **went** to work. (ketma-ket, oddiy tartib)
• **Past Perfect** — ikkita voqeadan **avvalroq** sodir bo'lganini ta'kidlash uchun.
  - I **had eaten** breakfast before I **went** to work. (nonushta ishga borishdan OLDIN)

## 4. Signal so'zlar
• before, after, when, by the time, already, just, never, ever (o'tmishga nisbatan)
• as soon as, once`,
        questions: [
          { id: 1, text: 'When I arrived, the train ___ already left.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + V3, avvalroq sodir bo\'lgan ish-harakat.' },
          { id: 2, text: 'She was tired because she ___ worked all day.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect sababni bildiradi: had + V3.' },
          { id: 3, text: 'He said he ___ finished the report.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Reported speech: Past Simple → Past Perfect.' },
          { id: 4, text: 'By the time we got to the cinema, the film ___ started.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + V3, avvalroq sodir bo\'lgan ish-harakat.' },
          { id: 5, text: 'I ___ never seen snow before I visited Norway.', options: ['had', 'have', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + never + V3.' },
          { id: 6, text: 'They ___ already eaten when we arrived.', options: ['had', 'have', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + already + V3.' },
          { id: 7, text: '___ you finished your homework before dinner?', options: ['Had', 'Have', 'Did', 'Was'], correct: 0, explanation: 'Past Perfect question: Had + subject + V3?' },
          { id: 8, text: 'We ___ not met before the conference.', options: ['had', 'have', 'was', 'did'], correct: 0, explanation: 'Past Perfect negative: had not (hadn\'t) + V3.' },
          { id: 9, text: 'After she ___ finished the exam, she went home.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + V3, avvalroq sodir bo\'lgan ish-harakat.' },
          { id: 10, text: 'He ___ already left when I called him.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + already + V3.' },
          { id: 11, text: 'As soon as she ___ arrived, the meeting started.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + V3, avvalroq sodir bo\'lgan ish-harakat.' },
          { id: 12, text: "I couldn't get in because I ___ forgotten my key.", options: ['had', 'have', 'was', 'did'], correct: 0, explanation: 'Past Perfect sababni bildiradi: had + V3.' },
          { id: 13, text: 'By 2020, she ___ graduated from university.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + V3, ma\'lum vaqtga qadar tugallangan.' },
          { id: 14, text: '___ he ever visited London before that trip?', options: ['Had', 'Have', 'Did', 'Was'], correct: 0, explanation: 'Past Perfect question: Had + subject + V3?' },
          { id: 15, text: 'The house was empty because the family ___ moved out.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect sababni bildiradi: had + V3.' },
          { id: 16, text: 'We ___ just sat down when the phone rang.', options: ['had', 'have', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + just + V3.' },
          { id: 17, text: 'She realized she ___ left her phone at home.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + V3, avvalroq sodir bo\'lgan ish-harakat.' },
          { id: 18, text: 'They ___ not seen each other for ten years before the reunion.', options: ['had', 'have', 'was', 'did'], correct: 0, explanation: 'Past Perfect negative: had not (hadn\'t) + V3.' },
          { id: 19, text: 'Before he became a doctor, he ___ studied biology for six years.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + V3, avvalroq sodir bo\'lgan ish-harakat.' },
          { id: 20, text: 'When the police arrived, the thief ___ already escaped.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + already + V3.' }
        ],
        fillBlanks: [
          { id: 1, text: 'When I arrived, the train ___ (already / leave).', options: ['had already left', 'has already left', 'already left', 'was already leaving'], correct: 0, explanation: 'Past Perfect: had + V3 (left).' },
          { id: 2, text: 'She was tired because she ___ (work) all day.', options: ['had worked', 'has worked', 'worked', 'was working'], correct: 0, explanation: 'Past Perfect: had + V3 (worked).' },
          { id: 3, text: 'He said he ___ (finish) the report.', options: ['had finished', 'has finished', 'finished', 'was finishing'], correct: 0, explanation: 'Reported speech: had + V3 (finished).' },
          { id: 4, text: 'By the time we got there, the film ___ (start).', options: ['had started', 'has started', 'started', 'was starting'], correct: 0, explanation: 'Past Perfect: had + V3 (started).' },
          { id: 5, text: 'I ___ (never / see) snow before I visited Norway.', options: ['had never seen', 'have never seen', 'never saw', 'was never seeing'], correct: 0, explanation: 'Past Perfect: had + never + V3 (seen).' },
          { id: 6, text: 'They ___ (already / eat) when we arrived.', options: ['had already eaten', 'have already eaten', 'already ate', 'were already eating'], correct: 0, explanation: 'Past Perfect: had + already + V3 (eaten).' },
          { id: 7, text: '___ (you / finish) your homework before dinner?', options: ['Had you finished', 'Have you finished', 'Did you finish', 'Were you finishing'], correct: 0, explanation: 'Past Perfect question: Had + subject + V3.' },
          { id: 8, text: 'We ___ (not / meet) before the conference.', options: ["hadn't met", "haven't met", "didn't meet", "weren't meeting"], correct: 0, explanation: 'Past Perfect negative: hadn\'t + V3 (met).' },
          { id: 9, text: 'After she ___ (finish) the exam, she went home.', options: ['had finished', 'has finished', 'finished', 'was finishing'], correct: 0, explanation: 'Past Perfect: had + V3 (finished).' },
          { id: 10, text: 'He ___ (already / leave) when I called him.', options: ['had already left', 'has already left', 'already left', 'was already leaving'], correct: 0, explanation: 'Past Perfect: had + already + V3 (left).' },
          { id: 11, text: 'As soon as she ___ (arrive), the meeting started.', options: ['had arrived', 'has arrived', 'arrived', 'was arriving'], correct: 0, explanation: 'Past Perfect: had + V3 (arrived).' },
          { id: 12, text: "I couldn't get in because I ___ (forget) my key.", options: ['had forgotten', 'have forgotten', 'forgot', 'was forgetting'], correct: 0, explanation: 'Past Perfect: had + V3 (forgotten).' },
          { id: 13, text: 'By 2020, she ___ (graduate) from university.', options: ['had graduated', 'has graduated', 'graduated', 'was graduating'], correct: 0, explanation: 'Past Perfect: had + V3 (graduated).' },
          { id: 14, text: '___ (he / ever / visit) London before that trip?', options: ['Had he ever visited', 'Has he ever visited', 'Did he ever visit', 'Was he ever visiting'], correct: 0, explanation: 'Past Perfect question: Had + subject + ever + V3.' },
          { id: 15, text: 'The house was empty because the family ___ (move) out.', options: ['had moved', 'has moved', 'moved', 'was moving'], correct: 0, explanation: 'Past Perfect: had + V3 (moved).' },
          { id: 16, text: 'We ___ (just / sit) down when the phone rang.', options: ['had just sat', 'have just sat', 'just sat', 'were just sitting'], correct: 0, explanation: 'Past Perfect: had + just + V3 (sat).' },
          { id: 17, text: 'She realized she ___ (leave) her phone at home.', options: ['had left', 'has left', 'left', 'was leaving'], correct: 0, explanation: 'Past Perfect: had + V3 (left).' },
          { id: 18, text: 'They ___ (not / see) each other for ten years before the reunion.', options: ["hadn't seen", "haven't seen", "didn't see", "weren't seeing"], correct: 0, explanation: 'Past Perfect negative: hadn\'t + V3 (seen).' },
          { id: 19, text: 'Before he became a doctor, he ___ (study) biology for six years.', options: ['had studied', 'has studied', 'studied', 'was studying'], correct: 0, explanation: 'Past Perfect: had + V3 (studied).' },
          { id: 20, text: 'When the police arrived, the thief ___ (already / escape).', options: ['had already escaped', 'has already escaped', 'already escaped', 'was already escaping'], correct: 0, explanation: 'Past Perfect: had + already + V3 (escaped).' }
        ],
        scrambled: [
          { id: 1, words: ['left', 'when', 'I', 'arrived', 'the', 'train', 'had', 'already'], answer: 'when I arrived the train had already left', explanation: 'Past Perfect: had + already + V3, avvalroq sodir bo\'lgan ish.' },
          { id: 2, words: ['worked', 'she', 'was', 'tired', 'because', 'she', 'had', 'all', 'day'], answer: 'she was tired because she had worked all day', explanation: 'Past Perfect sababni bildiradi.' },
          { id: 3, words: ['finished', 'he', 'said', 'he', 'had', 'the', 'report'], answer: 'he said he had finished the report', explanation: 'Reported speech: had + V3.' },
          { id: 4, words: ['started', 'by', 'the', 'time', 'we', 'got', 'there', 'the', 'film', 'had'], answer: 'by the time we got there the film had started', explanation: 'Past Perfect: had + V3, avvalroq sodir bo\'lgan ish.' },
          { id: 5, words: ['seen', 'I', 'had', 'never', 'snow', 'before', 'I', 'visited', 'Norway'], answer: 'I had never seen snow before I visited Norway', explanation: 'Past Perfect: had + never + V3.' },
          { id: 6, words: ['eaten', 'they', 'had', 'already', 'when', 'we', 'arrived'], answer: 'they had already eaten when we arrived', explanation: 'Past Perfect: had + already + V3.' },
          { id: 7, words: ['finished', 'had', 'you', 'your', 'homework', 'before', 'dinner', '?'], answer: 'had you finished your homework before dinner', explanation: 'Past Perfect question: Had + subject + V3.' },
          { id: 8, words: ['met', 'we', "hadn't", 'before', 'the', 'conference'], answer: "we hadn't met before the conference", explanation: 'Past Perfect negative: hadn\'t + V3.' },
          { id: 9, words: ['finished', 'after', 'she', 'had', 'the', 'exam', 'she', 'went', 'home'], answer: 'after she had finished the exam she went home', explanation: 'Past Perfect: had + V3, avvalroq sodir bo\'lgan ish.' },
          { id: 10, words: ['left', 'he', 'had', 'already', 'when', 'I', 'called', 'him'], answer: 'he had already left when I called him', explanation: 'Past Perfect: had + already + V3.' },
          { id: 11, words: ['arrived', 'as', 'soon', 'as', 'she', 'had', 'the', 'meeting', 'started'], answer: 'as soon as she had arrived the meeting started', explanation: 'Past Perfect: had + V3, avvalroq sodir bo\'lgan ish.' },
          { id: 12, words: ['forgotten', 'I', "couldn't", 'get', 'in', 'because', 'I', 'had', 'my', 'key'], answer: "I couldn't get in because I had forgotten my key", explanation: 'Past Perfect sababni bildiradi.' },
          { id: 13, words: ['graduated', 'by', '2020', 'she', 'had', 'from', 'university'], answer: 'by 2020 she had graduated from university', explanation: 'Past Perfect: had + V3, ma\'lum vaqtga qadar.' },
          { id: 14, words: ['visited', 'had', 'he', 'ever', 'London', 'before', 'that', 'trip', '?'], answer: 'had he ever visited London before that trip', explanation: 'Past Perfect question: Had + subject + ever + V3.' },
          { id: 15, words: ['moved', 'the', 'house', 'was', 'empty', 'because', 'the', 'family', 'had', 'out'], answer: 'the house was empty because the family had moved out', explanation: 'Past Perfect sababni bildiradi.' },
          { id: 16, words: ['sat', 'we', 'had', 'just', 'down', 'when', 'the', 'phone', 'rang'], answer: 'we had just sat down when the phone rang', explanation: 'Past Perfect: had + just + V3.' },
          { id: 17, words: ['left', 'she', 'realized', 'she', 'had', 'her', 'phone', 'at', 'home'], answer: 'she realized she had left her phone at home', explanation: 'Past Perfect: had + V3, avvalroq sodir bo\'lgan ish.' },
          { id: 18, words: ['seen', 'they', "hadn't", 'each', 'other', 'for', 'ten', 'years', 'before', 'the', 'reunion'], answer: "they hadn't seen each other for ten years before the reunion", explanation: 'Past Perfect negative: hadn\'t + V3.' },
          { id: 19, words: ['studied', 'before', 'he', 'became', 'a', 'doctor', 'he', 'had', 'biology', 'for', 'six', 'years'], answer: 'before he became a doctor he had studied biology for six years', explanation: 'Past Perfect: had + V3, avvalroq sodir bo\'lgan ish.' },
          { id: 20, words: ['escaped', 'when', 'the', 'police', 'arrived', 'the', 'thief', 'had', 'already'], answer: 'when the police arrived the thief had already escaped', explanation: 'Past Perfect: had + already + V3.' }
        ],
        errorCorrection: [
          { id: 1, text: 'When I arrived, the train has already left.', options: ['When I arrived', 'the train', 'has already left', 'No error'], correct: 2, wrongPart: 'has already left', correction: 'had already left', explanation: 'Past reference needs Past Perfect: "had already left", not Present Perfect.' },
          { id: 2, text: 'She was tired because she has worked all day.', options: ['She was tired', 'because', 'she has worked', 'all day'], correct: 2, wrongPart: 'she has worked', correction: 'she had worked', explanation: 'With a Past Simple main clause, use Past Perfect: "had worked".' },
          { id: 3, text: 'He said he has finished the report.', options: ['He said', 'he has finished', 'the report', 'No error'], correct: 1, wrongPart: 'he has finished', correction: 'he had finished', explanation: 'Reported speech shifts Present Perfect to Past Perfect: "had finished".' },
          { id: 4, text: 'By the time we got there, the film had start.', options: ['By the time', 'we got there', 'the film', 'had start'], correct: 3, wrongPart: 'had start', correction: 'had started', explanation: 'Past Perfect needs V3: "had started", not the base form.' },
          { id: 5, text: 'I had never see snow before I visited Norway.', options: ['I had never', 'see', 'snow', 'before I visited Norway'], correct: 1, wrongPart: 'see', correction: 'seen', explanation: 'Past Perfect needs V3: "had never seen".' },
          { id: 6, text: 'They had already ate when we arrived.', options: ['They had already', 'ate', 'when', 'we arrived'], correct: 1, wrongPart: 'ate', correction: 'eaten', explanation: 'Past Perfect needs V3: "had already eaten", not the Past Simple form.' },
          { id: 7, text: 'Did you finished your homework before dinner?', options: ['Did you finished', 'your', 'homework', 'before dinner'], correct: 0, wrongPart: 'Did you finished', correction: 'Had you finished', explanation: 'To express "before another past action," use Past Perfect: "Had you finished".' },
          { id: 8, text: "We hadn't met before the conference, isn't it?", options: ["We hadn't met", 'before the conference', "isn't it", 'No error'], correct: 2, wrongPart: "isn't it", correction: "had we", explanation: 'Past Perfect negative statements use "had we" as a tag, not "isn\'t it".' },
          { id: 9, text: 'After she had finish the exam, she went home.', options: ['After she had', 'finish', 'the exam', 'she went home'], correct: 1, wrongPart: 'finish', correction: 'finished', explanation: 'Past Perfect needs V3: "had finished".' },
          { id: 10, text: 'He already left when I called him.', options: ['He', 'already left', 'when I called', 'him'], correct: 1, wrongPart: 'already left', correction: 'had already left', explanation: 'To show the action happened before another past action, use Past Perfect: "had already left".' },
          { id: 11, text: 'As soon as she has arrived, the meeting started.', options: ['As soon as', 'she has arrived', 'the meeting', 'started'], correct: 1, wrongPart: 'she has arrived', correction: 'she had arrived', explanation: 'With a Past Simple main clause, use Past Perfect: "had arrived".' },
          { id: 12, text: "I couldn't get in because I had forget my key.", options: ["I couldn't get in", 'because', 'I had forget', 'my key'], correct: 2, wrongPart: 'I had forget', correction: 'I had forgotten', explanation: 'Past Perfect needs V3: "had forgotten".' },
          { id: 13, text: 'By 2020, she has graduated from university.', options: ['By 2020', 'she has graduated', 'from university', 'No error'], correct: 1, wrongPart: 'she has graduated', correction: 'she had graduated', explanation: 'A past time marker ("By 2020") requires Past Perfect: "had graduated".' },
          { id: 14, text: 'Had he ever visit London before that trip?', options: ['Had he', 'ever visit', 'London', 'before that trip'], correct: 1, wrongPart: 'ever visit', correction: 'ever visited', explanation: 'Past Perfect needs V3: "ever visited".' },
          { id: 15, text: 'The house was empty because the family has moved out.', options: ['The house was empty', 'because', 'the family has moved', 'out'], correct: 2, wrongPart: 'the family has moved', correction: 'the family had moved', explanation: 'With a Past Simple main clause, use Past Perfect: "had moved".' },
          { id: 16, text: 'We had just sit down when the phone rang.', options: ['We had just', 'sit', 'down', 'when the phone rang'], correct: 1, wrongPart: 'sit', correction: 'sat', explanation: 'Past Perfect needs V3: "had just sat".' },
          { id: 17, text: 'She realized she has left her phone at home.', options: ['She realized', 'she has left', 'her phone', 'at home'], correct: 1, wrongPart: 'she has left', correction: 'she had left', explanation: 'With a Past Simple main clause, use Past Perfect: "had left".' },
          { id: 18, text: "They hadn't saw each other for ten years before the reunion.", options: ["They hadn't", 'saw', 'each other for ten years', 'before the reunion'], correct: 1, wrongPart: 'saw', correction: 'seen', explanation: 'Past Perfect needs V3: "hadn\'t seen", not the Past Simple form.' },
          { id: 19, text: 'Before he became a doctor, he had study biology for six years.', options: ['Before he became a doctor', 'he had', 'study', 'biology for six years'], correct: 2, wrongPart: 'study', correction: 'studied', explanation: 'Past Perfect needs V3: "had studied".' },
          { id: 20, text: 'When the police arrived, the thief already escaped.', options: ['When the police arrived', 'the thief', 'already escaped', 'No error'], correct: 2, wrongPart: 'already escaped', correction: 'had already escaped', explanation: 'To show the escape happened before the police arrived, use Past Perfect: "had already escaped".' }
        ],
        transform: [
          { id: 1, text: 'Complete the Past Perfect: "When I arrived, the train ___ (already / leave)."', options: ['had already left', 'has already left', 'already left', 'was already leaving'], correct: 0, explanation: 'Past Perfect: had + V3 (left).' },
          { id: 2, text: 'Combine using Past Perfect: "She finished work. She went home." (finished first)', options: ['After she had finished work, she went home.', 'After she finished work, she has gone home.', 'After she has finished work, she went home.', 'After she was finishing work, she went home.'], correct: 0, explanation: 'Past Perfect shows the earlier action: "had finished".' },
          { id: 3, text: 'Change to reported speech: "I have finished the report," he said. → He said he ___.', options: ['had finished the report', 'has finished the report', 'finished the report', 'was finishing the report'], correct: 0, explanation: 'Reported speech: Present Perfect → Past Perfect.' },
          { id: 4, text: 'Complete the Past Perfect: "By the time we got there, the film ___ (start)."', options: ['had started', 'has started', 'started', 'was starting'], correct: 0, explanation: 'Past Perfect: had + V3 (started).' },
          { id: 5, text: 'Combine using Past Perfect: "I never saw snow. Then I visited Norway."', options: ['I had never seen snow before I visited Norway.', 'I have never seen snow before I visited Norway.', 'I never saw snow before I visited Norway.', 'I was never seeing snow before I visited Norway.'], correct: 0, explanation: 'Past Perfect shows the earlier state: "had never seen".' },
          { id: 6, text: 'Make a question: "You had finished your homework before dinner."', options: ['Had you finished your homework before dinner?', 'Have you finished your homework before dinner?', 'Did you finish your homework before dinner?', 'Were you finishing your homework before dinner?'], correct: 0, explanation: 'Past Perfect question: Had + subject + V3?' },
          { id: 7, text: 'Make negative: "We had met before the conference." → We ___ before the conference.', options: ["hadn't met", "haven't met", "didn't meet", "weren't meeting"], correct: 0, explanation: 'Past Perfect negative: hadn\'t + V3 (met).' },
          { id: 8, text: 'Combine using Past Perfect: "She finished the exam. She went home."', options: ['After she had finished the exam, she went home.', 'After she finishing the exam, she went home.', 'After she has finished the exam, she went home.', 'After she finished the exam, she has gone home.'], correct: 0, explanation: 'Past Perfect shows the earlier action: "had finished".' },
          { id: 9, text: 'Complete the Past Perfect: "He ___ (already / leave) when I called him."', options: ['had already left', 'has already left', 'already left', 'was already leaving'], correct: 0, explanation: 'Past Perfect: had + already + V3 (left).' },
          { id: 10, text: 'Combine using Past Perfect: "She arrived. The meeting started." (as soon as she arrived)', options: ['As soon as she had arrived, the meeting started.', 'As soon as she arrived, the meeting has started.', 'As soon as she has arrived, the meeting started.', 'As soon as she was arriving, the meeting started.'], correct: 0, explanation: 'Past Perfect shows the earlier action: "had arrived".' },
          { id: 11, text: 'Give the reason using Past Perfect: "I forgot my key. I couldn\'t get in."', options: ["I couldn't get in because I had forgotten my key.", "I couldn't get in because I forgot my key first.", "I couldn't get in because I have forgotten my key.", "I couldn't get in because I was forgetting my key."], correct: 0, explanation: 'Past Perfect shows the earlier cause: "had forgotten".' },
          { id: 12, text: 'Complete the Past Perfect: "By 2020, she ___ (graduate) from university."', options: ['had graduated', 'has graduated', 'graduated', 'was graduating'], correct: 0, explanation: 'Past Perfect: had + V3 (graduated).' },
          { id: 13, text: 'Make a question: "He had ever visited London before that trip."', options: ['Had he ever visited London before that trip?', 'Has he ever visited London before that trip?', 'Did he ever visit London before that trip?', 'Was he ever visiting London before that trip?'], correct: 0, explanation: 'Past Perfect question: Had + subject + ever + V3?' },
          { id: 14, text: 'Give the reason using Past Perfect: "The family moved out. The house was empty."', options: ['The house was empty because the family had moved out.', 'The house was empty because the family moved out later.', 'The house was empty because the family has moved out.', 'The house was empty because the family was moving out.'], correct: 0, explanation: 'Past Perfect shows the earlier cause: "had moved out".' },
          { id: 15, text: 'Complete the Past Perfect: "We ___ (just / sit) down when the phone rang."', options: ['had just sat', 'have just sat', 'just sat', 'were just sitting'], correct: 0, explanation: 'Past Perfect: had + just + V3 (sat).' },
          { id: 16, text: 'Combine using Past Perfect: "She left her phone at home. She realized it."', options: ['She realized she had left her phone at home.', 'She realized she has left her phone at home.', 'She realized she leaves her phone at home.', 'She realized she was leaving her phone at home.'], correct: 0, explanation: 'Past Perfect shows the earlier action: "had left".' },
          { id: 17, text: 'Make negative: "They had seen each other before the reunion." → They ___ each other for ten years before the reunion.', options: ["hadn't seen", "haven't seen", "didn't see", "weren't seeing"], correct: 0, explanation: 'Past Perfect negative: hadn\'t + V3 (seen).' },
          { id: 18, text: 'Combine using Past Perfect: "He studied biology for six years. Then he became a doctor."', options: ['Before he became a doctor, he had studied biology for six years.', 'Before he became a doctor, he has studied biology for six years.', 'Before he became a doctor, he studies biology for six years.', 'Before he became a doctor, he was studying biology for six years.'], correct: 0, explanation: 'Past Perfect shows the earlier action: "had studied".' },
          { id: 19, text: 'Complete the Past Perfect: "When the police arrived, the thief ___ (already / escape)."', options: ['had already escaped', 'has already escaped', 'already escaped', 'was already escaping'], correct: 0, explanation: 'Past Perfect: had + already + V3 (escaped).' },
          { id: 20, text: 'Change to reported speech: "I have finished my homework," she said. → She said she ___.', options: ['had finished her homework', 'has finished her homework', 'finished her homework', 'was finishing her homework'], correct: 0, explanation: 'Reported speech: Present Perfect → Past Perfect.' }
        ],
        dialogue: [
          { id: 1, situation: 'Missing a train.', dialogue: 'A: Did you catch the train?\nB: No, when I arrived, it ___ already left.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + already + V3.' },
          { id: 2, situation: 'Talking about a tiring day.', dialogue: 'A: Why was she so tired?\nB: Because she ___ worked all day.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect sababni bildiradi.' },
          { id: 3, situation: 'Reporting what someone said.', dialogue: 'A: What did he tell you?\nB: He said he ___ finished the report.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Reported speech: had + V3.' },
          { id: 4, situation: 'Arriving late at the cinema.', dialogue: 'A: Did you see the beginning?\nB: No, by the time we got there, the film ___ started.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + V3, avvalroq sodir bo\'lgan ish.' },
          { id: 5, situation: 'Talking about a trip to Norway.', dialogue: 'A: Was it your first time seeing snow?\nB: Yes, I ___ never seen snow before I visited Norway.', options: ['had', 'have', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + never + V3.' },
          { id: 6, situation: 'Arriving for dinner.', dialogue: 'A: Are they still eating?\nB: No, they ___ already eaten when we arrived.', options: ['had', 'have', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + already + V3.' },
          { id: 7, situation: 'Checking on homework.', dialogue: 'A: ___ you finished your homework before dinner?\nB: Yes, I had.', options: ['Had', 'Have', 'Did', 'Was'], correct: 0, explanation: 'Past Perfect question: Had + subject + V3?' },
          { id: 8, situation: 'Meeting new colleagues.', dialogue: 'A: Did you know each other before?\nB: No, we ___ not met before the conference.', options: ['had', 'have', 'was', 'did'], correct: 0, explanation: 'Past Perfect negative: had not + V3.' },
          { id: 9, situation: 'Talking about an exam day.', dialogue: 'A: What did she do after the exam?\nB: After she ___ finished the exam, she went home.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + V3, avvalroq sodir bo\'lgan ish.' },
          { id: 10, situation: 'Trying to reach someone.', dialogue: 'A: Did you reach him?\nB: No, he ___ already left when I called him.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + already + V3.' },
          { id: 11, situation: 'Describing a meeting start.', dialogue: 'A: When did the meeting start?\nB: As soon as she ___ arrived, it started.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + V3, avvalroq sodir bo\'lgan ish.' },
          { id: 12, situation: 'Explaining why the door was locked.', dialogue: "A: Why couldn't you get in?\nB: Because I ___ forgotten my key.", options: ['had', 'have', 'was', 'did'], correct: 0, explanation: 'Past Perfect sababni bildiradi.' },
          { id: 13, situation: 'Talking about education history.', dialogue: 'A: Was she working by 2020?\nB: Yes, by 2020, she ___ graduated from university.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + V3, ma\'lum vaqtga qadar.' },
          { id: 14, situation: 'Discussing travel history.', dialogue: '___ he ever visited London before that trip?\nB: No, it was his first time.', options: ['Had', 'Have', 'Did', 'Was'], correct: 0, explanation: 'Past Perfect question: Had + subject + ever + V3?' },
          { id: 15, situation: 'Talking about an empty house.', dialogue: 'A: Why was the house empty?\nB: Because the family ___ moved out.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect sababni bildiradi.' },
          { id: 16, situation: 'Describing an interrupted moment.', dialogue: 'A: What were you doing when the phone rang?\nB: We ___ just sat down.', options: ['had', 'have', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + just + V3.' },
          { id: 17, situation: 'Explaining a mistake.', dialogue: 'A: Why did she go back home?\nB: She realized she ___ left her phone at home.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + V3, avvalroq sodir bo\'lgan ish.' },
          { id: 18, situation: 'Talking about an old friendship.', dialogue: 'A: Had they kept in touch?\nB: No, they ___ not seen each other for ten years before the reunion.', options: ['had', 'have', 'was', 'did'], correct: 0, explanation: 'Past Perfect negative: had not + V3.' },
          { id: 19, situation: 'Talking about a doctor\'s background.', dialogue: 'A: How long did he study?\nB: Before he became a doctor, he ___ studied biology for six years.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + V3, avvalroq sodir bo\'lgan ish.' },
          { id: 20, situation: 'Reporting a crime scene.', dialogue: 'A: Did the police catch the thief?\nB: No, when they arrived, he ___ already escaped.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Perfect: had + already + V3.' }
        ]
      },
      {
        id: 'second-conditional',
        title: 'Second Conditional',
        icon: '🌀',
        guide: `## Second Conditional (Ikkinchi shart ergash gap)

Second Conditional hozirgi yoki kelajakdagi **xayoliy, ehtimoli past yoki mumkin bo'lmagan** vaziyatlarni va ularning natijasini ifodalash uchun ishlatiladi.

## 1. Shakllanishi (Form)
• **If-band**: If + Past Simple
• **Main clause**: would + base verb
  - **If** I **had** a million dollars, I **would buy** a house.
  - I **would travel** the world **if** I **had** more time.
• **"were" ishlatilishi**: rasmiy/klassik uslubda "I/he/she/it" bilan ham **were** ishlatiladi (was emas)
  - If I **were** you, I **would apologize**.
• **Negative**: har ikkala qismda ham inkor bo'lishi mumkin
  - If I **didn't have** work, I **would go** with you.
  - If you **studied** more, you **wouldn't fail**.
• **Question**: Would + Subject + base verb, if + Past Simple?
  - **Would** you **help** me if I **asked**?

## 2. Ishlatilishi (Usage)
1. **Xayoliy, hozirgi haqiqatga zid vaziyat**:
   - If I **had** wings, I **would fly**. (lekin qanotim yo'q)
2. **Ehtimoli juda past kelajakdagi vaziyat**:
   - If I **won** the lottery, I **would quit** my job.
3. **Maslahat berish ("If I were you")**:
   - If I **were** you, I **would talk** to her.
4. **Xayoliy taxmin/tasavvur**:
   - What **would** you **do** if you **saw** a ghost?

## 3. Second Conditional vs First Conditional
• **First Conditional (If + Present, will)** — real, ehtimoli yuqori kelajak.
  - If it **rains**, I **will stay** home. (haqiqatan yomg'ir yog'ishi mumkin)
• **Second Conditional (If + Past, would)** — xayoliy yoki ehtimoli juda past.
  - If it **snowed** in July, I **would be** shocked. (deyarli mumkin emas)

## 4. Signal so'zlar
• if, unless, if I were you
• would, wouldn't; If-bandda hech qachon "would" ishlatilmaydi
• Past Simple shakli bu yerda **hozirgi/kelajak** ma'noni bildiradi, o'tmish emas`,
        questions: [
          { id: 1, text: 'If I had a million dollars, I ___ buy a house.', options: ['would', 'will', 'am', 'do'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 2, text: 'If I ___ you, I would apologize.', options: ['were', 'was', 'am', 'be'], correct: 0, explanation: 'Second Conditional formal style uses "were" for all persons.' },
          { id: 3, text: 'If I ___ more time, I would travel the world.', options: ['had', 'have', 'will have', 'having'], correct: 0, explanation: 'If-clause uses Past Simple in Second Conditional.' },
          { id: 4, text: 'If I won the lottery, I ___ quit my job.', options: ['would', 'will', 'am', 'do'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 5, text: 'What ___ you do if you saw a ghost?', options: ['would', 'will', 'do', 'did'], correct: 0, explanation: 'Second Conditional question: Would + subject + base verb.' },
          { id: 6, text: 'If you studied more, you ___ fail.', options: ["wouldn't", "won't", "don't", "didn't"], correct: 0, explanation: 'Second Conditional negative main clause: wouldn\'t + base verb.' },
          { id: 7, text: 'If I ___ wings, I would fly.', options: ['had', 'have', 'will have', 'having'], correct: 0, explanation: 'If-clause uses Past Simple in Second Conditional.' },
          { id: 8, text: 'If she had more money, she ___ buy a new car.', options: ['would', 'will', 'is', 'does'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 9, text: "If I didn't have work, I ___ go with you.", options: ['would', 'will', 'am', 'do'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 10, text: '___ you help me if I asked?', options: ['Would', 'Will', 'Do', 'Did'], correct: 0, explanation: 'Second Conditional question: Would + subject + base verb.' },
          { id: 11, text: 'If they lived closer, we ___ see each other more.', options: ['would', 'will', 'are', 'do'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 12, text: 'If he ___ harder, he would get better results.', options: ['tried', 'tries', 'will try', 'try'], correct: 0, explanation: 'If-clause uses Past Simple in Second Conditional.' },
          { id: 13, text: 'If I were rich, I ___ travel around the world.', options: ['would', 'will', 'am', 'do'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 14, text: 'If it ___ in July, I would be shocked.', options: ['snowed', 'snows', 'will snow', 'snowing'], correct: 0, explanation: 'If-clause uses Past Simple in Second Conditional.' },
          { id: 15, text: 'We ___ live in the countryside if we could.', options: ['would', 'will', 'do', 'are'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 16, text: 'If you ___ any superpower, what would you choose?', options: ['had', 'have', 'will have', 'having'], correct: 0, explanation: 'If-clause uses Past Simple in Second Conditional.' },
          { id: 17, text: 'If I knew the answer, I ___ tell you.', options: ['would', 'will', 'do', 'am'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 18, text: 'She ___ be happier if she changed jobs.', options: ['would', 'will', 'is', 'does'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 19, text: 'If we had a bigger house, we ___ get a dog.', options: ['would', 'will', 'are', 'do'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 20, text: 'If I ___ speak French, I would move to Paris.', options: ['could', 'can', 'will can', 'able'], correct: 0, explanation: 'If-clause can use "could" (Past form of "can") in Second Conditional.' }
        ],
        fillBlanks: [
          { id: 1, text: 'If I ___ (have) a million dollars, I would buy a house.', options: ['had', 'have', 'will have', 'having'], correct: 0, explanation: 'If-clause: Past Simple (had).' },
          { id: 2, text: 'If I were you, I ___ (apologize).', options: ['would apologize', 'will apologize', 'apologize', 'am apologizing'], correct: 0, explanation: 'Main clause: would + base verb (apologize).' },
          { id: 3, text: 'If I had more time, I ___ (travel) the world.', options: ['would travel', 'will travel', 'travel', 'am traveling'], correct: 0, explanation: 'Main clause: would + base verb (travel).' },
          { id: 4, text: 'If I ___ (win) the lottery, I would quit my job.', options: ['won', 'win', 'will win', 'winning'], correct: 0, explanation: 'If-clause: Past Simple (won).' },
          { id: 5, text: 'What would you do if you ___ (see) a ghost?', options: ['saw', 'see', 'will see', 'seeing'], correct: 0, explanation: 'If-clause: Past Simple (saw).' },
          { id: 6, text: 'If you studied more, you ___ (not / fail).', options: ["wouldn't fail", "won't fail", "don't fail", "didn't fail"], correct: 0, explanation: 'Main clause negative: wouldn\'t + base verb (fail).' },
          { id: 7, text: 'If I ___ (have) wings, I would fly.', options: ['had', 'have', 'will have', 'having'], correct: 0, explanation: 'If-clause: Past Simple (had).' },
          { id: 8, text: 'If she had more money, she ___ (buy) a new car.', options: ['would buy', 'will buy', 'buys', 'is buying'], correct: 0, explanation: 'Main clause: would + base verb (buy).' },
          { id: 9, text: "If I ___ (not / have) work, I would go with you.", options: ["didn't have", "don't have", "won't have", "wasn't having"], correct: 0, explanation: 'If-clause negative: Past Simple ("didn\'t have").' },
          { id: 10, text: '___ (you / help) me if I asked?', options: ['Would you help', 'Will you help', 'Do you help', 'Did you help'], correct: 0, explanation: 'Second Conditional question: Would + subject + base verb.' },
          { id: 11, text: 'If they lived closer, we ___ (see) each other more.', options: ['would see', 'will see', 'see', 'are seeing'], correct: 0, explanation: 'Main clause: would + base verb (see).' },
          { id: 12, text: 'If he ___ (try) harder, he would get better results.', options: ['tried', 'tries', 'will try', 'try'], correct: 0, explanation: 'If-clause: Past Simple (tried).' },
          { id: 13, text: 'If I were rich, I ___ (travel) around the world.', options: ['would travel', 'will travel', 'travel', 'am traveling'], correct: 0, explanation: 'Main clause: would + base verb (travel).' },
          { id: 14, text: 'If it ___ (snow) in July, I would be shocked.', options: ['snowed', 'snows', 'will snow', 'snowing'], correct: 0, explanation: 'If-clause: Past Simple (snowed).' },
          { id: 15, text: 'We ___ (live) in the countryside if we could.', options: ['would live', 'will live', 'live', 'are living'], correct: 0, explanation: 'Main clause: would + base verb (live).' },
          { id: 16, text: 'If you ___ (have) any superpower, what would you choose?', options: ['had', 'have', 'will have', 'having'], correct: 0, explanation: 'If-clause: Past Simple (had).' },
          { id: 17, text: 'If I knew the answer, I ___ (tell) you.', options: ['would tell', 'will tell', 'tell', 'am telling'], correct: 0, explanation: 'Main clause: would + base verb (tell).' },
          { id: 18, text: 'She ___ (be) happier if she changed jobs.', options: ['would be', 'will be', 'is', 'was'], correct: 0, explanation: 'Main clause: would + base verb (be).' },
          { id: 19, text: 'If we had a bigger house, we ___ (get) a dog.', options: ['would get', 'will get', 'get', 'are getting'], correct: 0, explanation: 'Main clause: would + base verb (get).' },
          { id: 20, text: 'If I ___ (can / speak) French, I would move to Paris.', options: ['could speak', 'can speak', 'will can speak', 'am able to speak'], correct: 0, explanation: 'If-clause can use "could" as the Past form of "can".' }
        ],
        scrambled: [
          { id: 1, words: ['had', 'if', 'I', 'a', 'million', 'dollars', 'buy', 'I', 'would', 'a', 'house'], answer: 'if I had a million dollars I would buy a house', explanation: 'If + Past Simple, subject + would + base verb.' },
          { id: 2, words: ['were', 'if', 'I', 'you', 'apologize', 'I', 'would'], answer: 'if I were you I would apologize', explanation: 'Second Conditional formal style: if I were you.' },
          { id: 3, words: ['had', 'if', 'I', 'more', 'time', 'travel', 'I', 'would', 'the', 'world'], answer: 'if I had more time I would travel the world', explanation: 'If + Past Simple, subject + would + base verb.' },
          { id: 4, words: ['won', 'if', 'I', 'the', 'lottery', 'quit', 'I', 'would', 'my', 'job'], answer: 'if I won the lottery I would quit my job', explanation: 'If + Past Simple, subject + would + base verb.' },
          { id: 5, words: ['do', 'what', 'would', 'you', 'if', 'saw', 'you', 'a', 'ghost'], answer: 'what would you do if you saw a ghost', explanation: 'Second Conditional question with "what".' },
          { id: 6, words: ['studied', 'if', 'you', 'more', 'fail', "wouldn't", 'you'], answer: "if you studied more you wouldn't fail", explanation: 'If + Past Simple, subject + wouldn\'t + base verb.' },
          { id: 7, words: ['had', 'if', 'I', 'wings', 'fly', 'I', 'would'], answer: 'if I had wings I would fly', explanation: 'If + Past Simple, subject + would + base verb.' },
          { id: 8, words: ['had', 'if', 'she', 'more', 'money', 'buy', 'she', 'would', 'a', 'new', 'car'], answer: 'if she had more money she would buy a new car', explanation: 'If + Past Simple, subject + would + base verb.' },
          { id: 9, words: ['have', "didn't", 'if', 'I', 'work', 'go', 'I', 'would', 'with', 'you'], answer: "if I didn't have work I would go with you", explanation: 'If-clause negative + main clause with would.' },
          { id: 10, words: ['help', 'would', 'you', 'me', 'if', 'asked', 'I'], answer: 'would you help me if I asked', explanation: 'Would + subject + base verb + if + Past Simple?' },
          { id: 11, words: ['lived', 'if', 'they', 'closer', 'see', 'we', 'would', 'each', 'other', 'more'], answer: 'if they lived closer we would see each other more', explanation: 'If + Past Simple, subject + would + base verb.' },
          { id: 12, words: ['tried', 'if', 'he', 'harder', 'get', 'he', 'would', 'better', 'results'], answer: 'if he tried harder he would get better results', explanation: 'If + Past Simple, subject + would + base verb.' },
          { id: 13, words: ['were', 'if', 'I', 'rich', 'travel', 'I', 'would', 'around', 'the', 'world'], answer: 'if I were rich I would travel around the world', explanation: 'If + Past Simple (were), subject + would + base verb.' },
          { id: 14, words: ['snowed', 'if', 'it', 'in', 'July', 'be', 'I', 'would', 'shocked'], answer: 'if it snowed in July I would be shocked', explanation: 'If + Past Simple, subject + would + base verb.' },
          { id: 15, words: ['live', 'we', 'would', 'in', 'the', 'countryside', 'if', 'we', 'could'], answer: 'we would live in the countryside if we could', explanation: 'Main clause + if + could (Past form of can).' },
          { id: 16, words: ['had', 'if', 'you', 'any', 'superpower', 'choose', 'what', 'would', 'you'], answer: 'if you had any superpower what would you choose', explanation: 'If + Past Simple, question with would.' },
          { id: 17, words: ['knew', 'if', 'I', 'the', 'answer', 'tell', 'I', 'would', 'you'], answer: 'if I knew the answer I would tell you', explanation: 'If + Past Simple, subject + would + base verb.' },
          { id: 18, words: ['changed', 'she', 'would', 'be', 'happier', 'if', 'she', 'jobs'], answer: 'she would be happier if she changed jobs', explanation: 'Main clause + if + Past Simple.' },
          { id: 19, words: ['had', 'if', 'we', 'a', 'bigger', 'house', 'get', 'we', 'would', 'a', 'dog'], answer: 'if we had a bigger house we would get a dog', explanation: 'If + Past Simple, subject + would + base verb.' },
          { id: 20, words: ['could', 'if', 'I', 'speak', 'French', 'move', 'I', 'would', 'to', 'Paris'], answer: 'if I could speak French I would move to Paris', explanation: 'If + could (Past form of can), subject + would + base verb.' }
        ],
        errorCorrection: [
          { id: 1, text: 'If I have a million dollars, I would buy a house.', options: ['If I', 'have', 'a million dollars', 'I would buy a house'], correct: 1, wrongPart: 'have', correction: 'had', explanation: 'Second Conditional if-clause uses Past Simple: "had".' },
          { id: 2, text: 'If I was you, I would apologize.', options: ['If I', 'was', 'you', 'I would apologize'], correct: 1, wrongPart: 'was', correction: 'were', explanation: 'Formal Second Conditional uses "were" for all persons: "If I were you".' },
          { id: 3, text: 'If I had more time, I will travel the world.', options: ['If I had more time', 'I', 'will travel', 'the world'], correct: 2, wrongPart: 'will travel', correction: 'would travel', explanation: 'Second Conditional main clause needs "would", not "will".' },
          { id: 4, text: 'If I will win the lottery, I would quit my job.', options: ['If I', 'will win', 'the lottery', 'I would quit my job'], correct: 1, wrongPart: 'will win', correction: 'won', explanation: 'The if-clause never uses "will" — use Past Simple: "won".' },
          { id: 5, text: 'What would you do if you see a ghost?', options: ['What would you do', 'if', 'you see', 'a ghost'], correct: 2, wrongPart: 'you see', correction: 'you saw', explanation: 'If-clause uses Past Simple in Second Conditional: "saw".' },
          { id: 6, text: 'If you studied more, you don\'t fail.', options: ['If you studied more', 'you', "don't", 'fail'], correct: 2, wrongPart: "don't", correction: "wouldn't", explanation: 'Second Conditional main clause negative: "wouldn\'t".' },
          { id: 7, text: 'If I have wings, I would fly.', options: ['If I', 'have', 'wings', 'I would fly'], correct: 1, wrongPart: 'have', correction: 'had', explanation: 'Second Conditional if-clause uses Past Simple: "had".' },
          { id: 8, text: 'If she had more money, she buys a new car.', options: ['If she had more money', 'she', 'buys', 'a new car'], correct: 2, wrongPart: 'buys', correction: 'would buy', explanation: 'Second Conditional main clause needs "would" + base verb: "would buy".' },
          { id: 9, text: "If I don't have work, I would go with you.", options: ['If I', "don't have", 'work', 'I would go with you'], correct: 1, wrongPart: "don't have", correction: "didn't have", explanation: 'Second Conditional if-clause negative uses Past Simple: "didn\'t have".' },
          { id: 10, text: 'Will you help me if I asked?', options: ['Will', 'you help me', 'if I', 'asked'], correct: 0, wrongPart: 'Will', correction: 'Would', explanation: 'Second Conditional questions use "Would", not "Will": "Would you help...?".' },
          { id: 11, text: 'If they lived closer, we will see each other more.', options: ['If they lived closer', 'we', 'will see', 'each other more'], correct: 2, wrongPart: 'will see', correction: 'would see', explanation: 'Second Conditional main clause needs "would", not "will".' },
          { id: 12, text: 'If he tries harder, he would get better results.', options: ['If he', 'tries', 'harder', 'he would get better results'], correct: 1, wrongPart: 'tries', correction: 'tried', explanation: 'Second Conditional if-clause uses Past Simple: "tried".' },
          { id: 13, text: 'If I was rich, I would travel around the world.', options: ['If I', 'was', 'rich', 'I would travel around the world'], correct: 1, wrongPart: 'was', correction: 'were', explanation: 'Formal Second Conditional uses "were" for all persons: "If I were rich".' },
          { id: 14, text: 'If it snows in July, I would be shocked.', options: ['If it', 'snows', 'in July', 'I would be shocked'], correct: 1, wrongPart: 'snows', correction: 'snowed', explanation: 'Second Conditional if-clause uses Past Simple: "snowed".' },
          { id: 15, text: 'We will live in the countryside if we could.', options: ['We', 'will live', 'in the countryside', 'if we could'], correct: 1, wrongPart: 'will live', correction: 'would live', explanation: 'Second Conditional main clause needs "would", not "will".' },
          { id: 16, text: 'If you have any superpower, what would you choose?', options: ['If you', 'have', 'any superpower', 'what would you choose'], correct: 1, wrongPart: 'have', correction: 'had', explanation: 'Second Conditional if-clause uses Past Simple: "had".' },
          { id: 17, text: 'If I knew the answer, I tell you.', options: ['If I knew the answer', 'I', 'tell', 'you'], correct: 2, wrongPart: 'tell', correction: 'would tell', explanation: 'Second Conditional main clause needs "would" + base verb: "would tell".' },
          { id: 18, text: 'She would be happier if she changes jobs.', options: ['She would be happier', 'if', 'she changes', 'jobs'], correct: 2, wrongPart: 'she changes', correction: 'she changed', explanation: 'Second Conditional if-clause uses Past Simple: "changed".' },
          { id: 19, text: 'If we had a bigger house, we get a dog.', options: ['If we had a bigger house', 'we', 'get', 'a dog'], correct: 2, wrongPart: 'get', correction: 'would get', explanation: 'Second Conditional main clause needs "would" + base verb: "would get".' },
          { id: 20, text: 'If I can speak French, I would move to Paris.', options: ['If I', 'can speak', 'French', 'I would move to Paris'], correct: 1, wrongPart: 'can speak', correction: 'could speak', explanation: 'Second Conditional if-clause uses "could", the Past form of "can".' }
        ],
        transform: [
          { id: 1, text: 'Complete the Second Conditional: "If I ___ (have) a million dollars, I would buy a house."', options: ['had', 'have', 'will have', 'having'], correct: 0, explanation: 'If-clause: Past Simple (had).' },
          { id: 2, text: 'Give advice using Second Conditional: "You should apologize." (If I were you)', options: ['If I were you, I would apologize.', 'If I am you, I will apologize.', 'If I was you, I will apologize.', 'If I were you, I apologize.'], correct: 0, explanation: 'Second Conditional advice: If I were you, I would...' },
          { id: 3, text: 'Combine using Second Conditional: "I don\'t have more time. I can\'t travel the world."', options: ['If I had more time, I would travel the world.', 'If I have more time, I will travel the world.', 'If I had more time, I will travel the world.', 'If I have more time, I would travel the world.'], correct: 0, explanation: 'Second Conditional: If + Past Simple, would + base verb.' },
          { id: 4, text: 'Complete the Second Conditional: "If I ___ (win) the lottery, I would quit my job."', options: ['won', 'win', 'will win', 'winning'], correct: 0, explanation: 'If-clause: Past Simple (won).' },
          { id: 5, text: 'Make a question using Second Conditional: "You would do something if you saw a ghost."', options: ['What would you do if you saw a ghost?', 'What will you do if you see a ghost?', 'What would you do if you see a ghost?', 'What do you do if you saw a ghost?'], correct: 0, explanation: 'Second Conditional question: Would + subject + base verb + if + Past Simple?' },
          { id: 6, text: 'Make negative (main clause): "If you studied more, you would pass." → If you didn\'t study, you ___ fail.', options: ['would', 'will', 'do', 'did'], correct: 0, explanation: 'Second Conditional main clause: would + base verb (fail).' },
          { id: 7, text: 'Combine using Second Conditional: "I don\'t have wings. I can\'t fly."', options: ['If I had wings, I would fly.', 'If I have wings, I will fly.', 'If I had wings, I will fly.', 'If I have wings, I would fly.'], correct: 0, explanation: 'Second Conditional: If + Past Simple, would + base verb.' },
          { id: 8, text: 'Combine using Second Conditional: "She doesn\'t have more money. She can\'t buy a new car."', options: ['If she had more money, she would buy a new car.', 'If she has more money, she will buy a new car.', 'If she had more money, she will buy a new car.', 'If she has more money, she would buy a new car.'], correct: 0, explanation: 'Second Conditional: If + Past Simple, would + base verb.' },
          { id: 9, text: 'Make negative (if-clause): "If I have work, I won\'t go with you." → If I ___ have work, I would go with you.', options: ["didn't", "don't", "won't", "wasn't"], correct: 0, explanation: "Second Conditional if-clause negative: Past Simple (\"didn't\")." },
          { id: 10, text: 'Make a question using Second Conditional: "You would help me if I asked."', options: ['Would you help me if I asked?', 'Will you help me if I ask?', 'Do you help me if I asked?', 'Would you help me if I ask?'], correct: 0, explanation: 'Second Conditional question: Would + subject + base verb?' },
          { id: 11, text: 'Combine using Second Conditional: "They don\'t live closer. We don\'t see each other much."', options: ['If they lived closer, we would see each other more.', 'If they live closer, we will see each other more.', 'If they lived closer, we will see each other more.', 'If they live closer, we would see each other more.'], correct: 0, explanation: 'Second Conditional: If + Past Simple, would + base verb.' },
          { id: 12, text: 'Complete the Second Conditional: "If he ___ (try) harder, he would get better results."', options: ['tried', 'tries', 'will try', 'try'], correct: 0, explanation: 'If-clause: Past Simple (tried).' },
          { id: 13, text: 'Combine using Second Conditional: "I am not rich. I can\'t travel around the world."', options: ['If I were rich, I would travel around the world.', 'If I am rich, I will travel around the world.', 'If I were rich, I will travel around the world.', 'If I am rich, I would travel around the world.'], correct: 0, explanation: 'Second Conditional: If + were, would + base verb.' },
          { id: 14, text: 'Complete the Second Conditional: "If it ___ (snow) in July, I would be shocked."', options: ['snowed', 'snows', 'will snow', 'snowing'], correct: 0, explanation: 'If-clause: Past Simple (snowed).' },
          { id: 15, text: 'Combine using Second Conditional: "We can\'t live in the countryside now."', options: ['We would live in the countryside if we could.', 'We will live in the countryside if we can.', 'We would live in the countryside if we can.', 'We will live in the countryside if we could.'], correct: 0, explanation: 'Second Conditional main clause + if + could.' },
          { id: 16, text: 'Make a question using Second Conditional: "You have a superpower. What would you choose?"', options: ['If you had any superpower, what would you choose?', 'If you have any superpower, what will you choose?', 'If you had any superpower, what will you choose?', 'If you have any superpower, what would you choose?'], correct: 0, explanation: 'Second Conditional: If + Past Simple, would + base verb question.' },
          { id: 17, text: 'Combine using Second Conditional: "I don\'t know the answer. I can\'t tell you."', options: ['If I knew the answer, I would tell you.', 'If I know the answer, I will tell you.', 'If I knew the answer, I will tell you.', 'If I know the answer, I would tell you.'], correct: 0, explanation: 'Second Conditional: If + Past Simple, would + base verb.' },
          { id: 18, text: 'Combine using Second Conditional: "She doesn\'t change jobs. She isn\'t happier."', options: ['She would be happier if she changed jobs.', 'She will be happier if she changes jobs.', 'She would be happier if she changes jobs.', 'She will be happier if she changed jobs.'], correct: 0, explanation: 'Second Conditional: main clause + if + Past Simple.' },
          { id: 19, text: 'Combine using Second Conditional: "We don\'t have a bigger house. We can\'t get a dog."', options: ['If we had a bigger house, we would get a dog.', 'If we have a bigger house, we will get a dog.', 'If we had a bigger house, we will get a dog.', 'If we have a bigger house, we would get a dog.'], correct: 0, explanation: 'Second Conditional: If + Past Simple, would + base verb.' },
          { id: 20, text: 'Combine using Second Conditional: "I can\'t speak French. I can\'t move to Paris."', options: ['If I could speak French, I would move to Paris.', 'If I can speak French, I will move to Paris.', 'If I could speak French, I will move to Paris.', 'If I can speak French, I would move to Paris.'], correct: 0, explanation: 'Second Conditional: If + could, would + base verb.' }
        ],
        dialogue: [
          { id: 1, situation: 'Talking about dreams.', dialogue: 'A: What would you do with a lot of money?\nB: If I had a million dollars, I ___ buy a house.', options: ['would', 'will', 'am', 'do'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 2, situation: 'Giving advice to a friend.', dialogue: "A: She hurt my feelings.\nB: If I were you, I ___ apologize... wait, she should apologize to you!", options: ['would', 'will', 'am', 'do'], correct: 0, explanation: 'Second Conditional advice: If I were you, I would...' },
          { id: 3, situation: 'Talking about free time.', dialogue: 'A: What would you do with more free time?\nB: If I had more time, I ___ travel the world.', options: ['would', 'will', 'am', 'do'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 4, situation: 'Discussing the lottery.', dialogue: 'A: Would you keep working if you won the lottery?\nB: No, if I won, I ___ quit my job.', options: ['would', 'will', 'am', 'do'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 5, situation: 'Talking about fears.', dialogue: 'A: Are you scared of ghosts?\nB: What ___ you do if you saw one?', options: ['would', 'will', 'do', 'did'], correct: 0, explanation: 'Second Conditional question: would + subject + base verb.' },
          { id: 6, situation: 'Discussing study habits.', dialogue: "A: I'm worried about the exam.\nB: If you studied more, you ___ fail.", options: ["wouldn't", "won't", "don't", "didn't"], correct: 0, explanation: 'Second Conditional negative main clause: wouldn\'t + base verb.' },
          { id: 7, situation: 'Talking about superpowers.', dialogue: 'A: What would you do with wings?\nB: If I had wings, I ___ fly everywhere.', options: ['would', 'will', 'am', 'do'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 8, situation: 'Talking about finances.', dialogue: 'A: Does she want a new car?\nB: Yes, if she had more money, she ___ buy one.', options: ['would', 'will', 'is', 'does'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 9, situation: 'Making plans with a friend.', dialogue: "A: Can you come with us?\nB: If I didn't have work, I ___ go with you.", options: ['would', 'will', 'am', 'do'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 10, situation: 'Asking for help.', dialogue: '___ you help me if I asked?\nB: Of course I would.', options: ['Would', 'Will', 'Do', 'Did'], correct: 0, explanation: 'Second Conditional question: Would + subject + base verb.' },
          { id: 11, situation: 'Talking about distant relatives.', dialogue: 'A: Do you see your cousins often?\nB: Not really. If they lived closer, we ___ see each other more.', options: ['would', 'will', 'are', 'do'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 12, situation: 'Giving encouragement.', dialogue: 'A: I keep failing my tests.\nB: If you tried harder, you ___ get better results.', options: ['would', 'will', 'are', 'do'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 13, situation: 'Talking about wealth.', dialogue: 'A: What would you do if you were rich?\nB: If I were rich, I ___ travel around the world.', options: ['would', 'will', 'am', 'do'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 14, situation: 'Talking about unusual weather.', dialogue: 'A: Could it snow in summer here?\nB: Never, if it ___ in July, I would be shocked.', options: ['snowed', 'snows', 'will snow', 'snowing'], correct: 0, explanation: 'If-clause uses Past Simple (snowed).' },
          { id: 15, situation: 'Talking about lifestyle preferences.', dialogue: 'A: Do you like the city?\nB: Not really. We ___ live in the countryside if we could.', options: ['would', 'will', 'do', 'are'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 16, situation: 'Playing a hypothetical game.', dialogue: 'A: If you had any superpower, what ___ you choose?\nB: Probably flying.', options: ['would', 'will', 'do', 'did'], correct: 0, explanation: 'Second Conditional question: would + subject + base verb.' },
          { id: 17, situation: 'Helping with a puzzle.', dialogue: "A: Do you know the answer?\nB: No, but if I knew it, I ___ tell you.", options: ['would', 'will', 'do', 'am'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 18, situation: 'Discussing career changes.', dialogue: 'A: Is she happy at work?\nB: Not really. She ___ be happier if she changed jobs.', options: ['would', 'will', 'is', 'does'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 19, situation: 'Talking about pets.', dialogue: 'A: Why don\'t you have a dog?\nB: If we had a bigger house, we ___ get one.', options: ['would', 'will', 'are', 'do'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' },
          { id: 20, situation: 'Talking about moving abroad.', dialogue: 'A: Would you ever live in Paris?\nB: If I could speak French, I ___ move there.', options: ['would', 'will', 'do', 'am'], correct: 0, explanation: 'Second Conditional main clause: would + base verb.' }
        ]
      },
      {
        id: 'modal-verbs',
        title: 'Modal Verbs',
        icon: '🧩',
        guide: `## Modal Verbs (Modal fe'llar: majburiyat, ruxsat, maslahat, ehtimollik)

Modal fe'llar asosiy fe'lga qo'shimcha ma'no (majburiyat, ruxsat, maslahat, ehtimollik, qobiliyat) qo'shadi. Ular hech qachon "-s", "-ing", "-ed" olmaydi va o'zidan keyin doim **base verb** keladi.

## 1. Shakllanishi (Form)
• Subject + modal + base verb (to'siqsiz)
  - She **must go** now. She **can swim**. You **should study**.
• **Inkor**: modal + not
  - You **mustn't smoke** here. He **can't drive**.
• **Savol**: Modal + Subject + base verb?
  - **Must** I **finish** this today? **Can** you **help** me?

## 2. Ishlatilishi (Usage)
1. **must** — kuchli shaxsiy majburiyat/ishonch:
   - I **must finish** this report today. (o'zim his qilgan zaruriyat)
   - You **must be** tired after that trip. (kuchli ishonch/xulosa)
2. **have to** — tashqi qoida/majburiyat (qonun, boshqa odam):
   - Employees **have to wear** a uniform. (kompaniya qoidasi)
   - **must** va **have to** ko'pincha almashinadi, lekin **have to** tashqi manbadan, **must** ichki his-tuyg'udan kelib chiqadi
3. **mustn't** vs **don't have to**:
   - You **mustn't** enter. (taqiqlangan — kirish MAN ETILGAN)
   - You **don't have to** come. (majburiy emas — kelish SHART EMAS, lekin mumkin)
4. **should** — maslahat, tavsiya:
   - You **should see** a doctor. (maslahat, majburiyat emas)
5. **can** — qobiliyat, ruxsat, so'rov:
   - She **can speak** three languages. (qobiliyat)
   - **Can** I **open** the window? (ruxsat so'rash, norasmiy)
6. **may** — ruxsat (rasmiy), ehtimollik:
   - **May** I **come** in? (ruxsat so'rash, rasmiy)
   - It **may rain** later. (ehtimollik)

## 3. Solishtirish jadvali
• must (ichki majburiyat) vs have to (tashqi majburiyat)
• mustn't (taqiq) vs don't have to (ixtiyoriy)
• can (norasmiy ruxsat/qobiliyat) vs may (rasmiy ruxsat/ehtimollik)
• should (maslahat) vs must (majburiyat) — should kuchsizroq

## 4. Signal so'zlar
• must, have to/has to, mustn't, don't have to/doesn't have to
• should, shouldn't
• can, can't, could (o'tmishda)
• may, might (ehtimollik, kamroq aniq)`,
        questions: [
          { id: 1, text: 'I ___ finish this report today — it\'s urgent.', options: ['must', 'may', 'could', 'was'], correct: 0, explanation: '"must" — kuchli shaxsiy majburiyat.' },
          { id: 2, text: 'Employees ___ wear a uniform at this company.', options: ['have to', 'may', 'could', 'were'], correct: 0, explanation: '"have to" — tashqi qoida/majburiyat.' },
          { id: 3, text: 'You ___ enter this room — it\'s strictly forbidden.', options: ["mustn't", "don't have to", "shouldn't", "can't"], correct: 0, explanation: '"mustn\'t" — taqiq, kirish man etilgan.' },
          { id: 4, text: 'You ___ come to the party if you don\'t want to — it\'s optional.', options: ["don't have to", "mustn't", "can't", "shouldn't"], correct: 0, explanation: '"don\'t have to" — majburiy emas, ixtiyoriy.' },
          { id: 5, text: 'You ___ see a doctor about that cough.', options: ['should', 'must', 'can', 'may'], correct: 0, explanation: '"should" — maslahat, tavsiya.' },
          { id: 6, text: 'She ___ speak three languages fluently.', options: ['can', 'must', 'should', 'may'], correct: 0, explanation: '"can" — qobiliyatni bildiradi.' },
          { id: 7, text: '___ I open the window? It\'s hot in here.', options: ['Can', 'Must', 'Should', 'Have to'], correct: 0, explanation: '"Can" — norasmiy ruxsat so\'rash.' },
          { id: 8, text: '___ I come in, please?', options: ['May', 'Must', 'Should', 'Have to'], correct: 0, explanation: '"May" — rasmiy ruxsat so\'rash.' },
          { id: 9, text: 'It ___ rain later, so take an umbrella just in case.', options: ['may', 'must', 'should', 'have to'], correct: 0, explanation: '"may" — ehtimollikni bildiradi.' },
          { id: 10, text: 'You ___ be tired after such a long trip.', options: ['must', 'can', 'should', 'may not'], correct: 0, explanation: '"must" — kuchli ishonch/xulosa.' },
          { id: 11, text: 'He ___ swim when he was five years old.', options: ['could', 'can', 'may', 'must'], correct: 0, explanation: '"could" — o\'tmishdagi qobiliyat.' },
          { id: 12, text: 'Students ___ hand in their homework by Friday.', options: ['have to', 'may', 'could', 'were'], correct: 0, explanation: '"have to" — tashqi qoida (maktab qoidasi).' },
          { id: 13, text: 'You ___ smoke inside the building.', options: ["mustn't", "don't have to", "shouldn't", "may not"], correct: 0, explanation: '"mustn\'t" — taqiq, chekish man etilgan.' },
          { id: 14, text: 'You ___ bring your own laptop — we provide one.', options: ["don't have to", "mustn't", "can't", "shouldn't"], correct: 0, explanation: '"don\'t have to" — ixtiyoriy, shart emas.' },
          { id: 15, text: 'You ___ apologize to her — it was a small mistake.', options: ['should', 'must', 'can', 'have to'], correct: 0, explanation: '"should" — maslahat, tavsiya.' },
          { id: 16, text: 'They ___ afford a new car this year.', options: ["can't", "mustn't", "shouldn't", "mayn't"], correct: 0, explanation: '"can\'t" — imkoniyat/qobiliyat yo\'qligi.' },
          { id: 17, text: '___ you help me carry these boxes?', options: ['Can', 'Must', 'Should', 'Have to'], correct: 0, explanation: '"Can" — norasmiy so\'rov.' },
          { id: 18, text: '___ I ask you a personal question?', options: ['May', 'Must', 'Should', 'Have to'], correct: 0, explanation: '"May" — rasmiy ruxsat so\'rash.' },
          { id: 19, text: 'The lights are off — they ___ be asleep already.', options: ['must', 'can', 'should', 'have to'], correct: 0, explanation: '"must" — kuchli ishonch/xulosa.' },
          { id: 20, text: 'We ___ leave early tomorrow to catch the flight.', options: ['have to', 'may', 'could', 'were'], correct: 0, explanation: '"have to" — tashqi zaruriyat (parvoz vaqti).' }
        ],
        fillBlanks: [
          { id: 1, text: 'I ___ (must / finish) this report today.', options: ['must finish', 'have to finished', 'must to finish', 'musting finish'], correct: 0, explanation: 'Modal + base verb, hech qanday qo\'shimcha qo\'shilmaydi.' },
          { id: 2, text: 'Employees ___ (have to / wear) a uniform.', options: ['have to wear', 'has to wear', 'have to wearing', 'must to wear'], correct: 0, explanation: '"have to" + base verb (wear).' },
          { id: 3, text: 'You ___ (mustn\'t / enter) this room.', options: ["mustn't enter", "don't must enter", "mustn't to enter", "mustn't entering"], correct: 0, explanation: '"mustn\'t" + base verb (enter), taqiq.' },
          { id: 4, text: 'You ___ (don\'t have to / come) if you don\'t want to.', options: ["don't have to come", "mustn't come", "don't must come", "haven't to come"], correct: 0, explanation: '"don\'t have to" + base verb (come), ixtiyoriy.' },
          { id: 5, text: 'You ___ (should / see) a doctor about that cough.', options: ['should see', 'should to see', 'should seeing', 'shoulds see'], correct: 0, explanation: '"should" + base verb (see).' },
          { id: 6, text: 'She ___ (can / speak) three languages.', options: ['can speak', 'can to speak', 'cans speak', 'can speaking'], correct: 0, explanation: '"can" + base verb (speak).' },
          { id: 7, text: '___ (can / I / open) the window?', options: ['Can I open', 'Can I to open', 'Can I opening', 'I can open'], correct: 0, explanation: 'Modal question: Can + subject + base verb?' },
          { id: 8, text: '___ (may / I / come) in?', options: ['May I come', 'May I to come', 'I may come', 'May I coming'], correct: 0, explanation: 'Modal question: May + subject + base verb?' },
          { id: 9, text: 'It ___ (may / rain) later.', options: ['may rain', 'may to rain', 'may raining', 'mays rain'], correct: 0, explanation: '"may" + base verb (rain), ehtimollik.' },
          { id: 10, text: 'You ___ (must / be) tired after that trip.', options: ['must be', 'must to be', 'must being', 'musts be'], correct: 0, explanation: '"must" + base verb (be), kuchli ishonch.' },
          { id: 11, text: 'He ___ (could / swim) when he was five.', options: ['could swim', 'could to swim', 'coulds swim', 'could swimming'], correct: 0, explanation: '"could" + base verb (swim), o\'tmishdagi qobiliyat.' },
          { id: 12, text: 'Students ___ (have to / hand) in homework by Friday.', options: ['have to hand', 'has to hand', 'have to handing', 'must to hand'], correct: 0, explanation: '"have to" + base verb (hand).' },
          { id: 13, text: 'You ___ (mustn\'t / smoke) inside the building.', options: ["mustn't smoke", "don't must smoke", "mustn't to smoke", "mustn't smoking"], correct: 0, explanation: '"mustn\'t" + base verb (smoke), taqiq.' },
          { id: 14, text: 'You ___ (don\'t have to / bring) your own laptop.', options: ["don't have to bring", "mustn't bring", "don't must bring", "haven't to bring"], correct: 0, explanation: '"don\'t have to" + base verb (bring), ixtiyoriy.' },
          { id: 15, text: 'You ___ (should / apologize) to her.', options: ['should apologize', 'should to apologize', 'shoulds apologize', 'should apologizing'], correct: 0, explanation: '"should" + base verb (apologize).' },
          { id: 16, text: 'They ___ (can\'t / afford) a new car.', options: ["can't afford", "can't to afford", "cant's afford", "can't affording"], correct: 0, explanation: '"can\'t" + base verb (afford).' },
          { id: 17, text: '___ (can / you / help) me carry these boxes?', options: ['Can you help', 'Can you to help', 'You can help', 'Can you helping'], correct: 0, explanation: 'Modal question: Can + subject + base verb?' },
          { id: 18, text: '___ (may / I / ask) you a personal question?', options: ['May I ask', 'May I to ask', 'I may ask', 'May I asking'], correct: 0, explanation: 'Modal question: May + subject + base verb?' },
          { id: 19, text: 'The lights are off — they ___ (must / be) asleep.', options: ['must be', 'must to be', 'must being', 'musts be'], correct: 0, explanation: '"must" + base verb (be), kuchli ishonch.' },
          { id: 20, text: 'We ___ (have to / leave) early tomorrow.', options: ['have to leave', 'has to leave', 'have to leaving', 'must to leave'], correct: 0, explanation: '"have to" + base verb (leave).' }
        ],
        scrambled: [
          { id: 1, words: ['finish', 'I', 'must', 'this', 'report', 'today'], answer: 'I must finish this report today', explanation: 'Subject + must + base verb.' },
          { id: 2, words: ['wear', 'employees', 'have', 'to', 'a', 'uniform'], answer: 'employees have to wear a uniform', explanation: 'Subject + have to + base verb.' },
          { id: 3, words: ['enter', 'you', "mustn't", 'this', 'room'], answer: "you mustn't enter this room", explanation: 'Subject + mustn\'t + base verb.' },
          { id: 4, words: ['come', 'you', "don't", 'have', 'to', 'if', 'you', "don't", 'want', 'to'], answer: "you don't have to come if you don't want to", explanation: 'Subject + don\'t have to + base verb.' },
          { id: 5, words: ['see', 'you', 'should', 'a', 'doctor'], answer: 'you should see a doctor', explanation: 'Subject + should + base verb.' },
          { id: 6, words: ['speak', 'she', 'can', 'three', 'languages'], answer: 'she can speak three languages', explanation: 'Subject + can + base verb.' },
          { id: 7, words: ['open', 'can', 'I', 'the', 'window', '?'], answer: 'can I open the window', explanation: 'Can + subject + base verb?' },
          { id: 8, words: ['come', 'may', 'I', 'in', '?'], answer: 'may I come in', explanation: 'May + subject + base verb?' },
          { id: 9, words: ['rain', 'it', 'may', 'later'], answer: 'it may rain later', explanation: 'Subject + may + base verb.' },
          { id: 10, words: ['be', 'you', 'must', 'tired', 'after', 'that', 'trip'], answer: 'you must be tired after that trip', explanation: 'Subject + must + base verb.' },
          { id: 11, words: ['swim', 'he', 'could', 'when', 'he', 'was', 'five'], answer: 'he could swim when he was five', explanation: 'Subject + could + base verb.' },
          { id: 12, words: ['hand', 'students', 'have', 'to', 'in', 'homework', 'by', 'Friday'], answer: 'students have to hand in homework by Friday', explanation: 'Subject + have to + base verb.' },
          { id: 13, words: ['smoke', 'you', "mustn't", 'inside', 'the', 'building'], answer: "you mustn't smoke inside the building", explanation: 'Subject + mustn\'t + base verb.' },
          { id: 14, words: ['bring', 'you', "don't", 'have', 'to', 'your', 'own', 'laptop'], answer: "you don't have to bring your own laptop", explanation: 'Subject + don\'t have to + base verb.' },
          { id: 15, words: ['apologize', 'you', 'should', 'to', 'her'], answer: 'you should apologize to her', explanation: 'Subject + should + base verb.' },
          { id: 16, words: ['afford', 'they', "can't", 'a', 'new', 'car'], answer: "they can't afford a new car", explanation: 'Subject + can\'t + base verb.' },
          { id: 17, words: ['help', 'can', 'you', 'me', 'carry', 'these', 'boxes', '?'], answer: 'can you help me carry these boxes', explanation: 'Can + subject + base verb?' },
          { id: 18, words: ['ask', 'may', 'I', 'you', 'a', 'personal', 'question', '?'], answer: 'may I ask you a personal question', explanation: 'May + subject + base verb?' },
          { id: 19, words: ['be', 'they', 'must', 'asleep', 'already'], answer: 'they must be asleep already', explanation: 'Subject + must + base verb.' },
          { id: 20, words: ['leave', 'we', 'have', 'to', 'early', 'tomorrow'], answer: 'we have to leave early tomorrow', explanation: 'Subject + have to + base verb.' }
        ],
        errorCorrection: [
          { id: 1, text: 'I must to finish this report today.', options: ['I', 'must to finish', 'this report', 'today'], correct: 1, wrongPart: 'must to finish', correction: 'must finish', explanation: 'Modal verbs are followed directly by the base verb, no "to": "must finish".' },
          { id: 2, text: 'Employees have to wearing a uniform.', options: ['Employees', 'have to', 'wearing', 'a uniform'], correct: 2, wrongPart: 'wearing', correction: 'wear', explanation: 'After "have to", use the base verb: "wear", not "wearing".' },
          { id: 3, text: "You don't must enter this room.", options: ['You', "don't must", 'enter', 'this room'], correct: 1, wrongPart: "don't must", correction: "mustn't", explanation: '"must" is negated as "mustn\'t", not "don\'t must".' },
          { id: 4, text: "You mustn't come if you don't want to.", options: ['You', "mustn't come", 'if you', "don't want to"], correct: 1, wrongPart: "mustn't come", correction: "don't have to come", explanation: '"mustn\'t" means forbidden; for "not necessary" use "don\'t have to".' },
          { id: 5, text: 'You should to see a doctor.', options: ['You', 'should to see', 'a doctor', 'No error'], correct: 1, wrongPart: 'should to see', correction: 'should see', explanation: 'Modal verbs are followed directly by the base verb, no "to": "should see".' },
          { id: 6, text: 'She can speaks three languages.', options: ['She', 'can', 'speaks', 'three languages'], correct: 2, wrongPart: 'speaks', correction: 'speak', explanation: 'After a modal verb, use the base verb without "-s": "speak".' },
          { id: 7, text: 'Can I opening the window?', options: ['Can', 'I', 'opening', 'the window'], correct: 2, wrongPart: 'opening', correction: 'open', explanation: 'After "can", use the base verb: "open", not "opening".' },
          { id: 8, text: 'May I to come in?', options: ['May', 'I to come', 'in', 'No error'], correct: 1, wrongPart: 'I to come', correction: 'I come', explanation: 'Modal verbs are followed directly by the base verb, no "to": "May I come".' },
          { id: 9, text: 'It mays rain later.', options: ['It', 'mays', 'rain', 'later'], correct: 1, wrongPart: 'mays', correction: 'may', explanation: 'Modal verbs never take "-s": "may", not "mays".' },
          { id: 10, text: 'You must being tired after that trip.', options: ['You', 'must', 'being', 'tired after that trip'], correct: 2, wrongPart: 'being', correction: 'be', explanation: 'After "must", use the base verb: "be", not "being".' },
          { id: 11, text: 'He can swim when he was five years old.', options: ['He', 'can swim', 'when he was', 'five years old'], correct: 1, wrongPart: 'can swim', correction: 'could swim', explanation: 'For a past ability, use "could", the past form of "can".' },
          { id: 12, text: 'Students has to hand in their homework.', options: ['Students', 'has to', 'hand in', 'their homework'], correct: 1, wrongPart: 'has to', correction: 'have to', explanation: 'With plural subject "Students", use "have to", not "has to".' },
          { id: 13, text: "You don't have to smoke inside the building.", options: ['You', "don't have to smoke", 'inside', 'the building'], correct: 1, wrongPart: "don't have to smoke", correction: "mustn't smoke", explanation: 'To express a prohibition (forbidden), use "mustn\'t", not "don\'t have to".' },
          { id: 14, text: 'You mustn\'t bring your own laptop — it\'s optional.', options: ['You', "mustn't bring", 'your own laptop', "it's optional"], correct: 1, wrongPart: "mustn't bring", correction: "don't have to bring", explanation: 'Since it is optional (not forbidden), use "don\'t have to".' },
          { id: 15, text: 'You should apologizing to her.', options: ['You', 'should', 'apologizing', 'to her'], correct: 2, wrongPart: 'apologizing', correction: 'apologize', explanation: 'After "should", use the base verb: "apologize", not "apologizing".' },
          { id: 16, text: "They can't affords a new car.", options: ['They', "can't", 'affords', 'a new car'], correct: 2, wrongPart: 'affords', correction: 'afford', explanation: 'After a modal verb, use the base verb without "-s": "afford".' },
          { id: 17, text: 'Can you helping me carry these boxes?', options: ['Can', 'you', 'helping', 'me carry these boxes'], correct: 2, wrongPart: 'helping', correction: 'help', explanation: 'After "can", use the base verb: "help", not "helping".' },
          { id: 18, text: 'May I asks you a personal question?', options: ['May', 'I', 'asks', 'you a personal question'], correct: 2, wrongPart: 'asks', correction: 'ask', explanation: 'Modal verbs never take "-s": "ask", not "asks".' },
          { id: 19, text: 'The lights are off — they must to be asleep.', options: ['The lights are off', 'they', 'must to be', 'asleep'], correct: 2, wrongPart: 'must to be', correction: 'must be', explanation: 'Modal verbs are followed directly by the base verb, no "to": "must be".' },
          { id: 20, text: 'We have to leaving early tomorrow.', options: ['We', 'have to', 'leaving', 'early tomorrow'], correct: 2, wrongPart: 'leaving', correction: 'leave', explanation: 'After "have to", use the base verb: "leave", not "leaving".' }
        ],
        transform: [
          { id: 1, text: 'Express strong personal obligation: "It\'s necessary for me to finish this report today."', options: ['I must finish this report today.', 'I can finish this report today.', 'I may finish this report today.', 'I should finish this report today.'], correct: 0, explanation: '"must" expresses strong personal obligation.' },
          { id: 2, text: 'Express an external rule: "Company policy requires employees to wear a uniform."', options: ['Employees have to wear a uniform.', 'Employees must to wear a uniform.', 'Employees may wear a uniform.', 'Employees should wear a uniform.'], correct: 0, explanation: '"have to" expresses an external rule/obligation.' },
          { id: 3, text: 'Express prohibition: "It is forbidden to enter this room."', options: ["You mustn't enter this room.", "You don't have to enter this room.", "You shouldn't enter this room.", "You can't enter this room."], correct: 0, explanation: '"mustn\'t" expresses prohibition.' },
          { id: 4, text: 'Express that something is optional: "Coming to the party is not required."', options: ["You don't have to come to the party.", "You mustn't come to the party.", "You can't come to the party.", "You shouldn't come to the party."], correct: 0, explanation: '"don\'t have to" expresses lack of obligation.' },
          { id: 5, text: 'Give advice: "I recommend that you see a doctor."', options: ['You should see a doctor.', 'You must see a doctor.', 'You can see a doctor.', 'You have to see a doctor.'], correct: 0, explanation: '"should" is used for advice/recommendation.' },
          { id: 6, text: 'Express ability: "She has the ability to speak three languages."', options: ['She can speak three languages.', 'She must speak three languages.', 'She should speak three languages.', 'She may speak three languages.'], correct: 0, explanation: '"can" expresses ability.' },
          { id: 7, text: 'Ask for informal permission: "I want permission to open the window."', options: ['Can I open the window?', 'Must I open the window?', 'Should I open the window?', 'Have I to open the window?'], correct: 0, explanation: '"Can" is used for informal permission requests.' },
          { id: 8, text: 'Ask for formal permission: "I want polite permission to come in."', options: ['May I come in?', 'Must I come in?', 'Should I come in?', 'Have I to come in?'], correct: 0, explanation: '"May" is used for formal permission requests.' },
          { id: 9, text: 'Express possibility: "It is possible that it will rain later."', options: ['It may rain later.', 'It must rain later.', 'It should rain later.', 'It has to rain later.'], correct: 0, explanation: '"may" expresses possibility.' },
          { id: 10, text: 'Express a logical conclusion: "I am sure you are tired after that trip."', options: ['You must be tired after that trip.', 'You can be tired after that trip.', 'You may not be tired after that trip.', 'You should be tired after that trip.'], correct: 0, explanation: '"must" expresses a strong logical conclusion.' },
          { id: 11, text: 'Express past ability: "He had the ability to swim at age five."', options: ['He could swim when he was five.', 'He can swim when he was five.', 'He must swim when he was five.', 'He should swim when he was five.'], correct: 0, explanation: '"could" is the past form of "can" for ability.' },
          { id: 12, text: 'Express an external requirement: "School rules require students to hand in homework by Friday."', options: ['Students have to hand in their homework by Friday.', 'Students must to hand in their homework by Friday.', 'Students may hand in their homework by Friday.', 'Students should hand in their homework by Friday.'], correct: 0, explanation: '"have to" expresses an external rule.' },
          { id: 13, text: 'Express prohibition: "Smoking inside the building is forbidden."', options: ["You mustn't smoke inside the building.", "You don't have to smoke inside the building.", "You shouldn't smoke inside the building.", "You can't smoke inside the building."], correct: 0, explanation: '"mustn\'t" expresses prohibition.' },
          { id: 14, text: 'Express that something is optional: "Bringing your own laptop is not required — we provide one."', options: ["You don't have to bring your own laptop.", "You mustn't bring your own laptop.", "You can't bring your own laptop.", "You shouldn't bring your own laptop."], correct: 0, explanation: '"don\'t have to" expresses lack of obligation.' },
          { id: 15, text: 'Give advice: "I recommend that you apologize to her."', options: ['You should apologize to her.', 'You must apologize to her.', 'You have to apologize to her.', 'You may apologize to her.'], correct: 0, explanation: '"should" is used for advice/recommendation.' },
          { id: 16, text: 'Express lack of ability: "They don\'t have the money for a new car."', options: ["They can't afford a new car.", "They mustn't afford a new car.", "They shouldn't afford a new car.", "They may not afford a new car."], correct: 0, explanation: '"can\'t" expresses lack of ability/possibility.' },
          { id: 17, text: 'Make an informal request: "I want you to help me carry these boxes."', options: ['Can you help me carry these boxes?', 'Must you help me carry these boxes?', 'Should you help me carry these boxes?', 'Have you to help me carry these boxes?'], correct: 0, explanation: '"Can" is used for informal requests.' },
          { id: 18, text: 'Make a formal, polite request: "I want polite permission to ask you a personal question."', options: ['May I ask you a personal question?', 'Must I ask you a personal question?', 'Should I ask you a personal question?', 'Can I ask you a personal question, formally?'], correct: 0, explanation: '"May" is used for formal, polite permission requests.' },
          { id: 19, text: 'Express a logical conclusion: "I\'m sure they are asleep — the lights are off."', options: ['They must be asleep already.', 'They can be asleep already.', 'They may not be asleep already.', 'They should be asleep already.'], correct: 0, explanation: '"must" expresses a strong logical conclusion.' },
          { id: 20, text: 'Express an external requirement: "The flight schedule requires us to leave early tomorrow."', options: ['We have to leave early tomorrow.', 'We must to leave early tomorrow.', 'We may leave early tomorrow.', 'We should leave early tomorrow.'], correct: 0, explanation: '"have to" expresses an external requirement.' }
        ],
        dialogue: [
          { id: 1, situation: 'Working under deadline pressure.', dialogue: 'A: Can you come out tonight?\nB: Sorry, I ___ finish this report today.', options: ['must', 'may', 'could', 'was'], correct: 0, explanation: '"must" — kuchli shaxsiy majburiyat.' },
          { id: 2, situation: 'Talking about a new job.', dialogue: 'A: Is there a dress code?\nB: Yes, employees ___ wear a uniform.', options: ['have to', 'may', 'could', 'were'], correct: 0, explanation: '"have to" — tashqi qoida.' },
          { id: 3, situation: 'Warning a visitor.', dialogue: 'A: Can I go in there?\nB: No, you ___ enter — it\'s strictly forbidden.', options: ["mustn't", "don't have to", "shouldn't", "can't"], correct: 0, explanation: '"mustn\'t" — taqiq.' },
          { id: 4, situation: 'Inviting a friend to a party.', dialogue: 'A: Do I have to come tonight?\nB: No, you ___ come if you don\'t want to.', options: ["don't have to", "mustn't", "can't", "shouldn't"], correct: 0, explanation: '"don\'t have to" — ixtiyoriy.' },
          { id: 5, situation: 'Talking about health.', dialogue: 'A: I have a bad cough.\nB: You ___ see a doctor about that.', options: ['should', 'must', 'can', 'may'], correct: 0, explanation: '"should" — maslahat.' },
          { id: 6, situation: 'Talking about language skills.', dialogue: 'A: Is she good with languages?\nB: Yes, she ___ speak three of them fluently.', options: ['can', 'must', 'should', 'may'], correct: 0, explanation: '"can" — qobiliyat.' },
          { id: 7, situation: 'In a hot classroom.', dialogue: "A: It's so hot in here!\nB: ___ I open the window?", options: ['Can', 'Must', 'Should', 'Have to'], correct: 0, explanation: '"Can" — norasmiy ruxsat so\'rash.' },
          { id: 8, situation: 'At a formal office.', dialogue: "A: Excuse me, ___ I come in?\nB: Yes, please.", options: ['may', 'must', 'should', 'have to'], correct: 0, explanation: '"may" — rasmiy ruxsat so\'rash.' },
          { id: 9, situation: 'Checking the weather.', dialogue: 'A: Should I bring an umbrella?\nB: Good idea, it ___ rain later.', options: ['may', 'must', 'should', 'have to'], correct: 0, explanation: '"may" — ehtimollik.' },
          { id: 10, situation: 'Welcoming someone home.', dialogue: "A: I just got back from a 12-hour flight.\nB: Wow, you ___ be exhausted!", options: ['must', 'can', 'should', 'may not'], correct: 0, explanation: '"must" — kuchli ishonch/xulosa.' },
          { id: 11, situation: 'Talking about childhood.', dialogue: 'A: Were you a good swimmer as a kid?\nB: Yes, I ___ swim when I was five.', options: ['could', 'can', 'may', 'must'], correct: 0, explanation: '"could" — o\'tmishdagi qobiliyat.' },
          { id: 12, situation: 'Discussing school deadlines.', dialogue: 'A: When is the homework due?\nB: Students ___ hand it in by Friday.', options: ['have to', 'may', 'could', 'were'], correct: 0, explanation: '"have to" — tashqi qoida.' },
          { id: 13, situation: 'Pointing out a building rule.', dialogue: "A: Can I smoke here?\nB: No, you ___ smoke inside the building.", options: ["mustn't", "don't have to", "shouldn't", "may not"], correct: 0, explanation: '"mustn\'t" — taqiq.' },
          { id: 14, situation: 'Preparing for a meeting.', dialogue: 'A: Should I bring my own laptop?\nB: No, you ___ — we provide one.', options: ["don't have to", "mustn't", "can't", "shouldn't"], correct: 0, explanation: '"don\'t have to" — ixtiyoriy.' },
          { id: 15, situation: 'After an argument.', dialogue: 'A: I feel bad about what I said.\nB: You ___ apologize to her.', options: ['should', 'must', 'can', 'have to'], correct: 0, explanation: '"should" — maslahat.' },
          { id: 16, situation: 'Talking about finances.', dialogue: "A: Are they getting a new car?\nB: No, they ___ afford one this year.", options: ["can't", "mustn't", "shouldn't", "mayn't"], correct: 0, explanation: '"can\'t" — imkoniyat yo\'qligi.' },
          { id: 17, situation: 'Moving furniture.', dialogue: "A: These boxes are so heavy!\nB: ___ you help me carry them?", options: ['Can', 'Must', 'Should', 'Have to'], correct: 0, explanation: '"Can" — norasmiy so\'rov.' },
          { id: 18, situation: 'Approaching a sensitive topic.', dialogue: "A: ___ I ask you a personal question?\nB: Sure, go ahead.", options: ['May', 'Must', 'Should', 'Have to'], correct: 0, explanation: '"May" — rasmiy ruxsat so\'rash.' },
          { id: 19, situation: 'Late at night.', dialogue: 'A: All the lights are off next door.\nB: They ___ be asleep already.', options: ['must', 'can', 'should', 'have to'], correct: 0, explanation: '"must" — kuchli ishonch/xulosa.' },
          { id: 20, situation: 'Planning a flight departure.', dialogue: "A: What time should we leave?\nB: We ___ leave early to catch the flight.", options: ['have to', 'may', 'could', 'were'], correct: 0, explanation: '"have to" — tashqi zaruriyat.' }
        ]
      },
      {
        id: 'reported-speech',
        title: 'Reported Speech',
        icon: '🗣️',
        guide: `## Reported Speech (Ko'chirma gapni o'zlashtirma gapga aylantirish)

Reported Speech — birovning aytgan so'zlarini to'g'ridan-to'g'ri tirnoqchada emas, balki o'z gapimiz ichida qayta aytib berish usuli. Bunda zamon, olmosh va vaqt/o'rin so'zlari o'zgaradi.

## 1. Zamon orqaga siljishi (Tense Backshift)
Agar reporting fe'l **o'tgan zamonda** bo'lsa (said, told), asosiy gapdagi zamon bir bosqich orqaga siljiydi:
• Present Simple → Past Simple: "I **work** here." → He said (that) he **worked** there.
• Present Continuous → Past Continuous: "I **am working**." → She said she **was working**.
• Present Perfect → Past Perfect: "I **have finished**." → He said he **had finished**.
• Past Simple → Past Perfect: "I **finished**." → She said she **had finished**.
• will → would: "I **will help**." → He said he **would help**.
• can → could: "I **can swim**." → She said she **could swim**.

*(Past Perfect o'zgarmaydi — u allaqachon "eng orqada")*

## 2. Olmosh va vaqt/o'rin so'zlari o'zgarishi
• I → he/she; my → his/her; we → they; you → I/he/she (kontekstga qarab)
• now → then; today → that day; tomorrow → the next day
• yesterday → the day before; here → there; this → that

## 3. Gapларni ko'chirish (Statements)
Subject + said/told (+ object) + (that) + backshifted clause
  - "I am tired," she said. → She said (that) she **was tired**.
  - "I will call you," he said. → He told me (that) he **would call** me.
  - **say** — obyektsiz ishlatiladi; **tell** — doim obyekt talab qiladi (tell + someone)

## 4. Savollarni ko'chirish (Reported Questions)
• **Ha/Yo'q savollar**: asked + if/whether + Subject + Verb (auxiliary "do" yo'q, so'roq belgisi yo'q)
  - "Are you coming?" → She asked **if** I **was coming**.
  - "Do you like pizza?" → He asked **whether** I **liked** pizza.
• **Maxsus savollar (Wh-questions)**: asked + wh-so'z + Subject + Verb
  - "Where do you live?" → She asked **where** I **lived**.
  - "What are you doing?" → He asked **what** I **was doing**.

*(Reported questions'da so'z tartibi TASDIQ gap tartibiga o'tadi, savol tartibida qolmaydi)*`,
        questions: [
          { id: 1, text: '"I work here," she said. → She said (that) she ___ there.', options: ['worked', 'works', 'is working', 'has worked'], correct: 0, explanation: 'Present Simple → Past Simple in reported speech.' },
          { id: 2, text: '"I am working," he said. → He said he ___ working.', options: ['was', 'is', 'has been', 'were'], correct: 0, explanation: 'Present Continuous → Past Continuous in reported speech.' },
          { id: 3, text: '"I have finished," he said. → He said he ___ finished.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Present Perfect → Past Perfect in reported speech.' },
          { id: 4, text: '"I finished the work," she said. → She said she ___ finished the work.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Simple → Past Perfect in reported speech.' },
          { id: 5, text: '"I will help you," he said. → He said he ___ help me.', options: ['would', 'will', 'can', 'was'], correct: 0, explanation: 'will → would in reported speech.' },
          { id: 6, text: '"I can swim," she said. → She said she ___ swim.', options: ['could', 'can', 'would', 'was'], correct: 0, explanation: 'can → could in reported speech.' },
          { id: 7, text: '"I am tired," she said. → She said (that) she ___ tired.', options: ['was', 'is', 'has been', 'were'], correct: 0, explanation: 'Present Simple (am) → Past Simple (was) in reported speech.' },
          { id: 8, text: '"I will call you tomorrow," he said. → He told me (that) he ___ call me the next day.', options: ['would', 'will', 'can', 'was'], correct: 0, explanation: 'will → would in reported speech.' },
          { id: 9, text: '"Are you coming?" she asked. → She asked if I ___ coming.', options: ['was', 'am', 'have been', 'were'], correct: 0, explanation: 'Reported yes/no question: if + subject + backshifted verb.' },
          { id: 10, text: '"Do you like pizza?" he asked. → He asked whether I ___ pizza.', options: ['liked', 'like', 'likes', 'am liking'], correct: 0, explanation: 'Reported yes/no question: whether + subject + backshifted verb, no "do".' },
          { id: 11, text: '"Where do you live?" she asked. → She asked where I ___.', options: ['lived', 'live', 'do live', 'am living'], correct: 0, explanation: 'Reported wh-question: statement word order, backshifted verb.' },
          { id: 12, text: '"What are you doing?" he asked. → He asked what I ___ doing.', options: ['was', 'am', 'have been', 'were'], correct: 0, explanation: 'Reported wh-question: was + doing (backshifted continuous).' },
          { id: 13, text: '"I live in London," she said. → She said (that) she ___ in London.', options: ['lived', 'lives', 'is living', 'has lived'], correct: 0, explanation: 'Present Simple → Past Simple in reported speech.' },
          { id: 14, text: '"We are studying English," they said. → They said (that) they ___ studying English.', options: ['were', 'are', 'have been', 'was'], correct: 0, explanation: 'Present Continuous → Past Continuous in reported speech.' },
          { id: 15, text: '"I have never been to Paris," he said. → He said he ___ never been to Paris.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Present Perfect → Past Perfect in reported speech.' },
          { id: 16, text: '"I saw that film," she said. → She said she ___ seen that film.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Simple → Past Perfect in reported speech.' },
          { id: 17, text: '"Where is the station?" he asked. → He asked where the station ___.', options: ['was', 'is', 'has been', 'were'], correct: 0, explanation: 'Reported wh-question: statement word order, backshifted verb.' },
          { id: 18, text: '"I can\'t come tonight," she said. → She said she ___ come that night.', options: ["couldn't", "can't", "wouldn't", "wasn't"], correct: 0, explanation: 'can\'t → couldn\'t in reported speech.' },
          { id: 19, text: '"Did you finish your homework?" the teacher asked. → The teacher asked if I ___ finished my homework.', options: ['had', 'has', 'did', 'have'], correct: 0, explanation: 'Past Simple → Past Perfect in reported yes/no question.' },
          { id: 20, text: '"I need help," he said. → He said (that) he ___ help.', options: ['needed', 'needs', 'is needing', 'has needed'], correct: 0, explanation: 'Present Simple → Past Simple in reported speech.' }
        ],
        fillBlanks: [
          { id: 1, text: '"I work here," she said. → She said she ___ (work) there.', options: ['worked', 'works', 'is working', 'has worked'], correct: 0, explanation: 'Present Simple → Past Simple (worked).' },
          { id: 2, text: '"I am working," he said. → He said he ___ (work).', options: ['was working', 'is working', 'has been working', 'were working'], correct: 0, explanation: 'Present Continuous → Past Continuous (was working).' },
          { id: 3, text: '"I have finished," he said. → He said he ___ (finish).', options: ['had finished', 'has finished', 'was finished', 'did finish'], correct: 0, explanation: 'Present Perfect → Past Perfect (had finished).' },
          { id: 4, text: '"I finished the work," she said. → She said she ___ (finish) the work.', options: ['had finished', 'has finished', 'was finishing', 'did finish'], correct: 0, explanation: 'Past Simple → Past Perfect (had finished).' },
          { id: 5, text: '"I will help you," he said. → He said he ___ (help) me.', options: ['would help', 'will help', 'can help', 'was helping'], correct: 0, explanation: 'will → would (would help).' },
          { id: 6, text: '"I can swim," she said. → She said she ___ (swim).', options: ['could swim', 'can swim', 'would swim', 'was swimming'], correct: 0, explanation: 'can → could (could swim).' },
          { id: 7, text: '"I am tired," she said. → She said she ___ (be) tired.', options: ['was', 'is', 'has been', 'were'], correct: 0, explanation: 'Present Simple (am) → Past Simple (was).' },
          { id: 8, text: '"I will call you tomorrow," he said. → He said he ___ (call) me the next day.', options: ['would call', 'will call', 'can call', 'was calling'], correct: 0, explanation: 'will → would (would call).' },
          { id: 9, text: '"Are you coming?" she asked. → She asked if I ___ (come).', options: ['was coming', 'am coming', 'have been coming', 'were coming'], correct: 0, explanation: 'Reported yes/no question: if + backshifted continuous (was coming).' },
          { id: 10, text: '"Do you like pizza?" he asked. → He asked whether I ___ (like) pizza.', options: ['liked', 'like', 'likes', 'am liking'], correct: 0, explanation: 'Reported yes/no question: whether + backshifted verb (liked), no "do".' },
          { id: 11, text: '"Where do you live?" she asked. → She asked where I ___ (live).', options: ['lived', 'live', 'do live', 'am living'], correct: 0, explanation: 'Reported wh-question: statement order, backshifted verb (lived).' },
          { id: 12, text: '"What are you doing?" he asked. → He asked what I ___ (do).', options: ['was doing', 'am doing', 'have been doing', 'were doing'], correct: 0, explanation: 'Reported wh-question: backshifted continuous (was doing).' },
          { id: 13, text: '"I live in London," she said. → She said she ___ (live) in London.', options: ['lived', 'lives', 'is living', 'has lived'], correct: 0, explanation: 'Present Simple → Past Simple (lived).' },
          { id: 14, text: '"We are studying English," they said. → They said they ___ (study) English.', options: ['were studying', 'are studying', 'have been studying', 'was studying'], correct: 0, explanation: 'Present Continuous → Past Continuous (were studying).' },
          { id: 15, text: '"I have never been to Paris," he said. → He said he ___ (never / be) to Paris.', options: ['had never been', 'has never been', 'was never', 'did never be'], correct: 0, explanation: 'Present Perfect → Past Perfect (had never been).' },
          { id: 16, text: '"I saw that film," she said. → She said she ___ (see) that film.', options: ['had seen', 'has seen', 'was seeing', 'did see'], correct: 0, explanation: 'Past Simple → Past Perfect (had seen).' },
          { id: 17, text: '"Where is the station?" he asked. → He asked where the station ___ (be).', options: ['was', 'is', 'has been', 'were'], correct: 0, explanation: 'Reported wh-question: backshifted verb (was).' },
          { id: 18, text: '"I can\'t come tonight," she said. → She said she ___ (not / can / come) that night.', options: ["couldn't come", "can't come", "wouldn't come", "wasn't coming"], correct: 0, explanation: 'can\'t → couldn\'t (couldn\'t come).' },
          { id: 19, text: '"Did you finish your homework?" the teacher asked. → The teacher asked if I ___ (finish) my homework.', options: ['had finished', 'has finished', 'did finish', 'have finished'], correct: 0, explanation: 'Past Simple → Past Perfect in reported yes/no question (had finished).' },
          { id: 20, text: '"I need help," he said. → He said he ___ (need) help.', options: ['needed', 'needs', 'is needing', 'has needed'], correct: 0, explanation: 'Present Simple → Past Simple (needed).' }
        ],
        scrambled: [
          { id: 1, words: ['worked', 'she', 'said', 'she', 'there'], answer: 'she said she worked there', explanation: 'Present Simple → Past Simple in reported speech.' },
          { id: 2, words: ['working', 'he', 'said', 'he', 'was'], answer: 'he said he was working', explanation: 'Present Continuous → Past Continuous in reported speech.' },
          { id: 3, words: ['finished', 'he', 'said', 'he', 'had'], answer: 'he said he had finished', explanation: 'Present Perfect → Past Perfect in reported speech.' },
          { id: 4, words: ['finished', 'she', 'said', 'she', 'had', 'the', 'work'], answer: 'she said she had finished the work', explanation: 'Past Simple → Past Perfect in reported speech.' },
          { id: 5, words: ['help', 'he', 'said', 'he', 'would', 'me'], answer: 'he said he would help me', explanation: 'will → would in reported speech.' },
          { id: 6, words: ['swim', 'she', 'said', 'she', 'could'], answer: 'she said she could swim', explanation: 'can → could in reported speech.' },
          { id: 7, words: ['tired', 'she', 'said', 'she', 'was'], answer: 'she said she was tired', explanation: 'Present Simple → Past Simple in reported speech.' },
          { id: 8, words: ['call', 'he', 'said', 'he', 'would', 'me', 'the', 'next', 'day'], answer: 'he said he would call me the next day', explanation: 'will → would, tomorrow → the next day.' },
          { id: 9, words: ['coming', 'she', 'asked', 'if', 'I', 'was'], answer: 'she asked if I was coming', explanation: 'Reported yes/no question with "if".' },
          { id: 10, words: ['liked', 'he', 'asked', 'whether', 'I', 'pizza'], answer: 'he asked whether I liked pizza', explanation: 'Reported yes/no question with "whether".' },
          { id: 11, words: ['lived', 'she', 'asked', 'where', 'I'], answer: 'she asked where I lived', explanation: 'Reported wh-question: statement word order.' },
          { id: 12, words: ['doing', 'he', 'asked', 'what', 'I', 'was'], answer: 'he asked what I was doing', explanation: 'Reported wh-question: backshifted continuous.' },
          { id: 13, words: ['lived', 'she', 'said', 'she', 'in', 'London'], answer: 'she said she lived in London', explanation: 'Present Simple → Past Simple in reported speech.' },
          { id: 14, words: ['studying', 'they', 'said', 'they', 'were', 'English'], answer: 'they said they were studying English', explanation: 'Present Continuous → Past Continuous in reported speech.' },
          { id: 15, words: ['been', 'he', 'said', 'he', 'had', 'never', 'to', 'Paris'], answer: 'he said he had never been to Paris', explanation: 'Present Perfect → Past Perfect in reported speech.' },
          { id: 16, words: ['seen', 'she', 'said', 'she', 'had', 'that', 'film'], answer: 'she said she had seen that film', explanation: 'Past Simple → Past Perfect in reported speech.' },
          { id: 17, words: ['was', 'he', 'asked', 'where', 'the', 'station'], answer: 'he asked where the station was', explanation: 'Reported wh-question: statement word order.' },
          { id: 18, words: ['come', "couldn't", 'she', 'said', 'she', 'that', 'night'], answer: "she said she couldn't come that night", explanation: 'can\'t → couldn\'t, tonight → that night.' },
          { id: 19, words: ['finished', 'the', 'teacher', 'asked', 'if', 'I', 'had', 'my', 'homework'], answer: 'the teacher asked if I had finished my homework', explanation: 'Reported yes/no question with "if", Past Simple → Past Perfect.' },
          { id: 20, words: ['needed', 'he', 'said', 'he', 'help'], answer: 'he said he needed help', explanation: 'Present Simple → Past Simple in reported speech.' }
        ],
        errorCorrection: [
          { id: 1, text: '"I work here," she said. → She said she works there.', options: ['She said', 'she', 'works', 'there'], correct: 2, wrongPart: 'works', correction: 'worked', explanation: 'Present Simple must backshift to Past Simple: "worked".' },
          { id: 2, text: '"I am working," he said. → He said he is working.', options: ['He said', 'he', 'is working', 'No error'], correct: 2, wrongPart: 'is working', correction: 'was working', explanation: 'Present Continuous must backshift to Past Continuous: "was working".' },
          { id: 3, text: '"I have finished," he said. → He said he has finished.', options: ['He said', 'he', 'has finished', 'No error'], correct: 2, wrongPart: 'has finished', correction: 'had finished', explanation: 'Present Perfect must backshift to Past Perfect: "had finished".' },
          { id: 4, text: '"I finished the work," she said. → She said she finished the work.', options: ['She said', 'she', 'finished', 'the work'], correct: 2, wrongPart: 'finished', correction: 'had finished', explanation: 'Past Simple must backshift to Past Perfect: "had finished".' },
          { id: 5, text: '"I will help you," he said. → He said he will help me.', options: ['He said', 'he', 'will help', 'me'], correct: 2, wrongPart: 'will help', correction: 'would help', explanation: '"will" must backshift to "would": "would help".' },
          { id: 6, text: '"I can swim," she said. → She said she can swim.', options: ['She said', 'she', 'can swim', 'No error'], correct: 2, wrongPart: 'can swim', correction: 'could swim', explanation: '"can" must backshift to "could": "could swim".' },
          { id: 7, text: '"I am tired," she said. → She said she is tired.', options: ['She said', 'she', 'is tired', 'No error'], correct: 2, wrongPart: 'is tired', correction: 'was tired', explanation: 'Present Simple (am) must backshift to Past Simple (was).' },
          { id: 8, text: '"I will call you tomorrow," he said. → He said he would call me tomorrow.', options: ['He said', 'he would call me', 'tomorrow', 'No error'], correct: 2, wrongPart: 'tomorrow', correction: 'the next day', explanation: 'Time expressions shift too: "tomorrow" becomes "the next day".' },
          { id: 9, text: '"Are you coming?" she asked. → She asked was I coming.', options: ['She asked', 'was I coming', 'No error', ''], correct: 1, wrongPart: 'was I coming', correction: 'if I was coming', explanation: 'Reported yes/no questions need "if"/"whether": "if I was coming".' },
          { id: 10, text: '"Do you like pizza?" he asked. → He asked whether I did like pizza.', options: ['He asked', 'whether', 'I did like', 'pizza'], correct: 2, wrongPart: 'I did like', correction: 'I liked', explanation: 'Reported questions drop the auxiliary "do": "I liked".' },
          { id: 11, text: '"Where do you live?" she asked. → She asked where did I live.', options: ['She asked', 'where', 'did I live', 'No error'], correct: 2, wrongPart: 'did I live', correction: 'I lived', explanation: 'Reported wh-questions use statement word order without "did": "I lived".' },
          { id: 12, text: '"What are you doing?" he asked. → He asked what I am doing.', options: ['He asked', 'what', 'I am doing', 'No error'], correct: 2, wrongPart: 'I am doing', correction: 'I was doing', explanation: 'Present Continuous must backshift to Past Continuous: "I was doing".' },
          { id: 13, text: '"I live in London," she said. → She said she lives in London.', options: ['She said', 'she', 'lives', 'in London'], correct: 2, wrongPart: 'lives', correction: 'lived', explanation: 'Present Simple must backshift to Past Simple: "lived".' },
          { id: 14, text: '"We are studying English," they said. → They said they are studying English.', options: ['They said', 'they', 'are studying', 'English'], correct: 2, wrongPart: 'are studying', correction: 'were studying', explanation: 'Present Continuous must backshift to Past Continuous: "were studying".' },
          { id: 15, text: '"I have never been to Paris," he said. → He said he never been to Paris.', options: ['He said', 'he', 'never been', 'to Paris'], correct: 2, wrongPart: 'never been', correction: 'had never been', explanation: 'Present Perfect must backshift to Past Perfect: "had never been".' },
          { id: 16, text: '"I saw that film," she said. → She said she saw that film.', options: ['She said', 'she', 'saw', 'that film'], correct: 2, wrongPart: 'saw', correction: 'had seen', explanation: 'Past Simple must backshift to Past Perfect: "had seen".' },
          { id: 17, text: '"Where is the station?" he asked. → He asked where is the station.', options: ['He asked', 'where', 'is the station', 'No error'], correct: 2, wrongPart: 'is the station', correction: 'the station was', explanation: 'Reported wh-questions use statement word order and backshift: "the station was".' },
          { id: 18, text: '"I can\'t come tonight," she said. → She said she can\'t come that night.', options: ['She said', "she can't come", 'that night', 'No error'], correct: 1, wrongPart: "she can't come", correction: "she couldn't come", explanation: '"can\'t" must backshift to "couldn\'t": "couldn\'t come".' },
          { id: 19, text: '"Did you finish your homework?" the teacher asked. → The teacher asked if I finished my homework.', options: ['The teacher asked', 'if', 'I finished', 'my homework'], correct: 2, wrongPart: 'I finished', correction: 'I had finished', explanation: 'Past Simple in a reported question backshifts to Past Perfect: "I had finished".' },
          { id: 20, text: '"I need help," he said. → He said he need help.', options: ['He said', 'he', 'need', 'help'], correct: 2, wrongPart: 'need', correction: 'needed', explanation: 'Present Simple must backshift to Past Simple: "needed".' }
        ],
        transform: [
          { id: 1, text: 'Report this statement: "I work here," she said.', options: ['She said she worked there.', 'She said she works there.', 'She said she is working there.', 'She said she has worked there.'], correct: 0, explanation: 'Present Simple → Past Simple, here → there.' },
          { id: 2, text: 'Report this statement: "I am working," he said.', options: ['He said he was working.', 'He said he is working.', 'He said he has been working.', 'He said he worked.'], correct: 0, explanation: 'Present Continuous → Past Continuous.' },
          { id: 3, text: 'Report this statement: "I have finished," he said.', options: ['He said he had finished.', 'He said he has finished.', 'He said he finished.', 'He said he was finished.'], correct: 0, explanation: 'Present Perfect → Past Perfect.' },
          { id: 4, text: 'Report this statement: "I finished the work," she said.', options: ['She said she had finished the work.', 'She said she finished the work.', 'She said she has finished the work.', 'She said she was finishing the work.'], correct: 0, explanation: 'Past Simple → Past Perfect.' },
          { id: 5, text: 'Report this statement: "I will help you," he said (to me).', options: ['He told me he would help me.', 'He told me he will help me.', 'He told me he can help me.', 'He told me he helps me.'], correct: 0, explanation: 'will → would; "tell" needs an object.' },
          { id: 6, text: 'Report this statement: "I can swim," she said.', options: ['She said she could swim.', 'She said she can swim.', 'She said she would swim.', 'She said she swam.'], correct: 0, explanation: 'can → could.' },
          { id: 7, text: 'Report this statement: "I am tired," she said.', options: ['She said she was tired.', 'She said she is tired.', 'She said she has been tired.', 'She said she tired.'], correct: 0, explanation: 'Present Simple (am) → Past Simple (was).' },
          { id: 8, text: 'Report this statement: "I will call you tomorrow," he said.', options: ['He said he would call me the next day.', 'He said he will call me tomorrow.', 'He said he would call me tomorrow.', 'He said he calls me the next day.'], correct: 0, explanation: 'will → would, tomorrow → the next day.' },
          { id: 9, text: 'Report this question: "Are you coming?" she asked.', options: ['She asked if I was coming.', 'She asked was I coming.', 'She asked if I am coming.', 'She asked am I coming.'], correct: 0, explanation: 'Reported yes/no question: if + statement order + backshift.' },
          { id: 10, text: 'Report this question: "Do you like pizza?" he asked.', options: ['He asked whether I liked pizza.', 'He asked whether I did like pizza.', 'He asked do I like pizza.', 'He asked if I like pizza.'], correct: 0, explanation: 'Reported yes/no question: whether + statement order, no "do".' },
          { id: 11, text: 'Report this question: "Where do you live?" she asked.', options: ['She asked where I lived.', 'She asked where did I live.', 'She asked where I live.', 'She asked where do I live.'], correct: 0, explanation: 'Reported wh-question: statement order, backshift.' },
          { id: 12, text: 'Report this question: "What are you doing?" he asked.', options: ['He asked what I was doing.', 'He asked what am I doing.', 'He asked what I am doing.', 'He asked what was I doing.'], correct: 0, explanation: 'Reported wh-question: statement order, backshift.' },
          { id: 13, text: 'Report this statement: "I live in London," she said.', options: ['She said she lived in London.', 'She said she lives in London.', 'She said she is living in London.', 'She said she has lived in London.'], correct: 0, explanation: 'Present Simple → Past Simple.' },
          { id: 14, text: 'Report this statement: "We are studying English," they said.', options: ['They said they were studying English.', 'They said they are studying English.', 'They said they have studied English.', 'They said they studied English.'], correct: 0, explanation: 'Present Continuous → Past Continuous.' },
          { id: 15, text: 'Report this statement: "I have never been to Paris," he said.', options: ['He said he had never been to Paris.', 'He said he has never been to Paris.', 'He said he never went to Paris.', 'He said he was never in Paris.'], correct: 0, explanation: 'Present Perfect → Past Perfect.' },
          { id: 16, text: 'Report this statement: "I saw that film," she said.', options: ['She said she had seen that film.', 'She said she saw that film.', 'She said she has seen that film.', 'She said she was seeing that film.'], correct: 0, explanation: 'Past Simple → Past Perfect.' },
          { id: 17, text: 'Report this question: "Where is the station?" he asked.', options: ['He asked where the station was.', 'He asked where is the station.', 'He asked where the station is.', 'He asked where was the station.'], correct: 0, explanation: 'Reported wh-question: statement order, backshift.' },
          { id: 18, text: 'Report this statement: "I can\'t come tonight," she said.', options: ["She said she couldn't come that night.", "She said she can't come tonight.", "She said she couldn't come tonight.", "She said she wouldn't come that night."], correct: 0, explanation: 'can\'t → couldn\'t, tonight → that night.' },
          { id: 19, text: 'Report this question: "Did you finish your homework?" the teacher asked.', options: ['The teacher asked if I had finished my homework.', 'The teacher asked did I finish my homework.', 'The teacher asked if I finished my homework.', 'The teacher asked if I have finished my homework.'], correct: 0, explanation: 'Reported yes/no question: Past Simple → Past Perfect.' },
          { id: 20, text: 'Report this statement: "I need help," he said.', options: ['He said he needed help.', 'He said he needs help.', 'He said he was needing help.', 'He said he has needed help.'], correct: 0, explanation: 'Present Simple → Past Simple.' }
        ],
        dialogue: [
          { id: 1, situation: 'Reporting a colleague\'s statement.', dialogue: 'A: What did Anna say about her job?\nB: She said she ___ here.', options: ['worked', 'works', 'is working', 'has worked'], correct: 0, explanation: 'Present Simple → Past Simple in reported speech.' },
          { id: 2, situation: 'Reporting what someone was doing.', dialogue: 'A: What did Tom say when you called?\nB: He said he ___ working.', options: ['was', 'is', 'has been', 'were'], correct: 0, explanation: 'Present Continuous → Past Continuous in reported speech.' },
          { id: 3, situation: 'Passing on news.', dialogue: 'A: Has he finished the project?\nB: He said he ___ finished it.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Present Perfect → Past Perfect in reported speech.' },
          { id: 4, situation: 'Reporting a colleague\'s update.', dialogue: 'A: Did she complete the work?\nB: Yes, she said she ___ finished the work.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Simple → Past Perfect in reported speech.' },
          { id: 5, situation: 'Reporting a promise.', dialogue: 'A: Is he going to help you?\nB: Yes, he said he ___ help me.', options: ['would', 'will', 'can', 'was'], correct: 0, explanation: 'will → would in reported speech.' },
          { id: 6, situation: 'Reporting an ability.', dialogue: 'A: Can she swim well?\nB: She said she ___ swim, yes.', options: ['could', 'can', 'would', 'was'], correct: 0, explanation: 'can → could in reported speech.' },
          { id: 7, situation: 'Reporting how someone felt.', dialogue: 'A: How was she feeling?\nB: She said she ___ tired.', options: ['was', 'is', 'has been', 'were'], correct: 0, explanation: 'Present Simple → Past Simple in reported speech.' },
          { id: 8, situation: 'Reporting a promise made yesterday.', dialogue: 'A: Did he say when he\'d call?\nB: He said he ___ call me the next day.', options: ['would', 'will', 'can', 'was'], correct: 0, explanation: 'will → would in reported speech.' },
          { id: 9, situation: 'Reporting what was asked at a party.', dialogue: 'A: What did she ask you?\nB: She asked if I ___ coming.', options: ['was', 'am', 'have been', 'were'], correct: 0, explanation: 'Reported yes/no question: if + backshifted verb.' },
          { id: 10, situation: 'Reporting a question about food.', dialogue: 'A: What did he ask at dinner?\nB: He asked whether I ___ pizza.', options: ['liked', 'like', 'likes', 'am liking'], correct: 0, explanation: 'Reported yes/no question: whether + backshifted verb, no "do".' },
          { id: 11, situation: 'Reporting a new acquaintance\'s question.', dialogue: 'A: What did she want to know?\nB: She asked where I ___.', options: ['lived', 'live', 'do live', 'am living'], correct: 0, explanation: 'Reported wh-question: statement order, backshift.' },
          { id: 12, situation: 'Reporting a curious question.', dialogue: 'A: Was he curious about your evening?\nB: Yes, he asked what I ___ doing.', options: ['was', 'am', 'have been', 'were'], correct: 0, explanation: 'Reported wh-question: backshifted continuous.' },
          { id: 13, situation: 'Reporting where someone lives.', dialogue: 'A: Where does she live?\nB: She told me she ___ in London.', options: ['lived', 'lives', 'is living', 'has lived'], correct: 0, explanation: 'Present Simple → Past Simple in reported speech.' },
          { id: 14, situation: 'Reporting what classmates said.', dialogue: 'A: What are they studying?\nB: They said they ___ studying English.', options: ['were', 'are', 'have been', 'was'], correct: 0, explanation: 'Present Continuous → Past Continuous in reported speech.' },
          { id: 15, situation: 'Reporting travel history.', dialogue: 'A: Has he ever traveled to Europe?\nB: He said he ___ never been to Paris.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Present Perfect → Past Perfect in reported speech.' },
          { id: 16, situation: 'Reporting a movie recommendation.', dialogue: 'A: Did she recommend anything?\nB: She said she ___ seen that film already.', options: ['had', 'has', 'was', 'did'], correct: 0, explanation: 'Past Simple → Past Perfect in reported speech.' },
          { id: 17, situation: 'Reporting directions asked.', dialogue: 'A: What did the tourist ask?\nB: He asked where the station ___.', options: ['was', 'is', 'has been', 'were'], correct: 0, explanation: 'Reported wh-question: backshifted verb.' },
          { id: 18, situation: 'Reporting a cancellation.', dialogue: 'A: Is she coming tonight?\nB: No, she said she ___ come that night.', options: ["couldn't", "can't", "wouldn't", "wasn't"], correct: 0, explanation: 'can\'t → couldn\'t in reported speech.' },
          { id: 19, situation: 'Reporting a teacher\'s question.', dialogue: 'A: What did the teacher ask you?\nB: She asked if I ___ finished my homework.', options: ['had', 'has', 'did', 'have'], correct: 0, explanation: 'Reported yes/no question: Past Simple → Past Perfect.' },
          { id: 20, situation: 'Reporting a request for help.', dialogue: 'A: What did he say when he called?\nB: He said he ___ help.', options: ['needed', 'needs', 'is needing', 'has needed'], correct: 0, explanation: 'Present Simple → Past Simple in reported speech.' }
        ]
      }
    ]
  }
};

// ─── GERMAN GRAMMAR TESTS DATA ─────────────────────────────────────────
export const germanGrammarData = {
  beginner: {
    label: `Beginner (Anfänger)`,
    topics: [
      {
        id: `de-sentence-structure`,
        title: `Normaler Satzbau (Gap tuzilishi)`,
        icon: `📝`,
        guide: `## Nemis tilida gap tuzilishi (Satzbau)
        
Nemis tilida eng muhim qoida: **Tuslangan fe'l har doim ikkinchi o'rinda (Position 2) turadi!**

### 1. Oddiy to'g'ri gap tartibi (Hauptsatz)
Gap har doim Ega (Subject) bilan boshlanishi shart emas. Agar gap boshqa bo'lak bilan boshlansa ham, fe'l ikkinchi o'rinda qoladi va Ega fe'ldan keyin keladi (Inversion).

• **Ich** *lerne* heute Deutsch. (Men bugun nemis tili o'rganyapman.) -> Ega birinchi o'rinda
• **Heute** *lerne* **ich** Deutsch. (Bugun men nemis tili o'rganyapman.) -> Fe'l baribir 2-o'rinda!

### 2. So'roq gaplar (Fragesatz)
Nemis tilida so'roq gaplar ikki xil bo'ladi:

**A. W-Fragen (Maxsus so'roq gaplar)**
So'roq olmoshi (Wer, Was, Wie, Wo) birinchi o'rinda keladi, fe'l esa ikkinchi o'rinda qoladi:
• **Wo** *wohnst* du? (Siz qayerda yashaysiz?)
• **Was** *machst* du? (Siz nima qilyapsiz?)

**B. Ja/Nein-Fragen (Umumiy so'roq gaplar)**
Bunday gaplarda **fe'l birinchi o'ringa** o'tadi, ega esa ikkinchi o'rinda keladi:
• *Lernst* du Deutsch? (Nemis tili o'rganyapsanmi?)
• *Spielst* du Fußball? (Futbol o'ynaysanmi?)

### 3. Inkor gaplar (Negation - nicht / kein)
• **Kein** ismi turkumi (otlar) bilan ishlatiladi: Ich habe *keinen* Hund. (Mening itim yo'q.)
• **Nicht** fe'llar, sifatlar va butun gapni inkor qilish uchun ishlatiladi: Ich spiele *nicht*. (Men o'ynamayapman.)`,
        questions: [
          { id: 1, text: `Qaysi gapda so'z tartibi to'g'ri yozilgan?`, options: [`Ich Deutsch lerne.`, `Ich lerne Deutsch.`, `Lerne ich Deutsch.`, `Deutsch ich lerne.`], correct: 1, explanation: `Nemis tilida tasdiq gapda fe'l har doim 2-o'rinda keladi: Ich (1) lerne (2) Deutsch (3).` },
          { id: 2, text: `Qaysi gapda "Heute" (bugun) so'zi to'g'ri ishlatilgan?`, options: [`Heute ich gehe nach Hause.`, `Heute gehe ich nach Hause.`, `Heute gehe nach Hause ich.`, `Ich gehe heute nach Hause.`], correct: 1, explanation: `"Heute" boshida kelsa ham, fe'l (gehe) 2-o'rinda qoladi, ega (ich) esa 3-o'ringa o'tadi (Inversion).` },
          { id: 3, text: `Umumiy (Ha/Yo'q) so'roq gapini toping:`, options: [`Wo wohnst du?`, `Wohnst du hier?`, `Du wohnst hier?`, `Wer wohnt hier?`], correct: 1, explanation: `Ja/Nein (Ha/Yo'q) so'roq gaplarida fe'l (wohnst) har doim gap boshida (1-o'rinda) keladi.` },
          { id: 4, text: `W-Frage (so'roq so'zli gap) qoidasini toping:`, options: [`Was machst du?`, `Machst was du?`, `Was du machst?`, `Machst du was?`], correct: 0, explanation: `W-Fragen so'roq gapida so'roq so'zi (Was) 1-o'rinda, fe'l (machst) 2-o'rinda keladi.` },
          { id: 5, text: `"Ich spiele nicht gern Fußball" gapining ma'nosi nima?`, options: [`Men futbol o'ynashni yaxshi ko'raman.`, `Men futbol o'ynashni yomon ko'raman / xoxlamayman.`, `Men faqat futbol o'ynayman.`, `Men futbol o'ynamoqchiman.`], correct: 1, explanation: `"nicht gern" - yoqtirmaslikni, xoxlamaslikni bildiradi.` },
          { id: 6, text: `To'g'ri inkor gapni tanlang (Men ishlamayapman):`, options: [`Ich nicht arbeite.`, `Ich arbeite nicht.`, `Nicht arbeite ich.`, `Ich arbeite kein.`], correct: 1, explanation: `Fe'lni inkor qilish uchun "nicht" fe'ldan keyin (yoki gap oxirida) ishlatiladi.` },
          { id: 7, text: `___ trinken Sie Kaffee?`, options: [`Trinken`, `Kaffee`, `Trinkst`, `Trinkt`], correct: 0, explanation: `So'roq gapda fe'l boshida keladi. "Sie" (Siz) uchun fe'l shakli "Trinken" bo'ladi.` },
          { id: 8, text: `"Wir lernen heute Deutsch." gapini "Heute" bilan boshlang:`, options: [`Heute wir lernen Deutsch.`, `Heute lernen wir Deutsch.`, `Heute lernen Deutsch wir.`, `Heute Deutsch lernen wir.`], correct: 1, explanation: `Inversion qoidasiga ko'ra: Heute (1) lernen (2) wir (3) Deutsch (4).` },
          { id: 9, text: `Qaysi so'roq olmoshi "qayerda" ma'nosini beradi?`, options: [`Wer`, `Was`, `Wo`, `Wie`], correct: 2, explanation: `Nemis tilida "Wo" - qayerda, "Wer" - kim, "Was" - nima, "Wie" - qanday deganidir.` },
          { id: 10, text: `To'g'ri gapni tanlang:`, options: [`Mein Bruder spielt Tennis.`, `Mein Bruder Tennis spielt.`, `Spielt mein Bruder Tennis.`, `Mein Bruder spielt Tennis nicht.`], correct: 0, explanation: `Subject (Mein Bruder) + Verb (spielt) + Object (Tennis).` }
        ],
        fillBlanks: [
          { id: 1, text: `Ich ___ aus Usbekistan.`, options: [`bist`, `ist`, `bin`, `sind`], correct: 2, explanation: `"Ich" (men) olmoshi uchun "sein" (bo'lmoq) fe'lining hozirgi zamon shakli "bin" bo'ladi.` },
          { id: 2, text: `Wo ___ du?`, options: [`wohne`, `wohnst`, `wohnen`, `wohnt`], correct: 1, explanation: `"du" (sen) uchun fe'l oxiriga "-st" qo'shimchasi qo'shiladi: wohnst.` },
          { id: 3, text: `Heute ___ wir nach Berlin.`, options: [`fahren`, `fährst`, `fahrt`, `fahre`], correct: 0, explanation: `"wir" (biz) uchun fe'l o'zgarmaydi (infinitiv): fahren. "Heute" esa fe'ldan oldin keladi.` },
          { id: 4, text: `___ Sie Deutsch?`, options: [`Sprechen`, `Sprichst`, `Sprichst du`, `Sprecht`], correct: 0, explanation: `"Sie" (Siz - hurmat ma'nosida) uchun fe'l infinitiv shaklda keladi: Sprechen.` },
          { id: 5, text: `Was ___ er?`, options: [`macht`, `machen`, `machst`, `mache`], correct: 0, explanation: `"er" (u - o'g'il bola) uchun fe'l oxiriga "-t" qo'shiladi: macht.` },
          { id: 6, text: `Das ___ ein Buch.`, options: [`ist`, `sind`, `bin`, `bist`], correct: 0, explanation: `Das (u - birlikda) uchun "ist" (bo'lmoq) shakli ishlatiladi.` },
          { id: 7, text: `Ich spiele ___ Tennis.`, options: [`nicht`, `kein`, `keine`, `keinen`], correct: 0, explanation: `Sport yoki o'yinlarni inkor qilishda "nicht" ishlatiladi: Ich spiele nicht Tennis.` },
          { id: 8, text: `Wir ___ eine Katze.`, options: [`habe`, `hast`, `haben`, `hat`], correct: 2, explanation: `"wir" (biz) uchun "haben" (bor bo'lmoq) fe'li "haben" bo'ladi.` },
          { id: 9, text: `Kommst ___ aus Taschkent?`, options: [`er`, `sie`, `du`, `ihr`], correct: 2, explanation: `Fe'ldagi "-st" qo'shimchasi "du" (sen) olmoshiga mos keladi: Kommst du...?` },
          { id: 10, text: `Sie (plural) ___ Fußball.`, options: [`spielt`, `spielen`, `spielst`, `spiele`], correct: 1, explanation: `"sie" (ular - ko'plikda) uchun fe'l shakli "spielen" (o'ynamoq) bo'ladi.` }
        ],
        scrambled: [
          { id: 1, words: [`deutsch`, `ich`, `lerne`, `gerne`], answer: `Ich lerne gerne Deutsch.`, explanation: `Ega (Ich) + Fe'l (lerne) + ravish (gerne) + to'ldiruvchi (Deutsch).` },
          { id: 2, words: [`wohnen`, `wir`, `in`, `taschkent`], answer: `Wir wohnen in Taschkent.`, explanation: `Ega (Wir) + Fe'l (wohnen) + o'rin holi (in Taschkent).` },
          { id: 3, words: [`spielst`, `tennis`, `du`, `heute`], answer: `Spielst du heute Tennis?`, explanation: `So'roq gapda fe'l (Spielst) birinchi o'ringa o'tadi.` },
          { id: 4, words: [`heute`, `wir`, `gehen`, `kino`, `ins`], answer: `Heute gehen wir ins Kino.`, explanation: `Inversion: Heute + gehen + wir + ins Kino.` },
          { id: 5, words: [`hast`, `einen`, `hund`, `du`], answer: `Hast du einen Hund?`, explanation: `So'roq gap: Hast (fe'l) + du (ega) + einen Hund (to'ldiruvchi).` }
        ]
      },
      {
        id: `de-articles`,
        title: `Artikel und Pronomen (Artikllar va olmoshlar)`,
        icon: `🎒`,
        guide: `## Nemis tilida artikllar (Artikel)
        
Nemis tilida barcha otlarning o'z jinsi (rod) bo'ladi va otdan oldin keladigan artikllar Nominativ (bosh kelishik) kelishigida quyidagicha belgilanadi:

### 1. Aniq artikllar (Bestimmter Artikel)
Bular ma'lum, aniq narsalar uchun ishlatiladi:
• **der** - Erkak jinsi -> **der** Vater (ota), **der** Tisch (stol)
• **die** - Ayol jinsi -> **die** Mutter (ona), **die** Tasche (sumka)
• **das** - O'rta jins -> **das** Kind (bola), **das** Buch (kitob)
• **die** - Ko'plik (Plural) -> **die** Kinder (bolalar), **die** Bücher (kitoblar)

### 2. Noaniq artikllar (Unbestimmter Artikel)
Noma'lum, birinchi marta tilga olinayotgan narsalar uchun ishlatiladi ("bitta" ma'nosida):
• **ein** (muzskoy) -> ein Mann (bitta erkak)
• **eine** (jenskiy) -> eine Frau (bitta ayol)
• **ein** (sredniy) -> ein Buch (bitta kitob)
*Ko'plikda noaniq artikl ishlatilmaydi!*

### 3. Kishilik olmoshlari (Personalpronomen)
• **ich** (men)
• **du** (sen)
• **er** (u - o'g'il bola)
• **sie** (u - qiz bola)
• **es** (u - neytral)
• **wir** (biz)
• **ihr** (sizlar)
• **sie** (ular)
• **Sie** (Siz - hurmat ma'nosida)`,
        questions: [
          { id: 1, text: `"Buch" (kitob) so'zining artiklini toping:`, options: [`der`, `die`, `das`, `den`], correct: 2, explanation: `Buch o'rta jinsga (neuter) tegishli bo'lib, uning artikli "das" bo'ladi: das Buch.` },
          { id: 2, text: `"Frau" (ayol) so'zining aniq artiklini tanlang:`, options: [`der`, `die`, `das`, `ein`], correct: 1, explanation: `Frau ayol jinsiga (feminine) mansub, shuning uchun "die" artikli ishlatiladi: die Frau.` },
          { id: 3, text: `"Vater" (ota) so'zining noaniq artikli qaysi?`, options: [`ein`, `eine`, `einen`, `kein`], correct: 0, explanation: `Vater erkak jinsida (der Vater), uning noaniq artikli "ein" bo'ladi: ein Vater.` },
          { id: 4, text: `Ko'plikdagi otlarning aniq artikli har doim qaysi bo'ladi?`, options: [`der`, `die`, `das`, `den`], correct: 1, explanation: `Nemis tilida jinsidan qat'i nazar ko'plikdagi barcha otlarning aniq artikli "die" bo'ladi.` },
          { id: 5, text: `"Kind" (bola) so'zining artiklini aniqlang:`, options: [`der`, `die`, `das`, `ein`], correct: 2, explanation: `Kind o'rta jinsga tegishli bo'lgani uchun uning artikli "das" bo'ladi: das Kind.` },
          { id: 6, text: `"sie" (kichik harfda) olmoshi qanday tarjima qilinadi?`, options: [`men`, `biz`, `u (ayol jinsi) yoki ular`, `Siz (hurmat)`], correct: 2, explanation: `"sie" - u (ayol jinsida) yoki ular (ko'plikda) deganidir. Bosh harfdagi "Sie" esa "Siz" demakdir.` },
          { id: 7, text: `"Ihr" olmoshining ma'nosi nima?`, options: [`Biz`, `Sizlar (senlar)`, `Ular`, `Siz (hurmat)`], correct: 1, explanation: `"ihr" - sizlar (do'stona ko'plik ma'nosida) degani.` },
          { id: 8, text: `Erkak kishiga nisbatan qaysi kishilik olmoshi ishlatiladi?`, options: [`er`, `sie`, `es`, `ihr`], correct: 0, explanation: `"er" (u) erkak jinsiga nisbatan ishlatiladi.` },
          { id: 9, text: `Sumka (Tasche) so'zining noaniq artiklini tanlang:`, options: [`ein`, `eine`, `einen`, `das`], correct: 1, explanation: `Tasche ayol jinsiga tegishli (die Tasche), uning noaniq artikli "eine" bo'ladi.` },
          { id: 10, text: `Qaysi qatordagi otlarning hammasi "der" artikliga ega?`, options: [`Mutter, Schwester`, `Mann, Tisch, Apfel`, `Buch, Auto, Kind`, `Schule, Tasche`], correct: 1, explanation: `Mann (erkak), Tisch (stol), Apfel (olma) - hammasi muzskoy (der) artikliga ega.` }
        ],
        fillBlanks: [
          { id: 1, text: `Das ist ___ Tisch (masculine).`, options: [`ein`, `eine`, `das`, `die`], correct: 0, explanation: `Tisch erkak jinsiga mansub, shuning uchun noaniq artikli "ein" bo'ladi.` },
          { id: 2, text: `Das ist ___ Lampe (feminine).`, options: [`ein`, `eine`, `der`, `das`], correct: 1, explanation: `Lampe ayol jinsiga mansub bo'lib, uning noaniq artikli "eine" bo'ladi.` },
          { id: 3, text: `Hier ist ___ Auto (neuter).`, options: [`der`, `die`, `ein`, `eine`], correct: 2, explanation: `Auto o'rta jinsda (das Auto), shuning uchun noaniq artikli "ein" bo'ladi.` },
          { id: 4, text: `Wo sind ___ Kinder (plural)?`, options: [`der`, `die`, `das`, `ein`], correct: 1, explanation: `Ko'plik otlar uchun faqat "die" aniq artikli ishlatiladi.` },
          { id: 5, text: `___ Apfel ist rot.`, options: [`Der`, `Die`, `Das`, `Ein`], correct: 0, explanation: `Apfel (olma) - muzskoy. Bosh kelishikdagi aniq artikli "Der" bo'ladi.` },
          { id: 6, text: `___ Mutter kocht Suppe.`, options: [`Der`, `Die`, `Das`, `Eine`], correct: 1, explanation: `Mutter (ona) - jenskiy. Aniq artikli "Die" bo'ladi.` },
          { id: 7, text: `___ Auto ist sehr schnell.`, options: [`Der`, `Die`, `Das`, `Ein`], correct: 2, explanation: `Auto (mashina) - sredniy jinsda. Aniq artikli "Das" bo'ladi.` },
          { id: 8, text: `Hallo, wer bist ___?`, options: [`ich`, `du`, `er`, `wir`], correct: 1, explanation: `"bist" fe'li faqat "du" (sen) kishilik olmoshiga mos keladi: wer bist du?` },
          { id: 9, text: `___ lernen Deutsch in der Schule.`, options: [`Ich`, `Wir`, `Er`, `Ihr`], correct: 1, explanation: `"lernen" (infinitiv) fe'l shakliga "Wir" (biz) mos keladi: Wir lernen.` },
          { id: 10, text: `Wie alt bist ___ (you)?`, options: [`er`, `du`, `sie`, `es`], correct: 1, explanation: `"bist" fe'l formasi "du" (sen) bilan ishlatiladi.` }
        ],
        scrambled: [
          { id: 1, words: [`ist`, `das`, `auto`, `ein`], answer: `Das ist ein Auto.`, explanation: `Das (bu) + ist (bo'lmoq) + ein Auto (bitta mashina).` },
          { id: 2, words: [`die`, `sind`, `taschen`, `hier`], answer: `Die Taschen sind hier.`, explanation: `Die Taschen (ko'plik) + sind (bo'lmoq) + hier (shu yerda).` },
          { id: 3, words: [`das`, `rot`, `buch`, `ist`], answer: `Das Buch ist rot.`, explanation: `Das Buch (kitob) + ist (bo'lmoq) + rot (qizil).` },
          { id: 4, words: [`eine`, `haben`, `wir`, `katze`], answer: `Wir haben eine Katze.`, explanation: `Wir (ega) + haben (fe'l) + eine Katze (to'ldiruvchi).` },
          { id: 5, words: [`ist`, `der`, `tisch`, `alt`], answer: `Der Tisch ist alt.`, explanation: `Der Tisch (stol) + ist (bo'lmoq) + alt (eski).` }
        ]
      },
      {
        id: `de-conjugation`,
        title: `Verben im Präsens (Fe'llarni tuslash)`,
        icon: `⚡`,
        guide: `## Nemis tilida fe'llarni hozirgi zamonda tuslash (Konjugation)
        
Nemis tilida hozirgi zamon (Präsens) fe'llarini tuslash uchun fe'l negiziga (stam) maxsus shaxs-son qo'shimchalari qo'shiladi. 

Ot-fe'llar infinitivda odatda **-en** bilan tugaydi (masalan: *lernen*, *spielen*, *wohnen*). Tuslash uchun **-en** olib tashlanadi va shaxslarga ko'ra quyidagi qo'shimchalar qo'shiladi:

### 1. Muntazam fe'llar tuslanishi (masalan: lernen - o'rganmoq)
• **ich** (men) -> negiz + **-e** -> ich lern**e**
• **du** (sen) -> negiz + **-st** -> du lern**st**
• **er/sie/es** (u) -> negiz + **-t** -> er lern**t**
• **wir** (biz) -> negiz + **-en** -> wir lern**en**
• **ihr** (sizlar) -> negiz + **-t** -> ihr lern**t**
• **sie/Sie** (ular/Siz) -> negiz + **-en** -> sie lern**en**

### 2. Eng muhim yordamchi fe'llar (Irregular)
Ushbu ikki fe'l qoidasiz tuslanadi va ularni yodlash shart:

**A. sein (bo'lmoq / to be)**
• ich **bin**
• du **bist**
• er/sie/es **ist**
• wir **sind**
• ihr **seid**
• sie/Sie **sind**

**B. haben (bor bo'lmoq / to have)**
• ich **habe**
• du **hast**
• er/sie/es **hat**
• wir **haben**
• ihr **habt**
• sie/Sie **haben**`,
        questions: [
          { id: 1, text: `"lernen" (o'rganmoq) fe'lining "ich" uchun shaklini tanlang:`, options: [`lernt`, `lernst`, `lerne`, `lernen`], correct: 2, explanation: `"ich" (men) olmoshi uchun fe'l oxiriga "-e" qo'shimchasi qo'shiladi: lerne.` },
          { id: 2, text: `"spielen" (o'ynamoq) fe'lini "du" uchun tuslang:`, options: [`spiele`, `spielst`, `spielt`, `spielen`], correct: 1, explanation: `"du" (sen) olmoshi uchun fe'l oxiriga "-st" qo'shiladi: spielst.` },
          { id: 3, text: `"er" (u) uchun "wohnen" (yashamoq) fe'lini to'g'ri tuslang:`, options: [`wohne`, `wohnst`, `wohnt`, `wohnen`], correct: 2, explanation: `"er/sie/es" (u) olmoshlari uchun fe'l oxiriga "-t" qo'shiladi: wohnt.` },
          { id: 4, text: `"haben" (bor bo'lmoq) fe'lini "du" uchun tuslang:`, options: [`habe`, `hast`, `hat`, `haben`], correct: 1, explanation: `"haben" fe'li du uchun "hast" shaklini oladi (irregular).` },
          { id: 5, text: `"sein" (bo'lmoq) fe'lini "ihr" (sizlar) uchun tuslang:`, options: [`sind`, `ist`, `bin`, `seid`], correct: 3, explanation: `"sein" fe'li ihr uchun "seid" shaklida bo'ladi.` },
          { id: 6, text: `"Wir ___ Deutsch lernen." gapida qaysi tus to'g'ri?`, options: [`wollen`, `will`, `wollt`, `wollst`], correct: 0, explanation: `"wir" (biz) uchun fe'l infinitivda qoladi: wollen.` },
          { id: 7, text: `Qaysi fe'l shakli "haben" fe'lining "er" (u) shakliga mos keladi?`, options: [`habe`, `hast`, `hat`, `haben`], correct: 2, explanation: `"er/sie/es" uchun "haben" fe'li "hat" bo'ladi.` },
          { id: 8, text: `To'g'ri gapni tanlang:`, options: [`Ihr lernen Deutsch.`, `Ihr lernt Deutsch.`, `Ihr lernst Deutsch.`, `Ihr lerne Deutsch.`], correct: 1, explanation: `"ihr" (sizlar) uchun fe'lga "-t" qo'shiladi: lernt.` },
          { id: 9, text: `"kommen" (kelmoq) fe'lini "sie" (ular) uchun tuslang:`, options: [`komme`, `kommst`, `kommt`, `kommen`], correct: 3, explanation: `"sie" (ular) uchun fe'l infinitivda qoladi: kommen.` },
          { id: 10, text: `"sein" fe'lining "wir" shakli qaysi?`, options: [`bin`, `bist`, `ist`, `sind`], correct: 3, explanation: `"wir" (biz) uchun sein fe'li "sind" bo'ladi.` }
        ],
        fillBlanks: [
          { id: 1, text: `Ich ___ aus Taschkent.`, options: [`komme`, `kommst`, `kommt`, `kommen`], correct: 0, explanation: `Ich uchun komme (kelaman) fe'li ishlatiladi.` },
          { id: 2, text: `Er ___ in Berlin.`, options: [`wohne`, `wohnst`, `wohnt`, `wohnen`], correct: 2, explanation: `Er uchun wohnt (yashaydi) fe'li ishlatiladi.` },
          { id: 3, text: `Wir ___ ein Haus.`, options: [`habe`, `hast`, `haben`, `hat`], correct: 2, explanation: `Wir uchun haben (bor) fe'li ishlatiladi.` },
          { id: 4, text: `___ du heute Zeit?`, options: [`Habe`, `Hast`, `Hat`, `Haben`], correct: 1, explanation: `du uchun hast fe'li ishlatiladi. So'roq gapda boshida keladi.` },
          { id: 5, text: `Ihr ___ Fußball.`, options: [`spiele`, `spielst`, `spielt`, `spielen`], correct: 2, explanation: `Ihr uchun spielt (o'ynaysizlar) fe'li ishlatiladi.` },
          { id: 6, text: `Sie (Siz - hurmat) ___ sehr nett.`, options: [`bin`, `bist`, `ist`, `sind`], correct: 3, explanation: `Sie (hurmat) uchun sein fe'li "sind" shaklida keladi.` },
          { id: 7, text: `Ich ___ Durst.`, options: [`habe`, `hast`, `haben`, `hat`], correct: 0, explanation: `Ich uchun habe (bor) fe'li ishlatiladi.` },
          { id: 8, text: `Mein Vater ___ Arzt.`, options: [`ist`, `sind`, `bin`, `bist`], correct: 0, explanation: `Mein Vater (u - ota) singular uchinchi shaxs bo'lgani uchun "ist" bo'ladi.` },
          { id: 9, text: `___ du Deutsch?`, options: [`Lerne`, `Lernst`, `Lernt`, `Lernen`], correct: 1, explanation: `du uchun lernst shakli to'g'ri keladi.` },
          { id: 10, text: `Sie (she) ___ Deutsch.`, options: [`lerne`, `lernst`, `lernt`, `lernen`], correct: 2, explanation: `sie (u - qiz bola) uchinchi shaxs birlik, shuning uchun "lernt" bo'ladi.` }
        ],
        scrambled: [
          { id: 1, words: [`bin`, `ich`, `student`], answer: `Ich bin Student.`, explanation: `Ich (ega) + bin (fe'l) + Student (ot).` },
          { id: 2, words: [`hast`, `du`, `zeit`, `heute`], answer: `Hast du heute Zeit?`, explanation: `So'roq gap: Hast (fe'l) + du (ega) + heute (vaqt) + Zeit (ot).` },
          { id: 3, words: [`deutsch`, `wir`, `lernen`], answer: `Wir lernen Deutsch.`, explanation: `Wir (ega) + lernen (fe'l) + Deutsch (to'ldiruvchi).` },
          { id: 4, words: [`in`, `wohnt`, `er`, `berlin`], answer: `Er wohnt in Berlin.`, explanation: `Er (ega) + wohnt (fe'l) + in Berlin (joy).` },
          { id: 5, words: [`tennis`, `spielt`, `ihr`], answer: `Spielt ihr Tennis?`, explanation: `So'roq gap: Spielt (fe'l) + ihr (ega) + Tennis (ot).` }
        ]
      }
    ]
  },
  intermediate: {
    label: `Intermediate (Mittelstufe)`,
    topics: []
  },
  advanced: {
    label: `Advanced (Fortgeschrittene)`,
    topics: []
  }
};
