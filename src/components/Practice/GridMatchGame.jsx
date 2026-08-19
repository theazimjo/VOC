import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, TrendingUp, Sparkles } from 'lucide-react';
import { shuffleArray } from '../../utils/helpers';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import './GridMatchGame.css';

// Pairs per round, in increasing order. How well the player just did decides
// how far up this list the *next* round jumps: a near-perfect round skips
// ahead two levels ("6 cards" -> a big "4x4" grid straight away), a decent
// round moves up one, and a rough one repeats the same size.
const LEVELS = [3, 6, 8];
const MAX_ROUNDS = 3;

function buildRound(words, pairCount) {
  const targetPairs = Math.min(pairCount, words.length);
  const chosen = shuffleArray(words).slice(0, targetPairs);
  const wordCards = chosen.map(w => ({ key: `w-${w.id}`, wordId: w.id, kind: 'word', text: w.word }));
  const transCards = chosen.map(w => ({ key: `t-${w.id}`, wordId: w.id, kind: 'translation', text: w.translation }));
  return shuffleArray([...wordCards, ...transCards]).map(c => ({ ...c, matched: false }));
}

export default function GridMatchGame({ words, onComplete, onUpdateWord, onAnswer, onProgress }) {
  const [levelIdx, setLevelIdx] = useState(0);
  const [round, setRound] = useState(1);
  const [cards, setCards] = useState(() => buildRound(words, LEVELS[0]));
  const [flipped, setFlipped] = useState([]); // up to 2 card keys, face-up mid-check
  const [locked, setLocked] = useState(false);
  const [roundMistakes, setRoundMistakes] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalMistakes, setTotalMistakes] = useState(0);
  const [roundBanner, setRoundBanner] = useState(null); // 'grew' | 'new' | null
  const flipStartRef = useRef(Date.now());
  const finishedRef = useRef(false);

  const totalPairsThisRound = cards.length / 2;

  useEffect(() => {
    if (onProgress) onProgress(totalCorrect, totalCorrect + (cards.length - cards.filter(c => c.matched).length) / 2);
  }, [totalCorrect, cards, onProgress]);

  // Banner is shown briefly at the start of round 2+, then cleared once the
  // player makes their first move of the round.
  useEffect(() => {
    if (!roundBanner) return;
    const t = setTimeout(() => setRoundBanner(null), 2200);
    return () => clearTimeout(t);
  }, [roundBanner]);

  const startRound = (nextLevelIdx) => {
    setRoundBanner(nextLevelIdx > levelIdx ? 'grew' : 'new');
    setLevelIdx(nextLevelIdx);
    setRoundMistakes(0);
    setFlipped([]);
    setCards(buildRound(words, LEVELS[nextLevelIdx]));
  };

  const handleCardClick = (card) => {
    if (locked || card.matched || flipped.includes(card.key)) return;

    if (flipped.length === 0) {
      setFlipped([card.key]);
      flipStartRef.current = Date.now();
      return;
    }

    const firstKey = flipped[0];
    const firstCard = cards.find(c => c.key === firstKey);
    setFlipped([firstKey, card.key]);

    const isMatch = firstCard.wordId === card.wordId && firstCard.kind !== card.kind;
    const responseTime = (Date.now() - flipStartRef.current) / 1000;
    const wordObj = words.find(w => w.id === firstCard.wordId);

    if (isMatch) {
      setLocked(true);
      if (onAnswer && wordObj) onAnswer(wordObj, true);
      if (wordObj) {
        onUpdateWord(wordObj.id, {
          isCorrect: true,
          confidence: inferConfidenceFromSpeed(responseTime, true),
          responseTime,
          retrievalType: 'passive_recall',
        });
      }
      setTimeout(() => {
        setCards(prev => prev.map(c => (c.wordId === card.wordId ? { ...c, matched: true } : c)));
        setFlipped([]);
        setLocked(false);
        setTotalCorrect(c => c + 1);
      }, 500);
    } else {
      setLocked(true);
      setRoundMistakes(m => m + 1);
      setTotalMistakes(m => m + 1);
      if (onAnswer && wordObj) onAnswer(wordObj, false);
      if (wordObj) {
        onUpdateWord(wordObj.id, {
          isCorrect: false,
          confidence: inferConfidenceFromSpeed(responseTime, false),
          responseTime,
          retrievalType: 'passive_recall',
        });
      }
      setTimeout(() => {
        setFlipped([]);
        setLocked(false);
      }, 850);
    }
  };

  // A round ends the moment every card on the board is matched. How well it
  // went (mistakes per pair) decides how big the next one is - this is the
  // "grows the grid based on how well you remember" behavior.
  useEffect(() => {
    if (cards.length === 0 || finishedRef.current) return;
    if (!cards.every(c => c.matched)) return;

    const mistakeRate = roundMistakes / (cards.length / 2);
    const timer = setTimeout(() => {
      if (round >= MAX_ROUNDS) {
        finishedRef.current = true;
        onComplete({
          totalWords: totalCorrect + totalMistakes,
          correctCount: totalCorrect,
          incorrectCount: totalMistakes,
        });
        return;
      }

      // A blind flip-and-remember game naturally produces mismatches even
      // when played well - on a 6-card board, 1-2 wrong guesses before
      // you've seen every card once is normal, not "struggling". The old
      // <=0.2 / <=0.6 thresholds effectively required a near-perfect round
      // just to hold steady, so most players got stuck at 6 cards forever.
      let nextLevel = levelIdx;
      if (mistakeRate === 0) nextLevel = Math.min(levelIdx + 2, LEVELS.length - 1);       // flawless round: reward with a big jump
      else if (mistakeRate <= 1) nextLevel = Math.min(levelIdx + 1, LEVELS.length - 1);    // at most ~1 mistake per pair: still moves up
      // else: a genuinely rough round - repeat the same grid size

      // A reward jump can land on a level this pack doesn't have enough
      // distinct words for - step back down to the biggest level it CAN
      // support instead of ending the whole session over an ambitious jump.
      while (nextLevel > 0 && words.length < LEVELS[nextLevel]) nextLevel -= 1;

      if (words.length < LEVELS[nextLevel]) {
        // Doesn't even fit the smallest level - shouldn't happen given this
        // mode's minimum word count gate, but end gracefully rather than
        // building a round that can't be filled.
        finishedRef.current = true;
        onComplete({
          totalWords: totalCorrect + totalMistakes,
          correctCount: totalCorrect,
          incorrectCount: totalMistakes,
        });
        return;
      }

      setRound(r => r + 1);
      startRound(nextLevel);
    }, 700);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  const cols = Math.min(4, Math.ceil(Math.sqrt(cards.length)));

  return (
    <div className="grid-match-container">
      <div className="grid-match-top-bar">
        <div className="grid-match-round">
          Round {round} <span className="grid-match-round-size">· {totalPairsThisRound} pairs</span>
        </div>
        <div className="grid-match-tally">
          <span className="grid-match-tally-correct"><Check size={13} strokeWidth={2.8} />{totalCorrect}</span>
          <span className="grid-match-tally-wrong"><X size={13} strokeWidth={2.8} />{totalMistakes}</span>
        </div>
      </div>

      <AnimatePresence>
        {roundBanner && (
          <motion.div
            className="grid-match-level-banner"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <TrendingUp size={14} strokeWidth={2.4} />
            {roundBanner === 'grew' ? `Grid grew to ${totalPairsThisRound} pairs - keep it up!` : 'New round'}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="grid-match-board"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {cards.map((card) => {
          const isFaceUp = flipped.includes(card.key) || card.matched;
          return (
            <motion.button
              key={card.key}
              type="button"
              className={['grid-match-card', card.matched ? 'matched' : ''].join(' ')}
              onClick={() => handleCardClick(card)}
              disabled={locked && !isFaceUp}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={!isFaceUp ? { scale: 0.95 } : {}}
            >
              <motion.div
                className="grid-match-card-flipper"
                initial={false}
                animate={{ rotateY: isFaceUp ? 180 : 0 }}
                transition={{ duration: 0.45, ease: [0.34, 1.15, 0.64, 1] }}
              >
                <div className="grid-match-card-face grid-match-card-back">
                  <Sparkles size={18} strokeWidth={2} />
                </div>
                <div className="grid-match-card-face grid-match-card-front">
                  <span className="grid-match-card-inner">{card.text}</span>
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
