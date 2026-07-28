import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, BellRing, Flame, FileEdit, ChevronRight, Brain, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePacks } from '../hooks/usePacks';
import { useStreak } from '../hooks/useStreak';
import { getMasteryLevel } from '../utils/spacedRepetition';
import { computeRecallProbability } from '../utils/memoryEngine';
import { getConfusionPairs } from '../experiment/experimentDB';
import OnboardingModal from '../components/Onboarding/OnboardingModal';
import WhatsNewModal, { WHATS_NEW_VERSION } from '../components/Onboarding/WhatsNewModal';
import './Dashboard.css';

const WEEKDAY_LABELS = ['Ya', 'Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sh'];

function getLocalDateString(d) {
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60 * 1000).toISOString().split('T')[0];
}

/** Current recall probability P(t) = e^(-t/S) for a word, given its stability and last review. */
function getRecallInfo(word) {
  const stability = typeof word.stability === 'number' ? word.stability : 1.0;
  const daysSince = word.lastReviewed ? (Date.now() - new Date(word.lastReviewed).getTime()) / 86400000 : 0;
  const pct = Math.round(computeRecallProbability(stability, daysSince) * 100);
  const color = pct < 50 ? 'var(--error)' : pct < 75 ? 'var(--warning)' : 'var(--success)';
  return { pct, color };
}

