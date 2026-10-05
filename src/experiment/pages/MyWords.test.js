import { createElement as h } from 'react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

vi.mock('../../contexts/LanguageContext', () => ({ useLanguage: () => ({ language: 'en' }) }));

import MyWords from './MyWords';

const NOW = Date.now();
const iso = (ms) => new Date(ms).toISOString();
const word = (id, w, tr, extra) => ({ wordId: id, wordData: { word: w, translation: tr }, ...extra });

const memoryMap = {
  a: word('a', 'achieve', 'erishmoq', { reviewCount: 8, correctCount: 8, lastConfidence: 5, lastReviewed: iso(NOW - 3600000), nextReview: iso(NOW + 5 * 86400000) }),
  b: word('b', 'reluctant', 'istamaydigan', { reviewCount: 8, correctCount: 1, lastConfidence: 1, lastReviewed: iso(NOW - 86400000), nextReview: iso(NOW - 1000) }),
  c: word('c', 'subtle', 'nozik', { reviewCount: 0 }),
};

describe('MyWords', () => {
  afterEach(cleanup);

  it('shows every word with a plain status and puts weak/due words first', () => {
    render(h(MyWords, { memoryMap, confusionPairs: [], loading: false }));
    const rows = screen.getAllByRole('listitem');
    expect(rows[0].textContent).toContain('reluctant');
    expect(rows[0].textContent).toContain('Weak');
    expect(rows.some((r) => r.textContent.includes('Strong'))).toBe(true);
    expect(rows.some((r) => r.textContent.includes('New'))).toBe(true);
    expect(screen.getByText('3 words in total')).toBeTruthy();
  });

  it('filters by status and by search text', () => {
    render(h(MyWords, { memoryMap, confusionPairs: [], loading: false }));
    fireEvent.click(screen.getByRole('button', { name: 'Strong' }));
    expect(screen.queryByText('reluctant')).toBeNull();
    expect(screen.getByText('achieve')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    fireEvent.change(screen.getByPlaceholderText(/Search/), { target: { value: 'nozik' } });
    expect(screen.getByText('subtle')).toBeTruthy();
    expect(screen.queryByText('achieve')).toBeNull();
  });

  it('lists the most confused pairs when there are any', () => {
    render(h(MyWords, { memoryMap, confusionPairs: [{ key: 'x', wordA: 'affect', wordB: 'effect', count: 3 }], loading: false }));
    expect(screen.getByText('affect ↔ effect')).toBeTruthy();
  });

  it('shows an empty message without words', () => {
    render(h(MyWords, { memoryMap: {}, confusionPairs: [], loading: false }));
    expect(screen.getByText(/No words yet/)).toBeTruthy();
  });
});
