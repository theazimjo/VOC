import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Ban, CheckCircle2, KeyRound, Users } from 'lucide-react';
import { getPlatformUser, sendCorpPasswordReset, deleteCorpUser, setCorpUserDisabled, getAllCenters } from '../../../services/corpService';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Page, Section, Row, Stat, StatusDot, LoadingRows } from './ui';
import { useToast } from './useToast';
import SetPasswordSheet from './SetPasswordSheet';
import './sa.css';

// Helpers from SuperAdminUsers (simplified)
const KIND_TONE = { center_admin: 'blue', teacher: 'purple', student: 'green', personal: 'gray' };
const KIND_LABEL = { center_admin: 'Admin', teacher: 'Teacher', student: 'Student (in a group)', personal: 'Personal' };

function kindOf(u) {
  if (u.corpRole) return u.corpRole; // center_admin | teacher
  if (u.memberships?.length > 0) return 'student';
  return 'personal';
}

function initialOf(u) {
  return (u.name || u.email || '?').charAt(0).toUpperCase();
}

function displayName(u) {
  return u.name || u.email?.split('@')[0] || 'Unnamed user';
}

function fmtDate(iso) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(iso));
}

function recency(iso) {
  if (!iso) return { label: 'Never signed in', tone: 'gray' };
  const d = Math.floor((Date.now() - new Date(iso)) / 1000 / 60 / 60 / 24);
  if (d === 0) return { label: 'Today', tone: 'green' };
  if (d < 7) return { label: `${d} ${d === 1 ? 'day' : 'days'} ago`, tone: 'green' };
  if (d < 30) return { label: `${d} days ago`, tone: 'orange' };
  return { label: 'Over 30 days ago', tone: 'red' };
}

function lastSeenText(u) {
  if (!u.lastSeen) return 'Has never signed in';
  return new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(u.lastSeen));
}

