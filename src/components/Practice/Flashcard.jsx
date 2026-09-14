import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, X, RotateCw, Check, PenLine } from 'lucide-react';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { speakWord } from '../../utils/helpers';
import { useLanguage } from '../../contexts/LanguageContext';
import PracticeQuitModal from './PracticeQuitModal';
import './Flashcard.css';

// Short Uzbek labels for each part of speech
const POS_LABELS = {
  noun:          { label: 'ot',        abbr: 'n.' },
  verb:          { label: 'feʼl',   abbr: 'v.' },
  adjective:     { label: 'sifat',     abbr: 'adj.' },
  adverb:        { label: 'ravish',    abbr: 'adv.' },
  preposition:   { label: 'predlog',  abbr: 'prep.' },
  conjunction:   { label: 'bogʼlovchi', abbr: 'conj.' },
  pronoun:       { label: 'olmosh',   abbr: 'pron.' },
  interjection:  { label: 'undov',    abbr: 'int.' },
  phrase:        { label: 'ibora',    abbr: 'phr.' },
  idiom:         { label: 'idiom',    abbr: 'idiom' },
};

function PosBadge({ pos }) {
  if (!pos) return null;
  const info = POS_LABELS[pos] || { label: pos, abbr: pos };
  return (
    <span className="fc-pos-badge" title={info.label}>
      {info.abbr}
    </span>
  );
}

