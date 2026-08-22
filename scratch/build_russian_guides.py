import json
import re

# We will define precise, rich Russian translations matching the 4-section structure of each Uzbek guide

russian_guides = {}

# 1. sentence-structure
russian_guides['sentence-structure'] = """## Normal Sentence Structure (Обычная структура предложения)

В английском языке порядок слов **строгий**: Подлежащее (Subject) + Глагол (Verb) + Дополнение (Object). В отличие от русского языка, где слова можно свободно менять местами, в английском порядок слов почти всегда один и тот же!

## 1. Основная формула: S + V + O
• **POSITIVE (+)**: Subject + Verb + Object
  - **She reads** books. *(Она читает книги.)*
  - **They play** football. *(Они играют в футбол.)*
  - **He eats** an apple. *(Он ест яблоко.)*

*(Порядок слов нельзя менять местами — предложение вроде "Reads she books" считается в английском ошибкой)*

## 2. Схема утвердительных, отрицательных и вопросительных предложений
• **POSITIVE (+)**: Subject + Verb (+ -s/-es) + Object
  - Tom **drinks** coffee every morning. *(Том пьет кофе каждое утро.)*
• **NEGATIVE (-)**: Subject + do/does + not + base verb + Object
  - I **do not (don't) like** fish. *(Я не люблю рыбу.)*
  - She **does not (doesn't) eat** meat. *(Она не ест мясо.)*
  - They **don't watch** TV. *(Они не смотрят телевизор.)*
• **QUESTION (?)**: Do/Does + Subject + base verb + Object?
  - **Do** you **like** pizza? *(Ты любишь пиццу?)*
  - **Does** she **speak** English? *(Она говорит по-английски?)*

*(Вспомогательный глагол does берет на себя окончание -s, поэтому основной глагол остается в начальной форме)*

## 3. Важные правила
1. **Место подлежащего**: всегда на первом месте в предложении.
2. **Согласование глагола**: для he/she/it (3-е лицо ед. ч.) в настоящем времени к глаголу добавляется **-s/-es**.
3. **Место дополнения**: всегда следует сразу после глагола.
4. **Обстоятельства времени и места**: обычно ставятся в самом конце предложения.

## 4. Дополнительные примеры
  - I **go** to school every day. *(Я хожу в школу каждый день.)*
  - My sister **studies** medicine. *(Моя сестра изучает медицину.)*
  - We **play** tennis on Sundays. *(Мы играем в теннис по воскресеньям.)*
  - The children **play** in the garden. *(Дети играют в саду.)*"""

# 2. pronouns
russian_guides['pronouns'] = """## Pronouns (Местоимения)

Местоимение — это слово, которое употребляется вместо существительного, чтобы избежать повторяющихся слов.

## 1. Виды местоимений
1. **Личные местоимения** (Personal Pronouns): I, you, he, she, it, we, they
2. **Притяжательные местоимения** (Possessive Pronouns): mine, yours, his, hers, its, ours, theirs
3. **Объектные местоимения** (Object Pronouns): me, you, him, her, it, us, them
4. **Возвратные местоимения** (Reflexive Pronouns): myself, yourself, himself, herself, itself, ourselves, themselves

## 2. Личные местоимения
• **I**: 1-е лицо, ед. ч. *(Я)*
• **You**: 2-е лицо, ед./мн. ч. *(Ты / Вы)*
• **He**: 3-е лицо, ед. ч., мужской род *(Он)*
• **She**: 3-е лицо, ед. ч., женский род *(Она)*
• **It**: 3-е лицо, ед. ч., неодушевленное / животные *(Оно / Он / Она)*
• **We**: 1-е лицо, мн. ч. *(Мы)*
• **They**: 3-е лицо, мн. ч. *(Они)*

## 3. Правильное использование местоимений
Местоимение должно соответствовать роду и числу существительного:
  - My brother is a doctor. **He** works at a hospital. *(Брат ➔ He)*
  - My sister is a student. **She** studies English. *(Сестра ➔ She)*
  - The book is on the table. **It** is interesting. *(Книга ➔ It)*
  - My parents live in Tashkent. **They** are teachers. *(Родители ➔ They)*

## 4. Важные правила
1. **Избежание повторов**: местоимения заменяют ранее упомянутые существительные.
2. **Род и число**: выбирайте местоимение строго по роду и числу объекта.
3. **Правило "It"**: для предметов и животных используется "It" (если пол не важен)."""

# 3. personal-pronouns
russian_guides['personal-pronouns'] = """## Personal Pronouns (Личные местоимения)

Личные местоимения выполняют функцию подлежащего в предложении.

## 1. Единственное число (Singular)
• **I**: я (1-е лицо)
• **You**: ты/вы (2-е лицо)
• **He**: он — мужской род (3-е лицо)
• **She**: она — женский род (3-е лицо)
• **It**: оно — предмет/животное (3-е лицо)

## 2. Множественное число (Plural)
• **We**: мы (1-е лицо)
• **You**: вы (2-е лицо)
• **They**: они (3-е лицо)

## 3. Согласование с глаголами
• **Глагол to be**: I **am**, You **are**, He/She/It **is**, We/You/They **are**
  - **I am** a student. **She is** a teacher. **They are** friends.
• **Обычные глаголы**: для He/She/It добавляется **-s/-es**, для остальных не меняется
  - I **go**, You **go**, He **goes**, We **go**, They **go**.

## 4. Важные правила
1. **Местоимение "I"**: всегда пишется с заглавной буквы!
2. **Форма "You"**: одинакова для единственного и множественного числа.
3. **Выбор рода**: "He" — мужчина, "She" — женщина, "It" — предмет или животное.
4. **Окончание глагола**: в 3-м лице единственного числа в Present Simple добавляется -s/-es."""

