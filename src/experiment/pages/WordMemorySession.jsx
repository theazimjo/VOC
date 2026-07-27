/**
 * 🎯 WordMemorySession
 *
 * A single review session flow:
 *   1. Show the word (source language)
 *   2. Response timer starts automatically
 *   3. User taps "Ko'rish" → translation revealed + timer stops
 *   4. User selects Correct / Incorrect
 *   5. User rates confidence (😫 1 → 😎 5)
 *   6. Next word
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, SkipForward, RotateCcw } from 'lucide-react';

const CONFIDENCE_OPTIONS = [
  { value: 1, emoji: '😫', label: 'Juda qiyin' },
  { value: 2, emoji: '😕', label: 'Qiyin' },
  { value: 3, emoji: '😐', label: "O'rtacha" },
  { value: 4, emoji: '🙂', label: 'Oson' },
  { value: 5, emoji: '😎', label: 'Juda oson' },
];

// ─── Subcomponents ────────────────────────────────────────────────────────────

function Timer({ isRunning }) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);
  const startRef = useRef(Date.now());

  useEffect(() => {
    if (isRunning) {
      startRef.current = Date.now();
      setElapsed(0);
      intervalRef.current = setInterval(() => {
        setElapsed((Date.now() - startRef.current) / 1000);
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const color = elapsed < 2.5 ? '#34d399' : elapsed < 7 ? '#f59e0b' : '#f87171';

  return (
    <div className="mem-timer" style={{ color }}>
      {elapsed.toFixed(1)}s
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WordMemorySession({ session, onSubmit, onSkip, onEnd }) {
  const [phase, setPhase] = useState('show');   // 'show' | 'revealed' | 'rate'
  const [responseTime, setResponseTime] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const timerStart = useRef(Date.now());

  // Reset when the session word changes
  const wordIndex = session?.index ?? 0;
  useEffect(() => {
    setPhase('show');
    setResponseTime(0);
    setIsCorrect(null);
    timerStart.current = Date.now();
  }, [wordIndex]);

  const current = session?.queue?.[session.index];
  if (!current?.wordData) return null;

  const { word, translation, packName } = current.wordData;

  const handleReveal = () => {
    const elapsed = (Date.now() - timerStart.current) / 1000;
    setResponseTime(elapsed);
    setPhase('revealed');
  };

  const handleJudgement = (correct) => {
    setIsCorrect(correct);
    setPhase('rate');
  };

  const handleConfidence = async (conf) => {
    if (submitting) return;
    setSubmitting(true);
    await onSubmit(isCorrect, conf, responseTime);
    setSubmitting(false);
  };

  const progress = session ? (session.index / session.queue.length) * 100 : 0;
  const remaining = session ? session.queue.length - session.index : 0;

  return (
    <div className="mem-session">
      {/* Progress bar */}
      <div className="mem-progress-track">
        <motion.div
          className="mem-progress-fill"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Header */}
      <div className="mem-session-header">
        <span className="mem-pack-badge">{packName}</span>
        <span className="mem-count">{session.index + 1} / {session.queue.length}</span>
        <button className="mem-end-btn" onClick={onEnd} title="Sessiyani tugatish">
          ✕
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${session.index}-${phase}`}
          className="mem-card-wrapper"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
        >

          {/* PHASE: show — word visible, translation hidden */}
          {phase === 'show' && (
            <div className="mem-card">
              <div className="mem-card-label">So'zni ko'ring va eslab qolishga harakat qiling</div>
              <div className="mem-word-display">{word}</div>
              <div className="mem-translation-hidden">?</div>
              <Timer isRunning={phase === 'show'} />
              <div className="mem-card-actions">
                <button className="mem-reveal-btn" onClick={handleReveal}>
                  Tarjimasini ko'rish
                </button>
                <button className="mem-skip-btn" onClick={onSkip} title="O'tkazib yuborish">
                  <SkipForward size={16} />
                  O'tkazish
                </button>
              </div>
            </div>
          )}

          {/* PHASE: revealed — show translation + ask correct/wrong */}
          {phase === 'revealed' && (
            <div className="mem-card">
              <div className="mem-card-label">Javobingiz to'g'ri edimi?</div>
              <div className="mem-word-display">{word}</div>
              <motion.div
                className="mem-translation-reveal"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {translation}
              </motion.div>
              <div className="mem-response-time">
                ⏱ {responseTime.toFixed(1)} soniya
              </div>
              <div className="mem-judgement-btns">
                <button
                  className="mem-btn-wrong"
                  onClick={() => handleJudgement(false)}
                >
                  ✗ Bilmadim
                </button>
                <button
                  className="mem-btn-correct"
                  onClick={() => handleJudgement(true)}
                >
                  ✓ Bildim
                </button>
              </div>
            </div>
          )}

          {/* PHASE: rate — confidence self-rating */}
          {phase === 'rate' && (
            <div className="mem-card">
              <div className="mem-card-label">
                {isCorrect
                  ? '✅ To\'g\'ri! Bu so\'z qanchalik oson edi?'
                  : '❌ Xato. Bu so\'z qanchalik qiyin edi?'}
              </div>
              <div className="mem-word-display">{word}</div>
              <div className="mem-confidence-grid">
                {CONFIDENCE_OPTIONS.map(opt => (
                  <motion.button
                    key={opt.value}
                    className="mem-conf-btn"
                    onClick={() => handleConfidence(opt.value)}
                    disabled={submitting}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mem-conf-emoji">{opt.emoji}</span>
                    <span className="mem-conf-label">{opt.value}</span>
                    <span className="mem-conf-text">{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
