// Validation and normalisation for blog posts written from the super-admin
// panel. Pure (no Firebase) so it can be unit-tested. Files starting with "_"
// are helpers, not deployed endpoints.

// The blog is written in English only.
export const LANGS = ['en'];
export const COVERS = ['board', 'curve', 'compare', 'sessions', 'factors'];

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX = { slug: 80, title: 200, excerpt: 400, body: 60000, cover: 500 };

const str = (v) => (typeof v === 'string' ? v : '');

/** Reading time in whole minutes (at least 1), ~200 words a minute. */
export function estimateMinutes(post) {
  const words = LANGS.map((l) => str(post?.[l]?.body).split(/\s+/).filter(Boolean).length);
  return Math.max(1, Math.round(Math.max(...words) / 200));
}

/**
 * Check and clean a post coming from the client.
 * @returns {{ ok: true, post: object } | { ok: false, error: string }}
 */
export function validatePost(input) {
  if (!input || typeof input !== 'object') return { ok: false, error: "Maqola ma'lumoti yo'q." };

  const slug = str(input.slug).trim().toLowerCase();
  if (!SLUG_RE.test(slug) || slug.length < 3 || slug.length > MAX.slug) {
    return { ok: false, error: "Havola (slug) 3-80 ta kichik lotin harf, raqam va chiziqchadan iborat bo'lsin." };
  }

  const date = str(input.date).trim();
  if (!DATE_RE.test(date) || Number.isNaN(new Date(`${date}T00:00:00Z`).getTime())) {
    return { ok: false, error: "Sana YYYY-MM-DD ko'rinishida bo'lsin." };
  }

  const cover = str(input.cover).trim();
  if (cover) {
    const isKey = COVERS.includes(cover);
    const isHttps = /^https:\/\/[^\s]+$/i.test(cover);
    if ((!isKey && !isHttps) || cover.length > MAX.cover) {
      return { ok: false, error: "Muqova: tayyor rasm nomi yoki https:// bilan boshlanadigan havola bo'lsin." };
    }
  }

  const post = { slug, date, cover, published: input.published === true };
  let hasContent = false;
  for (const lang of LANGS) {
    const block = input[lang] || {};
    const title = str(block.title).trim();
    const excerpt = str(block.excerpt).trim();
    const body = str(block.body);
    if (title.length > MAX.title || excerpt.length > MAX.excerpt || body.length > MAX.body) {
      return { ok: false, error: `${lang.toUpperCase()} matni juda uzun.` };
    }
    if (title && body.trim()) hasContent = true;
    post[lang] = { title, excerpt, body };
  }
  if (!hasContent) return { ok: false, error: "Sarlavha va matn (inglizcha) kerak." };

  post.minutes = estimateMinutes(post);
  return { ok: true, post };
}
