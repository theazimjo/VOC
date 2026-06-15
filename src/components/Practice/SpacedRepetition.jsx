import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateNextReview, getDueWords } from '../../utils/sm2';
import { speakWord } from '../../utils/helpers';
import './SpacedRepetition.css';

export default function SpacedRepetition({ words, onComplete, onUpdateWord }) {
  const [dueWords, setDueWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState({ correctCount: 0, incorrectCount: 0 });

  useEffect(() => {
    // Filter words that are due for review
    const due = getDueWords(words);
    setDueWords(due);
  }, [words]);

  const currentWord = dueWords[currentIndex];

  // Autoplay pronunciation on word change
  useEffect(() => {
    if (currentWord) {
      speakWord(currentWord.word);
    }
  }, [currentIndex, currentWord]);

  const handleRate = async (rating) => {
    // rating: 1 (again), 3 (hard), 4 (good), 5 (easy)
    const quality = rating;
    const isCorrect = quality >= 3;
    
    // Update SM-2 data
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
    return `${temp.interval} kundan so'ng`;
  };

  if (dueWords.length === 0) {
    return (
      <div className="sr-container">
        <motion.div 
          className="sr-empty"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="sr-empty-icon">🎉</div>
          <h2>Hozircha takrorlanadigan so'z yo'q!</h2>
          <p>Siz barcha vazifalarni bajardingiz. Keyinroq yana tekshirib ko'ring.</p>
          <button className="btn btn-primary mt-md" onClick={() => onComplete({ totalWords: 0, correctCount: 0, incorrectCount: 0 })}>
            Ortga qaytish
          </button>
        </motion.div>
      </div>
    );
  }

  if (!currentWord) return null;

  return (
    <div className="sr-container">
      <div className="flashcard-progress">
        <span>{currentIndex + 1}</span> / {dueWords.length}
      </div>

      <motion.div 
        className="sr-card"
        key={currentWord.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="sr-word">
          {currentWord.word}
          <button
            className="btn-speak-sr"
            onClick={() => speakWord(currentWord.word)}
            title="Talaffuz qilish"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.25rem',
              color: 'var(--text-muted)',
              marginLeft: '8px',
              transition: 'color 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              verticalAlign: 'middle'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--accent-2)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
          >
            🔊
          </button>
        </div>
        
        {!showAnswer ? (
          <button className="btn btn-primary sr-reveal-btn" onClick={() => setShowAnswer(true)}>
            Javobni ko'rish
          </button>
        ) : (
          <motion.div 
            className="sr-answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <div className="sr-translation">{currentWord.translation}</div>
            {currentWord.example && <div className="sr-details">"{currentWord.example}"</div>}
            {currentWord.definition && <div className="sr-details" style={{ marginTop: '8px' }}>{currentWord.definition}</div>}
          </motion.div>
        )}
      </motion.div>

      {showAnswer && (
        <motion.div 
          className="sr-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="btn btn-danger" onClick={() => handleRate(1)}>
            <span className="sr-rate-label">Qayta 🔴</span>
            <span className="sr-rate-time">{getNextIntervalText(1)}</span>
          </button>
          <button className="btn btn-secondary" onClick={() => handleRate(3)}>
            <span className="sr-rate-label">Qiyin 🟡</span>
            <span className="sr-rate-time">{getNextIntervalText(3)}</span>
          </button>
          <button className="btn btn-primary" onClick={() => handleRate(4)}>
            <span className="sr-rate-label">Yaxshi 🔵</span>
            <span className="sr-rate-time">{getNextIntervalText(4)}</span>
          </button>
          <button className="btn btn-primary" style={{ background: 'var(--success)', borderColor: 'var(--success)' }} onClick={() => handleRate(5)}>
            <span className="sr-rate-label">Oson 🟢</span>
            <span className="sr-rate-time">{getNextIntervalText(5)}</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
