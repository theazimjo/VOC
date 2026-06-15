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
import './PracticePage.css';

export default function PracticePage() {
  const { user } = useAuth();
  const { books } = useBooks();
  const { packs } = usePacks();
  const [step, setStep] = useState('source'); // 'source' | 'mode' | 'practice' | 'results'
  const [sourceType, setSourceType] = useState('books');
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [wordCount, setWordCount] = useState(10);
  const [practiceWords, setPracticeWords] = useState([]);
  const [results, setResults] = useState(null);

  const sources = sourceType === 'books' ? books : packs;

  const loadWords = async () => {
    if (!selectedSource || !user) return [];
    const wordsRef = ref(db, `users/${user.uid}/${sourceType}/${selectedSource.id}/words`);
    const snap = await get(wordsRef);
    let words = [];
    if (snap.exists()) {
      snap.forEach(childSnap => {
        words.push({ id: childSnap.key, ...childSnap.val() });
      });
    }
    return words;
  };

  const handleStartPractice = async (mode) => {
    setSelectedMode(mode);
    const words = await loadWords();
    
    if (words.length === 0) {
      alert("Bu manbada so'zlar yo'q!");
      return;
    }

    let selected;
    if (mode === 'spaced') {
      // For spaced repetition, use all words (it filters due words internally)
      selected = words;
    } else {
      const shuffled = shuffleArray(words);
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
    if (step === 'mode') setStep('source');
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
            <h2>📖 Manbani tanlang</h2>
            
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
                📦 To'plamlar
              </button>
            </div>

            {sources.length > 0 ? (
              <>
                <div className="source-list">
                  {sources.map(source => (
                    <button
                      key={source.id}
                      className={`source-option ${selectedSource?.id === source.id ? 'selected' : ''}`}
                      onClick={() => setSelectedSource(source)}
                    >
                      <div className="source-option-icon">
                        {sourceType === 'books' ? '📖' : (source.icon || '📦')}
                      </div>
                      <div className="source-option-name">
                        {source.title || source.name}
                      </div>
                      <div className="source-option-count">
                        {source.wordCount || 0} ta so'z
                      </div>
                    </button>
                  ))}
                </div>

                {selectedSource && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <div className="word-count-selector">
                      <label>So'zlar soni:</label>
                      <div className="word-count-options">
                        {[5, 10, 20, 'all'].map(count => (
                          <button
                            key={count}
                            className={`word-count-btn ${wordCount === count ? 'active' : ''}`}
                            onClick={() => setWordCount(count)}
                          >
                            {count === 'all' ? 'Barchasi' : count}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-lg practice-start-btn"
                      onClick={() => setStep('mode')}
                    >
                      Davom etish →
                    </button>
                  </motion.div>
                )}
              </>
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

        {/* Step 2: Select Mode */}
        {step === 'mode' && (
          <motion.div
            key="mode"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
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
