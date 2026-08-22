import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';

// Small sequential multiple-choice quiz shared by the Grammar/Reading/
// Listening stages — pass/fail is decided by `passRatio` of the score.
export default function MiniQuiz({ questions, passRatio = 0.7, onFinish }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const question = questions[index];
  const isLast = index === questions.length - 1;

  const handleSelect = (optionIdx) => {
    if (selected !== null) return;
    setSelected(optionIdx);
    if (optionIdx === question.correct) setCorrectCount((c) => c + 1);
  };

  const handleNext = () => {
    if (isLast) {
      const finalCorrect = correctCount;
      const passed = finalCorrect / questions.length >= passRatio;
      setDone(true);
      onFinish({ correct: finalCorrect, total: questions.length, passed });
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  };

  const handleRetry = () => {
    setIndex(0);
    setSelected(null);
    setCorrectCount(0);
    setDone(false);
  };

  if (done) {
    const passed = correctCount / questions.length >= passRatio;
    return (
      <div className={`mini-quiz-result ${passed ? 'passed' : 'failed'}`}>
        <div className="mini-quiz-result-icon">{passed ? '🎉' : '🔁'}</div>
        <div className="mini-quiz-result-score">{correctCount} / {questions.length}</div>
        <div className="mini-quiz-result-msg">
          {passed ? t('course.quizPassed') : t('course.quizFailed')}
        </div>
        {!passed && (
          <button type="button" className="course-stage-primary-btn" onClick={handleRetry}>
            {t('course.tryAgain')}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mini-quiz">
      <div className="mini-quiz-progress">{index + 1} / {questions.length}</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="mini-quiz-card"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mini-quiz-question">{question.text}</div>
          <div className="mini-quiz-options">
            {question.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrectOpt = i === question.correct;
              let state = '';
              if (selected !== null) {
                if (isCorrectOpt) state = 'correct';
                else if (isSelected) state = 'wrong';
              }
              return (
                <button
                  key={i}
                  type="button"
                  className={`mini-quiz-option ${state}`}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                >
                  <span>{opt}</span>
                  {state === 'correct' && <Check size={16} strokeWidth={2.5} />}
                  {state === 'wrong' && <X size={16} strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
          {question.explanation && selected !== null && (
            <div className="mini-quiz-explanation">{question.explanation}</div>
          )}
        </motion.div>
      </AnimatePresence>

      {selected !== null && (
        <button type="button" className="course-stage-primary-btn" onClick={handleNext}>
          {isLast ? t('course.finishQuiz') : t('course.nextQuestion')}
        </button>
      )}
    </div>
  );
}
