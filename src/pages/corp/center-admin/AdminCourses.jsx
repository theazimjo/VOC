import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, ChevronRight, Copy, Pencil, Plus, Trash2 } from 'lucide-react';
import { createCustomPack, deleteCustomPack, duplicateCustomPack, updateCustomPack } from '../../../services/corpService';
import { courseUpdates, LIBRARY_BOOK_IDS, LIBRARY_VERSION, libraryBookToCourse, monthsOf, syncCourseWithBook } from './courseEditing';
import CourseEditor from './CourseEditor';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Button, EmptyState, LoadingRows, Page, Row, SearchField, Section, Sheet } from '../super-admin/ui';
import PackEditorSheet from '../super-admin/PackEditorSheet';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useToast } from '../super-admin/useToast';
import { useCenterData } from './CenterDataContext';

// Course library. Tapping a course (desktop row or mobile row) opens its
// topics / words (CourseEditor). Rename / duplicate / delete sit inline on
// the desktop row, and inside a course behind its settings button (the
// same sheet, rendered for both views). Same ca-card/faculty-table shell as
// Faculty/Groups/Students (see DESIGN.md pattern 1) — count or search on
// the left, "New Course" as the toolbar's primary action on the right.
export default function AdminCourses() {
  const isDesktop = useIsDesktop();
  const [toastNode, showToast] = useToast();
  const { centerId, loading, packs, patch } = useCenterData();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [menuPack, setMenuPack] = useState(null);
  const [editor, setEditor] = useState(null); // null | { pack?: existing }

  // ?new=course — the topbar's "+" menu.
  useEffect(() => {
    if (searchParams.get('new') !== 'course') return;
    setChooser(true);
    setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [busy, setBusy] = useState(false);
  const syncedRef = useRef(new Set());
  const [chooser, setChooser] = useState(false); // "New course" menu: blank or a library book
  const [books, setBooks] = useState(null); // system library books: null = loading
  const [adding, setAdding] = useState(null); // id of the book being added

  // The system library (Science, Health…) is big, so it loads only when the sheet opens.
  useEffect(() => {
    if (!chooser || books) return undefined;
    let alive = true;
    import('../../../data/marketData').then(({ marketPacks }) => {
      if (alive) setBooks(marketPacks.filter((b) => LIBRARY_BOOK_IDS.includes(b.id)).map((b) => {
        const topics = new Set((b.words || []).map((w) => w.topic).filter(Boolean));
        return { id: b.id, name: b.name, icon: b.icon, color: b.color, level: b.level, description: b.description, chapters: topics.size, words: (b.words || []).length, book: b };
      }));
    }).catch(() => { if (alive) setBooks([]); });
    return () => { alive = false; };
  }, [chooser, books]);

  const addBook = async (entry) => {
    setAdding(entry.id);
    try {
      const course = libraryBookToCourse(entry.book);
      const created = await createCustomPack(centerId, { title: course.title, level: course.level, description: course.description, language: 'en-US' });
      const updates = { ...courseUpdates(course.months), libraryBook: entry.id, libraryVersion: LIBRARY_VERSION };
      await updateCustomPack(centerId, created.id, updates);
      putPack({ ...created, ...updates, wordsCount: updates.wordCount });
      setChooser(false);
      showToast(`"${course.title}" added — ${updates.sectionsCount} topics, ${updates.wordCount} words`);
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setAdding(null);
    }
  };

  const managingId = searchParams.get('courseId');
  const managing = packs.find((p) => p.id === managingId) || null;

  const q = search.trim().toLowerCase();
  const visible = useMemo(
    () => packs
      .filter((p) => !q || [p.title, p.description].some((v) => (v || '').toLowerCase().includes(q)))
      .sort((a, b) => a.isSystem - b.isSystem || (Date.parse(b.createdAt || '') || 0) - (Date.parse(a.createdAt || '') || 0)),
    [packs, q],
  );

  const putPack = (pack) => patch((c) => ({ ...c, customPacks: { ...(c.customPacks || {}), [pack.id]: { ...(c.customPacks?.[pack.id] || {}), ...pack } } }));
  const open = (p) => setSearchParams({ courseId: p.id });

  // Courses this center added from the library earlier get the newer words and
  // Russian translations, once (the pack remembers which library version it has).
  useEffect(() => {
    if (loading || !centerId) return;
    const names = new Map([['science', 'science'], ['health', 'health']]);
    const todo = packs.filter((p) => !p.isSystem && (p.libraryVersion || 0) < LIBRARY_VERSION
      && names.has(p.libraryBook || String(p.title || '').trim().toLowerCase()) && !syncedRef.current.has(p.id));
    if (!todo.length) return;
    todo.forEach((p) => syncedRef.current.add(p.id));
    import('../../../data/marketData').then(async ({ marketPacks }) => {
      for (const p of todo) {
        const book = marketPacks.find((b) => b.id === (p.libraryBook || String(p.title).trim().toLowerCase()));
        if (!book) continue;
        const res = syncCourseWithBook(monthsOf(p, true), book);
        if (!res.matched) continue; // not really a library copy
        const updates = { ...courseUpdates(res.months), libraryBook: book.id, libraryVersion: LIBRARY_VERSION };
        try {
          await updateCustomPack(centerId, p.id, updates);
          putPack({ ...p, ...updates, wordsCount: updates.wordCount });
          if (res.added || res.filled) showToast(`"${p.title}" updated from the library: ${res.added} new words, ${res.filled} Russian translations`);
        } catch (err) {
          syncedRef.current.delete(p.id);
        }
      }
    });
  }, [loading, centerId, packs]); // eslint-disable-line react-hooks/exhaustive-deps

  const duplicate = async (p) => {
    setMenuPack(null);
    try {
      const copy = await duplicateCustomPack(centerId, p);
      putPack(copy);
      showToast(`"${copy.title || 'Copy'}" created`);
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    }
  };

  const remove = async () => {
    const p = confirmDelete;
    setBusy(true);
    try {
      await deleteCustomPack(centerId, p.id);
      patch((c) => {
        const next = { ...c.customPacks };
        delete next[p.id];
        return { ...c, customPacks: next };
      });
      setConfirmDelete(null);
      if (managingId === p.id) setSearchParams({});
      showToast('Course deleted');
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setBusy(false);
    }
  };

  const summary = (p) => `${p.sectionsCount} ${p.sectionsCount === 1 ? 'topic' : 'topics'} · ${p.wordsCount} words`;
  const usage = (p) => (p.groupsCount ? `${p.groupsCount} ${p.groupsCount === 1 ? 'group' : 'groups'}` : 'Not in use');

  const sheets = (
    <>
      <Sheet open={Boolean(menuPack)} onClose={() => setMenuPack(null)} title={menuPack?.title || 'Course'} en>
        {menuPack && (
          <>
            <Section>
              <Row title="Content" detail={summary(menuPack)} />
              <Row title="Usage" detail={menuPack.groupsCount ? `${usage(menuPack)} · ${menuPack.studentsCount} students` : 'Not used in any group'} />
            </Section>
            <Section>
              {!menuPack.isSystem && (
                <Row icon={<Pencil size={16} />} iconTone="gray" title="Edit name and details" onClick={() => { setEditor({ pack: menuPack }); setMenuPack(null); }} />
              )}
              <Row icon={<Copy size={16} />} iconTone="gray" title="Duplicate" onClick={() => duplicate(menuPack)} />
            </Section>
            {menuPack.isSystem ? (
              <p className="sa-section-footer">This is a system course — shared across every center, it can't be deleted.</p>
            ) : (
              <Section>
                <Row
                  icon={<Trash2 size={16} />}
                  iconTone="red"
                  title="Delete Course"
                  destructive
                  chevron={false}
                  onClick={() => { setConfirmDelete(menuPack); setMenuPack(null); }}
                />
              </Section>
            )}
          </>
        )}
      </Sheet>

      <Sheet open={chooser} onClose={() => !adding && setChooser(false)} title="New Course" en>
        <Section>
          <Row
            icon={<Plus size={16} />}
            iconTone="blue"
            title="Blank course"
            subtitle="Start empty and add your own topics and words"
            onClick={adding ? undefined : () => { setChooser(false); setEditor({}); }}
          />
        </Section>
        <p className="sa-section-footer">Or add a ready-made book from the system — a copy goes into your courses and can be edited freely.</p>
        <Section>
          {books === null ? <LoadingRows count={2} /> : books.map((b) => (
            <Row
              key={b.id}
              icon={b.icon}
              iconTone="gray"
              title={b.name}
              subtitle={packs.some((x) => !x.isSystem && x.title === b.name) ? `${b.chapters} chapters · ${b.words} words · already in your courses` : `${b.chapters} chapters · ${b.words} words`}
              detail={adding === b.id ? 'Adding…' : packs.some((x) => !x.isSystem && x.title === b.name) ? 'Added' : undefined}
              chevron={!packs.some((x) => !x.isSystem && x.title === b.name)}
              onClick={adding || packs.some((x) => !x.isSystem && x.title === b.name) ? undefined : () => addBook(b)}
            />
          ))}
          {books && books.length === 0 && <p className="sa-section-footer">The library couldn't be loaded.</p>}
        </Section>
      </Sheet>

      <PackEditorSheet
        isCourse
        en
        open={Boolean(editor)}
        pack={editor?.pack || null}
        centerId={centerId}
        onClose={() => setEditor(null)}
        onSaved={(pack, { openAfter } = {}) => {
          putPack(pack);
          setEditor(null);
          if (openAfter) open(pack);
          else showToast('Saved');
        }}
      />

      <ConfirmSheet
        open={Boolean(confirmDelete)}
        title={`Delete "${confirmDelete?.title}"?`}
        message={confirmDelete?.groupsCount
          ? `This course is used in ${usage(confirmDelete)} — it will disappear from there too. This can't be undone.`
          : "All of this course's topics and words will be deleted. This can't be undone."}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        danger
        busy={busy}
        onConfirm={remove}
        onCancel={() => !busy && setConfirmDelete(null)}
      />

      {toastNode}
    </>
  );

  if (managing) {
    return (
      <>
        <CourseEditor
          centerId={centerId}
          course={managing}
          onBack={() => setSearchParams({})}
          onUpdate={putPack}
          onSettings={() => setMenuPack(managing)}
          backLabel="Courses"
          en
        />
        {sheets}
      </>
    );
  }

  return (
    <Page hideHeader>
      <section className="ca-card is-faculty-card">
        <div className="faculty-toolbar">
          <div className="faculty-toolbar-left faculty-toolbar-filters">
            {packs.length > 5
              ? <SearchField value={search} onChange={setSearch} placeholder="Course name" />
              : packs.length > 0 && <span className="ca-list-count">{packs.length} {packs.length === 1 ? 'course' : 'courses'}</span>}
          </div>
          <div className="faculty-toolbar-right">
            <button type="button" className="faculty-btn-invite" onClick={() => setChooser(true)}>
              <Plus size={14} /> New Course
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: 20 }}><LoadingRows count={4} /></div>
        ) : visible.length === 0 ? (
          <div className="sa-group" style={{ padding: 20 }}>
            {packs.length === 0 ? (
              <EmptyState
                icon={<BookOpen size={40} />}
                title="No courses yet"
                text="Create a course, then add topics and import words from text or an Excel file."
                action={<Button onClick={() => setChooser(true)}>Add Course</Button>}
              />
            ) : (
              <EmptyState title="Nothing found" text="Try a different search." />
            )}
          </div>
        ) : isDesktop ? (
          <div className="faculty-table courses-table">
            <div className="faculty-table-head">
              <span>Course</span>
              <span>Topics</span>
              <span>Words</span>
              <span>Used in</span>
              <span>Students</span>
              <span />
            </div>
            {visible.map((p) => (
              <div
                key={p.id}
                className="faculty-table-row"
                role="button"
                tabIndex={0}
                onClick={() => open(p)}
                onKeyDown={(e) => { if (e.key === 'Enter') open(p); }}
              >
                <div className="ca-course-cell">
                  <span className={`ca-course-icon ${p.isSystem ? 'is-system' : ''}`} aria-hidden="true"><BookOpen size={16} /></span>
                  <div className="faculty-cell-name">
                    <span className="faculty-name-row">
                      <span className="faculty-name-link">{p.title || 'Untitled course'}</span>
                      {p.isSystem && <span className="ca-tag">System</span>}
                    </span>
                    <span className="faculty-email-sub">{p.isSystem ? 'Shared across all centers' : (p.description || (p.wordsCount ? summary(p) : 'Empty — add topics and words'))}</span>
                  </div>
                </div>
                <span>{p.sectionsCount}</span>
                <span>{p.wordsCount}</span>
                <span className={p.groupsCount ? '' : 'ca-muted'}>{usage(p)}</span>
                <span className={p.studentsCount ? '' : 'ca-muted'}>{p.studentsCount || '—'}</span>
                <span className="ca-row-actions" onClick={(e) => e.stopPropagation()}>
                  {!p.isSystem && (
                    <button type="button" className="ca-row-action" onClick={() => setEditor({ pack: p })} aria-label={`Edit ${p.title}`} title="Edit name">
                      <Pencil size={14} />
                    </button>
                  )}
                  <button type="button" className="ca-row-action" onClick={() => duplicate(p)} aria-label={`Duplicate ${p.title}`} title="Duplicate">
                    <Copy size={14} />
                  </button>
                  {!p.isSystem && (
                    <button type="button" className="ca-row-action is-danger" onClick={() => setConfirmDelete(p)} aria-label={`Delete ${p.title}`} title="Delete">
                      <Trash2 size={14} />
                    </button>
                  )}
                  <ChevronRight size={16} className="ca-row-chevron" aria-hidden="true" />
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="sa-group" style={{ padding: 12 }}>
            {visible.map((p) => (
              <Row
                key={p.id}
                icon={<BookOpen size={16} />}
                iconTone={p.isSystem ? 'purple' : 'blue'}
                title={p.title || 'Untitled course'}
                subtitle={`${summary(p)} · ${usage(p)}`}
                onClick={() => open(p)}
              />
            ))}
          </div>
        )}
      </section>

      {sheets}
    </Page>
  );
}
