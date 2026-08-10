import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lookupWordFromDictionary, toShortLangCode } from '../../utils/dictionaryService';
import { speechLanguages } from '../../utils/helpers';
import './BulkImportForm.css';

// Sample items per pack language — a full reference entry (all 5 fields) plus
// a shorter one, so the format sample is complete and copy-paste/AI-ready
// regardless of which language the pack is in.
const SAMPLE_WORDS_BY_LANG = {
  en: [
    { word: 'Apple', translation: 'Olma', partOfSpeech: 'noun', definition: "Qizil yoki yashil po'stli yumaloq meva", example: 'I ate an apple.' },
    { word: 'Beautiful', translation: 'Chiroyli', partOfSpeech: 'adjective' }
  ],
  es: [
    { word: 'Manzana', translation: 'Olma', partOfSpeech: 'noun', definition: "Qizil yoki yashil po'stli yumaloq meva", example: 'Comí una manzana.' },
    { word: 'Hermoso', translation: 'Chiroyli', partOfSpeech: 'adjective' }
  ],
  fr: [
    { word: 'Pomme', translation: 'Olma', partOfSpeech: 'noun', definition: "Qizil yoki yashil po'stli yumaloq meva", example: "J'ai mangé une pomme." },
    { word: 'Beau', translation: 'Chiroyli', partOfSpeech: 'adjective' }
  ],
  de: [
    { word: 'Apfel', translation: 'Olma', partOfSpeech: 'noun', definition: "Qizil yoki yashil po'stli yumaloq meva", example: 'Ich habe einen Apfel gegessen.' },
    { word: 'Schön', translation: 'Chiroyli', partOfSpeech: 'adjective' }
  ],
  it: [
    { word: 'Mela', translation: 'Olma', partOfSpeech: 'noun', definition: "Qizil yoki yashil po'stli yumaloq meva", example: 'Ho mangiato una mela.' },
    { word: 'Bello', translation: 'Chiroyli', partOfSpeech: 'adjective' }
  ],
  pt: [
    { word: 'Maçã', translation: 'Olma', partOfSpeech: 'noun', definition: "Qizil yoki yashil po'stli yumaloq meva", example: 'Eu comi uma maçã.' },
    { word: 'Bonito', translation: 'Chiroyli', partOfSpeech: 'adjective' }
  ],
  ru: [
    { word: 'Яблоко', translation: 'Olma', partOfSpeech: 'noun', definition: "Qizil yoki yashil po'stli yumaloq meva", example: 'Я съел яблоко.' },
    { word: 'Красивый', translation: 'Chiroyli', partOfSpeech: 'adjective' }
  ],
  tr: [
    { word: 'Elma', translation: 'Olma', partOfSpeech: 'noun', definition: "Qizil yoki yashil po'stli yumaloq meva", example: 'Bir elma yedim.' },
    { word: 'Güzel', translation: 'Chiroyli', partOfSpeech: 'adjective' }
  ],
  ar: [
    { word: 'تفاحة', translation: 'Olma', partOfSpeech: 'noun', definition: "Qizil yoki yashil po'stli yumaloq meva", example: 'أكلت تفاحة.' },
    { word: 'جميل', translation: 'Chiroyli', partOfSpeech: 'adjective' }
  ],
  zh: [
    { word: '苹果', translation: 'Olma', partOfSpeech: 'noun', definition: "Qizil yoki yashil po'stli yumaloq meva", example: '我吃了一个苹果。' },
    { word: '美丽', translation: 'Chiroyli', partOfSpeech: 'adjective' }
  ],
  ja: [
    { word: 'りんご', translation: 'Olma', partOfSpeech: 'noun', definition: "Qizil yoki yashil po'stli yumaloq meva", example: 'りんごを食べました。' },
    { word: '美しい', translation: 'Chiroyli', partOfSpeech: 'adjective' }
  ],
  ko: [
    { word: '사과', translation: 'Olma', partOfSpeech: 'noun', definition: "Qizil yoki yashil po'stli yumaloq meva", example: '나는 사과를 먹었다.' },
    { word: '아름다운', translation: 'Chiroyli', partOfSpeech: 'adjective' }
  ],
  uz: [
    { word: 'Olma', translation: 'Olma', partOfSpeech: 'noun', definition: "Qizil yoki yashil po'stli yumaloq meva", example: 'Men olma yedim.' },
    { word: 'Chiroyli', translation: 'Chiroyli', partOfSpeech: 'adjective' }
  ]
};

