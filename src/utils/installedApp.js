// True when VOCABRY runs as an app (the Android app from Google Play, or the
// installed web app) rather than as a page in a browser tab. There the public
// landing page makes no sense: the app opens straight on the sign-in screen.
//   Play app (Trusted Web Activity): referrer is android-app://<package>
//   installed web app (also the Microsoft Store one): display-mode standalone / fullscreen / minimal-ui /
//   window-controls-overlay, ?source=pwa on launch, or navigator.standalone on iOS
let cached = null;

export function isInstalledApp() {
  if (cached !== null) return cached;
  let yes = false;
  try {
    // the referrer only exists on launch, so remember it for the rest of the session
    // the manifest's start_url carries ?source=pwa, so an installed app announces itself on launch
    if (document.referrer.startsWith('android-app://') || new URLSearchParams(window.location.search).get('source') === 'pwa') {
      sessionStorage.setItem('voc-installed-app', '1');
    }
    yes = sessionStorage.getItem('voc-installed-app') === '1'
      || ['standalone', 'fullscreen', 'minimal-ui', 'window-controls-overlay'].some((m) => window.matchMedia(`(display-mode: ${m})`).matches)
      || window.navigator.standalone === true;
  } catch { /* no storage or matchMedia: treat as a browser tab */ }
  cached = yes;
  return yes;
}
