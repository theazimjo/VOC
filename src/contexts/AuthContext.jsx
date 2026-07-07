import { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  updateProfile
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
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
          }
        } catch (error) {
          console.error("Error fetching user profile from RTDB:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
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
    return cred;
  };


  const logout = async () => {
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
    loginWithGoogle,
    register,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
