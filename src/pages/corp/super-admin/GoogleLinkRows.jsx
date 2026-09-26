import { useState } from 'react';
import { GoogleAuthProvider, linkWithPopup, signInWithCredential, signOut, unlink } from 'firebase/auth';
import { auth, googleProvider } from '../../../firebase';
import { getSecondaryAuth } from '../../../firebaseSecondary';
import { setActiveProfile } from '../../../utils/activeProfile';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Button, Row, Sheet } from './ui';

const GOOGLE = 'google.com';

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

const LINK_ERRORS = {
  'auth/credential-already-in-use': "Bu Google hisob allaqachon boshqa VOC hisobiga ulangan. Boshqa Google hisobni tanlang.",
  'auth/email-already-in-use': "Bu Google pochta boshqa VOC hisobida ishlatilgan. Boshqa Google hisobni tanlang.",
  'auth/popup-blocked': "Brauzer oynani blokladi. Qalqib chiquvchi oynalarga ruxsat bering va qayta urinib ko'ring.",
  'auth/requires-recent-login': "Xavfsizlik uchun chiqib, qaytadan kiring va yana urinib ko'ring.",
};

// Lets a staff account the admin created (phone/email + password) also
// sign in with Google: links the Google credential to the same Firebase
// user, so "Google bilan kirish" lands on this exact account and role.
// Renders rows for an existing <Section>; errors/success go to showToast.
//
// `allowMove` (teachers): when that Google account already is a separate
// VOC account, offer to move the teacher role onto it instead
// (api/merge-teacher-account.js) — then the teacher signs in with Google.
export default function GoogleLinkRows({ showToast, allowMove = false }) {
  const [providers, setProviders] = useState(() => auth.currentUser?.providerData || []);
  const [busy, setBusy] = useState(false);
  const [confirmUnlink, setConfirmUnlink] = useState(false);
  const [move, setMove] = useState(null); // { credential, email }
  const [moveError, setMoveError] = useState('');

  const google = providers.find((p) => p.providerId === GOOGLE);
  // Never let someone remove their only way to sign in.
  const canUnlink = providers.some((p) => p.providerId !== GOOGLE);

  const link = async () => {
    setBusy(true);
    try {
      const { user } = await linkWithPopup(auth.currentUser, googleProvider);
      setProviders([...user.providerData]);
      showToast('Google hisob bog\'landi');
    } catch (err) {
      const credential = GoogleAuthProvider.credentialFromError(err);
      if (allowMove && credential && (err.code === 'auth/credential-already-in-use' || err.code === 'auth/email-already-in-use')) {
        setMoveError('');
        setMove({ credential, email: err.customData?.email || '' });
      } else if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        showToast(LINK_ERRORS[err.code] || `Xatolik: ${err.message}`, 'error');
      }
    } finally {
      setBusy(false);
    }
  };

  const doMove = async () => {
    setBusy(true);
    setMoveError('');
    try {
      // Prove ownership of the Google account in a throwaway session, so
      // the current (teacher) session stays signed in until the move is done.
      const secondary = getSecondaryAuth();
      const { user: googleUser } = await signInWithCredential(secondary, move.credential);
      const googleIdToken = await googleUser.getIdToken();
      await signOut(secondary);
      const idToken = await auth.currentUser.getIdToken();

      const res = await fetch('/api/merge-teacher-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, googleIdToken }),
      });
      let data = {};
      try { data = await res.json(); } catch { /* non-JSON error page */ }
      if (!res.ok) throw new Error(data.error || `Server xatosi (${res.status})`);

      // The old login is gone — continue as the Google account.
      setActiveProfile('teacher');
      try {
        await signInWithCredential(auth, move.credential);
        window.location.assign('/corp/teacher');
      } catch {
        await signOut(auth).catch(() => {});
        window.location.assign('/login');
      }
    } catch (err) {
      setMoveError(err.message);
      setBusy(false);
    }
  };

  const doUnlink = async () => {
    setBusy(true);
    try {
      const user = await unlink(auth.currentUser, GOOGLE);
      setProviders([...user.providerData]);
      setConfirmUnlink(false);
      showToast('Google hisob uzildi');
    } catch (err) {
      showToast(LINK_ERRORS[err.code] || `Xatolik: ${err.message}`, 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {google ? (
        <Row
          icon={<GoogleIcon />}
          iconTone="white"
          title={google.email || 'Google'}
          subtitle="Google bilan ham kira olasiz"
          detail={canUnlink ? null : 'Bog\'langan'}
          accessory={canUnlink ? (
            <button type="button" className="sa-link-btn sa-row-link is-danger" onClick={() => setConfirmUnlink(true)} disabled={busy}>
              Uzish
            </button>
          ) : null}
          chevron={false}
        />
      ) : (
        <Row
          icon={<GoogleIcon />}
          iconTone="white"
          title={busy ? 'Bog\'lanmoqda...' : 'Google hisobni bog\'lash'}
          subtitle="Keyin parolsiz, Google bilan kirasiz"
          onClick={link}
          disabled={busy || !auth.currentUser}
        />
      )}

      <Sheet open={Boolean(move)} onClose={() => !busy && setMove(null)} title="Google hisobga ko'chirish">
        <p className="sa-flow-lead">
          <strong>{move?.email || 'Bu Google hisob'}</strong> VOC'da allaqachon ochilgan. O'qituvchi panelingizni shu hisobga ko'chirish mumkin:
        </p>
        <ul className="sa-bullets">
          <li>Guruhlaringiz, vazifalar va shaxsiy to'plamlaringiz shu Google hisobga o'tadi.</li>
          <li>Shu hisobdagi shaxsiy so'zlaringiz ham saqlanadi — ikkala rejim bitta hisobda bo'ladi.</li>
          <li>Telefon va parol bilan kirish ishlamay qoladi, faqat Google bilan kirasiz.</li>
        </ul>
        {moveError && <p className="sa-flow-error">{moveError}</p>}
        <div className="sa-actions-stack">
          <Button onClick={doMove} disabled={busy}>{busy ? "Ko'chirilmoqda..." : "Ko'chirish va Google bilan kirish"}</Button>
          <Button variant="plain" onClick={() => setMove(null)} disabled={busy}>Bekor qilish</Button>
        </div>
      </Sheet>

      <ConfirmSheet
        open={confirmUnlink}
        title="Google hisobni uzasizmi?"
        message="Keyin faqat login va parol bilan kira olasiz."
        confirmLabel="Uzish"
        danger
        busy={busy}
        onConfirm={doUnlink}
        onCancel={() => !busy && setConfirmUnlink(false)}
      />
    </>
  );
}
