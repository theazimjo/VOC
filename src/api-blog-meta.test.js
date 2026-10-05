import { describe, it, expect } from 'vitest';
import { applyBlogMeta, SLUG_REDIRECTS } from '../api/_blogMeta.js';
import { BUILT_IN_POSTS } from './pages/blog/posts.js';

const SHELL = `<!doctype html><html lang="uz"><head>
  <meta charset="UTF-8" />
  <meta name="description" content="Eski tavsif" />
  <meta property="og:title" content="Eski sarlavha" />
  <meta property="og:description" content="Eski" />
  <meta name="twitter:title" content="Eski" />
  <title>VOCABRY — Har bir so'zning o'z vaqti bor</title>
</head><body><div id="root"></div></body></html>`;

describe('applyBlogMeta', () => {
  it('replaces the site-wide Uzbek title and tags with the post English ones', () => {
    const out = applyBlogMeta(SHELL, { title: 'Our model — VOCABRY', description: 'A summary', url: 'https://x.uz/blog/a' });
    expect(out).toContain('<title>Our model — VOCABRY</title>');
    expect(out).toContain('<meta name="description" content="A summary" />');
    expect(out).toContain('<meta property="og:title" content="Our model — VOCABRY" />');
    expect(out).toContain('<meta property="og:type" content="article" />');
    expect(out).toContain('<meta property="og:url" content="https://x.uz/blog/a" />');
    expect(out).toContain('<html lang="en">');
    expect(out).not.toContain("Har bir so'zning");
    expect(out).not.toContain('Eski');
  });

  it('escapes HTML in titles and descriptions', () => {
    const out = applyBlogMeta(SHELL, { title: 'A "quoted" <b>title</b> & more', description: '<script>alert(1)</script>' });
    expect(out).not.toContain('<script>');
    expect(out).toContain('&lt;script&gt;');
    expect(out).toContain('&quot;quoted&quot;');
    expect(out).toContain('&amp; more');
  });
});

describe('blog slugs', () => {
  it('uses English addresses and keeps the old Uzbek ones as redirects to real posts', () => {
    const slugs = BUILT_IN_POSTS.map((p) => p.slug);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9-]+$/);
    expect(slugs).not.toContain('taxmin-emas-olchov');
    for (const target of Object.values(SLUG_REDIRECTS)) expect(slugs).toContain(target);
  });
});
