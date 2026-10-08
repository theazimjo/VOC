import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ClipboardPaste, Copy, Download, Eraser, FileSpreadsheet, Redo2, Rows3, Scissors, Trash2, Undo2, X } from 'lucide-react';
import { importable, markDuplicates, parseWordCells, readWordFile } from './wordImport';
import { downloadTemplate } from './templateFiles';
import { newId, POS_OPTIONS } from './courseEditing';

// Excel-style sheet that saves as you type. The table IS the word list:
// it opens with the words already there, an edited cell updates its word,
// a finished new row (word, translation, example) is added, and a deleted
// row removes the word. Saving is debounced and goes through `onSync`.
// Tab / Enter / arrows move between cells, a block copied from Excel or
// Google Sheets lands cell by cell, column edges can be dragged.
// Like Excel, a block of cells is selected by dragging, Shift+click or
// Shift+arrows (row numbers / column headers pick whole rows / columns);
// Delete clears it, Ctrl+C / X / V copy, cut and paste it, and Ctrl+Z /
// Ctrl+Y undo and redo every change.
// Cells follow Excel: one click only selects, a double click (or F2, or just
// starting to type) edits; Enter / Tab / Esc finish the edit. On touch
// screens a tap edits straight away. Right-click opens a menu (cut, copy,
// paste, clear, insert / delete rows, undo / redo).

const EXTRA_ROWS = 50;
const MORE_ROWS = 40;
const MAX_GRID_ROWS = 3000;
const SAVE_DELAY = 800;
const emptyRow = () => ({ id: newId('w'), topic: '', word: '', translation: '', translationRu: '', pos: '', definition: '', example: '' });
const isFilled = (r) => ['topic', 'word', 'translation', 'translationRu', 'pos', 'definition', 'example'].some((f) => (r[f] || '').trim());
const cellsKey = (r) => [r.topic, r.word, r.translation, r.translationRu, r.pos, r.definition, r.example].join('\u0001');
const MIN_COL = 84;
const DEFAULT_WIDTH = { topic: 140, word: 140, translation: 150, translationRu: 150, pos: 90, definition: 170, example: 240 };
const NUM_W = 52;
const STATUS_W = 150;
const DEL_W = 40;
const HISTORY_LIMIT = 100;
const normRange = (s) => (s ? { r1: Math.min(s.ar, s.fr), r2: Math.max(s.ar, s.fr), c1: Math.min(s.ac, s.fc), c2: Math.max(s.ac, s.fc) } : null);
const isMultiRange = (g) => !!g && (g.r1 !== g.r2 || g.c1 !== g.c2);
const single = (r, c) => ({ ar: r, ac: c, fr: r, fc: c });
// always leave some empty rows under the data
const padRows = (rows) => {
  let blank = 0;
  for (let i = rows.length - 1; i >= 0 && !isFilled(rows[i]); i -= 1) blank += 1;
  return blank >= 10 ? rows : [...rows, ...Array.from({ length: 20 }, emptyRow)];
};

const Row = memo(function Row({ r, row, fields, labels, status, activeCol, editCol, direct, selLo, selHi, tail, onCell, onKeyDown, onPaste, onCopy, onCut, onFocusCell, onCellDown, onCellEnter, onCellEdit, onMenu, onNumDown, onNumEnter, onRemove, en }) {
  return (
    <tr className={`${status?.cls === 'is-bad' ? 'is-error' : activeCol >= 0 ? 'is-active-row' : ''} ${tail || activeCol >= 0 ? '' : 'is-far'}`}>
      <td
        className={`va-grid-num ${activeCol >= 0 ? 'is-active' : ''} ${selLo >= 0 ? 'is-sel' : ''}`}
        data-field="num"
        onMouseDown={(e) => onNumDown(e, r)}
        onContextMenu={onMenu}
        onMouseEnter={() => onNumEnter(r)}
      >{r + 1}</td>
      {fields.map((f, c) => (
        <td key={f} data-field={f} data-label={labels[f]} className={c >= selLo && c <= selHi ? 'is-sel' : ''}>
          <input
            data-r={r}
            data-c={c}
            value={row[f]}
            readOnly={!direct && editCol !== c}
            list={f === 'topic' ? 'va-grid-topics' : f === 'pos' ? 'va-grid-pos' : undefined}
            onChange={(e) => onCell(r, f, e.target.value)}
            onKeyDown={(e) => onKeyDown(e, r, c)}
            onPaste={(e) => onPaste(e, r, c)}
            onCopy={(e) => onCopy(e, r, c)}
            onCut={(e) => onCut(e, r, c)}
            onMouseDown={(e) => onCellDown(e, r, c)}
            onMouseEnter={() => onCellEnter(r, c)}
            onFocus={(e) => { if (direct) e.target.select(); onFocusCell(r, c); }}
            onDoubleClick={() => onCellEdit(r, c)}
            onContextMenu={onMenu}
            autoComplete="off"
            spellCheck={false}
            aria-label={`${labels[f]}, ${en ? 'row' : 'qator'} ${r + 1}`}
          />
        </td>
      ))}
      <td className="va-grid-status" data-field="status">{status && <span className={`ca-tag ${status.cls}`} title={status.label}>{status.label}</span>}</td>
      <td className="va-grid-del" data-field="del">
        {isFilled(row) && (
          <button type="button" tabIndex={-1} className="ca-row-remove" onClick={() => onRemove(r)} aria-label={en ? `Delete row ${r + 1}` : `${r + 1}-qatorni o'chirish`}><Trash2 size={14} /></button>
        )}
      </td>
    </tr>
  );
});

