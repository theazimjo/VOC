import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateNextReview, getDueWords } from '../../utils/sm2';
import { speakWord } from '../../utils/helpers';
import './SpacedRepetition.css';

export default function SpacedRepetition({ words, onComplete, onUpdateWord, onAnswer, onProgress }) {
  const [dueWords, setDueWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState({ correctCount: 0, incorrectCount: 0 });

  useEffect(() => {
    const due = getDueWords(words);
    setDueWords(due);
  }, [words]);

  const currentWord = dueWords[currentIndex];

  useEffect(() => {
    if (onProgress && dueWords) {
      onProgress(currentIndex, dueWords.length);
    }
  }, [currentIndex, dueWords, onProgress]);

  useEffect(() => {
    if (currentWord) speakWord(currentWord.word);
  }, [currentIndex, currentWord]);

  const handleRate = async (quality) => {
    const isCorrect = quality >= 3;
    if (onAnswer) onAnswer(currentWord, isCorrect);
    
    const sm2Data = calculateNextReview(
      quality,
      currentWord.easeFactor || 2.5,
      currentWord.interval || 0,
      currentWord.reviewCount || 0
    );
    await onUpdateWord(currentWord.id, sm2Data);

    const newResults = {
      correctCount: results.correctCount + (isCorrect ? 1 : 0),
      incorrectCount: results.incorrectCount + (isCorrect ? 0 : 1)
    };
    setResults(newResults);
    setShowAnswer(false);

    if (currentIndex < dueWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete({ totalWords: dueWords.length, ...newResults });
    }
  };

  const getNextIntervalText = (quality) => {
    if (!currentWord) return '';
    const temp = calculateNextReview(quality, currentWord.easeFactor || 2.5, currentWord.interval || 0, currentWord.reviewCount || 0);
    if (temp.interval === 0) return 'Bugun';
    if (temp.interval === 1) return 'Ertaga';
    return `${temp.interval} kun`;
  };

  if (dueWords.length === 0) {
    return (
      <div className="sr-container empty">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="sr-empty-card"
        >
          <div className="sr-empty-icon">🎉</div>
          <h3>Hammasi o'rganildi!</h3>
          <p>Hozircha takrorlash uchun so'zlar yo'q. Keyinroq qaytib ko'ring.</p>
          <div className="result-actions" style={{ justifyContent: 'center', display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => onComplete({ totalWords: 0, correctCount: 0, incorrectCount: 0 })}
            >
              Ortga qaytish
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!currentWord) return null;

  return (
    <div className="sr-container">
      <div className="sr-progress-label">
        <span><strong>{currentIndex + 1}</strong> / {dueWords.length}</span>
        <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)' }}>🧠 Spaced Repetition</span>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord.id}
          className="sr-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="sr-word-row">
            <div className="sr-word">{currentWord.word}</div>
            <button
              className="btn-speak-sr"
              onClick={() => speakWord(currentWord.word)}
              title="Talaffuz qilish"
            >🔊</button>
          </div>

          {!showAnswer ? (
            <button className="sr-reveal-btn" onClick={() => setShowAnswer(true)}>
              👁 Javobni ko'rish
            </button>
          ) : (
            <motion.div
              className="sr-answer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="sr-translation">{currentWord.translation}</div>
              {currentWord.definition && (
                <div className="sr-details">{currentWord.definition}</div>
              )}
              {currentWord.example && (
                <div className="sr-details">"{currentWord.example}"</div>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Rating buttons — only shown after revealing answer */}
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            className="sr-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button className="sr-rating-btn again" onClick={() => handleRate(1)}>
              <span className="sr-rate-label">Qayta</span>
              <span className="sr-rate-time">{getNextIntervalText(1)}</span>
            </button>
            <button className="sr-rating-btn hard" onClick={() => handleRate(3)}>
              <span className="sr-rate-label">Qiyin</span>
              <span className="sr-rate-time">{getNextIntervalText(3)}</span>
            </button>
            <button className="sr-rating-btn good" onClick={() => handleRate(4)}>
              <span className="sr-rate-label">Yaxshi</span>
              <span className="sr-rate-time">{getNextIntervalText(4)}</span>
            </button>
            <button className="sr-rating-btn easy" onClick={() => handleRate(5)}>
              <span className="sr-rate-label">Oson</span>
              <span className="sr-rate-time">{getNextIntervalText(5)}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
