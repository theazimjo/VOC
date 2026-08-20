import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Check, ChevronDown, Volume2 } from 'lucide-react';
import { speechLanguages, speakWord } from '../../utils/helpers';
import { lookupWordFromDictionary, toShortLangCode } from '../../utils/dictionaryService';
import IosSpinner from '../common/IosSpinner';
import './WordTapPopover.css';

const POPOVER_WIDTH = 280;
const POPOVER_GAP = 10;

// Clamps the popover's position so it always stays fully on-screen,
// anchored as close as possible to the tapped word's bounding rect.
function computePosition(anchorRect) {
  if (!anchorRect) return { left: 0, top: 0, openUp: false };
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let left = anchorRect.left + anchorRect.width / 2 - POPOVER_WIDTH / 2;
  left = Math.max(POPOVER_GAP, Math.min(left, vw - POPOVER_WIDTH - POPOVER_GAP));

  const spaceBelow = vh - anchorRect.bottom;
  const openUp = spaceBelow < 260 && anchorRect.top > 260;

  // Anchored via `top` (growing downward) or `bottom` (growing upward) so no
  // rendered-height measurement is needed to keep the popover on-screen.
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
  onAdd,
  onClose
}) {
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
  const [isLoading, setIsLoading] = useState(true);
  const [lookupError, setLookupError] = useState(false);
  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved
  const cancelledRef = useRef(false);

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

  // Pronounce the tapped word/phrase as soon as the popover opens for it -
  // hearing it is often the first thing you want, before the translation
  // even loads.
  useEffect(() => {
    speakWord(word, wordLocale);
  }, [word, wordLocale]);

  useEffect(() => {
    cancelledRef.current = false;
    setLookupError(false);

    // If word already exists in pack/data, display its data directly without searching internet dictionary API
    if (existingWord && existingWord.translation) {
      setTranslation(existingWord.translation);
      setAlternate('');
      setDefinition(existingWord.definition || '');
      setPartOfSpeech(existingWord.partOfSpeech || '');
      setExample(existingWord.example || '');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setTranslation('');
    setAlternate('');
    setDefinition('');
    setPartOfSpeech('');
    setExample('');
    lookupWordFromDictionary(word, 'word2translation', wordLangCode, translationLangCode)
      .then(res => {
        if (cancelledRef.current) return;
        if (res?.translation) {
          setTranslation(res.translation);
          setAlternate(res.alternateTranslation || '');
          setDefinition(res.definition || '');
          setPartOfSpeech(res.partOfSpeech || '');
          setExample(res.example || '');
        } else {
          setLookupError(true);
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
    } catch {
      // ignore storage errors
    }
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

  return (
    <>
      <motion.div
        className="wtp-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="wtp-popover"
        style={{
          left: pos.left,
          top: pos.openUp ? undefined : pos.top,
          bottom: pos.openUp ? pos.bottom : undefined,
          transformOrigin: pos.openUp ? 'bottom center' : 'top center'
        }}
        initial={{ opacity: 0, scale: 0.92, y: pos.openUp ? 6 : -6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.15 }}
        onClick={e => e.stopPropagation()}
      >
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
          <div className="wtp-word-row">
            <span className="wtp-word">{word}</span>
            <button
              type="button"
              className="wtp-speak-btn"
              onClick={() => speakWord(word, wordLocale)}
              aria-label="Pronounce"
              title="Pronounce"
            >
              <Volume2 size={14} />
            </button>
          </div>
          {isLoading ? (
            <div className="wtp-loading"><IosSpinner size={16} /></div>
          ) : lookupError ? (
            <div className="wtp-error">Tarjima topilmadi</div>
          ) : (
            <>
              <div className="wtp-translation">{translation}</div>
              {partOfSpeech && <div className="wtp-pos">{partOfSpeech}</div>}
              {definition && <div className="wtp-definition">{definition}</div>}
              {alternate && (
                <button
                  type="button"
                  className="wtp-alt-hint"
                  onClick={() => setTranslation(alternate)}
                >
                  Boshqa manba: <strong>{alternate}</strong>
                </button>
              )}
            </>
          )}
        </div>

        {existingWord ? (
          <div className="wtp-existing-note">
            Bu so'z allaqachon to'plamda — qo'shsangiz, bilish darajasi boshiga qaytadi.
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
            <><Check size={15} /> Qo'shildi!</>
          ) : saveState === 'saving' ? (
            <IosSpinner size={16} />
          ) : (
            <><Plus size={15} /> {existingWord ? "Qayta qo'shish" : 'Shu bobga qo\'shish'}</>
          )}
        </button>
      </motion.div>
    </>
  );
}