function buildSampleJson(wordLangCode) {
  const items = SAMPLE_WORDS_BY_LANG[wordLangCode] || SAMPLE_WORDS_BY_LANG.en;
  return JSON.stringify(items, null, 2);
}

// Keep this in sync with the `words/$packId` cap enforced server-side in
// database.rules.json — failing fast here avoids a confusing partial import
// where earlier chunks succeed and later ones get rejected mid-way.
const MAX_WORDS_PER_IMPORT = 500;

// Limits how many lookup requests run at once against the free dictionary APIs.
const LOOKUP_CONCURRENCY = 4;

async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const current = cursor++;
      results[current] = await fn(items[current], current);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

// Fills in a missing `word` or `translation` from the free dictionary database.
// Returns null if the entry has neither field, or if the lookup found nothing.
async function resolveEntry(item, wordLangCode) {
  const word = String(item.word || '').trim();
  const translation = String(item.translation || '').trim();
  if (word && translation) return { ...item, word, translation };
  if (!word && !translation) return null;

  try {
    const direction = word ? 'word2translation' : 'translation2word';
    const res = await lookupWordFromDictionary(word || translation, direction, wordLangCode);
    if (!res || !res.word || !res.translation) return null;
    return {
      ...item,
      word: word || res.word,
      translation: translation || res.translation,
      partOfSpeech: item.partOfSpeech || res.partOfSpeech || 'noun',
      definition: item.definition || res.definition || '',
      example: item.example || res.example || ''
    };
  } catch {
    return null;
  }
}

