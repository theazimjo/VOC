import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { createCustomPack, updateCustomPack } from '../../services/corpService';
import { createIndependentCustomPack, updateIndependentCustomPack } from '../../services/independentTeacherService';
import { speechLanguages } from '../../utils/helpers';
import './CustomPackEditor.css';

// `independentUid`, when set, routes saves to independentTeacherService
// (independentTeachers/{uid}/customPacks) instead of corpService
// (centers/{centerId}/customPacks) — everything else about this editor is
// identical for both, so it's a branch here rather than a second component.
export default function CustomPackEditor({ centerId, editPack = null, onSaved, onCancel, ownerUid = null, independentUid = null }) {
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
      alert('Please enter a pack name!');
      return;
    }

    setSubmitting(true);
    try {
      if (editPack && editPack.id) {
        if (independentUid) {
          await updateIndependentCustomPack(independentUid, editPack.id, { title: title.trim(), description: description.trim(), language });
        } else {
          await updateCustomPack(centerId, editPack.id, { title: title.trim(), description: description.trim(), language });
        }
        if (onSaved) onSaved({ ...editPack, title: title.trim(), description: description.trim(), language });
      } else {
        const pack = independentUid
          ? await createIndependentCustomPack(independentUid, { title: title.trim(), description: description.trim(), language })
          : await createCustomPack(centerId, { title: title.trim(), description: description.trim(), language }, ownerUid);
        if (onSaved) onSaved(pack);
      }
    } catch (err) {
      alert((editPack ? 'Error saving pack' : 'Error creating pack') + ': ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="new-course-modal">
      <div className="course-modal-header">
        <h2>{editPack ? 'Edit Pack' : 'Create New Pack'}</h2>
        {onCancel && (
          <button type="button" className="btn-modal-close" onClick={onCancel} title="Close">
            <X size={18} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="course-modal-body">
        <div className="modal-form-group">
          <label className="modal-label">PACK NAME *</label>
          <input 
            type="text" 
            placeholder="e.g. Beginner English" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required
            className="modal-input"
            autoFocus
          />
        </div>

        <div className="modal-form-group">
          <label className="modal-label">DESCRIPTION (OPTIONAL)</label>
          <textarea
            placeholder="Short description..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="modal-textarea"
          />
        </div>

        <div className="modal-form-group">
          <label className="modal-label">WORD LANGUAGE (FOR PRONUNCIATION)</label>
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
              Cancel
            </button>
          )}
          <button type="submit" className="btn-modal-save" disabled={submitting}>
            <Save size={18} /> {submitting ? 'Saving...' : (editPack ? 'Save Pack' : 'Create Pack')}
          </button>
        </div>
      </form>
    </div>
  );
}
