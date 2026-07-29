import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const ADMIN_EMAIL = 'azimjonxolmirzayev30@gmail.com';

/**
 * Reads the current user's plan from userPlans/{uid} (a node separate from
 * users/{uid} on purpose — that node's write rule lets each user write their
 * own data, so plan must live where only the admin can write it, otherwise
 * anyone could self-grant premium from the client).
 */
export function usePlan() {
  const { user } = useAuth();
  const [plan, setPlan] = useState('free');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setPlan('free');
      setLoading(false);
      return;
    }

    const planRef = ref(db, `userPlans/${user.uid}/plan`);
    const unsubscribe = onValue(planRef, (snapshot) => {
      setPlan(snapshot.val() === 'premium' ? 'premium' : 'free');
      setLoading(false);
    }, () => {
      setPlan('free');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;
  const isPremium = isAdmin || plan === 'premium';

  return { plan: isPremium ? 'premium' : 'free', isPremium, loading };
}
