import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import './LoginPage.css';
import './RegisterPage.css';

const orbVariants = {
  animate: (i) => ({
    x: [0, 30 * Math.sin(i * 1.2), -20 * Math.cos(i), 0],
    y: [0, -25 * Math.cos(i * 0.8), 35 * Math.sin(i), 0],
    scale: [1, 1.08, 0.95, 1],
    transition: {
      duration: 12 + i * 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.25 + i * 0.08, duration: 0.4, ease: 'easeOut' },
  }),
};

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

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-spinner" style={{ width: 40, height: 40 }} />
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-logo">VOC</div>
          <p className="auth-tagline">Yangi akkaunt yaratish</p>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="auth-error"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
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
            variants={inputVariants}
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
            variants={inputVariants}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
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
            variants={inputVariants}
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
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={4}
            whileTap={{ scale: 0.98 }}
          >
            {submitting ? <span className="auth-spinner" /> : 'Ro\'yxatdan o\'tish'}
          </motion.button>
        </form>

        {/* Footer */}
        <motion.div
          className="auth-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Akkauntingiz bormi?{' '}
          <Link to="/login">Kirish</Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
