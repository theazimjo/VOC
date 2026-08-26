// Lesson 17-21 content for "Essential 3000", sourced from Units 17-21 of the
// real book — "4000 Essential English Words 1" by Paul Nation (Compass
// Publishing) — via pdftotext extraction of src/assets/data/essential
// english 1.pdf. Words, their sentence definitions, example sentences, and
// each unit's reading story + comprehension questions are transcribed from
// the book (each unit's question 5 lost its answer options to the same
// OCR/layout page-break gap lesson 1 hit, so those four options are
// original, matching the story). Uzbek translations are original (the book
// is English-only). Each listening dialogue is original narration written
// to reuse that unit's 20 target words, since the book itself has no
// audio/listening component. The grammar-stage exercises are original,
// each of the 20 target words used in exactly one question.

const lesson17Words = [
  { id: 'l17w1', word: 'appreciate', translation: 'qadrlamoq', definition: 'To appreciate something is to understand its good qualities.', example: 'I really appreciate the beautiful scenery here.', partOfSpeech: 'verb' },
  { id: 'l17w2', word: 'available', translation: 'mavjud', definition: 'If something is available, it means you can get it.', example: 'There were many seats available in the room.', partOfSpeech: 'adjective' },
  { id: 'l17w3', word: 'beat', translation: "yutmoq, g'olib chiqmoq", definition: 'To beat someone means to do better than they do.', example: 'I managed to beat everyone in the race.', partOfSpeech: 'verb' },
  { id: 'l17w4', word: 'bright', translation: 'yorqin', definition: 'If something is bright, it shows a lot of light.', example: 'The bright morning sun woke us up early.', partOfSpeech: 'adjective' },
  { id: 'l17w5', word: 'celebrate', translation: 'nishonlamoq', definition: 'To celebrate is to do something to show that an event is special.', example: 'We all celebrated when we heard the great news.', partOfSpeech: 'verb' },
  { id: 'l17w6', word: 'determine', translation: 'qaror qilmoq', definition: 'To determine means to choose or make a decision.', example: 'He tried to determine which cake to eat first.', partOfSpeech: 'verb' },
  { id: 'l17w7', word: 'disappear', translation: "g'oyib bo'lmoq", definition: 'To disappear means to go away or not be seen.', example: 'The top of the mountain disappeared into the clouds.', partOfSpeech: 'verb' },
  { id: 'l17w8', word: 'else', translation: 'boshqa', definition: 'If you talk about something else, you talk about something different.', example: 'I wanted a bike for my birthday, but I got something else.', partOfSpeech: 'adjective' },
  { id: 'l17w9', word: 'fair', translation: 'adolatli', definition: 'Fair describes treating someone in a way that is reasonable or right.', example: 'He sold me his bike for a fair price.', partOfSpeech: 'adjective' },
  { id: 'l17w10', word: 'flow', translation: 'oqmoq', definition: 'To flow is to move easily and continuously in one direction.', example: 'The water flowed over the rocks and into the lake.', partOfSpeech: 'verb' },
  { id: 'l17w11', word: 'forward', translation: 'oldinga', definition: 'If you move forward, you move in the direction in front of you.', example: 'When he saw his mother, the baby crawled forward to her.', partOfSpeech: 'adverb' },
  { id: 'l17w12', word: 'hill', translation: 'tepalik', definition: 'A hill is a round area of land. It is higher than the land around it.', example: 'The sun was rising above the green hills.', partOfSpeech: 'noun' },
  { id: 'l17w13', word: 'level', translation: 'daraja', definition: 'A level is a point on a scale that measures something.', example: 'Please check the water level in the tank.', partOfSpeech: 'noun' },
  { id: 'l17w14', word: 'lone', translation: "yolg'iz, yakka", definition: 'If someone or something is lone, they are the only one of that kind.', example: 'A lone man walked along the empty street.', partOfSpeech: 'adjective' },
  { id: 'l17w15', word: 'puddle', translation: "ko'lmak", definition: 'A puddle is a pool of liquid on the ground.', example: 'When the ice melted, it formed a small puddle.', partOfSpeech: 'noun' },
  { id: 'l17w16', word: 'response', translation: 'javob', definition: 'A response is the answer to a question.', example: 'He asked if I was sad. My response was, "No."', partOfSpeech: 'noun' },
  { id: 'l17w17', word: 'season', translation: 'fasl', definition: 'A season is a time of the year: spring, summer, fall or winter.', example: 'Fall is a cool season, while winter is very cold.', partOfSpeech: 'noun' },
  { id: 'l17w18', word: 'solution', translation: 'yechim', definition: 'A solution is a way to solve a problem.', example: 'There are many problems here. We need solutions!', partOfSpeech: 'noun' },
  { id: 'l17w19', word: 'waste', translation: 'isrof qilmoq', definition: 'To waste means to carelessly use something all up.', example: "Turn off the tap so you don't waste water.", partOfSpeech: 'verb' },
  { id: 'l17w20', word: 'whether', translation: '-mi (tanlov bog\'lovchisi)', definition: 'You use whether when you must choose between two things.', example: 'I could not decide whether to go left or right.', partOfSpeech: 'conjunction' },
];

