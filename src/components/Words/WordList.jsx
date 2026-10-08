import { useState, useRef, useEffect, useMemo, useCallback, useDeferredValue } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckSquare, X, Trash2, Check, FolderInput } from 'lucide-react';
import WordCard from './WordCard';
import IosSpinner from '../common/IosSpinner';
import { useLanguage } from '../../contexts/LanguageContext';
import './WordList.css';

// Long packs (Science / Health have thousands of words) are rendered a page at
// a time: a sentinel under the list asks for the next page as it scrolls near.
const PAGE_SIZE = 30;

export default function WordList({ words, onEdit, onDelete, onBulkDelete, onBulkMove, loading, readOnly, groupFn, language = 'en-US' }) {
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const [sortBy, setSortBy] = useState(groupFn ? 'group' : 'date-desc');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef(null);
  const { t } = useLanguage();

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedWordIds, setSelectedWordIds] = useState(new Set());
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);

  const longPressTimerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragModeRef = useRef('select'); // 'select' | 'deselect'
  const pointerStartPosRef = useRef({ x: 0, y: 0 });

  // Latest selection state for the stable callbacks below (cards are memoized).
  const selectionRef = useRef({ mode: false, ids: selectedWordIds, readOnly });
  selectionRef.current = { mode: isSelectionMode, ids: selectedWordIds, readOnly };

  const toggleSelectWord = useCallback((wordId) => {
    setSelectedWordIds(prev => {
      const next = new Set(prev);
      if (next.has(wordId)) next.delete(wordId);
      else next.add(wordId);
      return next;
    });
  }, []);

  const handleCardPointerDown = useCallback((wordId, e) => {
    const { mode, ids, readOnly: ro } = selectionRef.current;
    if (ro) return;
    if (e.button && e.button !== 0) return;

    pointerStartPosRef.current = { x: e.clientX, y: e.clientY };

    if (mode) {
      isDraggingRef.current = true;
      const isCurrentlySelected = ids.has(wordId);
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
  }, []);

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
              const has = prev.has(wordId);
              // nothing to change: keep the same Set so nothing re-renders
              if (dragModeRef.current === 'select' ? has : !has) return prev;
              const next = new Set(prev);
              if (dragModeRef.current === 'select') next.add(wordId);
              else next.delete(wordId);
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

  const sortedWords = useMemo(() => {
    const q = deferredSearch.toLowerCase();
    const list = (words || []).filter(w =>
      !q || (w.word || '').toLowerCase().includes(q) || (w.translation || '').toLowerCase().includes(q)
    );
    // date keys are parsed once, not on every comparison
    const dated = (w) => Date.parse(w.addedAt) || 0;
    const decorated = list.map(w => ({ w, t: sortBy.startsWith('date') ? dated(w) : 0 }));
    decorated.sort((a, b) => {
      if (sortBy === 'group' && groupFn) {
        const diff = groupFn(a.w.word).id - groupFn(b.w.word).id;
        return diff !== 0 ? diff : a.w.word.localeCompare(b.w.word);
      }
      if (sortBy === 'date-desc') return b.t - a.t;
      if (sortBy === 'date-asc') return a.t - b.t;
      if (sortBy === 'alpha-asc') return a.w.word.localeCompare(b.w.word);
      if (sortBy === 'mastery-asc') return (a.w.mastery || 0) - (b.w.mastery || 0);
      if (sortBy === 'mastery-desc') return (b.w.mastery || 0) - (a.w.mastery || 0);
      return 0;
    });
    return decorated.map(d => d.w);
  }, [words, deferredSearch, sortBy, groupFn]);

  // a new search / sort starts again from the first page
  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [deferredSearch, sortBy]);

  const hasMore = visibleCount < sortedWords.length;
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return undefined;
    const io = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) setVisibleCount(c => c + PAGE_SIZE);
    }, { rootMargin: '900px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, visibleCount, loading]);

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

            {onBulkMove && (
              <button
                type="button"
                className="btn-bulk-move"
                disabled={selectedWordIds.size === 0}
                onClick={() => onBulkMove(Array.from(selectedWordIds))}
              >
                <FolderInput size={15} />
                <span>{t('wordList.moveSelected', { count: selectedWordIds.size })}</span>
              </button>
            )}

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
        <>
          {sortedWords.slice(0, visibleCount).map(word => {
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
        </>
        {hasMore && <div ref={sentinelRef} className="word-list-sentinel" aria-hidden="true" />}
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
