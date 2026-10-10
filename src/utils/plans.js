// Plans and limits. Prices/limits here are the defaults; the super admin can
// override them in RTDB at `plans/<planId>` (public read, admin-only write).
// A person's or center's plan lives in `users/<uid>/subscription` or
// `centers/<id>/subscription` and is written only by a super admin.
// Money is in UZS.

export const GRACE_DAYS = 14;
const DAY = 86400000;

export const STUDENT_PLANS = {
  free: { id: 'free', kind: 'student', price: 0, yearly: 0, limits: { packs: 20 } },
  plus: { id: 'plus', kind: 'student', price: 15000, yearly: 99000, limits: { packs: Infinity } },
};

export const CENTER_PLANS = {
  free: { id: 'free', kind: 'center', price: 0, yearly: 0, limits: { students: 15, groups: 1 } },
  start: { id: 'start', kind: 'center', price: 49000, yearly: 490000, limits: { students: 40, groups: 5 } },
  standard: { id: 'standard', kind: 'center', price: 119000, yearly: 1190000, limits: { students: 120, groups: 15 } },
  pro: { id: 'pro', kind: 'center', price: 269000, yearly: 2690000, limits: { students: 300, groups: Infinity } },
  // Centers that existed before plans, and centers the admin sets by hand.
  custom: { id: 'custom', kind: 'center', price: null, yearly: null, limits: { students: Infinity, groups: Infinity } },
};

// Features that are switched on per plan (limits are separate, see withinLimit).
const FEATURES = {
  unlimitedPacks: ['plus', 'custom'],
};

const TABLES = { student: STUDENT_PLANS, center: CENTER_PLANS };

// Merge admin overrides (RTDB `plans`) over the defaults. Limits may arrive as
// null for "unlimited" because RTDB can't store Infinity.
export function mergePlans(kind, overrides) {
  const base = TABLES[kind];
  const out = {};
  Object.keys(base).forEach((id) => {
    const o = (overrides && overrides[id]) || {};
    const limits = { ...base[id].limits };
    Object.entries(o.limits || {}).forEach(([k, v]) => { limits[k] = v == null ? Infinity : Number(v); });
    out[id] = {
      ...base[id],
      ...(typeof o.price === 'number' ? { price: o.price } : {}),
      ...(typeof o.yearly === 'number' ? { yearly: o.yearly } : {}),
      limits,
    };
  });
  return out;
}

// What a subscription is worth right now: its plan, or free once it lapsed
// (after the grace period). Nothing is ever deleted when a plan lapses.
export function resolvePlan(kind, subscription, now = Date.now()) {
  const table = TABLES[kind];
  const freeId = 'free';
  // Centers with no subscription record predate plans: unlimited, as before.
  const noSub = kind === 'center' ? 'custom' : freeId;
  if (!subscription || !table[subscription.plan]) return { planId: noSub, status: 'none', daysLeft: null };
  const until = Number(subscription.until) || 0;
  if (!until) return { planId: subscription.plan, status: 'active', daysLeft: null };
  if (now <= until) return { planId: subscription.plan, status: 'active', daysLeft: Math.ceil((until - now) / DAY) };
  if (now <= until + GRACE_DAYS * DAY) {
    return { planId: subscription.plan, status: 'grace', daysLeft: Math.ceil((until + GRACE_DAYS * DAY - now) / DAY) };
  }
  return { planId: freeId, status: 'lapsed', daysLeft: 0 };
}

export function hasFeature(planId, feature) {
  return (FEATURES[feature] || []).includes(planId);
}

export function getLimit(plans, planId, key) {
  const v = plans?.[planId]?.limits?.[key];
  return v == null ? Infinity : v;
}

export function withinLimit(plans, planId, key, current) {
  return current < getLimit(plans, planId, key);
}

export const formatUZS = (n) => (n == null ? '' : `${Math.round(n).toLocaleString('en-US').replace(/,/g, ' ')} so'm`);
