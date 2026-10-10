import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Reorder, useDragControls, motion } from 'framer-motion';
import { GripVertical, Pencil, Trash2, Plus, X, Check, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import './ChapterManagerSheet.css';

const COPY = {
  uz: { title: 'Boblar', all: 'Barcha boblar', edit: 'Tahrirlash', done: 'Tayyor', hint: "Tartibni o'zgartirish uchun chap tomondagi tutqichni ushlab suring.", words: (n) => `${n} ta so'z`, add: "Bob qo'shish", rename: "Nomini o'zgartirish", del: "O'chirish", close: 'Yopish', empty: "Hali bob yo'q" },
  ru: { title: 'Главы', all: 'Все главы', edit: 'Изменить', done: 'Готово', hint: 'Чтобы изменить порядок, удерживайте и тяните ручку слева.', words: (n) => `${n} слов`, add: 'Добавить главу', rename: 'Переименовать', del: 'Удалить', close: 'Закрыть', empty: 'Пока нет глав' },
  en: { title: 'Chapters', all: 'All chapters', edit: 'Edit', done: 'Done', hint: 'To change the order, hold and drag the handle on the left.', words: (n) => `${n} words`, add: 'Add chapter', rename: 'Rename', del: 'Delete', close: 'Close', empty: 'No chapters yet' },
};

function Row({ topic, count, mastery, active, editing, c, onPick, onRename, onDelete }) {
  const controls = useDragControls();
  return (
    <Reorder.Item
      value={topic} as="li" dragListener={false} dragControls={controls}
      className={`cms-row${active ? ' is-active' : ''}`}
      whileDrag={{ scale: 1.02, boxShadow: '0 10px 28px rgba(0,0,0,.22)' }}
    >
      {editing && <span className="cms-handle" onPointerDown={(e) => controls.start(e)} aria-hidden="true"><GripVertical size={18} /></span>}
      <button type="button" className="cms-pick" onClick={() => !editing && onPick?.(topic)} disabled={editing}>
        <span className="cms-main">
          <strong>{topic}</strong>
          <small>{c.words(count)}{mastery !== undefined ? ` · ${mastery}%` : ''}</small>
        </span>
        {!editing && (active ? <Check size={18} className="cms-check" /> : <ChevronRight size={16} className="cms-chev" />)}
      </button>
      {editing && (
        <>
          <button type="button" className="cms-btn" onClick={() => onRename(topic)} aria-label={c.rename} title={c.rename}><Pencil size={16} /></button>
          <button type="button" className="cms-btn is-danger" onClick={() => onDelete(topic)} aria-label={c.del} title={c.del}><Trash2 size={16} /></button>
        </>
      )}
    </Reorder.Item>
  );
}

// Pick a chapter, or switch to editing to reorder (handle), rename, delete and add chapters.
export default function ChapterManagerSheet({
  topics, wordCounts, masteries = {}, activeTopic = null, totalWords = 0,
  onPick, onReorder, onRename, onDelete, onAdd, onClose,
}) {
  const { language } = useLanguage();
  const c = COPY[language] || COPY.en;
  const [editing, setEditing] = useState(false);
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
          <span className="cms-head-actions">
            <button type="button" className="cms-edit" onClick={() => setEditing((v) => !v)}>{editing ? c.done : c.edit}</button>
            <button type="button" className="cms-close" onClick={onClose} aria-label={c.close}><X size={18} /></button>
          </span>
        </div>
        {editing && <p className="cms-hint">{c.hint}</p>}
        {!editing && onPick && (
          <button type="button" className={`cms-all${activeTopic === null ? ' is-active' : ''}`} onClick={() => onPick(null)}>
            <span className="cms-main"><strong>{c.all}</strong><small>{c.words(totalWords)}</small></span>
            {activeTopic === null && <Check size={18} className="cms-check" />}
          </button>
        )}
        {topics.length > 0 ? (
          <Reorder.Group axis="y" values={topics} onReorder={onReorder} as="ul" className="cms-list">
            {topics.map((topic) => (
              <Row
                key={topic} topic={topic} count={wordCounts[topic] || 0} mastery={masteries[topic]}
                active={activeTopic === topic} editing={editing} c={c}
                onPick={onPick} onRename={onRename} onDelete={onDelete}
              />
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
