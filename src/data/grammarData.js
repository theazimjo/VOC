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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      },
    ]
  }
};
