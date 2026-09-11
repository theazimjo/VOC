import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, CheckSquare, X, Trash2, Check } from 'lucide-react';
import WordCard from './WordCard';
import IosSpinner from '../common/IosSpinner';
import { useLanguage } from '../../contexts/LanguageContext';
import './WordList.css';

export default function WordList({ words, onEdit, onDelete, onBulkDelete, loading, readOnly, groupFn, language = 'en-US' }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(groupFn ? 'group' : 'date-desc');
  const { t } = useLanguage();

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedWordIds, setSelectedWordIds] = useState(new Set());
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);

  const longPressTimerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragModeRef = useRef('select'); // 'select' | 'deselect'
  const pointerStartPosRef = useRef({ x: 0, y: 0 });

  const toggleSelectWord = (wordId) => {
    setSelectedWordIds(prev => {
      const next = new Set(prev);
      if (next.has(wordId)) next.delete(wordId);
      else next.add(wordId);
      return next;
    });
  };

  const handleCardPointerDown = (wordId, e) => {
    if (readOnly) return;
    if (e.button && e.button !== 0) return;

    pointerStartPosRef.current = { x: e.clientX, y: e.clientY };

    if (isSelectionMode) {
      isDraggingRef.current = true;
      const isCurrentlySelected = selectedWordIds.has(wordId);
      dragModeRef.current = isCurrentlySelected ? 'deselect' : 'select';

      setSelectedWordIds(prev => {
        const next = new Set(prev);
        if (isCurrentlySelected) next.delete(wordId);
        else next.add(wordId);
        return next;
      });
    } else {
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = setTimeout(() => {
        if (navigator.vibrate) {
          try { navigator.vibrate(40); } catch { /* ignore */ }
        }
        setIsSelectionMode(true);
        setSelectedWordIds(new Set([wordId]));
        isDraggingRef.current = true;
        dragModeRef.current = 'select';
      }, 350);
    }
  };

  useEffect(() => {
    const handleWindowPointerMove = (e) => {
      if (longPressTimerRef.current) {
        const dist = Math.hypot(e.clientX - pointerStartPosRef.current.x, e.clientY - pointerStartPosRef.current.y);
        if (dist > 10) {
          clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
        }
      }

      if (isDraggingRef.current) {
        const elem = document.elementFromPoint(e.clientX, e.clientY);
        const cardElem = elem?.closest('.word-card[data-word-id]');
        if (cardElem) {
          const wordId = cardElem.getAttribute('data-word-id');
          if (wordId) {
            setSelectedWordIds(prev => {
              const next = new Set(prev);
              if (dragModeRef.current === 'select') {
                if (!next.has(wordId)) next.add(wordId);
              } else {
                if (next.has(wordId)) next.delete(wordId);
              }
              return next;
            });
          }
        }

        // Auto scroll near top or bottom edge of screen
        if (e.clientY < 70) {
          window.scrollBy({ top: -14, behavior: 'instant' });
        } else if (e.clientY > window.innerHeight - 70) {
          window.scrollBy({ top: 14, behavior: 'instant' });
        }
      }
    };

    const handleWindowPointerUp = () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
      isDraggingRef.current = false;
    };

    window.addEventListener('pointermove', handleWindowPointerMove);
    window.addEventListener('pointerup', handleWindowPointerUp);
    window.addEventListener('pointercancel', handleWindowPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerUp);
    };
  }, []);

  if (loading) {
    return (
      <div className="ios-activity-indicator">
        <IosSpinner />
        <span>{t('wordList.loading')}</span>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📝</div>
        <h3>{t('wordList.noWords')}</h3>
        <p>{t('wordList.noWordsHint')}</p>
      </div>
    );
  }

  const filteredWords = words.filter(w => 
    w.word.toLowerCase().includes(search.toLowerCase()) || 
    w.translation.toLowerCase().includes(search.toLowerCase())
  );

  const sortedWords = [...filteredWords].sort((a, b) => {
    if (sortBy === 'group' && groupFn) {
      const diff = groupFn(a.word).id - groupFn(b.word).id;
      return diff !== 0 ? diff : a.word.localeCompare(b.word);
    }
    if (sortBy === 'date-desc') return new Date(b.addedAt || 0) - new Date(a.addedAt || 0);
    if (sortBy === 'date-asc') return new Date(a.addedAt || 0) - new Date(b.addedAt || 0);
    if (sortBy === 'alpha-asc') return a.word.localeCompare(b.word);
    if (sortBy === 'mastery-asc') return (a.mastery || 0) - (b.mastery || 0);
    if (sortBy === 'mastery-desc') return (b.mastery || 0) - (a.mastery || 0);
    return 0;
  });

  const handleToggleSelectAll = () => {
    const visibleIds = sortedWords.map(w => w.id);
    const allSelected = visibleIds.every(id => selectedWordIds.has(id));

    if (allSelected) {
      setSelectedWordIds(prev => {
        const next = new Set(prev);
        visibleIds.forEach(id => next.delete(id));
        return next;
      });
    } else {
      setSelectedWordIds(prev => {
        const next = new Set(prev);
        visibleIds.forEach(id => next.add(id));
        return next;
      });
    }
  };

  const handleConfirmBulkDelete = async () => {
    const idsArray = Array.from(selectedWordIds);
    if (idsArray.length === 0) return;
    setShowBulkDeleteConfirm(false);
    setIsSelectionMode(false);
    setSelectedWordIds(new Set());
    if (onBulkDelete) {
      await onBulkDelete(idsArray);
    }
  };

  let lastGroupId = null;
  const isAllVisibleSelected = sortedWords.length > 0 && sortedWords.every(w => selectedWordIds.has(w.id));

  return (
    <div>
      {isSelectionMode && (
        <motion.div
          className="word-selection-toolbar"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.18 }}
        >
          <div className="word-selection-left">
            <button
              type="button"
              className="btn-close-selection"
              onClick={() => {
                setIsSelectionMode(false);
                setSelectedWordIds(new Set());
              }}
              title={t('wordList.cancelSelect')}
            >
              <X size={18} />
            </button>

            <span className="word-selection-count">
              {t('wordList.selectedCount', { count: selectedWordIds.size })}
            </span>
          </div>

          <div className="word-selection-actions">
            <button
              type="button"
              className="btn-select-all"
              onClick={handleToggleSelectAll}
            >
              <Check size={14} />
              <span>{isAllVisibleSelected ? t('wordList.deselectAll') : t('wordList.selectAll')}</span>
            </button>

            <button
              type="button"
              className="btn-bulk-delete"
              disabled={selectedWordIds.size === 0}
              onClick={() => setShowBulkDeleteConfirm(true)}
            >
              <Trash2 size={15} />
              <span>{t('wordList.deleteSelected', { count: selectedWordIds.size })}</span>
            </button>
          </div>
        </motion.div>
      )}

      <div className="word-list-controls">
        <div className="search-bar word-list-search">
          <span className="search-icon"><Search size={16} strokeWidth={2.4} /></span>
          <input 
            type="text" 
            className="input" 
            placeholder={t('wordList.searchPlaceholder')} 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="word-list-filters">
          <select className="select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            {groupFn && <option value="group">{t('wordList.byGroup')}</option>}
            <option value="date-desc">{t('wordList.dateDesc')}</option>
            <option value="date-asc">{t('wordList.dateAsc')}</option>
            <option value="alpha-asc">{t('wordList.alphaAsc')}</option>
            <option value="mastery-desc">{t('wordList.masteryDesc')}</option>
            <option value="mastery-asc">{t('wordList.masteryAsc')}</option>
          </select>

          {!readOnly && (
            <button
              type="button"
              className={`btn-toggle-select-mode ${isSelectionMode ? 'active' : ''}`}
              onClick={() => {
                if (isSelectionMode) {
                  setIsSelectionMode(false);
                  setSelectedWordIds(new Set());
                } else {
                  setIsSelectionMode(true);
                }
              }}
              title={isSelectionMode ? t('wordList.cancelSelect') : t('wordList.bulkSelect')}
            >
              <CheckSquare size={16} />
              <span>{isSelectionMode ? t('wordList.cancelSelect') : t('wordList.bulkSelect')}</span>
            </button>
          )}
        </div>
      </div>

      <div className="word-list-grid">
        <AnimatePresence>
          {sortedWords.map(word => {
            let groupHeader = null;
            if (sortBy === 'group' && groupFn) {
              const group = groupFn(word.word);
              if (group.id !== lastGroupId) {
                lastGroupId = group.id;
                groupHeader = (
                  <div className="word-group-header" key={`group-${group.id}`}>
                    <span className="word-group-title">{group.title}</span>
                    <span className="word-group-pattern">{group.pattern}</span>
                  </div>
                );
              }
            }
            return (
              <div key={word.id} className="word-group-item-wrap">
                {groupHeader}
                <WordCard
                  word={word}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  readOnly={readOnly}
                  language={language}
                  isSelectionMode={isSelectionMode}
                  isSelected={selectedWordIds.has(word.id)}
                  onToggleSelect={toggleSelectWord}
                  onPointerDownCard={handleCardPointerDown}
                />
              </div>
            );
          })}
        </AnimatePresence>
      </div>

      {showBulkDeleteConfirm && (
        <div className="custom-alert-overlay" onClick={() => setShowBulkDeleteConfirm(false)}>
          <div className="custom-alert-card" onClick={(e) => e.stopPropagation()}>
            <p className="custom-alert-message">
              {t('wordList.deleteSelectedConfirm', { count: selectedWordIds.size })}
            </p>
            <div className="custom-alert-actions-row has-destructive">
              <button
                className="custom-alert-btn destructive"
                onClick={handleConfirmBulkDelete}
              >
                {t('wordCard.delete')}
              </button>
              <button
                className="custom-alert-btn"
                style={{ fontWeight: 700 }}
                onClick={() => setShowBulkDeleteConfirm(false)}
              >
                {t('wordCard.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
