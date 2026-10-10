import { useEffect, useState } from 'react';
import { ref, onValue, set, remove } from 'firebase/database';
import { BadgeCheck } from 'lucide-react';
import { db } from '../../../firebase';
import { CENTER_PLANS, STUDENT_PLANS, resolvePlan } from '../../../utils/plans';
import { Button, Field, Row, Section, Sheet } from './ui';

const dateInput = (ms) => (ms ? new Date(ms).toISOString().slice(0, 10) : '');
const label = (id) => id.charAt(0).toUpperCase() + id.slice(1);

// Plan of one learner (`users/<uid>`) or one center (`centers/<id>`). Super
// admin only: the database rules reject anyone else writing `subscription`.
export default function SubscriptionControl({ kind, basePath, onToast }) {
  const plans = kind === 'center' ? CENTER_PLANS : STUDENT_PLANS;
  const [sub, setSub] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState('free');
  const [until, setUntil] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const off = onValue(ref(db, `${basePath}/subscription`), (s) => setSub(s.val() || null), () => setSub(null));
    return () => off();
  }, [basePath]);

  const now = resolvePlan(kind, sub);
  const subtitle = [
    now.status === 'grace' ? `Grace period, ${now.daysLeft} days left` : null,
    now.status === 'lapsed' ? 'Expired, on Free' : null,
    now.status === 'active' && sub?.until ? `Until ${dateInput(sub.until)}` : null,
    sub?.note || null,
  ].filter(Boolean).join(' · ') || (sub ? 'No end date' : kind === 'center' ? 'No plan set (unlimited, as before plans)' : 'No plan set');

  const openSheet = () => {
    setPlan(sub?.plan || (kind === 'center' ? 'custom' : 'free'));
    setUntil(dateInput(sub?.until));
    setNote(sub?.note || '');
    setOpen(true);
  };

  const save = async () => {
    setBusy(true);
    try {
      const untilMs = until ? new Date(`${until}T23:59:59`).getTime() : 0;
      await set(ref(db, `${basePath}/subscription`), {
        plan,
        until: untilMs,
        note: note.trim().slice(0, 200),
        updatedAt: Date.now(),
      });
      setOpen(false);
      onToast?.('Plan saved');
    } catch (err) {
      console.error('Failed to save plan:', err);
      onToast?.("Couldn't save the plan", 'error');
    } finally {
      setBusy(false);
    }
  };

  const clear = async () => {
    setBusy(true);
    try {
      await remove(ref(db, `${basePath}/subscription`));
      setOpen(false);
      onToast?.('Plan removed');
    } catch (err) {
      console.error('Failed to remove plan:', err);
      onToast?.("Couldn't remove the plan", 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Section title="Plan" footer="Set by hand for now. When the end date passes there are 14 grace days, then the account falls back to Free. Nothing is deleted.">
        <Row icon={<BadgeCheck size={16} />} iconTone="purple" title={sub === undefined ? '…' : label(now.planId)} subtitle={subtitle} onClick={openSheet} />
      </Section>
      <Sheet
        open={open}
        onClose={() => !busy && setOpen(false)}
        title="Plan"
        en
        footer={<Button block onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</Button>}
      >
        <Field label="Plan">
          <select value={plan} onChange={(e) => setPlan(e.target.value)} className="sa-input">
            {Object.keys(plans).map((id) => <option key={id} value={id}>{label(id)}</option>)}
          </select>
        </Field>
        <Field label="Paid until" hint="Leave empty for no end date.">
          <input type="date" value={until} onChange={(e) => setUntil(e.target.value)} className="sa-input" />
        </Field>
        <Field label="Note" hint="For you only, e.g. paid by Payme on 12 Oct, Founder.">
          <input type="text" value={note} onChange={(e) => setNote(e.target.value)} maxLength={200} className="sa-input" />
        </Field>
        {sub && <Button variant="plain" tone="red" block onClick={clear} disabled={busy}>Remove plan</Button>}
      </Sheet>
    </>
  );
}
