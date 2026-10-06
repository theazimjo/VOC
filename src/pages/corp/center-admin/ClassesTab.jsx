import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Archive, ArchiveRestore, ChevronDown, ChevronRight, ChevronUp, Clock, Gauge, Layers, PlusCircle, Settings, Trash2, X, Zap,
} from 'lucide-react';
import { createGroup, deleteGroup, updateGroupDetails, updateGroupStatus } from '../../../services/corpService';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { formatRelativeEn, studentMastery } from '../super-admin/centerActivity';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { masteryTone } from './useGroupInsights';

// The Classes + Reports tabs, shared by AdminTeacherDetail (a real
// centers/{id}/teachers/{} record) and AdminProfileDetail (an admin who
// isn't one — the center's original admin or a co-admin). Both kinds of
// people can own classes the same way (a group's `teacherId` is just a
// foreign key to whoever runs it — see corpService.createGroup — nothing
// requires it to point at a `teachers` row specifically), so this is one
// real feature, not a fork per page: `ownerId` is either a teacherId or an
// admin's uid, `groups` are filtered by `g.teacherId === ownerId` either
// way and CenterDataContext resolves the owner's name back from either the
// teachers list or the admins list (see teacherById there).

const NEW_GROUP_WINDOW_MS = 48 * 60 * 60 * 1000;
const isNewGroup = (g) => Boolean(g.createdAt) && Date.now() - new Date(g.createdAt).getTime() < NEW_GROUP_WINDOW_MS;

function GroupSortIcon({ active, dir }) {
  if (!active) return <ChevronDown size={12} style={{ opacity: 0.4 }} />;
  return dir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
}

