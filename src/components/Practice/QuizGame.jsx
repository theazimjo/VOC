import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Check, X } from 'lucide-react';
import { shuffleArray, speakWord } from '../../utils/helpers';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import './QuizGame.css';

export default function QuizGame({ words, onComplete, onUpdateWord, onAnswer, onProgress, language = 'en-US' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // the chosen option text
  const [answered, setAnswered] = useState(false);            // explicit answered flag
  const [timedOut, setTimedOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  // Tracked via a ref (not the ticking timeLeft state) so the elapsed time
  // is precise and unaffected by the 1s-granularity countdown or stale
  // closures in the memoized handlers below.
  const questionStartRef = useRef(Date.now());

  const currentWord = words[currentIndex];

  // Report progress
  useEffect(() => {
    if (onProgress && words) {
      onProgress(currentIndex, words.length);
    }
  }, [currentIndex, words, onProgress]);

  // Autoplay pronunciation
  useEffect(() => {
    if (currentWord) speakWord(currentWord.word, language);
  }, [currentIndex, currentWord, language]);

  // Build options when word changes
  useEffect(() => {
    if (!currentWord) return;
    const correctOption = (currentWord.translation || '').trim() || currentWord.word.trim();

    const validWrongTranslations = Array.from(
      new Set(
        words
          .map(w => (w?.translation || '').trim())
          .filter(t => t.length > 0 && t.toLowerCase() !== correctOption.toLowerCase())
      )
    );

    const wrongOptions = shuffleArray(validWrongTranslations).slice(0, 3);

    const fallbackDistractors = [
      "yashil o'simliklar", "asosiy manba", "hayotiy jarayon",
      "muhim vosita", "o'zaro ta'sir", "natijaviy bosqich"
    ];
    let fbIdx = 0;
    while (wrongOptions.length < 3 && fbIdx < fallbackDistractors.length) {
      const fb = fallbackDistractors[fbIdx++];
      if (
        fb.toLowerCase() !== correctOption.toLowerCase() &&
        !wrongOptions.map(o => o.toLowerCase()).includes(fb.toLowerCase())
      ) {
        wrongOptions.push(fb);
      }
    }

    setOptions(shuffleArray([correctOption, ...wrongOptions]));
    questionStartRef.current = Date.now();
  }, [currentIndex, currentWord, words]);

  // Timer — only ticks when not yet answered
  useEffect(() => {
    if (answered) return;
    if (timeLeft <= 0) {
      // Time's up — mark as wrong without selecting any option
      const responseTime = (Date.now() - questionStartRef.current) / 1000;
      setTimedOut(true);
      setAnswered(true);
      setIncorrectCount(c => c + 1);
      if (onAnswer) onAnswer(currentWord, false);
      onUpdateWord(currentWord.id, {
        isCorrect: false,
        confidence: inferConfidenceFromSpeed(responseTime, false),
        responseTime,
        retrievalType: 'passive_recall',
      });
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, answered]);

  const handleSelect = useCallback(async (option) => {
    if (answered) return;
    setSelectedOption(option);
    setAnswered(true);

    const responseTime = (Date.now() - questionStartRef.current) / 1000;
    const isCorrect = option === currentWord.translation;
    if (onAnswer) onAnswer(currentWord, isCorrect);

    onUpdateWord(currentWord.id, {
      isCorrect,
      confidence: inferConfidenceFromSpeed(responseTime, isCorrect),
      responseTime,
      retrievalType: 'passive_recall',
    });

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
          <div className="quiz-question-label">Choose the translation</div>
          <div className="quiz-question">
            {currentWord.word}
            <button
              className="btn-speak-quiz"
              onClick={() => speakWord(currentWord.word, language)}
              title="Listen"
              type="button"
            >
              <Volume2 size={18} strokeWidth={2.2} />
            </button>
          </div>
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

      {/* Fixed full-width bottom bar — always present, same as Spelling's, just swaps its content */}
      <div className={`quiz-bottom-bar ${answered ? (isCorrectAnswer && !timedOut ? 'correct' : 'wrong') : ''}`}>
        <div className="quiz-bottom-bar-inner">
          {!answered ? (
            <div className="quiz-feedback quiz-feedback-hint">Select the correct translation</div>
          ) : (
            <>
              <div className="quiz-feedback">
                {timedOut
                  ? `Time is up! Answer: ${currentWord.translation}`
                  : isCorrectAnswer
                    ? "Correct!"
                    : `Answer: ${currentWord.translation}`
                }
              </div>
              <button
                type="button"
                className="btn-quiz-next"
                onClick={handleNext}
              >
                {isLast ? 'Results →' : 'Next →'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
