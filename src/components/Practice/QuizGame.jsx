import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { shuffleArray, speakWord } from '../../utils/helpers';
import { calculateNextReview } from '../../utils/sm2';
import './QuizGame.css';

export default function QuizGame({ words, onComplete, onUpdateWord }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [results, setResults] = useState({ correctCount: 0, incorrectCount: 0 });

  const currentWord = words[currentIndex];

  useEffect(() => {
    if (currentWord) speakWord(currentWord.word);
  }, [currentIndex, currentWord]);

  useEffect(() => {
    if (!currentWord) return;
    const correctOption = currentWord.translation;
    const otherWords = words.filter(w => w.id !== currentWord.id);
    const wrongOptions = shuffleArray(otherWords).slice(0, 3).map(w => w.translation);
    while (wrongOptions.length < 3) wrongOptions.push(`Variant ${wrongOptions.length + 1}`);
    setOptions(shuffleArray([correctOption, ...wrongOptions]));
    setSelectedOption(null);
    setTimeLeft(15);
  }, [currentIndex, currentWord, words]);

  useEffect(() => {
    if (timeLeft > 0 && !selectedOption) {
      const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(id);
    } else if (timeLeft === 0 && !selectedOption) {
      handleSelect(null);
    }
  }, [timeLeft, selectedOption]);

  const handleSelect = async (option) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    const isCorrect = option === currentWord.translation;
    const sm2Data = calculateNextReview(
      isCorrect ? 4 : 1,
      currentWord.easeFactor || 2.5,
      currentWord.interval || 0,
      currentWord.reviewCount || 0
    );
    await onUpdateWord(currentWord.id, sm2Data);
    setResults(prev => ({
      correctCount: prev.correctCount + (isCorrect ? 1 : 0),
      incorrectCount: prev.incorrectCount + (isCorrect ? 0 : 1)
    }));
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete({
        totalWords: words.length,
        correctCount: results.correctCount + (selectedOption === currentWord.translation ? 0 : 0),
        incorrectCount: results.incorrectCount
      });
      onComplete({ totalWords: words.length, ...results });
    }
  };

  // Recalculate final results correctly on last word
  const handleNextFinal = () => {
    onComplete({ totalWords: words.length, ...results });
  };

  if (!currentWord) return null;

  const isLast = currentIndex === words.length - 1;

  return (
    <div className="quiz-container">
      {/* Progress bar */}
      <div className="quiz-progress-track">
        <div className="quiz-progress-fill" style={{ width: `${((currentIndex) / words.length) * 100}%` }} />
      </div>
      <div className="quiz-progress-label">
        <span>{currentIndex + 1} / {words.length}</span>
        <span className={`quiz-timer ${timeLeft <= 4 ? 'danger' : timeLeft <= 8 ? 'warning' : ''}`}>
          ⏱ {timeLeft}s
        </span>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="quiz-question-card"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ duration: 0.3 }}
        >
          <div className="quiz-question-label">So'zni toping</div>
          <div className="quiz-question">
            {currentWord.word}
            <button
              className="btn-speak-quiz"
              onClick={() => speakWord(currentWord.word)}
              title="Talaffuz"
            >🔊</button>
          </div>
          {currentWord.definition && (
            <div className="quiz-question-hint">{currentWord.definition}</div>
          )}
          <div className="quiz-timer-bar">
            <div
              className="quiz-timer-fill"
              style={{
                width: `${(timeLeft / 15) * 100}%`,
                background: timeLeft <= 4 ? 'var(--error)' : timeLeft <= 8 ? 'var(--warning)' : 'var(--accent-3)'
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Options */}
      <div className="quiz-options">
        {options.map((opt, idx) => {
          let state = 'idle';
          if (selectedOption !== null) {
            if (opt === currentWord.translation) state = 'correct';
            else if (opt === selectedOption) state = 'wrong';
            else state = 'dimmed';
          }
          return (
            <motion.button
              key={`${currentIndex}-${idx}`}
              className={`quiz-option ${state}`}
              onClick={() => handleSelect(opt)}
              disabled={selectedOption !== null}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              whileHover={!selectedOption ? { scale: 1.02 } : {}}
              whileTap={!selectedOption ? { scale: 0.97 } : {}}
            >
              <span className="quiz-option-letter">{['A', 'B', 'C', 'D'][idx]}</span>
              <span className="quiz-option-text">{opt}</span>
              {selectedOption !== null && state === 'correct' && <span className="quiz-option-icon">✓</span>}
              {selectedOption !== null && state === 'wrong' && <span className="quiz-option-icon">✗</span>}
            </motion.button>
          );
        })}
      </div>

      {/* Next button — only appears after answering */}
      <AnimatePresence>
        {selectedOption !== null && (
          <motion.div
            className="quiz-next-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className={`quiz-feedback ${selectedOption === currentWord.translation ? 'correct' : 'wrong'}`}>
              {selectedOption === currentWord.translation
                ? "✨ To'g'ri!"
                : `❌ Javob: ${currentWord.translation}`}
            </div>
            <button
              className="btn-quiz-next"
              onClick={isLast ? handleNextFinal : handleNext}
            >
              {isLast ? 'Natijalar →' : 'Keyingisi →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
