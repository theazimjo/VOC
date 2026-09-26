import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Archive, ChevronRight, Megaphone, Plus, Users } from 'lucide-react';
import { createGroup } from '../../../services/corpService';
import { formatRelative } from '../super-admin/centerActivity';
import { Button, EmptyState, Field, LoadingRows, Page, Row, SearchField, Section, Sheet, Stat, StatusDot } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useTeacherData } from './TeacherDataContext';

const DAY = 24 * 60 * 60 * 1000;

function activityTone(ts) {
  if (!ts) return 'gray';
  return Date.now() - ts <= 7 * DAY ? 'green' : 'orange';
}

// "Guruhlarim" — the teacher's home. Each group shows the two things a
// teacher checks before a lesson: who practiced this week and who did the
// last homework.
export default function TeacherGroups() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { loading, teacherName, activeGroups, archivedGroups, totals, announcements } = useTeacherData();
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);

  const q = search.trim().toLowerCase();
  const visible = useMemo(
    () => activeGroups.filter((g) => !q || [g.name, g.level, g.code].some((v) => (v || '').toLowerCase().includes(q))),
    [activeGroups, q],
  );

  const open = (g) => navigate(`/corp/teacher/group/${g.id}`);
  const hwLabel = (g) => (g.latestHw ? `${g.latestHwDone}/${g.activity.students} bajardi` : "Vazifa yo'q");
  const firstName = (teacherName || '').split(' ')[0];

  return (
    <Page
      title="Guruhlarim"
      subtitle={loading ? ' ' : firstName ? `Salom, ${firstName}` : null}
      action={
        <button type="button" className="sa-icon-btn" onClick={() => setCreateOpen(true)} aria-label="Yangi guruh">
          <Plus size={20} strokeWidth={2.6} />
        </button>
      }
    >
      {announcements.length > 0 && (
        <Section>
          {announcements.map((a) => (
            <Row key={a.id} icon={<Megaphone size={16} />} iconTone="orange" title={a.title} subtitle={a.message} />
          ))}
        </Section>
      )}

      <div className="sa-stats is-3">
        <Stat value={loading ? '–' : totals.groups} label="Faol guruh" />
        <Stat value={loading ? '–' : totals.students} label="O'quvchi" />
        <Stat value={loading ? '–' : totals.activeWeek} label="Bu hafta mashq qildi" tone="green" />
      </div>

      {activeGroups.length > 5 && (
        <div className="sa-toolbar">
          <SearchField value={search} onChange={setSearch} placeholder="Guruh nomi yoki kodi" />
        </div>
      )}

      {loading ? (
        <LoadingRows count={4} />
      ) : visible.length === 0 ? (
        <div className="sa-group">
          {activeGroups.length === 0 ? (
            <EmptyState
              icon={<Users size={40} />}
              title="Birinchi guruhingizni oching"
              text="Guruh ochilgach, o'quvchilar QR kodni skanerlab o'zlari qo'shiladi. Keyin so'z to'plamini biriktirib, vazifa berasiz."
              action={<Button onClick={() => setCreateOpen(true)}>Guruh ochish</Button>}
            />
          ) : (
            <EmptyState title="Hech narsa topilmadi" text="Qidiruvni o'zgartirib ko'ring." />
          )}
        </div>
      ) : isDesktop ? (
        <div className="sa-table" style={{ '--sa-cols': 'minmax(220px, 2fr) 100px 130px 160px minmax(140px, 1fr) 20px' }}>
          <div className="sa-table-head">
            <span>Guruh</span>
            <span className="num">O'quvchi</span>
            <span className="num">Bu hafta faol</span>
            <span>Oxirgi vazifa</span>
            <span>Oxirgi faollik</span>
            <span />
          </div>
          {visible.map((g) => (
            <button type="button" key={g.id} className="sa-table-row" onClick={() => open(g)}>
              <span className="sa-cell-main">
                <span className="sa-row-icon tone-green"><Users size={16} /></span>
                <span className="sa-cell-text">
                  <span className="sa-cell-title">{g.name || 'Guruh'}</span>
                  <span className="sa-cell-sub">{[g.level, g.code && `Kod ${g.code}`].filter(Boolean).join(' · ')}</span>
                </span>
              </span>
              <span className="num">{g.activity.students}</span>
              <span className="num">{g.activity.students ? `${g.activity.activeWeek} / ${g.activity.students}` : '—'}</span>
              <span className="muted">{hwLabel(g)}</span>
              <span className="sa-cell-status">
                <StatusDot tone={activityTone(g.activity.lastActivity)} />
                {formatRelative(g.activity.lastActivity)}
              </span>
              <ChevronRight size={17} className="sa-cell-chevron" />
            </button>
          ))}
        </div>
      ) : (
        <div className="sa-group">
          {visible.map((g) => (
            <Row
              key={g.id}
              icon={<Users size={16} />}
              iconTone="green"
              title={g.name || 'Guruh'}
              subtitle={`${g.activity.students} o'quvchi · ${hwLabel(g)}`}
              detail={g.activity.students ? `${g.activity.activeWeek} faol` : null}
              onClick={() => open(g)}
            />
          ))}
        </div>
      )}

      {archivedGroups.length > 0 && (
        <Section>
          <Row
            icon={<Archive size={16} />}
            iconTone="gray"
            title="Arxivdagi guruhlar"
            detail={archivedGroups.length}
            onClick={() => navigate('/corp/teacher/archive')}
          />
        </Section>
      )}

      <CreateGroupSheet open={createOpen} onClose={() => setCreateOpen(false)} onCreated={open} />
    </Page>
  );
}

function CreateGroupSheet({ open, onClose, onCreated }) {
  const { centerId, teacherId, patch } = useTeacherData();
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    setName('');
    setError('');
  }, [open]);

  const submit = async (e) => {
    e.preventDefault();
    const title = name.trim();
    if (!title) return;
    setSaving(true);
    setError('');
    try {
      const group = await createGroup(centerId, teacherId, { name: title });
      patch((c) => ({ ...c, groups: { ...(c.groups || {}), [group.id]: group } }));
      onClose();
      onCreated(group);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onClose={() => !saving && onClose()} title="Yangi guruh">
      <form onSubmit={submit}>
        <Field label="Guruh nomi" hint="O'quvchilar ham shu nomni ko'radi.">
          <input className="sa-input" required autoFocus placeholder="Du-Chor-Ju 17:00" value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        {error && <p className="sa-flow-error">{error}</p>}
        <Button type="submit" block disabled={saving || !name.trim()}>{saving ? 'Ochilmoqda...' : 'Guruh ochish'}</Button>
      </form>
    </Sheet>
  );
}
