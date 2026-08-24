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
  // If words are long (>=4 chars) and match stem or 1 char diff
  if (c1.length >= 4 && c2.length >= 4) {
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
  const currentIndexRef = useRef(0);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  // Sync ref with state
  useEffect(() => {
    currentIndexRef.current = activeWordIndex >= 0 ? activeWordIndex : 0;
  }, [activeWordIndex]);

  const resetTracker = useCallback(() => {
    setActiveWordIndex(-1);
    setPassedWordIndices(new Set());
    currentIndexRef.current = 0;
    setWpm(0);
    setTranscript('');
    startTimeRef.current = null;
  }, []);

  const handleSpeechResult = useCallback((event) => {
    let currentTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      currentTranscript += event.results[i][0].transcript + ' ';
    }

    const trimmed = currentTranscript.trim();
    if (!trimmed) return;
    setTranscript(trimmed);

    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }

    const spokenTokens = trimmed.split(/\s+/).map(cleanWord).filter(Boolean);
    if (spokenTokens.length === 0 || pageWords.length === 0) return;

    let targetIdx = currentIndexRef.current;
    if (targetIdx < 0) targetIdx = 0;

    let updatedTarget = targetIdx;
    let matchedAny = false;

    // Process spoken tokens sequentially from current target position
    for (const spoken of spokenTokens) {
      if (!spoken) continue;
      if (updatedTarget >= pageWords.length) break;

      // Check current word at updatedTarget, or next word at updatedTarget + 1 (allowing max 1 word skip)
      if (wordsMatch(spoken, pageWords[updatedTarget])) {
        updatedTarget++;
        matchedAny = true;
      } else if (updatedTarget + 1 < pageWords.length && wordsMatch(spoken, pageWords[updatedTarget + 1])) {
        updatedTarget += 2;
        matchedAny = true;
      }
    }

    if (matchedAny && updatedTarget !== targetIdx) {
      const activeIdx = Math.min(updatedTarget - 1, pageWords.length - 1);
      setActiveWordIndex(activeIdx);
      currentIndexRef.current = updatedTarget;

      setPassedWordIndices(prev => {
        const next = new Set(prev);
        for (let i = 0; i < updatedTarget; i++) {
          next.add(i);
        }
        return next;
      });

      // Calculate WPM
      const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000;
      if (elapsedMinutes > 0.05) {
        const calculatedWpm = Math.round(updatedTarget / elapsedMinutes);
        setWpm(calculatedWpm);
      }
    }
  }, [pageWords]);

  const startListening = useCallback(() => {
    if (!isSupported || !SpeechRecognitionAPI) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }

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
        } else {
          setError(`Speech error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        if (enabledRef.current) {
          // Restart automatically if browser stops continuous recognition while Speak mode is active
          try {
            recognition.start();
          } catch {
            setIsListening(false);
          }
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
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Reset & Auto-restart when pageWords or enabled state changes
  useEffect(() => {
    resetTracker();
    if (enabled) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
        recognitionRef.current = null;
      }
      startListening();
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
        recognitionRef.current = null;
      }
      setIsListening(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, [pageWords, enabled, resetTracker, startListening]);

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
