import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Copy, MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';
import { deleteCustomPack, duplicateCustomPack } from '../../../services/corpService';
import CourseEditor from './CourseEditor';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Button, EmptyState, LoadingRows, Page, Row, SearchField, Section, Sheet } from '../super-admin/ui';
import PackEditorSheet from '../super-admin/PackEditorSheet';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useToast } from '../super-admin/useToast';
import { useCenterData } from './CenterDataContext';

// Course library. Tapping a course opens its months / topics / words
// (CourseEditor); the "…" button holds rename / duplicate / delete.
export default function AdminCourses() {
  const isDesktop = useIsDesktop();
  const [toastNode, showToast] = useToast();
  const { centerId, loading, packs, patch } = useCenterData();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [menuPack, setMenuPack] = useState(null);
  const [editor, setEditor] = useState(null); // null | { pack?: existing }
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [busy, setBusy] = useState(false);

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

  if (managing) {
    return (
      <CourseEditor
        centerId={centerId}
        course={managing}
        onBack={() => setSearchParams({})}
        onUpdate={putPack}
      />
    );
  }

  const duplicate = async (p) => {
    setMenuPack(null);
    try {
      putPack(await duplicateCustomPack(centerId, p));
      showToast('Nusxa olindi');
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
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
      showToast("Kurs o'chirildi");
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
    } finally {
      setBusy(false);
    }
  };

  const summary = (p) => `${p.sectionsCount} mavzu · ${p.wordsCount} so'z`;
  const usage = (p) => (p.groupsCount ? `${p.groupsCount} guruhda` : 'Ishlatilmayapti');

  return (
    <Page
      icon={<BookOpen />}
      title="Kurslar"
      subtitle={loading ? ' ' : `${packs.length} ta kurs`}
      action={
        <button type="button" className="sa-icon-btn" onClick={() => setEditor({})} aria-label="Yangi kurs">
          <Plus size={20} strokeWidth={2.6} />
        </button>
      }
    >
      {packs.length > 5 && (
        <div className="sa-toolbar">
          <SearchField value={search} onChange={setSearch} placeholder="Kurs nomi" />
        </div>
      )}

      {loading ? (
        <LoadingRows count={4} />
      ) : visible.length === 0 ? (
        <div className="sa-group">
          {packs.length === 0 ? (
            <EmptyState
              icon={<BookOpen size={40} />}
              title="Hali kurs yo'q"
              text="Tayyor Beginner kursidan boshlang yoki o'zingiz yarating."
              action={<Button onClick={() => setEditor({})}>Kurs qo'shish</Button>}
            />
          ) : (
            <EmptyState title="Hech narsa topilmadi" text="Qidiruvni o'zgartirib ko'ring." />
          )}
        </div>
      ) : isDesktop ? (
        <div className="sa-table" style={{ '--sa-cols': 'minmax(260px, 2.4fr) 100px 100px 130px 100px 44px' }}>
          <div className="sa-table-head">
            <span>Kurs</span>
            <span className="num">Mavzu</span>
            <span className="num">So'z</span>
            <span>Guruhlar</span>
            <span className="num">O'quvchi</span>
            <span />
          </div>
          {visible.map((p) => (
            <div
              key={p.id}
              role="button"
              tabIndex={0}
              className="sa-table-row"
              onClick={() => open(p)}
              onKeyDown={(e) => { if (e.key === 'Enter') open(p); }}
            >
              <span className="sa-cell-main">
                <span className={`sa-row-icon tone-${p.isSystem ? 'purple' : 'blue'}`}><BookOpen size={16} /></span>
                <span className="sa-cell-text">
                  <span className="sa-cell-title">{p.title || 'Nomsiz kurs'}</span>
                  <span className="sa-cell-sub">{p.isSystem ? 'Tizim kursi · barcha markazlarda' : (p.description || '—')}</span>
                </span>
              </span>
              <span className="num">{p.sectionsCount}</span>
              <span className="num">{p.wordsCount}</span>
              <span className="muted">{usage(p)}</span>
              <span className="num">{p.studentsCount}</span>
              <button
                type="button"
                className="sa-more-btn"
                onClick={(e) => { e.stopPropagation(); setMenuPack(p); }}
                aria-label="Amallar"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="sa-group">
          {visible.map((p) => (
            <Row
              key={p.id}
              icon={<BookOpen size={16} />}
              iconTone={p.isSystem ? 'purple' : 'blue'}
              title={p.title || 'Nomsiz kurs'}
              subtitle={`${summary(p)} · ${usage(p)}`}
              onClick={() => setMenuPack(p)}
            />
          ))}
        </div>
      )}

      <Sheet open={Boolean(menuPack)} onClose={() => setMenuPack(null)} title={menuPack?.title || 'Kurs'}>
        {menuPack && (
          <>
            <Section>
              <Row title="Tarkib" detail={summary(menuPack)} />
              <Row title="Ishlatilishi" detail={menuPack.groupsCount ? `${menuPack.groupsCount} guruh · ${menuPack.studentsCount} o'quvchi` : 'Hech qaysi guruhda emas'} />
            </Section>
            <Section>
              <Row icon={<BookOpen size={16} />} iconTone="blue" title="Mavzu va so'zlarni boshqarish" onClick={() => { const p = menuPack; setMenuPack(null); open(p); }} />
              {!menuPack.isSystem && (
                <Row icon={<Pencil size={16} />} iconTone="gray" title="Nomini tahrirlash" onClick={() => { setEditor({ pack: menuPack }); setMenuPack(null); }} />
              )}
              <Row icon={<Copy size={16} />} iconTone="gray" title="Nusxa olish" onClick={() => duplicate(menuPack)} />
            </Section>
            {menuPack.isSystem ? (
              <p className="sa-section-footer">Bu tizim kursi — barcha markazlarda umumiy, o'chirib bo'lmaydi.</p>
            ) : (
              <Section>
                <Row
                  icon={<Trash2 size={16} />}
                  iconTone="red"
                  title="O'chirish"
                  destructive
                  chevron={false}
                  onClick={() => { setConfirmDelete(menuPack); setMenuPack(null); }}
                />
              </Section>
            )}
          </>
        )}
      </Sheet>

      <PackEditorSheet
        allowPreset
        open={Boolean(editor)}
        pack={editor?.pack || null}
        centerId={centerId}
        onClose={() => setEditor(null)}
        onSaved={(pack, { openAfter } = {}) => {
          putPack(pack);
          setEditor(null);
          if (openAfter) open(pack);
          else showToast('Saqlandi');
        }}
      />

      <ConfirmSheet
        open={Boolean(confirmDelete)}
        title={`"${confirmDelete?.title}" o'chirilsinmi?`}
        message={confirmDelete?.groupsCount
          ? `Bu kurs ${confirmDelete.groupsCount} ta guruhda ishlatilmoqda — u yerdan ham yo'qoladi. Qaytarib bo'lmaydi.`
          : "Kursning barcha mavzu va so'zlari o'chadi. Qaytarib bo'lmaydi."}
        confirmLabel="O'chirish"
        danger
        busy={busy}
        onConfirm={remove}
        onCancel={() => !busy && setConfirmDelete(null)}
      />

      {toastNode}
    </Page>
  );
}
