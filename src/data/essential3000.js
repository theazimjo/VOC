// Lesson 1 content for "Essential 3000", sourced from Unit 1 of the real
// book — "4000 Essential English Words 1" by Paul Nation (Compass
// Publishing) — via pdftotext extraction of src/assets/data/essential
// english 1.pdf. Words, their sentence definitions, example sentences, the
// "The Lion and the Rabbit" reading story + its comprehension questions, and
// the grammar-stage word exercises (definition matching + "which sentence
// makes better sense") are transcribed from the book (question 5's reading
// answer choices were lost to an OCR/layout gap in the source PDF, so those
// four options are original). Uzbek translations are original (the book is
// English-only). The listening dialogue is original narration written to
// reuse this unit's 20 target words, since the book itself has no audio/
// listening component.

const lesson1Words = [
  { id: 'l1w1', word: 'afraid', translation: "qo'rqqan", definition: 'When someone is afraid, they feel fear.', example: 'The woman was afraid of what she saw.', partOfSpeech: 'adjective' },
  { id: 'l1w2', word: 'agree', translation: 'rozi bo\'lmoq', definition: 'To agree is to say "yes" or to think the same way.', example: 'A: The food is very good in that restaurant. B: I agree with you.', partOfSpeech: 'verb' },
  { id: 'l1w3', word: 'angry', translation: "g'azablangan", definition: 'When someone is angry, they may want to speak loudly or fight.', example: "She didn't do her homework, so her father is angry.", partOfSpeech: 'adjective' },
  { id: 'l1w4', word: 'arrive', translation: 'yetib kelmoq', definition: 'To arrive is to get to or reach some place.', example: 'The bus always arrives at the corner of my street at 4:00.', partOfSpeech: 'verb' },
  { id: 'l1w5', word: 'attack', translation: 'hujum qilmoq', definition: 'To attack is to try to fight or to hurt.', example: 'The man with the sword attacked the other man first.', partOfSpeech: 'verb' },
  { id: 'l1w6', word: 'bottom', translation: 'tag, pastki qism', definition: 'The bottom is the lowest part.', example: 'The bottom of my shoe has a hole in it.', partOfSpeech: 'noun' },
  { id: 'l1w7', word: 'clever', translation: 'aqlli, zukko', definition: 'When someone is clever, they can solve a hard puzzle or problem.', example: 'The clever boy thought of a good idea.', partOfSpeech: 'adjective' },
  { id: 'l1w8', word: 'cruel', translation: 'shafqatsiz', definition: 'When someone is cruel, they do bad things to hurt others.', example: 'The cruel man yelled at his sister.', partOfSpeech: 'adjective' },
  { id: 'l1w9', word: 'finally', translation: 'nihoyat', definition: 'If something happens finally, it happens after a long time or at the end.', example: 'He finally crossed the finish line after five hours of running.', partOfSpeech: 'adverb' },
  { id: 'l1w10', word: 'hide', translation: 'yashirinmoq', definition: 'To hide is to try not to let others see you.', example: 'The other children will hide while you count to 100.', partOfSpeech: 'verb' },
  { id: 'l1w11', word: 'hunt', translation: 'ov qilmoq', definition: 'To hunt is to look for or search for an animal to kill.', example: 'Long ago, people hunted with bows and arrows.', partOfSpeech: 'verb' },
  { id: 'l1w12', word: 'lot', translation: "ko'p", definition: 'A lot means a large number or amount of people, animals, things, etc.', example: 'There are a lot of apples in the basket.', partOfSpeech: 'noun' },
  { id: 'l1w13', word: 'middle', translation: "o'rta", definition: 'The middle of something is the center or halfway point.', example: 'The Canadian flag has a maple leaf in the middle of it.', partOfSpeech: 'noun' },
  { id: 'l1w14', word: 'moment', translation: 'lahza', definition: 'A moment is a second or a very short time.', example: 'I was only a few moments late for the meeting.', partOfSpeech: 'noun' },
  { id: 'l1w15', word: 'pleased', translation: 'mamnun, xursand', definition: 'When someone is pleased, they are happy.', example: 'She was pleased with the phone call she received.', partOfSpeech: 'adjective' },
  { id: 'l1w16', word: 'promise', translation: "va'da bermoq", definition: 'To promise is to say you will do something for sure.', example: 'He promised to return my key by tomorrow.', partOfSpeech: 'verb' },
  { id: 'l1w17', word: 'reply', translation: 'javob bermoq', definition: 'To reply is to give an answer or say back to someone.', example: 'She asked him what time his meeting was. He replied, "at three."', partOfSpeech: 'verb' },
  { id: 'l1w18', word: 'safe', translation: 'xavfsiz', definition: 'When a person is safe, they are not in danger.', example: 'Put on your seat belt in the car to be safe.', partOfSpeech: 'adjective' },
  { id: 'l1w19', word: 'trick', translation: 'hiyla, aldov', definition: 'A trick is something you do to fool another person.', example: 'His card trick really surprised us.', partOfSpeech: 'noun' },
  { id: 'l1w20', word: 'well', translation: 'yaxshi', definition: 'You use well to say that something was done in a good way.', example: 'The couple can dance quite well.', partOfSpeech: 'adverb' },
];