# 4. object-pronouns
russian_guides['object-pronouns'] = """## Object Pronouns (Объектные местоимения)

Объектные местоимения стоят после глагола или предлога и указывают на объект, на который направлено действие (кого? кому? кем? о ком?).

## 1. Личное местоимение ➔ Объектное местоимение
• **I**: me *(меня, мне)*
• **You**: you *(тебя, тебе, вас, вам)*
• **He**: him *(его, ему)*
• **She**: her *(ее, ей)*
• **It**: it *(его, ему, ее)*
• **We**: us *(нас, нам)*
• **They**: them *(их, им)*

## 2. Употребление
Объектные местоимения стоят в следующих позициях:
1. **После глагола**: в качестве прямого или косвенного дополнения
   - She loves **her**. She knows **them**.
2. **После предлогов** (to, for, with, about, between):
   - Give it **to me**. Talk **to him**.

## 3. Примеры
  - She loves **him**. *(Она любит его.)*
  - Tell **me** the truth. *(Скажи мне правду.)*
  - I called **them** yesterday. *(Я позвонил им вчера.)*
  - Give it to **us**. *(Дай это нам.)*
  - He helped **her**. *(Он помог ей.)*

## 4. Распространенные ошибки
*(Личные местоимения (I, they) НЕЛЬЗЯ использовать на месте дополнения — вместо них нужны me, them)*
  - ❌ She loves I. ➔ ✅ She loves **me**.
  - ❌ Tell I the truth. ➔ ✅ Tell **me** the truth.
  - ❌ Give it to they. ➔ ✅ Give it to **them**."""

# 5. possessive-pronouns
russian_guides['possessive-pronouns'] = """## Possessive Pronouns (Притяжательные местоимения)

Притяжательные местоимения указывают на принадлежность предмета и употребляются вместо существительного.

## 1. Таблица притяжательных местоимений
• **I**: mine *(мой, моя, мое, мои)*
• **You**: yours *(твой, ваш)*
• **He**: his *(его)*
• **She**: hers *(ее)*
• **It**: its *(его, ее — для неодушевленных)*
• **We**: ours *(наш)*
• **They**: theirs *(их)*

## 2. Отличие от притяжательных прилагательных
• **Притяжательное прилагательное** (стоит ПЕРЕД существительным): my/your/his/her/its/our/their + Noun
  - This is **my** book. *(Это моя книга.)*
• **Притяжательное местоимение** (стоит САМО ПО СЕБЕ, заменяя существительное): mine/yours/his/hers/ours/theirs
  - This book is **mine**. *(Эта книга — моя.)*
  - That car is **his**. *(Та машина — его.)*
  - These shoes are **hers**. *(Эти туфли — ее.)*

## 3. Примеры
  - Is this your pen? No, it's not **mine**. It's **hers**. *(Это твоя ручка? Нет, не моя. Ее.)*
  - That house is **ours**. *(Тот дом — наш.)*
  - Are these keys **yours** or **theirs**? *(Эти ключи твои или их?)*
  - The red bag is **mine**, and the blue one is **yours**. *(Красная сумка — моя, а синяя — твоя.)*

## 4. Важное правило
*(Притяжательные местоимения никогда не пишутся с апострофом)*
  - ❌ it's *(это сокращение от "it is")* ➔ ✅ **its** *(это притяжательное прилагательное)*"""

# 6. reflexive-pronouns
russian_guides['reflexive-pronouns'] = """## Reflexive Pronouns (Возвратные местоимения)

Возвратные местоимения используются, когда действие субъекта направлено на него самого (себя / сам).

## 1. Формы возвратных местоимений
• **I**: myself *(я сам / себя)*
• **You (ед.ч.)**: yourself *(ты сам / себя)*
• **He**: himself *(он сам / себя)*
• **She**: herself *(она сама / себя)*
• **It**: itself *(оно само / себя)*
• **We**: ourselves *(мы сами / себя)*
• **You (мн.ч.)**: yourselves *(вы сами / себя)*
• **They**: themselves *(они сами / себя)*

## 2. Случаи использования
1. **Когда субъект и объект — одно лицо**:
   - He cut **himself**. *(Он порезался.)*
   - She looked at **herself** in the mirror. *(Она посмотрела на себя в зеркало.)*
2. **Для усиления (значение «сам», «самостоятельно»)**:
   - I fixed the car **myself**. *(Я сам починил машину.)*
   - They built the house **themselves**. *(Они сами построили дом.)*
3. **Выражение "by + reflexive pronoun" (в одиночку, без помощи)**:
   - I live **by myself**. *(Я живу один.)*
   - She travelled **by herself**. *(Она путешествовала одна.)*

## 3. Примеры
  - Be careful, don't hurt **yourself**. *(Будь осторожен, не поранься.)*
  - The cat cleaned **itself**. *(Кошка умылась.)*
  - We enjoyed **ourselves** at the party. *(Мы отлично провели время на вечеринке.)*"""

# 7. plurals
russian_guides['plurals'] = """## Plurals (Множественное число существительных)

Множественное число большинства существительных образуется путем добавления окончания **-s**, **-es** или **-ies**.

## 1. Основные правила образования
• **Базовое правило**: добавляем **-s** к большинству слов
  - book ➔ book**s**
  - cat ➔ cat**s**
  - house ➔ house**s**

• **Окончание -es**: если слово оканчивается на **-s, -ss, -sh, -ch, -x, -z, -o**
  - bus ➔ bus**es**
  - watch ➔ watch**es**
  - box ➔ box**es**
  - tomato ➔ tomato**es**

• **Окончание -ies**: если слово оканчивается на **согласную + y** (y меняется на i + es)
  - baby ➔ bab**ies**
  - city ➔ cit**ies**
  - *(Но если гласная + y: boy ➔ boys, day ➔ days)*

• **Окончание -ves**: если слово оканчивается на **-f** или **-fe**
  - leaf ➔ lea**ves**
  - knife ➔ kni**ves**
  - wife ➔ wi**ves**

## 2. Исключения (Обязательно запомнить!)
| Единственное число | Множественное число | Перевод |
|---|---|---|
| man | **men** | мужчины |
| woman | **women** | женщины |
| child | **children** | дети |
| person | **people** | люди |
| foot | **feet** | ступни |
| tooth | **teeth** | зубы |
| mouse | **mice** | мыши |
| sheep / fish / deer | **sheep / fish / deer** | овцы / рыбы / олени |"""

# 8. always-plurals
russian_guides['always-plurals'] = """## Always Plurals (Существительные только во множественном числе)

Некоторые существительные в английском языке употребляются **только во множественном числе** и требуют глагола во множественном числе (**are / have / do**).

## 1. Категории таких слов
• **Парные предметы и одежда**:
  - **pants / trousers** *(брюки, штаны)*
  - **jeans** *(джинсы)*
  - **shorts** *(шорты)*
  - **pajamas** *(пижама)*
• **Инструменты и приборы**:
  - **glasses** *(очки)*
  - **scissors** *(ножницы)*
  - **binoculars** *(бинокль)*

## 2. Грамматические правила
1. С этими словами ВСЕГДА используется глагол во множественном числе:
   - ✅ My jeans **are** new. *(Мои джинсы новые.)*
   - ❌ My jeans is new.
   - ✅ These scissors **are** sharp. *(Эти ножницы острые.)*
2. Чтобы подсчитать количество таких предметов, используется фраза **a pair of / pairs of**:
   - **a pair of** jeans *(одни джинсы)*
   - **two pairs of** glasses *(двое очков)*
   - **three pairs of** scissors *(трое ножниц)*"""

