import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import StreakBanner from './StreakBanner';

vi.mock('../../contexts/LanguageContext', () => ({ useLanguage: () => ({ language: 'uz' }) }));

describe('StreakBanner', () => {
  it('shows nothing without streak info', () => {
    const { container } = render(<StreakBanner info={null} />);
    expect(container.innerHTML).toBe('');
  });

  it('announces a new streak with the number of days', () => {
    render(<StreakBanner info={{ increased: true, before: 4, after: 5, todayCount: 5, goal: 5 }} />);
    expect(screen.getByText('Yangi streak!')).toBeTruthy();
    expect(screen.getByText('5 kun ketma-ket')).toBeTruthy();
  });

  it('tells how many words are left for today when the goal is not met', () => {
    render(<StreakBanner info={{ increased: false, before: 4, after: 4, todayCount: 3, goal: 5 }} />);
    expect(screen.getByText("Streak uchun bugun yana 2 ta so'z")).toBeTruthy();
  });

  it('confirms the goal when the streak was already counted today', () => {
    render(<StreakBanner info={{ increased: false, before: 5, after: 5, todayCount: 9, goal: 5 }} />);
    expect(screen.getByText(/Bugungi maqsad bajarildi/)).toBeTruthy();
  });
});
