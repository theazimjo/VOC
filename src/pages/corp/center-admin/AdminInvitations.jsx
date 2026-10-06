import { useMemo, useState } from 'react';
import { Mail, Send, X } from 'lucide-react';
import { EmptyState, Segmented } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';

// Status of one invitation, from the log plus the teacher's own record.
//   pending  – sent, not opened yet
//   accepted – the teacher opened their panel (or the admin approved a link request)
//   canceled – the admin removed the teacher before they ever joined
//   removed  – the admin removed them after they had joined
//   declined – a link request the admin turned down
export function invitationStatus(inv, teacherById) {
  if (inv.declinedAt) return 'declined';
  const accepted = inv.acceptedAt || (inv.teacherId && teacherById[inv.teacherId]?.acceptedAt);
  if (inv.canceledAt) return accepted ? 'removed' : 'canceled';
  return accepted ? 'accepted' : 'pending';
}

const STATUS_LABEL = { pending: 'Pending', accepted: 'Accepted', canceled: 'Canceled', removed: 'Removed', declined: 'Declined' };
const STATUS_STYLE = {
  pending: { background: 'rgba(255,176,32,0.22)', color: '#8a5a00' },
  accepted: { background: 'rgba(52,199,89,0.18)', color: '#1d7a3a' },
  canceled: { background: 'rgba(16,17,19,0.08)', color: '#4a4c52' },
  removed: { background: 'rgba(16,17,19,0.08)', color: '#4a4c52' },
  declined: { background: 'rgba(255,59,48,0.14)', color: '#b3261e' },
};

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'closed', label: 'Canceled' },
];

const COLS = 'minmax(200px, 1.8fr) 70px minmax(200px, 1.8fr) 150px 110px minmax(130px, 1fr)';

const fmt = (iso) => (iso
  ? new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  : '—');

function StatusBadge({ status }) {
  return <span className="faculty-you-badge" style={STATUS_STYLE[status]}>{STATUS_LABEL[status]}</span>;
}

// The full invitation log: who was invited, by whom, when, and where it ended up.
export default function AdminInvitations({ invitations, pendingRequests, teachers, onCancel, onResend, busyId }) {
  const [filter, setFilter] = useState('all');
  const isDesktop = useIsDesktop();

  const teacherById = useMemo(() => Object.fromEntries(teachers.map((t) => [t.id, t])), [teachers]);

  const rows = useMemo(() => {
    const logged = invitations.map((inv) => ({ ...inv, status: invitationStatus(inv, teacherById) }));
    // Link requests that nobody has decided yet.
    const waiting = pendingRequests.map((r) => ({
      id: `req_${r.uid}`,
      via: 'link',
      name: r.name || r.email,
      email: r.email,
      invitedAt: r.createdAt,
      status: 'pending',
      isRequest: true,
    }));
    return [...waiting, ...logged].sort((a, b) => (b.invitedAt || '').localeCompare(a.invitedAt || ''));
  }, [invitations, pendingRequests, teacherById]);

  const visible = rows.filter((r) => filter === 'all'
    || (filter === 'closed' ? ['canceled', 'removed', 'declined'].includes(r.status) : r.status === filter));

  const counts = rows.reduce((acc, r) => ({ ...acc, [r.status]: (acc[r.status] || 0) + 1 }), {});
  const summary = `${counts.pending || 0} pending · ${counts.accepted || 0} accepted · ${(counts.canceled || 0) + (counts.removed || 0) + (counts.declined || 0)} closed`;

  const by = (r) => (r.via === 'link'
    ? (r.isRequest ? 'Invite link (self-request)' : `Invite link${r.decidedByEmail ? ` · ${r.decidedByEmail}` : ''}`)
    : (r.invitedByEmail || '—'));

  const canAct = (r) => r.via === 'email' && r.status === 'pending' && r.teacherId;

  return (
    <section className="ca-card is-faculty-card">
      <div className="faculty-toolbar ca-faculty-toolbar ca-inv-toolbar">
        <div className="faculty-toolbar-left">
          <Segmented label="Status" options={FILTERS} value={filter} onChange={setFilter} />
        </div>
        <div className="faculty-toolbar-right ca-inv-summary">{summary}</div>
      </div>

      {visible.length === 0 ? (
        <div className="sa-group" style={{ padding: 20 }}>
          <EmptyState
            icon={<Mail size={40} />}
            title="No invitations here"
            text="Teachers you invite by email, and people who use your invite link, will be listed here with their status."
          />
        </div>
      ) : (
        isDesktop ? (
          <div className="faculty-table">
            <div className="faculty-table-head" style={{ gridTemplateColumns: COLS }}>
              <span>INVITED</span>
              <span>HOW</span>
              <span>INVITED BY</span>
              <span>SENT</span>
              <span>STATUS</span>
              <span>{filter === 'accepted' ? 'JOINED' : ''}</span>
            </div>
            {visible.map((r) => (
              <div key={r.id} className="faculty-table-row ca-inv-row" style={{ gridTemplateColumns: COLS, cursor: 'default' }}>
                <div className="faculty-cell-name">
                  <span className="faculty-name-link" style={{ cursor: 'default' }}>{r.name}</span>
                  <span className="faculty-email-sub">{r.email}</span>
                </div>
                <span>{r.via === 'link' ? 'Link' : 'Email'}</span>
                <span style={{ overflowWrap: 'anywhere' }}>{by(r)}</span>
                <span>{fmt(r.invitedAt)}</span>
                <span><StatusBadge status={r.status} /></span>
                <span style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12 }}>
                  {canAct(r) ? (
                    <>
                      <button type="button" className="faculty-icon-btn" title="Resend email" aria-label="Resend email" disabled={busyId === r.id} onClick={() => onResend(r)}><Send size={14} /></button>
                      <button type="button" className="faculty-icon-btn" title="Cancel invitation" aria-label="Cancel invitation" disabled={busyId === r.id} onClick={() => onCancel(r)}><X size={14} /></button>
                    </>
                  ) : r.acceptedAt ? `Joined ${fmt(r.acceptedAt)}` : r.canceledAt ? fmt(r.canceledAt) : r.declinedAt ? fmt(r.declinedAt) : ''}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <ul className="ca-inv-list">
            {visible.map((r) => (
              <li key={r.id} className="ca-inv-card">
                <div className="ca-inv-top">
                  <span className="ca-inv-name">{r.name}</span>
                  <StatusBadge status={r.status} />
                </div>
                <div className="ca-inv-email">{r.email}</div>
                <dl className="ca-inv-meta">
                  <div><dt>How</dt><dd>{r.via === 'link' ? 'Invite link' : 'Email'}</dd></div>
                  <div><dt>By</dt><dd>{by(r)}</dd></div>
                  <div><dt>Sent</dt><dd>{fmt(r.invitedAt)}</dd></div>
                  {r.acceptedAt && <div><dt>Joined</dt><dd>{fmt(r.acceptedAt)}</dd></div>}
                  {r.canceledAt && <div><dt>Canceled</dt><dd>{fmt(r.canceledAt)}</dd></div>}
                  {r.declinedAt && <div><dt>Declined</dt><dd>{fmt(r.declinedAt)}</dd></div>}
                </dl>
                {canAct(r) && (
                  <div className="ca-inv-actions">
                    <button type="button" className="faculty-btn-secondary" disabled={busyId === r.id} onClick={() => onResend(r)}><Send size={14} /> Resend email</button>
                    <button type="button" className="faculty-btn-secondary" disabled={busyId === r.id} onClick={() => onCancel(r)}><X size={14} /> Cancel</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )
      )}
    </section>
  );
}
