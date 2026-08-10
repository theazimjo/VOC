import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '../firebase';

export const SUPER_ADMINS = ['azimjon29042006@gmail.com', 'azimjonxolmirzayev30@gmail.com'];

// Bridges the gap between LoginPage resolving the identity (to pick a
// redirect target) and CorpProtectedRoute resolving it again moments later
// via useCorpRole's own onAuthStateChanged listener — without this, every
// corp sign-in paid for the same corpUsers/centers lookup twice in a row,
// and the second one (after navigate()) had no prefetch covering it, so it
// showed FullScreenLoader after the destination had already mounted. Short
// TTL: this only needs to cover one login's transition window, not act as
// a long-lived cache.
const identityCache = new Map(); // uid -> { promise, expiresAt }
const CACHE_TTL_MS = 6000;

// Resolves a signed-in Firebase user to a corp identity: super_admin (email
// allowlist), center_admin/teacher (corpUsers/{uid} lookup, denied if their
// center has been suspended by the super admin), or null (not a corp user).
export async function resolveCorpIdentity(fbUser) {
  if (!fbUser) return null;

  if (fbUser.email && SUPER_ADMINS.includes(fbUser.email.toLowerCase())) {
    return { role: 'super_admin', email: fbUser.email, uid: fbUser.uid };
  }

  const cached = identityCache.get(fbUser.uid);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.promise;
  }

  const promise = fetchCorpIdentity(fbUser);
  identityCache.set(fbUser.uid, { promise, expiresAt: Date.now() + CACHE_TTL_MS });
  return promise;
}

async function fetchCorpIdentity(fbUser) {
  try {
    const snap = await get(ref(db, `corpUsers/${fbUser.uid}`));
    if (!snap.exists()) return null;

    const data = snap.val();
    if (data.disabled) return null;

    if (data.role === 'center_admin' || data.role === 'teacher') {
      const statusSnap = await get(ref(db, `centers/${data.centerId}/status`));
      if (statusSnap.exists() && statusSnap.val() === 'suspended') return null;
    }

    return { ...data, uid: fbUser.uid };
  } catch (err) {
    // Don't let a transient failure poison the cache for the rest of the TTL.
    identityCache.delete(fbUser.uid);
    throw err;
  }
}

export function useCorpRole() {
  const [state, setState] = useState({ loading: true, identity: null });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      try {
        const identity = await resolveCorpIdentity(fbUser);
        setState({ loading: false, identity });
      } catch {
        setState({ loading: false, identity: null });
      }
    });

    return unsubscribe;
  }, []);

  return state;
}
