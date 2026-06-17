import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
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
  const [profile, setProfile] = useState({ xp: 0, streak: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const profileRef = ref(db, `users/${user.uid}/profile`);
    const unsubscribe = onValue(profileRef, (snap) => {
      if (snap.exists()) {
        const val = snap.val();
        setProfile({
          xp: val.xp || 0,
          streak: val.streak || 0,
          lastActiveDate: val.lastActiveDate || '',
          ...val
        });
      }
    });
    return () => unsubscribe();
  }, [user]);

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
      {/* Greeting & Gamification Badges */}
      <motion.div className="dashboard-banner-card" variants={itemVariants}>
        <div className="banner-mesh-bg"></div>
        <div className="banner-content">
          <span className="banner-sub">Xush kelibsiz</span>
          <h1 className="banner-title">
            {getGreeting()}, <span>{displayName}</span>! 👋
          </h1>
          <p className="banner-text">
            Streakingizni saqlab qolish va XP yig'ish uchun bugungi darslarni yakunlang!
          </p>
          <div className="banner-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/practice')}>
              Mashqni Boshlash 🚀
            </button>
          </div>
        </div>
        
        <div className="dashboard-game-stats">
          <motion.div 
            className="game-stat-badge streak-badge" 
            title="Kunlik seriya (Streak)"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <span className="badge-icon">🔥</span>
            <span className="badge-text">{profile.streak} kun</span>
          </motion.div>
          <motion.div 
            className="game-stat-badge xp-badge" 
            title="Jami tajriba (XP)"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <span className="badge-icon">⚡</span>
            <span className="badge-text">{profile.xp} XP</span>
          </motion.div>
          <motion.div 
            className="game-stat-badge level-badge" 
            title="Foydalanuvchi darajasi"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <span className="badge-icon">👑</span>
            <span className="badge-text">LVL {Math.floor(profile.xp / 500) + 1}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* 3-metric Stats Grid */}
      <motion.div className="stats-grid" variants={itemVariants}>
        {/* Total Words */}
        <motion.div className="stat-card stat-card-indigo" whileHover={{ y: -6 }}>
          <div className="stat-card-bg-glow"></div>
          <div className="stat-card-icon">📚</div>
          <div className="stat-card-value">{totalWords}</div>
          <div className="stat-card-label">Lug'at hajmi (so'z)</div>
        </motion.div>

        {/* Mastered Words */}
        <motion.div className="stat-card stat-card-gold" whileHover={{ y: -6 }}>
          <div className="stat-card-bg-glow"></div>
          <div className="stat-card-icon">🏆</div>
          <div className="stat-card-value">{masteredWords}</div>
          <div className="stat-card-label">O'zlashtirilgan so'zlar</div>
          
          <div className="stat-progress-container">
            <div className="stat-progress-bar">
              <motion.div 
                className="stat-progress-fill" 
                initial={{ width: 0 }}
                animate={{ width: `${masteryPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <span className="stat-progress-text">{masteryPercent}% o'zlashtirildi</span>
          </div>
        </motion.div>

        {/* Practice/Due Status */}
        <motion.div 
          className={`stat-card ${dueWords > 0 ? 'stat-card-warning clickable-card' : 'stat-card-success'}`} 
          whileHover={{ y: -6 }}
          onClick={() => dueWords > 0 && navigate('/practice')}
          title={dueWords > 0 ? "Mashq qilish uchun bosing" : ""}
          style={{ cursor: dueWords > 0 ? 'pointer' : 'default' }}
        >
          <div className="stat-card-bg-glow"></div>
          <div className="stat-card-icon">{dueWords > 0 ? '🧠' : '🎉'}</div>
          
          {dueWords > 0 ? (
            <>
              <div className="stat-card-value text-warning pulse-value">{dueWords} ta</div>
              <div className="stat-card-label">Takrorlanadigan so'zlar bor</div>
              <div className="stat-status-badge badge-warning-pulsing">Mashq darsi tayyor →</div>
            </>
          ) : (
            <>
              <div className="stat-card-value text-success">Tayyor!</div>
              <div className="stat-card-label">Hamma so'zlar takrorlandi</div>
              <div className="stat-status-badge badge-success-static">Hammasi o'zlashtirildi ✓</div>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Recent Words */}
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
