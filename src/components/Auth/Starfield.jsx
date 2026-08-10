import { useEffect, useRef } from 'react';

const BASE_PARTICLE_COUNT = 180;
// Reference area (a typical phone-ish viewport) the base count is tuned
// for. Larger screens get proportionally more particles so the field
// still reads as a full burst instead of a sparse scatter of dots.
const REFERENCE_AREA = 900 * 600;
const MAX_DENSITY_SCALE = 2.4;

// The last stretch of the sequence where particles physically accelerate —
// this *is* the "tezlashadi" speed-up, not a separate hand-tuned wave.
const ACCEL_WINDOW_MS = 1000;
const MAX_ACCEL_MULTIPLIER = 4.5;

const BG_STAR_COUNT = 90;

// Mostly true white, with a minority tinted cool (like a hot blue star) or
// warm (like a low-mass orange one) — real starfields aren't monochrome.
const STAR_TINTS = [
  { r: 255, g: 255, b: 255, weight: 0.7 },
  { r: 196, g: 214, b: 255, weight: 0.18 },
  { r: 255, g: 224, b: 178, weight: 0.12 },
];

function pickTint() {
  const roll = Math.random();
  let acc = 0;
  for (const tint of STAR_TINTS) {
    acc += tint.weight;
    if (roll <= acc) return tint;
  }
  return STAR_TINTS[0];
}

function createParticles(durationMs, maxRadius, width, height) {
  const area = width * height;
  const count = Math.round(
    BASE_PARTICLE_COUNT * Math.min(MAX_DENSITY_SCALE, Math.max(1, area / REFERENCE_AREA))
  );
  const particles = [];
  for (let i = 0; i < count; i++) {
    // Most particles join within the first ~55% of the sequence; the rest
    // spawn staggered through the final acceleration window so the field
    // keeps visibly thickening as it speeds up.
    const spawnT =
      Math.random() < 0.65
        ? Math.random() * durationMs * 0.55
        : durationMs * 0.55 + Math.random() * durationMs * 0.4;
    // Speed is derived from the *screen's own radius*, not a fixed pixel
    // rate — a particle should cross from center to edge in roughly the
    // same proportion of time on a phone or a wide desktop monitor.
    const travelMs = 1000 + Math.random() * 800;
    const brightness = 0.45 + Math.random() * 0.55;
    particles.push({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 14,
      baseSpeed: maxRadius / travelMs, // px/ms at 1x, scaled to this screen
      size: 1 + Math.random() * 1.6,
      brightness,
      tint: pickTint(),
      glow: brightness > 0.72, // brightest ~35% get a soft bloom pass
      spark: brightness > 0.82, // brightest ~20% get a bright head dot
      spawnT,
    });
  }
  return particles;
}

function createBackgroundStars(width, height) {
  const stars = [];
  for (let i = 0; i < BG_STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.4 + Math.random() * 1.1,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0015 + Math.random() * 0.0025,
      tint: pickTint(),
    });
  }
  return stars;
}

export default function Starfield({ durationMs }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.lineCap = 'round';

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    let bgStars = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      const maxRadius = Math.hypot(width, height) / 2;
      particles = createParticles(durationMs, maxRadius, width, height);
      bgStars = createBackgroundStars(width, height);
    };
    resize();
    // A resize (e.g. rotating a tablet, or a browser window drag mid-
    // sequence) regenerates the field at the new scale rather than leaving
    // it calibrated to a stale viewport.
    window.addEventListener('resize', resize);

    const accelStart = durationMs - ACCEL_WINDOW_MS;

    let rafId;
    let startTime = null;
    let lastTime = null;

    const frame = (now) => {
      if (startTime === null) startTime = now;
      if (lastTime === null) lastTime = now;
      const dt = now - lastTime;
      lastTime = now;
      const elapsed = now - startTime;

      const cx = width / 2;
      const cy = height / 2;
      const accel =
        elapsed > accelStart
          ? 1 + ((elapsed - accelStart) / ACCEL_WINDOW_MS) * (MAX_ACCEL_MULTIPLIER - 1)
          : 1;
      // Faint background depth stars twinkle throughout, then get swept
      // away by the flash near the very end so they don't linger as a
      // static layer once the destination page is about to show through.
      const bgFade = Math.max(0, 1 - Math.max(0, elapsed - (durationMs - 500)) / 500);

      ctx.clearRect(0, 0, width, height);

      if (bgFade > 0) {
        for (const s of bgStars) {
          const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(elapsed * s.speed + s.phase));
          const a = twinkle * bgFade * 0.8;
          ctx.beginPath();
          ctx.fillStyle = `rgba(${s.tint.r}, ${s.tint.g}, ${s.tint.b}, ${a})`;
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (const p of particles) {
        if (elapsed < p.spawnT) continue;
        const prevRadius = p.radius;
        p.radius += p.baseSpeed * accel * dt;
        const x1 = cx + Math.cos(p.angle) * prevRadius;
        const y1 = cy + Math.sin(p.angle) * prevRadius;
        const x2 = cx + Math.cos(p.angle) * p.radius;
        const y2 = cy + Math.sin(p.angle) * p.radius;
        const fadeIn = Math.min(1, prevRadius / 60);
        const alpha = p.brightness * fadeIn;
        const { r, g, b } = p.tint;

        if (p.glow) {
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.25})`;
          ctx.lineWidth = p.size * 3.2;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = p.size;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        if (p.spark) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(1, alpha * 1.3)})`;
          ctx.arc(x2, y2, p.size * 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (elapsed < durationMs) {
        rafId = requestAnimationFrame(frame);
      }
    };
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [durationMs]);

  return <canvas ref={canvasRef} className="success-starfield" aria-hidden="true" />;
}
