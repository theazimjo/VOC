import { useState } from 'react';
import { Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useGroupMode } from '../../hooks/useGroupMode';
import { SUPER_ADMINS } from '../../hooks/useCorpRole';
import { setAppMode, switchActiveGroup } from '../../services/corpService';
import { clearActiveRole, clearViewAs, ROLE_HOME } from '../../utils/activeRole';
import './ViewAsBanner.css';

// Shown above a panel the super admin opened with "view as": says whose panel
// it is and leads back to the super admin area.
export default function ViewAsBanner({ identity }) {
  if (!identity?.viewAs) return null;
  const who = identity.role === 'teacher'
    ? `teacher ${identity.teacherName || ''}`.trim()
    : 'center admin';
  return (
    <div className="va-banner" role="status">
      <Eye size={15} aria-hidden="true" />
      <span>Super admin view: you are using <b>{identity.centerName || 'this center'}</b> as {who}.</span>
      <button type="button" onClick={() => { clearViewAs(); window.location.assign(ROLE_HOME.super_admin); }}>Exit</button>
    </div>
  );
}

// The super admin accounts also use the student panel and the personal app;
// from both, this bar leads to the other two places: personal <-> student
// and the super admin panel. `mode` is where the person is right now.
export function SuperAdminReturnBar({ mode = 'student' }) {
  const { user } = useAuth();
  const { membership } = useGroupMode();
  const [busy, setBusy] = useState(false);
  if (!user?.email || !SUPER_ADMINS.includes(user.email.toLowerCase())) return null;

  const leave = async (fn, to) => {
    setBusy(true);
    try { await fn(); } catch (err) { console.error(err); }
    clearViewAs();
    clearActiveRole();
    window.location.assign(to);
  };
  const toAdmin = () => leave(async () => {}, ROLE_HOME.super_admin);
  const toPersonal = () => leave(() => setAppMode(user.uid, 'individual'), ROLE_HOME.personal);
  const toStudent = () => leave(() => switchActiveGroup(user.uid, membership.groupId), ROLE_HOME.student);

  return (
    <div className={`va-banner ${mode === 'personal' ? 'va-banner--inline' : ''}`} role="status">
      <Eye size={15} aria-hidden="true" />
      <span>{mode === 'personal' ? 'Personal view' : 'Student view'} — you are signed in as <b>super admin</b>.</span>
      {mode === 'student' && <button type="button" disabled={busy} onClick={toPersonal}>Personal</button>}
      {mode === 'personal' && membership && <button type="button" disabled={busy} onClick={toStudent}>Student</button>}
      <button type="button" disabled={busy} onClick={toAdmin}>Super admin panel</button>
    </div>
  );
}
