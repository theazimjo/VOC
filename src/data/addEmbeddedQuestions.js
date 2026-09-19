import fs from 'fs';

const embeddedQuestionsTopic = {
  id: 'embedded-questions',
  title: 'Embedded Questions & Sentences',
  icon: '🧩',
  guide: `## Embedded Questions & Sentences (Ichma-ich / Biriktirilgan savollar)

Embedded Questions (Ichma-ich savollar) — bu boshqa bir gap yoki savolning ichiga joylashtirilgan so'roq birikmalaridir. Ular nutqni xushmuomalarroq, rasmiyroq va muloyimroq qilish uchun ishlatiladi.

## 1. Asosiy so'z tartibi qoidasi (Word Order Rule)
Tog'ridan-to'g'ri (Direct) savollarda yordamchi fe'l egadan oldinga o'tadi, lekin **Embedded Questions gaplarida so'z tartibi darak gapnikidek (Ega + Fe'l) bo'ladi**.

• **Direct Question**: Where **is the station**?
• **Embedded Question**: Could you tell me where **the station is**? (where is the station ❌)

• **Direct Question**: What time **does the bus leave**?
• **Embedded Question**: Do you know what time **the bus leaves**? (what time does the bus leave ❌)

## 2. Yes/No savollarida "If" va "Whether" ishlatilishi
Javobi Yes/No bo'lgan oddiy savollar ichma-ich savolga aylanganda **if** yoki **whether** bog'lovchisi ishlatiladi:
• **Direct**: Is he at home?
• **Embedded**: Do you know **if he is** at home? / I wonder **whether he is** at home.
• **Direct**: Did she call you?
• **Embedded**: Can you tell me **if she called** you?

## 3. Mashhur kirish iboralari (Introductory Phrases)
• **Could you tell me...** (Menga ayta olasizmi...?)
• **Do you know...** (Bilasizmi...?)
• **I wonder / I was wondering...** (Qiziq, ...-mikin?)
• **I don't know...** (Men bilmayman...)
• **Can you remember...** (Esla olasizmi...?)
• **I'd like to know...** (Bilmoqchi edim...)

## 4. Asosiy qoidalar va xatolar (Key Rules & Common Mistakes)
1. **Do/Does/Did yordamchi fe'llari tushib qoladi**:
   - *Do you know where did he go?* ❌ → *Do you know where **he went**?* ✅
2. **Agar kirish iborasi darak gap bo'lsa (I wonder / I don't know), gap oxiriga nuqta (.) qo'yiladi**:
   - *I wonder what time it is.* (Nuqta)
   - *Do you know what time it is?* (So'roq belgisi)`,
  questions: [
    { id: 1, text: 'Could you tell me where ___?', options: ['the bank is', 'is the bank', 'does the bank be', 'is being the bank'], correct: 0, explanation: 'Embedded question ichida darak gap tartibi keladi: "where the bank is".' },
    { id: 2, text: 'Do you know what time ___?', options: ['the movie starts', 'does the movie start', 'is the movie start', 'starts the movie'], correct: 0, explanation: '"does" tushib qoladi va fe\'l -s oladi: "what time the movie starts".' },
    { id: 3, text: 'I wonder if she ___ to the party tonight.', options: ['is coming', 'is she coming', 'does she come', 'will she coming'], correct: 0, explanation: 'Yes/No savolida "if"dan keyin ega + fe\'l keladi: "if she is coming".' },
    { id: 4, text: 'Can you remember where ___ your keys?', options: ['you put', 'did you put', 'have you put', 'do you put'], correct: 0, explanation: 'O\'tgan zamon embedded question: "where you put".' },
    { id: 5, text: 'I don\'t know why ___ so angry yesterday.', options: ['he was', 'was he', 'did he be', 'he is'], correct: 0, explanation: 'Darak gap tartibi: "why he was".' },
    { id: 6, text: 'Could you explain how ___ this word?', options: ['to pronounce', 'pronounced', 'pronouncing', 'do pronounce'], correct: 0, explanation: '"how to + verb" birikmasi embedded iboralarda ishlatiladi.' },
    { id: 7, text: 'Do you happen to know whether the museum ___ open today?', options: ['is', 'does', 'be', 'are'], correct: 0, explanation: 'Whether + subject + to be fe\'li ("is").' },
    { id: 8, text: 'I\'d like to know how much ___.', options: ['this shirt costs', 'does this shirt cost', 'costs this shirt', 'is this shirt cost'], correct: 0, explanation: '"does" tushib qolib fe\'lga -s qo\'shiladi: "how much this shirt costs".' },
    { id: 9, text: 'Please tell me who ___ that window.', options: ['broke', 'did break', 'was break', 'did broke'], correct: 0, explanation: 'Ega so\'rovi bo\'lgani uchun fe\'l o\'tmish shaklida keladi: "who broke".' },
    { id: 10, text: 'I wonder where ___ live nowadays.', options: ['they', 'do they', 'are they', 'did they'], correct: 0, explanation: 'Darak gap tartibi: "where they live".' },
    { id: 11, text: 'Could you tell me what time ___?', options: ['it is', 'is it', 'it does', 'is it being'], correct: 0, explanation: '"what time it is" darak so\'z tartibi.' },
    { id: 12, text: 'Do you know if he ___ English fluently?', options: ['speaks', 'does speak', 'is speak', 'speaking'], correct: 0, explanation: 'Darak gap tartibi: "if he speaks".' },
    { id: 13, text: 'I was wondering why ___ late for class.', options: ['you were', 'were you', 'did you be', 'are you'], correct: 0, explanation: 'O\'tgan zamon darak tartibi: "why you were".' },
    { id: 14, text: 'Can you tell me how long ___ here?', options: ['you have lived', 'have you lived', 'did you live', 'you live'], correct: 0, explanation: 'Present Perfect embedded: "how long you have lived".' },
    { id: 15, text: 'I don\'t remember where ___ my car.', options: ['I parked', 'did I park', 'have I parked', 'was I park'], correct: 0, explanation: 'O\'tgan zamon: "where I parked".' },
    { id: 16, text: 'Do you know whether she ___ the email yet?', options: ['has sent', 'did send', 'has she sent', 'does send'], correct: 0, explanation: 'Present Perfect darak tartibi: "whether she has sent".' },
    { id: 17, text: 'I\'d like to know what time the library ___ on Saturdays.', options: ['closes', 'does close', 'is close', 'close'], correct: 0, explanation: 'Birlikdagi ega (library) uchun fe\'l -s oladi: "closes".' },
    { id: 18, text: 'Could you check who ___ at the door?', options: ['is', 'does', 'be', 'are'], correct: 0, explanation: 'Ega so\'rovi: "who is at the door".' },
    { id: 19, text: 'I wonder how much money ___ spent on the trip.', options: ['they', 'did they', 'were they', 'have they'], correct: 0, explanation: 'Darak gap tartibi: "how much money they spent".' },
    { id: 20, text: 'Do you know why ___ the offer?', options: ['she rejected', 'did she reject', 'was she reject', 'does she reject'], correct: 0, explanation: 'O\'tgan zamon darak tartibi: "why she rejected".' }
  ],
  fillBlanks: [
    { id: 1, text: 'Could you tell me where ___ (the station is / is the station)?', options: ['the station is', 'is the station', 'does the station be', 'is being the station'], correct: 0, explanation: 'Embedded question ichida ega fe\'ldan oldin keladi: "the station is".' },
    { id: 2, text: 'Do you know what time ___ (the store closes / does the store close)?', options: ['the store closes', 'does the store close', 'is the store close', 'closes the store'], correct: 0, explanation: '"does" tushadi va fe\'l -s oladi: "the store closes".' },
    { id: 3, text: 'I wonder if she ___ (is coming / is she coming) today.', options: ['is coming', 'is she coming', 'does she come', 'will she coming'], correct: 0, explanation: 'Darak gap tartibi: "if she is coming".' },
    { id: 4, text: 'Can you remember where ___ (you left / did you leave) your umbrella?', options: ['you left', 'did you leave', 'have you left', 'you leave'], correct: 0, explanation: 'O\'tgan zamon: "you left".' },
    { id: 5, text: 'I don\'t know why ___ (he did that / did he that).', options: ['he did that', 'did he that', 'was he do that', 'did he do that'], correct: 0, explanation: 'Darak gap tartibi: "he did that".' },
    { id: 6, text: 'Could you show me how ___ (to solve / solve) this equation?', options: ['to solve', 'solve', 'solving', 'do solve'], correct: 0, explanation: '"how to solve" shakli ishlatiladi.' },
    { id: 7, text: 'Do you know whether the plane ___ (has arrived / has it arrived)?', options: ['has arrived', 'has it arrived', 'did arrive', 'does arrive'], correct: 0, explanation: 'Darak gap tartibi: "the plane has arrived".' },
    { id: 8, text: 'I\'d like to know how much ___ (it costs / does it cost).', options: ['it costs', 'does it cost', 'is it cost', 'costs it'], correct: 0, explanation: '"does" tushadi: "it costs".' },
    { id: 9, text: 'Tell me who ___ (wrote / did write) this essay.', options: ['wrote', 'did write', 'was write', 'written'], correct: 0, explanation: 'Ega so\'rovida fe\'l o\'tmish shaklida (wrote) bo\'ladi.' },
    { id: 10, text: 'I wonder where ___ (they live / do they live).', options: ['they live', 'do they live', 'are they living', 'did they live'], correct: 0, explanation: 'Darak gap tartibi: "they live".' },
    { id: 11, text: 'Could you tell me what ___ (your name is / is your name)?', options: ['your name is', 'is your name', 'does your name be', 'your name be'], correct: 0, explanation: 'Darak gap tartibi: "your name is".' },
    { id: 12, text: 'Do you know if he ___ (has finished / has he finished) his work?', options: ['has finished', 'has he finished', 'did finish', 'does finish'], correct: 0, explanation: 'Darak gap tartibi: "if he has finished".' },
    { id: 13, text: 'I was wondering why ___ (she was upset / was she upset).', options: ['she was upset', 'was she upset', 'did she be upset', 'is she upset'], correct: 0, explanation: 'O\'tgan zamon darak tartibi: "she was upset".' },
    { id: 14, text: 'Can you tell me where ___ (I can buy / can I buy) a ticket?', options: ['I can buy', 'can I buy', 'do I buy', 'could I buy'], correct: 0, explanation: 'Modal fe\'l egadan keyin keladi: "I can buy".' },
    { id: 15, text: 'I don\'t remember when ___ (we last met / did we last meet).', options: ['we last met', 'did we last meet', 'were we last meet', 'have we last met'], correct: 0, explanation: 'O\'tgan zamon darak tartibi: "we last met".' },
    { id: 16, text: 'Do you know whether she ___ (likes / does like) chocolate?', options: ['likes', 'does like', 'is like', 'liking'], correct: 0, explanation: 'Darak gap tartibi: "whether she likes".' },
    { id: 17, text: 'I\'d like to know what time ___ (the bank opens / does the bank open).', options: ['the bank opens', 'does the bank open', 'is the bank open', 'opens the bank'], correct: 0, explanation: '"does" tushadi: "the bank opens".' },
    { id: 18, text: 'Could you tell me who ___ (is in charge / is in charge of)?', options: ['is in charge', 'does in charge', 'are in charge', 'being in charge'], correct: 0, explanation: 'Ega so\'rovi: "who is in charge".' },
    { id: 19, text: 'I wonder how long ___ (the meeting will last / will the meeting last).', options: ['the meeting will last', 'will the meeting last', 'does the meeting last', 'is the meeting last'], correct: 0, explanation: 'Kelasi zamon darak tartibi: "the meeting will last".' },
    { id: 20, text: 'Do you know why ___ (they decided / did they decide) to move?', options: ['they decided', 'did they decide', 'were they decide', 'have they decide'], correct: 0, explanation: 'O\'tgan zamon darak tartibi: "they decided".' }
  ],
  scrambled: [
    { id: 1, words: ['could', 'you', 'tell', 'me', 'where', 'the', 'station', 'is', '?'], answer: 'could you tell me where the station is', explanation: 'Introductory phrase + where the station is.' },
    { id: 2, words: ['do', 'you', 'know', 'what', 'time', 'it', 'is', '?'], answer: 'do you know what time it is', explanation: 'Introductory phrase + what time it is.' },
    { id: 3, words: ['I', 'wonder', 'if', 'she', 'will', 'come', '.'], answer: 'I wonder if she will come', explanation: 'Statement + if she will come.' },
    { id: 4, words: ['can', 'you', 'remember', 'where', 'you', 'put', 'it', '?'], answer: 'can you remember where you put it', explanation: 'Introductory phrase + where you put it.' },
    { id: 5, words: ['I', 'don\'t', 'know', 'why', 'he', 'left', '.'], answer: 'I don\'t know why he left', explanation: 'Statement + why he left.' },
    { id: 6, words: ['could', 'you', 'show', 'me', 'how', 'to', 'do', 'this', '?'], answer: 'could you show me how to do this', explanation: 'Introductory phrase + how to do this.' },
    { id: 7, words: ['do', 'you', 'know', 'whether', 'he', 'is', 'home', '?'], answer: 'do you know whether he is home', explanation: 'Introductory phrase + whether he is home.' },
    { id: 8, words: ['I\'d', 'like', 'to', 'know', 'how', 'much', 'it', 'costs', '.'], answer: 'I\'d like to know how much it costs', explanation: 'Statement + how much it costs.' },
    { id: 9, words: ['tell', 'me', 'who', 'broke', 'the', 'vase', '.'], answer: 'tell me who broke the vase', explanation: 'Imperative + who broke the vase.' },
    { id: 10, words: ['I', 'wonder', 'where', 'they', 'live', '.'], answer: 'I wonder where they live', explanation: 'Statement + where they live.' },
    { id: 11, words: ['could', 'you', 'tell', 'me', 'your', 'name', '?'], answer: 'could you tell me your name', explanation: 'Polite introductory question.' },
    { id: 12, words: ['do', 'you', 'know', 'if', 'she', 'is', 'ready', '?'], answer: 'do you know if she is ready', explanation: 'Introductory phrase + if she is ready.' },
    { id: 13, words: ['I', 'was', 'wondering', 'why', 'you', 'were', 'late', '.'], answer: 'I was wondering why you were late', explanation: 'Statement + why you were late.' },
    { id: 14, words: ['can', 'you', 'tell', 'me', 'where', 'I', 'can', 'park', '?'], answer: 'can you tell me where I can park', explanation: 'Introductory phrase + where I can park.' },
    { id: 15, words: ['I', 'don\'t', 'remember', 'when', 'it', 'happened', '.'], answer: 'I don\'t remember when it happened', explanation: 'Statement + when it happened.' },
    { id: 16, words: ['do', 'you', 'know', 'whether', 'she', 'likes', 'coffee', '?'], answer: 'do you know whether she likes coffee', explanation: 'Introductory phrase + whether she likes coffee.' },
    { id: 17, words: ['I\'d', 'like', 'to', 'know', 'when', 'it', 'starts', '.'], answer: 'I\'d like to know when it starts', explanation: 'Statement + when it starts.' },
    { id: 18, words: ['could', 'you', 'check', 'who', 'is', 'outside', '?'], answer: 'could you check who is outside', explanation: 'Introductory phrase + who is outside.' },
    { id: 19, words: ['I', 'wonder', 'how', 'long', 'it', 'takes', '.'], answer: 'I wonder how long it takes', explanation: 'Statement + how long it takes.' },
    { id: 20, words: ['do', 'you', 'know', 'why', 'they', 'left', '?'], answer: 'do you know why they left', explanation: 'Introductory phrase + why they left.' }
  ],
  errorCorrection: [
    { id: 1, text: 'Could you tell me where is the bank?', options: ['Could you tell me', 'where is', 'the bank', 'No error'], correct: 1, wrongPart: 'where is', correction: 'where the bank is', explanation: 'Embedded question ichida so\'z tartibi darak gapnikidek bo\'ladi: "where the bank is".' },
    { id: 2, text: 'Do you know what time does the film start?', options: ['Do you know', 'what time', 'does the film start', 'No error'], correct: 2, wrongPart: 'does the film start', correction: 'the film starts', explanation: '"does" yordamchi fe\'li tushib qoladi: "the film starts".' },
    { id: 3, text: 'I wonder is she coming today.', options: ['I wonder', 'is she', 'coming today', 'No error'], correct: 1, wrongPart: 'is she', correction: 'if she is', explanation: 'Yes/No embedded savollarida "if" yoki "whether" bog\'lovchisi ishlatilishi shart.' },
    { id: 4, text: 'Can you remember where did you put your keys?', options: ['Can you remember', 'where did you put', 'your keys', 'No error'], correct: 1, wrongPart: 'where did you put', correction: 'where you put', explanation: '"did" yordamchi fe\'li tushib qoladi: "where you put".' },
    { id: 5, text: 'I don\'t know why was he angry.', options: ['I don\'t know', 'why was he', 'angry', 'No error'], correct: 1, wrongPart: 'why was he', correction: 'why he was', explanation: 'Ega fe\'ldan oldin keladi: "why he was".' },
    { id: 6, text: 'Could you tell me how much does this cost?', options: ['Could you tell me', 'how much', 'does this cost', 'No error'], correct: 2, wrongPart: 'does this cost', correction: 'this costs', explanation: '"does" tushadi va fe\'l -s oladi: "this costs".' },
    { id: 7, text: 'Do you know if does he speak English?', options: ['Do you know', 'if does he', 'speak English', 'No error'], correct: 1, wrongPart: 'if does he', correction: 'if he speaks', explanation: '"does" tushib qoladi: "if he speaks".' },
    { id: 8, text: 'I wonder where are they going.', options: ['I wonder', 'where are they', 'going', 'No error'], correct: 1, wrongPart: 'where are they', correction: 'where they are', explanation: 'Ega to be fe\'lidan oldin turadi: "where they are".' },
    { id: 9, text: 'Tell me who did write this book.', options: ['Tell me', 'who did write', 'this book', 'No error'], correct: 1, wrongPart: 'who did write', correction: 'who wrote', explanation: 'Ega so\'rovi bo\'lgani uchun "did" ishlatilmaydi: "who wrote".' },
    { id: 10, text: 'Can you tell me what time is it?', options: ['Can you tell me', 'what time', 'is it', 'No error'], correct: 2, wrongPart: 'is it', correction: 'it is', explanation: 'Embedded question bo\'lgani uchun "it is" tartibi keladi.' },
    { id: 11, text: 'I\'d like to know where did she go.', options: ['I\'d like to know', 'where did she go', 'No error', 'Check'], correct: 1, wrongPart: 'where did she go', correction: 'where she went', explanation: '"did" tushib fe\'l Past Simple bo\'ladi: "where she went".' },
    { id: 12, text: 'Do you know whether is he home?', options: ['Do you know', 'whether is he', 'home', 'No error'], correct: 1, wrongPart: 'whether is he', correction: 'whether he is', explanation: 'Ega fe\'ldan oldin turadi: "whether he is".' },
    { id: 13, text: 'I was wondering why did you call me.', options: ['I was wondering', 'why did you call', 'me', 'No error'], correct: 1, wrongPart: 'why did you call', correction: 'why you called', explanation: 'Darak tartibi: "why you called".' },
    { id: 14, text: 'Could you explain how can I open this?', options: ['Could you explain', 'how can I', 'open this', 'No error'], correct: 1, wrongPart: 'how can I', correction: 'how I can', explanation: 'Modal fe\'l egadan keyin o\'tadi: "how I can".' },
    { id: 15, text: 'I don\'t remember when did the concert start.', options: ['I don\'t remember', 'when did the concert start', 'No error', 'Check'], correct: 1, wrongPart: 'when did the concert start', correction: 'when the concert started', explanation: 'Darak tartibi: "when the concert started".' },
    { id: 16, text: 'Do you know where is my coat?', options: ['Do you know', 'where is', 'my coat', 'No error'], correct: 1, wrongPart: 'where is', correction: 'where my coat is', explanation: 'Ega fe\'ldan oldin keladi: "where my coat is".' },
    { id: 17, text: 'I wonder how long will the flight take.', options: ['I wonder', 'how long will', 'the flight take', 'No error'], correct: 1, wrongPart: 'how long will', correction: 'how long the flight will take', explanation: 'Kelasi zamon darak tartibi: "how long the flight will take".' },
    { id: 18, text: 'Could you check who did make this mistake?', options: ['Could you check', 'who did make', 'this mistake', 'No error'], correct: 1, wrongPart: 'who did make', correction: 'who made', explanation: 'Ega so\'rovida "did" emas, Past Simple (made) ishlatiladi.' },
    { id: 19, text: 'I\'d like to know what is your address.', options: ['I\'d like to know', 'what is', 'your address', 'No error'], correct: 1, wrongPart: 'what is', correction: 'what your address is', explanation: 'Darak gap tartibi: "what your address is".' },
    { id: 20, text: 'Do you know why are they leaving?', options: ['Do you know', 'why are they', 'leaving', 'No error'], correct: 1, wrongPart: 'why are they', correction: 'why they are', explanation: 'Darak gap tartibi: "why they are leaving".' }
  ],
  transform: [
    { id: 1, text: 'Make an embedded question: "Where is the post office?" → Could you tell me...', options: ['Could you tell me where the post office is?', 'Could you tell me where is the post office?', 'Could you tell me where does the post office be?', 'Could you tell me is where the post office?'], correct: 0, explanation: 'Direct: "Where is..." → Embedded: "Could you tell me where ... is?"' },
    { id: 2, text: 'Make an embedded question: "What time does the lesson start?" → Do you know...', options: ['Do you know what time the lesson starts?', 'Do you know what time does the lesson start?', 'Do you know what time is the lesson start?', 'Do you know when does the lesson start?'], correct: 0, explanation: '"does" tushib qoladi va fe\'l -s oladi.' },
    { id: 3, text: 'Make an embedded question: "Is he at home?" → I wonder...', options: ['I wonder if he is at home.', 'I wonder is he at home.', 'I wonder does he be at home.', 'I wonder if is he at home.'], correct: 0, explanation: 'Yes/No savoliga "if" qo\'shilib darak gap tartibi beriladi.' },
    { id: 4, text: 'Make an embedded question: "Why did she leave?" → I don\'t know...', options: ['I don\'t know why she left.', 'I don\'t know why did she leave.', 'I don\'t know why she did leave.', 'I don\'t know why was she left.'], correct: 0, explanation: '"did" tushadi va fe\'l Past Simple (left) shakliga o\'tadi.' },
    { id: 5, text: 'Make an embedded question: "How much does it cost?" → Can you tell me...', options: ['Can you tell me how much it costs?', 'Can you tell me how much does it cost?', 'Can you tell me how much is it cost?', 'Can you tell me how much costs it?'], correct: 0, explanation: '"does" tushib fe\'l -s oladi: "how much it costs".' },
    { id: 6, text: 'Make an embedded question: "Where did they go?" → I\'d like to know...', options: ['I\'d like to know where they went.', 'I\'d like to know where did they go.', 'I\'d like to know where they go.', 'I\'d like to know where were they go.'], correct: 0, explanation: '"did" tushadi va "went" bo\'ladi.' },
    { id: 7, text: 'Make an embedded question: "Who wrote this letter?" → Do you know...', options: ['Do you know who wrote this letter?', 'Do you know who did write this letter?', 'Do you know who was write this letter?', 'Do you know whom wrote this letter?'], correct: 0, explanation: 'Ega so\'rovi o\'zgarmasdan qoladi: "who wrote this letter".' },
    { id: 8, text: 'Make an embedded question: "What are you doing?" → Tell me...', options: ['Tell me what you are doing.', 'Tell me what are you doing.', 'Tell me what do you do.', 'Tell me what you do.'], correct: 0, explanation: 'Continuous zamonda: "what you are doing".' },
    { id: 9, text: 'Make an embedded question: "Has the train arrived?" → Do you know...', options: ['Do you know if the train has arrived?', 'Do you know has the train arrived?', 'Do you know did the train arrive?', 'Do you know if has the train arrived?'], correct: 0, explanation: 'Yes/No savoli: "if the train has arrived".' },
    { id: 10, text: 'Make an embedded question: "Where can I buy a ticket?" → Could you tell me...', options: ['Could you tell me where I can buy a ticket?', 'Could you tell me where can I buy a ticket?', 'Could you tell me where do I buy a ticket?', 'Could you tell me I can buy where a ticket?'], correct: 0, explanation: 'Modal fe\'l egadan keyin keladi: "where I can buy".' },
    { id: 11, text: 'Make an embedded question: "What is your telephone number?" → May I ask...', options: ['May I ask what your telephone number is?', 'May I ask what is your telephone number?', 'May I ask your telephone number is what?', 'May I ask what does your telephone number be?'], correct: 0, explanation: 'Darak gap tartibi: "what your telephone number is".' },
    { id: 12, text: 'Make an embedded question: "Why is the baby crying?" → I wonder...', options: ['I wonder why the baby is crying.', 'I wonder why is the baby crying.', 'I wonder why does the baby cry.', 'I wonder why the baby cries.'], correct: 0, explanation: 'Continuous gap tartibi: "why the baby is crying".' },
    { id: 13, text: 'Make an embedded question: "Did she receive my message?" → Do you know...', options: ['Do you know if she received my message?', 'Do you know did she receive my message?', 'Do you know if did she receive my message?', 'Do you know whether she receive my message?'], correct: 0, explanation: 'Yes/No savoli Past Simple: "if she received".' },
    { id: 14, text: 'Make an embedded question: "How long will the film last?" → Can you tell me...', options: ['Can you tell me how long the film will last?', 'Can you tell me how long will the film last?', 'Can you tell me how long does the film last?', 'Can you tell me how long the film lasts?'], correct: 0, explanation: 'Kelasi zamon: "how long the film will last".' },
    { id: 15, text: 'Make an embedded question: "When does the library close?" → I\'d like to know...', options: ['I\'d like to know when the library closes.', 'I\'d like to know when does the library close.', 'I\'d like to know when is the library close.', 'I\'d like to know when the library close.'], correct: 0, explanation: '"does" tushadi: "when the library closes".' },
    { id: 16, text: 'Make an embedded question: "Where were you born?" → Could you tell me...', options: ['Could you tell me where you were born?', 'Could you tell me where were you born?', 'Could you tell me where did you born?', 'Could you tell me where you are born?'], correct: 0, explanation: 'Past Simple To Be: "where you were born".' },
    { id: 17, text: 'Make an embedded question: "Who is at the door?" → Do you know...', options: ['Do you know who is at the door?', 'Do you know who at the door is?', 'Do you know is who at the door?', 'Do you know who does be at the door?'], correct: 0, explanation: 'Ega so\'rovi: "who is at the door".' },
    { id: 18, text: 'Make an embedded question: "Why didn\'t they come?" → I wonder...', options: ['I wonder why they didn\'t come.', 'I wonder why didn\'t they come.', 'I wonder why did they not come.', 'I wonder why they don\'t come.'], correct: 0, explanation: 'Inkor darak tartibi: "why they didn\'t come".' },
    { id: 19, text: 'Make an embedded question: "How much water should we drink?" → Can you tell me...', options: ['Can you tell me how much water we should drink?', 'Can you tell me how much water should we drink?', 'Can you tell me how much water do we drink?', 'Can you tell me we should drink how much water?'], correct: 0, explanation: 'Modal egadan keyin keladi: "how much water we should drink".' },
    { id: 20, text: 'Make an embedded question: "Is this the right bus?" → Could you tell me...', options: ['Could you tell me if this is the right bus?', 'Could you tell me is this the right bus?', 'Could you tell me if is this the right bus?', 'Could you tell me does this be the right bus?'], correct: 0, explanation: 'Yes/No savoliga "if": "if this is the right bus".' }
  ],
  dialogue: [
    { id: 1, situation: 'Asking a passerby for directions.', dialogue: 'A: Excuse me, could you tell me where ___?\nB: Yes, it\'s just down this street on your left.', options: ['the nearest pharmacy is', 'is the nearest pharmacy', 'does the nearest pharmacy be', 'is being the nearest pharmacy'], correct: 0, explanation: 'Embedded question bo\'lgani uchun darak so\'z tartibi keladi.' },
    { id: 2, situation: 'Asking about store hours.', dialogue: 'A: Do you know what time ___?\nB: I think it closes at 8 PM.', options: ['the supermarket closes', 'does the supermarket close', 'is the supermarket close', 'closes the supermarket'], correct: 0, explanation: '"does" tushib fe\'l -s oladi.' },
    { id: 3, situation: 'Waiting for a friend.', dialogue: 'A: I wonder if she ___ the invitation.\nB: She told me she was coming!', options: ['received', 'did receive', 'was receive', 'has receive'], correct: 0, explanation: 'Darak gap tartibi: "if she received".' },
    { id: 4, situation: 'Lost item inquiry.', dialogue: 'A: Can you remember where ___ your keys?\nB: Oh, I think I left them in the car!', options: ['you put', 'did you put', 'have you put', 'you putted'], correct: 0, explanation: 'O\'tgan zamon embedded tartibi: "where you put".' },
    { id: 5, situation: 'Discussing a colleague\'s mood.', dialogue: 'A: I don\'t know why ___ so quiet today.\nB: Maybe he has a headache.', options: ['he is', 'is he', 'does he be', 'he does'], correct: 0, explanation: 'Darak gap tartibi: "why he is".' },
    { id: 6, situation: 'Asking for instructions.', dialogue: 'A: Could you show me how ___ this machine?\nB: Sure, press this red button first.', options: ['to operate', 'operate', 'operating', 'do operate'], correct: 0, explanation: '"how to operate" shakli ishlatiladi.' },
    { id: 7, situation: 'Checking flight status.', dialogue: 'A: Do you happen to know whether the flight ___ delayed?\nB: Let me check the arrival board.', options: ['is', 'does', 'be', 'are'], correct: 0, explanation: 'Darak tartibi: "whether the flight is".' },
    { id: 8, situation: 'Shopping for clothes.', dialogue: 'A: I\'d like to know how much ___.\nB: It\'s on sale for $45.', options: ['this jacket costs', 'does this jacket cost', 'costs this jacket', 'is this jacket cost'], correct: 0, explanation: '"does" tushadi: "how much this jacket costs".' },
    { id: 9, situation: 'Inquiring about history.', dialogue: 'A: Do you know who ___ this ancient castle?\nB: It was built in the 14th century.', options: ['built', 'did build', 'was build', 'did built'], correct: 0, explanation: 'Ega so\'rovi: "who built".' },
    { id: 10, situation: 'Wondering about neighborhood.', dialogue: 'A: I wonder where ___ their dog.\nB: Usually in the nearby park.', options: ['they walk', 'do they walk', 'are they walk', 'did they walk'], correct: 0, explanation: 'Darak gap tartibi: "where they walk".' },
    { id: 11, situation: 'Checking the time.', dialogue: 'A: Excuse me, could you tell me what time ___?\nB: It\'s half past three.', options: ['it is', 'is it', 'it does', 'does it be'], correct: 0, explanation: '"what time it is" darak tartibi.' },
    { id: 12, situation: 'Asking about language skills.', dialogue: 'A: Do you know if he ___ German?\nB: Yes, he studied it in Berlin.', options: ['speaks', 'does speak', 'is speak', 'speaking'], correct: 0, explanation: 'Present Simple darak tartibi: "if he speaks".' },
    { id: 13, situation: 'Discussing a late arrival.', dialogue: 'A: I was wondering why ___ late for the meeting.\nB: Traffic was awful on the highway.', options: ['you were', 'were you', 'did you be', 'are you'], correct: 0, explanation: 'O\'tgan zamon darak tartibi: "why you were".' },
    { id: 14, situation: 'Asking about ticket booking.', dialogue: 'A: Can you tell me where I ___ online tickets?\nB: You can visit the official website.', options: ['can book', 'can I book', 'do I book', 'could I book'], correct: 0, explanation: 'Modal egadan keyin: "where I can book".' },
    { id: 15, situation: 'Remembering an event.', dialogue: 'A: I don\'t remember when we ___ last.\nB: It was at Sarah\'s wedding last year!', options: ['met', 'did meet', 'were met', 'have met'], correct: 0, explanation: 'O\'tgan zamon darak tartibi: "when we met".' },
    { id: 16, situation: 'Checking food preference.', dialogue: 'A: Do you know whether she ___ seafood?\nB: Yes, she loves salmon.', options: ['likes', 'does like', 'is like', 'liking'], correct: 0, explanation: 'Darak gap tartibi: "whether she likes".' },
    { id: 17, situation: 'Checking bank hours.', dialogue: 'A: I\'d like to know what time the bank ___.\nB: It opens at 9:00 AM sharp.', options: ['opens', 'does open', 'is open', 'open'], correct: 0, explanation: '"does" tushadi: "when the bank opens".' },
    { id: 18, situation: 'Inquiring about someone outside.', dialogue: 'A: Could you check who ___ knocking on the door?\nB: Sure, I\'ll take a look.', options: ['is', 'does', 'be', 'are'], correct: 0, explanation: 'Ega so\'rovi: "who is knocking".' },
    { id: 19, situation: 'Discussing trip expenses.', dialogue: 'A: I wonder how much money we ___ for the trip.\nB: About $500 should be enough.', options: ['will need', 'will we need', 'do we need', 'are we needing'], correct: 0, explanation: 'Kelasi zamon darak tartibi: "how much money we will need".' },
    { id: 20, situation: 'Discussing a resignation.', dialogue: 'A: Do you know why ___ his job?\nB: He found a better position elsewhere.', options: ['he quit', 'did he quit', 'was he quit', 'does he quit'], correct: 0, explanation: 'O\'tgan zamon darak tartibi: "why he quit".' }
  ]
};

