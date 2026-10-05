// Pure helpers for api/blog-page.js (kept separate so they can be unit-tested).
// The blog is a single-page app, so link previews (Telegram, Google, social)
// would otherwise see the site-wide Uzbek <title> and description. The
// serverless function serves index.html with the right English title and
// Open Graph tags for each post.

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

/** Old (Uzbek) post addresses that still work and point at the English ones. */
export const SLUG_REDIRECTS = {
  'taxmin-emas-olchov': 'measured-not-guessed',
  'nega-sozlar-unutiladi': 'why-new-words-disappear',
};

const setMeta = (html, attr, name, value) => {
  const re = new RegExp(`<meta\\s+${attr}="${name}"\\s+content="[^"]*"\\s*/?>`, 'i');
  const tag = `<meta ${attr}="${name}" content="${esc(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
};

/**
 * Put a page's own title/description into index.html.
 * @param {string} html  built index.html
 * @param {{ title: string, description: string, url?: string, type?: 'website'|'article' }} meta
 */
export function applyBlogMeta(html, { title, description, url, type = 'article' }) {
  // The blog is English only: declare it so, not the site-wide lang="uz".
  let out = html.replace(/<html\s+lang="[^"]*"/i, '<html lang="en"');
  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${esc(title)}</title>`);
  out = setMeta(out, 'name', 'description', description);
  out = setMeta(out, 'property', 'og:title', title);
  out = setMeta(out, 'property', 'og:description', description);
  out = setMeta(out, 'property', 'og:type', type);
  out = setMeta(out, 'name', 'twitter:title', title);
  if (url) out = setMeta(out, 'property', 'og:url', url);
  return out;
}
