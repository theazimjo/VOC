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
