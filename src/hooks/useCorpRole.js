import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '../firebase';

export const SUPER_ADMINS = ['azimjon29042006@gmail.com', 'azimjonxolmirzayev30@gmail.com'];

// Resolves a signed-in Firebase user to a corp identity: super_admin (email
// allowlist), center_admin/teacher (corpUsers/{uid} lookup, denied if their
// center has been suspended by the super admin), or null (not a corp user).
export async function resolveCorpIdentity(fbUser) {
  if (!fbUser) return null;

  if (fbUser.email && SUPER_ADMINS.includes(fbUser.email.toLowerCase())) {
    return { role: 'super_admin', email: fbUser.email, uid: fbUser.uid };
  }

  const snap = await get(ref(db, `corpUsers/${fbUser.uid}`));
  if (!snap.exists()) return null;

  const data = snap.val();
  if (data.disabled) return null;

  if (data.role === 'center_admin' || data.role === 'teacher') {
    const statusSnap = await get(ref(db, `centers/${data.centerId}/status`));
    if (statusSnap.exists() && statusSnap.val() === 'suspended') return null;
  }

  return { ...data, uid: fbUser.uid };
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
