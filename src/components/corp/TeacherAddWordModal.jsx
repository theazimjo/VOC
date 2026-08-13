import { useState, useEffect } from 'react';
import { X, Plus, Copy, Check, FileText, AlertCircle, Edit3 } from 'lucide-react';
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
    "definition": "Har bir detalga alohida e'tibor beradigan",
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
  unitTitle = ''
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
        setJsonError('JSON ma\'lumoti massiv (array) ko\'rinishida bo\'lishi kerak: [ { "word": "...", "translation": "..." } ]');
        setParsedWordsCount(0);
        return;
      }
      const valid = parsed.filter(item => item && typeof item.word === 'string' && item.word.trim() && typeof item.translation === 'string' && item.translation.trim());
      setParsedWordsCount(valid.length);
      if (valid.length === 0) {
        setJsonError('Yaroqli so\'zlar topilmadi. Har bir obyektda "word" va "translation" maydonlari bo\'lishi shart.');
      } else {
        setJsonError('');
      }
    } catch (err) {
      setJsonError('JSON formatida xatolik mavjud. Iqtiboslar (quotes) va vergullarni tekshiring.');
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
      // reset for quick next entry
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

  return (
    <div className="tawm-backdrop" onClick={onClose}>
      <div className="tawm-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="tawm-header">
          <div>
            <h3 className="tawm-title">
              {editWord ? 'So\'zni tahrirlash' : 'So\'z qo\'shish'}
            </h3>
            {unitTitle && (
              <p className="tawm-subtitle">
                {monthTitle ? `${monthTitle} · ` : ''}{unitTitle}
              </p>
            )}
          </div>
          <button type="button" className="tawm-close-btn" onClick={onClose} title="Yopish">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs (only shown when creating, not when editing single word) */}
        {!editWord && (
          <div className="tawm-tabs">
            <button
              type="button"
              className={`tawm-tab-btn ${activeTab === 'single' ? 'active' : ''}`}
              onClick={() => setActiveTab('single')}
            >
              <Plus size={16} />
              <span>Bitta so'z qo'shish</span>
            </button>
            <button
              type="button"
              className={`tawm-tab-btn ${activeTab === 'json' ? 'active' : ''}`}
              onClick={() => setActiveTab('json')}
            >
              <FileText size={16} />
              <span>JSON orqali ko'p so'z qo'shish</span>
            </button>
          </div>
        )}

        {/* Content Body */}
        {activeTab === 'single' ? (
          <form onSubmit={handleSingleSubmit} className="tawm-body">
            <div className="tawm-form-grid">
              <div className="tawm-field">
                <label>SO'Z (INGLIZCHA) *</label>
                <input
                  type="text"
                  placeholder="masalan: Meticulous"
                  value={word}
                  onChange={e => setWord(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div className="tawm-field">
                <label>TARCIMA (O'ZBEKCHA) *</label>
                <input
                  type="text"
                  placeholder="masalan: Sinchkov"
                  value={translation}
                  onChange={e => setTranslation(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="tawm-field">
              <label>SO'Z TURKUMI</label>
              <select value={partOfSpeech} onChange={e => setPartOfSpeech(e.target.value)}>
                {Object.keys(POS_LABELS).map(pos => (
                  <option key={pos} value={pos}>{POS_LABELS[pos]}</option>
                ))}
              </select>
            </div>

            <div className="tawm-field">
              <label>TA'RIFI (DEFINITION - IXTIYORIY)</label>
              <input
                type="text"
                placeholder="masalan: Showing great attention to detail..."
                value={definition}
                onChange={e => setDefinition(e.target.value)}
              />
            </div>

            <div className="tawm-field">
              <label>MISOLLI GAP (EXAMPLE - IXTIYORIY)</label>
              <input
                type="text"
                placeholder="masalan: He paid meticulous attention to detail."
                value={example}
                onChange={e => setExample(e.target.value)}
              />
            </div>

            <div className="tawm-footer">
              <button type="button" className="tawm-btn-secondary" onClick={onClose}>
                Bekor qilish
              </button>
              <button type="submit" className="tawm-btn-primary" disabled={saving || !word.trim() || !translation.trim()}>
                {saving ? 'Saqlanmoqda...' : editWord ? 'Saqlash' : 'So\'zni qo\'shish'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleJsonSubmit} className="tawm-body">
            <div className="tawm-sample-bar">
              <div className="tawm-sample-text">
                <FileText size={15} />
                <span>Format: JSON massivi</span>
              </div>
              <button type="button" className="tawm-sample-copy-btn" onClick={handleCopySample}>
                {copiedSample ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedSample ? 'Nusxalandi!' : 'Namuna JSON nusxalash'}</span>
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
                <span>{parsedWordsCount} ta so'z muvaffaqiyatli aniqlandi va qo'shishga tayyor.</span>
              </div>
            ) : null}

            <div className="tawm-footer">
              <button type="button" className="tawm-btn-secondary" onClick={onClose}>
                Bekor qilish
              </button>
              <button
                type="submit"
                className="tawm-btn-primary"
                disabled={saving || parsedWordsCount === 0}
              >
                {saving ? 'Saqlanmoqda...' : `${parsedWordsCount > 0 ? parsedWordsCount + ' ta ' : ''}So'zlarni import qilish`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
