import { useCallback, useMemo, useReducer, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, RotateCcw, PartyPopper } from 'lucide-react';
import { LESSON_START_HEARTS, starsForMistakes } from '../../utils/greekLessonExercises';
import './GreekLessonRunner.css';

const initialRunState = { currentIndex: 0, hearts: LESSON_START_HEARTS, mistakes: 0, status: 'active' };

function runReducer(state, action) {
  switch (action.type) {
    case 'CORRECT': {
      const next = state.currentIndex + 1;
      return { ...state, currentIndex: next, status: next >= action.total ? 'completed' : state.status };
    }
    case 'WRONG': {
      const hearts = state.hearts - 1;
      if (hearts <= 0) return { ...state, hearts: 0, mistakes: state.mistakes + 1, status: 'failed' };
      return { ...state, hearts, mistakes: state.mistakes + 1, currentIndex: state.currentIndex + 1 };
    }
    case 'RESTART':
      return { ...initialRunState };
    default:
      return state;
  }
}

// Generic practice-round runner — Duolingo's core lesson loop (segmented
// progress bar, a heart pool that drains on wrong answers, pass/fail
// screens) shared by both the alphabet and vocabulary tracks. It knows
// nothing about letters or words specifically; the caller supplies:
//  - `items` / `allItems`: the round's items and the full pool (for
//    distractors) — letters for the alphabet track, words for vocabulary.
//  - `buildExercises(items, allItems)`: produces the round's exercise queue.
//  - `renderExercise(exercise, onAnswer)`: returns the JSX for one exercise.
//  - `getItemIds(exercise)`: the id(s) an exercise's answer should be
//    attributed to, for the caller's own mastery-delta bookkeeping.
//
// `onComplete(stars)` only fires on a real pass; abandoning via the X or
// failing out never reports progress. `onExerciseResult(itemIds,
// isCorrect)` fires on every answer so the caller can accumulate mastery
// deltas itself — this component has no opinion on scoring.
//
// State is a single useReducer, not several useState calls, because
// deciding "did this wrong answer just end the round" needs the
// decremented heart count available atomically in the same update.
export default function GreekLessonRunner({
  items, allItems, buildExercises, renderExercise, getItemIds,
  onExit, onComplete, onExerciseResult,
}) {
  const [attempt, setAttempt] = useState(0);
  const [state, dispatch] = useReducer(runReducer, initialRunState);

  const exercises = useMemo(
    () => buildExercises(items, allItems),
    // `attempt` isn't read inside — it's a bump-to-reshuffle trigger so
    // handleRestart gets a freshly randomized queue instead of replaying the
    // exact exercise order that just ran out of hearts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, allItems, buildExercises, attempt]
  );

  const exercise = exercises[state.currentIndex];

  const handleAnswer = useCallback((isCorrect) => {
    onExerciseResult?.(getItemIds(exercise), isCorrect);
    dispatch({ type: isCorrect ? 'CORRECT' : 'WRONG', total: exercises.length });
  }, [exercise, exercises.length, onExerciseResult, getItemIds]);

  const handleRestart = () => {
    setAttempt((a) => a + 1);
    dispatch({ type: 'RESTART' });
  };

  const handleContinue = () => {
    onComplete(starsForMistakes(state.mistakes));
  };

  return (
    <div className="greek-lesson-runner">
      <div className="greek-lesson-runner-header">
        <button className="greek-lesson-runner-exit" onClick={onExit} aria-label="Chiqish">
          <X size={20} strokeWidth={2.2} />
        </button>
        {state.status === 'active' && (
          <div className="greek-lesson-runner-progress-track">
            <div
              className="greek-lesson-runner-progress-fill"
              style={{ width: `${(state.currentIndex / exercises.length) * 100}%` }}
            />
          </div>
        )}
        {state.status === 'active' && (
          <div className="greek-lesson-runner-hearts">
            {Array.from({ length: LESSON_START_HEARTS }).map((_, i) => (
              <Heart
                key={i}
                size={18}
                strokeWidth={2}
                className={i < state.hearts ? 'heart-full' : 'heart-empty'}
                fill={i < state.hearts ? 'currentColor' : 'none'}
              />
            ))}
          </div>
        )}
      </div>

      <div className="greek-lesson-runner-body">
        <AnimatePresence mode="wait">
          {state.status === 'active' && exercise && (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2 }}
              className="greek-lesson-runner-exercise"
            >
              {renderExercise(exercise, handleAnswer)}
            </motion.div>
          )}

          {state.status === 'completed' && (
            <motion.div
              key="completed"
              className="greek-lesson-runner-result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <PartyPopper size={40} strokeWidth={1.6} className="greek-lesson-runner-result-icon success" />
              <h2>Mashq tugallandi!</h2>
              <div className="greek-lesson-runner-stars">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i} className={i < starsForMistakes(state.mistakes) ? 'star-filled' : 'star-empty'}>★</span>
                ))}
              </div>
              <p>{state.mistakes === 0 ? "Ajoyib! Birorta xato qilmadingiz." : `${state.mistakes} ta xato bilan yakunlandi.`}</p>
              <button className="greek-lesson-runner-cta" onClick={handleContinue}>Davom etish</button>
            </motion.div>
          )}

          {state.status === 'failed' && (
            <motion.div
              key="failed"
              className="greek-lesson-runner-result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart size={40} strokeWidth={1.6} className="greek-lesson-runner-result-icon fail" />
              <h2>Jonlar tugadi</h2>
              <p>Xavotir olmang, qayta urinib ko'ring!</p>
              <button className="greek-lesson-runner-cta" onClick={handleRestart}>
                <RotateCcw size={16} strokeWidth={2.2} /> Qayta boshlash
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
