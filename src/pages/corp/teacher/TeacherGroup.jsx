import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import QRCode from 'qrcode';
import {
  Archive, ArrowRightLeft, BookOpen, Check, ClipboardList, Copy, Pencil, Plus, QrCode, RotateCw, Settings, Share2, Trash2, Users,
} from 'lucide-react';
import {
  assignPackToGroup, deleteGroup, regenerateGroupCode, removePackFromGroup, removeStudentFromGroup,
  transferGroup, updateGroupDetails, updateGroupStatus,
} from '../../../services/corpService';
import { IRREGULAR_VERBS_PACK_ID } from '../../../data/irregularVerbsId';
import { buildGroupInviteUrl } from '../../../utils/pendingJoin';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { formatRelativeEn as formatRelative } from '../super-admin/centerActivity';
import { Button, EmptyState, Field, LoadingRows, Page, Row, Section, Sheet, Toggle } from '../super-admin/ui';
import { useToast } from '../super-admin/useToast';
import {
  GroupHeader, GroupStats, HomeworkPanel, ProgressPanel, StudentsPanel, TopicsPanel,
} from '../center-admin/groupView';
import { masteryTone, useGroupInsights } from '../center-admin/useGroupInsights';
import { aggregatePackProgress, getHomeworkCompletion, getPackUnits } from './utils';
import { useTeacherData } from './TeacherDataContext';

const fmtDay = (iso) => (iso ? new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : '');

// Irregular Verbs has its own trainer on the student side and lives under
// additionalPacks; every other pack under assignedPacks.
const packListKey = (packId) => (packId === IRREGULAR_VERBS_PACK_ID ? 'additionalPacks' : 'assignedPacks');

const TABS = ['students', 'homework', 'packs', 'progress'];