export default function BulkImportForm({ isOpen, onClose, onImport, packLanguage = 'en-US' }) {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [importProgress, setImportProgress] = useState(null);
  const [resolvePhase, setResolvePhase] = useState(false);

  const wordLangCode = toShortLangCode(packLanguage);
  const sampleJson = useMemo(() => buildSampleJson(wordLangCode), [wordLangCode]);
  const wordLangMeta = speechLanguages.find(l => l.code === packLanguage) || speechLanguages[0];

  const handleCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(sampleJson)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Clipboard API failed, trying fallback: ', err);
          fallbackCopy(sampleJson);
        });
    } else {
      fallbackCopy(sampleJson);
    }
  };

  const fallbackCopy = (text) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        console.warn('Fallback copy was not successful');
      }
    } catch (err) {
      console.error('Fallback copy failed: ', err);
    }
    document.body.removeChild(ta);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setWarning('');
    setImportProgress(null);

    if (!jsonText.trim()) {
      setError("Please enter JSON data.");
      return;
    }

    try {
      let parsedData;
      try {
        parsedData = JSON.parse(jsonText);
      } catch (jsonErr) {
        throw new Error("Invalid JSON format! Check the brackets, quotes, and commas.", { cause: jsonErr });
      }

      if (!Array.isArray(parsedData)) {
        throw new Error("The JSON data must be a list (array): [...]");
      }

      if (parsedData.length > MAX_WORDS_PER_IMPORT) {
        throw new Error(`You can add up to ${MAX_WORDS_PER_IMPORT} words at a time (you entered ${parsedData.length}). Split the list into several batches.`);
      }

      for (let i = 0; i < parsedData.length; i++) {
        if (!parsedData[i].word && !parsedData[i].translation) {
          throw new Error(`Word ${i + 1} is missing both 'word' and 'translation' — at least one is required.`);
        }
      }

      // Entries missing 'word' or 'translation' get the gap filled from the
      // free online dictionary database (based on the pack's language), so
      // the user only has to type one side of the pair.
      const needsLookup = parsedData.some(item => !item.word || !item.translation);

      let resolved = parsedData;
      if (needsLookup) {
        setResolvePhase(true);
        resolved = await mapWithConcurrency(parsedData, LOOKUP_CONCURRENCY, item => resolveEntry(item, wordLangCode));
        setResolvePhase(false);
      }

      const validWords = [];
      const unresolvedIndexes = [];
      resolved.forEach((item, i) => {
        if (!item || !item.word || !item.translation) {
          unresolvedIndexes.push(i + 1);
          return;
        }
        validWords.push({
          word: String(item.word).slice(0, 300),
          translation: String(item.translation).slice(0, 300),
          partOfSpeech: item.partOfSpeech || 'noun',
          definition: String(item.definition || '').slice(0, 3000),
          example: String(item.example || '').slice(0, 3000),
          notes: String(item.notes || '').slice(0, 2000)
        });
      });

      if (validWords.length === 0) {
        throw new Error("Bazadan hech qanday so'z uchun tarjima topilmadi. Iltimos, so'zlarni to'liqroq kiriting.");
      }

      if (unresolvedIndexes.length > 0) {
        setWarning(`⚠️ ${unresolvedIndexes.length} ta so'z uchun bazadan tarjima topilmadi va o'tkazib yuborildi: #${unresolvedIndexes.join(', #')}`);
      }

      setIsImporting(true);
      setImportProgress({ added: 0, remaining: validWords.length, total: validWords.length });

      await onImport(validWords, (added, remaining) => {
        setImportProgress({ added, remaining, total: validWords.length });
      });

      setIsImporting(false);
      setImportProgress(null);
      setJsonText('');
      if (unresolvedIndexes.length === 0) onClose();

    } catch (err) {
      setError(err.message);
      setIsImporting(false);
      setResolvePhase(false);
      setImportProgress(null);
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
            style={{ position: 'relative' }}
          >
            {resolvePhase && (
              <div className="import-progress-overlay">
                <div className="import-progress-card">
                  <div className="import-spinner" />
                  <h3>🔎 Lug'atdan tarjimalar qidirilmoqda...</h3>
                </div>
              </div>
            )}

            {isImporting && importProgress && (
              <div className="import-progress-overlay">
                <div className="import-progress-card">
                  <div className="import-spinner" />
                  <h3>Adding words...</h3>
                  <div className="import-progress-bar-track">
                    <div
                      className="import-progress-bar-fill"
                      style={{ width: `${(importProgress.added / importProgress.total) * 100}%` }}
                    />
                  </div>
                  <div className="import-progress-counts">
                    <span>Added: <strong>{importProgress.added}</strong></span>
                    <span>Remaining: <strong>{importProgress.remaining} / {importProgress.total}</strong></span>
                  </div>
                </div>
              </div>
            )}

            <div className="modal-header">
              <h2>Bulk-add words via JSON</h2>
              <button className="btn btn-ghost btn-icon" onClick={onClose} disabled={isImporting}>✕</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body flex-col gap-md">
                <p style={{ color: 'var(--text-secondary)' }}>
                  Enter words in JSON format following the sample below — <code>word</code> should be{' '}
                  {wordLangMeta.flag} {wordLangMeta.label}cha, this pack's language.{' '}
                  At least one of <code>word</code> or <code>translation</code> is required —{' '}
                  if you leave one out, it's auto-filled from a free online dictionary database.
                </p>

                <div className="json-sample">
                  <div className="json-sample-header">
                    <span className="json-sample-label">Sample format</span>
                    <button
                      type="button"
                      className={`btn-copy-sample ${copied ? 'copied' : ''}`}
                      onClick={handleCopy}
                    >
                      {copied ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  </div>
                  <pre>{sampleJson}</pre>
                </div>

                <div className="input-group">
                  <textarea
                    className="bulk-import-textarea"
                    value={jsonText}
                    onChange={e => setJsonText(e.target.value)}
                    placeholder="Paste your JSON list here (Ctrl+V)..."
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

                {warning && (
                  <div style={{
                    color: '#b45309',
                    fontSize: 'var(--font-sm)',
                    padding: 'var(--space-sm)',
                    background: 'rgba(217, 119, 6, 0.12)',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    {warning}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isImporting || resolvePhase}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isImporting || resolvePhase}>
                  {resolvePhase ? 'Qidirilmoqda...' : isImporting ? 'Loading...' : "Add"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
