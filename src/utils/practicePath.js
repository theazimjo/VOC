// The student's "Practice" button: instead of asking which exercise to do, the
// app builds one continuous session from what this particular learner already
// knows. Pure functions (no React, no Firebase) so the rules are testable.
//
// A word moves through four stages, read from the fields the memory engine
// already stores on every word record (reviewCount, activeRecallPasses,
// quality, lastReviewed ...):
//
//   new      never shown                           -> Flashcards (first look)
//   seen     shown, never produced by the learner  -> Spelling   (type it)
//   active   typed correctly at least once         -> Quiz / Match / Spelling,
//                                                     rotating, until it sticks
//   learned  typed correctly twice, last answer ok, -> leaves the session; the
//            and still predicted to be remembered      normal spaced schedule
//                                                       brings it back
//
// A learned word that fades (predicted recall drops) falls back to "active",
// and a faded word in an *earlier* topic is brought back at the start of the
// session ("review"). How many new words are added, and how many words one
// session holds, adapts to the learner's accuracy and current backlog.
import { computeRecallProbability, resolveStability } from '@voc/memory-engine';

export const STAGE = { NEW: 'new', SEEN: 'seen', ACTIVE: 'active', LEARNED: 'learned' };

// Probability of still remembering a word right now, from the engine's own
// forgetting curve (stability = days it takes to drop to ~37%).
// A word is "forgotten" below this ...
export const FORGOTTEN_BELOW = 0.6;
// ... and a "learned" word must still sit at or above this.
export const LEARNED_AT_LEAST = 0.75;
// Below this a forgotten word is relearned (Flashcards) instead of typed.
const RELEARN_BELOW = 0.35;
const DAY = 24 * 60 * 60 * 1000;

const FIRST_BATCH = 5;
const LATER_BATCH = 3;
const BACKLOG_CAP = 10; // words in play (seen + active) before new ones pause
const MAX_REVIEW = 8;
const PART_LIMIT = { flashcard: 7, spelling: 10, quiz: 10, match: 8 };
const PART_MIN = { flashcard: 1, spelling: 3, quiz: 4, match: 4 };

const seenBefore = (w) => (w?.reviewCount || 0) > 0;

export function recallOf(word, ctx = {}) {
  const now = ctx.now ?? Date.now();
  const last = word?.lastReviewed ? new Date(word.lastReviewed).getTime() : NaN;
  if (!Number.isFinite(last)) return seenBefore(word) ? 0.5 : 0;
  return computeRecallProbability(resolveStability(word), (now - last) / DAY);
}

export function wordStage(word, ctx = {}) {
  if (!seenBefore(word)) return STAGE.NEW;
  const passes = word.activeRecallPasses || 0;
  if (passes === 0) return STAGE.SEEN;
  const lastOk = (word.quality ?? 3) >= 3;
  if (passes >= 2 && lastOk && recallOf(word, ctx) >= LEARNED_AT_LEAST) return STAGE.LEARNED;
  return STAGE.ACTIVE;
}

// share of answers that were right, across the words the learner has touched
export function accuracyOf(words) {
  let reviews = 0;
  let correct = 0;
  words.forEach((w) => {
    if (!seenBefore(w)) return;
    reviews += w.reviewCount || 0;
    correct += Math.min(w.reviewCount || 0, w.correctCount ?? 0);
  });
  // a handful of passive flashcard looks says nothing about accuracy yet
  return reviews >= 10 ? correct / reviews : null;
}

// How many brand-new words to add to this session.
export function newWordsFor({ introduced, accuracy, inPlay }) {
  let n = introduced === 0 ? FIRST_BATCH : LATER_BATCH;
  if (accuracy !== null) {
    if (accuracy >= 0.85) n += 2;
    else if (accuracy < 0.45) n = 0; // struggling: consolidate first
    else if (accuracy < 0.6) n -= 1;
  }
  if (inPlay >= BACKLOG_CAP) n = 0;
  return Math.max(0, Math.min(n, BACKLOG_CAP - inPlay));
}

const byRecall = (ctx) => (a, b) => recallOf(a, ctx) - recallOf(b, ctx);

