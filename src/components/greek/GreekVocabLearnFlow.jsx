import { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { GREEK_VOCABULARY } from '../../data/greekVocabulary';
import { buildVocabPracticeRound } from '../../utils/greekVocabExercises';
import { MASTERY_CORRECT_DELTA, MASTERY_WRONG_DELTA, clampMastery } from '../../utils/greekMastery';
import GreekVocabStepTeach from './GreekVocabStepTeach';
import GreekLessonRunner from './GreekLessonRunner';
import GreekVocabExerciseChoice from './GreekVocabExerciseChoice';
import GreekVocabExerciseType from './GreekVocabExerciseType';
import GreekVocabExerciseMatch from './GreekVocabExerciseMatch';
import './GreekLearnFlow.css';

function renderVocabExercise(exercise, onAnswer) {
  if (exercise.type === 'match') return <GreekVocabExerciseMatch exercise={exercise} onAnswer={onAnswer} />;
  if (exercise.type === 'type-translit') return <GreekVocabExerciseType exercise={exercise} onAnswer={onAnswer} />;
  return <GreekVocabExerciseChoice exercise={exercise} onAnswer={onAnswer} />;
}

function vocabItemIds(exercise) {
  return exercise.type === 'match' ? exercise.words.map((w) => w.id) : [exercise.word.id];
}

// Vocabulary counterpart to GreekLearnFlow — same idea, one step lighter:
// just Show (GreekVocabStepTeach) for each brand-new word (no trace/cursive
// step, since words are only ever shown in print), then the shared
// GreekLessonRunner runs the mixed practice round.
export default function GreekVocabLearnFlow({ newWords, reviewWords, initialMastery, onExit, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const deltasRef = useRef({});

  const inPractice = stepIndex >= newWords.length;
  const roundWords = useMemo(() => [...newWords, ...reviewWords], [newWords, reviewWords]);

  const handleExerciseResult = (wordIds, isCorrect) => {
    const delta = isCorrect ? MASTERY_CORRECT_DELTA : MASTERY_WRONG_DELTA;
    wordIds.forEach((id) => {
      deltasRef.current[id] = (deltasRef.current[id] || 0) + delta;
    });
  };

  const handlePracticeComplete = () => {
    const masteryUpdates = {};
    roundWords.forEach((word) => {
      const base = initialMastery[word.id] ?? 0;
      masteryUpdates[word.id] = clampMastery(base + (deltasRef.current[word.id] || 0));
    });
    newWords.forEach((word) => {
      if (masteryUpdates[word.id] === undefined) masteryUpdates[word.id] = 0;
    });
    onComplete(masteryUpdates);
  };

  const buildExercises = useCallback((words, allWords) => buildVocabPracticeRound(words, allWords), []);

  if (inPractice) {
    return (
      <GreekLessonRunner
        items={roundWords}
        allItems={GREEK_VOCABULARY}
        buildExercises={buildExercises}
        renderExercise={renderVocabExercise}
        getItemIds={vocabItemIds}
        onExit={onExit}
        onExerciseResult={handleExerciseResult}
        onComplete={handlePracticeComplete}
      />
    );
  }

  const word = newWords[stepIndex];
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
            style={{ width: `${(stepIndex / newWords.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="greek-learn-flow-body">
        <AnimatePresence mode="wait">
          <motion.div
            key={word.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.2 }}
          >
            <GreekVocabStepTeach word={word} onNext={goNext} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
