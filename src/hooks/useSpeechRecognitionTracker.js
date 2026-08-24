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
  }, []);

  const handleSpeechResult = useCallback((event) => {
    if (!pageWords || pageWords.length === 0) return;
    setIsListening(true);

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

  const startListening = useCallback(() => {
    if (!isSupported || !SpeechRecognitionAPI) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    enabledRef.current = true;
    setIsListening(true);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }

    sessionStartPIdxRef.current = highestPIdxRef.current;

    try {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = langCode || 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event) => {
        handleSpeechResult(event);
      };

      recognition.onerror = (event) => {
        if (event.error === 'no-speech' || event.error === 'aborted') return;
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setError('Microphone access was denied.');
          setIsListening(false);
          enabledRef.current = false;
        } else {
          setError(`Speech error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        if (enabledRef.current) {
          sessionStartPIdxRef.current = highestPIdxRef.current;
          if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
          restartTimerRef.current = setTimeout(() => {
            if (!enabledRef.current) return;
            try {
              recognition.start();
              setIsListening(true);
            } catch (err) {
              if (err.name === 'InvalidStateError') {
                setIsListening(true);
              } else {
                console.warn('Speech restart error:', err);
                setIsListening(false);
              }
            }
          }, 50);
        } else {
          setIsListening(false);
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setError('Could not access microphone.');
      setIsListening(false);
    }
  }, [isSupported, SpeechRecognitionAPI, langCode, handleSpeechResult]);

  const stopListening = useCallback(() => {
    enabledRef.current = false;
    if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

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
