import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Copy, Check, AlertTriangle, FileText } from 'lucide-react';
import { usePacks } from '../../hooks/usePacks';
import { useWords } from '../../hooks/useWords';
import { lookupWordFromDictionary, toShortLangCode } from '../../utils/dictionaryService';
import IosSpinner from '../../components/common/IosSpinner';
import './BulkImportPage.css';

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
  uz: [
    { word: 'Olma', translation: 'Olma', partOfSpeech: 'noun', definition: "Qizil yoki yashil po'stli yumaloq meva", example: 'Men olma yedim.' },
    { word: 'Chiroyli', translation: 'Chiroyli', partOfSpeech: 'adjective' }
  ]
};

function buildSampleJson(wordLangCode) {
  const items = SAMPLE_WORDS_BY_LANG[wordLangCode] || SAMPLE_WORDS_BY_LANG.en;
  return JSON.stringify(items, null, 2);
}

const MAX_WORDS_PER_IMPORT = 500;
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

async function resolveEntry(item, wordLangCode) {
  const word = String(item.word || '').trim();
  const translation = String(item.translation || '').trim();
  if (word && translation) return { ...item, word, translation };
  if (!word && !translation) return null;

  try {
    const direction = word ? 'word2translation' : 'translation2word';
    const res = await lookupWordFromDictionary(word || translation, direction, wordLangCode);
    if (!res) return null;

    return {
      word: word || res.word || '',
      translation: translation || res.translation || '',
      partOfSpeech: item.partOfSpeech || res.partOfSpeech || 'noun',
      definition: item.definition || res.definition || '',
      example: item.example || res.example || '',
      notes: item.notes || '',
      customSentence: item.customSentence || ''
    };
  } catch {
    return null;
  }
}

