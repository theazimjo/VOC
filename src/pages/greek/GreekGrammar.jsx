import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, PartyPopper, RotateCcw } from 'lucide-react';
import { greekGrammarData } from '../../data/greekGrammarData';
import { useGreekGrammarStats } from '../../hooks/useGreekGrammarStats';
import { parseGuide } from '../../utils/grammarGuideParser';
import { GuideBlocks } from '../../components/grammar/GuideRenderer';
import GreekGrammarQuiz from '../../components/greek/GreekGrammarQuiz';
import '../grammar/GrammarGuide.css';
import './GreekGrammar.css';

const TOPICS = greekGrammarData.beginner.topics;

export default function GreekGrammar() {
  const { stats, saveGreekGrammarResult } = useGreekGrammarStats();
  const [view, setView] = useState('list'); // list | guide | quiz | results
  const [activeTopic, setActiveTopic] = useState(null);
  const [result, setResult] = useState(null);

  const topicStats = stats.topics || {};

  const openTopic = (topic) => {
    setActiveTopic(topic);
    setView('guide');
  };

  const startQuiz = () => {
    setResult(null);
    setView('quiz');
  };

  const handleQuizComplete = (score, total) => {
    saveGreekGrammarResult(activeTopic.id, activeTopic.title, score, total);
    setResult({ score, total });
    setView('results');
  };

  if (view === 'quiz' && activeTopic) {
    return (
      <GreekGrammarQuiz
        topic={activeTopic}
        onExit={() => setView('guide')}
        onComplete={handleQuizComplete}
      />
    );
  }

  if (view === 'results' && activeTopic && result) {
    const pct = Math.round((result.score / result.total) * 100);
    return (
      <div className="greek-grammar-results">
        <PartyPopper size={40} strokeWidth={1.6} className="greek-grammar-results-icon" />
        <h2>{pct >= 80 ? 'Ajoyib natija!' : pct >= 50 ? 'Yaxshi natija!' : 'Davom eting!'}</h2>
        <p>{result.score}/{result.total} to'g'ri javob ({pct}%)</p>
        <div className="greek-grammar-results-actions">
          <button className="greek-grammar-results-retry" onClick={startQuiz}>
            <RotateCcw size={15} strokeWidth={2.2} /> Qayta urinish
          </button>
          <button className="greek-grammar-results-back" onClick={() => setView('list')}>
            Mavzular ro'yxati
          </button>
        </div>
      </div>
    );
  }

  if (view === 'guide' && activeTopic) {
    const blocks = parseGuide(activeTopic.guide);
    const best = topicStats[activeTopic.id]?.bestScore;
    const bestTotal = topicStats[activeTopic.id]?.totalQuestions;
    return (
      <div className="greek-grammar-guide-page">
        <div className="greek-grammar-guide-header">
          <button className="greek-grammar-back-btn" onClick={() => setView('list')}>
            <ChevronLeft size={18} strokeWidth={2.2} /> Mavzular
          </button>
          <h1>{activeTopic.icon} {activeTopic.title}</h1>
        </div>

        <div className="greek-grammar-guide-body">
          <GuideBlocks blocks={blocks} lang="el-GR" />
        </div>

        <div className="greek-grammar-guide-footer">
          {best !== undefined && (
            <p className="greek-grammar-guide-best">Eng yaxshi natija: {best}/{bestTotal}</p>
          )}
          <button className="greek-grammar-guide-cta" onClick={startQuiz}>
            Mashqlarni boshlash
          </button>
        </div>
      </div>
    );
  }

  // ─── Topic list ───────────────────────────────────────────────────────────
  return (
    <motion.div className="greek-grammar-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="greek-grammar-header">
        <h1 className="greek-grammar-title">Grammatika</h1>
        <p className="greek-grammar-subtitle">{TOPICS.length} ta mavzu — Ελληνική γραμματική</p>
      </div>

      <div className="greek-grammar-topics-grid">
        {TOPICS.map((topic) => {
          const s = topicStats[topic.id];
          const pct = s && s.totalQuestions > 0 ? Math.round((s.bestScore / s.totalQuestions) * 100) : 0;
          return (
            <motion.div
              key={topic.id}
              className={`greek-grammar-topic-card ${s ? 'completed' : ''}`}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openTopic(topic)}
              role="button"
              tabIndex={0}
            >
              <div className="greek-grammar-topic-icon">{topic.icon}</div>
              <div className="greek-grammar-topic-body">
                <h3>{topic.title}</h3>
                {s ? (
                  <span className="greek-grammar-topic-badge done">{pct}% eng yaxshi natija</span>
                ) : (
                  <span className="greek-grammar-topic-badge">Boshlanmagan</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
