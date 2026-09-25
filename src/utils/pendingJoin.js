// A group invite link (/join/:code) opened by someone who isn't signed in
// yet. The code is parked here so that after login/registration the user
// lands back on the join page instead of the default dashboard. Cleared as
// soon as the join page has handled it (joined or dismissed).
const PENDING_JOIN_KEY = 'voc_pending_group_code';

export function setPendingJoinCode(code) {
  try { localStorage.setItem(PENDING_JOIN_KEY, code); } catch { /* storage unavailable */ }
}

export function clearPendingJoinCode() {
  try { localStorage.removeItem(PENDING_JOIN_KEY); } catch { /* storage unavailable */ }
}

// Path to resume a pending invite at, or null when there's none.
export function getPendingJoinPath() {
  try {
    const code = localStorage.getItem(PENDING_JOIN_KEY);
    return code && /^\d{6}$/.test(code) ? `/join/${code}` : null;
  } catch {
    return null;
  }
}

export function buildGroupInviteUrl(code) {
  return `${window.location.origin}/join/${code}`;
}
