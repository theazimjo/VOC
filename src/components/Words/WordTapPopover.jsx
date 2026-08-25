import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Check, ChevronDown, Volume2, BookOpen, Sparkles, Eye } from 'lucide-react';
import { speechLanguages, speakWord } from '../../utils/helpers';
import { lookupWordFromDictionary, fetchWordMeanings, toShortLangCode } from '../../utils/dictionaryService';
import { useLanguage } from '../../contexts/LanguageContext';
import IosSpinner from '../common/IosSpinner';
import './WordTapPopover.css';

const POPOVER_WIDTH = 300;
const POPOVER_GAP = 10;

function computePosition(anchorRect) {
  if (!anchorRect) return { left: 0, top: 0, openUp: false };
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let left = anchorRect.left + anchorRect.width / 2 - POPOVER_WIDTH / 2;
  left = Math.max(POPOVER_GAP, Math.min(left, vw - POPOVER_WIDTH - POPOVER_GAP));

  const spaceBelow = vh - anchorRect.bottom;
  const openUp = spaceBelow < 300 && anchorRect.top > 300;

  return openUp
    ? { left, bottom: vh - anchorRect.top + POPOVER_GAP, openUp: true }
    : { left, top: anchorRect.bottom + POPOVER_GAP, openUp: false };
}

