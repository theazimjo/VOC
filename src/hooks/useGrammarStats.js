import { useState, useEffect, useCallback } from 'react';
import { ref, set, push, onValue, get } from 'firebase/database';
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
    async (level, topicId, topicTitle, score, totalQuestions) => {
      if (!user) return;

      const completedAt = new Date().toISOString();
      const wrongCount = totalQuestions - score;

      const historyRef = ref(db, `users/${user.uid}/grammar/history`);
      const newHistoryRef = push(historyRef);
      const historyItem = {
        level,
        topicId,
        topicTitle,
        score,
        totalQuestions,
        wrongCount,
        completedAt,
      };

      await set(newHistoryRef, historyItem);

      const topicRef = ref(db, `users/${user.uid}/grammar/topics/${topicId}`);
      const snap = await get(topicRef);
      let bestScore = score;
      let timesCompleted = 1;

      if (snap.exists()) {
        const currentVal = snap.val();
        bestScore = Math.max(currentVal.bestScore || 0, score);
        timesCompleted = (currentVal.timesCompleted || 0) + 1;
      }

      const topicData = {
        level,
        topicTitle,
        bestScore,
        totalQuestions,
        completedAt,
        timesCompleted,
      };

      await set(topicRef, topicData);
    },
    [user]
  );

  return {
    stats,
    loading,
    saveGrammarResult,
  };
}
