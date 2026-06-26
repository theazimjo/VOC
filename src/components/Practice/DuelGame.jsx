import { useState, useEffect, useRef } from 'react';
import { ref, get, set, update, onValue, onDisconnect, runTransaction } from 'firebase/database';
import { db } from '../../firebase';
import { playSound, triggerVibration } from '../../utils/feedback';
import { speakWord, shuffleArray } from '../../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import './DuelGame.css';

const DEFAULT_POOL = [
  { word: 'Accomplish', translation: 'bajarmoq, erishmoq', definition: 'To achieve or complete successfully', example: 'You can accomplish anything with hard work.' },
  { word: 'Benevolent', translation: 'mehribon, saxiy', definition: 'Well meaning and kindly', example: 'The benevolent king helped the poor.' },
  { word: 'Diligent', translation: 'g‘ayratli, tirishqoq', definition: 'Having or showing care and conscientiousness in one\'s work', example: 'A diligent student always does homework.' },
  { word: 'Generous', translation: 'saxiy, qo‘li ochiq', definition: 'Showing a readiness to give more of something', example: 'She is very generous with her time.' },
  { word: 'Honest', translation: 'halol, rostgo‘y', definition: 'Free of deceit and untruthful', example: 'An honest answer is always best.' },
  { word: 'Intelligent', translation: 'aqlli, ziyoli', definition: 'Having or showing intelligence', example: 'Humans are intelligent beings.' },
  { word: 'Optimistic', translation: 'optimist, kelajakka ishonuvchi', definition: 'Hopeful and confident about the future', example: 'Try to remain optimistic despite setbacks.' },
  { word: 'Patient', translation: 'sabrli, toqatli', definition: 'Able to accept or tolerate delays or problems', example: 'Be patient, success takes time.' },
  { word: 'Sincere', translation: 'samimiy, chin ko‘ngildan', definition: 'Free from pretense or deceit', example: 'I offer you my sincere apologies.' },
  { word: 'Vibrant', translation: 'serjilo, hayotbaxsh', definition: 'Full of energy and life', example: 'The city has a vibrant nightlife.' },
  { word: 'Abundant', translation: 'mo‘l-ko‘l, serob', definition: 'Existing or available in large quantities', example: 'Water is abundant in this region.' },
  { word: 'Courageous', translation: 'jasur, dovyurak', definition: 'Not deterred by danger or pain', example: 'The courageous soldier saved his comrades.' },
  { word: 'Dynamic', translation: 'faol, harakatchan', definition: 'Constant change, activity, or progress', example: 'We need a dynamic leader for the project.' },
  { word: 'Eloquent', translation: 'notiq, so‘zga usta', definition: 'Fluent or persuasive in speaking or writing', example: 'He gave an eloquent speech at the graduation.' },
  { word: 'Gratitude', translation: 'minnatdorchilik', definition: 'The quality of being thankful', example: 'Express your gratitude to your parents.' },
  { word: 'Humble', translation: 'kamtar, kamsuxan', definition: 'Having or showing a modest estimate of one\'s importance', example: 'Despite his wealth, he remains humble.' },
  { word: 'Innovative', translation: 'innovatsion, yangilik yaratuvchi', definition: 'Featuring new methods; advanced and original', example: 'The company is known for its innovative products.' },
  { word: 'Loyal', translation: 'sodiq, vafodor', definition: 'Giving or showing firm and constant support', example: 'Dogs are very loyal animals.' },
  { word: 'Resilient', translation: 'bardoshli, chidamli', definition: 'Able to withstand or recover quickly from difficult conditions', example: 'Children are often remarkably resilient.' },
  { word: 'Versatile', translation: 'ko‘p qirrali, universal', definition: 'Able to adapt or be adapted to many different functions', example: 'A Swiss Army knife is a versatile tool.' }
];

