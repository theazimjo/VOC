import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { resolveCorpIdentity } from '../../hooks/useCorpRole';
import { useSuccessTransition } from '../../contexts/SuccessTransitionContext';
import VocLogo from '../common/VocLogo';
import bgVideo from '../../assets/VOCABRY.mp4';
import './LoginPage.css';

// Warm every lazy chunk *in the destination's render chain* while the
// success transition plays — not just the leaf page. /corp/teacher, for
// instance, renders CorpLayout > CorpProtectedRoute > TeacherLayout >
// TeacherDashboard; each is its own lazyWithRetry() chunk, and leaving any
// of them un-prefetched still suspends React on navigate, showing the
// generic FullScreenLoader instead of a clean cut.
const ROUTE_PREFETCHERS = {
  '/': [() => import('../../pages/personal/Dashboard')],
  '/corp/admin': [
    () => import('../../components/corp/CorpLayout'),
    () => import('../../components/corp/CorpProtectedRoute'),
    () => import('../../components/corp/CorpAdminLayout'),
    () => import('../../pages/corp/center-admin/CenterAdminDashboard'),
  ],
  '/corp/teacher': [
    () => import('../../components/corp/CorpLayout'),
    () => import('../../components/corp/CorpProtectedRoute'),
    () => import('../../components/corp/TeacherLayout'),
    () => import('../../pages/corp/teacher/TeacherDashboard'),
  ],
};

// Resolves once every chunk for that path is loaded — the transition waits
// on this promise (alongside its own fixed duration) before navigating.
function prefetchRoute(path) {
  const importers = ROUTE_PREFETCHERS[path];
  if (!importers) return Promise.resolve();
  return Promise.all(importers.map((load) => load().catch(() => {})));
}

// Glass card "materializes" — scale, lift and blur resolve together, not a
// plain fade, so it reads as a physical surface arriving rather than a
// layer just appearing. Critically damped (bounce: 0): this is a settle,
// not a flick, so no overshoot.
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.94, filter: 'blur(16px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', bounce: 0, duration: 0.45 },
  },
  // Sign-in succeeded — the card dissolves away as the success transition
  // takes over the screen.
  exit: {
    opacity: 0,
    scale: 0.92,
    filter: 'blur(12px)',
    transition: { duration: 0.35, ease: 'easeIn' },
  },
};

// Cross-fade only — no motion, no blur — for prefers-reduced-motion.
const cardVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } },
};

// Cascading entrance for inputs
const inputVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, type: 'spring', bounce: 0, duration: 0.4 },
  }),
};

const inputVariantsReduced = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: 0.05 + i * 0.04, duration: 0.2, ease: 'easeOut' },
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
    'auth/invalid-email': 'Invalid email address.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with these details.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/popup-closed-by-user': 'Sign-in window was closed.',
  };
  return map[code] || 'Something went wrong. Please try again.';
}

