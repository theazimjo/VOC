// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Fake Admin SDK: `tokens` maps idToken → decoded token, `accounts` holds
// Auth users, `corp` is corpUsers/{uid}.
let tokens;
let accounts;
let corp;
let updated;
let removed;

vi.mock('firebase-admin/app', () => ({
  getApps: () => [],
  initializeApp: () => ({}),
  cert: (x) => x,
}));
vi.mock('firebase-admin/auth', () => ({
  getAuth: () => ({
    verifyIdToken: async (t) => {
      if (!tokens[t]) throw new Error('bad token');
      return tokens[t];
    },
    getUser: async (uid) => {
      if (!accounts[uid]) throw new Error('no user');
      return { uid, email: accounts[uid] };
    },
    getUserByEmail: async (email) => {
      const uid = Object.keys(accounts).find((k) => accounts[k] === email);
      if (!uid) throw new Error('no user');
      return { uid, email };
    },
    updateUser: async (uid, data) => { updated.push({ uid, ...data }); },
  }),
}));
vi.mock('firebase-admin/database', () => ({
  getDatabase: () => ({
    ref: (path) => ({
      get: async () => ({ val: () => corp[path.split('/')[1]] ?? null }),
      remove: async () => { removed.push(path); },
    }),
  }),
}));

const { default: handler } = await import('../api/set-user-password.js');

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
  tokens = {
    sa: { uid: 'sa1', email: 'azimjonxolmirzayev30@gmail.com' },
    teacher: { uid: 't9', email: 'teacher@x.uz' },
    centerAdmin: { uid: 'admin1', email: 'admin@center.uz' },
  };
  accounts = {
    admin1: 'admin@center.uz',
    admin2: 'admin@other.uz',
    student1: 'student@gmail.com',
    teacher1: 'teacher_998901234567@markaz.uz',
    teacher2: 'teacher_998907654321@markaz.uz',
  };
  corp = {
    admin1: { role: 'center_admin', centerId: 'c1' },
    admin2: { role: 'center_admin', centerId: 'c2' },
    teacher1: { role: 'teacher', centerId: 'c1' },
    teacher2: { role: 'teacher', centerId: 'c2' },
    t9: { role: 'teacher', centerId: 'c1' },
  };
  updated = [];
  removed = [];
});

describe('set-user-password API', () => {
  it('lets the super admin set a center admin password', async () => {
    const r = await call({ idToken: 'sa', uid: 'admin1', password: 'NewPass123' });
    expect(r).toEqual({ status: 200, data: { ok: true, email: 'admin@center.uz' } });
    expect(updated).toEqual([{ uid: 'admin1', password: 'NewPass123' }]);
    expect(removed).toContain('corpUsers/admin1/tempPassword');
  });

  it('finds the account by email when uid is missing', async () => {
    const r = await call({ idToken: 'sa', email: 'admin@center.uz', password: 'NewPass123' });
    expect(r.status).toBe(200);
    expect(updated[0].uid).toBe('admin1');
  });

  it('refuses a teacher', async () => {
    const r = await call({ idToken: 'teacher', uid: 'teacher1', password: 'NewPass123' });
    expect(r.status).toBe(403);
    expect(updated).toHaveLength(0);
  });

  it("lets a center admin set their own teacher's password", async () => {
    const r = await call({ idToken: 'centerAdmin', uid: 'teacher1', password: 'NewPass123' });
    expect(r.status).toBe(200);
    expect(updated).toEqual([{ uid: 'teacher1', password: 'NewPass123' }]);
  });

  it("refuses a center admin touching another center's teacher", async () => {
    const r = await call({ idToken: 'centerAdmin', uid: 'teacher2', password: 'NewPass123' });
    expect(r.status).toBe(403);
    expect(updated).toHaveLength(0);
  });

  it('refuses a center admin changing another admin password', async () => {
    const r = await call({ idToken: 'centerAdmin', uid: 'admin2', password: 'NewPass123' });
    expect(r.status).toBe(403);
    expect(updated).toHaveLength(0);
  });

  it('refuses a disabled center admin', async () => {
    corp.admin1.disabled = true;
    const r = await call({ idToken: 'centerAdmin', uid: 'teacher1', password: 'NewPass123' });
    expect(r.status).toBe(403);
  });

  it('refuses an invalid sign-in token', async () => {
    const r = await call({ idToken: 'nope', uid: 'admin1', password: 'NewPass123' });
    expect(r.status).toBe(401);
  });

  it('never changes a student or personal account password', async () => {
    const r = await call({ idToken: 'sa', uid: 'student1', password: 'NewPass123' });
    expect(r.status).toBe(403);
    expect(updated).toHaveLength(0);
  });

  it('rejects a short password', async () => {
    const r = await call({ idToken: 'sa', uid: 'admin1', password: 'short' });
    expect(r.status).toBe(400);
    expect(updated).toHaveLength(0);
  });

  it('explains when the server is not configured', async () => {
    delete process.env.FIREBASE_SERVICE_ACCOUNT;
    const r = await call({ idToken: 'sa', uid: 'admin1', password: 'NewPass123' });
    expect(r.status).toBe(500);
    expect(r.data.error).toMatch(/FIREBASE_SERVICE_ACCOUNT/);
  });
});
