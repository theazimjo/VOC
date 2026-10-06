import { useState } from 'react';
import { Building2, GraduationCap, LogIn, Shield, UserRound, Users, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { enableAdminTeaching, joinGroupAsUser } from '../../services/corpService';
import { useRoleSwitch } from '../../hooks/useRoleSwitch';
import { clearViewAs, ROLE_HOME } from '../../utils/activeRole';
import { Button, Field, Sheet } from '../../pages/corp/super-admin/ui';

// "Switch role" part of the profile menu in every panel's topbar. One account
// can be a center admin, a teacher at the same center and a student; the super
// admin can also view any center as its admin or a teacher (see ViewAsPicker).
const ICON = { super_admin: Shield, center_admin: Building2, teacher: Users, student: GraduationCap, personal: UserRound };
const TITLE = {
  super_admin: 'Super admin',
  center_admin: 'Center admin panel',
  teacher: 'Teacher panel',
  student: 'Student view',
};

export default function RoleMenuItems({ onClose }) {
  const { user } = useAuth();
  const { identity, roles, current, switchTo, hasMembership } = useRoleSwitch();
  const [busy, setBusy] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (!identity) return null;
  const others = roles.filter((r) => r !== current);
  const canEnableTeaching = identity.realRole !== 'super_admin' && !identity.viewAs
    && (identity.roles || [identity.role]).includes('center_admin') && !(identity.roles || []).includes('teacher');
  const name = user?.displayName || identity.teacherName || identity.name || user?.email || '';

  const enableTeaching = async () => {
    setBusy(true);
    try {
      await enableAdminTeaching(identity.centerId, identity.uid, { name, email: user?.email || identity.email });
      switchTo('teacher');
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  const join = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await joinGroupAsUser(code.trim(), user.uid, { name: name || 'Student', email: user?.email || '' });
      switchTo('student');
    } catch (err) {
      setError(err.message || "Couldn't join");
      setBusy(false);
    }
  };

  return (
    <>
      {(others.length > 0 || canEnableTeaching || !hasMembership || identity.viewAs) && <div className="ca-topbar-menu-label">Switch role</div>}
      {identity.viewAs && (
        <button type="button" className="ca-topbar-menu-item" onClick={() => { clearViewAs(); window.location.assign(ROLE_HOME.super_admin); }}>
          <Eye size={15} /> Exit view-as (back to Super admin)
        </button>
      )}
      {others.filter((r) => !(identity.viewAs && r === 'super_admin')).map((r) => {
        const Icon = ICON[r] || UserRound;
        return (
          <button key={r} type="button" className="ca-topbar-menu-item" onClick={() => { onClose?.(); switchTo(r); }}>
            <Icon size={15} /> {TITLE[r]}
          </button>
        );
      })}
      {canEnableTeaching && (
        <button type="button" className="ca-topbar-menu-item" disabled={busy} onClick={enableTeaching}>
          <Users size={15} /> {busy ? 'Enabling…' : 'Also teach (enable teacher panel)'}
        </button>
      )}
      {!hasMembership && !identity.viewAs && (
        <button type="button" className="ca-topbar-menu-item" onClick={() => { onClose?.(); setJoinOpen(true); }}>
          <LogIn size={15} /> Join a group as a student
        </button>
      )}

      <Sheet open={joinOpen} onClose={() => !busy && setJoinOpen(false)} title="Join a group as a student" en>
        <form onSubmit={join}>
          <Field label="Group code (6 digits)">
            <input className="sa-input" inputMode="numeric" maxLength={6} autoFocus value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} placeholder="123456" />
          </Field>
          {error && <p className="sa-section-footer" role="alert">{error}</p>}
          <Button type="submit" block disabled={busy || code.length !== 6}>{busy ? 'Joining…' : 'Join and open student view'}</Button>
        </form>
      </Sheet>
      {error && !joinOpen && <div className="ca-topbar-menu-label" role="alert">{error}</div>}
    </>
  );
}
