// Lessons 12-16 content for "Essential 3000", sourced from Units 12-16 of
// the real book — "4000 Essential English Words 1" by Paul Nation (Compass
// Publishing) — via pdftotext extraction of src/assets/data/essential
// english 1.pdf. Words, their sentence definitions, example sentences, and
// each unit's reading story + comprehension questions are transcribed from
// the book (each unit's 5th reading question lost its answer choices to the
// same OCR/layout gap noted in lesson 1, so those four options are
// original). Uzbek translations are original (the book is English-only).
// The listening dialogues are original narration written to reuse each
// unit's 20 target words, since the book itself has no audio/listening
// component. The grammar-stage exercises are original, one per target word.

const lesson12Words = [
  { id: 'l12w1', word: 'alone', translation: "yolg'iz", definition: 'If someone is alone, they are not with another person.', example: 'The boy wanted to be alone to think.', partOfSpeech: 'adjective' },
  { id: 'l12w2', word: 'apartment', translation: 'kvartira', definition: 'An apartment is a set of rooms in a building where people live.', example: 'She has a nice apartment in the city.', partOfSpeech: 'noun' },
  { id: 'l12w3', word: 'article', translation: 'maqola', definition: 'An article is a story in a newspaper or magazine.', example: 'Did you read the article in the newspaper about the soccer game?', partOfSpeech: 'noun' },
  { id: 'l12w4', word: 'artist', translation: 'rassom', definition: 'An artist is a person who paints, draws, or makes sculptures.', example: 'He went to Paris to become an artist.', partOfSpeech: 'noun' },
  { id: 'l12w5', word: 'attitude', translation: 'munosabat', definition: "Someone's attitude is the way they feel and think.", example: "John has a bad attitude. He's always angry.", partOfSpeech: 'noun' },
  { id: 'l12w6', word: 'compare', translation: 'solishtirmoq', definition: 'To compare means to say how two things are the same and different.', example: "If you compare cats and dogs, you'll see that they're both good pets.", partOfSpeech: 'verb' },
  { id: 'l12w7', word: 'judge', translation: 'baholamoq', definition: 'To judge something is to say if it is good or bad.', example: "The boy was going to judge how his mother's turkey tasted.", partOfSpeech: 'verb' },
  { id: 'l12w8', word: 'magazine', translation: 'jurnal', definition: 'A magazine is a regular publication with news, stories, and articles.', example: 'She likes to read fashion magazines.', partOfSpeech: 'noun' },
  { id: 'l12w9', word: 'material', translation: 'material', definition: 'A material is what is used to make something.', example: 'Brick is a good material for building houses.', partOfSpeech: 'noun' },
  { id: 'l12w10', word: 'meal', translation: 'ovqatlanish', definition: 'A meal is a time when food is eaten like breakfast, lunch, or dinner.', example: 'Breakfast is my favorite meal because I enjoy breakfast foods.', partOfSpeech: 'noun' },
  { id: 'l12w11', word: 'method', translation: 'usul', definition: 'A method is the way to do something.', example: 'One method to remember things is to tie a string around your finger.', partOfSpeech: 'noun' },
  { id: 'l12w12', word: 'neighbor', translation: "qo'shni", definition: 'A neighbor is a person who lives near you.', example: "I like my neighbor because he's very friendly.", partOfSpeech: 'noun' },
  { id: 'l12w13', word: 'professional', translation: 'professional', definition: 'If something is professional, it deals with work that uses special skills.', example: 'If you want to be a pilot, you must have professional training.', partOfSpeech: 'adjective' },
  { id: 'l12w14', word: 'profit', translation: 'foyda', definition: 'A profit is the extra money you make when you sell something.', example: 'I made a small profit from selling my old clothes.', partOfSpeech: 'noun' },
  { id: 'l12w15', word: 'quality', translation: 'sifat', definition: 'The quality of something is how good it is.', example: 'The quality of his car is very good.', partOfSpeech: 'noun' },
  { id: 'l12w16', word: 'shape', translation: 'shakl', definition: 'A shape is a simple form like a square or circle.', example: 'The triangle is my favorite shape.', partOfSpeech: 'noun' },
  { id: 'l12w17', word: 'space', translation: "bo'shliq", definition: 'A space is an empty area.', example: "I don't have much space for things in my small house.", partOfSpeech: 'noun' },
  { id: 'l12w18', word: 'stair', translation: 'zina', definition: 'Stairs are the things that are used to go up in a building.', example: 'You can take the stairs to the second floor.', partOfSpeech: 'noun' },
  { id: 'l12w19', word: 'symbol', translation: 'ramz', definition: 'A symbol is a thing that stands for something else.', example: 'This symbol tells us that we cannot smoke in this area.', partOfSpeech: 'noun' },
  { id: 'l12w20', word: 'thin', translation: "ozg'in", definition: 'If someone or something is thin, they are not fat.', example: "The man was thin because he didn't eat much.", partOfSpeech: 'adjective' },
];