const lesson1Grammar = {
  questions: [
    { id: 1, text: 'Which word means "bad or hurting others"?', options: ['afraid', 'clever', 'cruel', 'hunt'], correct: 2 },
    { id: 2, text: 'Which word means "at last or at the end"?', options: ['angry', 'clever', 'finally', 'reply'], correct: 2 },
    { id: 3, text: 'Which word means "to try to fight or hurt"?', options: ['attack', 'middle', 'pleased', 'trick'], correct: 0 },
    { id: 4, text: 'Which word means "to not let others see"?', options: ['agree', 'hide', 'safe', 'well'], correct: 1 },
    { id: 5, text: 'Which word means "the lowest part"?', options: ['bottom', 'lot', 'moment', 'promise'], correct: 0 },
    { id: 6, text: 'What does "angry" mean?', options: ['happy', 'low', 'mad', 'scared'], correct: 2 },
    { id: 7, text: 'What does "moment" mean?', options: ['a hole with water in it', 'a short time', 'at the center', 'at the end'], correct: 1 },
    { id: 8, text: 'What does "promise" mean?', options: ['to say "good job"', 'to say "I will"', 'to say "the end"', 'to say "maybe"'], correct: 1 },
    { id: 9, text: 'What does "reply" mean?', options: ['to answer', 'to get to a place', 'to look for in order to kill', 'to try to fight or hurt'], correct: 0 },
    { id: 10, text: 'What does "safe" mean?', options: ['fool', 'having much or many', 'not seen', 'not worried about being hurt'], correct: 3 },
    { id: 11, text: 'Which sentence makes better sense?', options: ['A clever person can solve a puzzle easily.', 'When a plane arrives, it leaves the ground and goes into the sky.'], correct: 0 },
    { id: 12, text: 'Which sentence makes better sense?', options: ['At noon, the sun is near the bottom of the sky.', 'If I break my brother\'s bike, he will be angry.'], correct: 1 },
    { id: 13, text: 'Which sentence makes better sense?', options: ['It is easy to hide in a dark place.', 'Many kinds of fish are afraid of water.'], correct: 0 },
    { id: 14, text: 'Which sentence makes better sense?', options: ['At night, your parents may say, "Hide your eyes and go to sleep."', 'Heavy things will go down to the bottom of the ocean.'], correct: 1 },
    { id: 15, text: 'Which sentence makes better sense?', options: ['It is cruel to keep a dog in a small cage all day.', 'Your mother will be angry when you get good grades in school.'], correct: 0 },
    { id: 16, text: 'Which sentence makes better sense?', options: ['Animals cannot hunt because they do not have hands.', 'It is a good idea to arrive early for class.'], correct: 1 },
    { id: 17, text: 'Which sentence makes better sense?', options: ['People sometimes attack pictures to email messages.', 'Some people are afraid of spiders.'], correct: 1 },
    { id: 18, text: 'Which sentence makes better sense?', options: ['A moment is like a second or two.', 'New shoes are usually not very comfortable or clever.'], correct: 0 },
    { id: 19, text: 'Which sentence makes better sense?', options: ['Small animals do not usually attack big animals.', 'There are twelve moments in a year.'], correct: 0 },
    { id: 20, text: 'Which sentence makes better sense?', options: ['A cruel person will try to help others at all times.', 'You can use a gun to hunt in the forest.'], correct: 1 },
  ],
};

