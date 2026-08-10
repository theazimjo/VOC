import { useEffect, useRef } from 'react';
import Starfield from './Starfield';
import './SuccessTransition.css';

// Total time the animated sequence plays before we call onSequenceDone.
// The final "success-flash" keyframe reaches full opacity exactly at this
// mark, so the cut lands under solid white instead of a visible pop.
export const SUCCESS_TRANSITION_MS = 2400;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function SuccessTransition({ revealing, readyPromise, onSequenceDone }) {
  // Always call the *latest* onSequenceDone without re-running the effect
  // below. Without this, a parent re-render mid-flight (e.g. the auth
  // context updating) would recreate the callback, reset the timer via the
  // effect's cleanup+rerun, and make the total duration inconsistent —
  // exactly the "hozir srazi tugab qolyapti" bug.
  const onSequenceDoneRef = useRef(onSequenceDone);
  onSequenceDoneRef.current = onSequenceDone;

  useEffect(() => {
    // Runs exactly once for the life of this sequence, independent of how
    // many times the parent re-renders — a fixed, predictable duration.
    let cancelled = false;
    Promise.all([delay(SUCCESS_TRANSITION_MS), readyPromise ?? Promise.resolve()]).then(() => {
      if (!cancelled) onSequenceDoneRef.current?.();
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`success-transition ${revealing ? 'success-transition--revealing' : ''}`} aria-hidden="true">
      <div className="success-space" />
      <Starfield durationMs={SUCCESS_TRANSITION_MS} />

      <div className="success-word success-word--welcome">Welcome</div>
      <div className="success-word success-word--back">back</div>

      <div className="success-flash" />
    </div>
  );
}
