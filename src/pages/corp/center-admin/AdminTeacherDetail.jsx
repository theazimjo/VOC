import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Building2, Check, ChevronLeft, KeyRound,
  Settings, Trash2, UserCheck, Users, X,
} from 'lucide-react';
import {
  changeTeacherRole, removeTeacherFromCenter, updateTeacherProfile,
} from '../../../services/corpService';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { formatRelativeEn } from '../super-admin/centerActivity';
import { EmptyState, LoadingRows, Page, Row } from '../super-admin/ui';
import SetPasswordSheet from '../super-admin/SetPasswordSheet';
import { useToast } from '../super-admin/useToast';
import { useCenterData } from './CenterDataContext';
import { ClassesTab, ReportsTab, useOwnGroupsCount } from './ClassesTab';

const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '—');

function RoleTeacherIcon({ active }) {
  const color = active ? "#22c55e" : "#0284c7";
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="8" width="28" height="20" rx="2" fill={active ? "#e6f4ea" : "none"} />
      <circle cx="10" cy="18" r="3" />
      <path d="M5 28C5 24 7.5 22.5 10 22.5C12.5 22.5 15 24 15 28" />
      <path d="M12 21L18 16" />
      <circle cx="21" cy="35" r="2" />
      <circle cx="28" cy="35" r="2" />
      <circle cx="35" cy="35" r="2" />
      <path d="M18 41C18 38 19.5 37 21 37C22.5 37 24 38 24 41" />
      <path d="M25 41C25 38 26.5 37 28 37C29.5 37 31 38 31 41" />
      <path d="M32 41C32 38 33.5 37 35 37C36.5 37 38 38 38 41" />
    </svg>
  );
}

function RoleSchoolAdminIcon({ active }) {
  const color = active ? "#2563eb" : "#0284c7";
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 8L10 17V39H38V17L24 8Z" fill={active ? "#eff6ff" : "none"} />
      <path d="M24 8V4M24 4L29 6.5" />
      <circle cx="24" cy="21" r="3" />
      <path d="M24 19.5V21H25.5" />
      <path d="M16 27V33M19 27V33" />
      <path d="M29 27V33M32 27V33" />
      <path d="M24 39V33" />
    </svg>
  );
}

