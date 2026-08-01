import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, Plus, Trash2, BookOpen, FileText, GraduationCap, Edit3, Save, X, Check,
  Search, Upload, Layers, ChevronRight, Filter, ChevronDown, AlertTriangle, Calendar, Sparkles
} from 'lucide-react';
import { updateCustomPack } from '../../services/corpService';
import './CourseManager.css';

export default function CourseManager({ centerId, course, onBack, onUpdate }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const monthIdFromUrl = searchParams.get('monthId');
  const unitIdFromUrl = searchParams.get('unitId');

  // Initialize months with backward compatibility
  const initialMonths = () => {
    if (course.months && course.months.length > 0) {
      return course.months;
    }
    if (course.units && course.units.length > 0) {
      return [{ id: 'm1', title: '1-Oy', units: course.units }];
    }
    if (course.words && course.words.length > 0) {
      return [{ id: 'm1', title: '1-Oy', units: [{ id: 'u1', title: '1-Mavzu', words: course.words }] }];
    }
    return [];
  };

  const [months, setMonths] = useState(initialMonths);

  useEffect(() => {
    setMonths(initialMonths());
  }, [course.id]);
  const activeMonthId = monthIdFromUrl || null;
  const activeUnitId = unitIdFromUrl || null;

  // Active items derived from state
  const activeMonth = months.find(m => m.id === activeMonthId) || null;
  const activeUnit = activeMonth?.units?.find(u => u.id === activeUnitId) || null;

  // Creation & Editing states
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [newMonthTitle, setNewMonthTitle] = useState('');
  const [editingMonthId, setEditingMonthId] = useState(null);
  const [editingMonthTitle, setEditingMonthTitle] = useState('');

  const [showUnitModal, setShowUnitModal] = useState(false);
  const [newUnitTitle, setNewUnitTitle] = useState('');
  const [editingUnitId, setEditingUnitId] = useState(null);
  const [editingUnitTitle, setEditingUnitTitle] = useState('');

  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfText, setPdfText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosFilter, setSelectedPosFilter] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [saving, setSaving] = useState(false);

  // Multi-select & Delete Modal state
  const [selectedWordIds, setSelectedWordIds] = useState([]);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({ open: false, type: '', targetId: null, count: 0, title: '' });

  // Word Modal state
  const [showWordModal, setShowWordModal] = useState(false);
  const [editingWord, setEditingWord] = useState(null);
  const [wordForm, setWordForm] = useState({
    word: '',
    translation: '',
    partOfSpeech: 'noun',
    definition: '',
    example: ''
  });

  // Calculate totals
  const totalMonths = months.length;
  const totalUnits = months.reduce((sum, m) => sum + (m.units ? m.units.length : 0), 0);
  const totalWords = months.reduce((sum, m) => {
    return sum + (m.units ? m.units.reduce((wSum, u) => wSum + (u.words ? u.words.length : 0), 0) : 0);
  }, 0);

  // Filtered words in active unit by search query and partOfSpeech filter
  const filteredWords = (activeUnit?.words || []).filter(w => {
    const matchesSearch =
      w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (w.definition && w.definition.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (w.example && w.example.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPos = selectedPosFilter === 'all' || (w.partOfSpeech || 'noun') === selectedPosFilter;

    return matchesSearch && matchesPos;
  });

  const saveCourseData = async (updatedMonths) => {
    setSaving(true);
    try {
      const flatUnits = updatedMonths.flatMap(m => m.units || []);
      const flatWords = flatUnits.flatMap(u => u.words || []);
      const updates = {
        months: updatedMonths,
        units: flatUnits,
        words: flatWords,
        sectionsCount: flatUnits.length,
        wordCount: flatWords.length,
      };
      await updateCustomPack(centerId, course.id, updates);
      if (onUpdate) onUpdate({ ...course, ...updates });
    } catch (err) {
      alert("Saqlashda xatolik: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Month Handlers
  const handleAddMonth = (e) => {
    if (e) e.preventDefault();
    const title = newMonthTitle.trim();
    if (!title) return;
    const newMonth = {
      id: 'month_' + Date.now(),
      title,
      units: []
    };
    const updated = [...months, newMonth];
    setMonths(updated);
    setNewMonthTitle('');
    setShowMonthModal(false);
    saveCourseData(updated);
  };

  const handleStartEditMonth = (month, e) => {
    e.stopPropagation();
    setEditingMonthId(month.id);
    setEditingMonthTitle(month.title);
  };

  const handleSaveEditMonth = (monthId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!editingMonthTitle.trim()) return;
    const updated = months.map(m => m.id === monthId ? { ...m, title: editingMonthTitle.trim() } : m);
    setMonths(updated);
    saveCourseData(updated);
    setEditingMonthId(null);
  };

  const handleCancelEditMonth = (e) => {
    if (e) e.stopPropagation();
    setEditingMonthId(null);
  };

  // Unit Handlers
  const handleAddUnit = (e) => {
    if (e) e.preventDefault();
    const title = newUnitTitle.trim();
    if (!title || !activeMonthId) return;
    const newUnit = {
      id: 'unit_' + Date.now(),
      title,
      words: []
    };
    const updated = months.map(m => {
      if (m.id === activeMonthId) {
        return { ...m, units: [...(m.units || []), newUnit] };
      }
      return m;
    });
    setMonths(updated);
    setNewUnitTitle('');
    setShowUnitModal(false);
    saveCourseData(updated);
  };

  const handleStartEditUnit = (unit, e) => {
    e.stopPropagation();
    setEditingUnitId(unit.id);
    setEditingUnitTitle(unit.title);
  };

  const handleSaveEditUnit = (unitId, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!editingUnitTitle.trim() || !activeMonthId) return;
    const updated = months.map(m => {
      if (m.id === activeMonthId) {
        const newUnits = (m.units || []).map(u => u.id === unitId ? { ...u, title: editingUnitTitle.trim() } : u);
        return { ...m, units: newUnits };
      }
      return m;
    });
    setMonths(updated);
    saveCourseData(updated);
    setEditingUnitId(null);
  };

  const handleCancelEditUnit = (e) => {
    e.stopPropagation();
    setEditingUnitId(null);
  };

  // Open modal for adding new word
  const handleOpenAddWordModal = () => {
    setEditingWord(null);
    setWordForm({
      word: '',
      translation: '',
      partOfSpeech: 'noun',
      definition: '',
      example: ''
    });
    setShowWordModal(true);
  };

  // Open modal for editing word
  const handleOpenEditWordModal = (wordItem) => {
    setEditingWord(wordItem);
    setWordForm({
      word: wordItem.word || '',
      translation: wordItem.translation || '',
      partOfSpeech: wordItem.partOfSpeech || 'noun',
      definition: wordItem.definition || '',
      example: wordItem.example || ''
    });
    setShowWordModal(true);
  };

  // Save word from modal
  const handleSaveWordModal = (e) => {
    e.preventDefault();
    if (!wordForm.word.trim() || !wordForm.translation.trim() || !activeMonthId || !activeUnitId) return;

    let updated;
    if (editingWord) {
      updated = months.map(m => {
        if (m.id === activeMonthId) {
          const newUnits = (m.units || []).map(u => {
            if (u.id === activeUnitId) {
              return {
                ...u,
                words: (u.words || []).map(w => w.id === editingWord.id ? { ...w, ...wordForm } : w)
              };
            }
            return u;
          });
          return { ...m, units: newUnits };
        }
        return m;
      });
    } else {
      const wordItem = {
        id: 'w_' + Date.now(),
        word: wordForm.word.trim(),
        translation: wordForm.translation.trim(),
        partOfSpeech: wordForm.partOfSpeech || 'noun',
        definition: wordForm.definition.trim(),
        example: wordForm.example.trim(),
      };
      updated = months.map(m => {
        if (m.id === activeMonthId) {
          const newUnits = (m.units || []).map(u => {
            if (u.id === activeUnitId) {
              return { ...u, words: [...(u.words || []), wordItem] };
            }
            return u;
          });
          return { ...m, units: newUnits };
        }
        return m;
      });
    }

    setMonths(updated);
    setShowWordModal(false);
    setEditingWord(null);
    saveCourseData(updated);
  };

  // Multi-select handlers
  const handleToggleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredWords.map(w => w.id);
      setSelectedWordIds(allIds);
    } else {
      setSelectedWordIds([]);
    }
  };

  const handleToggleSelectWord = (id) => {
    if (selectedWordIds.includes(id)) {
      setSelectedWordIds(selectedWordIds.filter(i => i !== id));
    } else {
      setSelectedWordIds([...selectedWordIds, id]);
    }
  };

  // Delete Prompt Triggers
  const handlePromptDeleteMonth = (month) => {
    setDeleteConfirmModal({
      open: true,
      type: 'month',
      targetId: month.id,
      count: 1,
      title: `"${month.title}" bo'limini hamda uning barcha mavzulari va so'zlarini o'chirmoqchimisiz?`
    });
  };

  const handlePromptDeleteUnit = (unit) => {
    setDeleteConfirmModal({
      open: true,
      type: 'unit',
      targetId: unit.id,
      count: 1,
      title: `"${unit.title}" mavzusini va undagi barcha so'zlarni o'chirmoqchimisiz?`
    });
  };

  const handlePromptDeleteWord = (word) => {
    setDeleteConfirmModal({
      open: true,
      type: 'single_word',
      targetId: word.id,
      count: 1,
      title: `"${word.word}" so'zini o'chirmoqchimisiz?`
    });
  };

  const handlePromptDeleteSelected = () => {
    if (selectedWordIds.length === 0) return;
    setDeleteConfirmModal({
      open: true,
      type: 'bulk_words',
      targetId: null,
      count: selectedWordIds.length,
      title: `${selectedWordIds.length} ta tanlangan so'zni o'chirmoqchimisiz?`
    });
  };

  // Execute Deletion
  const handleConfirmDelete = () => {
    const { type, targetId } = deleteConfirmModal;

    if (type === 'month') {
      const updated = months.filter(m => m.id !== targetId);
      setMonths(updated);
      if (activeMonthId === targetId) {
        setSearchParams({ courseId: course.id });
      }
      saveCourseData(updated);
    } else if (type === 'unit') {
      const updated = months.map(m => {
        if (m.id === activeMonthId) {
          return { ...m, units: (m.units || []).filter(u => u.id !== targetId) };
        }
        return m;
      });
      setMonths(updated);
      if (activeUnitId === targetId) {
        setSearchParams({ courseId: course.id, monthId: activeMonthId });
      }
      saveCourseData(updated);
    } else if (type === 'single_word') {
      const updated = months.map(m => {
        if (m.id === activeMonthId) {
          const newUnits = (m.units || []).map(u => {
            if (u.id === activeUnitId) {
              return { ...u, words: (u.words || []).filter(w => w.id !== targetId) };
            }
            return u;
          });
          return { ...m, units: newUnits };
        }
        return m;
      });
      setMonths(updated);
      saveCourseData(updated);
      setSelectedWordIds(selectedWordIds.filter(id => id !== targetId));
    } else if (type === 'bulk_words') {
      const updated = months.map(m => {
        if (m.id === activeMonthId) {
          const newUnits = (m.units || []).map(u => {
            if (u.id === activeUnitId) {
              return { ...u, words: (u.words || []).filter(w => !selectedWordIds.includes(w.id)) };
            }
            return u;
          });
          return { ...m, units: newUnits };
        }
        return m;
      });
      setMonths(updated);
      saveCourseData(updated);
      setSelectedWordIds([]);
    }

    setDeleteConfirmModal({ open: false, type: '', targetId: null, count: 0, title: '' });
  };

  const normalizePOS = (str) => {
    if (!str) return null;
    const s = str.trim().toLowerCase().replace(/[^a-z'ʻʼ]/g, '');
    if (!s) return null;

    if (s.startsWith('noun') || s.startsWith('ot') || s === 'n') return 'noun';
    if (s.startsWith('verb') || s.startsWith('fe') || s === 'v') return 'verb';
    if (s.startsWith('adj') || s.startsWith('sif') || s === 'a') return 'adjective';
    if (s.startsWith('adv') || s.startsWith('rav')) return 'adverb';
    if (s.startsWith('phr') || s.startsWith('ibo') || s.startsWith('ido')) return 'phrase';
    if (s.startsWith('prep') || s.startsWith('pred')) return 'preposition';
    if (s.startsWith('oth') || s.startsWith('bos') || s.startsWith('etc')) return 'other';

    return null;
  };

  const handleImportPdfText = () => {
    if (!pdfText.trim()) return;

    let rawText = pdfText.replace(/[\r\n;]+/g, '\n');
    const lines = rawText.split('\n');
    const entryBlocks = [];

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;

      const subEntries = trimmed.split(/\.\s+(?=[A-Za-z0-9ʻʼ']+\s*[,|\-:\t=])/);
      subEntries.forEach(sub => {
        const cleaned = sub.trim();
        if (cleaned) entryBlocks.push(cleaned);
      });
    });

    const parsedWords = [];

    entryBlocks.forEach(block => {
      let textToParse = block.trim();
      let parts = [];
      if (textToParse.includes(',')) {
        parts = textToParse.split(',');
      } else if (textToParse.includes('|')) {
        parts = textToParse.split('|');
      } else {
        parts = textToParse.split(/[-:\t=]/);
      }

      if (parts.length >= 2) {
        const word = parts[0]?.trim();
        let translation = parts[1]?.trim();
        if (parts.length === 2 && translation.endsWith('.')) {
          translation = translation.slice(0, -1).trim();
        }

        if (!word || !translation) return;

        let validPos = 'noun';
        let definition = '';
        let example = '';

        if (parts.length >= 4) {
          const matchedPos = normalizePOS(parts[2]);
          validPos = matchedPos || 'other';
          definition = parts[3]?.trim() || '';
          example = parts[4]?.trim()?.replace(/\.$/, '') || '';
        } else if (parts.length === 3) {
          const matchedPos = normalizePOS(parts[2]);
          if (matchedPos) {
            validPos = matchedPos;
            definition = '';
          } else {
            validPos = 'other';
            definition = parts[2]?.trim()?.replace(/\.$/, '') || '';
          }
        }

        parsedWords.push({
          id: 'w_' + Math.random().toString(36).substring(2, 9),
          word,
          translation,
          partOfSpeech: validPos,
          definition,
          example
        });
      }
    });

    if (parsedWords.length === 0) {
      alert("Format mos kelmadi. So'zlarni Enter, nuqta (.) yoki nuqtali vergul (;) bilan ajratib yozishingiz mumkin.");
      return;
    }

    let newCount = 0;
    let updatedCount = 0;

    let updated;
    if (activeMonthId && activeUnitId) {
      updated = months.map(m => {
        if (m.id === activeMonthId) {
          const newUnits = (m.units || []).map(u => {
            if (u.id === activeUnitId) {
              const existingWords = [...(u.words || [])];
              parsedWords.forEach(pw => {
                const idx = existingWords.findIndex(w => w.word.toLowerCase() === pw.word.toLowerCase());
                if (idx !== -1) {
                  existingWords[idx] = {
                    ...existingWords[idx],
                    translation: pw.translation || existingWords[idx].translation,
                    partOfSpeech: pw.partOfSpeech || existingWords[idx].partOfSpeech,
                    definition: pw.definition || existingWords[idx].definition,
                    example: pw.example || existingWords[idx].example
                  };
                  updatedCount++;
                } else {
                  existingWords.push(pw);
                  newCount++;
                }
              });
              return { ...u, words: existingWords };
            }
            return u;
          });
          return { ...m, units: newUnits };
        }
        return m;
      });
    } else {
      alert("So'zlarni import qilish uchun oldin muayyan bir Mavzuni tanlang!");
      return;
    }

    setMonths(updated);
    setPdfText('');
    setShowPdfModal(false);
    saveCourseData(updated);

    if (updatedCount > 0) {
      alert(`${newCount} ta yangi so'z qo'shildi, ${updatedCount} ta mavjud so'z yangilandi (dublikatlar oldi olindi)!`);
    } else {
      alert(`${newCount} ta so'z muvaffaqiyatli import qilindi!`);
    }
  };

  return (
    <div className="course-manager-container">
      {/* LEVEL 2 VIEW: Course Months View */}
      {!activeMonthId ? (
        <div className="months-view-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Top Header Card */}
          <header className="cm-header-card">
            <div className="cm-header-left">
              <button type="button" className="cm-btn-back" onClick={onBack} title="Kurslarga qaytish">
                <ArrowLeft size={18} />
              </button>

              <div className="cm-course-badge">
                <GraduationCap size={22} className="cm-cap-icon" />
              </div>

              <div className="cm-course-info">
                <h1>{course.title}</h1>
                <p>{totalMonths} Oy · {totalUnits} Mavzu · {totalWords} So'z</p>
              </div>
            </div>

            <div className="cm-header-right">
              <button
                type="button"
                className="btn-add-word-top"
                style={{ background: '#a855f7' }}
                onClick={() => { setNewMonthTitle(''); setShowMonthModal(true); }}
              >
                <Plus size={16} /> Oy Qo'shish
              </button>
            </div>
          </header>

          {/* Months Section: Months List */}
          <div className="cm-units-section-top">
            <div className="units-section-header">
              <div className="units-header-title">
                <Calendar size={18} className="text-purple-400" style={{ color: '#c084fc' }} />
                <span>OYLAR (MONTHS)</span>
              </div>
            </div>

            {months.length === 0 ? (
              <div className="units-empty-top">
                <p>Hali birorta ham oy qo'shilmagan. Yuqoridagi "+ Oy Qo'shish" tugmasi orqali birinchi oyni qo'shing.</p>
              </div>
            ) : (
              <div className="units-list-top">
                {months.map((month, idx) => {
                  const mUnitsCount = (month.units || []).length;
                  const mWordsCount = (month.units || []).reduce((sum, u) => sum + (u.words ? u.words.length : 0), 0);

                  return (
                    <div
                      key={month.id}
                      className="unit-list-row clickable-unit"
                      onClick={() => {
                        if (editingMonthId !== month.id) {
                          setSearchParams({ courseId: course.id, monthId: month.id });
                        }
                      }}
                    >
                      <div className="unit-list-left">
                        <span className="unit-grid-num">{idx + 1}</span>

                        {editingMonthId === month.id ? (
                          <form
                            onSubmit={(e) => handleSaveEditMonth(month.id, e)}
                            onClick={(e) => e.stopPropagation()}
                            className="edit-unit-form"
                          >
                            <input
                              type="text"
                              value={editingMonthTitle}
                              onChange={e => setEditingMonthTitle(e.target.value)}
                              className="edit-unit-input"
                              autoFocus
                            />
                            <button type="submit" className="btn-edit-unit-save" title="Saqlash">
                              <Check size={15} />
                            </button>
                            <button type="button" className="btn-edit-unit-cancel" onClick={handleCancelEditMonth} title="Bekor qilish">
                              <X size={15} />
                            </button>
                          </form>
                        ) : (
                          <div className="unit-list-info">
                            <span className="unit-list-title">{month.title}</span>
                            <span className="unit-list-sub">{mUnitsCount} ta mavzu · {mWordsCount} ta so'z</span>
                          </div>
                        )}
                      </div>

                      <div className="unit-list-right">
                        {editingMonthId !== month.id && (
                          <>
                            <button
                              type="button"
                              className="btn-unit-icon edit"
                              onClick={(e) => handleStartEditMonth(month, e)}
                              title="Oyni tahrirlash"
                            >
                              <Edit3 size={15} />
                            </button>

                            <button
                              type="button"
                              className="btn-unit-icon danger"
                              onClick={(e) => { e.stopPropagation(); handlePromptDeleteMonth(month); }}
                              title="Oyni o'chirish"
                            >
                              <Trash2 size={15} />
                            </button>
                          </>
                        )}
                        <ChevronRight size={18} className="unit-enter-arrow" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : !activeUnitId ? (
        /* LEVEL 3 VIEW: Units inside Selected Month */
        <div className="units-view-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Month Top Header Card */}
          <header className="cm-header-card">
            <div className="cm-header-left">
              <button
                type="button"
                className="cm-btn-back"
                onClick={() => setSearchParams({ courseId: course.id })}
                title="Oylarga qaytish"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="cm-course-badge" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
                <Calendar size={22} />
              </div>

              <div className="cm-course-info">
                <h1>{activeMonth.title}</h1>
                <p>{(activeMonth.units || []).length} ta Mavzu · {
                  (activeMonth.units || []).reduce((sum, u) => sum + (u.words ? u.words.length : 0), 0)
                } ta So'z</p>
              </div>
            </div>

            <div className="cm-header-right">
              <button
                type="button"
                className="btn-add-word-top"
                onClick={() => { setNewUnitTitle(''); setShowUnitModal(true); }}
              >
                <Plus size={16} /> Mavzu Qo'shish
              </button>
            </div>
          </header>

          {/* Units Section: Units List */}
          <div className="cm-units-section-top">
            <div className="units-section-header">
              <div className="units-header-title">
                <Layers size={18} className="text-blue-400" />
                <span>MAVZULAR (UNITS)</span>
              </div>
            </div>

            {(activeMonth.units || []).length === 0 ? (
              <div className="units-empty-top">
                <p>Hali birorta ham mavzu qo'shilmagan. Yuqoridagi maydon orqali birinchi mavzuni qo'shing.</p>
              </div>
            ) : (
              <div className="units-list-top">
                {activeMonth.units.map((unit, idx) => (
                  <div
                    key={unit.id}
                    className="unit-list-row clickable-unit"
                    onClick={() => {
                      if (editingUnitId !== unit.id) {
                        setSearchParams({ courseId: course.id, monthId: activeMonth.id, unitId: unit.id });
                      }
                    }}
                  >
                    <div className="unit-list-left">
                      <span className="unit-grid-num">{idx + 1}</span>

                      {editingUnitId === unit.id ? (
                        <form
                          onSubmit={(e) => handleSaveEditUnit(unit.id, e)}
                          onClick={(e) => e.stopPropagation()}
                          className="edit-unit-form"
                        >
                          <input
                            type="text"
                            value={editingUnitTitle}
                            onChange={e => setEditingUnitTitle(e.target.value)}
                            className="edit-unit-input"
                            autoFocus
                          />
                          <button type="submit" className="btn-edit-unit-save" title="Saqlash">
                            <Check size={15} />
                          </button>
                          <button type="button" className="btn-edit-unit-cancel" onClick={handleCancelEditUnit} title="Bekor qilish">
                            <X size={15} />
                          </button>
                        </form>
                      ) : (
                        <div className="unit-list-info">
                          <span className="unit-list-title">{unit.title}</span>
                          <span className="unit-list-sub">{(unit.words || []).length} ta so'z</span>
                        </div>
                      )}
                    </div>

                    <div className="unit-list-right">
                      {editingUnitId !== unit.id && (
                        <>
                          <button
                            type="button"
                            className="btn-unit-icon edit"
                            onClick={(e) => handleStartEditUnit(unit, e)}
                            title="Mavzuni tahrirlash"
                          >
                            <Edit3 size={15} />
                          </button>

                          <button
                            type="button"
                            className="btn-unit-icon danger"
                            onClick={(e) => { e.stopPropagation(); handlePromptDeleteUnit(unit); }}
                            title="Mavzuni o'chirish"
                          >
                            <Trash2 size={15} />
                          </button>
                        </>
                      )}
                      <ChevronRight size={18} className="unit-enter-arrow" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* LEVEL 4 VIEW: Inside Selected Unit Words Page */
        <div className="unit-words-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Unit Top Bar */}
          <header className="cm-header-card">
            <div className="cm-header-left">
              <button
                type="button"
                className="cm-btn-back"
                onClick={() => setSearchParams({ courseId: course.id, monthId: activeMonth.id })}
                title="Mavzularga qaytish"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="cm-course-badge">
                <BookOpen size={22} className="cm-cap-icon" />
              </div>

              <div className="cm-course-info">
                <h1>{activeUnit.title}</h1>
                <p>{activeMonth.title} · {(activeUnit.words || []).length} ta so'z mavjud</p>
              </div>
            </div>

            <div className="cm-header-right">
              <div className="unit-search-wrap">
                <Search size={14} className="unit-search-icon" />
                <input
                  type="text"
                  placeholder="Qidirish..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="unit-search-input"
                />
              </div>

              {/* Filter Button & Popover Dropdown */}
              <div className="filter-dropdown-container">
                <button
                  type="button"
                  className={`btn-filter-toggle ${selectedPosFilter !== 'all' ? 'active' : ''}`}
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  <Filter size={15} />
                  <span>
                    {selectedPosFilter === 'all'
                      ? 'Filter'
                      : {
                        noun: 'Ot (noun)',
                        verb: "Fe'l (verb)",
                        adjective: 'Sifat (adj)',
                        adverb: 'Ravish (adv)',
                        phrase: 'Ibora (phrase)',
                        preposition: 'Predlog (prep)',
                        other: 'Boshqa (other)'
                      }[selectedPosFilter] || 'Filter'}
                  </span>
                  <ChevronDown size={14} className={`filter-chevron ${showFilterDropdown ? 'open' : ''}`} />
                </button>

                {showFilterDropdown && (
                  <div className="filter-menu-popover">
                    <div className="filter-menu-header">SO'Z TURKUMI</div>
                    {[
                      { id: 'all', label: 'Barcha turkumlar', count: (activeUnit.words || []).length },
                      { id: 'noun', label: 'Ot (noun)', count: (activeUnit.words || []).filter(w => (w.partOfSpeech || 'noun') === 'noun').length },
                      { id: 'verb', label: "Fe'l (verb)", count: (activeUnit.words || []).filter(w => w.partOfSpeech === 'verb').length },
                      { id: 'adjective', label: 'Sifat (adj)', count: (activeUnit.words || []).filter(w => w.partOfSpeech === 'adjective').length },
                      { id: 'adverb', label: 'Ravish (adv)', count: (activeUnit.words || []).filter(w => w.partOfSpeech === 'adverb').length },
                      { id: 'phrase', label: 'Ibora (phrase)', count: (activeUnit.words || []).filter(w => w.partOfSpeech === 'phrase').length },
                      { id: 'preposition', label: 'Predlog (prep)', count: (activeUnit.words || []).filter(w => w.partOfSpeech === 'preposition').length },
                      { id: 'other', label: 'Boshqa (other)', count: (activeUnit.words || []).filter(w => w.partOfSpeech === 'other').length },
                    ].map(item => (
                      <button
                        key={item.id}
                        type="button"
                        className={`filter-menu-item ${selectedPosFilter === item.id ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedPosFilter(item.id);
                          setShowFilterDropdown(false);
                        }}
                      >
                        <span>{item.label}</span>
                        <span className="filter-item-count">{item.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button type="button" className="btn-pdf-import" onClick={() => setShowPdfModal(true)}>
                <Upload size={16} /> Import
              </button>

              <button type="button" className="btn-add-word-top" onClick={handleOpenAddWordModal}>
                <Plus size={16} /> Yangi So'z
              </button>
            </div>
          </header>

          {/* Words Panel */}
          <div className="cm-words-panel">
            <div className="active-unit-content">
              {/* Bulk Actions Bar */}
              {selectedWordIds.length > 0 && (
                <div className="bulk-actions-bar">
                  <span>{selectedWordIds.length} ta so'z tanlandi</span>
                  <button type="button" className="btn-bulk-delete" onClick={handlePromptDeleteSelected}>
                    <Trash2 size={15} /> Tanlanganlarni o'chirish ({selectedWordIds.length})
                  </button>
                </div>
              )}

              {/* Content / Words Table */}
              <div className="words-table-wrapper">
                {(activeUnit.words || []).length === 0 ? (
                  <div className="unit-empty-words-state">
                    <div className="empty-book-box">
                      <BookOpen size={36} />
                    </div>
                    <h3>Bu unitda hali so'zlar yo'q</h3>
                    <p>Yangi so'z qo'shish tugmasi orqali so'z qo'shing yoki CSV formatida import qiling.</p>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '1.25rem' }}>
                      <button type="button" className="btn-add-word-top" onClick={handleOpenAddWordModal}>
                        <Plus size={16} /> Yangi So'z Qo'shish
                      </button>
                      <button type="button" className="btn-import-lg" onClick={() => setShowPdfModal(true)} style={{ marginTop: 0 }}>
                        <Upload size={16} /> Import Qilish
                      </button>
                    </div>
                  </div>
                ) : (
                  <table className="words-table">
                    <thead>
                      <tr>
                        <th style={{ width: '40px', textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            checked={filteredWords.length > 0 && filteredWords.every(w => selectedWordIds.includes(w.id))}
                            onChange={handleToggleSelectAll}
                          />
                        </th>
                        <th>ORIGINAL</th>
                        <th>TARJIMA</th>
                        <th>TURKUM</th>
                        <th>TAVSIF</th>
                        <th>MISOL</th>
                        <th style={{ width: '80px', textAlign: 'right' }}>AMAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredWords.map((w) => (
                        <tr key={w.id} className={selectedWordIds.includes(w.id) ? 'row-selected' : ''}>
                          <td style={{ textAlign: 'center' }}>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                              checked={selectedWordIds.includes(w.id)}
                              onChange={() => handleToggleSelectWord(w.id)}
                            />
                          </td>
                          <td className="w-bold">{w.word}</td>
                          <td>{w.translation}</td>
                          <td>
                            <span className={`part-badge ${w.partOfSpeech || 'noun'}`}>
                              {w.partOfSpeech || 'noun'}
                            </span>
                          </td>
                          <td className="w-dim">{w.definition || '-'}</td>
                          <td className="w-dim">{w.example ? <em>"{w.example}"</em> : '-'}</td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="word-row-actions">
                              <button
                                type="button"
                                onClick={() => handleOpenEditWordModal(w)}
                                className="btn-word-icon"
                                title="Tahrirlash"
                              >
                                <Edit3 size={15} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handlePromptDeleteWord(w)}
                                className="btn-word-icon danger"
                                title="O'chirish"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Word Modal */}
      {showWordModal && (
        <div className="modal-overlay" onClick={() => setShowWordModal(false)}>
          <div className="word-modal-card" onClick={e => e.stopPropagation()}>
            <div className="word-modal-header">
              <h3>{editingWord ? "So'zni Tahrirlash" : "Yangi So'z Qo'shish"}</h3>
              <button type="button" className="btn-modal-close" onClick={() => setShowWordModal(false)} title="Yopish">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveWordModal} className="word-modal-body">
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label className="modal-label">SO'Z (ENGLISH) *</label>
                  <input
                    type="text"
                    placeholder="Masalan: Apple"
                    value={wordForm.word}
                    onChange={e => setWordForm({ ...wordForm, word: e.target.value })}
                    required
                    className="modal-input"
                    autoFocus
                  />
                </div>

                <div className="modal-form-group">
                  <label className="modal-label">SO'Z TURKUMI</label>
                  <select
                    value={wordForm.partOfSpeech}
                    onChange={e => setWordForm({ ...wordForm, partOfSpeech: e.target.value })}
                    className="modal-select"
                  >
                    <option value="noun">noun (Ot)</option>
                    <option value="verb">verb (Fe'l)</option>
                    <option value="adjective">adjective (Sifat)</option>
                    <option value="adverb">adverb (Ravish)</option>
                    <option value="phrase">phrase (Ibora)</option>
                    <option value="preposition">preposition (Predlog)</option>
                    <option value="other">other (Boshqa)</option>
                  </select>
                </div>
              </div>

              <div className="modal-form-group">
                <label className="modal-label">TARJIMA *</label>
                <input
                  type="text"
                  placeholder="Masalan: Olma"
                  value={wordForm.translation}
                  onChange={e => setWordForm({ ...wordForm, translation: e.target.value })}
                  required
                  className="modal-input"
                />
              </div>

              <div className="modal-form-group">
                <label className="modal-label">TAVSIF (DEFINITION)</label>
                <textarea
                  placeholder="Masalan: Qizil yoki yashil po'stli yumaloq meva"
                  value={wordForm.definition}
                  onChange={e => setWordForm({ ...wordForm, definition: e.target.value })}
                  rows={2}
                  className="modal-textarea"
                />
              </div>

              <div className="modal-form-group">
                <label className="modal-label">MISOL (EXAMPLE)</label>
                <input
                  type="text"
                  placeholder="Masalan: I ate an apple."
                  value={wordForm.example}
                  onChange={e => setWordForm({ ...wordForm, example: e.target.value })}
                  className="modal-input"
                />
              </div>

              <div className="word-modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowWordModal(false)}>
                  Bekor qilish
                </button>
                <button type="submit" className="btn-modal-save">
                  <Save size={18} /> Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF / CSV Import Modal */}
      {showPdfModal && (
        <div className="modal-overlay" onClick={() => setShowPdfModal(false)}>
          <div className="pdf-modal-card" onClick={e => e.stopPropagation()}>
            <div className="pdf-modal-header">
              <h3>Matndan Import Qilish</h3>
              <button type="button" className="btn-modal-close" onClick={() => setShowPdfModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="pdf-modal-body">
              <p className="pdf-import-hint">
                So'zlarni <code>Enter</code> (yangi qator), nuqta (<code>.</code>) yoki nuqtali vergul (<code>;</code>) bilan ajratib yozishingiz mumkin.
                <br /><br />
                Masalan:
                <br /><code>Apple, Olma. Book, Kitob. Run, Yugurmoq</code>
                <br /><code>Apple, Olma, noun, Qizil meva, I ate an apple. Book, Kitob, noun.</code>
              </p>
              <textarea
                placeholder="Matnni shu yerga kiriting yoki joylashtiring (paste)..."
                value={pdfText}
                onChange={e => setPdfText(e.target.value)}
                rows={9}
                className="pdf-textarea"
              />
            </div>
            <div className="pdf-modal-footer">
              <button type="button" className="btn-modal-cancel" onClick={() => setShowPdfModal(false)}>
                Bekor qilish
              </button>
              <button type="button" className="btn-pdf-submit" onClick={handleImportPdfText}>
                Import Qilish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Month Modal */}
      {showMonthModal && (
        <div className="modal-overlay" onClick={() => setShowMonthModal(false)}>
          <div className="word-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="word-modal-header">
              <h3>Yangi Oy Qo'shish</h3>
              <button type="button" className="btn-modal-close" onClick={() => setShowMonthModal(false)} title="Yopish">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMonth} className="word-modal-body">
              <div className="modal-form-group">
                <label className="modal-label">OY NOMI *</label>
                <input
                  type="text"
                  placeholder="Masalan: 1-Oy yoki Pre-IELTS Month"
                  value={newMonthTitle}
                  onChange={e => setNewMonthTitle(e.target.value)}
                  required
                  className="modal-input"
                  autoFocus
                />
              </div>

              <div className="word-modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowMonthModal(false)}>
                  Bekor qilish
                </button>
                <button type="submit" className="btn-modal-save" style={{ background: '#a855f7' }}>
                  <Plus size={18} /> Oy Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Unit Modal */}
      {showUnitModal && (
        <div className="modal-overlay" onClick={() => setShowUnitModal(false)}>
          <div className="word-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="word-modal-header">
              <h3>Yangi Mavzu Qo'shish</h3>
              <button type="button" className="btn-modal-close" onClick={() => setShowUnitModal(false)} title="Yopish">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddUnit} className="word-modal-body">
              <div className="modal-form-group">
                <label className="modal-label">MAVZU NOMI *</label>
                <input
                  type="text"
                  placeholder="Masalan: 1-Mavzu yoki Vocabulary Basics"
                  value={newUnitTitle}
                  onChange={e => setNewUnitTitle(e.target.value)}
                  required
                  className="modal-input"
                  autoFocus
                />
              </div>

              <div className="word-modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowUnitModal(false)}>
                  Bekor qilish
                </button>
                <button type="submit" className="btn-modal-save">
                  <Plus size={18} /> Mavzu Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmModal.open && (
        <div className="modal-overlay" onClick={() => setDeleteConfirmModal({ ...deleteConfirmModal, open: false })}>
          <div className="delete-modal-card" onClick={e => e.stopPropagation()}>
            <div className="delete-modal-icon">
              <AlertTriangle size={30} />
            </div>
            <h3>O'chirishni tasdiqlang</h3>
            <p>{deleteConfirmModal.title}</p>
            <p className="delete-modal-sub">Bu amalni keyinchalik bekor qilib bo'lmaydi.</p>
            <div className="delete-modal-actions">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setDeleteConfirmModal({ ...deleteConfirmModal, open: false })}
              >
                Bekor qilish
              </button>
              <button
                type="button"
                className="btn-danger-confirm"
                onClick={handleConfirmDelete}
              >
                <Trash2 size={16} /> Ha, o'chirilsin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
