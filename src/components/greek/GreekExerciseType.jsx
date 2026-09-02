import { useEffect, useRef, useState } from 'react';
import { Volume2, Check } from 'lucide-react';
import { speakGreekClip } from '../../utils/greekSpeech';
import './GreekExerciseShared.css';
import './GreekExerciseType.css';

// Three "type the Latin name" shapes, all checked the same way (case-
// insensitive match against nameLatin):
//  - 'type-name':          audio only — pure listening recall
//  - 'type-from-print':    the printed glyph is shown — writing out what
//                           you SEE in its printed form
//  - 'type-from-cursive':  the glyph is shown in the cursive/handwriting
//                           font — writing out what you see in its
//                           handwritten form (the "yozib o'tkazish" drill,
//                           companion to the multiple-choice
//                           to-print/to-cursive exercises)
const PROMPTS = {
  'type-name': 'Eshiting va harf nomini lotincha yozing',
  'type-from-print': "Bu (BOSMA) harfning nomini lotincha yozing",
  'type-from-cursive': "Bu (YOZMA) harfning nomini lotincha yozing",
};

export default function GreekExerciseType({ exercise, onAnswer }) {
  const [value, setValue] = useState('');
  const [locked, setLocked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const inputRef = useRef(null);
  const showsGlyph = exercise.type !== 'type-name';

  useEffect(() => {
    setValue('');
    setLocked(false);
    setIsCorrect(null);
    speakGreekClip(exercise.letter.id, 'name', exercise.letter.nameLatin);
    inputRef.current?.focus();
  }, [exercise]);

  const handleCheck = () => {
    if (locked || !value.trim()) return;
    setLocked(true);
    const correct = value.trim().toLowerCase() === exercise.letter.nameLatin.toLowerCase();
    setIsCorrect(correct);
    setTimeout(() => onAnswer(correct), 1000);
  };

  return (
    <div className="greek-ex-type">
      <div className="greek-ex-prompt">{PROMPTS[exercise.type]}</div>

      {showsGlyph ? (
        <div className="greek-ex-glyph-row">
          <span
            className="greek-ex-glyph"
            style={exercise.type === 'type-from-cursive' ? { fontFamily: 'var(--greek-cursive-font)', color: 'var(--greek-blue, #0d5eaf)' } : undefined}
          >
            {exercise.letter.upper}{exercise.letter.lower}
          </span>
          <button
            className="greek-ex-speak-btn"
            onClick={() => speakGreekClip(exercise.letter.id, 'name', exercise.letter.nameLatin)}
          >
            <Volume2 size={16} strokeWidth={2.2} />
          </button>
        </div>
      ) : (
        <button
          className="greek-ex-audio-btn"
          onClick={() => speakGreekClip(exercise.letter.id, 'name', exercise.letter.nameLatin)}
        >
          <Volume2 size={26} strokeWidth={2} />
        </button>
      )}

      <div className={`greek-ex-type-input-row ${locked ? (isCorrect ? 'correct' : 'wrong') : ''}`}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          disabled={locked}
          placeholder="masalan: Alpha"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        {!locked && (
          <button className="greek-ex-type-submit" onClick={handleCheck} disabled={!value.trim()}>
            <Check size={18} strokeWidth={2.4} />
          </button>
        )}
      </div>

      {locked && !isCorrect && (
        <div className="greek-ex-type-answer">To'g'ri javob: <strong>{exercise.letter.nameLatin}</strong></div>
      )}
    </div>
  );
}
