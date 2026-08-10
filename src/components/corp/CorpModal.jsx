import { AnimatePresence, motion } from 'framer-motion';

// Shared animated modal wrapper for center-admin (mirrors teacher's
// TeacherModal.jsx — kept as a separate copy rather than a cross-import
// since the two modules' CSS scopes/tokens are independent). Every modal
// used to unmount instantly with no exit transition; this gives all of
// them the same real enter (scale up from 0.95, never from 0) and a
// snappier exit, asymmetric per the Sonner press-slow/release-fast
// principle.
export default function CorpModal({ open, onClose, children, className = '', maxWidth }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.14, ease: 'easeOut' } }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <motion.div
            className={`modal-content ${className}`}
            onClick={e => e.stopPropagation()}
            style={maxWidth ? { maxWidth } : undefined}
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4, transition: { duration: 0.14, ease: 'easeOut' } }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
