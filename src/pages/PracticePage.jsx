import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, get, update } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../hooks/useBooks';
import { usePacks } from '../hooks/usePacks';
import { shuffleArray } from '../utils/helpers';
import PracticeHub from '../components/Practice/PracticeHub';
import Flashcard from '../components/Practice/Flashcard';
import SpellingGame from '../components/Practice/SpellingGame';
import MatchGame from '../components/Practice/MatchGame';
import QuizGame from '../components/Practice/QuizGame';
import SpacedRepetition from '../components/Practice/SpacedRepetition';
import DictationGame from '../components/Practice/DictationGame';
import PronounceGame from '../components/Practice/PronounceGame';
import LearningPath from '../components/Practice/LearningPath';
import UnifiedLesson from '../components/Practice/UnifiedLesson';
import './PracticePage.css';

export default function PracticePage() {
  const { user } = useAuth();
  const { books } = useBooks();
  const { packs } = usePacks();
  const [step, setStep] = useState('source'); // 'source' | 'path' | 'lesson' | 'mode' | 'practice' | 'results'
  const [sourceType, setSourceType] = useState('books');
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [wordCount, setWordCount] = useState(10);
  const [practiceWords, setPracticeWords] = useState([]);
  const [results, setResults] = useState(null);

  // Roadmap States
  const [sourceWords, setSourceWords] = useState([]);
  const [completedLessons, setCompletedLessons] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);

  const sources = sourceType === 'books' ? books : packs;

  const handleSelectSource = async (source) => {
    setSelectedSource(source);
    if (!user) return;

    const wordsRef = ref(db, `users/${user.uid}/${sourceType}/${source.id}/words`);
    const wordsSnap = await get(wordsRef);
    let words = [];
    if (wordsSnap.exists()) {
      wordsSnap.forEach(childSnap => {
        words.push({ id: childSnap.key, ...childSnap.val() });
      });
    }

    if (words.length === 0) {
      alert("Bu manbada so'zlar yo'q! Avval Kutubxonadan so'zlar qo'shing.");
      return;
    }

    const completedRef = ref(db, `users/${user.uid}/${sourceType}/${source.id}/completedLessons`);
    const completedSnap = await get(completedRef);
    let lessons = {};
    if (completedSnap.exists()) {
      lessons = completedSnap.val();
    }

    setSourceWords(words);
    setCompletedLessons(lessons);
    setStep('path');
  };

  const reloadWordsAndLessons = async () => {
    if (!selectedSource || !user) return;
    const wordsRef = ref(db, `users/${user.uid}/${sourceType}/${selectedSource.id}/words`);
    const wordsSnap = await get(wordsRef);
    let words = [];
    if (wordsSnap.exists()) {
      wordsSnap.forEach(childSnap => {
        words.push({ id: childSnap.key, ...childSnap.val() });
      });
    }
    const completedRef = ref(db, `users/${user.uid}/${sourceType}/${selectedSource.id}/completedLessons`);
    const completedSnap = await get(completedRef);
    let lessons = {};
    if (completedSnap.exists()) {
      lessons = completedSnap.val();
    }
    setSourceWords(words);
    setCompletedLessons(lessons);
  };

  const handleStartPractice = async (mode) => {
    setSelectedMode(mode);
    
    if (sourceWords.length === 0) {
      alert("Bu manbada so'zlar yo'q!");
      return;
    }

    let selected;
    if (mode === 'spaced') {
      selected = sourceWords;
    } else {
      const shuffled = shuffleArray(sourceWords);
      selected = wordCount === 'all' ? shuffled : shuffled.slice(0, Number(wordCount));
    }

    setPracticeWords(selected);
    setStep('practice');
  };

  const handleUpdateWord = async (wordId, data) => {
    if (!user || !selectedSource) return;
    try {
      const wordRef = ref(db, `users/${user.uid}/${sourceType}/${selectedSource.id}/words/${wordId}`);
      await update(wordRef, data);
    } catch (e) {
      console.error('Error updating word:', e);
    }
  };

  const handleComplete = (resultData) => {
    setResults(resultData);
    setStep('results');
  };

  const handleBack = () => {
    if (step === 'path') setStep('source');
    else if (step === 'lesson') setStep('path');
    else if (step === 'mode') setStep('path');
    else if (step === 'practice') setStep('mode');
    else if (step === 'results') setStep('mode');
  };

  const handleReset = () => {
    setSelectedMode(null);
    setResults(null);
    setPracticeWords([]);
    setStep('source');
  };

  const renderPracticeMode = () => {
    const props = {
      words: practiceWords,
      onComplete: handleComplete,
      onUpdateWord: handleUpdateWord,
    };

    switch (selectedMode) {
      case 'flashcard': return <Flashcard {...props} />;
      case 'spelling': return <SpellingGame {...props} />;
      case 'match': return <MatchGame {...props} />;
      case 'quiz': return <QuizGame {...props} />;
      case 'dictation': return <DictationGame {...props} />;
      case 'pronounce': return <PronounceGame {...props} />;
      case 'spaced': return <SpacedRepetition {...props} />;
      default: return null;
    }
  };

  return (
    <div className="practice-page">
      <div className="page-header">
        <h1>🎮 Mashq</h1>
        {step !== 'source' && (
          <button className="btn btn-ghost" onClick={handleBack}>
            ← Orqaga
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Select Source */}
        {step === 'source' && (
          <motion.div
            key="source"
            className="practice-source-selector"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            
            <div className="source-tabs-container">
              <div className="source-tabs">
                <button
                  className={`source-tab ${sourceType === 'books' ? 'active' : ''}`}
                  onClick={() => { setSourceType('books'); setSelectedSource(null); }}
                >
                  📚 Kitoblar
                </button>
                <button
                  className={`source-tab ${sourceType === 'packs' ? 'active' : ''}`}
                  onClick={() => { setSourceType('packs'); setSelectedSource(null); }}
                >
                  To'plamlar
                </button>
              </div>
            </div>

            {sources.length > 0 ? (
              <div className="source-list">
                {sources.map(source => (
                  <button
                    key={source.id}
                    className="source-option"
                    onClick={() => handleSelectSource(source)}
                  >
                    <div className="source-option-icon">
                      {sourceType === 'books' ? '📖' : (source.icon || '📦')}
                    </div>
                    <div className="source-option-info">
                      <div className="source-option-name">
                        {source.title || source.name}
                      </div>
                      <div className="source-option-count">
                        {source.wordCount || 0} ta so'z
                      </div>
                    </div>
                    <div className="source-option-arrow">→</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">{sourceType === 'books' ? '📚' : '📦'}</div>
                <h3>
                  {sourceType === 'books' ? 'Kitoblar topilmadi' : "To'plamlar topilmadi"}
                </h3>
                <p>Avval {sourceType === 'books' ? 'kitob' : "to'plam"} qo'shing va so'zlar kiriting</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 1.5: Learning Path */}
        {step === 'path' && (
          <motion.div
            key="path"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ width: '100%' }}
          >
            <LearningPath
              words={sourceWords}
              completedLessons={completedLessons}
              onSelectLesson={(lesson) => {
                setSelectedLesson(lesson);
                setStep('lesson');
              }}
              onStartFreePractice={() => {
                setStep('mode');
              }}
            />
          </motion.div>
        )}

        {/* Step 1.6: Unified Lesson */}
        {step === 'lesson' && selectedLesson && (
          <motion.div
            key="lesson"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ width: '100%' }}
          >
            <UnifiedLesson
              lesson={selectedLesson}
              sourceType={sourceType}
              sourceId={selectedSource.id}
              onComplete={async () => {
                await reloadWordsAndLessons();
                setStep('path');
              }}
            />
          </motion.div>
        )}

        {/* Step 2: Select Mode */}
        {step === 'mode' && (
          <motion.div
            key="mode"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Word Count Selector for Free Practice */}
            <div className="practice-word-count-bar">
              <span className="practice-word-count-label">🔢 Mashq qilish uchun so'zlar soni:</span>
              <div className="word-count-options">
                {[5, 10, 20, 'all'].map(count => (
                  <button
                    key={count}
                    className={`word-count-btn ${wordCount === count ? 'active' : ''}`}
                    onClick={() => setWordCount(count)}
                  >
                    {count === 'all' ? 'Barchasi' : `${count} ta`}
                  </button>
                ))}
              </div>
            </div>
            <PracticeHub onSelectMode={handleStartPractice} />
          </motion.div>
        )}

        {/* Step 3: Practice */}
        {step === 'practice' && (
          <motion.div
            key="practice"
            className="practice-session"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderPracticeMode()}
          </motion.div>
        )}

        {/* Step 4: Results */}
        {step === 'results' && results && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="practice-results">
              <div className="result-icon">
                {results.correctCount / results.totalWords >= 0.8 ? '🎉' : 
                 results.correctCount / results.totalWords >= 0.5 ? '👍' : '💪'}
              </div>
              <h2>
                {results.correctCount / results.totalWords >= 0.8 ? 'Ajoyib!' :
                 results.correctCount / results.totalWords >= 0.5 ? 'Yaxshi!' : 'Davom eting!'}
              </h2>
              <p>Mashq yakunlandi</p>
              <div className="result-stats">
                <div className="result-stat">
                  <div className="value" style={{ color: 'var(--accent-2)' }}>{results.totalWords}</div>
                  <div className="label">Jami so'zlar</div>
                </div>
                <div className="result-stat">
                  <div className="value" style={{ color: 'var(--success)' }}>{results.correctCount}</div>
                  <div className="label">To'g'ri</div>
                </div>
                <div className="result-stat">
                  <div className="value" style={{ color: 'var(--error)' }}>{results.incorrectCount}</div>
                  <div className="label">Noto'g'ri</div>
                </div>
              </div>
              <div className="result-actions">
                <button className="btn btn-primary" onClick={() => { setStep('mode'); }}>
                  Yana mashq →
                </button>
                <button className="btn btn-secondary" onClick={handleReset}>
                  Bosh sahifa
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
