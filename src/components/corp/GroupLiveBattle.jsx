import { useState, useEffect, useMemo, useRef } from 'react';
import { Swords, Users, Play, Trophy, Check, X, Award, Zap, AlertTriangle, ArrowLeft, RefreshCw, Timer } from 'lucide-react';
import {
  subscribeGroupBattle,
  createGroupBattle,
  joinGroupBattle,
  startGroupBattle,
  updateGroupBattleScore,
  endGroupBattle
} from '../../services/groupBattleService';
import './GroupLiveBattle.css';

// Helper to shuffle an array
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build multiple choice questions from selected sets limited to maxCount
function generateQuestionsFromSets(selectedSets, maxCount = 10) {
  const allWords = [];
  (selectedSets || []).forEach(set => {
    (set.words || []).forEach(w => {
      if (w && typeof w.word === 'string' && w.word.trim() && typeof w.translation === 'string' && w.translation.trim()) {
        allWords.push({
          word: w.word.trim(),
          translation: w.translation.trim(),
          partOfSpeech: w.partOfSpeech || 'noun',
          definition: w.definition || ''
        });
      }
    });
  });

  if (allWords.length === 0) return [];

  const shuffled = shuffleArray(allWords);
  const selectedWords = shuffled.slice(0, Math.min(maxCount, allWords.length));
  const allTranslations = Array.from(new Set(allWords.map(w => w.translation)));

  return selectedWords.map((w, idx) => {
    const correct = w.translation;
    const wrongPool = allTranslations.filter(t => t !== correct);
    const wrongShuffled = shuffleArray(wrongPool).slice(0, 3);
    
    // Fallback options if translation pool has fewer than 4 unique items
    const defaultFillers = ['To clarify', 'To accomplish', 'Essential', 'Substantial', 'Precise'];
    let fillIdx = 0;
    while (wrongShuffled.length < 3) {
      const fill = defaultFillers[fillIdx++] || `Option ${wrongShuffled.length + 1}`;
      if (!wrongShuffled.includes(fill) && fill !== correct) {
        wrongShuffled.push(fill);
      }
    }

    const options = shuffleArray([correct, ...wrongShuffled]);

    return {
      id: `q_${idx}_${Date.now()}`,
      word: w.word,
      correctAnswer: correct,
      partOfSpeech: w.partOfSpeech,
      definition: w.definition,
      options
    };
  });
}

