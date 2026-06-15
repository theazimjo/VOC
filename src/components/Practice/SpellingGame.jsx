import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { calculateNextReview } from '../../utils/sm2';
import './SpellingGame.css';

export default function SpellingGame({ words, onComplete, onUpdateWord }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('playing'); // playing, correct, wrong
  const [results, setResults] = useState({ correctCount: 0, incorrectCount: 0 });
  const inputRef = useRef(null);

  const currentWord = words[currentIndex];

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [currentIndex]);

  const getScrambled = (word) => {
    return word.split('').sort(() => 0.5 - Math.random()).join(' ');
  };

  const [scrambled, setScrambled] = useState('');
  
  useEffect(() => {
    if (currentWord) setScrambled(getScrambled(currentWord.word));
  }, [currentWord]);

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

    const newResults = {
      correctCount: results.correctCount + (isCorrect ? 1 : 0),
      incorrectCount: results.incorrectCount + (isCorrect ? 0 : 1)
    };
    setResults(newResults);

    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setInput('');
        setStatus('playing');
      } else {
        onComplete({ totalWords: words.length, ...newResults });
      }
    }, 1500);
  };

  if (!currentWord) return null;

  return (
    <div className="spelling-container">
      <div className="flashcard-progress">
        <span>{currentIndex + 1}</span> / {words.length}
      </div>

      <motion.div 
        className="spelling-card"
        animate={status === 'wrong' ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="spelling-target">{currentWord.translation}</div>
        <div className="spelling-hint">{scrambled}</div>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className={`spelling-input ${status}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={status !== 'playing'}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </form>

        <div className="spelling-feedback">
          {status === 'correct' && <span style={{ color: 'var(--success)' }}>To'g'ri! 🎉</span>}
          {status === 'wrong' && <span style={{ color: 'var(--error)' }}>Xato. To'g'ri: {currentWord.word}</span>}
        </div>
      </motion.div>

      <button 
        className="btn btn-ghost" 
        onClick={() => { setInput(currentWord.word); handleSubmit({ preventDefault: () => {} }); }}
        disabled={status !== 'playing'}
      >
        Bilmadim (Javobni ko'rish)
      </button>
    </div>
  );
}
