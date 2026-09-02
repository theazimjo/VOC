import { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { GREEK_ALPHABET } from '../../data/greekAlphabet';
import { buildPracticeRound } from '../../utils/greekLessonExercises';
import { MASTERY_CORRECT_DELTA, MASTERY_WRONG_DELTA, clampMastery } from '../../utils/greekMastery';
import GreekStepTeach from './GreekStepTeach';
import GreekStepTrace from './GreekStepTrace';
import GreekStepCursive from './GreekStepCursive';
import GreekLessonRunner from './GreekLessonRunner';
import GreekExerciseChoice from './GreekExerciseChoice';
import GreekExerciseType from './GreekExerciseType';
import GreekExerciseMatch from './GreekExerciseMatch';
import './GreekLearnFlow.css';

// Every exercise type GreekExerciseType renders (see its PROMPTS map) —
// anything else that isn't 'match' goes to GreekExerciseChoice instead.
const TYPE_EXERCISE_TYPES = new Set(['type-name', 'type-from-print', 'type-from-cursive']);

function renderAlphabetExercise(exercise, onAnswer) {
  if (exercise.type === 'match') return <GreekExerciseMatch exercise={exercise} onAnswer={onAnswer} />;
  if (TYPE_EXERCISE_TYPES.has(exercise.type)) return <GreekExerciseType exercise={exercise} onAnswer={onAnswer} />;
  return <GreekExerciseChoice exercise={exercise} onAnswer={onAnswer} />;
}

function alphabetItemIds(exercise) {
  return exercise.type === 'match' ? exercise.letters.map((l) => l.id) : [exercise.letter.id];
}

// Orchestrates one full "Harflarni o'rganish" session: Show -> Trace ->
// Print/cursive comparison for each brand-new letter (2 at a time from the
// caller), then a mixed practice round (run by the shared GreekLessonRunner)
// covering those plus a couple of review letters. Nothing here is a
// numbered "lesson" the learner has to think about — it's one continuous
// flow that always picks up from wherever GreekAlphabet.jsx's progress
// cursor left off.
export default function GreekLearnFlow({ newLetters, reviewLetters, initialMastery, onExit, onComplete }) {
  const introSteps = useMemo(
    () => newLetters.flatMap((letter) => ([
      { kind: 'teach', letter },
      { kind: 'trace', letter },
      { kind: 'cursive', letter },
    ])),
    [newLetters]
  );

  const [stepIndex, setStepIndex] = useState(0);
  const deltasRef = useRef({});

  const inPractice = stepIndex >= introSteps.length;
  const roundLetters = useMemo(() => [...newLetters, ...reviewLetters], [newLetters, reviewLetters]);

  const handleExerciseResult = (letterIds, isCorrect) => {
    const delta = isCorrect ? MASTERY_CORRECT_DELTA : MASTERY_WRONG_DELTA;
    letterIds.forEach((id) => {
      deltasRef.current[id] = (deltasRef.current[id] || 0) + delta;
    });
  };

  const handlePracticeComplete = () => {
    const masteryUpdates = {};
    roundLetters.forEach((letter) => {
      const base = initialMastery[letter.id] ?? 0;
      masteryUpdates[letter.id] = clampMastery(base + (deltasRef.current[letter.id] || 0));
    });
    // A brand-new letter always ends the session "introduced" even if its
    // net delta came out at 0 or negative — otherwise it would never leave
    // the "next up" slot and the flow would re-teach it forever.
    newLetters.forEach((letter) => {
      if (masteryUpdates[letter.id] === undefined) masteryUpdates[letter.id] = 0;
    });
    onComplete(masteryUpdates);
  };

  const buildExercises = useCallback((letters, allLetters) => buildPracticeRound(letters, allLetters), []);

  if (inPractice) {
    return (
      <GreekLessonRunner
        items={roundLetters}
        allItems={GREEK_ALPHABET}
        buildExercises={buildExercises}
        renderExercise={renderAlphabetExercise}
        getItemIds={alphabetItemIds}
        onExit={onExit}
        onExerciseResult={handleExerciseResult}
        onComplete={handlePracticeComplete}
      />
    );
  }

  const step = introSteps[stepIndex];
  const goNext = () => setStepIndex((i) => i + 1);

  return (
    <div className="greek-learn-flow">
      <div className="greek-learn-flow-header">
        <button className="greek-learn-flow-exit" onClick={onExit} aria-label="Chiqish">
          <X size={20} strokeWidth={2.2} />
        </button>
        <div className="greek-learn-flow-progress-track">
          <div
            className="greek-learn-flow-progress-fill"
            style={{ width: `${(stepIndex / introSteps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="greek-learn-flow-body">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${step.kind}-${step.letter.id}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.2 }}
          >
            {step.kind === 'teach' && <GreekStepTeach letter={step.letter} onNext={goNext} />}
            {step.kind === 'trace' && <GreekStepTrace letter={step.letter} onNext={goNext} />}
            {step.kind === 'cursive' && <GreekStepCursive letter={step.letter} onNext={goNext} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