// One group, everything a teacher needs in class on one page — the same
// layout as the center admin's group page (group card, the state in words,
// tabs), plus the actions: give homework, invite students, attach packs.
// Rarely used actions (rename, new code, transfer, archive, delete) sit
// behind the gear.
export default function TeacherGroup() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [toastNode, showToast] = useToast();
  const { loading, groups, center } = useTeacherData();

  const tab = TABS.includes(params.get('tab')) ? params.get('tab') : 'students';
  const setTab = (id) => setParams(id === 'students' ? {} : { tab: id }, { replace: true });

  const [sheet, setSheet] = useState(null); // 'manage' | 'edit' | 'invite' | 'packs' | 'transfer' | 'delete'
  const [confirm, setConfirm] = useState(null); // { title, message, confirmLabel, danger, run }
  const [confirmBusy, setConfirmBusy] = useState(false);
  const [student, setStudent] = useState(null);

  const group = groups.find((g) => g.id === groupId) || null;
  // The insights read the raw node (students keyed by uid), not the
  // context's decorated copy.
  const raw = center?.groups?.[groupId];
  const rawGroup = useMemo(() => (raw && raw.teacherId === group?.teacherId ? { id: groupId, ...raw } : null), [raw, groupId, group]);
  const insights = useGroupInsights(rawGroup, center, { withTrend: tab === 'progress', en: true });

  // ?student=<uid> — a student picked in the topbar search.
  const studentParam = params.get('student');
  useEffect(() => {
    if (!studentParam || !group) return;
    const st = group.students.find((x) => x.uid === studentParam);
    if (st) setStudent(st);
    const next = new URLSearchParams(params);
    next.delete('student');
    setParams(next, { replace: true });
  }, [studentParam, group, params, setParams]);
  const back = { label: 'My Groups', onClick: () => navigate('/corp/teacher') };

  if (loading) return <Page title=" " back={back}><LoadingRows count={5} /></Page>;
  if (!group) {
    return (
      <Page title="Group not found" back={back}>
        <div className="sa-group"><EmptyState icon={<Users size={40} />} title="This group doesn't exist" text="It may have been deleted or transferred to another teacher." /></div>
      </Page>
    );
  }

  const archived = group.status === 'archived';
  const hasPacks = group.packIds.length > 0;
  const openStudent = (uid) => setStudent(group.students.find((st) => st.uid === uid) || null);
  const { rows, hw, courses, total } = insights;

  const runConfirm = async () => {
    setConfirmBusy(true);
    try {
      await confirm.run();
      setConfirm(null);
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setConfirmBusy(false);
    }
  };

  const giveHomework = () => (hasPacks ? navigate(`/corp/teacher/group/${group.id}/assign`) : setSheet('packs'));

  return (
    <Page hideHeader>
      <GroupHeader
        back={back}
        group={rawGroup || group}
        total={total}
        courses={courses}
        onCode={archived ? undefined : () => setSheet('invite')}
        en
        tab={tab}
        onTab={setTab}
        tabs={[
          { id: 'students', label: 'Students', count: total },
          { id: 'homework', label: 'Homework', count: hw.items.length },
          { id: 'packs', label: 'Packs', count: group.packIds.length },
          { id: 'progress', label: 'Progress' },
        ]}
        actions={(
          <>
            <button type="button" className="faculty-icon-btn" onClick={() => setSheet('manage')} aria-label="Group settings" title="Group settings">
              <Settings size={16} />
            </button>
            {!archived && (
              <button type="button" className="faculty-btn-secondary" onClick={() => setSheet('invite')}>
                <QrCode size={14} /> <span className="ca-btn-label">Invite</span>
              </button>
            )}
            {!archived && (
              <button type="button" className="faculty-btn-invite" onClick={giveHomework}>
                <Plus size={14} /> {hasPacks ? 'Assign Homework' : 'Attach a Pack'}
              </button>
            )}
          </>
        )}
      />

      {total > 0 && tab === 'students' && <GroupStats insights={insights} en />}

      {tab === 'students' && (
        <StudentsPanel
          rows={rows}
          homeworkCount={hw.items.length}
          onOpen={(r) => openStudent(r.uid)}
          en
          empty={(
            <EmptyState
              icon={<QrCode size={36} />}
              title="No students yet"
              text="Show the QR code on the screen in class or send the link to the group chat — students join by themselves."
              action={archived ? undefined : <Button onClick={() => setSheet('invite')}><QrCode size={16} /> Invite Students</Button>}
            />
          )}
        />
      )}

      {tab === 'homework' && (
        <HomeworkPanel
          items={hw.items}
          onOpenStudent={openStudent}
          en
          onOpenHomework={(hwId) => navigate(`/corp/teacher/group/${group.id}/homework/${hwId}`)}
          action={archived ? null : (
            <button type="button" className="faculty-btn-invite" onClick={giveHomework}>
              <Plus size={14} /> {hasPacks ? 'New Homework' : 'Attach a Pack'}
            </button>
          )}
          empty={(
            <EmptyState
              icon={<ClipboardList size={36} />}
              title="No homework yet"
              text={hasPacks ? "Pick topics and assign them in one click — you'll see who finished them here." : 'Attach a word pack to the group first, then assign homework from it.'}
            />
          )}
        />
      )}

      {tab === 'packs' && (
        <TopicsPanel
          courses={courses}
          en
          action={archived ? null : (
            <button type="button" className="faculty-btn-secondary" onClick={() => setSheet('packs')}>
              <BookOpen size={14} /> {hasPacks ? 'Change Packs' : 'Attach a Pack'}
            </button>
          )}
          empty={(
            <EmptyState
              icon={<BookOpen size={36} />}
              title="No word pack attached"
              text="Attach a word pack — students learn its words and you assign homework from it."
              action={archived ? undefined : <Button onClick={() => setSheet('packs')}>Attach a Pack</Button>}
            />
          )}
        />
      )}

      {tab === 'progress' && <ProgressPanel insights={insights} en />}

      <ManageSheet
        open={sheet === 'manage'}
        group={group}
        onClose={() => setSheet(null)}
        onPick={(next) => setSheet(next)}
        onConfirm={setConfirm}
        showToast={showToast}
      />
      <EditGroupSheet open={sheet === 'edit'} group={group} onClose={() => setSheet(null)} showToast={showToast} />
      <InviteSheet open={sheet === 'invite'} group={group} onClose={() => setSheet(null)} />
      <PacksSheet open={sheet === 'packs'} group={group} onClose={() => setSheet(null)} showToast={showToast} />
      <TransferSheet open={sheet === 'transfer'} group={group} onClose={() => setSheet(null)} onConfirm={setConfirm} />
      <DeleteGroupSheet open={sheet === 'delete'} group={group} onClose={() => setSheet(null)} />
      <StudentSheet student={student} group={group} onClose={() => setStudent(null)} onConfirm={setConfirm} showToast={showToast} />

      <ConfirmSheet
        open={Boolean(confirm)}
        title={confirm?.title}
        message={confirm?.message}
        confirmLabel={confirm?.confirmLabel}
        danger={confirm?.danger}
        busy={confirmBusy}
        onConfirm={runConfirm}
        onCancel={() => !confirmBusy && setConfirm(null)}
      />

      {toastNode}
    </Page>
  );
}

