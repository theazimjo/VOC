// Units 2-6 of "Essential 3000", sourced from "4000 Essential English Words 1"
// by Paul Nation (Compass Publishing) via pdftotext extraction of
// src/assets/data/essential english 1.pdf. Words, definitions, example
// sentences, and reading stories are transcribed from the book (each
// unit's final reading question lost its answer options to an OCR/layout
// gap in the source PDF, so those four options are original, following the
// same pattern used for Lesson 1). Uzbek translations are original. The
// listening dialogues are original narration written to reuse each unit's
// 20 target words. The grammar-stage exercises are original, following the
// style of Lesson 1's `lesson1Grammar` in essential3000.js.

const unit2Words = [
  { id: 'l2w1', word: 'adventure', translation: 'sarguzasht', definition: 'An adventure is a fun or exciting thing that you do.', example: 'Riding in the rough water was an adventure.', partOfSpeech: 'noun' },
  { id: 'l2w2', word: 'approach', translation: 'yaqinlashmoq', definition: 'To approach something means to move close to it.', example: 'The boy approached his school.', partOfSpeech: 'verb' },
  { id: 'l2w3', word: 'carefully', translation: 'ehtiyotkorlik bilan', definition: 'Carefully means with great attention, especially to detail or safety.', example: 'The baby carefully climbed down the stairs.', partOfSpeech: 'adverb' },
  { id: 'l2w4', word: 'chemical', translation: 'kimyoviy modda', definition: 'A chemical is something that scientists use in chemistry.', example: 'The scientist mixed the chemicals.', partOfSpeech: 'noun' },
  { id: 'l2w5', word: 'create', translation: 'yaratmoq', definition: 'To create means to make something new.', example: 'She created an igloo from blocks of snow.', partOfSpeech: 'verb' },
  { id: 'l2w6', word: 'evil', translation: 'yovuz', definition: 'Evil describes something or someone bad or cruel, not good.', example: 'The evil figure scared us all.', partOfSpeech: 'adjective' },
  { id: 'l2w7', word: 'experiment', translation: 'tajriba', definition: 'An experiment is a test that you do to see what will happen.', example: 'The student did an experiment in science class.', partOfSpeech: 'noun' },
  { id: 'l2w8', word: 'kill', translation: "o'ldirmoq", definition: 'To kill someone or something is to make them die.', example: 'I killed the fly with a flyswatter.', partOfSpeech: 'verb' },
  { id: 'l2w9', word: 'laboratory', translation: 'laboratoriya', definition: 'A laboratory is a room where a scientist works.', example: 'My mother works in a laboratory.', partOfSpeech: 'noun' },
  { id: 'l2w10', word: 'laugh', translation: 'kulgi', definition: 'Laugh is the sound made when someone is happy or a funny thing occurs.', example: 'The sound of their laugh filled the room.', partOfSpeech: 'noun' },
  { id: 'l2w11', word: 'loud', translation: 'baland (ovozli)', definition: 'If a sound is loud, it is strong and very easy to hear.', example: "The man's voice was so loud that we all could hear him.", partOfSpeech: 'adjective' },
  { id: 'l2w12', word: 'nervous', translation: 'asabiylashgan', definition: 'When a person is nervous, they think something bad will happen.', example: 'The boy became nervous when he heard the news.', partOfSpeech: 'adjective' },
  { id: 'l2w13', word: 'noise', translation: 'shovqin', definition: 'A noise is an unpleasant sound.', example: 'The crying baby made a loud noise.', partOfSpeech: 'noun' },
  { id: 'l2w14', word: 'project', translation: 'loyiha', definition: 'A project is a type of work that you do for school or a job.', example: 'His afternoon work project was to paint the room green.', partOfSpeech: 'noun' },
  { id: 'l2w15', word: 'scare', translation: "qo'rqitmoq", definition: 'To scare someone is to make them feel afraid.', example: 'My uncle was scared by what he saw in the room.', partOfSpeech: 'verb' },
  { id: 'l2w16', word: 'secret', translation: 'sir', definition: 'A secret is something that you do not tell other people.', example: 'The two boys were sharing a secret.', partOfSpeech: 'noun' },
  { id: 'l2w17', word: 'shout', translation: 'qichqirmoq', definition: 'To shout is to say something loudly.', example: 'My boss shouted at me because I was late for work.', partOfSpeech: 'verb' },
  { id: 'l2w18', word: 'smell', translation: 'hidlamoq', definition: 'To smell something means to use your nose to sense it.', example: 'The two friends smelled the flower.', partOfSpeech: 'verb' },
  { id: 'l2w19', word: 'terrible', translation: 'dahshatli', definition: 'If something is terrible, it is very bad.', example: 'The way he treated his classmate was terrible.', partOfSpeech: 'adjective' },
  { id: 'l2w20', word: 'worse', translation: 'yomonroq', definition: 'If something is worse, it is of poorer quality than another thing.', example: 'Business was worse this month than last month.', partOfSpeech: 'adjective' },
];

