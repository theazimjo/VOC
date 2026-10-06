import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getPendingJoinPath } from '../../utils/pendingJoin';
import { useSiteLanguage } from '../../utils/useSiteLanguage';
import { AuthShell, Field, GoogleIcon } from './AuthShell';
import { AUTH_CONTENT, firebaseMessage } from './authContent';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getPasswordStrength(password) {
  if (!password) return { level: 0, key: null };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, key: 'weak' };
  if (score <= 3) return { level: 2, key: 'medium' };
  return { level: 3, key: 'strong' };
}

export default function RegisterPage() {
  const { user, loading, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { lang } = useSiteLanguage();
  const copy = AUTH_CONTENT[lang];
  const t = copy.register;

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
      navigate(getPendingJoinPath() || '/', { replace: true });
    }
  }, [user, loading, navigate]);

  const validate = () => {
    if (!displayName.trim()) return t.errors.name;
    if (!email.trim()) return t.errors.email;
    if (!EMAIL_PATTERN.test(email.trim())) return t.errors.emailBad;
    if (password.length < 6) return t.errors.short;
    if (password !== confirmPassword) return t.errors.mismatch;
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (website.trim()) {
      // Bot tripped the honeypot — fail generically without hitting Firebase
      // or hinting that this field was a trap.
      setError(firebaseMessage(copy, 'fallback'));
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
      navigate(getPendingJoinPath() || '/', { replace: true });
    } catch (err) {
      setError(firebaseMessage(copy, err.code));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setSubmitting(true);
    try {
      await loginWithGoogle();
      navigate(getPendingJoinPath() || '/', { replace: true });
    } catch (err) {
      console.error('Google Sign-In Error details:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        const customMsg = firebaseMessage(copy, err.code);
        setError(`${customMsg} (${err.code || err.message || 'Error'})`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell copy={copy}>
      {loading ? (
        <span className="as-spinner" style={{ borderColor: 'rgba(16,17,19,0.2)', borderTopColor: '#101113' }} aria-label="Loading" />
      ) : user ? null : (
        <>
          <h1>{t.title}</h1>
          <p className="as-sub">{t.sub}</p>

          {error && (
            <div className="as-error" role="alert">
              <AlertCircle size={18} strokeWidth={2.2} aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <form className="as-form" onSubmit={handleSubmit} noValidate>
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

            <Field label={t.name} type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} autoComplete="name" disabled={submitting} />
            <Field label={t.email} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" disabled={submitting} />
            <div>
              <Field
                label={t.password}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                disabled={submitting}
                showLabel={copy.show}
                hideLabel={copy.hide}
              />
              {password.length > 0 && (
                <>
                  <div className="as-strength" aria-hidden="true">
                    {[1, 2, 3].map((bar) => (
                      <span key={bar} className={bar <= strength.level ? strength.key : ''} />
                    ))}
                  </div>
                  <p className="as-strength-hint" role="status">{t.strength[strength.key]}</p>
                </>
              )}
            </div>
            <Field
              label={t.confirm}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              disabled={submitting}
              showLabel={copy.show}
              hideLabel={copy.hide}
            />

            <button type="submit" className="as-submit" disabled={submitting}>
              {submitting ? <span className="as-spinner" /> : t.submit}
            </button>
          </form>

          <div className="as-divider"><span>{copy.or}</span></div>
          <button type="button" className="as-google" onClick={handleGoogle} disabled={submitting}>
            <GoogleIcon />
            {copy.google}
          </button>
          <p className="as-switch">
            {t.haveAccount} <Link to="/login">{t.signIn}</Link>
          </p>
        </>
      )}
    </AuthShell>
  );
}
