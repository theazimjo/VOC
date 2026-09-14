import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Check, X, Keyboard, Grid } from 'lucide-react';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { speakWord, shuffleArray } from '../../utils/helpers';
import { findConfusableMatch } from '../../experiment/textSimilarity';
import { recordConfusionPair } from '../../experiment/experimentDB';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useKeyboardInset } from '../../hooks/useKeyboardInset';
import './SpellingGame.css';

const CONFUSION_THRESHOLD = 0.6;

function getWordVariants(rawWord) {
  if (!rawWord) return [];
  const parts = rawWord.split(/[/;,]/).map(p => p.trim()).filter(Boolean);
  return parts.length > 0 ? parts : [rawWord.trim()];
}

export default function SpellingGame({
  words,
  allWords,
  onComplete,
  onUpdateWord,
  onAnswer,
  onProgress,
  onExit,
  language = 'en-US',
  isEnglishPack = false,
}) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const keyboardInset = useKeyboardInset();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [placedTiles, setPlacedTiles] = useState([]); // [{ id, text }]
  const [tileBank, setTileBank] = useState([]); // [{ id, text, isDistractor }]
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);

  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answeredWord, setAnsweredWord] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showMistakes, setShowMistakes] = useState(false);

  const inputRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const prevWordKeyRef = useRef(null);
  const placedTilesRowRef = useRef(null);

  // Auto-scroll placed tiles row to the right when tiles are placed
  useEffect(() => {
    if (placedTilesRowRef.current) {
      placedTilesRowRef.current.scrollTo({
        left: placedTilesRowRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [placedTiles]);

  // Flatten words with multiple variants into separate sequential cards
  const processedWords = useMemo(() => {
    if (!words || !Array.isArray(words)) return [];
    const list = [];
    words.forEach((w) => {
      const variants = getWordVariants(w.word);
      if (variants.length > 1) {
        variants.forEach((v, idx) => {
          list.push({
            ...w,
            variantIndex: idx,
            totalVariants: variants.length,
            targetSpelling: v,
            originalWord: w.word,
          });
        });
      } else {
        list.push({
          ...w,
          variantIndex: 0,
          totalVariants: 1,
          targetSpelling: (w.word || '').trim(),
          originalWord: w.word,
        });
      }
    });
    return list;
  }, [words]);

  const currentWord = processedWords[currentIndex];

  // Helper to determine language for target spelling tiles
  const getTargetAnswerLang = () => {
    const targetSpelling = currentWord?.targetSpelling || currentWord?.word || '';
    if (/[\u0400-\u04FF]/.test(targetSpelling)) {
      return 'ru-RU';
    }
    return language || 'en-US';
  };

  const { language: appLanguage } = useLanguage();

  const LANG_NAMES = useMemo(() => ({
    en: {
      en: 'English', ru: 'Russian', uz: 'Uzbek', de: 'German', fr: 'French', es: 'Spanish',
      tr: 'Turkish', it: 'Italian', ko: 'Korean', ja: 'Japanese', zh: 'Chinese', ar: 'Arabic',
    },
    ru: {
      en: 'английском', ru: 'русском', uz: 'узбекском', de: 'немецком', fr: 'французском', es: 'испанском',
      tr: 'турецком', it: 'итальянском', ko: 'корейском', ja: 'японском', zh: 'китайском', ar: 'арабском',
    },
    uz: {
      en: 'inglizcha', ru: 'ruscha', uz: "o'zbekcha", de: 'nemischa', fr: 'fransuzcha', es: 'ispancha',
      tr: 'turkcha', it: 'italyancha', ko: 'koreyscha', ja: 'yaponcha', zh: 'xitoycha', ar: 'arabcha',
    },
  }), []);

  // Language Title (e.g. "Write this in Russian", "Buni ruscha yozing", "Напишите это на русском")
  const getLanguageHeaderTitle = () => {
    const targetLangCode = getTargetAnswerLang();
    const targetPrefix = (targetLangCode || 'en').toLowerCase().slice(0, 2);
    const appLang = (appLanguage || 'en').toLowerCase().slice(0, 2);
    const langObj = LANG_NAMES[appLang] || LANG_NAMES.en;
    const targetLangName = langObj[targetPrefix] || (LANG_NAMES.en[targetPrefix] || 'English');
    return t('practice.writeInTarget', { lang: targetLangName });
  };

  // Report progress
  useEffect(() => {
    if (onProgress && processedWords) {
      onProgress(currentIndex, processedWords.length);
    }
  }, [currentIndex, processedWords, onProgress]);

  // Construct Tile Bank for current word
  const currentWordKey = `${currentIndex}_${currentWord?.id}_${currentWord?.targetSpelling}`;

  useEffect(() => {
    if (!currentWord) return;

    // Prevent resetting answered state when allWords/sourceWords updates in parent
    if (prevWordKeyRef.current === currentWordKey) {
      return;
    }
    prevWordKeyRef.current = currentWordKey;

    const targetSpelling = currentWord.targetSpelling || '';
    const isMultiWord = targetSpelling.trim().includes(' ');

    let correctTokens = [];
    let distractorTokens = [];

    if (isMultiWord) {
      // Word-level tiles (only exact words of target phrase)
      correctTokens = targetSpelling.split(/\s+/).filter(Boolean);
      distractorTokens = [];
    } else {
      // Letter-level tiles (only exact letters of target word)
      correctTokens = targetSpelling.split('');
      distractorTokens = [];
    }

    // Combine & assign unique IDs
    const allTokens = [
      ...correctTokens.map((t, idx) => ({ id: `token-${idx}-${t}`, text: t, isDistractor: false })),
      ...distractorTokens.map((t, idx) => ({ id: `dis-${idx}-${t}`, text: t, isDistractor: true })),
    ];

    const shuffledBank = shuffleArray(allTokens);

    setTileBank(shuffledBank);
    setPlacedTiles([]);
    setInput('');
    setAnswered(false);
    setIsCorrect(false);
    setAnsweredWord('');
    startTimeRef.current = Date.now();
  }, [currentIndex, currentWordKey, currentWord, allWords, language]);

  // Auto-focus input when in keyboard mode or when moving to a new word card
  useEffect(() => {
    if (isKeyboardMode && !answered) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isKeyboardMode, currentIndex, answered]);

  // Handle Enter key for submit / next
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (!answered) {
          if (placedTiles.length > 0 || input.trim()) {
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
  }, [answered, input, placedTiles, currentIndex, processedWords]);

  const normalizeForComparison = (str) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .trim()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/ß/g, 'ss')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const currentAnswerString = useMemo(() => {
    if (isKeyboardMode) {
      return input;
    }
    const isMultiWord = (currentWord?.targetSpelling || '').trim().includes(' ');
    return placedTiles.map(t => t.text).join(isMultiWord ? ' ' : '');
  }, [isKeyboardMode, input, placedTiles, currentWord]);

  const submitAnswer = async () => {
    if (answered) return;
    const submittedInput = currentAnswerString;
    if (!submittedInput.trim()) return;

    const responseTime = (Date.now() - startTimeRef.current) / 1000;
    const cleanSubmitted = submittedInput.toLowerCase().trim().replace(/\s+/g, ' ');
    const normSubmitted = normalizeForComparison(cleanSubmitted);

    const cleanTarget = currentWord.targetSpelling.toLowerCase().trim().replace(/\s+/g, ' ');
    const normTarget = normalizeForComparison(cleanTarget);

    const fullTargetClean = (currentWord.originalWord || '').toLowerCase().trim().replace(/\s+/g, ' ');
    const fullTargetNorm = normalizeForComparison(fullTargetClean);

    const variants = getWordVariants(currentWord.originalWord);

    const correct =
      cleanSubmitted === cleanTarget ||
      normSubmitted === normTarget ||
      cleanSubmitted === fullTargetClean ||
      normSubmitted === fullTargetNorm ||
      variants.some(v => {
        const vClean = v.toLowerCase().trim().replace(/\s+/g, ' ');
        return cleanSubmitted === vClean || normSubmitted === normalizeForComparison(vClean);
      });

    setAnswered(true);
    setIsCorrect(correct);
    setAnsweredWord(currentWord.targetSpelling || currentWord.originalWord);

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

  const handleTileTap = (tile) => {
    if (answered) return;

    // Speak the letter/word tile in the target language!
    const targetLang = getTargetAnswerLang();
    speakWord(tile.text, targetLang);

    const isAlreadyPlaced = placedTiles.some(t => t.id === tile.id);

    if (isAlreadyPlaced) {
      // Remove from placed tiles
      setPlacedTiles(prev => prev.filter(t => t.id !== tile.id));
    } else {
      // Add to placed tiles
      setPlacedTiles(prev => [...prev, tile]);
    }
  };

  const handleInputChange = (e) => {
    if (answered) return;
    const val = e.target.value;
    setInput(val);
  };

  const detectConfusion = (typedText) => {
    if (!user || !Array.isArray(allWords)) return;

    const best = findConfusableMatch(typedText, allWords, {
      excludeId: currentWord.id,
      getField: (w) => w.word,
      threshold: CONFUSION_THRESHOLD,
    });
    if (best) {
      recordConfusionPair(user.uid, currentWord.id, best.id, {
        wordA: currentWord.originalWord,
        wordB: best.candidate.word,
        translationA: currentWord.translation,
        translationB: best.candidate.translation,
      }).catch((err) => console.warn('Failed to record confusion pair:', err));
    }
  };

  const handleSkip = async () => {
    if (answered) return;
    const responseTime = (Date.now() - startTimeRef.current) / 1000;
    setAnswered(true);
    setIsCorrect(false);
    setAnsweredWord(currentWord.targetSpelling);
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

  const isNavigatingRef = useRef(false);

  useEffect(() => {
    isNavigatingRef.current = false;
  }, [currentIndex]);

  const handleNext = () => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    if (currentIndex < processedWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      if (onComplete) {
        onComplete(
          {
            totalWords: processedWords.length,
            correctCount,
            incorrectCount,
            correctWords: correctCount,
            incorrectWords: incorrectCount,
          },
          mistakesList
        );
      } else {
        setIsFinished(true);
      }
    }
  };

  // ── Render Duolingo Style Lesson Completion Screen ──
  if (isFinished) {
    const accuracyPct = Math.round((correctCount / (correctCount + incorrectCount || 1)) * 100);

    return (
      <div className="duo-spelling-page duo-results-page">
        <div className="duo-results-body">
          {/* Celebratory Title & Subtitle */}
          <h1 className="duo-results-title">
            {t('practice.lessonComplete') || "Lesson Complete!"}
          </h1>
          <p className="duo-results-subtitle">
            {t('practice.lessonCompleteSub', { count: processedWords.length }) || `You completed ${processedWords.length} words in this lesson`}
          </p>

          {/* Duolingo 3D Stat Cards Grid */}
          <div className="duo-results-cards-row">
            {/* Card 1: TOTAL WORDS */}
            <div className="duo-stat-card card-total">
              <div className="duo-stat-badge badge-gold">
                {t('practice.totalWordsBadge') || 'TOTAL WORDS'}
              </div>
              <div className="duo-stat-content">
                <span className="duo-stat-icon">⚡</span>
                <span className="duo-stat-value">{processedWords.length}</span>
              </div>
            </div>

            {/* Card 2: ACCURACY */}
            <div className="duo-stat-card card-accuracy">
              <div className="duo-stat-badge badge-green">
                {t('practice.accuracyBadge') || 'ACCURACY'}
              </div>
              <div className="duo-stat-content">
                <span className="duo-stat-icon">🎯</span>
                <span className="duo-stat-value">{accuracyPct}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Action Bar */}
        <footer className="duo-bottom-bar duo-results-bottom-bar">
          <div className="duo-results-bottom-content">
            {/* Left: REVIEW MISTAKES (if there were mistakes) */}
            {incorrectCount > 0 ? (
              <button
                type="button"
                className="duo-btn duo-btn-review-mistakes"
                onClick={() => setShowMistakes(!showMistakes)}
              >
                {t('practice.reviewLesson')?.toUpperCase() || 'REVIEW MISTAKES'}
              </button>
            ) : <div />}

            {/* Right: PRACTICE AGAIN & CONTINUE */}
            <div className="duo-results-right-btns">
              <button
                type="button"
                className="duo-btn duo-btn-practice-again"
                onClick={() => {
                  setCurrentIndex(0);
                  setCorrectCount(0);
                  setIncorrectCount(0);
                  setIsFinished(false);
                }}
              >
                {t('practice.practiceAgain')?.toUpperCase() || 'PRACTICE AGAIN'}
              </button>

              <button
                type="button"
                className="duo-btn duo-btn-results-continue"
                onClick={() => {
                  if (onComplete) {
                    onComplete({ totalWords: processedWords.length, correctCount, incorrectCount });
                  }
                  if (onExit) {
                    onExit(true);
                  }
                }}
              >
                {t('practice.continueBtn')?.toUpperCase() || 'CONTINUE'}
              </button>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  if (!currentWord) return null;

  const isLast = currentIndex === processedWords.length - 1;
  const progressPct = ((currentIndex + 1) / processedWords.length) * 100;
  const displayPromptText = currentWord.translation || currentWord.definition || currentWord.word;

  return (
    <div className="duo-spelling-page">
      {/* ── Top Bar Header (Duolingo Style: X button + Capsule Progress Bar, NO HEARTS) ── */}
      <header className="duo-top-header">
        <button
          type="button"
          className="duo-close-btn"
          onClick={() => setShowQuitModal(true)}
          title={t('practice.closePractice') || "Close practice"}
        >
          <X size={24} strokeWidth={2.8} />
        </button>

        <div className="duo-progress-track">
          <motion.div
            className="duo-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <div className="duo-spelling-body">
        {/* Instruction Title */}
        <h2 className="duo-prompt-title">
          {getLanguageHeaderTitle()}
        </h2>

        {/* Prompt Phrase Card (Clean Card without character) */}
        <div className="duo-prompt-card">
          <button
            type="button"
            className="duo-prompt-content"
            onClick={() => speakWord(displayPromptText, 'en-US')}
            title={t('practice.clickToListen') || "Click to listen"}
          >
            <Volume2 size={20} strokeWidth={2.5} className="duo-speaker-icon" />
            <span className="duo-prompt-text">{displayPromptText}</span>
          </button>
        </div>

        {/* ── Answer Slot Underline Area ── */}
        <div
          className="duo-answer-area"
          onClick={() => isKeyboardMode && inputRef.current?.focus()}
        >
          <div className={`duo-answer-slots ${answered ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}`}>
            {isKeyboardMode ? (
              <input
                ref={inputRef}
                type="text"
                className={`duo-keyboard-input ${answered ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}`}
                value={input}
                onChange={handleInputChange}
                disabled={answered}
                placeholder={t('practice.typeWordPlaceholder') || "Type your answer..."}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
              />
            ) : (
              <div className="duo-placed-tiles-row" ref={placedTilesRowRef}>
                <AnimatePresence>
                  {placedTiles.map((tile) => {
                    const isSingleLetter = tile.text.length === 1;
                    return (
                      <motion.button
                        key={tile.id}
                        type="button"
                        className={`duo-tile ${isSingleLetter ? 'duo-tile-letter' : 'duo-tile-word'} duo-tile-placed ${
                          answered ? (isCorrect ? 'tile-correct' : 'tile-wrong') : ''
                        }`}
                        onClick={() => handleTileTap(tile)}
                        layout
                        initial={{ scale: 0.8, opacity: 0, y: 15 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: -10 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        disabled={answered}
                      >
                        {tile.text}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* ── Tile Bank ── */}
        {!isKeyboardMode && (
          <div className="duo-tile-bank">
            {tileBank.map((tile) => {
              const isUsed = placedTiles.some(t => t.id === tile.id);
              const isSingleLetter = tile.text.length === 1;

              return (
                <div
                  key={tile.id}
                  className={`duo-tile-wrapper ${isSingleLetter ? 'wrapper-letter' : 'wrapper-word'}`}
                >
                  {isUsed ? (
                    <div className={`duo-tile-slot ${isSingleLetter ? 'slot-letter' : 'slot-word'}`} />
                  ) : (
                    <motion.button
                      type="button"
                      className={`duo-tile ${isSingleLetter ? 'duo-tile-letter' : 'duo-tile-word'}`}
                      onClick={() => handleTileTap(tile)}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 2 }}
                      disabled={answered}
                    >
                      {tile.text}
                    </motion.button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Fixed Full-Width Bottom Bar & Feedback Drawer ── */}
      <footer
        className={`duo-bottom-bar ${
          answered ? (isCorrect ? 'drawer-correct' : 'drawer-wrong') : ''
        }`}
        style={keyboardInset > 0 ? { transform: `translateY(-${keyboardInset}px)` } : undefined}
      >
        <div className="duo-bottom-bar-content">
          {!answered ? (
            <>
              {/* SKIP Button */}
              <button
                type="button"
                className="duo-btn duo-btn-skip"
                onClick={handleSkip}
              >
                {t('practice.skip')?.toUpperCase() || 'SKIP'}
              </button>

              {/* Keyboard Mode Toggle */}
              <button
                type="button"
                className="duo-btn duo-btn-toggle-input"
                onClick={() => setIsKeyboardMode(!isKeyboardMode)}
                title={isKeyboardMode ? (t('practice.switchToTiles') || "Switch to tile selection") : (t('practice.switchToKeyboard') || "Switch to keyboard mode")}
              >
                {isKeyboardMode ? (
                  <>
                    <Grid size={18} strokeWidth={2.4} />
                    <span className="duo-btn-toggle-text">{t('practice.useTiles') || 'USE TILES'}</span>
                  </>
                ) : (
                  <>
                    <Keyboard size={18} strokeWidth={2.4} />
                    <span className="duo-btn-toggle-text">{t('practice.useKeyboard') || 'USE KEYBOARD'}</span>
                  </>
                )}
              </button>

              {/* CHECK Button */}
              <button
                type="button"
                className="duo-btn duo-btn-check"
                onClick={submitAnswer}
                disabled={!currentAnswerString.trim()}
              >
                {t('practice.check')?.toUpperCase() || 'CHECK'}
              </button>
            </>
          ) : (
            /* Post-Answer Feedback Bar */
            <div className="duo-feedback-container">
              <div className="duo-feedback-info">
                <div className={`duo-feedback-icon-circle ${isCorrect ? 'icon-correct' : 'icon-wrong'}`}>
                  {isCorrect ? <Check size={26} strokeWidth={3.5} /> : <X size={26} strokeWidth={3.5} />}
                </div>
                <div className="duo-feedback-text-group">
                  <h3 className={`duo-feedback-heading ${isCorrect ? 'text-correct' : 'text-wrong'}`}>
                    {isCorrect ? t('practice.nicelyDone') : t('practice.correctSolution')}
                  </h3>
                  {!isCorrect && (
                    <div className="duo-feedback-answer-line">
                      <span className="duo-correct-word">{answeredWord || currentWord.targetSpelling}</span>
                      <button
                        type="button"
                        className="duo-speak-ans-btn"
                        onClick={() => speakWord(answeredWord || currentWord.targetSpelling, getTargetAnswerLang())}
                        title={t('practice.listen') || "Listen"}
                      >
                        <Volume2 size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                className={`duo-btn duo-btn-continue ${isCorrect ? 'btn-correct' : 'btn-wrong'}`}
                onClick={handleNext}
              >
                {isLast ? (t('practice.resultsBtn')?.toUpperCase() || 'RESULTS') : (t('practice.continueBtn')?.toUpperCase() || 'CONTINUE')}
              </button>
            </div>
          )}
        </div>
      </footer>

      {/* ── Quit Confirmation Modal (Duolingo Style) ── */}
      <AnimatePresence>
        {showQuitModal && (
          <motion.div
            className="duo-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQuitModal(false)}
          >
            <motion.div
              className="duo-modal-card"
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="duo-modal-title">
                {t('practice.quitTitle') || "Wait, don't go!"}
              </h3>
              <p className="duo-modal-message">
                {t('practice.quitMessage') || "You'll lose your progress if you quit now"}
              </p>

              <div className="duo-modal-actions">
                <button
                  type="button"
                  className="duo-btn-keep-learning"
                  onClick={() => setShowQuitModal(false)}
                >
                  {t('practice.keepLearning')?.toUpperCase() || 'KEEP LEARNING'}
                </button>
                <button
                  type="button"
                  className="duo-btn-end-session"
                  onClick={() => {
                    setShowQuitModal(false);
                    if (onExit) onExit(true);
                  }}
                >
                  {t('practice.endSession')?.toUpperCase() || 'END SESSION'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
