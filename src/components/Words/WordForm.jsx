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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMore, setShowMore] = useState(false);

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
      setShowMore(Boolean(editWord.definition || editWord.example || editWord.notes || editWord.customSentence));
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
      setShowMore(false);
    }
    setIsSubmitting(false);
  }, [editWord, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.word.trim() || !formData.translation.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSave(formData);
    } finally {
      setIsSubmitting(false);
    }
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
              <h2>{editWord ? "Edit Word" : "New Word"}</h2>
              <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="modal-body word-form-grid">
                <div className="input-group">
                  <label>English word *</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.word}
                    onChange={e => setFormData({...formData, word: e.target.value})}
                    placeholder="E.g.: Serendipity"
                    required
                    autoFocus
                    maxLength={300}
                  />
                </div>

                <div className="input-group">
                  <label>Uzbek translation *</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.translation}
                    onChange={e => setFormData({...formData, translation: e.target.value})}
                    placeholder="Tasodifiy baxt"
                    required
                    maxLength={300}
                  />
                </div>

                <div className="word-form-full" style={{ textAlign: 'center', marginTop: '4px', marginBottom: '4px' }}>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setShowMore(!showMore)}
                    style={{ fontSize: '0.82rem', color: 'var(--accent-1, #7c3aed)', fontWeight: '500' }}
                  >
                    {showMore ? "🔼 Fewer options" : "⚙️ More options (Definition, example, and part of speech)"}
                  </button>
                </div>

                {showMore && (
                  <>
                    <div className="input-group word-form-full">
                      <label>Part of speech</label>
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
                      <label>Definition (optional)</label>
                      <input
                        type="text"
                        className="input"
                        value={formData.definition}
                        onChange={e => setFormData({...formData, definition: e.target.value})}
                        placeholder="Definition in Uzbek"
                        maxLength={1000}
                      />
                    </div>

                    <div className="input-group word-form-full">
                      <label>Example sentence (optional)</label>
                      <textarea
                        className="textarea"
                        value={formData.example}
                        onChange={e => setFormData({...formData, example: e.target.value})}
                        placeholder="A sentence using this word"
                        style={{ minHeight: '60px' }}
                        maxLength={1500}
                      />
                    </div>

                    <div className="input-group word-form-full">
                      <label>Your own sentence (for active vocabulary)</label>
                      <textarea
                        className="textarea"
                        value={formData.customSentence}
                        onChange={e => setFormData({...formData, customSentence: e.target.value})}
                        placeholder="Write your own sentence to activate this word"
                        style={{ minHeight: '60px' }}
                        maxLength={1500}
                      />
                    </div>

                    <div className="input-group word-form-full">
                      <label>Additional notes (optional)</label>
                      <input
                        type="text"
                        className="input"
                        value={formData.notes}
                        onChange={e => setFormData({...formData, notes: e.target.value})}
                        placeholder="Synonyms, antonyms, etc."
                        maxLength={800}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isSubmitting}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
