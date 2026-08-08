import {
  AlertTriangle, ArrowRightLeft, BookOpen, Check, ChevronRight,
  Eye, NotebookPen, User, UserMinus, Users, X,
} from 'lucide-react';
import { auth } from '../../../../firebase';
import { IRREGULAR_VERBS_PACK_ID } from '../../../../data/irregularVerbsCorpPack';
import CustomPackEditor from '../../../../components/corp/CustomPackEditor';
import ConfirmSheet from '../../../../components/corp/ConfirmSheet';
import {
  GROUP_LEVEL_OPTIONS, aggregatePackProgress, getGroupPackEntries, getHomeworkCandidates,
  getPackUnits, getStudentSummary, getUsedHomeworkKeys, resolveHomeworkItemUnit,
} from '../utils';

export default function TeacherModals({ p }) {
  const {
    assignCategory, assigningGroup, centerId, centerTeachersList, closeConfirmSheet,
    confirmBusy, confirmSheet, customPacks, setCustomPacks, editForm,
    groupForm, groupHomeworkList, groupSettingsTarget, groupStudentsList,
    handleAddHomework, handleAssignPack, handleCreateGroup, handleRemoveStudent,
    handleTransferGroupTo, handleUpdateGroup, homeworkSelection, loadingTransferTeachers,
    runConfirmSheet, savingHomework, selectedGroup, setActiveStudentMenu, setAssignCategory,
    setAssigningGroup, setEditForm, setGroupForm, setShowCreateModal, setShowEditModal,
    setShowHomeworkEditor, setShowPackEditor, setShowTransferPicker, setViewingGroupStudents,
    setViewingHomeworkItem, setViewingStudentDetail, showCreateModal, showEditModal,
    showHomeworkEditor, showPackEditor, showTransferPicker, activeStudentMenu, studentMenuPos,
    submittingEditGroup, submittingGroup, toggleHomeworkItem,
    viewingGroupStudents, viewingHomeworkItem, viewingStudentDetail,
  } = p;

  return (
    <>

      {/* Student detail — per-pack mastery/retention breakdown */}
      {viewingStudentDetail && selectedGroup && (
        <div className="modal-overlay" onClick={() => setViewingStudentDetail(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2><User size={20} /> {viewingStudentDetail.name}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {viewingStudentDetail.email || 'Email kiritilmagan'}
            </p>

            {getGroupPackEntries(selectedGroup).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--text-secondary)' }}>
                Guruhga hali pack biriktirilmagan.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {getGroupPackEntries(selectedGroup).map(({ packId, category }) => {
                  const pack = customPacks.find(cp => cp.id === packId);
                  const agg = aggregatePackProgress((viewingStudentDetail.progress || {})[packId]);
                  const packUnits = pack ? getPackUnits(pack) : [];
                  return (
                    <div key={packId} style={{ padding: '12px 14px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{pack ? pack.title : 'Noma\'lum pack'}</strong>
                        <span className={`pack-category-badge cat-${category === 'Asosiy' ? 'main' : category === 'Kerakli' ? 'required' : 'extra'}`}>{category}</span>
                      </div>
                      {agg.hasData ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          <span>O'zlashtirilgan: <strong style={{ color: 'var(--text-primary)' }}>{agg.wordsLearned || 0}</strong></span>
                          <span>Mastery: <strong style={{ color: 'var(--success)' }}>{agg.masteryPercent || 0}%</strong></span>
                          <span>Retention: <strong style={{ color: 'var(--text-primary)' }}>{agg.retentionPercent || 0}%</strong></span>
                          {agg.atRiskCount > 0 && (
                            <span style={{ color: 'var(--warning)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <AlertTriangle size={13} /> {agg.atRiskCount} ta e'tibor talab
                            </span>
                          )}
                          <span>So'nggi faollik: {agg.lastActivity ? new Date(agg.lastActivity).toLocaleDateString() : '—'}</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Hali mashq qilinmagan.</span>
                      )}

                      {packUnits.length > 0 && (
                        <div className="unit-chip-row" style={{ marginTop: '10px' }}>
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
            )}

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setViewingStudentDetail(null)}>Yopish</button>
            </div>
          </div>
        </div>
      )}



      {/* Group transfer picker — replaces the old raw prompt() flow */}
      {showTransferPicker && groupSettingsTarget && (
        <div className="modal-overlay" onClick={() => setShowTransferPicker(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2><ArrowRightLeft size={20} /> "{groupSettingsTarget.name}"ni o'tkazish</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Guruh o'tkaziladigan o'qituvchini tanlang:
            </p>

            {loadingTransferTeachers ? (
              <div className="loading-spinner">Yuklanmoqda...</div>
            ) : centerTeachersList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--text-secondary)' }}>
                Markazda boshqa o'qituvchi topilmadi.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '320px', overflowY: 'auto' }}>
                {centerTeachersList.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    className="dropdown-item"
                    style={{ border: '1px solid var(--border)', justifyContent: 'space-between' }}
                    onClick={() => handleTransferGroupTo(t)}
                  >
                    <span>
                      <strong style={{ color: 'var(--text-primary)' }}>{t.name}</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{t.email}</div>
                    </span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            )}

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowTransferPicker(false)}>Bekor qilish</button>
            </div>
          </div>
        </div>
      )}

      {showPackEditor && (
        <CustomPackEditor
          centerId={centerId}
          ownerUid={auth.currentUser?.uid}
          onSaved={(pack) => {
            setCustomPacks(prev => [{ ...pack, scope: 'own' }, ...prev]);
            setShowPackEditor(false);
          }}
          onCancel={() => setShowPackEditor(false)}
        />
      )}

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2><Users size={20} /> Yangi Guruh Yaratish</h2>
            <form onSubmit={handleCreateGroup}>
              <div className="input-group" style={{ marginBottom: '1.25rem' }}>
                <label>Guruh Nomi *</label>
                <input
                  type="text"
                  className="input"
                  required
                  placeholder="masalan: Beginner Monday 17:00"
                  value={groupForm.name}
                  onChange={e => setGroupForm({ ...groupForm, name: e.target.value })}
                />
              </div>

              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label>Daraja (Level)</label>
                <select
                  className="select"
                  value={groupForm.level}
                  onChange={e => setGroupForm({ ...groupForm, level: e.target.value })}
                >
                  {GROUP_LEVEL_OPTIONS.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)}>Bekor qilish</button>
                <button type="submit" className="btn-primary" disabled={submittingGroup}>
                  {submittingGroup ? 'Yaratilmoqda...' : 'Guruhni Yaratish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Group Modal */}
      {showEditModal && selectedGroup && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2><Users size={20} /> Guruhni Tahrirlash</h2>
            <form onSubmit={handleUpdateGroup}>
              <div className="input-group" style={{ marginBottom: '1.25rem' }}>
                <label>Guruh Nomi *</label>
                <input
                  type="text"
                  className="input"
                  required
                  placeholder="masalan: Beginner Monday 17:00"
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>

              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label>Daraja (Level)</label>
                <select
                  className="select"
                  value={editForm.level}
                  onChange={e => setEditForm({ ...editForm, level: e.target.value })}
                >
                  {GROUP_LEVEL_OPTIONS.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowEditModal(false)}>Bekor qilish</button>
                <button type="submit" className="btn-primary" disabled={submittingEditGroup}>
                  {submittingEditGroup ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Homework Editor Modal — always adds a NEW assignment. Topics already
          given in an earlier one still show up (so the teacher can see
          what's already covered) but are greyed out and can't be reselected. */}
      {showHomeworkEditor && selectedGroup && (() => {
        const usedKeys = getUsedHomeworkKeys(groupHomeworkList);
        const candidates = getHomeworkCandidates(selectedGroup, customPacks, usedKeys);
        const byPack = new Map();
        candidates.forEach(c => {
          if (!byPack.has(c.packId)) byPack.set(c.packId, { packTitle: c.packTitle, units: [] });
          byPack.get(c.packId).units.push(c);
        });

        return (
          <div className="modal-overlay" onClick={() => !savingHomework && setShowHomeworkEditor(false)}>
            <div className="modal-content large" onClick={e => e.stopPropagation()}>
              <h2><NotebookPen size={20} /> Yangi uy vazifasi: {selectedGroup.name}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                Asosiy va qo'shimcha packlardagi mavzulardan bir nechtasini tanlang. Kulrang mavzular avval berilgan — ularni qayta tanlab bo'lmaydi.
              </p>

              {candidates.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: '14px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Avval "Packlar" bo'limidan guruhga Asosiy yoki Qo'shimcha pack biriktiring.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '50vh', overflowY: 'auto', paddingRight: '4px' }}>
                  {[...byPack.entries()].map(([packId, { packTitle, units }]) => (
                    <div key={packId} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <h4 style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                        {packTitle}
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {units.map(u => {
                          const key = `${u.packId}_${u.monthId}_${u.unitId}`;
                          const checked = homeworkSelection.has(key);
                          return (
                            <div
                              key={key}
                              onClick={() => toggleHomeworkItem(u)}
                              style={{
                                cursor: u.used ? 'default' : 'pointer',
                                opacity: u.used ? 0.5 : 1,
                                background: checked ? 'var(--accent-1-dim)' : 'var(--bg-tertiary)',
                                border: `1px solid ${checked ? 'var(--accent-1)' : 'var(--border)'}`,
                                padding: '10px 14px',
                                borderRadius: '12px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '12px'
                              }}
                            >
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem' }}>{u.unitTitle}</span>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                                  {u.totalWords} ta so'z{u.used && ' · Berilgan'}
                                </span>
                              </div>
                              {u.used ? (
                                <Check size={16} color="var(--text-muted)" strokeWidth={3} />
                              ) : (
                                <div
                                  style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '6px',
                                    flexShrink: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: checked ? 'var(--accent-1)' : 'transparent',
                                    border: `1.5px solid ${checked ? 'var(--accent-1)' : 'var(--border)'}`
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

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowHomeworkEditor(false)} disabled={savingHomework}>Bekor qilish</button>
                <button type="button" className="btn-primary" onClick={handleAddHomework} disabled={savingHomework || homeworkSelection.size === 0}>
                  {savingHomework ? 'Saqlanmoqda...' : `Vazifa berish (${homeworkSelection.size})`}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Homework Item Detail Window — opens when a teacher clicks one of
          the assigned homework topics: its word list plus, specifically for
          this one topic, which students have finished it. */}
      {viewingHomeworkItem && (() => {
        const item = viewingHomeworkItem;
        const unit = resolveHomeworkItemUnit(item, customPacks);
        const words = unit?.words || [];
        const studentStats = groupStudentsList.map(st => {
          const agg = aggregatePackProgress((st.progress || {})[item.packId]);
          const us = agg.units[`${item.monthId}_${item.unitId}`];
          const m = us ? (us.masteryPercent || 0) : 0;
          return { student: st, masteryPercent: m, done: m >= 80, started: !!us };
        });

        return (
          <div className="modal-overlay" onClick={() => setViewingHomeworkItem(null)}>
            <div className="modal-content large" onClick={e => e.stopPropagation()}>
              <h2><NotebookPen size={20} /> {item.unitTitle}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {item.packTitle} · {item.totalWords} ta so'z
              </p>

              <h4 style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                So'zlar
              </h4>
              {words.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '14px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  Bu mavzu endi topilmadi — pack o'zgargan bo'lishi mumkin.
                </div>
              ) : (
                <div className="tpv-words-grid" style={{ marginBottom: '1.25rem', maxHeight: '220px', overflowY: 'auto' }}>
                  {words.map(w => (
                    <div key={w.id} className="tpv-word-card">
                      <div className="tpv-word-top">
                        <strong>{w.word}</strong>
                      </div>
                      <div className="tpv-word-translation">{w.translation}</div>
                    </div>
                  ))}
                </div>
              )}

              <h4 style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                O'quvchilar bajarilishi
              </h4>
              {studentStats.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '14px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Guruhda o'quvchilar mavjud emas.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '260px', overflowY: 'auto' }}>
                  {studentStats.map(({ student, masteryPercent, done, started }) => (
                    <div key={student.id} className="student-progress-row" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
                      <div className="st-info">
                        <div className="st-avatar" style={{ background: 'var(--accent-1)', fontWeight: 700 }}>{(student.name || '?').charAt(0).toUpperCase()}</div>
                        <strong style={{ color: 'var(--text-primary)' }}>{student.name}</strong>
                      </div>
                      <span
                        className="badge-active"
                        style={{
                          background: done ? 'var(--success-dim)' : started ? 'var(--warning-dim)' : 'var(--bg-glass-hover)',
                          color: done ? 'var(--success)' : started ? 'var(--warning)' : 'var(--text-secondary)'
                        }}
                      >
                        {started ? `${masteryPercent}%${done ? ' · Done' : ''}` : 'Not started'}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setViewingHomeworkItem(null)}>Yopish</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Assign Pack Modal */}
      {/* Bento Ambient Hero Assign Pack Modal */}
      {assigningGroup && (
        <div className="modal-overlay" onClick={() => setAssigningGroup(null)}>
          <div className="group-settings-bento-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            {/* Modal Header */}
            <div className="gsbm-header">
              <div className="gsbm-title-block">
                <div className="gsbm-icon-box">
                  <BookOpen size={22} color="#3b82f6" />
                </div>
                <div>
                  <h3 className="gsbm-title">Pack Biriktirish</h3>
                  <p className="gsbm-sub">{assigningGroup.name}</p>
                </div>
              </div>
              <button
                type="button"
                className="ios-back-btn"
                onClick={() => setAssigningGroup(null)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Segmented Bar */}
            <div className="group-seg-bar" style={{ marginTop: '0.2rem', marginBottom: '0.8rem' }}>
              {[
                { key: 'assignedPacks', label: 'Asosiy Packlar' },
                { key: 'additionalPacks', label: "Qo'shimcha Packlar" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  className={`group-seg-btn ${assignCategory === key ? 'active' : ''}`}
                  onClick={() => setAssignCategory(key)}
                >
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Pack List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '360px', overflowY: 'auto', paddingRight: '4px' }}>
              {(() => {
                const assignablePacks = customPacks.filter(
                  p => p.id !== IRREGULAR_VERBS_PACK_ID || assignCategory === 'additionalPacks'
                );
                if (assignablePacks.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                      Hali biriktirish uchun packlar mavjud emas.
                    </div>
                  );
                }
                return assignablePacks.map(p => {
                  const isAssigned = (assigningGroup[assignCategory] || []).includes(p.id);
                  return (
                    <div
                      key={p.id}
                      style={{
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border)',
                        borderRadius: '16px',
                        padding: '12px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#3b82f6' }}>
                          <BookOpen size={18} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            <strong style={{ color: 'var(--text-primary)', fontSize: '0.92rem' }}>{p.title}</strong>
                            {p.level && <span className="group-level-badge">{p.level}</span>}
                          </div>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            {p.wordCount || (p.words ? p.words.length : 0)} ta so'z · {p.scope === 'own' ? 'Mening' : 'Markaz'}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={isAssigned ? 'gib-code-btn' : 'gsbm-save-btn'}
                        style={isAssigned ? { padding: '6px 12px', opacity: 0.8, cursor: 'default' } : { width: 'auto', padding: '7px 14px', fontSize: '0.82rem' }}
                        onClick={() => !isAssigned && handleAssignPack(assigningGroup.id, p.id, assignCategory)}
                        disabled={isAssigned}
                      >
                        {isAssigned ? <Check size={14} color="#34c759" /> : null}
                        <span>{isAssigned ? 'Biriktirilgan' : 'Biriktirish'}</span>
                      </button>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Footer */}
            <div style={{ marginTop: '0.8rem' }}>
              <button
                type="button"
                className="gsbm-cancel-btn"
                style={{ width: '100%' }}
                onClick={() => setAssigningGroup(null)}
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Students Progress Modal */}
      {viewingGroupStudents && (
        <div className="modal-overlay" onClick={() => setViewingGroupStudents(null)}>
          <div className="modal-content large" onClick={e => e.stopPropagation()}>
            <h2><Users size={20} /> {viewingGroupStudents.name} - O'quvchilar Progressi</h2>

            {groupStudentsList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
                Ushbu guruhga hali o'quvchilar ulanmagan.<br />
                O'quvchilarga 6 xonali ulanish kodini bering: <strong>{viewingGroupStudents.code}</strong>
              </div>
            ) : (
              <div className="students-progress-list">
                {groupStudentsList.map((st, i) => (
                  <div key={st.id || i} className="student-progress-row">
                    <div className="st-info">
                      <div className="st-avatar">{st.name.charAt(0)}</div>
                      <div>
                        <strong>{st.name}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{st.email || 'Email berilmagan'}</div>
                      </div>
                    </div>

                    <div className="st-stats">
                      <span className="badge-active">A'zo bo'ldi</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setViewingGroupStudents(null)}>Yopish</button>
            </div>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {viewingStudentDetail && (
        <div className="modal-overlay" onClick={() => setViewingStudentDetail(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="st-avatar" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
                  {viewingStudentDetail.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 800 }}>
                    {viewingStudentDetail.name}
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {viewingStudentDetail.email || 'Email kiritilmagan'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="ios-back-btn"
                onClick={() => setViewingStudentDetail(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-tertiary)', padding: '14px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Guruhga a'zo bo'lgan sana:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem' }}>
                  {viewingStudentDetail.joinedAt ? new Date(viewingStudentDetail.joinedAt).toLocaleDateString() : "Yaqinda"}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>O'zlashtirish darajasi:</span>
                <span className="badge-active">
                  {getStudentSummary(viewingStudentDetail, selectedGroup).masteryPercent}% mastery
                </span>
              </div>
            </div>

            <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
              <button className="btn-secondary" onClick={() => setViewingStudentDetail(null)}>Yopish</button>
              <button
                type="button"
                className="btn-danger"
                style={{ padding: '8px 16px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => {
                  const st = viewingStudentDetail;
                  setViewingStudentDetail(null);
                  handleRemoveStudent(st);
                }}
              >
                Guruhdan chiqarish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Student Row Dropdown Menu (Top-Level to bypass card overflow clipping) */}
      {activeStudentMenu && (() => {
        const st = groupStudentsList.find(s => (s.id || s.uid || s.email) === activeStudentMenu || `st_${groupStudentsList.indexOf(s)}` === activeStudentMenu);
        if (!st) return null;

        return (
          <>
            <div
              style={{ position: 'fixed', inset: 0, zIndex: 99998, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(2px)' }}
              onClick={() => setActiveStudentMenu(null)}
            />
            <div
              className="teacher-action-dropdown"
              style={{
                position: 'fixed',
                top: `${studentMenuPos.top}px`,
                right: `${studentMenuPos.right}px`,
                zIndex: 99999,
                minWidth: '190px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '6px',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)'
              }}
            >
              <button
                type="button"
                className="dropdown-item"
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', border: 'none', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}
                onClick={() => {
                  setActiveStudentMenu(null);
                  setViewingStudentDetail(st);
                }}
              >
                <Eye size={16} color="#3b82f6" /> Batafsil ko'rish
              </button>
              <button
                type="button"
                className="dropdown-item dropdown-item-danger"
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}
                onClick={() => {
                  setActiveStudentMenu(null);
                  handleRemoveStudent(st);
                }}
              >
                <UserMinus size={16} color="#ef4444" /> Guruhdan chiqarish
              </button>
            </div>
          </>
        );
      })()}



      <ConfirmSheet
        open={!!confirmSheet}
        title={confirmSheet?.title}
        message={confirmSheet?.message}
        confirmLabel={confirmSheet?.confirmLabel}
        danger={confirmSheet?.danger}
        busy={confirmBusy}
        onConfirm={runConfirmSheet}
        onCancel={closeConfirmSheet}
      />
    </>
  );
}
