import { describe, it, expect } from 'vitest';
import { parseMarkdown, parseInline, plainText } from './markdown.js';

describe('parseInline', () => {
  it('parses bold, italic and links', () => {
    const n = parseInline('a **b** and *c* and [d](https://x.uz)');
    expect(n.map((x) => x.t)).toEqual(['text', 'strong', 'text', 'em', 'text', 'link']);
    expect(plainText(n)).toBe('a b and c and d');
  });

  it('never turns an unsafe link into a link', () => {
    const n = parseInline('[x](javascript:alert(1)) [y](//evil.com) [z](data:text/html,hi)');
    expect(n.some((x) => x.t === 'link')).toBe(false);
    expect(plainText(n)).toContain('x');
  });

  it('allows site-relative and mailto links', () => {
    expect(parseInline('[a](/blog/x)')[0]).toMatchObject({ t: 'link', href: '/blog/x' });
    expect(parseInline('[a](mailto:a@b.uz)')[0].t).toBe('link');
  });

  it('keeps raw angle brackets as text (React escapes them)', () => {
    expect(plainText(parseInline('<script>alert(1)</script>'))).toBe('<script>alert(1)</script>');
  });
});

describe('parseMarkdown', () => {
  it('builds headings with unique ids and a table of contents', () => {
    const { blocks, headings } = parseMarkdown('## Salom\n\ntext\n\n## Salom\n\n### Pastki');
    expect(headings.map((h) => h.id)).toEqual(['salom', 'salom-2', 'pastki']);
    expect(blocks.filter((b) => b.type === 'h2')).toHaveLength(2);
  });

  it('handles Uzbek apostrophes in heading ids', () => {
    expect(parseMarkdown("## Qo'shimcha so'z").headings[0].id).toBe('qoshimcha-soz');
  });

  it('parses paragraphs, lists, quotes and dividers', () => {
    const { blocks } = parseMarkdown('Bir\nikki\n\n- a\n- b\n\n1. x\n2. y\n\n> gap\n> davomi\n\n---');
    expect(blocks.map((b) => b.type)).toEqual(['p', 'ul', 'ol', 'quote', 'hr']);
    expect(plainText(blocks[0].inline)).toBe('Bir ikki');
    expect(blocks[1].items).toHaveLength(2);
    expect(plainText(blocks[3].inline)).toBe('gap davomi');
  });

  it('parses a figure directive and a bars chart', () => {
    const { blocks } = parseMarkdown(':::figure Curve\n\n:::bars Natija\nnote: AUC\nBiri | 0,5 | base\nIkkinchi | 0.78 | model\nBuzuq | x | model\n:::\n\nkeyin');
    expect(blocks[0]).toEqual({ type: 'figure', name: 'curve' });
    expect(blocks[1]).toMatchObject({ type: 'bars', title: 'Natija', note: 'AUC' });
    expect(blocks[1].rows).toEqual([
      { label: 'Biri', value: 0.5, tone: 'base' },
      { label: 'Ikkinchi', value: 0.78, tone: 'model' },
    ]);
    expect(blocks[2].type).toBe('p');
  });

  it('only accepts https or relative images', () => {
    expect(parseMarkdown('![a](https://x.uz/a.png)').blocks[0].type).toBe('image');
    expect(parseMarkdown('![a](/img/a.png)').blocks[0].type).toBe('image');
    expect(parseMarkdown('![a](http://x.uz/a.png)').blocks).toHaveLength(0);
    expect(parseMarkdown('![a](javascript:alert(1))').blocks).toHaveLength(0);
  });

  it('terminates on odd input and empty text', () => {
    expect(parseMarkdown('').blocks).toEqual([]);
    expect(parseMarkdown('###\n:::\n>\n-').blocks.length).toBeGreaterThanOrEqual(0);
  });

  it('clamps bar values into 0..1', () => {
    const { blocks } = parseMarkdown(':::bars T\nA | 5 | base\nB | -2 | base\n:::');
    expect(blocks[0].rows.map((r) => r.value)).toEqual([1, 0]);
  });
});
