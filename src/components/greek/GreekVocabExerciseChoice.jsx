import { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { speakGreekVocab } from '../../utils/greekSpeech';
import '../greek/GreekExerciseShared.css';
import './GreekVocabExerciseChoice.css';

// Three "one prompt, four choices" shapes for vocabulary:
//  - 'choose-meaning': Greek word shown (+ audio),  pick the matching Uzbek meaning
//  - 'choose-word':    Uzbek meaning shown,          pick the matching Greek word
//  - 'listen-choose':  word spoken aloud only,        pick the matching Greek word
const PROMPTS = {
  'choose-meaning': "Bu so'zning ma'nosini toping",
  'choose-word': 'Ushbu maʼnoga mos so\'zni tanlang',
  'listen-choose': "Eshiting va to'g'ri so'zni tanlang",
};

export default function GreekVocabExerciseChoice({ exercise, onAnswer }) {
  const [selectedId, setSelectedId] = useState(null);
  const [locked, setLocked] = useState(false);
  const isWordChoice = exercise.type !== 'choose-meaning';
  const isAudioPrompt = exercise.type === 'listen-choose';

  useEffect(() => {
    setSelectedId(null);
    setLocked(false);
    if (isAudioPrompt) {
      speakGreekVocab(exercise.word.id, exercise.word.translit);
    }
  }, [exercise, isAudioPrompt]);

  const handleSelect = (choiceId) => {
    if (locked) return;
    setLocked(true);
    setSelectedId(choiceId);
    const isCorrect = choiceId === exercise.word.id;
    setTimeout(() => onAnswer(isCorrect), 700);
  };

  return (
    <div className="greek-vocab-ex-choice">
      <div className="greek-ex-prompt">{PROMPTS[exercise.type]}</div>

      {isAudioPrompt ? (
        <button
          className="greek-ex-audio-btn"
          onClick={() => speakGreekVocab(exercise.word.id, exercise.word.translit)}
        >
          <Volume2 size={26} strokeWidth={2} />
        </button>
      ) : exercise.type === 'choose-meaning' ? (
        <div className="greek-ex-glyph-row">
          <span className="greek-vocab-ex-word">{exercise.word.greek}</span>
          <button
            className="greek-ex-speak-btn"
            onClick={() => speakGreekVocab(exercise.word.id, exercise.word.translit)}
          >
            <Volume2 size={16} strokeWidth={2.2} />
          </button>
        </div>
      ) : (
        <div className="greek-vocab-ex-meaning-prompt">{exercise.word.uz}</div>
      )}

      <div className={`greek-vocab-ex-choices ${isWordChoice ? 'greek-vocab-ex-choices-word' : ''}`}>
        {exercise.choices.map((choice) => {
          const isSelected = selectedId === choice.id;
          const isCorrectChoice = choice.id === exercise.word.id;
          const showState = locked && (isSelected || isCorrectChoice);
          const stateClass = showState && isCorrectChoice ? 'correct' : showState && isSelected ? 'wrong' : '';
          return (
            <button
              key={choice.id}
              className={['greek-vocab-ex-choice-btn', stateClass].filter(Boolean).join(' ')}
              onClick={() => handleSelect(choice.id)}
              disabled={locked}
            >
              {isWordChoice ? (
                <>
                  <span className="greek-vocab-ex-choice-word">{choice.greek}</span>
                  <span className="greek-vocab-ex-choice-translit">[{choice.translit}]</span>
                </>
              ) : (
                choice.uz
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
