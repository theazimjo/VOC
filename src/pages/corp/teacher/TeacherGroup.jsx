import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import {
  Archive, ArrowRightLeft, BookOpen, Check, Copy, NotebookPen, Pencil, Plus, QrCode, RotateCw, Settings, Share2, Trash2, Users,
} from 'lucide-react';
import {
  assignPackToGroup, deleteGroup, regenerateGroupCode, removePackFromGroup, removeStudentFromGroup,
  transferGroup, updateGroupDetails, updateGroupStatus,
} from '../../../services/corpService';
import { IRREGULAR_VERBS_PACK_ID } from '../../../data/irregularVerbsCorpPack';
import { buildGroupInviteUrl } from '../../../utils/pendingJoin';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { formatRelative } from '../super-admin/centerActivity';
import { Button, EmptyState, Field, LoadingRows, Page, Row, Section, Sheet, Stat, StatusDot, Toggle } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useToast } from '../super-admin/useToast';
import { aggregatePackProgress, getHomeworkCompletion, getPackUnits } from './utils';
import { useTeacherData } from './TeacherDataContext';

const DAY = 24 * 60 * 60 * 1000;
const fmtDay = (iso) => (iso ? new Date(iso).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' }) : '');

function activityTone(ts) {
  if (!ts) return 'gray';
  return Date.now() - ts <= 7 * DAY ? 'green' : 'orange';
}

// Irregular Verbs has its own trainer on the student side and lives under
// additionalPacks; every other pack under assignedPacks.
const packListKey = (packId) => (packId === IRREGULAR_VERBS_PACK_ID ? 'additionalPacks' : 'assignedPacks');

// One group, everything a teacher needs in class on one page: give
// homework, invite students, see who practiced. Rarely used actions
// (rename, new code, transfer, archive, delete) sit behind the gear.
export default function TeacherGroup() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const [toastNode, showToast] = useToast();
  const { loading, groups, packById } = useTeacherData();

  const [sheet, setSheet] = useState(null); // 'manage' | 'edit' | 'invite' | 'packs' | 'transfer' | 'delete'
  const [confirm, setConfirm] = useState(null); // { title, message, confirmLabel, danger, run }
  const [confirmBusy, setConfirmBusy] = useState(false);
  const [student, setStudent] = useState(null);

  const group = groups.find((g) => g.id === groupId) || null;
  const back = { label: 'Guruhlarim', onClick: () => navigate('/corp/teacher') };

  const avgMastery = useMemo(() => {
    const values = (group?.students || []).map((st) => st.mastery).filter((m) => m != null);
    return values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : null;
  }, [group]);

  const students = useMemo(
    () => [...(group?.students || [])].sort((a, b) => (b.last || 0) - (a.last || 0) || (a.name || '').localeCompare(b.name || '')),
    [group],
  );

  if (loading) return <Page title=" " back={back}><LoadingRows count={5} /></Page>;
  if (!group) {
    return (
      <Page title="Guruh topilmadi" back={back}>
        <div className="sa-group"><EmptyState icon={<Users size={40} />} title="Bu guruh yo'q" text="U o'chirilgan yoki boshqa o'qituvchiga o'tkazilgan bo'lishi mumkin." /></div>
      </Page>
    );
  }

  const archived = group.status === 'archived';
  const hasPacks = group.packIds.length > 0;
  const latestHw = group.latestHw;
  const hwState = (st) => (latestHw ? getHomeworkCompletion(st, latestHw) : null);

  const runConfirm = async () => {
    setConfirmBusy(true);
    try {
      await confirm.run();
      setConfirm(null);
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
    } finally {
      setConfirmBusy(false);
    }
  };

  const giveHomework = () => (hasPacks ? navigate(`/corp/teacher/group/${group.id}/assign`) : setSheet('packs'));

  return (
    <Page
      back={back}
      title={group.name || 'Guruh'}
      subtitle={[group.level, archived ? 'Arxivda' : null].filter(Boolean).join(' · ') || null}
      action={
        <button type="button" className="sa-icon-btn is-gray" onClick={() => setSheet('manage')} aria-label="Guruh sozlamalari">
          <Settings size={18} />
        </button>
      }
    >
      {!archived && (
        <div className="sa-page-actions">
          <Button onClick={giveHomework}><Plus size={18} strokeWidth={2.6} /> {hasPacks ? 'Vazifa berish' : "To'plam biriktirish"}</Button>
          <Button variant="tinted" onClick={() => setSheet('invite')}><QrCode size={18} /> Taklif qilish</Button>
        </div>
      )}

      <div className="sa-stats">
        <Stat value={group.activity.students} label="O'quvchi" />
        <Stat value={group.activity.students ? `${group.activity.activeWeek}` : '—'} label="Bu hafta mashq qildi" tone="green" />
        <Stat value={avgMastery == null ? '—' : `${avgMastery}%`} label="O'rtacha o'zlashtirish" />
        <Stat value={group.homework.length} label="Berilgan vazifa" tone="blue" />
      </div>

      <div className="sa-columns">
        <div>
          <Section title={`O'quvchilar (${students.length})`}>
            {students.length === 0 ? (
              <EmptyState
                icon={<QrCode size={36} />}
                title="Hali hech kim qo'shilmagan"
                text="QR kodni darsda ekranga chiqaring yoki havolani guruh chatiga yuboring — o'quvchilar o'zlari qo'shiladi."
                action={<Button onClick={() => setSheet('invite')}>Taklif qilish</Button>}
              />
            ) : isDesktop ? (
              <div className="sa-table is-flat" style={{ '--sa-cols': 'minmax(200px, 2fr) 120px 140px minmax(140px, 1fr)' }}>
                <div className="sa-table-head">
                  <span>O'quvchi</span>
                  <span className="num">O'zlashtirish</span>
                  <span>Oxirgi vazifa</span>
                  <span>Oxirgi mashq</span>
                </div>
                {students.map((st) => {
                  const hw = hwState(st);
                  return (
                    <button type="button" key={st.uid} className="sa-table-row" onClick={() => setStudent(st)}>
                      <span className="sa-cell-main">
                        <span className="sa-row-icon tone-green">{(st.name || '?').charAt(0).toUpperCase()}</span>
                        <span className="sa-cell-text">
                          <span className="sa-cell-title">{st.name || "O'quvchi"}</span>
                          <span className="sa-cell-sub">{st.email || `Qo'shilgan: ${fmtDay(st.joinedAt)}`}</span>
                        </span>
                      </span>
                      <span className="num">{st.mastery == null ? '—' : `${st.mastery}%`}</span>
                      <span>{hw ? <HomeworkChip state={hw} /> : <span className="muted">—</span>}</span>
                      <span className="sa-cell-status">
                        <StatusDot tone={activityTone(st.last)} />
                        {st.last ? formatRelative(st.last) : 'Mashq qilmagan'}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : students.map((st) => {
              const hw = hwState(st);
              return (
                <Row
                  key={st.uid}
                  icon={(st.name || '?').charAt(0).toUpperCase()}
                  iconTone="green"
                  title={st.name || "O'quvchi"}
                  subtitle={[st.mastery == null ? null : `${st.mastery}%`, st.last ? formatRelative(st.last) : 'mashq qilmagan'].filter(Boolean).join(' · ')}
                  accessory={hw ? <HomeworkChip state={hw} /> : <StatusDot tone={activityTone(st.last)} />}
                  onClick={() => setStudent(st)}
                />
              );
            })}
          </Section>
        </div>

        <div>
          <Section title={`Vazifalar (${group.homework.length})`}>
            {group.homework.length === 0 ? (
              <Row
                icon={<NotebookPen size={16} />}
                iconTone="blue"
                title="Hali vazifa berilmagan"
                subtitle={hasPacks ? "Mavzularni tanlab, bir bosishda bering." : "Avval so'z to'plamini biriktiring."}
                onClick={archived ? undefined : giveHomework}
              />
            ) : [...group.homework].reverse().slice(0, 8).map((hw) => {
              const done = group.students.filter((st) => getHomeworkCompletion(st, hw).allDone).length;
              return (
                <Row
                  key={hw.id}
                  icon={<NotebookPen size={16} />}
                  iconTone="blue"
                  title={hw.name || 'Vazifa'}
                  subtitle={`${(hw.items || []).length} ta mavzu · ${fmtDay(hw.assignedAt)}`}
                  detail={`${done}/${group.students.length}`}
                  onClick={() => navigate(`/corp/teacher/group/${group.id}/homework/${hw.id}`)}
                />
              );
            })}
          </Section>

          <Section title={`So'z to'plamlari (${group.packIds.length})`}>
            {group.packIds.map((pid) => {
              const pack = packById[pid];
              return (
                <Row
                  key={pid}
                  icon={<BookOpen size={16} />}
                  iconTone={pack?.isSystem ? 'purple' : 'blue'}
                  title={pack?.title || "O'chirilgan to'plam"}
                  subtitle={pack ? `${pack.wordsCount} so'z` : "Bu to'plam endi mavjud emas"}
                />
              );
            })}
            {!archived && (
              <Row icon={<Plus size={16} />} iconTone="gray" title={hasPacks ? "To'plamlarni o'zgartirish" : "To'plam biriktirish"} onClick={() => setSheet('packs')} />
            )}
          </Section>
        </div>
      </div>

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

function HomeworkChip({ state }) {
  if (state.allDone) return <span className="sa-chip tone-green"><Check size={12} strokeWidth={3} /> Bajardi</span>;
  return <span className={`sa-chip ${state.doneCount ? 'tone-orange' : ''}`}>{state.doneCount}/{state.total}</span>;
}

function ManageSheet({ open, group, onClose, onPick, onConfirm, showToast }) {
  const navigate = useNavigate();
  const { centerId, patchGroup, otherTeachers } = useTeacherData();
  const archived = group.status === 'archived';

  const pick = (next) => { onClose(); onPick(next); };

  const askNewCode = () => {
    onClose();
    onConfirm({
      title: 'Yangi taklif kodi',
      message: "Eski kod va QR darhol ishlamay qoladi. Guruhdagi o'quvchilarga ta'sir qilmaydi.",
      confirmLabel: 'Yangilash',
      run: async () => {
        const code = await regenerateGroupCode(centerId, group.id);
        patchGroup(group.id, (g) => ({ ...g, code }));
        showToast(`Yangi kod: ${code}`);
      },
    });
  };

  const askArchive = () => {
    onClose();
    onConfirm(archived
      ? {
        title: 'Guruhni tiklaysizmi?',
        message: "Guruh yana faol ro'yxatga qaytadi.",
        confirmLabel: 'Tiklash',
        run: async () => {
          await updateGroupStatus(centerId, group.id, 'active');
          patchGroup(group.id, (g) => ({ ...g, status: 'active' }));
          showToast('Guruh tiklandi');
        },
      }
      : {
        title: 'Guruhni arxivlaysizmi?',
        message: "Guruh faol ro'yxatdan olinadi. O'quvchilar va natijalar saqlanadi, keyin tiklash mumkin.",
        confirmLabel: 'Arxivlash',
        run: async () => {
          await updateGroupStatus(centerId, group.id, 'archived');
          patchGroup(group.id, (g) => ({ ...g, status: 'archived' }));
          navigate('/corp/teacher', { replace: true });
        },
      });
  };

  return (
    <Sheet open={open} onClose={onClose} title="Guruh sozlamalari">
      <Section>
        <Row title="Taklif kodi" detail={<span className="sa-mono">{group.code || '—'}</span>} />
        <Row title="Ochilgan" detail={fmtDay(group.createdAt) || '—'} />
      </Section>
      <Section>
        <Row icon={<Pencil size={16} />} iconTone="gray" title="Nomini o'zgartirish" onClick={() => pick('edit')} />
        {!archived && <Row icon={<RotateCw size={16} />} iconTone="blue" title="Yangi taklif kodi" onClick={askNewCode} />}
        {!archived && (
          <Row
            icon={<ArrowRightLeft size={16} />}
            iconTone="purple"
            title="Boshqa o'qituvchiga o'tkazish"
            subtitle={otherTeachers.length ? null : "Markazda boshqa o'qituvchi yo'q"}
            disabled={!otherTeachers.length}
            onClick={() => pick('transfer')}
          />
        )}
        <Row icon={<Archive size={16} />} iconTone="orange" title={archived ? 'Arxivdan tiklash' : 'Arxivlash'} onClick={askArchive} />
      </Section>
      <Section footer="Guruh, o'quvchilar ro'yxati va vazifa natijalari butunlay o'chadi. O'quvchilarning shaxsiy hisobi saqlanadi.">
        <Row icon={<Trash2 size={16} />} iconTone="red" title="Guruhni o'chirish" destructive chevron={false} onClick={() => pick('delete')} />
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
      showToast('Saqlandi');
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onClose={() => !saving && onClose()} title="Guruh nomi">
      <form onSubmit={submit}>
        <Field label="Guruh nomi">
          <input className="sa-input" required autoFocus value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Button type="submit" block disabled={saving || !name.trim() || name.trim() === group.name}>{saving ? 'Saqlanmoqda...' : 'Saqlash'}</Button>
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
        await navigator.share({ title: `${group.name} — VOC`, text: `"${group.name}" guruhiga qo'shiling:`, url });
        return;
      } catch {
        /* dismissed — fall through to Telegram */
      }
    }
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`"${group.name}" guruhiga qo'shiling`)}`, '_blank', 'noopener');
  };

  return (
    <Sheet open={open} onClose={onClose} title="O'quvchilarni taklif qilish">
      <div className="sa-qr">
        {qrSrc ? <img src={qrSrc} alt={`${group.name} guruhiga qo'shilish QR kodi`} /> : <div className="sa-qr-placeholder sa-skel" />}
      </div>
      <p className="sa-flow-lead" style={{ textAlign: 'center' }}>
        Telefon kamerasi bilan skanerlanadi — ro'yxatdan o'tgach o'quvchi avtomatik guruhga qo'shiladi.
      </p>
      <div className="sa-actions-stack">
        <Button onClick={share}><Share2 size={18} /> Telegram orqali yuborish</Button>
        <Button variant="tinted" onClick={() => copy(url, 'link')}>
          {copied === 'link' ? <Check size={18} /> : <Copy size={18} />} {copied === 'link' ? 'Havola nusxalandi' : 'Havolani nusxalash'}
        </Button>
      </div>
      <Section footer="O'quvchi ilovada Profil → Guruhga qo'shilish bo'limiga kiritadi.">
        <Row
          title="PIN kod"
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
      showToast(`Xatolik: ${err.message}`, 'error');
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
      subtitle={`${p.wordsCount} so'z`}
      chevron={false}
      accessory={<Toggle checked={group.packIds.includes(p.id)} disabled={busyId === p.id} onChange={(on) => toggle(p, on)} label={p.title} />}
    />
  );

  return (
    <Sheet open={open} onClose={onClose} title="So'z to'plamlari">
      <p className="sa-flow-lead">Yoqilgan to'plamlar o'quvchilarda ko'rinadi va ulardan vazifa berasiz. O'chirsangiz, o'quvchilar natijasi saqlanib qoladi.</p>
      {packs.length === 0 && <EmptyState title="To'plam yo'q" text={"\"To'plamlar\" bo'limida yangi to'plam yarating."} />}
      {shared.length > 0 && <Section title="Markaz to'plamlari">{shared.map(renderRow)}</Section>}
      {own.length > 0 && <Section title="Mening to'plamlarim">{own.map(renderRow)}</Section>}
      <Button block onClick={onClose}>Tayyor</Button>
    </Sheet>
  );
}

function TransferSheet({ open, group, onClose, onConfirm }) {
  const navigate = useNavigate();
  const { centerId, otherTeachers, patchGroup } = useTeacherData();

  const pick = (t) => {
    onClose();
    onConfirm({
      title: `${t.name}ga o'tkazasizmi?`,
      message: `"${group.name}" guruhi, o'quvchilari va vazifalari bilan ${t.name}ga o'tadi. Siz endi uni ko'rmaysiz.`,
      confirmLabel: "O'tkazish",
      danger: true,
      run: async () => {
        await transferGroup(centerId, group.id, t.id);
        patchGroup(group.id, (g) => ({ ...g, teacherId: t.id }));
        navigate('/corp/teacher', { replace: true });
      },
    });
  };

  return (
    <Sheet open={open} onClose={onClose} title="Kimga o'tkazasiz?">
      <Section>
        {otherTeachers.map((t) => (
          <Row
            key={t.id}
            icon={(t.name || '?').charAt(0).toUpperCase()}
            iconTone="purple"
            title={t.name || "O'qituvchi"}
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
    <Sheet open={open} onClose={() => !busy && onClose()} title="Guruhni o'chirish">
      <p className="sa-warning">
        <strong>{group.name}</strong> guruhidagi {group.activity.students} ta o'quvchining ro'yxati, {group.homework.length} ta vazifa va barcha natijalar butunlay o'chadi. Qaytarib bo'lmaydi.
      </p>
      <Field label={`Tasdiqlash uchun "${group.name}" deb yozing`}>
        <input className="sa-input" autoFocus autoComplete="off" value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={group.name} />
      </Field>
      {error && <p className="sa-flow-error">{error}</p>}
      <Button tone="red" block disabled={!matches || busy} onClick={remove}>{busy ? "O'chirilmoqda..." : "Butunlay o'chirish"}</Button>
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
      title: `${target.name} guruhdan chiqarilsinmi?`,
      message: "U guruh to'plamlari va vazifalarini ko'rmay qoladi. Shaxsiy hisobi va so'zlari saqlanadi.",
      confirmLabel: 'Chiqarish',
      danger: true,
      run: async () => {
        await removeStudentFromGroup(centerId, group.id, target.uid);
        patchGroup(group.id, (g) => {
          const next = { ...g.students };
          delete next[target.uid];
          return { ...g, students: next, studentsCount: Math.max(0, (g.studentsCount || 1) - 1) };
        });
        showToast(`${target.name} chiqarildi`);
      },
    });
  };

  return (
    <Sheet open={Boolean(student)} onClose={onClose} title={st?.name || "O'quvchi"}>
      {st && (
        <>
          <div className="sa-mini-stats">
            <Stat value={st.mastery == null ? '—' : `${st.mastery}%`} label="O'zlashtirish" />
            <Stat value={st.last ? formatRelative(st.last) : '—'} label="Oxirgi mashq" />
          </div>
          <Section>
            {st.email && <Row title="Email" detail={st.email} />}
            <Row title="Qo'shilgan" detail={fmtDay(st.joinedAt) || '—'} />
          </Section>

          {group.packIds.map((pid) => {
            const pack = packById[pid];
            if (!pack) return null;
            const agg = aggregatePackProgress((st.progress || {})[pid]);
            const units = getPackUnits(pack);
            return (
              <Section
                key={pid}
                title={pack.title}
                footer={agg.hasData
                  ? `${agg.wordsLearned} so'z o'rgandi · eslab qolish ${agg.retentionPercent}%${agg.atRiskCount ? ` · ${agg.atRiskCount} ta so'z unutilyapti` : ''}`
                  : 'Hali mashq qilmagan.'}
              >
                <div className="sa-chip-grid">
                  {units.map((u) => {
                    const us = agg.units[u.unitKey];
                    const m = us ? (us.masteryPercent || 0) : 0;
                    const tone = !us ? '' : m >= 80 ? 'tone-green' : m > 0 ? 'tone-orange' : '';
                    return (
                      <span key={u.unitKey} className={`sa-chip ${tone}`} title={`${u.monthTitle} — ${u.title}`}>
                        {u.title}{us ? ` · ${m}%` : ''}
                      </span>
                    );
                  })}
                  {units.length === 0 && <span className="sa-chip">Mavzular yo'q</span>}
                </div>
              </Section>
            );
          })}

          <Section>
            <Row title="Guruhdan chiqarish" destructive chevron={false} onClick={remove} />
          </Section>
        </>
      )}
    </Sheet>
  );
}
