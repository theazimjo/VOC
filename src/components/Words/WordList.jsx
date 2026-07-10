import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import WordCard from './WordCard';
import IosSpinner from '../common/IosSpinner';
import './WordList.css';

export default function WordList({ words, onEdit, onDelete, loading, readOnly, groupFn }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(groupFn ? 'group' : 'date-desc');

  if (loading) {
    return (
      <div className="ios-activity-indicator">
        <IosSpinner />
        <span>Yuklanmoqda...</span>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📝</div>
        <h3>Hali so'zlar yo'q</h3>
        <p>"+ So'z qo'shish" tugmasini bosib yangi so'zlarni kiriting</p>
      </div>
    );
  }

  const filteredWords = words.filter(w => 
    w.word.toLowerCase().includes(search.toLowerCase()) || 
    w.translation.toLowerCase().includes(search.toLowerCase())
  );

  const sortedWords = [...filteredWords].sort((a, b) => {
    if (sortBy === 'group' && groupFn) {
      const diff = groupFn(a.word).id - groupFn(b.word).id;
      return diff !== 0 ? diff : a.word.localeCompare(b.word);
    }
    if (sortBy === 'date-desc') return new Date(b.addedAt || 0) - new Date(a.addedAt || 0);
    if (sortBy === 'date-asc') return new Date(a.addedAt || 0) - new Date(b.addedAt || 0);
    if (sortBy === 'alpha-asc') return a.word.localeCompare(b.word);
    if (sortBy === 'mastery-asc') return (a.mastery || 0) - (b.mastery || 0);
    if (sortBy === 'mastery-desc') return (b.mastery || 0) - (a.mastery || 0);
    return 0;
  });

  let lastGroupId = null;

  return (
    <div>
      <div className="word-list-controls">
        <div className="search-bar word-list-search">
          <span className="search-icon"><Search size={16} strokeWidth={2.4} /></span>
          <input 
            type="text" 
            className="input" 
            placeholder="So'z yoki tarjima bo'yicha qidirish..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="word-list-filters">
          <select className="select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            {groupFn && <option value="group">Guruh bo'yicha</option>}
            <option value="date-desc">Eng yangilari oldin</option>
            <option value="date-asc">Eng eskilar oldin</option>
            <option value="alpha-asc">Alifbo bo'yicha (A-Z)</option>
            <option value="mastery-desc">O'zlashtirish (Yuqori-past)</option>
            <option value="mastery-asc">O'zlashtirish (Past-yuqori)</option>
          </select>
        </div>
      </div>

      <div className="word-list-grid">
        <AnimatePresence>
          {sortedWords.map(word => {
            let groupHeader = null;
            if (sortBy === 'group' && groupFn) {
              const group = groupFn(word.word);
              if (group.id !== lastGroupId) {
                lastGroupId = group.id;
                groupHeader = (
                  <div className="word-group-header" key={`group-${group.id}`}>
                    <span className="word-group-title">{group.title}</span>
                    <span className="word-group-pattern">{group.pattern}</span>
                  </div>
                );
              }
            }
            return (
              <div key={word.id} className="word-group-item-wrap">
                {groupHeader}
                <WordCard
                  word={word}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  readOnly={readOnly}
                />
              </div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
