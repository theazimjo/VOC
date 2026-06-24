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
          shape: config.type === 'material' ? ['circle', 'square', 'pill'][Math.floor(Math.random() * 3)] : null
        });
      }
    };

    initParticles();

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
        }

        ctx.fillStyle = p.color;

        switch (config.type) {
          case 'orbs':
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 'material':
            ctx.beginPath();
            if (p.shape === 'square') {
              ctx.rect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
            } else if (p.shape === 'pill') {
              ctx.roundRect(p.x - p.size, p.y - p.size / 2, p.size * 2, p.size, p.size / 2);
            } else {
              ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
            }
            ctx.fill();
            break;

          default:
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
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
