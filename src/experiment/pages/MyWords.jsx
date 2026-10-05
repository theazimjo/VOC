import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { computeUserRate } from '@voc/memory-engine';
import { useLanguage } from '../../contexts/LanguageContext';
import { labCopy } from '../labContent';
import { wordStatus, daysUntilReview } from '../wordStatus';

const PAGE = 30;
const RANK = { weak: 0, medium: 1, new: 2, strong: 3 };

/** "My words": every word with a plain status and when it comes back. */
export default function MyWords({ memoryMap, confusionPairs, loading }) {
  const { language } = useLanguage();
  const c = labCopy(language).words;
  const statusLabel = labCopy(language).status;
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [shown, setShown] = useState(PAGE);

  const rows = useMemo(() => {
    const now = Date.now();
    const list = Object.values(memoryMap).filter((m) => m.wordData?.word);
    const userRate = computeUserRate(list);
    return list
      .map((m) => ({ m, s: wordStatus(m, userRate, now), days: daysUntilReview(m, now) }))
      .sort((a, b) => (Number(b.s.due) - Number(a.s.due)) || (RANK[a.s.key] - RANK[b.s.key]) || a.m.wordData.word.localeCompare(b.m.wordData.word));
  }, [memoryMap]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(({ m, s }) => {
      if (filter === 'due' && !(s.due && s.key !== 'strong')) return false;
      if (filter === 'weak' && s.key !== 'weak') return false;
      if (filter === 'strong' && s.key !== 'strong') return false;
      if (!q) return true;
      return `${m.wordData.word} ${m.wordData.translation || ''}`.toLowerCase().includes(q);
    });
  }, [rows, query, filter]);

  const pairs = useMemo(
    () => [...(confusionPairs || [])].filter((p) => p.wordA && p.wordB).sort((a, b) => (b.count || 0) - (a.count || 0)).slice(0, 5),
    [confusionPairs],
  );

  if (loading) return <div className="mem-loading"><div className="mem-spinner" /></div>;
  if (rows.length === 0) return <div className="mem-empty-state"><p>{c.empty}</p></div>;

  const nextText = ({ s, days }) => {
    if (s.key === 'new') return c.notStarted;
    if (s.due || days === 0) return c.dueToday;
    return days == null ? '' : c.inDays(days);
  };

  return (
    <div className="mem-words">
      <div className="mem-words-head">
        <h2 className="mem-words-title">{c.title}</h2>
        <span className="mem-words-total">{c.total(rows.length)}</span>
      </div>
      <p className="mem-words-legend">{c.legend}</p>

      <label className="mem-words-search">
        <Search size={16} aria-hidden="true" />
        <input type="search" value={query} onChange={(e) => { setQuery(e.target.value); setShown(PAGE); }} placeholder={c.search} />
      </label>

      <div className="mem-words-filters" role="group">
        {['all', 'due', 'weak', 'strong'].map((key) => (
          <button key={key} type="button" className={`mem-filter ${filter === key ? 'is-on' : ''}`} aria-pressed={filter === key} onClick={() => { setFilter(key); setShown(PAGE); }}>
            {c.filters[key]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mem-words-none">{c.none}</p>
      ) : (
        <ul className="mem-wlist">
          {filtered.slice(0, shown).map((row) => (
            <li key={row.m.wordId} className="mem-wrow">
              <div className="mem-wrow-text">
                <span className="mem-wrow-word">{row.m.wordData.word}</span>
                <span className="mem-wrow-trans">{row.m.wordData.translation}</span>
              </div>
              <div className="mem-wrow-side">
                <span className={`mem-chip mem-chip--${row.s.key}`}>{statusLabel[row.s.key]}</span>
                <span className="mem-wrow-next">{nextText(row)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {filtered.length > shown && (
        <button type="button" className="mem-btn-secondary mem-words-more" onClick={() => setShown((n) => n + PAGE)}>
          {c.loadMore(Math.min(PAGE, filtered.length - shown))}
        </button>
      )}

      {pairs.length > 0 && (
        <section className="mem-confused">
          <h3>{c.confusedTitle}</h3>
          <p>{c.confusedSub}</p>
          <ul>
            {pairs.map((p) => (
              <li key={p.key || `${p.wordA}-${p.wordB}`}>
                <span>{p.wordA} ↔ {p.wordB}</span>
                <span className="mem-confused-n">{c.confusedCount(p.count || 1)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
