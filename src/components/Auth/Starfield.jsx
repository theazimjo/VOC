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
    // same proportion of time on a phone or a wide desktop monitor. A
    // fixed px/ms constant made the burst look anemic on large screens,
    // since the same speed covers far less of the visible area.
    const travelMs = 1000 + Math.random() * 800;
    particles.push({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 14,
      baseSpeed: maxRadius / travelMs, // px/ms at 1x, scaled to this screen
      size: 1 + Math.random() * 1.8,
      brightness: 0.45 + Math.random() * 0.55,
      spawnT,
    });
  }
  return particles;
}

export default function Starfield({ durationMs }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const maxRadius = Math.hypot(width, height) / 2;
      particles = createParticles(durationMs, maxRadius, width, height);
    };
    resize();
    // A resize (e.g. rotating a tablet, or a browser window drag mid-
    // sequence) regenerates particles at the new scale rather than leaving
    // them calibrated to a stale viewport.
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

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (elapsed < p.spawnT) continue;
        const prevRadius = p.radius;
        p.radius += p.baseSpeed * accel * dt;
        const x1 = cx + Math.cos(p.angle) * prevRadius;
        const y1 = cy + Math.sin(p.angle) * prevRadius;
        const x2 = cx + Math.cos(p.angle) * p.radius;
        const y2 = cy + Math.sin(p.angle) * p.radius;
        const fadeIn = Math.min(1, prevRadius / 60);
        ctx.strokeStyle = `rgba(255, 255, 255, ${p.brightness * fadeIn})`;
        ctx.lineWidth = p.size;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
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
