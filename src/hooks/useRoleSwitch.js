import { useCallback, useMemo } from 'react';
import { useCorpRole } from './useCorpRole';
import { useGroupMode } from './useGroupMode';
import { clearViewAs, ROLE_HOME, setActiveRole, clearActiveRole } from '../utils/activeRole';
import { setActiveProfile } from '../utils/activeProfile';
import { rememberHome } from '../utils/lastHome';
import { useAuth } from '../contexts/AuthContext';
import { setAppMode } from '../services/corpService';

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
  const { user } = useAuth();

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

  const switchTo = useCallback(async (role) => {
    clearViewAs();
    rememberHome(role);
    if (role === 'teacher') { setActiveRole('teacher'); setActiveProfile('teacher'); }
    else if (role === 'personal') { setActiveProfile('personal'); clearActiveRole(); }
    else clearActiveRole();
    // An account that once joined a group is kept in group mode, which sends '/' to the
    // group page: the mode itself has to change too, before the page reloads.
    if (user?.uid && (role === 'personal' || role === 'student')) {
      try { await setAppMode(user.uid, role === 'personal' ? 'individual' : 'group'); } catch (err) { console.warn('Could not save the mode:', err); }
    }
    window.location.assign(ROLE_HOME[role] || '/');
  }, [user]);

  return { loading, identity, roles, current, switchTo, hasMembership: Boolean(membership) };
}
