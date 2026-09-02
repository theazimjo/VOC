import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, runTransaction } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

// Progress for the standalone Greek grammar track — its own RTDB branch
// (users/{uid}/greek/grammar/topics), mirroring useGrammarStats.js's
// per-topic bestScore/timesCompleted shape but isolated from the personal
// grammar stats bucket (users/{uid}/grammar) the same way the alphabet and
// vocabulary tracks are isolated from their personal counterparts.
export function useGreekGrammarStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState(() => {
    if (typeof window !== 'undefined' && user) {
      const cached = localStorage.getItem(`voc-cache-greek-grammar-${user.uid}`);
      return cached ? JSON.parse(cached) : { topics: {} };
    }
    return { topics: {} };
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setStats({ topics: {} });
      setLoading(false);
      return;
    }

    const cacheKey = `voc-cache-greek-grammar-${user.uid}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setStats(JSON.parse(cached));
      setLoading(false);
    } else {
      setLoading(true);
    }

    const statsRef = ref(db, `users/${user.uid}/greek/grammar/topics`);
    const unsubscribe = onValue(
      statsRef,
      (snapshot) => {
        const topics = snapshot.val() || {};
        const newStats = { topics };
        localStorage.setItem(cacheKey, JSON.stringify(newStats));
        setStats(newStats);
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to Greek grammar stats:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const saveGreekGrammarResult = useCallback(
    async (topicId, topicTitle, score, totalQuestions) => {
      if (!user) return;
      const topicRef = ref(db, `users/${user.uid}/greek/grammar/topics/${topicId}`);
      await runTransaction(topicRef, (current) => ({
        topicTitle,
        bestScore: Math.max(current?.bestScore || 0, score),
        totalQuestions,
        timesCompleted: (current?.timesCompleted || 0) + 1,
        completedAt: new Date().toISOString(),
      }));
    },
    [user]
  );

  return { stats, loading, saveGreekGrammarResult };
}
