import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { speakGreekClip } from '../../utils/greekSpeech';
import { shuffleArray as shuffle } from '../../utils/arrayShuffle';
import './GreekAlphabetQuiz.css';

// A single 4-choice "which name goes with this glyph" round, built fresh
// each time this quiz mounts — the parent remounts it (via `key`) to start
// a new attempt rather than this component resetting its own state.
export default function GreekAlphabetQuiz({ letters, onFinish }) {
  const questions = useMemo(() => {
    return shuffle(letters).map((letter) => {
      const distractors = shuffle(letters.filter((l) => l.id !== letter.id)).slice(0, 3);
      return { letter, choices: shuffle([letter, ...distractors]) };
    });
  }, [letters]);

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [locked, setLocked] = useState(false);

  const question = questions[step];
  const isLast = step === questions.length - 1;

  const handleSelect = useCallback((choiceId) => {
    if (locked) return;
    setLocked(true);
    setSelectedId(choiceId);
    const isCorrect = choiceId === question.letter.id;
    const nextScore = score + (isCorrect ? 1 : 0);
    if (isCorrect) setScore(nextScore);

    setTimeout(() => {
      if (isLast) {
        onFinish(nextScore, questions.length);
      } else {
        setStep((s) => s + 1);
        setSelectedId(null);
        setLocked(false);
      }
    }, 700);
  }, [locked, question, score, isLast, questions.length, onFinish]);

  if (!question) return null;

  return (
    <div className="greek-quiz">
      <div className="greek-quiz-progress-row">
        <div className="greek-quiz-progress-track">
          <div
            className="greek-quiz-progress-fill"
            style={{ width: `${(step / questions.length) * 100}%` }}
          />
        </div>
        <span className="greek-quiz-progress-label">{step + 1} / {questions.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="greek-quiz-question"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.22 }}
        >
          <div className="greek-quiz-prompt">Bu harf qanday nomlanadi?</div>

          <div className="greek-quiz-glyph-row">
            <span className="greek-quiz-glyph">{question.letter.upper}{question.letter.lower}</span>
            <button
              className="greek-quiz-speak-btn"
              onClick={() => speakGreekClip(question.letter.id, 'name', question.letter.nameLatin)}
              title="Eshitish"
            >
              <Volume2 size={16} strokeWidth={2.2} />
            </button>
          </div>

          <div className="greek-quiz-choices">
            {question.choices.map((choice) => {
              const isSelected = selectedId === choice.id;
              const isCorrectChoice = choice.id === question.letter.id;
              const showState = locked && (isSelected || isCorrectChoice);
              return (
                <button
                  key={choice.id}
                  className={[
                    'greek-quiz-choice',
                    showState && isCorrectChoice ? 'correct' : '',
                    showState && isSelected && !isCorrectChoice ? 'wrong' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => handleSelect(choice.id)}
                  disabled={locked}
                >
                  {choice.nameLatin}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
