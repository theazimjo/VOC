import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Download, FileSpreadsheet, Trash2, X } from 'lucide-react';
import { importable, markDuplicates, parseWordCells, readWordFile } from './wordImport';
import { downloadTemplate } from './templateFiles';
import { newId, POS_OPTIONS } from './courseEditing';

// Excel-style sheet that saves as you type. The table IS the word list:
// it opens with the words already there, an edited cell updates its word,
// a finished new row (word, translation, example) is added, and a deleted
// row removes the word. Saving is debounced and goes through `onSync`.
// Tab / Enter / arrows move between cells, a block copied from Excel or
// Google Sheets lands cell by cell, column edges can be dragged.

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

const Row = memo(function Row({ r, row, fields, labels, status, activeCol, tail, onCell, onKeyDown, onPaste, onFocusCell, onRemove, en }) {
  return (
    <tr className={`${status?.cls === 'is-bad' ? 'is-error' : activeCol >= 0 ? 'is-active-row' : ''} ${tail || activeCol >= 0 ? '' : 'is-far'}`}>
      <td className={`va-grid-num ${activeCol >= 0 ? 'is-active' : ''}`} data-field="num">{r + 1}</td>
      {fields.map((f, c) => (
        <td key={f} data-field={f} data-label={labels[f]}>
          <input
            data-r={r}
            data-c={c}
            value={row[f]}
            list={f === 'topic' ? 'va-grid-topics' : f === 'pos' ? 'va-grid-pos' : undefined}
            onChange={(e) => onCell(r, f, e.target.value)}
            onKeyDown={(e) => onKeyDown(e, r, c)}
            onPaste={(e) => onPaste(e, r, c)}
            onFocus={(e) => { e.target.select(); onFocusCell(r, c); }}
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

  const bodyRef = useRef(null);
  const fileRef = useRef(null);
  const rowsRef = useRef(rows);
  rowsRef.current = rows;
  // What the server side already has: id -> last saved cells.
  const snapRef = useRef(new Map(initialRows.map((r) => [r.id, cellsKey({ ...emptyRow(), ...r })])));
  const lastKeyRef = useRef(null);
  const autoUnitsRef = useRef([]);
  const busyRef = useRef(false);
  const againRef = useRef(false);
  const timerRef = useRef(null);
  const payloadRef = useRef(null);
  const failedKeyRef = useRef(null);

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
    const onEsc = (e) => { if (e.key === 'Escape') requestClose(); };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [requestClose]);

  const focusCell = (r, c) => {
    const el = bodyRef.current?.querySelector(`[data-r="${r}"][data-c="${c}"]`);
    if (el) { el.focus(); el.select?.(); el.scrollIntoView?.({ block: 'nearest', inline: 'nearest' }); }
  };

  const ensureRows = useCallback((count) => {
    setRows((prev) => (prev.length >= count ? prev : [...prev, ...Array.from({ length: count - prev.length }, emptyRow)]));
  }, []);

  const onCell = useCallback((r, field, value) => {
    setRows((prev) => {
      const next = prev.map((row, i) => (i === r ? { ...row, [field]: value } : row));
      // always keep a few blank rows under the data
      return r >= next.length - 10 ? [...next, ...Array.from({ length: 20 }, emptyRow)] : next;
    });
  }, []);

  // Like Excel: scrolling to the bottom always finds more empty rows.
  const onScroll = (e) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight < el.scrollHeight - 240) return;
    setRows((prev) => (prev.length >= MAX_GRID_ROWS ? prev : [...prev, ...Array.from({ length: MORE_ROWS }, emptyRow)]));
  };

  const onFocusCell = useCallback((r, c) => setActive({ r, c }), []);

  const onKeyDown = useCallback((e, r, c) => {
    const el = e.currentTarget;
    const atStart = el.selectionStart === 0 && el.selectionEnd === 0;
    const atEnd = el.selectionStart === el.value.length && el.selectionEnd === el.value.length;
    const go = (nr, nc) => {
      e.preventDefault();
      if (nr >= rowsRef.current.length) ensureRows(nr + 5);
      setTimeout(() => focusCell(nr, nc), 0);
    };
    if (e.key === 'Enter' && !e.shiftKey) go(r + 1, c);
    else if (e.key === 'Enter' && e.shiftKey && r > 0) go(r - 1, c);
    else if (e.key === 'ArrowDown') go(r + 1, c);
    else if (e.key === 'ArrowUp' && r > 0) go(r - 1, c);
    else if (e.key === 'ArrowRight' && atEnd && c < FIELDS.length - 1) go(r, c + 1);
    else if (e.key === 'ArrowLeft' && atStart && c > 0) go(r, c - 1);
    else if (e.key === 'Tab' && !e.shiftKey && c === FIELDS.length - 1) go(r + 1, 0);
    else if (e.key === 'Tab' && e.shiftKey && c === 0 && r > 0) go(r - 1, FIELDS.length - 1);
  }, [FIELDS, ensureRows]);

  const onPaste = useCallback((e, r, c) => {
    const text = e.clipboardData.getData('text');
    if (!/[\t\n\r]/.test(text)) return; // a plain single value pastes normally
    e.preventDefault();
    const grid = text.replace(/\r\n|\r/g, '\n').replace(/\n+$/, '').split('\n').map((line) => line.split('\t'));
    setRows((prev) => {
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
  }, [FIELDS]);

  const onRemove = useCallback((r) => {
    setRows((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== r) : [emptyRow()]));
  }, []);

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
      setRows((prev) => {
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
                  <th key={f} className={active.c === c ? 'is-active' : ''}>
                    {LABELS[f]}
                    <span
                      className={`va-grid-resize ${dragging === f ? 'is-dragging' : ''}`}
                      onPointerDown={(e) => startResize(e, f)}
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
                  tail={r <= lastFilled + 3}
                  onCell={onCell}
                  onKeyDown={onKeyDown}
                  onPaste={onPaste}
                  onFocusCell={onFocusCell}
                  onRemove={onRemove}
                  en={en}
                />
              ))}
            </tbody>
          </table>
          {courseMode && <datalist id="va-grid-topics">{topicOptions.map((t) => <option key={t} value={t} />)}</datalist>}
          <datalist id="va-grid-pos">{POS_OPTIONS.map((o) => <option key={o.value} value={o.value} />)}</datalist>
        </div>

        <footer className="va-grid-foot">
          {stateLine}
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
