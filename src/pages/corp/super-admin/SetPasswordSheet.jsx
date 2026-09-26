import { useEffect, useState } from 'react';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { auth } from '../../../firebase';
import { Button, Field, Sheet } from './ui';
import ShareCredentials, { credentialsMessage } from './ShareCredentials';

export const MIN_PASSWORD = 8;
// No look-alikes (0/O, 1/l/I) — the password is usually read out or retyped.
const ALPHABET = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generatePassword(length = 10) {
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
}

// Password input with show/hide and "generate another" buttons.
export function PasswordInput({ value, onChange }) {
  const [visible, setVisible] = useState(true);
  return (
    <div className="sa-password-field">
      <input
        className="sa-input"
        type={visible ? 'text' : 'password'}
        autoComplete="new-password"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value.trim())}
        aria-label="Parol"
      />
      <button type="button" className="sa-password-btn" onClick={() => setVisible((v) => !v)} aria-label={visible ? 'Yashirish' : "Ko'rsatish"}>
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
      <button type="button" className="sa-password-btn" onClick={() => onChange(generatePassword())} aria-label="Yangi parol yaratish">
        <RefreshCw size={17} />
      </button>
    </div>
  );
}

// Sets a new login password for a center admin / teacher by hand
// (api/set-user-password.js does the actual Firebase Auth change). Used by
// the super admin and by a center admin for their own teachers.
// target: { uid, email, login?, label } — `login` is what the person types
// on the login screen (a phone number for teachers), defaults to email.
export default function SetPasswordSheet({ open, onClose, target, onDone }) {
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(null); // { login, password }

  useEffect(() => {
    if (!open) return;
    setPassword(generatePassword());
    setError('');
    setSaved(null);
  }, [open]);

  const login = target?.login || target?.email || '';

  const submit = async (e) => {
    e.preventDefault();
    if (password.length < MIN_PASSWORD) return;
    setSaving(true);
    setError('');
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const res = await fetch('/api/set-user-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, uid: target?.uid || undefined, email: target?.uid ? undefined : target?.email, password }),
      });
      let data = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON error page */
      }
      if (!res.ok) throw new Error(data.error || `Server xatosi (${res.status})`);
      setSaved({ login: target?.login || data.email || target?.email || '', password });
      onDone?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onClose={() => !saving && onClose()} title={saved ? 'Parol yangilandi' : "Parolni o'zgartirish"}>
      {saved ? (
        <ShareCredentials message={credentialsMessage({ label: target?.label, ...saved })} onDone={onClose} />
      ) : (
        <form onSubmit={submit}>
          <Field label="Login">
            <input className="sa-input" disabled value={login} />
          </Field>
          <Field label="Yangi parol" hint={`Kamida ${MIN_PASSWORD} ta belgi. Eski parol darhol ishlamay qoladi.`}>
            <PasswordInput value={password} onChange={setPassword} />
          </Field>
          {error && <p className="sa-flow-error">{error}</p>}
          <Button type="submit" block disabled={saving || password.length < MIN_PASSWORD}>
            {saving ? 'Saqlanmoqda...' : 'Parolni saqlash'}
          </Button>
        </form>
      )}
    </Sheet>
  );
}
