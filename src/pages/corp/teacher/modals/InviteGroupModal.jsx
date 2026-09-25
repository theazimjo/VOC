import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Check, Copy, Share2, X } from 'lucide-react';
import TeacherModal from '../TeacherModal';
import { buildGroupInviteUrl } from '../../../../utils/pendingJoin';
import './InviteGroupModal.css';

// Invite sheet for a group: a QR code students scan in class, the same link
// to paste into a Telegram group, and the plain 6-digit PIN as a fallback.
// The link opens /join/:code (JoinGroupPage), which handles sign-up/login
// and the actual join.
export default function InviteGroupModal({ open, onClose, group }) {
  const [qrSrc, setQrSrc] = useState('');
  const [copied, setCopied] = useState('');

  const code = group?.code || '';
  const inviteUrl = code ? buildGroupInviteUrl(code) : '';
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  useEffect(() => {
    if (!open || !inviteUrl) return;
    let cancelled = false;
    QRCode.toDataURL(inviteUrl, { width: 480, margin: 1, errorCorrectionLevel: 'M' })
      .then((url) => { if (!cancelled) setQrSrc(url); })
      .catch((err) => console.error('QR generation failed:', err));
    return () => { cancelled = true; };
  }, [open, inviteUrl]);

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(''), 1800);
    } catch {
      /* clipboard blocked — the text is still visible to copy by hand */
    }
  };

  const share = async () => {
    try {
      await navigator.share({
        title: `${group?.name || 'Guruh'} — VOC`,
        text: `"${group?.name || 'Guruh'}" guruhiga qo'shiling:`,
        url: inviteUrl,
      });
    } catch {
      /* user dismissed the share sheet */
    }
  };

  return (
    <TeacherModal open={open && !!group} onClose={onClose} maxWidth="420px">
      <div className="invite-modal">
        <div className="invite-header">
          <div>
            <h3 className="invite-title">O'quvchilarni taklif qilish</h3>
            <p className="invite-subtitle">{group?.name}</p>
          </div>
          <button type="button" className="invite-close" onClick={onClose} aria-label="Yopish">
            <X size={18} />
          </button>
        </div>

        <div className="invite-qr">
          {qrSrc ? <img src={qrSrc} alt="Guruhga qo'shilish QR kodi" /> : <div className="invite-qr-placeholder" />}
        </div>
        <p className="invite-hint">O'quvchilar telefon kamerasi bilan skanerlaydi — ro'yxatdan o'tgach avtomatik guruhga qo'shiladi.</p>

        <div className="invite-row">
          <span className="invite-link" title={inviteUrl}>{inviteUrl.replace(/^https?:\/\//, '')}</span>
          <button type="button" className="invite-action" onClick={() => copy(inviteUrl, 'link')}>
            {copied === 'link' ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied === 'link' ? 'Nusxalandi' : 'Havola'}</span>
          </button>
        </div>

        {canShare && (
          <button type="button" className="invite-share" onClick={share}>
            <Share2 size={17} />
            <span>Telegram va boshqalarga yuborish</span>
          </button>
        )}

        <div className="invite-pin">
          <span className="invite-pin-label">yoki PIN kod</span>
          <button type="button" className="invite-pin-code" onClick={() => copy(code, 'code')}>
            {code}
            {copied === 'code' ? <Check size={16} /> : <Copy size={14} />}
          </button>
          <span className="invite-pin-help">Profil → Guruhga qo'shilish bo'limiga kiritiladi</span>
        </div>
      </div>
    </TeacherModal>
  );
}
