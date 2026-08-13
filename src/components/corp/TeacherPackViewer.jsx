import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Search, ChevronRight, Plus, Check, X, Pencil, Trash2 } from 'lucide-react';
import { updateCustomPack } from '../../services/corpService';
import { updateIndependentCustomPack } from '../../services/independentTeacherService';
import TeacherAddWordModal from './TeacherAddWordModal';
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

function deriveMonths(pack) {
  if (pack.months && pack.months.length > 0) return pack.months;
  if (pack.units && pack.units.length > 0) return [{ id: 'm1', title: 'Month 1', units: pack.units }];
  if (pack.words && pack.words.length > 0) return [{ id: 'm1', title: 'Month 1', units: [{ id: 'u1', title: 'Topic 1', words: pack.words }] }];
  return [];
}

export default function TeacherPackViewer({ pack, onBack, editable = false, centerId, independentUid = null, askConfirm = null, onUpdate }) {
  const [months, setMonths] = useState(() => deriveMonths(pack));
  const [monthId, setMonthId] = useState(null);
  const [unitId, setUnitId] = useState(null);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);

  // Month editing / adding state
  const [addingMonth, setAddingMonth] = useState(false);
  const [newMonthTitle, setNewMonthTitle] = useState('');
  const [editingMonthId, setEditingMonthId] = useState(null);
  const [editingMonthTitle, setEditingMonthTitle] = useState('');

  // Unit/Set editing / adding state
  const [addingUnit, setAddingUnit] = useState(false);
  const [newUnitTitle, setNewUnitTitle] = useState('');
  const [editingUnitId, setEditingUnitId] = useState(null);
  const [editingUnitTitle, setEditingUnitTitle] = useState('');

  // Dedicated Word addition / editing modal state
  const [showAddWordModal, setShowAddWordModal] = useState(false);
  const [editingWord, setEditingWord] = useState(null);

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

  // ── Month Handlers ──────────────────────────────────────────────────────────
  const handleAddMonth = (e) => {
    e.preventDefault();
    const title = newMonthTitle.trim();
    if (!title) return;
    const newMonth = { id: 'month_' + Date.now(), title, units: [] };
    setNewMonthTitle('');
    setAddingMonth(false);
    persist([...months, newMonth]);
  };

  const handleStartEditMonth = (m, e) => {
    e.stopPropagation();
    setEditingMonthId(m.id);
    setEditingMonthTitle(m.title);
  };

  const handleSaveMonthTitle = (mId, e) => {
    if (e) e.preventDefault();
    const title = editingMonthTitle.trim();
    if (!title) return;
    const updated = months.map(m => m.id === mId ? { ...m, title } : m);
    setEditingMonthId(null);
    persist(updated);
  };

  const handleDeleteMonth = (m, e) => {
    e.stopPropagation();
    const executeDelete = () => {
      const updated = months.filter(item => item.id !== m.id);
      if (monthId === m.id) setMonthId(null);
      persist(updated);
    };

    if (askConfirm) {
      askConfirm({
        title: 'Delete Month',
        message: `Delete "${m.title}" and all its topics?`,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        danger: true,
        onConfirm: executeDelete,
      });
    } else if (window.confirm(`Delete "${m.title}" and all its topics?`)) {
      executeDelete();
    }
  };

  // ── Unit/Set Handlers ────────────────────────────────────────────────────────
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

  const handleStartEditUnit = (u, e) => {
    e.stopPropagation();
    setEditingUnitId(u.id);
    setEditingUnitTitle(u.title);
  };

  const handleSaveUnitTitle = (uId, e) => {
    if (e) e.preventDefault();
    const title = editingUnitTitle.trim();
    if (!title || !activeMonth) return;
    const updated = months.map(m => m.id === activeMonth.id ? {
      ...m,
      units: (m.units || []).map(u => u.id === uId ? { ...u, title } : u)
    } : m);
    setEditingUnitId(null);
    persist(updated);
  };

  const handleDeleteUnit = (u, e) => {
    e.stopPropagation();
    const executeDelete = () => {
      const updated = months.map(m => m.id === activeMonth.id ? {
        ...m,
        units: (m.units || []).filter(item => item.id !== u.id)
      } : m);
      if (unitId === u.id) setUnitId(null);
      persist(updated);
    };

    if (askConfirm) {
      askConfirm({
        title: 'Delete Set',
        message: `Delete "${u.title}" and all its words?`,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        danger: true,
        onConfirm: executeDelete,
      });
    } else if (window.confirm(`Delete "${u.title}" and all its words?`)) {
      executeDelete();
    }
  };

  // ── Word Handlers ────────────────────────────────────────────────────────────
  const handleAddWords = (newWordsArray) => {
    if (!activeMonth || !activeUnit) return;
    const updated = months.map(m => {
      if (m.id !== activeMonth.id) return m;
      return {
        ...m,
        units: (m.units || []).map(u => u.id === activeUnit.id ? {
          ...u,
          words: [...(u.words || []), ...newWordsArray]
        } : u),
      };
    });
    persist(updated);
  };

  const handleSaveEditWord = (updatedWord) => {
    if (!activeMonth || !activeUnit) return;
    const updated = months.map(m => {
      if (m.id !== activeMonth.id) return m;
      return {
        ...m,
        units: (m.units || []).map(u => u.id === activeUnit.id ? {
          ...u,
          words: (u.words || []).map(w => w.id === updatedWord.id ? updatedWord : w)
        } : u),
      };
    });
    setEditingWord(null);
    setShowAddWordModal(false);
    persist(updated);
  };

  const handleDeleteWord = (w, e) => {
    e.stopPropagation();
    const executeDelete = () => {
      const updated = months.map(m => {
        if (m.id !== activeMonth.id) return m;
        return {
          ...m,
          units: (m.units || []).map(u => u.id === activeUnit.id ? {
            ...u,
            words: (u.words || []).filter(item => item.id !== w.id)
          } : u),
        };
      });
      persist(updated);
    };

    if (askConfirm) {
      askConfirm({
        title: 'Delete Word',
        message: `Delete "${w.word}"?`,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        danger: true,
        onConfirm: executeDelete,
      });
    } else if (window.confirm(`Delete "${w.word}"?`)) {
      executeDelete();
    }
  };

  return (
    <div className="tpv-container">
      {/* Simple header, same on every level */}
      <div className="tpv-header">
        <button
          type="button"
          className="tpv-back"
          onClick={() => {
            if (activeUnit) { setUnitId(null); setSearch(''); }
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
            editingMonthId === m.id ? (
              <form key={m.id} onSubmit={(e) => handleSaveMonthTitle(m.id, e)} className="tpv-add-form">
                <input
                  type="text"
                  placeholder="Month name"
                  value={editingMonthTitle}
                  onChange={e => setEditingMonthTitle(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="tpv-add-confirm" title="Save" disabled={saving}>
                  <Check size={16} />
                </button>
                <button type="button" className="tpv-add-cancel" title="Cancel" onClick={() => setEditingMonthId(null)}>
                  <X size={16} />
                </button>
              </form>
            ) : (
              <button type="button" key={m.id} className="tpv-row" onClick={() => setMonthId(m.id)}>
                <span className="tpv-row-num">{idx + 1}</span>
                <span className="tpv-row-label">{m.title}</span>
                <span className="tpv-row-meta">{(m.units || []).length} topics</span>
                
                {editable && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '6px' }} onClick={e => e.stopPropagation()}>
                    <button
                      type="button"
                      title="Edit month"
                      style={{
                        background: 'rgba(99, 102, 241, 0.14)', border: '1px solid rgba(99, 102, 241, 0.25)',
                        borderRadius: '8px', color: '#818cf8', width: '26px', height: '26px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0
                      }}
                      onClick={e => handleStartEditMonth(m, e)}
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      type="button"
                      title="Delete month"
                      style={{
                        background: 'rgba(239, 68, 68, 0.14)', border: '1px solid rgba(239, 68, 68, 0.25)',
                        borderRadius: '8px', color: '#ef4444', width: '26px', height: '26px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0
                      }}
                      onClick={e => handleDeleteMonth(m, e)}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}

                <ChevronRight size={18} className="tpv-row-arrow" />
              </button>
            )
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
            editingUnitId === u.id ? (
              <form key={u.id} onSubmit={(e) => handleSaveUnitTitle(u.id, e)} className="tpv-add-form">
                <input
                  type="text"
                  placeholder="Set name"
                  value={editingUnitTitle}
                  onChange={e => setEditingUnitTitle(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="tpv-add-confirm" title="Save" disabled={saving}>
                  <Check size={16} />
                </button>
                <button type="button" className="tpv-add-cancel" title="Cancel" onClick={() => setEditingUnitId(null)}>
                  <X size={16} />
                </button>
              </form>
            ) : (
              <button type="button" key={u.id} className="tpv-row" onClick={() => setUnitId(u.id)}>
                <span className="tpv-row-num">{idx + 1}</span>
                <span className="tpv-row-label">{u.title}</span>
                <span className="tpv-row-meta">{(u.words || []).length} words</span>

                {editable && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '6px' }} onClick={e => e.stopPropagation()}>
                    <button
                      type="button"
                      title="Edit set"
                      style={{
                        background: 'rgba(99, 102, 241, 0.14)', border: '1px solid rgba(99, 102, 241, 0.25)',
                        borderRadius: '8px', color: '#818cf8', width: '26px', height: '26px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0
                      }}
                      onClick={e => handleStartEditUnit(u, e)}
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      type="button"
                      title="Delete set"
                      style={{
                        background: 'rgba(239, 68, 68, 0.14)', border: '1px solid rgba(239, 68, 68, 0.25)',
                        borderRadius: '8px', color: '#ef4444', width: '26px', height: '26px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0
                      }}
                      onClick={e => handleDeleteUnit(u, e)}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}

                <ChevronRight size={18} className="tpv-row-arrow" />
              </button>
            )
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
            {editable && (
              <button
                type="button"
                className="tpv-add-word-btn"
                onClick={() => {
                  setEditingWord(null);
                  setShowAddWordModal(true);
                }}
                title="Add word"
              >
                <Plus size={18} />
              </button>
            )}
          </div>

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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className={`tpv-pos tpv-pos-${w.partOfSpeech || 'noun'}`}>
                        {POS_LABELS[w.partOfSpeech] || POS_LABELS.other}
                      </span>
                      {editable && (
                        <>
                          <button
                            type="button"
                            title="Edit word"
                            style={{
                              background: 'transparent', border: 'none', color: '#818cf8',
                              cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center'
                            }}
                            onClick={() => {
                              setEditingWord(w);
                              setShowAddWordModal(true);
                            }}
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            type="button"
                            title="Delete word"
                            style={{
                              background: 'transparent', border: 'none', color: '#ef4444',
                              cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center'
                            }}
                            onClick={e => handleDeleteWord(w, e)}
                          >
                            <Trash2 size={13} />
                          </button>
                        </>
                      )}
                    </div>
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

      {/* Dedicated Word Addition & Editing Modal */}
      <TeacherAddWordModal
        open={showAddWordModal}
        onClose={() => {
          setShowAddWordModal(false);
          setEditingWord(null);
        }}
        onAddWords={handleAddWords}
        onSaveEditWord={handleSaveEditWord}
        editWord={editingWord}
        saving={saving}
        monthTitle={activeMonth?.title || ''}
        unitTitle={activeUnit?.title || ''}
      />
    </div>
  );
}
