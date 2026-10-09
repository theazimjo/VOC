import { describe, it, expect } from 'vitest';
import { loginCandidates, isWrongAccount } from './loginIdentifier';
import { validateStudent, makePassword } from '../../../api/_studentAccount.js';

describe('loginCandidates', () => {
  it('keeps an email as it is', () => {
    expect(loginCandidates(' Max@Mail.com ')).toEqual(['Max@Mail.com']);
  });
  it('tries staff and student addresses for a phone number', () => {
    expect(loginCandidates('+998 90 123 45 67')).toEqual(['teacher_998901234567@markaz.uz', 'student_998901234567@markaz.uz']);
  });
  it('treats other text as a username', () => {
    expect(loginCandidates('Max.01')).toEqual(['u_max.01@markaz.uz']);
    expect(loginCandidates('')).toEqual([]);
  });
  it('knows which errors mean "wrong account" and which do not', () => {
    expect(isWrongAccount({ code: 'auth/invalid-credential' })).toBe(true);
    expect(isWrongAccount({ code: 'auth/too-many-requests' })).toBe(false);
  });
});

describe('validateStudent', () => {
  it('builds the sign-in address for a phone number and for a username, matching the login screen', () => {
    const byPhone = validateStudent({ name: 'Ali Valiyev', phone: '+998 90 123 45 67' });
    expect(byPhone).toMatchObject({ ok: true, login: '+998901234567', email: 'student_998901234567@markaz.uz' });
    expect(loginCandidates('+998901234567')).toContain(byPhone.email);

    const byName = validateStudent({ name: 'Ali', username: 'Ali.01' });
    expect(byName).toMatchObject({ ok: true, login: 'ali.01', email: 'u_ali.01@markaz.uz' });
    expect(loginCandidates('ali.01')).toContain(byName.email);
  });
  it('refuses a missing name, a bad username and an empty login', () => {
    expect(validateStudent({ name: 'A', phone: '998901234567' }).ok).toBe(false);
    expect(validateStudent({ name: 'Ali', username: 'a b' }).ok).toBe(false);
    expect(validateStudent({ name: 'Ali' }).ok).toBe(false);
  });
});

describe('makePassword', () => {
  it('makes an easy to type password of the right length', () => {
    const p = makePassword(() => 0.5);
    expect(p).toHaveLength(8);
    expect(p).toMatch(/^[a-z2-9]+$/);
  });
});
