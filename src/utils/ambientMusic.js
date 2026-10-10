// A calm, looping music-box melody for the Premium dialog, synthesised with Web Audio
// (no audio files). startAmbientMusic() returns a function that fades it out and stops it.
import { getAudioContext } from './feedback';

const BPM = 78;
const STEP = 60 / BPM / 2; // eighth note
// four bars: Cmaj7 - Am7 - Fmaj7 - G(add6); [arpeggio tones, pad tones]
const BARS = [
  { arp: [523.25, 659.25, 783.99, 987.77], pad: [130.81, 196, 246.94] },
  { arp: [440, 523.25, 659.25, 783.99], pad: [110, 164.81, 220] },
  { arp: [349.23, 440, 523.25, 659.25], pad: [87.31, 130.81, 174.61] },
  { arp: [392, 493.88, 587.33, 659.25], pad: [98, 146.83, 196] },
];
const PATTERN = [0, 1, 2, 3, 2, 1, 2, 1]; // index into the bar's arp tones, per eighth note
const MELODY = [ // an occasional high note on beat 1 of each bar, 0 = rest
  [1318.5, 0, 0, 0, 1174.7, 0, 0, 0],
  [1046.5, 0, 0, 0, 1318.5, 0, 0, 0],
  [1396.9, 0, 0, 0, 1318.5, 0, 0, 0],
  [1174.7, 0, 0, 0, 1568, 0, 0, 0],
];

function bell(ctx, out, freq, t, vol, len) {
  [[1, vol], [2.0, vol * 0.28], [3.01, vol * 0.1]].forEach(([mult, v]) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * mult, t);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(v, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0003, t + len / mult ** 0.35);
    osc.connect(g); g.connect(out);
    osc.start(t); osc.stop(t + len + 0.05);
  });
}

function pad(ctx, out, freqs, t, len) {
  freqs.forEach((f) => {
    [-4, 4].forEach((detune) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, t);
      osc.detune.setValueAtTime(detune, t);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.014, t + 0.9);
      g.gain.linearRampToValueAtTime(0.014, t + len - 0.9);
      g.gain.linearRampToValueAtTime(0, t + len + 0.4);
      osc.connect(g); g.connect(out);
      osc.start(t); osc.stop(t + len + 0.45);
    });
  });
}

export function startAmbientMusic() {
  try {
    if (localStorage.getItem('voc-audio') === 'false') return () => {};
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    // master -> soft lowpass -> destination, plus an echo for the shimmer
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(1, ctx.currentTime + 1.6);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 5200;
    const echo = ctx.createDelay(1);
    echo.delayTime.value = STEP * 3;
    const fb = ctx.createGain(); fb.gain.value = 0.34;
    const wet = ctx.createGain(); wet.gain.value = 0.45;
    master.connect(lp); lp.connect(ctx.destination);
    master.connect(echo); echo.connect(fb); fb.connect(echo); echo.connect(wet); wet.connect(lp);

    let step = 0;
    let nextTime = ctx.currentTime + 0.25;
    const barLen = STEP * 8;
    const schedule = () => {
      while (nextTime < ctx.currentTime + 1.2) {
        const bar = BARS[Math.floor(step / 8) % BARS.length];
        const pos = step % 8;
        if (pos === 0) pad(ctx, master, bar.pad, nextTime, barLen);
        bell(ctx, master, bar.arp[PATTERN[pos]], nextTime, 0.06, 1.3);
        const m = MELODY[Math.floor(step / 8) % BARS.length][pos];
        if (m) bell(ctx, master, m, nextTime, 0.045, 1.8);
        nextTime += STEP;
        step += 1;
      }
    };
    schedule();
    const timer = setInterval(schedule, 250);

    return () => {
      clearInterval(timer);
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
        setTimeout(() => { try { master.disconnect(); } catch { /* already gone */ } }, 3500);
      } catch { /* ignore */ }
    };
  } catch (error) {
    console.warn('Ambient music failed:', error);
    return () => {};
  }
}
