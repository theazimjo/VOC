import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { GREEK_ALPHABET } from '../data/greekAlphabet';
import { GREEK_VOCABULARY, GREEK_VOCAB_CATEGORIES, getVocabByCategory } from '../data/greekVocabulary';
import GreekLetterCard from '../components/greek/GreekLetterCard';
import GreekLearnFlow from '../components/greek/GreekLearnFlow';
import GreekVocabWordCard from '../components/greek/GreekVocabWordCard';
import GreekVocabLearnFlow from '../components/greek/GreekVocabLearnFlow';
import '../pages/greek/GreekLayout.css';
import '../pages/greek/GreekAlphabet.css';
import '../pages/greek/GreekVocabulary.css';

// DEV-ONLY harness: exercises both Greek sub-tracks without Firebase auth,
// using local state instead of the real progress hooks. Not part of the
// production build's routes — reached only via greek-harness.html.
function pickAlphaSession(mastery) {
  const notIntroduced = GREEK_ALPHABET.filter((l) => mastery[l.id] === undefined);
  const introduced = GREEK_ALPHABET.filter((l) => mastery[l.id] !== undefined);
  const reviewPool = [...introduced].sort((a, b) => (mastery[a.id] ?? 0) - (mastery[b.id] ?? 0));
  if (notIntroduced.length === 0) return { newLetters: [], reviewLetters: reviewPool.slice(0, 4) };
  return { newLetters: notIntroduced.slice(0, 2), reviewLetters: reviewPool.slice(0, 2) };
}

function pickVocabSession(mastery) {
  const notIntroduced = GREEK_VOCABULARY.filter((w) => mastery[w.id] === undefined);
  const introduced = GREEK_VOCABULARY.filter((w) => mastery[w.id] !== undefined);
  const reviewPool = [...introduced].sort((a, b) => (mastery[a.id] ?? 0) - (mastery[b.id] ?? 0));
  if (notIntroduced.length === 0) return { newWords: [], reviewWords: reviewPool.slice(0, 5) };
  return { newWords: notIntroduced.slice(0, 3), reviewWords: reviewPool.slice(0, 2) };
}

export default function GreekHarness() {
  const [tab, setTab] = useState('vocab');
  const [alphaMastery, setAlphaMastery] = useState({});
  const [vocabMastery, setVocabMastery] = useState({});
  const [alphaSession, setAlphaSession] = useState(null);
  const [vocabSession, setVocabSession] = useState(null);
  const [log, setLog] = useState([]);

  const pushLog = (msg) => setLog((l) => [msg, ...l].slice(0, 20));

  if (alphaSession) {
    return (
      <GreekLearnFlow
        newLetters={alphaSession.newLetters}
        reviewLetters={alphaSession.reviewLetters}
        initialMastery={alphaMastery}
        onExit={() => { pushLog('alpha session exited'); setAlphaSession(null); }}
        onComplete={(updates) => {
          pushLog('alpha complete: ' + JSON.stringify(updates));
          setAlphaMastery((m) => ({ ...m, ...updates }));
          setAlphaSession(null);
        }}
      />
    );
  }

  if (vocabSession) {
    return (
      <GreekVocabLearnFlow
        newWords={vocabSession.newWords}
        reviewWords={vocabSession.reviewWords}
        initialMastery={vocabMastery}
        onExit={() => { pushLog('vocab session exited'); setVocabSession(null); }}
        onComplete={(updates) => {
          pushLog('vocab complete: ' + JSON.stringify(updates));
          setVocabMastery((m) => ({ ...m, ...updates }));
          setVocabSession(null);
        }}
      />
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: 8, padding: 12 }}>
          <button onClick={() => setTab('alpha')} style={{ fontWeight: tab === 'alpha' ? 800 : 400 }}>ALPHABET</button>
          <button onClick={() => setTab('vocab')} style={{ fontWeight: tab === 'vocab' ? 800 : 400 }}>VOCAB</button>
        </div>

        {tab === 'alpha' && (
          <div className="greek-alphabet-page">
            <h1>Alphabet (harness)</h1>
            <button className="greek-alphabet-learn-cta" onClick={() => setAlphaSession(pickAlphaSession(alphaMastery))}>
              <GraduationCap size={20} /> Harflarni o'rganish
            </button>
            <div className="greek-alphabet-grid">
              {GREEK_ALPHABET.map((letter) => (
                <GreekLetterCard key={letter.id} letter={letter} mastery={alphaMastery[letter.id]} />
              ))}
            </div>
          </div>
        )}

        {tab === 'vocab' && (
          <div className="greek-vocab-page">
            <h1>Vocabulary (harness)</h1>
            <button className="greek-vocab-learn-cta" onClick={() => setVocabSession(pickVocabSession(vocabMastery))}>
              <GraduationCap size={20} /> So'z o'rganish
            </button>
            {GREEK_VOCAB_CATEGORIES.map((category) => (
              <section key={category.id} className="greek-vocab-category">
                <div className="greek-vocab-category-header">
                  <span className="greek-vocab-category-icon">{category.icon}</span>
                  <span className="greek-vocab-category-title">{category.title}</span>
                </div>
                <div className="greek-vocab-grid">
                  {getVocabByCategory(category.id).map((word) => (
                    <GreekVocabWordCard key={word.id} word={word} mastery={vocabMastery[word.id]} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
      <div style={{ width: 340, padding: 16, fontFamily: 'monospace', fontSize: 11, background: '#111', color: '#0f0', overflowY: 'auto', height: '100vh' }}>
        <div>alphaMastery: {JSON.stringify(alphaMastery)}</div>
        <div>vocabMastery: {JSON.stringify(vocabMastery)}</div>
        <hr />
        {log.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}