function getWeekActivity(activityLog = {}, dailyGoal = 5) {
  const today = new Date();
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = getLocalDateString(d);
    const count = activityLog[dateStr] || 0;
    days.push({
      date: dateStr,
      label: WEEKDAY_LABELS[d.getDay()],
      met: count >= dailyGoal,
      isToday: i === 0
    });
  }
  return days;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { allWords, packs, loading: packsLoading } = usePacks();
  const { streak } = useStreak();
  const [recentWords, setRecentWords] = useState([]);
  const [dueWordsList, setDueWordsList] = useState([]);
  const [totalWords, setTotalWords] = useState(0);
  const [masteredWords, setMasteredWords] = useState(0);
  const [dueWords, setDueWords] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  const [confusionPairs, setConfusionPairs] = useState([]);
  const navigate = useNavigate();

  // One-time fetch (not a realtime listener, matching Memory Lab's own
  // usage) — just enough to surface the single most useful Memory Twin
  // insight on the dashboard without duplicating Memory Lab's full state.
  useEffect(() => {
    if (!user) return;
    getConfusionPairs(user.uid).then(setConfusionPairs).catch(() => setConfusionPairs([]));
  }, [user]);

  useEffect(() => {
    if (!user || packsLoading) return;
    const onboardingDone = localStorage.getItem(`voc-onboarding-done-${user.uid}`);
    const needsOnboarding = !onboardingDone && packs.length === 0;

    if (needsOnboarding) {
      setShowOnboarding(true);
      return;
    }

    const whatsNewSeen = localStorage.getItem(`voc-whatsnew-seen-${WHATS_NEW_VERSION}-${user.uid}`);
    if (!whatsNewSeen) {
      setShowWhatsNew(true);
    }
  }, [user, packsLoading, packs]);

  const handleCloseWhatsNew = () => {
    if (user) localStorage.setItem(`voc-whatsnew-seen-${WHATS_NEW_VERSION}-${user.uid}`, 'true');
    setShowWhatsNew(false);
  };

  useEffect(() => {
    if (!user) return;

    setTotalWords(allWords.length);
    setMasteredWords(allWords.filter(w => (w.mastery || 0) >= 80).length);

    const now = new Date();
    const due = allWords.filter(w => !w.nextReview || new Date(w.nextReview) <= now);
    setDueWords(due.length);
    // Most at-risk first — lowest current recall probability, not just oldest due date,
    // since two overdue words with different stability forget at different rates.
    const dueSorted = [...due].sort((a, b) => getRecallInfo(a).pct - getRecallInfo(b).pct);
    setDueWordsList(dueSorted.slice(0, 6));

    const sorted = [...allWords].sort((a, b) => new Date(b.addedAt || 0) - new Date(a.addedAt || 0));
    setRecentWords(sorted.slice(0, 6));
  }, [user, allWords]);

  const weekActivity = useMemo(
    () => getWeekActivity(streak?.activityLog, streak?.dailyGoal || 5),
    [streak]
  );

  // The single most useful thing the memory model can tell the user right
  // now — prefers a concrete confusion pair (the strongest, most "it knows
  // me" signal) over the generic retention estimate, and says nothing at
  // all rather than showing a hollow stat when there isn't enough history.
  const memoryTwin = useMemo(() => {
    const reviewed = allWords.filter(w => w.lastReviewed);
    if (reviewed.length === 0) return null;

    const now = Date.now();
    let totalP = 0;
    let atRisk = 0;
    reviewed.forEach(w => {
      const stability = typeof w.stability === 'number' ? w.stability : 1.0;
      const daysSince = (now - new Date(w.lastReviewed).getTime()) / 86400000;
      const p = computeRecallProbability(stability, daysSince);
      totalP += p;
      if (p < 0.5) atRisk++;
    });
    const avgRetention = Math.round((totalP / reviewed.length) * 100);
    const topConfusion = [...confusionPairs].sort((a, b) => (b.count || 0) - (a.count || 0))[0] || null;

    return { avgRetention, atRisk, topConfusion };
  }, [allWords, confusionPairs]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6)  return 'Assalomu alaykum';
    if (hour < 12) return 'Xayrli tong';
    if (hour < 18) return 'Xayrli kun';
    return 'Xayrli kech';
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Foydalanuvchi';
  const masteryPercent = totalWords > 0
    ? Math.round(allWords.reduce((sum, w) => sum + (w.mastery || 0), 0) / totalWords)
    : 0;
  const showDue = dueWordsList.length > 0;
  const wordsToShow = showDue ? dueWordsList : recentWords;

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

      {/* ── Weekly Activity Strip ── */}
      <motion.div className="dash-week-strip" {...fadeUp(0.05)}>
        {weekActivity.map((d) => (
          <div key={d.date} className={`week-day ${d.met ? 'met' : ''} ${d.isToday ? 'today' : ''}`}>
            <div className="week-day-dot">{d.met && <Flame size={12} strokeWidth={2.5} />}</div>
            <span className="week-day-label">{d.label}</span>
          </div>
        ))}
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
          <div className="dash-stat-label">Bugungi review</div>
        </div>
      </motion.div>

      {/* ── Memory Twin Insight ── */}
      {memoryTwin && (
        <motion.div className="dash-memtwin-card" {...fadeUp(0.1)}>
          <div className="dash-memtwin-header">
            <span className="dash-memtwin-icon"><Brain size={18} strokeWidth={2.2} /></span>
            <span className="dash-memtwin-title">Memory Twin</span>
          </div>

          {memoryTwin.topConfusion ? (
            <>
              <p className="dash-memtwin-text">
                Siz <strong>{memoryTwin.topConfusion.wordA}</strong> va <strong>{memoryTwin.topConfusion.wordB}</strong> so'zlarini ko'pincha aralashtirayapsiz.
              </p>
              <p className="dash-memtwin-sub">
                <AlertTriangle size={13} strokeWidth={2.3} /> Tavsiya: solishtirib mashq qilish (Contrastive Review)
              </p>
              <Link to="/experiment" className="dash-memtwin-link">Hozir tuzatish →</Link>
            </>
          ) : (
            <>
              <p className="dash-memtwin-text">
                Oxirgi o'rgangan so'zlaringizni o'rtacha <strong>{memoryTwin.avgRetention}%</strong> ehtimol bilan eslayapsiz.
              </p>
              {memoryTwin.atRisk > 0 && (
                <p className="dash-memtwin-sub">
                  <AlertTriangle size={13} strokeWidth={2.3} /> {memoryTwin.atRisk} ta so'zda unutish xavfi yuqori
                </p>
              )}
              <Link to="/experiment" className="dash-memtwin-link">Xotiramni ko'rish →</Link>
            </>
          )}
        </motion.div>
      )}

      {/* ── Progress Bar ── */}
      <motion.div className="dash-progress-card" {...fadeUp(0.12)}>
        <div className="dash-progress-header">
          <span className="dash-progress-title" title="So'zlaringizning taxminiy xotira mustahkamlik darajasi (stability asosida hisoblangan)">
            Vocabulary mastery
          </span>
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
      {totalWords > 0 && (
        <motion.div className="dash-cta-section" {...fadeUp(0.16)}>
          <button
            className={`btn-practice-primary ${dueWords > 0 ? 'pulse-border' : ''}`}
            onClick={() => navigate(dueWords > 0 ? '/mixed-practice?filter=due' : '/mixed-practice')}
            id="dashboard-practice-btn"
          >
            {dueWords > 0 ? 'Takrorlashni boshlash' : 'Mashq qilish'}
            {dueWords > 0 && (
              <span className="btn-practice-badge">{dueWords} ta review</span>
            )}
          </button>
        </motion.div>
      )}

      {/* ── Due Today / Recent Words (iOS Inset Grouped List) ── */}
      <motion.div className="dashboard-section" {...fadeUp(0.2)}>
        <div className="dashboard-section-header">
          <h2>{showDue ? 'Bugun takrorlang' : "Oxirgi so'zlar"}</h2>
          <Link to={showDue ? '/mixed-practice' : '/library'} className="ios-link">
            {showDue ? 'Mashq qilish' : 'Barchasi'}
          </Link>
        </div>

        {wordsToShow.length > 0 ? (
          <div className="recent-words-list">
            {wordsToShow.map((word, idx) => {
              const masteryInfo = getMasteryLevel(word.mastery || 0);
              const recall = showDue ? getRecallInfo(word) : null;
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
                    {recall ? (
                      <span className="word-mastery-percent" style={{ color: recall.color }} title="Hozirgi eslab qolish ehtimoli">
                        {recall.pct}%
                      </span>
                    ) : (
                      <span className="word-mastery-percent" style={{ color: masteryInfo.color }}>
                        {word.mastery || 0}%
                      </span>
                    )}
                    <ChevronRight className="word-chevron" size={16} strokeWidth={2.5} />
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

      {showOnboarding && (
        <OnboardingModal onClose={() => setShowOnboarding(false)} />
      )}

      {showWhatsNew && (
        <WhatsNewModal onClose={handleCloseWhatsNew} />
      )}

    </div>
  );
}