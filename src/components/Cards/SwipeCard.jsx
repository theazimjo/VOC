import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { speakWord } from '../../utils/helpers';
import { playSound, triggerVibration } from '../../utils/feedback';
import { gradientForWord } from '../../utils/cardGradients';
import './SwipeCard.css';

const SWIPE_THRESHOLD = 90;
const VELOCITY_THRESHOLD = 250;

const POS_ABBR = {
  noun: 'n.', verb: 'v.', adjective: 'adj.', adverb: 'adv.',
  preposition: 'prep.', conjunction: 'conj.', pronoun: 'pron.',
  interjection: 'int.', phrase: 'phr.', idiom: 'idiom'
};

function TopCard({ word, gradient, onSwipe, onToggleReveal, isRevealed }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-14, 14]);
  const knownOp   = useTransform(x, [20, SWIPE_THRESHOLD], [0, 1]);
  const unknownOp = useTransform(x, [-SWIPE_THRESHOLD, -20], [1, 0]);

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
      <div className="sc-card" style={{ background: gradient }}>
        {/* Direction stamps (Tinder-style LIKE/NOPE) */}
        <motion.div className="sc-stamp sc-stamp--known" style={{ opacity: knownOp }}>BILAMAN</motion.div>
        <motion.div className="sc-stamp sc-stamp--unknown" style={{ opacity: unknownOp }}>BILMAYMAN</motion.div>

        <button
          className="sc-speak-btn"
          type="button"
          onClick={e => { e.stopPropagation(); speakWord(word.word); }}
        >🔊</button>

        {word.partOfSpeech && (
          <span className="sc-pos">{POS_ABBR[word.partOfSpeech] || word.partOfSpeech}</span>
        )}

        <div className="sc-word-stage" onClick={onToggleReveal}>
          <div className="sc-word">{word.word}</div>
          {!isRevealed && <div className="sc-tap-hint">Tarjimani ko'rish uchun bosing</div>}
        </div>

        {/* Reveal panel — slides up from the bottom instead of a 3D flip */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              className="sc-reveal-panel"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              onClick={onToggleReveal}
            >
              <div className="sc-reveal-handle" />
              <div className="sc-translation">{word.translation}</div>
              {word.definition && <div className="sc-def">{word.definition}</div>}
              {word.example && <div className="sc-example">"{word.example}"</div>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function StackCard({ word, gradient, depth }) {
  const scale = 1 - depth * 0.05;
  const y = depth * 10;
  const opacity = 1 - depth * 0.25;

  return (
    <motion.div
      className="sc-wrapper sc-wrapper--stack"
      style={{ zIndex: 30 - depth }}
      initial={false}
      animate={{ scale, y, opacity }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
    >
      <div className="sc-card sc-card--stack" style={{ background: gradient }}>
        <div className="sc-word-stage">
          <div className="sc-word">{word.word}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SwipeCard({ words, onComplete }) {
  const [index, setIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [known, setKnown] = useState([]);
  const [unknown, setUnknown] = useState([]);
  const [exiting, setExiting] = useState(false);

  const currentWord = words[index];
  const totalWords = words.length;
  const progress = index / totalWords;

  const gradients = useMemo(
    () => words.map((w, i) => gradientForWord(w.id, i)),
    [words]
  );

  // Speak on new card
  useEffect(() => {
    if (currentWord) {
      const t = setTimeout(() => speakWord(currentWord.word), 350);
      return () => clearTimeout(t);
    }
  }, [index, currentWord]);

  const handleSwipe = useCallback((dir, motionX) => {
    if (exiting || !currentWord) return;
    setExiting(true);

    const isCorrect = dir === 'right';
    playSound(isCorrect ? 'correct' : 'wrong');
    triggerVibration(isCorrect ? 'correct' : 'wrong');

    const targetX = dir === 'right' ? 1000 : -1000;
    if (motionX) {
      motionX.set(targetX);
    }

    const newKnown   = dir === 'right' ? [...known, currentWord] : known;
    const newUnknown = dir === 'left'  ? [...unknown, currentWord] : unknown;

    setTimeout(() => {
      setKnown(newKnown);
      setUnknown(newUnknown);
      setIsRevealed(false);

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
      if (e.code === 'Space') { e.preventDefault(); setIsRevealed(f => !f); }
      if (e.code === 'ArrowRight') handleSwipe('right', null);
      if (e.code === 'ArrowLeft')  handleSwipe('left', null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleSwipe]);

  if (!currentWord) return null;

  const stackIdxs = [index + 1, index + 2].filter(i => i < totalWords);

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
        <span className="sc-score sc-score--blue">✕ {unknown.length}</span>
        <span className="sc-score sc-score--green">✓ {known.length}</span>
      </div>

      {/* Deck */}
      <div className="sc-deck">
        {[...stackIdxs].reverse().map((i, order) => (
          <StackCard key={words[i].id} word={words[i]} gradient={gradients[i]} depth={stackIdxs.length - order} />
        ))}

        <AnimatePresence mode="wait">
          {!exiting && (
            <TopCard
              key={currentWord.id}
              word={currentWord}
              gradient={gradients[index]}
              onSwipe={handleSwipe}
              onToggleReveal={() => setIsRevealed(f => !f)}
              isRevealed={isRevealed}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons — circular, Tinder-style */}
      <div className="sc-btn-row">
        <button
          className="sc-fab sc-fab--unknown"
          onClick={() => handleSwipe('left', null)}
          type="button"
          title="Bilmayman"
        >
          ✕
        </button>
        <button
          className="sc-fab sc-fab--reveal"
          onClick={() => setIsRevealed(f => !f)}
          type="button"
          title="Tarjimani ko'rsatish"
        >
          👁
        </button>
        <button
          className="sc-fab sc-fab--known"
          onClick={() => handleSwipe('right', null)}
          type="button"
          title="Bilaman"
        >
          ✓
        </button>
      </div>
      <div className="sc-btn-labels">
        <span>Bilmayman</span>
        <span>Ko'rish</span>
        <span>Bilaman</span>
      </div>
    </div>
  );
}
