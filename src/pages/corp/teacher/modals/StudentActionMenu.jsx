import { AnimatePresence, motion } from 'framer-motion';
import { Eye, UserMinus } from 'lucide-react';

export default function StudentActionMenu({ p }) {
  const { activeStudentMenu, groupStudentsList, handleRemoveStudent, setActiveStudentMenu, setViewingStudentDetail, studentMenuPos } = p;

  const st = activeStudentMenu
    ? groupStudentsList.find(s => (s.id || s.uid || s.email) === activeStudentMenu || `st_${groupStudentsList.indexOf(s)}` === activeStudentMenu)
    : null;

  return (
    /* Active Student Row Dropdown Menu (Top-Level to bypass card overflow clipping).
       Anchored to its trigger ("..." button) rather than scaling from center —
       popovers should read as growing out of what opened them. */
    <AnimatePresence>
      {st && (
        <>
          <motion.div
            style={{ position: 'fixed', inset: 0, zIndex: 99998, background: 'rgba(0,0,0,0.3)' }}
            onClick={() => setActiveStudentMenu(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }}
          />
          <motion.div
            className="teacher-action-dropdown"
            style={{
              position: 'fixed',
              top: `${studentMenuPos.top}px`,
              right: `${studentMenuPos.right}px`,
              zIndex: 99999,
              minWidth: '190px',
              transformOrigin: 'top right',
            }}
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4, transition: { duration: 0.12 } }}
            transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
          >
            <button
              type="button"
              className="dropdown-item"
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', border: 'none', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}
              onClick={() => {
                setActiveStudentMenu(null);
                setViewingStudentDetail(st);
              }}
            >
              <Eye size={16} color="var(--accent)" /> View Details
            </button>
            <button
              type="button"
              className="dropdown-item dropdown-item-danger"
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}
              onClick={() => {
                setActiveStudentMenu(null);
                handleRemoveStudent(st);
              }}
            >
              <UserMinus size={16} color="#ef4444" /> Remove from Group
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
