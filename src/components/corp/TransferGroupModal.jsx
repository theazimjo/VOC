import { useState, useEffect } from 'react';
import { UserCheck, ArrowRight } from 'lucide-react';
import { getCenterTeachers, transferGroup } from '../../services/corpService';

export default function TransferGroupModal({ centerId, currentTeacherId, group, onTransferred, onClose }) {
  const [teachers, setTeachers] = useState([]);
  const [targetTeacherId, setTargetTeacherId] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadTeachers() {
      try {
        const list = await getCenterTeachers(centerId);
        // Exclude current teacher
        const filtered = list.filter(t => t.id !== currentTeacherId);
        setTeachers(filtered);
        if (filtered.length > 0) setTargetTeacherId(filtered[0].id);
      } catch (err) {
        console.error('Error loading teachers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTeachers();
  }, [centerId, currentTeacherId]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!targetTeacherId) return;
    setSubmitting(true);
    try {
      await transferGroup(centerId, group.id, targetTeacherId);
      if (onTransferred) onTransferred(group.id, targetTeacherId);
    } catch (err) {
      alert('Guruhni o\'tkazishda xatolik: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2><UserCheck size={20} /> Guruhni Boshqa O'qituvchiga O'tkazish</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
          <strong>"{group.name}"</strong> guruhini boshqa o'qituvchiga o'tkazasiz. U guruh o'quvchilari va topshiriqlarini boshqarish huquqini oladi.
        </p>

        {loading ? (
          <div>O'qituvchilar ro'yxati yuklanmoqda...</div>
        ) : teachers.length === 0 ? (
          <div style={{ color: '#f87171', padding: '1rem 0' }}>
            O'quv markazida boshqa o'qituvchi topilmadi! Oldin Center Admin panelida yangi o'qituvchi qo'shing.
          </div>
        ) : (
          <form onSubmit={handleTransfer}>
            <div className="form-group">
              <label>Qaysi o'qituvchiga o'tkazilsin?</label>
              <select 
                value={targetTeacherId} 
                onChange={e => setTargetTeacherId(e.target.value)}
                style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name} ({t.subject})</option>
                ))}
              </select>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>Bekor qilish</button>
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'O\'tkazilmoqda...' : 'Guruhni O\'tkazish'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
