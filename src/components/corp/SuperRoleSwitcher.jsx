import { useEffect, useState } from 'react';
import { Building2, GraduationCap, Shield, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { SUPER_ADMINS } from '../../hooks/useCorpRole';
import { useRoleSwitch } from '../../hooks/useRoleSwitch';
import { getAllCenters, joinGroupAsUser, switchActiveGroup } from '../../services/corpService';
import { useGroupMode } from '../../hooks/useGroupMode';
import { clearActiveRole, clearViewAs, ROLE_HOME, setViewAs } from '../../utils/activeRole';
import { LoadingRows, Row, Section, Sheet } from '../../pages/corp/super-admin/ui';

// Settings section that only the super admin accounts see: act as the super
// admin, as a center's admin, as one of its teachers, or as a student of one of
// its groups. A center admin or teacher is "viewed" (see utils/activeRole.js and
// the banner in the panels); a student is a real group membership of the
// super admin's own account. Everyone else never sees this section.
export const isSuperAdminEmail = (email) => Boolean(email && SUPER_ADMINS.includes(email.toLowerCase()));

const activeGroups = (center) => Object.entries(center.groups || {})
  .map(([id, g]) => ({ id, ...g }))
  .filter((g) => g.status !== 'archived' && g.code);

export default function SuperRoleSwitcher() {
  const { user } = useAuth();
  const { current, identity } = useRoleSwitch();
  const { membership } = useGroupMode();
  const allowed = isSuperAdminEmail(user?.email);

  const [pick, setPick] = useState(null); // null | { role: 'center_admin' | 'teacher' | 'student', center? }
  const [centers, setCenters] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!pick || centers) return;
    getAllCenters().then(setCenters).catch((err) => { setError(err.message); setCenters([]); });
  }, [pick, centers]);

  if (!allowed) return null;

  const go = (role) => { window.location.assign(ROLE_HOME[role]); };
  const view = (role, center, teacher) => {
    setViewAs({
      role,
      centerId: center.id,
      centerName: center.name || '',
      ...(role === 'teacher' ? { teacherId: teacher.id, teacherName: teacher.name || '' } : {}),
    });
    go(role);
  };
  const joinAsStudent = async (group) => {
    setBusy(true);
    setError('');
    try {
      await joinGroupAsUser(group.code, user.uid, { name: user.displayName || user.email, email: user.email || '' });
      clearViewAs();
      clearActiveRole();
      go('student');
    } catch (err) {
      setError(err.message || "Couldn't join");
      setBusy(false);
    }
  };

  // The account already is a student somewhere (it joined a group before):
  // go straight to that student profile instead of asking for a group again.
  const openMyStudent = async () => {
    setBusy(true);
    setError('');
    try {
      await switchActiveGroup(user.uid, membership.groupId);
      clearViewAs();
      clearActiveRole();
      go('student');
    } catch (err) {
      setError(err.message || "Couldn't open the student profile");
      setBusy(false);
    }
  };

  const now = identity?.viewAs ? identity.role : current;
  const title = pick ? { center_admin: 'Center admin of…', teacher: 'Teacher at…', student: 'Student in…' }[pick.role] : '';
  const centerList = (centers || []).filter((c) => c.status !== 'suspended');

  return (
    <>
      <Section title="Act as (only you can see this)">
        <Row icon={<Shield size={16} />} iconTone="blue" title="Super admin" detail={now === 'super_admin' ? 'Current' : undefined} onClick={() => { clearViewAs(); clearActiveRole(); go('super_admin'); }} />
        <Row icon={<Building2 size={16} />} iconTone="purple" title="Center admin" detail={now === 'center_admin' ? 'Current' : undefined} onClick={() => setPick({ role: 'center_admin' })} />
        <Row icon={<Users size={16} />} iconTone="green" title="Teacher" detail={now === 'teacher' ? 'Current' : undefined} onClick={() => setPick({ role: 'teacher' })} />
        {membership ? (
          <>
            <Row
              icon={<GraduationCap size={16} />}
              iconTone="orange"
              title="Student"
              subtitle={membership.groupName || 'Your student profile'}
              detail={busy ? 'Opening…' : now === 'student' ? 'Current' : 'Open'}
              onClick={busy ? undefined : openMyStudent}
            />
            <Row icon={<GraduationCap size={16} />} iconTone="gray" title="Join another group as a student…" onClick={() => setPick({ role: 'student' })} />
          </>
        ) : (
          <Row icon={<GraduationCap size={16} />} iconTone="orange" title="Student" subtitle="Join a group to get a student profile" onClick={() => setPick({ role: 'student' })} />
        )}
      </Section>
      {error && !pick && <p className="sa-section-footer" role="alert">{error}</p>}

      <Sheet open={Boolean(pick)} onClose={() => !busy && (setPick((p) => (p?.center ? { role: p.role } : null)))} title={pick?.center ? pick.center.name || 'Center' : title} en>
        {error && <p className="sa-section-footer" role="alert">{error}</p>}
        {centers === null && <LoadingRows count={3} />}
        {pick && !pick.center && centers && (
          <Section>
            {centerList.length === 0 && <Row title="No centers yet" />}
            {centerList.map((c) => (
              <Row
                key={c.id}
                icon={(c.name || '?').charAt(0).toUpperCase()}
                iconTone="gray"
                title={c.name || 'Center'}
                subtitle={c.adminEmail}
                onClick={() => (pick.role === 'center_admin' ? view('center_admin', c) : setPick({ role: pick.role, center: c }))}
              />
            ))}
          </Section>
        )}
        {pick?.center && pick.role === 'teacher' && (
          <Section>
            {Object.entries(pick.center.teachers || {}).length === 0 && <Row title="This center has no teachers yet" />}
            {Object.entries(pick.center.teachers || {}).map(([id, t]) => (
              <Row key={id} icon={(t.name || '?').charAt(0).toUpperCase()} iconTone="purple" title={t.name || 'Teacher'} subtitle={t.email} onClick={() => view('teacher', pick.center, { id, ...t })} />
            ))}
          </Section>
        )}
        {pick?.center && pick.role === 'student' && (
          <Section>
            {activeGroups(pick.center).length === 0 && <Row title="No active groups with a join code" />}
            {activeGroups(pick.center).map((g) => (
              <Row key={g.id} icon={<GraduationCap size={16} />} iconTone="orange" title={g.name || 'Group'} subtitle={g.level} detail={busy ? 'Joining…' : 'Join'} onClick={busy ? undefined : () => joinAsStudent(g)} />
            ))}
          </Section>
        )}
      </Sheet>
    </>
  );
}
