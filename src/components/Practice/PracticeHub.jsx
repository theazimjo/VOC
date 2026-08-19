import { motion } from 'framer-motion';
import { Zap, Brain, PenLine, Shuffle, ListChecks, Mic, NotebookPen, GraduationCap, BookOpenText, Timer, Grid3x3 } from 'lucide-react';
import { recommendPracticeMode } from '../../utils/memoryEngine';
import { PRACTICE_MODE_MIN_WORDS } from '../../utils/helpers';
import './PracticeHub.css';

const RECOMMENDATION_BADGES = {
  new: () => 'Recommended 🌟',
  confirm: (count) => `${count} to confirm 🎯`,
  reinforce: (count) => `${count} forgetting ⏰`,
};

export default function PracticeHub({ onSelectMode, isIrregularVerbs, irregularVerbsOnly, isIeltsPack, isEnglishPack, words = [] }) {
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
      title: "Irregular Verbs",
      desc: "Practice V1, V2, V3 verb forms",
      badge: 'Recommended 🌟',
      glowColor: 'hsl(165, 85%, 50%)'
    });
  }

  modes.push({
    id: 'flashcard',
    icon: Brain,
    title: 'Smart Flashcards',
    desc: "Review words with intelligent spaced repetition flashcards",
    badge: recommendation?.modeId === 'flashcard'
      ? RECOMMENDATION_BADGES[recommendation.reason](recommendation.count)
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
      title: 'IELTS Trainer',
      desc: 'Definition recall, synonyms, articles, word family, and collocations',
      badge: 'Min 3 words',
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
      title: 'English Trainer',
      desc: 'Learn words through English definitions, synonyms, and context — no translation',
      badge: 'Min 3 words',
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
      title: 'Spelling Practice',
      desc: isEnglishPack
        ? "Read the English definition and type the word it describes"
        : "Listen and type words correctly from memory",
      badge: recommendation?.modeId === 'spelling'
        ? RECOMMENDATION_BADGES[recommendation.reason](recommendation.count)
        : "Min 3 words",
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
        title: 'Match Game',
        desc: "Match English words with their correct translations",
        badge: "Min 4 words",
        glowColor: 'hsl(150, 80%, 45%)'
      },
      {
        id: 'quiz',
        icon: ListChecks,
        title: 'Multiple Choice Quiz',
        desc: "Select the correct translation from four options",
        badge: "Min 4 words",
        glowColor: 'hsl(38, 95%, 55%)'
      },
      {
        id: 'speed',
        icon: Timer,
        title: 'Speed Round',
        desc: "60 seconds, as many correct answers as you can - beats your own record",
        badge: "Min 4 words",
        glowColor: 'hsl(0, 85%, 60%)'
      },
      {
        id: 'gridmatch',
        icon: Grid3x3,
        title: 'Memory Grid',
        desc: "Flip cards to pair each word with its translation - the grid grows the better you remember",
        badge: "Min 6 words",
        glowColor: 'hsl(280, 80%, 62%)'
      }
    );
  }

  if (!irregularVerbsOnly) {
    modes.push({
      id: 'pronounce',
      icon: Mic,
      title: 'Pronunciation Practice',
      desc: "Speak into the microphone to improve pronunciation",
      badge: "Min 1 word",
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
                    Min {minWords} words needed
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
