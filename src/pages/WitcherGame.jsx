import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DEFAULT_STATE, saveGame, loadGame, deleteSave, autoSave, listSaves,
  applyConsequences, applyPostCombat, getNextValidIndex, formatDate, episodeLabel,
} from '../data/witcher/gameEngine';
import { getEpisode, EPISODE_LIST, getEpisodeNumber, isEpisodeFullyWritten } from '../data/witcher/episodes/index';
import { witcherAudio } from '../utils/witcherAudio';
import './WitcherGame.css';


const BG_IMAGES = {
  village: '/witcher/village_night.png',
  swamp:   '/witcher/swamp_night.png',
  cave:    '/witcher/cave_interior.png',
  menu:    '/witcher/menu_bg.png',
};
const PORTRAITS = {
  geralt:       '/witcher/geralt_portrait.png',
  hadrick:      '/witcher/hadrick_portrait.png',
  finn:         '/witcher/finn_portrait.png',
  cursed_woman: '/witcher/cursed_woman_portrait.png',
  drowner:      '/witcher/drowner_portrait.png',
};
const ENEMY_IMAGES = {
  'Drowner':       '/witcher/drowner_portrait.png',
  'Drowner Elder': '/witcher/drowner_portrait.png',
};
const CHOICE_TYPE_LABELS = {
  flavor:  { label: 'Dialogue Choice', color: '#4a9eff' },
  tactical:{ label: 'Tactical Choice', color: '#e67e22' },
  moral:   { label: '⚠ Major Decision', color: '#e74c3c' },
};

