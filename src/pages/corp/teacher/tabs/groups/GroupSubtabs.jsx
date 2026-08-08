import {
  AlertTriangle, BookOpen, Check, ChevronRight, Copy, Key, MoreVertical,
  Pencil, Plus, RotateCw, Save, Trash2, Users, X,
} from 'lucide-react';
import { GROUP_LEVEL_OPTIONS, aggregatePackProgress, getPackUnits, getStudentSummary } from '../../utils';

export default function GroupSubtabs({ p }) {
  const {
    activeStudentMenu, copiedCode, copyCode, customPacks,
    groupHomeworkList, groupSettingsForm, groupStudentsList,
    handleDeleteGroup, handleRegenerateCode, handleRemovePack, handleSaveGroupSettings,
    navigate, openHomeworkEditor, savingGroupSettings, selectedGroup, selectedGroupStats,
    setActiveStudentMenu, setAssignCategory, setAssigningGroup, setGroupSettingsForm,
    setStudentMenuPos, subTab,
  } = p;

  return (
    <div className="group-tab-content">
              {subTab === 'students' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Top Quick Invite Banner */}
                  <div className="group-invite-banner">
                    <div className="gib-left">
                      <div className="gib-icon"><Key size={20} color="#3b82f6" /></div>
                      <div>
                        <div className="gib-title">Guruh taklif kodi: <strong>{selectedGroup.code}</strong></div>
                        <div className="gib-sub">O'quvchilar ilovadagi PIN maydoniga ushbu kodni kiritishi kerak</div>
                      </div>
                    </div>
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

                  {groupStudentsList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'var(--bg-tertiary)', borderRadius: '16px', border: '1px dashed var(--border)', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <Users size={36} style={{ marginBottom: '4px', opacity: 0.5 }} />
                      <p style={{ margin: 0, fontWeight: 600 }}>Ushbu guruhga hali o'quvchilar ulanmagan.</p>
                      <span style={{ fontSize: '0.85rem' }}>O'quvchilarga 6 xonali ulanish kodini bering:</span>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                        <strong style={{ fontSize: '1.4rem', color: '#3b82f6', letterSpacing: '0.14em', fontFamily: 'monospace' }}>{selectedGroup.code}</strong>
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
                                <div className="st-email">{st.email || 'Email kiritilmagan'}</div>
                              </div>
                            </div>

                            <div className="st-stats">
                              {summary.hasData ? (
                                <>
                                  <span className="badge-active" title="O'zlashtirish">{summary.masteryPercent}% mastery</span>
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
                                <span className="badge-active">A'zo bo'ldi</span>
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

              {/* SUB-TAB 2: WORDS / PACKS */}
              {subTab === 'words' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '750px', margin: '0 auto', position: 'relative' }}>
                  {/* Floating Action Button (FAB) for adding packs */}
                  <button
                    type="button"
                    className="fab-add-pack-btn fab-icon-only"
                    onClick={() => { setAssignCategory('assignedPacks'); setAssigningGroup(selectedGroup); }}
                    title="Pack Biriktirish"
                  >
                    <Plus size={26} />
                  </button>

                  {/* Category Sections: Asosiy & Qo'shimcha */}
                  {[
                    { key: 'assignedPacks', label: 'Asosiy Packlar', emptyText: 'Guruhga hali birorta asosiy so\'z packi biriktirilmagan.' },
                    { key: 'additionalPacks', label: 'Qo\'shimcha Packlar', emptyText: 'Guruhga hali birorta qo\'shimcha pack biriktirilmagan.' },
                  ].map(({ key, label, emptyText }) => {
                    const packIds = selectedGroup[key] || [];
                    return (
                      <div key={key} className="teacher-settings-hero-card" style={{ marginBottom: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {label} ({packIds.length})
                          </span>
                        </div>

                        {packIds.length === 0 ? (
                          <div style={{ textAlign: 'center', padding: '2rem 1rem', background: 'var(--bg-tertiary)', borderRadius: '18px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <BookOpen size={28} style={{ opacity: 0.4 }} />
                            <span>{emptyText}</span>
                            <button
                              type="button"
                              className="gib-code-btn"
                              style={{ marginTop: '6px' }}
                              onClick={() => { setAssignCategory(key); setAssigningGroup(selectedGroup); }}
                            >
                              <Plus size={14} /> Pack Biriktirish
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {packIds.map(pid => {
                              const p = customPacks.find(cp => cp.id === pid);
                              if (!p) return null;
                              return (
                                <div key={pid} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#3b82f6' }}>
                                      <BookOpen size={20} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{p.title}</strong>
                                        {p.level && <span className="group-level-badge">{p.level}</span>}
                                      </div>
                                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{p.wordCount || (p.words ? p.words.length : 0)} ta so'z</span>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePack(selectedGroup.id, pid, key)}
                                    title="Guruhdan olib tashlash"
                                    style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', cursor: 'pointer', padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s ease' }}
                                  >
                                    <X size={16} />
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
              )}

              {/* SUB-TAB: HOMEWORK — just the names here; tap one to open its
                  own page with the full topic list + per-student completion. */}
              {subTab === 'homework' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="group-words-header">
                    <div>
                      <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0, fontWeight: 600 }}>Uy vazifasi</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                        {groupHomeworkList.length > 0
                          ? `${groupHomeworkList.length} ta vazifa berilgan.`
                          : "Guruhga hali uy vazifasi berilmagan."}
                      </p>
                    </div>
                    <button
                      className="btn-add-course-primary"
                      onClick={openHomeworkEditor}
                      style={{ padding: '8px 14px', fontSize: '0.85rem', height: '36px', flexShrink: 0 }}
                    >
                      <Plus size={15} /> Yangi vazifa
                    </button>
                  </div>

                  {groupHomeworkList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: '14px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      "Yangi vazifa" tugmasini bosib, Asosiy/Qo'shimcha mavzulardan bir nechtasini tanlang.
                    </div>
                  ) : (
                    <div className="tpv-list" style={{ marginTop: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[...groupHomeworkList].reverse().map(hw => (
                        <button
                          type="button"
                          key={hw.id}
                          className="tpv-row"
                          onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/homework/${hw.id}`)}
                          style={{ cursor: 'pointer', width: '100%', textAlign: 'left', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                            <span className="tpv-row-label" style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.95rem' }}>{hw.name}</span>
                            <span className="tpv-row-meta" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                              {(hw.items || []).length} ta mavzu{hw.assignedAt && <> · {new Date(hw.assignedAt).toLocaleDateString()}</>}
                            </span>
                          </div>
                          <ChevronRight size={18} className="tpv-row-arrow" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SUB-TAB 3: STATISTICS */}
              {subTab === 'stats' && (
                <div className="group-stats-tab" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="stat-cards-grid">
                    <div className="group-stat-card">
                      <div className="group-stat-label">O'quvchilar soni</div>
                      <div className="group-stat-value">{selectedGroup.studentsCount || 0} ta</div>
                    </div>
                    <div className="group-stat-card">
                      <div className="group-stat-label">Biriktirilgan packlar</div>
                      <div className="group-stat-value">{selectedGroupStats.packEntries.length} ta</div>
                    </div>
                    <div className="group-stat-card">
                      <div className="group-stat-label">Faol o'quvchilar</div>
                      <div className="group-stat-value" style={{ color: 'var(--accent-1)' }}>{selectedGroupStats.activeStudentsCount} ta</div>
                    </div>
                    <div className="group-stat-card">
                      <div className="group-stat-label">O'rtacha o'zlashtirish</div>
                      <div className="group-stat-value" style={{ color: 'var(--success)' }}>{selectedGroupStats.avgPercent}%</div>
                    </div>
                  </div>

                  <div className="teachers-table-card" style={{ marginTop: '0.5rem', background: 'var(--bg-tertiary)' }}>
                    <h4 style={{ padding: '1rem 1.25rem', margin: 0, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', fontSize: '0.98rem', fontWeight: 600 }}>
                      O'quvchilar o'zlashtirishi (Packlar bo'yicha)
                    </h4>
                    {groupStudentsList.length === 0 ? (
                      <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        Statistika ko'rsatish uchun guruhda o'quvchilar mavjud emas.
                      </div>
                    ) : selectedGroupStats.packEntries.length === 0 ? (
                      <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        Guruhga hali pack biriktirilmagan — statistika ko'rsatish uchun avval "Packlar" bo'limidan pack biriktiring.
                      </div>
                    ) : (
                      <div className="student-progress-cards">
                        {groupStudentsList.map((student) => (
                          <div key={student.id} className="student-progress-card">
                            <div className="student-progress-card-head">
                              <div className="st-avatar" style={{ background: 'var(--accent-1)', fontWeight: 700 }}>{(student.name || '?').charAt(0).toUpperCase()}</div>
                              <strong style={{ color: 'var(--text-primary)' }}>{student.name}</strong>
                            </div>
                            <div className="student-progress-pack-list">
                              {selectedGroupStats.packEntries.map(({ packId, category }) => {
                                const p = customPacks.find(cp => cp.id === packId);
                                const packName = p ? p.title : 'Noma\'lum pack';
                                const totalWords = p ? (p.wordCount || (p.words ? p.words.length : 0)) : 0;
                                const agg = aggregatePackProgress((student.progress || {})[packId]);
                                const percent = totalWords > 0 ? Math.min(100, Math.round((agg.wordsLearned / totalWords) * 100)) : 0;
                                const packUnits = p ? getPackUnits(p) : [];

                                return (
                                  <div key={packId} className="student-progress-pack-row">
                                    <div className="student-progress-pack-info">
                                      <span className="student-progress-pack-name">{packName}</span>
                                      <span className={`pack-category-badge cat-${category === 'Asosiy' ? 'main' : category === 'Kerakli' ? 'required' : 'extra'}`}>{category}</span>
                                    </div>
                                    <div className="student-progress-bar-row">
                                      <span className="student-progress-count">{agg.wordsLearned || 0} / {totalWords}</span>
                                      <div className="student-progress-track">
                                        <div className="student-progress-fill" style={{ width: `${percent}%` }} />
                                      </div>
                                      <span className="student-progress-percent">{percent}%</span>
                                    </div>
                                    <div className="student-progress-last-activity" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                                      <span>So'nggi faollik: {agg.lastActivity ? new Date(agg.lastActivity).toLocaleDateString() : '—'}</span>
                                      {agg.hasData && (
                                        <span style={{ color: 'var(--success)' }}>Mastery: {agg.masteryPercent}%</span>
                                      )}
                                      {agg.hasData && (
                                        <span>Retention: {agg.retentionPercent}%</span>
                                      )}
                                      {agg.atRiskCount > 0 && (
                                        <span style={{ color: 'var(--warning)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                          <AlertTriangle size={12} /> {agg.atRiskCount}
                                        </span>
                                      )}
                                    </div>

                                    {/* Per-topic breakdown — which specific mavzular this student
                                        has actually covered, not just an overall pack %. */}
                                    {packUnits.length > 0 && (
                                      <div className="unit-chip-row">
                                        {packUnits.map(u => {
                                          const us = agg.units[u.unitKey];
                                          const m = us ? (us.masteryPercent || 0) : 0;
                                          const tier = !us ? 'none' : m >= 80 ? 'done' : m > 0 ? 'partial' : 'none';
                                          return (
                                            <span
                                              key={u.unitKey}
                                              className={`unit-chip unit-chip-${tier}`}
                                              title={`${u.monthTitle} — ${u.title}${us ? ` (${us.wordsLearned || 0}/${us.totalWords || u.totalWords})` : ' — hali boshlanmagan'}`}
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
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SUB-TAB 5: GROUP SETTINGS */}
              {subTab === 'settings' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                  {/* Card 1: Asosiy Sozlamalar */}
                  <div className="teacher-settings-hero-card">
                    <div className="tshc-header">
                      <div className="tshc-icon-box">
                        <Pencil size={20} />
                      </div>
                      <div>
                        <h3 className="tshc-title">Guruh Sozlamalari</h3>
                        <p className="tshc-sub">Nomi, kurs darajasi va taklif kodi</p>
                      </div>
                    </div>

                    <form onSubmit={handleSaveGroupSettings} className="gsbm-form">
                      <div className="gsbm-field">
                        <label className="gsbm-label">Guruh Nomi</label>
                        <input
                          type="text"
                          className="gsbm-input"
                          required
                          placeholder="masalan: Beginner Monday 17:00"
                          value={groupSettingsForm.name}
                          onChange={e => setGroupSettingsForm({ ...groupSettingsForm, name: e.target.value })}
                        />
                      </div>

                      <div className="gsbm-field">
                        <label className="gsbm-label">Kurs Darajasi (Level)</label>
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

                      {/* Compact Taklif Kodi Row */}
                      <div className="gsbm-field">
                        <label className="gsbm-label">Guruh Taklif Kodi</label>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border)',
                          borderRadius: '14px',
                          padding: '10px 14px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Key size={18} color="#3b82f6" />
                            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.12em', color: '#3b82f6', fontFamily: 'monospace' }}>
                              {groupSettingsForm.code || selectedGroup.code}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              type="button"
                              className="gib-code-btn"
                              onClick={() => copyCode(groupSettingsForm.code || selectedGroup.code)}
                              title="Kodni nusxalash"
                            >
                              {copiedCode === (groupSettingsForm.code || selectedGroup.code) ? <Check size={16} color="#34c759" /> : <Copy size={16} />}
                              <span>{copiedCode === (groupSettingsForm.code || selectedGroup.code) ? 'Nusxalandi' : 'Nusxalash'}</span>
                            </button>
                            <button
                              type="button"
                              className="gib-code-btn"
                              onClick={handleRegenerateCode}
                              title="Yangi kod yaratish"
                            >
                              <RotateCw size={16} />
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
                        <Save size={16} /> {savingGroupSettings ? 'Saqlanmoqda...' : 'O\'zgarishlarni saqlash'}
                      </button>
                    </form>
                  </div>

                  {/* Card 2: Guruhni O'chirish (Xavfli Hudud) */}
                  <div className="teacher-settings-hero-card" style={{ borderColor: 'rgba(239, 68, 68, 0.22)' }}>
                    <div className="tshc-header" style={{ marginBottom: '1rem' }}>
                      <div className="tshc-icon-box" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' }}>
                        <Trash2 size={18} />
                      </div>
                      <div>
                        <h3 className="tshc-title" style={{ color: '#ef4444', fontSize: '1rem' }}>Guruhni O'chirish</h3>
                        <p className="tshc-sub">Guruh va unga tegishli barcha ma'lumotlar qayta tiklanmaydi</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="gsbm-danger-btn"
                      onClick={() => handleDeleteGroup(selectedGroup)}
                    >
                      <Trash2 size={16} />
                      <span>Guruhni O'chirish</span>
                    </button>
                  </div>
                </div>
              )}
    </div>
  );
}
