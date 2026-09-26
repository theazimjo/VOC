import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Check, FileText, Pencil, Plus, Settings, Trash2, Upload } from 'lucide-react';
import { updateCustomPack } from '../../../services/corpService';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Button, EmptyState, Field, Page, Row, SearchField, Section, Sheet } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useToast } from '../super-admin/useToast';
import {
  POS_LABEL, POS_OPTIONS, courseTotals, courseUpdates, mapMonth, mapUnit, mergeWords, monthsOf, newId, parseWordList,
} from './courseEditing';

// A course's content: its topics, and each topic's words (own page).
// Storage still nests topics under months (students' progress keys and
// homework items point at monthId+unitId), but there is no month level in
// the editor: new topics go into the course's last month (created as
// "1-oy" when missing); older multi-month courses just show a heading per
// month. Position lives in the URL (?courseId=&monthId=&unitId=) so
// refresh and the browser back button work. Every change saves the whole
// tree at once (courseUpdates) — packs are small.
export default function CourseEditor({ centerId, course, onBack, onUpdate }) {
  const isDesktop = useIsDesktop();
  const [toastNode, showToast] = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const monthId = searchParams.get('monthId');
  const unitId = searchParams.get('unitId');

  const [months, setMonths] = useState(() => monthsOf(course));
  useEffect(() => { setMonths(monthsOf(course)); }, [course.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const [nameSheet, setNameSheet] = useState(null); // { id?, monthId?, title } — a topic
  const [manageOpen, setManageOpen] = useState(false);
  const [wordSheet, setWordSheet] = useState(null); // { word? }
  const [importOpen, setImportOpen] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const month = months.find((m) => m.id === monthId) || null;
  const unit = month?.units?.find((u) => u.id === unitId) || null;

  const go = (params) => setSearchParams({ courseId: course.id, ...params });

  const save = async (next) => {
    const prev = months;
    setMonths(next);
    try {
      const updates = courseUpdates(next);
      await updateCustomPack(centerId, course.id, updates);
      onUpdate?.({ ...course, ...updates });
    } catch (err) {
      setMonths(prev);
      showToast(`Saqlanmadi: ${err.message}`, 'error');
    }
  };

  const saveName = (title) => {
    const { id } = nameSheet;
    if (id) {
      save(mapUnit(months, nameSheet.monthId, id, (u) => ({ ...u, title })));
    } else {
      const unit = { id: newId('unit'), title, words: [] };
      const last = months[months.length - 1];
      save(last
        ? mapMonth(months, last.id, (m) => ({ ...m, units: [...(m.units || []), unit] }))
        : [{ id: 'm1', title: '1-oy', units: [unit] }]);
    }
    setNameSheet(null);
  };

  const askDeleteUnit = () => {
    setManageOpen(false);
    setConfirm({
      title: `"${unit.title}" o'chirilsinmi?`,
      message: `Undagi ${(unit.words || []).length} ta so'z ham o'chadi. Bu mavzu berilgan vazifalarda ochilmay qoladi.`,
      confirmLabel: "O'chirish",
      run: async () => {
        go({});
        await save(mapMonth(months, monthId, (m) => ({ ...m, units: (m.units || []).filter((u) => u.id !== unit.id) })));
      },
    });
  };

  const common = (
    <>
      <NameSheet state={nameSheet} onClose={() => setNameSheet(null)} onSave={saveName} />
      <ConfirmSheet
        open={Boolean(confirm)}
        title={confirm?.title}
        message={confirm?.message}
        confirmLabel={confirm?.confirmLabel}
        danger
        onConfirm={async () => { await confirm.run(); setConfirm(null); }}
        onCancel={() => setConfirm(null)}
      />
      {toastNode}
    </>
  );

  // ── One topic's words ──
  if (unit) {
    return (
      <>
        <UnitWords
          course={course}
          unit={unit}
          isDesktop={isDesktop}
          onBack={() => go({})}
          onManage={() => setManageOpen(true)}
          onAdd={() => setWordSheet({})}
          onImport={() => setImportOpen(true)}
          onEdit={(word) => setWordSheet({ word })}
          onDeleteMany={(ids) => setConfirm({
            title: `${ids.length} ta so'z o'chirilsinmi?`,
            message: "Qaytarib bo'lmaydi.",
            confirmLabel: "O'chirish",
            run: () => save(mapUnit(months, monthId, unitId, (u) => ({ ...u, words: (u.words || []).filter((w) => !ids.includes(w.id)) }))),
          })}
        />
        <Sheet open={manageOpen} onClose={() => setManageOpen(false)} title={unit.title}>
          <Section>
            <Row icon={<Pencil size={16} />} iconTone="gray" title="Nomini o'zgartirish" onClick={() => { setManageOpen(false); setNameSheet({ id: unit.id, monthId, title: unit.title }); }} />
          </Section>
          <Section>
            <Row icon={<Trash2 size={16} />} iconTone="red" title="Mavzuni o'chirish" destructive chevron={false} onClick={askDeleteUnit} />
          </Section>
        </Sheet>
        <WordSheet
          state={wordSheet}
          onClose={() => setWordSheet(null)}
          onSave={(data) => {
            const editing = wordSheet?.word;
            save(mapUnit(months, monthId, unitId, (u) => ({
              ...u,
              words: editing
                ? (u.words || []).map((w) => (w.id === editing.id ? { ...w, ...data } : w))
                : [...(u.words || []), { id: newId('w'), ...data }],
            })));
            setWordSheet(null);
          }}
          onDelete={(word) => {
            setWordSheet(null);
            save(mapUnit(months, monthId, unitId, (u) => ({ ...u, words: (u.words || []).filter((w) => w.id !== word.id) })));
            showToast(`"${word.word}" o'chirildi`);
          }}
        />
        <ImportSheet
          open={importOpen}
          onClose={() => setImportOpen(false)}
          onImport={(parsed) => {
            let result;
            save(mapUnit(months, monthId, unitId, (u) => {
              result = mergeWords(u.words, parsed);
              return { ...u, words: result.words };
            }));
            setImportOpen(false);
            showToast(result.updated
              ? `${result.added} ta yangi so'z, ${result.updated} tasi yangilandi`
              : `${result.added} ta so'z qo'shildi`);
          }}
        />
        {common}
      </>
    );
  }

  // ── Course: its topics ──
  const totals = courseTotals(months);
  const multiMonth = months.filter((m) => (m.units || []).length).length > 1;
  let n = 0;
  const topicRow = (m, u) => {
    n += 1;
    return (
      <Row
        key={u.id}
        icon={<span className="sa-num">{n}</span>}
        iconTone="blue"
        title={u.title}
        detail={`${(u.words || []).length} so'z`}
        onClick={() => go({ monthId: m.id, unitId: u.id })}
      />
    );
  };
  const addTopic = () => setNameSheet({ title: '' });

  return (
    <Page
      back={{ label: 'Kurslar', onClick: onBack }}
      title={course.title || 'Kurs'}
      subtitle={`${totals.units} ta mavzu · ${totals.words} ta so'z${course.description ? ` · ${course.description}` : ''}`}
      action={
        <button type="button" className="sa-icon-btn" onClick={addTopic} aria-label="Yangi mavzu">
          <Plus size={20} strokeWidth={2.6} />
        </button>
      }
    >
      {totals.units === 0 ? (
        <div className="sa-group">
          <EmptyState
            icon={<BookOpen size={40} />}
            title="Hali mavzu yo'q"
            text="Mavzu — bitta darsning so'zlari. O'qituvchi vazifani mavzu bo'yicha beradi."
            action={<Button onClick={addTopic}>Mavzu qo'shish</Button>}
          />
        </div>
      ) : multiMonth ? (
        months.filter((m) => (m.units || []).length).map((m) => (
          <Section key={m.id} title={m.title}>
            {m.units.map((u) => topicRow(m, u))}
          </Section>
        ))
      ) : (
        <Section title="Mavzular">
          {months.flatMap((m) => (m.units || []).map((u) => topicRow(m, u)))}
        </Section>
      )}
      {common}
    </Page>
  );
}

function UnitWords({ course, unit, isDesktop, onBack, onManage, onAdd, onImport, onEdit, onDeleteMany }) {
  const [search, setSearch] = useState('');
  const [pos, setPos] = useState('all');
  const [selected, setSelected] = useState(() => new Set());
  const words = useMemo(() => unit.words || [], [unit.words]);

  useEffect(() => { setSelected(new Set()); }, [unit.id, words.length]);

  const q = search.trim().toLowerCase();
  const visible = useMemo(() => words.filter((w) => (
    (pos === 'all' || (w.partOfSpeech || 'noun') === pos)
    && (!q || [w.word, w.translation, w.definition, w.example].some((v) => (v || '').toLowerCase().includes(q)))
  )), [words, pos, q]);

  const toggle = (id) => setSelected((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  const allOn = visible.length > 0 && visible.every((w) => selected.has(w.id));
  const toggleAll = () => setSelected(allOn ? new Set() : new Set(visible.map((w) => w.id)));

  return (
    <Page
      back={{ label: course.title || 'Kurs', onClick: onBack }}
      title={unit.title}
      subtitle={`${course.title} · ${words.length} ta so'z`}
      action={<button type="button" className="sa-icon-btn is-gray" onClick={onManage} aria-label="Mavzu sozlamalari"><Settings size={18} /></button>}
    >
      <div className="sa-page-actions">
        <Button onClick={onAdd}><Plus size={18} strokeWidth={2.6} /> So'z qo'shish</Button>
        <Button variant="tinted" onClick={onImport}><Upload size={17} /> Matndan import</Button>
      </div>

      {words.length === 0 ? (
        <div className="sa-group">
          <EmptyState
            icon={<FileText size={40} />}
            title="Hali so'z yo'q"
            text="Bittalab qo'shing yoki ro'yxatni matn qilib bir yo'la import qiling."
          />
        </div>
      ) : (
        <>
          <div className="sa-toolbar is-inline">
            <SearchField value={search} onChange={setSearch} placeholder="So'z, tarjima yoki misol" />
            <select className="sa-select sa-select-compact" value={pos} onChange={(e) => setPos(e.target.value)} aria-label="So'z turkumi">
              <option value="all">Barcha turkumlar</option>
              {POS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {visible.length === 0 ? (
            <div className="sa-group"><EmptyState title="Topilmadi" text="Qidiruv yoki filtrni o'zgartiring." /></div>
          ) : isDesktop ? (
            <div className="sa-table" style={{ '--sa-cols': '28px minmax(160px, 1fr) minmax(160px, 1fr) 90px minmax(200px, 1.6fr)' }}>
              <div className="sa-table-head">
                <button type="button" className={`sa-check is-select is-small ${allOn ? 'is-on' : ''}`} onClick={toggleAll} aria-label="Hammasini tanlash">
                  {allOn && <Check size={12} strokeWidth={3} />}
                </button>
                <span>So'z</span>
                <span>Tarjima</span>
                <span>Turkum</span>
                <span>Ta'rif / misol</span>
              </div>
              {visible.map((w) => (
                <div
                  key={w.id}
                  role="button"
                  tabIndex={0}
                  className={`sa-table-row ${selected.has(w.id) ? 'is-selected' : ''}`}
                  onClick={() => onEdit(w)}
                  onKeyDown={(e) => { if (e.key === 'Enter') onEdit(w); }}
                >
                  <button
                    type="button"
                    className={`sa-check is-select is-small ${selected.has(w.id) ? 'is-on' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggle(w.id); }}
                    aria-label={`${w.word} ni tanlash`}
                  >
                    {selected.has(w.id) && <Check size={12} strokeWidth={3} />}
                  </button>
                  <span className="sa-cell-title">{w.word}</span>
                  <span>{w.translation}</span>
                  <span><span className="sa-chip">{POS_LABEL[w.partOfSpeech || 'noun'] || w.partOfSpeech}</span></span>
                  <span className="muted sa-cell-clip">{[w.definition, w.example].filter(Boolean).join(' · ') || '—'}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="sa-group">
              {visible.map((w) => (
                <Row
                  key={w.id}
                  title={w.word}
                  subtitle={[w.translation, POS_LABEL[w.partOfSpeech || 'noun']].filter(Boolean).join(' · ')}
                  onClick={() => onEdit(w)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {selected.size > 0 && (
        <div className="sa-bottom-bar">
          <span className="sa-bottom-bar-text">{selected.size} ta so'z tanlandi</span>
          <div className="sa-head-actions">
            <Button variant="plain" onClick={() => setSelected(new Set())}>Bekor qilish</Button>
            <Button tone="red" onClick={() => onDeleteMany([...selected])}><Trash2 size={16} /> O'chirish</Button>
          </div>
        </div>
      )}
    </Page>
  );
}

function NameSheet({ state, onClose, onSave }) {
  const [title, setTitle] = useState('');
  useEffect(() => { if (state) setTitle(state.title || ''); }, [state]);
  return (
    <Sheet open={Boolean(state)} onClose={onClose} title={state?.id ? 'Mavzu nomi' : 'Yangi mavzu'}>
      <form onSubmit={(e) => { e.preventDefault(); if (title.trim()) onSave(title.trim()); }}>
        <Field label="Nomi">
          <input className="sa-input" required autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Family" />
        </Field>
        <Button type="submit" block disabled={!title.trim()}>{state?.id ? 'Saqlash' : "Qo'shish"}</Button>
      </form>
    </Sheet>
  );
}

const EMPTY_WORD = { word: '', translation: '', partOfSpeech: 'noun', definition: '', example: '' };

function WordSheet({ state, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(EMPTY_WORD);
  const editing = state?.word || null;
  useEffect(() => {
    if (state) setForm(editing ? { ...EMPTY_WORD, ...editing } : EMPTY_WORD);
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const valid = form.word.trim() && form.translation.trim();

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    onSave({
      word: form.word.trim(),
      translation: form.translation.trim(),
      partOfSpeech: form.partOfSpeech || 'noun',
      definition: form.definition.trim(),
      example: form.example.trim(),
    });
  };

  return (
    <Sheet open={Boolean(state)} onClose={onClose} title={editing ? "So'zni tahrirlash" : "Yangi so'z"}>
      <form onSubmit={submit}>
        <Field label="So'z">
          <input className="sa-input" required autoFocus value={form.word} onChange={set('word')} placeholder="apple" />
        </Field>
        <Field label="Tarjima">
          <input className="sa-input" required value={form.translation} onChange={set('translation')} placeholder="olma" />
        </Field>
        <Field label="Turkum">
          <select className="sa-select" value={form.partOfSpeech} onChange={set('partOfSpeech')}>
            {POS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
        <Field label="Ta'rif (ixtiyoriy)">
          <input className="sa-input" value={form.definition} onChange={set('definition')} placeholder="Qizil yoki yashil meva" />
        </Field>
        <Field label="Misol (ixtiyoriy)">
          <input className="sa-input" value={form.example} onChange={set('example')} placeholder="I eat an apple every day." />
        </Field>
        <Button type="submit" block disabled={!valid}>{editing ? 'Saqlash' : "Qo'shish"}</Button>
        {editing && (
          <Button variant="plain" tone="red" block onClick={() => onDelete(editing)}>
            <Trash2 size={16} /> So'zni o'chirish
          </Button>
        )}
      </form>
    </Sheet>
  );
}

function ImportSheet({ open, onClose, onImport }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  useEffect(() => { if (open) { setText(''); setError(''); } }, [open]);
  const preview = useMemo(() => parseWordList(text), [text]);

  const submit = () => {
    if (!preview.length) {
      setError("Format tanilmadi. Har bir so'zni yangi qatorga yozing: so'z, tarjima");
      return;
    }
    onImport(preview);
  };

  return (
    <Sheet open={open} onClose={onClose} title="Matndan import">
      <p className="sa-flow-lead">
        Har qatorga bitta so'z: <code>so'z, tarjima</code>. Kerak bo'lsa davomiga turkum, ta'rif va misol:
        <br /><code>apple, olma, noun, Qizil meva, I ate an apple</code>
        <br />Mavzuda bor so'z qayta qo'shilmaydi — yangilanadi.
      </p>
      <Field label="So'zlar">
        <textarea className="sa-textarea" rows={9} value={text} onChange={(e) => setText(e.target.value)} placeholder={'apple, olma\nbook, kitob\nrun, yugurmoq, verb'} />
      </Field>
      {error && <p className="sa-flow-error">{error}</p>}
      <Button block onClick={submit} disabled={!text.trim()}>
        {preview.length ? `${preview.length} ta so'zni qo'shish` : 'Import'}
      </Button>
    </Sheet>
  );
}
