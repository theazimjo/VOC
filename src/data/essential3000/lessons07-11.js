// Units 7-11 of "Essential 3000", sourced from "4000 Essential English Words 1"
// by Paul Nation (Compass Publishing) via pdftotext extraction of
// src/assets/data/essential english 1.pdf. Words, definitions, example
// sentences, and reading stories are transcribed from the book (each
// unit's final reading question lost its answer options to an OCR/layout
// gap in the source PDF, so those four options are original, following the
// same pattern used for Lesson 1). Uzbek translations are original. The
// listening dialogues are original narration written to reuse each unit's
// 20 target words. The grammar-stage exercises are original, following the
// style of Lesson 1's `lesson1Grammar` in essential3000.js.

const unit7Words = [
  { id: 'l7w1', word: 'allow', translation: 'ruxsat bermoq', definition: 'To allow something to happen means to let it happen.', example: 'Having a ticket will allow you to enter the show.', partOfSpeech: 'verb' },
  { id: 'l7w2', word: 'announce', translation: "e'lon qilmoq", definition: 'To announce something is to make it known.', example: 'He announced to everyone his new idea for the company.', partOfSpeech: 'verb' },
  { id: 'l7w3', word: 'beside', translation: 'yonida', definition: 'When someone or something is beside you, they are next to you.', example: 'The two brothers stood beside each other.', partOfSpeech: 'preposition' },
  { id: 'l7w4', word: 'challenge', translation: 'qiyinchilik, sinov', definition: 'A challenge is something difficult to complete.', example: 'It was a challenge to climb to the top of the mountain.', partOfSpeech: 'noun' },
  { id: 'l7w5', word: 'claim', translation: "da'vo qilmoq", definition: 'To claim means to say that something is true.', example: "He claimed to know why the country's laws were weak.", partOfSpeech: 'verb' },
  { id: 'l7w6', word: 'condition', translation: 'holat', definition: 'The condition of someone or something is the state that they are in.', example: "The patient's condition was very good.", partOfSpeech: 'noun' },
  { id: 'l7w7', word: 'contribute', translation: "hissa qo'shmoq", definition: 'To contribute to something means to do something to make it successful.', example: 'We decided to contribute money to the new hospital.', partOfSpeech: 'verb' },
  { id: 'l7w8', word: 'difference', translation: 'farq', definition: 'A difference is a way that something is not like other things.', example: 'The biggest difference between the birds is the color of their feathers.', partOfSpeech: 'noun' },
  { id: 'l7w9', word: 'divide', translation: "bo'lmoq", definition: 'To divide something is to make it into smaller parts.', example: 'We divided the pizza.', partOfSpeech: 'verb' },
  { id: 'l7w10', word: 'expert', translation: 'mutaxassis', definition: 'An expert is someone who is very good at doing something.', example: 'The wizard was an expert at magic.', partOfSpeech: 'noun' },
  { id: 'l7w11', word: 'famous', translation: 'mashhur', definition: 'If someone or something is famous, they are known to many people.', example: 'The Eiffel Tower in Paris is very famous.', partOfSpeech: 'adjective' },
  { id: 'l7w12', word: 'force', translation: 'kuch', definition: "Force is a person's strength or power.", example: 'He used all his force to try and open the door.', partOfSpeech: 'noun' },
  { id: 'l7w13', word: 'harm', translation: 'zarar', definition: 'Harm is hurt or problems caused to someone or something.', example: 'A hot iron can cause great harm if you are not careful.', partOfSpeech: 'noun' },
  { id: 'l7w14', word: 'lay', translation: "qo'ymoq, yotqizmoq", definition: 'To lay means to put or place in a horizontal or flat position.', example: "Don't lay your socks on the floor.", partOfSpeech: 'verb' },
  { id: 'l7w15', word: 'peace', translation: 'tinchlik', definition: 'Peace is a time without war.', example: 'A white dove is a symbol for peace.', partOfSpeech: 'noun' },
  { id: 'l7w16', word: 'prince', translation: 'shahzoda', definition: 'A prince is the son of a king.', example: 'The prince and the princess were married.', partOfSpeech: 'noun' },
  { id: 'l7w17', word: 'protect', translation: 'himoya qilmoq', definition: 'To protect someone is to stop them from getting hurt.', example: 'Firemen protect us from fires.', partOfSpeech: 'verb' },
  { id: 'l7w18', word: 'sense', translation: 'his qilmoq', definition: 'To sense something is to know about it without being told.', example: 'I could sense that he was watching me.', partOfSpeech: 'verb' },
  { id: 'l7w19', word: 'sudden', translation: "to'satdan yuz beradigan", definition: 'When something is sudden, it happens very quickly.', example: 'He felt a sudden pain in his chest.', partOfSpeech: 'adjective' },
  { id: 'l7w20', word: 'therefore', translation: 'shuning uchun', definition: 'Therefore means for this reason.', example: 'He is fat. Therefore, he will go on a diet.', partOfSpeech: 'adverb' },
];

const unit7Grammar = {
  questions: [
    { id: 1, text: 'The teacher will not ___ phones in class.', options: ['allow', 'allows', 'is allow', 'does allow'], correct: 0, explanation: 'After "will not", use the base verb.' },
    { id: 2, text: 'Choose the correct question:', options: ['Did the mayor announce the results?', 'Does the mayor announced the results?', 'Was the mayor announce the results?', 'Do the mayor announced the results?'], correct: 0, explanation: 'Use "Did" + subject + base verb for past questions.' },
    { id: 3, text: 'Choose the correct word order:', options: ['My dog sat beside me all night.', 'My dog beside me sat all night.', 'Beside me my dog sat all night.', 'All night beside me my dog sat.'], correct: 0, explanation: 'Subject + Verb + Prepositional phrase + Time is the normal order.' },
    { id: 4, text: 'This math problem ___ a real challenge.', options: ['is', 'are', 'do', 'does'], correct: 0, explanation: '"This math problem" is singular, so use "is".' },
    { id: 5, text: 'He ___ that he saw the accident happen.', options: ['claim', 'claims', 'is claim', 'do claims'], correct: 1, explanation: '"He" is singular, so add -s: claims.' },
    { id: 6, text: 'Choose the correct word order:', options: ['The old car is in poor condition.', 'The old car in poor is condition.', 'In poor condition the old car is.', 'Is the old car in poor condition.'], correct: 0, explanation: 'Subject + Verb + Prepositional phrase is the normal order.' },
    { id: 7, text: 'Every student should ___ to the group project.', options: ['contribute', 'contributes', 'is contribute', 'does contribute'], correct: 0, explanation: 'After the modal "should", use the base verb.' },
    { id: 8, text: 'Choose the correct word order:', options: ['There is a big difference between the twins.', 'There a big difference is between the twins.', 'Between the twins there is a big difference.', 'A big difference there is between the twins.'], correct: 0, explanation: '"There is/are" + subject + prepositional phrase is the normal order.' },
    { id: 9, text: 'The teacher will ___ the class into two groups.', options: ['divide', 'divides', 'is divide', 'does divide'], correct: 0, explanation: 'After the modal "will", use the base verb.' },
    { id: 10, text: 'An ___ can fix the broken engine quickly.', options: ['expert', 'experts', 'is expert', 'do expert'], correct: 0, explanation: '"An expert" — singular noun after the article "an".' },
    { id: 11, text: 'That singer is ___ all over the world.', options: ['famous', 'famouses', 'is famous', 'does famous'], correct: 0, explanation: 'Adjectives follow the linking verb directly, with no -s.' },
    { id: 12, text: 'Choose the correct word order:', options: ['The wind blew with great force.', 'The wind with great force blew.', 'With great force the wind blew.', 'Blew the wind with great force.'], correct: 0, explanation: 'Subject + Verb + Prepositional phrase is the normal order.' },
    { id: 13, text: 'Smoking can cause serious ___ to your lungs.', options: ['harm', 'harms', 'is harm', 'do harm'], correct: 0, explanation: '"Harm" is uncountable and stays singular.' },
    { id: 14, text: 'Please ___ the baby down gently.', options: ['lay', 'lays', 'is lay', 'does lay'], correct: 0, explanation: 'In an imperative sentence, use the base verb.' },
    { id: 15, text: 'Choose the correct word order:', options: ['The two countries finally made peace.', 'The two countries peace finally made.', 'Finally made the two countries peace.', 'Peace the two countries finally made.'], correct: 0, explanation: 'Subject + Adverb + Verb + Object is the normal order.' },
    { id: 16, text: 'The young ___ will become king someday.', options: ['prince', 'princes', 'is prince', 'do prince'], correct: 0, explanation: '"The young prince" — the noun stays singular after "the".' },
    { id: 17, text: 'Choose the correct word order:', options: ['Soldiers protect the country from danger.', 'Soldiers the country protect from danger.', 'From danger soldiers protect the country.', 'Protect soldiers the country from danger.'], correct: 0, explanation: 'Subject + Verb + Object + Prepositional phrase is the normal order.' },
    { id: 18, text: 'I could ___ that something was wrong.', options: ['sense', 'senses', 'is sense', 'does sense'], correct: 0, explanation: 'After the modal "could", use the base verb.' },
    { id: 19, text: 'A ___ noise made everyone jump.', options: ['sudden', 'suddens', 'is sudden', 'does sudden'], correct: 0, explanation: 'Adjectives like "sudden" go before the noun and do not take -s.' },
    { id: 20, text: 'Choose the correct word order:', options: ['It rained hard. Therefore, we stayed home.', 'It rained hard. We therefore home stayed.', 'It rained hard. Stayed we therefore home.', 'It rained hard. Home we stayed therefore.'], correct: 0, explanation: '"Therefore" usually begins a new sentence, followed by a comma.' },
  ],
};

