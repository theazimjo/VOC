const TICK_COUNT = 12;
const TICKS = Array.from({ length: TICK_COUNT });

// Native iOS UIActivityIndicatorView-style spinner: 12 radial ticks that
// fade in sequence around the circle, rather than a single rotating ring.
export default function IosSpinner({ size = 28 }) {
  return (
    <div className="ios-spinner-ring" style={{ width: size, height: size }}>
      {TICKS.map((_, i) => (
        <div
          key={i}
          className="ios-spinner-tick-wrap"
          style={{
            transform: `rotate(${i * (360 / TICK_COUNT)}deg)`,
            animationDelay: `${(i / TICK_COUNT - 1).toFixed(3)}s`
          }}
        >
          <div className="ios-spinner-tick" />
        </div>
      ))}
    </div>
  );
}
