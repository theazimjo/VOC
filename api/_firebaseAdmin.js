import { cert, getApps, initializeApp } from 'firebase-admin/app';

// Shared Admin SDK setup for api/*.js. Files starting with "_" are not
// deployed as endpoints by Vercel (and the dev plugin skips them too).
//
// Required env var (Vercel → Settings → Environment Variables, and
// .env.local for `npm run dev`), either one:
//   FIREBASE_SERVICE_ACCOUNT          the service-account JSON, on one line
//   FIREBASE_SERVICE_ACCOUNT_BASE64   the same JSON, base64-encoded
// Get it from Firebase console → Project settings → Service accounts →
// "Generate new private key".

// Must match SUPER_ADMINS in src/hooks/useCorpRole.js.
export const SUPER_ADMINS = ['azimjon29042006@gmail.com', 'azimjonxolmirzayev30@gmail.com'];
const DATABASE_URL = 'https://ai-chat-703e7-default-rtdb.firebaseio.com';

function loadServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT
    || (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64
      ? Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8')
      : '');
  if (!raw) return null;
  const parsed = JSON.parse(raw);
  // Keys pasted through some dashboards arrive with literal "\n".
  if (parsed.private_key) parsed.private_key = parsed.private_key.replace(/\n/g, '\n');
  return parsed;
}

function adminApp() {
  if (getApps().length) return getApps()[0];
  const account = loadServiceAccount();
  if (!account) return null;
  return initializeApp({ credential: cert(account), databaseURL: DATABASE_URL });
}

// Returns the app, or sends the 500 response and returns null.
export function requireAdminApp(res, tag) {
  try {
    const app = adminApp();
    if (!app) {
      res.status(500).json({ error: 'Server sozlanmagan: FIREBASE_SERVICE_ACCOUNT kerak.' });
      return null;
    }
    return app;
  } catch (err) {
    console.error(`${tag}: bad service account`, err);
    res.status(500).json({ error: "FIREBASE_SERVICE_ACCOUNT noto'g'ri formatda." });
    return null;
  }
}

export function requirePost(req, res) {
  if (req.method === 'POST') return true;
  res.setHeader('Allow', 'POST');
  res.status(405).json({ error: 'Method not allowed' });
  return false;
}
