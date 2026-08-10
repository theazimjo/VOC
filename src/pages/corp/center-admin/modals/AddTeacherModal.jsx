import { UserPlus } from 'lucide-react';
import CorpModal from '../../../../components/corp/CorpModal';

export default function AddTeacherModal({ p }) {
  const { handleAddTeacher, setShowTeacherModal, setTeacherForm, showTeacherModal, submittingTeacher, teacherForm } = p;

  return (
      <CorpModal open={showTeacherModal} onClose={() => setShowTeacherModal(false)}>
            <h2><UserPlus size={20} /> Yangi O'qituvchi Qo'shish</h2>
            <form onSubmit={handleAddTeacher} autoComplete="off">
              <div className="form-group">
                <label>F.I.SH *</label>
                <input 
                  type="text" 
                  name="teacher_fullname"
                  autoComplete="off"
                  required 
                  placeholder="masalan: Abdulla Qodirov"
                  value={teacherForm.name}
                  onChange={e => setTeacherForm({ ...teacherForm, name: e.target.value })}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Telefon raqam *</label>
                <input 
                  type="tel" 
                  name="teacher_phone"
                  autoComplete="off"
                  required
                  placeholder="+998 90 123 45 67"
                  value={teacherForm.phone}
                  onChange={e => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Parol *</label>
                <input 
                  type="password" 
                  name="teacher_password"
                  autoComplete="new-password"
                  required
                  placeholder="O'qituvchining kirish paroli"
                  value={teacherForm.password}
                  onChange={e => setTeacherForm({ ...teacherForm, password: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowTeacherModal(false)}>Bekor qilish</button>
                <button type="submit" className="btn-primary" disabled={submittingTeacher}>
                  {submittingTeacher ? 'Saqlanmoqda...' : 'O\'qituvchini Qo\'shish'}
                </button>
              </div>
            </form>
      </CorpModal>
  );
}
