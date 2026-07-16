import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePacks } from '../hooks/usePacks';
import { useWords } from '../hooks/useWords';
import { useDailyNewWordLimit } from '../hooks/useDailyNewWordLimit';
import { getIrregularVerbGroup } from '../data/irregularVerbGroups';
import { findSourceMarketPack, getMissingMarketWords } from '../utils/marketSync';
import { playSound } from '../utils/feedback';
import WordList from '../components/Words/WordList';
import WordForm from '../components/Words/WordForm';
import BulkImportForm from '../components/Words/BulkImportForm';
import SpeedDialFAB from '../components/Words/SpeedDialFAB';
import IosSpinner from '../components/common/IosSpinner';
import './PackDetail.css';

export default function PackDetail() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const { getPack } = usePacks();
  const { words, loading, addWord, updateWord, deleteWord, bulkAddWords } = useWords('packs', packId);
  const { limit: dailyWordLimit, todayCount } = useDailyNewWordLimit();

  const [pack, setPack] = useState(null);
  const [showWordForm, setShowWordForm] = useState(false);
  const [showBulkImportForm, setShowBulkImportForm] = useState(false);
  const [editingWord, setEditingWord] = useState(null);
  const [newWordsAddedCount, setNewWordsAddedCount] = useState(null);
  const marketSyncCheckedRef = useRef(false);

  useEffect(() => {
    const fetchPack = async () => {
      const p = await getPack(packId);
      if (p) setPack(p);
      else navigate('/library?tab=packs');
    };
    fetchPack();
  }, [packId, getPack, navigate]);

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

  const handleSaveWord = async (data) => {
    if (pack?.name === 'Irregular Verbs') return;
    if (editingWord) {
      await updateWord(editingWord.id, data);
    } else {
      const trimmedWord = (data.word || '').trim().toLowerCase();
      const isDuplicate = trimmedWord && words.some(w => (w.word || '').trim().toLowerCase() === trimmedWord);
      if (isDuplicate) {
        const proceed = window.confirm(
          `"${data.word}" so'zi ushbu to'plamda allaqachon mavjud. Baribir qo'shishni xohlaysizmi?`
        );
        if (!proceed) return;
      }

      if (todayCount >= dailyWordLimit) {
        const proceed = window.confirm(
          `Bugun allaqachon ${todayCount} ta yangi so'z qo'shdingiz (kunlik maqsad: ${dailyWordLimit} ta). Ko'p so'zni bir kunda qo'shish yodlashni qiyinlashtiradi — ularni avval mustahkamlab olish tavsiya etiladi. Baribir davom etasizmi?`
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
    setEditingWord(word);
    setShowWordForm(true);
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
        `${duplicateCount} ta so'z takroriy bo'lgani uchun o'tkazib yuboriladi. ${uniqueWords.length} ta yangi so'z qo'shiladi. Davom etasizmi?`
      );
      if (!proceed) return;
    }

    if (uniqueWords.length === 0) {
      window.alert("Qo'shiladigan yangi so'z topilmadi — ro'yxatdagi barcha so'zlar allaqachon mavjud.");
      return;
    }

    const projectedTotal = todayCount + uniqueWords.length;
    if (projectedTotal > dailyWordLimit) {
      const proceed = window.confirm(
        `Bu import bilan bugungi jami yangi so'zlar soni ${projectedTotal} taga yetadi (kunlik maqsad: ${dailyWordLimit} ta). Baribir davom etasizmi?`
      );
      if (!proceed) return;
    }
    await bulkAddWords(uniqueWords, onProgress);
  };

  const handleDeleteWord = async (wordId) => {
    if (pack?.name === 'Irregular Verbs') return;
    if (window.confirm("Rostdan ham bu so'zni o'chirmoqchimisiz?")) {
      await deleteWord(wordId);
    }
  };

  if (!pack) {
    return (
      <div className="ios-activity-indicator" style={{ marginTop: '100px' }}>
        <IosSpinner />
        <span>Yuklanmoqda...</span>
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
          ← Kutubxona
        </button>
      </div>

      <div className="pack-detail-header" style={{ borderBottom: `4px solid ${pack.color || 'var(--accent-1)'}` }}>
        <div className="pack-detail-info">
          <div className="pack-detail-icon">{pack.icon}</div>
          <div className="pack-detail-text">
            <h1>{pack.name}</h1>
            {pack.description && <p>{pack.description}</p>}
            <div className="book-stats">
              <span className="book-stat-badge">📝 {words.length} ta so'z</span>
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
                🃏 Flashkart
              </button>
              <button 
                className="btn btn-primary btn-mashq" 
                onClick={() => navigate(`/practice/packs/${packId}?mode=irregular-verbs&subStep=practice&count=10`)}
              >
                ⚡ Mashq qilish
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-cards" onClick={() => navigate(`/cards/packs/${packId}`)}>
                🃏 Cards Mode
              </button>
              <button className="btn btn-primary btn-mashq" onClick={() => navigate(`/practice/packs/${packId}`)}>
                🎮 Mashq qilish
              </button>
            </>
          )}
        </div>
      </div>

      <WordList
        words={words}
        onEdit={handleEditWord}
        onDelete={handleDeleteWord}
        loading={loading}
        readOnly={pack.name === 'Irregular Verbs'}
        groupFn={pack.name === 'Irregular Verbs' ? getIrregularVerbGroup : undefined}
      />

      <WordForm
        isOpen={showWordForm}
        onClose={() => { setShowWordForm(false); setEditingWord(null); }}
        onSave={handleSaveWord}
        editWord={editingWord}
      />

      <BulkImportForm
        isOpen={showBulkImportForm}
        onClose={() => setShowBulkImportForm(false)}
        onImport={handleBulkImport}
      />

      {pack.name !== 'Irregular Verbs' && (
        <SpeedDialFAB
          onAddWord={() => { setEditingWord(null); setShowWordForm(true); }}
          onImportJson={() => setShowBulkImportForm(true)}
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
            <h3>Yangi so'zlar qo'shildi!</h3>
            <p>Bu to'plamga {newWordsAddedCount} ta yangi so'z avtomatik qo'shildi.</p>
            <button className="ios-alert-btn" onClick={() => setNewWordsAddedCount(null)}>OK</button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
