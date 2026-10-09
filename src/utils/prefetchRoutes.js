// The bottom bar / sidebar pages are separate chunks, so the first visit to each
// used to wait for a download (several seconds on a phone). Once the screen
// that opened is idle, the other main pages of the same area are fetched in the
// background, one at a time. Big data files (market words, grammar levels, book
// texts) are NOT part of this: they load only when something needs them.
const PERSONAL = [
  () => import('../pages/personal/LibraryPage'),
  () => import('../pages/grammar/GrammarPage'),
  () => import('../pages/personal/ProfilePage'),
  () => import('../pages/personal/PackDetail'),
  () => import('../pages/personal/Dashboard'),
];
const STUDENT = [
  () => import('../pages/corp/student/learn/StudentCorpLearn'),
  () => import('../pages/corp/student/StudentCorpProfile'),
  () => import('../pages/corp/student/StudentCorpOverview'),
  () => import('../pages/corp/student/practice/CorpPractice'),
];

function pick(pathname) {
  if (pathname.startsWith('/corp/student') || pathname.startsWith('/corp/practice')) return STUDENT;
  if (pathname.startsWith('/corp') || pathname.startsWith('/admin') || pathname.startsWith('/blog') || pathname.startsWith('/privacy')) return [];
  return PERSONAL;
}

export function prefetchMainRoutes() {
  // data-saver mode or a very slow connection: don't spend the user's data
  const conn = navigator.connection;
  if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''))) return () => {};
  const queue = [...pick(window.location.pathname)];
  let stopped = false;
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 300));
  const next = () => {
    if (stopped || queue.length === 0) return;
    const load = queue.shift();
    load().catch(() => {}).finally(() => idle(next));
  };
  const timer = setTimeout(() => idle(next), 2500);
  return () => { stopped = true; clearTimeout(timer); };
}
