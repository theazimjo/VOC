import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../hooks/useBooks';
import { usePacks } from '../hooks/usePacks';
import { getMasteryLevel } from '../utils/sm2';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const { books } = useBooks();
  const { packs } = usePacks();
  const [recentWords, setRecentWords] = useState([]);
  const [totalWords, setTotalWords] = useState(0);
  const [masteredWords, setMasteredWords] = useState(0);
  const [dueWords, setDueWords] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    let allWords = [];

    // Extract nested words from books
    books.forEach(book => {
      const wordsObj = book.words || {};
      Object.keys(wordsObj).forEach(wordId => {
        allWords.push({
          id: wordId,
          ...wordsObj[wordId],
          source: book.title,
          sourceType: 'book'
        });
      });
    });

    // Extract nested words from packs
    packs.forEach(pack => {
      const wordsObj = pack.words || {};
      Object.keys(wordsObj).forEach(wordId => {
        allWords.push({
          id: wordId,
          ...wordsObj[wordId],
          source: pack.name,
          sourceType: 'pack'
        });
      });
    });

    setTotalWords(allWords.length);
    setMasteredWords(allWords.filter(w => (w.mastery || 0) >= 80).length);
    
    const now = new Date();
    setDueWords(allWords.filter(w => !w.nextReview || new Date(w.nextReview) <= now).length);

    // Sort by addedAt and take recent 5
    allWords.sort((a, b) => new Date(b.addedAt || 0) - new Date(a.addedAt || 0));
    setRecentWords(allWords.slice(0, 5));
  }, [user, books, packs]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return "Assalomu alaykum";
    if (hour < 12) return "Xayrli tong";
    if (hour < 18) return "Xayrli kun";
    return "Xayrli kech";
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Foydalanuvchi';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const masteryPercent = totalWords > 0 ? Math.round((masteredWords / totalWords) * 100) : 0;

  return (
    <motion.div 
      className="dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. Compact Stats Summary Card at the top */}
      <motion.div className="dashboard-summary-card" variants={itemVariants}>
        <div className="summary-card-glow"></div>
        <div className="summary-card-header">
          <span className="summary-greeting">{getGreeting()}, {displayName}! 👋</span>
          <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-accent-1-dim text-accent-1 border border-accent-1/20 animate-pulse">
            Tailwind v4 Active
          </span>
        </div>
        
        <div className="summary-stats-row">
          <div className="summary-stat-item">
            <span className="stat-label">Jami so'zlarim</span>
            <span className="stat-value indigo-gradient-text">{totalWords} ta</span>
          </div>
          <div className="summary-stat-divider"></div>
          <div className="summary-stat-item">
            <span className="stat-label">O'zlashtirilgan</span>
            <span className="stat-value gold-gradient-text">{masteredWords} ta</span>
          </div>
        </div>

        <div className="summary-progress-wrapper">
          <div className="summary-progress-bar">
            <motion.div 
              className="summary-progress-fill" 
              initial={{ width: 0 }}
              animate={{ width: `${masteryPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="summary-progress-labels">
            <span>Progress</span>
            <span>{masteryPercent}% o'zlashtirildi</span>
          </div>
        </div>
      </motion.div>

      {/* 2. Prominent Action Button directly below */}
      <motion.div className="dashboard-action-wrapper" variants={itemVariants}>
        <button 
          className={`btn-practice-primary ${dueWords > 0 ? 'pulse-border' : ''}`}
          onClick={() => navigate('/mixed-practice')}
        >
          <span className="btn-practice-content">
            Mashq qilish 🚀 
            {dueWords > 0 && <span className="btn-practice-badge">{dueWords} ta takrorlash</span>}
          </span>
        </button>
      </motion.div>

      {/* 3. Recent Words */}
      <motion.div className="dashboard-section" variants={itemVariants}>
        <div className="dashboard-section-header">
          <h2>🕐 Oxirgi qo'shilgan so'zlar</h2>
        </div>
        {recentWords.length > 0 ? (
          <div className="recent-words-list">
            {recentWords.map((word, idx) => {
              const masteryInfo = getMasteryLevel(word.mastery || 0);
              return (
                <motion.div
                  key={word.id}
                  className="recent-word-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: 6 }}
                >
                  <div className="word-info">
                    <span className="word-mastery-icon" style={{ textShadow: `0 0 10px ${masteryInfo.color}` }}>
                      {masteryInfo.icon}
                    </span>
                    <div>
                      <div className="word-text">{word.word}</div>
                      <div className="word-translation">{word.translation}</div>
                    </div>
                  </div>
                  <div className="word-meta">
                    <span className="word-source-badge">{word.source}</span>
                    <span className="word-mastery-percent" style={{ color: masteryInfo.color }}>
                      {word.mastery || 0}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <h3>Hali so'z qo'shilmagan</h3>
            <p>Kutubxonadan kitob yoki to'plam ochib, birinchi so'zingizni qo'shing!</p>
            <Link to="/library" className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }}>Kutubxonaga o'tish →</Link>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