function ManageSheet({ open, group, onClose, onPick, onConfirm, showToast }) {
  const navigate = useNavigate();
  const { centerId, patchGroup, otherTeachers } = useTeacherData();
  const archived = group.status === 'archived';

  const pick = (next) => { onClose(); onPick(next); };

  const askNewCode = () => {
    onClose();
    onConfirm({
      title: 'New invite code?',
      message: "The old code and QR stop working right away. Students already in the group aren't affected.",
      confirmLabel: 'Generate',
      run: async () => {
        const code = await regenerateGroupCode(centerId, group.id);
        patchGroup(group.id, (g) => ({ ...g, code }));
        showToast(`New code: ${code}`);
      },
    });
  };

  const askArchive = () => {
    onClose();
    onConfirm(archived
      ? {
        title: 'Restore this group?',
        message: 'The group goes back to your active list.',
        confirmLabel: 'Restore',
        run: async () => {
          await updateGroupStatus(centerId, group.id, 'active');
          patchGroup(group.id, (g) => ({ ...g, status: 'active' }));
          showToast('Group restored');
        },
      }
      : {
        title: 'Archive this group?',
        message: 'It leaves your active list. Students and results are kept, and you can restore it later.',
        confirmLabel: 'Archive',
        run: async () => {
          await updateGroupStatus(centerId, group.id, 'archived');
          patchGroup(group.id, (g) => ({ ...g, status: 'archived' }));
          navigate('/corp/teacher', { replace: true });
        },
      });
  };

  return (
    <Sheet open={open} onClose={onClose} title="Group Settings">
      <Section>
        <Row title="Invite code" detail={<span className="sa-mono">{group.code || '—'}</span>} />
        <Row title="Created" detail={fmtDay(group.createdAt) || '—'} />
      </Section>
      <Section>
        <Row icon={<Pencil size={16} />} iconTone="gray" title="Rename" onClick={() => pick('edit')} />
        {!archived && <Row icon={<RotateCw size={16} />} iconTone="blue" title="New invite code" onClick={askNewCode} />}
        {!archived && (
          <Row
            icon={<ArrowRightLeft size={16} />}
            iconTone="purple"
            title="Transfer to another teacher"
            subtitle={otherTeachers.length ? null : 'No other teacher in this center'}
            disabled={!otherTeachers.length}
            onClick={() => pick('transfer')}
          />
        )}
        <Row icon={<Archive size={16} />} iconTone="orange" title={archived ? 'Restore from archive' : 'Archive'} onClick={askArchive} />
      </Section>
      <Section footer="Deletes the group, its student list and homework results for good. Students' own accounts are kept.">
        <Row icon={<Trash2 size={16} />} iconTone="red" title="Delete Group" destructive chevron={false} onClick={() => pick('delete')} />
      </Section>
    </Sheet>
  );
}

function EditGroupSheet({ open, group, onClose, showToast }) {
  const { centerId, patchGroup } = useTeacherData();
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) setName(group.name || '');
  }, [open, group]);

  const submit = async (e) => {
    e.preventDefault();
    const title = name.trim();
    if (!title) return;
    setSaving(true);
    try {
      await updateGroupDetails(centerId, group.id, { name: title });
      patchGroup(group.id, (g) => ({ ...g, name: title }));
      onClose();
      showToast('Saved');
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onClose={() => !saving && onClose()} title="Group Name">
      <form onSubmit={submit}>
        <Field label="Group name">
          <input className="sa-input" required autoFocus value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Button type="submit" block disabled={saving || !name.trim() || name.trim() === group.name}>{saving ? 'Saving...' : 'Save'}</Button>
      </form>
    </Sheet>
  );
}

