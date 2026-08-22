import msedgeTTS from 'msedge-tts';

const { MsEdgeTTS, OUTPUT_FORMAT } = msedgeTTS;

const DEFAULT_VOICE = 'en-US-AvaNeural';
const MAX_CHARS = 3000;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { text, voice } = req.body || {};

  if (!text || typeof text !== 'string' || !text.trim()) {
    res.status(400).json({ error: 'Missing "text" field' });
    return;
  }

  if (text.length > MAX_CHARS) {
    res.status(400).json({ error: `Text too long (max ${MAX_CHARS} characters)` });
    return;
  }

  try {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(
      voice && typeof voice === 'string' ? voice : DEFAULT_VOICE,
      OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3
    );

    const { audioStream } = tts.toStream(text);

    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);
    tts.close();

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.status(200).send(audioBuffer);
  } catch (err) {
    console.error('TTS synthesis failed:', err);
    res.status(500).json({ error: 'TTS synthesis failed' });
  }
}
