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
const KIND_LABEL = { center_admin: 'Admin', teacher: "O'qituvchi", student: "O'quvchi (guruhda)", personal: 'Shaxsiy' };

function kindOf(u) {
  if (u.corpRole) return u.corpRole; // center_admin | teacher
  if (u.memberships?.length > 0) return 'student';
  return 'personal';
}

function initialOf(u) {
  return (u.name || u.email || '?').charAt(0).toUpperCase();
}

function displayName(u) {
  return u.name || u.email?.split('@')[0] || 'Nomsiz foydalanuvchi';
}

function fmtDate(iso) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('uz-UZ', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(iso));
}

function recency(iso) {
  if (!iso) return { label: 'Kirmagan', tone: 'gray' };
  const d = Math.floor((Date.now() - new Date(iso)) / 1000 / 60 / 60 / 24);
  if (d === 0) return { label: 'Bugun', tone: 'green' };
  if (d < 7) return { label: `${d} kun oldin`, tone: 'green' };
  if (d < 30) return { label: `${d} kun oldin`, tone: 'orange' };
  return { label: `>30 kun oldin`, tone: 'red' };
}

function lastSeenText(u) {
  if (!u.lastSeen) return 'Hech qachon kirmagan';
  return new Intl.DateTimeFormat('uz-UZ', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(u.lastSeen));
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
      showToast(`Parolni tiklash xati ${user.email} ga yuborildi`);
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
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
        showToast('Markaz paneliga kirish huquqi olib tashlandi');
      } else {
        await setCorpUserDisabled(user.uid, !user.disabled);
        setUser({ ...user, disabled: !user.disabled });
        showToast(user.disabled ? 'Blokdan chiqarildi' : 'Bloklandi');
      }
      setConfirm(null);
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
    } finally {
      setBusy(false);
    }
  };

  const back = { label: 'Foydalanuvchilar', onClick: () => navigate('/corp/super-admin/users') };

  if (loading) {
    return (
      <Page title=" " back={back}>
        <div className="sa-hero" style={{ marginBottom: '28px' }}>
          <div className="sa-hero-avatar sa-skel" style={{ width: 64, height: 64, borderRadius: '50%' }} />
          <span className="sa-skel sa-skel-line" style={{ width: 140, height: 14, marginTop: 12 }} />
        </div>

        <div className="sa-stats" style={{ marginBottom: '28px' }}>
          <Stat value="–" label="So'z" />
          <Stat value="–" label="Kirish" />
          <Stat value="–" label="Streak" />
          <Stat value="–" label="To'plam" />
        </div>

        <div className="sa-columns">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <Section title="Ma'lumot">
              <LoadingRows count={4} />
            </Section>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <Section title="Boshqaruv">
              <LoadingRows count={2} />
            </Section>
          </div>
        </div>
      </Page>
    );
  }
  if (error) return <Page title="Xatolik" subtitle={error} />;
  if (!user || !user.email) return <Page title="Foydalanuvchi topilmadi" />;

  const openKind = kindOf(user);
  const openRecency = recency(user.lastSeen);

  return (
    <Page
      title={displayName(user)}
      back={back}
      action={
        <span className="sa-status-pill">
          {user.disabled ? 'Bloklangan' : openRecency.label}
        </span>
      }
    >
      <div className="sa-hero" style={{ marginBottom: '28px' }}>
        <div className="sa-hero-avatar" style={{ background: `var(--sa-${user.disabled ? 'gray' : KIND_TONE[openKind]})` }}>
          {initialOf(user)}
        </div>
        <span className="sa-hero-meta">
          <StatusDot tone={user.disabled ? 'red' : openRecency.tone} />
          {KIND_LABEL[openKind]} · {user.disabled ? 'Bloklangan' : openRecency.label}
        </span>
      </div>

      <div className="sa-stats" style={{ marginBottom: '28px' }}>
        <Stat value={user.wordCount} label="So'z" />
        <Stat value={user.sessions} label="Kirish" />
        <Stat value={user.streak} label="Streak" tone={user.streak ? 'orange' : undefined} />
        <Stat value={user.packCount} label="To'plam" />
      </div>

      <div className="sa-columns">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <Section title="Ma'lumot">
            <Row title="Email" detail={user.email || '—'} />
            {user.phone && <Row title="Telefon" detail={user.phone} />}
            <Row title="Ro'yxatdan o'tgan" detail={fmtDate(user.createdAt)} />
            <Row title="Oxirgi kirish" detail={lastSeenText(user)} />
          </Section>

          {user.corpRole ? (
            <Section title="Markaz xodimi">
              <Row title="Rol" detail={KIND_LABEL[user.corpRole]} />
              <Row title="Markaz" detail={user.corpCenterName || '—'} />
              <Row title="Holat" detail={user.disabled ? 'Bloklangan' : 'Faol'} />
            </Section>
          ) : (
            <Section title={`Guruhlar (${user.memberships.length})`}>
              {user.memberships.length === 0 ? (
                <Row title="Guruhga qo'shilmagan" subtitle="Faqat shaxsiy ilovadan foydalanadi" />
              ) : user.memberships.map((m) => (
                <Row
                  key={m.groupId}
                  icon={<Users size={16} />}
                  iconTone="green"
                  title={m.groupName || 'Guruh'}
                  subtitle={centerNames[m.centerId] || ''}
                  detail={user.activeMembership?.groupId === m.groupId ? 'Faol' : null}
                />
              ))}
            </Section>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {user.email && (
            <Section title="Boshqaruv">
              {user.corpRole ? (
                <Row
                  icon={<KeyRound size={16} />}
                  iconTone="orange"
                  title="Parolni o'zgartirish"
                  onClick={() => setPasswordOpen(true)}
                />
              ) : (
                <Row
                  icon={<KeyRound size={16} />}
                  iconTone="orange"
                  title="Parolni tiklash xatini yuborish"
                  onClick={handleReset}
                  disabled={busy}
                />
              )}
              {user.corpRole && (
                <Row
                  icon={user.disabled ? <CheckCircle2 size={16} /> : <Ban size={16} />}
                  iconTone={user.disabled ? 'green' : 'gray'}
                  title={user.disabled ? 'Blokdan chiqarish' : 'Bloklash'}
                  onClick={() => setConfirm({ kind: 'block' })}
                />
              )}
            </Section>
          )}

          {user.corpRole && (
            <Section footer="Hisob o'chmaydi, faqat markaz paneliga kirish huquqi olinadi.">
              <Row title="Markaz huquqini olib tashlash" destructive chevron={false} onClick={() => setConfirm({ kind: 'remove' })} />
            </Section>
          )}
        </div>
      </div>

      <ConfirmSheet
        open={Boolean(confirm)}
        title={confirm?.kind === 'remove'
          ? 'Markaz huquqini olasizmi?'
          : user.disabled ? 'Blokdan chiqarasizmi?' : 'Bloklaysizmi?'}
        message={confirm?.kind === 'remove'
          ? `${user.email} endi markaz paneliga kira olmaydi. Shaxsiy ilovasi ishlayveradi.`
          : user.disabled
            ? 'Foydalanuvchi yana markaz paneliga kira oladi.'
            : 'Foydalanuvchi markaz paneliga kira olmay qoladi. Uni keyin blokdan chiqarish mumkin.'}
        confirmLabel={confirm?.kind === 'remove' ? 'Olib tashlash' : user.disabled ? 'Blokdan chiqarish' : 'Bloklash'}
        danger={confirm?.kind === 'remove' || !user.disabled}
        busy={busy}
        onConfirm={runConfirmed}
        onCancel={() => !busy && setConfirm(null)}
      />

      {user.corpRole && (
        <SetPasswordSheet
          open={passwordOpen}
          onClose={() => setPasswordOpen(false)}
          target={{ uid: user.uid, email: user.email, label: displayName(user) }}
        />
      )}

      {toastNode}
    </Page>
  );
}
