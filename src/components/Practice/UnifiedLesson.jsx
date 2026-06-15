import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, update, get } from 'firebase/database';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { speakWord, shuffleArray } from '../../utils/helpers';
import { calculateNextReview } from '../../utils/sm2';
import './UnifiedLesson.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export default function UnifiedLesson({ lesson, sourceType, sourceId, onComplete }) {
  const { user } = useAuth();
  const { words, id: lessonId } = lesson;

  const [phase, setPhase] = useState('study'); // 'study' | 'quiz' | 'spell' | 'speak' | 'completed'
  const [wordIndex, setWordIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState('playing'); // playing, correct, wrong, listening
  const [heardText, setHeardText] = useState('');
  const [quizOptions, setQuizOptions] = useState([]);
  
  // Scoring
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [isRecognitionSupported] = useState(!!SpeechRecognition);

  const recognitionRef = useRef(null);

  const currentWord = words[wordIndex];

  // Equalizer states
  const [isListening, setIsListening] = useState(false);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => setIsListening(true);
      rec.onend = () => setIsListening(false);
      rec.onerror = (e) => {
        console.error(e.error);
        setIsListening(false);
        setStatus('wrong');
        setHeardText('Mikrofon xatosi yoki ruxsat yo\'q');
      };
      rec.onresult = (e) => {
        const speech = e.results[0][0].transcript;
        setHeardText(speech);
        evaluateSpeak(speech);
      };
      recognitionRef.current = rec;
    }
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  }, [wordIndex, phase]);

  // Phase transitions and initialization
  useEffect(() => {
    setStatus('playing');
    setInputVal('');
    setHeardText('');

    if (!currentWord) return;

    if (phase === 'study') {
      speakWord(currentWord.word);
    } else if (phase === 'quiz') {
      const correct = currentWord.translation;
      const wrong = words
        .filter(w => w.id !== currentWord.id)
        .map(w => w.translation);
      
      while (wrong.length < 3) {
        wrong.push("Boshqa tarjima " + (wrong.length + 1));
      }
      
      const options = shuffleArray([correct, ...wrong.slice(0, 3)]);
      setQuizOptions(options);
    } else if (phase === 'spell') {
      speakWord(currentWord.word);
    }
  }, [phase, wordIndex, currentWord]);

  // Evaluate Quiz answer
  const handleQuizSelect = (selected) => {
    if (status !== 'playing') return;
    const isCorrect = selected === currentWord.translation;
    evaluateAnswer(isCorrect, 4);
  };

  // Evaluate Spelling
  const handleSpellSubmit = (e) => {
    e.preventDefault();
    if (status !== 'playing' || !inputVal.trim()) return;
    const isCorrect = inputVal.toLowerCase().trim() === currentWord.word.toLowerCase().trim();
    evaluateAnswer(isCorrect, 4);
  };

  // Start Voice Recognition
  const handleStartSpeak = () => {
    if (!SpeechRecognition || isListening) return;
    setStatus('listening');
    try {
      recognitionRef.current.start();
    } catch (e) {
      console.error(e);
    }
  };

  // Evaluate spoken text
  const evaluateSpeak = (speech) => {
    const target = currentWord.word.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
    const spoken = speech.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
    const isCorrect = spoken === target;
    evaluateAnswer(isCorrect, 5);
  };

  const evaluateAnswer = async (isCorrect, activeQuality) => {
    if (isCorrect) {
      setStatus('correct');
      setCorrectCount(prev => prev + 1);
      setXpEarned(prev => prev + 10);
    } else {
      setStatus('wrong');
      setIncorrectCount(prev => prev + 1);
    }

    // Update word SM-2
    const quality = isCorrect ? activeQuality : 1;
    const sm2Data = calculateNextReview(
      quality,
      currentWord.easeFactor || 2.5,
      currentWord.interval || 0,
      currentWord.reviewCount || 0
    );
    
    const wordRef = ref(db, `users/${user.uid}/${sourceType}/${sourceId}/words/${currentWord.id}`);
    update(wordRef, sm2Data).catch(err => console.error("Error updating word SM-2:", err));
  };

  const handleNext = () => {
    if (wordIndex < words.length - 1) {
      setWordIndex(prev => prev + 1);
    } else {
      setWordIndex(0);
      if (phase === 'study') {
        setPhase('quiz');
      } else if (phase === 'quiz') {
        setPhase('spell');
      } else if (phase === 'spell') {
        if (isRecognitionSupported) {
          setPhase('speak');
        } else {
          handleLessonComplete();
        }
      } else if (phase === 'speak') {
        handleLessonComplete();
      }
    }
  };

  const handleLessonComplete = async () => {
    setPhase('completed');
    const finalXpEarned = xpEarned + 50;

    if (!user) return;

    try {
      // Mark lesson completed
      const completedRef = ref(db, `users/${user.uid}/${sourceType}/${sourceId}/completedLessons`);
      await update(completedRef, {
        [lessonId]: true
      });

      // Update XP & Streak
      const profileRef = ref(db, `users/${user.uid}/profile`);
      const snap = await get(profileRef);
      if (snap.exists()) {
        const val = snap.val();
        const currentXp = val.xp || 0;
        const currentStreak = val.streak || 0;
        const lastActive = val.lastActiveDate || '';
        
        const todayStr = new Date().toISOString().split('T')[0];
        
        let newStreak = currentStreak;
        if (lastActive !== todayStr) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          if (lastActive === yesterdayStr || lastActive === '') {
            newStreak = currentStreak + 1;
          } else {
            newStreak = 1;
          }
        }

        await update(profileRef, {
          xp: currentXp + finalXpEarned,
          streak: newStreak,
          lastActiveDate: todayStr
        });
      }
    } catch (e) {
      console.error("Error updating gamification profile:", e);
    }
  };

  // Progress calculations
  const getProgress = () => {
    let phaseOffset = 0;
    if (phase === 'quiz') phaseOffset = 1;
    if (phase === 'spell') phaseOffset = 2;
    if (phase === 'speak') phaseOffset = 3;
    if (phase === 'completed') return 100;
    
    const totalPhases = isRecognitionSupported ? 4 : 3;
    return ((phaseOffset * words.length + wordIndex) / (totalPhases * words.length)) * 100;
  };

  if (!currentWord && phase !== 'completed') return null;

  return (
    <div className="unified-lesson-container">
      {/* Progress Bar */}
      <div className="unified-lesson-progress-bar">
        <div className="progress-fill" style={{ width: `${getProgress()}%` }}></div>
      </div>

      <AnimatePresence mode="wait">
        {/* PHASE 1: STUDY */}
        {phase === 'study' && (
          <motion.div
            key="study"
            className="lesson-card study-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="phase-title">📖 Yangi so'zlar bilan tanishamiz</div>
            <div className="study-word-wrapper">
              <div className="study-word">{currentWord.word}</div>
              <button className="btn-speak-large" onClick={() => speakWord(currentWord.word)}>🔊</button>
              <div className="study-translation">{currentWord.translation}</div>
              {currentWord.definition && <p className="study-definition">Def: {currentWord.definition}</p>}
            </div>
            <button className="btn btn-primary" onClick={handleNext}>
              Tushundim →
            </button>
          </motion.div>
        )}

        {/* PHASE 2: QUIZ */}
        {phase === 'quiz' && (
          <motion.div
            key="quiz"
            className="lesson-card quiz-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="phase-title">📝 Variantlardan to'g'ri tarjimani tanlang</div>
            <div className="quiz-target-word">{currentWord.word}</div>
            
            <div className="quiz-options-list">
              {quizOptions.map((opt, idx) => {
                let optClass = "quiz-opt-btn";
                if (status !== 'playing') {
                  if (opt === currentWord.translation) optClass += " correct";
                  else if (status === 'wrong') optClass += " wrong";
                }
                return (
                  <button
                    key={idx}
                    className={optClass}
                    onClick={() => handleQuizSelect(opt)}
                    disabled={status !== 'playing'}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {status !== 'playing' && (
              <button className="btn btn-primary next-step-btn" onClick={handleNext}>
                Davom etish →
              </button>
            )}
          </motion.div>
        )}

        {/* PHASE 3: SPELLING */}
        {phase === 'spell' && (
          <motion.div
            key="spell"
            className="lesson-card spell-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="phase-title">🎧 Ovozli eshitib so'zni yozing</div>
            <button type="button" className="btn-play-dictation animate-pulse" onClick={() => speakWord(currentWord.word)}>🔊</button>
            <div className="spell-hint-translation">Tarjimasi: <strong>{currentWord.translation}</strong></div>

            <form onSubmit={handleSpellSubmit} className="spell-form">
              <input
                type="text"
                className={`spell-input ${status}`}
                placeholder="Inglizcha yozilishi..."
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                disabled={status !== 'playing'}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                autoFocus
              />
              {status === 'playing' ? (
                <button type="submit" className="btn btn-primary" disabled={!inputVal.trim()}>
                  Tekshirish
                </button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={handleNext}>
                  Davom etish →
                </button>
              )}
            </form>

            <div className="spell-feedback">
              {status === 'correct' && <span style={{ color: 'var(--success)' }}>To'g'ri! 🎉 (+10 XP)</span>}
              {status === 'wrong' && <span style={{ color: 'var(--error)' }}>Xato. To'g'ri: {currentWord.word}</span>}
            </div>
          </motion.div>
        )}

        {/* PHASE 4: PRONUNCIATION */}
        {phase === 'speak' && (
          <motion.div
            key="speak"
            className="lesson-card speak-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="phase-title">🎙️ Mikrofonga so'zni talaffuz qiling</div>
            <div className="speak-target-word">{currentWord.word}</div>
            <div className="speak-translation">{currentWord.translation}</div>

            <div className="speak-controls">
              {status === 'playing' && (
                <button 
                  type="button" 
                  className={`speak-mic-btn ${isListening ? 'listening' : ''}`}
                  onClick={handleStartSpeak}
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

              {isListening && <div className="speak-status-text">Tinglamoqda...</div>}
              {!isListening && status === 'playing' && <div className="speak-status-text instruction">Mikrofonni bosib gapiring</div>}

              {status === 'correct' && (
                <div className="speak-result success">
                  <span>🎉</span>
                  <div>Ajoyib talaffuz! (+10 XP)</div>
                </div>
              )}

              {status === 'wrong' && (
                <div className="speak-result error">
                  <span>❌</span>
                  <div>
                    Nomaqbul talaffuz
                    {heardText && <div className="heard-word">Biz eshitdik: "{heardText}"</div>}
                  </div>
                </div>
              )}
            </div>

            {status === 'wrong' && (
              <div className="speak-action-buttons">
                <button className="btn btn-secondary btn-sm" onClick={() => setStatus('playing')}>🔄 Qayta urinish</button>
                <button className="btn btn-ghost btn-sm" onClick={handleNext}>⏩ O'tkazib yuborish</button>
              </div>
            )}

            {status === 'correct' && (
              <button className="btn btn-primary" onClick={handleNext}>Davom etish →</button>
            )}
          </motion.div>
        )}

        {/* RESULTS SCREEN */}
        {phase === 'completed' && (
          <motion.div
            key="completed"
            className="lesson-card results-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="results-celebration">🎉</div>
            <h2>Dars Muvaffaqiyatli Yakunlandi!</h2>
            <p className="subtitle">Siz bugun ajoyib natija ko'rsatdingiz!</p>

            <div className="lesson-awards-grid">
              <div className="award-item xp">
                <div className="award-value">+{xpEarned + 50}</div>
                <div className="award-label">XP to'plandi</div>
              </div>
              <div className="award-item accuracy">
                <div className="award-value">
                  {Math.round((correctCount / (correctCount + incorrectCount || 1)) * 100)}%
                </div>
                <div className="award-label">Aniqlik darajasi</div>
              </div>
            </div>

            <button className="btn btn-primary btn-lg" onClick={onComplete}>
              Yo'lga qaytish →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
