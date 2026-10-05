import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Check, ChevronRight, Copy, Download, FileSpreadsheet, FileText, Pencil, Plus, Settings, Sparkles, Trash2, Upload, Volume2, X } from 'lucide-react';
import { updateCustomPack } from '../../../services/corpService';
import { speakWord } from '../../../utils/helpers';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Button, EmptyState, Field, Page, Row, SearchField, Section, Sheet, useTabletUp } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useToast } from '../super-admin/useToast';
import {
  POS_LABEL, POS_LABEL_EN, POS_OPTIONS, POS_OPTIONS_EN, courseTotals, courseUpdates, mapMonth, mapUnit, mergeWords, monthsOf, newId,
} from './courseEditing';
import { importable, markDuplicates, parseWordText, readWordFile, toWord } from './wordImport';
import { downloadTemplate } from './templateFiles';

// A course's content: its topics, and each topic's words (own page).
// Storage still nests topics under months (students' progress keys and
// homework items point at monthId+unitId), but there is no month level in
// the editor: new topics go into the course's last month (created as
// "1-oy" when missing); older multi-month courses just show a heading per
// month. Position lives in the URL (?courseId=&monthId=&unitId=) so
// refresh and the browser back button work. Every change saves the whole
// tree at once (courseUpdates) — packs are small.
//
// Shared by the center admin (AdminCourses, English — passes `en`) and the
// teacher panel (TeacherPacks, `readOnly`, Uzbek — the default). Like
// groupView.jsx, every literal string branches on `en` instead of forking
// the file, so there's one source of truth for the structure.
//
// Both panels get the Faculty card shell (DESIGN.md pattern 1) for the
// topic list and the word list, plus inline quick-add rows so a course can
// be filled without a modal per topic/word. `onSettings` puts a settings
// button in the header — the list page (AdminCourses / TeacherPacks) owns
// rename / duplicate / delete.
export default function CourseEditor({ centerId, course, onBack, onUpdate, onSettings, readOnly = false, backLabel, en = false }) {
  const isDesktop = useIsDesktop();
  const [toastNode, showToast] = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const monthId = searchParams.get('monthId');
  const unitId = searchParams.get('unitId');
  const resolvedBackLabel = backLabel || (en ? 'Courses' : 'Kurslar');

  const [months, setMonths] = useState(() => monthsOf(course, en));
  useEffect(() => { setMonths(monthsOf(course, en)); }, [course.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const [nameSheet, setNameSheet] = useState(null); // { id?, monthId?, title } — a topic
  const [manageOpen, setManageOpen] = useState(false);
  const [wordSheet, setWordSheet] = useState(null); // { word? }
  const [importOpen, setImportOpen] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const quickTopicRef = useRef(null);

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
      showToast(`${en ? "Couldn't save" : 'Saqlanmadi'}: ${err.message}`, 'error');
    }
  };

  const saveName = (title) => {
    const { id } = nameSheet;
    if (id) save(mapUnit(months, nameSheet.monthId, id, (u) => ({ ...u, title })));
    else addTopicNamed(title);
    setNameSheet(null);
  };

  const addTopicNamed = (title) => {
    const unit = { id: newId('unit'), title, words: [] };
    const last = months[months.length - 1];
    save(last
      ? mapMonth(months, last.id, (m) => ({ ...m, units: [...(m.units || []), unit] }))
      : [{ id: 'm1', title: en ? 'Month 1' : '1-oy', units: [unit] }]);
  };

  const askDeleteUnit = () => {
    setManageOpen(false);
    askDeleteTopic(month, unit);
  };

  // Same as askDeleteUnit, but takes the month/unit explicitly instead of
  // reading them off the URL — lets the topic list delete a topic directly,
  // without first navigating into it (see topicRow below).
  const askDeleteTopic = (m, u) => {
    setConfirm({
      title: en ? `Delete "${u.title}"?` : `"${u.title}" o'chirilsinmi?`,
      message: en
        ? `Its ${(u.words || []).length} words will be deleted too. This topic will no longer open in any homework it was assigned to.`
        : `Undagi ${(u.words || []).length} ta so'z ham o'chadi. Bu mavzu berilgan vazifalarda ochilmay qoladi.`,
      confirmLabel: en ? 'Delete' : "O'chirish",
      run: async () => {
        if (unitId === u.id) go({});
        await save(mapMonth(months, m.id, (mm) => ({ ...mm, units: (mm.units || []).filter((uu) => uu.id !== u.id) })));
      },
    });
  };

  const common = (
    <>
      <NameSheet state={nameSheet} onClose={() => setNameSheet(null)} onSave={saveName} en={en} />
      <ConfirmSheet
        open={Boolean(confirm)}
        title={confirm?.title}
        message={confirm?.message}
        confirmLabel={confirm?.confirmLabel}
        cancelLabel={en ? 'Cancel' : undefined}
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
          readOnly={readOnly}
          en={en}
          onBack={() => go({})}
          onManage={() => setManageOpen(true)}
          onAdd={() => setWordSheet({})}
          onImport={() => setImportOpen(true)}
          onEdit={(word) => setWordSheet({ word })}
          onQuickAdd={(word, translation) => {
            let result;
            save(mapUnit(months, monthId, unitId, (u) => {
              result = mergeWords(u.words, [{ id: newId('w'), word, translation, partOfSpeech: 'noun', definition: '', example: '' }]);
              return { ...u, words: result.words };
            }));
            showToast(en
              ? (result.updated ? `"${word}" already existed — translation updated` : `"${word}" added`)
              : (result.updated ? `"${word}" avval bor edi — tarjimasi yangilandi` : `"${word}" qo'shildi`));
          }}
          onDeleteMany={(ids) => setConfirm({
            title: en ? `Delete ${ids.length} words?` : `${ids.length} ta so'z o'chirilsinmi?`,
            message: en ? "This can't be undone." : "Qaytarib bo'lmaydi.",
            confirmLabel: en ? 'Delete' : "O'chirish",
            run: () => save(mapUnit(months, monthId, unitId, (u) => ({ ...u, words: (u.words || []).filter((w) => !ids.includes(w.id)) }))),
          })}
        />
        <Sheet open={manageOpen} onClose={() => setManageOpen(false)} title={unit.title} en={en}>
          <Section>
            <Row icon={<Pencil size={16} />} iconTone="gray" title={en ? 'Rename' : "Nomini o'zgartirish"} onClick={() => { setManageOpen(false); setNameSheet({ id: unit.id, monthId, title: unit.title }); }} />
          </Section>
          <Section>
            <Row icon={<Trash2 size={16} />} iconTone="red" title={en ? 'Delete Topic' : 'Mavzuni o\'chirish'} destructive chevron={false} onClick={askDeleteUnit} />
          </Section>
        </Sheet>
        <WordSheet
          state={wordSheet}
          en={en}
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
            setConfirm({
              title: en ? `Delete "${word.word}"?` : `"${word.word}" o'chirilsinmi?`,
              message: en ? "This can't be undone." : "Qaytarib bo'lmaydi.",
              confirmLabel: en ? 'Delete' : "O'chirish",
              run: async () => {
                await save(mapUnit(months, monthId, unitId, (u) => ({ ...u, words: (u.words || []).filter((w) => w.id !== word.id) })));
                showToast(en ? `"${word.word}" deleted` : `"${word.word}" o'chirildi`);
              },
            });
          }}
        />
        <ImportSheet
          open={importOpen}
          en={en}
          onClose={() => setImportOpen(false)}
          existingWords={unit.words}
          topic={unit.title}
          level={course.level}
          onImport={({ rows }) => {
            let result;
            save(mapUnit(months, monthId, unitId, (u) => {
              result = mergeWords(u.words, rows.map(toWord));
              return { ...u, words: result.words };
            }));
            setImportOpen(false);
            showToast(en
              ? (result.updated ? `${result.added} new words, ${result.updated} updated` : `${result.added} words added`)
              : (result.updated ? `${result.added} ta yangi so'z, ${result.updated} tasi yangilandi` : `${result.added} ta so'z qo'shildi`));
          }}
        />
        {common}
      </>
    );
  }

  // ── Course: its topics ──
  const totals = courseTotals(months);
  const multiMonth = months.filter((m) => (m.units || []).length).length > 1;
    const entries = months.flatMap((m) => (m.units || []).map((u) => ({ m, u })));
    const focusQuickAdd = () => {
      quickTopicRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      quickTopicRef.current?.focus({ preventScroll: true });
    };
    return (
      <Page
        back={{ label: resolvedBackLabel, onClick: onBack }}
        title={course.title || (en ? 'Course' : "To'plam")}
        subtitle={`${en ? `${totals.units} ${totals.units === 1 ? 'topic' : 'topics'} · ${totals.words} words` : `${totals.units} ta mavzu · ${totals.words} ta so'z`}${course.description ? ` · ${course.description}` : ''}`}
        action={readOnly ? null : (
          <>
            {onSettings && (
              <button type="button" className="faculty-icon-btn" onClick={onSettings} aria-label={en ? 'Course settings' : "To'plam sozlamalari"} title={en ? 'Course settings' : "To'plam sozlamalari"}>
                <Settings size={16} />
              </button>
            )}
            <button type="button" className="faculty-btn-invite" onClick={focusQuickAdd}>
              <Plus size={14} /> <span className="ca-btn-label">{en ? 'New Topic' : 'Yangi mavzu'}</span>
            </button>
          </>
        )}
      >
        <section className="ca-card is-faculty-card ca-course-card">
          {entries.length === 0 ? (
            <div className="ca-course-empty">
              <EmptyState
                icon={<BookOpen size={40} />}
                title={en ? 'No topics yet' : "Hali mavzu yo'q"}
                text={readOnly
                  ? (en ? 'No topics have been added to this course yet.' : "Bu to'plamga hali mavzu qo'shilmagan.")
                  : (en
                    ? "A topic is one lesson's words — teachers assign homework by topic. Type the first one below."
                    : "Mavzu — bitta darsning so'zlari, vazifa mavzu bo'yicha beriladi. Birinchisini pastda yozing.")}
              />
            </div>
          ) : (
            <div className="faculty-table ca-topics-table">
              <div className="faculty-table-head">
                <span>#</span>
                <span>{en ? 'Topic' : 'Mavzu'}</span>
                <span className="ca-col-words">{en ? 'Words' : "So'zlar"}</span>
                <span />
              </div>
              {entries.map(({ m, u }, i) => {
                const count = (u.words || []).length;
                const openTopic = () => go({ monthId: m.id, unitId: u.id });
                return (
                  <Fragment key={u.id}>
                    {multiMonth && (i === 0 || entries[i - 1].m.id !== m.id) && (
                      <div className="ca-topics-month">{m.title}</div>
                    )}
                    <div
                      className="faculty-table-row"
                      role="button"
                      tabIndex={0}
                      onClick={openTopic}
                      onKeyDown={(e) => { if (e.key === 'Enter') openTopic(); }}
                    >
                      <span className="ca-topic-num">{i + 1}</span>
                      <div className="faculty-cell-name">
                        <span className="faculty-name-link">{u.title}</span>
                        <span className="faculty-email-sub ca-topic-sub">{count ? (en ? `${count} ${count === 1 ? 'word' : 'words'}` : `${count} ta so'z`) : (en ? 'No words yet' : "Hali so'z yo'q")}</span>
                      </div>
                      <span className="ca-col-words">
                        {count || <span className="ca-tag is-warn">{en ? 'Empty' : "Bo'sh"}</span>}
                      </span>
                      <span className="ca-row-actions" onClick={(e) => e.stopPropagation()}>
                        {!readOnly && (
                          <>
                            <button type="button" className="ca-row-action" onClick={() => setNameSheet({ id: u.id, monthId: m.id, title: u.title })} aria-label={en ? `Rename ${u.title}` : `${u.title} nomini o'zgartirish`} title={en ? 'Rename' : "Nomini o'zgartirish"}>
                              <Pencil size={14} />
                            </button>
                            <button type="button" className="ca-row-action is-danger" onClick={() => askDeleteTopic(m, u)} aria-label={en ? `Delete ${u.title}` : `${u.title} ni o'chirish`} title={en ? 'Delete' : "O'chirish"}>
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                        <ChevronRight size={16} className="ca-row-chevron" aria-hidden="true" />
                      </span>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          )}
          {!readOnly && (
            <QuickAddRow
              inputRef={quickTopicRef}
              fields={[{
                key: 'title',
                label: en ? 'Topic name' : 'Mavzu nomi',
                placeholder: entries.length
                  ? (en ? 'New topic name' : 'Yangi mavzu nomi')
                  : (en ? 'First topic, e.g. Family' : 'Birinchi mavzu, masalan: Oila'),
                required: true,
              }]}
              submitLabel={en ? 'Add Topic' : "Qo'shish"}
              onAdd={([title]) => addTopicNamed(title)}
            />
          )}
        </section>
        {common}
      </Page>
    );
}

// `readOnly` (a teacher looking at a center pack): no add / import / edit /
// select — just the words, with pronunciation.
function UnitWords({ course, unit, isDesktop, readOnly, en, onBack, onManage, onAdd, onImport, onEdit, onQuickAdd, onDeleteMany }) {
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
  const posLabel = (w) => (en ? POS_LABEL_EN : POS_LABEL)[w.partOfSpeech || 'noun'] || w.partOfSpeech;

    return (
      <Page
        back={{ label: course.title || (en ? 'Course' : "To'plam"), onClick: onBack }}
        title={unit.title}
        subtitle={`${course.title} · ${en ? `${words.length} ${words.length === 1 ? 'word' : 'words'}` : `${words.length} ta so'z`}`}
        action={readOnly ? null : (
          <>
            <button type="button" className="faculty-icon-btn" onClick={onManage} aria-label={en ? 'Topic settings' : 'Mavzu sozlamalari'} title={en ? 'Topic settings' : 'Mavzu sozlamalari'}>
              <Settings size={16} />
            </button>
            <button type="button" className="faculty-btn-secondary" onClick={onImport}>
              <Upload size={14} /> <span className="ca-btn-label">Import</span>
            </button>
            <button type="button" className="faculty-btn-invite" onClick={onAdd}>
              <Plus size={14} /> <span className="ca-btn-label">{en ? 'Add Word' : "So'z qo'shish"}</span>
            </button>
          </>
        )}
      >
        <section className="ca-card is-faculty-card ca-course-card">
          {words.length > 0 && (
            <div className="faculty-toolbar faculty-toolbar-wrap">
              <div className="faculty-toolbar-left faculty-toolbar-filters">
                {selected.size > 0 ? (
                  <>
                    <span className="ca-selected-count">{en ? `${selected.size} selected` : `${selected.size} ta tanlandi`}</span>
                    <button type="button" className="faculty-btn-secondary" onClick={() => setSelected(new Set())}>{en ? 'Clear' : 'Bekor qilish'}</button>
                    <button type="button" className="faculty-btn-delete" onClick={() => onDeleteMany([...selected])}>
                      <Trash2 size={14} /> {en ? 'Delete' : "O'chirish"}
                    </button>
                  </>
                ) : (
                  <>
                    <SearchField value={search} onChange={setSearch} placeholder={en ? 'Word, translation or example' : "So'z, tarjima yoki misol"} />
                    <select className="sa-select sa-select-compact" value={pos} onChange={(e) => setPos(e.target.value)} aria-label={en ? 'Part of speech' : "So'z turkumi"}>
                      <option value="all">{en ? 'All parts of speech' : 'Barcha turkumlar'}</option>
                      {(en ? POS_OPTIONS_EN : POS_OPTIONS).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </>
                )}
              </div>
            </div>
          )}

          {!readOnly && (
            <QuickAddRow
              fields={[
                { key: 'word', label: en ? 'Word' : "So'z", placeholder: en ? 'Word' : "So'z", required: true },
                { key: 'translation', label: en ? 'Translation' : 'Tarjima', placeholder: en ? 'Translation — Enter to add' : "Tarjima — Enter bilan qo'shing", required: true },
              ]}
              submitLabel={en ? 'Add' : "Qo'shish"}
              onAdd={([word, translation]) => onQuickAdd(word, translation)}
            />
          )}

          {words.length === 0 ? (
            <div className="ca-course-empty">
              <EmptyState
                icon={<FileText size={40} />}
                title={en ? 'No words yet' : "Hali so'z yo'q"}
                text={readOnly
                  ? (en ? 'There are no words in this topic yet.' : "Bu mavzuda hali so'z yo'q.")
                  : (en
                    ? 'Type a word and its translation above, or import a whole list from text, Excel or a .txt file.'
                    : "So'z va tarjimasini yuqorida yozing yoki butun ro'yxatni matn, Excel yoki .txt fayldan import qiling.")}
                action={readOnly ? undefined : <Button variant="tinted" onClick={onImport}><Upload size={16} /> {en ? 'Import a list' : "Ro'yxatni import qilish"}</Button>}
              />
            </div>
          ) : visible.length === 0 ? (
            <div className="ca-course-empty"><EmptyState title={en ? 'Nothing found' : 'Topilmadi'} text={en ? 'Try a different search or filter.' : "Qidiruv yoki filtrni o'zgartiring."} /></div>
          ) : isDesktop ? (
            <div className="faculty-table ca-words-table">
              <div className="faculty-table-head">
                {readOnly ? <span /> : (
                  <button type="button" className={`sa-check is-select is-small ${allOn ? 'is-on' : ''}`} onClick={toggleAll} aria-label={en ? 'Select all' : 'Hammasini tanlash'}>
                    {allOn && <Check size={12} strokeWidth={3} />}
                  </button>
                )}
                <span>{en ? 'Word' : "So'z"}</span>
                <span>{en ? 'Translation' : 'Tarjima'}</span>
                <span>{en ? 'Part of speech' : 'Turkum'}</span>
                <span>{en ? 'Definition / example' : "Ta'rif / misol"}</span>
              </div>
              {visible.map((w) => (
                <div
                  key={w.id}
                  role={readOnly ? undefined : 'button'}
                  tabIndex={readOnly ? undefined : 0}
                  className={`faculty-table-row ${selected.has(w.id) ? 'is-selected' : ''}`}
                  onClick={readOnly ? undefined : () => onEdit(w)}
                  onKeyDown={readOnly ? undefined : (e) => { if (e.key === 'Enter') onEdit(w); }}
                >
                  {readOnly ? <span /> : (
                    <button
                      type="button"
                      className={`sa-check is-select is-small ${selected.has(w.id) ? 'is-on' : ''}`}
                      onClick={(e) => { e.stopPropagation(); toggle(w.id); }}
                      aria-label={en ? `Select ${w.word}` : `${w.word} ni tanlash`}
                    >
                      {selected.has(w.id) && <Check size={12} strokeWidth={3} />}
                    </button>
                  )}
                  <span className="ca-word-cell faculty-name-link">
                    {w.word}
                    <SpeakButton word={w.word} lang={course.language} en={en} />
                  </span>
                  <span>{w.translation}</span>
                  <span><span className="ca-tag">{posLabel(w)}</span></span>
                  <span className="ca-words-detail">{wordDetails(w) || '—'}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="ca-words-list">
              {visible.map((w) => (
                <Row
                  key={w.id}
                  title={w.word}
                  subtitle={[w.translation, verbForms(w) || posLabel(w)].filter(Boolean).join(' · ')}
                  onClick={readOnly ? undefined : () => onEdit(w)}
                  accessory={readOnly ? <SpeakButton word={w.word} lang={course.language} en={en} /> : undefined}
                />
              ))}
            </div>
          )}
        </section>
      </Page>
    );
}

function NameSheet({ state, onClose, onSave, en }) {
  const [title, setTitle] = useState('');
  useEffect(() => { if (state) setTitle(state.title || ''); }, [state]);
  return (
    <Sheet open={Boolean(state)} onClose={onClose} title={state?.id ? (en ? 'Topic Name' : 'Mavzu nomi') : (en ? 'New Topic' : 'Yangi mavzu')} en={en}>
      <form onSubmit={(e) => { e.preventDefault(); if (title.trim()) onSave(title.trim()); }}>
        <Field label={en ? 'Name' : 'Nomi'}>
          <input className="sa-input" required autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Family" />
        </Field>
        <Button type="submit" block disabled={!title.trim()}>{state?.id ? (en ? 'Save' : 'Saqlash') : (en ? 'Add' : "Qo'shish")}</Button>
      </form>
    </Sheet>
  );
}

const EMPTY_WORD = { word: '', translation: '', partOfSpeech: 'noun', definition: '', example: '' };

function WordSheet({ state, onClose, onSave, onDelete, en }) {
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
    <Sheet open={Boolean(state)} onClose={onClose} title={editing ? (en ? 'Edit Word' : "So'zni tahrirlash") : (en ? 'New Word' : "Yangi so'z")} en={en}>
      <form onSubmit={submit}>
        <Field label={en ? 'Word' : "So'z"}>
          <input className="sa-input" required autoFocus value={form.word} onChange={set('word')} placeholder="apple" />
        </Field>
        <Field label={en ? 'Translation' : 'Tarjima'}>
          <input className="sa-input" required value={form.translation} onChange={set('translation')} placeholder={en ? 'apple' : 'olma'} />
        </Field>
        <Field label={en ? 'Part of Speech' : 'Turkum'}>
          <select className="sa-select" value={form.partOfSpeech} onChange={set('partOfSpeech')}>
            {(en ? POS_OPTIONS_EN : POS_OPTIONS).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
        <Field label={en ? 'Definition (optional)' : "Ta'rif (ixtiyoriy)"}>
          <input className="sa-input" value={form.definition} onChange={set('definition')} placeholder={en ? 'A red or green fruit' : "Qizil yoki yashil meva"} />
        </Field>
        <Field label={en ? 'Example (optional)' : 'Misol (ixtiyoriy)'}>
          <input className="sa-input" value={form.example} onChange={set('example')} placeholder="I eat an apple every day." />
        </Field>
        <Button type="submit" block disabled={!valid}>{editing ? (en ? 'Save' : 'Saqlash') : (en ? 'Add' : "Qo'shish")}</Button>
        {editing && (
          <Button variant="plain" tone="red" block onClick={() => onDelete(editing)}>
            <Trash2 size={16} /> {en ? 'Delete Word' : "So'zni o'chirish"}
          </Button>
        )}
      </form>
    </Sheet>
  );
}

const PREVIEW_LIMIT = 200;

// A request to paste into ChatGPT & co. that asks for exactly our format —
// left alone, they number the list, bold the words and add a greeting.
function aiPrompt(topic, level, en) {
  if (en) {
    const about = topic ? `on the topic "${topic}"` : 'on everyday topics';
    const who = level ? `for ${level}-level students` : 'for students';
    return [
      `Give me 20 English words ${about} ${who}.`,
      '',
      'The reply must be ONLY the list. No numbering, headings, tables, bold text, bullets, intro or closing sentence.',
      'One word per line. Separate the fields on each line with " | ", in exactly this order:',
      'word | short definition | part of speech | translation (leave blank) | example sentence',
      '',
      'Part of speech must be one of: noun, verb, adjective, adverb, phrase, preposition.',
      '',
      'Example:',
      'run | to move fast on foot | verb | | I run every morning, even in winter.',
      'apple | a red or green fruit | noun | | I eat an apple every day.',
    ].join('\n');
  }
  const about = topic ? `"${topic}" mavzusi bo'yicha` : 'kundalik mavzular bo\'yicha';
  const who = level ? `${level} darajadagi o'quvchilar uchun` : "o'quvchilar uchun";
  return [
    `${about} ${who} 20 ta inglizcha so'z tuzib ber.`,
    '',
    "Javobda FAQAT ro'yxat bo'lsin. Raqam, sarlavha, jadval, qalin yozuv, belgi, kirish yoki xulosa gap qo'shma.",
    "Har bir so'z alohida qatorda. Qator ichidagi qismlar orasiga \" | \" belgisini qo'y, aynan shu tartibda:",
    "so'z | o'zbekcha tarjima | turkum | qisqa ta'rif (o'zbekcha) | misol gap (inglizcha)",
    '',
    'Turkum faqat shulardan biri: noun, verb, adjective, adverb, phrase, preposition.',
    '',
    'Namuna:',
    'run | yugurmoq | verb | tez harakatlanmoq | I run every morning, even in winter.',
    'apple | olma | noun | qizil yoki yashil meva | I eat an apple every day.',
  ].join('\n');
}

// Copies text keeping its line breaks — as CRLF, so they survive a paste
// into Windows apps (Notepad, Word, Excel) as well as browsers/messengers.
async function copyLines(text) {
  const value = text.split('\n').join('\r\n');
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    // Older browsers / non-secure origins: copy through a hidden textarea.
    const el = document.createElement('textarea');
    el.value = value;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    el.remove();
  }
}
const TEXT_EXAMPLE = [
  'apple - olma',
  'book - kitob',
  'ice-cream - muzqaymoq',
  'run - yugurmoq - verb - tez harakatlanmoq - I run every morning.',
].join('\n');
const TEXT_EXAMPLE_EN = [
  'apple - a red or green fruit',
  'book - a set of printed pages',
  'ice-cream - a frozen sweet dessert',
  'run - to move fast on foot - verb - to go faster than walking - I run every morning.',
].join('\n');

// Pasted text or an Excel/.txt file → one preview → import into the open
// topic. Words already in the topic are updated, not duplicated.
function ImportSheet({ open, onClose, existingWords, onImport, topic, level, en }) {
  // The wide side-by-side preview table shows whenever Sheet actually
  // renders the aside — tablet-up screens only, drawer or centered
  // placement alike (see Sheet's own check in ui.jsx). Checking
  // `isDesktop` alone (as this used to) doesn't track that reliably and
  // previously left the import preview hidden entirely on desktop.
  const canShowAside = useTabletUp();
  const [source, setSource] = useState('text');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null); // { name, rows }
  const [fileError, setFileError] = useState('');
  const [reading, setReading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(null); // 'example' | 'prompt'
  const textExample = en ? TEXT_EXAMPLE_EN : TEXT_EXAMPLE;

  const copy = async (what, value) => {
    await copyLines(value);
    setCopied(what);
    setTimeout(() => setCopied((c) => (c === what ? null : c)), 1500);
  };
  const inputRef = useRef(null);
  // Rows dropped from a file with ×; a pasted text drops the line itself.
  const [removed, setRemoved] = useState(() => new Set());

  useEffect(() => {
    if (!open) return;
    setText(''); setFile(null); setFileError(''); setReading(false); setRemoved(new Set());
  }, [open]);

  const textRows = useMemo(() => parseWordText(text, en), [text, en]);
  const rows = useMemo(() => {
    if (source !== 'file') return textRows;
    return markDuplicates((file?.rows || []).filter((r) => !removed.has(rowKey(r))));
  }, [source, textRows, file, removed]);

  const removeRows = (list) => {
    if (source !== 'file') {
      const drop = new Set(list.map((r) => r.line));
      setText(text.split(/\r\n|\r|\n/).filter((_, i) => !drop.has(i + 1)).join('\n'));
    } else {
      setRemoved((prev) => {
        const next = new Set(prev);
        list.forEach((r) => next.add(rowKey(r)));
        return next;
      });
    }
  };
  const removeRow = (r) => removeRows([r]);
  const removeErrors = () => removeRows(rows.filter((r) => r.error));
  const ok = importable(rows);
  const errors = rows.filter((r) => r.error).length;
  const known = useMemo(() => new Set((existingWords || []).map((w) => (w.word || '').toLowerCase())), [existingWords]);
  const updates = ok.filter((r) => known.has(r.word.toLowerCase())).length;

  const pickFile = async (f) => {
    if (!f) return;
    setReading(true);
    setFileError('');
    try {
      const res = await readWordFile(f, en);
      setFile({ name: f.name, rows: res.rows });
      setRemoved(new Set());
      if (!res.rows.length) setFileError(en ? 'No words found in the file.' : "Faylda so'z topilmadi.");
    } catch (err) {
      setFile(null);
      setFileError(err.message);
    } finally {
      setReading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  // Shown even before any words exist (as an empty state), so the modal
  // doesn't jump sideways the moment the first word is typed.
  const sideView = canShowAside;
  const lineCount = text.split(/\r\n|\r|\n/).filter((l) => l.trim()).length;

  const SOURCES = [
    { value: 'text', icon: FileText, title: en ? 'Paste text' : 'Matn', sub: en ? 'One word per line' : "Ro'yxatni qo'ying" },
    { value: 'file', icon: FileSpreadsheet, title: en ? 'File' : 'Fayl', sub: en ? 'Excel or .txt' : 'Excel yoki .txt' },
    { value: 'ai', icon: Sparkles, title: 'AI', sub: en ? 'ChatGPT & co.' : "ChatGPT'dan olish" },
  ];

  const textArea = (placeholder) => (
    <div className="ca-imp-text">
      <div className="ca-imp-text-head">
        <span>{en ? 'One word per line' : "Har qatorga bitta so'z"}</span>
        <span className="ca-imp-text-tools">
          {lineCount > 0 && <span className="ca-imp-count">{en ? `${lineCount} lines` : `${lineCount} qator`}</span>}
          {text ? (
            <button type="button" className="ca-link" onClick={() => setText('')}><X size={13} /> {en ? 'Clear' : 'Tozalash'}</button>
          ) : source === 'text' && (
            <button type="button" className="ca-link" onClick={() => setText(textExample)}>{en ? 'Try the example' : "Misolni qo'yib ko'rish"}</button>
          )}
        </span>
      </div>
      <textarea
        className="sa-textarea ca-import-text"
        rows={source === 'ai' ? 7 : 10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        autoFocus={source === 'text'}
      />
    </div>
  );

  const summary = (
    <div className="ca-imp-footer">
      <div className="ca-imp-summary">
        {rows.length === 0 ? (
          <span className="ca-muted">{en ? 'Nothing to add yet' : "Hali qo'shiladigan so'z yo'q"}</span>
        ) : (
          <>
            <span className="ca-pill is-green">{en ? `${ok.length - updates} new` : `${ok.length - updates} ta yangi`}</span>
            {updates > 0 && <span className="ca-pill is-orange">{en ? `${updates} update` : `${updates} ta yangilanadi`}</span>}
            {errors > 0 && <span className="ca-pill is-red">{en ? `${errors} ${errors === 1 ? 'error' : 'errors'}` : `${errors} ta xato`}</span>}
          </>
        )}
      </div>
      <Button onClick={() => onImport({ rows: ok })} disabled={!ok.length}>
        <Upload size={16} /> {ok.length ? (en ? `Add ${ok.length} ${ok.length === 1 ? 'word' : 'words'}` : `${ok.length} ta so'zni qo'shish`) : (en ? 'Add' : "Qo'shish")}
      </Button>
    </div>
  );

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={en ? 'Import Words' : "So'zlarni import qilish"}
      aside={sideView ? (
        <ImportPreviewTable rows={rows} known={known} ok={ok.length} errors={errors} updates={updates} onRemove={removeRow} onRemoveErrors={removeErrors} en={en} />
      ) : null}
      footer={summary}
      en={en}
    >
      {topic && (
        <p className="ca-imp-target">
          {en ? 'Into topic' : 'Mavzu'}: <b>{topic}</b>
          {existingWords?.length ? <span className="ca-muted"> · {en ? `${existingWords.length} words already` : `hozir ${existingWords.length} ta so'z`}</span> : null}
        </p>
      )}

      <div className="ca-imp-sources" role="tablist" aria-label={en ? 'Import source' : 'Import manbasi'}>
        {SOURCES.map(({ value, icon: Icon, title, sub }) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={source === value}
            className={`ca-imp-source ${source === value ? 'is-active' : ''}`}
            onClick={() => setSource(value)}
          >
            <span className="ca-imp-source-icon"><Icon size={18} /></span>
            <span className="ca-imp-source-title">{title}</span>
            <span className="ca-imp-source-sub">{sub}</span>
          </button>
        ))}
      </div>

      {source === 'text' && (
        <>
          {textArea(en ? 'apple - a red fruit\nbook - a set of pages' : 'apple - olma\nbook - kitob\nrun - yugurmoq - verb')}
          <details className="ca-imp-help">
            <summary><ChevronRight size={14} className="ca-imp-help-chevron" /> {en ? 'What format works?' : 'Qaysi formatda yozish kerak?'}</summary>
            <div className="ca-example">
              <div className="ca-example-head">
                <span>{en ? 'Example' : 'Misol'}</span>
                <span className="ca-example-actions">
                  <button type="button" className="ca-link" onClick={() => copy('example', textExample)}>
                    {copied === 'example' ? <><Check size={13} /> {en ? 'Copied' : 'Nusxalandi'}</> : <><Copy size={13} /> {en ? 'Copy' : 'Nusxalash'}</>}
                  </button>
                </span>
              </div>
              <pre>{textExample}</pre>
              <p>
                {en
                  ? <>Fields: <b>word - translation - part of speech - definition - example</b>. Only the first two are required. A tab, &quot; | &quot; or &quot; - &quot; separates them — a table copied from Excel or Google Sheets works as is.</>
                  : <>Tartib: <b>so'z - tarjima - turkum - ta'rif - misol</b>. Faqat birinchi ikkitasi majburiy. Ajratuvchi: tab, &quot; | &quot; yoki &quot; - &quot; — Excel yoki Google Sheets'dan nusxalangan jadval ham to'g'ridan-to'g'ri ishlaydi.</>}
              </p>
            </div>
          </details>
        </>
      )}

      {source === 'ai' && (
        <>
          <ol className="ca-imp-steps">
            <li>
              <span className="ca-imp-step-num">1</span>
              <div className="ca-imp-step-body">
                <b>{en ? 'Copy the prompt' : "So'rovni nusxalang"}</b>
                <span>{en
                  ? `20 words${topic ? ` on "${topic}"` : ''}${level ? `, ${level} level` : ''}, in exactly our format.`
                  : `${topic ? `"${topic}" mavzusida ` : ''}20 ta so'z${level ? `, ${level} daraja` : ''} — aynan bizning formatda.`}</span>
                <button type="button" className="faculty-btn-secondary" onClick={() => copy('prompt', aiPrompt(topic, level, en))}>
                  {copied === 'prompt' ? <><Check size={14} /> {en ? 'Copied' : 'Nusxalandi'}</> : <><Copy size={14} /> {en ? 'Copy prompt' : "So'rovni nusxalash"}</>}
                </button>
              </div>
            </li>
            <li>
              <span className="ca-imp-step-num">2</span>
              <div className="ca-imp-step-body">
                <b>{en ? 'Send it to ChatGPT, Gemini or Claude' : "ChatGPT, Gemini yoki Claude'ga yuboring"}</b>
                <span>{en ? 'Change the word count or topic in it if you like.' : "Xohlasangiz, so'zlar soni yoki mavzuni o'zgartiring."}</span>
              </div>
            </li>
            <li>
              <span className="ca-imp-step-num">3</span>
              <div className="ca-imp-step-body">
                <b>{en ? 'Paste its reply below' : "Javobni pastga qo'ying"}</b>
                <span>{en ? 'Check the preview, then add.' : "Ko'rib chiqing va qo'shing."}</span>
              </div>
            </li>
          </ol>
          {textArea(en ? "Paste the AI's reply here" : "AI javobini shu yerga qo'ying")}
        </>
      )}

      {source === 'file' && (
        <>
          <label
            className={`ca-drop ${dragging ? 'is-over' : ''} ${file ? 'has-file' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files?.[0]); }}
          >
            <input ref={inputRef} type="file" accept=".xlsx,.txt,.csv,.tsv" onChange={(e) => pickFile(e.target.files?.[0])} />
            <FileSpreadsheet size={28} aria-hidden="true" />
            <span className="ca-drop-title">
              {reading ? (en ? 'Reading...' : "O'qilmoqda...") : file ? file.name : (en ? 'Drop a file here or click to choose' : 'Faylni shu yerga tashlang yoki tanlang')}
            </span>
            <span className="ca-drop-sub">
              {file
                ? (en ? `${file.rows.length} rows read · click to choose another` : `${file.rows.length} ta qator o'qildi · boshqasini tanlash uchun bosing`)
                : (en ? 'Excel (.xlsx), .csv or .txt — first column the word, second the translation' : "Excel (.xlsx), .csv yoki .txt — 1-ustun so'z, 2-ustun tarjima")}
            </span>
          </label>
          {fileError && <p className="sa-flow-error">{fileError}</p>}
          <div className="ca-template-links">
            <span>{en ? 'Not sure about the layout? Download a template:' : 'Shablonni yuklab oling:'}</span>
            <button type="button" className="ca-link" onClick={() => downloadTemplate('xlsx', en)}><Download size={13} /> Excel</button>
            <button type="button" className="ca-link" onClick={() => downloadTemplate('txt', en)}><Download size={13} /> .txt</button>
          </div>
        </>
      )}

      {!sideView && rows.length > 0 && (
        <div className="ca-import-preview">
          <div className="ca-import-summary">
            <span className="ca-card-title">{en ? 'Preview' : "Ko'rib chiqish"}</span>
            {errors > 0 && (
              <button type="button" className="ca-link" onClick={removeErrors}>{en ? 'Remove errors' : "Xatolarni olib tashlash"}</button>
            )}
          </div>
          <ol className="ca-import-rows">
            {rows.slice(0, PREVIEW_LIMIT).map((r, i) => {
              const state = r.error ? 'is-error' : r.duplicate ? 'is-skip' : '';
              return (
                <li key={`${r.line}-${i}`} className={state}>
                  <span className="ca-import-line">{r.line}</span>
                  <span className="ca-import-word">{r.word || '—'}</span>
                  <span className="ca-import-tr">{r.error || (r.duplicate ? (en ? 'Duplicate' : 'Takror') : r.translation)}</span>
                  <button type="button" className="ca-row-remove" onClick={() => removeRow(r)} aria-label={en ? `Remove ${r.word || 'row'}` : `${r.word || 'Qator'} ni olib tashlash`}>
                    <X size={14} />
                  </button>
                </li>
              );
            })}
          </ol>
          {rows.length > PREVIEW_LIMIT && <p className="ca-import-more">{en ? `${rows.length - PREVIEW_LIMIT} more…` : `yana ${rows.length - PREVIEW_LIMIT} ta…`}</p>}
        </div>
      )}
    </Sheet>
  );
}

// Every parsed line with all its fields — shown beside the import modal.
function ImportPreviewTable({ rows, known, ok, errors, updates, onRemove, onRemoveErrors, en }) {
  const [onlyErrors, setOnlyErrors] = useState(false);
  const shown = onlyErrors && errors ? rows.filter((r) => r.error) : rows;
  if (!rows.length) {
    return (
      <div className="ca-preview">
        <div className="ca-preview-head">
          <div>
            <h3 className="ca-card-title">{en ? 'Preview' : "Ko'rib chiqish"}</h3>
            <span className="ca-card-sub">{en ? 'Words appear here as you type or upload' : "So'zlar yozganingizda yoki fayl yuklaganingizda shu yerda chiqadi"}</span>
          </div>
        </div>
        <div className="ca-preview-empty">
          <span className="ca-preview-empty-icon"><FileText size={22} aria-hidden="true" /></span>
          <b>{en ? 'No words yet' : "Hali so'z yo'q"}</b>
          <span>{en ? 'Paste a list, pick a file, or ask an AI — each line shows up here to check.' : "Ro'yxat qo'ying, fayl tanlang yoki AI'dan oling — har bir qator shu yerda tekshiriladi."}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="ca-preview">
      <div className="ca-preview-head">
        <div>
          <h3 className="ca-card-title">{en ? 'Preview' : "Ko'rib chiqish"}</h3>
          <span className="ca-card-sub">
            {en
              ? `${ok} to add${updates ? ` (${updates} update existing)` : ''}${errors ? ` · ${errors} with errors` : ''}`
              : `${ok} ta qo'shiladi${updates ? ` (${updates} tasi yangilanadi)` : ''}${errors ? ` · ${errors} ta xato` : ''}`}
          </span>
        </div>
        {errors > 0 && (
          <div className="ca-head-tags">
            <button type="button" className={`ca-filter-pill ${onlyErrors ? 'is-active' : ''}`} onClick={() => setOnlyErrors((v) => !v)}>
              <span className="ca-filter-dot is-red" /> {en ? 'Only errors' : 'Faqat xatolar'} <span className="ca-filter-count">{errors}</span>
            </button>
            <button type="button" className="faculty-btn-secondary" onClick={() => { onRemoveErrors(); setOnlyErrors(false); }}>
              <X size={14} /> {en ? 'Remove errors' : 'Xatolarni olib tashlash'}
            </button>
          </div>
        )}
      </div>
      <div className="ca-preview-scroll">
        <table className="ca-preview-table">
          <thead>
            <tr>
              <th className="num">#</th>
              <th>{en ? 'Word' : "So'z"}</th>
              <th>{en ? 'Translation' : 'Tarjima'}</th>
              <th>{en ? 'Part of Speech' : 'Turkum'}</th>
              <th>{en ? 'Definition' : "Ta'rif"}</th>
              <th>{en ? 'Example' : 'Misol'}</th>
              <th>{en ? 'Status' : 'Holati'}</th>
              <th aria-label={en ? 'Remove' : 'Olib tashlash'} />
            </tr>
          </thead>
          <tbody>
            {shown.map((r, i) => {
              let state = { cls: 'is-good', label: en ? 'New' : 'Yangi' };
              if (r.error) state = { cls: 'is-bad', label: r.error };
              else if (r.duplicate) state = { cls: '', label: en ? 'Duplicate — skipped' : "Takror — o'tkaziladi" };
              else if (known.has(r.word.toLowerCase())) state = { cls: 'is-warn', label: en ? 'Will update' : 'Yangilanadi' };
              return (
                <tr key={`${r.line}-${i}`} className={r.error ? 'is-error' : r.duplicate ? 'is-skip' : ''}>
                  <td className="num">{r.line}</td>
                  <td className="is-word">{r.word || '—'}</td>
                  <td>{r.translation || '—'}</td>
                  <td>{r.error ? '' : (en ? POS_LABEL_EN : POS_LABEL)[r.partOfSpeech] || '—'}</td>
                  <td className="is-muted">{r.definition || '—'}</td>
                  <td className="is-muted">{r.example || '—'}</td>
                  <td><span className={`ca-tag ${state.cls}`}>{state.label}</span></td>
                  <td className="is-action">
                    <button type="button" className="ca-row-remove" onClick={() => onRemove(r)} aria-label={en ? `Remove ${r.word || 'row'}` : `${r.word || 'Qator'} ni olib tashlash`} title={en ? 'Remove' : 'Olib tashlash'}>
                      <X size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Stable id of a parsed row within one file (sheets restart line numbers).
// Center admin's inline adder: one input per field, Enter anywhere submits;
// if a required field is still empty, Enter jumps to it instead. After an
// add the fields clear and focus returns to the first one, so a whole list
// can be typed without touching the mouse. (No `disabled` on the button —
// a disabled default button blocks Enter-submission entirely.)
function QuickAddRow({ fields, onAdd, submitLabel, inputRef }) {
  const [values, setValues] = useState(() => fields.map(() => ''));
  const refs = useRef([]);
  const missing = fields.findIndex((f, i) => f.required && !values[i].trim());

  const submit = (e) => {
    e.preventDefault();
    if (missing !== -1) {
      refs.current[missing]?.focus();
      return;
    }
    onAdd(values.map((v) => v.trim()));
    setValues(fields.map(() => ''));
    refs.current[0]?.focus();
  };

  return (
    <form className={`ca-quick-add ${missing === -1 ? 'is-ready' : ''}`} onSubmit={submit}>
      <span className="ca-quick-add-icon" aria-hidden="true"><Plus size={16} strokeWidth={2.4} /></span>
      {fields.map((f, i) => (
        <input
          key={f.key}
          ref={(el) => {
            refs.current[i] = el;
            if (i === 0 && inputRef) inputRef.current = el;
          }}
          className="ca-quick-add-input"
          value={values[i]}
          placeholder={f.placeholder}
          aria-label={f.label}
          onChange={(e) => setValues((vs) => vs.map((v, j) => (j === i ? e.target.value : v)))}
          onKeyDown={(e) => { if (e.key === 'Escape') setValues(fields.map(() => '')); }}
        />
      ))}
      <button type="submit" className="ca-quick-add-btn">{submitLabel}</button>
    </form>
  );
}

function rowKey(r) {
  return `${r.topic || ''}|${r.line}|${r.word}`;
}

// Plays the word with the browser's speech voice (as the old pack viewer did).
function SpeakButton({ word, lang, en }) {
  return (
    <button
      type="button"
      className="ca-speak"
      onClick={(e) => { e.stopPropagation(); speakWord(word, lang || 'en-US'); }}
      onKeyDown={(e) => e.stopPropagation()}
      aria-label={en ? `${word} — listen` : `${word} — tinglash`}
      title={en ? 'Listen' : 'Tinglash'}
    >
      <Volume2 size={14} />
    </button>
  );
}

// Irregular verbs carry their three forms (v1/v2/v3).
function verbForms(w) {
  return w.v1 && w.v2 && w.v3 ? `${w.v1} – ${w.v2} – ${w.v3}` : '';
}

function wordDetails(w) {
  const forms = verbForms(w);
  const definition = w.definition && w.definition !== `${w.v1} - ${w.v2} - ${w.v3}` ? w.definition : '';
  return [forms, definition, w.example].filter(Boolean).join(' · ');
}
