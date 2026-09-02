import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Eye, CheckCircle2, XCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { playSound } from '../../utils/feedback';
import { weightedSelectWords, shuffleArray } from '../../utils/helpers';
import { inferConfidenceFromSpeed } from '../../utils/memoryEngine';
import { useLanguage } from '../../contexts/LanguageContext';
import './IrregularVerbsTrainer.css';

const escapeRegex = (str) => str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

// Safe highlighted text renderer (no dangerouslySetInnerHTML)
function highlightForms(text, forms) {
  const cleanForms = [...new Set(forms.map(f => f.trim()).filter(Boolean))];
  if (cleanForms.length === 0) return [text];
  const sorted = cleanForms.sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`\\b(${sorted.map(escapeRegex).join('|')})\\b`, 'gi');
  return text.split(pattern).map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

// Compare user answer vs correct (handles "burned/burnt" style alternatives)
const isCorrectMatch = (userInput, correctOption) => {
  const inputParts = userInput.trim().toLowerCase().split('/').map(t => t.trim()).filter(Boolean);
  const targets = correctOption.toLowerCase().split('/').map(t => t.trim());
  return inputParts.some(p => targets.includes(p));
};

// ─── Question-type constants ───────────────────────────────────────────────────
const QT_TABLE   = 0;  // Fill all three forms (one may be pre-filled)
const QT_ORDER   = 1;  // Tap shuffled buttons in V1→V2→V3 order
const QT_SENTENCE = 2; // See a gapped sentence, choose V1/V2/V3 card
const QT_CHOICE  = 3;  // See translation, choose correct verb card (MC)
const QT_TYPE    = 4;  // See "V1 = ___, V2 = go → V3 = ___" — type the missing form

