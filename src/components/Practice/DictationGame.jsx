import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { calculateNextReview } from '../../utils/sm2';
import { speakWord } from '../../utils/helpers';
import './DictationGame.css';

export default function DictationGame({ words, onComplete, onUpdateWord }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('playing'); // playing, correct, wrong
  const [results, setResults] = useState({ correctCount: 0, incorrectCount: 0 });
  const [showHint, setShowHint] = useState(false);
  const [showLetters, setShowLetters] = useState(false);
  const inputRef = useRef(null);

  const currentWord = words[currentIndex];

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    setShowHint(false);
    setShowLetters(false);
    if (currentWord) {
      const timer = setTimeout(() => {
        speakWord(currentWord.word);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentWord]);

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
    }, 2000);
  };

  if (!currentWord) return null;

  return (
    <div className="dictation-container">
      <div className="flashcard-progress">
        <span>{currentIndex + 1}</span> / {words.length}
      </div>

      <motion.div 
        className="dictation-card"
        animate={status === 'wrong' ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="audio-trigger-wrapper">
          <button 
            type="button"
            className="btn-play-audio animate-pulse"
            onClick={() => speakWord(currentWord.word)}
            title="So'zni eshitish"
          >
            🔊
          </button>
          <div className="audio-trigger-text">So'zni tinglang va yozing</div>
        </div>

        {showHint && (
          <div className="dictation-translation-hint">
            Tarjimasi: <strong>{currentWord.translation}</strong>
          </div>
        )}

        {showLetters && (
          <div className="dictation-letters-hint">
            Harflar: <code>{scrambled}</code>
          </div>
        )}

        <form onSubmit={handleSubmit} className="dictation-form">
          <input
            ref={inputRef}
            type="text"
            className={`dictation-input ${status}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={status !== 'playing'}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            placeholder="Eshitgan so'zingizni yozing..."
          />
          <button 
            type="submit" 
            className="btn btn-primary dictation-submit-btn"
            disabled={status !== 'playing' || !input.trim()}
          >
            Tekshirish
          </button>
        </form>

        <div className="dictation-feedback">
          {status === 'correct' && <span style={{ color: 'var(--success)' }}>To'g'ri! 🎉</span>}
          {status === 'wrong' && <span style={{ color: 'var(--error)' }}>Xato. To'g'ri yozilishi: {currentWord.word}</span>}
        </div>

        <div className="dictation-hints-actions">
          <button 
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setShowHint(true)}
            disabled={showHint || status !== 'playing'}
          >
            💡 Tarjimani ko'rish
          </button>
          <button 
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setShowLetters(true)}
            disabled={showLetters || status !== 'playing'}
          >
            🔠 Harflarni ko'rish
          </button>
        </div>
      </motion.div>

      <button 
        className="btn btn-ghost" 
        onClick={() => { setInput(currentWord.word); handleSubmit({ preventDefault: () => {} }); }}
        disabled={status !== 'playing'}
      >
        Javobni ko'rsatish
      </button>
    </div>
  );
}
