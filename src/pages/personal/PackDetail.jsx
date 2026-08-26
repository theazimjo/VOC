import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePacks } from '../../hooks/usePacks';
import { useWords } from '../../hooks/useWords';
import { useDailyNewWordLimit } from '../../hooks/useDailyNewWordLimit';
import { getIrregularVerbGroup } from '../../data/irregularVerbGroups';
import { findSourceMarketPack, getMissingMarketWords } from '../../utils/marketSync';
import { playSound } from '../../utils/feedback';
import { computeRetentionStats } from '../../utils/memoryEngine';
import { getConfusionPairs } from '../../experiment/experimentDB';
import { formatPageRange } from '../../utils/chapterPageRanges';
import WordList from '../../components/Words/WordList';
import PhotoWordExtractorModal from '../../components/Words/PhotoWordExtractorModal';
import SpeedDialFAB from '../../components/Words/SpeedDialFAB';
import IosSpinner from '../../components/common/IosSpinner';
import './PackDetail.css';

export default function PackDetail() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { getPack, updatePack } = usePacks();
  const { words, loading, addWord, updateWord, deleteWord, bulkAddWords } = useWords('packs', packId);
  const { limit: dailyWordLimit, todayCount } = useDailyNewWordLimit();

  const [pack, setPack] = useState(null);
  const [showWordForm, setShowWordForm] = useState(false);
  const [showBulkImportForm, setShowBulkImportForm] = useState(false);
  const [showPhotoExtractorModal, setShowPhotoExtractorModal] = useState(false);
  const [editingWord, setEditingWord] = useState(null);
  const [newWordsAddedCount, setNewWordsAddedCount] = useState(null);

  const [confusionPairs, setConfusionPairs] = useState([]);
  const marketSyncCheckedRef = useRef(false);
  const topicRowRef = useRef(null);
  // Kept in the URL (not plain state) so it survives navigating away to
  // Practice and back - PracticePage reads the same `topic` param to scope
  // the session, and passes it back on the way out so the chip selection
  // isn't lost when this component remounts.
  const topicFilter = searchParams.get('topic');
  const setTopicFilter = (topic) => {
    const next = new URLSearchParams(searchParams);
    if (topic) next.set('topic', topic); else next.delete('topic');
    setSearchParams(next, { replace: true });
    if (topic) localStorage.setItem(`lastTopic:${packId}`, topic);
    else localStorage.removeItem(`lastTopic:${packId}`);
  };

  // Distinct topics present among this pack's words, for the optional
  // study-grouping filter chips - shown for any pack whose words carry a
  // topic (IELTS packs group by theme; the Science market pack groups by
  // book chapter), and only once at least one word has a topic set.
  const topics = useMemo(() => {
    if (!pack) return [];
    return [...new Set(words.map(w => w.topic).filter(Boolean))].sort();
  }, [pack, words]);

  // Restore the last chapter/topic the user was on for this pack, once, the
  // next time they open it fresh (no `?topic=` already in the URL). Waits
  // for `topics` to be populated so a stale/removed topic isn't applied.
  const autoAppliedTopicRef = useRef(false);
  useEffect(() => {
    autoAppliedTopicRef.current = false;
  }, [packId]);
  useEffect(() => {
    if (autoAppliedTopicRef.current) return;
    if (topicFilter !== null) { autoAppliedTopicRef.current = true; return; }
    if (topics.length === 0) return;
    autoAppliedTopicRef.current = true;
    const saved = localStorage.getItem(`lastTopic:${packId}`);
    if (saved && topics.includes(saved)) setTopicFilter(saved);
    // setTopicFilter is intentionally omitted - it's redefined every render,
    // and the ref guard above already makes this effect run-once per pack.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics, topicFilter, packId]);

  const displayedWords = topicFilter ? words.filter(w => w.topic === topicFilter) : words;

  // Average mastery per topic, so each chapter chip can show at a glance how
  // well the user knows that chapter's words (rendered as a background fill).
  const topicMastery = useMemo(() => {
    const map = {};
    topics.forEach(topic => {
      const topicWords = words.filter(w => w.topic === topic);
      if (topicWords.length === 0) return;
      map[topic] = Math.round(topicWords.reduce((sum, w) => sum + (w.mastery || 0), 0) / topicWords.length);
    });
    return map;
  }, [topics, words]);

  // One-time fetch, same pattern as the Dashboard's Memory Twin card.
  useEffect(() => {
    if (!user) return;
    getConfusionPairs(user.uid).then(setConfusionPairs).catch(() => setConfusionPairs([]));
  }, [user]);

  // Per-collection Memory Twin: mastery/retention/at-risk plus the strongest
  // confusion pair *within this pack specifically* (a pack-wide confusion
  // list wouldn't tell the user anything about the words they're actually
  // looking at right now). Scoped to the selected chapter/topic when one is
  // active, so the card reflects what the user is actually looking at.
  const memoryTwin = useMemo(() => {
    const scopedWords = topicFilter ? words.filter(w => w.topic === topicFilter) : words;
    if (!scopedWords || scopedWords.length === 0) return null;
    const { retentionPercent, atRisk, reviewedCount } = computeRetentionStats(scopedWords);
    if (reviewedCount === 0) return null;

    const masteryPercent = Math.round(scopedWords.reduce((sum, w) => sum + (w.mastery || 0), 0) / scopedWords.length);

    const wordIds = new Set(scopedWords.map(w => w.id));
    const packConfusions = confusionPairs.filter(p => wordIds.has(p.wordIdA) || wordIds.has(p.wordIdB));
    const topConfusion = [...packConfusions].sort((a, b) => (b.count || 0) - (a.count || 0))[0] || null;

    return { masteryPercent, retentionPercent, atRisk, confusionCount: packConfusions.length, topConfusion };
  }, [words, topicFilter, confusionPairs]);

  useEffect(() => {
    const fetchPack = async () => {
      const p = await getPack(packId);
      if (p) setPack(p);
      else navigate('/library?tab=packs');
    };
    fetchPack();
  }, [packId, getPack, navigate]);

  // Reset the market-sync guard whenever the user navigates to a different pack —
  // this component instance persists across /packs/:packId param changes (React
  // Router doesn't remount it), so without this the sync would only ever run once
  // per session, for whichever pack happened to be opened first.
  // The topic filter is only cleared on an actual pack switch (tracked via
  // this ref) - not on the initial mount, so a `?topic=...` carried back from
  // Practice (or a bookmarked/shared link) is respected instead of wiped.
  const prevPackIdRef = useRef(packId);
  useEffect(() => {
    marketSyncCheckedRef.current = false;
    if (prevPackIdRef.current !== packId) {
      prevPackIdRef.current = packId;
      setSearchParams({}, { replace: true });
    }
  }, [packId, setSearchParams]);

  // On first visit after the Market source pack gained new words, silently
  // add the missing ones to this installed copy (existing words/progress are
  // never touched) and let the user know with a one-time notice.
  useEffect(() => {
    if (marketSyncCheckedRef.current || !pack || loading) return;
    marketSyncCheckedRef.current = true;

    const sourcePack = findSourceMarketPack(pack);
    if (!sourcePack) return;

    // Packs installed before a market pack's `type` field existed (or before
    // it changed) never get it backfilled by the word-only sync above - it's
    // pack-level metadata, not a word. Type-gated features (like Science's
    // Read mode) would otherwise stay invisible forever on an old install.
    if (sourcePack.type && pack.type !== sourcePack.type) {
      updatePack(packId, { type: sourcePack.type });
      setPack(prev => (prev ? { ...prev, type: sourcePack.type } : prev));
    }

    const missingWords = getMissingMarketWords(sourcePack, words);
    if (missingWords.length === 0) return;

    bulkAddWords(missingWords).then(() => {
      playSound('correct');
      setNewWordsAddedCount(missingWords.length);
    });
  }, [pack, words, loading, bulkAddWords, packId, updatePack]);

  // Restore the scroll position saveScrollPosition() saved before leaving
  // for the edit page or Practice - only once the real word list has
  // painted (not the loading spinner, which is much shorter and would just
  // clamp scrollY back to 0), and only the one time right after coming back.
  useEffect(() => {
    if (!pack || loading) return;
    const key = `wordListScroll:${packId}`;
    const saved = sessionStorage.getItem(key);
    if (saved === null) return;
    sessionStorage.removeItem(key);
    requestAnimationFrame(() => window.scrollTo(0, parseInt(saved, 10)));
  }, [pack, loading, packId]);

  // The chapter chip row (.ielts-topic-filter-row) scrolls horizontally on
  // its own, independent of the page's vertical scroll restored above. On a
  // fresh mount - coming back from Practice, for instance - it always
  // starts scrolled to the left, so a chapter picked from further along
  // (Ch.07+) would otherwise leave the active chip hidden off-screen with
  // no visible sign it's still selected. Sets row.scrollLeft directly
  // (not scrollIntoView) so this can never also drag the page's own
  // vertical scroll along with it and fight the restore above.
  useEffect(() => {
    if (!topicFilter || topics.length === 0) return;
    const row = topicRowRef.current;
    if (!row) return;
    const activeChip = row.querySelector('.ielts-topic-chip.active');
    if (!activeChip) return;
    const rowRect = row.getBoundingClientRect();
    const chipRect = activeChip.getBoundingClientRect();
    const offset = (chipRect.left + chipRect.width / 2) - (rowRect.left + rowRect.width / 2);
    row.scrollLeft += offset;
  }, [topicFilter, topics]);

  const handleSaveWord = async (data) => {
    if (pack?.name === 'Irregular Verbs') return;
    if (editingWord) {
      await updateWord(editingWord.id, data);
    } else {
      const trimmedWord = (data.word || '').trim().toLowerCase();
      const isDuplicate = trimmedWord && words.some(w => (w.word || '').trim().toLowerCase() === trimmedWord);
      if (isDuplicate) {
        const proceed = window.confirm(
          t('packDetail.duplicateWarning', { word: data.word })
        );
        if (!proceed) return;
      }

      if (todayCount >= dailyWordLimit) {
        const proceed = window.confirm(
          t('packDetail.dailyLimitWarning', { count: todayCount, limit: dailyWordLimit })
        );
        if (!proceed) return;
      }
      await addWord(data);
    }
    setShowWordForm(false);
    setEditingWord(null);
  };

  // The word-edit pages AND Practice are separate routes, so this page fully
  // unmounts and remounts on the way back from either - without saving where
  // we were first, it would start over at the top of a long word list every
  // time (see the matching restore effect above).
  const saveScrollPosition = () => {
    sessionStorage.setItem(`wordListScroll:${packId}`, String(window.scrollY));
  };

  const handleEditWord = (word) => {
    if (pack?.name === 'Irregular Verbs') return;
    saveScrollPosition();
    if (pack?.type === 'ielts') {
      navigate(`/packs/${packId}/word/ielts/edit/${word.id}`);
      return;
    }
    if (pack?.type === 'english') {
      navigate(`/packs/${packId}/word/english/edit/${word.id}`);
      return;
    }
    navigate(`/packs/${packId}/word/edit/${word.id}`);
  };

  const handleBulkImport = async (newWords, onProgress) => {
    if (pack?.name === 'Irregular Verbs') return;

    // Skip words already in the pack, and duplicates within the pasted list itself.
    const existingWords = new Set(words.map(w => (w.word || '').trim().toLowerCase()));
    const seenInBatch = new Set();
    const uniqueWords = [];
    let duplicateCount = 0;

    for (const w of newWords) {
      const key = (w.word || '').trim().toLowerCase();
      if (key && (existingWords.has(key) || seenInBatch.has(key))) {
        duplicateCount += 1;
        continue;
      }
      if (key) seenInBatch.add(key);
      uniqueWords.push(w);
    }

    if (duplicateCount > 0) {
      const proceed = window.confirm(
        t('packDetail.importDuplicateSkip', { dupCount: duplicateCount, uniqueCount: uniqueWords.length })
      );
      if (!proceed) return;
    }

    if (uniqueWords.length === 0) {
      window.alert(t('packDetail.noNewWordsToAdd'));
      return;
    }

    const projectedTotal = todayCount + uniqueWords.length;
    if (projectedTotal > dailyWordLimit) {
      const proceed = window.confirm(
        t('packDetail.importDailyLimitWarning', { total: projectedTotal, limit: dailyWordLimit })
      );
      if (!proceed) return;
    }
    await bulkAddWords(uniqueWords, onProgress);
  };

  // WordCard already confirms (its own styled dialog, shared by the desktop
  // hover button and the mobile "..." menu) before ever calling this.
  const handleDeleteWord = async (wordId) => {
    if (pack?.name === 'Irregular Verbs') return;
    await deleteWord(wordId);
  };

  if (!pack) {
    return (
      <div className="ios-activity-indicator" style={{ marginTop: '100px' }}>
        <IosSpinner />
        <span>{t('packDetail.loading')}</span>
      </div>
    );
  }

  return (
    <motion.div
      className="pack-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="detail-back-navigation">
        <button
          className="btn-back"
          onClick={() => {
            const targetFolderId = pack?.folderId || sessionStorage.getItem('lastOpenFolderId');
            if (targetFolderId) {
              navigate(`/library?tab=packs&folderId=${targetFolderId}`);
            } else {
              navigate('/library?tab=packs');
            }
          }}
        >
          {t('packDetail.libraryBack')}
        </button>
      </div>

      <div className="pack-detail-header" style={{ borderBottom: `4px solid ${pack.color || 'var(--accent-1)'}` }}>
        <div className="pack-detail-info">
          <div className="pack-detail-icon">{pack.icon}</div>
          <div className="pack-detail-text">
            <h1>
              {pack.name}
              {pack.type === 'ielts' && <span className="pack-type-badge">🎓 IELTS</span>}
              {pack.type === 'english' && <span className="pack-type-badge pack-type-badge-english">🔤 English</span>}
            </h1>
            {pack.description && <p>{pack.description}</p>}
            <div className="book-stats">
              <span className="book-stat-badge">{t('packDetail.wordsCount', { count: words.length })}</span>
            </div>
          </div>
        </div>
        <div className="pack-detail-actions">
          {pack.name === 'Irregular Verbs' ? (
            <>
              <button
                className="btn btn-cards"
                onClick={() => { saveScrollPosition(); navigate(`/practice/packs/${packId}?mode=irregular-verbs&subStep=study`); }}
              >
                <span className="btn-label-main">{t('packDetail.flashcards')}</span>
              </button>
              <button
                className="btn btn-primary btn-mashq"
                onClick={() => { saveScrollPosition(); navigate(`/practice/packs/${packId}?mode=irregular-verbs&subStep=practice&count=10`); }}
              >
                <span className="btn-label-main">{t('packDetail.practice')}</span>
              </button>
            </>
          ) : (
            <>
              <button
                className={`btn btn-primary btn-mashq ${topicFilter ? 'has-topic' : ''}`}
                onClick={() => {
                  saveScrollPosition();
                  navigate(
                    topicFilter
                      ? `/practice/packs/${packId}?topic=${encodeURIComponent(topicFilter)}`
                      : `/practice/packs/${packId}`
                  );
                }}
              >
                <span className="btn-label-main">{t('packDetail.gamePractice')}</span>
                {topicFilter && (
                  <span className="btn-label-topic" title={topicFilter}>
                    {topicFilter}{formatPageRange(topicFilter) ? ` (${formatPageRange(topicFilter)})` : ''}
                  </span>
                )}
              </button>
              {pack.type === 'science' && (
                <button
                  className={`btn btn-cards ${topicFilter ? 'has-topic' : ''}`}
                  onClick={() => {
                    saveScrollPosition();
                    const targetTopic = topicFilter || (topics.length > 0 ? topics[0] : null);
                    if (targetTopic) {
                      navigate(`/packs/${packId}/read?topic=${encodeURIComponent(targetTopic)}`);
                    }
                  }}
                  title={topicFilter ? `${t('packDetail.read')}: ${topicFilter}` : `${t('packDetail.read')} (${topics[0] || ''})`}
                >
                  <span className="btn-label-main">{t('packDetail.read')}</span>
                  {topicFilter && (
                    <span className="btn-label-topic" title={topicFilter}>
                      {topicFilter}{formatPageRange(topicFilter) ? ` (${formatPageRange(topicFilter)})` : ''}
                    </span>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {memoryTwin && (
        <div className="pack-memtwin-card">
          <div className="pack-memtwin-header">
            <span className="pack-memtwin-icon"><Brain size={16} strokeWidth={2.2} /></span>
            <span className="pack-memtwin-title">{t('packDetail.memoryTwin')}</span>
            {topicFilter && <span className="pack-memtwin-scope">{topicFilter}</span>}
          </div>

          <div className="pack-memtwin-stats-grid">
            <div className="pack-memtwin-stat">
              <span className="pack-memtwin-stat-value">{memoryTwin.masteryPercent}%</span>
              <span className="pack-memtwin-stat-label">{t('packDetail.mastery')}</span>
            </div>
            <div className="pack-memtwin-stat">
              <span className="pack-memtwin-stat-value">{memoryTwin.retentionPercent}%</span>
              <span className="pack-memtwin-stat-label">{t('packDetail.retention')}</span>
            </div>
            <div className="pack-memtwin-stat">
              <span className="pack-memtwin-stat-value">{memoryTwin.atRisk}</span>
              <span className="pack-memtwin-stat-label">{t('packDetail.atRisk')}</span>
            </div>
            <div className="pack-memtwin-stat">
              <span className="pack-memtwin-stat-value">{memoryTwin.confusionCount}</span>
              <span className="pack-memtwin-stat-label">{t('packDetail.confusions')}</span>
            </div>
          </div>

          {memoryTwin.topConfusion && (
            <div className="pack-memtwin-insight">
              <p className="pack-memtwin-insight-text">
                <AlertTriangle size={13} strokeWidth={2.3} /> {t('packDetail.freqConfused', { wordA: memoryTwin.topConfusion.wordA, wordB: memoryTwin.topConfusion.wordB })}
              </p>
              <p className="pack-memtwin-insight-sub">{t('packDetail.recContrastive')}</p>
            </div>
          )}
        </div>
      )}

      {topics.length > 0 && (
        <div className="ielts-topic-filter-row" ref={topicRowRef}>
          <button
            type="button"
            className={`ielts-topic-chip ${topicFilter === null ? 'active' : ''}`}
            onClick={() => setTopicFilter(null)}
          >
            {t('packDetail.allTopics')}
          </button>
          {topics.map(topic => {
            const pageRangeStr = formatPageRange(topic);
            return (
              <button
                key={topic}
                type="button"
                className={`ielts-topic-chip ${topicFilter === topic ? 'active' : ''}`}
                style={topicMastery[topic] !== undefined ? { '--chip-mastery': `${topicMastery[topic]}%` } : undefined}
                onClick={() => setTopicFilter(topic)}
              >
                {topicMastery[topic] !== undefined && (
                  <span className="ielts-topic-chip-fill" aria-hidden="true" />
                )}
                <span className="ielts-topic-chip-label">
                  {topic}
                  {pageRangeStr && <span className="ielts-topic-chip-pages"> ({pageRangeStr})</span>}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <WordList
        words={displayedWords}
        onEdit={handleEditWord}
        onDelete={handleDeleteWord}
        loading={loading}
        readOnly={pack.name === 'Irregular Verbs'}
        groupFn={pack.name === 'Irregular Verbs' ? getIrregularVerbGroup : undefined}
        language={pack.language || 'en-US'}
      />

      <PhotoWordExtractorModal
        isOpen={showPhotoExtractorModal}
        onClose={() => setShowPhotoExtractorModal(false)}
        onImport={(newWords) => handleBulkImport(newWords)}
        existingWords={words}
      />

      {pack.name !== 'Irregular Verbs' && (
        <SpeedDialFAB
          onAddWord={() => navigate(
            pack.type === 'ielts' ? `/packs/${packId}/word/ielts/new`
              : pack.type === 'english' ? `/packs/${packId}/word/english/new`
                : `/packs/${packId}/word/new`
          )}
          onImportJson={() => navigate(`/packs/${packId}/import-json`)}
          onExtractPhoto={() => setShowPhotoExtractorModal(true)}
        />
      )}

      {newWordsAddedCount !== null && (
        <div className="ios-alert-overlay" onClick={() => setNewWordsAddedCount(null)}>
          <motion.div
            className="ios-alert-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ios-alert-icon">✨</div>
            <h3>{t('packDetail.newWordsAddedTitle')}</h3>
            <p>{t('packDetail.newWordsAddedMsg', { count: newWordsAddedCount })}</p>
            <button className="ios-alert-btn" onClick={() => setNewWordsAddedCount(null)}>{t('packDetail.ok')}</button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
