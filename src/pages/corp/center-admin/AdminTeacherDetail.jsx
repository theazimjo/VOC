import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { KeyRound, Pencil, Phone, Settings, Users } from 'lucide-react';
import { removeTeacherFromCenter, updateTeacherProfile } from '../../../services/corpService';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { formatRelative } from '../super-admin/centerActivity';
import { Button, EmptyState, Field, LoadingRows, Page, Row, Section, Sheet, Stat } from '../super-admin/ui';
import SetPasswordSheet from '../super-admin/SetPasswordSheet';
import { useToast } from '../super-admin/useToast';
import { useCenterData } from './CenterDataContext';

const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' }) : '—');

export default function AdminTeacherDetail() {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const [toastNode, showToast] = useToast();
  const { centerId, loading, teacherById, groups, patch } = useCenterData();

  const [manageOpen, setManageOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [busy, setBusy] = useState(false);

  const teacher = teacherById[teacherId];
  const ownGroups = useMemo(
    () => groups
      .filter((g) => g.teacherId === teacherId)
      .sort((a, b) => (a.status === 'archived') - (b.status === 'archived') || (b.activity.lastActivity || 0) - (a.activity.lastActivity || 0)),
    [groups, teacherId],
  );

  const back = { label: "O'qituvchilar", onClick: () => navigate('/corp/admin/teachers') };

  if (loading) {
    return <Page title=" " back={back}><LoadingRows count={4} /></Page>;
  }
  if (!teacher) {
    return (
      <Page title="O'qituvchi topilmadi" back={back}>
        <div className="sa-group"><EmptyState icon={<Users size={40} />} title="Bu o'qituvchi yo'q" text="U o'chirilgan bo'lishi mumkin." /></div>
      </Page>
    );
  }

  const activeGroupsCount = ownGroups.filter((g) => g.status !== 'archived').length;

  const saveEdit = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return;
    setBusy(true);
    try {
      await updateTeacherProfile(centerId, teacher.id, teacher.uid, { name, phone: form.phone.trim() });
      patch((c) => ({
        ...c,
        teachers: { ...c.teachers, [teacher.id]: { ...c.teachers[teacher.id], name, phone: form.phone.trim() } },
      }));
      setEditOpen(false);
      showToast('Saqlandi');
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    setBusy(true);
    try {
      await removeTeacherFromCenter(centerId, teacher.id, teacher.uid);
      patch((c) => {
        const next = { ...c.teachers };
        delete next[teacher.id];
        return { ...c, teachers: next };
      });
      navigate('/corp/admin/teachers', { replace: true });
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
      setBusy(false);
    }
  };

  // Teachers the admin created log in with their phone; ones who joined
  // with their own account use their email.
  const login = teacher.email?.endsWith('@markaz.uz') && teacher.phone ? teacher.phone : teacher.email;

  return (
    <Page
      back={back}
      title={teacher.name || "O'qituvchi"}
      subtitle={[teacher.phone || teacher.email, `Qo'shilgan: ${fmtDate(teacher.createdAt)}`].filter(Boolean).join(' · ')}
      action={
        <button type="button" className="sa-icon-btn is-gray" onClick={() => setManageOpen(true)} aria-label="Boshqaruv">
          <Settings size={18} />
        </button>
      }
    >
      <div className="sa-stats">
        <Stat value={teacher.groupsCount} label="Faol guruh" />
        <Stat value={teacher.studentsCount} label="O'quvchi" />
        <Stat value={teacher.activeWeek} label="Bu hafta mashq qildi" tone="green" />
        <Stat value={formatRelative(teacher.lastActivity)} label="Oxirgi faollik" />
      </div>

      <Section title={`Guruhlar (${ownGroups.length})`}>
        {ownGroups.length === 0 ? (
          <Row title="Hali guruh yo'q" subtitle="O'qituvchi o'z panelida guruh ochadi." />
        ) : ownGroups.map((g) => (
          <Row
            key={g.id}
            icon={<Users size={16} />}
            iconTone={g.status === 'archived' ? 'gray' : 'green'}
            title={g.name || 'Guruh'}
            subtitle={[
              g.status === 'archived' ? 'Arxivda' : g.level,
              `${g.activity.students} o'quvchi`,
              formatRelative(g.activity.lastActivity),
            ].filter(Boolean).join(' · ')}
            detail={g.activity.students ? `${g.activity.activeWeek}/${g.activity.students} faol` : null}
            onClick={() => navigate(`/corp/admin/groups/${g.id}`)}
          />
        ))}
      </Section>

      <Sheet open={manageOpen} onClose={() => setManageOpen(false)} title="Boshqaruv">
        <Section title="Kirish">
          <Row icon={<Phone size={16} />} iconTone="green" title={login || '—'} subtitle="Login" />
        </Section>
        <Section>
          <Row
            icon={<Pencil size={16} />}
            iconTone="gray"
            title="Tahrirlash"
            onClick={() => { setForm({ name: teacher.name || '', phone: teacher.phone || '' }); setManageOpen(false); setEditOpen(true); }}
          />
          <Row
            icon={<KeyRound size={16} />}
            iconTone="orange"
            title="Parolni o'zgartirish"
            disabled={!teacher.uid}
            onClick={() => { setManageOpen(false); setPasswordOpen(true); }}
          />
        </Section>
        <Section footer={activeGroupsCount
          ? `${activeGroupsCount} ta faol guruhi o'qituvchisiz qoladi. O'quvchilar guruhda qoladi.`
          : "O'qituvchi markaz paneliga kira olmay qoladi."}
        >
          <Row title="Markazdan chiqarish" destructive chevron={false} onClick={() => { setManageOpen(false); setConfirmRemove(true); }} />
        </Section>
      </Sheet>

      <Sheet open={editOpen} onClose={() => !busy && setEditOpen(false)} title="Tahrirlash">
        <form onSubmit={saveEdit}>
          <Field label="Ism familiya">
            <input className="sa-input" required autoFocus value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Telefon" hint="Login o'zgarmaydi — faqat ko'rsatiladigan raqam.">
            <input className="sa-input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </Field>
          <Button type="submit" block disabled={busy}>{busy ? 'Saqlanmoqda...' : 'Saqlash'}</Button>
        </form>
      </Sheet>

      <SetPasswordSheet
        open={passwordOpen}
        onClose={() => setPasswordOpen(false)}
        target={{ uid: teacher.uid, email: teacher.email, login, label: teacher.name }}
      />

      <ConfirmSheet
        open={confirmRemove}
        title={`${teacher.name} markazdan chiqarilsinmi?`}
        message={activeGroupsCount
          ? `U endi kira olmaydi. ${activeGroupsCount} ta guruhi o'qituvchisiz qoladi.`
          : 'U endi markaz paneliga kira olmaydi.'}
        confirmLabel="Chiqarish"
        danger
        busy={busy}
        onConfirm={remove}
        onCancel={() => !busy && setConfirmRemove(false)}
      />

      {toastNode}
    </Page>
  );
}
