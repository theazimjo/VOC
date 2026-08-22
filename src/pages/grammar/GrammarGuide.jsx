import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { grammarData } from '../../data/grammarData';
import { russianGrammarData } from '../../data/russianGrammarData';
import { parseGuide } from '../../utils/grammarGuideParser';
import { useLanguage } from '../../contexts/LanguageContext';
import './GrammarGuide.css';

const russianSentenceStructureGuide = `## Структура обычного предложения (Sentence Structure)

В английском языке порядок слов **строгий**: Подлежащее (Subject) + Глагол (Verb) + Дополнение (Object). В отличие от русского языка, где слова можно менять местами, в английском порядок слов почти всегда один и тот же!

💡 **Главный секрет — формула S + V + O:**
• **S** (Subject / Кто?) + **V** (Verb / Что делает?) + **O** (Object / Кого? Что?)
  - **She** (S) **reads** (V) **books** (O). *(Она читает книги.)*
  - **They** (S) **play** (V) **football** (O). *(Они играют в футбол.)*

## 1. Схема 3-х типов предложений

### 1a. Утверждение (Positive)
**Подлежащее + Глагол (+ s/es) + Дополнение**
  - Tom **drinks** coffee every morning. *(Том пьет кофе каждое утро.)*
  - We **like** ice cream. *(Мы любим мороженое.)*

### 1b. Отрицание (Negative)
**Подлежащее + do not (don't) / does not (doesn't) + Глагол + Дополнение**
  - I **don't like** fish. *(Я не люблю рыбу.)*
  - She **doesn't eat** meat. *(Она не ест мясо.)*

### 1c. Вопрос (Question)
**Do / Does + Подлежащее + Глагол + Дополнение?**
  - **Do** you **speak** English? *(Ты говоришь по-английски?)*
  - **Does** she **work** here? *(Она работает здесь?)*

## 2. 4 главных правила

1. **Кто делает — всегда на 1-м месте:** *She reads books* (нельзя сказать: *Reads she books*).
2. **Окончание -s / -es:** добавляется к глаголу только для **he / she / it**.
3. **Объект — после глагола:** *I go to school every day*.
4. **Время и место — в самом конце:** *We play tennis on Sundays*.`;

const russianPronounsGuide = `## Местоимения (Pronouns)

Местоимение — это слово, которое заменяет существительное, чтобы не повторять одно и то же слово много раз.

💡 **Зачем нужны местоимения?**
Вместо: «Антон купил машину. Антон очень любит машину Антона.»
Мы говорим: «Антон купил машину. **Он** очень любит **свою** машину.»

## 1. 4 главных вида местоимений

| Вид | Описание | Примеры |
|---|---|---|
| **Personal** (Личные) | Кто выполняет действие | I, you, he, she, it, we, they |
| **Object** (Объектные) | На кого направлено действие | me, you, him, her, it, us, them |
| **Possessive** (Притяжательные) | Кому принадлежит | mine, yours, his, hers, ours, theirs |
| **Reflexive** (Возвратные) | Сам / себя | myself, yourself, himself, herself |

## 2. Главные правила употребления

1. **Замена существительных:** местоимения выбираются по роду и числу:
  - My brother is a doctor. **He** works in a hospital. *(Брат ➔ He)*
  - The book is on the table. **It** is interesting. *(Книга ➔ It)*
  - My parents are teachers. **They** live here. *(Родители ➔ They)*

2. **Правило "It":** для предметов, животных и неодушевленных вещей всегда используется **It** (в множественном числе — **They**).`;

const russianPersonalPronounsGuide = `## Личные местоимения (Personal Pronouns)

Личные местоимения стоят на месте подлежащего (кто? что?) в самом начале предложения.

💡 **Все 7 личных местоимений:**

### 1. Единственное число (Singular)
• **I** — Я *(всегда пишется с БОЛЬШОЙ буквы!)*
• **You** — Ты / Вы
• **He** — Он *(для мужчин и мальчиков)*
• **She** — Она *(для женщин и девочек)*
• **It** — Оно / Он / Она *(для предметов, вещей и животных)*

### 2. Множественное число (Plural)
• **We** — Мы
• **You** — Вы / Ребята
• **They** — Они *(для людей, предметов и животных)*

## 1. Связка с глаголом "to be" (am / is / are)

  - **I am** a student. *(Я студент)*
  - **He / She / It is** happy. *(Он / Она счастлива)*
  - **We / You / They are** friends. *(Мы / Вы / Они друзья)*

## 2. Глаголы в Present Simple

Для **he / she / it** к глаголу всегда добавляется **-s** или **-es**:
  - I **work** ➔ He **works**
  - We **go** ➔ She **goes**`;

