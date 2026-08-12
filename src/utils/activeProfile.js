// Sticky "which profile am I using" preference for accounts that are both a
// personal learner and a teacher (center-joined or independent). Read/written
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

// A second, narrower preference for accounts that hold BOTH a center and an
// independent teacher affiliation at once (see getTeacherAffiliations in
// corpService.js) — which one 'teacher' profile mode actually resolves to.
// Irrelevant (and untouched) for accounts with only one affiliation.
export const ACTIVE_TEACHER_AFFILIATION_KEY = 'voc_active_teacher_affiliation';

export function getActiveTeacherAffiliation() {
  return localStorage.getItem(ACTIVE_TEACHER_AFFILIATION_KEY); // 'independent' | 'center' | null
}

export function setActiveTeacherAffiliation(affiliation) {
  localStorage.setItem(ACTIVE_TEACHER_AFFILIATION_KEY, affiliation);
}
