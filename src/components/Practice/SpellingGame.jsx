import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateNextReview } from '../../utils/sm2';
import { speakWord } from '../../utils/helpers';
import './SpellingGame.css';

export default function SpellingGame({ words, onComplete, onUpdateWord, onAnswer, onProgress }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [scrambled, setScrambled] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const inputRef = useRef(null);

  const currentWord = words[currentIndex];

  // Report progress
  useEffect(() => {
    if (onProgress && words) {
      onProgress(currentIndex, words.length);
    }
  }, [currentIndex, words, onProgress]);

  useEffect(() => {
    if (!currentWord) return;
    setScrambled(currentWord.word.split('').sort(() => 0.5 - Math.random()).join(' '));
    setInput('');
    setAnswered(false);
    setIsCorrect(false);
  }, [currentIndex]);

  useEffect(() => {
    if (inputRef.current && !answered) {
      inputRef.current.focus();
    }
  }, [currentIndex, answered]);

  const submitAnswer = async (overrideWord) => {
    if (answered) return;
    const submittedInput = overrideWord ?? input;
    if (!submittedInput.trim()) return;

    const correct = submittedInput.toLowerCase().trim() === currentWord.word.toLowerCase();
    setAnswered(true);
    setIsCorrect(correct);
    if (onAnswer) onAnswer(currentWord, correct);

    const sm2Data = calculateNextReview(
      correct ? 4 : 1,
      currentWord.easeFactor || 2.5,
      currentWord.interval || 0,
      currentWord.reviewCount || 0
    );
    onUpdateWord(currentWord.id, sm2Data);

    if (correct) setCorrectCount(c => c + 1);
    else setIncorrectCount(c => c + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitAnswer();
  };

  const handleSkip = async () => {
    if (answered) return;
    setInput(currentWord.word);
    setAnswered(true);
    setIsCorrect(false);
    if (onAnswer) onAnswer(currentWord, false);
    const sm2Data = calculateNextReview(1, currentWord.easeFactor || 2.5, currentWord.interval || 0, currentWord.reviewCount || 0);
    onUpdateWord(currentWord.id, sm2Data);
    setIncorrectCount(c => c + 1);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete({ totalWords: words.length, correctCount, incorrectCount });
    }
  };

  if (!currentWord) return null;

  const isLast = currentIndex === words.length - 1;

  return (
    <div className="spelling-container">
      <div className="spelling-progress-label">
        <span>{currentIndex + 1} / {words.length}</span>
        <button className="btn-spell-speak" type="button" onClick={() => speakWord(currentWord.word)}>
          🔊 Eshitish
        </button>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={`spelling-card ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}`}
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
              className={`spelling-input ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}`}
              value={input}
              onChange={e => !answered && setInput(e.target.value)}
              disabled={answered}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              placeholder="So'zni yozing..."
            />
            {!answered && (
              <button type="submit" className="btn-spell-submit">
                Tekshirish ✓
              </button>
            )}
          </form>

          <AnimatePresence>
            {answered && (
              <motion.div
                className={`spelling-feedback-banner ${isCorrect ? 'correct' : 'wrong'}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {isCorrect
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
        {!answered ? (
          <button type="button" className="btn btn-ghost" onClick={handleSkip}>
            Bilmadim (o'tkazib yuborish)
          </button>
        ) : (
          <button type="button" className="btn-spell-next" onClick={handleNext}>
            {isLast ? 'Natijalar →' : 'Keyingisi →'}
          </button>
        )}
      </div>
    </div>
  );
}
