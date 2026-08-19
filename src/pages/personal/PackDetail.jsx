import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { usePacks } from '../../hooks/usePacks';
import { useWords } from '../../hooks/useWords';
import { useDailyNewWordLimit } from '../../hooks/useDailyNewWordLimit';
import { getIrregularVerbGroup } from '../../data/irregularVerbGroups';
import { findSourceMarketPack, getMissingMarketWords } from '../../utils/marketSync';
import { playSound } from '../../utils/feedback';
import { computeRetentionStats } from '../../utils/memoryEngine';
import { getConfusionPairs } from '../../experiment/experimentDB';
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
  const { getPack } = usePacks();
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
  // Kept in the URL (not plain state) so it survives navigating away to
  // Practice and back - PracticePage reads the same `topic` param to scope
  // the session, and passes it back on the way out so the chip selection
  // isn't lost when this component remounts.
  const topicFilter = searchParams.get('topic');
  const setTopicFilter = (topic) => {
    const next = new URLSearchParams(searchParams);
    if (topic) next.set('topic', topic); else next.delete('topic');
    setSearchParams(next, { replace: true });
  };

  // Distinct topics present among this pack's words, for the optional
  // study-grouping filter chips - shown for any pack whose words carry a
  // topic (IELTS packs group by theme; the Science market pack groups by
  // book chapter), and only once at least one word has a topic set.
  const topics = useMemo(() => {
    if (!pack) return [];
    return [...new Set(words.map(w => w.topic).filter(Boolean))].sort();
  }, [pack, words]);

  const displayedWords = topicFilter ? words.filter(w => w.topic === topicFilter) : words;

  // One-time fetch, same pattern as the Dashboard's Memory Twin card.
  useEffect(() => {
    if (!user) return;
    getConfusionPairs(user.uid).then(setConfusionPairs).catch(() => setConfusionPairs([]));
  }, [user]);

  // Per-collection Memory Twin: mastery/retention/at-risk plus the strongest
  // confusion pair *within this pack specifically* (a pack-wide confusion
  // list wouldn't tell the user anything about the words they're actually
  // looking at right now).
  const memoryTwin = useMemo(() => {
    if (!words || words.length === 0) return null;
    const { retentionPercent, atRisk, reviewedCount } = computeRetentionStats(words);
    if (reviewedCount === 0) return null;

    const masteryPercent = Math.round(words.reduce((sum, w) => sum + (w.mastery || 0), 0) / words.length);

    const wordIds = new Set(words.map(w => w.id));
    const packConfusions = confusionPairs.filter(p => wordIds.has(p.wordIdA) || wordIds.has(p.wordIdB));
    const topConfusion = [...packConfusions].sort((a, b) => (b.count || 0) - (a.count || 0))[0] || null;

    return { masteryPercent, retentionPercent, atRisk, confusionCount: packConfusions.length, topConfusion };
  }, [words, confusionPairs]);

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

    const missingWords = getMissingMarketWords(sourcePack, words);
    if (missingWords.length === 0) return;

    bulkAddWords(missingWords).then(() => {
      playSound('correct');
      setNewWordsAddedCount(missingWords.length);
    });
  }, [pack, words, loading, bulkAddWords]);

  // Restore the scroll position handleEditWord saved before leaving for the
  // edit page - only once the real word list has painted (not the loading
  // spinner, which is much shorter and would just clamp scrollY back to 0),
  // and only the one time right after coming back.
  useEffect(() => {
    if (!pack || loading) return;
    const key = `wordListScroll:${packId}`;
    const saved = sessionStorage.getItem(key);
    if (saved === null) return;
    sessionStorage.removeItem(key);
    requestAnimationFrame(() => window.scrollTo(0, parseInt(saved, 10)));
  }, [pack, loading, packId]);

  const handleSaveWord = async (data) => {
    if (pack?.name === 'Irregular Verbs') return;
    if (editingWord) {
      await updateWord(editingWord.id, data);
    } else {
      const trimmedWord = (data.word || '').trim().toLowerCase();
      const isDuplicate = trimmedWord && words.some(w => (w.word || '').trim().toLowerCase() === trimmedWord);
      if (isDuplicate) {
        const proceed = window.confirm(
          `"${data.word}" already exists in this pack. Add it anyway?`
        );
        if (!proceed) return;
      }

      if (todayCount >= dailyWordLimit) {
        const proceed = window.confirm(
          `You've already added ${todayCount} new words today (daily goal: ${dailyWordLimit}). Adding too many words in one day makes them harder to memorize — it's recommended to reinforce these first. Continue anyway?`
        );
        if (!proceed) return;
      }
      await addWord(data);
    }
    setShowWordForm(false);
    setEditingWord(null);
  };

  const handleEditWord = (word) => {
    if (pack?.name === 'Irregular Verbs') return;
    // The word edit pages are a separate route, so this page fully unmounts
    // and remounts on the way back - without saving where we were, it would
    // start over at the top of a long word list every time.
    sessionStorage.setItem(`wordListScroll:${packId}`, String(window.scrollY));
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
        `${duplicateCount} duplicate word(s) will be skipped. ${uniqueWords.length} new word(s) will be added. Continue?`
      );
      if (!proceed) return;
    }

    if (uniqueWords.length === 0) {
      window.alert('No new words to add — every word in the list already exists.');
      return;
    }

    const projectedTotal = todayCount + uniqueWords.length;
    if (projectedTotal > dailyWordLimit) {
      const proceed = window.confirm(
        `This import will bring today's total new words to ${projectedTotal} (daily goal: ${dailyWordLimit}). Continue anyway?`
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
        <span>Loading...</span>
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
        <button className="btn-back" onClick={() => navigate('/library?tab=packs')}>
          ← Library
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
              <span className="book-stat-badge">📝 {words.length} words</span>
            </div>
          </div>
        </div>
        <div className="pack-detail-actions">
          {pack.name === 'Irregular Verbs' ? (
            <>
              <button 
                className="btn btn-cards" 
                onClick={() => navigate(`/practice/packs/${packId}?mode=irregular-verbs&subStep=study`)}
              >
                🃏 Flashcards
              </button>
              <button
                className="btn btn-primary btn-mashq"
                onClick={() => navigate(`/practice/packs/${packId}?mode=irregular-verbs&subStep=practice&count=10`)}
              >
                ⚡ Practice
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary btn-mashq"
              onClick={() => navigate(
                topicFilter
                  ? `/practice/packs/${packId}?topic=${encodeURIComponent(topicFilter)}`
                  : `/practice/packs/${packId}`
              )}
            >
              🎮 Practice{topicFilter ? ` (${topicFilter})` : ''}
            </button>
          )}
        </div>
      </div>

      {memoryTwin && (
        <div className="pack-memtwin-card">
          <div className="pack-memtwin-header">
            <span className="pack-memtwin-icon"><Brain size={16} strokeWidth={2.2} /></span>
            <span className="pack-memtwin-title">Memory Twin</span>
          </div>

          <div className="pack-memtwin-stats-grid">
            <div className="pack-memtwin-stat">
              <span className="pack-memtwin-stat-value">{memoryTwin.masteryPercent}%</span>
              <span className="pack-memtwin-stat-label">Mastery</span>
            </div>
            <div className="pack-memtwin-stat">
              <span className="pack-memtwin-stat-value">{memoryTwin.retentionPercent}%</span>
              <span className="pack-memtwin-stat-label">Retention</span>
            </div>
            <div className="pack-memtwin-stat">
              <span className="pack-memtwin-stat-value">{memoryTwin.atRisk}</span>
              <span className="pack-memtwin-stat-label">At risk</span>
            </div>
            <div className="pack-memtwin-stat">
              <span className="pack-memtwin-stat-value">{memoryTwin.confusionCount}</span>
              <span className="pack-memtwin-stat-label">Confusions</span>
            </div>
          </div>

          {memoryTwin.topConfusion && (
            <div className="pack-memtwin-insight">
              <p className="pack-memtwin-insight-text">
                <AlertTriangle size={13} strokeWidth={2.3} /> Frequently confused: <strong>{memoryTwin.topConfusion.wordA}</strong> ↔ <strong>{memoryTwin.topConfusion.wordB}</strong>
              </p>
              <p className="pack-memtwin-insight-sub">Recommendation: Contrastive Practice</p>
            </div>
          )}
        </div>
      )}

      {topics.length > 0 && (
        <div className="ielts-topic-filter-row">
          <button
            type="button"
            className={`ielts-topic-chip ${topicFilter === null ? 'active' : ''}`}
            onClick={() => setTopicFilter(null)}
          >
            All
          </button>
          {topics.map(topic => (
            <button
              key={topic}
              type="button"
              className={`ielts-topic-chip ${topicFilter === topic ? 'active' : ''}`}
              onClick={() => setTopicFilter(topic)}
            >
              {topic}
            </button>
          ))}
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
            <h3>New words added!</h3>
            <p>{newWordsAddedCount} new word(s) were automatically added to this pack.</p>
            <button className="ios-alert-btn" onClick={() => setNewWordsAddedCount(null)}>OK</button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
