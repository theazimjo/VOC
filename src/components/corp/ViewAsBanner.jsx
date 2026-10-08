import { Eye } from 'lucide-react';
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

// Student view of a super admin account (it joined a group as a student): the
// app keeps sending that account to the student panel, so the way back to the
// super admin panel is always shown here.
export function SuperAdminReturnBar() {
  return (
    <div className="va-banner" role="status">
      <Eye size={15} aria-hidden="true" />
      <span>Student view — you are signed in as <b>super admin</b>.</span>
      <button type="button" onClick={() => { clearViewAs(); clearActiveRole(); window.location.assign(ROLE_HOME.super_admin); }}>Super admin panel</button>
    </div>
  );
}
