import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Check, X } from 'lucide-react';
import { shuffleArray, speakWord } from '../../utils/helpers';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { useLanguage } from '../../contexts/LanguageContext';
import './QuizGame.css';

export default function QuizGame({ words, onComplete, onUpdateWord, onAnswer, onProgress, language = 'en-US' }) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // the chosen option text
  const [answered, setAnswered] = useState(false);            // explicit answered flag
  const [timedOut, setTimedOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const questionStartRef = useRef(Date.now());
  const nextTimeoutRef = useRef(null);
  const correctCountRef = useRef(0);
  const incorrectCountRef = useRef(0);
  const isAdvancingRef = useRef(false);

  const currentWord = words[currentIndex];

  // Reset advancing flag on question change
  useEffect(() => {
    isAdvancingRef.current = false;
  }, [currentIndex]);

  // Report progress
  useEffect(() => {
    if (currentIndex === 0) {
      correctCountRef.current = 0;
      incorrectCountRef.current = 0;
    }
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

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (nextTimeoutRef.current) {
        clearTimeout(nextTimeoutRef.current);
      }
    };
  }, []);

  const handleNext = useCallback(() => {
    if (nextTimeoutRef.current) {
      clearTimeout(nextTimeoutRef.current);
      nextTimeoutRef.current = null;
    }

    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
      setTimedOut(false);
      setTimeLeft(10);
      setOptions([]);
    } else {
      onComplete({
        totalWords: words.length,
        correctCount: correctCountRef.current,
        incorrectCount: incorrectCountRef.current
      });
    }
  }, [currentIndex, words.length, onComplete]);

  // Timer — only ticks when not yet answered
  useEffect(() => {
    if (answered || isAdvancingRef.current) return;
    if (timeLeft <= 0) {
      isAdvancingRef.current = true;
      const responseTime = (Date.now() - questionStartRef.current) / 1000;
      setTimedOut(true);
      setAnswered(true);
      setIncorrectCount(c => c + 1);
      incorrectCountRef.current += 1;
      if (onAnswer) onAnswer(currentWord, false);
      onUpdateWord(currentWord.id, {
        isCorrect: false,
        confidence: inferConfidenceFromSpeed(responseTime, false),
        responseTime,
        retrievalType: 'passive_recall',
      });
      nextTimeoutRef.current = setTimeout(() => {
        handleNext();
      }, 900);
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, answered, currentWord, onAnswer, onUpdateWord, handleNext]);

  const handleSelect = useCallback((option) => {
    if (answered || isAdvancingRef.current) return;
    isAdvancingRef.current = true;

    if (nextTimeoutRef.current) {
      clearTimeout(nextTimeoutRef.current);
      nextTimeoutRef.current = null;
    }

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

    if (isCorrect) {
      setCorrectCount(c => c + 1);
      correctCountRef.current += 1;
    } else {
      setIncorrectCount(c => c + 1);
      incorrectCountRef.current += 1;
    }

    const delay = isCorrect ? 600 : 900;
    nextTimeoutRef.current = setTimeout(() => {
      handleNext();
    }, delay);
  }, [answered, currentWord, onAnswer, onUpdateWord, handleNext]);

  // Keyboard navigation: 1, 2, 3, 4 (and A, B, C, D)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (answered || isAdvancingRef.current) return;

      const key = e.key.toLowerCase();
      let idx = -1;
      if (key === '1' || key === 'a') idx = 0;
      else if (key === '2' || key === 'b') idx = 1;
      else if (key === '3' || key === 'c') idx = 2;
      else if (key === '4' || key === 'd') idx = 3;

      if (idx >= 0 && idx < options.length) {
        e.preventDefault();
        handleSelect(options[idx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answered, options, handleSelect]);

  if (!currentWord) return null;

  const isCorrectAnswer = selectedOption === currentWord.translation;

  return (
    <div className="quiz-container">
      <div className="quiz-progress-label">
        <span>{currentIndex + 1} / {words.length}</span>
        <span className={`quiz-timer ${timeLeft <= 3 ? 'danger' : timeLeft <= 6 ? 'warning' : ''}`}>
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
          <div className="quiz-question-label">{t('practice.chooseTranslation')}</div>
          <div className="quiz-question">
            {currentWord.word}
            <button
              className="btn-speak-quiz"
              onClick={() => speakWord(currentWord.word, language)}
              title={t('practice.listen')}
              type="button"
            >
              <Volume2 size={18} strokeWidth={2.2} />
            </button>
          </div>
          <div className="quiz-timer-bar">
            <div
              className="quiz-timer-fill"
              style={{
                width: `${(timeLeft / 10) * 100}%`,
                background: timeLeft <= 3 ? 'var(--error)' : timeLeft <= 6 ? 'var(--warning)' : 'var(--accent-3)'
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
              <span className="quiz-option-letter">{['1', '2', '3', '4'][idx]}</span>
              <span className="quiz-option-text">{opt}</span>
              {answered && state === 'correct' && <Check className="quiz-option-icon" size={18} strokeWidth={2.5} />}
              {answered && state === 'wrong'   && <X className="quiz-option-icon" size={18} strokeWidth={2.5} />}
            </motion.button>
          );
        })}
      </div>

      {/* Fixed full-width bottom bar */}
      <div className={`quiz-bottom-bar ${answered ? (isCorrectAnswer && !timedOut ? 'correct' : 'wrong') : ''}`}>
        <div className="quiz-bottom-bar-inner">
          {!answered ? (
            <div className="quiz-feedback quiz-feedback-hint">{t('practice.selectCorrectHint')}</div>
          ) : (
            <div className="quiz-feedback">
              {timedOut
                ? t('practice.timeUp', { answer: currentWord.translation })
                : isCorrectAnswer
                  ? t('practice.greatSentence').split('!')[0] + '!'
                  : t('practice.answerIs', { answer: currentWord.translation })
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