# 9. countable-uncountable
russian_guides['countable-uncountable'] = """## Countable & Uncountable Nouns (Исчисляемые и неисчисляемые существительные)

Все существительные делятся на **исчисляемые** (можно посчитать штуками) и **неисчисляемые** (посчитать нельзя).

## 1. Различия
• **Countable (Исчисляемые)**: Имеют форму единственного и множественного числа (apple ➔ apples). Используются с артиклем a/an!
• **Uncountable (Неисчисляемые)**: Имеют форму **ТОЛЬКО единственного числа**! Не используются с артиклем a/an!

## 2. Категории неисчисляемых существительных
1. **Жидкости и продукты**: water, milk, coffee, tea, rice, sugar, bread, cheese, butter
2. **Материалы и вещества**: wood, gold, paper, air, money
3. **Абстрактные понятия и информация**: information, advice, news, knowledge, time, music, work

## 3. Указатели количества (Much, Many, Some, Any)
| Слово | Тип существительного | Пример |
|---|---|---|
| **Many** *(много)* | Countable (мн.ч.) | **many** books |
| **Much** *(много)* | Uncountable | **much** water |
| **A lot of** *(много)* | Countable & Uncountable | **a lot of** books / water |
| **Some** *(немного/несколько)* | Утвердительные предложения | I have **some** milk. |
| **Any** *(сколько-нибудь)* | Отрицания и вопросы | I don't have **any** money. |"""

# 10. degrees-adjectives
russian_guides['degrees-adjectives'] = """## Degrees of Adjectives (Степени сравнения прилагательных)

Качественные прилагательные имеют 3 формы: **Положительная** (cold), **Сравнительная** (colder) и **Превосходная** (the coldest).

## 1. Односложные и некоторые двусложные прилагательные
Добавляем **-er** для сравнения и **the -est** для превосходной степени:
• cold ➔ cold**er** ➔ the cold**est** *(холодный — холоднее — самый холодный)*
• fast ➔ fast**er** ➔ the fast**est** *(быстрый — быстрее — самый быстрый)*

## 2. Правила правописания
• Если оканчивается на **-e**: late ➔ lat**er** ➔ the lat**est**
• Если **согласная + гласная + согласная**: big ➔ bi**gger** ➔ the bi**ggest**
• Если оканчивается на **-y**: happy ➔ happ**ier** ➔ the happ**iest**

## 3. Сравнение с союзом "than"
Когда мы сравниваем два объекта, используется союз **than** *(чем)*:
  - My car is fast**er than** yours. *(Моя машина быстрее, чем твоя.)*
  - Today is hot**ter than** yesterday. *(Сегодня жарче, чем вчера.)*"""

# 11. irregular-adjectives
russian_guides['irregular-adjectives'] = """## Irregular Adjectives (Исключения среди прилагательных)

Некоторые прилагательные образуют степени сравнения не по общим правилам. Их формы необходимо запомнить!

## 1. Таблица главных исключений
| Прилагательное | Сравнительная степень (чем...) | Превосходная степень (Самый...) |
|---|---|---|
| **good** *(хороший)* | **better** *(лучше)* | **the best** *(самый лучший)* |
| **bad** *(плохой)* | **worse** *(хуже)* | **the worst** *(самый худший)* |
| **far** *(далекий)* | **farther / further** *(дальше)* | **the farthest / furthest** *(самый дальний)* |
| **little** *(маленький/мало)* | **less** *(меньше)* | **the least** *(наименьший)* |
| **many / much** *(много)* | **more** *(больше)* | **the most** *(больше всего)* |

## 2. Примеры в предложениях
  - This plan is **better than** the old one. *(Этот план лучше, чем старый.)*
  - Yesterday was **the worst** day of my week. *(Вчера был самый худший день недели.)*
  - She is my **best** friend. *(Она моя самая лучшая подруга.)*"""

# 12. degrees-adjectives-2
russian_guides['degrees-adjectives-2'] = """## Advanced Degrees of Adjectives (Сложные степени сравнения)

Многосложные прилагательные (состоящие из 2 и более слогов) образуют степени сравнения с помощью слов **more** *(более)* и **the most** *(самый)*.

## 1. Формулы для многосложных слов
• **Сравнительная степень**: **more** + adjective + **than**
• **Превосходная степень**: **the most** + adjective

## 2. Примеры
• **beautiful** ➔ **more beautiful** ➔ **the most beautiful** *(красивый — красивее — самый красивый)*
• **expensive** ➔ **more expensive** ➔ **the most expensive** *(дорогой — дороже — самый дорогой)*
• **interesting** ➔ **more interesting** ➔ **the most interesting** *(интересный — интереснее — самый интересный)*

  - Ferrari is **more expensive than** Toyota. *(Феррари дороже, чем Тойота.)*
  - This is **the most interesting** book I have ever read. *(Это самая интересная книга, которую я читал.)*

⚠️ **Распространенная ошибка**: Нельзя использовать *more* и *-er* одновременно!
  - ❌ more cheaper ➔ ✅ **cheaper** или **more expensive**"""

# 13. as-adjective-as
russian_guides['as-adjective-as'] = """## As...as Comparisons (Сравнение с помощью As...as)

Конструкция **as + прилагательное + as** используется для выражения одинакового качества объектов («такой же ..., как ...»).

## 1. Формула равенства
• **as + adjective + as**
  - He is **as tall as** his father. *(Он такой же высокий, как его отец.)*
  - My phone is **as fast as** yours. *(Мой телефон такой же быстрый, как твой.)*

## 2. Отрицательная конструкция (Not as...as)
Для выражения неполного равенства («не такой ..., как ...»):
• **not as + adjective + as**
  - Today is **not as cold as** yesterday. *(Сегодня не так холодно, как вчера.)*
  - This book is **not as interesting as** the movie. *(Эта книга не такая интересная, как фильм.)*

## 3. Важное правило
Между **as** и **as** всегда стоит **начальная форма** прилагательного (без окончаний -er, -est и без слова more)!
  - ✅ as **big** as ➔ ❌ as bigger as"""

