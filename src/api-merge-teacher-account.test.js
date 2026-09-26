// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Fake Admin SDK: `tokens` maps token → decoded token, `tree` is the
// Realtime Database, `lastUpdate` / `deleted` record the writes.
let tokens;
let tree;
let lastUpdate;
let deleted;

function readPath(path) {
  return path.split('/').filter(Boolean).reduce((node, key) => (node == null ? undefined : node[key]), tree);
}

vi.mock('firebase-admin/app', () => ({ getApps: () => [], initializeApp: () => ({}), cert: (x) => x }));
vi.mock('firebase-admin/auth', () => ({
  getAuth: () => ({
    verifyIdToken: async (t) => {
      if (!tokens[t]) throw new Error('bad token');
      return tokens[t];
    },
    getUser: async (uid) => ({ uid, email: `${uid}@gmail.com` }),
    deleteUser: async (uid) => { deleted.push(uid); },
  }),
}));
vi.mock('firebase-admin/database', () => ({
  getDatabase: () => ({
    ref: (path = '') => ({
      get: async () => ({ val: () => readPath(path) ?? null }),
      update: async (u) => { lastUpdate = u; },
    }),
  }),
}));

const { default: handler } = await import('../api/merge-teacher-account.js');

function call(body) {
  return new Promise((resolve) => {
    const res = {
      statusCode: 200,
      setHeader() {},
      status(code) { this.statusCode = code; return this; },
      json(data) { resolve({ status: this.statusCode, data }); },
    };
    handler({ method: 'POST', body }, res);
  });
}

beforeEach(() => {
  process.env.FIREBASE_SERVICE_ACCOUNT = JSON.stringify({ project_id: 'p', private_key: 'k', client_email: 'e' });
  lastUpdate = null;
  deleted = [];
  tokens = {
    teacher: { uid: 'A', firebase: { sign_in_provider: 'password' } },
    google: { uid: 'B', email: 'B@gmail.com', firebase: { sign_in_provider: 'google.com' } },
    googleStaff: { uid: 'S', firebase: { sign_in_provider: 'google.com' } },
    passwordOther: { uid: 'B', firebase: { sign_in_provider: 'password' } },
    student: { uid: 'X', firebase: { sign_in_provider: 'password' } },
  };
  tree = {
    corpUsers: {
      A: { role: 'teacher', centerId: 'C', teacherId: 't1', teacherName: 'Ali', phone: '+998901234567' },
      S: { role: 'teacher', centerId: 'C', teacherId: 't2' },
    },
    centers: {
      C: {
        teachers: { t1: { uid: 'A', name: 'Ali' } },
        customPacks: { p1: { ownerUid: 'A' }, p2: {}, p3: { ownerUid: 'Z' } },
      },
    },
  };
});

describe('merge-teacher-account API', () => {
  it('moves the teacher role, packs and record onto the Google account', async () => {
    const r = await call({ idToken: 'teacher', googleIdToken: 'google' });
    expect(r).toEqual({ status: 200, data: { ok: true, email: 'B@gmail.com' } });
    expect(lastUpdate['corpUsers/B']).toMatchObject({ role: 'teacher', centerId: 'C', teacherId: 't1', email: 'B@gmail.com', mergedFrom: 'A' });
    expect(lastUpdate['corpUsers/A']).toBeNull();
    expect(lastUpdate['centers/C/teachers/t1/uid']).toBe('B');
    expect(lastUpdate['centers/C/customPacks/p1/ownerUid']).toBe('B');
    expect(lastUpdate).not.toHaveProperty('centers/C/customPacks/p3/ownerUid');
    expect(deleted).toEqual(['A']);
  });

  it('needs a fresh Google sign-in for the target account', async () => {
    const r = await call({ idToken: 'teacher', googleIdToken: 'passwordOther' });
    expect(r.status).toBe(400);
    expect(lastUpdate).toBeNull();
  });

  it('refuses a Google account that is already staff', async () => {
    const r = await call({ idToken: 'teacher', googleIdToken: 'googleStaff' });
    expect(r.status).toBe(409);
    expect(lastUpdate).toBeNull();
  });

  it('refuses a caller who is not a teacher', async () => {
    const r = await call({ idToken: 'student', googleIdToken: 'google' });
    expect(r.status).toBe(403);
    expect(deleted).toEqual([]);
  });

  it('refuses bad tokens', async () => {
    const r = await call({ idToken: 'nope', googleIdToken: 'google' });
    expect(r.status).toBe(401);
  });

  it('refuses when the teacher record points at someone else', async () => {
    tree.centers.C.teachers.t1.uid = 'OTHER';
    const r = await call({ idToken: 'teacher', googleIdToken: 'google' });
    expect(r.status).toBe(409);
    expect(lastUpdate).toBeNull();
  });
});
