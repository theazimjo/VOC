import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Package, ChevronRight } from 'lucide-react';
import { usePacks } from '../../hooks/usePacks';
import { getMasteryLevel } from '../../utils/sm2';
import './GlobalSearch.css';

const MAX_WORD_RESULTS = 20;
const MAX_PACK_RESULTS = 5;

export default function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { allWords, packs } = usePacks();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const trimmedQuery = query.trim().toLowerCase();

  const wordResults = useMemo(() => {
    if (!trimmedQuery) return [];
    return allWords
      .filter(w =>
        w.word?.toLowerCase().includes(trimmedQuery) ||
        w.translation?.toLowerCase().includes(trimmedQuery)
      )
      .slice(0, MAX_WORD_RESULTS);
  }, [allWords, trimmedQuery]);

  const packResults = useMemo(() => {
    if (!trimmedQuery) return [];
    return packs
      .filter(p => p.name?.toLowerCase().includes(trimmedQuery))
      .slice(0, MAX_PACK_RESULTS);
  }, [packs, trimmedQuery]);

  const hasResults = wordResults.length > 0 || packResults.length > 0;

  const goToPack = (packId) => {
    navigate(`/packs/${packId}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="global-search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <motion.div
            className="global-search-sheet"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className="global-search-input-row">
              <Search size={18} strokeWidth={2.2} className="global-search-icon" />
              <input
                ref={inputRef}
                type="text"
                className="global-search-input"
                placeholder="So'z, tarjima yoki to'plam qidiring..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button className="global-search-close" onClick={onClose} aria-label="Yopish">
                <X size={18} strokeWidth={2.2} />
              </button>
            </div>

            <div className="global-search-results">
              {!trimmedQuery && (
                <div className="global-search-empty">Qidirish uchun yozishni boshlang</div>
              )}

              {trimmedQuery && !hasResults && (
                <div className="global-search-empty">Hech narsa topilmadi</div>
              )}

              {packResults.length > 0 && (
                <div className="global-search-section">
                  <div className="global-search-section-title">To'plamlar</div>
                  {packResults.map(pack => (
                    <button
                      key={pack.id}
                      className="global-search-pack-item"
                      onClick={() => goToPack(pack.id)}
                    >
                      <div className="global-search-pack-icon">
                        {pack.icon ? pack.icon : <Package size={16} strokeWidth={2.2} />}
                      </div>
                      <div className="global-search-pack-info">
                        <div className="global-search-pack-name">{pack.name}</div>
                        <div className="global-search-pack-count">{pack.wordCount || 0} ta so'z</div>
                      </div>
                      <ChevronRight size={16} strokeWidth={2.3} className="global-search-chevron" />
                    </button>
                  ))}
                </div>
              )}

              {wordResults.length > 0 && (
                <div className="global-search-section">
                  <div className="global-search-section-title">So'zlar</div>
                  {wordResults.map(word => {
                    const masteryInfo = getMasteryLevel(word.mastery || 0);
                    return (
                      <button
                        key={word.id}
                        className="global-search-word-item"
                        onClick={() => goToPack(word.packId)}
                      >
                        <div
                          className="global-search-word-icon"
                          style={{ backgroundColor: `${masteryInfo.color}15`, color: masteryInfo.color }}
                        >
                          {masteryInfo.icon}
                        </div>
                        <div className="global-search-word-info">
                          <div className="global-search-word-text">{word.word}</div>
                          <div className="global-search-word-translation">{word.translation}</div>
                        </div>
                        <div className="global-search-word-source">{word.source}</div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