// Make a part reach the minimum the exercise needs by adding filler words
// (anything from the topic that is not already in it); fall back to Flashcards
// when even that is not enough.
function fit(mode, words, filler) {
  if (words.length === 0) return null;
  const limit = PART_LIMIT[mode];
  let list = words.slice(0, limit);
  const min = PART_MIN[mode];
  if (list.length < min) {
    const have = new Set(list.map((w) => w.id));
    for (const f of filler) {
      if (list.length >= min) break;
      if (!have.has(f.id)) { list.push(f); have.add(f.id); }
    }
  }
  if (list.length < min) return { mode: 'flashcard', words: words.slice(0, PART_LIMIT.flashcard) };
  return { mode, words: list };
}

/**
 * @param {Object[]} unitWords  words of the topic being practiced, in topic order,
 *                              each merged with the learner's saved stats
 * @param {{storageId: string, title: string, words: Object[]}[]} otherTopics
 *                              earlier assignments (words merged with stats)
 * @returns {{ parts: {kind: 'review'|'new'|'practice', mode: string, words: Object[]}[], counts: Object }}
 */
export function planSmartSession({ unitWords, otherTopics = [], now = Date.now() }) {
  const ctx = { now };
  const parts = [];

  const staged = unitWords.map((w) => ({ w, stage: wordStage(w, ctx) }));
  const pick = (stage) => staged.filter((s) => s.stage === stage).map((s) => s.w);
  const fresh = pick(STAGE.NEW);
  const seen = pick(STAGE.SEEN);
  const active = pick(STAGE.ACTIVE);
  const learned = pick(STAGE.LEARNED).sort(byRecall(ctx));
  const inPlay = seen.length + active.length;
  const introduced = unitWords.length - fresh.length;

  // 1. Earlier topics: bring back what is fading.
  const forgotten = otherTopics
    .flatMap((t) => t.words
      .filter((w) => seenBefore(w) && recallOf(w, ctx) < FORGOTTEN_BELOW)
      // The id is made unique across topics (ids like "0", "1" repeat from one
      // topic to the next); __storageId / __origId say where its progress lives.
      .map((w) => ({ ...w, id: `${t.storageId}::${w.id}`, __origId: w.id, __storageId: t.storageId, __topicTitle: t.title })))
    .sort(byRecall(ctx))
    .slice(0, MAX_REVIEW);
  if (forgotten.length) {
    const relearn = forgotten.filter((w) => recallOf(w, ctx) < RELEARN_BELOW);
    const typeable = forgotten.filter((w) => recallOf(w, ctx) >= RELEARN_BELOW);
    const spelling = fit('spelling', typeable, []);
    if (relearn.length) parts.push({ kind: 'review', mode: 'flashcard', words: relearn.slice(0, PART_LIMIT.flashcard) });
    if (spelling) parts.push({ kind: 'review', ...spelling });
  }

  // 2. New words of this topic, shown as Flashcards.
  const take = newWordsFor({ introduced, accuracy: accuracyOf(unitWords), inPlay });
  const newcomers = fresh.slice(0, take);
  if (newcomers.length) parts.push({ kind: 'new', mode: 'flashcard', words: newcomers });

  // Anything the learner can type or recognise, used to top a short part up.
  const filler = [...learned, ...active, ...seen];

  // 3. Seen but never typed: type them.
  const typed = fit('spelling', seen, filler);
  if (typed) parts.push({ kind: 'practice', ...typed });

  // 4. Typed at least once: rotate Quiz / Match / Spelling until they stick.
  if (active.length) {
    const turn = Math.max(...active.map((w) => w.reviewCount || 0)) % 3;
    const order = ['quiz', 'match', 'spelling'];
    const mode = order[turn];
    const part = fit(mode, active, filler) || fit('spelling', active, filler);
    if (part) parts.push({ kind: 'practice', ...part });
  }

  // 5. Nothing due and nothing new: a short refresh of the weakest words.
  if (parts.length === 0) {
    const weakest = [...unitWords].filter(seenBefore).sort(byRecall(ctx));
    const part = fit('spelling', weakest, unitWords) || (unitWords.length ? { mode: 'flashcard', words: unitWords.slice(0, PART_LIMIT.flashcard) } : null);
    if (part) parts.push({ kind: 'practice', ...part });
  }

  return {
    parts,
    counts: { new: fresh.length, seen: seen.length, active: active.length, learned: learned.length, forgotten: forgotten.length },
  };
}
