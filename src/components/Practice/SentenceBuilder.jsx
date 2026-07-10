import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Check, X } from 'lucide-react';
import { calculateNextReview } from '../../utils/sm2';
import { speakWord } from '../../utils/helpers';
import './SentenceBuilder.css';

// Checks whether the target word (allowing common suffixes) appears in the
// submitted sentence. Multi-word entries (phrases/idioms) fall back to a
// plain substring check since suffix matching doesn't apply to them.
function sentenceUsesWord(sentence, word) {
  const stem = word.trim();
  if (!stem) return false;

  if (stem.includes(' ')) {
    return sentence.toLowerCase().includes(stem.toLowerCase());
  }

  const escaped = stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`\\b${escaped}(s|es|d|ed|ing|er|r)?\\b`, 'i');
  return pattern.test(sentence);
}

export default function SentenceBuilder({ words, onComplete, onUpdateWord, onAnswer, onProgress }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isTooShort, setIsTooShort] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const textareaRef = useRef(null);

  const currentWord = words[currentIndex];

  useEffect(() => {
    if (onProgress && words) {
      onProgress(currentIndex, words.length);
    }
  }, [currentIndex, words, onProgress]);

  useEffect(() => {
    setInput('');
    setAnswered(false);
    setIsCorrect(false);
    setIsTooShort(false);
  }, [currentIndex]);

  useEffect(() => {
    if (textareaRef.current && !answered) {
      textareaRef.current.focus();
    }
  }, [currentIndex, answered]);

  const submitAnswer = async () => {
    if (answered || !input.trim()) return;

    const usesWord = sentenceUsesWord(input, currentWord.word);
    const wordCount = input.trim().split(/\s+/).length;
    const tooShort = usesWord && wordCount < 3;

    setAnswered(true);
    setIsCorrect(usesWord);
    setIsTooShort(tooShort);
    if (onAnswer) onAnswer(currentWord, usesWord);

    const sm2Data = calculateNextReview(
      usesWord ? (tooShort ? 3 : 4) : 1,
      currentWord.easeFactor || 2.5,
      currentWord.interval || 0,
      currentWord.reviewCount || 0
    );
    onUpdateWord(currentWord.id, sm2Data);

    if (usesWord) setCorrectCount(c => c + 1);
    else setIncorrectCount(c => c + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitAnswer();
  };

  const handleSkip = async () => {
    if (answered) return;
    setAnswered(true);
    setIsCorrect(false);
    if (onAnswer) onAnswer(currentWord, false);
    const sm2Data = calculateNextReview(1, currentWord.easeFactor || 2.5, currentWord.interval || 0, currentWord.reviewCount || 0);
    onUpdateWord(currentWord.id, sm2Data);
    setIncorrectCount(c => c + 1);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete({ totalWords: words.length, correctCount, incorrectCount });
    }
  };

  if (!currentWord) return null;

  const isLast = currentIndex === words.length - 1;

  return (
    <div className="sentence-container">
      <div className="sentence-progress-label">
        <span>{currentIndex + 1} / {words.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={`sentence-card ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="sentence-card-label">Ushbu ma'noni ifodalovchi so'zni ishlatib jumla tuzing</div>
          <div className="sentence-target">{currentWord.translation}</div>
          {currentWord.definition && (
            <div className="sentence-definition">{currentWord.definition}</div>
          )}

          <form onSubmit={handleSubmit} className="sentence-form">
            <textarea
              ref={textareaRef}
              className={`sentence-input ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}`}
              value={input}
              onChange={e => !answered && setInput(e.target.value)}
              disabled={answered}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              rows={3}
              placeholder="Inglizcha jumla yozing..."
            />
            {!answered && (
              <button type="submit" className="btn-sentence-submit">
                Tekshirish ✓
              </button>
            )}
          </form>

          <AnimatePresence>
            {answered && (
              <motion.div
                className={`sentence-feedback-banner ${isCorrect ? 'correct' : 'wrong'}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="sentence-feedback-row">
                  {isCorrect
                    ? <Check size={18} strokeWidth={2.5} />
                    : <X size={18} strokeWidth={2.5} />}
                  <span>
                    {isCorrect
                      ? (isTooShort ? "So'z to'g'ri ishlatildi, lekin jumlani uzunroq yozing" : 'Ajoyib! So\'z to\'g\'ri ishlatildi')
                      : "So'z jumlada ishlatilmadi"}
                  </span>
                </div>
                <div className="sentence-answer-word">
                  <span>{currentWord.word}</span>
                  <button
                    type="button"
                    className="btn-sentence-speak"
                    onClick={() => speakWord(currentWord.word)}
                    title="Talaffuz qilish"
                  >
                    <Volume2 size={15} strokeWidth={2.3} />
                  </button>
                </div>
                {currentWord.example && (
                  <div className="sentence-example-ref">"{currentWord.example}"</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <div className="sentence-actions">
        {!answered ? (
          <button type="button" className="btn btn-ghost" onClick={handleSkip}>
            Bilmadim (o'tkazib yuborish)
          </button>
        ) : (
          <button type="button" className="btn-sentence-next" onClick={handleNext}>
            {isLast ? 'Natijalar →' : 'Keyingisi →'}
          </button>
        )}
      </div>
    </div>
  );
}
