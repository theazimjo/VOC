import { useState } from 'react';
import { Check, Copy, Send } from 'lucide-react';
import { Button } from './ui';
import { PUBLIC_SITE_URL } from '../../../utils/pendingJoin';

// The ready-to-send login message shown after an account is created or its
// password is changed: Telegram share + copy, then "Tayyor". `en` (center
// admin only — teacher/super admin stay Uzbek) switches the message text
// itself, since it's sent externally to the person it's for.
export function credentialsMessage({ label, login, password, en = false }) {
  if (en) {
    return [
      `${label ? `${label} — ` : ''}VOC login details:`,
      '',
      `Login: ${PUBLIC_SITE_URL}/login`,
      `Username: ${login}`,
      `Password: ${password}`,
    ].join('\n');
  }
  return [
    `${label ? `${label} — ` : ''}VOC uchun kirish ma'lumotlari:`,
    '',
    `Kirish: ${PUBLIC_SITE_URL}/login`,
    `Login: ${login}`,
    `Parol: ${password}`,
  ].join('\n');
}

export default function ShareCredentials({ message, onDone, en = false }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setError(en ? "Couldn't copy — select the text instead." : "Nusxalab bo'lmadi — matnni belgilab oling.");
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
    window.open(`https://t.me/share/url?url=${encodeURIComponent(`${PUBLIC_SITE_URL}/login`)}&text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  };

  return (
    <>
      <p className="sa-message">{message}</p>
      {error && <p className="sa-flow-error">{error}</p>}
      <div className="sa-actions-stack">
        <Button onClick={share}><Send size={18} /> {en ? 'Send via Telegram' : 'Telegram orqali yuborish'}</Button>
        <Button variant="tinted" onClick={copy}>
          {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? (en ? 'Copied' : 'Nusxalandi') : (en ? 'Copy' : 'Nusxalash')}
        </Button>
        <Button variant="plain" onClick={onDone}>{en ? 'Done' : 'Tayyor'}</Button>
      </div>
    </>
  );
}
