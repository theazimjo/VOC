import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BulkImportForm.css';

const SAMPLE_JSON = `[
  {
    "word": "Apple",
    "translation": "Olma",
    "partOfSpeech": "noun",
    "definition": "A round fruit with red or green skin",
    "example": "I ate an apple."
  },
  {
    "word": "Beautiful",
    "translation": "Chiroyli",
    "partOfSpeech": "adjective"
  }
]`;

export default function BulkImportForm({ isOpen, onClose, onImport }) {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SAMPLE_JSON);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers / non-HTTPS
      const ta = document.createElement('textarea');
      ta.value = SAMPLE_JSON;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!jsonText.trim()) {
      setError("Iltimos, JSON ma'lumotni kiriting.");
      return;
    }

    try {
      const parsedData = JSON.parse(jsonText);

      if (!Array.isArray(parsedData)) {
        throw new Error("JSON ma'lumot array (ro'yxat) ko'rinishida bo'lishi kerak: [...]");
      }

      const validWords = [];
      for (let i = 0; i < parsedData.length; i++) {
        const item = parsedData[i];
        if (!item.word || !item.translation) {
          throw new Error(`${i + 1}-so'zda 'word' yoki 'translation' maydoni yetishmayapti.`);
        }
        validWords.push({
          word: item.word,
          translation: item.translation,
          partOfSpeech: item.partOfSpeech || 'noun',
          definition: item.definition || '',
          example: item.example || '',
          notes: item.notes || ''
        });
      }

      setIsImporting(true);
      await onImport(validWords);
      setIsImporting(false);
      setJsonText('');
      onClose();

    } catch (err) {
      setError("JSON formatida xatolik: " + err.message);
      setIsImporting(false);
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
              <h2>JSON orqali ko'p so'z qo'shish</h2>
              <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body flex-col gap-md">
                <p style={{ color: 'var(--text-secondary)' }}>
                  Quyidagi namuna asosida JSON formatida so'zlarni kiriting.{' '}
                  <code>word</code> va <code>translation</code> maydonlari majburiy.
                </p>

                <div className="json-sample">
                  <div className="json-sample-header">
                    <span className="json-sample-label">Namuna formati</span>
                    <button
                      type="button"
                      className={`btn-copy-sample ${copied ? 'copied' : ''}`}
                      onClick={handleCopy}
                    >
                      {copied ? '✓ Nusxalandi!' : '📋 Nusxalash'}
                    </button>
                  </div>
                  <pre>{SAMPLE_JSON}</pre>
                </div>

                <div className="input-group">
                  <textarea
                    className="bulk-import-textarea"
                    value={jsonText}
                    onChange={e => setJsonText(e.target.value)}
                    placeholder="JSON formatidagi ro'yxatni bu yerga joylashtiring (Ctrl+V)..."
                  />
                </div>

                {error && (
                  <div style={{
                    color: 'var(--error)',
                    fontSize: 'var(--font-sm)',
                    padding: 'var(--space-sm)',
                    background: 'var(--error-dim)',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    {error}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isImporting}>
                  Bekor qilish
                </button>
                <button type="submit" className="btn btn-primary" disabled={isImporting}>
                  {isImporting ? 'Yuklanmoqda...' : "Qo'shish"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
