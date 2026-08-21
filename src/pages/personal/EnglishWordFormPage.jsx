import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Save, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { usePacks } from '../../hooks/usePacks';
import { useLanguage } from '../../contexts/LanguageContext';
import { useWords } from '../../hooks/useWords';
import { partOfSpeechOptions } from '../../utils/helpers';
import { lookupEnglishDefinition, decodeHTMLEntities } from '../../utils/dictionaryService';
import IosSpinner from '../../components/common/IosSpinner';
import './EnglishWordFormPage.css';

const EMPTY_FORM = {
  word: '',
  definition: '',
  translation: '',
  synonyms: '',
  example: '',
  partOfSpeech: 'noun',
  notes: '',
};

// English-monolingual counterpart of WordFormPage.jsx / IeltsWordFormPage.jsx
// - a separate page so the translation-first flow every other pack type
// relies on stays completely untouched. Here the ENGLISH DEFINITION is the
// required field alongside the word itself; the Uzbek translation is kept
// only as an optional reference field, never required and never the focus -
// the whole point of this pack type is learning English words through their
// English meaning, not through translation.
export default function EnglishWordFormPage() {
  const { packId, wordId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
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
          definition: decodeHTMLEntities(target.definition || ''),
          translation: decodeHTMLEntities(target.translation || ''),
          synonyms: decodeHTMLEntities(target.synonyms || ''),
          example: decodeHTMLEntities(target.example || ''),
          partOfSpeech: target.partOfSpeech || 'noun',
          notes: decodeHTMLEntities(target.notes || ''),
        });
      }
    }
  }, [isEdit, wordId, words]);

  // Search by the English word and fill in its RAW English definition (+
  // example/part of speech) - deliberately uses lookupEnglishDefinition, not
  // the shared lookupWordFromDictionary(), because that one translates the
  // definition into Uzbek before returning it, which would defeat the whole
  // point of a monolingual pack.
  const handleDictionaryLookup = async () => {
    const query = formData.word.trim();
    if (!query || isLookingUp) return;

    setIsLookingUp(true);
    setLookupError(null);

    try {
      const res = await lookupEnglishDefinition(query);
      if (res && res.definition) {
        setFormData(prev => ({
          ...prev,
          definition: decodeHTMLEntities(res.definition || prev.definition),
          example: decodeHTMLEntities(res.example || prev.example),
          partOfSpeech: res.partOfSpeech || prev.partOfSpeech,
        }));
      } else {
        setLookupError('No English definition found for this word.');
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
    if (!wordVal || formData.definition.trim() || isLookingUp) return;
    const key = wordVal.toLowerCase();
    if (key === lastAutoLookupRef.current) return;
    const timer = setTimeout(() => {
      lastAutoLookupRef.current = key;
      handleDictionaryLookup();
    }, 700);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.word, formData.definition, isLookingUp]);

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
    if (!formData.word.trim() || !formData.definition.trim() || isSubmitting) return;
    await saveWord();
  };

  const setField = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

  if (packLoading || wordsLoading) {
    return (
      <div className="ios-activity-indicator" style={{ marginTop: '100px' }}>
        <IosSpinner />
        <span>{t('wordForm.loading')}</span>
      </div>
    );
  }

  return (
    <motion.div
      className="english-word-form-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
    >
      <header className="ewfp-header">
        <button
          type="button"
          className="ewfp-back-btn"
          onClick={() => navigate(`/packs/${packId}`)}
          aria-label="Back to pack"
          title="Back to pack"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="ewfp-title-wrap">
          <h1>{isEdit ? t('englishForm.editEnglishWord') : t('englishForm.addEnglishWord')}</h1>
          <p>{pack?.name || t('wordForm.pack')}</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="ewfp-form">
        <div className="ewfp-card">
          {saveSuccess && (
            <div className="ewfp-success-badge">
              <CheckCircle2 size={16} /> {t('wordForm.wordSaved')}
            </div>
          )}
          {lookupError && (
            <div className="ewfp-error-badge">
              <AlertTriangle size={16} /> {lookupError}
            </div>
          )}
          {saveError && (
            <div className="ewfp-error-badge">
              <AlertTriangle size={16} /> {saveError}
            </div>
          )}

          <div className="input-group">
            <label>{t('englishForm.englishWordLabel')}</label>
            <div className="ewfp-input-with-action">
              <input
                ref={wordInputRef}
                type="text"
                className="input"
                value={formData.word}
                onChange={setField('word')}
                placeholder="e.g. Ubiquitous"
                required
                autoFocus
                maxLength={300}
              />
              <button
                type="button"
                className="ewfp-input-lookup-btn"
                onClick={handleDictionaryLookup}
                disabled={isLookingUp || !formData.word.trim()}
                title={t('englishForm.lookupTitleEnglish')}
              >
                {isLookingUp ? <IosSpinner size={16} /> : <Search size={16} />}
              </button>
            </div>
            {isDuplicate && (
              <div className="ewfp-inline-warning">
                <AlertTriangle size={13} /> {t('wordForm.alreadyInPack')}
              </div>
            )}
          </div>

          <div className="input-group">
            <label>{t('englishForm.defLabelEnglish')}</label>
            <textarea
              className="textarea"
              value={formData.definition}
              onChange={setField('definition')}
              placeholder={t('englishForm.defPlaceholderEnglish')}
              rows={3}
              required
              maxLength={1000}
            />
          </div>

          <div className="input-group">
            <label>{t('wordForm.exampleSentence')}</label>
            <textarea
              className="textarea"
              value={formData.example}
              onChange={setField('example')}
              placeholder={t('englishForm.examplePlaceholderEnglish')}
              rows={2}
              maxLength={1500}
            />
          </div>

          <div className="ewfp-grid">
            <div className="input-group">
              <label>{t('wordCard.synonyms')}</label>
              <input
                type="text"
                className="input"
                value={formData.synonyms}
                onChange={setField('synonyms')}
                placeholder="e.g. widespread, pervasive, everywhere"
                maxLength={500}
              />
            </div>

            <div className="input-group">
              <label>{t('wordForm.partOfSpeech')}</label>
              <select className="select" value={formData.partOfSpeech} onChange={setField('partOfSpeech')}>
                {partOfSpeechOptions.map(pos => (
                  <option key={pos.value} value={pos.value}>{pos.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="ewfp-section">
            <div className="ewfp-section-title">{t('englishForm.optRefTitle')}</div>
            <div className="ewfp-grid">
              <div className="input-group">
                <label>{t('englishForm.uzbekTranslationOptional')}</label>
                <input
                  type="text"
                  className="input"
                  value={formData.translation}
                  onChange={setField('translation')}
                  placeholder={t('englishForm.uzbekRefPlaceholder')}
                  maxLength={300}
                />
              </div>
              <div className="input-group">
                <label>{t('wordForm.notes')}</label>
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

        <div className="ewfp-actions">
          <button
            type="submit"
            className="btn btn-primary ewfp-submit-btn"
            disabled={isSubmitting || !formData.word.trim() || !formData.definition.trim()}
          >
            <Save size={16} />
            <span>{isSubmitting ? t('wordForm.saving') : (isEdit ? t('wordForm.saveChanges') : t('wordForm.saveWord'))}</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
