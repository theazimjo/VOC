import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Swords, Users, Play, Trophy, Check, X, Award, Zap, AlertTriangle, ArrowLeft, RefreshCw, Flame } from 'lucide-react';
import {
  subscribeGroupBattle,
  createGroupBattle,
  joinGroupBattle,
  startGroupBattle,
  updateGroupBattleScore,
  endGroupBattle
} from '../../services/groupBattleService';
import './GroupLiveBattle.css';

const QUESTION_TIME_LIMIT = 15; // 15 seconds per question
const TIMER_RING_RADIUS = 28;
const TIMER_RING_CIRCUMFERENCE = 2 * Math.PI * TIMER_RING_RADIUS;

// Web Audio API Sound Effects Synthesizer (Instant, zero latency, 100% browser compatible)
function playSoundEffect(type) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'correct') {
      // Ascending chime: C5 (523Hz) -> E5 (659Hz) -> G5 (784Hz) -> C6 (1046Hz)
      const notes = [523.25, 659.25, 784.00, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.16);
      });
    } else if (type === 'wrong') {
      // Low buzz: Sawtooth wave 180Hz -> 120Hz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.26);
    } else if (type === 'tick') {
      // Short high blip for the final countdown seconds — the "clock is
      // running out" cue every quiz-show timer has.
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.09);
    } else if (type === 'victory') {
      // Victory fanfare notes
      const notes = [523.25, 659.25, 784.00, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.09 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.09);
        osc.stop(ctx.currentTime + idx * 0.09 + 0.32);
      });
    }
  } catch (e) {
    // Ignore autoplay restriction warnings
  }
}

// Helper to shuffle an array
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// A score that jumps straight to its new value reads as flat/static — this
// tweens the displayed digits toward the real value with a springy overshoot
// instead, the same "counting up" feel as Kahoot/Duolingo score reveals.
function AnimatedNumber({ value, className }) {
  const spring = useSpring(value, { stiffness: 140, damping: 18, mass: 0.6 });
  const rounded = useTransform(spring, (v) => Math.round(v).toLocaleString());
  useEffect(() => { spring.set(value); }, [value, spring]);
  return <motion.span className={className}>{rounded}</motion.span>;
}