// QR students scan in class, the same link for a Telegram chat, and the
// 6-digit PIN as a fallback. The link opens /join/:code (JoinGroupPage).
function InviteSheet({ open, group, onClose }) {
  const [qrSrc, setQrSrc] = useState('');
  const [copied, setCopied] = useState('');
  const code = group.code || '';
  const url = code ? buildGroupInviteUrl(code) : '';

  useEffect(() => {
    if (!open || !url) return undefined;
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
      /* clipboard blocked — the text is still visible */
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
    <Sheet open={open} onClose={onClose} title="Invite Students">
      <div className="sa-qr">
        {qrSrc ? <img src={qrSrc} alt={`QR code to join ${group.name}`} /> : <div className="sa-qr-placeholder sa-skel" />}
      </div>
      <p className="sa-flow-lead" style={{ textAlign: 'center' }}>
        Scan it with a phone camera — after signing up, the student joins the group automatically.
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
          detail={<span className="sa-mono">{code}</span>}
          accessory={copied === 'code' ? <Check size={16} className="tone-text-green" /> : <Copy size={15} className="sa-row-chevron" />}
          chevron={false}
          onClick={() => copy(code, 'code')}
        />
      </Section>
    </Sheet>
  );
}

// Attach / detach packs. Detaching keeps every student's progress (it's
// stored per pack on the student), so it's a plain reversible toggle.
function PacksSheet({ open, group, onClose, showToast }) {
  const { centerId, packs, patchGroup } = useTeacherData();
  const [busyId, setBusyId] = useState(null);

  const toggle = async (pack, on) => {
    // Remove from whichever list actually holds it (older groups may have
    // Irregular Verbs under assignedPacks).
    const key = on
      ? packListKey(pack.id)
      : ((group.assignedPacks || []).includes(pack.id) ? 'assignedPacks' : 'additionalPacks');
    setBusyId(pack.id);
    try {
      const next = on
        ? await assignPackToGroup(centerId, group.id, pack.id, key)
        : await removePackFromGroup(centerId, group.id, pack.id, key);
      patchGroup(group.id, (g) => ({ ...g, [key]: next }));
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setBusyId(null);
    }
  };

  const own = packs.filter((p) => p.scope === 'own');
  const shared = packs.filter((p) => p.scope === 'center');
  const renderRow = (p) => (
    <Row
      key={p.id}
      icon={<BookOpen size={16} />}
      iconTone={p.isSystem ? 'purple' : 'blue'}
      title={p.title}
      subtitle={`${p.wordsCount} words`}
      chevron={false}
      accessory={<Toggle checked={group.packIds.includes(p.id)} disabled={busyId === p.id} onChange={(on) => toggle(p, on)} label={p.title} />}
    />
  );

  return (
    <Sheet open={open} onClose={onClose} title="Word Packs">
      <p className="sa-flow-lead">Packs that are on show up for students, and you assign homework from them. Turning one off keeps students' results.</p>
      {packs.length === 0 && <EmptyState title="No word packs" text="Create one under Word Packs." />}
      {shared.length > 0 && <Section title="Center packs">{shared.map(renderRow)}</Section>}
      {own.length > 0 && <Section title="My packs">{own.map(renderRow)}</Section>}
      <Button block onClick={onClose}>Done</Button>
    </Sheet>
  );
}

function TransferSheet({ open, group, onClose, onConfirm }) {
  const navigate = useNavigate();
  const { centerId, otherTeachers, patchGroup } = useTeacherData();

  const pick = (t) => {
    onClose();
    onConfirm({
      title: `Transfer to ${t.name}?`,
      message: `"${group.name}" moves to ${t.name} with its students and homework. You won't see it anymore.`,
      confirmLabel: 'Transfer',
      danger: true,
      run: async () => {
        await transferGroup(centerId, group.id, t.id);
        patchGroup(group.id, (g) => ({ ...g, teacherId: t.id }));
        navigate('/corp/teacher', { replace: true });
      },
    });
  };

  return (
    <Sheet open={open} onClose={onClose} title="Transfer to whom?">
      <Section>
        {otherTeachers.map((t) => (
          <Row
            key={t.id}
            icon={(t.name || '?').charAt(0).toUpperCase()}
            iconTone="purple"
            title={t.name || 'Teacher'}
            subtitle={t.phone || t.email}
            onClick={() => pick(t)}
          />
        ))}
      </Section>
    </Sheet>
  );
}

// Irreversible — typing the group's name is the guard.
function DeleteGroupSheet({ open, group, onClose }) {
  const navigate = useNavigate();
  const { centerId, patch } = useTeacherData();
  const [typed, setTyped] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) { setTyped(''); setError(''); }
  }, [open]);

  const matches = typed.trim() === (group.name || '').trim();

  const remove = async () => {
    setBusy(true);
    setError('');
    try {
      await deleteGroup(centerId, group.id);
      patch((c) => {
        const next = { ...c.groups };
        delete next[group.id];
        return { ...c, groups: next };
      });
      navigate('/corp/teacher', { replace: true });
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <Sheet open={open} onClose={() => !busy && onClose()} title="Delete Group">
      <p className="sa-warning">
        The list of {group.activity.students} students in <strong>{group.name}</strong>, {group.homework.length} homework assignments and all results will be deleted for good. This can't be undone.
      </p>
      <Field label={`Type "${group.name}" to confirm`}>
        <input className="sa-input" autoFocus autoComplete="off" value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={group.name} />
      </Field>
      {error && <p className="sa-flow-error">{error}</p>}
      <Button tone="red" block disabled={!matches || busy} onClick={remove}>{busy ? 'Deleting...' : 'Delete for good'}</Button>
    </Sheet>
  );
}

