import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { GREEK_VOCABULARY, GREEK_VOCAB_CATEGORIES } from '../../data/greekVocabulary';
import { useAuth } from '../../contexts/AuthContext';
import { useGreekVocabWords } from '../../hooks/useGreekVocabWords';
import { saveGreekVocabReview } from '../../utils/greekVocabReview';
import { computeRetentionStats } from '../../utils/memoryEngine';
import WordList from '../../components/Words/WordList';
import GreekVocabPractice from '../../components/greek/GreekVocabPractice';
import './GreekVocabulary.css';

// Mirrors the personal PackDetail.jsx page (header stats + Memory Twin +
// topic chips + WordList), minus everything that only makes sense for a
// user-editable pack (add/edit/delete word, photo import, daily limits,
// custom chapters) — this is a fixed, curated 37-word curriculum. Words
// live at their own RTDB path (see useGreekVocabWords), seeded once here,
// so this never touches or appears in the personal library/Dashboard/Stats.
export default function GreekVocabulary() {
  const { user } = useAuth();
  const { words, loading, bulkAddWords } = useGreekVocabWords();
  const [topicFilter, setTopicFilter] = useState(null);
  const [showPractice, setShowPractice] = useState(false);
  const seedAttempted = useRef(false);

  useEffect(() => {
    if (loading || seedAttempted.current || words.length > 0) return;
    seedAttempted.current = true;
    bulkAddWords(
      GREEK_VOCABULARY.map((w) => ({
        word: w.greek,
        translation: w.uz,
        notes: w.translit,
        topic: w.category,
      }))
    );
  }, [loading, words.length, bulkAddWords]);

  const displayedWords = topicFilter ? words.filter((w) => w.topic === topicFilter) : words;

  const topicMastery = {};
  GREEK_VOCAB_CATEGORIES.forEach((cat) => {
    const catWords = words.filter((w) => w.topic === cat.id);
    if (catWords.length === 0) return;
    topicMastery[cat.id] = Math.round(catWords.reduce((sum, w) => sum + (w.mastery || 0), 0) / catWords.length);
  });

  const memoryStats = (() => {
    const { retentionPercent, atRisk, reviewedCount } = computeRetentionStats(displayedWords);
    if (reviewedCount === 0) return null;
    const masteryPercent = Math.round(
      displayedWords.reduce((sum, w) => sum + (w.mastery || 0), 0) / displayedWords.length
    );
    return { masteryPercent, retentionPercent, atRisk };
  })();

  const handleUpdateWord = async (wordId, reviewInput) => {
    const word = words.find((w) => w.id === wordId);
    if (!word || !user) return null;
    return saveGreekVocabReview(user.uid, wordId, word, reviewInput);
  };

  if (showPractice) {
    return (
      <GreekVocabPractice
        words={displayedWords}
        allWords={words}
        onUpdateWord={handleUpdateWord}
        onExit={() => setShowPractice(false)}
      />
    );
  }

  return (
    <motion.div className="greek-vocab-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="greek-vocab-header">
        <div>
          <h1 className="greek-vocab-title">So'z boyligi</h1>
          <p className="greek-vocab-subtitle">{words.length} ta so'z — Ελληνικό λεξιλόγιο</p>
        </div>
        <button className="greek-vocab-practice-cta" onClick={() => setShowPractice(true)}>
          Mashq qilish
        </button>
      </div>

      {memoryStats && (
        <div className="greek-vocab-memtwin">
          <div className="greek-vocab-memtwin-header">
            <Brain size={15} strokeWidth={2.2} />
            <span>Xotira holati</span>
            {topicFilter && <span className="greek-vocab-memtwin-scope">{topicFilter}</span>}
          </div>
          <div className="greek-vocab-memtwin-stats">
            <div><strong>{memoryStats.masteryPercent}%</strong><span>o'zlashtirilgan</span></div>
            <div><strong>{memoryStats.retentionPercent}%</strong><span>eslab qolish</span></div>
            <div><strong>{memoryStats.atRisk}</strong><span>xavf ostida</span></div>
          </div>
        </div>
      )}

      <div className="greek-vocab-topic-row">
        <button
          className={`greek-vocab-topic-chip ${topicFilter === null ? 'active' : ''}`}
          onClick={() => setTopicFilter(null)}
        >
          Barchasi
        </button>
        {GREEK_VOCAB_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`greek-vocab-topic-chip ${topicFilter === cat.id ? 'active' : ''}`}
            style={topicMastery[cat.id] !== undefined ? { '--chip-mastery': `${topicMastery[cat.id]}%` } : undefined}
            onClick={() => setTopicFilter(cat.id)}
          >
            {topicMastery[cat.id] !== undefined && <span className="greek-vocab-topic-chip-fill" aria-hidden="true" />}
            <span className="greek-vocab-topic-chip-label">{cat.icon} {cat.title}</span>
          </button>
        ))}
      </div>

      <WordList words={displayedWords} loading={loading} readOnly language="el-GR" />
    </motion.div>
  );
}
