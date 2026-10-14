import { describe, it, expect } from 'vitest';
import { buildSitemap, STATIC_PAGES } from '../api/_sitemap.js';
import { applyBlogMeta } from '../api/_blogMeta.js';
import { BUILT_IN_POSTS } from './pages/blog/posts.js';

describe('buildSitemap', () => {
  it('lists the public pages and every published post', () => {
    const xml = buildSitemap([{ slug: 'two-learners-one-word', date: '2026-10-09' }], 'https://vocabry.uz/');
    STATIC_PAGES.forEach((p) => expect(xml).toContain(`<loc>https://vocabry.uz${p.path}</loc>`));
    expect(xml).toContain('<loc>https://vocabry.uz/blog/two-learners-one-word</loc>');
    expect(xml).toContain('<lastmod>2026-10-09</lastmod>');
    expect(xml.startsWith('<?xml version="1.0"')).toBe(true);
  });

  it('prefers the update date, skips bad or repeated slugs and keeps private pages out', () => {
    const xml = buildSitemap([
      { slug: 'a', date: '2026-01-01', updatedAt: '2026-02-03T10:00:00Z' },
      { slug: 'a', date: '2026-05-05' },
      { slug: 'Bad Slug' },
      { slug: '' },
      null,
    ]);
    expect(xml).toContain('<lastmod>2026-02-03</lastmod>');
    expect(xml.match(/\/blog\/a</g)).toHaveLength(1);
    expect(xml).not.toContain('Bad Slug');
    expect(xml).not.toContain('/corp');
    expect(xml).not.toContain('/login');
  });

  it('covers every built-in post', () => {
    const xml = buildSitemap(BUILT_IN_POSTS);
    BUILT_IN_POSTS.forEach((p) => expect(xml).toContain(`/blog/${p.slug}<`));
  });
});

describe('blog pages keep their own canonical and crawler text', () => {
  const SHELL = `<html lang="en"><head><link rel="canonical" href="https://vocabry.uz/" /><title>x</title></head><body><div id="root"><!--seo-splash--><main><h1>Home</h1></main><!--/seo-splash--></div></body></html>`;
  it('points the canonical at the post and swaps the home text', () => {
    const out = applyBlogMeta(SHELL, { title: 'A post — VOCABRY', description: 'About memory', url: 'https://vocabry.uz/blog/a-post' });
    expect(out).toContain('<link rel="canonical" href="https://vocabry.uz/blog/a-post" />');
    expect(out).toContain('<h1>A post — VOCABRY</h1>');
    expect(out).not.toContain('<h1>Home</h1>');
  });
});
