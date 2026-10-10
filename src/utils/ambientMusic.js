// Slow, cinematic background music for the Premium dialog, synthesised with Web Audio
// (no audio files): a warm evolving pad, a deep root note and a sparse felt-piano
// melody, all washed in a long reverb. startAmbientMusic() returns a function that
// fades it out and stops it.
import { getAudioContext } from './feedback';

const BAR = 6.4; // seconds per chord (about 75 bpm in 2 beats of 3.2s feel)
const hz = (n) => 440 * 2 ** ((n - 69) / 12); // MIDI note -> Hz

// Cmaj9 - Am9 - Fmaj7(#11) - Gsus/6 : pad notes, root, then the melody (beat offset in seconds, note)
const CHORDS = [
  { root: 36, pad: [55, 59, 62, 64, 67], mel: [[0.2, 83], [1.8, 79], [3.2, 81], [4.6, 76]] },
  { root: 33, pad: [57, 60, 64, 67, 71], mel: [[0.2, 81], [1.6, 84], [3.0, 83], [4.8, 79]] },
  { root: 29, pad: [53, 57, 60, 64, 67], mel: [[0.2, 84], [2.0, 81], [3.4, 79], [4.8, 77]] },
  { root: 31, pad: [55, 59, 62, 64, 69], mel: [[0.2, 79], [1.6, 83], [3.0, 86], [4.6, 83]] },
];

function makeReverb(ctx, seconds = 3.6) {
  const rate = ctx.sampleRate;
  const len = Math.floor(rate * seconds);
  const ir = ctx.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const data = ir.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      const t = i / len;
      data[i] = (Math.random() * 2 - 1) * (1 - t) ** 2.6;
    }
  }
  const conv = ctx.createConvolver();
  conv.buffer = ir;
  return conv;
}

// warm pad voice: two detuned saws through a slowly opening lowpass, long swell in and out
function padNote(ctx, out, midi, t, len, pan) {
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.Q.value = 0.6;
  lp.frequency.setValueAtTime(380, t);
  lp.frequency.linearRampToValueAtTime(1500, t + len * 0.55);
  lp.frequency.linearRampToValueAtTime(500, t + len + 1.5);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.022, t + 2.4);
  g.gain.setValueAtTime(0.022, t + len - 0.4);
  g.gain.linearRampToValueAtTime(0, t + len + 2.2);
  const p = ctx.createStereoPanner();
  p.pan.value = pan;
  lp.connect(g); g.connect(p); p.connect(out);
  [-7, 7].forEach((detune) => {
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(hz(midi), t);
    osc.detune.setValueAtTime(detune, t);
    osc.connect(lp);
    osc.start(t); osc.stop(t + len + 2.3);
  });
}

function rootNote(ctx, out, midi, t, len) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(hz(midi), t);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.11, t + 1.6);
  g.gain.setValueAtTime(0.11, t + len - 0.5);
  g.gain.linearRampToValueAtTime(0, t + len + 1.4);
  osc.connect(g); g.connect(out);
  osc.start(t); osc.stop(t + len + 1.5);
}

// soft felt-piano / glass tone: sine + a quiet octave, quick attack, long fade
function pianoNote(ctx, out, midi, t, vol) {
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 3200;
  lp.connect(out);
  [[1, vol], [2, vol * 0.22], [3, vol * 0.07]].forEach(([mult, v], i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = i === 0 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(hz(midi) * mult, t);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(v, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0004, t + 3.2 / mult ** 0.5);
    osc.connect(g); g.connect(lp);
    osc.start(t); osc.stop(t + 3.4);
  });
}

export function startAmbientMusic() {
  try {
    if (localStorage.getItem('voc-audio') === 'false') return () => {};
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 3);
    const dry = ctx.createGain(); dry.gain.value = 0.7;
    const wet = ctx.createGain(); wet.gain.value = 0.85;
    const verb = makeReverb(ctx);
    const bus = ctx.createGain(); // everything plays into the bus, then dry + reverb
    bus.connect(dry); dry.connect(master);
    bus.connect(verb); verb.connect(wet); wet.connect(master);
    master.connect(ctx.destination);

    let bar = 0;
    let nextBar = ctx.currentTime + 0.2;
    const schedule = () => {
      while (nextBar < ctx.currentTime + 2) {
        const c = CHORDS[bar % CHORDS.length];
        rootNote(ctx, bus, c.root, nextBar, BAR);
        c.pad.forEach((n, i) => padNote(ctx, bus, n, nextBar, BAR, (i - 2) * 0.28));
        // the melody only starts from the second bar, so the pad can bloom first
        if (bar > 0) c.mel.forEach(([off, n]) => pianoNote(ctx, bus, n, nextBar + off, 0.07));
        nextBar += BAR;
        bar += 1;
      }
    };
    schedule();
    const timer = setInterval(schedule, 500);

    return () => {
      clearInterval(timer);
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
        setTimeout(() => { try { master.disconnect(); } catch { /* already gone */ } }, 6000);
      } catch { /* ignore */ }
    };
  } catch (error) {
    console.warn('Ambient music failed:', error);
    return () => {};
  }
}