export default function SuperAdminUserDetail() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [toastNode, showToast] = useToast();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [centerNames, setCenterNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [u, centers] = await Promise.all([
          getPlatformUser(uid),
          getAllCenters()
        ]);
        setUser(u);
        const cnames = {};
        for (const c of centers) cnames[c.id] = c.name;
        setCenterNames(cnames);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [uid]);

  const handleReset = async () => {
    setBusy(true);
    try {
      await sendCorpPasswordReset(user.email);
      showToast(`A password reset email was sent to ${user.email}`);
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setBusy(false);
    }
  };

  const runConfirmed = async () => {
    if (!confirm) return;
    const { kind } = confirm;
    setBusy(true);
    try {
      if (kind === 'remove') {
        await deleteCorpUser(user.uid);
        setUser({ ...user, corpRole: null, corpCenterName: '', disabled: false });
        showToast('Center panel access removed');
      } else {
        await setCorpUserDisabled(user.uid, !user.disabled);
        setUser({ ...user, disabled: !user.disabled });
        showToast(user.disabled ? 'Unblocked' : 'Blocked');
      }
      setConfirm(null);
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setBusy(false);
    }
  };

  const back = { label: 'Users', onClick: () => navigate('/corp/super-admin/users') };

  if (loading) {
    return (
      <Page title=" " back={back}>
        <div className="sa-hero" style={{ marginBottom: '28px' }}>
          <div className="sa-hero-avatar sa-skel" style={{ width: 64, height: 64, borderRadius: '50%' }} />
          <span className="sa-skel sa-skel-line" style={{ width: 140, height: 14, marginTop: 12 }} />
        </div>

        <div className="sa-stats" style={{ marginBottom: '28px' }}>
          <Stat value="–" label="Words" />
          <Stat value="–" label="Sessions" />
          <Stat value="–" label="Streak" />
          <Stat value="–" label="Packs" />
        </div>

        <div className="sa-columns">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <Section title="Details">
              <LoadingRows count={4} />
            </Section>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <Section title="Manage">
              <LoadingRows count={2} />
            </Section>
          </div>
        </div>
      </Page>
    );
  }
  if (error) return <Page title="Error" subtitle={error} />;
  if (!user || !user.email) return <Page title="User not found" />;

  const openKind = kindOf(user);
  const openRecency = recency(user.lastSeen);

  return (
    <Page
      title={displayName(user)}
      back={back}
      action={
        <span className="sa-status-pill">
          {user.disabled ? 'Blocked' : openRecency.label}
        </span>
      }
    >
      <div className="sa-hero" style={{ marginBottom: '28px' }}>
        <div className="sa-hero-avatar" style={{ background: `var(--sa-${user.disabled ? 'gray' : KIND_TONE[openKind]})` }}>
          {initialOf(user)}
        </div>
        <span className="sa-hero-meta">
          <StatusDot tone={user.disabled ? 'red' : openRecency.tone} />
          {KIND_LABEL[openKind]} · {user.disabled ? 'Blocked' : openRecency.label}
        </span>
      </div>

      <div className="sa-stats" style={{ marginBottom: '28px' }}>
        <Stat value={user.wordCount} label="Words" />
        <Stat value={user.sessions} label="Sessions" />
        <Stat value={user.streak} label="Streak" tone={user.streak ? 'orange' : undefined} />
        <Stat value={user.packCount} label="Packs" />
      </div>

      <div className="sa-columns">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <Section title="Details">
            <Row title="Email" detail={user.email || '—'} />
            {user.phone && <Row title="Phone" detail={user.phone} />}
            <Row title="Registered" detail={fmtDate(user.createdAt)} />
            <Row title="Last seen" detail={lastSeenText(user)} />
          </Section>

          {user.corpRole ? (
            <Section title="Center staff">
              <Row title="Role" detail={KIND_LABEL[user.corpRole]} />
              <Row title="Center" detail={user.corpCenterName || '—'} />
              <Row title="Status" detail={user.disabled ? 'Blocked' : 'Active'} />
            </Section>
          ) : (
            <Section title={`Groups (${user.memberships.length})`}>
              {user.memberships.length === 0 ? (
                <Row title="Not in any group" subtitle="Uses the personal app only" />
              ) : user.memberships.map((m) => (
                <Row
                  key={m.groupId}
                  icon={<Users size={16} />}
                  iconTone="green"
                  title={m.groupName || 'Group'}
                  subtitle={centerNames[m.centerId] || ''}
                  detail={user.activeMembership?.groupId === m.groupId ? 'Active' : null}
                />
              ))}
            </Section>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {user.email && (
            <Section title="Manage">
              {user.corpRole ? (
                <Row
                  icon={<KeyRound size={16} />}
                  iconTone="orange"
                  title="Change password"
                  onClick={() => setPasswordOpen(true)}
                />
              ) : (
                <Row
                  icon={<KeyRound size={16} />}
                  iconTone="orange"
                  title="Send a password reset email"
                  onClick={handleReset}
                  disabled={busy}
                />
              )}
              {user.corpRole && (
                <Row
                  icon={user.disabled ? <CheckCircle2 size={16} /> : <Ban size={16} />}
                  iconTone={user.disabled ? 'green' : 'gray'}
                  title={user.disabled ? 'Unblock' : 'Block'}
                  onClick={() => setConfirm({ kind: 'block' })}
                />
              )}
            </Section>
          )}

          {user.corpRole && (
            <Section footer="The account is not deleted, only its access to the center panel is removed.">
              <Row title="Remove center access" destructive chevron={false} onClick={() => setConfirm({ kind: 'remove' })} />
            </Section>
          )}
        </div>
      </div>

      <ConfirmSheet
        open={Boolean(confirm)}
        title={confirm?.kind === 'remove'
          ? 'Remove center access?'
          : user.disabled ? 'Unblock this user?' : 'Block this user?'}
        message={confirm?.kind === 'remove'
          ? `${user.email} will no longer be able to open the center panel. The personal app keeps working.`
          : user.disabled
            ? 'The user will be able to open the center panel again.'
            : 'The user will be locked out of the center panel. You can unblock them later.'}
        confirmLabel={confirm?.kind === 'remove' ? 'Remove' : user.disabled ? 'Unblock' : 'Block'}
        danger={confirm?.kind === 'remove' || !user.disabled}
        busy={busy}
        onConfirm={runConfirmed}
        onCancel={() => !busy && setConfirm(null)}
      />

      {user.corpRole && (
        <SetPasswordSheet en
          open={passwordOpen}
          onClose={() => setPasswordOpen(false)}
          target={{ uid: user.uid, email: user.email, label: displayName(user) }}
        />
      )}

      {toastNode}
    </Page>
  );
}
