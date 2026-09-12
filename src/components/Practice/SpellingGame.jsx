import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Check, X } from 'lucide-react';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { speakWord, shuffleArray } from '../../utils/helpers';
import { findConfusableMatch } from '../../experiment/textSimilarity';
import { recordConfusionPair } from '../../experiment/experimentDB';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useKeyboardInset } from '../../hooks/useKeyboardInset';
import './SpellingGame.css';

const CONFUSION_THRESHOLD = 0.6;

function getWordVariants(rawWord) {
  if (!rawWord) return [];
  const parts = rawWord.split(/[/;,]/).map(p => p.trim()).filter(Boolean);
  return parts.length > 0 ? parts : [rawWord.trim()];
}

export default function SpellingGame({ words, allWords, onComplete, onUpdateWord, onAnswer, onProgress, language = 'en-US', isEnglishPack = false }) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const keyboardInset = useKeyboardInset();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answeredWord, setAnsweredWord] = useState('');
  const [scrambledList, setScrambledList] = useState([]);
  const [usedTileIndices, setUsedTileIndices] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const inputRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  // Flatten words with multiple variants into separate sequential cards
  const processedWords = useMemo(() => {
    if (!words || !Array.isArray(words)) return [];
    const list = [];
    words.forEach((w) => {
      const variants = getWordVariants(w.word);
      if (variants.length > 1) {
        variants.forEach((v, idx) => {
          list.push({
            ...w,
            variantIndex: idx,
            totalVariants: variants.length,
            targetSpelling: v,
            originalWord: w.word,
          });
        });
      } else {
        list.push({
          ...w,
          variantIndex: 0,
          totalVariants: 1,
          targetSpelling: (w.word || '').trim(),
          originalWord: w.word,
        });
      }
    });
    return list;
  }, [words]);

  const currentWord = processedWords[currentIndex];

  // Report progress
  useEffect(() => {
    if (onProgress && processedWords) {
      onProgress(currentIndex, processedWords.length);
    }
  }, [currentIndex, processedWords, onProgress]);

  useEffect(() => {
    if (!currentWord) return;
    const targetText = currentWord.targetSpelling;
    setScrambledList(shuffleArray(targetText.split('')));
    setInput('');
    setUsedTileIndices([]);
    setAnswered(false);
    setIsCorrect(false);
    setAnsweredWord('');
    startTimeRef.current = Date.now();
  }, [currentIndex, currentWord]);

  // Handle Enter keypress for both submitting answer and advancing to next word
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (!answered) {
          if (input.trim()) {
            e.preventDefault();
            submitAnswer();
          }
        } else {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answered, input, currentIndex, processedWords]);

  const getLangAdjective = (langCode) => {
    if (!langCode) return 'English';
    const prefix = langCode.toLowerCase().slice(0, 2);
    switch (prefix) {
      case 'de': return 'German';
      case 'ko': return 'Korean';
      case 'ru': return 'Russian';
      case 'fr': return 'French';
      case 'es': return 'Spanish';
      case 'tr': return 'Turkish';
      case 'it': return 'Italian';
      case 'pt': return 'Portuguese';
      case 'ar': return 'Arabic';
      case 'zh': return 'Chinese';
      case 'ja': return 'Japanese';
      case 'uz': return 'Uzbek';
      default: return 'English';
    }
  };

  const normalizeForComparison = (str) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/ß/g, 'ss')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const submitAnswer = async (overrideWord) => {
    if (answered) return;
    const submittedInput = overrideWord ?? input;
    if (!submittedInput.trim()) return;

    const responseTime = (Date.now() - startTimeRef.current) / 1000;
    const cleanSubmitted = submittedInput.toLowerCase().trim().replace(/\s+/g, ' ');
    const normSubmitted = normalizeForComparison(cleanSubmitted);

    const cleanTarget = currentWord.targetSpelling.toLowerCase().trim().replace(/\s+/g, ' ');
    const normTarget = normalizeForComparison(cleanTarget);

    const fullTargetClean = (currentWord.originalWord || '').toLowerCase().trim().replace(/\s+/g, ' ');
    const fullTargetNorm = normalizeForComparison(fullTargetClean);

    const variants = getWordVariants(currentWord.originalWord);

    const correct =
      cleanSubmitted === cleanTarget ||
      normSubmitted === normTarget ||
      cleanSubmitted === fullTargetClean ||
      normSubmitted === fullTargetNorm ||
      variants.some(v => {
        const vClean = v.toLowerCase().trim().replace(/\s+/g, ' ');
        return cleanSubmitted === vClean || normSubmitted === normalizeForComparison(vClean);
      });

    setAnswered(true);
    setIsCorrect(correct);
    setAnsweredWord(currentWord.targetSpelling || currentWord.originalWord);
    if (onAnswer) onAnswer(currentWord, correct);

    const confidence = inferConfidenceFromSpeed(responseTime, correct);
    onUpdateWord(currentWord.id, {
      isCorrect: correct,
      confidence,
      responseTime,
      retrievalType: 'active_recall',
      mode: 'spelling',
    });

    if (correct) {
      setCorrectCount(c => c + 1);
    } else {
      setIncorrectCount(c => c + 1);
      detectConfusion(submittedInput);
    }
  };

  const handleTileClick = (idx) => {
    if (answered) return;
    if (usedTileIndices.includes(idx)) {
      const posInSequence = usedTileIndices.indexOf(idx);
      setUsedTileIndices(prev => prev.filter(i => i !== idx));
      setInput(prev => prev.slice(0, posInSequence) + prev.slice(posInSequence + 1));
    } else {
      setUsedTileIndices(prev => [...prev, idx]);
      setInput(prev => prev + scrambledList[idx]);
    }
  };

  const handleInputChange = (e) => {
    if (answered) return;
    const newValue = e.target.value;
    setInput(newValue);

    const used = [];
    const usedSet = new Set();
    newValue.toLowerCase().split('').forEach((ch) => {
      const idx = scrambledList.findIndex((letter, i) => !usedSet.has(i) && letter.toLowerCase() === ch);
      if (idx !== -1) {
        usedSet.add(idx);
        used.push(idx);
      }
    });
    setUsedTileIndices(used);
  };

  const detectConfusion = (typedText) => {
    if (!user || !Array.isArray(allWords)) return;

    const best = findConfusableMatch(typedText, allWords, {
      excludeId: currentWord.id,
      getField: (w) => w.word,
      threshold: CONFUSION_THRESHOLD,
    });
    if (best) {
      recordConfusionPair(user.uid, currentWord.id, best.id, {
        wordA: currentWord.originalWord,
        wordB: best.candidate.word,
        translationA: currentWord.translation,
        translationB: best.candidate.translation,
      }).catch((err) => console.warn('Failed to record confusion pair:', err));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitAnswer();
  };

  const handleSkip = async () => {
    if (answered) return;
    const responseTime = (Date.now() - startTimeRef.current) / 1000;
    setInput(currentWord.targetSpelling);
    setAnswered(true);
    setIsCorrect(false);
    setAnsweredWord(currentWord.targetSpelling);
    if (onAnswer) onAnswer(currentWord, false);
    onUpdateWord(currentWord.id, {
      isCorrect: false,
      confidence: inferConfidenceFromSpeed(responseTime, false),
      responseTime,
      retrievalType: 'active_recall',
      mode: 'spelling',
    });
    setIncorrectCount(c => c + 1);
  };

  const handleNext = () => {
    if (currentIndex < processedWords.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextWord = processedWords[nextIndex];
      setCurrentIndex(nextIndex);
      setInput('');
      setUsedTileIndices([]);
      setAnswered(false);
      setIsCorrect(false);
      setAnsweredWord('');
      if (nextWord) {
        setScrambledList(shuffleArray(nextWord.targetSpelling.split('')));
      }
      startTimeRef.current = Date.now();
    } else {
      onComplete({ totalWords: processedWords.length, correctCount, incorrectCount });
    }
  };

  if (!currentWord) return null;

  const isLast = currentIndex === processedWords.length - 1;
  const wordLength = currentWord.targetSpelling.length;
  const tileSizeClass = wordLength > 16 ? 'size-xxs' : wordLength > 12 ? 'size-xs' : wordLength > 9 ? 'size-sm' : wordLength > 6 ? 'size-md' : '';

  const targetLength = currentWord ? (currentWord.translation || '').length : 0;
  const targetSizeClass = targetLength > 30 ? 'target-xs' : targetLength > 18 ? 'target-sm' : '';

  return (
    <div className="spelling-container">
      <div className="spelling-progress-label">
        <span>{currentIndex + 1} / {processedWords.length}</span>
        {!isEnglishPack && (
          <button className="btn-spell-speak" type="button" onClick={() => speakWord(currentWord.targetSpelling, language)}>
            <Volume2 size={14} strokeWidth={2.3} />
            {t('practice.listen')}
          </button>
        )}
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={`spelling-card ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {isEnglishPack ? (
            <>
              <div className="spelling-card-label">
                {t('practice.whichWordDefined')}
                {currentWord.totalVariants > 1 && ` (${currentWord.variantIndex + 1}-variant)`}
              </div>
              <div className="spelling-definition">{currentWord.definition}</div>
            </>
          ) : (
            <>
              <div className="spelling-card-label">
                {t('practice.typeWord', { lang: getLangAdjective(language) })}
                {currentWord.totalVariants > 1 && ` (${currentWord.variantIndex + 1}-variant)`}
              </div>
              <div className={`spelling-target ${targetSizeClass}`}>{currentWord.translation}</div>
            </>
          )}

          <div className="spelling-scramble-label">
            {t('practice.scrambledLetters', { count: wordLength })}
          </div>
          <div className={`spelling-tiles-wrapper ${tileSizeClass}`}>
            {scrambledList.map((letter, idx) => {
              const isUsed = usedTileIndices.includes(idx);
              const isSpace = letter === ' ';
              return (
                <span
                  key={idx}
                  className={`scrambled-tile ${isSpace ? 'space-tile' : ''} ${isUsed ? 'used' : ''}`}
                  onClick={() => handleTileClick(idx)}
                  title={isUsed ? "O'chirish uchun bosing" : "Tanlash uchun bosing"}
                >
                  {isSpace ? '␣' : letter}
                </span>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="spelling-form" autoComplete="off" noValidate data-lpignore="true" data-1p-ignore="true">
            <input
              ref={(el) => {
                inputRef.current = el;
              }}
              type="text"
              name="practice_no_autofill_input"
              className={`spelling-input ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}`}
              value={input}
              onChange={handleInputChange}
              disabled={answered}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              inputMode="text"
              aria-autocomplete="none"
              data-lpignore="true"
              data-1p-ignore="true"
              data-form-type="other"
              data-gramm="false"
              data-enable-grammarly="false"
              placeholder={t('practice.typeWordPlaceholder')}
            />
          </form>
        </motion.div>
      </AnimatePresence>

      {/* Fixed full-width bottom bar */}
      <div
        className={`spelling-bottom-bar ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}`}
        style={keyboardInset > 0 ? { transform: `translateY(-${keyboardInset}px)` } : undefined}
      >
        <div className="spelling-bottom-bar-inner">
          {!answered ? (
            <>
              <button type="button" className="btn btn-ghost" onClick={handleSkip}>
                {t('practice.dontKnow')}
              </button>
              <button
                type="button"
                className="btn-spell-submit"
                onClick={() => submitAnswer()}
                disabled={!input.trim()}
              >
                {t('practice.check')}
              </button>
            </>
          ) : (
            <>
              <div className="spelling-bottom-feedback">
                {isCorrect ? <Check size={18} strokeWidth={2.5} /> : <X size={18} strokeWidth={2.5} />}
                <span>
                  {isCorrect ? t('practice.greatSentence').split('!')[0] + '!' : <> {t('practice.answerIs', { answer: '' })} <strong>{answeredWord || currentWord.targetSpelling}</strong></>}
                </span>
              </div>
              <button type="button" className="btn-spell-next" onClick={handleNext}>
                {isLast ? t('practice.resultsBtn') : t('practice.nextBtn')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
