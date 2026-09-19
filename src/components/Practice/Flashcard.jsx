import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Volume2, X, RotateCw, Check, PenLine } from 'lucide-react';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { speakWord } from '../../utils/helpers';
import { useLanguage } from '../../contexts/LanguageContext';
import PracticeQuitModal from './PracticeQuitModal';
import './Flashcard.css';

const POS_LABELS = {
  noun:         { label: 'ot',           abbr: 'n.' },
  verb:         { label: 'feʼl',         abbr: 'v.' },
  adjective:    { label: 'sifat',        abbr: 'adj.' },
  adverb:       { label: 'ravish',       abbr: 'adv.' },
  preposition:  { label: 'predlog',      abbr: 'prep.' },
  conjunction:  { label: 'bogʼlovchi',   abbr: 'conj.' },
  pronoun:      { label: 'olmosh',       abbr: 'pron.' },
  interjection: { label: 'undov',        abbr: 'int.' },
  phrase:       { label: 'ibora',        abbr: 'phr.' },
  idiom:        { label: 'idiom',        abbr: 'idiom' },
};

// Stack slot positions (0 = top, 1-3 = behind layers)
const STACK_POS = [
  { peek: 0,  scaleX: 1,    zIndex: 10 },
  { peek: 9,  scaleX: 0.96, zIndex: 3  },
  { peek: 19, scaleX: 0.91, zIndex: 2  },
  { peek: 30, scaleX: 0.84, zIndex: 1  },
];

function PosBadge({ pos }) {
  if (!pos) return null;
  const info = POS_LABELS[pos] || { label: pos, abbr: pos };
  return <span className="fc-pos-badge" title={info.label}>{info.abbr}</span>;
}

/* ── Interactive draggable top card ── */
function TopCard({ word, isFlipped, onFlip, onJudge, language, isMonolingual, safeT }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-16, 16]);
  const knowAlpha = useTransform(x, [20, 95], [0, 1]);
  const dontAlpha = useTransform(x, [-95, -20], [1, 0]);

  const handleDragEnd = (_, info) => {
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    if (offsetX > 75 || velocityX > 300) {
      onJudge(true);
    } else if (offsetX < -75 || velocityX < -300) {
      onJudge(false);
    }
    x.set(0);
  };

  return (
    <motion.div
      className="fc-top-drag-layer"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onTap={() => {
        if (Math.abs(x.get()) < 8) {
          onFlip();
        }
      }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.99 }}
    >
      {/* Swipe Feedback Overlay Badges (Work on both Front & Back) */}
      <motion.div className="fc-drag-overlay fc-drag-know" style={{ opacity: knowAlpha }}>
        <Check size={32} strokeWidth={3.5} />
        <span>{safeT('practice.know', 'BILAMAN')}</span>
      </motion.div>
      <motion.div className="fc-drag-overlay fc-drag-dontknow" style={{ opacity: dontAlpha }}>
        <X size={32} strokeWidth={3.5} />
        <span>{safeT('practice.dontKnow', 'BILMAYMAN')}</span>
      </motion.div>

      <div className={`fc-flip-inner ${isFlipped ? 'is-flipped' : ''}`}>
        {/* Front */}
        <div className="fc-face fc-face-front">
          <button
            type="button"
            className="duo-fc-speaker-btn"
            onClick={e => { e.stopPropagation(); speakWord(word.word, language); }}
            title={safeT('practice.listen', 'Listen')}
          >
            <Volume2 size={22} />
          </button>
          <div className="fc-card-content">
            <PosBadge pos={word.partOfSpeech} />
            <h2 className="duo-fc-word" title={word.word}>{word.word}</h2>
            {word.phonetic && <span className="duo-fc-phonetic">/{word.phonetic}/</span>}
          </div>
          <div className="duo-fc-hint-row">
            <RotateCw size={14} />
            <span>{safeT('practice.tapToFlip', 'Agʻdarish uchun bosing')}</span>
          </div>
        </div>

        {/* Back */}
        <div className="fc-face fc-face-back">
          <button
            type="button"
            className="duo-fc-speaker-btn"
            onClick={e => { e.stopPropagation(); speakWord(word.word, language); }}
            title={safeT('practice.listen', 'Listen')}
          >
            <Volume2 size={22} />
          </button>
          <div className="fc-card-content">
            <PosBadge pos={word.partOfSpeech} />
            {isMonolingual
              ? <p className="duo-fc-def-large" title={word.definition || word.word}>{word.definition || word.word}</p>
              : <h2 className="duo-fc-translation" title={word.translation}>{word.translation}</h2>}
            {word.definition && !isMonolingual && <p className="duo-fc-definition" title={word.definition}>{word.definition}</p>}
            {word.example && <p className="duo-fc-example" title={word.example}>"{word.example}"</p>}
            {word.customSentence && (
              <div className="duo-fc-custom-sentence" title={word.customSentence}>
                <PenLine size={14} className="duo-fc-sentence-icon" />
                <span>{word.customSentence}</span>
              </div>
            )}
          </div>
          <div className="fc-swipe-hint">
            <span>← {safeT('practice.dontKnow', 'BILMAYMAN')}</span>
            <span>{safeT('practice.know', 'BILAMAN')} →</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Ghost card: pre-renders word so content is visible before becoming active ── */
