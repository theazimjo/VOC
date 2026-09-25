import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '../firebase';
import { getActiveProfile } from '../utils/activeProfile';

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

// Call right after setActiveProfile() so the very next resolveCorpIdentity()
// (triggered by the navigate() that follows) doesn't serve a stale cached
// promise from before the switch — see clearCorpIdentityCache below.
export function clearCorpIdentityCache(uid) {
  if (uid) identityCache.delete(uid);
}

// Resolves a signed-in Firebase user to a corp identity: super_admin (email
// allowlist), center_admin/teacher (corpUsers/{uid} — see fetchCorpIdentity below), or null
// (not a corp user).
export async function resolveCorpIdentity(fbUser) {
  if (!fbUser) return null;

  if (fbUser.email && SUPER_ADMINS.includes(fbUser.email.toLowerCase())) {
    // A super admin's email can *also* hold a teacher role (self-service
    // "Become a Teacher" — being on the allowlist doesn't block that write).
    // Only surface the teacher
    // identity instead of super_admin when they've explicitly chosen
    // 'teacher' via the profile switcher, so every other super-admin-gated
    // check in the app is completely unaffected by default.
    if (getActiveProfile() === 'teacher') {
      const teacherIdentity = await fetchCorpIdentity(fbUser);
      if (teacherIdentity?.role === 'teacher') return teacherIdentity;
    }
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

// center_admin/teacher role from corpUsers/{uid}. A disabled record, a
// teacher record without a centerId, or a suspended center all resolve to
// null (no corp access).
async function fetchCorpIdentity(fbUser) {
  const uid = fbUser.uid;
  try {
    const corpSnap = await get(ref(db, `corpUsers/${uid}`));
    const roleData = corpSnap.exists() ? corpSnap.val() : null;
    if (!roleData || roleData.disabled || !roleData.centerId) return null;
    if (roleData.role !== 'center_admin' && roleData.role !== 'teacher') return null;

    const statusSnap = await get(ref(db, `centers/${roleData.centerId}/status`));
    if (statusSnap.exists() && statusSnap.val() === 'suspended') return null;

    return { ...roleData, uid };
  } catch (err) {
    // Don't let a transient failure poison the cache for the rest of the TTL.
    identityCache.delete(uid);
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
