// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Fake Admin SDK: `tokens` maps idToken → decoded token, `accounts` holds
// Auth users, `tree` is the database.
let tokens;
let accounts;
let tree;
let updated;
let pushed;

vi.mock('firebase-admin/app', () => ({ getApps: () => [], initializeApp: () => ({}), cert: (x) => x }));
vi.mock('firebase-admin/auth', () => ({
  getAuth: () => ({
    verifyIdToken: async (t) => {
      if (!tokens[t]) throw new Error('bad token');
      return tokens[t];
    },
    getUser: async (uid) => {
      if (!accounts[uid]) throw new Error('no user');
      return { uid, ...accounts[uid] };
    },
    updateUser: async (uid, data) => { updated.push({ uid, ...data }); },
  }),
}));
const at = (path) => path.split('/').reduce((node, key) => (node == null ? undefined : node[key]), tree);
vi.mock('firebase-admin/database', () => ({
  getDatabase: () => ({
    ref: (path) => ({
      get: async () => ({ val: () => at(path) ?? null }),
      push: async (value) => { pushed.push({ path, value }); },
    }),
  }),
}));

const { default: handler, recentActivity } = await import('../api/student-account.js');

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

const today = new Date().toISOString().slice(0, 10);

beforeEach(() => {
  process.env.FIREBASE_SERVICE_ACCOUNT = JSON.stringify({ project_id: 'p', private_key: 'k', client_email: 'e' });
  tokens = {
    admin: { uid: 'admin1', email: 'admin@c1.uz' },
    otherAdmin: { uid: 'admin2', email: 'admin@c2.uz' },
    teacher: { uid: 'teacher1', email: 't@c1.uz' },
  };
  accounts = {
    s1: {
      email: 'ali@gmail.com',
      emailVerified: true,
      providerData: [{ providerId: 'google.com' }],
      metadata: { creationTime: 'Mon, 01 Sep 2026 10:00:00 GMT', lastSignInTime: 'Fri, 25 Sep 2026 10:00:00 GMT' },
    },
    s2: { email: '', providerData: [] },
    teacher1: { email: 't@c1.uz', providerData: [{ providerId: 'password' }] },
  };
  tree = {
    corpUsers: {
      admin1: { role: 'center_admin', centerId: 'c1' },
      admin2: { role: 'center_admin', centerId: 'c2' },
      teacher1: { role: 'teacher', centerId: 'c1' },
    },
    centers: {
      c1: {
        groups: {
          g1: { assignedPacks: ['p1'], additionalPacks: ['p2'], students: { s1: { name: 'Ali' }, s2: { name: 'Vali' }, teacher1: { name: 'T' } } },
          g2: { assignedPacks: ['p3', 'p1'], students: { s1: { name: 'Ali' } } },
          g3: { assignedPacks: ['p4'], students: { s2: { name: 'Vali' } } },
        },
      },
    },
    users: {
      s1: {
        activity: { lastSeen: '2026-09-25T10:00:00Z', sessionCount: 14 },
        streak: { streakCount: 3, dailyGoal: 5, lastActiveDate: today, activityLog: { [today]: 7, '2020-01-01': 9 } },
        words: {
          p1: { w1: { mastery: 80, reviewCount: 4, wrongCount: 1, recallHistory: [{ result: true }, { result: false }, { result: true }] } },
          personal: { x: { mastery: 10 } },
        },
        packs: { secret: { name: 'Private' } },
      },
    },
  };
  updated = [];
  pushed = [];
});

describe('student-account API', () => {
  it('returns details limited to the group courses', async () => {
    const r = await call({ idToken: 'admin', studentId: 's1', action: 'details' });
    expect(r.status).toBe(200);
    expect(r.data.account).toMatchObject({ email: 'ali@gmail.com', providers: ['google.com'], hasPassword: false, isStaff: false });
    expect(r.data.activity).toEqual({ lastSeen: '2026-09-25T10:00:00Z', sessionCount: 14 });
    expect(r.data.streak).toMatchObject({ current: 3, days: { [today]: 7 } });
    expect(Object.keys(r.data.words).sort()).toEqual(['p1', 'p2', 'p3']); // both of his groups, not g3
    expect(r.data.groupIds).toEqual(['g1', 'g2']);
    expect(r.data.words.p1[0]).toMatchObject({ id: 'w1', mastery: 80, wrongCount: 1, correct: 2, answered: 3 });
    expect(r.data.words.p1[0].recallHistory).toBeUndefined();
    expect(JSON.stringify(r.data)).not.toMatch(/Private|personal/);
  });

  it('sets a student password and logs it', async () => {
    const r = await call({ idToken: 'admin', studentId: 's1', action: 'set-password', password: 'NewPass123' });
    expect(r).toEqual({ status: 200, data: { ok: true, email: 'ali@gmail.com' } });
    expect(updated).toEqual([{ uid: 's1', password: 'NewPass123' }]);
    expect(pushed[0].path).toBe('centers/c1/studentPasswordResets');
    expect(pushed[0].value).toMatchObject({ uid: 's1', groupIds: ['g1', 'g2'], by: 'admin1' });
  });

  it("refuses another center's admin", async () => {
    const r = await call({ idToken: 'otherAdmin', studentId: 's1', action: 'set-password', password: 'NewPass123' });
    expect(r.status).toBe(404);
    expect(updated).toHaveLength(0);
  });

  it('refuses a teacher caller', async () => {
    const r = await call({ idToken: 'teacher', studentId: 's1', action: 'details' });
    expect(r.status).toBe(403);
  });

  it('never resets a staff account that sits in a group', async () => {
    const r = await call({ idToken: 'admin', studentId: 'teacher1', action: 'set-password', password: 'NewPass123' });
    expect(r.status).toBe(403);
    expect(updated).toHaveLength(0);
  });

  it('refuses a student outside the group, an account without email, bad input', async () => {
    expect((await call({ idToken: 'admin', studentId: 'nobody', action: 'details' })).status).toBe(404);
    expect((await call({ idToken: 'admin', studentId: 's2', action: 'set-password', password: 'NewPass123' })).status).toBe(400);
    expect((await call({ idToken: 'admin', studentId: 's1', action: 'set-password', password: 'short' })).status).toBe(400);
    expect((await call({ idToken: 'admin', studentId: '../x', action: 'details' })).status).toBe(400);
    expect((await call({ idToken: 'bad', studentId: 's1', action: 'details' })).status).toBe(401);
    expect(updated).toHaveLength(0);
  });

  it('keeps only recent activity days', () => {
    const now = Date.parse('2026-09-26T12:00:00Z');
    expect(recentActivity({ '2026-09-26': 4, '2026-04-01': 2, '2026-03-01': 5, junk: 3, '2026-09-20': 0 }, now)).toEqual({ '2026-09-26': 4, '2026-04-01': 2 });
  });
});
