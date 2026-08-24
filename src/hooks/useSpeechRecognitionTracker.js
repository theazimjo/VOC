import { useState, useEffect, useRef, useCallback } from 'react';

function cleanWord(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9']/g, '').trim();
}

function wordsMatch(w1, w2) {
  const c1 = cleanWord(w1);
  const c2 = cleanWord(w2);
  if (!c1 || !c2) return false;
  if (c1 === c2) return true;

  // Simple English suffix normalization (e.g. roots -> root, growing -> grow, cells -> cell)
  const stem1 = c1.replace(/(ing|ed|es|s)$/, '');
  const stem2 = c2.replace(/(ing|ed|es|s)$/, '');
  if (stem1 && stem2 && (stem1 === stem2 || stem1 === c2 || c1 === stem2)) {
    return true;
  }

  // Prefix match ONLY for long words (>= 5 chars) with minimal length difference (<= 2 chars)
  if (c1.length >= 5 && c2.length >= 5 && Math.abs(c1.length - c2.length) <= 2) {
    if (c1.startsWith(c2) || c2.startsWith(c1)) return true;
  }
  return false;
}

export function useSpeechRecognitionTracker({ pageWords = [], langCode = 'en-US', enabled = false }) {
  const SpeechRecognitionAPI = typeof window !== 'undefined'
    ? (window.SpeechRecognition || window.webkitSpeechRecognition)
    : null;

  const isSupported = Boolean(SpeechRecognitionAPI);

  const [isListening, setIsListening] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [passedWordIndices, setPassedWordIndices] = useState(() => new Set());
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [wpm, setWpm] = useState(0);

  const recognitionRef = useRef(null);
  const startTimeRef = useRef(null);
  const sessionStartPIdxRef = useRef(0);
  const highestPIdxRef = useRef(0);
  const enabledRef = useRef(enabled);
  const restartTimerRef = useRef(null);
  const isNoSpeechRef = useRef(false);
  const hasFatalErrorRef = useRef(false);
  const consecutiveRestartsRef = useRef(0);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  const resetTracker = useCallback(() => {
    setActiveWordIndex(-1);
    setPassedWordIndices(new Set());
    sessionStartPIdxRef.current = 0;
    highestPIdxRef.current = 0;
    setWpm(0);
    setTranscript('');
    startTimeRef.current = null;
    consecutiveRestartsRef.current = 0;
  }, []);

  const handleSpeechResult = useCallback((event) => {
    if (!pageWords || pageWords.length === 0) return;
    setIsListening(true);
    consecutiveRestartsRef.current = 0;

    let fullSessionTranscript = '';
    for (let i = 0; i < event.results.length; i++) {
      fullSessionTranscript += event.results[i][0].transcript + ' ';
    }

    const trimmed = fullSessionTranscript.trim();
    if (!trimmed) return;
    setTranscript(trimmed);

    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }

    const spokenTokens = trimmed.split(/\s+/).map(cleanWord).filter(Boolean);
    if (spokenTokens.length === 0) return;

    // Align spokenTokens sequentially with pageWords starting from sessionStartPIdxRef
    let pIdx = sessionStartPIdxRef.current;

    for (const spoken of spokenTokens) {
      if (pIdx >= pageWords.length) break;

      if (wordsMatch(spoken, pageWords[pIdx])) {
        pIdx++;
      } else if (pIdx + 1 < pageWords.length && wordsMatch(spoken, pageWords[pIdx + 1])) {
        pIdx += 2;
      }
    }

    if (pIdx > highestPIdxRef.current) {
      highestPIdxRef.current = pIdx;
      const newActiveIdx = Math.min(pIdx - 1, pageWords.length - 1);
      setActiveWordIndex(newActiveIdx);

      setPassedWordIndices(prev => {
        const next = new Set(prev);
        for (let i = 0; i < pIdx; i++) {
          next.add(i);
        }
        return next;
      });

      const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000;
      if (elapsedMinutes > 0.05) {
        const calculatedWpm = Math.round(pIdx / elapsedMinutes);
        setWpm(calculatedWpm);
      }
    }
  }, [pageWords]);

  const stopListening = useCallback(() => {
    enabledRef.current = false;
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported || !SpeechRecognitionAPI) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    enabledRef.current = true;
    hasFatalErrorRef.current = false;
    consecutiveRestartsRef.current = 0;
    setIsListening(true);
    setError(null);

    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      recognitionRef.current = null;
    }

    sessionStartPIdxRef.current = highestPIdxRef.current;

    const createAndStart = () => {
      if (!enabledRef.current || hasFatalErrorRef.current) return;

      try {
        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = langCode || 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setError(null);
          isNoSpeechRef.current = false;
        };

        recognition.onresult = (event) => {
          isNoSpeechRef.current = false;
          handleSpeechResult(event);
        };

        recognition.onerror = (event) => {
          if (event.error === 'no-speech') {
            isNoSpeechRef.current = true;
            return;
          }
          if (event.error === 'aborted') return;

          console.warn('Speech recognition error:', event.error);
          hasFatalErrorRef.current = true;
          enabledRef.current = false;
          setIsListening(false);

          if (event.error === 'not-allowed') {
            setError('Microphone access was denied. Please allow mic access in your browser.');
          } else if (event.error === 'network') {
            setError('Speech network error. Please check your internet connection.');
          } else {
            setError(`Speech error: ${event.error}`);
          }
        };

        recognition.onend = () => {
          recognitionRef.current = null;

          if (enabledRef.current && !hasFatalErrorRef.current) {
            sessionStartPIdxRef.current = highestPIdxRef.current;
            consecutiveRestartsRef.current += 1;

            if (consecutiveRestartsRef.current > 3) {
              console.log('Max consecutive speech restarts reached.');
              enabledRef.current = false;
              setIsListening(false);
              return;
            }

            if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
            const delay = isNoSpeechRef.current ? 800 : 300;
            restartTimerRef.current = setTimeout(() => {
              createAndStart();
            }, delay);
          } else {
            setIsListening(false);
          }
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch (err) {
        console.error('Failed to create/start speech recognition:', err);
        hasFatalErrorRef.current = true;
        enabledRef.current = false;
        setIsListening(false);
        setError('Could not access microphone.');
      }
    };

    createAndStart();
  }, [isSupported, SpeechRecognitionAPI, langCode, handleSpeechResult]);

  const toggleListening = useCallback(() => {
    if (enabledRef.current || isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  useEffect(() => {
    resetTracker();
    if (enabled) {
      startListening();
    } else {
      stopListening();
    }

    return () => {
      stopListening();
    };
  }, [pageWords, enabled, resetTracker, startListening, stopListening]);

  const totalWords = pageWords.length;
  const accuracy = totalWords > 0 ? Math.round((passedWordIndices.size / totalWords) * 100) : 0;

  return {
    isSupported,
    isListening,
    activeWordIndex,
    passedWordIndices,
    transcript,
    error,
    wpm,
    accuracy,
    totalWords,
    startListening,
    stopListening,
    toggleListening,
    resetTracker,
    setActiveWordIndex
  };
}