// ─────────────────────────────────────────────────────────────────────────────
export default function WitcherGame() {
  const navigate = useNavigate();
  const [screen, setScreen]           = useState('menu');   // menu|saves|narrative|combat|episodes|gameover
  const [saves, setSaves]             = useState(listSaves);
  const [gameState, setGameState]     = useState(null);
  const [activeSaveSlot, setActiveSaveSlot] = useState(null);
  const [episodeId, setEpisodeId]     = useState('ep01');
  const [nodeIndex, setNodeIndex]     = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [words, setWords] = useState([]);
  const [textComplete, setTextComplete] = useState(false);
  const [combatSetup, setCombatSetup] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [saveToast, setSaveToast]     = useState(null); // 'saved' | 'error' | null
  const [showSaveSlots, setShowSaveSlots] = useState(false);
  const [narrativeShake, setNarrativeShake] = useState(false);
  const [narrativeFlash, setNarrativeFlash] = useState(false);
  const fallbackIntervalRef = useRef(null);

  const [voiceoverEnabled, setVoiceoverEnabled] = useState(() => {
    return localStorage.getItem('witcher_voiceover') !== 'false';
  });
  const activeAudioRef = useRef(null);

  const episode     = getEpisode(episodeId);
  const nodes       = episode?.nodes ?? [];
  const currentNode = nodes[nodeIndex] ?? null;
  const currentBg   = currentNode?.bg ?? 'village';

  const nextNodeIndex = getNextValidIndex(nodes, nodeIndex + 1, gameState?.flags ?? {});
  const isMonsterNear = nextNodeIndex !== -1 && nodes[nextNodeIndex]?.type === 'combat';

  useEffect(() => {
    if (isMonsterNear && screen === 'narrative') {
      witcherAudio.playRattle();
    }
  }, [isMonsterNear, screen]);

  const triggerNarrativeDamage = () => {
    setNarrativeShake(true);
    setNarrativeFlash(true);
    witcherAudio.playDamage();
    setTimeout(() => setNarrativeShake(false), 500);
    setTimeout(() => setNarrativeFlash(false), 600);
  };


  // ── Unified Text Highlighting & Voiceover Sync ──────────────────────────────
  useEffect(() => {
    // 1. Clean up previous audio & fallback intervals
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }
    if (fallbackIntervalRef.current) {
      clearInterval(fallbackIntervalRef.current);
      fallbackIntervalRef.current = null;
    }

    if (!currentNode || screen !== 'narrative' || currentNode.type === 'choice' || currentNode.type === 'combat') {
      setCurrentWordIndex(-1);
      setWords([]);
      setTextComplete(true);
      return;
    }

    // 2. Parse text into words list
    const rawText = currentNode.text ?? '';
    const cleanText = rawText.replace(/\[.*?\]/g, '').trim();
    const wordsList = cleanText ? cleanText.split(/\s+/) : [];
    setWords(wordsList);
    setCurrentWordIndex(-1);
    setTextComplete(false);

    if (wordsList.length === 0) {
      setTextComplete(true);
      return;
    }

    // 3. Fallback reading speed simulation helper
    const startFallbackTimer = (list) => {
      if (fallbackIntervalRef.current) clearInterval(fallbackIntervalRef.current);
      let idx = 0;
      fallbackIntervalRef.current = setInterval(() => {
        setCurrentWordIndex(idx);
        idx++;
        if (idx >= list.length) {
          clearInterval(fallbackIntervalRef.current);
          setTextComplete(true);
        }
      }, 250); // ~240 words per minute
    };

    // 4. Play voiceover if enabled, otherwise fallback to timer
    if (voiceoverEnabled) {
      const audioUrl = `/witcher/audio/${episodeId}/${currentNode.id}.mp3`;
      const jsonUrl = `/witcher/audio/${episodeId}/${currentNode.id}.json`;
      const audio = new Audio(audioUrl);
      activeAudioRef.current = audio;

      let timings = null;
      let timingFetchFinished = false;

      // Start prefetching the timings JSON
      fetch(jsonUrl)
        .then(res => {
          if (!res.ok) throw new Error("No timings metadata");
          return res.json();
        })
        .then(data => {
          timings = data;
          timingFetchFinished = true;
        })
        .catch(() => {
          timingFetchFinished = true;
          // timings remains null, fallback to linear
        });

      const handleTimeUpdate = () => {
        if (audio.duration && !audio.paused) {
          if (timings && timings.length > 0) {
            // Find the word active at the current timestamp
            let activeIdx = -1;
            for (let i = 0; i < timings.length; i++) {
              if (audio.currentTime >= timings[i].start) {
                activeIdx = i;
              }
            }
            setCurrentWordIndex(activeIdx);
          } else if (timingFetchFinished) {
            // Linear approximation fallback if timings failed to load or are empty
            const progress = audio.currentTime / audio.duration;
            const idx = Math.min(wordsList.length - 1, Math.floor(progress * wordsList.length));
            setCurrentWordIndex(idx);
          }
        }
      };

      const handleEnded = () => {
        setCurrentWordIndex(wordsList.length);
        setTextComplete(true);
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      audio.play().catch(err => {
        console.warn("Failed to play voiceover, falling back to timer:", err);
        startFallbackTimer(wordsList);
      });
    } else {
      startFallbackTimer(wordsList);
    }

    return () => {
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
      }
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeIndex, episodeId, screen, voiceoverEnabled]);

  // ── Advance node with condition skipping ─────────────────────────────────────
  const advanceNode = useCallback((fromIndex, flags) => {
    const next = getNextValidIndex(nodes, fromIndex + 1, flags ?? gameState?.flags ?? {});
    if (next === -1) {
      // Episode complete — for now just show menu
      handleEpisodeComplete();
    } else {
      const nextNode = nodes[next];
      if (nextNode?.type === 'combat') {
        launchCombat(nextNode, next, flags ?? gameState?.flags ?? {});
      } else {
        setNodeIndex(next);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, gameState]);

  const handleScreenClick = () => {
    if (screen !== 'narrative' || !currentNode) return;
    if (currentNode.type === 'choice') return;
    if (!textComplete) {
      // Skip active reading / voiceover and reveal all text instantly
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
      }
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
      }
      setCurrentWordIndex(words.length);
      setTextComplete(true);
      return;
    }
    if (currentNode.type === 'cliffhanger') {
      handleEpisodeComplete();
      return;
    }
    advanceNode(nodeIndex, gameState?.flags ?? {});
  };

  const handleChoice = (option) => {
    const oldHp = gameState?.character?.currentHp ?? 100;
    const newState = applyConsequences(gameState, option.consequences);
    const newHp = newState?.character?.currentHp ?? 100;
    if (newHp < oldHp) {
      triggerNarrativeDamage();
    }
    setGameState(newState);
    autoSave({ ...newState, currentEpisode: episodeId, nodeIndex });
    advanceNode(nodeIndex, newState.flags);
  };

  // ── Combat launcher ──────────────────────────────────────────────────────────
  const launchCombat = (combatNode, idx, flags) => {
    const hpFactor = combatNode.hpFactorFlag ? (flags[combatNode.hpFactorFlag] ?? 1) : 1;
    const enemies = combatNode.enemies.map(e => ({
      ...e,
      currentHp: Math.round(e.maxHp * hpFactor),
    }));
    setCombatSetup({ combatNode, nodeIndex: idx, enemies });
    setScreen('combat');
  };

  const handleCombatWin = (result) => {
    const newState = applyPostCombat(gameState, result);
    setGameState(newState);
    autoSave({ ...newState, currentEpisode: episodeId, nodeIndex: combatSetup.nodeIndex });
    setCombatSetup(null);
    setScreen('narrative');
    advanceNode(combatSetup.nodeIndex, newState.flags);
  };

  const handleCombatLose = () => {
    setCombatSetup(null);
    setScreen('gameover');
  };

  // ── In-game Save ─────────────────────────────────────────────────────────────
  const doSave = (slot) => {
    const data = { ...gameState, currentEpisode: episodeId, nodeIndex };
    saveGame(slot, data);
    autoSave(data);
    setSaves(listSaves());
    setSaveToast('saved');
    setShowSaveSlots(false);
    setTimeout(() => setSaveToast(null), 2000);
  };

  const handleSaveBtn = () => {
    if (activeSaveSlot !== null) {
      doSave(activeSaveSlot);
    } else {
      setShowSaveSlots(v => !v);
    }
  };

  // ── Episode complete ─────────────────────────────────────────────────────────
  const handleEpisodeComplete = () => {
    setScreen('menu');
    setSaves(listSaves());
  };

  // ── Save slot actions ────────────────────────────────────────────────────────
  const startNewGame = (slot) => {
    const fresh = { ...DEFAULT_STATE };
    saveGame(slot, { ...fresh, currentEpisode: 'ep01', nodeIndex: 0 });
    setGameState(fresh);
    setActiveSaveSlot(slot);
    setEpisodeId('ep01');
    setNodeIndex(0);
    setScreen('narrative');
    setSaves(listSaves());
  };

  const loadSlot = (slot) => {
    const data = loadGame(slot);
    if (!data) return;
    setGameState(data);
    setActiveSaveSlot(slot);
    setEpisodeId(data.currentEpisode ?? 'ep01');
    setNodeIndex(data.nodeIndex ?? 0);
    setScreen('narrative');
  };

  const handleDeleteSave = (slot) => {
    deleteSave(slot);
    setSaves(listSaves());
    setShowDeleteConfirm(null);
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════════════
  return (
    <div className={`wg-root ${narrativeShake ? 'shake' : ''}`} onClick={handleScreenClick}>
      {narrativeFlash && <div className="wg-narrative-damage-flash" />}
      {gameState && (gameState.character.currentHp / gameState.character.maxHp <= 0.3) && (
        <div className="wg-low-hp-vignette" />
      )}
      <AnimatePresence mode="wait">
        {screen === 'menu'      && <MenuScreen      key="menu"      saves={saves} onNewGame={() => setScreen('saves')} onLoad={loadSlot} onEpisodes={() => setScreen('episodes')} onBack={() => navigate('/')} showDelete={showDeleteConfirm} setShowDelete={setShowDeleteConfirm} onDeleteConfirm={handleDeleteSave} />}
        {screen === 'saves'     && <SaveSelectScreen key="saves"    saves={saves} onSelect={startNewGame} onLoad={loadSlot} onBack={() => setScreen('menu')} showDelete={showDeleteConfirm} setShowDelete={setShowDeleteConfirm} onDeleteConfirm={handleDeleteSave} />}
        {screen === 'narrative' && <NarrativeScreen  key="narrative" node={currentNode} episode={episode} words={words} currentWordIndex={currentWordIndex} textComplete={textComplete} bg={currentBg} gameState={gameState} onChoice={handleChoice} onSave={handleSaveBtn} saveToast={saveToast} showSaveSlots={showSaveSlots} onPickSlot={doSave} onCloseSaveSlots={() => setShowSaveSlots(false)} voiceoverEnabled={voiceoverEnabled} onToggleVoiceover={() => {
          const next = !voiceoverEnabled;
          setVoiceoverEnabled(next);
          localStorage.setItem('witcher_voiceover', String(next));
          if (!next && activeAudioRef.current) {
            activeAudioRef.current.pause();
          }
        }} isMonsterNear={isMonsterNear} />}
        {screen === 'combat'    && <CombatScreen      key="combat"   setup={combatSetup} gameState={gameState} onWin={handleCombatWin} onLose={handleCombatLose} />}
        {screen === 'episodes'  && <EpisodeSelectScreen key="episodes" gameState={gameState} onSelect={(id) => { setEpisodeId(id); setNodeIndex(0); setScreen('narrative'); }} onBack={() => setScreen('menu')} />}
        {screen === 'gameover'  && <GameOverScreen   key="gameover"  onRetry={() => { setNodeIndex(combatSetup?.nodeIndex ?? 0); setScreen('narrative'); }} onMenu={() => setScreen('menu')} />}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MENU SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function MenuScreen({ saves, onNewGame, onLoad, onEpisodes, onBack, showDelete, setShowDelete, onDeleteConfirm }) {
  const hasAnySave = saves.some(Boolean);
  return (
    <motion.div className="wg-screen wg-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => e.stopPropagation()}>
      <div className="wg-menu-bg" style={{ backgroundImage: `url('/witcher/menu_bg.png')` }} />
      <div className="wg-fog" />
      <div className="wg-menu-content">
        <div className="wg-logo">
          <span className="wg-logo-main">WITCHER</span>
        </div>

        <div className="wg-menu-saves">
          {[0,1,2].map(slot => {
            const s = saves[slot];
            return (
              <div key={slot} className={`wg-save-card ${s ? 'filled' : 'empty'}`}>
                {s ? (
                  <>
                    <div className="wg-save-ep">Episode {getEpisodeNumber(s.currentEpisode ?? 'ep01')}</div>
                    <div className="wg-save-info">
                      <span>⚔️ Lv.{s.character?.level ?? 1}</span>
                      <span>💰 {s.character?.gold ?? 0}g</span>
                      <span>❤️ {s.character?.currentHp ?? 100}hp</span>
                    </div>
                    <div className="wg-save-date">{formatDate(s.lastPlayed)}</div>
                    <div className="wg-save-actions">
                      <button className="wg-btn wg-btn-primary" onClick={() => onLoad(slot)}>Continue</button>
                      {showDelete === slot ? (
                        <>
                          <button className="wg-btn wg-btn-danger" onClick={() => onDeleteConfirm(slot)}>Delete?</button>
                          <button className="wg-btn wg-btn-ghost" onClick={() => setShowDelete(null)}>Cancel</button>
                        </>
                      ) : (
                        <button className="wg-btn wg-btn-ghost" onClick={() => setShowDelete(slot)}>🗑</button>
                      )}
                    </div>
                  </>
                ) : (
                  <button className="wg-save-new" onClick={onNewGame}>
                    <span className="wg-save-plus">+</span>
                    <span>New Game</span>
                    <span className="wg-save-slot-num">Slot {slot + 1}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="wg-menu-btns">
          {hasAnySave && <button className="wg-btn wg-btn-outline" onClick={onEpisodes}>📖 Episodes</button>}
          <button className="wg-btn wg-btn-ghost small" onClick={onBack}>← Back to VOC</button>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SAVE SELECT SCREEN (for new game slot pick)
// ─────────────────────────────────────────────────────────────────────────────
function SaveSelectScreen({ saves, onSelect, onBack }) {
  return (
    <motion.div className="wg-screen wg-saves-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => e.stopPropagation()}>
      <div className="wg-saves-bg" style={{ backgroundImage: `url('/witcher/menu_bg.png')` }} />
      <div className="wg-fog" />
      <div className="wg-saves-content">
        <h2 className="wg-saves-title">Choose Save Slot</h2>
        <div className="wg-saves-grid">
          {[0,1,2].map(slot => {
            const s = saves[slot];
            return (
              <button key={slot} className={`wg-save-select-card ${s ? 'has-data' : ''}`} onClick={() => onSelect(slot)}>
                <div className="wg-save-select-num">Slot {slot + 1}</div>
                {s ? (
                  <>
                    <div className="wg-save-select-warn">⚠️ Overwrite save?</div>
                    <div className="wg-save-select-ep">Episode {getEpisodeNumber(s.currentEpisode ?? 'ep01')}</div>
                    <div className="wg-save-select-date">{formatDate(s.lastPlayed)}</div>
                  </>
                ) : (
                  <div className="wg-save-select-empty">Empty — Start Here</div>
                )}
              </button>
            );
          })}
        </div>
        <button className="wg-btn wg-btn-ghost" onClick={onBack}>← Back</button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NARRATIVE SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function NarrativeScreen({ node, episode, words, currentWordIndex, textComplete, bg, gameState, onChoice, onSave, saveToast, showSaveSlots, onPickSlot, onCloseSaveSlots, voiceoverEnabled, onToggleVoiceover, isMonsterNear }) {
  if (!node) return null;
  const isChoice      = node.type === 'choice';
  const isDialogue    = node.type === 'dialogue';
  const isCliffhanger = node.type === 'cliffhanger';
  const choiceMeta    = isChoice ? CHOICE_TYPE_LABELS[node.choiceType] : null;

  return (
    <motion.div className="wg-screen wg-narrative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Background */}
      <div className="wg-scene-bg" style={{ backgroundImage: `url('${BG_IMAGES[bg] ?? BG_IMAGES.village}')` }} />
      <div className="wg-scene-overlay" />

      {/* Save Toast */}
      <AnimatePresence>
        {saveToast && (
          <motion.div className="wg-save-toast"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
          >
            💾 Saved!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Slot Picker (when no active slot) */}
      <AnimatePresence>
        {showSaveSlots && (
          <motion.div className="wg-save-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={e => { e.stopPropagation(); onCloseSaveSlots(); }}
          >
            <motion.div className="wg-save-picker" initial={{ scale: 0.9 }} animate={{ scale: 1 }}
               onClick={e => e.stopPropagation()}
            >
              <div className="wg-save-picker-title">Save to slot</div>
              <div className="wg-save-picker-slots">
                {[0,1,2].map(slot => (
                  <button key={slot} className="wg-save-picker-btn" onClick={() => onPickSlot(slot)}>
                    <span>Slot {slot + 1}</span>
                  </button>
                ))}
              </div>
              <button className="wg-btn wg-btn-ghost" onClick={onCloseSaveSlots}>Cancel</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD */}
      <div className="wg-hud">
        <div className="wg-hud-left">
          <svg className={`wg-medallion-svg ${isMonsterNear ? 'rattle-active' : ''}`} viewBox="0 0 100 100" width="36" height="36" fill="currentColor">
            <path d="M50,10 L75,35 L65,45 L75,70 L50,85 L25,70 L35,45 L25,35 Z" fill="none" stroke="#f5d78e" strokeWidth="2"/>
            <path d="M50,10 L50,85 M25,35 L75,35 M35,45 L65,45 M25,70 L75,70" stroke="#f5d78e" strokeDasharray="1,3" strokeWidth="1"/>
            <polygon points="42,38 48,39 45,43" fill="#ff3333"/>
            <polygon points="58,38 52,39 55,43" fill="#ff3333"/>
            <polygon points="46,55 50,70 48,55" fill="#f5d78e"/>
            <polygon points="54,55 50,70 52,55" fill="#f5d78e"/>
          </svg>
          <div className="wg-hud-ep">Ep {getEpisodeNumber(episode.id)} · {episode?.title}</div>
        </div>
        {gameState && (
          <div className="wg-hud-stats">
            <HpBar current={gameState.character.currentHp} max={gameState.character.maxHp} />
            <div className="wg-hud-gold">
              <svg className="wg-coin-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="8" fill="#f5d78e" stroke="#c4a84a"/>
                <path d="M12 8v8M10 10h4M10 14h4" stroke="#000" strokeWidth="1.5"/>
              </svg>
              <span>{gameState.character.gold}g</span>
            </div>
            <button className={`wg-hud-voice-btn ${voiceoverEnabled ? 'active' : 'muted'}`} onClick={e => { e.stopPropagation(); onToggleVoiceover(); }} title="Toggle Voiceover">
              {voiceoverEnabled ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              )}
            </button>
            <button className="wg-hud-save-btn" onClick={e => { e.stopPropagation(); onSave(); }} title="Save game">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" fill="currentColor"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Portrait (dialogue) */}
      <AnimatePresence>
        {isDialogue && node.portrait && (
          <motion.div className="wg-portrait" key={node.speaker}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          >
            <img src={PORTRAITS[node.portrait] ?? PORTRAITS.geralt} alt={node.speaker} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text Box */}
      {!isChoice && (
        <motion.div className={`wg-textbox ${isCliffhanger ? 'cliffhanger' : ''}`}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        >
          {isDialogue && <div className="wg-speaker-name">{node.speaker}</div>}
          {isCliffhanger && <div className="wg-cliffhanger-label">⚡ CLIFFHANGER</div>}
          <p className={`wg-text ${isDialogue ? 'dialogue' : 'narration'} ${isCliffhanger ? 'cliffhanger-text' : ''}`}>
            {words.map((word, idx) => {
              let className = "wg-word";
              if (idx < currentWordIndex) className += " read";
              else if (idx === currentWordIndex) className += " active";
              else className += " future";
              return <span key={idx} className={className}>{word} </span>;
            })}
            {!textComplete && <span className="wg-cursor">|</span>}
          </p>
          {textComplete && !isCliffhanger && (
            <div className="wg-advance-hint">▶</div>
          )}
          {textComplete && isCliffhanger && (
            <div className="wg-cliffhanger-footer">
              <span>Episode 2 coming soon...</span>
              <div className="wg-advance-hint">tap to exit</div>
            </div>
          )}
        </motion.div>
      )}

      {/* Choice Box */}
      {isChoice && (
        <motion.div className="wg-choicebox" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} onClick={e => e.stopPropagation()}>
          {choiceMeta && (
            <div className="wg-choice-type" style={{ color: choiceMeta.color }}>
              {choiceMeta.label}
            </div>
          )}
          <div className="wg-choice-prompt">{node.prompt}</div>
          <div className="wg-choices">
            {node.options.map(opt => (
              <button key={opt.id} className="wg-choice-btn" style={{ '--tag-color': opt.tagColor }}
                onClick={() => onChoice(opt)}
              >
                <span className="wg-choice-tag" style={{ background: opt.tagColor }}>{opt.tag}</span>
                <span className="wg-choice-text">{opt.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMBAT SCREEN
// ─────────────────────────────────────────────────────────────────────────────
// Gwent card collections database
const PLAYER_DECK = [
  { id: 'p_geralt', name: 'Geralt of Rivia', strength: 15, row: 'melee', type: 'hero', icon: '🐺', image: '/witcher/geralt_portrait.png', description: 'The White Wolf. Immune to weather.' },
  { id: 'p_ciri', name: 'Ciri', strength: 15, row: 'melee', type: 'hero', icon: '🗡️', image: '/witcher/cursed_woman_portrait.png', description: 'Child of Destiny. Immune to weather.' },
  { id: 'p_yen', name: 'Yennefer of Vengerberg', strength: 7, row: 'ranged', type: 'hero', icon: '🔮', image: '/witcher/cursed_woman_portrait.png', description: 'Medic: Revive a unit from discard.' },
  { id: 'p_vesemir', name: 'Vesemir', strength: 6, row: 'melee', type: 'unit', icon: '⚔️', image: '/witcher/hadrick_portrait.png', description: 'Old Witcher mentor.' },
  { id: 'p_duny', name: 'Duny', strength: 4, row: 'melee', type: 'unit', icon: '🛡️', image: '/witcher/finn_portrait.png', description: 'Urcheon of Erlenwald.' },
  { id: 'p_tem_1', name: 'Temerian Infantryman', strength: 3, row: 'melee', type: 'unit', icon: '⚔️', image: '/witcher/village_night.png', description: 'Loyal Temerian soldier.' },
  { id: 'p_tem_2', name: 'Temerian Infantryman', strength: 3, row: 'melee', type: 'unit', icon: '⚔️', image: '/witcher/village_night.png', description: 'Loyal Temerian soldier.' },
  { id: 'p_red_1', name: 'Redanian Foot Soldier', strength: 4, row: 'melee', type: 'unit', icon: '⚔️', image: '/witcher/village_night.png', description: 'Hardened Redanian guard.' },
  { id: 'p_kaed_1', name: 'Kaedweni Archer', strength: 5, row: 'ranged', type: 'unit', icon: '🏹', image: '/witcher/swamp_night.png', description: 'Expert marksman.' },
  { id: 'p_kaed_2', name: 'Kaedweni Archer', strength: 5, row: 'ranged', type: 'unit', icon: '🏹', image: '/witcher/swamp_night.png', description: 'Expert marksman.' },
  { id: 'p_crin_1', name: 'Crinfrid Reavers', strength: 6, row: 'ranged', type: 'unit', icon: '🏹', image: '/witcher/swamp_night.png', description: 'Dragon hunters.' },
  { id: 'p_treb_1', name: 'Siege Trebuchet', strength: 8, row: 'siege', type: 'unit', icon: '⚙️', image: '/witcher/cave_interior.png', description: 'Devastating siege engine.' },
  { id: 'p_cat_1', name: 'Catapult', strength: 8, row: 'siege', type: 'unit', icon: '⚙️', image: '/witcher/cave_interior.png', description: 'Launches giant burning rocks.' },
  { id: 'p_horn_1', name: 'Commander\'s Horn', strength: 0, row: 'special', type: 'horn', icon: '🎺', image: '/witcher/gwent_horn.png', description: 'Doubles strength of a row.' },
  { id: 'p_decoy_1', name: 'Decoy', strength: 0, row: 'special', type: 'decoy', icon: '🔄', image: '/witcher/gwent_decoy.png', description: 'Swap unit card back to hand.' },
  { id: 'p_frost', name: 'Biting Frost', strength: 0, row: 'weather', type: 'weather', icon: '❄️', image: '/witcher/gwent_frost.png', description: 'Sets Melee units to 1 strength.' },
  { id: 'p_fog', name: 'Impenetrable Fog', strength: 0, row: 'weather', type: 'weather', icon: '🌫️', image: '/witcher/gwent_fog.png', description: 'Sets Ranged units to 1 strength.' },
  { id: 'p_rain', name: 'Torrential Rain', strength: 0, row: 'weather', type: 'weather', icon: '🌧️', image: '/witcher/gwent_rain.png', description: 'Sets Siege units to 1 strength.' },
  { id: 'p_clear', name: 'Clear Weather', strength: 0, row: 'weather', type: 'weather', icon: '☀️', image: '/witcher/gwent_clear.png', description: 'Removes all weather conditions.' }
];

const ENEMY_DECK = [
  { id: 'e_leshen', name: 'Leshen', strength: 10, row: 'ranged', type: 'hero', icon: '🦌', image: '/witcher/cave_interior.png', description: 'Forest spirit. Immune to weather.' },
  { id: 'e_fiend', name: 'Fiend', strength: 8, row: 'melee', type: 'unit', icon: '👹', image: '/witcher/drowner_portrait.png', description: 'Terrifying horned beast.' },
  { id: 'e_fright', name: 'Frightener', strength: 8, row: 'melee', type: 'unit', icon: '👹', image: '/witcher/drowner_portrait.png', description: 'Golem-like monster.' },
  { id: 'e_elder', name: 'Drowner Elder', strength: 6, row: 'melee', type: 'unit', icon: '🐊', image: '/witcher/drowner_portrait.png', description: 'Alpha drowner.' },
  { id: 'e_drow_1', name: 'Drowner', strength: 4, row: 'melee', type: 'unit', icon: '🦎', image: '/witcher/drowner_portrait.png', description: 'Swamp lurker.' },
  { id: 'e_drow_2', name: 'Drowner', strength: 4, row: 'melee', type: 'unit', icon: '🦎', image: '/witcher/drowner_portrait.png', description: 'Swamp lurker.' },
  { id: 'e_ghoul_1', name: 'Ghoul', strength: 3, row: 'melee', type: 'unit', icon: '🧟', image: '/witcher/drowner_portrait.png', description: 'Grave feeder.' },
  { id: 'e_ghoul_2', name: 'Ghoul', strength: 3, row: 'melee', type: 'unit', icon: '🧟', image: '/witcher/drowner_portrait.png', description: 'Grave feeder.' },
  { id: 'e_grave', name: 'Grave Hag', strength: 5, row: 'ranged', type: 'unit', icon: '👵', image: '/witcher/drowner_portrait.png', description: 'Feeds on human marrow.' },
  { id: 'e_water', name: 'Water Hag', strength: 4, row: 'ranged', type: 'unit', icon: '🧙', image: '/witcher/drowner_portrait.png', description: 'Throws blinding mud.' },
  { id: 'e_foglet', name: 'Foglet', strength: 4, row: 'ranged', type: 'unit', icon: '👻', image: '/witcher/swamp_night.png', description: 'Lures prey into fog.' },
  { id: 'e_garg', name: 'Gargoyle', strength: 6, row: 'siege', type: 'unit', icon: '🗿', image: '/witcher/cave_interior.png', description: 'Living stone sentinel.' },
  { id: 'e_harpy', name: 'Harpy', strength: 4, row: 'ranged', type: 'unit', icon: '🦅', image: '/witcher/swamp_night.png', description: 'Scavenger bird.' },
  { id: 'e_frost', name: 'Biting Frost', strength: 0, row: 'weather', type: 'weather', icon: '❄️', image: '/witcher/gwent_frost.png', description: 'Sets Melee units to 1 strength.' },
  { id: 'e_horn', name: 'Commander\'s Horn', strength: 0, row: 'special', type: 'horn', icon: '🎺', image: '/witcher/gwent_horn.png', description: 'Doubles strength of a row.' },
];

const shuffleDeck = (deck) => [...deck].sort(() => Math.random() - 0.5);

const calcCardStrength = (card, row, activeWeather, hasHorn) => {
  if (card.type === 'hero') return card.strength;
  let s = card.strength;
  if (row === 'melee' && activeWeather.frost) s = 1;
  if (row === 'ranged' && activeWeather.fog) s = 1;
  if (row === 'siege' && activeWeather.rain) s = 1;
  if (hasHorn) s *= 2;
  return s;
};

const calcRowScore = (cards, row, activeWeather, hasHorn) => {
  return cards.reduce((acc, c) => acc + calcCardStrength(c, row, activeWeather, hasHorn), 0);
};

const calcTotalScore = (board, activeWeather, horns) => {
  return calcRowScore(board.melee, 'melee', activeWeather, horns.melee) +
         calcRowScore(board.ranged, 'ranged', activeWeather, horns.ranged) +
         calcRowScore(board.siege, 'siege', activeWeather, horns.siege);
};

const simulatePlayScore = (card, myBoard, activeWeather, horns) => {
  if (card.row !== 'melee' && card.row !== 'ranged' && card.row !== 'siege') {
    let simWeather = { ...activeWeather };
    let simHorns = { ...horns };
    if (card.type === 'weather') {
      if (card.id.includes('clear')) {
        simWeather = { frost: false, fog: false, rain: false };
      } else {
        const key = card.id.includes('frost') ? 'frost' : card.id.includes('fog') ? 'fog' : 'rain';
        simWeather[key] = true;
      }
    } else if (card.type === 'horn') {
      let bestRow = 'melee';
      let maxCount = myBoard.melee.length;
      if (myBoard.ranged.length > maxCount) {
        bestRow = 'ranged';
        maxCount = myBoard.ranged.length;
      }
      if (myBoard.siege.length > maxCount) {
        bestRow = 'siege';
      }
      simHorns[bestRow] = true;
    }
    return calcTotalScore(myBoard, simWeather, simHorns);
  } else {
    const simBoard = { ...myBoard, [card.row]: [...(myBoard[card.row] || []), card] };
    return calcTotalScore(simBoard, activeWeather, horns);
  }
};

function CombatScreen({ setup, gameState, onWin, onLose }) {
  const [playerHand, setPlayerHand] = useState(() => shuffleDeck(PLAYER_DECK).slice(0, 10));
  const [playerDeck, setPlayerDeck] = useState(() => shuffleDeck(PLAYER_DECK).slice(10));
  const [enemyHand, setEnemyHand]   = useState(() => shuffleDeck(ENEMY_DECK).slice(0, 10));
  const [enemyDeck, setEnemyDeck]   = useState(() => shuffleDeck(ENEMY_DECK).slice(10));

  const [playerBoard, setPlayerBoard] = useState({ melee: [], ranged: [], siege: [] });
  const [enemyBoard, setEnemyBoard]   = useState({ melee: [], ranged: [], siege: [] });

  const [weather, setWeather] = useState({ frost: false, fog: false, rain: false });
  const [playerHorns, setPlayerHorns] = useState({ melee: false, ranged: false, siege: false });
  const [enemyHorns, setEnemyHorns]   = useState({ melee: false, ranged: false, siege: false });

  const [playerPassed, setPlayerPassed] = useState(false);
  const [enemyPassed, setEnemyPassed]   = useState(false);

  const [playerGems, setPlayerGems] = useState(2);
  const [enemyGems, setEnemyGems]   = useState(2);
  const [roundNumber, setRoundNumber] = useState(1);

  const [playerDiscard, setPlayerDiscard] = useState([]);
  const [enemyDiscard, setEnemyDiscard]   = useState([]);

  const [turn, setTurn] = useState('player'); // player | enemy
  const [status, setStatus] = useState('ongoing'); // ongoing | victory | defeat

  const [activeDecoyTarget, setActiveDecoyTarget] = useState(null); // 'select_target' | null
  const [activeHornSelection, setActiveHornSelection] = useState(false);
  const [medicChoices, setMedicChoices] = useState(null);
  
  const [roundResultOverlay, setRoundResultOverlay] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const [log, setLog] = useState(() => [{ text: 'Gwent Contract begins. Draw your cards.', type: 'status' }]);
  const logEndRef = useRef(null);

  // Background Music loop
  useEffect(() => {
    let active = true;
    const bgMusic = new Audio('/witcher/audio/gwent_theme.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    
    bgMusic.play().then(() => {
      if (!active) {
        bgMusic.pause();
      }
    }).catch(err => {
      console.log("Gwent theme music not found or autoplay blocked by browser:", err);
    });

    return () => {
      active = false;
      bgMusic.pause();
    };
  }, []);

  const addGwentLog = (text, type) => {
    setLog(prev => [...prev.slice(-8), { text, type }]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  const drawCard = (count, isPlayer) => {
    if (isPlayer) {
      setPlayerDeck(prevDeck => {
        const toDraw = prevDeck.slice(0, count);
        setPlayerHand(prevHand => [...prevHand, ...toDraw]);
        return prevDeck.slice(count);
      });
    } else {
      setEnemyDeck(prevDeck => {
        const toDraw = prevDeck.slice(0, count);
        setEnemyHand(prevHand => [...prevHand, ...toDraw]);
        return prevDeck.slice(count);
      });
    }
  };

  const handleMedicSelect = (card) => {
    if (card.row === 'melee' || card.row === 'ranged' || card.row === 'siege') {
      setPlayerBoard(prev => ({
        ...prev,
        [card.row]: [...(prev[card.row] || []), card]
      }));
      setPlayerDiscard(prev => prev.filter(c => c.id !== card.id));
      setMedicChoices(null);
      witcherAudio.playCardPlace();
      addGwentLog(`Medic revived ${card.name} to ${card.row} row!`, 'player');
    } else {
      setMedicChoices(null);
    }

    if (enemyPassed) {
      setTurn('player');
    } else {
      setTurn('enemy');
    }
  };

  const playCard = (card) => {
    if (turn !== 'player' || playerPassed || status !== 'ongoing' || roundResultOverlay) return;

    if (card.type === 'weather') {
      if (card.id === 'p_clear') {
        setWeather({ frost: false, fog: false, rain: false });
        addGwentLog('You play Clear Weather ☀️', 'player');
      } else {
        const key = card.id === 'p_frost' ? 'frost' : card.id === 'p_fog' ? 'fog' : 'rain';
        setWeather(w => ({ ...w, [key]: true }));
        addGwentLog(`You play ${card.name} ${card.icon}`, 'player');
      }
      setPlayerHand(prev => prev.filter(c => c.id !== card.id));
      witcherAudio.playWeather();
      
      if (enemyPassed) {
        setTurn('player');
      } else {
        setTurn('enemy');
      }
    } else if (card.type === 'decoy') {
      if (activeDecoyTarget === 'select_target') {
        setActiveDecoyTarget(null);
      } else {
        setActiveDecoyTarget('select_target');
        addGwentLog('Select a non-hero unit from your board to swap.', 'status');
      }
    } else if (card.type === 'horn') {
      if (activeHornSelection) {
        setActiveHornSelection(false);
      } else {
        setActiveHornSelection(true);
        addGwentLog('Select a row horn slot to double its strength.', 'status');
      }
    } else if (card.row === 'melee' || card.row === 'ranged' || card.row === 'siege') {
      setPlayerBoard(prev => ({
        ...prev,
        [card.row]: [...(prev[card.row] || []), card]
      }));
      setPlayerHand(prev => prev.filter(c => c.id !== card.id));
      addGwentLog(`You play ${card.name} (${card.strength}) ${card.type === 'hero' ? '👑' : ''}`, 'player');
      witcherAudio.playCardPlace();

      if (card.id === 'p_yen') {
        const unitsInDiscard = playerDiscard.filter(c => c.type === 'unit' || c.type === 'hero');
        if (unitsInDiscard.length > 0) {
          setMedicChoices(unitsInDiscard);
          return;
        }
      }

      if (enemyPassed) {
        setTurn('player');
      } else {
        setTurn('enemy');
      }
    }
  };

  const handleBoardCardClick = (card, row) => {
    if (activeDecoyTarget !== 'select_target') return;
    if (card.type === 'hero') {
      addGwentLog('Cannot decoy a Hero card!', 'status');
      return;
    }

    setPlayerBoard(prev => ({
      ...prev,
      [row]: prev[row].filter(c => c.id !== card.id)
    }));
    setPlayerHand(prev => [...prev, card].filter(c => c.id !== 'p_decoy_1'));
    setActiveDecoyTarget(null);
    witcherAudio.playDecoy();
    addGwentLog(`You decoyed ${card.name} back to your hand.`, 'player');

    if (enemyPassed) {
      setTurn('player');
    } else {
      setTurn('enemy');
    }
  };

  const handleHornSlotClick = (row) => {
    if (!activeHornSelection) return;
    setPlayerHorns(prev => ({ ...prev, [row]: true }));
    setPlayerHand(prev => prev.filter(c => c.id !== 'p_horn_1'));
    setActiveHornSelection(false);
    witcherAudio.playHorn();
    addGwentLog(`You played Commander's Horn on your ${row} row 🎺`, 'player');

    if (enemyPassed) {
      setTurn('player');
    } else {
      setTurn('enemy');
    }
  };

  const handlePass = () => {
    if (turn !== 'player' || playerPassed || status !== 'ongoing' || roundResultOverlay) return;
    setPlayerPassed(true);
    addGwentLog('You pass the round.', 'player');
    witcherAudio.playPass();
    if (enemyPassed) {
      setTimeout(endRound, 1000);
    } else {
      setTurn('enemy');
    }
  };

  const executeEnemyPlay = (card) => {
    if (!card) return;
    setEnemyHand(prev => prev.filter(c => c.id !== card.id));

    if (card.row === 'weather' || card.type === 'weather') {
      const id = card.id || '';
      if (id.includes('clear')) {
        setWeather({ frost: false, fog: false, rain: false });
        addGwentLog('Enemy plays Clear Weather ☀️', 'enemy');
      } else {
        const key = id.includes('frost') ? 'frost' : id.includes('fog') ? 'fog' : id.includes('rain') ? 'rain' : null;
        if (key) {
          setWeather(w => ({ ...w, [key]: true }));
          addGwentLog(`Enemy plays ${card.name} ${card.icon || ''}`, 'enemy');
        } else {
          addGwentLog(`Enemy plays weather card ${card.name}`, 'enemy');
        }
      }
      witcherAudio.playWeather();
    } else if (card.type === 'horn') {
      let bestRow = 'melee';
      let maxCount = enemyBoard.melee.length;
      if (enemyBoard.ranged.length > maxCount) {
        bestRow = 'ranged';
        maxCount = enemyBoard.ranged.length;
      }
      if (enemyBoard.siege.length > maxCount) {
        bestRow = 'siege';
      }
      setEnemyHorns(prev => ({ ...prev, [bestRow]: true }));
      addGwentLog(`Enemy plays Commander's Horn on ${bestRow} 🎺`, 'enemy');
      witcherAudio.playHorn();
    } else if (card.type === 'decoy') {
      addGwentLog(`Enemy plays Decoy 🔄`, 'enemy');
      witcherAudio.playDecoy();
    } else if (card.row === 'melee' || card.row === 'ranged' || card.row === 'siege') {
      setEnemyBoard(prev => ({
        ...prev,
        [card.row]: [...(prev[card.row] || []), card]
      }));
      addGwentLog(`Enemy plays ${card.name} (${card.strength}) ${card.type === 'hero' ? '👑' : ''}`, 'enemy');
      witcherAudio.playCardPlace();
    } else {
      console.warn("AI played card with invalid row:", card);
      addGwentLog(`Enemy plays ${card.name}`, 'enemy');
    }

    if (playerPassed) {
      setTurn('enemy');
    } else {
      setTurn('player');
    }
  };

  const pickAISmartCard = (hand, myBoard, opBoard, activeWeather) => {
    const opMeleeStrength = calcRowScore(opBoard.melee, 'melee', activeWeather, playerHorns.melee);
    const frostCard = hand.find(c => c.id === 'e_frost');
    if (frostCard && opMeleeStrength > 10 && !activeWeather.frost) {
      return frostCard;
    }

    const units = hand.filter(c => c.type === 'unit').sort((a, b) => a.strength - b.strength);
    if (units.length > 0) return units[0];

    const heroes = hand.filter(c => c.type === 'hero');
    if (heroes.length > 0) return heroes[0];

    const fallback = hand.find(c => c.type === 'weather' || c.type === 'horn');
    if (fallback) return fallback;

    return hand[0];
  };

  const pickAIBestCard = (hand, myBoard, opBoard, activeWeather, opTotal, myTotal) => {
    for (const card of hand) {
      const simulatedTotal = simulatePlayScore(card, myBoard, activeWeather, enemyHorns);
      if (simulatedTotal > opTotal) {
        return card;
      }
    }
    const normalUnits = hand.filter(c => c.type === 'unit').sort((a, b) => a.strength - b.strength);
    if (normalUnits.length > 0) return normalUnits[0];
    return hand[0];
  };

  useEffect(() => {
    if (turn !== 'enemy' || status !== 'ongoing' || roundResultOverlay) return;
    if (enemyPassed) {
      setTurn('player');
      return;
    }

    const timer = setTimeout(() => {
      const playerTotal = calcTotalScore(playerBoard, weather, playerHorns);
      const enemyTotal  = calcTotalScore(enemyBoard, weather, enemyHorns);

      if (playerPassed) {
        if (enemyTotal > playerTotal) {
          setEnemyPassed(true);
          addGwentLog('Enemy passes (wins the round).', 'enemy');
          witcherAudio.playPass();
          setTimeout(endRound, 1000);
        } else {
          if (enemyHand.length === 0) {
            setEnemyPassed(true);
            addGwentLog('Enemy has no cards left and passes.', 'enemy');
            witcherAudio.playPass();
            setTimeout(endRound, 1000);
            return;
          }
          const card = pickAIBestCard(enemyHand, enemyBoard, playerBoard, weather, playerTotal, enemyTotal);
          const simTotal = simulatePlayScore(card, enemyBoard, weather, enemyHorns);
          if (simTotal <= playerTotal && enemyHand.length === 1) {
            setEnemyPassed(true);
            addGwentLog('Enemy concedes the round and passes.', 'enemy');
            witcherAudio.playPass();
            setTimeout(endRound, 1000);
          } else {
            executeEnemyPlay(card);
          }
        }
        return;
      }

      if (enemyHand.length === 0) {
        setEnemyPassed(true);
        addGwentLog('Enemy passes (no cards remaining).', 'enemy');
        witcherAudio.playPass();
        return;
      }

      if (enemyTotal > playerTotal + 15 && enemyHand.length < playerHand.length) {
        setEnemyPassed(true);
        addGwentLog('Enemy passes to preserve card advantage.', 'enemy');
        witcherAudio.playPass();
        return;
      }

      const card = pickAISmartCard(enemyHand, enemyBoard, playerBoard, weather);
      if (card) {
        executeEnemyPlay(card);
      } else {
        setEnemyPassed(true);
        addGwentLog('Enemy passes.', 'enemy');
        witcherAudio.playPass();
      }
    }, 1200);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, enemyPassed, playerPassed, enemyHand, playerBoard, enemyBoard, weather, status, roundResultOverlay]);

  const endRound = () => {
    const playerTotal = calcTotalScore(playerBoard, weather, playerHorns);
    const enemyTotal  = calcTotalScore(enemyBoard, weather, enemyHorns);

    let winner = 'draw';
    if (playerTotal > enemyTotal) {
      winner = 'player';
    } else if (playerTotal < enemyTotal) {
      winner = 'enemy';
    }

    setRoundResultOverlay({
      playerTotal,
      enemyTotal,
      winner,
      roundNumber
    });
  };

  const handleProceedRound = () => {
    const { playerTotal, enemyTotal, winner } = roundResultOverlay;

    let nextPlayerGems = playerGems;
    let nextEnemyGems  = enemyGems;
    let msg = '';

    if (winner === 'player') {
      nextEnemyGems = Math.max(0, enemyGems - 1);
      setEnemyGems(nextEnemyGems);
      msg = `Round ${roundNumber} won by player! (${playerTotal} vs ${enemyTotal})`;
      witcherAudio.playRoundWin();
    } else if (winner === 'enemy') {
      nextPlayerGems = Math.max(0, playerGems - 1);
      setPlayerGems(nextPlayerGems);
      msg = `Round ${roundNumber} won by enemy! (${playerTotal} vs ${enemyTotal})`;
      witcherAudio.playRoundLoss();
    } else {
      nextPlayerGems = Math.max(0, playerGems - 1);
      nextEnemyGems  = Math.max(0, enemyGems - 1);
      setPlayerGems(nextPlayerGems);
      setEnemyGems(nextEnemyGems);
      msg = `Round ${roundNumber} ended in a draw! Both players lose a Life Gem.`;
      witcherAudio.playRoundLoss();
    }

    addGwentLog(msg, 'status');

    // Move to discard
    const newDiscardPlayer = [...playerDiscard, ...playerBoard.melee, ...playerBoard.ranged, ...playerBoard.siege];
    const newDiscardEnemy  = [...enemyDiscard, ...enemyBoard.melee, ...enemyBoard.ranged, ...enemyBoard.siege];
    setPlayerDiscard(newDiscardPlayer);
    setEnemyDiscard(newDiscardEnemy);

    setPlayerBoard({ melee: [], ranged: [], siege: [] });
    setEnemyBoard({ melee: [], ranged: [], siege: [] });
    setWeather({ frost: false, fog: false, rain: false });
    setPlayerHorns({ melee: false, ranged: false, siege: false });
    setEnemyHorns({ melee: false, ranged: false, siege: false });
    setPlayerPassed(false);
    setEnemyPassed(false);

    setRoundResultOverlay(null);

    if (nextPlayerGems <= 0 && nextEnemyGems <= 0) {
      setStatus('defeat');
      witcherAudio.playMatchLose();
    } else if (nextPlayerGems <= 0) {
      setStatus('defeat');
      witcherAudio.playMatchLose();
    } else if (nextEnemyGems <= 0) {
      setStatus('victory');
      witcherAudio.playMatchWin();
    } else {
      drawCard(1, true);
      drawCard(1, false);
      setRoundNumber(r => r + 1);
      setTurn(playerTotal >= enemyTotal ? 'player' : 'enemy');
    }
  };

  useEffect(() => {
    if (status === 'victory') {
      const lootGold = setup.enemies.reduce((acc, e) => acc + (e.lootGold ?? 0), 0) + 15;
      const hpLost = playerGems === 2 ? 0 : playerGems === 1 ? 25 : 50;
      setTimeout(() => onWin({ goldEarned: lootGold, hpLost }), 2000);
    }
    if (status === 'defeat') {
      setTimeout(onLose, 2000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const pTotal = calcTotalScore(playerBoard, weather, playerHorns);
  const eTotal = calcTotalScore(enemyBoard, weather, enemyHorns);

  const renderRow = (cards, rowName, isPlayerBoard, hasHorn, isWeatherActive) => {
    const rowScore = calcRowScore(cards, rowName, weather, hasHorn);
    const rowLabel = rowName === 'melee' ? 'YAQIN ⚔️' : rowName === 'ranged' ? 'MASOFA 🏹' : 'QAMAL ⚙️';

    return (
      <div className={`gwent-row ${rowName} ${isWeatherActive ? 'weather-active' : ''}`}>
        {/* Row Label Indicator */}
        <div className="gwent-row-label-tag">{rowLabel}</div>
        
        {/* Horn slot */}
        <div className={`gwent-horn-slot ${hasHorn ? 'active' : ''} ${isPlayerBoard && activeHornSelection ? 'selectable' : ''}`}
          onClick={() => isPlayerBoard && activeHornSelection && handleHornSlotClick(rowName)}
        >
          {hasHorn ? '🎺' : ''}
        </div>
        {/* Score indicator */}
        <div className="gwent-row-score">{rowScore}</div>
        {/* Row cards container */}
        <div className="gwent-row-cards">
          {cards.map((card, idx) => (
            <div key={idx} 
              className={`gwent-board-card ${card.type === 'hero' ? 'hero' : ''} ${isPlayerBoard && activeDecoyTarget === 'select_target' && card.type !== 'hero' ? 'decoyable' : ''} ${card.image ? 'has-img' : ''}`}
              style={card.image ? { backgroundImage: `linear-gradient(180deg, rgba(12, 10, 18, 0.45) 0%, rgba(12, 10, 18, 0.88) 100%), url('${card.image}')` } : {}}
              onClick={() => isPlayerBoard && activeDecoyTarget === 'select_target' && handleBoardCardClick(card, rowName)}
              onMouseEnter={() => setHoveredCard(card)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <span className="gwent-card-val">{calcCardStrength(card, rowName, weather, hasHorn)}</span>
              <span className="gwent-card-art">{card.icon}</span>
              <span className="gwent-card-name-text">{card.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.div className="wg-screen wg-gwent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => e.stopPropagation()}>
      
      {/* Top Banner Turn Indicator */}
      <div className="gwent-turn-banner-container">
        {turn === 'player' ? (
          <div className="gwent-turn-badge player-turn">SIZNING NAVBATINGIZ ⚔️</div>
        ) : (
          <div className="gwent-turn-badge enemy-turn">RAQIB NAVBATI ⏳</div>
        )}
      </div>

      <div className="gwent-board">
        {/* Left Scores Sidebar */}
        <div className="gwent-sidebar">
          <div className="gwent-sidebar-player enemy">
            <div className="gwent-sb-name">{setup?.enemies[0]?.name ?? 'Monster'}</div>
            <div className="gwent-sb-score">{eTotal}</div>
            <div className="gwent-sb-gems">
              {Array.from({ length: 2 }, (_, i) => (
                <span key={i} className={`gwent-gem ${i < enemyGems ? 'active' : 'dead'}`}>❤️</span>
              ))}
            </div>
            {enemyPassed && <div className="gwent-pass-badge">PASSED</div>}
          </div>

          <div className="gwent-weather-slots">
            <div className={`weather-pip ${weather.frost ? 'active' : ''}`}>❄️</div>
            <div className={`weather-pip ${weather.fog ? 'active' : ''}`}>🌫️</div>
            <div className={`weather-pip ${weather.rain ? 'active' : ''}`}>🌧️</div>
          </div>

          <div className="gwent-sidebar-player player">
            <div className="gwent-sb-name">Geralt</div>
            <div className="gwent-sb-score">{pTotal}</div>
            <div className="gwent-sb-gems">
              {Array.from({ length: 2 }, (_, i) => (
                <span key={i} className={`gwent-gem ${i < playerGems ? 'active' : 'dead'}`}>❤️</span>
              ))}
            </div>
            {playerPassed && <div className="gwent-pass-badge">PASSED</div>}
          </div>

          <div className="gwent-round-indicator">
            Raund {roundNumber}
          </div>
        </div>

        {/* Battlefield */}
        <div className="gwent-battlefield">
          {/* Active weather screen overlays */}
          {weather.frost && <div className="gwent-weather-overlay frost-overlay" />}
          {weather.fog && <div className="gwent-weather-overlay fog-overlay" />}
          {weather.rain && <div className="gwent-weather-overlay rain-overlay" />}

          {/* Enemy Board Rows */}
          <div className="gwent-board-side enemy-side">
            {renderRow(enemyBoard.siege, 'siege', false, enemyHorns.siege, weather.rain)}
            {renderRow(enemyBoard.ranged, 'ranged', false, enemyHorns.ranged, weather.fog)}
            {renderRow(enemyBoard.melee, 'melee', false, enemyHorns.melee, weather.frost)}
          </div>

          {/* Player Board Rows */}
          <div className="gwent-board-side player-side">
            {renderRow(playerBoard.melee, 'melee', true, playerHorns.melee, weather.frost)}
            {renderRow(playerBoard.ranged, 'ranged', true, playerHorns.ranged, weather.fog)}
            {renderRow(playerBoard.siege, 'siege', true, playerHorns.siege, weather.rain)}
          </div>
        </div>

        {/* Right Decks & Actions Panel */}
        <div className="gwent-decks-panel">
          <div className="gwent-deck-display enemy">
            <span>🎴</span>
            <span>Deck: {enemyDeck.length}</span>
            <span>Hand: {enemyHand.length}</span>
          </div>

          <button className="gwent-pass-btn" onClick={handlePass} disabled={playerPassed || turn !== 'player' || status !== 'ongoing' || roundResultOverlay}>
            PASS ROUND
          </button>

          <div className="gwent-deck-display player">
            <span>🎴</span>
            <span>Deck: {playerDeck.length}</span>
            <span>Hand: {playerHand.length}</span>
          </div>
        </div>
      </div>

      {/* Active Card Description Tooltip Bar */}
      <div className="gwent-description-bar">
        {hoveredCard ? (
          <div className="gwent-desc-content">
            <span className="gwent-desc-name">{hoveredCard.name}:</span>
            <span className="gwent-desc-text"> {hoveredCard.description}</span>
          </div>
        ) : (
          <div className="gwent-desc-placeholder">Kursorni karta ustiga olib kelib, uning qobiliyatini o'qing.</div>
        )}
      </div>

      {/* Gwent Combat Log */}
      <div className="gwent-log-panel">
        <div className="gwent-log-entries">
          {log.map((l, i) => (
            <div key={i} className={`gwent-log-row log-${l.type}`}>
              {l.text}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>

      {/* Player Hand Area */}
      <div className="gwent-hand-area">
        <div className="gwent-hand-scroll">
          {playerHand.map((card, idx) => (
            <div key={idx} 
              className={`gwent-hand-card ${card.type === 'hero' ? 'hero' : ''} ${card.image ? 'has-img' : ''}`}
              style={card.image ? { backgroundImage: `linear-gradient(180deg, rgba(12, 10, 18, 0.45) 0%, rgba(12, 10, 18, 0.88) 100%), url('${card.image}')` } : {}}
              onClick={() => playCard(card)}
              onMouseEnter={() => setHoveredCard(card)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="gwent-card-top">
                <span className="gwent-card-strength-num">{card.type !== 'hero' && card.type !== 'unit' ? '' : card.strength}</span>
                <span className="gwent-card-row-indicator">{card.row === 'melee' ? '⚔️' : card.row === 'ranged' ? '🏹' : card.row === 'siege' ? '⚙️' : '✨'}</span>
              </div>
              <div className="gwent-card-icon-art">{card.icon}</div>
              <div className="gwent-card-bottom-name">{card.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Medic Revive Modal */}
      {medicChoices && (
        <div className="gwent-modal-overlay">
          <div className="gwent-modal">
            <h3 className="gwent-modal-title">Select Unit to Revive</h3>
            <div className="gwent-modal-grid">
              {medicChoices.map((card, idx) => (
                <div key={idx} 
                  className={`gwent-hand-card modal-pick ${card.type === 'hero' ? 'hero' : ''} ${card.image ? 'has-img' : ''}`} 
                  style={card.image ? { backgroundImage: `linear-gradient(180deg, rgba(12, 10, 18, 0.45) 0%, rgba(12, 10, 18, 0.88) 100%), url('${card.image}')` } : {}}
                  onClick={() => handleMedicSelect(card)}
                >
                  <div className="gwent-card-top">
                    <span>{card.strength}</span>
                    <span>{card.row === 'melee' ? '⚔️' : card.row === 'ranged' ? '🏹' : '⚙️'}</span>
                  </div>
                  <div className="gwent-card-icon-art">{card.icon}</div>
                  <div className="gwent-card-bottom-name">{card.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Round End Result Proceed Overlay (Continue Button) */}
      {roundResultOverlay && (
        <div className="gwent-modal-overlay">
          <div className="gwent-round-result-modal">
            <h2 className="gwent-rm-title">Raund {roundResultOverlay.roundNumber} Yakunlandi</h2>
            <div className="gwent-rm-scores">
              <div className="gwent-rm-player-score">
                <span className="gwent-rm-label">Geralt</span>
                <span className="gwent-rm-val">{roundResultOverlay.playerTotal}</span>
              </div>
              <div className="gwent-rm-vs">VS</div>
              <div className="gwent-rm-player-score enemy">
                <span className="gwent-rm-label">{setup?.enemies[0]?.name ?? 'Dushman'}</span>
                <span className="gwent-rm-val">{roundResultOverlay.enemyTotal}</span>
              </div>
            </div>
            
            <div className="gwent-rm-banner">
              {roundResultOverlay.winner === 'player' ? (
                <div className="gwent-rm-banner-text player-win">Geralt raundda g'alaba qozondi! 🏆</div>
              ) : roundResultOverlay.winner === 'enemy' ? (
                <div className="gwent-rm-banner-text enemy-win">Dushman raundda g'alaba qozondi! 💀</div>
              ) : (
                <div className="gwent-rm-banner-text draw-win">Durang! Har ikki o'yinchining gemi sindi. 🤝</div>
              )}
            </div>

            <button className="gwent-rm-proceed-btn" onClick={handleProceedRound}>
              DAVOM ETISH
            </button>
          </div>
        </div>
      )}

      {/* Match Result Overlay */}
      {status === 'victory' && (
        <div className="wg-combat-result victory">
          <div className="wg-result-title">Gwent G'alabasi!</div>
          <div className="wg-result-sub">Siz kontrakt shartini bajardingiz!</div>
        </div>
      )}
      {status === 'defeat' && (
        <div className="wg-combat-result defeat">
          <div className="wg-result-title">Mag'lubiyat</div>
          <div className="wg-result-sub">Siz barcha Life Gemlaringizni yo'qotdingiz.</div>
        </div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EPISODE SELECT SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function EpisodeSelectScreen({ gameState, onSelect, onBack }) {
  const acts = [
    { num: 1, title: 'Act I — Contracts of the Misty Valley',  eps: EPISODE_LIST.slice(0, 10) },
    { num: 2, title: 'Act II — The Cynical Crown',              eps: EPISODE_LIST.slice(10, 20) },
    { num: 3, title: 'Act III — The Grey Apocalypse',           eps: EPISODE_LIST.slice(20, 30) },
  ];
  const currentEp = gameState?.currentEpisode ?? 'ep01';
  const currentNum = getEpisodeNumber(currentEp);

  return (
    <motion.div className="wg-screen wg-episodes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => e.stopPropagation()}>
      <div className="wg-episodes-bg" />
      <div className="wg-episodes-content">
        <h2 className="wg-episodes-title">Episode Select</h2>
        {acts.map(act => (
          <div key={act.num} className="wg-act-group">
            <div className="wg-act-label">{act.title}</div>
            <div className="wg-ep-grid">
              {act.eps.map(id => {
                const epNum = getEpisodeNumber(id);
                const isUnlocked = epNum <= currentNum;
                const isCurrent  = id === currentEp;
                const isWritten  = isEpisodeFullyWritten(id);
                const ep = getEpisode(id);
                return (
                  <button key={id}
                    className={`wg-ep-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''} ${isWritten ? 'written' : ''}`}
                    onClick={() => isUnlocked && onSelect(id)}
                    disabled={!isUnlocked}
                    title={ep?.summary ?? ''}
                  >
                    <span className="wg-ep-num">{epNum}</span>
                    <span className="wg-ep-name">{ep?.title}</span>
                    {!isUnlocked && <span className="wg-ep-lock">🔒</span>}
                    {isCurrent  && <span className="wg-ep-cur">▶</span>}
                    {isWritten  && <span className="wg-ep-badge">Full</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <button className="wg-btn wg-btn-ghost" onClick={onBack}>← Back</button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GAME OVER SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function GameOverScreen({ onRetry, onMenu }) {
  return (
    <motion.div className="wg-screen wg-gameover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => e.stopPropagation()}>
      <div className="wg-gameover-content">
        <div className="wg-gameover-skull">💀</div>
        <h2 className="wg-gameover-title">You Have Fallen</h2>
        <p className="wg-gameover-sub">The swamp claims another soul.</p>
        <div className="wg-gameover-btns">
          <button className="wg-btn wg-btn-primary" onClick={onRetry}>⚔️ Try Again</button>
          <button className="wg-btn wg-btn-ghost"   onClick={onMenu}>← Main Menu</button>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HP BAR COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function HpBar({ current, max }) {
  const pct = Math.max(0, (current / max) * 100);
  const isLow = pct <= 30;
  return (
    <div className={`wg-hud-hp-row ${isLow ? 'low-hp' : ''}`}>
      <span className="wg-hud-hp-label">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="wg-heart-svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </span>
      <div className="wg-hud-hp-bar">
        <div className="wg-hud-hp-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="wg-hud-hp-val">{current}/{max}</span>
    </div>
  );
}
