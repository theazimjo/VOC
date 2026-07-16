import { useState, useEffect, useCallback } from 'react';
import { ref, set, push, onValue, get, runTransaction } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export function useGrammarStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState(() => {
    if (typeof window !== 'undefined' && user) {
      const cached = localStorage.getItem(`voc-cache-grammar-${user.uid}`);
      return cached ? JSON.parse(cached) : { history: [], topics: {} };
    }
    return { history: [], topics: {} };
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setStats({ history: [], topics: {} });
      setLoading(false);
      return;
    }

    const cacheKey = `voc-cache-grammar-${user.uid}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setStats(JSON.parse(cached));
      setLoading(false);
    } else {
      setLoading(true);
    }

    const grammarRef = ref(db, `users/${user.uid}/grammar`);

    const unsubscribe = onValue(
      grammarRef,
      (snapshot) => {
        const val = snapshot.val() || {};
        const historyData = [];
        if (val.history) {
          Object.keys(val.history).forEach((key) => {
            historyData.push({
              id: key,
              ...val.history[key],
            });
          });
        }
        // Sort history by date descending
        historyData.sort((a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0));

        const topicsData = val.topics || {};

        const newStats = {
          history: historyData,
          topics: topicsData,
        };

        localStorage.setItem(cacheKey, JSON.stringify(newStats));
        setStats(newStats);
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to grammar stats:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const saveGrammarResult = useCallback(
    async (level, topicId, topicTitle, score, totalQuestions, exerciseId) => {
      if (!user) return;

      const completedAt = new Date().toISOString();
      const wrongCount = totalQuestions - score;

      // 1. History entry
      const historyRef = ref(db, `users/${user.uid}/grammar/history`);
      const newHistoryRef = push(historyRef);
      const historyItem = {
        level,
        topicId,
        topicTitle,
        exerciseId,
        score,
        totalQuestions,
        wrongCount,
        completedAt,
      };
      await set(newHistoryRef, historyItem);

      // 2. Save exercise stats — atomically, so two near-simultaneous submits
      // (e.g. two tabs/devices) can't read the same bestScore/timesCompleted
      // and have the second write silently clobber the first's increment.
      const exerciseRef = ref(db, `users/${user.uid}/grammar/topics/${topicId}/exercises/${exerciseId}`);
      const exerciseTxResult = await runTransaction(exerciseRef, (current) => {
        const bestScore = Math.max(current?.bestScore || 0, score);
        const timesCompleted = (current?.timesCompleted || 0) + 1;
        return {
          bestScore,
          totalQuestions,
          wrongCount: totalQuestions - bestScore,
          completedAt,
          timesCompleted
        };
      });
      const exerciseData = exerciseTxResult.snapshot.val();

      // 3. Load all exercises to calculate overall best score and total questions
      const exercisesRef = ref(db, `users/${user.uid}/grammar/topics/${topicId}/exercises`);
      const exercisesSnap = await get(exercisesRef);
      let overallBestScore = exerciseData.bestScore;
      let overallTotalQuestions = totalQuestions;

      if (exercisesSnap.exists()) {
        const exMap = exercisesSnap.val() || {};
        overallBestScore = Object.values(exMap).reduce((sum, ex) => sum + (ex.bestScore || 0), 0);
        overallTotalQuestions = Object.values(exMap).reduce((sum, ex) => sum + (ex.totalQuestions || 20), 0);
      }

      // 4. Update overall topic details — atomically, for the same reason as step 2.
      const topicRef = ref(db, `users/${user.uid}/grammar/topics/${topicId}`);
      await runTransaction(topicRef, (current) => ({
        ...(current || {}),
        level,
        topicTitle,
        bestScore: overallBestScore,
        totalQuestions: overallTotalQuestions,
        completedAt,
        timesCompleted: (current?.timesCompleted || 0) + 1
      }));
    },
    [user]
  );

  return {
    stats,
    loading,
    saveGrammarResult,
  };
}
