/**
 * Practice-session tracker. Reviews that happen within IDLE_MS of each other
 * share a session id, so analyses can tell "repeated inside one sitting"
 * (elapsed time carries no information) from genuinely spaced reviews. Kept
 * in memory per tab; no storage, no identifiers beyond a random token.
 */
export const SESSION_IDLE_MS = 30 * 60 * 1000;

export function createSessionTracker({ idleMs = SESSION_IDLE_MS, random = Math.random } = {}) {
  let id = null;
  let lastAt = 0;
  return function sessionIdAt(nowMs = Date.now()) {
    if (id === null || nowMs - lastAt > idleMs) {
      id = Math.floor(random() * 36 ** 6).toString(36).padStart(6, '0');
    }
    lastAt = nowMs;
    return id;
  };
}
