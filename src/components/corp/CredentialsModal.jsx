import { useState } from 'react';
import { KeyRound, Copy, Check, TriangleAlert } from 'lucide-react';

// Shows a newly created corp account's login once. The temp password only
// exists in memory (never re-readable from the DB), so this is the only
// chance to hand it to the person it belongs to.
export default function CredentialsModal({ title, email, tempPassword, onClose }) {
  const [copied, setCopied] = useState(false);

  const copyAll = () => {
    navigator.clipboard.writeText(`Telefon/Email: ${email}\nParol: ${tempPassword}\nKirish: ${window.location.origin}/login`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="credentials-modal" onClick={e => e.stopPropagation()}>
        <div className="credentials-icon">
          <KeyRound size={28} />
        </div>
        <h2>{title}</h2>
        <p className="credentials-desc">
          O'qituvchiga kirish ma'lumotlarini taqdim eting.
        </p>

        <div className="credentials-box">
          <div><strong>Telefon / Email:</strong> {email}</div>
          <div><strong>Vaqtinchalik Parol:</strong> {tempPassword}</div>
          <div><strong>Kirish sahifasi:</strong> /login</div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={copyAll}>
            {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Nusxalandi' : 'Nusxalash'}
          </button>
          <button type="button" className="btn-primary" onClick={onClose}>Yopish</button>
        </div>
      </div>
    </div>
  );
}
