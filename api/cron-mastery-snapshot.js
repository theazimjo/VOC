import { getDatabase } from 'firebase-admin/database';
import { requireAdminApp } from './_firebaseAdmin.js';
import { masterySnapshot, tashkentDay } from '../src/pages/corp/super-admin/centerActivity.js';

// Nightly (vercel.json → crons): records each center's average student
// mastery for the day under centers/{id}/masteryHistory/{YYYY-MM-DD}, so
// the admin dashboard can draw day-by-day growth. The same point carries a
// per-group breakdown (`groups: { groupId: { avg, practiced, total } }`)
// for the group page's chart. Mastery itself is only
// stored as a current value per student — this is what makes a history.
//
// Vercel calls cron paths with `Authorization: Bearer $CRON_SECRET`; the
// endpoint refuses anything else, and refuses to run if the secret isn't
// configured. Re-running on the same day just overwrites that day's point.

export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    res.status(500).json({ error: 'CRON_SECRET sozlanmagan.' });
    return;
  }
  if (req.headers?.authorization !== `Bearer ${secret}`) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const app = requireAdminApp(res, 'cron-mastery-snapshot');
  if (!app) return;

  const db = getDatabase(app);
  const day = tashkentDay();
  const centers = (await db.ref('centers').get()).val() || {};

  const updates = {};
  Object.entries(centers).forEach(([id, center]) => {
    if (!center || center.status === 'suspended') return;
    const snap = masterySnapshot(Object.values(center.groups || {}));
    if (!snap.total) return; // nothing to chart yet
    const groups = {};
    Object.entries(center.groups || {}).forEach(([gid, g]) => {
      if (!g || g.status === 'archived') return;
      const gs = masterySnapshot([g]);
      if (gs.total) groups[gid] = gs;
    });
    updates[`centers/${id}/masteryHistory/${day}`] = { ...snap, groups, at: new Date().toISOString() };
  });

  if (Object.keys(updates).length) await db.ref().update(updates);
  res.status(200).json({ ok: true, day, centers: Object.keys(updates).length });
}
