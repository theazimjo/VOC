import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, ChevronDown, ChevronUp, Copy, Link as LinkIcon, RotateCcw, Trash2, UserCog, UserPlus, Users, X } from 'lucide-react';
import { auth } from '../../../firebase';
import { approveTeacherRequest, createTeacher, declineTeacherRequest, getOrCreateTeacherJoinCode, inviteCenterAdmin, regenerateTeacherJoinCode, removeTeacherFromCenter, sendCorpPasswordReset } from '../../../services/corpService';
import { buildTeacherInviteUrl } from '../../../utils/pendingJoin';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Button, EmptyState, LoadingRows, Page, Row, Segmented } from '../super-admin/ui';
import { generatePassword } from '../super-admin/SetPasswordSheet';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useToast } from '../super-admin/useToast';
import { useCenterData } from './CenterDataContext';

function nameFromEmail(email) {
  if (!email) return 'Admin';
  return email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatLastLogin(ts) {
  if (!ts) return 'Never';
  const diffMs = Date.now() - ts;
  const mins = Math.floor(diffMs / (60 * 1000));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `about ${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatName(name) {
  if (!name) return 'Teacher';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[parts.length - 1]}, ${parts.slice(0, parts.length - 1).join(' ')}`;
  }
  return name;
}

function SortIcon({ active, dir }) {
  if (!active) return <ChevronDown size={12} style={{ opacity: 0.4 }} />;
  return dir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
}

const ROLE_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'admin', label: 'Admin' },
];

