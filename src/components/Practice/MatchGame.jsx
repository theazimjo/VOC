import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { shuffleArray, speakWord } from '../../utils/helpers';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { playSound, triggerVibration } from '../../utils/feedback';
import { useLanguage } from '../../contexts/LanguageContext';
import PracticeQuitModal from './PracticeQuitModal';
import './MatchGame.css';

export default function MatchGame({
  words,
  onComplete,
  onUpdateWord,
  onAnswer,
  onProgress,
  onExit,
  language = 'en-US',
}) {
  const { t } = useLanguage();
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [errorIds, setErrorIds] = useState([]);
  const [erroredIds, setErroredIds] = useState(() => new Set());
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [liveWords, setLiveWords] = useState(words);
  const attemptStartRef = useRef(Date.now());

  useEffect(() => {
    const playWords = words.slice(0, 8);
    setLeftItems(shuffleArray(playWords.map(w => ({ id: w.id, text: w.word, isLeft: true }))));
    setRightItems(shuffleArray(playWords.map(w => ({ id: w.id, text: w.translation, isLeft: false }))));
    setLiveWords(words);
    setMatchedIds([]);
    setErrorIds([]);
    setSelectedLeft(null);
    setSelectedRight(null);
  }, [words]);

  // Report progress
  useEffect(() => {
    if (onProgress && leftItems.length > 0) {
      onProgress(matchedIds.length, leftItems.length);
    }
  }, [matchedIds, leftItems, onProgress]);

  useEffect(() => {
    if (!selectedLeft && !selectedRight) {
      attemptStartRef.current = Date.now();
    }
  }, [selectedLeft, selectedRight]);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const responseTime = (Date.now() - attemptStartRef.current) / 1000;

      if (selectedLeft === selectedRight) {
        // Match!
        playSound('correct');
        triggerVibration('correct');
        const newMatched = [...matchedIds, selectedLeft];
        setMatchedIds(newMatched);
        setSelectedLeft(null);
        setSelectedRight(null);

        const word = liveWords.find(w => w.id === selectedLeft);
        if (word) {
          const confidence = inferConfidenceFromSpeed(responseTime, true);
          onUpdateWord(word.id, { isCorrect: true, confidence, responseTime, retrievalType: 'passive_recall' })
            .then((updated) => {
              if (updated) setLiveWords(prev => prev.map(w => (w.id === word.id ? { ...w, ...updated } : w)));
            });
          if (onAnswer) onAnswer(word, true);
        }

        if (newMatched.length === leftItems.length) {
          setTimeout(() => {
            onComplete({
              totalWords: leftItems.length,
              correctCount: leftItems.length - erroredIds.size,
              incorrectCount: erroredIds.size
            });
          }, 800);
        }
      } else {
        // Error
        playSound('wrong');
        triggerVibration('wrong');
        setErrorIds([selectedLeft, selectedRight]);
        setErroredIds(prev => new Set(prev).add(selectedLeft));
        const word = liveWords.find(w => w.id === selectedLeft);
        if (word) {
          const confidence = inferConfidenceFromSpeed(responseTime, false);
          onUpdateWord(word.id, { isCorrect: false, confidence, responseTime, retrievalType: 'passive_recall' })
            .then((updated) => {
              if (updated) setLiveWords(prev => prev.map(w => (w.id === word.id ? { ...w, ...updated } : w)));
            });
          if (onAnswer) onAnswer(word, false);
        }
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setErrorIds([]);
        }, 600);
      }
    }
  }, [selectedLeft, selectedRight]);

  const handleItemClick = (item, isLeft) => {
    if (matchedIds.includes(item.id) || errorIds.length > 0) return;

    if (isLeft) {
      speakWord(item.text, language);
    }

    if (isLeft) {
      setSelectedLeft(item.id === selectedLeft ? null : item.id);
    } else {
      setSelectedRight(item.id === selectedRight ? null : item.id);
    }
  };

  const totalPairs = leftItems.length || 1;
  const progressPct = (matchedIds.length / totalPairs) * 100;

  return (
    <div className="duo-spelling-page duo-match-page">
      {/* Top Bar Header (Duolingo Style: X button + Capsule Progress Bar) */}
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

      {/* Main Content Area */}
      <div className="duo-spelling-body duo-match-body">
        {/* Instruction Title */}
        <h2 className="duo-prompt-title duo-match-title">
          {t('practice.tapMatchingPairs') || "Tap the matching pairs"}
        </h2>

        {/* 2-Column Match Grid */}
        <div className="duo-match-grid">
          {/* Left Column (Original Words) */}
          <div className="duo-match-column">
            {leftItems.map((item, idx) => {
              const isSelected = selectedLeft === item.id;
              const isMatched = matchedIds.includes(item.id);
              const isError = errorIds[0] === item.id;

              return (
                <motion.button
                  key={`l-${item.id}`}
                  type="button"
                  className={`duo-match-card ${isSelected ? 'is-selected' : ''} ${
                    isMatched ? 'is-matched' : ''
                  } ${isError ? 'is-error' : ''}`}
                  onClick={() => handleItemClick(item, true)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  disabled={isMatched || errorIds.length > 0}
                  whileHover={!isMatched && !isSelected ? { y: -2 } : {}}
                  whileTap={!isMatched ? { y: 2 } : {}}
                >
                  <span className="duo-match-card-text">{item.text}</span>
                  {isMatched && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <Check className="duo-match-check-icon" size={20} strokeWidth={3.5} />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right Column (Translations) */}
          <div className="duo-match-column">
            {rightItems.map((item, idx) => {
              const isSelected = selectedRight === item.id;
              const isMatched = matchedIds.includes(item.id);
              const isError = errorIds[1] === item.id;

              return (
                <motion.button
                  key={`r-${item.id}`}
                  type="button"
                  className={`duo-match-card ${isSelected ? 'is-selected' : ''} ${
                    isMatched ? 'is-matched' : ''
                  } ${isError ? 'is-error' : ''}`}
                  onClick={() => handleItemClick(item, false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  disabled={isMatched || errorIds.length > 0}
                  whileHover={!isMatched && !isSelected ? { y: -2 } : {}}
                  whileTap={!isMatched ? { y: 2 } : {}}
                >
                  <span className="duo-match-card-text">{item.text}</span>
                  {isMatched && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <Check className="duo-match-check-icon" size={20} strokeWidth={3.5} />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

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
