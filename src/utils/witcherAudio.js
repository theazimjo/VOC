// Witcher Web Audio Synthesizer Engine
// Generates custom retro-modern sound effects dynamically in the browser.

class WitcherAudio {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  createNoiseBuffer() {
    const bufferSize = this.ctx.sampleRate * 2; // 2 seconds of noise
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  // Paper click / card slide
  playCardPlace() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Click transient
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);

    // Friction noise
    const noise = ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer();
    const filter = ctx.createBiquadFilter();
    const noiseGain = ctx.createGain();

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.12);
    filter.Q.value = 3.0;

    noiseGain.gain.setValueAtTime(0.12, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.12);
  }

  // Cold wind howling (Frost, Fog, Rain)
  playWeather() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const noise = ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.linearRampToValueAtTime(800, now + 0.3);
    filter.frequency.linearRampToValueAtTime(300, now + 0.8);
    filter.Q.value = 8.0;

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.8);
  }

  // Trumpet double-note fan-fare (Horn)
  playHorn() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const playNote = (freq, start, duration) => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(freq, start);
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(freq * 1.005, start); // detune

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, start);
      filter.frequency.exponentialRampToValueAtTime(1500, start + 0.1);
      filter.frequency.exponentialRampToValueAtTime(600, start + duration);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.12, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(start);
      osc1.stop(start + duration);
      osc2.start(start);
      osc2.stop(start + duration);
    };

    playNote(220, now, 0.18); // A3
    playNote(293.66, now + 0.15, 0.45); // D4
  }

  // Decoy swap whoosh
  playDecoy() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.35);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Deep medieval pass horn
  playPass() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const playBassHorn = (freq, start, duration) => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(freq, start);
      // Vibrato/tremolo
      osc1.frequency.linearRampToValueAtTime(freq - 2, start + duration * 0.5);
      osc1.frequency.linearRampToValueAtTime(freq + 1, start + duration);

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(freq * 0.995, start);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, start);
      filter.frequency.linearRampToValueAtTime(450, start + 0.2);
      filter.frequency.exponentialRampToValueAtTime(120, start + duration);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.2, start + 0.2);
      gain.gain.linearRampToValueAtTime(0.15, start + duration * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(start);
      osc1.stop(start + duration);
      osc2.start(start);
      osc2.stop(start + duration);
    };

    playBassHorn(110, now, 1.2); // A2 deep horn
    playBassHorn(110 * 1.5, now + 0.05, 1.15); // E3 fifth harmony
  }

  // Triumphant arpeggio
  playRoundWin() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const playTone = (freq, start, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.12, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };

    // D Major triad arpeggio
    playTone(293.66, now, 0.3);        // D4
    playTone(369.99, now + 0.12, 0.3); // F#4
    playTone(440.00, now + 0.24, 0.3); // A4
    playTone(587.33, now + 0.36, 0.6); // D5
  }

  // Dreadful pitch drop
  playRoundLoss() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now); // A3
    osc.frequency.linearRampToValueAtTime(70, now + 0.8); // Drop down to deep rumble

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.8);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.9);
  }

  // Triumphant orchestral finish
  playMatchWin() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;
    this.playRoundWin();
    setTimeout(() => {
      this.playHorn();
    }, 450);
  }

  // Dread drop + deep pass horn
  playMatchLose() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;
    this.playRoundLoss();
    setTimeout(() => {
      this.playPass();
    }, 400);
  }

  // Potion heal chord arpeggio
  playHeal() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const notes = [261.63, 329.63, 392.00, 523.25]; // C major
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.1, now + idx * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  }

  // Blunt damage taken
  playDamage() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.linearRampToValueAtTime(30, now + 0.2);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Medallion rattle warning
  playRattle() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Rapid metal click-click-click
    for (let i = 0; i < 6; i++) {
      const time = now + i * 0.07;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200 - i * 50, time);

      gain.gain.setValueAtTime(0.05, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.04);
    }
  }
}

export const witcherAudio = new WitcherAudio();
