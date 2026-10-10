// Web Audio API Synth for premium sound effects
let audioCtx = null;

export function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export function playSound(type) {
  try {
    const audioEnabled = localStorage.getItem('voc-audio') !== 'false';
    if (!audioEnabled) return;

    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    
    if (type === 'correct') {
      // Crisp pleasant synth arpeggio
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
      
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'wrong') {
      // Deep warning pitch drop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.25);
      
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'sparkle') {
      // Soft magical shimmer: a quick ascending run of bell-like notes that rings out
      const notes = [1046.5, 1318.5, 1568, 2093, 2637, 3136]; // C6 E6 G6 C7 E7 G7
      notes.forEach((freq, i) => {
        const t0 = now + i * 0.085;
        [1, 2.01].forEach((mult, k) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq * mult, t0);
          gain.gain.setValueAtTime(0, t0);
          gain.gain.linearRampToValueAtTime((k ? 0.012 : 0.05) * (1 - i * 0.07), t0 + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0005, t0 + 1.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t0);
          osc.stop(t0 + 1.15);
        });
      });
    } else if (type === 'victory') {
      // Triumphant uplifting synth melody
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'triangle';
      osc2.type = 'sine';
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      
      // Melody: C4 - E4 - G4 - C5 - E5
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25];
      notes.forEach((freq, idx) => {
        osc1.frequency.setValueAtTime(freq, now + idx * 0.08);
        osc2.frequency.setValueAtTime(freq * 1.5, now + idx * 0.08);
      });
      
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.8);
      osc2.stop(now + 0.8);
    }
  } catch (error) {
    console.warn('Audio feedback failed:', error);
  }
}

export function triggerVibration(type) {
  if (!navigator.vibrate) return;
  
  try {
    if (type === 'correct') {
      navigator.vibrate(80); // Short single pulse
    } else if (type === 'wrong') {
      navigator.vibrate([100, 60, 100]); // Double quick pulse
    } else if (type === 'victory') {
      navigator.vibrate([120, 60, 120, 60, 250]); // Rhythmic triumph pulse
    }
  } catch (error) {
    console.warn('Haptic feedback failed:', error);
  }
}
