import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Check, X } from 'lucide-react';
import { shuffleArray, speakWord } from '../../utils/helpers';
import { calculateNextReview } from '../../utils/sm2';
import './QuizGame.css';

export default function QuizGame({ words, onComplete, onUpdateWord, onAnswer, onProgress }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // the chosen option text
  const [answered, setAnswered] = useState(false);            // explicit answered flag
  const [timedOut, setTimedOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const currentWord = words[currentIndex];

  // Report progress
  useEffect(() => {
    if (onProgress && words) {
      onProgress(currentIndex, words.length);
    }
  }, [currentIndex, words, onProgress]);

  // Autoplay pronunciation
  useEffect(() => {
    if (currentWord) speakWord(currentWord.word);
  }, [currentIndex, currentWord]);

  // Build options when word changes
  useEffect(() => {
    if (!currentWord) return;
    const correctOption = currentWord.translation;
    const otherWords = words.filter(w => w.id !== currentWord.id && w.translation !== correctOption);
    const wrongOptions = shuffleArray(otherWords).slice(0, 3).map(w => w.translation);
    while (wrongOptions.length < 3) wrongOptions.push(`Variant ${wrongOptions.length + 1}`);
    setOptions(shuffleArray([correctOption, ...wrongOptions]));
  }, [currentIndex]);

  // Timer — only ticks when not yet answered
  useEffect(() => {
    if (answered) return;
    if (timeLeft <= 0) {
      // Time's up — mark as wrong without selecting any option
      setTimedOut(true);
      setAnswered(true);
      setIncorrectCount(c => c + 1);
      if (onAnswer) onAnswer(currentWord, false);
      const sm2Data = calculateNextReview(1, currentWord);
      onUpdateWord(currentWord.id, sm2Data);
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, answered]);

  const handleSelect = useCallback(async (option) => {
    if (answered) return;
    setSelectedOption(option);
    setAnswered(true);

    const isCorrect = option === currentWord.translation;
    if (onAnswer) onAnswer(currentWord, isCorrect);

    const sm2Data = calculateNextReview(isCorrect ? 4 : 1, currentWord);
    onUpdateWord(currentWord.id, sm2Data);

    if (isCorrect) setCorrectCount(c => c + 1);
    else setIncorrectCount(c => c + 1);
  }, [answered, currentWord, onUpdateWord, onAnswer]);

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
      setTimedOut(false);
      setTimeLeft(15);
      setOptions([]);
    } else {
      onComplete({
        totalWords: words.length,
        correctCount,
        incorrectCount
      });
    }
  };

  if (!currentWord) return null;

  const isCorrectAnswer = selectedOption === currentWord.translation;
  const isLast = currentIndex === words.length - 1;

  return (
    <div className="quiz-container">
      <div className="quiz-progress-label">
        <span>{currentIndex + 1} / {words.length}</span>
        <span className={`quiz-timer ${timeLeft <= 4 ? 'danger' : timeLeft <= 8 ? 'warning' : ''}`}>
          {timeLeft}s
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
              type="button"
            >
              <Volume2 size={18} strokeWidth={2.2} />
            </button>
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
          if (answered) {
            if (opt === currentWord.translation) state = 'correct';
            else if (opt === selectedOption) state = 'wrong';
            else state = 'dimmed';
          }
          return (
            <motion.button
              key={`${currentIndex}-${idx}`}
              className={`quiz-option ${state}`}
              onClick={() => handleSelect(opt)}
              disabled={answered}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              whileTap={!answered ? { scale: 0.97 } : {}}
            >
              <span className="quiz-option-letter">{['A', 'B', 'C', 'D'][idx]}</span>
              <span className="quiz-option-text">{opt}</span>
              {answered && state === 'correct' && <Check className="quiz-option-icon" size={18} strokeWidth={2.5} />}
              {answered && state === 'wrong'   && <X className="quiz-option-icon" size={18} strokeWidth={2.5} />}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback + Next — only after answering */}
      <AnimatePresence>
        {answered && (
          <motion.div
            className="quiz-next-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className={`quiz-feedback ${timedOut ? 'wrong' : isCorrectAnswer ? 'correct' : 'wrong'}`}>
              {timedOut
                ? `Vaqt tugadi! Javob: ${currentWord.translation}`
                : isCorrectAnswer
                  ? "To'g'ri!"
                  : `Javob: ${currentWord.translation}`
              }
            </div>
            <button
              type="button"
              className="btn-quiz-next"
              onClick={handleNext}
            >
              {isLast ? 'Natijalar →' : 'Keyingisi →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
