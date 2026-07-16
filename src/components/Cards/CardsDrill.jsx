import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { shuffleArray, speakWord } from '../../utils/helpers';
import { playSound, triggerVibration } from '../../utils/feedback';
import { gradientForWord } from '../../utils/cardGradients';
import './CardsDrill.css';

export default function CardsDrill({ words, allWords, onComplete }) {
  const [index, setIndex] = useState(0);
  const [challengeType, setChallengeType] = useState('quiz'); // quiz | scramble | spelling
  const [status, setStatus] = useState('idle'); // idle | correct | wrong
  
  // Quiz states
  const [quizOptions, setQuizOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // Scramble states
  const [letterPool, setLetterPool] = useState([]); // Array of { id, char, used }
  const [assembled, setAssembled] = useState([]); // Array of { poolId, char }

  // Spelling states
  const [spellingInput, setSpellingInput] = useState('');
  const [hintLetters, setHintLetters] = useState(0);

  // Correction states
  const [showCorrection, setShowCorrection] = useState(false);
  const [correctionInput, setCorrectionInput] = useState('');

  // Performance stats
  const [isCorrectFirstTry, setIsCorrectFirstTry] = useState(true);
  const [results, setResults] = useState([]); // Array of { word, correct }
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const inputRef = useRef(null);
  const correctionRef = useRef(null);

  const current = words[index];
  const gradients = useMemo(
    () => words.map((w, i) => gradientForWord(w.id, i)),
    [words]
  );

  // Set up the challenge for the current word
  useEffect(() => {
    if (!current) return;

    setStatus('idle');
    setIsCorrectFirstTry(true);
    setShowCorrection(false);
    setCorrectionInput('');
    
    // Determine challenge type based on index
    // 0 -> Quiz, 1 -> Scramble, 2 -> Spelling, 3 -> Quiz, etc.
    const types = ['quiz', 'scramble', 'spelling'];
    const selectedType = types[index % types.length];
    setChallengeType(selectedType);

    if (selectedType === 'quiz') {
      // Generate quiz options
      const correctWord = current.word;
      const otherWordsPool = (allWords || []).filter(
        w => w.word.toLowerCase() !== correctWord.toLowerCase()
      );
      const wrongWords = shuffleArray(otherWordsPool)
        .slice(0, 3)
        .map(w => w.word);

      // Fallback if not enough words
      const defaultFallbacks = ['solicitor', 'blouse', 'verify', 'accomplish', 'schedule', 'practice', 'mastery'];
      while (wrongWords.length < 3) {
        const fb = defaultFallbacks[wrongWords.length % defaultFallbacks.length];
        if (!wrongWords.includes(fb) && fb.toLowerCase() !== correctWord.toLowerCase()) {
          wrongWords.push(fb);
        } else {
          wrongWords.push(fb + wrongWords.length);
        }
      }
      setQuizOptions(shuffleArray([correctWord, ...wrongWords]));
      setSelectedOption(null);

    } else if (selectedType === 'scramble') {
      // Setup letters
      const letters = current.word.split('');
      const pool = letters.map((char, i) => ({
        id: i,
        char: char,
        used: false
      }));
      setLetterPool(shuffleArray(pool));
      setAssembled([]);

    } else if (selectedType === 'spelling') {
      setSpellingInput('');
      setHintLetters(0);
      if (inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [index, current, allWords]);

  // Focus spelling input or correction input
  useEffect(() => {
    if (challengeType === 'spelling' && !showCorrection && inputRef.current) {
      inputRef.current.focus();
    }
  }, [challengeType, showCorrection]);

  useEffect(() => {
    if (showCorrection && correctionRef.current) {
      correctionRef.current.focus();
    }
  }, [showCorrection]);

  if (!current) return null;

  // Handle word pronunciation
  const handlePronounce = () => {
    speakWord(current.word);
  };

  // Check Quiz choice
  const handleQuizSelect = (option) => {
    if (status !== 'idle') return;
    setSelectedOption(option);
    
    const correct = option.toLowerCase().trim() === current.word.toLowerCase().trim();
    if (correct) {
      handleAnswerCorrect();
    } else {
      handleAnswerWrong();
    }
  };

  // Scramble letters clicking
  const handlePoolLetterClick = (item) => {
    if (status !== 'idle' || item.used) return;

    // Mark as used in pool
    setLetterPool(prev => prev.map(p => p.id === item.id ? { ...p, used: true } : p));
    // Add to assembled
    setAssembled(prev => [...prev, { poolId: item.id, char: item.char }]);
  };

  const handleAssembledLetterClick = (item, idx) => {
    if (status !== 'idle') return;

    // Remove from assembled
    setAssembled(prev => prev.filter((_, i) => i !== idx));
    // Restore in pool
    setLetterPool(prev => prev.map(p => p.id === item.poolId ? { ...p, used: false } : p));
  };

  const checkScramble = () => {
    if (status !== 'idle') return;
    const assembledStr = assembled.map(a => a.char).join('');
    const correct = assembledStr.toLowerCase() === current.word.toLowerCase();
    
    if (correct) {
      handleAnswerCorrect();
    } else {
      handleAnswerWrong();
    }
  };

  const clearScramble = () => {
    if (status !== 'idle') return;
    setAssembled([]);
    setLetterPool(prev => prev.map(p => ({ ...p, used: false })));
  };

  // Spelling actions
  const handleSpellingSubmit = (e) => {
    e?.preventDefault();
    if (status !== 'idle') return;
    if (!spellingInput.trim()) return;

    const correct = spellingInput.toLowerCase().trim() === current.word.toLowerCase().trim();
    if (correct) {
      handleAnswerCorrect();
    } else {
      handleAnswerWrong();
    }
  };

  const triggerHint = () => {
    if (status !== 'idle') return;
    // Reveal next letter
    setIsCorrectFirstTry(false); // Used hint, so first try is not correct
    const targetWord = current.word;
    const nextHintLen = hintLetters + 1;
    if (nextHintLen <= targetWord.length) {
      setHintLetters(nextHintLen);
      setSpellingInput(targetWord.slice(0, nextHintLen));
    }
  };

  // Result handling
  const handleAnswerCorrect = () => {
    setStatus('correct');
    speakWord(current.word);
    playSound('correct');
    triggerVibration('correct');
    
    const newStreak = isCorrectFirstTry ? streak + 1 : streak;
    setStreak(newStreak);
    if (newStreak > maxStreak) {
      setMaxStreak(newStreak);
    }

    setTimeout(() => {
      proceedToNext(true);
    }, 1200);
  };

  const handleAnswerWrong = () => {
    setStatus('wrong');
    setIsCorrectFirstTry(false);
    setStreak(0); // Break streak
    playSound('wrong');
    triggerVibration('wrong');

    // Play buzz sound or shake
    setTimeout(() => {
      setShowCorrection(true);
    }, 1000);
  };

  const proceedToNext = (firstTryResult) => {
    const finalResults = [...results, { word: current, correct: firstTryResult }];
    setResults(finalResults);

    const nextIndex = index + 1;
    if (nextIndex >= words.length) {
      onComplete(finalResults);
    } else {
      setIndex(nextIndex);
    }
  };

  // Correction input handling
  const handleCorrectionChange = (e) => {
    if (status === 'correct') return; // already matched & advance timer armed — ignore further input

    const val = e.target.value;
    setCorrectionInput(val);

    // If typed correctly, auto proceed
    if (val.trim().toLowerCase() === current.word.toLowerCase().trim()) {
      setStatus('correct');
      speakWord(current.word);
      setTimeout(() => {
        proceedToNext(false); // Incorrect on first try, but successfully corrected
      }, 1000);
    }
  };

  const skipWord = () => {
    setStreak(0);
    proceedToNext(false);
  };

  // Render sub-components
  const renderQuiz = () => {
    return (
      <div className="cd-quiz-layout">
        <span className="cd-instruction">To'g'ri inglizcha tarjimani tanlang:</span>
        <div className="cd-quiz-options">
          {quizOptions.map((opt, idx) => {
            let btnClass = '';
            if (status !== 'idle') {
              const isOptionCorrect = opt.toLowerCase() === current.word.toLowerCase();
              const isOptionSelected = opt === selectedOption;
              if (isOptionCorrect) {
                btnClass = 'is-correct';
              } else if (isOptionSelected) {
                btnClass = 'is-wrong';
              } else {
                btnClass = 'is-dimmed';
              }
            }
            return (
              <motion.button
                key={idx}
                className={`cd-quiz-opt-btn ${btnClass}`}
                disabled={status !== 'idle'}
                onClick={() => handleQuizSelect(opt)}
                whileHover={status === 'idle' ? { scale: 1.02, y: -2 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <span className="cd-quiz-index">{['A', 'B', 'C', 'D'][idx]}</span>
                <span className="cd-quiz-text">{opt}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderScramble = () => {
    const targetWord = current.word;
    const isReadyToCheck = assembled.length === targetWord.length;

    return (
      <div className="cd-scramble-layout">
        <span className="cd-instruction">Harflardan so'zni yig'ing:</span>
        
        {/* Assembled Area */}
        <div className="cd-assembled-row">
          {Array.from({ length: targetWord.length }).map((_, i) => {
            const letterObj = assembled[i];
            return (
              <motion.div
                key={i}
                className={`cd-scramble-slot ${letterObj ? 'has-letter' : ''} ${status === 'wrong' ? 'is-wrong' : ''}`}
                onClick={() => letterObj && handleAssembledLetterClick(letterObj, i)}
                whileHover={letterObj && status === 'idle' ? { scale: 1.05 } : {}}
              >
                {letterObj ? letterObj.char : ''}
              </motion.div>
            );
          })}
        </div>

        {/* Letter Pool */}
        <div className="cd-pool-row">
          {letterPool.map((item) => (
            <motion.button
              key={item.id}
              className={`cd-pool-letter ${item.used ? 'is-used' : ''}`}
              disabled={item.used || status !== 'idle'}
              onClick={() => handlePoolLetterClick(item)}
              whileHover={!item.used && status === 'idle' ? { scale: 1.1, y: -3 } : {}}
              whileTap={!item.used && status === 'idle' ? { scale: 0.9 } : {}}
            >
              {item.char}
            </motion.button>
          ))}
        </div>

        {/* Actions */}
        {status === 'idle' && (
          <div className="cd-scramble-actions">
            <button
              className="btn btn-ghost cd-btn-sm"
              onClick={clearScramble}
              disabled={assembled.length === 0}
            >
              🧹 Tozalash
            </button>
            <button
              className="btn btn-primary cd-btn-sm"
              onClick={checkScramble}
              disabled={!isReadyToCheck}
            >
              ✓ Tekshirish
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderSpelling = () => {
    // Generate placeholder dots for spelling help
    const targetWord = current.word;
    const placeholder = targetWord
      .split('')
      .map((ch, idx) => (idx < hintLetters ? ch : '_'))
      .join(' ');

    return (
      <div className="cd-spelling-layout">
        <span className="cd-instruction">So'zning inglizcha yozilishini kiriting:</span>
        
        <div className="cd-spelling-hint-visual">
          <code>{placeholder}</code>
        </div>

        <form onSubmit={handleSpellingSubmit} className="cd-spelling-form">
          <input
            ref={inputRef}
            type="text"
            className={`cd-spelling-input ${status === 'correct' ? 'is-correct' : status === 'wrong' ? 'is-wrong' : ''}`}
            placeholder="So'zni yozing..."
            value={spellingInput}
            onChange={(e) => setSpellingInput(e.target.value)}
            disabled={status !== 'idle'}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />

          {status === 'idle' && (
            <div className="cd-spelling-actions">
              <button
                type="button"
                className="btn btn-ghost cd-btn-sm"
                onClick={triggerHint}
                disabled={hintLetters >= targetWord.length}
              >
                💡 Yordam ({targetWord.length - hintLetters})
              </button>
              <button
                type="submit"
                className="btn btn-primary cd-btn-sm"
                disabled={!spellingInput.trim()}
              >
                ✓ Tekshirish
              </button>
            </div>
          )}
        </form>
      </div>
    );
  };

  const renderCorrection = () => {
    return (
      <motion.div
        className="cd-correction-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="cd-corr-header">
          <span className="cd-corr-warning">⚠️ Xatolik yuz berdi!</span>
          <p className="cd-corr-desc">To'g'ri yozilishini takrorlab yozing:</p>
        </div>

        <div className="cd-corr-word-display">
          <span className="cd-corr-word">{current.word}</span>
          <button className="cd-speak-btn cd-speak-btn--large" onClick={handlePronounce} type="button">
            🔊
          </button>
        </div>
        
        <span className="cd-corr-translation">{current.translation}</span>

        <input
          ref={correctionRef}
          type="text"
          className="cd-correction-input"
          placeholder="To'g'ri so'zni yozib chiqing..."
          value={correctionInput}
          onChange={handleCorrectionChange}
          disabled={status === 'correct'}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />

        <div className="cd-corr-progress-hint">
          {correctionInput.trim().toLowerCase() === current.word.toLowerCase().trim() ? (
            <span className="cd-corr-status success">✓ Barakalla! Davom etamiz...</span>
          ) : (
            <span className="cd-corr-status">Kiritish kutilmoqda...</span>
          )}
        </div>

        <button className="btn btn-ghost cd-corr-skip" onClick={skipWord}>
          O'tkazib yuborish →
        </button>
      </motion.div>
    );
  };

  return (
    <div className="cd-root">
      {/* Header Info */}
      <div className="cd-progress-row">
        <div className="cd-header-stats">
          <span className="cd-progress-label">
            Mashq qilinmoqda: <strong>{index + 1} / {words.length}</strong>
          </span>
          {streak > 0 && (
            <motion.span
              className="cd-streak-badge"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={streak}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              🔥 {streak}
            </motion.span>
          )}
        </div>
        <div className="cd-progress-track">
          <motion.div
            className="cd-progress-fill"
            animate={{ width: `${((index) / words.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showCorrection ? (
          <motion.div
            key={current.id}
            className="cd-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Clue zone — vivid gradient, matches the SwipeCard for this word */}
            <div className="cd-clue-zone" style={{ background: gradients[index] }}>
              <div className="cd-clue-header">
                <span className="cd-pos-tag">{current.partOfSpeech || 'so\'z'}</span>
                <button
                  className="cd-speak-btn"
                  onClick={handlePronounce}
                  title="Talaffuzni eshitish"
                  type="button"
                >
                  🔊 Eshitish
                </button>
              </div>

              <h3 className="cd-translation-display">{current.translation}</h3>

              {current.definition && (
                <p className="cd-definition-display">{current.definition}</p>
              )}

              {current.example && (
                <p className="cd-example-display">
                  <em>"{current.example}"</em>
                </p>
              )}
            </div>

            {/* Exercise zone — frosted panel, holds the interactive challenge */}
            <div className="cd-exercise-zone">
              <div className="cd-exercise-area">
                {challengeType === 'quiz' && renderQuiz()}
                {challengeType === 'scramble' && renderScramble()}
                {challengeType === 'spelling' && renderSpelling()}
              </div>

              {/* Status Banners */}
              <AnimatePresence>
                {status === 'correct' && (
                  <motion.div
                    className="cd-status-banner is-correct"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    🎉 Barakalla! To'g'ri!
                  </motion.div>
                )}
                {status === 'wrong' && (
                  <motion.div
                    className="cd-status-banner is-wrong"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    ❌ Noto'g'ri javob!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          renderCorrection()
        )}
      </AnimatePresence>
    </div>
  );
}
