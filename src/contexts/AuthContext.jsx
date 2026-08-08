import { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword
} from 'firebase/auth';
import { ref, set, get, update, increment } from 'firebase/database';
import { auth, db, googleProvider } from '../firebase';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          // Create user profile in RTDB if it doesn't exist
          const profileRef = ref(db, `users/${firebaseUser.uid}/profile`);
          const snap = await get(profileRef);
          if (!snap.exists()) {
            await set(profileRef, {
              displayName: firebaseUser.displayName || '',
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL || '',
              createdAt: new Date().toISOString()
            });
          } else {
            // Update mutable fields (displayName may change)
            await update(profileRef, {
              displayName: firebaseUser.displayName || snap.val().displayName || '',
              photoURL: firebaseUser.photoURL || snap.val().photoURL || '',
            });
          }
          // Track activity: lastSeen + session count
          await update(ref(db, `users/${firebaseUser.uid}/activity`), {
            lastSeen: new Date().toISOString(),
            sessionCount: increment(1),
          });
        } catch (error) {
          console.error("Error fetching user profile from RTDB:", error);
        }
      } else {
        // Check for local admin password override session
        const savedOverride = localStorage.getItem('voc_override_user');
        if (savedOverride) {
          try {
            const parsed = JSON.parse(savedOverride);
            if (parsed && parsed.uid) {
              setUser(parsed);
            } else {
              setUser(null);
            }
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithOverride = async (loginIdentifier, password) => {
    const cleanKey = loginIdentifier.toLowerCase().trim().replace(/[.#$\[\]]/g, '_');
    const overrideSnap = await get(ref(db, `userPasswordOverrides/${cleanKey}`));
    if (!overrideSnap.exists()) {
      const err = new Error('Bunday foydalanuvchi topilmadi.');
      err.code = 'auth/invalid-credential';
      throw err;
    }

    const overrideData = overrideSnap.val();
    if (overrideData.password !== password) {
      const err = new Error('Parol noto\'g\'ri.');
      err.code = 'auth/wrong-password';
      throw err;
    }

    // Matching override password found!
    const userSnap = await get(ref(db, `users/${overrideData.uid}/profile`));
    const profileData = userSnap.exists() ? userSnap.val() : {};

    const customUser = {
      uid: overrideData.uid,
      email: overrideData.email || loginIdentifier,
      displayName: profileData.displayName || '',
      photoURL: profileData.photoURL || '',
      isOverride: true
    };

    localStorage.setItem('voc_override_user', JSON.stringify(customUser));
    setUser(customUser);

    // Track activity
    try {
      await update(ref(db, `users/${overrideData.uid}/activity`), {
        lastSeen: new Date().toISOString(),
        sessionCount: increment(1),
      });
    } catch (e) {
      console.warn("Error logging activity for override user:", e);
    }

    return { user: customUser };
  };

  const loginWithGoogle = async () => {
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (err) {
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user') {
        console.warn("Popup blocked or closed, falling back to redirect...");
        return signInWithRedirect(auth, googleProvider);
      }
      throw err;
    }
  };

  const register = async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    // Create user profile in RTDB
    await set(ref(db, `users/${cred.user.uid}/profile`), {
      displayName,
      email,
      photoURL: '',
      createdAt: new Date().toISOString()
    });
    // Best-effort: doesn't block registration or gate any feature yet, but
    // starts building a real verified-email signal for future anti-abuse use.
    sendEmailVerification(cred.user).catch((err) => {
      console.warn('Failed to send verification email:', err);
    });
    return cred;
  };

  // Deliberately swallows 'auth/user-not-found' so the caller can't use this
  // to check whether an email is registered (email enumeration protection) —
  // callers should always show the same generic "check your inbox" message.
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      if (err.code === 'auth/user-not-found') return;
      throw err;
    }
  };

  const changePassword = async (newPassword) => {
    if (!auth.currentUser) throw new Error("Foydalanuvchi tizimga kirmagan.");
    await updatePassword(auth.currentUser, newPassword);
  };

  const logout = async () => {
    localStorage.removeItem('voc_override_user');
    if ('clearAppBadge' in navigator) {
      navigator.clearAppBadge().catch(() => {});
    }
    return signOut(auth);
  };

  const updateUserProfile = async (data) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, data);
      setUser({ ...auth.currentUser });
    }
  };

  const value = {
    user,
    loading,
    login,
    loginWithOverride,
    loginWithGoogle,
    register,
    resetPassword,
    changePassword,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
