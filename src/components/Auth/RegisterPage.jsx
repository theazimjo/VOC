import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import './LoginPage.css'; // Glass material, background video, card chrome
import './RegisterPage.css'; // Parol indikatori uchun stillar

const BG_VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4';

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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getPasswordStrength(password) {
  if (!password) return { level: 0, label: '' };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: 'Kuchsiz', cls: 'weak' };
  if (score <= 3) return { level: 2, label: 'O\'rtacha', cls: 'medium' };
  return { level: 3, label: 'Kuchli', cls: 'strong' };
}

function getFirebaseErrorMessage(code) {
  const map = {
    'auth/email-already-in-use': 'Bu email allaqachon ro\'yxatdan o\'tgan.',
    'auth/invalid-email': 'Email manzil noto\'g\'ri.',
    'auth/weak-password': 'Parol juda oddiy. Kamida 6 belgi kiriting.',
    'auth/too-many-requests': 'Juda ko\'p urinish. Keyinroq qaytadan urinib ko\'ring.',
    'auth/network-request-failed': 'Internet bilan bog\'lanishda xatolik.',
  };
  return map[code] || 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.';
}

export default function RegisterPage() {
  const { user, loading, register } = useAuth();
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
      return 'Ismingizni kiriting.';
    }
    if (!email.trim()) {
      return 'Email manzilni kiriting.';
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      return "Email manzil noto'g'ri ko'rinishda (masalan: ism@domen.com).";
    }
    if (password.length < 6) {
      return 'Parol kamida 6 belgidan iborat bo\'lishi kerak.';
    }
    if (password !== confirmPassword) {
      return 'Parollar mos kelmadi.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (website.trim()) {
      // Bot tripped the honeypot — fail generically without hitting Firebase
      // or hinting that this field was a trap.
      setError('Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
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
          src={BG_VIDEO_SRC}
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
        {/* Brand */}
        <motion.div
          className="auth-brand"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="auth-logo">VOC</div>
          <p className="auth-tagline">Yangi akkaunt yaratish</p>
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
              placeholder="Ism"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              autoComplete="name"
              disabled={submitting}
            />
            <label className="auth-label">Ism</label>
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
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              disabled={submitting}
            />
            <label className="auth-label">Parol</label>
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
              placeholder="Parolni tasdiqlash"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              disabled={submitting}
            />
            <label className="auth-label">Parolni tasdiqlash</label>
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
            {submitting ? <span className="auth-spinner" /> : 'Ro\'yxatdan o\'tish'}
          </motion.button>
        </form>

        {/* Footer */}
        <motion.div
          className="auth-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Akkauntingiz bormi?{' '}
          <Link to="/login">Kirish</Link>
        </motion.div>
      </motion.div>
      )}
    </div>
  );
}