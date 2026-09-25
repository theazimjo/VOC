import { useState } from 'react';
import { ArrowLeft, BarChart3, BookOpen, Check, ChevronRight, MoreVertical, NotebookPen, Plus, QrCode, Users } from 'lucide-react';
import { getHomeworkCompletion, getStudentSummary } from '../../utils';
import InviteGroupModal from '../../modals/InviteGroupModal';
import GroupHomeworkDetail from './GroupHomeworkDetail';
import GroupSubtabs from './GroupSubtabs';
import './GroupDetailView.css';

const SUBTAB_TITLES = {
  students: "O'quvchilar",
  words: "So'z to'plamlari",
  homework: 'Vazifalar',
  stats: 'Statistika',
  settings: 'Guruh sozlamalari',
};

function formatShortDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' });
}

export default function GroupDetailView({ p }) {
  const {
    assigningGroup, basePath, groupHomeworkList, groupStudentsList, handleAddHomework, handleOpenGroupSettings, homeworkSelection,
    hwId, navigate, openHomeworkEditor, savingHomework, selectedGroup, selectedGroupStats, setAssigningGroup, setSelectedGroupId,
    setShowHomeworkEditor, setViewingStudentDetail, showHomeworkEditor, setViewingHomeworkItem, subTab, viewingHomeworkItem,
  } = p;

  const [showInvite, setShowInvite] = useState(false);
  const currentHw = hwId ? groupHomeworkList.find(h => h.id === hwId) : null;
  const groupPath = `${basePath}/group/${selectedGroup.id}`;

  const packCount = (selectedGroup.assignedPacks || []).length + (selectedGroup.additionalPacks || []).length;
  const latestHw = groupHomeworkList.length > 0 ? groupHomeworkList[groupHomeworkList.length - 1] : null;
  const latestHwDone = latestHw
    ? groupStudentsList.filter(st => getHomeworkCompletion(st, latestHw).allDone).length
    : 0;

  const startHomework = () => {
    if (packCount === 0) {
      navigate(`${groupPath}/words`);
      return;
    }
    openHomeworkEditor();
    navigate(`${groupPath}/homework`);
  };

  const goBack = () => {
    if (viewingHomeworkItem) {
      setViewingHomeworkItem(null);
    } else if (showHomeworkEditor) {
      setShowHomeworkEditor(false);
    } else if (assigningGroup) {
      setAssigningGroup(null);
    } else if (hwId) {
      navigate(`${groupPath}/homework`);
    } else if (subTab) {
      navigate(groupPath);
    } else {
      setSelectedGroupId(null);
      navigate(basePath);
    }
  };

  const title = viewingHomeworkItem
    ? viewingHomeworkItem.unitTitle
    : showHomeworkEditor
      ? 'Yangi vazifa'
      : assigningGroup
        ? "To'plam biriktirish"
        : hwId
          ? (currentHw?.name || 'Vazifa')
          : SUBTAB_TITLES[subTab] || selectedGroup.name;

  const secondaryLinks = [
    { key: 'homework', icon: NotebookPen, label: 'Vazifalar tarixi', meta: `${groupHomeworkList.length} ta` },
    { key: 'words', icon: BookOpen, label: "So'z to'plamlari", meta: `${packCount} ta` },
    { key: 'stats', icon: BarChart3, label: 'Statistika', meta: selectedGroupStats ? `${selectedGroupStats.avgPercent}%` : '' },
  ];

  return (
    <div className="group-detail-container">
      <div className="ios-group-top-bar">
        <button type="button" className="ios-back-btn" onClick={goBack} title="Orqaga">
          <ArrowLeft size={18} />
        </button>

        <div className="ios-title-group">
          <h2 className="ios-group-title">{title}</h2>
        </div>

        {showHomeworkEditor ? (
          <button
            type="button"
            className="gov-save-btn"
            onClick={handleAddHomework}
            disabled={savingHomework || homeworkSelection?.size === 0}
          >
            {savingHomework ? 'Saqlanmoqda...' : `Berish (${homeworkSelection?.size || 0})`}
          </button>
        ) : !subTab && !hwId && !viewingHomeworkItem && (
          <button
            type="button"
            className="ios-action-btn"
            onClick={() => {
              handleOpenGroupSettings(selectedGroup);
              navigate(`${groupPath}/settings`);
            }}
            title="Guruh sozlamalari"
          >
            <MoreVertical size={18} />
          </button>
        )}
      </div>

      {!subTab && !hwId && (
        <div className="gov">
          {/* Summary + the two things a teacher does every lesson */}
          <div className="gov-hero">
            <div className="gov-hero-meta">
              {selectedGroup.level && <span className="gov-level">{selectedGroup.level}</span>}
              <span className="gov-hero-stat"><Users size={14} /> {groupStudentsList.length} o'quvchi</span>
              {selectedGroupStats && <span className="gov-hero-stat">O'rtacha {selectedGroupStats.avgPercent}%</span>}
            </div>
            <div className="gov-actions">
              <button type="button" className="gov-btn gov-btn-primary" onClick={startHomework}>
                <Plus size={18} />
                <span>{packCount === 0 ? "To'plam biriktirish" : 'Vazifa berish'}</span>
              </button>
              <button type="button" className="gov-btn" onClick={() => setShowInvite(true)}>
                <QrCode size={18} />
                <span>Taklif qilish</span>
              </button>
            </div>
          </div>

          {/* Latest homework — who did it */}
          {latestHw && (
            <button type="button" className="gov-card gov-hw" onClick={() => navigate(`${groupPath}/homework/${latestHw.id}`)}>
              <div className="gov-card-head">
                <span className="gov-card-label">Oxirgi vazifa</span>
                <span className="gov-card-date">{formatShortDate(latestHw.assignedAt)}</span>
              </div>
              <div className="gov-hw-name">{latestHw.name}</div>
              <div className="gov-progress">
                <div
                  className="gov-progress-fill"
                  style={{ width: groupStudentsList.length ? `${Math.round((latestHwDone / groupStudentsList.length) * 100)}%` : 0 }}
                />
              </div>
              <div className="gov-hw-foot">
                <span><strong>{latestHwDone}</strong> / {groupStudentsList.length} o'quvchi bajardi</span>
                <ChevronRight size={16} />
              </div>
            </button>
          )}

          {/* Students */}
          <div className="gov-card">
            <div className="gov-card-head">
              <span className="gov-card-label">O'quvchilar ({groupStudentsList.length})</span>
              {groupStudentsList.length > 0 && (
                <button type="button" className="gov-link" onClick={() => navigate(`${groupPath}/students`)}>
                  Boshqarish
                </button>
              )}
            </div>

            {groupStudentsList.length === 0 ? (
              <div className="gov-empty">
                <p>Hali hech kim qo'shilmagan.</p>
                <span>QR kodni sinfda ko'rsating yoki havolani guruh chatiga yuboring.</span>
                <button type="button" className="gov-btn gov-btn-primary" onClick={() => setShowInvite(true)}>
                  <QrCode size={18} />
                  <span>Taklif qilish</span>
                </button>
              </div>
            ) : (
              <div className="gov-students">
                {groupStudentsList.map((st, i) => {
                  const summary = getStudentSummary(st, selectedGroup);
                  const hwState = latestHw ? getHomeworkCompletion(st, latestHw) : null;
                  return (
                    <button
                      type="button"
                      key={st.id || st.uid || `st_${i}`}
                      className="gov-student"
                      onClick={() => setViewingStudentDetail(st)}
                    >
                      <span className="gov-avatar">{(st.name || '?').charAt(0).toUpperCase()}</span>
                      <span className="gov-student-name">{st.name || "O'quvchi"}</span>
                      {hwState && (
                        hwState.allDone ? (
                          <span className="gov-chip gov-chip-done"><Check size={12} strokeWidth={3} /> Bajardi</span>
                        ) : (
                          <span className="gov-chip">{hwState.doneCount}/{hwState.total}</span>
                        )
                      )}
                      <span className="gov-mastery">{summary.hasData ? `${summary.masteryPercent}%` : '—'}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Everything else */}
          <div className="gov-card gov-links">
            {secondaryLinks.map(({ key, icon: Icon, label, meta }) => (
              <button type="button" key={key} className="gov-link-row" onClick={() => navigate(`${groupPath}/${key}`)}>
                <span className="gov-link-icon"><Icon size={17} /></span>
                <span className="gov-link-label">{label}</span>
                <span className="gov-link-meta">{meta}</span>
                <ChevronRight size={16} className="gov-link-chevron" />
              </button>
            ))}
          </div>
        </div>
      )}

      {hwId ? <GroupHomeworkDetail p={p} /> : subTab && <GroupSubtabs p={p} />}

      <InviteGroupModal open={showInvite} onClose={() => setShowInvite(false)} group={selectedGroup} />
    </div>
  );
}
