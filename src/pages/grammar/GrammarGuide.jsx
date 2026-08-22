import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { grammarData } from '../../data/grammarData';
import { russianGrammarData } from '../../data/russianGrammarData';
import { parseGuide } from '../../utils/grammarGuideParser';
import { useLanguage } from '../../contexts/LanguageContext';
import './GrammarGuide.css';

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
  if (guideLang === 'ru' && topicId === 'noun-clauses') {
    activeGuideText = russianNounClausesGuide;
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
