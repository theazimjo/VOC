// Talks to /api/tts (Vercel serverless function wrapping msedge-tts) to get
// real neural-voice narration for listening exercises. Only reachable when
// the API route is actually served (production, or `vercel dev` locally —
// plain `vite dev` has no /api routes).
export async function synthesizeSpeech(text, voice) {
  if (!text || !text.trim()) throw new Error('Missing text to synthesize');

  const res = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voice }),
  });

  if (!res.ok) {
    let message = 'TTS request failed';
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // response body wasn't JSON — keep the generic message
    }
    throw new Error(message);
  }

  const blob = await res.blob();
  return URL.createObjectURL(blob);
}
