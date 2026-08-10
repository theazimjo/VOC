import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

/**
 * Live users/{uid}/profile/wordTarget — the same field StudentLayout reads
 * for the corp "Target Words" card (see corpService.updateStudentWordTarget),
 * factored out so the individual dashboard can read it without going
 * through the corp-only Outlet context.
 */
export function useWordTarget(uid) {
  const [wordTarget, setWordTarget] = useState(null);

  useEffect(() => {
    if (!uid) {
      setWordTarget(null);
      return;
    }
    const unsub = onValue(ref(db, `users/${uid}/profile/wordTarget`), (snap) => {
      setWordTarget(snap.exists() ? snap.val() : null);
    }, (err) => {
      console.error('Error fetching word target:', err);
    });
    return unsub;
  }, [uid]);

  return wordTarget;
}