const russianObjectPronounsGuide = `## Объектные местоимения (Object Pronouns)

Объектные местоимения используются, когда действие направлено **на человека или предмет** (кого? кому? кем? о ком?). Они всегда стоят **ПОСЛЕ глагола** или предлога!

💡 **Таблица перевода:**

| Личное (Кто?) | Объектное (Кого? Кому?) | Пример |
|---|---|---|
| **I** (Я) | **me** (меня, мне) | She loves **me**. |
| **You** (Ты) | **you** (тебя, тебе) | I see **you**. |
| **He** (Он) | **him** (его, ему) | Call **him**. |
| **She** (Она) | **her** (ее, ей) | Help **her**. |
| **It** (Оно) | **it** (его, ему, ее) | I like **it**. |
| **We** (Мы) | **us** (нас, нам) | Join **us**. |
| **They** (Они) | **them** (их, им) | Look at **them**. |

## 1. Главные правила

1. **После глаголов:**
  - She loves **him**. *(Она любит его.)*
  - Tell **me** the truth. *(Скажи мне правду.)*

2. **После предлогов (to, for, with, about, between):**
  - Give it **to me**. *(Дай это мне.)*
  - Between you and **me**. *(Между мной и тобой.)*

⚠️ **Ошибка:** Нельзя использовать *I* или *she* после глагола:
  - ❌ She loves I.
  - ✅ She loves **me**.`;

const russianPossessivePronounsGuide = `## Притяжательные местоимения (Possessive Pronouns)

Притяжательные местоимения отвечают на вопрос **«Чей? Чья? Чьё? Чьи?»** и указывают на принадлежность предмета.

💡 **Сравнение: Притяжательное прилагательное vs Местоимение**

• **Притяжательное прилагательное** (ставится ПЕРЕД существительным):
  - This is **my** car. *(Это моя машина.)*
• **Притяжательное местоимение** (стоит САМО ПО СЕБЕ, без существительного):
  - This car is **mine**. *(Эта машина — моя / принадлежит мне.)*

## 1. Таблица форм

| Лицо | Прилагательное (+ существительное) | Местоимение (само по себе) |
|---|---|---|
| **I** | **my** book | **mine** *(моя)* |
| **You** | **your** car | **yours** *(твоя)* |
| **He** | **his** phone | **his** *(его)* |
| **She** | **her** bag | **hers** *(ее)* |
| **We** | **our** house | **ours** *(наш)* |
| **They** | **their** key | **theirs** *(их)* |

## 2. Примеры в предложениях

  - Is this pen **yours**? — No, it's **hers**. *(Это твоя ручка? — Нет, ее.)*
  - Their house is big, but **ours** is bigger. *(Их дом большой, но наш еще больше.)*
  - That blue coat is **mine**. *(То синее пальто — мое.)*

*Примечание: Притяжательные местоимения пишутся БЕЗ апострофа (никаких yours', her's)!*`;

const russianReflexivePronounsGuide = `## Возвратные местоимения (Reflexive Pronouns)

Возвратные местоимения используются, когда подлежащее и дополнение — это **одно и то же лицо** (когда человек делает что-то **сам** или **себя**).

💡 **Соответствие лиц:**

• **I** ➔ **myself** *(я сам / себя)*
• **You (ед.ч.)** ➔ **yourself** *(ты сам / себя)*
• **He** ➔ **himself** *(он сам / себя)*
• **She** ➔ **herself** *(она сама / себя)*
• **It** ➔ **itself** *(оно само / себя)*
• **We** ➔ **ourselves** *(мы сами)*
• **You (мн.ч.)** ➔ **yourselves** *(вы сами)*
• **They** ➔ **themselves** *(они сами)*

## 1. Основные случаи использования

### 1a. Действие на самого себя (-ся / себя)
  - He cut **himself** while cooking. *(Он порезался во время готовки.)*
  - She looked at **herself** in the mirror. *(Она посмотрела на себя в зеркало.)*

### 1b. Самостоятельное выполнение (Сам / Без помощи)
  - I fixed the car **myself**. *(Я сам починил машину.)*
  - They built the house **themselves**. *(Они сами построили дом.)*

### 1c. Выражение "by myself" (В одиночку)
  - I live **by myself**. *(Я живу один / в одиночку.)*`;

