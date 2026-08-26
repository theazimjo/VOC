// Lessons 22-26 for "Essential 3000", sourced from Units 22-26 of "4000
// Essential English Words 1" by Paul Nation (Compass Publishing) via
// pdftotext extraction of src/assets/data/essential english 1.pdf. Words,
// their sentence definitions, example sentences, and each unit's reading
// story + comprehension questions are transcribed from the book (each
// story's final comprehension question lost its answer options to a
// layout/OCR gap in the source PDF - and Unit 23's story lost its final
// sentence the same way - so those are original, written to fit the story).
// Uzbek translations are original (the book is English-only). The
// listening dialogues are original narration written to reuse each unit's
// 20 target words, since the book itself has no audio/listening component.
// The grammar-stage exercises are original, each of the 20 target words
// used in exactly one question.

const lesson22Words = [
  { id: 'l22w1', word: 'actual', translation: 'haqiqiy', definition: 'Actual means that something is real or true.', example: 'This is the actual sword that the King owned, not a fake one.', partOfSpeech: 'adjective' },
  { id: 'l22w2', word: 'amaze', translation: 'hayratda qoldirmoq', definition: 'To amaze someone is to surprise them very much.', example: 'The news in the paper amazed Jack.', partOfSpeech: 'verb' },
  { id: 'l22w3', word: 'charge', translation: "narx, to'lov", definition: 'A charge is the price to pay for something.', example: 'The charge for the shirts was $15.00.', partOfSpeech: 'noun' },
  { id: 'l22w4', word: 'comfort', translation: 'tasalli bermoq', definition: 'To comfort someone means to make them feel better.', example: 'I wanted to comfort my friend after I heard the bad news.', partOfSpeech: 'verb' },
  { id: 'l22w5', word: 'contact', translation: "bog'lanmoq", definition: 'To contact someone is to speak or write to them.', example: 'I contacted Sue about my party.', partOfSpeech: 'verb' },
  { id: 'l22w6', word: 'customer', translation: 'mijoz', definition: 'A customer is a person who buys something at a store.', example: 'The customer put a few items in a bag.', partOfSpeech: 'noun' },
  { id: 'l22w7', word: 'deliver', translation: 'yetkazib bermoq', definition: 'To deliver something is to take it from one place to another.', example: 'The man delivered Chinese food to my house.', partOfSpeech: 'verb' },
  { id: 'l22w8', word: 'earn', translation: 'ishlab topmoq', definition: 'To earn means to get money for the work you do.', example: 'He earns his living as a chef in a great restaurant.', partOfSpeech: 'verb' },
  { id: 'l22w9', word: 'gate', translation: 'darvoza', definition: 'A gate is a type of door. Gates are usually made of metal or wood.', example: 'We want to put up a wooden gate around our house.', partOfSpeech: 'noun' },
  { id: 'l22w10', word: 'include', translation: "o'z ichiga olmoq", definition: 'To include something means to have it as part of a group.', example: 'Does this meal include a soft drink?', partOfSpeech: 'verb' },
  { id: 'l22w11', word: 'manage', translation: 'boshqarmoq', definition: 'To manage something means to control or be in charge of it.', example: 'I had to manage the meeting myself.', partOfSpeech: 'verb' },
  { id: 'l22w12', word: 'mystery', translation: 'sir, jumboq', definition: 'A mystery is something that is difficult to understand or explain.', example: 'The path on the map was a complete mystery to me.', partOfSpeech: 'noun' },
  { id: 'l22w13', word: 'occur', translation: "sodir bo'lmoq", definition: 'To occur means to happen.', example: 'When did the thunderstorm occur?', partOfSpeech: 'verb' },
  { id: 'l22w14', word: 'opposite', translation: 'qarama-qarshi, teskarisi', definition: 'If A is the opposite of B, A is completely different from B.', example: 'The opposite of black is white.', partOfSpeech: 'noun' },
  { id: 'l22w15', word: 'plate', translation: 'likopcha', definition: 'A plate is a flat round thing that you put food on.', example: 'I put my plate down so I could put some food on it.', partOfSpeech: 'noun' },
  { id: 'l22w16', word: 'receive', translation: 'olmoq, qabul qilmoq', definition: 'To receive something is to get it.', example: 'I received a present on my birthday.', partOfSpeech: 'verb' },
  { id: 'l22w17', word: 'reward', translation: 'mukofot', definition: 'A reward is something given in exchange for good behavior or work.', example: 'He was given a reward for his excellent performance.', partOfSpeech: 'noun' },
  { id: 'l22w18', word: 'set', translation: "qo'ymoq", definition: 'To set something is to put it somewhere.', example: 'Please set the dice down on the table.', partOfSpeech: 'verb' },
  { id: 'l22w19', word: 'steal', translation: "o'g'irlamoq", definition: 'To steal is to take something that is not yours.', example: 'The men tried to steal money from the bank.', partOfSpeech: 'verb' },
  { id: 'l22w20', word: 'thief', translation: "o'g'ri", definition: 'A thief is someone who quietly takes things that do not belong to them.', example: "A thief broke into our home and took my mother's jewelry.", partOfSpeech: 'noun' },
];

const lesson22Grammar = {
  questions: [
    { id: 1, text: 'This is the ___ house from the photo, not a copy of it.', options: ['actual', 'actually', 'act', 'acted'], correct: 0, explanation: '"Actual" (adjective) describes the noun "house": the real one.' },
    { id: 2, text: 'Choose the correct word order:', options: ['The magic trick amazed the children.', 'The magic trick the children amazed.', 'Amazed the magic trick the children.', 'The children the magic trick amazed.'], correct: 0, explanation: 'Subject + Verb + Object: The trick (S) amazed (V) the children (O).' },
    { id: 3, text: 'What ___ the charge for one ticket?', options: ['is', 'are', 'do', 'does'], correct: 0, explanation: '"The charge" is singular, so use "is".' },
    { id: 4, text: 'Choose the correct word order:', options: ['She tried to comfort her crying sister.', 'She tried her crying sister to comfort.', 'Comfort she tried her crying sister.', 'Her crying sister she tried to comfort.'], correct: 0, explanation: 'Subject + Verb + Object (infinitive phrase): She (S) tried (V) to comfort her sister (O).' },
    { id: 5, text: 'She ___ not contact us before the meeting.', options: ['do', 'does', 'is', 'are'], correct: 1, explanation: '"She" takes "does not" + base verb: does not contact.' },
    { id: 6, text: 'Choose the correct word order:', options: ['The customer waited at the counter.', 'The customer at the counter waited.', 'Waited the customer at the counter.', 'At the counter the customer waited the.'], correct: 0, explanation: 'Subject + Verb + Place phrase is the normal order.' },
    { id: 7, text: 'The company ___ packages every day.', options: ['deliver', 'delivers', 'are deliver', 'delivering'], correct: 1, explanation: '"The company" is singular, so add -s: delivers.' },
    { id: 8, text: 'Choose the correct question:', options: ['Does he earn a good salary?', 'Do he earn a good salary?', 'Is he earn a good salary?', 'Does he earns a good salary?'], correct: 0, explanation: '"He" is singular, so "Does he" + base verb: Does he earn...?' },
    { id: 9, text: 'Choose the correct word order:', options: ['The dog waited by the gate.', 'The dog by the gate waited.', 'By the gate the dog waited.', 'Waited the dog by the gate.'], correct: 0, explanation: 'Subject + Verb + Place phrase (by the gate) is the normal order.' },
    { id: 10, text: 'This price ___ tax and delivery.', options: ['include', 'includes', 'is including', 'included'], correct: 1, explanation: '"This price" is singular, so add -s: includes.' },
    { id: 11, text: 'Who ___ this project?', options: ['manage', 'manages', 'do manage', 'is manages'], correct: 1, explanation: 'A singular subject question about a habitual role uses the -s form: manages.' },
    { id: 12, text: 'Choose the correct word order:', options: ['The old letter was a real mystery.', 'The old letter a real mystery was.', 'A real mystery the old letter was.', 'Was the old letter a real mystery.'], correct: 0, explanation: 'Subject + Verb (was) + Complement is the normal order.' },
    { id: 13, text: 'Accidents sometimes ___ on this road.', options: ['occur', 'occurs', 'is occur', 'occurring'], correct: 0, explanation: '"Accidents" is plural, so no -s: occur.' },
    { id: 14, text: 'Choose the correct word order:', options: ['Hot is the opposite of cold.', 'Is hot the opposite of cold.', 'Opposite hot is of cold the.', 'The cold opposite hot is of.'], correct: 0, explanation: 'Subject + Verb + Complement: Hot (S) is (V) the opposite of cold (C).' },
    { id: 15, text: 'Choose the correct word order:', options: ['She put the plate on the table.', 'She the plate put on the table.', 'On the table she put the plate the.', 'Put she the plate on the table.'], correct: 0, explanation: 'Subject + Verb + Object + Place is the normal order.' },
    { id: 16, text: 'Choose the correct question:', options: ['Did you receive my letter?', 'Do you received my letter?', 'Did you received my letter?', 'Have you receive my letter?'], correct: 0, explanation: 'Past simple question: Did + subject + base verb: Did you receive...?' },
    { id: 17, text: 'Choose the correct word order:', options: ['She got a reward for her honesty.', 'She a reward got for her honesty.', 'For her honesty a reward she got.', 'Got she a reward for her honesty.'], correct: 0, explanation: 'Subject + Verb + Object + Reason phrase is the normal order.' },
    { id: 18, text: 'Please ___ your bag down here.', options: ['set', 'sets', 'setting', 'is set'], correct: 0, explanation: 'An imperative sentence uses the base verb: set.' },
    { id: 19, text: 'Someone ___ my bicycle last night.', options: ['steal', 'steals', 'stole', 'stealing'], correct: 2, explanation: '"Last night" signals past simple: stole.' },
    { id: 20, text: 'The ___ ran away before the police arrived.', options: ['thief', 'thieve', 'thieving', 'theft'], correct: 0, explanation: '"Thief" is the noun for a person who steals.' },
  ],
};

