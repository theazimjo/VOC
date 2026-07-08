import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, BellRing, Flame, FileEdit } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePacks } from '../hooks/usePacks';
import { useStreak } from '../hooks/useStreak';
import { getMasteryLevel } from '../utils/sm2';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const { allWords } = usePacks();
  const { streak } = useStreak();
  const [recentWords, setRecentWords] = useState([]);
  const [totalWords, setTotalWords] = useState(0);
  const [masteredWords, setMasteredWords] = useState(0);
  const [dueWords, setDueWords] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    setTotalWords(allWords.length);
    setMasteredWords(allWords.filter(w => (w.mastery || 0) >= 80).length);

    const now = new Date();
    setDueWords(allWords.filter(w => !w.nextReview || new Date(w.nextReview) <= now).length);

    const sorted = [...allWords].sort((a, b) => new Date(b.addedAt || 0) - new Date(a.addedAt || 0));
    setRecentWords(sorted.slice(0, 6));
  }, [user, allWords]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6)  return 'Assalomu alaykum';
    if (hour < 12) return 'Xayrli tong';
    if (hour < 18) return 'Xayrli kun';
    return 'Xayrli kech';
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Foydalanuvchi';
  const masteryPercent = totalWords > 0 ? Math.round((masteredWords / totalWords) * 100) : 0;

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.38, delay, ease: [0.22, 1, 0.36, 1] }
  });

  return (
    <div className="dashboard">

      {/* ── Greeting ── */}
      <motion.div className="dash-greeting-section" {...fadeUp(0)}>
        <div className="dash-greeting-row">
          <div>
            <div className="dash-greeting">{getGreeting()}</div>
            <div className="dash-name">{displayName}</div>
          </div>
          {streak && (
            <div
              className={`dash-streak-badge ${(streak.todayCount || 0) >= (streak.dailyGoal || 5) ? 'goal-met' : ''}`}
              title={`Bugungi maqsad: ${streak.todayCount || 0}/${streak.dailyGoal || 5}`}
            >
              <Flame size={18} strokeWidth={2.3} />
              <span>{streak.streakCount || 0}</span>
            </div>
          )}
        </div>
        <div className="dash-subtitle">Bugun qancha so'z o'rganasiz?</div>
      </motion.div>

      {/* ── Stats Row ── */}
      <motion.div className="dash-stats-row" {...fadeUp(0.07)}>
        <div className="dash-stat-card">
          <div className="dash-stat-icon blue"><BookOpen size={20} strokeWidth={2.2} /></div>
          <div className="dash-stat-value blue">{totalWords}</div>
          <div className="dash-stat-label">Jami so'z</div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-icon green"><CheckCircle2 size={20} strokeWidth={2.2} /></div>
          <div className="dash-stat-value green">{masteredWords}</div>
          <div className="dash-stat-label">O'zlashtirilgan</div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-icon orange"><BellRing size={20} strokeWidth={2.2} /></div>
          <div className="dash-stat-value orange">{dueWords}</div>
          <div className="dash-stat-label">Takrorlash</div>
        </div>
      </motion.div>

      {/* ── Progress Bar ── */}
      <motion.div className="dash-progress-card" {...fadeUp(0.12)}>
        <div className="dash-progress-header">
          <span className="dash-progress-title">O'zlashtirish darajasi</span>
          <span className="dash-progress-pct">{masteryPercent}%</span>
        </div>
        <div className="dash-progress-track">
          <motion.div
            className="dash-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${masteryPercent}%` }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>

      {/* ── CTA Button ── */}
      <motion.div className="dash-cta-section" {...fadeUp(0.16)}>
        <button
          className={`btn-practice-primary ${dueWords > 0 ? 'pulse-border' : ''}`}
          onClick={() => navigate('/mixed-practice')}
          id="dashboard-practice-btn"
        >
          Mashq qilish
          {dueWords > 0 && (
            <span className="btn-practice-badge">{dueWords} ta takrorlash</span>
          )}
        </button>
      </motion.div>

      {/* ── Recent Words (iOS Inset Grouped List) ── */}
      <motion.div className="dashboard-section" {...fadeUp(0.2)}>
        <div className="dashboard-section-header">
          <h2>Oxirgi so'zlar</h2>
          <Link to="/library" className="ios-link">Barchasi</Link>
        </div>

        {recentWords.length > 0 ? (
          <div className="recent-words-list">
            {recentWords.map((word, idx) => {
              const masteryInfo = getMasteryLevel(word.mastery || 0);
              return (
                <motion.div
                  key={word.id}
                  className="recent-word-item"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.22 + idx * 0.04 }}
                >
                  <div className="word-mastery-icon" style={{ backgroundColor: `${masteryInfo.color}15`, color: masteryInfo.color }}>
                    {masteryInfo.icon}
                  </div>
                  <div className="word-info">
                    <div className="word-text">{word.word}</div>
                    <div className="word-translation">{word.translation}</div>
                  </div>
                  <div className="word-meta">
                    <span className="word-mastery-percent" style={{ color: masteryInfo.color }}>
                      {word.mastery || 0}%
                    </span>
                    <span className="word-chevron">›</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="dash-empty-state">
            <div className="dash-empty-icon"><FileEdit size={32} strokeWidth={1.8} /></div>
            <h3>Hali so'z qo'shilmagan</h3>
            <p>Kutubxonadan to'plam ochib, birinchi so'zingizni qo'shing!</p>
            <Link to="/library" className="btn-practice-primary empty-btn">
              Kutubxonaga o'tish
            </Link>
          </div>
        )}
      </motion.div>

    </div>
  );
}