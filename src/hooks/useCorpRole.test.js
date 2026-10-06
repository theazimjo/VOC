import { beforeEach, describe, expect, it, vi } from 'vitest';

const db = { corpUsers: {}, statuses: {} };
vi.mock('../firebase', () => ({ auth: {}, db: {} }));
vi.mock('firebase/auth', () => ({ onAuthStateChanged: vi.fn() }));
vi.mock('firebase/database', () => ({
  ref: (_db, path) => path,
  get: async (path) => {
    const parts = path.split('/');
    const val = parts[0] === 'corpUsers' ? db.corpUsers[parts[1]] : parts[0] === 'centers' ? db.statuses[parts[1]] : undefined;
    return { exists: () => val !== undefined, val: () => val };
  },
}));

const { resolveCorpIdentity, clearCorpIdentityCache } = await import('./useCorpRole');
const { setActiveRole, clearActiveRole, setViewAs, clearViewAs } = await import('../utils/activeRole');

describe('resolveCorpIdentity with several roles', () => {
  beforeEach(() => {
    localStorage.clear();
    clearActiveRole();
    clearViewAs();
    clearCorpIdentityCache('u1');
    db.corpUsers = {};
    db.statuses = {};
  });

  it('a center admin without a teacher record has only the admin role', async () => {
    db.corpUsers.u1 = { role: 'center_admin', centerId: 'c1' };
    const id = await resolveCorpIdentity({ uid: 'u1', email: 'a@b.uz' });
    expect(id).toMatchObject({ role: 'center_admin', roles: ['center_admin'] });
  });

  it('a center admin who also teaches can act as either, per the chosen role', async () => {
    db.corpUsers.u1 = { role: 'center_admin', centerId: 'c1', teacherId: 't9', teacherName: 'Ann' };
    expect(await resolveCorpIdentity({ uid: 'u1', email: 'a@b.uz' })).toMatchObject({ role: 'center_admin', roles: ['center_admin', 'teacher'] });
    clearCorpIdentityCache('u1');
    setActiveRole('teacher');
    expect(await resolveCorpIdentity({ uid: 'u1', email: 'a@b.uz' })).toMatchObject({ role: 'teacher', realRole: 'center_admin', teacherId: 't9', centerId: 'c1', roles: ['center_admin', 'teacher'] });
  });

  it('a plain teacher is never offered the admin role', async () => {
    db.corpUsers.u1 = { role: 'teacher', centerId: 'c1', teacherId: 't1' };
    setActiveRole('center_admin');
    expect(await resolveCorpIdentity({ uid: 'u1', email: 't@b.uz' })).toMatchObject({ role: 'teacher', roles: ['teacher'] });
  });

  it('the super admin can view a center as its admin or one of its teachers', async () => {
    const su = { uid: 'su', email: 'azimjon29042006@gmail.com' };
    expect(await resolveCorpIdentity(su)).toMatchObject({ role: 'super_admin' });
    setViewAs({ role: 'center_admin', centerId: 'c7', centerName: 'Demo' });
    expect(await resolveCorpIdentity(su)).toMatchObject({ role: 'center_admin', centerId: 'c7', viewAs: true, realRole: 'super_admin' });
    setViewAs({ role: 'teacher', centerId: 'c7', centerName: 'Demo', teacherId: 't3', teacherName: 'Bob' });
    expect(await resolveCorpIdentity(su)).toMatchObject({ role: 'teacher', teacherId: 't3', teacherName: 'Bob', viewAs: true });
    clearViewAs();
    expect(await resolveCorpIdentity(su)).toMatchObject({ role: 'super_admin' });
  });

  it('view-as does nothing for an account that is not the super admin', async () => {
    db.corpUsers.u1 = { role: 'teacher', centerId: 'c1', teacherId: 't1' };
    setViewAs({ role: 'center_admin', centerId: 'c7' });
    expect(await resolveCorpIdentity({ uid: 'u1', email: 'x@y.uz' })).toMatchObject({ role: 'teacher', centerId: 'c1' });
  });
});
