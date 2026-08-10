import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { partOfSpeechOptions, speechLanguages } from '../../utils/helpers';
import { lookupWordFromDictionary, toShortLangCode } from '../../utils/dictionaryService';
import './WordForm.css';

export default function WordForm({ isOpen, onClose, onSave, editWord = null, packLanguage = 'en-US' }) {
  const wordLangCode = toShortLangCode(packLanguage);
  const wordLangMeta = speechLanguages.find(l => l.code === packLanguage) || speechLanguages[0];

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
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState(null);

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
    setLookupError(null);
  }, [editWord, isOpen]);

  const handleDictionaryLookup = async () => {
    const wordQuery = formData.word.trim();
    const uzbekQuery = formData.translation.trim();
    if ((!wordQuery && !uzbekQuery) || isLookingUp) return;

    setIsLookingUp(true);
    setLookupError(null);

    try {
      const res = await lookupWordFromDictionary(
        wordQuery || uzbekQuery,
        wordQuery ? 'word2translation' : 'translation2word',
        wordLangCode
      );
      if (res) {
        setFormData(prev => ({
          ...prev,
          word: res.word || prev.word,
          translation: res.translation || prev.translation,
          partOfSpeech: res.partOfSpeech || prev.partOfSpeech,
          definition: res.definition || prev.definition,
          example: res.example || prev.example
        }));
        if (res.partOfSpeech || res.definition || res.example) setShowMore(true);
      } else {
        setLookupError("Bazadan tarjima topilmadi.");
      }
    } catch (err) {
      setLookupError(err.message || "Bazadan qidirishda xatolik yuz berdi");
    } finally {
      setIsLookingUp(false);
    }
  };

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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleDictionaryLookup}
                  disabled={isLookingUp || (!formData.word.trim() && !formData.translation.trim())}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    padding: '6px 10px', borderRadius: '8px', border: 'none',
                    background: 'rgba(124, 58, 237, 0.15)', color: 'var(--accent-1, #7c3aed)',
                    fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap'
                  }}
                >
                  {isLookingUp ? "⏳ Qidirilmoqda..." : "🔎 Lug'atdan qidirish"}
                </button>
                <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body word-form-grid">
                {lookupError && (
                  <div className="word-form-full" style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', fontSize: '0.8rem' }}>
                    ⚠️ {lookupError}
                  </div>
                )}

                <div className="input-group">
                  <label>{wordLangMeta.flag} {wordLangMeta.label}cha so'z *</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.word}
                    onChange={e => setFormData({...formData, word: e.target.value})}
                    placeholder={wordLangCode === 'en' ? "E.g.: Serendipity" : "So'zni kiriting"}
                    required
                    autoFocus
                    maxLength={300}
                  />
                </div>

                <div className="input-group">
                  <label>🇺🇿 O'zbekcha tarjima *</label>
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
