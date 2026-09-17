import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Check, X } from 'lucide-react';
import { shuffleArray, speakWord } from '../../utils/helpers';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { playSound, triggerVibration } from '../../utils/feedback';
import { useLanguage } from '../../contexts/LanguageContext';
import { useKeyboardInset } from '../../hooks/useKeyboardInset';
import PracticeQuitModal from './PracticeQuitModal';
import './QuizGame.css';

export default function QuizGame({
  words,
  onComplete,
  onUpdateWord,
  onAnswer,
  onProgress,
  onExit,
  language = 'en-US',
}) {
  const { t } = useLanguage();
  const keyboardInset = useKeyboardInset();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showQuitModal, setShowQuitModal] = useState(false);

  const questionStartRef = useRef(Date.now());
  const nextTimeoutRef = useRef(null);
  const correctCountRef = useRef(0);
  const incorrectCountRef = useRef(0);
  const isAdvancingRef = useRef(false);

  const currentWord = words[currentIndex];

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

  // Autoplay pronunciation on question start
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

  // Timer — ticks when not yet answered
  useEffect(() => {
    if (answered || isAdvancingRef.current) return;
    if (timeLeft <= 0) {
      isAdvancingRef.current = true;
      playSound('wrong');
      triggerVibration('wrong');
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
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, answered, currentWord, onAnswer, onUpdateWord]);

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

    if (isCorrect) {
      playSound('correct');
      triggerVibration('correct');
      setCorrectCount(c => c + 1);
      correctCountRef.current += 1;
    } else {
      playSound('wrong');
      triggerVibration('wrong');
      setIncorrectCount(c => c + 1);
      incorrectCountRef.current += 1;
    }

    onUpdateWord(currentWord.id, {
      isCorrect,
      confidence: inferConfidenceFromSpeed(responseTime, isCorrect),
      responseTime,
      retrievalType: 'passive_recall',
    });
  }, [answered, currentWord, onAnswer, onUpdateWord]);

  // Keyboard navigation: 1, 2, 3, 4 (and A, B, C, D) + Enter to continue
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'Enter') {
        if (answered) {
          e.preventDefault();
          handleNext();
        }
        return;
      }

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
  }, [answered, options, handleSelect, handleNext]);

  const handleSkip = () => {
    if (answered || isAdvancingRef.current) return;
    isAdvancingRef.current = true;
    playSound('wrong');
    triggerVibration('wrong');
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
  };

  if (!currentWord) return null;

  const isLast = currentIndex === words.length - 1;
  const progressPct = ((currentIndex + 1) / words.length) * 100;
  const isCorrectAnswer = selectedOption === currentWord.translation;

  return (
    <div className="duo-spelling-page duo-quiz-page">
      {/* Top Bar Header (Duolingo Style: X button + Capsule Progress Bar) */}
      <header className="duo-top-header">
        <button
          type="button"
          className="duo-close-btn"
          onClick={() => setShowQuitModal(true)}
          title={t('practice.closePractice') || "Close practice"}
        >
          <X size={24} strokeWidth={2.8} />
        </button>

        <div className="duo-progress-track">
          <motion.div
            className="duo-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="duo-spelling-body duo-quiz-body">
        {/* Instruction Title */}
        <h2 className="duo-prompt-title">
          {t('practice.chooseTranslation') || "Choose the translation"}
        </h2>

        {/* Prompt Card */}
        <div className="duo-prompt-card duo-quiz-prompt-card">
          <button
            type="button"
            className="duo-prompt-content"
            onClick={() => speakWord(currentWord.word, language)}
            title={t('practice.clickToListen') || "Click to listen"}
          >
            <Volume2 size={20} strokeWidth={2.5} className="duo-speaker-icon" />
            <span className="duo-prompt-text">{currentWord.word}</span>
          </button>

          {/* Countdown timer badge inside prompt card */}
          <div className={`duo-quiz-timer-badge ${timeLeft <= 3 ? 'danger' : timeLeft <= 6 ? 'warning' : ''}`}>
            ⏱ {timeLeft}s
          </div>
        </div>

        {/* 4 Options Grid */}
        <div className="duo-quiz-options-grid">
          <AnimatePresence mode="wait">
            {options.map((opt, idx) => {
              let stateClass = '';
              if (answered) {
                if (opt === currentWord.translation) stateClass = 'is-correct';
                else if (opt === selectedOption) stateClass = 'is-wrong';
                else stateClass = 'is-dimmed';
              }

              return (
                <motion.button
                  key={`${currentIndex}-${idx}`}
                  type="button"
                  className={`duo-quiz-option-card ${stateClass}`}
                  onClick={() => handleSelect(opt)}
                  disabled={answered}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={!answered ? { y: -2 } : {}}
                  whileTap={!answered ? { y: 2 } : {}}
                >
                  <span className="duo-quiz-badge">{['1', '2', '3', '4'][idx]}</span>
                  <span className="duo-quiz-option-text">{opt}</span>
                  {answered && opt === currentWord.translation && (
                    <Check className="duo-quiz-check-icon" size={20} strokeWidth={3.5} />
                  )}
                  {answered && opt === selectedOption && opt !== currentWord.translation && (
                    <X className="duo-quiz-x-icon" size={20} strokeWidth={3.5} />
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Fixed Full-Width Bottom Bar & Feedback Drawer */}
      <footer
        className={`duo-bottom-bar ${
          answered ? (isCorrectAnswer && !timedOut ? 'drawer-correct' : 'drawer-wrong') : ''
        }`}
        style={keyboardInset > 0 ? { transform: `translateY(-${keyboardInset}px)` } : undefined}
      >
        <div className="duo-bottom-bar-content">
          {!answered ? (
            <>
              <button
                type="button"
                className="duo-btn duo-btn-skip"
                onClick={handleSkip}
              >
                {t('practice.skip')?.toUpperCase() || 'SKIP'}
              </button>

              <div className="duo-quiz-hint-text">
                {t('practice.pickBestAnswer') || 'Pick the best answer'}
              </div>
            </>
          ) : (
            <div className="duo-feedback-container">
              <div className="duo-feedback-info">
                <div className={`duo-feedback-icon-circle ${isCorrectAnswer && !timedOut ? 'icon-correct' : 'icon-wrong'}`}>
                  {isCorrectAnswer && !timedOut ? <Check size={26} strokeWidth={3.5} /> : <X size={26} strokeWidth={3.5} />}
                </div>
                <div className="duo-feedback-text-group">
                  <h3 className={`duo-feedback-heading ${isCorrectAnswer && !timedOut ? 'text-correct' : 'text-wrong'}`}>
                    {isCorrectAnswer && !timedOut
                      ? (t('practice.nicelyDone') || 'Nicely done!')
                      : (t('practice.correctSolution') || 'Correct solution:')}
                  </h3>
                  <div className="duo-feedback-answer-line">
                    <span className="duo-correct-word">{currentWord.translation}</span>
                    <button
                      type="button"
                      className="duo-speak-ans-btn"
                      onClick={() => speakWord(currentWord.translation, 'ru-RU')}
                      title={t('practice.listen') || "Listen"}
                    >
                      <Volume2 size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className={`duo-btn duo-btn-continue ${isCorrectAnswer && !timedOut ? 'btn-correct' : 'btn-wrong'}`}
                onClick={handleNext}
              >
                {isLast ? (t('practice.resultsBtn')?.toUpperCase() || 'RESULTS') : (t('practice.continueBtn')?.toUpperCase() || 'CONTINUE')}
              </button>
            </div>
          )}
        </div>
      </footer>

      {/* Quit Confirmation Modal */}
      <PracticeQuitModal
        isOpen={showQuitModal}
        onClose={() => setShowQuitModal(false)}
        onConfirm={() => {
          setShowQuitModal(false);
          if (onExit) onExit(true);
        }}
      />
    </div>
  );
}
