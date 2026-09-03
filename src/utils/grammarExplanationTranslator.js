/**
 * Helper to translate grammar exercise explanations (both English and Uzbek)
 * into clean, natural Russian when the active guide/system language is Russian ('ru').
 */

const EXACT_MAP_RU = {
  // Common sentence structure formulas
  'Auxiliary + subject + verb + object.': 'Вспомогательный глагол + подлежащее + сказуемое + дополнение.',
  'Subject + verb + object.': 'Подлежащее + сказуемое + дополнение.',
  'Subject + auxiliary + verb + object.': 'Подлежащее + вспомогательный глагол + сказуемое + дополнение.',
  'S-V-O = Subject-Verb-Object — the basic English sentence structure.': 'S-V-O = Подлежащее (Subject) + Глагол (Verb) + Дополнение (Object) — базовая структура английского предложения.',
  'English follows Subject-Verb-Object order: Cats (S) like (V) milk (O).': 'В английском языке порядок слов: Подлежащее (Cats) + Глагол (like) + Дополнение (milk).',

  // Modal verbs Uzbek explanations
  '"must" — kuchli shaxsiy majburiyat.': '"must" — сильное личное обязательство.',
  '"don\'t have to" — majburiy emas, ixtiyoriy.': '"don\'t have to" — необязательно (по желанию).',
  '"don\'t have to" — ixtiyoriy, shart emas.': '"don\'t have to" — необязательно, не требуется.',
  '"have to" — tashqi zaruriyat (parvoz vaqti).': '"have to" — внешняя необходимость (обстоятельства).',

  // Noun clauses Uzbek explanations
  '"wonder" + ha/yo\'q noaniqlik: whether/if ishlatiladi, "that" emas.': 'После "wonder" для выражения сомнений (да/нет) используется "whether/if", а не "that".',
  '"wonder" + ha/yoʻq noaniqlik: whether/if ishlatiladi, "that" emas.': 'После "wonder" для выражения сомнений (да/нет) используется "whether/if", а не "that".',
  'Noun clause ichida toʻgʻri gap tartibi (S+V) ishlatiladi: where she lives.': 'В придаточных предложениях (Noun clause) используется прямой порядок слов (S+V): where she lives.',
  'Joy soʻralanda "where" ishlatiladi.': 'Для указания места используется "where".',
  'Sabab soʻralanda "why" ishlatiladi.': 'Для указания причины используется "why".',
  '"What" — narsa yoki narsalar soʻralanda ishlatiladi.': '"What" используется для указания предмета или действия.',
  'Bilvosita ha/yoʻq savollarda "if" ishlatiladi.': 'В косвенных вопросах (да/нет) используется "if".',
  'Ega vazifasidagi noun clause "That" bilan boshlanadi.': 'Придаточное предложение в роли подлежащего начинается с "That".',
  'Fakt yoki his-tuyg\'u ifodalanda "that" ishlatiladi.': 'Для выражения факта или эмоций используется "that".',
  '"That she passed" — toʻldiruvchi vazifasidagi noun clause.': '"That she passed" — придаточное предложение в роли дополнения.',
  'Usul/yo\'l soʻralanda "how" ishlatiladi.': 'Для указания способа действия используется "how".',
  'Shaxs soʻralanda "who" ishlatiladi.': 'Для указания человека используется "who".',
  'E\'tiqod/fikr ifodalanda "that" ishlatiladi.': 'Для выражения мнения или убеждения используется "that".',
  'Reaktsiya usuli soʻralanda "how" ishlatiladi.': 'Для выражения реакции/способа используется "how".',
  'Predicate nominative vazifasida "that" ishlatiladi.': 'В роли именной части сказуемого используется "that".',
  'Usul/mexanizm tushuntiranda "how" ishlatiladi.': 'Для объяснения способа/механизма используется "how".',
  'Noaniqlik ifodalanda "if/whether" ishlatiladi.': 'Для выражения неопределенности используется "if/whether".',
  'Ikki variant orasida tanlov ifodalanda "whether" ishlatiladi.': 'При выборе между двумя вариантами используется "whether".',
  '"The truth is that..." — predicate nominative vazifasidagi noun clause.': '"The truth is that..." — Noun clause в роли именной части сказуемого.',
  'Fakt ifodalanda "that" ishlatiladi.': 'Для выражения факта используется "that".',
  'Noaniqlik ifodalanda "whether" ishlatiladi.': 'Для выражения сомнения/неопределенности используется "whether".',
  'Ega vazifasidagi noun clause "What" yoki "That" bilan boshlanishi mumkin; bu yerda "What" toʻgʻriroq, lekin "That" ham maʼnoni beradi.': 'Noun clause в роли подлежащего может начинаться с "What" или "That"; здесь "What" точнее, но "That" также подходит.',
  'Nima qilish kerakligini bildiruvchi noun clause: what.': 'Noun clause, указывающий на действие (что делать): what.',
  'Noaniqlik/tashvish ifodalanda "whether" ishlatiladi.': 'Для выражения сомнений/беспокойства используется "whether".',
  'Vaqt soʻralanda "when" ishlatiladi.': 'Для указания времени используется "when".',
  'Ha/yoʻq muammo ifodalanda "whether" ishlatiladi.': 'При вопросе да/нет используется "whether".',
  'Fikr yoki maslahat ifodalanda "that" ishlatiladi.': 'Для выражения мнения или совета используется "that".',
  'Usul/yoʻl koʻrsatishda "how" ishlatiladi.': 'Для демонстрации способа действия используется "how".',
  'E\'tiqod ifodalanda "that" ishlatiladi.': 'Для выражения убеждения используется "that".',
  '"What" — ega vazifasidagi noun clause boshlatadi: "What you decide".': '"What" начинает Noun clause в роли подлежащего: "What you decide".',
  'Fakt xabari: "that" ishlatiladi.': 'Сообщение о факте: используется "that".',
  'Ha/yoʻq noaniqligida "whether" ishlatiladi.': 'При сомнениях (да/нет) используется "whether".',
  'Ega vazifasida noun clause.': 'Придаточное предложение в роли подлежащего.',
  'Kelajak noaniqlik: what + V + S tartibi (nisbiy savol).': 'Будущая неопределенность: порядок слов what + V + S (косвенный вопрос).',
  'Ha/yoʻq bilvosita savollarda "if" yoki "whether" ishlatiladi.': 'В косвенных вопросах (да/нет) используется "if" или "whether".',
  'Noun clause ichida: whether + S + V, savol tartibi emas.': 'Внутри Noun clause: whether + S + V (прямой порядок слов, не вопросительный).',
  'Noun clause ega sifatida kelganda, qoʻshimcha "it" kerak emas.': 'Когда Noun clause выступает в роли подлежащего, местоимение "it" не требуется.',
  'Bilvosita savol: where + S + V tartibi kerak.': 'Косвенный вопрос: требуется порядок слов where + S + V.',
  'Ega noun clause — kesim "was pleased" emas, "pleased" boʻlishi kerak.': 'Подлежащее Noun clause — сказуемое должно быть "pleased", а не "was pleased".',
  'Noun clause: why + S + V tartibi, savol tartibi emas.': 'Noun clause: порядок слов why + S + V (не вопросительный).',
  '"If" va "whether" bir vaqtda ishlatilmaydi — faqat bittasi tanlanadi.': '"If" и "whether" не используются одновременно — выбирается только одно слово.',
  'Modal verb (can) dan keyin base form ishlatiladi: can do.': 'После модального глагола (can) используется начальная форма: can do.',
  '"Who" ega vazifasida kelsa, qoʻshimcha "did" kerak emas: who called.': 'Если "Who" выступает в роли подлежащего, вспомогательный глагол "did" не требуется: who called.',
  '"explain" preposition "to" bilan ishlatiladi: explained to me how.': 'Глагол "explain" используется с предлогом "to": explained to me how.',
  'Bilvosita savol: where + S + V, savol tartibi emas.': 'Косвенный вопрос: where + S + V (не вопросительный порядок).',
  'Fakt ifodalanda "that" ishlatiladi: The fact is that she lied.': 'Для выражения факта используется "that": The fact is that she lied.',
  '"to + infinitive" da base form ishlatiladi: to accept.': 'В конструкции "to + инфинитив" используется начальная форма: to accept.',
  'Ega vazifasidagi noun clause: That + S + V.': 'Noun clause в роли подлежащего: That + S + V.',
  'Ha/yoʻq noaniqlik: whether + S + V.': 'Сомнение (да/нет): whether + S + V.',
  '"Where I put the keys" — toʻldiruvchi vazifasidagi noun clause.': '"Where I put the keys" — придаточное предложение в роли дополнения.',
  'Ega vazifasidagi noun clause: That + S + V + main verb.': 'Noun clause в роли подлежащего: That + S + V + главное сказуемое.',
  'Noaniqlik: "whether" ishlatiladi.': 'Для выражения неопределенности используется "whether".',
  'Usul/yoʻl: "how" ishlatiladi.': 'Для способа действия используется "how".',
  'Fakt ega sifatida: "That" ishlatiladi.': 'Факт в роли подлежащего: используется "That".',
  'Tanlov noaniqligida "whether" ishlatiladi.': 'При неуверенности выбора используется "whether".',
  'Nima soʻralanda "what" ishlatiladi.': 'Для вопроса "что" используется "what".',
  'Ha/yoʻq bilvosita savol: "if" ishlatiladi.': 'Косвенный вопрос (да/нет): используется "if".',
  'Usul: "how" ishlatiladi.': 'Способ действия: используется "how".',
  'Mexanizm/usul: "how" ishlatiladi.': 'Способ/механизм: используется "how".',
  'Noaniqlik/tashvish: "if" yoki "whether" ishlatiladi.': 'Сомнения/беспокойство: используется "if" или "whether".',
  'Qaror/fakt: "that" ishlatiladi.': 'Решение/факт: используется "that".',
  'Tasdiqlash: "that" ishlatiladi.': 'Подтверждение: используется "that".',
  'Sabab: "why" ishlatiladi.': 'Причина: используется "why".',
  'Noun clause ega sifatida birlikda ishlatilsa, kesim ham birlikda boʻladi: was.': 'Если Noun clause выступает в роли подлежащего в ед. ч., сказуемое также ставится в ед. ч.: was.',

  // Grammar Path rules & explanations
  '"I" — bu "men" degan ma\'noni bildiradi. O\'zingiz haqingizda gapirganda ishlatiladi.': '"I" означает "я". Используется, когда вы говорите о себе.',
  '"I" doim "am" bilan birga keladi.': '"I" всегда используется с глаголом "am".',
  '"I" bilan oddiy fe\'l hech qanday qo\'shimchasiz (-s siz) keladi.': 'С местоимением "I" обычный глагол идет без окончания -s.',
  "Inkorda: I + don't. Savolda: Do I ...?": "В отрицании: I + don't. В вопросе: Do I ...?",
  "\"I\" haqida bilganlaringizni birlashtiramiz: I + am / fe'l (-s siz) / don't / Do I?": 'Обобщим всё о "I": I + am / глагол (без -s) / don\'t / Do I?',

  '"You" — "sen" yoki "siz" degan ma\'noni bildiradi. Suhbatdoshingizga murojaat qilganda ishlatiladi.': '"You" означает "ты" или "вы". Используется при обращении к собеседнику.',
  '"You" doim "are" bilan birga keladi.': '"You" всегда используется с глаголом "are".',
  '"You" bilan oddiy fe\'l -s siz keladi.': 'С местоимением "You" обычный глагол идет без окончания -s.',
  "Inkorda: You + don't. Savolda: Do you ...?": "В отрицании: You + don't. В вопросе: Do you ...?",
  "\"You\" haqida bilganlaringizni birlashtiramiz: You + are / fe'l (-s siz) / don't / Do you?": 'Обобщим всё о "You": You + are / глагол (без -s) / don\'t / Do you?',

  '"He" — erkak kishi haqida gapirganda ishlatiladi ("u").': '"He" означает "он" (для мужчин и мальчиков).',
  '"He" doim "is" bilan birga keladi.': '"He" всегда используется с глаголом "is".',
  '"He" bilan fe\'lga -s qo\'shiladi!': 'С местоимением "He" к глаголу добавляется окончание -s!',
  "Inkorda: He + doesn't. Savolda: Does he...? (fe'l -s OLMAYDI!)": "В отрицании: He + doesn't. В вопросе: Does he...? (глагол БЕЗ -s!)",
  "\"He\" haqida bilganlaringizni birlashtiramiz: He + is / fe'l+s / doesn't / Does he?": 'Обобщим всё о "He": He + is / глагол+s / doesn\'t / Does he?',

  '"She" — ayol kishi haqida gapirganda ishlatiladi ("u").': '"She" означает "она" (для женщин и девочек).',
  '"She" doim "is" bilan birga keladi.': '"She" всегда используется с глаголом "is".',
  '"She" bilan fe\'lga -s qo\'shiladi.': 'С местоимением "She" к глаголу добавляется окончание -s.',
  "Inkorda: She + doesn't. Savolda: Does she...?": "В отрицании: She + doesn't. В вопросе: Does she...?",
  "\"She\" haqida bilganlaringizni birlashtiramiz: She + is / fe'l+s / doesn't / Does she?": 'Обобщим всё о "She": She + is / глагол+s / doesn\'t / Does she?',

  '"It" — narsa yoki hayvon haqida gapirganda ishlatiladi ("u").': '"It" используется для предметов и животных ("оно/он/она").',
  '"It" doim "is" bilan birga keladi.': '"It" всегда используется с глаголом "is".',
  '"It" bilan fe\'lga -s qo\'shiladi.': 'С местоимением "It" к глаголу добавляется окончание -s.',
  "Inkorda: It + doesn't. Savolda: Does it...?": "В отрицании: It + doesn't. В вопросе: Does it...?",
  "\"It\" haqida bilganlaringizni birlashtiramiz: It + is / fe'l+s / doesn't / Does it?": 'Обобщим всё о "It": It + is / глагол+s / doesn\'t / Does it?',

  '"We" — o\'zingiz va boshqalar haqida birga gapirganda ishlatiladi ("biz").': '"We" означает "мы" (вы и другие люди вместе).',
  '"We" doim "are" bilan birga keladi.': '"We" всегда используется с глаголом "are".',
  '"We" bilan oddiy fe\'l -s siz keladi.': 'С местоимением "We" обычный глагол идет без окончания -s.',
  "Inkorda: We + don't. Savolda: Do we ...?": "В отрицании: We + don't. В вопросе: Do we ...?",
  "\"We\" haqida bilganlaringizni birlashtiramiz: We + are / fe'l (-s siz) / don't / Do we?": 'Обобщим всё о "We": We + are / глагол (без -s) / don\'t / Do we?',

  '"They" — ikkitadan ortiq kishi/narsa haqida (o\'zingiz ular ichida bo\'lmasangiz) gapirganda ishlatiladi ("ular").': '"They" означает "они" (для двух и более людей или предметов).',
  '"They" doim "are" bilan birga keladi.': '"They" всегда используется с глаголом "are".',
  '"They" bilan oddiy fe\'l -s siz keladi.': 'С местоимением "They" обычный глагол идет без окончания -s.',
  "Inkorda: They + don't. Savolda: Do they ...?": "В отрицании: They + don't. В вопросе: Do they ...?",
  "\"They\" haqida bilganlaringizni birlashtiramiz: They + are / fe'l (-s siz) / don't / Do they?": 'Обобщим всё о "They": They + are / глагол (без -s) / don\'t / Do they?',

  // Exercise Explanations
  '"Men" = I.': '"Я" = I.',
  'O\'zingiz haqingizda gapirganda "I" ishlatiladi.': 'Когда говорите о себе, используется "I".',
  '"I" faqat "am" bilan keladi.': '"I" используется только с "am".',
  '"am" faqat "I" bilan ishlatiladi.': '"am" используется только с "I".',
  '"I" bilan fe\'lga -s qo\'shilmaydi: like.': 'С местоимением "I" к глаголу не добавляется -s: like.',
  '"I" + like (qo\'shimchasiz).': '"I" + like (без окончания).',
  '"I" inkorida: do not (don\'t).': 'В отрицании с "I": do not (don\'t).',
  '"I" savolida: Do I...?': 'В вопросе с "I": Do I...?',
  '"I" + am.': '"I" + am.',
  '"I" inkorida: don\'t.': 'В отрицании с "I": don\'t.',

  '"Sen/Siz" = You.': '"Ты/Вы" = You.',
  'Suhbatdoshga murojaatda "You" ishlatiladi.': 'При обращении к собеседнику используется "You".',
  '"You" + are.': '"You" + are.',
  '"are" — "You" bilan mos keladi.': '"are" сочетается с "You".',
  '"You" bilan fe\'lga -s qo\'shilmaydi.': 'С местоимением "You" к глаголу не добавляется -s.',
  '"You" + like (qo\'shimchasiz).': '"You" + like (без окончания).',
  '"You" inkorida: do not (don\'t).': 'В отрицании с "You": do not (don\'t).',
  '"You" savolida: Do you...?': 'В вопросе с "You": Do you...?',
  '"You" inkorida: don\'t.': 'В отрицании с "You": don\'t.',

  'Erkak kishi uchun: He.': 'Для мужчин: He.',
  'Tom — erkak ism, shuning uchun He.': 'Том — мужское имя, поэтому He.',
  '"He" + is.': '"He" + is.',
  '"is" — "He" bilan mos keladi.': '"is" сочетается с "He".',
  '"He/She/It" bilan fe\'lga -s qo\'shiladi.': 'С местоимениями He/She/It к глаголу добавляется -s.',
  '"He" + likes (-s bilan).': '"He" + likes (с окончанием -s).',
  '"He" inkorida: doesn\'t.': 'В отрицании с "He": doesn\'t.',
  '"He" savolida: Does he...?': 'В вопросе с "He": Does he...?',
  '"doesn\'t" dan keyin fe\'l -s olmaydi: like.': 'После "doesn\'t" глагол не принимает -s: like.',

  'Ayol kishi uchun: She.': 'Для женщин: She.',
  'Anna — ayol ism, shuning uchun She.': 'Анна — женское имя, поэтому She.',
  '"She" + is.': '"She" + is.',
  '"is" — "She" bilan mos keladi.': '"is" сочетается с "She".',
  '"She" bilan fe\'lga -s qo\'shiladi.': 'С местоимением "She" к глаголу добавляется -s.',
  '"She" + likes (-s bilan).': '"She" + likes (с окончанием -s).',
  '"She" inkorida: doesn\'t.': 'В отрицании с "She": doesn\'t.',
  '"She" savolida: Does she...?': 'В вопросе с "She": Does she...?',

  'Narsa/hayvon uchun: It.': 'Для предметов/животных: It.',
  'Kitob — jonsiz narsa, shuning uchun It.': 'Книга — неодушевленный предмет, поэтому It.',
  '"It" + is.': '"It" + is.',
  '"is" — "It" bilan mos keladi.': '"is" сочетается с "It".',
  '"It" bilan fe\'lga -s qo\'shiladi.': 'С местоимением "It" к глаголу добавляется -s.',
  '"It" + barks (-s bilan).': '"It" + barks (с окончанием -s).',
  '"It" inkorida: doesn\'t.': 'В отрицании с "It": doesn\'t.',
  '"It" savolida: Does it...?': 'В вопросе с "It": Does it...?',
  '"doesn\'t" dan keyin fe\'l -s olmaydi: work.': 'После "doesn\'t" глагол не принимает -s: work.',

  '"Biz" = We.': '"Мы" = We.',
  'O\'zingiz shu guruh ichida bo\'lsangiz: We.': 'Если вы находитесь в этой группе: We.',
  '"We" + are.': '"We" + are.',
  '"are" — "We" bilan mos keladi.': '"are" сочетается с "We".',
  '"We" bilan fe\'lga -s qo\'shilmaydi.': 'С местоимением "We" к глаголу не добавляется -s.',
  '"We" + like (qo\'shimchasiz).': '"We" + like (без окончания).',
  '"We" inkorida: do not (don\'t).': 'В отрицании с "We": do not (don\'t).',
  '"We" savolida: Do we...?': 'В вопросе с "We": Do we...?',
  '"We" inkorida: don\'t.': 'В отрицании с "We": don\'t.',

  '"Ular" = They.': '"Они" = They.',
  'Ikkalasi ham siz emassiz: They.': 'Оба человека не вы: They.',
  '"They" + are.': '"They" + are.',
  '"are" — "They" bilan mos keladi.': '"are" сочетается с "They".',
  '"They" bilan fe\'lga -s qo\'shilmaydi.': 'С местоимением "They" к глаголу не добавляется -s.',
  '"They" + like (qo\'shimchasiz).': '"They" + like (без окончания).',
  '"They" inkorida: do not (don\'t).': 'В отрицании с "They": do not (don\'t).',
  '"They" savolida: Do they...?': 'В вопросе с "They": Do they...?',
  '"They" inkorida: don\'t.': 'В отрицании с "They": don\'t.',
};

