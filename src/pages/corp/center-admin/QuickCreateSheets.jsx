import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import { Check, Copy, Layers, Share2 } from 'lucide-react';
import { createGroup } from '../../../services/corpService';
import { buildGroupInviteUrl } from '../../../utils/pendingJoin';
import { Button, EmptyState, Field, Row, Section, Segmented, Sheet } from '../super-admin/ui';
import CreateStudentPanel from '../../../components/corp/CreateStudentPanel';
import { useCenterData } from './CenterDataContext';

// The two "+" quick-add actions that have no page of their own to open
// (see CorpAdminTopbar's QUICK_ADD — each item lands on its list page with
// ?new=…, and the page opens the matching modal). Teachers and courses
// reuse their pages' existing modals; groups and students use these.

// A group needs a name and whoever runs it — a teacher, or an admin
// (a group's teacherId can be an admin uid, see ClassesTab.jsx).
export function NewGroupSheet({ open, onClose, defaultTeacherId = '' }) {
  const navigate = useNavigate();
  const { centerId, teachers, admins, teacherById, patch } = useCenterData();
  const [name, setName] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const owners = [
    ...[...teachers].sort((a, b) => (a.name || '').localeCompare(b.name || '')).map((t) => ({ id: t.id, label: t.name || 'Teacher' })),
    ...admins.map((a) => ({ id: a.uid, label: `${teacherById[a.uid]?.name || a.email || 'Admin'} (admin)` })),
  ];

  useEffect(() => {
    if (!open) return;
    setName('');
    setError('');
    setTeacherId(defaultTeacherId || (owners.length === 1 ? owners[0].id : ''));
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = async (e) => {
    e.preventDefault();
    const title = name.trim();
    if (!title || !teacherId) return;
    setSaving(true);
    setError('');
    try {
      const group = await createGroup(centerId, teacherId, { name: title });
      patch((c) => ({ ...c, groups: { ...(c.groups || {}), [group.id]: group } }));
      onClose();
      navigate(`/corp/admin/groups/${group.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onClose={() => !saving && onClose()} title="New Group" en>
      <form onSubmit={submit}>
        <Field label="Group name" hint="Students see this name too.">
          <input className="sa-input" required autoFocus placeholder="Mon-Wed-Fri 17:00" value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Teacher" hint="They run the group and assign its homework. You can transfer it later.">
          <select className="sa-select" required value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
            <option value="" disabled>Choose a teacher</option>
            {owners.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </Field>
        {error && <p className="sa-flow-error">{error}</p>}
        <Button type="submit" block disabled={saving || !name.trim() || !teacherId}>{saving ? 'Creating...' : 'Create Group'}</Button>
      </form>
    </Sheet>
  );
}

// Students can't be created by hand — they sign up and join a group with
// its QR code, link or PIN. So "New Student" picks the group and shows
// exactly those three, ready to show in class or send to a chat.
export function AddStudentsSheet({ open, onClose, onNewGroup }) {
  const { activeGroups, teacherById, patch } = useCenterData();
  const [groupId, setGroupId] = useState('');
  const [how, setHow] = useState('invite'); // 'invite' (QR / link / PIN) | 'create' (an account made here)
  const [qrSrc, setQrSrc] = useState('');
  const [copied, setCopied] = useState('');

  const withCode = activeGroups.filter((g) => g.code);
  // the chosen group, or the first one until something is chosen (no state to keep in sync)
  const currentId = withCode.some((g) => g.id === groupId) ? groupId : withCode[0]?.id || '';
  const group = withCode.find((g) => g.id === currentId) || null;
  const url = group ? buildGroupInviteUrl(group.code) : '';

  useEffect(() => {
    if (!open) return;
    setCopied('');
    setHow('invite');
    setGroupId((id) => (withCode.some((g) => g.id === id) ? id : withCode[0]?.id || ''));
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open || !url) { setQrSrc(''); return undefined; }
    let cancelled = false;
    QRCode.toDataURL(url, { width: 480, margin: 1, errorCorrectionLevel: 'M' })
      .then((src) => { if (!cancelled) setQrSrc(src); })
      .catch((err) => console.error('QR generation failed:', err));
    return () => { cancelled = true; };
  }, [open, url]);

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(''), 1600);
    } catch {
      /* clipboard blocked — the text is on screen */
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `${group.name} — VOC`, text: `Join "${group.name}":`, url });
        return;
      } catch {
        /* dismissed — fall through to Telegram */
      }
    }
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Join "${group.name}"`)}`, '_blank', 'noopener');
  };

  return (
    <Sheet open={open} onClose={onClose} title="Add Students" en>
      {withCode.length === 0 ? (
        <EmptyState
          icon={<Layers size={36} />}
          title="Create a group first"
          text="Students join a group with its QR code or link. Once a group exists, its invite shows up here."
          action={<Button onClick={onNewGroup}>New Group</Button>}
        />
      ) : (
        <>
          <Field label="Group">
            <select className="sa-select" value={currentId} onChange={(e) => setGroupId(e.target.value)}>
              {withCode.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name || 'Group'}{teacherById[g.teacherId]?.name ? ` · ${teacherById[g.teacherId].name}` : ''}
                </option>
              ))}
            </select>
          </Field>
          <Segmented
            label="add-students-how"
            value={how}
            onChange={setHow}
            options={[{ value: 'invite', label: 'QR / link' }, { value: 'create', label: 'Create account' }]}
          />
          {group && how === 'create' && (
            <CreateStudentPanel
              key={group.id}
              groupId={group.id}
              groupName={group.name}
              onCreated={(st) => patch((c) => {
                const g = c.groups?.[group.id];
                if (!g) return c;
                const entry = { id: st.uid, name: st.name, email: st.login, joinedAt: new Date().toISOString(), progress: {} };
                return { ...c, groups: { ...c.groups, [group.id]: { ...g, studentsCount: (g.studentsCount || 0) + 1, students: { ...(g.students || {}), [st.uid]: entry } } } };
              })}
            />
          )}
          {group && how === 'invite' && (
            <>
              <div className="sa-qr">
                {qrSrc ? <img src={qrSrc} alt={`QR code to join ${group.name}`} /> : <div className="sa-qr-placeholder sa-skel" />}
              </div>
              <p className="sa-flow-lead" style={{ textAlign: 'center' }}>
                Students scan it with a phone camera — after signing up they join {group.name} automatically.
              </p>
              <div className="sa-actions-stack">
                <Button onClick={share}><Share2 size={18} /> Send via Telegram</Button>
                <Button variant="tinted" onClick={() => copy(url, 'link')}>
                  {copied === 'link' ? <Check size={18} /> : <Copy size={18} />} {copied === 'link' ? 'Link copied' : 'Copy link'}
                </Button>
              </div>
              <Section footer="Students can also enter it in the app under Profile → Join a group.">
                <Row
                  title="PIN code"
                  detail={<span className="sa-mono">{group.code}</span>}
                  accessory={copied === 'code' ? <Check size={16} className="tone-text-green" /> : <Copy size={15} className="sa-row-chevron" />}
                  chevron={false}
                  onClick={() => copy(group.code, 'code')}
                />
              </Section>
            </>
          )}
        </>
      )}
    </Sheet>
  );
}
