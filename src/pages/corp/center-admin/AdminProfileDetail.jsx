import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Building2, ChevronLeft, KeyRound, Trash2, UserCheck, Users } from 'lucide-react';
import { auth } from '../../../firebase';
import { removeCenterAdmin } from '../../../services/corpService';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { EmptyState, LoadingRows, Page } from '../super-admin/ui';
import SetPasswordSheet from '../super-admin/SetPasswordSheet';
import { useToast } from '../super-admin/useToast';
import { useCenterData } from './CenterDataContext';
import { ClassesTab, ReportsTab, useOwnGroupsCount } from './ClassesTab';

function nameFromEmail(email) {
  if (!email) return 'Admin';
  return email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '—');

// /corp/admin/admins/:uid — the same page shell as AdminTeacherDetail (the
// topband/header/role-badge look, see .teacher-detail-* classes) for an
// admin who has no `centers/{id}/teachers/{}` record: the center's
// original admin (adminUid) or a co-admin invited via inviteCenterAdmin
// (see coAdmins in CenterDataContext). All 4 tabs, same as a teacher —
// Classes/Reports work identically for an admin, since a group's
// `teacherId` is just a foreign key to whoever runs it (see
// ClassesTab.jsx); CenterDataContext resolves it back to this admin's name
// wherever a class's owner is shown (Groups list, Group Detail, etc.).
export default function AdminProfileDetail() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [toastNode, showToast] = useToast();
  const { centerId, centerName, loading, admins, groups, center, patch } = useCenterData();
  const myUid = auth.currentUser?.uid;

  const [activeTab, setActiveTab] = useState('classes');
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [busy, setBusy] = useState(false);

  const admin = admins.find((a) => a.uid === uid);
  const activeGroupsCount = useOwnGroupsCount(groups, uid);
  const back = { label: 'Faculty', onClick: () => navigate('/corp/admin/teachers') };

  if (loading) {
    return <Page title=" " back={back}><LoadingRows count={4} /></Page>;
  }
  if (!admin) {
    return (
      <Page title="Admin not found" back={back}>
        <div className="sa-group"><EmptyState icon={<Users size={40} />} title="This admin doesn't exist" text="Their access may have already been removed." /></div>
      </Page>
    );
  }

  const isYou = admin.uid === myUid;
  const isPrimary = admin.kind === 'primary';
  const name = nameFromEmail(admin.email);
  const joined = isPrimary ? center?.createdAt : admin.invitedAt;

  const removeAdmin = async () => {
    setBusy(true);
    try {
      await removeCenterAdmin(centerId, admin.uid);
      patch((c) => {
        const next = { ...(c.coAdmins || {}) };
        delete next[admin.uid];
        return { ...c, coAdmins: next };
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
        <div className="teacher-detail-topband">
          <button type="button" className="sa-back" onClick={back.onClick}>
            <ChevronLeft size={20} strokeWidth={2.6} />
            <span>{back.label}</span>
          </button>

          <div className="teacher-detail-header">
            <div className="ca-person-head">
              <span className="ca-person-head-avatar" aria-hidden="true">{(name || 'A').charAt(0).toUpperCase()}</span>
              <div className="ca-person-head-text">
                <h1 className="teacher-detail-title">{name}{isYou && ' (You)'}</h1>
                <div className="ca-person-head-meta">
                  <span className="teacher-role-badge">
                    <UserCheck size={13} /> Admin
                  </span>
                  {admin.email && <span>{admin.email}</span>}
                  {joined && <span>Joined {fmtDate(joined)}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="teacher-nav-tabs">
            <button type="button" className={`teacher-nav-tab ${activeTab === 'school' ? 'is-active' : ''}`} onClick={() => setActiveTab('school')}>
              School
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
          <ClassesTab centerId={centerId} ownerId={admin.uid} ownerName={name} groups={groups} patch={patch} showToast={showToast} />
        )}

        {activeTab === 'school' && (
          <section className="ca-card ca-info-card">
            <div className="ca-card-head">
              <div>
                <h3 className="ca-card-title"><Building2 size={15} /> School details</h3>
                <span className="ca-card-sub">{isPrimary ? "This center's original admin" : 'Invited as School Admin'}</span>
              </div>
            </div>
            <dl className="ca-info-list">
              <div><dt>Center</dt><dd>{centerName || 'Center'}</dd></div>
              <div><dt>Role</dt><dd>Admin</dd></div>
              <div><dt>Email</dt><dd>{admin.email || '—'}</dd></div>
              <div><dt>Joined</dt><dd>{joined ? fmtDate(joined) : 'Unknown'}</dd></div>
            </dl>
          </section>
        )}

        {activeTab === 'reports' && <ReportsTab groups={groups} ownerId={admin.uid} />}

        {activeTab === 'logins' && (
          <section className="ca-card ca-info-card">
            <div className="ca-card-head">
              <div>
                <h3 className="ca-card-title"><KeyRound size={15} /> Login &amp; security</h3>
                <span className="ca-card-sub">Signs in with email and password</span>
              </div>
              {isYou && (
                <button type="button" className="faculty-btn-secondary" onClick={() => setPasswordOpen(true)}>
                  <KeyRound size={14} /> Change password
                </button>
              )}
            </div>
            <dl className="ca-info-list">
              <div><dt>Login</dt><dd className="is-mono">{admin.email || '—'}</dd></div>
            </dl>
            {!isPrimary && !isYou && (
              <div className="ca-info-danger">
                <div>
                  <b>Remove admin access</b>
                  <span>They will no longer be able to sign in to this center.</span>
                </div>
                <button type="button" className="faculty-btn-delete" onClick={() => setConfirmRemove(true)}>
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            )}
          </section>
        )}

        {isYou && (
          <SetPasswordSheet
            open={passwordOpen}
            onClose={() => setPasswordOpen(false)}
            target={{ uid: admin.uid, email: admin.email, label: name }}
            en
          />
        )}

        <ConfirmSheet
          open={confirmRemove}
          title={`Remove ${name}'s admin access?`}
          message={activeGroupsCount
            ? `They will no longer be able to sign in. ${activeGroupsCount} of their classes will be left without an owner.`
            : "They will no longer be able to sign in to this center's admin panel."}
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          danger
          busy={busy}
          onConfirm={removeAdmin}
          onCancel={() => !busy && setConfirmRemove(false)}
        />

        {toastNode}
      </div>
    </Page>
  );
}
