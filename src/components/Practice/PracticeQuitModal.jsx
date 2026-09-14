import { useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './PracticeQuitModal.css';

export default function PracticeQuitModal({ isOpen, onClose, onConfirm }) {
  const { t } = useLanguage();

  const safeT = (key, fallback) => {
    const val = t(key);
    if (!val || val === key || (typeof val === 'string' && val.startsWith('practice.'))) return fallback;
    return val;
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (onClose) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const titleText = safeT('practice.quitTitle', 'Kuting, ketmang!');
  const descText = safeT(
    'practice.quitMessage',
    safeT('practice.quitDesc', 'Hozir chiqib ketsangiz, erishgan natijangiz saqlanmaydi')
  );
  const cancelBtnText = safeT(
    'practice.keepLearning',
    safeT('practice.cancel', 'DAVOM ETISH')
  ).toUpperCase();
  const quitBtnText = safeT(
    'practice.endSession',
    safeT('practice.quit', 'SESSIYANI YAKUNLASH')
  ).toUpperCase();

  return (
    <div className="duo-modal-overlay" onClick={onClose}>
      <div className="duo-modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="duo-modal-title">{titleText}</h3>
        <p className="duo-modal-desc">{descText}</p>
        <div className="duo-modal-actions">
          <button
            type="button"
            className="duo-btn-modal-cancel"
            onClick={onClose}
          >
            {cancelBtnText}
          </button>
          <button
            type="button"
            className="duo-btn-modal-quit"
            onClick={onConfirm}
          >
            {quitBtnText}
          </button>
        </div>
      </div>
    </div>
  );
}
