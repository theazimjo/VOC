import { AnimatePresence, motion } from 'framer-motion';
import './ConfirmSheet.css';

// iOS-style action-sheet confirm dialog — replaces window.confirm() with a
// themed, rounded card matching the rest of the corp module instead of the
// browser's native (unstyled, blocking) dialog.
export default function ConfirmSheet({
  open,
  title,
  message,
  confirmLabel = 'Tasdiqlash',
  cancelLabel = 'Bekor qilish',
  danger = false,
  busy = false,
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="confirm-sheet-overlay" onClick={onCancel}>
          <motion.div
            className="confirm-sheet-card"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="confirm-sheet-body">
              {title && <div className="confirm-sheet-title">{title}</div>}
              {message && <div className="confirm-sheet-message">{message}</div>}
            </div>
            <div className="confirm-sheet-actions">
              <button type="button" className="confirm-sheet-btn confirm-sheet-btn-cancel" onClick={onCancel} disabled={busy}>
                {cancelLabel}
              </button>
              <button
                type="button"
                className={`confirm-sheet-btn ${danger ? 'confirm-sheet-btn-danger' : 'confirm-sheet-btn-primary'}`}
                onClick={onConfirm}
                disabled={busy}
              >
                {busy ? '...' : confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