function StudentSheet({ student, group, onClose, onConfirm, showToast }) {
  const { centerId, packById, patchGroup } = useTeacherData();

  // Keep the last student while the sheet animates out.
  const [shown, setShown] = useState(null);
  useEffect(() => { if (student) setShown(student); }, [student]);
  const st = student || shown;

  const remove = () => {
    const target = st;
    onClose();
    onConfirm({
      title: `Remove ${target.name} from the group?`,
      message: "They'll lose access to the group's packs and homework. Their own account and words are kept.",
      confirmLabel: 'Remove',
      danger: true,
      run: async () => {
        await removeStudentFromGroup(centerId, group.id, target.uid);
        patchGroup(group.id, (g) => {
          const next = { ...g.students };
          delete next[target.uid];
          return { ...g, students: next, studentsCount: Math.max(0, (g.studentsCount || 1) - 1) };
        });
        showToast(`${target.name} removed`);
      },
    });
  };

  const hwDone = st ? group.homework.filter((h) => getHomeworkCompletion(st, h).allDone).length : 0;
  const hwTotal = group.homework.length;

  return (
    <Sheet open={Boolean(student)} onClose={onClose} title={st?.name || 'Student'}>
      {st && (
        <>
          <div className="ca-st-head">
            <span className="ca-st-avatar">{(st.name || '?').charAt(0).toUpperCase()}</span>
            <div className="ca-st-head-text">
              <span className="faculty-email-sub">
                {[st.email, st.joinedAt ? `Joined ${fmtDay(st.joinedAt)}` : null].filter(Boolean).join(' · ') || 'No details'}
              </span>
            </div>
          </div>

          <div className="ca-st-stats">
            <div className="ca-st-stat">
              <span className="ca-st-stat-label">Mastery</span>
              <span className="ca-st-stat-value">{st.mastery == null ? '—' : `${st.mastery}%`}</span>
              {st.mastery != null && <span className="ca-dash-bar"><span className={masteryTone(st.mastery) || 'is-blue'} style={{ width: `${st.mastery}%` }} /></span>}
            </div>
            <div className="ca-st-stat">
              <span className="ca-st-stat-label">Homework</span>
              <span className="ca-st-stat-value">{hwTotal ? `${hwDone}/${hwTotal}` : '—'}</span>
              {hwTotal > 0 && <span className="ca-dash-bar"><span className={hwDone === hwTotal ? 'is-good' : 'is-mid'} style={{ width: `${Math.round((hwDone / hwTotal) * 100)}%` }} /></span>}
            </div>
            <div className="ca-st-stat">
              <span className="ca-st-stat-label">Last practice</span>
              <span className="ca-st-stat-value is-text">{st.last ? formatRelative(st.last) : 'Never'}</span>
            </div>
          </div>

          <p className="ca-muted">
            Retention is the predicted chance the student recalls a word right now, based on their own answer history for that word.
            "At risk" means that chance is below 75%. Numbers can move between app versions as the prediction model improves.
          </p>

          {group.packIds.map((pid) => {
            const pack = packById[pid];
            if (!pack) return null;
            const agg = aggregatePackProgress((st.progress || {})[pid]);
            const units = getPackUnits(pack);
            return (
              <div key={pid} className="ca-st-pack">
                <div className="ca-st-pack-head">
                  <span className="ca-st-pack-title">{pack.title}</span>
                  <span className="faculty-email-sub">
                    {agg.hasData
                      ? `${agg.wordsLearned} words learned · ${agg.retentionPercent}% retention`
                      : 'No practice yet'}
                  </span>
                </div>
                {agg.atRiskCount > 0 && (
                  <span className="ca-pill is-orange ca-st-risk">{agg.atRiskCount} words at risk</span>
                )}
                <div className="ca-st-topics">
                  {units.length === 0 && <span className="ca-muted">No topics</span>}
                  {units.map((u) => {
                    const us = agg.units[u.unitKey];
                    const m = us ? (us.masteryPercent || 0) : null;
                    return (
                      <div key={u.unitKey} className="ca-st-topic" title={`${u.monthTitle} — ${u.title}`}>
                        <span className="ca-st-topic-name">{u.title}</span>
                        <span className="ca-dash-bar"><span className={m == null ? '' : masteryTone(m) || 'is-low'} style={{ width: `${m || 0}%` }} /></span>
                        <span className={`ca-st-topic-val ${m == null ? 'ca-muted' : ''}`}>{m == null ? '—' : `${m}%`}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <button type="button" className="faculty-btn-delete ca-st-remove" onClick={remove}>
            Remove from group
          </button>
        </>
      )}
    </Sheet>
  );
}