export default function BulkImportPage() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const { getPack } = usePacks();
  const { words: existingWords, bulkAddWords, loading: wordsLoading } = useWords('packs', packId);

  const [pack, setPack] = useState(null);
  const [packLoading, setPackLoading] = useState(true);

  const [jsonText, setJsonText] = useState('');
  const [copiedSample, setCopiedSample] = useState(false);
  const [autoResolveMissing, setAutoResolveMissing] = useState(true);

  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(null);
  const [importError, setImportError] = useState(null);

  useEffect(() => {
    const fetchPack = async () => {
      setPackLoading(true);
      const p = await getPack(packId);
      if (p) setPack(p);
      else navigate('/library?tab=packs');
      setPackLoading(false);
    };
    fetchPack();
  }, [packId, getPack, navigate]);

  const packLanguage = pack?.language || 'en-US';
  const wordLangCode = toShortLangCode(packLanguage);
  const sampleJson = useMemo(() => buildSampleJson(wordLangCode), [wordLangCode]);

  const handleCopySample = () => {
    navigator.clipboard.writeText(sampleJson);
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 2000);
  };

  const handleImport = async () => {
    setImportError(null);
    const raw = jsonText.trim();
    if (!raw) return;

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      setImportError('Invalid JSON format. Please check syntax (quotes, commas, brackets).');
      return;
    }

    if (!Array.isArray(parsed)) {
      setImportError('JSON must be an array of word objects: [ { "word": "...", "translation": "..." } ]');
      return;
    }

    if (parsed.length === 0) {
      setImportError('JSON array is empty.');
      return;
    }

    if (parsed.length > MAX_WORDS_PER_IMPORT) {
      setImportError(`Cannot import more than ${MAX_WORDS_PER_IMPORT} words at once.`);
      return;
    }

    setIsImporting(true);
    try {
      let candidateWords = parsed;
      if (autoResolveMissing) {
        setProgress({ current: 0, total: parsed.length, stage: 'resolving' });
        let done = 0;
        candidateWords = await mapWithConcurrency(parsed, LOOKUP_CONCURRENCY, async (item) => {
          const resolved = await resolveEntry(item, wordLangCode);
          done++;
          setProgress({ current: done, total: parsed.length, stage: 'resolving' });
          return resolved;
        });
        candidateWords = candidateWords.filter(Boolean);
      }

      const validWords = candidateWords.filter(
        item => item && typeof item.word === 'string' && item.word.trim() && typeof item.translation === 'string' && item.translation.trim()
      );

      if (validWords.length === 0) {
        setImportError('No valid words found in JSON. Each item requires "word" and "translation".');
        setIsImporting(false);
        return;
      }

      const existingSet = new Set((existingWords || []).map(w => (w.word || '').trim().toLowerCase()));
      const uniqueWords = [];
      let duplicateCount = 0;

      for (const w of validWords) {
        const key = (w.word || '').trim().toLowerCase();
        if (existingSet.has(key)) {
          duplicateCount++;
        } else {
          existingSet.add(key);
          uniqueWords.push(w);
        }
      }

      if (duplicateCount > 0) {
        const proceed = window.confirm(
          `${duplicateCount} duplicate word(s) already in pack will be skipped. ${uniqueWords.length} new word(s) will be added. Continue?`
        );
        if (!proceed) {
          setIsImporting(false);
          return;
        }
      }

      if (uniqueWords.length === 0) {
        setImportError('All words in the JSON list already exist in this pack.');
        setIsImporting(false);
        return;
      }

      setProgress({ current: 0, total: uniqueWords.length, stage: 'saving' });
      await bulkAddWords(uniqueWords, (addedCount, totalCount) => {
        setProgress({ current: addedCount, total: totalCount, stage: 'saving' });
      });

      navigate(`/packs/${packId}`);
    } catch (err) {
      setImportError('Import failed: ' + err.message);
    } finally {
      setIsImporting(false);
      setProgress(null);
    }
  };

  if (packLoading || wordsLoading) {
    return (
      <div className="ios-activity-indicator" style={{ marginTop: '100px' }}>
        <IosSpinner />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <motion.div
      className="bulk-import-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
    >
      <header className="bip-header">
        <button
          type="button"
          className="bip-back-btn"
          onClick={() => navigate(`/packs/${packId}`)}
          aria-label="Back to pack"
          title="Back to pack"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="bip-title-wrap">
          <h1>Import Words from JSON</h1>
          <p>{pack?.name || 'Pack'}</p>
        </div>
      </header>

      <div className="bip-card">
        {importError && (
          <div className="bip-error-badge">
            <AlertTriangle size={16} /> {importError}
          </div>
        )}

        <div className="bip-sample-bar">
          <div className="bip-sample-info">
            <FileText size={16} />
            <span>Format: JSON array of objects</span>
          </div>
          <button type="button" className="btn-copy-sample" onClick={handleCopySample}>
            {copiedSample ? <Check size={14} /> : <Copy size={14} />}
            <span>{copiedSample ? 'Copied sample!' : 'Copy sample JSON'}</span>
          </button>
        </div>

        <div className="input-group">
          <div className="bip-label-row">
            <span>Paste JSON code</span>
            <label className="bip-checkbox-label">
              <input
                type="checkbox"
                checked={autoResolveMissing}
                onChange={e => setAutoResolveMissing(e.target.checked)}
              />
              <span>Auto-translate missing definitions/words via dictionary</span>
            </label>
          </div>
          <textarea
            className="textarea bip-json-textarea"
            value={jsonText}
            onChange={e => setJsonText(e.target.value)}
            placeholder={sampleJson}
            rows={12}
            disabled={isImporting}
          />
        </div>

        {progress && (
          <div className="bip-progress-card">
            <div className="bip-progress-text">
              <span>{progress.stage === 'resolving' ? 'Looking up dictionary translations...' : 'Saving words to pack...'}</span>
              <span>{progress.current} / {progress.total}</span>
            </div>
            <div className="bip-progress-bar">
              <div
                className="bip-progress-fill"
                style={{ width: `${Math.round((progress.current / progress.total) * 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="bip-actions">
          <button
            type="button"
            className="btn btn-primary bip-submit-btn"
            onClick={handleImport}
            disabled={isImporting || !jsonText.trim()}
          >
            {isImporting ? <IosSpinner size="sm" /> : <Upload size={16} />}
            <span>{isImporting ? 'Importing words...' : 'Import Words'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
