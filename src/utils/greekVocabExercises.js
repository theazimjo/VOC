import { shuffleArray } from './arrayShuffle';

function pickDistractors(pool, exclude, count) {
  return shuffleArray(pool.filter((w) => w.id !== exclude.id)).slice(0, count);
}

function makeChoiceExercise(type, word, allWords) {
  return {
    id: `${word.id}-${type}`,
    type,
    word,
    choices: shuffleArray([word, ...pickDistractors(allWords, word, 3)]),
  };
}

// Rotates every word in the round through a second exercise type beyond
// 'choose-meaning' (which all of them always get).
const SECONDARY_TYPES = ['choose-word', 'listen-choose'];

// Builds one vocabulary practice round's exercise queue — same shape as
// the alphabet track's buildPracticeRound (see greekLessonExercises.js),
// just without a cursive dimension (words are only ever shown in print).
export function buildVocabPracticeRound(roundWords, allWords) {
  const singleExercises = [];

  roundWords.forEach((word, i) => {
    singleExercises.push(makeChoiceExercise('choose-meaning', word, allWords));
    singleExercises.push(makeChoiceExercise(SECONDARY_TYPES[i % SECONDARY_TYPES.length], word, allWords));
  });

  shuffleArray(roundWords).slice(0, Math.min(2, roundWords.length)).forEach((word) => {
    singleExercises.push({ id: `${word.id}-type-translit`, type: 'type-translit', word });
  });

  const queue = shuffleArray(singleExercises);
  if (roundWords.length > 1) {
    queue.splice(Math.floor(queue.length / 2), 0, {
      id: 'match',
      type: 'match',
      words: roundWords,
    });
  }
  return queue;
}