export default function LoginPage() {
  const { user, loading, login, loginWithOverride, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const { start: startSuccessTransition } = useSuccessTransition();
  const bgVideoRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  // Firebase fires its auth-state listener (which updates `user` above)
  // as a side effect of login()/loginWithGoogle() — sometimes before our
  // own async handler even resumes. `transitioning` (React state) isn't
  // fast enough to guard against that: it doesn't take effect until the
  // next render, so the auto-redirect effect below could still fire and
  // navigate first, leaving our transition to play *on top of* the
  // already-loaded destination page. A ref updates synchronously, so
  // setting it before we even call login() closes that window entirely.
  const signingInRef = useRef(false);

  // Respect reduced-motion preference — don't autoplay the background video.
  useEffect(() => {
    const video = bgVideoRef.current;
    if (!video) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyPreference = () => {
      if (query.matches) video.pause();
      else video.play().catch(() => {});
    };
    applyPreference();
    query.addEventListener('change', applyPreference);
    return () => query.removeEventListener('change', applyPreference);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // Set the instant sign-in succeeds — drives this page's own visuals
  // (card exit, background warp). The full-screen burst/text/flash overlay
  // itself lives in SuccessTransitionProvider, above the router, so it
  // survives the navigate() call this triggers.
  const [transitioning, setTransitioning] = useState(false);

  // Inline "forgot password" mode — no separate route needed for a single email field.
  const [mode, setMode] = useState('login'); // 'login' | 'reset'
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const form = e.currentTarget;
    const currentEmail = resetEmail || form.querySelector('input[type="email"]')?.value || '';

    if (!currentEmail.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setSubmitting(true);
    try {
      await resetPassword(currentEmail.trim());
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
        // super_admin is deliberately excluded here — a super admin is
        // usually also a regular individual learner, and dropping them
        // straight into the admin panel on every login is jarring when
        // they just want their own dashboard. They reach it deliberately
        // via the "Admin panel" entry in Settings instead.
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
    // Skip whenever a sign-in attempt is in flight or a success transition
    // is already running — completeSignIn() owns navigation for this
    // sign-in and will call navigate itself once the animation finishes.
    // Without both guards, Firebase's auth-state update can fire this
    // effect and navigate away immediately (see signingInRef above),
    // leaving the transition to play over an already-loaded destination.
    if (!loading && user && !transitioning && !signingInRef.current) {
      getRedirectPath(user).then((targetPath) => {
        navigate(targetPath, { replace: true });
      });
    }
  }, [user, loading, navigate, mode, transitioning]);

  // Kicks off the success transition: warms the destination route's chunk
  // and hands the resulting promise, plus the actual navigate() call, off
  // to the shared overlay — it owns timing and navigation from here.
  const completeSignIn = (targetPath) => {
    if (prefersReducedMotion) {
      navigate(targetPath, { replace: true });
      return;
    }
    setTransitioning(true);
    const readyPromise = prefetchRoute(targetPath);
    startSuccessTransition(() => navigate(targetPath, { replace: true }), readyPromise);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const form = e.currentTarget;
    const currentEmail = email || form.querySelector('input[type="text"]')?.value || form.querySelector('input[autoComplete="username"]')?.value || '';
    const currentPassword = password || form.querySelector('input[type="password"]')?.value || '';

    if (!currentEmail.trim() || !currentPassword) {
      setError('Please fill in all fields.');
      return;
    }

    setSubmitting(true);
    signingInRef.current = true;
    try {
      const loginIdentifier = resolveLoginEmail(currentEmail);
      let targetUser = null;
      try {
        const res = await login(loginIdentifier, currentPassword);
        targetUser = res?.user || user;
      } catch (authErr) {
        // Fallback: check admin password override table in Realtime Database
        try {
          const res = await loginWithOverride(loginIdentifier, currentPassword);
          targetUser = res?.user;
        } catch (overrideErr) {
          throw authErr;
        }
      }
      const targetPath = await getRedirectPath(targetUser);
      completeSignIn(targetPath);
    } catch (err) {
      signingInRef.current = false;
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setSubmitting(true);
    signingInRef.current = true;
    try {
      const res = await loginWithGoogle();
      const targetUser = res?.user || user;
      const targetPath = await getRedirectPath(targetUser);
      completeSignIn(targetPath);
    } catch (err) {
      signingInRef.current = false;
      console.error("Google Sign-In Error details:", err);
      if (err.code !== 'auth/popup-closed-by-user') {
        const customMsg = getFirebaseErrorMessage(err.code);
        setError(`${customMsg} (${err.code || err.message || 'Error'})`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const activeCardVariants = prefersReducedMotion ? cardVariantsReduced : cardVariants;
  const activeInputVariants = prefersReducedMotion ? inputVariantsReduced : inputVariants;

  return (
    <div className="auth-page">
      {/* Background video — stays mounted through loading/loaded/redirect
          so there's no flash of plain background before it appears. On
          success it "warps" — enlarges and fades — under the transition. */}
      <div className="auth-bg">
        <video
          ref={bgVideoRef}
          className={`auth-bg-video ${transitioning ? 'auth-bg-video--warp' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          src={bgVideo}
        />
        <div className={`auth-bg-overlay ${transitioning ? 'auth-bg-overlay--warp' : ''}`} />
      </div>

      {loading ? (
        <div className="auth-loader">
          <span className="auth-spinner" style={{ width: 40, height: 40 }} />
        </div>
      ) : (
      <AnimatePresence>
      {!user && !transitioning && (
      <motion.div
        key="auth-card"
        className="auth-card"
        variants={activeCardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="auth-sheet-handle" aria-hidden="true" />

        {/* Brand */}
        <motion.div
          className="auth-brand"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <VocLogo size="lg" />
          <div className="auth-tagline" style={{ marginTop: '0.5rem' }}>Welcome back</div>
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
                ✅ If an account exists for this email, a password reset link has been sent. Check your inbox (including spam).
              </p>
              <button
                type="button"
                className="auth-submit"
                onClick={() => { setMode('login'); setResetSent(false); setResetEmail(''); }}
              >
                Back to sign in
              </button>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleResetSubmit} noValidate>
              <motion.div
                className="auth-input-group"
                variants={activeInputVariants}
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
                variants={activeInputVariants}
                initial="hidden"
                animate="visible"
                custom={1}
                whileTap={{ scale: 0.96 }}
              >
                {submitting ? <span className="auth-spinner" /> : 'Send reset link'}
              </motion.button>

              <button
                type="button"
                className="auth-forgot-link"
                onClick={() => { setMode('login'); setError(''); }}
              >
                ← Back to sign in
              </button>
            </form>
          )
        ) : (
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <motion.div
              className="auth-input-group"
              variants={activeInputVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <input
                type="text"
                className="auth-input"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                disabled={submitting}
              />
              <label className="auth-label">Email or phone number</label>
            </motion.div>

            <motion.div
              className="auth-input-group"
              variants={activeInputVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <input
                type="password"
                className="auth-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={submitting}
              />
              <label className="auth-label">Password</label>
            </motion.div>

            <button
              type="button"
              className="auth-forgot-link"
              onClick={() => { setMode('reset'); setError(''); setResetEmail(email); }}
            >
              Forgot password?
            </button>

            <motion.button
              type="submit"
              className="auth-submit"
              disabled={submitting}
              variants={activeInputVariants}
              initial="hidden"
              animate="visible"
              custom={2}
              whileTap={{ scale: 0.96 }}
            >
              {submitting ? <span className="auth-spinner" /> : 'Sign In'}
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
              <span>or</span>
            </motion.div>

            {/* Google */}
            <motion.button
              type="button"
              className="auth-google-btn"
              onClick={handleGoogle}
              disabled={submitting}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { delay: 0.3, duration: 0.2 }
                  : { delay: 0.5, type: 'spring', bounce: 0, duration: 0.4 }
              }
              whileTap={{ scale: 0.96 }}
            >
              <GoogleIcon />
              Continue with Google
            </motion.button>

            {/* Footer */}
            <motion.div
              className="auth-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Don&rsquo;t have an account?{' '}
              <Link to="/register">Sign up</Link>
            </motion.div>
          </>
        )}
      </motion.div>
      )}
      </AnimatePresence>
      )}
    </div>
  );
}