import { describe, it, expect } from 'vitest';
import { CENTER_PLANS, STUDENT_PLANS, getLimit, hasFeature, mergePlans, resolvePlan, withinLimit } from './plans';

const DAY = 86400000;
const OFF = { everyonePremium: false };

describe('resolvePlan', () => {
  const now = 1_000_000_000_000;
  it('learners without a subscription are on free, centers keep unlimited', () => {
    expect(resolvePlan('student', null, now, OFF).planId).toBe('free');
    expect(resolvePlan('center', null, now, OFF).planId).toBe('custom');
  });
  it('stays active until the end date, then 14 grace days, then free', () => {
    const sub = { plan: 'plus', until: now + 5 * DAY };
    expect(resolvePlan('student', sub, now, OFF)).toMatchObject({ planId: 'plus', status: 'active', daysLeft: 5 });
    expect(resolvePlan('student', sub, now + 10 * DAY, OFF)).toMatchObject({ planId: 'plus', status: 'grace' });
    expect(resolvePlan('student', sub, now + 25 * DAY, OFF)).toMatchObject({ planId: 'free', status: 'lapsed' });
  });
  it('no end date means active forever', () => {
    expect(resolvePlan('center', { plan: 'pro', until: 0 }, now, OFF).status).toBe('active');
  });
  it('during the launch period learners without a plan are on plus', () => {
    expect(resolvePlan('student', null, now, { everyonePremium: true }).planId).toBe('plus');
    expect(resolvePlan('student', { plan: 'plus', until: now - 30 * DAY }, now, { everyonePremium: true }).planId).toBe('plus');
  });
  it('ignores an unknown plan id', () => {
    expect(resolvePlan('student', { plan: 'nope' }, now, OFF).planId).toBe('free');
  });
});

describe('limits and features', () => {
  it('free learners get 20 packs, plus is unlimited', () => {
    expect(withinLimit(STUDENT_PLANS, 'free', 'packs', 19)).toBe(true);
    expect(withinLimit(STUDENT_PLANS, 'free', 'packs', 20)).toBe(false);
    expect(getLimit(STUDENT_PLANS, 'plus', 'packs')).toBe(Infinity);
    expect(hasFeature('plus', 'unlimitedPacks')).toBe(true);
    expect(hasFeature('free', 'unlimitedPacks')).toBe(false);
  });
  it('admin overrides win and null means unlimited', () => {
    const merged = mergePlans('center', { start: { price: 39000, limits: { students: null } } });
    expect(merged.start.price).toBe(39000);
    expect(merged.start.limits.students).toBe(Infinity);
    expect(merged.start.limits.groups).toBe(CENTER_PLANS.start.limits.groups);
  });
});
