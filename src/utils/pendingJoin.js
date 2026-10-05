// An invite link (/join/:code for a group, /join-teacher/:code for a
// center) opened by someone who isn't signed in yet. The code is parked
// here so that after login/registration the user lands back on the join
// page instead of the default dashboard. Cleared as soon as the join page
// has handled it (joined or dismissed).
const PENDING_JOIN_KEY = 'voc_pending_group_code';
const PENDING_TEACHER_JOIN_KEY = 'voc_pending_teacher_code';

export function setPendingJoinCode(code) {
  try { localStorage.setItem(PENDING_JOIN_KEY, code); } catch { /* storage unavailable */ }
}

export function clearPendingJoinCode() {
  try { localStorage.removeItem(PENDING_JOIN_KEY); } catch { /* storage unavailable */ }
}

export function setPendingTeacherJoinCode(code) {
  try { localStorage.setItem(PENDING_TEACHER_JOIN_KEY, code); } catch { /* storage unavailable */ }
}

export function clearPendingTeacherJoinCode() {
  try { localStorage.removeItem(PENDING_TEACHER_JOIN_KEY); } catch { /* storage unavailable */ }
}

// Path to resume a pending invite at, or null when there's none. Checked
// generically after every login/registration (see LoginPage/RegisterPage) —
// whichever kind of code is parked wins.
export function getPendingJoinPath() {
  try {
    const groupCode = localStorage.getItem(PENDING_JOIN_KEY);
    if (groupCode && /^\d{6}$/.test(groupCode)) return `/join/${groupCode}`;
    const teacherCode = localStorage.getItem(PENDING_TEACHER_JOIN_KEY);
    if (teacherCode && /^\d{6}$/.test(teacherCode)) return `/join-teacher/${teacherCode}`;
    return null;
  } catch {
    return null;
  }
}

// Links people share (invites, login) always point at the public site, not
// whatever host the sharer happens to be on (preview deploy, localhost).
export const PUBLIC_SITE_URL = (import.meta.env.VITE_PUBLIC_SITE_URL || 'https://vocabry.uz').replace(/\/+$/, '');

export function buildGroupInviteUrl(code) {
  return `${PUBLIC_SITE_URL}/join/${code}`;
}

export function buildTeacherInviteUrl(code) {
  return `${PUBLIC_SITE_URL}/join-teacher/${code}`;
}
