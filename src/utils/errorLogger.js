import { ref, push } from 'firebase/database';
import { db, auth } from '../firebase';

const MAX_LOGS_PER_SESSION = 20;
let loggedCount = 0;

/**
 * Writes a crash/error report to Firebase RTDB under `error_logs` (readable
 * only by the app owner — see database.rules.json). Silently no-ops when the
 * user isn't authenticated (writes require auth) or the write itself fails,
 * since a broken logger must never throw on top of the original error.
 */
export function logError(error, context = {}) {
  try {
    if (loggedCount >= MAX_LOGS_PER_SESSION) return;
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    loggedCount += 1;
    const logsRef = ref(db, 'error_logs');
    push(logsRef, {
      userId: uid,
      message: String(error?.message || error || 'Unknown error').slice(0, 500),
      stack: String(error?.stack || '').slice(0, 2000),
      url: window.location?.href || '',
      userAgent: navigator.userAgent || '',
      context: context.context || '',
      timestamp: new Date().toISOString()
    }).catch(() => {});
  } catch {
    // never let the logger itself throw
  }
}

export function installGlobalErrorLogging() {
  window.addEventListener('error', (event) => {
    logError(event.error || event.message, { context: 'window.onerror' });
  });

  window.addEventListener('unhandledrejection', (event) => {
    logError(event.reason, { context: 'unhandledrejection' });
  });
}
