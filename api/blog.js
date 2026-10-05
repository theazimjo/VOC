import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import { SUPER_ADMINS, requireAdminApp } from './_firebaseAdmin.js';
import { validatePost } from './_blogPost.js';

// Blog posts, stored under blogPosts/{id} in the Realtime Database.
//
//   GET  /api/blog              -> published posts (public, cached briefly)
//   POST /api/blog { idToken, action: 'list' }               super admin: all posts incl. drafts
//   POST /api/blog { idToken, action: 'save', post }         super admin: create or update
//   POST /api/blog { idToken, action: 'delete', id }         super admin: delete
//
// Everything goes through the Admin SDK, so the database rules stay closed
// to clients and no rules change is needed.

const byDateDesc = (a, b) => (b.date || '').localeCompare(a.date || '') || (b.updatedAt || '').localeCompare(a.updatedAt || '');

async function readAll(db) {
  const val = (await db.ref('blogPosts').get()).val() || {};
  return Object.entries(val).map(([id, p]) => ({ id, ...p }));
}

export default async function handler(req, res) {
  const app = requireAdminApp(res, 'blog');
  if (!app) return;
  const db = getDatabase(app);

  if (req.method === 'GET') {
    try {
      const posts = (await readAll(db)).filter((p) => p.published === true).sort(byDateDesc);
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
      res.status(200).json({ posts });
    } catch (err) {
      console.error('blog: read failed', err);
      res.status(500).json({ error: "Maqolalarni o'qib bo'lmadi." });
    }
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { idToken, action, post, id } = req.body || {};
  let caller;
  try {
    caller = await getAuth(app).verifyIdToken(String(idToken || ''));
  } catch {
    res.status(401).json({ error: 'Qaytadan tizimga kiring.' });
    return;
  }
  if (!caller.email || !SUPER_ADMINS.includes(caller.email.toLowerCase())) {
    res.status(403).json({ error: 'Faqat super admin uchun.' });
    return;
  }

  try {
    if (action === 'list') {
      res.status(200).json({ posts: (await readAll(db)).sort(byDateDesc) });
      return;
    }

    if (action === 'save') {
      const checked = validatePost(post);
      if (!checked.ok) {
        res.status(400).json({ error: checked.error });
        return;
      }
      const all = await readAll(db);
      const clash = all.find((p) => p.slug === checked.post.slug && p.id !== post.id);
      if (clash) {
        res.status(409).json({ error: 'Bu havola (slug) band. Boshqasini tanlang.' });
        return;
      }
      const now = new Date().toISOString();
      const ref = post.id ? db.ref(`blogPosts/${String(post.id)}`) : db.ref('blogPosts').push();
      const existing = post.id ? (await ref.get()).val() : null;
      const saved = {
        ...checked.post,
        createdAt: existing?.createdAt || now,
        updatedAt: now,
        authorEmail: caller.email.toLowerCase(),
      };
      await ref.set(saved);
      res.status(200).json({ post: { id: ref.key, ...saved } });
      return;
    }

    if (action === 'delete') {
      if (typeof id !== 'string' || !id) {
        res.status(400).json({ error: 'Maqola topilmadi.' });
        return;
      }
      await db.ref(`blogPosts/${id}`).remove();
      res.status(200).json({ ok: true });
      return;
    }

    res.status(400).json({ error: "Noma'lum amal." });
  } catch (err) {
    console.error('blog: write failed', err);
    res.status(500).json({ error: `Saqlab bo'lmadi: ${err.message}` });
  }
}
