import { auth } from '../../../firebase';

// Client for /api/blog (super-admin actions). The server re-checks the caller's
// ID token against the super-admin list, so this is only a convenience wrapper.
async function call(action, body = {}) {
  const idToken = await auth.currentUser?.getIdToken();
  const res = await fetch('/api/blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken, action, ...body }),
  });
  let data = {};
  try {
    data = await res.json();
  } catch {
    /* non-JSON error page */
  }
  if (!res.ok) throw new Error(data.error || `Server xatosi (${res.status})`);
  return data;
}

export const listBlogPosts = async () => (await call('list')).posts;
export const saveBlogPost = async (post) => (await call('save', { post })).post;
export const deleteBlogPost = (id) => call('delete', { id });

/** "Yangi so'z nega..." -> "yangi-soz-nega" (Latin letters, digits, dashes). */
export function slugFromTitle(title) {
  return String(title || '')
    .toLowerCase()
    .replace(/[‘’ʻʼ'`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

export const todayIso = () => new Date().toISOString().slice(0, 10);

export const EMPTY_POST = () => ({
  id: null,
  slug: '',
  date: todayIso(),
  cover: 'board',
  published: false,
  uz: { title: '', excerpt: '', body: '' },
  ru: { title: '', excerpt: '', body: '' },
  en: { title: '', excerpt: '', body: '' },
});
