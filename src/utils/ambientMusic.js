// Uplifting, energetic "premium anthem" for the Premium dialog, synthesised with Web Audio
// (no audio files): a riser into a driving 120 bpm groove with kick, claps, hats, a pumping
// bass, bright supersaw chord stabs, a sparkling arpeggio and a hook. startAmbientMusic()
// returns a function that fades it out and stops it.
import { getAudioContext } from './feedback';

const BPM = 120;
const STEP = 60 / BPM / 4; // sixteenth note = 0.125s
const BAR_STEPS = 16;
const hz = (n) => 440 * 2 ** ((n - 69) / 12);

// I - V - vi - IV in C major, one bar each; MIDI notes
const CHORDS = [
  { root: 36, tri: [60, 64, 67], arp: [72, 76, 79, 84] },
  { root: 43, tri: [59, 62, 67], arp: [71, 74, 79, 83] },
  { root: 45, tri: [60, 64, 69], arp: [72, 76, 81, 84] },
  { root: 41, tri: [60, 65, 69], arp: [72, 77, 81, 84] },
];
// hook on top: [step in bar, midi, length in steps] per bar of the 4-bar loop
const HOOK = [
  [[0, 91, 3], [4, 88, 2], [6, 91, 2], [8, 93, 4]],
  [[0, 91, 3], [4, 86, 2], [6, 88, 2], [8, 91, 4]],
  [[0, 93, 3], [4, 91, 2], [6, 88, 2], [8, 84, 4]],
  [[0, 89, 3], [4, 91, 2], [6, 93, 2], [8, 96, 6]],
];
const STAB_STEPS = [0, 3, 6, 10, 13];
const ARP = [0, 1, 2, 3, 2, 1, 2, 3, 0, 1, 2, 3, 2, 1, 3, 2];

let noiseBuf = null;
function noise(ctx) {
  if (!noiseBuf || noiseBuf.sampleRate !== ctx.sampleRate) {
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const src = ctx.createBufferSource();
  src.buffer = noiseBuf;
  return src;
}

function makeReverb(ctx, seconds = 2.4) {
  const rate = ctx.sampleRate;
  const len = Math.floor(rate * seconds);
  const ir = ctx.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const data = ir.getChannelData(ch);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
  }
  const conv = ctx.createConvolver();
  conv.buffer = ir;
  return conv;
}

function kick(ctx, out, t) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, t);
  osc.frequency.exponentialRampToValueAtTime(46, t + 0.12);
  g.gain.setValueAtTime(0.9, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.34);
  osc.connect(g); g.connect(out);
  osc.start(t); osc.stop(t + 0.36);
}

function hat(ctx, out, t, vol, len) {
  const n = noise(ctx);
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass'; hp.frequency.value = 7500;
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0005, t + len);
  n.connect(hp); hp.connect(g); g.connect(out);
  n.start(t, Math.random()); n.stop(t + len + 0.02);
}

function clap(ctx, out, send, t) {
  [0, 0.012, 0.024].forEach((o, i) => {
    const n = noise(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = 1700; bp.Q.value = 0.8;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t + o);
    g.gain.exponentialRampToValueAtTime(0.4, t + o + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0005, t + o + (i === 2 ? 0.2 : 0.04));
    n.connect(bp); bp.connect(g); g.connect(out); g.connect(send);
    n.start(t + o, Math.random()); n.stop(t + o + 0.25);
  });
}

function bass(ctx, out, midi, t, len) {
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass'; lp.Q.value = 5;
  lp.frequency.setValueAtTime(900, t);
  lp.frequency.exponentialRampToValueAtTime(160, t + len);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.34, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.001, t + len);
  lp.connect(g); g.connect(out);
  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(hz(midi), t);
  osc.connect(lp);
  osc.start(t); osc.stop(t + len + 0.02);
}

function stab(ctx, out, send, midis, t) {
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.setValueAtTime(5200, t);
  lp.frequency.exponentialRampToValueAtTime(1800, t + 0.28);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.05, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
  lp.connect(g); g.connect(out); g.connect(send);
  midis.forEach((m) => [-12, 0, 12].forEach((detune) => {
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(hz(m), t);
    osc.detune.setValueAtTime(detune, t);
    osc.connect(lp);
    osc.start(t); osc.stop(t + 0.32);
  }));
}

function pluck(ctx, out, send, midi, t, vol, len = 0.22) {
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.setValueAtTime(6500, t);
  lp.frequency.exponentialRampToValueAtTime(1500, t + len);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0005, t + len);
  lp.connect(g); g.connect(out); g.connect(send);
  const osc = ctx.createOscillator();
  osc.type = 'square';
  osc.frequency.setValueAtTime(hz(midi), t);
  osc.connect(lp);
  osc.start(t); osc.stop(t + len + 0.02);
}

