import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { particleConfigs } from './particleConfigs';

export default function ParticleCanvas() {
  const { theme, particlesEnabled, performanceMode, setPerformanceMode } = useTheme();
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const particles = useRef([]);
  const fpsHistory = useRef([]);
  const lastTime = useRef(performance.now());
  const [showAutoDisabledBanner, setShowAutoDisabledBanner] = useState(false);

  useEffect(() => {
    if (!particlesEnabled || performanceMode) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const config = particleConfigs[theme] || particleConfigs.ios;

    // Runes for God of War theme
    const gowRunes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'];

    const initParticles = () => {
      particles.current = [];
      const count = config.count;
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: config.minSize + Math.random() * (config.maxSize - config.minSize),
          vx: config.minSpeedX + Math.random() * (config.maxSpeedX - config.minSpeedX),
          vy: config.minSpeedY + Math.random() * (config.maxSpeedY - config.minSpeedY),
          color: config.colors[Math.floor(Math.random() * config.colors.length)],
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.01 + Math.random() * 0.03,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.005 + Math.random() * 0.015,
          shape: config.type === 'material' ? ['circle', 'square', 'pill'][Math.floor(Math.random() * 3)] : null,
          rune: config.type === 'embers' && Math.random() < 0.2 ? gowRunes[Math.floor(Math.random() * gowRunes.length)] : null,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02
        });
      }
    };

    initParticles();

    const drawHexagon = (c, x, y, size) => {
      c.beginPath();
      for (let side = 0; side < 6; side++) {
        c.lineTo(
          x + size * Math.cos((side * 2 * Math.PI) / 6),
          y + size * Math.sin((side * 2 * Math.PI) / 6)
        );
      }
      c.closePath();
    };

    const drawLeaf = (c, x, y, size, rotation) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.beginPath();
      c.moveTo(0, -size / 2);
      c.quadraticCurveTo(size / 3, -size / 6, 0, size / 2);
      c.quadraticCurveTo(-size / 3, -size / 6, 0, -size / 2);
      c.closePath();
      c.restore();
    };

    const drawRune = (c, x, y, rune, size, color) => {
      c.save();
      c.font = `${size}px monospace`;
      c.fillStyle = color;
      c.shadowBlur = 8;
      c.shadowColor = 'rgba(239, 68, 68, 0.6)';
      c.fillText(rune, x, y);
      c.restore();
    };

    const updateAndDraw = () => {
      // FPS monitoring to prevent performance degradation on low-end devices
      const now = performance.now();
      const delta = now - lastTime.current;
      lastTime.current = now;
      const currentFps = 1000 / delta;
      
      if (currentFps > 0 && currentFps < 120) {
        fpsHistory.current.push(currentFps);
        if (fpsHistory.current.length > 150) {
          fpsHistory.current.shift();
          const averageFps = fpsHistory.current.reduce((a, b) => a + b, 0) / fpsHistory.current.length;
          if (averageFps < 35) {
            console.warn(`Performance drop detected (Avg FPS: ${averageFps.toFixed(1)}). Auto-disabling particle animations.`);
            setPerformanceMode(true);
            setShowAutoDisabledBanner(true);
            setTimeout(() => setShowAutoDisabledBanner(false), 5000);
            return;
          }
        }
      }

      ctx.clearRect(0, 0, width, height);

      particles.current.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        if (config.wind) {
          p.x += config.wind;
        }

        if (config.wobble) {
          p.wobble += p.wobbleSpeed;
          p.x += Math.sin(p.wobble) * 0.4;
        }

        if (config.pulse) {
          p.pulse += p.pulseSpeed;
        }

        p.rotation += p.rotationSpeed;

        // Wrap boundaries
        if (p.x < -p.size * 2) p.x = width + p.size;
        if (p.x > width + p.size * 2) p.x = -p.size;
        if (p.y < -p.size * 2) p.y = height + p.size;
        if (p.y > height + p.size * 2) p.y = -p.size;

        // Draw
        ctx.save();
        
        // Handle blur effect at canvas layer if supported and needed
        if (config.blur && theme === 'ios') {
          ctx.filter = 'blur(40px)';
        } else if (config.blur && theme === 'kingdom-come') {
          ctx.filter = 'blur(2px)';
        } else if (config.blur && theme === 'resident-evil') {
          ctx.filter = 'blur(6px)';
        }

        let sizeMultiplier = 1;
        if (config.pulse) {
          sizeMultiplier = 0.85 + Math.sin(p.pulse) * 0.15;
        }

        const size = p.size * sizeMultiplier;

        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.5;

        switch (config.type) {
          case 'orbs':
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 'material':
            ctx.beginPath();
            if (p.shape === 'square') {
              ctx.rect(p.x - size / 2, p.y - size / 2, size, size);
            } else if (p.shape === 'pill') {
              ctx.roundRect(p.x - size, p.y - size / 2, size * 2, size, size / 2);
            } else {
              ctx.arc(p.x, p.y, size / 2, 0, Math.PI * 2);
            }
            ctx.fill();
            break;

          case 'embers':
            if (p.rune) {
              drawRune(ctx, p.x, p.y, p.rune, size * 1.5, p.color);
            } else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
              ctx.fill();
            }
            break;

          case 'hexagons':
            drawHexagon(ctx, p.x, p.y, size);
            if (config.wireframe) {
              ctx.stroke();
            } else {
              ctx.fill();
            }
            break;

          case 'digital':
            ctx.beginPath();
            ctx.rect(p.x, p.y, p.size, p.size * 12);
            ctx.fill();
            break;

          case 'dust':
            if (p.shape === 'circle') {
              ctx.beginPath();
              ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
              ctx.fill();
            } else {
              drawLeaf(ctx, p.x, p.y, size * 1.5, p.rotation);
              ctx.fill();
            }
            break;

          case 'spores':
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fill();
            // Draw a tiny inner nucleus
            ctx.fillStyle = p.color.replace(/[\d.]+\)$/g, '0.5)');
            ctx.beginPath();
            ctx.arc(p.x, p.y, size / 3, 0, Math.PI * 2);
            ctx.fill();
            break;

          default:
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId.current = requestAnimationFrame(updateAndDraw);
    };

    animationFrameId.current = requestAnimationFrame(updateAndDraw);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [theme, particlesEnabled, performanceMode, setPerformanceMode]);

  if (!particlesEnabled || performanceMode) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
          transition: 'all 0.5s ease'
        }}
      />
      {showAutoDisabledBanner && (
        <div className="perf-disabled-toast">
          ⚠️ Qurilma yuklamasini kamaytirish uchun animatsiyalar avtomatik ravishda o'chirildi.
        </div>
      )}
    </>
  );
}