const lesson12Grammar = {
  questions: [
    { id: 1, text: 'The old man lives ___ in a small house.', options: ['alone', 'alones', 'aloning', 'alonely'], correct: 0, explanation: '"Alone" is invariable — it never takes -s.' },
    { id: 2, text: 'They rented a nice ___ near the park.', options: ['apartment', 'apartments', "apartment's", 'apartmenting'], correct: 0, explanation: 'A singular noun after "a nice" needs no ending.' },
    { id: 3, text: 'Choose the correct question:', options: ['Did you read the article?', 'Did you readed the article?', 'Do you read the article yesterday?', 'You did read the article?'], correct: 0, explanation: 'Past Simple questions use "Did" + base verb: Did you read...?' },
    { id: 4, text: 'Choose the correct word order:', options: ['She became a famous artist.', 'She a famous artist became.', 'Became she a famous artist.', 'A famous artist she became.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 5, text: 'His ___ toward work is always positive.', options: ['attitude', 'attitudes', 'attituded', 'attituding'], correct: 0, explanation: 'A singular noun after "His" needs no ending.' },
    { id: 6, text: 'Choose the correct question:', options: ['Do you compare the two designs?', 'Does you compare the two designs?', 'Are you compare the two designs?', 'Do you compares the two designs?'], correct: 0, explanation: '"Do" + subject + base verb: Do you compare...?' },
    { id: 7, text: 'It is not fair to ___ people by their clothes.', options: ['judge', 'judges', 'judging', 'judged'], correct: 0, explanation: 'After "to", use the base verb: to judge.' },
    { id: 8, text: 'She reads a fashion ___ every month.', options: ['magazine', 'magazines', "magazine's", 'magazining'], correct: 0, explanation: 'A singular noun after "a" needs no ending.' },
    { id: 9, text: 'Choose the correct word order:', options: ['Wood is a strong material.', 'Wood a strong material is.', 'A strong material wood is.', 'Is wood a strong material.'], correct: 0, explanation: 'Subject + Verb (is) + Complement is the normal order.' },
    { id: 10, text: 'The family ate their ___ together.', options: ['meal', 'meals', 'mealing', 'mealed'], correct: 0, explanation: '"Meal" here matches the singular family event.' },
    { id: 11, text: 'This ___ works better than the old one.', options: ['method', 'methods', 'methoding', 'methoded'], correct: 0, explanation: 'Singular subject "This" takes a singular noun.' },
    { id: 12, text: 'My ___ helps me every weekend.', options: ['neighbor', 'neighbors', "neighbor's", 'neighboring'], correct: 0, explanation: 'A singular noun after "My" needs no ending.' },
    { id: 13, text: 'It is important to look ___ at work.', options: ['professional', 'professionally', 'profession', 'professionalism'], correct: 0, explanation: 'After "look", use an adjective: look professional.' },
    { id: 14, text: 'The company made a large ___ this year.', options: ['profit', 'profits', 'profiting', 'profited'], correct: 0, explanation: 'A singular noun after "a large" needs no ending.' },
    { id: 15, text: 'Choose the correct word order:', options: ['The quality of this phone is excellent.', 'Quality the of this phone is excellent.', 'Of this phone the quality is excellent.', 'Is the quality of this phone excellent.'], correct: 0, explanation: 'Subject (the quality of this phone) + Verb (is) + Complement is the normal order.' },
    { id: 16, text: 'The cookie was cut into the ___ of a star.', options: ['shape', 'shapes', 'shaping', 'shaped'], correct: 0, explanation: 'A singular noun after "the" needs no ending.' },
    { id: 17, text: "There isn't much ___ in this small room.", options: ['space', 'spaces', 'spacing', 'spaced'], correct: 0, explanation: '"Space" is uncountable here, so no plural -s.' },
    { id: 18, text: 'Choose the correct word order:', options: ['He ran up the stairs quickly.', 'He up the stairs ran quickly.', 'Up the stairs he ran quickly.', 'Quickly he ran up the stairs the.'], correct: 0, explanation: 'Subject + Verb + Place + Manner is the normal order.' },
    { id: 19, text: 'The heart is a ___ of love.', options: ['symbol', 'symbols', 'symboled', 'symboling'], correct: 0, explanation: 'A singular noun after "a" needs no ending.' },
    { id: 20, text: 'After being sick, he became very ___.', options: ['thin', 'thinly', 'thinner than', 'thinness'], correct: 0, explanation: '"Thin" is the base adjective form used after "very".' },
  ],
};

const lesson12Reading = {
  title: 'The Crazy Artist',
  pages: [
    [
      { type: 'heading', text: 'The Crazy Artist' },
      { type: 'p', text: 'Frenhofer was the best artist in the world. Everyone loved him. The quality of his paintings was very high. He always used the best materials. He made a big profit from his paintings. He had delicious meals with his rich neighbors. He taught art classes. Life was good.' },
    ],
    [
      { type: 'p', text: 'Then his attitude changed. He stopped selling paintings and teaching. He tried a new method of painting. He stayed alone in his apartment all day. He worked all day and all night, rarely eating. Soon Frenhofer became very thin. But he kept working on the same painting for many years. He worked as hard as he could.' },
    ],
    [
      { type: 'p', text: 'Finally, he finished the painting. He was very happy and invited other artists to see it. "I want your professional opinion," he said. He wanted them to judge it and compare it to other paintings. Everyone was very excited as they went up the stairs to his apartment. Frenhofer was excited to show his painting, and the artists were excited to see it. "They\'ll love it," he thought. But they did not.' },
    ],
    [
      { type: 'p', text: 'They were surprised by his painting. There was no white anywhere. Frenhofer filled the whole painting with lines and colors. There was no space for a normal picture. It was full of strange shapes. It looked bad to the other artists. He used symbols, and they didn\'t understand them. They thought it was terrible. "Why did you paint this strange picture?" someone asked. They didn\'t understand its beauty.' },
    ],
    [
      { type: 'p', text: "But after some time, many people began to like his painting. People wrote articles about it in magazines. They said it was his best work. They loved his strange symbols. They loved his strange colors. Frenhofer's painting reminded everyone that just because something was new didn't mean that it was bad. He also helped them to realize that sometimes it takes people a little time to understand great things." },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['A painter whose neighbors judge his art as poor quality', 'An artist who teaches art classes in his apartment', 'A man who writes articles for a magazine', 'A thin man who eats meals with friends'], correct: 0 },
    { id: 2, text: 'Why does Frenhofer want the artists to see his painting?', options: ['He wants to sell it to them for a profit.', 'He wants them to judge his materials.', 'He wants them to give their professional opinion.', 'He wants to compare his new method to theirs.'], correct: 2 },
    { id: 3, text: "What is true of Frenhofer's painting?", options: ['It is made with low-quality materials.', 'It is full of strange colors and shapes.', 'It does not have any symbols in it.', 'It is a picture of other artists.'], correct: 1 },
    { id: 4, text: 'Where do the other artists see his painting?', options: ['It is alone in the space used for art classes.', "They go to Frenhofer's apartment.", 'Frenhofer takes it to their apartment.', 'It is on sale at a famous store.'], correct: 1 },
    { id: 5, text: 'How do the artists feel as they go up the stairs?', options: ['Excited to see the painting', 'Angry about the profit', 'Bored and tired', 'Afraid of the artist'], correct: 0 },
  ],
};

const lesson12Listening = {
  title: 'Moving Day',
  script: "Last month, Mark moved into a new apartment alone. He didn't know his neighbor yet, but on the first day, a kind neighbor knocked on his door and welcomed him. They talked about their attitude toward city life over a simple meal.\n\nMark was a professional artist, and his neighbor wrote articles for a small magazine. They started to compare their jobs. The neighbor said, \"An artist and a writer use a different method, but our work has the same quality.\"\n\nMark showed his neighbor a painting. It used strange shapes and one big symbol in the middle. \"Please don't judge it too fast,\" Mark said. \"It took a lot of space and good material to make.\"\n\nThe neighbor smiled and said the painting looked amazing, and maybe Mark could sell it for a nice profit one day. As they walked up the stairs to see the rest of the apartment, Mark realized that even though he was thin and tired from moving boxes all day, he had already made a new friend.",
  questions: [
    { id: 1, text: 'Where did Mark move?', options: ['Into a new house with his family', 'Into a new apartment alone', "Into his neighbor's apartment", 'Into a hotel downtown'], correct: 1 },
    { id: 2, text: "What does Mark's neighbor do for work?", options: ['Paints pictures', 'Writes articles for a magazine', 'Teaches art classes', 'Sells apartments'], correct: 1 },
    { id: 3, text: 'What did Mark ask his neighbor not to do?', options: ['Touch his painting', 'Judge his painting too fast', 'Buy his painting', 'Copy his method'], correct: 1 },
    { id: 4, text: "What is in the middle of Mark's painting?", options: ['A big symbol', 'A picture of his neighbor', 'A photo of the city', 'Nothing at all'], correct: 0 },
    { id: 5, text: 'How did Mark feel at the end?', options: ['Angry and alone', 'Tired but happy to have a new friend', 'Bored with his new home', 'Worried about his profit'], correct: 1 },
  ],
};

const lesson13Words = [
  { id: 'l13w1', word: 'blood', translation: 'qon', definition: 'Blood is the red liquid in your body.', example: 'I cut my finger and got blood on my shirt.', partOfSpeech: 'noun' },
  { id: 'l13w2', word: 'burn', translation: 'yondirmoq', definition: 'To burn something is to set it on fire.', example: 'I burned some wood in the camp fire.', partOfSpeech: 'verb' },
  { id: 'l13w3', word: 'cell', translation: 'kamera', definition: 'A cell is a small room where a person is locked in.', example: 'The jail cell was very small.', partOfSpeech: 'noun' },
  { id: 'l13w4', word: 'contain', translation: "o'z ichiga olmoq", definition: 'To contain something is to have it inside.', example: 'The mailbox contained a letter.', partOfSpeech: 'verb' },
  { id: 'l13w5', word: 'correct', translation: "to'g'ri", definition: 'To be correct is to be right.', example: 'All of my answers on the test were correct.', partOfSpeech: 'adjective' },
  { id: 'l13w6', word: 'crop', translation: 'hosil', definition: 'A crop is food that a farmer grows.', example: 'Wheat is a crop that is made into bread.', partOfSpeech: 'noun' },
  { id: 'l13w7', word: 'demand', translation: 'talab qilmoq', definition: 'To demand something is to say strongly that you want it.', example: 'The workers demanded to be paid more money.', partOfSpeech: 'verb' },
  { id: 'l13w8', word: 'equal', translation: 'teng', definition: 'To be equal is to be the same.', example: 'Both students are equal in age.', partOfSpeech: 'adjective' },
  { id: 'l13w9', word: 'feed', translation: 'oziqlantirmoq', definition: 'To feed is to give food.', example: 'Mother feeds my baby brother every day.', partOfSpeech: 'verb' },
  { id: 'l13w10', word: 'hole', translation: 'teshik', definition: 'A hole is an opening in something.', example: 'The man was going to jump into the hole in the ice.', partOfSpeech: 'noun' },
  { id: 'l13w11', word: 'increase', translation: 'oshirmoq', definition: 'To increase something is to make it larger or more.', example: "They've increased the price of gas by 15 cents!", partOfSpeech: 'verb' },
  { id: 'l13w12', word: 'lord', translation: 'lord', definition: 'Long ago, a lord was a man in charge of a town.', example: 'The lord of the town was not kind.', partOfSpeech: 'noun' },
  { id: 'l13w13', word: 'owe', translation: 'qarzdor bo\'lmoq', definition: 'To owe is to have to pay or give back something received from another.', example: 'I owed him twenty dollars, so I paid him back.', partOfSpeech: 'verb' },
  { id: 'l13w14', word: 'position', translation: 'holat', definition: 'A position is the way something is placed.', example: 'How can you sit in that position?', partOfSpeech: 'noun' },
  { id: 'l13w15', word: 'raise', translation: "ko'tarmoq", definition: 'To raise something is to lift it up.', example: 'We had to work together to raise the last piece.', partOfSpeech: 'verb' },
  { id: 'l13w16', word: 'responsible', translation: "mas'uliyatli", definition: 'If a person is responsible, they do the right things.', example: 'I try to be responsible and save money.', partOfSpeech: 'adjective' },
  { id: 'l13w17', word: 'sight', translation: 'manzara', definition: 'A sight is something interesting to see.', example: 'I saw the pyramids of Egypt. What a sight!', partOfSpeech: 'noun' },
  { id: 'l13w18', word: 'spot', translation: 'joy', definition: 'A spot is a place where something happens.', example: 'The kitchen is a good spot to eat meals.', partOfSpeech: 'noun' },
  { id: 'l13w19', word: 'structure', translation: 'bino', definition: 'A structure is a building.', example: 'They just built a beautiful new structure downtown.', partOfSpeech: 'noun' },
  { id: 'l13w20', word: 'whole', translation: 'butun', definition: 'Whole means all of something.', example: "I ate the whole pie. We don't have any more.", partOfSpeech: 'adjective' },
];

const lesson13Grammar = {
  questions: [
    { id: 1, text: 'The doctor checked his ___ before the operation.', options: ['blood', 'bloods', 'blooding', 'bloodly'], correct: 0, explanation: '"Blood" is uncountable — never takes -s.' },
    { id: 2, text: 'Choose the correct question:', options: ['Did the fire burn the house?', 'Did the fire burned the house?', 'Does the fire burn the house yesterday?', 'The fire did burn the house?'], correct: 0, explanation: 'Past Simple questions: Did + subject + base verb.' },
    { id: 3, text: 'The prisoner was locked in a small ___.', options: ['cell', 'cells', "cell's", 'celling'], correct: 0, explanation: 'A singular noun after "a small" needs no ending.' },
    { id: 4, text: 'Choose the correct word order:', options: ['This box contains old books.', 'This box old books contains.', 'Contains this box old books.', 'Old books this box contains.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 5, text: 'All of his answers were ___.', options: ['correct', 'corrects', 'correctly', 'correcting'], correct: 0, explanation: 'After "were", use the adjective form: correct.' },
    { id: 6, text: 'Farmers grow different ___ every year.', options: ['crops', 'crop', 'cropping', 'cropped'], correct: 0, explanation: '"Farmers" is plural, so the noun after it takes -s: crops.' },
    { id: 7, text: 'The workers ___ better pay.', options: ['demand', 'demands', 'demanding', 'demanded is'], correct: 0, explanation: '"Workers" is plural, so no -s on the verb: they demand.' },
    { id: 8, text: 'The two teams are ___ in skill.', options: ['equal', 'equals', 'equaling', 'equaled'], correct: 0, explanation: 'After "are", use the adjective form: equal.' },
    { id: 9, text: 'She ___ her cat every morning.', options: ['feed', 'feeds', 'feeding', 'fed'], correct: 1, explanation: '"She" needs the -s form: feeds.' },
    { id: 10, text: 'There is a ___ in my sock.', options: ['hole', 'holes', 'holing', 'holed'], correct: 0, explanation: 'A singular noun after "a" needs no ending.' },
    { id: 11, text: 'Choose the correct question:', options: ['Did prices increase last year?', 'Did prices increased last year?', 'Does prices increase last year?', 'Prices did increase last year?'], correct: 0, explanation: 'Past Simple questions: Did + subject + base verb.' },
    { id: 12, text: 'Long ago, a ___ ruled over the town.', options: ['lord', 'lords', "lord's", 'lording'], correct: 0, explanation: 'A singular noun after "a" needs no ending.' },
    { id: 13, text: 'I still ___ him some money.', options: ['owe', 'owes', 'owing', 'owed'], correct: 0, explanation: '"I" takes the base form: owe.' },
    { id: 14, text: 'Choose the correct word order:', options: ['The book is in the wrong position.', 'The book wrong position is in.', 'In the wrong position the book is.', 'Is the book in the wrong position.'], correct: 0, explanation: 'Subject + Verb + Place phrase is the normal order.' },
    { id: 15, text: 'They worked together to ___ the flag.', options: ['raise', 'raises', 'raising', 'raised'], correct: 0, explanation: 'After "to", use the base verb: raise.' },
    { id: 16, text: 'A good student is ___ for their own work.', options: ['responsible', 'responsibly', 'responsibility', 'responsibleness'], correct: 0, explanation: 'After "is", use the adjective form: responsible.' },
    { id: 17, text: 'The mountain view was an amazing ___.', options: ['sight', 'sights', 'sighting', 'sighted'], correct: 0, explanation: 'A singular noun after "an amazing" needs no ending.' },
    { id: 18, text: 'This is a good ___ for a picnic.', options: ['spot', 'spots', 'spotting', 'spotted'], correct: 0, explanation: 'A singular noun after "a good" needs no ending.' },
    { id: 19, text: 'They built a new ___ downtown.', options: ['structure', 'structures', 'structuring', 'structured'], correct: 0, explanation: 'A singular noun after "a new" needs no ending.' },
    { id: 20, text: 'Choose the correct word order:', options: ['She ate the whole cake.', 'She the whole cake ate.', 'The whole cake she ate.', 'Ate she the whole cake.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
  ],
};

const lesson13Reading = {
  title: 'The Farmer and the Cats',
  pages: [
    [
      { type: 'heading', text: 'The Farmer and the Cats' },
      { type: 'p', text: "Arthur was a responsible farmer, and Maria was a nice lady. But they were poor. They owed the town lord money for their land. One summer, their farm burned. One structure caught fire, and most of the animals ran away. Only the cats stayed. So Arthur and Maria had to bring in their crops without an animal's help." },
    ],
    [
      { type: 'p', text: 'On a fall day, the lord demanded his money. Arthur asked if the lord could wait until he brought in his crops. The lord was angry. He raised his hands high and yelled, "Pay me by the end of the week. If you don\'t, I will increase the money you have to pay. I might put you in a jail cell."' },
    ],
    [
      { type: 'p', text: 'So Arthur and Maria worked until there was blood on their hands. They finished four lines of corn and went to bed. But the next morning, eight lines were finished! "Maria, didn\'t we stop in this spot here?" Arthur asked. "Yes, that is correct. And the tools were in a different position, too," Maria said. They were surprised and happy. That day, they worked hard and finished five lines.' },
    ],
    [
      { type: 'p', text: 'But in the morning, ten lines were done! Each day they did a lot of work. Each night, someone else did an equal amount of work. In a week, the whole field was finished. "Tomorrow I will sell the crops and pay the lord," Arthur said. But that morning, the crops were gone. A bag was in the middle of the field. It contained money.' },
    ],
    [
      { type: 'p', text: '"Maria, let\'s see who has helped us work." Through a hole in the wall, they saw a funny sight. The cats were dancing in the field and eating corn! Now Arthur knew what had happened. The cats had worked at night! After that, Arthur was very nice to his cats and fed them lots of corn.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What does Arthur do in the story?', options: ['Put the lady in a jail cell', 'Raise his hands high', 'Demand money from people', 'Work until there is blood on his hands'], correct: 3 },
    { id: 2, text: 'What is true of the cats in the story?', options: ['They burn the farm and scare the animals.', "They do work equal to Arthur's work.", 'They think Arthur is very responsible.', 'They put all the tools in one spot.'], correct: 1 },
    { id: 3, text: 'What does the bag contain?', options: ['A gift for the lady', 'Corn to feed the animals', 'Money for the lord', 'A new kind of crop'], correct: 2 },
    { id: 4, text: 'What sight did Maria and Arthur see in the morning?', options: ['A hole in the wall of their house', 'A whole new structure on the farm', 'The lord working in their fields', 'The cats dancing on the farm'], correct: 3 },
    { id: 5, text: 'When will the lord increase the money that Arthur has to pay?', options: ["If Arthur doesn't pay by the end of the week", 'As soon as the crops are ready', 'Every time the cats help at night', 'Only if Maria asks him to'], correct: 0 },
  ],
};

const lesson13Listening = {
  title: 'The Missing Wallet',
  script: "James was a responsible farmer who grew a large crop of corn every year. One evening, he noticed a hole in his old barn structure, and he could see smoke — something was starting to burn! He worked fast to put it out, and got a small scratch that left a drop of blood on his hand.\n\nThe next morning, James found a wallet in the exact spot where the fire had started. It contained a photo and some old coins. James thought, \"This must belong to Mr. Lord, my neighbor. I owe him a favor, so I should return it.\"\n\nHe walked to Mr. Lord's house and knocked. \"I found your wallet,\" James said, holding it up. Mr. Lord looked at it and said, \"Yes, that is correct — it's mine! Thank you for being so responsible. If a thief had taken it, I might have had to call the police and put someone in a jail cell!\"\n\nMr. Lord never had to demand anything from James again. He wanted to raise James's pay and even offered to increase his share of the harvest. \"Your hard work is equal to mine,\" Mr. Lord said with a smile. James felt proud. It was a wonderful sight to see his neighbor so happy, and from that day, whenever James had to feed the animals, Mr. Lord helped him with the whole job, position by position, from start to finish.",
  questions: [
    { id: 1, text: 'What did James notice in his barn?', options: ['A hole and smoke starting a fire', 'A lost wallet', 'A sleeping cat', 'A broken window'], correct: 0 },
    { id: 2, text: 'What was inside the wallet James found?', options: ['Money and a map', 'A photo and some old coins', 'A house key', 'Nothing at all'], correct: 1 },
    { id: 3, text: 'Why did James want to return the wallet?', options: ['He wanted a reward', 'He owed Mr. Lord a favor', 'Mr. Lord demanded it back', 'He found it boring'], correct: 1 },
    { id: 4, text: 'What did Mr. Lord say might have happened if a thief took the wallet?', options: ['Nothing at all', 'Someone could go to jail', 'The farm would burn down', 'The crop would fail'], correct: 1 },
    { id: 5, text: 'How did Mr. Lord reward James?', options: ['He raised his pay and increased his share of the harvest', 'He gave him a new barn', 'He sold him the wallet', 'He asked him to leave the farm'], correct: 0 },
  ],
};

const lesson14Words = [
  { id: 'l14w1', word: 'coach', translation: 'murabbiy', definition: 'A coach is a person who teaches sports.', example: 'My coach gets very excited during games.', partOfSpeech: 'noun' },
  { id: 'l14w2', word: 'control', translation: 'boshqarmoq', definition: 'To control something is to make it do what you want.', example: 'To control the TV, just push the buttons.', partOfSpeech: 'verb' },
  { id: 'l14w3', word: 'description', translation: 'tasvir', definition: 'A description of someone or something says what they are like.', example: 'I gave a description of the man with the gun and hat to the police.', partOfSpeech: 'noun' },
  { id: 'l14w4', word: 'direct', translation: "to'g'ridan-to'g'ri", definition: 'If something is direct, it goes straight between two places.', example: 'The green path is a direct route to my house.', partOfSpeech: 'adjective' },
  { id: 'l14w5', word: 'exam', translation: 'imtihon', definition: 'An exam is a test.', example: 'I did some practice questions for the math exam on the board.', partOfSpeech: 'noun' },
  { id: 'l14w6', word: 'example', translation: 'misol', definition: 'An example of something is a thing that is typical of it.', example: 'Cola is an example of a soft drink.', partOfSpeech: 'noun' },
  { id: 'l14w7', word: 'limit', translation: 'chegara', definition: 'A limit is the largest or smallest amount of something that you allow.', example: 'My mother put a limit on how much I could use the phone.', partOfSpeech: 'noun' },
  { id: 'l14w8', word: 'local', translation: 'mahalliy', definition: 'If something is local, it is nearby.', example: 'The local market in my neighborhood sells all the food we need.', partOfSpeech: 'adjective' },
  { id: 'l14w9', word: 'magical', translation: 'sehrli', definition: 'Magical describes a quality that makes someone or something special.', example: 'The fireworks made the night sky look so magical.', partOfSpeech: 'adjective' },
  { id: 'l14w10', word: 'mail', translation: 'pochta', definition: 'Mail is letters and other things sent to people.', example: 'I get a lot of mail because I have friends all over the world.', partOfSpeech: 'noun' },
  { id: 'l14w11', word: 'novel', translation: 'roman', definition: 'A novel is a book that tells a story.', example: 'He wrote a great novel about ancient China.', partOfSpeech: 'noun' },
  { id: 'l14w12', word: 'outline', translation: 'reja', definition: 'An outline is the plan for a story or essay.', example: 'Before I wrote my essay, I made an outline.', partOfSpeech: 'noun' },
  { id: 'l14w13', word: 'poet', translation: 'shoir', definition: 'A poet is a person who writes poems.', example: 'William Shakespeare was one of the greatest poets.', partOfSpeech: 'noun' },
  { id: 'l14w14', word: 'print', translation: 'chop etmoq', definition: 'To print something is to put it onto paper.', example: 'Make sure that you print your name clearly.', partOfSpeech: 'verb' },
  { id: 'l14w15', word: 'scene', translation: 'sahna', definition: 'A scene is one part of a book or movie.', example: 'A movie is made up of many short pieces or scenes.', partOfSpeech: 'noun' },
  { id: 'l14w16', word: 'sheet', translation: 'varaq', definition: 'A sheet is a thin flat piece of paper.', example: 'I only needed a single sheet of paper to do my homework.', partOfSpeech: 'noun' },
  { id: 'l14w17', word: 'silly', translation: 'ahmoqona', definition: 'If someone or something is silly, they show a lack of thought.', example: "I made a silly mistake of dropping mom's vase.", partOfSpeech: 'adjective' },
  { id: 'l14w18', word: 'store', translation: "do'kon", definition: 'A store is a place where you can buy things.', example: 'I picked up a few things at the grocery store.', partOfSpeech: 'noun' },
  { id: 'l14w19', word: 'suffer', translation: 'azob chekmoq', definition: 'To suffer is to feel pain.', example: 'Her headache made her suffer all day.', partOfSpeech: 'verb' },
  { id: 'l14w20', word: 'technology', translation: 'texnologiya', definition: 'Technology is new things made by using science.', example: 'He loves technology such as laptop computers.', partOfSpeech: 'noun' },
];

const lesson14Grammar = {
  questions: [
    { id: 1, text: 'My soccer ___ trains us every day.', options: ['coach', 'coaches', "coach's", 'coaching'], correct: 0, explanation: 'A singular noun after "soccer" needs no ending.' },
    { id: 2, text: 'Choose the correct question:', options: ['Can you control this machine?', 'Can you controls this machine?', 'Do you can control this machine?', 'You can control this machine?'], correct: 0, explanation: 'Modal "can" + base verb: Can you control...?' },
    { id: 3, text: 'She gave a clear ___ of the thief.', options: ['description', 'descriptions', 'describe', 'describing'], correct: 0, explanation: 'A singular noun after "a clear" needs no ending.' },
    { id: 4, text: 'This is the most ___ way to the airport.', options: ['direct', 'directly', 'direction', 'directed'], correct: 0, explanation: 'After "most", use the adjective form: direct.' },
    { id: 5, text: 'Choose the correct question:', options: ['Did you pass the exam?', 'Did you passed the exam?', 'Does you pass the exam?', 'You did pass the exam?'], correct: 0, explanation: 'Past Simple question: Did + subject + base verb.' },
    { id: 6, text: 'Can you give me an ___ of that word?', options: ['example', 'examples', 'exampling', 'exampled'], correct: 0, explanation: 'A singular noun after "an" needs no ending.' },
    { id: 7, text: 'There is a ___ on how much you can spend.', options: ['limit', 'limits', 'limiting', 'limited'], correct: 0, explanation: 'A singular noun after "a" needs no ending.' },
    { id: 8, text: 'We ate at a ___ restaurant.', options: ['local', 'locally', 'locate', 'location'], correct: 0, explanation: 'The adjective form modifies the noun "restaurant": local.' },
    { id: 9, text: 'Choose the correct word order:', options: ['The forest looked magical at night.', 'The forest magical looked at night.', 'Magical the forest looked at night.', 'At night the forest magical looked.'], correct: 0, explanation: 'Subject + Verb + Adjective is the normal order.' },
    { id: 10, text: 'I checked my ___ this morning.', options: ['mail', 'mails', 'mailing', 'mailed'], correct: 0, explanation: '"Mail" is uncountable — never takes -s.' },
    { id: 11, text: 'She wrote her first ___ last year.', options: ['novel', 'novels', 'noveling', 'noveled'], correct: 0, explanation: 'A singular noun after "her first" needs no ending.' },
    { id: 12, text: 'He made an ___ before writing the essay.', options: ['outline', 'outlines', 'outlining', 'outlined'], correct: 0, explanation: 'A singular noun after "an" needs no ending.' },
    { id: 13, text: 'Choose the correct word order:', options: ['The poet read his new poem.', 'The poet his new poem read.', 'Read the poet his new poem.', 'His new poem the poet read.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 14, text: 'Please ___ your name clearly.', options: ['print', 'prints', 'printing', 'printed'], correct: 0, explanation: 'Imperative sentences use the base verb: print.' },
    { id: 15, text: 'That was the funniest ___ in the movie.', options: ['scene', 'scenes', 'scening', 'scened'], correct: 0, explanation: 'A singular noun after "the funniest" needs no ending.' },
    { id: 16, text: 'She needed one more ___ of paper.', options: ['sheet', 'sheets', 'sheeting', 'sheeted'], correct: 0, explanation: 'A singular noun after "one more" needs no ending.' },
    { id: 17, text: 'That was a ___ mistake to make.', options: ['silly', 'sillily', 'silliness', 'sillying'], correct: 0, explanation: 'An adjective goes before a noun: a silly mistake.' },
    { id: 18, text: 'Choose the correct question:', options: ['Did you go to the store?', 'Did you went to the store?', 'Do you went to the store?', 'You did go to the store?'], correct: 0, explanation: 'Past Simple question: Did + subject + base verb.' },
    { id: 19, text: "He didn't want to ___ any more pain.", options: ['suffer', 'suffers', 'suffering', 'suffered'], correct: 0, explanation: 'After "to", use the base verb: suffer.' },
    { id: 20, text: 'New ___ is changing our lives.', options: ['technology', 'technologies', 'technologying', 'technologied'], correct: 0, explanation: '"Technology" is uncountable here — no -s.' },
  ],
};

const lesson14Reading = {
  title: 'A Magical Book',
  pages: [
    [
      { type: 'heading', text: 'A Magical Book' },
      { type: 'p', text: "Sarah loved to read. She read novels and poems. She loved the beautiful descriptions and phrases. She loved reading work from poets and novelists. She didn't like video games or technology. She was on the basketball team, but she didn't like sports. Her parents made her play basketball. In fact, Sarah's parents made her do many things. But she didn't want to do those things. She just wanted to sit and read all day." },
    ],
    [
      { type: 'p', text: 'One day, a small book came in the mail. It was for Sarah. The book looked very special. It was printed on sheets of gold. Sarah began to read. The outline of the story was simple. It was about a magical place. Strange things happened there. One example from the book was about a boy who could control people. In one scene, he made his friends tell funny jokes.' },
    ],
    [
      { type: 'p', text: 'Sarah loved the book. She read it all the time. Then something strange happened. The book gave Sarah a special power. She could control other people. She was like the boy in the book. During one exam, she made her friend tell silly jokes. Her friend got in trouble.' },
    ],
    [
      { type: 'p', text: 'After school, Sarah did not make a direct trip home. On the way, she went to the local store. She wanted to play more tricks on people. She caused problems. She made people fall down. She laughed and had fun.' },
    ],
    [
      { type: 'p', text: 'Finally she left and started to walk home. Then she saw something. Her basketball coach was about to walk in front of a bus. He was looking the other way. She had to stop him! She used her power. She controlled him. She made him stop walking. Sarah learned something that day. It was better to help people than make them suffer. So, she put a limit on how she used her power. She did not want to do bad things with it anymore. She only wanted to do good.' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['A girl who gets a novel about technology in the mail', 'A basketball coach who tells jokes to people', 'A man who takes a direct trip to the local store', 'A girl who can control other people'], correct: 3 },
    { id: 2, text: 'Why does Sarah love to read?', options: ['It gives her control over other people.', 'She likes the phrases and descriptions in books.', 'She likes to tell jokes to her teachers.', 'She wants to be a poet.'], correct: 1 },
    { id: 3, text: 'What does Sarah learn in the end?', options: ['She should make other people suffer.', 'Simple stories are the best.', 'She must limit her power.', 'She should not read during an exam.'], correct: 2 },
    { id: 4, text: 'What is true about the magical book?', options: ['It is printed on sheets of gold.', 'Its outline is hard to understand.', 'It gives examples of good jokes.', "Sarah doesn't want to write in it."], correct: 0 },
    { id: 5, text: 'Why is Sarah on the basketball team?', options: ['Because her parents made her join', 'Because she loves sports', 'Because her coach is magical', 'Because she wants to win a prize'], correct: 0 },
  ],
};

const lesson14Listening = {
  title: 'The New Reporter',
  script: "Diego just got a job at the local newspaper. His editor gave him a strict limit: write only one page, and don't go over it. On his first day, Diego had to write a description of a scene at the town's new bookstore, which sold everything from novels to poetry books written by the town's favorite poet.\n\nDiego wanted to control his nerves, so he made an outline before he started writing, just like he learned back when he studied for his big exam in school. He asked the store owner for an example of a magical new gadget that used exciting technology, something that could print words as fast as you spoke them.\n\n\"It sounds silly,\" the owner laughed, \"but customers love it! We even mail free sample sheets to people who visit.\" Diego wrote it all down and felt his story taking a clear, direct shape.\n\nBy the end of the day, he didn't suffer through writer's block at all — his coach at journalism school always said good stories come from good details, and Diego had found plenty.",
  questions: [
    { id: 1, text: "What was Diego's new job?", options: ['A newspaper reporter', 'A bookstore owner', 'A poet', 'A technology teacher'], correct: 0 },
    { id: 2, text: 'What limit did his editor give him?', options: ['Write only one page', 'Finish in one hour', 'Use only five words', 'Interview ten people'], correct: 0 },
    { id: 3, text: 'What did Diego make before writing?', options: ['A painting', 'An outline', 'A list of poems', 'A print of the store'], correct: 1 },
    { id: 4, text: 'What did the technology in the store do?', options: ['Print words as fast as you spoke them', 'Cook food quickly', 'Clean the store by itself', 'Play music for customers'], correct: 0 },
    { id: 5, text: 'How did Diego feel by the end of the day?', options: ["He suffered through writer's block", 'He found plenty of good details for his story', 'He wanted to quit his job', 'He forgot everything he learned'], correct: 1 },
  ],
};

const lesson15Words = [
  { id: 'l15w1', word: 'across', translation: 'narigi tomonga', definition: 'To go across something is to go to the other side of it.', example: 'He walked across the board to the other side.', partOfSpeech: 'preposition' },
  { id: 'l15w2', word: 'breathe', translation: 'nafas olmoq', definition: 'To breathe means to let air go in and out of your body.', example: 'We need strong healthy lungs to help us breathe well.', partOfSpeech: 'verb' },
  { id: 'l15w3', word: 'characteristic', translation: 'xususiyat', definition: 'A characteristic is something that shows what a person or a thing is like.', example: 'One characteristic of tigers is their black stripes.', partOfSpeech: 'noun' },
  { id: 'l15w4', word: 'consume', translation: 'iste\'mol qilmoq', definition: 'To consume something means to eat or drink it.', example: 'Jack consumed a whole plate of spaghetti.', partOfSpeech: 'verb' },
  { id: 'l15w5', word: 'excite', translation: 'hayajonlantirmoq', definition: 'To excite someone means to make them happy and interested.', example: 'I heard about the school dance on Friday. This excited me.', partOfSpeech: 'verb' },
  { id: 'l15w6', word: 'extreme', translation: 'haddan tashqari', definition: 'If something is extreme, it is in a large amount or degree.', example: 'His workout was so extreme that he was sweating heavily.', partOfSpeech: 'adjective' },
  { id: 'l15w7', word: 'fear', translation: "qo'rquv", definition: 'Fear is the feeling of being afraid.', example: 'I have a great fear of skateboarding.', partOfSpeech: 'noun' },
  { id: 'l15w8', word: 'fortunate', translation: 'baxtli', definition: 'If you are fortunate, you are lucky.', example: 'I was fortunate to get a seat.', partOfSpeech: 'adjective' },
  { id: 'l15w9', word: 'happen', translation: "sodir bo'lmoq", definition: 'If someone happens to do something, they do it by chance.', example: 'I happened to meet some new friends at school today.', partOfSpeech: 'verb' },
  { id: 'l15w10', word: 'length', translation: 'uzunlik', definition: 'The length of something is how long it is from one end to the other.', example: 'The length of the floor is three meters.', partOfSpeech: 'noun' },
  { id: 'l15w11', word: 'mistake', translation: 'xato', definition: 'A mistake is something you do wrong.', example: 'My boss always yells at me when I make a mistake.', partOfSpeech: 'noun' },
  { id: 'l15w12', word: 'observe', translation: 'kuzatmoq', definition: 'To observe something is to watch it.', example: 'Brian observed the sun rising over the mountains.', partOfSpeech: 'verb' },
  { id: 'l15w13', word: 'opportunity', translation: 'imkoniyat', definition: 'An opportunity is a chance to do something.', example: 'I had an opportunity to take pictures in the jungle.', partOfSpeech: 'noun' },
  { id: 'l15w14', word: 'prize', translation: 'mukofot', definition: 'A prize is something of value that is given to the winner.', example: 'I won a prize for getting the best grade on my science test.', partOfSpeech: 'noun' },
  { id: 'l15w15', word: 'race', translation: 'poyga', definition: 'A race is a contest to see who is the fastest.', example: 'Paul is a fast runner, so he easily won the race.', partOfSpeech: 'noun' },
  { id: 'l15w16', word: 'realize', translation: 'anglamoq', definition: 'To realize is to suddenly understand.', example: 'After I left my house, I realized that I left the light on.', partOfSpeech: 'verb' },
  { id: 'l15w17', word: 'respond', translation: 'javob bermoq', definition: 'To respond is to give an answer to what someone else said.', example: 'When the teacher asked the question, we all responded.', partOfSpeech: 'verb' },
  { id: 'l15w18', word: 'risk', translation: 'xavf', definition: 'A risk is a chance of something bad happening.', example: 'I took a risk and climbed the snowy mountain.', partOfSpeech: 'noun' },
  { id: 'l15w19', word: 'wonder', translation: "hayron bo'lmoq", definition: 'To wonder is to ask yourself questions or have a need to know.', example: "The young mother wondered if she'd have a boy or a girl.", partOfSpeech: 'verb' },
  { id: 'l15w20', word: 'yet', translation: 'hali', definition: 'Yet is used to say something has not happened up to now.', example: "We can't go out yet; we're still eating.", partOfSpeech: 'adverb' },
];

const lesson15Grammar = {
  questions: [
    { id: 1, text: 'Choose the correct word order:', options: ['He swam across the river.', 'He across the river swam.', 'Across the river he swam.', 'Swam he across the river.'], correct: 0, explanation: 'Subject + Verb + Place phrase is the normal order.' },
    { id: 2, text: 'It is hard to ___ at the top of a mountain.', options: ['breathe', 'breathes', 'breathing', 'breathed'], correct: 0, explanation: 'After "to", use the base verb: breathe.' },
    { id: 3, text: 'Kindness is a great ___ to have.', options: ['characteristic', 'characteristics', 'characterize', 'characterizing'], correct: 0, explanation: 'A singular noun after "a great" needs no ending.' },
    { id: 4, text: 'Choose the correct question:', options: ['Does he consume a lot of sugar?', 'Do he consume a lot of sugar?', 'Does he consumes a lot of sugar?', 'He does consume a lot of sugar?'], correct: 0, explanation: '"He" is singular, so use "Does" + base verb: Does he consume...?' },
    { id: 5, text: 'The good news will ___ everyone.', options: ['excite', 'excites', 'exciting', 'excited'], correct: 0, explanation: 'After the modal "will", use the base verb: excite.' },
    { id: 6, text: 'The weather this week has been ___.', options: ['extreme', 'extremely', 'extremeness', 'extremes'], correct: 0, explanation: 'After "has been", use the adjective form: extreme.' },
    { id: 7, text: 'She has a great ___ of spiders.', options: ['fear', 'fears', 'feared', 'fearing'], correct: 0, explanation: 'A singular noun after "a great" needs no ending.' },
    { id: 8, text: 'We were ___ to find a good seat.', options: ['fortunate', 'fortunately', 'fortune', 'fortunateness'], correct: 0, explanation: 'After "were", use the adjective form: fortunate.' },
    { id: 9, text: 'Choose the correct question:', options: ['Did anything strange happen?', 'Did anything strange happened?', 'Does anything strange happen yesterday?', 'Anything strange did happen?'], correct: 0, explanation: 'Past Simple question: Did + subject + base verb.' },
    { id: 10, text: 'What is the ___ of this rope?', options: ['length', 'lengths', 'lengthen', 'lengthy'], correct: 0, explanation: 'A singular noun after "the" needs no ending.' },
    { id: 11, text: 'Everyone makes a ___ sometimes.', options: ['mistake', 'mistakes', 'mistaken', 'mistaking'], correct: 0, explanation: 'A singular noun after "a" needs no ending.' },
    { id: 12, text: 'Scientists ___ the stars every night.', options: ['observe', 'observes', 'observing', 'observed'], correct: 0, explanation: '"Scientists" is plural, so no -s: they observe.' },
    { id: 13, text: 'This job is a great ___ for her.', options: ['opportunity', 'opportunities', 'opportune', 'opportuning'], correct: 0, explanation: 'A singular noun after "a great" needs no ending.' },
    { id: 14, text: 'Choose the correct word order:', options: ['She won the first prize.', 'She the first prize won.', 'Won she the first prize.', 'The first prize she won.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 15, text: 'The runners are ready for the ___.', options: ['race', 'races', 'racing', 'raced'], correct: 0, explanation: 'A singular noun after "the" needs no ending.' },
    { id: 16, text: 'Choose the correct question:', options: ['Did you realize your mistake?', 'Did you realized your mistake?', 'Does you realize your mistake?', 'You did realize your mistake?'], correct: 0, explanation: 'Past Simple question: Did + subject + base verb.' },
    { id: 17, text: 'Please ___ to my message soon.', options: ['respond', 'responds', 'responding', 'responded'], correct: 0, explanation: 'Imperative sentences use the base verb: respond.' },
    { id: 18, text: 'Climbing without a rope is a big ___.', options: ['risk', 'risks', 'risking', 'risked'], correct: 0, explanation: 'A singular noun after "a big" needs no ending.' },
    { id: 19, text: 'I often ___ what life is like on other planets.', options: ['wonder', 'wonders', 'wondering', 'wondered'], correct: 0, explanation: '"I" takes the base form: wonder.' },
    { id: 20, text: 'Choose the correct word order:', options: ["She hasn't finished her homework yet.", "She hasn't yet finished her homework.", "Yet she hasn't finished her homework.", "She yet hasn't finished her homework."], correct: 0, explanation: '"Yet" usually goes at the end of a negative sentence about something not finished.' },
  ],
};

const lesson15Reading = {
  title: 'The Big Race',
  pages: [
    [
      { type: 'heading', text: 'The Big Race' },
      { type: 'p', text: 'A dog saw a group of animals across the road. He walked over to meet them. "What are you doing?" he asked them. "I just sold them tickets to a race between the rabbit and the turtle," the duck responded.' },
    ],
    [
      { type: 'p', text: 'This news excited the dog. He felt fortunate that he happened to be there. "I don\'t have anything to do today," the dog said. "I want to buy a ticket, too." The dog sat down to observe the race. The race would be extreme. It would be many kilometers in length. The rabbit and the turtle stood next to each other. They waited for the race to start. The dog wondered why the turtle agreed to run against the rabbit. Being fast was not a characteristic of turtles. The rabbit was going to win easily.' },
    ],
    [
      { type: 'p', text: 'Suddenly, the race began. The rabbit ran extremely quickly. The turtle walked slowly. After a minute, the rabbit looked back. He saw that the turtle was far behind him and was breathing quickly because he was so tired. The rabbit smiled and slowed to a walk. A minute later, the rabbit said, "I\'m winning, so I\'ll take a rest." He sat and began to consume some grass. Then, he let his eyes close. He wasn\'t the winner yet. But there was no risk of him losing the race. He went to sleep.' },
    ],
    [
      { type: 'p', text: 'Hours later, a loud sound woke him. All of the animals were yelling and looking at the field. He felt fear for the first time. The turtle was almost at the finish line. Now, the rabbit realized his mistake. But the race was over. He gave the turtle an opportunity to win, and the turtle took it. The duck handed the turtle his prize. It was the happiest day of the turtle\'s life. The dog was happy for the turtle. "He isn\'t fast," the dog thought. "But he tried his best and did something great."' },
    ],
  ],
  questions: [
    { id: 1, text: 'What is this story about?', options: ['A race between a rabbit and a turtle', 'The risk of running in a race', 'The extreme speed of rabbits', 'How to observe a turtle'], correct: 0 },
    { id: 2, text: 'What did the duck do for the other animals?', options: ['He told them the news.', 'He gave them a prize.', 'He responded to their questions.', 'He sold tickets to them.'], correct: 3 },
    { id: 3, text: 'Why did the dog think the turtle had no opportunity to win the race?', options: [ "The turtle hadn't won a race yet.", "The turtle couldn't walk across such a length.", 'Being fast was not a characteristic of turtles.', 'The turtle was not fortunate.'], correct: 2 },
    { id: 4, text: 'What did the rabbit do after he woke up?', options: ['He consumed some grass.', 'He realized his mistake.', 'He breathed quickly.', 'He excited the animals.'], correct: 1 },
    { id: 5, text: 'What did the rabbit see to make him feel fear?', options: ['All the animals yelling and the turtle near the finish line', 'A storm approaching the field', 'The duck taking his prize away', 'Another rabbit joining the race'], correct: 0 },
  ],
};

const lesson15Listening = {
  title: 'The School Science Fair',
  script: "Every year, students walk across the school hall to see the science fair. This year, Mia had an opportunity to enter for the first time, and it excited her so much she could barely breathe.\n\nHer project was about an extreme characteristic of a certain plant: how quickly it could consume water. She wondered if her plant would grow the correct length in time for the judging.\n\nOn the morning of the fair, something unlucky happened — Mia realized she had made a mistake and left her plant at home! She felt fear rush through her. Was there any risk she could still win the prize?\n\nFortunately, her teacher let her respond to the problem calmly. \"You still have time,\" the teacher said. \"Go home and come right back — just don't take a risk crossing the busy road.\"\n\nMia ran home, careful to observe the traffic before crossing. She hadn't lost the race for time yet. When she returned, judges were ready to observe every project in the room. In the end, Mia's hard work paid off, and she won second prize — a fortunate ending to a very extreme morning!",
  questions: [
    { id: 1, text: 'What opportunity did Mia have this year?', options: ['To enter the science fair for the first time', 'To become a teacher', 'To win a race', 'To travel across the country'], correct: 0 },
    { id: 2, text: "What was Mia's project about?", options: ['How fast a plant grows in length', 'How quickly a plant consumes water', 'How to observe insects', 'How to fix a broken toy'], correct: 1 },
    { id: 3, text: 'What mistake did Mia make?', options: ['She broke her project', 'She left her plant at home', 'She was late to school', 'She lost her ticket'], correct: 1 },
    { id: 4, text: 'What did the teacher warn Mia about?', options: ['Not to take a risk crossing the busy road', 'Not to talk to the judges', 'Not to touch her plant', 'Not to be late again'], correct: 0 },
    { id: 5, text: 'How did the story end for Mia?', options: ['She lost the competition', 'She won second prize', 'She quit the fair', 'She broke her plant again'], correct: 1 },
  ],
};

const lesson16Words = [
  { id: 'l16w1', word: 'academy', translation: 'akademiya', definition: 'An academy is a special type of school.', example: 'There are many courses taught at the academy that I go to.', partOfSpeech: 'noun' },
  { id: 'l16w2', word: 'ancient', translation: 'qadimiy', definition: 'If something is ancient, it is very old.', example: 'I want to see the ancient buildings in Rome.', partOfSpeech: 'adjective' },
  { id: 'l16w3', word: 'board', translation: 'taxta', definition: 'A board is a flat piece of wood.', example: 'The sign was made of a few wooden boards.', partOfSpeech: 'noun' },
  { id: 'l16w4', word: 'century', translation: 'asr', definition: 'A century is one hundred years.', example: 'Our company is celebrating a century of business in London.', partOfSpeech: 'noun' },
  { id: 'l16w5', word: 'clue', translation: 'ip uchi', definition: 'A clue is a fact or object that helps solve a mystery or crime.', example: 'The detective found some clues on the sidewalk.', partOfSpeech: 'noun' },
  { id: 'l16w6', word: 'concert', translation: 'konsert', definition: 'A concert is an event where you listen to people play music.', example: 'I enjoyed the concert last night. The band was very good.', partOfSpeech: 'noun' },
  { id: 'l16w7', word: 'county', translation: 'okrug', definition: 'A county is the largest political division of a state in the US.', example: 'He wanted to represent the citizens of his county.', partOfSpeech: 'noun' },
  { id: 'l16w8', word: 'dictionary', translation: "lug'at", definition: 'A dictionary is a book that tells you what words mean.', example: 'I use the dictionary to learn new words.', partOfSpeech: 'noun' },
  { id: 'l16w9', word: 'exist', translation: 'mavjud bo\'lmoq', definition: 'To exist is to be real.', example: 'Do you really think that unicorns ever existed?', partOfSpeech: 'verb' },
  { id: 'l16w10', word: 'flat', translation: 'tekis', definition: 'Flat describes something that is level and smooth with no curved parts.', example: 'My parents bought a new flat screen TV over the weekend.', partOfSpeech: 'adjective' },
  { id: 'l16w11', word: 'gentleman', translation: 'janob', definition: 'A gentleman is a nice man.', example: 'My grandfather is a kind and helpful gentleman.', partOfSpeech: 'noun' },
  { id: 'l16w12', word: 'hidden', translation: 'yashirin', definition: 'Hidden means to be not easily noticed or too hard to find.', example: 'The hidden camera recorded everything in the parking lot.', partOfSpeech: 'adjective' },
  { id: 'l16w13', word: 'maybe', translation: 'balki', definition: 'Maybe is used to show that something is possible or may be true.', example: 'If I focus hard enough, maybe I can come up with the right answer.', partOfSpeech: 'adverb' },
  { id: 'l16w14', word: 'officer', translation: 'zobit', definition: 'An officer is a leader in the army.', example: 'The soldiers followed the orders of the officer.', partOfSpeech: 'noun' },
  { id: 'l16w15', word: 'original', translation: 'asl', definition: 'If something is original, it is the first one of that thing.', example: 'This is the original painting of the Mona Lisa.', partOfSpeech: 'adjective' },
  { id: 'l16w16', word: 'pound', translation: 'qattiq urmoq', definition: 'To pound something is to hit it many times with a lot of force.', example: 'He pounded the nail with the hammer.', partOfSpeech: 'verb' },
  { id: 'l16w17', word: 'process', translation: 'jarayon', definition: 'A process is the steps to take to do something.', example: 'Making a cake is a long process.', partOfSpeech: 'noun' },
  { id: 'l16w18', word: 'publish', translation: 'nashr qilmoq', definition: 'To publish a book is to get it printed and ready to sell.', example: 'That company publishes daily newspapers.', partOfSpeech: 'verb' },
  { id: 'l16w19', word: 'theater', translation: 'teatr', definition: 'A theater is a building where you watch plays, shows, and movies.', example: 'We went to the theater to see a play.', partOfSpeech: 'noun' },
  { id: 'l16w20', word: 'wealth', translation: 'boylik', definition: 'Wealth is a large amount of money.', example: 'One of the most important things to some people is wealth.', partOfSpeech: 'noun' },
];

const lesson16Grammar = {
  questions: [
    { id: 1, text: 'He studies at a military ___.', options: ['academy', 'academies', "academy's", 'academying'], correct: 0, explanation: 'A singular noun after "a military" needs no ending.' },
    { id: 2, text: 'They found ___ ruins in the desert.', options: ['ancient', 'anciently', 'ancients', 'ancienting'], correct: 0, explanation: 'An adjective goes before a plural noun: ancient ruins.' },
    { id: 3, text: 'He wrote the answer on the ___.', options: ['board', 'boards', 'boarding', 'boarded'], correct: 0, explanation: 'A singular noun after "the" needs no ending.' },
    { id: 4, text: 'This building is over a ___ old.', options: ['century', 'centuries', "century's", 'centurying'], correct: 0, explanation: 'A singular noun after "a" needs no ending.' },
    { id: 5, text: 'Choose the correct word order:', options: ['The detective found an important clue.', 'The detective an important clue found.', 'Found the detective an important clue.', 'An important clue the detective found.'], correct: 0, explanation: 'Subject + Verb + Object is the normal order.' },
    { id: 6, text: 'We are going to a ___ tonight.', options: ['concert', 'concerts', 'concerting', 'concerted'], correct: 0, explanation: 'A singular noun after "a" needs no ending.' },
    { id: 7, text: 'He represents the people of his ___.', options: ['county', 'counties', "county's", 'countying'], correct: 0, explanation: 'A singular noun after "his" needs no ending.' },
    { id: 8, text: 'She looked up the word in a ___.', options: ['dictionary', 'dictionaries', "dictionary's", 'dictionarying'], correct: 0, explanation: 'A singular noun after "a" needs no ending.' },
    { id: 9, text: 'Choose the correct question:', options: ['Do dinosaurs still exist?', 'Does dinosaurs still exist?', 'Do dinosaurs still exists?', 'Dinosaurs do still exist?'], correct: 0, explanation: '"Dinosaurs" is plural, so use "Do" + base verb.' },
    { id: 10, text: 'The desert land was completely ___.', options: ['flat', 'flatly', 'flatness', 'flattened'], correct: 0, explanation: 'After "was", use the adjective form: flat.' },
    { id: 11, text: 'The old ___ opened the door for everyone.', options: ['gentleman', 'gentlemen', "gentleman's", 'gentlemaning'], correct: 0, explanation: 'A singular noun after "The old" needs no ending.' },
    { id: 12, text: 'The treasure was ___ under the floor.', options: ['hidden', 'hide', 'hiding', 'hides'], correct: 0, explanation: 'Passive voice uses the past participle: was hidden.' },
    { id: 13, text: 'Choose the correct word order:', options: ['Maybe we can go tomorrow.', 'We maybe can go tomorrow.', 'Can maybe we go tomorrow.', 'We can go maybe tomorrow.'], correct: 0, explanation: '"Maybe" usually starts the sentence when giving a possibility.' },
    { id: 14, text: 'The ___ gave orders to the soldiers.', options: ['officer', 'officers', "officer's", 'officering'], correct: 0, explanation: 'A singular noun after "The" needs no ending.' },
    { id: 15, text: 'This is the ___ copy of the painting.', options: ['original', 'originally', 'originality', 'originals'], correct: 0, explanation: 'An adjective goes before a noun: the original copy.' },
    { id: 16, text: 'He had to ___ the nail into the wood.', options: ['pound', 'pounds', 'pounding', 'pounded'], correct: 0, explanation: 'After "to", use the base verb: pound.' },
    { id: 17, text: 'Baking bread is a slow ___.', options: ['process', 'processes', 'processing', 'processed'], correct: 0, explanation: 'A singular noun after "a slow" needs no ending.' },
    { id: 18, text: 'Choose the correct question:', options: ['Will they publish the book this year?', 'Will they published the book this year?', 'Do they publish the book this year?', 'They will publish the book this year?'], correct: 0, explanation: 'Future questions: Will + subject + base verb.' },
    { id: 19, text: 'We watched a play at the ___.', options: ['theater', 'theaters', "theater's", 'theatering'], correct: 0, explanation: 'A singular noun after "the" needs no ending.' },
    { id: 20, text: 'His family had great ___.', options: ['wealth', 'wealths', 'wealthy', 'wealthier'], correct: 0, explanation: '"Wealth" is uncountable — never takes -s.' },
  ],
};

const lesson16Reading = {
  title: "Adams County's Gold",
  pages: [
    [
      { type: 'heading', text: "Adams County's Gold" },
      { type: 'p', text: 'Adams Academy was a good school. Boys lived there and took classes. Tom worked hard all week. On a spring Saturday, he wanted to do something fun! He asked his friend Jeff to go to the movie theater. "Sorry," Jeff answered. "I\'m going to a concert." So Tom asked Joe to go to the movies. But Joe\'s soccer team had a game.' },
    ],
    [
      { type: 'p', text: 'Next, Tom went down the hall to Brad\'s room. Brad was reading a very large old book. "Hi, Brad," Tom said. "Are you reading a dictionary? It looks ancient." "No. This is called The Wealth of Adams County. It\'s about hidden gold in Adams County. It\'s more than a century old. It was published in 1870! Look, it even has the original cover on it."' },
    ],
    [
      { type: 'p', text: 'Tom asked, "Where did you get it?" "It\'s from my dad\'s friend. He is a nice gentleman, an officer in the army," answered Brad. "The gold doesn\'t really exist, does it?" Tom asked. "I don\'t know, but maybe! There are clues to it in this book. Let\'s find it!" Looking for gold sounded like fun.' },
    ],
    [
      { type: 'p', text: 'The first clue was to find a flat tree underground. "It must be in the forest," Tom said. Brad said, "The flat tree could be a board under the dirt. It could cover the gold." Tom and Brad dug in the dirt all morning. The process of looking for gold made them hungry. They were ready to stop for lunch. But then Brad hit something hard. It was a board!' },
    ],
    [
      { type: 'p', text: 'Brad pounded on the board until it broke. There was a small hole under it. "Look!" He held up a gold coin. Tom saw a piece of paper in the hole. "Brad, there\'s more. It\'s a map to the rest of the gold!" Brad smiled. "Let\'s go!" And they hurried to find the wealth of Adams County.' },
    ],
  ],
  questions: [
    { id: 1, text: 'Where do the boys look for the gold?', options: ['At Adams Academy', 'At the movie theater', 'In the forest', 'In a concert hall'], correct: 2 },
    { id: 2, text: 'What is NOT true of The Wealth of Adams County?', options: ['It was published more than a century ago.', 'It was written by an army officer.', 'It still has its original cover.', 'It tells about a board in the forest floor.'], correct: 3 },
    { id: 3, text: 'Why does Brad think the gold really exists?', options: ['Because there are clues to it in a book', 'Because a gentleman told him it did', 'Because he was given an ancient dictionary', 'Because it was hidden in the spring'], correct: 0 },
    { id: 4, text: 'Where will the boys probably go at the end of the story?', options: ['To get tools to carry the gold', 'To continue the process of finding gold', "To watch Joe's soccer team", 'To pound on more boards'], correct: 1 },
    { id: 5, text: "Why can't Jeff go to the movie theater?", options: ['Because he is going to a concert', 'Because he has a soccer game', 'Because he is reading a book', 'Because he is digging for gold'], correct: 0 },
  ],
};

const lesson16Listening = {
  title: 'The Old Map',
  script: "Lucy went to a small academy in the countryside. One rainy afternoon, instead of going to a concert at the local theater, she stayed inside and found an ancient wooden board in the attic.\n\nCarved into the board were strange symbols. Lucy checked a dictionary, but the words didn't exist in any language she knew. \"Maybe it's a clue to something,\" she thought.\n\nHer grandfather, a kind gentleman who once worked as an officer in the county government, told her the board was over a century old. \"It's the original piece from your great-great-grandfather's house,\" he said. \"Some say there's hidden wealth buried near our old farm.\"\n\nLucy began the long process of studying every mark on the flat board. She pounded gently on one side, and to her surprise, a small drawer popped open. Inside was an old letter, ready to be shared with the world. Lucy's grandfather even said the local newspaper might want to publish her discovery!",
  questions: [
    { id: 1, text: 'What did Lucy find in the attic?', options: ['An ancient wooden board', 'A gold coin', 'A new dictionary', 'A concert ticket'], correct: 0 },
    { id: 2, text: "Why couldn't Lucy understand the symbols?", options: ['They were in a foreign country', "They didn't exist in any dictionary she checked", 'They were too small to see', 'They were written in a modern language'], correct: 1 },
    { id: 3, text: "What did Lucy's grandfather used to work as?", options: ['A teacher at the academy', 'An officer in the county government', 'A theater actor', 'A dictionary writer'], correct: 1 },
    { id: 4, text: 'What might be buried near the old farm?', options: ['Hidden wealth', 'A concert hall', 'An ancient theater', 'A new academy'], correct: 0 },
    { id: 5, text: 'What happened when Lucy pounded on the board?', options: ['It broke into pieces', 'A small drawer popped open', 'Nothing happened', 'It turned to dust'], correct: 1 },
  ],
};

export const lessons12to16 = [
  {
    id: 'essential-lesson-12',
    title: 'Lesson 12',
    words: lesson12Words,
    grammar: lesson12Grammar,
    reading: lesson12Reading,
    listening: lesson12Listening,
  },
  {
    id: 'essential-lesson-13',
    title: 'Lesson 13',
    words: lesson13Words,
    grammar: lesson13Grammar,
    reading: lesson13Reading,
    listening: lesson13Listening,
  },
  {
    id: 'essential-lesson-14',
    title: 'Lesson 14',
    words: lesson14Words,
    grammar: lesson14Grammar,
    reading: lesson14Reading,
    listening: lesson14Listening,
  },
  {
    id: 'essential-lesson-15',
    title: 'Lesson 15',
    words: lesson15Words,
    grammar: lesson15Grammar,
    reading: lesson15Reading,
    listening: lesson15Listening,
  },
  {
    id: 'essential-lesson-16',
    title: 'Lesson 16',
    words: lesson16Words,
    grammar: lesson16Grammar,
    reading: lesson16Reading,
    listening: lesson16Listening,
  },
];