const lesson17Grammar = {
  questions: [
    { id: 1, text: 'She ___ the kind gift her friend gave her.', options: ['appreciates', 'appreciate', 'is appreciate', 'appreciating'], correct: 0, explanation: '"She" is singular, so use "appreciates" in the present simple.' },
    { id: 2, text: 'Are there any rooms ___ for tonight?', options: ['available', 'availables', 'availability', 'avail'], correct: 0, explanation: '"Available" is an adjective and does not take a plural -s.' },
    { id: 3, text: 'Choose the correct word order:', options: ['Our team beat the visitors yesterday.', 'Our team the visitors beat yesterday.', 'Beat our team the visitors yesterday.', 'Yesterday beat our team the visitors.'], correct: 0, explanation: 'Subject + Verb + Object + Time is the normal order.' },
    { id: 4, text: 'The stars ___ very bright tonight.', options: ['are', 'is', 'does', 'be'], correct: 0, explanation: '"Stars" is plural, so use "are".' },
    { id: 5, text: 'Choose the correct question:', options: ['Did they celebrate your birthday?', 'Did they celebrated your birthday?', 'Do they celebrate your birthday yesterday?', 'Were they celebrate your birthday?'], correct: 0, explanation: 'Past simple questions use Did + subject + base verb.' },
    { id: 6, text: 'Yesterday, he ___ to finish his homework before dinner.', options: ['determined', 'determine', 'will determined', 'determining'], correct: 0, explanation: '"Yesterday" needs the past simple: determined.' },
    { id: 7, text: 'Choose the correct word order:', options: ['The rabbit suddenly disappeared into the forest.', 'The rabbit into the forest suddenly disappeared.', 'Suddenly the forest into disappeared the rabbit.', 'Disappeared the rabbit suddenly into the forest.'], correct: 0, explanation: 'Subject + Adverb + Verb + Place phrase is the normal order here.' },
    { id: 8, text: 'Would you like anything ___ to eat?', options: ['else', 'other', 'another', 'more else'], correct: 0, explanation: '"else" follows question words like anything/something: anything else.' },
    { id: 9, text: "It ___ fair to blame him for someone else's mistake.", options: ["isn't", 'not', 'no', 'never is'], correct: 0, explanation: 'The negative of "is" is "isn\'t".' },
    { id: 10, text: 'Rivers ___ toward the sea.', options: ['flow', 'flows', 'flowing', 'is flow'], correct: 0, explanation: '"Rivers" is plural, so the verb takes no -s: they flow.' },
    { id: 11, text: 'Choose the correct word order:', options: ['She stepped forward to accept the prize.', 'She forward stepped to accept the prize.', 'Forward she stepped to accept the prize.', 'She stepped to accept forward the prize.'], correct: 0, explanation: 'Subject + Verb + Adverb + Object is the normal order.' },
    { id: 12, text: 'There ___ a small hill behind our house.', options: ['is', 'are', 'do', 'have'], correct: 0, explanation: '"A small hill" is singular, so use "is".' },
    { id: 13, text: 'Please check the water ___ before you swim.', options: ['level', 'levels', 'leveled', 'leveling'], correct: 0, explanation: 'A noun is needed after "water": water level.' },
    { id: 14, text: 'Choose the correct word order:', options: ['A lone bird flew across the sky.', 'A bird lone flew across the sky.', 'Flew a lone bird across the sky.', 'Across the sky a bird lone flew.'], correct: 0, explanation: 'Adjectives like "lone" go before the noun they describe.' },
    { id: 15, text: 'After the rain, there ___ puddles all over the yard.', options: ['were', 'was', 'is', 'has'], correct: 0, explanation: '"Puddles" is plural, so use "were".' },
    { id: 16, text: "I sent an email, but I haven't received a ___ yet.", options: ['response', 'respond', 'responsive', 'responding'], correct: 0, explanation: 'A noun is needed after "a": response.' },
    { id: 17, text: 'Which ___ do you like best?', options: ['season', 'seasons', 'seasonal', 'seasoning'], correct: 0, explanation: '"Which" is followed by a singular noun here: season.' },
    { id: 18, text: 'Choose the correct word order:', options: ['The teacher found a good solution to the problem.', 'The teacher a good solution found to the problem.', 'Found the teacher a good solution to the problem.', 'To the problem the teacher found a good solution.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 19, text: "Please don't ___ your time on games before the exam.", options: ['waste', 'wastes', 'wasting', 'wasted'], correct: 0, explanation: 'The imperative uses the base verb after "don\'t".' },
    { id: 20, text: "I don't know ___ he will come or not.", options: ['whether', 'if only', 'because', 'so that'], correct: 0, explanation: '"whether...or not" introduces a choice between two things.' },
  ],
};

const lesson17Reading = {
  title: 'The Race for Water',
  pages: [
    [
      { type: 'heading', text: 'The Race for Water' },
      { type: 'p', text: 'There was a town next to a river. The people there had a lot of water. But they wasted it. That made the Sky angry. It said, "If you waste water, I will take it away from you." But the people didn\'t listen.' },
      { type: 'p', text: 'When the season changed from spring to summer, the clouds disappeared. The bright sun was hot and made the river dry. There was no water available. People asked, "When will the rain fall?"' },
    ],
    [
      { type: 'p', text: 'The Sky\'s response was, "You don\'t appreciate water. You waste it, and now I will never make rain again."' },
      { type: 'p', text: 'A boy determined that this wasn\'t fair. He thought of a solution. He asked the Sky to race him. He said, "If I get to the top of that hill before your rain can form puddles, you must fill our river."' },
      { type: 'p', text: 'The Sky laughed. "Little boy, I am the Sky. I am above everything else. You cannot beat me." But the boy knew he would win.' },
    ],
    [
      { type: 'p', text: 'When the race began, the boy ran forward. The Sky started raining on the hill. But puddles did not form there. When it rained on the hill, the water went down.' },
      { type: 'p', text: 'The Sky kept raining. The water flowed down into the river. When the boy reached the top of the hill, the river was full. The people began to celebrate. It was the highest level the river had ever been at before.' },
      { type: 'p', text: 'The Sky was angry. "A boy can\'t beat me! I won\'t fill your river," it said.' },
    ],
    [
      { type: 'p', text: 'Now the boy laughed. "It doesn\'t matter whether you want to fill it or not," he said. "You already did." The Sky looked at the full river. "You tricked me," it said. It asked the people, "Do you appreciate water now?"' },
      { type: 'p', text: '"Yes," they said. "We won\'t waste it."' },
      { type: 'p', text: 'That is how a lone boy saved his town and won the race for water.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['A boy who swims in a river', 'People who celebrate at a party', 'A boy with the solution to a problem', 'People who learn to appreciate a hill'], correct: 2 },
    { id: 2, text: 'The river became dry when _______.', options: ['the water went somewhere else', 'the bright sun became very hot', 'the people found available water nearby', 'the season changed from summer to spring'], correct: 1 },
    { id: 3, text: 'How did the boy save the town?', options: ['He made the clouds disappear.', 'He beat the rain to the top of the hill.', 'He moved forward faster than the sun.', 'He promised not to waste any more water.'], correct: 1 },
    { id: 4, text: 'What was the last thing the Sky did in the story?', options: ['It raced a lone boy to the top of the hill.', 'It saw the river at its highest level.', 'It asked the people for a response about water.', 'It determined the people wasted too much water.'], correct: 2 },
    { id: 5, text: 'What did the boy say when he reached the top of the hill?', options: ['"It doesn\'t matter whether you want to fill it or not — you already did."', "\"I'm sorry, I could not win the race.\"", '"Please make it rain again, I need more water."', '"I found a puddle at the top of the hill."'], correct: 0 },
  ],
};

const lesson17Listening = {
  title: 'The Hiking Trip',
  script: "Last weekend, my brother and I decided to hike up a lone hill near our town. It was the perfect season for a hike — the mornings were bright and cool. Before we left, we checked whether the trail was still available after last week's storm.\n\nAt the base of the hill, we saw a big puddle from all the rain. My brother wanted to jump over it, but I told him it wasn't fair to leave our shoes covered in mud before a long walk, so we found another path forward instead.\n\nAs we walked, we watched a small stream flow down beside the trail. My brother wanted to beat me to the top, so he ran ahead. I determined that I would go at my own pace instead of rushing.\n\nWhen we finally reached the top, the view was amazing. Everything else around us seemed to disappear — it was just the sky and the hills. I told my brother how much I appreciate these small trips together, and we decided to celebrate by eating our lunch at the highest level of the trail.\n\nOn the way down, I asked my brother, \"What was your favorite part?\" His response was quick: \"Reaching the top before you!\" I laughed. We both agreed there was really only one solution to end a perfect day like this — plan our next hike already. We just had to decide whether we would waste no time and go again next weekend.",
  questions: [
    { id: 1, text: 'Where did the brothers decide to hike?', options: ['A lone hill near their town', 'A beach', 'A forest', 'A mountain far away'], correct: 0 },
    { id: 2, text: 'What did they check before leaving?', options: ['Whether the trail was available after the storm', 'Whether it would rain', 'Whether their shoes were clean', 'Whether the puddle was deep'], correct: 0 },
    { id: 3, text: 'Why did they avoid jumping over the puddle?', options: ["It wasn't fair to get muddy shoes before a long walk", 'It was too big to jump', 'The brother was scared', 'It was against the rules'], correct: 0 },
    { id: 4, text: 'What did the narrator say about the trips with his brother?', options: ['He appreciates them', 'He wants to stop doing them', 'He finds them boring', 'He prefers hiking alone'], correct: 0 },
    { id: 5, text: 'What did they decide to do at the end of the story?', options: ['Go on their next hike soon', 'Never hike again', 'Sell their hiking shoes', 'Wait for a different season'], correct: 0 },
  ],
};

const lesson18Words = [
  { id: 'l18w1', word: 'argue', translation: 'bahslashmoq', definition: 'To argue is to angrily speak to someone because you do not agree.', example: 'My brother and I argued about which movie to watch.', partOfSpeech: 'verb' },
  { id: 'l18w2', word: 'communicate', translation: 'muloqot qilmoq', definition: 'To communicate is to give information by talking, writing, etc.', example: 'I communicated with my teacher about the homework.', partOfSpeech: 'verb' },
  { id: 'l18w3', word: 'crowd', translation: "olomon, izdiham", definition: 'A crowd is a large group of people.', example: 'A large crowd gathered in the square to watch the parade.', partOfSpeech: 'noun' },
  { id: 'l18w4', word: 'depend', translation: "bog'liq bo'lmoq", definition: 'To depend on someone or something is to need them.', example: 'Children depend on their parents for many things.', partOfSpeech: 'verb' },
  { id: 'l18w5', word: 'dish', translation: 'laganda, taom', definition: 'A dish is a plate.', example: 'She put a clean white dish on the table.', partOfSpeech: 'noun' },
  { id: 'l18w6', word: 'empty', translation: "bo'sh", definition: 'If something is empty, it does not have anything in it.', example: "My water bottle was empty, so I filled it again.", partOfSpeech: 'adjective' },
  { id: 'l18w7', word: 'exact', translation: 'aniq', definition: 'If something is exact, it is just the right amount.', example: 'Please use the exact amount of sugar for the cake.', partOfSpeech: 'adjective' },
  { id: 'l18w8', word: 'fresh', translation: 'yangi', definition: 'If something is fresh, it is new.', example: 'I just bought these apples. They are very fresh.', partOfSpeech: 'adjective' },
  { id: 'l18w9', word: 'gather', translation: "yig'moq, to'plamoq", definition: 'To gather is to collect several things, usually from different places.', example: 'Sam gathered some flowers for his mother.', partOfSpeech: 'verb' },
  { id: 'l18w10', word: 'indicate', translation: "ko'rsatmoq", definition: 'To indicate means to show, point, or make something clear.', example: 'He pointed to the map to indicate where we should go.', partOfSpeech: 'verb' },
  { id: 'l18w11', word: 'item', translation: 'buyum, mahsulot', definition: 'An item is a thing that you buy or sell.', example: 'I have many items for school in my bag.', partOfSpeech: 'noun' },
  { id: 'l18w12', word: 'offer', translation: 'taklif qilmoq', definition: 'To offer is to present someone with something.', example: 'He offered me a ride home after school.', partOfSpeech: 'verb' },
  { id: 'l18w13', word: 'price', translation: 'narx', definition: 'The price of something is how much it costs.', example: 'What is the price of this shirt?', partOfSpeech: 'noun' },
  { id: 'l18w14', word: 'product', translation: 'mahsulot', definition: 'A product is something that is made.', example: 'This shop sells many different beauty products.', partOfSpeech: 'noun' },
  { id: 'l18w15', word: 'property', translation: 'mulk', definition: 'Property is something that someone owns.', example: "This small farm is now my family's property.", partOfSpeech: 'noun' },
  { id: 'l18w16', word: 'purchase', translation: 'sotib olmoq', definition: 'To purchase something is to buy it.', example: 'I recently purchased a new bicycle.', partOfSpeech: 'verb' },
  { id: 'l18w17', word: 'recommend', translation: 'tavsiya qilmoq', definition: 'To recommend something is to say that someone should do it.', example: 'My doctor recommended that I get more exercise.', partOfSpeech: 'verb' },
  { id: 'l18w18', word: 'select', translation: 'tanlamoq', definition: 'To select something is to choose it.', example: 'I hope I selected the right answer on the test.', partOfSpeech: 'verb' },
  { id: 'l18w19', word: 'tool', translation: 'asbob', definition: 'A tool is something that helps you do a task.', example: 'We used a tool to fix the broken chair.', partOfSpeech: 'noun' },
  { id: 'l18w20', word: 'treat', translation: 'munosabatda bo\'lmoq', definition: 'To treat is to act in a certain way toward someone.', example: 'She always treats her friends kindly.', partOfSpeech: 'verb' },
];

const lesson18Grammar = {
  questions: [
    { id: 1, text: 'They ___ about the movie every weekend.', options: ['argue', 'argues', 'arguing', 'is argue'], correct: 0, explanation: '"They" is plural, so use the base verb: argue.' },
    { id: 2, text: 'Choose the correct word order:', options: ['I communicated with my teacher about the homework.', 'I with my teacher communicated about the homework.', 'Communicated I with my teacher about the homework.', 'About the homework I communicated with my teacher the.'], correct: 0, explanation: 'Subject + Verb + Object phrase is the normal order.' },
    { id: 3, text: 'A large ___ gathered to watch the parade.', options: ['crowd', 'crowds', 'crowded', 'crowding'], correct: 0, explanation: 'A singular noun is needed after "a large": crowd.' },
    { id: 4, text: 'Babies ___ on their parents for food.', options: ['depend', 'depends', 'depended', 'is depend'], correct: 0, explanation: '"Babies" is plural, so no -s on the verb.' },
    { id: 5, text: 'Choose the correct word order:', options: ['She put a clean dish on the table.', 'She a clean dish put on the table.', 'Put she a clean dish on the table.', 'On the table she a clean dish put.'], correct: 0, explanation: 'Subject + Verb + Object + Place is the normal order.' },
    { id: 6, text: 'The classroom was ___ when we arrived.', options: ['empty', 'emptily', 'emptiness', 'emptying'], correct: 0, explanation: 'An adjective is needed after "was": empty.' },
    { id: 7, text: "I don't know the ___ time the movie starts.", options: ['exact', 'exactly', 'exactness', 'exacting'], correct: 0, explanation: 'Adjectives like "exact" go before the noun they describe.' },
    { id: 8, text: 'These vegetables look very ___ today.', options: ['fresh', 'freshly', 'freshness', 'freshen'], correct: 0, explanation: 'An adjective is needed after "look very": fresh.' },
    { id: 9, text: 'Every evening, the birds ___ in that tree.', options: ['gather', 'gathers', 'gathering', 'gathered'], correct: 0, explanation: '"The birds" is plural, so no -s: they gather.' },
    { id: 10, text: 'Choose the correct question:', options: ['Did the sign indicate where to park?', 'Did the sign indicated where to park?', 'Does the sign indicate where to park yesterday?', 'Was the sign indicate where to park?'], correct: 0, explanation: 'Past simple questions use Did + subject + base verb.' },
    { id: 11, text: 'How many ___ are in your shopping basket?', options: ['items', 'item', 'iteming', 'itemed'], correct: 0, explanation: '"How many" is followed by a plural noun: items.' },
    { id: 12, text: 'She ___ me a cup of tea when I arrived.', options: ['offered', 'offer', 'offers', 'offering'], correct: 0, explanation: '"When I arrived" sets a past time, so use the past simple: offered.' },
    { id: 13, text: 'Choose the correct word order:', options: ['The price of milk went up this month.', 'Of milk the price went up this month.', 'Went up the price of milk this month.', 'This month went up the price of milk.'], correct: 0, explanation: 'Subject + Verb + Time is the normal order.' },
    { id: 14, text: 'This store sells many different ___.', options: ['products', 'product', 'producted', 'producting'], correct: 0, explanation: '"Many different" is followed by a plural noun: products.' },
    { id: 15, text: 'This land ___ my grandfather\'s property.', options: ['is', 'are', 'do', 'have'], correct: 0, explanation: '"This land" is singular, so use "is".' },
    { id: 16, text: 'We ___ a new car last week.', options: ['purchased', 'purchase', 'purchases', 'purchasing'], correct: 0, explanation: '"Last week" needs the past simple: purchased.' },
    { id: 17, text: 'The doctor ___ eating more vegetables.', options: ['recommends', 'recommend', 'recommending', 'is recommend'], correct: 0, explanation: '"The doctor" is singular, so add -s: recommends.' },
    { id: 18, text: 'Choose the correct word order:', options: ['Please select your favorite color.', 'Please your favorite color select.', 'Select please your favorite color.', 'Your favorite color please select.'], correct: 0, explanation: 'Verb + Object is the normal order in a polite request.' },
    { id: 19, text: 'You will need a ___ to open this box.', options: ['tool', 'tools', 'tooled', 'tooling'], correct: 0, explanation: 'A singular noun is needed after "a": tool.' },
    { id: 20, text: 'You should always ___ others kindly.', options: ['treat', 'treats', 'treated', 'treating'], correct: 0, explanation: 'The base verb follows "should": treat.' },
  ],
};

const lesson18Reading = {
  title: 'The Little Red Chicken',
  pages: [
    [
      { type: 'heading', text: 'The Little Red Chicken' },
      { type: 'p', text: 'A little red chicken had a store in a small town. She sold many different items to people in the town. The people loved her products.' },
      { type: 'p', text: 'One day, a cat came to her property. He saw the sign that indicated where the chicken\'s store was located. He wanted to purchase bread, but the chicken\'s store was almost empty. She had only a bag of wheat. "You can use the wheat to make bread," the chicken said.' },
    ],
    [
      { type: 'p', text: '"No, I don\'t want to work," the cat said. "I just want to buy bread." The cat became annoyed and left the store.' },
      { type: 'p', text: 'Later, the little red chicken saw the cat in a crowd. "I will help you make the bread," she said. But the cat treated her badly. He did not even communicate with her. He did not want to do any work.' },
    ],
    [
      { type: 'p', text: 'So the chicken decided to make the bread. She selected the exact amount of wheat to make fresh bread. She used a stone to pound the wheat to get it ready. Soon, her bread was ready.' },
      { type: 'p', text: 'The cat came and saw the bread on a dish. "Give me some of your bread," he said. "No," said the little red chicken. "You did not help me make the bread. So you shall not have any to eat."' },
    ],
    [
      { type: 'p', text: 'The cat argued with the chicken. He tried to offer a price for it. But the little red chicken did not want to sell her bread. "Don\'t depend on others to do work for you," said the little red chicken.' },
      { type: 'p', text: '"Then how will I get bread?" the cat asked. "I recommend doing some work," said the little red chicken. "Use a tool to plant your own wheat. When it grows big, you can gather it and make your own bread. You need to learn to do work for what you want."' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is the story about?', options: ['A chicken finding a friend to depend on', 'A chicken making bread out of wheat', "Why a cat's store did not have any items", 'The exact amount of wheat needed to make bread'], correct: 1 },
    { id: 2, text: 'What did the cat do when the chicken asked him to help make the bread?', options: ['He did not communicate with her.', 'He argued with the little red chicken.', 'He said that he would gather all the things needed to make the bread.', 'He treated her very nicely.'], correct: 0 },
    { id: 3, text: "How did the cat find the chicken's store?", options: ['He saw tools being sold outside of the store.', "He saw a stone with the store's name.", 'His friend told him to purchase bread there.', 'He saw a sign that indicated her property.'], correct: 3 },
    { id: 4, text: 'What did the cat do when he saw the fresh bread?', options: ['He selected the product for himself.', 'He tried to buy some of it for a price.', 'He brought a crowd of friends with him to eat.', 'He asked why her store was empty.'], correct: 1 },
    { id: 5, text: 'What did the little red chicken recommend the cat to do to have some bread?', options: ['Use a tool to plant his own wheat and make his own bread', 'Go to another store and purchase bread there', 'Wait for her to gather more wheat for him', 'Offer her a higher price for the bread'], correct: 0 },
  ],
};

const lesson18Listening = {
  title: 'A Trip to the Market',
  script: "On Saturday morning, my mom and I went to the market to purchase some fresh vegetables. The market was full of people — it felt like the whole town had gathered there in one big crowd.\n\nAt the first stall, my mom wanted to select the best tomatoes. She checked the price of each item carefully, because she didn't want to pay too much. The seller tried to communicate with us in a friendly way and offered us a taste of fresh cheese.\n\nAt the next stall, we saw many new products — spices, bread, and small kitchen tools. My mom picked up a wooden spoon and asked, \"Is this a good tool for cooking rice?\" The seller said yes and gave her the exact price.\n\nThen a woman began to argue with a seller about a broken dish. She said it was empty of any real value, but the seller said the dish was his property and he could not lower the price. My mom didn't want to depend on their argument to finish, so we moved on.\n\nBefore we left, the seller pointed to a sign that indicated a special sale. He said he would recommend a set of dishes if we wanted to treat our whole family to a nice dinner. My mom smiled and said we would think about it. We packed our items into a bag and headed home.",
  questions: [
    { id: 1, text: 'Where did the mom and narrator go on Saturday morning?', options: ['The market', 'A restaurant', 'School', "A friend's house"], correct: 0 },
    { id: 2, text: 'What did the seller offer them at the first stall?', options: ['A taste of fresh cheese', 'A free dish', 'A discount on tools', 'A bag of wheat'], correct: 0 },
    { id: 3, text: 'What did the woman argue with the seller about?', options: ['A broken dish', 'The price of tomatoes', 'A missing item', "The market's opening time"], correct: 0 },
    { id: 4, text: 'What did the seller recommend before they left?', options: ['A set of dishes for a family dinner', 'A new cooking tool', 'Fresh vegetables', 'A cheaper price for tomatoes'], correct: 0 },
    { id: 5, text: 'What did the mom check carefully at the first stall?', options: ['The price of each item', 'The color of the tomatoes', "The seller's name", 'The size of the crowd'], correct: 0 },
  ],
};

const lesson19Words = [
  { id: 'l19w1', word: 'alive', translation: 'tirik', definition: 'If someone or something is alive, they are not dead.', example: 'My grandmother is still alive at 95 years old.', partOfSpeech: 'adjective' },
  { id: 'l19w2', word: 'bone', translation: 'suyak', definition: 'A bone is a hard part of the body.', example: 'The dog buried a bone in the garden.', partOfSpeech: 'noun' },
  { id: 'l19w3', word: 'bother', translation: "ovora bo'lmoq", definition: 'To bother is to make the effort to do something.', example: 'Nobody bothered to clean the kitchen after dinner.', partOfSpeech: 'verb' },
  { id: 'l19w4', word: 'captain', translation: 'kapitan', definition: 'A captain is the person who leads a ship or airplane.', example: 'The captain guided the ship safely to the island.', partOfSpeech: 'noun' },
  { id: 'l19w5', word: 'conclusion', translation: 'xulosa, yakun', definition: 'The conclusion of something is the final part of it.', example: 'At the conclusion of the meeting, everyone shook hands.', partOfSpeech: 'noun' },
  { id: 'l19w6', word: 'doubt', translation: 'shubha', definition: 'Doubt is a feeling of not being sure.', example: 'I have some doubt that the plan will work.', partOfSpeech: 'noun' },
  { id: 'l19w7', word: 'explore', translation: "kashf qilmoq", definition: 'To explore is to look for new places.', example: 'The children love to explore the old forest near their house.', partOfSpeech: 'verb' },
  { id: 'l19w8', word: 'foreign', translation: 'chet, xorijiy', definition: 'If something is foreign, it is from a different country.', example: 'She enjoys trying foreign foods from other countries.', partOfSpeech: 'adjective' },
  { id: 'l19w9', word: 'glad', translation: 'xursand', definition: 'If you are glad, you are happy.', example: 'I am glad you came to visit us.', partOfSpeech: 'adjective' },
  { id: 'l19w10', word: 'however', translation: 'biroq, ammo', definition: 'However means despite or not being influenced by something.', example: 'The test was hard; however, most students passed.', partOfSpeech: 'adverb' },
  { id: 'l19w11', word: 'injustice', translation: 'adolatsizlik', definition: 'Injustice is a lack of fairness or justice.', example: 'The workers protested against the injustice at the factory.', partOfSpeech: 'noun' },
  { id: 'l19w12', word: 'international', translation: 'xalqaro', definition: 'If something is international, it involves more than one country.', example: 'The school hosts students from many international backgrounds.', partOfSpeech: 'adjective' },
  { id: 'l19w13', word: 'lawyer', translation: 'advokat', definition: 'A lawyer works with the law and represents people in court.', example: 'The lawyer helped the family understand their rights.', partOfSpeech: 'noun' },
  { id: 'l19w14', word: 'mention', translation: 'tilga olmoq', definition: 'To mention something is to talk about it.', example: 'She mentioned that the bus was running late.', partOfSpeech: 'verb' },
  { id: 'l19w15', word: 'policy', translation: 'qoida, siyosat', definition: 'A policy is a rule.', example: "The library's policy is to keep quiet at all times.", partOfSpeech: 'noun' },
  { id: 'l19w16', word: 'social', translation: 'ijtimoiy', definition: 'If something is social, it is about many people in a community.', example: 'He enjoys social activities like parties and games.', partOfSpeech: 'adjective' },
  { id: 'l19w17', word: 'speech', translation: 'nutq', definition: 'A speech is something said to a group of people.', example: 'The principal gave a speech at the graduation.', partOfSpeech: 'noun' },
  { id: 'l19w18', word: 'staff', translation: 'xodimlar', definition: 'A staff is a group of people working together in a company.', example: 'The hotel staff were very kind to us.', partOfSpeech: 'noun' },
  { id: 'l19w19', word: 'toward', translation: 'tomon', definition: 'If you go toward something, you go closer to it.', example: 'The dog ran toward its owner across the yard.', partOfSpeech: 'preposition' },
  { id: 'l19w20', word: 'wood', translation: "yog'och", definition: 'Wood is the thing that trees are made of.', example: 'The table was made of strong, dark wood.', partOfSpeech: 'noun' },
];

const lesson19Grammar = {
  questions: [
    { id: 1, text: 'The old tree is still ___ after the storm.', options: ['alive', 'alives', 'aliveness', 'living alive'], correct: 0, explanation: '"Alive" is an adjective and does not take a plural -s.' },
    { id: 2, text: 'The dog buried a ___ in the yard.', options: ['bone', 'bones', 'boned', 'boning'], correct: 0, explanation: 'A singular noun is needed after "a": bone.' },
    { id: 3, text: 'Please don\'t ___ your sister while she studies.', options: ['bother', 'bothers', 'bothered', 'bothering'], correct: 0, explanation: 'The imperative uses the base verb after "don\'t".' },
    { id: 4, text: 'Choose the correct word order:', options: ['The captain steered the ship carefully.', 'The captain the ship steered carefully.', 'Steered the captain the ship carefully.', 'Carefully the captain steered the ship the.'], correct: 0, explanation: 'Subject + Verb + Object + Adverb is the normal order.' },
    { id: 5, text: 'At the ___ of the story, the hero returns home.', options: ['conclusion', 'conclude', 'concluding', 'concluded'], correct: 0, explanation: 'A noun is needed after "the": conclusion.' },
    { id: 6, text: 'I ___ that he will finish on time.', options: ['doubt', 'doubts', 'doubted', 'doubting'], correct: 0, explanation: '"I" takes the base verb in the present simple: doubt.' },
    { id: 7, text: 'Choose the correct question:', options: ['Do you want to explore the cave?', 'Does you want to explore the cave?', 'Do you wants to explore the cave?', 'Are you want to explore the cave?'], correct: 0, explanation: 'Use "Do" + subject + base verb in questions with "you".' },
    { id: 8, text: 'She speaks three ___ languages.', options: ['foreign', 'foreigner', 'foreignly', 'foreigns'], correct: 0, explanation: 'Adjectives like "foreign" go before the noun they describe.' },
    { id: 9, text: 'We ___ so glad to see you again.', options: ['were', 'was', 'did', 'does'], correct: 0, explanation: '"We" always uses "were" in the past with the verb to be.' },
    { id: 10, text: 'Choose the correct sentence:', options: ['It rained all day; however, we still had fun.', 'It rained all day, however we still had fun the.', 'However it rained all day we still had fun.', 'It rained all day however, we still, had fun.'], correct: 0, explanation: '"However" introduces a contrasting idea, usually set off by a semicolon or comma.' },
    { id: 11, text: 'They protested against the ___ in their town.', options: ['injustice', 'injustices', 'injust', 'unjustice'], correct: 0, explanation: 'A singular noun is needed after "the": injustice.' },
    { id: 12, text: 'This is an ___ competition with teams from many countries.', options: ['international', 'internationally', 'internationalize', 'internationals'], correct: 0, explanation: 'An adjective is needed before "competition": international.' },
    { id: 13, text: 'My aunt works as a ___ downtown.', options: ['lawyer', 'lawyers', 'law', 'lawyering'], correct: 0, explanation: 'A singular noun is needed after "a": lawyer.' },
    { id: 14, text: 'She ___ the movie during our conversation yesterday.', options: ['mentioned', 'mention', 'mentions', 'mentioning'], correct: 0, explanation: '"Yesterday" needs the past simple: mentioned.' },
    { id: 15, text: 'Choose the correct word order:', options: ['The school has a strict homework policy.', 'The school a strict homework policy has.', 'Has the school a strict homework policy.', 'A strict homework policy the school has.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 16, text: 'He is very ___ and loves meeting new people.', options: ['social', 'socially', 'socialize', 'socials'], correct: 0, explanation: 'An adjective is needed after "very": social.' },
    { id: 17, text: 'The mayor gave a long ___ at the ceremony.', options: ['speech', 'speeches', 'speeching', 'spoke'], correct: 0, explanation: 'A singular noun is needed after "a long": speech.' },
    { id: 18, text: 'The restaurant ___ works very hard every night.', options: ['staff', 'staffs', 'staffed', 'staffing'], correct: 0, explanation: '"Staff" is used here as a collective noun with a singular verb.' },
    { id: 19, text: 'The children ran ___ the playground.', options: ['toward', 'away', 'inside of', 'under'], correct: 0, explanation: '"Toward" describes moving closer to something.' },
    { id: 20, text: 'This chair is made of ___.', options: ['wood', 'woods', 'wooden', "wood's"], correct: 0, explanation: '"Wood" is an uncountable material noun here.' },
  ],
};

const lesson19Reading = {
  title: 'Shipwrecked',
  pages: [
    [
      { type: 'heading', text: 'Shipwrecked' },
      { type: 'p', text: "Simon Yates was a lawyer. He helped many people. However, he was not a very kind man. His policy was to help only rich people. He didn't bother about social injustice. He made a lot of money, but many people didn't like him. Even people on his staff didn't like him." },
      { type: 'p', text: "Simon had a very bad day. He did many things wrong and lost his job. Soon, he didn't have any money. His wife, Mrs. Yates, began to have doubts about him. Simon wanted to start a new life. He planned to leave the country." },
    ],
    [
      { type: 'p', text: 'He mentioned his plan to the captain of a ship. The captain was exploring the world. The captain felt bad for Simon and said, "I will take you to foreign countries." They left the next day.' },
      { type: 'p', text: 'Near the conclusion of their international trip, the weather turned bad. A wave pushed Simon off the boat. But he was alive. He swam toward an island. After a long time, he got there.' },
    ],
    [
      { type: 'p', text: 'At first he was upset. He was lost and alone. "I\'ll never go home again," he thought. He had a lot of problems, but he survived. He built a house in a tree. He lived on a diet of fish. He made tools from wood and bones. He made a cup to drink rainwater.' },
      { type: 'p', text: 'Slowly he learned to be happy on the island. He swam every day. He had trouble sometimes, but he always found a way to fix the problem. Life was simple. He liked it.' },
    ],
    [
      { type: 'p', text: 'Finally, people on a ship saw Simon on the island. They wanted to take him home. But Simon was happy. He gave them a long speech about life. He said he wanted to stay. He liked his new, simple life more than his old life.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['How the captain of a ship explored foreign places', 'How a lawyer stayed alive alone on an island', 'Why a man and a woman went on an international trip', 'Why it is a good policy to worry about social problems'], correct: 1 },
    { id: 2, text: 'Why does Simon not stay on the boat?', options: ['The staff do not like him.', 'He wants to swim toward an island.', 'A wave pushes him off the ship.', 'He does not like the diet of only fish.'], correct: 2 },
    { id: 3, text: 'How does Simon stay alive on the island?', options: ['He makes tools from bones and wood.', 'He makes clothes from a tree.', 'He eats food from the trees.', 'He uses a cup to drink seawater.'], correct: 0 },
    { id: 4, text: 'What did Simon mention in his speech?', options: ['He wanted to see Mrs. Yates.', 'He was unhappy to be alone.', 'He was glad to be on the island.', 'He had doubts about staying on the island.'], correct: 2 },
    { id: 5, text: "What happens near the conclusion of Simon's trip?", options: ['The weather turns bad and a wave pushes him off the ship.', 'He gives a long speech to the crew.', 'He becomes a lawyer again.', 'He returns home to Mrs. Yates.'], correct: 0 },
  ],
};

const lesson19Listening = {
  title: 'The New Student',
  script: "Last month, a new student named Elif joined our class. She was from a foreign country, and at first she didn't say much. However, our teacher mentioned that Elif's father was a lawyer who worked for an international company.\n\nSome students had doubt about being friends with someone so different from them. But I was glad to meet her. I didn't want to bother her with too many questions on her first day.\n\nDuring lunch, I asked Elif if she wanted to explore the school with me. As we walked toward the library, she told me about her old school's policy — everyone had to give a short speech once a month.\n\nI introduced her to the rest of the staff and my friends. Everyone treated her kindly, and by the conclusion of the week, she felt alive with energy and excitement about her new social life.\n\nOne day, Elif told us a story about her grandfather, who carved little animals out of wood and even collected small bones from the beach to make necklaces. She also mentioned that her uncle was once the captain of a small fishing boat. She said it wasn't fair when people back home once faced an injustice for their beliefs, and it made her want to help others.\n\nBy the end of the month, Elif was one of the most popular kids in our class.",
  questions: [
    { id: 1, text: 'Where was the new student, Elif, from?', options: ['A foreign country', 'The same town', 'A different school in the city', "She didn't say"], correct: 0 },
    { id: 2, text: "What did the teacher mention about Elif's father?", options: ['He was a lawyer for an international company', 'He was a captain of a ship', 'He was a teacher', 'He worked at the school'], correct: 0 },
    { id: 3, text: "What did Elif's old school require once a month?", options: ['A short speech', 'A test', 'A trip', 'A soccer game'], correct: 0 },
    { id: 4, text: 'How did Elif feel by the end of the week?', options: ['Alive with energy about her new social life', 'Still very shy', 'Ready to leave the school', 'Tired of her new friends'], correct: 0 },
    { id: 5, text: "What did Elif's grandfather make?", options: ['Little animals out of wood and necklaces from bones', 'Ships out of paper', 'Clothes from wool', 'Tools from metal'], correct: 0 },
  ],
};

const lesson20Words = [
  { id: 'l20w1', word: 'achieve', translation: 'erishmoq', definition: 'To achieve something is to successfully do it after trying hard.', example: 'I finally achieved my goal of finishing the race.', partOfSpeech: 'verb' },
  { id: 'l20w2', word: 'advise', translation: 'maslahat bermoq', definition: 'To advise someone is to tell them what to do.', example: 'My teacher always advises us to study a little every day.', partOfSpeech: 'verb' },
  { id: 'l20w3', word: 'already', translation: 'allaqachon', definition: 'If something happens already, it happens before a certain time.', example: 'It is already time for the movie to start.', partOfSpeech: 'adverb' },
  { id: 'l20w4', word: 'basic', translation: 'oddiy, asosiy', definition: 'If something is basic, it is very simple or easy.', example: 'We learned some basic cooking skills in class today.', partOfSpeech: 'adjective' },
  { id: 'l20w5', word: 'bit', translation: 'bir oz, ozgina', definition: 'A bit is a small amount of something.', example: 'I ate a bit of chocolate before I went to bed.', partOfSpeech: 'noun' },
  { id: 'l20w6', word: 'consider', translation: "o'ylab ko'rmoq", definition: 'To consider something means to think about it.', example: 'She considered moving to a new city for her job.', partOfSpeech: 'verb' },
  { id: 'l20w7', word: 'destroy', translation: 'vayron qilmoq', definition: 'To destroy means to damage something so badly that it cannot be used.', example: 'The storm destroyed several trees in the park.', partOfSpeech: 'verb' },
  { id: 'l20w8', word: 'entertain', translation: "ko'ngil ochmoq", definition: 'To entertain someone is to do something that they enjoy.', example: 'The clown entertained the children at the party.', partOfSpeech: 'verb' },
  { id: 'l20w9', word: 'extra', translation: "qo'shimcha", definition: 'If something is extra, it is more than what is needed.', example: 'The squirrel saved extra nuts for the winter.', partOfSpeech: 'adjective' },
  { id: 'l20w10', word: 'goal', translation: 'maqsad', definition: 'A goal is something you work toward.', example: 'Her goal was to become a doctor.', partOfSpeech: 'noun' },
  { id: 'l20w11', word: 'lie', translation: 'yolg\'on gapirmoq', definition: 'To lie is to say or write something untrue to deceive someone.', example: "It's never a good idea to lie to your parents.", partOfSpeech: 'verb' },
  { id: 'l20w12', word: 'meat', translation: "go'sht", definition: 'Meat is food made of animals.', example: 'This piece of meat tastes very good.', partOfSpeech: 'noun' },
  { id: 'l20w13', word: 'opinion', translation: 'fikr', definition: 'An opinion is a thought about a person or a thing.', example: 'She told me her honest opinion about my drawing.', partOfSpeech: 'noun' },
  { id: 'l20w14', word: 'real', translation: 'haqiqiy', definition: 'If something is real, it actually exists.', example: "The bracelet has a special mark, so I know it's real.", partOfSpeech: 'adjective' },
  { id: 'l20w15', word: 'reflect', translation: 'aks ettirmoq', definition: 'To reflect is when a surface sends back light, heat, sound, or an image.', example: 'Her face was reflected in the calm lake.', partOfSpeech: 'verb' },
  { id: 'l20w16', word: 'regard', translation: 'hisoblamoq', definition: 'To regard someone or something is to think of them in a certain way.', example: 'He regards his neighbor as a good friend.', partOfSpeech: 'verb' },
  { id: 'l20w17', word: 'serve', translation: 'xizmat qilmoq', definition: 'To serve someone is to give them food or drinks.', example: 'The waiter served us our food quickly.', partOfSpeech: 'verb' },
  { id: 'l20w18', word: 'vegetable', translation: 'sabzavot', definition: 'A vegetable is a plant used as food.', example: 'Carrots are my favorite vegetable.', partOfSpeech: 'noun' },
  { id: 'l20w19', word: 'war', translation: 'urush', definition: 'A war is a big fight between two groups of people.', example: 'The two kingdoms were at war for many years.', partOfSpeech: 'noun' },
  { id: 'l20w20', word: 'worth', translation: 'qiymatga ega', definition: 'If something is worth an amount of money, it costs that amount.', example: 'This old coin is worth a lot of money.', partOfSpeech: 'adjective' },
];

const lesson20Grammar = {
  questions: [
    { id: 1, text: 'She worked hard and ___ her goal.', options: ['achieved', 'achieve', 'achieves', 'achieving'], correct: 0, explanation: 'A past time story needs the past simple: achieved.' },
    { id: 2, text: 'I ___ you to study before the test.', options: ['advise', 'advises', 'advised', 'advising'], correct: 0, explanation: '"I" takes the base verb in the present simple: advise.' },
    { id: 3, text: 'Choose the correct sentence:', options: ['We have already finished our homework.', 'We already have finished our homework the.', 'Already we have finished our homework.', 'We have finished already our homework.'], correct: 0, explanation: '"Already" usually goes between "have" and the past participle.' },
    { id: 4, text: 'This is a ___ math problem.', options: ['basic', 'basical', 'basically', 'basics'], correct: 0, explanation: 'Adjectives like "basic" go before the noun they describe.' },
    { id: 5, text: 'Can I have a ___ of your sandwich?', options: ['bit', 'bits', 'bitten', 'biting'], correct: 0, explanation: 'A singular noun is needed after "a": bit.' },
    { id: 6, text: 'He is ___ a new job offer.', options: ['considering', 'consider', 'considers', 'considered'], correct: 0, explanation: '"Is" needs the -ing form to make the present continuous.' },
    { id: 7, text: 'Choose the correct word order:', options: ['The storm destroyed the old barn.', 'The storm the old barn destroyed.', 'Destroyed the storm the old barn.', 'The old barn the storm destroyed.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 8, text: 'The magician ___ the children at the party.', options: ['entertained', 'entertain', 'entertains', 'entertaining'], correct: 0, explanation: 'This past-time story needs the past simple: entertained.' },
    { id: 9, text: 'Do you have any ___ pencils I can borrow?', options: ['extra', 'extras', 'extraly', 'extraness'], correct: 0, explanation: 'Adjectives like "extra" go before the noun they describe.' },
    { id: 10, text: 'Scoring a goal is her main ___ this season.', options: ['goal', 'goals', 'goaled', 'goaling'], correct: 0, explanation: 'A singular noun is needed after "her main": goal.' },
    { id: 11, text: 'He ___ to his mom about breaking the vase.', options: ['lied', 'lie', 'lies', 'lying'], correct: 0, explanation: 'A past-time story needs the past simple: lied.' },
    { id: 12, text: "She doesn't eat ___.", options: ['meat', 'meats', 'meated', 'meating'], correct: 0, explanation: '"Meat" is an uncountable noun and has no plural form here.' },
    { id: 13, text: 'Choose the correct word order:', options: ['I gave my honest opinion about the movie.', 'I my honest opinion about the movie gave.', 'Gave I my honest opinion about the movie.', 'About the movie I gave my honest opinion the.'], correct: 0, explanation: 'Subject + Verb + Object + Place phrase is the normal order.' },
    { id: 14, text: 'Is that a ___ diamond or a fake one?', options: ['real', 'really', 'reality', 'realize'], correct: 0, explanation: 'An adjective is needed before "diamond": real.' },
    { id: 15, text: 'The mountains ___ perfectly in the lake.', options: ['reflect', 'reflects', 'reflected', 'reflecting'], correct: 0, explanation: '"Mountains" is plural, so no -s on the verb.' },
    { id: 16, text: 'I ___ him as one of my best friends.', options: ['regard', 'regards', 'regarded', 'regarding'], correct: 0, explanation: '"I" takes the base verb in the present simple: regard.' },
    { id: 17, text: 'The restaurant ___ dinner until 10 pm.', options: ['serves', 'serve', 'served', 'serving'], correct: 0, explanation: '"The restaurant" is singular, so add -s: serves.' },
    { id: 18, text: 'Broccoli is a healthy ___.', options: ['vegetable', 'vegetables', 'vegetabled', 'vegetableing'], correct: 0, explanation: 'A singular noun is needed after "a": vegetable.' },
    { id: 19, text: 'The two countries were at ___ for many years.', options: ['war', 'wars', 'warred', 'warring'], correct: 0, explanation: 'This is the fixed phrase "at war".' },
    { id: 20, text: 'This painting is ___ a lot of money.', options: ['worth', 'worthy', 'worthful', 'worthly'], correct: 0, explanation: '"Worth" is followed directly by an amount of money.' },
  ],
};

const lesson20Reading = {
  title: 'The Seven Cities of Gold',
  pages: [
    [
      { type: 'heading', text: 'The Seven Cities of Gold' },
      { type: 'p', text: 'Many years ago, a Spanish officer named Coronado heard the story of seven great cities. "The walls of these cities are made of gold," his friends told him. "The people eat meat from golden plates and dress in nice clothes," they said. They called these cities the Seven Cities of Gold. Were the cities real? Coronado never considered asking his friends.' },
      { type: 'p', text: 'Coronado thought to himself, "The things in these cities must be worth a lot of money." So he went to find the Seven Cities of Gold. He took along three hundred men, many horses, and extra food. They headed west. Coronado wanted to achieve his goal very badly.' },
    ],
    [
      { type: 'p', text: 'Coronado and his men rode for many days. Then they saw some cities. "We found the Seven Cities of Gold!" his men yelled, but Coronado wasn\'t happy. He had a different opinion. "These can\'t be the Seven Cities of Gold," he said. "Look, they\'re made of dirt!"' },
      { type: 'p', text: "Coronado was right. The cities weren't bright and golden. They were dirty and brown. The people didn't eat meat from golden plates. They ate vegetables from regular bowls. They wore the most basic clothes." },
    ],
    [
      { type: 'p', text: 'Coronado regarded the cities as ugly places. "What happened to the cities of gold?" he thought. "Did someone destroy them? Was there a war? Did someone already come and take the gold?"' },
      { type: 'p', text: 'That night, the people of the cities entertained Coronado and his men and served them food. They advised Coronado to go home. "There is no gold here," they told him. Coronado was unhappy. Did his friends lie to him?' },
    ],
    [
      { type: 'p', text: 'He left the next morning. He looked back at the cities one more time. The sun reflected light on the dirt houses. Coronado thought he saw a bit of gold. Were his friends right after all? "No," he told himself. "It\'s just the sun." Then he turned away and went home.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['A man who achieves his goal', 'An officer who looks for cities of gold', 'Men who destroy cities', 'People who entertain and serve'], correct: 1 },
    { id: 2, text: 'What did Coronado NOT consider asking his friends?', options: ['How much money the cities were worth', 'If the people of the cities ate meat', 'If the Seven Cities of Gold were real', 'How much extra food to take west'], correct: 2 },
    { id: 3, text: 'Why was Coronado unhappy when he saw the cities?', options: ['They were not made of gold.', 'They were at war with each other.', 'Someone destroyed them.', 'He had already been to the cities.'], correct: 0 },
    { id: 4, text: 'What did the people of the cities advise Coronado to do?', options: ['Eat basic vegetables', 'Go home', 'Regard the cities as dirty places', 'Talk about his opinion of the cities'], correct: 1 },
    { id: 5, text: 'What did Coronado do when he thought he saw a bit of gold on the houses?', options: ['He told himself it was just the sun and went home.', 'He ran back to search the houses for gold.', 'He called his men to search the town again.', 'He asked the people for the exact location of the gold.'], correct: 0 },
  ],
};

const lesson20Listening = {
  title: 'The School Play',
  script: "This year, our teacher set a goal for the class: to put on a play for the whole school. At first, it seemed basic — just a bit of singing and a short story. But soon we realized it would take a lot of work to achieve something good.\n\nOur teacher advised us to practice every day after school. Some students considered quitting because it felt too hard, but nobody wanted to lie and say they didn't care about the play.\n\nWe needed extra chairs for the audience, so the school staff helped us set up the hall. My friend Alex was worried the costumes wouldn't look real, so he worked hard to make them look great, using cardboard that could reflect light like real armor.\n\nOn the day of the play, our teacher served snacks to the whole audience before the show. We wanted to entertain everyone and make them smile. In my opinion, the best part of the play was the food scene, where actors passed around fake meat and vegetables at a royal dinner table.\n\nThe play told a story about two kingdoms that were once at war. One army almost tried to destroy the other's castle, but in the end, the two kingdoms learned to live in peace. By the end, everyone in the audience already knew the lesson: peace is worth more than any treasure. Our teacher regarded it as one of the best plays the school had ever had.",
  questions: [
    { id: 1, text: "What was the teacher's goal for the class?", options: ['To put on a school play', 'To win a sports match', 'To write a book', 'To plant a garden'], correct: 0 },
    { id: 2, text: 'Why did the staff help set up the hall?', options: ['Extra chairs were needed for the audience', 'The hall was too small', 'The chairs were broken', 'The play was cancelled'], correct: 0 },
    { id: 3, text: 'What did Alex work hard on?', options: ['Making the costumes look real', 'Writing the songs', 'Cooking the snacks', 'Building extra chairs'], correct: 0 },
    { id: 4, text: "What happened in the play's story?", options: ['Two kingdoms were at war and learned to live in peace', 'A dragon destroyed a village', 'A king lost his crown', 'Two friends went on a trip'], correct: 0 },
    { id: 5, text: 'What lesson did the audience learn from the play?', options: ['Peace is worth more than any treasure', 'Money is the most important thing', 'War always brings victory', 'Meat is better than vegetables'], correct: 0 },
  ],
};

const lesson21Words = [
  { id: 'l21w1', word: 'appear', translation: "ko'rinmoq", definition: 'To appear is to seem.', example: 'She appeared happy when she saw her friends.', partOfSpeech: 'verb' },
  { id: 'l21w2', word: 'base', translation: 'asos, tag qism', definition: 'The base is the bottom of something.', example: 'The base of the lamp is very wide and heavy.', partOfSpeech: 'noun' },
  { id: 'l21w3', word: 'brain', translation: 'miya', definition: 'The brain is the organ in your head that lets you think.', example: 'You need to use your brain to solve this puzzle.', partOfSpeech: 'noun' },
  { id: 'l21w4', word: 'career', translation: 'kasb, martaba', definition: 'A career is a job that you do for a large part of your life.', example: 'She had a long and successful career as a teacher.', partOfSpeech: 'noun' },
  { id: 'l21w5', word: 'clerk', translation: 'sotuvchi, kotib', definition: 'A clerk is a type of worker. Clerks in a store help customers.', example: 'The store clerk helped me find the right size.', partOfSpeech: 'noun' },
  { id: 'l21w6', word: 'effort', translation: "harakat, kuch-g'ayrat", definition: 'Effort is hard work or an attempt to do something.', example: 'He put a lot of effort into finishing the project.', partOfSpeech: 'noun' },
  { id: 'l21w7', word: 'enter', translation: 'kirmoq', definition: 'To enter a place is to go into it.', example: 'We entered the museum through the big front doors.', partOfSpeech: 'verb' },
  { id: 'l21w8', word: 'excellent', translation: "a'lo, ajoyib", definition: 'When something is excellent, it is very good.', example: 'She got an excellent score on her math test.', partOfSpeech: 'adjective' },
  { id: 'l21w9', word: 'hero', translation: 'qahramon', definition: 'A hero is a brave person who does things to help others.', example: 'The firefighter was a hero to everyone in town.', partOfSpeech: 'noun' },
  { id: 'l21w10', word: 'hurry', translation: 'shoshilmoq', definition: 'To hurry is to do something quickly.', example: 'I hurried to catch the last bus home.', partOfSpeech: 'verb' },
  { id: 'l21w11', word: 'inform', translation: 'xabar bermoq', definition: 'To inform someone is to tell them about something.', example: 'The teacher informed us about the field trip.', partOfSpeech: 'verb' },
  { id: 'l21w12', word: 'later', translation: 'keyinroq', definition: 'Later means after the present, expected, or usual time.', example: 'She arrived a little later than expected.', partOfSpeech: 'adverb' },
  { id: 'l21w13', word: 'leave', translation: "jo'nab ketmoq", definition: 'To leave means to go away from someone or something.', example: 'He packed his bag and was ready to leave for home.', partOfSpeech: 'verb' },
  { id: 'l21w14', word: 'locate', translation: 'joyini topmoq', definition: 'To locate something is to find it.', example: 'I could not locate my keys anywhere in the house.', partOfSpeech: 'verb' },
  { id: 'l21w15', word: 'nurse', translation: 'hamshira', definition: 'A nurse is a person who helps sick people in the hospital.', example: 'A kind nurse checked on me every hour.', partOfSpeech: 'noun' },
  { id: 'l21w16', word: 'operation', translation: 'operatsiya', definition: 'An operation is when a doctor replaces or removes something in the body.', example: "The operation on his knee went very well.", partOfSpeech: 'noun' },
  { id: 'l21w17', word: 'pain', translation: "og'riq", definition: 'Pain is the feeling that you have when you are hurt.', example: 'She felt a little pain in her arm after the fall.', partOfSpeech: 'noun' },
  { id: 'l21w18', word: 'refuse', translation: 'rad etmoq', definition: 'To refuse something is to say "no" to it.', example: 'He refused to give up, even when it got hard.', partOfSpeech: 'verb' },
  { id: 'l21w19', word: 'though', translation: "garchi, -sa ham", definition: 'Though is used when the second idea makes the first seem surprising.', example: 'Though it was raining, we still went for a walk.', partOfSpeech: 'conjunction' },
  { id: 'l21w20', word: 'various', translation: 'turli, xilma-xil', definition: 'If something is various, there are many types of it.', example: 'The shop sells various kinds of fruit.', partOfSpeech: 'adjective' },
];

const lesson21Grammar = {
  questions: [
    { id: 1, text: 'The stars ___ in the sky at night.', options: ['appear', 'appears', 'appearing', 'appeared to'], correct: 0, explanation: '"The stars" is plural, so no -s on the verb.' },
    { id: 2, text: 'The ___ of the mountain was covered in snow.', options: ['base', 'bases', 'based', 'basing'], correct: 0, explanation: 'A singular noun is needed after "the": base.' },
    { id: 3, text: 'You need to use your ___ to solve this puzzle.', options: ['brain', 'brains', 'brained', 'braining'], correct: 0, explanation: 'A singular noun is needed after "your": brain.' },
    { id: 4, text: 'Choose the correct word order:', options: ['She had a long career as a nurse.', 'She a long career as a nurse had.', 'Had she a long career as a nurse.', 'As a nurse she had a long career the.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 5, text: 'The ___ helped me find the right size.', options: ['clerk', 'clerks', 'clerked', 'clerking'], correct: 0, explanation: 'A singular noun is needed after "the": clerk.' },
    { id: 6, text: 'He put a lot of ___ into his homework.', options: ['effort', 'efforts', 'efforted', 'efforting'], correct: 0, explanation: '"Effort" is uncountable here, so it has no plural -s.' },
    { id: 7, text: 'Please ___ your name here.', options: ['enter', 'enters', 'entered', 'entering'], correct: 0, explanation: 'A polite imperative uses the base verb: enter.' },
    { id: 8, text: 'That was an ___ performance!', options: ['excellent', 'excellently', 'excellence', 'excel'], correct: 0, explanation: 'Adjectives like "excellent" go before the noun they describe.' },
    { id: 9, text: 'Choose the correct word order:', options: ['The firefighter became a hero that day.', 'The firefighter a hero became that day.', 'Became the firefighter a hero that day.', 'That day the firefighter a hero became.'], correct: 0, explanation: 'Subject + Verb + Object + Time is the normal order.' },
    { id: 10, text: "We need to ___ or we'll miss the bus.", options: ['hurry', 'hurries', 'hurried', 'hurrying'], correct: 0, explanation: 'The base verb follows "need to": hurry.' },
    { id: 11, text: 'The teacher ___ us about the trip yesterday.', options: ['informed', 'inform', 'informs', 'informing'], correct: 0, explanation: '"Yesterday" needs the past simple: informed.' },
    { id: 12, text: 'Choose the correct sentence:', options: ['We can talk about it later.', 'We can talk about it the later.', 'Later we can about it talk.', 'We can about it talk later.'], correct: 0, explanation: '"Later" usually comes at the end of the sentence.' },
    { id: 13, text: 'What time does the train ___?', options: ['leave', 'leaves', 'left', 'leaving'], correct: 0, explanation: 'A "does" question needs the base verb: leave.' },
    { id: 14, text: "I couldn't ___ my phone this morning.", options: ['locate', 'locates', 'located', 'locating'], correct: 0, explanation: 'The base verb follows "couldn\'t": locate.' },
    { id: 15, text: 'The ___ checked on the patient every hour.', options: ['nurse', 'nurses', 'nursed', 'nursing'], correct: 0, explanation: 'A singular noun is needed after "the": nurse.' },
    { id: 16, text: 'The doctor said the ___ was a success.', options: ['operation', 'operations', 'operated', 'operating'], correct: 0, explanation: 'A singular noun is needed after "the": operation.' },
    { id: 17, text: 'She felt a sharp ___ in her leg.', options: ['pain', 'pains', 'pained', 'paining'], correct: 0, explanation: 'A singular noun is needed after "a sharp": pain.' },
    { id: 18, text: 'He ___ to answer any questions.', options: ['refused', 'refuse', 'refuses', 'refusing'], correct: 0, explanation: 'A past-time story needs the past simple: refused.' },
    { id: 19, text: 'Choose the correct sentence:', options: ['Though it was cold, we went outside.', 'It was cold though, we went outside the.', 'Though we went outside it was cold the.', 'We though went outside it was cold.'], correct: 0, explanation: '"Though" introduces a surprising contrast at the start of a sentence.' },
    { id: 20, text: 'The store sells ___ kinds of shoes.', options: ['various', 'variously', 'variety', 'varied to'], correct: 0, explanation: 'Adjectives like "various" go before the noun they describe.' },
  ],
};

const lesson21Reading = {
  title: 'Katy',
  pages: [
    [
      { type: 'heading', text: 'Katy' },
      { type: 'p', text: "I first met 8-year-old Katy on a rainy afternoon. I was a nurse at a hospital. The clerk at the desk told me about Katy. She was there because she felt a lot of pain. The doctors located a problem at the base of her brain. I knew she was special, even before she got better. I'll always remember Katy as a hero." },
      { type: 'p', text: "When I entered Katy's room, she was not in her bed. She was in a chair next to Tommy, a little boy. Though Katy did not feel well, she was playing with Tommy and his toys. It took a lot of effort for her just to sit in the chair. But she played with Tommy because it made him happy." },
    ],
    [
      { type: 'p', text: 'Katy was always smiling and never appeared to be in pain. She refused to just lie in bed. One day I found her painting a picture. Later, she gave it to one of the older patients. Another day she went outside to get flowers for another sick little girl. Katy made everyone smile.' },
    ],
    [
      { type: 'p', text: "The doctors hurried to fix the problem in Katy's brain. The operation was successful! The doctors informed the hospital staff of the good news. Katy was fine. She soon felt excellent. She got better and was able to leave the hospital a month later." },
    ],
    [
      { type: 'p', text: 'I have had a long career as a nurse. I have met many patients. However, I have never met another girl like Katy. Even after she got well, she still came to the hospital. She played various games with the young patients. She read many books to the older patients. Katy\'s kind heart helped her get better so quickly. She is a hero to me and everyone else at the hospital.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['A clerk with a brain problem', 'A little girl who is a hero', 'A little girl who wants a career as a nurse', 'Tommy and his various toys'], correct: 1 },
    { id: 2, text: 'Why does everyone like Katy?', options: ['She does good things, even though she is in pain.', "She enters the hospital and saves a patient's life.", 'She has a problem at the base of her brain.', 'She hurries to help the clerk at his desk.'], correct: 0 },
    { id: 3, text: 'Which of the following is true at the end of the story?', options: ['Katy refuses to go back to the hospital.', 'Katy makes an effort to become a nurse.', 'Katy feels excellent but goes back to the hospital to see other patients.', 'Katy informs other patients of how to get better.'], correct: 2 },
    { id: 4, text: 'How did the nurse know Katy did not feel well?', options: ['Katy appeared to be sad.', 'Katy had to make an effort just to sit in a chair.', "The nurse located a problem in Katy's brain.", 'The nurse asked Katy how she felt.'], correct: 1 },
    { id: 5, text: 'What does Katy do to help people?', options: ['She paints pictures and picks flowers for other sick patients.', 'She performs the operations herself.', 'She works as a clerk at the front desk.', 'She refuses to talk to anyone at the hospital.'], correct: 0 },
  ],
};

const lesson21Listening = {
  title: "Grandpa's Story",
  script: "My grandpa had a long career as a doctor. He once told me a story about the day he became a hero. A young boy named Danny entered the hospital late one night with terrible pain in his leg.\n\nMy grandpa said the base of the problem was hard to locate at first. Nobody knew what was wrong, so the whole team had to hurry to figure it out. Grandpa used his brain and years of experience to study the X-rays carefully.\n\nAfter a while, he informed the family that Danny needed an operation. The boy's parents were scared, though a kind nurse stayed by their side the whole time to comfort them.\n\nThe operation went very well. The nurse said it was an excellent result, and Danny would leave the hospital just a few days later. A young clerk at the front desk even brought the family flowers to celebrate.\n\nGrandpa said Danny's parents did not refuse to thank the whole hospital staff, and they put a lot of effort into showing their gratitude. Grandpa said he has heard various kind stories like this over the years, but he says this one will always appear first in his mind whenever someone asks about his best memory.",
  questions: [
    { id: 1, text: "What was Grandpa's career?", options: ['A doctor', 'A clerk', 'A teacher', 'A nurse'], correct: 0 },
    { id: 2, text: 'Who entered the hospital with pain in his leg?', options: ['Danny, a young boy', "Grandpa's brother", 'A hospital clerk', "A nurse's son"], correct: 0 },
    { id: 3, text: 'What did Danny need?', options: ['An operation', 'New shoes', 'A different hospital', 'A vacation'], correct: 0 },
    { id: 4, text: 'How did the operation go?', options: ['It went very well; the result was excellent', 'It failed the first time', 'It was canceled', 'It took a whole year'], correct: 0 },
    { id: 5, text: "What did Danny's parents do after the operation?", options: ['They thanked the whole hospital staff with a lot of effort', 'They refused to speak to anyone', 'They left without saying goodbye', 'They complained about the nurse'], correct: 0 },
  ],
};

export const lessons17to21 = [
  {
    id: 'essential-lesson-17',
    title: 'Lesson 17',
    words: lesson17Words,
    grammar: lesson17Grammar,
    reading: lesson17Reading,
    listening: lesson17Listening,
  },
  {
    id: 'essential-lesson-18',
    title: 'Lesson 18',
    words: lesson18Words,
    grammar: lesson18Grammar,
    reading: lesson18Reading,
    listening: lesson18Listening,
  },
  {
    id: 'essential-lesson-19',
    title: 'Lesson 19',
    words: lesson19Words,
    grammar: lesson19Grammar,
    reading: lesson19Reading,
    listening: lesson19Listening,
  },
  {
    id: 'essential-lesson-20',
    title: 'Lesson 20',
    words: lesson20Words,
    grammar: lesson20Grammar,
    reading: lesson20Reading,
    listening: lesson20Listening,
  },
  {
    id: 'essential-lesson-21',
    title: 'Lesson 21',
    words: lesson21Words,
    grammar: lesson21Grammar,
    reading: lesson21Reading,
    listening: lesson21Listening,
  },
];
