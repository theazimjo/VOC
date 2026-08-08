import { useState, useEffect, useRef } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import { updatePassword } from 'firebase/auth';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Users, Plus, BookOpen, Key,
  Eye, Copy, Check, Sparkles, Trash2,
  Archive, RotateCcw, BarChart3, Settings, Search,
  Save, CheckCircle2, TrendingUp, Shield, ArrowLeft, ChevronRight, X, ChevronDown, MoreVertical, Moon, Sun,
  Pencil, RotateCw, Share2, User, MoreHorizontal, UserMinus, ArrowRightLeft, AlertTriangle, Megaphone, NotebookPen
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { auth } from '../../firebase';
import {
  getTeacherGroups, createGroup, getCenterCustomPacks,
  assignPackToGroup, removePackFromGroup, getGroupStudents, duplicateCustomPack, deleteCustomPack,
  updateGroupStatus, updateGroupDetails, deleteGroup,
  getCenterTeachers, removeStudentFromGroup, updateTeacherProfile, getActiveAnnouncementsForRole,
  ensureIrregularVerbsPack, getGroupHomeworkList, addGroupHomework
} from '../../services/corpService';
import { IRREGULAR_VERBS_PACK_ID } from '../../data/irregularVerbsCorpPack';
import CustomPackEditor from '../../components/corp/CustomPackEditor';
import TeacherPackViewer from '../../components/corp/TeacherPackViewer';
import CourseManager from '../../components/corp/CourseManager';
import ConfirmSheet from '../../components/corp/ConfirmSheet';
import './TeacherDashboard.css';
import './CenterAdminDashboard.css';

const GROUP_LEVEL_OPTIONS = [
  'Beginner', 'Elementary', 'Pre-Intermediate', 'Intermediate', 'Upper-Intermediate',
  'Advanced', 'Pre-IELTS', 'IELTS', 'CEFR B1', 'CEFR B2', 'CEFR C1',
];

// All packs assigned to a group across its three categories, deduplicated,
// each tagged with the category it's assigned under (a pack could in theory
// appear in more than one category — first match wins for the badge).
function getGroupPackEntries(group) {
  if (!group) return [];
  const categories = [
    { key: 'assignedPacks', label: 'Asosiy' },
    { key: 'requiredPacks', label: 'Kerakli' },
    { key: 'additionalPacks', label: "Qo'shimcha" },
  ];
  const seen = new Map();
  categories.forEach(({ key, label }) => {
    (group[key] || []).forEach(packId => {
      if (!seen.has(packId)) seen.set(packId, { packId, category: label });
    });
  });
  return [...seen.values()];
}

// Flatten a pack's months → units into a flat list of topics, each tagged
// with the same `${monthId}_${unitId}` key CorpPractice/StudentCorpLearn
// write progress under — this is what lets the teacher see "3-mavzu: 0%"
// instead of only a whole-pack %. Same months||units||words fallback used
// everywhere else in the corp module for legacy flat-shape packs.
function getPackUnits(pack) {
  if (!pack) return [];
  const months = pack.months && pack.months.length > 0
    ? pack.months
    : pack.units && pack.units.length > 0
      ? [{ id: 'm1', title: '1-Oy', units: pack.units }]
      : pack.words && pack.words.length > 0
        ? [{ id: 'm1', title: '1-Oy', units: [{ id: 'u1', title: '1-Mavzu', words: pack.words }] }]
        : [];

  const units = [];
  months.forEach(month => {
    (month.units || []).forEach(unit => {
      units.push({
        unitKey: `${month.id}_${unit.id}`,
        monthId: month.id,
        unitId: unit.id,
        title: unit.title,
        monthTitle: month.title,
        totalWords: (unit.words || []).length,
      });
    });
  });
  return units;
}

// Every topic a teacher can hand out as homework: every unit of every pack
// assigned to the group under Asosiy or Qo'shimcha (never Kerakli — that
// category's gone). Topics already given in a past assignment (`usedKeys`,
// built from the group's whole homeworkList) are still included — just
// flagged `used: true` — so the picker can show them greyed out instead of
// hiding them outright; the teacher can see at a glance what's already been
// covered. Each candidate carries everything a homework item needs to both
// render on its own (packTitle/unitTitle/totalWords) and link straight into
// the exact same topic a student would reach by browsing normally
// (packId/monthId/unitId) — homework never copies a topic's words, it just
// points at one that's already there.
function getHomeworkCandidates(group, customPacks, usedKeys = new Set()) {
  if (!group) return [];
  const packIds = [...new Set([...(group.assignedPacks || []), ...(group.additionalPacks || [])])];
  const candidates = [];
  packIds.forEach(packId => {
    const pack = customPacks.find(cp => cp.id === packId);
    if (!pack) return;
    getPackUnits(pack).forEach(unit => {
      if (unit.totalWords === 0) return;
      const key = `${packId}_${unit.monthId}_${unit.unitId}`;
      candidates.push({
        packId,
        monthId: unit.monthId,
        unitId: unit.unitId,
        packTitle: pack.title,
        unitTitle: unit.title,
        totalWords: unit.totalWords,
        used: usedKeys.has(key),
      });
    });
  });
  return candidates;
}

// Flat set of "packId_monthId_unitId" keys already given across every past
// homework assignment for this group.
function getUsedHomeworkKeys(homeworkList) {
  const keys = new Set();
  (homeworkList || []).forEach(hw => {
    (hw.items || []).forEach(item => {
      keys.add(`${item.packId}_${item.monthId}_${item.unitId}`);
    });
  });
  return keys;
}

// Resolves one homework item back to its actual unit (with real words),
// straight from customPacks — homework items only ever store the pointer
// (packId/monthId/unitId) plus a display snapshot, never the words
// themselves, so this is the one place that needs the live pack data.
function resolveHomeworkItemUnit(item, customPacks) {
  const pack = customPacks.find(cp => cp.id === item.packId);
  if (!pack) return null;
  const months = pack.months && pack.months.length > 0
    ? pack.months
    : pack.units && pack.units.length > 0
      ? [{ id: 'm1', units: pack.units }]
      : pack.words && pack.words.length > 0
        ? [{ id: 'm1', units: [{ id: 'u1', words: pack.words }] }]
        : [];
  const month = months.find(m => m.id === item.monthId);
  return month?.units?.find(u => u.id === item.unitId) || null;
}

// Reads a student's progress for one pack, whether it's in the current
// per-unit shape (`progress[packId].units[unitKey] = {...}`, see
// corpService.js: updateStudentUnitProgress) or an older flat snapshot from
// before that change (`progress[packId] = { wordsLearned, masteryPercent, ... }`
// directly) — old records are treated as a single implicit unit so they
// still display instead of silently vanishing.
function aggregatePackProgress(prog) {
  const empty = { hasData: false, wordsLearned: 0, masteryPercent: 0, retentionPercent: 0, atRiskCount: 0, lastActivity: null, units: {} };
  if (!prog) return empty;

  const unitEntries = prog.units ? Object.entries(prog.units) : (typeof prog.wordsLearned === 'number' ? [['__legacy__', prog]] : []);
  if (unitEntries.length === 0) return empty;

  const values = unitEntries.map(([, u]) => u);
  const wordsLearned = values.reduce((sum, u) => sum + (u.wordsLearned || 0), 0);
  const masteryPercent = Math.round(values.reduce((sum, u) => sum + (u.masteryPercent || 0), 0) / values.length);
  const retentionPercent = Math.round(values.reduce((sum, u) => sum + (u.retentionPercent || 0), 0) / values.length);
  const atRiskCount = values.reduce((sum, u) => sum + (u.atRiskCount || 0), 0);
  const lastActivity = values.map(u => u.lastActivity).filter(Boolean).sort().pop() || null;

  return {
    hasData: true,
    wordsLearned,
    masteryPercent,
    retentionPercent,
    atRiskCount,
    lastActivity,
    units: prog.units || {},
  };
}

// Aggregate completion stats for a group: average % across every
// (student × assigned pack) pair that has real progress data, plus how many
// students have made any progress at all.
function computeGroupStats(group, students, customPacks) {
  const packEntries = getGroupPackEntries(group);
  let percentSum = 0;
  let percentCount = 0;
  const studentsWithProgress = new Set();

  (students || []).forEach(student => {
    packEntries.forEach(({ packId }) => {
      const pack = customPacks.find(cp => cp.id === packId);
      const totalWords = pack ? (pack.wordCount || (pack.words ? pack.words.length : 0)) : 0;
      const agg = aggregatePackProgress((student.progress || {})[packId]);
      if (agg.hasData && totalWords > 0) {
        percentSum += Math.min(100, Math.round((agg.wordsLearned / totalWords) * 100));
        percentCount += 1;
        studentsWithProgress.add(student.id);
      }
    });
  });

  return {
    packEntries,
    avgPercent: percentCount > 0 ? Math.round(percentSum / percentCount) : 0,
    activeStudentsCount: studentsWithProgress.size,
  };
}

