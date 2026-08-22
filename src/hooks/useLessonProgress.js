import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

// Tracks per-unit stage completion (grammar/reading/listening — words'
// completion is derived live from word mastery, not stored here) for a
// course pack, at users/{uid}/packs/{packId}/lessonProgress/{unitId}/{stage}.
export function useLessonProgress(packId) {
  const { user } = useAuth();
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !packId) {
      setProgress({});
      setLoading(false);
      return;
    }

    setLoading(true);
    const progressRef = ref(db, `users/${user.uid}/packs/${packId}/lessonProgress`);
    const unsubscribe = onValue(
      progressRef,
      (snapshot) => {
        setProgress(snapshot.val() || {});
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to lesson progress:', error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user, packId]);

  const markStageDone = useCallback(
    async (unitId, stage, data = {}) => {
      if (!user || !packId || !unitId || !stage) return;
      const stageRef = ref(db, `users/${user.uid}/packs/${packId}/lessonProgress/${unitId}/${stage}`);
      await update(stageRef, { done: true, completedAt: new Date().toISOString(), ...data });
    },
    [user, packId]
  );

  return { progress, loading, markStageDone };
}
