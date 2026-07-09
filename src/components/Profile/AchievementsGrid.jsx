import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Trophy, Flame, Lock } from 'lucide-react';
import { usePacks } from '../../hooks/usePacks';
import { useStreak } from '../../hooks/useStreak';
import { getAchievementProgress } from '../../utils/achievements';
import './AchievementsGrid.css';

const ICONS = { BookOpen, CheckCircle2, Trophy, Flame };

const CATEGORY_LABELS = {
  words: "So'zlar",
  mastered: "O'zlashtirish",
  streak: 'Seriya'
};

export default function AchievementsGrid() {
  const { allWords } = usePacks();
  const { streak } = useStreak();

  const totalWords = allWords.length;
  const masteredWords = allWords.filter(w => (w.mastery || 0) >= 80).length;
  const streakCount = streak?.streakCount || 0;

  const achievements = getAchievementProgress({ totalWords, masteredWords, streakCount });
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const categories = ['words', 'mastered', 'streak'];

  return (
    <div className="achievements-section">
      <div className="achievements-header">
        <h3>Yutuqlar</h3>
        <span className="achievements-count">{unlockedCount} / {achievements.length}</span>
      </div>

      {categories.map(category => {
        const items = achievements.filter(a => a.category === category);
        return (
          <div key={category} className="achievements-category">
            <div className="achievements-category-label">{CATEGORY_LABELS[category]}</div>
            <div className="achievements-grid">
              {items.map((a, idx) => {
                const Icon = ICONS[a.icon];
                return (
                  <motion.div
                    key={a.id}
                    className={`achievement-badge ${a.unlocked ? 'unlocked' : 'locked'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    title={a.desc}
                  >
                    <div className="achievement-badge-icon">
                      {a.unlocked ? <Icon size={22} strokeWidth={2.1} /> : <Lock size={18} strokeWidth={2.1} />}
                    </div>
                    <div className="achievement-badge-title">{a.title}</div>
                    <div className="achievement-badge-desc">
                      {a.unlocked ? a.desc : `${Math.min(a.current, a.threshold)} / ${a.threshold}`}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
