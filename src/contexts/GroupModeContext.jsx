import { createContext, useContext, useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const EMPTY = { loading: false, appMode: 'individual', membership: null };

const GroupModeContext = createContext({ ...EMPTY, loading: true });

// Resolves once per login — mounted a single time near the app root so every
// consumer (Layout, StudentLayout, Navbar, CorpLayout, ProfilePage,
// CorpPortalHome) reads the same subscription instead of each restarting its
// own `users/{uid}/profile/appMode` + `groupMembership` Firebase reads (which
// used to show its own "loading" screen and could momentarily render the
// individual dashboard before the real mode arrived).
export function GroupModeProvider({ children }) {
  const { user } = useAuth();
  const [state, setState] = useState({ ...EMPTY, loading: true });

  useEffect(() => {
    if (!user) {
      setState(EMPTY);
      return;
    }

    setState(prev => ({ ...prev, loading: true }));

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

  return (
    <GroupModeContext.Provider value={state}>
      {children}
    </GroupModeContext.Provider>
  );
}

export function useGroupMode() {
  return useContext(GroupModeContext);
}
