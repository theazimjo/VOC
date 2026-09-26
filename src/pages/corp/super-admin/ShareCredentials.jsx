import { useState } from 'react';
import { Check, Copy, Send } from 'lucide-react';
import { Button } from './ui';

// The ready-to-send login message shown after an account is created or its
// password is changed: Telegram share + copy, then "Tayyor".
export function credentialsMessage({ label, login, password }) {
  return [
    `${label ? `${label} — ` : ''}VOC uchun kirish ma'lumotlari:`,
    '',
    `Kirish: ${window.location.origin}/login`,
    `Login: ${login}`,
    `Parol: ${password}`,
  ].join('\n');
}

export default function ShareCredentials({ message, onDone }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

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
    <>
      <p className="sa-message">{message}</p>
      {error && <p className="sa-flow-error">{error}</p>}
      <div className="sa-actions-stack">
        <Button onClick={share}><Send size={18} /> Telegram orqali yuborish</Button>
        <Button variant="tinted" onClick={copy}>
          {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'Nusxalandi' : 'Nusxalash'}
        </Button>
        <Button variant="plain" onClick={onDone}>Tayyor</Button>
      </div>
    </>
  );
}
