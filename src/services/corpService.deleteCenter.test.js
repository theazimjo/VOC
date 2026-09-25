import { describe, it, expect, vi, beforeEach } from 'vitest';

// In-memory stand-in for the Realtime Database: `get` reads from `tree`,
// `update` records the multi-path write so the test can inspect it.
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

const { deleteCenter, getCenterDeletionPreview } = await import('./corpService');

beforeEach(() => {
  lastUpdate = null;
  tree = {
    centers: {
      C: {
        name: 'Center C',
        adminUid: 'admin1',
        teacherJoinCode: '777777',
        teachers: { t1: { uid: 'teacher1', name: 'T' } },
        customPacks: { p1: {}, p2: {} },
        groups: {
          G1: { code: '111111', students: { s1: { name: 'S1' }, s2: { name: 'S2' } } },
          G2: { code: '222222', students: { s2: { name: 'S2' } } },
        },
      },
    },
    users: {
      // Only in this center, active here → back to individual mode.
      s1: {
        groupMembership: { centerId: 'C', groupId: 'G1' },
        groupMemberships: { G1: { centerId: 'C', groupId: 'G1' } },
        words: { someWords: {} },
      },
      // Also in another center's group → switches to it, stays in group mode.
      s2: {
        groupMembership: { centerId: 'C', groupId: 'G2' },
        groupMemberships: {
          G1: { centerId: 'C', groupId: 'G1' },
          G2: { centerId: 'C', groupId: 'G2' },
          GX: { centerId: 'X', groupId: 'GX', groupName: 'Other' },
        },
      },
    },
  };
});

describe('deleteCenter', () => {
  it('removes the center, staff roles and codes', async () => {
    await deleteCenter('C');
    expect(lastUpdate['centers/C']).toBeNull();
    expect(lastUpdate['corpUsers/admin1']).toBeNull();
    expect(lastUpdate['corpUsers/teacher1']).toBeNull();
    expect(lastUpdate['groupCodes/111111']).toBeNull();
    expect(lastUpdate['groupCodes/222222']).toBeNull();
    expect(lastUpdate['teacherJoinCodes/777777']).toBeNull();
  });

  it('never deletes a student account — only their memberships in this center', async () => {
    await deleteCenter('C');
    const touchesWholeUser = Object.keys(lastUpdate).some((k) => /^users\/[^/]+$/.test(k));
    expect(touchesWholeUser).toBe(false);
    expect(Object.keys(lastUpdate).some((k) => k.includes('/words'))).toBe(false);

    expect(lastUpdate['users/s1/groupMemberships/G1']).toBeNull();
    expect(lastUpdate['users/s2/groupMemberships/G1']).toBeNull();
    expect(lastUpdate['users/s2/groupMemberships/G2']).toBeNull();
    expect('users/s2/groupMemberships/GX' in lastUpdate).toBe(false);
  });

  it('drops a student with no other group back to individual mode', async () => {
    await deleteCenter('C');
    expect(lastUpdate['users/s1/groupMembership']).toBeNull();
    expect(lastUpdate['users/s1/profile/appMode']).toBe('individual');
  });

  it("switches a student in another center's group to that group", async () => {
    await deleteCenter('C');
    expect(lastUpdate['users/s2/groupMembership']).toEqual({ centerId: 'X', groupId: 'GX', groupName: 'Other' });
    expect('users/s2/profile/appMode' in lastUpdate).toBe(false);
  });

  it('does nothing for a center that does not exist', async () => {
    await deleteCenter('missing');
    expect(lastUpdate).toBeNull();
  });
});

describe('getCenterDeletionPreview', () => {
  it('counts unique students across groups', async () => {
    const preview = await getCenterDeletionPreview('C');
    expect(preview).toEqual({ name: 'Center C', teachers: 1, groups: 2, students: 2, packs: 2 });
  });
});
