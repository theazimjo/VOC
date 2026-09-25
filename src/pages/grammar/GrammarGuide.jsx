import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findGrammarTopic } from '../../utils/grammarHelpers';
import { russianGuidesData } from '../../data/russianGuidesData';
import { parseGuide } from '../../utils/grammarGuideParser';
import { GuideBlocks } from '../../components/grammar/GuideRenderer';
import { useLanguage } from '../../contexts/LanguageContext';
import './GrammarGuide.css';

export default function GrammarGuide() {
  const { level = 'beginner', topicId } = useParams();
  const navigate = useNavigate();
  const { t, language: appLang } = useLanguage();

  const [guideLang, setGuideLangState] = useState(() => {
    const manual = localStorage.getItem('grammar_guide_manual_lang');
    if (manual === 'uz' || manual === 'ru') return manual;
    return appLang === 'ru' ? 'ru' : 'uz';
  });

  useEffect(() => {
    const manual = localStorage.getItem('grammar_guide_manual_lang');
    if (!manual) {
      setGuideLangState(appLang === 'ru' ? 'ru' : 'uz');
    }
  }, [appLang]);

  const setGuideLang = (lang) => {
    setGuideLangState(lang);
    localStorage.setItem('grammar_guide_manual_lang', lang);
  };

  const topic = findGrammarTopic(level, topicId);

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
  if (guideLang === 'ru') {
    activeGuideText = topic.guideRu || russianGuidesData[topicId] || topic.guide;
  }

  if (!activeGuideText && topic.studyGuide) {
    if (typeof topic.studyGuide === 'string') {
      activeGuideText = topic.studyGuide;
    } else if (typeof topic.studyGuide === 'object') {
      const { title, summary, sections } = topic.studyGuide;
      const parts = [];
      if (title) parts.push(`## ${title}`);
      if (summary) parts.push(`*${summary}*`);
      if (sections && Array.isArray(sections)) {
        sections.forEach((sec) => {
          parts.push(`## ${sec.title}\n${sec.content}`);
        });
      }
      activeGuideText = parts.join('\n\n');
    }
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
        <GuideBlocks blocks={blocks} lang="en-US" />
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