function lead(ctx, out, send, midi, t, len) {
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass'; lp.frequency.value = 6000;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.07, t + 0.015);
  g.gain.setValueAtTime(0.07, t + len * 0.6);
  g.gain.exponentialRampToValueAtTime(0.001, t + len + 0.25);
  lp.connect(g); g.connect(out); g.connect(send);
  [[0, 'triangle'], [6, 'sawtooth']].forEach(([detune, type]) => {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(hz(midi), t);
    osc.detune.setValueAtTime(detune, t);
    const vib = ctx.createOscillator(); // gentle vibrato
    const vg = ctx.createGain();
    vib.frequency.value = 5.5; vg.gain.value = 9;
    vib.connect(vg); vg.connect(osc.detune);
    osc.connect(lp);
    osc.start(t); osc.stop(t + len + 0.3);
    vib.start(t); vib.stop(t + len + 0.3);
  });
}

function crash(ctx, out, send, t) {
  const n = noise(ctx);
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass'; hp.frequency.value = 4500;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.16, t);
  g.gain.exponentialRampToValueAtTime(0.0005, t + 1.6);
  n.connect(hp); hp.connect(g); g.connect(out); g.connect(send);
  n.start(t, Math.random()); n.stop(t + 1.7);
}

// the opening build: noise sweeping up and a rising tone, ending right on the first downbeat
function riser(ctx, out, t, len) {
  const n = noise(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass'; bp.Q.value = 1.2;
  bp.frequency.setValueAtTime(400, t);
  bp.frequency.exponentialRampToValueAtTime(9000, t + len);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.22, t + len);
  g.gain.linearRampToValueAtTime(0, t + len + 0.03);
  n.connect(bp); bp.connect(g); g.connect(out);
  n.start(t, 0); n.stop(t + len + 0.05);
  const osc = ctx.createOscillator();
  const og = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, t);
  osc.frequency.exponentialRampToValueAtTime(1760, t + len);
  og.gain.setValueAtTime(0.0001, t);
  og.gain.exponentialRampToValueAtTime(0.05, t + len);
  og.gain.linearRampToValueAtTime(0, t + len + 0.03);
  osc.connect(og); og.connect(out);
  osc.start(t); osc.stop(t + len + 0.05);
}

export function startAmbientMusic() {
  try {
    if (localStorage.getItem('voc-audio') === 'false') return () => {};
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.85, ctx.currentTime + 0.4);
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.ratio.value = 4; comp.attack.value = 0.005; comp.release.value = 0.18;
    master.connect(comp); comp.connect(ctx.destination);

    const bus = ctx.createGain();
    bus.connect(master);
    const verb = makeReverb(ctx);
    const send = ctx.createGain(); send.gain.value = 0.5;
    const wetOut = ctx.createGain(); wetOut.gain.value = 0.7;
    send.connect(verb); verb.connect(wetOut); wetOut.connect(master);
    const echo = ctx.createDelay(1); echo.delayTime.value = STEP * 3; // dotted eighth
    const fb = ctx.createGain(); fb.gain.value = 0.32;
    const echoOut = ctx.createGain(); echoOut.gain.value = 0.5;
    echo.connect(fb); fb.connect(echo); echo.connect(echoOut); echoOut.connect(master);
    const arpSend = ctx.createGain(); arpSend.gain.value = 0.9;
    arpSend.connect(echo);

    const INTRO = 1; // bars of build-up before the groove drops
    const intro = INTRO * BAR_STEPS * STEP;
    const startTime = ctx.currentTime + 0.15;
    riser(ctx, bus, startTime, intro);
    // a soft, growing arpeggio during the build, so the intro is not just noise
    for (let i = 0; i < INTRO * BAR_STEPS; i++) {
      const c = CHORDS[Math.floor(i / BAR_STEPS) % CHORDS.length];
      pluck(ctx, bus, arpSend, c.arp[ARP[i % BAR_STEPS] % 4], startTime + i * STEP, 0.02 + (i / (INTRO * BAR_STEPS)) * 0.03);
    }

    let step = 0; // counted from the groove drop
    let nextTime = startTime + intro;
    const schedule = () => {
      while (nextTime < ctx.currentTime + 1.2) {
        const bar = Math.floor(step / BAR_STEPS);
        const pos = step % BAR_STEPS;
        const c = CHORDS[bar % CHORDS.length];
        const t = nextTime;

        if (pos === 0 && bar % 4 === 0) crash(ctx, bus, send, t);
        if (pos % 4 === 0) kick(ctx, bus, t);
        if (pos === 4 || pos === 12) clap(ctx, bus, send, t);
        if (pos % 4 === 2) hat(ctx, bus, t, 0.09, 0.09);
        else if (pos % 2 === 1) hat(ctx, bus, t, 0.03, 0.04);
        if (pos % 4 === 2) bass(ctx, bus, c.root, t, STEP * 3.4); // offbeat pump
        if (STAB_STEPS.includes(pos)) stab(ctx, bus, send, c.tri, t);
        pluck(ctx, bus, arpSend, c.arp[ARP[pos] % 4], t, 0.05);
        HOOK[bar % HOOK.length].forEach(([s, n, l]) => { if (s === pos && bar >= 1) lead(ctx, bus, send, n, t, l * STEP); });

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
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.7);
        setTimeout(() => { try { master.disconnect(); } catch { /* already gone */ } }, 3000);
      } catch { /* ignore */ }
    };
  } catch (error) {
    console.warn('Ambient music failed:', error);
    return () => {};
  }
}