export default function GroupLiveBattle({
  groupId,
  groupName = 'Group',
  isTeacher = false,
  userUid = '',
  userName = 'User',
  availablePacks = [],
  onBack = null,
  isModal = false,
  onClose = null
}) {
  const [battleData, setBattleData] = useState(null);
  const [selectedSetKeys, setSelectedSetKeys] = useState(new Set());
  const [maxWordsCount, setMaxWordsCount] = useState(10); // Teacher configurable max words

  // Student Game State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false); // Strict anti-double-click lock
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [lastPointsEarned, setLastPointsEarned] = useState(null);

  // Timer reference for speed bonus calculation
  const questionStartTimeRef = useRef(Date.now());

  // Subscribe to real-time battle state from Firebase
  useEffect(() => {
    if (!groupId) return;
    const unsubscribe = subscribeGroupBattle(groupId, (data) => {
      setBattleData(data);
    });
    return () => unsubscribe();
  }, [groupId]);

  // Reset student game state when battle room status or ID changes
  useEffect(() => {
    if (battleData?.status === 'lobby' || !battleData) {
      setCurrentQIndex(0);
      setScore(0);
      setCorrectCount(0);
      setTotalAnswered(0);
      setIsAnswering(false);
      setSelectedChoice(null);
      setGameFinished(false);
      setLastPointsEarned(null);
    }
  }, [battleData?.createdAt, battleData?.status]);

  // Reset question timer whenever question index changes
  useEffect(() => {
    questionStartTimeRef.current = Date.now();
  }, [currentQIndex]);

  // AUTO-FINISH BATTLE: When ALL joined participants have finished all questions
  useEffect(() => {
    if (!battleData || battleData.status !== 'active') return;
    const participants = Object.values(battleData.participants || {});
    if (participants.length > 0 && participants.every(p => p.finished === true)) {
      endGroupBattle(groupId);
    }
  }, [battleData?.participants, battleData?.status, groupId]);

  // Extract all available sets/units across assigned packs
  const availableSets = useMemo(() => {
    const sets = [];
    (availablePacks || []).forEach(pack => {
      (pack.months || []).forEach(month => {
        (month.units || []).forEach(unit => {
          if ((unit.words || []).length > 0) {
            sets.push({
              key: `${pack.id}_${month.id}_${unit.id}`,
              packTitle: pack.title,
              monthTitle: month.title,
              unitTitle: unit.title,
              words: unit.words
            });
          }
        });
      });
      if (!pack.months && (pack.units || []).length > 0) {
        (pack.units || []).forEach(unit => {
          if ((unit.words || []).length > 0) {
            sets.push({
              key: `${pack.id}_flat_${unit.id}`,
              packTitle: pack.title,
              monthTitle: 'Topics',
              unitTitle: unit.title,
              words: unit.words
            });
          }
        });
      }
    });
    return sets;
  }, [availablePacks]);

  // Toggle set selection for teacher
  const toggleSetSelection = (setKey) => {
    const next = new Set(selectedSetKeys);
    if (next.has(setKey)) next.delete(setKey);
    else next.add(setKey);
    setSelectedSetKeys(next);
  };

  // Teacher launches new battle room with selected max words count
  const handleTeacherCreateBattle = async () => {
    const chosenSets = availableSets.filter(s => selectedSetKeys.has(s.key));
    if (chosenSets.length === 0) {
      alert('Please select at least one word set for the battle!');
      return;
    }
    const questions = generateQuestionsFromSets(chosenSets, maxWordsCount);
    if (questions.length === 0) {
      alert('No valid words found in the selected sets.');
      return;
    }
    await createGroupBattle(groupId, userUid, chosenSets, questions, userName);
  };

  // Teacher starts battle for joined students
  const handleTeacherStartBattle = async () => {
    await startGroupBattle(groupId);
  };

  // Teacher ends battle room
  const handleTeacherEndBattle = async () => {
    await endGroupBattle(groupId);
  };

  // Student joins lobby
  const handleStudentJoinLobby = async () => {
    await joinGroupBattle(groupId, userUid, userName);
  };

  // Student Anti-Double-Click & Speed-Bonus Answer Handler
  const handleAnswerOption = (choice) => {
    if (isAnswering || gameFinished || !battleData || battleData.status !== 'active') return;

    // IMMEDIATELY LOCK to prevent rapid double-clicks / double scoring
    setIsAnswering(true);
    setSelectedChoice(choice);

    const questions = battleData.questions || [];
    const currentQ = questions[currentQIndex];
    if (!currentQ) return;

    const isCorrect = choice === currentQ.correctAnswer;
    const elapsedSec = (Date.now() - questionStartTimeRef.current) / 1000;
    
    let basePoints = isCorrect ? 100 : 0;
    let speedBonus = 0;

    if (isCorrect) {
      // Speed bonus: up to 50 bonus points for fast responses within 10 seconds!
      speedBonus = Math.max(0, Math.round((10 - elapsedSec) * 5));
    }

    const pointsEarned = basePoints + speedBonus;
    setLastPointsEarned({ points: pointsEarned, speedBonus, isCorrect });

    const newScore = score + pointsEarned;
    const newCorrect = correctCount + (isCorrect ? 1 : 0);
    const newTotal = totalAnswered + 1;
    const isLastQ = currentQIndex + 1 >= questions.length;

    setScore(newScore);
    setCorrectCount(newCorrect);
    setTotalAnswered(newTotal);

    // Sync score atomically to Firebase
    updateGroupBattleScore(groupId, userUid, {
      score: newScore,
      correctCount: newCorrect,
      totalAnswered: newTotal,
      finished: isLastQ
    });

    // Advance to next question after 850ms
    setTimeout(() => {
      setSelectedChoice(null);
      setLastPointsEarned(null);
      if (isLastQ) {
        setGameFinished(true);
      } else {
        setCurrentQIndex(prev => prev + 1);
        setIsAnswering(false); // UNLOCK ONLY AFTER ADVANCING
      }
    }, 850);
  };

  // Sort participants by score descending for real-time Leaderboard
  const leaderboardList = useMemo(() => {
    const raw = battleData?.participants || {};
    const list = Object.keys(raw).map(id => ({ uid: id, ...raw[id] }));
    return list.sort((a, b) => (b.score || 0) - (a.score || 0));
  }, [battleData?.participants]);

  const hasJoined = Boolean(battleData?.participants?.[userUid]);

  // ── RENDER CONTENT ────────────────────────────────────────────────────────
  const renderMainContent = () => {
    // 1. TEACHER SETUP SCREEN
    if (isTeacher) {
      if (!battleData || battleData.status === 'finished') {
        return (
          <div className="glb-card">
            <div className="glb-header-hero">
              <div className="glb-icon-badge">
                <Swords size={28} />
              </div>
              <div>
                <h2 className="glb-title">Live Group Battle</h2>
                <p className="glb-subtitle">Configure sets and max word count for {groupName}!</p>
              </div>
            </div>

            {/* Max Word Count Configurator */}
            <div className="glb-sets-section">
              <span className="glb-section-label">MAX WORDS PER BATTLE</span>
              <div className="glb-word-count-row">
                {[5, 10, 15, 20, 25].map(cnt => (
                  <button
                    key={cnt}
                    type="button"
                    className={`glb-count-btn ${maxWordsCount === cnt ? 'active' : ''}`}
                    onClick={() => setMaxWordsCount(cnt)}
                  >
                    {cnt} Words
                  </button>
                ))}
              </div>
            </div>

            {/* Word Sets Picker */}
            <div className="glb-sets-section">
              <span className="glb-section-label">
                SELECT WORD SETS ({selectedSetKeys.size} selected)
              </span>

              {availableSets.length === 0 ? (
                <div className="glb-empty-card">
                  <AlertTriangle size={24} style={{ opacity: 0.7 }} />
                  <span>No word sets assigned to this group yet. Assign a pack first!</span>
                </div>
              ) : (
                <div className="glb-sets-grid">
                  {availableSets.map(s => {
                    const isChecked = selectedSetKeys.has(s.key);
                    return (
                      <div
                        key={s.key}
                        className={`glb-set-item ${isChecked ? 'selected' : ''}`}
                        onClick={() => toggleSetSelection(s.key)}
                      >
                        <div className="glb-set-checkbox">
                          {isChecked && <Check size={14} strokeWidth={3} />}
                        </div>
                        <div className="glb-set-info">
                          <strong className="glb-set-name">{s.unitTitle}</strong>
                          <span className="glb-set-sub">{s.packTitle} · {s.words.length} words</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="glb-footer">
              {onBack && (
                <button type="button" className="glb-btn-secondary" onClick={onBack}>
                  <ArrowLeft size={16} /> Back
                </button>
              )}
              <button
                type="button"
                className="glb-btn-primary"
                disabled={selectedSetKeys.size === 0}
                onClick={handleTeacherCreateBattle}
              >
                <Play size={18} /> Launch Battle Lobby ({maxWordsCount} Words)
              </button>
            </div>
          </div>
        );
      }

      // 2. TEACHER LOBBY VIEW
      if (battleData.status === 'lobby') {
        return (
          <div className="glb-card">
            <div className="glb-header-hero">
              <div className="glb-icon-badge pulsing">
                <Users size={28} />
              </div>
              <div>
                <h2 className="glb-title">Live Battle Lobby Open</h2>
                <p className="glb-subtitle">Max words: {battleData.questions?.length || 10} · Students joining in real-time</p>
              </div>
            </div>

            <div className="glb-lobby-list-card">
              <div className="glb-lobby-header">
                <span>JOINED STUDENTS ({leaderboardList.length})</span>
                <span className="glb-status-live">● LIVE</span>
              </div>

              {leaderboardList.length === 0 ? (
                <div className="glb-empty-card">
                  <RefreshCw className="spinning" size={24} />
                  <span>Waiting for students to click "Join Live Battle"...</span>
                </div>
              ) : (
                <div className="glb-participants-grid">
                  {leaderboardList.map(p => (
                    <div key={p.uid} className="glb-participant-chip">
                      <div className="glb-avatar">{p.name.charAt(0).toUpperCase()}</div>
                      <span className="glb-participant-name">{p.name}</span>
                      <span className="glb-dot-online" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="glb-footer">
              <button type="button" className="glb-btn-secondary" onClick={handleTeacherEndBattle}>
                Cancel Battle
              </button>
              <button
                type="button"
                className="glb-btn-primary"
                disabled={leaderboardList.length === 0}
                onClick={handleTeacherStartBattle}
              >
                <Zap size={18} /> START BATTLE ({leaderboardList.length})
              </button>
            </div>
          </div>
        );
      }

      // 3. TEACHER ACTIVE / LEADERBOARD VIEW
      return (
        <div className="glb-card">
          <div className="glb-header-hero">
            <div className="glb-icon-badge gold">
              <Trophy size={28} />
            </div>
            <div>
              <h2 className="glb-title">
                {battleData.status === 'finished' ? 'Battle Finished! 🏆' : 'Battle in Progress ⚡'}
              </h2>
              <p className="glb-subtitle">Real-time leaderboard · Auto-finishes when everyone completes</p>
            </div>
          </div>

          <div className="glb-leaderboard-card">
            <div className="glb-lb-header">
              <span>RANKING</span>
              <span>STUDENT</span>
              <span>SCORE</span>
            </div>

            <div className="glb-lb-list">
              {leaderboardList.map((p, rank) => (
                <div key={p.uid} className={`glb-lb-row ${rank === 0 ? 'top-1' : rank === 1 ? 'top-2' : rank === 2 ? 'top-3' : ''}`}>
                  <div className="glb-lb-rank">
                    {rank === 0 ? '🥇 1' : rank === 1 ? '🥈 2' : rank === 2 ? '🥉 3' : `#${rank + 1}`}
                  </div>
                  <div className="glb-lb-user">
                    <strong className="glb-lb-name">{p.name}</strong>
                    <span className="glb-lb-progress">
                      {p.totalAnswered || 0} / {(battleData.questions || []).length} answered {p.finished ? '✓ Done' : ''}
                    </span>
                  </div>
                  <div className="glb-lb-score">
                    <Trophy size={14} className="glb-score-icon" />
                    <span>{p.score || 0} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glb-footer">
            <button type="button" className="glb-btn-danger" onClick={handleTeacherEndBattle}>
              Finish Battle Room
            </button>
          </div>
        </div>
      );
    }

    // ── STUDENT VIEW RENDER ─────────────────────────────────────────────────
    if (!battleData || battleData.status === 'finished') {
      return (
        <div className="glb-card">
          <div className="glb-header-hero">
            <div className="glb-icon-badge gold">
              <Award size={32} />
            </div>
            <div>
              <h2 className="glb-title">Battle Ended! 🏆</h2>
              <p className="glb-subtitle">Final scores and ranking</p>
            </div>
          </div>

          <div className="glb-leaderboard-card">
            <span className="glb-section-label">FINAL LEADERBOARD</span>
            <div className="glb-lb-list">
              {leaderboardList.map((p, rank) => (
                <div key={p.uid} className={`glb-lb-row ${p.uid === userUid ? 'my-row' : ''} ${rank === 0 ? 'top-1' : ''}`}>
                  <div className="glb-lb-rank">
                    {rank === 0 ? '🥇 1' : rank === 1 ? '🥈 2' : rank === 2 ? '🥉 3' : `#${rank + 1}`}
                  </div>
                  <div className="glb-lb-user">
                    <strong className="glb-lb-name">{p.name} {p.uid === userUid ? '(You)' : ''}</strong>
                  </div>
                  <div className="glb-lb-score">
                    <span>{p.score || 0} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {onClose && (
            <div className="glb-footer">
              <button type="button" className="glb-btn-secondary" onClick={onClose}>
                Close View
              </button>
            </div>
          )}
        </div>
      );
    }

    // Student Lobby
    if (battleData.status === 'lobby') {
      return (
        <div className="glb-card">
          <div className="glb-header-hero">
            <div className="glb-icon-badge pulsing">
              <Swords size={28} />
            </div>
            <div>
              <h2 className="glb-title">🔥 Live Battle Lobby!</h2>
              <p className="glb-subtitle">Hosted by {battleData.teacherName || 'Teacher'} · {battleData.questions?.length || 10} Words</p>
            </div>
          </div>

          {!hasJoined ? (
            <div className="glb-lobby-join-box">
              <p className="glb-join-desc">
                Join your classmates for a real-time speed battle! Fast & accurate answers earn maximum points.
              </p>
              <button type="button" className="glb-btn-primary" onClick={handleStudentJoinLobby}>
                <Swords size={18} /> Join Battle Lobby
              </button>
            </div>
          ) : (
            <div className="glb-empty-card">
              <RefreshCw className="spinning" size={24} />
              <span>You're in! Waiting for teacher to click Start...</span>
            </div>
          )}
        </div>
      );
    }

    // Student Active Battle Quiz Arena
    const questions = battleData.questions || [];
    const currentQ = questions[currentQIndex];

    if (gameFinished || currentQIndex >= questions.length || !currentQ) {
      return (
        <div className="glb-card">
          <div className="glb-header-hero">
            <div className="glb-icon-badge gold">
              <Award size={32} />
            </div>
            <div>
              <h2 className="glb-title">All Questions Completed! 🎉</h2>
              <p className="glb-subtitle">Your score: {score} pts · Waiting for all players to finish...</p>
            </div>
          </div>

          <div className="glb-leaderboard-card">
            <span className="glb-section-label">LIVE SCOREBOARD</span>
            <div className="glb-lb-list">
              {leaderboardList.map((p, rank) => (
                <div key={p.uid} className={`glb-lb-row ${p.uid === userUid ? 'my-row' : ''}`}>
                  <div className="glb-lb-rank">
                    {rank === 0 ? '🥇 1' : rank === 1 ? '🥈 2' : rank === 2 ? '🥉 3' : `#${rank + 1}`}
                  </div>
                  <div className="glb-lb-user">
                    <strong className="glb-lb-name">{p.name} {p.uid === userUid ? '(You)' : ''}</strong>
                    <span className="glb-lb-progress">
                      {p.finished ? '✓ Complete' : 'In progress...'}
                    </span>
                  </div>
                  <div className="glb-lb-score">
                    <span>{p.score || 0} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {onClose && (
            <div className="glb-footer">
              <button type="button" className="glb-btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="glb-card">
        {/* Battle Top Bar */}
        <div className="glb-game-topbar">
          <div className="glb-game-step">
            Question {currentQIndex + 1} of {questions.length}
          </div>
          <div className="glb-game-score">
            <Trophy size={16} color="#f59e0b" />
            <span>{score} pts</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="glb-progress-track">
          <div
            className="glb-progress-fill"
            style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Box */}
        <div className="glb-question-card">
          <span className="glb-pos-badge">{currentQ.partOfSpeech}</span>
          <h2 className="glb-question-word">{currentQ.word}</h2>

          {lastPointsEarned && (
            <div className={`glb-points-float ${lastPointsEarned.isCorrect ? 'plus' : 'zero'}`}>
              {lastPointsEarned.isCorrect ? (
                <>+{lastPointsEarned.points} pts {lastPointsEarned.speedBonus > 0 ? `(⚡ +${lastPointsEarned.speedBonus} speed bonus!)` : ''}</>
              ) : (
                <>Incorrect</>
              )}
            </div>
          )}
        </div>

        {/* Answer Options Grid with Strict Anti-Double-Click Lock */}
        <div className="glb-options-grid">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedChoice === opt;
            const isCorrect = opt === currentQ.correctAnswer;
            let btnClass = 'glb-option-btn';

            if (selectedChoice !== null) {
              if (isSelected) {
                btnClass += isCorrect ? ' correct' : ' wrong';
              } else if (isCorrect) {
                btnClass += ' correct';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                className={btnClass}
                disabled={isAnswering} // STRICT DOUBLE CLICK LOCK
                onClick={() => handleAnswerOption(opt)}
              >
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Render inside Modal overlay if requested
  if (isModal) {
    return (
      <div className="glb-modal-overlay">
        <div className="glb-modal-topbar">
          <div className="glb-modal-title-group">
            <Swords size={20} color="#818cf8" />
            <span className="glb-modal-title">Live Battle — {groupName}</span>
          </div>
          {onClose && (
            <button type="button" className="glb-modal-close-btn" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          )}
        </div>
        <div className="glb-modal-body">
          <div className="glb-container">{renderMainContent()}</div>
        </div>
      </div>
    );
  }

  return <div className="glb-container">{renderMainContent()}</div>;
}
