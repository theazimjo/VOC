import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { resolveCorpIdentity } from '../../hooks/useCorpRole';
import './LoginPage.css';

// Subtle, smooth ambient animations for the orbs
const orbVariants = {
  animate: (i) => ({
    x: [0, 20 * Math.sin(i * 1.2), -15 * Math.cos(i), 0],
    y: [0, -20 * Math.cos(i * 0.8), 25 * Math.sin(i), 0],
    scale: [1, 1.05, 0.98, 1],
    transition: {
      duration: 15 + i * 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
};

// iOS style spring entrance for the card
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      type: "spring", 
      damping: 25, 
      stiffness: 300 
    },
  },
};

// Cascading entrance for inputs
const inputVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: 0.1 + i * 0.08, 
      type: "spring", 
      damping: 20, 
      stiffness: 300 
    },
  }),
};

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

function getFirebaseErrorMessage(code) {
  const map = {
    'auth/invalid-email': 'Email manzil noto\'g\'ri.',
    'auth/user-disabled': 'Bu foydalanuvchi bloklangan.',
    'auth/user-not-found': 'Bunday foydalanuvchi topilmadi.',
    'auth/wrong-password': 'Parol noto\'g\'ri.',
    'auth/invalid-credential': 'Email yoki parol noto\'g\'ri.',
    'auth/too-many-requests': 'Juda ko\'p urinish. Keyinroq qaytadan urinib ko\'ring.',
    'auth/network-request-failed': 'Internet bilan bog\'lanishda xatolik.',
    'auth/popup-closed-by-user': 'Kirish oynasi yopildi.',
  };
  return map[code] || 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.';
}

