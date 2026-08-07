import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Check, X } from 'lucide-react';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { speakWord, shuffleArray } from '../../utils/helpers';
import { findConfusableMatch } from '../../experiment/textSimilarity';
import { recordConfusionPair } from '../../experiment/experimentDB';
import { useAuth } from '../../contexts/AuthContext';
import { useKeyboardInset } from '../../hooks/useKeyboardInset';
import './SpellingGame.css';

const CONFUSION_THRESHOLD = 0.6;

export default function SpellingGame({ words, allWords, onComplete, onUpdateWord, onAnswer, onProgress, language = 'en-US' }) {
  const { user } = useAuth();
  const keyboardInset = useKeyboardInset();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [scrambledList, setScrambledList] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const inputRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const currentWord = words[currentIndex];

  // Report progress
  useEffect(() => {
    if (onProgress && words) {
      onProgress(currentIndex, words.length);
    }
  }, [currentIndex, words, onProgress]);

  useEffect(() => {
    if (!currentWord) return;
    setScrambledList(shuffleArray(currentWord.word.trim().split('')));
    setInput('');
    setAnswered(false);
    setIsCorrect(false);
    startTimeRef.current = Date.now();
  }, [currentIndex]);

  // Compute used indices in scrambledList based on current input text
  const usedIndices = new Set();
  const typedChars = input.toLowerCase().split('');
  typedChars.forEach((ch) => {
    const idx = scrambledList.findIndex((letter, i) => !usedIndices.has(i) && letter.toLowerCase() === ch);
    if (idx !== -1) {
      usedIndices.add(idx);
    }
  });

  useEffect(() => {
    if (inputRef.current && !answered) {
      inputRef.current.focus();
    }
  }, [currentIndex, answered]);

  const getLangAdjective = (langCode) => {
    if (!langCode) return 'English';
    const prefix = langCode.toLowerCase().slice(0, 2);
    switch (prefix) {
      case 'de': return 'German';
      case 'ko': return 'Korean';
      case 'ru': return 'Russian';
      case 'fr': return 'French';
      case 'es': return 'Spanish';
      case 'tr': return 'Turkish';
      case 'it': return 'Italian';
      case 'pt': return 'Portuguese';
      case 'ar': return 'Arabic';
      case 'zh': return 'Chinese';
      case 'ja': return 'Japanese';
      case 'uz': return 'Uzbek';
      default: return 'English';
    }
  };

  const normalizeForComparison = (str) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/ß/g, 'ss')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const submitAnswer = async (overrideWord) => {
    if (answered) return;
    const submittedInput = overrideWord ?? input;
    if (!submittedInput.trim()) return;

    const responseTime = (Date.now() - startTimeRef.current) / 1000;
    const cleanSubmitted = submittedInput.toLowerCase().trim().replace(/\s+/g, ' ');
    const cleanTarget = currentWord.word.toLowerCase().trim().replace(/\s+/g, ' ');
    const correct = cleanSubmitted === cleanTarget || normalizeForComparison(cleanSubmitted) === normalizeForComparison(cleanTarget);
    setAnswered(true);
    setIsCorrect(correct);
    if (onAnswer) onAnswer(currentWord, correct);

    const confidence = inferConfidenceFromSpeed(responseTime, correct);
    onUpdateWord(currentWord.id, {
      isCorrect: correct,
      confidence,
      responseTime,
      retrievalType: 'active_recall',
    });

    if (correct) {
      setCorrectCount(c => c + 1);
    } else {
      setIncorrectCount(c => c + 1);
      detectConfusion(submittedInput);
    }
  };

  const handleTileClick = (letter, isUsed) => {
    if (answered) return;
    if (!isUsed) {
      setInput(prev => prev + letter);
    } else {
      // Remove last occurrence of letter
      const idx = input.lastIndexOf(letter.toLowerCase());
      const altIdx = input.lastIndexOf(letter.toUpperCase());
      const removeAt = Math.max(idx, altIdx);
      if (removeAt !== -1) {
        setInput(prev => prev.slice(0, removeAt) + prev.slice(removeAt + 1));
      }
    }
  };

  /**
   * A wrong spelling that closely matches a *different* word's spelling is
   * evidence of interference between the two (e.g. typing "though" for
   * "although") — feeds the same Confusion Network Memory Lab uses, so it's
   * populated by regular practice too, not just Memory Lab sessions.
   */
  const detectConfusion = (typedText) => {
    if (!user || !Array.isArray(allWords)) return;

    const best = findConfusableMatch(typedText, allWords, {
      excludeId: currentWord.id,
      getField: (w) => w.word,
      threshold: CONFUSION_THRESHOLD,
    });
    if (best) {
      recordConfusionPair(user.uid, currentWord.id, best.id, {
        wordA: currentWord.word,
        wordB: best.candidate.word,
        translationA: currentWord.translation,
        translationB: best.candidate.translation,
      }).catch((err) => console.warn('Failed to record confusion pair:', err));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitAnswer();
  };

  const handleSkip = async () => {
    if (answered) return;
    const responseTime = (Date.now() - startTimeRef.current) / 1000;
    setInput(currentWord.word.trim());
    setAnswered(true);
    setIsCorrect(false);
    if (onAnswer) onAnswer(currentWord, false);
    onUpdateWord(currentWord.id, {
      isCorrect: false,
      confidence: inferConfidenceFromSpeed(responseTime, false),
      responseTime,
      retrievalType: 'active_recall',
    });
    setIncorrectCount(c => c + 1);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete({ totalWords: words.length, correctCount, incorrectCount });
    }
  };

  if (!currentWord) return null;

  const isLast = currentIndex === words.length - 1;

  const wordLength = currentWord ? currentWord.word.trim().length : 0;
  const tileSizeClass = wordLength > 12 ? 'size-xs' : wordLength > 9 ? 'size-sm' : wordLength > 6 ? 'size-md' : '';

  const targetLength = currentWord ? (currentWord.translation || '').length : 0;
  const targetSizeClass = targetLength > 30 ? 'target-xs' : targetLength > 18 ? 'target-sm' : '';

  return (
    <div className="spelling-container">
      <div className="spelling-progress-label">
        <span>{currentIndex + 1} / {words.length}</span>
        <button className="btn-spell-speak" type="button" onClick={() => speakWord(currentWord.word, language)}>
          <Volume2 size={14} strokeWidth={2.3} />
          Listen
        </button>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={`spelling-card ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="spelling-card-label">Type the {getLangAdjective(language)} word</div>
          <div className={`spelling-target ${targetSizeClass}`}>{currentWord.translation}</div>
          <div className="spelling-scramble-label">
            Scrambled letters ({wordLength} letters):
          </div>
          <div className={`spelling-tiles-wrapper ${tileSizeClass}`}>
            {scrambledList.map((letter, idx) => {
              const isUsed = usedIndices.has(idx);
              return (
                <span
                  key={idx}
                  className={`scrambled-tile ${isUsed ? 'used' : ''}`}
                  onClick={() => handleTileClick(letter, isUsed)}
                  title={isUsed ? "O'chirish uchun bosing" : "Tanlash uchun bosing"}
                >
                  {letter}
                </span>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="spelling-form">
            <input
              ref={inputRef}
              type="text"
              className={`spelling-input ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}`}
              value={input}
              onChange={e => !answered && setInput(e.target.value)}
              disabled={answered}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              placeholder="Type the word..."
            />
          </form>
        </motion.div>
      </AnimatePresence>

      {/* Fixed full-width bottom bar */}
      <div
        className={`spelling-bottom-bar ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}`}
        style={keyboardInset > 0 ? { transform: `translateY(-${keyboardInset}px)` } : undefined}
      >
        <div className="spelling-bottom-bar-inner">
          {!answered ? (
            <>
              <button type="button" className="btn btn-ghost" onClick={handleSkip}>
                Don't know
              </button>
              <button
                type="button"
                className="btn-spell-submit"
                onClick={() => submitAnswer()}
                disabled={!input.trim()}
              >
                Check
              </button>
            </>
          ) : (
            <>
              <div className="spelling-bottom-feedback">
                {isCorrect ? <Check size={18} strokeWidth={2.5} /> : <X size={18} strokeWidth={2.5} />}
                <span>
                  {isCorrect ? "Correct!" : <>Answer: <strong>{currentWord.word}</strong></>}
                </span>
              </div>
              <button type="button" className="btn-spell-next" onClick={handleNext}>
                {isLast ? 'Results →' : 'Next →'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