# 14. adverbs
russian_guides['adverbs'] = """## Adverbs (Наречия)

Наречие описывает глагол, прилагательное или другое наречие и отвечает на вопрос «Как? Каким образом? Где? Когда?».

## 1. Отличие прилагательного от наречия
• **Прилагательное** (описывает существительное): She is a **slow** driver. *(Она медленный водитель.)*
• **Наречие** (описывает глагол): She drives **slowly**. *(Она водит медленно.)*

## 2. Образование наречий
Большинство наречий образуются добавлением суффикса **-ly** к прилагательному:
  - quick ➔ quick**ly** *(быстро)*
  - careful ➔ careful**ly** *(осторожно)*
  - easy ➔ eas**ily** *(легко)*

## 3. Исключения
| Прилагательное (Какой?) | Наречие (Как?) |
|---|---|
| **good** *(хороший)* | **well** *(хорошо)* |
| **fast** *(быстрый)* | **fast** *(быстро)* |
| **hard** *(тяжелый/усердный)* | **hard** *(усердно)* |
| **late** *(поздний)* | **late** *(поздно)* |

  - He speaks English **well**. *(Он хорошо говорит по-английски.)*
  - She runs very **fast**. *(Она бегает очень быстро.)*"""

# 15. numerals
russian_guides['numerals'] = """## Numerals (Числительные)

Числительные в английском языке делятся на **Количественные** (Cardinal) и **Порядковые** (Ordinal).

## 1. Два типа числительных
• **Cardinal (Сколько?)**: one, two, three, four, five...
• **Ordinal (Который по счету?)**: first, second, third, fourth, fifth...

## 2. Образование порядковых числительных
К большинству чисел добавляется суффикс **-th** и определенный артикль **the**:
  - four ➔ **the 4th** (the fourth)
  - ten ➔ **the 10th** (the tenth)

### 3 главных исключения:
  - 1-й ➔ **the first (1st)**
  - 2-й ➔ **the second (2nd)**
  - 3-й ➔ **the third (3rd)**

## 3. Чтение дат
При чтении дат вслух используется порядковое числительное с артиклем **the** и предлогом **of**:
  - May 5th ➔ *the fifth of May*
  - In the 21st century ➔ *in the twenty-first century*"""

# 16. articles
russian_guides['articles'] = """## Articles (Артикли: A, An, The)

Артикли служат указателями существительного. Различают **Неопределенный артикль (A / An)** и **Определенный артикль (The)**.

## 1. Неопределенный артикль (A / An)
Употребляется **только с исчисляемыми существительными в единственном числе**, когда предмет упоминается впервые или не конкретизирован.
• **A** — перед согласными звуками: **a** book, **a** car, **a** university
• **AN** — перед гласными звуками: **an** apple, **an** hour, **an** egg

## 2. Определенный артикль (THE)
Употребляется со ВСЕМИ типами существительных, когда предмет **конкретен** или **уникален**:
  - Open **the** door. *(Открой именно эту дверь.)*
  - **The** sun is shining. *(Cолнце — уникальный объект.)*

## 3. Нулевой артикль (Zero Article)
Артикль НЕ ставится:
  - Перед именами собственными и названиями городов/стран: Tashkent, Alex, Uzbekistan.
  - Перед множественным числом и неисчисляемыми существительными в общем смысле: Cats like milk.
  - Перед названиями языков и предметных дисциплин: English, History."""

# 17. present-continuous
russian_guides['present-continuous'] = """## Present Continuous (Настоящее длительное время)

Present Continuous передает действие, происходящее **прямо сейчас, в момент речи**, или временную ситуацию.

## 1. Образование (Form)
• **POSITIVE (+)**: Subject + am / is / are + Verb-ing
  - I **am reading** a book now. *(Я читаю книгу сейчас.)*
  - She **is cooking** dinner. *(Она готовит обед.)*
  - They **are playing** football. *(Они играют в футбол.)*
• **NEGATIVE (-)**: Subject + am / is / are + not + Verb-ing
  - I **am not (I'm not) sleeping**. *(Я не сплю.)*
  - She **is not (isn't) working**. *(Она не работает.)*
  - They **are not (aren't) watching** TV. *(Они не смотрят телевизор.)*
• **QUESTION (?)**: Am / Is / Are + Subject + Verb-ing?
  - **Are** you **listening** to me? *(Ты слушаешь меня?)*
  - **Is** he **doing** his homework? *(Он делает домашнюю работу?)*

*(Форма глагола to be зависит от подлежащего: I ➔ am, He/She/It ➔ is, We/You/They ➔ are)*

## 2. Употребление (Usage)
1. **Действие в момент речи**: I am writing an email right now.
2. **Временная ситуация**: He is living in London this month.
3. **Запланированное действие в ближайшем будущем**: We are meeting tomorrow.

## 3. Маркеры времени (Time Expressions)
• **now**, **at the moment**, **right now**, **Look!**, **Listen!**"""

# 18. present-simple
russian_guides['present-simple'] = """## Present Simple (Настоящее простое время)

Present Simple выражает **повторяющиеся, регулярные действия, привычки, расписания и общеизвестные факты**.

## 1. Образование (Form)
• **POSITIVE (+)**: Subject + Base Verb (+ -s/-es)
  - I / You / We / They **work** every day. *(Я / Вы / Мы / Они работаем каждый день.)*
  - He / She / It **works** every day. *(Он / Она работает каждый день.)*
• **NEGATIVE (-)**: Subject + do not (don't) / does not (doesn't) + Base Verb
  - I / You / We / They **don't work** on Sundays. *(Мы не работаем по воскресеньям.)*
  - He / She / It **doesn't work** on Sundays. *(Он не работает по воскресеньям.)*
• **QUESTION (?)**: Do / Does + Subject + Base Verb?
  - **Do** you **live** here? *(Ты живешь здесь?)*
  - **Does** she **speak** English? *(Она говорит по-английски?)*

*(В отрицаниях и вопросах для He/She/It окончание -s у основного глагола отпадает, так как его берет на себя does)*

## 2. Употребление (Usage)
1. **Регулярные действия и привычки**: I wake up at 7 AM.
2. **Общие факты и законы природы**: The sun rises in the east.
3. **Расписания**: The train leaves at 9 PM.

## 3. Маркеры времени (Time Expressions)
• **always**, **usually**, **often**, **sometimes**, **never**, **every day / week**"""

