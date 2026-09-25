import { useState } from 'react';
import {
  Activity, AlertTriangle, Archive, BookOpen, Check, ChevronDown, ChevronRight, Copy, Key, MoreVertical,
  Pencil, Plus, RotateCw, Save, Target, Trash2, Users, X, Zap
} from 'lucide-react';
import { GROUP_LEVEL_OPTIONS, aggregatePackProgress, getHomeworkCandidates, getPackUnits, getStudentSummary, getUsedHomeworkKeys } from '../../utils';
import { IRREGULAR_VERBS_PACK_ID } from '../../../../../data/irregularVerbsCorpPack';
import TeacherModal from '../../TeacherModal';
import './GroupSubtabs.css';

export default function GroupSubtabs({ p }) {
  const {
    activeStudentMenu, askConfirm, assigningGroup, basePath, copiedCode, copyCode, customPacks,
    groupHomeworkList, groupSettingsForm, groupStudentsList,
    handleArchiveGroup, handleAssignPack, handleDeleteGroup, handleRegenerateCode, handleRemovePack, handleSaveGroupSettings,
    homeworkSelection, navigate, openHomeworkEditor, savingGroupSettings, selectedGroup, selectedGroupStats,
    setActiveStudentMenu, setAssigningGroup, setGroupSettingsForm,
    showHomeworkEditor, setStudentMenuPos, subTab, toggleHomeworkItem,
  } = p;

  const [activePackTab, setActivePackTab] = useState('all');
  const [expandedStudents, setExpandedStudents] = useState(new Set());
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteNameInput, setDeleteNameInput] = useState('');

  const getGroupPackIds = (group) => [...(group?.assignedPacks || []), ...(group?.additionalPacks || [])];
  const packCategory = (packId) => (packId === IRREGULAR_VERBS_PACK_ID ? 'additionalPacks' : 'assignedPacks');

  const confirmAssignPack = (pack, group, category) => askConfirm({
    title: "To'plam biriktirish",
    message: `"${pack.title}" to'plamini ${group.name} guruhiga biriktirasizmi?`,
    confirmLabel: 'Biriktirish',
    cancelLabel: 'Bekor qilish',
    onConfirm: () => handleAssignPack(group.id, pack.id, category),
  });

  const confirmArchiveGroup = () => askConfirm({
    title: 'Guruhni arxivlash',
    message: `"${selectedGroup?.name}" arxivga o'tkazilsinmi? U faol guruhlar ro'yxatidan olinadi.`,
    confirmLabel: "Arxivga o'tkazish",
    cancelLabel: 'Bekor qilish',
    onConfirm: () => handleArchiveGroup(selectedGroup),
  });

  return (
    <div className="group-tab-content">
              {subTab === 'students' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                  {groupStudentsList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'var(--bg-tertiary)', borderRadius: '16px', border: '1px dashed var(--border)', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <Users size={36} style={{ marginBottom: '4px', opacity: 0.5 }} />
                      <p style={{ margin: 0, fontWeight: 600 }}>Hali hech kim qo'shilmagan.</p>
                      <span style={{ fontSize: '0.85rem' }}>O'quvchilarga shu 6 xonali kodni bering:</span>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                        <strong style={{ fontSize: '1.4rem', color: 'var(--accent)', letterSpacing: '0.14em', fontFamily: 'monospace' }}>{selectedGroup.code}</strong>
                        <button
                          type="button"
                          className="gib-code-btn"
                          onClick={() => copyCode(selectedGroup.code)}
                          title="Kodni nusxalash"
                        >
                          {copiedCode === selectedGroup.code ? <Check size={16} color="#34c759" /> : <Copy size={16} />}
                          <span>{copiedCode === selectedGroup.code ? 'Nusxalandi' : 'Nusxalash'}</span>
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
                                <div className="st-email">{st.email || "Email yo'q"}</div>
                              </div>
                            </div>

                            <div className="st-stats">
                              {summary.hasData ? (
                                <>
                                  <span className="badge-active" title="O'zlashtirish">{summary.masteryPercent}%</span>
                                  {summary.atRiskCount > 0 && (
                                    <span
                                      title={`${summary.atRiskCount} ta so'z e'tibor talab qiladi`}
                                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--warning)' }}
                                    >
                                      <AlertTriangle size={13} /> {summary.atRiskCount}
                                    </span>
                                  )}
                                </>
                              ) : (
                                <span className="badge-active">Qo'shildi</span>
                              )}

                              <button
                                type="button"
                                className="btn-action-more"
                                title="Amallar"
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

              {/* SUB-TAB 2: WORDS / PACKS — one flat list. Irregular Verbs is
                  stored under additionalPacks (the student side renders it
                  with its own trainer), every other pack under assignedPacks;
                  the teacher never has to pick between the two. */}
              {subTab === 'words' && (
                assigningGroup ? (
                  <div className="teacher-settings-hero-card" style={{ marginBottom: 0, padding: '1rem 1.1rem', borderRadius: '20px', width: '100%', maxWidth: 'none' }}>
                    {customPacks.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: '16px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                        Hali biriktirish uchun to'plam yo'q. "So'zlar" bo'limida yangi to'plam yarating.
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {customPacks.map(p => {
                          const target = assigningGroup || selectedGroup;
                          const isAssigned = getGroupPackIds(target).includes(p.id);
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
                                <div style={{ width: '36px', height: '36px', borderRadius: '11px', background: 'rgba(var(--accent-rgb), 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent)' }}>
                                  <BookOpen size={18} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0, flex: 1 }}>
                                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {p.title}
                                  </strong>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                                    {p.level && <span className="group-level-badge" style={{ fontSize: '0.66rem', padding: '1px 6px', flexShrink: 0 }}>{p.level}</span>}
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      {p.wordCount || (p.words ? p.words.length : 0)} so'z · {p.scope === 'own' ? "Mening to'plamim" : "Markaz to'plami"}
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
                                  <Check size={14} strokeWidth={3} /> Biriktirilgan
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => confirmAssignPack(p, target, packCategory(p.id))}
                                  style={{
                                    padding: '6px 14px',
                                    fontSize: '0.82rem',
                                    fontWeight: 700,
                                    borderRadius: '12px',
                                    background: 'var(--accent)',
                                    color: '#ffffff',
                                    border: 'none',
                                    cursor: 'pointer',
                                    flexShrink: 0,
                                    boxShadow: '0 4px 12px rgba(var(--accent-rgb), 0.3)'
                                  }}
                                >
                                  Biriktirish
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', position: 'relative' }}>
                    <button
                      type="button"
                      className="fab-add-pack-btn fab-icon-only"
                      onClick={() => setAssigningGroup(selectedGroup)}
                      title="To'plam biriktirish"
                    >
                      <Plus size={26} />
                    </button>

                    <div className="teacher-settings-hero-card" style={{ marginBottom: 0, padding: '1rem 1.1rem', borderRadius: '20px', width: '100%', maxWidth: 'none' }}>
                      {(() => {
                        const assigned = [
                          ...(selectedGroup.assignedPacks || []).map(pid => ({ pid, key: 'assignedPacks' })),
                          ...(selectedGroup.additionalPacks || []).map(pid => ({ pid, key: 'additionalPacks' })),
                        ];
                        return (
                          <>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Guruh to'plamlari ({assigned.length})
                              </span>
                            </div>

                            {assigned.length === 0 ? (
                              <div style={{ padding: '14px', background: 'var(--bg-tertiary)', borderRadius: '14px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.84rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
                                <span>Guruhga hali to'plam biriktirilmagan. Vazifa berish uchun avval to'plam biriktiring.</span>
                                <button
                                  type="button"
                                  style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '0.86rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                  onClick={() => setAssigningGroup(selectedGroup)}
                                >
                                  <Plus size={15} /> To'plam biriktirish
                                </button>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {assigned.map(({ pid, key }) => {
                                  const p = customPacks.find(cp => cp.id === pid);
                                  if (!p) return null;
                                  return (
                                    <div
                                      key={`${key}_${pid}`}
                                      className="student-progress-row"
                                      style={{
                                        padding: '10px 12px',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '10px',
                                        background: 'var(--bg-glass-strong)',
                                        border: '1px solid var(--border)',
                                        boxShadow: 'var(--card-shadow)'
                                      }}
                                    >
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                                        <div style={{ width: '34px', height: '34px', borderRadius: '11px', background: 'rgba(var(--accent-rgb), 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent)' }}>
                                          <BookOpen size={16} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
                                          <strong style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {p.title}
                                          </strong>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                                            {p.level && <span className="group-level-badge" style={{ fontSize: '0.66rem', padding: '1px 6px', flexShrink: 0 }}>{p.level}</span>}
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                              {p.wordCount || (p.words ? p.words.length : 0)} so'z
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() => handleRemovePack(selectedGroup.id, pid, key)}
                                        title="Olib tashlash"
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
                          </>
                        );
                      })()}
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
                              background: activePackTab === 'all' ? 'var(--accent)' : 'var(--bg-tertiary)',
                              color: activePackTab === 'all' ? '#ffffff' : 'var(--text-primary)',
                              transition: 'all 0.18s ease'
                            }}
                          >
                            Hammasi ({candidates.length})
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
                                background: activePackTab === packId ? 'var(--accent)' : 'var(--bg-tertiary)',
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
                              Avval guruhga so'z to'plami biriktiring.
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
                                            border: checked ? '1px solid var(--accent)' : '1px solid var(--border)',
                                            background: checked ? 'rgba(var(--accent-rgb), 0.14)' : 'var(--bg-glass-strong)'
                                          }}
                                        >
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                                            <div style={{ width: '34px', height: '34px', borderRadius: '11px', background: 'rgba(var(--accent-rgb), 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent)' }}>
                                              <BookOpen size={16} />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
                                              <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 700 }}>{u.unitTitle}</strong>
                                              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                                {u.totalWords} so'z{u.used && ' · Berilgan'}
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
                                                background: checked ? 'var(--accent)' : 'transparent',
                                                border: `1.5px solid ${checked ? 'var(--accent)' : 'var(--border)'}`
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
                      title="Yangi vazifa"
                    >
                      <Plus size={26} />
                    </button>

                    <div className="teacher-settings-hero-card" style={{ marginBottom: 0, padding: '1rem 1.1rem', borderRadius: '20px', width: '100%', maxWidth: 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Vazifalar ({groupHomeworkList.length})
                        </span>
                      </div>

                      {groupHomeworkList.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: '16px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                          Yangi vazifa berish uchun pastdagi "+" tugmasini bosing.
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {[...groupHomeworkList].reverse().map(hw => (
                            <button
                              type="button"
                              key={hw.id}
                              className="student-progress-row"
                              onClick={() => navigate(`${basePath}/group/${selectedGroup.id}/homework/${hw.id}`)}
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
                                <div style={{ width: '36px', height: '36px', borderRadius: '11px', background: 'rgba(var(--accent-rgb), 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent)' }}>
                                  <BookOpen size={18} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
                                  <strong style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {hw.name}
                                  </strong>
                                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                                    {(hw.items || []).length} ta mavzu{hw.assignedAt && <> · {new Date(hw.assignedAt).toLocaleDateString('uz-UZ')}</>}
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
                      { label: "O'quvchilar", val: `${selectedGroup.studentsCount || 0}`, icon: Users, color: 'var(--accent)', bg: 'rgba(var(--accent-rgb), 0.14)' },
                      { label: "To'plamlar", val: `${selectedGroupStats.packEntries.length}`, icon: BookOpen, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.14)' },
                      { label: "Faol o'quvchilar", val: `${selectedGroupStats.activeStudentsCount}`, icon: Zap, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.14)' },
                      { label: "O'zlashtirish", val: `${selectedGroupStats.avgPercent}%`, icon: Target, color: '#34c759', bg: 'rgba(52, 199, 89, 0.14)' },
                    ].map(({ label, val, icon: Icon, color, bg }) => (
                      <div
                        key={label}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '16px',
                          background: 'var(--bg-glass-strong)',
                          border: '1px solid var(--border)',
                          boxShadow: 'var(--card-shadow)',
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
                      <Activity size={16} color="var(--accent)" />
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        O'quvchilar natijasi (to'plamlar bo'yicha)
                      </span>
                    </div>

                    {groupStudentsList.length === 0 ? (
                      <div style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--bg-tertiary)', borderRadius: '14px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                        Statistika uchun guruhda hali o'quvchi yo'q.
                      </div>
                    ) : selectedGroupStats.packEntries.length === 0 ? (
                      <div style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--bg-tertiary)', borderRadius: '14px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                        Guruhga hali to'plam biriktirilmagan — statistikani ko'rish uchun avval to'plam biriktiring.
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
                                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'var(--accent)', color: '#fff', fontSize: '0.82rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    {(student.name || '?').charAt(0).toUpperCase()}
                                  </div>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', minWidth: 0, flex: 1 }}>
                                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      {student.name}
                                    </strong>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>
                                      {studentLearnedTotal} / {studentPackTotal} so'z o'rganildi
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
                                      background: overallMastery >= 80 ? 'rgba(52, 199, 89, 0.14)' : overallMastery > 0 ? 'rgba(var(--accent-rgb), 0.14)' : 'var(--bg-glass-strong)',
                                      color: overallMastery >= 80 ? '#34c759' : overallMastery > 0 ? 'var(--accent)' : 'var(--text-muted)',
                                      fontSize: '0.76rem',
                                      fontWeight: 800,
                                      border: '1px solid var(--border)'
                                    }}
                                  >
                                    {overallMastery}%
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
                                    const packName = p ? p.title : "Noma'lum to'plam";
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
                                          <div style={{ width: `${percent}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent), #34c759)', borderRadius: '999px' }} />
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
                                                  title={`${u.monthTitle} — ${u.title}${us ? ` (${us.wordsLearned || 0}/${us.totalWords || u.totalWords})` : " — hali boshlanmagan"}`}
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
                        <h3 className="tshc-title">Guruh sozlamalari</h3>
                        <p className="tshc-sub">Nomi, darajasi va taklif kodi</p>
                      </div>
                    </div>

                    <form onSubmit={handleSaveGroupSettings} className="gsbm-form">
                      <div className="gsbm-field">
                        <label className="gsbm-label">Guruh nomi</label>
                        <input
                          type="text"
                          className="gsbm-input"
                          required
                          placeholder="Masalan: Beginner, Du-Chor-Ju 17:00"
                          value={groupSettingsForm.name}
                          onChange={e => setGroupSettingsForm({ ...groupSettingsForm, name: e.target.value })}
                        />
                      </div>

                      <div className="gsbm-field">
                        <label className="gsbm-label">Daraja</label>
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
                        <label className="gsbm-label">Taklif kodi</label>
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
                            <Key size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.12em', color: 'var(--accent)', fontFamily: 'monospace' }}>
                              {groupSettingsForm.code || selectedGroup.code}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
                            <button
                              type="button"
                              onClick={() => copyCode(groupSettingsForm.code || selectedGroup.code)}
                              title="Kodni nusxalash"
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
                              <span>{copiedCode === (groupSettingsForm.code || selectedGroup.code) ? 'Nusxalandi' : 'Nusxalash'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={handleRegenerateCode}
                              title="Yangi kod yaratish"
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
                        <Save size={16} /> {savingGroupSettings ? 'Saqlanmoqda...' : 'Saqlash'}
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
                        <h3 className="tshc-title" style={{ color: '#f59e0b', fontSize: '1rem' }}>Guruhni arxivlash</h3>
                        <p className="tshc-sub">Guruhni faol ro'yxatdan vaqtincha olib, arxivga o'tkazadi</p>
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
                      onClick={confirmArchiveGroup}
                    >
                      <Archive size={16} />
                      <span>Arxivga o'tkazish</span>
                    </button>
                  </div>

                  {/* Card 3: Delete Group (Step by Step) */}
                  <div className="teacher-settings-hero-card" style={{ borderColor: 'rgba(239, 68, 68, 0.22)' }}>
                    <div className="tshc-header" style={{ marginBottom: '1rem' }}>
                      <div className="tshc-icon-box" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' }}>
                        <Trash2 size={18} />
                      </div>
                      <div>
                        <h3 className="tshc-title" style={{ color: '#ef4444', fontSize: '1rem' }}>Guruhni o'chirish</h3>
                        <p className="tshc-sub">Guruh va uning barcha ma'lumotlari butunlay o'chiriladi</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="gsbm-danger-btn"
                      onClick={() => {
                        setDeleteNameInput('');
                        setDeleteConfirmOpen(true);
                      }}
                    >
                      <Trash2 size={16} />
                      <span>O'chirishni boshlash</span>
                    </button>
                  </div>
                </div>
              )}

      {/* DELETE GROUP CONFIRMATION — single flat modal, typed-name safety
          check kept (irreversible action) but collapsed from the old
          two-step flow into one so it's one less tap without losing the
          "type the exact group name" guard. */}
      <TeacherModal open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} className="gsbm-delete-modal">
        <div className="gsbm-delete-header">
          <div className="gsbm-delete-icon">
            <Trash2 size={18} />
          </div>
          <div>
            <h3 className="gsbm-delete-title">Guruhni o'chirish</h3>
            <p className="gsbm-delete-sub">Buni qaytarib bo'lmaydi</p>
          </div>
          <button type="button" className="gsbm-icon-btn" onClick={() => setDeleteConfirmOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <div className="gsbm-delete-warning">
          <AlertTriangle size={18} />
          <div>
            <strong>"{selectedGroup?.name}"</strong> guruhidagi barcha o'quvchilar, to'plamlar va vazifa natijalari butunlay o'chiriladi.
          </div>
        </div>

        <div className="gsbm-field">
          <label className="gsbm-label">
            Tasdiqlash uchun <code>{selectedGroup?.name}</code> deb yozing
          </label>
          <input
            type="text"
            className="gsbm-input"
            placeholder={selectedGroup?.name}
            value={deleteNameInput}
            onChange={e => setDeleteNameInput(e.target.value)}
            autoFocus
          />
        </div>

        <div className="gsbm-delete-actions">
          <button type="button" className="gsbm-btn-secondary" onClick={() => setDeleteConfirmOpen(false)}>
            Bekor qilish
          </button>
          <button
            type="button"
            className="gsbm-btn-danger"
            disabled={deleteNameInput.trim() !== selectedGroup?.name?.trim()}
            onClick={() => {
              setDeleteConfirmOpen(false);
              handleDeleteGroup(selectedGroup);
            }}
          >
            Butunlay o'chirish
          </button>
        </div>
      </TeacherModal>
    </div>
  );
}
