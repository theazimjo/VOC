import { useEffect, useState } from 'react';
import { Check, Copy, Eye, EyeOff, RefreshCw, Send } from 'lucide-react';
import { auth } from '../../../firebase';
import { Button, Field, Sheet } from './ui';

const MIN_LENGTH = 8;
// No look-alikes (0/O, 1/l/I) — the password is usually read out or retyped.
const ALPHABET = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generatePassword(length = 10) {
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
}

// Super admin sets a new login password for a center admin / teacher by
// hand (api/set-user-password.js does the actual Firebase Auth change).
export default function SetPasswordSheet({ open, onClose, target, onDone }) {
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(null); // { email, password }
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    setPassword(generatePassword());
    setVisible(true);
    setError('');
    setSaved(null);
    setCopied(false);
  }, [open]);

  const submit = async (e) => {
    e.preventDefault();
    if (password.length < MIN_LENGTH) return;
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
      setSaved({ email: data.email || target?.email || '', password });
      onDone?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const message = saved
    ? [
      `${target?.label ? `${target.label} — ` : ''}VOC uchun yangi kirish ma'lumotlari:`,
      '',
      `Kirish: ${window.location.origin}/login`,
      `Login: ${saved.email}`,
      `Parol: ${saved.password}`,
    ].join('\n')
    : '';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setError("Nusxalab bo'lmadi — matnni belgilab oling.");
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: message });
        return;
      } catch {
        /* dismissed — fall through to Telegram */
      }
    }
    window.open(`https://t.me/share/url?url=${encodeURIComponent(`${window.location.origin}/login`)}&text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  };

  return (
    <Sheet open={open} onClose={() => !saving && onClose()} title={saved ? 'Parol yangilandi' : "Parolni o'zgartirish"}>
      {saved ? (
        <>
          <p className="sa-message">{message}</p>
          {error && <p className="sa-flow-error">{error}</p>}
          <div className="sa-actions-stack">
            <Button onClick={share}><Send size={18} /> Telegram orqali yuborish</Button>
            <Button variant="tinted" onClick={copy}>
              {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'Nusxalandi' : 'Nusxalash'}
            </Button>
            <Button variant="plain" onClick={onClose}>Tayyor</Button>
          </div>
        </>
      ) : (
        <form onSubmit={submit}>
          <Field label="Login">
            <input className="sa-input" disabled value={target?.email || ''} />
          </Field>
          <Field label="Yangi parol" hint={`Kamida ${MIN_LENGTH} ta belgi. Eski parol darhol ishlamay qoladi.`}>
            <div className="sa-password-field">
              <input
                className="sa-input"
                type={visible ? 'text' : 'password'}
                autoComplete="new-password"
                spellCheck={false}
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
                aria-label="Yangi parol"
              />
              <button type="button" className="sa-password-btn" onClick={() => setVisible((v) => !v)} aria-label={visible ? 'Yashirish' : "Ko'rsatish"}>
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <button type="button" className="sa-password-btn" onClick={() => setPassword(generatePassword())} aria-label="Yangi parol yaratish">
                <RefreshCw size={17} />
              </button>
            </div>
          </Field>
          {error && <p className="sa-flow-error">{error}</p>}
          <Button type="submit" block disabled={saving || password.length < MIN_LENGTH}>
            {saving ? 'Saqlanmoqda...' : 'Parolni saqlash'}
          </Button>
        </form>
      )}
    </Sheet>
  );
}
