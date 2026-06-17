import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../hooks/useBooks';
import { usePacks } from '../hooks/usePacks';
import { getMasteryLevel } from '../utils/sm2';
import { runFirestoreDiagnostic } from '../utils/diagnostic';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const { books } = useBooks();
  const { packs } = usePacks();
  const [recentWords, setRecentWords] = useState([]);
  const [totalWords, setTotalWords] = useState(0);
  const [masteredWords, setMasteredWords] = useState(0);
  const [dueWords, setDueWords] = useState(0);
  const [activeWordsCount, setActiveWordsCount] = useState(0);
  const [profile, setProfile] = useState({ xp: 0, streak: 0 });
  const [diagResult, setDiagResult] = useState(null);
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

    // Run database diagnostics
    const checkDatabaseConnection = async () => {
      const result = await runFirestoreDiagnostic(user.uid);
      if (!result.success) {
        setDiagResult(result);
      } else {
        setDiagResult(null);
      }
    };

    checkDatabaseConnection();
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

    // Active words: mastery >= 75 or has custom sentence
    const activeCount = allWords.filter(w => (w.mastery || 0) >= 75 || (w.customSentence && w.customSentence.trim() !== '')).length;
    setActiveWordsCount(activeCount);

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
              Darsni Boshlash 🚀
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

      {/* Diagnostic Warning */}
      {diagResult && (
        <motion.div 
          className="diagnostic-alert" 
          variants={itemVariants}
          style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid hsla(0, 80%, 60%, 0.4)',
            padding: 'var(--space-md)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-lg)',
            color: 'hsl(0, 80%, 75%)',
            display: 'flex',
            gap: 'var(--space-md)',
            alignItems: 'flex-start',
            position: 'relative',
            zIndex: 1
          }}
        >
          <span style={{ fontSize: '1.5rem', lineHeight: '1' }}>⚠️</span>
          <div>
            <h3 style={{ color: 'hsl(0, 80%, 75%)', marginTop: 0, marginBottom: 'var(--space-xs)', fontSize: 'var(--font-md)' }}>
              Firebase Serveri bilan ulanishda muammo! (Ma'lumotlar saqlanmayapti)
            </h3>
            <p style={{ margin: 0, fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              {diagResult.message}
            </p>
            <div style={{ marginTop: 'var(--space-xs)', fontSize: 'var(--font-xs)', color: 'var(--text-muted)' }}>
              * Hozir kiritayotgan ma'lumotlaringiz faqat brauzer xotirasida (keshda) vaqtincha saqlanmoqda. Sahifa yangilansa yoki tizimdan chiqilsa, ular o'chib ketishi mumkin.
            </div>
          </div>
        </motion.div>
      )}

      {/* Simplified 3-metric Stats Grid */}
      <motion.div className="stats-grid" variants={itemVariants}>
        <motion.div className="stat-card" whileHover={{ y: -4 }}>
          <div className="stat-card-icon">📚</div>
          <div className="stat-card-value">{totalWords}</div>
          <div className="stat-card-label">Lug'at hajmi (so'z)</div>
        </motion.div>
        <motion.div className="stat-card" whileHover={{ y: -4 }}>
          <div className="stat-card-icon">🏆</div>
          <div className="stat-card-value">
            {masteredWords} <span className="stat-card-sub">/ {totalWords}</span>
          </div>
          <div className="stat-card-label">O'zlashtirilgan so'zlar</div>
        </motion.div>
        <motion.div 
          className={`stat-card ${dueWords > 0 ? 'clickable-card' : ''}`} 
          whileHover={dueWords > 0 ? { y: -4 } : {}}
          onClick={() => dueWords > 0 && navigate('/practice')}
          title={dueWords > 0 ? "Takrorlashni boshlash uchun bosing" : ""}
          style={{ cursor: dueWords > 0 ? 'pointer' : 'default' }}
        >
          <div className="stat-card-icon">🧠</div>
          <div className="stat-card-value" style={{ color: dueWords > 0 ? 'var(--warning)' : 'var(--success)' }}>
            {dueWords > 0 ? `${dueWords} ta` : 'Hamma so\'z tayyor! 🎉'}
          </div>
          <div className="stat-card-label">Takrorlash uchun</div>
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
                >
                  <div className="word-info">
                    <span style={{ fontSize: '1.2rem' }}>{masteryInfo.icon}</span>
                    <div>
                      <div className="word-text">{word.word}</div>
                      <div className="word-translation">{word.translation}</div>
                    </div>
                  </div>
                  <div className="word-info" style={{ gap: 'var(--space-lg)' }}>
                    <span className="badge badge-accent">{word.source}</span>
                    <span className="word-mastery" style={{ color: masteryInfo.color }}>
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
            <p>Kitob yoki to'plam ochib, birinchi so'zingizni qo'shing!</p>
            <Link to="/books" className="btn btn-primary">Boshlash →</Link>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
