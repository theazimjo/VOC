import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePacks } from '../hooks/usePacks';
import PackList from '../components/Packs/PackList';
import PackForm from '../components/Packs/PackForm';
import { packIcons } from '../utils/helpers';

export default function PacksPage() {
  const { packs, loading, addPack } = usePacks();
  const [showForm, setShowForm] = useState(false);

  const handleSave = async (data) => {
    await addPack({
      name: data.name,
      description: data.description || '',
      color: data.color || 'var(--accent-gradient)',
      icon: data.icon || packIcons[Math.floor(Math.random() * packIcons.length)],
      level: data.level || 'beginner',
    });
    setShowForm(false);
  };

  return (
    <motion.div
      style={{ padding: 'var(--space-lg)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="page-header">
        <h1>📦 So'z to'plamlari</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + To'plam yaratish
        </button>
      </div>

      {loading ? (
        <div className="empty-state"><p>Yuklanmoqda...</p></div>
      ) : packs.length > 0 ? (
        <PackList packs={packs} />
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h3>To'plamlar topilmadi</h3>
          <p>Mavzu bo'yicha so'z to'plamlari yarating — IELTS, Business English, Daily Life va boshqalar</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Birinchi to'plamni yaratish
          </button>
        </div>
      )}

      <PackForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSave}
      />
    </motion.div>
  );
}
