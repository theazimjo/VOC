import { ROLE_HOME } from './activeRole';

// Which part of the app this person used last on this device (personal, a
// group, or a teacher / center admin / super admin panel), so opening the app
// lands there instead of always on the learner side.
const KEY = 'voc_last_home';

export function rememberHome(role) {
  try { localStorage.setItem(KEY, role); } catch { /* storage blocked */ }
}

export function lastHome() {
  try {
    const role = localStorage.getItem(KEY);
    return role && ROLE_HOME[role] ? role : null;
  } catch {
    return null;
  }
}

// Where this visit started from, read once at load (before anything records the new visit).
const START = lastHome();
const STAFF_PANELS = new Set(['center_admin', 'teacher', 'super_admin']);
let startHandled = false;

// The first screen of a visit is the learner home ('/' or the group page). If the person
// last worked in a staff panel, this returns that panel's path - once; every later call
// (and every other path) returns null, so links and later navigation are never touched.
export function takeStartTarget(pathname) {
  if (startHandled) return null;
  if (pathname !== '/' && pathname !== '/corp/student') return null;
  startHandled = true;
  return STAFF_PANELS.has(START) ? ROLE_HOME[START] : null;
}
