import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Eye } from 'lucide-react';
import { playSound } from '../../utils/feedback';
import { weightedSelectWords, shuffleArray } from '../../utils/helpers';
import './IrregularVerbsTrainer.css';

export default function IrregularVerbsTrainer({ words, onComplete, onUpdateWord, sourceName, onProgress, initialSubStep, onExit }) {
  const [sessionVerbs, setSessionVerbs] = useState([]);
  const [subStep, setSubStep] = useState(initialSubStep || 'study'); // 'study' | 'practice'
  const [studyIndex, setStudyIndex] = useState(0);
  const [studyRevealed, setStudyRevealed] = useState(false);

  // Practice States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [qType, setQType] = useState(0); // 0: Table fill, 1: Shuffled order, 2: Sentence choice
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [wrongVerbs, setWrongVerbs] = useState([]);

  // States for Type 0: Table Fill-in
  const [tableAnswers, setTableAnswers] = useState({ v1: '', v2: '', v3: '' });
  const [tableCorrectFlags, setTableCorrectFlags] = useState({ v1: true, v2: true, v3: true });
  const [tablePrefillType, setTablePrefillType] = useState(0); // 0: hide all, 1: prefill V1, 2: prefill V2, 3: prefill V3
  const v1Ref = useRef(null);
  const v2Ref = useRef(null);
  const v3Ref = useRef(null);

  // States for Type 1: Shuffled V1->V2->V3 Order
  const [orderButtons, setOrderButtons] = useState([]); // [{ id, text, clicked, index }]
  const [orderStep, setOrderStep] = useState(0); // 0: waiting V1, 1: waiting V2, 2: waiting V3
  const [orderFailed, setOrderFailed] = useState(false);

  // States for Type 2: Sentence Context Choice
  const [sentenceQuestion, setSentenceQuestion] = useState(null); // { text, correctFormIndex, correctText }
  const [selectedChoice, setSelectedChoice] = useState(null); // index of chosen option

  // Helper to split options
  const isCorrectMatch = (userInput, correctOption) => {
    const cleaned = userInput.trim().toLowerCase();
    const targets = correctOption.toLowerCase().split('/').map(t => t.trim());
    return targets.includes(cleaned);
  };

  // Report progress
  useEffect(() => {
    if (onProgress) {
      if (subStep === 'study' && sessionVerbs) {
        onProgress(studyIndex, sessionVerbs.length || words.length);
      } else if (subStep === 'practice' && sessionVerbs) {
        onProgress(currentIndex, sessionVerbs.length);
      }
    }
  }, [subStep, studyIndex, currentIndex, sessionVerbs, words, onProgress]);

  // Speak verbs
  const speakVerbs = (v1, v2, v3) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanV1 = v1.replace('/', ' or ');
      const cleanV2 = v2.replace('/', ' or ');
      const cleanV3 = v3.replace('/', ' or ');

      const utterance = new SpeechSynthesisUtterance(`${cleanV1}, ${cleanV2}, ${cleanV3}`);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Extract / Parse verbs from words
  useEffect(() => {
    const pool = words.map(w => {
      let v1 = w.v1;
      let v2 = w.v2;
      let v3 = w.v3;

      if ((!v1 || !v2 || !v3) && w.definition) {
        const parts = w.definition.split('-').map(p => p.trim());
        if (parts.length === 3) {
          v1 = parts[0];
          v2 = parts[1];
          v3 = parts[2];
        }
      }

      if ((!v1 || !v2 || !v3) && w.notes && w.word) {
        const parts = w.notes.split('|').map(p => p.trim());
        if (parts.length === 2) {
          v1 = w.word;
          v2 = parts[0];
          v3 = parts[1];
        }
      }

      return { ...w, v1, v2, v3 };
    }).filter(w => w.v1 && w.v2 && w.v3);

    // Weighted, spaced-repetition-aware pick: verbs the user gets wrong
    // or hasn't mastered yet surface more often than ones already known well.
    setSessionVerbs(weightedSelectWords(pool, Math.min(10, pool.length)));
  }, [words]);

  // Reset the "cover before you recall" state whenever the study card changes.
  useEffect(() => {
    setStudyRevealed(false);
  }, [studyIndex]);

  // Setup current practice question
  useEffect(() => {
    if (subStep !== 'practice' || sessionVerbs.length === 0 || currentIndex >= sessionVerbs.length) return;

    const verb = sessionVerbs[currentIndex];
    setChecked(false);

    // Randomize question type: 0 (Table fill), 1 (Shuffled order), 2 (Sentence context choice)
    const parsedSentence = parseSentenceQuestion(verb);
    let chosenType = Math.floor(Math.random() * 3); // 0, 1 or 2
    if (chosenType === 2 && !parsedSentence) {
      chosenType = Math.random() > 0.5 ? 0 : 1;
    }
    setQType(chosenType);

    if (chosenType === 0) {
      // Type 0: Table Fill-in
      const prefill = Math.floor(Math.random() * 4); // 0, 1, 2, or 3
      setTablePrefillType(prefill);
      setTableAnswers({
        v1: prefill === 1 ? verb.v1 : '',
        v2: prefill === 2 ? verb.v2 : '',
        v3: prefill === 3 ? verb.v3 : ''
      });
      setTableCorrectFlags({ v1: true, v2: true, v3: true });

      // Focus first editable input
      setTimeout(() => {
        if (prefill === 0 || prefill === 2 || prefill === 3) {
          v1Ref.current?.focus();
        } else if (prefill === 1) {
          v2Ref.current?.focus();
        }
      }, 60);

    } else if (chosenType === 1) {
      // Type 1: Shuffled V1->V2->V3 Order
      setOrderStep(0);
      setOrderFailed(false);
      
      const buttons = [
        { id: 'v1', text: verb.v1, clicked: false },
        { id: 'v2', text: verb.v2, clicked: false },
        { id: 'v3', text: verb.v3, clicked: false }
      ].sort(() => Math.random() - 0.5);

      setOrderButtons(buttons);

    } else if (chosenType === 2 && parsedSentence) {
      // Type 2: Sentence Choice
      setSentenceQuestion(parsedSentence);
      setSelectedChoice(null);
    }
  }, [subStep, sessionVerbs, currentIndex]);

  // Helper: Sentence parser
  const parseSentenceQuestion = (verb) => {
    if (!verb.example) return null;
    const sentences = verb.example.split('/').map(s => s.trim());

    for (const sentence of sentences) {
      const cleanSentence = sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
      const wordsInSentence = cleanSentence.toLowerCase().split(/\s+/);

      const v1Option = verb.v1.toLowerCase();
      const v2Option = verb.v2.toLowerCase();
      const v3Option = verb.v3.toLowerCase();

      // Check V2 or V3 first to make it a good tense test
      const orderCheck = [
        { key: 'v2', val: v2Option },
        { key: 'v3', val: v3Option },
        { key: 'v1', val: v1Option }
      ];

      for (const check of orderCheck) {
        const targets = check.val.split('/').map(t => t.trim());
        for (const t of targets) {
          if (wordsInSentence.includes(t)) {
            const regex = new RegExp(`\\b${t}\\b`, 'i');
            const questionText = sentence.replace(regex, '<strong>_______</strong>');
            
            const choices = shuffleArray([
              { label: 'V1', text: verb.v1 },
              { label: 'V2', text: verb.v2 },
              { label: 'V3', text: verb.v3 }
            ]);

            const correctIndex = choices.findIndex(c => c.label.toLowerCase() === check.key);

            return {
              questionText,
              choices,
              correctIndex,
              correctText: check.val
            };
          }
        }
      }
    }
    return null;
  };

  if (sessionVerbs.length === 0) {
    return (
      <div className="empty-state">
        <p>Noto'g'ri fe'llar topilmadi.</p>
      </div>
    );
  }

  // --- STUDY PHASE HANDLERS ---
  const handleNextStudyCard = () => {
    if (studyIndex + 1 < sessionVerbs.length) {
      setStudyIndex(prev => prev + 1);
    } else {
      setSubStep('practice');
    }
  };

  const handlePrevStudyCard = () => {
    if (studyIndex > 0) {
      setStudyIndex(prev => prev - 1);
    }
  };

  // --- TYPE 0: TABLE FILL INPUT HANDLERS ---
  const handleTableInputChange = (field, val) => {
    if (checked) return;
    setTableAnswers(prev => ({ ...prev, [field]: val }));
  };

  const handleTableKeyPress = (e, field) => {
    if (e.key !== 'Enter') return;
    if (checked) {
      handleNextQuestion();
      return;
    }

    if (field === 'v1') {
      if (tablePrefillType !== 2) v2Ref.current?.focus();
      else v3Ref.current?.focus();
    } else if (field === 'v2') {
      if (tablePrefillType !== 3) v3Ref.current?.focus();
      else handleTableSubmit();
    } else if (field === 'v3') {
      handleTableSubmit();
    }
  };

  const handleTableSubmit = () => {
    const verb = sessionVerbs[currentIndex];
    const v1Correct = isCorrectMatch(tableAnswers.v1, verb.v1);
    const v2Correct = isCorrectMatch(tableAnswers.v2, verb.v2);
    const v3Correct = isCorrectMatch(tableAnswers.v3, verb.v3);

    const isAllCorrect = v1Correct && v2Correct && v3Correct;

    setTableCorrectFlags({ v1: v1Correct, v2: v2Correct, v3: v3Correct });
    setChecked(true);

    processResult(isAllCorrect);
  };

  // --- TYPE 1: SHUFFLED ORDER CLICK HANDLER ---
  const handleOrderClick = (btn, btnIdx) => {
    if (checked || btn.clicked) return;

    const verb = sessionVerbs[currentIndex];
    const expectedForms = [verb.v1, verb.v2, verb.v3];
    const expectedFormText = expectedForms[orderStep];

    const isCorrectChoice = isCorrectMatch(btn.text, expectedFormText);

    if (isCorrectChoice) {
      const updatedButtons = [...orderButtons];
      updatedButtons[btnIdx].clicked = true;
      updatedButtons[btnIdx].clickedIndex = orderStep; 
      setOrderButtons(updatedButtons);

      if (orderStep === 2) {
        setChecked(true);
        processResult(!orderFailed);
      } else {
        setOrderStep(prev => prev + 1);
      }
    } else {
      setOrderFailed(true);
      playSound('wrong');
    }
  };

  const handleOrderSkipReveal = () => {
    setChecked(true);
    processResult(false);
  };

  // --- TYPE 2: SENTENCE CHOICE HANDLER ---
  const handleChoiceClick = (choiceIdx) => {
    if (checked) return;
    setSelectedChoice(choiceIdx);
    setChecked(true);

    const isAllCorrect = choiceIdx === sentenceQuestion.correctIndex;
    processResult(isAllCorrect);
  };

  // Common Results Processing
  const processResult = (isCorrect) => {
    const verb = sessionVerbs[currentIndex];
    if (isCorrect) {
      playSound('correct');
      setCorrectCount(prev => prev + 1);
      if (onUpdateWord) onUpdateWord(verb.id, { quality: 5, isCorrect: true });
    } else {
      playSound('wrong');
      setIncorrectCount(prev => prev + 1);
      setWrongVerbs(prev => [...prev, verb]);
      if (onUpdateWord) onUpdateWord(verb.id, { quality: 2, isCorrect: false });

      // Give the verb one more attempt later in this same session instead of
      // just dropping it — retrieving it again shortly after a miss is what
      // actually moves it into memory (the "testing effect").
      if (!verb._requeued) {
        setSessionVerbs(prev => {
          const next = [...prev];
          const reinsertAt = Math.min(next.length, currentIndex + 4);
          next.splice(reinsertAt, 0, { ...verb, _requeued: true });
          return next;
        });
      }
    }
    speakVerbs(verb.v1, verb.v2, verb.v3);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 >= sessionVerbs.length) {
      onComplete({
        totalWords: sessionVerbs.length,
        correctCount,
        incorrectCount,
        wrongWords: wrongVerbs
      });
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const currentVerb = sessionVerbs[currentIndex];

  return (
    <div className="practice-card-container irregular-trainer-container">
      {/* -------------------------------------------------------- */}
      {/* PHASE 1: STUDY CARDS */}
      {/* -------------------------------------------------------- */}
      {subStep === 'study' && (
        <div className="study-flow">
          <div className="practice-card-header study-header">
            <span className="practice-source-badge">Fe'llarni O'rganish</span>
            <span className="practice-source-badge">{studyIndex + 1} / {sessionVerbs.length}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={studyIndex}
              className="study-card"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="study-card-uz-title">
                {sessionVerbs[studyIndex].translation}
              </div>

              {!studyRevealed ? (
                <button
                  className="btn-reveal-study-card"
                  onClick={() => setStudyRevealed(true)}
                >
                  <Eye size={16} strokeWidth={2.3} />
                  Shakllarni eslab ko'ring, so'ng bosing
                </button>
              ) : (
                <>
                  {/* iOS-Style Grouped Rows */}
                  <div className="study-card-rows-list">
                    <div className="study-card-row-item">
                      <span className="study-row-title">Infinitive</span>
                      <span className="study-row-val">{sessionVerbs[studyIndex].v1}</span>
                    </div>
                    <div className="study-card-row-item">
                      <span className="study-row-title">Past Simple</span>
                      <span className="study-row-val">{sessionVerbs[studyIndex].v2}</span>
                    </div>
                    <div className="study-card-row-item">
                      <span className="study-row-title">Past Participle</span>
                      <span className="study-row-val">{sessionVerbs[studyIndex].v3}</span>
                    </div>
                  </div>

                  {sessionVerbs[studyIndex].example && (
                    <div className="study-card-example-box">
                      <div className="example-label">Misol uchun</div>
                      <div className="example-sentences">
                        {sessionVerbs[studyIndex].example.split('/').map((s, i) => {
                          const trimmed = s.trim();
                          let highlighted = trimmed;

                          const escapeRegex = (str) => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                          const forms = [
                            ...sessionVerbs[studyIndex].v1.split('/'),
                            ...sessionVerbs[studyIndex].v2.split('/'),
                            ...sessionVerbs[studyIndex].v3.split('/')
                          ].map(f => f.trim()).filter(Boolean);

                          forms.sort((a,b) => b.length - a.length);

                          for (const form of forms) {
                            const regex = new RegExp(`\\b${escapeRegex(form)}\\b`, 'gi');
                            highlighted = highlighted.replace(regex, `<strong>$&</strong>`);
                          }

                          return (
                            <div
                              key={i}
                              className="example-sentence-item"
                              dangerouslySetInnerHTML={{ __html: highlighted }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <button
                    className="btn-speak-study-card"
                    onClick={() => speakVerbs(sessionVerbs[studyIndex].v1, sessionVerbs[studyIndex].v2, sessionVerbs[studyIndex].v3)}
                  >
                    <Volume2 size={18} strokeWidth={2.2} />
                    Ovozli eshitish
                  </button>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="study-card-footer">
            <button 
              className="btn btn-secondary" 
              onClick={studyIndex === 0 ? onExit : handlePrevStudyCard}
            >
              {studyIndex === 0 ? "Chiqish" : "Orqaga"}
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleNextStudyCard}
            >
              {studyIndex + 1 === sessionVerbs.length ? "Boshlash" : "Keyingisi"}
            </button>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* PHASE 2: PRACTICE GAMES */}
      {/* -------------------------------------------------------- */}
      {subStep === 'practice' && (
        <div>
          <div className="practice-card-header study-header">
            <span className="practice-source-badge">Amaliyot</span>
            <div className="practice-source-badge">
              {currentIndex + 1} of {sessionVerbs.length}
            </div>
          </div>

          <div className="trainer-board">
            
            {/* ------------------------------------ */}
            {/* GAME TYPE 0: TABLE FILL-IN */}
            {/* ------------------------------------ */}
            {qType === 0 && (
              <div className="game-type-wrap" style={{ width: '100%' }}>
                <div className="verb-uz-translation">
                  <span>{currentVerb.translation}</span>
                </div>
                <div className="trainer-instruction">
                  Qolgan shakllarini to'ldiring
                </div>

                <div className="trainer-grid">
                  <div className="trainer-col">
                    <label className="trainer-col-label">V1</label>
                    <input
                      ref={v1Ref}
                      type="text"
                      className={`trainer-input ${tablePrefillType === 1 ? 'prefilled' : ''} ${checked && !tableCorrectFlags.v1 ? 'error' : ''} ${checked && tableCorrectFlags.v1 && tablePrefillType !== 1 ? 'success' : ''}`}
                      value={tableAnswers.v1}
                      onChange={(e) => handleTableInputChange('v1', e.target.value)}
                      onKeyDown={(e) => handleTableKeyPress(e, 'v1')}
                      disabled={tablePrefillType === 1 || checked}
                      placeholder={tablePrefillType === 1 ? "" : "Infinitive"}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck="false"
                    />
                  </div>

                  <div className="trainer-col">
                    <label className="trainer-col-label">V2</label>
                    <input
                      ref={v2Ref}
                      type="text"
                      className={`trainer-input ${tablePrefillType === 2 ? 'prefilled' : ''} ${checked && !tableCorrectFlags.v2 ? 'error' : ''} ${checked && tableCorrectFlags.v2 && tablePrefillType !== 2 ? 'success' : ''}`}
                      value={tableAnswers.v2}
                      onChange={(e) => handleTableInputChange('v2', e.target.value)}
                      onKeyDown={(e) => handleTableKeyPress(e, 'v2')}
                      disabled={tablePrefillType === 2 || checked}
                      placeholder={tablePrefillType === 2 ? "" : "Past"}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck="false"
                    />
                  </div>

                  <div className="trainer-col">
                    <label className="trainer-col-label">V3</label>
                    <input
                      ref={v3Ref}
                      type="text"
                      className={`trainer-input ${tablePrefillType === 3 ? 'prefilled' : ''} ${checked && !tableCorrectFlags.v3 ? 'error' : ''} ${checked && tableCorrectFlags.v3 && tablePrefillType !== 3 ? 'success' : ''}`}
                      value={tableAnswers.v3}
                      onChange={(e) => handleTableInputChange('v3', e.target.value)}
                      onKeyDown={(e) => handleTableKeyPress(e, 'v3')}
                      disabled={tablePrefillType === 3 || checked}
                      placeholder={tablePrefillType === 3 ? "" : "Participle"}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck="false"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------ */}
            {/* GAME TYPE 1: SHUFFLED ORDER */}
            {/* ------------------------------------ */}
            {qType === 1 && (
              <div className="game-type-wrap" style={{ width: '100%' }}>
                <div className="verb-uz-translation">
                  <span>{currentVerb.translation}</span>
                </div>
                <div className="trainer-instruction">
                  Tartib bilan bosing: V1 → V2 → V3
                </div>

                <div className="order-grid">
                  {orderButtons.map((btn, idx) => (
                    <button
                      key={idx}
                      className={`btn-order-item ${btn.clicked ? 'clicked disabled' : ''}`}
                      onClick={() => handleOrderClick(btn, idx)}
                      disabled={btn.clicked || checked}
                    >
                      <span>{btn.text}</span>
                      {btn.clicked && (
                        <span className="order-badge">
                          V{btn.clickedIndex + 1}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="order-sequence-indicator">
                  <span className={`seq-dot ${orderStep >= 1 || checked ? 'active' : ''}`}>{checked || orderStep >= 1 ? currentVerb.v1 : 'V1'}</span>
                  <span className="seq-arrow">→</span>
                  <span className={`seq-dot ${orderStep >= 2 || checked ? 'active' : ''}`}>{checked || orderStep >= 2 ? currentVerb.v2 : 'V2'}</span>
                  <span className="seq-arrow">→</span>
                  <span className={`seq-dot ${checked ? 'active' : ''}`}>{checked ? currentVerb.v3 : 'V3'}</span>
                </div>
              </div>
            )}

            {/* ------------------------------------ */}
            {/* GAME TYPE 2: SENTENCE CHOICE */}
            {/* ------------------------------------ */}
            {qType === 2 && sentenceQuestion && (
              <div className="game-type-wrap" style={{ width: '100%' }}>
                <div 
                  className="sentence-text-question" 
                  dangerouslySetInnerHTML={{ __html: sentenceQuestion.questionText }} 
                />
                <div className="trainer-instruction">
                  Mos tushuvchi fe'lni tanlang
                </div>

                <div className="choices-grid">
                  {sentenceQuestion.choices.map((choice, idx) => {
                    const isSelected = selectedChoice === idx;
                    const isCorrect = idx === sentenceQuestion.correctIndex;
                    let btnClass = '';
                    
                    if (checked) {
                      if (isCorrect) btnClass = 'success';
                      else if (isSelected) btnClass = 'error';
                      else btnClass = 'disabled';
                    }

                    return (
                      <button
                        key={idx}
                        className={`btn-choice-item ${btnClass}`}
                        onClick={() => handleChoiceClick(idx)}
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

            {/* Reveal Answer Box */}
            <AnimatePresence>
              {checked && (
                <motion.div
                  className="trainer-reveal-box"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="reveal-title">To'g'ri Javob</div>
                  <div className="reveal-forms">
                    <span className="reveal-form-item">{currentVerb.v1}</span>
                    <span className="reveal-divider">→</span>
                    <span className="reveal-form-item">{currentVerb.v2}</span>
                    <span className="reveal-divider">→</span>
                    <span className="reveal-form-item">{currentVerb.v3}</span>
                  </div>
                  {currentVerb.example && (
                    <div className="reveal-example">
                      {currentVerb.example}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer Buttons */}
            <div className="trainer-footer">
              {!checked ? (
                qType === 0 ? (
                  <button className="btn btn-primary btn-submit-trainer" onClick={handleTableSubmit}>
                    Tekshirish
                  </button>
                ) : qType === 1 ? (
                  <button className="btn btn-ghost btn-submit-trainer" onClick={handleOrderSkipReveal}>
                    Javobni Ko'rish
                  </button>
                ) : null
              ) : (
                <button className="btn btn-success btn-submit-trainer" onClick={handleNextQuestion}>
                  {currentIndex + 1 === sessionVerbs.length ? "Natija" : "Davom Etish"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}