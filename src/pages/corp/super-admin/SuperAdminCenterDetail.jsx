import SubscriptionControl from './SubscriptionControl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Building2, ChevronRight, GraduationCap, KeyRound, Mail, PauseCircle, Pencil, Phone, PlayCircle, Users, Settings } from 'lucide-react';
import { getCenter, updateCenter, setCenterStatus, joinGroupAsUser } from '../../../services/corpService';
import { useAuth } from '../../../contexts/AuthContext';
import { ROLE_HOME, setActiveRole, setViewAs } from '../../../utils/activeRole';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import DeleteCenterFlow from './DeleteCenterFlow';
import SetPasswordSheet from './SetPasswordSheet';
import { computeCenterActivity, computeGroupActivity, formatRelative, HEALTH_LABEL } from './centerActivity';
import { Button, EmptyState, Field, LoadingRows, Page, Row, Section, Sheet, Stat, StatusDot } from './ui';
import { useToast } from './useToast';
import { useIsDesktop } from './useIsDesktop';

const HEALTH_TONE = { active: 'green', quiet: 'orange', new: 'gray' };
const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '—');

export default function SuperAdminCenterDetail() {
  const { centerId } = useParams();
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const [toastNode, showToast] = useToast();
  const { user } = useAuth();

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [confirmSuspend, setConfirmSuspend] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      setCenter(await getCenter(centerId));
    } catch (err) {
      console.error('Error loading center:', err);
      showToast("Couldn't load the center", 'error');
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

  const back = { label: 'Centers', onClick: () => navigate('/corp/super-admin/centers') };

  if (loading) {
    return (
      <Page title=" " back={back}>
        <div className="sa-hero" style={{ marginBottom: '28px' }}>
          <div className="sa-hero-avatar sa-skel" style={{ width: 64, height: 64, borderRadius: 18 }} />
          <span className="sa-skel sa-skel-line" style={{ width: 140, height: 14, marginTop: 12 }} />
        </div>

        <div className="sa-stats" style={{ marginBottom: '28px' }}>
          <Stat value="–" label="Teachers" />
          <Stat value="–" label="Active groups" />
          <Stat value="–" label="Students" />
          <Stat value="–" label="Practiced this week" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <Section title="Groups">
            <LoadingRows count={3} />
          </Section>
          <Section title="Teachers">
            <LoadingRows count={2} />
          </Section>
        </div>
      </Page>
    );
  }

  if (!center) {
    return (
      <Page title="Center not found" back={back}>
        <div className="sa-group">
          <EmptyState icon={<Building2 size={40} />} title="This center doesn't exist" text="It may have been deleted." />
        </div>
      </Page>
    );
  }

  const suspended = center.status === 'suspended';
  const name = center.name || `Unnamed center (${center.id})`;

  const saveEdit = async (e) => {
    e.preventDefault();
    const nextName = form.name.trim();
    if (!nextName) return;
    setSaving(true);
    try {
      await updateCenter(center.id, { name: nextName, phone: form.phone.trim() });
      setCenter((c) => ({ ...c, name: nextName, phone: form.phone.trim() }));
      setEditOpen(false);
      showToast('Saved');
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
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
      showToast(next === 'suspended' ? 'Center suspended' : 'Center activated');
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setBusy(false);
    }
  };

  const openGroup = (g) => navigate(`/corp/super-admin/centers/${center.id}/groups/${g.id}`);

  // Super admin: use this center as its admin or as one of its teachers (the
  // panel shows a banner with a way back), or join one of its groups as a student.
  const openAs = (role, teacher) => {
    setViewAs({
      role,
      centerId: center.id,
      centerName: center.name || '',
      ...(role === 'teacher' ? { teacherId: teacher.id, teacherName: teacher.name || '' } : {}),
    });
    window.location.assign(ROLE_HOME[role]);
  };
  const joinAsStudent = async (g) => {
    if (!g.code) { showToast('Group code not found', 'error'); return; }
    setBusy(true);
    try {
      await joinGroupAsUser(g.code, user.uid, { name: user.displayName || user.email || 'Super admin', email: user.email || '' });
      setActiveRole(null);
      window.location.assign(ROLE_HOME.student);
    } catch (err) {
      showToast(err.message || "Couldn't join", 'error');
      setBusy(false);
    }
  };

  const openAsSection = (
    <Section title="Connect to this center">
      <Row
        icon={<Building2 size={16} />}
        iconTone="blue"
        title="Open as center admin"
        subtitle="Manage the center's admin panel with your own account"
        onClick={() => openAs('center_admin')}
      />
      {teachers.length > 0 && (
        <Row
          icon={<Users size={16} />}
          iconTone="purple"
          title="Open as teacher"
          subtitle="Pick a teacher from the list below"
        />
      )}
      {groups.filter((g) => g.status !== 'archived' && g.code).slice(0, 12).map((g) => (
        <Row
          key={g.id}
          icon={<GraduationCap size={16} />}
          iconTone="green"
          title={`Join as a student: ${g.name || 'Group'}`}
          subtitle={teacherName(g.teacherId)}
          onClick={busy ? undefined : () => joinAsStudent(g)}
        />
      ))}
    </Section>
  );

  const groupsSection = (
    <Section title={`Groups (${groups.length})`}>
      {groups.length === 0 ? (
        <Row title="No groups yet" subtitle="Groups appear here once teachers create them." />
      ) : isDesktop ? (
        <div className="sa-table is-flat" style={{ '--sa-cols': 'minmax(220px, 2fr) minmax(160px, 1.2fr) 100px 100px 90px minmax(130px, 1fr) 18px' }}>
          <div className="sa-table-head">
            <span>Group</span>
            <span>Teacher</span>
            <span className="num">Students</span>
            <span className="num">Active this week</span>
            <span className="num">Homework</span>
            <span>Last activity</span>
            <span />
          </div>
          {groups.map((g) => (
            <button type="button" key={g.id} className="sa-table-row" onClick={() => openGroup(g)}>
              <span className="sa-cell-main">
                <span className={`sa-row-icon tone-${g.status === 'archived' ? 'gray' : 'green'}`}><Users size={16} /></span>
                <span className="sa-cell-text">
                  <span className="sa-cell-title">{g.name || 'Group'}</span>
                  <span className="sa-cell-sub">{[g.level, g.status === 'archived' ? 'Archived' : null].filter(Boolean).join(' · ') || '—'}</span>
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
            title={g.name || 'Group'}
            subtitle={`${teacherName(g.teacherId)} · ${g.activity.students} ${g.activity.students === 1 ? 'student' : 'students'} · ${formatRelative(g.activity.lastActivity)}`}
            onClick={() => openGroup(g)}
          />
        ))
      )}
    </Section>
  );

  const teachersSection = (
    <Section title={`Teachers (${teachers.length})`}>
      {teachers.length === 0 ? (
        <Row title="No teachers yet" subtitle="Teachers appear here once the center admin adds them." />
      ) : teachers.map((t) => (
        <Row
          key={t.id}
          icon={(t.name || '?').charAt(0).toUpperCase()}
          iconTone="purple"
          title={t.name || 'Teacher'}
          subtitle={[t.email, t.phone].filter(Boolean).join(' · ')}
          detail={`${groupsOf(t.id)} ${groupsOf(t.id) === 1 ? 'group' : 'groups'}`}
          onClick={() => openAs('teacher', t)}
        />
      ))}
    </Section>
  );

  return (
    <Page
      back={back}
      title={name}
      subtitle={[center.adminEmail, `Joined: ${fmtDate(center.createdAt)}`].filter(Boolean).join(' · ')}
      action={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="sa-status-pill">
            <StatusDot tone={suspended ? 'red' : HEALTH_TONE[activity.health]} />
            {suspended ? 'Suspended' : HEALTH_LABEL[activity.health]}
          </span>
          <button type="button" className="sa-icon-btn" style={{ background: 'var(--sa-fill)', color: 'var(--sa-label)' }} onClick={() => setSettingsOpen(true)}>
            <Settings size={18} />
          </button>
        </div>
      }
    >
      <div className="sa-stats">
        <Stat value={activity.teachers} label="Teachers" />
        <Stat value={activity.groups} label="Active groups" />
        <Stat value={activity.students} label="Students" />
        <Stat value={activity.activeWeek} label="Practiced this week" tone="green" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {openAsSection}
        {groupsSection}
        {teachersSection}
      </div>

      <Sheet open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Manage">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Section title="Activity">
            <Row title="Homework this week" detail={activity.homeworkWeek} />
            <Row title="Homework in total" detail={activity.homeworkTotal} />
            <Row title="Last activity" detail={formatRelative(activity.lastActivity)} />
          </Section>

          <Section title="Admin">
            <Row icon={<Mail size={16} />} iconTone="blue" title={center.adminEmail || 'Not set'} subtitle="Login" />
            <Row icon={<Phone size={16} />} iconTone="green" title={center.phone || 'Not set'} subtitle="Phone" />
          </Section>

          <SubscriptionControl kind="center" basePath={`centers/${centerId}`} onToast={showToast} />

          <Section title="Manage">
            <Row
              icon={<Pencil size={16} />}
              iconTone="gray"
              title="Edit"
              onClick={() => { setForm({ name: center.name || '', phone: center.phone || '' }); setSettingsOpen(false); setEditOpen(true); }}
            />
            <Row
              icon={<KeyRound size={16} />}
              iconTone="orange"
              title="Change the admin's password"
              onClick={() => { setSettingsOpen(false); setPasswordOpen(true); }}
              disabled={!center.adminUid && !center.adminEmail}
            />
            <Row
              icon={suspended ? <PlayCircle size={16} /> : <PauseCircle size={16} />}
              iconTone={suspended ? 'green' : 'gray'}
              title={suspended ? 'Activate' : 'Suspend'}
              onClick={() => { setSettingsOpen(false); setConfirmSuspend(true); }}
            />
          </Section>

          <Section footer="Groups, packs and the teachers' center accounts are deleted. Student accounts are kept — they are only removed from the groups.">
            <Row title="Delete center" destructive chevron={false} onClick={() => { setSettingsOpen(false); setDeleteOpen(true); }} />
          </Section>
        </div>
      </Sheet>

      <Sheet open={editOpen} onClose={() => !saving && setEditOpen(false)} title="Edit center">
        <form onSubmit={saveEdit}>
          <Field label="Center name">
            <input className="sa-input" required autoFocus value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Admin email" hint="The login can't be changed.">
            <input className="sa-input" disabled value={center.adminEmail || ''} />
          </Field>
          <Field label="Phone">
            <input className="sa-input" type="tel" placeholder="+998 90 123 45 67" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </Field>
          <Button type="submit" block disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
        </form>
      </Sheet>

      <SetPasswordSheet en
        open={passwordOpen}
        onClose={() => setPasswordOpen(false)}
        target={{ uid: center.adminUid, email: center.adminEmail, label: name }}
      />

      <ConfirmSheet
        open={confirmSuspend}
        title={suspended ? 'Activate this center?' : 'Suspend this center?'}
        message={suspended
          ? 'The admin and teachers will be able to sign in again.'
          : 'The admin and teachers will no longer be able to sign in. Data is kept.'}
        confirmLabel={suspended ? 'Activate' : 'Suspend'}
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
          state: { toast: `"${name}" was deleted. Student accounts were kept.` },
        })}
      />

      {toastNode}
    </Page>
  );
}
