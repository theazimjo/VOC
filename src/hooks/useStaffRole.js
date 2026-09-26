import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useCorpRole, clearCorpIdentityCache } from './useCorpRole';
import { setActiveProfile } from '../utils/activeProfile';

// For the personal app: is this account also a teacher / center admin, and
// a way back into that panel. A super admin's identity always resolves to
// super_admin, so their teacher role is looked up directly.
//   staffRole: 'teacher' | 'center_admin' | null
export function useStaffRole() {
  const { user } = useAuth();
  const { identity } = useCorpRole();
  const navigate = useNavigate();
  const [staffRole, setStaffRole] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (identity?.role === 'teacher' || identity?.role === 'center_admin') {
      setStaffRole(identity.role);
    } else if (identity?.role === 'super_admin' && user?.uid) {
      get(ref(db, `corpUsers/${user.uid}/role`))
        .then((snap) => { if (!cancelled) setStaffRole(snap.val() === 'teacher' ? 'teacher' : null); })
        .catch(() => { if (!cancelled) setStaffRole(null); });
    } else {
      setStaffRole(null);
    }
    return () => { cancelled = true; };
  }, [identity, user]);

  // Remembers the choice, so the next sign-in opens the panel too.
  const selectStaffPanel = () => {
    if (staffRole === 'teacher') {
      setActiveProfile('teacher');
      clearCorpIdentityCache(user?.uid);
    }
  };

  const openStaffPanel = () => {
    selectStaffPanel();
    navigate(staffRole === 'center_admin' ? '/corp/admin' : '/corp/teacher');
  };

  return {
    staffRole,
    staffPath: staffRole === 'center_admin' ? '/corp/admin' : '/corp/teacher',
    staffLabel: staffRole === 'center_admin' ? "Markaz paneli" : "O'qituvchi paneli",
    selectStaffPanel,
    openStaffPanel,
  };
}
