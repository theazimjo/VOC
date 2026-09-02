import { useMemo, useRef, useState } from 'react';
import { X, PartyPopper } from 'lucide-react';
import { MASTERY_CORRECT_DELTA, MASTERY_WRONG_DELTA, clampMastery } from '../../utils/greekMastery';
import GreekVocabFlashcard from './GreekVocabFlashcard';
import GreekVocabSpelling from './GreekVocabSpelling';
import './GreekLearnFlow.css';

// Vocabulary counterpart to GreekLearnFlow, deliberately simpler — same
// two-stage shape as the main app's own practice flow (Flashcard, then
// SpellingGame): flip through the round's words to see their meaning, then
// spell each one from scrambled letter tiles. No hearts, no multi-type
// exercise queue — mastery is driven entirely by the spelling stage's
// correct/incorrect results, accumulated locally and flushed once at the
// end (same pattern as GreekLearnFlow.jsx).
export default function GreekVocabLearnFlow({ newWords, reviewWords, initialMastery, onExit, onComplete }) {
  // Flashcards only cover brand-new words — skip straight to spelling once
  // every word has already been introduced (pure spaced-review sessions).
  const [phase, setPhase] = useState(newWords.length > 0 ? 'flashcards' : 'spelling'); // flashcards | spelling | done
  const deltasRef = useRef({});
  const [spellingScore, setSpellingScore] = useState({ correct: 0, total: 0 });

  const roundWords = useMemo(() => [...newWords, ...reviewWords], [newWords, reviewWords]);

  const handleSpellingAnswer = (wordId, isCorrect) => {
    deltasRef.current[wordId] = isCorrect ? MASTERY_CORRECT_DELTA : MASTERY_WRONG_DELTA;
    setSpellingScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
  };

  const handleSpellingComplete = () => {
    const masteryUpdates = {};
    roundWords.forEach((word) => {
      const base = initialMastery[word.id] ?? 0;
      masteryUpdates[word.id] = clampMastery(base + (deltasRef.current[word.id] || 0));
    });
    // A brand-new word always ends the session "introduced" even with a
    // net-zero delta, otherwise it never leaves the "next up" slot.
    newWords.forEach((word) => {
      if (masteryUpdates[word.id] === undefined) masteryUpdates[word.id] = 0;
    });
    setPhase('done');
    // Hand off after the brief "done" screen renders, not before — onExit/
    // onComplete unmount this component immediately.
    setTimeout(() => onComplete(masteryUpdates), 900);
  };

  return (
    <div className="greek-learn-flow">
      <div className="greek-learn-flow-header">
        <button className="greek-learn-flow-exit" onClick={onExit} aria-label="Chiqish">
          <X size={20} strokeWidth={2.2} />
        </button>
      </div>

      <div className="greek-learn-flow-body">
        {phase === 'flashcards' && (
          <GreekVocabFlashcard words={newWords} onComplete={() => setPhase('spelling')} />
        )}
        {phase === 'spelling' && (
          <GreekVocabSpelling
            words={roundWords}
            onAnswer={handleSpellingAnswer}
            onComplete={handleSpellingComplete}
          />
        )}
        {phase === 'done' && (
          <div className="greek-vocab-learn-done">
            <PartyPopper size={40} strokeWidth={1.6} />
            <h2>Ajoyib!</h2>
            <p>{spellingScore.correct}/{spellingScore.total} to'g'ri yozildi</p>
          </div>
        )}
      </div>
    </div>
  );
}
