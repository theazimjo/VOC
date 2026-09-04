const QUESTION_MAP_RU = {
  '"Men" so\'zini ingliz tilida qanday aytamiz?': 'Как сказать "я" по-английски?',
  'Agar o\'zingiz haqingizda gapirsangiz, qaysi olmoshni ishlatasiz?': 'Какое местоимение вы используете, когда говорите о себе?',
  '"Sen" / "Siz" so\'zini ingliz tilida qanday aytamiz?': 'Как сказать "ты / вы" по-английски?',
  'Suhbatdoshingizga to\'g\'ridan-to\'g\'ri murojaat qilsangiz, qaysi olmoshni ishlatasiz?': 'Какое местоимение вы используете при прямом обращении к собеседнику?',
  '"U" (erkak) so\'zini ingliz tilida qanday aytamiz?': 'Как сказать "он" (мужской род) по-английски?',
  'Tom haqida gapirsangiz (Tom — erkak ism), qaysi olmoshni ishlatasiz?': 'Какое местоимение вы используете для Тома (мужское имя)?',
  '"U" (ayol) so\'zini ingliz tilida qanday aytamiz?': 'Как сказать "она" (женский род) по-английски?',
  'Anna haqida gapirsangiz (Anna — ayol ism), qaysi olmoshni ishlatasiz?': 'Какое местоимение вы используете для Анны (женское имя)?',
  '"U" (narsa/hayvon) so\'zini ingliz tilida qanday aytamiz?': 'Как сказать "оно/он" (предмет/животное) по-английски?',
  'Bir kitob haqida gapirsangiz, qaysi olmoshni ishlatasiz?': 'Какое местоимение вы используете для одной книги?',
  '"Biz" so\'zini ingliz tilida qanday aytamiz?': 'Как сказать "мы" по-английски?',
  'O\'zingiz va sinfdoshlaringiz haqida gapirsangiz, qaysi olmoshni ishlatasiz?': 'Какое местоимение вы используете для себя и одноклассников?',
  '"Ular" so\'zini ingliz tilida qanday aytamiz?': 'Как сказать "они" по-английски?',
  'Tom va Ali haqida gapirsangiz, qaysi olmoshni ishlatasiz?': 'Какое местоимение вы используете для Тома и Али?',
  '"I, you, we, they" bilan fe\'l qanday ko\'rinishda keladi?': 'В какой форме употребляется глагол с "I, you, we, they"?',
  'Takroriylik ravishlari fe\'ldan qayerda keladi?': 'Где ставятся наречия частоты по отношению к глаголу?',
  'Present Continuous da fe\'ldan oldin nima keladi?': 'Что ставится перед глаголом в Present Continuous?',
  'Qaysi fe\'l Present Continuous da ishlatilmaydi?': 'Какой глагол не используется в Present Continuous?',
  'Har kuni takrorlanadigan odat uchun qaysi zamon ishlatiladi?': 'Какое время используется для повторяющихся повседневных действий?',
  'Vaqtinchalik (this week, these days) holatlar uchun qaysi zamon ishlatiladi?': 'Какое время используется для временных ситуаций (this week, these days)?',
  '"Look!" kalit so\'zidan so\'ng qaysi zamon keladi?': 'Какое время используется после ключевого слова "Look!"?',
  '"usually" kalit so\'zi qaysi zamonga xos?': 'Для какого времени характерно ключевое слово "usually"?',
  'Qaysi so\'z doim ko\'plikda ishlatiladi?': 'Какое слово всегда используется во множественном числе?',
  '"scissors" (qaychi) so\'zi qaysi fe\'l bilan keladi?': 'С каким глаголом используется слово "scissors"?',
  'Qaysi so\'z oldidan "a" qo\'yiladi?': 'Перед каким словом ставится "a"?',
  '"an" artikli qaysi so\'z oldidan qo\'yiladi?': 'Перед каким словом ставится артикль "an"?',
  'Yaqiningizda turgan bitta narsani ko\'rsatsangiz, qaysi so\'zni ishlatasiz?': 'Какое слово использовать для указания на близкий предмет (1 шт.)?',
  'Uzoqroqda turgan bitta narsani ko\'rsatsangiz, qaysi so\'zni ishlatasiz?': 'Какое слово использовать для указания на дальний предмет (1 шт.)?',
  'Yaqiningizdagi ko\'p narsalarni ko\'rsatish uchun qaysi so\'z ishlatiladi?': 'Какое слово использовать для указания на несколько близких предметов?',
  'Uzoqdagi ko\'p narsalarni ko\'rsatish uchun qaysi so\'z ishlatiladi?': 'Какое слово использовать для указания на несколько дальних предметов?',
  '"mening" so\'zini ingliz tilida qanday aytamiz?': 'Как сказать "мой / моя" по-английски?',
  'Come with ___! (biz bilan)': 'Come with ___! (с нами)',
  'Stol ustida bitta kompyuter borligini aytish uchun qaysi birini ishlatamiz?': 'Что использовать, чтобы сказать, что на столе лежит один компьютер?',
  'Xonada ikkita deraza borligini aytish uchun qaysi birini ishlatamiz?': 'Что использовать, чтобы сказать, что в комнате два окна?',
};

const OPTION_MAP_RU = {
  'Bosh shaklida (V1)': 'В начальной форме (V1)',
  '-s qo\'shimchasi bilan': 'С окончанием -s',
  '-ing qo\'shimchasi bilan': 'С окончанием -ing',
};

export function formatQuestionText(text, lang = 'uz') {
  if (!text) return text;

  if (lang === 'ru') {
    if (QUESTION_MAP_RU[text]) return QUESTION_MAP_RU[text];

    let formatted = text
      .replace(/^"([^"]+)" \([^)]+\) so'zining ko'plik shakli qaysi\?/i, 'Какова форма множественного числа для слова "$1"?')
      .replace(/^"([^"]+)" \([^)]+\) so'zini ko'plikka aylantiring:/i, 'Образуйте множественное число для слова "$1":')
      .replace(/^"([^"]+)" so'zining ko'plik shakli qaysi\?/i, 'Какова форма множественного числа для слова "$1"?')
      .replace(/^"([^"]+)" so'zining ko'plik shaklini toping:/i, 'Найдите форму множественного числа для слова "$1":')
      .replace(/^"([^"]+)" so'zining ko'pligi qaysi\?/i, 'Какова форма множественного числа для слова "$1"?')
      .replace(/^"([^"]+)" fe'liga -ing qo'shilsa qanday bo'ladi\?/i, 'Как выглядит глагол "$1" с окончанием -ing?')
      .replace(/^"([^"]+)" fe'liga -ing qo'shilganda qanday yoziladi\?/i, 'Как пишется глагол "$1" с окончанием -ing?')
      .replace(/^"([^"]+)" fe'lining -ing shakli:/i, 'Форма глагола "$1" с -ing:')
      .replace(/^"([^"]+)" fe'lining -ing shaklini toping:/i, 'Найдите форму глагола "$1" с -ing:')
      .replace(/Choose the correct sentence:/i, 'Выберите правильное предложение:')
      .replace(/Choose the correct question:/i, 'Выберите правильный вопрос:');

    return formatted;
  }

  return text
    .replace(/Choose the correct sentence:/i, 'To\'g\'ri gapni tanlang:')
    .replace(/Choose the correct question:/i, 'To\'g\'ri savolni tanlang:');
}

export function formatOptionText(text, lang = 'uz') {
  if (!text) return text;
  if (lang === 'ru') {
    if (OPTION_MAP_RU[text]) return OPTION_MAP_RU[text];
  }
  return text;
}
