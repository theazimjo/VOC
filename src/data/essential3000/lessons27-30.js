// Lessons 27-30 content for "Essential 3000", sourced from Units 27-30 of
// the real book — "4000 Essential English Words 1" by Paul Nation (Compass
// Publishing) — via pdftotext extraction of src/assets/data/essential
// english 1.pdf. Words, their sentence definitions, example sentences, and
// the reading stories + comprehension questions are transcribed from the
// book (each story's final comprehension question lost its answer options
// to an OCR/layout gap in the source PDF, same issue noted in lesson 1, so
// those four options are original per unit). Uzbek translations are
// original (the book is English-only). The listening dialogues are original
// narration written to reuse each unit's 20 target words, since the book
// itself has no audio/listening component. The grammar-stage exercises are
// original, one per target word, mixing fill-in-the-blank, correct word
// order, and correct question form — the same style as lesson 1.

const lesson27Words = [
  { id: 'l27w1', word: 'actually', translation: 'aslida', definition: 'Actually means in fact or really.', example: "My dad looks a little mean, but actually he's very kind.", partOfSpeech: 'adverb' },
  { id: 'l27w2', word: 'bite', translation: 'tishlash', definition: 'Bite is the act of using your teeth to cut and tear into something.', example: 'The boy took a big bite out of his hamburger.', partOfSpeech: 'noun' },
  { id: 'l27w3', word: 'coast', translation: "qirg'oq", definition: 'The coast is the land by an ocean.', example: 'I stayed on the southern coast of Australia.', partOfSpeech: 'noun' },
  { id: 'l27w4', word: 'deal', translation: 'kelishuv', definition: 'A deal is an agreement that you have with another person.', example: 'I made a deal with the other company to give us some money.', partOfSpeech: 'noun' },
  { id: 'l27w5', word: 'desert', translation: "cho'l", definition: 'The desert is an area of land without many plants or water.', example: 'Not many plants grow in the desert.', partOfSpeech: 'noun' },
  { id: 'l27w6', word: 'earthquake', translation: 'zilzila', definition: 'An earthquake is a shaking movement of the ground.', example: 'The building shook during the earthquake.', partOfSpeech: 'noun' },
  { id: 'l27w7', word: 'effective', translation: 'samarali', definition: 'If something is effective, it works well.', example: 'Swimming is an effective way to stay healthy.', partOfSpeech: 'adjective' },
  { id: 'l27w8', word: 'examine', translation: 'tekshirmoq', definition: 'To examine something is to look at it carefully.', example: 'The doctor examined my eyes today.', partOfSpeech: 'verb' },
  { id: 'l27w9', word: 'false', translation: "yolg'on, noto'g'ri", definition: 'If something is false, it is not correct.', example: 'If you think the answer is false, press the red button.', partOfSpeech: 'adjective' },
  { id: 'l27w10', word: 'gift', translation: "sovg'a", definition: 'A gift is something you give someone.', example: 'Dave received many gifts for Christmas.', partOfSpeech: 'noun' },
  { id: 'l27w11', word: 'hunger', translation: 'ochlik', definition: 'Hunger is the feeling that you get when you need to eat.', example: 'After playing all day long, he was filled with hunger.', partOfSpeech: 'noun' },
  { id: 'l27w12', word: 'imagine', translation: 'tasavvur qilmoq', definition: 'To imagine something is to think of it in your mind.', example: 'Sally imagined herself winning lots of money.', partOfSpeech: 'verb' },
  { id: 'l27w13', word: 'journey', translation: 'sayohat', definition: 'A journey is a long trip.', example: 'I went on a journey across the country with my parents.', partOfSpeech: 'noun' },
  { id: 'l27w14', word: 'puzzle', translation: 'jumboq', definition: 'A puzzle is something that is hard to understand.', example: 'The question was a puzzle to him.', partOfSpeech: 'noun' },
  { id: 'l27w15', word: 'quite', translation: 'ancha, juda', definition: 'Quite is used to say that something is complete or very much.', example: 'I think typing on a keyboard is quite easy.', partOfSpeech: 'adverb' },
  { id: 'l27w16', word: 'rather', translation: "ko'ra, buning o'rniga", definition: 'Rather is used when you want to do one thing but not the other.', example: 'I would rather have the red one than the blue one.', partOfSpeech: 'adverb' },
  { id: 'l27w17', word: 'specific', translation: 'aniq, muayyan', definition: 'If something is specific, it is precise or exact.', example: 'Please choose a specific place on the map.', partOfSpeech: 'adjective' },
  { id: 'l27w18', word: 'tour', translation: 'ekskursiya', definition: 'A tour is a short trip in which you see many sights.', example: 'I took a tour of Asia and Europe.', partOfSpeech: 'noun' },
  { id: 'l27w19', word: 'trip', translation: 'sayohat', definition: 'A trip is a journey to a certain place.', example: 'Ken took a trip to the city yesterday.', partOfSpeech: 'noun' },
  { id: 'l27w20', word: 'value', translation: 'qiymat', definition: 'If something has value, it is worth a lot of money.', example: 'Matthew found a treasure of very high value.', partOfSpeech: 'noun' },
];