export default function LoginPage() {
  const { user, loading, login, loginWithOverride, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Inline "forgot password" mode — no separate route needed for a single email field.
  const [mode, setMode] = useState('login'); // 'login' | 'reset'
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!resetEmail.trim()) {
      setError('Iltimos, email manzilingizni kiriting.');
      return;
    }

    setSubmitting(true);
    try {
      await resetPassword(resetEmail.trim());
      // Always show the same success state, whether or not the email is
      // actually registered — revealing that would let an attacker probe
      // for valid accounts.
      setResetSent(true);
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setSubmitting(false);
    }
  };

  const getRedirectPath = async (u) => {
    if (!u) return '/';
    try {
      const identity = await resolveCorpIdentity(u);
      if (identity) {
        if (identity.role === 'super_admin') return '/corp/super-admin';
        if (identity.role === 'center_admin') return '/corp/admin';
        if (identity.role === 'teacher') return '/corp/teacher';
      }
    } catch (err) {
      console.error('Error resolving corp identity on login:', err);
    }
    return '/';
  };

  const resolveLoginEmail = (input) => {
    const trimmed = input.trim();
    if (trimmed.includes('@')) return trimmed;
    const clean = trimmed.replace(/\D/g, '');
    if (clean) return `teacher_${clean}@markaz.uz`;
    return trimmed;
  };

  useEffect(() => {
    if (!loading && user) {
      getRedirectPath(user).then((targetPath) => {
        navigate(targetPath, { replace: true });
      });
    }
  }, [user, loading, navigate, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Iltimos, barcha maydonlarni to\'ldiring.');
      return;
    }

    setSubmitting(true);
    try {
      const loginIdentifier = resolveLoginEmail(email);
      let targetUser = null;
      try {
        const res = await login(loginIdentifier, password);
        targetUser = res?.user || user;
      } catch (authErr) {
        // Fallback: check admin password override table in Realtime Database
        try {
          const res = await loginWithOverride(loginIdentifier, password);
          targetUser = res?.user;
        } catch (overrideErr) {
          throw authErr;
        }
      }
      const targetPath = await getRedirectPath(targetUser);
      navigate(targetPath, { replace: true });
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setSubmitting(true);
    try {
      const res = await loginWithGoogle();
      const targetUser = res?.user || user;
      const targetPath = await getRedirectPath(targetUser);
      navigate(targetPath, { replace: true });
    } catch (err) {
      console.error("Google Sign-In Error details:", err);
      if (err.code !== 'auth/popup-closed-by-user') {
        const customMsg = getFirebaseErrorMessage(err.code);
        setError(`${customMsg} (${err.code || err.message || 'Xatolik'})`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-spinner" style={{ borderColor: 'rgba(0,0,0,0.1)', borderTopColor: '#007aff', width: 40, height: 40 }} />
      </div>
    );
  }

  if (user) return null;

  return (
    <div className="auth-page">
      {/* Animated background */}
      <div className="auth-bg">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={`auth-orb auth-orb--${i}`}
            variants={orbVariants}
            animate="animate"
            custom={i}
          />
        ))}
      </div>

      {/* Card */}
      <motion.div
        className="auth-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Brand */}
        <motion.div
          className="auth-brand"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="auth-logo">VOC</div>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="auth-error"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        {mode === 'reset' ? (
          resetSent ? (
            <div className="auth-form">
              <p style={{ textAlign: 'center', lineHeight: 1.5 }}>
                ✅ Agar bu email ro'yxatdan o'tgan bo'lsa, unga parolni tiklash havolasi yuborildi. Pochta qutingizni (shu jumladan spam papkasini) tekshiring.
              </p>
              <button
                type="button"
                className="auth-submit"
                onClick={() => { setMode('login'); setResetSent(false); setResetEmail(''); }}
              >
                Kirishga qaytish
              </button>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleResetSubmit} noValidate>
              <motion.div
                className="auth-input-group"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <input
                  type="email"
                  className="auth-input"
                  placeholder="Email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  autoComplete="email"
                  disabled={submitting}
                  autoFocus
                />
                <label className="auth-label">Email</label>
              </motion.div>

              <motion.button
                type="submit"
                className="auth-submit"
                disabled={submitting}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                custom={1}
                whileTap={{ scale: 0.96 }}
              >
                {submitting ? <span className="auth-spinner" /> : 'Tiklash havolasini yuborish'}
              </motion.button>

              <button
                type="button"
                className="auth-forgot-link"
                onClick={() => { setMode('login'); setError(''); }}
              >
                ← Kirishga qaytish
              </button>
            </form>
          )
        ) : (
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <motion.div
              className="auth-input-group"
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <input
                type="text"
                className="auth-input"
                placeholder="Email yoki Telefon raqam"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                disabled={submitting}
              />
              <label className="auth-label">Email yoki Telefon raqam</label>
            </motion.div>

            <motion.div
              className="auth-input-group"
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <input
                type="password"
                className="auth-input"
                placeholder="Parol"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={submitting}
              />
              <label className="auth-label">Parol</label>
            </motion.div>

            <button
              type="button"
              className="auth-forgot-link"
              onClick={() => { setMode('reset'); setError(''); setResetEmail(email); }}
            >
              Parolni unutdingizmi?
            </button>

            <motion.button
              type="submit"
              className="auth-submit"
              disabled={submitting}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={2}
              whileTap={{ scale: 0.96 }}
            >
              {submitting ? <span className="auth-spinner" /> : 'Kirish'}
            </motion.button>
          </form>
        )}

        {mode === 'login' && (
          <>
            {/* Divider */}
            <motion.div
              className="auth-divider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span>yoki</span>
            </motion.div>

            {/* Google */}
            <motion.button
              type="button"
              className="auth-google-btn"
              onClick={handleGoogle}
              disabled={submitting}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", damping: 20 }}
              whileTap={{ scale: 0.96 }}
            >
              <GoogleIcon />
              Google orqali kirish
            </motion.button>

            {/* Footer */}
            <motion.div
              className="auth-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Akkauntingiz yo'qmi?{' '}
              <Link to="/register">Ro'yxatdan o'tish</Link>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}