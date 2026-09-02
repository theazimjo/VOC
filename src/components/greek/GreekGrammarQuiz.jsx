import { useMemo, useState } from 'react';
import { X, Volume2 } from 'lucide-react';
import { getQuestionsForExercise } from '../../utils/grammarHelpers';
import { extractGreekSpeakable } from '../../utils/greekGrammarSpeakable';
import { GREEK_GRAMMAR_AUDIO_MAP } from '../../data/greekGrammarAudioMap';
import { speakGreekGrammarClip } from '../../utils/greekSpeech';
import './GreekGrammarQuiz.css';

// Only options/answers judged "pure enough Greek" (see
// extractGreekSpeakable) have a pre-recorded clip at all — mixed Greek+Uzbek
// text (explanations that merely mention a Greek letter) never does, so the
// speak icon simply doesn't render for those rather than misreading them.
function speakableClipId(text) {
  const clean = extractGreekSpeakable(text);
  return clean ? GREEK_GRAMMAR_AUDIO_MAP[clean] : undefined;
}

function SpeakButton({ text, className }) {
  const clipId = speakableClipId(text);
  if (!clipId) return null;
  return (
    <button
      type="button"
      className={className}
      onClick={(e) => { e.stopPropagation(); speakGreekGrammarClip(clipId); }}
      aria-label="Eshitish"
      title="Eshitish"
    >
      <Volume2 size={14} strokeWidth={2.2} />
    </button>
  );
}

function shuffleOptions(question) {
  const order = question.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return { options: order.map((i) => question.options[i]), correct: order.indexOf(question.correct) };
}

function MultipleChoiceStep({ question, onAnswer }) {
  const shuffled = useMemo(() => shuffleOptions(question), [question]);
  const [selected, setSelected] = useState(null);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setTimeout(() => onAnswer(idx === shuffled.correct), 900);
  };

  return (
    <div className="greek-grammar-quiz-step">
      <p className="greek-grammar-quiz-question">{question.text}</p>
      <div className="greek-grammar-quiz-options">
        {shuffled.options.map((opt, idx) => {
          const showState = selected !== null;
          const isCorrect = idx === shuffled.correct;
          const cls = [
            'greek-grammar-quiz-option',
            showState && isCorrect ? 'correct' : '',
            showState && idx === selected && !isCorrect ? 'wrong' : '',
          ].filter(Boolean).join(' ');
          return (
            <div
              key={idx}
              role="button"
              tabIndex={showState ? -1 : 0}
              aria-disabled={showState}
              className={cls}
              onClick={() => handleSelect(idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelect(idx); }
              }}
            >
              <span className="greek-grammar-quiz-option-text">{opt}</span>
              <SpeakButton text={opt} className="greek-grammar-quiz-option-speak" />
            </div>
          );
        })}
      </div>
      {selected !== null && question.explanation && (
        <p className="greek-grammar-quiz-explanation">💡 {question.explanation}</p>
      )}
    </div>
  );
}

function ScrambledStep({ question, onAnswer }) {
  const tiles = useMemo(() => {
    const words = question.answer.trim().split(/\s+/).map((w, i) => ({ id: i, text: w.replace(/[.,?!]+$/, '') }));
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    return words;
  }, [question]);

  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState(null);

  const normalize = (str) => str.toLowerCase().replace(/[.,?!;·]/g, '').replace(/\s+/g, ' ').trim();

  const handlePick = (item) => {
    if (checked !== null || selected.some((s) => s.id === item.id)) return;
    setSelected((prev) => [...prev, item]);
  };

  const handleUndo = (item) => {
    if (checked !== null) return;
    setSelected((prev) => prev.filter((s) => s.id !== item.id));
  };

  const handleCheck = () => {
    const built = selected.map((s) => s.text).join(' ');
    const isCorrect = normalize(built) === normalize(question.answer);
    setChecked(isCorrect);
    setTimeout(() => onAnswer(isCorrect), 1200);
  };

  return (
    <div className="greek-grammar-quiz-step">
      <p className="greek-grammar-quiz-question">Jumlani to'g'ri tartibda tuzing</p>

      <div className={`greek-grammar-quiz-built ${checked === true ? 'correct' : checked === false ? 'wrong' : ''}`}>
        {selected.length === 0 ? (
          <span className="greek-grammar-quiz-built-placeholder">so'zlarni pastdan tanlang</span>
        ) : (
          selected.map((item) => (
            <button key={item.id} className="greek-grammar-quiz-tile selected" onClick={() => handleUndo(item)}>
              {item.text}
            </button>
          ))
        )}
      </div>

      <div className="greek-grammar-quiz-bank">
        {tiles.map((item) => {
          const used = selected.some((s) => s.id === item.id);
          return (
            <button
              key={item.id}
              className={`greek-grammar-quiz-tile ${used ? 'used' : ''}`}
              onClick={() => handlePick(item)}
              disabled={used || checked !== null}
            >
              {item.text}
            </button>
          );
        })}
      </div>

      {checked === null ? (
        selected.length > 0 && (
          <button className="greek-grammar-quiz-check-btn" onClick={handleCheck}>Tekshirish</button>
        )
      ) : (
        <p className="greek-grammar-quiz-explanation">
          <span className="greek-grammar-quiz-answer-row">
            {checked ? "✅ To'g'ri!" : `❌ To'g'ri javob: ${question.answer}`}
            <SpeakButton text={question.answer} className="greek-grammar-quiz-answer-speak" />
          </span>
          {question.explanation && <><br />💡 {question.explanation}</>}
        </p>
      )}
    </div>
  );
}

// Combined multiple-choice + sentence-building practice round for one
// Greek grammar topic — same two exercise shapes (and the same pure
// getQuestionsForExercise() helper) as the personal GrammarTopic.jsx, run
// back-to-back in one continuous session instead of as separate
// exercise-type menu entries, consistent with the rest of this Greek track.
export default function GreekGrammarQuiz({ topic, onExit, onComplete }) {
  const mcQuestions = useMemo(() => getQuestionsForExercise(topic, '1').slice(0, 6), [topic]);
  const scrambledQuestions = useMemo(() => getQuestionsForExercise(topic, '3').slice(0, 4), [topic]);
  const allSteps = useMemo(
    () => [
      ...mcQuestions.map((q) => ({ kind: 'mc', question: q })),
      ...scrambledQuestions.map((q) => ({ kind: 'scrambled', question: q })),
    ],
    [mcQuestions, scrambledQuestions]
  );

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const step = allSteps[index];
  const total = allSteps.length;

  const handleAnswer = (isCorrect) => {
    const nextScore = score + (isCorrect ? 1 : 0);
    setScore(nextScore);
    if (index + 1 >= total) {
      onComplete(nextScore, total);
    } else {
      setIndex((i) => i + 1);
    }
  };

  if (!step) return null;

  return (
    <div className="greek-grammar-quiz">
      <div className="greek-grammar-quiz-header">
        <button className="greek-grammar-quiz-exit" onClick={onExit} aria-label="Chiqish">
          <X size={20} strokeWidth={2.2} />
        </button>
        <div className="greek-grammar-quiz-progress-track">
          <div className="greek-grammar-quiz-progress-fill" style={{ width: `${(index / total) * 100}%` }} />
        </div>
      </div>

      <div className="greek-grammar-quiz-body" key={index}>
        {step.kind === 'mc' ? (
          <MultipleChoiceStep question={step.question} onAnswer={handleAnswer} />
        ) : (
          <ScrambledStep question={step.question} onAnswer={handleAnswer} />
        )}
      </div>
    </div>
  );
}
