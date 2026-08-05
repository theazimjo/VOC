import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Check, X } from 'lucide-react';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { speakWord } from '../../utils/helpers';
import { findConfusableMatch } from '../../experiment/textSimilarity';
import { recordConfusionPair } from '../../experiment/experimentDB';
import { useAuth } from '../../contexts/AuthContext';
import './SpellingGame.css';

const CONFUSION_THRESHOLD = 0.6;

export default function SpellingGame({ words, allWords, onComplete, onUpdateWord, onAnswer, onProgress, language = 'en-US' }) {
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [scrambled, setScrambled] = useState('');
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
    setScrambled(currentWord.word.trim().split('').sort(() => 0.5 - Math.random()).join(' '));
    setInput('');
    setAnswered(false);
    setIsCorrect(false);
    startTimeRef.current = Date.now();
  }, [currentIndex]);

  useEffect(() => {
    if (inputRef.current && !answered) {
      inputRef.current.focus();
    }
  }, [currentIndex, answered]);

  const submitAnswer = async (overrideWord) => {
    if (answered) return;
    const submittedInput = overrideWord ?? input;
    if (!submittedInput.trim()) return;

    const responseTime = (Date.now() - startTimeRef.current) / 1000;
    const cleanSubmitted = submittedInput.toLowerCase().trim().replace(/\s+/g, ' ');
    const cleanTarget = currentWord.word.toLowerCase().trim().replace(/\s+/g, ' ');
    const correct = cleanSubmitted === cleanTarget;
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

  return (
    <div className="spelling-container">
      <div className="spelling-progress-label">
        <span>{currentIndex + 1} / {words.length}</span>
        <button className="btn-spell-speak" type="button" onClick={() => speakWord(currentWord.word, language)}>
          <Volume2 size={14} strokeWidth={2.3} />
          Eshitish
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
          <div className="spelling-card-label">Tarjimani yozing (inglizcha)</div>
          <div className="spelling-target">{currentWord.translation}</div>
          {currentWord.definition && (
            <div className="spelling-definition">{currentWord.definition}</div>
          )}
          <div className="spelling-scramble-label">Aralashtirilgan harflar:</div>
          <div className="spelling-hint">{scrambled}</div>

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
              placeholder="So'zni yozing..."
            />
          </form>
        </motion.div>
      </AnimatePresence>

      {/* Fixed full-width bottom bar, styled with the app's own design language */}
      <div className={`spelling-bottom-bar ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}`}>
        <div className="spelling-bottom-bar-inner">
          {!answered ? (
            <>
              <button type="button" className="btn btn-ghost" onClick={handleSkip}>
                Bilmadim
              </button>
              <button
                type="button"
                className="btn-spell-submit"
                onClick={() => submitAnswer()}
                disabled={!input.trim()}
              >
                Tekshirish
              </button>
            </>
          ) : (
            <>
              <div className="spelling-bottom-feedback">
                {isCorrect ? <Check size={18} strokeWidth={2.5} /> : <X size={18} strokeWidth={2.5} />}
                <span>
                  {isCorrect ? "To'g'ri!" : <>Javob: <strong>{currentWord.word}</strong></>}
                </span>
              </div>
              <button type="button" className="btn-spell-next" onClick={handleNext}>
                {isLast ? 'Natijalar →' : 'Keyingisi →'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
