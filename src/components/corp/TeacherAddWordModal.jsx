import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Copy, Check, FileText, AlertCircle, X } from 'lucide-react';
import './TeacherAddWordModal.css';

const POS_LABELS = {
  noun: 'noun',
  verb: 'verb',
  adjective: 'adjective',
  adverb: 'adverb',
  phrase: 'phrase',
  preposition: 'preposition',
  other: 'other'
};

const SAMPLE_JSON = `[
  {
    "word": "Meticulous",
    "translation": "Sinchkov, ehtiyotkor",
    "partOfSpeech": "adjective",
    "definition": "Showing great attention to detail; very careful and precise.",
    "example": "He paid meticulous attention to detail."
  },
  {
    "word": "Inevitable",
    "translation": "Muqarrar",
    "partOfSpeech": "adjective"
  }
]`;

export default function TeacherAddWordModal({
  open,
  onClose,
  onAddWords,
  onSaveEditWord,
  editWord = null,
  saving = false,
  monthTitle = '',
  unitTitle = '',
  isPage = true
}) {
  const [activeTab, setActiveTab] = useState('single'); // 'single' | 'json'

  // Single word form state
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('noun');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');

  // JSON bulk form state
  const [jsonText, setJsonText] = useState('');
  const [copiedSample, setCopiedSample] = useState(false);
  const [jsonError, setJsonError] = useState('');
  const [parsedWordsCount, setParsedWordsCount] = useState(0);

  useEffect(() => {
    if (editWord) {
      setActiveTab('single');
      setWord(editWord.word || '');
      setTranslation(editWord.translation || '');
      setPartOfSpeech(editWord.partOfSpeech || 'noun');
      setDefinition(editWord.definition || '');
      setExample(editWord.example || '');
    } else {
      setWord('');
      setTranslation('');
      setPartOfSpeech('noun');
      setDefinition('');
      setExample('');
    }
    setJsonText('');
    setJsonError('');
    setParsedWordsCount(0);
  }, [editWord, open]);

  useEffect(() => {
    const raw = jsonText.trim();
    if (!raw) {
      setJsonError('');
      setParsedWordsCount(0);
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        setJsonError('JSON must be an array format: [ { "word": "...", "translation": "..." } ]');
        setParsedWordsCount(0);
        return;
      }
      const valid = parsed.filter(item => item && typeof item.word === 'string' && item.word.trim() && typeof item.translation === 'string' && item.translation.trim());
      setParsedWordsCount(valid.length);
      if (valid.length === 0) {
        setJsonError('No valid word objects found. Each item must have non-empty "word" and "translation" fields.');
      } else {
        setJsonError('');
      }
    } catch (err) {
      setJsonError('Invalid JSON syntax. Please check quotes and commas.');
      setParsedWordsCount(0);
    }
  }, [jsonText]);

  if (!open) return null;

  const handleCopySample = () => {
    navigator.clipboard.writeText(SAMPLE_JSON);
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 2000);
  };

  const handleSingleSubmit = (e) => {
    e.preventDefault();
    if (!word.trim() || !translation.trim()) return;

    const item = {
      id: editWord ? editWord.id : 'w_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      word: word.trim(),
      translation: translation.trim(),
      partOfSpeech: partOfSpeech || 'noun',
      definition: definition.trim(),
      example: example.trim(),
    };

    if (editWord) {
      if (onSaveEditWord) onSaveEditWord(item);
    } else {
      if (onAddWords) onAddWords([item]);
      setWord('');
      setTranslation('');
      setDefinition('');
      setExample('');
    }
  };

  const handleJsonSubmit = (e) => {
    e.preventDefault();
    const raw = jsonText.trim();
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;

      const validWords = parsed
        .filter(item => item && typeof item.word === 'string' && item.word.trim() && typeof item.translation === 'string' && item.translation.trim())
        .map((item, idx) => ({
          id: 'w_' + Date.now() + '_' + idx + '_' + Math.random().toString(36).substr(2, 4),
          word: item.word.trim(),
          translation: item.translation.trim(),
          partOfSpeech: item.partOfSpeech || 'noun',
          definition: item.definition ? String(item.definition).trim() : '',
          example: item.example ? String(item.example).trim() : '',
        }));

      if (validWords.length > 0 && onAddWords) {
        onAddWords(validWords);
        onClose();
      }
    } catch (err) {
      setJsonError('JSON parse error: ' + err.message);
    }
  };

  const formContent = (
    <div className="tawm-card">
      {/* Navigation Tabs (only shown when creating) */}
      {!editWord && (
        <div className="tawm-tabs">
          <button
            type="button"
            className={`tawm-tab-btn ${activeTab === 'single' ? 'active' : ''}`}
            onClick={() => setActiveTab('single')}
          >
            <Plus size={16} />
            <span>Single Word</span>
          </button>
          <button
            type="button"
            className={`tawm-tab-btn ${activeTab === 'json' ? 'active' : ''}`}
            onClick={() => setActiveTab('json')}
          >
            <FileText size={16} />
            <span>Bulk Import (JSON)</span>
          </button>
        </div>
      )}

      {/* Form Body */}
      {activeTab === 'single' ? (
        <form onSubmit={handleSingleSubmit} className="tawm-body">
          <div className="tawm-form-grid">
            <div className="tawm-field">
              <label>WORD (ENGLISH) *</label>
              <input
                type="text"
                placeholder="e.g. Meticulous"
                value={word}
                onChange={e => setWord(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="tawm-field">
              <label>TRANSLATION (UZBEK) *</label>
              <input
                type="text"
                placeholder="e.g. Sinchkov"
                value={translation}
                onChange={e => setTranslation(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="tawm-field">
            <label>PART OF SPEECH</label>
            <select value={partOfSpeech} onChange={e => setPartOfSpeech(e.target.value)}>
              {Object.keys(POS_LABELS).map(pos => (
                <option key={pos} value={pos}>{POS_LABELS[pos]}</option>
              ))}
            </select>
          </div>

          <div className="tawm-field">
            <label>DEFINITION (OPTIONAL)</label>
            <input
              type="text"
              placeholder="e.g. Showing great attention to detail..."
              value={definition}
              onChange={e => setDefinition(e.target.value)}
            />
          </div>

          <div className="tawm-field">
            <label>EXAMPLE SENTENCE (OPTIONAL)</label>
            <input
              type="text"
              placeholder="e.g. He paid meticulous attention to detail."
              value={example}
              onChange={e => setExample(e.target.value)}
            />
          </div>

          <div className="tawm-footer">
            <button type="button" className="tawm-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="tawm-btn-primary" disabled={saving || !word.trim() || !translation.trim()}>
              {saving ? 'Saving...' : editWord ? 'Save Changes' : 'Add Word'}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleJsonSubmit} className="tawm-body">
          <div className="tawm-sample-bar">
            <div className="tawm-sample-text">
              <FileText size={15} />
              <span>Format: JSON Array</span>
            </div>
            <button type="button" className="tawm-sample-copy-btn" onClick={handleCopySample}>
              {copiedSample ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedSample ? 'Copied!' : 'Copy Sample JSON'}</span>
            </button>
          </div>

          <div className="tawm-field">
            <textarea
              className="tawm-textarea"
              rows={9}
              placeholder={SAMPLE_JSON}
              value={jsonText}
              onChange={e => setJsonText(e.target.value)}
            />
          </div>

          {jsonError ? (
            <div className="tawm-alert tawm-alert-error">
              <AlertCircle size={16} />
              <span>{jsonError}</span>
            </div>
          ) : parsedWordsCount > 0 ? (
            <div className="tawm-alert tawm-alert-success">
              <Check size={16} />
              <span>{parsedWordsCount} word(s) validated and ready to import.</span>
            </div>
          ) : null}

          <div className="tawm-footer">
            <button type="button" className="tawm-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="tawm-btn-primary"
              disabled={saving || parsedWordsCount === 0}
            >
              {saving ? 'Importing...' : `${parsedWordsCount > 0 ? `Import ${parsedWordsCount} Words` : 'Import Words'}`}
            </button>
          </div>
        </form>
      )}
    </div>
  );

  if (isPage) {
    return (
      <div className="tawm-page-container">
        <div className="tpv-header">
          <button type="button" className="tpv-back" onClick={onClose} title="Back">
            <ArrowLeft size={18} />
          </button>
          <div className="tpv-title">
            <h2>{editWord ? 'Edit Word' : 'Add Words'}</h2>
            <span>
              {unitTitle ? `${monthTitle ? monthTitle + ' · ' : ''}${unitTitle}` : 'Add words to topic'}
            </span>
          </div>
        </div>

        {formContent}
      </div>
    );
  }

  return (
    <div className="tawm-backdrop" onClick={onClose}>
      <div className="tawm-modal" onClick={e => e.stopPropagation()}>
        <div className="tawm-header">
          <div>
            <h3 className="tawm-title">
              {editWord ? 'Edit Word' : 'Add Words'}
            </h3>
            {unitTitle && (
              <p className="tawm-subtitle">
                {monthTitle ? `${monthTitle} · ` : ''}{unitTitle}
              </p>
            )}
          </div>
          <button type="button" className="tawm-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>
        {formContent}
      </div>
    </div>
  );
}