const lesson22Reading = {
  title: 'A Better Reward',
  pages: [
    [
      { type: 'heading', text: 'A Better Reward' },
      { type: 'p', text: 'Jenny delivered food for a restaurant. She read the newspaper and said, "Uh oh." There was a story about a thief. He stole food, and no one had seen him. Even the police couldn\'t catch him. Jenny was a little scared. She worked close to that area.' },
      { type: 'p', text: 'The newspaper included a message from the police: "If anything strange occurs, call us. If you help us catch the thief, you\'ll earn a reward."' },
    ],
    [
      { type: 'p', text: 'Jenny talked to Jim. He managed the restaurant. "Do you know about the thief?"' },
      { type: 'p', text: '"Yes," he said. "But he steals more than one person can eat. And why haven\'t the police stopped him yet? It\'s a mystery. If you see him, contact the police. Don\'t run after him."' },
      { type: 'p', text: 'Jenny drove to a customer\'s house. She left her car and opened the gate to the house. But then she heard a noise by her car. She yelled, "Thief!" She wasn\'t scared. She wanted the reward! She did the opposite of what Jim told her to do.' },
    ],
    [
      { type: 'p', text: '"Hey," she yelled. "Get back here!" She set the food on the ground and ran to her car.' },
      { type: 'p', text: 'But the thief had already left with the food. Jenny followed a noise around the corner. She was amazed. She saw a dog and some puppies. They were eating her food! They looked thin and scared. "The actual thief is just a dog. She\'s feeding her puppies," she said. "That\'s why she steals so much food."' },
    ],
    [
      { type: 'p', text: 'Jenny felt bad. She tried to comfort the dogs with another plate of food. Then she took them back to the store. Everyone there took a puppy home. Jenny called the police. She told them there was no real thief.' },
      { type: 'p', text: 'Jenny didn\'t do it to receive the reward anymore. She said, "It was just a dog. But there\'s no charge for catching this \'thief.\'" she said. "My new dog is a better reward."' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['A dog that steals a plate', 'A man who tells a mystery', 'A man who writes for a newspaper', 'A girl who delivers food'], correct: 0 },
    { id: 2, text: 'Why did Jenny decide to run after the thief?', options: ['She wanted to earn the reward.', 'She knew that there was no actual thief.', 'She always did the opposite of what Jim said.', 'She wanted to charge a customer for that food.'], correct: 0 },
    { id: 3, text: 'What was true of Jim?', options: ['He tried to comfort Jenny with food.', 'He told Jenny that she should contact the police.', 'He wrote a story that included a message from the police.', 'He received a reward because he managed the store.'], correct: 1 },
    { id: 4, text: 'How did Jenny act when she heard the noise?', options: ['She was amazed by the noise.', 'She followed it around the corner.', 'She ran through the gate to get away from it.', 'She set the food on a table and ran to her car.'], correct: 1 },
    { id: 5, text: 'What did the police say to do if something strange occurred?', options: ['Call the police', 'Set a trap for the thief', 'Talk to the customer', 'Contact the newspaper'], correct: 0 },
  ],
};

const lesson22Listening = {
  title: 'The Missing Bicycle',
  script: "Mark's bicycle disappeared from the gate outside his house. He was amazed - it was there just a moment ago. He decided to contact the police, but first he wanted to manage the mystery himself. He knew the actual thief had to be close by.\n\nHe walked along the street and saw a customer at the corner store. \"Did you see a thief steal a bicycle?\" Mark asked. The man said, \"No, but I saw a boy set a bike behind that shop. He looked scared.\" Mark went to the opposite side of the street and found his bicycle.\n\nA young boy was sitting beside it, holding an empty plate. \"I'm sorry,\" the boy said. \"I only wanted to deliver bread to my family. I didn't earn enough money this week.\" Mark felt he had to comfort the boy instead of being angry. He said, \"I won't charge you for this. But next time, ask for help.\" The boy was so happy that he offered Mark a reward - his last piece of bread. Mark didn't receive it, but he smiled anyway. Word of Mark's kindness spread, and everyone in town knew a good story could include a happy ending, even one that started with a mystery.",
  questions: [
    { id: 1, text: "Where did Mark's bicycle disappear from?", options: ['The gate outside his house', 'The corner store', 'The opposite side of the street', "The boy's family home"], correct: 0 },
    { id: 2, text: 'Who did Mark ask for help first?', options: ['The police', 'A customer at the corner store', 'A young boy', 'His family'], correct: 1 },
    { id: 3, text: 'Why did the boy take the bicycle?', options: ['He wanted to sell it', "He wanted to deliver bread to his family", 'He wanted to earn a reward', 'He wanted to amaze his friends'], correct: 1 },
    { id: 4, text: 'What did Mark decide to do about the charge?', options: ['He charged the boy full price', "He didn't charge the boy at all", 'He asked the police to charge him', 'He asked for a bigger reward'], correct: 1 },
    { id: 5, text: 'What reward did the boy offer Mark?', options: ['Money', 'A new bicycle', 'His last piece of bread', 'A plate'], correct: 2 },
  ],
};

const lesson23Words = [
  { id: 'l23w1', word: 'advance', translation: 'oldinga siljimoq', definition: 'To advance is to go forward.', example: 'He advanced up the ladder slowly.', partOfSpeech: 'verb' },
  { id: 'l23w2', word: 'athlete', translation: 'sportchi', definition: 'An athlete is a person who plays sports.', example: 'Some athletes can play many sports very well.', partOfSpeech: 'noun' },
  { id: 'l23w3', word: 'average', translation: "o'rtacha", definition: "If something is average, it is at a normal level.", example: "I'm not rich or poor; I'm average.", partOfSpeech: 'adjective' },
  { id: 'l23w4', word: 'behavior', translation: 'xulq-atvor', definition: 'Your behavior is the way you act.', example: "Their behavior was good this semester. They didn't cause trouble.", partOfSpeech: 'noun' },
  { id: 'l23w5', word: 'behind', translation: 'orqasida', definition: 'Behind means to be at the back of something.', example: 'The little girl was hiding behind a tree.', partOfSpeech: 'preposition' },
  { id: 'l23w6', word: 'course', translation: 'kurs, dars', definition: 'A course is a class in school.', example: 'I took a P.E. course in school this year.', partOfSpeech: 'noun' },
  { id: 'l23w7', word: 'lower', translation: 'pastga tushirmoq', definition: 'To lower something is to make it go down.', example: 'The chart shows how his production has lowered over the year.', partOfSpeech: 'verb' },
  { id: 'l23w8', word: 'match', translation: 'mos kelmoq', definition: 'To match is to be the same or similar.', example: 'The two shoes matched. They looked the same.', partOfSpeech: 'verb' },
  { id: 'l23w9', word: 'member', translation: "a'zo", definition: 'A member is a person who is part of a group.', example: 'Julie is the newest member of our team.', partOfSpeech: 'noun' },
  { id: 'l23w10', word: 'mental', translation: 'aqliy', definition: 'If something is mental, it has to do with your mind.', example: 'I made a mental picture of the room.', partOfSpeech: 'adjective' },
  { id: 'l23w11', word: 'passenger', translation: 'yo\'lovchi', definition: 'A passenger is a person who rides in a car, train, or airplane.', example: 'One passenger was standing in the subway train.', partOfSpeech: 'noun' },
  { id: 'l23w12', word: 'personality', translation: 'shaxsiyat', definition: 'Your personality is what you are like and how you behave.', example: 'John has a bad personality.', partOfSpeech: 'noun' },
  { id: 'l23w13', word: 'poem', translation: "she'r", definition: 'A poem is a short kind of writing.', example: 'William Shakespeare wrote many poems.', partOfSpeech: 'noun' },
  { id: 'l23w14', word: 'pole', translation: 'ustun', definition: 'A pole is a long thin stick made of wood or metal that supports things.', example: 'The flag was hanging from the flag pole.', partOfSpeech: 'noun' },
  { id: 'l23w15', word: 'remove', translation: 'olib tashlamoq', definition: 'To remove something is to take it away.', example: 'I removed the nail from the board.', partOfSpeech: 'verb' },
  { id: 'l23w16', word: 'safety', translation: 'xavfsizlik', definition: 'Safety means the condition of being safe and free from danger.', example: 'For his own safety, he was placed in a car seat.', partOfSpeech: 'noun' },
  { id: 'l23w17', word: 'shoot', translation: 'otmoq', definition: 'To shoot is to fire something like a bullet at someone or something.', example: 'The hunter raised his gun to shoot at the target.', partOfSpeech: 'verb' },
  { id: 'l23w18', word: 'sound', translation: 'tovush chiqarmoq', definition: 'To sound means to make a noise.', example: 'The alarm clock sounded and woke us all up.', partOfSpeech: 'verb' },
  { id: 'l23w19', word: 'swim', translation: 'suzmoq', definition: 'To swim is to move through water.', example: 'I love to swim in the ocean.', partOfSpeech: 'verb' },
  { id: 'l23w20', word: 'web', translation: "o'rgimchak to'ri", definition: 'A web is a home made by a spider.', example: 'Mom cleaned the spider webs out of the garage.', partOfSpeech: 'noun' },
];

const lesson23Grammar = {
  questions: [
    { id: 1, text: 'Choose the correct word order:', options: ['The soldiers advanced toward the hill.', 'The soldiers toward the hill advanced.', 'Advanced the soldiers toward the hill.', 'Toward the hill the soldiers advanced the.'], correct: 0, explanation: 'Subject + Verb + Direction phrase is the normal order.' },
    { id: 2, text: 'The ___ trains every morning at the stadium.', options: ['athlete', 'athletes', 'athletic', 'athletically'], correct: 0, explanation: '"The" + singular noun matches "trains" (verb with -s).' },
    { id: 3, text: 'Choose the correct word order:', options: ['My score was an average result.', 'My score an average result was.', 'Was my score an average result.', 'An average result my score was.'], correct: 0, explanation: 'Subject + Verb (was) + Complement is the normal order.' },
    { id: 4, text: 'His ___ in class has been excellent this year.', options: ['behave', 'behaves', 'behavior', 'behaved'], correct: 2, explanation: 'A noun (behavior) is needed after the possessive "his" and before "in class".' },
    { id: 5, text: 'Choose the correct word order:', options: ['The cat hid behind the sofa.', 'The cat behind the sofa hid.', 'Hid the cat behind the sofa.', 'Behind the sofa hid the cat the.'], correct: 0, explanation: 'Subject + Verb + Place phrase (behind the sofa) is the normal order.' },
    { id: 6, text: 'She ___ not finished the course yet.', options: ['do', 'does', 'has', 'have'], correct: 2, explanation: '"She" (singular) uses "has not" + past participle: has not finished.' },
    { id: 7, text: 'Please ___ your voice; the baby is sleeping.', options: ['lower', 'lowers', 'lowering', 'is lower'], correct: 0, explanation: 'An imperative sentence uses the base verb: lower.' },
    { id: 8, text: 'These socks ___ perfectly with your shirt.', options: ['match', 'matches', 'is match', 'matching'], correct: 0, explanation: '"These socks" is plural, so no -s: match.' },
    { id: 9, text: 'Choose the correct word order:', options: ['She became a member of the club.', 'She a member of the club became.', 'A member of the club she became.', 'Became she a member of the club.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 10, text: 'Choose the correct word order:', options: ['Chess is a mental challenge.', 'Chess a mental challenge is.', 'Is chess a mental challenge.', 'A mental challenge chess is.'], correct: 0, explanation: 'Subject + Verb (is) + Complement is the normal order.' },
    { id: 11, text: 'How many ___ were on the bus?', options: ['passenger', 'passengers', 'passengering', 'passenged'], correct: 1, explanation: '"How many" is followed by a plural countable noun: passengers.' },
    { id: 12, text: 'Choose the correct word order:', options: ['She has a cheerful personality.', 'She a cheerful personality has.', 'A cheerful personality she has.', 'Has she a cheerful personality.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 13, text: 'The students ___ a poem for homework.', options: ['write', 'writes', 'is write', 'writing'], correct: 0, explanation: '"The students" is plural, so no -s: write.' },
    { id: 14, text: 'Choose the correct word order:', options: ['A flag hung from the pole.', 'A flag from the pole hung.', 'Hung a flag from the pole.', 'From the pole a flag hung the.'], correct: 0, explanation: 'Subject + Verb + Place phrase is the normal order.' },
    { id: 15, text: 'Choose the correct question:', options: ['Did they remove the old sign?', 'Do they removed the old sign?', 'Did they removed the old sign?', 'Have they remove the old sign?'], correct: 0, explanation: 'Past simple question: Did + subject + base verb: Did they remove...?' },
    { id: 16, text: 'Choose the correct word order:', options: ['Safety is important on a bike.', 'Is important safety on a bike.', 'On a bike safety important is.', 'Important safety is on a bike.'], correct: 0, explanation: 'Subject + Verb + Complement is the normal order.' },
    { id: 17, text: 'The hunter ___ at the target yesterday.', options: ['shoot', 'shoots', 'shot', 'shooting'], correct: 2, explanation: '"Yesterday" signals past simple: shot.' },
    { id: 18, text: 'The alarm ___ loudly every morning at six.', options: ['sound', 'sounds', 'is sound', 'sounding'], correct: 1, explanation: '"The alarm" is singular, so add -s: sounds.' },
    { id: 19, text: 'Choose the correct word order:', options: ['We swim in the lake every summer.', 'We in the lake swim every summer.', 'Swim we in the lake every summer.', 'Every summer we the lake in swim.'], correct: 0, explanation: 'Subject + Verb + Place + Time is the normal order.' },
    { id: 20, text: 'A spider spun a ___ in the corner.', options: ['web', 'webs', 'webbed', 'webbing'], correct: 0, explanation: '"A" is followed by a singular noun: web.' },
  ],
};

const lesson23Reading = {
  title: 'The Camp',
  pages: [
    [
      { type: 'heading', text: 'The Camp' },
      { type: 'p', text: 'Stacie wanted to stay at a nice hotel for vacation. But her parents sent her to a terrible camp instead. For breakfast, Stacie liked fresh juice and chocolate milk, but she got water at the camp. In the afternoon she wanted to write poems, but she had to swim. The camp was near an airport with loud planes. Spiderwebs hung over her bed. To her, the kids\' average behavior was very bad. No girl matched her personality. She hated it.' },
    ],
    [
      { type: 'p', text: 'One day, they had a class. Mental exercise sounded good to Stacie. But it was a course on water safety. They learned how to be safe passengers on a boat. Stacie didn\'t ever plan to go on a boat.' },
      { type: 'p', text: 'The next day, they played a game. There were a red team and a blue team. Stacie was on the blue team. Each team had to try to remove the other team\'s flag from a pole. They also had to use water guns. "I\'m not much of an athlete," she said. But she still had to play.' },
    ],
    [
      { type: 'p', text: 'Stacie took a water gun and looked for somewhere to hide. A boy said, "Stacie, you advance to the middle. I will go right. Those two will go left."' },
      { type: 'p', text: 'Stacie still didn\'t want to play. She walked into the forest and saw a red team player coming. Stacie hid behind a tree and then jumped out and shot the other player. "This is fun!" Stacie thought.' },
    ],
    [
      { type: 'p', text: 'Several minutes after advancing further, Stacie saw the red flag. A red team member was watching over it. She shot him with her water gun. Then she lowered the flag and ran back to her team. "I got it!" she yelled. The blue team won! Stacie was the hero.' },
      { type: 'p', text: 'For the rest of the week, Stacie had fun. She even asked her parents if she could come back to camp again next summer.' },
    ],
  ],
  questions: [
    { id: 1, text: 'How did Stacie win the game?', options: ['She advanced to the right.', "She lowered the red team's flag.", 'She hit the red team with her water gun.', 'She swam all afternoon.'], correct: 1 },
    { id: 2, text: 'Because of her personality, what would Stacie likely NOT want to do?', options: ['Read a poem', 'Play a mental game', 'Become an athlete', 'Stay at a nice hotel'], correct: 2 },
    { id: 3, text: 'Instead of camp, where did Stacie want to be?', options: ['At a fancy hotel', 'At the airport', 'On a boat as a passenger', 'With an average student'], correct: 0 },
    { id: 4, text: 'What did Stacie start to like about the camp?', options: ["The other kids' behavior", 'Having chocolate milk', 'Spider webs over her bed', 'Beating the red team'], correct: 3 },
    { id: 5, text: "What was Stacie's course about?", options: ['Water safety', 'Writing poems', 'Fixing spider webs', 'Football training'], correct: 0 },
  ],
};

const lesson23Listening = {
  title: 'Tryouts for the Team',
  script: "Dan wanted to become a member of the swim team. He wasn't a natural athlete, but his average speed had improved over the course of the summer. His coach said his behavior in practice - always on time, never complaining - mattered as much as his personality in the water.\n\nOn the day of tryouts, Dan felt mental pressure. Passengers on the bus to the pool could probably hear his heart pounding. He tried to lower his nerves by writing a short poem about the water in his notebook. Behind him, another swimmer practiced holding a pole to warm up.\n\nWhen the whistle sounded, Dan dove in and began to swim as fast as he could. He didn't shoot ahead right away - he kept an even pace and slowly began to advance past the swimmer beside him. He remembered his coach's advice about safety: never remove your focus from your breathing. Near the wall, Dan noticed a small web of cracks in the tile, but he didn't let it distract him. He finished second, just behind the fastest swimmer on the team. The coach smiled - Dan had made the team.",
  questions: [
    { id: 1, text: 'What did Dan want to become?', options: ['A coach', 'A member of the swim team', 'A poet', 'A bus driver'], correct: 1 },
    { id: 2, text: 'How did Dan try to calm his mental pressure before tryouts?', options: ['He talked to the passengers on the bus', 'He wrote a short poem', 'He held a pole', 'He watched the other swimmers'], correct: 1 },
    { id: 3, text: "What mattered as much as Dan's swimming to his coach?", options: ['His average speed', 'His behavior in practice', 'His personality', 'Both his behavior and personality'], correct: 3 },
    { id: 4, text: "What did Dan's coach's advice about safety remind him to do?", options: ['Swim faster than everyone', 'Never remove his focus from breathing', 'Avoid the cracked tile', 'Stay behind the other swimmers'], correct: 1 },
    { id: 5, text: 'How did the race end for Dan?', options: ['He won first place', 'He finished second, just behind the fastest swimmer', 'He did not finish the race', 'He shot ahead early and got tired'], correct: 1 },
  ],
};

const lesson24Words = [
  { id: 'l24w1', word: 'block', translation: "bo'lak", definition: 'A block is a solid piece of wood, stone or ice.', example: 'I saw a block of ice on the floor.', partOfSpeech: 'noun' },
  { id: 'l24w2', word: 'cheer', translation: 'qichqirib qollab-quvvatlamoq', definition: 'To cheer is to give a loud shout of approval or encouragement.', example: 'The crowd all cheered when the home team won.', partOfSpeech: 'verb' },
  { id: 'l24w3', word: 'complex', translation: 'murakkab', definition: 'If something is complex, it has many small parts. It is hard to understand.', example: 'A jigsaw puzzle can be complex because it has so many pieces.', partOfSpeech: 'adjective' },
  { id: 'l24w4', word: 'critic', translation: 'tanqidchi', definition: 'A critic is someone who gives their opinions about movies, books, plays, etc.', example: 'The wine critic tasted the wine so he could give his opinion.', partOfSpeech: 'noun' },
  { id: 'l24w5', word: 'event', translation: 'voqea, tadbir', definition: 'An event is something that happens, especially something important.', example: 'Finishing high school was a major event in his life.', partOfSpeech: 'noun' },
  { id: 'l24w6', word: 'exercise', translation: 'mashq qilmoq', definition: 'To exercise is to run or play sports so that you can be healthy.', example: 'You should exercise every day.', partOfSpeech: 'verb' },
  { id: 'l24w7', word: 'fit', translation: "sig'moq", definition: 'If something fits, it is small enough or the right size to go there.', example: 'The colorful eggs fit into the box.', partOfSpeech: 'verb' },
  { id: 'l24w8', word: 'friendship', translation: "do'stlik", definition: 'Friendship is the relationship between people who are friends.', example: 'Michael and Lisa have a very strong friendship with each other.', partOfSpeech: 'noun' },
  { id: 'l24w9', word: 'guide', translation: 'yo\'lboshchi', definition: 'A guide is someone who shows you where to go.', example: 'We followed a guide at the park.', partOfSpeech: 'noun' },
  { id: 'l24w10', word: 'lack', translation: 'yetishmovchilik', definition: 'If there is a lack of something, there is not enough of it.', example: 'His only problem is a lack of money.', partOfSpeech: 'noun' },
  { id: 'l24w11', word: 'passage', translation: "yo'lak", definition: 'A passage is a long area with walls that goes from one place to another.', example: 'The long passage led us to the other side of the field.', partOfSpeech: 'noun' },
  { id: 'l24w12', word: 'perform', translation: 'ijro etmoq', definition: 'To perform is to do something in front of people who watch.', example: 'He will perform a song for the class.', partOfSpeech: 'verb' },
  { id: 'l24w13', word: 'pressure', translation: 'bosim', definition: 'Pressure is what you apply to make someone do something.', example: 'They put pressure on him to change his mind.', partOfSpeech: 'noun' },
  { id: 'l24w14', word: 'probable', translation: 'ehtimoldagi', definition: 'If something is probable, it is likely to happen.', example: 'It is probable that you will get a good grade if you study for the test.', partOfSpeech: 'adjective' },
  { id: 'l24w15', word: 'public', translation: 'ommaviy', definition: 'If something is public, it is meant for everyone to use.', example: 'I went to the public park to play with my friends.', partOfSpeech: 'adjective' },
  { id: 'l24w16', word: 'strike', translation: 'urmoq', definition: 'To strike someone or something is to hit them.', example: 'She struck the other girl in the face.', partOfSpeech: 'verb' },
  { id: 'l24w17', word: 'support', translation: "qo'llab-quvvatlamoq", definition: 'To support something is to like it and help it be successful.', example: 'Everyone at work supports the new plan.', partOfSpeech: 'verb' },
  { id: 'l24w18', word: 'task', translation: 'vazifa', definition: 'A task is work that someone has to do.', example: 'Who has the task of building the brick wall?', partOfSpeech: 'noun' },
  { id: 'l24w19', word: 'term', translation: 'atama', definition: 'A term is a word for something.', example: 'I often use the term "oops" when I make a mistake.', partOfSpeech: 'noun' },
  { id: 'l24w20', word: 'unite', translation: 'birlashmoq', definition: 'To unite is to get together to do something.', example: 'If we unite, we can finish our project faster.', partOfSpeech: 'verb' },
];

const lesson24Grammar = {
  questions: [
    { id: 1, text: 'Choose the correct word order:', options: ['The artist carved a block of wood.', 'The artist a block of wood carved.', 'A block of wood the artist carved.', 'Carved the artist a block of wood.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 2, text: 'The fans ___ loudly when the team scored.', options: ['cheer', 'cheers', 'is cheer', 'cheering'], correct: 0, explanation: '"The fans" is plural, so no -s: cheer.' },
    { id: 3, text: 'Choose the correct word order:', options: ['This is a complex problem to solve.', 'This a complex problem is to solve.', 'A complex problem this is to solve.', 'Is this a complex problem to solve.'], correct: 0, explanation: 'Subject + Verb (is) + Complement is the normal order.' },
    { id: 4, text: 'The ___ gave the movie a bad review.', options: ['critic', 'critics', 'critical', 'criticize'], correct: 0, explanation: '"The" + singular noun matches "gave" (singular subject, past tense verb).' },
    { id: 5, text: 'Choose the correct word order:', options: ['The wedding was a happy event.', 'The wedding a happy event was.', 'A happy event the wedding was.', 'Was the wedding a happy event.'], correct: 0, explanation: 'Subject + Verb (was) + Complement is the normal order.' },
    { id: 6, text: 'She ___ every morning before school.', options: ['exercise', 'exercises', 'is exercise', 'exercising'], correct: 1, explanation: '"She" is singular, so add -s: exercises.' },
    { id: 7, text: 'Choose the correct question:', options: ['Does this key fit the lock?', 'Do this key fit the lock?', 'Does this key fits the lock?', 'Is this key fit the lock?'], correct: 0, explanation: '"This key" is singular, so use "Does" + base verb: Does...fit.' },
    { id: 8, text: 'Choose the correct word order:', options: ['They built a strong friendship over the years.', 'They a strong friendship built over the years.', 'A strong friendship they built over the years.', 'Built they a strong friendship over the years.'], correct: 0, explanation: 'Subject + Verb + Object + Time phrase is the normal order.' },
    { id: 9, text: 'Choose the correct word order:', options: ['A guide led us through the museum.', 'A guide through the museum led us.', 'Led a guide us through the museum.', 'Us a guide led through the museum.'], correct: 0, explanation: 'Subject + Verb + Object + Place phrase is the normal order.' },
    { id: 10, text: 'There ___ a lack of clean water in the village.', options: ['is', 'are', 'do', 'does'], correct: 0, explanation: '"A lack" is singular, so use "is".' },
    { id: 11, text: 'Choose the correct word order:', options: ['A narrow passage connected the two rooms.', 'A narrow passage the two rooms connected.', 'The two rooms a narrow passage connected.', 'Connected a narrow passage the two rooms.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 12, text: 'The band will ___ at the festival tonight.', options: ['perform', 'performs', 'performing', 'performed'], correct: 0, explanation: 'After "will", use the base verb: perform.' },
    { id: 13, text: 'Choose the correct word order:', options: ['He felt a lot of pressure before the exam.', 'He a lot of pressure felt before the exam.', 'Before the exam he felt a lot of pressure the.', 'Felt he a lot of pressure before the exam.'], correct: 0, explanation: 'Subject + Verb + Object + Time phrase is the normal order.' },
    { id: 14, text: "It's ___ that it will rain later today.", options: ['probable', 'probably', 'probability', 'probable that'], correct: 0, explanation: '"Probable" (adjective) follows "It\'s" and comes before the "that" clause.' },
    { id: 15, text: 'Choose the correct word order:', options: ['The library is a public building.', 'The library a public building is.', 'A public building the library is.', 'Is the library a public building.'], correct: 0, explanation: 'Subject + Verb (is) + Complement is the normal order.' },
    { id: 16, text: 'Lightning ___ the old tree during the storm.', options: ['strike', 'strikes', 'struck', 'striking'], correct: 2, explanation: '"During the storm" signals past simple: struck.' },
    { id: 17, text: 'Choose the correct word order:', options: ['Most people support the new law.', 'Most people the new law support.', 'The new law most people support.', 'Support most people the new law.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 18, text: 'Cleaning the garage is his ___ this weekend.', options: ['task', 'tasks', 'tasking', 'tasked'], correct: 0, explanation: 'A singular noun follows "his": task.' },
    { id: 19, text: 'Choose the correct word order:', options: ['Scientists use many technical terms.', 'Scientists many technical terms use.', 'Many technical terms scientists use.', 'Use scientists many technical terms.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 20, text: 'Choose the correct word order:', options: ['The two teams decided to unite.', 'The two teams to unite decided.', 'To unite the two teams decided.', 'Decided the two teams to unite.'], correct: 0, explanation: 'Subject + Verb + Object (infinitive phrase) is the normal order.' },
  ],
};

const lesson24Reading = {
  title: 'A Strong Friendship',
  pages: [
    [
      { type: 'heading', text: 'A Strong Friendship' },
      { type: 'p', text: 'Tim was the strongest man in the town. When he played sports, he always won. He performed and exercised in the public park. He did this to show everyone how strong he was. Most people liked him, but one man didn\'t. His name was Jack.' },
      { type: 'p', text: 'Jack hated Tim. Jack was a movie critic and the smartest man in town. He could solve complex math problems. But no one cared. Jack wanted to be famous like Tim.' },
    ],
    [
      { type: 'p', text: 'One day, there was an unusual event. A big storm came suddenly. Snow covered the town. No one could get out. They needed food. The people said, "This is a task for a strong man." Tim was under pressure to save them. But Jack wanted to be the hero, so they both went. Tim said, "You can\'t help because of your lack of strength."' },
      { type: 'p', text: 'But Jack found some small passages under the snow. One of them led toward another town. That town had food. Because Tim was so big and strong, he almost couldn\'t fit inside. They walked until there was a block of ice in their way. Jack said, "We can\'t get past it. But if you strike it, it might break." Tim knew that was probable.' },
    ],
    [
      { type: 'p', text: 'He broke it. When there were more ice blocks, Tim broke them. That made him tired. He couldn\'t walk anymore. Jack said, "Let\'s unite and support each other. I\'ll get the food alone. You rest here." Jack came back with food. Tim couldn\'t remember which passage led home. He needed Jack to be his guide.' },
    ],
    [
      { type: 'p', text: 'The men became friends by working together. In town, people saw Jack with the food and cheered. They called Jack a hero. But Jack didn\'t care. He was thinking of something else. He said to Tim, "I thought I was smart, but I learned a new term today: friendship."' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is the main idea of this story?', options: ['The best way to strike blocks', 'How a strong man learned a new term', 'How two men unite and support each other', 'How to solve complex problems'], correct: 2 },
    { id: 2, text: 'How did Tim show people he was strong?', options: ['He struck the critic in front of them.', 'He performed and exercised in public places.', 'He found a passage in the snow.', 'He lifted a block of ice for them.'], correct: 1 },
    { id: 3, text: 'Why did Jack become a hero?', options: ['He fit inside the passage.', 'He brought food to the town.', 'He put pressure on Tim to save the town.', 'He won every sport he played.'], correct: 1 },
    { id: 4, text: 'What did Tim think while in the passage?', options: ['He thought breaking the ice was probable.', 'He thought the storm was an unusual event.', 'He thought he was a good guide for Jack.', 'He thought it was a very difficult task.'], correct: 0 },
    { id: 5, text: 'What happened when Jack was called a hero?', options: ['He argued with Tim about who deserved the credit.', 'He said the term "friendship" mattered more to him.', 'He asked Tim to carry all the food alone.', 'He decided to move to another town.'], correct: 1 },
  ],
};

const lesson24Listening = {
  title: 'The School Play',
  script: "Every year, our school holds a public event: the spring play. This year's story was complex, with many characters, so the teacher gave each student a task. My task was to perform the lead role, and the pressure was probable to make me nervous.\n\nMy best friend Ana had a small part, but our friendship meant she supported me the whole time. Before the show, she helped me remember a long passage of lines. \"Don't lack confidence,\" she said. \"You'll be great.\"\n\nWhen the curtain opened, I saw a block of light from the stage lamp and felt my heart strike fast against my chest. I looked for Ana - she was my guide, mouthing the first line to help me start. Slowly, my nerves eased. When the show finished, the whole audience began to cheer. Even the school critic wrote that our class had managed to unite as a real team. Ana and I used a new term for our friendship that day: partners in every event, big or small.",
  questions: [
    { id: 1, text: "What event does the story describe?", options: ['A sports competition', "The school's spring play", 'A public speech contest', 'A music concert'], correct: 1 },
    { id: 2, text: "What was the narrator's task?", options: ['To write the play', 'To perform the lead role', 'To be the school critic', 'To fix the stage lights'], correct: 1 },
    { id: 3, text: 'How did Ana help before the show?', options: ['She performed the lead role instead', 'She helped the narrator remember a passage of lines', 'She wrote a review for the critic', 'She fixed the pressure in the lighting'], correct: 1 },
    { id: 4, text: 'What did the audience do when the show finished?', options: ['They left quietly', 'They began to cheer', 'They asked for a task list', 'They struck the stage'], correct: 1 },
    { id: 5, text: 'What did the school critic write about the class?', options: ['That they lacked support', 'That the play was too complex', 'That they had managed to unite as a real team', 'That the pressure was too much for them'], correct: 2 },
  ],
};

const lesson25Words = [
  { id: 'l25w1', word: 'associate', translation: 'bog\'lamoq', definition: 'To associate means to connect something with a person or thing.', example: 'Most people associate birthday parties with having fun.', partOfSpeech: 'verb' },
  { id: 'l25w2', word: 'environment', translation: 'atrof-muhit', definition: 'The environment is the place where people work or live.', example: 'Keeping our environment clean is important to our health.', partOfSpeech: 'noun' },
  { id: 'l25w3', word: 'factory', translation: 'fabrika', definition: 'A factory is a building where things are made or put together.', example: 'We have only one factory in our town.', partOfSpeech: 'noun' },
  { id: 'l25w4', word: 'feature', translation: 'xususiyat', definition: 'A feature is an important part of something.', example: 'The cell phone has many features.', partOfSpeech: 'noun' },
  { id: 'l25w5', word: 'instance', translation: 'misol', definition: 'An instance is an example of something.', example: 'I have never experienced an instance of hate. Have you?', partOfSpeech: 'noun' },
  { id: 'l25w6', word: 'involve', translation: 'jalb qilmoq', definition: 'To involve means to be actively taking part in something.', example: 'The whole family was involved in playing the game.', partOfSpeech: 'verb' },
  { id: 'l25w7', word: 'medicine', translation: 'dori', definition: 'Medicine is something you take to feel better or treat an illness.', example: 'The doctor gave me medicine for my cold.', partOfSpeech: 'noun' },
  { id: 'l25w8', word: 'mix', translation: 'aralashma', definition: 'A mix is different things put together.', example: 'The green mix we made in science class spilled onto the table.', partOfSpeech: 'noun' },
  { id: 'l25w9', word: 'organize', translation: 'tashkil qilmoq', definition: 'To organize is to plan or get ready for an event.', example: 'Make a list to help you organize the things you need.', partOfSpeech: 'verb' },
  { id: 'l25w10', word: 'period', translation: 'davr', definition: 'A period is an amount of time when something happens.', example: 'In one period in Europe, there were many knights.', partOfSpeech: 'noun' },
  { id: 'l25w11', word: 'populate', translation: 'aholi yashamoq', definition: 'If people populate an area, they live there.', example: 'Billions of people populate the Earth.', partOfSpeech: 'verb' },
  { id: 'l25w12', word: 'produce', translation: 'ishlab chiqarmoq', definition: 'To produce something is to make or grow it.', example: 'This tree produces apples every year.', partOfSpeech: 'verb' },
  { id: 'l25w13', word: 'range', translation: 'qator, doira', definition: 'A range is a number or a set of similar things.', example: 'I saw a range of cars to choose from.', partOfSpeech: 'noun' },
  { id: 'l25w14', word: 'recognize', translation: 'tanimoq', definition: 'To recognize something is to know it because you have seen it before.', example: 'I recognized an old friend from many years ago.', partOfSpeech: 'verb' },
  { id: 'l25w15', word: 'regular', translation: 'muntazam', definition: 'If something is regular, it happens often and in equal amounts of time.', example: 'Our regular lunch time is around noon.', partOfSpeech: 'adjective' },
  { id: 'l25w16', word: 'sign', translation: 'belgi, lavha', definition: 'A sign is a notice giving information, directions, a warning, etc.', example: 'The sign indicated that today would be a bad day.', partOfSpeech: 'noun' },
  { id: 'l25w17', word: 'tip', translation: 'uchi', definition: 'A tip is a pointed end of something.', example: 'The tip of his pen was very sharp.', partOfSpeech: 'noun' },
  { id: 'l25w18', word: 'tradition', translation: "an'ana", definition: 'A tradition is something people have been doing for a long time.', example: 'Marriage is a tradition all over the world.', partOfSpeech: 'noun' },
  { id: 'l25w19', word: 'trash', translation: 'axlat', definition: 'Trash is waste material or unwanted or worthless things.', example: "Please take out the trash; it smells bad.", partOfSpeech: 'noun' },
  { id: 'l25w20', word: 'wide', translation: 'keng', definition: 'If something is wide, it is large from side to side.', example: 'The door was as wide as my arms.', partOfSpeech: 'adjective' },
];

const lesson25Grammar = {
  questions: [
    { id: 1, text: 'People often ___ the color red with danger.', options: ['associate', 'associates', 'is associate', 'associating'], correct: 0, explanation: '"People" is plural, so no -s: associate.' },
    { id: 2, text: 'Choose the correct word order:', options: ['Keeping the environment clean matters to everyone.', 'Keeping clean the environment matters to everyone.', 'The environment keeping clean matters to everyone.', 'Matters keeping the environment clean to everyone.'], correct: 0, explanation: 'The gerund subject phrase stays together before the verb: Keeping the environment clean (S) matters (V).' },
    { id: 3, text: 'This town has one ___ that makes shoes.', options: ['factory', 'factories', 'factoring', 'factoried'], correct: 0, explanation: '"One" is followed by a singular noun: factory.' },
    { id: 4, text: 'Choose the correct word order:', options: ['This car has many useful features.', 'This car many useful features has.', 'Many useful features this car has.', 'Has this car many useful features.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 5, text: 'This is one ___ of a kind and helpful teacher.', options: ['instance', 'instances', 'instancing', 'instanced'], correct: 0, explanation: '"One" is followed by a singular noun: instance.' },
    { id: 6, text: 'The project ___ several students from different classes.', options: ['involve', 'involves', 'is involve', 'involving'], correct: 1, explanation: '"The project" is singular, so add -s: involves.' },
    { id: 7, text: 'Choose the correct word order:', options: ['The doctor gave her some medicine.', 'The doctor her some medicine gave.', 'Some medicine the doctor gave her.', 'Gave the doctor her some medicine.'], correct: 0, explanation: 'Subject + Verb + Indirect Object + Object is the normal order.' },
    { id: 8, text: 'Choose the correct word order:', options: ['She made a colorful mix of paints.', 'She a colorful mix of paints made.', 'A colorful mix of paints she made.', 'Made she a colorful mix of paints.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 9, text: 'We need to ___ the trip before Friday.', options: ['organize', 'organizes', 'organizing', 'organized'], correct: 0, explanation: 'After "to", use the base verb: organize.' },
    { id: 10, text: 'Choose the correct word order:', options: ['A calm period followed the storm.', 'A calm period the storm followed.', 'The storm a calm period followed.', 'Followed a calm period the storm.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 11, text: 'Many people ___ this small island.', options: ['populate', 'populates', 'is populate', 'populating'], correct: 0, explanation: '"Many people" is plural, so no -s: populate.' },
    { id: 12, text: 'This factory ___ thousands of toys each month.', options: ['produce', 'produces', 'is produce', 'producing'], correct: 1, explanation: '"This factory" is singular, so add -s: produces.' },
    { id: 13, text: 'Choose the correct word order:', options: ['The store sells a wide range of shoes.', 'The store a wide range of shoes sells.', 'A wide range of shoes the store sells.', 'Sells the store a wide range of shoes.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 14, text: 'Choose the correct question:', options: ['Did you recognize that song?', 'Do you recognized that song?', 'Did you recognized that song?', 'Have you recognize that song?'], correct: 0, explanation: 'Past simple question: Did + subject + base verb: Did you recognize...?' },
    { id: 15, text: 'She has a ___ schedule; she wakes up at 6:00 every day.', options: ['regular', 'regularly', 'regularity', 'regulate'], correct: 0, explanation: '"Regular" (adjective) describes the noun "schedule".' },
    { id: 16, text: 'Choose the correct word order:', options: ['A sign warned us about the ice.', 'A sign about the ice warned us.', 'Warned a sign us about the ice.', 'About the ice a sign warned us the.'], correct: 0, explanation: 'Subject + Verb + Object + About-phrase is the normal order.' },
    { id: 17, text: 'Choose the correct word order:', options: ['The tip of the knife was very sharp.', 'The tip very sharp was of the knife.', 'Of the knife the tip was very sharp.', 'Was the tip of the knife very sharp.'], correct: 0, explanation: 'Subject + Verb (was) + Complement is the normal order.' },
    { id: 18, text: 'Choose the correct word order:', options: ['This is an old family tradition.', 'This an old family tradition is.', 'An old family tradition this is.', 'Is this an old family tradition.'], correct: 0, explanation: 'Subject + Verb (is) + Complement is the normal order.' },
    { id: 19, text: 'Please take out the ___ before it smells bad.', options: ['trash', 'trashes', 'trashing', 'trashed'], correct: 0, explanation: '"Trash" is an uncountable noun, so it has no plural -s here.' },
    { id: 20, text: 'Choose the correct word order:', options: ['The river is wide near the bridge.', 'The river near the bridge is wide.', 'Wide the river is near the bridge.', 'Is the river wide near the bridge.'], correct: 0, explanation: 'Subject + Verb (is) + Complement + Place phrase is a natural order here (fronting the place is also possible, but this is the plainest).' },
  ],
};

const lesson25Reading = {
  title: "Joe's Pond",
  pages: [
    [
      { type: 'heading', text: "Joe's Pond" },
      { type: 'p', text: 'Joe made the world a better place. He got the idea to do that at school. He watched a video there. It was about a factory. This factory produced a lot of trash and put it in a river. The trash and water were a bad mix. People populated the area by the river and drank its water. This made them sick. Many of them needed medicine and made regular visits to doctors.' },
      { type: 'p', text: "But the video wasn't all bad news. It showed ways to pick up trash and why it's important to do this. It said people can make a difference to their environment. The video's important features made Joe associate trash with hurting people." },
    ],
    [
      { type: 'p', text: 'One day Joe walked through a park. He recognized some of the problems from the video. One instance of these problems was the trash in the pond. It was full of plastic cups. There was too much trash. Joe didn\'t want it to hurt anyone.' },
      { type: 'p', text: 'He told his grandfather about the park. His grandfather said, "You know, it\'s a tradition in our family to help people. That\'s why we give food to poor people. Maybe you can help people by cleaning the park."' },
    ],
    [
      { type: 'p', text: 'Cleaning the park would involve hard work. Joe decided to organize a group to help him. He chose a wide area of the park. It had the most trash. He asked his family and friends to come. On Saturday, he gave everyone a sharp stick. They wondered why. He said, "You use the stick\'s tip to pick up trash. This makes it easier." They worked for six weeks. Different people helped each time, but Joe was always there.' },
    ],
    [
      { type: 'p', text: 'In that period of time, Joe saw a range of results. There was no trash in the water. People could swim in it. Joe knew that was a good sign. He was happy because he helped his environment.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is the main idea of this story?', options: ['A grandfather teaching traditions', 'How to recognize signs of sickness', 'An instance of videos helping students study', 'A boy helping the environment'], correct: 3 },
    { id: 2, text: 'When did the boy decide to clean the park?', options: ['After he saw a video about a factory harming a river with its trash', 'After he went there on regular visits', 'After he saw a range of people cleaning it', 'After he associated trash with harming people'], correct: 0 },
    { id: 3, text: 'Why did the people in the video get sick?', options: ['A factory put trash in a river.', 'They produced too much trash.', 'They populated too many parks.', 'They had no medicine for a long period.'], correct: 0 },
    { id: 4, text: 'Why was it easy to pick up the trash?', options: ['It did not involve hard work.', 'Joe did not organize the group.', 'They used the tips of sharp sticks.', 'The people had a good mix of tools to use.'], correct: 2 },
    { id: 5, text: 'What did the features of the video make Joe do?', options: ['Study more at school', 'Move away from the river', 'Associate trash with hurting people', 'Buy new sticks for his friends'], correct: 2 },
  ],
};

const lesson25Listening = {
  title: 'Grandma\'s Recipe',
  script: "In our family, cooking together every Sunday is a tradition. My grandmother likes to organize the kitchen before we start, and she has a regular routine she never skips.\n\nThis Sunday, she wanted to produce her famous vegetable mix, a recipe that has been in our family for a long period. \"Recognize this smell?\" she asked, and I did - I always associate it with happy memories. She showed me the sign on an old jar: a small drawing of a wide pot with steam.\n\nGrandma explained that the recipe doesn't involve any medicine or strange ingredients - just fresh vegetables from a range of local farms, not a factory. She said the environment where vegetables grow matters, and every instance of using fresh food makes the dish taste better. When we finished cooking, there wasn't a single tip of a carrot left as trash. Even the youngest kids in our family who now populate the house on Sundays helped clean up. It's a small tradition, but it's ours.",
  questions: [
    { id: 1, text: 'What tradition does the family have?', options: ['Cooking together every Sunday', 'Visiting a factory every Sunday', 'Watching videos together', 'Cleaning the kitchen every day'], correct: 0 },
    { id: 2, text: 'What did Grandma want to produce?', options: ['A new sign for the kitchen', 'Her famous vegetable mix', 'A range of new recipes', 'Medicine for the family'], correct: 1 },
    { id: 3, text: 'What did the narrator associate with the smell of the recipe?', options: ['A local factory', 'Happy memories', 'A trip to the farm', 'Cleaning the trash'], correct: 1 },
    { id: 4, text: 'Where did the vegetables come from?', options: ['A factory', 'A range of local farms', 'The pond', 'A store downtown'], correct: 1 },
    { id: 5, text: 'What happened to the trash after cooking?', options: ['There was a lot of trash left', 'There was almost no trash left', 'They organized it into a mix', 'They kept it for a regular sign'], correct: 1 },
  ],
};

const lesson26Words = [
  { id: 'l26w1', word: 'advice', translation: 'maslahat', definition: 'Advice is an opinion about what to do.', example: "I don't know how to study for my exams. Can you give me some advice?", partOfSpeech: 'noun' },
  { id: 'l26w2', word: 'along', translation: "bo'ylab", definition: 'Along means to move from one part of a road, river, etc. to another.', example: "Walk along this tunnel for ten minutes, and you'll see a door on the left.", partOfSpeech: 'preposition' },
  { id: 'l26w3', word: 'attention', translation: "e'tibor", definition: 'Attention is the notice, thought, or consideration of someone.', example: 'His work got the attention of two of his co-workers.', partOfSpeech: 'noun' },
  { id: 'l26w4', word: 'attract', translation: 'jalb qilmoq', definition: 'To attract means to make a person or thing come closer or be interested.', example: 'The magnet attracted the metal.', partOfSpeech: 'verb' },
  { id: 'l26w5', word: 'climb', translation: 'tirmashib chiqmoq', definition: 'To climb means to use your hands and feet to go up on something.', example: 'The girls climbed to the top of the mountain.', partOfSpeech: 'verb' },
  { id: 'l26w6', word: 'drop', translation: 'tushirmoq', definition: 'To drop is to fall or allow something to fall.', example: 'A small amount of water dropped from the bottle.', partOfSpeech: 'verb' },
  { id: 'l26w7', word: 'final', translation: 'oxirgi', definition: 'If something is final, it is the last part.', example: 'In the final part of the film, the man and the woman got married.', partOfSpeech: 'adjective' },
  { id: 'l26w8', word: 'further', translation: 'yanada uzoqroq', definition: 'Further is used to say something is from a distance or time.', example: 'The escalator is further along than I thought.', partOfSpeech: 'adjective' },
  { id: 'l26w9', word: 'imply', translation: 'ishora qilmoq', definition: 'To imply something is to suggest it without saying it.', example: "The man implied that he wanted the job, but he didn't say so.", partOfSpeech: 'verb' },
  { id: 'l26w10', word: 'maintain', translation: 'saqlab turmoq', definition: 'To maintain means to make something stay the same.', example: 'The balls maintain constant movement.', partOfSpeech: 'verb' },
  { id: 'l26w11', word: 'neither', translation: 'na u, na bu', definition: 'You use neither to connect two negative statements.', example: 'Neither the pass on the left nor the pass on the right will lead us home.', partOfSpeech: 'adverb' },
  { id: 'l26w12', word: 'otherwise', translation: 'aks holda', definition: 'Otherwise means different or in another way.', example: "It's good to stay active; otherwise, you'll gain weight.", partOfSpeech: 'adverb' },
  { id: 'l26w13', word: 'physical', translation: 'jismoniy', definition: 'If something is physical, it is related to your body and not your mind.', example: 'Biking is good for your physical health.', partOfSpeech: 'adjective' },
  { id: 'l26w14', word: 'prove', translation: 'isbotlamoq', definition: 'To prove something is to show that it is true.', example: 'My teacher proved the answer on the board.', partOfSpeech: 'verb' },
  { id: 'l26w15', word: 'react', translation: 'munosabat bildirmoq', definition: 'To react is to act in a certain way because of something that happened.', example: 'James reacted badly to the news.', partOfSpeech: 'verb' },
  { id: 'l26w16', word: 'ride', translation: 'minib yurmoq', definition: 'To ride something is to travel on it. You can ride an animal, a bike, etc.', example: 'I will ride a roller-coaster for the first time today.', partOfSpeech: 'verb' },
  { id: 'l26w17', word: 'situated', translation: 'joylashgan', definition: 'If something is situated somewhere, it is in that place.', example: 'The white board is situated between the two men.', partOfSpeech: 'adjective' },
  { id: 'l26w18', word: 'society', translation: 'jamiyat', definition: 'Society is people and the way that they live.', example: 'Society expects people to be good and honest.', partOfSpeech: 'noun' },
  { id: 'l26w19', word: 'standard', translation: 'andoza, standart', definition: 'A standard is what people consider normal or good.', example: "This older model TV is below our store's standards.", partOfSpeech: 'noun' },
  { id: 'l26w20', word: 'suggest', translation: 'taklif qilmoq', definition: 'To suggest something means to give an idea or plan about it.', example: 'He suggested that we go to see his boss.', partOfSpeech: 'verb' },
];

const lesson26Grammar = {
  questions: [
    { id: 1, text: 'Choose the correct word order:', options: ['My teacher gave me good advice.', 'My teacher me good advice gave.', 'Good advice my teacher gave me.', 'Gave my teacher me good advice.'], correct: 0, explanation: 'Subject + Verb + Indirect Object + Object is the normal order.' },
    { id: 2, text: 'Choose the correct word order:', options: ['We walked along the river.', 'We the river walked along.', 'Along the river we walked the.', 'Walked we along the river.'], correct: 0, explanation: 'Subject + Verb + Place phrase (along the river) is the normal order.' },
    { id: 3, text: 'The speech got everyone\'s ___.', options: ['attention', 'attentions', 'attentive', 'attend'], correct: 0, explanation: '"Attention" is normally uncountable, so no plural -s here.' },
    { id: 4, text: 'Bright colors ___ many insects to the flowers.', options: ['attract', 'attracts', 'is attract', 'attracting'], correct: 0, explanation: '"Bright colors" is plural, so no -s: attract.' },
    { id: 5, text: 'Choose the correct word order:', options: ['They climbed the tall mountain.', 'They the tall mountain climbed.', 'The tall mountain they climbed.', 'Climbed they the tall mountain.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 6, text: 'Be careful not to ___ the vase.', options: ['drop', 'drops', 'dropping', 'dropped'], correct: 0, explanation: 'After "to", use the base verb: drop.' },
    { id: 7, text: 'Choose the correct word order:', options: ['This is the final question of the test.', 'This the final question of the test is.', 'The final question of the test this is.', 'Is this the final question of the test.'], correct: 0, explanation: 'Subject + Verb (is) + Complement is the normal order.' },
    { id: 8, text: 'The next town is ___ down this road.', options: ['further', 'furthers', 'furthering', 'furthered'], correct: 0, explanation: '"Further" (adjective) describes distance and follows the linking verb "is".' },
    { id: 9, text: 'Choose the correct word order:', options: ['Her silence implied that she disagreed.', 'Her silence that she disagreed implied.', 'That she disagreed her silence implied.', 'Implied her silence that she disagreed.'], correct: 0, explanation: 'Subject + Verb + Object (that-clause) is the normal order.' },
    { id: 10, text: 'This medicine ___ your body temperature normal.', options: ['maintain', 'maintains', 'is maintain', 'maintaining'], correct: 1, explanation: '"This medicine" is singular, so add -s: maintains.' },
    { id: 11, text: 'Choose the correct word order:', options: ['Neither of them wanted to leave.', 'Neither of them to leave wanted.', 'Wanted neither of them to leave.', 'To leave neither of them wanted.'], correct: 0, explanation: 'Subject (Neither of them) + Verb + Object is the normal order.' },
    { id: 12, text: 'Study hard; ___ you will fail the test.', options: ['otherwise', 'other', 'otherwise,', 'others'], correct: 0, explanation: '"Otherwise" links the warning to its consequence.' },
    { id: 13, text: 'Choose the correct word order:', options: ['Swimming is good physical exercise.', 'Swimming good physical exercise is.', 'Is swimming good physical exercise.', 'Good physical exercise swimming is.'], correct: 0, explanation: 'Subject + Verb (is) + Complement is the normal order.' },
    { id: 14, text: 'Choose the correct question:', options: ['Did she prove her point?', 'Do she proved her point?', 'Did she proved her point?', 'Has she prove her point?'], correct: 0, explanation: 'Past simple question: Did + subject + base verb: Did she prove...?' },
    { id: 15, text: 'He always ___ calmly to bad news.', options: ['react', 'reacts', 'is react', 'reacting'], correct: 1, explanation: '"He" is singular, so add -s: reacts.' },
    { id: 16, text: 'Choose the correct word order:', options: ['I ride my bike to school every day.', 'I my bike ride to school every day.', 'To school every day I ride my bike.', 'Ride I my bike to school every day.'], correct: 0, explanation: 'Subject + Verb + Object + Place + Time is the normal order.' },
    { id: 17, text: 'The hotel is ___ near the beach.', options: ['situate', 'situated', 'situating', 'situation'], correct: 1, explanation: '"Situated" (adjective/past participle) follows the linking verb "is".' },
    { id: 18, text: 'Choose the correct word order:', options: ['Society expects honesty from everyone.', 'Society honesty from everyone expects.', 'Honesty from everyone society expects.', 'Expects society honesty from everyone.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 19, text: 'This restaurant has a high ___ for cleanliness.', options: ['standard', 'standards', 'standardize', 'standardly'], correct: 0, explanation: '"A high" is followed by a singular noun: standard.' },
    { id: 20, text: 'Choose the correct word order:', options: ['She suggested a new plan to the team.', 'She a new plan to the team suggested.', 'A new plan to the team she suggested.', 'Suggested she a new plan to the team.'], correct: 0, explanation: 'Subject + Verb + Object + To-phrase is the normal order.' },
  ],
};

const lesson26Reading = {
  title: 'Archie and His Donkey',
  pages: [
    [
      { type: 'heading', text: 'Archie and His Donkey' },
      { type: 'p', text: 'Old Archie needed some money. He decided to sell his donkey. So he and his son Tom went to town. It was situated many miles away.' },
      { type: 'p', text: 'Soon, they met a woman. "Where are you going?" she asked. "To town," said Archie. "Any smart person would ride the donkey," she said. "What are you implying?" Archie asked. "I\'m very smart!" Archie wanted to look smart. So he climbed onto the donkey. Then they continued in the direction of the town.' },
    ],
    [
      { type: 'p', text: 'Further along the road, they met a farmer. "Hello," said Archie. "We want to sell this donkey. Do you want to buy it?" "I don\'t need a donkey," said the farmer. "But if you want my advice, don\'t ride it. The donkey needs to be in good physical condition." "Good idea," said Archie. "Tom, I want you to ride it. You\'re lighter."' },
      { type: 'p', text: '"Neither you nor your son should ride it. It looks very tired. You should carry the donkey," suggested the farmer. "You\'re right," said Archie. "Come on, Tom! We\'ll carry it for the final few miles!"' },
    ],
    [
      { type: 'p', text: 'The donkey was very heavy, and they couldn\'t maintain a good speed. They didn\'t arrive until late in the evening. At last, they walked into the town. But there they attracted the attention of some teenage boys. They laughed at Tom and Archie. They started to throw stones at them. The donkey reacted by kicking. Tom and Archie dropped the donkey. It fell on the ground and then ran away. Archie lost his donkey. He went home with no money.' },
    ],
    [
      { type: 'p', text: 'What does this story teach us? We cannot please everyone in our society. Don\'t take everyone\'s advice, but set your own standards. Prove to everyone that you can make decisions by yourself. Otherwise, you may end up with nothing at all.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is the main idea of this story?', options: ['You should always take the advice of older people.', 'Teenage boys are the nicest people in society.', 'You should set your own standards.', 'You should neither ride nor carry a donkey.'], correct: 2 },
    { id: 2, text: 'Why did Archie get on the donkey?', options: ["The woman implied that he wasn't smart.", 'The town was situated further away than he had thought.', 'He did not want to climb the final hill.', 'His walking speed was too slow.'], correct: 0 },
    { id: 3, text: 'Why did the farmer suggest carrying the donkey?', options: ["To attract people's attention", 'To keep the donkey in good physical condition', 'To maintain their speed', 'To prove that Archie was strong'], correct: 1 },
    { id: 4, text: 'Why did the donkey start kicking?', options: ['It didn\'t want to be carried along the road.', "It didn't want to go in the direction of the river.", "It reacted badly to a group of teenage boys' teasing.", 'It became very angry at Archie and Tom.'], correct: 2 },
    { id: 5, text: 'What did the teenage boys do when they saw Archie, Tom, and the donkey?', options: ['They offered to help carry the donkey.', 'They laughed and threw stones at them.', 'They asked to buy the donkey.', 'They gave Archie some advice.'], correct: 1 },
  ],
};

const lesson26Listening = {
  title: 'Advice from a Neighbor',
  script: "My new apartment was situated further from the city center than I expected, and I couldn't maintain my old routine. One evening, my neighbor Mrs. Lee gave me some advice.\n\n\"Climb the hill along this street every morning,\" she said. \"It's good physical exercise, and it will attract less attention from traffic than the main road.\" I didn't want to seem rude, so I didn't imply that I disagreed - I just listened.\n\nThe next day, I decided to try her idea. Walking along the quiet path, I didn't drop my bag once, and by the final block, I felt great. I began to react differently to my new neighborhood - I started to enjoy it. Otherwise, I might have stayed unhappy for a long time. Society often expects people to follow the same standard routine every day, but Mrs. Lee proved that a small change can matter. Neither the bus nor a bike ride felt as good as that walk. I decided to suggest the same path to my other neighbors.",
  questions: [
    { id: 1, text: "Where was the narrator's new apartment situated?", options: ['Right in the city center', 'Further from the city center than expected', 'Next to a hill', 'Along the main road'], correct: 1 },
    { id: 2, text: "What did Mrs. Lee suggest the narrator do every morning?", options: ['Ride the bus to work', 'Climb the hill along the street', 'Take the main road', 'Stay inside for physical exercise'], correct: 1 },
    { id: 3, text: 'Why did Mrs. Lee say the quiet path was better than the main road?', options: ['It was shorter', 'It would attract less attention from traffic', 'It had no hills', 'It was closer to the apartment'], correct: 1 },
    { id: 4, text: 'How did the narrator feel by the final block of the walk?', options: ['Tired and annoyed', 'Great', 'Confused about the directions', 'Ready to go back home'], correct: 1 },
    { id: 5, text: 'What did the narrator decide to do at the end?', options: ['Move to a different apartment', 'Suggest the same path to other neighbors', 'Stop taking advice from Mrs. Lee', 'Take the bus instead of walking'], correct: 1 },
  ],
};

export const lessons22to26 = [
  {
    id: 'essential-lesson-22',
    title: 'Lesson 22',
    words: lesson22Words,
    grammar: lesson22Grammar,
    reading: lesson22Reading,
    listening: lesson22Listening,
  },
  {
    id: 'essential-lesson-23',
    title: 'Lesson 23',
    words: lesson23Words,
    grammar: lesson23Grammar,
    reading: lesson23Reading,
    listening: lesson23Listening,
  },
  {
    id: 'essential-lesson-24',
    title: 'Lesson 24',
    words: lesson24Words,
    grammar: lesson24Grammar,
    reading: lesson24Reading,
    listening: lesson24Listening,
  },
  {
    id: 'essential-lesson-25',
    title: 'Lesson 25',
    words: lesson25Words,
    grammar: lesson25Grammar,
    reading: lesson25Reading,
    listening: lesson25Listening,
  },
  {
    id: 'essential-lesson-26',
    title: 'Lesson 26',
    words: lesson26Words,
    grammar: lesson26Grammar,
    reading: lesson26Reading,
    listening: lesson26Listening,
  },
];