export default function WordGrid(props) {
  return props.open ? <Sheet {...props} /> : null;
}

function Sheet({ onClose, onSync, en, courseMode = false, topicTitle, fallbackTopic, initialRows }) {
  const FIELDS = useMemo(() => (courseMode
    ? ['topic', 'word', 'translation', 'translationRu', 'pos', 'definition', 'example']
    : ['word', 'translation', 'translationRu', 'pos', 'definition', 'example']), [courseMode]);
  const LABELS = useMemo(() => ({
    topic: en ? 'Topic' : 'Mavzu',
    word: en ? 'Word' : "So'z",
    translation: en ? 'Translation' : 'Tarjima',
    translationRu: en ? 'Russian' : 'Ruscha',
    pos: en ? 'Part of speech' : 'Turkum',
    definition: en ? 'Definition' : "Ta'rif",
    example: en ? 'Example' : 'Misol',
  }), [en]);

  const [rows, setRows] = useState(() => [...initialRows.map((r) => ({ ...emptyRow(), ...r })), ...Array.from({ length: EXTRA_ROWS }, emptyRow)]);
  const [widths, setWidths] = useState(DEFAULT_WIDTH);
  const [active, setActive] = useState({ r: -1, c: -1 });
  const [dragging, setDragging] = useState(null);
  const [sync, setSync] = useState({ state: 'idle', error: '' }); // idle | pending | saving | error
  const [fileNote, setFileNote] = useState(null); // { error?: string, text?: string }
  const [reading, setReading] = useState(false);
  const [menu, setMenu] = useState(null); // { x, y } of the open right-click menu
  const [editing, setEditing] = useState(null); // { r, c } while a cell is being typed in
  const [sel, setSel] = useState(null); // { ar, ac, fr, fc }: anchor + far corner of the selected block

  const bodyRef = useRef(null);
  const fileRef = useRef(null);
  const rowsRef = useRef(rows);
  rowsRef.current = rows;
  const editRef = useRef(null);
  editRef.current = editing;
  const editOrigRef = useRef('');
  const direct = useMemo(() => typeof window !== 'undefined' && !!window.matchMedia?.('(max-width: 767px), (pointer: coarse)').matches, []);
  const selRef = useRef(null);
  selRef.current = sel;
  const dragRef = useRef(null);
  const keepSelRef = useRef(false);
  const histRef = useRef({ undo: [], redo: [], group: null, at: 0 });
  // What the server side already has: id -> last saved cells.
  const snapRef = useRef(new Map(initialRows.map((r) => [r.id, cellsKey({ ...emptyRow(), ...r })])));
  const lastKeyRef = useRef(null);
  const autoUnitsRef = useRef([]);
  const busyRef = useRef(false);
  const againRef = useRef(false);
  const timerRef = useRef(null);
  const payloadRef = useRef(null);
  const failedKeyRef = useRef(null);

  // Every user change goes through here so it can be undone. Typing in the
  // same cell within a second is one undo step.
  const mutate = useCallback((fn, group = null) => {
    const prev = rowsRef.current;
    const next = fn(prev);
    if (next === prev) return;
    const h = histRef.current;
    const now = Date.now();
    if (!(group && h.group === group && now - h.at < 1000)) {
      h.undo.push(prev);
      if (h.undo.length > HISTORY_LIMIT) h.undo.shift();
    }
    h.group = group;
    h.at = now;
    h.redo = [];
    rowsRef.current = next;
    setRows(next);
  }, []);

  const undo = useCallback(() => {
    const h = histRef.current;
    const prev = h.undo.pop();
    if (!prev) return;
    h.redo.push(rowsRef.current);
    h.group = null;
    const next = padRows(prev);
    rowsRef.current = next;
    setRows(next);
  }, []);

  const redo = useCallback(() => {
    const h = histRef.current;
    const next = h.redo.pop();
    if (!next) return;
    h.undo.push(rowsRef.current);
    h.group = null;
    const padded = padRows(next);
    rowsRef.current = padded;
    setRows(padded);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => bodyRef.current?.querySelector('input')?.focus(), 60);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { clearTimeout(t); document.body.style.overflow = prev; };
  }, []);

  // Parse the filled rows with the import rules. `line` = position in the
  // table handed to the parser, mapped back to the grid row.
  const parsed = useMemo(() => {
    const cells = [FIELDS];
    const index = [];
    rows.forEach((r, i) => {
      if (!isFilled(r)) return;
      cells.push(FIELDS.map((f) => r[f]));
      index.push(i);
    });
    return markDuplicates(parseWordCells(cells, '', en)).map((r, k) => ({ ...r, gridRow: index[k] }));
  }, [rows, FIELDS, en]);

  const byRow = useMemo(() => new Map(parsed.map((r) => [r.gridRow, r])), [parsed]);
  const errors = parsed.filter((r) => r.error).length;

  // What should be saved right now: valid rows + ids whose row is gone.
  const payload = useMemo(() => {
    const entries = importable(parsed).map((p) => ({
      id: rows[p.gridRow].id,
      topic: courseMode ? p.topic || '' : '',
      word: p.word,
      translation: p.translation,
      translationRu: p.translationRu || '',
      partOfSpeech: p.partOfSpeech,
      definition: p.definition,
      example: p.example,
    }));
    const present = new Set(rows.filter(isFilled).map((r) => r.id));
    const removedIds = [...snapRef.current.keys()].filter((id) => !present.has(id));
    return { entries, removedIds, key: JSON.stringify([entries, removedIds]) };
    // sync changes after every save, which refreshes `removedIds`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsed, rows, courseMode, sync.state]);

  const flush = useCallback(async () => {
    clearTimeout(timerRef.current);
    if (busyRef.current) { againRef.current = true; return; }
    const p = payloadRef.current;
    if (!p || p.key === lastKeyRef.current) { setSync((s) => (s.state === 'pending' ? { state: 'idle', error: '' } : s)); return; }
    busyRef.current = true;
    setSync({ state: 'saving', error: '' });
    let res;
    try {
      res = await onSync(p.entries, p.removedIds, autoUnitsRef.current);
    } catch (err) {
      res = { ok: false, error: err.message };
    }
    busyRef.current = false;
    if (res.ok) {
      p.removedIds.forEach((id) => snapRef.current.delete(id));
      const byId = new Map(rowsRef.current.map((r) => [r.id, r]));
      p.entries.forEach((e) => { if (byId.has(e.id)) snapRef.current.set(e.id, cellsKey(byId.get(e.id))); });
      autoUnitsRef.current = [...new Set([...autoUnitsRef.current, ...(res.created || [])])];
      lastKeyRef.current = p.key;
      failedKeyRef.current = null;
      setSync({ state: 'idle', error: '' });
    } else {
      failedKeyRef.current = p.key;
      setSync({ state: 'error', error: res.error || '' });
    }
    if (againRef.current) { againRef.current = false; flush(); }
  }, [onSync]);

  // First render: what's on screen is already saved. After that, every
  // change schedules a save.
  useEffect(() => {
    payloadRef.current = payload;
    if (lastKeyRef.current === null) { lastKeyRef.current = payload.key; return undefined; }
    if (payload.key === lastKeyRef.current || payload.key === failedKeyRef.current || busyRef.current) return undefined;
    setSync((s) => (s.state === 'pending' ? s : { state: 'pending', error: '' }));
    timerRef.current = setTimeout(flush, SAVE_DELAY);
    return () => clearTimeout(timerRef.current);
  }, [payload, flush]);

  const requestClose = useCallback(async () => {
    await flush();
    // flush() returns early while a save is running; wait for it
    for (let i = 0; i < 50 && busyRef.current; i += 1) await new Promise((res) => { setTimeout(res, 100); });
    onClose();
  }, [flush, onClose]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (editRef.current) return;
        const g = normRange(selRef.current);
        if (isMultiRange(g)) setSel(single(selRef.current.ar, selRef.current.ac));
        else requestClose();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && !e.altKey) {
        const k = e.key.toLowerCase();
        if (k === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
        else if (k === 'y' || (k === 'z' && e.shiftKey)) { e.preventDefault(); redo(); }
      }
    };
    const onUp = () => { dragRef.current = null; };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mouseup', onUp); };
  }, [requestClose, undo, redo]);

  const focusCell = (r, c) => {
    const el = bodyRef.current?.querySelector(`[data-r="${r}"][data-c="${c}"]`);
    if (el) { el.focus(); el.select?.(); el.scrollIntoView?.({ block: 'nearest', inline: 'nearest' }); }
  };

  const ensureRows = useCallback((count) => {
    setRows((prev) => (prev.length >= count ? prev : [...prev, ...Array.from({ length: count - prev.length }, emptyRow)]));
  }, []);

  // Focus a cell without the focus handler collapsing the selection.
  const focusKeep = (r, c) => {
    keepSelRef.current = true;
    focusCell(r, c);
    keepSelRef.current = false;
  };

  const onCell = useCallback((r, field, value) => {
    mutate((prev) => {
      const next = prev.map((row, i) => (i === r ? { ...row, [field]: value } : row));
      // always keep a few blank rows under the data
      return r >= next.length - 10 ? [...next, ...Array.from({ length: 20 }, emptyRow)] : next;
    }, `cell:${r}:${field}`);
    // typing replaces a selected block with the one edited cell
    const s = selRef.current;
    if (s && (s.ar !== s.fr || s.ac !== s.fc)) setSel(single(s.ar, s.ac));
  }, [mutate]);

  // Like Excel: scrolling to the bottom always finds more empty rows.
  const onScroll = (e) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight < el.scrollHeight - 240) return;
    setRows((prev) => (prev.length >= MAX_GRID_ROWS ? prev : [...prev, ...Array.from({ length: MORE_ROWS }, emptyRow)]));
  };

  const onFocusCell = useCallback((r, c) => {
    setActive({ r, c });
    setEditing((cur) => (cur && cur.r === r && cur.c === c ? cur : null));
    if (!keepSelRef.current) setSel(single(r, c));
  }, []);

  // Double click / F2 / typing: the cell becomes editable with the caret at the end.
  const startEdit = useCallback((r, c, replaceWith = null) => {
    const field = FIELDS[c];
    editOrigRef.current = rowsRef.current[r]?.[field] ?? '';
    if (replaceWith !== null) mutate((prev) => prev.map((row, i) => (i === r ? { ...row, [field]: replaceWith } : row)), `cell:${r}:${field}`);
    setEditing({ r, c });
    setTimeout(() => {
      const el = bodyRef.current?.querySelector(`[data-r="${r}"][data-c="${c}"]`);
      if (!el) return;
      el.focus();
      el.setSelectionRange?.(el.value.length, el.value.length);
    }, 0);
  }, [FIELDS, mutate]);

  const onCellEdit = useCallback((r, c) => { if (!direct) startEdit(r, c); }, [direct, startEdit]);

  const lastColIdx = FIELDS.length - 1;
  const lastDataRow = () => Math.max(0, rowsRef.current.reduce((last, row, i) => (isFilled(row) ? i : last), -1));

  // A right click inside the selected block keeps the block (for the menu).
  const insideSel = (r, c) => {
    const g = normRange(selRef.current);
    return !!g && r >= g.r1 && r <= g.r2 && c >= g.c1 && c <= g.c2;
  };

  const onCellDown = useCallback((e, r, c) => {
    if (e.button === 2 && insideSel(r, c)) { e.preventDefault(); return; }
    if (e.button !== 0 && e.button !== 2) return;
    const s = selRef.current;
    if (e.shiftKey && s) {
      e.preventDefault();
      setSel({ ...s, fr: r, fc: c });
      if (document.activeElement?.tagName !== 'INPUT') focusKeep(s.ar, s.ac);
      return;
    }
    dragRef.current = { mode: 'cell' };
    setSel(single(r, c));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCellEnter = useCallback((r, c) => {
    const d = dragRef.current;
    if (!d) return;
    window.getSelection?.()?.removeAllRanges();
    setSel((s) => {
      if (!s) return s;
      const fr = d.mode === 'col' ? s.fr : r;
      const fc = d.mode === 'row' ? s.fc : c;
      return fr === s.fr && fc === s.fc ? s : { ...s, fr, fc };
    });
  }, []);

  const onNumDown = useCallback((e, r) => {
    e.preventDefault();
    if (e.button === 2 && insideSel(r, 0)) return;
    if (e.button !== 0 && e.button !== 2) return;
    const s = selRef.current;
    dragRef.current = { mode: 'row' };
    setSel(e.shiftKey && s ? { ar: s.ar, ac: 0, fr: r, fc: lastColIdx } : { ar: r, ac: 0, fr: r, fc: lastColIdx });
    focusKeep(e.shiftKey && s ? s.ar : r, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastColIdx]);

  const onNumEnter = useCallback((r) => {
    if (dragRef.current?.mode !== 'row') return;
    setSel((s) => (s && s.fr !== r ? { ...s, fr: r } : s));
  }, []);

  const onColDown = (e, c) => {
    e.preventDefault();
    if (e.button === 2 && insideSel(0, c)) return;
    if (e.button !== 0 && e.button !== 2) return;
    const s = selRef.current;
    dragRef.current = { mode: 'col' };
    const bottom = lastDataRow();
    setSel(e.shiftKey && s ? { ar: 0, ac: s.ac, fr: bottom, fc: c } : { ar: 0, ac: c, fr: bottom, fc: c });
    focusKeep(0, e.shiftKey && s ? s.ac : c);
  };

  const onColEnter = (c) => {
    if (dragRef.current?.mode !== 'col') return;
    setSel((s) => (s && s.fc !== c ? { ...s, fc: c } : s));
  };

  const range = normRange(sel);
  const multi = isMultiRange(range);

  const clearRange = useCallback((g) => {
    mutate((prev) => prev.map((row, i) => {
      if (i < g.r1 || i > g.r2) return row;
      const next = { ...row };
      for (let c = g.c1; c <= g.c2; c += 1) next[FIELDS[c]] = '';
      return next;
    }));
  }, [FIELDS, mutate]);

  const deleteSelectedRows = () => {
    const g = normRange(selRef.current);
    if (!g) return;
    mutate((prev) => {
      const next = prev.filter((_, i) => i < g.r1 || i > g.r2);
      return padRows(next.length ? next : [emptyRow()]);
    });
    setSel(single(g.r1, 0));
    setTimeout(() => focusCell(g.r1, 0), 0);
  };

  const rangeText = useCallback((g) => rowsRef.current.slice(g.r1, g.r2 + 1)
    .map((row) => FIELDS.slice(g.c1, g.c2 + 1).map((f) => String(row[f] || '').replace(/\s+/g, ' ')).join('\t'))
    .join('\n'), [FIELDS]);

  // A selected block (or a selected, not-being-edited cell) is copied whole.
  const copyTarget = useCallback((r, c) => {
    const g = normRange(selRef.current);
    if (isMultiRange(g)) return g;
    if (direct || (editRef.current && editRef.current.r === r && editRef.current.c === c)) return null;
    return { r1: r, r2: r, c1: c, c2: c };
  }, [direct]);

  const onCopy = useCallback((e, r, c) => {
    const g = copyTarget(r, c);
    if (!g) return;
    e.preventDefault();
    e.clipboardData.setData('text/plain', rangeText(g));
  }, [rangeText, copyTarget]);

  const onCut = useCallback((e, r, c) => {
    const g = copyTarget(r, c);
    if (!g) return;
    e.preventDefault();
    e.clipboardData.setData('text/plain', rangeText(g));
    clearRange(g);
  }, [rangeText, clearRange, copyTarget]);

  const onKeyDown = useCallback((e, r, c) => {
    const el = e.currentTarget;
    const typing = direct || (editRef.current && editRef.current.r === r && editRef.current.c === c);
    const atStart = !typing || (el.selectionStart === 0 && el.selectionEnd === 0);
    const atEnd = !typing || (el.selectionStart === el.value.length && el.selectionEnd === el.value.length);
    const go = (nr, nc) => {
      e.preventDefault();
      if (nr >= rowsRef.current.length) ensureRows(nr + 5);
      setTimeout(() => focusCell(nr, nc), 0);
    };
    const g = normRange(selRef.current);
    const block = isMultiRange(g);
    const mod = e.ctrlKey || e.metaKey;
    if (!direct && typing && e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      const field = FIELDS[c];
      const orig = editOrigRef.current;
      mutate((prev) => prev.map((row, i) => (i === r ? { ...row, [field]: orig } : row)));
      setEditing(null);
      return;
    }
    if (!typing) {
      if (e.key === 'F2') { e.preventDefault(); startEdit(r, c); return; }
      if (e.key.length === 1 && !mod && !e.altKey) { e.preventDefault(); startEdit(r, c, e.key); return; }
      if (!block && (e.key === 'Delete' || e.key === 'Backspace')) {
        e.preventDefault();
        clearRange({ r1: r, r2: r, c1: c, c2: c });
        return;
      }
    }
    if (mod && !typing && e.key.toLowerCase() === 'a') {
      e.preventDefault();
      const bottom = rowsRef.current.reduce((last, row, i) => (isFilled(row) ? i : last), 0);
      setSel({ ar: 0, ac: 0, fr: bottom, fc: FIELDS.length - 1 });
      return;
    }
    const ARROWS = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
    if (e.shiftKey && !mod && ARROWS[e.key]) {
      const vertical = e.key === 'ArrowUp' || e.key === 'ArrowDown';
      if (vertical || block || (e.key === 'ArrowRight' ? atEnd : atStart)) {
        e.preventDefault();
        const s = selRef.current || single(r, c);
        const [dr, dc] = ARROWS[e.key];
        const fr = Math.max(0, s.fr + dr);
        const fc = Math.min(FIELDS.length - 1, Math.max(0, s.fc + dc));
        if (fr >= rowsRef.current.length - 3) ensureRows(fr + 10);
        setSel({ ...s, fr, fc });
        setTimeout(() => bodyRef.current?.querySelector(`[data-r="${fr}"][data-c="${fc}"]`)?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' }), 0);
        return;
      }
    }
    if (block && (e.key === 'Delete' || e.key === 'Backspace')) {
      e.preventDefault();
      clearRange(g);
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey) go(r + 1, c);
    else if (e.key === 'Enter' && e.shiftKey && r > 0) go(r - 1, c);
    else if (e.key === 'ArrowDown') go(r + 1, c);
    else if (e.key === 'ArrowUp' && r > 0) go(r - 1, c);
    else if (e.key === 'ArrowRight' && atEnd && c < FIELDS.length - 1) go(r, c + 1);
    else if (e.key === 'ArrowLeft' && atStart && c > 0) go(r, c - 1);
    else if (e.key === 'Tab' && !e.shiftKey && c === FIELDS.length - 1) go(r + 1, 0);
    else if (e.key === 'Tab' && e.shiftKey && c === 0 && r > 0) go(r - 1, FIELDS.length - 1);
  }, [FIELDS, ensureRows, clearRange, direct, mutate, startEdit]);

  // Writes clipboard text into the sheet. false = leave it to the browser.
  const applyPaste = useCallback((text, r0, c0, native) => {
    const g = normRange(selRef.current);
    const block = isMultiRange(g);
    if (!/[\t\n\r]/.test(text)) {
      const typing = native && (direct || (editRef.current && editRef.current.r === r0 && editRef.current.c === c0));
      if (!block && typing) return false; // typing in a cell pastes natively
      if (!block) {
        mutate((prev) => prev.map((row, i) => (i === r0 ? { ...row, [FIELDS[c0]]: text.trim() } : row)));
        return true;
      }
      // one value pasted onto a selected block fills the whole block, like Excel
      mutate((prev) => prev.map((row, i) => {
        if (i < g.r1 || i > g.r2) return row;
        const next = { ...row };
        for (let c = g.c1; c <= g.c2; c += 1) next[FIELDS[c]] = text.trim();
        return next;
      }));
      return true;
    }
    const r = block ? g.r1 : r0;
    const c = block ? g.c1 : c0;
    const grid = text.replace(/\r\n|\r/g, '\n').replace(/\n+$/, '').split('\n').map((line) => line.split('\t'));
    mutate((prev) => {
      const need = r + grid.length + 5;
      const next = prev.length >= need ? [...prev] : [...prev, ...Array.from({ length: need - prev.length }, emptyRow)];
      grid.forEach((cellsOfLine, i) => {
        const row = { ...next[r + i] };
        cellsOfLine.forEach((v, j) => {
          const field = FIELDS[c + j];
          if (field) row[field] = v.trim();
        });
        next[r + i] = row;
      });
      return next;
    });
    return true;
  }, [FIELDS, mutate, direct]);

  const onPaste = useCallback((e, r0, c0) => {
    if (applyPaste(e.clipboardData.getData('text'), r0, c0, true)) e.preventDefault();
  }, [applyPaste]);

  // ---- right-click menu ----
  const onMenu = useCallback((e) => {
    e.preventDefault();
    setMenu({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (!menu) return undefined;
    const close = () => setMenu(null);
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
    window.addEventListener('mousedown', close);
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('resize', close);
    return () => { window.removeEventListener('mousedown', close); window.removeEventListener('keydown', onKey, true); window.removeEventListener('resize', close); };
  }, [menu]);

  const menuTarget = () => normRange(selRef.current) || { r1: 0, r2: 0, c1: 0, c2: 0 };

  const copyToClipboard = async (g) => {
    try {
      await navigator.clipboard.writeText(rangeText(g));
      return true;
    } catch {
      setFileNote({ error: en ? "The browser blocked clipboard access — use Ctrl+C / Ctrl+V." : "Brauzer buferga ruxsat bermadi — Ctrl+C / Ctrl+V dan foydalaning." });
      return false;
    }
  };

  const menuAct = async (act) => {
    const g = menuTarget();
    setMenu(null);
    if (act === 'copy') await copyToClipboard(g);
    else if (act === 'cut') { if (await copyToClipboard(g)) clearRange(g); }
    else if (act === 'paste') {
      try {
        const text = await navigator.clipboard.readText();
        applyPaste(text, g.r1, g.c1, false);
      } catch {
        setFileNote({ error: en ? 'The browser blocked clipboard access — use Ctrl+V.' : 'Brauzer buferga ruxsat bermadi — Ctrl+V dan foydalaning.' });
      }
    } else if (act === 'clear') clearRange(g);
    else if (act === 'above' || act === 'below') {
      const count = g.r2 - g.r1 + 1;
      const at = act === 'above' ? g.r1 : g.r2 + 1;
      mutate((prev) => [...prev.slice(0, at), ...Array.from({ length: count }, emptyRow), ...prev.slice(at)]);
    } else if (act === 'delete') deleteSelectedRows();
    else if (act === 'undo') undo();
    else if (act === 'redo') redo();
  };

  const onRemove = useCallback((r) => {
    mutate((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== r) : [emptyRow()]));
  }, [mutate]);

  // An Excel / CSV / TXT file is loaded into the sheet (and saved like any
  // other typing). A word already in the sheet is updated in place.
  const loadFile = async (file) => {
    if (!file) return;
    setReading(true);
    setFileNote(null);
    try {
      const res = await readWordFile(file, en);
      if (!res.rows.length) {
        setFileNote({ error: en ? 'No words found in the file.' : "Faylda so'z topilmadi." });
        return;
      }
      const key = (r) => `${courseMode ? (r.topic || fallbackTopic).trim().toLowerCase() : ''}|${r.word.trim().toLowerCase()}`;
      mutate((prev) => {
        const next = prev.filter(isFilled);
        const at = new Map(next.map((r, i) => [key(r), i]));
        res.rows.forEach((x) => {
          const incoming = {
            topic: courseMode ? (x.topic || '') : '',
            word: x.word || '',
            translation: x.translation || '',
            translationRu: x.translationRu || '',
            pos: x.partOfSpeech || '',
            definition: x.definition || '',
            example: x.example || '',
          };
          const i = incoming.word ? at.get(key(incoming)) : undefined;
          if (i !== undefined) {
            const merged = { ...next[i] };
            Object.entries(incoming).forEach(([f, v]) => { if (v) merged[f] = v; });
            next[i] = merged;
          } else {
            next.push({ ...emptyRow(), ...incoming });
            if (incoming.word) at.set(key(incoming), next.length - 1);
          }
        });
        return [...next, ...Array.from({ length: EXTRA_ROWS }, emptyRow)];
      });
      setFileNote({ text: en ? `${res.rows.length} rows loaded from ${file.name} — saving…` : `${file.name}: ${res.rows.length} ta qator yuklandi — saqlanmoqda…` });
    } catch (err) {
      setFileNote({ error: err.message });
    } finally {
      setReading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const startResize = (e, f) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startW = widths[f];
    setDragging(f);
    const move = (ev) => setWidths((w) => ({ ...w, [f]: Math.max(MIN_COL, startW + ev.clientX - startX) }));
    const up = () => {
      setDragging(null);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const statusOf = (r) => {
    const p = byRow.get(r);
    if (!p) return null;
    if (p.error) return { cls: 'is-bad', label: p.error };
    if (p.duplicate) return { cls: '', label: en ? 'Duplicate — not saved' : 'Takror — saqlanmaydi' };
    const saved = snapRef.current.get(rows[r].id) === cellsKey(rows[r]);
    return saved ? { cls: 'is-good', label: en ? 'Saved' : 'Saqlandi' } : { cls: 'is-warn', label: en ? 'Saving…' : 'Saqlanmoqda…' };
  };

  const wordCount = payload.entries.length;
  // Phones show rows as cards: only the filled ones and a few blanks under them.
  const lastFilled = rows.reduce((last, row, i) => (isFilled(row) ? i : last), -1);
  const tableMin = NUM_W + DEL_W + STATUS_W + FIELDS.reduce((s, f) => s + widths[f], 0);
  const topicOptions = useMemo(() => (courseMode ? [...new Set(rows.map((r) => r.topic.trim()).filter(Boolean))] : []), [rows, courseMode]);

  const stateLine = (() => {
    if (sync.state === 'error') {
      return (
        <span className="va-grid-savestate is-error" role="status">
          {en ? "Couldn't save" : 'Saqlanmadi'}{sync.error ? `: ${sync.error}` : ''} · <button type="button" onClick={flush}>{en ? 'Retry' : 'Qayta urinish'}</button>
        </span>
      );
    }
    if (sync.state === 'saving' || sync.state === 'pending') {
      return <span className="va-grid-savestate" role="status"><span className="va-grid-dot is-pulse" />{en ? 'Saving…' : 'Saqlanmoqda…'}</span>;
    }
    return <span className="va-grid-savestate is-saved" role="status"><span className="va-grid-dot" />{en ? 'All changes saved' : "Barcha o'zgarishlar saqlandi"}</span>;
  })();

  return createPortal(
    <div className="va-grid-root" role="dialog" aria-modal="true" aria-label={en ? 'Words table' : "So'zlar jadvali"}>
      <div className="va-grid-screen">
        <header className="va-grid-head">
          <div className="va-grid-title">
            <h2>{courseMode ? (en ? 'Course table' : 'Kurs jadvali') : (en ? 'Words table' : "So'zlar jadvali")}</h2>
            <p>
              {courseMode
                ? (en ? `Edit cells or add rows — everything saves by itself. Rows without a topic go to “${fallbackTopic}”.` : `Katakni o'zgartiring yoki qator qo'shing — hammasi o'zi saqlanadi. Mavzusiz qatorlar «${fallbackTopic}» ga tushadi.`)
                : (en ? <>Topic <b>{topicTitle}</b>. Edit cells or add rows — everything saves by itself. Paste from Excel, drag column edges to resize.</> : <>Mavzu: <b>{topicTitle}</b>. Katakni o'zgartiring yoki qator qo'shing — hammasi o'zi saqlanadi. Excel'dan qo'yish mumkin, ustun chetini sudrab kengaytiring.</>)}
            </p>
          </div>
          <div className="va-grid-actions">
            <input ref={fileRef} type="file" accept=".xlsx,.csv,.tsv,.txt" hidden onChange={(e) => loadFile(e.target.files?.[0])} />
            <button type="button" className="faculty-btn-secondary" onClick={() => downloadTemplate('xlsx', en, courseMode)}>
              <Download size={14} /> <span className="ca-btn-label">{en ? 'Excel template' : 'Excel namuna'}</span>
            </button>
            <button type="button" className="faculty-btn-secondary" onClick={() => fileRef.current?.click()} disabled={reading}>
              <FileSpreadsheet size={14} /> <span className="ca-btn-label">{reading ? (en ? 'Reading...' : "O'qilmoqda...") : (en ? 'Import from Excel' : 'Excel dan import')}</span>
            </button>
            <button type="button" className="faculty-btn-secondary va-grid-tool" onClick={undo} disabled={!histRef.current.undo.length} title={en ? 'Undo (Ctrl+Z)' : 'Orqaga (Ctrl+Z)'} aria-label={en ? 'Undo' : 'Orqaga qaytarish'}>
              <Undo2 size={14} />
            </button>
            <button type="button" className="faculty-btn-secondary va-grid-tool" onClick={redo} disabled={!histRef.current.redo.length} title={en ? 'Redo (Ctrl+Y)' : 'Qayta (Ctrl+Y)'} aria-label={en ? 'Redo' : 'Qayta bajarish'}>
              <Redo2 size={14} />
            </button>
            <button type="button" className="va-grid-close" onClick={requestClose} aria-label={en ? 'Close' : 'Yopish'}><X size={18} /></button>
          </div>
          {fileNote && <p className={`va-grid-note ${fileNote.error ? 'is-error' : ''}`} role="status">{fileNote.error || fileNote.text}</p>}
        </header>

        <div className="va-grid-scroll" ref={bodyRef} onScroll={onScroll}>
          <table className="va-grid" style={{ minWidth: tableMin }}>
            <colgroup>
              <col style={{ width: NUM_W }} />
              {FIELDS.map((f) => <col key={f} style={{ width: widths[f] }} />)}
              <col style={{ width: STATUS_W }} />
              <col style={{ width: DEL_W }} />
            </colgroup>
            <thead>
              <tr>
                <th className="va-grid-num">#</th>
                {FIELDS.map((f, c) => (
                  <th
                    key={f}
                    className={`${active.c === c ? 'is-active' : ''} ${range && c >= range.c1 && c <= range.c2 && (multi || range.r1 !== range.r2) ? 'is-sel' : ''}`}
                    onMouseDown={(e) => onColDown(e, c)}
                    onMouseEnter={() => onColEnter(c)}
                    onContextMenu={onMenu}
                  >
                    {LABELS[f]}
                    <span
                      className={`va-grid-resize ${dragging === f ? 'is-dragging' : ''}`}
                      onPointerDown={(e) => startResize(e, f)}
                      onMouseDown={(e) => e.stopPropagation()}
                      onDoubleClick={() => setWidths((w) => ({ ...w, [f]: DEFAULT_WIDTH[f] }))}
                      role="separator"
                      aria-orientation="vertical"
                      aria-label={en ? `Resize ${LABELS[f]}` : `${LABELS[f]} kengligi`}
                    />
                  </th>
                ))}
                <th>{en ? 'Status' : 'Holati'}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <Row
                  key={row.id}
                  r={r}
                  row={row}
                  fields={FIELDS}
                  labels={LABELS}
                  status={statusOf(r)}
                  activeCol={active.r === r ? active.c : -1}
                  editCol={editing && editing.r === r ? editing.c : -1}
                  direct={direct}
                  selLo={multi && r >= range.r1 && r <= range.r2 ? range.c1 : -1}
                  selHi={multi && r >= range.r1 && r <= range.r2 ? range.c2 : -1}
                  tail={r <= lastFilled + 3}
                  onCell={onCell}
                  onKeyDown={onKeyDown}
                  onPaste={onPaste}
                  onCopy={onCopy}
                  onCut={onCut}
                  onFocusCell={onFocusCell}
                  onCellDown={onCellDown}
                  onCellEnter={onCellEnter}
                  onCellEdit={onCellEdit}
                  onMenu={onMenu}
                  onNumDown={onNumDown}
                  onNumEnter={onNumEnter}
                  onRemove={onRemove}
                  en={en}
                />
              ))}
            </tbody>
          </table>
          {courseMode && <datalist id="va-grid-topics">{topicOptions.map((t) => <option key={t} value={t} />)}</datalist>}
          <datalist id="va-grid-pos">{POS_OPTIONS.map((o) => <option key={o.value} value={o.value} />)}</datalist>
        </div>

        {menu && (() => {
          const g = menuTarget();
          const rowsN = g.r2 - g.r1 + 1;
          const items = [
            { act: 'cut', icon: Scissors, label: en ? 'Cut' : 'Kesish', key: 'Ctrl+X' },
            { act: 'copy', icon: Copy, label: en ? 'Copy' : 'Nusxalash', key: 'Ctrl+C' },
            { act: 'paste', icon: ClipboardPaste, label: en ? 'Paste' : "Qo'yish", key: 'Ctrl+V' },
            { sep: true },
            { act: 'clear', icon: Eraser, label: en ? 'Clear contents' : 'Tozalash', key: 'Del' },
            { act: 'above', icon: Rows3, label: en ? `Insert ${rowsN} row${rowsN === 1 ? '' : 's'} above` : `Tepaga ${rowsN} ta qator qo'shish` },
            { act: 'below', icon: Rows3, label: en ? `Insert ${rowsN} row${rowsN === 1 ? '' : 's'} below` : `Pastga ${rowsN} ta qator qo'shish` },
            { act: 'delete', icon: Trash2, label: en ? `Delete ${rowsN} row${rowsN === 1 ? '' : 's'}` : `${rowsN} ta qatorni o'chirish`, danger: true },
            { sep: true },
            { act: 'undo', icon: Undo2, label: en ? 'Undo' : 'Orqaga qaytarish', key: 'Ctrl+Z', off: !histRef.current.undo.length },
            { act: 'redo', icon: Redo2, label: en ? 'Redo' : 'Qayta bajarish', key: 'Ctrl+Y', off: !histRef.current.redo.length },
          ];
          const left = Math.max(8, Math.min(menu.x, window.innerWidth - 248));
          const top = Math.max(8, Math.min(menu.y, window.innerHeight - items.length * 34 - 16));
          return (
            <div className="va-grid-menu" role="menu" style={{ left, top }} onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }} onContextMenu={(e) => e.preventDefault()}>
              {items.map((it, i) => (it.sep
                ? <div key={`s${i}`} className="va-grid-menu-sep" role="separator" />
                : (
                  <button key={it.act} type="button" role="menuitem" disabled={it.off} className={it.danger ? 'is-danger' : ''} onClick={() => menuAct(it.act)}>
                    <it.icon size={14} /> <span>{it.label}</span>{it.key && <kbd>{it.key}</kbd>}
                  </button>
                )))}
            </div>
          );
        })()}

        <footer className="va-grid-foot">
          {stateLine}
          {multi && (
            <span className="va-grid-selinfo">
              {en ? `${(range.r2 - range.r1 + 1) * (range.c2 - range.c1 + 1)} cells selected` : `${(range.r2 - range.r1 + 1) * (range.c2 - range.c1 + 1)} ta katak tanlandi`}
              {' · '}<button type="button" onClick={() => clearRange(range)}>{en ? 'Clear' : 'Tozalash'}</button>
              {' · '}<button type="button" className="is-danger" onClick={deleteSelectedRows}>{en ? `Delete ${range.r2 - range.r1 + 1} ${range.r2 === range.r1 ? 'row' : 'rows'}` : `${range.r2 - range.r1 + 1} ta qatorni o'chirish`}</button>
            </span>
          )}
          <div className="ca-imp-summary">
            <span className="ca-pill is-green">{en ? `${wordCount} ${wordCount === 1 ? 'word' : 'words'}` : `${wordCount} ta so'z`}</span>
            {errors > 0 && <span className="ca-pill is-red">{en ? `${errors} not saved` : `${errors} ta saqlanmagan`}</span>}
          </div>
        </footer>
      </div>
    </div>,
    document.querySelector('.corp-admin-layout') || document.body,
  );
}
