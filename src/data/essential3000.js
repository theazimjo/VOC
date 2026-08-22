// Starter content for "Essential 3000" Lesson 1 — original placeholder
// vocabulary/story/dialogue (not transcribed from the actual book, which
// this app has no access to). Swap the `words`/`reading`/`listening` fields
// below with the real Unit 1 content once it's available; the lesson
// engine (WordsStage/GrammarStage/ReadingStage/ListeningStage) doesn't care
// where the text comes from.

const lesson1Words = [
  { id: 'l1w1', word: 'introduce', translation: 'tanishtirmoq', definition: 'to tell someone your name when you meet them for the first time', example: 'Let me introduce myself, I\'m Aziz.', partOfSpeech: 'verb' },
  { id: 'l1w2', word: 'greet', translation: 'salomlashmoq', definition: 'to say hello to someone', example: 'She greeted her neighbor with a smile.', partOfSpeech: 'verb' },
  { id: 'l1w3', word: 'neighbor', translation: "qo'shni", definition: 'a person who lives next to you', example: 'Our new neighbor is very friendly.', partOfSpeech: 'noun' },
  { id: 'l1w4', word: 'colleague', translation: 'hamkasb', definition: 'a person you work with', example: 'I had lunch with my colleague.', partOfSpeech: 'noun' },
  { id: 'l1w5', word: 'appointment', translation: 'uchrashuv', definition: 'a fixed time arranged to meet someone', example: 'I have a dentist appointment at 3pm.', partOfSpeech: 'noun' },
  { id: 'l1w6', word: 'punctual', translation: 'vaqtida keladigan', definition: 'arriving exactly at the right time', example: 'He is always punctual for meetings.', partOfSpeech: 'adjective' },
  { id: 'l1w7', word: 'routine', translation: 'kundalik tartib', definition: 'the usual things you do every day', example: 'Waking up early is part of my routine.', partOfSpeech: 'noun' },
  { id: 'l1w8', word: 'exhausted', translation: 'juda charchagan', definition: 'extremely tired', example: 'After the long day, she felt exhausted.', partOfSpeech: 'adjective' },
  { id: 'l1w9', word: 'relax', translation: 'dam olmoq', definition: 'to rest and stop worrying', example: 'I like to relax on weekends.', partOfSpeech: 'verb' },
  { id: 'l1w10', word: 'chat', translation: 'suhbatlashmoq', definition: 'to talk in a friendly, informal way', example: 'We chatted about the weather.', partOfSpeech: 'verb' },
  { id: 'l1w11', word: 'invite', translation: 'taklif qilmoq', definition: 'to ask someone to come somewhere', example: 'They invited us to their party.', partOfSpeech: 'verb' },
  { id: 'l1w12', word: 'favor', translation: 'yaxshilik', definition: 'a kind or helpful act', example: 'Can you do me a favor?', partOfSpeech: 'noun' },
  { id: 'l1w13', word: 'borrow', translation: 'qarz olmoq', definition: 'to take something and return it later', example: 'Can I borrow your pen?', partOfSpeech: 'verb' },
  { id: 'l1w14', word: 'remind', translation: 'eslatmoq', definition: 'to help someone remember something', example: 'Please remind me to call him.', partOfSpeech: 'verb' },
  { id: 'l1w15', word: 'apologize', translation: "uzr so'ramoq", definition: 'to say sorry', example: 'He apologized for being late.', partOfSpeech: 'verb' },
  { id: 'l1w16', word: 'celebrate', translation: 'nishonlamoq', definition: 'to do something special for a happy event', example: "We celebrated her birthday together.", partOfSpeech: 'verb' },
];

const lesson1Reading = {
  title: 'A New Neighbor',
  pages: [
    [
      { type: 'heading', text: 'A New Neighbor' },
      { type: 'p', text: 'Last Saturday, a young woman moved into the apartment next to mine. I decided to introduce myself before she got too busy unpacking boxes.' },
      { type: 'p', text: "I knocked on her door and greeted her with a smile. \"Hi, I'm Lola. Welcome to the building!\" She smiled back and said her name was Anna." },
    ],
    [
      { type: 'p', text: 'Anna looked exhausted after carrying boxes all morning, so I invited her to relax on my balcony for a few minutes and have some tea.' },
      { type: 'p', text: 'We chatted for almost an hour. She told me she was starting a new job on Monday and already felt nervous about being punctual on her first day.' },
    ],
    [
      { type: 'p', text: '"Could you do me a favor?" Anna asked the next morning. "Can I borrow your umbrella? I forgot to unpack mine, and it\'s raining."' },
      { type: 'p', text: "Of course, I said, and reminded her that she could always ask me if she needed anything. That's what neighbors are for." },
    ],
    [
      { type: 'p', text: 'A few weeks later, Anna had settled into her new routine. She made friends with her colleagues at work and even apologized to me once for playing music too loud during a small get-together.' },
      { type: 'p', text: 'When she got a promotion, she decided to celebrate by inviting all her new friends, including me, for dinner. I was glad I had introduced myself that first Saturday.' },
    ],
  ],
  questions: [
    { id: 1, text: 'Why did Lola decide to introduce herself to Anna?', options: ['They already knew each other', 'Anna had just moved in next door', 'Anna asked her to', 'They worked together'], correct: 1 },
    { id: 2, text: 'What did Lola invite Anna to do on the balcony?', options: ['Have dinner', 'Meet her colleagues', 'Relax and have tea', 'Unpack boxes'], correct: 2 },
    { id: 3, text: 'What did Anna ask to borrow?', options: ['A phone', 'An umbrella', 'A pen', 'Some tea'], correct: 1 },
    { id: 4, text: 'Why did Anna want to celebrate?', options: ['Her birthday', 'She got a promotion', 'She finished unpacking', 'It was a holiday'], correct: 1 },
  ],
};

const lesson1Listening = {
  title: 'Meeting the New Neighbor',
  script: "Lola: Hi! You must be our new neighbor. Let me introduce myself, I'm Lola.\nAnna: Hi Lola, nice to meet you. I'm Anna. I just moved in yesterday.\nLola: Welcome! You look exhausted. Would you like to relax on my balcony for a bit?\nAnna: That's very kind of you. Thank you.\nLola: No problem at all. So, tell me, do you have a job here yet?\nAnna: Yes, actually. I start on Monday. I'm a little nervous about being punctual on my first day.\nLola: Don't worry, you'll be fine. And remember, if you ever need a favor, or want to borrow anything, just knock on my door.\nAnna: Thank you so much, Lola. I'm really glad I have a friendly neighbor.",
  questions: [
    { id: 1, text: 'When did Anna move in?', options: ['Today', 'Yesterday', 'Last week', 'On Monday'], correct: 1 },
    { id: 2, text: 'What does Lola invite Anna to do?', options: ['Go to a party', 'Relax on the balcony', 'Meet her colleagues', 'Go shopping'], correct: 1 },
    { id: 3, text: "When does Anna start her new job?", options: ['Tomorrow', 'Next week', 'Monday', 'Today'], correct: 2 },
    { id: 4, text: 'What is Anna nervous about?', options: ['Meeting new people', 'Being punctual on her first day', 'Finding the office', 'Speaking English'], correct: 1 },
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
        reading: lesson1Reading,
        listening: lesson1Listening,
      },
    ],
  },
];