// The Reports tab: real numbers derived straight from the owner's groups
// (only the active ones, same as CenterDataContext computes
// teacher.groupsCount etc.) — works identically whether the owner is a
// teacher or an admin.
export function ReportsTab({ groups, ownerId }) {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const own = useMemo(
    () => groups
      .filter((g) => g.teacherId === ownerId && g.status !== 'archived')
      .map((g) => {
        const values = Object.values(g.students || {}).map(studentMastery).filter((m) => m != null);
        return { ...g, mastery: values.length ? Math.round(values.reduce((x, y) => x + y, 0) / values.length) : null };
      })
      .sort((a, b) => (b.activity.lastActivity || 0) - (a.activity.lastActivity || 0)),
    [groups, ownerId],
  );
  const students = own.reduce((sum, g) => sum + (g.activity.students || 0), 0);
  const activeWeek = own.reduce((sum, g) => sum + (g.activity.activeWeek || 0), 0);
  const lastActivity = Math.max(0, ...own.map((g) => g.activity.lastActivity || 0)) || null;
  const mastered = own.filter((g) => g.mastery != null);
  const avgMastery = mastered.length ? Math.round(mastered.reduce((sum, g) => sum + g.mastery, 0) / mastered.length) : null;
  const activePct = students ? Math.round((activeWeek / students) * 100) : 0;

  const tiles = [
    { key: 'classes', icon: <Layers size={17} />, tone: 'blue', label: 'Active classes', value: own.length, foot: own.length ? `${students} students in total` : 'No classes yet' },
    { key: 'week', icon: <Zap size={17} />, tone: 'green', label: 'Active this week', value: activeWeek, suffix: students ? `/ ${students}` : null, bar: students ? activePct : null, barCls: activePct >= 50 ? 'is-good' : 'is-mid', foot: students ? `${activePct}% of their students` : 'No students yet' },
    { key: 'mastery', icon: <Gauge size={17} />, tone: 'purple', label: 'Avg mastery', value: avgMastery == null ? '—' : `${avgMastery}%`, bar: avgMastery, barCls: masteryTone(avgMastery) || 'is-blue', foot: 'Across their classes' },
    { key: 'last', icon: <Clock size={17} />, tone: 'orange', label: 'Last activity', value: formatRelativeEn(lastActivity), small: true, foot: 'Latest practice in any class' },
  ];

  return (
    <div className="ca-stack">
      <div className="ca-dash-tiles">
        {tiles.map((t) => (
          <div key={t.key} className="ca-dash-tile">
            <div className="ca-dash-tile-top">
              <span className={`ca-dash-tile-icon tone-${t.tone}`}>{t.icon}</span>
              <span className="ca-dash-tile-label">{t.label}</span>
            </div>
            <div className={`ca-dash-tile-value ${t.small ? 'is-small' : ''}`}>
              {t.value}
              {t.suffix && <span className="ca-dash-tile-suffix">{t.suffix}</span>}
            </div>
            {t.bar != null && <div className="ca-dash-bar"><span className={t.barCls} style={{ width: `${t.bar}%` }} /></div>}
            <span className="ca-dash-tile-foot">{t.foot}</span>
          </div>
        ))}
      </div>

      <section className="ca-card is-faculty-card">
        <div className="faculty-toolbar">
          <div className="faculty-toolbar-left"><span className="ca-card-title">By class</span></div>
        </div>
        {own.length === 0 ? (
          <div className="ca-panel-empty"><span className="ca-empty">No active classes.</span></div>
        ) : isDesktop ? (
          <div className="faculty-table teacher-reports-table">
            <div className="faculty-table-head">
              <span>Class</span>
              <span>Students</span>
              <span>Active this week</span>
              <span>Avg mastery</span>
              <span>Last activity</span>
              <span />
            </div>
            {own.map((g) => {
              const pct = g.activity.students ? Math.round((g.activity.activeWeek / g.activity.students) * 100) : 0;
              return (
                <div key={g.id} className="faculty-table-row" role="button" tabIndex={0} onClick={() => navigate(`/corp/admin/groups/${g.id}`)} onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/corp/admin/groups/${g.id}`); }}>
                  <span className="faculty-name-link">{g.name || 'Class'}</span>
                  <span className={g.activity.students ? '' : 'ca-muted'}>{g.activity.students || '—'}</span>
                  {g.activity.students ? (
                    <span className="ca-dash-mastery">
                      <span className="ca-dash-bar is-inline"><span className={pct >= 50 ? 'is-good' : 'is-mid'} style={{ width: `${pct}%` }} /></span>
                      <span className="ca-dash-mastery-val">{g.activity.activeWeek}/{g.activity.students}</span>
                    </span>
                  ) : <span className="ca-muted">—</span>}
                  {g.mastery == null ? <span className="ca-muted">—</span> : (
                    <span className="ca-dash-mastery">
                      <span className="ca-dash-bar is-inline"><span className={masteryTone(g.mastery) || 'is-low'} style={{ width: `${g.mastery}%` }} /></span>
                      <span className="ca-dash-mastery-val">{g.mastery}%</span>
                    </span>
                  )}
                  <span className={g.activity.lastActivity ? '' : 'ca-muted'}>{g.activity.lastActivity ? formatRelativeEn(g.activity.lastActivity) : 'Never'}</span>
                  <span className="ca-row-actions"><ChevronRight size={16} className="ca-row-chevron" aria-hidden="true" /></span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="ca-mobile-list">
            {own.map((g) => (
              <button key={g.id} type="button" className="ca-mobile-row" onClick={() => navigate(`/corp/admin/groups/${g.id}`)}>
                <span className="ca-course-icon ca-group-letter" aria-hidden="true">{(g.name || 'C').charAt(0).toUpperCase()}</span>
                <span className="ca-mobile-row-main">
                  <span className="ca-dash-student-name">{g.name || 'Class'}</span>
                  <span className="faculty-email-sub">
                    {g.activity.students} students{g.mastery != null ? ` · ${g.mastery}% mastery` : ''}{g.activity.lastActivity ? ` · ${formatRelativeEn(g.activity.lastActivity)}` : ''}
                  </span>
                </span>
                {g.activity.students > 0 && (
                  <span className="ca-mobile-row-stat"><b>{g.activity.activeWeek}/{g.activity.students}</b><small>active</small></span>
                )}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// The Classes tab: empty-state banner or the class table, plus every modal
// it opens (Add Class, Class Settings, Archive/Delete confirm). `ownerId`
// is stored as the group's `teacherId`; `ownerName` is just for copy.
export function ClassesTab({ centerId, ownerId, ownerName, groups, patch, showToast }) {
  const navigate = useNavigate();

  const [selectedGroups, setSelectedGroups] = useState(() => new Set());
  const [groupSort, setGroupSort] = useState({ key: 'name', dir: 'asc' });
  const [confirmDeleteGroups, setConfirmDeleteGroups] = useState(false);
  const [confirmArchiveGroups, setConfirmArchiveGroups] = useState(false);
  const [groupsBusy, setGroupsBusy] = useState(false);
  const [addClassOpen, setAddClassOpen] = useState(false);
  const [addClassForm, setAddClassForm] = useState({ name: '' });
  const [addClassBusy, setAddClassBusy] = useState(false);
  const [addClassError, setAddClassError] = useState('');
  const [classSettingsGroup, setClassSettingsGroup] = useState(null);
  const [classSettingsName, setClassSettingsName] = useState('');
  const [classSettingsBusy, setClassSettingsBusy] = useState(false);
  const [classSettingsError, setClassSettingsError] = useState('');

  // Selection can point at a group that's just been deleted/moved out from
  // under it (e.g. a bulk delete) — drop those ids instead of leaving a
  // phantom selection.
  useEffect(() => {
    setSelectedGroups((s) => new Set([...s].filter((id) => groups.some((g) => g.id === id))));
  }, [groups]);

  const ownGroups = useMemo(
    () => groups
      .filter((g) => g.teacherId === ownerId)
      .sort((a, b) => (a.status === 'archived') - (b.status === 'archived') || (b.activity.lastActivity || 0) - (a.activity.lastActivity || 0)),
    [groups, ownerId],
  );
  const sortedGroups = useMemo(() => {
    const dir = groupSort.dir === 'asc' ? 1 : -1;
    return [...ownGroups].sort((a, b) => {
      if (groupSort.key === 'students') return dir * ((a.activity.students || 0) - (b.activity.students || 0));
      return dir * (a.name || '').localeCompare(b.name || '');
    });
  }, [ownGroups, groupSort]);
  const toggleGroupSort = (key) => setGroupSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));

  const toggleGroupOne = (id) => setSelectedGroups((s) => {
    const next = new Set(s);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  const toggleGroupAll = () => setSelectedGroups((s) => (s.size === sortedGroups.length ? new Set() : new Set(sortedGroups.map((g) => g.id))));

  const openClassSettings = () => {
    if (selectedGroups.size !== 1) return;
    const group = sortedGroups.find((g) => g.id === [...selectedGroups][0]);
    if (!group) return;
    setClassSettingsGroup(group);
    setClassSettingsName(group.name || '');
    setClassSettingsError('');
  };

  const submitClassSettings = async (e) => {
    e.preventDefault();
    const name = classSettingsName.trim();
    if (!name) return;
    setClassSettingsBusy(true);
    setClassSettingsError('');
    try {
      await updateGroupDetails(centerId, classSettingsGroup.id, { name });
      patch((c) => ({
        ...c,
        groups: { ...c.groups, [classSettingsGroup.id]: { ...c.groups[classSettingsGroup.id], name } },
      }));
      setClassSettingsGroup(null);
      showToast('Class updated');
    } catch (err) {
      setClassSettingsError(err.message);
    } finally {
      setClassSettingsBusy(false);
    }
  };

  // Selection is "all archived" only when every selected class is already
  // archived — that's what flips the toolbar button to Restore instead of
  // Archive (a mixed selection still archives the active ones).
  const allSelectedArchived = selectedGroups.size > 0
    && [...selectedGroups].every((id) => sortedGroups.find((g) => g.id === id)?.status === 'archived');

  const archiveSelectedGroups = async () => {
    const ids = [...selectedGroups];
    setGroupsBusy(true);
    try {
      await Promise.all(ids.map((id) => updateGroupStatus(centerId, id, 'archived')));
      patch((c) => {
        const nextGroups = { ...c.groups };
        ids.forEach((id) => { nextGroups[id] = { ...nextGroups[id], status: 'archived' }; });
        return { ...c, groups: nextGroups };
      });
      setSelectedGroups(new Set());
      setConfirmArchiveGroups(false);
      showToast(`${ids.length} class${ids.length > 1 ? 'es' : ''} archived`);
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setGroupsBusy(false);
    }
  };

  // Reversible, so no confirm step — same as un-checking a box.
  const restoreSelectedGroups = async () => {
    const ids = [...selectedGroups];
    setGroupsBusy(true);
    try {
      await Promise.all(ids.map((id) => updateGroupStatus(centerId, id, 'active')));
      patch((c) => {
        const nextGroups = { ...c.groups };
        ids.forEach((id) => { nextGroups[id] = { ...nextGroups[id], status: 'active' }; });
        return { ...c, groups: nextGroups };
      });
      setSelectedGroups(new Set());
      showToast(`${ids.length} class${ids.length > 1 ? 'es' : ''} restored`);
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setGroupsBusy(false);
    }
  };

  const deleteSelectedGroups = async () => {
    const ids = [...selectedGroups];
    setGroupsBusy(true);
    try {
      await Promise.all(ids.map((id) => deleteGroup(centerId, id)));
      patch((c) => {
        const nextGroups = { ...c.groups };
        ids.forEach((id) => delete nextGroups[id]);
        return { ...c, groups: nextGroups };
      });
      setSelectedGroups(new Set());
      setConfirmDeleteGroups(false);
      showToast(`${ids.length} class${ids.length > 1 ? 'es' : ''} removed`);
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setGroupsBusy(false);
    }
  };

  const openAddClass = () => {
    setAddClassForm({ name: '' });
    setAddClassError('');
    setAddClassOpen(true);
  };

  const submitAddClass = async (e) => {
    e.preventDefault();
    const name = addClassForm.name.trim();
    if (!name) return;
    setAddClassBusy(true);
    setAddClassError('');
    try {
      const group = await createGroup(centerId, ownerId, { name });
      patch((c) => ({ ...c, groups: { ...(c.groups || {}), [group.id]: group } }));
      setAddClassOpen(false);
      showToast('Class added');
    } catch (err) {
      setAddClassError(err.message);
    } finally {
      setAddClassBusy(false);
    }
  };

  return (
    <div>
      {ownGroups.length === 0 ? (
        <div className="teacher-empty-banner">
          <div className="teacher-empty-center-box">
            <h3 className="teacher-empty-title">{ownerName || 'They'} has no classes.</h3>
            <p className="teacher-empty-sub">You can set up their first class for them.</p>
            <button type="button" className="teacher-add-class-btn" onClick={openAddClass}>
              <PlusCircle size={16} /> Add Class
            </button>
          </div>
        </div>
      ) : (
        <section className="ca-card is-faculty-card">
          <div className="faculty-toolbar">
            <div className="faculty-toolbar-left">
              <button
                type="button"
                className="faculty-btn-secondary"
                disabled={selectedGroups.size !== 1}
                onClick={openClassSettings}
              >
                <Settings size={14} /> <span className="ca-btn-label">Class Settings</span>
              </button>
              <button
                type="button"
                className="faculty-btn-secondary"
                disabled={selectedGroups.size === 0 || groupsBusy}
                onClick={() => (allSelectedArchived ? restoreSelectedGroups() : setConfirmArchiveGroups(true))}
              >
                {allSelectedArchived ? <><ArchiveRestore size={14} /> <span className="ca-btn-label">Restore</span></> : <><Archive size={14} /> <span className="ca-btn-label">Archive</span></>}
              </button>
              <button
                type="button"
                className="faculty-btn-delete"
                disabled={selectedGroups.size === 0}
                onClick={() => setConfirmDeleteGroups(true)}
              >
                <Trash2 size={14} /> <span className="ca-btn-label">Delete</span>
              </button>
            </div>
            <div className="faculty-toolbar-right">
              <button type="button" className="faculty-btn-invite" onClick={openAddClass}>
                <PlusCircle size={14} /> Add Class
              </button>
            </div>
          </div>

          <div className="faculty-table teacher-classes-table">
            <div className="faculty-table-head">
              <span>
                <input
                  type="checkbox"
                  checked={selectedGroups.size > 0 && selectedGroups.size === sortedGroups.length}
                  onChange={toggleGroupAll}
                  aria-label="Select all"
                />
              </span>
              <button type="button" className="faculty-th-sort" onClick={() => toggleGroupSort('name')}>
                CLASS NAME <GroupSortIcon active={groupSort.key === 'name'} dir={groupSort.dir} />
              </button>
              <button type="button" className="faculty-th-sort" onClick={() => toggleGroupSort('students')}>
                STUDENTS <GroupSortIcon active={groupSort.key === 'students'} dir={groupSort.dir} />
              </button>
              <span className="teacher-classes-extra">Active this week</span>
              <span className="teacher-classes-extra">Homework</span>
              <span className="teacher-classes-extra">Last activity</span>
            </div>

            {sortedGroups.map((g) => (
              <div
                key={g.id}
                className={`faculty-table-row ${selectedGroups.has(g.id) ? 'is-selected' : ''}`}
                onClick={() => navigate(`/corp/admin/groups/${g.id}`)}
              >
                <span onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedGroups.has(g.id)}
                    onChange={() => toggleGroupOne(g.id)}
                    aria-label={`Select ${g.name}`}
                  />
                </span>
                <div className="faculty-cell-name">
                  <span className="teacher-class-name-row">
                    {isNewGroup(g) && <span className="class-new-badge">New</span>}
                    <span className="faculty-name-link">{g.name || 'Class'}</span>
                  </span>
                  {g.status === 'archived' && <span className="faculty-email-sub">Archived</span>}
                </div>
                <span>
                  {g.activity.students > 0 ? (
                    g.activity.students
                  ) : (
                    <button
                      type="button"
                      className="class-add-students-link"
                      onClick={(e) => { e.stopPropagation(); navigate(`/corp/admin/groups/${g.id}`); }}
                    >
                      <PlusCircle size={13} /> Add
                    </button>
                  )}
                </span>
                <span className="teacher-classes-extra">
                  {g.activity.students ? (
                    <span className="ca-dash-mastery">
                      <span className="ca-dash-bar is-inline"><span className={g.activity.activeWeek / g.activity.students >= 0.5 ? 'is-good' : 'is-mid'} style={{ width: `${Math.round((g.activity.activeWeek / g.activity.students) * 100)}%` }} /></span>
                      <span className="ca-dash-mastery-val">{g.activity.activeWeek}/{g.activity.students}</span>
                    </span>
                  ) : <span className="ca-muted">—</span>}
                </span>
                <span className={`teacher-classes-extra ${g.activity.homework ? '' : 'ca-muted'}`}>{g.activity.homework || '—'}</span>
                <span className={`teacher-classes-extra ${g.activity.lastActivity ? '' : 'ca-muted'}`}>{g.activity.lastActivity ? formatRelativeEn(g.activity.lastActivity) : 'Never'}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {addClassOpen && (
        <div className="adm-modal-overlay" onClick={() => !addClassBusy && setAddClassOpen(false)}>
          <div className="invite-modal-card" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={submitAddClass}>
              <div className="invite-modal-head">
                <div className="invite-modal-title">
                  <PlusCircle size={20} className="invite-title-icon" />
                  <span>Add Class for {ownerName || 'Them'}</span>
                </div>
                <button
                  type="button"
                  className="faculty-icon-btn"
                  onClick={() => !addClassBusy && setAddClassOpen(false)}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="invite-modal-body">
                <label className="invite-field-label">Class Name</label>
                <input
                  className="invite-input"
                  required
                  autoFocus
                  placeholder="e.g. Mon-Wed-Fri 5:00 PM"
                  value={addClassForm.name}
                  onChange={(e) => setAddClassForm({ ...addClassForm, name: e.target.value })}
                />

                {addClassError && <div className="sa-flow-error" style={{ marginTop: 10 }}>{addClassError}</div>}

                <div className="invite-modal-foot">
                  <button type="submit" className="faculty-btn-invite" disabled={addClassBusy}>
                    {addClassBusy ? 'Adding...' : 'Add Class'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {classSettingsGroup && (
        <div className="adm-modal-overlay" onClick={() => !classSettingsBusy && setClassSettingsGroup(null)}>
          <div className="invite-modal-card" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={submitClassSettings}>
              <div className="invite-modal-head">
                <div className="invite-modal-title">
                  <Settings size={20} className="invite-title-icon" />
                  <span>Class Settings</span>
                </div>
                <button
                  type="button"
                  className="faculty-icon-btn"
                  onClick={() => !classSettingsBusy && setClassSettingsGroup(null)}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="invite-modal-body">
                <label className="invite-field-label">Class Name</label>
                <input
                  className="invite-input"
                  required
                  autoFocus
                  placeholder="e.g. Mon-Wed-Fri 5:00 PM"
                  value={classSettingsName}
                  onChange={(e) => setClassSettingsName(e.target.value)}
                />

                {classSettingsError && <div className="sa-flow-error" style={{ marginTop: 10 }}>{classSettingsError}</div>}

                <div className="invite-modal-foot">
                  <button type="submit" className="faculty-btn-invite" disabled={classSettingsBusy}>
                    {classSettingsBusy ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmSheet
        open={confirmArchiveGroups}
        title={`Archive ${selectedGroups.size} class${selectedGroups.size > 1 ? 'es' : ''}?`}
        message="Students will keep their progress, but the class moves out of the active list."
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        busy={groupsBusy}
        onConfirm={archiveSelectedGroups}
        onCancel={() => !groupsBusy && setConfirmArchiveGroups(false)}
      />

      <ConfirmSheet
        open={confirmDeleteGroups}
        title={`Delete ${selectedGroups.size} class${selectedGroups.size > 1 ? 'es' : ''}?`}
        message="Students will lose access to these classes. This can't be undone."
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        danger
        busy={groupsBusy}
        onConfirm={deleteSelectedGroups}
        onCancel={() => !groupsBusy && setConfirmDeleteGroups(false)}
      />
    </div>
  );
}

// For the "remove this person" confirm dialogs on the two detail pages —
// how many of their classes would be left without an owner.
export function useOwnGroupsCount(groups, ownerId) {
  return useMemo(() => groups.filter((g) => g.teacherId === ownerId && g.status !== 'archived').length, [groups, ownerId]);
}
