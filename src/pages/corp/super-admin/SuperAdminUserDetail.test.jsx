import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const NOW = Date.now();
const ago = (d) => new Date(NOW - d * 86400000).toISOString();

vi.mock('../../../services/corpService', () => ({
  getPlatformUser: vi.fn(async (uid) => ({
    uid,
    name: 'Ali Valiyev',
    email: 'u_ali.01@markaz.uz',
    phone: '',
    createdAt: ago(20),
    lastSeen: ago(1),
    sessions: 12,
    streak: 3,
    wordCount: 2,
    packCount: 0,
    corpRole: null,
    corpCenterName: '',
    disabled: false,
    memberships: [{ centerId: 'c1', groupId: 'g1', groupName: 'Kids A' }],
    activeMembership: { centerId: 'c1', groupId: 'g1' },
    raw: {
      profile: { displayName: 'Ali Valiyev', appMode: 'group', language: 'uz' },
      words: {
        corp_c1_m1_u1: {
          w1: { word: 'mother', translation: 'ona', mastery: 90, stability: 60, reviewCount: 4, lastReviewed: ago(1), nextReview: ago(-10), recallHistory: [{ ts: ago(1), result: true }] },
          w2: { word: 'father', translation: 'ota', mastery: 30, stability: 2, reviewCount: 1, lastReviewed: ago(2), nextReview: ago(0.2), recallHistory: [{ ts: ago(2), result: false }] },
        },
      },
    },
  })),
  getAllCenters: vi.fn(async () => [{ id: 'c1', name: 'Demo markaz' }]),
  sendCorpPasswordReset: vi.fn(),
  deleteCorpUser: vi.fn(),
  setCorpUserDisabled: vi.fn(),
}));

describe('SuperAdminUserDetail', () => {
  it('shows a student without an e-mail with sign-in login, learning numbers, packs and recent words', async () => {
    const { default: SuperAdminUserDetail } = await import('./SuperAdminUserDetail');
    render(
      <MemoryRouter initialEntries={['/corp/super-admin/users/abc123']}>
        <Routes>
          <Route path="/corp/super-admin/users/:uid" element={<SuperAdminUserDetail />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(await screen.findByText('Signs in with login')).toBeTruthy();
    expect(screen.getByText('ali.01')).toBeTruthy();
    expect(screen.getByText('Learning')).toBeTruthy();
    expect(screen.getByText('1 / 1 / 0')).toBeTruthy(); // learned / practicing / new
    expect(screen.getByText('Group course topic')).toBeTruthy();
    expect(screen.getByText('mother')).toBeTruthy();
    expect(screen.getByText('Kids A')).toBeTruthy();
    expect(screen.getByText('No e-mail')).toBeTruthy();
  });
});
