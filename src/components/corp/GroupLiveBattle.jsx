import { useState, useEffect, useMemo } from 'react';
import { Swords, Users, Play, Trophy, Check, X, Award, Zap, AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
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

// Build 10-15 multiple choice questions from selected sets
function generateQuestionsFromSets(selectedSets) {
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
  const selectedWords = shuffled.slice(0, Math.min(15, allWords.length));
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
  onBack = null
}) {
  const [battleData, setBattleData] = useState(null);
  const [selectedSetKeys, setSelectedSetKeys] = useState(new Set());

  // Student Game State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false); // Strict anti-double-click lock
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);

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
    }
  }, [battleData?.createdAt, battleData?.status]);

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
      // Fallback for flat units
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

  // Teacher launches new battle room
  const handleTeacherCreateBattle = async () => {
    const chosenSets = availableSets.filter(s => selectedSetKeys.has(s.key));
    if (chosenSets.length === 0) {
      alert('Please select at least one word set for the battle!');
      return;
    }
    const questions = generateQuestionsFromSets(chosenSets);
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

  // Student Anti-Double-Click Answer Handler
  const handleAnswerOption = (choice) => {
    if (isAnswering || gameFinished || !battleData || battleData.status !== 'active') return;

    // IMMEDIATELY LOCK to prevent rapid double-clicks / double scoring
    setIsAnswering(true);
    setSelectedChoice(choice);

    const questions = battleData.questions || [];
    const currentQ = questions[currentQIndex];
    if (!currentQ) return;

    const isCorrect = choice === currentQ.correctAnswer;
    const pointsEarned = isCorrect ? 100 : 0;

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

    // Advance to next question after 800ms
    setTimeout(() => {
      setSelectedChoice(null);
      if (isLastQ) {
        setGameFinished(true);
      } else {
        setCurrentQIndex(prev => prev + 1);
        setIsAnswering(false); // UNLOCK ONLY AFTER ADVANCING
      }
    }, 800);
  };

  // Sort participants by score descending for real-time Leaderboard
  const leaderboardList = useMemo(() => {
    const raw = battleData?.participants || {};
    const list = Object.keys(raw).map(id => ({ uid: id, ...raw[id] }));
    return list.sort((a, b) => (b.score || 0) - (a.score || 0));
  }, [battleData?.participants]);

  const hasJoined = Boolean(battleData?.participants?.[userUid]);

  // ── TEACHER VIEW RENDER ───────────────────────────────────────────────────
  if (isTeacher) {
    // 1. Teacher Setup Screen (No active battle room)
    if (!battleData || battleData.status === 'finished') {
      return (
        <div className="glb-container">
          <div className="glb-card">
            <div className="glb-header-hero">
              <div className="glb-icon-badge">
                <Swords size={28} />
              </div>
              <div>
                <h2 className="glb-title">Live Group Battle</h2>
                <p className="glb-subtitle">Select word sets and host a real-time battle for {groupName}!</p>
              </div>
            </div>

            <div className="glb-sets-section">
              <span className="glb-section-label">
                SELECT WORD SETS FOR BATTLE ({selectedSetKeys.size} selected)
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
                <Play size={18} /> Launch Battle Lobby
              </button>
            </div>
          </div>
        </div>
      );
    }

    // 2. Teacher Lobby View (Waiting for students to join)
    if (battleData.status === 'lobby') {
      return (
        <div className="glb-container">
          <div className="glb-card">
            <div className="glb-header-hero">
              <div className="glb-icon-badge pulsing">
                <Users size={28} />
              </div>
              <div>
                <h2 className="glb-title">Live Battle Lobby Open</h2>
                <p className="glb-subtitle">Students can now join from their group screen!</p>
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
        </div>
      );
    }

    // 3. Teacher Active Battle Leaderboard View
    return (
      <div className="glb-container">
        <div className="glb-card">
          <div className="glb-header-hero">
            <div className="glb-icon-badge gold">
              <Trophy size={28} />
            </div>
            <div>
              <h2 className="glb-title">Battle in Progress</h2>
              <p className="glb-subtitle">Real-time leaderboard & scores</p>
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
                      {p.totalAnswered || 0} / {(battleData.questions || []).length} answered
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
      </div>
    );
  }

  // ── STUDENT VIEW RENDER ───────────────────────────────────────────────────
  if (!battleData || battleData.status === 'finished') {
    return null; // No active battle room for students
  }

  // Student Lobby (Not joined or joined waiting for start)
  if (battleData.status === 'lobby') {
    return (
      <div className="glb-container">
        <div className="glb-card">
          <div className="glb-header-hero">
            <div className="glb-icon-badge pulsing">
              <Swords size={28} />
            </div>
            <div>
              <h2 className="glb-title">🔥 Live Battle Invitation!</h2>
              <p className="glb-subtitle">Hosted by {battleData.teacherName || 'Teacher'}</p>
            </div>
          </div>

          {!hasJoined ? (
            <div className="glb-lobby-join-box">
              <p className="glb-join-desc">
                Join your classmates for a real-time vocabulary battle! Earn points and climb the leaderboard.
              </p>
              <button type="button" className="glb-btn-primary" onClick={handleStudentJoinLobby}>
                <Swords size={18} /> Join Live Battle
              </button>
            </div>
          ) : (
            <div className="glb-empty-card">
              <RefreshCw className="spinning" size={24} />
              <span>You're in! Waiting for the teacher to click Start...</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Student Active Battle Quiz Arena
  const questions = battleData.questions || [];
  const currentQ = questions[currentQIndex];

  if (gameFinished || currentQIndex >= questions.length || !currentQ) {
    return (
      <div className="glb-container">
        <div className="glb-card">
          <div className="glb-header-hero">
            <div className="glb-icon-badge gold">
              <Award size={32} />
            </div>
            <div>
              <h2 className="glb-title">Battle Completed! 🎉</h2>
              <p className="glb-subtitle">Your final score: {score} pts ({correctCount}/{questions.length} correct)</p>
            </div>
          </div>

          <div className="glb-leaderboard-card">
            <span className="glb-section-label">FINAL LEADERBOARD</span>
            <div className="glb-lb-list">
              {leaderboardList.map((p, rank) => (
                <div key={p.uid} className={`glb-lb-row ${p.uid === userUid ? 'my-row' : ''}`}>
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
        </div>
      </div>
    );
  }

  return (
    <div className="glb-container">
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
    </div>
  );
}
