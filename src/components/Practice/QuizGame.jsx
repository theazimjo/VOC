import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { shuffleArray, speakWord } from '../../utils/helpers';
import { calculateNextReview } from '../../utils/sm2';
import './QuizGame.css';

export default function QuizGame({ words, onComplete, onUpdateWord }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [results, setResults] = useState({ correctCount: 0, incorrectCount: 0 });
  
  const currentWord = words[currentIndex];

  // Autoplay pronunciation on question load
  useEffect(() => {
    if (currentWord) {
      speakWord(currentWord.word);
    }
  }, [currentIndex, currentWord]);

  useEffect(() => {
    if (currentWord) {
      // Generate options
      const correctOption = currentWord.translation;
      const otherWords = words.filter(w => w.id !== currentWord.id);
      
      // Get up to 3 random wrong options
      const wrongOptions = shuffleArray(otherWords)
        .slice(0, 3)
        .map(w => w.translation);
        
      // Ensure we have 4 options even if we don't have enough words
      while (wrongOptions.length < 3) {
        wrongOptions.push(`Variant ${wrongOptions.length + 1}`);
      }

      setOptions(shuffleArray([correctOption, ...wrongOptions]));
      setSelectedOption(null);
      setTimeLeft(15);
    }
  }, [currentIndex, currentWord, words]);

  useEffect(() => {
    if (timeLeft > 0 && !selectedOption) {
      const timerId = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !selectedOption) {
      handleSelect(null); // Time's up
    }
  }, [timeLeft, selectedOption]);

  const handleSelect = async (option) => {
    if (selectedOption) return; // Prevent multiple clicks

    setSelectedOption(option);
    
    const isCorrect = option === currentWord.translation;
    
    // Update SM-2
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
      } else {
        onComplete({ totalWords: words.length, ...newResults });
      }
    }, 1500);
  };

  if (!currentWord) return null;

  return (
    <div className="quiz-container">
      <div className="flashcard-progress">
        <span>{currentIndex + 1}</span> / {words.length}
      </div>

      <div className="quiz-question-card">
        <div className="quiz-question">
          {currentWord.word}
          <button
            className="btn-speak-quiz"
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
        <div className="quiz-timer-bar">
          <div 
            className="quiz-timer-fill" 
            style={{ 
              width: `${(timeLeft / 15) * 100}%`,
              background: timeLeft <= 3 ? 'var(--error)' : 'var(--accent-3)'
            }} 
          />
        </div>
      </div>

      <div className="quiz-options">
        {options.map((opt, idx) => {
          let className = "quiz-option";
          if (selectedOption) {
            if (opt === currentWord.translation) className += " correct";
            else if (opt === selectedOption) className += " wrong";
          }

          return (
            <motion.button
              key={idx}
              className={className}
              onClick={() => handleSelect(opt)}
              disabled={!!selectedOption}
              whileHover={!selectedOption ? { scale: 1.02 } : {}}
              whileTap={!selectedOption ? { scale: 0.98 } : {}}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
