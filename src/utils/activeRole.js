// Which role a multi-role account is acting as right now, kept per device.
// One account can be a center admin, a teacher at the same center (a linked
// teacher record) and a student (it joined a group), and the super admin can
// "view as" any center's admin or teacher. Like activeProfile.js this is a
// sticky preference read where the identity is resolved (useCorpRole), not
// app-wide React state: switching reloads the page into the new panel.
const ROLE_KEY = 'voc_active_role';
const VIEW_KEY = 'voc_view_as';

const read = (key) => {
  try { return localStorage.getItem(key); } catch { return null; }
};
const write = (key, value) => {
  try {
    if (value == null) localStorage.removeItem(key); else localStorage.setItem(key, value);
  } catch { /* storage blocked: the default role is used */ }
};

export const getActiveRole = () => read(ROLE_KEY);
export const setActiveRole = (role) => write(ROLE_KEY, role);
export const clearActiveRole = () => write(ROLE_KEY, null);

// Super admin only: { role: 'center_admin' | 'teacher', centerId, centerName, teacherId?, teacherName? }
export function getViewAs() {
  try {
    const v = JSON.parse(read(VIEW_KEY) || 'null');
    return v && v.centerId && (v.role === 'center_admin' || v.role === 'teacher') ? v : null;
  } catch {
    return null;
  }
}
export const setViewAs = (view) => write(VIEW_KEY, view ? JSON.stringify(view) : null);
export const clearViewAs = () => write(VIEW_KEY, null);

export const ROLE_HOME = {
  super_admin: '/corp/super-admin',
  center_admin: '/corp/admin',
  teacher: '/corp/teacher',
  student: '/corp/student',
  personal: '/',
};