// One student's mastery/retention summary across a group's assigned packs,
// from the masteryPercent/retentionPercent/atRiskCount fields the student's
// own client denormalizes into their progress node (see corpService.js:
// updateStudentUnitProgress) — teachers have no read access to the raw
// per-word data those numbers are computed from.
function getStudentSummary(student, group) {
  const packEntries = getGroupPackEntries(group);
  const entries = packEntries
    .map(({ packId }) => aggregatePackProgress((student.progress || {})[packId]))
    .filter(a => a.hasData);

  if (entries.length === 0) {
    return { hasData: false, masteryPercent: 0, retentionPercent: 0, atRiskCount: 0, lastActivity: null };
  }

  const masteryPercent = Math.round(entries.reduce((sum, p) => sum + (p.masteryPercent || 0), 0) / entries.length);
  const retentionPercent = Math.round(entries.reduce((sum, p) => sum + (p.retentionPercent || 0), 0) / entries.length);
  const atRiskCount = entries.reduce((sum, p) => sum + (p.atRiskCount || 0), 0);
  const lastActivity = entries
    .map(p => p.lastActivity)
    .filter(Boolean)
    .sort()
    .pop() || null;

  return { hasData: true, masteryPercent, retentionPercent, atRiskCount, lastActivity };
}

export default function TeacherDashboard({ tab = 'groups' }) {
  const context = useOutletContext() || {};
  const { theme, setTheme } = useTheme();
  const { centerId, teacherId, teacherName, phone, email } = context;
  const { groupId: urlGroupId, subTab, hwId } = useParams();
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [customPacks, setCustomPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPackEditor, setShowPackEditor] = useState(false);
  const [viewingGroupStudents, setViewingGroupStudents] = useState(null);
  const [groupStudentsList, setGroupStudentsList] = useState([]);
  const [assigningGroup, setAssigningGroup] = useState(null);
  const [assignCategory, setAssignCategory] = useState('assignedPacks');
  const [duplicatingPackId, setDuplicatingPackId] = useState(null);
  const [viewingPack, setViewingPack] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(urlGroupId || null);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [allGroupsStudents, setAllGroupsStudents] = useState({}); // groupId -> students[]
  const [loadingAllStats, setLoadingAllStats] = useState(false);

  // Homework subtab: every assignment ever given to this group (oldest
  // first, never overwritten) plus the teacher's in-progress selection
  // while building a new one.
  const [groupHomeworkList, setGroupHomeworkList] = useState([]);
  const [homeworkSelection, setHomeworkSelection] = useState(new Set());
  const [savingHomework, setSavingHomework] = useState(false);
  const [showHomeworkEditor, setShowHomeworkEditor] = useState(false);
  const [viewingHomeworkItem, setViewingHomeworkItem] = useState(null);

  // Active tab ref for auto-scrolling on mobile/narrow screens
  const activeSegTabRef = useRef(null);
  useEffect(() => {
    if (activeSegTabRef.current) {
      activeSegTabRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [subTab]);

  // Student row actions (remove / detail) — same fixed-position dropdown
  // pattern as CenterAdminDashboard's per-row "⋮" teacher menu.
  const [activeStudentMenu, setActiveStudentMenu] = useState(null);
  const [studentMenuPos, setStudentMenuPos] = useState({ top: 0, right: 0 });
  const [viewingStudentDetail, setViewingStudentDetail] = useState(null);

  // Group transfer picker (replaces the old prompt()-based flow)
  const [showTransferPicker, setShowTransferPicker] = useState(false);
  const [centerTeachersList, setCenterTeachersList] = useState([]);
  const [loadingTransferTeachers, setLoadingTransferTeachers] = useState(false);

  // Pack row actions + editor
  const [activePackMenu, setActivePackMenu] = useState(null);
  const [packMenuPos, setPackMenuPos] = useState({ top: 0, right: 0 });
  const [editingPack, setEditingPack] = useState(null);

  // iOS-style action-sheet confirm dialog — replaces window.confirm() for
  // every destructive/irreversible action in the group flow.
  const [confirmSheet, setConfirmSheet] = useState(null);
  const [confirmBusy, setConfirmBusy] = useState(false);

  const askConfirm = (sheet) => setConfirmSheet(sheet);
  const closeConfirmSheet = () => { if (!confirmBusy) setConfirmSheet(null); };
  const runConfirmSheet = async () => {
    if (!confirmSheet) return;
    setConfirmBusy(true);
    try {
      await confirmSheet.onConfirm();
    } finally {
      setConfirmBusy(false);
      setConfirmSheet(null);
    }
  };

  // Announcements targeted at teachers
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    getActiveAnnouncementsForRole('teacher')
      .then(list => setAnnouncements(list || []))
      .catch(err => console.error('Error loading announcements:', err));
  }, []);

  useEffect(() => {
    if (urlGroupId) {
      setSelectedGroupId(urlGroupId);
    } else {
      setSelectedGroupId(null);
    }
  }, [urlGroupId]);

  // Load group students automatically when group is selected
  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedGroupId && centerId) {
        try {
          const list = await getGroupStudents(centerId, selectedGroupId);
          setGroupStudentsList(list || []);
        } catch (err) {
          console.error('Error loading group students:', err);
        }
      }
    };
    fetchStudents();
  }, [selectedGroupId, centerId]);

  // Load every homework assignment ever given to this group
  useEffect(() => {
    const fetchHomework = async () => {
      if (!selectedGroupId || !centerId) return;
      try {
        const list = await getGroupHomeworkList(centerId, selectedGroupId);
        setGroupHomeworkList(list);
      } catch (err) {
        console.error('Error loading group homework:', err);
      }
    };
    fetchHomework();
  }, [selectedGroupId, centerId]);

  // Form states
  const [groupForm, setGroupForm] = useState({ name: '', level: 'Elementary' });
  const [editForm, setEditForm] = useState({ name: '', level: 'Elementary' });
  const [submittingGroup, setSubmittingGroup] = useState(false);
  const [submittingEditGroup, setSubmittingEditGroup] = useState(false);
  const [copiedCode, setCopiedCode] = useState('');

  // Settings states
  const [profileForm, setProfileForm] = useState({
    name: teacherName || '',
    phone: phone || '',
    password: ''
  });
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState('');

  useEffect(() => {
    setProfileForm({
      name: teacherName || '',
      phone: phone || '',
      password: ''
    });
  }, [teacherName, phone]);

  const loadTeacherData = async () => {
    setLoading(true);
    try {
      const [groupsData, packsData, irregularPack] = await Promise.all([
        getTeacherGroups(centerId, teacherId),
        getCenterCustomPacks(centerId),
        ensureIrregularVerbsPack(centerId).catch(err => {
          console.error('Error ensuring Irregular Verbs pack:', err);
          return null;
        }),
      ]);
      setGroups(groupsData || []);
      // Packs with no ownerUid are center-wide (admin's, read-only for
      // teachers here); packs owned by this teacher are their own private
      // ones (full CRUD). Other teachers' private packs are dropped
      // entirely — never shown in this teacher's list at all — while still
      // staying in the shared customPacks collection so group assignment /
      // student practice (which reads that collection directly) is
      // unaffected either way.
      const myUid = auth.currentUser?.uid;
      const scoped = (packsData || [])
        .filter(p => !p.ownerUid || p.ownerUid === myUid)
        .map(p => ({ ...p, scope: p.ownerUid ? 'own' : 'center' }));
      // Always replaced with ensureIrregularVerbsPack's own return value
      // rather than trusting whatever getCenterCustomPacks read — that read
      // runs concurrently with ensure()'s write/self-heal above, so it can
      // easily win the race and hand back a stale copy (e.g. pre-rename
      // set/unit titles) even though ensure() already fixed it server-side.
      const withoutStaleIrregular = scoped.filter(p => p.id !== IRREGULAR_VERBS_PACK_ID);
      const withIrregular = irregularPack
        ? [...withoutStaleIrregular, { ...irregularPack, scope: 'center' }]
        : scoped;
      setCustomPacks(withIrregular);
    } catch (err) {
      console.error('Error loading teacher data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (centerId && teacherId) {
      loadTeacherData();
    }
  }, [centerId, teacherId]);

  // Teacher-wide "Statistika" tab needs every active group's student list to
  // compute a real average, not just the currently-open group's — fetch them
  // in parallel only when that tab is actually visited.
  useEffect(() => {
    if (tab !== 'statistics' || !centerId) return;
    const groupIds = groups.filter(g => g.status !== 'archived').map(g => g.id);
    const missingIds = groupIds.filter(id => !(id in allGroupsStudents));
    if (missingIds.length === 0) return;

    let cancelled = false;
    setLoadingAllStats(true);
    Promise.all(missingIds.map(id => getGroupStudents(centerId, id).then(list => [id, list || []])))
      .then(entries => {
        if (cancelled) return;
        setAllGroupsStudents(prev => {
          const next = { ...prev };
          entries.forEach(([id, list]) => { next[id] = list; });
          return next;
        });
      })
      .catch(err => console.error('Error loading all-groups statistics:', err))
      .finally(() => { if (!cancelled) setLoadingAllStats(false); });

    return () => { cancelled = true; };
  }, [tab, centerId, groups]);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!groupForm.name.trim()) return;
    setSubmittingGroup(true);
    try {
      const newGroup = await createGroup(centerId, teacherId, groupForm);
      setGroups(prev => [newGroup, ...prev]);
      setGroupForm({ name: '', level: 'Elementary' });
      setShowCreateModal(false);
    } catch (err) {
      alert('Guruh yaratishda xatolik: ' + err.message);
    } finally {
      setSubmittingGroup(false);
    }
  };

  const handleOpenEditModal = (group) => {
    if (group) {
      setEditForm({ name: group.name, level: group.level });
      setShowEditModal(true);
    }
  };

  const handleUpdateGroup = async (e) => {
    e.preventDefault();
    if (!editForm.name.trim() || !selectedGroup) return;
    setSubmittingEditGroup(true);
    try {
      await updateGroupDetails(centerId, selectedGroup.id, editForm);
      setGroups(prev => prev.map(g => g.id === selectedGroup.id ? { ...g, name: editForm.name, level: editForm.level } : g));
      setShowEditModal(false);
      alert("Guruh ma'lumotlari muvaffaqiyatli saqlandi!");
    } catch (err) {
      alert('Guruhni tahrirlashda xatolik: ' + err.message);
    } finally {
      setSubmittingEditGroup(false);
    }
  };

  const handleDeleteGroup = (group) => {
    askConfirm({
      title: "Guruhni o'chirish",
      message: `"${group.name}" guruhini butunlay o'chirmoqchimisiz? Ushbu amalni ortga qaytarib bo'lmaydi!`,
      confirmLabel: "O'chirish",
      danger: true,
      onConfirm: async () => {
        try {
          await deleteGroup(centerId, group.id);
          setGroups(prev => prev.filter(g => g.id !== group.id));
          setSelectedGroupId(null);
          navigate('/corp/teacher');
        } catch (err) {
          alert("Guruhni o'chirishda xatolik: " + err.message);
        }
      },
    });
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const handleOpenStudentsModal = async (group) => {
    setViewingGroupStudents(group);
    try {
      const list = await getGroupStudents(centerId, group.id);
      setGroupStudentsList(list || []);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const toggleHomeworkItem = (candidate) => {
    if (candidate.used) return;
    const key = `${candidate.packId}_${candidate.monthId}_${candidate.unitId}`;
    setHomeworkSelection(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const openHomeworkEditor = () => {
    setHomeworkSelection(new Set());
    setShowHomeworkEditor(true);
  };

  const handleAddHomework = async () => {
    if (!selectedGroup) return;
    setSavingHomework(true);
    try {
      const usedKeys = getUsedHomeworkKeys(groupHomeworkList);
      const candidates = getHomeworkCandidates(selectedGroup, customPacks, usedKeys);
      const items = candidates
        .filter(c => !c.used && homeworkSelection.has(`${c.packId}_${c.monthId}_${c.unitId}`))
        .map(({ packId, monthId, unitId, packTitle, unitTitle, totalWords }) => ({ packId, monthId, unitId, packTitle, unitTitle, totalWords }));
      const added = await addGroupHomework(centerId, selectedGroup.id, items);
      setGroupHomeworkList(prev => [...prev, added]);
      setHomeworkSelection(new Set());
      setShowHomeworkEditor(false);
    } catch (err) {
      alert("Uy vazifasini saqlashda xatolik: " + err.message);
    } finally {
      setSavingHomework(false);
    }
  };

  const handleAssignPack = async (groupId, packId, listKey = 'assignedPacks') => {
    try {
      const updatedPacks = await assignPackToGroup(centerId, groupId, packId, listKey);
      setGroups(prev => prev.map(g => g.id === groupId ? { ...g, [listKey]: updatedPacks } : g));
      setAssigningGroup(prev => prev ? { ...prev, [listKey]: updatedPacks } : prev);
    } catch (err) {
      alert('Biriktirishda xatolik: ' + err.message);
    }
  };

  const handleRemovePack = async (groupId, packId, listKey = 'assignedPacks') => {
    try {
      const updatedPacks = await removePackFromGroup(centerId, groupId, packId, listKey);
      setGroups(prev => prev.map(g => g.id === groupId ? { ...g, [listKey]: updatedPacks } : g));
      setAssigningGroup(prev => prev ? { ...prev, [listKey]: updatedPacks } : prev);
    } catch (err) {
      alert('Olib tashlashda xatolik: ' + err.message);
    }
  };

  const handleDuplicatePack = async (pack) => {
    setDuplicatingPackId(pack.id);
    try {
      // Duplicating is itself a creation action by this teacher — the copy
      // is always a private pack of theirs, regardless of whether the
      // source was a shared center pack or already one of their own.
      const copy = await duplicateCustomPack(centerId, pack, auth.currentUser?.uid);
      setCustomPacks(prev => [{ ...copy, scope: 'own' }, ...prev]);
    } catch (err) {
      alert('Pack nusxalashda xatolik: ' + err.message);
    } finally {
      setDuplicatingPackId(null);
    }
  };

  const handleDeletePack = async (pack) => {
    if (pack.scope !== 'own') return; // only a teacher's own packs can be deleted here
    if (!confirm(`"${pack.title}" packini o'chirmoqchimisiz?`)) return;
    try {
      await deleteCustomPack(centerId, pack.id);
      setCustomPacks(prev => prev.filter(p => p.id !== pack.id));
    } catch (err) {
      alert('Pack o\'chirishda xatolik: ' + err.message);
    }
  };

  const handleArchiveGroup = async (group) => {
    if (!confirm(`"${group.name}" guruhini arxivga o'tkazmoqchimisiz?`)) return;
    try {
      await updateGroupStatus(centerId, group.id, 'archived');
      setGroups(prev => prev.map(g => g.id === group.id ? { ...g, status: 'archived' } : g));
    } catch (err) {
      alert('Arxivlashda xatolik: ' + err.message);
    }
  };

  const handleRestoreGroup = async (group) => {
    try {
      await updateGroupStatus(centerId, group.id, 'active');
      setGroups(prev => prev.map(g => g.id === group.id ? { ...g, status: 'active' } : g));
    } catch (err) {
      alert('Arxivdan chiqarishda xatolik: ' + err.message);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!profileForm.name.trim()) return;
    setSavingSettings(true);
    setSettingsSuccess('');
    try {
      await updateTeacherProfile(centerId, teacherId, auth.currentUser?.uid, {
        name: profileForm.name.trim(),
        phone: profileForm.phone.trim(),
      });

      if (profileForm.password.trim()) {
        if (profileForm.password.trim().length < 6) {
          alert("Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak!");
          setSavingSettings(false);
          return;
        }
        // Teacher is already signed in — change the real Firebase Auth
        // password directly, instead of the old dead write to a DB
        // `tempPassword` field that the login screen never reads.
        await updatePassword(auth.currentUser, profileForm.password.trim());
        setProfileForm(prev => ({ ...prev, password: '' }));
      }
      setSettingsSuccess('Profil sozlamalari muvaffaqiyatli saqlandi!');
      setTimeout(() => setSettingsSuccess(''), 3000);
    } catch (err) {
      if (err.code === 'auth/requires-recent-login') {
        alert("Parolni o'zgartirish uchun avval tizimga qaytadan kiring, so'ng qayta urinib ko'ring.");
      } else {
        alert('Sozlamalarni saqlashda xatolik: ' + err.message);
      }
    } finally {
      setSavingSettings(false);
    }
  };

  // ── Group Settings Fullscreen Modal state & handlers ──
  const [showGroupSettingsModal, setShowGroupSettingsModal] = useState(false);
  const [groupSettingsTarget, setGroupSettingsTarget] = useState(null);
  const [groupSettingsForm, setGroupSettingsForm] = useState({ name: '', isArchived: false, code: '' });
  const [savingGroupSettings, setSavingGroupSettings] = useState(false);

  // Opens the settings modal for `group` regardless of whether we're on the
  // groups list (card "⋯" button) or already inside a group's detail view —
  // it used to only work from the detail view because it read `selectedGroup`,
  // which stays null on the list page.
  const handleOpenGroupSettings = (group) => {
    if (!group) return;
    setGroupSettingsTarget(group);
    setGroupSettingsForm({
      name: group.name || '',
      isArchived: group.status === 'archived',
      code: group.code || '',
    });
    setShowGroupSettingsModal(true);
  };

  const handleSaveGroupSettings = async () => {
    if (!groupSettingsTarget) return;
    setSavingGroupSettings(true);
    try {
      const updates = {};
      if (groupSettingsForm.name.trim() && groupSettingsForm.name !== groupSettingsTarget.name) {
        updates.name = groupSettingsForm.name.trim();
      }
      if (Object.keys(updates).length > 0) {
        await updateGroupDetails(centerId, groupSettingsTarget.id, updates);
      }
      const newStatus = groupSettingsForm.isArchived ? 'archived' : 'active';
      if (newStatus !== (groupSettingsTarget.status || 'active')) {
        await updateGroupStatus(centerId, groupSettingsTarget.id, newStatus);
      }
      setGroups(prev => prev.map(g => g.id === groupSettingsTarget.id ? {
        ...g,
        ...updates,
        status: newStatus,
        code: groupSettingsForm.code || g.code
      } : g));
      setShowGroupSettingsModal(false);
    } catch (err) {
      alert('Sozlamalarni saqlashda xatolik: ' + err.message);
    } finally {
      setSavingGroupSettings(false);
    }
  };

  const handleRegenerateCode = () => {
    if (!groupSettingsTarget) return;
    askConfirm({
      title: 'Yangi taklif kodi',
      message: "Yangi taklif kodi yaratilsinmi? Eski kod o'z kuchini yo'qotadi.",
      confirmLabel: 'Yaratish',
      onConfirm: async () => {
        try {
          const newCode = Math.floor(100000 + Math.random() * 900000).toString();
          await updateGroupDetails(centerId, groupSettingsTarget.id, { code: newCode });
          setGroupSettingsForm(prev => ({ ...prev, code: newCode }));
          setGroups(prev => prev.map(g => g.id === groupSettingsTarget.id ? { ...g, code: newCode } : g));
        } catch (err) {
          alert('Kodni yangilashda xatolik: ' + err.message);
        }
      },
    });
  };

  const handleOpenTransferPicker = async () => {
    if (!groupSettingsTarget) return;
    setShowTransferPicker(true);
    setLoadingTransferTeachers(true);
    try {
      const list = await getCenterTeachers(centerId);
      setCenterTeachersList((list || []).filter(t => t.id !== teacherId));
    } catch (err) {
      alert("O'qituvchilar ro'yxatini yuklashda xatolik: " + err.message);
    } finally {
      setLoadingTransferTeachers(false);
    }
  };

  const handleTransferGroupTo = (targetTeacher) => {
    if (!groupSettingsTarget) return;
    askConfirm({
      title: "Guruhni o'tkazish",
      message: `"${groupSettingsTarget.name}" guruhini ${targetTeacher.name} o'qituvchisiga o'tkazmoqchimisiz?`,
      confirmLabel: "O'tkazish",
      danger: true,
      onConfirm: async () => {
        try {
          await updateGroupDetails(centerId, groupSettingsTarget.id, { teacherId: targetTeacher.id });
          setGroups(prev => prev.filter(g => g.id !== groupSettingsTarget.id));
          setSelectedGroupId(null);
          setShowTransferPicker(false);
          setShowGroupSettingsModal(false);
          navigate('/corp/teacher');
        } catch (err) {
          alert("O'tkazishda xatolik: " + err.message);
        }
      },
    });
  };

  const handleRemoveStudent = (student) => {
    if (!selectedGroup) return;
    askConfirm({
      title: "O'quvchini chiqarish",
      message: `"${student.name}" o'quvchisini guruhdan chiqarmoqchimisiz?`,
      confirmLabel: 'Chiqarish',
      danger: true,
      onConfirm: async () => {
        try {
          await removeStudentFromGroup(centerId, selectedGroup.id, student.id);
          setGroupStudentsList(prev => prev.filter(s => s.id !== student.id));
          setGroups(prev => prev.map(g => g.id === selectedGroup.id
            ? { ...g, studentsCount: Math.max(0, (g.studentsCount || 0) - 1) }
            : g));
          setActiveStudentMenu(null);
        } catch (err) {
          alert("O'quvchini chiqarishda xatolik: " + err.message);
        }
      },
    });
  };

  const activeGroups = groups.filter(g => g.status !== 'archived');
  const archivedGroups = groups.filter(g => g.status === 'archived');
  const selectedGroup = activeGroups.find(g => g.id === selectedGroupId) || null;

  const filteredActiveGroups = activeGroups.filter(g =>
    (g.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (g.level || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (g.code || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPacks = customPacks.filter(p =>
    (p.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = activeGroups.reduce((acc, g) => acc + (g.studentsCount || 0), 0);

  const selectedGroupStats = selectedGroup
    ? computeGroupStats(selectedGroup, groupStudentsList, customPacks)
    : null;

  // Per-group stats for the teacher-wide "Statistika" tab, plus the overall
  // average across every group (weighted by how many student×pack pairs
  // actually have progress data, not just a flat average of averages).
  const allGroupsStats = activeGroups.map(g => ({
    group: g,
    ...computeGroupStats(g, allGroupsStudents[g.id] || [], customPacks),
  }));
  const overallAvgPercent = (() => {
    const withData = allGroupsStats.filter(s => s.avgPercent > 0 || s.activeStudentsCount > 0);
    if (withData.length === 0) return 0;
    return Math.round(withData.reduce((sum, s) => sum + s.avgPercent, 0) / withData.length);
  })();

  return (
    <div className="teacher-dashboard-container">
      {announcements.length > 0 && (
        <div className="teacher-announcements-banner">
          {announcements.map(a => (
            <div key={a.id} className={`teacher-announcement-item announcement-type-${a.type || 'info'}`}>
              <Megaphone size={16} />
              <div>
                <strong>{a.title}</strong>
                {a.message && <p>{a.message}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 1. GURUHLARIM TAB */}
      {tab === 'groups' && (
        selectedGroup ? (
          <div className="tpv-container">
            {/* Top Compact Group Header Bar */}
            <div className="ios-group-top-bar">
              <button
                type="button"
                className="ios-back-btn"
                onClick={() => {
                  if (subTab) {
                    navigate(`/corp/teacher/group/${selectedGroup.id}`);
                  } else {
                    setSelectedGroupId(null);
                    navigate('/corp/teacher');
                  }
                }}
                title={subTab ? "Bo'limlarga qaytish" : "Guruhlarga qaytish"}
              >
                <ArrowLeft size={18} />
              </button>

              <div className="ios-title-group">
                <h2 className="ios-group-title">
                  {subTab === 'students' && "O'quvchilar"}
                  {subTab === 'words' && "Packlar"}
                  {subTab === 'homework' && "Uy vazifasi"}
                  {subTab === 'stats' && "Statistika"}
                  {!subTab && selectedGroup.name}
                </h2>
              </div>

              <button
                type="button"
                className="ios-action-btn"
                onClick={() => handleOpenGroupSettings(selectedGroup)}
                title="Guruh sozlamalari"
              >
                <MoreVertical size={18} />
              </button>
            </div>

            {/* OVERVIEW: Big Main Hero Card + 2x2 Bento Hero Cards Grid (Wireframe Layout) */}
            {!subTab && !hwId && (
              <>
                {/* 1. Main Large Hero Banner Card (Big rectangle from wireframe) */}
                <div className="group-main-hero-card">
                  <div className="gmh-top">
                    <div className="gmh-code-block">
                      <span className="gmh-subtitle">GURUH TAKLIF KODI</span>
                      <div className="gmh-code-row">
                        <span className="gmh-code">{selectedGroup.code}</span>
                        <button
                          type="button"
                          className="gmh-copy-btn"
                          onClick={() => copyCode(selectedGroup.code)}
                          title="Nusxalash"
                        >
                          {copiedCode === selectedGroup.code ? (
                            <>
                              <Check size={14} color="#34c759" />
                              <span>Nusxalandi</span>
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              <span>Nusxalash</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <span className="gmh-status-badge">
                      <Check size={13} />
                      {selectedGroup.level || 'Faol Kurs'}
                    </span>
                  </div>

                  <div className="gmh-divider" />

                  <div className="gmh-stats-row">
                    <div className="gmh-stat">
                      <span className="gmh-stat-val">{selectedGroup.studentsCount || 0}</span>
                      <span className="gmh-stat-label">O'quvchilar</span>
                    </div>
                    <div className="gmh-stat">
                      <span className="gmh-stat-val">
                        {(selectedGroup.assignedPacks || []).length + (selectedGroup.additionalPacks || []).length}
                      </span>
                      <span className="gmh-stat-label">Packlar</span>
                    </div>
                    <div className="gmh-stat">
                      <span className="gmh-stat-val">{groupHomeworkList.length}</span>
                      <span className="gmh-stat-label">Vazifalar</span>
                    </div>
                    <div className="gmh-stat">
                      <span className="gmh-stat-val green">
                        {selectedGroupStats ? `${selectedGroupStats.avgPercent}%` : '0%'}
                      </span>
                      <span className="gmh-stat-label">O'zlashtirish</span>
                    </div>
                  </div>
                </div>

                {/* 2. 2x2 Bento Hero Cards Grid (4 equal cards from wireframe) */}
                <div className="ios-bento-grid">
                  {/* Card 1: Students */}
                  <div
                    className="ios-bento-card card-blue"
                    onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/students`)}
                  >
                    <div className="bento-top-row">
                      <div className="bento-icon-box icon-blue">
                        <Users size={22} />
                      </div>
                      <span className="bento-badge-count">{selectedGroup.studentsCount || 0} ta</span>
                    </div>
                    <div className="bento-info">
                      <h3 className="bento-title">O'quvchilar</h3>
                      <p className="bento-sub">A'zolar progressi va boshqaruvi</p>
                    </div>
                    <div className="bento-footer">
                      <span className="bento-action-label">Boshqarish</span>
                      <ChevronRight size={16} className="bento-arrow" />
                    </div>
                  </div>

                  {/* Card 2: Packs */}
                  <div
                    className="ios-bento-card card-purple"
                    onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/words`)}
                  >
                    <div className="bento-top-row">
                      <div className="bento-icon-box icon-purple">
                        <BookOpen size={22} />
                      </div>
                      <span className="bento-badge-count">
                        {(selectedGroup.assignedPacks || []).length + (selectedGroup.additionalPacks || []).length} ta
                      </span>
                    </div>
                    <div className="bento-info">
                      <h3 className="bento-title">Packlar</h3>
                      <p className="bento-sub">Biriktirilgan so'z toifalari</p>
                    </div>
                    <div className="bento-footer">
                      <span className="bento-action-label">Boshqarish</span>
                      <ChevronRight size={16} className="bento-arrow" />
                    </div>
                  </div>

                  {/* Card 3: Homework */}
                  <div
                    className="ios-bento-card card-amber"
                    onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/homework`)}
                  >
                    <div className="bento-top-row">
                      <div className="bento-icon-box icon-amber">
                        <NotebookPen size={22} />
                      </div>
                      <span className="bento-badge-count">{groupHomeworkList.length} ta</span>
                    </div>
                    <div className="bento-info">
                      <h3 className="bento-title">Uy vazifasi</h3>
                      <p className="bento-sub">Topshiriqlar va bajarilish holati</p>
                    </div>
                    <div className="bento-footer">
                      <span className="bento-action-label">Boshqarish</span>
                      <ChevronRight size={16} className="bento-arrow" />
                    </div>
                  </div>

                  {/* Card 4: Stats */}
                  <div
                    className="ios-bento-card card-emerald"
                    onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/stats`)}
                  >
                    <div className="bento-top-row">
                      <div className="bento-icon-box icon-emerald">
                        <BarChart3 size={22} />
                      </div>
                      <span className="bento-badge-count green">
                        {selectedGroupStats ? `${selectedGroupStats.avgPercent}%` : '0%'}
                      </span>
                    </div>
                    <div className="bento-info">
                      <h3 className="bento-title">Statistika</h3>
                      <p className="bento-sub">Guruh bo'yicha o'zlashtirish tahlili</p>
                    </div>
                    <div className="bento-footer">
                      <span className="bento-action-label">Tahlilni ko'rish</span>
                      <ChevronRight size={16} className="bento-arrow" />
                    </div>
                  </div>
                </div>
              </>
            )}



            {hwId ? (() => {
              const hw = groupHomeworkList.find(h => h.id === hwId);
              if (!hw) {
                return (
                  <div className="empty-state">
                    <NotebookPen size={40} />
                    <p>Bu uy vazifasi topilmadi.</p>
                    <button className="btn-secondary" onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/homework`)} style={{ marginTop: '10px' }}>
                      Uy vazifalariga qaytish
                    </button>
                  </div>
                );
              }
              const hwItems = hw.items || [];
              return (
                <div className="hw-manage-page">
                  <button
                    type="button"
                    className="hw-manage-back"
                    onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/homework`)}
                  >
                    <ArrowLeft size={16} /> Uy vazifasi
                  </button>

                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{hw.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                      {hwItems.length} ta mavzu{hw.assignedAt && <> — <strong>{new Date(hw.assignedAt).toLocaleDateString()}</strong></>}
                    </p>
                  </div>

                  {/* Assigned topics — click one to open its detail window */}
                  <div className="tpv-list" style={{ marginTop: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {hwItems.map(item => (
                      <button
                        type="button"
                        key={`${item.packId}_${item.monthId}_${item.unitId}`}
                        className="tpv-row"
                        onClick={() => setViewingHomeworkItem(item)}
                        style={{ cursor: 'pointer', width: '100%', textAlign: 'left', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                          <span className="tpv-row-label" style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.95rem' }}>{item.unitTitle}</span>
                          <span className="tpv-row-meta" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{item.packTitle} · {item.totalWords} ta so'z</span>
                        </div>
                        <ChevronRight size={18} className="tpv-row-arrow" />
                      </button>
                    ))}
                  </div>

                  {/* Per-student completion */}
                  <div className="teachers-table-card" style={{ marginTop: '0.25rem', background: 'var(--bg-tertiary)' }}>
                    <h4 style={{ padding: '1rem 1.25rem', margin: 0, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', fontSize: '0.92rem', fontWeight: 600 }}>
                      O'quvchilar bo'yicha bajarilishi
                    </h4>
                    {groupStudentsList.length === 0 ? (
                      <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        Statistika ko'rsatish uchun guruhda o'quvchilar mavjud emas.
                      </div>
                    ) : (
                      <div className="student-progress-cards">
                        {groupStudentsList.map(student => {
                          const itemStats = hwItems.map(item => {
                            const agg = aggregatePackProgress((student.progress || {})[item.packId]);
                            const us = agg.units[`${item.monthId}_${item.unitId}`];
                            const m = us ? (us.masteryPercent || 0) : 0;
                            return { item, masteryPercent: m, done: m >= 80, started: !!us };
                          });
                          const doneCount = itemStats.filter(s => s.done).length;
                          return (
                            <div key={student.id} className="student-progress-card">
                              <div className="student-progress-card-head" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div className="st-avatar" style={{ background: 'var(--accent-1)', fontWeight: 700 }}>{(student.name || '?').charAt(0).toUpperCase()}</div>
                                  <strong style={{ color: 'var(--text-primary)' }}>{student.name}</strong>
                                </div>
                                <span className="badge-active" style={{ background: doneCount === hwItems.length ? 'var(--success-dim)' : 'var(--bg-glass-hover)', color: doneCount === hwItems.length ? 'var(--success)' : 'var(--text-secondary)' }}>
                                  {doneCount}/{hwItems.length} done
                                </span>
                              </div>
                              <div className="unit-chip-row" style={{ marginTop: '10px' }}>
                                {itemStats.map(({ item, masteryPercent, done, started }) => (
                                  <span
                                    key={`${item.packId}_${item.monthId}_${item.unitId}`}
                                    className={`unit-chip unit-chip-${done ? 'done' : started ? 'partial' : 'none'}`}
                                    title={item.packTitle}
                                  >
                                    {item.unitTitle}: {started ? `${masteryPercent}%` : '—'}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })() : subTab && (
              <>

            {/* Tab Contents */}
            <div className="group-tab-content">
              {/* SUB-TAB 1: STUDENTS */}
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
                      {copiedCode === selectedGroup.code ? <Check size={15} color="var(--success)" /> : <Copy size={15} />}
                      <span>{copiedCode === selectedGroup.code ? 'Nusxalandi' : 'Nusxalash'}</span>
                    </button>
                  </div>

                  {groupStudentsList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'var(--bg-tertiary)', borderRadius: '16px', border: '1px dashed var(--border)', color: 'var(--text-muted)' }}>
                      <Users size={36} style={{ marginBottom: '10px', color: 'var(--text-muted)' }} />
                      <p style={{ margin: '0 0 8px 0' }}>Ushbu guruhga hali o'quvchilar ulanmagan.</p>
                      <span style={{ fontSize: '0.85rem' }}>O'quvchilarga 6 xonali ulanish kodini bering: <strong>{selectedGroup.code}</strong></span>
                    </div>
                  ) : (
                    <div className="students-progress-list" style={{ marginTop: 0 }}>
                      {groupStudentsList.map((st, i) => {
                        const summary = getStudentSummary(st, selectedGroup);
                        return (
                          <div key={st.id || i} className="student-progress-row" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
                            <div className="st-info">
                              <div className="st-avatar" style={{ background: '#3b82f6', fontWeight: 700 }}>{st.name.charAt(0).toUpperCase()}</div>
                              <div>
                                <strong style={{ color: 'var(--text-primary)' }}>{st.name}</strong>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{st.email || 'Email kiritilmagan'}</div>
                              </div>
                            </div>

                            <div className="st-stats" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                                  setActiveStudentMenu(activeStudentMenu === st.id ? null : st.id);
                                }}
                              >
                                <MoreVertical size={16} />
                              </button>

                              {activeStudentMenu === st.id && (
                                <>
                                  <div style={{ position: 'fixed', inset: 0, zIndex: 9998 }} onClick={() => setActiveStudentMenu(null)} />
                                  <div
                                    className="teacher-action-dropdown"
                                    style={{ position: 'fixed', top: `${studentMenuPos.top}px`, right: `${studentMenuPos.right}px`, zIndex: 9999, minWidth: '170px' }}
                                  >
                                    <button
                                      type="button"
                                      className="dropdown-item"
                                      onClick={() => { setViewingStudentDetail(st); setActiveStudentMenu(null); }}
                                    >
                                      <Eye size={15} /> Batafsil ko'rish
                                    </button>
                                    <button
                                      type="button"
                                      className="dropdown-item dropdown-item-danger"
                                      onClick={() => handleRemoveStudent(st)}
                                    >
                                      <UserMinus size={15} /> Guruhdan chiqarish
                                    </button>
                                  </div>
                                </>
                              )}
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="group-words-header">
                    <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0, fontWeight: 600 }}>Guruhga biriktirilgan so'z packlari</h3>
                    <button
                      className="btn-add-course-primary"
                      onClick={() => { setAssignCategory('assignedPacks'); setAssigningGroup(selectedGroup); }}
                      style={{ padding: '8px 14px', fontSize: '0.85rem', height: '36px', flexShrink: 0 }}
                    >
                      <Plus size={16} /> Pack Biriktirish
                    </button>
                  </div>

                  {[
                    { key: 'assignedPacks', label: 'Asosiy', emptyText: 'Guruhga hali birorta asosiy so\'z packi biriktirilmagan.' },
                    { key: 'additionalPacks', label: 'Qo\'shimcha', emptyText: 'Guruhga hali birorta qo\'shimcha pack biriktirilmagan.' },
                  ].map(({ key, label, emptyText }) => {
                    const packIds = selectedGroup[key] || [];
                    return (
                      <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h4 style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                          {label} ({packIds.length})
                        </h4>
                        {packIds.length === 0 ? (
                          <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: '14px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            {emptyText}
                          </div>
                        ) : (
                          <div className="tpv-list" style={{ marginTop: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {packIds.map(pid => {
                              const p = customPacks.find(cp => cp.id === pid);
                              if (!p) return null;
                              return (
                                <div key={pid} className="tpv-row" style={{ cursor: 'default', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#3b82f6' }}>
                                      <BookOpen size={18} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span className="tpv-row-label" style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.95rem' }}>{p.title}</span>
                                        {p.level && <span className="group-level-badge">{p.level}</span>}
                                      </div>
                                      <span className="tpv-row-meta" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{p.wordCount || (p.words ? p.words.length : 0)} ta so'z</span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleRemovePack(selectedGroup.id, pid, key)}
                                    title="Guruhdan olib tashlash"
                                    style={{ background: 'var(--error-dim)', border: 'none', color: 'var(--error)', cursor: 'pointer', padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s ease' }}
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
            </div>
              </>
            )}
          </div>
        ) : urlGroupId && !loading ? (
          <div className="empty-state">
            <Users size={48} />
            <p>Guruh topilmadi yoki sizga biriktirilmagan.</p>
            <button className="btn-secondary" onClick={() => { setSelectedGroupId(null); navigate('/corp/teacher'); }} style={{ marginTop: '10px' }}>
              Guruhlarim ro'yxatiga qaytish
            </button>
          </div>
        ) : (
        <>
          <div className="courses-top-bar" style={{ marginBottom: '1.25rem' }}>
            <div className="courses-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div className="courses-title-area">
                <h1>Guruhlarim</h1>
                <p>{activeGroups.length} ta faol guruh · {totalStudents} ta o'quvchi</p>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  className="top-search-lupa-btn"
                  onClick={() => setShowSearchInput(!showSearchInput)}
                  title="Guruhni qidirish"
                >
                  <Search size={18} />
                </button>
                <button
                  type="button"
                  className="btn-add-course-primary"
                  onClick={() => setShowCreateModal(true)}
                  style={{ padding: '8px 14px', fontSize: '0.88rem' }}
                >
                  <Plus size={16} /> Yangi Guruh
                </button>
              </div>
            </div>

            {(showSearchInput || searchTerm) && (
              <div className="search-input-wrap mobile-search-expanded" style={{ marginTop: '0.85rem', position: 'relative', width: '100%' }}>
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Guruh nomini qidirish..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  autoFocus
                  style={{ width: '100%', paddingRight: '32px' }}
                />
                <button
                  type="button"
                  onClick={() => { setSearchTerm(''); setShowSearchInput(false); }}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0
                  }}
                  title="Qidiruvni yopish"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="loading-spinner">Guruhlar yuklanmoqda...</div>
          ) : filteredActiveGroups.length === 0 ? (
            <div className="empty-state">
              <Users size={48} />
              <p>{searchTerm ? `"${searchTerm}" bo'yicha guruh topilmadi.` : 'Hozircha faol guruhlaringiz yo\'q.'}</p>
              {searchTerm ? (
                <button className="btn-secondary" onClick={() => setSearchTerm('')} style={{ marginTop: '10px' }}>
                  Qidiruvni tozalash
                </button>
              ) : (
                <button className="btn-create-group" onClick={() => setShowCreateModal(true)}>
                  Yangi Guruh Yaratish
                </button>
              )}
            </div>
          ) : (
            <div className="teacher-groups-grid">
              {filteredActiveGroups.map((group) => {
                const totalPacks = (group.assignedPacks || []).length + (group.requiredPacks || []).length + (group.additionalPacks || []).length;
                return (
                  <div
                    key={group.id}
                    className="teacher-group-card-enhanced clickable"
                    onClick={() => {
                      setSelectedGroupId(group.id);
                      navigate(`/corp/teacher/group/${group.id}`);
                    }}
                  >
                    <div className="tgc-header">
                      <div className="tgc-badge-wrap">
                        <div className="tgc-icon-badge">
                          <Users size={20} color="#3b82f6" />
                        </div>
                        <div className="tgc-title-block">
                          <h3 className="tgc-title">{group.name}</h3>
                          <span className="group-level-badge">{group.level || 'General'}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="mgc-more-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenGroupSettings(group);
                        }}
                        title="Sozlamalar"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </div>

                    <div className="tgc-body">
                      <div className="tgc-meta-row">
                        <div className="tgc-meta-item">
                          <User size={14} color="var(--text-muted)" />
                          <span><strong>{group.studentsCount || 0}</strong> o'quvchi</span>
                        </div>
                        <div className="tgc-meta-item">
                          <BookOpen size={14} color="var(--text-muted)" />
                          <span><strong>{totalPacks}</strong> pack</span>
                        </div>
                      </div>
                    </div>

                    <div className="tgc-footer">
                      <button
                        type="button"
                        className="tgc-code-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyCode(group.code);
                        }}
                        title="Taklif kodini nusxalash"
                      >
                        {copiedCode === group.code ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                        <span>Kod: <strong>{group.code}</strong></span>
                      </button>

                      <div className="tgc-enter-link">
                        <span>Guruhga kirish</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Floating Action Button (Yangi Guruh) */}
          <button
            type="button"
            className="mobile-fab-btn"
            onClick={() => setShowCreateModal(true)}
            title="Yangi Guruh Yaratish"
          >
            <Plus size={20} strokeWidth={2.8} />
            <span>Yangi Guruh</span>
          </button>
        </>
        )
      )}

      {/* 2. ARXIV TAB */}
      {tab === 'archive' && (
        <>
          <header className="teacher-header">
            <div>
              <span className="teacher-badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}><Archive size={16} /> Arxiv</span>
              <h1>Arxivlangan Guruhlar</h1>
              <p>O'tmishdagi yoki faoliyati to'xtatilgan guruhlar ro'yxati. Ularni istalgan vaqtda faollashtirishingiz mumkin.</p>
            </div>
          </header>

          {loading ? (
            <div className="loading-spinner">Arxiv yuklanmoqda...</div>
          ) : archivedGroups.length === 0 ? (
            <div className="empty-state">
              <Archive size={48} />
              <p>Arxivlangan guruhlar mavjud emas.</p>
            </div>
          ) : (
            <div className="teacher-groups-grid">
              {archivedGroups.map((group) => (
                <div key={group.id} className="teacher-group-card" style={{ opacity: 0.85 }}>
                  <div className="group-card-header">
                    <div>
                      <span className="group-level-badge" style={{ background: 'rgba(255,255,255,0.1)' }}>{group.level}</span>
                      <h3>{group.name}</h3>
                    </div>
                    <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', fontWeight: 600 }}>Arxivlangan</span>
                  </div>

                  <div className="group-card-body">
                    <div className="group-info-row">
                      <Users size={16} /> <span>O'quvchilar: <strong>{group.studentsCount || 0} ta</strong></span>
                    </div>
                    <div className="group-info-row">
                      <BookOpen size={16} /> <span>Biriktirilgan packlar: <strong>{(group.assignedPacks || []).length + (group.additionalPacks || []).length + (group.requiredPacks || []).length} ta</strong></span>
                    </div>
                  </div>

                  <div className="group-card-actions">
                    <button className="btn-group-action" onClick={() => handleRestoreGroup(group)} style={{ color: '#4ade80', width: '100%', justifyContent: 'center' }}>
                      <RotateCcw size={16} /> Guruhni Arxivdan Chiqarish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* 3. SO'ZLAR BAZASI TAB */}
      {tab === 'courses' && (
        viewingPack ? (
          <TeacherPackViewer
            pack={viewingPack}
            onBack={() => setViewingPack(null)}
          />
        ) : editingPack ? (
          <CourseManager
            centerId={centerId}
            course={editingPack}
            onBack={() => setEditingPack(null)}
            onUpdate={(updatedPack) => {
              setCustomPacks(prev => prev.map(p => p.id === updatedPack.id ? { ...updatedPack, scope: p.scope } : p));
              setEditingPack(prev => ({ ...updatedPack, scope: prev.scope }));
            }}
          />
        ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>
              So'zlar bazasi ({customPacks.length})
            </h2>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'nowrap' }}>
              <div className="search-input-wrap">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Pack nomini qidirish..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn-add-course-primary"
                onClick={() => setShowPackEditor(true)}
                style={{ padding: '8px 14px', fontSize: '0.85rem', height: '36px', flexShrink: 0 }}
              >
                <Plus size={16} /> Yangi pack
              </button>
            </div>
          </div>

          {filteredPacks.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={40} />
              <p>{searchTerm ? 'Qidiruv bo\'yicha pack topilmadi.' : 'Hozircha custom packlar yaratilmagan.'}</p>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.03em', margin: '0 0 0.85rem 0' }}>
                Mening packlarim ({filteredPacks.filter(p => p.scope === 'own').length})
              </h3>
              {filteredPacks.filter(p => p.scope === 'own').length === 0 ? (
                <div className="empty-state" style={{ padding: '1.5rem' }}>
                  <p>Siz hali shaxsiy pack yaratmagansiz. Faqat sizga tegishli bo'lgan va boshqa hech kimga (markaz admini ham) ko'rinmaydigan pack yaratish uchun "Yangi pack" tugmasini bosing.</p>
                </div>
              ) : (
                <div className="packs-grid" style={{ marginBottom: '2rem' }}>
                  {filteredPacks.filter(p => p.scope === 'own').map((pack) => (
                    <div
                      key={pack.id}
                      className="custom-pack-card"
                      onClick={() => setViewingPack(pack)}
                      style={{ cursor: 'pointer', position: 'relative' }}
                      title="Ko'rish uchun bosing"
                    >
                      <button
                        type="button"
                        className="btn-action-more"
                        title="Amallar"
                        style={{ position: 'absolute', top: '10px', right: '10px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          setPackMenuPos({ top: rect.bottom + 6, right: window.innerWidth - rect.right });
                          setActivePackMenu(activePackMenu === pack.id ? null : pack.id);
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>

                      <h3>{pack.title}</h3>
                      <p className="pack-desc">{pack.description || 'Izoh yo\'q'}</p>
                      <div className="pack-meta">
                        <span><strong>{pack.wordCount || (pack.words ? pack.words.length : 0)}</strong> ta so'z</span>
                      </div>

                      {activePackMenu === pack.id && (
                        <>
                          <div style={{ position: 'fixed', inset: 0, zIndex: 9998 }} onClick={(e) => { e.stopPropagation(); setActivePackMenu(null); }} />
                          <div
                            className="teacher-action-dropdown"
                            onClick={(e) => e.stopPropagation()}
                            style={{ position: 'fixed', top: `${packMenuPos.top}px`, right: `${packMenuPos.right}px`, zIndex: 9999, minWidth: '160px' }}
                          >
                            <button type="button" className="dropdown-item" onClick={() => { setEditingPack(pack); setActivePackMenu(null); }}>
                              <Pencil size={15} /> Tahrirlash
                            </button>
                            <button
                              type="button"
                              className="dropdown-item"
                              disabled={duplicatingPackId === pack.id}
                              onClick={() => { handleDuplicatePack(pack); setActivePackMenu(null); }}
                            >
                              <Copy size={15} /> {duplicatingPackId === pack.id ? 'Nusxalanmoqda...' : 'Nusxalash'}
                            </button>
                            <button type="button" className="dropdown-item dropdown-item-danger" onClick={() => { handleDeletePack(pack); setActivePackMenu(null); }}>
                              <Trash2 size={15} /> O'chirish
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.03em', margin: '0 0 0.85rem 0' }}>
                Markaz packlari ({filteredPacks.filter(p => p.scope === 'center').length})
              </h3>
              {filteredPacks.filter(p => p.scope === 'center').length === 0 ? (
                <div className="empty-state" style={{ padding: '1.5rem' }}>
                  <p>Markaz tomonidan umumiy pack hali yaratilmagan.</p>
                </div>
              ) : (
                <div className="packs-grid">
                  {filteredPacks.filter(p => p.scope === 'center').map((pack) => (
                    <div
                      key={pack.id}
                      className="custom-pack-card"
                      onClick={() => setViewingPack(pack)}
                      style={{ cursor: 'pointer', position: 'relative' }}
                      title="Ko'rish uchun bosing"
                    >
                      <button
                        type="button"
                        className="btn-action-more"
                        title="Nusxalash"
                        style={{ position: 'absolute', top: '10px', right: '10px' }}
                        disabled={duplicatingPackId === pack.id}
                        onClick={(e) => { e.stopPropagation(); handleDuplicatePack(pack); }}
                      >
                        <Copy size={16} />
                      </button>

                      <h3>{pack.title}</h3>
                      <p className="pack-desc">{pack.description || 'Izoh yo\'q'}</p>
                      <div className="pack-meta">
                        <span><strong>{pack.wordCount || (pack.words ? pack.words.length : 0)}</strong> ta so'z</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
        )
      )}

      {/* 4. STATISTIKA TAB */}
      {tab === 'statistics' && (
        <>
          <header className="teacher-header">
            <div>
              <span className="teacher-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}><BarChart3 size={16} /> Statistika</span>
              <h1>Natijalar va Statistika</h1>
              <p>Guruhlaringiz va o'quvchilaringizning so'z boyligi o'zlashtirish dinamikasi.</p>
            </div>
          </header>

          <div className="stat-cards-grid" style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
            <div className="group-stat-card">
              <div className="group-stat-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} color="#6366f1" /> Jami Guruhlar
              </div>
              <div className="group-stat-value">{activeGroups.length} ta</div>
            </div>

            <div className="group-stat-card">
              <div className="group-stat-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} color="var(--success)" /> Jami O'quvchilar
              </div>
              <div className="group-stat-value">{totalStudents} ta</div>
            </div>

            <div className="group-stat-card">
              <div className="group-stat-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={16} color="#a855f7" /> Custom Packlar
              </div>
              <div className="group-stat-value">{customPacks.length} ta</div>
            </div>

            <div className="group-stat-card">
              <div className="group-stat-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={16} color="#38bdf8" /> O'rtacha O'zlashtirish
              </div>
              <div className="group-stat-value" style={{ color: '#4ade80' }}>
                {loadingAllStats ? '…' : `${overallAvgPercent}%`}
              </div>
            </div>
          </div>

          {allGroupsStats.length > 0 && (
            <div className="teachers-table-card" style={{ marginBottom: '1.5rem', padding: '1.25rem 1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                Guruhlar bo'yicha o'rtacha o'zlashtirish
              </h3>
              <div style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={allGroupsStats.map(s => ({ name: s.group.name, avgPercent: s.avgPercent }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit="%" allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }}
                      itemStyle={{ color: '#4ade80' }}
                      formatter={(value) => [`${value}%`, "O'zlashtirish"]}
                    />
                    <Bar dataKey="avgPercent" fill="#0a84ff" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="teachers-table-card">
            <h3 style={{ padding: '1.25rem 1.5rem', margin: 0, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', fontSize: '1.1rem' }}>
              Guruhlar Statistikasi
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="teachers-table">
                <thead>
                  <tr>
                    <th>GURUH NOMI</th>
                    <th>DARAJA</th>
                    <th>O'QUVCHILAR</th>
                    <th>PACKLAR</th>
                    <th>O'ZLASHTIRISH</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {allGroupsStats.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Hali guruhlar yo'q</td>
                    </tr>
                  ) : (
                    allGroupsStats.map(({ group: g, packEntries, avgPercent }) => (
                      <tr key={g.id}>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{g.name}</td>
                        <td><span className="group-level-badge">{g.level}</span></td>
                        <td>{g.studentsCount || 0} ta o'quvchi</td>
                        <td>{packEntries.length} ta pack</td>
                        <td>{loadingAllStats && !(g.id in allGroupsStudents) ? '…' : `${avgPercent}%`}</td>
                        <td><span className="teacher-status-pill active">• Faol</span></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* 5. SOZLAMALAR TAB */}
      {tab === 'settings' && (
        <>
          <header className="teacher-header">
            <div>
              <span className="teacher-badge" style={{ background: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8' }}><Settings size={16} /> Sozlamalar</span>
              <h1>O'qituvchi Sozlamalari</h1>
              <p>Shaxsiy ma'lumotlaringiz va tizimga kirish parolingizni boshqaring.</p>
            </div>
          </header>

          {settingsSuccess && (
            <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#4ade80', padding: '12px 16px', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} /> {settingsSuccess}
            </div>
          )}

          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '18px', padding: '2rem', maxWidth: '600px', marginBottom: '1.5rem' }}>
            <form onSubmit={handleSaveProfile} autoComplete="off">
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '6px' }}>F.I.SH (Ism Sharif)</label>
                <input
                  type="text"
                  required
                  style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  value={profileForm.name}
                  onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '6px' }}>Telefon raqam</label>
                <input
                  type="tel"
                  style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  value={profileForm.phone}
                  onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '6px' }}>Yangi Parol (ixtiyoriy)</label>
                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder="O'zgartirish uchun yangi parol kiriting"
                  style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  value={profileForm.password}
                  onChange={e => setProfileForm({ ...profileForm, password: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={savingSettings}
                style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Save size={18} /> {savingSettings ? 'Saqlanmoqda...' : 'Sozlamalarni Saqlash'}
              </button>
            </form>
          </div>

          {/* Theme Selection Card */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '18px', padding: '1.75rem', maxWidth: '600px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>Mavzu va Ko'rinish</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 1.25rem 0' }}>Tizim ko'rinishini o'zingizga qulay rejimga o'tkazing.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div
                onClick={() => setTheme('ios')}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: theme === 'ios' ? '2px solid #0a84ff' : '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(10,132,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a84ff' }}>
                  <Sun size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Yorug' rejim</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Oq fon, toza interfeys</div>
                </div>
              </div>

              <div
                onClick={() => setTheme('android')}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: theme === 'android' ? '2px solid #0a84ff' : '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(168,85,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
                  <Moon size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Tungi rejim</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>To'q fon, ko'zga qulay</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Shared Modals */}

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

      {/* FULLSCREEN GROUP SETTINGS MODAL — lives at the top level (not
          nested inside the group-detail view) so it also works from the
          groups list, where the "⋯" button on each card opens it. */}
      {showGroupSettingsModal && groupSettingsTarget && (
        <div className="gsm-overlay">
          <div className="gsm-container">
            {/* Header */}
            <div className="gsm-header">
              <button
                type="button"
                className="gsm-back-btn"
                onClick={() => setShowGroupSettingsModal(false)}
                title="Qaytish"
              >
                <ArrowLeft size={20} />
              </button>

              <h2 className="gsm-title">Sozlamalar</h2>

              <button
                type="button"
                className="gsm-save-btn"
                onClick={handleSaveGroupSettings}
                disabled={savingGroupSettings}
              >
                {savingGroupSettings ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
            </div>

            {/* Body Content */}
            <div className="gsm-body">
              {/* SECTION 1: UMUMIY */}
              <div className="gsm-section">
                <div className="gsm-section-title">UMUMIY</div>
                <div className="gsm-card">
                  {/* Row 1: Guruh nomi */}
                  <div className="gsm-row">
                    <div className="gsm-row-icon gsm-icon-green">
                      <Pencil size={18} />
                    </div>
                    <div className="gsm-row-content">
                      <label className="gsm-input-label">Guruh nomi</label>
                      <input
                        type="text"
                        className="gsm-text-input"
                        value={groupSettingsForm.name}
                        onChange={e => setGroupSettingsForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Guruh nomini kiriting"
                      />
                    </div>
                  </div>

                  <div className="gsm-divider" />

                  {/* Row 2: Taklif kodini yangilash */}
                  <div className="gsm-row gsm-row-clickable" onClick={handleRegenerateCode}>
                    <div className="gsm-row-icon">
                      <RotateCw size={18} />
                    </div>
                    <div className="gsm-row-content">
                      <span className="gsm-row-label">Taklif kodini yangilash</span>
                      <span className="gsm-row-sub">Joriy kod: {groupSettingsForm.code}</span>
                    </div>
                    <ChevronRight size={18} className="gsm-row-arrow" />
                  </div>

                  <div className="gsm-divider" />

                  {/* Row 3: Boshqa o'qituvchiga o'tkazish */}
                  <div className="gsm-row gsm-row-clickable" onClick={handleOpenTransferPicker}>
                    <div className="gsm-row-icon">
                      <ArrowRightLeft size={18} />
                    </div>
                    <div className="gsm-row-content">
                      <span className="gsm-row-label">Boshqa o'qituvchiga o'tkazish</span>
                      <span className="gsm-row-sub">Guruh boshqa o'qituvchi nomiga ko'chiriladi</span>
                    </div>
                    <ChevronRight size={18} className="gsm-row-arrow" />
                  </div>
                </div>
              </div>

              {/* SECTION 2: HOLAT */}
              <div className="gsm-section">
                <div className="gsm-section-title">HOLAT</div>
                <div className="gsm-card">
                  <div className="gsm-row">
                    <div className="gsm-row-icon">
                      <Archive size={18} />
                    </div>
                    <div className="gsm-row-content">
                      <span className="gsm-row-label">Arxivlash</span>
                      <span className="gsm-row-sub">Guruh vaqtincha nofaol bo'ladi</span>
                    </div>
                    <label className="gsm-toggle-switch">
                      <input
                        type="checkbox"
                        checked={groupSettingsForm.isArchived}
                        onChange={e => setGroupSettingsForm(prev => ({ ...prev, isArchived: e.target.checked }))}
                      />
                      <span className="gsm-toggle-slider" />
                    </label>
                  </div>
                </div>
              </div>

              {/* SECTION 3: XAVFLI HUDUD */}
              <div className="gsm-section">
                <div className="gsm-section-title gsm-title-danger">XAVFLI HUDUD</div>
                <div className="gsm-card gsm-card-danger">
                  {/* Guruhni o'chirish */}
                  <div
                    className="gsm-row gsm-row-clickable"
                    onClick={() => {
                      setShowGroupSettingsModal(false);
                      handleDeleteGroup(groupSettingsTarget);
                    }}
                  >
                    <div className="gsm-row-icon gsm-icon-red">
                      <Trash2 size={18} />
                    </div>
                    <div className="gsm-row-content">
                      <span className="gsm-row-label gsm-text-danger">Guruhni o'chirish</span>
                      <span className="gsm-row-sub">Bu amalni ortga qaytarib bo'lmaydi</span>
                    </div>
                  </div>
                </div>
              </div>
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
      {assigningGroup && (
        <div className="modal-overlay" onClick={() => setAssigningGroup(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2><BookOpen size={20} /> Pack Biriktirish: {assigningGroup.name}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
              Ushbu guruh o'quvchilari o'rganishi uchun pack tanlang va toifasini belgilang:
            </p>

            <div className="group-seg-bar" style={{ marginTop: 0, marginBottom: '1rem' }}>
              {[
                { key: 'assignedPacks', label: 'Asosiy' },
                { key: 'additionalPacks', label: "Qo'shimcha" },
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

            <div className="assign-pack-list">
              {(() => {
                // Irregular Verbs is only ever assignable under "Qo'shimcha"
                // — it's a grammar-drill pack, not core curriculum, so it
                // shouldn't clutter the Asosiy picker.
                const assignablePacks = customPacks.filter(
                  p => p.id !== IRREGULAR_VERBS_PACK_ID || assignCategory === 'additionalPacks'
                );
                return (
                  <>
                    <h4>Mavjud Packlar ({assignablePacks.length})</h4>
                    {assignablePacks.length === 0 ? (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Hali pack yaratilmagan.</p>
                    ) : (
                      assignablePacks.map(p => (
                        <div key={p.id} className="assign-pack-item">
                          <div>
                            <strong>{p.title}</strong> ({p.level}) - {p.wordCount || (p.words ? p.words.length : 0)} so'z
                            <span style={{ marginLeft: '8px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                              {p.scope === 'own' ? '· Mening' : '· Markaz'}
                            </span>
                          </div>
                          <button
                            className="btn-select-pack"
                            onClick={() => handleAssignPack(assigningGroup.id, p.id, assignCategory)}
                            disabled={(assigningGroup[assignCategory] || []).includes(p.id)}
                          >
                            {(assigningGroup[assignCategory] || []).includes(p.id) ? 'Biriktirilgan' : 'Biriktirish'}
                          </button>
                        </div>
                      ))
                    )}
                  </>
                );
              })()}
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setAssigningGroup(null)}>Yopish</button>
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
    </div>
  );
}
