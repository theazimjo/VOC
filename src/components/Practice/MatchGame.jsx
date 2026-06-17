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
        const newMatched = [...matchedIds, selectedLeft];
        setMatchedIds(newMatched);
        setSelectedLeft(null);
        setSelectedRight(null);

        const word = words.find(w => w.id === selectedLeft);
        if (word) {
          const sm2Data = calculateNextReview(4, word.easeFactor || 2.5, word.interval || 0, word.reviewCount || 0);
          onUpdateWord(word.id, sm2Data);
        }

        if (newMatched.length === leftItems.length) {
          setTimeout(() => {
            onComplete({
              totalWords: leftItems.length,
              correctCount: leftItems.length - Math.min(mistakes, leftItems.length),
              incorrectCount: Math.min(mistakes, leftItems.length)
            });
          }, 800);
        }
      } else {
        // Error
        setErrorIds([selectedLeft, selectedRight]);
        setMistakes(m => m + 1);
        const word = words.find(w => w.id === selectedLeft);
        if (word) {
          const sm2Data = calculateNextReview(1, word.easeFactor || 2.5, word.interval || 0, word.reviewCount || 0);
          onUpdateWord(word.id, sm2Data);
        }
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setErrorIds([]);
        }, 600);
      }
    }
  }, [selectedLeft, selectedRight]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  const remaining = leftItems.length - matchedIds.length;

  return (
    <div className="match-game-container">
      <div className="match-stats">
        <div className="match-stat-pill">⏱ <span>{formatTime(timer)}</span></div>
        <div className="match-stat-pill">🎯 Qoldi: <span>{remaining}</span></div>
        <div className="match-stat-pill">❌ Xato: <span>{mistakes}</span></div>
      </div>

      <div className="match-grid">
        <div className="match-column">
          <div className="match-column-label">🇬🇧 Inglizcha</div>
          {leftItems.map((item, idx) => (
            <motion.div
              key={`l-${item.id}`}
              className={[
                'match-item',
                selectedLeft === item.id ? 'selected' : '',
                matchedIds.includes(item.id) ? 'matched' : '',
                errorIds[0] === item.id ? 'error' : ''
              ].join(' ')}
              onClick={() => {
                if (!matchedIds.includes(item.id) && !errorIds.length) {
                  setSelectedLeft(item.id);
                }
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.07 }}
            >
              {item.text}
              {matchedIds.includes(item.id) && <span style={{ marginLeft: 6 }}>✓</span>}
            </motion.div>
          ))}
        </div>

        <div className="match-column">
          <div className="match-column-label">🇺🇿 Tarjima</div>
          {rightItems.map((item, idx) => (
            <motion.div
              key={`r-${item.id}`}
              className={[
                'match-item',
                selectedRight === item.id ? 'selected' : '',
                matchedIds.includes(item.id) ? 'matched' : '',
                errorIds[1] === item.id ? 'error' : ''
              ].join(' ')}
              onClick={() => {
                if (!matchedIds.includes(item.id) && !errorIds.length) {
                  setSelectedRight(item.id);
                }
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.07 }}
            >
              {item.text}
              {matchedIds.includes(item.id) && <span style={{ marginLeft: 6 }}>✓</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