// A flat ranked list undersells a battle's finish — a real podium (2nd-1st-3rd,
// staggered heights) is the visual payoff players actually associate with
// "I won". Renders whatever placings exist (works fine with only 1-2 players).
function Podium({ list }) {
  const [first, second, third] = list;
  const slots = [
    { p: second, place: 2, medal: '🥈', heightClass: 'h2' },
    { p: first, place: 1, medal: '🥇', heightClass: 'h1' },
    { p: third, place: 3, medal: '🥉', heightClass: 'h3' },
  ];
  if (!first) return null;
  return (
    <div className="glb-podium">
      {slots.map(({ p, place, medal, heightClass }) => p && (
        <motion.div
          key={p.uid}
          className={`glb-podium-slot ${heightClass}`}
          initial={{ opacity: 0, y: 50, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15 + (place === 1 ? 0.1 : place === 2 ? 0 : 0.2), type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div className="glb-podium-medal">{medal}</div>
          <div className="glb-podium-avatar">{(p.name || '?').charAt(0).toUpperCase()}</div>
          <div className="glb-podium-name">{p.name}</div>
          <div className="glb-podium-score">{p.score || 0} pts</div>
          <div className="glb-podium-bar">
            <span>{place}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const CONFETTI_COLORS = ['#fbbf24', '#22c55e', '#0a84ff', '#ec4899', '#a78bfa', '#f97316'];

// A little burst of falling paper pieces — cheap, dependency-free "juice"
// for correct answers and celebration moments. `seed` should change (e.g. an
// incrementing counter) each time a fresh burst is wanted, since it's used
// as both the React key (forces a full remount/replay) and the randomization
// seed input via useMemo's dependency.
function ConfettiBurst({ seed, count = 22, big = false }) {
  const particles = useMemo(() => Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
    const distance = (big ? 90 : 55) + Math.random() * (big ? 90 : 55);
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - (big ? 40 : 20),
      fall: (big ? 160 : 90) + Math.random() * 80,
      rotate: (Math.random() - 0.5) * 540,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.random() * 0.12,
      w: (big ? 7 : 5) + Math.random() * 5,
      h: (big ? 11 : 8) + Math.random() * 6,
    };
    // `seed` is only read here as a dependency, to force a fresh random burst
    // each time it changes — intentionally unused inside the mapped body.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [seed, count, big]);

  return (
    <div className={`glb-confetti-layer ${big ? 'big' : ''}`} aria-hidden="true">
      {particles.map(p => (
        <motion.span
          key={p.id}
          className="glb-confetti-piece"
          style={{ background: p.color, width: p.w, height: p.h }}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          animate={{ opacity: 0, x: p.x, y: p.y + p.fall, rotate: p.rotate }}
          transition={{ duration: (big ? 1.3 : 0.9) + Math.random() * 0.3, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
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

    // A small selected set can run out of real translations to use as
    // distractors — pad with neutral, language-agnostic placeholders rather
    // than fixed English phrases (e.g. "To clarify"), which used to show up
    // as answer options in an otherwise all-Uzbek quiz and read as broken.
    let fillIdx = 1;
    while (wrongShuffled.length < 3) {
      const fill = `— ${fillIdx++} —`;
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
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [streak, setStreak] = useState(0); // consecutive correct answers — fuels the combo bonus
  const [confettiKey, setConfettiKey] = useState(0); // bumped on each correct answer to replay the burst

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
      setTimeLeft(QUESTION_TIME_LIMIT);
      setStreak(0);
    }
  }, [battleData?.createdAt, battleData?.status]);

  // Per-Question Countdown Timer effect
  useEffect(() => {
    if (!battleData || battleData.status !== 'active' || gameFinished || isAnswering) return;

    setTimeLeft(QUESTION_TIME_LIMIT);
    questionStartTimeRef.current = Date.now();

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        const next = prev - 1;
        if (next <= 3) playSoundEffect('tick'); // last 3 seconds tick down audibly
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQIndex, battleData?.status, gameFinished, isAnswering]);

  // AUTO-FINISH BATTLE: When ALL joined participants have finished all questions.
  // This effect runs in every open client (teacher + every student), since
  // they all subscribe to the same battle doc — but a student reaching this
  // branch has, by definition, already finished themselves and already
  // played their own completion chime a moment earlier (see the isLastQ
  // branches in handleAnswerOption/handleTimeOut below), so replaying it
  // here would double it up. Only the teacher's client — which never plays
  // that personal chime — needs this "everyone's done!" cue. The DB write
  // itself stays open to any client for robustness (idempotent, harmless if
  // more than one fires) in case the teacher's tab isn't open.
  useEffect(() => {
    if (!battleData || battleData.status !== 'active') return;
    const participants = Object.values(battleData.participants || {});
    if (participants.length > 0 && participants.every(p => p.finished === true)) {
      endGroupBattle(groupId);
      if (isTeacher) playSoundEffect('victory');
    }
  }, [battleData?.participants, battleData?.status, groupId, isTeacher]);

  // Handle Question Timeout (When student doesn't answer within 15 seconds)
  const handleTimeOut = () => {
    if (isAnswering || gameFinished) return;
    setIsAnswering(true);
    playSoundEffect('wrong');
    setStreak(0);
    setLastPointsEarned({ points: 0, speedBonus: 0, isCorrect: false, timeOut: true });

    const questions = battleData?.questions || [];
    const newTotal = totalAnswered + 1;
    const isLastQ = currentQIndex + 1 >= questions.length;

    setTotalAnswered(newTotal);

    updateGroupBattleScore(groupId, userUid, {
      score,
      correctCount,
      totalAnswered: newTotal,
      finished: isLastQ
    });

    setTimeout(() => {
      setSelectedChoice(null);
      setLastPointsEarned(null);
      if (isLastQ) {
        setGameFinished(true);
        playSoundEffect('victory');
      } else {
        setCurrentQIndex(prev => prev + 1);
        setIsAnswering(false);
      }
    }, 850);
  };

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

  // Student Anti-Double-Click & Speed-Bonus Answer Handler with Audio Effects
  const handleAnswerOption = (choice) => {
    if (isAnswering || gameFinished || !battleData || battleData.status !== 'active') return;

    // IMMEDIATELY LOCK to prevent rapid double-clicks / double scoring
    setIsAnswering(true);
    setSelectedChoice(choice);

    const questions = battleData.questions || [];
    const currentQ = questions[currentQIndex];
    if (!currentQ) return;

    const isCorrect = choice === currentQ.correctAnswer;

    // Play Audio Effect
    playSoundEffect(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setConfettiKey(k => k + 1);

    const elapsedSec = (Date.now() - questionStartTimeRef.current) / 1000;
    let basePoints = isCorrect ? 100 : 0;
    let speedBonus = 0;
    let comboBonus = 0;
    let newStreak = 0;

    if (isCorrect) {
      // Speed bonus: up to 50 bonus points for fast responses within 10 seconds!
      speedBonus = Math.max(0, Math.round((10 - elapsedSec) * 5));
      // Combo bonus: every consecutive correct answer beyond the first adds
      // +15 more, capped at a 5-streak (+60) so it stays a reward for
      // consistency without letting a single lucky run snowball forever.
      newStreak = streak + 1;
      comboBonus = Math.min(newStreak - 1, 4) * 15;
    }
    setStreak(newStreak);

    const pointsEarned = basePoints + speedBonus + comboBonus;
    setLastPointsEarned({ points: pointsEarned, speedBonus, comboBonus, streak: newStreak, isCorrect });

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
        playSoundEffect('victory');
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
                  <AnimatePresence>
                    {leaderboardList.map(p => (
                      <motion.div
                        key={p.uid}
                        layout
                        className="glb-participant-chip"
                        initial={{ opacity: 0, scale: 0.6, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                      >
                        <div className="glb-avatar">{p.name.charAt(0).toUpperCase()}</div>
                        <span className="glb-participant-name">{p.name}</span>
                        <span className="glb-dot-online" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
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
            {battleData.status === 'finished' && <ConfettiBurst key={battleData.endedAt} seed={battleData.endedAt} count={34} big />}
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

          {battleData.status === 'finished' && <Podium list={leaderboardList.slice(0, 3)} />}

          <div className="glb-leaderboard-card">
            <div className="glb-lb-header">
              <span>RANKING</span>
              <span>STUDENT</span>
              <span>SCORE</span>
            </div>

            <div className="glb-lb-list">
              <AnimatePresence>
                {leaderboardList.map((p, rank) => (
                  <motion.div
                    key={p.uid}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className={`glb-lb-row ${rank === 0 ? 'top-1' : rank === 1 ? 'top-2' : rank === 2 ? 'top-3' : ''}`}
                  >
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
                  </motion.div>
                ))}
              </AnimatePresence>
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
    const myRankIdx = leaderboardList.findIndex(p => p.uid === userUid);
    const myRank = myRankIdx !== -1 ? myRankIdx + 1 : null;
    const myRankBadge = myRank === 1 ? "🥇 1-o'rin! (1st Place Winner)" : myRank === 2 ? "🥈 2-o'rin! (2nd Place)" : myRank === 3 ? "🥉 3-o'rin! (3rd Place)" : myRank ? `#${myRank}-o'rin` : null;

    if (!battleData || battleData.status === 'finished') {
      return (
        <div className="glb-card">
          <div className="glb-header-hero">
            {battleData?.endedAt && <ConfettiBurst key={battleData.endedAt} seed={battleData.endedAt} count={myRank === 1 ? 42 : 24} big={myRank === 1} />}
            <div className={`glb-icon-badge gold ${myRank === 1 ? 'pulsing' : ''}`}>
              <Award size={32} />
            </div>
            <div>
              <h2 className="glb-title">
                {myRankBadge ? `Siz ${myRankBadge}ni egalladingiz! 🎉` : 'Battle Ended! 🏆'}
              </h2>
              <p className="glb-subtitle">Yakuniy natijalar va g'oliblar jadvali</p>
            </div>
          </div>

          <Podium list={leaderboardList.slice(0, 3)} />

          <div className="glb-leaderboard-card">
            <span className="glb-section-label">FINAL LEADERBOARD</span>
            <div className="glb-lb-list">
              <AnimatePresence>
                {leaderboardList.map((p, rank) => (
                  <motion.div
                    key={p.uid}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32, delay: rank * 0.04 }}
                    className={`glb-lb-row ${p.uid === userUid ? 'my-row' : ''} ${rank === 0 ? 'top-1' : rank === 1 ? 'top-2' : rank === 2 ? 'top-3' : ''}`}
                  >
                    <div className="glb-lb-rank">
                      {rank === 0 ? '🥇 1' : rank === 1 ? '🥈 2' : rank === 2 ? '🥉 3' : `#${rank + 1}`}
                    </div>
                    <div className="glb-lb-user">
                      <strong className="glb-lb-name">{p.name} {p.uid === userUid ? '(Siz)' : ''}</strong>
                    </div>
                    <div className="glb-lb-score">
                      <span>{p.score || 0} pts</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {onClose && (
            <div className="glb-footer">
              <button type="button" className="glb-btn-secondary" onClick={onClose}>
                Chiqish (Close View)
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
              <AnimatePresence>
                {leaderboardList.map((p, rank) => (
                  <motion.div
                    key={p.uid}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className={`glb-lb-row ${p.uid === userUid ? 'my-row' : ''}`}
                  >
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
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="glb-card">
        {/* Battle Top Bar with a circular per-question countdown ring */}
        <div className="glb-game-topbar">
          <div className="glb-game-step">
            <AnimatePresence>
              {streak >= 2 && (
                <motion.span
                  className="glb-streak-chip"
                  initial={{ opacity: 0, scale: 0.5, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Flame size={13} /> {streak}x
                </motion.span>
              )}
            </AnimatePresence>
            Question {currentQIndex + 1} of {questions.length}
          </div>

          <div className="glb-timer-ring-wrap">
            <svg className="glb-timer-ring" viewBox="0 0 64 64">
              <circle className="glb-timer-ring-track" cx="32" cy="32" r={TIMER_RING_RADIUS} />
              <circle
                className={`glb-timer-ring-progress ${timeLeft <= 4 ? 'warn' : ''}`}
                cx="32" cy="32" r={TIMER_RING_RADIUS}
                strokeDasharray={TIMER_RING_CIRCUMFERENCE}
                strokeDashoffset={TIMER_RING_CIRCUMFERENCE * (1 - timeLeft / QUESTION_TIME_LIMIT)}
              />
            </svg>
            <span className={`glb-timer-ring-number ${timeLeft <= 4 ? 'warn' : ''}`}>{timeLeft}</span>
          </div>

          <div className="glb-game-score">
            <Trophy size={16} color="#f59e0b" />
            <AnimatedNumber value={score} /> <span>pts</span>
          </div>
        </div>

        {/* Question Box */}
        <motion.div
          key={currentQIndex}
          className={`glb-question-card ${timeLeft <= 4 && !isAnswering ? 'urgent' : ''}`}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={
            lastPointsEarned && !lastPointsEarned.isCorrect
              ? { opacity: 1, y: 0, scale: 1, x: [0, -8, 8, -6, 6, 0] }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {lastPointsEarned?.isCorrect && <ConfettiBurst key={confettiKey} seed={confettiKey} />}

          <span className="glb-pos-badge">{currentQ.partOfSpeech}</span>
          <h2 className="glb-question-word">{currentQ.word}</h2>

          <AnimatePresence>
            {lastPointsEarned && (
              <motion.div
                className={`glb-points-float ${lastPointsEarned.isCorrect ? 'plus' : 'zero'}`}
                initial={{ opacity: 0, scale: 0.6, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -8 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
              >
                {lastPointsEarned.timeOut ? (
                  <>⏰ Time's up!</>
                ) : lastPointsEarned.isCorrect ? (
                  <>
                    +{lastPointsEarned.points} pts
                    {lastPointsEarned.speedBonus > 0 ? ` ⚡+${lastPointsEarned.speedBonus}` : ''}
                    {lastPointsEarned.comboBonus > 0 ? ` 🔥+${lastPointsEarned.comboBonus}` : ''}
                  </>
                ) : (
                  <>Incorrect</>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

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
              <motion.button
                key={idx}
                type="button"
                className={btnClass}
                disabled={isAnswering} // STRICT DOUBLE CLICK LOCK
                onClick={() => handleAnswerOption(opt)}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isSelected && !isCorrect
                    ? { opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }
                    : isSelected || (selectedChoice !== null && isCorrect)
                    ? { opacity: 1, y: 0, scale: [1, 1.05, 1] }
                    : { opacity: 1, y: 0 }
                }
                transition={{ delay: selectedChoice === null ? idx * 0.05 : 0, duration: 0.3 }}
                whileTap={!isAnswering ? { scale: 0.96 } : {}}
              >
                <span>{opt}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  // Check if exit button should be allowed (only allowed when battle is finished, or for teacher)
  const canCloseModal = isTeacher || !battleData || battleData.status === 'finished';

  // Render inside Full Screen Modal Overlay if requested
  if (isModal) {
    return (
      <div className="glb-modal-overlay">
        <div className="glb-modal-topbar">
          <div className="glb-modal-title-group">
            <Swords size={20} color="#0a84ff" />
            <span className="glb-modal-title">Live Battle — {groupName}</span>
          </div>
          {/* LOCK VIEW: Close button ONLY rendered if battle is finished or teacher mode! */}
          {canCloseModal && onClose && (
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