const unit7Reading = {
  title: 'The Best Prince',
  pages: [
    [
      { type: 'heading', text: 'The Best Prince' },
      { type: 'p', text: 'King Minos was very sick. His condition was getting worse. He had three sons. He loved them all. He had to announce who would become king.' },
      { type: 'p', text: 'Two of the princes stood waiting outside the king\'s room. Theseus was the oldest and strongest. He thought his father would make him king. Pelias, the second son, thought differently. He was an expert with weapons. He thought the king would choose him.' },
    ],
    [
      { type: 'p', text: '"When I\'m king," Theseus told Pelias, "I\'ll let you contribute to the defense of our country. You can lead the army."' },
      { type: 'p', text: 'Pelias became angry. "Father knows I\'m famous for my sword skills. He\'ll make me king."' },
      { type: 'p', text: '"You?" Theseus yelled. "He won\'t choose you!"' },
      { type: 'p', text: '"The kingdom is mine!" Pelias claimed. "Father will give it to me — or I\'ll use force to take it!"' },
    ],
    [
      { type: 'p', text: 'Theseus made a sudden move to take out his sword. Then Pelias did the same. "Beating me will be a challenge," Theseus said. "Fight me now. The winner gets the kingdom!" Pelias agreed.' },
      { type: 'p', text: 'King Minos could hear his sons fighting. The youngest son, Jason, stood beside him. He sensed his father\'s sadness. The king laid his hand flat on Jason\'s arm.' },
    ],
    [
      { type: 'p', text: '"Your brothers fight too much," the king told him. "I must protect my kingdom from all harm. They\'ll divide it between them. The people won\'t know what to do. There\'ll be war. I can\'t allow either of them to be king. Therefore, I\'m making you king. Your kindness has always made you special. It\'s the difference between you and your brothers. You can bring peace. They can\'t."' },
      { type: 'p', text: 'Then the king died. Theseus and Pelias heard that their youngest brother was king. They were surprised. They realized that their fighting was wrong. It had kept them from saying goodbye to their father. They agreed to have Jason as their king. He was the best choice.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['A sudden fight between kings', 'A kind prince who got a kingdom', 'An expert sister and a famous king', 'The challenge to divide the kingdom'], correct: 1 },
    { id: 2, text: 'What did the king need to protect the kingdom from?', options: ['The fighting between the two princes', 'The harm caused by sudden fights', 'The differences between the three brothers', "The poor condition of the king's army"], correct: 0 },
    { id: 3, text: 'What was probably true of Jason in the story?', options: ['He wanted to bring peace to the kingdom.', 'The challenge of being king was too much for him.', 'He wanted harm to come to his brothers.', 'He hoped to divide the kingdom.'], correct: 0 },
    { id: 4, text: 'What was the difference between Jason and his brothers?', options: ['He was an expert with weapons.', 'He was older and stronger.', 'He made more sense.', 'He had always been kind.'], correct: 3 },
    { id: 5, text: 'What did the king have to announce?', options: ['Which of his three sons would become king', 'Whether the kingdom would go to war', 'How the kingdom would be divided among the people', 'When his sons would fight for the throne'], correct: 0 },
  ],
};

const unit7Listening = {
  title: 'A Class Election',
  script: "Our class had to announce a new class leader, and it was a real challenge to choose. Two students, Amy and Noah, both claimed they were the best expert on helping others, and each hoped the teacher would allow them to lead.\n\nAmy stood beside the whiteboard and said she would contribute extra time to protect the classroom's peace by stopping arguments. Noah said his force of personality would help unite the class, and he sensed that people would vote for him because he was already a little famous for organizing fun games.\n\nIn the end, the teacher didn't want to divide the class over a difference of opinion, so she had a sudden idea: both students would work together. \"There's no need to compete,\" she said. \"Therefore, you'll both lead — as long as the class stays in good condition and everyone helps each other, without harm to anyone's feelings.\" Amy and Noah agreed, and it turned out to be the best decision for everyone.",
  questions: [
    { id: 1, text: 'What did Amy and Noah both claim?', options: ['That they were the best expert at helping others', 'That they wanted to skip the election', 'That the teacher was unfair', 'That they didn\'t want to lead'], correct: 0 },
    { id: 2, text: 'What did Amy say she would protect?', options: ["The classroom's peace", 'Her grades', 'Her friends', 'The school building'], correct: 0 },
    { id: 3, text: 'Why did Noah think people would vote for him?', options: ['He was famous for organizing fun games.', 'He was the tallest student.', 'He was the teacher\'s favorite.', 'He gave everyone candy.'], correct: 0 },
    { id: 4, text: "What was the teacher's sudden idea?", options: ['Both students would lead together.', 'No one would be the leader.', 'The class would vote again next week.', 'Amy and Noah would compete in a game.'], correct: 0 },
    { id: 5, text: 'What did the teacher say about the class staying in good condition?', options: ['Everyone should help each other without harm to feelings.', 'Everyone should study harder.', 'Everyone should divide into small groups.', 'Everyone should stay quiet during class.'], correct: 0 },
  ],
};

const unit8Words = [
  { id: 'l8w1', word: 'accept', translation: 'qabul qilmoq', definition: 'To accept something that is offered is to take it.', example: "I accepted the girl's very nice gift.", partOfSpeech: 'verb' },
  { id: 'l8w2', word: 'arrange', translation: 'tartibga solmoq', definition: 'To arrange things is to put them in the right place.', example: 'Please arrange the bowling pins in order so we can play.', partOfSpeech: 'verb' },
  { id: 'l8w3', word: 'attend', translation: 'qatnashmoq', definition: 'To attend something is to go to it.', example: 'My sister and I attend the same school.', partOfSpeech: 'verb' },
  { id: 'l8w4', word: 'balance', translation: 'muvozanat saqlamoq', definition: 'To balance something is to keep it from falling.', example: 'We saw an elephant balance itself on a ball.', partOfSpeech: 'verb' },
  { id: 'l8w5', word: 'contrast', translation: 'farq, tafovut', definition: 'A contrast is the sharp difference between two things.', example: 'The contrast between my parents is very noticeable.', partOfSpeech: 'noun' },
  { id: 'l8w6', word: 'encourage', translation: 'rag\'batlantirmoq', definition: 'To encourage someone is to make them want to do something.', example: 'My football coach will encourage us when we are losing.', partOfSpeech: 'verb' },
  { id: 'l8w7', word: 'familiar', translation: 'tanish', definition: 'If someone or something is familiar to you, you know them well.', example: 'The two friends were very familiar with each other.', partOfSpeech: 'adjective' },
  { id: 'l8w8', word: 'grab', translation: 'ushlab olmoq', definition: 'To grab is to take a hold of someone or something suddenly.', example: 'I grabbed a pear from the tree.', partOfSpeech: 'verb' },
  { id: 'l8w9', word: 'hang', translation: 'osmoq, osilmoq', definition: 'To hang something is to keep it above the ground.', example: 'I drew a picture of my family, and my mother hung it on the wall.', partOfSpeech: 'verb' },
  { id: 'l8w10', word: 'huge', translation: 'ulkan', definition: 'If something is huge, it is very big.', example: 'At work, my father drives a huge truck.', partOfSpeech: 'adjective' },
  { id: 'l8w11', word: 'necessary', translation: 'zarur', definition: 'If something is necessary, you must do it.', example: 'It is necessary to have a passport when you travel to a foreign country.', partOfSpeech: 'adjective' },
  { id: 'l8w12', word: 'pattern', translation: 'naqsh, andoza', definition: 'A pattern is a way in which something is done or organized.', example: 'My pattern of brushing my teeth is the same as most people\'s.', partOfSpeech: 'noun' },
  { id: 'l8w13', word: 'propose', translation: 'taklif qilmoq', definition: 'To propose something is to say that it should be done.', example: 'Santa Claus proposed that I try to be a good boy all year.', partOfSpeech: 'verb' },
  { id: 'l8w14', word: 'purpose', translation: 'maqsad', definition: 'A purpose is the reason that you do something.', example: 'The purpose of exercising is to get into shape.', partOfSpeech: 'noun' },
  { id: 'l8w15', word: 'release', translation: "qo'yib yubormoq", definition: 'To release something is to stop holding it.', example: 'She released the bird from her hands.', partOfSpeech: 'verb' },
  { id: 'l8w16', word: 'require', translation: 'talab qilmoq', definition: 'To require something is to say that it is necessary.', example: 'We require teachers to have a university degree.', partOfSpeech: 'verb' },
  { id: 'l8w17', word: 'single', translation: 'yagona, bitta', definition: 'If something is single, then there is only one.', example: 'I have a single key in my hand.', partOfSpeech: 'adjective' },
  { id: 'l8w18', word: 'success', translation: 'muvaffaqiyat', definition: 'Success is doing something well that you choose to do.', example: 'My daughter was a big success at school.', partOfSpeech: 'noun' },
  { id: 'l8w19', word: 'tear', translation: 'yirtmoq', definition: 'To tear something means to pull it apart.', example: 'It is easy to tear paper.', partOfSpeech: 'verb' },
  { id: 'l8w20', word: 'theory', translation: 'nazariya', definition: 'A theory is an idea about how something works.', example: "We talked about Einstein's theory of relativity in class.", partOfSpeech: 'noun' },
];

const unit8Grammar = {
  questions: [
    { id: 1, text: 'She was happy to ___ the job offer.', options: ['accept', 'accepts', 'is accept', 'does accept'], correct: 0, explanation: 'After "to", use the base verb (infinitive).' },
    { id: 2, text: 'Choose the correct question:', options: ['Did you arrange the chairs for the party?', 'Does you arranged the chairs for the party?', 'Was you arrange the chairs for the party?', 'Do you arranged the chairs for the party?'], correct: 0, explanation: 'Use "Did" + subject + base verb for past questions.' },
    { id: 3, text: 'All students must ___ the morning meeting.', options: ['attend', 'attends', 'is attend', 'does attend'], correct: 0, explanation: 'After the modal "must", use the base verb.' },
    { id: 4, text: 'Choose the correct word order:', options: ['The dancer can balance on one foot.', 'The dancer on one foot can balance.', 'Can the dancer balance on one foot.', 'On one foot the dancer can balance.'], correct: 0, explanation: 'Subject + Modal + Verb + Prepositional phrase is the normal order.' },
    { id: 5, text: 'There ___ a big contrast between the two paintings.', options: ['is', 'are', 'do', 'does'], correct: 0, explanation: '"A big contrast" is singular, so use "is".' },
    { id: 6, text: 'Choose the correct word order:', options: ['Her coach always encourages her.', 'Her coach her always encourages.', 'Always her coach encourages her.', 'Encourages her coach always her.'], correct: 0, explanation: 'Subject + Adverb + Verb + Object is the normal order.' },
    { id: 7, text: 'This song sounds ___ to me.', options: ['familiar', 'familiars', 'is familiar', 'does familiar'], correct: 0, explanation: 'Adjectives follow the linking verb directly, with no -s.' },
    { id: 8, text: 'Choose the correct word order:', options: ['He quickly grabbed his umbrella.', 'He grabbed quickly his umbrella.', 'Quickly grabbed he his umbrella.', 'His umbrella he quickly grabbed the.'], correct: 0, explanation: 'The adverb "quickly" often goes right before the main verb.' },
    { id: 9, text: 'They ___ the painting on the living room wall.', options: ['hang', 'hangs', 'is hang', 'does hang'], correct: 0, explanation: '"They" is plural, so no -s: they hang.' },
    { id: 10, text: 'An elephant is a ___ animal.', options: ['huge', 'huges', 'is huge', 'does huge'], correct: 0, explanation: 'Adjectives like "huge" go before the noun and do not take -s.' },
    { id: 11, text: 'It is ___ to wear a helmet when you ride a bike.', options: ['necessary', 'necessaries', 'is necessary', 'do necessary'], correct: 0, explanation: '"It" is singular, so use "is" + adjective.' },
    { id: 12, text: 'Choose the correct word order:', options: ['The rug has a beautiful pattern.', 'The rug a beautiful pattern has.', 'Has the rug a beautiful pattern.', 'A beautiful pattern the rug has.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 13, text: 'The manager will ___ a new plan tomorrow.', options: ['propose', 'proposes', 'is propose', 'does propose'], correct: 0, explanation: 'After the modal "will", use the base verb.' },
    { id: 14, text: 'Choose the correct word order:', options: ['The purpose of the meeting was clear.', 'The meeting purpose of the was clear.', 'Clear the purpose of the meeting was.', 'Was the purpose of the meeting clear.'], correct: 0, explanation: 'Subject + Verb + Adjective is the normal order.' },
    { id: 15, text: 'She decided to ___ the fish back into the lake.', options: ['release', 'releases', 'is release', 'does release'], correct: 0, explanation: 'After "to", use the base verb (infinitive).' },
    { id: 16, text: 'This job ___ two years of experience.', options: ['require', 'requires', 'is require', 'does require'], correct: 1, explanation: '"This job" is singular, so add -s: requires.' },
    { id: 17, text: 'She wore a ___ red rose in her hair.', options: ['single', 'singles', 'is single', 'does single'], correct: 0, explanation: 'Adjectives do not take -s.' },
    { id: 18, text: 'Choose the correct word order:', options: ['Hard work usually leads to success.', 'Hard work to success usually leads.', 'Usually hard work leads to success the.', 'Leads hard work usually to success.'], correct: 0, explanation: 'Subject + Adverb + Verb + Prepositional phrase is the normal order.' },
    { id: 19, text: 'Be careful, or you will ___ the paper.', options: ['tear', 'tears', 'is tear', 'does tear'], correct: 0, explanation: 'After the modal "will", use the base verb.' },
    { id: 20, text: 'Scientists tested a new ___ about the stars.', options: ['theory', 'theories', 'is theory', 'do theory'], correct: 0, explanation: '"A new theory" — singular noun after the article "a".' },
  ],
};

const unit8Reading = {
  title: 'How the Sun and the Moon Were Made',
  pages: [
    [
      { type: 'heading', text: 'How the Sun and the Moon Were Made' },
      { type: 'p', text: 'Do you ever wonder where the moon and the sun came from? The Inuit people of Alaska have a theory.' },
      { type: 'p', text: 'They tell a story about a beautiful girl. She was very nice. In contrast, her brother was a mean little boy. One day he proposed something. "We should go to a party," he said. The girl accepted. First, it was necessary for her to prepare. She arranged her hair and put on nice clothes. This required a lot of time. But the girl worked hard, and soon she had success. She looked perfect.' },
    ],
    [
      { type: 'p', text: 'They attended the party together. The girl was having fun. Later, she walked into the bathroom. Suddenly, the lights were turned off! Someone grabbed her hair and tore her clothes. She ran out of the bathroom. She wanted to know who did this to her.' },
      { type: 'p', text: 'Then she had an idea. She fixed her hair again. This time it was even more beautiful. She even balanced beautiful jewels in it. She wanted to encourage the person to grab it again. She put black dirt in her hair. The purpose of this was to catch the person.' },
    ],
    [
      { type: 'p', text: 'She went to the bathroom again, and it was the same pattern. The lights went off, and someone grabbed her hair. When he released it, his hand was black. The girl returned to the party. She knew there was only a single person with a black hand. When she saw that person, he was very familiar. It was her brother!' },
    ],
    [
      { type: 'p', text: 'He ran into the woods. The girl ran after him. They both carried fire so they could see in the dark. The smoke went into the air. As they ran, they grew. They became huge. Then they went into space. When the girl\'s fire went out, she hung in the sky. She became the moon, and her brother became the sun. They chase each other forever.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['The contrast between the sun and the moon', 'A theory of how the moon and the sun were made', 'The purpose of the sun and the moon', 'Why it is necessary for the moon to balance in the sky'], correct: 1 },
    { id: 2, text: 'Why does the girl encourage someone to grab her hair?', options: ["She doesn't want him to tear her dress.", 'She wants to become huge and hang in the sky.', 'She wants to know who grabbed her hair.', 'She wants the party to be a success.'], correct: 2 },
    { id: 3, text: 'What was true of the boy in the story?', options: ['He accepted the invitation when his sister proposed a party.', "He didn't want to attend the party.", 'He was the only person with a black hand.', 'He wore a shirt with a beautiful pattern.'], correct: 2 },
    { id: 4, text: 'Why does the girl become angry?', options: ['The boy does not release her hair.', 'She is required to arrange her hair.', 'The smoke from her fire went into the air.', 'She sees someone familiar with a black hand.'], correct: 3 },
    { id: 5, text: 'How does the girl get ready for the party?', options: ['She arranges her hair and puts on nice clothes.', 'She paints a huge pattern on her face.', 'She asks her brother to help her dress.', 'She practices balancing jewels for hours.'], correct: 0 },
  ],
};

const unit8Listening = {
  title: 'Getting Ready for the Show',
  script: "Maya had to attend a big dance show, and she needed to arrange everything carefully. It was necessary for her to accept help from her friends, since a single person couldn't do it all alone.\n\nHer teacher proposed a new pattern for the group dance, one that required everyone to balance perfectly on one foot at the same time. It looked huge and difficult, but the purpose was to show a beautiful contrast between fast and slow movements.\n\nDuring practice, Maya's costume began to tear a little, so her friend grabbed a needle to fix it before it got worse. Her teacher encouraged everyone, saying the show would be a great success if they stayed familiar with every step. In the end, the audience clapped so loudly that the sound seemed to hang in the air. It was, everyone agreed, their best show ever — proof of the old theory that hard work always pays off.",
  questions: [
    { id: 1, text: 'What did Maya need to arrange?', options: ['A big dance show', 'A birthday party', 'A school trip', 'A sports match'], correct: 0 },
    { id: 2, text: "What did the teacher's new pattern require?", options: ['Everyone to balance on one foot', 'Everyone to sing loudly', 'Everyone to wear the same color', 'Everyone to dance alone'], correct: 0 },
    { id: 3, text: "What happened to Maya's costume?", options: ['It began to tear.', 'It was too small.', 'It was the wrong color.', 'It got lost.'], correct: 0 },
    { id: 4, text: 'What did the teacher say would make the show a success?', options: ['Staying familiar with every step', 'Wearing bigger costumes', 'Practicing alone at home', 'Skipping the hard parts'], correct: 0 },
    { id: 5, text: 'How did the audience react at the end?', options: ['They clapped loudly.', 'They stayed silent.', 'They left early.', 'They asked for a refund.'], correct: 0 },
  ],
};

const unit9Words = [
  { id: 'l9w1', word: 'against', translation: 'qarshi', definition: 'To be against something is to be touching it or opposed to it.', example: 'They both leaned against the wall.', partOfSpeech: 'preposition' },
  { id: 'l9w2', word: 'beach', translation: 'plyaj, qirg\'oq', definition: 'The beach is a sandy or rocky place by the ocean.', example: 'The little girl built a sandcastle on the beach.', partOfSpeech: 'noun' },
  { id: 'l9w3', word: 'damage', translation: 'shikastlamoq', definition: 'To damage something is to break it.', example: 'The car was damaged in the accident.', partOfSpeech: 'verb' },
  { id: 'l9w4', word: 'discover', translation: 'kashf qilmoq', definition: 'To discover something is to find it for the first time.', example: 'I discovered some new information in this book!', partOfSpeech: 'verb' },
  { id: 'l9w5', word: 'emotion', translation: 'tuyg\'u, hissiyot', definition: 'An emotion is how you feel.', example: 'Anger is a common emotion that we all feel.', partOfSpeech: 'noun' },
  { id: 'l9w6', word: 'fix', translation: 'tuzatmoq', definition: 'To fix something is to make it work.', example: 'My dad has many tools to help him fix broken things.', partOfSpeech: 'verb' },
  { id: 'l9w7', word: 'frank', translation: 'ochiq, samimiy', definition: 'If you are frank, you are being very honest.', example: 'The teacher had a frank discussion with her students.', partOfSpeech: 'adjective' },
  { id: 'l9w8', word: 'identify', translation: 'aniqlamoq', definition: 'To identify something is to be able to name it.', example: 'I used the file to identify his name.', partOfSpeech: 'verb' },
  { id: 'l9w9', word: 'island', translation: 'orol', definition: 'An island is land in the middle of water.', example: 'Japan is a group of islands.', partOfSpeech: 'noun' },
  { id: 'l9w10', word: 'ocean', translation: 'okean', definition: 'The ocean is all of the salt water that surrounds land.', example: 'The ocean can make powerful waves.', partOfSpeech: 'noun' },
  { id: 'l9w11', word: 'perhaps', translation: 'balki', definition: 'Perhaps is used when you say that something could happen.', example: 'Perhaps I will eat an apple for lunch.', partOfSpeech: 'adverb' },
  { id: 'l9w12', word: 'pleasant', translation: 'yoqimli', definition: 'If something is pleasant, you enjoy it.', example: 'The character had a pleasant look on its face.', partOfSpeech: 'adjective' },
  { id: 'l9w13', word: 'prevent', translation: 'oldini olmoq', definition: 'To prevent something is to stop it from happening.', example: 'The handcuffs prevented me from moving my hands.', partOfSpeech: 'verb' },
  { id: 'l9w14', word: 'rock', translation: 'tosh, qoya', definition: 'A rock is a hard thing in the dirt.', example: 'I stacked rocks on top of one another.', partOfSpeech: 'noun' },
  { id: 'l9w15', word: 'save', translation: 'qutqarmoq', definition: 'To save something is to keep it from being hurt.', example: 'I want to help save the world.', partOfSpeech: 'verb' },
  { id: 'l9w16', word: 'step', translation: 'qadam bosmoq', definition: 'To step is to walk.', example: 'Be careful where you step.', partOfSpeech: 'verb' },
  { id: 'l9w17', word: 'still', translation: 'hali ham', definition: 'Still is used when you say that a situation keeps going on.', example: 'They are still waiting in line to get tickets.', partOfSpeech: 'adverb' },
  { id: 'l9w18', word: 'taste', translation: "ta'm", definition: 'A taste is the flavor something makes in your mouth.', example: 'The taste of the fruit was sweet.', partOfSpeech: 'noun' },
  { id: 'l9w19', word: 'throw', translation: 'otmoq, tashlamoq', definition: 'To throw something is to use your hand to make it go through the air.', example: 'The pitcher can throw the baseball very fast.', partOfSpeech: 'verb' },
  { id: 'l9w20', word: 'wave', translation: "to'lqin", definition: 'A wave is a line of water that moves higher than the rest of the water.', example: 'The water was filled with large blue waves.', partOfSpeech: 'noun' },
];

const unit9Grammar = {
  questions: [
    { id: 1, text: 'Choose the correct word order:', options: ['The ladder leaned against the wall.', 'The ladder against the wall leaned.', 'Against the wall leaned the ladder.', 'Leaned the ladder against the wall.'], correct: 0, explanation: 'Subject + Verb + Prepositional phrase is the normal order.' },
    { id: 2, text: 'We spent the whole day at the ___.', options: ['beach', 'beaches', 'is beach', 'do beach'], correct: 0, explanation: '"The beach" — singular noun after the article "the".' },
    { id: 3, text: 'The storm ___ several houses last night.', options: ['damage', 'damaged', 'is damage', 'do damaged'], correct: 1, explanation: 'Use the simple past tense: damaged.' },
    { id: 4, text: 'Choose the correct question:', options: ['Did scientists discover a new star?', 'Does scientists discovered a new star?', 'Was scientists discover a new star?', 'Do scientists discovered a new star?'], correct: 0, explanation: 'Use "Did" + subject + base verb for past questions.' },
    { id: 5, text: 'Fear is a common ___ for many people.', options: ['emotion', 'emotions', 'is emotion', 'do emotion'], correct: 0, explanation: '"A common emotion" — singular noun after the article "a".' },
    { id: 6, text: 'Choose the correct word order:', options: ['My father can fix almost anything.', 'My father almost anything can fix.', 'Can my father fix almost anything.', 'Almost anything my father can fix.'], correct: 0, explanation: 'Subject + Modal + Verb + Object is the normal order.' },
    { id: 7, text: 'She was very ___ about her true feelings.', options: ['frank', 'franks', 'is frank', 'does frank'], correct: 0, explanation: 'Adjectives follow the linking verb directly, with no -s.' },
    { id: 8, text: 'Choose the correct word order:', options: ['Police officers can identify a stolen car.', 'Police officers a stolen car can identify.', 'Can police officers identify a stolen car.', 'A stolen car police officers can identify.'], correct: 0, explanation: 'Subject + Modal + Verb + Object is the normal order.' },
    { id: 9, text: 'They took a boat to a small ___.', options: ['island', 'islands', 'is island', 'do island'], correct: 0, explanation: '"A small island" — singular noun after the article "a".' },
    { id: 10, text: 'The ___ covers most of the Earth.', options: ['ocean', 'oceans', 'is ocean', 'do ocean'], correct: 0, explanation: '"The ocean" — singular noun after the article "the".' },
    { id: 11, text: 'Choose the correct word order:', options: ['Perhaps we will go swimming tomorrow.', 'We perhaps will go swimming tomorrow.', 'We will perhaps go swimming tomorrow.', 'Both A and C sound natural in English.'], correct: 3, explanation: '"Perhaps" can naturally begin a sentence or sit before the verb phrase.' },
    { id: 12, text: 'The weather today is very ___.', options: ['pleasant', 'pleasants', 'is pleasant', 'does pleasant'], correct: 0, explanation: 'Adjectives do not take -s.' },
    { id: 13, text: 'A good diet can ___ many illnesses.', options: ['prevent', 'prevents', 'is prevent', 'does prevent'], correct: 0, explanation: 'After the modal "can", use the base verb.' },
    { id: 14, text: 'Choose the correct word order:', options: ['A large rock blocked the path.', 'A large the path rock blocked.', 'Blocked a large rock the path.', 'The path a large rock blocked.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 15, text: 'Lifeguards work hard to ___ swimmers.', options: ['save', 'saves', 'is save', 'does save'], correct: 0, explanation: 'After "to", use the base verb (infinitive).' },
    { id: 16, text: 'Choose the correct word order:', options: ['Please step carefully on the ice.', 'Please carefully step on the ice.', 'Both A and B are correct orders.', 'On the ice please step carefully.'], correct: 2, explanation: 'The adverb "carefully" can naturally go before or after the verb here.' },
    { id: 17, text: 'The store is ___ open at this hour.', options: ['still', 'stills', 'is still', 'does still'], correct: 0, explanation: '"Still" as an adverb goes before the adjective/verb it describes.' },
    { id: 18, text: 'This soup has a strange ___.', options: ['taste', 'tastes', 'is taste', 'do taste'], correct: 0, explanation: '"A strange taste" — singular noun after the article "a".' },
    { id: 19, text: 'Choose the correct word order:', options: ['The boy threw the ball to his friend.', 'The boy the ball threw to his friend.', 'Threw the boy the ball to his friend.', 'To his friend the boy threw the ball the.'], correct: 0, explanation: 'Subject + Verb + Object + Prepositional phrase is the normal order.' },
    { id: 20, text: 'A huge ___ crashed onto the shore.', options: ['wave', 'waves', 'is wave', 'do wave'], correct: 0, explanation: '"A huge wave" — singular noun after the article "a".' },
  ],
};

const unit9Reading = {
  title: 'The Starfish',
  pages: [
    [
      { type: 'heading', text: 'The Starfish' },
      { type: 'p', text: 'Last summer I took a trip to an island. I had a lot of fun. I sat and watched the waves and listened to the ocean. I learned to identify birds. I discovered pretty things and enjoyed the taste of new foods. It was a very nice time.' },
      { type: 'p', text: 'One evening I took a pleasant walk by the ocean. When the waves came in, many starfish fell on the beach. Some starfish went back into the water, and they were safe. But other starfish were still on the sand. They would die if they did not get into the water.' },
    ],
    [
      { type: 'p', text: 'There were many starfish on the beach that night. It made me sad, but I knew I could not fix the problem. I stepped very carefully so I did not damage them.' },
      { type: 'p', text: 'Then I saw a little girl. She was also sad about the starfish. She wanted to prevent all of them from dying. She asked me if I could perhaps help her.' },
      { type: 'p', text: '"To be frank, I don\'t think we can do anything," I said.' },
    ],
    [
      { type: 'p', text: 'The little girl started to cry. She sat back against a rock and thought for a while. Finally, the emotion was gone. She stopped crying and stood up. Then she picked up a starfish and threw it into the water.' },
      { type: 'p', text: '"What are you doing?" I asked her. But she did not answer me. She just threw as many starfish as she could. "You cannot save all of them!" I said.' },
    ],
    [
      { type: 'p', text: 'She stopped to look at me. "No, I cannot save them all," she replied. Then she picked up a very big starfish and said, "But I can save this one." And then she smiled and threw the starfish as far as she could into the ocean.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['A girl who wants to save starfish', 'How to throw starfish', 'A girl who is too frank', 'Birds and animals at the ocean'], correct: 0 },
    { id: 2, text: "What causes the little girl's emotion?", options: ['She cannot fix the damage she finds to homes.', 'She cannot prevent starfish from dying in the sand.', 'She discovers starfish in the water.', 'She steps on a rock and hurts her foot.'], correct: 1 },
    { id: 3, text: 'What does the man think is NOT good about the island?', options: ['Watching the waves', 'Identifying birds', 'The starfish dying on the sand', 'Tasting new food'], correct: 2 },
    { id: 4, text: 'What does the girl think the man can perhaps do?', options: ['Identify birds', 'Take a walk on the beach', 'Discover something pretty', 'Help her save starfish'], correct: 3 },
    { id: 5, text: 'Which starfish were safe on the beach?', options: ['The ones the waves carried back into the ocean', 'The ones that were still on the sand', 'The ones that landed against a rock', 'The ones the little girl was crying about'], correct: 0 },
  ],
};

const unit9Listening = {
  title: 'A Day at the Beach',
  script: "Last weekend, I went to the beach and had a very pleasant time watching the waves against the rocks. I love the taste of the salty ocean air. While I was walking, I discovered something interesting stuck between two rocks — an old wooden box.\n\nI wanted to identify what was inside, so I tried to fix the lock, but it was damaged. Perhaps it had been in the ocean for years. My friend, who is always very frank, said, \"That's still just an old box, not a treasure!\" But I could sense a strange emotion of excitement.\n\nWe carried the box off the small island where we were staying and, step by step, we finally opened it at home. Inside, there was nothing valuable, only an old map — but it was enough to prevent us from being bored all summer, as we tried to figure out what it showed. We decided to save it as a fun memory of the trip, and I still think about that day at the beach.",
  questions: [
    { id: 1, text: 'What did the narrator discover at the beach?', options: ['An old wooden box', 'A group of starfish', 'A lost dog', 'A gold ring'], correct: 0 },
    { id: 2, text: 'What was wrong with the box?', options: ['The lock was damaged.', 'It was too heavy.', 'It was full of water.', 'It was on fire.'], correct: 0 },
    { id: 3, text: 'What did the friend say about the box?', options: ["It's still just an old box.", "It's definitely treasure.", "It's dangerous.", "It's not real."], correct: 0 },
    { id: 4, text: 'What was inside the box?', options: ['An old map', 'Gold coins', 'A letter', 'Nothing at all'], correct: 0 },
    { id: 5, text: 'What did they decide to do with the box?', options: ['Save it as a fun memory', 'Throw it back into the ocean', 'Sell it', 'Give it away'], correct: 0 },
  ],
};

const unit10Words = [
  { id: 'l10w1', word: 'benefit', translation: 'foyda', definition: 'A benefit is a good thing.', example: 'Being able to fly is a good benefit to birds.', partOfSpeech: 'noun' },
  { id: 'l10w2', word: 'certain', translation: 'ishonchli, aniq', definition: 'If you are certain about something, you know it is true.', example: 'I am certain that zebras have stripes.', partOfSpeech: 'adjective' },
  { id: 'l10w3', word: 'chance', translation: 'imkoniyat', definition: 'A chance is an opportunity to do something.', example: 'I had a chance to see the Roman Coliseum last summer.', partOfSpeech: 'noun' },
  { id: 'l10w4', word: 'effect', translation: "ta'sir, natija", definition: 'An effect is a change made by something else.', example: 'The medicine had a good effect on the boy.', partOfSpeech: 'noun' },
  { id: 'l10w5', word: 'essential', translation: 'zarur, muhim', definition: 'If something is essential, it is very important and necessary.', example: 'It is essential to have oxygen when you scuba dive.', partOfSpeech: 'adjective' },
  { id: 'l10w6', word: 'far', translation: 'uzoq', definition: 'If something is far, it is not close.', example: "It's far going from the east coast to the west coast of America.", partOfSpeech: 'adjective' },
  { id: 'l10w7', word: 'focus', translation: 'diqqatni jamlamoq', definition: 'To focus on something is to think about it and pay attention to it.', example: 'My mom always helps me to focus on my school work.', partOfSpeech: 'verb' },
  { id: 'l10w8', word: 'function', translation: 'vazifa, funksiya', definition: 'The function of something is what it does.', example: 'The function of a flashlight is to help you see in the dark.', partOfSpeech: 'noun' },
  { id: 'l10w9', word: 'grass', translation: "o't, maysa", definition: 'Grass is the green leaves that cover the ground.', example: 'The grass looked so soft and green.', partOfSpeech: 'noun' },
  { id: 'l10w10', word: 'guard', translation: 'qo\'riqlamoq', definition: 'To guard something is to take care of it.', example: 'The police officer will guard us from any harm.', partOfSpeech: 'verb' },
  { id: 'l10w11', word: 'image', translation: 'tasvir, rasm', definition: 'The image of something is a picture of it.', example: 'The image of her eye was very clear.', partOfSpeech: 'noun' },
  { id: 'l10w12', word: 'immediate', translation: "zudlik bilan bo'ladigan", definition: 'If something is immediate, it happens quickly.', example: 'An immediate response came from the pizza place.', partOfSpeech: 'adjective' },
  { id: 'l10w13', word: 'primary', translation: 'asosiy', definition: 'If something is primary, it is the most important thing.', example: 'His primary thoughts are about money.', partOfSpeech: 'adjective' },
  { id: 'l10w14', word: 'proud', translation: 'faxrlangan', definition: 'If someone feels proud, they are happy about what they have done.', example: 'She is proud of the picture she drew of her house.', partOfSpeech: 'adjective' },
  { id: 'l10w15', word: 'remain', translation: 'qolmoq', definition: 'To remain somewhere is to stay there.', example: 'My sister had to remain home since she was sick.', partOfSpeech: 'verb' },
  { id: 'l10w16', word: 'rest', translation: 'dam olmoq', definition: 'To rest is to stop being active while the body gets back its strength.', example: 'I rested on the couch after work.', partOfSpeech: 'verb' },
  { id: 'l10w17', word: 'separate', translation: 'alohida', definition: 'If two things are separate, they are not together.', example: 'New York and Los Angeles are in two separate parts of America.', partOfSpeech: 'adjective' },
  { id: 'l10w18', word: 'site', translation: 'joy, hudud', definition: 'A site is a place.', example: 'We found the perfect site for our picnic.', partOfSpeech: 'noun' },
  { id: 'l10w19', word: 'tail', translation: 'dum', definition: "A tail is a part of an animal's body, sticking out from its rear or back.", example: 'Our dog wags its tail when it\'s happy.', partOfSpeech: 'noun' },
  { id: 'l10w20', word: 'trouble', translation: 'muammo', definition: 'Trouble is a problem or a difficulty.', example: 'I have trouble working with my boss.', partOfSpeech: 'noun' },
];

const unit10Grammar = {
  questions: [
    { id: 1, text: 'Exercise has many ___ for your health.', options: ['benefit', 'benefits', 'is benefit', 'do benefit'], correct: 1, explanation: '"Many" is followed by a plural noun: benefits.' },
    { id: 2, text: 'I am ___ that I locked the door.', options: ['certain', 'certains', 'is certain', 'does certain'], correct: 0, explanation: '"I" uses "am" + adjective, and adjectives do not take -s.' },
    { id: 3, text: 'Choose the correct word order:', options: ['She got a chance to travel abroad.', 'She a chance got to travel abroad.', 'Got she a chance to travel abroad.', 'To travel abroad she got a chance.'], correct: 0, explanation: 'Subject + Verb + Object + Infinitive phrase is the normal order.' },
    { id: 4, text: 'The medicine had a strong ___ on him.', options: ['effect', 'effects', 'is effect', 'do effect'], correct: 0, explanation: '"A strong effect" — singular noun after the article "a".' },
    { id: 5, text: 'Water is ___ for all living things.', options: ['essential', 'essentials', 'is essential', 'does essential'], correct: 0, explanation: 'Adjectives follow the linking verb directly, with no -s.' },
    { id: 6, text: 'Their house is ___ from the city center.', options: ['far', 'fars', 'is far', 'does far'], correct: 0, explanation: 'Adjectives like "far" do not take -s.' },
    { id: 7, text: 'Choose the correct word order:', options: ['She tried to focus on her homework.', 'She tried on her homework to focus.', 'To focus she tried on her homework.', 'On her homework she tried to focus the.'], correct: 0, explanation: 'Subject + Verb + Infinitive + Prepositional phrase is the normal order.' },
    { id: 8, text: 'The main ___ of a heart is to pump blood.', options: ['function', 'functions', 'is function', 'do function'], correct: 0, explanation: '"The main function" — singular noun after "the".' },
    { id: 9, text: 'The children played on the green ___.', options: ['grass', 'grasses', 'is grass', 'do grass'], correct: 0, explanation: '"Grass" is uncountable and stays singular.' },
    { id: 10, text: 'Two dogs ___ the front gate at night.', options: ['guard', 'guards', 'is guard', 'does guard'], correct: 0, explanation: '"Dogs" is plural, so no -s: they guard.' },
    { id: 11, text: 'Choose the correct word order:', options: ['The camera captured a clear image.', 'The camera a clear image captured.', 'Captured the camera a clear image.', 'A clear image the camera captured.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 12, text: 'We need an ___ answer right now.', options: ['immediate', 'immediates', 'is immediate', 'does immediate'], correct: 0, explanation: 'Adjectives like "immediate" go before the noun and do not take -s.' },
    { id: 13, text: 'Her ___ goal is to finish the race.', options: ['primary', 'primaries', 'is primary', 'does primary'], correct: 0, explanation: 'Adjectives go before the noun and do not take -s.' },
    { id: 14, text: 'Choose the correct word order:', options: ['He felt proud of his hard work.', 'He felt of his hard work proud.', 'Proud he felt of his hard work.', 'Of his hard work he felt proud the.'], correct: 0, explanation: 'Subject + Verb (felt) + Adjective + Prepositional phrase is the normal order.' },
    { id: 15, text: 'They will ___ in the city for two more weeks.', options: ['remain', 'remains', 'is remain', 'does remain'], correct: 0, explanation: 'After the modal "will", use the base verb.' },
    { id: 16, text: 'Choose the correct word order:', options: ['We need to rest after the long hike.', 'We need after the long hike to rest.', 'To rest we need after the long hike.', 'After the long hike we need rest to the.'], correct: 0, explanation: 'Subject + Verb + Infinitive + Prepositional phrase is the normal order.' },
    { id: 17, text: 'The two rooms are completely ___.', options: ['separate', 'separates', 'is separate', 'does separate'], correct: 0, explanation: 'Adjectives follow the linking verb directly, with no -s.' },
    { id: 18, text: 'This park is a popular ___ for picnics.', options: ['site', 'sites', 'is site', 'do site'], correct: 0, explanation: '"A popular site" — singular noun after the article "a".' },
    { id: 19, text: 'The dog wagged its ___ happily.', options: ['tail', 'tails', 'is tail', 'do tail'], correct: 0, explanation: '"Its tail" — singular noun (one dog, one tail).' },
    { id: 20, text: 'Choose the correct word order:', options: ['This project caused a lot of trouble.', 'This project a lot of trouble caused.', 'Caused this project a lot of trouble.', 'A lot of trouble this project caused.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
  ],
};

const unit10Reading = {
  title: 'The First Peacock',
  pages: [
    [
      { type: 'heading', text: 'The First Peacock' },
      { type: 'p', text: "Argos lived in Ancient Greece. He was a husband and a proud father. He worked hard and did well at his job. But one thing about him wasn't normal. He was born with 100 eyes. Having many eyes was usually a benefit to him. He had a chance to see many things." },
      { type: 'p', text: 'Also, since he had so many eyes, he was very good at guarding things. While sleeping, he only rested a few eyes at a time. The others stayed awake. He worked for Hera, a great goddess. His primary function was to guard a special cow. The cow was very important to Hera. It was her favorite pet. The most essential part of his job was to keep the cow alone. It had to be kept separate from all the other cows and far away from people.' },
    ],
    [
      { type: 'p', text: 'This was an easy job for Argos. The cow just ate grass all day. But the god Zeus wanted the cow. He wanted to take it away from Hera. He had a plan. He found a great music player. He asked the man to play a beautiful song for Argos. Zeus was certain Argos would go to sleep.' },
      { type: 'p', text: "The song had an immediate effect. Argos couldn't focus on his job. He fell asleep. Zeus saw this, and he took the cow." },
    ],
    [
      { type: 'p', text: 'Hera was very angry with Argos. She turned him into a peacock. She put his many eyes on his tail. Argos was very sad.' },
      { type: 'p', text: "Zeus saw how much trouble he had caused Argos. He made another plan. He turned Argos into a group of stars. He wanted Argos to remain in the sky forever. Even today, Argos' image remains there, above the site where all his problems began. We can still see him in the night sky." },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['Why it is essential to guard cows', 'How to play beautiful music', 'How the image of a peacock in the sky came about', 'How being born with 100 eyes benefited a man'], correct: 2 },
    { id: 2, text: "Why was guarding Hera's cow easy for Argos?", options: ['All it did was eat grass all day.', 'It was kept separate from all the other cows.', 'He had a chance to listen to music.', 'He was able to sleep instead of focusing on it.'], correct: 0 },
    { id: 3, text: 'Why did Zeus turn Argos into a group of stars?', options: ['He wanted Argos to see the site of his trouble.', 'He was certain that Argos would fall asleep.', 'He wanted to make Argos remain in the sky forever.', 'He wanted to cause Argos immediate trouble.'], correct: 2 },
    { id: 4, text: "What was the primary function of Argos' job?", options: ['To make sure the cow was never sad', 'To keep the cow far away from people', 'To see the effects of music on the cow', 'Work for a proud goddess named Hera'], correct: 1 },
    { id: 5, text: 'How did Argos sleep?', options: ['By resting only a few eyes at a time, keeping the rest awake', 'By closing all 100 eyes at once every night', 'By taking turns sleeping with the cow nearby', 'By never sleeping at all, day or night'], correct: 0 },
  ],
};

const unit10Listening = {
  title: 'Guarding the Garden',
  script: "Every summer, my grandfather has one essential job: to guard his vegetable garden. His primary goal is to protect the tomatoes from rabbits, and he takes it very seriously.\n\nOne evening, he saw a rabbit sitting in the grass, and its little tail was the only thing visible at first. He was certain it would run away, but instead, it just sat there. He didn't want to lose the chance to save his tomatoes, so he had to focus completely on his plan.\n\nHe built a small fence, thinking it would have an immediate effect. But the trouble continued — the rabbit found a separate way in! Finally, my grandfather decided to rest his worries and just plant extra tomatoes on a different site in the garden, far from the fence. He remains proud of his solution to this day, and he says the image of that clever rabbit still makes him smile.",
  questions: [
    { id: 1, text: "What was the grandfather's primary goal?", options: ['To protect the tomatoes from rabbits', 'To grow the tallest plant', 'To build a new fence for fun', 'To catch a bird'], correct: 0 },
    { id: 2, text: 'What was visible in the grass at first?', options: ["The rabbit's tail", 'A snake', 'A bird', "A cat's ears"], correct: 0 },
    { id: 3, text: 'What did the grandfather build?', options: ['A small fence', 'A new garden shed', 'A birdhouse', 'A pond'], correct: 0 },
    { id: 4, text: 'How did the rabbit get past the fence?', options: ['It found a separate way in.', 'It jumped over the top.', 'It dug straight through the middle.', 'It never actually got past it.'], correct: 0 },
    { id: 5, text: 'What did the grandfather finally decide to do?', options: ['Plant extra tomatoes at a different site', 'Give up on the garden completely', 'Catch the rabbit as a pet', 'Sell his vegetables'], correct: 0 },
  ],
};

const unit11Words = [
  { id: 'l11w1', word: 'anymore', translation: 'endi', definition: 'Anymore means any longer.', example: "Her old pants don't fit her anymore.", partOfSpeech: 'adverb' },
  { id: 'l11w2', word: 'asleep', translation: 'uxlab yotgan', definition: 'When a person is asleep, they are not awake.', example: 'The baby has been asleep for hours.', partOfSpeech: 'adjective' },
  { id: 'l11w3', word: 'berry', translation: 'meva (rezavor)', definition: 'A berry is a small round fruit that grows on certain plants and trees.', example: 'The berry looked delicious.', partOfSpeech: 'noun' },
  { id: 'l11w4', word: 'collect', translation: "to'plamoq", definition: 'To collect things is to group them together all in one place.', example: 'I collected shells when I was younger.', partOfSpeech: 'verb' },
  { id: 'l11w5', word: 'compete', translation: 'musobaqalashmoq', definition: 'To compete is to try to be better than someone.', example: 'He will compete with very good athletes.', partOfSpeech: 'verb' },
  { id: 'l11w6', word: 'conversation', translation: 'suhbat', definition: 'A conversation is a talk between people.', example: 'There were two conversations going on at once.', partOfSpeech: 'noun' },
  { id: 'l11w7', word: 'creature', translation: 'jonzot', definition: 'A creature is any living thing.', example: 'The creature we saw today was either a dolphin or a porpoise.', partOfSpeech: 'noun' },
  { id: 'l11w8', word: 'decision', translation: 'qaror', definition: 'A decision is a choice.', example: 'He made the wrong decision.', partOfSpeech: 'noun' },
  { id: 'l11w9', word: 'either', translation: 'ikkalasidan biri', definition: 'Either is used with "or" to say there are two or more possibilities.', example: 'You can choose to be either white or black when you play chess.', partOfSpeech: 'conjunction' },
  { id: 'l11w10', word: 'forest', translation: "o'rmon", definition: 'A forest is a place with lots of trees and animals.', example: 'I love to go walking in the forest.', partOfSpeech: 'noun' },
  { id: 'l11w11', word: 'ground', translation: 'yer', definition: 'The ground is the top part of the Earth that we walk on.', example: 'The ground under our feet was dry and brown.', partOfSpeech: 'noun' },
  { id: 'l11w12', word: 'introduce', translation: 'tanishtirmoq', definition: 'To introduce someone or something is to say who they are.', example: 'I introduced myself to our newest co-worker today.', partOfSpeech: 'verb' },
  { id: 'l11w13', word: 'marry', translation: "turmushga chiqmoq, uylanmoq", definition: 'To marry is to legally become husband and wife.', example: 'Rose and Henry were married, and they lived happily.', partOfSpeech: 'verb' },
  { id: 'l11w14', word: 'prepare', translation: 'tayyorlamoq', definition: 'To prepare is to get ready for something.', example: 'I prepared my speech to the class.', partOfSpeech: 'verb' },
  { id: 'l11w15', word: 'sail', translation: 'suzmoq (kema bilan)', definition: 'To sail is to move a boat on the water.', example: 'I love to sail my boat on the lake.', partOfSpeech: 'verb' },
  { id: 'l11w16', word: 'serious', translation: 'jiddiy', definition: 'When something is serious, it is bad or unsafe.', example: 'The accident was very serious.', partOfSpeech: 'adjective' },
  { id: 'l11w17', word: 'spend', translation: "sarflamoq, o'tkazmoq", definition: 'To spend is to use time doing something or being somewhere.', example: 'I like to spend my free time fishing.', partOfSpeech: 'verb' },
  { id: 'l11w18', word: 'strange', translation: "g'alati", definition: 'When something is strange, it is not normal.', example: 'Joe had a strange look on his face after he saw what happened.', partOfSpeech: 'adjective' },
  { id: 'l11w19', word: 'truth', translation: 'haqiqat', definition: 'The truth is a fact or something that is right.', example: 'He was telling the truth about seeing a large green snake.', partOfSpeech: 'noun' },
  { id: 'l11w20', word: 'wake', translation: 'uyg\'onmoq', definition: 'To wake is to not be sleeping anymore.', example: 'He is always full of energy when he wakes in the morning.', partOfSpeech: 'verb' },
];

const unit11Grammar = {
  questions: [
    { id: 1, text: 'Choose the correct word order:', options: ["He doesn't live here anymore.", "He doesn't anymore live here.", "Anymore he doesn't live here.", "He live doesn't here anymore."], correct: 0, explanation: '"Anymore" usually goes at the end of a negative sentence.' },
    { id: 2, text: 'The baby has been ___ for two hours.', options: ['asleep', 'asleeps', 'is asleep', 'does asleep'], correct: 0, explanation: 'Adjectives like "asleep" do not take -s.' },
    { id: 3, text: 'She ___ a sweet red berry from the bush.', options: ['pick', 'picked', 'is pick', 'do picked'], correct: 1, explanation: 'Use the simple past tense: picked.' },
    { id: 4, text: 'Choose the correct question:', options: ['Did you collect any shells?', 'Does you collected any shells?', 'Was you collect any shells?', 'Do you collected any shells?'], correct: 0, explanation: 'Use "Did" + subject + base verb for past questions.' },
    { id: 5, text: 'The two runners will ___ in the final race.', options: ['compete', 'competes', 'is compete', 'does compete'], correct: 0, explanation: 'After the modal "will", use the base verb.' },
    { id: 6, text: 'Choose the correct word order:', options: ['We had a long conversation about school.', 'We a long conversation had about school.', 'Had we a long conversation about school.', 'About school we had a long conversation the.'], correct: 0, explanation: 'Subject + Verb + Object + Prepositional phrase is the normal order.' },
    { id: 7, text: 'A strange ___ appeared near the lake.', options: ['creature', 'creatures', 'is creature', 'do creature'], correct: 0, explanation: '"A strange creature" — singular noun after the article "a".' },
    { id: 8, text: 'Choose the correct word order:', options: ['She made a difficult decision yesterday.', 'She a difficult decision made yesterday.', 'Made she a difficult decision yesterday.', 'Yesterday she made decision a difficult.'], correct: 0, explanation: 'Subject + Verb + Object + Time is the normal order.' },
    { id: 9, text: 'You can choose ___ tea or coffee.', options: ['either', 'eithers', 'is either', 'does either'], correct: 0, explanation: '"Either" is a conjunction used with "or" and does not change form.' },
    { id: 10, text: 'Many animals live in the ___.', options: ['forest', 'forests', 'is forest', 'do forest'], correct: 0, explanation: '"The forest" — singular noun after "the".' },
    { id: 11, text: 'The apple fell to the ___.', options: ['ground', 'grounds', 'is ground', 'do ground'], correct: 0, explanation: '"The ground" is uncountable and stays singular.' },
    { id: 12, text: 'Choose the correct word order:', options: ['Let me introduce my new friend.', 'Let me my new friend introduce.', 'Introduce let me my new friend.', 'My new friend let me introduce the.'], correct: 0, explanation: 'Subject + Verb + Object + Object is the normal order.' },
    { id: 13, text: 'They plan to ___ next spring.', options: ['marry', 'marries', 'is marry', 'does marry'], correct: 0, explanation: 'After "to", use the base verb (infinitive).' },
    { id: 14, text: 'Choose the correct question:', options: ['Did she prepare dinner for everyone?', 'Does she prepared dinner for everyone?', 'Was she prepare dinner for everyone?', 'Do she prepared dinner for everyone?'], correct: 0, explanation: 'Use "Did" + subject + base verb for past questions.' },
    { id: 15, text: 'They ___ across the ocean every summer.', options: ['sail', 'sails', 'is sail', 'does sail'], correct: 0, explanation: '"They" is plural, so no -s: they sail.' },
    { id: 16, text: 'The doctor said the injury was ___.', options: ['serious', 'seriouses', 'is serious', 'does serious'], correct: 0, explanation: 'Adjectives follow the linking verb directly, with no -s.' },
    { id: 17, text: 'Choose the correct word order:', options: ['We spend our weekends at the lake.', 'We our weekends spend at the lake.', 'Spend we our weekends at the lake.', 'At the lake we spend our weekends the.'], correct: 0, explanation: 'Subject + Verb + Object + Place phrase is the normal order.' },
    { id: 18, text: 'That old house looks very ___ at night.', options: ['strange', 'stranges', 'is strange', 'does strange'], correct: 0, explanation: 'Adjectives do not take -s.' },
    { id: 19, text: 'He finally told her the ___ about the accident.', options: ['truth', 'truths', 'is truth', 'do truth'], correct: 0, explanation: '"The truth" is uncountable and stays singular.' },
    { id: 20, text: 'Choose the correct word order:', options: ['She woke up early this morning.', 'She up woke early this morning.', 'Early this morning she woke up the.', 'Woke she up early this morning.'], correct: 0, explanation: 'Subject + Verb (phrasal verb "woke up") + Time phrase is the normal order.' },
  ],
};

const unit11Reading = {
  title: 'Princess Rose and the Creature',
  pages: [
    [
      { type: 'heading', text: 'Princess Rose and the Creature' },
      { type: 'p', text: 'There was once a beautiful princess named Rose. Her mother, the queen, however, was not as beautiful as the princess. The queen felt bad that she was not the most beautiful woman in the kingdom anymore. She was tired of competing with her daughter. She made a decision. She prepared a drink for the princess. After the princess drank it, she fell asleep. Then the queen took the princess to the forest. She left the princess there. It was a very serious thing to do. "Either she will be killed by animals or she will get lost in the forest," the queen thought.' },
    ],
    [
      { type: 'p', text: 'The princess had a dream. She dreamed about a man with brown hair and brown eyes. It was the man she would wed.' },
      { type: 'p', text: 'The princess woke up. She saw a strange creature on the ground. It looked like a man, but he was hairy and green. He had horns on his head and a pig\'s nose.' },
      { type: 'p', text: 'The creature said, "Did I scare you? I hope not. Let me introduce myself. I am Henry."' },
      { type: 'p', text: '"I am not scared. To tell you the truth, I think you are cute," said Rose.' },
    ],
    [
      { type: 'p', text: 'Rose and Henry spent the day together. They collected berries, caught fish, and had lunch. They had a very good day filled with nice conversations.' },
      { type: 'p', text: '"Rose, I have to go home," said Henry. "My ship will sail home soon. I can\'t leave you here in the forest alone. Will you come with me?"' },
    ],
    [
      { type: 'p', text: 'Rose was very happy. She gave Henry a kiss right on his pig nose. As soon as she kissed Henry, he began to change. His pig nose turned into a man\'s nose. His horns and green hair went away. Standing in front of her was the man Rose had dreamt about.' },
      { type: 'p', text: 'Rose and Henry were married, and they lived happily.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['A strange creature that competes with a princess', 'Why a queen had a conversation with a princess', 'How a princess met a creature in a forest', 'A serious decision made by a princess'], correct: 2 },
    { id: 2, text: 'Which of the following is NOT true in the story?', options: ['The queen fell asleep in the forest.', 'The princess had a dream.', "The creature wasn't mean or scary.", 'Henry said he was going to sail away on a ship.'], correct: 0 },
    { id: 3, text: 'What did the queen want to happen to the princess?', options: ['A creature would wake the princess.', 'A creature would prepare a drink for the princess.', 'An animal would kill the princess if she was left on the ground.', 'Rose and a creature would collect either berries or fruits.'], correct: 2 },
    { id: 4, text: 'Which of the following is true at the end of the story?', options: ['Rose introduces Henry to the queen.', 'Rose and Henry wed.', 'The queen learns the truth about Rose.', 'The queen sails away on a ship.'], correct: 1 },
    { id: 5, text: 'What did the princess dream in the forest?', options: ['About the man she would marry', 'About a strange green creature chasing her', 'About her mother the queen', 'About sailing home on a ship'], correct: 0 },
  ],
};

const unit11Listening = {
  title: 'A Strange Meeting in the Forest',
  script: "Last weekend, my cousin and I decided to spend the day walking in the forest, collecting berries near the ground. We had a fun conversation about school, and neither of us wanted to compete to see who could collect the most — we just enjoyed being outside.\n\nSuddenly, we saw a strange creature move between the trees! At first we thought we were still asleep and dreaming. My cousin made a quick decision — we could either run away or introduce ourselves. To tell the truth, it turned out to just be a large, friendly dog that had wandered off from a nearby farm.\n\nWe helped prepare a plan to find its owner, and it wasn't anymore a scary mystery — just a serious little adventure. The dog seemed happy to sail along beside us as we walked back. When we finally found the farmer, he was so thankful he said we could wake him up anytime if we ever found his dog again.",
  questions: [
    { id: 1, text: 'What were the cousins doing in the forest?', options: ['Collecting berries', 'Fishing', 'Camping overnight', 'Building a treehouse'], correct: 0 },
    { id: 2, text: 'What did they see moving between the trees?', options: ['A strange creature', 'A falling branch', 'Another family', 'A bird'], correct: 0 },
    { id: 3, text: 'What choice did the cousin decide between?', options: ['Run away or introduce themselves', 'Call for help or hide', 'Go home or continue walking', 'Sleep or keep collecting berries'], correct: 0 },
    { id: 4, text: 'What was the creature actually?', options: ['A friendly dog', 'A wild fox', 'A lost cat', 'A deer'], correct: 0 },
    { id: 5, text: 'How did the farmer feel when they found him?', options: ['Thankful', 'Angry', 'Confused', 'Worried'], correct: 0 },
  ],
};

export const lessons07to11 = [
  { id: 'essential-lesson-7', title: 'Lesson 7', words: unit7Words, grammar: unit7Grammar, reading: unit7Reading, listening: unit7Listening },
  { id: 'essential-lesson-8', title: 'Lesson 8', words: unit8Words, grammar: unit8Grammar, reading: unit8Reading, listening: unit8Listening },
  { id: 'essential-lesson-9', title: 'Lesson 9', words: unit9Words, grammar: unit9Grammar, reading: unit9Reading, listening: unit9Listening },
  { id: 'essential-lesson-10', title: 'Lesson 10', words: unit10Words, grammar: unit10Grammar, reading: unit10Reading, listening: unit10Listening },
  { id: 'essential-lesson-11', title: 'Lesson 11', words: unit11Words, grammar: unit11Grammar, reading: unit11Reading, listening: unit11Listening },
];
