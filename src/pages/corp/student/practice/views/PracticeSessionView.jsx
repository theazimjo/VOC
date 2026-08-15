import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import Flashcard from '../../../../../components/Practice/Flashcard';
import SpellingGame from '../../../../../components/Practice/SpellingGame';
import MatchGame from '../../../../../components/Practice/MatchGame';
import QuizGame from '../../../../../components/Practice/QuizGame';
import PronounceGame from '../../../../../components/Practice/PronounceGame';
import SentenceBuilder from '../../../../../components/Practice/SentenceBuilder';
import IrregularVerbsTrainer from '../../../../../components/Practice/IrregularVerbsTrainer';

export default function PracticeSessionView({ p }) {
  const {
    allWords, handleAnswer, handleBack, handleComplete, handleUpdateWord,
    loadedPack, practiceWords, progressPct, selectedMode, setProgressPct,
  } = p;

  const renderPracticeMode = () => {
    const props = {
      words: practiceWords,
      allWords,
      onComplete: handleComplete,
      onUpdateWord: handleUpdateWord, // Syncs spaced repetition statistics
      onAnswer: handleAnswer,
      onExit: handleBack,
      sourceName: loadedPack.title || "Kutubxona",
      language: loadedPack.language || 'en-US',
      isEnglishPack: loadedPack?.type === 'english' || loadedPack?.type === 'monolingual',
      onProgress: (current, total) => setProgressPct(total > 0 ? (current / total) * 100 : 0)
    };

    switch (selectedMode) {
      case 'flashcard': return <Flashcard {...props} />;
      case 'spelling': return <SpellingGame {...props} />;
      case 'match': return <MatchGame {...props} />;
      case 'quiz': return <QuizGame {...props} />;
      case 'pronounce': return <PronounceGame {...props} />;
      case 'sentence': return <SentenceBuilder {...props} />;
      case 'irregular-verbs': return <IrregularVerbsTrainer {...props} />;
      default: return null;
    }
  };

  return (
    <motion.div
      key="practice"
      className="practice-session"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="practice-session-header clean-quiz-header">
        <button className="clean-back-arrow" onClick={handleBack} title="Exit practice">
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>
        <h1 className="clean-quiz-title">
          {selectedMode === 'flashcard' ? '🧠 Smart Flashcards' : selectedMode === 'spelling' ? '✍️ Spelling Practice' : selectedMode === 'match' ? '🔀 Match Game' : selectedMode === 'quiz' ? '📝 Multiple Choice Quiz' : selectedMode === 'pronounce' ? '🎙️ Pronunciation Practice' : 'Practice'}
        </h1>
        <div style={{ width: '40px', opacity: 0 }}></div>

        <div className="practice-header-progress-track">
          <div
            className="practice-header-progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
      <div className="practice-session-content">
        {renderPracticeMode()}
      </div>
    </motion.div>
  );
}
