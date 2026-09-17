import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Check, X, Volume2 } from 'lucide-react';
import { shuffleArray, speakWord } from '../../utils/helpers';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { playSound, triggerVibration } from '../../utils/feedback';
import { useLanguage } from '../../contexts/LanguageContext';
import PracticeQuitModal from './PracticeQuitModal';
import './SpeedGame.css';

const ROUND_SECONDS = 60;

function recordKeyFor(sourceName) {
  return `voc-speed-record-${(sourceName || 'default').toLowerCase().replace(/\s+/g, '_')}`;
}

export function getSpeedRecord(sourceName) {
  return Number(localStorage.getItem(recordKeyFor(sourceName))) || 0;
}

function buildOptions(currentWord, words) {
  if (!currentWord) return [];
  const correctOption = (currentWord.translation || '').trim() || currentWord.word.trim();

  const validWrongTranslations = Array.from(
    new Set(
      words
        .map(w => (w?.translation || '').trim())
        .filter(t => t.length > 0 && t.toLowerCase() !== correctOption.toLowerCase())
    )
  );

  const wrongOptions = shuffleArray(validWrongTranslations).slice(0, 3);

  const fallbackDistractors = [
    "yashil o'simliklar", "asosiy manba", "hayotiy jarayon",
    "muhim vosita", "o'zaro ta'sir", "natijaviy bosqich"
  ];
  let fbIdx = 0;
  while (wrongOptions.length < 3 && fbIdx < fallbackDistractors.length) {
    const fb = fallbackDistractors[fbIdx++];
    if (
      fb.toLowerCase() !== correctOption.toLowerCase() &&
      !wrongOptions.map(o => o.toLowerCase()).includes(fb.toLowerCase())
    ) {
      wrongOptions.push(fb);
    }
  }

  return shuffleArray([correctOption, ...wrongOptions]);
}

