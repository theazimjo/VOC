import { useEffect, useState } from 'react';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { sendCorpPasswordReset } from '../../../services/corpService';
import { Button, Field, Sheet } from '../super-admin/ui';
import { MIN_PASSWORD } from '../super-admin/SetPasswordSheet';

// Change your own password (center admin and teacher Settings).
// Firebase needs a recent sign-in, so we ask for the current password and
// re-authenticate first. Accounts created with Google have no password yet:
// for those we offer a "set a password" email instead.
export default function ChangePasswordSheet({ open, onClose, onDone }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const user = auth.currentUser;
  const hasPassword = Boolean(user?.providerData?.some((p) => p.providerId === 'password'));

  useEffect(() => {
    if (!open) return;
    setCurrent('');
    setNext('');
    setError('');
    setSent(false);
  }, [open]);

  const submit = async (e) => {
    e.preventDefault();
    if (next.length < MIN_PASSWORD) return;
    setSaving(true);
    setError('');
    try {
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, current));
      await updatePassword(user, next);
      onClose();
      onDone?.();
    } catch (err) {
      setError(err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential'
        ? 'The current password is wrong.'
        : err.message);
    } finally {
      setSaving(false);
    }
  };

  const sendSetupEmail = async () => {
    setSaving(true);
    setError('');
    try {
      await sendCorpPasswordReset(user.email);
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onClose={() => !saving && onClose()} title={hasPassword ? 'Change Password' : 'Set a Password'}>
      {hasPassword ? (
        <form onSubmit={submit}>
          <Field label="Current password">
            <input className="sa-input" type="password" autoComplete="current-password" required autoFocus value={current} onChange={(e) => setCurrent(e.target.value)} />
          </Field>
          <Field label="New password" hint={`At least ${MIN_PASSWORD} characters.`}>
            <input className="sa-input" type="password" autoComplete="new-password" required value={next} onChange={(e) => setNext(e.target.value)} />
          </Field>
          {error && <p className="sa-flow-error">{error}</p>}
          <Button type="submit" block disabled={saving || !current || next.length < MIN_PASSWORD}>{saving ? 'Saving...' : 'Change password'}</Button>
        </form>
      ) : (
        <div>
          <p className="sa-hint" style={{ marginBottom: 14 }}>
            You signed in with Google, so this account has no password yet. We can email {user?.email} a link to set one.
          </p>
          {sent && <p className="sa-hint" style={{ marginBottom: 14 }}>Email sent. Open the link in it to choose a password.</p>}
          {error && <p className="sa-flow-error">{error}</p>}
          <Button block onClick={sendSetupEmail} disabled={saving || sent}>{saving ? 'Sending...' : sent ? 'Email sent' : 'Email me a link'}</Button>
        </div>
      )}
    </Sheet>
  );
}
