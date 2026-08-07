import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { createCustomPack, updateCustomPack } from '../../services/corpService';
import { speechLanguages } from '../../utils/helpers';
import './CustomPackEditor.css';

export default function CustomPackEditor({ centerId, editPack = null, onSaved, onCancel, ownerUid = null }) {
  const [title, setTitle] = useState(editPack?.title || '');
  const [description, setDescription] = useState(editPack?.description || '');
  const [language, setLanguage] = useState(editPack?.language || 'en-US');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setTitle(editPack?.title || '');
    setDescription(editPack?.description || '');
    setLanguage(editPack?.language || 'en-US');
  }, [editPack]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Iltimos, kurs nomini kiriting!');
      return;
    }

    setSubmitting(true);
    try {
      if (editPack && editPack.id) {
        await updateCustomPack(centerId, editPack.id, { title: title.trim(), description: description.trim(), language });
        if (onSaved) onSaved({ ...editPack, title: title.trim(), description: description.trim(), language });
      } else {
        const pack = await createCustomPack(centerId, { title: title.trim(), description: description.trim(), language }, ownerUid);
        if (onSaved) onSaved(pack);
      }
    } catch (err) {
      alert((editPack ? 'Kursni saqlashda' : 'Kurs yaratishda') + ' xatolik: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="new-course-modal">
      <div className="course-modal-header">
        <h2>{editPack ? 'Kursni Tahrirlash' : 'Yangi Kurs Yaratish'}</h2>
        {onCancel && (
          <button type="button" className="btn-modal-close" onClick={onCancel} title="Yopish">
            <X size={18} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="course-modal-body">
        <div className="modal-form-group">
          <label className="modal-label">KURS NOMI *</label>
          <input 
            type="text" 
            placeholder="Masalan: Beginner English" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required
            className="modal-input"
            autoFocus
          />
        </div>

        <div className="modal-form-group">
          <label className="modal-label">TAVSIF (IXTIYORIY)</label>
          <textarea
            placeholder="Kurs haqida qisqacha..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="modal-textarea"
          />
        </div>

        <div className="modal-form-group">
          <label className="modal-label">SO'ZLARNING TILI (TALAFFUZ UCHUN)</label>
          <select
            className="modal-input"
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            {speechLanguages.map(l => (
              <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
            ))}
          </select>
        </div>

        <div className="course-modal-footer">
          {onCancel && (
            <button type="button" className="btn-modal-cancel" onClick={onCancel}>
              Bekor qilish
            </button>
          )}
          <button type="submit" className="btn-modal-save" disabled={submitting}>
            <Save size={18} /> {submitting ? 'Saqlanmoqda...' : (editPack ? 'Saqlash' : 'Kursni Yaratish')}
          </button>
        </div>
      </form>
    </div>
  );
}
