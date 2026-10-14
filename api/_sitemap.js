// Pure helpers for api/sitemap.js (kept separate so they can be unit-tested).

export const SITE = 'https://vocabry.uz';

// Public pages only: the app itself needs a login and is not worth indexing.
export const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/start-center', changefreq: 'monthly', priority: '0.7' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
];

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const validDate = (d) => (/^\d{4}-\d{2}-\d{2}/.test(String(d || '')) ? String(d).slice(0, 10) : null);

/**
 * @param {Array<{ slug: string, date?: string, updatedAt?: string }>} posts published blog posts
 * @param {string} [site]
 * @returns {string} sitemap.xml
 */
export function buildSitemap(posts = [], site = SITE) {
  const base = site.replace(/\/$/, '');
  const seen = new Set();
  const urls = [];
  STATIC_PAGES.forEach((p) => { urls.push({ loc: `${base}${p.path}`, changefreq: p.changefreq, priority: p.priority }); });
  posts.forEach((post) => {
    if (!post?.slug || !/^[a-z0-9-]+$/.test(post.slug) || seen.has(post.slug)) return;
    seen.add(post.slug);
    urls.push({
      loc: `${base}/blog/${post.slug}`, lastmod: validDate(post.updatedAt) || validDate(post.date), changefreq: 'monthly', priority: '0.6',
    });
  });
  const body = urls.map((u) => [
    '  <url>',
    `    <loc>${esc(u.loc)}</loc>`,
    ...(u.lastmod ? [`    <lastmod>${u.lastmod}</lastmod>`] : []),
    `    <changefreq>${u.changefreq}</changefreq>`,
    `    <priority>${u.priority}</priority>`,
    '  </url>',
  ].join('\n')).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}