# 19. past-simple
russian_guides['past-simple'] = """## Past Simple (Прошедшее простое время)

Past Simple описывает действие, которое **произошло и завершилось в прошлом** в определенное время.

## 1. Образование (Form)
• **POSITIVE (+)**: Subject + Verb-2 (-ed / irregular)
  - I **visited** my grandparents yesterday. *(Я навестил бабушку с дедушкой вчера.)*
  - She **went** to London last year. *(Она ездила в Лондон в прошлом году.)*
• **NEGATIVE (-)**: Subject + did not (didn't) + Base Verb
  - I **didn't see** him yesterday. *(Я не видел его вчера.)*
  - She **didn't go** to school. *(Она не пошла в школу.)*
• **QUESTION (?)**: Did + Subject + Base Verb?
  - **Did** you **watch** the movie? *(Ты смотрел фильм?)*
  - **Did** they **arrive** on time? *(Они прибыли вовремя?)*

*(В отрицаниях и вопросах глагол ставится в начальную форму, так как прошедшее время выражает вспомогательный глагол did)*

## 2. Разделение глаголов
• **Правильные глаголы (Regular)**: добавляем **-ed** *(play ➔ played, work ➔ worked)*
• **Неправильные глаголы (Irregular)**: 2-я колонка таблицы *(go ➔ went, see ➔ saw, buy ➔ bought)*

## 3. Маркеры времени (Time Expressions)
• **yesterday**, **last week / month / year**, **2 days ago**, **in 2020**"""

# 20. past-continuous
russian_guides['past-continuous'] = """## Past Continuous (Прошедшее длительное время)

Past Continuous выражает **действие, которое длилось в определенный момент в прошлом**.

## 1. Образование (Form)
• **POSITIVE (+)**: Subject + was / were + Verb-ing
  - I / He / She / It **was reading** at 5 PM. *(Я читал в 5 часов вечера.)*
  - We / You / They **were playing** tennis. *(Мы играли в теннис.)*
• **NEGATIVE (-)**: Subject + was not (wasn't) / were not (weren't) + Verb-ing
  - She **wasn't working** at 8 o'clock. *(Она не работала в 8 часов.)*
  - They **weren't sleeping** when I called. *(Они не спали, когда я позвонил.)*
• **QUESTION (?)**: Was / Were + Subject + Verb-ing?
  - **Was** he **sleeping** when you arrived? *(Он спал, когда ты пришел?)*
  - **Were** you **watching** TV at 9 PM? *(Ты смотрел телевизор в 9 вечера?)*

*(Was используется для I/He/She/It; Were используется для We/You/They)*

## 2. Употребление (Usage)
1. **Длительное действие в конкретный момент прошлого**: Yesterday at 5 PM I was studying.
2. **Длинное действие, прерванное кратким действием (Past Simple)**: I was sleeping when the alarm went off.
3. **Два одновременных длительных действия**: While I was writing, she was reading.

## 3. Маркеры времени (Time Expressions)
• **at 5 o'clock yesterday**, **when**, **while**, **all day yesterday**"""

# 21. future-simple
russian_guides['future-simple'] = """## Future Simple (Будущее простое время)

Future Simple (Will) используется для передачи **спонтанных решений, прогнозов на будущее и обещаний**.

## 1. Образование (Form)
• **POSITIVE (+)**: Subject + will + Base Verb
  - I **will (I'll) help** you. *(Я помогу тебе.)*
  - It **will rain** tomorrow. *(Завтра пойдет дождь.)*
• **NEGATIVE (-)**: Subject + will not (won't) + Base Verb
  - I **will not (won't) tell** anyone. *(Я никому не скажу.)*
  - She **won't come** to the party. *(Она не придет на вечеринку.)*
• **QUESTION (?)**: Will + Subject + Base Verb?
  - **Will** you **come** tomorrow? *(Ты придешь завтра?)*
  - **Will** they **win** the match? *(Они выиграют матч?)*

*(Вспомогательный глагол will одинаков для всех лиц)*

## 2. Употребление (Usage)
1. **Спонтанное решение во время разговора**: I'm tired. I will go to sleep.
2. **Обещания и просьбы**: I will always love you.
3. **Предсказание будущего**: I think humans will live on Mars.

## 3. Маркеры времени (Time Expressions)
• **tomorrow**, **next week / month / year**, **in 2 days**, **soon**"""

# 22. future-continuous
russian_guides['future-continuous'] = """## Future Continuous (Будущее длительное время)

Future Continuous выражает **процесс, который будет происходить в определенный момент в будущем**.

## 1. Образование (Form)
• **POSITIVE (+)**: Subject + will be + Verb-ing
  - Tomorrow at 3 PM I **will be taking** an exam. *(Завтра в 3 часа дня я буду сдавать экзамен.)*
  - They **will be playing** football at 5 PM. *(Они будут играть в футбол в 5 вечера.)*
• **NEGATIVE (-)**: Subject + will not (won't) be + Verb-ing
  - I **won't be working** at this time tomorrow. *(Я не буду работать в это время завтра.)*
• **QUESTION (?)**: Will + Subject + be + Verb-ing?
  - **Will** you **be using** your laptop later? *(Ты будешь использовать ноутбук позже?)*

## 2. Употребление (Usage)
1. **Действие в процессе в конкретный момент в будущем**: At 10 AM tomorrow, I will be flying to London.
2. **Вежливый вопрос о чьих-либо планах**: Will you be going to the supermarket today?

## 3. Маркеры времени (Time Expressions)
• **at 3 PM tomorrow**, **this time next week**, **at this moment tomorrow**"""

# 23. present-perfect-simple
russian_guides['present-perfect-simple'] = """## Present Perfect Simple (Настоящее совершенное время)

Present Perfect связывает **прошедшее действие с настоящим результатом**. Важен сам результат или факт совершения действия, а не точное время.

## 1. Образование (Form)
• **POSITIVE (+)**: Subject + have / has + Verb-3
  - I / You / We / They **have (I've) finished** the work. *(Я закончил работу.)*
  - He / She / It **has (she's) lost** the key. *(Она потеряла ключ.)*
• **NEGATIVE (-)**: Subject + have not (haven't) / has not (hasn't) + Verb-3
  - I **haven't seen** him today. *(Я не видел его сегодня.)*
  - She **hasn't called** me yet. *(Она мне еще не звонила.)*
• **QUESTION (?)**: Have / Has + Subject + Verb-3?
  - **Have** you **ever been** to London? *(Ты когда-нибудь был в Лондоне?)*
  - **Has** she **done** her homework? *(Она сделала домашнее задание?)*

*(Have используется с I/You/We/They; Has используется с He/She/It)*

## 2. Употребление (Usage)
1. **Действие завершилось, но есть результат в настоящем**: I have lost my passport. *(Паспорта нет сейчас)*
2. **Жизненный опыт к настоящему моменту**: I have seen this movie twice.
3. **Незавершенный период времени**: I have drunk two cups of coffee today.

## 3. Маркеры времени (Time Expressions)
• **already**, **just**, **yet**, **ever**, **never**, **recently**, **so far**"""

