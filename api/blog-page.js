import { getDatabase } from 'firebase-admin/database';
import { requireAdminApp } from './_firebaseAdmin.js';
import { applyBlogMeta, SLUG_REDIRECTS } from './_blogMeta.js';
import { BUILT_IN_POSTS } from '../src/pages/blog/posts.js';

// Serves the app shell (index.html) for /blog and /blog/:slug with the page's
// own English title and Open Graph tags (see vercel.json rewrites), so link
// previews and the first paint are not the site-wide Uzbek ones. The page
// itself is still rendered by the SPA. Any failure falls back to plain
// index.html.

async function findPost(slug) {
  const built = BUILT_IN_POSTS.find((p) => p.slug === slug);
  if (built) return built;
  const app = requireAdminApp({ status: () => ({ json: () => {} }) }, 'blog-page');
  if (!app) return null;
  const val = (await getDatabase(app).ref('blogPosts').get()).val() || {};
  return Object.values(val).find((p) => p.slug === slug && p.published === true) || null;
}

export default async function handler(req, res) {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const local = /^(localhost|127\.0\.0\.1)(:|$)/.test(String(host));
  const proto = req.headers['x-forwarded-proto'] || (local ? 'http' : 'https');
  const origin = `${proto}://${host}`;
  const slug = String(req.query?.slug || '').toLowerCase();

  let html;
  try {
    const shell = await fetch(`${origin}/index.html`);
    if (!shell.ok) throw new Error(`index.html ${shell.status}`);
    html = await shell.text();
  } catch (err) {
    console.error('blog-page: could not load the app shell', err);
    res.status(502).send('Temporarily unavailable');
    return;
  }

  let meta = {
    title: 'Blog — VOCABRY',
    description: 'On memory, learning and the work behind VOC.',
    url: `${origin}/blog`,
    type: 'website',
  };

  try {
    if (slug) {
      const canonical = SLUG_REDIRECTS[slug] || slug;
      const post = await findPost(canonical);
      if (post?.en?.title) {
        meta = {
          title: `${post.en.title} — VOCABRY`,
          description: post.en.excerpt || meta.description,
          url: `${origin}/blog/${canonical}`,
          type: 'article',
        };
      }
    }
    html = applyBlogMeta(html, meta);
  } catch (err) {
    console.error('blog-page: meta failed, serving plain shell', err);
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
  res.status(200).send(html);
}
