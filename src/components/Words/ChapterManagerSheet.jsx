import { createPortal } from 'react-dom';
import { Reorder, useDragControls, motion } from 'framer-motion';
import { GripVertical, Pencil, Trash2, Plus, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import './ChapterManagerSheet.css';

const COPY = {
  uz: { title: 'Boblar', hint: "Tartibni o'zgartirish uchun chap tomondagi tutqichni ushlab suring.", words: (n) => `${n} ta so'z`, add: "Bob qo'shish", rename: "Nomini o'zgartirish", del: "O'chirish", close: 'Yopish', empty: "Hali bob yo'q" },
  ru: { title: 'Главы', hint: 'Чтобы изменить порядок, удерживайте и тяните ручку слева.', words: (n) => `${n} слов`, add: 'Добавить главу', rename: 'Переименовать', del: 'Удалить', close: 'Закрыть', empty: 'Пока нет глав' },
  en: { title: 'Chapters', hint: 'To change the order, hold and drag the handle on the left.', words: (n) => `${n} words`, add: 'Add chapter', rename: 'Rename', del: 'Delete', close: 'Close', empty: 'No chapters yet' },
};

function Row({ topic, count, c, onRename, onDelete }) {
  const controls = useDragControls();
  return (
    <Reorder.Item value={topic} as="li" dragListener={false} dragControls={controls} className="cms-row" whileDrag={{ scale: 1.02, boxShadow: '0 10px 28px rgba(0,0,0,.22)' }}>
      <span className="cms-handle" onPointerDown={(e) => controls.start(e)} aria-hidden="true"><GripVertical size={18} /></span>
      <span className="cms-main">
        <strong>{topic}</strong>
        <small>{c.words(count)}</small>
      </span>
      <button type="button" className="cms-btn" onClick={() => onRename(topic)} aria-label={c.rename} title={c.rename}><Pencil size={16} /></button>
      <button type="button" className="cms-btn is-danger" onClick={() => onDelete(topic)} aria-label={c.del} title={c.del}><Trash2 size={16} /></button>
    </Reorder.Item>
  );
}

// Everything for chapters in one place: reorder with a handle, rename, delete and add.
export default function ChapterManagerSheet({ topics, wordCounts, onReorder, onRename, onDelete, onAdd, onClose }) {
  const { language } = useLanguage();
  const c = COPY[language] || COPY.en;
  return createPortal(
    <div className="cms-back" role="dialog" aria-modal="true" aria-label={c.title} onClick={onClose}>
      <motion.div
        className="cms-sheet"
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cms-grab" aria-hidden="true" />
        <div className="cms-head">
          <h3>{c.title}</h3>
          <button type="button" className="cms-close" onClick={onClose} aria-label={c.close}><X size={18} /></button>
        </div>
        <p className="cms-hint">{c.hint}</p>
        {topics.length > 0 ? (
          <Reorder.Group axis="y" values={topics} onReorder={onReorder} as="ul" className="cms-list">
            {topics.map((topic) => (
              <Row key={topic} topic={topic} count={wordCounts[topic] || 0} c={c} onRename={onRename} onDelete={onDelete} />
            ))}
          </Reorder.Group>
        ) : (
          <p className="cms-empty">{c.empty}</p>
        )}
        <button type="button" className="cms-add" onClick={onAdd}><Plus size={18} /> {c.add}</button>
      </motion.div>
    </div>,
    document.body
  );
}
