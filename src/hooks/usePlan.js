import { useEffect, useMemo, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { mergePlans, resolvePlan } from '../utils/plans';

// Admin-set price/limit overrides, shared by every consumer in the page.
export function usePlansConfig(kind) {
  const [overrides, setOverrides] = useState(null);
  useEffect(() => {
    const off = onValue(ref(db, 'plans'), (s) => setOverrides(s.val() || {}), () => setOverrides({}));
    return () => off();
  }, []);
  return useMemo(() => mergePlans(kind, overrides), [kind, overrides]);
}

// The signed-in learner's current plan: { planId, status, daysLeft, plans }.
export function useStudentPlan(uid) {
  const [sub, setSub] = useState(undefined);
  const plans = usePlansConfig('student');
  useEffect(() => {
    if (!uid) { setSub(undefined); return undefined; }
    const off = onValue(ref(db, `users/${uid}/subscription`), (s) => setSub(s.val() || null), () => setSub(null));
    return () => off();
  }, [uid]);
  return { ...resolvePlan('student', sub), plans, loaded: sub !== undefined };
}
