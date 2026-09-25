// Sticky "which profile am I using" preference for accounts that are both a
// personal learner and a center teacher. Read/written
// only at the two places that need it: LoginPage's post-login redirect, and
// the explicit "switch profile" actions in Settings / teacher dashboards.
// Deliberately a plain localStorage key rather than a React context — this
// is a sticky preference, not app-wide state anything needs to react to.
export const ACTIVE_PROFILE_KEY = 'voc_active_profile';

export function getActiveProfile() {
  return localStorage.getItem(ACTIVE_PROFILE_KEY);
}

export function setActiveProfile(profile) {
  localStorage.setItem(ACTIVE_PROFILE_KEY, profile);
}

