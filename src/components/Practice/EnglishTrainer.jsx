import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { shuffleArray, weightedSelectWords } from '../../utils/helpers';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import './EnglishTrainer.css';

function parseList(str) {
  return (str || '').split(',').map(s => s.trim()).filter(Boolean);
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Pads with generic filler if the pool doesn't have enough real distractors -
// mirrors IeltsTrainer.jsx's pickDistractors so a thin pack never crashes the
// option-building step, it just gets a weaker distractor.
function pickDistractors(candidates, correctAnswer, count) {
  const unique = [...new Set(candidates.filter(c => c && c.toLowerCase() !== correctAnswer.toLowerCase()))];
  const picked = shuffleArray(unique).slice(0, count);
  while (picked.length < count) picked.push(`Option ${picked.length + 1}`);
  return picked;
}

// Every drill type resolves to the same "prompt + 4 options, pick the right
// one" shape as IeltsTrainer.jsx, but every prompt and option here is pure
// English - never a translation - since the entire point of this pack type
// is learning a word through its English meaning and usage.
function buildQuestion(word, pool) {
  const eligible = [];
  if (word.definition) eligible.push('defToWord', 'wordToDef');
  if (parseList(word.synonyms).length > 0) eligible.push('synonym');
  const wordRegex = word.word ? new RegExp(`\\b${escapeRegExp(word.word)}\\b`, 'i') : null;
  const hasCloze = word.example && wordRegex && wordRegex.test(word.example);
  if (hasCloze) eligible.push('cloze');
  if (eligible.length === 0) return null;

  const type = eligible[Math.floor(Math.random() * eligible.length)];
  const others = pool.filter(w => w.id !== word.id);

  if (type === 'defToWord') {
    const correct = word.word;
    const options = shuffleArray([correct, ...pickDistractors(others.map(w => w.word), correct, 3)]);
    return { id: word.id, word, type, label: 'Which word matches this definition?', prompt: word.definition, options, correctAnswer: correct };
  }
  if (type === 'wordToDef') {
    const correct = word.definition;
    const distractorPool = others.map(w => w.definition).filter(Boolean);
    const options = shuffleArray([correct, ...pickDistractors(distractorPool, correct, 3)]);
    return { id: word.id, word, type, label: `What does "${word.word}" mean?`, prompt: word.word, options, correctAnswer: correct };
  }
  if (type === 'synonym') {
    const syns = parseList(word.synonyms);
    const correct = syns[Math.floor(Math.random() * syns.length)];
    const distractorPool = others.flatMap(w => parseList(w.synonyms).length ? parseList(w.synonyms) : [w.word]);
    const options = shuffleArray([correct, ...pickDistractors(distractorPool, correct, 3)]);
    return { id: word.id, word, type, label: `Choose a synonym for "${word.word}"`, prompt: word.word, options, correctAnswer: correct };
  }
  if (type === 'cloze') {
    const correct = word.word;
    const blanked = word.example.replace(wordRegex, '_____');
    const options = shuffleArray([correct, ...pickDistractors(others.map(w => w.word), correct, 3)]);
    return { id: word.id, word, type, label: 'Which word completes the sentence?', prompt: blanked, options, correctAnswer: correct };
  }
  return null;
}

// English-monolingual counterpart of IeltsTrainer.jsx - same props contract,
// same onUpdateWord -> saveReviewEvent -> applyReview pipeline, so mastery
// and due-date scheduling keep working through the unmodified spaced-
// repetition engine. Never auto-selected - the user always picks it from
// PracticeHub's mode grid.
export default function EnglishTrainer({ words, onComplete, onUpdateWord, onAnswer, onProgress, onExit }) {
  const [questions, setQuestions] = useState(null); // null = not built yet
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const questionStartRef = useRef(Date.now());

  useEffect(() => {
    const session = weightedSelectWords(words, Math.min(10, words.length));
    const built = session.map(w => buildQuestion(w, words)).filter(Boolean);
    setQuestions(built);
  }, [words]);

  const currentQuestion = questions?.[currentIndex];

  useEffect(() => {
    if (onProgress && questions) onProgress(currentIndex, questions.length);
  }, [currentIndex, questions, onProgress]);

  useEffect(() => {
    questionStartRef.current = Date.now();
  }, [currentIndex]);

  if (questions === null) return null;

  if (questions.length === 0) {
    return (
      <div className="empty-state">
        <p>No drill questions yet - add an English definition (and ideally an example sentence or synonyms) to some words first.</p>
        {onExit && <button className="btn btn-secondary" onClick={onExit}>Back</button>}
      </div>
    );
  }

  const handleSelect = (option) => {
    if (answered) return;
    setSelectedOption(option);
    setAnswered(true);

    const responseTime = (Date.now() - questionStartRef.current) / 1000;
    const isCorrect = option === currentQuestion.correctAnswer;
    if (onAnswer) onAnswer(currentQuestion.word, isCorrect);

    onUpdateWord(currentQuestion.word.id, {
      isCorrect,
      confidence: inferConfidenceFromSpeed(responseTime, isCorrect),
      responseTime,
      retrievalType: 'passive_recall',
    });

    if (isCorrect) setCorrectCount(c => c + 1);
    else setIncorrectCount(c => c + 1);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      onComplete({ totalWords: questions.length, correctCount, incorrectCount });
    }
  };

  const isCorrectAnswer = selectedOption === currentQuestion.correctAnswer;
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="english-trainer-container">
      <div className="english-trainer-progress">
        <span>{currentIndex + 1} / {questions.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="english-trainer-question-card"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ duration: 0.3 }}
        >
          <div className="english-trainer-question-label">{currentQuestion.label}</div>
          <div className="english-trainer-question">{currentQuestion.prompt}</div>
        </motion.div>
      </AnimatePresence>

      <div className="english-trainer-options">
        {currentQuestion.options.map((opt, idx) => {
          let state = 'idle';
          if (answered) {
            if (opt === currentQuestion.correctAnswer) state = 'correct';
            else if (opt === selectedOption) state = 'wrong';
            else state = 'dimmed';
          }
          return (
            <motion.button
              key={`${currentIndex}-${idx}`}
              type="button"
              className={`english-trainer-option ${state}`}
              onClick={() => handleSelect(opt)}
              disabled={answered}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              whileTap={!answered ? { scale: 0.97 } : {}}
            >
              <span className="english-trainer-option-letter">{['A', 'B', 'C', 'D'][idx]}</span>
              <span className="english-trainer-option-text">{opt}</span>
              {answered && state === 'correct' && <Check className="english-trainer-option-icon" size={18} strokeWidth={2.5} />}
              {answered && state === 'wrong' && <X className="english-trainer-option-icon" size={18} strokeWidth={2.5} />}
            </motion.button>
          );
        })}
      </div>

      <div className={`english-trainer-bottom-bar ${answered ? (isCorrectAnswer ? 'correct' : 'wrong') : ''}`}>
        <div className="english-trainer-bottom-bar-inner">
          {!answered ? (
            <div className="english-trainer-feedback english-trainer-feedback-hint">Pick the best answer</div>
          ) : (
            <>
              <div className="english-trainer-feedback">
                {isCorrectAnswer ? 'Correct!' : `Answer: ${currentQuestion.correctAnswer}`}
              </div>
              <button type="button" className="english-trainer-next-btn" onClick={handleNext}>
                {isLast ? 'Results →' : 'Next →'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
