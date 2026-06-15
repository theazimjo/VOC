import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { calculateNextReview } from '../../utils/sm2';
import { speakWord } from '../../utils/helpers';
import './PronounceGame.css';

export default function PronounceGame({ words, onComplete, onUpdateWord }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState('playing'); // playing, correct, wrong, unsupported
  const [heardText, setHeardText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [results, setResults] = useState({ correctCount: 0, incorrectCount: 0 });
  const recognitionRef = useRef(null);

  const currentWord = words[currentIndex];

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
    if (status !== 'playing' || isListening) return;
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

    const isCorrect = spoken === target;

    if (isCorrect) {
      setStatus('correct');
      const sm2Data = calculateNextReview(
        5, // Active perfect quality
        currentWord.easeFactor || 2.5, 
        currentWord.interval || 0, 
        currentWord.reviewCount || 0
      );
      await onUpdateWord(currentWord.id, sm2Data);

      const newResults = {
        correctCount: results.correctCount + 1,
        incorrectCount: results.incorrectCount
      };
      setResults(newResults);

      setTimeout(() => {
        advance(newResults);
      }, 1500);
    } else {
      setStatus('wrong');
    }
  };

  const handleSkip = async () => {
    const sm2Data = calculateNextReview(
      1, // Failed
      currentWord.easeFactor || 2.5, 
      currentWord.interval || 0, 
      currentWord.reviewCount || 0
    );
    await onUpdateWord(currentWord.id, sm2Data);

    const newResults = {
      correctCount: results.correctCount,
      incorrectCount: results.incorrectCount + 1
    };
    setResults(newResults);
    advance(newResults);
  };

  const handleRetry = () => {
    setStatus('playing');
    setHeardText('');
    setErrorMsg('');
  };

  const advance = (newResults) => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setStatus('playing');
      setHeardText('');
    } else {
      onComplete({ totalWords: words.length, ...newResults });
    }
  };

  if (!currentWord) return null;

  return (
    <div className="pronounce-container">
      <div className="flashcard-progress">
        <span>{currentIndex + 1}</span> / {words.length}
      </div>

      <motion.div 
        className="pronounce-card"
        animate={status === 'wrong' ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="pronounce-target-word">
          {currentWord.word}
          <button 
            type="button" 
            className="btn-speak-target" 
            onClick={() => speakWord(currentWord.word)}
            title="Talaffuzini eshitish"
          >
            🔊
          </button>
        </div>
        <div className="pronounce-translation">{currentWord.translation}</div>

        {errorMsg && <div className="pronounce-error">{errorMsg}</div>}

        <div className="recognition-state-wrapper">
          {status === 'playing' && (
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
          )}

          {isListening && <div className="listening-status">Eshitmoqdaman... Gapiring</div>}
          {!isListening && status === 'playing' && (
            <div className="listening-status instruction">Tugmani bosing va so'zni inglizcha ayting</div>
          )}

          {status === 'correct' && (
            <div className="pronounce-feedback success">
              <span className="feedback-icon">🎉</span>
              <div>Ajoyib talaffuz!</div>
            </div>
          )}

          {status === 'wrong' && (
            <div className="pronounce-feedback error">
              <span className="feedback-icon">❌</span>
              <div>
                Nomaqbul talaffuz
                {heardText && (
                  <div className="heard-text">
                    Biz eshitdik: <strong>"{heardText}"</strong>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {status === 'wrong' && (
          <div className="pronounce-action-buttons">
            <button type="button" className="btn btn-secondary" onClick={handleRetry}>
              🔄 Qayta urinish
            </button>
            <button type="button" className="btn btn-ghost" onClick={handleSkip}>
              ⏩ O'tkazib yuborish
            </button>
          </div>
        )}

        {status === 'unsupported' && (
          <button type="button" className="btn btn-primary" onClick={handleSkip}>
            Tushunarli, o'tkazib yuborish
          </button>
        )}
      </motion.div>

      {status === 'playing' && (
        <button type="button" className="btn btn-ghost" onClick={handleSkip} disabled={isListening}>
          Bilmadim (O'tkazib yuborish)
        </button>
      )}
    </div>
  );
}
