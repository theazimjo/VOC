import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  const [diagResult, setDiagResult] = useState(null);
  const navigate = useNavigate();

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
    setMasteredWords(allWords.filter(w => w.mastery >= 80).length);
    
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

  return (
    <motion.div 
      className="dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Greeting */}
      <motion.div className="dashboard-greeting" variants={itemVariants}>
        <h1>{getGreeting()}, <span>{displayName}</span>! 👋</h1>
        <p>Bugun yangi so'zlar o'rganishga tayyormisiz?</p>
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
            alignItems: 'flex-start'
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

      {/* Due Words Alert */}
      {dueWords > 0 && (
        <motion.div className="due-words-alert" variants={itemVariants}>
          <div className="due-words-alert-text">
            <span className="icon">🧠</span>
            <div>
              <h3>{dueWords} ta so'z takrorlashni kutmoqda</h3>
              <p>Spaced repetition bilan so'zlarni mustahkamlang</p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/practice')}>
            Takrorlash →
          </button>
        </motion.div>
      )}

      {/* Stats Grid */}
      <motion.div className="stats-grid" variants={itemVariants}>
        <motion.div className="stat-card" whileHover={{ y: -4 }}>
          <div className="stat-card-icon">📝</div>
          <div className="stat-card-value">{totalWords}</div>
          <div className="stat-card-label">Jami so'zlar</div>
        </motion.div>
        <motion.div className="stat-card" whileHover={{ y: -4 }}>
          <div className="stat-card-icon">📚</div>
          <div className="stat-card-value">{books.length}</div>
          <div className="stat-card-label">Kitoblar</div>
        </motion.div>
        <motion.div className="stat-card" whileHover={{ y: -4 }}>
          <div className="stat-card-icon">🏆</div>
          <div className="stat-card-value">{masteredWords}</div>
          <div className="stat-card-label">O'zlashtirilgan</div>
        </motion.div>
        <motion.div className="stat-card" whileHover={{ y: -4 }}>
          <div className="stat-card-icon">📦</div>
          <div className="stat-card-value">{packs.length}</div>
          <div className="stat-card-label">To'plamlar</div>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <div className="dashboard-section-header">
          <h2>⚡ Tezkor harakatlar</h2>
        </div>
        <div className="quick-actions">
          <Link to="/books" className="quick-action-card">
            <div className="quick-action-icon" style={{ background: 'var(--accent-1-dim)' }}>📚</div>
            <div className="quick-action-text">
              <h3>Kitob qo'shish</h3>
              <p>Yangi kitob uchun so'zlar to'plami yarating</p>
            </div>
          </Link>
          <Link to="/packs" className="quick-action-card">
            <div className="quick-action-icon" style={{ background: 'var(--accent-2-dim)' }}>📦</div>
            <div className="quick-action-text">
              <h3>To'plam yaratish</h3>
              <p>Mavzu bo'yicha so'zlarni guruhlang</p>
            </div>
          </Link>
          <Link to="/practice" className="quick-action-card">
            <div className="quick-action-icon" style={{ background: 'var(--accent-3-dim)' }}>🎮</div>
            <div className="quick-action-text">
              <h3>Mashq qilish</h3>
              <p>5 xil usulda so'zlarni o'rganing</p>
            </div>
          </Link>
          <Link to="/stats" className="quick-action-card">
            <div className="quick-action-icon" style={{ background: 'var(--warning-dim)' }}>📈</div>
            <div className="quick-action-text">
              <h3>Statistika</h3>
              <p>O'rganish jarayoningizni kuzating</p>
            </div>
          </Link>
        </div>
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
