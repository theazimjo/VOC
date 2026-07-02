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
