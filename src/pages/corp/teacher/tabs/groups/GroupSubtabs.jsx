import { useState } from 'react';
import {
  Activity, AlertTriangle, Archive, BookOpen, Check, ChevronDown, ChevronRight, Copy, Key, MoreVertical,
  Pencil, Plus, RotateCw, Save, Target, Trash2, Users, X, Zap
} from 'lucide-react';
import { GROUP_LEVEL_OPTIONS, aggregatePackProgress, getHomeworkCandidates, getPackUnits, getStudentSummary, getUsedHomeworkKeys } from '../../utils';
import { IRREGULAR_VERBS_PACK_ID } from '../../../../../data/irregularVerbsCorpPack';
import './GroupSubtabs.css';

export default function GroupSubtabs({ p }) {
  const {
    activeStudentMenu, assignCategory, assigningGroup, copiedCode, copyCode, customPacks,
    groupHomeworkList, groupSettingsForm, groupStudentsList,
    handleAddHomework, handleArchiveGroup, handleAssignPack, handleDeleteGroup, handleRegenerateCode, handleRemovePack, handleSaveGroupSettings,
    homeworkSelection, navigate, openHomeworkEditor, savingGroupSettings, savingHomework, selectedGroup, selectedGroupStats,
    setActiveStudentMenu, setAssignCategory, setAssigningGroup, setGroupSettingsForm,
    setShowHomeworkEditor, showHomeworkEditor, setStudentMenuPos, subTab, toggleHomeworkItem,
  } = p;

  const [activePackTab, setActivePackTab] = useState('all');
  const [pendingPackAssign, setPendingPackAssign] = useState(null);
  const [expandedStudents, setExpandedStudents] = useState(new Set());
  const [deleteConfirmStep, setDeleteConfirmStep] = useState(0);
  const [deleteNameInput, setDeleteNameInput] = useState('');
  const [archiveConfirmOpen, setArchiveConfirmOpen] = useState(false);

  return (
    <div className="group-tab-content">
              {subTab === 'students' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                  {groupStudentsList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'var(--bg-tertiary)', borderRadius: '16px', border: '1px dashed var(--border)', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <Users size={36} style={{ marginBottom: '4px', opacity: 0.5 }} />
                      <p style={{ margin: 0, fontWeight: 600 }}>No students have joined this group yet.</p>
                      <span style={{ fontSize: '0.85rem' }}>Give students this 6-digit join code:</span>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                        <strong style={{ fontSize: '1.4rem', color: '#3b82f6', letterSpacing: '0.14em', fontFamily: 'monospace' }}>{selectedGroup.code}</strong>
                        <button
                          type="button"
                          className="gib-code-btn"
                          onClick={() => copyCode(selectedGroup.code)}
                          title="Copy code"
                        >
                          {copiedCode === selectedGroup.code ? <Check size={16} color="#34c759" /> : <Copy size={16} />}
                          <span>{copiedCode === selectedGroup.code ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="students-progress-list" style={{ marginTop: 0 }}>
                      {groupStudentsList.map((st, i) => {
                        const summary = getStudentSummary(st, selectedGroup);
                        const stId = st.id || st.uid || st.email || `st_${i}`;
                        const isMenuOpen = activeStudentMenu === stId;

                        return (
                          <div key={stId} className="student-progress-row">
                            <div className="st-info">
                              <div className="st-avatar">{st.name.charAt(0).toUpperCase()}</div>
                              <div className="st-info-text">
                                <strong className="st-name">{st.name}</strong>
                                <div className="st-email">{st.email || 'No email'}</div>
                              </div>
                            </div>

                            <div className="st-stats">
                              {summary.hasData ? (
                                <>
                                  <span className="badge-active" title="Mastery">{summary.masteryPercent}% mastery</span>
                                  {summary.atRiskCount > 0 && (
                                    <span
                                      title={`${summary.atRiskCount} words need attention`}
                                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--warning)' }}
                                    >
                                      <AlertTriangle size={13} /> {summary.atRiskCount}
                                    </span>
                                  )}
                                </>
                              ) : (
                                <span className="badge-active">Joined</span>
                              )}

                              <button
                                type="button"
                                className="btn-action-more"
                                title="Actions"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  setStudentMenuPos({ top: rect.bottom + 6, right: window.innerWidth - rect.right });
                                  setActiveStudentMenu(isMenuOpen ? null : stId);
                                }}
                              >
                                <MoreVertical size={16} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* SUB-TAB 2: WORDS / PACKS */}
              {subTab === 'words' && (
                assigningGroup ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                    {/* Top Segmented Tab Bar */}
                    <div
                      className="teacher-settings-hero-card"
                      style={{
                        marginBottom: 0,
                        padding: '8px 10px',
                        borderRadius: '18px',
                        width: '100%',
                        maxWidth: 'none',
                        display: 'flex',
                        gap: '6px'
                      }}
                    >
                      {[
                        { key: 'assignedPacks', label: 'Main Packs' },
                        { key: 'additionalPacks', label: "Extra Packs" },
                      ].map(({ key, label }) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setAssignCategory(key)}
                          style={{
                            flex: 1,
                            padding: '8px 14px',
                            borderRadius: '12px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            border: assignCategory === key ? 'none' : '1px solid var(--border)',
                            background: assignCategory === key ? '#3b82f6' : 'var(--bg-tertiary)',
                            color: assignCategory === key ? '#ffffff' : 'var(--text-primary)',
                            transition: 'all 0.18s ease'
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    {/* Pack List Container */}
                    <div className="teacher-settings-hero-card" style={{ marginBottom: 0, padding: '1rem 1.1rem', borderRadius: '20px', width: '100%', maxWidth: 'none' }}>
                      {(() => {
                        const assignablePacks = customPacks.filter(
                          p => p.id !== IRREGULAR_VERBS_PACK_ID || assignCategory === 'additionalPacks'
                        );
                        if (assignablePacks.length === 0) {
                          return (
                            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: '16px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                              No packs available to assign yet.
                            </div>
                          );
                        }
                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {assignablePacks.map(p => {
                              const isAssigned = (assigningGroup[assignCategory] || []).includes(p.id);
                              return (
                                <div
                                  key={p.id}
                                  className="student-progress-row"
                                  style={{
                                    padding: '10px 14px',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '12px',
                                    background: 'var(--bg-glass-strong)',
                                    border: '1px solid var(--border)'
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '11px', background: 'rgba(59, 130, 246, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#3b82f6' }}>
                                      <BookOpen size={18} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0, flex: 1 }}>
                                      <strong style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {p.title}
                                      </strong>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                                        {p.level && <span className="group-level-badge" style={{ fontSize: '0.66rem', padding: '1px 6px', flexShrink: 0 }}>{p.level}</span>}
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                          {p.wordCount || (p.words ? p.words.length : 0)} words · {p.scope === 'own' ? 'My pack' : 'Center pack'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {isAssigned ? (
                                    <span
                                      style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '5px 12px',
                                        borderRadius: '12px',
                                        background: 'rgba(52, 199, 89, 0.12)',
                                        color: '#34c759',
                                        fontSize: '0.78rem',
                                        fontWeight: 700,
                                        border: '1px solid rgba(52, 199, 89, 0.25)',
                                        flexShrink: 0
                                      }}
                                    >
                                      <Check size={14} strokeWidth={3} /> Assigned
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => setPendingPackAssign({ pack: p, group: assigningGroup || selectedGroup, category: assignCategory })}
                                      style={{
                                        padding: '6px 14px',
                                        fontSize: '0.82rem',
                                        fontWeight: 700,
                                        borderRadius: '12px',
                                        background: '#3b82f6',
                                        color: '#ffffff',
                                        border: 'none',
                                        cursor: 'pointer',
                                        flexShrink: 0,
                                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                      }}
                                    >
                                      Assign
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', position: 'relative' }}>
                    {/* Floating Action Button (FAB) for adding packs */}
                    <button
                      type="button"
                      className="fab-add-pack-btn fab-icon-only"
                      onClick={() => { setAssignCategory('assignedPacks'); setAssigningGroup(selectedGroup); }}
                      title="Assign Pack"
                    >
                      <Plus size={26} />
                    </button>

                    <div className="teacher-settings-hero-card" style={{ marginBottom: 0, padding: '1rem 1.1rem', borderRadius: '20px', width: '100%', maxWidth: 'none' }}>
                      {[
                        { key: 'assignedPacks', label: 'Main Packs', emptyText: 'No main pack assigned' },
                        { key: 'additionalPacks', label: 'Extra Packs', emptyText: 'No extra pack assigned' },
                      ].map(({ key, label, emptyText }, idx) => {
                        const packIds = selectedGroup[key] || [];
                        return (
                          <div key={key} style={{ marginTop: idx > 0 ? '1rem' : 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {label} ({packIds.length})
                              </span>
                            </div>

                            {packIds.length === 0 ? (
                              <div style={{ padding: '10px 14px', background: 'var(--bg-tertiary)', borderRadius: '14px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>{emptyText}</span>
                                <button
                                  type="button"
                                  style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                  onClick={() => { setAssignCategory(key); setAssigningGroup(selectedGroup); }}
                                >
                                  <Plus size={14} /> Assign
                                </button>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {packIds.map(pid => {
                                  const p = customPacks.find(cp => cp.id === pid);
                                  if (!p) return null;
                                  return (
                                    <div
                                      key={pid}
                                      className="student-progress-row"
                                      style={{
                                        padding: '10px 12px',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '10px',
                                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%), var(--bg-glass-strong)',
                                        border: '1px solid rgba(255, 255, 255, 0.14)',
                                        backdropFilter: 'blur(20px)',
                                        WebkitBackdropFilter: 'blur(20px)',
                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.22)'
                                      }}
                                    >
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                                        <div style={{ width: '34px', height: '34px', borderRadius: '11px', background: 'rgba(59, 130, 246, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#3b82f6' }}>
                                          <BookOpen size={16} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
                                          <strong style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {p.title}
                                          </strong>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                                            {p.level && <span className="group-level-badge" style={{ fontSize: '0.66rem', padding: '1px 6px', flexShrink: 0 }}>{p.level}</span>}
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                              {p.wordCount || (p.words ? p.words.length : 0)} words
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() => handleRemovePack(selectedGroup.id, pid, key)}
                                        title="Remove"
                                        style={{
                                          background: 'rgba(239, 68, 68, 0.1)',
                                          border: '1px solid rgba(239, 68, 68, 0.2)',
                                          color: '#ef4444',
                                          cursor: 'pointer',
                                          width: '28px',
                                          height: '28px',
                                          borderRadius: '9px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          flexShrink: 0,
                                          transition: 'all 0.15s ease'
                                        }}
                                      >
                                        <X size={14} />
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              )}

              {/* SUB-TAB: HOMEWORK */}
              {subTab === 'homework' && (
                showHomeworkEditor ? (
                  (() => {
                    const usedKeys = getUsedHomeworkKeys(groupHomeworkList);
                    const candidates = getHomeworkCandidates(selectedGroup, customPacks, usedKeys);
                    const byPack = new Map();
                    candidates.forEach(c => {
                      if (!byPack.has(c.packId)) byPack.set(c.packId, { packTitle: c.packTitle, units: [] });
                      byPack.get(c.packId).units.push(c);
                    });
                    const packEntries = [...byPack.entries()];

                    const displayedEntries = activePackTab === 'all'
                      ? packEntries
                      : packEntries.filter(([pid]) => pid === activePackTab);

                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                        {/* Top Horizontal Pack Tab Bar */}
                        <div
                          className="teacher-settings-hero-card"
                          style={{
                            marginBottom: 0,
                            padding: '8px 10px',
                            borderRadius: '18px',
                            width: '100%',
                            maxWidth: 'none',
                            display: 'flex',
                            gap: '6px',
                            overflowX: 'auto',
                            WebkitOverflowScrolling: 'touch'
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setActivePackTab('all')}
                            style={{
                              padding: '6px 14px',
                              borderRadius: '12px',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              whiteSpace: 'nowrap',
                              cursor: 'pointer',
                              border: activePackTab === 'all' ? 'none' : '1px solid var(--border)',
                              background: activePackTab === 'all' ? '#3b82f6' : 'var(--bg-tertiary)',
                              color: activePackTab === 'all' ? '#ffffff' : 'var(--text-primary)',
                              transition: 'all 0.18s ease'
                            }}
                          >
                            All ({candidates.length})
                          </button>

                          {packEntries.map(([packId, { packTitle, units }]) => (
                            <button
                              key={packId}
                              type="button"
                              onClick={() => setActivePackTab(packId)}
                              style={{
                                padding: '6px 14px',
                                borderRadius: '12px',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                                border: activePackTab === packId ? 'none' : '1px solid var(--border)',
                                background: activePackTab === packId ? '#3b82f6' : 'var(--bg-tertiary)',
                                color: activePackTab === packId ? '#ffffff' : 'var(--text-primary)',
                                transition: 'all 0.18s ease'
                              }}
                            >
                              {packTitle} ({units.length})
                            </button>
                          ))}
                        </div>

                        {/* Topics List Section */}
                        <div className="teacher-settings-hero-card" style={{ marginBottom: 0, padding: '1rem 1.1rem', borderRadius: '20px', width: '100%', maxWidth: 'none' }}>
                          {candidates.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: '16px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                              First assign a pack to this group from the "Packs" tab.
                            </div>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                              {displayedEntries.map(([packId, { packTitle, units }]) => (
                                <div key={packId} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {packTitle}
                                  </span>

                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    {units.map(u => {
                                      const key = `${u.packId}_${u.monthId}_${u.unitId}`;
                                      const checked = homeworkSelection.has(key);
                                      return (
                                        <div
                                          key={key}
                                          className="student-progress-row"
                                          onClick={() => toggleHomeworkItem(u)}
                                          style={{
                                            cursor: u.used ? 'default' : 'pointer',
                                            opacity: u.used ? 0.5 : 1,
                                            padding: '10px 14px',
                                            borderRadius: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '12px',
                                            border: checked ? '1px solid #3b82f6' : '1px solid var(--border)',
                                            background: checked ? 'rgba(59, 130, 246, 0.14)' : 'var(--bg-glass-strong)'
                                          }}
                                        >
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                                            <div style={{ width: '34px', height: '34px', borderRadius: '11px', background: 'rgba(59, 130, 246, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#3b82f6' }}>
                                              <BookOpen size={16} />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
                                              <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 700 }}>{u.unitTitle}</strong>
                                              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                                {u.totalWords} words{u.used && ' · Assigned'}
                                              </span>
                                            </div>
                                          </div>

                                          {u.used ? (
                                            <Check size={16} color="var(--text-muted)" strokeWidth={2.5} />
                                          ) : (
                                            <div
                                              style={{
                                                width: '22px',
                                                height: '22px',
                                                borderRadius: '7px',
                                                flexShrink: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: checked ? '#3b82f6' : 'transparent',
                                                border: `1.5px solid ${checked ? '#3b82f6' : 'var(--border)'}`
                                              }}
                                            >
                                              {checked && <Check size={13} color="#fff" strokeWidth={3} />}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', position: 'relative' }}>
                    {/* Floating Action Button (FAB) for adding new homework */}
                    <button
                      type="button"
                      className="fab-add-pack-btn fab-icon-only"
                      onClick={openHomeworkEditor}
                      title="Assign new homework"
                      style={{
                        background: 'rgba(59, 130, 246, 0.85)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 10px 30px rgba(59, 130, 246, 0.5)'
                      }}
                    >
                      <Plus size={26} />
                    </button>

                    <div className="teacher-settings-hero-card" style={{ marginBottom: 0, padding: '1rem 1.1rem', borderRadius: '20px', width: '100%', maxWidth: 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Homework ({groupHomeworkList.length})
                        </span>
                      </div>

                      {groupHomeworkList.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: '16px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                          Tap "+" below to assign new homework.
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {[...groupHomeworkList].reverse().map(hw => (
                            <button
                              type="button"
                              key={hw.id}
                              className="student-progress-row"
                              onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/homework/${hw.id}`)}
                              style={{
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'left',
                                padding: '10px 14px',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '12px'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '11px', background: 'rgba(59, 130, 246, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#3b82f6' }}>
                                  <BookOpen size={18} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
                                  <strong style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {hw.name}
                                  </strong>
                                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                                    {(hw.items || []).length} topics{hw.assignedAt && <> · {new Date(hw.assignedAt).toLocaleDateString()}</>}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}

              {/* SUB-TAB 3: STATISTICS */}
              {subTab === 'stats' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                  {/* Top KPI Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                      gap: '8px',
                      width: '100%'
                    }}
                  >
                    {[
                      { label: "Students", val: `${selectedGroup.studentsCount || 0}`, icon: Users, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.14)' },
                      { label: "Packs", val: `${selectedGroupStats.packEntries.length}`, icon: BookOpen, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.14)' },
                      { label: "Active Students", val: `${selectedGroupStats.activeStudentsCount}`, icon: Zap, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.14)' },
                      { label: "Mastery", val: `${selectedGroupStats.avgPercent}%`, icon: Target, color: '#34c759', bg: 'rgba(52, 199, 89, 0.14)' },
                    ].map(({ label, val, icon: Icon, color, bg }) => (
                      <div
                        key={label}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '16px',
                          background: 'var(--bg-glass-strong)',
                          border: '1px solid var(--border)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '10px',
                            background: bg,
                            color: color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Icon size={16} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>{label}</span>
                          <strong style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-primary)' }}>{val}</strong>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Main Progress Breakdown Container */}
                  <div
                    className="teacher-settings-hero-card"
                    style={{
                      marginBottom: 0,
                      padding: '1rem 1.1rem',
                      borderRadius: '20px',
                      width: '100%',
                      maxWidth: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.85rem' }}>
                      <Activity size={16} color="#3b82f6" />
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Student Mastery (by Pack)
                      </span>
                    </div>

                    {groupStudentsList.length === 0 ? (
                      <div style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--bg-tertiary)', borderRadius: '14px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                        No students in this group to show statistics for.
                      </div>
                    ) : selectedGroupStats.packEntries.length === 0 ? (
                      <div style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--bg-tertiary)', borderRadius: '14px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                        No pack assigned to this group yet — assign one from the "Packs" tab to see statistics.
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {groupStudentsList.map((student) => {
                          let studentLearnedTotal = 0;
                          let studentPackTotal = 0;
                          selectedGroupStats.packEntries.forEach(({ packId }) => {
                            const p = customPacks.find(cp => cp.id === packId);
                            const total = p ? (p.wordCount || (p.words ? p.words.length : 0)) : 0;
                            const agg = aggregatePackProgress((student.progress || {})[packId]);
                            studentLearnedTotal += (agg.wordsLearned || 0);
                            studentPackTotal += total;
                          });
                          const overallMastery = studentPackTotal > 0 ? Math.min(100, Math.round((studentLearnedTotal / studentPackTotal) * 100)) : 0;
                          const isExpanded = expandedStudents.has(student.id);

                          return (
                            <div
                              key={student.id}
                              style={{
                                background: 'var(--bg-tertiary)',
                                border: '1px solid var(--border)',
                                borderRadius: '16px',
                                padding: '10px 12px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: isExpanded ? '10px' : 0,
                                transition: 'all 0.2s ease'
                              }}
                            >
                              {/* Clickable Student Header Summary */}
                              <div
                                onClick={() => {
                                  const next = new Set(expandedStudents);
                                  if (next.has(student.id)) next.delete(student.id);
                                  else next.add(student.id);
                                  setExpandedStudents(next);
                                }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  gap: '10px',
                                  cursor: 'pointer',
                                  userSelect: 'none'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#3b82f6', color: '#fff', fontSize: '0.82rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    {(student.name || '?').charAt(0).toUpperCase()}
                                  </div>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', minWidth: 0, flex: 1 }}>
                                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      {student.name}
                                    </strong>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>
                                      {studentLearnedTotal} / {studentPackTotal} words learned
                                    </span>
                                  </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                  <span
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                      padding: '3px 9px',
                                      borderRadius: '9px',
                                      background: overallMastery >= 80 ? 'rgba(52, 199, 89, 0.14)' : overallMastery > 0 ? 'rgba(59, 130, 246, 0.14)' : 'var(--bg-glass-strong)',
                                      color: overallMastery >= 80 ? '#34c759' : overallMastery > 0 ? '#3b82f6' : 'var(--text-muted)',
                                      fontSize: '0.76rem',
                                      fontWeight: 800,
                                      border: '1px solid var(--border)'
                                    }}
                                  >
                                    {overallMastery}% mastery
                                  </span>
                                  <ChevronDown
                                    size={16}
                                    style={{
                                      color: 'var(--text-muted)',
                                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                      transition: 'transform 0.2s ease'
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Expanded Pack Breakdown Details */}
                              {isExpanded && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '8px', borderTop: '1px dashed var(--border)' }}>
                                  {selectedGroupStats.packEntries.map(({ packId, category }) => {
                                    const p = customPacks.find(cp => cp.id === packId);
                                    const packName = p ? p.title : 'Unknown pack';
                                    const totalWords = p ? (p.wordCount || (p.words ? p.words.length : 0)) : 0;
                                    const agg = aggregatePackProgress((student.progress || {})[packId]);
                                    const percent = totalWords > 0 ? Math.min(100, Math.round((agg.wordsLearned / totalWords) * 100)) : 0;
                                    const packUnits = p ? getPackUnits(p) : [];

                                    return (
                                      <div
                                        key={packId}
                                        style={{
                                          background: 'var(--bg-glass-strong)',
                                          border: '1px solid var(--border)',
                                          borderRadius: '12px',
                                          padding: '8px 10px',
                                          display: 'flex',
                                          flexDirection: 'column',
                                          gap: '6px'
                                        }}
                                      >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                                            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                              {packName}
                                            </span>
                                            <span className="group-level-badge" style={{ fontSize: '0.66rem', padding: '1px 6px' }}>
                                              {category}
                                            </span>
                                          </div>
                                          <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#34c759', flexShrink: 0 }}>
                                            {agg.wordsLearned || 0} / {totalWords} ({percent}%)
                                          </span>
                                        </div>

                                        {/* Progress Track Bar */}
                                        <div style={{ width: '100%', height: '5px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
                                          <div style={{ width: `${percent}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #34c759)', borderRadius: '999px' }} />
                                        </div>

                                        {/* Units Chips */}
                                        {packUnits.length > 0 && (
                                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '2px' }}>
                                            {packUnits.map(u => {
                                              const us = agg.units[u.unitKey];
                                              const m = us ? (us.masteryPercent || 0) : 0;
                                              const tier = !us ? 'none' : m >= 80 ? 'done' : m > 0 ? 'partial' : 'none';
                                              const badgeBg = tier === 'done' ? 'rgba(52, 199, 89, 0.15)' : tier === 'partial' ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-tertiary)';
                                              const badgeColor = tier === 'done' ? '#34c759' : tier === 'partial' ? '#f59e0b' : 'var(--text-muted)';
                                              return (
                                                <span
                                                  key={u.unitKey}
                                                  style={{
                                                    fontSize: '0.68rem',
                                                    fontWeight: 600,
                                                    padding: '2px 7px',
                                                    borderRadius: '8px',
                                                    background: badgeBg,
                                                    color: badgeColor,
                                                    border: '1px solid var(--border)'
                                                  }}
                                                  title={`${u.monthTitle} — ${u.title}${us ? ` (${us.wordsLearned || 0}/${us.totalWords || u.totalWords})` : ' — not started yet'}`}
                                                >
                                                  {u.title}: {us ? `${m}%` : '—'}
                                                </span>
                                              );
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SUB-TAB 5: GROUP SETTINGS */}
              {subTab === 'settings' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                  {/* Card 1: Main Settings */}
                  <div className="teacher-settings-hero-card">
                    <div className="tshc-header">
                      <div className="tshc-icon-box">
                        <Pencil size={20} />
                      </div>
                      <div>
                        <h3 className="tshc-title">Group Settings</h3>
                        <p className="tshc-sub">Name, course level, and invite code</p>
                      </div>
                    </div>

                    <form onSubmit={handleSaveGroupSettings} className="gsbm-form">
                      <div className="gsbm-field">
                        <label className="gsbm-label">Group Name</label>
                        <input
                          type="text"
                          className="gsbm-input"
                          required
                          placeholder="e.g. Beginner Monday 5pm"
                          value={groupSettingsForm.name}
                          onChange={e => setGroupSettingsForm({ ...groupSettingsForm, name: e.target.value })}
                        />
                      </div>

                      <div className="gsbm-field">
                        <label className="gsbm-label">Course Level</label>
                        <select
                          className="gsbm-select"
                          value={groupSettingsForm.level}
                          onChange={e => setGroupSettingsForm({ ...groupSettingsForm, level: e.target.value })}
                        >
                          {GROUP_LEVEL_OPTIONS.map(lvl => (
                            <option key={lvl} value={lvl}>{lvl}</option>
                          ))}
                        </select>
                      </div>

                      {/* Compact Invite Code Row */}
                      <div className="gsbm-field">
                        <label className="gsbm-label">Group Invite Code</label>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px',
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border)',
                          borderRadius: '16px',
                          padding: '8px 12px',
                          flexWrap: 'wrap'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                            <Key size={18} color="#3b82f6" style={{ flexShrink: 0 }} />
                            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.12em', color: '#3b82f6', fontFamily: 'monospace' }}>
                              {groupSettingsForm.code || selectedGroup.code}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
                            <button
                              type="button"
                              onClick={() => copyCode(groupSettingsForm.code || selectedGroup.code)}
                              title="Copy code"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 12px',
                                background: 'var(--bg-glass-strong)',
                                border: '1px solid var(--border)',
                                borderRadius: '10px',
                                color: 'var(--text-primary)',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {copiedCode === (groupSettingsForm.code || selectedGroup.code) ? <Check size={14} color="#34c759" /> : <Copy size={14} />}
                              <span>{copiedCode === (groupSettingsForm.code || selectedGroup.code) ? 'Copied' : 'Copy'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={handleRegenerateCode}
                              title="Generate new code"
                              style={{
                                width: '32px',
                                height: '32px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'var(--bg-glass-strong)',
                                border: '1px solid var(--border)',
                                borderRadius: '10px',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                flexShrink: 0
                              }}
                            >
                              <RotateCw size={14} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="gsbm-save-btn"
                        disabled={savingGroupSettings}
                        style={{ marginTop: '0.6rem' }}
                      >
                        <Save size={16} /> {savingGroupSettings ? 'Saving...' : 'Save Changes'}
                      </button>
                    </form>
                  </div>

                  {/* Card 2: Archive Group */}
                  <div className="teacher-settings-hero-card" style={{ borderColor: 'rgba(245, 158, 11, 0.22)' }}>
                    <div className="tshc-header" style={{ marginBottom: '1rem' }}>
                      <div className="tshc-icon-box" style={{ background: 'rgba(245, 158, 11, 0.14)', color: '#f59e0b' }}>
                        <Archive size={18} />
                      </div>
                      <div>
                        <h3 className="tshc-title" style={{ color: '#f59e0b', fontSize: '1rem' }}>Archive Group</h3>
                        <p className="tshc-sub">Temporarily hide this group from your active list and move it to Archive</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        borderRadius: '12px',
                        background: 'rgba(245, 158, 11, 0.14)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        color: '#f59e0b',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onClick={() => setArchiveConfirmOpen(true)}
                    >
                      <Archive size={16} />
                      <span>Move to Archive</span>
                    </button>
                  </div>

                  {/* Card 3: Delete Group (Step by Step) */}
                  <div className="teacher-settings-hero-card" style={{ borderColor: 'rgba(239, 68, 68, 0.22)' }}>
                    <div className="tshc-header" style={{ marginBottom: '1rem' }}>
                      <div className="tshc-icon-box" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' }}>
                        <Trash2 size={18} />
                      </div>
                      <div>
                        <h3 className="tshc-title" style={{ color: '#ef4444', fontSize: '1rem' }}>Delete Group (Step by Step)</h3>
                        <p className="tshc-sub">The group and all its data will be permanently and irreversibly deleted</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="gsbm-danger-btn"
                      onClick={() => {
                        setDeleteNameInput('');
                        setDeleteConfirmStep(1);
                      }}
                    >
                      <Trash2 size={16} />
                      <span>Start Deletion Process</span>
                    </button>
                  </div>
                </div>
              )}

      {/* ARCHIVE CONFIRMATION MODAL */}
      {archiveConfirmOpen && (
        <div
          className="modal-overlay"
          onClick={() => setArchiveConfirmOpen(false)}
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bg-glass-strong)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '24px',
              padding: '1.25rem',
              width: '100%',
              maxWidth: '400px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '11px', background: 'rgba(245, 158, 11, 0.14)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Archive size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Archive Group
                </h3>
              </div>
              <button type="button" onClick={() => setArchiveConfirmOpen(false)} style={{ width: '30px', height: '30px', borderRadius: '9px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              Archive <strong>"{selectedGroup?.name}"</strong>? It will be removed from your active list and moved to Archive.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', marginTop: '0.25rem' }}>
              <button type="button" onClick={() => setArchiveConfirmOpen(false)} style={{ padding: '8px 16px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 600, cursor: 'pointer' }}>
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setArchiveConfirmOpen(false);
                  handleArchiveGroup(selectedGroup);
                }}
                style={{
                  padding: '8px 18px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                }}
              >
                Move to Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 1 DELETE CONFIRMATION MODAL */}
      {deleteConfirmStep === 1 && (
        <div
          className="modal-overlay"
          onClick={() => setDeleteConfirmStep(0)}
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            background: 'rgba(0, 0, 0, 0.72)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bg-glass-strong)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '24px',
              padding: '1.25rem',
              width: '100%',
              maxWidth: '420px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '11px', background: 'rgba(239, 68, 68, 0.14)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Step 1 (1/2)</span>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Confirm group name</h3>
                </div>
              </div>
              <button type="button" onClick={() => setDeleteConfirmStep(0)} style={{ width: '30px', height: '30px', borderRadius: '9px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              Start deleting <strong>"{selectedGroup?.name}"</strong>? Type the group name exactly below to continue:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                Group name: <code style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '2px 6px', borderRadius: '6px' }}>{selectedGroup?.name}</code>
              </label>
              <input
                type="text"
                placeholder={selectedGroup?.name}
                value={deleteNameInput}
                onChange={e => setDeleteNameInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem'
                }}
                autoFocus
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', marginTop: '0.25rem' }}>
              <button type="button" onClick={() => setDeleteConfirmStep(0)} style={{ padding: '8px 16px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 600, cursor: 'pointer' }}>
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteNameInput.trim() !== selectedGroup?.name?.trim()}
                onClick={() => setDeleteConfirmStep(2)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '12px',
                  background: deleteNameInput.trim() === selectedGroup?.name?.trim() ? '#ef4444' : 'var(--bg-tertiary)',
                  border: 'none',
                  color: deleteNameInput.trim() === selectedGroup?.name?.trim() ? '#ffffff' : 'var(--text-muted)',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: deleteNameInput.trim() === selectedGroup?.name?.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.15s ease'
                }}
              >
                Next step (2/2) <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2 DELETE CONFIRMATION MODAL */}
      {deleteConfirmStep === 2 && (
        <div
          className="modal-overlay"
          onClick={() => setDeleteConfirmStep(0)}
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            background: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bg-glass-strong)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              borderRadius: '24px',
              padding: '1.25rem',
              width: '100%',
              maxWidth: '420px',
              boxShadow: '0 24px 60px rgba(239, 68, 68, 0.25)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '11px', background: '#ef4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Trash2 size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Step 2 (Final confirmation)</span>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#ef4444' }}>Permanently Delete Group</h3>
                </div>
              </div>
              <button type="button" onClick={() => setDeleteConfirmStep(0)} style={{ width: '30px', height: '30px', borderRadius: '9px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '14px', padding: '12px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <AlertTriangle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                <strong>WARNING:</strong> All student connections and results for <code>"{selectedGroup?.name}"</code> will be permanently deleted! This cannot be undone.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', marginTop: '0.25rem' }}>
              <button type="button" onClick={() => setDeleteConfirmStep(0)} style={{ padding: '8px 16px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '0.84rem', fontWeight: 600, cursor: 'pointer' }}>
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeleteConfirmStep(0);
                  handleDeleteGroup(selectedGroup);
                }}
                style={{
                  padding: '8px 20px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)'
                }}
              >
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL BEFORE ASSIGNING PACK */}
      {pendingPackAssign && (
        <div
          className="modal-overlay"
          onClick={() => setPendingPackAssign(null)}
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            background: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000
          }}
        >
          <div
            className="group-settings-bento-modal"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '420px',
              width: '92%',
              padding: '1.2rem 1.3rem',
              borderRadius: '24px',
              background: 'var(--bg-glass-strong)',
              border: '1px solid var(--border)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top-Right Soft Blue Radial Glow */}
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#3b82f6' }}>
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Assign Pack
                  </h3>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    {pendingPackAssign.group.name}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPendingPackAssign(null)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  color: 'var(--text-muted)',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Pack Summary Card */}
            <div
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '12px 14px',
                marginBottom: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                position: 'relative',
                zIndex: 1
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 800 }}>
                  {pendingPackAssign.pack.title}
                </strong>
                {pendingPackAssign.pack.level && (
                  <span className="group-level-badge" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                    {pendingPackAssign.pack.level}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span>{pendingPackAssign.pack.wordCount || (pendingPackAssign.pack.words ? pendingPackAssign.pack.words.length : 0)} words</span>
                <span>•</span>
                <span style={{ color: '#3b82f6', fontWeight: 600 }}>
                  {pendingPackAssign.category === 'assignedPacks' ? 'Main Pack' : "Extra Pack"}
                </span>
              </div>
            </div>

            <p style={{ margin: '0 0 1.2rem 0', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.4, position: 'relative', zIndex: 1 }}>
              Assign this pack to <strong>{pendingPackAssign.group.name}</strong>?
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', position: 'relative', zIndex: 1 }}>
              <button
                type="button"
                onClick={() => setPendingPackAssign(null)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '14px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  handleAssignPack(pendingPackAssign.group.id, pendingPackAssign.pack.id, pendingPackAssign.category);
                  setPendingPackAssign(null);
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '14px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  background: '#3b82f6',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)'
                }}
              >
                Yes, Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