export default function WordTapPopover({
  word,
  anchorRect,
  packId,
  wordLangCode,
  wordLocale,
  currentTopic,
  existingWords,
  isRecentlyViewed = false,
  contextSentence = '',
  onAdd,
  onClose
}) {
  const { t } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768);

  const [translationLangCode, setTranslationLangCode] = useState(() => {
    try {
      return localStorage.getItem(`translationLang:${packId}`) || 'uz';
    } catch {
      return 'uz';
    }
  });
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);

  const [translation, setTranslation] = useState('');
  const [alternate, setAlternate] = useState('');
  const [definition, setDefinition] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('');
  const [example, setExample] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [meanings, setMeanings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lookupError, setLookupError] = useState(false);
  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved
  const cancelledRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const langOptions = useMemo(
    () => speechLanguages.filter(l => toShortLangCode(l.code) !== wordLangCode),
    [wordLangCode]
  );
  const activeLangMeta = langOptions.find(l => toShortLangCode(l.code) === translationLangCode) || langOptions[0];

  const existingWord = useMemo(() => {
    const target = word.trim().toLowerCase();
    return (existingWords || []).find(w => (w.word || '').trim().toLowerCase() === target) || null;
  }, [word, existingWords]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setIsLangMenuOpen(false);
      }
    };
    if (isLangMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLangMenuOpen]);

  // Pronounce tapped word
  useEffect(() => {
    speakWord(word, wordLocale);
  }, [word, wordLocale]);

  useEffect(() => {
    cancelledRef.current = false;
    setLookupError(false);

    if (existingWord && existingWord.translation) {
      setTranslation(existingWord.translation);
      setAlternate('');
      setDefinition(existingWord.definition || '');
      setPartOfSpeech(existingWord.partOfSpeech || '');
      setExample(existingWord.example || '');
      setPhonetic(existingWord.phonetic || '');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setTranslation('');
    setAlternate('');
    setDefinition('');
    setPartOfSpeech('');
    setExample('');
    setPhonetic('');
    setMeanings([]);

    Promise.all([
      lookupWordFromDictionary(word, 'word2translation', wordLangCode, translationLangCode, contextSentence),
      fetchWordMeanings(word, wordLangCode, translationLangCode).catch(() => [])
    ])
      .then(([res, mList]) => {
        if (cancelledRef.current) return;
        if (res?.translation) {
          setTranslation(res.translation);
          setAlternate(res.alternateTranslation || '');
          setDefinition(res.definition || '');
          setPartOfSpeech(res.partOfSpeech || '');
          setExample(res.example || '');
          setPhonetic(res.phonetic || '');
        } else {
          setLookupError(true);
        }
        if (Array.isArray(mList)) {
          setMeanings(mList);
        }
      })
      .catch(() => { if (!cancelledRef.current) setLookupError(true); })
      .finally(() => { if (!cancelledRef.current) setIsLoading(false); });

    return () => { cancelledRef.current = true; };
  }, [word, wordLangCode, translationLangCode, existingWord]);

  const handleLangChange = (code) => {
    setTranslationLangCode(code);
    setIsLangMenuOpen(false);
    try {
      localStorage.setItem(`translationLang:${packId}`, code);
    } catch {}
  };

  const handleAdd = async () => {
    if (!translation || saveState !== 'idle') return;
    setSaveState('saving');
    try {
      await onAdd({ word, translation, definition, partOfSpeech, example, existingWord });
      setSaveState('saved');
      setTimeout(() => onClose(), 1200);
    } catch {
      setSaveState('idle');
    }
  };

  const pos = computePosition(anchorRect);

  const isSentence = useMemo(() => {
    const trimmed = (word || '').trim();
    return trimmed.includes(' ') || trimmed.length > 28;
  }, [word]);

  const displayMeanings = useMemo(() => {
    if (!meanings || meanings.length === 0 || isSentence) return [];
    const seen = new Set();
    const list = [];
    meanings.forEach(m => {
      const trans = (m.translation || '').trim();
      const key = trans.toLowerCase();
      const wordCount = trans.split(/\s+/).length;
      // Filter out long sentence explanations (> 3 words or > 28 chars)
      if (key && !seen.has(key) && wordCount <= 3 && trans.length <= 28) {
        seen.add(key);
        list.push(m);
      }
    });
    return list.slice(0, 5);
  }, [meanings, isSentence]);

  const handleSelectMeaning = (m) => {
    if (!m || !m.translation) return;
    setTranslation(m.translation);
    if (m.partOfSpeech) setPartOfSpeech(m.partOfSpeech);
    if (m.definition) setDefinition(m.definition);
  };

  return (
    <>
      <motion.div
        className={`wtp-backdrop ${isDesktop ? 'wtp-backdrop-desktop' : ''}`}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className={`wtp-popover ${isDesktop ? 'wtp-popover-desktop' : 'wtp-popover-mobile'}`}
        initial={
          isDesktop
            ? { opacity: 0, y: 24, scale: 0.95 }
            : { y: '100%', opacity: 0.8 }
        }
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={
          isDesktop
            ? { opacity: 0, y: 24, scale: 0.95 }
            : { y: '100%', opacity: 0 }
        }
        transition={
          isDesktop
            ? { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
            : { type: 'spring', damping: 30, stiffness: 350 }
        }
        onClick={e => e.stopPropagation()}
      >
        {!isDesktop && <div className="wtp-mobile-handle" />}

        <div className="wtp-top-row">
          <div className="wtp-lang-picker" ref={langMenuRef}>
            <button
              type="button"
              className={`wtp-lang-picker-btn ${isLangMenuOpen ? 'active' : ''}`}
              onClick={() => setIsLangMenuOpen(o => !o)}
            >
              <span>{activeLangMeta?.flag}</span>
              <span>{activeLangMeta?.label}</span>
              <ChevronDown size={13} className={`wtp-lang-picker-icon ${isLangMenuOpen ? 'open' : ''}`} />
            </button>
            {isLangMenuOpen && (
              <div className="wtp-lang-dropdown">
                {langOptions.map(l => {
                  const code = toShortLangCode(l.code);
                  const isSelected = code === translationLangCode;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      className={`wtp-lang-option ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleLangChange(code)}
                    >
                      <span>{l.flag}</span>
                      <span className="wtp-lang-option-label">{l.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <button type="button" className="wtp-close-btn" onClick={onClose} aria-label="Close">
            <X size={14} />
          </button>
        </div>

        <div className="wtp-body">
          {/* Main Word or Sentence Header */}
          <div className={`wtp-word-header ${isSentence ? 'wtp-sentence-header' : ''}`}>
            <div className="wtp-word-title-group">
              {isSentence ? (
                <span className="wtp-sentence-quote">“{word}”</span>
              ) : (
                <>
                  <span className="wtp-word">{word}</span>
                  {phonetic && <span className="wtp-phonetic">/{phonetic.replace(/^\/|\/$/g, '')}/</span>}
                </>
              )}
            </div>
            <button
              type="button"
              className="wtp-speak-btn"
              onClick={() => speakWord(word, wordLocale)}
              aria-label="Pronounce"
              title={isSentence ? "Read sentence aloud" : "Pronounce word"}
            >
              <Volume2 size={15} />
            </button>
          </div>

          {isLoading ? (
            <div className="wtp-loading">
              <IosSpinner size={18} />
              <span>Yuklanmoqda...</span>
            </div>
          ) : lookupError ? (
            <div className="wtp-error">{t('read.translationNotFound')}</div>
          ) : (
            <div className="wtp-content-scroll">
              {/* Primary Translation & Part of Speech */}
              <div className={`wtp-primary-translation-block ${isSentence ? 'wtp-sentence-translation-block' : ''}`}>
                <div className={`wtp-translation ${isSentence ? 'wtp-sentence-translation' : ''}`}>{translation}</div>
                {!isSentence && partOfSpeech && <span className="wtp-pos-badge">{partOfSpeech}</span>}
              </div>

              {/* Definition Section (Ma'nosi) */}
              {definition && (
                <div className="wtp-detail-card">
                  <div className="wtp-detail-header">
                    <BookOpen size={12} />
                    <span>{t('read.definitionLabel') || 'Ma\'nosi'}</span>
                  </div>
                  <p className="wtp-detail-text">{definition}</p>
                </div>
              )}

              {/* Example Sentence Section (Misol) */}
              {example && (
                <div className="wtp-detail-card wtp-detail-example">
                  <div className="wtp-detail-header">
                    <Sparkles size={12} />
                    <span>{t('read.exampleLabel') || 'Misol'}</span>
                  </div>
                  <p className="wtp-detail-text italic">"{example}"</p>
                </div>
              )}

              {/* Extra Senses / Meanings Section */}
              {displayMeanings.length > 0 && (
                <div className="wtp-detail-card wtp-detail-meanings">
                  <div className="wtp-detail-header">
                    <span>{t('read.otherMeaningsLabel') || 'Boshqa ma\'nolari'}</span>
                  </div>
                  <div className="wtp-meanings-list">
                    {displayMeanings.map((m, idx) => {
                      const isSelected = (translation || '').trim().toLowerCase() === (m.translation || '').trim().toLowerCase();
                      return (
                        <div
                          key={idx}
                          className={`wtp-meaning-row wtp-meaning-clickable ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSelectMeaning(m)}
                          title="Tanlash uchun bosing"
                        >
                          <div className="wtp-meaning-left">
                            {m.partOfSpeech && <span className="wtp-meaning-pos">{m.partOfSpeech}</span>}
                            <span className="wtp-meaning-trans">{m.translation}</span>
                          </div>
                          {isSelected && <Check size={14} className="wtp-meaning-check" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Cross-check Alternate Suggestion */}
              {alternate && (
                <button
                  type="button"
                  className="wtp-alt-hint"
                  onClick={() => setTranslation(alternate)}
                >
                  {t('read.altTranslation', { alt: alternate })}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer Target Chapter & Action Button */}
        <div className="wtp-footer-block">
          {isRecentlyViewed && !existingWord && (
            <div className="wtp-recent-note">
              <Eye size={12} /> <span>{t('read.recentlyViewedNote') || 'Yaqinda ko\'rgansan'}</span>
            </div>
          )}
          {existingWord ? (
            <div className="wtp-existing-note">
              {t('read.alreadyInPackNote')}
            </div>
          ) : (
            <div className="wtp-target-note">→ {currentTopic}</div>
          )}

          <button
            type="button"
            className={`wtp-add-btn ${saveState}`}
            onClick={handleAdd}
            disabled={!translation || saveState !== 'idle'}
          >
            {saveState === 'saved' ? (
              <><Check size={15} /> {t('read.addedBtn')}</>
            ) : saveState === 'saving' ? (
              <IosSpinner size={16} />
            ) : (
              <><Plus size={15} /> {existingWord ? t('read.reAddBtn') : t('read.addToChapterBtn')}</>
            )}
          </button>
        </div>
      </motion.div>
    </>
  );
}

