import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateNextReview } from '../../utils/sm2';
import { speakWord } from '../../utils/helpers';
import './DictationGame.css';

export default function DictationGame({ words, onComplete, onUpdateWord }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('playing'); // playing | correct | wrong
  const [results, setResults] = useState({ correctCount: 0, incorrectCount: 0 });
  const [showTranslation, setShowTranslation] = useState(false);
  const [showLetters, setShowLetters] = useState(false);
  const [scrambled, setScrambled] = useState('');
  const inputRef = useRef(null);

  const currentWord = words[currentIndex];

  useEffect(() => {
    if (!currentWord) return;
    setScrambled(currentWord.word.split('').sort(() => 0.5 - Math.random()).join(' '));
    setShowTranslation(false);
    setShowLetters(false);
    const t = setTimeout(() => speakWord(currentWord.word), 350);
    return () => clearTimeout(t);
  }, [currentIndex, currentWord]);

  useEffect(() => {
    if (inputRef.current && status === 'playing') inputRef.current.focus();
  }, [currentIndex, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || status !== 'playing') return;

    const isCorrect = input.toLowerCase().trim() === currentWord.word.toLowerCase();
    setStatus(isCorrect ? 'correct' : 'wrong');

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

  const handleReveal = async () => {
    if (status !== 'playing') return;
    setInput(currentWord.word);
    setStatus('wrong');
    const sm2Data = calculateNextReview(1, currentWord.easeFactor || 2.5, currentWord.interval || 0, currentWord.reviewCount || 0);
    await onUpdateWord(currentWord.id, sm2Data);
    setResults(prev => ({ ...prev, incorrectCount: prev.incorrectCount + 1 }));
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setInput('');
      setStatus('playing');
    } else {
      onComplete({ totalWords: words.length, ...results });
    }
  };

  if (!currentWord) return null;
  const isLast = currentIndex === words.length - 1;

  return (
    <div className="dictation-container">
      {/* Progress */}
      <div className="dictation-progress-track">
        <div className="dictation-progress-fill" style={{ width: `${(currentIndex / words.length) * 100}%` }} />
      </div>
      <div className="dictation-progress-label">
        <span>{currentIndex + 1} / {words.length}</span>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={`dictation-card ${status !== 'playing' ? status : ''}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Audio button - center stage */}
          <div className="dictation-audio-section">
            <button
              type="button"
              className="btn-play-audio"
              onClick={() => speakWord(currentWord.word)}
              title="So'zni eshitish"
            >
              <span className="audio-icon">🔊</span>
              <span className="audio-label">Eshitish uchun bosing</span>
            </button>
          </div>

          {/* Hints */}
          <div className="dictation-hints-row">
            <AnimatePresence>
              {showTranslation && (
                <motion.div
                  className="dictation-hint-chip translation"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  💬 {currentWord.translation}
                </motion.div>
              )}
              {showLetters && (
                <motion.div
                  className="dictation-hint-chip letters"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  🔠 {scrambled}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="dictation-form">
            <input
              ref={inputRef}
              type="text"
              className={`dictation-input ${status !== 'playing' ? status : ''}`}
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={status !== 'playing'}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              placeholder="Eshitgan so'zingizni yozing..."
            />
            {status === 'playing' && (
              <button
                type="submit"
                className="btn-dictation-submit"
                disabled={!input.trim()}
              >
                Tekshirish ✓
              </button>
            )}
          </form>

          {/* Feedback */}
          <AnimatePresence>
            {status !== 'playing' && (
              <motion.div
                className={`dictation-feedback-banner ${status}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {status === 'correct'
                  ? <><span>✨</span> To'g'ri! Ajoyib!</>
                  : <><span>❌</span> Javob: <strong>{currentWord.word}</strong></>
                }
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint buttons when playing */}
          {status === 'playing' && (
            <div className="dictation-hint-buttons">
              <button
                type="button"
                className="btn-hint"
                onClick={() => setShowTranslation(true)}
                disabled={showTranslation}
              >
                💡 Tarjima
              </button>
              <button
                type="button"
                className="btn-hint"
                onClick={() => setShowLetters(true)}
                disabled={showLetters}
              >
                🔠 Harflar
              </button>
              <button
                type="button"
                className="btn-hint btn-hint-reveal"
                onClick={handleReveal}
              >
                👁 Ko'rsatish
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      {status !== 'playing' && (
        <motion.button
          className="btn-dictation-next"
          onClick={handleNext}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isLast ? 'Natijalar →' : 'Keyingisi →'}
        </motion.button>
      )}
    </div>
  );
}
