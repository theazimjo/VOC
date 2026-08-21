import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Package, ChevronRight } from 'lucide-react';
import { usePacks } from '../../hooks/usePacks';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ref, get } from 'firebase/database';
import { db } from '../../firebase';
import { setAppMode, switchActiveGroup } from '../../services/corpService';
import { getMasteryLevel } from '../../utils/spacedRepetition';
import './GlobalSearch.css';

const MAX_WORD_RESULTS = 20;
const MAX_PACK_RESULTS = 5;

export default function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { allWords, packs } = usePacks();

  const [corpData, setCorpData] = useState({ words: [], packs: [] });

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

  // Fetch all corporate packages and words for user group memberships on search open
  useEffect(() => {
    if (!isOpen || !user) {
      setCorpData({ words: [], packs: [] });
      return;
    }

    const membershipsRef = ref(db, `users/${user.uid}/groupMemberships`);
    const wordStatsRef = ref(db, `users/${user.uid}/words`);

    Promise.all([get(membershipsRef), get(wordStatsRef)])
      .then(async ([membershipsSnap, wordStatsSnap]) => {
        if (!membershipsSnap.exists()) return;
        const membershipsList = Object.values(membershipsSnap.val());
        const wordStatsVal = wordStatsSnap.exists() ? wordStatsSnap.val() : {};

        const allCorpWords = [];
        const allCorpPacks = [];

        await Promise.all(
          membershipsList.map(async (m) => {
            try {
              const [groupSnap, packsSnap] = await Promise.all([
                get(ref(db, `centers/${m.centerId}/groups/${m.groupId}`)),
                get(ref(db, `centers/${m.centerId}/customPacks`))
              ]);

              if (groupSnap.exists() && packsSnap.exists()) {
                const groupVal = groupSnap.val();
                const packsVal = packsSnap.val() || {};
                const assignedIds = new Set(groupVal.assignedPacks || []);

                Object.keys(packsVal).forEach((packId) => {
                  if (assignedIds.has(packId)) {
                    const pack = { id: packId, ...packsVal[packId] };
                    
                    const months = pack.months && pack.months.length > 0
                      ? pack.months
                      : pack.units && pack.units.length > 0
                        ? [{ id: 'm1', title: '1-Oy', units: pack.units }]
                        : pack.words && pack.words.length > 0
                          ? [{ id: 'm1', title: '1-Oy', units: [{ id: 'u1', title: '1-Mavzu', words: pack.words }] }]
                          : [];

                    let wordCount = 0;
                    months.forEach((month) => {
                      const units = month.units || [];
                      units.forEach((unit) => {
                        const words = unit.words || [];
                        wordCount += words.length;
                        words.forEach((w, idx) => {
                          const wordId = w.id || String(idx);
                          const uniqueUnitId = `${packId}_${month.id}_${unit.id}`;
                          const wordStat = (wordStatsVal[uniqueUnitId] || {})[wordId] || {};
                          
                          allCorpWords.push({
                            id: wordId,
                            word: w.word || '',
                            translation: w.translation || '',
                            mastery: wordStat.mastery || 0,
                            packId,
                            monthId: month.id,
                            unitId: unit.id,
                            packTitle: pack.title,
                            monthTitle: month.title,
                            unitTitle: unit.title,
                            source: `${m.groupName} - ${pack.title}`,
                            sourceIcon: '🏢',
                            sourceType: 'corp',
                            groupId: m.groupId,
                            centerId: m.centerId,
                            groupName: m.groupName
                          });
                        });
                      });
                    });

                    allCorpPacks.push({
                      id: packId,
                      name: pack.title,
                      wordCount,
                      groupId: m.groupId,
                      centerId: m.centerId,
                      groupName: m.groupName,
                      isCorp: true,
                      level: pack.level,
                      firstMonthId: months[0]?.id || 'm1',
                      firstUnitId: months[0]?.units?.[0]?.id || 'u1'
                    });
                  }
                });
              }
            } catch (err) {
              console.error('Error loading corp data in search:', err);
            }
          })
        );

        setCorpData({ words: allCorpWords, packs: allCorpPacks });
      })
      .catch((err) => console.error('Error fetching global search corp meta:', err));
  }, [isOpen, user]);

  const trimmedQuery = query.trim().toLowerCase();

  const wordResults = useMemo(() => {
    if (!trimmedQuery) return [];
    
    // Local individual words
    const localMatches = allWords.filter(w =>
      w.word?.toLowerCase().includes(trimmedQuery) ||
      w.translation?.toLowerCase().includes(trimmedQuery)
    );

    // Corporate words
    const corpMatches = (corpData.words || []).filter(w =>
      w.word?.toLowerCase().includes(trimmedQuery) ||
      w.translation?.toLowerCase().includes(trimmedQuery)
    );

    return [...localMatches, ...corpMatches].slice(0, MAX_WORD_RESULTS);
  }, [allWords, corpData.words, trimmedQuery]);

  const packResults = useMemo(() => {
    if (!trimmedQuery) return [];

    const localMatches = packs.filter(p => p.name?.toLowerCase().includes(trimmedQuery));
    const corpMatches = (corpData.packs || []).filter(p => p.name?.toLowerCase().includes(trimmedQuery));

    return [...localMatches, ...corpMatches].slice(0, MAX_PACK_RESULTS);
  }, [packs, corpData.packs, trimmedQuery]);

  const hasResults = wordResults.length > 0 || packResults.length > 0;

  // Swaps modes and active group memberships in database to keep state aligned
  const handleResultClick = async (item) => {
    onClose();

    if (item.sourceType === 'corp' || item.isCorp) {
      try {
        await setAppMode(user.uid, 'group');
        await switchActiveGroup(user.uid, item.groupId);

        if (item.unitId) {
          navigate(`/corp/student/learn/topic/${item.packId}/${item.monthId}/${item.unitId}`);
        } else {
          navigate(`/corp/student/learn/month/${item.id}/${item.firstMonthId}`);
        }
      } catch (err) {
        console.error('Error switching to corporate search result:', err);
      }
    } else {
      try {
        await setAppMode(user.uid, 'individual');
        const pId = item.packId || item.id;
        navigate(`/packs/${pId}`);
      } catch (err) {
        console.error('Error switching to individual search result:', err);
      }
    }
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
                placeholder={t('search.placeholder')}
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button className="global-search-close" onClick={onClose} aria-label="Close">
                <X size={18} strokeWidth={2.2} />
              </button>
            </div>

            <div className="global-search-results">
              {!trimmedQuery && (
                <div className="global-search-empty">{t('search.startTyping')}</div>
              )}

              {trimmedQuery && !hasResults && (
                <div className="global-search-empty">{t('search.noResults')}</div>
              )}

              {packResults.length > 0 && (
                <div className="global-search-section">
                  <div className="global-search-section-title">{t('search.sectionTopics')}</div>
                  <div className="global-search-card">
                    {packResults.map(pack => (
                      <button
                        key={pack.id}
                        className="global-search-pack-item"
                        onClick={() => handleResultClick(pack)}
                      >
                        <div className="global-search-pack-icon">
                          {pack.icon ? pack.icon : <Package size={16} strokeWidth={2.2} />}
                        </div>
                        <div className="global-search-pack-info">
                          <div className="global-search-pack-name">{pack.name}</div>
                          {pack.isCorp && (
                            <div style={{ fontSize: '0.62rem', background: '#22c55e', color: '#fff', padding: '1px 5px', borderRadius: '4px', width: 'fit-content', marginTop: '2px', fontWeight: 600 }}>
                              {t('search.groupBadge')}
                            </div>
                          )}
                          <div className="global-search-pack-count">{t('search.wordsCount', { count: pack.wordCount || 0 })}</div>
                        </div>
                        <ChevronRight size={16} strokeWidth={2.3} className="global-search-chevron" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {wordResults.length > 0 && (
                <div className="global-search-section">
                  <div className="global-search-section-title">{t('search.sectionWords')}</div>
                  <div className="global-search-card">
                    {wordResults.map(word => {
                      const masteryInfo = getMasteryLevel(word.mastery || 0);
                      return (
                        <button
                          key={word.id}
                          className="global-search-word-item"
                          onClick={() => handleResultClick(word)}
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
                          <div className="global-search-word-source" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{word.source}</span>
                            {word.sourceType === 'corp' && (
                              <span style={{ fontSize: '0.62rem', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '1px 5px', borderRadius: '3px', fontWeight: 600 }}>
                                {t('search.groupBadge')}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
