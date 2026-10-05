import { describe, it, expect } from 'vitest';
import { validatePost, estimateMinutes } from '../api/_blogPost.js';

const base = () => ({
  slug: 'birinchi-maqola',
  date: '2026-10-05',
  cover: 'board',
  published: true,
  uz: { title: 'Sarlavha', excerpt: 'Qisqacha', body: 'Matn '.repeat(10) },
  en: { title: '', excerpt: '', body: '' },
  ru: { title: '', excerpt: '', body: '' },
});

describe('validatePost', () => {
  it('accepts a minimal valid post and fills reading time', () => {
    const r = validatePost(base());
    expect(r.ok).toBe(true);
    expect(r.post.minutes).toBeGreaterThanOrEqual(1);
    expect(r.post.published).toBe(true);
  });

  it('normalises the slug and rejects unsafe ones', () => {
    expect(validatePost({ ...base(), slug: '  Birinchi-Maqola ' }).post.slug).toBe('birinchi-maqola');
    for (const bad of ['', 'ab', 'has space', 'UPPER_case', 'x/../y', '-lead', 'trail-', 'a--b']) {
      expect(validatePost({ ...base(), slug: bad }).ok).toBe(false);
    }
  });

  it('requires a real date', () => {
    expect(validatePost({ ...base(), date: '05.10.2026' }).ok).toBe(false);
    expect(validatePost({ ...base(), date: '2026-13-45' }).ok).toBe(false);
  });

  it('allows a built-in cover key or an https URL, nothing else', () => {
    expect(validatePost({ ...base(), cover: 'curve' }).ok).toBe(true);
    expect(validatePost({ ...base(), cover: 'https://example.com/a.jpg' }).ok).toBe(true);
    expect(validatePost({ ...base(), cover: 'http://example.com/a.jpg' }).ok).toBe(false);
    expect(validatePost({ ...base(), cover: 'javascript:alert(1)' }).ok).toBe(false);
    expect(validatePost({ ...base(), cover: '' }).ok).toBe(true);
  });

  it('needs content in at least one language and caps length', () => {
    expect(validatePost({ ...base(), uz: { title: '', excerpt: '', body: '' } }).ok).toBe(false);
    expect(validatePost({ ...base(), uz: { title: 'x', excerpt: '', body: 'a'.repeat(60001) } }).ok).toBe(false);
  });

  it('treats only published === true as published', () => {
    expect(validatePost({ ...base(), published: 'yes' }).post.published).toBe(false);
  });
});

describe('estimateMinutes', () => {
  it('uses the longest language, ~200 words per minute, at least 1', () => {
    expect(estimateMinutes({ uz: { body: 'a b c' } })).toBe(1);
    expect(estimateMinutes({ uz: { body: 'w '.repeat(600) }, en: { body: 'w '.repeat(100) } })).toBe(3);
  });
});
