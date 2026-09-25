import { motion } from 'framer-motion';
import { Zap, Brain, PenLine, Shuffle, ListChecks, Mic, Timer } from 'lucide-react';
import { recommendPracticeMode } from '../../utils/memoryEngine';
import { PRACTICE_MODE_MIN_WORDS } from '../../utils/helpers';
import { useLanguage } from '../../contexts/LanguageContext';
import './PracticeHub.css';

const RECOMMENDATION_BADGES = {
  new: () => 'Recommended 🌟',
  confirm: (count) => `${count} to confirm 🎯`,
  reinforce: (count) => `${count} forgetting ⏰`,
};

export default function PracticeHub({ onSelectMode, isIrregularVerbs, irregularVerbsOnly, words = [] }) {
  const { t } = useLanguage();
  const modes = [];

  // Which mode actually fits this word list's current memory state right
  // now (see memoryEngine.recommendPracticeMode) — a word you've only ever
  // passively "Bildim"-ed on a flashcard needs Imlo Mashqi to actually
  // confirm it, not another flashcard pass, so the static badge that used to
  // sit on Flashcard unconditionally is now driven by real data instead.
  const recommendation = recommendPracticeMode(words);

  if (isIrregularVerbs) {
    modes.push({
      id: 'irregular-verbs',
      icon: Zap,
      title: t('practice.irregularVerbsTitle'),
      desc: t('practice.irregularVerbsDesc'),
      badge: t('practice.recBadge'),
      glowColor: 'hsl(165, 85%, 50%)'
    });
  }

  modes.push({
    id: 'flashcard',
    icon: Brain,
    title: t('practice.flashcardsTitle'),
    desc: t('practice.flashcardsDesc'),
    badge: recommendation?.modeId === 'flashcard'
      ? (recommendation.reason === 'new' ? t('practice.recBadge')
        : recommendation.reason === 'confirm' ? t('practice.toConfirmBadge', { count: recommendation.count })
        : t('practice.forgettingBadge', { count: recommendation.count }))
      : null,
    glowColor: 'hsl(200, 90%, 55%)'
  });

  if (!irregularVerbsOnly) {
    modes.push({
      id: 'spelling',
      icon: PenLine,
      title: t('practice.spellingTitle'),
      desc: t('practice.spellingDescGeneric'),
      badge: recommendation?.modeId === 'spelling'
        ? (recommendation.reason === 'new' ? t('practice.recBadge')
          : recommendation.reason === 'confirm' ? t('practice.toConfirmBadge', { count: recommendation.count })
          : t('practice.forgettingBadge', { count: recommendation.count }))
        : t('practice.minWordsBadge', { min: 3 }),
      glowColor: 'hsl(265, 90%, 65%)'
    });
  }

  // The corp Irregular Verbs pack only ever needs the dedicated trainer plus
  // flashcards — Match/Quiz are built around translation recall, not V1/V2/V3
  // conjugation, so they're skipped entirely here.
  if (!irregularVerbsOnly) {
    modes.push(
      {
        id: 'match',
        icon: Shuffle,
        title: t('practice.matchTitle'),
        desc: t('practice.matchDesc'),
        badge: t('practice.minWordsBadge', { min: 4 }),
        glowColor: 'hsl(150, 80%, 45%)'
      },
      {
        id: 'quiz',
        icon: ListChecks,
        title: t('practice.quizTitle'),
        desc: t('practice.quizDesc'),
        badge: t('practice.minWordsBadge', { min: 4 }),
        glowColor: 'hsl(38, 95%, 55%)'
      },
      {
        id: 'speed',
        icon: Timer,
        title: t('practice.speedTitle'),
        desc: t('practice.speedDesc'),
        badge: t('practice.minWordsBadge', { min: 4 }),
        glowColor: 'hsl(0, 85%, 60%)'
      }
    );
  }

  if (!irregularVerbsOnly) {
    modes.push(
      {
        id: 'pronounce',
        icon: Mic,
        title: t('practice.pronounceTitle'),
        desc: t('practice.pronounceDesc'),
        badge: t('practice.minWordsBadge', { min: 1 }),
        glowColor: 'hsl(340, 85%, 60%)'
      }
    );
  }

  return (
    <div className="practice-hub">


      <div className="practice-hub-grid">
        {modes.map((mode, idx) => {
          const minWords = PRACTICE_MODE_MIN_WORDS[mode.id] || 1;
          const isDisabled = words.length < minWords;

          return (
            <motion.div
              key={mode.id}
              className={`practice-mode-card ${isDisabled ? 'disabled' : ''}`}
              onClick={() => !isDisabled && onSelectMode(mode.id)}
              aria-disabled={isDisabled}
              style={{ '--mode-glow-color': mode.glowColor }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07, duration: 0.4 }}
              whileTap={!isDisabled ? { scale: 0.97 } : {}}
            >
              <div className="practice-mode-icon-wrap">
                <mode.icon size={22} strokeWidth={2.1} className="practice-mode-icon" />
              </div>
              <div className="practice-mode-info">
                <h3 className="practice-mode-title">{mode.title}</h3>
                <p className="practice-mode-desc">{mode.desc}</p>
              </div>
              <div className="practice-mode-footer">
                {isDisabled ? (
                  <span className="practice-mode-badge practice-mode-badge-warning">
                    {t('practice.minWordsNeeded', { min: minWords })}
                  </span>
                ) : (
                  mode.badge && <span className="practice-mode-badge">{mode.badge}</span>
                )}
                <span className="practice-mode-arrow">→</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
