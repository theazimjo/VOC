import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePacks } from '../hooks/usePacks';
import { useWords } from '../hooks/useWords';
import WordList from '../components/Words/WordList';
import WordForm from '../components/Words/WordForm';
import BulkImportForm from '../components/Words/BulkImportForm';
import SpeedDialFAB from '../components/Words/SpeedDialFAB';
import './PackDetail.css';

export default function PackDetail() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const { getPack } = usePacks();
  const { words, loading, addWord, updateWord, deleteWord, bulkAddWords } = useWords('packs', packId);
  
  const [pack, setPack] = useState(null);
  const [showWordForm, setShowWordForm] = useState(false);
  const [showBulkImportForm, setShowBulkImportForm] = useState(false);
  const [editingWord, setEditingWord] = useState(null);

  useEffect(() => {
    const fetchPack = async () => {
      const p = await getPack(packId);
      if (p) setPack(p);
      else navigate('/library?tab=packs');
    };
    fetchPack();
  }, [packId, getPack, navigate]);

  const handleSaveWord = async (data) => {
    if (pack?.name === 'Irregular Verbs') return;
    if (editingWord) {
      await updateWord(editingWord.id, data);
    } else {
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
    await bulkAddWords(newWords, onProgress);
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
        <div className="ios-spinner-ring"></div>
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
    </motion.div>
  );
}
