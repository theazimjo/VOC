import { ref, update } from 'firebase/database';
import { db } from '../firebase';
import { applyReview } from './spacedRepetition';

// Applies one review outcome to a Greek vocabulary word using the exact
// same spaced-repetition engine as the personal word bank (applyReview —
// see spacedRepetition.js/memoryEngine.js), just writing the result to the
// Greek track's own RTDB path instead of users/{uid}/words/{packId}. This
// is the Greek-side counterpart to experimentDB.js's saveReviewEvent —
// deliberately without that function's recallHistory/cluster-calibration
// bookkeeping, which belongs to the separate Memory Lab/Confusion Network
// analytics layer, not the core "does this word have its own memory" ask.
export async function saveGreekVocabReview(userId, wordId, currentWord, reviewInput) {
  const { isCorrect, confidence, responseTime, retrievalType = 'passive_recall', mode = null } = reviewInput;

  const updatedFields = applyReview(currentWord, {
    isCorrect,
    confidence,
    responseTimeSec: responseTime,
    retrievalType,
    mode,
  });

  await update(ref(db, `users/${userId}/greek/vocabulary/words/${wordId}`), updatedFields);
  return { ...currentWord, ...updatedFields };
}
