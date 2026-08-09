import { KeyRound } from 'lucide-react';

export default function ResetPasswordModal({ p }) {
  const {
    handleUpdateTeacherPassword, newTeacherPassword, resetPasswordTeacher,
    setNewTeacherPassword, setResetPasswordTeacher, submittingPasswordReset,
  } = p;

  return (
      resetPasswordTeacher && (
        <div className="modal-overlay" onClick={() => setResetPasswordTeacher(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2><KeyRound size={20} /> Parolni Yangilash</h2>
            <p style={{ color: 'var(--pg-text-secondary)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              <strong>{resetPasswordTeacher.name}</strong> ({resetPasswordTeacher.phone || resetPasswordTeacher.email}) o'qituvchisi uchun yangi parol kiriting:
            </p>

            <form onSubmit={handleUpdateTeacherPassword} autoComplete="off">
              <div className="form-group">
                <label>Yangi Parol *</label>
                <input 
                  type="text" 
                  name="new_teacher_pwd"
                  autoComplete="off"
                  required
                  placeholder="Kamida 6 ta belgi kiriting..."
                  value={newTeacherPassword}
                  onChange={e => setNewTeacherPassword(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setResetPasswordTeacher(null)}>Bekor qilish</button>
                <button type="submit" className="btn-primary" disabled={submittingPasswordReset}>
                  {submittingPasswordReset ? 'Saqlanmoqda...' : 'Parolni Saqlash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )
  );
}
