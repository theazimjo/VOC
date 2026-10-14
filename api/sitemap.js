import { getDatabase } from 'firebase-admin/database';
import { requireAdminApp } from './_firebaseAdmin.js';
import { buildSitemap } from './_sitemap.js';
import { BUILT_IN_POSTS } from '../src/pages/blog/posts.js';

// GET /sitemap.xml (see the rewrite in vercel.json): the public pages plus every
// published blog post, built-in and from the database. If the database cannot
// be read, the built-in posts are still listed.

export default async function handler(req, res) {
  let posts = [...BUILT_IN_POSTS];
  try {
    const app = requireAdminApp({ status: () => ({ json: () => {} }) }, 'sitemap');
    if (app) {
      const val = (await getDatabase(app).ref('blogPosts').get()).val() || {};
      posts = posts.concat(Object.values(val).filter((p) => p && p.published === true));
    }
  } catch (err) {
    console.error('sitemap: could not read the database posts', err);
  }
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(buildSitemap(posts, process.env.SITE_URL || undefined));
}
