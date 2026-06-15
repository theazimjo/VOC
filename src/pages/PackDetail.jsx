import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePacks } from '../hooks/usePacks';
import { useWords } from '../hooks/useWords';
import { levelOptions } from '../utils/helpers';
import WordList from '../components/Words/WordList';
import WordForm from '../components/Words/WordForm';
import BulkImportForm from '../components/Words/BulkImportForm';
import './PackDetail.css';

export default function PackDetail() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const { getPack, updatePack, deletePack } = usePacks();
  const { words, loading, addWord, updateWord, deleteWord } = useWords('packs', packId);
  
  const [pack, setPack] = useState(null);
  const [showWordForm, setShowWordForm] = useState(false);
  const [showBulkImportForm, setShowBulkImportForm] = useState(false);
  const [editingWord, setEditingWord] = useState(null);

  useEffect(() => {
    const fetchPack = async () => {
      const p = await getPack(packId);
      if (p) setPack(p);
      else navigate('/packs');
    };
    fetchPack();
  }, [packId, getPack, navigate]);

  const handleSaveWord = async (data) => {
    if (editingWord) {
      await updateWord(editingWord.id, data);
    } else {
      await addWord(data);
    }
    setShowWordForm(false);
    setEditingWord(null);
  };

  const handleEditWord = (word) => {
    setEditingWord(word);
    setShowWordForm(true);
  };

  const handleBulkImport = async (newWords) => {
    // We add them sequentially
    for (const wordData of newWords) {
      await addWord(wordData);
    }
  };

  const handleDeleteWord = async (wordId) => {
    if (window.confirm("Rostdan ham bu so'zni o'chirmoqchimisiz?")) {
      await deleteWord(wordId);
    }
  };

  const handleDeletePack = async () => {
    if (window.confirm("To'plamni va undagi barcha so'zlarni o'chirmoqchimisiz?")) {
      await deletePack(packId);
      navigate('/packs');
    }
  };

  if (!pack) return <div className="empty-state">Yuklanmoqda...</div>;

  const levelInfo = levelOptions.find(l => l.value === pack.level) || levelOptions[0];

  return (
    <motion.div
      className="pack-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="pack-detail-header" style={{ borderBottom: `4px solid ${pack.color || 'var(--accent-1)'}` }}>
        <div className="pack-detail-info">
          <div className="pack-detail-icon">{pack.icon}</div>
          <div className="pack-detail-text">
            <h1>{pack.name}</h1>
            {pack.description && <p>{pack.description}</p>}
            <div className="book-stats">
              <span className="book-stat-badge" style={{ color: levelInfo.color, borderColor: levelInfo.color }}>
                {levelInfo.label}
              </span>
              <span className="book-stat-badge">📝 {words.length} ta so'z</span>
            </div>
          </div>
        </div>
        <div className="pack-detail-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/packs')}>Orqaga</button>
          <button className="btn btn-secondary" onClick={() => setShowBulkImportForm(true)}>+ JSON Import</button>
          <button className="btn btn-primary" onClick={() => { setEditingWord(null); setShowWordForm(true); }}>
            + So'z qo'shish
          </button>
          <button className="btn btn-danger btn-icon" onClick={handleDeletePack}>🗑</button>
        </div>
      </div>

      <WordList 
        words={words} 
        onEdit={handleEditWord} 
        onDelete={handleDeleteWord} 
        loading={loading}
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
    </motion.div>
  );
}