export function getFormattedExplanation(explanation, lang = 'uz') {
  if (!explanation) return '';
  if (lang !== 'ru') return explanation;

  // 1. Check exact match
  if (EXACT_MAP_RU[explanation]) {
    return EXACT_MAP_RU[explanation];
  }

  let text = explanation;

  // 2. Pattern replacements for Uzbek explanations
  text = text
    .replace(/^"wonder" \+ ha\/yo[ʻ']q noaniqlik:\s*whether\/if ishlatiladi,\s*"that" emas\./gi, 'После "wonder" для выражения сомнений (да/нет) используется "whether/if", а не "that".')
    .replace(/Noun clause ichida to[ʻ']gri gap tartibi \(S\+V\) ishlatiladi:\s*(.*)/gi, 'В придаточных предложениях (Noun clause) используется прямой порядок слов (S+V): $1')
    .replace(/Bilvosita ha\/yo[ʻ']q savollarda "(.*?)" ishlatiladi\./gi, 'В косвенных вопросах (да/нет) используется "$1".')
    .replace(/Ha\/yo[ʻ']q bilvosita savollarda "(.*?)" yoki "(.*?)" ishlatiladi\./gi, 'В косвенных вопросах (да/нет) используется "$1" или "$2".')
    .replace(/Ha\/yo[ʻ']q noaniqligida "(.*?)" ishlatiladi\./gi, 'При неуверенности (да/нет) используется "$1".')
    .replace(/Noaniqlik ifodalanda "(.*?)" ishlatiladi\./gi, 'Для выражения неуверенности используется "$1".')
    .replace(/Joy so[ʻ']ralanda "(.*?)" ishlatiladi\./gi, 'При указании места используется "$1".')
    .replace(/Sabab so[ʻ']ralanda "(.*?)" ishlatiladi\./gi, 'Для указания причины используется "$1".')
    .replace(/Vaqt so[ʻ']ralanda "(.*?)" ishlatiladi\./gi, 'Для указания времени используется "$1".')
    .replace(/Shaxs so[ʻ']ralanda "(.*?)" ishlatiladi\./gi, 'При указании человека используется "$1".')
    .replace(/Usul\/yo[ʻ']l so[ʻ']ralanda "(.*?)" ishlatiladi\./gi, 'Для указания способа действия используется "$1".')
    .replace(/Fakt yoki his-tuyg'u ifodalanda "(.*?)" ishlatiladi\./gi, 'Для выражения факта или эмоции используется "$1".')
    .replace(/Fakt ifodalanda "(.*?)" ishlatiladi\./gi, 'Для выражения факта используется "$1".')
    .replace(/E'tiqod\/fikr ifodalanda "(.*?)" ishlatiladi\./gi, 'Для выражения мнения/убеждения используется "$1".')
    .replace(/Ikki variant orasida tanlov ifodalanda "(.*?)" ishlatiladi\./gi, 'При выборе между двумя вариантами используется "$1".')
    .replace(/Ega vazifasidagi noun clause "(.*?)" bilan boshlanadi\./gi, 'Придаточное подлежащее (Noun clause) начинается с "$1".')
    .replace(/to[ʻ']ldiruvchi vazifasidagi noun clause/gi, 'придаточное предложение в роли дополнения')
    .replace(/Ega vazifasida noun clause/gi, 'Придаточное предложение в роли подлежащего')
    .replace(/Ega vazifasidagi noun clause/gi, 'Noun clause в роли подлежащего')
    .replace(/Bilvosita savol:\s*(.*)/gi, 'Косвенный вопрос: $1');

  // 3. Pattern replacements for English explanations
  text = text
    .replace(/^No error\s*—\s*/i, 'Ошибки нет — ')
    .replace(/Third person singular \(she\/he\/it\) takes -s or -es in Simple Present\./gi, 'Для 3-го лица ед. ч. (he/she/it) в Present Simple добавляется -s/-es.')
    .replace(/Singular subject "(.*?)" takes "(.*?)"/gi, 'Подлежащее в ед. ч. "$1" требует "$2"')
    .replace(/Plural subject "(.*?)" does not take -s in Simple Present\./gi, 'Подлежащее во мн. ч. "$1" не принимает -s в Present Simple.')
    .replace(/Plural subject "(.*?)" takes "(.*?)"/gi, 'Подлежащее во мн. ч. "$1" требует "$2"')
    .replace(/Use "(.*?)" with she\/he\/it, and the base form of the verb \(no -s\)\./gi, 'Используйте "$1" с she/he/it и начальной формой глагола (без -s).')
    .replace(/After "(.*?)", use the base form of the verb \(no -s, no -ing\)\./gi, 'После "$1" используется начальная форма глагола (без -s, без -ing).')
    .replace(/After "(.*?)", use the base form of the verb/gi, 'После "$1" используется начальная форма глагола')
    .replace(/Present Continuous is used for actions happening right now\./gi, 'Present Continuous используется для действий, происходящих прямо сейчас.')
    .replace(/Use who for people\./gi, 'Используйте "who" для людей.')
    .replace(/Use which for things\./gi, 'Используйте "which" для предметов.')
    .replace(/Use where for places\./gi, 'Используйте "where" для мест.')
    .replace(/Use whose for possession\./gi, 'Используйте "whose" для выражения принадлежности.')
    .replace(/First Conditional main clause:\s*/gi, 'Главная часть First Conditional: ')
    .replace(/Second Conditional main clause:\s*/gi, 'Главная часть Second Conditional: ')
    .replace(/Future Perfect:\s*/gi, 'Future Perfect: ')
    .replace(/Future Perfect Continuous:\s*/gi, 'Future Perfect Continuous: ')
    .replace(/Past Perfect:\s*/gi, 'Past Perfect: ')
    .replace(/Present Perfect with\s*/gi, 'Present Perfect с ')
    .replace(/Repeated past action:\s*/gi, 'Повторяющееся действие в прошлом: ')
    .replace(/Auxiliary \+ subject \+ verb \+ object/gi, 'Вспомогательный глагол + подлежащее + сказуемое + дополнение')
    .replace(/Subject \+ verb \+ object/gi, 'Подлежащее + сказуемое + дополнение')
    .replace(/Subject \+ is\/are\/am \+ verb-ing/gi, 'Подлежащее + am/is/are + глагол-ing')
    .replace(/Subject \+ will \+ verb/gi, 'Подлежащее + will + глагол')
    .replace(/Subject \+ had \+ V3/gi, 'Подлежащее + had + V3')
    .replace(/Subject \+ have\/has \+ V3/gi, 'Подлежащее + have/has + V3');

  // 4. Words & terms replacements
  text = text
    .replace(/ishlatiladi/gi, 'используется')
    .replace(/ishlatilmaydi/gi, 'не используется')
    .replace(/o[ʻ']rniga/gi, 'вместо')
    .replace(/emas\./gi, 'а не.')
    .replace(/emas,/gi, 'а не,')
    .replace(/emas\b/gi, 'а не')
    .replace(/kerak\./gi, 'требуется.')
    .replace(/kerak\b/gi, 'требуется')
    .replace(/ha\/yo[ʻ']q/gi, 'да/нет')
    .replace(/noaniqlik/gi, 'сомнение/неопределенность')
    .replace(/savol tartibi emas/gi, 'не вопросительный порядок слов')
    .replace(/kuchli shaxsiy majburiyat/gi, 'сильное личное обязательство')
    .replace(/majburiy emas, ixtiyoriy/gi, 'необязательно (по желанию)')
    .replace(/ixtiyoriy, shart emas/gi, 'необязательно, не требуется')
    .replace(/tashqi zaruriyat/gi, 'внешняя необходимость')
    .replace(/sababni bildiradi/gi, 'указывает на причину')
    .replace(/ma'lum vaqtga qadar/gi, 'до определенного момента')
    .replace(/tugallangan/gi, 'завершенное')
    .replace(/\bSubject\b/g, 'Подлежащее')
    .replace(/\bVerb\b/g, 'Глагол')
    .replace(/\bAuxiliary\b/g, 'Вспомогательный глагол')
    .replace(/\bObject\b/g, 'Дополнение')
    .replace(/\bbase form\b/gi, 'начальная форма')
    .replace(/\bsingular\b/gi, 'единственное число')
    .replace(/\bplural\b/gi, 'множественное число')
    .replace(/\bis used for\b/gi, 'используется для')
    .replace(/\bis used with\b/gi, 'используется с')
    .replace(/\bare used with\b/gi, 'используются с')
    .replace(/\brefers to\b/gi, 'относится к')
    .replace(/\bexpresses\b/gi, 'выражает');

  return text;
}
