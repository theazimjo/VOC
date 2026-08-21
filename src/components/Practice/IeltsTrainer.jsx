import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { shuffleArray, weightedSelectWords } from '../../utils/helpers';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { useLanguage } from '../../contexts/LanguageContext';
import './IeltsTrainer.css';

const FAMILY_FIELDS = [
  { field: 'nounForm', label: 'noun' },
  { field: 'verbForm', label: 'verb' },
  { field: 'adjectiveForm', label: 'adjective' },
  { field: 'adverbForm', label: 'adverb' },
];
const ARTICLE_CHOICES = ['a', 'an', 'the', 'no article'];

function parseList(str) {
  return (str || '').split(',').map(s => s.trim()).filter(Boolean);
}

// Pads with generic filler if the pool doesn't have enough real distractors
// yet (a pack with only a couple of words filled in for a given field) -
// mirrors QuizGame.jsx's `Variant ${n}` fallback so a thin pack never
// crashes the option-building step, it just gets a weaker distractor.
function pickDistractors(candidates, correctAnswer, count) {
  const unique = [...new Set(candidates.filter(c => c && c.toLowerCase() !== correctAnswer.toLowerCase()))];
  const picked = shuffleArray(unique).slice(0, count);
  while (picked.length < count) picked.push(`Option ${picked.length + 1}`);
  return picked;
}

// Every drill type resolves to the same "prompt + 4 options, pick the
// right one" shape (mirrors QuizGame.jsx) rather than five bespoke UIs -
// simpler to build and review, and still exercises definition recall,
// synonyms, articles, word family, and collocations distinctly.
function buildQuestion(word, pool) {
  const eligible = [];
  if (word.definition) eligible.push('definition');
  if (parseList(word.synonyms).length > 0) eligible.push('synonym');
  if (word.article) eligible.push('article');
  const filledFamilyFields = FAMILY_FIELDS.filter(f => word[f.field]);
  if (filledFamilyFields.length > 0) eligible.push('wordFamily');
  if (parseList(word.collocations).length > 0) eligible.push('collocation');
  if (eligible.length === 0) return null;

  const type = eligible[Math.floor(Math.random() * eligible.length)];
  const others = pool.filter(w => w.id !== word.id);

  if (type === 'definition') {
    const correct = word.word;
    const options = shuffleArray([correct, ...pickDistractors(others.map(w => w.word), correct, 3)]);
    return { id: word.id, word, type, labelKey: 'whichWordDef', labelParams: {}, prompt: word.definition, options, correctAnswer: correct };
  }
  if (type === 'synonym') {
    const syns = parseList(word.synonyms);
    const correct = syns[Math.floor(Math.random() * syns.length)];
    const distractorPool = others.flatMap(w => parseList(w.synonyms).length ? parseList(w.synonyms) : [w.word]);
    const options = shuffleArray([correct, ...pickDistractors(distractorPool, correct, 3)]);
    return { id: word.id, word, type, labelKey: 'synonymFor', labelParams: { word: word.word }, prompt: word.word, options, correctAnswer: correct };
  }
  if (type === 'article') {
    const correct = word.article;
    return { id: word.id, word, type, labelKey: 'articleFits', labelParams: {}, prompt: word.word, options: shuffleArray(ARTICLE_CHOICES), correctAnswer: correct };
  }
  if (type === 'wordFamily') {
    const { field, label } = filledFamilyFields[Math.floor(Math.random() * filledFamilyFields.length)];
    const correct = word[field];
    const distractorPool = others.map(w => w[field]).filter(Boolean);
    const options = shuffleArray([correct, ...pickDistractors(distractorPool, correct, 3)]);
    return { id: word.id, word, type, labelKey: 'formOf', labelParams: { label, word: word.word }, prompt: word.word, options, correctAnswer: correct };
  }
  if (type === 'collocation') {
    const cols = parseList(word.collocations);
    const correct = cols[Math.floor(Math.random() * cols.length)];
    const distractorPool = others.flatMap(w => parseList(w.collocations));
    const options = shuffleArray([correct, ...pickDistractors(distractorPool, correct, 3)]);
    return { id: word.id, word, type, labelKey: 'collocationWith', labelParams: { word: word.word }, prompt: word.word, options, correctAnswer: correct };
  }
  return null;
}

// IELTS counterpart of IrregularVerbsTrainer.jsx - same props contract,
// same onUpdateWord -> saveReviewEvent -> applyReview pipeline, so mastery
// and due-date scheduling keep working through the unmodified spaced-
// repetition engine. Never auto-selected (no initialSubStep) - the user
// always picks it from PracticeHub's mode grid alongside the generic
// modes, which stay available for IELTS packs too.
export default function IeltsTrainer({ words, onComplete, onUpdateWord, onAnswer, onProgress, onExit }) {
  const { t } = useLanguage();
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
        <p>{t('practice.noIeltsQuestions')}</p>
        {onExit && <button className="btn btn-secondary" onClick={onExit}>{t('practice.backToMenu')}</button>}
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
    <div className="ielts-trainer-container">
      <div className="ielts-trainer-progress">
        <span>{currentIndex + 1} / {questions.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="ielts-trainer-question-card"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ duration: 0.3 }}
        >
          <div className="ielts-trainer-question-label">{t(`practice.${currentQuestion.labelKey}`, currentQuestion.labelParams)}</div>
          <div className="ielts-trainer-question">{currentQuestion.prompt}</div>
        </motion.div>
      </AnimatePresence>

      <div className="ielts-trainer-options">
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
              className={`ielts-trainer-option ${state}`}
              onClick={() => handleSelect(opt)}
              disabled={answered}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              whileTap={!answered ? { scale: 0.97 } : {}}
            >
              <span className="ielts-trainer-option-letter">{['A', 'B', 'C', 'D'][idx]}</span>
              <span className="ielts-trainer-option-text">{opt}</span>
              {answered && state === 'correct' && <Check className="ielts-trainer-option-icon" size={18} strokeWidth={2.5} />}
              {answered && state === 'wrong' && <X className="ielts-trainer-option-icon" size={18} strokeWidth={2.5} />}
            </motion.button>
          );
        })}
      </div>

      <div className={`ielts-trainer-bottom-bar ${answered ? (isCorrectAnswer ? 'correct' : 'wrong') : ''}`}>
        <div className="ielts-trainer-bottom-bar-inner">
          {!answered ? (
            <div className="ielts-trainer-feedback ielts-trainer-feedback-hint">{t('practice.pickBestAnswer')}</div>
          ) : (
            <>
              <div className="ielts-trainer-feedback">
                {isCorrectAnswer ? t('practice.greatSentence').split('!')[0] + '!' : t('practice.answerIs', { answer: currentQuestion.correctAnswer })}
              </div>
              <button type="button" className="ielts-trainer-next-btn" onClick={handleNext}>
                {isLast ? t('practice.resultsBtn') : t('practice.nextBtn')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
