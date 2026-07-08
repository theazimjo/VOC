import { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { speakWord } from '../../utils/helpers';
import { playSound, triggerVibration } from '../../utils/feedback';
import './SwipeCard.css';

const SWIPE_THRESHOLD = 90;
const VELOCITY_THRESHOLD = 250;

const POS_ABBR = {
  noun: 'n.', verb: 'v.', adjective: 'adj.', adverb: 'adv.',
  preposition: 'prep.', conjunction: 'conj.', pronoun: 'pron.',
  interjection: 'int.', phrase: 'phr.', idiom: 'idiom'
};

function TopCard({ word, onSwipe, onFlip, isFlipped }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-18, 18]);
  const greenOp = useTransform(x, [20, SWIPE_THRESHOLD], [0, 1]);
  const blueOp  = useTransform(x, [-SWIPE_THRESHOLD, -20], [1, 0]);

  const handleDragEnd = (_, info) => {
    const { x: ox } = info.offset;
    const { x: vx } = info.velocity;
    if (ox > SWIPE_THRESHOLD || vx > VELOCITY_THRESHOLD) {
      onSwipe('right', x);
    } else if (ox < -SWIPE_THRESHOLD || vx < -VELOCITY_THRESHOLD) {
      onSwipe('left', x);
    }
  };

  return (
    <motion.div
      className="sc-wrapper sc-wrapper--top"
      style={{ x, rotate, zIndex: 30 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.92, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {/* Direction overlays */}
      <motion.div className="sc-overlay sc-overlay--right" style={{ opacity: greenOp }}>
        <span className="sc-dir-badge sc-dir-badge--right">✅ Bilaman</span>
      </motion.div>
      <motion.div className="sc-overlay sc-overlay--left" style={{ opacity: blueOp }}>
        <span className="sc-dir-badge sc-dir-badge--left">❌ Bilmayman</span>
      </motion.div>

      {/* Card body with flip */}
      <div
        className={`sc-card ${isFlipped ? 'is-flipped' : ''}`}
        onClick={onFlip}
      >
        {/* Front */}
        <div className="sc-face sc-front">
          <button
            className="sc-speak-btn"
            type="button"
            onClick={e => { e.stopPropagation(); speakWord(word.word); }}
          >🔊</button>
          {word.partOfSpeech && (
            <span className="sc-pos">{POS_ABBR[word.partOfSpeech] || word.partOfSpeech}</span>
          )}
          <div className="sc-word">{word.word}</div>
          <div className="sc-flip-hint">Ag'darish uchun bosing · Space</div>
          <div className="sc-swipe-hint">
            <span>← Bilmayman</span>
            <span>Bilaman →</span>
          </div>
        </div>

        {/* Back */}
        <div className="sc-face sc-back">
          <div className="sc-translation">{word.translation}</div>
          {word.definition && <div className="sc-def">{word.definition}</div>}
          {word.example && <div className="sc-example">"{word.example}"</div>}
        </div>
      </div>
    </motion.div>
  );
}

function StackCard({ word, depth }) {
  const scale = 1 - depth * 0.05;
  const y = depth * 10;
  const opacity = 1 - depth * 0.18;

  return (
    <motion.div
      className="sc-wrapper sc-wrapper--stack"
      style={{ zIndex: 30 - depth }}
      initial={false}
      animate={{ scale, y, opacity }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
    >
      <div className="sc-card">
        <div className="sc-face sc-front sc-front--muted">
          <div className="sc-word">{word.word}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SwipeCard({ words, onComplete }) {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [known, setKnown] = useState([]);
  const [unknown, setUnknown] = useState([]);
  const [exiting, setExiting] = useState(false);

  const currentWord = words[index];
  const totalWords = words.length;
  const progress = index / totalWords;

  // Speak on new card
  useEffect(() => {
    if (currentWord) {
      const t = setTimeout(() => speakWord(currentWord.word), 350);
      return () => clearTimeout(t);
    }
  }, [index, currentWord]);

  // Keyboard shortcuts
  const handleSwipe = useCallback((dir, motionX) => {
    if (exiting || !currentWord) return;
    setExiting(true);

    // Audio and haptics feedback
    const isCorrect = dir === 'right';
    playSound(isCorrect ? 'correct' : 'wrong');
    triggerVibration(isCorrect ? 'correct' : 'wrong');

    const targetX = dir === 'right' ? 1000 : -1000;
    if (motionX) {
      motionX.set(targetX); // animate card flying off
    }

    const newKnown   = dir === 'right' ? [...known, currentWord] : known;
    const newUnknown = dir === 'left'  ? [...unknown, currentWord] : unknown;

    setTimeout(() => {
      setKnown(newKnown);
      setUnknown(newUnknown);
      setIsFlipped(false);

      const nextIdx = index + 1;
      if (nextIdx >= totalWords) {
        onComplete(newKnown, newUnknown);
      } else {
        setIndex(nextIdx);
        setExiting(false);
      }
    }, 260);
  }, [exiting, currentWord, index, totalWords, known, unknown, onComplete]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === 'Space') { e.preventDefault(); setIsFlipped(f => !f); }
      if (e.code === 'ArrowRight') handleSwipe('right', null);
      if (e.code === 'ArrowLeft')  handleSwipe('left', null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleSwipe]);

  if (!currentWord) return null;

  const stackWords = words.slice(index + 1, index + 3);

  return (
    <div className="sc-root">
      {/* Progress */}
      <div className="sc-progress-row">
        <span className="sc-progress-count">{index + 1} / {totalWords}</span>
        <div className="sc-progress-track">
          <motion.div
            className="sc-progress-fill"
            animate={{ width: `${progress * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      {/* Score badges */}
      <div className="sc-score-row">
        <span className="sc-score sc-score--blue">❌ {unknown.length}</span>
        <span className="sc-score sc-score--green">✅ {known.length}</span>
      </div>

      {/* Deck */}
      <div className="sc-deck">
        {/* Stack cards behind (rendered bottom-up so lower zIndex is below) */}
        {[...stackWords].reverse().map((w, i) => (
          <StackCard key={w.id} word={w} depth={stackWords.length - i} />
        ))}

        {/* Top card */}
        <AnimatePresence mode="wait">
          {!exiting && (
            <TopCard
              key={currentWord.id}
              word={currentWord}
              onSwipe={handleSwipe}
              onFlip={() => setIsFlipped(f => !f)}
              isFlipped={isFlipped}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Swipe buttons */}
      <div className="sc-btn-row">
        <button
          className="sc-btn sc-btn--unknown"
          onClick={() => handleSwipe('left', null)}
          type="button"
        >
          <span className="sc-btn-icon">✕</span>
          <span>Bilmayman</span>
        </button>
        <button
          className="sc-btn sc-btn--flip"
          onClick={() => setIsFlipped(f => !f)}
          type="button"
        >
          <span className="sc-btn-icon">↩</span>
          <span>Ag'dar</span>
        </button>
        <button
          className="sc-btn sc-btn--known"
          onClick={() => handleSwipe('right', null)}
          type="button"
        >
          <span className="sc-btn-icon">✓</span>
          <span>Bilaman</span>
        </button>
      </div>
    </div>
  );
}
