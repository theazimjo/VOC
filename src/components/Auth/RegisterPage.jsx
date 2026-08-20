import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import VocLogo from '../common/VocLogo';
import bgVideo from '../../assets/VOCABRY.mp4';
import './LoginPage.css'; // Glass material, background video, card chrome
import './RegisterPage.css'; // Password-strength indicator styles


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
};

// Cross-fade only — no motion, no blur — for prefers-reduced-motion.
const cardVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getPasswordStrength(password) {
  if (!password) return { level: 0, label: '' };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: 'Weak', cls: 'weak' };
  if (score <= 3) return { level: 2, label: 'Medium', cls: 'medium' };
  return { level: 3, label: 'Strong', cls: 'strong' };
}

function getFirebaseErrorMessage(code) {
  const map = {
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/popup-closed-by-user': 'Sign-in window was closed.',
  };
  return map[code] || 'Something went wrong. Please try again.';
}

export default function RegisterPage() {
  const { user, loading, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const bgVideoRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

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

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // Honeypot: invisible to real users, but simple bots that auto-fill every
  // input on a form will fill this in too — if it's non-empty, silently
  // treat the submission as a bot and skip creating an account.
  const [website, setWebsite] = useState('');

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  useEffect(() => {
    if (!loading && user) {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);

  const validate = () => {
    if (!displayName.trim()) {
      return 'Please enter your name.';
    }
    if (!email.trim()) {
      return 'Please enter your email address.';
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      return 'Invalid email address (e.g. name@domain.com).';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (website.trim()) {
      // Bot tripped the honeypot — fail generically without hitting Firebase
      // or hinting that this field was a trap.
      setError('Something went wrong. Please try again.');
      return;
    }

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      await register(email.trim(), password, displayName.trim());
      navigate('/', { replace: true });
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
      await loginWithGoogle();
      navigate('/', { replace: true });
    } catch (err) {
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
          so there's no flash of plain background before it appears. */}
      <div className="auth-bg">
        <video
          ref={bgVideoRef}
          className="auth-bg-video"
          autoPlay
          muted
          loop
          playsInline
          src={bgVideo}
        />
        <div className="auth-bg-overlay" />
      </div>

      {loading ? (
        <div className="auth-loader">
          <span className="auth-spinner" style={{ width: 40, height: 40 }} />
        </div>
      ) : user ? null : (
      <motion.div
        className="auth-card"
        variants={activeCardVariants}
        initial="hidden"
        animate="visible"
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
          <p className="auth-tagline" style={{ marginTop: '0.5rem' }}>Create a new account</p>
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
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Honeypot — real users never see or fill this in */}
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
          />

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
              placeholder="Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              autoComplete="name"
              disabled={submitting}
            />
            <label className="auth-label">Name</label>
          </motion.div>

          <motion.div
            className="auth-input-group"
            variants={activeInputVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <input
              type="email"
              className="auth-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={submitting}
            />
            <label className="auth-label">Email</label>
          </motion.div>

          <motion.div
            className="auth-input-group"
            variants={activeInputVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <input
              type="password"
              className="auth-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              disabled={submitting}
            />
            <label className="auth-label">Password</label>
          </motion.div>

          {/* Password strength */}
          {password.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
              style={{ padding: '0 4px' }}
            >
              <div className="auth-password-strength">
                {[1, 2, 3].map((bar) => (
                  <div
                    key={bar}
                    className={`auth-password-strength-bar ${
                      bar <= strength.level ? `active ${strength.cls}` : ''
                    }`}
                  />
                ))}
              </div>
              <p className={`auth-password-hint ${strength.cls}`}>
                {strength.label}
              </p>
            </motion.div>
          )}

          <motion.div
            className="auth-input-group"
            variants={activeInputVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <input
              type="password"
              className="auth-input"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              disabled={submitting}
            />
            <label className="auth-label">Confirm password</label>
          </motion.div>

          <motion.button
            type="submit"
            className="auth-submit"
            disabled={submitting}
            variants={activeInputVariants}
            initial="hidden"
            animate="visible"
            custom={4}
            whileTap={{ scale: 0.96 }}
          >
            {submitting ? <span className="auth-spinner" /> : 'Sign Up'}
          </motion.button>
        </form>

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
          transition={{ delay: 0.5 }}
        >
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </motion.div>
      </motion.div>
      )}
    </div>
  );
}