# 24. present-perfect-continuous
russian_guides['present-perfect-continuous'] = """## Present Perfect Continuous (Настоящее совершенное длительное)

Present Perfect Continuous выражает **действие, которое началось в прошлом, продолжалось некоторое время и всё ещё длится или только что завершилось**.

## 1. Образование (Form)
• **POSITIVE (+)**: Subject + have / has been + Verb-ing
  - I **have been learning** English for 2 years. *(Я учу английский язык 2 года.)*
  - She **has been studying** all morning. *(Она учится все утро.)*
• **NEGATIVE (-)**: Subject + have not (haven't) / has not (hasn't) been + Verb-ing
  - They **haven't been sleeping** well. *(Они плохо спят в последнее время.)*
  - He **hasn't been working** here long. *(Он работает здесь недолго.)*
• **QUESTION (?)**: Have / Has + Subject + been + Verb-ing?
  - **Have** you **been waiting** long? *(Ты долго ждешь?)*
  - **How long has** she **been teaching**? *(Как долго она преподает?)*

*(Have been с I/You/We/They; Has been с He/She/It)*

## 2. Употребление (Usage)
1. **Действие началось в прошлом и длится до сих пор (подчеркивается длительность)**: I have been living here since 2018.
2. **Действие только что завершилось с видимым результатом**: Why are you wet? — I have been running.

## 3. Маркеры времени (Time Expressions)
• **for**, **since**, **how long**, **all day / week**"""

# 25. be-going-to
russian_guides['be-going-to'] = """## Be going to (Конструкция намерений и планов)

Конструкция **be going to** выражает **заранее запланированные намерения** или очевидные предсказания на основе увиденных фактов.

## 1. Образование (Form)
• **POSITIVE (+)**: Subject + am / is / are + going to + Base Verb
  - I **am going to buy** a new car. *(Я собираюсь купить новую машину.)*
  - She **is going to visit** her doctor. *(Она планирует посетить врача.)*
  - We **are going to travel** together. *(Мы собираемся путешествовать вместе.)*
• **NEGATIVE (-)**: Subject + am / is / are + not + going to + Base Verb
  - I **am not going to stay** here. *(Я не собираюсь оставаться здесь.)*
  - He **isn't going to sell** his house. *(Он не планирует продавать дом.)*
• **QUESTION (?)**: Am / Is / Are + Subject + going to + Base Verb?
  - **Are** you **going to watch** the match? *(Ты собираешься смотреть матч?)*
  - **Is** she **going to apply** for the job? *(Она планирует подать заявку?)*

## 2. Употребление (Usage)
1. **Предварительные планы и намерения**: I have saved money. I am going to buy a phone.
2. **Очевидные предсказания по внешним признакам**: Look at those black clouds! It is going to rain.

## 3. Сравнение с Will
• **Will**: Спонтанное решение *(I'm hungry. I will order pizza.)*
• **Be going to**: Заранее продуманный план *(I booked a table. We are going to eat out.)*"""

# 26. past-perfect-simple
russian_guides['past-perfect-simple'] = """## Past Perfect Simple (Предпрошедшее время)

Past Perfect описывает **действие, которое завершилось РАНЬШЕ другого действия или момента в прошлом**.

## 1. Образование (Form)
• **POSITIVE (+)**: Subject + had + Verb-3
  - I **had finished** my work before he arrived. *(Я закончил работу до того, как он пришел.)*
  - The train **had left** when we got to the station. *(Поезд ушел, когда мы прибыли на станцию.)*
• **NEGATIVE (-)**: Subject + had not (hadn't) + Verb-3
  - She **hadn't seen** the movie before yesterday. *(Она не видела этот фильм до вчерашнего дня.)*
• **QUESTION (?)**: Had + Subject + Verb-3?
  - **Had** you **met** him before the conference? *(Ты встречал его до конференции?)*

*(Had одинаков для всех лиц)*

## 2. Употребление (Usage)
1. **Действие, совершившееся ранее другого прошедшего действия**:
   - When I arrived at the office, she **had already gone** home.
2. **Объяснение причины в прошлом**:
   - He failed the exam because he **hadn't studied**.

## 3. Маркеры времени (Time Expressions)
• **by the time**, **before**, **after**, **already**, **just**, **never**"""

# 27. past-perfect-continuous
russian_guides['past-perfect-continuous'] = """## Past Perfect Continuous (Предпрошедшее длительное время)

Past Perfect Continuous передает действие, которое **началось и длилось некоторое время ДО определенного момента в прошлом**.

## 1. Образование (Form)
• **POSITIVE (+)**: Subject + had been + Verb-ing
  - I **had been waiting** for an hour when the bus arrived. *(Я ждал уже час, когда приехал автобус.)*
  - She **had been studying** for three hours before she took a break. *(Она училась три часа, прежде чем сделала перерыв.)*
• **NEGATIVE (-)**: Subject + had not (hadn't) + been + Verb-ing
  - They **hadn't been sleeping** well before the trip. *(Они плохо спали перед поездкой.)*
  - He **hadn't been working** there long when he got promoted. *(Он проработал там недолго, когда его повысили.)*
• **QUESTION (?)**: Had + Subject + been + Verb-ing?
  - **Had** you **been waiting** long before I arrived? *(Ты долго ждал до моего прихода?)*
  - **How long had** she **been learning** English before the exam? *(Как долго она учила английский перед экзаменом?)*

*(Вспомогательный глагол had одинаков для всех лиц)*

## 2. Употребление (Usage)
1. **Действие, начавшееся до момента в прошлом и продолжавшееся до него (важна длительность)**:
   - By the time he arrived, we **had been waiting** for two hours.
2. **Объяснение причины состояния в прошлом**:
   - She was exhausted because she **had been running** all morning.

## 3. Отличие от Past Perfect Simple
• **Past Perfect Simple**: результат и количество *(I had written 3 emails)*
• **Past Perfect Continuous**: длительность процесса *(I had been writing emails all morning)*

## 4. Маркеры времени (Time Expressions)
• **for**, **since**, **before**, **when**, **how long**"""

