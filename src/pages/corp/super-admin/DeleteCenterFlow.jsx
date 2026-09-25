import { useEffect, useRef, useState } from 'react';
import { Check, KeyRound, ShieldAlert } from 'lucide-react';
import { EmailAuthProvider, reauthenticateWithCredential, reauthenticateWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../firebase';
import { deleteCenter, getCenterDeletionPreview } from '../../../services/corpService';
import { Button, Row, Section, Sheet } from './ui';

// Five deliberate steps before a center is gone — each one catches a
// different kind of mistake:
//   1. See exactly what is deleted and what is kept (wrong center?)
//   2. Type the center's name (muscle-memory clicking)
//   3. Tick three consequences (not reading)
//   4. Re-enter the super admin password / Google sign-in (someone else at the keyboard)
//   5. Wait 5 s, then press and hold (last-second regret)

const STEPS = 5;
const HOLD_MS = 2000;

function Stepper({ step }) {
  return (
    <div className="sa-stepper" aria-label={`${step}-bosqich, jami ${STEPS}`}>
      {Array.from({ length: STEPS }).map((_, i) => (
        <span key={i} className={`sa-stepper-seg ${i < step ? 'is-done' : ''}`} />
      ))}
      <span className="sa-stepper-label">{step} / {STEPS}</span>
    </div>
  );
}

export default function DeleteCenterFlow({ open, center, onClose, onDeleted, onSuspendInstead }) {
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(null);
  const [typed, setTyped] = useState('');
  const [checks, setChecks] = useState([false, false, false]);
  const [password, setPassword] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(5);
  const [hold, setHold] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const holdRef = useRef(null);

  const name = center?.name || center?.id || '';

  // Fresh state every time the flow opens.
  useEffect(() => {
    if (!open || !center) return;
    setStep(1);
    setPreview(null);
    setTyped('');
    setChecks([false, false, false]);
    setPassword('');
    setError('');
    setCountdown(5);
    setHold(0);
    setDeleting(false);
    getCenterDeletionPreview(center.id).then(setPreview).catch(() => setPreview(null));
  }, [open, center]);

  useEffect(() => {
    if (step !== 5 || countdown <= 0) return undefined;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [step, countdown]);

  useEffect(() => () => cancelAnimationFrame(holdRef.current?.raf), []);

  const close = () => {
    if (deleting) return;
    onClose();
  };

  // Step 4: prove it's really the super admin at the keyboard — Firebase
  // re-authentication, no extra service needed.
  const user = auth.currentUser;
  const providers = (user?.providerData || []).map((p) => p.providerId);
  const canPassword = providers.includes('password');
  const canGoogle = providers.includes('google.com');

  const reauthFailed = (err) => {
    const code = err?.code || '';
    if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') return "Parol noto'g'ri.";
    if (code === 'auth/too-many-requests') return "Juda ko'p urinish. Birozdan so'ng qayta urinib ko'ring.";
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return 'Oyna yopildi. Qayta urinib ko\'ring.';
    if (code === 'auth/user-mismatch') return 'Boshqa Google hisobi tanlandi. Super admin hisobini tanlang.';
    return `Tasdiqlab bo'lmadi: ${err?.message || code}`;
  };

  const confirmWithPassword = async (e) => {
    e?.preventDefault();
    if (!password) return;
    setVerifying(true);
    setError('');
    try {
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password));
      setPassword('');
      setStep(5);
    } catch (err) {
      setError(reauthFailed(err));
    } finally {
      setVerifying(false);
    }
  };

  const confirmWithGoogle = async () => {
    setVerifying(true);
    setError('');
    try {
      await reauthenticateWithPopup(user, googleProvider);
      setStep(5);
    } catch (err) {
      setError(reauthFailed(err));
    } finally {
      setVerifying(false);
    }
  };

  const runDelete = async () => {
    setDeleting(true);
    setError('');
    try {
      await deleteCenter(center.id);
      onDeleted(center);
    } catch (err) {
      setError(`O'chirib bo'lmadi: ${err.message}`);
      setDeleting(false);
      setHold(0);
    }
  };

  // Press-and-hold: progress fills while held; releasing early resets it.
  const startHold = (e) => {
    if (countdown > 0 || deleting) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    const started = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - started) / HOLD_MS);
      setHold(p);
      if (p >= 1) {
        holdRef.current = null;
        runDelete();
        return;
      }
      holdRef.current = { raf: requestAnimationFrame(tick) };
    };
    holdRef.current = { raf: requestAnimationFrame(tick) };
  };

  const endHold = () => {
    if (holdRef.current) {
      cancelAnimationFrame(holdRef.current.raf);
      holdRef.current = null;
      if (!deleting) setHold(0);
    }
  };

  const toggleCheck = (i) => setChecks((prev) => prev.map((v, j) => (j === i ? !v : v)));
  const nameMatches = typed.trim() === name.trim() && name.trim().length > 0;

  const CONSEQUENCES = [
    `${preview?.groups ?? 0} ta guruh, vazifalar va natijalar butunlay o'chadi`,
    `${preview?.teachers ?? 0} ta o'qituvchi va admin markaz paneliga kira olmaydi`,
    "Buni qaytarib bo'lmaydi",
  ];

  return (
    <Sheet open={open && Boolean(center)} onClose={close} title="Markazni o'chirish">
      {center && (
        <div className="sa-delete-flow">
          <Stepper step={step} />

          {step === 1 && (
            <>
              <p className="sa-flow-lead">
                <strong>{name}</strong> o'chirilsa nima bo'ladi:
              </p>
              <Section title="O'chiriladi">
                <Row title="Guruhlar" detail={preview ? preview.groups : '…'} />
                <Row title="So'z to'plamlari" detail={preview ? preview.packs : '…'} />
                <Row title="O'qituvchilarning markaz hisobi" detail={preview ? preview.teachers : '…'} />
              </Section>
              <Section title="Saqlanadi" footer="O'quvchilar faqat shu markaz guruhlaridan chiqariladi. Ularning hisobi, so'zlari va shaxsiy ilovasi o'zgarmaydi.">
                <Row title="O'quvchilar hisobi" detail={preview ? preview.students : '…'} />
              </Section>
              <div className="sa-actions-stack">
                <Button tone="red" onClick={() => setStep(2)} disabled={!preview}>Davom etish</Button>
                {onSuspendInstead && (
                  <Button variant="tinted" tone="gray" onClick={onSuspendInstead}>
                    O'rniga to'xtatib qo'yish
                  </Button>
                )}
                <Button variant="plain" onClick={close}>Bekor qilish</Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="sa-flow-lead">Davom etish uchun markaz nomini aynan shunday yozing:</p>
              <p className="sa-flow-name">{name}</p>
              <input
                className="sa-input"
                autoFocus
                autoComplete="off"
                spellCheck={false}
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                onPaste={(e) => e.preventDefault()}
                placeholder="Markaz nomi"
                aria-label="Markaz nomi"
              />
              <p className="sa-flow-hint">Nusxalab qo'yish o'chirilgan — qo'lda yozing.</p>
              <div className="sa-actions-stack">
                <Button tone="red" onClick={() => setStep(3)} disabled={!nameMatches}>Davom etish</Button>
                <Button variant="plain" onClick={() => setStep(1)}>Orqaga</Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="sa-flow-lead">Har birini o'qib, belgilang:</p>
              <div className="sa-group" style={{ marginBottom: 20 }}>
                {CONSEQUENCES.map((text, i) => (
                  <button type="button" key={i} className="sa-row is-tappable" onClick={() => toggleCheck(i)} aria-pressed={checks[i]}>
                    <span className={`sa-check ${checks[i] ? 'is-on' : ''}`}>{checks[i] && <Check size={14} strokeWidth={3} />}</span>
                    <span className="sa-row-body"><span className="sa-row-text"><span className="sa-row-title" style={{ whiteSpace: 'normal' }}>{text}</span></span></span>
                  </button>
                ))}
              </div>
              <div className="sa-actions-stack">
                <Button tone="red" onClick={() => setStep(4)} disabled={!checks.every(Boolean)}>Davom etish</Button>
                <Button variant="plain" onClick={() => setStep(2)}>Orqaga</Button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="sa-flow-icon"><KeyRound size={26} /></div>
              <p className="sa-flow-lead" style={{ textAlign: 'center' }}>
                Bu siz ekaningizni tasdiqlang — <strong>{user?.email}</strong>
              </p>
              {canPassword && (
                <form onSubmit={confirmWithPassword}>
                  <input
                    className="sa-input"
                    type="password"
                    autoFocus
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Parolingiz"
                    aria-label="Parol"
                    style={{ marginBottom: 12 }}
                  />
                  {error && <p className="sa-flow-error">{error}</p>}
                  <Button type="submit" tone="red" block disabled={!password || verifying}>
                    {verifying ? 'Tekshirilmoqda...' : 'Tasdiqlash'}
                  </Button>
                </form>
              )}
              {canGoogle && (
                <>
                  {!canPassword && error && <p className="sa-flow-error">{error}</p>}
                  <Button
                    variant={canPassword ? 'tinted' : 'filled'}
                    tone={canPassword ? 'gray' : 'red'}
                    block
                    style={canPassword ? { marginTop: 10 } : undefined}
                    onClick={confirmWithGoogle}
                    disabled={verifying}
                  >
                    {verifying && !canPassword ? 'Tekshirilmoqda...' : 'Google orqali tasdiqlash'}
                  </Button>
                </>
              )}
              {!canPassword && !canGoogle && (
                <p className="sa-flow-error">Bu hisob turini tasdiqlab bo'lmaydi. Email/parol yoki Google bilan kiring.</p>
              )}
              <div className="sa-actions-stack" style={{ marginTop: 10 }}>
                <Button variant="plain" onClick={() => setStep(3)} disabled={verifying}>Orqaga</Button>
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <div className="sa-flow-icon is-danger"><ShieldAlert size={26} /></div>
              <p className="sa-flow-lead" style={{ textAlign: 'center' }}>
                Oxirgi qadam. <strong>{name}</strong> butunlay o'chiriladi.
                {preview?.students ? ` ${preview.students} ta o'quvchi guruhdan chiqariladi.` : ''}
              </p>
              {error && <p className="sa-flow-error">{error}</p>}
              <button
                type="button"
                className={`sa-hold-btn ${countdown > 0 ? 'is-waiting' : ''}`}
                onPointerDown={startHold}
                onPointerUp={endHold}
                onPointerCancel={endHold}
                onPointerLeave={endHold}
                disabled={countdown > 0 || deleting}
              >
                <span className="sa-hold-fill" style={{ transform: `scaleX(${hold})` }} />
                <span className="sa-hold-label">
                  {deleting
                    ? "O'chirilmoqda..."
                    : countdown > 0
                      ? `${countdown} soniya kuting`
                      : "O'chirish uchun bosib turing"}
                </span>
              </button>
              <div className="sa-actions-stack" style={{ marginTop: 10 }}>
                <Button variant="plain" onClick={close} disabled={deleting}>Bekor qilish</Button>
              </div>
            </>
          )}
        </div>
      )}
    </Sheet>
  );
}