const russianNounClausesGuide = `## Noun Clauses (Придаточные существительные)

Noun Clause — это придаточное предложение, которое работает как одно существительное (как слово «что-то» или «это»).

💡 Главный секрет: Любой Noun Clause можно мысленно заменить словом «что-то» или «это»:
• I know **your secret**. (Я знаю твой секрет.)
• I know **where you live**. (Я знаю [где ты живешь / что-то].)

## 1. Главное правило: Прямой порядок слов

Внутри Noun Clause порядок слов ВСЕГДА как в обычном утвердительном предложении (не как в вопросе)!

  - ✅ I know **where she lives**. (Я знаю, где она живет — правильно)
  - ❌ I know **where does she live**. (НЕПРАВИЛЬНО — никаких does/did в середине!)
  - ✅ Tell me **what you want**. (Скажи мне, чего ты хочешь — правильно)
  - ❌ Tell me **what do you want**. (НЕПРАВИЛЬНО!)

## 2. 3 основных типа Noun Clauses

### 2a. Факты и мысли (союз "that" = «что»)
Союз "that" показывает факт. В разговорной речи "that" можно свободно опускать!
  - She believes **that he is honest**. (Она верит, что он честен.)
  - I think **that they are right**. (Я считаю, что они правы.)
  - It is clear **that she passed the exam**. (Очевидно, что она сдала экзамен.)
  - She believes (that) he is honest. (Разговорный вариант без "that")

### 2b. Косвенные вопросы (слова "what", "where", "why", "who", "how", "when")
Используются, когда мы передаем чьи-то вопросы или неизвестную информацию.
  - I know **where she lives**. (Я знаю, где она живет.)
  - Tell me **what you want**. (Скажи мне, чего ты хочешь.)
  - He asked **who called him**. (Он спросил, кто ему звонил.)
  - I wonder **why she is sad**. (Интересно, почему она грустит.)

### 2c. Сомнение и выбор да/нет (союзы "whether / if" = «ли»)
Используются, когда есть сомнение: «да или нет».
  - I don't know **whether she is coming**. (Я не знаю, придет ли она.)
  - He asked **if the store was open**. (Он спросил, открыт ли магазин.)
  - I wonder **whether they will agree**. (Интересно, согласятся ли они.)

## 3. Где Noun Clause стоит в предложении?

| Позиция | Пример | Пояснение |
|---|---|---|
| Подлежащее (в начале) | **What she said** surprised me. | (То, что она сказала, удивило меня) |
| Дополнение (в конце) | I know **that you are tired**. | (Я знаю, что ты устал) |
| Сказуемое (после is/was) | The truth is **that he lied**. | (Правда в том, что он солгал) |`;

const russianGuides = {
  'sentence-structure': russianSentenceStructureGuide,
  'pronouns': russianPronounsGuide,
  'personal-pronouns': russianPersonalPronounsGuide,
  'object-pronouns': russianObjectPronounsGuide,
  'possessive-pronouns': russianPossessivePronounsGuide,
  'reflexive-pronouns': russianReflexivePronounsGuide,
  'noun-clauses': russianNounClausesGuide,
};

function Segments({ segments }) {
  return segments.map((seg, i) =>
    seg.bold ? (
      <strong key={i} className="gg-bold">{seg.text}</strong>
    ) : (
      <span key={i}>{seg.text}</span>
    )
  );
}