# 28. future-perfect-simple
russian_guides['future-perfect-simple'] = """## Future Perfect Simple (Будущее совершенное время)

Future Perfect выражает **действие, которое будет полностью завершено К определенному моменту в будущем**.

## 1. Образование (Form)
• **POSITIVE (+)**: Subject + will have + Verb-3
  - By next year, I **will have graduated** from university. *(К следующему году я закончу университет.)*
  - She **will have finished** the report by 5 PM. *(Она закончит отчет к 5 часам вечера.)*
• **NEGATIVE (-)**: Subject + will not (won't) have + Verb-3
  - They **won't have completed** the project by Monday. *(Они не завершат проект к понедельнику.)*
• **QUESTION (?)**: Will + Subject + have + Verb-3?
  - **Will** you **have read** the book by tomorrow? *(Ты дочитаешь книгу к завтрашнему дню?)*

## 2. Употребление (Usage)
1. **Действие завершится до указанного времени в будущем**: By 2030, scientists will have found a cure.

## 3. Маркеры времени (Time Expressions)
• **by tomorrow**, **by 5 o'clock**, **by the end of the month**, **by the time**"""

# 29. future-perfect-continuous
russian_guides['future-perfect-continuous'] = """## Future Perfect Continuous (Будущее совершенное длительное)

Future Perfect Continuous показывает, **как долго будет длиться процесс К определенному моменту в будущем**.

## 1. Образование (Form)
• **POSITIVE (+)**: Subject + will have been + Verb-ing
  - By next month, I **will have been working** here for 5 years. *(К следующему месяцу исполнится 5 лет, как я работаю здесь.)*
• **NEGATIVE (-)**: Subject + will not (won't) have been + Verb-ing
  - She **won't have been studying** long enough by then. *(К тому времени она еще не будет учиться достаточно долго.)*
• **QUESTION (?)**: Will + Subject + have been + Verb-ing?
  - **How long will** you **have been living** here by 2026? *(Как долго ты будешь жить здесь к 2026 году?)*

## 2. Маркеры времени (Time Expressions)
• **by... for...**, **by next year for 10 years**"""

# 30. passive-voice
russian_guides['passive-voice'] = """## Passive Voice (Пассивный залог)

Пассивный залог используется, когда **действие или его объект важнее, чем исполнитель действия**.

## 1. Образование (Form)
• **Formula**: Subject + Verb to be (в нужном времени) + Verb-3
• **Active**: Shakespeare wrote Hamlet. *(Шекспир написал Гамлета.)*
• **Passive**: Hamlet **was written by** Shakespeare. *(Гамлет был написан Шекспиром.)*

## 2. Формы пассивного залога по временам
| Время | Формула | Пример |
|---|---|---|
| Present Simple | am / is / are + V3 | English **is spoken** here. |
| Past Simple | was / were + V3 | The car **was repaired** yesterday. |
| Future Simple | will be + V3 | The letter **will be sent** tomorrow. |
| Present Continuous | am / is / are being + V3 | The house **is being built** now. |
| Past Continuous | was / were being + V3 | The room **was being cleaned** at 5. |
| Present Perfect | have / has been + V3 | The work **has been done**. |

## 3. Исполнитель действия (By / With)
• **by** — указывает на человека или автора: *written by Pushkin*
• **with** — указывает на инструмент или материал: *cut with a knife*"""

# 31. modal-verbs
russian_guides['modal-verbs'] = """## Modal Verbs (Модальные глаголы)

Модальные глаголы выражают отношение к действию: **возможность, необходимость, разрешение или совет**.

## 1. Таблица главных модальных глаголов
| Глагол | Значение | Пример |
|---|---|---|
| **Can / Could** | Физическая возможность / умение | I **can** swim. I **could** run fast in youth. |
| **Must** | Строгая обязанность / закон | You **must** wear a seatbelt. |
| **Have to** | Вынужденность по обстоятельствам | I **have to** wake up early for work. |
| **Should** | Совет («Тебе следует...») | You **should** see a doctor. |
| **May / Might** | Вероятность / разрешение | It **may** rain. **May** I come in? |

## 2. Отрицательные формы
• **mustn't** — категорический запрет *(нельзя!)*
• **don't have to** — отсутствие необходимости *(необязательно)*
  - You **mustn't smoke** here. *(Курить запрещено!)*
  - You **don't have to come** tomorrow. *(Завтра приходить необязательно.)*

⚠️ **Главное правило**: После большинства модальных глаголов частица **to** НЕ ставится!
  - ✅ I can speak ➔ ❌ I can to speak"""

# 32. first-conditional
russian_guides['first-conditional'] = """## First Conditional (Первый тип условных предложений)

First Conditional выражает **реальные, возможные будущие события**, если выполнится условие.

## 1. Образование (Form)
• **POSITIVE (+)**: If + Present Simple, ... Will + Base Verb
  - **If** it **rains** tomorrow, I **will stay** at home. *(Если завтра пойдет дождь, я останусь дома.)*
  - **If** you **study** hard, you **will pass** the exam. *(Если ты будешь усердно учиться, ты сдашь экзамен.)*
• **NEGATIVE (-)**: If + don't/doesn't + Verb, ... won't + Verb
  - **If** he **doesn't hurry**, he **will miss** the train. *(Если он не поспешит, он опоздает на поезд.)*

⚠️ **Главное правило**: После союза **IF** всегда используется Present Simple (НЕЛЬЗЯ ставить will сразу после if)!
  - ✅ If I **see** him, I will tell him.
  - ❌ If I will see him..."""

# 33. second-conditional
russian_guides['second-conditional'] = """## Second Conditional (Второй тип условных предложений)

Second Conditional описывает **нереальные, воображаемые ситуации в настоящем или будущем** («если бы..., то...»).

## 1. Образование (Form)
• **POSITIVE (+)**: If + Past Simple, ... Would + Base Verb
  - **If** I **had** a million dollars, I **would buy** a yacht. *(Если бы у меня был миллион долларов, я бы купил яхту.)*
  - **If** I **knew** her number, I **would call** her. *(Если бы я знал ее номер, я бы позвонил ей.)*

## 2. Использование форме "were"
В условных предложениях второго типа форма **were** часто используется для ВСЕХ лиц (включая I, he, she, it):
  - **If** I **were** you, I **would accept** the job. *(Если бы я был на твоем месте, я бы согласился.)*
  - **If** he **were** taller, he **would play** basketball. *(Если бы он был выше, он бы играл в баскетбол.)*"""

