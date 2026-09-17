import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Mic, RotateCcw, Check, X, AlertCircle } from 'lucide-react';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { speakWord } from '../../utils/helpers';
import { playSound, triggerVibration } from '../../utils/feedback';
import { useLanguage } from '../../contexts/LanguageContext';
import { useKeyboardInset } from '../../hooks/useKeyboardInset';
import PracticeQuitModal from './PracticeQuitModal';
import './PronounceGame.css';

const MAX_ATTEMPTS = 3;

function cleanString(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/gi, '')
    .trim();
}

function getLevenshteinDistance(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

function isPronunciationMatch(targetRaw, spokenRaw) {
  const target = cleanString(targetRaw);
  const spoken = cleanString(spokenRaw);

  if (!target || !spoken) return false;
  if (target === spoken) return true;

  // Web Speech API already converts speech audio to text.
  // If text differs for single words or short phrases (<= 12 chars),
  // the user pronounced a different word (e.g., "bed" vs "bad", "walk" vs "work").
  // Enforce EXACT match for words and short phrases:
  if (target.length <= 12) {
    return false;
  }

  // For longer multi-word sentences (> 12 chars), allow max 1 char difference if similarity >= 0.92
  const distance = getLevenshteinDistance(target, spoken);
  const maxLen = Math.max(target.length, spoken.length);
  const similarity = 1 - distance / maxLen;

  return distance <= 1 && similarity >= 0.92;
}

export default function PronounceGame({
  words,
  onComplete,
  onUpdateWord,
  onAnswer,
  onProgress,
  onExit,
  language = 'en-US',
}) {
  const { t } = useLanguage();
  const keyboardInset = useKeyboardInset();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isTtsSpeaking, setIsTtsSpeaking] = useState(false);
  const [status, setStatus] = useState('playing'); // playing, correct, wrong, unsupported, skipped
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [heardText, setHeardText] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showQuitModal, setShowQuitModal] = useState(false);

  const recognitionRef = useRef(null);
  const cardStartRef = useRef(Date.now());
  const answeredRef = useRef(false);
  const spokenIndexRef = useRef(-1);
  const isTtsSpeakingRef = useRef(false);
  const attemptsRef = useRef(0);

  const currentWord = words[currentIndex];

  useEffect(() => {
    answeredRef.current = false;
    attemptsRef.current = 0;
    setAttempts(0);
    setHeardText('');
    setErrorMsg('');
    setAnswered(false);
    setIsCorrect(false);
    setStatus('playing');
  }, [currentIndex]);

  // Safely play TTS audio without feeding into speech recognition
  const playTts = useCallback(() => {
    if (!currentWord) return;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
      setIsListening(false);
    }
    isTtsSpeakingRef.current = true;
    setIsTtsSpeaking(true);

    speakWord(currentWord.word, language, () => {
      // 500ms safety buffer after TTS finishes so speaker audio echo completely subsides
      setTimeout(() => {
        isTtsSpeakingRef.current = false;
        setIsTtsSpeaking(false);
      }, 500);
    });
  }, [currentWord, language]);

  // Report progress
  useEffect(() => {
    if (onProgress && words) {
      onProgress(currentIndex, words.length);
    }
  }, [currentIndex, words, onProgress]);

  // Autoplay pronunciation on question start (ONCE per currentIndex)
  useEffect(() => {
    if (currentWord && spokenIndexRef.current !== currentIndex) {
      spokenIndexRef.current = currentIndex;
      playTts();
    }
  }, [currentIndex, currentWord, playTts]);

  // Setup SpeechRecognition
  useEffect(() => {
    cardStartRef.current = Date.now();
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMsg(t('practice.notSupported') || "Speech recognition is not supported in this browser.");
      setStatus('unsupported');
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = language;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      setIsListening(true);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    rec.onerror = (e) => {
      console.error('Speech recognition error:', e.error);
      setIsListening(false);
      // Ignore harmless operational events like 'aborted' or 'no-speech'
      if (e.error === 'aborted' || e.error === 'no-speech') {
        return;
      }
      if (e.error === 'not-allowed') {
        setErrorMsg("Microphone permission denied. Please allow microphone access.");
      } else {
        setErrorMsg(`Error: ${e.error}`);
      }
    };

    rec.onresult = (e) => {
      // Ignore transcripts caught while TTS voice is speaking or during echo buffer
      if (isTtsSpeakingRef.current) return;
      const transcript = e.results[0][0].transcript;
      setHeardText(transcript);
      checkPronunciation(transcript);
    };

    recognitionRef.current = rec;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [currentIndex, language]);

  const startListening = () => {
    if (answeredRef.current || isListening || status === 'unsupported') return;
    setErrorMsg('');
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    isTtsSpeakingRef.current = false;
    setIsTtsSpeaking(false);
    try {
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const checkPronunciation = useCallback((speech) => {
    if (answeredRef.current) return;

    const responseTime = (Date.now() - cardStartRef.current) / 1000;
    const correct = isPronunciationMatch(currentWord.word, speech);

    if (correct) {
      answeredRef.current = true;
      setStatus('correct');
      setAnswered(true);
      setIsCorrect(true);
      setCorrectCount(c => c + 1);
      playSound('correct');
      triggerVibration('correct');
      if (onAnswer) onAnswer(currentWord, true);

      onUpdateWord(currentWord.id, {
        isCorrect: true,
        confidence: inferConfidenceFromSpeed(responseTime, true),
        responseTime,
        retrievalType: 'active_recall',
        mode: 'pronounce',
      });
    } else {
      const nextAttempts = attemptsRef.current + 1;
      attemptsRef.current = nextAttempts;
      setAttempts(nextAttempts);

      if (nextAttempts < MAX_ATTEMPTS) {
        // Soft fail for attempt 1 and 2: allow retry without marking final wrong
        triggerVibration('wrong');
      } else {
        // Failed all 3 attempts: final wrong answer
        answeredRef.current = true;
        setStatus('wrong');
        setAnswered(true);
        setIsCorrect(false);
        setIncorrectCount(c => c + 1);
        playSound('wrong');
        triggerVibration('wrong');
        if (onAnswer) onAnswer(currentWord, false);

        onUpdateWord(currentWord.id, {
          isCorrect: false,
          confidence: inferConfidenceFromSpeed(responseTime, false),
          responseTime,
          retrievalType: 'active_recall',
          mode: 'pronounce',
        });
      }
    }
  }, [currentWord, onAnswer, onUpdateWord]);

  const handleSkip = useCallback(() => {
    if (answeredRef.current) return;
    answeredRef.current = true;

    const responseTime = (Date.now() - cardStartRef.current) / 1000;
    setAnswered(true);
    setIsCorrect(false);
    setStatus('skipped');
    setIncorrectCount(c => c + 1);
    playSound('wrong');
    triggerVibration('wrong');
    if (onAnswer) onAnswer(currentWord, false);

    onUpdateWord(currentWord.id, {
      isCorrect: false,
      confidence: inferConfidenceFromSpeed(responseTime, false),
      responseTime,
      retrievalType: 'active_recall',
      mode: 'pronounce',
    });
  }, [currentWord, onAnswer, onUpdateWord]);

  const handleRetry = () => {
    answeredRef.current = false;
    attemptsRef.current = 0;
    setAttempts(0);
    setStatus('playing');
    setAnswered(false);
    setIsCorrect(false);
    setHeardText('');
    setErrorMsg('');
  };

  const handleNext = useCallback(() => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete({
        totalWords: words.length,
        correctCount,
        incorrectCount: status === 'unsupported' ? incorrectCount + 1 : incorrectCount
      });
    }
  }, [currentIndex, words.length, correctCount, incorrectCount, status, onComplete]);

  // Auto advance on correct answer after brief delay
  useEffect(() => {
    if (answered && isCorrect) {
      const timer = setTimeout(() => {
        handleNext();
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [answered, isCorrect, handleNext]);

  // Handle Enter key to advance when answered
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        if (answered || status === 'unsupported') {
          handleNext();
        } else if (!isListening) {
          startListening();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answered, status, isListening, handleNext]);

  if (!currentWord) return null;

  const isLast = currentIndex === words.length - 1;
  const progressPct = ((currentIndex + 1) / words.length) * 100;

  return (
    <div className="duo-spelling-page duo-pronounce-page">
      {/* Top Bar Header (Duolingo Style: X button + Capsule Progress Bar + Score Badges) */}
      <header className="duo-top-header">
        <button
          type="button"
          className="duo-close-btn"
          onClick={() => setShowQuitModal(true)}
          title={t('practice.closePractice') || "Close practice"}
        >
          <X size={24} strokeWidth={2.8} />
        </button>

        <div className="duo-progress-track">
          <motion.div
            className="duo-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>

        {/* Tally Badges */}
        <div className="duo-speed-badges-row">
          <div className="duo-speed-tally tally-correct">
            <Check size={14} strokeWidth={3} />
            <span>{correctCount}</span>
          </div>
          <div className="duo-speed-tally tally-wrong">
            <X size={14} strokeWidth={3} />
            <span>{incorrectCount}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="duo-spelling-body duo-pronounce-body">
        <h2 className="duo-prompt-title">
          {t('practice.pronounceTitle') || "Speak this word"}
        </h2>

        {/* Target Word Card */}
        <div className="duo-prompt-card duo-pronounce-prompt-card">
          <button
            type="button"
            className={`duo-prompt-content ${isTtsSpeaking ? 'is-speaking' : ''}`}
            onClick={playTts}
            title={t('practice.clickToListen') || "Click to listen"}
          >
            <Volume2 size={24} strokeWidth={2.5} className={`duo-speaker-icon ${isTtsSpeaking ? 'text-pulse' : ''}`} />
            <span className="duo-prompt-text">{currentWord.word}</span>
          </button>
          <div className="duo-pronounce-translation">{currentWord.translation}</div>
        </div>

        {errorMsg && <div className="pronounce-error">{errorMsg}</div>}

        {/* Mic & Equalizer Section */}
        <div className="recognition-state-wrapper">
          {status !== 'unsupported' && (
            <>
              <motion.button
                type="button"
                className={`duo-mic-button ${isListening ? 'listening' : ''} ${answered ? 'disabled' : ''}`}
                onClick={startListening}
                disabled={isListening || answered}
                whileHover={!answered && !isListening ? { scale: 1.06 } : {}}
                whileTap={!answered && !isListening ? { scale: 0.94 } : {}}
              >
                {isListening ? (
                  <div className="equalizer">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </div>
                ) : (
                  <Mic size={36} strokeWidth={2.5} />
                )}
              </motion.button>

              {isListening ? (
                <div className="listening-status text-pulse">
                  {t('practice.listening') || "Listening... Speak now"}
                </div>
              ) : !answered ? (
                attempts > 0 ? (
                  <div className="listening-status duo-attempt-hint">
                    <AlertCircle size={16} strokeWidth={2.2} />
                    <span>
                      {t('practice.tryAgainAttempt', { current: attempts, max: MAX_ATTEMPTS, text: heardText }) ||
                        `${attempts}/${MAX_ATTEMPTS}-urinish · Eshitildi: "${heardText}". Qayta urinib ko'ring!`}
                    </span>
                  </div>
                ) : (
                  <div className="listening-status instruction">
                    {t('practice.tapMic') || "Tap the microphone and speak"}
                  </div>
                )
              ) : null}
            </>
          )}

          {status === 'unsupported' && (
            <div className="pronounce-feedback-banner unsupported">
              {t('practice.notSupported') || "Speech recognition is not supported in this browser"}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Full-Width Bottom Bar & Feedback Drawer */}
      <footer
        className={`duo-bottom-bar ${
          answered ? (isCorrect ? 'drawer-correct' : 'drawer-wrong') : ''
        }`}
        style={keyboardInset > 0 ? { transform: `translateY(-${keyboardInset}px)` } : undefined}
      >
        <div className="duo-bottom-bar-content">
          {!answered ? (
            <button
              type="button"
              className="duo-btn duo-btn-skip"
              onClick={handleSkip}
              disabled={isListening}
            >
              {t('practice.skip')?.toUpperCase() || 'SKIP'}
            </button>
          ) : (
            <div className="duo-feedback-container">
              <div className="duo-feedback-info">
                <div className={`duo-feedback-icon-circle ${isCorrect ? 'icon-correct' : 'icon-wrong'}`}>
                  {isCorrect ? <Check size={26} strokeWidth={3.5} /> : <X size={26} strokeWidth={3.5} />}
                </div>
                <div className="duo-feedback-text-group">
                  <h3 className={`duo-feedback-heading ${isCorrect ? 'text-correct' : 'text-wrong'}`}>
                    {isCorrect
                      ? (t('practice.greatPronunciation') || 'Great pronunciation!')
                      : (status === 'skipped' ? (t('practice.skipped') || 'Skipped') : (t('practice.incorrectPronunciation') || 'Incorrect pronunciation'))}
                  </h3>
                  {heardText && (
                    <div className="duo-feedback-answer-line">
                      <span className="heard-label">{t('practice.weHeard', { text: heardText }) || `We heard: "${heardText}"`}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="duo-feedback-actions-row">
                {!isCorrect && status !== 'skipped' && (
                  <button
                    type="button"
                    className="duo-btn-retry-icon"
                    onClick={handleRetry}
                    title={t('practice.tryAgain') || "Try again"}
                  >
                    <RotateCcw size={20} strokeWidth={2.5} />
                  </button>
                )}
                <button
                  type="button"
                  className={`duo-btn duo-btn-continue ${isCorrect ? 'btn-correct' : 'btn-wrong'}`}
                  onClick={handleNext}
                >
                  {isLast ? (t('practice.resultsBtn')?.toUpperCase() || 'RESULTS') : (t('practice.continueBtn')?.toUpperCase() || 'CONTINUE')}
                </button>
              </div>
            </div>
          )}
        </div>
      </footer>

      {/* Quit Confirmation Modal */}
      <PracticeQuitModal
        isOpen={showQuitModal}
        onClose={() => setShowQuitModal(false)}
        onConfirm={() => {
          setShowQuitModal(false);
          if (onExit) onExit(true);
        }}
      />
    </div>
  );
}



