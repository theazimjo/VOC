/**
 * 🎯 WordMemorySession
 *
 * Two review flows, chosen AUTOMATICALLY per word (see
 * memoryEngine.getRecommendedRetrievalType) so the user never has to
 * manually flip a mode switch:
 *
 *  Passive (used for never-before-seen words, and most strong words):
 *   1. Show the word (source language)
 *   2. Response timer starts automatically
 *   3. User taps "Ko'rish" → translation revealed + timer stops
 *   4. User selects Correct / Incorrect
 *   5. User rates confidence (auto-inferred from response speed)
 *   6. Next word
 *
 *  Active recall ("Yozib javob berish" — used for weak-but-seen words, plus
 *  a random sample of strong words to keep the comparison data unbiased):
 *   1. Show the word
 *   2. User TYPES the translation from memory (testing/generation effect)
 *   3. Typed answer is fuzzy-matched against the correct translation AND
 *      against every other known word — a close match to a *different*
 *      word is reported as a confusion pair (interference detection)
 *   4. User confirms/overrides Correct / Incorrect, same as passive mode
 *
 * A word that has never been reviewed before (totalReviews = 0) is always
 * passive — there is no memory trace yet to type from. The header toggle
 * lets the user override the automatic choice for the current word only
 * (disabled on first-exposure words, where forcing typing is meaningless).
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkipForward, PenLine, Eye } from 'lucide-react';
import { inferConfidenceFromSpeed, getRecommendedRetrievalType } from '../memoryEngine';
import { similarityRatio } from '../textSimilarity';

const AUTO_CORRECT_THRESHOLD = 0.82;
const CONFUSION_THRESHOLD = 0.6;

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

export default function WordMemorySession({ session, allWords, onSubmit, onSkip, onEnd, onConfusionDetected }) {
  const [phase, setPhase] = useState('show');   // 'show' | 'revealed'
  const [responseTime, setResponseTime] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [overrideType, setOverrideType] = useState(null); // null = use auto choice, else forces 'active_recall' | 'passive_recall'
  const [typedValue, setTypedValue] = useState('');
  const [typedResult, setTypedResult] = useState(null); // { answer, autoCorrect } | null

  const timerStart = useRef(Date.now());
  const current = session?.queue?.[session.index];

  // The automatic recommendation is rolled once per word (it includes a
  // random-sampling component) and must not change on every keystroke re-render.
  const wordIndex = session?.index ?? 0;
  const autoType = useMemo(() => getRecommendedRetrievalType(current || {}), [wordIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset per-word state when the session word changes
  useEffect(() => {
    setPhase('show');
    setResponseTime(0);
    setTypedValue('');
    setTypedResult(null);
    setOverrideType(null);
    timerStart.current = Date.now();
  }, [wordIndex]);

  if (!current?.wordData) return null;

  const { word, translation, packName } = current.wordData;
  const isFirstExposure = (Number(current.totalReviews) || 0) === 0;
  const effectiveType = isFirstExposure ? 'passive_recall' : (overrideType || autoType);
  const typedMode = effectiveType === 'active_recall';

  const toggleOverride = () => {
    if (isFirstExposure) return;
    setOverrideType(effectiveType === 'active_recall' ? 'passive_recall' : 'active_recall');
  };

  /** Compare the typed answer against every other known word's translation. */
  const detectConfusion = (typedText) => {
    if (!onConfusionDetected || !Array.isArray(allWords) || !typedText.trim()) return;

    let best = null;
    for (const w of allWords) {
      if (!w || w.id === current.wordId || !w.translation) continue;
      const ratio = similarityRatio(typedText, w.translation);
      if (ratio >= CONFUSION_THRESHOLD && (!best || ratio > best.ratio)) {
        best = { ratio, id: w.id, word: w.word, translation: w.translation };
      }
    }
    if (best) {
      onConfusionDetected(current.wordId, best.id, {
        wordA: word,
        wordB: best.word,
        translationA: translation,
        translationB: best.translation,
      });
    }
  };

  const handleReveal = () => {
    const elapsed = (Date.now() - timerStart.current) / 1000;
    setResponseTime(elapsed);
    setPhase('revealed');
  };

  const handleTypedSubmit = () => {
    if (!typedValue.trim()) return;
    const elapsed = (Date.now() - timerStart.current) / 1000;
    setResponseTime(elapsed);

    const ratio = similarityRatio(typedValue, translation);
    const autoCorrect = ratio >= AUTO_CORRECT_THRESHOLD;
    setTypedResult({ answer: typedValue.trim(), autoCorrect });

    if (!autoCorrect) detectConfusion(typedValue);

    setPhase('revealed');
  };

  const handleJudgement = async (correct) => {
    if (submitting) return;
    setSubmitting(true);
    const conf = inferConfidenceFromSpeed(responseTime, correct);
    await onSubmit(correct, conf, responseTime, effectiveType);
    setSubmitting(false);
  };

  const progress = session ? (session.index / session.queue.length) * 100 : 0;

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
        <button
          className="mem-mode-toggle"
          onClick={toggleOverride}
          disabled={phase !== 'show' || isFirstExposure}
          title={
            isFirstExposure
              ? "Bu so'z birinchi marta ko'rilyapti — hali yozib test qilib bo'lmaydi"
              : (typedMode ? "Ko'rib javob berish rejimiga o'tish" : "Yozib javob berish rejimiga o'tish (chuqurroq eslab qolish uchun)")
          }
        >
          {typedMode ? <PenLine size={13} /> : <Eye size={13} />}
          {typedMode ? 'Yozib' : "Ko'rib"}
        </button>
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
              <div className="mem-card-label">
                {typedMode ? "Tarjimasini xotiradan yozing" : "So'zni ko'ring va eslab qolishga harakat qiling"}
              </div>
              <div className="mem-word-display">{word}</div>
              {!typedMode && <div className="mem-translation-hidden">?</div>}
              <Timer isRunning={phase === 'show'} />

              {typedMode ? (
                <div className="mem-card-actions">
                  <input
                    className="mem-typed-input"
                    type="text"
                    autoFocus
                    value={typedValue}
                    placeholder="Tarjimasini shu yerga yozing..."
                    onChange={e => setTypedValue(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleTypedSubmit(); }}
                  />
                  <button className="mem-reveal-btn" onClick={handleTypedSubmit} disabled={!typedValue.trim()}>
                    Tekshirish
                  </button>
                  <button className="mem-skip-btn" onClick={onSkip} title="O'tkazib yuborish">
                    <SkipForward size={16} />
                    O'tkazish
                  </button>
                </div>
              ) : (
                <div className="mem-card-actions">
                  <button className="mem-reveal-btn" onClick={handleReveal}>
                    Tarjimasini ko'rish
                  </button>
                  <button className="mem-skip-btn" onClick={onSkip} title="O'tkazib yuborish">
                    <SkipForward size={16} />
                    O'tkazish
                  </button>
                </div>
              )}
            </div>
          )}

          {/* PHASE: revealed — show translation + 1-Click judgement */}
          {phase === 'revealed' && (
            <div className="mem-card">
              <div className="mem-card-label">Javobingiz to'g'ri edimi?</div>
              <div className="mem-word-display">{word}</div>

              {typedResult && (
                <div className={`mem-typed-answer ${typedResult.autoCorrect ? 'correct' : 'wrong'}`}>
                  Sizning javobingiz: <strong>{typedResult.answer}</strong>
                </div>
              )}

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
                  disabled={submitting}
                  onClick={() => handleJudgement(false)}
                >
                  ✗ Bilmadim
                </button>
                <button
                  className="mem-btn-correct"
                  disabled={submitting}
                  onClick={() => handleJudgement(true)}
                >
                  ✓ Bildim
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
