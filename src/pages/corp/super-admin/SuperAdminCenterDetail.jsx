import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Building2, ChevronRight, KeyRound, Mail, PauseCircle, Pencil, Phone, PlayCircle, Users, Settings } from 'lucide-react';
import { getCenter, updateCenter, setCenterStatus, sendCorpPasswordReset } from '../../../services/corpService';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import DeleteCenterFlow from './DeleteCenterFlow';
import { computeCenterActivity, computeGroupActivity, formatRelative, HEALTH_LABEL } from './centerActivity';
import { Button, EmptyState, Field, LoadingRows, Page, Row, Section, Sheet, Stat, StatusDot } from './ui';
import { useToast } from './useToast';
import { useIsDesktop } from './useIsDesktop';

const HEALTH_TONE = { active: 'green', quiet: 'orange', new: 'gray' };
const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' }) : '—');

export default function SuperAdminCenterDetail() {
  const { centerId } = useParams();
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const [toastNode, showToast] = useToast();

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [confirmSuspend, setConfirmSuspend] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      setCenter(await getCenter(centerId));
    } catch (err) {
      console.error('Error loading center:', err);
      showToast("Markazni yuklab bo'lmadi", 'error');
    } finally {
      setLoading(false);
    }
  }, [centerId, showToast]);

  useEffect(() => { load(); }, [load]);

  const teachers = useMemo(
    () => Object.entries(center?.teachers || {}).map(([id, t]) => ({ id, ...t })),
    [center],
  );
  const groups = useMemo(
    () => Object.entries(center?.groups || {})
      .map(([id, g]) => ({ id, ...g, activity: computeGroupActivity(g) }))
      .sort((a, b) => (a.status === 'archived') - (b.status === 'archived') || (b.activity.lastActivity || 0) - (a.activity.lastActivity || 0)),
    [center],
  );
  const activity = useMemo(
    () => computeCenterActivity(center ? { groups: groups, teachersCount: teachers.length } : null),
    [center, groups, teachers],
  );
  const teacherName = (id) => teachers.find((t) => t.id === id)?.name || '—';
  const groupsOf = (teacherId) => groups.filter((g) => g.teacherId === teacherId && g.status !== 'archived').length;

  const back = { label: 'Markazlar', onClick: () => navigate('/corp/super-admin/centers') };

  if (loading) {
    return (
      <Page title=" " back={back}>
        <div className="sa-hero" style={{ marginBottom: '28px' }}>
          <div className="sa-hero-avatar sa-skel" style={{ width: 64, height: 64, borderRadius: 18 }} />
          <span className="sa-skel sa-skel-line" style={{ width: 140, height: 14, marginTop: 12 }} />
        </div>

        <div className="sa-stats" style={{ marginBottom: '28px' }}>
          <Stat value="–" label="O'qituvchi" />
          <Stat value="–" label="Faol guruh" />
          <Stat value="–" label="O'quvchi" />
          <Stat value="–" label="Bu hafta mashq qildi" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <Section title="Guruhlar">
            <LoadingRows count={3} />
          </Section>
          <Section title="O'qituvchilar">
            <LoadingRows count={2} />
          </Section>
        </div>
      </Page>
    );
  }

  if (!center) {
    return (
      <Page title="Markaz topilmadi" back={back}>
        <div className="sa-group">
          <EmptyState icon={<Building2 size={40} />} title="Bu markaz yo'q" text="U o'chirilgan bo'lishi mumkin." />
        </div>
      </Page>
    );
  }

  const suspended = center.status === 'suspended';
  const name = center.name || `Nomsiz markaz (${center.id})`;

  const saveEdit = async (e) => {
    e.preventDefault();
    const nextName = form.name.trim();
    if (!nextName) return;
    setSaving(true);
    try {
      await updateCenter(center.id, { name: nextName, phone: form.phone.trim() });
      setCenter((c) => ({ ...c, name: nextName, phone: form.phone.trim() }));
      setEditOpen(false);
      showToast('Saqlandi');
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const toggleSuspend = async () => {
    const next = suspended ? 'active' : 'suspended';
    setBusy(true);
    try {
      await setCenterStatus(center.id, next);
      setCenter((c) => ({ ...c, status: next }));
      setConfirmSuspend(false);
      showToast(next === 'suspended' ? "Markaz to'xtatildi" : 'Markaz faollashtirildi');
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
    } finally {
      setBusy(false);
    }
  };

  const resetPassword = async () => {
    if (!center.adminEmail) return;
    setBusy(true);
    try {
      await sendCorpPasswordReset(center.adminEmail);
      showToast(`Parolni tiklash xati ${center.adminEmail} ga yuborildi`);
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
    } finally {
      setBusy(false);
    }
  };

  const openGroup = (g) => navigate(`/corp/super-admin/centers/${center.id}/groups/${g.id}`);

  const groupsSection = (
    <Section title={`Guruhlar (${groups.length})`}>
      {groups.length === 0 ? (
        <Row title="Hali guruh yo'q" subtitle="O'qituvchilar guruh ochganda shu yerda ko'rinadi." />
      ) : isDesktop ? (
        <div className="sa-table is-flat" style={{ '--sa-cols': 'minmax(220px, 2fr) minmax(160px, 1.2fr) 100px 100px 90px minmax(130px, 1fr) 18px' }}>
          <div className="sa-table-head">
            <span>Guruh</span>
            <span>O'qituvchi</span>
            <span className="num">O'quvchi</span>
            <span className="num">Bu hafta faol</span>
            <span className="num">Vazifa</span>
            <span>Oxirgi faollik</span>
            <span />
          </div>
          {groups.map((g) => (
            <button type="button" key={g.id} className="sa-table-row" onClick={() => openGroup(g)}>
              <span className="sa-cell-main">
                <span className={`sa-row-icon tone-${g.status === 'archived' ? 'gray' : 'green'}`}><Users size={16} /></span>
                <span className="sa-cell-text">
                  <span className="sa-cell-title">{g.name || 'Guruh'}</span>
                  <span className="sa-cell-sub">{[g.level, g.status === 'archived' ? 'Arxivda' : null].filter(Boolean).join(' · ') || '—'}</span>
                </span>
              </span>
              <span className="muted sa-cell-sub" style={{ fontSize: 15 }}>{teacherName(g.teacherId)}</span>
              <span className="num">{g.activity.students}</span>
              <span className="num">{g.activity.activeWeek}</span>
              <span className="num">{g.activity.homework}</span>
              <span className="muted">{formatRelative(g.activity.lastActivity)}</span>
              <ChevronRight size={17} className="sa-cell-chevron" />
            </button>
          ))}
        </div>
      ) : (
        groups.map((g) => (
          <Row
            key={g.id}
            icon={<Users size={16} />}
            iconTone={g.status === 'archived' ? 'gray' : 'green'}
            title={g.name || 'Guruh'}
            subtitle={`${teacherName(g.teacherId)} · ${g.activity.students} o'quvchi · ${formatRelative(g.activity.lastActivity)}`}
            onClick={() => openGroup(g)}
          />
        ))
      )}
    </Section>
  );

  const teachersSection = (
    <Section title={`O'qituvchilar (${teachers.length})`}>
      {teachers.length === 0 ? (
        <Row title="Hali o'qituvchi yo'q" subtitle="Markaz admini o'qituvchi qo'shganda shu yerda ko'rinadi." />
      ) : teachers.map((t) => (
        <Row
          key={t.id}
          icon={(t.name || '?').charAt(0).toUpperCase()}
          iconTone="purple"
          title={t.name || "O'qituvchi"}
          subtitle={[t.email, t.phone].filter(Boolean).join(' · ')}
          detail={`${groupsOf(t.id)} guruh`}
        />
      ))}
    </Section>
  );

  return (
    <Page
      back={back}
      title={name}
      subtitle={[center.adminEmail, `Qo'shilgan: ${fmtDate(center.createdAt)}`].filter(Boolean).join(' · ')}
      action={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="sa-status-pill">
            <StatusDot tone={suspended ? 'red' : HEALTH_TONE[activity.health]} />
            {suspended ? "To'xtatilgan" : HEALTH_LABEL[activity.health]}
          </span>
          <button type="button" className="sa-icon-btn" style={{ background: 'var(--sa-fill)', color: 'var(--sa-label)' }} onClick={() => setSettingsOpen(true)}>
            <Settings size={18} />
          </button>
        </div>
      }
    >
      <div className="sa-stats">
        <Stat value={activity.teachers} label="O'qituvchi" />
        <Stat value={activity.groups} label="Faol guruh" />
        <Stat value={activity.students} label="O'quvchi" />
        <Stat value={activity.activeWeek} label="Bu hafta mashq qildi" tone="green" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {groupsSection}
        {teachersSection}
      </div>

      <Sheet open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Boshqaruv va Faollik">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Section title="Faollik">
            <Row title="Bu hafta vazifa" detail={activity.homeworkWeek} />
            <Row title="Jami vazifa" detail={activity.homeworkTotal} />
            <Row title="Oxirgi faollik" detail={formatRelative(activity.lastActivity)} />
          </Section>

          <Section title="Admin">
            <Row icon={<Mail size={16} />} iconTone="blue" title={center.adminEmail || 'Kiritilmagan'} subtitle="Login" />
            <Row icon={<Phone size={16} />} iconTone="green" title={center.phone || 'Kiritilmagan'} subtitle="Telefon" />
          </Section>

          <Section title="Boshqaruv">
            <Row
              icon={<Pencil size={16} />}
              iconTone="gray"
              title="Tahrirlash"
              onClick={() => { setForm({ name: center.name || '', phone: center.phone || '' }); setSettingsOpen(false); setEditOpen(true); }}
            />
            <Row
              icon={<KeyRound size={16} />}
              iconTone="orange"
              title="Parolni tiklash xatini yuborish"
              onClick={resetPassword}
              disabled={busy || !center.adminEmail}
            />
            <Row
              icon={suspended ? <PlayCircle size={16} /> : <PauseCircle size={16} />}
              iconTone={suspended ? 'green' : 'gray'}
              title={suspended ? 'Faollashtirish' : "To'xtatish"}
              onClick={() => { setSettingsOpen(false); setConfirmSuspend(true); }}
            />
          </Section>

          <Section footer="Guruhlar, to'plamlar va o'qituvchilarning markaz hisobi o'chiriladi. O'quvchilar hisobi saqlanadi — ular faqat guruhdan chiqariladi.">
            <Row title="Markazni o'chirish" destructive chevron={false} onClick={() => { setSettingsOpen(false); setDeleteOpen(true); }} />
          </Section>
        </div>
      </Sheet>

      <Sheet open={editOpen} onClose={() => !saving && setEditOpen(false)} title="Markazni tahrirlash">
        <form onSubmit={saveEdit}>
          <Field label="Markaz nomi">
            <input className="sa-input" required autoFocus value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Admin emaili" hint="Loginni o'zgartirib bo'lmaydi.">
            <input className="sa-input" disabled value={center.adminEmail || ''} />
          </Field>
          <Field label="Telefon">
            <input className="sa-input" type="tel" placeholder="+998 90 123 45 67" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </Field>
          <Button type="submit" block disabled={saving}>{saving ? 'Saqlanmoqda...' : 'Saqlash'}</Button>
        </form>
      </Sheet>

      <ConfirmSheet
        open={confirmSuspend}
        title={suspended ? 'Markazni faollashtirasizmi?' : "Markazni to'xtatasizmi?"}
        message={suspended
          ? "Admin va o'qituvchilar yana tizimga kira oladi."
          : "Admin va o'qituvchilar tizimga kira olmay qoladi. Ma'lumotlar saqlanadi."}
        confirmLabel={suspended ? 'Faollashtirish' : "To'xtatish"}
        danger={!suspended}
        busy={busy}
        onConfirm={toggleSuspend}
        onCancel={() => !busy && setConfirmSuspend(false)}
      />

      <DeleteCenterFlow
        open={deleteOpen}
        center={center}
        onClose={() => setDeleteOpen(false)}
        onSuspendInstead={!suspended ? () => { setDeleteOpen(false); setConfirmSuspend(true); } : undefined}
        onDeleted={() => navigate('/corp/super-admin/centers', {
          replace: true,
          state: { toast: `"${name}" o'chirildi. O'quvchilar hisobi saqlandi.` },
        })}
      />

      {toastNode}
    </Page>
  );
}
