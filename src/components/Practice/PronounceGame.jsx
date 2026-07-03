import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateNextReview } from '../../utils/sm2';
import { speakWord } from '../../utils/helpers';
import './PronounceGame.css';

export default function PronounceGame({ words, onComplete, onUpdateWord, onAnswer, onProgress }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState('playing'); // playing, correct, wrong, unsupported, skipped
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [heardText, setHeardText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const recognitionRef = useRef(null);

  const currentWord = words[currentIndex];

  // Report progress
  useEffect(() => {
    if (onProgress && words) {
      onProgress(currentIndex, words.length);
    }
  }, [currentIndex, words, onProgress]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMsg("Kechirasiz, ushbu brauzerda nutqni aniqlash qo'llab-quvvatlanmaydi. Google Chrome, Safari yoki MS Edge dan foydalanib ko'ring.");
      setStatus('unsupported');
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      setIsListening(true);
      setHeardText('');
    };

    rec.onend = () => {
      setIsListening(false);
    };

    rec.onerror = (e) => {
      console.error('Speech recognition error:', e.error);
      setIsListening(false);
      if (e.error === 'not-allowed') {
        setErrorMsg("Mikrofonga ruxsat berilmadi. Sozlamalardan mikrofonga ruxsat bering.");
      } else {
        setErrorMsg(`Xatolik yuz berdi: ${e.error}`);
      }
    };

    rec.onresult = (e) => {
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
  }, [currentIndex]);

  const startListening = () => {
    if (answered || isListening || status === 'unsupported') return;
    setErrorMsg('');
    try {
      recognitionRef.current.start();
    } catch (e) {
      console.error(e);
    }
  };

  const checkPronunciation = async (speech) => {
    const target = currentWord.word.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
    const spoken = speech.toLowerCase().replace(/[^a-z0-9]/g, '').trim();

    const correct = spoken === target;

    if (correct) {
      setStatus('correct');
      setAnswered(true);
      setIsCorrect(true);
      setCorrectCount(c => c + 1);
      if (onAnswer) onAnswer(currentWord, true);

      const sm2Data = calculateNextReview(
        5, // Active perfect quality
        currentWord.easeFactor || 2.5, 
        currentWord.interval || 0, 
        currentWord.reviewCount || 0
      );
      await onUpdateWord(currentWord.id, sm2Data);
    } else {
      setStatus('wrong');
      if (onAnswer) onAnswer(currentWord, false);
    }
  };

  const handleSkip = async () => {
    if (answered) return;
    setAnswered(true);
    setIsCorrect(false);
    setStatus('skipped');
    setIncorrectCount(c => c + 1);
    if (onAnswer) onAnswer(currentWord, false);

    const sm2Data = calculateNextReview(
      1, // Failed
      currentWord.easeFactor || 2.5, 
      currentWord.interval || 0, 
      currentWord.reviewCount || 0
    );
    await onUpdateWord(currentWord.id, sm2Data);
  };

  const handleRetry = () => {
    setStatus('playing');
    setHeardText('');
    setErrorMsg('');
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setStatus('playing');
      setHeardText('');
      setErrorMsg('');
      setAnswered(false);
      setIsCorrect(false);
    } else {
      onComplete({
        totalWords: words.length,
        correctCount,
        incorrectCount: status === 'unsupported' ? incorrectCount + 1 : incorrectCount
      });
    }
  };

  const handleUnsupportedSkip = async () => {
    setIncorrectCount(c => c + 1);
    if (onAnswer) onAnswer(currentWord, false);
    const sm2Data = calculateNextReview(
      1, 
      currentWord.easeFactor || 2.5, 
      currentWord.interval || 0, 
      currentWord.reviewCount || 0
    );
    await onUpdateWord(currentWord.id, sm2Data);
    handleNext();
  };

  if (!currentWord) return null;

  const isLast = currentIndex === words.length - 1;

  return (
    <div className="pronounce-container">
      <div className="pronounce-progress-label">
        <span>{currentIndex + 1} / {words.length}</span>
        {status !== 'unsupported' && (
          <button 
            className="btn-pronounce-speak-target" 
            type="button" 
            onClick={() => speakWord(currentWord.word)}
            title="Tinglash"
          >
            🔊 Tinglash
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          className={`pronounce-card ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}`}
          animate={status === 'wrong' ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="pronounce-card-label">Talaffuz qiling (inglizcha)</div>
          <div className="pronounce-target-word">
            {currentWord.word}
          </div>
          <div className="pronounce-translation">{currentWord.translation}</div>
          {currentWord.definition && (
            <div className="pronounce-definition">{currentWord.definition}</div>
          )}

          {errorMsg && <div className="pronounce-error">{errorMsg}</div>}

          <div className="recognition-state-wrapper">
            {!answered && status !== 'unsupported' && (
              <>
                <button 
                  type="button"
                  className={`mic-button ${isListening ? 'listening' : ''}`}
                  onClick={startListening}
                  disabled={isListening}
                >
                  {isListening ? (
                    <div className="equalizer">
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                    </div>
                  ) : (
                    '🎙️'
                  )}
                </button>

                {isListening ? (
                  <div className="listening-status text-pulse">Eshitmoqdaman... Gapiring</div>
                ) : (
                  <div className="listening-status instruction">
                    {status === 'wrong' 
                      ? "Nutqni qayta urinib ko'ring yoki keyingisiga o'ting" 
                      : "Mikrofon tugmasini bosing va gapiring"
                    }
                  </div>
                )}
              </>
            )}

            {/* Banners inside the card for immediate clean feedback */}
            {answered && isCorrect && (
              <div className="pronounce-feedback-banner correct">
                <span className="pf-icon">✨</span> Ajoyib talaffuz!
              </div>
            )}

            {answered && !isCorrect && (
              <div className="pronounce-feedback-banner wrong">
                <span className="pf-icon">❌</span> {status === 'skipped' ? "O'tkazib yuborildi" : "Nomaqbul talaffuz"}
                {heardText && (
                  <div className="heard-text">
                    Biz eshitdik: <strong>"{heardText}"</strong>
                  </div>
                )}
              </div>
            )}

            {status === 'unsupported' && (
              <div className="pronounce-feedback-banner unsupported">
                ℹ️ Nutqni aniqlash ushbu brauzerda qo'llab-quvvatlanmaydi
              </div>
            )}
          </div>

          {/* Action buttons inside the card when incorrect to allow retrying */}
          {!answered && status === 'wrong' && (
            <div className="pronounce-action-buttons">
              <button type="button" className="btn btn-secondary" onClick={handleRetry}>
                🔄 Qayta urinish
              </button>
              <button type="button" className="btn btn-ghost" onClick={handleSkip}>
                ⏩ O'tkazib yuborish
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Action Row */}
      <div className="pronounce-actions">
        {!answered ? (
          status === 'playing' && (
            <button type="button" className="btn btn-ghost" onClick={handleSkip} disabled={isListening}>
              Bilmadim (o'tkazib yuborish)
            </button>
          )
        ) : (
          <button type="button" className="btn-pronounce-next" onClick={handleNext}>
            {isLast ? 'Natijalar →' : 'Keyingisi →'}
          </button>
        )}
        {status === 'unsupported' && (
          <button type="button" className="btn-pronounce-next" onClick={handleUnsupportedSkip}>
            {isLast ? 'Natijalar →' : 'Keyingisi →'}
          </button>
        )}
      </div>
    </div>
  );
}