export default function Flashcard({
  words,
  onComplete,
  onUpdateWord,
  onAnswer,
  onProgress,
  onExit,
  language = 'en-US',
  isEnglishPack = false,
}) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState({ correctCount: 0, incorrectCount: 0 });
  const [showQuitModal, setShowQuitModal] = useState(false);

  const cardStartRef = useRef(Date.now());
  const revealElapsedRef = useRef(4);
  const answeredRef = useRef(false);
  const currentWord = words[currentIndex];
  const isMonolingualCard = isEnglishPack || Boolean(!currentWord?.translation && currentWord?.definition);

  // Report progress
  useEffect(() => {
    if (onProgress && words) {
      onProgress(currentIndex, words.length);
    }
  }, [currentIndex, words, onProgress]);

  // Autoplay pronunciation on card switch
  useEffect(() => {
    if (currentWord) {
      const timer = setTimeout(() => speakWord(currentWord.word, language), 350);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentWord, language]);

  // Reset per-card state when the card changes
  useEffect(() => {
    setIsFlipped(false);
    setAnswered(false);
    answeredRef.current = false;
    cardStartRef.current = Date.now();
    revealElapsedRef.current = 4;
  }, [currentIndex]);

  const handleCardClick = () => {
    if (!isFlipped) revealElapsedRef.current = (Date.now() - cardStartRef.current) / 1000;
    setIsFlipped((prev) => !prev);
  };

  const knownWordsRef = useRef([]);
  const reviewWordsRef = useRef([]);

  const wordsKey = useMemo(() => {
    if (!words || !Array.isArray(words)) return '';
    return words.map((w) => w?.id || w?.word).join('_');
  }, [words]);

  // Reset per-round state ONLY when word IDs list actually changes (new session)
  useEffect(() => {
    knownWordsRef.current = [];
    reviewWordsRef.current = [];
    setCurrentIndex(0);
    answeredRef.current = false;
  }, [wordsKey]);

  const handleJudge = useCallback(
    (isCorrect) => {
      if (answeredRef.current || !currentWord) return;
      answeredRef.current = true;
      setAnswered(true);

      if (isCorrect) {
        knownWordsRef.current.push(currentWord);
      } else {
        reviewWordsRef.current.push(currentWord);
      }

      if (onAnswer) onAnswer(currentWord, isCorrect);

      const confidence = inferConfidenceFromSpeed(revealElapsedRef.current, isCorrect);
      if (onUpdateWord) {
        onUpdateWord(currentWord.id, {
          isCorrect,
          confidence,
          responseTime: revealElapsedRef.current,
          retrievalType: 'passive_recall',
        });
      }

      const newCorrect = results.correctCount + (isCorrect ? 1 : 0);
      const newIncorrect = results.incorrectCount + (isCorrect ? 0 : 1);

      setResults({
        correctCount: newCorrect,
        incorrectCount: newIncorrect,
      });

      if (currentIndex < words.length - 1) {
        setIsFlipped(false);
        setTimeout(() => setCurrentIndex((c) => c + 1), 180);
      } else {
        if (onComplete) {
          onComplete({
            totalWords: words.length,
            correctCount: newCorrect,
            incorrectCount: newIncorrect,
            knownWords: knownWordsRef.current,
            reviewWords: reviewWordsRef.current,
          });
        }
      }
    },
    [currentWord, currentIndex, words.length, results, onAnswer, onUpdateWord, onComplete]
  );

  // Keyboard navigation on PC: Space/Enter/Arrows to flip; 1 (Don't Know) & 2 (Know) to judge
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (answered) return;

      const key = e.key;
      const code = e.code;

      if (code === 'Space' || key === 'Enter' || key === 'ArrowUp' || key === 'ArrowDown') {
        e.preventDefault();
        if (!isFlipped) {
          revealElapsedRef.current = (Date.now() - cardStartRef.current) / 1000;
        }
        setIsFlipped((prev) => !prev);
      } else if (key === '1' || code === 'Digit1' || code === 'Numpad1') {
        e.preventDefault();
        if (!isFlipped) {
          revealElapsedRef.current = (Date.now() - cardStartRef.current) / 1000;
          setIsFlipped(true);
        }
        handleJudge(false);
      } else if (key === '2' || code === 'Digit2' || code === 'Numpad2') {
        e.preventDefault();
        if (!isFlipped) {
          revealElapsedRef.current = (Date.now() - cardStartRef.current) / 1000;
          setIsFlipped(true);
        }
        handleJudge(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, answered, handleJudge]);

  const safeT = (key, fallback) => {
    const res = t(key);
    if (!res || res === key || (typeof res === 'string' && res.startsWith('practice.'))) return fallback;
    return res;
  };

  if (!currentWord) return null;

  const progressPct = ((currentIndex + 1) / words.length) * 100;

  return (
    <div className="duo-spelling-page duo-flashcard-page">
      {/* Top Navigation Bar Header */}
      <header className="duo-top-header">
        <button
          type="button"
          className="duo-close-btn"
          onClick={() => setShowQuitModal(true)}
          title={safeT('practice.quit', 'Exit')}
        >
          <X size={26} strokeWidth={2.5} />
        </button>

        <div className="duo-progress-track">
          <motion.div
            className="duo-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </header>

      {/* Main Body */}
      <main className="duo-spelling-body duo-flashcard-body">
        <h1 className="duo-prompt-title">
          {isFlipped
            ? safeT('practice.chooseYourAnswer', 'Ushbu soʻzni bilasizmi?')
            : safeT('practice.tapCardToFlip', 'Kartani agʻdarish uchun bosing')}
        </h1>

        {/* 3D Flip Card Scene */}
        <div className="duo-flashcard-scene" onClick={handleCardClick}>
          <div className={`duo-flashcard-card ${isFlipped ? 'is-flipped' : ''}`}>
            {/* Front Face */}
            <div className="duo-flashcard-face duo-flashcard-front">
              <button
                type="button"
                className="duo-fc-speaker-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  speakWord(currentWord.word, language);
                }}
                title={safeT('practice.listen', 'Listen')}
              >
                <Volume2 size={24} />
              </button>

              <PosBadge pos={currentWord.partOfSpeech} />

              <h2 className="duo-fc-word">{currentWord.word}</h2>

              {currentWord.phonetic && (
                <span className="duo-fc-phonetic">/{currentWord.phonetic}/</span>
              )}

              <div className="duo-fc-hint-row">
                <RotateCw size={14} />
                <span>{safeT('practice.tapToFlip', 'Agʻdarish uchun bosing')}</span>
              </div>
            </div>

            {/* Back Face */}
            <div className="duo-flashcard-face duo-flashcard-back">
              <button
                type="button"
                className="duo-fc-speaker-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  speakWord(currentWord.word, language);
                }}
                title={safeT('practice.listen', 'Listen')}
              >
                <Volume2 size={24} />
              </button>

              <PosBadge pos={currentWord.partOfSpeech} />

              {isMonolingualCard ? (
                <p className="duo-fc-def-large">{currentWord.definition || currentWord.word}</p>
              ) : (
                <h2 className="duo-fc-translation">{currentWord.translation}</h2>
              )}

              {currentWord.definition && !isMonolingualCard && (
                <p className="duo-fc-definition">{currentWord.definition}</p>
              )}

              {currentWord.example && (
                <p className="duo-fc-example">"{currentWord.example}"</p>
              )}

              {currentWord.customSentence && (
                <div className="duo-fc-custom-sentence">
                  <PenLine size={14} className="duo-fc-sentence-icon" />
                  <span>{currentWord.customSentence}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <footer className="duo-bottom-bar duo-flashcard-bottom-bar">
        <div className="duo-bottom-content duo-flashcard-bottom-content">
          {!isFlipped ? (
            <button
              type="button"
              className="duo-btn duo-btn-results-continue duo-btn-flip-card"
              onClick={handleCardClick}
            >
              <RotateCw size={18} />
              <span>{safeT('practice.flipCard', "AG'DARISH").toUpperCase()}</span>
            </button>
          ) : (
            <div className="duo-flashcard-judge-btns">
              <button
                type="button"
                className="duo-btn duo-btn-dont-know"
                onClick={() => handleJudge(false)}
              >
                ❌ {safeT('practice.dontKnow', 'BILMAYMAN').toUpperCase()} (1)
              </button>
              <button
                type="button"
                className="duo-btn duo-btn-know"
                onClick={() => handleJudge(true)}
              >
                <Check size={20} strokeWidth={3} />
                <span>{safeT('practice.know', 'BILAMAN').toUpperCase()} (2)</span>
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
