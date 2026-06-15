import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { shuffleArray } from '../../utils/helpers';
import { calculateNextReview } from '../../utils/sm2';
import './MatchGame.css';

export default function MatchGame({ words, onComplete, onUpdateWord }) {
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [errorIds, setErrorIds] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Only take up to 8 words at a time for matching
    const playWords = words.slice(0, 8);
    setLeftItems(shuffleArray(playWords.map(w => ({ id: w.id, text: w.word }))));
    setRightItems(shuffleArray(playWords.map(w => ({ id: w.id, text: w.translation }))));
    
    const int = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(int);
  }, [words]);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      if (selectedLeft === selectedRight) {
        // Match!
        setMatchedIds(prev => [...prev, selectedLeft]);
        setSelectedLeft(null);
        setSelectedRight(null);

        // Update SM-2 (good)
        const word = words.find(w => w.id === selectedLeft);
        if (word) {
          const sm2Data = calculateNextReview(4, word.easeFactor || 2.5, word.interval || 0, word.reviewCount || 0);
          onUpdateWord(word.id, sm2Data);
        }

        if (matchedIds.length + 1 === leftItems.length) {
          setTimeout(() => {
            onComplete({
              totalWords: leftItems.length,
              correctCount: leftItems.length - Math.min(mistakes, leftItems.length),
              incorrectCount: Math.min(mistakes, leftItems.length)
            });
          }, 1000);
        }
      } else {
        // No match
        setErrorIds([selectedLeft, selectedRight]);
        setMistakes(m => m + 1);
        
        // Update SM-2 (again) for the missed word
        const word = words.find(w => w.id === selectedLeft);
        if (word) {
          const sm2Data = calculateNextReview(1, word.easeFactor || 2.5, word.interval || 0, word.reviewCount || 0);
          onUpdateWord(word.id, sm2Data);
        }

        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setErrorIds([]);
        }, 500);
      }
    }
  }, [selectedLeft, selectedRight]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="match-game-container">
      <div className="match-stats">
        <div>Vaqt: {formatTime(timer)}</div>
        <div>Qoldi: {leftItems.length - matchedIds.length}</div>
      </div>

      <div className="match-grid">
        <div className="match-column">
          {leftItems.map((item, idx) => (
            <motion.div
              key={`l-${item.id}`}
              className={`match-item 
                ${selectedLeft === item.id ? 'selected' : ''} 
                ${matchedIds.includes(item.id) ? 'matched' : ''}
                ${errorIds[0] === item.id ? 'error' : ''}
              `}
              onClick={() => !matchedIds.includes(item.id) && setSelectedLeft(item.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {item.text}
            </motion.div>
          ))}
        </div>
        <div className="match-column">
          {rightItems.map((item, idx) => (
            <motion.div
              key={`r-${item.id}`}
              className={`match-item 
                ${selectedRight === item.id ? 'selected' : ''} 
                ${matchedIds.includes(item.id) ? 'matched' : ''}
                ${errorIds[1] === item.id ? 'error' : ''}
              `}
              onClick={() => !matchedIds.includes(item.id) && setSelectedRight(item.id)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {item.text}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
