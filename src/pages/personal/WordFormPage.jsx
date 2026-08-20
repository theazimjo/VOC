import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Save, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { usePacks } from '../../hooks/usePacks';
import { useWords } from '../../hooks/useWords';
import { partOfSpeechOptions, speechLanguages } from '../../utils/helpers';
import { lookupWordFromDictionary, fetchWordMeanings, toShortLangCode, decodeHTMLEntities } from '../../utils/dictionaryService';
import IosSpinner from '../../components/common/IosSpinner';
import './WordFormPage.css';

export default function WordFormPage() {
  const { packId, wordId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getPack } = usePacks();
  const { words, loading: wordsLoading, addWord, updateWord } = useWords('packs', packId);

  const [pack, setPack] = useState(null);
  const [packLoading, setPackLoading] = useState(true);
  const wordInputRef = useRef(null);

  const isEdit = Boolean(wordId);

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
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  // Set when Google Translate and MyMemory (the two independent lookup
  // sources) disagree on a result - lets the field's own hint offer the
  // other source's answer instead of silently trusting just one of them.
  const [lookupAlternate, setLookupAlternate] = useState(null); // { field: 'word'|'translation', text } | null
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);

  // Other senses of the word (e.g. "bank" the riverbank vs the financial
  // institution) - shown alongside the More details fields so picking one
  // can promote it into the Definition field instead of always keeping
  // whichever sense the dictionary happened to list first.
  const [otherMeanings, setOtherMeanings] = useState([]);
  const [meaningsLoading, setMeaningsLoading] = useState(false);
  const [meaningsChecked, setMeaningsChecked] = useState(false);
  const [selectedMeaningId, setSelectedMeaningId] = useState(null);
  const meaningsListRef = useRef(null);

  useEffect(() => {
    if (meaningsListRef.current) {
      meaningsListRef.current.scrollTop = 0;
    }
  }, [otherMeanings]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setIsLangMenuOpen(false);
      }
    };
    if (isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLangMenuOpen]);

  // Which language the translation field is filled in - remembered per pack
  // so switching once (e.g. to Russian for a pack you study in Russian)
  // sticks the next time this pack's "Add New Word" page is opened.
  const [translationLangCode, setTranslationLangCode] = useState(() => {
    try {
      return localStorage.getItem(`translationLang:${packId}`) || 'uz';
    } catch {
      return 'uz';
    }
  });
  const handleTranslationLangChange = (code) => {
    setTranslationLangCode(code);
    try {
      localStorage.setItem(`translationLang:${packId}`, code);
    } catch {
      // ignore storage errors (private mode, quota, etc.)
    }
    // Clear a translation that's already filled in so the auto-lookup effect
    // (which only fires while exactly one of word/translation is filled)
    // re-translates the existing word into the newly chosen language,
    // instead of silently leaving the old language's result behind.
    if (formData.word.trim() && !isEdit) {
      setFormData(prev => ({ ...prev, translation: '' }));
    }
  };

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
          example: decodeHTMLEntities(target.example || ''),
          notes: decodeHTMLEntities(target.notes || ''),
          partOfSpeech: target.partOfSpeech || 'noun',
          customSentence: decodeHTMLEntities(target.customSentence || '')
        });
        setShowMore(Boolean(target.definition || target.example || target.notes || target.customSentence));
      }
    }
  }, [isEdit, wordId, words]);

  const packLanguage = pack?.language || 'en-US';
  const wordLangCode = toShortLangCode(packLanguage);
  const wordLangMeta = speechLanguages.find(l => l.code === packLanguage) || speechLanguages[0];

  // Every speech language is a valid translation target except the pack's
  // own word language (translating a word into itself is meaningless).
  const translationLangOptions = speechLanguages.filter(l => toShortLangCode(l.code) !== wordLangCode);
  const translationLangMeta = speechLanguages.find(l => toShortLangCode(l.code) === translationLangCode)
    || speechLanguages.find(l => l.code === 'uz-UZ');

  // `source` says which field is being searched FROM - 'word' (the button
  // next to the word field, or auto-fill while only the word is typed) or
  // 'translation' (the mirror case). Only the *other* field ever gets
  // overwritten by the result: searching by word never touches what's
  // already in the translation field's own source, and vice versa, so
  // hand-editing one field and then triggering a lookup from the other
  // can't clobber an edit you just made.
  // Fetches every sense of `wordText` (not just the one already dropped into
  // the Definition field) so the "Other meanings" panel has something to show.
  const loadMeanings = async (wordText) => {
    const trimmed = (wordText || '').trim();
    setSelectedMeaningId(null);
    if (!trimmed) {
      setOtherMeanings([]);
      setMeaningsChecked(false);
      return;
    }
    setMeaningsLoading(true);
    try {
      const meanings = await fetchWordMeanings(trimmed, wordLangCode, translationLangCode);
      setOtherMeanings(meanings.map((m, i) => ({ ...m, id: `${trimmed.toLowerCase()}-${i}` })));
    } catch {
      setOtherMeanings([]);
    } finally {
      setMeaningsChecked(true);
      setMeaningsLoading(false);
    }
  };

  const handleDictionaryLookup = async (source = 'word') => {
    const query = source === 'word' ? formData.word.trim() : formData.translation.trim();
    if (!query || isLookingUp) return;

    setIsLookingUp(true);
    setLookupError(null);

    try {
      const res = await lookupWordFromDictionary(
        query,
        source === 'word' ? 'word2translation' : 'translation2word',
        wordLangCode,
        translationLangCode
      );
      if (res) {
        setFormData(prev => ({
          ...prev,
          ...(source === 'word' ? { translation: decodeHTMLEntities(res.translation || prev.translation) } : {}),
          ...(source === 'translation' ? { word: decodeHTMLEntities(res.word || prev.word) } : {}),
          partOfSpeech: res.partOfSpeech || 'noun',
          definition: decodeHTMLEntities(res.definition || ''),
          example: decodeHTMLEntities(res.example || '')
        }));

        const altText = source === 'word' ? res.alternateTranslation : res.alternateWord;
        setLookupAlternate(altText ? { field: source === 'word' ? 'translation' : 'word', text: altText } : null);
        const meaningWord = source === 'word' ? query : decodeHTMLEntities(res.word || '');
        loadMeanings(meaningWord);
      } else {
        setLookupError('No translation found.');
        setLookupAlternate(null);
        setFormData(prev => ({
          ...prev,
          definition: '',
          example: ''
        }));
        if (source === 'word') loadMeanings(query);
      }
    } catch (err) {
      setLookupError(err.message || 'Something went wrong while searching.');
    } finally {
      setIsLookingUp(false);
    }
  };

  // The card the user tapped becomes the word's main translation (e.g.
  // picking the "verb" sense of "book" swaps the translation field from
  // "kitob" to "band qilmoq") and is pulled to the top of the list, since
  // that's now "the" meaning being used, instead of just sitting there as a
  // passive suggestion.
  const handleSelectMeaning = (meaning) => {
    setFormData(prev => ({
      ...prev,
      translation: meaning.translation,
      partOfSpeech: partOfSpeechOptions.some(o => o.value === meaning.partOfSpeech) ? meaning.partOfSpeech : prev.partOfSpeech,
      ...(meaning.definition ? { definition: meaning.definition } : {}),
      ...(meaning.example ? { example: meaning.example } : {})
    }));

    setSelectedMeaningId(meaning.id);
    setOtherMeanings(prev => {
      const idx = prev.findIndex(m => m.id === meaning.id);
      if (idx <= 0) return prev;
      const copy = [...prev];
      const [item] = copy.splice(idx, 1);
      copy.unshift(item);
      return copy;
    });
  };

  // Auto-fills the moment the user stops typing whichever of the two
  // fields they filled in first - word or translation - so neither
  // direction needs a click. Fires only while exactly one of the two is
  // filled (the other is what's being looked up), keyed on source+value so
  // a lookup that comes back empty doesn't refire every 700ms unchanged.
  const lastAutoLookupRef = useRef('');
  useEffect(() => {
    const wordVal = formData.word.trim();
    const translationVal = formData.translation.trim();
    const hasExactlyOne = Boolean(wordVal) !== Boolean(translationVal);
    if (!hasExactlyOne || isLookingUp) return;
    const source = wordVal ? 'word' : 'translation';
    // Keyed on the target language too, so switching the translation
    // language while the word field is already filled re-triggers a lookup
    // into the newly selected language instead of leaving a stale result.
    const key = `${source}:${(wordVal || translationVal).toLowerCase()}:${translationLangCode}`;
    if (key === lastAutoLookupRef.current) return;
    const timer = setTimeout(() => {
      lastAutoLookupRef.current = key;
      handleDictionaryLookup(source);
    }, 700);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.word, formData.translation, isLookingUp, translationLangCode]);

  const [isMeaningsDropdownOpen, setIsMeaningsDropdownOpen] = useState(false);
  const meaningsDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (meaningsDropdownRef.current && !meaningsDropdownRef.current.contains(e.target)) {
        setIsMeaningsDropdownOpen(false);
      }
    };
    if (isMeaningsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMeaningsDropdownOpen]);

  // Everyday duplicate check...
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
        setFormData({
          word: '', translation: '', definition: '', example: '',
          notes: '', partOfSpeech: 'noun', customSentence: ''
        });
        setShowMore(false);
        setLookupAlternate(null);
        setOtherMeanings([]);
        setMeaningsChecked(false);
        setSelectedMeaningId(null);
        lastAutoLookupRef.current = '';
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
    if (pack?.name === 'Irregular Verbs') return;
    await saveWord();
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
      className="word-form-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
    >
      {/* Top Header */}
      <header className="wfp-header">
        <button
          type="button"
          className="wfp-back-btn"
          onClick={() => navigate(`/packs/${packId}`)}
          aria-label="Back to pack"
          title="Back to pack"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="wfp-title-wrap">
          <h1>{isEdit ? 'Edit Word' : 'Add New Word'}</h1>
          <p>{pack?.name || 'Pack'}</p>
        </div>
      </header>

      {/* Main Form Body */}
      <form onSubmit={handleSubmit} className="wfp-form">
        <div className="wfp-card">
          {saveSuccess && (
            <div className="wfp-success-badge">
              <CheckCircle2 size={16} /> Word saved!
            </div>
          )}
          {lookupError && (
            <div className="wfp-error-badge">
              <AlertTriangle size={16} /> {lookupError}
            </div>
          )}
          {saveError && (
            <div className="wfp-error-badge">
              <AlertTriangle size={16} /> {saveError}
            </div>
          )}

          <div className="wfp-grid">
            <div className="input-group">
              <label>{wordLangMeta.flag} {wordLangMeta.label} word *</label>
              <div className="wfp-input-with-action">
                <input
                  ref={wordInputRef}
                  type="text"
                  className="input"
                  value={formData.word}
                  onChange={e => {
                    const val = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      word: val,
                      ...(val.trim() !== prev.word.trim() ? { definition: '', example: '' } : {})
                    }));
                    setLookupAlternate(prev => (prev?.field === 'word' ? null : prev));
                    if (val.trim().toLowerCase() !== formData.word.trim().toLowerCase()) {
                      setOtherMeanings([]);
                      setMeaningsChecked(false);
                      setSelectedMeaningId(null);
                    }
                  }}
                  placeholder={wordLangCode === 'en' ? "e.g. Serendipity" : "Enter the word"}
                  required
                  autoFocus
                  maxLength={300}
                />
                <button
                  type="button"
                  className="wfp-input-lookup-btn"
                  onClick={() => handleDictionaryLookup('word')}
                  disabled={isLookingUp || !formData.word.trim()}
                  title="Look up this word and fill in the translation"
                >
                  {isLookingUp ? <IosSpinner size={16} /> : <Search size={16} />}
                </button>
              </div>
              {isDuplicate && (
                <div className="wfp-inline-warning">
                  <AlertTriangle size={13} /> This word is already in this pack
                </div>
              )}

            </div>

            <div className="input-group">
              <div className="wfp-lang-picker-header" ref={langMenuRef}>
                <button
                  type="button"
                  className={`wfp-lang-picker-btn ${isLangMenuOpen ? 'active' : ''}`}
                  onClick={() => setIsLangMenuOpen(prev => !prev)}
                >
                  <span className="wfp-lang-flag">{translationLangMeta.flag}</span>
                  <span>{translationLangMeta.label} translation</span>
                  <ChevronDown size={14} className={`wfp-lang-picker-icon ${isLangMenuOpen ? 'open' : ''}`} />
                </button>

                {isLangMenuOpen && (
                  <div className="wfp-lang-dropdown">
                    {translationLangOptions.map(l => {
                      const code = toShortLangCode(l.code);
                      const isSelected = code === translationLangCode;
                      return (
                        <button
                          key={l.code}
                          type="button"
                          className={`wfp-lang-option ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            handleTranslationLangChange(code);
                            setIsLangMenuOpen(false);
                          }}
                        >
                          <span className="wfp-lang-option-flag">{l.flag}</span>
                          <span className="wfp-lang-option-label">{l.label}</span>
                          {isSelected && <span className="wfp-lang-option-dot" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="wfp-input-with-action">
                <input
                  type="text"
                  className="input"
                  value={formData.translation}
                  onChange={e => {
                    const val = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      translation: val,
                      ...(val.trim() !== prev.translation.trim() ? { definition: '', example: '' } : {})
                    }));
                    setLookupAlternate(prev => (prev?.field === 'translation' ? null : prev));
                  }}
                  placeholder="Enter the translation"
                  required
                  maxLength={300}
                />
                <button
                  type="button"
                  className="wfp-input-lookup-btn"
                  onClick={() => handleDictionaryLookup('translation')}
                  disabled={isLookingUp || !formData.translation.trim()}
                  title="Look up this translation and fill in the word"
                >
                  {isLookingUp ? <IosSpinner size={16} /> : <Search size={16} />}
                </button>
              </div>

            </div>
          </div>

          {/* Symmetrical 2-column secondary row: More details (left) & Other meanings dropdown picker (right) */}
          <div className="wfp-secondary-row">
            <div className="wfp-more-toggle">
              <button
                type="button"
                className="btn-more-options-page"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                <span>{showMore ? 'Show less' : 'More details (definition, example, etc.)'}</span>
              </button>
            </div>

            <div className="wfp-compact-meanings" ref={meaningsDropdownRef}>
                {meaningsLoading ? (
                  <div className="wfp-compact-loading">
                    <IosSpinner size={14} />
                    <span>Looking up meanings...</span>
                  </div>
                ) : otherMeanings.length > 0 ? (
                  <div className="wfp-compact-picker-wrap">
                    <button
                      type="button"
                      className={`wfp-compact-btn ${isMeaningsDropdownOpen ? 'active' : ''}`}
                      onClick={() => setIsMeaningsDropdownOpen(prev => !prev)}
                    >
                      <span className="wfp-compact-title">Other meanings:</span>
                      {otherMeanings[0].partOfSpeech && (
                        <span className="wfp-compact-pos">{otherMeanings[0].partOfSpeech}</span>
                      )}
                      <span className="wfp-compact-preview">{otherMeanings[0].translation}</span>
                      {otherMeanings.length > 1 && (
                        <span className="wfp-compact-count">+{otherMeanings.length - 1}</span>
                      )}
                      <ChevronDown size={14} className={`wfp-compact-chevron ${isMeaningsDropdownOpen ? 'open' : ''}`} />
                    </button>

                    {isMeaningsDropdownOpen && (
                      <div className="wfp-meanings-dropdown">
                        <div className="wfp-meanings-dropdown-header">
                          <span>Select a meaning to set as translation</span>
                        </div>
                        <div className="wfp-meanings-dropdown-list">
                          {otherMeanings.map(meaning => (
                            <button
                              type="button"
                              key={meaning.id}
                              className={`wfp-meaning-option ${selectedMeaningId === meaning.id ? 'selected' : ''}`}
                              onClick={() => {
                                handleSelectMeaning(meaning);
                                setIsMeaningsDropdownOpen(false);
                              }}
                            >
                              <div className="wfp-meaning-option-top">
                                {meaning.partOfSpeech && <span className="wfp-meaning-pos">{meaning.partOfSpeech}</span>}
                                <span className="wfp-meaning-option-trans">{meaning.translation}</span>
                                {selectedMeaningId === meaning.id && <Check size={14} className="wfp-meaning-check" />}
                              </div>
                              {meaning.definition && <div className="wfp-meaning-option-def">{meaning.definition}</div>}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : meaningsChecked ? (
                  <div className="wfp-compact-disabled">No other meanings found</div>
                ) : (
                  <div className="wfp-compact-disabled">Other meanings (look up a word)</div>
                )}
              </div>
            </div>

          {showMore && (
            <div className="wfp-more-fields">
              <div className="input-group">
                <label>Part of speech</label>
                <select
                  className="select"
                  value={formData.partOfSpeech}
                  onChange={e => setFormData({ ...formData, partOfSpeech: e.target.value })}
                >
                  {partOfSpeechOptions.map(pos => (
                    <option key={pos.value} value={pos.value}>{pos.label}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Definition</label>
                <input
                  type="text"
                  className="input"
                  value={formData.definition}
                  onChange={e => setFormData({ ...formData, definition: e.target.value })}
                  placeholder="The word's definition or explanation"
                  maxLength={1000}
                />
              </div>

              <div className="input-group">
                <label>Example sentence</label>
                <textarea
                  className="textarea"
                  value={formData.example}
                  onChange={e => setFormData({ ...formData, example: e.target.value })}
                  placeholder="A sentence using the word"
                  rows={3}
                  maxLength={1500}
                />
              </div>

              <div className="input-group">
                <label>Your own sentence</label>
                <textarea
                  className="textarea"
                  value={formData.customSentence}
                  onChange={e => setFormData({ ...formData, customSentence: e.target.value })}
                  placeholder="Write your own sentence to move the word into active memory"
                  rows={3}
                  maxLength={1500}
                />
              </div>

              <div className="input-group">
                <label>Notes</label>
                <input
                  type="text"
                  className="input"
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Synonyms, antonyms, or other notes"
                  maxLength={800}
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action Footer */}
        <div className="wfp-actions">
          <button
            type="submit"
            className="btn btn-primary wfp-submit-btn"
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
