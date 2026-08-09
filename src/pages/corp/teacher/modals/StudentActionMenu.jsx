import { Eye, UserMinus } from 'lucide-react';

export default function StudentActionMenu({ p }) {
  const { activeStudentMenu, groupStudentsList, handleRemoveStudent, setActiveStudentMenu, setViewingStudentDetail, studentMenuPos } = p;

  return (
      /* Active Student Row Dropdown Menu (Top-Level to bypass card overflow clipping) */
      activeStudentMenu && (() => {
        const st = groupStudentsList.find(s => (s.id || s.uid || s.email) === activeStudentMenu || `st_${groupStudentsList.indexOf(s)}` === activeStudentMenu);
        if (!st) return null;

        return (
          <>
            <div
              style={{ position: 'fixed', inset: 0, zIndex: 99998, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(2px)' }}
              onClick={() => setActiveStudentMenu(null)}
            />
            <div
              className="teacher-action-dropdown"
              style={{
                position: 'fixed',
                top: `${studentMenuPos.top}px`,
                right: `${studentMenuPos.right}px`,
                zIndex: 99999,
                minWidth: '190px',
              }}
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
                <Eye size={16} color="#3b82f6" /> View Details
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
            </div>
          </>
        );
      })()
  );
}
