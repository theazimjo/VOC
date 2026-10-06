import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { AuthShell, Field, GoogleIcon } from '../../components/Auth/AuthShell';
import { AUTH_CONTENT } from '../../components/Auth/authContent';
import { useAuth } from '../../contexts/AuthContext';
import { googleProvider } from '../../firebase';
import { createOwnCenter, getCorpRole } from '../../services/corpService';
import { SUPER_ADMINS, clearCorpIdentityCache } from '../../hooks/useCorpRole';

// Self-serve center signup: confirm a Gmail (Google sign-in), name the center,
// and land in the center admin panel. No approval step.
export default function StartCenterPage() {
  const copy = AUTH_CONTENT.en;
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();

  const [existingRole, setExistingRole] = useState(null); // null = unknown yet
  const [roleChecked, setRoleChecked] = useState(false);
  const [centerName, setCenterName] = useState('');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!user) { setRoleChecked(false); setExistingRole(null); return; }
    if (SUPER_ADMINS.includes((user.email || '').toLowerCase())) { setExistingRole('super_admin'); setRoleChecked(true); return; }
    let cancelled = false;
    getCorpRole(user.uid)
      .then((r) => { if (!cancelled) setExistingRole(r?.role || null); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setRoleChecked(true); });
    return () => { cancelled = true; };
  }, [user]);

  // Always show Google's account chooser here, so a wrong Gmail can be swapped.
  const handleGoogle = async () => {
    setError('');
    setBusy(true);
    try {
      googleProvider.setCustomParameters({ prompt: 'select_account' });
      await loginWithGoogle();
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') setError('Google sign-in failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    if (centerName.trim().length < 2) {
      setError('Please enter the name of your center.');
      return;
    }
    setBusy(true);
    setCreating(true);
    try {
      await createOwnCenter(user, { centerName, phone });
      clearCorpIdentityCache(user.uid);
      navigate('/corp/admin', { replace: true });
    } catch (err) {
      console.error('Create center failed:', err);
      setError("Couldn't create the center. Please try again in a moment.");
      setBusy(false);
      setCreating(false);
    }
  };

  const chooseAnother = async () => {
    setError('');
    setBusy(true);
    try {
      await logout();
      setCenterName('');
      setPhone('');
    } finally {
      setBusy(false);
    }
  };

  const goToPanel = () => {
    const path = existingRole === 'super_admin' ? '/corp/super-admin' : existingRole === 'teacher' ? '/corp/teacher' : '/corp/admin';
    navigate(path);
  };

  const dark = { borderColor: 'rgba(16,17,19,0.2)', borderTopColor: '#101113' };
  const status = (title, text) => (
    <div role="status" aria-live="polite" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', padding: '36px 0' }}>
      <span className="as-spinner" style={{ ...dark, width: 34, height: 34, borderWidth: 3 }} />
      <strong style={{ fontSize: '1.125rem' }}>{title}</strong>
      <span className="as-sub" style={{ margin: 0 }}>{text}</span>
    </div>
  );

  let body;
  if (creating) {
    body = status('Creating your center…', 'This takes a few seconds. Please do not close this page.');
  } else if (loading || (user && !roleChecked)) {
    body = status('Checking your account…', user?.email ? `Signed in as ${user.email}` : 'One moment.');
  } else if (!user) {
    body = (
      <>
        <h1>Create your center</h1>
        <p className="as-sub">Confirm your Gmail and you are in. You will name your center on the next step.</p>
        {error && <div className="as-error" role="alert"><AlertCircle size={18} strokeWidth={2.2} aria-hidden="true" /><span>{error}</span></div>}
        <button type="button" className="as-google" onClick={handleGoogle} disabled={busy}>
          <GoogleIcon />
          {copy.google}
        </button>
        <p className="as-switch">Already have a center? <Link to="/login">Log in</Link></p>
      </>
    );
  } else if (existingRole) {
    body = (
      <>
        <h1>You already have access</h1>
        <p className="as-sub">This account ({user.email}) is already set up on VOCABRY.</p>
        <button type="button" className="as-submit" onClick={goToPanel}>Open my panel</button>
        <button type="button" className="as-switch" onClick={chooseAnother} disabled={busy} style={{ display: 'block', margin: '14px auto 0', background: 'none', border: 0, cursor: 'pointer', textDecoration: 'underline' }}>
          Choose another account
        </button>
      </>
    );
  } else if (!user.emailVerified) {
    body = (
      <>
        <h1>Confirm your email</h1>
        <p className="as-sub">
          {user.email} is not verified yet. Sign in with Google (Gmail) to create a center, or use another account.
        </p>
        <button type="button" className="as-google" onClick={handleGoogle} disabled={busy}>
          <GoogleIcon />
          {copy.google}
        </button>
      </>
    );
  } else {
    body = (
      <>
        <h1>Name your center</h1>
        <p className="as-sub">You are signing in as {user.email}. You will be the admin of this center.</p>
        {error && <div className="as-error" role="alert"><AlertCircle size={18} strokeWidth={2.2} aria-hidden="true" /><span>{error}</span></div>}
        <form className="as-form" onSubmit={handleCreate} noValidate>
          <Field label="Center name" value={centerName} onChange={(e) => setCenterName(e.target.value)} autoComplete="organization" disabled={busy} maxLength={120} autoFocus />
          <Field label="Phone or Telegram (optional)" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" disabled={busy} maxLength={40} />
          <button type="submit" className="as-submit" disabled={busy}>
            {busy ? <span className="as-spinner" /> : 'Create center'}
          </button>
        </form>
        <button type="button" className="as-switch" onClick={chooseAnother} disabled={busy} style={{ display: 'block', margin: '14px auto 0', background: 'none', border: 0, cursor: 'pointer', textDecoration: 'underline' }}>
          Choose another account
        </button>
      </>
    );
  }

  return <AuthShell copy={copy}>{body}</AuthShell>;
}
