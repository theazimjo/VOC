import { useEffect, useRef, useState } from 'react';
import { Volume2, Check } from 'lucide-react';
import { speakGreekVocab } from '../../utils/greekSpeech';
import '../greek/GreekExerciseShared.css';
import './GreekVocabExerciseType.css';

// "Listen and type" for vocabulary — plays the word, the learner types its
// Latin transliteration. Checked case-insensitively; typing the Uzbek
// meaning instead was deliberately avoided (accent marks / apostrophe
// variants in "o'zbekcha" spelling would cause false negatives).
export default function GreekVocabExerciseType({ exercise, onAnswer }) {
  const [value, setValue] = useState('');
  const [locked, setLocked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setValue('');
    setLocked(false);
    setIsCorrect(null);
    speakGreekVocab(exercise.word.id, exercise.word.translit);
    inputRef.current?.focus();
  }, [exercise]);

  const handleCheck = () => {
    if (locked || !value.trim()) return;
    setLocked(true);
    const correct = value.trim().toLowerCase() === exercise.word.translit.toLowerCase();
    setIsCorrect(correct);
    setTimeout(() => onAnswer(correct), 1000);
  };

  return (
    <div className="greek-vocab-ex-type">
      <div className="greek-ex-prompt">Eshiting va so'zni lotincha yozing</div>

      <button
        className="greek-ex-audio-btn"
        onClick={() => speakGreekVocab(exercise.word.id, exercise.word.translit)}
      >
        <Volume2 size={26} strokeWidth={2} />
      </button>

      <div className={`greek-vocab-ex-type-input-row ${locked ? (isCorrect ? 'correct' : 'wrong') : ''}`}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          disabled={locked}
          placeholder="masalan: kaliméra"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        {!locked && (
          <button className="greek-vocab-ex-type-submit" onClick={handleCheck} disabled={!value.trim()}>
            <Check size={18} strokeWidth={2.4} />
          </button>
        )}
      </div>

      {locked && !isCorrect && (
        <div className="greek-vocab-ex-type-answer">To'g'ri javob: <strong>{exercise.word.translit}</strong></div>
      )}
    </div>
  );
}
