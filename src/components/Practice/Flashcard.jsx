import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateNextReview, responseToQuality } from '../../utils/sm2';
import { speakWord } from '../../utils/helpers';
import './Flashcard.css';

export default function Flashcard({ words, onComplete, onUpdateWord }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState({ correctCount: 0, incorrectCount: 0 });

  const currentWord = words[currentIndex];

  // Autoplay pronunciation on card switch
  useEffect(() => {
    if (currentWord) {
      const t = setTimeout(() => {
        speakWord(currentWord.word);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [currentIndex, currentWord]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRate = async (rating) => {
    // rating: 'easy', 'good', 'hard', 'again'
    const isCorrect = rating !== 'again';
    
    // Update SM-2 data
    const quality = responseToQuality(rating);
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

    if (currentIndex < words.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150);
    } else {
      onComplete({ totalWords: words.length, ...newResults });
    }
  };

  if (!currentWord) return null;

  return (
    <div className="flashcard-container">
      <div className="flashcard-progress">
        <span>{currentIndex + 1}</span> / {words.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="flashcard-scene"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}>
            <div className="flashcard-face flashcard-front">
              <button
                className="btn-speak-card"
                onClick={(e) => {
                  e.stopPropagation();
                  speakWord(currentWord.word);
                }}
                title="Talaffuz qilish"
              >
                🔊
              </button>
              <div className="flashcard-word">{currentWord.word}</div>
              <div className="flashcard-hint">Ag'darish uchun bosing yoki Space</div>
            </div>
            
            <div className="flashcard-face flashcard-back">
              <div className="flashcard-translation">{currentWord.translation}</div>
              {currentWord.definition && <div className="flashcard-def">{currentWord.definition}</div>}
              {currentWord.example && <div className="flashcard-example">"{currentWord.example}"</div>}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flashcard-actions" style={{ opacity: isFlipped ? 1 : 0, pointerEvents: isFlipped ? 'auto' : 'none' }}>
        <button className="btn btn-danger" onClick={() => handleRate('again')}>Bilmayman ❌</button>
        <button className="btn btn-secondary" onClick={() => handleRate('hard')}>Qiyin 🤔</button>
        <button className="btn btn-primary" onClick={() => handleRate('good')} style={{ background: 'var(--success)' }}>Bilaman ✅</button>
      </div>
    </div>
  );
}
