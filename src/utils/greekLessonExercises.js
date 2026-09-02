import { shuffleArray } from './arrayShuffle';

function pickDistractors(pool, exclude, count) {
  return shuffleArray(pool.filter((l) => l.id !== exclude.id)).slice(0, count);
}

function makeChoiceExercise(type, letter, allLetters) {
  return {
    id: `${letter.id}-${type}`,
    type,
    letter,
    choices: shuffleArray([letter, ...pickDistractors(allLetters, letter, 3)]),
  };
}

// Rotates every letter in the round through a second exercise type beyond
// 'choose-name' (which all of them always get) — choose-glyph, or one of
// the two print<->cursive conversion drills (pick the matching glyph) — so
// a round covers several different exercise shapes without every letter
// getting every shape every time (that would make rounds needlessly long).
const SECONDARY_TYPES = ['choose-glyph', 'to-print', 'to-cursive'];

// The "type it" slot rotates through the same idea but as a writing drill
// instead of multiple choice: plain listen-and-type, or write the name of
// what's shown in print / in cursive — the write-it companion to the
// select-it conversions above.
const TYPE_VARIANTS = ['type-name', 'type-from-print', 'type-from-cursive'];

// Builds one practice round's exercise queue for a small set of letters
// (typically 2 brand-new letters the learner just saw via GreekStepTeach/
// GreekStepTrace/GreekStepCursive, plus a couple of review letters mixed
// in). `allLetters` is the full alphabet, used only as the distractor pool
// so wrong choices aren't limited to the tiny round set.
export function buildPracticeRound(roundLetters, allLetters) {
  const singleExercises = [];

  roundLetters.forEach((letter, i) => {
    singleExercises.push(makeChoiceExercise('choose-name', letter, allLetters));
    singleExercises.push(makeChoiceExercise(SECONDARY_TYPES[i % SECONDARY_TYPES.length], letter, allLetters));
  });

  shuffleArray(roundLetters).slice(0, Math.min(2, roundLetters.length)).forEach((letter, i) => {
    const type = TYPE_VARIANTS[i % TYPE_VARIANTS.length];
    singleExercises.push({ id: `${letter.id}-${type}`, type, letter });
  });

  const queue = shuffleArray(singleExercises);
  if (roundLetters.length > 1) {
    queue.splice(Math.floor(queue.length / 2), 0, {
      id: 'match',
      type: 'match',
      letters: roundLetters,
    });
  }
  return queue;
}

export const LESSON_START_HEARTS = 5;

export function starsForMistakes(mistakes) {
  if (mistakes === 0) return 3;
  if (mistakes <= 2) return 2;
  return 1;
}