const lesson1Reading = {
  title: 'The Lion and the Rabbit',
  pages: [
    [
      { type: 'heading', text: 'The Lion and the Rabbit' },
      { type: 'p', text: 'A cruel lion lived in the forest. Every day, he killed and ate a lot of animals. The other animals were afraid the lion would kill them all.' },
      { type: 'p', text: 'The animals told the lion, "Let\'s make a deal. If you promise to eat only one animal each day, then one of us will come to you every day. Then you don\'t have to hunt and kill us."' },
    ],
    [
      { type: 'p', text: 'The plan sounded well thought-out to the lion, so he agreed, but he also said, "If you don\'t come every day, I promise to kill all of you the next day!"' },
      { type: 'p', text: 'Each day after that, one animal went to the lion so that the lion could eat it. Then, all the other animals were safe.' },
      { type: 'p', text: 'Finally, it was the rabbit\'s turn to go to the lion. The rabbit went very slowly that day, so the lion was angry when the rabbit finally arrived.' },
    ],
    [
      { type: 'p', text: 'The lion angrily asked the rabbit, "Why are you late?"' },
      { type: 'p', text: '"I was hiding from another lion in the forest. That lion said he was the king, so I was afraid."' },
      { type: 'p', text: 'The lion told the rabbit, "I am the only king here! Take me to that other lion, and I will kill him."' },
      { type: 'p', text: 'The rabbit replied, "I will be happy to show you where he lives."' },
    ],
    [
      { type: 'p', text: 'The rabbit led the lion to an old well in the middle of the forest. The well was very deep with water at the bottom. The rabbit told the lion, "Look in there. The lion lives at the bottom."' },
      { type: 'p', text: 'When the lion looked in the well, he could see his own face in the water. He thought that was the other lion. Without waiting another moment, the lion jumped into the well to attack the other lion. He never came out. All of the other animals in the forest were very pleased with the rabbit\'s clever trick.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['How a clever rabbit tricked a cruel lion', 'How rabbits learned to hide from lions', 'How a rabbit pleased an angry lion', 'How to be safe when you hunt in the forest'], correct: 0 },
    { id: 2, text: 'What did all the animals say to the lion?', options: ['They said they wanted him to be their king.', 'They said that the rabbit would be there in a moment.', 'They said that they would allow him to eat one of them a day.', 'They said that they would hide at the bottom of the well.'], correct: 2 },
    { id: 3, text: 'Why did the rabbit take the lion to the well in the middle of the forest?', options: ['So a lot of animals could see the rabbit walking with the lion', 'So the lion could attack the "other" lion', 'So the lion could drink water', 'So the other animals would be afraid of the rabbit'], correct: 1 },
    { id: 4, text: 'Which of the following is true at the end of the story?', options: ['The lion attacked another lion, and they both got hurt.', 'The lion cannot reply to the rabbit, so the rabbit wins.', 'The lion finally dies.', "The lion is pleased by the rabbit's words, so it does not eat the rabbit."], correct: 2 },
    { id: 5, text: 'What did the lion see when it looked in the well?', options: ['His own face in the water', 'Another lion swimming', 'The rabbit hiding', 'Nothing at all'], correct: 0 },
  ],
};

const lesson1Listening = {
  title: 'Walking Home',
  script: "Last night, Sarah was walking home alone. In the middle of the dark street, she suddenly felt afraid. She thought a cruel stranger might attack her, so she decided to hide behind a car for a moment. After a moment, she realized it was only her clever cat, and she felt very pleased. She promised herself she would arrive home earlier next time.\n\nFinally, when she reached the bottom of her street, a lot of her neighbors were outside talking. One of them smiled and said, \"It's safer to walk with a friend.\" Sarah had to agree. She replied, \"You're right, that wasn't very clever of me.\"\n\nHer neighbor laughed. \"Don't be angry with yourself. It wasn't a trick, I really mean it.\" Sarah felt safe again as they walked home together, well past midnight, without needing to hunt for excuses. From then on, she never walked alone at night again.",
  questions: [
    { id: 1, text: 'Where was Sarah walking when she felt afraid?', options: ['In the middle of a dark street', 'In a shopping mall', 'In her kitchen', 'At school'], correct: 0 },
    { id: 2, text: 'What was actually making the noise that scared Sarah?', options: ['A stranger', 'Her clever cat', 'Her neighbor', 'A dog'], correct: 1 },
    { id: 3, text: 'What did Sarah promise herself?', options: ['To buy a new car', 'To move house', 'To arrive home earlier next time', 'To call the police'], correct: 2 },
    { id: 4, text: "What did Sarah's neighbor say?", options: ["It's fine to walk alone", "It's safer to walk with a friend", 'She should hide more often', 'She should hunt for her keys'], correct: 1 },
    { id: 5, text: 'How did Sarah feel by the end of the story?', options: ['Angry', 'Afraid', 'Safe', 'Confused'], correct: 2 },
  ],
};

export const essential3000Months = [
  {
    id: 'essential-m1',
    title: 'Essential 3000',
    units: [
      {
        id: 'essential-lesson-1',
        title: 'Lesson 1',
        words: lesson1Words,
        grammar: lesson1Grammar,
        reading: lesson1Reading,
        listening: lesson1Listening,
      },
    ],
  },
];
