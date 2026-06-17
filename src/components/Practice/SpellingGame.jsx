import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateNextReview } from '../../utils/sm2';
import { speakWord } from '../../utils/helpers';
import './SpellingGame.css';

export default function SpellingGame({ words, onComplete, onUpdateWord }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('playing'); // playing | correct | wrong
  const [results, setResults] = useState({ correctCount: 0, incorrectCount: 0 });
  const [scrambled, setScrambled] = useState('');
  const inputRef = useRef(null);

  const currentWord = words[currentIndex];

  useEffect(() => {
    if (currentWord) {
      setScrambled(currentWord.word.split('').sort(() => 0.5 - Math.random()).join(' '));
      speakWord(currentWord.translation); // Speak the translation so user writes the word
    }
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

  const handleSkip = async () => {
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
    <div className="spelling-container">
      {/* Progress */}
      <div className="spelling-progress-track">
        <div className="spelling-progress-fill" style={{ width: `${(currentIndex / words.length) * 100}%` }} />
      </div>
      <div className="spelling-progress-label">
        <span>{currentIndex + 1} / {words.length}</span>
        <button className="btn-spell-speak" onClick={() => speakWord(currentWord.word)}>
          🔊 Eshitish
        </button>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={`spelling-card ${status !== 'playing' ? status : ''}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="spelling-card-label">Tarjimani yozing (inglizcha)</div>
          <div className="spelling-target">{currentWord.translation}</div>
          {currentWord.definition && (
            <div className="spelling-definition">{currentWord.definition}</div>
          )}
          <div className="spelling-scramble-label">Aralashtirilgan harflar:</div>
          <div className="spelling-hint">{scrambled}</div>

          <form onSubmit={handleSubmit} className="spelling-form">
            <input
              ref={inputRef}
              type="text"
              className={`spelling-input ${status !== 'playing' ? status : ''}`}
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={status !== 'playing'}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              placeholder="So'zni yozing..."
            />
            {status === 'playing' && (
              <button type="submit" className="btn-spell-submit">Tekshirish ✓</button>
            )}
          </form>

          <AnimatePresence>
            {status !== 'playing' && (
              <motion.div
                className={`spelling-feedback-banner ${status}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                {status === 'correct'
                  ? <><span className="sf-icon">✨</span> To'g'ri! Zo'r!</>
                  : <><span className="sf-icon">❌</span> Javob: <strong>{currentWord.word}</strong></>
                }
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Action row */}
      <div className="spelling-actions">
        {status === 'playing' ? (
          <button className="btn btn-ghost" onClick={handleSkip}>
            Bilmadim (o'tkazib yuborish)
          </button>
        ) : (
          <button className="btn-spell-next" onClick={handleNext}>
            {isLast ? 'Natijalar →' : 'Keyingisi →'}
          </button>
        )}
      </div>
    </div>
  );
}
