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
  streak: "Seriya"
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
    <div className="ios-achievements-section">
      <div className="ios-achievements-header">
        <h3>Yutuqlar</h3>
        <span className="ios-achievements-count">
          {unlockedCount} / {achievements.length}
        </span>
      </div>

      {categories.map(category => {
        const items = achievements.filter(a => a.category === category);
        return (
          <div key={category} className="ios-achievements-category">
            <div className="ios-achievements-category-label">
              {CATEGORY_LABELS[category]}
            </div>
            <div className="ios-achievements-grid">
              {items.map((a, idx) => {
                const Icon = ICONS[a.icon];
                return (
                  <motion.div
                    key={a.id}
                    className={`ios-achievement-badge ${a.unlocked ? 'unlocked' : 'locked'}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03, duration: 0.2 }}
                    title={a.desc}
                  >
                    <div className="ios-badge-icon">
                      {a.unlocked ? (
                        <Icon size={24} strokeWidth={2.2} />
                      ) : (
                        <Lock size={18} strokeWidth={2.2} />
                      )}
                    </div>
                    <div className="ios-badge-title">{a.title}</div>
                    <div className="ios-badge-desc">
                      {a.unlocked
                        ? a.desc
                        : `${Math.min(a.current, a.threshold)} / ${a.threshold}`}
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