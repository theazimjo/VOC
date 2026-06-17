import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import SwipeCard from '../components/Cards/SwipeCard';
import CardsDrill from '../components/Cards/CardsDrill';
import './CardsMode.css';

const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -24 },
};

export default function CardsMode() {
  const { sourceType, sourceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [step, setStep]         = useState('loading'); // loading | dashboard | swipe | drill | results
  const [source, setSource]     = useState(null);
  const [allWords, setAllWords] = useState([]); // all words fetched
  const [words, setWords]       = useState([]); // subset for this session
  const [wordLimit, setWordLimit] = useState(10); // 5 | 10 | 20 | 0 (all)
  const [knownWords, setKnownWords]     = useState([]);
  const [unknownWords, setUnknownWords] = useState([]);
  const [drillResults, setDrillResults] = useState(null);
  const [error, setError]       = useState(null);

  const handleBack = () => {
    if (sourceType === 'books' && sourceId) {
      navigate(`/books/${sourceId}`);
    } else if (sourceType === 'packs' && sourceId) {
      navigate(`/packs/${sourceId}`);
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    let cancelled = false;
    setStep('loading');
    setSource(null);
    setAllWords([]);
    setError(null);

    if (!user || !sourceId) return;

    // Fetch the ENTIRE source node (book/pack) in ONE request.
    // Words are stored nested inside: users/{uid}/{type}/{id}/words
    // so we read them from the same snapshot to avoid SDK path-dedup issues.
    const sourceRef = ref(db, `users/${user.uid}/${sourceType}/${sourceId}`);

    get(sourceRef)
      .then((sourceSnap) => {
        if (cancelled) return;

        if (!sourceSnap.exists()) {
          setError("Manba topilmadi.");
          setStep('error');
          return;
        }

        const val = sourceSnap.val();

        // Source metadata (title / name)
        setSource({
          id: sourceSnap.key,
          title: val.title || val.name || '',
          coverColor: val.coverColor || '#7C3AED',
        });

        // Extract words from the nested `words` child of the snapshot
        const wordsChild = sourceSnap.child('words');
        const loaded = [];
        if (wordsChild.exists()) {
          wordsChild.forEach(child => {
            loaded.push({ id: child.key, ...child.val() });
          });
        }

        console.log(`[CardsMode] ${sourceType}/${sourceId} => ${loaded.length} words`);

        if (loaded.length === 0) {
          setError("Bu manbada so'zlar yo'q. Avval so'z qo'shing!");
          setStep('error');
        } else {
          const shuffled = [...loaded].sort(() => Math.random() - 0.5);
          setAllWords(shuffled);
          setStep('dashboard');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('[CardsMode] Fetch error:', err);
          setError("So'zlarni yuklashda xato yuz berdi.");
          setStep('error');
        }
      });

    return () => { cancelled = true; };
  }, [user?.uid, sourceType, sourceId]);

  const handleStartSession = () => {
    const limit = Number(wordLimit);
    const selected = limit === 0 ? allWords : allWords.slice(0, limit);
    setWords(selected);
    setStep('swipe');
  };

  const handleSwipeComplete = (known, unknown) => {
    setKnownWords(known);
    setUnknownWords(unknown);
    if (unknown.length > 0) {
      setStep('drill');
    } else {
      setStep('results');
    }
  };

  const handleDrillComplete = (results) => {
    setDrillResults(results);
    setStep('results');
  };

  const handleRestart = () => {
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    setAllWords(shuffled);
    setKnownWords([]);
    setUnknownWords([]);
    setDrillResults(null);
    setStep('dashboard');
  };

  const handleRestartUnknown = () => {
    setDrillResults(null);
    setStep('drill');
  };

  const drillCorrect   = drillResults ? drillResults.filter(r => r.correct).length : 0;
  const drillIncorrect = drillResults ? drillResults.filter(r => !r.correct).length : 0;

  return (
    <div className="cm-root">
      <div className="cm-header">
        <button className="cm-back-btn" onClick={handleBack} type="button">
          ← Orqaga
        </button>
        <div className="cm-title-area">
          <span className="cm-badge">🃏 Cards Mode</span>
          {source && <h1 className="cm-title">{source.title}</h1>}
        </div>
        <div className="cm-header-spacer" />
      </div>

      {(step === 'swipe' || step === 'drill' || step === 'results') && (
        <div className="cm-steps">
          <div className={`cm-step ${step === 'swipe' ? 'is-active' : step === 'drill' || step === 'results' ? 'is-done' : ''}`}>
            <span className="cm-step-dot" />
            <span className="cm-step-label">Ko'rish</span>
          </div>
          <div className="cm-step-line" />
          <div className={`cm-step ${step === 'drill' ? 'is-active' : step === 'results' ? 'is-done' : ''}`}>
            <span className="cm-step-dot" />
            <span className="cm-step-label">Mashq</span>
          </div>
          <div className="cm-step-line" />
          <div className={`cm-step ${step === 'results' ? 'is-active' : ''}`}>
            <span className="cm-step-dot" />
            <span className="cm-step-label">Natija</span>
          </div>
        </div>
      )}

      <div className="cm-content">
        <AnimatePresence mode="wait">
          {step === 'loading' && (
            <motion.div key="loading" className="cm-center" {...PAGE_VARIANTS}>
              <div className="spinner" />
              <p>So'zlar yuklanmoqda...</p>
            </motion.div>
          )}

          {step === 'error' && (
            <motion.div key="error" className="cm-center" {...PAGE_VARIANTS}>
              <div className="cm-error-icon">⚠️</div>
              <p className="cm-error-text">{error}</p>
              <button className="btn btn-primary" onClick={handleBack}>
                Orqaga qaytish
              </button>
            </motion.div>
          )}

          {step === 'dashboard' && (
            <motion.div key="dashboard" className="cm-dashboard-container" {...PAGE_VARIANTS}>
              <div className="cm-dashboard-card">
                <div className="cm-db-icon">🃏</div>
                <h2 className="cm-db-title">Cards Mode-ga xush kelibsiz!</h2>
                <p className="cm-db-subtitle">
                  So'zlarni o'ngga va chapga surish orqali oson o'rganing.
                </p>

                <div className="cm-db-stats">
                  <div className="cm-db-stat-item">
                    <span className="cm-db-stat-val">{allWords.length}</span>
                    <span className="cm-db-stat-lbl">Jami so'zlar</span>
                  </div>
                </div>

                <div className="cm-db-options">
                  <label className="cm-option-label">O'rganiladigan so'zlar soni:</label>
                  <div className="cm-count-selector">
                    {[5, 10, 20, 0].map(count => (
                      <button
                        key={count}
                        className={`cm-count-btn ${Number(wordLimit) === count ? 'is-active' : ''}`}
                        onClick={() => setWordLimit(count)}
                        type="button"
                      >
                        {count === 0 ? 'Barchasi' : `${count} ta`}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="btn btn-primary cm-start-btn" onClick={handleStartSession}>
                  O'rganishni boshlash 🚀
                </button>
              </div>
            </motion.div>
          )}

          {step === 'swipe' && (
            <motion.div key="swipe" className="cm-phase" {...PAGE_VARIANTS}>
              <SwipeCard words={words} onComplete={handleSwipeComplete} />
            </motion.div>
          )}

          {step === 'drill' && (
            <motion.div key="drill" className="cm-phase" {...PAGE_VARIANTS}>
              <div className="cm-drill-intro">
                <div className="cm-drill-stats">
                  <div className="cm-stat cm-stat--green">
                    <span className="cm-stat-num">{knownWords.length}</span>
                    <span className="cm-stat-lbl">Bilaman</span>
                  </div>
                  <div className="cm-stat cm-stat--blue">
                    <span className="cm-stat-num">{unknownWords.length}</span>
                    <span className="cm-stat-lbl">Bilmayman</span>
                  </div>
                </div>
              </div>
              <CardsDrill words={unknownWords} allWords={allWords} onComplete={handleDrillComplete} />
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div key="results" className="cm-results" {...PAGE_VARIANTS}>
              <div className="cm-results-icon">
                {knownWords.length > unknownWords.length ? '🎉' : '💪'}
              </div>
              <h2 className="cm-results-title">Sessiya tugadi!</h2>

              <div className="cm-results-grid">
                <div className="cm-res-card cm-res-card--green">
                  <span className="cm-res-num">{knownWords.length}</span>
                  <span className="cm-res-lbl">✅ Bilgan</span>
                </div>
                <div className="cm-res-card cm-res-card--blue">
                  <span className="cm-res-num">{unknownWords.length}</span>
                  <span className="cm-res-lbl">❌ Bilmagan</span>
                </div>
                {drillResults && (
                  <>
                    <div className="cm-res-card cm-res-card--green">
                      <span className="cm-res-num">{drillCorrect}</span>
                      <span className="cm-res-lbl">✍️ Mashqda to'g'ri</span>
                    </div>
                    <div className="cm-res-card cm-res-card--red">
                      <span className="cm-res-num">{drillIncorrect}</span>
                      <span className="cm-res-lbl">✍️ Mashqda noto'g'ri</span>
                    </div>
                  </>
                )}
              </div>

              {unknownWords.length > 0 && (
                <div className="cm-unknown-list">
                  <h3 className="cm-unknown-title">Bilmagan so'zlar:</h3>
                  <div className="cm-unknown-words">
                    {unknownWords.map(w => (
                      <div key={w.id} className="cm-unknown-word">
                        <span className="cm-uw-word">{w.word}</span>
                        <span className="cm-uw-sep">—</span>
                        <span className="cm-uw-trans">{w.translation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="cm-results-actions">
                <button className="btn btn-primary cm-action-btn" onClick={handleRestart}>
                  🔄 Qaytadan boshlash
                </button>
                {unknownWords.length > 0 && (
                  <button
                    className="btn btn-ghost cm-action-btn"
                    onClick={handleRestartUnknown}
                  >
                    💪 Bilmaymanni qayta mashq qilish
                  </button>
                )}
                <button
                  className="btn btn-ghost cm-action-btn"
                  onClick={handleBack}
                >
                  ← Orqaga
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
