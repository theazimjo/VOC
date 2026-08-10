import { createContext, useCallback, useContext, useRef, useState } from 'react';
import SuccessTransition from '../components/Auth/SuccessTransition';

const SuccessTransitionCtx = createContext(null);

// How long the (by then fully opaque) cover stays up after navigate() fires
// before it fades away. lazyWithRetry wraps every route in an async
// factory, so React.lazy always suspends for at least one microtask on
// first render of a route — even when the chunk is already cached — which
// is exactly the flash this buffer exists to hide instead of racing.
const REVEAL_FADE_MS = 220;

export function SuccessTransitionProvider({ children }) {
  const [stage, setStage] = useState('idle'); // 'idle' | 'running' | 'revealing'
  const pendingRef = useRef(null);

  // onFinished: called once the animated sequence (and route prefetch) is
  // done — this is where the caller should actually navigate().
  // readyPromise: optional promise the sequence waits on alongside its own
  // fixed duration, so the destination is guaranteed loaded before we cut.
  const start = useCallback((onFinished, readyPromise) => {
    pendingRef.current = { onFinished, readyPromise };
    setStage('running');
  }, []);

  const handleSequenceDone = useCallback(() => {
    pendingRef.current?.onFinished?.();
    pendingRef.current = null;
    setStage('revealing');
    setTimeout(() => setStage('idle'), REVEAL_FADE_MS);
  }, []);

  return (
    <SuccessTransitionCtx.Provider value={{ start }}>
      {children}
      {stage !== 'idle' && (
        <SuccessTransition
          revealing={stage === 'revealing'}
          readyPromise={pendingRef.current?.readyPromise}
          onSequenceDone={handleSequenceDone}
        />
      )}
    </SuccessTransitionCtx.Provider>
  );
}

export function useSuccessTransition() {
  const ctx = useContext(SuccessTransitionCtx);
  if (!ctx) {
    throw new Error('useSuccessTransition must be used within a SuccessTransitionProvider');
  }
  return ctx;
}
