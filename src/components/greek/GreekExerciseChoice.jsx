import { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { speakGreekClip } from '../../utils/greekSpeech';
import './GreekExerciseShared.css';
import './GreekExerciseChoice.css';

// Covers four exercise shapes that are all "one prompt, four choice
// buttons" underneath — they only differ in what the prompt is and how the
// choices render:
//  - 'choose-name':  glyph shown (print),        pick the matching name
//  - 'choose-glyph': name spoken aloud,           pick the matching print glyph
//  - 'to-print':     glyph shown in cursive font, pick the matching print glyph
//  - 'to-cursive':   glyph shown in print,        pick the matching cursive-font glyph
const PROMPTS = {
  'choose-name': "Bu harf qanday nomlanadi?",
  'choose-glyph': "Eshiting va to'g'ri harfni tanlang",
  'to-print': "Bu harfning BOSMA shaklini toping",
  'to-cursive': "Bu harfning YOZMA shaklini toping",
};

const PROMPT_FONT = { 'to-print': 'cursive' }; // all others render the prompt in print
const CHOICE_FONT = { 'to-cursive': 'cursive' }; // all others render choices in print

export default function GreekExerciseChoice({ exercise, onAnswer }) {
  const [selectedId, setSelectedId] = useState(null);
  const [locked, setLocked] = useState(false);
  const isAudioPrompt = exercise.type === 'choose-glyph';
  const isGlyphChoice = exercise.type !== 'choose-name';
  const promptIsCursive = PROMPT_FONT[exercise.type] === 'cursive';
  const choiceIsCursive = CHOICE_FONT[exercise.type] === 'cursive';

  useEffect(() => {
    setSelectedId(null);
    setLocked(false);
    if (isAudioPrompt) {
      speakGreekClip(exercise.letter.id, 'name', exercise.letter.nameLatin);
    }
  }, [exercise, isAudioPrompt]);

  const handleSelect = (choiceId) => {
    if (locked) return;
    setLocked(true);
    setSelectedId(choiceId);
    const isCorrect = choiceId === exercise.letter.id;
    setTimeout(() => onAnswer(isCorrect), 700);
  };

  return (
    <div className="greek-ex-choice">
      <div className="greek-ex-prompt">{PROMPTS[exercise.type]}</div>

      {isAudioPrompt ? (
        <button
          className="greek-ex-audio-btn"
          onClick={() => speakGreekClip(exercise.letter.id, 'name', exercise.letter.nameLatin)}
        >
          <Volume2 size={26} strokeWidth={2} />
        </button>
      ) : (
        <div className="greek-ex-glyph-row">
          <span
            className="greek-ex-glyph"
            style={promptIsCursive ? { fontFamily: 'var(--greek-cursive-font)', color: 'var(--greek-blue, #0d5eaf)' } : undefined}
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
      )}

      <div className={`greek-ex-choices ${isGlyphChoice ? 'greek-ex-choices-glyph' : ''}`}>
        {exercise.choices.map((choice) => {
          const isSelected = selectedId === choice.id;
          const isCorrectChoice = choice.id === exercise.letter.id;
          const showState = locked && (isSelected || isCorrectChoice);
          return (
            <button
              key={choice.id}
              className={[
                'greek-ex-choice-btn',
                isGlyphChoice ? 'greek-ex-choice-btn-glyph' : '',
                showState && isCorrectChoice ? 'correct' : '',
                showState && isSelected && !isCorrectChoice ? 'wrong' : '',
              ].filter(Boolean).join(' ')}
              style={isGlyphChoice && choiceIsCursive ? { fontFamily: 'var(--greek-cursive-font)' } : undefined}
              onClick={() => handleSelect(choice.id)}
              disabled={locked}
            >
              {isGlyphChoice ? `${choice.upper}${choice.lower}` : choice.nameLatin}
            </button>
          );
        })}
      </div>
    </div>
  );
}