function GhostCard({ word }) {
  return (
    <div className="fc-ghost-face">
      <div className="fc-card-content">
        <PosBadge pos={word.partOfSpeech} />
        <h2 className="duo-fc-word" title={word.word}>{word.word}</h2>
        {word.phonetic && <span className="duo-fc-phonetic">/{word.phonetic}/</span>}
      </div>
    </div>
  );
}

/* ── Main component ── */
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
  const [currentIndex, setCurrentIndex]   = useState(0);
  const [isFlipped, setIsFlipped]         = useState(false);
  // 'right' | 'left' | null — drives BOTH exit and ghost-shift animations
  const [flyOut, setFlyOut]               = useState(null);
  const [results, setResults]             = useState({ correctCount: 0, incorrectCount: 0 });
  const [showQuitModal, setShowQuitModal] = useState(false);

  const cardStartRef     = useRef(Date.now());
  const revealElapsedRef = useRef(4);
  const answeredRef      = useRef(false);
  const knownWordsRef    = useRef([]);
  const reviewWordsRef   = useRef([]);

  const currentWord       = words[currentIndex];
  const isMonolingualCard = isEnglishPack || Boolean(!currentWord?.translation && currentWord?.definition);

  const wordsKey = useMemo(() => {
    if (!words || !Array.isArray(words)) return '';
    return words.map(w => w?.id || w?.word).join('_');
  }, [words]);

  useEffect(() => {
    knownWordsRef.current  = [];
    reviewWordsRef.current = [];
    setCurrentIndex(0);
    answeredRef.current = false;
    setFlyOut(null);
  }, [wordsKey]);

  useEffect(() => {
    if (onProgress && words) onProgress(currentIndex, words.length);
  }, [currentIndex, words, onProgress]);

  useEffect(() => {
    if (currentWord) {
      const timer = setTimeout(() => speakWord(currentWord.word, language), 350);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentWord, language]);

  useEffect(() => {
    answeredRef.current      = false;
    cardStartRef.current     = Date.now();
    revealElapsedRef.current = 4;
    // isFlipped is reset synchronously in handleJudge's setTimeout
    // to avoid a flash of the flipped state on the new top card
  }, [currentIndex]);

  const safeT = (key, fallback) => {
    const res = t(key);
    if (!res || res === key || (typeof res === 'string' && res.startsWith('practice.'))) return fallback;
    return res;
  };

  const handleFlip = () => {
    if (!isFlipped) revealElapsedRef.current = (Date.now() - cardStartRef.current) / 1000;
    setIsFlipped(p => !p);
  };

  const handleJudge = useCallback((isCorrect) => {
    if (answeredRef.current || !currentWord) return;
    answeredRef.current = true;

    if (isCorrect) knownWordsRef.current.push(currentWord);
    else           reviewWordsRef.current.push(currentWord);

    if (onAnswer) onAnswer(currentWord, isCorrect);

    const confidence = inferConfidenceFromSpeed(revealElapsedRef.current, isCorrect);
    if (onUpdateWord) onUpdateWord(currentWord.id, {
      isCorrect, confidence,
      responseTime: revealElapsedRef.current,
      retrievalType: 'passive_recall',
    });

    const newCorrect   = results.correctCount   + (isCorrect ? 1 : 0);
    const newIncorrect = results.incorrectCount + (isCorrect ? 0 : 1);
    setResults({ correctCount: newCorrect, incorrectCount: newIncorrect });

    // Set flyOut direction immediately so the exit animation starts right away
    setFlyOut(isCorrect ? 'right' : 'left');

    // After animation completes: batch all three resets into ONE render
    // so the new top card never sees isFlipped=true even for one frame
    setTimeout(() => {
      setFlyOut(null);
      setIsFlipped(false);
      if (currentIndex < words.length - 1) {
        setCurrentIndex(c => c + 1);
      } else {
        onComplete?.({
          totalWords: words.length,
          correctCount: newCorrect, incorrectCount: newIncorrect,
          knownWords: knownWordsRef.current, reviewWords: reviewWordsRef.current,
        });
      }
    }, 310);
  }, [currentWord, currentIndex, words.length, results, onAnswer, onUpdateWord, onComplete]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = e => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (answeredRef.current) return;
      const { key, code } = e;
      if (code === 'Space' || key === 'Enter' || key === 'ArrowUp' || key === 'ArrowDown') {
        e.preventDefault();
        if (!isFlipped) revealElapsedRef.current = (Date.now() - cardStartRef.current) / 1000;
        setIsFlipped(p => !p);
      } else if (key === '1' || code === 'Digit1' || code === 'Numpad1') {
        e.preventDefault();
        if (!isFlipped) { revealElapsedRef.current = (Date.now() - cardStartRef.current) / 1000; setIsFlipped(true); }
        handleJudge(false);
      } else if (key === '2' || code === 'Digit2' || code === 'Numpad2') {
        e.preventDefault();
        if (!isFlipped) { revealElapsedRef.current = (Date.now() - cardStartRef.current) / 1000; setIsFlipped(true); }
        handleJudge(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isFlipped, handleJudge]);

  if (!currentWord) return null;

  const progressPct = ((currentIndex + 1) / words.length) * 100;

  // Pre-render current card + next 3 behind it (all with word content)
  const stackWords = words.slice(currentIndex, Math.min(currentIndex + 4, words.length));

  // Compute animate target for each stack slot
  const getAnimate = (slotIdx) => {
    // Top card (slotIdx=0) flying out
    if (slotIdx === 0 && flyOut) {
      return {
        x: flyOut === 'right' ? 390 : -390,
        rotate: flyOut === 'right' ? 22 : -22,
        opacity: 0,
        scale: 0.88,
      };
    }
    // During flyOut: shift ghosts one step forward
    const targetSlot = (flyOut && slotIdx > 0)
      ? STACK_POS[slotIdx - 1]
      : STACK_POS[slotIdx];

    return { y: -targetSlot.peek, scaleX: targetSlot.scaleX, opacity: 1, x: 0, rotate: 0, scale: 1 };
  };

  const getTransition = (slotIdx) => {
    if (slotIdx === 0 && flyOut) {
      return { duration: 0.26, ease: [0.55, 0, 1, 0.45] };
    }
    return { duration: 0.38, ease: [0.34, 1.56, 0.64, 1] };
  };

  return (
    <div className="duo-spelling-page duo-flashcard-page">
      {/* Header */}
      <header className="duo-top-header">
        <button type="button" className="duo-close-btn"
          onClick={() => setShowQuitModal(true)}
          title={safeT('practice.quit', 'Exit')}>
          <X size={26} strokeWidth={2.5} />
        </button>
        <div className="duo-progress-track">
          <motion.div className="duo-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </header>

      {/* Body */}
      <main className="duo-spelling-body duo-flashcard-body">
        <div className="fc-stack-scene">
          {/*
            Cards keyed by word.id/word.word (stable).
            flyOut state drives animate directly — no AnimatePresence timing issues.

            When flyOut = 'right':
              slot-0 → animates x:+390 (exit right)
              slot-1 → animates to STACK_POS[0] (word already visible, slides to top)
              slot-2 → animates to STACK_POS[1]
              slot-3 → animates to STACK_POS[2]

            After 310ms: flyOut=null, currentIndex++
              New word at slot-0 (was slot-1, already at correct position)
              New word at slot-3 enters from behind
          */}
          <AnimatePresence initial={false}>
            {stackWords.map((word, slotIdx) => {
              const slot   = STACK_POS[slotIdx];
              const deeper = STACK_POS[slotIdx + 1];
              const isTop  = slotIdx === 0;

              return (
                <motion.div
                  key={word.id || word.word}
                  className={`fc-stack-card ${isTop ? 'fc-stack-top' : 'fc-stack-ghost'}`}
                  style={{ zIndex: slot.zIndex }}
                  // Only newly-entering cards use initial (same key = no re-mount)
                  initial={{
                    y:      deeper ? -deeper.peek  : -(slot.peek + 16),
                    scaleX: deeper ? deeper.scaleX : Math.max(slot.scaleX - 0.07, 0.72),
                    opacity: 0,
                  }}
                  animate={getAnimate(slotIdx)}
                  exit={{ opacity: 0, transition: { duration: 0 } }}
                  transition={getTransition(slotIdx)}
                >
                  {isTop
                    ? <TopCard
                        word={word}
                        isFlipped={isFlipped}
                        onFlip={handleFlip}
                        onJudge={handleJudge}
                        language={language}
                        isMonolingual={isMonolingualCard}
                        safeT={safeT}
                      />
                    : <GhostCard word={word} />
                  }
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom bar */}
      <footer className="duo-bottom-bar duo-flashcard-bottom-bar">
        <div className="duo-bottom-content duo-flashcard-bottom-content">
          {!isFlipped ? (
            <button type="button" className="duo-btn duo-btn-results-continue duo-btn-flip-card"
              onClick={handleFlip}>
              <RotateCw size={18} />
              <span>{safeT('practice.flipCard', "AG'DARISH").toUpperCase()}</span>
            </button>
          ) : (
            <div className="duo-flashcard-judge-btns">
              <button type="button" className="duo-btn duo-btn-dont-know"
                onClick={() => handleJudge(false)}>
                ❌ {safeT('practice.dontKnow', 'BILMAYMAN').toUpperCase()} (1)
              </button>
              <button type="button" className="duo-btn duo-btn-know"
                onClick={() => handleJudge(true)}>
                <Check size={20} strokeWidth={3} />
                <span>{safeT('practice.know', 'BILAMAN').toUpperCase()} (2)</span>
              </button>
            </div>
          )}
        </div>
      </footer>

      <PracticeQuitModal
        isOpen={showQuitModal}
        onClose={() => setShowQuitModal(false)}
        onConfirm={() => { setShowQuitModal(false); onExit?.(true); }}
      />
    </div>
  );
}
