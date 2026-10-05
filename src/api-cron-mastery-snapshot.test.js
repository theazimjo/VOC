// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

let tree;
let lastUpdate;

vi.mock('firebase-admin/app', () => ({ getApps: () => [], initializeApp: () => ({}), cert: (x) => x }));
vi.mock('firebase-admin/database', () => ({
  getDatabase: () => ({
    ref: (path = '') => ({
      get: async () => ({ val: () => (path === 'centers' ? tree.centers : null) }),
      update: async (u) => { lastUpdate = u; },
    }),
  }),
}));

const { default: handler } = await import('../api/cron-mastery-snapshot.js');

function call(headers = {}) {
  return new Promise((resolve) => {
    const res = {
      statusCode: 200,
      setHeader() {},
      status(code) { this.statusCode = code; return this; },
      json(data) { resolve({ status: this.statusCode, data }); },
    };
    handler({ method: 'GET', headers }, res);
  });
}

const st = (m) => ({ progress: { p: { units: { a: { masteryPercent: m } } } } });

beforeEach(() => {
  process.env.FIREBASE_SERVICE_ACCOUNT = JSON.stringify({ project_id: 'p', private_key: 'k', client_email: 'e' });
  process.env.CRON_SECRET = 's3cret';
  lastUpdate = null;
  tree = {
    centers: {
      A: { groups: { g: { students: { x: st(80), y: st(60) } }, h: { students: { z: st(40) } }, old: { status: 'archived', students: { q: st(5) } } } },
      B: { status: 'suspended', groups: { g: { students: { x: st(10) } } } },
      C: { groups: {} },
    },
  };
});

describe('cron mastery snapshot', () => {
  it('writes one point per active center with students', async () => {
    const r = await call({ authorization: 'Bearer s3cret' });
    expect(r.status).toBe(200);
    expect(r.data.centers).toBe(1);
    const [key, value] = Object.entries(lastUpdate)[0];
    expect(key).toMatch(/^centers\/A\/masteryHistory\/\d{4}-\d{2}-\d{2}$/);
    expect(value).toMatchObject({ avg: 60, practiced: 3, total: 3 });
    expect(value.groups).toEqual({ g: { avg: 70, practiced: 2, total: 2 }, h: { avg: 40, practiced: 1, total: 1 } });
  });

  it('refuses without the cron secret', async () => {
    expect((await call({})).status).toBe(401);
    expect((await call({ authorization: 'Bearer nope' })).status).toBe(401);
    expect(lastUpdate).toBeNull();
  });

  it('refuses to run when the secret is not configured', async () => {
    delete process.env.CRON_SECRET;
    expect((await call({ authorization: 'Bearer undefined' })).status).toBe(500);
  });
});
