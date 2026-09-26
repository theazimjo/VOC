import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Check, X, Keyboard } from 'lucide-react';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { speakWord, shuffleArray } from '../../utils/helpers';
import { findConfusableMatch } from '../../experiment/textSimilarity';
import { recordConfusionPair } from '../../experiment/experimentDB';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useKeyboardInset } from '../../hooks/useKeyboardInset';
import PracticeQuitModal from './PracticeQuitModal';
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
}) {
  const { user } = useAuth();
  const { t, language: appLanguage } = useLanguage();
  const keyboardInset = useKeyboardInset();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedTiles, setPlacedTiles] = useState([]); // [{ id, text, isCustom? }]
  const [tileBank, setTileBank] = useState([]); // [{ id, text, isDistractor }]
  const [typedBuffer, setTypedBuffer] = useState('');
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [speakLetters, setSpeakLetters] = useState(() => {
    try {
      const saved = localStorage.getItem('spelling_speak_letters');
      return saved !== null ? JSON.parse(saved) : true;
    } catch (err) {
      return true;
    }
  });

  const toggleSpeakLetters = () => {
    setSpeakLetters((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('spelling_speak_letters', JSON.stringify(next));
      } catch (err) {}
      return next;
    });
  };

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

    if (prevWordKeyRef.current === currentWordKey) {
      return;
    }
    prevWordKeyRef.current = currentWordKey;

    const targetSpelling = currentWord.targetSpelling || '';
    const correctTokens = targetSpelling.split('');
    const distractorTokens = [];

    const allTokens = [
      ...correctTokens.map((t, idx) => ({ id: `token-${idx}-${t}`, text: t, isDistractor: false })),
      ...distractorTokens.map((t, idx) => ({ id: `dis-${idx}-${t}`, text: t, isDistractor: true })),
    ];

    const shuffledBank = shuffleArray(allTokens);

    setTileBank(shuffledBank);
    setPlacedTiles([]);
    setTypedBuffer('');
    setAnswered(false);
    setIsCorrect(false);
    setAnsweredWord('');
    startTimeRef.current = Date.now();
  }, [currentIndex, currentWordKey, currentWord, allWords, language]);

  // Auto-focus hidden input on load or card change
  useEffect(() => {
    if (!answered) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, answered]);

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
    return placedTiles.map(t => t.text).join('');
  }, [placedTiles]);

  const handleTileTap = (tile) => {
    if (answered) return;

    if (tile.text !== ' ' && speakLetters) {
      const targetLang = getTargetAnswerLang();
      speakWord(tile.text, targetLang);
    }

    const isAlreadyPlaced = placedTiles.some(t => t.id === tile.id);

    if (isAlreadyPlaced) {
      setPlacedTiles(prev => prev.filter(t => t.id !== tile.id));
    } else {
      setPlacedTiles(prev => [...prev, tile]);
    }
  };

  const [inputValue, setInputValue] = useState('');

  const handleRemovePlacedTile = (tile) => {
    if (answered) return;
    setPlacedTiles(prev => prev.filter(t => t.id !== tile.id));
  };

  const handleBackspace = () => {
    setPlacedTiles(prev => {
      if (prev.length === 0) return prev;
      return prev.slice(0, -1);
    });
    setTypedBuffer('');
  };

  const handleCharacterInput = (char) => {
    if (answered || !char) return;

    const unplacedTiles = tileBank.filter(t => !placedTiles.some(pt => pt.id === t.id));
    const exactMatch = unplacedTiles.find(
      t => t.text.toLowerCase() === char.toLowerCase() ||
           normalizeForComparison(t.text) === normalizeForComparison(char)
    );

    if (exactMatch) {
      setPlacedTiles(prev => [...prev, exactMatch]);
      if (exactMatch.text !== ' ' && speakLetters) {
        speakWord(exactMatch.text, getTargetAnswerLang());
      }
      return;
    }

    // Custom typed character fallback (handles space or letters outside tileBank)
    setPlacedTiles(prev => [
      ...prev,
      { id: `custom-${Date.now()}-${Math.random()}`, text: char, isCustom: true },
    ]);
  };

  const handleInputChange = (e) => {
    if (answered) return;
    const val = e.target.value;
    if (!val) return;

    for (const char of val) {
      handleCharacterInput(char);
    }
    setInputValue('');
  };

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showQuitModal || isFinished) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        if (!answered) {
          if (currentAnswerString.trim()) {
            submitAnswer();
          }
        } else {
          handleNext();
        }
        return;
      }

      if (answered) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
        return;
      }

      if (e.key.length === 1) {
        if (e.key === ' ') {
          e.preventDefault();
          handleCharacterInput(' ');
          return;
        }
        // If input element is NOT focused, focus it and process character directly.
        // If input element IS focused, do nothing here because onChange will process it!
        if (document.activeElement !== inputRef.current) {
          inputRef.current?.focus();
          handleCharacterInput(e.key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answered, currentAnswerString, showQuitModal, isFinished, placedTiles, tileBank, currentWord, typedBuffer]);

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

    const noSpaceSubmitted = cleanSubmitted.replace(/\s+/g, '');
    const noSpaceTarget = cleanTarget.replace(/\s+/g, '');
    const noSpaceNormSubmitted = normSubmitted.replace(/\s+/g, '');
    const noSpaceNormTarget = normTarget.replace(/\s+/g, '');

    const correct =
      cleanSubmitted === cleanTarget ||
      normSubmitted === normTarget ||
      noSpaceSubmitted === noSpaceTarget ||
      noSpaceNormSubmitted === noSpaceNormTarget ||
      cleanSubmitted === fullTargetClean ||
      normSubmitted === fullTargetNorm ||
      variants.some(v => {
        const vClean = v.toLowerCase().trim().replace(/\s+/g, ' ');
        const vNorm = normalizeForComparison(vClean);
        const vNoSpace = vClean.replace(/\s+/g, '');
        return cleanSubmitted === vClean ||
               normSubmitted === vNorm ||
               noSpaceSubmitted === vNoSpace;
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
          []
        );
      } else {
        setIsFinished(true);
      }
    }
  };

  // Render Duolingo Style Lesson Completion Screen
  if (isFinished) {
    const accuracyPct = Math.round((correctCount / (correctCount + incorrectCount || 1)) * 100);

    return (
      <div className="duo-spelling-page duo-results-page">
        <div className="duo-results-body">
          <h1 className="duo-results-title">
            {t('practice.lessonComplete') || "Lesson Complete!"}
          </h1>
          <p className="duo-results-subtitle">
            {t('practice.lessonCompleteSub', { count: processedWords.length }) || `You completed ${processedWords.length} words in this lesson`}
          </p>

          <div className="duo-results-cards-row">
            <div className="duo-stat-card card-total">
              <div className="duo-stat-badge badge-gold">
                {t('practice.totalWordsBadge') || 'TOTAL WORDS'}
              </div>
              <div className="duo-stat-content">
                <span className="duo-stat-icon">⚡</span>
                <span className="duo-stat-value">{processedWords.length}</span>
              </div>
            </div>

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

        <footer className="duo-bottom-bar duo-results-bottom-bar">
          <div className="duo-results-bottom-content">
            {incorrectCount > 0 ? (
              <button
                type="button"
                className="duo-btn duo-btn-review-mistakes"
                onClick={() => setShowMistakes(!showMistakes)}
              >
                {t('practice.reviewLesson')?.toUpperCase() || 'REVIEW MISTAKES'}
              </button>
            ) : <div />}

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
      {/* Top Header */}
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

        <button
          type="button"
          className={`duo-audio-toggle-btn ${speakLetters ? 'is-active' : 'is-muted'}`}
          onClick={toggleSpeakLetters}
          title={speakLetters ? (t('practice.muteLetters') || "Harflarni aytishni o'chirish") : (t('practice.unmuteLetters') || "Harflarni aytishni yoqish")}
        >
          {speakLetters ? <Volume2 size={22} strokeWidth={2.4} /> : <VolumeX size={22} strokeWidth={2.4} />}
        </button>
      </header>

      {/* Main Content Area */}
      <div className="duo-spelling-body">
        <h2 className="duo-prompt-title">
          {getLanguageHeaderTitle()}
        </h2>

        {/* Prompt Card */}
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

        {/* Unified Answer Area (Placed Tiles + Hidden Soft Input) */}
        <div
          className="duo-answer-area"
          onClick={() => inputRef.current?.focus()}
        >
          <div className={`duo-answer-slots ${answered ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}`}>
            {/* Hidden Input element to maintain mobile soft keyboard & browser focus */}
            <input
              ref={inputRef}
              type="text"
              className="duo-hidden-keyboard-input"
              value={inputValue}
              onChange={handleInputChange}
              disabled={answered}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
            />

            {placedTiles.length === 0 && !answered ? (
              <div className="duo-answer-placeholder">
                <Keyboard size={18} className="duo-placeholder-icon" />
                <span>{t('practice.tapTilesOrType') || 'Tap tiles or type on keyboard...'}</span>
              </div>
            ) : (
              <div className="duo-placed-tiles-row" ref={placedTilesRowRef}>
                <AnimatePresence>
                  {placedTiles.map((tile) => {
                    const isSingleLetter = tile.text.length === 1;
                    const isSpace = tile.text === ' ';
                    return (
                      <motion.button
                        key={tile.id}
                        type="button"
                        className={`duo-tile ${isSpace ? 'duo-tile-space' : isSingleLetter ? 'duo-tile-letter' : 'duo-tile-word'} duo-tile-placed ${
                          answered ? (isCorrect ? 'tile-correct' : 'tile-wrong') : ''
                        }`}
                        onClick={() => handleRemovePlacedTile(tile)}
                        layout
                        initial={{ scale: 0.8, opacity: 0, y: 15 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: -10 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        disabled={answered}
                      >
                        {isSpace ? '␣' : tile.text}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Tile Bank (ALWAYS Visible & Interactive) */}
        <div className="duo-tile-bank">
          {tileBank.map((tile) => {
            const isUsed = placedTiles.some(t => t.id === tile.id);
            const isSingleLetter = tile.text.length === 1;
            const isSpace = tile.text === ' ';

            return (
              <div
                key={tile.id}
                className={`duo-tile-wrapper ${isSpace ? 'wrapper-space' : isSingleLetter ? 'wrapper-letter' : 'wrapper-word'}`}
              >
                {isUsed ? (
                  <div className={`duo-tile-slot ${isSpace ? 'slot-space' : isSingleLetter ? 'slot-letter' : 'slot-word'}`} />
                ) : (
                  <motion.button
                    type="button"
                    className={`duo-tile ${isSpace ? 'duo-tile-space' : isSingleLetter ? 'duo-tile-letter' : 'duo-tile-word'}`}
                    onClick={() => handleTileTap(tile)}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 2 }}
                    disabled={answered}
                  >
                    {isSpace ? '␣' : tile.text}
                  </motion.button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <footer
        className={`duo-bottom-bar ${
          answered ? (isCorrect ? 'drawer-correct' : 'drawer-wrong') : ''
        }`}
        style={keyboardInset > 0 ? { transform: `translateY(-${keyboardInset}px)` } : undefined}
      >
        <div className="duo-bottom-bar-content">
          {!answered ? (
            <>
              <button
                type="button"
                className="duo-btn duo-btn-skip"
                onClick={handleSkip}
              >
                {t('practice.skip')?.toUpperCase() || 'SKIP'}
              </button>

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
            <div className="duo-feedback-container">
              <div className="duo-feedback-info">
                <div className={`duo-feedback-icon-circle ${isCorrect ? 'icon-correct' : 'icon-wrong'}`}>
                  {isCorrect ? <Check size={26} strokeWidth={3.5} /> : <X size={26} strokeWidth={3.5} />}
                </div>
                <div className="duo-feedback-text-group">
                  <h3 className={`duo-feedback-heading ${isCorrect ? 'text-correct' : 'text-wrong'}`}>
                    {isCorrect ? t('practice.nicelyDone') : t('practice.correctSolution')}
                  </h3>
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

      {/* Quit Confirmation Modal */}
      <PracticeQuitModal
        isOpen={showQuitModal}
        onClose={() => setShowQuitModal(false)}
        onConfirm={() => {
          setShowQuitModal(false);
          if (onExit) onExit(true);
        }}
      />
    </div>
  );
}
