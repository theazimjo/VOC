import { motion } from 'framer-motion';
import { Zap, Brain, PenLine, Shuffle, ListChecks, Mic, NotebookPen, GraduationCap, BookOpenText, Timer, Grid3x3 } from 'lucide-react';
import { recommendPracticeMode } from '../../utils/memoryEngine';
import { PRACTICE_MODE_MIN_WORDS } from '../../utils/helpers';
import { useLanguage } from '../../contexts/LanguageContext';
import './PracticeHub.css';

const RECOMMENDATION_BADGES = {
  new: () => 'Recommended 🌟',
  confirm: (count) => `${count} to confirm 🎯`,
  reinforce: (count) => `${count} forgetting ⏰`,
};

export default function PracticeHub({ onSelectMode, isIrregularVerbs, irregularVerbsOnly, isIeltsPack, isEnglishPack, words = [] }) {
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

  // Additive, unlike the Irregular-Verbs-only block below - an IELTS pack
  // still gets every generic mode too, since its words still have
  // word/translation like any other pack. This just adds one more option.
  if (isIeltsPack) {
    modes.push({
      id: 'ielts-trainer',
      icon: GraduationCap,
      title: t('practice.ieltsTrainerTitle'),
      desc: t('practice.ieltsTrainerDesc'),
      badge: t('practice.minWordsBadge', { min: 3 }),
      glowColor: 'hsl(258, 85%, 62%)'
    });
  }

  // English-monolingual packs often leave translation blank on purpose (the
  // whole point is learning through English definitions, not Uzbek), so
  // Match/Quiz — which key off translation as the graded answer — are
  // skipped for them, same reasoning as the Irregular-Verbs-only block
  // below. Pronunciation still works fine either way, so it's kept.
  if (isEnglishPack) {
    modes.push({
      id: 'english-trainer',
      icon: BookOpenText,
      title: t('practice.englishTrainerTitle'),
      desc: t('practice.englishTrainerDesc'),
      badge: t('practice.minWordsBadge', { min: 3 }),
      glowColor: 'hsl(210, 90%, 58%)'
    });
  }

  // Spelling is the only OTHER active-recall (typing) drill in the app
  // besides Pronunciation — without it, an English-monolingual pack would
  // never be able to satisfy the "confirmed from 2 distinct angles" gate in
  // spacedRepetition.js (MIN_CONFIRMED_MODES), permanently capping mastery
  // at 65% no matter how many correct answers a word gets. word.definition
  // is a required field on every English-pack word (unlike translation), so
  // SpellingGame can safely use it as the prompt instead for this pack type.
  if (!irregularVerbsOnly) {
    modes.push({
      id: 'spelling',
      icon: PenLine,
      title: t('practice.spellingTitle'),
      desc: isEnglishPack
        ? t('practice.spellingDescEnglish')
        : t('practice.spellingDescGeneric'),
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
  if (!irregularVerbsOnly && !isEnglishPack) {
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
      },
      {
        id: 'gridmatch',
        icon: Grid3x3,
        title: t('practice.gridmatchTitle'),
        desc: t('practice.gridmatchDesc'),
        badge: t('practice.minWordsBadge', { min: 6 }),
        glowColor: 'hsl(280, 80%, 62%)'
      }
    );
  }

  if (!irregularVerbsOnly) {
    modes.push({
      id: 'pronounce',
      icon: Mic,
      title: t('practice.pronounceTitle'),
      desc: t('practice.pronounceDesc'),
      badge: t('practice.minWordsBadge', { min: 1 }),
      glowColor: 'hsl(340, 85%, 60%)'
    });
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
              <h3 className="practice-mode-title">{mode.title}</h3>
              <p className="practice-mode-desc">{mode.desc}</p>
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
