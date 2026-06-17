import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import './PracticePage.css';

export default function PracticePage() {
  const { sourceType: urlSourceType, sourceId: urlSourceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { books, loading: booksLoading } = useBooks();
  const { packs, loading: packsLoading } = usePacks();
  
  const [step, setStep] = useState('source'); // 'source' | 'mode' | 'practice' | 'results'
  const [sourceType, setSourceType] = useState('books');
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [wordCount, setWordCount] = useState(10);
  const [practiceWords, setPracticeWords] = useState([]);
  const [results, setResults] = useState(null);
  const [sourceWords, setSourceWords] = useState([]);

  // Load parameterized source if available
  useEffect(() => {
    if (urlSourceType && urlSourceId && !booksLoading && !packsLoading) {
      const activeList = urlSourceType === 'books' ? books : packs;
      const foundSource = activeList.find(s => s.id === urlSourceId);
      if (foundSource) {
        setSourceType(urlSourceType);
        setSelectedSource(foundSource);
        
        // Fetch words for this source
        const fetchWords = async () => {
          if (!user) return;
          const wordsRef = ref(db, `users/${user.uid}/${urlSourceType}/${urlSourceId}/words`);
          const wordsSnap = await get(wordsRef);
          let words = [];
          if (wordsSnap.exists()) {
            wordsSnap.forEach(childSnap => {
              words.push({ id: childSnap.key, ...childSnap.val() });
            });
          }
          if (words.length === 0) {
            alert("Bu manbada so'zlar yo'q! Avval so'zlar qo'shing.");
            navigate(urlSourceType === 'books' ? `/books/${urlSourceId}` : `/packs/${urlSourceId}`);
            return;
          }
          setSourceWords(words);
          setStep('mode');
        };
        fetchWords();
      } else {
        navigate('/library');
      }
    }
  }, [urlSourceType, urlSourceId, booksLoading, packsLoading, books, packs, user, navigate]);

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

    setSourceWords(words);
    setStep('mode');
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
    setSourceWords(words);
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
    if (step === 'mode') {
      if (urlSourceId) {
        navigate(urlSourceType === 'books' ? `/books/${urlSourceId}` : `/packs/${urlSourceId}`);
      } else {
        setStep('source');
      }
    }
    else if (step === 'practice') setStep('mode');
    else if (step === 'results') setStep('mode');
  };

  const handleReset = () => {
    setSelectedMode(null);
    setResults(null);
    setPracticeWords([]);
    if (urlSourceId) {
      setStep('mode');
    } else {
      setStep('source');
    }
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

  const pageLoading = booksLoading || packsLoading;

  return (
    <div className="practice-page">
      <div className="page-header">
        <h1>🎮 Mashq {selectedSource && `(${selectedSource.title || selectedSource.name})`}</h1>
        {(step !== 'source' || urlSourceId) && (
          <button className="btn btn-ghost" onClick={handleBack}>
            ← Orqaga
          </button>
        )}
      </div>

      {pageLoading ? (
        <div className="empty-state"><p>Yuklanmoqda...</p></div>
      ) : (
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
                    Mashq boshiga
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