export default function SpeedGame({
  words,
  sourceName,
  onComplete,
  onUpdateWord,
  onAnswer,
  onProgress,
  onExit,
  language = 'en-US',
}) {
  const { t } = useLanguage();
  const [pool, setPool] = useState(() => shuffleArray(words));
  const [poolIndex, setPoolIndex] = useState(0);
  const [options, setOptions] = useState(() => buildOptions(pool[0], words));
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [record, setRecord] = useState(() => getSpeedRecord(sourceName));
  const [showQuitModal, setShowQuitModal] = useState(false);

  const questionStartRef = useRef(Date.now());
  const finishedRef = useRef(false);

  const currentWord = pool.length > 0 ? pool[poolIndex % pool.length] : null;
  const correctOption = currentWord ? ((currentWord.translation || '').trim() || (currentWord.word || '').trim()) : '';

  // 60-second countdown
  useEffect(() => {
    if (finished) return;
    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, finished]);

  useEffect(() => {
    if (onProgress) onProgress(ROUND_SECONDS - timeLeft, ROUND_SECONDS);
  }, [timeLeft, onProgress]);

  useEffect(() => {
    if (!finished || finishedRef.current) return;
    finishedRef.current = true;
    if (correctCount > record) {
      localStorage.setItem(recordKeyFor(sourceName), String(correctCount));
    }
    const t = setTimeout(() => {
      onComplete({ totalWords: correctCount + incorrectCount, correctCount, incorrectCount });
    }, 700);
    return () => clearTimeout(t);
  }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps

  const advance = useCallback(() => {
    setAnswered(false);
    setSelectedOption(null);
    questionStartRef.current = Date.now();

    setPoolIndex(i => {
      const next = i + 1;
      let currentPool = pool;
      if (pool.length > 0 && next % pool.length === 0) {
        currentPool = shuffleArray(words);
        setPool(currentPool);
      }
      const nextWord = currentPool.length > 0 ? currentPool[next % currentPool.length] : null;
      if (nextWord) {
        setOptions(buildOptions(nextWord, words));
      }
      return next;
    });
  }, [pool, words]);

  const handleSelect = (option) => {
    if (answered || finished || !currentWord) return;
    setSelectedOption(option);
    setAnswered(true);

    const responseTime = (Date.now() - questionStartRef.current) / 1000;
    const isCorrect = option === correctOption || option === currentWord.translation;
    if (onAnswer) onAnswer(currentWord, isCorrect);
    onUpdateWord(currentWord.id, {
      isCorrect,
      confidence: inferConfidenceFromSpeed(responseTime, isCorrect),
      responseTime,
      retrievalType: 'passive_recall',
    });

    if (isCorrect) {
      playSound('correct');
      triggerVibration('correct');
      setCorrectCount(c => c + 1);
      setRecord(r => Math.max(r, correctCount + 1));
    } else {
      playSound('wrong');
      triggerVibration('wrong');
      setIncorrectCount(c => c + 1);
    }
    setTimeout(advance, 350);
  };

  if (!currentWord) return null;

  const progressPct = (timeLeft / ROUND_SECONDS) * 100;

  return (
    <div className="duo-spelling-page duo-speed-page">
      {/* Top Header (Duolingo Style: X button + Timer progress bar + Tally Badges) */}
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
            className={`duo-progress-fill ${timeLeft <= 10 ? 'fill-danger' : timeLeft <= 25 ? 'fill-warning' : ''}`}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.95, ease: 'linear' }}
          />
        </div>

        {/* Tally & Record Badges */}
        <div className="duo-speed-badges-row">
          <div className="duo-speed-tally tally-correct">
            <Check size={14} strokeWidth={3} />
            <span>{correctCount}</span>
          </div>
          <div className="duo-speed-tally tally-wrong">
            <X size={14} strokeWidth={3} />
            <span>{incorrectCount}</span>
          </div>
          <div className="duo-speed-record-badge" title="Personal best">
            <Trophy size={14} strokeWidth={2.5} />
            <span>{record}</span>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="duo-spelling-body duo-speed-body">
        {/* Instruction Title */}
        <h2 className="duo-prompt-title">
          {t('practice.speedTitle') || "Speed Round"}
        </h2>

        {/* Question Card */}
        <div className="duo-prompt-card duo-speed-prompt-card">
          <button
            type="button"
            className="duo-prompt-content"
            onClick={() => speakWord(currentWord.word, language)}
            title={t('practice.clickToListen') || "Click to listen"}
          >
            <Volume2 size={20} strokeWidth={2.5} className="duo-speaker-icon" />
            <span className="duo-prompt-text">{currentWord.word}</span>
          </button>

          <div className={`duo-speed-timer-badge ${timeLeft <= 10 ? 'danger' : timeLeft <= 25 ? 'warning' : ''}`}>
            ⏱ {timeLeft}s
          </div>
        </div>

        {/* Options List */}
        <div className="duo-speed-options-list">
          <AnimatePresence mode="wait">
            {options.map((opt, idx) => {
              let stateClass = '';
              if (answered) {
                if (opt === correctOption || opt === currentWord.translation) stateClass = 'is-correct';
                else if (opt === selectedOption) stateClass = 'is-wrong';
                else stateClass = 'is-dimmed';
              }

              return (
                <motion.button
                  key={`${poolIndex}-${idx}`}
                  type="button"
                  className={`duo-speed-option-card ${stateClass}`}
                  onClick={() => handleSelect(opt)}
                  disabled={answered}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  whileHover={!answered ? { y: -2 } : {}}
                  whileTap={!answered ? { y: 2 } : {}}
                >
                  <span className="duo-speed-badge">{['1', '2', '3', '4'][idx]}</span>
                  <span className="duo-speed-option-text">{opt}</span>
                  {answered && (opt === correctOption || opt === currentWord.translation) && (
                    <Check className="duo-speed-check-icon" size={20} strokeWidth={3.5} />
                  )}
                  {answered && opt === selectedOption && opt !== correctOption && opt !== currentWord.translation && (
                    <X className="duo-speed-x-icon" size={20} strokeWidth={3.5} />
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>
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