export default function AdminTeacherDetail() {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const [toastNode, showToast] = useToast();
  const { centerId, centerName, loading, teacherById, groups, patch } = useCenterData();

  const [activeTab, setActiveTab] = useState('classes');
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    role: 'teacher',
  });
  const [busy, setBusy] = useState(false);

  const teacher = teacherById[teacherId];
  const activeGroupsCount = useOwnGroupsCount(groups, teacherId);

  const back = { label: 'Faculty', onClick: () => navigate('/corp/admin/teachers') };

  if (loading) {
    return <Page title=" " back={back}><LoadingRows count={4} /></Page>;
  }
  if (!teacher) {
    return (
      <Page title="Teacher not found" back={back}>
        <div className="sa-group"><EmptyState icon={<Users size={40} />} title="This teacher doesn't exist" text="They may have been removed." /></div>
      </Page>
    );
  }

  const login = teacher.email?.endsWith('@markaz.uz') && teacher.phone ? teacher.phone : teacher.email;
  const roleName = teacher.role === 'School Admin' || teacher.role === 'admin' ? 'School Admin' : 'Teacher';

  const currentRole = teacher?.role === 'admin' ? 'admin' : 'teacher';

  const openEditModal = () => {
    let first = '';
    let last = '';
    if (teacher?.name) {
      if (teacher.name.includes(',')) {
        const [l, f] = teacher.name.split(',');
        first = f?.trim() || '';
        last = l?.trim() || '';
      } else {
        const parts = teacher.name.trim().split(' ');
        first = parts[0] || '';
        last = parts.slice(1).join(' ') || '';
      }
    }
    const roleVal = teacher.role === 'School Admin' || teacher.role === 'admin' ? 'admin' : 'teacher';
    setForm({
      firstName: first,
      lastName: last,
      phone: teacher.phone || '',
      role: roleVal,
    });
    setEditOpen(true);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
    if (!fullName) return;
    setBusy(true);
    try {
      const roleVal = form.role;
      await updateTeacherProfile(centerId, teacher.id, teacher.uid, { name: fullName, phone: form.phone.trim() });
      const roleChanged = roleVal !== currentRole;
      if (roleChanged) {
        await changeTeacherRole(centerId, teacher.id, teacher.uid, roleVal);
      }
      patch((c) => ({
        ...c,
        teachers: {
          ...c.teachers,
          [teacher.id]: {
            ...c.teachers[teacher.id],
            name: fullName,
            phone: form.phone.trim(),
            role: roleVal === 'admin' ? 'admin' : null,
          },
        },
      }));
      setEditOpen(false);
      showToast(
        roleChanged
          ? (roleVal === 'admin' ? 'Assigned as School Admin' : 'Changed back to Teacher')
          : 'Saved',
      );
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
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
      showToast(`Error: ${err.message}`, 'error');
      setBusy(false);
    }
  };

  return (
    <Page hideHeader>
      <div className="teacher-detail-page">
        {/* White band (back link + header + tabs), full-bleed against the
            layout's tinted background — matches the reference exactly:
            only the content below the tabs sits on the tinted area. Renders
            its own back button (instead of Page's back prop) so it can
            live inside this band. */}
        <div className="teacher-detail-topband">
          <button type="button" className="sa-back" onClick={back.onClick}>
            <ChevronLeft size={20} strokeWidth={2.6} />
            <span>{back.label}</span>
          </button>

          {/* Header: matches the Typing.com School Admin reference — big
              title, role badge underneath, an outlined settings button on
              the right (see .claude/image.png). */}
          <div className="teacher-detail-header">
            <div className="ca-person-head">
              <span className="ca-person-head-avatar" aria-hidden="true">{(teacher.name || 'T').charAt(0).toUpperCase()}</span>
              <div className="ca-person-head-text">
                <h1 className="teacher-detail-title">{teacher.name || 'Teacher'}</h1>
                <div className="ca-person-head-meta">
                  <span className="teacher-role-badge">
                    <UserCheck size={13} /> {roleName}
                  </span>
                  {(teacher.phone || teacher.email) && <span>{teacher.phone || teacher.email}</span>}
                  {teacher.createdAt && <span>Joined {fmtDate(teacher.createdAt)}</span>}
                </div>
              </div>
            </div>
            <button type="button" className="teacher-settings-btn" onClick={openEditModal}>
              <Settings size={16} /> {roleName} Settings
            </button>
          </div>

          {/* Sub-tabs: Schools | Classes | Reports | Logins */}
          <div className="teacher-nav-tabs">
            <button type="button" className={`teacher-nav-tab ${activeTab === 'schools' ? 'is-active' : ''}`} onClick={() => setActiveTab('schools')}>
              Schools
            </button>
            <button type="button" className={`teacher-nav-tab ${activeTab === 'classes' ? 'is-active' : ''}`} onClick={() => setActiveTab('classes')}>
              Classes
            </button>
            <button type="button" className={`teacher-nav-tab ${activeTab === 'reports' ? 'is-active' : ''}`} onClick={() => setActiveTab('reports')}>
              Reports
            </button>
            <button type="button" className={`teacher-nav-tab ${activeTab === 'logins' ? 'is-active' : ''}`} onClick={() => setActiveTab('logins')}>
              Logins
            </button>
          </div>
        </div>

        {activeTab === 'classes' && (
          <ClassesTab centerId={centerId} ownerId={teacher.id} ownerName={teacher.name} groups={groups} patch={patch} showToast={showToast} />
        )}

        {activeTab === 'schools' && (
          <section className="ca-card ca-info-card">
            <div className="ca-card-head">
              <div>
                <h3 className="ca-card-title"><Building2 size={15} /> School details</h3>
                <span className="ca-card-sub">Where {teacher.name || 'they'} teaches</span>
              </div>
            </div>
            <dl className="ca-info-list">
              <div><dt>Center</dt><dd>{centerName || 'Center'}</dd></div>
              <div><dt>Role</dt><dd>{roleName}</dd></div>
              <div><dt>Phone</dt><dd>{teacher.phone || '—'}</dd></div>
              <div><dt>Email</dt><dd>{teacher.email || '—'}</dd></div>
              <div><dt>Joined</dt><dd>{fmtDate(teacher.createdAt)}</dd></div>
            </dl>
          </section>
        )}

        {activeTab === 'reports' && <ReportsTab groups={groups} ownerId={teacher.id} />}

        {activeTab === 'logins' && (
          <section className="ca-card ca-info-card">
            <div className="ca-card-head">
              <div>
                <h3 className="ca-card-title"><KeyRound size={15} /> Login &amp; security</h3>
                <span className="ca-card-sub">How {teacher.name || 'they'} sign{teacher.name ? 's' : ''} in</span>
              </div>
              <button type="button" className="faculty-btn-secondary" onClick={() => setPasswordOpen(true)}>
                <KeyRound size={14} /> Change password
              </button>
            </div>
            <dl className="ca-info-list">
              <div><dt>Login</dt><dd className="is-mono">{login || '—'}</dd></div>
              <div><dt>Last activity</dt><dd>{formatRelativeEn(teacher.lastActivity)}</dd></div>
            </dl>
          </section>
        )}

        {/* Edit Information Modal matching user screenshot */}
        {editOpen && (
          <div className="adm-modal-overlay" onClick={() => !busy && setEditOpen(false)}>
            <div className="teacher-info-modal-card" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={saveEdit}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                  <h2 className="teacher-info-modal-title" style={{ margin: 0 }}>{teacher.name || "User"}'s Information</h2>
                  <button
                    type="button"
                    className="faculty-icon-btn"
                    onClick={() => !busy && setEditOpen(false)}
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="teacher-info-divider" style={{ marginTop: 14 }} />

                <div className="teacher-info-section">
                  <label className="teacher-info-section-label">Select a Role</label>
                  <div className="teacher-role-cards-grid">
                    {/* Teacher Card */}
                    <div
                      className={`teacher-role-card ${form.role === 'teacher' ? 'is-selected role-teacher' : ''}`}
                      onClick={() => setForm({ ...form, role: 'teacher' })}
                    >
                      {form.role === 'teacher' && (
                        <div className="role-check-badge role-check-green">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                      <div className="role-card-icon-wrap">
                        <RoleTeacherIcon active={form.role === 'teacher'} />
                      </div>
                      <span className="role-card-title">Teacher</span>
                    </div>

                    {/* School Admin Card */}
                    <div
                      className={`teacher-role-card ${form.role === 'admin' ? 'is-selected role-admin' : ''}`}
                      onClick={() => setForm({ ...form, role: 'admin' })}
                    >
                      {form.role === 'admin' && (
                        <div className="role-check-badge role-check-blue">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                      <div className="role-card-icon-wrap">
                        <RoleSchoolAdminIcon active={form.role === 'admin'} />
                      </div>
                      <span className="role-card-title">School Admin</span>
                    </div>
                  </div>
                </div>

                <div className="teacher-info-section" style={{ marginTop: 24 }}>
                  <label className="teacher-info-section-label">
                    {form.role === 'admin' ? 'Admin Details' : 'Teacher Details'}
                  </label>
                  <div className="teacher-info-name-grid">
                    <div>
                      <label className="teacher-info-input-label">
                        First Name <span className="req-star">*</span>
                      </label>
                      <input
                        className="teacher-info-input"
                        required
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="teacher-info-input-label">
                        Last Name <span className="req-star">*</span>
                      </label>
                      <input
                        className="teacher-info-input"
                        required
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className="teacher-info-input-label">Phone</label>
                      <input
                        className="teacher-info-input"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 14, borderTop: '1px solid #f1f5f9' }}>
                  <Row
                    icon={<KeyRound size={16} />}
                    iconTone="orange"
                    title="Change Password"
                    disabled={!teacher.uid}
                    onClick={() => { setEditOpen(false); setPasswordOpen(true); }}
                  />
                  <Row
                    icon={<Trash2 size={16} />}
                    iconTone="red"
                    title="Remove from Center"
                    destructive
                    chevron={false}
                    onClick={() => { setEditOpen(false); setConfirmRemove(true); }}
                  />
                </div>

                <div className="teacher-info-modal-foot">
                  <button
                    type="button"
                    className="teacher-info-btn-cancel"
                    onClick={() => !busy && setEditOpen(false)}
                    disabled={busy}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="teacher-info-btn-submit" disabled={busy}>
                    {busy ? 'Saving...' : 'Edit Account'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <SetPasswordSheet
          open={passwordOpen}
          onClose={() => setPasswordOpen(false)}
          target={{ uid: teacher.uid, email: teacher.email, login, label: teacher.name }}
          en
        />

        <ConfirmSheet
          open={confirmRemove}
          title={`Remove ${teacher.name} from the center?`}
          message={activeGroupsCount
            ? `They will no longer be able to sign in. ${activeGroupsCount} of their classes will be left without a teacher.`
            : 'They will no longer be able to sign in to the center panel.'}
          confirmLabel="Remove"
          cancelLabel="Cancel"
          danger
          busy={busy}
          onConfirm={remove}
          onCancel={() => !busy && setConfirmRemove(false)}
        />

        {toastNode}
      </div>
    </Page>
  );
}
