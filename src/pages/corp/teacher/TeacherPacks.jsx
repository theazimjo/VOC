import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, ChevronRight, Copy, Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { auth } from '../../../firebase';
import { deleteCustomPack, duplicateCustomPack } from '../../../services/corpService';
import CourseEditor from '../center-admin/CourseEditor';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Button, EmptyState, LoadingRows, Page, Row, SearchField, Section, Segmented, Sheet } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import PackEditorSheet from '../super-admin/PackEditorSheet';
import { useToast } from '../super-admin/useToast';
import { getPackUnits } from './utils';
import { useTeacherData } from './TeacherDataContext';

// The teacher's word packs: the center's shared ones (read-only here) and
// their own private ones (only they and their groups see them). Same
// Faculty-card table as the center admin's Courses (AdminCourses): a row
// opens the pack, rename / copy / delete sit inline on the row, and inside
// an own pack the header's gear opens the same sheet.
export default function TeacherPacks() {
  const [toastNode, showToast] = useToast();
  const isDesktop = useIsDesktop();
  const [scope, setScope] = useState('all');
  const { loading, packs, groups, centerId, patch } = useTeacherData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [menuPack, setMenuPack] = useState(null);
  const [editor, setEditor] = useState(null); // null | { pack? }
  const [confirm, setConfirm] = useState(null);
  const [busy, setBusy] = useState(false);

  // ?courseId= is what CourseEditor keeps in the URL (with monthId/unitId);
  // ?packId= is the old link shape.
  const viewingId = searchParams.get('courseId') || searchParams.get('packId');
  const viewing = packs.find((p) => p.id === viewingId) || null;

  const q = search.trim().toLowerCase();
  const visible = useMemo(
    () => packs.filter((p) => !q || [p.title, p.description].some((v) => (v || '').toLowerCase().includes(q))),
    [packs, q],
  );
  const usedIn = (packId) => groups.filter((g) => g.status !== 'archived' && g.packIds.includes(packId)).length;

  const putPack = (pack) => patch((c) => ({
    ...c,
    customPacks: { ...(c.customPacks || {}), [pack.id]: { ...(c.customPacks?.[pack.id] || {}), ...pack } },
  }));
  const open = (p) => setSearchParams({ courseId: p.id });
  const isOwn = (p) => p.scope === 'own' && !p.isSystem;

  // ?new=pack — the topbar's quick-add menu.
  useEffect(() => {
    if (searchParams.get('new') === 'pack') {
      setEditor({});
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const askConfirm = (sheet) => setConfirm(sheet);
  const runConfirm = async () => {
    setBusy(true);
    try {
      await confirm.onConfirm();
      setConfirm(null);
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setBusy(false);
    }
  };

  const duplicate = async (p) => {
    setMenuPack(null);
    try {
      // A copy is always the teacher's own private pack.
      const copy = await duplicateCustomPack(centerId, p, auth.currentUser?.uid);
      putPack(copy);
      showToast(`"${copy.title || 'Copy'}" added to your own packs`);
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    }
  };

  const askDelete = (p) => {
    setMenuPack(null);
    const n = usedIn(p.id);
    askConfirm({
      title: `Delete "${p.title}"?`,
      message: n
        ? `This pack is used in ${n} of your groups — it will disappear there too. This can't be undone.`
        : "All of this pack's topics and words will be deleted. This can't be undone.",
      confirmLabel: 'Delete',
      danger: true,
      onConfirm: async () => {
        await deleteCustomPack(centerId, p.id);
        patch((c) => {
          const next = { ...c.customPacks };
          delete next[p.id];
          return { ...c, customPacks: next };
        });
        if (viewingId === p.id) setSearchParams({});
        showToast('Pack deleted');
      },
    });
  };

  const sheets = (
    <>
      <Sheet open={Boolean(menuPack)} onClose={() => setMenuPack(null)} title={menuPack?.title || 'Word pack'}>
        {menuPack && (
          <>
            <Section>
              <Row title="Words" detail={menuPack.wordsCount} />
              <Row title="Used in" detail={usedIn(menuPack.id) ? `${usedIn(menuPack.id)} groups` : 'No groups'} />
              <Row title="Type" detail={menuPack.isSystem ? 'System' : menuPack.scope === 'own' ? 'Personal' : 'Center'} />
            </Section>
            <Section>
              <Row icon={<Eye size={16} />} iconTone="blue" title={menuPack.scope === 'own' && !menuPack.isSystem ? 'View and edit words' : 'View words'} onClick={() => { const p = menuPack; setMenuPack(null); open(p); }} />
              {menuPack.scope === 'own' && !menuPack.isSystem && (
                <Row icon={<Pencil size={16} />} iconTone="gray" title="Edit name and details" onClick={() => { setEditor({ pack: menuPack }); setMenuPack(null); }} />
              )}
              {!menuPack.isSystem && (
                <Row icon={<Copy size={16} />} iconTone="gray" title="Duplicate" onClick={() => duplicate(menuPack)} />
              )}
            </Section>
            {menuPack.scope === 'own' && !menuPack.isSystem && (
              <Section>
                <Row icon={<Trash2 size={16} />} iconTone="red" title="Delete Pack" destructive chevron={false} onClick={() => askDelete(menuPack)} />
              </Section>
            )}
          </>
        )}
      </Sheet>

      <PackEditorSheet
        open={Boolean(editor)}
        pack={editor?.pack || null}
        centerId={centerId}
        ownerUid={auth.currentUser?.uid || null}
        en
        onClose={() => setEditor(null)}
        onSaved={(pack, { openAfter } = {}) => {
          putPack(pack);
          setEditor(null);
          if (openAfter) open(pack);
          else showToast('Saved');
        }}
      />

      <ConfirmSheet
        open={Boolean(confirm)}
        title={confirm?.title}
        message={confirm?.message}
        confirmLabel={confirm?.confirmLabel}
        danger={confirm?.danger}
        busy={busy}
        onConfirm={runConfirm}
        onCancel={() => !busy && setConfirm(null)}
      />

      {toastNode}
    </>
  );

  // Own packs are edited like the admin's courses (topics → words, quick
  // add, text/Excel import); center packs open read-only.
  if (viewing) {
    return (
      <>
        <CourseEditor
          centerId={centerId}
          course={viewing}
          readOnly={!isOwn(viewing)}
          backLabel="Word Packs"
          en
          onBack={() => setSearchParams({})}
          onUpdate={putPack}
          onSettings={isOwn(viewing) ? () => setMenuPack(viewing) : undefined}
        />
        {sheets}
      </>
    );
  }

  const shown = scope === 'all' ? visible : visible.filter((p) => p.scope === scope);
  const typeLabel = (p) => (p.isSystem ? 'System' : p.scope === 'own' ? 'Personal' : 'Center');
  const summary = (p) => { const t = getPackUnits(p).length; return `${t} ${t === 1 ? 'topic' : 'topics'} · ${p.wordsCount} words`; };

  return (
    <Page hideHeader>
      <section className="ca-card is-faculty-card">
        <div className="faculty-toolbar faculty-toolbar-wrap">
          <div className="faculty-toolbar-left faculty-toolbar-filters">
            {packs.length > 5 && <SearchField value={search} onChange={setSearch} placeholder="Pack name" />}
            <Segmented
              label="Pack type"
              options={[
                { value: 'all', label: `All (${packs.length})` },
                { value: 'center', label: 'Center' },
                { value: 'own', label: 'Personal' },
              ]}
              value={scope}
              onChange={setScope}
            />
          </div>
          <div className="faculty-toolbar-right">
            <button type="button" className="faculty-btn-invite" onClick={() => setEditor({})}>
              <Plus size={14} /> New<span className="ca-hide-sm"> Word Pack</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: 20 }}><LoadingRows count={4} /></div>
        ) : shown.length === 0 ? (
          <div className="sa-group" style={{ padding: 20 }}>
            {q ? (
              <EmptyState title="Nothing found" text="Try a different search." />
            ) : scope === 'center' ? (
              <EmptyState icon={<BookOpen size={40} />} title="The center hasn't added any packs yet" />
            ) : (
              <EmptyState
                icon={<BookOpen size={40} />}
                title="No personal packs yet"
                text="Create a pack with your own words, or duplicate a center pack. Only you and your groups see it."
                action={<Button onClick={() => setEditor({})}>Create Pack</Button>}
              />
            )}
          </div>
        ) : isDesktop ? (
          <div className="faculty-table courses-table teacher-packs-table">
            <div className="faculty-table-head">
              <span>Pack</span>
              <span>Topics</span>
              <span>Words</span>
              <span>Used in</span>
              <span>Type</span>
              <span />
            </div>
            {shown.map((p) => {
              const n = usedIn(p.id);
              return (
                <div
                  key={p.id}
                  className="faculty-table-row"
                  role="button"
                  tabIndex={0}
                  onClick={() => open(p)}
                  onKeyDown={(e) => { if (e.key === 'Enter') open(p); }}
                >
                  <div className="ca-course-cell">
                    <span className={`ca-course-icon ${p.isSystem ? 'is-system' : p.scope === 'own' ? 'is-own' : ''}`} aria-hidden="true"><BookOpen size={16} /></span>
                    <div className="faculty-cell-name">
                      <span className="faculty-name-link">{p.title || 'Untitled'}</span>
                      <span className="faculty-email-sub">{p.description || (p.wordsCount ? summary(p) : 'Empty — add topics and words')}</span>
                    </div>
                  </div>
                  <span>{getPackUnits(p).length}</span>
                  <span>{p.wordsCount}</span>
                  <span className={n ? '' : 'ca-muted'}>{n ? `${n} ${n === 1 ? 'group' : 'groups'}` : 'No groups'}</span>
                  <span><span className={`ca-tag ${p.scope === 'own' && !p.isSystem ? 'is-own' : ''}`}>{typeLabel(p)}</span></span>
                  <span className="ca-row-actions" onClick={(e) => e.stopPropagation()}>
                    {isOwn(p) && (
                      <button type="button" className="ca-row-action" onClick={() => setEditor({ pack: p })} aria-label={`Edit ${p.title}`} title="Edit name">
                        <Pencil size={14} />
                      </button>
                    )}
                    {!p.isSystem && (
                      <button type="button" className="ca-row-action" onClick={() => duplicate(p)} aria-label={`Duplicate ${p.title}`} title="Duplicate">
                        <Copy size={14} />
                      </button>
                    )}
                    {isOwn(p) && (
                      <button type="button" className="ca-row-action is-danger" onClick={() => askDelete(p)} aria-label={`Delete ${p.title}`} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    )}
                    <ChevronRight size={16} className="ca-row-chevron" aria-hidden="true" />
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="sa-group" style={{ padding: 12 }}>
            {shown.map((p) => (
              <Row
                key={p.id}
                icon={<BookOpen size={16} />}
                iconTone={p.isSystem ? 'purple' : p.scope === 'own' ? 'green' : 'blue'}
                title={p.title || 'Untitled'}
                subtitle={`${typeLabel(p)} · ${summary(p)}`}
                onClick={() => (p.isSystem ? open(p) : setMenuPack(p))}
              />
            ))}
          </div>
        )}
      </section>

      {sheets}
    </Page>
  );
}

