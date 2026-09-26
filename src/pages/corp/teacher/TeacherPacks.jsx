import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Copy, Eye, MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';
import { auth } from '../../../firebase';
import { deleteCustomPack, duplicateCustomPack } from '../../../services/corpService';
import TeacherPackViewer from '../../../components/corp/TeacherPackViewer';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { EmptyState, LoadingRows, Page, Row, SearchField, Section, Segmented, Sheet } from '../super-admin/ui';
import PackEditorSheet from '../super-admin/PackEditorSheet';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useToast } from '../super-admin/useToast';
import { getPackUnits } from './utils';
import { useTeacherData } from './TeacherDataContext';

// The teacher's word packs: the center's shared ones (read-only here) and
// their own private ones (only they and their groups see them). Tapping a
// pack opens its words; the sheet holds rename / copy / delete.
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

  const viewingId = searchParams.get('packId');
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
  const open = (p) => setSearchParams({ packId: p.id });

  const askConfirm = (sheet) => setConfirm(sheet);
  const runConfirm = async () => {
    setBusy(true);
    try {
      await confirm.onConfirm();
      setConfirm(null);
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
    } finally {
      setBusy(false);
    }
  };

  if (viewing) {
    const editable = viewing.scope === 'own' && !viewing.isSystem;
    return (
      <div className="sa-page is-wide">
        <TeacherPackViewer
          pack={viewing}
          onBack={() => setSearchParams({})}
          editable={editable}
          centerId={centerId}
          askConfirm={askConfirm}
          onUpdate={putPack}
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
      </div>
    );
  }

  const duplicate = async (p) => {
    setMenuPack(null);
    try {
      // A copy is always the teacher's own private pack.
      putPack(await duplicateCustomPack(centerId, p, auth.currentUser?.uid));
      showToast("Nusxa \"Mening to'plamlarim\"ga qo'shildi");
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
    }
  };

  const askDelete = (p) => {
    setMenuPack(null);
    const n = usedIn(p.id);
    askConfirm({
      title: `"${p.title}" o'chirilsinmi?`,
      message: n
        ? `Bu to'plam ${n} ta guruhingizda ishlatilmoqda — u yerdan ham yo'qoladi. Qaytarib bo'lmaydi.`
        : "To'plamdagi barcha so'zlar o'chadi. Qaytarib bo'lmaydi.",
      confirmLabel: "O'chirish",
      danger: true,
      onConfirm: async () => {
        await deleteCustomPack(centerId, p.id);
        patch((c) => {
          const next = { ...c.customPacks };
          delete next[p.id];
          return { ...c, customPacks: next };
        });
        showToast("To'plam o'chirildi");
      },
    });
  };

  const own = visible.filter((p) => p.scope === 'own');
  const shared = visible.filter((p) => p.scope === 'center');
  const row = (p) => {
    const n = usedIn(p.id);
    return (
      <Row
        key={p.id}
        icon={<BookOpen size={16} />}
        iconTone={p.isSystem ? 'purple' : p.scope === 'own' ? 'green' : 'blue'}
        title={p.title || 'Nomsiz'}
        subtitle={`${p.wordsCount} so'z${n ? ` · ${n} guruhda` : ''}`}
        onClick={() => setMenuPack(p)}
      />
    );
  };

  return (
    <Page
      title="So'z to'plamlari"
      subtitle={loading ? ' ' : `${packs.length} ta to'plam`}
      wide
      action={
        <button type="button" className="sa-icon-btn" onClick={() => setEditor({})} aria-label="Yangi to'plam">
          <Plus size={20} strokeWidth={2.6} />
        </button>
      }
    >
      <div className="sa-toolbar is-inline" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <SearchField value={search} onChange={setSearch} placeholder="To'plam nomi" />
        <Segmented
          label="To'plam turi"
          options={[
            { value: 'all', label: `Hammasi (${packs.length})` },
            { value: 'center', label: 'Markaz' },
            { value: 'own', label: 'Mening' },
          ]}
          value={scope}
          onChange={setScope}
        />
      </div>

      {loading ? (
        <LoadingRows count={4} />
      ) : (
        <PackCards
          packs={scope === 'all' ? visible : visible.filter((p) => p.scope === scope)}
          usedIn={usedIn}
          onOpen={open}
          onMenu={setMenuPack}
          onCreate={() => setEditor({})}
          scope={scope}
          searching={Boolean(q)}
        />
      )}

      <Sheet open={Boolean(menuPack)} onClose={() => setMenuPack(null)} title={menuPack?.title || "To'plam"}>
        {menuPack && (
          <>
            <Section>
              <Row title="So'zlar" detail={menuPack.wordsCount} />
              <Row title="Guruhlarda" detail={usedIn(menuPack.id) || "Yo'q"} />
              <Row title="Turi" detail={menuPack.isSystem ? 'Tizim' : menuPack.scope === 'own' ? 'Shaxsiy' : 'Markaz'} />
            </Section>
            <Section>
              <Row icon={<Eye size={16} />} iconTone="blue" title={menuPack.scope === 'own' && !menuPack.isSystem ? "So'zlarni ko'rish va tahrirlash" : "So'zlarni ko'rish"} onClick={() => { const p = menuPack; setMenuPack(null); open(p); }} />
              {menuPack.scope === 'own' && !menuPack.isSystem && (
                <Row icon={<Pencil size={16} />} iconTone="gray" title="Nomini tahrirlash" onClick={() => { setEditor({ pack: menuPack }); setMenuPack(null); }} />
              )}
              {!menuPack.isSystem && (
                <Row icon={<Copy size={16} />} iconTone="gray" title="Nusxa olish" onClick={() => duplicate(menuPack)} />
              )}
            </Section>
            {menuPack.scope === 'own' && !menuPack.isSystem && (
              <Section>
                <Row icon={<Trash2 size={16} />} iconTone="red" title="O'chirish" destructive chevron={false} onClick={() => askDelete(menuPack)} />
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
        onClose={() => setEditor(null)}
        onSaved={(pack, { openAfter } = {}) => {
          putPack(pack);
          setEditor(null);
          if (openAfter) open(pack);
          else showToast('Saqlandi');
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
    </Page>
  );
}

const SCOPE_LABEL = { own: 'Shaxsiy', center: 'Markaz' };

// Card grid view for teacher word packs
function PackCards({ packs, usedIn, onOpen, onMenu, onCreate, scope, searching }) {
  if (packs.length === 0) {
    return (
      <div className="sa-group">
        {searching ? (
          <EmptyState title="Topilmadi" text="Qidiruvni o'zgartirib ko'ring." />
        ) : scope === 'own' ? (
          <EmptyState
            icon={<BookOpen size={40} />}
            title="Hali shaxsiy to'plam yo'q"
            text="O'z so'zlaringiz bilan to'plam yarating yoki markaz to'plamidan nusxa oling. Uni faqat siz va guruhlaringiz ko'radi."
            action={<button type="button" className="sa-btn sa-btn-filled tone-blue" onClick={onCreate}>To'plam yaratish</button>}
          />
        ) : (
          <EmptyState icon={<BookOpen size={40} />} title="Markaz hali to'plam qo'shmagan" />
        )}
      </div>
    );
  }

  return (
    <div className="sa-pack-grid">
      {packs.map((p) => {
        const n = usedIn(p.id);
        const unitsCount = getPackUnits(p).length;
        const tone = p.isSystem ? 'purple' : p.scope === 'own' ? 'green' : 'blue';
        const badgeText = p.isSystem ? 'Tizim' : SCOPE_LABEL[p.scope];

        return (
          <div
            key={p.id}
            role="button"
            tabIndex={0}
            className="sa-pack-card"
            onClick={() => onOpen(p)}
            onKeyDown={(e) => { if (e.key === 'Enter') onOpen(p); }}
          >
            <div className="sa-pack-card-top">
              <div className="sa-pack-card-main">
                <span className={`sa-pack-card-icon tone-${tone}`}>
                  <BookOpen size={18} />
                </span>
                <div className="sa-pack-card-title-group">
                  <span className="sa-pack-card-title">{p.title || 'Nomsiz'}</span>
                  <span className={`sa-pack-card-badge badge-${tone}`}>
                    {badgeText}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="sa-more-btn"
                onClick={(e) => { e.stopPropagation(); onMenu(p); }}
                aria-label={`${p.title} amallari`}
              >
                <MoreHorizontal size={18} />
              </button>
            </div>

            {p.description && (
              <p className="sa-pack-card-desc" title={p.description}>
                {p.description}
              </p>
            )}

            <div className="sa-pack-card-footer">
              <div className="sa-pack-card-stats">
                <span className="sa-pack-card-stat">
                  <span className="sa-pack-card-stat-val">{unitsCount}</span> mavzu
                </span>
                <span className="sa-pack-card-stat">
                  <span className="sa-pack-card-stat-val">{p.wordsCount}</span> so'z
                </span>
              </div>
              <span className="sa-pack-card-groups">
                {n ? `${n} guruhda` : '—'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