const lesson27Grammar = {
  questions: [
    { id: 1, text: 'Choose the correct word order:', options: ['She actually likes spicy food.', 'She likes actually spicy food.', 'Actually she spicy food likes.', 'She likes spicy actually food.'], correct: 0, explanation: 'Adverbs like "actually" usually go right before the main verb.' },
    { id: 2, text: 'The dog ___ the mailman yesterday.', options: ['bite', 'bit', 'bites', 'biting'], correct: 1, explanation: 'The past simple of "bite" is "bit".' },
    { id: 3, text: 'Choose the correct word order:', options: ['We walked along the coast at sunset.', 'We along the coast walked at sunset.', 'Along the coast we at sunset walked.', 'At sunset walked we along the coast.'], correct: 0, explanation: 'Subject + Verb + Place + Time is the normal order.' },
    { id: 4, text: 'They ___ a deal with the new company last month.', options: ['make', 'made', 'makes', 'making'], correct: 1, explanation: 'Past simple: "made" for an action completed last month.' },
    { id: 5, text: 'Choose the correct question:', options: ['Is the desert hot during the day?', 'Does the desert hot during the day?', 'Are the desert hot during the day?', 'Do the desert is hot during the day?'], correct: 0, explanation: '"The desert" is singular, so use "Is".' },
    { id: 6, text: 'There ___ a strong earthquake in the city last night.', options: ['was', 'were', 'is', 'are'], correct: 0, explanation: '"An earthquake" is singular and the sentence is past tense, so use "was".' },
    { id: 7, text: 'Choose the correct word order:', options: ['This new medicine is very effective.', 'This new medicine very is effective.', 'Very effective this new medicine is.', 'This medicine effective is very new.'], correct: 0, explanation: 'Subject + Verb (is) + Adverb (very) + Adjective (effective) is the normal order.' },
    { id: 8, text: 'The doctor ___ patients every morning.', options: ['examine', 'examines', 'examining', 'examined'], correct: 1, explanation: '"The doctor" is singular, so add -s: examines.' },
    { id: 9, text: 'Choose the correct question:', options: ['Is this statement false?', 'Does this statement false?', 'Are this statement false?', 'Is false this statement?'], correct: 0, explanation: '"This statement" is singular, so use "Is".' },
    { id: 10, text: 'My parents ___ me a gift for my birthday.', options: ['give', 'gives', 'gave', 'giving'], correct: 2, explanation: 'Past simple: "gave" for a completed action.' },
    { id: 11, text: 'Choose the correct word order:', options: ['His hunger grew stronger every hour.', 'His hunger every hour grew stronger.', 'Grew his hunger stronger every hour.', 'Every hour his hunger stronger grew.'], correct: 0, explanation: 'Subject + Verb + Complement + Time is the normal order.' },
    { id: 12, text: '___ you imagine living without a phone?', options: ['Do', 'Does', 'Can', 'Is'], correct: 2, explanation: '"Can" is used to ask about ability or possibility.' },
    { id: 13, text: 'Choose the correct word order:', options: ['The journey to the mountains took five hours.', 'The journey took to the mountains five hours.', 'Five hours the journey took to the mountains.', 'To the mountains took the journey five hours.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order: The journey (S) took (V) five hours (O).' },
    { id: 14, text: 'This puzzle ___ very difficult to solve.', options: ['is', 'are', 'do', 'does'], correct: 0, explanation: '"This puzzle" is singular, so use "is".' },
    { id: 15, text: 'Choose the correct word order:', options: ['The exam was quite difficult.', 'The exam quite was difficult.', 'Quite the exam was difficult.', 'The exam difficult was quite.'], correct: 0, explanation: '"Quite" goes right before the adjective it describes.' },
    { id: 16, text: 'I would ___ stay home than go to the party.', options: ['rather', 'quite', 'specific', 'actually'], correct: 0, explanation: '"Would rather" is a fixed expression meaning to prefer one thing over another.' },
    { id: 17, text: 'Choose the correct word order:', options: ['Please give me a specific answer.', 'Please give a specific me answer.', 'Give me please a specific answer.', 'Please a specific answer give me.'], correct: 0, explanation: 'Verb + Indirect Object + Object is the normal order: give (V) me (IO) a specific answer (O).' },
    { id: 18, text: 'We ___ a tour of the museum yesterday.', options: ['take', 'takes', 'took', 'taking'], correct: 2, explanation: 'Past simple: "took" for an action completed yesterday.' },
    { id: 19, text: 'Choose the correct question:', options: ['Did you enjoy your trip?', 'Do you enjoy your trip yesterday?', 'Does you enjoyed your trip?', 'Are you enjoy your trip?'], correct: 0, explanation: 'Past simple questions use "Did" + subject + base verb.' },
    { id: 20, text: 'These old coins ___ a lot of value.', options: ['have', 'has', 'having', 'had'], correct: 0, explanation: '"Coins" is plural, so use "have".' },
  ],
};

const lesson27Reading = {
  title: 'The Spider and the Bird',
  pages: [
    [
      { type: 'heading', text: 'The Spider and the Bird' },
      { type: 'p', text: "There was once a very big spider. If a bug got into his web, he would examine it. However, he didn't eat the bug right away. He asked the bug a question first. It was always quite a difficult puzzle. If the bug's answer was correct, he let it go. If not, he ate it." },
      { type: 'p', text: "One day, a small bird on a journey flew into the spider's web. The spider couldn't imagine eating a bird. It was so big! But his hunger was too great. He said to the bird, \"If you cannot give me a specific answer, I will eat you.\"" },
    ],
    [
      { type: 'p', text: "The bird laughed. \"I could eat you!\" But the bird was actually scared. She had used all her energy trying to get out of the web. And a spider's bite can be very effective in killing animals." },
      { type: 'p', text: '"Please don\'t eat me," the bird said. "I would rather make a deal with you."' },
      { type: 'p', text: '"OK," the spider said. "If your answer is right, I will let you go. If not, you must give me a gift. It must be something of great value."' },
    ],
    [
      { type: 'p', text: 'The bird said, "You can pick anything you want to eat. I will find it for you." The spider agreed.' },
      { type: 'p', text: '"Where can you take a trip to the coast, the desert, and the mountains at the same time?" the spider asked.' },
      { type: 'p', text: 'The bird asked, "Does this place have earthquakes?" But the spider did not say anything. "I can see those places when I fly. Is the \'sky\' the right answer?"' },
    ],
    [
      { type: 'p', text: '"False!" said the spider. "The answer is Hawaii! Now you must find some bugs for me."' },
      { type: 'p', text: 'The spider climbed on the bird\'s back. They flew and ate bugs together. They took a tour of the forest. Then the bird took the spider home.' },
      { type: 'p', text: 'From that day on, they were friends. And they never tried to eat each other again.' },
    ],
  ],
  questions: [
    { id: 1, text: "Which is NOT part of the spider's puzzle?", options: ['The coast', 'An earthquake', 'A mountain', 'The desert'], correct: 1 },
    { id: 2, text: 'Why does the bird make a deal instead of flying away?', options: ['Her wings are quite effective in the web.', 'She is too tired from trying to get out of the web.', 'She cannot fly because of her hunger.', 'She would rather take the spider on a trip.'], correct: 1 },
    { id: 3, text: "What will be the bird's gift to the spider?", options: ['A tour of the coast', 'A specific kind of web', 'Anything the spider wants to eat', 'A trip to anywhere'], correct: 2 },
    { id: 4, text: "What is the spider's response to the bird's answer?", options: ['Your answer is false!', 'Can you imagine!', 'No deal!', 'That has no value!'], correct: 0 },
    { id: 5, text: 'What is the first thing the spider does when a bug gets into his web?', options: ['He examines it carefully', 'He eats it immediately', 'He asks it to leave the web', 'He calls other spiders for help'], correct: 0 },
  ],
};

const lesson27Listening = {
  title: 'A Trip to Remember',
  script: "Last summer, Maria went on a long journey to visit her grandmother, who lived near the coast. Before she left, her mother made a deal with her: if Maria wrote a letter every week, she could go on a longer trip next year.\n\nOn the way, Maria's bus passed through a desert. She tried to imagine how hot it must be to live there. She was quite tired, and she felt a strong hunger, so she stopped to eat.\n\nWhen she finally arrived, her grandmother gave her a wonderful gift: a puzzle made of wood that came from a specific village near the mountains. \"This puzzle is very effective for learning patience,\" her grandmother said with a smile.\n\nOne night, they felt the ground shake. \"Was that an earthquake?\" Maria asked, a little scared. \"No,\" her grandmother laughed, \"that was actually just a truck outside. Don't worry, it's a false alarm.\"\n\nRather than staying inside, they decided to examine the stars together and talk about the value of family time. Maria took a short tour of the old town the next day, and it became a trip she would never forget, taking one more bite of her grandmother's cake before she left.",
  questions: [
    { id: 1, text: "Where did Maria's grandmother live?", options: ['Near the coast', 'In the desert', 'In the mountains', 'In the city'], correct: 0 },
    { id: 2, text: 'What deal did Maria make with her mother?', options: ['To take a longer trip next year if she wrote weekly letters', 'To bring back a specific gift', 'To visit the desert every summer', 'To learn a new language'], correct: 0 },
    { id: 3, text: "What gift did Maria's grandmother give her?", options: ['A wooden puzzle', 'A map of the desert', 'A new bag for her journey', 'A book about earthquakes'], correct: 0 },
    { id: 4, text: 'What did they think shook the ground at night?', options: ['An earthquake, but it was actually a truck', 'A puzzle falling off a shelf', 'A storm from the coast', 'Nothing at all'], correct: 0 },
    { id: 5, text: 'What did Maria and her grandmother do instead of staying inside?', options: ['Examine the stars together', 'Take a tour of the desert', 'Solve a puzzle inside', 'Eat breakfast outside'], correct: 0 },
  ],
};

const lesson28Words = [
  { id: 'l28w1', word: 'band', translation: 'guruh (musiqa guruhi)', definition: 'A band is a group of people who play music.', example: 'My brother is in a rock band.', partOfSpeech: 'noun' },
  { id: 'l28w2', word: 'barely', translation: "zo'rg'a", definition: 'Barely means by the smallest amount, almost not.', example: 'I barely had enough money to pay for my bus ticket.', partOfSpeech: 'adverb' },
  { id: 'l28w3', word: 'boring', translation: 'zerikarli', definition: 'If something is boring, it is not fun.', example: 'I think the Internet is boring.', partOfSpeech: 'adjective' },
  { id: 'l28w4', word: 'cancel', translation: 'bekor qilmoq', definition: 'To cancel means to decide that an event or a request will not happen.', example: 'She cancelled the rest of her plans because of the rain.', partOfSpeech: 'verb' },
  { id: 'l28w5', word: 'driveway', translation: 'hovli yo\'lkasi', definition: 'A driveway is a short private road that leads to a person\'s home.', example: 'The long driveway led us to their new house.', partOfSpeech: 'noun' },
  { id: 'l28w6', word: 'garbage', translation: 'axlat', definition: 'Garbage is waste material like unwanted or spoiled food, bottles, paper, etc.', example: 'The boy cleaned up the garbage around his house.', partOfSpeech: 'noun' },
  { id: 'l28w7', word: 'instrument', translation: 'asbob', definition: 'An instrument is something designed to do a certain task like music.', example: 'My favorite musical instrument is the piano.', partOfSpeech: 'noun' },
  { id: 'l28w8', word: 'list', translation: "ro'yxat", definition: 'A list is a record of information printed with an item on each line.', example: 'My mom makes a list of groceries to buy.', partOfSpeech: 'noun' },
  { id: 'l28w9', word: 'magic', translation: 'sehr', definition: 'Magic is the power to do impossible things.', example: 'The magician used magic to pull a rabbit out of his hat.', partOfSpeech: 'noun' },
  { id: 'l28w10', word: 'message', translation: 'xabar', definition: 'A message is a set of words that you send to someone.', example: 'I left a message for you in the envelope.', partOfSpeech: 'noun' },
  { id: 'l28w11', word: 'notice', translation: 'sezmoq, payqamoq', definition: 'To notice something is to see it for the first time.', example: 'Did you notice the view?', partOfSpeech: 'verb' },
  { id: 'l28w12', word: 'own', translation: 'egalik qilmoq', definition: 'To own something means to have it. That thing belongs to you.', example: 'My grandfather owns that house.', partOfSpeech: 'verb' },
  { id: 'l28w13', word: 'predict', translation: 'bashorat qilmoq', definition: 'To predict something is to say that it will happen.', example: 'She predicted that I would get married next year.', partOfSpeech: 'verb' },
  { id: 'l28w14', word: 'professor', translation: 'professor', definition: 'A professor is a person who teaches in college.', example: "Mike's science professor knows a lot about physics.", partOfSpeech: 'noun' },
  { id: 'l28w15', word: 'rush', translation: 'shoshilmoq', definition: 'To rush is to go somewhere or do something very quickly.', example: 'Nancy rushed to finish her homework.', partOfSpeech: 'verb' },
  { id: 'l28w16', word: 'schedule', translation: 'jadval', definition: 'A schedule is a plan that tells you when to do things.', example: 'What is your class schedule for today?', partOfSpeech: 'noun' },
  { id: 'l28w17', word: 'share', translation: "baham ko'rmoq", definition: 'To share something is to give some of it to another person.', example: 'Jimmy shared his apple with me.', partOfSpeech: 'verb' },
  { id: 'l28w18', word: 'stage', translation: 'sahna', definition: 'A stage is a place where actors or musicians act or sing.', example: 'A large screen was on the stage.', partOfSpeech: 'noun' },
  { id: 'l28w19', word: 'storm', translation: "bo'ron", definition: 'A storm is very bad weather. There is a lot of rain or snow.', example: 'Did that storm wake you up last night?', partOfSpeech: 'noun' },
  { id: 'l28w20', word: 'within', translation: 'ichida', definition: 'You use within to say that something is inside another thing.', example: 'Within the box, there was a pizza.', partOfSpeech: 'preposition' },
];

const lesson28Grammar = {
  questions: [
    { id: 1, text: 'My brother plays guitar in a rock ___.', options: ['band', 'bands', 'banned', 'banding'], correct: 0, explanation: '"A rock band" — singular noun after the article "a".' },
    { id: 2, text: 'Choose the correct word order:', options: ['She barely finished her homework on time.', 'She finished barely her homework on time.', 'Barely she her homework finished on time.', 'She finished her homework barely on time.'], correct: 0, explanation: '"Barely" goes right before the main verb.' },
    { id: 3, text: 'This movie is very ___.', options: ['bore', 'bored', 'boring', 'bores'], correct: 2, explanation: '"-ing" adjectives (boring) describe the thing that causes the feeling.' },
    { id: 4, text: 'Choose the correct question:', options: ['Did they cancel the trip?', 'Do they cancel the trip yesterday?', 'Does they cancelled the trip?', 'Are they cancel the trip?'], correct: 0, explanation: 'Past simple questions use "Did" + subject + base verb.' },
    { id: 5, text: 'There ___ two cars in the driveway.', options: ['is', 'are', 'was', 'has'], correct: 1, explanation: '"Two cars" is plural, so use "are".' },
    { id: 6, text: 'Choose the correct word order:', options: ['Please take out the garbage tonight.', 'Please the garbage take out tonight.', 'Take out please tonight the garbage.', 'Please out take the garbage tonight.'], correct: 0, explanation: '"Take out the garbage" keeps the phrasal verb together before the object here.' },
    { id: 7, text: 'How many musical ___ can you play?', options: ['instrument', 'instruments', 'instrumental', 'instrumenting'], correct: 1, explanation: '"How many" is followed by a plural noun.' },
    { id: 8, text: 'She ___ a shopping list every week.', options: ['make', 'makes', 'made', 'making'], correct: 1, explanation: '"She" is singular, so add -s: makes.' },
    { id: 9, text: 'Choose the correct word order:', options: ['The magician performed magic on stage.', 'The magician magic performed on stage.', 'On stage the magician performed magic.', 'The magician performed on stage magic.'], correct: 0, explanation: 'Subject + Verb + Object + Place is the normal order.' },
    { id: 10, text: '___ you leave a message for him?', options: ['Do', 'Does', 'Can', 'Is'], correct: 2, explanation: '"Can" is used to ask for permission or ability.' },
    { id: 11, text: 'I ___ a strange noise last night.', options: ['notice', 'noticed', 'notices', 'noticing'], correct: 1, explanation: 'Past simple: "noticed" for an action last night.' },
    { id: 12, text: 'Choose the correct question:', options: ['Does she own this car?', 'Do she own this car?', 'Is she own this car?', 'Are she owns this car?'], correct: 0, explanation: '"She" is singular, so use "Does" + base verb.' },
    { id: 13, text: 'Scientists ___ that it will rain tomorrow.', options: ['predict', 'predicts', 'predicted', 'predicting'], correct: 0, explanation: '"Scientists" is plural, so the verb takes no -s.' },
    { id: 14, text: 'Choose the correct word order:', options: ['The professor explained the lesson clearly.', 'The professor explained clearly the lesson.', 'Clearly the professor explained the lesson.', 'The professor the lesson explained clearly.'], correct: 0, explanation: 'Subject + Verb + Object + Adverb is the normal order.' },
    { id: 15, text: 'We ___ to the airport because we were late.', options: ['rush', 'rushed', 'rushes', 'rushing'], correct: 1, explanation: 'Past simple: "rushed" matches the past tense "were late".' },
    { id: 16, text: 'What is your ___ for tomorrow?', options: ['schedule', 'schedules', 'scheduling', 'scheduled'], correct: 0, explanation: '"Your" is followed by the singular noun "schedule".' },
    { id: 17, text: 'Choose the correct question:', options: ['Will you share your notes with me?', 'Do you will share your notes with me?', 'Are you share your notes with me?', 'Does you sharing your notes with me?'], correct: 0, explanation: 'Future questions use "Will" + subject + base verb.' },
    { id: 18, text: 'Choose the correct word order:', options: ['The singer walked onto the stage.', 'The singer onto the stage walked.', 'Onto the stage the singer walked.', 'Walked the singer onto the stage.'], correct: 0, explanation: 'Subject + Verb + Place is the normal order.' },
    { id: 19, text: 'There ___ a big storm last weekend.', options: ['was', 'were', 'is', 'are'], correct: 0, explanation: '"A big storm" is singular and the sentence is past tense, so use "was".' },
    { id: 20, text: 'Choose the correct word order:', options: ['You must finish the test within an hour.', 'You must finish within the test an hour.', 'Within an hour you must the test finish.', 'You must finish the test an hour within.'], correct: 0, explanation: 'Subject + Verb + Object + Time phrase (within an hour) is the normal order.' },
  ],
};

const lesson28Reading = {
  title: 'The Party',
  pages: [
    [
      { type: 'heading', text: 'The Party' },
      { type: 'p', text: 'Cody\'s family moved to a new house. His dad got a new job as a professor. Cody liked his new town, but he missed his grandparents. For his birthday, Cody wanted to have a party. His dad said, "Yes, we could even have a band play!"' },
      { type: 'p', text: 'On the day of the party, Cody woke up and rushed to get ready. He started to check his list of things to do. He was so excited! But then he noticed something terrible. There was snow on the ground and lots of it! "Dad!" he yelled. "How can the band play their instruments outside?"' },
    ],
    [
      { type: 'p', text: 'Dad said, "We\'ll move the stage inside." It barely fit within the garage because there were some boxes and garbage there. But when they finished, they got a call from the band. They did not want to come in the snow storm.' },
      { type: 'p', text: 'Dad said, "Let\'s get someone to perform magic." But no one would come because of the snow.' },
      { type: 'p', text: 'Finally, Dad said, "Cody, there\'s too much snow. We need to cancel the party."' },
      { type: 'p', text: '"Yes, sir," Cody said sadly. "It\'s going to be a boring birthday," he predicted.' },
    ],
    [
      { type: 'p', text: 'Cody wanted to share his birthday with someone. He wanted to be at his old home. He wanted to see his grandparents.' },
      { type: 'p', text: 'But then something got his attention. He noticed a car in the driveway. His grandparents owned a car like that!' },
      { type: 'p', text: 'Cody was right. His grandparents came for his birthday! "Happy birthday, Cody! We\'re sorry we are late. But there was so much snow. It made us go off schedule. We tried to leave a message to tell you."' },
    ],
    [
      { type: 'p', text: 'Cody told them what happened. "I\'m sorry," said Grandpa.' },
      { type: 'p', text: '"I was sad," Cody said. "But I\'m not anymore. I\'m so happy to see you." Dad brought out Cody\'s birthday treat. It was his favorite type, a sundae with whipped cream on top. Then Cody told his grandparents about the new town. It was his best birthday ever.' },
    ],
  ],
  questions: [
    { id: 1, text: "What does Cody's dad do as a job?", options: ['His dad is a professor.', 'His dad is in a band.', 'His dad owns a restaurant.', 'His dad does magic shows.'], correct: 0 },
    { id: 2, text: 'What does Cody want for his birthday?', options: ['A musical instrument', 'A stage to play music on', 'Someone to share it with', 'Everything on his list'], correct: 2 },
    { id: 3, text: 'What does Cody predict will happen?', options: ['He will have a boring birthday.', 'He will eat ice cream.', 'No one will notice the snow storm.', 'He will have to rush to get ready for the party.'], correct: 0 },
    { id: 4, text: "What gets Cody's attention?", options: ['His dad calling him "sir"', 'The car his grandparents own', 'The stage within the garage', 'That nothing is happening on schedule'], correct: 1 },
    { id: 5, text: 'Why did his grandparents try to leave a message?', options: ['To tell Cody they would be late because of the snow', 'To ask Cody to cancel the party', 'To predict the weather for him', 'To invite the band to the party'], correct: 0 },
  ],
};

const lesson28Listening = {
  title: 'A Rainy Rehearsal',
  script: "Jake plays the drums in a school band, and today they had a big rehearsal before a real stage show. He checked his schedule and saw he had to rush to make it on time.\n\nAs he ran out, he almost didn't notice a message on his phone from his professor: a storm was coming, and the practice might cancel. Jake barely had time to grab his instrument before jumping into the car his family owns.\n\nOn the driveway, he saw his neighbor taking out the garbage. \"Don't forget your list of songs!\" she called out, since she knew the whole schedule by heart. Jake smiled; nothing about this day felt boring.\n\nWhen he arrived, the other band members were waiting within the practice room. Their teacher could predict the weather pretty well, and she said, \"Let's share the stage today, storm or no storm - we still have a show to give!\"\n\nSomehow, everything worked out like magic, and the rehearsal was a great success.",
  questions: [
    { id: 1, text: 'What does Jake play in the school band?', options: ['The drums', 'The guitar', 'The piano', 'The violin'], correct: 0 },
    { id: 2, text: 'Why did Jake have to rush?', options: ['To make it to rehearsal on time before a storm', 'To buy a new instrument', 'To take out the garbage', 'To meet his professor at school'], correct: 0 },
    { id: 3, text: 'Who was taking out the garbage on the driveway?', options: [ "Jake's neighbor", "Jake's professor", 'A band member', 'Jake\'s teacher'], correct: 0 },
    { id: 4, text: "What did Jake's neighbor remind him about?", options: ['His list of songs', 'His schedule for tomorrow', 'A message from his professor', 'The stage set-up'], correct: 0 },
    { id: 5, text: 'What did the teacher say about the storm?', options: ['They would still share the stage and perform', 'They should cancel the rehearsal', 'Everyone should go home', 'The band should predict the weather first'], correct: 0 },
  ],
};

const lesson29Words = [
  { id: 'l29w1', word: 'advertise', translation: 'reklama qilmoq', definition: 'To advertise is to tell people about something on TV, radio, etc.', example: 'They used a rabbit to help them advertise their product.', partOfSpeech: 'verb' },
  { id: 'l29w2', word: 'assign', translation: 'topshirmoq', definition: 'To assign something to someone is to tell them to do it.', example: 'I assigned the worker an important task.', partOfSpeech: 'verb' },
  { id: 'l29w3', word: 'audience', translation: 'tomoshabinlar', definition: 'An audience is a group of people who watch something together.', example: 'There was a large audience at the game.', partOfSpeech: 'noun' },
  { id: 'l29w4', word: 'breakfast', translation: 'nonushta', definition: 'Breakfast is the first meal of the day.', example: 'I eat breakfast at 8:00 every morning.', partOfSpeech: 'noun' },
  { id: 'l29w5', word: 'competition', translation: 'musobaqa', definition: 'A competition is a contest to see who is the best at something.', example: 'He won the running competition over the weekend.', partOfSpeech: 'noun' },
  { id: 'l29w6', word: 'cool', translation: 'salqin', definition: 'If the weather is cool, it is a little bit cold.', example: 'The weather is cool in the fall.', partOfSpeech: 'adjective' },
  { id: 'l29w7', word: 'gain', translation: 'orttirmoq', definition: 'If you gain something, you get more of it.', example: 'I gained some weight over the summer.', partOfSpeech: 'verb' },
  { id: 'l29w8', word: 'importance', translation: 'ahamiyat', definition: 'Importance means the quality or condition of being needed or valued.', example: 'VIPs are people of great importance.', partOfSpeech: 'noun' },
  { id: 'l29w9', word: 'knowledge', translation: 'bilim', definition: 'Knowledge is information that you have about something.', example: 'A music teacher should have good knowledge of music.', partOfSpeech: 'noun' },
  { id: 'l29w10', word: 'major', translation: 'muhim, katta', definition: 'If something is major, it is big or important.', example: 'I have a major problem. My boss wants me to redo my project!', partOfSpeech: 'adjective' },
  { id: 'l29w11', word: 'mean', translation: 'beshafqat', definition: 'Mean describes someone who is unkind or cruel.', example: 'My co-worker is a very mean person. He gets angry very quickly.', partOfSpeech: 'adjective' },
  { id: 'l29w12', word: 'prefer', translation: 'afzal ko\'rmoq', definition: 'If you prefer something, you want it more than something else.', example: 'I prefer to take the path that will lead me to a bright future.', partOfSpeech: 'verb' },
  { id: 'l29w13', word: 'president', translation: 'prezident', definition: 'A president is the leader of a country.', example: 'The president of our country made an important announcement.', partOfSpeech: 'noun' },
  { id: 'l29w14', word: 'progress', translation: 'rivojlanish', definition: 'Progress is the act of getting closer to doing or finishing something.', example: 'Our company made financial progress this year.', partOfSpeech: 'noun' },
  { id: 'l29w15', word: 'respect', translation: 'hurmat', definition: 'Respect is a good opinion of someone because they are good.', example: 'I have great respect for firemen.', partOfSpeech: 'noun' },
  { id: 'l29w16', word: 'rich', translation: 'boy', definition: 'If you are rich, you have a lot of money.', example: "He's rich. He can buy anything he wants.", partOfSpeech: 'adjective' },
  { id: 'l29w17', word: 'skill', translation: 'mahorat', definition: 'A skill is the knowledge and ability that allows you to do something well.', example: 'A snowboarder must have the right skills to do well.', partOfSpeech: 'noun' },
  { id: 'l29w18', word: 'somehow', translation: "qandaydir yo'l bilan", definition: 'Somehow means in a way or by some means which is not known.', example: 'He somehow had to find a way to reach the life preserver.', partOfSpeech: 'adverb' },
  { id: 'l29w19', word: 'strength', translation: 'kuch', definition: 'Strength is the physical power that you have.', example: 'Exercising will increase your strength and give you more power.', partOfSpeech: 'noun' },
  { id: 'l29w20', word: 'vote', translation: 'ovoz bermoq', definition: 'To vote is to officially choose between two or more things.', example: 'I voted for Billy to be our class president.', partOfSpeech: 'verb' },
];

const lesson29Grammar = {
  questions: [
    { id: 1, text: 'Companies ___ their products on TV.', options: ['advertise', 'advertises', 'advertised', 'advertising'], correct: 0, explanation: '"Companies" is plural, so the verb takes no -s.' },
    { id: 2, text: 'The teacher ___ us new homework every day.', options: ['assign', 'assigns', 'assigned', 'assigning'], correct: 1, explanation: '"The teacher" is singular, so add -s: assigns.' },
    { id: 3, text: 'Choose the correct word order:', options: ['The audience clapped loudly after the show.', 'The audience after the show clapped loudly.', 'Loudly the audience clapped after the show.', 'After the show the audience loudly clapped.'], correct: 0, explanation: 'Subject + Verb + Adverb + Time is the normal order.' },
    { id: 4, text: '___ you eat breakfast every morning?', options: ['Do', 'Does', 'Are', 'Is'], correct: 0, explanation: '"You" uses "Do" + base verb in questions.' },
    { id: 5, text: 'Choose the correct word order:', options: ['She won the singing competition last year.', 'She won last year the singing competition.', 'Last year she the singing competition won.', 'The singing competition she won last year.'], correct: 0, explanation: 'Subject + Verb + Object + Time is the normal order.' },
    { id: 6, text: 'It is quite ___ outside today.', options: ['cool', 'cools', 'cooled', 'cooling'], correct: 0, explanation: '"Cool" is an adjective here, so it does not take -s/-ed/-ing.' },
    { id: 7, text: 'He ___ a lot of experience during his internship.', options: ['gain', 'gains', 'gained', 'gaining'], correct: 2, explanation: 'Past simple: "gained" for a completed action.' },
    { id: 8, text: 'Choose the correct word order:', options: ['This meeting is of great importance.', 'This meeting is great of importance.', 'Of great importance this meeting is.', 'This meeting great importance is of.'], correct: 0, explanation: 'Subject + Verb + Complement is the normal order.' },
    { id: 9, text: 'She has excellent ___ of history.', options: ['knowledge', 'knowledges', 'knowing', 'knowledgeable'], correct: 0, explanation: '"Knowledge" is uncountable, so it has no plural form.' },
    { id: 10, text: 'Choose the correct question:', options: ['Is this a major problem?', 'Does this a major problem?', 'Are this a major problem?', 'Do this is major problem?'], correct: 0, explanation: '"This" is singular, so use "Is".' },
    { id: 11, text: "It's ___ to laugh at someone's mistakes.", options: ['mean', 'means', 'meant', 'meaning'], correct: 0, explanation: '"Mean" is the adjective form here, so it stays unchanged after "is".' },
    { id: 12, text: '___ you prefer tea or coffee?', options: ['Do', 'Does', 'Are', 'Is'], correct: 0, explanation: '"You" uses "Do" + base verb in questions.' },
    { id: 13, text: 'Choose the correct word order:', options: ['The president gave a speech yesterday.', 'The president yesterday gave a speech.', 'Yesterday gave the president a speech.', 'A speech the president gave yesterday.'], correct: 0, explanation: 'Subject + Verb + Object + Time is the normal order.' },
    { id: 14, text: 'The team ___ great progress this month.', options: ['make', 'makes', 'has made', 'making'], correct: 2, explanation: 'Present perfect ("has made") fits an action continuing up to now, "this month".' },
    { id: 15, text: 'We should ___ our teachers.', options: ['respect', 'respects', 'respected', 'respecting'], correct: 0, explanation: 'After "should", use the base form of the verb.' },
    { id: 16, text: 'Choose the correct word order:', options: ['She became rich after selling her company.', 'She became after selling her company rich.', 'Rich she became after selling her company.', 'She rich became after selling her company.'], correct: 0, explanation: 'Subject + Verb + Complement + Reason is the normal order.' },
    { id: 17, text: 'Cooking is a useful ___ to have.', options: ['skill', 'skills', 'skillful', 'skilling'], correct: 0, explanation: '"A useful skill" — singular noun after the article "a".' },
    { id: 18, text: 'Choose the correct word order:', options: ['He somehow finished the race first.', 'He finished somehow the race first.', 'Somehow he the race finished first.', 'He finished the race somehow first.'], correct: 0, explanation: '"Somehow" usually goes right before the main verb.' },
    { id: 19, text: '___ is needed to lift heavy weights.', options: ['Strength', 'Strengths', 'Strengthen', 'Strengthening'], correct: 0, explanation: '"Strength" is uncountable, so it stays singular as the subject.' },
    { id: 20, text: 'Did you ___ in the last election?', options: ['vote', 'votes', 'voted', 'voting'], correct: 0, explanation: 'After "Did", use the base form of the verb.' },
  ],
};

const lesson29Reading = {
  title: 'How the World Got Light',
  pages: [
    [
      { type: 'heading', text: 'How the World Got Light' },
      { type: 'p', text: 'The president of Darkland was a pig--a very bad pig. He was a pig of major importance. He was rich, and he had a lot of strength. But he was mean to all the animals in Darkland. He kept all of the world\'s light in a bag. He preferred to keep the world cool and dark. He wanted to stop the progress of the city. The animals couldn\'t work in the dark. He didn\'t have any respect for them. "Light is too good for them," he said. "Only I should have light."' },
    ],
    [
      { type: 'p', text: 'But the animals needed light. So they decided to hold a competition. They wanted to find the smartest animal in Darkland. That animal had to steal light from the president. They advertised the competition everywhere. All the animals came.' },
      { type: 'p', text: 'The animals all showed off their skills. The audience watched and then voted for the animal with the most knowledge. The winner was a tall bird named Raven. They assigned him the job of getting light.' },
    ],
    [
      { type: 'p', text: 'The next morning, Raven ate breakfast and then left his home. "How will I gain light from the president?" thought Raven. He needed to trick the president somehow. Then, Raven had an idea. Raven could make his voice sound like anything!' },
      { type: 'p', text: 'Raven walked up to the president\'s door. He made the sound of a crying baby. He cried very loudly. Soon, the president opened the door.' },
      { type: 'p', text: '"Be quiet!" the president yelled. Right then, Raven quickly made his move. He flew by the pig and found the soft bag. He took it outside. The sun was inside the bag!' },
    ],
    [
      { type: 'p', text: 'Raven flew high and put the sun in the sky. The president was very mad. Raven flew away safely, and all the animals were very happy. At last, they had light again, and they never stopped thinking of Raven as their hero.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['How a big, tall bird gave light to the world', 'A rich president who helped the world stay cool', 'How a competition helped animals gain skills', "The importance of gaining the president's respect"], correct: 0 },
    { id: 2, text: 'Why did the pig hide the sun?', options: ['To let the people assign a job to Raven', 'To bring an audience to see his big house', 'To prevent the animals from voting', 'To stop progress'], correct: 3 },
    { id: 3, text: 'What is NOT true of the president?', options: ['He kept the sun in a soft bag.', 'He did not like the animals of Darkland.', 'He found a baby outside his house.', 'He became very angry at Raven.'], correct: 2 },
    { id: 4, text: 'How did Raven steal the sun?', options: ['He used his strength to fight the president for it.', 'He used his knowledge of the area to find it.', 'He made a sound like a baby to make the pig open the door.', 'He advertised a major competition and won it.'], correct: 2 },
    { id: 5, text: 'What was inside the soft bag?', options: ['The sun', 'A crying baby', 'Gold coins', 'Nothing at all'], correct: 0 },
  ],
};

const lesson29Listening = {
  title: 'Winning the Contest',
  script: "Every year, the school holds a major competition to find the student with the best public-speaking skill. This year, the student president decided to advertise it to the whole school.\n\nAmy wanted to join, but she wasn't rich or especially strong - she knew that winning would take knowledge and practice, not strength. She ate a good breakfast every morning before school to stay focused and made steady progress each week.\n\nHer teacher was assigned to help her prepare. \"I prefer honest feedback over easy praise,\" Amy told him, because she understood the importance of real practice. Somehow, even on the days it felt hard, she kept going.\n\nOn the day of the competition, the audience filled the cool auditorium. Amy wasn't mean or nervous - she felt calm and ready. She didn't want to gain fame; she just wanted to do her best and gain her own respect.\n\nAfter all the speeches, the audience got to vote for their favorite. When Amy's name was called as the winner, she felt proud - not because she was the richest or the strongest, but because of everything she had learned along the way.",
  questions: [
    { id: 1, text: 'What kind of competition did the school hold?', options: ['A public-speaking competition', 'A cooking competition', 'A running competition', 'A singing competition'], correct: 0 },
    { id: 2, text: 'Who decided to advertise the competition?', options: ['The student president', "Amy's teacher", "Amy's parents", 'The audience'], correct: 0 },
    { id: 3, text: 'What did Amy do to prepare, besides practicing?', options: ['Ate a good breakfast every morning', 'Stayed up very late every night', 'Skipped school to study', "Avoided her teacher's help"], correct: 0 },
    { id: 4, text: 'What kind of feedback did Amy prefer?', options: ['Honest feedback over easy praise', 'No feedback at all', 'Feedback only from the audience', 'Feedback only after she won'], correct: 0 },
    { id: 5, text: 'How did the audience choose the winner?', options: ['They voted for their favorite speech', 'The teacher decided alone', 'The president chose the winner', 'Everyone who competed won'], correct: 0 },
  ],
};

const lesson30Words = [
  { id: 'l30w1', word: 'above', translation: 'yuqorida', definition: 'If something is above, it is at a higher level than something else.', example: 'He straightened the sign that was above the crowd.', partOfSpeech: 'preposition' },
  { id: 'l30w2', word: 'ahead', translation: 'oldinda', definition: 'If something is ahead of something else, it is in front of it.', example: 'The blue car drove on ahead of us.', partOfSpeech: 'adverb' },
  { id: 'l30w3', word: 'amount', translation: 'miqdor', definition: 'An amount is how much there is of something.', example: 'Can I use my card to pay for the entire amount?', partOfSpeech: 'noun' },
  { id: 'l30w4', word: 'belief', translation: "ishonch, e'tiqod", definition: 'A belief is a strong feeling that something is correct or true.', example: 'A preacher or priest should have a strong belief in God.', partOfSpeech: 'noun' },
  { id: 'l30w5', word: 'center', translation: 'markaz', definition: 'The center of something is the middle of it.', example: 'The fountain is in the center of the park.', partOfSpeech: 'noun' },
  { id: 'l30w6', word: 'common', translation: 'keng tarqalgan', definition: 'If something is common, it happens often or there is much of it.', example: 'It is common for snow to fall in the winter.', partOfSpeech: 'adjective' },
  { id: 'l30w7', word: 'cost', translation: 'narxi bo\'lmoq', definition: 'To cost is to require expenditure or payment.', example: 'These designer shoes cost more than the regular ones.', partOfSpeech: 'verb' },
  { id: 'l30w8', word: 'demonstrate', translation: "ko'rsatmoq", definition: 'To demonstrate something is to show how it is done.', example: 'She demonstrated her plan to her co-workers.', partOfSpeech: 'verb' },
  { id: 'l30w9', word: 'different', translation: 'boshqacha, farqli', definition: 'Different describes someone or something that is not the same as others.', example: 'Each of my sisters has a different hairstyle from one another.', partOfSpeech: 'adjective' },
  { id: 'l30w10', word: 'evidence', translation: 'dalil', definition: 'Evidence is a fact or thing that you use to prove something.', example: 'He used the pictures as evidence that UFOs are real.', partOfSpeech: 'noun' },
  { id: 'l30w11', word: 'honesty', translation: 'halollik', definition: 'Honesty means the quality of being truthful or honest.', example: 'A courtroom should be a place of honesty.', partOfSpeech: 'noun' },
  { id: 'l30w12', word: 'idiom', translation: 'idioma', definition: 'An idiom is a phrase with a meaning different from its words.', example: 'The idiom "when pigs fly" means that something will never happen.', partOfSpeech: 'noun' },
  { id: 'l30w13', word: 'independent', translation: 'mustaqil', definition: 'If something is independent, it is not controlled by something else.', example: 'She chose to live an independent life in the country.', partOfSpeech: 'adjective' },
  { id: 'l30w14', word: 'inside', translation: 'ichki qism', definition: 'Inside means the inner part, space or side of something.', example: 'The inside of the box was empty.', partOfSpeech: 'noun' },
  { id: 'l30w15', word: 'master', translation: 'usta', definition: 'A master is a person who is very good at something.', example: 'My brother is a master of taekwondo.', partOfSpeech: 'noun' },
  { id: 'l30w16', word: 'memory', translation: 'xotira', definition: 'A memory is something you remember.', example: 'The memory of my first time in the city will always be the best.', partOfSpeech: 'noun' },
  { id: 'l30w17', word: 'proper', translation: "to'g'ri, munosib", definition: 'If something is proper, it is right.', example: 'It is not proper to throw your garbage on the road.', partOfSpeech: 'adjective' },
  { id: 'l30w18', word: 'scan', translation: "diqqat bilan ko'zdan kechirmoq", definition: 'To scan something is to look at it very carefully.', example: 'You must scan each person closely.', partOfSpeech: 'verb' },
  { id: 'l30w19', word: 'section', translation: "qism, bo'lim", definition: 'A section is a part of something larger.', example: 'The green section of the graph is the most important part.', partOfSpeech: 'noun' },
  { id: 'l30w20', word: 'surface', translation: 'sirt', definition: 'The surface of something is the top part or outside of it.', example: 'The surface of the moon is very rough.', partOfSpeech: 'noun' },
];

const lesson30Grammar = {
  questions: [
    { id: 1, text: 'Choose the correct word order:', options: ['The picture hangs above the fireplace.', 'The picture above hangs the fireplace.', 'Above the picture hangs the fireplace.', 'The picture hangs the fireplace above.'], correct: 0, explanation: 'Subject + Verb + Place is the normal order.' },
    { id: 2, text: 'Look ___ before you cross the street.', options: ['ahead', 'ahead of', 'above', 'across'], correct: 0, explanation: '"Ahead" alone means "forward, in the direction you are going".' },
    { id: 3, text: 'What ___ of sugar do we need?', options: ['amount', 'amounts', 'amounted', 'amounting'], correct: 0, explanation: '"What amount of" is the normal singular phrase to ask about a quantity.' },
    { id: 4, text: 'Choose the correct word order:', options: ['Her belief in hard work never changed.', 'Her belief never changed in hard work.', 'In hard work her belief never changed.', 'Never changed her belief in hard work.'], correct: 0, explanation: 'Subject + Verb + Time is the normal order: Her belief in hard work (S) never changed (V).' },
    { id: 5, text: 'The fountain is in the ___ of the park.', options: ['center', 'centers', 'centered', 'centering'], correct: 0, explanation: '"The center" — singular noun after "the".' },
    { id: 6, text: 'It is ___ to feel nervous before a test.', options: ['common', 'commonly', 'commons', 'commoner'], correct: 0, explanation: '"Common" is the adjective form used after "is".' },
    { id: 7, text: 'How much ___ this jacket cost?', options: ['do', 'does', 'is', 'are'], correct: 1, explanation: '"This jacket" is singular, so use "does" + base verb.' },
    { id: 8, text: 'The teacher will ___ how to solve the equation.', options: ['demonstrate', 'demonstrates', 'demonstrated', 'demonstrating'], correct: 0, explanation: 'After "will", use the base form of the verb.' },
    { id: 9, text: 'Choose the correct word order:', options: ['My sister has a different opinion.', 'My sister has an opinion different.', 'Different my sister has an opinion.', 'My sister different has an opinion.'], correct: 0, explanation: 'Adjectives like "different" go before the noun they describe.' },
    { id: 10, text: 'There ___ no evidence to support his claim.', options: ['is', 'are', 'was', 'were'], correct: 0, explanation: '"Evidence" is uncountable, so it takes a singular verb: is.' },
    { id: 11, text: 'Choose the correct word order:', options: ['Honesty is the best policy.', 'Is honesty the best policy.', 'The best policy honesty is.', 'Honesty the best policy is.'], correct: 0, explanation: 'Subject + Verb + Complement is the normal order.' },
    { id: 12, text: 'This ___ means something completely different from its words.', options: ['idiom', 'idioms', 'idiomatic', 'idiomize'], correct: 0, explanation: '"This idiom" — singular noun after "this".' },
    { id: 13, text: 'She wants to be financially ___.', options: ['independent', 'independence', 'independently', 'independents'], correct: 0, explanation: '"Independent" is the adjective form used after "be".' },
    { id: 14, text: 'Choose the correct word order:', options: ['The keys are inside the drawer.', 'The keys inside are the drawer.', 'The keys the drawer are inside.', 'The keys are the drawer inside.'], correct: 0, explanation: 'Subject + Verb + Place is the normal order.' },
    { id: 15, text: 'He is a true ___ of chess.', options: ['master', 'masters', 'mastered', 'mastering'], correct: 0, explanation: '"A true master" — singular noun after the article "a".' },
    { id: 16, text: 'I still have a clear ___ of that day.', options: ['memory', 'memories', 'remembering', 'memorize'], correct: 0, explanation: '"A clear memory" — singular noun after the article "a".' },
    { id: 17, text: 'Choose the correct word order:', options: ['You need the proper tools for this job.', 'You need tools the proper for this job.', 'The proper you need tools for this job.', 'You need for this job the proper tools.'], correct: 0, explanation: 'Adjectives like "proper" go before the noun they describe.' },
    { id: 18, text: 'Please ___ your ticket at the gate.', options: ['scan', 'scans', 'scanned', 'scanning'], correct: 0, explanation: 'In an imperative sentence, use the base form of the verb.' },
    { id: 19, text: 'This ___ of the store sells shoes.', options: ['section', 'sections', 'sectioned', 'sectioning'], correct: 0, explanation: '"This section" — singular noun after "this".' },
    { id: 20, text: 'Choose the correct word order:', options: ['The surface of the lake was calm.', 'The surface calm was of the lake.', 'Calm the surface of the lake was.', 'The lake surface was of the calm.'], correct: 0, explanation: 'Subject + Verb + Complement is the normal order.' },
  ],
};

const lesson30Reading = {
  title: 'Cats and Secrets',
  pages: [
    [
      { type: 'heading', text: 'Cats and Secrets' },
      { type: 'p', text: 'In English, there is a common idiom "let the cat out of the bag." It means to tell a secret. But where did this idiom start?' },
      { type: 'p', text: 'It came from a section of England. Long ago, people there went from town to town to sell things like vegetables, clothes, and pigs. They had strong beliefs about honesty. They didn\'t like lying. One day, a man went to the section\'s center to sell things.' },
    ],
    [
      { type: 'p', text: '"I have a baby pig for sale! It won\'t cost much," he said. He held the animal above his head. His style was different from honest people\'s style. He was a master of tricking people and lying.' },
      { type: 'p', text: 'A woman named Beth scanned his pig. He offered her the pig for one gold coin. That was a very small amount. Beth gave him the coin. He put it in his pocket. He walked ahead of Beth to get the pig.' },
      { type: 'p', text: 'He gave her a closed bag and said, "Here\'s your pig." He then left very quickly.' },
    ],
    [
      { type: 'p', text: 'Beth looked at the bag\'s surface. It was moving. She opened it to let the pig out. A cat was inside! "He tricked me! That isn\'t proper," she said.' },
      { type: 'p', text: 'Later, the man returned to trick more people. Beth saw him and the memory of the cat came back. She told her friends. They stopped him. But no one knew what to do next.' },
      { type: 'p', text: 'Someone said, "We need an independent and fair person to decide that." They went to the judge. Beth told him about the cat in the bag.' },
    ],
    [
      { type: 'p', text: 'The judge asked, "Is there evidence? Can you demonstrate how he did it?"' },
      { type: 'p', text: '"Look in his bag," said Beth. She opened it and let a cat out of the bag. They learned the man\'s secret, and he went to jail.' },
      { type: 'p', text: 'That\'s how the idiom "let the cat out of the bag" came to mean to tell a secret.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is the main idea of this story?', options: ['It is about a common belief about cats.', 'People should scan evidence carefully.', 'Masters of lying will go to jail.', 'It is about the origin of an idiom.'], correct: 3 },
    { id: 2, text: 'What did Beth say after she was tricked?', options: ["That's not proper.", "That's a very small amount.", 'Can you demonstrate how he did it?', 'We need an independent and fair person to help.'], correct: 0 },
    { id: 3, text: 'Where did the man hold the pig?', options: ['In a pocket', 'On the surface of the bag', 'Above his head', "In the section's center"], correct: 2 },
    { id: 4, text: 'Why did Beth look at the bag?', options: ['The surface was moving.', 'The man had a different style.', 'The man was ahead of her.', 'He offered the pig for so little money.'], correct: 0 },
    { id: 5, text: 'When did the memory of the cat come back to Beth?', options: ['When the man returned to trick more people', 'When she talked to the judge', 'When she opened the bag the first time', 'When she paid the gold coin'], correct: 0 },
  ],
};

const lesson30Listening = {
  title: 'The Missing Wallet',
  script: "There's a common idiom that says, \"honesty is the best policy,\" and Noor believed it completely. She was an independent thinker who always tried to do the proper thing.\n\nOne day, walking through the center of the market, she saw a wallet lying on the surface of a bench. Inside was a large amount of money. Her first memory was of her grandfather, who used to say that a small act of honesty could matter more than any cost.\n\nShe looked around and noticed a sign above a nearby shop: \"Lost and Found - Section B.\" She decided to bring the wallet there instead of walking ahead and forgetting about it.\n\nThe shop owner, a kind old man, said he was something of a master at solving mysteries like this. He asked Noor to demonstrate exactly where she found it, and he began to scan through his notebook for any evidence of who it might belong to.\n\nIt turned out the wallet belonged to a different customer who had been searching everywhere, worried. He thanked Noor and offered her a reward, but she said, \"No, thank you - that's not something I need.\" Her honesty was its own reward, and everyone at the market never forgot her kindness.",
  questions: [
    { id: 1, text: 'What idiom does Noor believe in?', options: ['"Honesty is the best policy"', '"Let the cat out of the bag"', '"The early bird catches the worm"', '"Actions speak louder than words"'], correct: 0 },
    { id: 2, text: 'Where did Noor find the wallet?', options: ['On the surface of a bench in the center of the market', 'Inside a shop above the market', 'On the ground near her house', "Inside her grandfather's memory box"], correct: 0 },
    { id: 3, text: 'What did the sign above the shop say?', options: ['"Lost and Found - Section B"', '"Honesty Pays"', '"No Entry"', '"Independent Shop"'], correct: 0 },
    { id: 4, text: 'What did the shop owner ask Noor to do?', options: ['Demonstrate exactly where she found the wallet', 'Pay for the lost wallet', 'Scan her own belongings', 'Leave the wallet outside'], correct: 0 },
    { id: 5, text: 'What did Noor say when offered a reward?', options: ["She said she didn't need it", 'She asked for a bigger reward', 'She asked to keep the wallet', 'She said the amount was too small'], correct: 0 },
  ],
};

export const lessons27to30 = [
  {
    id: 'essential-lesson-27',
    title: 'Lesson 27',
    words: lesson27Words,
    grammar: lesson27Grammar,
    reading: lesson27Reading,
    listening: lesson27Listening,
  },
  {
    id: 'essential-lesson-28',
    title: 'Lesson 28',
    words: lesson28Words,
    grammar: lesson28Grammar,
    reading: lesson28Reading,
    listening: lesson28Listening,
  },
  {
    id: 'essential-lesson-29',
    title: 'Lesson 29',
    words: lesson29Words,
    grammar: lesson29Grammar,
    reading: lesson29Reading,
    listening: lesson29Listening,
  },
  {
    id: 'essential-lesson-30',
    title: 'Lesson 30',
    words: lesson30Words,
    grammar: lesson30Grammar,
    reading: lesson30Reading,
    listening: lesson30Listening,
  },
];
