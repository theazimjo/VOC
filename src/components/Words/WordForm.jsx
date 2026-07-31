import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { partOfSpeechOptions } from '../../utils/helpers';
import { lookupWordWithAI, getGeminiApiKey, setGeminiApiKey } from '../../utils/geminiService';
import './WordForm.css';

export default function WordForm({ isOpen, onClose, onSave, editWord = null }) {
  const { user } = useAuth();

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
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [customKey, setCustomKey] = useState('');

  const [showMore, setShowMore] = useState(false);

  const handleAiAutofill = async (queryText) => {
    const userEmail = user?.email?.toLowerCase();
    const ADMIN_EMAILS = ['azimjon29042006@gmail.com', 'azimjonxolmirzayev30@gmail.com'];
    if (!ADMIN_EMAILS.includes(userEmail)) {
      setAiError("🔒 AI Avto-to'ldirish tez orada taqdim etiladi! (Coming soon)");
      return;
    }

    if (!getGeminiApiKey()) {
      setShowKeyInput(true);
      setAiError("🔑 Gemini API Kaliti kiritilmagan. Iltimos, kalitni kiriting.");
      return;
    }

    const q = queryText || formData.word || formData.translation;
    if (!q.trim() || isAiLoading) return;

    setIsAiLoading(true);
    setAiError(null);
    try {
      const res = await lookupWordWithAI(q);
      if (res) {
        setFormData(prev => ({
          ...prev,
          word: res.word || prev.word,
          translation: res.translation || prev.translation,
          partOfSpeech: res.partOfSpeech || prev.partOfSpeech,
          definition: res.definition || prev.definition,
          example: res.example || prev.example,
        }));
        setShowMore(true);
      } else {
        setAiError("So'z ma'lumoti topilmadi.");
      }
    } catch (err) {
      console.error(err);
      if (err.message && err.message.includes('API kalit')) {
        setShowKeyInput(true);
      }
      setAiError(err.message || "AI so'rovida xatolik yuz berdi");
    } finally {
      setIsAiLoading(false);
    }
  };


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
            <div className="modal-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2>{editWord ? "So'zni tahrirlash" : "Yangi so'z"}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => handleAiAutofill()}
                  disabled={isAiLoading || (!formData.word.trim() && !formData.translation.trim())}
                  style={{ fontSize: '0.82rem', padding: '4px 10px', borderRadius: '8px', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--accent-1, #7c3aed)', border: '1px solid rgba(124, 58, 237, 0.2)' }}
                  title="Gemini AI orqali tarjima, ta'rif va so'z turkumini avto-to'ldirish"
                >
                  {isAiLoading ? '✨ Qidirilmoqda...' : '✨ AI Avto-to\'ldirish'}
                </button>
                <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="modal-body word-form-grid">
                {aiError && (
                  <div className="word-form-full" style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', fontSize: '0.85rem' }}>
                    ⚠️ {aiError}
                  </div>
                )}

                {showKeyInput && (
                  <div className="word-form-full" style={{ padding: '10px 14px', background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.25)', borderRadius: '10px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
                      🔑 Gemini API Kalitingizni kiriting:
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="password" 
                        className="input" 
                        value={customKey} 
                        onChange={e => setCustomKey(e.target.value)} 
                        placeholder="AI Studio API Key..." 
                        style={{ fontSize: '0.85rem', flex: 1 }}
                      />
                      <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={() => {
                          if (customKey.trim()) {
                            setGeminiApiKey(customKey.trim());
                            setShowKeyInput(false);
                            setAiError(null);
                            handleAiAutofill();
                          }
                        }}
                        style={{ fontSize: '0.8rem', whiteSpace: 'nowrap', padding: '6px 14px' }}
                      >
                        Saqlash
                      </button>
                    </div>
                  </div>
                )}

                <div className="input-group">
                  <label>Inglizcha so'z *</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.word}
                    onChange={e => setFormData({...formData, word: e.target.value})}
                    onBlur={() => {
                      if (!formData.translation.trim() && formData.word.trim() && !isAiLoading) {
                        handleAiAutofill(formData.word);
                      }
                    }}
                    placeholder="Masalan: Serendipity"
                    required
                    autoFocus
                    maxLength={300}
                  />
                </div>

                <div className="input-group">
                  <label>O'zbekcha tarjima *</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.translation}
                    onChange={e => setFormData({...formData, translation: e.target.value})}
                    onBlur={() => {
                      if (!formData.word.trim() && formData.translation.trim() && !isAiLoading) {
                        handleAiAutofill(formData.translation);
                      }
                    }}
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
                    {showMore ? "🔼 Kamroq variantlar" : "⚙️ Ko'proq variantlar (Ta'rif, misol va so'z turkumi)"}
                  </button>
                </div>

                {showMore && (
                  <>
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
                        placeholder="O'zbek tilidagi ta'rifi"
                        maxLength={1000}
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
                        maxLength={1500}
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
                        maxLength={1500}
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
                        maxLength={800}
                      />
                    </div>
                  </>
                )}
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isSubmitting}>Bekor qilish</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
