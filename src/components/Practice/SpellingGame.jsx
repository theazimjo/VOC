import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Check, X } from 'lucide-react';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { speakWord, shuffleArray } from '../../utils/helpers';
import { findConfusableMatch } from '../../experiment/textSimilarity';
import { recordConfusionPair } from '../../experiment/experimentDB';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useKeyboardInset } from '../../hooks/useKeyboardInset';
import './SpellingGame.css';

const CONFUSION_THRESHOLD = 0.6;

export default function SpellingGame({ words, allWords, onComplete, onUpdateWord, onAnswer, onProgress, language = 'en-US', isEnglishPack = false }) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const keyboardInset = useKeyboardInset();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answeredWord, setAnsweredWord] = useState('');
  const [scrambledList, setScrambledList] = useState([]);
  const [usedTileIndices, setUsedTileIndices] = useState([]);
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
    setUsedTileIndices([]);
    setAnswered(false);
    setIsCorrect(false);
    setAnsweredWord('');
    startTimeRef.current = Date.now();
  }, [currentIndex]);

  useEffect(() => {
    if (!answered) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, answered]);

  // Handle Enter keypress for both submitting answer and advancing to next word
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (!answered) {
          if (input.trim()) {
            e.preventDefault();
            submitAnswer();
          }
        } else {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answered, input, currentIndex, words]);

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
    setAnsweredWord(currentWord.word);
    if (onAnswer) onAnswer(currentWord, correct);

    const confidence = inferConfidenceFromSpeed(responseTime, correct);
    onUpdateWord(currentWord.id, {
      isCorrect: correct,
      confidence,
      responseTime,
      retrievalType: 'active_recall',
      mode: 'spelling',
    });

    if (correct) {
      setCorrectCount(c => c + 1);
    } else {
      setIncorrectCount(c => c + 1);
      detectConfusion(submittedInput);
    }
  };

  // Tile identity is tracked by exact scrambled-tile index, in tap order —
  // not re-derived from `input` text by matching letters position-blind.
  // A word with a repeated letter (e.g. the two "l"s in "hello") has two
  // tiles that look identical but sit at different positions; deriving
  // "used" purely by scanning for the first matching letter could mark a
  // DIFFERENT tile than the one actually tapped, making the two identical
  // letters look like they'd been merged into one.
  const handleTileClick = (idx) => {
    if (answered) return;
    if (usedTileIndices.includes(idx)) {
      const posInSequence = usedTileIndices.indexOf(idx);
      setUsedTileIndices(prev => prev.filter(i => i !== idx));
      setInput(prev => prev.slice(0, posInSequence) + prev.slice(posInSequence + 1));
    } else {
      setUsedTileIndices(prev => [...prev, idx]);
      setInput(prev => prev + scrambledList[idx]);
    }
  };

  // Typing directly into the text field has no tile-click identity to
  // preserve (no specific tile was ever "the one" pressed), so this
  // recomputes the tile highlighting best-effort, position-blind — the
  // same approach the click path used to rely on. That's fine here: the
  // duplicate-letter mismatch above only bites when a specific tile's
  // pressed/not-pressed state has to track a specific tap.
  const handleInputChange = (e) => {
    if (answered) return;
    const newValue = e.target.value;
    setInput(newValue);

    const used = [];
    const usedSet = new Set();
    newValue.toLowerCase().split('').forEach((ch) => {
      const idx = scrambledList.findIndex((letter, i) => !usedSet.has(i) && letter.toLowerCase() === ch);
      if (idx !== -1) {
        usedSet.add(idx);
        used.push(idx);
      }
    });
    setUsedTileIndices(used);
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
    setAnsweredWord(currentWord.word);
    if (onAnswer) onAnswer(currentWord, false);
    onUpdateWord(currentWord.id, {
      isCorrect: false,
      confidence: inferConfidenceFromSpeed(responseTime, false),
      responseTime,
      retrievalType: 'active_recall',
      mode: 'spelling',
    });
    setIncorrectCount(c => c + 1);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextWord = words[nextIndex];
      setCurrentIndex(nextIndex);
      setInput('');
      setUsedTileIndices([]);
      setAnswered(false);
      setIsCorrect(false);
      setAnsweredWord('');
      if (nextWord) {
        setScrambledList(shuffleArray(nextWord.word.trim().split('')));
      }
      startTimeRef.current = Date.now();
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
        {/* Speaking the word aloud would hand over the answer in English-pack
            mode (the definition drill's whole point is recalling the word
            from its meaning), so the audio hint is only offered otherwise. */}
        {!isEnglishPack && (
          <button className="btn-spell-speak" type="button" onClick={() => speakWord(currentWord.word, language)}>
            <Volume2 size={14} strokeWidth={2.3} />
            {t('practice.listen')}
          </button>
        )}
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
          {isEnglishPack ? (
            <>
              <div className="spelling-card-label">{t('practice.whichWordDefined')}</div>
              <div className="spelling-definition">{currentWord.definition}</div>
            </>
          ) : (
            <>
              <div className="spelling-card-label">{t('practice.typeWord', { lang: getLangAdjective(language) })}</div>
              <div className={`spelling-target ${targetSizeClass}`}>{currentWord.translation}</div>
            </>
          )}
          <div className="spelling-scramble-label">
            {t('practice.scrambledLetters', { count: wordLength })}
          </div>
          <div className={`spelling-tiles-wrapper ${tileSizeClass}`}>
            {scrambledList.map((letter, idx) => {
              const isUsed = usedTileIndices.includes(idx);
              return (
                <span
                  key={idx}
                  className={`scrambled-tile ${isUsed ? 'used' : ''}`}
                  onClick={() => handleTileClick(idx)}
                  title={isUsed ? "O'chirish uchun bosing" : "Tanlash uchun bosing"}
                >
                  {letter}
                </span>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="spelling-form" autoComplete="off" noValidate data-lpignore="true" data-1p-ignore="true">
            <input
              ref={(el) => {
                inputRef.current = el;
                if (el && !answered) {
                  requestAnimationFrame(() => el.focus());
                }
              }}
              type="text"
              name="practice_no_autofill_input"
              className={`spelling-input ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}`}
              value={input}
              onChange={handleInputChange}
              disabled={answered}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              inputMode="text"
              aria-autocomplete="none"
              data-lpignore="true"
              data-1p-ignore="true"
              data-form-type="other"
              data-gramm="false"
              data-enable-grammarly="false"
              placeholder={t('practice.typeWordPlaceholder')}
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
                {t('practice.dontKnow')}
              </button>
              <button
                type="button"
                className="btn-spell-submit"
                onClick={() => submitAnswer()}
                disabled={!input.trim()}
              >
                {t('practice.check')}
              </button>
            </>
          ) : (
            <>
              <div className="spelling-bottom-feedback">
                {isCorrect ? <Check size={18} strokeWidth={2.5} /> : <X size={18} strokeWidth={2.5} />}
                <span>
                  {isCorrect ? t('practice.greatSentence').split('!')[0] + '!' : <> {t('practice.answerIs', { answer: '' })} <strong>{answeredWord || currentWord.word}</strong></>}
                </span>
              </div>
              <button type="button" className="btn-spell-next" onClick={handleNext}>
                {isLast ? t('practice.resultsBtn') : t('practice.nextBtn')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
