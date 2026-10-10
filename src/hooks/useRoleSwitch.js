import { useCallback, useMemo } from 'react';
import { useCorpRole } from './useCorpRole';
import { useGroupMode } from './useGroupMode';
import { clearViewAs, ROLE_HOME, setActiveRole, clearActiveRole } from '../utils/activeRole';
import { setActiveProfile } from '../utils/activeProfile';
import { rememberHome } from '../utils/lastHome';

// The roles this account can act as, and how to change. Switching saves the
// choice and reloads into the new panel's home, so the identity is resolved
// again from scratch (useCorpRole).
export const ROLE_LABEL = {
  super_admin: 'Super admin',
  center_admin: 'Center admin',
  teacher: 'Teacher',
  student: 'Student',
  personal: 'Personal',
};

export function useRoleSwitch() {
  const { loading, identity } = useCorpRole();
  const { membership } = useGroupMode();

  // What the account really is (a super admin "viewing as" is still a super admin).
  const base = useMemo(() => {
    if (!identity) return [];
    if (identity.viewAs) return ['super_admin'];
    return identity.roles || [identity.realRole || identity.role];
  }, [identity]);

  const roles = useMemo(() => {
    const list = [...base];
    if (membership) list.push('student');
    return list;
  }, [base, membership]);

  // Which one the person is acting as right now.
  const current = identity?.viewAs ? identity.role : (identity?.role || null);

  const switchTo = useCallback((role) => {
    clearViewAs();
    rememberHome(role);
    if (role === 'teacher') { setActiveRole('teacher'); setActiveProfile('teacher'); }
    else if (role === 'personal') { setActiveProfile('personal'); clearActiveRole(); }
    else clearActiveRole();
    window.location.assign(ROLE_HOME[role] || '/');
  }, []);

  return { loading, identity, roles, current, switchTo, hasMembership: Boolean(membership) };
}
