import { useState } from 'react';
import { ArrowLeft, BookOpen, Search, ChevronRight } from 'lucide-react';
import './TeacherPackViewer.css';

const POS_LABELS = {
  noun: 'ot',
  verb: "fe'l",
  adjective: 'sifat',
  adverb: 'ravish',
  phrase: 'ibora',
  preposition: 'predlog',
  other: 'boshqa'
};

export default function TeacherPackViewer({ pack, onBack }) {
  const months = pack.months && pack.months.length > 0
    ? pack.months
    : pack.units && pack.units.length > 0
      ? [{ id: 'm1', title: '1-Oy', units: pack.units }]
      : pack.words && pack.words.length > 0
        ? [{ id: 'm1', title: '1-Oy', units: [{ id: 'u1', title: '1-Mavzu', words: pack.words }] }]
        : [];

  const [monthId, setMonthId] = useState(null);
  const [unitId, setUnitId] = useState(null);
  const [search, setSearch] = useState('');

  const activeMonth = months.find(m => m.id === monthId) || null;
  const activeUnit = activeMonth?.units?.find(u => u.id === unitId) || null;

  const filteredWords = (activeUnit?.words || []).filter(w => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (w.word || '').toLowerCase().includes(q) ||
      (w.translation || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="tpv-container">
      {/* Simple header, same on every level */}
      <div className="tpv-header">
        <button
          type="button"
          className="tpv-back"
          onClick={() => {
            if (activeUnit) { setUnitId(null); setSearch(''); }
            else if (activeMonth) setMonthId(null);
            else onBack();
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <div className="tpv-title">
          <h2>{activeUnit ? activeUnit.title : activeMonth ? activeMonth.title : pack.title}</h2>
          <span>
            {activeUnit
              ? `${activeMonth.title} · ${(activeUnit.words || []).length} ta so'z`
              : activeMonth
                ? `${(activeMonth.units || []).length} ta mavzu`
                : `${months.length} ta oy`}
          </span>
        </div>
      </div>

      {/* Level 1: Months */}
      {!activeMonth && (
        <div className="tpv-list">
          {months.length === 0 ? (
            <div className="tpv-empty">
              <BookOpen size={32} />
              <p>Bu packda hali bo'limlar yo'q.</p>
            </div>
          ) : (
            months.map((m, idx) => (
              <button type="button" key={m.id} className="tpv-row" onClick={() => setMonthId(m.id)}>
                <span className="tpv-row-num">{idx + 1}</span>
                <span className="tpv-row-label">{m.title}</span>
                <span className="tpv-row-meta">{(m.units || []).length} ta mavzu</span>
                <ChevronRight size={18} className="tpv-row-arrow" />
              </button>
            ))
          )}
        </div>
      )}

      {/* Level 2: Units */}
      {activeMonth && !activeUnit && (
        <div className="tpv-list">
          {(activeMonth.units || []).length === 0 ? (
            <div className="tpv-empty">
              <BookOpen size={32} />
              <p>Bu oyda hali mavzular yo'q.</p>
            </div>
          ) : (
            activeMonth.units.map((u, idx) => (
              <button type="button" key={u.id} className="tpv-row" onClick={() => setUnitId(u.id)}>
                <span className="tpv-row-num">{idx + 1}</span>
                <span className="tpv-row-label">{u.title}</span>
                <span className="tpv-row-meta">{(u.words || []).length} ta so'z</span>
                <ChevronRight size={18} className="tpv-row-arrow" />
              </button>
            ))
          )}
        </div>
      )}

      {/* Level 3: Words */}
      {activeUnit && (
        <div className="tpv-words">
          <div className="tpv-search-wrap">
            <Search size={15} className="tpv-search-icon" />
            <input
              type="text"
              placeholder="So'z qidirish..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {filteredWords.length === 0 ? (
            <div className="tpv-empty">
              <BookOpen size={32} />
              <p>{search ? "Qidiruv bo'yicha so'z topilmadi." : "Bu mavzuda hali so'zlar yo'q."}</p>
            </div>
          ) : (
            <div className="tpv-words-grid">
              {filteredWords.map(w => (
                <div key={w.id} className="tpv-word-card">
                  <div className="tpv-word-top">
                    <strong>{w.word}</strong>
                    <span className={`tpv-pos tpv-pos-${w.partOfSpeech || 'noun'}`}>
                      {POS_LABELS[w.partOfSpeech] || POS_LABELS.other}
                    </span>
                  </div>
                  <div className="tpv-word-translation">{w.translation}</div>
                  {w.definition && <div className="tpv-word-def">{w.definition}</div>}
                  {w.example && <div className="tpv-word-example">"{w.example}"</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
