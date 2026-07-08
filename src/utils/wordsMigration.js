import { ref, get, update, remove } from 'firebase/database';
import { db } from '../firebase';

/**
 * Lazily migrates a pack's legacy nested words (users/{uid}/packs/{packId}/words)
 * into the new flat location (users/{uid}/words/{packId}).
 *
 * Copies before removing, so a failure never loses data — if the copy
 * fails, the legacy node is left untouched and can be retried later.
 * Safe to call repeatedly: it's a cheap no-op once a pack is migrated,
 * since the legacy existence check returns false immediately.
 */
export async function migratePackWordsIfNeeded(uid, packId) {
  if (!uid || !packId) return;

  const legacyWordsRef = ref(db, `users/${uid}/packs/${packId}/words`);
  const legacySnap = await get(legacyWordsRef);
  if (!legacySnap.exists()) return;

  const newWordsRef = ref(db, `users/${uid}/words/${packId}`);
  const newSnap = await get(newWordsRef);
  if (!newSnap.exists()) {
    await update(newWordsRef, legacySnap.val());
  }

  await remove(legacyWordsRef);
}
