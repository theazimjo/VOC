import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, TrendingUp, Brain } from 'lucide-react';
import { shuffleArray, speakWord } from '../../utils/helpers';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { playSound, triggerVibration } from '../../utils/feedback';
import { useLanguage } from '../../contexts/LanguageContext';
import PracticeQuitModal from './PracticeQuitModal';
import './GridMatchGame.css';

const LEVELS = [3, 6, 8];
const MAX_ROUNDS = 3;

function buildRound(words, pairCount) {
  const targetPairs = Math.min(pairCount, words.length);
  const chosen = shuffleArray(words).slice(0, targetPairs);
  const wordCards = chosen.map(w => ({ key: `w-${w.id}`, wordId: w.id, kind: 'word', text: w.word }));
  const transCards = chosen.map(w => ({ key: `t-${w.id}`, wordId: w.id, kind: 'translation', text: w.translation }));
  return shuffleArray([...wordCards, ...transCards]).map(c => ({ ...c, matched: false }));
}

export default function GridMatchGame({
  words,
  onComplete,
  onUpdateWord,
  onAnswer,
  onProgress,
  onExit,
  language = 'en-US',
}) {
  const { t } = useLanguage();
  const [levelIdx, setLevelIdx] = useState(0);
  const [round, setRound] = useState(1);
  const [cards, setCards] = useState(() => buildRound(words, LEVELS[0]));
  const [flipped, setFlipped] = useState([]);
  const [locked, setLocked] = useState(false);
  const [roundMistakes, setRoundMistakes] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalMistakes, setTotalMistakes] = useState(0);
  const [roundBanner, setRoundBanner] = useState(null);
  const [showQuitModal, setShowQuitModal] = useState(false);

  const flipStartRef = useRef(Date.now());
  const finishedRef = useRef(false);

  const totalPairsThisRound = cards.length / 2;
  const matchedPairs = cards.filter(c => c.matched).length / 2;

  useEffect(() => {
    if (onProgress) onProgress(matchedPairs, totalPairsThisRound);
  }, [matchedPairs, totalPairsThisRound, onProgress]);

  useEffect(() => {
    if (!roundBanner) return;
    const timeout = setTimeout(() => setRoundBanner(null), 2200);
    return () => clearTimeout(timeout);
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

    // Pronounce ONLY target word when flipped face up
    if (card.kind === 'word') {
      speakWord(card.text, language);
    }

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
      playSound('correct');
      triggerVibration('correct');
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
      }, 450);
    } else {
      setLocked(true);
      playSound('wrong');
      triggerVibration('wrong');
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

      let nextLevel = levelIdx;
      if (mistakeRate === 0) nextLevel = Math.min(levelIdx + 2, LEVELS.length - 1);
      else if (mistakeRate <= 1) nextLevel = Math.min(levelIdx + 1, LEVELS.length - 1);

      while (nextLevel > 0 && words.length < LEVELS[nextLevel]) nextLevel -= 1;

      if (words.length < LEVELS[nextLevel]) {
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
    }, 600);
    return () => clearTimeout(timer);
  }, [cards]);

  const cols = Math.min(4, Math.ceil(Math.sqrt(cards.length)));
  const progressPct = (matchedPairs / totalPairsThisRound) * 100;

  return (
    <div className="duo-spelling-page duo-gridmatch-page">
      {/* Top Header (Duolingo Style: X button + Progress Bar + Tally) */}
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
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        {/* Tally & Round Badge */}
        <div className="duo-gridmatch-badges-row">
          <div className="duo-speed-tally tally-correct">
            <Check size={14} strokeWidth={3} />
            <span>{totalCorrect}</span>
          </div>
          <div className="duo-speed-tally tally-wrong">
            <X size={14} strokeWidth={3} />
            <span>{totalMistakes}</span>
          </div>
          <div className="duo-gridmatch-round-badge">
            <span>R{round}/{MAX_ROUNDS}</span>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="duo-spelling-body duo-gridmatch-body">
        <h2 className="duo-prompt-title">
          {t('practice.gridmatchTitle') && !t('practice.gridmatchTitle').startsWith('practice.') ? t('practice.gridmatchTitle') : "Memory Grid"}
        </h2>

        <p className="duo-prompt-subtitle">
          {t('practice.findMatchingPairs') && !t('practice.findMatchingPairs').startsWith('practice.') ? t('practice.findMatchingPairs') : "Tap cards to find matching pairs"}
        </p>

        <AnimatePresence>
          {roundBanner && (
            <motion.div
              className="grid-match-level-banner"
              initial={{ opacity: 0, y: -8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <TrendingUp size={15} strokeWidth={2.5} />
              {roundBanner === 'grew'
                ? (t('practice.gridGrew', { pairs: totalPairsThisRound }) || `Grid grew to ${totalPairsThisRound} pairs!`)
                : (t('practice.newRound') || "New round!")}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Cards Grid */}
        <div className="grid-match-board" style={{ '--grid-cols': cols }}>
          {cards.map((card) => {
            const isFaceUp = flipped.includes(card.key) || card.matched;
            return (
              <motion.button
                key={card.key}
                type="button"
                className={`grid-match-card ${card.matched ? 'matched' : ''} ${isFaceUp ? 'is-face-up' : ''}`}
                onClick={() => handleCardClick(card)}
                disabled={locked && !isFaceUp}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={!isFaceUp ? { scale: 0.94 } : {}}
              >
                <motion.div
                  className="grid-match-card-flipper"
                  initial={false}
                  animate={{ rotateY: isFaceUp ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.15, 0.64, 1] }}
                >
                  <div className="grid-match-card-face grid-match-card-back">
                    <Brain size={22} strokeWidth={2.2} className="card-back-icon" />
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

      {/* Quit Modal */}
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

