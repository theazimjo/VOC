// Installing the web app on a computer (Edge / Chrome on Windows, macOS, Linux).
// The browser fires `beforeinstallprompt` once, early; it is kept here so the
// landing page's Download button can use it whenever the page has rendered.
//
// MS_STORE_URL: the Microsoft Store listing, once the package is published
// (windows-store/README.md). Empty means "not published yet": no Store button.
export const MS_STORE_URL = '';

let deferred = null;
let installed = false;
const listeners = new Set();
const emit = () => listeners.forEach((fn) => fn());

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferred = event;
    emit();
  });
  window.addEventListener('appinstalled', () => {
    deferred = null;
    installed = true;
    emit();
  });
}

export function subscribeInstall(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export const canPromptInstall = () => Boolean(deferred);
export const wasInstalled = () => installed;

// Opens the browser's own install dialog. Resolves to true when accepted.
export async function promptInstall() {
  if (!deferred) return false;
  const event = deferred;
  deferred = null;
  emit();
  try {
    await event.prompt();
    const choice = await event.userChoice;
    return choice?.outcome === 'accepted';
  } catch {
    return false;
  }
}

export function isWindows() {
  return typeof navigator !== 'undefined' && /Windows/i.test(navigator.userAgent || '');
}
