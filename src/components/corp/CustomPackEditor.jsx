import { useState } from 'react';
import { Plus, Trash2, Save, FileText, Sparkles } from 'lucide-react';
import { createCustomPack } from '../../services/corpService';
import './CustomPackEditor.css';

export default function CustomPackEditor({ centerId, onCreated, onCancel }) {
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('Elementary');
  const [description, setDescription] = useState('');
  const [words, setWords] = useState([
    { word: '', translation: '', definition: '', example: '' }
  ]);
  const [submitting, setSubmitting] = useState(false);

  const handleWordChange = (index, field, value) => {
    const updated = [...words];
    updated[index][field] = value;
    setWords(updated);
  };

  const addWordRow = () => {
    setWords(prev => [...prev, { word: '', translation: '', definition: '', example: '' }]);
  };

  const removeWordRow = (index) => {
    if (words.length <= 1) return;
    setWords(words.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Iltimos, pack nomini kiriting!');
      return;
    }
    const validWords = words.filter(w => w.word.trim() && w.translation.trim());
    if (validWords.length === 0) {
      alert('Kamida bitta so\'z va uning tarjimasini kiriting!');
      return;
    }

    setSubmitting(true);
    try {
      const pack = await createCustomPack(centerId, {
        title,
        level,
        description,
        words: validWords
      });
      if (onCreated) onCreated(pack);
    } catch (err) {
      alert('Pack yaratishda xatolik: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="custom-pack-editor">
      <div className="editor-header">
        <h2><Sparkles className="icon-sparkle" size={22} /> Yangi Markaz Packini Yaratish</h2>
        <p>O'quv markazingiz uchun xususiy so'z to'plamini kiriting.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group flex-2">
            <label>Pack Nomi *</label>
            <input 
              type="text" 
              placeholder="masalan: Unit 1 - Essential Verbs" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required
            />
          </div>

          <div className="form-group flex-1">
            <label>Bosqich / Daraja</label>
            <select value={level} onChange={e => setLevel(e.target.value)}>
              <option value="Beginner">Beginner (A1)</option>
              <option value="Elementary">Elementary (A2)</option>
              <option value="Intermediate">Intermediate (B1-B2)</option>
              <option value="Advanced">Advanced (C1-C2)</option>
              <option value="IELTS">IELTS Vocabulary</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Izoh / Tavsif</label>
          <textarea 
            placeholder="Ushbu pack qaysi mavzu yoki darslik uchun ekanligini yozing..." 
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={2}
          />
        </div>

        <div className="words-table-section">
          <div className="words-header">
            <h3>So'zlar Ro'yxati ({words.length} ta)</h3>
            <button type="button" className="btn-add-row" onClick={addWordRow}>
              <Plus size={16} /> So'z Qo'shish
            </button>
          </div>

          <div className="words-list">
            {words.map((w, idx) => (
              <div key={idx} className="word-row">
                <span className="row-num">{idx + 1}.</span>
                <input 
                  type="text" 
                  placeholder="Inglizcha so'z *" 
                  value={w.word}
                  onChange={e => handleWordChange(idx, 'word', e.target.value)}
                  className="word-input"
                />
                <input 
                  type="text" 
                  placeholder="O'zbekcha tarjimasi *" 
                  value={w.translation}
                  onChange={e => handleWordChange(idx, 'translation', e.target.value)}
                  className="trans-input"
                />
                <input 
                  type="text" 
                  placeholder="Tavsif (ixtiyoriy)" 
                  value={w.definition}
                  onChange={e => handleWordChange(idx, 'definition', e.target.value)}
                  className="def-input"
                />
                <button 
                  type="button" 
                  className="btn-remove-row" 
                  onClick={() => removeWordRow(idx)}
                  disabled={words.length <= 1}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="editor-actions">
          {onCancel && (
            <button type="button" className="btn-cancel" onClick={onCancel}>Bekor qilish</button>
          )}
          <button type="submit" className="btn-save-pack" disabled={submitting}>
            <Save size={18} /> {submitting ? 'Saqlanmoqda...' : "Pack'ni Saqlash"}
          </button>
        </div>
      </form>
    </div>
  );
}
