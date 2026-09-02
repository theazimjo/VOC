import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, PenLine } from 'lucide-react';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { speakWord } from '../../utils/helpers';
import { useLanguage } from '../../contexts/LanguageContext';
import './Flashcard.css';

// Short Uzbek labels for each part of speech
const POS_LABELS = {
  noun:          { label: 'ot',        abbr: 'n.' },
  verb:          { label: 'feʼl',   abbr: 'v.' },
  adjective:     { label: 'sifat',     abbr: 'adj.' },
  adverb:        { label: 'ravish',    abbr: 'adv.' },
  preposition:   { label: 'predlog',  abbr: 'prep.' },
  conjunction:   { label: 'bogʼlovchi', abbr: 'conj.' },
  pronoun:       { label: 'olmosh',   abbr: 'pron.' },
  interjection:  { label: 'undov',    abbr: 'int.' },
  phrase:        { label: 'ibora',    abbr: 'phr.' },
  idiom:         { label: 'idiom',    abbr: 'idiom' },
};

function PosBadge({ pos }) {
  if (!pos) return null;
  const info = POS_LABELS[pos] || { label: pos, abbr: pos };
  return (
    <span className="fc-pos-badge" title={info.label}>
      {info.abbr}
    </span>
  );
}

export default function Flashcard({ words, onComplete, onUpdateWord, onAnswer, onProgress, language = 'en-US', isEnglishPack = false }) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState({ correctCount: 0, incorrectCount: 0 });

  const currentWord = words[currentIndex];
  const cardStartRef = useRef(Date.now());
  const revealElapsedRef = useRef(4);
  const isMonolingualCard = isEnglishPack || Boolean(!currentWord?.translation && currentWord?.definition);

  // Report progress
  useEffect(() => {
    if (onProgress && words) {
      onProgress(currentIndex, words.length);
    }
  }, [currentIndex, words, onProgress]);

  // Autoplay pronunciation on card switch
  useEffect(() => {
    if (currentWord) {
      const t = setTimeout(() => speakWord(currentWord.word, language), 350);
      return () => clearTimeout(t);
    }
  }, [currentIndex, currentWord, language]);

  // Reset per-card state when the card changes
  useEffect(() => {
    setIsFlipped(false);
    setAnswered(false);
    cardStartRef.current = Date.now();
    revealElapsedRef.current = 4;
  }, [currentIndex]);

  const handleCardClick = () => {
    if (!isFlipped) revealElapsedRef.current = (Date.now() - cardStartRef.current) / 1000;
    setIsFlipped(prev => !prev);
  };

  const knownWordsRef = useRef([]);
  const reviewWordsRef = useRef([]);

  // Reset per-round state when words list changes
  useEffect(() => {
    knownWordsRef.current = [];
    reviewWordsRef.current = [];
    setCurrentIndex(0);
  }, [words]);

  const handleJudge = useCallback((isCorrect) => {
    if (answered || !currentWord) return;
    setAnswered(true);

    if (isCorrect) {
      knownWordsRef.current.push(currentWord);
    } else {
      reviewWordsRef.current.push(currentWord);
    }

    if (onAnswer) onAnswer(currentWord, isCorrect);

    const confidence = inferConfidenceFromSpeed(revealElapsedRef.current, isCorrect);
    if (onUpdateWord) {
      onUpdateWord(currentWord.id, {
        isCorrect,
        confidence,
        responseTime: revealElapsedRef.current,
        retrievalType: 'passive_recall',
      });
    }

    setResults(prev => {
      const newResults = {
        correctCount: prev.correctCount + (isCorrect ? 1 : 0),
        incorrectCount: prev.incorrectCount + (isCorrect ? 0 : 1)
      };

      if (currentIndex < words.length - 1) {
        setIsFlipped(false);
        setTimeout(() => setCurrentIndex(c => c + 1), 180);
      } else {
        if (onComplete) {
          onComplete({
            totalWords: words.length,
            ...newResults,
            knownWords: knownWordsRef.current,
            reviewWords: reviewWordsRef.current,
          });
        }
      }
      return newResults;
    });
  }, [answered, currentWord, currentIndex, words.length, onAnswer, onUpdateWord, onComplete]);

  // Keyboard navigation on PC: Space/Enter/Arrows to flip; 1 (Don't Know) & 2 (Know) to judge
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (answered) return;

      const key = e.key;
      const code = e.code;

      if (code === 'Space' || key === 'Enter' || key === 'ArrowUp' || key === 'ArrowDown') {
        e.preventDefault();
        if (!isFlipped) {
          revealElapsedRef.current = (Date.now() - cardStartRef.current) / 1000;
        }
        setIsFlipped(prev => !prev);
      } else if (key === '1' || code === 'Digit1' || code === 'Numpad1') {
        e.preventDefault();
        if (!isFlipped) {
          revealElapsedRef.current = (Date.now() - cardStartRef.current) / 1000;
          setIsFlipped(true);
        }
        handleJudge(false);
      } else if (key === '2' || code === 'Digit2' || code === 'Numpad2') {
        e.preventDefault();
        if (!isFlipped) {
          revealElapsedRef.current = (Date.now() - cardStartRef.current) / 1000;
          setIsFlipped(true);
        }
        handleJudge(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, answered, handleJudge]);

  if (!currentWord) return null;

  return (
    <div className="flashcard-container clean-theme">
      <div className="flashcard-progress">
        <span className="flashcard-progress-pill">{currentIndex + 1} / {words.length}</span>
      </div>

      {/* Card scene */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.25 }}
          className="flashcard-scene"
          onClick={handleCardClick}
        >
          <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}>
            {/* Front */}
            <div className="flashcard-face flashcard-front">
              <button
                className="btn-speak-card"
                onClick={e => { e.stopPropagation(); speakWord(currentWord.word, language); }}
                title={t('practice.listen')}
              >
                <Volume2 size={18} strokeWidth={2.2} />
              </button>
              <PosBadge pos={currentWord.partOfSpeech} />
              <div className="flashcard-word">{currentWord.word}</div>
              <div className="flashcard-hint">{t('practice.tapToFlip')}</div>
            </div>

            {/* Back */}
            <div className="flashcard-face flashcard-back">
              <PosBadge pos={currentWord.partOfSpeech} />
              {currentWord.translation && <div className="flashcard-translation">{currentWord.translation}</div>}
              {currentWord.definition && (
                <div className={`flashcard-def ${isMonolingualCard ? 'flashcard-def-large' : ''}`}>{currentWord.definition}</div>
              )}
              {currentWord.example && (
                <div className="flashcard-example">"{currentWord.example}"</div>
              )}
              {currentWord.customSentence && (
                <div className="flashcard-example flashcard-custom-sentence">
                  <PenLine size={13} strokeWidth={2.3} className="fc-custom-sentence-icon" />
                  {currentWord.customSentence}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Judgement buttons — visible only when flipped. Keyboard shortcuts 1 & 2 */}
      <div className={`flashcard-actions ${isFlipped ? '' : 'hidden'}`}>
        <button className="flashcard-rating-btn again" onClick={() => handleJudge(false)} disabled={answered}>
          <span className="rating-label">{t('practice.dontKnow')}</span>
        </button>
        <button className="flashcard-rating-btn easy" onClick={() => handleJudge(true)} disabled={answered}>
          <span className="rating-label">{t('practice.know')}</span>
        </button>
      </div>
    </div>
  );
}
