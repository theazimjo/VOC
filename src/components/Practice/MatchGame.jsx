import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { shuffleArray } from '../../utils/helpers';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import './MatchGame.css';

export default function MatchGame({ words, onComplete, onUpdateWord, onAnswer }) {
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [errorIds, setErrorIds] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [erroredIds, setErroredIds] = useState(() => new Set());
  const [timer, setTimer] = useState(0);
  // Local, updated-as-we-go copy of `words` — a left item can be mismatched
  // more than once before it's finally matched, and each attempt must build
  // on the previous one's result instead of recomputing from the original
  // pre-session stability every time (which would silently erase earlier
  // mismatch penalties once the word is eventually matched correctly).
  const [liveWords, setLiveWords] = useState(words);
  // Elapsed time since the board last returned to "nothing selected" —
  // the closest equivalent this order-independent, two-click game has to
  // the other games' "time from question shown to answer given".
  const attemptStartRef = useRef(Date.now());

  useEffect(() => {
    const playWords = words.slice(0, 8);
    setLeftItems(shuffleArray(playWords.map(w => ({ id: w.id, text: w.word }))));
    setRightItems(shuffleArray(playWords.map(w => ({ id: w.id, text: w.translation }))));
    setLiveWords(words);
    const int = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(int);
  }, [words]);

  // Reset the attempt timer whenever the board is idle (right after a match
  // resolves, or after an error's brief highlight clears) — i.e. whenever a
  // fresh attempt is about to begin.
  useEffect(() => {
    if (!selectedLeft && !selectedRight) {
      attemptStartRef.current = Date.now();
    }
  }, [selectedLeft, selectedRight]);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const responseTime = (Date.now() - attemptStartRef.current) / 1000;

      if (selectedLeft === selectedRight) {
        // Match!
        const newMatched = [...matchedIds, selectedLeft];
        setMatchedIds(newMatched);
        setSelectedLeft(null);
        setSelectedRight(null);

        const word = liveWords.find(w => w.id === selectedLeft);
        if (word) {
          const confidence = inferConfidenceFromSpeed(responseTime, true);
          onUpdateWord(word.id, { isCorrect: true, confidence, responseTime, retrievalType: 'passive_recall' })
            .then((updated) => {
              if (updated) setLiveWords(prev => prev.map(w => (w.id === word.id ? { ...w, ...updated } : w)));
            });
          if (onAnswer) onAnswer(word, true);
        }

        if (newMatched.length === leftItems.length) {
          setTimeout(() => {
            onComplete({
              totalWords: leftItems.length,
              correctCount: leftItems.length - erroredIds.size,
              incorrectCount: erroredIds.size
            });
          }, 800);
        }
      } else {
        // Error
        setErrorIds([selectedLeft, selectedRight]);
        setMistakes(m => m + 1);
        setErroredIds(prev => new Set(prev).add(selectedLeft));
        const word = liveWords.find(w => w.id === selectedLeft);
        if (word) {
          const confidence = inferConfidenceFromSpeed(responseTime, false);
          onUpdateWord(word.id, { isCorrect: false, confidence, responseTime, retrievalType: 'passive_recall' })
            .then((updated) => {
              if (updated) setLiveWords(prev => prev.map(w => (w.id === word.id ? { ...w, ...updated } : w)));
            });
          if (onAnswer) onAnswer(word, false);
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
        <div className="match-stat-pill">Vaqt: <span>{formatTime(timer)}</span></div>
        <div className="match-stat-pill">Qoldi: <span>{remaining}</span></div>
        <div className="match-stat-pill">Xato: <span>{mistakes}</span></div>
      </div>

      <div className="match-grid">
        <div className="match-column">
          <div className="match-column-label">Inglizcha</div>
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
              {matchedIds.includes(item.id) && <Check className="match-item-check" size={14} strokeWidth={2.5} />}
            </motion.div>
          ))}
        </div>

        <div className="match-column">
          <div className="match-column-label">Tarjima</div>
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
              {matchedIds.includes(item.id) && <Check className="match-item-check" size={14} strokeWidth={2.5} />}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
