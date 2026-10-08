import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';

let mockUser = { uid: 'u1', email: 'azimjonxolmirzayev30@gmail.com' };
let mockMembership = { groupId: 'g1', centerId: 'c1', groupName: 'Demo' };

vi.mock('../../contexts/AuthContext', () => ({ useAuth: () => ({ user: mockUser }) }));
vi.mock('../../hooks/useGroupMode', () => ({ useGroupMode: () => ({ membership: mockMembership }) }));
vi.mock('../../services/corpService', () => ({
  setAppMode: vi.fn(() => Promise.resolve()),
  switchActiveGroup: vi.fn(() => Promise.resolve()),
}));

import { SuperAdminReturnBar } from './ViewAsBanner';
import { setAppMode, switchActiveGroup } from '../../services/corpService';

describe('SuperAdminReturnBar', () => {
  afterEach(cleanup);
  beforeEach(() => {
    mockUser = { uid: 'u1', email: 'azimjonxolmirzayev30@gmail.com' };
    mockMembership = { groupId: 'g1', centerId: 'c1', groupName: 'Demo' };
    vi.clearAllMocks();
    delete window.location;
    window.location = { assign: vi.fn() };
  });

  it('is hidden for anyone who is not a super admin', () => {
    mockUser = { uid: 'u2', email: 'someone@example.com' };
    const { container } = render(<SuperAdminReturnBar mode="student" />);
    expect(container.innerHTML).toBe('');
  });

  it('student view: Personal switches the account to personal mode', async () => {
    render(<SuperAdminReturnBar mode="student" />);
    fireEvent.click(screen.getByRole('button', { name: 'Personal' }));
    await waitFor(() => expect(window.location.assign).toHaveBeenCalledWith('/'));
    expect(setAppMode).toHaveBeenCalledWith('u1', 'individual');
  });

  it('student view: Super admin panel opens the admin area', async () => {
    render(<SuperAdminReturnBar mode="student" />);
    fireEvent.click(screen.getByRole('button', { name: 'Super admin panel' }));
    await waitFor(() => expect(window.location.assign).toHaveBeenCalledWith('/corp/super-admin'));
  });

  it('personal view: Student returns to the student panel, and is not offered without a group', async () => {
    render(<SuperAdminReturnBar mode="personal" />);
    fireEvent.click(screen.getByRole('button', { name: 'Student' }));
    await waitFor(() => expect(window.location.assign).toHaveBeenCalledWith('/corp/student'));
    expect(switchActiveGroup).toHaveBeenCalledWith('u1', 'g1');
  });

  it('personal view without a student profile only offers the super admin panel', () => {
    mockMembership = null;
    render(<SuperAdminReturnBar mode="personal" />);
    expect(screen.queryByRole('button', { name: 'Student' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Super admin panel' })).toBeTruthy();
  });
});
