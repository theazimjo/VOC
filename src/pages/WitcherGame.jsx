import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DEFAULT_STATE, saveGame, loadGame, deleteSave, autoSave, listSaves,
  applyConsequences, applyPostCombat, getNextValidIndex, formatDate, episodeLabel,
} from '../data/witcher/gameEngine';
import { getEpisode, EPISODE_LIST, getEpisodeNumber, isEpisodeFullyWritten } from '../data/witcher/episodes/index';
import './WitcherGame.css';

const BG_IMAGES = {
  village: '/witcher/village_night.png',
  swamp:   '/witcher/swamp_night.png',
  cave:    '/witcher/cave_interior.png',
  menu:    '/witcher/menu_bg.png',
};
const PORTRAITS = {
  esh:          '/witcher/esh_portrait.png',
  elder:        '/witcher/elder_portrait.png',
  timur:        '/witcher/timur_portrait.png',
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
  const [displayText, setDisplayText] = useState('');
  const [textComplete, setTextComplete] = useState(false);
  const [combatSetup, setCombatSetup] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [saveToast, setSaveToast]     = useState(null); // 'saved' | 'error' | null
  const [showSaveSlots, setShowSaveSlots] = useState(false);
  const typeRef = useRef(null);

  const [voiceoverEnabled, setVoiceoverEnabled] = useState(() => {
    return localStorage.getItem('witcher_voiceover') !== 'false';
  });
  const activeAudioRef = useRef(null);

  const episode     = getEpisode(episodeId);
  const nodes       = episode?.nodes ?? [];
  const currentNode = nodes[nodeIndex] ?? null;
  const currentBg   = currentNode?.bg ?? 'village';

  // ── Voiceover Narration Player ──────────────────────────────────────────────
  useEffect(() => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }

    if (!currentNode || screen !== 'narrative') return;

    const hasText = !!(currentNode.text || currentNode.prompt);
    if (!hasText || !voiceoverEnabled) return;

    const audioUrl = `/witcher/audio/${episodeId}/${currentNode.id}.mp3`;
    const audio = new Audio(audioUrl);
    activeAudioRef.current = audio;

    audio.play().catch(err => {
      console.warn("Failed to play voiceover:", err);
    });

    return () => {
      audio.pause();
    };
  }, [nodeIndex, episodeId, screen, voiceoverEnabled, currentNode]);

  // ── Typewriter ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!currentNode || currentNode.type === 'choice' || currentNode.type === 'combat') {
      setDisplayText('');
      setTextComplete(true);
      return;
    }
    const text = currentNode.text ?? '';
    setDisplayText('');
    setTextComplete(false);
    let i = 0;
    clearInterval(typeRef.current);
    typeRef.current = setInterval(() => {
      i++;
      setDisplayText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(typeRef.current);
        setTextComplete(true);
      }
    }, 22);
    return () => clearInterval(typeRef.current);
  }, [nodeIndex, episodeId]);

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
      // Skip typewriter
      clearInterval(typeRef.current);
      setDisplayText(currentNode.text ?? '');
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
    const newState = applyConsequences(gameState, option.consequences);
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
    <div className="wg-root" onClick={handleScreenClick}>
      <AnimatePresence mode="wait">
        {screen === 'menu'      && <MenuScreen      key="menu"      saves={saves} onNewGame={() => setScreen('saves')} onLoad={loadSlot} onEpisodes={() => setScreen('episodes')} onBack={() => navigate('/')} showDelete={showDeleteConfirm} setShowDelete={setShowDeleteConfirm} onDeleteConfirm={handleDeleteSave} />}
        {screen === 'saves'     && <SaveSelectScreen key="saves"    saves={saves} onSelect={startNewGame} onLoad={loadSlot} onBack={() => setScreen('menu')} showDelete={showDeleteConfirm} setShowDelete={setShowDeleteConfirm} onDeleteConfirm={handleDeleteSave} />}
        {screen === 'narrative' && <NarrativeScreen  key="narrative" node={currentNode} episode={episode} displayText={displayText} textComplete={textComplete} bg={currentBg} gameState={gameState} onChoice={handleChoice} onSave={handleSaveBtn} saveToast={saveToast} showSaveSlots={showSaveSlots} onPickSlot={doSave} onCloseSaveSlots={() => setShowSaveSlots(false)} voiceoverEnabled={voiceoverEnabled} onToggleVoiceover={() => {
          const next = !voiceoverEnabled;
          setVoiceoverEnabled(next);
          localStorage.setItem('witcher_voiceover', String(next));
          if (!next && activeAudioRef.current) {
            activeAudioRef.current.pause();
          }
        }} />}
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
          <span className="wg-logo-sub">Turan-Gargariya Chronicles</span>
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
function NarrativeScreen({ node, episode, displayText, textComplete, bg, gameState, onChoice, onSave, saveToast, showSaveSlots, onPickSlot, onCloseSaveSlots, voiceoverEnabled, onToggleVoiceover }) {
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
        <div className="wg-hud-ep">{episode?.actTitle} · {episode?.title}</div>
        {gameState && (
          <div className="wg-hud-stats">
            <HpBar current={gameState.character.currentHp} max={gameState.character.maxHp} />
            <span className="wg-hud-gold">💰 {gameState.character.gold}g</span>
            <button className={`wg-hud-voice-btn ${voiceoverEnabled ? 'active' : 'muted'}`} onClick={e => { e.stopPropagation(); onToggleVoiceover(); }} title="Toggle Voiceover">
              {voiceoverEnabled ? '🔊' : '🔇'}
            </button>
            <button className="wg-hud-save-btn" onClick={e => { e.stopPropagation(); onSave(); }} title="Save game">💾</button>
          </div>
        )}
      </div>

      {/* Portrait (dialogue) */}
      <AnimatePresence>
        {isDialogue && node.portrait && (
          <motion.div className="wg-portrait" key={node.speaker}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          >
            <img src={PORTRAITS[node.portrait] ?? PORTRAITS.esh} alt={node.speaker} />
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
            {displayText}
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
function CombatScreen({ setup, gameState, onWin, onLose }) {
  const [enemies, setEnemies]         = useState(() => setup.enemies.map(e => ({ ...e })));
  const [enemyIdx, setEnemyIdx]       = useState(0);
  const [playerHp, setPlayerHp]       = useState(gameState.character.currentHp);
  const [playerStamina, setStamina]   = useState(gameState.character.maxStamina);
  const [signCharges, setSignCharges] = useState(gameState.character.signCharges);
  const [potions, setPotions]         = useState(gameState.inventory.healthPotion ?? 0);
  const [log, setLog]                 = useState(['The battle begins.']);
  const [phase, setPhase]             = useState('player');  // player | enemy_telegraph | enemy_attack | result
  const [parrying, setParrying]       = useState(false);
  const [telegraph, setTelegraph]     = useState(null);      // null | 'heavy'
  const [goldEarned, setGoldEarned]   = useState(0);
  const [hpLost, setHpLost]          = useState(0);
  const [burnTurns, setBurnTurns]     = useState(0);
  const [burnDmg, setBurnDmg]         = useState(0);
  const [status, setStatus]           = useState('ongoing');
  const [shake, setShake]             = useState(false);
  const logEndRef = useRef(null);

  const maxHp      = gameState.character.maxHp;
  const maxStamina = gameState.character.maxStamina;
  const enemy      = enemies[enemyIdx];

  const addLog = (msg) => setLog(prev => [...prev.slice(-8), msg]);

  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [log]);

  const triggerShake = () => { setShake(true); setTimeout(() => setShake(false), 400); };

  const heal = (amount) => setPlayerHp(prev => Math.min(maxHp, prev + amount));

  const dealEnemyDmg = (raw) => {
    let dmg = raw;
    if (parrying) { dmg = Math.floor(raw * 0.4); addLog(`You parried! Counter: ${dmg} reflected damage.`); setParrying(false); }
    setPlayerHp(prev => {
      const next = Math.max(0, prev - dmg);
      if (next === 0) { setStatus('defeat'); }
      return next;
    });
    setHpLost(prev => prev + dmg);
    triggerShake();
    addLog(`${enemy.name} hits you for ${dmg} damage!`);
  };

  const killEnemy = (idx, currentEnemies) => {
    const earned = currentEnemies[idx].lootGold ?? 0;
    setGoldEarned(prev => prev + earned);
    addLog(`${currentEnemies[idx].name} defeated! +${earned} gold`);
    const nextIdx = idx + 1;
    if (nextIdx >= currentEnemies.length) {
      setStatus('victory');
    } else {
      setEnemyIdx(nextIdx);
      addLog(`A ${currentEnemies[nextIdx].name} charges forward!`);
    }
  };

  const doEnemyTurn = useCallback(() => {
    if (status !== 'ongoing') return;
    const roll = Math.random();
    if (roll < 0.2) {
      // telegraph heavy
      setTelegraph('heavy');
      addLog(`⚠️ ${enemy.name} winds up a HEAVY attack!`);
      setPhase('enemy_telegraph');
      setTimeout(() => {
        const dmg = Math.floor(enemy.attack * 1.8);
        dealEnemyDmg(dmg);
        setTelegraph(null);
        setPhase('player');
      }, 1200);
    } else {
      const dmg = Math.floor(enemy.attack * (0.8 + Math.random() * 0.4));
      dealEnemyDmg(dmg);
      setPhase('player');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enemy, parrying, status]);

  // Burn effect on enemy turn
  const applyBurn = useCallback((currentEnemies, idx) => {
    if (burnTurns <= 0) return currentEnemies;
    const dmg = burnDmg;
    addLog(`🔥 Burn deals ${dmg} damage to ${currentEnemies[idx].name}!`);
    setBurnTurns(t => t - 1);
    const updated = currentEnemies.map((e, i) =>
      i === idx ? { ...e, currentHp: Math.max(0, e.currentHp - dmg) } : e
    );
    setEnemies(updated);
    if (updated[idx].currentHp <= 0) killEnemy(idx, updated);
    return updated;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [burnTurns, burnDmg]);

  const playerAction = (action) => {
    if (phase !== 'player' || status !== 'ongoing') return;
    let newEnemies = enemies.map(e => ({ ...e }));
    let newHp = enemy.currentHp;

    if (action === 'strike') {
      if (playerStamina < 20) { addLog('Not enough stamina!'); return; }
      const dmg = Math.max(1, Math.floor(15 + Math.random() * 11) - enemy.defense);
      newHp -= dmg;
      setStamina(s => Math.min(maxStamina, s + 15 - 20)); // -20 cost, +15 regen
      addLog(`You strike for ${dmg} damage!`);
    } else if (action === 'heavy') {
      if (playerStamina < 40) { addLog('Not enough stamina for a heavy strike!'); return; }
      if (Math.random() < 0.2) { addLog('Your heavy strike misses!'); setStamina(s => s - 40); setPhase('enemy_attack'); setTimeout(doEnemyTurn, 600); return; }
      const dmg = Math.max(1, Math.floor(30 + Math.random() * 16) - enemy.defense);
      newHp -= dmg;
      setStamina(s => Math.max(0, s - 40));
      addLog(`Heavy Strike! ${dmg} damage!`);
    } else if (action === 'aard') {
      if (signCharges < 1) { addLog('No Sign charges remaining!'); return; }
      const dmg = Math.max(1, 10 - enemy.defense);
      newHp -= dmg;
      setSignCharges(c => c - 1);
      addLog(`⚡ Aard sign! ${dmg} damage + stun.`);
      newEnemies = newEnemies.map((e, i) => i === enemyIdx ? { ...e, currentHp: Math.max(0, newHp) } : e);
      setEnemies(newEnemies);
      if (newEnemies[enemyIdx].currentHp <= 0) { killEnemy(enemyIdx, newEnemies); return; }
      addLog(`${enemy.name} is stunned—skips its turn.`);
      setStamina(s => Math.min(maxStamina, s + 15));
      setPhase('player');
      return;
    } else if (action === 'igni') {
      if (signCharges < 1) { addLog('No Sign charges remaining!'); return; }
      const dmg = Math.max(1, 25 - enemy.defense);
      newHp -= dmg;
      setSignCharges(c => c - 1);
      setBurnTurns(2); setBurnDmg(5);
      addLog(`🔥 Igni sign! ${dmg} damage + burns for 2 turns.`);
    } else if (action === 'parry') {
      setParrying(true);
      addLog('You brace for a parry. Counter ready.');
      setStamina(s => Math.max(0, s - 10));
      setPhase('enemy_attack');
      setTimeout(doEnemyTurn, 600);
      return;
    } else if (action === 'potion') {
      if (potions <= 0) { addLog('No health potions left!'); return; }
      heal(30);
      setPotions(p => p - 1);
      addLog('You drink a health potion. +30 HP.');
      setPhase('enemy_attack');
      setTimeout(doEnemyTurn, 600);
      return;
    }

    newEnemies = newEnemies.map((e, i) => i === enemyIdx ? { ...e, currentHp: Math.max(0, newHp) } : e);
    setEnemies(newEnemies);

    if (newEnemies[enemyIdx].currentHp <= 0) {
      const afterBurn = applyBurn(newEnemies, enemyIdx);
      if (afterBurn[enemyIdx].currentHp <= 0) { killEnemy(enemyIdx, afterBurn); return; }
    }

    setStamina(s => Math.min(maxStamina, s + 10)); // small regen per turn
    setPhase('enemy_attack');
    setTimeout(doEnemyTurn, 700);
  };

  useEffect(() => {
    if (status === 'victory') { setTimeout(() => onWin({ goldEarned, hpLost: Math.max(0, gameState.character.currentHp - playerHp) }), 1500); }
    if (status === 'defeat') { setTimeout(onLose, 1200); }
  }, [status]);

  const enemyHpPct   = enemy ? (enemy.currentHp / enemy.maxHp) * 100 : 0;
  const playerHpPct  = (playerHp / maxHp) * 100;
  const staminaPct   = (playerStamina / maxStamina) * 100;

  return (
    <motion.div className={`wg-screen wg-combat ${shake ? 'shake' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => e.stopPropagation()}>
      <div className="wg-combat-bg" />

      {/* Status overlay */}
      {status === 'victory' && <div className="wg-combat-result victory"><div className="wg-result-title">Victory!</div><div className="wg-result-sub">+{goldEarned} gold earned</div></div>}
      {status === 'defeat'  && <div className="wg-combat-result defeat"><div className="wg-result-title">Defeated.</div></div>}

      <div className="wg-combat-arena">
        {/* Player side */}
        <div className="wg-combatant player-side">
          <div className="wg-combatant-sprite">🧙‍♂️</div>
          <div className="wg-combatant-name">Geralt</div>
          <div className="wg-bar-row">
            <span className="wg-bar-label">HP</span>
            <div className="wg-bar"><div className="wg-bar-fill hp" style={{ width: `${playerHpPct}%` }} /></div>
            <span className="wg-bar-val">{playerHp}/{maxHp}</span>
          </div>
          <div className="wg-bar-row">
            <span className="wg-bar-label">ST</span>
            <div className="wg-bar"><div className="wg-bar-fill stamina" style={{ width: `${staminaPct}%` }} /></div>
            <span className="wg-bar-val">{Math.round(playerStamina)}</span>
          </div>
          <div className="wg-sign-charges">
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} className={`wg-charge ${i < signCharges ? 'active' : ''}`}>◆</span>
            ))}
          </div>
        </div>

        {/* VS */}
        <div className="wg-vs">VS</div>

        {/* Enemy side */}
        <div className="wg-combatant enemy-side">
          <div className={`wg-combatant-sprite enemy-sprite ${telegraph === 'heavy' ? 'telegraph' : ''}`}>
            {ENEMY_IMAGES[enemy?.name] ? (
              <img src={ENEMY_IMAGES[enemy?.name]} alt={enemy?.name} className="wg-combat-enemy-img" />
            ) : (
              enemy?.icon ?? '👹'
            )}
          </div>
          <div className="wg-combatant-name">{enemy?.name ?? '—'}</div>
          <div className="wg-enemy-desc">{enemy?.description ?? ''}</div>
          <div className="wg-bar-row">
            <span className="wg-bar-label">HP</span>
            <div className="wg-bar"><div className="wg-bar-fill enemy-hp" style={{ width: `${enemyHpPct}%` }} /></div>
            <span className="wg-bar-val">{enemy?.currentHp ?? 0}/{enemy?.maxHp ?? 0}</span>
          </div>
          {enemies.length > 1 && (
            <div className="wg-enemy-queue">
              {enemies.map((e, i) => (
                <span key={i} className={`wg-enemy-pip ${i < enemyIdx ? 'dead' : i === enemyIdx ? 'active' : ''}`}>{e.icon}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Combat Log */}
      <div className="wg-combat-log">
        {log.map((l, i) => <div key={i} className="wg-log-entry">{l}</div>)}
        <div ref={logEndRef} />
      </div>

      {/* Action Buttons */}
      <div className="wg-action-bar" onClick={e => e.stopPropagation()}>
        <button className="wg-action-btn" onClick={() => playerAction('strike')} disabled={phase !== 'player' || playerStamina < 20} title="Stamina: 20">⚔️<span>Strike</span></button>
        <button className="wg-action-btn heavy" onClick={() => playerAction('heavy')} disabled={phase !== 'player' || playerStamina < 40} title="Stamina: 40">💥<span>Heavy</span></button>
        <button className="wg-action-btn sign" onClick={() => playerAction('aard')} disabled={phase !== 'player' || signCharges < 1} title="Stun + dmg">⚡<span>Aard</span></button>
        <button className="wg-action-btn sign igni" onClick={() => playerAction('igni')} disabled={phase !== 'player' || signCharges < 1} title="Burn 2 turns">🔥<span>Igni</span></button>
        <button className="wg-action-btn parry" onClick={() => playerAction('parry')} disabled={phase !== 'player'} title="Block & counter">🛡️<span>Parry</span></button>
        <button className="wg-action-btn potion" onClick={() => playerAction('potion')} disabled={phase !== 'player' || potions <= 0} title={`Potions: ${potions}`}>💊<span>Potion×{potions}</span></button>
      </div>
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
  const color = pct > 60 ? '#27ae60' : pct > 30 ? '#e67e22' : '#e74c3c';
  return (
    <div className="wg-hud-hp-row">
      <span className="wg-hud-hp-label">❤️</span>
      <div className="wg-hud-hp-bar">
        <div className="wg-hud-hp-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="wg-hud-hp-val">{current}/{max}</span>
    </div>
  );
}