export default function IrregularVerbsTrainer({
  words, onComplete, onUpdateWord, onProgress, initialSubStep, onExit
}) {
  const { t } = useLanguage();

  // ── Session ──────────────────────────────────────────────────────────────────
  const [sessionVerbs, setSessionVerbs] = useState([]);
  const [subStep, setSubStep]           = useState(initialSubStep || 'study');
  const [studyIndex, setStudyIndex]     = useState(0);
  const [studyRevealed, setStudyRevealed] = useState(false);

  // ── Practice shared state ─────────────────────────────────────────────────────
  const [currentIndex, setCurrentIndex] = useState(0);
  const [qType, setQType]               = useState(QT_TABLE);
  const [checked, setChecked]           = useState(false);
  const [lastCorrect, setLastCorrect]   = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [wrongVerbs, setWrongVerbs]     = useState([]);
  const questionStartRef = useRef(Date.now());

  // ── QT_TABLE state ────────────────────────────────────────────────────────────
  const [tableAnswers, setTableAnswers]           = useState({ v1: '', v2: '', v3: '' });
  const [tableCorrectFlags, setTableCorrectFlags] = useState({ v1: true, v2: true, v3: true });
  const [tablePrefill, setTablePrefill]           = useState(0); // 0=hide all, 1=show V1, 2=show V2, 3=show V3
  const v1Ref = useRef(null);
  const v2Ref = useRef(null);
  const v3Ref = useRef(null);

  // ── QT_ORDER state ────────────────────────────────────────────────────────────
  const [orderButtons, setOrderButtons] = useState([]);
  const [orderStep, setOrderStep]       = useState(0);
  const [orderFailed, setOrderFailed]   = useState(false);
  const [orderShake, setOrderShake]     = useState(null); // index of wrong button

  // ── QT_SENTENCE state ─────────────────────────────────────────────────────────
  const [sentenceQ, setSentenceQ]       = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);

  // ── QT_CHOICE state ───────────────────────────────────────────────────────────
  const [choiceOptions, setChoiceOptions]   = useState([]); // [{v1,v2,v3,translation,isTarget}]
  const [choiceSelected, setChoiceSelected] = useState(null);

  // ── QT_TYPE state ─────────────────────────────────────────────────────────────
  const [typeMask, setTypeMask]   = useState(null); // 'v1'|'v2'|'v3'
  const [typeAnswer, setTypeAnswer] = useState('');
  const [typeCorrect, setTypeCorrect] = useState(false);
  const typeRef = useRef(null);

  // ── Progress reporting ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!onProgress) return;
    if (subStep === 'study') {
      onProgress(studyIndex, sessionVerbs.length || words.length);
    } else {
      onProgress(currentIndex, sessionVerbs.length);
    }
  }, [subStep, studyIndex, currentIndex, sessionVerbs, words, onProgress]);

  // ── Audio ─────────────────────────────────────────────────────────────────────
  const speakVerbs = (v1, v2, v3) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(
      `${v1.replace('/', ' or ')}, ${v2.replace('/', ' or ')}, ${v3.replace('/', ' or ')}`
    );
    u.lang = 'en-US';
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
  };

  const speakSingle = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace('/', ' or '));
    u.lang = 'en-US';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  // ── Build session ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const pool = words.map(w => {
      let v1 = w.v1, v2 = w.v2, v3 = w.v3;
      if ((!v1 || !v2 || !v3) && w.definition) {
        const parts = w.definition.split('-').map(p => p.trim());
        if (parts.length === 3) { v1 = parts[0]; v2 = parts[1]; v3 = parts[2]; }
      }
      if ((!v1 || !v2 || !v3) && w.notes && w.word) {
        const parts = w.notes.split('|').map(p => p.trim());
        if (parts.length === 2) { v1 = w.word; v2 = parts[0]; v3 = parts[1]; }
      }
      return { ...w, v1, v2, v3 };
    }).filter(w => w.v1 && w.v2 && w.v3);
    setSessionVerbs(weightedSelectWords(pool, Math.min(10, pool.length)));
  }, [words]);

  useEffect(() => { setStudyRevealed(false); }, [studyIndex]);

  // ── Parse sentence question helper ────────────────────────────────────────────
  const parseSentenceQuestion = (verb) => {
    if (!verb.example) return null;
    const sentences = verb.example.split('/').map(s => s.trim());
    for (const sentence of sentences) {
      const clean = sentence.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '');
      const wordsIn = clean.toLowerCase().split(/\s+/);
      const checks = [
        { key: 'v2', val: verb.v2.toLowerCase() },
        { key: 'v3', val: verb.v3.toLowerCase() },
        { key: 'v1', val: verb.v1.toLowerCase() },
      ];
      for (const check of checks) {
        for (const t of check.val.split('/').map(x => x.trim())) {
          if (wordsIn.includes(t)) {
            const regex = new RegExp(`\\b${escapeRegex(t)}\\b`, 'i');
            const match = regex.exec(sentence);
            const before = match ? sentence.slice(0, match.index) : sentence;
            const after  = match ? sentence.slice(match.index + match[0].length) : '';
            const choices = shuffleArray([
              { label: 'V1', text: verb.v1 },
              { label: 'V2', text: verb.v2 },
              { label: 'V3', text: verb.v3 },
            ]);
            const correctIndex = choices.findIndex(c => c.label.toLowerCase() === check.key);
            return { before, after, choices, correctIndex, correctText: check.val };
          }
        }
      }
    }
    return null;
  };

  // ── Pick game type for current verb ──────────────────────────────────────────
  const pickQType = (verb) => {
    const hasSentence = !!parseSentenceQuestion(verb);
    const available = [QT_TABLE, QT_ORDER, QT_CHOICE, QT_TYPE];
    if (hasSentence) available.push(QT_SENTENCE);
    return available[Math.floor(Math.random() * available.length)];
  };

  // ── Setup question when verb or index changes ─────────────────────────────────
  const currentVerb = sessionVerbs[currentIndex];

  useEffect(() => {
    if (subStep !== 'practice' || !currentVerb) return;

    setChecked(false);
    setLastCorrect(false);
    questionStartRef.current = Date.now();

    const chosen = pickQType(currentVerb);
    setQType(chosen);

    if (chosen === QT_TABLE) {
      const prefill = Math.floor(Math.random() * 4);
      setTablePrefill(prefill);
      setTableAnswers({
        v1: prefill === 1 ? currentVerb.v1 : '',
        v2: prefill === 2 ? currentVerb.v2 : '',
        v3: prefill === 3 ? currentVerb.v3 : '',
      });
      setTableCorrectFlags({ v1: true, v2: true, v3: true });
      setTimeout(() => {
        if (prefill === 0 || prefill === 2 || prefill === 3) v1Ref.current?.focus();
        else if (prefill === 1) v2Ref.current?.focus();
      }, 60);

    } else if (chosen === QT_ORDER) {
      setOrderStep(0);
      setOrderFailed(false);
      setOrderShake(null);
      setOrderButtons(shuffleArray([
        { id: 'v1', text: currentVerb.v1, clicked: false },
        { id: 'v2', text: currentVerb.v2, clicked: false },
        { id: 'v3', text: currentVerb.v3, clicked: false },
      ]));

    } else if (chosen === QT_SENTENCE) {
      setSentenceQ(parseSentenceQuestion(currentVerb));
      setSelectedChoice(null);

    } else if (chosen === QT_CHOICE) {
      // Build distractors from other session verbs
      const others = sessionVerbs.filter((_, i) => i !== currentIndex);
      const distractors = shuffleArray(others).slice(0, 2);
      // Pad with dummy if not enough verbs
      while (distractors.length < 2) {
        distractors.push({ v1: '—', v2: '—', v3: '—' });
      }
      const allOpts = shuffleArray([
        { v1: currentVerb.v1, v2: currentVerb.v2, v3: currentVerb.v3, isTarget: true },
        ...distractors.map(v => ({ v1: v.v1, v2: v.v2, v3: v.v3, isTarget: false })),
      ]);
      setChoiceOptions(allOpts);
      setChoiceSelected(null);

    } else if (chosen === QT_TYPE) {
      // Pick which form to hide: prefer v2 or v3 (harder)
      const masks = ['v2', 'v3', 'v1'];
      setTypeMask(masks[Math.floor(Math.random() * masks.length)]);
      setTypeAnswer('');
      setTypeCorrect(false);
      setTimeout(() => typeRef.current?.focus(), 80);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subStep, currentVerb, currentIndex]);

  // ── Empty state ───────────────────────────────────────────────────────────────
  if (sessionVerbs.length === 0) {
    return (
      <div className="empty-state">
        <p>No irregular verbs found.</p>
      </div>
    );
  }

  // ── Study phase handlers ──────────────────────────────────────────────────────
  const handleNextStudy = () => {
    if (studyIndex + 1 < sessionVerbs.length) setStudyIndex(p => p + 1);
    else setSubStep('practice');
  };
  const handlePrevStudy = () => {
    if (studyIndex > 0) setStudyIndex(p => p - 1);
  };

  // ── Common result handler ─────────────────────────────────────────────────────
  const processResult = (isCorrect) => {
    const verb = sessionVerbs[currentIndex];
    const responseTime = (Date.now() - questionStartRef.current) / 1000;
    const confidence = inferConfidenceFromSpeed(responseTime, isCorrect);

    setLastCorrect(isCorrect);
    setChecked(true);

    if (isCorrect) {
      playSound('correct');
      setCorrectCount(p => p + 1);
    } else {
      playSound('wrong');
      setIncorrectCount(p => p + 1);
      setWrongVerbs(p => [...p, verb]);
    }

    if (!isCorrect && !verb._requeued) {
      setSessionVerbs(prev => {
        const next = [...prev];
        next.splice(Math.min(next.length, currentIndex + 4), 0, { ...verb, _requeued: true });
        return next;
      });
    }

    if (onUpdateWord) {
      onUpdateWord(verb.id, { isCorrect, confidence, responseTime, retrievalType: 'active_recall' })
        .catch(err => console.error('Persist failed:', err));
    }

    speakVerbs(verb.v1, verb.v2, verb.v3);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= sessionVerbs.length) {
      onComplete({ totalWords: sessionVerbs.length, correctCount, incorrectCount, wrongWords: wrongVerbs });
    } else {
      setCurrentIndex(p => p + 1);
    }
  };

  // ── QT_TABLE handlers ─────────────────────────────────────────────────────────
  const handleTableChange = (field, val) => {
    if (checked) return;
    setTableAnswers(p => ({ ...p, [field]: val }));
  };

  const handleTableKey = (e, field) => {
    if (e.key !== 'Enter') return;
    if (checked) { handleNext(); return; }
    if (field === 'v1') {
      (tablePrefill !== 2 ? v2Ref : v3Ref).current?.focus();
    } else if (field === 'v2') {
      if (tablePrefill !== 3) v3Ref.current?.focus();
      else handleTableSubmit();
    } else {
      handleTableSubmit();
    }
  };

  const handleTableSubmit = () => {
    if (checked) return;
    const verb = sessionVerbs[currentIndex];
    const v1ok = tablePrefill === 1 || isCorrectMatch(tableAnswers.v1, verb.v1);
    const v2ok = tablePrefill === 2 || isCorrectMatch(tableAnswers.v2, verb.v2);
    const v3ok = tablePrefill === 3 || isCorrectMatch(tableAnswers.v3, verb.v3);
    setTableCorrectFlags({ v1: v1ok, v2: v2ok, v3: v3ok });
    // Show correct answers for wrong fields
    setTableAnswers(prev => ({
      v1: v1ok ? prev.v1 : verb.v1,
      v2: v2ok ? prev.v2 : verb.v2,
      v3: v3ok ? prev.v3 : verb.v3,
    }));
    processResult(v1ok && v2ok && v3ok);
  };

  // ── QT_ORDER handlers ─────────────────────────────────────────────────────────
  const handleOrderClick = (btn, btnIdx) => {
    if (checked || btn.clicked) return;
    const verb = sessionVerbs[currentIndex];
    const expected = [verb.v1, verb.v2, verb.v3][orderStep];
    if (isCorrectMatch(btn.text, expected)) {
      const updated = orderButtons.map((b, i) =>
        i === btnIdx ? { ...b, clicked: true, clickedIndex: orderStep } : b
      );
      setOrderButtons(updated);
      if (orderStep === 2) {
        processResult(!orderFailed);
      } else {
        setOrderStep(p => p + 1);
      }
    } else {
      setOrderFailed(true);
      setOrderShake(btnIdx);
      playSound('wrong');
      setTimeout(() => setOrderShake(null), 500);
    }
  };

  const handleOrderReveal = () => {
    // Mark all as clicked to reveal labels, then finish as wrong
    const verb = sessionVerbs[currentIndex];
    setOrderButtons([
      { id: 'v1', text: verb.v1, clicked: true, clickedIndex: 0 },
      { id: 'v2', text: verb.v2, clicked: true, clickedIndex: 1 },
      { id: 'v3', text: verb.v3, clicked: true, clickedIndex: 2 },
    ]);
    processResult(false);
  };

  // ── QT_SENTENCE handlers ──────────────────────────────────────────────────────
  const handleSentenceChoice = (idx) => {
    if (checked) return;
    setSelectedChoice(idx);
    processResult(idx === sentenceQ.correctIndex);
  };

  // ── QT_CHOICE handlers ────────────────────────────────────────────────────────
  const handleChoiceSelect = (idx) => {
    if (checked) return;
    setChoiceSelected(idx);
    processResult(choiceOptions[idx]?.isTarget === true);
  };

  // ── QT_TYPE handlers ──────────────────────────────────────────────────────────
  const handleTypeSubmit = () => {
    if (checked) return;
    const verb = sessionVerbs[currentIndex];
    const correct = isCorrectMatch(typeAnswer, verb[typeMask]);
    setTypeCorrect(correct);
    if (!correct) setTypeAnswer(verb[typeMask]); // show correct answer
    processResult(correct);
  };

  const handleTypeKey = (e) => {
    if (e.key === 'Enter') {
      if (checked) handleNext();
      else handleTypeSubmit();
    }
  };

  // ── Helpers ───────────────────────────────────────────────────────────────────
  const progressPct = sessionVerbs.length > 0
    ? ((currentIndex) / sessionVerbs.length) * 100
    : 0;

  const qTypeLabel = {
    [QT_TABLE]:    t('practice.fillRemaining')    || 'Fill in the verb forms',
    [QT_ORDER]:    t('practice.tapInOrder')        || 'Tap in order: V1 → V2 → V3',
    [QT_SENTENCE]: t('practice.chooseMatchingVerb')|| 'Choose the correct form',
    [QT_CHOICE]:   t('practice.chooseCorrectVerb') || 'Choose the correct verb',
    [QT_TYPE]:     t('practice.typeTheMissing')    || 'Type the missing form',
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="practice-card-container irregular-trainer-container">

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* PHASE 1: STUDY CARDS                                                  */}
      {/* ───────────────────────────────────────────────────────────────────── */}
      {subStep === 'study' && (
        <div className="study-flow">
          <div className="practice-card-header study-header">
            <span className="practice-source-badge">{t('practice.studyVerbs') || 'Study'}</span>
            <span className="practice-source-badge">{studyIndex + 1} / {sessionVerbs.length}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={studyIndex}
              className="study-card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
            >
              <button
                className="btn-speak-study-card study-card-listen"
                onClick={() => speakVerbs(
                  sessionVerbs[studyIndex].v1,
                  sessionVerbs[studyIndex].v2,
                  sessionVerbs[studyIndex].v3
                )}
              >
                <Volume2 size={16} strokeWidth={2.2} />
              </button>

              <div className="study-card-uz-title">
                {sessionVerbs[studyIndex].translation}
              </div>

              {!studyRevealed ? (
                <button
                  className="btn-reveal-study-card"
                  onClick={() => setStudyRevealed(true)}
                >
                  <Eye size={16} strokeWidth={2.3} />
                  {t('practice.tryToRecall') || 'Show forms'}
                </button>
              ) : (
                <>
                  <div className="study-card-rows-list">
                    {[
                      { title: t('practice.infinitive') || 'Infinitive (V1)', val: sessionVerbs[studyIndex].v1 },
                      { title: t('practice.pastSimple')  || 'Past Simple (V2)', val: sessionVerbs[studyIndex].v2 },
                      { title: t('practice.pastParticiple') || 'Past Participle (V3)', val: sessionVerbs[studyIndex].v3 },
                    ].map(({ title, val }) => (
                      <div key={title} className="study-card-row-item">
                        <span className="study-row-title">{title}</span>
                        <span className="study-row-val">{val}</span>
                      </div>
                    ))}
                  </div>

                  {sessionVerbs[studyIndex].example && (
                    <div className="study-card-example-box">
                      <div className="example-label">{t('practice.forExample') || 'Example'}</div>
                      <div className="example-sentences">
                        {sessionVerbs[studyIndex].example.split('/').map((s, i) => {
                          const forms = [
                            ...sessionVerbs[studyIndex].v1.split('/'),
                            ...sessionVerbs[studyIndex].v2.split('/'),
                            ...sessionVerbs[studyIndex].v3.split('/'),
                          ];
                          return (
                            <div key={i} className="example-sentence-item">
                              {highlightForms(s.trim(), forms)}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="study-card-footer">
            <button
              className="btn btn-secondary"
              onClick={studyIndex === 0 ? onExit : handlePrevStudy}
            >
              <ChevronLeft size={18} strokeWidth={2.3} />
              {studyIndex === 0
                ? (t('profile.exit') || 'Exit')
                : (t('library.back') || 'Back')}
            </button>
            <button className="btn btn-primary" onClick={handleNextStudy}>
              {studyIndex + 1 === sessionVerbs.length
                ? (t('practice.start') || 'Start Practice')
                : (t('practice.nextBtn') || 'Next')}
              <ChevronRight size={18} strokeWidth={2.3} />
            </button>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* PHASE 2: PRACTICE GAMES                                               */}
      {/* ───────────────────────────────────────────────────────────────────── */}
      {subStep === 'practice' && currentVerb && (
        <div className="practice-phase">

          {/* Progress bar */}
          <div className="trainer-progress-wrap">
            <div className="trainer-progress-bar">
              <div
                className="trainer-progress-fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="trainer-progress-label">
              {currentIndex + 1} / {sessionVerbs.length}
            </span>
          </div>

          {/* Mode pill */}
          <div className="trainer-mode-pill">
            {qTypeLabel[qType]}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentIndex}-${qType}`}
              className="trainer-board"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
            >
              {/* ───────────────── QT_TABLE ───────────────── */}
              {qType === QT_TABLE && (
                <div className="game-type-wrap">
                  <div className="verb-uz-translation">
                    {currentVerb.translation}
                  </div>

                  <div className="trainer-grid">
                    {[
                      { key: 'v1', ref: v1Ref, label: 'V1', placeholder: 'Infinitive', prefillIdx: 1 },
                      { key: 'v2', ref: v2Ref, label: 'V2', placeholder: 'Past Simple', prefillIdx: 2 },
                      { key: 'v3', ref: v3Ref, label: 'V3', placeholder: 'Participle', prefillIdx: 3 },
                    ].map(({ key, ref, label, placeholder, prefillIdx }) => {
                      const isPrefilled = tablePrefill === prefillIdx;
                      const isOk       = tableCorrectFlags[key];
                      let cls = 'trainer-input';
                      if (isPrefilled)                               cls += ' prefilled';
                      else if (checked && !isOk)                     cls += ' error';
                      else if (checked && isOk)                      cls += ' success';
                      return (
                        <div key={key} className="trainer-col">
                          <label className="trainer-col-label">{label}</label>
                          <input
                            ref={ref}
                            type="text"
                            name={`no_autofill_${key}`}
                            className={cls}
                            value={tableAnswers[key]}
                            onChange={e => handleTableChange(key, e.target.value)}
                            onKeyDown={e => handleTableKey(e, key)}
                            disabled={isPrefilled || checked}
                            placeholder={isPrefilled ? '' : placeholder}
                            autoComplete="off" autoCorrect="off"
                            autoCapitalize="none" spellCheck={false}
                            data-lpignore="true" data-1p-ignore="true"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ───────────────── QT_ORDER ───────────────── */}
              {qType === QT_ORDER && (
                <div className="game-type-wrap">
                  <div className="verb-uz-translation">
                    {currentVerb.translation}
                  </div>

                  {/* Progress strip showing what's been tapped */}
                  <div className="order-sequence-indicator">
                    {['V1', 'V2', 'V3'].map((label, i) => {
                      const isActive = orderStep > i || checked;
                      const tapped   = orderButtons.find(b => b.clickedIndex === i);
                      return (
                        <span key={label}>
                          <span className={`seq-dot ${isActive ? 'active' : ''}`}>
                            {isActive && tapped ? tapped.text : label}
                          </span>
                          {i < 2 && <span className="seq-arrow">→</span>}
                        </span>
                      );
                    })}
                  </div>

                  <div className="order-grid">
                    {orderButtons.map((btn, idx) => (
                      <button
                        key={idx}
                        className={[
                          'btn-order-item',
                          btn.clicked ? 'clicked' : '',
                          orderShake === idx ? 'shake' : '',
                        ].filter(Boolean).join(' ')}
                        onClick={() => handleOrderClick(btn, idx)}
                        disabled={btn.clicked || checked}
                      >
                        <span>{btn.text}</span>
                        {btn.clicked && (
                          <span className="order-badge">V{btn.clickedIndex + 1}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ───────────────── QT_SENTENCE ───────────────── */}
              {qType === QT_SENTENCE && sentenceQ && (
                <div className="game-type-wrap">
                  <div className="sentence-text-question">
                    {sentenceQ.before}
                    <strong className="sentence-gap">_______</strong>
                    {sentenceQ.after}
                  </div>

                  <div className="choices-grid">
                    {sentenceQ.choices.map((choice, idx) => {
                      const isSelected = selectedChoice === idx;
                      const isCorrect  = idx === sentenceQ.correctIndex;
                      let cls = 'btn-choice-item';
                      if (checked) {
                        if (isCorrect)            cls += ' success';
                        else if (isSelected)      cls += ' error';
                        else                      cls += ' dimmed';
                      }
                      return (
                        <button
                          key={idx}
                          className={cls}
                          onClick={() => handleSentenceChoice(idx)}
                          disabled={checked}
                        >
                          <div className="choice-label">{choice.label}</div>
                          <div className="choice-val">{choice.text}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ───────────────── QT_CHOICE ───────────────── */}
              {qType === QT_CHOICE && (
                <div className="game-type-wrap">
                  <div className="verb-uz-translation choice-question-title">
                    {currentVerb.translation}
                  </div>
                  <p className="trainer-instruction" style={{ marginBottom: 16 }}>
                    {t('practice.chooseCorrectVerb') || 'Choose the correct verb'}
                  </p>

                  <div className="choice-cards-grid">
                    {choiceOptions.map((opt, idx) => {
                      let cls = 'btn-choice-card';
                      if (checked) {
                        if (opt.isTarget)          cls += ' success';
                        else if (choiceSelected === idx) cls += ' error';
                        else                       cls += ' dimmed';
                      } else if (choiceSelected === idx) {
                        cls += ' selected';
                      }
                      return (
                        <button
                          key={idx}
                          className={cls}
                          onClick={() => handleChoiceSelect(idx)}
                          disabled={checked}
                        >
                          <span className="choice-card-form">{opt.v1}</span>
                          <span className="choice-card-sep">→</span>
                          <span className="choice-card-form">{opt.v2}</span>
                          <span className="choice-card-sep">→</span>
                          <span className="choice-card-form">{opt.v3}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ───────────────── QT_TYPE ───────────────── */}
              {qType === QT_TYPE && typeMask && (
                <div className="game-type-wrap">
                  <div className="type-verb-display">
                    {[
                      { key: 'v1', label: 'V1' },
                      { key: 'v2', label: 'V2' },
                      { key: 'v3', label: 'V3' },
                    ].map(({ key, label }, i) => (
                      <span key={key}>
                        {i > 0 && <span className="type-sep">→</span>}
                        <span className={`type-form-block ${key === typeMask ? 'type-blank' : ''}`}>
                          <span className="type-form-label">{label}</span>
                          {key === typeMask ? (
                            <span className="type-hidden">?</span>
                          ) : (
                            <span className="type-form-val">{currentVerb[key]}</span>
                          )}
                        </span>
                      </span>
                    ))}
                  </div>

                  <div className="type-input-wrap">
                    <input
                      ref={typeRef}
                      type="text"
                      className={[
                        'trainer-input type-input',
                        checked && typeCorrect  ? 'success' : '',
                        checked && !typeCorrect ? 'error'   : '',
                      ].filter(Boolean).join(' ')}
                      value={typeAnswer}
                      onChange={e => { if (!checked) setTypeAnswer(e.target.value); }}
                      onKeyDown={handleTypeKey}
                      disabled={checked}
                      placeholder={`Type ${typeMask?.toUpperCase()}...`}
                      autoComplete="off" autoCorrect="off"
                      autoCapitalize="none" spellCheck={false}
                      data-lpignore="true" data-1p-ignore="true"
                    />
                    <div className="type-translation-hint">
                      {currentVerb.translation}
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────── Reveal box ───────────────── */}
              <AnimatePresence>
                {checked && (
                  <motion.div
                    className={`trainer-reveal-box ${lastCorrect ? 'reveal-correct' : 'reveal-wrong'}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="reveal-status-row">
                      {lastCorrect
                        ? <CheckCircle2 size={18} strokeWidth={2.2} className="reveal-icon correct" />
                        : <XCircle size={18} strokeWidth={2.2} className="reveal-icon wrong" />
                      }
                      <div className="reveal-title">
                        {lastCorrect
                          ? (t('practice.correctTitle') || 'Correct!')
                          : (t('practice.incorrectTitle') || 'Incorrect')}
                      </div>
                    </div>
                    <div className="reveal-forms">
                      <span className="reveal-form-item">{currentVerb.v1}</span>
                      <span className="reveal-divider">→</span>
                      <span className="reveal-form-item">{currentVerb.v2}</span>
                      <span className="reveal-divider">→</span>
                      <span className="reveal-form-item">{currentVerb.v3}</span>
                    </div>
                    {currentVerb.example && (
                      <div className="reveal-example">
                        {currentVerb.example.split('/')[0]?.trim()}
                      </div>
                    )}
                    <button
                      className="reveal-listen-btn"
                      onClick={() => speakVerbs(currentVerb.v1, currentVerb.v2, currentVerb.v3)}
                    >
                      <Volume2 size={14} strokeWidth={2.2} />
                      {t('practice.listen') || 'Listen'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ───────────────── Footer buttons ───────────────── */}
              <div className="trainer-footer">
                {!checked ? (
                  <>
                    {qType === QT_TABLE && (
                      <button
                        className="btn btn-primary btn-submit-trainer"
                        onClick={handleTableSubmit}
                        disabled={
                          (tablePrefill !== 1 && !tableAnswers.v1.trim()) ||
                          (tablePrefill !== 2 && !tableAnswers.v2.trim()) ||
                          (tablePrefill !== 3 && !tableAnswers.v3.trim())
                        }
                      >
                        {t('practice.check') || 'Check'}
                      </button>
                    )}
                    {qType === QT_ORDER && (
                      <button
                        className="btn btn-ghost btn-submit-trainer"
                        onClick={handleOrderReveal}
                      >
                        {t('practice.showAnswer') || 'Show Answer'}
                      </button>
                    )}
                    {qType === QT_TYPE && (
                      <button
                        className="btn btn-primary btn-submit-trainer"
                        onClick={handleTypeSubmit}
                        disabled={!typeAnswer.trim()}
                      >
                        {t('practice.check') || 'Check'}
                      </button>
                    )}
                    {/* QT_SENTENCE and QT_CHOICE have no footer button — tap a card */}
                  </>
                ) : (
                  <button
                    className="btn btn-submit-trainer btn-next-trainer"
                    onClick={handleNext}
                  >
                    {currentIndex + 1 >= sessionVerbs.length
                      ? (t('practice.resultsBtn') || 'Results')
                      : (t('practice.continueBtn') || 'Continue')}
                    <ChevronRight size={18} strokeWidth={2.3} />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}