import { getAuth } from 'firebase-admin/auth';
import { requireAdminApp, requirePost } from './_firebaseAdmin.js';

// Server-side Gemini proxy: the API key lives only in the Vercel environment
// (GEMINI_API_KEY), never in the app bundle. Signed-in users only.
//
//   POST { idToken, payload }  ->  Gemini generateContent response
//
// Vercel → Settings → Environment Variables → GEMINI_API_KEY (a key created at
// https://aistudio.google.com/apikey).

const MODELS = ['gemini-flash-latest', 'gemini-flash-lite-latest', 'gemini-2.0-flash', 'gemini-2.5-flash'];
const MAX_BODY_CHARS = 8_000_000; // a photo as base64 is a few MB

export default async function handler(req, res) {
  if (!requirePost(req, res)) return;

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    res.status(500).json({ error: 'AI xizmati sozlanmagan: GEMINI_API_KEY kerak.' });
    return;
  }

  const { idToken, payload } = req.body || {};
  if (!payload || typeof payload !== 'object' || JSON.stringify(payload).length > MAX_BODY_CHARS) {
    res.status(400).json({ error: "So'rov noto'g'ri yoki juda katta." });
    return;
  }

  const app = requireAdminApp(res, 'gemini');
  if (!app) return;
  try {
    await getAuth(app).verifyIdToken(String(idToken || ''));
  } catch {
    res.status(401).json({ error: 'Avval tizimga kiring.' });
    return;
  }

  let status = 502;
  let message = '';
  for (const model of MODELS) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify(payload),
      });
      if (r.ok) {
        res.status(200).json(await r.json());
        return;
      }
      status = r.status;
      message = `[${model}] ${r.status}`;
    } catch (err) {
      message = String(err?.message || err);
    }
  }
  res.status(status === 429 ? 429 : 502).json({ error: message || 'AI xizmatiga ulanib bo\'lmadi.' });
}
