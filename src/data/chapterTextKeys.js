// Which topics have a chapter text to read. The texts themselves are huge
// (about 1.2 MB together), so pages that only need to know *whether* a topic
// has one (to show a Read button) use this tiny list instead of importing them.
// chapterTextKeys.test.js fails if this drifts from the real data.
import { LIBRARY_CHAPTERS } from './libraryChapters';

const ESSENTIAL_3000 = [
  "Unit 01 · The Lion and the Rabbit",
  "Unit 02 · The Laboratory",
  "Unit 03 · The Report",
  "Unit 04 · The Dog's Bell",
  "Unit 05 · The Jackal and the Sun Child",
  "Unit 06 · The Friendly Ghost",
  "Unit 07 · The Best Prince",
  "Unit 08 · How the Sun and the Moon Were Made",
  "Unit 09 · The Starfish",
  "Unit 10 · The First Peacock",
  "Unit 11 · Princess Rose and the Creature",
  "Unit 12 · The Crazy Artist",
  "Unit 13 · The Farmer and the Cats",
  "Unit 14 · A Magical Book",
  "Unit 15 · The Big Race",
  "Unit 16 · Adams County's Gold",
  "Unit 17 · The Race for Water",
  "Unit 18 · The Little Red Chicken",
  "Unit 19 · Shipwrecked",
  "Unit 20 · The Seven Cities of Gold",
  "Unit 21 · Katy",
  "Unit 22 · A Better Reward",
  "Unit 23 · The Camp",
  "Unit 24 · A Strong Friendship",
  "Unit 25 · Joe's Pond",
  "Unit 26 · Archie and His Donkey",
  "Unit 27 · The Spider and the Bird",
  "Unit 28 · The Party",
  "Unit 29 · How the World Got Light",
  "Unit 30 · Cats and Secrets"
];

export const CHAPTER_TEXT_KEYS = new Set([
  ...ESSENTIAL_3000,
  ...LIBRARY_CHAPTERS.science,
  ...LIBRARY_CHAPTERS.health,
]);

export const hasChapterText = (topic) => CHAPTER_TEXT_KEYS.has(topic);