# 34. reported-speech
russian_guides['reported-speech'] = """## Reported Speech (Косвенная речь)

Reported Speech используется для **пересказа слов другого человека**. Время глагола сдвигается назад во времени (**Backshift of tenses**).

## 1. Правило сдвига времен (Backshift)
| Прямая речь (Direct Speech) | Косвенная речь (Reported Speech) |
|---|---|
| Present Simple | **Past Simple** |
| Present Continuous | **Past Continuous** |
| Past Simple / Present Perfect | **Past Perfect** |
| Will | **Would** |
| Can | **Could** |

## 2. Примеры
• Direct: «I **love** music,» said Tom.
• Reported: Tom said that he **loved** music.

• Direct: «I **will call** you tomorrow,» she said.
• Reported: She said that she **would call** me the next day.

## 3. Изменение указателей времени
• today ➔ **that day**
• tomorrow ➔ **the next day / the following day**
• yesterday ➔ **the day before**"""

# 35. relative-clauses
russian_guides['relative-clauses'] = """## Relative Clauses (Относительные придаточные)

Relative Clauses соединяют два предложения и дают дополнительную информацию о существительном с помощью местоимений **who, which, that, where, whose**.

## 1. Относительные местоимения
• **Who**: для людей *(The man **who** lives next door is a doctor)*
• **Which**: для предметов и животных *(The car **which** is parked outside is mine)*
• **That**: универсально для людей и предметов *(The book **that** I read was good)*
• **Where**: для мест *(The restaurant **where** we met)*
• **Whose**: для принадлежности *(The boy **whose** bike was stolen)*

## 2. Примеры
  - I met a woman **who** speaks 5 languages. *(Я встретил женщину, которая говорит на 5 языках.)*
  - This is the house **where** I grew up. *(Это дом, где я вырос.)*"""

# 36. used-to-would
russian_guides['used-to-would'] = """## Used to & Would (Прошлые привычки и состояния)

Обе конструкции описывают **действия и привычки в прошлом, которых больше нет в настоящем**.

## 1. Used to + Base Verb
Используется и для **прошлых повторяющихся действий**, и для **прошлых состояний** (жил, имел, был):
  - I **used to live** in London. *(Раньше я жил в Лондоне — состояние)*
  - He **used to smoke**, but he quit. *(Раньше он курил — привычка)*

## 2. Would + Base Verb
Используется ТОЛЬКО для повторяющихся **прошлых действий** (НЕ для состояний!):
  - Every summer we **would go** to the beach. *(Каждое лето мы ездили на пляж.)*
  - ❌ I would live in London. ➔ ✅ I **used to live** in London.

## 3. Формы отрицания и вопроса для Used to
• **Negative**: Subject + didn't use to + Base Verb
  - I **didn't use to like** coffee.
• **Question**: Did + Subject + use to + Base Verb?
  - **Did** you **use to play** football?"""

# 37. gerunds-infinitives
russian_guides['gerunds-infinitives'] = """## Gerunds & Infinitives (Герундий и инфинитив)

Герундий (**Verb-ing**) и Инфинитив (**to + Verb**) — формы глагола, следующие за основным глаголом.

## 1. Герундий (Verb-ing)
Используется после глаголов чувства и выражений: **enjoy, mind, avoid, suggest, finish, keep, consider, look forward to**:
  - I **enjoy reading** books. *(Я наслаждаюсь чтением.)*
  - Would you **mind closing** the window? *(Не могли бы вы закрыть окно?)*

## 2. Инфинитив (to + Base Verb)
Используется после глаголов решения и плана: **want, decide, hope, promise, plan, agree, offer, refuse**:
  - I **decided to learn** English. *(Я решил учить английский.)*
  - She **wants to buy** a car. *(Она хочет купить машину.)*

## 3. После предлогов
После любого предлога (in, on, at, about, for, without, before, after) ВСЕГДА используется **Герундий (-ing)**!
  - Thank you **for helping** me. *(Спасибо за помощь.)*"""

# 38. noun-clauses
russian_guides['noun-clauses'] = """## Noun Clauses (Придаточные существительные)

Noun Clause — это придаточное предложение, которое выполняет роль существительного (подлежащего, дополнения или сказуемого).

## 1. Главное правило: Прямой порядок слов
Внутри Noun Clause порядок слов ВСЕГДА прямой (как в обычном утверждении, без вопросительного порядка)!
  - ✅ I know **where she lives**. *(Я знаю, где она живет — правильно)*
  - ❌ I know **where does she live**. *(НЕПРАВИЛЬНО — никаких does/did в середине!)*
  - ✅ Tell me **what you want**. *(Скажи мне, чего ты хочешь)*

## 2. 3 основных типа Noun Clauses
• **2a. С союзом "That" (факты и мысли)**:
  - She believes **that he is honest**. *(Она верит, что он честен.)*
  - I think **that they are right**. *(Я считаю, что они правы.)*
• **2b. С вопросительными словами "Wh-" (косвенные вопросы)**:
  - I know **where she lives**. *(Я знаю, где она живет.)*
  - Tell me **what you want**. *(Скажи мне, чего ты хочешь.)*
• **2c. С союзами "Whether / If" (сомнение да/нет)**:
  - I don't know **whether she is coming**. *(Я не знаю, придет ли она.)*
  - He asked **if the store was open**. *(Он спросил, открыт ли магазин.)*

## 3. Функции в предложении
| Функция | Пример |
|---|---|
| Подлежащее (Subject) | **What she said** surprised me. |
| Дополнение (Object) | I know **that you are tired**. |
| Сказуемое (Predicate) | The truth is **that he lied**. |"""

# Write to file
with open('d:/Projects/VOC/src/data/russianGuidesData.js', 'w', encoding='utf-8') as f:
    f.write("export const russianGuidesData = {\n")
    for key, content in russian_guides.items():
        # Escape backticks if any
        escaped_content = content.replace("`", "\\`")
        f.write(f"  '{key}': `{escaped_content}`,\n\n")
    f.write("};\n")

print(f"Successfully generated russianGuidesData.js with {len(russian_guides)} full-structure guides!")
