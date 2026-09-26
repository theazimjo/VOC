import { describe, it, expect, vi, beforeEach } from 'vitest';

// In-memory stand-in for the Realtime Database (same shape as
// corpService.deleteCenter.test.js).
let tree = {};
let lastUpdate = null;

function readPath(path) {
  return path.split('/').filter(Boolean).reduce((node, key) => (node == null ? undefined : node[key]), tree);
}

vi.mock('firebase/database', () => ({
  ref: (_db, path = '') => ({ path }),
  get: async ({ path }) => {
    const val = readPath(path);
    return { exists: () => val !== undefined && val !== null, val: () => val };
  },
  update: async (_ref, updates) => { lastUpdate = updates; },
  set: vi.fn(), push: vi.fn(), remove: vi.fn(), runTransaction: vi.fn(),
}));
vi.mock('firebase/auth', () => ({ createUserWithEmailAndPassword: vi.fn(), sendPasswordResetEmail: vi.fn(), signOut: vi.fn() }));
vi.mock('../firebase', () => ({ db: {}, auth: {} }));
vi.mock('../firebaseSecondary', () => ({ getSecondaryAuth: vi.fn() }));

const { regenerateGroupCode, transferGroup } = await import('./corpService');

beforeEach(() => {
  lastUpdate = null;
  tree = {
    centers: { C: { groups: { G1: { name: 'A1', teacherId: 't1', code: '111111' } } } },
    groupCodes: { 111111: { centerId: 'C', groupId: 'G1', teacherId: 't1', code: '111111', name: 'A1' } },
  };
});

describe('regenerateGroupCode', () => {
  it('moves the join index to the new code and drops the old one', async () => {
    const code = await regenerateGroupCode('C', 'G1');
    expect(code).toMatch(/^\d{6}$/);
    expect(code).not.toBe('111111');
    expect(lastUpdate['centers/C/groups/G1/code']).toBe(code);
    expect(lastUpdate[`groupCodes/${code}`]).toEqual({ centerId: 'C', groupId: 'G1', teacherId: 't1', code, name: 'A1' });
    expect(lastUpdate['groupCodes/111111']).toBeNull();
  });

  it('fails for a missing group', async () => {
    await expect(regenerateGroupCode('C', 'nope')).rejects.toThrow();
  });
});

describe('transferGroup', () => {
  it('changes the owner on the group and on its code index', async () => {
    await transferGroup('C', 'G1', 't2');
    expect(lastUpdate['centers/C/groups/G1/teacherId']).toBe('t2');
    expect(lastUpdate['groupCodes/111111/teacherId']).toBe('t2');
  });
});
