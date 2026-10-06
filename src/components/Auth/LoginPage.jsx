import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { resolveCorpIdentity } from '../../hooks/useCorpRole';
import { getActiveProfile } from '../../utils/activeProfile';
import { getCorpRole } from '../../services/corpService';
import { getPendingJoinPath } from '../../utils/pendingJoin';
import { useSiteLanguage } from '../../utils/useSiteLanguage';
import { AuthShell, Field, GoogleIcon } from './AuthShell';
import { AUTH_CONTENT, firebaseMessage } from './authContent';

// Warm every lazy chunk *in the destination's render chain* while the
// success transition plays — not just the leaf page. /corp/teacher, for
// instance, renders CorpLayout > CorpProtectedRoute > TeacherLayout >
// TeacherGroups; each is its own lazyWithRetry() chunk, and leaving any
// of them un-prefetched still suspends React on navigate, showing the
// generic FullScreenLoader instead of a clean cut.
const ROUTE_PREFETCHERS = {
  '/': [() => import('../../pages/personal/Dashboard')],
  '/corp/admin': [
    () => import('../../components/corp/CorpLayout'),
    () => import('../../components/corp/CorpProtectedRoute'),
    () => import('../../components/corp/CorpAdminLayout'),
    () => import('../../pages/corp/center-admin/AdminHome'),
  ],
  '/corp/teacher': [
    () => import('../../components/corp/CorpLayout'),
    () => import('../../components/corp/CorpProtectedRoute'),
    () => import('../../components/corp/TeacherLayout'),
    () => import('../../pages/corp/teacher/TeacherGroups'),
  ],
};

// Resolves once every chunk for that path is loaded — the transition waits
// on this promise (alongside its own fixed duration) before navigating.
function prefetchRoute(path) {
  const importers = ROUTE_PREFETCHERS[path];
  if (!importers) return Promise.resolve();
  return Promise.all(importers.map((load) => load().catch(() => {})));
}

export default function LoginPage() {
  const { user, loading, login, loginWithOverride, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  // Firebase fires its auth-state listener (which updates `user` above)
  // as a side effect of login()/loginWithGoogle() — sometimes before our
  // own async handler even resumes. React state isn't fast enough to guard
  // against that (it only takes effect on the next render), so the
  // auto-redirect effect below could navigate first. A ref updates
  // synchronously, so setting it before we even call login() closes that
  // window entirely.
  const signingInRef = useRef(false);

  const { lang } = useSiteLanguage();
  const copy = AUTH_CONTENT[lang];
  const t = copy.login;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // Set the instant sign-in succeeds, while the destination's chunks load.
  const [redirecting, setRedirecting] = useState(false);

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
      setError(t.errors.enterEmail);
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
      setError(firebaseMessage(copy, err.code));
    } finally {
      setSubmitting(false);
    }
  };

  const getRedirectPath = async (u) => {
    if (!u) return '/';
    // Came here from a group invite link — finish joining first.
    const pendingJoinPath = getPendingJoinPath();
    if (pendingJoinPath) return pendingJoinPath;
    try {
      const identity = await resolveCorpIdentity(u);
      if (identity) {
        if (identity.role === 'super_admin') {
          // A super admin's email can also be a teacher at a center. Then let
          // them pick (personal / teacher) like any dual-profile account instead
          // of dropping them into the admin panel; otherwise go straight in.
          const own = await getCorpRole(u.uid).catch(() => null);
          if (own?.role === 'teacher') return getActiveProfile() ? '/' : '/choose-profile';
          return '/corp/super-admin';
        }
        if (identity.role === 'center_admin') return '/corp/admin';
        if (identity.role === 'teacher') {
          const activeProfile = getActiveProfile();
          if (!activeProfile) return '/choose-profile';
          return activeProfile === 'teacher' ? '/corp/teacher' : '/';
        }
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
    // Skip whenever a sign-in attempt is in flight — completeSignIn() owns
    // navigation for it (see signingInRef above).
    if (!loading && user && !redirecting && !signingInRef.current) {
      getRedirectPath(user).then((targetPath) => {
        navigate(targetPath, { replace: true });
      });
    }
  }, [user, loading, navigate, mode, redirecting]);

  // Warm the destination's chunks first so navigating doesn't flash the
  // generic loader, then go straight there (no celebratory animation).
  const completeSignIn = async (targetPath) => {
    setRedirecting(true);
    await prefetchRoute(targetPath);
    navigate(targetPath, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const form = e.currentTarget;
    const currentEmail = email || form.querySelector('input[type="text"]')?.value || form.querySelector('input[autocomplete="username"]')?.value || '';
    const currentPassword = password || form.querySelector('input[type="password"]')?.value || '';

    if (!currentEmail.trim() || !currentPassword) {
      setError(t.errors.fill);
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
      setError(firebaseMessage(copy, err.code));
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
        const customMsg = firebaseMessage(copy, err.code);
        setError(`${customMsg} (${err.code || err.message || 'Error'})`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const showForm = !loading && !user && !redirecting;

  return (
    <AuthShell copy={copy}>
      {loading || redirecting ? (
        <span className="as-spinner" style={{ borderColor: 'rgba(16,17,19,0.2)', borderTopColor: '#101113' }} aria-label="Loading" />
      ) : showForm ? (
        <>
          <h1>{mode === 'reset' ? t.reset.title : t.title}</h1>
          <p className="as-sub">{mode === 'reset' ? t.reset.sub : t.sub}</p>

          {error && (
            <div className="as-error" role="alert">
              <AlertCircle size={18} strokeWidth={2.2} aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'reset' ? (
            resetSent ? (
              <>
                <div className="as-notice" role="status">
                  <CheckCircle2 size={20} strokeWidth={2.2} aria-hidden="true" />
                  <p>{t.reset.sent}</p>
                </div>
                <div className="as-form">
                  <button
                    type="button"
                    className="as-submit"
                    onClick={() => { setMode('login'); setResetSent(false); setResetEmail(''); }}
                  >
                    {t.reset.back}
                  </button>
                </div>
              </>
            ) : (
              <form className="as-form" onSubmit={handleResetSubmit} noValidate>
                <Field
                  label={t.reset.email}
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  autoComplete="email"
                  disabled={submitting}
                  autoFocus
                />
                <button type="submit" className="as-submit" disabled={submitting}>
                  {submitting ? <span className="as-spinner" /> : t.reset.submit}
                </button>
                <button type="button" className="as-link" onClick={() => { setMode('login'); setError(''); }}>
                  {t.reset.back}
                </button>
              </form>
            )
          ) : (
            <form className="as-form" onSubmit={handleSubmit} noValidate>
              <Field
                label={t.identifier}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                disabled={submitting}
              />
              <Field
                label={t.password}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={submitting}
                showLabel={copy.show}
                hideLabel={copy.hide}
              />
              <button
                type="button"
                className="as-link"
                onClick={() => { setMode('reset'); setError(''); setResetEmail(email); }}
              >
                {t.forgot}
              </button>
              <button type="submit" className="as-submit" disabled={submitting}>
                {submitting ? <span className="as-spinner" /> : t.submit}
              </button>
            </form>
          )}

          {mode === 'login' && (
            <>
              <div className="as-divider"><span>{copy.or}</span></div>
              <button type="button" className="as-google" onClick={handleGoogle} disabled={submitting}>
                <GoogleIcon />
                {copy.google}
              </button>
              <p className="as-switch">
                {t.noAccount} <Link to="/register">{t.signUp}</Link>
              </p>
            </>
          )}
        </>
      ) : null}
    </AuthShell>
  );
}