export default function AdminTeachers() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const myUid = auth.currentUser?.uid;
  const { centerId, centerName, center, loading, teachers, admins, reload, patch } = useCenterData();
  const requests = useMemo(
    () => Object.values(center?.teacherRequests || {}).sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || '')),
    [center],
  );
  const [requestBusy, setRequestBusy] = useState(null);

  const decideRequest = async (req, approve) => {
    setRequestBusy(req.uid);
    try {
      let teacher = null;
      if (approve) teacher = await approveTeacherRequest(centerId, centerName, req);
      else await declineTeacherRequest(centerId, req.uid);
      patch((c) => {
        const nextReq = { ...(c.teacherRequests || {}) };
        delete nextReq[req.uid];
        return { ...c, teacherRequests: nextReq, ...(teacher ? { teachers: { ...(c.teachers || {}), [teacher.id]: teacher } } : {}) };
      });
      showToast(approve ? `${req.name || req.email} is now a teacher` : 'Request declined');
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setRequestBusy(null);
    }
  };
  const [toastNode, showToast] = useToast();

  // Admins who exist only as corpUsers/{uid} — never a
  // `centers/{id}/teachers/{}` record (createCenterAdminAccount /
  // inviteCenterAdmin only ever write corpUsers/{uid} + coAdmins/{uid}, no
  // teacher row) — so without this they were simply invisible on their own
  // Faculty page, including to each other. Pinned above the sortable list —
  // no checkbox (not a teacher record, can't be bulk-removed the same way).
  // Opens the same kind of detail page a teacher row does, not a modal or
  // Settings — see AdminProfileDetail.jsx.
  const adminRows = useMemo(
    () => admins.map((a) => ({ ...a, name: nameFromEmail(a.email), isYou: a.uid === myUid })),
    [admins, myUid],
  );
  const openAdminRow = (a) => navigate(`/corp/admin/admins/${a.uid}`);

  const [inviteTeachersOpen, setInviteTeachersOpen] = useState(false);
  const [inviteAdminOpen, setInviteAdminOpen] = useState(false);
  const [inviteMenuOpen, setInviteMenuOpen] = useState(false);
  useNewParam('teacher', () => setInviteTeachersOpen(true));
  const [roleFilter, setRoleFilter] = useState('all');
  const [sort, setSort] = useState({ key: 'name', dir: 'asc' });
  const [selected, setSelected] = useState(() => new Set());
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const onMouseDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setInviteMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  const visible = useMemo(() => {
    const dir = sort.dir === 'asc' ? 1 : -1;
    return teachers
      .filter((t) => roleFilter === 'all' || (roleFilter === 'admin' ? t.role === 'admin' : t.role !== 'admin'))
      .sort((a, b) => {
        if (sort.key === 'name') return dir * (a.name || '').localeCompare(b.name || '');
        if (sort.key === 'lastActivity') return dir * ((a.lastActivity || 0) - (b.lastActivity || 0));
        return dir * ((a.studentsCount || 0) - (b.studentsCount || 0)) || (a.name || '').localeCompare(b.name || '');
      });
  }, [teachers, sort, roleFilter]);

  // The pinned admin rows are all Admins — hide them when filtering to
  // Teacher only.
  const showAdmins = roleFilter !== 'teacher';

  const toggleSort = (key) => setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));

  const open = (t) => navigate(`/corp/admin/teachers/${t.id}`);

  const toggleOne = (id) => setSelected((s) => {
    const next = new Set(s);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const toggleAll = () => setSelected((s) => (s.size === visible.length ? new Set() : new Set(visible.map((t) => t.id))));

  const deleteSelected = async () => {
    setDeleting(true);
    try {
      const ids = [...selected];
      await Promise.all(ids.map((id) => removeTeacherFromCenter(centerId, id, teachers.find((t) => t.id === id)?.uid)));
      patch((c) => {
        const next = { ...c.teachers };
        ids.forEach((id) => delete next[id]);
        return { ...c, teachers: next };
      });
      setSelected(new Set());
      setConfirmDelete(false);
      showToast(`${ids.length} teacher${ids.length > 1 ? 's' : ''} removed from the center`);
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Page hideHeader>
      {requests.length > 0 && (
        <section className="ca-card" style={{ marginBottom: 16, padding: 16 }}>
          <strong style={{ fontSize: 14 }}>Teacher requests ({requests.length})</strong>
          <p style={{ fontSize: 12, color: 'var(--sa-label-2, #64748b)', margin: '4px 0 10px' }}>
            These people used your invite link. They can't enter the teacher panel until you approve them.
          </p>
          {requests.map((r) => (
            <div key={r.uid} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '8px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{r.name || 'Teacher'}</div>
                <div style={{ fontSize: 12, color: 'var(--sa-label-2, #64748b)' }}>{r.email}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <Button onClick={() => decideRequest(r, true)} disabled={requestBusy === r.uid}>Approve</Button>
                <Button variant="tinted" tone="red" onClick={() => decideRequest(r, false)} disabled={requestBusy === r.uid}>Decline</Button>
              </div>
            </div>
          ))}
        </section>
      )}
      <section className="ca-card is-faculty-card">
        <div className="faculty-toolbar ca-faculty-toolbar">
          <div className="faculty-toolbar-left">
            <button type="button" className="faculty-icon-btn" title="Refresh" onClick={reload} disabled={loading}>
              <RotateCcw size={14} />
            </button>
            <Segmented label="Role" options={ROLE_FILTERS} value={roleFilter} onChange={setRoleFilter} />
            {/* Selection lives in the desktop table only. */}
            {isDesktop && (
              <button
                type="button"
                className="faculty-btn-delete"
                disabled={selected.size === 0}
                onClick={() => setConfirmDelete(true)}
              >
                <Trash2 size={14} /> Delete
              </button>
            )}
          </div>
          <div className="faculty-toolbar-right" ref={menuRef}>
            <div className="faculty-invite-wrap">
              <button type="button" className="faculty-btn-invite" onClick={() => setInviteMenuOpen((v) => !v)}>
                Invite<span className="ca-hide-sm"> Faculty</span> {inviteMenuOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {inviteMenuOpen && (
                <div className="faculty-dropdown-menu">
                  <button
                    type="button"
                    className="faculty-dropdown-item"
                    onClick={() => { setInviteMenuOpen(false); setInviteTeachersOpen(true); }}
                  >
                    <UserPlus size={18} />
                    <span>Invite Teachers</span>
                  </button>
                  <button
                    type="button"
                    className="faculty-dropdown-item"
                    onClick={() => { setInviteMenuOpen(false); setInviteAdminOpen(true); }}
                  >
                    <UserCog size={18} />
                    <span>Invite School Admin</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: 20 }}><LoadingRows count={4} /></div>
        ) : visible.length === 0 ? (
          <div className="sa-group" style={{ padding: 20 }}>
            <EmptyState
              icon={<Users size={40} />}
              title="No teachers yet"
              text="Invite a teacher — a login and password will be generated for them."
              action={<Button onClick={() => setInviteTeachersOpen(true)}>Invite Teachers</Button>}
            />
          </div>
        ) : isDesktop ? (
          <div className="faculty-table">
            <div className="faculty-table-head">
              <span>
                <input
                  type="checkbox"
                  checked={selected.size > 0 && selected.size === visible.length}
                  onChange={toggleAll}
                  aria-label="Select all"
                />
              </span>
              <button type="button" className="faculty-th-sort" onClick={() => toggleSort('name')}>
                TEACHER <SortIcon active={sort.key === 'name'} dir={sort.dir} />
              </button>
              <span>ROLE</span>
              <button type="button" className="faculty-th-sort" onClick={() => toggleSort('lastActivity')}>
                LAST LOGIN <SortIcon active={sort.key === 'lastActivity'} dir={sort.dir} />
              </button>
              <span>CLASSES</span>
              <span>STUDENTS</span>
              <span>SCHOOL</span>
            </div>

            {showAdmins && adminRows.map((a) => (
              <div key={a.uid} className="faculty-table-row" onClick={() => openAdminRow(a)}>
                <span />
                <div className="faculty-cell-name">
                  <span className="faculty-name-row">
                    <span className="faculty-name-link">{a.name}</span>
                    {a.isYou && <span className="faculty-you-badge">You</span>}
                  </span>
                  <span className="faculty-email-sub">{a.email}</span>
                </div>
                <span>Admin</span>
                <span>{a.isYou ? 'Now' : '—'}</span>
                <span>—</span>
                <span>—</span>
                <span>{centerName || 'None'}</span>
              </div>
            ))}
            {visible.map((t) => (
              <div
                key={t.id}
                className={`faculty-table-row ${selected.has(t.id) ? 'is-selected' : ''}`}
                onClick={() => open(t)}
              >
                <span onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selected.has(t.id)}
                    onChange={() => toggleOne(t.id)}
                    aria-label={`Select ${t.name}`}
                  />
                </span>
                <div className="faculty-cell-name">
                  <button type="button" className="faculty-name-link" onClick={(e) => { e.stopPropagation(); open(t); }}>
                    {formatName(t.name)}
                  </button>
                  <span className="faculty-email-sub">{t.email || t.phone || '—'}</span>
                </div>
                <span>{t.role === 'admin' ? 'Admin' : 'Teacher'}</span>
                <span>{formatLastLogin(t.lastActivity)}</span>
                <span>{t.groupsCount ?? 0}</span>
                <span>{t.studentsCount ?? 0}</span>
                <span>{centerName || 'None'}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="sa-group" style={{ padding: 12 }}>
            {showAdmins && adminRows.map((a) => (
              <Row
                key={a.uid}
                icon={a.name.charAt(0).toUpperCase()}
                iconTone="purple"
                title={a.isYou ? <>{a.name} <span className="faculty-you-badge">You</span></> : a.name}
                subtitle={a.isYou ? 'Admin · Now' : 'Admin'}
                onClick={() => openAdminRow(a)}
              />
            ))}
            {visible.map((t) => (
              <Row
                key={t.id}
                icon={(t.name || '?').charAt(0).toUpperCase()}
                iconTone="purple"
                title={t.name || 'Teacher'}
                subtitle={`${t.groupsCount} classes · ${t.studentsCount} students · ${formatLastLogin(t.lastActivity)}`}
                onClick={() => open(t)}
              />
            ))}
          </div>
        )}
      </section>

      <ConfirmSheet
        open={confirmDelete}
        title={`Remove ${selected.size} teacher${selected.size > 1 ? 's' : ''} from the center?`}
        message="They will no longer be able to sign in. Their classes will be left without a teacher."
        confirmLabel="Remove"
        cancelLabel="Cancel"
        danger
        busy={deleting}
        onConfirm={deleteSelected}
        onCancel={() => setConfirmDelete(false)}
      />

      <InviteTeachersModal
        open={inviteTeachersOpen}
        onClose={() => setInviteTeachersOpen(false)}
        centerId={centerId}
        centerName={centerName}
        teachers={teachers}
        onCreated={(teacher) => patch((c) => ({ ...c, teachers: { ...(c.teachers || {}), [teacher.id]: teacher } }))}
      />

      <InviteSchoolAdminModal
        open={inviteAdminOpen}
        onClose={() => setInviteAdminOpen(false)}
        centerId={centerId}
        centerName={centerName}
        onCreated={(coAdmin) => patch((c) => ({ ...c, coAdmins: { ...(c.coAdmins || {}), [coAdmin.uid]: coAdmin } }))}
      />

      {toastNode}
    </Page>
  );
}

// The reusable teacher-join link (shared here), plus a bulk by-hand invite
// (email or phone list) that creates real accounts directly.
// ?new=<kind> (the topbar's "+" menu) opens this page's create modal once,
// then drops the param so a refresh or Back doesn't reopen it.
function useNewParam(kind, openIt) {
  const [params, setParams] = useSearchParams();
  useEffect(() => {
    if (params.get('new') !== kind) return;
    openIt();
    const next = new URLSearchParams(params);
    next.delete('new');
    setParams(next, { replace: true });
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps
}

function InviteTeachersModal({ open, onClose, centerId, centerName, teachers, onCreated }) {
  const [emailsText, setEmailsText] = useState('');
  const [saving, setSaving] = useState(false);
  const [createdList, setCreatedList] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [error, setError] = useState('');

  const [joinCode, setJoinCode] = useState(null);
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    if (!open) return;
    setEmailsText('');
    setSaving(false);
    setCreatedList(null);
    setCopiedId(null);
    setError('');
    setLinkCopied(false);

    if (!centerId) return;
    setLinkLoading(true);
    getOrCreateTeacherJoinCode(centerId)
      .then(setJoinCode)
      .catch((err) => console.error('Error getting teacher join code:', err))
      .finally(() => setLinkLoading(false));
  }, [open, centerId]);

  if (!open) return null;

  const displaySchool = centerName || 'None';
  const inviteLink = joinCode ? buildTeacherInviteUrl(joinCode) : '';

  const resetLink = async () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
      return;
    }
    setConfirmReset(false);
    setLinkLoading(true);
    try {
      setJoinCode(await regenerateTeacherJoinCode(centerId));
    } catch (err) {
      setError(`Couldn't create a new link: ${err.message}`);
    } finally {
      setLinkLoading(false);
    }
  };

  const copyLink = () => {
    if (!inviteLink) return;
    navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  const copyCredentials = (item) => {
    navigator.clipboard.writeText(`Login: ${item.login}\nPassword: ${item.password}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId((id) => (id === item.id ? null : id)), 2000);
  };

  const handleReviewInvites = async (e) => {
    e.preventDefault();
    const rawList = emailsText
      .split(/[\n,;]+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (rawList.length === 0) {
      setError('Please enter at least one email address or phone number.');
      return;
    }

    setSaving(true);
    setError('');
    const results = [];
    const failures = [];

    // Already a teacher of this center — no need to touch Firebase at all,
    // we already have this list loaded.
    const existingContacts = new Set(
      (teachers || []).flatMap((t) => [t.email?.toLowerCase(), t.phone].filter(Boolean)),
    );

    for (const item of rawList) {
      const pwd = generatePassword();
      const isEmail = item.includes('@');
      const namePart = isEmail ? item.split('@')[0] : item;
      const formattedName = namePart.replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

      if (existingContacts.has(isEmail ? item.toLowerCase() : item)) {
        results.push({ id: item, login: item, alreadyInCenter: true });
        continue;
      }

      try {
        // Real emails become the sign-in email directly; a bare phone
        // number keeps the legacy phone-login path (createTeacher fills
        // in a synthetic @markaz.uz email for that case).
        const teacher = await createTeacher(centerId, centerName, {
          name: formattedName,
          phone: isEmail ? '' : item,
          email: isEmail ? item : undefined,
          password: pwd,
        });

        const createdItem = {
          id: teacher.id,
          uid: teacher.uid,
          name: formattedName,
          login: isEmail ? item : teacher.email,
          password: pwd,
          email: teacher.email,
          phone: isEmail ? '' : item,
          status: 'active',
          createdAt: new Date().toISOString(),
          emailSent: false,
        };

        // A real email gets an actual "set your password" email from
        // Firebase (the same mechanism as the admin's own password-reset
        // flow) — the generated password below is just a backup the admin
        // can share by hand if that email doesn't arrive.
        if (isEmail) {
          try {
            await sendCorpPasswordReset(item);
            createdItem.emailSent = true;
          } catch (mailErr) {
            console.warn('Invite email failed for', item, mailErr);
          }
        }

        onCreated(createdItem);
        results.push(createdItem);
      } catch (err) {
        // This email already has a Firebase Auth account somewhere — either
        // a personal VOC account, a teacher at a different center, or an
        // admin elsewhere. We can't tell which from the client (no
        // permission to look up another user's role), and the self-join
        // link only actually works for the first case (the corpUsers
        // self-write rule requires they don't already have a role), so we
        // don't promise it'll work — just say they're already registered.
        const alreadyRegistered = err.cause?.code === 'auth/email-already-in-use' || err.message.includes('already registered');
        if (alreadyRegistered && isEmail) {
          results.push({ id: item, login: item, alreadyElsewhere: true });
        } else {
          console.warn('Invite error for', item, err);
          failures.push(`${item}: ${err.message}`);
        }
      }
    }

    if (results.length > 0) {
      setCreatedList(results);
      if (failures.length > 0) {
        setError(`Couldn't invite ${failures.length}: ${failures.join('; ')}`);
      }
    } else {
      setError(failures.join('; ') || "Couldn't create accounts for the entries you entered.");
    }
    setSaving(false);
  };

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="invite-modal-card" onClick={(e) => e.stopPropagation()}>
        {createdList ? (
          <div>
            <div className="invite-modal-head">
              <div className="invite-modal-title">
                <UserPlus size={20} className="invite-title-icon" />
                <span>{createdList.length} Teacher{createdList.length > 1 ? 's' : ''} Invited!</span>
              </div>
              <button type="button" className="faculty-icon-btn" onClick={onClose} aria-label="Close"><X size={16} /></button>
            </div>
            <div className="invite-modal-body">
              {createdList.map((item) => (
                <div key={item.id} className="invite-result-row">
                  {item.alreadyInCenter ? (
                    <div>
                      <strong style={{ fontSize: 14 }}>{item.login}</strong>
                      <div style={{ fontSize: 12, color: 'var(--sa-label-2, #64748b)', marginTop: 3 }}>
                        Already a teacher in this center.
                      </div>
                    </div>
                  ) : item.alreadyElsewhere ? (
                    <div>
                      <strong style={{ fontSize: 14 }}>{item.login}</strong>
                      <div style={{ fontSize: 12, color: 'var(--sa-label-2, #64748b)', marginTop: 3 }}>
                        Already registered in VOC — can't be added directly. Ask them to contact you, or invite a different email.
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                      <div>
                        <strong style={{ fontSize: 14 }}>{item.name}</strong>
                        <div style={{ fontSize: 12, color: 'var(--sa-label-2, #64748b)', marginTop: 3 }}>
                          Login: <code>{item.login}</code> · Password: <code>{item.password}</code>
                        </div>
                        {item.emailSent && (
                          <div style={{ fontSize: 11.5, color: 'var(--sa-green, #16a34a)', marginTop: 3, fontWeight: 600 }}>
                            Sent them an email to set up their password
                          </div>
                        )}
                      </div>
                      <button type="button" className="faculty-icon-btn" onClick={() => copyCredentials(item)} aria-label="Copy credentials">
                        {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <Button onClick={onClose} block style={{ marginTop: 16 }}>Done</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReviewInvites}>
            <div className="invite-modal-head">
              <div className="invite-modal-title">
                <UserPlus size={20} className="invite-title-icon" />
                <span>Invite New Teachers to {displaySchool}</span>
              </div>
              <button type="button" className="invite-copy-btn" onClick={copyLink} disabled={!inviteLink || linkLoading}>
                <LinkIcon size={14} /> {linkCopied ? 'Link Copied!' : 'Copy Invite Link'}
              </button>
              <button type="button" className="invite-copy-btn" onClick={resetLink} disabled={!inviteLink || linkLoading} title="The old link stops working">
                <RotateCcw size={14} /> {confirmReset ? 'Tap again: old link stops working' : 'New link'}
              </button>
            </div>

            <div className="invite-modal-body">
              <label className="invite-field-label">Invite Teachers by Email</label>
              <div className="invite-textarea-wrap">
                <textarea
                  className="invite-textarea"
                  rows={5}
                  placeholder="Enter your teachers work email addresses."
                  value={emailsText}
                  onChange={(e) => setEmailsText(e.target.value)}
                  autoFocus
                />
                <div className="invite-textarea-note">
                  List one teacher work email per line. Each person gets an email to set their own password. People who use the invite link need your approval first.
                </div>
              </div>

              {error && <div className="sa-flow-error" style={{ marginTop: 10 }}>{error}</div>}

              <div className="invite-modal-foot">
                <button type="submit" className="faculty-btn-invite" disabled={saving}>
                  {saving ? 'Inviting...' : 'Review Invites'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// A second full center_admin for this center — VOC resolves the admin role
// purely from corpUsers/{uid}.role (see database.rules.json), so this is a
// real peer admin, not a differently-labeled teacher account.
function InviteSchoolAdminModal({ open, onClose, centerId, centerName, onCreated }) {
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [created, setCreated] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    setEmail('');
    setSaving(false);
    setCreated(null);
    setCopied(false);
    setError('');
  }, [open]);

  if (!open) return null;

  const displaySchool = centerName || 'None';

  const copyCredentials = () => {
    if (!created) return;
    navigator.clipboard.writeText(`Login: ${created.email}\nPassword: ${created.tempPassword}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter an email address.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const result = await inviteCenterAdmin(centerId, centerName, email.trim());
      setCreated(result);
      onCreated?.({ uid: result.uid, email: result.email, invitedAt: new Date().toISOString() });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="invite-modal-card" onClick={(e) => e.stopPropagation()}>
        {created ? (
          <div>
            <div className="invite-modal-head">
              <div className="invite-modal-title">
                <UserCog size={20} className="invite-title-icon" />
                <span>School Admin Invited!</span>
              </div>
              <button type="button" className="faculty-icon-btn" onClick={onClose} aria-label="Close"><X size={16} /></button>
            </div>
            <div className="invite-modal-body">
              <div className="invite-result-row">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ fontSize: 12, color: 'var(--sa-label-2, #64748b)' }}>
                    Login: <code>{created.email}</code> · Password: <code>{created.tempPassword}</code>
                  </div>
                  <button type="button" className="faculty-icon-btn" onClick={copyCredentials} aria-label="Copy credentials">
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
              <Button onClick={onClose} block style={{ marginTop: 16 }}>Done</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="invite-modal-head">
              <div className="invite-modal-title">
                <UserCog size={20} className="invite-title-icon" />
                <span>Invite New School Admin to {displaySchool}</span>
              </div>
              <button type="button" className="faculty-icon-btn" onClick={onClose} aria-label="Close"><X size={16} /></button>
            </div>

            <div className="invite-modal-body">
              <label className="invite-field-label">Email</label>
              <input
                type="email"
                className="invite-input"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
              />
              <div className="invite-textarea-note" style={{ marginTop: 8, borderTop: 'none', background: 'none', padding: 0 }}>
                They'll get the same access you have to this center — teachers, groups, students and settings.
              </div>

              {error && <div className="sa-flow-error" style={{ marginTop: 10 }}>{error}</div>}

              <div className="invite-modal-foot-spacebetween">
                <button type="button" className="invite-btn-cancel" onClick={onClose} disabled={saving}>Cancel</button>
                <button type="submit" className="faculty-btn-invite" disabled={saving}>
                  {saving ? 'Inviting...' : 'Invite'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
