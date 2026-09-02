import { useEffect, useRef, useState } from 'react';
import { Eraser, ArrowRight } from 'lucide-react';
import './GreekExerciseShared.css';
import './GreekStepTrace.css';

const SIZE = 260;

function drawGuide(ctx, glyph) {
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = 'rgba(120, 120, 130, 0.22)';
  ctx.font = `700 ${SIZE * 0.66}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(glyph, SIZE / 2, SIZE / 2 + SIZE * 0.03);
}

// Mouse/touch letter tracing — deliberately ungraded (there's no reliable
// way to score handwriting accuracy client-side), a practice-only step like
// the character-tracing exercises in other language apps' non-Latin
// courses: draw over the guide, then move on whenever ready.
export default function GreekStepTrace({ letter, onNext }) {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    drawGuide(ctx, letter.upper);
    setHasDrawn(false);
  }, [letter]);

  const getPoint = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (e) => {
    canvasRef.current.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    lastPointRef.current = getPoint(e);
    setHasDrawn(true);
  };

  const handlePointerMove = (e) => {
    if (!drawingRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    const point = getPoint(e);
    ctx.strokeStyle = 'var(--greek-blue, #0d5eaf)';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPointRef.current = point;
  };

  const handlePointerUp = () => {
    drawingRef.current = false;
  };

  const handleClear = () => {
    drawGuide(canvasRef.current.getContext('2d'), letter.upper);
    setHasDrawn(false);
  };

  return (
    <div className="greek-step-trace">
      <div className="greek-ex-prompt">Harfni sichqoncha bilan chizib ko'ring</div>
      <canvas
        ref={canvasRef}
        className="greek-step-trace-canvas"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
      <div className="greek-step-trace-actions">
        <button className="greek-step-trace-clear" onClick={handleClear} disabled={!hasDrawn}>
          <Eraser size={15} strokeWidth={2.2} /> Tozalash
        </button>
        <button className="greek-step-trace-next" onClick={onNext}>
          Davom etish <ArrowRight size={16} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
