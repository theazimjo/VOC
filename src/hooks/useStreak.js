import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, set, runTransaction } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { incrementActivity as incrementActivityUtil, checkAndHealStreak } from '../utils/streak';

/**
 * useStreak hook
 * Manages daily goal points and Duolingo-style streak calculation.
 * Paths: users/${userId}/streak
 */
export function useStreak() {
  const { user } = useAuth();
  const [streak, setStreak] = useState(() => {
    if (typeof window !== 'undefined' && user) {
      const cached = localStorage.getItem(`voc-cache-streak-${user.uid}`);
      return cached ? JSON.parse(cached) : null;
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setStreak(null);
      setLoading(false);
      return;
    }

    const cacheKey = `voc-cache-streak-${user.uid}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setStreak(JSON.parse(cached));
      setLoading(false);
    } else {
      setLoading(true);
    }

    const streakRef = ref(db, `users/${user.uid}/streak`);

    const unsubscribe = onValue(
      streakRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Self-heal: verify if yesterday's goal was not met, reset streak
          const healed = checkAndHealStreak(data);
          if (healed.modified) {
            // Use a transaction (not a plain set) so this can't clobber a
            // concurrent incrementActivity transaction with stale snapshot data —
            // it re-derives the heal decision from whatever is actually in the
            // DB at commit time.
            runTransaction(streakRef, (currentData) => {
              if (!currentData) return currentData;
              const rehealed = checkAndHealStreak(currentData);
              return rehealed.modified ? rehealed.data : currentData;
            });
          }
          localStorage.setItem(cacheKey, JSON.stringify(healed.data));
          setStreak(healed.data);
        } else {
          // Initialize default streak
          const defaultStreak = {
            streakCount: 0,
            lastActiveDate: '',
            todayCount: 0,
            dailyGoal: 5,
            activityLog: {}
          };
          set(streakRef, defaultStreak);
          setStreak(defaultStreak);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to streak from RTDB:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Atomically increment points for activity today
  const incrementActivity = useCallback(async (amount = 1) => {
    if (!user) return;
    await incrementActivityUtil(user.uid, amount);
  }, [user]);

  // Set new daily goal target
  const setDailyGoal = useCallback(async (goal) => {
    if (!user) return;
    const streakRef = ref(db, `users/${user.uid}/streak/dailyGoal`);
    await set(streakRef, goal);
  }, [user]);

  return { streak, loading, incrementActivity, setDailyGoal };
}
