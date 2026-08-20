import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Save, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { usePacks } from '../../hooks/usePacks';
import { useWords } from '../../hooks/useWords';
import { partOfSpeechOptions, speechLanguages } from '../../utils/helpers';
import { lookupWordFromDictionary, toShortLangCode, decodeHTMLEntities } from '../../utils/dictionaryService';
import IosSpinner from '../../components/common/IosSpinner';
import './IeltsWordFormPage.css';

const ARTICLE_OPTIONS = [
  { value: '', label: 'Not set' },
  { value: 'a', label: 'a' },
  { value: 'an', label: 'an' },
  { value: 'the', label: 'the' },
  { value: 'no article', label: 'No article' },
];

const TOPIC_OPTIONS = [
  { value: '', label: 'Not set' },
  { value: 'Environment', label: 'Environment' },
  { value: 'Education', label: 'Education' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Health', label: 'Health' },
  { value: 'Crime', label: 'Crime' },
  { value: 'Government & Politics', label: 'Government & Politics' },
  { value: 'Work & Economy', label: 'Work & Economy' },
  { value: 'Globalization', label: 'Globalization' },
  { value: 'Culture & Society', label: 'Culture & Society' },
  { value: 'Media', label: 'Media' },
];

const EMPTY_FORM = {
  word: '',
  translation: '',
  definition: '',
  synonyms: '',
  collocations: '',
  nounForm: '',
  verbForm: '',
  adjectiveForm: '',
  adverbForm: '',
  article: '',
  topic: '',
  example: '',
  partOfSpeech: 'noun',
  notes: '',
};

// IELTS counterpart of WordFormPage.jsx - deliberately a separate page
// rather than a branch inside it, so the generic word-entry flow used by
// every 'default' pack stays completely untouched. Mirrors its proven UX
// (source-locked inline dictionary lookup, inline duplicate warning,
// stay-on-page-after-save with a toast + reset) but always shows the full
// IELTS field set instead of collapsing it behind a "more" toggle, since
// those fields are the entire point of an IELTS pack.
export default function IeltsWordFormPage() {
  const { packId, wordId } = useParams();
  const navigate = useNavigate();
  const { getPack } = usePacks();
  const { words, loading: wordsLoading, addWord, updateWord } = useWords('packs', packId);

  const [pack, setPack] = useState(null);
  const [packLoading, setPackLoading] = useState(true);
  const wordInputRef = useRef(null);

  const isEdit = Boolean(wordId);

  const [formData, setFormData] = useState(EMPTY_FORM);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchPack = async () => {
      setPackLoading(true);
      const p = await getPack(packId);
      if (p) {
        setPack(p);
      } else {
        navigate('/library?tab=packs');
      }
      setPackLoading(false);
    };
    fetchPack();
  }, [packId, getPack, navigate]);

  useEffect(() => {
    if (isEdit && words && words.length > 0) {
      const target = words.find(w => w.id === wordId);
      if (target) {
        setFormData({
          word: decodeHTMLEntities(target.word || ''),
          translation: decodeHTMLEntities(target.translation || ''),
          definition: decodeHTMLEntities(target.definition || ''),
          synonyms: decodeHTMLEntities(target.synonyms || ''),
          collocations: decodeHTMLEntities(target.collocations || ''),
          nounForm: decodeHTMLEntities(target.nounForm || ''),
          verbForm: decodeHTMLEntities(target.verbForm || ''),
          adjectiveForm: decodeHTMLEntities(target.adjectiveForm || ''),
          adverbForm: decodeHTMLEntities(target.adverbForm || ''),
          article: target.article || '',
          topic: target.topic || '',
          example: decodeHTMLEntities(target.example || ''),
          partOfSpeech: target.partOfSpeech || 'noun',
          notes: decodeHTMLEntities(target.notes || ''),
        });
      }
    }
  }, [isEdit, wordId, words]);

  const packLanguage = pack?.language || 'en-US';
  const wordLangCode = toShortLangCode(packLanguage);
  const wordLangMeta = speechLanguages.find(l => l.code === packLanguage) || speechLanguages[0];

  // Same source-locked lookup pattern as WordFormPage.jsx: searching by
  // word only ever fills the translation (+ definition/example), never
  // overwrites the field you searched from.
  const handleDictionaryLookup = async (source = 'word') => {
    const query = source === 'word' ? formData.word.trim() : formData.translation.trim();
    if (!query || isLookingUp) return;

    setIsLookingUp(true);
    setLookupError(null);

    try {
      const res = await lookupWordFromDictionary(
        query,
        source === 'word' ? 'word2translation' : 'translation2word',
        wordLangCode
      );
      if (res) {
        setFormData(prev => ({
          ...prev,
          ...(source === 'word' ? { translation: decodeHTMLEntities(res.translation || prev.translation) } : {}),
          ...(source === 'translation' ? { word: decodeHTMLEntities(res.word || prev.word) } : {}),
          partOfSpeech: res.partOfSpeech || prev.partOfSpeech,
          definition: decodeHTMLEntities(res.definition || prev.definition),
          example: decodeHTMLEntities(res.example || prev.example)
        }));
      } else {
        setLookupError('No translation found.');
      }
    } catch (err) {
      setLookupError(err.message || 'Something went wrong while searching.');
    } finally {
      setIsLookingUp(false);
    }
  };

  const lastAutoLookupRef = useRef('');
  useEffect(() => {
    const wordVal = formData.word.trim();
    const translationVal = formData.translation.trim();
    const hasExactlyOne = Boolean(wordVal) !== Boolean(translationVal);
    if (!hasExactlyOne || isLookingUp) return;
    const source = wordVal ? 'word' : 'translation';
    const key = `${source}:${(wordVal || translationVal).toLowerCase()}`;
    if (key === lastAutoLookupRef.current) return;
    const timer = setTimeout(() => {
      lastAutoLookupRef.current = key;
      handleDictionaryLookup(source);
    }, 700);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.word, formData.translation, isLookingUp]);

  const trimmedWord = formData.word.trim().toLowerCase();
  const isDuplicate = !isEdit && trimmedWord.length > 0
    && words.some(w => (w.word || '').trim().toLowerCase() === trimmedWord);

  const saveWord = async () => {
    setIsSubmitting(true);
    setSaveError(null);
    try {
      if (isEdit) {
        await updateWord(wordId, formData);
      } else {
        await addWord(formData);
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      if (!isEdit) {
        setFormData(EMPTY_FORM);
        wordInputRef.current?.focus();
      }
    } catch (err) {
      setSaveError('Failed to save word: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.word.trim() || !formData.translation.trim() || isSubmitting) return;
    await saveWord();
  };

  const setField = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

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
      className="ielts-word-form-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
    >
      <header className="iwfp-header">
        <button
          type="button"
          className="iwfp-back-btn"
          onClick={() => navigate(`/packs/${packId}`)}
          aria-label="Back to pack"
          title="Back to pack"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="iwfp-title-wrap">
          <h1>{isEdit ? 'Edit IELTS Word' : 'Add IELTS Word'}</h1>
          <p>{pack?.name || 'Pack'}</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="iwfp-form">
        <div className="iwfp-card">
          {saveSuccess && (
            <div className="iwfp-success-badge">
              <CheckCircle2 size={16} /> Word saved!
            </div>
          )}
          {lookupError && (
            <div className="iwfp-error-badge">
              <AlertTriangle size={16} /> {lookupError}
            </div>
          )}
          {saveError && (
            <div className="iwfp-error-badge">
              <AlertTriangle size={16} /> {saveError}
            </div>
          )}

          <div className="iwfp-grid">
            <div className="input-group">
              <label>{wordLangMeta.flag} {wordLangMeta.label} word *</label>
              <div className="iwfp-input-with-action">
                <input
                  ref={wordInputRef}
                  type="text"
                  className="input"
                  value={formData.word}
                  onChange={setField('word')}
                  placeholder={wordLangCode === 'en' ? 'e.g. Ubiquitous' : 'Enter the word'}
                  required
                  autoFocus
                  maxLength={300}
                />
                <button
                  type="button"
                  className="iwfp-input-lookup-btn"
                  onClick={() => handleDictionaryLookup('word')}
                  disabled={isLookingUp || !formData.word.trim()}
                  title="Look up this word and fill in the translation"
                >
                  {isLookingUp ? <IosSpinner size={16} /> : <Search size={16} />}
                </button>
              </div>
              {isDuplicate && (
                <div className="iwfp-inline-warning">
                  <AlertTriangle size={13} /> This word is already in this pack
                </div>
              )}
            </div>

            <div className="input-group">
              <label>🇺🇿 Uzbek translation *</label>
              <div className="iwfp-input-with-action">
                <input
                  type="text"
                  className="input"
                  value={formData.translation}
                  onChange={setField('translation')}
                  placeholder="Hamma joyda uchraydigan"
                  required
                  maxLength={300}
                />
                <button
                  type="button"
                  className="iwfp-input-lookup-btn"
                  onClick={() => handleDictionaryLookup('translation')}
                  disabled={isLookingUp || !formData.translation.trim()}
                  title="Look up this translation and fill in the word"
                >
                  {isLookingUp ? <IosSpinner size={16} /> : <Search size={16} />}
                </button>
              </div>
            </div>
          </div>

          <div className="iwfp-section">
            <div className="iwfp-section-title">IELTS details</div>

            <div className="input-group">
              <label>Definition</label>
              <textarea
                className="textarea"
                value={formData.definition}
                onChange={setField('definition')}
                placeholder="A clear definition - the main source for Definition Recall drills"
                rows={2}
                maxLength={1000}
              />
            </div>

            <div className="iwfp-grid">
              <div className="input-group">
                <label>Synonyms</label>
                <input
                  type="text"
                  className="input"
                  value={formData.synonyms}
                  onChange={setField('synonyms')}
                  placeholder="e.g. widespread, pervasive, omnipresent"
                  maxLength={500}
                />
              </div>

              <div className="input-group">
                <label>Collocations</label>
                <input
                  type="text"
                  className="input"
                  value={formData.collocations}
                  onChange={setField('collocations')}
                  placeholder="e.g. make a decision, come to a decision"
                  maxLength={500}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Word family</label>
              <div className="iwfp-family-grid">
                <input
                  type="text"
                  className="input"
                  value={formData.nounForm}
                  onChange={setField('nounForm')}
                  placeholder="Noun"
                  maxLength={150}
                />
                <input
                  type="text"
                  className="input"
                  value={formData.verbForm}
                  onChange={setField('verbForm')}
                  placeholder="Verb"
                  maxLength={150}
                />
                <input
                  type="text"
                  className="input"
                  value={formData.adjectiveForm}
                  onChange={setField('adjectiveForm')}
                  placeholder="Adjective"
                  maxLength={150}
                />
                <input
                  type="text"
                  className="input"
                  value={formData.adverbForm}
                  onChange={setField('adverbForm')}
                  placeholder="Adverb"
                  maxLength={150}
                />
              </div>
            </div>

            <div className="iwfp-grid">
              <div className="input-group">
                <label>Article</label>
                <select className="select" value={formData.article} onChange={setField('article')}>
                  {ARTICLE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Topic</label>
                <select className="select" value={formData.topic} onChange={setField('topic')}>
                  {TOPIC_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Example sentence</label>
              <textarea
                className="textarea"
                value={formData.example}
                onChange={setField('example')}
                placeholder="A sentence using the word"
                rows={2}
                maxLength={1500}
              />
            </div>

            <div className="iwfp-grid">
              <div className="input-group">
                <label>Part of speech</label>
                <select className="select" value={formData.partOfSpeech} onChange={setField('partOfSpeech')}>
                  {partOfSpeechOptions.map(pos => (
                    <option key={pos.value} value={pos.value}>{pos.label}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Notes</label>
                <input
                  type="text"
                  className="input"
                  value={formData.notes}
                  onChange={setField('notes')}
                  placeholder="Usage nuance, register, etc."
                  maxLength={800}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="iwfp-actions">
          <button
            type="submit"
            className="btn btn-primary iwfp-submit-btn"
            disabled={isSubmitting || !formData.word.trim() || !formData.translation.trim()}
          >
            <Save size={16} />
            <span>{isSubmitting ? 'Saving...' : (isEdit ? 'Save changes' : 'Save word')}</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
