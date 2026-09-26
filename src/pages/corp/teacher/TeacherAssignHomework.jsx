import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, NotebookPen } from 'lucide-react';
import { addGroupHomework } from '../../../services/corpService';
import { Button, EmptyState, LoadingRows, Page, Row, Section, Segmented } from '../super-admin/ui';
import { useToast } from '../super-admin/useToast';
import { getHomeworkCandidates, getUsedHomeworkKeys } from './utils';
import { useTeacherData } from './TeacherDataContext';

const keyOf = (c) => `${c.packId}_${c.monthId}_${c.unitId}`;

// Pick topics from the group's packs and hand them out as one dated
// assignment. Topics given before stay visible but greyed out.
export default function TeacherAssignHomework() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [toastNode, showToast] = useToast();
  const { loading, groups, packs, centerId, patchGroup } = useTeacherData();
  const [selected, setSelected] = useState(() => new Set());
  const [filter, setFilter] = useState('new');
  const [saving, setSaving] = useState(false);

  const group = groups.find((g) => g.id === groupId) || null;
  const groupPath = `/corp/teacher/group/${groupId}`;
  const back = { label: group?.name || 'Guruh', onClick: () => navigate(groupPath) };

  const byPack = useMemo(() => {
    if (!group) return [];
    const candidates = getHomeworkCandidates(group, packs, getUsedHomeworkKeys(group.homework));
    const map = new Map();
    candidates.forEach((c) => {
      if (!map.has(c.packId)) map.set(c.packId, { packId: c.packId, title: c.packTitle, units: [] });
      map.get(c.packId).units.push(c);
    });
    return [...map.values()];
  }, [group, packs]);

  if (loading) return <Page title="Yangi vazifa" back={back}><LoadingRows count={6} /></Page>;
  if (!group) return <Page title="Guruh topilmadi" back={{ label: 'Guruhlarim', onClick: () => navigate('/corp/teacher') }} />;

  const all = byPack.flatMap((p) => p.units);
  const fresh = all.filter((c) => !c.used);
  const toggle = (c) => {
    if (c.used) return;
    setSelected((prev) => {
      const next = new Set(prev);
      const k = keyOf(c);
      if (next.has(k)) next.delete(k); else next.add(k);
      return next;
    });
  };

  const give = async () => {
    const items = fresh
      .filter((c) => selected.has(keyOf(c)))
      .map(({ packId, monthId, unitId, packTitle, unitTitle, totalWords }) => ({ packId, monthId, unitId, packTitle, unitTitle, totalWords }));
    if (!items.length) return;
    setSaving(true);
    try {
      const hw = await addGroupHomework(centerId, group.id, items);
      const { id, ...data } = hw;
      patchGroup(group.id, (g) => ({ ...g, homeworkList: { ...(g.homeworkList || {}), [id]: data } }));
      navigate(`${groupPath}/homework/${id}`, { replace: true });
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
      setSaving(false);
    }
  };

  const visiblePacks = byPack
    .map((p) => ({ ...p, units: filter === 'new' ? p.units.filter((c) => !c.used) : p.units }))
    .filter((p) => p.units.length > 0);

  return (
    <Page
      back={back}
      title="Yangi vazifa"
      subtitle={`${group.name} · ${fresh.length} ta mavzu hali berilmagan`}
    >
      {all.length === 0 ? (
        <div className="sa-group">
          <EmptyState
            icon={<NotebookPen size={40} />}
            title="Beriladigan mavzu yo'q"
            text="Guruhga biriktirilgan to'plamlarda so'zli mavzu topilmadi. Avval to'plam biriktiring yoki to'plamga so'z qo'shing."
            action={<Button onClick={() => navigate(groupPath)}>Guruhga qaytish</Button>}
          />
        </div>
      ) : (
        <>
          <div className="sa-toolbar">
            <Segmented
              label="Mavzular"
              options={[{ value: 'new', label: `Berilmagan (${fresh.length})` }, { value: 'all', label: `Hammasi (${all.length})` }]}
              value={filter}
              onChange={setFilter}
            />
          </div>

          {visiblePacks.length === 0 && (
            <div className="sa-group"><EmptyState title="Hamma mavzular berilgan" text="Yangi mavzu qo'shish uchun to'plamni kengaytiring." /></div>
          )}

          {visiblePacks.map((p) => (
            <Section key={p.packId} title={p.title}>
              {p.units.map((c) => {
                const on = selected.has(keyOf(c));
                return (
                  <Row
                    key={keyOf(c)}
                    title={c.unitTitle}
                    subtitle={`${c.totalWords} so'z${c.used ? ' · avval berilgan' : ''}`}
                    chevron={false}
                    disabled={c.used}
                    selected={on}
                    onClick={() => toggle(c)}
                    accessory={<span className={`sa-check is-select ${on ? "is-on" : ""} ${c.used ? "is-used" : ""}`} aria-hidden="true">{(on || c.used) && <Check size={14} strokeWidth={3} />}</span>}
                  />
                );
              })}
            </Section>
          ))}
        </>
      )}

      {all.length > 0 && (
        <div className="sa-bottom-bar">
          <span className="sa-bottom-bar-text">{selected.size ? `${selected.size} ta mavzu tanlandi` : 'Mavzularni tanlang'}</span>
          <Button onClick={give} disabled={!selected.size || saving}>{saving ? 'Berilmoqda...' : 'Vazifa berish'}</Button>
        </div>
      )}

      {toastNode}
    </Page>
  );
}