export default function DuelGame({ words, onComplete, user }) {
  // ── Refs (never stale in closures) ──────────────────────────────────────
  const roomIdRef   = useRef(null);
  const isHostRef   = useRef(false);
  const wordsRef    = useRef(words);
  const roomStateRef = useRef(null);
  const hasAnsweredRef = useRef(false);
  const soundPlayedRef = useRef(false);

  useEffect(() => { wordsRef.current = words; }, [words]);

  // ── React state (for rendering) ─────────────────────────────────────────
  const [roomId, setRoomId]           = useState(null);
  const [queuing, setQueuing]         = useState(false);
  const [roomState, setRoomState]     = useState(null);
  const [errorMsg, setErrorMsg]       = useState('');
  const [timeLeft, setTimeLeft]       = useState(10);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState(null);
  const [showRoundResults, setShowRoundResults]   = useState(false);
  const [disconnectedPartner, setDisconnectedPartner] = useState(false);

  // ── Matchmaking on mount ─────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    findMatch();
    return () => { leaveRoom(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Leave / cleanup ──────────────────────────────────────────────────────
  const leaveRoom = async () => {
    const rid = roomIdRef.current;
    if (!rid) return;
    const roomRef = ref(db, `practice_rooms/${rid}`);
    if (isHostRef.current) {
      set(roomRef, null);
    } else {
      set(ref(db, `practice_rooms/${rid}/player2`), null);
    }
    const matchmakerRef = ref(db, 'practice_matchmaker');
    await runTransaction(matchmakerRef, (cur) =>
      cur && cur.uid === user.uid ? null : cur
    );
  };

  // ── Matchmaking ──────────────────────────────────────────────────────────
  const findMatch = async () => {
    setQueuing(true);
    setErrorMsg('');
    setDisconnectedPartner(false);
    try {
      const matchmakerRef = ref(db, 'practice_matchmaker');
      const myName = user.displayName || user.email?.split('@')[0] || 'O\'yinchi';
      const newRoomId = 'room_' + Math.random().toString(36).substring(2, 10);
      const myTicket = { uid: user.uid, name: myName, roomId: newRoomId, timestamp: Date.now() };

      let takenTicket = null;
      const result = await runTransaction(matchmakerRef, (cur) => {
        if (!cur)                  { return myTicket; }
        if (cur.uid === user.uid)  { return myTicket; }
        takenTicket = cur;
        return null;
      });

      if (result.committed) {
        if (!takenTicket) {
          // I am the Host
          onDisconnect(matchmakerRef).remove();
          roomIdRef.current = newRoomId;
          isHostRef.current = true;
          setRoomId(newRoomId);
          setupRoomAsHost(newRoomId, myName);
        } else {
          // I am the Challenger
          const hostRoomId = takenTicket.roomId;
          roomIdRef.current = hostRoomId;
          isHostRef.current = false;
          setRoomId(hostRoomId);
          joinRoomAsChallenger(hostRoomId, myName);
        }
      } else {
        setTimeout(findMatch, 1000);
      }
    } catch (e) {
      console.error(e);
      setErrorMsg('Matchmaking jarayonida xatolik yuz berdi.');
      setQueuing(false);
    }
  };

  // ── Host: create room ────────────────────────────────────────────────────
  const setupRoomAsHost = async (rid, hostName) => {
    const roomRef = ref(db, `practice_rooms/${rid}`);
    const sourceWords = wordsRef.current;

    let selected = [];
    if (sourceWords && sourceWords.length >= 4) {
      selected = [...sourceWords].sort(() => Math.random() - 0.5).slice(0, 10);
    }
    if (selected.length < 10) {
      const pool = [...DEFAULT_POOL].sort(() => Math.random() - 0.5);
      for (const d of pool) {
        if (selected.length >= 10) break;
        if (!selected.some(w => w.word.toLowerCase() === d.word.toLowerCase())) {
          selected.push({ id: 'def_' + Math.random().toString(36).substring(2, 6), ...d });
        }
      }
    }

    const allPool = (sourceWords && sourceWords.length >= 4) ? sourceWords : DEFAULT_POOL;
    const duelWords = selected.map(w => {
      const distractors = [];
      const shuffled = [...allPool].sort(() => Math.random() - 0.5);
      for (const item of shuffled) {
        if (distractors.length >= 3) break;
        const trans = item.translation || item.uzbek;
        if (trans && trans.toLowerCase() !== w.translation.toLowerCase() && !distractors.includes(trans)) {
          distractors.push(trans);
        }
      }
      while (distractors.length < 3) {
        distractors.push('Tarjima ' + Math.random().toString(36).substring(2, 6));
      }
      const options = [w.translation, ...distractors].sort(() => Math.random() - 0.5);
      return { word: w.word, definition: w.definition || '', options, correct: options.indexOf(w.translation) };
    });

    const initState = {
      status: 'waiting',
      player1: { uid: user.uid, name: hostName, score: 0, answers: {} },
      player2: null,
      currentRound: 0,
      totalRounds: 10,
      words: duelWords,
      roundStartTime: 0,
      lastUpdated: Date.now()
    };

    await set(roomRef, initState);
    onDisconnect(roomRef).remove();

    // When challenger joins, start the game
    const p2Ref = ref(db, `practice_rooms/${rid}/player2`);
    onValue(p2Ref, (snap) => {
      if (snap.exists() && snap.val() !== null) {
        update(roomRef, { status: 'ongoing', roundStartTime: Date.now() });
      }
    });

    listenToRoom(rid);
  };

  // ── Challenger: join room ────────────────────────────────────────────────
  const joinRoomAsChallenger = async (rid, name) => {
    await set(ref(db, `practice_rooms/${rid}/player2`), { uid: user.uid, name, score: 0, answers: {} });
    onDisconnect(ref(db, `practice_rooms/${rid}/player2`)).remove();
    listenToRoom(rid);
  };

  // ── Listen to room changes ───────────────────────────────────────────────
  const listenToRoom = (rid) => {
    onValue(ref(db, `practice_rooms/${rid}`), (snap) => {
      const state = snap.val();
      if (!state) {
        setRoomState(null);
        setDisconnectedPartner(true);
        return;
      }
      if (state.status === 'ongoing' && state.player1.uid === user.uid && !state.player2) {
        setDisconnectedPartner(true);
        return;
      }
      roomStateRef.current = state;
      setRoomState(state);
      setQueuing(false);
    });
  };

  // ── Timer: runs when round changes ───────────────────────────────────────
  useEffect(() => {
    if (!roomState || roomState.status !== 'ongoing') return;

    // Reset answer state for the new round
    hasAnsweredRef.current = false;
    setHasAnswered(false);
    setSelectedAnswerIdx(null);
    setShowRoundResults(false);

    const word = roomState.words[roomState.currentRound];
    if (word) speakWord(word.word);

    const startTime = roomState.roundStartTime;

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const remaining = Math.max(0, 10 - Math.floor(elapsed));
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        if (!hasAnsweredRef.current) {
          submitAnswer(-1, true);
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [roomState?.currentRound, roomState?.status, roomState?.roundStartTime]);

  // ── Round advance: runs when BOTH players have answered ──────────────────
  useEffect(() => {
    if (!roomState || roomState.status !== 'ongoing') return;
    if (!roomState.player2) return; // wait for player2

    const round = roomState.currentRound;
    const p1Ans = roomState.player1?.answers?.[round];
    const p2Ans = roomState.player2?.answers?.[round];

    if (!p1Ans || !p2Ans) return; // not both answered yet

    setShowRoundResults(true);

    const timer = setTimeout(async () => {
      setShowRoundResults(false);
      if (isHostRef.current) {
        const rid = roomIdRef.current;
        const nextRound = round + 1;
        const isFinished = nextRound >= (roomState.totalRounds || 10);
        await update(ref(db, `practice_rooms/${rid}`), {
          currentRound: nextRound,
          status: isFinished ? 'finished' : 'ongoing',
          roundStartTime: Date.now()
        });
      }
    }, 2500);

    return () => clearTimeout(timer);
    // Stringify answers so React can diff properly
  }, [
    JSON.stringify(roomState?.player1?.answers),
    JSON.stringify(roomState?.player2?.answers),
    roomState?.currentRound
  ]);

  // ── End-game sounds ──────────────────────────────────────────────────────
  useEffect(() => {
    if (roomState?.status === 'finished' && !soundPlayedRef.current) {
      soundPlayedRef.current = true;
      const amP1 = roomState.player1?.uid === user.uid;
      const mine = amP1 ? roomState.player1 : roomState.player2;
      const opp  = amP1 ? roomState.player2 : roomState.player1;
      const won  = (mine?.score || 0) > (opp?.score || 0);
      const draw = (mine?.score || 0) === (opp?.score || 0);
      if (won || draw) { playSound('victory'); triggerVibration('victory'); }
      else             { playSound('wrong');   triggerVibration('wrong'); }
    } else if (roomState?.status !== 'finished') {
      soundPlayedRef.current = false;
    }
  }, [roomState?.status]);

  // ── Submit answer ────────────────────────────────────────────────────────
  const submitAnswer = async (idx, isTimeout = false) => {
    if (hasAnsweredRef.current) return;
    hasAnsweredRef.current = true;
    setHasAnswered(true);
    setSelectedAnswerIdx(idx);

    const state = roomStateRef.current;
    if (!state) return;

    const amP1      = state.player1.uid === user.uid;
    const playerKey = amP1 ? 'player1' : 'player2';
    const word      = state.words[state.currentRound];
    const isCorrect = !isTimeout && idx === word.correct;

    let points = 0;
    if (isCorrect) {
      points = Math.round(100 + (timeLeft * 10));
      playSound('correct'); triggerVibration('correct');
    } else {
      playSound('wrong'); triggerVibration('wrong');
    }

    const rid = roomIdRef.current;
    await set(ref(db, `practice_rooms/${rid}/${playerKey}/answers/${state.currentRound}`), {
      choiceIdx: idx, points, correct: isCorrect
    });
    await runTransaction(ref(db, `practice_rooms/${rid}/${playerKey}/score`), (cur) => (cur || 0) + points);
  };

  const handleSelectAnswer = (idx) => submitAnswer(idx, false);

  // ── Return to lobby ──────────────────────────────────────────────────────
  const handleReturnLobby = () => {
    leaveRoom();
    setRoomId(null);
    setRoomState(null);
    setQueuing(false);
    setErrorMsg('');
    onComplete({ totalWords: 10, correctCount: 0, incorrectCount: 0 });
  };

  // Render Queueing Screen
  if (queuing || (roomState && roomState.status === 'waiting')) {
    return (
      <div className="duel-lobby-screen">
        <div className="duel-lobby-content">
          <div className="duel-lobby-radar">
            <div className="radar-circle circle-1"></div>
            <div className="radar-circle circle-2"></div>
            <div className="radar-circle circle-3"></div>
            <span className="radar-icon">⚔️</span>
          </div>
          <h2>Raqib qidirilmoqda...</h2>
          <p>Tizim mos keladigan raqib bilan bog'lanmoqda</p>
          <button className="duel-lobby-cancel-btn" onClick={handleReturnLobby}>
            Bekor qilish
          </button>
        </div>
      </div>
    );
  }

  // Render Disconnected Partner Overlay
  if (disconnectedPartner) {
    return (
      <div className="duel-disconnected-screen">
        <div className="duel-disconnected-card">
          <span className="disconnected-icon">💀</span>
          <h2>Alohada uzilish</h2>
          <p>Raqib o'yinni tark etdi yoki aloqa uzildi. Duel yakunlandi.</p>
          <button className="duel-lobby-return-btn" onClick={handleReturnLobby}>
            Menyuga qaytish
          </button>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="duel-lobby-screen">
        <div className="duel-lobby-content">
          <h2>Xatolik!</h2>
          <p>{errorMsg}</p>
          <button className="duel-lobby-return-btn" onClick={handleReturnLobby}>
            Menyuga qaytish
          </button>
        </div>
      </div>
    );
  }

  if (!roomState) return null;

  // Derive identity from roomState directly — isHost state may lag behind
  const isPlayer1 = roomState.player1?.uid === user.uid;
  const myData = isPlayer1 ? roomState.player1 : (roomState.player2 || roomState.player1);
  const opData = isPlayer1 ? (roomState.player2 || roomState.player1) : roomState.player1;

  if (roomState.status === 'finished') {
    const iWon = myData.score > opData.score;
    const isDraw = myData.score === opData.score;

    return (
      <div className="duel-finished-screen">
        <motion.div 
          className="duel-finished-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <span className="finished-badge">
            {isDraw ? '🤝' : iWon ? '🏆' : '💀'}
          </span>
          <h2>
            {isDraw ? 'Durang!' : iWon ? 'Siz g\'alaba qozondingiz!' : 'Siz mag\'lub bo\'ldingiz'}
          </h2>
          <p className="finished-sub">Word Battle bellashuvi yakunlandi</p>
          
          <div className="finished-scores">
            <div className="finished-score-row my-score">
              <span>Siz ({myData.name})</span>
              <span>{myData.score} ball</span>
            </div>
            <div className="finished-score-row op-score">
              <span>Raqib ({opData.name})</span>
              <span>{opData.score} ball</span>
            </div>
          </div>

          <button className="duel-finished-return-btn" onClick={handleReturnLobby}>
            Lobbyga qaytish
          </button>
        </motion.div>
      </div>
    );
  }

  const activeWordObj = roomState.words[roomState.currentRound];
  if (!activeWordObj) return null;

  const myAnswer = myData.answers?.[roomState.currentRound];
  const opAnswer = opData.answers?.[roomState.currentRound];

  return (
    <div className="duel-game-screen">
      {/* Scoreboard */}
      <div className="duel-scoreboard">
        <div className="scoreboard-player player-me">
          <div className="player-avatar">{myData.name[0]?.toUpperCase()}</div>
          <div className="player-info">
            <span className="player-name">{myData.name} (Siz)</span>
            <span className="player-score-val">{myData.score} ball</span>
          </div>
          {myAnswer !== undefined && (
            <span className={`player-status-dot ${myAnswer.correct ? 'correct' : 'wrong'}`}>
              {myAnswer.correct ? '✓' : '✗'}
            </span>
          )}
        </div>
        
        <div className="scoreboard-vs">VS</div>

        <div className="scoreboard-player player-op">
          {opAnswer !== undefined && (
            <span className={`player-status-dot ${opAnswer.correct ? 'correct' : 'wrong'}`}>
              {opAnswer.correct ? '✓' : '✗'}
            </span>
          )}
          <div className="player-info">
            <span className="player-name">{opData.name}</span>
            <span className="player-score-val">{opData.score} ball</span>
          </div>
          <div className="player-avatar op">{opData.name[0]?.toUpperCase()}</div>
        </div>
      </div>

      {/* Progress & Timer */}
      <div className="duel-progress-bar-wrap">
        <div className="duel-round-num">Round {roomState.currentRound + 1} / {roomState.totalRounds}</div>
        <div className="duel-timer-container">
          <svg className="timer-svg" viewBox="0 0 36 36">
            <path
              className="timer-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={`timer-progress ${timeLeft < 4 ? 'danger' : timeLeft < 7 ? 'warning' : 'safe'}`}
              strokeDasharray={`${(timeLeft / 10) * 100}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="timer-text">{timeLeft}</span>
        </div>
      </div>

      {/* Word Box */}
      <div className="duel-word-box">
        <span className="duel-word-audio-btn" onClick={() => speakWord(activeWordObj.word)} title="Eshitish">🔊</span>
        <h1 className="duel-word-text">{activeWordObj.word}</h1>
        {activeWordObj.definition && (
          <p className="duel-word-def">"{activeWordObj.definition}"</p>
        )}
      </div>

      {/* Options Grid */}
      <div className="duel-options-grid">
        {activeWordObj.options.map((opt, idx) => {
          let className = 'duel-option-btn';
          
          if (hasAnswered) {
            if (idx === selectedAnswerIdx) {
              className += ' selected';
            }
            if (showRoundResults) {
              if (idx === activeWordObj.correct) {
                className += ' correct';
              } else if (idx === selectedAnswerIdx) {
                className += ' wrong';
              }
            }
          }

          return (
            <button
              key={idx}
              className={className}
              onClick={() => handleSelectAnswer(idx)}
              disabled={hasAnswered}
            >
              <span className="option-text">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Round Result Modal Overlay */}
      <AnimatePresence>
        {showRoundResults && (
          <motion.div 
            className="duel-round-results-overlay"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="round-result-card">
              <h3>Raund natijalari</h3>
              <div className="round-result-row">
                <span>Siz:</span>
                <span className={myAnswer?.correct ? 'res-correct' : 'res-wrong'}>
                  {myAnswer?.correct ? `+${myAnswer.points} ball` : 'Xato'}
                </span>
              </div>
              <div className="round-result-row">
                <span>Raqib:</span>
                <span className={opAnswer?.correct ? 'res-correct' : 'res-wrong'}>
                  {opAnswer?.correct ? `+${opAnswer.points} ball` : 'Xato'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
