import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { partOfSpeechOptions } from '../../utils/helpers';
import './WordForm.css';

export default function WordForm({ isOpen, onClose, onSave, editWord = null }) {
  const [formData, setFormData] = useState({
    word: '',
    translation: '',
    definition: '',
    example: '',
    notes: '',
    partOfSpeech: 'noun',
    customSentence: ''
  });

  useEffect(() => {
    if (editWord) {
      setFormData({
        word: editWord.word || '',
        translation: editWord.translation || '',
        definition: editWord.definition || '',
        example: editWord.example || '',
        notes: editWord.notes || '',
        partOfSpeech: editWord.partOfSpeech || 'noun',
        customSentence: editWord.customSentence || ''
      });
    } else {
      setFormData({
        word: '',
        translation: '',
        definition: '',
        example: '',
        notes: '',
        partOfSpeech: 'noun',
        customSentence: ''
      });
    }
  }, [editWord, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.word.trim() || !formData.translation.trim()) return;
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div 
            className="modal"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <div className="modal-header">
              <h2>{editWord ? "So'zni tahrirlash" : "Yangi so'z"}</h2>
              <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="modal-body word-form-grid">
                <div className="input-group">
                  <label>Inglizcha so'z *</label>
                  <input 
                    type="text" 
                    className="input" 
                    value={formData.word} 
                    onChange={e => setFormData({...formData, word: e.target.value})} 
                    placeholder="Masalan: Serendipity"
                    required 
                    autoFocus
                  />
                </div>
                
                <div className="input-group">
                  <label>O'zbekcha tarjima *</label>
                  <input 
                    type="text" 
                    className="input" 
                    value={formData.translation} 
                    onChange={e => setFormData({...formData, translation: e.target.value})} 
                    placeholder="Tasodifiy baxt"
                    required 
                  />
                </div>

                <div className="input-group word-form-full">
                  <label>So'z turkumi</label>
                  <select 
                    className="select"
                    value={formData.partOfSpeech}
                    onChange={e => setFormData({...formData, partOfSpeech: e.target.value})}
                  >
                    {partOfSpeechOptions.map(pos => (
                      <option key={pos.value} value={pos.value}>{pos.label}</option>
                    ))}
                  </select>
                </div>

                <div className="input-group word-form-full">
                  <label>Ta'rifi (ixtiyoriy)</label>
                  <input 
                    type="text" 
                    className="input" 
                    value={formData.definition} 
                    onChange={e => setFormData({...formData, definition: e.target.value})} 
                    placeholder="Ingliz tilidagi ta'rifi"
                  />
                </div>

                <div className="input-group word-form-full">
                  <label>Misol gap (ixtiyoriy)</label>
                  <textarea 
                    className="textarea" 
                    value={formData.example} 
                    onChange={e => setFormData({...formData, example: e.target.value})} 
                    placeholder="Ushbu so'z qatnashgan gap"
                    style={{ minHeight: '60px' }}
                  />
                </div>

                <div className="input-group word-form-full">
                  <label>O'zingiz tuzgan gap (Faol so'zlik uchun)</label>
                  <textarea 
                    className="textarea" 
                    value={formData.customSentence} 
                    onChange={e => setFormData({...formData, customSentence: e.target.value})} 
                    placeholder="So'zni faollashtirish uchun mustaqil gap tuzib kiriting"
                    style={{ minHeight: '60px' }}
                  />
                </div>

                <div className="input-group word-form-full">
                  <label>Qo'shimcha izoh (ixtiyoriy)</label>
                  <input 
                    type="text" 
                    className="input" 
                    value={formData.notes} 
                    onChange={e => setFormData({...formData, notes: e.target.value})} 
                    placeholder="Sinonim, antonim va h.k."
                  />
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={onClose}>Bekor qilish</button>
                <button type="submit" className="btn btn-primary">Saqlash</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
