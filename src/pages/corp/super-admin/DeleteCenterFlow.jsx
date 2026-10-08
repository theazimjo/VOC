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
    <div className="sa-stepper" aria-label={`Step ${step} of ${STEPS}`}>
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
    if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') return 'Wrong password.';
    if (code === 'auth/too-many-requests') return 'Too many attempts. Try again in a moment.';
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return 'The window was closed. Try again.';
    if (code === 'auth/user-mismatch') return 'A different Google account was chosen. Pick the super admin account.';
    return `Couldn't verify: ${err?.message || code}`;
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
      setError(`Couldn't delete: ${err.message}`);
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
    `${preview?.groups ?? 0} groups, with their homework and results, are deleted for good`,
    `${preview?.teachers ?? 0} teachers and admins can no longer open the center panel`,
    "This can't be undone",
  ];

  return (
    <Sheet open={open && Boolean(center)} onClose={close} title="Delete center">
      {center && (
        <div className="sa-delete-flow">
          <Stepper step={step} />

          {step === 1 && (
            <>
              <p className="sa-flow-lead">
                What happens if <strong>{name}</strong> is deleted:
              </p>
              <Section title="Deleted">
                <Row title="Groups" detail={preview ? preview.groups : '…'} />
                <Row title="Word packs" detail={preview ? preview.packs : '…'} />
                <Row title="Teachers' center accounts" detail={preview ? preview.teachers : '…'} />
              </Section>
              <Section title="Kept" footer="Students are only removed from this center's groups. Their accounts, words and personal app stay as they are.">
                <Row title="Student accounts" detail={preview ? preview.students : '…'} />
              </Section>
              <div className="sa-actions-stack">
                <Button tone="red" onClick={() => setStep(2)} disabled={!preview}>Continue</Button>
                {onSuspendInstead && (
                  <Button variant="tinted" tone="gray" onClick={onSuspendInstead}>
                    Suspend it instead
                  </Button>
                )}
                <Button variant="plain" onClick={close}>Cancel</Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="sa-flow-lead">To continue, type the center's name exactly as shown:</p>
              <p className="sa-flow-name">{name}</p>
              <input
                className="sa-input"
                autoFocus
                autoComplete="off"
                spellCheck={false}
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                onPaste={(e) => e.preventDefault()}
                placeholder="Center name"
                aria-label="Center name"
              />
              <p className="sa-flow-hint">Pasting is turned off — type it by hand.</p>
              <div className="sa-actions-stack">
                <Button tone="red" onClick={() => setStep(3)} disabled={!nameMatches}>Continue</Button>
                <Button variant="plain" onClick={() => setStep(1)}>Back</Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="sa-flow-lead">Read each one and tick it:</p>
              <div className="sa-group" style={{ marginBottom: 20 }}>
                {CONSEQUENCES.map((text, i) => (
                  <button type="button" key={i} className="sa-row is-tappable" onClick={() => toggleCheck(i)} aria-pressed={checks[i]}>
                    <span className={`sa-check ${checks[i] ? 'is-on' : ''}`}>{checks[i] && <Check size={14} strokeWidth={3} />}</span>
                    <span className="sa-row-body"><span className="sa-row-text"><span className="sa-row-title" style={{ whiteSpace: 'normal' }}>{text}</span></span></span>
                  </button>
                ))}
              </div>
              <div className="sa-actions-stack">
                <Button tone="red" onClick={() => setStep(4)} disabled={!checks.every(Boolean)}>Continue</Button>
                <Button variant="plain" onClick={() => setStep(2)}>Back</Button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="sa-flow-icon"><KeyRound size={26} /></div>
              <p className="sa-flow-lead" style={{ textAlign: 'center' }}>
                Confirm it's you — <strong>{user?.email}</strong>
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
                    placeholder="Your password"
                    aria-label="Password"
                    style={{ marginBottom: 12 }}
                  />
                  {error && <p className="sa-flow-error">{error}</p>}
                  <Button type="submit" tone="red" block disabled={!password || verifying}>
                    {verifying ? 'Checking...' : 'Confirm'}
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
                    {verifying && !canPassword ? 'Checking...' : 'Confirm with Google'}
                  </Button>
                </>
              )}
              {!canPassword && !canGoogle && (
                <p className="sa-flow-error">This kind of account can't be verified. Sign in with email and password or with Google.</p>
              )}
              <div className="sa-actions-stack" style={{ marginTop: 10 }}>
                <Button variant="plain" onClick={() => setStep(3)} disabled={verifying}>Back</Button>
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <div className="sa-flow-icon is-danger"><ShieldAlert size={26} /></div>
              <p className="sa-flow-lead" style={{ textAlign: 'center' }}>
                Last step. <strong>{name}</strong> will be deleted for good.
                {preview?.students ? ` ${preview.students} students will be removed from the groups.` : ''}
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
                    ? 'Deleting...'
                    : countdown > 0
                      ? `Wait ${countdown} s`
                      : 'Press and hold to delete'}
                </span>
              </button>
              <div className="sa-actions-stack" style={{ marginTop: 10 }}>
                <Button variant="plain" onClick={close} disabled={deleting}>Cancel</Button>
              </div>
            </>
          )}
        </div>
      )}
    </Sheet>
  );
}