export default function GrammarGuide() {
  const { level = 'beginner', topicId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [guideLang, setGuideLangState] = useState(() => {
    return localStorage.getItem('grammar_guide_lang') || 'uz';
  });

  const setGuideLang = (lang) => {
    setGuideLangState(lang);
    localStorage.setItem('grammar_guide_lang', lang);
  };

  const topic = grammarData[level]?.topics?.find((t) => t.id === topicId) ||
                russianGrammarData[level]?.topics?.find((t) => t.id === topicId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!topic) {
    return (
      <div className="grammar-guide-page gg-error-state">
        <div className="gg-error-icon">🔍</div>
        <h2>{t('grammar.topicNotFound')}</h2>
        <button className="btn btn-primary" onClick={() => navigate('/grammar')}>
          {t('grammar.backToGrammar')}
        </button>
      </div>
    );
  }

  let activeGuideText = topic.guide;
  if (guideLang === 'ru' && russianGuides[topicId]) {
    activeGuideText = russianGuides[topicId];
  }

  const blocks = parseGuide(activeGuideText);

  return (
    <div className="grammar-guide-page">
      <div className="gg-header">
        <button
          className="gg-back-btn"
          onClick={() => navigate(`/grammar/${level}/${topicId}`)}
          title="Back"
        >
          ←
        </button>
        <div className="gg-header-title-wrap">
          <span className="gg-header-eyebrow">{t('grammar.studyGuide')}</span>
          <h1 className="gg-header-title">
            <span className="gg-header-icon">{topic.icon}</span> {topic.title}
          </h1>
        </div>

        {/* UZB / RUS language selector tabs */}
        <div className="gg-lang-selector">
          <button
            type="button"
            className={`gg-lang-btn ${guideLang === 'uz' ? 'active' : ''}`}
            onClick={() => setGuideLang('uz')}
          >
            🇺🇿 UZB
          </button>
          <button
            type="button"
            className={`gg-lang-btn ${guideLang === 'ru' ? 'active' : ''}`}
            onClick={() => setGuideLang('ru')}
          >
            🇷🇺 RUS
          </button>
        </div>
      </div>

      <div className="gg-body">
        {blocks.map((block, idx) => {
          switch (block.type) {
            case 'titleSub':
              return (
                <p key={idx} className="gg-title-sub">
                  <Segments segments={block.segments} />
                </p>
              );

            case 'h2':
              return (
                <div key={idx} className="gg-h2-row">
                  {block.number && <span className="gg-h2-badge">{block.number}</span>}
                  <h2 className="gg-h2-text">
                    <Segments segments={block.segments} />
                  </h2>
                </div>
              );

            case 'h3':
              return (
                <h3 key={idx} className="gg-h3-text">
                  <Segments segments={block.segments} />
                </h3>
              );

            case 'note':
              return (
                <div key={idx} className="gg-note">
                  <span className="gg-note-icon">💡</span>
                  <p className="gg-note-text">
                    <Segments segments={block.segments} />
                  </p>
                </div>
              );

            case 'rule':
              if (block.badge) {
                return (
                  <div key={idx} className="gg-step-card">
                    <span className="gg-step-badge">{block.badge}</span>
                    <div className="gg-step-content">
                      <strong className="gg-step-label">{block.label}</strong>
                      <span className="gg-step-desc">
                        <Segments segments={block.segments} />
                      </span>
                    </div>
                  </div>
                );
              }
              return (
                <div key={idx} className={`gg-rule-card gg-rule-${block.kind}`}>
                  <span className="gg-rule-pill">{block.label}</span>
                  <span className="gg-rule-formula">
                    <Segments segments={block.segments} />
                  </span>
                </div>
              );

            case 'step':
              return (
                <div key={idx} className="gg-step-card">
                  {block.badge ? (
                    <span className="gg-step-badge">{block.badge}</span>
                  ) : (
                    <span className="gg-step-dot" aria-hidden="true" />
                  )}
                  <div className="gg-step-content">
                    <strong className="gg-step-label">{block.label}</strong>
                    {block.noteSegments && (
                      <span className="gg-step-note">
                        <Segments segments={block.noteSegments} />
                      </span>
                    )}
                  </div>
                </div>
              );

            case 'numbered':
              return (
                <div key={idx} className="gg-step-card gg-step-plain">
                  <span className="gg-step-badge">{block.badge}</span>
                  <div className="gg-step-content">
                    <span className="gg-step-desc">
                      <Segments segments={block.segments} />
                    </span>
                  </div>
                </div>
              );

            case 'example':
              return (
                <div key={idx} className="gg-example">
                  <span className="gg-example-mark">›</span>
                  <p className="gg-example-text">
                    <Segments segments={block.segments} />
                  </p>
                </div>
              );

            case 'bullet':
              return (
                <div key={idx} className="gg-bullet">
                  <span className="gg-bullet-dot" aria-hidden="true" />
                  <p className="gg-bullet-text">
                    <Segments segments={block.segments} />
                  </p>
                </div>
              );

            case 'table':
              return (
                <div key={idx} className="gg-table-wrap">
                  <table className="gg-table">
                    <thead>
                      <tr>
                        {block.header.map((h, hi) => (
                          <th key={hi}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, ri) => (
                        <tr key={ri}>
                          {row.map((cell, ci) => (
                            <td key={ci}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );

            case 'paragraph':
            default:
              return (
                <p key={idx} className="gg-paragraph">
                  <Segments segments={block.segments} />
                </p>
              );
          }
        })}
      </div>

      <div className="gg-footer">
        <button
          className="gg-cta-btn"
          onClick={() => navigate(`/grammar/${level}/${topicId}`)}
        >
          {t('grammar.startExercises')}
        </button>
      </div>
    </div>
  );
}