const unit2Grammar = {
  questions: [
    { id: 1, text: 'Choose the correct word order:', options: ['Sailing to a new island was a great adventure.', 'Sailing to a new island a great adventure was.', 'A great adventure sailing to a new island was.', 'Was sailing a great adventure to a new island.'], correct: 0, explanation: 'Subject + Verb (was) + Complement is the normal order.' },
    { id: 2, text: 'The cat ___ the door slowly.', options: ['approach', 'approaches', 'are approaching', 'do approach'], correct: 1, explanation: '"The cat" is singular, so add -s: approaches.' },
    { id: 3, text: 'Choose the correct word order:', options: ['She carefully opened the box.', 'She opened carefully the box.', 'Carefully she the box opened.', 'She opened the box carefully carefully.'], correct: 0, explanation: 'The adverb "carefully" usually goes right before the main verb.' },
    { id: 4, text: 'There ___ dangerous chemicals in that room.', options: ['is', 'are', 'does', 'do'], correct: 1, explanation: '"Chemicals" is plural, so use "are".' },
    { id: 5, text: 'Choose the correct question:', options: ['Does she create beautiful art?', 'Do she create beautiful art?', 'Is she create beautiful art?', 'Does she creates beautiful art?'], correct: 0, explanation: 'Use "Does" + subject + base verb: Does she create...?' },
    { id: 6, text: 'The old house looked ___ at night.', options: ['evil', 'evils', 'is evil', 'does evil'], correct: 0, explanation: 'Adjectives like "evil" do not take -s and follow the linking verb directly.' },
    { id: 7, text: 'Choose the correct word order:', options: ['The scientist did a new experiment.', 'The scientist a new experiment did.', 'Did the scientist a new experiment.', 'A new experiment the scientist did.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order: The scientist (S) did (V) a new experiment (O).' },
    { id: 8, text: 'Mosquitoes sometimes ___ people with disease.', options: ['kill', 'kills', 'is killing', 'was kill'], correct: 0, explanation: '"Mosquitoes" is plural, so no -s: they kill.' },
    { id: 9, text: 'Choose the correct word order:', options: ['The doctor works in a large laboratory.', 'The doctor in a large laboratory works.', 'Works the doctor in a large laboratory.', 'In a large laboratory the doctor works.'], correct: 0, explanation: 'Subject + Verb + Place phrase is the normal order.' },
    { id: 10, text: "Her ___ made everyone in the room smile.", options: ['laugh', 'laughs', 'is laugh', 'do laugh'], correct: 0, explanation: '"Laugh" here is a singular noun, the subject of the sentence.' },
    { id: 11, text: 'The music at the party ___ too loud.', options: ['is', 'are', 'do', 'does'], correct: 0, explanation: '"The music" is singular/uncountable, so use "is".' },
    { id: 12, text: 'Choose the correct word order:', options: ['He felt nervous before the exam.', 'He felt before the exam nervous.', 'Nervous he felt before the exam.', 'Before the exam felt he nervous.'], correct: 0, explanation: 'Subject + Verb (felt) + Adjective + Time phrase is the normal order.' },
    { id: 13, text: 'The alarm ___ a strange noise every morning.', options: ['make', 'makes', 'is make', 'do makes'], correct: 1, explanation: '"The alarm" is singular, so add -s: makes.' },
    { id: 14, text: 'Choose the correct word order:', options: ['Our team finished the science project.', 'Our team the science project finished.', 'Finished our team the science project.', 'The science project our team finished.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 15, text: 'Choose the correct question:', options: ['Did the movie scare you?', 'Does the movie scared you?', 'Was the movie scare you?', 'Do the movie scared you?'], correct: 0, explanation: 'Use "Did" + subject + base verb for past questions: Did...scare?' },
    { id: 16, text: 'They ___ not tell anyone their secret.', options: ['do', 'does', 'is', 'are'], correct: 0, explanation: '"They" uses "do not" (don\'t) + base verb.' },
    { id: 17, text: 'Choose the correct word order:', options: ['The coach shouted at the players.', 'The coach at the players shouted.', 'Shouted the coach at the players.', 'At the players the coach shouted.'], correct: 0, explanation: 'Subject + Verb + Prepositional phrase is the normal order.' },
    { id: 18, text: 'I ___ the fresh bread from the kitchen.', options: ['smell', 'smells', 'is smell', 'does smell'], correct: 0, explanation: '"I" uses the base verb: I smell.' },
    { id: 19, text: 'The weather was ___ than we expected.', options: ['terrible', 'terribles', 'is terrible', 'does terrible'], correct: 0, explanation: 'Adjectives like "terrible" follow the linking verb directly, with no -s.' },
    { id: 20, text: 'Today the traffic is even ___ than yesterday.', options: ['worse', 'worst', 'bad', 'more bad'], correct: 0, explanation: '"Worse" is the comparative form used to compare two things.' },
  ],
};

const unit2Reading = {
  title: 'The Laboratory',
  pages: [
    [
      { type: 'heading', text: 'The Laboratory' },
      { type: 'p', text: "Mia's father had a laboratory, but she had no idea what was in it. Her dad always closed and locked the door when he went in. She knew that he used it to do projects for work. He never told Mia what these projects were." },
      { type: 'p', text: 'One night, Mia approached the door to the laboratory. She stopped and thought, "I wonder what crazy experiment he is doing now." Suddenly, she heard a loud noise. It sounded like an evil laugh. The noise scared her, so she walked quickly back to her room.' },
    ],
    [
      { type: 'p', text: 'The next night, her friend Liz came to her house. When Liz arrived, Mia told her about the night before. "Oh, it was terrible," she said.' },
      { type: 'p', text: '"Why don\'t we see what is in there?" Liz asked. "It will be a fun adventure!" Mia felt nervous about going into her father\'s laboratory, but she agreed. As always, the door was locked. They waited until Mia\'s father left the laboratory to eat dinner. "He didn\'t lock the door!" Liz said. "Let\'s go."' },
    ],
    [
      { type: 'p', text: 'The laboratory was dark. The girls walked down the stairs carefully. Mia smelled strange chemicals. What terrible thing was her father creating?' },
      { type: 'p', text: 'Suddenly, they heard an evil laugh. It was even worse than the one Mia heard the night before. What if a monster was going to kill them? Mia had to do something. She shouted for help.' },
    ],
    [
      { type: 'p', text: 'Mia\'s father ran into the room and turned on the lights. "Oh, no," he said. "You must have learned my secret."' },
      { type: 'p', text: '"Your monster tried to kill us," Mia said.' },
      { type: 'p', text: '"Monster?" he asked. "You mean this?" He had a pretty doll in his hands. The doll laughed. The laugh didn\'t sound so evil anymore. "I made this for your birthday. I wanted to give it to you then, but you can have it now. I hope you like it!"' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ["A girl's terrible experiment", 'A secret that two girls have', "A girl who gets nervous about what's in a laboratory", 'A man who creates chemicals'], correct: 2 },
    { id: 2, text: 'What scares Mia when she approaches the door?', options: ['The room is very dark.', 'She hears a person shout.', 'She smells fire.', 'She hears a loud noise.'], correct: 3 },
    { id: 3, text: 'What is true of Mia in the story?', options: ['A monster kills her friend.', 'She does not like adventures.', 'She always locks the door of her room.', "Her birthday has not come yet."], correct: 3 },
    { id: 4, text: "What project was Mia's father working on?", options: ['A doll to give to Mia for her birthday', 'A way to keep the door closed', 'A chemical that smells worse than fire', 'A monster that had an evil laugh'], correct: 0 },
    { id: 5, text: 'When did Mia and Liz go into the laboratory?', options: ['While her father was eating dinner', 'In the middle of the night while everyone slept', 'Right after Mia heard the evil laugh alone', 'On Mia\'s birthday, before the doll was ready'], correct: 0 },
  ],
};

const unit2Listening = {
  title: "A Noisy Secret",
  script: "Ben had a secret project in his garage, and he worked on it carefully every evening. His sister Kate began to approach the garage door one night because she heard a loud noise inside. It sounded terrible, almost like an evil laugh, and it made her nervous.\n\nKate wanted to create a plan to find out what was going on, so she decided to smell the air near the door first — it smelled like chemicals, like a small laboratory. She imagined the worst: maybe Ben was doing a dangerous experiment that could kill the plants in the yard, or worse, start a fire!\n\nFinally, Kate couldn't stand it anymore. She didn't shout, but she knocked carefully and asked, \"What's making that noise?\" Ben laughed and opened the door. It was just his new robot toy, testing its loud alarm. \"It's not evil,\" Ben said. \"It's actually a fun adventure — I'm building it for the science fair!\" Kate felt silly for being scared, but she was glad it wasn't something worse.",
  questions: [
    { id: 1, text: "Why did Kate approach the garage?", options: ['She heard a loud, terrible noise.', 'Ben asked her to help him.', 'She wanted to smell the flowers.', 'She was looking for her cat.'], correct: 0 },
    { id: 2, text: "What did Kate smell near the door?", options: ['Fresh bread', 'Chemicals', 'Smoke', 'Flowers'], correct: 1 },
    { id: 3, text: "What did Kate imagine Ben might be doing?", options: ['Painting a picture', 'A dangerous experiment', 'Reading a book', 'Sleeping'], correct: 1 },
    { id: 4, text: "What was actually making the noise?", options: ["A robot toy's alarm", 'A monster', 'A broken chemical', "Ben's laugh"], correct: 0 },
    { id: 5, text: 'What was Ben building the robot for?', options: ['A birthday gift', 'The science fair', 'A movie', 'His sister'], correct: 1 },
  ],
};

const unit3Words = [
  { id: 'l3w1', word: 'alien', translation: "o'zga sayyoralik", definition: 'An alien is a creature from a different world.', example: 'The alien came in peace.', partOfSpeech: 'noun' },
  { id: 'l3w2', word: 'among', translation: 'orasida', definition: 'If you are among certain things, they are all around you.', example: 'There was a red apple among the green ones.', partOfSpeech: 'preposition' },
  { id: 'l3w3', word: 'chart', translation: 'jadval', definition: 'A chart is a list of information.', example: 'We used a chart to see how we had improved.', partOfSpeech: 'noun' },
  { id: 'l3w4', word: 'cloud', translation: 'bulut', definition: 'A cloud is a group of water drops in the sky.', example: 'The sky was filled with white clouds.', partOfSpeech: 'noun' },
  { id: 'l3w5', word: 'comprehend', translation: 'tushunmoq', definition: 'To comprehend something is to understand it.', example: 'Henry could not comprehend the message.', partOfSpeech: 'verb' },
  { id: 'l3w6', word: 'describe', translation: 'tasvirlamoq', definition: 'To describe is to say or write what someone or something is like.', example: 'They described their tree as colorful with gold ribbon and a star.', partOfSpeech: 'verb' },
  { id: 'l3w7', word: 'ever', translation: 'hech qachon', definition: 'Ever means at any time.', example: "Going skiing last winter was the most fun I've ever had.", partOfSpeech: 'adverb' },
  { id: 'l3w8', word: 'fail', translation: 'muvaffaqiyatsizlikka uchramoq', definition: 'To fail means you do not succeed in what you try to do.', example: 'Since he failed to get the job, he was sad.', partOfSpeech: 'verb' },
  { id: 'l3w9', word: 'friendly', translation: "do'stona", definition: 'Friendly is behaving in a pleasant, kind way toward someone.', example: 'The friendly animals came up to the girl.', partOfSpeech: 'adjective' },
  { id: 'l3w10', word: 'grade', translation: 'baho', definition: "A grade is a score or mark given to someone's work.", example: 'I managed to get good grades on my report card.', partOfSpeech: 'noun' },
  { id: 'l3w11', word: 'instead', translation: "o'rniga", definition: 'Instead means in place of.', example: 'He ate the carrot instead of the ice cream.', partOfSpeech: 'adverb' },
  { id: 'l3w12', word: 'library', translation: 'kutubxona', definition: 'A library is a place where you go to read books.', example: 'The library at school is full of books.', partOfSpeech: 'noun' },
  { id: 'l3w13', word: 'planet', translation: 'sayyora', definition: 'A planet is a large round thing in space.', example: 'Saturn is the planet with the ring around it.', partOfSpeech: 'noun' },
  { id: 'l3w14', word: 'report', translation: 'hisobot', definition: 'A report is something students write for school.', example: 'Karen had trouble writing her report.', partOfSpeech: 'noun' },
  { id: 'l3w15', word: 'several', translation: 'bir nechta', definition: 'Several is more than two but not many.', example: 'He had to read several books for class.', partOfSpeech: 'adjective' },
  { id: 'l3w16', word: 'solve', translation: 'yechmoq', definition: 'To solve something is to find an answer to it.', example: 'All the students could easily solve the math problem.', partOfSpeech: 'verb' },
  { id: 'l3w17', word: 'suddenly', translation: "to'satdan", definition: 'If something happens suddenly, it happens quickly and unexpectedly.', example: 'I was suddenly surprised by the cake my friends brought me.', partOfSpeech: 'adverb' },
  { id: 'l3w18', word: 'suppose', translation: 'taxmin qilmoq', definition: 'To suppose is to guess.', example: 'I suppose I should go home now.', partOfSpeech: 'verb' },
  { id: 'l3w19', word: 'universe', translation: 'koinot', definition: 'The universe is the known or supposed objects in space.', example: 'The universe is so large that it cannot be measured.', partOfSpeech: 'noun' },
  { id: 'l3w20', word: 'view', translation: 'tomosha qilmoq', definition: 'To view is to look at something.', example: 'Michael likes to view himself in the mirror.', partOfSpeech: 'verb' },
];

const unit3Grammar = {
  questions: [
    { id: 1, text: 'Choose the correct word order:', options: ['A friendly alien greeted the astronauts.', 'A friendly astronauts alien greeted.', 'Greeted a friendly alien the astronauts.', 'The astronauts a friendly alien greeted.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 2, text: 'One red pen was ___ the blue ones on the desk.', options: ['among', 'amongs', 'is among', 'does among'], correct: 0, explanation: '"Among" is a preposition and does not change form.' },
    { id: 3, text: 'The teacher ___ a new chart on the wall.', options: ['hang', 'hangs', 'is hangs', 'do hangs'], correct: 1, explanation: '"The teacher" is singular, so add -s: hangs.' },
    { id: 4, text: 'Choose the correct word order:', options: ['A large cloud covered the sun.', 'A large the sun cloud covered.', 'Covered a large cloud the sun.', 'The sun a large cloud covered.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 5, text: 'Choose the correct question:', options: ['Do you comprehend this lesson?', 'Does you comprehend this lesson?', 'Are you comprehend this lesson?', 'Do you comprehends this lesson?'], correct: 0, explanation: 'Use "Do" + subject + base verb: Do you comprehend...?' },
    { id: 6, text: 'She ___ not describe the man clearly.', options: ['do', 'does', 'is', 'are'], correct: 1, explanation: '"She" uses "does not" (doesn\'t) + base verb.' },
    { id: 7, text: 'Choose the correct word order:', options: ["I have ever seen anything so strange.", "I have never anything ever so strange seen.", "Ever I have seen anything so strange.", "Anything so strange I have ever seen."], correct: 0, explanation: 'The normal order is Subject + have + ever + past participle + Object.' },
    { id: 8, text: 'Many students ___ the difficult exam every year.', options: ['fail', 'fails', 'is failing', 'was fail'], correct: 0, explanation: '"Students" is plural, so no -s: they fail.' },
    { id: 9, text: 'The new neighbors seem very ___.', options: ['friendly', 'friendlies', 'is friendly', 'does friendly'], correct: 0, explanation: 'Adjectives follow the linking verb directly, with no -s.' },
    { id: 10, text: 'Choose the correct word order:', options: ['He got a good grade on the test.', 'He a good grade got on the test.', 'Got he a good grade on the test.', 'On the test he got a good grade the.'], correct: 0, explanation: 'Subject + Verb + Object + Place phrase is the normal order.' },
    { id: 11, text: 'Choose the correct word order:', options: ['She chose tea instead of coffee.', 'She chose instead tea of coffee.', 'Instead she chose tea of coffee.', 'Tea instead she chose of coffee.'], correct: 0, explanation: '"Instead of" stays together right before the noun it replaces.' },
    { id: 12, text: 'The children ___ at the library after school.', options: ['read', 'reads', 'is reading', 'was read'], correct: 0, explanation: '"Children" is plural, so no -s: they read.' },
    { id: 13, text: 'Mars ___ a planet with a red color.', options: ['is', 'are', 'do', 'does'], correct: 0, explanation: '"Mars" is singular, so use "is".' },
    { id: 14, text: 'Choose the correct question:', options: ['Did you finish your report?', 'Does you finished your report?', 'Was you finish your report?', 'Do you finished your report?'], correct: 0, explanation: 'Use "Did" + subject + base verb for past questions.' },
    { id: 15, text: 'Choose the correct word order:', options: ['We visited several countries last year.', 'We several visited countries last year.', 'Several countries we visited last year.', 'Last year we visited countries several.'], correct: 0, explanation: 'Subject + Verb + Object (with quantifier before noun) is the normal order.' },
    { id: 16, text: 'This puzzle is hard, but she can ___ it.', options: ['solve', 'solves', 'is solve', 'does solve'], correct: 0, explanation: 'After the modal "can", use the base verb: can solve.' },
    { id: 17, text: 'Choose the correct word order:', options: ['Suddenly, the lights went out.', 'The lights suddenly went out suddenly.', 'Went out the lights suddenly.', 'The lights out suddenly went.'], correct: 0, explanation: '"Suddenly" often begins the sentence, followed by a comma, then Subject + Verb.' },
    { id: 18, text: 'I ___ that the movie starts at eight.', options: ['suppose', 'supposes', 'is suppose', 'does suppose'], correct: 0, explanation: '"I" uses the base verb: I suppose.' },
    { id: 19, text: 'The ___ is bigger than we can imagine.', options: ['universe', 'universes', 'is universe', 'do universe'], correct: 0, explanation: '"The universe" is a singular noun used as the subject here.' },
    { id: 20, text: 'Choose the correct word order:', options: ['Tourists like to view the mountains.', 'Tourists like the mountains to view.', 'To view tourists like the mountains.', 'View tourists like to the mountains.'], correct: 0, explanation: 'Subject + Verb (like) + Infinitive (to view) + Object is the normal order.' },
  ],
};

const unit3Reading = {
  title: 'The Report',
  pages: [
    [
      { type: 'heading', text: 'The Report' },
      { type: 'p', text: "Lee sat among the books at the library and thought about his group project. They had to turn it in soon, but he hadn't even started his part! Jack and Claire were in his group. They had worked hard. They were also very smart, and Lee didn't want them to get a bad grade." },
      { type: 'p', text: 'Jack did the report. He wrote a lot of very good sentences and described things with great adjectives. Claire drew a nice map of the stars. Now, Lee needed to do his part of the project.' },
    ],
    [
      { type: 'p', text: '"Well, I suppose I need to start my model," Lee thought. Making a model of a planet was really hard. Lee tried to read several books, but he couldn\'t comprehend any of the charts. "We\'re going to fail because of me!" Lee said. He put his head down on the table and said, "I wish I could see a planet, instead of having to read about it!"' },
      { type: 'p', text: 'Suddenly, there was a bright light. Lee was pulled from his chair, through the roof, and right into a strange ship! "Hello, kid," said an alien. "Did you ask for help?"' },
    ],
    [
      { type: 'p', text: 'Lee told the friendly alien all about his project. The alien agreed to help Lee solve his problem. "First, we\'ll fly through space to view the universe. Then, I can help you make a model of my planet."' },
      { type: 'p', text: 'Soon, they were going through the clouds. They passed the moon. Then they viewed Mars. Lee was very excited. Instead of a bad grade, his group would have the best project ever!' },
    ],
    [
      { type: 'p', text: '"It\'s time to go home," the alien finally said. On the way back, he helped Lee make a model of the planet Mars. Soon, they were on Earth.' },
      { type: 'p', text: '"Thanks," Lee said. "My model will be awesome!" Then he took his model and said goodbye to his new friend.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['Why a smart boy fails a class', "A boy's trip into the universe", 'A boy who wants to write instead of draw', 'An alien living in a library'], correct: 1 },
    { id: 2, text: 'What is Lee unable to comprehend?', options: ['How to make a model of a planet', 'Why there are maps among the books', 'Where the best place is to view the stars', 'How to read the information in a chart'], correct: 3 },
    { id: 3, text: "What can you suppose is true of the group's report?", options: ['It has three sentences.', 'It must describe clouds.', 'It is not due until several days.', 'It is about the stars and planets.'], correct: 3 },
    { id: 4, text: 'What did the alien want to do to help Lee?', options: ['Get several books from the library', 'Hear the best report ever', 'Make the model of a planet', 'Solve his own problems'], correct: 2 },
    { id: 5, text: 'What planet did Lee see on his trip?', options: ['Mars', 'Jupiter', 'Venus', 'Saturn'], correct: 0 },
  ],
};

const unit3Listening = {
  title: 'The Library Project',
  script: "Emma had to write a school report, but she couldn't comprehend the chart in her science book. \"I suppose I should ask for help,\" she said, and went to the library. Among all the students there, she found a friendly librarian who liked to describe things clearly.\n\nThe librarian showed Emma several books about the universe and different planets. \"I've never seen so many planets in one book!\" Emma said. Suddenly, she understood the chart. Instead of feeling like she would fail, she felt confident.\n\nEmma finished her report that afternoon. When she got her grade back the next week, she was thrilled — she got the best grade in the class! From then on, instead of giving up when something was hard, Emma would always go to the library to view a good book and solve the problem.",
  questions: [
    { id: 1, text: 'What could Emma not comprehend?', options: ['A chart in her science book', 'A letter from her teacher', 'A map of the library', 'A story about aliens'], correct: 0 },
    { id: 2, text: 'Where did Emma go for help?', options: ['Her friend\'s house', 'The library', 'The park', 'Her teacher\'s office'], correct: 1 },
    { id: 3, text: 'Who helped Emma understand the chart?', options: ['Her mother', 'A friendly librarian', 'Her classmate', 'An alien'], correct: 1 },
    { id: 4, text: 'What was Emma\'s report about?', options: ['Animals', 'The universe and planets', 'History', 'Music'], correct: 1 },
    { id: 5, text: 'What did Emma learn to do instead of giving up?', options: ['Ask her friends to do it for her', 'Go to the library to solve the problem', 'Skip the hard homework', 'Fail the assignment on purpose'], correct: 1 },
  ],
};

const unit4Words = [
  { id: 'l4w1', word: 'appropriate', translation: 'mos, munosib', definition: 'When a thing is appropriate, it is right or normal.', example: "It's appropriate to wear a suit when you go to the office.", partOfSpeech: 'adjective' },
  { id: 'l4w2', word: 'avoid', translation: 'qochmoq, saqlanmoq', definition: 'To avoid something is to stay away from it.', example: 'Avoid the broken bottle on the floor.', partOfSpeech: 'verb' },
  { id: 'l4w3', word: 'behave', translation: "o'zini tutmoq", definition: 'To behave is to act in a particular way, especially to be good.', example: 'She always behaves well when her father is around.', partOfSpeech: 'verb' },
  { id: 'l4w4', word: 'calm', translation: 'xotirjam', definition: 'When someone is calm, they do not get excited or upset.', example: 'A nice warm bath makes me feel so calm.', partOfSpeech: 'adjective' },
  { id: 'l4w5', word: 'concern', translation: 'tashvish', definition: 'Concern is a feeling of worry.', example: 'I was filled with concern after reading the newspaper.', partOfSpeech: 'noun' },
  { id: 'l4w6', word: 'content', translation: 'mamnun, qanoatlangan', definition: 'To be content is to be happy and not want more.', example: 'The baby looked very content sitting on the floor.', partOfSpeech: 'adjective' },
  { id: 'l4w7', word: 'expect', translation: 'kutmoq', definition: 'If you expect something to happen, you believe it will happen.', example: 'I expect the bus to be here very soon.', partOfSpeech: 'verb' },
  { id: 'l4w8', word: 'frequently', translation: 'tez-tez', definition: 'When something happens frequently, it happens often.', example: 'We meet frequently, either at the beginning or ending of the week.', partOfSpeech: 'adverb' },
  { id: 'l4w9', word: 'habit', translation: 'odat', definition: 'A habit is a thing that you do often.', example: 'Smoking is a bad habit that can kill you.', partOfSpeech: 'noun' },
  { id: 'l4w10', word: 'instruct', translation: "o'rgatmoq", definition: 'To instruct is to teach.', example: 'My teacher instructs us in several subjects.', partOfSpeech: 'verb' },
  { id: 'l4w11', word: 'issue', translation: 'masala', definition: 'An issue is an important topic.', example: 'The men spoke about issues that were important to the people.', partOfSpeech: 'noun' },
  { id: 'l4w12', word: 'none', translation: 'hech biri', definition: 'None means not any of someone or something.', example: 'He spent all his money. There is none left.', partOfSpeech: 'pronoun' },
  { id: 'l4w13', word: 'patient', translation: 'sabrli', definition: "If a person is patient, they don't become angry or upset easily.", example: 'I had to be patient and wait until 5 o\'clock to leave.', partOfSpeech: 'adjective' },
  { id: 'l4w14', word: 'positive', translation: 'ijobiy', definition: 'If something is positive, it is good.', example: 'She has a positive future ahead of her after finishing college.', partOfSpeech: 'adjective' },
  { id: 'l4w15', word: 'punish', translation: 'jazolamoq', definition: 'To punish means to make someone suffer for breaking the rules or laws.', example: 'To punish me, my teacher had me stand in the corner.', partOfSpeech: 'verb' },
  { id: 'l4w16', word: 'represent', translation: 'vakillik qilmoq', definition: 'To represent is to speak or act for a person or group.', example: 'My lawyer will represent me in court.', partOfSpeech: 'verb' },
  { id: 'l4w17', word: 'shake', translation: 'silkitmoq', definition: 'To shake is to move back and forth or up and down quickly.', example: 'When people shake hands, it usually means they agree.', partOfSpeech: 'verb' },
  { id: 'l4w18', word: 'spread', translation: 'tarqalmoq', definition: 'To spread is to move quickly to more places.', example: 'I like to spread butter on my toast.', partOfSpeech: 'verb' },
  { id: 'l4w19', word: 'stroll', translation: 'sayr qilmoq', definition: 'To stroll means to walk slowly and calmly.', example: 'My dog and I strolled through the park today.', partOfSpeech: 'verb' },
  { id: 'l4w20', word: 'village', translation: 'qishloq', definition: 'A village is a very small town.', example: 'There are only a few houses in my village.', partOfSpeech: 'noun' },
];

const unit4Grammar = {
  questions: [
    { id: 1, text: 'It ___ appropriate to talk loudly in a library.', options: ['is', 'are', 'do', 'does'], correct: 0, explanation: '"It" is singular, so use "is".' },
    { id: 2, text: 'Choose the correct word order:', options: ['Drivers should avoid the icy road.', 'Drivers should the icy road avoid.', 'Should drivers avoid the icy road.', 'The icy road drivers should avoid.'], correct: 0, explanation: 'Subject + Modal + Verb + Object is the normal order.' },
    { id: 3, text: 'The children ___ well when their teacher watches them.', options: ['behave', 'behaves', 'is behave', 'does behave'], correct: 0, explanation: '"Children" is plural, so no -s: they behave.' },
    { id: 4, text: 'Choose the correct word order:', options: ['The lake looked calm this morning.', 'The lake calm looked this morning.', 'Calm the lake looked this morning.', 'This morning looked calm the lake.'], correct: 0, explanation: 'Subject + Verb (looked) + Adjective + Time phrase is the normal order.' },
    { id: 5, text: 'Choose the correct question:', options: ['Does he have any concern about the test?', 'Do he have any concern about the test?', 'Is he have any concern about the test?', 'Does he has any concern about the test?'], correct: 0, explanation: '"He" is singular, so use "Does" + base verb.' },
    { id: 6, text: 'We ___ content with our small apartment.', options: ['is', 'am', 'are', 'be'], correct: 2, explanation: '"We" always uses "are" with the verb to be.' },
    { id: 7, text: 'Choose the correct word order:', options: ['I expect good news tomorrow.', 'I good news expect tomorrow.', 'Tomorrow I expect good news the.', 'Expect I good news tomorrow.'], correct: 0, explanation: 'Subject + Verb + Object + Time is the normal order.' },
    { id: 8, text: 'She ___ visits her grandmother on weekends.', options: ['frequently', 'frequent', 'is frequently', 'does frequently'], correct: 0, explanation: 'Adverbs of frequency like "frequently" often go before the main verb.' },
    { id: 9, text: 'Biting your nails is a bad ___.', options: ['habit', 'habits', 'is habit', 'do habit'], correct: 0, explanation: '"A bad habit" — the noun stays singular after the article "a".' },
    { id: 10, text: 'Choose the correct question:', options: ['Did the coach instruct the team well?', 'Does the coach instructed the team well?', 'Was the coach instruct the team well?', 'Do the coach instructed the team well?'], correct: 0, explanation: 'Use "Did" + subject + base verb for past questions.' },
    { id: 11, text: 'Choose the correct word order:', options: ['The mayor discussed an important issue.', 'The mayor an important issue discussed.', 'Discussed the mayor an important issue.', 'An important issue the mayor discussed.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 12, text: 'There is ___ milk left in the fridge.', options: ['none', 'nones', 'is none', 'do none'], correct: 0, explanation: '"None" does not change form and is used before or after "is".' },
    { id: 13, text: 'Good teachers ___ very patient with young students.', options: ['is', 'are', 'do', 'does'], correct: 1, explanation: '"Teachers" is plural, so use "are".' },
    { id: 14, text: 'Choose the correct word order:', options: ['Her positive attitude helped the team.', 'Her attitude positive helped the team.', 'Helped her positive attitude the team.', 'The team her positive attitude helped.'], correct: 0, explanation: 'Adjectives like "positive" go before the noun they describe.' },
    { id: 15, text: 'Parents should not ___ a child too harshly.', options: ['punish', 'punishes', 'is punish', 'does punish'], correct: 0, explanation: 'After "should not", use the base verb.' },
    { id: 16, text: 'Choose the correct word order:', options: ['A lawyer will represent the family.', 'A lawyer the family will represent.', 'Will a lawyer represent the family.', 'The family a lawyer will represent.'], correct: 0, explanation: 'Subject + Modal + Verb + Object is the normal order.' },
    { id: 17, text: 'The ground began to ___ during the earthquake.', options: ['shake', 'shakes', 'is shake', 'does shake'], correct: 0, explanation: 'After "began to", use the base verb.' },
    { id: 18, text: 'Choose the correct word order:', options: ['Bad news spreads quickly in a small town.', 'Bad news quickly spreads in a small town spreads.', 'Spreads bad news quickly in a small town.', 'In a small town bad news spreads quickly the.'], correct: 0, explanation: 'Subject + Verb + Adverb + Place phrase is the normal order.' },
    { id: 19, text: 'They like to ___ through the park every evening.', options: ['stroll', 'strolls', 'is stroll', 'does stroll'], correct: 0, explanation: 'After "like to", use the base verb.' },
    { id: 20, text: 'The small ___ only has one school.', options: ['village', 'villages', 'is village', 'do village'], correct: 0, explanation: '"The small village" — the noun stays singular after the article "the".' },
  ],
};

const unit4Reading = {
  title: "The Dog's Bell",
  pages: [
    [
      { type: 'heading', text: "The Dog's Bell" },
      { type: 'p', text: "John's dog was a bad dog. He bit people frequently. John had great concern about this. It was not an appropriate way for a dog to behave. His friends in the village always expected the dog to bite them. The news about John's dog spread through the village. None of the people wanted to go to John's house." },
    ],
    [
      { type: 'p', text: 'John tried to instruct the dog to behave, but it never worked. He tried to be patient and teach the dog to be calm. That also didn\'t work. John didn\'t want to punish the dog. "How will I stop my dog\'s bad habit?" John asked himself.' },
      { type: 'p', text: 'John\'s friend came to talk to him about the issue. During their important meeting, his friend said, "The people in the village asked me to represent them. We want your dog to stop this habit. Why don\'t you put a bell around the dog\'s neck? This way, we would hear your dog coming down the street."' },
    ],
    [
      { type: 'p', text: 'John thought this was a great idea. Now, people could stay away from the dog. It would not be able to bite anyone anymore.' },
      { type: 'p', text: 'The dog liked the bell, too. People looked at him when they heard his bell. This made the dog very content. He liked the song the bell played when he walked.' },
    ],
    [
      { type: 'p', text: "One day, John's dog strolled through the village and met some other dogs. He expected them to want a bell like his. But they laughed at his bell. They said the bell made people avoid him. John's dog shook his head. \"No, they look at me because they like the bell.\"" },
      { type: 'p', text: '"The other dogs said, \"You have the wrong idea of what makes you popular. Of course they like your bell. It tells them where you are so they can avoid you. You aren\'t able to bite them anymore!\" You see, being popular isn\'t something positive when it\'s for the wrong reason.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story mainly about?', options: ['A dog that is frequently bad', "A dog's stroll through town", 'A content man and his dog', 'A village that liked John\'s dog'], correct: 0 },
    { id: 2, text: 'What is true of the dog?', options: ["He likes none of John's friends.", 'He shakes his head too much.', "He bites when it's not appropriate.", 'He expects people to be calm around him.'], correct: 2 },
    { id: 3, text: 'Why did the issue with the dog bother John?', options: ['People didn\'t think of John in a positive way.', "People avoided going to John's house.", "People didn't want John to represent them.", "People didn't like the song that John played."], correct: 1 },
    { id: 4, text: "What did John do to stop the dog's bad habit?", options: ['He instructed the dog on learning tricks.', 'He punished the dog for biting.', 'He was patient and showed concern.', 'He put a bell around the dog\'s neck.'], correct: 3 },
    { id: 5, text: 'What did the other dogs say about the bell?', options: ['It tells people to avoid him, so he can no longer bite them.', 'It sounds appropriate for a village dog.', 'It is a positive sign that he is calm.', 'It represents good behavior in the community.'], correct: 0 },
  ],
};

const unit4Listening = {
  title: 'A New Habit',
  script: "Anna moved to a small village and wanted to behave in an appropriate way with her new neighbors. At first, she felt a little concern, because she didn't know anyone. But she decided to stay calm and patient.\n\nAnna's new habit was to stroll through the village every morning. She would frequently stop to talk with people, and she tried to avoid saying anything negative — she wanted to stay positive. Slowly, the news about the friendly new woman began to spread through the village, and none of her neighbors felt worried about her anymore.\n\nOne day, a local group asked Anna to represent them at a town meeting about an important issue — how to keep the streets clean. Anna felt proud. She didn't shake with nerves; instead, she calmly instructed the group on a simple plan, and everyone was content with the result.",
  questions: [
    { id: 1, text: 'What was Anna\'s new habit?', options: ['Strolling through the village every morning', 'Punishing people who littered', 'Sleeping in late every day', 'Avoiding her neighbors'], correct: 0 },
    { id: 2, text: 'How did Anna feel at first?', options: ['Angry', 'A little concern', 'Extremely positive', 'Bored'], correct: 1 },
    { id: 3, text: 'What did Anna try to avoid?', options: ['Saying anything negative', 'Talking to her neighbors', 'Walking outside', 'Going to meetings'], correct: 0 },
    { id: 4, text: 'What issue did the town meeting discuss?', options: ['Keeping the streets clean', 'Building a new school', 'A bad dog in the village', 'A new bell for the church'], correct: 0 },
    { id: 5, text: 'How did Anna feel when she spoke at the meeting?', options: ['Nervous and shaking', 'Calm and confident', 'Upset and angry', 'Confused'], correct: 1 },
  ],
};

const unit5Words = [
  { id: 'l5w1', word: 'aware', translation: 'xabardor', definition: 'If you are aware of something, you know about it.', example: 'I was not aware of the ringing phone.', partOfSpeech: 'adjective' },
  { id: 'l5w2', word: 'badly', translation: 'yomon, qattiq', definition: 'Badly means in a severe or harmful way.', example: 'He hurt his arm badly playing with friends.', partOfSpeech: 'adverb' },
  { id: 'l5w3', word: 'belong', translation: 'tegishli bo\'lmoq', definition: 'If something belongs to you, you own it.', example: 'The blue suit belongs to Paul.', partOfSpeech: 'verb' },
  { id: 'l5w4', word: 'continue', translation: 'davom etmoq', definition: 'To continue something is to keep doing it.', example: 'She stood under her umbrella as the rain continued to fall.', partOfSpeech: 'verb' },
  { id: 'l5w5', word: 'error', translation: 'xato', definition: 'An error is something you do wrong.', example: 'I made an error on my report, so my boss was angry.', partOfSpeech: 'noun' },
  { id: 'l5w6', word: 'experience', translation: 'tajriba', definition: 'An experience is something you have seen or done.', example: 'Rock climbing was a fun experience.', partOfSpeech: 'noun' },
  { id: 'l5w7', word: 'field', translation: 'dala, maydon', definition: 'A field is a big area of land.', example: 'The field of flowers looked so pretty.', partOfSpeech: 'noun' },
  { id: 'l5w8', word: 'hurt', translation: 'og\'ritmoq', definition: 'To hurt is to do something that makes you feel pain.', example: 'She hurt her leg falling down the stairs.', partOfSpeech: 'verb' },
  { id: 'l5w9', word: 'judgment', translation: 'fikr, qaror', definition: 'Judgment is the ability to form opinions or decisions.', example: "It's good judgment to recycle your aluminum cans.", partOfSpeech: 'noun' },
  { id: 'l5w10', word: 'likely', translation: 'ehtimol', definition: 'If something likely happens, it will probably happen.', example: 'I will likely stay at home and watch TV tonight.', partOfSpeech: 'adverb' },
  { id: 'l5w11', word: 'normal', translation: 'oddiy, normal', definition: 'If something is normal, it is not strange nor surprising to you.', example: 'It is normal for me to bathe every night.', partOfSpeech: 'adjective' },
  { id: 'l5w12', word: 'rare', translation: 'kamdan-kam uchraydigan', definition: 'If something is rare, you do not see it very often.', example: 'It is rare for him to miss his flight.', partOfSpeech: 'adjective' },
  { id: 'l5w13', word: 'relax', translation: 'dam olmoq', definition: 'To relax is to rest.', example: 'The frog relaxed in the warm sun.', partOfSpeech: 'verb' },
  { id: 'l5w14', word: 'request', translation: "so'ramoq", definition: 'To request something is to ask for it.', example: 'The little girl requested a special gift from Santa Claus.', partOfSpeech: 'verb' },
  { id: 'l5w15', word: 'reside', translation: 'yashamoq', definition: 'To reside means to live somewhere permanently or for a long time.', example: 'My brother and his family reside in a lovely house on the beach.', partOfSpeech: 'verb' },
  { id: 'l5w16', word: 'result', translation: 'natija', definition: 'A result is something that happens because of something else.', example: 'As a result of all the rain, the man had to climb on the roof.', partOfSpeech: 'noun' },
  { id: 'l5w17', word: 'roll', translation: 'dumalamoq', definition: 'To roll is to move by turning over and over.', example: 'You must roll the ball into the pins when you bowl.', partOfSpeech: 'verb' },
  { id: 'l5w18', word: 'since', translation: '-dan beri', definition: 'Since is used to talk about a past event still happening now.', example: 'Since 1992, he has been driving that car.', partOfSpeech: 'preposition' },
  { id: 'l5w19', word: 'visible', translation: 'ko\'rinadigan', definition: 'If something is visible, it can be seen.', example: 'The moon and stars were visible in the night sky.', partOfSpeech: 'adjective' },
  { id: 'l5w20', word: 'wild', translation: 'yovvoyi', definition: 'If something is wild, it is found in nature.', example: 'You should be careful around a fox, because it is a wild animal.', partOfSpeech: 'adjective' },
];

const unit5Grammar = {
  questions: [
    { id: 1, text: 'She ___ not aware of the mistake in her report.', options: ['do', 'does', 'is', 'are'], correct: 2, explanation: '"She" uses "is not" with adjectives.' },
    { id: 2, text: 'Choose the correct word order:', options: ['He hurt his knee badly.', 'He badly hurt his knee.', 'Badly he hurt his knee.', 'His knee he hurt badly.'], correct: 0, explanation: 'The adverb "badly" often comes after the verb and object it describes.' },
    { id: 3, text: 'This old book ___ to my grandmother.', options: ['belong', 'belongs', 'is belong', 'does belongs'], correct: 1, explanation: '"This old book" is singular, so add -s: belongs.' },
    { id: 4, text: 'Choose the correct question:', options: ['Did the meeting continue after lunch?', 'Does the meeting continued after lunch?', 'Was the meeting continue after lunch?', 'Do the meeting continued after lunch?'], correct: 0, explanation: 'Use "Did" + subject + base verb for past questions.' },
    { id: 5, text: 'Choose the correct word order:', options: ['I made a small error on the test.', 'I a small error made on the test.', 'Made I a small error on the test.', 'A small error I made on the test.'], correct: 0, explanation: 'Subject + Verb + Object + Place phrase is the normal order.' },
    { id: 6, text: 'That trip to Japan was a great ___.', options: ['experience', 'experiences', 'is experience', 'do experience'], correct: 0, explanation: '"A great experience" — the noun stays singular after the article "a".' },
    { id: 7, text: 'Choose the correct word order:', options: ['Cows were eating grass in the field.', 'Cows in the field were eating grass.', 'Both A and B are correct orders.', 'Grass cows the field eating were.'], correct: 2, explanation: 'Both Subject+Verb+Object+Place and Subject+Place+Verb+Object can be natural, but the object usually stays close to the verb.' },
    { id: 8, text: 'She ___ her back while lifting the box.', options: ['hurt', 'hurts', 'is hurt', 'does hurt'], correct: 0, explanation: '"Hurt" is irregular and stays the same in the past tense.' },
    { id: 9, text: 'Choose the correct word order:', options: ["The judge's judgment surprised everyone.", "The judgment judge's surprised everyone.", "Surprised the judge's judgment everyone.", "Everyone the judge's judgment surprised."], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 10, text: 'It will ___ rain later this afternoon.', options: ['likely', 'likelies', 'is likely', 'does likely'], correct: 0, explanation: '"Likely" as an adverb often goes between the modal and the main verb.' },
    { id: 11, text: 'It is ___ to feel nervous before a test.', options: ['normal', 'normals', 'is normal', 'do normal'], correct: 0, explanation: 'Adjectives like "normal" follow the linking verb directly, with no -s.' },
    { id: 12, text: 'A blue diamond like this one is very ___.', options: ['rare', 'rares', 'is rare', 'does rare'], correct: 0, explanation: 'Adjectives do not take -s.' },
    { id: 13, text: 'Choose the correct word order:', options: ['We relax by the pool every summer.', 'We by the pool relax every summer.', 'Every summer relax we by the pool.', 'By the pool we every summer relax.'], correct: 0, explanation: 'Subject + Verb + Place + Time is the normal order.' },
    { id: 14, text: 'Choose the correct question:', options: ['Did she request more time for the project?', 'Does she requested more time for the project?', 'Was she request more time for the project?', 'Do she requested more time for the project?'], correct: 0, explanation: 'Use "Did" + subject + base verb for past questions.' },
    { id: 15, text: 'Many families ___ in that quiet neighborhood.', options: ['reside', 'resides', 'is reside', 'does reside'], correct: 0, explanation: '"Families" is plural, so no -s: they reside.' },
    { id: 16, text: 'Choose the correct word order:', options: ['The good result pleased the whole team.', 'The result good pleased the whole team.', 'Pleased the good result the whole team.', 'The whole team pleased the good result.'], correct: 0, explanation: 'Adjectives like "good" go before the noun they describe.' },
    { id: 17, text: 'The ball began to ___ down the hill.', options: ['roll', 'rolls', 'is roll', 'does roll'], correct: 0, explanation: 'After "began to", use the base verb.' },
    { id: 18, text: 'Choose the correct word order:', options: ['She has lived here since 2010.', 'She has since lived here 2010.', 'Since 2010 lived she has here.', 'She lived has here since 2010.'], correct: 0, explanation: 'Subject + have/has + Verb + Place + since + Time is the normal order.' },
    { id: 19, text: 'The tall mountain was ___ from every part of town.', options: ['visible', 'visibles', 'is visible', 'does visible'], correct: 0, explanation: 'Adjectives follow the linking verb directly, with no -s.' },
    { id: 20, text: 'A ___ tiger lives deep in the forest.', options: ['wild', 'wilds', 'is wild', 'do wild'], correct: 0, explanation: 'Adjectives like "wild" go before the noun and do not take -s.' },
  ],
};

const unit5Reading = {
  title: 'The Jackal and the Sun Child',
  pages: [
    [
      { type: 'heading', text: 'The Jackal and the Sun Child' },
      { type: 'p', text: 'A jackal is a wild dog with a big black back. It resides in the desert. But how did the jackal get his black back? This was how it happened.' },
      { type: 'p', text: 'One day, the jackal saw a girl. She was sitting upon a rock. She was not a normal child. She was a rare and beautiful sun child. She was bright and warm like the sun. The child saw the jackal and smiled.' },
    ],
    [
      { type: 'p', text: 'She said, "Jackal, I have been relaxing on this rock for too long. I must get home soon. But, I am slow and you are fast. You will likely get me home more quickly." Then she requested, "Will you carry me home? If you do, I\'ll give you a gift. This necklace belongs to me, but I will give it to you."' },
      { type: 'p', text: 'The wild jackal agreed. So the sun child sat on the dog\'s back. They started to walk. But soon, the jackal felt ill. The sun child was very hot on his back. The heat was hurting his back very badly. "I made a terrible error in judgment," he thought. He shouldn\'t have agreed to carry her. So he asked her to get off.' },
    ],
    [
      { type: 'p', text: 'But she did not. The jackal\'s back continued to get hotter and hotter. He had to get away from the sun child. So he made a plan. First, he ran as fast as he could. He hoped the sun child would fall off. But she did not. So when the sun child was looking at the sky, not aware of the jackal\'s next plan, he jumped into a field of flowers. As a result, the child rolled off his back. The jackal ran away.' },
      { type: 'p', text: 'But the sun child left a mark on the jackal\'s back, a visible black mark. Ever since his experience with the sun child, the jackal has had a black back.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['Why the sun child has a beautiful smile', 'Why a wild dog hurt a sun child', 'An error that the sun child once made', 'How the jackal got his visible black mark'], correct: 3 },
    { id: 2, text: 'What kind of girl was the sun child?', options: ['She was rare and beautiful.', 'She was likely very shy.', 'She was an ill child.', 'She was a normal child.'], correct: 0 },
    { id: 3, text: 'Why did the jackal run into the field?', options: ['To continue his journey', 'It wanted a new place to reside.', 'To take a nap and relax', 'To get away from the sun child'], correct: 3 },
    { id: 4, text: 'What happened at the end of the story?', options: ['The sun child forgot the experience.', "The sun child became aware of the jackal's black back.", "The sun child rolled off the jackal's back.", 'The sun child has stayed upon the jackal\'s back since then.'], correct: 2 },
    { id: 5, text: 'What did the sun child request?', options: ['For the jackal to carry her home', 'For the jackal to bring her flowers', 'For the jackal to relax with her', 'For the jackal to stay in the field'], correct: 0 },
  ],
};

const unit5Listening = {
  title: 'Camping in the Wild',
  script: "Last weekend, my family went camping since it was a rare sunny weekend. We reside in the city, so it was a nice change to relax in a field far from town. As soon as we arrived, my father wasn't aware that our tent had an error — one pole was broken!\n\nAs a result, we had to continue setting up camp without it, and the tent looked a little badly built. My brother rolled his eyes and said, \"This is not normal — every trip we have an experience like this!\" But we all laughed.\n\nAt night, the stars were clearly visible above the field, more than we could ever see in the city. My mother said it was likely the clearest sky we'd seen in years. It just goes to show good judgment: sometimes the best experiences belong to the trips that don't go as planned.",
  questions: [
    { id: 1, text: 'Why did the family go camping?', options: ['It was a rare sunny weekend.', 'It was a school trip.', 'Their house was being fixed.', 'They wanted to visit family.'], correct: 0 },
    { id: 2, text: 'What error did they find with the tent?', options: ['It was the wrong color.', 'One pole was broken.', 'It was too small.', 'It had a hole in it.'], correct: 1 },
    { id: 3, text: 'What did the brother say about the trip?', options: ["Every trip has an experience like this.", 'He wanted to go home.', 'He was scared of the wild.', 'The field was too far away.'], correct: 0 },
    { id: 4, text: 'What was visible at night?', options: ['A wild animal', 'The stars', 'A neighboring field', 'The city lights'], correct: 1 },
    { id: 5, text: 'What does the mother suggest about unplanned trips?', options: ['They are always badly organized.', 'The best experiences can belong to them.', 'They should never go camping again.', 'They are more normal than planned trips.'], correct: 1 },
  ],
};

const unit6Words = [
  { id: 'l6w1', word: 'advantage', translation: 'afzallik', definition: 'An advantage is something that helps you.', example: 'Being tall is an advantage to a basketball player.', partOfSpeech: 'noun' },
  { id: 'l6w2', word: 'cause', translation: 'sabab bo\'lmoq', definition: 'To cause is to make something happen.', example: 'The cold weather caused her to get sick.', partOfSpeech: 'verb' },
  { id: 'l6w3', word: 'choice', translation: 'tanlov', definition: 'A choice is the act or possibility of picking something.', example: 'I had my choice of five doors to open.', partOfSpeech: 'noun' },
  { id: 'l6w4', word: 'community', translation: 'jamoa', definition: 'A community is a group of people who live together.', example: 'The kids from my community usually play together.', partOfSpeech: 'noun' },
  { id: 'l6w5', word: 'dead', translation: 'o\'lik', definition: 'To be dead is to not be alive.', example: 'A dead person is usually buried in the ground.', partOfSpeech: 'adjective' },
  { id: 'l6w6', word: 'distance', translation: 'masofa', definition: 'The distance between two things is how far it is between them.', example: 'The distance between the Earth and the Moon is 384,400 kilometers.', partOfSpeech: 'noun' },
  { id: 'l6w7', word: 'escape', translation: 'qochib qutulmoq', definition: 'To escape is to run away from something bad.', example: 'The butterfly could not escape from the cage.', partOfSpeech: 'verb' },
  { id: 'l6w8', word: 'face', translation: 'duch kelmoq', definition: 'If you face a problem, you deal with it.', example: 'My sister and I have to find a better way to face our differences.', partOfSpeech: 'verb' },
  { id: 'l6w9', word: 'follow', translation: 'ergashmoq', definition: 'To follow means to go behind someone and go where they go.', example: 'The little boy followed his mother home.', partOfSpeech: 'verb' },
  { id: 'l6w10', word: 'fright', translation: "qo'rquv", definition: 'Fright is the feeling of being scared.', example: 'She was filled with fright.', partOfSpeech: 'noun' },
  { id: 'l6w11', word: 'ghost', translation: 'arvoh', definition: 'A ghost is the spirit of a dead person.', example: 'Many people are afraid of ghosts.', partOfSpeech: 'noun' },
  { id: 'l6w12', word: 'individual', translation: 'shaxs', definition: 'An individual is one person.', example: 'Only one individual could win the bicycle race.', partOfSpeech: 'noun' },
  { id: 'l6w13', word: 'pet', translation: 'uy hayvoni', definition: 'A pet is an animal that lives with people.', example: 'Out of all my pets, the dog is my favorite.', partOfSpeech: 'noun' },
  { id: 'l6w14', word: 'reach', translation: 'yetib bormoq', definition: 'To reach means to arrive at a place.', example: 'I was happy to finally reach my destination.', partOfSpeech: 'verb' },
  { id: 'l6w15', word: 'return', translation: 'qaytmoq', definition: 'To return is to go back to a place.', example: 'I was happy to return home to my mom after school.', partOfSpeech: 'verb' },
  { id: 'l6w16', word: 'survive', translation: 'omon qolmoq', definition: 'To survive is to stay alive.', example: 'My dog survived her fall into the water.', partOfSpeech: 'verb' },
  { id: 'l6w17', word: 'upset', translation: 'xafa, ranjigan', definition: 'To be upset is to be unhappy about something.', example: 'She was upset because she broke her toy.', partOfSpeech: 'adjective' },
  { id: 'l6w18', word: 'voice', translation: 'ovoz', definition: 'A voice is the sound a person makes when they talk or sing.', example: 'He used a microphone, so everyone could hear his voice.', partOfSpeech: 'noun' },
  { id: 'l6w19', word: 'weather', translation: 'ob-havo', definition: 'The weather is the condition of the air: hot, rainy, windy, etc.', example: 'The weather can be sunny, rainy, or cold.', partOfSpeech: 'noun' },
  { id: 'l6w20', word: 'wise', translation: 'dono', definition: 'To be wise is to use experience and intelligence to make good choices.', example: 'Many people believe that owls are very wise animals.', partOfSpeech: 'adjective' },
];

const unit6Grammar = {
  questions: [
    { id: 1, text: 'Choose the correct word order:', options: ['Speaking two languages is a big advantage.', 'Speaking two languages a big advantage is.', 'A big advantage speaking two languages is.', 'Is speaking two languages a big advantage.'], correct: 0, explanation: 'Subject (gerund phrase) + Verb + Complement is the normal order.' },
    { id: 2, text: 'Heavy rain ___ the flood in the village.', options: ['cause', 'caused', 'is cause', 'do caused'], correct: 1, explanation: '"Heavy rain" is singular/uncountable, so use the simple past "caused" (no -s needed since it is already past tense).' },
    { id: 3, text: 'Choose the correct question:', options: ['Did you make the right choice?', 'Does you made the right choice?', 'Was you make the right choice?', 'Do you made the right choice?'], correct: 0, explanation: 'Use "Did" + subject + base verb for past questions.' },
    { id: 4, text: 'This small ___ helps its neighbors often.', options: ['community', 'communities', 'is community', 'do community'], correct: 0, explanation: '"This small community" — the noun stays singular after "this".' },
    { id: 5, text: 'The old tree in the yard ___ now.', options: ['is dead', 'are dead', 'do dead', 'does dead'], correct: 0, explanation: '"The old tree" is singular, so use "is" + adjective.' },
    { id: 6, text: 'Choose the correct word order:', options: ['The distance between the cities is short.', 'The cities between distance is short.', 'Short is the distance between the cities.', 'Between the cities the distance short is.'], correct: 0, explanation: 'Subject + Verb + Adjective is the normal order.' },
    { id: 7, text: 'The bird finally ___ from its cage.', options: ['escape', 'escaped', 'is escape', 'do escaped'], correct: 1, explanation: 'Use the simple past tense: escaped.' },
    { id: 8, text: 'Choose the correct word order:', options: ['We must face our problems bravely.', 'We must our problems face bravely.', 'Bravely we must face our problems the.', 'Face we must our problems bravely.'], correct: 0, explanation: 'Subject + Modal + Verb + Object + Adverb is the normal order.' },
    { id: 9, text: 'The ducklings ___ their mother across the pond.', options: ['follow', 'follows', 'is follow', 'does follow'], correct: 0, explanation: '"Ducklings" is plural, so no -s: they follow.' },
    { id: 10, text: 'Choose the correct word order:', options: ['The loud noise filled her with fright.', 'The loud noise fright filled her with.', 'Fright the loud noise filled her with.', 'Her the loud noise filled with fright.'], correct: 0, explanation: 'Subject + Verb + Object + Prepositional phrase is the normal order.' },
    { id: 11, text: 'Some people believe a ___ lives in that old house.', options: ['ghost', 'ghosts', 'is ghost', 'do ghost'], correct: 0, explanation: '"A ghost" — singular noun after the article "a".' },
    { id: 12, text: 'Each ___ in the group has a different idea.', options: ['individual', 'individuals', 'is individual', 'do individual'], correct: 0, explanation: '"Each" is always followed by a singular noun: each individual.' },
    { id: 13, text: 'Choose the correct question:', options: ['Does your family have a pet?', 'Do your family have a pet?', 'Is your family have a pet?', 'Does your family has a pet?'], correct: 0, explanation: '"Your family" is treated as singular, so use "Does" + base verb.' },
    { id: 14, text: 'Choose the correct word order:', options: ['They finally reached the top of the mountain.', 'They the top of the mountain finally reached.', 'Finally they reached the top of the mountain the.', 'Reached they finally the top of the mountain.'], correct: 0, explanation: 'Subject + Adverb + Verb + Object is the normal order.' },
    { id: 15, text: 'She will ___ home before dinner.', options: ['return', 'returns', 'is return', 'does return'], correct: 0, explanation: 'After the modal "will", use the base verb.' },
    { id: 16, text: 'Only a few plants ___ the harsh winter.', options: ['survive', 'survives', 'is survive', 'does survive'], correct: 0, explanation: '"Plants" is plural, so no -s: they survive.' },
    { id: 17, text: 'Choose the correct word order:', options: ['She felt upset about the bad news.', 'She felt about the bad news upset.', 'Upset she felt about the bad news.', 'About the bad news she felt upset the.'], correct: 0, explanation: 'Subject + Verb (felt) + Adjective + Prepositional phrase is the normal order.' },
    { id: 18, text: 'His ___ was so quiet that no one heard him.', options: ['voice', 'voices', 'is voice', 'do voice'], correct: 0, explanation: '"His voice" is a singular noun used as the subject here.' },
    { id: 19, text: 'The ___ was too cold for a picnic today.', options: ['weather', 'weathers', 'is weather', 'do weather'], correct: 0, explanation: '"Weather" is uncountable and stays singular.' },
    { id: 20, text: 'Choose the correct word order:', options: ['The wise old man gave good advice.', 'The old wise man good advice gave.', 'Gave the wise old man good advice.', 'Good advice the wise old man gave.'], correct: 0, explanation: 'Subject (with adjectives before noun) + Verb + Object is the normal order.' },
  ],
};

const unit6Reading = {
  title: 'The Friendly Ghost',
  pages: [
    [
      { type: 'heading', text: 'The Friendly Ghost' },
      { type: 'p', text: 'A nice woman lived by a large river. She loved children. She wanted to help them in any way. She loved her community, and everyone in the community loved her. She lived a very long time and became very wise.' },
      { type: 'p', text: 'When she died, she became a ghost. She was dead, but every night she returned to her community. She wanted to help children and not to cause them fright. But she had a scary voice. Children were afraid of her, but the ghost was a good one. She only scared them to help them.' },
    ],
    [
      { type: 'p', text: 'One night, some children and a dog were playing by the river. They were having fun with their pet. But they were far from home. Then the weather became bad. It rained and rained. The river was rising. It was very dark. The children knew they were lost. They needed to go north, but they didn\'t know which direction it was. When the moon came out, they saw a ghost by the river. The ghost said, "Go away!"' },
    ],
    [
      { type: 'p', text: 'The children felt great fright. They knew it was a ghost. Then the ghost moved closer. She yelled again, "Go away!" The children became very upset. Some of them began to cry. The children knew they had a choice: they could escape, or they could stay and face this scary individual in the dark.' },
      { type: 'p', text: 'The children ran a long distance away. The ghost followed them all the way.' },
    ],
    [
      { type: 'p', text: 'Finally, the children reached home. The ghost was very happy. Soon the river rose higher and higher. It was very dangerous. The ghost had helped the children survive! She had saved them from the rising water. She also used her power to lead them home. Sometimes, meeting a ghost has advantages. A ghost can save your life.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['How a ghost returns to help her community', 'How a wise pet helps children escape a ghost', 'Why an individual has a job in the north', 'How some children escaped bad weather'], correct: 0 },
    { id: 2, text: 'What caused fright in the children?', options: ['The power of the moon at night', 'The bad weather near the river', 'The voice of the ghost', 'Their dead pet'], correct: 2 },
    { id: 3, text: 'What was true of the children in the story?', options: ['Their home was a short distance from the river.', 'They had the advantage of being ghosts.', "They didn't like to play near the river.", 'They were upset when they saw the ghost.'], correct: 3 },
    { id: 4, text: 'Why did the ghost scare the children?', options: ['She wanted to help them.', 'She had no other choice.', 'She was afraid of their pet.', "She didn't want them to see her."], correct: 0 },
    { id: 5, text: 'Where did the woman live?', options: ['By a large river', 'In a small village on a hill', 'Near a busy market', 'Inside a forest'], correct: 0 },
  ],
};

const unit6Listening = {
  title: 'Lost in the Storm',
  script: "Last summer, my family faced some scary weather during a camping trip. We were far from our tent, and the distance back looked huge in the storm. My little sister got upset and started to cry with fright.\n\nMy father, a wise and calm individual, told us to follow him closely so no one would get lost. \"We are one community out here, and we help each other,\" he said in a strong voice. We had a choice: stay and wait, or try to reach the car. We decided to try.\n\nAs we walked, our dog — our loyal pet — seemed to sense the way home, almost like a little ghost guiding us through the trees! In the end, we managed to escape the worst of the storm and survive without any real danger. It's a good thing our dog didn't cause us to get lost — it was actually an advantage having him with us. We finally returned to the car, wet but safe.",
  questions: [
    { id: 1, text: 'What caused the sister to feel fright?', options: ['A ghost story', 'The scary weather', 'A dead tree falling', 'Getting lost at school'], correct: 1 },
    { id: 2, text: "Who told the family to follow him?", options: ['A stranger', 'The father', 'A park ranger', 'The dog'], correct: 1 },
    { id: 3, text: 'What choice did the family have?', options: ['Stay and wait, or try to reach the car', 'Call for help, or build a shelter', 'Return home, or continue camping', 'Sleep outside, or find a cave'], correct: 0 },
    { id: 4, text: 'What helped guide the family home?', options: ['A map', 'Their pet dog', 'A flashlight', 'A neighbor'], correct: 1 },
    { id: 5, text: 'How did the family feel when they reached the car?', options: ['Wet but safe', 'Still lost', 'Angry with each other', 'Very upset'], correct: 0 },
  ],
};

export const lessons02to06 = [
  { id: 'essential-lesson-2', title: 'Lesson 2', words: unit2Words, grammar: unit2Grammar, reading: unit2Reading, listening: unit2Listening },
  { id: 'essential-lesson-3', title: 'Lesson 3', words: unit3Words, grammar: unit3Grammar, reading: unit3Reading, listening: unit3Listening },
  { id: 'essential-lesson-4', title: 'Lesson 4', words: unit4Words, grammar: unit4Grammar, reading: unit4Reading, listening: unit4Listening },
  { id: 'essential-lesson-5', title: 'Lesson 5', words: unit5Words, grammar: unit5Grammar, reading: unit5Reading, listening: unit5Listening },
  { id: 'essential-lesson-6', title: 'Lesson 6', words: unit6Words, grammar: unit6Grammar, reading: unit6Reading, listening: unit6Listening },
];
