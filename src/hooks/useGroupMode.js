import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const EMPTY = { loading: false, appMode: 'individual', membership: null };

// Tracks whether the logged-in individual user has switched into "group
// mode" from their Profile page (see ProfilePage.jsx) — a real VOC account
// that has joined a corp learning-center group via PIN. Distinct from the
// corp staff identity in useCorpRole.js: this is about an individual
// learner's own account, not a center_admin/teacher login.
export function useGroupMode() {
  const { user } = useAuth();
  const [state, setState] = useState({ ...EMPTY, loading: true });

  useEffect(() => {
    if (!user) {
      setState(EMPTY);
      return;
    }

    let mode = 'individual';
    let membership = null;
    let modeLoaded = false;
    let memberLoaded = false;

    const publish = () => {
      if (modeLoaded && memberLoaded) {
        setState({ loading: false, appMode: membership ? mode : 'individual', membership });
      }
    };

    const unsubMode = onValue(ref(db, `users/${user.uid}/profile/appMode`), (snap) => {
      mode = snap.exists() ? snap.val() : 'individual';
      modeLoaded = true;
      publish();
    });

    const unsubMember = onValue(ref(db, `users/${user.uid}/groupMembership`), (snap) => {
      membership = snap.exists() ? snap.val() : null;
      memberLoaded = true;
      publish();
    });

    return () => {
      unsubMode();
      unsubMember();
    };
  }, [user]);

  return state;
}
