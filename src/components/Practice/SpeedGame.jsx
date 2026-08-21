import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, Check, X } from 'lucide-react';
import { shuffleArray } from '../../utils/helpers';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import './SpeedGame.css';

const ROUND_SECONDS = 60;

// The personal-best record is kept per source (pack/book) in localStorage —
// this is a fast, disposable arcade-style score, not spaced-repetition data,
// so it doesn't need a Firebase round trip or a schema change to persist.
function recordKeyFor(sourceName) {
  return `voc-speed-record-${(sourceName || 'default').toLowerCase().replace(/\s+/g, '_')}`;
}

// Exported so PracticePage can show the record on the intro screen, before
// the game (which owns and updates this same value) has even mounted.
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

export default function SpeedGame({ words, sourceName, onComplete, onUpdateWord, onAnswer, onProgress }) {
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
  const questionStartRef = useRef(Date.now());
  const finishedRef = useRef(false);

  const currentWord = pool.length > 0 ? pool[poolIndex % pool.length] : null;
  const correctOption = currentWord ? ((currentWord.translation || '').trim() || (currentWord.word || '').trim()) : '';

  // One global countdown, independent of per-question state — the whole
  // point of "Speed" is answering as many as possible before it hits zero,
  // not a fresh 15s clock per question like the regular Quiz.
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
      setCorrectCount(c => c + 1);
      setRecord(r => Math.max(r, correctCount + 1));
    } else {
      setIncorrectCount(c => c + 1);
    }
    setTimeout(advance, 350);
  };

  if (!currentWord) return null;

  return (
    <div className="speed-container">
      <div className="speed-top-bar">
        <div className={`speed-timer ${timeLeft <= 10 ? 'danger' : ''}`}>
          <Timer size={16} strokeWidth={2.4} />
          <span>{timeLeft}s</span>
        </div>
        <div className="speed-tally">
          <span className="speed-tally-correct"><Check size={13} strokeWidth={2.8} />{correctCount}</span>
          <span className="speed-tally-wrong"><X size={13} strokeWidth={2.8} />{incorrectCount}</span>
        </div>
        <div className="speed-record" title="Your best score in this pack">
          <Trophy size={14} strokeWidth={2.3} />
          <span>{record}</span>
        </div>
      </div>

      <div className="speed-timer-track">
        <div
          className="speed-timer-fill"
          style={{
            width: `${(timeLeft / ROUND_SECONDS) * 100}%`,
            background: timeLeft <= 10 ? 'var(--error)' : timeLeft <= 25 ? 'var(--warning)' : 'var(--accent-3)',
          }}
        />
      </div>

      <div className="speed-game-body">
        <AnimatePresence mode="wait">
          <motion.div
            key={poolIndex}
            className="speed-question"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.16 }}
          >
            {currentWord.word}
          </motion.div>
        </AnimatePresence>

        <div className="speed-options">
          {options.map((opt, idx) => {
            let state = 'idle';
            if (answered) {
              if (opt === correctOption || opt === currentWord.translation) state = 'correct';
              else if (opt === selectedOption) state = 'wrong';
              else state = 'dimmed';
            }
            return (
              <button
                key={`${poolIndex}-${idx}`}
                type="button"
                className={`speed-option ${state}`}
                onClick={() => handleSelect(opt)}
                disabled={answered}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
