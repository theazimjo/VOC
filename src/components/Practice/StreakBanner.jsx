import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import './StreakBanner.css';

const COPY = {
  uz: {
    newTitle: 'Yangi streak!', days: (n) => `${n} kun ketma-ket`,
    left: (n) => `Streak uchun bugun yana ${n} ta so'z`, progress: (a, b) => `${a} / ${b} ta so'z`,
    kept: (n) => `Bugungi maqsad bajarildi · ${n} kun ketma-ket`,
  },
  ru: {
    newTitle: 'Новая серия!', days: (n) => `${n} дн. подряд`,
    left: (n) => `Для серии сегодня ещё ${n} слов`, progress: (a, b) => `${a} / ${b} слов`,
    kept: (n) => `Цель на сегодня выполнена · ${n} дн. подряд`,
  },
  en: {
    newTitle: 'New streak!', days: (n) => `${n} day streak`,
    left: (n) => `${n} more words today for your streak`, progress: (a, b) => `${a} / ${b} words`,
    kept: (n) => `Today's goal done · ${n} day streak`,
  },
};

// Shown on a results screen: the streak went up, today's goal is still open, or it was already met.
// `info` = { increased, after, todayCount, goal } from incrementActivity().
export default function StreakBanner({ info }) {
  const { language } = useLanguage();
  const c = COPY[language] || COPY.en;
  if (!info) return null;
  const { increased, after, todayCount, goal } = info;

  if (increased) {
    return (
      <motion.div
        className="streak-banner is-new"
        initial={{ opacity: 0, y: 14, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.25 }}
        role="status"
      >
        <motion.span
          className="streak-banner-flame"
          animate={{ scale: [1, 1.18, 1], rotate: [0, -6, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Flame size={34} strokeWidth={2.4} />
        </motion.span>
        <span className="streak-banner-text">
          <strong>{c.newTitle}</strong>
          <span className="streak-banner-days">{c.days(after)}</span>
        </span>
        <span className="streak-banner-count">{after}</span>
      </motion.div>
    );
  }

  if (todayCount < goal) {
    const pct = Math.min(100, Math.round((todayCount / goal) * 100));
    return (
      <div className="streak-banner is-progress" role="status">
        <span className="streak-banner-flame is-dim"><Flame size={26} strokeWidth={2.4} /></span>
        <span className="streak-banner-text">
          <strong>{c.left(goal - todayCount)}</strong>
          <span className="streak-banner-bar"><i style={{ width: `${pct}%` }} /></span>
          <span className="streak-banner-days">{c.progress(todayCount, goal)}</span>
        </span>
      </div>
    );
  }

  return (
    <div className="streak-banner is-kept" role="status">
      <span className="streak-banner-flame"><Flame size={26} strokeWidth={2.4} /></span>
      <span className="streak-banner-text"><strong>{c.kept(after)}</strong></span>
    </div>
  );
}
