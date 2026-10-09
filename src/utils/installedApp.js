// True when VOCABRY runs as an app (the Android app from Google Play, or the
// installed web app) rather than as a page in a browser tab. There the public
// landing page makes no sense: the app opens straight on the sign-in screen.
//   Play app (Trusted Web Activity): referrer is android-app://<package>
//   installed web app: display-mode standalone / fullscreen, or navigator.standalone on iOS
let cached = null;

export function isInstalledApp() {
  if (cached !== null) return cached;
  let yes = false;
  try {
    // the referrer only exists on launch, so remember it for the rest of the session
    if (document.referrer.startsWith('android-app://')) sessionStorage.setItem('voc-installed-app', '1');
    yes = sessionStorage.getItem('voc-installed-app') === '1'
      || window.matchMedia('(display-mode: standalone)').matches
      || window.matchMedia('(display-mode: fullscreen)').matches
      || window.navigator.standalone === true;
  } catch { /* no storage or matchMedia: treat as a browser tab */ }
  cached = yes;
  return yes;
}
