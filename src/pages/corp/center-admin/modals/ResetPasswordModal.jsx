import { useEffect, useState } from 'react';
import { KeyRound } from 'lucide-react';
import CorpModal from '../../../../components/corp/CorpModal';

export default function ResetPasswordModal({ p }) {
  const {
    handleUpdateTeacherPassword, newTeacherPassword, resetPasswordTeacher,
    setNewTeacherPassword, setResetPasswordTeacher, submittingPasswordReset,
  } = p;

  // Keep showing the last-targeted teacher while the modal exits —
  // resetPasswordTeacher goes null the instant closing starts, and the
  // body reads from it.
  const [lastTeacher, setLastTeacher] = useState(null);
  useEffect(() => {
    if (resetPasswordTeacher) setLastTeacher(resetPasswordTeacher);
  }, [resetPasswordTeacher]);
  const teacher = resetPasswordTeacher || lastTeacher;

  return (
    <CorpModal open={!!resetPasswordTeacher} onClose={() => setResetPasswordTeacher(null)}>
      {teacher && (
        <>
          <h2><KeyRound size={20} /> Parolni Yangilash</h2>
          <p style={{ color: 'var(--pg-text-secondary)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
            <strong>{teacher.name}</strong> ({teacher.phone || teacher.email}) o'qituvchisi uchun yangi parol kiriting:
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
        </>
      )}
    </CorpModal>
  );
}
