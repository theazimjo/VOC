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

// Only the first page load of a visit (a new tab, or the app launched again) goes back
// to the last panel. A reload inside the same visit - which is how the app switches
// mode, e.g. staff panel -> personal - must be left alone, or the switch bounces back.
let FRESH = true;
try {
  FRESH = sessionStorage.getItem('voc_visit') !== '1';
  sessionStorage.setItem('voc_visit', '1');
} catch { /* no sessionStorage: treat every load as a launch */ }
const STAFF_PANELS = new Set(['center_admin', 'teacher', 'super_admin']);
let startHandled = false;

// The first screen of a visit is the learner home ('/' or the group page). If the person
// last worked in a staff panel, this returns that panel's path - once; every later call
// (and every other path) returns null, so links and later navigation are never touched.
export function takeStartTarget(pathname) {
  if (startHandled || !FRESH) return null;
  if (pathname !== '/' && pathname !== '/corp/student') return null;
  startHandled = true;
  return STAFF_PANELS.has(START) ? ROLE_HOME[START] : null;
}