const grammarDataFile = './src/data/grammarData.js';
let content = fs.readFileSync(grammarDataFile, 'utf8');

const targetMarker = "  advanced: {";
const splitIdx = content.indexOf(targetMarker);

if (splitIdx === -1) {
  console.error("Could not find 'advanced: {' marker in grammarData.js");
  process.exit(1);
}

const beforeAdvanced = content.slice(0, splitIdx);
const afterAdvanced = content.slice(splitIdx);

const embStr = JSON.stringify(embeddedQuestionsTopic, null, 2);

function indentLines(str, spaces) {
  const pad = ' '.repeat(spaces);
  return str.split('\n').map(line => pad + line).join('\n');
}

const formattedEmb = indentLines(embStr, 6);

const lastTopicEndIndex = beforeAdvanced.lastIndexOf('      }');

if (lastTopicEndIndex === -1) {
  console.error("Could not find last topic closing tag in intermediate");
  process.exit(1);
}

const newBeforeAdvanced = beforeAdvanced.slice(0, lastTopicEndIndex + 7) + 
  ',\n' + formattedEmb + '\n' +
  beforeAdvanced.slice(lastTopicEndIndex + 7);

fs.writeFileSync(grammarDataFile, newBeforeAdvanced + afterAdvanced, 'utf8');
console.log("Successfully appended Embedded Questions & Sentences to Elementary (intermediate)!");
