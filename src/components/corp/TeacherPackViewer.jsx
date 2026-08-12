import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Search, ChevronRight, Plus, Check, X } from 'lucide-react';
import { updateCustomPack } from '../../services/corpService';
import { updateIndependentCustomPack } from '../../services/independentTeacherService';
import './TeacherPackViewer.css';

const POS_LABELS = {
  noun: 'noun',
  verb: 'verb',
  adjective: 'adjective',
  adverb: 'adverb',
  phrase: 'phrase',
  preposition: 'preposition',
  other: 'other'
};

const EMPTY_WORD_FORM = { word: '', translation: '', partOfSpeech: 'noun', definition: '', example: '' };

function deriveMonths(pack) {
  if (pack.months && pack.months.length > 0) return pack.months;
  if (pack.units && pack.units.length > 0) return [{ id: 'm1', title: 'Month 1', units: pack.units }];
  if (pack.words && pack.words.length > 0) return [{ id: 'm1', title: 'Month 1', units: [{ id: 'u1', title: 'Topic 1', words: pack.words }] }];
  return [];
}

export default function TeacherPackViewer({ pack, onBack, editable = false, centerId, independentUid = null, onUpdate }) {
  const [months, setMonths] = useState(() => deriveMonths(pack));
  const [monthId, setMonthId] = useState(null);
  const [unitId, setUnitId] = useState(null);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);

  const [addingMonth, setAddingMonth] = useState(false);
  const [newMonthTitle, setNewMonthTitle] = useState('');
  const [addingUnit, setAddingUnit] = useState(false);
  const [newUnitTitle, setNewUnitTitle] = useState('');
  const [addingWord, setAddingWord] = useState(false);
  const [wordForm, setWordForm] = useState(EMPTY_WORD_FORM);

  useEffect(() => {
    setMonths(deriveMonths(pack));
    setMonthId(null);
    setUnitId(null);
  }, [pack.id]);

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

  const persist = async (updatedMonths) => {
    setMonths(updatedMonths);
    if (!editable) return;
    setSaving(true);
    try {
      const flatUnits = updatedMonths.flatMap(m => m.units || []);
      const flatWords = flatUnits.flatMap(u => u.words || []);
      const updates = { months: updatedMonths, units: flatUnits, words: flatWords, wordCount: flatWords.length };
      if (independentUid) {
        await updateIndependentCustomPack(independentUid, pack.id, updates);
      } else {
        await updateCustomPack(centerId, pack.id, updates);
      }
      if (onUpdate) onUpdate({ ...pack, ...updates });
    } catch (err) {
      alert('Error saving: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddMonth = (e) => {
    e.preventDefault();
    const title = newMonthTitle.trim();
    if (!title) return;
    const newMonth = { id: 'month_' + Date.now(), title, units: [] };
    setNewMonthTitle('');
    setAddingMonth(false);
    persist([...months, newMonth]);
  };

  const handleAddUnit = (e) => {
    e.preventDefault();
    const title = newUnitTitle.trim();
    if (!title || !activeMonth) return;
    const newUnit = { id: 'unit_' + Date.now(), title, words: [] };
    const updated = months.map(m => m.id === activeMonth.id ? { ...m, units: [...(m.units || []), newUnit] } : m);
    setNewUnitTitle('');
    setAddingUnit(false);
    persist(updated);
  };

  const handleAddWord = (e) => {
    e.preventDefault();
    if (!wordForm.word.trim() || !wordForm.translation.trim() || !activeMonth || !activeUnit) return;
    const wordItem = {
      id: 'w_' + Date.now(),
      word: wordForm.word.trim(),
      translation: wordForm.translation.trim(),
      partOfSpeech: wordForm.partOfSpeech || 'noun',
      definition: wordForm.definition.trim(),
      example: wordForm.example.trim(),
    };
    const updated = months.map(m => {
      if (m.id !== activeMonth.id) return m;
      return {
        ...m,
        units: (m.units || []).map(u => u.id === activeUnit.id ? { ...u, words: [...(u.words || []), wordItem] } : u),
      };
    });
    setWordForm(EMPTY_WORD_FORM);
    setAddingWord(false);
    persist(updated);
  };

  return (
    <div className="tpv-container">
      {/* Simple header, same on every level */}
      <div className="tpv-header">
        <button
          type="button"
          className="tpv-back"
          onClick={() => {
            if (activeUnit) { setUnitId(null); setSearch(''); setAddingWord(false); }
            else if (activeMonth) { setMonthId(null); setAddingUnit(false); }
            else onBack();
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <div className="tpv-title">
          <h2>{activeUnit ? activeUnit.title : activeMonth ? activeMonth.title : pack.title}</h2>
          <span>
            {activeUnit
              ? `${activeMonth.title} · ${(activeUnit.words || []).length} words`
              : activeMonth
                ? `${(activeMonth.units || []).length} topics`
                : `${months.length} months`}
          </span>
        </div>
      </div>

      {/* Level 1: Months */}
      {!activeMonth && (
        <div className="tpv-list">
          {months.length === 0 && !editable && (
            <div className="tpv-empty">
              <BookOpen size={32} />
              <p>This pack has no sections yet.</p>
            </div>
          )}

          {months.map((m, idx) => (
            <button type="button" key={m.id} className="tpv-row" onClick={() => setMonthId(m.id)}>
              <span className="tpv-row-num">{idx + 1}</span>
              <span className="tpv-row-label">{m.title}</span>
              <span className="tpv-row-meta">{(m.units || []).length} topics</span>
              <ChevronRight size={18} className="tpv-row-arrow" />
            </button>
          ))}

          {editable && (
            addingMonth ? (
              <form onSubmit={handleAddMonth} className="tpv-add-form">
                <input
                  type="text"
                  placeholder="Month name"
                  value={newMonthTitle}
                  onChange={e => setNewMonthTitle(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="tpv-add-confirm" title="Add" disabled={saving}><Check size={16} /></button>
                <button type="button" className="tpv-add-cancel" title="Cancel" onClick={() => { setAddingMonth(false); setNewMonthTitle(''); }}><X size={16} /></button>
              </form>
            ) : (
              <button type="button" className="tpv-add-row" onClick={() => setAddingMonth(true)}>
                <Plus size={16} /> Add Month
              </button>
            )
          )}
        </div>
      )}

      {/* Level 2: Units */}
      {activeMonth && !activeUnit && (
        <div className="tpv-list">
          {(activeMonth.units || []).length === 0 && !editable && (
            <div className="tpv-empty">
              <BookOpen size={32} />
              <p>No topics in this month yet.</p>
            </div>
          )}

          {(activeMonth.units || []).map((u, idx) => (
            <button type="button" key={u.id} className="tpv-row" onClick={() => setUnitId(u.id)}>
              <span className="tpv-row-num">{idx + 1}</span>
              <span className="tpv-row-label">{u.title}</span>
              <span className="tpv-row-meta">{(u.words || []).length} words</span>
              <ChevronRight size={18} className="tpv-row-arrow" />
            </button>
          ))}

          {editable && (
            addingUnit ? (
              <form onSubmit={handleAddUnit} className="tpv-add-form">
                <input
                  type="text"
                  placeholder="Set name"
                  value={newUnitTitle}
                  onChange={e => setNewUnitTitle(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="tpv-add-confirm" title="Add" disabled={saving}><Check size={16} /></button>
                <button type="button" className="tpv-add-cancel" title="Cancel" onClick={() => { setAddingUnit(false); setNewUnitTitle(''); }}><X size={16} /></button>
              </form>
            ) : (
              <button type="button" className="tpv-add-row" onClick={() => setAddingUnit(true)}>
                <Plus size={16} /> Add Set
              </button>
            )
          )}
        </div>
      )}

      {/* Level 3: Words */}
      {activeUnit && (
        <div className="tpv-words">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div className="tpv-search-wrap" style={{ flex: 1 }}>
              <Search size={15} className="tpv-search-icon" />
              <input
                type="text"
                placeholder="Search words..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {editable && !addingWord && (
              <button type="button" className="tpv-add-word-btn" onClick={() => setAddingWord(true)} title="Add word">
                <Plus size={18} />
              </button>
            )}
          </div>

          {editable && addingWord && (
            <form onSubmit={handleAddWord} className="tpv-word-add-form">
              <div className="tpv-word-add-row">
                <input type="text" placeholder="Word *" value={wordForm.word} onChange={e => setWordForm({ ...wordForm, word: e.target.value })} autoFocus required />
                <input type="text" placeholder="Translation *" value={wordForm.translation} onChange={e => setWordForm({ ...wordForm, translation: e.target.value })} required />
                <select value={wordForm.partOfSpeech} onChange={e => setWordForm({ ...wordForm, partOfSpeech: e.target.value })}>
                  {Object.keys(POS_LABELS).map(pos => <option key={pos} value={pos}>{POS_LABELS[pos]}</option>)}
                </select>
              </div>
              <div className="tpv-word-add-row">
                <input type="text" placeholder="Definition (optional)" value={wordForm.definition} onChange={e => setWordForm({ ...wordForm, definition: e.target.value })} />
                <input type="text" placeholder="Example (optional)" value={wordForm.example} onChange={e => setWordForm({ ...wordForm, example: e.target.value })} />
              </div>
              <div className="tpv-word-add-actions">
                <button type="button" onClick={() => { setAddingWord(false); setWordForm(EMPTY_WORD_FORM); }}>Cancel</button>
                <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Add Word'}</button>
              </div>
            </form>
          )}

          {filteredWords.length === 0 ? (
            <div className="tpv-empty">
              <BookOpen size={32} />
              <p>{search ? "No words match your search." : "No words in this topic yet."}</p>
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
